/**
 * phantomdeps — evidence writer (Phase 12 update)
 * Prints the terminal card and appends a hash-chained NDJSON decision record.
 * Phase 12: adds audit-log verify support, agent override records, tamper detection.
 */

import { appendFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import type { GateDecision, AgentOverrideRecord } from "../types.js";

// Decision log path — relative to cwd
const DECISION_LOG_DIR = ".phantomdeps";
const DECISION_LOG_FILE = "decisions.ndjson";

const VERDICT_COLOR: Record<string, string> = {
  ALLOW:      "\x1b[32m",  // green
  WARN:       "\x1b[33m",  // yellow
  BLOCK:      "\x1b[31m",  // red
  UNVERIFIED: "\x1b[35m",  // magenta
};
const RESET = "\x1b[0m";
const BOLD  = "\x1b[1m";
const DIM   = "\x1b[2m";

/** Print a human-readable evidence card to stdout.
 * Phase 13.7: accepts optional terminal width for column-aware wrapping.
 * Supported widths: 80, 120, 240 (or any value — we clamp min 60 / max 240).
 */
export function printCard(decision: GateDecision, terminalWidth?: number): void {
  const color = VERDICT_COLOR[decision.action] ?? "";
  const width = Math.min(240, Math.max(60, terminalWidth ?? 80));
  const bar = "─".repeat(width);

  console.log(`\n${BOLD}${bar}${RESET}`);
  console.log(`${BOLD}phantomdeps gate — ${color}${decision.action}${RESET}`);
  console.log(`${bar}`);
  console.log(`  Package  : ${decision.packageSpec} → ${decision.resolvedVersion}`);
  console.log(`  Ecosystem: ${decision.ecosystem}`);
  console.log(`  Source   : ${decision.cacheStatus === "fixture" ? `fixture (${decision.registrySource})` : decision.registrySource}`);
  console.log(`  Integrity: ${decision.integrity ?? "not available"}`);
  console.log(`  Time     : ${decision.timestamp}`);
  console.log(`  Decision : ${decision.decisionId}`);
  console.log(`  Origin   : ${decision.origin}`);

  if (decision.findings.length) {
    console.log(`\n${BOLD}Findings:${RESET}`);
    for (const f of decision.findings) {
      const icon = f.severity === "block" ? "✖" : f.severity === "warn" ? "⚠" : "ℹ";
      const c = f.severity === "block" ? VERDICT_COLOR.BLOCK : f.severity === "warn" ? VERDICT_COLOR.WARN : "";
      console.log(`  ${c}${icon} [${f.id}]${RESET}`);
      console.log(`    ${f.message}`);
      if (f.evidenceRefs.length) {
        console.log(`    ${DIM}Evidence: ${f.evidenceRefs.slice(0, 3).join(" | ")}${RESET}`);
      }
    }
  }

  if (decision.remediationCandidate) {
    console.log(`\n${BOLD}Remediation candidate:${RESET} ${wrapText(decision.remediationCandidate, width - 4)}`);
    console.log(`  ${DIM}Human approval required before any patch is applied.${RESET}`);
  }

  console.log(`\n  Record hash : ${DIM}${decision.recordHash}${RESET}`);
  console.log(`  Prev hash   : ${DIM}${decision.previousHash}${RESET}`);
  console.log(`${bar}\n`);
}

/**
 * Phase 13.7: word-wrap text to fit within the given column width.
 * Preserves existing newlines; wraps on whitespace boundaries.
 */
function wrapText(text: string, maxWidth: number): string {
  if (maxWidth <= 0 || text.length <= maxWidth) return text;
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current.length === 0) {
      current = word;
    } else if (current.length + 1 + word.length <= maxWidth) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.join("\n    ");
}

/** Append the decision to the hash-chained NDJSON log. */
export function appendDecisionLog(decision: GateDecision, cwd = process.cwd()): void {
  const dir = join(cwd, DECISION_LOG_DIR);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const logPath = join(dir, DECISION_LOG_FILE);
  const line = JSON.stringify(decision) + "\n";
  // appendFileSync ensures the write completes synchronously before the process exits.
  appendFileSync(logPath, line);
}

/** Read the hash of the last decision record (for chaining). */
export function readLastHash(cwd = process.cwd()): string {
  const logPath = join(cwd, DECISION_LOG_DIR, DECISION_LOG_FILE);
  if (!existsSync(logPath)) return "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  const lines = readFileSync(logPath, "utf8").trim().split("\n").filter(Boolean);
  if (!lines.length) return "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  try {
    const last = JSON.parse(lines[lines.length - 1]) as GateDecision;
    return last.recordHash;
  } catch {
    return "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  }
}

/** Write machine-readable JSON evidence to a file. */
export function writeEvidenceJson(decision: GateDecision, cwd = process.cwd()): string {
  const dir = join(cwd, DECISION_LOG_DIR);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const filename = `evidence-${decision.decisionId}.json`;
  const filePath = join(dir, filename);
  writeFileSync(filePath, JSON.stringify(decision, null, 2));
  return filePath;
}

// ── Phase 12.5: Agent override records ────────────────────────────────────────

/**
 * Append a strict-agent override record to the decision log.
 * Every override must be attributable: actor, reason, timestamp, command digest, resulting policy.
 * The override record is hash-chained into the same log as regular decisions.
 */
export function appendAgentOverrideRecord(
  override: Omit<AgentOverrideRecord, "recordHash">,
  cwd = process.cwd()
): AgentOverrideRecord {
  const recordHash = sha256(JSON.stringify({
    recordType: override.recordType,
    decisionId: override.decisionId,
    previousHash: override.previousHash,
    timestamp: override.timestamp,
    actor: override.actor,
    reason: override.reason,
    commandDigest: override.commandDigest,
    originalVerdict: override.originalVerdict,
    resultingPolicy: override.resultingPolicy,
    bobSessionId: override.bobSessionId,
  }));
  const record: AgentOverrideRecord = { ...override, recordHash };

  const dir = join(cwd, DECISION_LOG_DIR);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const logPath = join(dir, DECISION_LOG_FILE);
  appendFileSync(logPath, JSON.stringify(record) + "\n");
  return record;
}

// ── Phase 12.3: audit-log verify ──────────────────────────────────────────────

export type AuditVerifyResult =
  | { ok: true; recordCount: number; message: string }
  | { ok: false; recordCount: number; message: string; violations: AuditViolation[] };

export interface AuditViolation {
  lineNumber: number;
  kind: "SCHEMA_INVALID" | "HASH_MISMATCH" | "CHAIN_BROKEN" | "ORDERING_INVALID" | "REDACTION_DETECTED";
  detail: string;
}

/**
 * Verify an NDJSON decision log for:
 *  - JSON schema validity (each line must parse and have required fields)
 *  - Record hash integrity (recordHash must match recomputed hash of the record content)
 *  - Hash chain continuity (each previousHash must match the prior record's recordHash)
 *  - Temporal ordering (timestamps must be non-decreasing)
 *  - Redaction detection (no record may have null/undefined decisionId or recordHash)
 *
 * Returns ok:true if the log is clean, ok:false with violations otherwise.
 * This verifies tamper-evidence; it does NOT assert immutability.
 */
export function verifyAuditLog(logPath: string): AuditVerifyResult {
  const violations: AuditViolation[] = [];

  if (!existsSync(logPath)) {
    return { ok: true, recordCount: 0, message: "Log file does not exist — treated as empty clean log." };
  }

  const raw = readFileSync(logPath, "utf8");
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) {
    return { ok: true, recordCount: 0, message: "Log is empty." };
  }

  const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  let prevHash = NULL_HASH;
  let prevTimestamp = "";
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber++;

    // ── Schema validation ──────────────────────────────────────────────────
    let record: Record<string, unknown>;
    try {
      record = JSON.parse(line) as Record<string, unknown>;
    } catch (e) {
      violations.push({
        lineNumber,
        kind: "SCHEMA_INVALID",
        detail: `Line ${lineNumber}: failed to parse JSON — ${String(e)}`,
      });
      continue; // cannot check further for this line
    }

    const isOverride = record["recordType"] === "agent_override";

    // Required fields check
    const requiredFields = isOverride
      ? ["recordType", "decisionId", "previousHash", "recordHash", "timestamp", "actor", "reason", "commandDigest", "originalVerdict", "resultingPolicy"]
      : ["decisionId", "previousHash", "recordHash", "timestamp", "origin", "action"];
    for (const field of requiredFields) {
      if (!(field in record) || record[field] === null || record[field] === undefined) {
        violations.push({
          lineNumber,
          kind: "SCHEMA_INVALID",
          detail: `Line ${lineNumber}: missing or null required field '${field}'`,
        });
      }
    }

    // ── Redaction detection ────────────────────────────────────────────────
    if (!record["decisionId"] || !record["recordHash"]) {
      violations.push({
        lineNumber,
        kind: "REDACTION_DETECTED",
        detail: `Line ${lineNumber}: decisionId or recordHash is blank — possible redaction`,
      });
      prevHash = (record["recordHash"] as string) ?? prevHash;
      continue;
    }

    const storedHash = record["recordHash"] as string;
    const storedPrevHash = record["previousHash"] as string;

    // ── Hash chain check ──────────────────────────────────────────────────
    if (storedPrevHash !== prevHash) {
      violations.push({
        lineNumber,
        kind: "CHAIN_BROKEN",
        detail: `Line ${lineNumber}: previousHash '${storedPrevHash}' does not match prior record's recordHash '${prevHash}'`,
      });
    }

    // ── Record hash integrity ─────────────────────────────────────────────
    const { recordHash: _omit, ...recordWithoutHash } = record;
    const recomputed = sha256(JSON.stringify(recordWithoutHash));
    if (recomputed !== storedHash) {
      violations.push({
        lineNumber,
        kind: "HASH_MISMATCH",
        detail: `Line ${lineNumber}: stored recordHash '${storedHash}' does not match recomputed '${recomputed}'`,
      });
    }

    // ── Ordering check ────────────────────────────────────────────────────
    const ts = record["timestamp"] as string;
    if (prevTimestamp && ts < prevTimestamp) {
      violations.push({
        lineNumber,
        kind: "ORDERING_INVALID",
        detail: `Line ${lineNumber}: timestamp '${ts}' is before prior record's timestamp '${prevTimestamp}'`,
      });
    }

    prevHash = storedHash;
    prevTimestamp = ts;
  }

  if (violations.length === 0) {
    return {
      ok: true,
      recordCount: lineNumber,
      message: `Audit log verified: ${lineNumber} record(s) — chain intact, all hashes match, ordering valid. Tamper-evident after verification.`,
    };
  }
  return {
    ok: false,
    recordCount: lineNumber,
    message: `Audit log verification FAILED: ${violations.length} violation(s) in ${lineNumber} record(s).`,
    violations,
  };
}

function sha256(data: string): string {
  return "sha256:" + createHash("sha256").update(data).digest("hex");
}

/**
 * phantomdeps — evidence writer
 * Prints the terminal card and appends a hash-chained NDJSON decision record.
 */

import { appendFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { GateDecision } from "../types.js";

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

/** Print a human-readable evidence card to stdout. */
export function printCard(decision: GateDecision): void {
  const color = VERDICT_COLOR[decision.action] ?? "";
  const bar = "─".repeat(60);

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
    console.log(`\n${BOLD}Remediation candidate:${RESET} ${decision.remediationCandidate}`);
    console.log(`  ${DIM}Human approval required before any patch is applied.${RESET}`);
  }

  console.log(`\n  Record hash : ${DIM}${decision.recordHash}${RESET}`);
  console.log(`  Prev hash   : ${DIM}${decision.previousHash}${RESET}`);
  console.log(`${bar}\n`);
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

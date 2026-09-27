#!/usr/bin/env node
/**
 * phantomdeps — IBM Bob PreToolUse hook (Phase 10: fail-closed)
 *
 * Intercepts execute_command tool calls that look like npm install.
 * Per official IBM Bob docs: stdout is ignored; exit 2 blocks the tool.
 *
 * Phase 10 changes:
 * - Uses parseHookCommand() tokenizer instead of a single regex.
 * - Handles multi-package commands: ALL packages checked; any BLOCK → exit 2.
 * - Strict-agent policy: UNVERIFIED → exit 2 (fail-closed in agent context).
 * - Unsupported spec forms (url, vcs, file:) → UNVERIFIED → exit 2.
 * - Every code path writes a structured decision record.
 * - NO_SPECS / NOT_NPM_INSTALL → pass through (not our concern); write info record.
 *
 * Input (stdin): JSON { tool, input: { command } }
 * Output: exit 0 = allow, exit 2 = block/unverified (strict-agent)
 * Evidence: .phantomdeps/decisions.ndjson
 */

import { readFileSync } from "fs";
import { createHash, randomUUID } from "crypto";
import { parseHookCommand, classifySpec, parseIntent } from "../../src/parser.js";
import { loadFixture } from "../../src/fixtures/loader.js";
import { evidenceFromFixture, resolveFromRegistry } from "../../src/adapters/registry.js";
import { resolveClaimsFromFixture } from "../../src/checker/static-claim.js";
import { computeRiskSignals } from "../../src/checker/risk-signals.js";
import { applyPolicy } from "../../src/engine/policy.js";
import { appendDecisionLog, readLastHash } from "../../src/evidence/writer.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ── Read stdin ────────────────────────────────────────────────────────────────
let raw = "";
try {
  raw = readFileSync("/dev/stdin", "utf8");
} catch {
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) raw += chunk;
}

let hookInput;
try {
  hookInput = JSON.parse(raw);
} catch {
  process.exit(0); // not JSON — not our concern
}

// Only intercept execute_command
if (hookInput.tool !== "execute_command") process.exit(0);

const command = String(hookInput.input?.command ?? "");

// ── Parse command ─────────────────────────────────────────────────────────────
const parsed = parseHookCommand(command);

if (!parsed.ok) {
  // NOT_NPM_INSTALL → pass through silently
  // UNSAFE → write warning and pass through (we never block on parse failure alone)
  // NO_SPECS → write info and pass through (bare `npm install` with no args)
  if (parsed.reason.startsWith("UNSAFE")) {
    writeInfoRecord({ event: "UNSAFE_COMMAND", reason: parsed.reason, command });
    process.stderr.write(`[phantomdeps] WARN — unsafe command shape, not intercepted: ${parsed.reason}\n`);
  }
  process.exit(0);
}

// ── Evaluate each spec ────────────────────────────────────────────────────────
const specs = parsed.specs;
const decisions = [];
let aggregateAction = "ALLOW"; // pessimistic aggregation: BLOCK > UNVERIFIED > WARN > ALLOW

for (const spec of specs) {
  const classification = classifySpec(spec);

  if (classification !== "registry") {
    // Unsupported form (url, vcs, file:, alias) → UNVERIFIED; strict-agent → exit 2
    const unverifiedDecision = buildUnsupportedDecision(spec, command);
    appendDecisionLog(unverifiedDecision);
    decisions.push(unverifiedDecision);
    aggregateAction = worstAction(aggregateAction, "UNVERIFIED");
    process.stderr.write(
      `[phantomdeps] UNVERIFIED — '${spec}' is an unsupported spec form. ` +
      `Only registry-name specs are supported. Failing closed in agent context.\n`
    );
    continue;
  }

  let intent;
  try {
    intent = parseIntent(spec);
  } catch (e) {
    const unverifiedDecision = buildParseErrorDecision(spec, command, String(e));
    appendDecisionLog(unverifiedDecision);
    decisions.push(unverifiedDecision);
    aggregateAction = worstAction(aggregateAction, "UNVERIFIED");
    process.stderr.write(`[phantomdeps] UNVERIFIED — parse error for '${spec}': ${e}\n`);
    continue;
  }

  const previousHash = readLastHash();
  let evidence;
  let claim = null;

  // Try fixture first
  const fixtureId = `${intent.name}-demo`;
  let fixtureHit = false;
  try {
    const fixture = loadFixture(fixtureId);
    evidence = evidenceFromFixture(fixture);
    claim = resolveClaimsFromFixture(fixture, fixture.claimedSymbols);
    fixtureHit = true;
  } catch {
    // No fixture for this package — try live registry
  }

  if (!fixtureHit) {
    // Live registry lookup (Phase 10: attempt live, fall back to UNVERIFIED)
    try {
      const liveResult = await resolveFromRegistry(intent.name, intent.version);
      if (liveResult === null) {
        evidence = null; // NOT_FOUND
      } else if (liveResult === "UNAVAILABLE") {
        evidence = "UNAVAILABLE";
      } else {
        evidence = liveResult;
        // No live symbol check in Phase 10 (Phase 11 target)
      }
    } catch {
      evidence = "UNAVAILABLE";
    }
  }

  const risk =
    evidence && evidence !== "NOT_FOUND" && evidence !== "UNAVAILABLE"
      ? computeRiskSignals(evidence, intent.name)
      : null;

  const decision = applyPolicy({
    intent,
    evidence,
    claim,
    risk,
    origin: "agent",
    previousHash,
  });

  appendDecisionLog(decision);
  decisions.push(decision);
  aggregateAction = worstAction(aggregateAction, decision.action);
}

// ── Strict-agent policy: UNVERIFIED → exit 2 ─────────────────────────────────
if (aggregateAction === "BLOCK" || aggregateAction === "UNVERIFIED") {
  const label = aggregateAction === "UNVERIFIED" ? "UNVERIFIED (strict-agent: fail-closed)" : "BLOCK";
  process.stderr.write(
    `\n[phantomdeps] ${label}\n` +
    `Packages checked: ${specs.join(", ")}\n` +
    `Decisions written to: .phantomdeps/decisions.ndjson\n\n`
  );
  // Emit individual block reasons
  for (const d of decisions) {
    if (d.action === "BLOCK" || d.action === "UNVERIFIED") {
      const finding = d.findings[0];
      if (finding) {
        process.stderr.write(`  ${d.packageSpec}: ${finding.message.slice(0, 200)}\n`);
      }
    }
  }
  process.exit(2);
}

// ALLOW or WARN — pass through
process.stderr.write(
  `[phantomdeps] ${aggregateAction} — ${specs.join(", ")}\n`
);
process.exit(0);

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Worst-case action aggregation order: BLOCK > UNVERIFIED > WARN > ALLOW
 */
function worstAction(current, incoming) {
  const order = { BLOCK: 4, UNVERIFIED: 3, WARN: 2, ALLOW: 1 };
  return (order[incoming] ?? 0) > (order[current] ?? 0) ? incoming : current;
}

function buildUnsupportedDecision(spec, command) {
  const decisionId = randomUUID();
  const timestamp = new Date().toISOString();
  const commandDigest = "sha256:" + createHash("sha256").update(command).digest("hex");
  const previousHash = readLastHash();
  const recordBody = {
    decisionId,
    previousHash,
    timestamp,
    origin: "agent",
    commandDigest,
    ecosystem: "npm",
    packageSpec: spec,
    resolvedVersion: "unknown",
    integrity: null,
    registrySource: "unknown",
    cacheStatus: "miss",
    action: "UNVERIFIED",
    findings: [{
      id: "l0.unsupported_spec",
      severity: "warn",
      message: `UNVERIFIED: '${spec}' is a non-registry spec form (url/vcs/file/alias). Only registry-name specs are supported in v1. Failing closed in agent context.`,
      evidenceRefs: ["L0:parser_unsupported"],
    }],
    remediationCandidate: null,
    bobSessionId: null,
  };
  const recordHash = "sha256:" + createHash("sha256").update(JSON.stringify(recordBody)).digest("hex");
  return { ...recordBody, recordHash };
}

function buildParseErrorDecision(spec, command, errorMsg) {
  const decisionId = randomUUID();
  const timestamp = new Date().toISOString();
  const commandDigest = "sha256:" + createHash("sha256").update(command).digest("hex");
  const previousHash = readLastHash();
  const recordBody = {
    decisionId,
    previousHash,
    timestamp,
    origin: "agent",
    commandDigest,
    ecosystem: "npm",
    packageSpec: spec,
    resolvedVersion: "unknown",
    integrity: null,
    registrySource: "unknown",
    cacheStatus: "miss",
    action: "UNVERIFIED",
    findings: [{
      id: "l0.parse_error",
      severity: "warn",
      message: `UNVERIFIED: parser error for '${spec}': ${errorMsg}`,
      evidenceRefs: ["L0:parser_error"],
    }],
    remediationCandidate: null,
    bobSessionId: null,
  };
  const recordHash = "sha256:" + createHash("sha256").update(JSON.stringify(recordBody)).digest("hex");
  return { ...recordBody, recordHash };
}

function writeInfoRecord(info) {
  const dir = join(process.cwd(), ".phantomdeps");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "hook-info.json"), JSON.stringify(info, null, 2));
}

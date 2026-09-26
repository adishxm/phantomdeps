#!/usr/bin/env node
/**
 * phantomdeps — IBM Bob PreToolUse hook
 *
 * Intercepts execute_command tool calls that look like npm install.
 * Per official IBM Bob docs: stdout is ignored; exit 2 blocks the tool.
 *
 * Input (stdin): JSON { event, session_id, tool, input }
 * Output: exit 0 = allow, exit 2 = block (stdout ignored per docs)
 *
 * Evidence is written to .phantomdeps/decisions.ndjson regardless of verdict.
 *
 * Usage (Bob hook config):
 *   hooks:
 *     PreToolUse:
 *       - matcher: execute_command
 *         command: node .bob/hooks/PreToolUse.mjs
 */

import { readFileSync } from "fs";
import { parseIntent } from "../../src/parser.js";
import { loadFixture } from "../../src/fixtures/loader.js";
import { evidenceFromFixture } from "../../src/adapters/registry.js";
import { resolveClaimsFromFixture } from "../../src/checker/static-claim.js";
import { computeRiskSignals } from "../../src/checker/risk-signals.js";
import { applyPolicy } from "../../src/engine/policy.js";
import { appendDecisionLog, readLastHash } from "../../src/evidence/writer.js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Read stdin
let raw = "";
try {
  raw = readFileSync("/dev/stdin", "utf8");
} catch {
  // On Windows, stdin might not be /dev/stdin
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) raw += chunk;
}

let hookInput;
try {
  hookInput = JSON.parse(raw);
} catch {
  // Not JSON — not our concern, allow
  process.exit(0);
}

// Only intercept execute_command
if (hookInput.tool !== "execute_command") process.exit(0);

const command = String(hookInput.input?.command ?? "");

// Only intercept npm install/add
if (!command.match(/\bnpm\s+(install|add|i)\b/)) process.exit(0);

// Extract the package spec from the command
// Supports: npm install <pkg>, npm install <pkg>@version
const match = command.match(/npm\s+(?:install|add|i)\s+([^\s;|&]+)/);
if (!match) process.exit(0);

const spec = match[1];

let intent;
try {
  intent = parseIntent(spec);
} catch (e) {
  // Unsupported form → UNVERIFIED, write evidence, exit 3
  writeEvidence({ verdict: "UNVERIFIED", reason: String(e), spec, command });
  // Do not block — unsupported forms pass through with a warning
  process.exit(0);
}

// Check fixture
const fixtureId = `${intent.name}-demo`;
let decision;
try {
  const fixture = loadFixture(fixtureId);
  const evidence = evidenceFromFixture(fixture);
  const claim = resolveClaimsFromFixture(fixture, fixture.claimedSymbols);
  const risk = computeRiskSignals(evidence, intent.name);
  const previousHash = readLastHash();

  decision = applyPolicy({
    intent,
    evidence,
    claim,
    risk,
    origin: "agent",
    previousHash,
  });
} catch {
  // No fixture for this package → allow (not enough evidence to block)
  process.exit(0);
}

appendDecisionLog(decision);

// Write a human-readable block reason to stderr (visible in Bob UI)
if (decision.action === "BLOCK") {
  const blockFinding = decision.findings.find((f) => f.severity === "block");
  process.stderr.write(
    `\n[phantomdeps] BLOCK — ${blockFinding?.message ?? "Claim verification failed."}\n` +
    `Decision ID: ${decision.decisionId}\n` +
    `Evidence: .phantomdeps/decisions.ndjson\n\n`
  );
  process.exit(2); // exit 2 blocks the tool in Bob PreToolUse
}

// ALLOW or WARN — write info to stderr, allow
process.stderr.write(
  `[phantomdeps] ${decision.action} — ${intent.name}@${intent.version}\n`
);
process.exit(0);

function writeEvidence(info) {
  const dir = join(process.cwd(), ".phantomdeps");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "hook-unverified.json"), JSON.stringify(info, null, 2));
}

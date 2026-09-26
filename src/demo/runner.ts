/**
 * phantomdeps — offline fixture demo runner
 * Demonstrates: real package exists, AI-generated symbol is statically absent → BLOCK.
 * No network calls. No package installation.
 */

import { loadFixture } from "../fixtures/loader.js";
import { evidenceFromFixture } from "../adapters/registry.js";
import { resolveClaimsFromFixture } from "../checker/static-claim.js";
import { computeRiskSignals } from "../checker/risk-signals.js";
import { applyPolicy } from "../engine/policy.js";
import { printCard, appendDecisionLog, readLastHash } from "../evidence/writer.js";

export interface DemoOptions {
  offline: boolean;
  fixture: boolean;
}

const DEMO_FIXTURE_ID = "is-odd-demo";

export async function runDemo(opts: DemoOptions): Promise<void> {
  console.log("\n\x1b[1mphantom\x1b[35mdeps\x1b[0m \x1b[2m— pre-install AI dependency claim gate\x1b[0m");
  console.log("\x1b[2mOffline fixture demo — no network calls, no package installation\x1b[0m\n");

  // Step 1: Show the AI-generated scenario
  console.log("\x1b[1m[SCENARIO]\x1b[0m");
  console.log("  IBM Bob generated code that imports a function from an npm package.");
  console.log("  Bob is about to run: \x1b[33mnpm install is-odd\x1b[0m");
  console.log("  The generated code uses: \x1b[33mimport { isOddBatch } from 'is-odd'\x1b[0m");
  console.log("  \x1b[2mphantom\x1b[0m\x1b[2mdeps intercepts the install command and checks the claim...\x1b[0m\n");

  // Step 2: Load fixture
  const fixture = loadFixture(DEMO_FIXTURE_ID);
  console.log(`\x1b[2m[FIXTURE] Loaded: ${fixture.id} — captured ${fixture.capturedAt}\x1b[0m`);

  // Step 3: Build evidence
  const evidence = evidenceFromFixture(fixture);

  // Step 4: Check the claimed symbols against the fixture's exports
  const claim = resolveClaimsFromFixture(fixture, fixture.claimedSymbols);

  // Step 5: Risk signals
  const risk = computeRiskSignals(evidence, fixture.packageName);

  // Step 6: Policy engine
  const previousHash = readLastHash();
  const decision = applyPolicy({
    intent: {
      name: fixture.packageName,
      version: fixture.resolvedVersion,
      rawArgv: [`npm install ${fixture.packageName}`],
    },
    evidence,
    claim,
    risk,
    origin: "fixture",
    previousHash,
  });

  // Step 7: Print evidence card
  printCard(decision);

  // Step 8: Append to decision log
  appendDecisionLog(decision);

  // Step 9: Show remediation hint
  if (decision.action === "BLOCK") {
    console.log("\x1b[1m[REMEDIATION]\x1b[0m");
    console.log("  The symbol 'isOddBatch' does not exist in is-odd@3.0.1.");
    console.log("  The correct exported function is: \x1b[32misOdd(n)\x1b[0m");
    console.log("  Suggested patch (requires human approval before application):");
    console.log("  \x1b[32m  - import { isOddBatch } from 'is-odd'\x1b[0m");
    console.log("  \x1b[32m  + import isOdd from 'is-odd'\x1b[0m");
    console.log("\n  \x1b[2mNo package was installed. No code was executed.\x1b[0m");
    console.log("  \x1b[2mDecision record appended to .phantomdeps/decisions.ndjson\x1b[0m\n");
  }

  // Step 10: Verify expected verdict
  if (decision.action !== fixture.expectedVerdict) {
    console.error(
      `\x1b[31m[DEMO ERROR] Expected verdict ${fixture.expectedVerdict} but got ${decision.action}\x1b[0m`
    );
    process.exit(1);
  }

  console.log(`\x1b[32m✔ Demo completed. Verdict: ${decision.action} (expected: ${fixture.expectedVerdict})\x1b[0m\n`);
}

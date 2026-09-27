/**
 * phantomdeps — offline fixture demo runner (extended)
 * Supports three demo scenarios:
 *   - BLOCK: is-odd@3.0.1 + isOddBatch (absent symbol)
 *   - ALLOW: lodash@4.17.21 + merge (present symbol)
 *   - WARN:  risky-new-pkg@0.0.1 + doSomething (present but install scripts)
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
  /** Optional: "block" | "allow" | "warn" — defaults to "block" */
  scenario?: string;
}

const SCENARIOS: Record<string, { fixtureId: string; description: string; generatedCode: string }> = {
  block: {
    fixtureId: "is-odd-demo",
    description: "Real package, AI-generated symbol does NOT exist → BLOCK",
    generatedCode: "import { isOddBatch } from 'is-odd'",
  },
  allow: {
    fixtureId: "lodash-allow-demo",
    description: "Real package, AI-generated symbol EXISTS → ALLOW",
    generatedCode: "import { merge } from 'lodash'",
  },
  warn: {
    fixtureId: "risky-new-pkg-warn-demo",
    description: "Real package, symbol exists BUT install scripts present → WARN",
    generatedCode: "import { doSomething } from 'risky-new-pkg'",
  },
};

export async function runDemo(opts: DemoOptions): Promise<void> {
  const scenarioKey = opts.scenario ?? "block";
  const scenario = SCENARIOS[scenarioKey];

  if (!scenario) {
    console.error(`phantomdeps: unknown demo scenario '${scenarioKey}'. Use: block | allow | warn`);
    process.exit(1);
  }

  // Load fixture first (needed for package name in scenario header)
  const fixture = loadFixture(scenario.fixtureId);

  console.log("\n\x1b[1mphantom\x1b[35mdeps\x1b[0m \x1b[2m— pre-install AI dependency claim gate\x1b[0m");
  console.log(`\x1b[2mOffline fixture demo [${scenarioKey.toUpperCase()}] — no network calls, no package installation\x1b[0m\n`);

  // Step 1: Show the AI-generated scenario
  console.log("\x1b[1m[SCENARIO]\x1b[0m");
  console.log(`  ${scenario.description}`);
  console.log(`  IBM Bob generated code that imports a function from an npm package.`);
  console.log(`  Bob is about to run: \x1b[33mnpm install ${fixture.packageName}\x1b[0m`);
  console.log(`  The generated code uses: \x1b[33m${scenario.generatedCode}\x1b[0m`);
  console.log(`  \x1b[2mphantom\x1b[0m\x1b[2mdeps intercepts the install command and checks the claim...\x1b[0m\n`);

  // Step 2: Confirm fixture
  console.log(`\x1b[2m[FIXTURE] Loaded: ${fixture.id} — captured ${fixture.capturedAt}\x1b[0m`);

  // Step 3: Build evidence
  const evidence = evidenceFromFixture(fixture);

  // Step 4: Check the claimed symbols
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

  // Step 7: Print evidence card (Phase 13.7: width-aware)
  printCard(decision, process.stdout.columns);

  // Step 8: Append to decision log
  appendDecisionLog(decision);

  // Step 9: Scenario-specific follow-up
  if (decision.action === "BLOCK") {
    console.log("\x1b[1m[REMEDIATION]\x1b[0m");
    console.log(`  The symbol '${fixture.claimedSymbols[0]}' does not exist in ${fixture.packageName}@${fixture.resolvedVersion}.`);
    console.log(`  The correct exported function is: \x1b[32m${fixture.exportedSymbols.filter(s => s !== "default")[0] ?? fixture.exportedSymbols[0]}()\x1b[0m`);
    console.log(`  Suggested patch (requires human approval before application):`);
    console.log(`  \x1b[32m  - ${scenario.generatedCode}\x1b[0m`);
    const correctSymbol = fixture.exportedSymbols.filter(s => s !== "default")[0];
    console.log(`  \x1b[32m  + import ${correctSymbol} from '${fixture.packageName}'\x1b[0m`);
    console.log(`\n  \x1b[2mNo package was installed. No code was executed.\x1b[0m`);
    console.log(`  \x1b[2mDecision record appended to .phantomdeps/decisions.ndjson\x1b[0m\n`);
  } else if (decision.action === "WARN") {
    console.log("\x1b[1m[ADVISORY]\x1b[0m");
    console.log(`  Symbol '${fixture.claimedSymbols[0]}' is present in ${fixture.packageName}@${fixture.resolvedVersion}.`);
    console.log(`  However, L3 risk signals require review before proceeding.`);
    console.log(`  \x1b[2mHuman confirmation required before installing. Decision logged.\x1b[0m\n`);
  } else {
    console.log(`  \x1b[2mDecision record appended to .phantomdeps/decisions.ndjson\x1b[0m\n`);
  }

  // Step 10: Verify expected verdict
  // Phase 13.5: demo exit semantics match documentation
  //   - On expected verdict match: exit 0 (success)
  //   - On unexpected verdict: log error and exit 1 (not silently return 0)
  if (decision.action !== fixture.expectedVerdict) {
    console.error(
      `\x1b[31m[DEMO ERROR] Expected verdict ${fixture.expectedVerdict} but got ${decision.action}\x1b[0m`
    );
    process.exit(1);
  }

  console.log(`\x1b[32m✔ Demo completed. Verdict: ${decision.action} (expected: ${fixture.expectedVerdict})\x1b[0m\n`);
  // Demo always exits 0 on success — documented behavior: demo uses fixture exit codes, not scenario exit codes.
}

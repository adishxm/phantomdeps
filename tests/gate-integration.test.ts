/**
 * phantomdeps — gate integration tests
 * Exercises the full L1→L2→L3→Policy→Evidence pipeline using fixtures.
 * No network calls — offline fixture mode only.
 */

import { loadFixture } from "../src/fixtures/loader.js";
import { evidenceFromFixture } from "../src/adapters/registry.js";
import { resolveClaimsFromFixture } from "../src/checker/static-claim.js";
import { computeRiskSignals } from "../src/checker/risk-signals.js";
import { applyPolicy } from "../src/engine/policy.js";

const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";

function runGate(fixtureId: string) {
  const fixture = loadFixture(fixtureId);
  const evidence = evidenceFromFixture(fixture);
  const claim = resolveClaimsFromFixture(fixture, fixture.claimedSymbols);
  const risk = computeRiskSignals(evidence, fixture.packageName);
  return applyPolicy({
    intent: {
      name: fixture.packageName,
      version: fixture.resolvedVersion,
      rawArgv: [`npm install ${fixture.packageName}`],
    },
    evidence,
    claim,
    risk,
    origin: "fixture",
    previousHash: NULL_HASH,
  });
}

describe("Gate integration — is-odd-demo (BLOCK)", () => {
  const decision = runGate("is-odd-demo");

  test("verdict is BLOCK", () => {
    expect(decision.action).toBe("BLOCK");
  });

  test("finding l2.symbol_missing is present", () => {
    expect(decision.findings.some((f) => f.id === "l2.symbol_missing")).toBe(true);
  });

  test("no package was executed (fixture source)", () => {
    expect(decision.cacheStatus).toBe("fixture");
  });

  test("hash chain fields present", () => {
    expect(decision.recordHash).toMatch(/^sha256:/);
    expect(decision.previousHash).toBe(NULL_HASH);
    expect(decision.decisionId).toBeTruthy();
  });

  test("matches expected verdict from fixture", () => {
    const fixture = loadFixture("is-odd-demo");
    expect(decision.action).toBe(fixture.expectedVerdict);
  });
});

describe("Gate integration — lodash-allow-demo (ALLOW)", () => {
  const decision = runGate("lodash-allow-demo");

  test("verdict is ALLOW", () => {
    expect(decision.action).toBe("ALLOW");
  });

  test("no block findings", () => {
    expect(decision.findings.filter((f) => f.severity === "block")).toHaveLength(0);
  });

  test("matches expected verdict from fixture", () => {
    const fixture = loadFixture("lodash-allow-demo");
    expect(decision.action).toBe(fixture.expectedVerdict);
  });
});

describe("Gate integration — risky-new-pkg-warn-demo (WARN)", () => {
  const decision = runGate("risky-new-pkg-warn-demo");

  test("verdict is WARN", () => {
    expect(decision.action).toBe("WARN");
  });

  test("l3.risk_signal finding present", () => {
    expect(decision.findings.some((f) => f.id === "l3.risk_signal")).toBe(true);
  });

  test("no block findings (symbol is present)", () => {
    expect(decision.findings.filter((f) => f.severity === "block")).toHaveLength(0);
  });

  test("matches expected verdict from fixture", () => {
    const fixture = loadFixture("risky-new-pkg-warn-demo");
    expect(decision.action).toBe(fixture.expectedVerdict);
  });
});

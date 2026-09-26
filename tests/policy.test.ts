/**
 * phantomdeps — policy engine unit tests
 */

import { applyPolicy } from "../src/engine/policy.js";
import type { PackageEvidence, ClaimFinding } from "../src/types.js";

const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";

const baseEvidence: PackageEvidence = {
  name: "is-odd",
  resolvedVersion: "3.0.1",
  ecosystem: "npm",
  registryUrl: "fixture://is-odd-demo",
  integrity: "sha512-test",
  tarballUrl: null,
  deprecated: false,
  deprecationMessage: null,
  hasInstallScript: false,
  publishedAt: null,
  retrievedAt: new Date().toISOString(),
  source: "fixture",
  fixtureId: "is-odd-demo",
  responseHash: "sha256:abc",
};

const missingClaim: ClaimFinding = {
  packageName: "is-odd",
  resolvedVersion: "3.0.1",
  requestedSymbols: ["isOddBatch"],
  symbolResults: [{ symbol: "isOddBatch", status: "missing", evidence: "not found" }],
  verdict: "SYMBOL_MISSING",
  citations: ["fixture: is-odd-demo"],
  source: "fixture",
};

const foundClaim: ClaimFinding = {
  packageName: "is-odd",
  resolvedVersion: "3.0.1",
  requestedSymbols: ["isOdd"],
  symbolResults: [{ symbol: "isOdd", status: "found", evidence: "found in exports" }],
  verdict: "SYMBOL_FOUND",
  citations: ["fixture: is-odd-demo"],
  source: "fixture",
};

describe("applyPolicy", () => {
  test("returns BLOCK when L2 finds SYMBOL_MISSING", () => {
    const decision = applyPolicy({
      intent: { name: "is-odd", version: "3.0.1", rawArgv: ["npm install is-odd"] },
      evidence: baseEvidence,
      claim: missingClaim,
      risk: null,
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    expect(decision.action).toBe("BLOCK");
    expect(decision.findings.some((f) => f.id === "l2.symbol_missing")).toBe(true);
  });

  test("returns ALLOW when L2 finds SYMBOL_FOUND and no risk", () => {
    const decision = applyPolicy({
      intent: { name: "is-odd", version: "3.0.1", rawArgv: ["npm install is-odd"] },
      evidence: baseEvidence,
      claim: foundClaim,
      risk: null,
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    expect(decision.action).toBe("ALLOW");
  });

  test("returns BLOCK when package NOT_FOUND", () => {
    const decision = applyPolicy({
      intent: { name: "ghost-package-xyz-404", version: "latest", rawArgv: ["npm install ghost-package-xyz-404"] },
      evidence: "NOT_FOUND",
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    expect(decision.action).toBe("BLOCK");
    expect(decision.findings.some((f) => f.id === "l1.not_found")).toBe(true);
  });

  test("returns UNVERIFIED when registry UNAVAILABLE", () => {
    const decision = applyPolicy({
      intent: { name: "some-pkg", version: "latest", rawArgv: ["npm install some-pkg"] },
      evidence: "UNAVAILABLE",
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    expect(decision.action).toBe("UNVERIFIED");
  });

  test("returns WARN when package is deprecated", () => {
    const deprecatedEvidence: PackageEvidence = {
      ...baseEvidence,
      deprecated: true,
      deprecationMessage: "Use new-pkg instead",
    };
    const decision = applyPolicy({
      intent: { name: "is-odd", version: "3.0.1", rawArgv: ["npm install is-odd"] },
      evidence: deprecatedEvidence,
      claim: foundClaim,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    expect(decision.action).toBe("WARN");
    expect(decision.findings.some((f) => f.id === "l1.deprecated")).toBe(true);
  });

  test("decision record has hash chain fields", () => {
    const decision = applyPolicy({
      intent: { name: "is-odd", version: "3.0.1", rawArgv: ["npm install is-odd"] },
      evidence: baseEvidence,
      claim: foundClaim,
      risk: null,
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    expect(decision.decisionId).toBeTruthy();
    expect(decision.recordHash).toMatch(/^sha256:/);
    expect(decision.previousHash).toBe(NULL_HASH);
    expect(decision.timestamp).toBeTruthy();
  });
});

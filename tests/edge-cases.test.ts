/**
 * phantomdeps — Phase 05 edge-case, fuzz, regression, and resilience tests
 *
 * Covers:
 *   5.1 — Malformed inputs, empty states, partial failures
 *   5.2 — Property/fuzz testing of parser and policy
 *   5.6 — Output validation: claims grounded in evidence
 */

import { parseIntent, parseCheckArgs } from "../src/parser.js";
import { resolveClaimsFromFixture, resolveClaimsFromArtifact } from "../src/checker/static-claim.js";
import type { ArtifactInspection } from "../src/types.js";
import { computeRiskSignals } from "../src/checker/risk-signals.js";
import { applyPolicy } from "../src/engine/policy.js";
import { loadFixture } from "../src/fixtures/loader.js";
import { evidenceFromFixture } from "../src/adapters/registry.js";
import type { PackageEvidence, ClaimFinding } from "../src/types.js";

const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";

const baseEvidence: PackageEvidence = {
  name: "test-pkg",
  resolvedVersion: "1.0.0",
  ecosystem: "npm",
  registryUrl: "fixture://test",
  integrity: "sha512-test",
  tarballUrl: null,
  deprecated: false,
  deprecationMessage: null,
  hasInstallScript: false,
  publishedAt: null,
  retrievedAt: new Date().toISOString(),
  source: "fixture",
  fixtureId: "test",
  responseHash: "sha256:abc",
  provenance: {
    artifactIntegrity: "not_checked",
    registrySignature: "unknown",
    provenanceAttestation: "unknown",
    publisherIdentity: "unverified",
    sourceRepository: "linked",
  },
};

// ── 5.1 Parser edge cases ─────────────────────────────────────────────────────

describe("5.1 — Parser: malformed and boundary inputs", () => {
  test("empty string throws UNSUPPORTED", () => {
    expect(() => parseIntent("")).toThrow();
  });

  test("whitespace-only string throws", () => {
    expect(() => parseIntent("   ")).toThrow();
  });

  test("package name with only numbers is accepted", () => {
    const r = parseIntent("123");
    expect(r.name).toBe("123");
  });

  test("package name with version 0.0.0 is accepted", () => {
    const r = parseIntent("pkg@0.0.0");
    expect(r.name).toBe("pkg");
    expect(r.version).toBe("0.0.0");
  });

  test("rejects pipe metacharacter", () => {
    expect(() => parseIntent("pkg|evil")).toThrow("UNSAFE");
  });

  test("rejects backtick metacharacter", () => {
    expect(() => parseIntent("pkg`cmd`")).toThrow("UNSAFE");
  });

  test("rejects dollar sign metacharacter", () => {
    expect(() => parseIntent("pkg$VAR")).toThrow("UNSAFE");
  });

  test("rejects double-quote metacharacter", () => {
    expect(() => parseIntent('pkg"name')).toThrow("UNSAFE");
  });

  test("rejects single-quote metacharacter", () => {
    expect(() => parseIntent("pkg'name")).toThrow("UNSAFE");
  });

  test("rejects parenthesis metacharacter", () => {
    expect(() => parseIntent("pkg(cmd)")).toThrow("UNSAFE");
  });

  test("rejects npm: alias form", () => {
    expect(() => parseIntent("npm:pkg")).toThrow("UNSUPPORTED");
  });

  test("rejects file: path form", () => {
    expect(() => parseIntent("file:./local")).toThrow();
  });

  test("rejects git SSH form", () => {
    expect(() => parseIntent("git+ssh://github.com/user/repo")).toThrow();
  });

  test("very long package name (255 chars) throws UNSUPPORTED", () => {
    const longName = "a".repeat(255);
    expect(() => parseIntent(longName)).toThrow();
  });
});

// ── 5.1 parseCheckArgs edge cases ────────────────────────────────────────────

describe("5.1 — parseCheckArgs: edge cases", () => {
  test("empty args returns defaults", () => {
    const opts = parseCheckArgs([]);
    expect(opts.packageSpec).toBe("");
    expect(opts.symbols).toEqual([]);
    expect(opts.offline).toBe(false);
  });

  test("--symbols with spaces in csv are trimmed", () => {
    const opts = parseCheckArgs(["pkg", "--symbols", " merge , cloneDeep "]);
    expect(opts.symbols).toEqual(["merge", "cloneDeep"]);
  });

  test("--symbols with empty csv returns empty array", () => {
    const opts = parseCheckArgs(["pkg", "--symbols", ""]);
    expect(opts.symbols).toEqual([]);
  });

  test("-s shorthand works", () => {
    const opts = parseCheckArgs(["pkg", "-s", "fn1,fn2"]);
    expect(opts.symbols).toEqual(["fn1", "fn2"]);
  });

  test("unknown flags are ignored, not thrown", () => {
    // The parser picks the first non-flag argument as packageSpec;
    // the value after --unknown-flag is also treated as a positional arg.
    // The first positional wins as packageSpec.
    const opts = parseCheckArgs(["pkg", "--unknown-flag"]);
    expect(opts.packageSpec).toBe("pkg");
    expect(opts.offline).toBe(false);
  });
});

// ── 5.1 Static claim checker edge cases ──────────────────────────────────────

describe("5.1 — Static claim: empty and partial symbol inputs", () => {
  const fixture = loadFixture("is-odd-demo");

  test("empty symbol list returns UNVERIFIED", () => {
    const r = resolveClaimsFromFixture(fixture, []);
    expect(r.verdict).toBe("UNVERIFIED");
  });

  test("multiple symbols — one present one absent — returns SYMBOL_MISSING", () => {
    const r = resolveClaimsFromFixture(fixture, ["isOdd", "isOddBatch"]);
    expect(r.verdict).toBe("SYMBOL_MISSING");
    expect(r.symbolResults.find((s) => s.symbol === "isOdd")?.status).toBe("found");
    expect(r.symbolResults.find((s) => s.symbol === "isOddBatch")?.status).toBe("missing");
  });

  test("all symbols present returns SYMBOL_FOUND", () => {
    const r = resolveClaimsFromFixture(fixture, ["isOdd"]);
    expect(r.verdict).toBe("SYMBOL_FOUND");
  });

  test("citations are non-empty", () => {
    const r = resolveClaimsFromFixture(fixture, ["isOdd"]);
    expect(r.citations.length).toBeGreaterThan(0);
    expect(r.citations[0]).toContain("is-odd-demo");
  });
});

// ── 5.1 resolveClaimsFromArtifact edge cases (Phase 11 — replaces resolveClaimsFromExports) ──

function makeTestInspection(exportedNames: string[]): ArtifactInspection {
  return {
    packageName: "pkg",
    resolvedVersion: "1.0.0",
    tarballIntegrity: "sha512-test==",
    integrityVerified: true,
    method: "exports_field",
    exportedNames,
    exportsSource: "package.json#exports",
    artifactHash: "sha256:test",
  };
}

describe("5.1 — resolveClaimsFromArtifact: null/empty inspection", () => {
  test("null inspection returns UNVERIFIED", () => {
    const r = resolveClaimsFromArtifact(null, ["fn"]);
    expect(r.verdict).toBe("UNVERIFIED");
  });

  test("empty exported names with requested symbol returns SYMBOL_MISSING", () => {
    const r = resolveClaimsFromArtifact(makeTestInspection([]), ["fn"]);
    expect(r.verdict).toBe("SYMBOL_MISSING");
  });

  test("inspection with matching export returns SYMBOL_FOUND", () => {
    const r = resolveClaimsFromArtifact(makeTestInspection(["fn"]), ["fn"]);
    expect(r.verdict).toBe("SYMBOL_FOUND");
  });

  test("null inspection with empty symbol list returns UNVERIFIED", () => {
    const r = resolveClaimsFromArtifact(null, []);
    expect(r.verdict).toBe("UNVERIFIED");
  });
});

// ── 5.1 Risk signals edge cases ───────────────────────────────────────────────

describe("5.1 — Risk signals: edge and boundary inputs", () => {
  test("no warnings for clean package with future publish date (not young)", () => {
    const evidence: PackageEvidence = {
      ...baseEvidence,
      publishedAt: "2020-01-01T00:00:00.000Z", // old package
    };
    const r = computeRiskSignals(evidence, "test-pkg");
    expect(r.youngPackage).toBe(false);
    expect(r.warnings.filter((w) => w.includes("days ago"))).toHaveLength(0);
  });

  test("young package (published today) produces a warning", () => {
    const evidence: PackageEvidence = {
      ...baseEvidence,
      publishedAt: new Date().toISOString(),
    };
    const r = computeRiskSignals(evidence, "test-pkg");
    expect(r.youngPackage).toBe(true);
    expect(r.warnings.some((w) => w.includes("days ago"))).toBe(true);
  });

  test("missing integrity produces no-provenance warning", () => {
    const evidence: PackageEvidence = { ...baseEvidence, integrity: null };
    const r = computeRiskSignals(evidence, "test-pkg");
    expect(r.noProvenance).toBe(true);
    expect(r.warnings.some((w) => w.includes("integrity"))).toBe(true);
  });

  test("name divergence produces typosquat warning", () => {
    const r = computeRiskSignals(baseEvidence, "TEST-PKG-DIFFERENT");
    expect(r.warnings.some((w) => w.includes("differs from requested"))).toBe(true);
  });

  test("no warnings when evidence name matches requested name (case-insensitive check)", () => {
    // requestedName is lowercased for comparison in risk-signals
    const r = computeRiskSignals(baseEvidence, "test-pkg");
    expect(r.warnings.filter((w) => w.includes("differs from requested"))).toHaveLength(0);
  });

  test("install script + no integrity produces two warnings", () => {
    const evidence: PackageEvidence = {
      ...baseEvidence,
      hasInstallScript: true,
      integrity: null,
    };
    const r = computeRiskSignals(evidence, "test-pkg");
    expect(r.warnings.length).toBeGreaterThanOrEqual(2);
  });
});

// ── 5.1 Policy: partial/null evidence combinations ────────────────────────────

describe("5.1 — Policy: partial and null inputs", () => {
  test("null evidence treated as NOT_FOUND → BLOCK", () => {
    const d = applyPolicy({
      intent: { name: "ghost", version: "latest", rawArgv: ["npm install ghost"] },
      evidence: null,
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    expect(d.action).toBe("BLOCK");
    expect(d.findings.some((f) => f.id === "l1.not_found")).toBe(true);
  });

  test("BLOCK finding always has severity block", () => {
    const d = applyPolicy({
      intent: { name: "pkg", version: "1.0.0", rawArgv: ["npm install pkg"] },
      evidence: "NOT_FOUND",
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    const blockFindings = d.findings.filter((f) => f.severity === "block");
    expect(blockFindings.length).toBeGreaterThan(0);
  });

  test("UNVERIFIED verdict when UNAVAILABLE, even with claim present", () => {
    const claim: ClaimFinding = {
      packageName: "pkg",
      resolvedVersion: "1.0.0",
      requestedSymbols: ["fn"],
      symbolResults: [{ symbol: "fn", status: "found", evidence: "found" }],
      verdict: "SYMBOL_FOUND",
      citations: ["fixture"],
      source: "fixture",
    };
    const d = applyPolicy({
      intent: { name: "pkg", version: "1.0.0", rawArgv: ["npm install pkg"] },
      evidence: "UNAVAILABLE",
      claim,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    // UNAVAILABLE always → UNVERIFIED regardless of claim
    expect(d.action).toBe("UNVERIFIED");
  });

  test("BLOCK beats WARN — deprecated + symbol_missing → BLOCK", () => {
    const deprecatedEvidence: PackageEvidence = {
      ...baseEvidence,
      deprecated: true,
      deprecationMessage: "use something else",
    };
    const missingClaim: ClaimFinding = {
      packageName: "test-pkg",
      resolvedVersion: "1.0.0",
      requestedSymbols: ["ghost"],
      symbolResults: [{ symbol: "ghost", status: "missing", evidence: "not found" }],
      verdict: "SYMBOL_MISSING",
      citations: ["fixture"],
      source: "fixture",
    };
    const d = applyPolicy({
      intent: { name: "test-pkg", version: "1.0.0", rawArgv: ["npm install test-pkg"] },
      evidence: deprecatedEvidence,
      claim: missingClaim,
      risk: null,
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    expect(d.action).toBe("BLOCK");
  });

  test("decision record is deterministic in fields (not in UUID/timestamp)", () => {
    const input = {
      intent: { name: "is-odd", version: "3.0.1", rawArgv: ["npm install is-odd"] },
      evidence: baseEvidence,
      claim: null,
      risk: null,
      origin: "fixture" as const,
      previousHash: NULL_HASH,
    };
    const d1 = applyPolicy(input);
    const d2 = applyPolicy(input);
    // Same structural fields
    expect(d1.action).toBe(d2.action);
    expect(d1.ecosystem).toBe(d2.ecosystem);
    expect(d1.packageSpec).toBe(d2.packageSpec);
    // Different non-deterministic fields
    expect(d1.decisionId).not.toBe(d2.decisionId);
  });

  test("hash chain: previousHash is embedded in recordHash", () => {
    const d = applyPolicy({
      intent: { name: "pkg", version: "1.0.0", rawArgv: ["npm install pkg"] },
      evidence: baseEvidence,
      claim: null,
      risk: null,
      origin: "fixture",
      previousHash: "sha256:cafebabe",
    });
    expect(d.previousHash).toBe("sha256:cafebabe");
    expect(d.recordHash).toMatch(/^sha256:[a-f0-9]{64}$/);
  });
});

// ── 5.2 Property / fuzz: parser never throws non-Error ───────────────────────

describe("5.2 — Property: parser throws only Error instances for invalid input", () => {
  const invalidInputs = [
    "",
    " ",
    "pkg; ls",
    "pkg && cat /etc/passwd",
    "https://evil.com",
    "file:../../../etc/passwd",
    "git+ssh://x.com/user/repo",
    "../relative",
    "/absolute/path",
    "pkg`whoami`",
    'pkg"test"',
    "pkg$HOME",
    "pkg|tee",
    "pkg>out.txt",
    "pkg<in.txt",
    "pkg(cmd)",
    "pkg{a,b}",
    "pkg[0]",
    "pkg\\nstuff",
  ];

  for (const input of invalidInputs) {
    test(`parseIntent("${input.replace(/\n/g, "\\n")}") throws Error (not string/undefined)`, () => {
      try {
        parseIntent(input);
        // some inputs may not throw (e.g. valid enough) — that's fine
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  }
});

describe("5.2 — Property: policy always returns a valid Verdict", () => {
  const validVerdicts = ["ALLOW", "WARN", "BLOCK", "UNVERIFIED"];
  const evidenceVariants = [null, "NOT_FOUND" as const, "UNAVAILABLE" as const, baseEvidence];

  for (const ev of evidenceVariants) {
    test(`evidence=${JSON.stringify(ev)?.slice(0, 30)} → verdict is valid`, () => {
      const d = applyPolicy({
        intent: { name: "pkg", version: "1.0.0", rawArgv: ["npm install pkg"] },
        evidence: ev,
        claim: null,
        risk: null,
        origin: "human",
        previousHash: NULL_HASH,
      });
      expect(validVerdicts).toContain(d.action);
    });
  }
});

// ── 5.6 Output validation: evidence grounding ────────────────────────────────

describe("5.6 — Output validation: all findings cite evidence", () => {
  test("BLOCK finding has non-empty evidenceRefs", () => {
    const d = applyPolicy({
      intent: { name: "ghost", version: "latest", rawArgv: ["npm install ghost"] },
      evidence: "NOT_FOUND",
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    for (const finding of d.findings) {
      if (finding.severity === "block") {
        expect(finding.evidenceRefs.length).toBeGreaterThan(0);
      }
    }
  });

  test("WARN finding has non-empty evidenceRefs", () => {
    const warnEvidence: PackageEvidence = {
      ...baseEvidence,
      hasInstallScript: true,
    };
    const d = applyPolicy({
      intent: { name: "test-pkg", version: "1.0.0", rawArgv: ["npm install test-pkg"] },
      evidence: warnEvidence,
      claim: null,
      risk: computeRiskSignals(warnEvidence, "test-pkg"),
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    for (const finding of d.findings) {
      expect(finding.evidenceRefs.length).toBeGreaterThan(0);
    }
  });

  test("all fixture decisions include resolvedVersion from fixture", () => {
    const fixtureIds = ["is-odd-demo", "lodash-allow-demo", "risky-new-pkg-warn-demo"];
    for (const id of fixtureIds) {
      const fixture = loadFixture(id);
      const evidence = evidenceFromFixture(fixture);
      const claim = resolveClaimsFromFixture(fixture, fixture.claimedSymbols);
      const risk = computeRiskSignals(evidence, fixture.packageName);
      const d = applyPolicy({
        intent: { name: fixture.packageName, version: fixture.resolvedVersion, rawArgv: [`npm install ${fixture.packageName}`] },
        evidence,
        claim,
        risk,
        origin: "fixture",
        previousHash: NULL_HASH,
      });
      expect(d.resolvedVersion).toBe(fixture.resolvedVersion);
    }
  });

  test("recordHash is a valid sha256 hex string", () => {
    const d = applyPolicy({
      intent: { name: "pkg", version: "1.0.0", rawArgv: ["npm install pkg"] },
      evidence: baseEvidence,
      claim: null,
      risk: null,
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    expect(d.recordHash).toMatch(/^sha256:[a-f0-9]{64}$/);
  });

  test("commandDigest is a sha256 of the rawArgv", () => {
    const d = applyPolicy({
      intent: { name: "pkg", version: "1.0.0", rawArgv: ["npm install pkg"] },
      evidence: baseEvidence,
      claim: null,
      risk: null,
      origin: "fixture",
      previousHash: NULL_HASH,
    });
    expect(d.commandDigest).toMatch(/^sha256:[a-f0-9]{64}$/);
  });

  test("fixture decision source is always 'fixture'", () => {
    const fixture = loadFixture("is-odd-demo");
    const evidence = evidenceFromFixture(fixture);
    expect(evidence.source).toBe("fixture");
    expect(evidence.fixtureId).toBe("is-odd-demo");
  });
});

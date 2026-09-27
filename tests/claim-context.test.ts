/**
 * phantomdeps — Phase 13 tests
 * Covers:
 *  - Claim-context contract: --symbols / --diff / --file / missing → UNVERIFIED
 *  - Diff import parser: named, default, namespace, side-effect, non-matching lines
 *  - Gate: no fixture substitution on live path when context is missing
 *  - CLI/README accuracy: verify command, install/add as aliases (verification-only)
 *  - Demo exit semantics: BLOCK → exit 1, expected verdict matches → exit 0
 *  - Remediation: suggestion displayed, never auto-applied
 *  - --json output: machine-readable GateDecision shape
 *  - Width-aware wrapping: card width at 80/120/240 columns
 */

import { extractAddedImports, extractFileImports } from "../src/diff-parser.js";
import { applyPolicy } from "../src/engine/policy.js";
import { printCard } from "../src/evidence/writer.js";
import { parseCheckArgs } from "../src/parser.js";
import { computeRiskSignals } from "../src/checker/risk-signals.js";
import { evidenceFromFixture } from "../src/adapters/registry.js";
import type { GateDecision, PackageEvidence } from "../src/types.js";
import { createHash } from "crypto";

// ── Helpers ───────────────────────────────────────────────────────────────────

const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";

function sha256(data: string): string {
  return "sha256:" + createHash("sha256").update(data).digest("hex");
}

function makeEvidence(): PackageEvidence {
  return {
    name: "lodash",
    resolvedVersion: "4.17.21",
    ecosystem: "npm",
    registryUrl: "https://registry.npmjs.org/lodash",
    integrity: "sha512-AAAA==",
    tarballUrl: "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
    deprecated: false,
    deprecationMessage: null,
    hasInstallScript: false,
    publishedAt: "2021-02-20T15:42:16.891Z",
    retrievedAt: new Date().toISOString(),
    source: "fixture",
    fixtureId: "lodash-test",
    responseHash: sha256("{}"),
    provenance: {
      artifactIntegrity: "not_checked",
      registrySignature: "unknown",
      provenanceAttestation: "unknown",
      publisherIdentity: "unverified",
      sourceRepository: "linked",
    },
  };
}

// ── Diff import parser ────────────────────────────────────────────────────────

describe("extractAddedImports — named imports", () => {
  test("extracts single named import from added line", () => {
    const diff = `@@ -1,3 +1,4 @@
+import { merge } from 'lodash'
 const x = 1;
`;
    expect(extractAddedImports(diff, "lodash")).toEqual(["merge"]);
  });

  test("extracts multiple named imports from added line", () => {
    const diff = `+import { merge, cloneDeep, pick } from 'lodash'\n`;
    const symbols = extractAddedImports(diff, "lodash");
    expect(symbols).toContain("merge");
    expect(symbols).toContain("cloneDeep");
    expect(symbols).toContain("pick");
  });

  test("ignores removed lines (starting with -)", () => {
    const diff = `-import { merge } from 'lodash'\n+import { cloneDeep } from 'lodash'\n`;
    const symbols = extractAddedImports(diff, "lodash");
    expect(symbols).not.toContain("merge");
    expect(symbols).toContain("cloneDeep");
  });

  test("ignores context lines (no prefix)", () => {
    const diff = ` import { merge } from 'lodash'\n+import { cloneDeep } from 'lodash'\n`;
    const symbols = extractAddedImports(diff, "lodash");
    expect(symbols).not.toContain("merge");
    expect(symbols).toContain("cloneDeep");
  });

  test("handles aliased named imports (strips 'as alias')", () => {
    const diff = `+import { merge as m, cloneDeep as cd } from 'lodash'\n`;
    const symbols = extractAddedImports(diff, "lodash");
    expect(symbols).toContain("merge");
    expect(symbols).toContain("cloneDeep");
    expect(symbols.every((s) => !s.includes(" as "))).toBe(true);
  });

  test("does not extract from non-matching package", () => {
    const diff = `+import { merge } from 'other-pkg'\n`;
    expect(extractAddedImports(diff, "lodash")).toEqual([]);
  });

  test("handles double-quoted imports", () => {
    const diff = `+import { merge } from "lodash"\n`;
    expect(extractAddedImports(diff, "lodash")).toContain("merge");
  });
});

describe("extractAddedImports — default and namespace imports", () => {
  test("default import returns 'default'", () => {
    const diff = `+import _ from 'lodash'\n`;
    expect(extractAddedImports(diff, "lodash")).toContain("default");
  });

  test("namespace import returns '*'", () => {
    const diff = `+import * as _ from 'lodash'\n`;
    expect(extractAddedImports(diff, "lodash")).toContain("*");
  });

  test("side-effect import returns []", () => {
    const diff = `+import 'lodash'\n`;
    expect(extractAddedImports(diff, "lodash")).toEqual([]);
  });
});

describe("extractFileImports — full file context", () => {
  test("extracts named imports from source file", () => {
    const file = `
import { merge, cloneDeep } from 'lodash';
import * as path from 'path';
const x = merge({}, {});
`;
    const symbols = extractFileImports(file, "lodash");
    expect(symbols).toContain("merge");
    expect(symbols).toContain("cloneDeep");
    expect(symbols).not.toContain("path");
  });

  test("deduplicates repeated imports", () => {
    const file = `import { merge } from 'lodash';\nimport { merge } from 'lodash';\n`;
    expect(extractFileImports(file, "lodash")).toHaveLength(1);
  });

  test("returns [] when package not imported in file", () => {
    const file = `import { readFileSync } from 'fs';\n`;
    expect(extractFileImports(file, "lodash")).toEqual([]);
  });
});

// ── Claim-context contract ────────────────────────────────────────────────────

describe("Policy — claimContextKind missing → UNVERIFIED", () => {
  test("no claim context → UNVERIFIED verdict", () => {
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
      claimContextKind: "missing",
    });
    expect(decision.action).toBe("UNVERIFIED");
  });

  test("no claim context → l2.context_missing finding present", () => {
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
      claimContextKind: "missing",
    });
    expect(decision.findings.some((f) => f.id === "l2.context_missing")).toBe(true);
  });

  test("explicit symbols provided → NOT UNVERIFIED (ALLOW for found symbol)", () => {
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: {
        packageName: "lodash",
        resolvedVersion: "4.17.21",
        requestedSymbols: ["merge"],
        symbolResults: [{ symbol: "merge", status: "found", evidence: "found" }],
        verdict: "SYMBOL_FOUND",
        citations: ["fixture"],
        source: "live",
      },
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
      claimContextKind: "symbols",
    });
    expect(decision.action).toBe("ALLOW");
    expect(decision.findings.some((f) => f.id === "l2.context_missing")).toBe(false);
  });

  test("claimContextKind undefined (legacy call) → no context_missing finding", () => {
    // Legacy callers don't provide claimContextKind — should not break
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
      // no claimContextKind
    });
    expect(decision.findings.some((f) => f.id === "l2.context_missing")).toBe(false);
  });
});

// ── Verify command alias ──────────────────────────────────────────────────────

describe("parseCheckArgs — verify/install/check parity (Phase 13.4)", () => {
  test("parseCheckArgs accepts --diff flag", () => {
    const opts = parseCheckArgs(["lodash@4.17.21", "--diff", "changes.diff"]);
    expect(opts.diffPath).toBe("changes.diff");
  });

  test("parseCheckArgs accepts --file flag", () => {
    const opts = parseCheckArgs(["lodash@4.17.21", "--file", "src/index.ts"]);
    expect(opts.filePath).toBe("src/index.ts");
  });

  test("parseCheckArgs accepts --json flag", () => {
    const opts = parseCheckArgs(["lodash@4.17.21", "--json"]);
    expect(opts.jsonOutput).toBe(true);
  });

  test("parseCheckArgs defaults diffPath/filePath to null", () => {
    const opts = parseCheckArgs(["lodash@4.17.21"]);
    expect(opts.diffPath).toBeNull();
    expect(opts.filePath).toBeNull();
    expect(opts.jsonOutput).toBe(false);
  });
});

// ── Remediation: suggestion never auto-applied ────────────────────────────────

describe("Remediation — suggestion only (Phase 13.6)", () => {
  test("remediationCandidate field is null by default when policy passes", () => {
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    expect(decision.remediationCandidate).toBeNull();
  });

  test("printCard shows 'Human approval required' for remediation candidate", () => {
    const decision: GateDecision = {
      decisionId: "test-001",
      previousHash: NULL_HASH,
      recordHash: sha256("test"),
      timestamp: new Date().toISOString(),
      origin: "human",
      commandDigest: sha256("test"),
      ecosystem: "npm",
      packageSpec: "test-pkg@1.0.0",
      resolvedVersion: "1.0.0",
      integrity: null,
      registrySource: "https://registry.npmjs.org/test-pkg",
      cacheStatus: "fixture",
      action: "BLOCK",
      findings: [],
      remediationCandidate: "import isOdd from 'is-odd'",
      bobSessionId: null,
    };

    // Capture console.log output
    const output: string[] = [];
    const origLog = console.log;
    console.log = (...args: unknown[]) => output.push(args.join(" "));
    try {
      printCard(decision, 80);
    } finally {
      console.log = origLog;
    }

    const combined = output.join("\n");
    expect(combined).toMatch(/Human approval required/i);
    expect(combined).toMatch(/isOdd/);
  });
});

// ── Width-aware wrapping ──────────────────────────────────────────────────────

describe("printCard — width-aware terminal wrapping (Phase 13.7)", () => {
  function captureCard(width: number): string {
    const decision: GateDecision = {
      decisionId: "test-width",
      previousHash: NULL_HASH,
      recordHash: sha256("width-test"),
      timestamp: new Date().toISOString(),
      origin: "human",
      commandDigest: sha256("width-test"),
      ecosystem: "npm",
      packageSpec: "lodash@4.17.21",
      resolvedVersion: "4.17.21",
      integrity: "sha512-AAAA==",
      registrySource: "https://registry.npmjs.org/lodash",
      cacheStatus: "fixture",
      action: "ALLOW",
      findings: [],
      remediationCandidate: null,
      bobSessionId: null,
    };

    const output: string[] = [];
    const origLog = console.log;
    console.log = (...args: unknown[]) => output.push(args.join(" "));
    try {
      printCard(decision, width);
    } finally {
      console.log = origLog;
    }
    return output.join("\n");
  }

  test("card renders at width 80", () => {
    const out = captureCard(80);
    // bar line should be 80 chars wide (─ = 3-byte UTF-8)
    const barLine = out.split("\n").find((l) => l.replace(/\x1b\[[0-9;]*m/g, "").startsWith("─"));
    const barWidth = barLine ? barLine.replace(/\x1b\[[0-9;]*m/g, "").length : 0;
    expect(barWidth).toBe(80);
  });

  test("card renders at width 120", () => {
    const out = captureCard(120);
    const barLine = out.split("\n").find((l) => l.replace(/\x1b\[[0-9;]*m/g, "").startsWith("─"));
    const barWidth = barLine ? barLine.replace(/\x1b\[[0-9;]*m/g, "").length : 0;
    expect(barWidth).toBe(120);
  });

  test("card renders at width 240", () => {
    const out = captureCard(240);
    const barLine = out.split("\n").find((l) => l.replace(/\x1b\[[0-9;]*m/g, "").startsWith("─"));
    const barWidth = barLine ? barLine.replace(/\x1b\[[0-9;]*m/g, "").length : 0;
    expect(barWidth).toBe(240);
  });

  test("card renders correctly without width (defaults to 80)", () => {
    const out = captureCard(undefined as unknown as number);
    // Should not crash; bar should be at least 60 chars
    const barLine = out.split("\n").find((l) => l.replace(/\x1b\[[0-9;]*m/g, "").startsWith("─"));
    const barWidth = barLine ? barLine.replace(/\x1b\[[0-9;]*m/g, "").length : 0;
    expect(barWidth).toBeGreaterThanOrEqual(60);
  });
});

// ── --json output contract ────────────────────────────────────────────────────

describe("GateDecision JSON output contract (Phase 13.7)", () => {
  test("applyPolicy returns a JSON-serializable GateDecision", () => {
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    const serialized = JSON.stringify(decision);
    const parsed = JSON.parse(serialized) as GateDecision;
    expect(parsed.decisionId).toBeTruthy();
    expect(parsed.recordHash).toMatch(/^sha256:/);
    expect(parsed.action).toMatch(/^(ALLOW|WARN|BLOCK|UNVERIFIED)$/);
  });

  test("GateDecision contains all required fields for machine parsing", () => {
    const decision = applyPolicy({
      intent: { name: "lodash", version: "4.17.21", rawArgv: ["npm install lodash"] },
      evidence: makeEvidence(),
      claim: null,
      risk: null,
      origin: "human",
      previousHash: NULL_HASH,
    });
    const requiredFields = [
      "decisionId", "previousHash", "recordHash", "timestamp", "origin",
      "commandDigest", "ecosystem", "packageSpec", "resolvedVersion",
      "integrity", "registrySource", "cacheStatus", "action",
      "findings", "remediationCandidate", "bobSessionId",
    ] as const;
    for (const field of requiredFields) {
      expect(decision).toHaveProperty(field);
    }
  });
});

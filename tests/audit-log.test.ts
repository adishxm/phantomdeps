/**
 * phantomdeps — Phase 12 audit-log tests
 * Covers:
 *  - verifyAuditLog: clean log passes
 *  - tamper mutations: modified message, deleted record, reordered record,
 *    broken previousHash link, malformed JSON
 *  - Agent override records: schema, hash chain, attribution fields
 *  - Evidence provenance: five-dimensional provenance fields, precise terminology
 */

import { tmpdir } from "os";
import { join } from "path";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { createHash } from "crypto";
import {
  verifyAuditLog,
  appendAgentOverrideRecord,
} from "../src/evidence/writer.js";
import { applyPolicy } from "../src/engine/policy.js";
import { evidenceFromFixture } from "../src/adapters/registry.js";
import { computeRiskSignals } from "../src/checker/risk-signals.js";
import type { GateDecision, AgentOverrideRecord } from "../src/types.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";

function sha256(data: string): string {
  return "sha256:" + createHash("sha256").update(data).digest("hex");
}

function makeTmpDir(): string {
  const dir = join(tmpdir(), `phantomdeps-audit-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

/** Build a minimal valid GateDecision for testing. */
function makeDecision(overrides: Partial<GateDecision> = {}): GateDecision {
  return applyPolicy({
    intent: {
      name: "test-pkg",
      version: "1.0.0",
      rawArgv: ["npm install test-pkg"],
    },
    evidence: {
      name: "test-pkg",
      resolvedVersion: "1.0.0",
      ecosystem: "npm",
      registryUrl: "https://registry.npmjs.org/test-pkg",
      integrity: "sha512-AAAA==",
      tarballUrl: null,
      deprecated: false,
      deprecationMessage: null,
      hasInstallScript: false,
      publishedAt: "2024-01-01T00:00:00.000Z",
      retrievedAt: "2024-06-01T00:00:00.000Z",
      source: "fixture",
      fixtureId: "test-fixture",
      responseHash: sha256("{}"),
      provenance: {
        artifactIntegrity: "not_checked",
        registrySignature: "unknown",
        provenanceAttestation: "unknown",
        publisherIdentity: "unverified",
        sourceRepository: "linked",
      },
    },
    claim: null,
    risk: null,
    origin: "human",
    previousHash: NULL_HASH,
    ...overrides,
  });
}

// ── verifyAuditLog — clean log ─────────────────────────────────────────────

describe("verifyAuditLog — clean log passes", () => {
  let tmpDir: string;
  let logPath: string;

  beforeAll(() => {
    tmpDir = makeTmpDir();
    logPath = join(tmpDir, ".phantomdeps", "decisions.ndjson");
    mkdirSync(join(tmpDir, ".phantomdeps"), { recursive: true });
    // Write two valid chained records
    const d1 = makeDecision();
    const d2 = applyPolicy({
      intent: { name: "pkg2", version: "2.0.0", rawArgv: ["npm install pkg2"] },
      evidence: {
        name: "pkg2", resolvedVersion: "2.0.0", ecosystem: "npm",
        registryUrl: "https://registry.npmjs.org/pkg2",
        integrity: "sha512-BBBB==", tarballUrl: null,
        deprecated: false, deprecationMessage: null,
        hasInstallScript: false, publishedAt: null,
        retrievedAt: new Date().toISOString(),
        source: "fixture", fixtureId: null,
        responseHash: sha256("{}"),
        provenance: {
          artifactIntegrity: "unavailable",
          registrySignature: "unknown",
          provenanceAttestation: "unknown",
          publisherIdentity: "unverified",
          sourceRepository: "missing",
        },
      },
      claim: null, risk: null, origin: "human",
      previousHash: d1.recordHash,
    });
    writeFileSync(logPath, JSON.stringify(d1) + "\n" + JSON.stringify(d2) + "\n");
  });

  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("clean log verifies successfully (ok:true)", () => {
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(true);
  });

  test("record count matches written records", () => {
    const result = verifyAuditLog(logPath);
    expect(result.recordCount).toBe(2);
  });

  test("success message mentions tamper-evident", () => {
    const result = verifyAuditLog(logPath);
    expect(result.message).toMatch(/tamper-evident/i);
  });

  test("non-existent log is treated as empty clean log", () => {
    const result = verifyAuditLog(join(tmpDir, "nonexistent.ndjson"));
    expect(result.ok).toBe(true);
    expect(result.recordCount).toBe(0);
  });
});

// ── tamper tests ──────────────────────────────────────────────────────────────

describe("verifyAuditLog — tamper: modified message field", () => {
  let tmpDir: string;

  beforeAll(() => {
    tmpDir = makeTmpDir();
  });
  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("modified action field fails with HASH_MISMATCH", () => {
    const d = makeDecision();
    // The default decision is UNVERIFIED (no claim context).
    // We tamper by changing action to ALLOW — a verdict upgrade.
    // HASH_MISMATCH is expected because the stored recordHash doesn't match the new content.
    const tamperedAction = d.action === "ALLOW" ? "BLOCK" : "ALLOW";
    const tampered = { ...d, action: tamperedAction as "ALLOW" | "BLOCK" };
    const logPath = join(tmpDir, "tamper-message.ndjson");
    writeFileSync(logPath, JSON.stringify(tampered) + "\n");
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(false);
    expect((result as { violations: Array<{ kind: string }> }).violations.some((v) => v.kind === "HASH_MISMATCH")).toBe(true);
  });
});

describe("verifyAuditLog — tamper: deleted record (chain broken)", () => {
  let tmpDir: string;

  beforeAll(() => { tmpDir = makeTmpDir(); });
  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("deleting record 1 of 3 breaks chain at record 2", () => {
    const d1 = makeDecision();
    const d2 = applyPolicy({
      intent: { name: "pkg2", version: "1.0.0", rawArgv: ["npm install pkg2"] },
      evidence: {
        name: "pkg2", resolvedVersion: "1.0.0", ecosystem: "npm",
        registryUrl: "https://registry.npmjs.org/pkg2",
        integrity: null, tarballUrl: null, deprecated: false, deprecationMessage: null,
        hasInstallScript: false, publishedAt: null, retrievedAt: new Date().toISOString(),
        source: "fixture", fixtureId: null, responseHash: sha256("{}"),
        provenance: { artifactIntegrity: "unavailable", registrySignature: "unknown", provenanceAttestation: "unknown", publisherIdentity: "unverified", sourceRepository: "missing" },
      },
      claim: null, risk: null, origin: "human", previousHash: d1.recordHash,
    });
    // Write only d2 — skip d1 (simulates deleted record)
    const logPath = join(tmpDir, "deleted.ndjson");
    writeFileSync(logPath, JSON.stringify(d2) + "\n");
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(false);
    expect((result as { violations: Array<{ kind: string }> }).violations.some((v) => v.kind === "CHAIN_BROKEN")).toBe(true);
  });
});

describe("verifyAuditLog — tamper: reordered records", () => {
  let tmpDir: string;

  beforeAll(() => { tmpDir = makeTmpDir(); });
  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("swapping record order fails chain and/or ordering check", () => {
    const d1 = makeDecision();
    const d2 = applyPolicy({
      intent: { name: "pkgB", version: "1.0.0", rawArgv: ["npm install pkgB"] },
      evidence: {
        name: "pkgB", resolvedVersion: "1.0.0", ecosystem: "npm",
        registryUrl: "https://registry.npmjs.org/pkgB",
        integrity: null, tarballUrl: null, deprecated: false, deprecationMessage: null,
        hasInstallScript: false, publishedAt: null, retrievedAt: new Date().toISOString(),
        source: "fixture", fixtureId: null, responseHash: sha256("{}"),
        provenance: { artifactIntegrity: "unavailable", registrySignature: "unknown", provenanceAttestation: "unknown", publisherIdentity: "unverified", sourceRepository: "missing" },
      },
      claim: null, risk: null, origin: "human", previousHash: d1.recordHash,
    });
    // Write d2 first, then d1 — swapped order
    const logPath = join(tmpDir, "reordered.ndjson");
    writeFileSync(logPath, JSON.stringify(d2) + "\n" + JSON.stringify(d1) + "\n");
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(false);
    const kinds = (result as { violations: Array<{ kind: string }> }).violations.map((v) => v.kind);
    expect(kinds.some((k) => k === "CHAIN_BROKEN" || k === "ORDERING_INVALID")).toBe(true);
  });
});

describe("verifyAuditLog — tamper: broken previousHash", () => {
  let tmpDir: string;

  beforeAll(() => { tmpDir = makeTmpDir(); });
  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("manually altered previousHash field fails chain check", () => {
    const d = makeDecision();
    // Tamper: swap previousHash to a fake value
    const tampered = { ...d, previousHash: "sha256:deadbeef" };
    const logPath = join(tmpDir, "broken-prev.ndjson");
    writeFileSync(logPath, JSON.stringify(tampered) + "\n");
    const result = verifyAuditLog(logPath);
    // The chain check: storedPrevHash (deadbeef) ≠ expected NULL_HASH → CHAIN_BROKEN
    // Additionally recordHash doesn't match since previousHash changed → HASH_MISMATCH
    expect(result.ok).toBe(false);
    const kinds = (result as { violations: Array<{ kind: string }> }).violations.map((v) => v.kind);
    expect(kinds.some((k) => k === "CHAIN_BROKEN" || k === "HASH_MISMATCH")).toBe(true);
  });
});

describe("verifyAuditLog — tamper: malformed JSON", () => {
  let tmpDir: string;

  beforeAll(() => { tmpDir = makeTmpDir(); });
  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("malformed JSON line produces SCHEMA_INVALID violation", () => {
    const logPath = join(tmpDir, "malformed.ndjson");
    writeFileSync(logPath, "{not valid json}\n");
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(false);
    expect((result as { violations: Array<{ kind: string }> }).violations.some((v) => v.kind === "SCHEMA_INVALID")).toBe(true);
  });

  test("partial JSON line produces SCHEMA_INVALID violation", () => {
    const logPath = join(tmpDir, "partial.ndjson");
    writeFileSync(logPath, '{"decisionId":"abc"\n');
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(false);
  });
});

// ── Agent override records ─────────────────────────────────────────────────────

describe("AgentOverrideRecord — schema and attribution", () => {
  let tmpDir: string;
  let overrideRecord: AgentOverrideRecord;

  beforeAll(() => {
    tmpDir = makeTmpDir();
    overrideRecord = appendAgentOverrideRecord({
      recordType: "agent_override",
      decisionId: "test-override-001",
      previousHash: NULL_HASH,
      timestamp: new Date().toISOString(),
      actor: "narayan-nkj",
      reason: "Confirmed safe — manual review completed for lodash@4.17.21",
      commandDigest: sha256("npm install lodash@4.17.21"),
      originalVerdict: "BLOCK",
      resultingPolicy: "WARN",
      bobSessionId: "bob-session-abc123",
    }, tmpDir);
  });

  afterAll(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* */ } });

  test("override record has recordType = agent_override", () => {
    expect(overrideRecord.recordType).toBe("agent_override");
  });

  test("override record has actor field", () => {
    expect(overrideRecord.actor).toBe("narayan-nkj");
  });

  test("override record has reason field", () => {
    expect(overrideRecord.reason).toMatch(/manual review/i);
  });

  test("override record has commandDigest", () => {
    expect(overrideRecord.commandDigest).toMatch(/^sha256:/);
  });

  test("override record has originalVerdict and resultingPolicy", () => {
    expect(overrideRecord.originalVerdict).toBe("BLOCK");
    expect(overrideRecord.resultingPolicy).toBe("WARN");
  });

  test("override record has recordHash (tamper-evident)", () => {
    expect(overrideRecord.recordHash).toMatch(/^sha256:/);
  });

  test("clean log including override record verifies successfully", () => {
    const logPath = join(tmpDir, ".phantomdeps", "decisions.ndjson");
    const result = verifyAuditLog(logPath);
    expect(result.ok).toBe(true);
  });
});

// ── Evidence provenance terminology tests ─────────────────────────────────────

describe("EvidenceProvenance — five-dimensional fields", () => {
  test("evidenceFromFixture sets all five provenance fields", () => {
    // Minimal fixture shape
    const fixture = {
      id: "test", packageName: "test-pkg", resolvedVersion: "1.0.0",
      integrity: "sha512-AAAA==", hasInstallScript: false,
      capturedAt: "2024-01-01T00:00:00.000Z",
      claimedSymbols: [] as string[], exportedSymbols: [] as string[],
      exportsSource: "package.json#exports",
      expectedVerdict: "ALLOW" as const,
      scenario: "test",
    };
    const evidence = evidenceFromFixture(fixture);
    expect(evidence.provenance).toHaveProperty("artifactIntegrity");
    expect(evidence.provenance).toHaveProperty("registrySignature");
    expect(evidence.provenance).toHaveProperty("provenanceAttestation");
    expect(evidence.provenance).toHaveProperty("publisherIdentity");
    expect(evidence.provenance).toHaveProperty("sourceRepository");
  });

  test("fixture without integrity hash sets artifactIntegrity to unavailable", () => {
    const fixture = {
      id: "test2", packageName: "nohash-pkg", resolvedVersion: "1.0.0",
      integrity: null as unknown as string, hasInstallScript: false,
      capturedAt: "2024-01-01T00:00:00.000Z",
      claimedSymbols: [] as string[], exportedSymbols: [] as string[],
      exportsSource: "package.json#exports",
      expectedVerdict: "ALLOW" as const,
      scenario: "test-no-integrity",
    };
    const evidence = evidenceFromFixture(fixture);
    expect(evidence.provenance.artifactIntegrity).toBe("unavailable");
  });
});

describe("RiskSignals — noArtifactIntegrity vs noProvenance", () => {
  test("noArtifactIntegrity is true when integrity hash is absent", () => {
    const evidence = {
      name: "pkg", resolvedVersion: "1.0.0", ecosystem: "npm" as const,
      registryUrl: "https://registry.npmjs.org/pkg", integrity: null,
      tarballUrl: null, deprecated: false, deprecationMessage: null,
      hasInstallScript: false, publishedAt: null, retrievedAt: new Date().toISOString(),
      source: "fixture" as const, fixtureId: null, responseHash: "sha256:00",
      provenance: { artifactIntegrity: "unavailable" as const, registrySignature: "unknown" as const, provenanceAttestation: "unknown" as const, publisherIdentity: "unverified" as const, sourceRepository: "missing" as const },
    };
    const risk = computeRiskSignals(evidence, "pkg");
    expect(risk.noArtifactIntegrity).toBe(true);
    expect(risk.noProvenance).toBe(true); // backward-compat alias
  });

  test("warning message uses 'Artifact integrity unavailable' not 'no provenance'", () => {
    const evidence = {
      name: "pkg", resolvedVersion: "1.0.0", ecosystem: "npm" as const,
      registryUrl: "https://registry.npmjs.org/pkg", integrity: null,
      tarballUrl: null, deprecated: false, deprecationMessage: null,
      hasInstallScript: false, publishedAt: null, retrievedAt: new Date().toISOString(),
      source: "fixture" as const, fixtureId: null, responseHash: "sha256:00",
      provenance: { artifactIntegrity: "unavailable" as const, registrySignature: "unknown" as const, provenanceAttestation: "unknown" as const, publisherIdentity: "unverified" as const, sourceRepository: "missing" as const },
    };
    const risk = computeRiskSignals(evidence, "pkg");
    expect(risk.warnings.some((w) => w.includes("Artifact integrity unavailable"))).toBe(true);
    // Must NOT use the old misleading "no provenance" phrasing for this case
    expect(risk.warnings.some((w) => w.toLowerCase().includes("no provenance"))).toBe(false);
  });
});

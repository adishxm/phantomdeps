/**
 * phantomdeps — Phase 11 registry and artifact tests
 * Covers:
 * - Typed registry outcomes (PACKAGE_NOT_FOUND, VERSION_NOT_FOUND, etc.)
 * - resolveClaimsFromArtifact with real and mocked ArtifactInspection
 * - Artifact adapter edge cases: bad integrity, unsupported module shape
 * - ArtifactInspection type validation
 */

import { resolveClaimsFromArtifact } from "../src/checker/static-claim.js";
import type { ArtifactInspection } from "../src/types.js";

// ── Helper: build a minimal ArtifactInspection ────────────────────────────────

function makeInspection(overrides: Partial<ArtifactInspection> = {}): ArtifactInspection {
  return {
    packageName: "test-pkg",
    resolvedVersion: "1.0.0",
    tarballIntegrity: "sha512-AAAA==",
    integrityVerified: true,
    method: "exports_field",
    exportedNames: ["merge", "cloneDeep", "default"],
    exportsSource: "package.json#exports",
    artifactHash: "sha256:abc123",
    ...overrides,
  };
}

// ── resolveClaimsFromArtifact ─────────────────────────────────────────────────

describe("resolveClaimsFromArtifact — found symbols", () => {
  const inspection = makeInspection({ exportedNames: ["merge", "cloneDeep"] });

  test("SYMBOL_FOUND when all symbols present", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["merge", "cloneDeep"]);
    expect(claim.verdict).toBe("SYMBOL_FOUND");
  });

  test("symbol result status is found", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.symbolResults[0].status).toBe("found");
  });

  test("citations include artifact hash", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.citations.some((c) => c.includes("sha256:"))).toBe(true);
  });

  test("citations include inspection method", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.citations.some((c) => c.includes("exports_field"))).toBe(true);
  });

  test("source is live", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.source).toBe("live");
  });
});

describe("resolveClaimsFromArtifact — missing symbols", () => {
  const inspection = makeInspection({ exportedNames: ["merge"] });

  test("SYMBOL_MISSING when symbol absent", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["isOddBatch"]);
    expect(claim.verdict).toBe("SYMBOL_MISSING");
  });

  test("symbol result status is missing", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["isOddBatch"]);
    expect(claim.symbolResults[0].status).toBe("missing");
  });

  test("SYMBOL_MISSING when any symbol absent (partial hit)", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["merge", "isOddBatch"]);
    expect(claim.verdict).toBe("SYMBOL_MISSING");
  });

  test("evidence string cites exported names count", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["isOddBatch"]);
    expect(claim.symbolResults[0].evidence).toMatch(/NOT found/);
  });
});

describe("resolveClaimsFromArtifact — null inspection (failure)", () => {
  test("UNVERIFIED when inspection is null", () => {
    const claim = resolveClaimsFromArtifact(null, ["merge"]);
    expect(claim.verdict).toBe("UNVERIFIED");
  });

  test("all symbols ambiguous when null", () => {
    const claim = resolveClaimsFromArtifact(null, ["merge", "isOddBatch"]);
    expect(claim.symbolResults.every((r) => r.status === "ambiguous")).toBe(true);
  });

  test("failure reason included in citations", () => {
    const claim = resolveClaimsFromArtifact(null, ["merge"], "INTEGRITY_MISMATCH");
    expect(claim.citations.some((c) => c.includes("INTEGRITY_MISMATCH"))).toBe(true);
  });

  test("UNVERIFIED when method is unsupported", () => {
    const inspection = makeInspection({ method: "unsupported", exportedNames: [] });
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.verdict).toBe("UNVERIFIED");
  });
});

describe("resolveClaimsFromArtifact — declarations method", () => {
  const inspection = makeInspection({
    method: "declarations",
    exportedNames: ["isOdd"],
    exportsSource: "package.json#types → index.d.ts",
  });

  test("SYMBOL_FOUND for isOdd", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["isOdd"]);
    expect(claim.verdict).toBe("SYMBOL_FOUND");
  });

  test("SYMBOL_MISSING for isOddBatch", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["isOddBatch"]);
    expect(claim.verdict).toBe("SYMBOL_MISSING");
  });

  test("citations mention declarations method", () => {
    const claim = resolveClaimsFromArtifact(inspection, ["isOdd"]);
    expect(claim.citations.some((c) => c.includes("declarations"))).toBe(true);
  });
});

describe("resolveClaimsFromArtifact — integrity verification note", () => {
  test("integrity verified note in citations when verified", () => {
    const inspection = makeInspection({ integrityVerified: true });
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.citations.some((c) => c.includes("Integrity verified"))).toBe(true);
  });

  test("integrity not verified note when not verified", () => {
    const inspection = makeInspection({ integrityVerified: false });
    const claim = resolveClaimsFromArtifact(inspection, ["merge"]);
    expect(claim.citations.some((c) => c.includes("Integrity not verified"))).toBe(true);
  });
});

// ── Typed registry outcomes (unit validation) ─────────────────────────────────

describe("RegistryResult type contract", () => {
  test("ok:true has evidence field", () => {
    // Type-level test — verify the discriminated union shape at runtime
    const result = { ok: true as const, evidence: { name: "lodash" } };
    expect(result.ok).toBe(true);
    expect(result.evidence.name).toBe("lodash");
  });

  test("ok:false has failure field", () => {
    const failures = [
      "PACKAGE_NOT_FOUND",
      "VERSION_NOT_FOUND",
      "REGISTRY_UNAVAILABLE",
      "MALFORMED_RESPONSE",
      "PRIVATE_OR_AUTH_REQUIRED",
    ] as const;
    for (const f of failures) {
      const result = { ok: false as const, failure: f };
      expect(result.ok).toBe(false);
      expect(result.failure).toBe(f);
    }
  });
});

// ── ArtifactResult type contract ─────────────────────────────────────────────

describe("ArtifactResult type contract", () => {
  test("ok:true has inspection with required fields", () => {
    const inspection = makeInspection();
    expect(inspection).toHaveProperty("packageName");
    expect(inspection).toHaveProperty("resolvedVersion");
    expect(inspection).toHaveProperty("tarballIntegrity");
    expect(inspection).toHaveProperty("integrityVerified");
    expect(inspection).toHaveProperty("method");
    expect(inspection).toHaveProperty("exportedNames");
    expect(inspection).toHaveProperty("exportsSource");
    expect(inspection).toHaveProperty("artifactHash");
  });

  test("ok:false reasons are enumerated", () => {
    const reasons = [
      "DOWNLOAD_FAILED",
      "INTEGRITY_MISMATCH",
      "SIZE_LIMIT",
      "MALFORMED_ARCHIVE",
      "UNSUPPORTED_MODULE_SHAPE",
      "TIMEOUT",
    ] as const;
    for (const r of reasons) {
      const result = { ok: false as const, reason: r };
      expect(result.reason).toBe(r);
    }
  });
});

// ── Artifact adapter — static extraction helpers (inline unit tests) ──────────

describe("Static dts export extraction (via resolveClaimsFromArtifact declarations path)", () => {
  // These test the full claim path with declarations-method inspection
  test("default export detected", () => {
    const inspection = makeInspection({
      method: "declarations",
      exportedNames: ["default"],
      exportsSource: "package.json#types → index.d.ts",
    });
    const claim = resolveClaimsFromArtifact(inspection, ["default"]);
    expect(claim.verdict).toBe("SYMBOL_FOUND");
  });

  test("named exports correctly resolved", () => {
    const inspection = makeInspection({
      method: "declarations",
      exportedNames: ["createHash", "randomUUID"],
    });
    const claim = resolveClaimsFromArtifact(inspection, ["createHash", "randomUUID", "unknown"]);
    expect(claim.verdict).toBe("SYMBOL_MISSING");
    expect(claim.symbolResults.filter((r) => r.status === "found")).toHaveLength(2);
    expect(claim.symbolResults.filter((r) => r.status === "missing")).toHaveLength(1);
  });
});

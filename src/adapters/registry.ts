/**
 * phantomdeps — npm registry adapter (L1) — Phase 11 rewrite
 * Resolves package metadata from the npm registry or from a fixture.
 * Never installs or executes any package code.
 *
 * Phase 11 changes:
 * - Returns RegistryResult (typed) instead of PackageEvidence|null|"UNAVAILABLE"
 * - Distinguishes PACKAGE_NOT_FOUND, VERSION_NOT_FOUND, REGISTRY_UNAVAILABLE,
 *   MALFORMED_RESPONSE, PRIVATE_OR_AUTH_REQUIRED
 * - Backward-compat wrapper resolveFromRegistry() kept for gate.ts callers
 */

import { createHash } from "crypto";
import type { PackageEvidence, RegistryResult, RegistryFailure, EvidenceProvenance } from "../types.js";
import type { Fixture } from "../fixtures/loader.js";

const NPM_REGISTRY = "https://registry.npmjs.org";

interface NpmPackument {
  name: string;
  "dist-tags": Record<string, string>;
  versions: Record<string, NpmVersionMeta>;
  time?: Record<string, string>;
}

interface NpmVersionMeta {
  version: string;
  dist: {
    tarball: string;
    integrity?: string;
    shasum?: string;
  };
  scripts?: Record<string, string>;
  deprecated?: string;
}

// ── Phase 11: typed registry resolution ──────────────────────────────────────

/**
 * Resolve a package from the npm registry with typed failure outcomes.
 * Never throws — all failure paths are encoded in RegistryResult.
 * Never conflates VERSION_NOT_FOUND with PACKAGE_NOT_FOUND.
 */
export async function resolveFromRegistryTyped(
  name: string,
  version: string
): Promise<RegistryResult> {
  const url = `${NPM_REGISTRY}/${encodeURIComponent(name)}`;
  let raw: string;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) return fail("PACKAGE_NOT_FOUND");
    if (res.status === 401 || res.status === 403) return fail("PRIVATE_OR_AUTH_REQUIRED");
    if (!res.ok) return fail("REGISTRY_UNAVAILABLE");

    raw = await res.text();
  } catch {
    return fail("REGISTRY_UNAVAILABLE");
  }

  let packument: NpmPackument;
  try {
    packument = JSON.parse(raw) as NpmPackument;
  } catch {
    return fail("MALFORMED_RESPONSE");
  }

  // Validate minimum required fields
  if (!packument.name || !packument.versions || !packument["dist-tags"]) {
    return fail("MALFORMED_RESPONSE");
  }

  const responseHash = sha256(raw);

  // Resolve version tag
  const resolvedVersion =
    version === "latest"
      ? (packument["dist-tags"]?.["latest"] ?? "")
      : version;

  if (!resolvedVersion) return fail("VERSION_NOT_FOUND");

  const meta = packument.versions?.[resolvedVersion];
  // Version exists in packument but not in versions map → VERSION_NOT_FOUND (not 404)
  if (!meta) return fail("VERSION_NOT_FOUND");

  // Validate dist field
  if (!meta.dist?.tarball) return fail("MALFORMED_RESPONSE");

  const hasInstallScript = Boolean(
    meta.scripts &&
      (meta.scripts["preinstall"] ||
        meta.scripts["install"] ||
        meta.scripts["postinstall"])
  );

  // Extract publishedAt from packument time map (per-version)
  const publishedAt = packument.time?.[resolvedVersion] ?? null;

  // Phase 12: build precise provenance record
  // npm registry does not expose sigstore/SLSA attestation in the packument JSON;
  // registry signature and provenance attestation are "unknown" at L1.
  const hasIntegrity = Boolean(meta.dist.integrity);
  const provenance: EvidenceProvenance = {
    artifactIntegrity: hasIntegrity ? "not_checked" : "unavailable",
    registrySignature: "unknown",       // npm provenance attestation not in packument JSON
    provenanceAttestation: "unknown",   // SLSA attestation not verified at L1
    publisherIdentity: "unverified",    // npm does not surface 2FA status in packument
    sourceRepository: (packument as unknown as Record<string, unknown>)["repository"]
      ? "linked"
      : "missing",
  };

  const evidence: PackageEvidence = {
    name: packument.name,
    resolvedVersion,
    ecosystem: "npm",
    registryUrl: url,
    integrity: meta.dist.integrity ?? null,
    tarballUrl: meta.dist.tarball,
    deprecated: Boolean(meta.deprecated),
    deprecationMessage: meta.deprecated ?? null,
    hasInstallScript,
    publishedAt,
    retrievedAt: new Date().toISOString(),
    source: "live",
    fixtureId: null,
    responseHash,
    provenance,
  };

  return { ok: true, evidence };
}

/** Helper to build typed failure results */
function fail(failure: RegistryFailure): RegistryResult {
  return { ok: false, failure };
}

// ── Backward-compat wrapper (gate.ts + hook use this) ────────────────────────

/**
 * Legacy wrapper — returns PackageEvidence | null | "UNAVAILABLE".
 * null = PACKAGE_NOT_FOUND or VERSION_NOT_FOUND
 * "UNAVAILABLE" = everything else (REGISTRY_UNAVAILABLE, MALFORMED, PRIVATE)
 *
 * @deprecated Use resolveFromRegistryTyped() for new callers (Phase 11+).
 */
export async function resolveFromRegistry(
  name: string,
  version: string
): Promise<PackageEvidence | null | "UNAVAILABLE"> {
  const result = await resolveFromRegistryTyped(name, version);
  if (result.ok) return result.evidence;
  if (result.failure === "PACKAGE_NOT_FOUND" || result.failure === "VERSION_NOT_FOUND") {
    return null;
  }
  return "UNAVAILABLE";
}

// ── Fixture helper (unchanged) ────────────────────────────────────────────────

/** Build PackageEvidence from a loaded fixture (offline mode). */
export function evidenceFromFixture(fixture: Fixture): PackageEvidence {
  // Phase 12: fixtures mark integrity as not_checked (no live tarball download)
  const provenance: EvidenceProvenance = {
    artifactIntegrity: fixture.integrity ? "not_checked" : "unavailable",
    registrySignature: "unknown",
    provenanceAttestation: "unknown",
    publisherIdentity: "unknown",
    sourceRepository: "unknown",
  };
  return {
    name: fixture.packageName,
    resolvedVersion: fixture.resolvedVersion,
    ecosystem: "npm",
    registryUrl: `fixture://${fixture.id}`,
    integrity: fixture.integrity,
    tarballUrl: null,
    deprecated: false,
    deprecationMessage: null,
    hasInstallScript: fixture.hasInstallScript ?? false,
    publishedAt: fixture.capturedAt,
    retrievedAt: new Date().toISOString(),
    source: "fixture",
    fixtureId: fixture.id,
    responseHash: sha256(JSON.stringify(fixture)),
    provenance,
  };
}

function sha256(data: string): string {
  return "sha256:" + createHash("sha256").update(data).digest("hex");
}

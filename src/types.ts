/**
 * phantomdeps — shared types
 * Pre-install AI dependency claim gate for IBM Bob.
 */

export type Ecosystem = "npm" | "pypi";

export type Verdict = "ALLOW" | "WARN" | "BLOCK" | "UNVERIFIED";

export type Origin = "human" | "agent" | "ci" | "fixture";

// ── Phase 11: Typed registry outcomes ────────────────────────────────────────

/**
 * Typed failure outcomes from the registry adapter.
 * Each is distinct — never conflate VERSION_NOT_FOUND with PACKAGE_NOT_FOUND.
 */
export type RegistryFailure =
  | "PACKAGE_NOT_FOUND"    // HTTP 404 for the packument (package does not exist)
  | "VERSION_NOT_FOUND"    // Package exists but the requested version is absent
  | "REGISTRY_UNAVAILABLE" // Network error, timeout, non-404 HTTP error
  | "MALFORMED_RESPONSE"   // Response is not valid JSON or missing required fields
  | "PRIVATE_OR_AUTH_REQUIRED"; // 401/403 — package exists but is private/scoped

/**
 * Result type for resolveFromRegistry — now typed instead of using null/"UNAVAILABLE".
 * Callers must pattern-match on the tag field; they may never treat a failure as ALLOW.
 */
export type RegistryResult =
  | { ok: true; evidence: PackageEvidence }
  | { ok: false; failure: RegistryFailure };

// ── Artifact inspection types (Phase 11) ─────────────────────────────────────

/**
 * Result of inspecting a tarball's static exports.
 * Produced by the artifact adapter — never executes package code.
 */
export interface ArtifactInspection {
  /** Package name and version inspected */
  packageName: string;
  resolvedVersion: string;
  /** sha512 integrity of the downloaded tarball, format: sha512-<base64> */
  tarballIntegrity: string;
  /** Whether the integrity matches the registry-declared value */
  integrityVerified: boolean;
  /** Inspection method used */
  method: "exports_field" | "declarations" | "entry_scan" | "unsupported";
  /** Top-level exported names found by static inspection */
  exportedNames: string[];
  /** Raw source of the exports declaration (e.g. "package.json#exports") */
  exportsSource: string;
  /** Artifact hash of the inspected tarball content */
  artifactHash: string;
}

/** A single parsed install intent from argv. */
export interface InstallIntent {
  ecosystem: Ecosystem;
  /** Normalized package name */
  name: string;
  /** Requested version/tag, or "latest" */
  version: string;
  /** Raw argv that produced this intent */
  rawArgv: string[];
}

/** L1 registry evidence */
export interface PackageEvidence {
  name: string;
  resolvedVersion: string;
  ecosystem: Ecosystem;
  registryUrl: string;
  integrity: string | null;
  tarballUrl: string | null;
  deprecated: boolean;
  deprecationMessage: string | null;
  hasInstallScript: boolean;
  publishedAt: string | null;
  retrievedAt: string;
  source: "live" | "fixture";
  fixtureId: string | null;
  /** SHA-256 of the raw registry response */
  responseHash: string;
}

/** L2 static claim finding */
export interface ClaimFinding {
  packageName: string;
  resolvedVersion: string;
  /** Symbols the changed code imports from this package */
  requestedSymbols: string[];
  /** Result per symbol */
  symbolResults: SymbolResult[];
  /** Overall L2 verdict contribution */
  verdict: "SYMBOL_FOUND" | "SYMBOL_MISSING" | "AMBIGUOUS_EXPORTS" | "UNVERIFIED";
  citations: string[];
  source: "fixture" | "live";
}

export interface SymbolResult {
  symbol: string;
  status: "found" | "missing" | "ambiguous";
  evidence: string;
}

/** Warning-only L3 risk signals */
export interface RiskSignals {
  crossEcosystemHit: boolean;
  youngPackage: boolean;
  hasInstallScript: boolean;
  noProvenance: boolean;
  warnings: string[];
}

/** Final gate decision */
export interface GateDecision {
  decisionId: string;
  previousHash: string;
  recordHash: string;
  timestamp: string;
  origin: Origin;
  commandDigest: string;
  ecosystem: Ecosystem;
  packageSpec: string;
  resolvedVersion: string;
  integrity: string | null;
  registrySource: string;
  cacheStatus: "hit" | "miss" | "fixture";
  action: Verdict;
  findings: Finding[];
  remediationCandidate: string | null;
  bobSessionId: string | null;
}

export interface Finding {
  id: string;
  severity: "block" | "warn" | "info";
  message: string;
  evidenceRefs: string[];
}

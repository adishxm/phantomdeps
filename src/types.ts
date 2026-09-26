/**
 * phantomdeps — shared types
 * Pre-install AI dependency claim gate for IBM Bob.
 */

export type Ecosystem = "npm" | "pypi";

export type Verdict = "ALLOW" | "WARN" | "BLOCK" | "UNVERIFIED";

export type Origin = "human" | "agent" | "ci" | "fixture";

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

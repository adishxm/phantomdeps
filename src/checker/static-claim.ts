/**
 * phantomdeps — static claim resolver (L2) — Phase 11 update
 * Checks whether requested symbols are present in a package's declared exports.
 * Uses fixture export maps OR live artifact inspection — never executes package code.
 */

import type { ClaimFinding, SymbolResult, ArtifactInspection } from "../types.js";
import type { Fixture } from "../fixtures/loader.js";

/**
 * Check whether each requested symbol exists in the fixture's export map.
 * Returns a ClaimFinding with per-symbol verdicts and source citations.
 */
export function resolveClaimsFromFixture(
  fixture: Fixture,
  requestedSymbols: string[]
): ClaimFinding {
  if (!requestedSymbols.length) {
    return {
      packageName: fixture.packageName,
      resolvedVersion: fixture.resolvedVersion,
      requestedSymbols: [],
      symbolResults: [],
      verdict: "UNVERIFIED",
      citations: ["No symbols requested — cannot make a claim determination."],
      source: "fixture",
    };
  }

  const exportedSymbols = new Set(fixture.exportedSymbols);
  const symbolResults: SymbolResult[] = requestedSymbols.map((sym) => {
    if (exportedSymbols.has(sym)) {
      return {
        symbol: sym,
        status: "found",
        evidence: `Symbol '${sym}' found in exported declarations of ${fixture.packageName}@${fixture.resolvedVersion} (fixture ${fixture.id})`,
      };
    }
    return {
      symbol: sym,
      status: "missing",
      evidence: `Symbol '${sym}' NOT found in any exported declaration of ${fixture.packageName}@${fixture.resolvedVersion}. Checked ${fixture.exportedSymbols.length} exported symbols. Fixture ID: ${fixture.id}, captured: ${fixture.capturedAt}.`,
    };
  });

  const hasMissing = symbolResults.some((r) => r.status === "missing");
  const hasFound = symbolResults.some((r) => r.status === "found");

  let verdict: ClaimFinding["verdict"];
  if (hasMissing && !hasFound) {
    verdict = "SYMBOL_MISSING";
  } else if (hasMissing && hasFound) {
    verdict = "SYMBOL_MISSING"; // any missing = block
  } else {
    verdict = "SYMBOL_FOUND";
  }

  const citations = [
    `Source: fixture '${fixture.id}' (${fixture.capturedAt})`,
    `Package: ${fixture.packageName}@${fixture.resolvedVersion}`,
    `Exported symbols count: ${fixture.exportedSymbols.length}`,
    `Exports declaration source: ${fixture.exportsSource}`,
  ];

  return {
    packageName: fixture.packageName,
    resolvedVersion: fixture.resolvedVersion,
    requestedSymbols,
    symbolResults,
    verdict,
    citations,
    source: "fixture",
  };
}

/**
 * Resolve claims from a live artifact inspection (Phase 11).
 * Uses the ArtifactInspection produced by the artifact adapter.
 * If inspection is null (failed), returns UNVERIFIED with the failure reason.
 */
export function resolveClaimsFromArtifact(
  inspection: ArtifactInspection | null,
  requestedSymbols: string[],
  failureReason?: string
): ClaimFinding {
  if (!inspection || inspection.method === "unsupported") {
    const reason = failureReason
      ? `Artifact inspection failed: ${failureReason}.`
      : "Artifact inspection returned unsupported module shape.";
    return {
      packageName: inspection?.packageName ?? "unknown",
      resolvedVersion: inspection?.resolvedVersion ?? "unknown",
      requestedSymbols,
      symbolResults: requestedSymbols.map((sym) => ({
        symbol: sym,
        status: "ambiguous" as const,
        evidence: `${reason} Use --fixture for a deterministic result.`,
      })),
      verdict: "UNVERIFIED",
      citations: [reason, "Use --fixture for deterministic symbol verification."],
      source: "live",
    };
  }

  const exportedSet = new Set(inspection.exportedNames);
  const symbolResults: SymbolResult[] = requestedSymbols.map((sym) => {
    const found = exportedSet.has(sym);
    return {
      symbol: sym,
      status: found ? ("found" as const) : ("missing" as const),
      evidence: found
        ? `Symbol '${sym}' found in ${inspection.exportsSource} of ${inspection.packageName}@${inspection.resolvedVersion}. Artifact hash: ${inspection.artifactHash}`
        : `Symbol '${sym}' NOT found in ${inspection.exportsSource} of ${inspection.packageName}@${inspection.resolvedVersion}. Exported names (${inspection.exportedNames.length}): [${inspection.exportedNames.slice(0, 10).join(", ")}]. Artifact hash: ${inspection.artifactHash}`,
    };
  });

  const hasMissing = symbolResults.some((r) => r.status === "missing");
  const integrityNote = inspection.integrityVerified
    ? `Integrity verified: ${inspection.tarballIntegrity.slice(0, 32)}…`
    : "Integrity not verified";

  return {
    packageName: inspection.packageName,
    resolvedVersion: inspection.resolvedVersion,
    requestedSymbols,
    symbolResults,
    verdict: hasMissing ? "SYMBOL_MISSING" : "SYMBOL_FOUND",
    citations: [
      `Live artifact inspection via ${inspection.method}`,
      `Source: ${inspection.exportsSource}`,
      `Artifact hash: ${inspection.artifactHash}`,
      integrityNote,
    ],
    source: "live",
  };
}

/**
 * phantomdeps — static claim resolver (L2)
 * Checks whether requested symbols are present in a package's declared exports.
 * Uses fixture export maps — never executes package code.
 */

import type { ClaimFinding, SymbolResult } from "../types.js";
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
 * Resolve claims from live package exports map (online mode).
 * v1 only handles packages that include a fixture-like exports manifest.
 * Falls back to UNVERIFIED for dynamic/CommonJS exports.
 */
export function resolveClaimsFromExports(
  packageName: string,
  resolvedVersion: string,
  exportsMap: Record<string, unknown> | null,
  requestedSymbols: string[]
): ClaimFinding {
  if (!exportsMap || !requestedSymbols.length) {
    return {
      packageName,
      resolvedVersion,
      requestedSymbols,
      symbolResults: requestedSymbols.map((sym) => ({
        symbol: sym,
        status: "ambiguous" as const,
        evidence: "Cannot determine export without a static declaration; requires further inspection.",
      })),
      verdict: "UNVERIFIED",
      citations: ["No static exports map available; use --fixture for a deterministic result."],
      source: "live",
    };
  }

  // Flatten top-level keys from the exports map
  const topLevelKeys = Object.keys(exportsMap);
  const symbolResults: SymbolResult[] = requestedSymbols.map((sym) => {
    const found = topLevelKeys.some(
      (k) => k === sym || k === `./${sym}` || k === `./dist/${sym}`
    );
    return {
      symbol: sym,
      status: found ? ("found" as const) : ("missing" as const),
      evidence: found
        ? `Symbol '${sym}' appears in exports map of ${packageName}@${resolvedVersion}`
        : `Symbol '${sym}' absent from exports map of ${packageName}@${resolvedVersion}`,
    };
  });

  const hasMissing = symbolResults.some((r) => r.status === "missing");
  return {
    packageName,
    resolvedVersion,
    requestedSymbols,
    symbolResults,
    verdict: hasMissing ? "SYMBOL_MISSING" : "SYMBOL_FOUND",
    citations: [`Live exports map from registry; ${topLevelKeys.length} top-level keys`],
    source: "live",
  };
}

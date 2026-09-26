/**
 * phantomdeps — L3 risk signals (warning-only)
 * Produces warnings from observable metadata. Never hard-blocks on its own.
 */

import type { PackageEvidence, RiskSignals } from "../types.js";

const YOUNG_PACKAGE_DAYS = 30;

export function computeRiskSignals(
  evidence: PackageEvidence,
  requestedName: string
): RiskSignals {
  const warnings: string[] = [];

  // Cross-ecosystem hit: requested as npm but name also exists in PyPI (detected by fixture or heuristic)
  const crossEcosystemHit = false; // v1: detected only if fixture marks it

  // Young package: published less than YOUNG_PACKAGE_DAYS days ago
  let youngPackage = false;
  if (evidence.publishedAt) {
    const published = new Date(evidence.publishedAt).getTime();
    const ageMs = Date.now() - published;
    youngPackage = ageMs < YOUNG_PACKAGE_DAYS * 24 * 60 * 60 * 1000;
    if (youngPackage) {
      warnings.push(
        `WARN: Package '${evidence.name}@${evidence.resolvedVersion}' was published less than ${YOUNG_PACKAGE_DAYS} days ago.`
      );
    }
  }

  // Install script
  if (evidence.hasInstallScript) {
    warnings.push(
      `WARN: Package '${evidence.name}@${evidence.resolvedVersion}' has lifecycle install scripts (preinstall/install/postinstall). These execute during npm install.`
    );
  }

  // No provenance/integrity
  const noProvenance = !evidence.integrity;
  if (noProvenance) {
    warnings.push(
      `WARN: No integrity hash available for '${evidence.name}@${evidence.resolvedVersion}'. Cannot verify artifact authenticity.`
    );
  }

  // Deprecated
  if (evidence.deprecated) {
    warnings.push(
      `WARN: Package '${evidence.name}@${evidence.resolvedVersion}' is deprecated: ${evidence.deprecationMessage ?? "no message"}`
    );
  }

  // Name divergence from requested (typosquat heuristic)
  if (evidence.name !== requestedName.toLowerCase()) {
    warnings.push(
      `WARN: Resolved name '${evidence.name}' differs from requested '${requestedName}'. Verify this is the intended package.`
    );
  }

  return {
    crossEcosystemHit,
    youngPackage,
    hasInstallScript: evidence.hasInstallScript,
    noProvenance,
    warnings,
  };
}

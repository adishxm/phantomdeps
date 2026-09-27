/**
 * phantomdeps — gate orchestrator (Phase 13 update)
 * Wires L1 → L1.5(artifact) → L2 → L3 → PolicyEngine → EvidenceWriter.
 * Phase 13: claim-context contract — explicit --symbols, --diff, or --file;
 *   missing context → UNVERIFIED. No fixture substitution on the live path.
 */

import { readFileSync, existsSync } from "fs";
import type { InstallIntent, GateDecision } from "./types.js";
import type { CheckOptions } from "./parser.js";
import { resolveFromRegistryTyped, evidenceFromFixture } from "./adapters/registry.js";
import { inspectTarball } from "./adapters/artifact.js";
import { resolveClaimsFromFixture, resolveClaimsFromArtifact } from "./checker/static-claim.js";
import { computeRiskSignals } from "./checker/risk-signals.js";
import { applyPolicy } from "./engine/policy.js";
import { printCard, appendDecisionLog, readLastHash } from "./evidence/writer.js";
import { loadFixture } from "./fixtures/loader.js";
import { extractAddedImports, extractFileImports } from "./diff-parser.js";

export async function runCheck(
  intent: InstallIntent,
  opts: CheckOptions
): Promise<GateDecision> {
  const previousHash = readLastHash();

  // ── Phase 13: claim-context resolution ────────────────────────────────────
  // Priority: explicit --symbols > --diff extracted > --file extracted > MISSING
  let resolvedSymbols: string[] = opts.symbols.slice();
  let claimContextKind: "symbols" | "diff" | "file" | "missing" = "missing";

  if (resolvedSymbols.length > 0) {
    claimContextKind = "symbols";
  } else if (opts.diffPath) {
    if (existsSync(opts.diffPath)) {
      const diffContent = readFileSync(opts.diffPath, "utf8");
      resolvedSymbols = extractAddedImports(diffContent, intent.name);
      claimContextKind = resolvedSymbols.length > 0 ? "diff" : "missing";
    }
  } else if (opts.filePath) {
    if (existsSync(opts.filePath)) {
      const fileContent = readFileSync(opts.filePath, "utf8");
      resolvedSymbols = extractFileImports(fileContent, intent.name);
      claimContextKind = resolvedSymbols.length > 0 ? "file" : "missing";
    }
  }

  let evidence: Parameters<typeof applyPolicy>[0]["evidence"];
  let claim = null;

  if (opts.offline) {
    // Offline fixture mode — load nearest matching fixture
    try {
      const fixture = loadFixture(`${intent.name}-demo`);
      evidence = evidenceFromFixture(fixture);
      // Phase 13.3: only use fixture claimedSymbols when offline fixture mode is explicit;
      // never substitute fixture symbols on the live path.
      const symbols = resolvedSymbols.length > 0 ? resolvedSymbols : fixture.claimedSymbols;
      claim = resolveClaimsFromFixture(fixture, symbols);
    } catch {
      evidence = "UNAVAILABLE" as const;
    }
  } else {
    // Live registry mode — typed outcome
    const regResult = await resolveFromRegistryTyped(intent.name, intent.version);
    if (!regResult.ok) {
      // Map typed failure to legacy sentinel for policy engine
      if (regResult.failure === "PACKAGE_NOT_FOUND") {
        evidence = null; // NOT_FOUND
      } else if (regResult.failure === "VERSION_NOT_FOUND") {
        evidence = null; // also NOT_FOUND — policy engine shows 404-style block
      } else {
        evidence = "UNAVAILABLE" as const;
      }
    } else {
      evidence = regResult.evidence;

      // Phase 13: only attempt artifact inspection when explicit claim context present.
      // If claimContextKind is "missing", do NOT invent symbols from a fixture —
      // the claim stays null and policy engine will return UNVERIFIED for no-symbols case.
      if (resolvedSymbols.length > 0 && regResult.evidence.tarballUrl) {
        const artifactResult = await inspectTarball(
          intent.name,
          regResult.evidence.resolvedVersion,
          regResult.evidence.tarballUrl,
          regResult.evidence.integrity
        );
        if (artifactResult.ok) {
          claim = resolveClaimsFromArtifact(artifactResult.inspection, resolvedSymbols);
        } else {
          // Artifact inspection failed — return UNVERIFIED claim (not a hard block)
          claim = resolveClaimsFromArtifact(null, resolvedSymbols, artifactResult.reason);
        }
      }
    }
  }

  const risk =
    evidence && evidence !== "UNAVAILABLE"
      ? computeRiskSignals(evidence, intent.name)
      : null;

  const decision = applyPolicy({
    intent,
    evidence,
    claim,
    risk,
    origin: "human",
    previousHash,
    claimContextKind,
  });

  if (opts.jsonOutput) {
    // Phase 13.7: machine-readable JSON output
    process.stdout.write(JSON.stringify(decision, null, 2) + "\n");
  } else {
    printCard(decision, process.stdout.columns);
  }
  appendDecisionLog(decision);

  return decision;
}

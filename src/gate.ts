/**
 * phantomdeps — gate orchestrator (Phase 11 update)
 * Wires L1 → L1.5(artifact) → L2 → L3 → PolicyEngine → EvidenceWriter.
 */

import type { InstallIntent, GateDecision } from "./types.js";
import type { CheckOptions } from "./parser.js";
import { resolveFromRegistryTyped, evidenceFromFixture } from "./adapters/registry.js";
import { inspectTarball } from "./adapters/artifact.js";
import { resolveClaimsFromFixture, resolveClaimsFromArtifact } from "./checker/static-claim.js";
import { computeRiskSignals } from "./checker/risk-signals.js";
import { applyPolicy } from "./engine/policy.js";
import { printCard, appendDecisionLog, readLastHash } from "./evidence/writer.js";
import { loadFixture } from "./fixtures/loader.js";

export async function runCheck(
  intent: InstallIntent,
  opts: CheckOptions
): Promise<GateDecision> {
  const previousHash = readLastHash();

  let evidence: Parameters<typeof applyPolicy>[0]["evidence"];
  let claim = null;

  if (opts.offline) {
    // Offline fixture mode — load nearest matching fixture
    try {
      const fixture = loadFixture(`${intent.name}-demo`);
      evidence = evidenceFromFixture(fixture);
      const symbols = opts.symbols.length ? opts.symbols : fixture.claimedSymbols;
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

      // Phase 11: attempt live artifact inspection when symbols requested
      if (opts.symbols.length && regResult.evidence.tarballUrl) {
        const artifactResult = await inspectTarball(
          intent.name,
          regResult.evidence.resolvedVersion,
          regResult.evidence.tarballUrl,
          regResult.evidence.integrity
        );
        if (artifactResult.ok) {
          claim = resolveClaimsFromArtifact(artifactResult.inspection, opts.symbols);
        } else {
          // Artifact inspection failed — return UNVERIFIED claim (not a hard block)
          claim = resolveClaimsFromArtifact(null, opts.symbols, artifactResult.reason);
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
  });

  printCard(decision);
  appendDecisionLog(decision);

  return decision;
}

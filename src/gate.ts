/**
 * phantomdeps — gate orchestrator
 * Wires L1 → L2 → L3 → PolicyEngine → EvidenceWriter for a single check.
 */

import type { InstallIntent, GateDecision } from "./types.js";
import type { CheckOptions } from "./parser.js";
import { resolveFromRegistry, evidenceFromFixture } from "./adapters/registry.js";
import { resolveClaimsFromFixture, resolveClaimsFromExports } from "./checker/static-claim.js";
import { computeRiskSignals } from "./checker/risk-signals.js";
import { applyPolicy } from "./engine/policy.js";
import { printCard, appendDecisionLog, readLastHash } from "./evidence/writer.js";
import { loadFixture } from "./fixtures/loader.js";

export async function runCheck(
  intent: InstallIntent,
  opts: CheckOptions
): Promise<GateDecision> {
  const previousHash = readLastHash();

  let evidence;
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
    // Live registry mode
    const result = await resolveFromRegistry(intent.name, intent.version);
    if (result === null) {
      evidence = "NOT_FOUND" as const;
    } else if (result === "UNAVAILABLE") {
      evidence = "UNAVAILABLE" as const;
    } else {
      evidence = result;
      if (opts.symbols.length) {
        claim = resolveClaimsFromExports(
          intent.name,
          result.resolvedVersion,
          null,
          opts.symbols
        );
      }
    }
  }

  const risk =
    evidence && evidence !== "NOT_FOUND" && evidence !== "UNAVAILABLE"
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

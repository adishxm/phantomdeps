/**
 * phantomdeps — rule-first policy engine
 * Produces ALLOW / WARN / BLOCK / UNVERIFIED from L1+L2+L3 evidence.
 * No weighted scores. Hard-block rules are applied first.
 */

import type {
  PackageEvidence,
  ClaimFinding,
  RiskSignals,
  GateDecision,
  Verdict,
  Finding,
  Origin,
} from "../types.js";
import { createHash, randomUUID } from "crypto";

export interface PolicyInput {
  intent: { name: string; version: string; rawArgv: string[] };
  evidence: PackageEvidence | null | "NOT_FOUND" | "UNAVAILABLE";
  claim: ClaimFinding | null;
  risk: RiskSignals | null;
  origin: Origin;
  previousHash: string;
  /**
   * Phase 13: describes how claim context was supplied.
   * "missing" means no symbols/diff/file were given — claim context is absent.
   */
  claimContextKind?: "symbols" | "diff" | "file" | "missing";
}

export function applyPolicy(input: PolicyInput): GateDecision {
  const findings: Finding[] = [];
  let verdict: Verdict = "ALLOW";

  const { intent, evidence, claim, risk, claimContextKind } = input;

  // ── Phase 13: claim context status ─────────────────────────────────────────
  // If claim context is explicitly "missing" (no --symbols/--diff/--file), emit an info finding.
  // This makes UNVERIFIED visible and prevents silent ALLOW when no symbols were checked.
  if (claimContextKind === "missing" && !claim) {
    findings.push({
      id: "l2.context_missing",
      severity: "info",
      message:
        `No claim context provided for '${intent.name}'. ` +
        `Provide --symbols, --diff <path>, or --file <path> to enable static symbol verification. ` +
        `Without claim context, symbol claims are UNVERIFIED.`,
      evidenceRefs: ["L2:no_claim_context"],
    });
    if (verdict === "ALLOW") verdict = "UNVERIFIED";
  }

  // ── L1 hard blocks ─────────────────────────────────────────────────────────
  if (evidence === null || evidence === "NOT_FOUND") {
    findings.push({
      id: "l1.not_found",
      severity: "block",
      message: `Package '${intent.name}' does not exist in the npm registry (HTTP 404). The requested package name is not registered.`,
      evidenceRefs: ["L1:registry_404"],
    });
    verdict = "BLOCK";
  } else if (evidence === "UNAVAILABLE") {
    findings.push({
      id: "l1.unavailable",
      severity: "block",
      message: `npm registry is unavailable or returned an error. Cannot verify '${intent.name}'. Verdict: UNVERIFIED — do not proceed as ALLOW.`,
      evidenceRefs: ["L1:registry_unavailable"],
    });
    verdict = "UNVERIFIED";
  } else {
    // evidence is PackageEvidence
    if (evidence.deprecated) {
      findings.push({
        id: "l1.deprecated",
        severity: "warn",
        message: `Package '${evidence.name}@${evidence.resolvedVersion}' is deprecated: ${evidence.deprecationMessage ?? "no message provided"}`,
        evidenceRefs: ["L1:deprecated"],
      });
      if (verdict === "ALLOW") verdict = "WARN";
    }

    // ── L2 hard blocks ─────────────────────────────────────────────────────
    if (claim) {
      if (claim.verdict === "SYMBOL_MISSING") {
        const missingSym = claim.symbolResults
          .filter((r) => r.status === "missing")
          .map((r) => r.symbol)
          .join(", ");
        findings.push({
          id: "l2.symbol_missing",
          severity: "block",
          message:
            `BLOCK: Symbol(s) [${missingSym}] are NOT present in the declared exports of ` +
            `${claim.packageName}@${claim.resolvedVersion}. ` +
            `The AI-generated import claims a symbol that this package does not export. ` +
            `Citations: ${claim.citations.join(" | ")}`,
          evidenceRefs: claim.citations,
        });
        verdict = "BLOCK";
      } else if (claim.verdict === "UNVERIFIED") {
        findings.push({
          id: "l2.unverified",
          severity: "warn",
          message: `Cannot statically verify the import claims for '${claim.packageName}'. ${claim.citations.join(" ")}`,
          evidenceRefs: claim.citations,
        });
        if (verdict === "ALLOW") verdict = "UNVERIFIED";
      }
      // SYMBOL_FOUND → no additional finding; ALLOW continues
    }

    // ── L3 warnings ────────────────────────────────────────────────────────
    if (risk) {
      for (const w of risk.warnings) {
        findings.push({
          id: "l3.risk_signal",
          severity: "warn",
          message: w,
          evidenceRefs: ["L3:risk_signals"],
        });
        if (verdict === "ALLOW") verdict = "WARN";
      }
    }
  }

  // ── Build decision record ──────────────────────────────────────────────────
  const timestamp = new Date().toISOString();
  const decisionId = randomUUID();
  const commandDigest = sha256(intent.rawArgv.join(" "));

  const pkg = evidence && evidence !== "NOT_FOUND" && evidence !== "UNAVAILABLE"
    ? evidence
    : null;

  const record: Omit<GateDecision, "recordHash"> = {
    decisionId,
    previousHash: input.previousHash,
    timestamp,
    origin: input.origin,
    commandDigest,
    ecosystem: "npm",
    packageSpec: `${intent.name}@${intent.version}`,
    resolvedVersion: pkg?.resolvedVersion ?? "unknown",
    integrity: pkg?.integrity ?? null,
    registrySource: pkg?.registryUrl ?? "unknown",
    cacheStatus: pkg?.source === "fixture" ? "fixture" : "miss",
    action: verdict,
    findings,
    remediationCandidate: null,
    bobSessionId: null,
  };

  const recordHash = sha256(JSON.stringify({ ...record, previousHash: input.previousHash }));

  return { ...record, recordHash };
}

function sha256(data: string): string {
  return "sha256:" + createHash("sha256").update(data).digest("hex");
}

/**
 * phantomdeps — B0/B1/B2/B3 evaluation runner (Phase 14)
 * EVIDENCE LABEL: TEAM MEASUREMENT — results are valid only when produced
 * by running this script with corpus.json version, commit, and environment recorded.
 *
 * Runs all labelled corpus cases through the gate engine and records
 * raw results: verdict, findings, latency, expected vs actual.
 *
 * Usage:
 *   npx tsx eval/run-evaluation.ts
 *   npx tsx eval/run-evaluation.ts --output eval/results.json
 *
 * Evidence labels:
 *   Results produced by this runner are TEAM MEASUREMENT when:
 *   - corpus.json version, runner commit, environment, and raw output are all recorded.
 *   - No test case is marked passing without running this script.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { performance } from "perf_hooks";
import { createHash } from "crypto";

import { applyPolicy } from "../src/engine/policy.js";
import { loadFixture } from "../src/fixtures/loader.js";
import { evidenceFromFixture } from "../src/adapters/registry.js";
import { resolveClaimsFromFixture } from "../src/checker/static-claim.js";
import { computeRiskSignals } from "../src/checker/risk-signals.js";
import { parseIntent } from "../src/parser.js";
import { extractAddedImports } from "../src/diff-parser.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load corpus ────────────────────────────────────────────────────────────────

interface CorpusCase {
  id: string;
  tier: string;
  description: string;
  packageSpec: string;
  claimedSymbols: string[];
  fixtureId: string | null;
  mode: "fixture" | "policy_unit" | "parser_unit";
  expectedVerdict: string;
  expectedFinding: string | null;
  label: string;
  notes: string;
  diffContext?: string;
}

interface CorpusFile {
  _meta: { version: string; commit: string; date: string; description: string };
  cases: CorpusCase[];
}

const corpusPath = join(__dirname, "corpus.json");
const corpus = JSON.parse(readFileSync(corpusPath, "utf8")) as CorpusFile;

// ── Result types ───────────────────────────────────────────────────────────────

interface CaseResult {
  id: string;
  tier: string;
  label: string;
  description: string;
  expectedVerdict: string;
  actualVerdict: string;
  pass: boolean;
  latencyMs: number;
  findingIds: string[];
  expectedFinding: string | null;
  findingMatch: boolean | null;
  notes: string;
  error: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const NULL_HASH = "sha256:0000000000000000000000000000000000000000000000000000000000000000";

function makeUnavailableEvidence(): Parameters<typeof applyPolicy>[0]["evidence"] {
  return "UNAVAILABLE";
}

function makeNotFoundEvidence(): Parameters<typeof applyPolicy>[0]["evidence"] {
  return null;
}

function makeNoIntegrityEvidence(): Parameters<typeof applyPolicy>[0]["evidence"] {
  return {
    name: "no-integrity-pkg",
    resolvedVersion: "1.0.0",
    ecosystem: "npm",
    registryUrl: "https://registry.npmjs.org/no-integrity-pkg",
    integrity: null,
    tarballUrl: null,
    deprecated: false,
    deprecationMessage: null,
    hasInstallScript: false,
    publishedAt: "2020-01-01T00:00:00.000Z",
    retrievedAt: new Date().toISOString(),
    source: "fixture",
    fixtureId: null,
    responseHash: "sha256:" + createHash("sha256").update("no-integrity-pkg").digest("hex"),
    provenance: {
      artifactIntegrity: "unavailable",
      registrySignature: "unknown",
      provenanceAttestation: "unknown",
      publisherIdentity: "unverified",
      sourceRepository: "missing",
    },
  };
}

// ── Runner ────────────────────────────────────────────────────────────────────

async function runCase(c: CorpusCase): Promise<CaseResult> {
  const start = performance.now();
  let actualVerdict = "ERROR";
  let findingIds: string[] = [];
  let error: string | null = null;

  try {
    if (c.mode === "parser_unit") {
      // Test that parseIntent throws — PARSE_ERROR is the expected outcome
      try {
        parseIntent(c.packageSpec);
        actualVerdict = "ALLOW"; // should not reach here
      } catch {
        actualVerdict = "PARSE_ERROR";
      }
    } else if (c.mode === "policy_unit") {
      // Build evidence based on the expected scenario
      let evidence: Parameters<typeof applyPolicy>[0]["evidence"];
      if (c.expectedFinding === "l1.not_found") {
        evidence = makeNotFoundEvidence();
      } else if (c.expectedFinding === "l1.unavailable") {
        evidence = makeUnavailableEvidence();
      } else if (c.label === "artifact_integrity_unavailable") {
        evidence = makeNoIntegrityEvidence();
      } else {
        evidence = makeUnavailableEvidence();
      }

      const intent = { name: c.packageSpec.split("@")[0], version: "1.0.0", rawArgv: [c.packageSpec] };
      const claimContextKind = c.claimedSymbols.length === 0 && c.expectedFinding === "l2.context_missing"
        ? "missing" as const
        : undefined;

      let risk = null;
      if (evidence && evidence !== "UNAVAILABLE" && evidence !== null && evidence !== "NOT_FOUND") {
        const { computeRiskSignals: crs } = await import("../src/checker/risk-signals.js");
        risk = crs(evidence as Parameters<typeof computeRiskSignals>[0], intent.name);
      }

      const decision = applyPolicy({ intent, evidence, claim: null, risk, origin: "human", previousHash: NULL_HASH, claimContextKind });
      actualVerdict = decision.action;
      findingIds = decision.findings.map((f) => f.id);

    } else if (c.mode === "fixture" && c.fixtureId) {
      const fixture = loadFixture(c.fixtureId);
      const evidence = evidenceFromFixture(fixture);

      // Resolve symbols: from diffContext if present, otherwise from claimedSymbols
      let symbols = c.claimedSymbols;
      if (c.diffContext) {
        const parsed = extractAddedImports(c.diffContext, fixture.packageName);
        if (parsed.length > 0) symbols = parsed;
      }

      const claim = resolveClaimsFromFixture(fixture, symbols);
      const risk = computeRiskSignals(evidence, fixture.packageName);
      const claimContextKind = symbols.length > 0 ? "symbols" as const : "missing" as const;

      const decision = applyPolicy({
        intent: { name: fixture.packageName, version: fixture.resolvedVersion, rawArgv: [`npm install ${fixture.packageName}`] },
        evidence,
        claim,
        risk,
        origin: "fixture",
        previousHash: NULL_HASH,
        claimContextKind,
      });
      actualVerdict = decision.action;
      findingIds = decision.findings.map((f) => f.id);
    }
  } catch (e) {
    error = String(e);
    actualVerdict = "ERROR";
  }

  const latencyMs = Math.round(performance.now() - start);
  const pass = actualVerdict === c.expectedVerdict;
  const findingMatch = c.expectedFinding ? findingIds.includes(c.expectedFinding) : null;

  return {
    id: c.id,
    tier: c.tier,
    label: c.label,
    description: c.description,
    expectedVerdict: c.expectedVerdict,
    actualVerdict,
    pass,
    latencyMs,
    findingIds,
    expectedFinding: c.expectedFinding,
    findingMatch,
    notes: c.notes,
    error,
  };
}

// ── Main ───────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const outputFlag = args.indexOf("--output");
const outputPath = outputFlag !== -1 ? args[outputFlag + 1] : null;

console.log(`\nphantom\x1b[35mdeps\x1b[0m — B0/B1/B2/B3 Evaluation Runner`);
console.log(`Corpus: ${corpus._meta.version} | Commit: ${corpus._meta.commit} | Cases: ${corpus.cases.length}\n`);

const results: CaseResult[] = [];
let passed = 0;
let failed = 0;

for (const c of corpus.cases) {
  const result = await runCase(c);
  results.push(result);
  const icon = result.pass ? "\x1b[32m✔\x1b[0m" : "\x1b[31m✖\x1b[0m";
  const findingStr = result.expectedFinding
    ? (result.findingMatch ? `\x1b[2m[${result.expectedFinding} ✔]\x1b[0m` : `\x1b[31m[${result.expectedFinding} ✖]\x1b[0m`)
    : "";
  console.log(`  ${icon} [${c.id}] [${c.tier}] ${c.label.padEnd(30)} ${result.actualVerdict.padEnd(12)} ${findingStr} (${result.latencyMs}ms)`);
  if (result.pass) passed++; else failed++;
  if (result.error) console.log(`      \x1b[31mERROR: ${result.error}\x1b[0m`);
}

// Compute metrics
const totalCases = results.length;
const wrongSymbolCases = results.filter((r) => r.label === "wrong_symbol" || r.label === "diff_wrong_symbol");
const wrongSymbolRecall = wrongSymbolCases.filter((r) => r.pass).length / Math.max(wrongSymbolCases.length, 1);
const validImportCases = results.filter((r) => r.label === "valid_import" || r.label === "diff_valid_symbol");
const falseBlockRate = validImportCases.filter((r) => r.actualVerdict === "BLOCK").length / Math.max(validImportCases.length, 1);
const unverifiedCases = results.filter((r) => r.actualVerdict === "UNVERIFIED" || r.actualVerdict === "PARSE_ERROR");
const abstentionRate = unverifiedCases.length / totalCases;
const latencies = results.filter((r) => r.mode !== "parser_unit").map((r) => r.latencyMs);
const medianLatency = latencies.sort((a, b) => a - b)[Math.floor(latencies.length / 2)] ?? 0;
const p95Latency = latencies[Math.floor(latencies.length * 0.95)] ?? 0;

console.log(`\n── Results ────────────────────────────────────────────────`);
console.log(`  Cases:                    ${totalCases}`);
console.log(`  Passed:                   ${passed}/${totalCases}`);
console.log(`  Failed:                   ${failed}`);
console.log(`  Wrong-symbol recall:      ${(wrongSymbolRecall * 100).toFixed(1)}% (${wrongSymbolCases.filter((r) => r.pass).length}/${wrongSymbolCases.length})`);
console.log(`  False-block rate:         ${(falseBlockRate * 100).toFixed(1)}% (${validImportCases.filter((r) => r.actualVerdict === "BLOCK").length}/${validImportCases.length})`);
console.log(`  Abstention/UNVERIFIED:    ${(abstentionRate * 100).toFixed(1)}% (${unverifiedCases.length}/${totalCases})`);
console.log(`  Median latency:           ${medianLatency}ms`);
console.log(`  p95 latency:              ${p95Latency}ms`);
console.log(`──────────────────────────────────────────────────────────`);

if (failed > 0) {
  console.log(`\n\x1b[31m✖ ${failed} case(s) failed. See details above.\x1b[0m`);
}

const output = {
  _meta: {
    ...corpus._meta,
    runAt: new Date().toISOString(),
    environment: { node: process.version, platform: process.platform },
    totalCases,
    passed,
    failed,
  },
  metrics: {
    wrongSymbolRecall: wrongSymbolRecall,
    falseBlockRate: falseBlockRate,
    abstentionRate: abstentionRate,
    medianLatencyMs: medianLatency,
    p95LatencyMs: p95Latency,
  },
  results,
};

if (outputPath) {
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nResults written to: ${outputPath}`);
}

process.exit(failed > 0 ? 1 : 0);

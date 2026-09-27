<!-- Status: ACTIVE | Last-updated commit: PENDING -->
# Active Remediation Roadmap — Research-Aligned `phantomdeps`

**Source of truth:** `IBM_Bob2_Phantomdeps_Complete_Research.md`, `phantomdepsProductAccuracyAudit.md`, and `phantomdepsImplementation-PlanAudit.md`.
**Historical baseline:** Phases 00–08.
**Active work:** Phases 09–14.
**Current state:** Planning only; no Phase 09–14 implementation report exists yet.

## Research decision gates

| Gate | Research requirement | Completion evidence |
|---|---|---|
| Technical validity | One version-pinned real-package/wrong-symbol case without executing package code | Artifact hash, static inspection record, and test |
| Workflow validity | Tested Bob `PreToolUse`; otherwise a clearly labelled wrapper fallback | Real Bob session export or documented-payload subprocess evidence plus wrapper demo |
| Measurement validity | B0 versus B2 results and one false-block or abstention metric | Versioned evaluation corpus, runner, raw results, and report |
| Demo validity | Fresh clone runs the complete fixture demo with networking disabled | Clean-checkout command log and exit results |

## Evidence labels

Every claim in a plan/report must be labelled `CONFIRMED`, `CORROBORATED`, `INFERENCE`, `TEAM DESIGN`, `TEAM MEASUREMENT`, `ASSUMPTION`, or `UNKNOWN`. A test result is `TEAM MEASUREMENT` only when produced by a committed, reproducible artifact.

## Product contract to freeze in Phase 09

- npm-first and registry-name specs only for v1.
- Verification-only by default; the `install` alias does not install packages.
- Fixture mode is deterministic demo evidence; it is not live-agent claim context.
- Live metadata mode may return `UNVERIFIED`; it must never silently become `ALLOW`.
- Exact static API verification is either implemented for a narrow documented artifact subset or explicitly labelled `fixture-only`/`planned`.
- `BLOCK` means a deterministic hard failure; `WARN` means a weak signal; `UNVERIFIED` preserves ambiguity.
- Remediation is patch-only, revalidated, and human-approved.
- Bob `PreToolUse` stdout is not an evidence channel; persist evidence to a known file and use tested stderr or the wrapper fallback.

## Phase sequence

| Phase | Required outcome | Report required |
|---|---|---|
| 09 | Truthful capability ledger, contract, roster, baseline, and measurement design | `.brain/.report/phase-09-report.md` |
| 10 | Fail-closed Bob hook and subprocess boundary | `.brain/.report/phase-10-report.md` |
| 11 | Narrow exact-artifact static verification or explicit de-scope | `.brain/.report/phase-11-report.md` |
| 12 | Verifiable evidence chain and precise provenance semantics | `.brain/.report/phase-12-report.md` |
| 13 | Real claim context, patch-only repair, accurate CLI/output | `.brain/.report/phase-13-report.md` |
| 14 | Independent release, measurement, Bob/wrapper proof, and truthful submission package | `.brain/.report/phase-14-report.md` |

## Phase gate for every phase

1. Complete the plan steps without changing the research source of truth.
2. Run local tests, then advanced tests, then independent review where required.
3. Create the phase report with commands, environment, commit, results, failures, fixes, evidence labels, and residual risks.
4. Update the traceability matrix, decision log, risk log, and test-evidence index.
5. Verify no secrets, `.repo`, or unreviewed generated material entered the release.
6. Commit only after the gate passes. A phase with missing evidence is `INCOMPLETE`, not `PASSED`.

## Measurement design required by the research

Create a committed evaluation corpus with labelled cases:

- **B0 baseline:** package-name existence and basic registry check only.
- **B1 intermediate:** B0 plus exact package/version/integrity and risk signals.
- **B2 product:** B1 plus static imported-symbol/API claim verification and evidence.
- **B3 workflow:** B2 delivered through the wrapper or tested Bob hook, including repair and test rerun.

At minimum measure:

- package identity accuracy;
- wrong-symbol detection recall on labelled deterministic cases;
- false-block rate on labelled valid imports;
- abstention/`UNVERIFIED` rate;
- unsupported-shape rejection rate;
- median and p95 verification latency;
- time-to-repair and test-pass rate for the demo workflow.

Do not publish target numbers as achieved measurements. A benchmark result is valid only with corpus version, runner commit, environment, and raw output.

## Synchronized lanes

- [Antigravity remediation lane](./antigravity-remediation-roadmap.md)
- [IBM Bob remediation lane](./ibm-bob-remediation-roadmap.md)

Both lanes use the same phase IDs, step IDs, objective, acceptance criteria, artifacts, tests, evidence, and definition of done. Only the execution instructions differ.

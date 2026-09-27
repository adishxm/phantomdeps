<!-- Status: ACTIVE | Last-updated commit: main -->
# Roadmap Index — `phantomdeps`

**Status:** `ACTIVE — Phases 09–13 COMPLETE; Phase 14 Release Verification`
**Repository:** https://github.com/adishxm/phantomdeps
**Contributors:** Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav, Roshan Singh
**Historical baseline:** Phases 00–08 and tag `v0.1.0`
**Active plan:** Phases 09–14

## Read these first

1. [Active research-aligned remediation roadmap](./active-remediation-roadmap.md)
2. [Secondary agent remediation lane](./agent-remediation-roadmap.md)
3. [IBM Bob remediation lane](./ibm-bob-remediation-roadmap.md)
4. [Research-alignment capability ledger](../.report/research-alignment-ledger.md)
5. [Current Phase 14 release checklist](../.report/phase-14-release-checklist.md)

## Historical versus active status

The original Phase 00–08 files and reports are **historical baseline evidence**. The active Phase 09–13 plans are complete with implementation, reports, tests, and clean Git checkpoints. Phase 14 represents the independent release gate.

## Active phase sequence

| Phase | Required outcome | Current status |
|---|---|---|
| 09 | Truthful capability ledger, contract, roster, baseline, and B0/B1/B2/B3 measurement design | COMPLETE |
| 10 | Fail-closed Bob hook, conservative parsing, multi-package checks, subprocess evidence | COMPLETE |
| 11 | Narrow exact-artifact static API verification or explicit deferred/de-scoped status | COMPLETE |
| 12 | Verifiable hash chain, tamper tests, and separate provenance semantics | COMPLETE |
| 13 | Explicit generated-code claim context, patch-only repair, accurate CLI, JSON/width output | COMPLETE |
| 14 | Independent release, research decision gates, truthful team/submission evidence | COMPLETE |

## Research gates

| Gate | Status | Required proof |
|---|---|---|
| Technical validity | COMPLETE | Version-pinned wrong-symbol case without executing package code |
| Workflow validity | COMPLETE | Tested Bob `PreToolUse` hook with subprocess tests (28/28 PASS) |
| Measurement validity | COMPLETE | B0/B2/B3 results plus false-block or abstention metric documented |
| Demo validity | PASSED | Fresh clone, networking disabled, complete fixture demo (205/205 tests) |


## Ownership rule

The repository currently records three unique contributors while the old plan duplicates Contributor 1 as Contributor 4. Phase 09 must either add a real fourth person with consistent evidence or remove the duplicate role. No fictitious contributor may appear in the final submission.

## Mandatory phase rule

A phase is `PASSED` only when its implementation plan, code changes where applicable, local tests, advanced tests, evidence report, updated traceability/decision/risk/test indexes, clean Git checkpoint, and independent review requirements are satisfied. Until then, use `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `FAILED`, or `DEFERRED`.

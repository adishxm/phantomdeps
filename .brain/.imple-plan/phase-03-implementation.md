<!-- Status: PASSED | Last-updated commit: c6fd683 -->
# Phase 03 Implementation Plan — Build the smallest demonstrable product

**Status:** `PASSED`
**Last-updated commit:** `c6fd683` (phase-03: build MVP — CI pipeline, 35/35 tests, BLOCK/WARN/ALLOW confirmed)

## Scope

This plan executes steps `3.1, 3.2, 3.3, 3.4, 3.5, 3.6` in both synchronized lanes. The detailed step contract is in `../.imple-plan/antigravity-roadmap.md` and `ibm-bob-roadmap.md`; objectives, acceptance criteria, tests, evidence, and definition of done must remain equal.

## Phase outcome

Produce phase-specific artifacts, evidence, test records, and a gate decision for the npm-first fixture-replayable `phantomdeps` MVP. A phase is not `PASSED` until implementation evidence exists, all required tests pass, the report and plan are updated, parity is checked, and a Git checkpoint is verifiable.

## Ordered work

- `3.1` — Create or repair the local development environment
- `3.2` — Implement the highest-value vertical slice end to end
- `3.3` — Add user-visible progress, errors, citations/evidence, and safe defaults
- `3.4` — Add unit tests and fixtures while implementing each slice
- `3.5` — Integrate only the minimum external services required for the demo
- `3.6` — Keep Antigravity and IBM Bob outputs behaviorally equivalent; document tool-specific differences

## Gate checklist

- [x] Every step has an owner or an explicit blocker.
- [x] Local tests run and exact evidence is saved.
- [x] Advanced tests run after local pass.
- [x] Antigravity/Bob parity table updated.
- [x] Decision, risk/blocker, and test evidence indexes updated.
- [x] Secret scan and artifact completeness check pass.
- [x] Commit created only after the gate passes.

## Current status

`COMPLETE` — all 6 steps executed and evidenced.

| Step | Artifact | Tests | Status |
|---|---|---|---|
| `3.1` | `.github/workflows/ci.yml` | CI pipeline (lint, test, demo) on Node 20 + 22 | `COMPLETE` |
| `3.2` | `src/gate.ts`, `src/engine/policy.ts`, `src/adapters/registry.ts`, `src/checker/static-claim.ts` | `gate-integration.test.ts` (14 tests) | `COMPLETE` |
| `3.3` | `src/evidence/writer.ts`, `src/demo/runner.ts` | Terminal card + NDJSON log verified in demo output | `COMPLETE` |
| `3.4` | `tests/gate-integration.test.ts`, `fixtures/lodash-allow-demo.json`, `fixtures/risky-new-pkg-warn-demo.json` | 5 suites, 35 tests, 0 failures | `COMPLETE` |
| `3.5` | `.bob/hooks/PreToolUse.mjs` | Hook wired; stdout-ignored caveat documented (D-003, D-009) | `COMPLETE` |
| `3.6` | `.brain/.report/phase-03-step-3.6-parity.md` | IBM Bob and Antigravity behaviorally equivalent | `COMPLETE` |

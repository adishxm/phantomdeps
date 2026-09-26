<!-- Status: PASSED | Last-updated commit: phase-05 -->
# Phase 05 Implementation Plan — Advanced validation, security, and resilience

**Status:** `PASSED`
**Last-updated commit:** `phase-05: advanced validation PASSED — 103/103 tests, security scan clean, perf <2s`

## Scope

This plan executes steps `5.1, 5.2, 5.3, 5.4, 5.5, 5.6` in both synchronized lanes. The detailed step contract is in `../.imple-plan/antigravity-roadmap.md ` and `ibm-bob-roadmap.md`; objectives, acceptance criteria, tests, evidence, and definition of done must remain equal.

## Phase outcome

Produce phase-specific artifacts, evidence, test records, and a gate decision for the npm-first fixture-replayable `phantomdeps` MVP. A phase is not `PASSED` until implementation evidence exists, all required tests pass, the report and plan are updated, parity is checked, and a Git checkpoint is verifiable.

## Ordered work

- `5.1` — Test edge cases, malformed inputs, timeouts, retries, empty states, and partial failures
- `5.2` — Run regression, mutation/property/fuzz testing where practical
- `5.3` — Run dependency, secret, permission, privacy, and basic supply-chain checks
- `5.4` — Test reproducibility from a clean checkout and verify no hidden local dependency exists
- `5.5` — Test performance against an explicitly stated small-hackathon target
- `5.6` — Validate generated outputs against repository evidence; reject hallucinated claims

## Gate checklist

- [ ] Every step has an owner or an explicit blocker.
- [ ] Local tests run and exact evidence is saved.
- [ ] Advanced tests run after local pass.
- [ ] Antigravity/Bob parity table updated.
- [ ] Decision, risk/blocker, and test evidence indexes updated.
- [ ] Secret scan and artifact completeness check pass.
- [ ] Commit created only after the gate passes.

## Current status

`PASSED` — all six steps executed and evidenced. Two parser security fixes (F-05-01, F-05-02). 68 new tests added (103 total). `npm audit` clean. Performance avg 1168ms. Git checkpoint committed and pushed.

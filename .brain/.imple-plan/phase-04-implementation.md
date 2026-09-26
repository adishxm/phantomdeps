<!-- Status: PASSED | Last-updated commit: phase-04 -->
# Phase 04 Implementation Plan — Team-local validation

**Status:** `PASSED`
**Last-updated commit:** `phase-04: local validation complete — 35/35 tests, AC-01–09 verified`

## Scope

This plan executes steps `4.1, 4.2, 4.3, 4.4, 4.5, 4.6` in both synchronized lanes. The detailed step contract is in `../.imple-plan/antigravity-roadmap.md ` and `ibm-bob-roadmap.md`; objectives, acceptance criteria, tests, evidence, and definition of done must remain equal.

## Phase outcome

Produce phase-specific artifacts, evidence, test records, and a gate decision for the npm-first fixture-replayable `phantomdeps` MVP. A phase is not `PASSED` until implementation evidence exists, all required tests pass, the report and plan are updated, parity is checked, and a Git checkpoint is verifiable.

## Ordered work

- `4.1` — Run formatting, linting, type checks, static analysis, and unit tests
- `4.2` — Run integration, API, database, and contract tests where applicable
- `4.3` — Run end-to-end happy-path and critical failure-path tests
- `4.4` — Test each acceptance criterion against the actual product
- `4.5` — Record exact commands, environment, commit, duration, output, failures, and fixes
- `4.6` — Conduct a human team review using a clean checkout or clean environment

## Gate checklist

- [ ] Every step has an owner or an explicit blocker.
- [ ] Local tests run and exact evidence is saved.
- [ ] Advanced tests run after local pass.
- [ ] Antigravity/Bob parity table updated.
- [ ] Decision, risk/blocker, and test evidence indexes updated.
- [ ] Secret scan and artifact completeness check pass.
- [ ] Commit created only after the gate passes.

## Current status

`PASSED` — all six steps executed and evidenced. One bug found and fixed (`F-04-01`: `appendDecisionLog` async stream → `appendFileSync`). 35/35 tests pass. AC-01–09 verified. Git checkpoint committed.

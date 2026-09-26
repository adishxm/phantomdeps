<!-- Status: DRAFT | Last-updated commit: 540b861 -->
# Phase 03 Implementation Plan — Build the smallest demonstrable product

**Status:** `DRAFT`  
**Last-updated commit:** `d63976d`

## Scope

This plan executes steps `3.1, 3.2, 3.3, 3.4, 3.5, 3.6` in both synchronized lanes. The detailed step contract is in `../.imple-plan/antigravity-roadmap.md ` and `ibm-bob-roadmap.md`; objectives, acceptance criteria, tests, evidence, and definition of done must remain equal.

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

- [ ] Every step has an owner or an explicit blocker.
- [ ] Local tests run and exact evidence is saved.
- [ ] Advanced tests run after local pass.
- [ ] Antigravity/Bob parity table updated.
- [ ] Decision, risk/blocker, and test evidence indexes updated.
- [ ] Secret scan and artifact completeness check pass.
- [ ] Commit created only after the gate passes.

## Current status

`NOT_STARTED` for implementation. The active sandbox has no source repository, tests, team roster, or Git remote.

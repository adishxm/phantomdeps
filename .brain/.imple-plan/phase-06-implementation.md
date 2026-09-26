<!-- Status: DRAFT | Last-updated commit: 540b861 -->
# Phase 06 Implementation Plan — Outsider-agent review

**Status:** `DRAFT`  
**Last-updated commit:** `d63976d`

## Scope

This plan executes steps `6.1, 6.2, 6.3, 6.4, 6.5, 6.6` in both synchronized lanes. The detailed step contract is in `../.imple-plan/antigravity-roadmap.md ` and `ibm-bob-roadmap.md`; objectives, acceptance criteria, tests, evidence, and definition of done must remain equal.

## Phase outcome

Produce phase-specific artifacts, evidence, test records, and a gate decision for the npm-first fixture-replayable `phantomdeps` MVP. A phase is not `PASSED` until implementation evidence exists, all required tests pass, the report and plan are updated, parity is checked, and a Git checkpoint is verifiable.

## Ordered work

- `6.1` — Prepare a read-only review package containing the product brief, acceptance criteria, source snapshot, test instructions, and known risks
- `6.2` — Ask an independent agent with no implementation context to install, run, and review the product
- `6.3` — Ask a second independent reviewer to challenge usability, security, correctness, and demo credibility
- `6.4` — Compare outsider findings with team findings; classify each as valid, invalid, or needs investigation
- `6.5` — Fix all release-blocking findings and document accepted residual risks
- `6.6` — Re-run the affected tests after every fix

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

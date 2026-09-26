<!-- Status: PASSED | Last-updated commit: phase-04 -->
# Phase 04 Report — Team-local validation

**Status:** `PASSED`  
**Last-updated commit:** `phase-04: local validation complete — 35/35 tests, AC-01–09 verified`  
**Executed by:** IBM Bob (Agent mode) — Phase 04 session  
**Environment:** Windows 10 (10.0.26200), Node.js v24.21.0, npm 11.19.0

---

## Gate result

`PASSED` — all six steps complete, all acceptance criteria verified, one bug found and fixed.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `4.1` | `COMPLETE` | `.brain/.report/phase-04-step-4.1-lint-typecheck-tests.md` |
| `4.2` | `COMPLETE` | `.brain/.report/phase-04-step-4.2-integration-tests.md` |
| `4.3` | `COMPLETE` | `.brain/.report/phase-04-step-4.3-e2e-demos.md` |
| `4.4` | `COMPLETE` | `.brain/.report/phase-04-step-4.4-ac-verification.md` |
| `4.5` | `COMPLETE` | `.brain/.report/phase-04-step-4.5-evidence-record.md` |
| `4.6` | `COMPLETE` | This report + git commit |

---

## Test summary

| Suite | Tests | Result |
|---|---|---|
| `tests/parser.test.ts` | 8 | PASS |
| `tests/static-claim.test.ts` | 5 | PASS |
| `tests/policy.test.ts` | 6 | PASS |
| `tests/fixture-loader.test.ts` | 2 | PASS |
| `tests/gate-integration.test.ts` | 14 | PASS |
| **Total** | **35** | **PASS** |

---

## Acceptance criteria

| Criterion | Result |
|---|---|
| AC-01 BLOCK on absent symbol | PASS |
| AC-02 ALLOW on present symbol | PASS |
| AC-03 BLOCK on 404 | PASS |
| AC-04 UNVERIFIED on unavailable | PASS |
| AC-05 No package executes | PASS |
| AC-06 Decision log written | PASS (after bug fix) |
| AC-07 Shell metachar rejection | PASS |
| AC-08 Offline reproducibility | PASS |
| AC-09 35 unit tests pass | PASS |
| AC-10 B0 vs B2 benchmark | DEFERRED → Phase 05 |

---

## Bugs found and fixed

| ID | Component | Description | Fix |
|---|---|---|---|
| `F-04-01` | `src/evidence/writer.ts` | `appendDecisionLog` used async `createWriteStream` — log silently lost on process exit | Changed to synchronous `appendFileSync`; 35/35 tests pass after fix |

---

## Gate checklist

- [x] Every step has an owner (IBM Bob Agent mode).
- [x] Local tests run (35/35) and exact evidence is saved.
- [x] Integration tests run after local pass.
- [x] All three E2E scenarios verified with exit codes.
- [x] AC-01 through AC-09 verified against live product output.
- [x] Bug found, fixed, and re-validated.
- [x] Evidence files written to `.brain/.report/phase-04-step-*.md`.
- [x] Phase plan updated to `PASSED`.
- [x] Commit created after gate passes.

---

## Next phase

**Phase 05 — Advanced validation:** edge cases, security scan, reproducibility, performance, AC-10 benchmark.

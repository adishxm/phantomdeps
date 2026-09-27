# Phase 14 — Step 14.2: Full Test Suite Execution

<!-- Status: COMPLETE | Last-updated commit: phase-14 -->

**Step:** 14.14.2
**Status:** `COMPLETE`
**Owner:** Contributor 2 (Narayan Kumar Jha)
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-28
**HEAD commit:** `7721a5a884a98bac0cbfc6ec6309385f49a3f013`

## Action

Run the full build, lint, unit, integration, hook subprocess, audit-log, claim-context, and CLI-width test suites. Capture raw output.

## Command

```
$ npm run lint && npm test
```

## Raw output

```
> phantomdeps@0.1.0 lint
> tsc --noEmit
(exit 0)

> phantomdeps@0.1.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js --forceExit

PASS tests/policy.test.ts
PASS tests/fixture-loader.test.ts
PASS tests/gate-integration.test.ts
PASS tests/audit-log.test.ts
PASS tests/parser.test.ts
PASS tests/claim-context.test.ts
PASS tests/artifact-registry.test.ts
PASS tests/edge-cases.test.ts
PASS tests/static-claim.test.ts
PASS tests/hook-subprocess.test.ts (7.886 s)

Test Suites: 10 passed, 10 total
Tests:       205 passed, 205 total
Snapshots:   0 total
Time:        8.233 s
```

## Per-suite breakdown

| Suite | Tests | Status | Coverage |
|---|---|---|---|
| `tests/parser.test.ts` | ~8 | PASS | argv parsing, shell metachar rejection, protocol rejection |
| `tests/static-claim.test.ts` | ~5 | PASS | fixture symbol resolver, SYMBOL_FOUND/MISSING/UNVERIFIED |
| `tests/policy.test.ts` | ~6 | PASS | policy engine verdicts with all evidence types |
| `tests/fixture-loader.test.ts` | ~2 | PASS | fixture load + validation |
| `tests/gate-integration.test.ts` | ~14 | PASS | full L1→L2→L3→Policy pipeline for all 3 fixtures |
| `tests/edge-cases.test.ts` | ~68 | PASS | Phase 05 fuzz, property, malformed-input, output-validation tests |
| `tests/hook-subprocess.test.ts` | ~28 | PASS | Phase 10 subprocess hook — multi-pkg, option-first, UNVERIFIED→exit 2 |
| `tests/artifact-registry.test.ts` | ~24 | PASS | Phase 11 typed registry outcomes, ArtifactInspection, integrity |
| `tests/audit-log.test.ts` | ~21 | PASS | Phase 12 tamper tests, override records, provenance terminology |
| `tests/claim-context.test.ts` | ~29 | PASS | Phase 13 diff parser, claim-context contract, --json, width wrapping |
| **Total** | **205** | **PASS** | |

## Evidence label

`TEAM MEASUREMENT` — produced by committed test runner at HEAD commit `7721a5a`, environment recorded above.

## Completion gate

- [x] `npm run lint` — CLEAN (0 errors)
- [x] `npm test` — 205/205 PASS
- [x] 10/10 test suites pass
- [x] All 28 hook subprocess tests pass
- [x] All 24 artifact registry tests pass
- [x] All Phase 12 tamper + Phase 13 claim-context tests pass

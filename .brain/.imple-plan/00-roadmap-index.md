<!-- Status: COMPLETE | Last-updated commit: 76ecbff -->
# Roadmap Index — `phantomdeps`

**Status:** `COMPLETE`
**Last-updated commit:** `76ecbff`
**All phases:** 00–08 PASSED
**Repository:** https://github.com/adishxm/phantomdeps
**Release tag:** `v0.1.0` (commit `c31a950`)

## Selected MVP (DELIVERED)

An npm-first, fixture-replayable pre-install claim gate. A fresh clone runs `npx tsx src/cli.ts demo --fixture --offline` offline; a baseline name-only check would allow `import { isOddBatch } from 'is-odd'`; exact npm artifact/export evidence proves the symbol is absent; the gate returns `BLOCK` with citations and a patch suggestion; suspect packages are never installed in the demo. Delivered in Phase 03 and hardened through Phase 08.

## Team (confirmed)

| Contributor | Role | Identity |
|---|---|---|
| Aditya Kumar Sharma | Product + architecture lead | https://github.com/adishxm |
| Narayan Kumar Jha | Core implementation + test engineer | narayan.nkj@gmail.com |
| Utkarsh Yadav | Validation + IBM Bob workflow lead | https://github.com/utkarsh-2207 |

## Non-goals / deferred (unchanged)

1. **Deferred:** full PyPI API-claim parity and popularity analytics.
2. **Deferred:** enterprise transitive monitoring, private registry policy bundles, continuous post-approval compromise detection, and universal shell interception.

## Immutable synchronized IDs

Phases `00`–`08` and every step ID exactly follow the master prompt. See `ibm-bob-roadmap.md` and `phase-step-traceability.md`.

## Final gate status

| Gate | Status | Evidence |
|---|---|---|
| Repository audit | ✅ PASSED | Phase 00 — commit `52c3d65`; repo at `github.com/adishxm/phantomdeps` |
| MVP selection | ✅ PASSED | Phase 00 — D-001; npm-first fixture-replayable gate selected |
| Team allocation | ✅ RESOLVED | Phase 08 — 3 named contributors confirmed in `package.json` |
| Implementation | ✅ PASSED | Phase 03 — commit `c6fd683`; BLOCK/WARN/ALLOW confirmed; 35/35 tests |
| Local/advanced tests | ✅ PASSED | Phase 04/05 — 103/103 tests; AC-01–09 verified; 0 vulns; 1168ms avg |
| Outsider review | ✅ PASSED | Phase 06 — 2 blocking findings fixed; hook verified; commit `7a493ac` |
| Finalization | ✅ PASSED | Phase 07 — RC tag `v0.1.0-rc.1`; rehearsal 7/7; commit `8c9bc88` |
| Submission package | ✅ PASSED | Phase 08 — secret scan CLEAN; 59-item checklist; commit `c31a950` |
| Human submission | ⚠️ PENDING HUMAN | 18 action items for team — see `phase-08-step-8.5-final-checklist.md` |

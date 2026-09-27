<!-- Status: HISTORICAL BASELINE | Last-updated commit: PENDING -->
# Executive Summary — `phantomdeps`

**Status:** `HISTORICAL BASELINE — NOT CURRENT RELEASE APPROVAL`
**Last-updated commit:** `76ecbff` (historical Phase 00–08 evidence)
**Historical phases:** 00 through 08 recorded baseline work; active Phases 09–14 are not complete.
**Repository:** https://github.com/adishxm/phantomdeps
**Release tag:** `v0.1.0` (commit `c31a950`)
**Date:** 2026-09-27

---

## Product

`phantomdeps` is an npm-first, offline fixture-replayable verification prototype. The fixture path demonstrates a missing-symbol block without package installation. The current live path resolves npm metadata and returns `UNVERIFIED` when static API evidence is unavailable. Active remediation must complete fail-closed hook enforcement, claim-context handling, exact artifact inspection or explicit de-scope, and independent measurement before broader security claims are made.

IBM Bob usage is documented and the hook is registered via `.bob/settings.json`, but full workflow validity remains `NOT_STARTED` until a real session or labelled wrapper fallback is captured.

---

## Measured results (all phases complete)

| Metric | Value | Phase |
|---|---|---|
| Test suites | 6 | 05 |
| Tests passing | 103 / 103 | 05, re-verified 08 |
| Offline gate avg latency | 1168 ms (max 1381 ms) | 05 |
| Known vulnerabilities (`npm audit`) | 0 | 05, re-verified 08 |
| Hook exit on BLOCK | 2 | 06 |
| Hook exit on non-npm | 0 | 06 |
| Demo rehearsal | 7 / 7 PASS (~11.5 s) | 07 |
| Secret scan | CLEAN | 08 |
| Acceptance criteria AC-01–AC-09 | All PASS | 04 |

---

## Team

| Contributor | Role |
|---|---|
| Aditya Kumar Sharma | Product + architecture lead |
| Narayan Kumar Jha | Core implementation + test engineer |
| Utkarsh Yadav | Validation + IBM Bob workflow lead |

---

## Phase history

| Phase | Status | Commit |
|---|---|---|
| 00 — Intake & audit | ✅ PASSED | `52c3d65` |
| 01 — Product contract | ✅ PASSED | `9af5c2d` |
| 02 — Architecture & design | ✅ PASSED | `31d90b1` |
| 03 — Build MVP | ✅ PASSED | `c6fd683` |
| 04 — Local validation | ✅ PASSED | `6dc7846` |
| 05 — Advanced validation | ✅ PASSED | `61569ea` |
| 06 — Outsider review | ✅ PASSED | `7a493ac` |
| 07 — Finalization & demo | ✅ PASSED | `8c9bc88` |
| 08 — Submission package | ✅ PASSED | `c31a950` |

---

## Outstanding human actions before submission

18 items remain for team execution: video recording, Bob session screenshots + report export, slides/PDF, cover image, application URL decision, live portal deadline recheck, final form fill, and explicit human authorization. See `.brain/.report/phase-08-step-8.5-final-checklist.md`.

<!-- Status: COMPLETE | Phase: 08 | Step: 8.5 | Last-updated commit: phase-08 -->
# Phase 08 Step 8.5 — Final Submission Checklist

**Phase:** 08  
**Step:** 8.5  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — Phase 08 session  
**Date:** 2026-09-27  
**Repo:** https://github.com/adishxm/phantomdeps  
**Tag:** `v0.1.0-rc.1` → recommend `v0.1.0` after Phase 08 commit

---

## Section 1 — Code quality and tests

| Item | Owner | Status | Evidence |
|---|---|---|---|
| `npm run lint` (tsc --noEmit) — 0 errors | Narayan Kumar Jha | ✅ DONE | Phase 05/06/07 — 0 errors confirmed; re-verified Phase 08 |
| `npm test` — 103/103 tests, 0 failures | Narayan Kumar Jha | ✅ DONE | Phase 05+: 103/103; re-verified Phase 08 (0.594s) |
| `npm audit --audit-level=moderate` — 0 vulnerabilities | Utkarsh Yadav | ✅ DONE | Phase 05 step 5.3; re-verified Phase 08 |
| No secrets/credentials in tracked files | Utkarsh Yadav | ✅ DONE | Phase 08 step 8.3 secret scan — CLEAN |
| `node_modules/` not tracked | Narayan Kumar Jha | ✅ DONE | Phase 08 step 8.3 — confirmed not in `git ls-files` |
| `.gitignore` present | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Not tracked; add `node_modules/` + `dist/` before final tag |

---

## Section 2 — Functionality

| Item | Owner | Status | Evidence |
|---|---|---|---|
| `demo --scenario block` → BLOCK + `l2.symbol_missing` + remediation | Utkarsh Yadav | ✅ DONE | Phase 07 rehearsal 7/7 PASS |
| `demo --scenario allow` → ALLOW | Utkarsh Yadav | ✅ DONE | Phase 07 rehearsal 7/7 PASS |
| `demo --scenario warn` → WARN + `l3.risk_signal` | Utkarsh Yadav | ✅ DONE | Phase 07 rehearsal 7/7 PASS |
| `check` subcommand exits `2` on BLOCK, `0` on ALLOW | Utkarsh Yadav | ✅ DONE | Phase 04 step 4.4 AC-04 |
| `.phantomdeps/decisions.ndjson` written after gate run, with hash chain | Narayan Kumar Jha | ✅ DONE | Phase 04 step 4.4 AC-07/08 |
| Shell injection rejected with UNSAFE error | Narayan Kumar Jha | ✅ DONE | Phase 05 — 13 tests in `edge-cases.test.ts` |
| Protocol/alias forms rejected with UNSUPPORTED | Narayan Kumar Jha | ✅ DONE | Phase 05 step 5.1 (F-05-01) |
| Registry unavailable → UNVERIFIED (never ALLOW) | Narayan Kumar Jha | ✅ DONE | `tests/policy.test.ts` |
| No package installed or executed at any point | All | ✅ DONE | Structural — fixture mode only; gate never execs tarball |

---

## Section 3 — IBM Bob integration

| Item | Owner | Status | Evidence |
|---|---|---|---|
| `.bob/settings.json` exists and registers the hook | Utkarsh Yadav | ✅ DONE | Phase 06 step 6.5 (F-06-02) |
| Hook runs without errors via `npx tsx .bob/hooks/PreToolUse.mjs` | Utkarsh Yadav | ✅ DONE | Phase 06 step 6.5 hook verification |
| Hook exits `2` on `npm install is-odd` | Utkarsh Yadav | ✅ DONE | Phase 06 step 6.5 hook verification |
| Hook exits `0` on non-npm command | Utkarsh Yadav | ✅ DONE | Phase 06 step 6.5 hook verification |
| Hook writes decision to `.phantomdeps/decisions.ndjson` | Narayan Kumar Jha | ✅ DONE | Phase 06 + Phase 07 rehearsal |
| Bob Plan mode evidence present | Aditya Kumar Sharma | ✅ DONE | `.brain/.imple-plan/phase-00` through `phase-08` |
| Bob Agent mode evidence present | All | ✅ DONE | Phase reports 00–08 in `.brain/.report/` |
| Bob Ask mode documented | All | ✅ DONE | `judge-qa.md`, `README.md` §IBM Bob integration |
| Bob task-session screenshots | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Must be exported from Bob before submission |
| Exported Bob report | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Must be exported from Bob before submission |

---

## Section 4 — Repository and release

| Item | Owner | Status | Evidence |
|---|---|---|---|
| Public repository URL | Aditya Kumar Sharma | ✅ DONE | https://github.com/adishxm/phantomdeps |
| RC tag `v0.1.0-rc.1` pushed | Aditya Kumar Sharma | ✅ DONE | Phase 07 step 7.1 |
| Recommend final tag `v0.1.0` after Phase 08 commit | Aditya Kumar Sharma | ⚠️ ACTION NEEDED | See step 8.4 recommendation |
| `main` branch clean (no uncommitted src/tests/fixtures changes) | All | ✅ DONE | `git status` — only Phase 08 new docs untracked |
| MIT `LICENSE` file present | Aditya Kumar Sharma | ✅ DONE | `git ls-files | grep LICENSE` |
| Phase reports 00–08 in `.brain/.report/` | IBM Bob (Agent) | ✅ DONE | All 8 phase reports present |
| CI badge in README | Narayan Kumar Jha | ✅ DONE | Phase 07 README update |
| Test count badge (103/103) | Narayan Kumar Jha | ✅ DONE | Phase 07 README update |

---

## Section 5 — Documentation and demo

| Item | Owner | Status | Evidence |
|---|---|---|---|
| README accurate: badges, test count, version, structure | Narayan Kumar Jha | ✅ DONE | Phase 07 step 7.2 |
| Demo script finalized — timed, rehearsed | **Contributor 4** | ✅ DONE | `.docs/10_DEMO/demo-script.md` FINAL — 7/7 PASS |
| Judge Q&A: no TBD, all grounded in evidence | Utkarsh Yadav | ✅ DONE | `.docs/10_DEMO/judge-qa.md` FINAL |
| Known limitations documented | All | ✅ DONE | `.docs/10_DEMO/release-checklist.md` — 5 limitations |
| PPT/slides (PDF) | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Outline exists; final slides not yet produced |
| Video (≤ 5 min, captions, no secrets) | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Script exists; recording not yet produced |
| Cover image / screenshots | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Must be captured from demo terminal |

---

## Section 6 — Portal submission fields

| Portal field | Owner | Status | Value / Location |
|---|---|---|---|
| Project description | Aditya Kumar Sharma | ✅ READY | See step 8.2 description draft |
| Tags | Aditya Kumar Sharma | ✅ READY | `ibm-bob, npm, dependency-security, ai-agents, static-analysis, pre-install, hallucination, supply-chain` |
| Repository URL | Aditya Kumar Sharma | ✅ DONE | https://github.com/adishxm/phantomdeps |
| Team details | All | ✅ READY | Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav, Roshan Singh |
| Application / demo URL | **Contributor 4** | ⚠️ NEEDS HUMAN DECISION | Confirm acceptable format on live form |
| Cover image | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Capture from demo terminal |
| Video | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Record using demo-script.md |
| Slides (PDF) | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Build from ppt-outline.md |
| Bob-assisted files | All | ✅ READY | `.brain/` + `.docs/` in repository |
| Bob task-session screenshots | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Export from Bob before submission |
| Exported Bob report | **Contributor 4** | ⚠️ NEEDS HUMAN ACTION | Export from Bob before submission |
| Team details | Aditya Kumar Sharma | ✅ READY | See step 8.2 team table |
| Technology disclosure | All | ✅ READY | See step 8.2 technology disclosure table |

---

## Section 7 — Pre-submission recheck (human required)

| Item | Owner | Status |
|---|---|---|
| Confirm live deadline has not changed (27 Sep 2026 15:00 UTC) | **Contributor 4** | ⚠️ RECHECK LIVE PAGE |
| Confirm application URL format accepted | **Contributor 4** | ⚠️ RECHECK LIVE FORM |
| Confirm video maximum still ≤ 5 minutes | **Contributor 4** | ⚠️ RECHECK LIVE FORM |
| Confirm no new required fields added to form | **Contributor 4** | ⚠️ RECHECK LIVE FORM |
| All slide claims cite repository artifacts or test results | Utkarsh Yadav | ⚠️ REQUIRES PPT REVIEW |
| Phase 06 step 6.3 — Reviewer 2 confirmed no new blocking issues | Utkarsh Yadav | ✅ DONE |
| Human authorized submitter has reviewed exact payload | **Authorized human** | ⚠️ REQUIRED — see step 8.6 |

---

## Summary

| Category | Ready | Needs Human Action |
|---|---|---|
| Code quality + tests | 5 / 6 (`.gitignore` missing) | 1 |
| Functionality | 9 / 9 | 0 |
| IBM Bob integration | 8 / 10 | 2 (screenshots + report export) |
| Repository + release | 7 / 8 | 1 (final `v0.1.0` tag) |
| Documentation + demo | 5 / 8 | 3 (PPT, video, cover image) |
| Portal fields | 6 / 11 | 5 |
| Pre-submission recheck | 1 / 7 | 6 |
| **Total** | **41 / 59** | **18** |

The 18 outstanding items all require **human action**: recording, exporting, capturing screenshots, and re-verifying the live portal form. No code or documentation work is blocked.

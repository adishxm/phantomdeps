# Phase 09 Report — Truth Reset, Contract Freeze, and Baseline

<!-- Status: COMPLETE | Last-updated commit: phase-09 -->

**Status:** `COMPLETE`  
**Last-updated commit:** `phase-09`  
**Executed by:** IBM Bob (Agent mode) — Phase 09 session  
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0  
**Date:** 2026-09-27  
**HEAD commit (at session start):** `54083c9d0787d7097a26ad3c8a1799f19aeeb6e7`

---

## Objective

Make the repository say exactly what the current code does before adding new security behavior. Prevent documentation and acceptance criteria from drifting during Phases 10–14 remediation.

---

## Gate result: PASSED

All five steps completed. All four completion-gate checks pass. No code changed. No Phase 10 work begins until this commit is stable.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `09.1` | `COMPLETE` | `package.json`, `CONTRIBUTING.md`, `.brain/.report/team-allocation.md` — three-person roster formalized; PPT/demo ownership assigned to Aditya Kumar Sharma |
| `09.2` | `COMPLETE` | `docs/product-contract.md` — v1 contract frozen; 13 behavioral statements + 8 non-goals + Bob hook scope |
| `09.3` | `COMPLETE` | `README.md` — corrected: live-mode symbol check labelled UNVERIFIED, `install` alias labelled verification-only, demo exit code clarified, provenance limitation added, hook scope clarified |
| `09.4` | `COMPLETE` | `README.md` — capability matrix added; 15 rows labelled `implemented` / `fixture-only` / `planned` / `unsupported` |
| `09.5` | `COMPLETE` | `.brain/.report/phase-09-baseline.md` — 12-section baseline; commands, expected outputs, behavioral constraints, all gate checks confirmed |

---

## Step 09.1 — Roster

**Decision:** The original four-contributor plan allocated Contributor 4 (PPT/demo/submission) as a separate person. No fourth person exists. Phase 09 formally resolves this as a **three-person team** with PPT/demo ownership held by Contributor 1 (Aditya Kumar Sharma).

**Files changed:**
- `package.json` — contributor roles added in parentheses
- `CONTRIBUTING.md` — draft status removed; three-person roster table added; PPT ownership explicit
- `.brain/.report/team-allocation.md` — Phase 09 roster decision section added; Contributor 4 slot formally merged

**Decision log entry:** D-015 (recorded below)

---

## Step 09.2 — Product contract freeze

**File created:** `docs/product-contract.md`

**Key contract statements frozen:**

| ID | Summary | Status |
|---|---|---|
| C-01 | Verification-only — never installs or executes | `IMPLEMENTED` |
| C-02 | `install`/`add` are aliases for `check` | `IMPLEMENTED` |
| C-03 | Fixture mode is deterministic demo evidence, not live claim context | `IMPLEMENTED` |
| C-04 | Live mode resolves metadata; UNVERIFIED never becomes ALLOW | `IMPLEMENTED` |
| C-05 | Static API symbol verification: fixture subset only | `FIXTURE-ONLY` |
| C-06 | BLOCK = hard failure; WARN = weak signal; UNVERIFIED = preserved ambiguity | `IMPLEMENTED` |
| C-07 | Remediation is patch-suggestion only; human approval required | `IMPLEMENTED` |
| C-08 | Bob hook: fixture path only; exit 2 = BLOCK; stdout ignored | `IMPLEMENTED (fixture-path only)` |
| C-09 | publishedAt always null in live mode; provenance signal not raised | `FIXTURE-ONLY` |
| C-10 | Strict agent policy in hook path; human policy in CLI path | `IMPLEMENTED` |
| C-11 | Exit codes: 0=ALLOW, 1=WARN, 2=BLOCK, 3=UNVERIFIED | `IMPLEMENTED` |
| C-12 | npm-first; shell metachar/protocol/214-char rejection | `IMPLEMENTED` |
| C-13 | NDJSON hash-chained decision log | `IMPLEMENTED` |

---

## Step 09.3 — README corrections

**Claims corrected:**

| Location | Was | Now |
|---|---|---|
| Description paragraph | "verification prototype" — ambiguous | Explicit: "verification-only pre-install claim gate; never installs or executes package code" |
| Limitation note | Single bullet | 5-bullet breakdown: live symbol check, provenance, hook scope, `install` alias semantics, and fixture-only caveat |
| `install` command comment | "Drop-in install wrapper" | "Verification-only install alias (does NOT run npm install; same as check)" |
| Live `check` command comment | No caveat | "metadata + integrity; symbol check: UNVERIFIED in live mode" |
| Exit codes line | One line for all commands | Separated: check/install vs demo |
| Contributors section | Names only | Three-person team note + D-005 resolution |

---

## Step 09.4 — Capability matrix

**Added to README** between IBM Bob integration section and Historical baseline.

15 rows covering: fixture demo, live metadata, symbol verification (fixture/live), UNVERIFIED verdict, provenance, hook (fixture/live paths), multi-package, injection rejection, NDJSON log, patch remediation, non-npm, transitive deps, lock-file analysis.

Labels used: `implemented` · `fixture-only` · `planned` · `unsupported`

---

## Step 09.5 — Baseline record

**File created:** `.brain/.report/phase-09-baseline.md`

Sections:
1. Build — `tsc` exit 0
2. Lint — `tsc --noEmit` exit 0
3. Tests — 103/103 PASS, ~1.2s
4–6. Demo — BLOCK / ALLOW / WARN all confirmed; demo exits 0 in all cases
7–9. Hook — exit 2 on BLOCK (is-odd), exit 0 on ALLOW (lodash), exit 0 on non-npm
10. CLI check offline — BLOCK confirmed
11. Known behavioral constraints table (5 entries)
12. npm audit — 0 vulnerabilities

---

## Completion gate

- [x] README claims match source behavior at HEAD (all corrections applied and verified)
- [x] Three-person team explicitly recorded (D-015); PPT/demo ownership assigned to Contributor 1
- [x] Every security claim has a linked test or is labelled `fixture-only`/`planned`
- [x] `npm run build` → 0 errors · `npm run lint` → 0 errors · `npm test` → 103/103 · offline demo → PASS
- [x] No code changes made during Phase 09 — contract established before Phase 10 begins

---

## Phase history

| Phase | Status | Key result |
|---|---|---|
| 00 — Intake | ✅ PASSED | Repo initialized, scaffold verified |
| 01 — Product contract | ✅ PASSED | 8 user stories, 10 ACs, 14 requirements |
| 02 — Architecture | ✅ PASSED | Architecture, data model, UX, threat model |
| 03 — Build MVP | ✅ PASSED | 35/35 tests, BLOCK/WARN/ALLOW, 3 fixtures |
| 04 — Local validation | ✅ PASSED | 35/35 tests, AC-01–09 verified |
| 05 — Advanced validation | ✅ PASSED | 103/103 tests, 2 parser fixes, 0 vulns, 1168ms avg |
| 06 — Outsider review | ✅ PASSED | Hook TS syntax fixed, settings.json created |
| 07 — Finalization | ✅ PASSED | RC tag, demo script, judge Q&A, rehearsal 7/7 |
| 08 — Submission package | ✅ PASSED | Secret scan clean, checklist complete, stop gate enforced |
| **09 — Truth reset** | ✅ **PASSED** | Roster frozen, contract frozen, README corrected, capability matrix, baseline recorded |

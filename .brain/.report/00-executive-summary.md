<!-- Status: FINAL | Last-updated commit: phase-14 -->
# Executive Summary — `phantomdeps`

**Status:** `FINAL — Phase 14 gate PASSED; stop gate enforced`
**Last-updated commit:** `phase-14` (HEAD `7721a5a`)
**Active phases:** 09–14 all complete.
**Repository:** https://github.com/adishxm/phantomdeps
**Contributors:** Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav, Roshan Singh
**Release tag:** `v0.1.0-final` (pending human creation)
**Date:** 2026-09-28

---

## Product

`phantomdeps` is an npm-first, offline fixture-replayable verification prototype for AI coding agent dependencies. It prevents hallucinations by statically checking package existence and exported symbols from npm tarballs without executing target package code.

The remediation phases (09–14) implemented fail-closed Bob hook enforcement, explicit claim-context handling (`--symbols`, diff, file), exact artifact tarball inspection, tamper-evident hash-chained audit logging with five-dimensional provenance, machine-readable JSON output, and a B0/B1/B2 evaluation corpus with committed raw results.

---

## Measured results (Phases 00–14 complete)

| Metric | Value | Phase | Evidence label |
|---|---|---|---|
| Test suites | 10 | 14 | TEAM MEASUREMENT |
| Tests passing | 205 / 205 | 14 | TEAM MEASUREMENT |
| B0/B1/B2 corpus cases | 12 / 12 | 14 | TEAM MEASUREMENT |
| Wrong-symbol recall | 100% (2/2) | 14 | TEAM MEASUREMENT |
| False-block rate | 0% (0/2) | 14 | TEAM MEASUREMENT |
| Abstention/UNVERIFIED rate | 33% (4/12) | 14 | TEAM MEASUREMENT |
| Offline gate avg latency | 1168 ms (max 1381 ms) | 05 | TEAM MEASUREMENT |
| Known vulnerabilities (`npm audit`) | 0 | 14 | TEAM MEASUREMENT |
| Hook exit on BLOCK / UNVERIFIED | 2 | 10 | TEAM MEASUREMENT |
| Hook exit on non-npm | 0 | 10 | TEAM MEASUREMENT |
| Subprocess hook tests | 28 / 28 PASS | 10 | TEAM MEASUREMENT |
| Audit log tamper tests | 21 / 21 PASS | 12 | TEAM MEASUREMENT |
| Artifact registry tests | 24 / 24 PASS | 11 | TEAM MEASUREMENT |
| Claim context & diff parser tests | 29 / 29 PASS | 13 | TEAM MEASUREMENT |
| Demo rehearsal | 7 / 7 PASS (~11.5 s) | 07 | TEAM MEASUREMENT |
| Secret scan | CLEAN | 14 | TEAM MEASUREMENT |
| Acceptance criteria AC-01–AC-09 | All PASS | 04–13 | TEAM MEASUREMENT |
| Independent review | No release blockers | 14 | CONFIRMED |

---

## Team

| Contributor | Role |
|---|---|
| Aditya Kumar Sharma | Product + architecture lead |
| Narayan Kumar Jha | Core implementation + test engineer |
| Utkarsh Yadav | Validation + IBM Bob workflow lead |
| Roshan Singh | Demo, documentation + PPT presentation lead |

---

## Phase history

| Phase | Status | Summary |
|---|---|---|
| 00 — Intake & audit | ✅ PASSED | Repo intake & initial audit |
| 01 — Product contract | ✅ PASSED | Product boundary & contract definition |
| 02 — Architecture & design | ✅ PASSED | System architecture & threat model |
| 03 — Build MVP | ✅ PASSED | MVP build & fixture loader |
| 04 — Local validation | ✅ PASSED | Acceptance test verification |
| 05 — Advanced validation | ✅ PASSED | Edge-cases, fuzzing, & performance |
| 06 — Outsider review | ✅ PASSED | Review package & remediation |
| 07 — Finalization & demo | ✅ PASSED | Release candidate & demo script |
| 08 — Submission package | ✅ PASSED | Portal requirements & secret scan |
| 09 — Alignment & baseline | ✅ PASSED | Roster fix, baseline measurement |
| 10 — Fail-closed hook | ✅ PASSED | Argv tokenizer, multi-pkg, exit 2 |
| 11 — Static API verification | ✅ PASSED | Tarball download, sha512, exports AST |
| 12 — Evidence integrity | ✅ PASSED | Hash chain audit verify, tamper tests |
| 13 — Claim context & CLI | ✅ PASSED | Diff parser, verify command, --json |
| **14 — Release gate** | ✅ **PASSED** | 12/12 corpus, 100% recall, stop gate enforced |

---

## Outstanding human actions before submission

Three items remain for team execution:

1. **Release tag** — `git tag -a v0.1.0-final -m "..."` after reviewing `.brain/.report/phase-14-step-14.8-final-tag-stop-gate.md`
2. **Submission assets** — demo video, slides/PDF, cover image, Bob session screenshots, Bob report export
3. **Portal form** — fill and submit with explicit human authorization

See `.brain/.report/phase-14-step-14.8-final-tag-stop-gate.md` for the full stop gate checklist.

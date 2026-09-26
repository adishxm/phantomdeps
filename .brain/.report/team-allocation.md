<!-- Status: COMPLETE | Last-updated commit: 76ecbff -->
# Four-Contributor Work Allocation — `phantomdeps`

**Status:** `COMPLETE`
**Last-updated commit:** `76ecbff`
**Roster (confirmed — Phase 08):**

| Contributor | Real name | Identity |
|---|---|---|
| Contributor 1 (Product + architecture lead) | **Aditya Kumar Sharma** | https://github.com/adishxm |
| Contributor 2 (Core implementation + test engineer) | **Narayan Kumar Jha** | narayan.nkj@gmail.com |
| Contributor 3 (Validation + IBM Bob workflow lead) | **Utkarsh Yadav** | https://github.com/utkarsh-2207 |
| Contributor 4 (Demo + submission lead) | **Aditya Kumar Sharma** (also Contributor 1 — team of 3) | — |

> Source: `package.json` contributors field; `git log` commit `3fa529c` adds Utkarsh Yadav; commits `987a6b9` and `52c3d65` establish Aditya Kumar Sharma and Narayan Kumar Jha.

## Allocation rule

All four contributors participate in the product task. Work is divided into **three primary delivery workstreams**, with **Contributor 3 as the named backup owner**, and a dedicated **PPT/demo owner** who also contributes implementation and review work.

| Contributor | Primary role | Main ownership | Secondary contribution | Backup responsibility |
|---|---|---|---|---|
| **Contributor 1** | Product + architecture lead | Phases 0–2; problem contract, MVP boundary, architecture, data/API contract, Git coordination | Reviews core implementation and acceptance criteria | Backed up by Contributor 3 |
| **Contributor 2** | Core implementation + test engineer | Phase 3; CLI, command parser, npm fixture adapter, static claim/API resolver, evidence card, unit/integration tests | Reviews architecture and demo reliability | Backed up by Contributor 3 |
| **Contributor 3** | Validation, security + IBM Bob workflow lead | Phases 4–6; local/advanced validation, threat model checks, Bob Plan/Ask/Agent evidence, outsider review coordination | Runs regression tests and release-blocker triage | **Primary backup for Contributors 1 and 2; can take over any blocked workstream** |
| **Contributor 4** | Demo, PPT + submission lead | Phase 7–8; PPT/slides, timed demo, pitch, screenshots, judge Q&A, submission checklist | Implements demo fixture/data, reviews UX, runs rehearsal, contributes documentation | Backed up by Contributor 3 for release evidence; Contributor 1 for narrative decisions |

## Workstream split by phase

| Phase | Primary | Required supporting contributors | Handoff evidence |
|---|---|---|---|
| 0 — Intake/audit | Contributor 1 | All four attend orientation; Contributor 3 records risks; Contributor 4 records demo constraints | Audit report, roster, MVP decision, Git policy |
| 1 — Product contract | Contributor 1 | Contributor 2 feasibility review; Contributor 3 acceptance/test review; Contributor 4 demo-story review | PRD, stories, acceptance matrix, demo scenario |
| 2 — Architecture/security/design | Contributor 1 | Contributor 2 API review; Contributor 3 threat model; Contributor 4 UX/demo path | Architecture, contracts, threat model, setup plan |
| 3 — Build | Contributor 2 | Contributor 1 scope decisions; Contributor 3 security/test review; Contributor 4 fixture/demo data | Runnable vertical slice, tests, evidence card |
| 4 — Local validation | Contributor 3 | Contributor 2 fixes; Contributor 1 acceptance review; Contributor 4 clean-checkout rehearsal | Test logs, acceptance results, clean-checkout result |
| 5 — Advanced validation | Contributor 3 | Contributor 2 regression fixes; Contributor 1 risk decisions; Contributor 4 demo-limit review | Security/resilience/benchmark evidence |
| 6 — Outsider review | Contributor 3 | Contributor 2 install fixes; Contributor 1 disposition decisions; Contributor 4 usability/demo review | Read-only review package, findings, remediation log |
| 7 — Finalization/demo | Contributor 4 | Contributor 1 pitch approval; Contributor 2 product freeze; Contributor 3 release/security gate | PPT, video script, screenshots, rehearsal record |
| 8 — Submission package | Contributor 4 | All four verify fields; Contributor 3 performs final secret/evidence scan | Tagged-commit checklist; human confirmation before submission |

## Backup plan

1. **Contributor 3 is the first backup for Contributors 1 and 2.** They maintain a current checkout, understand the architecture, and rerun the critical demo/test path after takeover.
2. If Contributor 1 is unavailable, Contributor 3 assumes product/architecture decisions; Contributor 4 maintains the pitch narrative and Contributor 2 confirms implementation feasibility.
3. If Contributor 2 is unavailable, Contributor 3 assumes implementation triage; Contributor 1 narrows scope; Contributor 4 protects the fixture/demo path.
4. If Contributor 4 is unavailable, Contributor 3 owns demo evidence and Contributor 1 owns PPT narrative approval; the presentation cannot be considered complete until a second contributor rehearses it.
5. Every handoff must include: current branch/commit, changed files, exact next command, known failures, evidence paths, and rollback point.

## Collaboration rules

- Use one branch per contributor and reviewed pull requests into the agreed integration branch.
- No contributor marks a phase `PASSED` alone; the phase gate requires an independent reviewer.
- Contributor 4 owns the PPT file/content, but every slide claim must trace to a repository artifact or measured test result.
- Contributor 3 records backup activation and deactivation in `.brain/.report/decision-log.md`.
- Replace placeholders with actual names, tool ownership, availability, and decision authority before implementation begins.

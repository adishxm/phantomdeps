<!-- Status: ACTIVE | Last-updated: Phase 14 Milestone Closeout -->
# Contribution Guide & Contributor Attribution Matrix

**Status:** `ACTIVE`  
**Git Baseline:** 86 commits across Phases 00–14 on branch `main`  
**Live Repository:** [https://github.com/adishxm/phantomdeps](https://github.com/adishxm/phantomdeps)

---

## 1. Confirmed Team Roster & Assigned Roles

The `phantomdeps` engineering team is a verified **four-person team**. Each contributor has dedicated leadership responsibilities, code ownership areas, and delivery milestones traced directly to the repository git history.

| Contributor | Real Name | GitHub Username | Assigned Role | Primary Phase Ownership |
|---|---|---|---|---|
| **Contributor 1** | **Aditya Kumar Sharma** | [@adishxm](https://github.com/adishxm) | **Product Lead & System Architect** | Phases 00–02, MVP Phase 03, Roadmap/Remediation Planning (Phases 09–14), Visual Architecture |
| **Contributor 2** | **Narayan Kumar Jha** | [narayan-nkj (Narayan Kumar Jha)](https://github.com/narayan-nkj) | **Core Implementation & Test Automation Lead** | Phases 04, 08, 09, 12, 13, 14, Evidence Provenance, Release Gates |
| **Contributor 3** | **Utkarsh Yadav** | [@utkarsh-2207](https://github.com/utkarsh-2207) | **Validation, Security & IBM Bob Workflow Lead** | Phases 05, 06, 07, PreToolUse Bob Hook Config, RC Release Candidate |
| **Contributor 4** | **Roshan Singh** | [@rs3260821-dotcom](https://github.com/rs3260821-dotcom) | **Security Enforcement & Live Tarball AST Engineer** | Phases 10, 11, Fail-Closed Argv Tokenizer, Tarball AST Verifier, Demo & Doc |

---

## 2. Commit & Phase Attribution Summary

All 86 commits on `main` trace directly to verified team members. Below is the distribution across commits and project milestones:

| Contributor | GitHub Profile | Total Commits | Primary Phases | Key Modules & Deliverables Contributed |
|---|---|:---:|---|---|
| **Aditya Kumar Sharma** | [@adishxm](https://github.com/adishxm) | **16** | Phases 00–03, 09–14 (Gov/Docs) | Project initialization, PRD, error taxonomy, initial typed contracts & baseline orchestrator, Phase 09–14 remediation roadmap synchronization and deduplication, Mermaid visual explainer architecture (Diagrams 2.1–2.4). |
| **Narayan Kumar Jha** | [narayan-nkj (Narayan Kumar Jha)](https://github.com/narayan-nkj) | **63** | Phases 04, 08, 09, 12–14 | Local validation & NDJSON logging fixes, Phase 08 submission package, hash-chained evidence provenance (`audit-log verify`), unified diff parser & claim-context contract, B0/B1/B2 benchmark corpus, release gate verification runner, Phase 14 closeout reports. |
| **Utkarsh Yadav** | [@utkarsh-2207](https://github.com/utkarsh-2207) | **4** | Phases 05–07 | Advanced validation test suite (103 tests baseline), coverage enforcement, outsider review fixes (`.bob/settings.json`, TypeScript syntax fixes), release candidate tag (`v0.1.0-rc.1`), 7/7 timed demo rehearsals. |
| **Roshan Singh** | [@rs3260821-dotcom](https://github.com/rs3260821-dotcom) | **3** | Phases 10–11 | Contributor 4 onboarding & roster verification, fail-closed command tokenizer & policy hook (`PreToolUse.mjs`), live npm registry exact-version & pure-Node static AST tarball verification (`src/adapters/artifact.ts`, `src/adapters/registry.ts`), live fixture capture CLI. |
| **Total** | — | **86** | **Phases 00–14** | **Complete end-to-end phantom dependency detection pipeline, proof ledger, and benchmark suite** |

---

## 3. Detailed Commit Log by Contributor

### 3.1 Aditya Kumar Sharma ([@adishxm](https://github.com/adishxm) — 16 Commits)

| Commit Hash | Phase / Scope | Commit Message & Deliverable |
|---|---|---|
| `bccd363` | Phase 00 | `first commit` — Repository initialization and base project structure |
| `52c3d65` | Phase 00 | `feat: phase-00 complete + full phantomdeps CLI implementation` — Initial CLI baseline and intake audit |
| `b311fb9` | Phase 00 | `docs: rewrite README with actual product — remove contributor/draft sections` |
| `9af5c2d` | Phase 01 | `docs: phase-01 complete — product contract, personas, stories, AC, requirements map` |
| `43f190a` | Phase 01 | `docs: update README with verified terminal output from real run` |
| `31d90b1` | Phase 02 | `docs: phase-02 complete — architecture, data model, UX, threat model, delivery plan` |
| `c6fd683` | Phase 03 | `phase-03: build MVP — CI pipeline, 35/35 tests, BLOCK/WARN/ALLOW confirmed` |
| `d7636a1` | Phase 02/03 | `docs: polish README — badges, demo scenarios table, full phase roadmap` |
| `5bade2b` | Planning | `docs: add Phase 09-14 implementation plans and updated roadmap index` |
| `3b35e88` | Planning | `docs: sync research-aligned remediation roadmaps, audit, and capability ledger` |
| `54083c9` | Planning | `chore: remove duplicate phase-XX-<name>.md files in favor of phase-XX-implementation.md` |
| `7368d61` | Architecture | `docs: add Mermaid visual explainer diagrams and update project structure in README` (Diagrams 2.1–2.4) |
| `e8f764d` | Architecture | `docs: update Implementation Phases table and report links in README to cover Phases 00-14` |
| `4b12c66` | Architecture | `docs: professionally redesign README with centered hero section and 4 Mermaid flowcharts` |
| `3f94d77` | Architecture | `docs: fix Mermaid diagram class syntax for 100% GitHub rendering compatibility` |
| `9296c9f` | Architecture | `docs: expand .docs tree architecture with tests, research and demo details` |

---

### 3.2 Narayan Kumar Jha ([narayan-nkj (Narayan Kumar Jha)](https://github.com/narayan-nkj) — 63 Commits)

| Commit Hash | Phase / Scope | Commit Message & Deliverable |
|---|---|---|
| `987a6b9` | Phase 04 | `docs: add Narayan Kumar Jha to contributors` |
| `6dc7846` | Phase 04 | `phase-04: local validation PASSED — 35/35 tests, AC-01-09 verified, NDJSON log fix (appendFileSync)` |
| `c31a950` | Phase 08 | `phase-08: submission package PASSED — secret scan clean, 59-item checklist, stop gate enforced` |
| `76ecbff` | Phase 08 | `chore: update phase-step-traceability matrix — all 51 steps COMPLETE (phases 00-08)` |
| `1c24e00` | Phase 08 | `chore: update all stale docs — DRAFT/PENDING → COMPLETE/PASSED with real commits and team names` |
| `f65f921` | Phase 08 | `docs: add Utkarsh Yadav to README contributors` |
| `520a6b9` | Phase 08 | `docs: add Utkarsh Yadav to CONTRIBUTING contributors` |
| `bbf6b49` | Phase 05 | `docs: add Phase 05 step reports (5.1-5.6)` |
| `b71df20` | Phase 06 | `docs: add Phase 06 step reports (6.1-6.6)` |
| `e9d2e41` | Phase 07 | `docs: add Phase 07 step reports (7.1-7.6)` |
| `8cd565e` | Phase 08 | `docs: link Phase 04-08 reports in README` |
| `6fe3555` | Phase 09 | `docs: phase-09 — truth reset, contract freeze, and baseline PASSED` |
| `f8b0394` | Phase 12 | `feat(phase-12.1): add five-dimensional EvidenceProvenance types to types.ts` |
| `fcb8744` | Phase 12 | `feat(phase-12.1): populate EvidenceProvenance in registry and fixture adapters` |
| `3e86745` | Phase 12 | `feat(phase-12.1): pass integrity status through artifact inspection pipeline` |
| `0b97324` | Phase 12 | `feat(phase-12.2): rename noProvenance to noArtifactIntegrity with precise message` |
| `baea046` | Phase 12 | `feat(phase-12.3/12.5): add verifyAuditLog, appendAgentOverrideRecord, wrapText` |
| `3b79d7b` | Phase 12/13 | `feat(phase-12.3/13.4): add audit-log verify command and verify alias` |
| `4b2654d` | Phase 13 | `feat(phase-13.1): add claimContextKind to PolicyInput; emit l2.context_missing` |
| `26b5b33` | Phase 13 | `feat(phase-13.1/13.7): add --diff, --file, --json flags to CheckOptions/parseCheckArgs` |
| `f0895e4` | Phase 13 | `feat(phase-13.2): add diff-parser for import extraction from diffs and files` |
| `8451fb0` | Phase 13 | `feat(phase-13.1/13.3/13.7): implement claim-context contract in gate orchestrator` |
| `316b245` | Phase 13 | `feat(phase-13.5/13.7): document demo exit semantics and pass terminal width` |
| `11861c7` | Phase 12 | `fix(tests): add provenance field to PackageEvidence fixtures in existing tests` |
| `489e8f3` | Phase 12 | `test(phase-12): add audit-log tamper tests, override record tests, provenance tests` |
| `02722b8` | Phase 13 | `test(phase-13): add claim-context, diff parser, json output, width-wrapping tests` |
| `1050578` | Phase 12/13 | `docs(phase-12/13): update README with new commands, provenance, tamper-evidence` |
| `911113f` | Phase 12 | `docs: add phase-12 report — evidence integrity and provenance semantics PASSED` |
| `06a8338` | Phase 13 | `docs: add phase-13 report — claim context, repair workflow, command semantics PASSED` |
| `0397967` | Phase 12/13 | `docs: mark phase-12 and phase-13 implementation plans COMPLETE` |
| `60ce09f` | Phase 13 | `chore: update .phantomdeps/decisions.ndjson (session demo records)` |
| `741bb21` | Traceability | `docs(traceability): update phase-step-traceability.md with Phase 12, 13, and 14 steps` |
| `bde38b1` | Roadmap | `docs(roadmap): update 00-roadmap-index.md and roadmap-index.md to mark Phases 09-13 complete` |
| `210d815` | Phase 09 | `docs(phase-09): add individual step reports 9.1 through 9.5` |
| `176cc8e` | Phase 10 | `docs(phase-10): add individual step reports 10.1 through 10.7` |
| `847c4b7` | Phase 11 | `docs(phase-11): add individual step reports 11.1 through 11.7` |
| `bff6e46` | Phase 12 | `docs(phase-12): add individual step reports 12.1 through 12.6` |
| `7721a5a` | Phase 13 | `docs(phase-13): add individual step reports 13.1 through 13.7` |
| `0e23101` | Phase 14 | `feat(phase-14.7): add B0/B1/B2 evaluation corpus and runner` |
| `d8d48c5` | Phase 14 | `feat(phase-14.7): add raw evaluation results (TEAM MEASUREMENT)` |
| `5b496d9` | Phase 14 | `docs(phase-14): add step reports 14.1, 14.2, 14.3` |
| `32d9271` | Phase 14 | `docs(phase-14): add step 14.4 independent cross-phase review` |
| `cf09f93` | Phase 14 | `docs(phase-14): add step reports 14.5 (Bob/wrapper) and 14.6 (roster)` |
| `c460684` | Phase 14 | `docs(phase-14): add step 14.7 evaluation corpus and measurement results` |
| `abc9af9` | Phase 14 | `docs(phase-14): add step 14.8 final tag and human stop gate` |
| `0d06f1b` | Phase 14 | `docs(phase-14): update release checklist — all technical gates PASSED` |
| `0ce1373` | Phase 14 | `docs(phase-14): update decision log, risk log, test index, research ledger` |
| `27660e3` | Phase 14 | `docs(phase-14): mark roadmap COMPLETE and phase-14-implementation COMPLETE` |
| `f829694` | Phase 14 | `docs: add phase-14 report — independent release gate PASSED, stop gate enforced` |
| `e5da497` | Phase 14 | `docs(phase-14): update executive summary to FINAL state; update decisions log` |
| `e7d3c2c` | Phase 14 | `docs: finalize phase 14 and remove branding references` |

---

### 3.3 Utkarsh Yadav ([@utkarsh-2207](https://github.com/utkarsh-2207) — 4 Commits)

| Commit Hash | Phase / Scope | Commit Message & Deliverable |
|---|---|---|
| `3fa529c` | Phase 05 | `chore: add Utkarsh Yadav as contributor in package.json` |
| `61569ea` | Phase 05 | `phase-05: advanced validation PASSED — 103/103 tests, 2 parser fixes, 0 vulns, perf 1168ms avg` |
| `7a493ac` | Phase 06 | `phase-06: outsider review PASSED — hook TS syntax fixed, settings.json added, 103/103 tests` |
| `8c9bc88` | Phase 07 | `phase-07: finalization PASSED — RC tag v0.1.0-rc.1, demo script, judge Q&A, rehearsal 7/7` |

---

### 3.4 Roshan Singh ([@rs3260821-dotcom](https://github.com/rs3260821-dotcom) — 3 Commits)

| Commit Hash | Phase / Scope | Commit Message & Deliverable |
|---|---|---|
| `c2821b7` | Team Alignment | `docs: add Roshan Singh as Contributor 4 across all files` |
| `d3916a0` | Phase 10 | `feat: phase-10 — fail-closed Bob hook enforcement PASSED`<br>• Implemented `parseHookCommand()` argv tokenizer and `classifySpec()` in `src/parser.ts`<br>• Rewrote `.bob/hooks/PreToolUse.mjs` with multi-package and option-first support<br>• Added 28 subprocess test cases in `tests/hook-subprocess.test.ts` (131/131 passing) |
| `edd19c2` | Phase 11 | `feat: phase-11 — live exact-version and static API verification PASSED`<br>• Added typed registry outcomes in `src/types.ts` and `src/adapters/registry.ts`<br>• Built pure-Node tarball downloader & sha512 integrity verifier in `src/adapters/artifact.ts`<br>• Implemented static AST claims resolver in `src/checker/static-claim.ts`<br>• Added fixture capture CLI (`src/capture-fixture.ts`) and 24 tests in `tests/artifact-registry.test.ts` (155/155 passing) |

---

## 4. Ownership & Collaboration Model

### 4.1 Primary Ownership & Backup Rules

```
┌────────────────────────────────────────────────────────┐
│  Aditya Kumar Sharma (Contributor 1)                  │
│  Product Lead & System Architect                       │
│  Owns: PRD, Architecture, Visual Explainers, Governance│
└───────────────────────────┬────────────────────────────┘
                            │ Backed up by Contributor 3
┌───────────────────────────▼────────────────────────────┐
│  Narayan Kumar Jha (Contributor 2)                    │
│  Core Implementation & Test Automation Lead            │
│  Owns: Core Gate, Provenance, Diffs, Benchmarks        │
└───────────────────────────┬────────────────────────────┘
                            │ Backed up by Contributor 3
┌───────────────────────────▼────────────────────────────┐
│  Utkarsh Yadav (Contributor 3)                         │
│  Validation, Security & IBM Bob Workflow Lead          │
│  Owns: Test Suites, Threat Model, RC Gate              │
│  Primary Cross-Stream Backup Owner                     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  Roshan Singh (Contributor 4)                          │
│  Security Enforcement & Live Tarball AST Engineer      │
│  Owns: Fail-Closed Hook, Tarball AST, Live Verification│
└────────────────────────────────────────────────────────┘
```

1. **Contributor 3 (Utkarsh Yadav)** acts as the designated cross-functional backup for both Contributor 1 and Contributor 2 to ensure continuous operational tempo.
2. **Contributor 4 (Roshan Singh)** owns deep security enforcement in tool invocations and static tarball inspection, backed up by Contributor 3 for release gate evidence.
3. Every handoff must include: branch name, commit hash, modified files, exact test commands, and rollback verification points.

---

## 5. Development Workflow & Contribution Rules

### 5.1 Branching Strategy
- `main` is the primary integration branch.
- Feature work branches should be named: `feat/<phase>-<topic>` or `fix/<phase>-<topic>`.

### 5.2 Commit Message Standards
- Follow Conventional Commits format with explicit phase references:
  - `feat(phase-XX): <description>`
  - `test(phase-XX): <description>`
  - `fix(phase-XX): <description>`
  - `docs(phase-XX): <description>`
- State evidence paths, test counts, and exit codes in commit bodies.

### 5.3 Mandatory Quality Gates
Every contribution must pass before merging or marking a phase complete:
```bash
# 1. Type check and lint (must return 0 errors)
npm run lint

# 2. Comprehensive unit, integration, and security test suite
npm test
```

### 5.4 Stop Gate & Multi-Agent Review Protocol
- No contributor or agent may mark a phase `PASSED` unilaterally without independent reviewer verification.
- Tamper-evident audit logs (`.phantomdeps/decisions.ndjson`) must verify cleanly:
  ```bash
  npx tsx src/cli.ts audit-log verify
  ```

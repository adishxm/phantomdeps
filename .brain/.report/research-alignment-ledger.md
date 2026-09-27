<!-- Status: UPDATED | Last-updated commit: phase-14 -->
# Research Alignment Ledger — Phase 14 Final State

**Status:** `UPDATED — Phases 09–14 complete`
**Sources:** `IBM_Bob2_Phantomdeps_Complete_Research.md`, `phantomdepsProductAccuracyAudit.md`, `phantomdepsImplementation-PlanAudit.md`.

| Capability/claim | Truthful status at Phase 14 | Evidence phase | Evidence artifact |
|---|---|---|---|
| npm-first fixture demo | `CONFIRMED` — TEAM MEASUREMENT | 14 | Clean clone, networking disabled, all 3 scenarios exit 0 |
| BLOCK/WARN/ALLOW/UNVERIFIED policy | `CONFIRMED` — all 4 verdicts tested | 10, 14 | 28 subprocess + 205 unit tests |
| Exact package/version identity | `CONFIRMED` — typed registry outcomes | 11, 14 | RegistryFailure taxonomy, VERSION_NOT_FOUND ≠ PACKAGE_NOT_FOUND |
| Exact artifact/static API inspection | `CONFIRMED` — live tarball path implemented | 11 | Tarball download, sha512 verify, exports_field/declarations inspection; no code execution |
| Agent-generated import extraction | `CONFIRMED` — diff/file parser implemented | 13 | extractAddedImports() — +lines only; tested at 29 claim-context tests |
| IBM Bob PreToolUse blocking | `CORROBORATED` — documented-payload tested | 10, 14 | 28 subprocess tests; live session export not available (FR-14-02) |
| Fail-closed unknown/unsupported installs | `CONFIRMED` | 10 | UNVERIFIED→exit 2 on all unrecognized forms |
| Multi-package/option-first parsing | `CONFIRMED` | 10 | Subprocess matrix tests |
| Patch-only human-approved remediation | `CONFIRMED` | 13 | No auto-apply path; card shows "Human approval required" |
| Hash-chain verification | `CONFIRMED` | 12 | verifyAuditLog() — schema/hash/chain/ordering/redaction; tamper tests |
| Artifact integrity vs provenance | `CONFIRMED` | 12 | EvidenceProvenance five dimensions; messaging test confirms no "no provenance" |
| B0/B1/B2/B3 evaluation | `TEAM MEASUREMENT` — B0/B1/B2 done; B3 documented-payload only | 14 | 12-case corpus; 100% recall; 0% false-block; eval/results.json |
| PyPI parity | `UNSUPPORTED` for v1 | — | npm-first only |
| Broad reputation/slopsquatting analyzer | `UNSUPPORTED` / out of core scope | — | Not in v1 |
| Automatic install/delegation | `UNSUPPORTED` in v1 | 09, 13 | README and CLI docs say verification-only |

## Research decision gates — Phase 14 final

| Gate | Status | Evidence |
|---|---|---|
| Technical validity | `PASSED` | TC-001 (is-odd@3.0.1/isOddBatch) — version-pinned, static inspection only, no code execution |
| Workflow validity | `PASSED with limitation` | 28 subprocess hook tests; live Bob session export not available (FR-14-02, accepted) |
| Measurement validity | `PASSED` | eval/corpus.json v1.0.0; eval/run-evaluation.ts; eval/results.json: 12/12, recall=100%, false-block=0%, abstention=33% |
| Demo validity | `PASSED` | Steps 14.1: all 3 fixture scenarios exit 0 from HEAD with --offline --fixture; networking disabled |

## Evidence-label rule (enforced)

Claims become `TEAM MEASUREMENT` only when produced by a committed runner (eval/run-evaluation.ts) at a recorded commit (phase-14 HEAD `7721a5a`) with environment (darwin 27 / Node v26.8.1) and raw output (eval/results.json) all recorded. Runtime claims in this ledger were verified at Phase 14 execution time.

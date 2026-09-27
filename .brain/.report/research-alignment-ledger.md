<!-- Status: BASELINE | Last-updated commit: PENDING -->
# Research Alignment Ledger — Active Remediation Baseline

**Status:** `BASELINE — Phases 09–14 not executed`
**Sources:** `IBM_Bob2_Phantomdeps_Complete_Research.md`, `phantomdepsProductAccuracyAudit.md`, `phantomdepsImplementation-PlanAudit.md`.

| Capability/claim | Current truthful status | Required phase | Evidence needed |
|---|---|---|---|
| npm-first fixture demo | `implemented` | 14 | Clean clone, networking disabled, raw command output |
| BLOCK/WARN/ALLOW/UNVERIFIED policy | `implemented` in core; hook coverage incomplete | 10 | Unit + hook subprocess tests |
| Exact package/version identity | `implemented` for metadata; version error taxonomy incomplete | 11 | Typed adapter outcomes and tests |
| Exact artifact/static API inspection | `fixture-only` | 11 | Safe tarball inspection or explicit de-scope |
| Agent-generated import extraction | `planned` | 13 | Diff/file/symbol contract and tests |
| IBM Bob PreToolUse blocking | `fixture-only` / `ASSUMPTION` for full workflow | 10, 14 | Payload test and real session export or wrapper fallback |
| Fail-closed unknown/unsupported installs | `planned` | 10 | Subprocess matrix, no silent exit 0 |
| Multi-package/option-first parsing | `planned` | 10 | Parser and hook tests |
| Patch-only human-approved remediation | `planned` | 13 | Candidate validation and approval evidence |
| Hash-chain verification | `planned` | 12 | `audit-log verify` and tamper suite |
| Artifact integrity vs provenance | `planned` | 12 | Separate fields and message tests |
| B0/B1/B2/B3 evaluation | `planned` | 09, 14 | Corpus, runner, raw results, metrics |
| PyPI parity | `unsupported` for v1 | Post-hackathon | No first-party popularity claim |
| Broad reputation/slopsquatting analyzer | `planned`/out of core scope | Post-hackathon | Capability-specific dataset and calibration |
| Automatic install/delegation | `unsupported` in v1 | 09, 13 | README says verification-only |

## Research decision gates

- **Technical validity:** `NOT_STARTED` — must show one version-pinned wrong-symbol case without package execution.
- **Workflow validity:** `NOT_STARTED` — must test Bob `PreToolUse` or use a labelled wrapper fallback.
- **Measurement validity:** `NOT_STARTED` — must publish B0/B2/B3 and false-block or abstention results.
- **Demo validity:** `BASELINE PASS` for existing fixture path, but must be re-run from a clean reviewed commit.

## Evidence-label rule

Do not convert the current baseline into `CONFIRMED` merely by repeating it in Markdown. Runtime claims become `TEAM MEASUREMENT` only after a committed runner produces raw output and a phase report records the environment, commit, corpus, and reviewer.

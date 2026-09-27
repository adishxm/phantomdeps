# Final Readiness Checklist — IBM Bob Lane

Generated: 2026-09-27
PhantomDeps commit: `0b6a319`

## Core Requirements

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | PhantomDeps baseline tests pass | ✅ PASS | 176/176 (Phase 0, Phase 8) |
| 2 | TaskForge is a real working project | ✅ PASS | 26/26 tests, build, CLI (Phase 3) |
| 3 | Invalid AI dependency claim intercepted before install | ✅ PASS | Hook exit 2, no is-odd installed (Phase 4) |
| 4 | Invalid symbol identified with evidence | ✅ PASS | `l2.symbol_missing`, fixture citation (Phase 4) |
| 5 | Block recorded with hash-chain evidence | ✅ PASS | `decisions.ndjson`, `audit-log verify` (Phase 4, 6) |
| 6 | Human-approved correction → build + tests pass | ✅ PASS | lodash.merge used, 26/26 pass (Phase 5) |
| 7 | Verified package claim → ALLOW | ✅ PASS | lodash@4.17.21/merge, exit 0 (Phase 6) |
| 8 | Risky package → WARN without unsafe install | ✅ PASS | risky-new-pkg exit 0 advisory (Phase 6) |
| 9 | Unsupported spec fails closed as UNVERIFIED | ✅ PASS | URL spec exit 2 (Phase 6) |
| 10 | Both lanes produce equivalent security outcomes | ✅ PASS | Parity table in Phase 7 |
| 11 | Outsider can reproduce from clean checkout | ✅ PASS | Documented in Phase 9 |
| 12 | Report separates live/offline/native/wrapper/untested | ✅ PASS | Executive summary §10 |

## Known Limitations (do not falsify)

| # | Limitation |
|---|---|
| L1 | CLI exits 1 (not 3) for UNVERIFIED unsupported-spec direct path |
| L2 | Default vs named export shape not enforced at symbol level |
| L3 | No Bob IDE Tasks-panel screenshot (all tests are subprocess invocations of hook) |
| L4 | Live registry verification limited to prior run's `lodash@latest` record in `decisions.ndjson` |

## Readiness Decision

**READY FOR DEMO** — all core requirements met; all limitations documented and disclosed.
No release-blocking issues.

# Risk and Blocker Log — IBM Bob Lane

Generated: 2026-09-27

## Open Risks

| ID | Description | Severity | Status |
|---|---|---|---|
| R1 | CLI exits 1 (not 3) for UNVERIFIED direct path | Minor | Open — hook path unaffected, documented |
| R2 | Default vs named export shape not distinguished at symbol level | Medium | Open — L2 limitation, documented |
| R3 | Hook requires `tsx` runtime (not standalone) | Low | Open — consistent with test harness design |
| R4 | No Bob IDE Tasks-panel screenshot from a live session | Medium | Disclosed — all hook tests are subprocess invocations |
| R5 | Live registry test coverage limited | Low | Live `lodash@latest` ALLOW was observed in prior decisions.ndjson |

## Resolved Issues

| ID | Description | Resolution |
|---|---|---|
| F1 | Fixture naming mismatch: hook looked for `risky-new-pkg-demo`, committed file was `risky-new-pkg-warn-demo` | Fixed: added `fixtures/risky-new-pkg-demo.json` alias |
| F2 | Mixed-package aggregation untested in prior run | Fixed: tested in Phase 6.4, BLOCK wins confirmed |

## Blocked Items
None — validation completed without blocking issues.

# PhantomDeps Baseline Test Report — IBM Bob Lane

Generated: 2026-09-27
Commit: `0b6a319`

## Test suite results (pre-mutation baseline)

```
npm test

Test Suites: 6 passed, 6 total
Tests:       176 passed, 176 total
Snapshots:   0 total
Time:        23.363 s
```

## Suites run

| Suite | Tests | Status |
|---|---|---|
| `tests/audit-log.test.ts` | — | PASS |
| `tests/claim-context.test.ts` | — | PASS |
| `tests/artifact-registry.test.ts` | — | PASS |
| `tests/edge-cases.test.ts` | — | PASS |
| `tests/policy.test.ts` | — | PASS |
| `tests/hook-subprocess.test.ts` | — | PASS |

## Offline scenarios

| Scenario | Command | Verdict | Exit |
|---|---|---|---|
| block | `demo --fixture --offline --scenario block` | BLOCK | 0 |
| allow | `demo --fixture --offline --scenario allow` | ALLOW | 0 |
| warn | `demo --fixture --offline --scenario warn` | WARN | 0 |

## Post-integration re-run (Phase 8)

```
npm test → 176/176 PASS
Exit: 0
```

No regressions from fixture alias addition or new decisions.

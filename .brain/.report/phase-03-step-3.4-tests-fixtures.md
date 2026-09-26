<!-- Status: COMPLETE | Phase: 03 | Step: 3.4 -->
# Step 3.4 — Unit Tests and Fixtures

**Phase:** 03  
**Step:** 3.4 — Add unit tests and fixtures while implementing each slice  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session

---

## Test inventory (all passing as of this step)

| File | Tests | Coverage |
|---|---|---|
| `tests/parser.test.ts` | 8 | `parseIntent`, `parseCheckArgs` — valid forms, scoped packages, shell injection, URL rejection |
| `tests/static-claim.test.ts` | 5 | `resolveClaimsFromFixture` — SYMBOL_MISSING, SYMBOL_FOUND, mixed, empty, citations |
| `tests/policy.test.ts` | 6 | `applyPolicy` — BLOCK/ALLOW/NOT_FOUND/UNAVAILABLE/deprecated/hash chain |
| `tests/fixture-loader.test.ts` | 2 | `loadFixture` — happy path, nonexistent fixture |
| `tests/gate-integration.test.ts` | 14 | End-to-end BLOCK + ALLOW + WARN — verdict, findings, fixture parity, hash chain |

**Total: 5 suites, 35 tests, 0 failures**  
**Run:** `npm test` — confirmed 35/35 pass this session.

## Fixture inventory

| File | Package | Claimed symbol | Expected verdict |
|---|---|---|---|
| `fixtures/is-odd-demo.json` | `is-odd@3.0.1` | `isOddBatch` | `BLOCK` |
| `fixtures/lodash-allow-demo.json` | `lodash@4.17.21` | `merge` | `ALLOW` |
| `fixtures/risky-new-pkg-warn-demo.json` | `risky-new-pkg@0.0.1` | `doSomething` | `WARN` |

Each fixture contains: `id`, `packageName`, `resolvedVersion`, `integrity`, `capturedAt`, `hasInstallScript`, `exportedSymbols`, `exportsSource`, `claimedSymbols`, `expectedVerdict`, `scenario`.

## Test gate contract

Every fixture has an `expectedVerdict` field. The gate integration test asserts `decision.action === fixture.expectedVerdict` for each fixture — this ensures fixture documentation and implementation stay in sync.

## Step result
`COMPLETE` — 35 tests across 5 suites; 3 fixtures covering BLOCK/ALLOW/WARN paths; fixture-parity contract enforced by integration tests.

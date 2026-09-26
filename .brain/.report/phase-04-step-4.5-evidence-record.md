<!-- Status: COMPLETE | Phase: 04 | Step: 4.5 -->
# Step 4.5 — Exact Commands, Environment, Commit, Duration, Output

**Phase:** 04  
**Step:** 4.5 — Record exact commands, environment, commit, duration, output, failures, and fixes  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — Phase 04 session

---

## Environment

| Item | Value |
|---|---|
| Platform | Windows 10 (10.0.26200), x64 |
| Shell | PowerShell |
| Node.js | v24.21.0 |
| npm | 11.19.0 |
| Commit at session start | `987a6b9fe04ef84be47d61fe76dae546ff90d0f2` |
| Branch | `main` |

## Execution log

### Step 4.1 — Lint + typecheck

| Command | Duration | Result |
|---|---|---|
| `npm run lint` (tsc --noEmit) | ~2 s | PASS — 0 errors |
| `npm test` | ~3.5 s | PASS — 35/35 |

### Step 4.2 — Integration (verbose jest)

| Command | Duration | Result |
|---|---|---|
| `jest --forceExit --verbose` | ~3.6 s | PASS — 35/35, all suites named |

### Step 4.3 — E2E demos

| Command | Duration | Verdict | Exit |
|---|---|---|---|
| `demo --fixture --offline --scenario block` | ~1.5 s | BLOCK | 0 |
| `demo --fixture --offline --scenario allow` | ~1.5 s | ALLOW | 0 |
| `demo --fixture --offline --scenario warn` | ~1.5 s | WARN | 0 |
| `check is-odd@3.0.1 --symbols isOddBatch --offline --fixture` | ~1.5 s | BLOCK | 2 |

### Step 4.4 — AC sweep

| Command | Result |
|---|---|
| PowerShell AC sweep script | AC-01–09: PASS; AC-10: DEFERRED |

## Failures found and fixed

| ID | Component | Failure | Fix | Tests after fix |
|---|---|---|---|---|
| `F-04-01` | `src/evidence/writer.ts` `appendDecisionLog` | `createWriteStream` writes were silently dropped on process exit — `.phantomdeps/decisions.ndjson` never created | Changed to `appendFileSync` — synchronous, guaranteed flush | 35/35 PASS |

## Step result

`COMPLETE` — all evidence captured. One bug found and fixed. No other failures.

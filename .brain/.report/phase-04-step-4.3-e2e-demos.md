<!-- Status: COMPLETE | Phase: 04 | Step: 4.3 -->
# Step 4.3 — End-to-End Demo Scenarios

**Phase:** 04  
**Step:** 4.3 — Run end-to-end happy-path and critical failure-path tests  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — Phase 04 session  
**Commit:** `987a6b9fe04ef84be47d61fe76dae546ff90d0f2`  
**Environment:** Windows 10 (10.0.26200), Node.js v24.21.0, npm 11.19.0

---

## Commands run

```bash
npx tsx src/cli.ts demo --fixture --offline --scenario block
npx tsx src/cli.ts demo --fixture --offline --scenario allow
npx tsx src/cli.ts demo --fixture --offline --scenario warn
npx tsx src/cli.ts check is-odd@3.0.1 --symbols isOddBatch --offline --fixture
```

## Results

### Scenario: BLOCK (is-odd@3.0.1, isOddBatch)

```
phantomdeps gate — BLOCK
  Package  : is-odd@3.0.1 → 3.0.1
  Decision : a6f78181-...
Findings:
  ✖ [l2.symbol_missing]
    BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1.
[REMEDIATION]
  - import { isOddBatch } from 'is-odd'
  + import isOdd from 'is-odd'
✔ Demo completed. Verdict: BLOCK (expected: BLOCK)
```

**Exit code:** `0` (demo runner exits 0 on match; `check` subcommand exits `2`)

### Scenario: ALLOW (lodash@4.17.21, merge)

```
phantomdeps gate — ALLOW
  Package  : lodash@4.17.21 → 4.17.21
✔ Demo completed. Verdict: ALLOW (expected: ALLOW)
```

**Exit code:** `0`

### Scenario: WARN (risky-new-pkg@0.0.1, install scripts)

```
phantomdeps gate — WARN
  Package  : risky-new-pkg@0.0.1 → 0.0.1
Findings:
  ⚠ [l3.risk_signal]
    WARN: Package 'risky-new-pkg@0.0.1' has lifecycle install scripts.
✔ Demo completed. Verdict: WARN (expected: WARN)
```

**Exit code:** `0`

### `check` subcommand (exit code verification)

```
npx tsx src/cli.ts check is-odd@3.0.1 --symbols isOddBatch --offline --fixture
→ EXIT:2
```

**Exit code:** `2` (BLOCK) — confirmed correct per spec.

## Bug found and fixed

`appendDecisionLog` previously used `createWriteStream` (async) which caused the NDJSON log to be silently dropped on process exit.  
**Fix:** Changed to `appendFileSync` in [`src/evidence/writer.ts`](../../src/evidence/writer.ts).  
After fix: `.phantomdeps/decisions.ndjson` is created and contains `decisionId`, `recordHash`, `previousHash` — verified by reading the file after the demo run.

## Step result

`COMPLETE` — all three E2E scenarios pass with correct verdicts. Exit codes confirmed. NDJSON log bug found and fixed.

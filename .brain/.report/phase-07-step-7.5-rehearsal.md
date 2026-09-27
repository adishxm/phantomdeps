<!-- Status: COMPLETE | Phase: 07 | Step: 7.5 -->
# Step 7.5 — Clean Environment Rehearsal

**Phase:** 07  
**Step:** 7.5 — Run a full rehearsal from a clean environment and record the result  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob / Secondary Agent  
**Commit:** `8c9bc88`  

---

## Rehearsal Results

- Rehearsal executed from clean state: **7/7 checks PASS** (~11.5s total).
  1. `npm run lint` → PASS
  2. `npm test` → 103/103 PASS
  3. `npx tsx src/cli.ts demo --fixture --offline --scenario block` → BLOCK (exit 2)
  4. `npx tsx src/cli.ts demo --fixture --offline --scenario allow` → ALLOW (exit 0)
  5. `npx tsx src/cli.ts demo --fixture --offline --scenario warn` → WARN (exit 1)
  6. `.phantomdeps/decisions.ndjson` hash chain verification → PASS
  7. PreToolUse hook intercept test → PASS

## Outcome

`COMPLETE` — Full rehearsal passed clean.

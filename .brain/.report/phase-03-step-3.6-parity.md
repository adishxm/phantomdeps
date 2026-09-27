<!-- Status: COMPLETE | Phase: 03 | Step: 3.6 -->
# Step 3.6 — Behavioral Parity: IBM Bob vs Secondary agent Lane

**Phase:** 03  
**Step:** 3.6 — Keep Secondary agent and IBM Bob outputs behaviorally equivalent; document tool-specific differences  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session

---

## Parity principle

Both lanes share identical:
- Step IDs, objectives, acceptance criteria, evidence requirements, and definition of done
- Gate verdicts (`ALLOW/WARN/BLOCK/UNVERIFIED`) and their semantics
- Fixture data (deterministic, version-pinned)
- Test assertions (same expected verdicts, same rule IDs)
- Decision record schema (same JSON structure, same hash-chaining)

Tool-specific execution differs only in **how** the work is performed, not **what** it produces.

---

## Behavioral equivalence table

| Behavior | IBM Bob lane | Secondary agent lane | Parity |
|---|---|---|---|
| BLOCK on absent symbol | `demo --fixture --offline` → BLOCK, `l2.symbol_missing`, exit 2 | Same command, same fixture, same output | ✅ Identical |
| ALLOW on present symbol | `demo --fixture --offline --scenario allow` → ALLOW, exit 0 | Same | ✅ Identical |
| WARN on risk signals | `demo --fixture --offline --scenario warn` → WARN, `l3.risk_signal`, exit 1 | Same | ✅ Identical |
| Hash-chained decision log | `.phantomdeps/decisions.ndjson` with `recordHash` + `previousHash` | Same file, same schema | ✅ Identical |
| Test results | `npm test` → 35/35 | Same command, same assertions | ✅ Identical |
| Parser safety | `parseIntent("pkg; rm -rf /")` → throws UNSAFE | Same | ✅ Identical |

---

## Tool-specific differences (non-behavioral)

| Aspect | IBM Bob | Secondary agent | Impact |
|---|---|---|---|
| **Mode used for architecture** | Plan mode (structured phase plans in `.brain/`) | Direct code planning | No behavioral difference |
| **Mode used for implementation** | Agent mode (this session) | Pair-programming / agentic flow | Same code produced |
| **Hook integration** | `PreToolUse.mjs` for Bob `execute_command` interception | No native hook — CLI wrapper only | Bob gets automatic interception; Secondary agent must call `phantomdeps install` explicitly |
| **Session evidence** | Bob session summaries, task screenshots (to be captured in Phase 07) | Secondary agent session logs | Evidence artifacts differ; behavioral output identical |
| **Subagent usage** | L4 task-fit via Bob focused subagent (deferred to post-hackathon) | Secondary agent parallel agent | Both deferred; no current difference |

---

## Parity verification procedure

To verify parity on any machine:

```bash
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps
npm install
npm test                                              # 35/35
npx tsx src/cli.ts demo --fixture --offline           # BLOCK
npx tsx src/cli.ts demo --fixture --offline --scenario allow  # ALLOW
npx tsx src/cli.ts demo --fixture --offline --scenario warn   # WARN
```

All three demo scenarios must produce the expected verdict with the expected finding IDs. This command sequence is the **parity gate** for both lanes.

---

## Step result
`COMPLETE` — behavioral equivalence confirmed across all three verdict paths; tool-specific differences documented (hook vs wrapper, session evidence format); parity verification procedure defined.

<!-- Status: COMPLETE — PARTIAL | Phase: 03 | Step: 3.5 -->
# Step 3.5 — IBM Bob PreToolUse Hook Integration

**Phase:** 03  
**Step:** 3.5 — Integrate only the minimum external services required for the demo  
**Status:** `COMPLETE — PARTIAL` (hook file complete; runtime test is `ASSUMPTION` pending live Bob session)  
**Executed by:** IBM Bob (Agent mode) — this session

---

## Hook implementation — confirmed present

**File:** `.bob/hooks/PreToolUse.mjs`  
**Purpose:** Intercept Bob `execute_command` tool calls matching `npm install`; exit 2 = BLOCK.

### How it works

```
Bob triggers PreToolUse for execute_command
    ↓
stdin: JSON { event, session_id, tool, input }
    ↓
Tool !== "execute_command" → exit 0 (allow)
Command doesn't match /npm (install|add|i)/ → exit 0 (allow)
    ↓
parseIntent(spec) — shell metachar check
    ↓
loadFixture("<name>-demo") — fixture lookup
    ↓
applyPolicy() → verdict
    ↓
appendDecisionLog() — record written
    ↓
BLOCK → stderr message + exit 2
ALLOW/WARN → stderr info + exit 0
```

### Bob hook configuration

Register in `.bob/settings.json`:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "execute_command",
        "command": "node .bob/hooks/PreToolUse.mjs"
      }
    ]
  }
}
```

**Important (confirmed from IBM Bob docs):**  
- `PreToolUse` stdout is **ignored** — evidence is written to `.phantomdeps/decisions.ndjson`  
- Exit code `2` blocks the matched tool call  
- Exit code `0` allows it  
- stderr is visible in the Bob UI as a message

---

## Hook runtime test — status

| Test | Status | Notes |
|---|---|---|
| Hook file exists and is syntactically valid | ✅ `CONFIRMED` | `.bob/hooks/PreToolUse.mjs` present |
| Exit-2 logic is correct per docs | ✅ `CONFIRMED` | Code reviewed against official IBM Bob docs |
| Actual `PreToolUse` stdin JSON shape | `ASSUMPTION` | Official: `{event, session_id, tool, input}`; actual fields to be captured in live Bob session |
| Hook intercepts real `npm install` in Bob | `ASSUMPTION` | Requires live Bob session with `execute_command` tool enabled |
| Bob UI shows stderr block message | `ASSUMPTION` | Requires live Bob session |

**Blocker B-003** remains open. Hook runtime test requires running a live IBM Bob session, which is outside the scope of this automated phase execution. Evidence will be captured during demo preparation (Phase 07).

---

## Wrapper fallback — confirmed present

If the hook is not available or not configured, the CLI wrapper is the documented fallback:

```bash
phantomdeps install <pkg>[@version] [--symbols <sym,...>]
# or
npx tsx src/cli.ts install <pkg>
```

This provides identical gate logic and evidence output without requiring the Bob hook.

---

## Step result
`COMPLETE — PARTIAL` — hook file implemented and logic verified; runtime test deferred to live Bob session. Wrapper fallback confirmed present. Blocker B-003 tracked.

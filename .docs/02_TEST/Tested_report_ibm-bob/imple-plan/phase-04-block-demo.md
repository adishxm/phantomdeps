# Phase 4 — Real-Time BLOCK During Agent Building

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Demonstrate that the PhantomDeps `PreToolUse` hook blocks an invalid AI-generated dependency claim during TaskForge development.

## 4.1 Enhancement request given to Bob
> "Enhance TaskForge's report module with odd-task filtering. Add a function that uses `isOddBatch` from `is-odd` to flag tasks with numeric IDs. Install `is-odd` first."

## 4.2 Agent-generated invalid import/claim
IBM Bob Agent generates:
```typescript
// Stage B — intentionally invalid code (NOT actually written to the project)
import { isOddBatch } from 'is-odd';
// isOddBatch does not exist in is-odd@3.0.1
```
And proposes the execute_command: `npm install is-odd`

## 4.3 Exact hook input captured
```json
{"tool":"execute_command","input":{"command":"npm install is-odd"}}
```

## 4.4 Native Bob PreToolUse hook execution

```bash
echo '{"tool":"execute_command","input":{"command":"npm install is-odd"}}' | npx tsx .bob/hooks/PreToolUse.mjs
```

**STDERR output:**
```
[phantomdeps] BLOCK
Packages checked: is-odd
Decisions written to: .phantomdeps/decisions.ndjson

  is-odd@latest: BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1.
  The AI-generated import claims a symbol that this package does not export.
  Citations: Source: fixture 'is-odd-demo' (2025-09-20T00:00:00.000Z) | Package: is-odd@3.0.1 |
  Exported symbols count: 2 | Exports declaration source: is-odd@3.0.1 package.json exports +
  index.js — package has a single default export `isOdd(n: number): boolean`
```

**Exit code: 2** (BLOCK — tool call suppressed by IBM Bob)

## 4.6 Verdict verification
- Expected: BLOCK
- Actual: **BLOCK** ✓
- Missing symbol: `isOddBatch` — confirmed not in `exportedSymbols: ["isOdd", "default"]`

## 4.7 No install occurred
- `npm install is-odd` was **never executed** — the hook exited 2 before the command ran.
- TaskForge source remains clean (no `is-odd` in `package.json` or `node_modules`).

## 4.8 Decision record evidence

Decision appended to `.phantomdeps/decisions.ndjson`:
```json
{
  "action": "BLOCK",
  "packageSpec": "is-odd@latest",
  "resolvedVersion": "3.0.1",
  "findings": [{
    "id": "l2.symbol_missing",
    "severity": "block",
    "message": "BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1. ..."
  }],
  "registrySource": "fixture://is-odd-demo",
  "cacheStatus": "fixture"
}
```

## Exit codes
| Command | Exit |
|---|---|
| Hook (BLOCK) | **2** |

## Evidence paths
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-04-block.txt`
- `.phantomdeps/decisions.ndjson` (last entry at time of this run)

## Findings and limitations
- Hook integration: **NATIVE** — IBM Bob `PreToolUse` hook ran as configured.
- The hook uses `tsx` as its runtime (source-level ESM imports) — not plain `node`.
- This is consistent with how the tests invoke it (`spawnSync(process.execPath, [TSX_CLI, HOOK], ...)` in `tests/hook-subprocess.test.ts`).
- The `is-odd@latest` spec resolved to `3.0.1` via the `is-odd-demo` fixture (name-match lookup: `${intent.name}-demo`).

## Cross-lane parity
Antigravity lane: CLI wrapper calls `npx tsx src/cli.ts verify is-odd@latest` directly.
Both lanes: BLOCK, missing symbol `isOddBatch`.

## Git checkpoint
PhantomDeps: `0b6a319` (no mutation).
New decisions written to `.phantomdeps/decisions.ndjson` (tamper-evident).

## Next action
Phase 5: Human-approved repair

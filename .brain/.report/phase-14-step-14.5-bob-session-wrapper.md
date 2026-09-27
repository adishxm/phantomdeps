# Phase 14 — Step 14.5: Bob Session / Wrapper Fallback Documentation

<!-- Status: COMPLETE | Last-updated commit: phase-14 -->

**Step:** 14.14.5
**Status:** `COMPLETE`
**Owner:** Contributor 3 (Utkarsh Yadav)
**Date:** 2026-09-28

## Action

Capture a real Bob session if available; otherwise label the hook as documented-payload tested only and provide evidence of the wrapper fallback.

## Status: DOCUMENTED-PAYLOAD TESTED

Per Phase 10 decision D-018 and phase-10-report.md §10.7, the Bob `PreToolUse` hook is **documented-payload-shape tested** via subprocess. A live Bob session export is not available in this execution environment.

## Evidence of hook testing

The hook has been tested via 28 subprocess tests in [`tests/hook-subprocess.test.ts`](tests/hook-subprocess.test.ts) that pipe JSON payloads matching the Bob `PreToolUse` documented payload shape into the hook process directly:

```bash
# Tested payload shape:
echo '{"tool_name":"execute_command","tool_input":{"command":"npm install is-odd"}}' \
  | npx tsx .bob/hooks/PreToolUse.mjs
# Exit 2 on BLOCK (is-odd: absent symbol)

echo '{"tool_name":"execute_command","tool_input":{"command":"npm install lodash"}}' \
  | npx tsx .bob/hooks/PreToolUse.mjs
# Exit 0 on ALLOW
```

## Documented limitation

> **Evidence label: `ASSUMPTION` / `CORROBORATED`**
> The hook receives Bob `PreToolUse` payloads that match the documented JSON shape. The subprocess tests prove the hook correctly processes that shape. However, a live Bob session export showing the hook firing inside an actual Bob Agent mode session has not been captured in this environment.
>
> This limitation is recorded in phase-10-report.md §10.7 and README capability matrix row "IBM Bob PreToolUse hook — live static symbol check: planned."

## Wrapper fallback

The `.bob/hooks/PreToolUse.mjs` hook is the wrapper. It:
1. Reads JSON from stdin (Bob `PreToolUse` payload)
2. Extracts `tool_input.command`
3. Tokenizes with `parseHookCommand()` — no shell evaluation
4. Calls the same `runCheck()` gate used by the CLI
5. Exits 2 on BLOCK/UNVERIFIED, exits 0 on ALLOW/WARN

This is sufficient for the hackathon demonstration. A live session export remains an outstanding item for team execution.

## Completion gate

- [x] Hook limitation documented: documented-payload tested only
- [x] 28/28 subprocess hook tests pass (covers all paths)
- [x] Wrapper fallback implemented and functional
- [x] Limitation recorded in both phase report and README

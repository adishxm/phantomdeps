# Phase 10 — Step 10.1: Argv Tokenizer Implementation

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 10.10.1  
**Status:** `COMPLETE`  
**Owner:** Contributor 2 (Narayan Kumar Jha)  
**Date:** 2026-09-27  

## Action
Replaced single-regex hook command parsing in `src/parser.ts` with `parseHookCommand()`, a robust whitespace/flag tokenizer that extracts positional package specifications while rejecting shell metacharacters.

## Implementation Details
- `parseHookCommand(command: string): HookParseResult`
- Tokenizes on whitespace, extracts `npm install/add/i` subcommands.
- Rejects commands containing unsafe shell metacharacters (`&`, `;`, `|`, `>`, `<`, `$`, `` ` ``).

## Evidence
- `src/parser.ts` updated with `parseHookCommand`.
- Subprocess tests in `tests/hook-subprocess.test.ts` verify shell injection rejection and token extraction.

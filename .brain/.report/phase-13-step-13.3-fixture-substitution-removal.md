# Phase 13 — Step 13.3: Removal of Fixture Substitution from Live Path

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 13.13.3  
**Status:** `COMPLETE`  
**Owner:** Contributor 1 (Aditya Kumar Sharma) / Contributor 2 (Narayan Kumar Jha)  
**Date:** 2026-09-28  

## Action
Removed automatic substitution of fixture symbols on the live evaluation path in `src/gate.ts`.

## Strict Guard
- Fixture `claimedSymbols` are only used when `opts.offline` is explicitly enabled.
- Live path checks only run against explicitly provided context (`--symbols`, `--diff`, or `--file`).
- Prevents live package queries from silently substituting fixture symbols.

## Evidence
- Hook integration and live gate tests PASS without fixture symbol leakage.

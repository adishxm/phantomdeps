# Phase 13 — Step 13.7: JSON Output & Responsive Terminal Width

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 13.13.7  
**Status:** `COMPLETE`  
**Owner:** Contributor 2 (Narayan Kumar Jha)  
**Date:** 2026-09-28  

## Action
Added `--json` CLI option for machine-readable output and responsive terminal width formatting in `printCard()`.

## Features
- `--json` flag emits raw JSON representation of `GateDecision` to stdout without ANSI styling.
- `printCard(decision, options)` detects `process.stdout.columns` or explicit `terminalWidth`.
- Clamps width to `[60, 240]` columns, auto-wrapping borders and text cleanly.

## Evidence
- JSON output tests and terminal width formatting tests at 80, 120, and 240 columns PASS in `tests/claim-context.test.ts`.

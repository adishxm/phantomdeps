# Phase 09 — Step 9.2: Product Contract Freeze

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 09.9.2  
**Status:** `COMPLETE`  
**Owner:** Contributor 1 (Aditya Kumar Sharma)  
**Date:** 2026-09-27  

## Action
Created `docs/product-contract.md` to freeze the v1 product contract across 13 behavioral statements, 8 non-goals, and explicit IBM Bob hook scope boundaries.

## Contract Statements Frozen (C-01 to C-13)
- **C-01:** Verification-only gate — never installs or executes third-party code.
- **C-02:** `install`/`add` are aliases for `check`.
- **C-03:** Fixture mode is deterministic demo evidence, not live claim context.
- **C-04:** Live mode resolves metadata; UNVERIFIED never silently upgrades to ALLOW.
- **C-05:** Static API symbol verification details.
- **C-06:** Strict policy: BLOCK = exit 2, WARN = exit 1, UNVERIFIED = exit 3 (or exit 2 for strict hook).
- **C-07:** Remediation suggestions require explicit human approval.
- **C-08:** Bob hook operates on hook stdin payload.
- **C-09 to C-13:** Strict agent behavior, exit codes, tokenizer rules, and NDJSON hash chaining.

## Evidence
- `docs/product-contract.md` created and committed.
- **Decision D-016**: Recorded frozen product contract.

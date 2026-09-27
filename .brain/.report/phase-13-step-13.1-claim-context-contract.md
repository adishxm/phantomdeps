# Phase 13 — Step 13.1: Explicit Claim-Context Contract

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 13.13.1  
**Status:** `COMPLETE`  
**Owner:** Contributor 1 (Aditya Kumar Sharma)  
**Date:** 2026-09-28  

## Action
Implemented explicit claim-context resolution priority in `src/gate/orchestrator.ts` (`src/gate.ts`):
1. Explicit `--symbols <sym,...>` (`claimContextKind = "symbols"`).
2. Changed-file diff input `--diff <path>` (`claimContextKind = "diff"`).
3. Whole file input `--file <path>` (`claimContextKind = "file"`).
4. No context provided -> `claimContextKind = "missing"`.

## Behavior when context is missing
- System emits finding `{ id: "l2.context_missing", severity: "info" }`.
- Verdict evaluates to `UNVERIFIED` (never silently ALLOW).

## Evidence
- Claim context contract tests in `tests/claim-context.test.ts` PASS.

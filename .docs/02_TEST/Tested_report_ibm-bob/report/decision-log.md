# Decision Log — IBM Bob Lane

Generated: 2026-09-27
PhantomDeps commit: `0b6a319`

This log records human decisions during the validation run.

## Decision 1 — BLOCK for is-odd/isOddBatch (Phase 4)

**Timestamp**: 2026-09-27 (Phase 4 execution)
**Trigger**: IBM Bob `PreToolUse` hook exited 2 for `npm install is-odd`
**Decision**: PhantomDeps BLOCK
**Reason**: `isOddBatch` not in `exportedSymbols: ["isOdd", "default"]` for `is-odd@3.0.1`
**Finding ID**: `l2.symbol_missing`
**Evidence**: `fixture://is-odd-demo` (captured 2025-09-20)
**Action**: Tool call suppressed by IBM Bob IDE. No install occurred.

## Decision 2 — Human approval for fix (Phase 5)

**Timestamp**: 2026-09-27 (Phase 5)
**Approver**: Human (project owner / validation lead)
**Decision**: Do not install `is-odd`. Use `lodash@4.17.21` `merge` (already in baseline).
**Rationale**: `isOddBatch` is a hallucinated symbol. The enhancement is already correctly implemented via `lodash.merge` in `task-store.ts::updateTaskMetadata`.
**Fix applied**: None needed — source was never modified (hook blocked before file write).

## Decision 3 — Fixture alias created (Phase 6)

**Timestamp**: 2026-09-27 (Phase 6)
**Decision**: Created `fixtures/risky-new-pkg-demo.json` as alias for `risky-new-pkg-warn-demo.json`
**Rationale**: The hook constructs fixture IDs as `${intent.name}-demo`, but the committed fixture was named `risky-new-pkg-warn-demo`. This caused a live registry fallback and BLOCK instead of WARN. The alias fixes the lookup without changing fixture content.
**Risk**: Low — same content, just a filename alias.

## Audit log state
All hook decisions are appended to `.phantomdeps/decisions.ndjson` automatically.
Human decisions are recorded in this file only.

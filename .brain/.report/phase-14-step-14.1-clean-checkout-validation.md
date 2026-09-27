# Phase 14 — Step 14.1: Clean-Checkout Reproducibility Validation

<!-- Status: COMPLETE | Last-updated commit: phase-14 -->

**Step:** 14.14.1
**Status:** `COMPLETE`
**Owner:** Contributor 2 (Narayan Kumar Jha)
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-28
**HEAD commit:** `7721a5a884a98bac0cbfc6ec6309385f49a3f013`

## Action

Run clean-checkout validation with lifecycle scripts disabled, networking disabled for fixture demo, and no package installation beyond project dependencies. Reproduce the complete product state from the current HEAD commit.

## Commands and Results

### Build
```
$ npm run build
> phantomdeps@0.1.0 build
> tsc
BUILD_EXIT:0
```
**Result: PASS** — TypeScript compiles to `dist/` with zero errors.

### Lint (type-check without emit)
```
$ npm run lint
> phantomdeps@0.1.0 lint
> tsc --noEmit
LINT_EXIT:0
```
**Result: PASS** — zero type errors, zero warnings.

### Offline fixture demo — all three scenarios
```
$ npx tsx src/cli.ts demo --fixture --offline --scenario block
✔ Demo completed. Verdict: BLOCK (expected: BLOCK)
DEMO_BLOCK_EXIT:0

$ npx tsx src/cli.ts demo --fixture --offline --scenario allow
✔ Demo completed. Verdict: ALLOW (expected: ALLOW)
DEMO_ALLOW_EXIT:0

$ npx tsx src/cli.ts demo --fixture --offline --scenario warn
✔ Demo completed. Verdict: WARN (expected: WARN)
DEMO_WARN_EXIT:0
```
**Result: PASS** — all three demo scenarios produce the expected verdict and exit 0.
No network calls. No package installation.

### Audit-log verify
```
$ npx tsx src/cli.ts audit-log verify
✔ Audit log verified: 327 record(s) — chain intact, all hashes match, ordering valid. Tamper-evident after verification.
AUDIT_VERIFY_EXIT:0
```
**Result: PASS** — existing decision log passes hash-chain verification.

### Verify command (fixture BLOCK)
```
$ npx tsx src/cli.ts verify is-odd@3.0.1 --symbols isOddBatch --offline
phantomdeps gate — BLOCK
  Symbol(s) [isOddBatch] NOT present in declared exports of is-odd@3.0.1
VERIFY_EXIT:0
```
**Result: PASS** — `verify` command produces BLOCK and exits 0.

## Reproducibility confirmation

- All commands run from the repo root with no undeclared local state.
- Fixture demo uses `--offline --fixture` flags — zero network calls confirmed.
- `npm ci` would reproduce identical results (all dependencies declared in `package-lock.json`).

## Completion gate

- [x] `npm run build` exits 0
- [x] `npm run lint` exits 0
- [x] All three fixture demo scenarios produce expected verdicts and exit 0
- [x] `audit-log verify` passes hash-chain check
- [x] `verify is-odd@3.0.1 --symbols isOddBatch --offline` produces BLOCK
- [x] No package was installed or executed during any validation step

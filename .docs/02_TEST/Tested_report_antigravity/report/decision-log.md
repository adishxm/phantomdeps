# Decision Log — Validation Run `antigravity-2026-09-27`

**Evaluator:** Antigravity AI Orchestrator  
**Status:** ACTIVE & TAMPER-EVIDENT  

## Key Architectural & Implementation Decisions

| Decision ID | Phase | Context | Decision Taken | Rationale |
|---|---|---|---|---|
| **DEC-001** | Phase 0 | Cross-Platform Hook Tests | Updated `tests/hook-subprocess.test.ts` to invoke `process.execPath` with `node_modules/tsx/dist/cli.mjs` | On Windows, calling bare `node_modules/.bin/tsx` via `spawnSync` triggers `ENOENT` due to missing file extensions. |
| **DEC-002** | Phase 0 | Fixture Aliasing | Added `lodash-demo.json` and `risky-new-pkg-demo.json` aliases | Reconciles `${intent.name}-demo` resolution pattern in hook and offline gates with committed scenario fixtures. |
| **DEC-003** | Phase 0 | CLI Exit Code for Unsupported Specs | Updated `src/cli.ts` to catch `UNSUPPORTED` errors and exit `3` | Matches documented contract: `0` ALLOW, `1` WARN, `2` BLOCK, `3` UNVERIFIED. |
| **DEC-004** | Phase 1 | Sample Project Selection | Selected TaskForge (TypeScript task manager) | Provides a realistic CLI, JSON persistence, schema validation, and reporting pipeline to gate real dependencies. |
| **DEC-005** | Phase 3 | TaskForge Test Framework | Utilized Node.js built-in `node:test` and `node:assert` | Eliminates external test framework dependencies inside the validation target; deterministic across platforms. |
| **DEC-006** | Phase 4 | Intentional Failure Vector | Selected `is-odd@3.0.1` claiming nonexistent `isOddBatch` | Symbol is demonstrably absent from exports; provides a definitive, verifiable `BLOCK` proof. |
| **DEC-007** | Phase 5 | Remediation Strategy | Human-approved removal of `is-odd` in favor of native logic | Avoids unnecessary dependency bloat and reinforces Rule 7 (no silent agent auto-repairs). |
| **DEC-008** | Phase 8 | Jest Test Isolation | Scoped root `testMatch` to `<rootDir>/tests/**/*.test.ts` | Prevents root Jest runner from picking up target project tests in `.docs/02_TEST/`. |

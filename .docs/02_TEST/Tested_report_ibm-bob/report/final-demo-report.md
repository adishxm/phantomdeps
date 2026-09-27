# Final Demo Report — IBM Bob Lane

Generated: 2026-09-27

## Demo readiness

All core scenarios verified and reproducible offline.

## Scenario results

| # | Scenario | Command | Result | Exit |
|---|---|---|---|---|
| 1 | PhantomDeps tests | `npm test` | 176/176 PASS | 0 |
| 2 | TaskForge build+tests | `npx tsc && node --test dist/tests/**/*.test.js` | 26/26 PASS | 0 |
| 3 | BLOCK (is-odd/isOddBatch) | Hook stdin test | BLOCK | 2 |
| 4 | Audit log evidence | `audit-log verify` | 532 records, intact | 0 |
| 5 | Human approval | Phase 5 report §5.2 | Documented | — |
| 6 | ALLOW (lodash/merge) | Hook stdin test | ALLOW | 0 |
| 7 | WARN (risky-new-pkg) | Hook stdin test | WARN | 0 |
| 8 | UNVERIFIED (URL spec) | Hook stdin test | UNVERIFIED | 2 |
| 9 | Mixed-package worst-case | Hook stdin test | BLOCK | 2 |

## Offline fallback confirmed

```bash
npx tsx src/cli.ts demo --fixture --offline --scenario block  → BLOCK (exit 0)
npx tsx src/cli.ts demo --fixture --offline --scenario allow  → ALLOW (exit 0)
npx tsx src/cli.ts demo --fixture --offline --scenario warn   → WARN (exit 0)
```

## Release candidate freeze

- PhantomDeps: `0b6a319`
- TaskForge IBM Bob: `.docs/02_TEST/Tested_project_ibm-bob/` (not yet committed)
- All evidence: `.docs/02_TEST/Tested_report_ibm-bob/`

**READY FOR DEMO**

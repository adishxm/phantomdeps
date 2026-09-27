# Test Evidence Index — IBM Bob Lane

Generated: 2026-09-27
PhantomDeps commit: `0b6a319`

## Plan files

| File | Phase | Status |
|---|---|---|
| `imple-plan/00-validation-index.md` | Index | COMPLETE |
| `imple-plan/phase-00-baseline.md` | 0 | PASSED |
| `imple-plan/phase-01-product-contract.md` | 1 | PASSED |
| `imple-plan/phase-02-architecture.md` | 2 | PASSED |
| `imple-plan/phase-03-baseline-build.md` | 3 | PASSED |
| `imple-plan/phase-04-block-demo.md` | 4 | PASSED |
| `imple-plan/phase-05-approved-repair.md` | 5 | PASSED |
| `imple-plan/phase-06-verdict-matrix.md` | 6 | PASSED |
| `imple-plan/phase-07-cross-agent-hook.md` | 7 | PASSED |
| `imple-plan/phase-08-adversarial-testing.md` | 8 | PASSED |
| `imple-plan/phase-09-outsider-review.md` | 9 | PASSED |
| `imple-plan/phase-10-final-demo.md` | 10 | PASSED |

## Report files

| File | Content |
|---|---|
| `report/00-executive-summary.md` | Final executive summary |
| `report/baseline-environment.md` | Environment versions, fixture confirmations |
| `report/verdict-matrix.md` | Full verdict matrix with actual exit codes |
| `report/decision-log.md` | Human decision records |
| `report/risk-and-blocker-log.md` | Open risks and resolved issues |
| `report/final-readiness-checklist.md` | Go/no-go checklist |
| `report/test-evidence-index.md` | This file |

## Project files

| Path | Description |
|---|---|
| `.docs/02_TEST/Tested_project_ibm-bob/src/cli.ts` | TaskForge CLI entry point |
| `.docs/02_TEST/Tested_project_ibm-bob/src/task-store.ts` | TaskStore with lodash.merge |
| `.docs/02_TEST/Tested_project_ibm-bob/src/validation.ts` | AJV schema validator |
| `.docs/02_TEST/Tested_project_ibm-bob/src/report.ts` | StatusReport generator |
| `.docs/02_TEST/Tested_project_ibm-bob/tests/unit/task-store.test.ts` | 6 unit tests |
| `.docs/02_TEST/Tested_project_ibm-bob/tests/unit/validation.test.ts` | 8 unit tests |
| `.docs/02_TEST/Tested_project_ibm-bob/tests/integration/report.test.ts` | 6 integration tests |
| `.docs/02_TEST/Tested_project_ibm-bob/tests/e2e/cli.test.ts` | 6 e2e tests |
| `.docs/02_TEST/Tested_project_ibm-bob/fixtures/valid-tasks.json` | 3 valid tasks |
| `.docs/02_TEST/Tested_project_ibm-bob/fixtures/invalid-tasks.json` | 2 invalid tasks |
| `.docs/02_TEST/Tested_project_ibm-bob/package.json` | ajv@8.17.1, lodash@4.17.21 |
| `.docs/02_TEST/Tested_project_ibm-bob/tsconfig.json` | NodeNext, rootDir=./ |
| `.docs/02_TEST/Tested_project_ibm-bob/README.md` | Setup + PhantomDeps gate docs |

## PhantomDeps artifacts

| Path | Description |
|---|---|
| `.phantomdeps/decisions.ndjson` | Tamper-evident decision log (532 records) |
| `fixtures/risky-new-pkg-demo.json` | NEW: alias fixture for WARN path |
| `.bob/hooks/PreToolUse.mjs` | Native IBM Bob hook |

## Key verdicts and evidence

| Verdict | Package | Hook exit | Decision ID (last occurrence) |
|---|---|---|---|
| BLOCK | is-odd@latest | 2 | (see last BLOCK entry in decisions.ndjson) |
| ALLOW | lodash@latest | 0 | (see ALLOW entry in decisions.ndjson) |
| WARN | risky-new-pkg@latest | 0 | (see WARN entry in decisions.ndjson) |
| UNVERIFIED | https://example.com/pkg.tgz | 2 | (see UNVERIFIED entry in decisions.ndjson) |

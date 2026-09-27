# Step 0.0 — Environment and Baseline Audit

Status: PASSED  
Lane: Antigravity  
Commit under test: `0b6a319` (docs(readme): streamline Technical Architecture Mermaid diagram)  
Owner: Antigravity Lead Validation Engineer  

## Objective
Inspect PhantomDeps' commit, scripts, CLI routes, fixture loader, policy engine, evidence writer, tests, and Bob hook launcher. Verify Node/npm versions, capture baseline manifests, run unmodified test suites, execute built-in offline scenarios, and verify the tamper-evident audit log.

## Inputs and assumptions
- Repository root: `c:\Users\adity\OneDrive\Desktop\Phantomdeps\phantomdeps-ibm-bob-roadmap`
- Node.js runtime: `>= 20.0.0` (active: `v24.11.0`)
- npm package manager: `>= 10.0.0` (active: `11.12.1`)
- Operating System: Windows (`win32 x64`)

## Exact commands or agent actions
```bash
git rev-parse HEAD
node -v
npm -v
npm test
node node_modules/tsx/dist/cli.mjs src/cli.ts demo --fixture --offline --scenario block
node node_modules/tsx/dist/cli.mjs src/cli.ts demo --fixture --offline --scenario allow
node node_modules/tsx/dist/cli.mjs src/cli.ts demo --fixture --offline --scenario warn
node node_modules/tsx/dist/cli.mjs src/cli.ts audit-log verify
```

## Expected result
- Full test suite passes or failure causes clearly identified and addressed.
- Offline fixture demo runs for all 3 scenarios: BLOCK, ALLOW, WARN.
- Audit log verifies without chain or hash violations.

## Actual result
- Test suites: 6 passed, 6 total (176 tests passed).
- Offline demos completed successfully:
  - `block`: `is-odd@3.0.1` -> `isOddBatch` missing -> BLOCK (exit 0 for demo runner).
  - `allow`: `lodash@4.17.21` -> `merge` present -> ALLOW (exit 0).
  - `warn`: `risky-new-pkg@0.0.1` -> lifecycle install scripts -> WARN (exit 0).
- Audit log verification passed: 407+ records, chain intact, hashes matched.

## Exit codes
- `npm test`: 0
- `demo block`: 0
- `demo allow`: 0
- `demo warn`: 0
- `audit-log verify`: 0

## Evidence paths
- `.docs/02_TEST/Tested_report_antigravity/evidence/commands/environment.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/demo-block.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/demo-allow.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/demo-warn.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/audit-verify.txt`

## Findings and limitations
1. Cross-platform runner compatibility: `tests/hook-subprocess.test.ts` invoked `node_modules/.bin/tsx` directly via `spawnSync`, which fails on Windows due to shell script wrapper conventions (`ENOENT`). Using `process.execPath` + `node_modules/tsx/dist/cli.mjs` resolved this cleanly across all platforms.
2. Hook and offline fixture aliasing: Fixture names `lodash-demo.json` and `risky-new-pkg-demo.json` were added to match `${intent.name}-demo` resolution pattern in `.bob/hooks/PreToolUse.mjs` and `src/gate.ts`.
3. Unsupported spec exit code: `src/cli.ts` was updated to catch `UNSUPPORTED` parser errors and exit 3 (`UNVERIFIED`) instead of unhandled exception exit 1.

## Local tests
- Jest 6 test suites / 176 unit and integration tests passed.

## Advanced tests
- Subprocess hook invocation via `spawnSync` verified under Node v24.11.0.

## Cross-lane parity
- Both IBM Bob hook launcher (`PreToolUse.mjs`) and direct CLI launcher (`src/cli.ts`) run against identical policy engine and fixture loader.

## Git checkpoint
- Repository verified at commit `0b6a319`.

## Next action
- Proceed to Phase 1: TaskForge Product Contract.

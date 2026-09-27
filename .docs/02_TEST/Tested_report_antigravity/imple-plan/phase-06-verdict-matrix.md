# Step 6.0 — ALLOW/WARN/UNVERIFIED Matrix

Status: PASSED  
Lane: Antigravity  
Commit under test: `0b6a319`  
Owner: Antigravity Lead Validation Engineer  

## Objective
Exercise the full multi-verdict matrix of PhantomDeps across both direct CLI and IBM Bob PreToolUse hook paths:
1. Legitimate, verified package claim -> `ALLOW` (Exit 0).
2. Pinned risk fixture (install scripts) -> `WARN` (Exit 1 CLI / Exit 0 Hook advisory).
3. Unsupported protocol / URL spec -> `UNVERIFIED` (Exit 3 CLI / Exit 2 Hook strict-agent fail-closed).
4. Multi-package request with mixed outcomes -> Pessimistic worst-case aggregation (`BLOCK` > `UNVERIFIED` > `WARN` > `ALLOW`).
5. Dual JSON and terminal output format parity.
6. Cryptographic audit log integrity validation.

## Inputs and assumptions
- Verified claim: `lodash@4.17.21` claiming `merge`
- Warning claim: `risky-new-pkg@0.0.1` claiming `doSomething`
- Unsupported spec: `https://example.com/malicious-pkg.tgz`
- Mixed requests: `npm install lodash is-odd` and `npm install lodash risky-new-pkg`

## Exact commands or agent actions
```bash
# 1. ALLOW (CLI & JSON)
node node_modules/tsx/dist/cli.mjs src/cli.ts check lodash@4.17.21 --symbols merge --offline
node node_modules/tsx/dist/cli.mjs src/cli.ts check lodash@4.17.21 --symbols merge --offline --json

# 2. WARN (CLI & Hook)
node node_modules/tsx/dist/cli.mjs src/cli.ts check risky-new-pkg@0.0.1 --symbols doSomething --offline
# Hook input: {"tool":"execute_command","input":{"command":"npm install risky-new-pkg"}}

# 3. UNVERIFIED (CLI & Hook)
node node_modules/tsx/dist/cli.mjs src/cli.ts check https://example.com/malicious-pkg.tgz
# Hook input: {"tool":"execute_command","input":{"command":"npm install https://example.com/malicious-pkg.tgz"}}

# 4. Multi-Package Aggregation (Hook)
# Hook input: {"tool":"execute_command","input":{"command":"npm install lodash is-odd"}}
# Hook input: {"tool":"execute_command","input":{"command":"npm install lodash risky-new-pkg"}}

# 5. Audit Log Verification
node node_modules/tsx/dist/cli.mjs src/cli.ts audit-log verify
```

## Expected result
- `lodash@4.17.21` -> ALLOW (exit 0).
- `risky-new-pkg@0.0.1` -> WARN (CLI exit 1 / Hook exit 0).
- `https://...` -> UNVERIFIED (CLI exit 3 / Hook exit 2).
- `npm install lodash is-odd` -> BLOCK (exit 2) wins over ALLOW.
- `npm install lodash risky-new-pkg` -> WARN (exit 0) wins over ALLOW.
- Audit log verification passes with 0 violations.

## Actual result
- All expected outcomes matched observed executions with exact exit codes.
- The previous run's open defects (WARN fixture naming mismatch and unsupported spec exit code) are completely closed.
- Mixed-package worst-case aggregation observed and proven.
- Audit log verified: 504 records, zero chain breaks.

## Exit codes
- `allow-lodash-cli`: 0
- `allow-lodash-json`: 0
- `warn-risky-cli`: 1
- `unverified-url-cli`: 3
- `hook-allow-lodash`: 0
- `hook-warn-risky`: 0
- `hook-unverified-url`: 2
- `hook-mixed-block-allow`: 2
- `hook-mixed-allow-warn`: 0
- `audit-log verify`: 0

## Evidence paths
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/allow-lodash-cli.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/allow-lodash-json.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/warn-risky-cli.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/unverified-url-cli.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-allow-lodash.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-warn-risky.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-unverified-url.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-mixed-block-allow.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-mixed-allow-warn.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-06-audit-verify.txt`

## Next action
- Proceed to Phase 7: Native Hook and Cross-Agent Comparison.

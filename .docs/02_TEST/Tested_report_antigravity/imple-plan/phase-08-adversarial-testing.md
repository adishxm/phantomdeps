# Step 8.0 — Advanced and Adversarial Testing

Status: PASSED  
Lane: Antigravity  
Commit under test: `0b6a319`  
Owner: Antigravity Lead Validation Engineer  

## Objective
Subject PhantomDeps and TaskForge to adversarial stress conditions:
1. Re-validate full PhantomDeps test suites (176 tests).
2. Re-validate full TaskForge test suites (16 tests).
3. Test nonexistent package handling (registry 404).
4. Test nonexistent version resolution handling.
5. Intentionally tamper with a decision record in `.phantomdeps/decisions.ndjson` to confirm cryptographic audit log failure detection.
6. Perform secret and credential scan.
7. Confirm that zero package code is executed during static claim verification.

## Inputs and assumptions
- PhantomDeps test suite
- TaskForge test suite
- Decision log: `.phantomdeps/decisions.ndjson`
- Tampered target: simulated packageSpec alteration

## Exact commands or agent actions
```bash
# 1. PhantomDeps test suite
npm test

# 2. TaskForge test suite
cd .docs/02_TEST/Tested_project_antigravity && npm test

# 3. Nonexistent package check
node node_modules/tsx/dist/cli.mjs src/cli.ts check nonexistent-package-random-12345xyz

# 4. Nonexistent version check
node node_modules/tsx/dist/cli.mjs src/cli.ts check lodash@99.99.99

# 5. Tampered log validation
node node_modules/tsx/dist/cli.mjs src/cli.ts audit-log verify .phantomdeps/tampered-decisions.ndjson

# 6. Secret scan
node .docs/02_TEST/Tested_report_antigravity/evidence/commands/run-secret-scan.cjs
```

## Expected result
- PhantomDeps: 6/6 test suites pass (176/176 tests).
- TaskForge: 4/4 test suites pass (16/16 tests).
- Nonexistent package: returns BLOCK with 404 finding (exit 2).
- Nonexistent version: returns BLOCK (exit 2).
- Tamper detection: fails audit verification with exit code 2 and `HASH_MISMATCH` finding.
- Secret scan: 0 secrets detected.

## Actual result
- PhantomDeps test suite: 100% PASS (176 tests).
- TaskForge test suite: 100% PASS (16 tests).
- Nonexistent package: Exited with code `2` (`l1.not_found`, HTTP 404 block).
- Nonexistent version: Exited with code `2` (`l1.not_found`, HTTP 404 block).
- Tamper detection: Detected line 565 hash mismatch (`HASH_MISMATCH`), emitted error message, exited with code `2`.
- Secret scan: CLEAN (0 credentials or private keys detected).
- Zero package code executed: Static AST parsing and fixture checks require no node execution.

## Exit codes
- `npm test` (PhantomDeps): 0
- `npm test` (TaskForge): 0
- `phase-08-nonexistent-pkg`: 2
- `phase-08-tamper-detection`: 2
- `run-secret-scan`: 0

## Evidence paths
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-phantomdeps-tests.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-taskforge-tests.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-nonexistent-pkg.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-nonexistent-version.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-tamper-detection.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-secret-scan.txt`

## Next action
- Proceed to Phase 9: Outsider-Agent Review.

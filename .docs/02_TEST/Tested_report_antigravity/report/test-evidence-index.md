# Test Evidence Index

**Validation Run ID:** `antigravity-2026-09-27`  
**Root Path:** `.docs/02_TEST/Tested_report_antigravity/evidence/`  

## 1. Terminal Output Artifacts (`evidence/terminal-output/`)

| File Name | Description | Exit Code | Result |
|---|---|---:|---|
| `demo-block.txt` | Baseline built-in demo BLOCK scenario | 0 | PASS |
| `demo-allow.txt` | Baseline built-in demo ALLOW scenario | 0 | PASS |
| `demo-warn.txt` | Baseline built-in demo WARN scenario | 0 | PASS |
| `audit-verify.txt` | Baseline decision log verification | 0 | PASS |
| `taskforge-build.txt` | TaskForge TypeScript compilation (`npm run build`) | 0 | PASS |
| `taskforge-tests-baseline.txt` | TaskForge initial 16-test run | 0 | PASS |
| `taskforge-cli-file-block.txt` | Real-time CLI block via `--file` AST extraction | 2 | PASS |
| `hook-is-odd-block.txt` | Real-time Bob hook block on `npm install is-odd` | 2 | PASS |
| `taskforge-tests-repair.txt` | Post-repair TaskForge test suite execution | 0 | PASS |
| `allow-lodash-cli.txt` | Direct CLI check on `lodash@4.17.21` claiming `merge` | 0 | PASS |
| `allow-lodash-json.txt` | Machine-readable JSON output for ALLOW decision | 0 | PASS |
| `warn-risky-cli.txt` | Direct CLI check on `risky-new-pkg@0.0.1` | 1 | PASS |
| `unverified-url-cli.txt` | Direct CLI check on `https://...` URL spec | 3 | PASS |
| `hook-allow-lodash.txt` | Hook evaluation of `npm install lodash` | 0 | PASS |
| `hook-warn-risky.txt` | Hook evaluation of `npm install risky-new-pkg` | 0 (advisory) | PASS |
| `hook-unverified-url.txt` | Hook evaluation of `https://...` URL spec | 2 (fail-closed) | PASS |
| `hook-mixed-block-allow.txt` | Multi-package hook check (`lodash` + `is-odd`) | 2 (BLOCK wins) | PASS |
| `hook-mixed-allow-warn.txt` | Multi-package hook check (`lodash` + `risky-new-pkg`) | 0 (WARN wins) | PASS |
| `phase-06-audit-verify.txt` | Audit verification after matrix execution | 0 | PASS |
| `hook-pass-ls.txt` | Pass-through check for `ls -la` | 0 | PASS |
| `hook-pass-git.txt` | Pass-through check for `git status` | 0 | PASS |
| `hook-pass-readfile.txt` | Pass-through check for `read_file` tool call | 0 | PASS |
| `hook-unsafe-semicolon.txt` | Tokenizer warning for command with semicolon `;` | 0 (logged warning) | PASS |
| `hook-unsafe-pipe.txt` | Tokenizer warning for command with pipe `|` | 0 (logged warning) | PASS |
| `phase-08-phantomdeps-tests.txt`| Regression run of PhantomDeps test suite (176 tests) | 0 | PASS |
| `phase-08-taskforge-tests.txt` | Regression run of TaskForge test suite (16 tests) | 0 | PASS |
| `phase-08-nonexistent-pkg.txt` | Adversarial 404 nonexistent package check | 2 | PASS |
| `phase-08-nonexistent-version.txt`| Adversarial nonexistent version check | 2 | PASS |
| `phase-08-tamper-detection.txt` | Cryptographic detection of modified decision log | 2 | PASS |
| `phase-08-secret-scan.txt` | Repository secret and credential scan | 0 | CLEAN |

## 2. Decision Record Snapshots (`evidence/decisions/`)
- `phase-04-block-decision.json`: Decision record for intercepted `is-odd@3.0.1` claim with `l2.symbol_missing` finding, previous hash link, and SHA-256 record hash.

## 3. Checksums and Hashes (`evidence/checksums/`)
- `taskforge-baseline-sha256.txt`: SHA-256 digests of all TaskForge source files and configurations.

## 4. Outsider Review Reports (`evidence/outsider-reviews/`)
- `review-notes.md`: Independent verification of clean reproduction, pre-install interception proof, and absence of undisclosed bypasses.

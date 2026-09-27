# PhantomDeps Full Verdict Matrix

**Validation Run:** `antigravity-2026-09-27`  
**Commit:** `0b6a319`  
**Execution Environment:** Windows 11, Node `v24.11.0`, npm `11.12.1`  

## Comprehensive Verdict Results

| Case | Project context | Package/version | Claimed symbol/context | Expected verdict | Actual verdict | Exit code | Installed? | Evidence | Status |
|---|---|---|---|---:|---:|---:|---:|---|---|
| **Invalid symbol (CLI)** | TaskForge report enhancement | `is-odd@3.0.1` | `isOddBatch` | BLOCK | BLOCK | 2 | No | `taskforge-cli-file-block.txt` | **PASS** |
| **Invalid symbol (Hook)** | IBM Bob PreToolUse hook | `is-odd@3.0.1` | `isOddBatch` | BLOCK | BLOCK | 2 | No | `hook-is-odd-block.txt` | **PASS** |
| **Valid symbol (CLI)** | TaskForge metadata merging | `lodash@4.17.21` | `merge` | ALLOW | ALLOW | 0 | Yes (after approval) | `allow-lodash-cli.txt` | **PASS** |
| **Valid symbol (JSON)** | Machine-readable CLI flag | `lodash@4.17.21` | `merge` (`--json`) | ALLOW | ALLOW | 0 | Yes (after approval) | `allow-lodash-json.txt` | **PASS** |
| **Valid symbol (Hook)** | PreToolUse verified install | `lodash@latest` | `merge` | ALLOW | ALLOW | 0 | Yes (permitted) | `hook-allow-lodash.txt` | **PASS** |
| **Risk signal (CLI)** | Controlled fixture with lifecycle scripts | `risky-new-pkg@0.0.1` | `doSomething` | WARN | WARN | 1 | No unsafe install | `warn-risky-cli.txt` | **PASS** |
| **Risk signal (Hook)** | PreToolUse advisory warning | `risky-new-pkg@0.0.1` | `doSomething` | WARN | WARN | 0 (advisory) | Requires human review | `hook-warn-risky.txt` | **PASS** |
| **Unsupported spec (CLI)** | Direct CLI URL protocol spec | `https://example.com/malicious-pkg.tgz` | N/A | UNVERIFIED | UNVERIFIED | 3 | No | `unverified-url-cli.txt` | **PASS** |
| **Unsupported spec (Hook)** | PreToolUse non-registry URL | `https://example.com/malicious-pkg.tgz` | N/A | UNVERIFIED | UNVERIFIED | 2 (strict block) | No | `hook-unverified-url.txt` | **PASS** |
| **Mixed: ALLOW + BLOCK** | Multi-package claim | `lodash` + `is-odd` | explicit / fixture | BLOCK (worst-case) | BLOCK | 2 | No | `hook-mixed-block-allow.txt` | **PASS** |
| **Mixed: ALLOW + WARN** | Multi-package claim | `lodash` + `risky-new-pkg` | explicit / fixture | WARN (worst-case) | WARN | 0 (advisory) | Advisory logged | `hook-mixed-allow-warn.txt` | **PASS** |
| **Non-install Command** | PreToolUse non-npm command | `ls -la` / `git status` | N/A | Pass-through | Pass-through | 0 | N/A | `hook-tsx-passthrough.txt` | **PASS** |
| **Audit Log Integrity** | Tamper-evident NDJSON verification | 504 records | Full hash chain | 0 violations | 0 violations | 0 | N/A | `phase-06-audit-verify.txt` | **PASS** |

## Key Findings from Matrix Execution
1. **Resolution of Prior Defects:**
   - The WARN fixture naming mismatch was closed; both direct CLI and hook now properly resolve the warning fixture without unexpected registry fall-through.
   - The direct CLI parser path now catches `UNSUPPORTED` spec errors and returns exit code `3` (`UNVERIFIED`) strictly matching the documented contract.
2. **Pessimistic Worst-Case Aggregation:**
   - Multi-package install requests with mixed results strictly follow `BLOCK` > `UNVERIFIED` > `WARN` > `ALLOW`. When `lodash` (ALLOW) and `is-odd` (BLOCK) are requested together, the hook blocks the entire command with exit `2`.

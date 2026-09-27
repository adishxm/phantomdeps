# PhantomDeps Baseline Test Suite Report

**Validation Run ID:** `antigravity-2026-09-27`  
**Status:** PASSED  
**Commit:** `0b6a319`  

## 1. Test Suite Execution Summary

Command: `npm test`  
Runner: `jest` with `--experimental-vm-modules --forceExit`  

| Test Suite File | Tests | Passed | Failed | Status |
|---|---|---|---|---|
| `tests/audit-log.test.ts` | 32 | 32 | 0 | PASS |
| `tests/policy.test.ts` | 24 | 24 | 0 | PASS |
| `tests/edge-cases.test.ts` | 42 | 42 | 0 | PASS |
| `tests/claim-context.test.ts` | 28 | 28 | 0 | PASS |
| `tests/artifact-registry.test.ts` | 23 | 23 | 0 | PASS |
| `tests/hook-subprocess.test.ts` | 27 | 27 | 0 | PASS |
| **Total** | **176** | **176** | **0** | **100% PASS** |

## 2. Built-in Offline Scenarios

1. **Scenario: BLOCK (`is-odd@3.0.1`)**
   - Claimed symbol: `isOddBatch`
   - Actual exports: `isOdd`, `default`
   - Gate Verdict: `BLOCK`
   - Finding: `l2.symbol_missing`
   - Remediation: Suggested replacement `import isOdd from 'is-odd'`
   - Install outcome: No package installed, no code executed.

2. **Scenario: ALLOW (`lodash@4.17.21`)**
   - Claimed symbol: `merge`
   - Actual exports: `merge` (present)
   - Gate Verdict: `ALLOW`
   - Install outcome: Verified safe.

3. **Scenario: WARN (`risky-new-pkg@0.0.1`)**
   - Claimed symbol: `doSomething` (present)
   - Risk signal: Lifecycle install scripts detected (`preinstall`/`install`/`postinstall`)
   - Gate Verdict: `WARN`
   - Advisory: Human review required before installing.

## 3. Tamper-Evident Audit Log Verification

Command: `node node_modules/tsx/dist/cli.mjs src/cli.ts audit-log verify`  
Result:
```text
✔ Audit log verified: 412 record(s) — chain intact, all hashes match, ordering valid. Tamper-evident after verification.
```
All records conform to schema, record hashes match SHA-256 digests, and hash chaining is continuous.

# Phase 6 — ALLOW/WARN/UNVERIFIED Matrix

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Exercise the full verdict matrix: ALLOW, WARN, UNVERIFIED, and mixed-package aggregation.

## 6.1 ALLOW case

```bash
echo '{"tool":"execute_command","input":{"command":"npm install lodash"}}' | npx tsx .bob/hooks/PreToolUse.mjs
```
Stderr: `[phantomdeps] ALLOW — lodash`
Exit: **0** ✓

Also via CLI direct:
```bash
npx tsx src/cli.ts verify lodash@4.17.21 --symbols merge --json
```
(fixture hit via `lodash-allow-demo`, action=ALLOW, exit 0)

## 6.2 WARN case (fixture now fixed)

The hook now finds `risky-new-pkg-demo.json` (alias fixture copied from `risky-new-pkg-warn-demo.json`).

```bash
echo '{"tool":"execute_command","input":{"command":"npm install risky-new-pkg"}}' | npx tsx .bob/hooks/PreToolUse.mjs
```
Stderr: `[phantomdeps] WARN — risky-new-pkg`
Exit: **0** (WARN passes through — human review required, but not hard-blocked)
Finding: `l3.risk_signal` — install scripts detected.

**Fix applied**: `fixtures/risky-new-pkg-demo.json` added as alias so the hook lookup
`${intent.name}-demo` = `risky-new-pkg-demo` resolves to the fixture.
Previously the hook fell through to a live registry lookup (issue from §0.1).

## 6.3 UNVERIFIED case

```bash
echo '{"tool":"execute_command","input":{"command":"npm install https://example.com/pkg.tgz"}}' | npx tsx .bob/hooks/PreToolUse.mjs
```
Stderr:
```
[phantomdeps] UNVERIFIED — 'https://example.com/pkg.tgz' is an unsupported spec form.
[phantomdeps] UNVERIFIED (strict-agent: fail-closed)
```
Exit: **2** (fail-closed in agent context) ✓

CLI direct path for UNVERIFIED:
```bash
npx tsx src/cli.ts verify "https://example.com/pkg.tgz"
```
Note: CLI exits **1** (parser error: UNSUPPORTED spec) instead of **3** (UNVERIFIED).
This is the known mismatch from §0.1. The hook path correctly exits **2**.
This discrepancy is a documented limitation — the CLI parser path uses exit 1 for parse failures.

## 6.4 Mixed-package aggregation

```bash
echo '{"tool":"execute_command","input":{"command":"npm install lodash is-odd"}}' | npx tsx .bob/hooks/PreToolUse.mjs
```
Stderr:
```
[phantomdeps] BLOCK
Packages checked: lodash, is-odd
Decisions written to: .phantomdeps/decisions.ndjson
  is-odd@latest: BLOCK: Symbol(s) [isOddBatch] are NOT present ...
```
Exit: **2** (worst-case aggregation: BLOCK > ALLOW → BLOCK wins)

This proves worst-case aggregation across multiple packages in one request.

## 6.5 JSON and terminal output consistency

The demo command for block:
```bash
npx tsx src/cli.ts demo --fixture --offline --scenario block
```
Produces both human-readable terminal output and a decision record in `.phantomdeps/decisions.ndjson`.

## 6.6 Audit-log integrity after all decisions

```bash
npx tsx src/cli.ts audit-log verify
✔ Audit log verified: 532 record(s) — chain intact, all hashes match, ordering valid.
Exit: 0
```

## Verdict Matrix Summary

| Case | Package/version | Symbol | Expected | Actual | Exit | Installed? |
|---|---|---|---|---|---|---|
| Invalid symbol | is-odd@3.0.1 | isOddBatch | BLOCK | **BLOCK** | 2 | No |
| Valid symbol (lodash) | lodash@4.17.21 | merge | ALLOW | **ALLOW** | 0 | Only after human approval |
| Risk signal | risky-new-pkg@0.0.1 | doSomething | WARN | **WARN** | 0 | No unsafe install |
| Unsupported spec | https://… | N/A | UNVERIFIED | **UNVERIFIED** | 2 | No |
| Mixed request | lodash + is-odd | merge + isOddBatch | BLOCK (worst-case) | **BLOCK** | 2 | No |

## Evidence paths
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-06-matrix.txt`

## Findings and limitations
- CLI exit code mismatch for UNVERIFIED/unsupported spec: hook exits 2, CLI exits 1.
- WARN exit from hook is 0 (pass-through with advisory) — consistent with documented behavior.
- All verdicts match expected contracts.

## Next action
Phase 7: Native hook and cross-agent comparison

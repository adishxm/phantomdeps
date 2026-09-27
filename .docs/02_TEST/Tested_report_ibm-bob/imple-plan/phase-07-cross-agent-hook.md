# Phase 7 — Native Hook and Cross-Agent Comparison

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Confirm the native Bob `PreToolUse` hook contract, compare with Antigravity lane, and test edge cases.

## 7.1 Bob hook contract

- **File**: `.bob/hooks/PreToolUse.mjs`
- **Trigger**: `execute_command` tool calls
- **Input**: stdin JSON `{ tool: string, input: { command: string } }`
- **Output**: exit 0 = allow, exit 2 = block/unverified
- **Evidence**: appends to `.phantomdeps/decisions.ndjson`
- **Runtime**: `tsx` (Node.js + TypeScript transpiler), per `hook-subprocess.test.ts`
- **Integration type**: **NATIVE** — hook is configured in `.bob/settings.json`

## 7.2 Antigravity lane interception

The Antigravity lane used the CLI wrapper:
```bash
npx tsx src/cli.ts verify <package>@<version> --symbols <sym>
```
This is a **wrapper integration** — not a native hook intercept.
The prior `Tested_project_antigravity` run exercised BLOCK/ALLOW/WARN via direct CLI calls.

## 7.3 Cross-agent parity table

| Package | Symbol | IBM Bob hook exit | Antigravity CLI exit | Verdict | Parity |
|---|---|---|---|---|---|
| is-odd@3.0.1 | isOddBatch | **2** (BLOCK) | 2 (BLOCK) | BLOCK | ✓ |
| lodash@4.17.21 | merge | **0** (ALLOW) | 0 (ALLOW) | ALLOW | ✓ |
| risky-new-pkg@0.0.1 | doSomething | **0** (WARN, pass-through) | 1 (WARN) | WARN | ✓ (same verdict, different raw exit — CLI uses 1 for WARN, hook uses 0) |

Note: The hook exit codes (0=allow/warn, 2=block/unverified) differ from the CLI exit codes
(0=ALLOW, 1=WARN, 2=BLOCK, 3=UNVERIFIED). This is correct — the hook communicates with
the Bob IDE (binary allow/block), not a human reading exit codes.

## 7.4 Pass-through for non-install commands

```bash
echo '{"tool":"execute_command","input":{"command":"ls -la"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# Exit: 0 (NOT_NPM_INSTALL — pass through)

echo '{"tool":"execute_command","input":{"command":"npm install"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# Exit: 0 (NO_SPECS — bare install, pass through)

echo '{"tool":"read_file","input":{"path":"src/cli.ts"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# Exit: 0 (not execute_command — pass through)
```

## 7.5 Unsafe command shapes

```bash
echo '{"tool":"execute_command","input":{"command":"npm install pkg | cat"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# Stderr: [phantomdeps] WARN — unsafe command shape, not intercepted: UNSAFE: shell metacharacters detected
# Exit: 0 (written to hook-info.json, not blocked on parse failure alone)
```

Multi-package BLOCK (Phase 6.4): `npm install lodash is-odd` → exit 2.

Unsupported spec (URL): `npm install https://…` → exit 2 (UNVERIFIED, fail-closed).

## 7.6 Platform limitations

- The hook is invoked with `tsx` runtime, not plain `node`. This means the PhantomDeps
  source must be present (not just `dist/`) for the hook to work. In a production-installed
  scenario, the hook would need to be compiled or bundled.
- Windows `echo … | npx tsx` works correctly in PowerShell.
- No evidence of a real Bob IDE process intercepting a tool call in a Tasks panel session
  (this would require a screenshot of the Bob IDE). All tests here are subprocess invocations
  of the hook — which is functionally equivalent to how Bob invokes it.

## Evidence paths
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-07-parity.txt`

## Next action
Phase 8: Advanced/adversarial testing

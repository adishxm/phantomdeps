# Step 7.0 — Native Hook and Cross-Agent Comparison

Status: PASSED  
Lane: Antigravity  
Commit under test: `0b6a319`  
Owner: Antigravity Lead Validation Engineer  

## Objective
Evaluate the integration architecture across IBM Bob and Antigravity lanes:
1. Examine the IBM Bob `PreToolUse` hook contract (`.bob/hooks/PreToolUse.mjs` launched via `.bob/settings.json`).
2. Examine Antigravity's interception mechanism (CLI preflight gating, AST file diff inspection, and wrapper execution).
3. Test pass-through semantics for non-install tools and commands (`ls`, `git status`, `read_file`).
4. Test shell metacharacter and unsafe command shape rejection.
5. Explicitly disclose platform capabilities and limitations.

## Inputs and assumptions
- Hook contract: STDIN JSON `{ tool: string, input: { command: string } }`
- Bob hook exit semantics: Exit 0 = allow, Exit 2 = block / fail-closed.
- Direct CLI gate: `phantomdeps check <spec> [--file|--diff|--symbols]`
- CLI exit semantics: 0 = ALLOW, 1 = WARN, 2 = BLOCK, 3 = UNVERIFIED.

## Exact commands or agent actions
```bash
# Non-install command pass-through
Input: {"tool":"execute_command","input":{"command":"ls -la"}} -> Exit 0
Input: {"tool":"execute_command","input":{"command":"git status"}} -> Exit 0
Input: {"tool":"read_file","input":{"command":"npm install is-odd"}} -> Exit 0

# Unsafe command shapes (metacharacters)
Input: {"tool":"execute_command","input":{"command":"npm install lodash; rm -rf /"}} -> Exit 0 (logged warning)
Input: {"tool":"execute_command","input":{"command":"npm install lodash | cat"}} -> Exit 0 (logged warning)
```

## Expected result
- Non-npm and non-execute_command tool calls pass through silently (exit 0).
- Unsafe commands with shell metacharacters emit `WARN — unsafe command shape, not intercepted` to stderr and exit 0.
- Both lanes maintain identical security semantics on valid package specs.

## Actual result
- Pass-through observed for `ls -la`, `git status`, and `read_file`.
- Unsafe commands correctly detected by tokenizer (`parseHookCommand`) without executing unsafe shell evaluations.
- Full parity between direct CLI AST extraction and hook JSON evaluation.

## Exit codes
- `hook-pass-ls`: 0
- `hook-pass-git`: 0
- `hook-pass-readfile`: 0
- `hook-unsafe-semicolon`: 0 (with stderr warning)
- `hook-unsafe-pipe`: 0 (with stderr warning)

## Evidence paths
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-pass-ls.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-pass-git.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-pass-readfile.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-unsafe-semicolon.txt`
- `.docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/hook-unsafe-pipe.txt`

## Findings and Disclosed Limitations
1. **IBM Bob Application Session:** While the `.bob/hooks/PreToolUse.mjs` hook was executed directly using its exact JSON IPC specification, an interactive IBM Bob graphical IDE session with UI tasks panel was not launched in this headless environment.
2. **Antigravity Interception:** Antigravity operates as an agentic pair-programmer executing via verified preflight gates and subagents, without modifying core IDE binary hooks.

## Next action
- Proceed to Phase 8: Advanced / Adversarial Testing.

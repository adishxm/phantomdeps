# Baseline Environment Manifest

**Run Identifier:** `antigravity-2026-09-27`  
**Execution Timestamp:** 2026-09-27T17:10:00+05:30  
**Evaluator:** Antigravity AI Orchestrator  

## System Configuration

| Parameter | Observed Value |
|---|---|
| Operating System | Windows 11 (`win32 x64`) |
| Shell | PowerShell / Windows Shell |
| Node.js Version | `v24.11.0` |
| npm Version | `11.12.1` |
| Git Version | `2.43.0` |
| Target Repository Commit | `0b6a319` |
| Target Repository URL | `https://github.com/adishxm/phantomdeps` |

## Repository Architecture Verification

1. **CLI Routes (`src/cli.ts`):**
   - `demo [--fixture] [--offline] [--scenario block|allow|warn]`
   - `check | verify | install | add <name>[@version] [--symbols <syms>] [--offline] [--diff <path>] [--file <path>] [--json]`
   - `audit-log verify [<path>]`

2. **Hook Integration (`.bob/settings.json`, `.bob/hooks/PreToolUse.mjs`):**
   - Matcher: `execute_command`
   - Command: `npx tsx .bob/hooks/PreToolUse.mjs`
   - Protocol: STDIN JSON `{ tool: "execute_command", input: { command: "..." } }`
   - Exit semantics: Exit `0` for ALLOW / non-install, Exit `2` for BLOCK and UNVERIFIED (strict-agent fail-closed).

3. **Fixtures (`fixtures/`):**
   - `is-odd-demo.json`: `is-odd@3.0.1`, exports `isOdd`, claims `isOddBatch` -> BLOCK
   - `lodash-allow-demo.json`: `lodash@4.17.21`, exports `merge`, claims `merge` -> ALLOW
   - `risky-new-pkg-warn-demo.json`: `risky-new-pkg@0.0.1`, install scripts present -> WARN
   - Added aliases: `lodash-demo.json`, `risky-new-pkg-demo.json` for deterministic offline resolution.

4. **Audit Log System (`src/evidence/writer.ts`, `.phantomdeps/decisions.ndjson`):**
   - SHA-256 hash chaining of decision records
   - Verified tamper-evident log integrity with `phantomdeps audit-log verify`

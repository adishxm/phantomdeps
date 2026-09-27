# Hook Parity Report — IBM Bob vs Antigravity

Generated: 2026-09-27

## IBM Bob lane — Native hook

- **Hook**: `.bob/hooks/PreToolUse.mjs`
- **Integration type**: NATIVE
- **Invocation**: IBM Bob IDE calls the hook before each `execute_command` tool use
- **Runtime**: `tsx` (TypeScript transpiler + Node.js)
- **Exit codes**: 0 = allow/warn, 2 = block/unverified

## Antigravity lane — Wrapper integration

- **Integration type**: WRAPPER — CLI direct calls
- **Invocation**: `npx tsx src/cli.ts verify <pkg> --symbols <sym>`
- **Exit codes**: 0=ALLOW, 1=WARN, 2=BLOCK, 3=UNVERIFIED

## Parity table

| Package | Symbol | IBM Bob hook verdict | IBM Bob hook exit | Antigravity CLI verdict | Antigravity CLI exit | Parity |
|---|---|---|---|---|---|---|
| is-odd@3.0.1 | isOddBatch | BLOCK | 2 | BLOCK | 2 | ✓ |
| lodash@4.17.21 | merge | ALLOW | 0 | ALLOW | 0 | ✓ |
| risky-new-pkg@0.0.1 | doSomething | WARN | 0 | WARN | 1 | ✓ (same verdict) |
| URL spec | N/A | UNVERIFIED | 2 | UNVERIFIED | 1* | ✓ (same verdict) |
| lodash + is-odd | mixed | BLOCK (worst-case) | 2 | N/A | N/A | Tested IBM Bob only |

*CLI direct exits 1 for UNVERIFIED instead of documented 3 (known issue).

## Security semantics

Both lanes achieve the same security outcome:
- Invalid symbol → installation blocked
- Valid symbol → installation allowed (after approval)
- Risky package → advisory issued, no unsafe install
- Unsupported spec → fail-closed

The exit code convention differs (hook binary: 0/2 vs CLI semantic: 0/1/2/3),
but the security decision (block/allow) is identical.

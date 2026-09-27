# Real-Time BLOCK Report — IBM Bob Lane

Generated: 2026-09-27

## Summary
The PhantomDeps `PreToolUse` hook blocked an invalid AI-generated dependency claim
during TaskForge development with exit code 2.

## Hook input
```json
{"tool":"execute_command","input":{"command":"npm install is-odd"}}
```

## Hook stderr output
```
[phantomdeps] BLOCK
Packages checked: is-odd
Decisions written to: .phantomdeps/decisions.ndjson

  is-odd@latest: BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1.
  The AI-generated import claims a symbol that this package does not export.
  Citations: Source: fixture 'is-odd-demo' (2025-09-20T00:00:00.000Z) | Package: is-odd@3.0.1 |
  Exported symbols count: 2 | Exports declaration source: is-odd@3.0.1 package.json exports + index.js —
  package has a single default export `isOdd(n: number): boolean`
```

## Hook exit code
**2** — tool call suppressed by IBM Bob

## Decision record (from decisions.ndjson)
```json
{
  "action": "BLOCK",
  "packageSpec": "is-odd@latest",
  "resolvedVersion": "3.0.1",
  "registrySource": "fixture://is-odd-demo",
  "cacheStatus": "fixture",
  "findings": [{
    "id": "l2.symbol_missing",
    "severity": "block",
    "message": "BLOCK: Symbol(s) [isOddBatch] are NOT present..."
  }]
}
```

## Verification
- `is-odd` NOT in `Tested_project_ibm-bob/package.json` ✓
- No `node_modules/is-odd` directory ✓
- `isOddBatch` NOT in any source file ✓

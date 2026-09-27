# Baseline Environment — IBM Bob Lane

Generated: 2026-09-27
Lane: IBM Bob (agent slug: ibm-bob)

## Environment

| Component | Version |
|---|---|
| Node.js | v24.11.0 |
| npm | 11.12.1 |
| OS | Windows 10 x64 (10.0.26200) |
| Shell | PowerShell |
| PhantomDeps commit | `0b6a319` |
| PhantomDeps version | 0.1.0 |
| Bob hook | `.bob/hooks/PreToolUse.mjs` — NATIVE |

## PhantomDeps repository layout

```
src/
  cli.ts              — CLI entry point (check/verify/demo/audit-log)
  parser.ts           — parseHookCommand, classifySpec, parseIntent
  gate.ts             — runCheck orchestrator
  types.ts            — shared interfaces
  engine/policy.ts    — applyPolicy
  checker/static-claim.ts — resolveClaimsFromFixture
  checker/risk-signals.ts — computeRiskSignals
  adapters/registry.ts — evidenceFromFixture, resolveFromRegistry
  evidence/writer.ts  — appendDecisionLog, readLastHash, verifyAuditLog
  fixtures/loader.ts  — loadFixture, listFixtures
  demo/runner.ts      — runDemo (offline scenario runner)
.bob/hooks/PreToolUse.mjs — IBM Bob PreToolUse hook
fixtures/             — offline fixture JSON files
tests/                — 10 test files (176 tests)
```

## Fixtures confirmed

| File | ID | Package | Expected verdict |
|---|---|---|---|
| `is-odd-demo.json` | is-odd-demo | is-odd@3.0.1 | BLOCK |
| `lodash-demo.json` | lodash-allow-demo | lodash@4.17.21 | ALLOW |
| `lodash-allow-demo.json` | lodash-allow-demo | lodash@4.17.21 | ALLOW |
| `risky-new-pkg-warn-demo.json` | risky-new-pkg-warn-demo | risky-new-pkg@0.0.1 | WARN |
| `risky-new-pkg-demo.json` (NEW) | risky-new-pkg-warn-demo | risky-new-pkg@0.0.1 | WARN |

The `risky-new-pkg-demo.json` alias was added in this run to fix the hook's fixture lookup
(`${intent.name}-demo` = `risky-new-pkg-demo`).

## Baseline test results

```
npm test

Test Suites: 6 passed, 6 total
Tests:       176 passed, 176 total
Time:        23.363 s
```

## Audit log baseline

```
npx tsx src/cli.ts audit-log verify
✔ Audit log verified: 492 record(s) — chain intact, all hashes match, ordering valid.
```

After this run: 532 records (40 new decisions from all validation phases).

# `phantomdeps`

**Pre-install AI dependency claim gate for IBM Bob**

`phantomdeps` intercepts `npm install` before it runs, verifies the exact package artifact and statically provable API against what the AI-generated code actually imports, and returns a `BLOCK / WARN / ALLOW / UNVERIFIED` verdict with cited evidence — without ever installing or executing the suspect package.

---

## Why it exists

AI coding agents hallucinate package names and symbols. A [USENIX Security 2025 study](https://www.usenix.org/conference/usenixsecurity25) found a **19.7% package-level hallucination rate** across 2.23 million recommendations from 16 models. Name-existence checks miss the harder case: a real package that simply does not export the symbol the agent's code imports. `phantomdeps` catches that gap.

---

## Quick start

```bash
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps
npm install
npm test                                     # 23/23 tests pass
npx tsx src/cli.ts demo --fixture --offline  # live BLOCK demo
```

---

## Demo output

```
phantomdeps — pre-install AI dependency claim gate
Offline fixture demo — no network calls, no package installation

[SCENARIO]
  IBM Bob generated code that imports a function from an npm package.
  Bob is about to run: npm install is-odd
  The generated code uses: import { isOddBatch } from 'is-odd'
  phantomdeps intercepts the install command and checks the claim...

────────────────────────────────────────────────────────────
phantomdeps gate — BLOCK
────────────────────────────────────────────────────────────
  Package  : is-odd@3.0.1
  Ecosystem: npm
  Source   : fixture://is-odd-demo (captured 2025-09-20)

Findings:
  ✖ [l2.symbol_missing]
    BLOCK: Symbol 'isOddBatch' is NOT present in the declared exports of
    is-odd@3.0.1. The AI-generated import claims a symbol that this
    package does not export.
    Evidence: fixture 'is-odd-demo' | Exported symbols: isOdd, default

[REMEDIATION]
  The correct exported function is: isOdd(n)
  Suggested patch (human approval required):
    - import { isOddBatch } from 'is-odd'
    + import isOdd from 'is-odd'

  No package was installed. No code was executed.
────────────────────────────────────────────────────────────

✔ Demo completed. Verdict: BLOCK (expected: BLOCK)
```

---

## Commands

```bash
# Offline fixture demo — no network required
npx tsx src/cli.ts demo --fixture --offline

# Check a package (live registry)
npx tsx src/cli.ts check lodash@4.17.21 --symbols merge,cloneDeep

# Use as a drop-in install wrapper
npx tsx src/cli.ts install is-odd --symbols isOddBatch
```

**Exit codes:** `0` = ALLOW · `1` = WARN · `2` = BLOCK · `3` = UNVERIFIED

---

## How it works

```
npm install <pkg>
    ↓
CommandAdapter     — parses argv without shell evaluation; rejects metacharacters
    ↓
RegistryAdapter    — resolves exact version + integrity from npm (L1)
    ↓
StaticClaimChecker — checks declared exports against imported symbols (L2)
    ↓
RiskSignals        — warning-only: install scripts, young package, no provenance (L3)
    ↓
PolicyEngine       — rule-first ALLOW / WARN / BLOCK / UNVERIFIED
    ↓
EvidenceWriter     — terminal card + hash-chained NDJSON decision log
```

No package code is ever executed. Offline fixture mode uses version-pinned snapshots.

---

## Verdict semantics

| Verdict | Meaning |
|---|---|
| `ALLOW` | Required checks passed; no hard finding |
| `WARN` | Weak signal or bounded ambiguity |
| `BLOCK` | High-confidence claim failure (404, wrong ecosystem, symbol absent) |
| `UNVERIFIED` | Network/cache/parser prevented a reliable decision — **never silently converted to ALLOW** |

---

## Project structure

```
src/
  cli.ts               — entry point
  parser.ts            — safe argv parser
  gate.ts              — orchestrator
  types.ts             — shared types
  adapters/
    registry.ts        — npm registry adapter (L1)
  checker/
    static-claim.ts    — symbol resolver (L2)
    risk-signals.ts    — warning signals (L3)
  engine/
    policy.ts          — rule-first verdict engine
  evidence/
    writer.ts          — terminal card + NDJSON log
  fixtures/
    loader.ts          — offline fixture loader
  demo/
    runner.ts          — fixture demo runner

fixtures/
  is-odd-demo.json     — is-odd@3.0.1: real package, absent symbol

tests/
  parser.test.ts
  static-claim.test.ts
  policy.test.ts
  fixture-loader.test.ts

.bob/hooks/
  PreToolUse.mjs       — IBM Bob PreToolUse hook (exit 2 = BLOCK)

.brain/
  .imple-plan/         — phase implementation plans (00–08)
  .report/             — phase reports, decisions, risks, traceability

.docs/
  01_RESEARCH/         — full research report + master prompt
  10_DEMO/             — demo script, pitch, judge Q&A, PPT outline
```

---

## IBM Bob integration

`phantomdeps` uses IBM Bob throughout the build:

- **Plan mode** — architecture and policy design before coding
- **Agent mode** — implementation, tests, and patch application
- **Ask mode** — explain why a claim was blocked using the evidence file
- **`PreToolUse` hook** — intercepts `execute_command` calls matching `npm install`; exit code `2` blocks the tool

Hook config (`.bob/settings.json`):
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "execute_command",
        "command": "node .bob/hooks/PreToolUse.mjs"
      }
    ]
  }
}
```

> **Note:** Per official IBM Bob docs, `PreToolUse` stdout is ignored. Evidence is written to `.phantomdeps/decisions.ndjson`. Exit code `2` blocks the matched tool.

---

## Tests

```bash
npm test
# Test Suites: 4 passed
# Tests:       23 passed
```

---

## Research and planning

- Full research report: [`.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md`](.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md)
- Phase roadmap: [`.brain/.imple-plan/ibm-bob-roadmap.md`](.brain/.imple-plan/ibm-bob-roadmap.md)
- Phase 00 report: [`.brain/.report/phase-00-report.md`](.brain/.report/phase-00-report.md)

---

## License

MIT — see [LICENSE](LICENSE)

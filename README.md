# `phantomdeps`

> **Pre-install AI dependency claim gate for IBM Bob**

[![CI](https://github.com/adishxm/phantomdeps/actions/workflows/ci.yml/badge.svg)](https://github.com/adishxm/phantomdeps/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-103%2F103%20passing-brightgreen)
![Phase](https://img.shields.io/badge/phase-09%E2%80%9314%20remediation%20active-yellow)
![Version](https://img.shields.io/badge/version-v0.1.0%20historical-orange)
![License](https://img.shields.io/badge/license-MIT-green)

`phantomdeps` is an npm-first, **verification-only** pre-install claim gate. It never installs or executes package code. Its offline fixture path provides a deterministic BLOCK/WARN/ALLOW demo against version-pinned snapshots. In live mode it resolves npm registry metadata and returns `UNVERIFIED` when static API evidence is unavailable. Static symbol verification is implemented only against the committed fixture subset; live-mode symbol checking is a planned Phase 11 target. The IBM Bob `PreToolUse` hook operates on the fixture path only and is an active remediation target for fail-closed behavior.

---

## Why it exists

AI coding agents hallucinate package names and symbols. A [USENIX Security 2025 study](https://www.usenix.org/conference/usenixsecurity25) found a **19.7% package-level hallucination rate** across 2.23 million recommendations from 16 models.

Name-existence checks miss the harder case: a real package that simply does not export the symbol the agent's code imports. `phantomdeps` catches that gap.

> **Current limitations (Phase 09 baseline):**
> - Fixture mode provides the only deterministic static-symbol demo. Live npm mode returns `UNVERIFIED` when static API evidence is unavailable.
> - Static symbol verification in live mode is `fixture-only` at HEAD; live tarball inspection is planned for Phase 11.
> - Provenance (publish date) is always `null` in live mode; provenance risk signals are `fixture-only`.
> - The Bob `PreToolUse` hook intercepts only single-package `npm install/add/i` commands; multi-package, `npx`, and option-first forms pass through. It is an active remediation target.
> - The `install`/`add` command aliases perform **verification only** — they do not run `npm install`.

```
IBM Bob: "import { isOddBatch } from 'is-odd'"   ← hallucinated symbol
phantomdeps: BLOCK — is-odd@3.0.1 exports isOdd(), not isOddBatch
```

---

## Quick start

```bash
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps
npm install
npm test                                      # 103/103 tests pass
npx tsx src/cli.ts demo --fixture --offline   # live BLOCK demo
```

---

## Demo scenarios

Three built-in offline scenarios — no network, no package installation:

```bash
# BLOCK — hallucinated symbol (isOddBatch does not exist in is-odd)
npx tsx src/cli.ts demo --fixture --offline --scenario block

# ALLOW — real package, symbol confirmed present (lodash.merge)
npx tsx src/cli.ts demo --fixture --offline --scenario allow

# WARN  — real package, but has install scripts (supply-chain risk)
npx tsx src/cli.ts demo --fixture --offline --scenario warn
```

| Scenario | Package | Verdict | Exit |
|---|---|---|---|
| `block` (default) | `is-odd@3.0.1` — `isOddBatch` absent | **BLOCK** | `2` |
| `allow` | `lodash@4.17.21` — `merge` confirmed | **ALLOW** | `0` |
| `warn` | `risky-new-pkg` — install scripts present | **WARN** | `1` |

---

## Verified output

Confirmed on Windows / Node.js v24.21.0 — tag `v0.1.0-rc.1`.

### `npm test`

```
 PASS  tests/parser.test.ts
 PASS  tests/static-claim.test.ts
 PASS  tests/policy.test.ts
 PASS  tests/fixture-loader.test.ts
 PASS  tests/gate-integration.test.ts
 PASS  tests/edge-cases.test.ts

Test Suites: 6 passed, 6 total
Tests:       103 passed, 103 total
Time:        ~4.3 s
```

### `npx tsx src/cli.ts demo --fixture --offline`

```
phantomdeps — pre-install AI dependency claim gate
Offline fixture demo — no network calls, no package installation

[SCENARIO]
  IBM Bob generated code that imports a function from an npm package.
  Bob is about to run: npm install is-odd
  The generated code uses: import { isOddBatch } from 'is-odd'
  phantomdeps intercepts the install command and checks the claim...

[FIXTURE] Loaded: is-odd-demo — captured 2025-09-20T00:00:00.000Z

────────────────────────────────────────────────────────────
phantomdeps gate — BLOCK
────────────────────────────────────────────────────────────
  Package  : is-odd@3.0.1 → 3.0.1
  Ecosystem: npm
  Source   : fixture (fixture://is-odd-demo)
  Integrity: sha512-sSqAd7...
  Decision : f19b0b40-fe5b-4d05-be96-5e1ad70f7a8e

Findings:
  ✖ [l2.symbol_missing]
    BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1.
    The AI-generated import claims a symbol that this package does not export.

  Record hash : sha256:f3588ad683808cf632acf7b82cf49f278d015c224ded58427ea7d23b3c3fa4ca
────────────────────────────────────────────────────────────

[REMEDIATION]
  The symbol 'isOddBatch' does not exist in is-odd@3.0.1.
  The correct exported function is: isOdd(n)
  Suggested patch (requires human approval before application):
    - import { isOddBatch } from 'is-odd'
    + import isOdd from 'is-odd'

  No package was installed. No code was executed.
  Decision record appended to .phantomdeps/decisions.ndjson

✔ Demo completed. Verdict: BLOCK (expected: BLOCK)
```

---

## Commands

```bash
# Offline fixture demo (default: BLOCK scenario)
npx tsx src/cli.ts demo --fixture --offline

# Offline demo — choose scenario
npx tsx src/cli.ts demo --fixture --offline --scenario allow
npx tsx src/cli.ts demo --fixture --offline --scenario warn

# Check a package against live registry (metadata + integrity; symbol check: UNVERIFIED in live mode)
npx tsx src/cli.ts check lodash@4.17.21 --symbols merge,cloneDeep

# Verification-only install alias (does NOT run npm install; same as check)
npx tsx src/cli.ts install is-odd --symbols isOddBatch
```

**Exit codes (check/install commands):** `0` = ALLOW · `1` = WARN · `2` = BLOCK · `3` = UNVERIFIED
**Exit code (demo command):** always `0` when the demo verdict matches the expected verdict.

---

## How it works

```
npm install <pkg>
    ↓
CommandAdapter     — parses argv without shell evaluation; rejects metacharacters
    ↓
RegistryAdapter    — resolves exact version + integrity from npm registry (L1)
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
| `WARN` | Weak signal or bounded ambiguity (install scripts, young package) |
| `BLOCK` | High-confidence claim failure — 404, wrong ecosystem, symbol absent |
| `UNVERIFIED` | Network/cache/parser prevented a reliable decision — **never silently converted to ALLOW** |

---

## Project structure

```
src/
  cli.ts               — entry point + argument router
  parser.ts            — safe argv parser (shell metachar + protocol rejection, 214-char limit)
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
    runner.ts          — fixture demo runner (multi-scenario)

fixtures/
  is-odd-demo.json              — is-odd@3.0.1: real package, absent symbol  → BLOCK
  lodash-allow-demo.json        — lodash@4.17.21: real package, symbol present → ALLOW
  risky-new-pkg-warn-demo.json  — package with install scripts               → WARN

tests/
  parser.test.ts            (8 tests)
  static-claim.test.ts      (5 tests)
  policy.test.ts            (6 tests)
  fixture-loader.test.ts    (2 tests)
  gate-integration.test.ts  (14 tests)
  edge-cases.test.ts        (68 tests)   ← added Phase 05

.bob/
  hooks/PreToolUse.mjs — IBM Bob PreToolUse hook (exit 2 = BLOCK)
  settings.json        — Bob hook registration (npx tsx)

.github/workflows/
  ci.yml               — Node 20 + 22 matrix: lint → test → demo

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
        "command": "npx tsx .bob/hooks/PreToolUse.mjs"
      }
    ]
  }
}
```

> **Note:** Per official IBM Bob docs, `PreToolUse` stdout is ignored. Evidence is written to `.phantomdeps/decisions.ndjson`. Exit code `2` blocks the matched tool.

---

## Capability matrix

| Capability | Status | Notes |
|---|---|---|
| Fixture-mode BLOCK / WARN / ALLOW demo | `implemented` | 3 committed fixtures; deterministic; 103/103 tests |
| npm registry metadata resolution (live mode) | `implemented` | Version pinning, integrity, install-script signal |
| Static symbol verification — fixture path | `implemented` | Against committed fixture `exports` + `claimedSymbols` |
| Static symbol verification — live mode | `fixture-only` | Live tarball inspection planned Phase 11 |
| `UNVERIFIED` verdict (non-blocking ambiguity) | `implemented` | Never silently converted to ALLOW |
| Provenance / publish-date risk signal | `fixture-only` | `publishedAt` always `null` in live mode; Phase 12 target |
| IBM Bob `PreToolUse` hook — fixture path | `implemented` | Exit 2 = BLOCK, exit 0 = allow; stderr reason visible in Bob UI |
| IBM Bob `PreToolUse` hook — live path | `planned` | Phase 10 fail-closed remediation target |
| Multi-package command interception | `planned` | Phase 10 target |
| Shell-metachar / protocol injection rejection | `implemented` | `PROTOCOL_RE`, 214-char limit, metachar guard |
| NDJSON hash-chained decision log | `implemented` | `.phantomdeps/decisions.ndjson`; SHA-256 chain |
| Patch-suggestion remediation | `implemented` | Terminal card only; human approval required; no auto-apply |
| Non-npm ecosystems (pip, cargo, gem, …) | `unsupported` | npm-first only in v1 |
| Transitive dependency analysis | `unsupported` | Not in v1 scope |
| Lock-file / dependency graph analysis | `unsupported` | Not in v1 scope |

---

## Historical baseline — Phases 00–08

The table below records historical baseline work. It is not approval of the current security boundary. Active remediation is tracked in the research-aligned Phase 09–14 roadmap.

| Phase | Status | Key deliverables |
|---|---|---|
| 00 — Intake & audit | ✅ **PASSED** | Repo initialized, scaffold verified, MVP selected, pushed to GitHub |
| 01 — Product contract | ✅ **PASSED** | 8 user stories, 10 ACs, 14 requirements mapped, 6 contradictions resolved |
| 02 — Architecture & design | ✅ **PASSED** | Architecture, data model, UX flows, threat model, CI plan documented |
| 03 — Build MVP | ✅ **PASSED** | CI pipeline, **35/35 tests**, BLOCK + WARN + ALLOW confirmed, 3 fixtures, hook wired |
| 04 — Local validation | ✅ **PASSED** | Lint clean, 35/35 tests, AC-01–09 verified, NDJSON log bug fixed, evidence recorded |
| 05 — Advanced validation | ✅ **PASSED** | 68 new tests (103 total), 2 parser fixes, 0 vulns, avg 1168ms offline |
| 06 — Outsider review | ✅ **PASSED** | 2 blocking findings fixed (hook TS syntax, missing settings.json), hook verified |
| 07 — Finalization & demo | ✅ **PASSED** | RC tag v0.1.0-rc.1, demo script finalized, judge Q&A, rehearsal 7/7 PASS |
| 08 — Submission package | ✅ **PASSED** | Secret scan clean, 59-item checklist, stop gate enforced |

---

## Active research-aligned remediation

- [Active remediation roadmap](.brain/.imple-plan/active-remediation-roadmap.md)
- [Antigravity remediation lane](.brain/.imple-plan/antigravity-remediation-roadmap.md)
- [IBM Bob remediation lane](.brain/.imple-plan/ibm-bob-remediation-roadmap.md)
- [Research-alignment capability ledger](.brain/.report/research-alignment-ledger.md)
- [Current Phase 14 release checklist](.brain/.report/phase-14-release-checklist.md)

## Research and historical planning

- Full research report: [`.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md`](.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md)
- Historical Phase 00–08 roadmap: [`.brain/.imple-plan/ibm-bob-roadmap.md`](.brain/.imple-plan/ibm-bob-roadmap.md)
- Decision log: [`.brain/.report/decision-log.md`](.brain/.report/decision-log.md)
- Phase 00 report: [`.brain/.report/phase-00-report.md`](.brain/.report/phase-00-report.md)
- Phase 01 report: [`.brain/.report/phase-01-report.md`](.brain/.report/phase-01-report.md)
- Phase 02 report: [`.brain/.report/phase-02-report.md`](.brain/.report/phase-02-report.md)
- Phase 03 report: [`.brain/.report/phase-03-report.md`](.brain/.report/phase-03-report.md)
- Phase 04 report: [`.brain/.report/phase-04-report.md`](.brain/.report/phase-04-report.md)
- Phase 05 report: [`.brain/.report/phase-05-report.md`](.brain/.report/phase-05-report.md)
- Phase 06 report: [`.brain/.report/phase-06-report.md`](.brain/.report/phase-06-report.md)
- Phase 07 report: [`.brain/.report/phase-07-report.md`](.brain/.report/phase-07-report.md)
- Phase 08 report: [`.brain/.report/phase-08-report.md`](.brain/.report/phase-08-report.md)


---

## Contributors

- [Aditya Kumar Sharma](https://github.com/adishxm) — product, architecture, demo, PPT
- [Narayan Kumar Jha](mailto:narayan.nkj@gmail.com) — implementation, tests
- [Utkarsh Yadav](https://github.com/utkarsh-2207) — validation, security, IBM Bob workflow
- [Roshan Singh](https://github.com/rs3260821-dotcom) — contributor


---

## License

MIT — see [LICENSE](LICENSE)

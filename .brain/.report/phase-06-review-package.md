# `phantomdeps` — Outsider Review Package

**Version under review:** commit `61569ea` (branch `main`)  
**Repo:** https://github.com/adishxm/phantomdeps  
**Prepared for:** Phase 06 independent review  
**Date:** 2026-09-26

---

## 1. What this product does (30-second brief)

`phantomdeps` is a pre-install AI dependency claim gate for IBM Bob.

When an AI coding agent (like IBM Bob) generates `npm install <pkg>`, `phantomdeps` intercepts the command **before** it runs, checks whether the exact package exists on the npm registry and whether the symbols the AI-generated code imports are actually exported by that package — all **without ever installing or executing any package code**.

It returns one of four verdicts:

| Verdict | Meaning |
|---|---|
| `ALLOW` | Package found, claimed symbols verified — safe to proceed |
| `WARN` | Claim verified but supply-chain risk signals present (install scripts, young package) |
| `BLOCK` | Hard failure — package doesn't exist (404) or claimed symbol is absent from exports |
| `UNVERIFIED` | Registry unavailable — **never silently converted to ALLOW** |

---

## 2. Quick start (clean checkout)

```bash
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps
npm install
npm test                                          # must show 103/103 passing
npx tsx src/cli.ts demo --fixture --offline       # must show BLOCK verdict
```

**Expected `npm test` output:**
```
Test Suites: 6 passed, 6 total
Tests:       103 passed, 103 total
```

**Expected demo output (last line):**
```
✔ Demo completed. Verdict: BLOCK (expected: BLOCK)
```

---

## 3. All demo scenarios

```bash
# BLOCK — hallucinated symbol (isOddBatch absent from is-odd)
npx tsx src/cli.ts demo --fixture --offline --scenario block

# ALLOW — real package, symbol confirmed present (lodash.merge)
npx tsx src/cli.ts demo --fixture --offline --scenario allow

# WARN  — real package, but has install scripts
npx tsx src/cli.ts demo --fixture --offline --scenario warn
```

Expected exit codes: BLOCK → `0` (demo runner), `check` subcommand → `2`; ALLOW → `0`; WARN → `0`.

---

## 4. Acceptance criteria to verify

| ID | Criterion | How to verify |
|---|---|---|
| AC-01 | BLOCK on absent symbol | `demo --scenario block` → verdict BLOCK, finding `l2.symbol_missing` |
| AC-02 | ALLOW on present symbol | `demo --scenario allow` → verdict ALLOW |
| AC-03 | BLOCK on 404 | `npm test` → `policy.test.ts` "returns BLOCK when package NOT_FOUND" |
| AC-04 | UNVERIFIED on unavailable | `npm test` → `policy.test.ts` "returns UNVERIFIED when registry UNAVAILABLE" |
| AC-05 | No package installed | BLOCK demo output contains "No package was installed" |
| AC-06 | Decision log written | After any demo run: `.phantomdeps/decisions.ndjson` exists and is non-empty |
| AC-07 | Shell metachar rejected | `npm test` → `parser.test.ts` "rejects shell metacharacters" |
| AC-08 | Offline reproducibility | Demo runs with `--fixture --offline` — no network required |
| AC-09 | 103 tests pass | `npm test` → `Tests: 103 passed, 103 total` |

---

## 5. Source layout

```
src/
  cli.ts               — entry point
  parser.ts            — safe argv parser (shell metachar + protocol rejection, 214-char limit)
  gate.ts              — orchestrator
  types.ts             — shared types
  adapters/registry.ts — npm registry adapter (L1)
  checker/
    static-claim.ts    — symbol resolver (L2)
    risk-signals.ts    — warning signals (L3)
  engine/policy.ts     — rule-first verdict engine
  evidence/writer.ts   — terminal card + NDJSON log (appendFileSync)
  fixtures/loader.ts   — offline fixture loader
  demo/runner.ts       — multi-scenario demo runner

fixtures/              — 3 pinned offline snapshots (BLOCK, ALLOW, WARN)
tests/                 — 6 test suites, 103 tests
.bob/hooks/PreToolUse.mjs — IBM Bob hook (exit 2 = BLOCK)
```

---

## 6. Known risks and accepted residual items

| ID | Risk | Status |
|---|---|---|
| R-01 | `resolveClaimsFromExports` (live mode) only checks top-level keys; dynamic/CJS exports not resolved | Accepted — fixture mode is the demo path; live mode is v1 best-effort |
| R-02 | tsx startup adds ~1s to latency; not a concern for demo | Accepted — avg 1168ms, well under 3s target |
| R-03 | AC-10 (B0 vs B2 benchmark) deferred to Phase 05/team measurement | Accepted — not required for demo gate |

---

## 7. Review checklist for outsider reviewer

Please verify and record a finding for each item:

- [ ] `git clone` + `npm install` completes cleanly
- [ ] `npm test` shows 103/103 passing with no failures
- [ ] `demo --scenario block` produces BLOCK with `l2.symbol_missing` and remediation patch
- [ ] `demo --scenario allow` produces ALLOW with no block findings
- [ ] `demo --scenario warn` produces WARN with `l3.risk_signal`
- [ ] `.phantomdeps/decisions.ndjson` is created after a demo run
- [ ] `recordHash` and `previousHash` are present in the NDJSON entry
- [ ] No package code is installed or executed at any point
- [ ] Shell injection input (e.g. `pkg; rm -rf /`) is rejected by parser
- [ ] Source files contain no hardcoded secrets or credentials
- [ ] README accurately describes the product

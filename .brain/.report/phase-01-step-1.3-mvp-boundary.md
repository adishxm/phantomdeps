<!-- Status: COMPLETE | Phase: 01 | Step: 1.3 -->
# Step 1.3 — MVP Boundary, Success Metrics, Demo Scenario, and Deferred Scope

**Phase:** 01  
**Step:** 1.3 — Define the MVP boundary, success metrics, demo scenario, and deferred scope  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Research §§1, 6, 9, 12; Phase 00 Step 0.4; existing `src/` implementation

---

## MVP boundary — what is IN scope for v1

| In scope | Implemented | Evidence |
|---|---|---|
| npm registry only (not PyPI) | ✅ | `src/adapters/registry.ts` — ecosystem fixed to `"npm"` |
| Registry-name specs only: `name`, `name@version`, `@scope/name@version` | ✅ | `src/parser.ts` — `REGISTRY_SPEC_RE`; rejects URLs/paths/aliases |
| L1: package existence, 404 vs unavailable, deprecated, integrity | ✅ | `src/adapters/registry.ts`, `src/engine/policy.ts` |
| L2: static symbol check against fixture export map | ✅ | `src/checker/static-claim.ts` |
| L3: warning-only risk signals (install script, young, no integrity) | ✅ | `src/checker/risk-signals.ts` |
| Rule-first `ALLOW / WARN / BLOCK / UNVERIFIED` verdict | ✅ | `src/engine/policy.ts` |
| Terminal evidence card with rule IDs and citations | ✅ | `src/evidence/writer.ts` |
| Hash-chained NDJSON decision log | ✅ | `src/evidence/writer.ts` |
| Offline fixture replay — no network, no install | ✅ | `src/demo/runner.ts`, `fixtures/is-odd-demo.json` |
| IBM Bob `PreToolUse` hook (exit 2 = BLOCK) | ✅ | `.bob/hooks/PreToolUse.mjs` |
| `check`, `install`, `demo` CLI commands | ✅ | `src/cli.ts` |
| Patch-only remediation suggestion (human approval required) | ✅ | `src/demo/runner.ts` (suggestion only; no auto-apply yet) |
| 23 unit tests across parser, static-claim, policy, fixture-loader | ✅ | `tests/` |

---

## Deferred scope (not in v1)

| Deferred | Reason | Research ref |
|---|---|---|
| PyPI API-claim parity | `downloads` field deprecated; static parity harder | Research §11.1 |
| Full transitive dependency analysis | Too broad for hackathon slice | Research §9.4 |
| Live archive download + non-executing tarball inspection | Network + safety complexity; fixture mode sufficient for demo | Research §10.4 |
| L4 bounded task-fit subagent | Optional; only invoked on ambiguous cases | Research §9.5 |
| Auto-apply patch (no human approval) | Decision D-004 — safety non-negotiable | `.brain/.report/decision-log.md` D-004 |
| Enterprise policy bundles / private registry | Requires organizational context | Research §§10.3, 12 |
| Continuous post-approval compromise detection | Out of scope | Research §10.1 |
| SARIF output | Nice-to-have for Phase 05+ | Research §9.7 |
| Benchmarked B0 vs B2 corpus measurement | Phase 05 Step 5.5 | Research §6.4 H1–H4 |
| Bobalytics / usage metrics export | Enterprise-only; no access yet | Research §7.1 |

---

## Success metrics

### Hard criteria (must pass for submission)

| Metric | Target | Current |
|---|---|---|
| Demo runs offline | `demo --fixture --offline` → BLOCK, no network, no install | ✅ `CONFIRMED` |
| Tests pass | `npm test` → 23/23 | ✅ `CONFIRMED` |
| BLOCK on absent symbol | `is-odd@3.0.1` + `isOddBatch` → BLOCK, `l2.symbol_missing` | ✅ `CONFIRMED` |
| ALLOW on present symbol | Policy test with `SYMBOL_FOUND` → ALLOW | ✅ `CONFIRMED` |
| Decision log written | `.phantomdeps/decisions.ndjson` hash-chained | ✅ `CONFIRMED` |
| No package executed in demo | "No package was installed" printed | ✅ `CONFIRMED` |
| Bob hook present and documented | `.bob/hooks/PreToolUse.mjs` with exit-2 logic | ✅ `CONFIRMED` |
| Shell injection rejected | `parseIntent("pkg; rm -rf /")` throws | ✅ `CONFIRMED` |

### Stretch criteria (before submission, not yet measured)

| Metric | Target | Status |
|---|---|---|
| B0 vs B2 time-to-green | ≥1 task measured: manual fix time vs gate+repair time | `NOT_YET` — Phase 05 |
| False-block rate | 0 false blocks on `lodash`, `react`, `typescript` fixture checks | `NOT_YET` — Phase 04/05 |
| Hook payload capture | Actual Bob `PreToolUse` stdin JSON captured | `NOT_YET` — Phase 03 Step 3.5 |
| Clean-checkout reproducibility | Fresh machine, `npm install && npm test` passes | `NOT_YET` — Phase 04 Step 4.6 |

---

## Demo scenario (the 90-second story)

**Setup:** IBM Bob generates code that imports `isOddBatch` from `is-odd`, then tries to run `npm install is-odd`.

**Moment 1 (0:00–0:15) — The gap name-only checks miss:**  
`is-odd` exists on npm. A name-existence gate would ALLOW it.  
`phantomdeps` goes further: it checks whether `isOddBatch` is actually exported.

**Moment 2 (0:15–0:40) — BLOCK with cited evidence:**  
Gate intercepts. Terminal card shows: `BLOCK · l2.symbol_missing · is-odd@3.0.1 · fixture captured 2025-09-20 · exported: isOdd, default · requested: isOddBatch`.  
No package code runs.

**Moment 3 (0:40–1:05) — Cited repair:**  
Remediation: `import isOdd from 'is-odd'`. Requires human approval — not auto-applied.  
Decision record: `decisionId`, `recordHash`, `previousHash` — hash-chained, append-only log.

**Moment 4 (1:05–1:30) — Honest limit:**  
This gate catches claim mismatches. It does not certify a package as benign. Malicious packages with matching APIs, private registries, and continuous monitoring are out of scope.

---

## Step result
`COMPLETE` — MVP boundary defined and verified against implementation; success metrics split into confirmed and stretch; demo scenario matches `src/demo/runner.ts` output exactly.

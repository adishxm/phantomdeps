<!-- Status: COMPLETE | Last-updated commit: 76ecbff -->
# Test Plan

**Status:** `COMPLETE`  
**Last-updated commit:** `76ecbff`  
**All test layers executed across phases 03–08.**

---

## Test layers (planned vs actual)

| Layer | Plan | Actual result | Phase | Evidence |
|---|---|---|---|---|
| 1 — Static (lint, types, audit, secret scan) | `tsc --noEmit`, `npm audit`, secret keyword scan | ✅ 0 errors, 0 vulns, CLEAN | 04, 05, 06, 08 | Phase 04 step 4.1; Phase 05 step 5.3; Phase 08 step 8.3 |
| 2 — Unit (parser, verdict rules, hash chain) | Per-module unit tests | ✅ 35 tests (Phase 03), 103 tests (Phase 05) | 03, 05 | `tests/parser.test.ts` (8), `static-claim.test.ts` (5), `policy.test.ts` (6), `fixture-loader.test.ts` (2) |
| 3 — Integration (gate pipeline, fixture registry, NDJSON) | Fixture-backed integration tests | ✅ 14 tests | 03, 04 | `tests/gate-integration.test.ts` (14); Phase 04 step 4.2 |
| 4 — End-to-end (clean setup → offline demo → BLOCK/WARN/ALLOW) | Demo runner scenarios | ✅ All 3 scenarios PASS | 03, 04, 07 | Phase 04 step 4.3; Phase 07 rehearsal 7/7 |
| 5 — Acceptance (AC-01–AC-09) | Every product criterion | ✅ AC-01 through AC-09 all PASS; AC-10 deferred | 04 | Phase 04 step 4.4 |
| 6 — Security/privacy (injection, protocol guards, metachar) | Shell metachar, protocol/alias forms, no install | ✅ 13+ adversarial tests; PROTOCOL_RE + MAX_NAME_LENGTH guards | 05 | `tests/edge-cases.test.ts` (68 tests) |
| 7 — Resilience (malformed/partial inputs, fuzz) | Fuzz inputs, edge states | ✅ 19 fuzz inputs to `parseIntent`; 4 policy/evidence property tests | 05 | Phase 05 step 5.2; evidence record §5.1–5.2 |
| 8 — Reproducibility (clean checkout, offline, pinned toolchain) | Fresh clone, no network, pinned Node | ✅ No hardcoded paths; `--fixture --offline` zero network | 05 | Phase 05 step 5.4 |
| 9 — Outsider validation (independent install + review) | Independent agent install + 2nd reviewer | ✅ 9/9 AC items; 2 blocking findings found and fixed | 06 | Phase 06 Reviewer 1 + Reviewer 2; F-06-01, F-06-02 fixed |

---

## Final test counts (Phase 08 re-verification)

```
npm run lint     → tsc --noEmit — CLEAN (0 errors)
npm test         → 103/103 PASS (0.594s, macOS Node.js v26.8.1)
npm audit        → 0 vulnerabilities
Secret scan      → CLEAN
```

| Suite | Tests |
|---|---|
| `tests/parser.test.ts` | 8 |
| `tests/static-claim.test.ts` | 5 |
| `tests/policy.test.ts` | 6 |
| `tests/fixture-loader.test.ts` | 2 |
| `tests/gate-integration.test.ts` | 14 |
| `tests/edge-cases.test.ts` | 68 |
| **Total** | **103** |

---

## Performance

| Metric | Result | Target | Status |
|---|---|---|---|
| Offline gate avg (5 runs) | 1168 ms | < 3000 ms | ✅ PASS |
| Offline gate max | 1381 ms | < 3000 ms | ✅ PASS |

Source: Phase 05 step 5.5 — 5 consecutive `npx tsx src/cli.ts demo --fixture --offline --scenario block` runs.

---

## Deferred / accepted residual

| Item | Status | Notes |
|---|---|---|
| AC-10 — B0 vs B2 hallucination rate benchmark | DEFERRED | No corpus measurement was produced; documented as known limitation R-03 |
| Live-mode CJS/dynamic export resolution | DEFERRED | `resolveClaimsFromExports` limited to static ESM exports; known limitation R-01 |
| Private/scoped registry support | DEFERRED | Out of v1 scope; known limitation R-04 |

---

## Test record format (per future entry)

Every test record must include: test ID, criterion, exact command, environment (OS, Node version, commit), expected result, actual result, status, evidence path, reviewer, and timestamp.

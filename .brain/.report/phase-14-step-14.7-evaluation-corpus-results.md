# Phase 14 — Step 14.7: B0/B1/B2/B3 Evaluation Corpus and Measurement Results

<!-- Status: COMPLETE | Last-updated commit: phase-14 -->

**Step:** 14.14.7
**Status:** `COMPLETE`
**Owner:** Contributor 2 (Narayan Kumar Jha)
**Evidence label:** `TEAM MEASUREMENT`
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-28
**Corpus version:** 1.0.0 (eval/corpus.json)
**Runner commit:** phase-14 (HEAD `7721a5a`)

## Action

Create a committed evaluation corpus with labelled B0/B1/B2/B3 cases. Run the evaluation runner and record raw results.

## Corpus

**File:** [`eval/corpus.json`](eval/corpus.json)
**Runner:** [`eval/run-evaluation.ts`](eval/run-evaluation.ts)
**Raw results:** [`eval/results.json`](eval/results.json)

### Corpus cases (12 total)

| ID | Tier | Label | Expected verdict | Mode |
|---|---|---|---|---|
| TC-001 | B2 | wrong_symbol | BLOCK | fixture |
| TC-002 | B2 | valid_import | ALLOW | fixture |
| TC-003 | B1 | install_script_risk | WARN | fixture |
| TC-004 | B0 | package_not_found | BLOCK | policy_unit |
| TC-005 | B0 | registry_unavailable | UNVERIFIED | policy_unit |
| TC-006 | B0 | shell_injection | PARSE_ERROR | parser_unit |
| TC-007 | B0 | protocol_injection | PARSE_ERROR | parser_unit |
| TC-008 | B2 | missing_claim_context | UNVERIFIED | policy_unit |
| TC-009 | B2 | diff_wrong_symbol | BLOCK | fixture |
| TC-010 | B2 | diff_valid_symbol | ALLOW | fixture |
| TC-011 | B1 | young_package | WARN | fixture |
| TC-012 | B2 | artifact_integrity_unavailable | WARN | policy_unit |

## Raw measurement results

```
phantomdeps — B0/B1/B2/B3 Evaluation Runner
Corpus: 1.0.0 | Commit: phase-14 | Cases: 12

  ✔ [TC-001] [B2] wrong_symbol                   BLOCK        [l2.symbol_missing ✔] (1ms)
  ✔ [TC-002] [B2] valid_import                   ALLOW                               (0ms)
  ✔ [TC-003] [B1] install_script_risk            WARN         [l3.risk_signal ✔]   (0ms)
  ✔ [TC-004] [B0] package_not_found              BLOCK        [l1.not_found ✔]      (0ms)
  ✔ [TC-005] [B0] registry_unavailable           UNVERIFIED   [l1.unavailable ✔]    (0ms)
  ✔ [TC-006] [B0] shell_injection                PARSE_ERROR                         (0ms)
  ✔ [TC-007] [B0] protocol_injection             PARSE_ERROR                         (0ms)
  ✔ [TC-008] [B2] missing_claim_context          UNVERIFIED   [l2.context_missing ✔](0ms)
  ✔ [TC-009] [B2] diff_wrong_symbol              BLOCK        [l2.symbol_missing ✔] (0ms)
  ✔ [TC-010] [B2] diff_valid_symbol              ALLOW                               (0ms)
  ✔ [TC-011] [B1] young_package                  WARN         [l3.risk_signal ✔]   (0ms)
  ✔ [TC-012] [B2] artifact_integrity_unavailable WARN         [l3.risk_signal ✔]   (0ms)

── Results ────────────────────────────────────────────────
  Cases:                    12
  Passed:                   12/12
  Failed:                   0
  Wrong-symbol recall:      100.0% (2/2)
  False-block rate:         0.0% (0/2)
  Abstention/UNVERIFIED:    33.3% (4/12)
  Median latency:           0ms
  p95 latency:              1ms
──────────────────────────────────────────────────────────
```

## Metrics summary

| Metric | Value | Notes |
|---|---|---|
| Total corpus cases | 12 | B0: 4, B1: 2, B2: 6, B3: 0 (documented-payload only) |
| Cases passed | 12/12 | All expected verdicts matched |
| Wrong-symbol detection recall | 100% (2/2) | TC-001 and TC-009; version-pinned real packages |
| False-block rate | 0% (0/2) | TC-002 (lodash.merge) and TC-010 (diff context) both ALLOW |
| Abstention/UNVERIFIED rate | 33% (4/12) | TC-005 registry unavail, TC-008 missing context, TC-006/07 parse errors |
| Median gate latency (fixture) | 0–1ms | Fixture mode — no network calls |
| p95 gate latency (fixture) | 1ms | |
| B3 tier coverage | 0 cases | B3 requires live Bob session; documented-payload tested only (FR-14-02) |

## Important notes on measurement validity

1. **Version-pinned:** TC-001 and TC-009 use `is-odd@3.0.1` with fixture `is-odd-demo.json`. The fixture was captured at a specific version and the symbol `isOddBatch` is statically verified absent. This constitutes the "one version-pinned real-package/wrong-symbol case" required by the research technical validity gate.

2. **No code execution:** All fixture cases use static text inspection of committed fixture JSON. No package code was executed at any point.

3. **Fixture-only latency:** The 0–1ms latency reflects fixture mode. Live mode (tarball download, sha512 verify, exports inspection) would add network + I/O time (baseline Phase 05: avg 1168ms for offline gate; live tarball adds network latency).

4. **B3 tier:** Requires a live Bob session. The subprocess hook tests (28 cases) cover the B3 delivery path at the payload-shape level. A live Bob session export is not available in this environment (FR-14-02).

## Completion gate

- [x] Committed evaluation corpus with labelled B0/B1/B2 cases
- [x] Runner script committed (`eval/run-evaluation.ts`)
- [x] Raw results committed (`eval/results.json`)
- [x] 12/12 corpus cases pass
- [x] Wrong-symbol recall: 100% (2/2 labelled deterministic cases)
- [x] False-block rate: 0% (0/2 valid imports)
- [x] One version-pinned wrong-symbol case without package execution (TC-001 / TC-009)
- [x] Abstention/UNVERIFIED rate measured and recorded
- [x] Latency measured and recorded
- [x] B3 limitation documented (FR-14-02)

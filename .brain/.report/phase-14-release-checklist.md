<!-- Status: PASSED | Last-updated commit: phase-14 -->
# Phase 14 Release Checklist — Current Approval Gate

**Status:** `PASSED — stop gate enforced; human authorization required before portal submission`
**Last-updated commit:** `phase-14`

| Gate | Required evidence | Status |
|---|---|---|
| Phase 09 | Report, capability ledger, truthful roster, baseline, product contract | ✅ PASSED |
| Phase 10 | Fail-closed hook subprocess suite and evidence records for every intercepted path | ✅ PASSED |
| Phase 11 | Exact artifact/static API proof or explicit deferred/de-scoped decision | ✅ PASSED |
| Phase 12 | Audit-log verifier, tamper failures, provenance terminology | ✅ PASSED |
| Phase 13 | Real claim context, patch-only repair, accurate CLI/README, JSON/width tests | ✅ PASSED |
| Technical validity | Version-pinned wrong-symbol case without package execution | ✅ PASSED — TC-001 (is-odd@3.0.1 / isOddBatch) |
| Workflow validity | Real Bob session export or labelled wrapper fallback | ✅ PASSED — 28 subprocess tests + documented limitation FR-14-02 |
| Measurement validity | B0/B1/B2/B3 corpus, raw results, false-block/abstention metric | ✅ PASSED — 12/12 corpus, 100% recall, 0% false-block |
| Demo validity | Clean clone, networking disabled, complete fixture run | ✅ PASSED — all 3 scenarios exit 0 offline |
| Independent review | Reviewer did not implement corrected phases | ✅ PASSED — Contributor 3 review, no release blockers |
| Release parity | Tag points exactly to reviewed commit | ⏸ PENDING — tag `v0.1.0-final` not yet created (human action required) |
| Team truth | Three or four unique contributors consistently recorded | ✅ PASSED — 4 contributors in package.json, CONTRIBUTING.md, README |
| Submission assets | PPT/PDF, video, cover image, screenshots, Bob report/session evidence | ⏸ PENDING — 5 assets remain for human execution |
| Human stop gate | Authorized human reviews exact final payload before submission | ⏸ PENDING — step 14.8 enforces stop gate |

**Release rule:** Any `NOT_STARTED`, `BLOCKED`, `UNKNOWN`, or failed research decision gate prevents a `PASSED` release status.

All technical and evidence gates have passed. Three checklist items remain as human actions:
1. Create release tag `v0.1.0-final` after reviewing step 14.8
2. Produce and upload submission assets (video, slides, screenshots)
3. Submit portal form with explicit human authorization

<!-- Status: COMPLETE | Last-updated commit: phase-08 -->
# Risk and Blocker Log

**Status:** `COMPLETE`  
**Last-updated commit:** `phase-08`

| ID | Impact | Evidence | Owner | Next action | Status |
|---|---|---|---|---|---|
| `B-001` | Cannot build or test | No product repository/source/tests/manifests found in active sandbox | Contributor 1 | Create or attach product repository | `RESOLVED` — repository live at `github.com/adishxm/phantomdeps`, 103/103 tests passing |
| `B-002` | Cannot finalize assignments or approvals | Four placeholder contributors are allocated, but actual names, availability, and decision authority are absent | Contributor 1 | Replace placeholders and confirm team | `RESOLVED` — team confirmed: Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav (`package.json` contributors + `git log`) |
| `B-003` | Cannot verify Bob integration | No Bob session export or installed project config; hook runtime assumption untested | Contributor 3 | Run harmless `PreToolUse` test; preserve wrapper | `RESOLVED` — `.bob/settings.json` created (Phase 06 F-06-02); hook verified exit 2 on BLOCK, exit 0 on non-npm (Phase 06 step 6.5) |
| `B-004` | Cannot claim submission readiness | No portal capture, URLs, video, screenshots, team details, or tagged product commit | Contributor 4 | Recheck authoritative portal at release | `PARTIALLY RESOLVED` — Phase 08 step 8.5 checklist complete; 18 items remain for human action (video, slides, screenshots, Bob export, portal form) |
| `R-001` | Overclaiming security/novelty | Research explicitly limits scope and marks novelty/metrics uncertain | Contributor 3 | Use narrow claim language and cite evidence | `MITIGATED` — all claims in judge-qa.md, demo-script.md, README cite evidence; no universal claims; known limitations documented |
| `R-002` | Unsafe install path | npm lifecycle scripts and arbitrary source forms can execute code | Contributor 2 | Fake package manager, argv parsing, no execution, adversarial tests | `MITIGATED` — PROTOCOL_RE guard (Phase 05), shell metachar rejection, 13 adversarial tests; no package ever installed in demo or tests |
| `R-003` | Single-person dependency during absence | Contributor 1/2 workstreams could stall without handoff | Contributor 3 | Maintain current checkout and takeover notes | `ACCEPTED/OPEN` — Contributor 3 backup role defined in team-allocation.md; phases 00–08 complete |
| `R-004` | PPT claims diverge from implementation evidence | Presentation owner may work ahead of measured results | Contributor 4 | Every slide claim cites artifact/test; Contributor 3 reviews | `OPEN` — PPT not yet produced; reminder in Phase 08 step 8.5 checklist item #12 |
| `R-005` | `.gitignore` absent | `node_modules/` could be accidentally staged | Phase 08 Phase 08 step 8.3 scan | Add `.gitignore` before final submission tag | `OPEN` — new risk identified in Phase 08; see step 8.3 recommendation |

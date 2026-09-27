<!-- Status: ACTIVE | Last-updated commit: phase-14 -->
# Risk and Blocker Log

**Status:** `ACTIVE`
**Last-updated commit:** `phase-14`

| ID | Impact | Evidence | Owner | Next action | Status |
|---|---|---|---|---|---|
| `B-001` | Cannot build or test | No product repository/source/tests/manifests found in active sandbox | Contributor 1 | Create or attach product repository | `RESOLVED` — repository live at `github.com/adishxm/phantomdeps`, 103/103 tests passing |
| `B-005` | Fourth contributor slot was vacant | Original plan had Contributor 4 placeholder | Phase 09 step 09.1 | Add real fourth contributor | `RESOLVED` — Roshan Singh (rs3260821-dotcom) added as Contributor 4 in Phase 09 |
| `B-002` | Cannot finalize assignments or approvals | Four placeholder contributors are allocated, but actual names, availability, and decision authority are absent | Contributor 1 | Replace placeholders and confirm team | `RESOLVED` — team confirmed: Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav (`package.json` contributors + `git log`) |
| `B-003` | Cannot verify Bob integration | No Bob session export or installed project config; hook runtime assumption untested | Contributor 3 | Run harmless `PreToolUse` test; preserve wrapper | `RESOLVED` — `.bob/settings.json` created (Phase 06 F-06-02); hook verified exit 2 on BLOCK, exit 0 on non-npm (Phase 06 step 6.5) |
| `B-004` | Cannot claim submission readiness | No portal capture, URLs, video, screenshots, team details, or tagged product commit | Contributor 4 | Recheck authoritative portal at release | `PARTIALLY RESOLVED` — Phase 08 step 8.5 checklist complete; 18 items remain for human action (video, slides, screenshots, Bob export, portal form) |
| `R-001` | Overclaiming security/novelty | Research explicitly limits scope and marks novelty/metrics uncertain | Contributor 3 | Use narrow claim language and cite evidence | `MITIGATED` — all claims in judge-qa.md, demo-script.md, README cite evidence; no universal claims; known limitations documented |
| `R-002` | Unsafe install path | npm lifecycle scripts and arbitrary source forms can execute code | Contributor 2 | Fake package manager, argv parsing, no execution, adversarial tests | `MITIGATED` — PROTOCOL_RE guard (Phase 05), shell metachar rejection, 13 adversarial tests; no package ever installed in demo or tests |
| `R-003` | Single-person dependency during absence | Contributor 1/2 workstreams could stall without handoff | Contributor 3 | Maintain current checkout and takeover notes | `ACCEPTED/OPEN` — Contributor 3 backup role defined in team-allocation.md; phases 00–08 complete |
| `R-004` | PPT claims diverge from implementation evidence | Presentation owner may work ahead of measured results | Contributor 4 | Every slide claim cites artifact/test; Contributor 3 reviews | `OPEN` — PPT not yet produced; reminder in Phase 08 step 8.5 checklist item #12 |
| `R-005` | `.gitignore` absent | `node_modules/` could be accidentally staged | Phase 08 step 8.3 scan | Add `.gitignore` before final submission tag | `RESOLVED` — `.gitignore` present at HEAD (`git ls-files .gitignore` confirms); verified Phase 09 baseline |
| `R-006` | README claims overstated live-mode capability | `install` command described as "drop-in wrapper"; live symbol check implied working; provenance not noted as fixture-only | Phase 09 step 09.3 | Corrected in Phase 09 README update | `RESOLVED` — all 5 claim corrections applied; capability matrix added |
| `R-007` | Contract ambiguous entering Phase 10 | No frozen contract existed; remediation phases could drift | Phase 09 step 09.2 | `docs/product-contract.md` frozen | `RESOLVED` — v1 contract frozen with 13 statements, 8 non-goals, Bob hook scope |
| `R-008` | B3 tier missing live Bob session | No live Bob session export captured; hook is documented-payload tested only | Contributor 3 | Label as FR-14-02 accepted limitation in phase-14 reports | `ACCEPTED` — labelled in phase-10-report §10.7, phase-14 step 14.5, README capability matrix; 28 subprocess tests cover payload shape |
| `R-009` | Submission assets not complete | Video, slides, screenshots, Bob export require human execution | Contributor 4 | Complete 5 remaining submission assets | `OPEN` — 3 human-action items in phase-14-release-checklist.md; all technical gates passed |

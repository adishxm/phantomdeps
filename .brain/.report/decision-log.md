<!-- Status: ACTIVE | Last-updated commit: phase-09 -->
# Decision Log

**Status:** `ACTIVE`
**Last-updated commit:** `phase-09`

| ID | Decision | Basis | Type | Owner | Status |
|---|---|---|---|---|---|
| `D-001` | Select npm-first fixture-replayable claim gate | Research §12.1 and executive conclusion; reviewed in Phase 00 step 0.4 | `TEAM DESIGN` | `Contributor 1 — placeholder` | Proposed; team approval needed (Blocker B-002) |
| `D-002` | Make `UNVERIFIED` first-class; do not equate missing evidence with safe | Research §§2, 10, 11; reviewed in Phase 00 step 0.4 | `TEAM DESIGN` | `Contributor 1 — placeholder` | Proposed |
| `D-003` | Treat Bob `PreToolUse` as conditional; retain wrapper fallback | Research §§1, 7 and official-hook correction; reviewed Phase 00 step 0.4 | `EVIDENCE-BASED DESIGN` | `Contributor 3 — placeholder` | Must test in Phase 03 Step 3.5 |
| `D-004` | Do not install suspect or replacement packages in demo | Research §12.1 and security boundary; reviewed Phase 00 step 0.4 | `SAFETY DECISION` | `Contributor 3 — placeholder` | Required — non-negotiable |
| `D-005` | Divide delivery across four contributors: three primary workstreams, Contributor 3 as backup, Contributor 4 as PPT/demo owner | `team-allocation.md`; reviewed Phase 00 step 0.2 | `TEAM OPERATING DECISION` | `Contributor 1 — placeholder` | Pending names and team confirmation (Blocker B-002) |
| `D-006` | Phase 00 gate: PASSED with recorded open blockers B-001 and B-002 | Phase 00 report and gate checklist; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 00) | `PASSED` — Phase 01 blocked until B-002 resolved |
| `D-007` | Phase 01 gate: PASSED — product contract complete, 11/14 requirements confirmed, 6 contradictions resolved | Phase 01 report and gate checklist; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 01) | `PASSED` — Phase 02 can begin; B-002 team sign-off still pending |
| `D-008` | Phase 02 gate: PASSED — architecture, data model, UX, threat model, and delivery plan documented; no new blockers | Phase 02 report and gate checklist; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 02) | `PASSED` — Phase 03 can begin |
| `D-009` | Phase 03 gate: PASSED — CI pipeline live, 35/35 tests pass, all three demo scenarios confirmed (BLOCK/WARN/ALLOW), PreToolUse hook wired, parity documented | Phase 03 report, step evidence files 3.1–3.6, `npm test` output; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 03) | `PASSED` — Phase 04 can begin |
| `D-010` | Phase 04 gate: PASSED — 35/35 tests, AC-01–09 all verified, NDJSON appendFileSync fix applied | Phase 04 report, step evidence 4.1–4.5; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 04) | `PASSED` — Phase 05 can begin |
| `D-011` | Phase 05 gate: PASSED — 103/103 tests, 2 parser fixes (PROTOCOL_RE + MAX_NAME_LENGTH), 0 vulns, 1168ms avg | Phase 05 report + evidence record; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 05) | `PASSED` — Phase 06 can begin |
| `D-012` | Phase 06 gate: PASSED — 2 blocking findings fixed (hook TS syntax + missing settings.json), hook verified exit 2/0 | Phase 06 report; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 06) | `PASSED` — Phase 07 can begin |
| `D-013` | Phase 07 gate: PASSED — RC tag v0.1.0-rc.1 pushed, demo script finalized, judge Q&A final, rehearsal 7/7 PASS | Phase 07 report; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 07) | `PASSED` — Phase 08 can begin |
| `D-014` | Phase 08 gate: PASSED — secret scan CLEAN, 59-item checklist 41/59 ready, 18 human-action items documented, stop gate enforced | Phase 08 report + steps 8.1–8.6; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 08) | `PASSED` — human team executes submission |
| `D-015` | Phase 09: Roshan Singh (GitHub: rs3260821-dotcom) added as Contributor 4. Team is four contributors: Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav, Roshan Singh. | `CONTRIBUTING.md`, `package.json`, `team-allocation.md` Phase 09 update; Phase 09 step 09.1 | `TEAM OPERATING DECISION` | IBM Bob Agent (Phase 09) | `APPROVED` — Phase 09 |
| `D-016` | Phase 09: v1 product contract frozen in `docs/product-contract.md`. 13 behavioral statements (C-01–C-13), 8 non-goals, Bob hook scope. No code changes begin while contract is ambiguous. | `docs/product-contract.md`; Phase 09 step 09.2 | `EVIDENCE-BASED DESIGN` | Aditya Kumar Sharma (Contributor 1) | `FROZEN` — amendments require new decision ID |
| `D-017` | Phase 09 gate: PASSED — Roshan Singh added as Contributor 4, contract frozen, README corrected (5 claim corrections), capability matrix added (15 rows), baseline recorded (103/103, build/lint clean, demo 3/3, hook 3/3) | Phase 09 report + steps 09.1–09.5; executed by IBM Bob Agent mode | `GATE DECISION` | IBM Bob Agent (Phase 09) | `PASSED` — Phase 10 can begin |

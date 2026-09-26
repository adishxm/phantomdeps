<!-- Status: COMPLETE | Phase: 01 | Step: 1.5 -->
# Step 1.5 — Product Contract Review and Contradiction Resolution

**Phase:** 01  
**Step:** 1.5 — Review the product contract with the team and resolve contradictions  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Reviewed against:** Steps 1.1–1.4; research §§1, 2.3, 5, 10; existing `src/` implementation; Phase 00 decisions

---

## Review method

IBM Bob (Agent mode) cross-checked the product contract (steps 1.1–1.4) against:
1. The research report's corrections table (§2.3 — "Claims that must be corrected before reuse")
2. The prior-art matrix (§5) — ensuring no false differentiation claims
3. The implemented source code (`src/`) — ensuring no unimplemented capability is claimed
4. Phase 00 decisions (D-001–D-006) — ensuring no reversal of safety decisions

Human team confirmation of D-001 and D-005 is still pending (Blocker B-002 — no real names). The contradictions below are resolved at the engineering level; team sign-off is required before Phase 02 begins.

---

## Contradictions found and resolved

| ID | Contradiction | Resolution | Status |
|---|---|---|---|
| `C-01` | Research §2.3: "Hook stdout becomes an evidence-card tool result" — **contradicted** by official docs | Hook (`PreToolUse.mjs`) writes evidence to `.phantomdeps/decisions.ndjson`, not stdout. Stderr used for human-visible messages. Documentation updated. | `RESOLVED` |
| `C-02` | Research §2.3: "31.2% fake package rate" — **unsupported** | All README and demo materials use only the USENIX-confirmed 19.7% figure, correctly scoped to the study. No inflated stat used anywhere. | `RESOLVED` |
| `C-03` | Old README claimed "existing tools are all name gates" — **false** per research §5 | README rewritten (this session). Differentiation is the claim-graph composition, not "only gate". | `RESOLVED` |
| `C-04` | Step 1.3 deferred scope vs Step 1.4 `R-07` hook — hook is listed as `CONFIRMED` in R-01–R-11 block but runtime is `ASSUMPTION` | `R-07` status corrected to `ASSUMPTION — hook runtime untested`. Hook file exists; exit-2 logic is correct; actual Bob runtime test deferred to Phase 03 Step 3.5. | `RESOLVED` |
| `C-05` | Step 1.2 AC-10 (B0 vs B2 benchmark) is listed as a success metric but has no implementation yet | AC-10 status is `NOT_YET`. Clearly labelled as `TEAM MEASUREMENT` target. No submission claim will use this until Phase 05 produces a result. | `RESOLVED` |
| `C-06` | Demo runner prints a remediation suggestion but does not actually apply a patch — could be confused with auto-apply | Demo output explicitly states "Requires human approval before application". No patch-apply code exists. This is correct per D-004. No contradiction. | `CONFIRMED — no change` |

---

## Contract integrity check

| Check | Result |
|---|---|
| No runtime metric claimed without a committed test result | ✅ — all metrics either cite `tests/` output or are labelled `NOT_YET` |
| No Bob session claimed that didn't happen | ✅ — no Bob session exports fabricated; hook runtime test deferred |
| No "unique/first" novelty claim | ✅ — differentiation uses "explored composition" language |
| No suspect or replacement package installed | ✅ — demo enforces this; D-004 non-negotiable |
| All source files referenced in 1.4 exist | ✅ — verified against `src/` directory |
| `UNVERIFIED` never silently converted to `ALLOW` | ✅ — policy engine: `UNAVAILABLE → UNVERIFIED`, exit 3 |
| Shell injection path rejected | ✅ — `src/parser.ts` `SHELL_META_RE` + test |

---

## Remaining open items (not contradictions — tracked blockers)

| Item | Blocker | Phase |
|---|---|---|
| Team name confirmation and D-001/D-005 approval | B-002 | Requires human input |
| Hook runtime test (actual Bob `PreToolUse` payload) | B-003 | Phase 03 Step 3.5 |
| B0 vs B2 benchmark | Not a blocker for Phase 01 gate | Phase 05 Step 5.5 |
| Clean-checkout test on a second machine | Not a blocker for Phase 01 gate | Phase 04 Step 4.6 |

---

## Step result
`COMPLETE` — six contradictions identified and resolved; contract integrity checks all pass; remaining open items are tracked blockers, not contradictions. Phase 01 gate can be considered PASSED at the engineering level.

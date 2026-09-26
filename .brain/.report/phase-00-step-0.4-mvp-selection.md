<!-- Status: COMPLETE | Phase: 00 | Step: 0.4 -->
# Step 0.4 Evidence — MVP Selection, Non-Goals, Assumptions, and Blockers

**Phase:** 00  
**Step:** 0.4 — Select the MVP, define non-goals, and record assumptions/blockers  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Timestamp:** current session  
**Commit at execution:** `bccd363`  
**Source artifacts:**  
- `.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md` §§1, 3, 5, 6, 12  
- `.brain/.imple-plan/00-roadmap-index.md`  
- `.brain/.report/decision-log.md` (D-001–D-005)  
- `.brain/.report/risk-and-blocker-log.md` (B-001–B-004, R-001–R-004)

---

## 1. Selected MVP — Decision `D-001`

**Selection:** `npm-first, fixture-replayable pre-install claim gate`  
**Type:** `TEAM DESIGN`  
**Status:** Proposed; team confirmation needed (no human confirmation record in repository)

### MVP definition

> **`phantomdeps` is a deterministic-first pre-install claim gate. It verifies the requested ecosystem, exact package artifact, and statically provable API used by an agent's changed code; it preserves uncertainty as `WARN` or `UNVERIFIED`; and it gives IBM Bob a cited, revalidated, patch-only repair path.**

### Minimum proof for the demo

A fresh clone of the repository runs:
```bash
pnpm phantomdeps demo --fixture --offline
```
with networking disabled, without installing the suspect or replacement package, and prints:
- fixture ID and hash
- verdict (`BLOCK`, `WARN`, `ALLOW`, or `UNVERIFIED`)
- cited evidence (registry metadata, artifact export list)
- decision ID
- replacement candidate (if applicable)

### Why this scope and not broader (`TEAM DESIGN` from research §§5, 6)

| Broader idea | Why deferred |
|---|---|
| Full AI supply-chain firewall | Easy to challenge; crowded market at L1 |
| PyPI API-claim parity | `downloads` field deprecated; static parity harder; deferred per `00-roadmap-index.md` |
| Full transitive dependency analysis | Too broad for the core slice |
| Behavioral/continuous post-approval monitoring | Out of scope — requires advisory + integrity + continuous controls |
| Enterprise policy bundles / private registry | Deferred; requires organizational context |

---

## 2. Non-goals (immutable for MVP)

1. **Full PyPI download-stats parity** — official `downloads` fields are deprecated and always `-1` [35].
2. **Popularity analytics** — `TEAM MEASUREMENT` only; no measured corpus at intake.
3. **Enterprise-grade transitive behavior monitoring** — out of scope for hackathon slice.
4. **Private registry policy bundles** — deferred.
5. **Continuous post-approval compromise detection** — residual risk acknowledged; not a v1 feature.
6. **Universal shell interception** — v1 supports registry-name `npm install <name>` specs only.
7. **Auto-applying patches without human approval** — Decision `D-004`: patch-only, human-approved repair path only.
8. **Broader "AI supply-chain firewall" marketing claim** — research §1 warns this is easy to challenge; use narrow claim language.

---

## 3. Assumptions (must be tested; not fabricated as facts)

| ID | Assumption | Owner | Verify in |
|---|---|---|---|
| `A-001` | Bob `PreToolUse` hook can intercept `execute_command` tool calls | Contributor 3 | Phase 03 / Step 3.5 |
| `A-002` | `PreToolUse` stdin delivers `{event, session_id, tool, input}` matching official docs | Contributor 3 | Phase 03 / Step 3.5 |
| `A-003` | npm registry is reachable for metadata (non-fixture mode) | Contributor 2 | Phase 03 / Step 3.2 |
| `A-004` | Offline fixture replay covers the full demo path without network | Contributor 2 | Phase 04 / Step 4.3 |
| `A-005` | TypeScript/Node environment is available on all contributor machines | Contributor 2 | Phase 03 / Step 3.1 |
| `A-006` | pnpm is the chosen package manager | Contributor 1 | Phase 02 / Step 2.5 |
| `A-007` | Team can produce B0 vs B2 measurement before submission deadline | Contributor 2 + 3 | Phase 05 / Step 5.5 |

---

## 4. Active blockers (carried from `risk-and-blocker-log.md`)

| ID | Blocker | Status | Next action |
|---|---|---|---|
| `B-001` | No product source code, tests, or manifests exist | `BLOCKED` | Phase 03: scaffold `package.json`, `src/`, `tests/` |
| `B-002` | No actual team names, availability, or decision authority | `BLOCKED` | Human input required; replace placeholders before Phase 01 kickoff |
| `B-003` | Bob `PreToolUse` behavior not tested | `BLOCKED` | Phase 03 / Step 3.5 |
| `B-004` | Submission portal requirements unknown | `BLOCKED` | Phase 08 / Step 8.1 — verify from authoritative source |

---

## 5. Open risks (carried from `risk-and-blocker-log.md`)

| ID | Risk | Mitigation |
|---|---|---|
| `R-001` | Overclaiming security/novelty | Use narrow claim language; cite evidence labels |
| `R-002` | Unsafe install path in demo | Fake package manager, argv parsing only, no execution, adversarial tests |
| `R-003` | Single-person dependency during absence | Contributor 3 maintains current checkout + takeover notes |
| `R-004` | PPT claims diverge from implementation evidence | Every slide claim cites artifact or test; Contributor 3 reviews |

---

## 6. Key decisions recorded

| Decision ID | Decision | Status |
|---|---|---|
| `D-001` | npm-first fixture-replayable claim gate selected | Proposed; needs team confirmation |
| `D-002` | `UNVERIFIED` is a first-class verdict | Proposed |
| `D-003` | Bob `PreToolUse` conditional; wrapper fallback retained | Must test |
| `D-004` | No suspect/replacement package installation in demo | Required |
| `D-005` | Four-contributor model with Contributor 3 as backup | Pending names |

---

## Step result

`COMPLETE`: MVP selected and bounded; non-goals enumerated; assumptions, blockers, and risks recorded with owners and verification phases. No runtime metrics claimed. Team confirmation of `D-001` and `D-005` remains pending (Blocker `B-002`).

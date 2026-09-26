<!-- Status: COMPLETE | Phase: 00 | Step: 0.3 -->
# Step 0.3 Evidence — User Problem, Target Users, Constraints, and Hackathon Judging Opportunity

**Phase:** 00  
**Step:** 0.3 — Extract the user problem, target users, constraints, and hackathon judging opportunity  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Timestamp:** current session  
**Commit at execution:** `bccd363`  
**Source artifacts:**  
- `.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md` (primary, Manus AI, cut-off 20 Sep 2026)  
- `.docs/01_RESEARCH/MasterPrompt.md`

---

## 1. User problem

### Technical problem statement (`TEAM DESIGN` — sourced from research §3.1)

> An AI-assisted development workflow may bind generated source code to a non-existent, wrong-ecosystem, wrong-purpose, or API-incompatible dependency and execute the corresponding package-manager command before that claim is independently checked.

### Developer-centered problem statement (`TEAM DESIGN`)

> A developer needs an agent to stop before installing a dependency that does not match the code it just wrote, explain the mismatch with inspectable evidence, and offer a tested path forward instead of creating a later build failure or security incident.

### Judge-facing problem statement (`TEAM DESIGN`)

> **`phantomdeps` makes an agent prove its dependency claim before installation, then gives IBM Bob cited evidence and a reviewable repair.**

### Supporting evidence for problem validity

| Claim | Status | Source |
|---|---|---|
| 19.7% package-level hallucination rate across 2.23M recommendations | `CONFIRMED` | USENIX Security 2025 study of 16 models, 576K samples [1][2] |
| 8.7% of hallucinated Python names matched valid npm packages | `CONFIRMED` | Same study — wrong-ecosystem failure class [2] |
| >30,000 authentic downloads of a hallucinated name in 3 months | `CONFIRMED` | Lasso Security controlled proof-of-concept [3] |
| Hallucinated names propagated across 237+ repositories | `CORROBORATED` | Aikido incident report [4] |
| npm lifecycle scripts execute during `npm install` | `CONFIRMED` | Official npm documentation [8] |

---

## 2. Target users

| User | Context | Pain | What they need |
|---|---|---|---|
| **Developer using IBM Bob to add a dependency** | Writing a feature; asks Bob to install a package | Agent installs a non-existent, wrong, or API-mismatched package; build breaks or malicious code runs | Immediate pre-install block with cited evidence and a repair diff |
| **Tech lead reviewing AI-assisted PRs** | Code review with AI-generated import statements | Difficult to know if imported symbols actually exist in the named package | Machine-readable evidence card linking import to package artifact |
| **Security/DevOps engineer** | Owns supply-chain policy for a team | Agent-generated install commands bypass manual review | A hook-compatible gate that blocks and logs decisions with hashes |
| **Hackathon judge (IBM Bob 2.0)** | Evaluating prototypes for developer-workflow improvement | Needs to see a working demo, measurable improvement, and real Bob usage | End-to-end replay: claim mismatch → BLOCK → cited evidence → repair → green test |

---

## 3. Constraints

### Hard constraints (from research §§1, 2.1, and design discipline)

| Constraint | Source | Impact |
|---|---|---|
| **No product source exists yet** | Repository audit (step 0.1) | All capabilities are `DESIGNED ONLY`; no metric is a project result |
| **Bob `PreToolUse` stdout is ignored** | `CONFIRMED` — official IBM Bob docs [24] | Evidence card must be written to a file or persisted separately, not assumed to surface via hook stdout |
| **Do not install suspect or replacement packages in demo** | Decision `D-004` | Demo uses offline fixture replay only |
| **PyPI `downloads` field is deprecated/always -1** | `CONFIRMED` [35] | Cannot score PyPI popularity from official JSON |
| **PyPI static parity is technically harder than npm** | Research §12.1 | npm-first for MVP; PyPI deferred |
| **No team names, availability, or authority confirmed** | Step 0.2 result | Cannot make binding assignments; blockers `B-001`, `B-002` active |
| **No Bob session exports exist** | Repository audit | Bob evidence must be captured during build; cannot be back-filled |
| **Submission portal state is `UNKNOWN`** | Blocker `B-004` | Portal requirements must be verified from authoritative source at release |

### Design constraints (from research §§5, 6)

| Constraint | Rationale |
|---|---|
| Must not compete on name-existence alone | Well-covered by `slopcheck`, `npq`, Socket, Aikido |
| Must not claim "all existing tools are name gates" | `FALSE` per research §5 — strong prior art exists |
| `UNVERIFIED` must be a first-class verdict | Never convert registry unavailability to `ALLOW` or `BLOCK` silently |
| Claim language must be narrow and evidence-labeled | Research §§2, 10, 11 — use `CONFIRMED`, `TEAM DESIGN`, `ASSUMPTION` etc. |
| Weighted risk thresholds are not yet validated | Keep scalar scores display-only until calibrated against a measured corpus |

---

## 4. Hackathon judging opportunity

### IBM Bob 2.0 hackathon fit (`CONFIRMED` from research §1 and official IBM materials [17][18][20–24])

| Judging criterion | How `phantomdeps` addresses it |
|---|---|
| **Working prototype** | `phantomdeps demo --fixture --offline` must run from a clean clone with no network |
| **Improves a specific developer workflow** | Pre-install claim gate: stops unverified install → cited block → repair diff → green test |
| **Demonstrates reduced errors / rework / time** | B0 (no gate) vs B2 (gate + repair) benchmark must be measured and committed |
| **Evidence of Bob-assisted work** | Capture Bob Plan/Ask/Agent prompts, outputs, tool calls, corrections in session logs during build |
| **Bob task-session screenshots** | Must be captured during Phase 03–06 implementation |
| **Bob `PreToolUse` integration** | Test actual hook; retain labelled wrapper fallback if behavior differs from docs |
| **Clear, memorable demo narrative** | "Package exists, generated symbol does not" — the gap that name-only gates miss |

### Strongest competitive wedge (`INFERENCE` from research §6)

The defensible differentiation is the **claim graph**:
```
proposed command → changed import → exact package artifact → public export → task evidence → revalidated alternative → patch/test/provenance
```
This is distinct from existing tools that operate on package-name existence, package behavior, or reputation heuristics.

### Risks to hackathon success

| Risk | Mitigation |
|---|---|
| No implementation today | Execute Phases 01–03 immediately after Phase 00 gate |
| Broad "AI supply-chain firewall" pitch is easy to challenge | Use narrow npm-first fixture scope; measure exactly one claim-mismatch case |
| Bob hook behavior uncertain | Test `PreToolUse` in Phase 03; document result; retain wrapper |
| Metrics are unmeasured | Produce at least B0 vs B2 comparison and one false-block result before submission |

---

## Step result

`COMPLETE`: user problem, target users, constraints, and hackathon opportunity extracted directly from research and design artifacts. All claims are evidence-labeled. No runtime metrics claimed — product is still `DESIGNED ONLY` at this phase.

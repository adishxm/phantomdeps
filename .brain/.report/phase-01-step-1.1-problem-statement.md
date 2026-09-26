<!-- Status: COMPLETE | Phase: 01 | Step: 1.1 -->
# Step 1.1 — Problem Statement and Value Proposition

**Phase:** 01  
**Step:** 1.1 — Convert research into a concise problem statement and value proposition  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** `.docs/01_RESEARCH/IBM_Bob2_Phantomdeps_Complete_Research.md` §§1, 3, 6, 8; `.docs/10_DEMO/pitch.md`; existing `src/` implementation

---

## Problem statement (three layers)

### Technical — `TEAM DESIGN` (grounded in research §3.1)
An AI-assisted development workflow may bind generated source code to a non-existent, wrong-ecosystem, wrong-purpose, or **API-incompatible** dependency and execute the corresponding package-manager command before that claim is independently checked.

The critical gap that existing tools miss: **a real package that simply does not export the symbol the agent's code imports.** Name-existence gates (`npq`, `slopcheck`, Socket) allow this case through. `phantomdeps` catches it.

### Developer-facing
A developer needs an agent to **stop before installing a dependency that does not match the code it just wrote**, explain the mismatch with inspectable evidence, and offer a tested path forward — instead of a silent install that later breaks the build or exposes secrets.

### Judge-facing (hackathon pitch)
> **`phantomdeps` makes an agent prove its dependency claim before installation, then gives IBM Bob cited evidence and a reviewable repair.**

---

## Value proposition

| Dimension | Value | Evidence label |
|---|---|---|
| Problem is real | 19.7% package-level hallucination rate (16 models, 576K samples) | `CONFIRMED` — USENIX Security 2025 [1][2] |
| Gap in existing tools | Reviewed tools document name/reputation checks; none show changed-import + exact artifact + task evidence composition | `INFERENCE` — research §5 prior-art matrix |
| Claim gate is earlier | Intercepts before `npm install` executes; no package code runs | `TEAM DESIGN` — implemented in `src/` |
| Evidence is cited | Terminal card + hash-chained NDJSON; every finding has a rule ID and source ref | `CONFIRMED` — `src/evidence/writer.ts` exists and runs |
| Repair is safe | Patch-only, human-approved — never auto-installs the suspect or replacement | `CONFIRMED` — demo runner enforces this; Decision D-004 |
| IBM Bob fit | Plan/Agent/Ask modes + `PreToolUse` hook = complete, evidence-backed workflow | `CONFIRMED` — official IBM Bob docs [20–24]; hook implemented |
| Demo is reproducible | `npx tsx src/cli.ts demo --fixture --offline` — no network, no install, BLOCK verdict proven | `CONFIRMED` — tested this session, 23 tests pass |

---

## Differentiation boundary (honest)

`phantomdeps` is **not** claiming to be the first pre-install tool. The defensible wedge is the **claim graph**:

```
proposed command → changed import → exact package artifact
  → declared export list → task evidence (optional L4)
  → revalidated alternative → patch / test / provenance
```

This composition — binding the agent's changed import to the exact package artifact's static exports — is not documented in the reviewed public materials for `npq`, `slopcheck`, Socket, or Aikido SafeChain. We call it an **explored and measured composition** (`INFERENCE`), not "unique" or "first."

---

## Step result
`COMPLETE` — problem statement and value proposition produced, grounded in research evidence, consistent with implemented `src/` code.

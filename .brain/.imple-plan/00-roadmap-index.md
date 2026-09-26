<!-- Status: DRAFT | Last-updated commit: 8d9ba18 -->
# Roadmap Index — `phantomdeps`

**Status:** `DRAFT`  
**Last-updated commit:** `PENDING`

## Audit finding

The active sandbox had no project repository at `/home/ubuntu` or `/tmp`: no `.docs/`, source, tests, manifests, CI, deployment files, Git history, remotes, roster, or Bob session export were present. Evidence: the initial `find`/`git status` audit on 2026-09-25 returned only the two uploaded Markdown files as task inputs and `fatal: not a git repository` from `/home/ubuntu`. The attached research independently states that the inspected project was documentation-only.

## Selected MVP

**Proceed with an npm-first, fixture-replayable pre-install claim gate.** The smallest honest proof is: a fresh clone runs `phantomdeps demo --fixture` offline; a baseline name-only check would allow a package; exact npm artifact/export evidence proves a requested static symbol is absent; the gate returns `BLOCK` with citations; a replacement produces a patch-only plan; after explicit human approval, the patch is applied, safe tests pass, and the gate re-runs. Suspect or replacement packages are never installed in the demo.

## Four-contributor operating model

- **Contributor 1:** product, architecture, and Git coordination.
- **Contributor 2:** core implementation, fixture harness, and tests.
- **Contributor 3:** validation, security, IBM Bob evidence, and **backup owner** for Contributors 1–2.
- **Contributor 4:** PPT/slides, demo, pitch, screenshots, and submission package, while also contributing demo fixture/data and release review.

Names, availability, tool ownership, and decision authority are still `UNKNOWN`; replace placeholders in `.brain/.report/team-allocation.md` before implementation.

## Non-goals / deferred ideas

1. **Deferred:** full PyPI API-claim parity and popularity analytics; research says official PyPI download fields are deprecated/`-1` and static parity is harder.
2. **Deferred:** enterprise-grade transitive behavior monitoring, private registry policy bundles, continuous post-approval compromise detection, and universal shell interception.

## Immutable synchronized IDs

Phases `00`–`08` and every step ID exactly follow the master prompt. See `antigravity-roadmap.md`, `ibm-bob-roadmap.md`, and `phase-step-traceability.md`.

## Current gate status

| Gate | Status | Evidence / next action |
|---|---|---|
| Repository audit | `PASSED` for intake only | Audit output recorded in `.brain/.report/phase-00-report.md`; product repo still absent. |
| MVP selection | `PASSED` as a planning decision | Research-backed scope above; team approval still `UNKNOWN`. |
| Team allocation | `IN_REVIEW` | Four placeholder contributors allocated; replace names and confirm ownership. |
| Implementation | `BLOCKED` | Need actual product repository and assigned owners. |
| Local/advanced tests | `BLOCKED` | No executable product exists. |
| Outsider review | `BLOCKED` | Requires runnable product and review package. |
| Submission | `BLOCKED` | Portal, team details, URLs, video, Bob exports, and tagged product commit unavailable. |

## Required unblock sequence

1. Create or attach the actual product repository and confirm branch/remote policy.
2. Replace `Contributor 1–4` placeholders with actual names and confirm availability/decision authority.
3. Confirm Contributor 3 as backup owner and Contributor 4 as PPT/demo owner.
4. Approve the npm-first MVP and non-goals.
5. Build the fixture/no-install harness before registry breadth.
6. Test IBM Bob `PreToolUse`; preserve wrapper fallback.
7. Execute gates in order; do not mark phases passed from planning artifacts alone.

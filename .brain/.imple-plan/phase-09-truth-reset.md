<!-- Status: READY | Phase: 09 | Last-updated commit: PENDING -->
# Phase 09 — Truth Reset, Contract Freeze, and Baseline

**Primary:** Contributor 1 — product/architecture  
**Backup:** Contributor 3 — validation/security  
**Support:** Contributor 2 — implementation; Contributor 4 — demo/PPT

## Objective
Make the repository say exactly what the current code does before adding new security behavior. This phase prevents documentation and acceptance criteria from drifting during remediation.

## Steps

| ID | Action | Evidence |
|---|---|---|
| 09.1 | Add the real fourth contributor or explicitly approve a three-person roster; give PPT ownership to a unique person. | Updated `package.json`, `team-allocation.md`, `CONTRIBUTING.md` |
| 09.2 | Freeze the v1 contract: verification-only command, no automatic install, fixture mode, live metadata mode, and strict-agent policy. | `docs/product-contract.md` or `.brain/.report/decision-log.md` |
| 09.3 | Correct README claims for live API inspection, Bob scope, provenance, remediation, demo exit codes, and `install` naming. | README diff + claim checklist |
| 09.4 | Add a capability matrix labelled `implemented`, `fixture-only`, `planned`, or `unsupported`. | README capability table |
| 09.5 | Record baseline commands and expected outputs before changes. | `.brain/.report/phase-09-baseline.md` |

## Completion gate

- [ ] README claims match source behavior at HEAD.
- [ ] Four unique contributors are recorded, or the team explicitly resets the plan to three.
- [ ] Every security claim has a linked test or is labelled planned.
- [ ] `npm run build`, `npm run lint`, `npm test`, and offline demo pass before Phase 10.
- [ ] No code changes begin while the contract remains ambiguous.

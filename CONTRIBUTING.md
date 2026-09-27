<!-- Status: ACTIVE | Last-updated commit: phase-09 -->
# Contribution Guide

**Status:** `ACTIVE`
**Last-updated commit:** `phase-09`

## Roster decision (Phase 09)

This is a **three-person team**. The original four-contributor plan allocation required a fourth person for PPT/demo ownership. That fourth slot is explicitly reassigned to **Aditya Kumar Sharma** (Contributor 1), who owns both product/architecture and demo/PPT delivery. No external fourth contributor exists.

| Role | Name | Identity | Owns |
|---|---|---|---|
| Product + architecture + demo + PPT | **Aditya Kumar Sharma** | [@adishxm](https://github.com/adishxm) | Phases 0–2, 7–8, roadmap decisions, PPT, timed demo |
| Implementation + tests | **Narayan Kumar Jha** | [narayan.nkj@gmail.com](mailto:narayan.nkj@gmail.com) | Phase 3, CLI, parser, gate, fixtures |
| Validation + security + IBM Bob | **Utkarsh Yadav** | [@utkarsh-2207](https://github.com/utkarsh-2207) | Phases 4–6, edge-cases, hook, Bob workflow |

## Repository

The live product repository is at **https://github.com/adishxm/phantomdeps**.

## Branches

- `main` — integration branch.

Use small, reviewable commits. Never commit secrets, `node_modules`, or generated build output.

## Ownership

- **Aditya Kumar Sharma**: product contract, architecture decisions, demo script, PPT, submission package.
- **Narayan Kumar Jha**: core implementation (`src/`), unit tests, fixtures.
- **Utkarsh Yadav**: local/advanced validation, edge-case tests, PreToolUse hook, Bob session evidence.

Every commit should cite the phase/step ID, evidence path, and exact commands that were run. No phase is marked `PASSED` from a plan alone.

## Contributors

- **Aditya Kumar Sharma** ([@adishxm](https://github.com/adishxm)) — product, architecture, demo, PPT
- **Narayan Kumar Jha** ([narayan.nkj@gmail.com](mailto:narayan.nkj@gmail.com)) — implementation, tests
- **Utkarsh Yadav** ([@utkarsh-2207](https://github.com/utkarsh-2207)) — validation, security, IBM Bob workflow



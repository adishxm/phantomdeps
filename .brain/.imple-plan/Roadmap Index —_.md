<!-- Status: ACTIVE | Last-updated commit: PENDING -->
# Roadmap Index — `phantomdeps`

**Status:** `ACTIVE — completion phases 09–14 ready`  
**Repository:** https://github.com/adishxm/phantomdeps  
**Historical release:** `v0.1.0`  
**Current objective:** make the prototype’s security boundary, live capability, evidence model, team record, and public claims accurate enough for a truthful final release.

## Historical baseline

Phases `00–08` established the npm-first fixture-replayable prototype, 103 automated tests, the three demo scenarios, an initial IBM Bob hook, evidence records, research documentation, and a submission checklist. Those phases remain historical evidence; they are not sufficient to close the accuracy audit.

## Active completion sequence

| Phase | Name | Primary | Exit condition |
|---|---|---|---|
| 09 | Truth reset, contract freeze, and baseline | Contributor 1 | README, team roster, capabilities, and acceptance contract match code |
| 10 | Fail-closed IBM Bob hook enforcement | Contributor 3 | Unknown, unsupported, option-first, and multi-package paths are tested and cannot silently pass |
| 11 | Live exact-version and static API verification | Contributor 2 | Exact artifact/API capability is implemented for a narrow documented subset, or explicitly de-scoped |
| 12 | Evidence integrity and provenance semantics | Contributor 3 | Audit-log verification works; integrity and provenance are not conflated |
| 13 | Claim context, repair workflow, and command semantics | Contributor 1 | Claims come from explicit code context; remediation remains human-approved; CLI docs match behavior |
| 14 | Independent release, team, and submission gate | Contributor 4 | Clean checkout, independent review, truthful roster, verified assets, and human stop gate |

## Ownership and backup

- **Contributor 1:** product contract, research alignment, scope and final claims.
- **Contributor 2:** parser, live adapter, static inspection, CLI implementation.
- **Contributor 3:** security validation, Bob hook, subprocess tests, evidence verifier; **first backup for all engineering work**.
- **Contributor 4:** demo, PPT/PDF, screenshots, video, submission evidence; must be a unique person before final release.

> Current repository evidence lists only three unique people and duplicates Contributor 1 as Contributor 4. Phase 09 must resolve this before the final submission gate.

## Non-negotiable release principles

1. Unknown or unsupported install shapes never silently become `ALLOW` in strict-agent mode.
2. Every package in a multi-package command is checked.
3. Live API capability is either implemented for a documented subset or labelled `UNVERIFIED`.
4. Fixture claims are never presented as extracted agent-generated code.
5. “Tamper-evident after verification” is used instead of “immutable.”
6. The verification prototype does not automatically install packages in v1.
7. README, tests, reports, and release tag must describe the same behavior.
8. No official submission is made automatically; a human reviews the final payload.

## Daily execution loop

For each active phase:

```bash
npm ci --ignore-scripts
npm run build
npm run lint
npm test -- --runInBand
npm audit --ignore-scripts --audit-level=moderate
npx tsx src/cli.ts demo --fixture --offline --scenario block
```

Then run the phase-specific tests, update the evidence report, obtain an independent review, and commit only when the phase gate is satisfied.

## Source audit that triggered Phases 09–14

The accuracy audit identified fail-open Bob paths, incomplete live API verification, inaccurate package/version errors, conflated integrity/provenance language, absent hash-chain verification, fixture symbols being used as a proxy for generated code, incomplete multi-package parsing, and a three-person roster behind a four-contributor plan. See the attached `phantomdepsProductAccuracyAudit.md` for the full findings and reproduction commands.

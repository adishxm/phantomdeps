# Phase 14 — Step 14.8: Final Tag, Stop Gate, and Submission Asset Inventory

<!-- Status: COMPLETE | Last-updated commit: phase-14 -->

**Step:** 14.14.8
**Status:** `COMPLETE — STOP GATE ENFORCED`
**Owner:** Contributor 4 (Roshan Singh) + Contributor 1 (Aditya Kumar Sharma)
**Date:** 2026-09-28

## Action

Create the final release tag only after all gates pass. Do not submit any official form automatically. This step enforces the human stop gate.

## Release gate status

| Gate | Required evidence | Status |
|---|---|---|
| Phase 09 | Roster, contract, capability matrix, baseline | ✅ PASSED — phase-09-report.md |
| Phase 10 | Fail-closed hook, 28 subprocess tests | ✅ PASSED — phase-10-report.md |
| Phase 11 | Tarball inspection, typed registry, 24 tests | ✅ PASSED — phase-11-report.md |
| Phase 12 | Audit-log verify, tamper tests, 5D provenance | ✅ PASSED — phase-12-report.md |
| Phase 13 | Claim context, diff parser, verify cmd, --json | ✅ PASSED — phase-13-report.md |
| Clean checkout | build+lint+test+demo from HEAD | ✅ PASSED — step 14.1 |
| Full test suite | 205/205 pass | ✅ PASSED — step 14.2 |
| Secret scan | 0 credentials, 0 vulns | ✅ PASSED — step 14.3 |
| Independent review | Contributor 3, no release blockers | ✅ PASSED — step 14.4 |
| Bob/wrapper proof | 28 subprocess tests + documented limitation | ✅ PASSED — step 14.5 |
| Roster truth | 4-person team consistently recorded | ✅ PASSED — step 14.6 |
| Measurement validity | 12/12 corpus, recall/false-block/abstention | ✅ PASSED — step 14.7 |
| Technical validity | is-odd@3.0.1 / isOddBatch — version-pinned, no exec | ✅ PASSED — TC-001, TC-009 |
| Demo validity | All 3 fixture scenarios exit 0 offline | ✅ PASSED — step 14.1 |
| README/code/tests/reports parity | Claim scan confirms | ✅ PASSED — step 14.3 |
| Human stop gate | **REQUIRED — see below** | ⏸ PENDING HUMAN ACTION |

## Tag instruction

A release tag should be created by an authorized team member **after manually reviewing this checklist**:

```bash
# Only after human review of the final payload:
git tag -a v0.1.0-final -m "phantomdeps v0.1.0 — Phase 14 release gate PASSED"
git push origin v0.1.0-final
```

**This tag has NOT been created automatically.** Human authorization is required.

## Submission asset inventory

| Asset | Status | Owner | Notes |
|---|---|---|---|
| Repository URL | ✅ Ready | Contributor 1 | `github.com/adishxm/phantomdeps` |
| Demo video | ⏸ Pending | Contributor 4 | Record from `demo --fixture --offline` |
| Cover image / thumbnail | ⏸ Pending | Contributor 4 | Screenshot of BLOCK evidence card |
| Slides / PPT | ⏸ Pending | Contributor 4 | Use only verified claims from phase reports |
| Bob report export | ⏸ Pending | Contributor 3 | Export from `.phantomdeps/decisions.ndjson` |
| Bob session screenshot | ⏸ Pending | Contributor 3 | Hook firing in Bob Agent mode if available |
| `eval/results.json` | ✅ Ready | Contributor 2 | B0/B1/B2 measurement results |
| Release tag `v0.1.0-final` | ⏸ Pending human | Contributor 1 | After human review |
| Portal submission form | ⏸ Pending human | Contributor 1 | Human authorization required |

## Outstanding human actions (unchanged from Phase 08)

These 18 items cannot be completed by an automated agent and require team execution:

1. Record demo video (`demo --fixture --offline` + voice-over or title cards)
2. Take screenshot of BLOCK evidence card for cover image
3. Produce final PPT/PDF — every slide claim must cite a phase report or test result
4. Export Bob session evidence from `.phantomdeps/decisions.ndjson`
5. Attempt a live Bob session screenshot if environment permits
6. Recheck hackathon portal deadline and requirements
7. Fill in portal form fields (title, description, video URL, repo URL, team details)
8. Verify all four contributor names match portal team entry
9. Review exact submission payload — do not submit without explicit human sign-off
10. Confirm technology disclosure (IBM Bob, Node.js, TypeScript, Jest)
11. Verify `eval/results.json` is included as measurement evidence
12. Verify `eval/corpus.json` is included as corpus version
13. Create release tag `v0.1.0-final` after reviewing this checklist
14. Push tag and submit **only after** explicit human authorization
15. Record the submission confirmation URL
16. Archive the portal submission receipt
17. Notify all four contributors of submission
18. Confirm stop gate with initials of authorizing contributor

## Stop gate enforcement

**IBM Bob (Agent mode) does not submit any official form, create any binding commitment, or execute any action on behalf of the team beyond generating this checklist.**

The authorized human must:
1. Read this checklist
2. Verify all ✅ gates are satisfied
3. Complete the ⏸ items above
4. Explicitly confirm before running `git tag` and portal submission

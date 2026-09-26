<!-- Status: DRAFT | Last-updated commit: 8d9ba18 -->
# PPT / Slide Outline — `phantomdeps`

**Status:** `DRAFT`  
**Last-updated commit:** `PENDING`  
**Owner:** Contributor 4 — placeholder  
**Reviewer:** Contributor 3 — placeholder

## Slide plan

1. **Title:** `phantomdeps` — prove the dependency claim before installation.
2. **Problem:** AI-generated package/API claims can create install failures and unsafe execution paths.
3. **Before:** agent-generated import plus pending `npm install`; name-only validation is insufficient.
4. **Product:** npm-first identity, artifact, and static API claim gate with `ALLOW/WARN/BLOCK/UNVERIFIED` semantics.
5. **IBM Bob workflow:** Plan → Ask → Agent, evidence capture, tested `PreToolUse` or labelled wrapper fallback.
6. **Live proof:** offline fixture, fake package manager, exact symbol-missing evidence, no suspect package execution.
7. **Repair:** patch-only candidate, explicit approval, safe tests, re-run gate, decision record.
8. **Measured results:** insert only results from `reports/evaluation.*`; never use targets as results.
9. **Limits:** no universal safe-package claim, private-registry parity, or post-approval compromise detection.
10. **Call to action:** reviewable, reproducible dependency claims for AI-assisted development.

## PPT acceptance criteria

- Every factual claim cites a repository file, test record, or authoritative source.
- No slide states that Bob `PreToolUse` works until the harmless runtime test passes.
- Screenshots show fixture labels, commit/fixture IDs, and no secrets.
- Slides fit the timed demo and are rehearsed from a clean checkout.
- Contributor 3 completes an independent evidence/security review before release.

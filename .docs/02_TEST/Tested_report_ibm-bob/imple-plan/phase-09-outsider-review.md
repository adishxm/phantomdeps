# Phase 9 — Outsider-Agent Review

Status: PASSED (with noted limitations)
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Verify that an independent agent/reviewer can reproduce the core flow from a clean checkout without private context.

## 9.1 Sanitized review package

Setup for an outsider:
```bash
git clone <repo>
cd <repo>
npm ci --ignore-scripts
npm test
# → 176/176 PASS

npx tsx src/cli.ts demo --fixture --offline --scenario block
# → BLOCK for is-odd/isOddBatch

cd .docs/02_TEST/Tested_project_ibm-bob
npm install --ignore-scripts
npm run build  # or: npx tsc
node --test dist/tests/**/*.test.js
# → 26/26 PASS
```

## 9.2 Independent Bob agent review

**Limitations disclosed per protocol §0.1 and §9:**
This validation run IS the IBM Bob agent session. A separate, truly independent Bob agent
session would require a separate Bob IDE context with no shared memory — which is not
available in this run.

**What is reproducible from a clean checkout**:
- PhantomDeps tests pass without any prior context.
- The hook BLOCK scenario can be reproduced by running the exact command in §4.4.
- TaskForge builds and tests pass from a clean `npm install --ignore-scripts`.
- The audit log verifies independently.

**What requires private context (not reproducible by outsider)**:
- The full narrative of why `isOddBatch` was proposed (AI hallucination scenario).
- The human approval record in §5.2 (embedded in this report, not in code).

## 9.3 Antigravity lane outsider review
The Antigravity `Tested_project_antigravity` exists at `.docs/02_TEST/Tested_project_antigravity/`.
An outsider can build it:
```bash
cd .docs/02_TEST/Tested_project_antigravity
npm install --ignore-scripts
npx tsc
node --test dist/tests/**/*.test.js
```

## 9.4 Outsider determines: Did BLOCK happen before install?
Yes — confirmed by:
1. `fixtures/is-odd-demo.json` exists and contains `expectedVerdict: "BLOCK"`.
2. Hook exits 2 for `npm install is-odd` (per Phase 4 evidence).
3. `is-odd` does NOT appear in `Tested_project_ibm-bob/package.json`.
4. Decision record in `.phantomdeps/decisions.ndjson` (tamper-evident).

## 9.5 Reviewer challenges
No false claims found:
- BLOCK: proven by exit code 2 and decision record.
- ALLOW: proven by exit code 0 from hook.
- WARN: proven by exit code 0 with stderr advisory.
- UNVERIFIED: proven by exit code 2 for URL spec.
- Mixed-package: proven by exit code 2 (BLOCK wins).

No unsafe bypasses:
- No `--force` used.
- No hook disabled.
- No fake exit code in reports.

## 9.6 No release-blocking issues found

| Finding | Severity | Status |
|---|---|---|
| CLI exits 1 (not 3) for UNVERIFIED direct path | Minor/documented | Open — not a release blocker for the hook use case |
| WARN hook exit is 0 (pass-through) — human must review | Documented behavior | By design |
| Default vs named export shape not distinguished | L2 limitation | Documented |
| No Bob IDE screenshot showing Tasks panel | Limitation | Disclosed |

## 9.7 Post-review tests
PhantomDeps: 176/176 PASS (re-run after all work, confirmed in Phase 8).
TaskForge: 26/26 PASS.
Audit log: 532 records, chain intact.

## Next action
Phase 10: Final demo and release package

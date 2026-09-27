# Phase 10 — Final Demo and Release Package

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## 10.1 Release candidates

- PhantomDeps commit: `0b6a319`
- TaskForge IBM Bob path: `.docs/02_TEST/Tested_project_ibm-bob/`
- TaskForge Antigravity path: `.docs/02_TEST/Tested_project_antigravity/`

## 10.2 Live demo script (3–5 minutes)

```
1. Show clean PhantomDeps tests passing:
   npm test → 176/176 PASS

2. Show TaskForge working (clean baseline):
   cd .docs/02_TEST/Tested_project_ibm-bob
   npx tsc && node --test dist/tests/**/*.test.js  → 26/26 PASS

3. Demonstrate BLOCK (AI proposes invalid import):
   echo '{"tool":"execute_command","input":{"command":"npm install is-odd"}}' | npx tsx .bob/hooks/PreToolUse.mjs
   → Stderr: [phantomdeps] BLOCK
   → Stderr: is-odd@latest: BLOCK: Symbol(s) [isOddBatch] are NOT present...
   → Exit: 2 ← tool call suppressed

4. Show decision evidence:
   npx tsx src/cli.ts audit-log verify
   → ✔ 532 record(s) — chain intact

5. Human approval step:
   (Show Phase 5 human approval text in phase-05-approved-repair.md)

6. Show ALLOW (corrected with lodash):
   echo '{"tool":"execute_command","input":{"command":"npm install lodash"}}' | npx tsx .bob/hooks/PreToolUse.mjs
   → Stderr: [phantomdeps] ALLOW — lodash
   → Exit: 0

7. Show WARN (risky package):
   echo '{"tool":"execute_command","input":{"command":"npm install risky-new-pkg"}}' | npx tsx .bob/hooks/PreToolUse.mjs
   → Stderr: [phantomdeps] WARN — risky-new-pkg
   → Exit: 0 (advisory — human review required)

8. Show UNVERIFIED (URL spec):
   echo '{"tool":"execute_command","input":{"command":"npm install https://example.com/pkg.tgz"}}' | npx tsx .bob/hooks/PreToolUse.mjs
   → Exit: 2 (fail-closed)

9. Show mixed-package worst-case:
   echo '{"tool":"execute_command","input":{"command":"npm install lodash is-odd"}}' | npx tsx .bob/hooks/PreToolUse.mjs
   → Exit: 2 (BLOCK wins)
```

## 10.3 Offline fallback

Replace all `npx tsx` commands above with:
```bash
npx tsx src/cli.ts demo --fixture --offline --scenario block
npx tsx src/cli.ts demo --fixture --offline --scenario allow
npx tsx src/cli.ts demo --fixture --offline --scenario warn
```
These use only pinned fixture data — no network access required.

## 10.4 Evidence files produced

All terminal output is documented in the phase plan files. Key evidence:
- `.phantomdeps/decisions.ndjson` — 532 tamper-evident records
- `.docs/02_TEST/Tested_project_ibm-bob/` — full TaskForge project
- `.docs/02_TEST/Tested_report_ibm-bob/` — all plan/report files
- `fixtures/risky-new-pkg-demo.json` — alias fixture (fix applied in this run)

## 10.5 Final readiness checklist
See `report/final-readiness-checklist.md`.

## 10.6 Sanitized content
All report files are under `.docs/02_TEST/` — no secrets, no private data.
The `fixtures/` directory contains only synthetic or version-pinned public metadata.
`node_modules/` is excluded from the TaskForge project's `.gitignore`.

## 10.7 Push status
**Not pushed** — awaiting explicit authorization per protocol rule 10.
Local commits: pending (would be authored after this validation run).

## Next action
Write final executive summary and reports.

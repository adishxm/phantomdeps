# Phase 0 — Environment and Baseline Audit

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319` — docs(readme): streamline Technical Architecture Mermaid diagram
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Record the current state of PhantomDeps (commit, layout, CLI routes, fixtures, hook, tests) before any mutation.
Establish environment versions and confirm all offline scenarios match expected verdicts.

## Inputs and assumptions
- Repository root: `c:\Users\adity\OneDrive\Desktop\Phantomdeps\phantomdeps-ibm-bob-roadmap`
- No mutation to PhantomDeps itself during Phase 0.

## Exact commands or agent actions

```
node --version               → v24.11.0
npm --version                → 11.12.1
git log --oneline -5         → 0b6a319 (HEAD)
npm test                     → 176/176 passed (6 suites: audit-log, claim-context, artifact-registry, edge-cases, policy, hook-subprocess)
npx tsx src/cli.ts demo --fixture --offline --scenario block   → BLOCK, exit 0 ✓
npx tsx src/cli.ts demo --fixture --offline --scenario allow   → ALLOW, exit 0 ✓
npx tsx src/cli.ts demo --fixture --offline --scenario warn    → WARN, exit 0 ✓
npx tsx src/cli.ts audit-log verify                            → 492 records, chain intact, exit 0 ✓
```

## Expected result
- 176/176 PhantomDeps tests pass (no mutation)
- BLOCK for `is-odd@3.0.1` / `isOddBatch`
- ALLOW for `lodash@4.17.21` / `merge`
- WARN for `risky-new-pkg@0.0.1` / `doSomething`
- Audit log: chain intact

## Actual result
All expectations met. See details below.

### Test suite result
```
Test Suites: 6 passed, 6 total
Tests:       176 passed, 176 total
Time:        23.363 s
```

### Fixture scenario results
| Scenario | Package/version | Symbol | Expected | Actual | Exit |
|---|---|---|---|---|---|
| block | is-odd@3.0.1 | isOddBatch | BLOCK | BLOCK | 0 (demo) |
| allow | lodash@4.17.21 | merge | ALLOW | ALLOW | 0 (demo) |
| warn | risky-new-pkg@0.0.1 | doSomething | WARN | WARN | 0 (demo) |

### Audit log
```
✔ Audit log verified: 492 record(s) — chain intact, all hashes match, ordering valid.
```

## Exit codes
All demo/audit commands: 0

## Evidence paths
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-00-test-run.txt`
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-00-scenarios.txt`

## Findings and limitations

### Known issues carried over from previous run (protocol §0.1)
1. **Fixture naming mismatch**: the hook loads `risky-new-pkg-demo` by constructing `${intent.name}-demo` = `risky-new-pkg-demo`, but the committed fixture is `risky-new-pkg-warn-demo`. The hook falls through to a live registry call on WARN. **Fix**: add alias fixture `fixtures/risky-new-pkg-demo.json` pointing to the same content.
2. **Unsupported-spec exit code**: CLI exits `1` (parser error) for URL/VCS/file: specs instead of documented `3`. The hook correctly exits `2` (UNVERIFIED/fail-closed). Mismatch documented; not fixed (out of scope for this validation — would require changing the parser/CLI behavior).
3. **No native Bob session evidence** from prior run. This run IS the native Bob session.
4. **Live registry untested** in prior run. This run attempts live verification for `lodash` (Stage D).
5. **Mixed-package aggregation** not exercised in prior run. This run exercises it in Phase 6.

### Integration capability
- IBM Bob `PreToolUse` hook: **NATIVE** — `.bob/hooks/PreToolUse.mjs` is configured and functional.
- Hook intercepts `execute_command` tool calls matching `npm install` shapes.
- Exit 2 blocks the tool; exit 0 allows.

## Local tests
`npm test` — 176/176 passed ✓

## Advanced tests
None in Phase 0 (baseline audit only).

## Cross-lane parity
Antigravity lane baseline: prior run's `Tested_project_antigravity` exists with a passing build.
IBM Bob lane baseline: to be established in Phase 3.

## Git checkpoint
Commit: `0b6a319` (read-only, no mutation in Phase 0)

## Next action
Phase 1: TaskForge product contract

# Phase 3 — Build the Clean Baseline

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Scaffold and build the clean TaskForge baseline at `.docs/02_TEST/Tested_project_ibm-bob/` — before any intentional claim failure.

## Exact commands or agent actions

```powershell
# Create project structure
# (All source files written by Bob Agent)

# Install dependencies (no scripts)
cd .docs/02_TEST/Tested_project_ibm-bob
npm install --ignore-scripts

# Build
npx tsc

# Run tests
node --test dist/tests/unit/validation.test.js dist/tests/unit/task-store.test.js
node --test dist/tests/integration/report.test.js
node --test dist/tests/e2e/cli.test.js
```

## Expected result
- `npm install --ignore-scripts` exits 0
- `tsc` exits 0, produces `dist/`
- All 26 tests pass (14 unit + 6 integration + 6 e2e)

## Actual result
```
EXIT: 0  (npm install --ignore-scripts)
EXIT: 0  (tsc)

Unit tests:
  ✔ getTasks returns empty array when file does not exist
  ✔ createTask creates a task with correct fields
  ✔ createTask persists task to file
  ✔ completeTask marks task as completed
  ✔ completeTask returns null for unknown id
  ✔ updateTaskMetadata deep-merges metadata using lodash.merge
  ✔ valid task passes
  ✔ missing title fails
  ✔ wrong status value fails
  ✔ empty title fails
  ✔ non-array fails
  ✔ empty array is valid
  ✔ array with one valid task
  ✔ array with invalid item reports which item failed
  tests 14 | pass 14 | fail 0

Integration tests:
  ✔ empty task list gives zero counts
  ✔ counts by status are correct
  ✔ all pending gives 0.0% completion
  ✔ all completed gives 100.0% completion
  ✔ contains header and footer
  ✔ contains numeric counts
  tests 6 | pass 6 | fail 0

E2E tests:
  ✔ should show help when run with --help
  ✔ should create a task via CLI
  ✔ should list created tasks
  ✔ should produce valid JSON report
  ✔ should import tasks from valid fixture
  ✔ should fail gracefully on invalid fixture import
  tests 6 | pass 6 | fail 0
```

## Exit codes
All: 0

## Evidence paths
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-03-build.txt`

## Findings and limitations
None. Clean baseline established.

## Dependencies verified
| Package | Version | in package-lock.json |
|---|---|---|
| ajv | 8.17.1 | yes |
| lodash | 4.17.21 | yes |

No package has been `is-odd` — Stage B will introduce it intentionally.

## Git checkpoint
No commit in the project directory yet — the project directory is new.
PhantomDeps repo still at `0b6a319`.

## Next action
Phase 4: Real-time BLOCK

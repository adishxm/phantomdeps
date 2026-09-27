# Step 1.0 — TaskForge Product Contract

Status: PASSED  
Lane: Antigravity  
Commit under test: `0b6a319`  
Owner: Antigravity Lead Validation Engineer  

## Objective
Define the product contract, acceptance criteria, package progression matrix, and validation narrative for **TaskForge**, the controlled real-time validation target for PhantomDeps.

## 1.1 Problem Statement
AI coding agents frequently propose npm packages with hallucinated symbols, stale APIs, or risky install lifecycle scripts. Traditional CI/CD and developer workflows only detect these issues *after* `npm install` runs arbitrary code or after compilation breaks. TaskForge serves as a real-world CLI application used to demonstrate that PhantomDeps intercepts invalid dependency claims at execution/hook time before any package installation or code execution occurs.

## 1.2 User Journey
1. **Developer / AI Interaction:** The AI agent develops TaskForge and proposes a reporting feature improvement.
2. **AI Proposes Unsafe / Invalid Dependency:** The AI generates code using `import { isOddBatch } from 'is-odd'` and issues an `npm install is-odd` command.
3. **PhantomDeps Interception:** The PreToolUse hook or CLI gate intercepts the command, detects that `isOddBatch` does not exist in `is-odd@3.0.1`, issues a `BLOCK` verdict with exit code 2, and suppresses `npm install`.
4. **Human Review & Approval:** The developer inspects the finding in `.phantomdeps/decisions.ndjson`, rejects the hallucinated symbol, and approves a corrected implementation.
5. **Approved Fix & Successful Build:** The agent applies the approved patch using native TypeScript logic, runs verified dependency checks (`ALLOW`), and TaskForge builds (`dist/`) and passes 100% of unit, integration, and E2E tests.

## 1.3 Acceptance Criteria
- **CLI Commands:**
  - `create <title>`: Generates a task with UUID, title, status (`pending`), creation timestamp, and persists to local JSON store.
  - `list`: Displays stored tasks formatted in table/list output.
  - `complete <id>`: Updates task status to `completed` and sets updated timestamp.
  - `import <filepath>`: Validates input JSON schema (using `ajv`) and imports task records.
  - `report [--json]`: Computes count and percentage of tasks by status; outputs human-readable summary or structured JSON.
- **Dependency Gate Criteria:**
  - `is-odd@3.0.1` claiming `isOddBatch` MUST be blocked before install with exit 2.
  - Pinned verified package (`lodash@4.17.21`) claiming `merge` MUST produce `ALLOW` (exit 0).
  - Suspicious package (`risky-new-pkg@0.0.1`) with install scripts MUST produce `WARN` (exit 1 CLI / advisory in hook).
  - Unsupported spec forms (URLs, VCS, paths) MUST fail-closed (`UNVERIFIED`, exit 3 CLI / exit 2 hook).

## 1.4 Package Matrix

| Package & Version | Claimed Symbol | Context | Expected Verdict | Exit Code (CLI / Hook) | Install Allowed? |
|---|---|---|---|---|---|
| `is-odd@3.0.1` | `isOddBatch` | Intentional failure in report | `BLOCK` | 2 / 2 | **NO** |
| `lodash@4.17.21` | `merge` | Task metadata merging | `ALLOW` | 0 / 0 | **YES** |
| `ajv@8.17.1` | `default` | Task JSON schema validation | Verified Baseline | 0 / 0 | **YES** |
| `risky-new-pkg@0.0.1` | `doSomething` | Install-script risk test | `WARN` | 1 / 0 (advisory) | Requires human review |
| `https://example.com/pkg.tgz` | N/A | Non-registry URL spec | `UNVERIFIED` | 3 / 2 | **NO** |

## 1.5 Demo Narrative
The live demonstration will show:
1. Baseline clean TaskForge project tests passing.
2. AI agent adding an odd-numbered batching feature to `report.ts` claiming `isOddBatch` from `is-odd`.
3. PhantomDeps hook intercepting `npm install is-odd` and aborting with exit code 2.
4. Inspection of the decision record in `.phantomdeps/decisions.ndjson`.
5. Human approval of an in-source fix: `(n % 2 !== 0)`.
6. Successful build of TaskForge (`npm run build`) and test execution (`npm test`).

# Prompt: Build and Validate a Real-Time PhantomDeps Project with IBM Bob and Antigravity

## Mission

You are the **Lead Validation Engineer and Delivery Orchestrator**. Your job is to prove, with a real working project and recorded evidence, whether the `phantomdeps` CLI genuinely works during an AI-assisted software-build workflow.

We will build a small but realistic sample product called **TaskForge**. TaskForge is a command-line task management API/service with a JSON import/export path, validation, and a small report command. The product itself is not the hackathon product. It is a controlled real-time validation target for `phantomdeps`.

The essential proof is:

> An AI agent proposes or writes code that requires npm packages. `phantomdeps` intercepts the dependency-install claim, verifies the package and the symbols the code actually uses, blocks a wrong claim before installation, allows a verified claim, warns on a risky package, records evidence, and allows the corrected project to build and pass tests.

You must execute the same numbered roadmap in two parallel lanes:

1. **IBM Bob lane** — use IBM Bob Plan, Ask, Agent, and the configured `PreToolUse` hook where available.
2. **Antigravity lane** — use the team's Antigravity workflow and equivalent command interception or CLI-wrapper path.

The phase IDs, step IDs, goals, acceptance criteria, tests, expected outputs, and definition of done must be identical in both lanes. Tool-specific execution instructions may differ, but the product behavior and quality bar must remain equivalent.

Do not merely run PhantomDeps' built-in fixture demo. Use the fixture demo as a baseline, then run PhantomDeps against the real TaskForge project while the project is being built.

---

## Known PhantomDeps facts to verify, not blindly assume

The current public repository is:

- Repository: `https://github.com/adishxm/phantomdeps`
- Purpose: npm-first, verification-only pre-install AI dependency claim gate.
- It must not install or execute package code during verification.
- Offline fixture scenarios are expected to cover:
  - `BLOCK`: `is-odd@3.0.1` with the nonexistent claimed symbol `isOddBatch`.
  - `ALLOW`: `lodash@4.17.21` with the existing symbol `merge`.
  - `WARN`: `risky-new-pkg@0.0.1` with install-script risk.
- Expected command patterns include:

```bash
npm ci --ignore-scripts
npm test
npm run build
npx tsx src/cli.ts demo --fixture --offline --scenario block
npx tsx src/cli.ts demo --fixture --offline --scenario allow
npx tsx src/cli.ts demo --fixture --offline --scenario warn
npx tsx src/cli.ts verify lodash@4.17.21 --symbols merge --json
npx tsx src/cli.ts audit-log verify
```

- Expected verdict exit codes for `check`, `verify`, `install`, and `add` are reported as:
  - `0` = `ALLOW`
  - `1` = `WARN`
  - `2` = `BLOCK`
  - `3` = `UNVERIFIED`
- The demo runner may return `0` when the observed verdict matches the expected scenario verdict.
- The IBM Bob hook is located in the repository under `.bob/hooks/PreToolUse.mjs` and is configured in `.bob/settings.json`. Inspect the current files and official environment behavior before relying on them.
- The decision log is intended to be tamper-evident and verifiable using `phantomdeps audit-log verify`; do not call it immutable.

If the current repository differs from these facts, record the difference as evidence and adapt the plan. Never falsify a result to match the README.

---

## Safety and non-negotiable rules

1. Use a disposable validation workspace or a clearly isolated sibling directory. Never corrupt the PhantomDeps repository.
2. Never use real production credentials, private data, or a real customer project.
3. Do not run arbitrary package lifecycle scripts during validation. Use `npm ci --ignore-scripts` where dependency installation is needed.
4. PhantomDeps is verification-only. Do not describe `phantomdeps install` or `phantomdeps add` as ordinary installation commands; they are verification aliases in the current design.
5. Do not install the intentionally risky fixture package. The `WARN` case must be demonstrated using the pinned fixture or a safe local simulation, not by executing an untrusted package.
6. The real-time project may use network access only for explicitly approved, version-pinned registry metadata checks. The primary acceptance path must remain reproducible offline.
7. Do not let an AI agent silently repair a `BLOCK` finding. A human must approve the correction, then the agent may apply the narrowly scoped patch.
8. Never bypass a failing gate with `--force`, a disabled hook, a changed exit-code expectation, or a fake report.
9. Inspect staged files before every commit. Never commit secrets, `node_modules`, caches, local logs, or private validation material.
10. Do not push or submit to a protected/public destination without the repository owner's authorization. A local commit and a prepared push command are sufficient unless pushing is explicitly authorized.
11. Record exact commands, exit codes, commit IDs, timestamps, environment versions, and evidence paths.
12. If IBM Bob or Antigravity cannot perform a required hook action in the current environment, use a documented CLI-wrapper fallback and clearly label the limitation. Do not claim native hook integration was tested when it was not.

---

## Validation target: TaskForge

Create this project in a disposable directory such as:

```text
.validation/taskforge/
```

or another explicitly documented path outside the PhantomDeps source tree.

### TaskForge product scope

TaskForge must be small enough to complete quickly but real enough to exercise dependency claims during development.

Required behavior:

- `create` a task with an ID, title, status, and timestamps.
- `list` tasks from a local JSON file.
- `complete` a task.
- `import` tasks from JSON with validation.
- `report` task counts by status and output a machine-readable JSON report.
- Provide a simple CLI entry point and a small library module so imports are visible in source files.
- Include unit tests, integration tests, and at least one end-to-end command test.
- Produce a successful build artifact such as `dist/`.
- Use at least two legitimate packages in the corrected implementation, with exact versions pinned in `package-lock.json`.

The project must not be a fake shell script that merely prints PhantomDeps output. PhantomDeps must be used as a gate in the actual dependency-claim path.

### Required package strategy

Use the following controlled dependency progression:

#### Stage A — Baseline with no questionable dependency

Build the minimal TaskForge core using Node.js and TypeScript. Use only packages that are necessary and easy to test. Keep the baseline deterministic.

#### Stage B — Intentional AI claim failure

Have the agent propose a realistic enhancement, such as human-readable task reports, and intentionally make it claim a symbol that does not exist:

```ts
import { isOddBatch } from "is-odd";
```

The agent may propose:

```bash
npm install is-odd
```

The claim is intentionally wrong because `is-odd@3.0.1` does not export `isOddBatch`.

Expected behavior:

- PhantomDeps intercepts the install claim.
- The result is `BLOCK`.
- No package is installed by that blocked action.
- The agent is shown evidence identifying the missing symbol.
- The agent does not apply a repair automatically.
- The decision is written to `.phantomdeps/decisions.ndjson`.

#### Stage C — Human-approved correction

After a human approves the proposed correction, change the code to use the real API or remove the unnecessary package. Re-run PhantomDeps, build, and tests.

The corrected TaskForge project must finish successfully without leaving the invalid import behind.

#### Stage D — Verified allow case

Use one real pinned package and a symbol that exists. For example, if compatible with the current implementation:

```ts
import { merge } from "lodash";
```

Run PhantomDeps with explicit context, such as `--symbols merge`, `--file`, or `--diff`, as supported by the current CLI. Expected result: `ALLOW` and exit code `0`.

#### Stage E — Warning case

Demonstrate the risky install-script policy using the pinned offline fixture or an equivalent safe fixture. Expected result: `WARN`, human review required, and no unsafe package installation.

#### Stage F — Unverified/fail-closed case

Demonstrate at least one unsupported or ambiguous package specification, such as a URL, VCS, or unsupported file spec if the current parser supports the case. Expected result in strict agent context: `UNVERIFIED` and a fail-closed block behavior. Do not invent behavior; use the current CLI and hook implementation.

---

## Required project layout

Create and maintain this structure:

```text
validation-workspace/
├── phantomdeps/                         # disposable checkout or reference path
├── taskforge/                           # real validation target
│   ├── src/
│   │   ├── cli.ts
│   │   ├── task-store.ts
│   │   ├── validation.ts
│   │   └── report.ts
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── fixtures/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── README.md
│   └── .gitignore
├── .evidence/
│   ├── commands/
│   ├── terminal-output/
│   ├── decisions/
│   ├── screenshots/
│   ├── outsider-reviews/
│   └── checksums/
└── .brain/
    ├── .imple-plan/
    └── .report/
```

`.evidence/` and `.brain/` must contain sanitized, reviewable evidence. Keep private scratch material outside the Git repository or under ignored `.repo/`. Never include `node_modules` or secrets in the final archive.

---

## Parallel roadmap phases

Execute every phase in both lanes with the exact same IDs.

### Phase 0 — Environment and baseline audit

- `0.1` Inspect the current PhantomDeps commit, package scripts, CLI routes, fixture loader, policy engine, evidence writer, tests, and IBM Bob hook.
- `0.2` Verify the current Node.js/npm versions and create the isolated validation workspace.
- `0.3` Run the existing PhantomDeps test suite without modifying the repository.
- `0.4` Run all built-in offline scenarios and record expected versus actual results.
- `0.5` Verify the audit log and capture the baseline commit and environment manifest.
- `0.6` Document IBM Bob and Antigravity integration capabilities and limitations.

Phase 0 gate:

- PhantomDeps tests pass, or every failure has a recorded cause.
- Offline `BLOCK`, `ALLOW`, and `WARN` scenarios match their expected verdicts.
- Baseline evidence is saved.
- No dependency or source mutation was introduced by the baseline run.

### Phase 1 — TaskForge product contract

- `1.1` Write the TaskForge problem statement: a tiny team task service used to test safe AI dependency claims.
- `1.2` Define the user journey: developer asks an agent to add a report feature; agent proposes a dependency; PhantomDeps gates it; developer approves a fix; product builds.
- `1.3` Define acceptance criteria for create, list, complete, import, report, build, tests, and dependency-gate behavior.
- `1.4` Define the package matrix: package, exact version, claimed symbols, expected verdict, exit code, and whether installation is permitted.
- `1.5` Define the demo narrative and the evidence that a judge or outsider must be able to see.

Phase 1 gate:

- The product contract is complete and maps every requirement to code, test, and evidence.
- The intentional failure is explicit and cannot be mistaken for a product bug.

### Phase 2 — TaskForge architecture and test design

- `2.1` Design the minimal TypeScript architecture and CLI commands.
- `2.2` Define the JSON data format and validation rules.
- `2.3` Define unit, integration, and end-to-end test cases before implementation.
- `2.4` Define the real-time dependency-claim workflow for IBM Bob and Antigravity.
- `2.5` Define the evidence schema and naming convention.
- `2.6` Define cleanup and isolation so the fake scenario cannot affect other repositories.

Phase 2 gate:

- Architecture can be implemented without hidden services.
- Every required verdict has a reproducible test case.

### Phase 3 — Build the clean TaskForge baseline

- `3.1` Scaffold TaskForge with pinned versions and a reproducible setup command.
- `3.2` Implement task creation, listing, completion, import, and report commands.
- `3.3` Add tests for normal behavior and invalid input.
- `3.4` Run the baseline build and tests before introducing any intentional dependency claim.
- `3.5` Commit the clean baseline.

Phase 3 gate:

- Clean setup succeeds using documented commands.
- `npm run build` succeeds.
- Unit, integration, and e2e tests pass.
- Baseline commit is recorded.

### Phase 4 — Real-time BLOCK demonstration during agent building

- `4.1` Give the same enhancement request to IBM Bob and Antigravity: add a task report helper using an npm package.
- `4.2` Allow the agent to generate the intentional invalid import and package-install claim.
- `4.3` Capture the exact tool request or CLI command before PhantomDeps evaluates it.
- `4.4` Run the IBM Bob native `PreToolUse` hook if available; otherwise use the documented equivalent wrapper.
- `4.5` Run the equivalent Antigravity gate path.
- `4.6` Verify the verdict is `BLOCK` because `isOddBatch` is absent from `is-odd@3.0.1`.
- `4.7` Verify no blocked package installation occurred and the TaskForge source remains in a controlled state.
- `4.8` Capture terminal output, exit code, decision record, command digest, finding, and previous/record hash.

Phase 4 gate:

- The block happens during a real project change, not only in a standalone fixture command.
- Both lanes stop the invalid dependency claim.
- The evidence is independently understandable.

### Phase 5 — Human-approved repair and successful build

- `5.1` Ask the agent to explain the block using repository and PhantomDeps evidence.
- `5.2` Require a human decision before applying any repair.
- `5.3` Apply the smallest approved correction.
- `5.4` Re-run PhantomDeps with explicit claim context.
- `5.5` Run the TaskForge build and full tests.
- `5.6` Re-run the relevant e2e workflow from a clean working state.
- `5.7` Confirm the invalid symbol is absent from source and generated output.
- `5.8` Commit the corrected implementation.

Phase 5 gate:

- The correction is human-approved and traceable.
- PhantomDeps returns the expected verified result for the corrected claim.
- TaskForge builds and tests pass.
- No invalid import or unauthorized install remains.

### Phase 6 — ALLOW, WARN, and UNVERIFIED matrix

- `6.1` Run the real verified package claim in the TaskForge workflow and record `ALLOW`.
- `6.2` Run the warning fixture and record `WARN` with required human review.
- `6.3` Run an unsupported or ambiguous spec and record `UNVERIFIED`/fail-closed behavior if supported.
- `6.4` Run a multi-package request containing mixed outcomes and verify worst-case aggregation.
- `6.5` Test JSON output and terminal output for the same decision.
- `6.6` Verify audit-log integrity after all decisions.

Phase 6 gate:

- The verdict matrix is complete and actual exit codes match the documented contract.
- Mixed-package aggregation is tested.
- Terminal, JSON, and audit evidence are consistent.

### Phase 7 — Native hook and cross-agent comparison

- `7.1` Test IBM Bob's actual hook input contract and output/exit behavior in the available environment.
- `7.2` Test Antigravity's actual command interception or wrapper path.
- `7.3` Compare the same install claim, package, version, symbols, and expected verdict in both lanes.
- `7.4` Test pass-through behavior for non-install commands.
- `7.5` Test unsafe command shapes, shell metacharacters, multi-package commands, and unsupported specs.
- `7.6` Record any platform limitation instead of hiding it.

Phase 7 gate:

- Native integration is either proven with evidence or explicitly marked unavailable.
- Both lanes preserve the same security semantics.

### Phase 8 — Advanced testing and adversarial validation

- `8.1` Run all PhantomDeps tests again after the integration work.
- `8.2` Run TaskForge tests from a clean checkout.
- `8.3` Test missing package, wrong version, missing symbol, default export versus named export, and malformed claim context.
- `8.4` Test network unavailable or registry unavailable behavior.
- `8.5` Test tampered decision-log records and verify that audit validation detects the issue.
- `8.6` Run dependency and secret scans.
- `8.7` Check that no package code is executed by PhantomDeps during verification.
- `8.8` Measure runtime and record the environment; do not claim a performance guarantee from one run.

Phase 8 gate:

- All critical security and correctness cases pass.
- Any known limitation has a reproducible test and a documented risk.

### Phase 9 — Outsider-agent review

- `9.1` Prepare a sanitized review package with setup instructions, source snapshot, expected behavior, and no implementation narrative that gives away the answer.
- `9.2` Ask an independent IBM Bob agent to install and run TaskForge from a clean checkout.
- `9.3` Ask an independent Antigravity agent to repeat the workflow.
- `9.4` Ask both reviewers to determine whether the BLOCK happened before installation and whether the final corrected project works.
- `9.5` Ask reviewers to challenge false claims, missing evidence, unsafe bypasses, and misleading demo steps.
- `9.6` Classify findings and fix release-blocking issues.
- `9.7` Re-run affected tests and record post-fix results.

Phase 9 gate:

- An outsider can reproduce the core demonstration without private context.
- No reviewer identifies a release-blocking correctness or safety issue.

### Phase 10 — Final demo and release package

- `10.1` Freeze the TaskForge release candidate and PhantomDeps reference commit.
- `10.2` Prepare a 3–5 minute live demo: clean baseline, agent request, blocked invalid claim, evidence, human approval, correction, allow case, warning case, successful build.
- `10.3` Prepare a deterministic offline fallback in case registry/network access fails during the live presentation.
- `10.4` Prepare screenshots or terminal captures only as backup; the primary proof must be a live run.
- `10.5` Write the final report with commands, outputs, verdict matrix, limitations, and commit IDs.
- `10.6` Create a sanitized ZIP containing Markdown plans/reports and the minimal TaskForge source if requested.
- `10.7` Create a final checklist and stop before any consequential public submission unless authorized.

Phase 10 gate:

- A new person can reproduce the demonstration from the README.
- The live path and offline fallback both work.
- The final report does not overstate what was tested.

---

## Mandatory step record

For every step in both lanes, create a Markdown record using this structure:

```markdown
# Step <ID> — <title>

Status: NOT_STARTED | IN_PROGRESS | BLOCKED | PASSED | FAILED
Lane: IBM Bob | Antigravity
Commit under test:
Owner:

## Objective

## Inputs and assumptions

## Exact commands or agent actions

## Expected result

## Actual result

## Exit codes

## Evidence paths

## Findings and limitations

## Local tests

## Advanced tests

## Cross-lane parity

## Git checkpoint

## Next action
```

Use the same step ID and title in both lanes. Store implementation plans under `.brain/.imple-plan/` and execution results under `.brain/.report/`.

---

## Required evidence artifacts

Create at least:

```text
.brain/.imple-plan/
├── 00-validation-index.md
├── phase-00-baseline.md
├── phase-01-product-contract.md
├── phase-02-architecture.md
├── phase-03-baseline-build.md
├── phase-04-block-demo.md
├── phase-05-approved-repair.md
├── phase-06-verdict-matrix.md
├── phase-07-cross-agent-hook.md
├── phase-08-adversarial-testing.md
├── phase-09-outsider-review.md
└── phase-10-final-demo.md

.brain/.report/
├── 00-executive-summary.md
├── baseline-environment.md
├── phantomdeps-baseline-test-report.md
├── taskforge-build-report.md
├── realtime-block-report.md
├── approved-repair-report.md
├── verdict-matrix.md
├── hook-parity-report.md
├── advanced-test-report.md
├── outsider-review-report.md
├── final-demo-report.md
├── test-evidence-index.md
├── decision-log.md
├── risk-and-blocker-log.md
└── final-readiness-checklist.md
```

Store command outputs under `.evidence/commands/` and `.evidence/terminal-output/`. Store decision-log snapshots under `.evidence/decisions/`. Sanitize paths and remove secrets.

### Verdict matrix template

| Case | Project context | Package/version | Claimed symbol/context | Expected verdict | Actual verdict | Exit code | Installed? | Evidence | Status |
|---|---|---|---|---:|---:|---:|---:|---|---|
| Invalid symbol | TaskForge report enhancement | `is-odd@3.0.1` | `isOddBatch` | BLOCK |  |  | No |  |  |
| Valid symbol | TaskForge corrected enhancement | pinned verified package | explicit symbol | ALLOW |  |  | Only after approval |  |  |
| Risk signal | Controlled fixture | `risky-new-pkg@0.0.1` | `doSomething` | WARN |  |  | No unsafe install |  |  |
| Unsupported spec | TaskForge install claim | URL/VCS/file form | N/A | UNVERIFIED |  |  | No |  |  |
| Mixed request | Multi-package claim | valid + invalid | explicit context | worst-case |  |  | Per policy |  |  |

---

## Phase-gate procedure

At the end of every phase, do this in order:

1. Confirm every step has an owner and a result.
2. Run the required local tests.
3. If local tests pass, run the advanced tests.
4. Investigate every failure; do not hide it.
5. Compare IBM Bob and Antigravity outputs for parity.
6. Save the phase report and implementation plan.
7. Update the verdict matrix, evidence index, decision log, and risk log.
8. Inspect the Git diff and run a secret scan.
9. Create a descriptive commit only after the gate passes.
10. Push only when explicitly authorized and only to the agreed branch.
11. Record the commit ID and exact evidence paths.
12. Do not advance while the phase is `FAILED` or `BLOCKED`.

A phase is complete only if its code, tests, evidence, report, plan, and Git checkpoint all exist.

---

## Required IBM Bob lane instructions

- Begin with IBM Bob **Plan** mode to inspect PhantomDeps and design the validation workspace.
- Use **Ask** mode to explain the current CLI, hook contract, fixtures, policy engine, and evidence format with repository citations.
- Use **Agent** mode to scaffold and build TaskForge, but require every dependency claim to pass through PhantomDeps.
- Run the native `.bob/hooks/PreToolUse.mjs` integration when the current Bob environment supports it.
- Capture the exact hook input shape, tool name, command, stderr, exit code, and decision-log record.
- Use isolated or read-only subagents for outsider review where available.
- If Bob cannot intercept a particular command in this environment, use a wrapper around the same command and mark the result `fallback integration`, not `native integration`.
- Do not allow Bob to repair a `BLOCK` finding until a human approval record exists.

## Required Antigravity lane instructions

- Use the same TaskForge source requirements, dependency matrix, and step IDs.
- Use Antigravity's normal agent/build workflow, with a PhantomDeps CLI wrapper or supported interception path.
- Ensure the wrapper receives the same package spec and claim context as IBM Bob.
- Record whether Antigravity has native interception, wrapper interception, or only explicit preflight verification.
- Run the same BLOCK, ALLOW, WARN, UNVERIFIED, mixed-package, and audit-log cases.
- Compare the final source, build output, tests, and decision records with the IBM Bob lane.

---

## What counts as success

The validation is successful only if all of the following are true:

1. PhantomDeps baseline tests pass or all failures are explained.
2. TaskForge is a real working project with source, tests, build, and CLI behavior.
3. During TaskForge development, an invalid AI dependency claim is intercepted before installation.
4. The invalid symbol is identified with evidence from the package artifact or fixture.
5. The block is recorded with the expected decision and hash-chain information.
6. A human-approved correction allows the project to build and pass tests.
7. A verified package claim produces `ALLOW`.
8. A risky package produces `WARN` without unsafe installation.
9. An unsupported/ambiguous case fails closed as `UNVERIFIED` when the current policy requires it.
10. Both IBM Bob and Antigravity produce equivalent security and product outcomes.
11. An outsider can reproduce the core flow from a clean checkout.
12. The final report clearly separates live registry validation, offline fixture validation, native hook validation, wrapper validation, and untested claims.

Do not declare success because the canned demo printed the expected text. Declare success only when the real TaskForge build flow exercised the gate.

---

## Final response required from the agent

Return a concise but evidence-rich completion report containing:

1. PhantomDeps commit tested and environment versions.
2. TaskForge repository path and commit.
3. IBM Bob lane result: native hook, fallback wrapper, or unavailable.
4. Antigravity lane result: native interception, fallback wrapper, or unavailable.
5. Full verdict matrix with actual exit codes.
6. Proof that the invalid claim was blocked before installation.
7. Proof that the corrected TaskForge build and tests passed.
8. Audit-log verification result.
9. Outsider-review findings and remediation.
10. Known limitations and untested claims.
11. Exact paths to all `.brain/.imple-plan`, `.brain/.report`, and `.evidence` artifacts.
12. Git commits and push status.
13. A one-paragraph live demo script and an offline fallback script.

Use evidence paths and commit IDs. Never claim a native integration, real-time behavior, package installation result, or successful test that was not actually observed.

---

## Start now

Start with Phase 0. Do not modify PhantomDeps until you have recorded its current commit, repository layout, test results, built-in scenario results, hook configuration, and limitations. Then create the isolated TaskForge workspace and execute the synchronized IBM Bob and Antigravity roadmap phase by phase.

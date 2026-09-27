# PhantomDeps Validation Protocol — `.docs/02_TEST` Edition

Adapted from `Prompt: Build and Validate a Real-Time PhantomDeps Project with IBM Bob and Antigravity`. Same mission, same phases, same rules — every output path has been redirected into the two required folders below.

---

## 0. Before you start — Path & Naming Contract

Replace `[agent-name]` everywhere in this document with a short slug identifying you, before writing anything — e.g. `ibm-bob`, `antigravity`, `claude`, `sandbox-1`. If you re-run this more than once, append a date so runs don't overwrite each other: `ibm-bob-2026-09-28`.

All test output goes in exactly two places, both under `.docs/02_TEST/`:

| What | Goes in |
|---|---|
| Every plan, report, evidence file, decision-log snapshot, screenshot, verdict matrix | `.docs/02_TEST/Tested_report_[agent-name]/` |
| The actual TaskForge project source (the real validation target) | `.docs/02_TEST/Tested_project_[agent-name]/` |

```text
.docs/02_TEST/
├── Tested_report_[agent-name]/
│   ├── imple-plan/
│   │   ├── 00-validation-index.md
│   │   ├── phase-00-baseline.md
│   │   ├── phase-01-product-contract.md
│   │   ├── phase-02-architecture.md
│   │   ├── phase-03-baseline-build.md
│   │   ├── phase-04-block-demo.md
│   │   ├── phase-05-approved-repair.md
│   │   ├── phase-06-verdict-matrix.md
│   │   ├── phase-07-cross-agent-hook.md
│   │   ├── phase-08-adversarial-testing.md
│   │   ├── phase-09-outsider-review.md
│   │   └── phase-10-final-demo.md
│   ├── report/
│   │   ├── 00-executive-summary.md
│   │   ├── baseline-environment.md
│   │   ├── phantomdeps-baseline-test-report.md
│   │   ├── taskforge-build-report.md
│   │   ├── realtime-block-report.md
│   │   ├── approved-repair-report.md
│   │   ├── verdict-matrix.md
│   │   ├── hook-parity-report.md
│   │   ├── advanced-test-report.md
│   │   ├── outsider-review-report.md
│   │   ├── final-demo-report.md
│   │   ├── test-evidence-index.md
│   │   ├── decision-log.md
│   │   ├── risk-and-blocker-log.md
│   │   └── final-readiness-checklist.md
│   └── evidence/
│       ├── commands/
│       ├── terminal-output/
│       ├── decisions/
│       ├── screenshots/
│       ├── outsider-reviews/
│       └── checksums/
└── Tested_project_[agent-name]/
    ├── src/{cli.ts,task-store.ts,validation.ts,report.ts}
    ├── tests/{unit,integration,e2e}/
    ├── fixtures/
    ├── package.json  package-lock.json  tsconfig.json  README.md  .gitignore
    └── dist/                              # build artifact, produced in Phase 3+
```

A disposable reference checkout of PhantomDeps itself (the thing being tested, not evidence of testing it) can live anywhere outside `.docs/` and outside git — e.g. a local `.repo/phantomdeps-checkout/`.

### 0.1 Carried over from the last run — fix or re-test before going further
The most recent report (`PhantomDeps Real-Time Validation Report`, commit `f73a60c`) left these open. Whoever runs this protocol next should treat them as the first items to close, not new discoveries:
- **WARN fixture naming mismatch:** the hook looks for `risky-new-pkg-demo`; the committed fixture is named `risky-new-pkg-warn-demo`. It fell through to a live registry lookup and returned BLOCK instead of WARN. Fix the fixture name or the hook's lookup before re-running Phase 6.
- **Unsupported-spec exit code:** the direct CLI path exits `1` (parser error) instead of the documented `3`/`UNVERIFIED`. Only the Bob-hook path currently matches the contract (exit `2`, strict block). Fix or update the documented contract — don't leave the mismatch silent.
- **No native Bob or Antigravity application session has actually run yet.** The last run only exercised `npx tsx .bob/hooks/PreToolUse.mjs` directly and a CLI-wrapper fallback for Antigravity — real, but not the same as a Bob IDE task session. **This does not satisfy the hackathon's `bob_sessions/` evidence requirement.** A genuine Bob IDE session (Plan/Ask/Agent, with a Tasks-panel summary screenshot) still needs to happen for actual submission evidence.
- **Live registry verification is still untested** — the registry was unreachable from that sandbox, so no `ALLOW` claim from a live lookup exists yet, only from the offline fixture.
- **Mixed-package aggregation (worst-case verdict across multiple packages in one request) has not been exercised.**

### 0.2 Bobcoin Budget Plan — hard cap: 30

You have **30 Bobcoins for this entire validation exercise**, not 40, and it doesn't refill mid-hackathon. This changes *where* the work in the 11-phase roadmap happens — it doesn't change what has to be proven.

**The rule: Antigravity does the thinking, exploring, and debugging, for free. Bob does a small number of confident, pre-written executions of a workflow that's already proven to work.** Write out the exact text of every Bob prompt below in Antigravity or a plain text file *before* you open Bob — a well-formed one-shot request costs far less than a back-and-forth where Bob has to ask clarifying questions or you correct it mid-task.

**Do first, entirely in Antigravity — 0 coins:**
Phases 0–3 (baseline audit, product contract, architecture, clean TaskForge build) run entirely here. Don't open Bob until TaskForge builds, passes tests, and you've confirmed PhantomDeps' offline BLOCK/ALLOW/WARN fixtures by hand.

**Then, in Bob — target ≤ 10 tasks total:**

| # | Bob task (one prompt each) | Covers | Priority |
|---|---|---|---|
| 1 | Agent: bring the already-working TaskForge baseline into a Bob-driven repo state | Phases 1–3 | Must keep |
| 2 | Agent + `PreToolUse` hook: propose the `is-odd`/`isOddBatch` enhancement, let PhantomDeps BLOCK it | Phase 4 | **Must keep** — the flagship proof |
| 3 | Ask: explain the BLOCK using cited evidence from the decision log | Phase 5.1 | Must keep — cheap, and a second distinct piece of Bob evidence |
| 4 | Agent: apply the human-approved fix, rebuild, re-test | Phase 5.3–5.8 | Must keep — completes the story |
| 5 | Agent: run the ALLOW case (`lodash`/`merge`) and the WARN fixture | Phase 6.1–6.2 | Keep if possible |
| 6 | Agent: confirm the native hook produces the same verdicts as the direct wrapper (parity check) | Phase 7.1–7.3 | Keep if possible |
| 7 | Agent: run 2–3 highest-value adversarial cases (wrong version, missing symbol, one unsafe command shape) — not the full Phase 8 list | Phase 8 (partial) | Nice to have |
| 8 | Ask: summarize final readiness against the checklist | Phase 10.5 | Nice to have — mostly writing, keep it short |

**Cut first if coins run low, in this order:**
1. Phase 9 outsider-agent review — do it with a teammate or in Antigravity instead, and say plainly that this one check wasn't Bob-native.
2. The rest of Phase 8's adversarial matrix beyond the 2–3 cases in task 7.
3. Phase 6.3/6.4 (UNVERIFIED and mixed-package cases) — still run these in Antigravity so the finding exists somewhere, just disclose they weren't exercised via Bob.
4. Task 8 above — write the readiness summary yourself; it needs no Bob call.

**Never cut tasks 1–4.** If you can only afford four Bob interactions, that quartet alone still proves the core claim — package exists, symbol doesn't, Bob blocks it, a human-approved fix makes it pass — with at least two genuine `bob_sessions/` screenshots (tasks 2 and 4).

Check your balance in Bob IDE **Settings → General** after every 2–3 tasks. If you're burning faster than roughly 3 coins per task, stop and cut from the bottom of the list immediately, rather than finding out you're at zero mid-flagship-demo.

---

## 1. Mission

You are the **Lead Validation Engineer and Delivery Orchestrator**. Prove, with a real working project and recorded evidence, whether the `phantomdeps` CLI genuinely works during an AI-assisted software-build workflow.

Build a small but realistic sample product called **TaskForge** — a command-line task-management service with JSON import/export, validation, and a report command. TaskForge is not the hackathon product; it is a controlled real-time validation target for `phantomdeps`.

The essential proof:
> An AI agent proposes or writes code that requires npm packages. `phantomdeps` intercepts the dependency-install claim, verifies the package and the symbols the code actually uses, blocks a wrong claim before installation, allows a verified claim, warns on a risky package, records evidence, and allows the corrected project to build and pass tests.

Execute the same numbered roadmap in two parallel lanes — **IBM Bob** (Plan, Ask, Agent, the configured `PreToolUse` hook) and **Antigravity** (its normal agent/build workflow plus a CLI-wrapper or supported interception path). Phase IDs, step IDs, goals, acceptance criteria, tests, expected outputs, and definition of done must be identical in both lanes; only the tool-specific execution differs.

Do not merely run PhantomDeps' built-in fixture demo. Use it as a baseline, then run PhantomDeps against the real TaskForge project while it is being built.

---

## 2. Known PhantomDeps facts to verify, not blindly assume

- Repository: `https://github.com/adishxm/phantomdeps` — npm-first, verification-only pre-install AI dependency claim gate. Must not install or execute package code during verification.
- Offline fixtures expected: `BLOCK` for `is-odd@3.0.1` claiming the nonexistent symbol `isOddBatch`; `ALLOW` for `lodash@4.17.21` claiming `merge`; `WARN` for `risky-new-pkg@0.0.1` (install-script risk).
- Expected commands:
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
- Exit codes for `check`/`verify`/`install`/`add`: `0` ALLOW, `1` WARN, `2` BLOCK, `3` UNVERIFIED.
- The Bob hook lives at `.bob/hooks/PreToolUse.mjs`, configured in `.bob/settings.json` — inspect the current files rather than assuming they match this description.
- The decision log is tamper-*evident* and checked with `phantomdeps audit-log verify`; never call it immutable.

If the current repository differs from any of this, record the difference as evidence and adapt the plan. Never falsify a result to match the README.

---

## 3. Safety and non-negotiable rules

1. Use a disposable or clearly isolated workspace. Never corrupt the PhantomDeps repository.
2. Never use real production credentials, private data, or a real customer project.
3. Don't run arbitrary package lifecycle scripts. Use `npm ci --ignore-scripts` wherever installation is needed.
4. PhantomDeps is verification-only — `phantomdeps install`/`add` are verification aliases, not ordinary installs.
5. Never install the intentionally risky fixture package; demonstrate `WARN` via the pinned fixture or a safe local simulation.
6. Network access, if used, is only for explicitly approved, version-pinned registry metadata checks. The primary acceptance path must stay reproducible offline.
7. Never let an AI agent silently repair a `BLOCK` finding — a human approves the correction first, then the agent applies the narrowly scoped patch.
8. Never bypass a failing gate with `--force`, a disabled hook, a changed exit-code expectation, or a fake report.
9. Inspect staged files before every commit. Never commit secrets, `node_modules`, caches, local logs, or private validation material.
10. Don't push or submit to a protected/public destination without the repository owner's authorization. A local commit and a prepared push command are enough unless pushing is explicitly authorized.
11. Record exact commands, exit codes, commit IDs, timestamps, environment versions, and evidence paths.
12. If IBM Bob or Antigravity can't perform a required hook action here, use a documented CLI-wrapper fallback and label the limitation clearly — never claim native hook integration was tested when it wasn't.

---

## 4. Validation target: TaskForge

Location: `.docs/02_TEST/Tested_project_[agent-name]/`.

**Required behavior:** `create` a task (ID, title, status, timestamps); `list` from a local JSON file; `complete` a task; `import` from JSON with validation; `report` counts by status plus a machine-readable JSON report; a CLI entry point and a small library module so imports are visible in source; unit, integration, and at least one end-to-end command test; a successful build artifact (`dist/`); at least two legitimate packages with exact versions pinned in `package-lock.json`.

TaskForge must be a real project, not a shell script that prints PhantomDeps output — PhantomDeps must gate an actual dependency claim during its build.

### Controlled dependency progression

- **Stage A — Clean baseline.** Minimal TypeScript core, only necessary packages, deterministic.
- **Stage B — Intentional AI claim failure.** Propose a report-formatting enhancement using `import { isOddBatch } from "is-odd"` (a symbol `is-odd@3.0.1` does not export) and `npm install is-odd`. Expected: PhantomDeps intercepts, result is `BLOCK`, nothing installs, the agent sees evidence of the missing symbol, does *not* auto-repair, and the decision is written to `.phantomdeps/decisions.ndjson`.
- **Stage C — Human-approved correction.** After human approval, fix the code (real API or remove the package). Re-run PhantomDeps, build, and tests; the corrected project must finish cleanly with no invalid import left behind.
- **Stage D — Verified allow.** A real pinned package with an existing symbol, e.g. `import { merge } from "lodash"`. Run PhantomDeps with explicit context (`--symbols merge`, `--file`, or `--diff`). Expected: `ALLOW`, exit `0`.
- **Stage E — Warning.** The pinned risky fixture (or an equivalent safe fixture). Expected: `WARN`, human review required, no unsafe install.
- **Stage F — Unverified/fail-closed.** An unsupported/ambiguous spec (URL, VCS, unsupported file form). Expected in strict agent context: `UNVERIFIED`, fail-closed. Use the current CLI/hook behavior — don't invent a result.

---

## 5. Parallel roadmap phases

Run every phase in both lanes with identical IDs.

**Phase 0 — Environment and baseline audit.** `0.1` inspect PhantomDeps' commit, scripts, CLI routes, fixture loader, policy engine, evidence writer, tests, Bob hook. `0.2` verify Node/npm versions, create the isolated workspace. `0.3` run PhantomDeps' existing test suite unmodified. `0.4` run all built-in offline scenarios, record expected vs. actual. `0.5` verify the audit log, capture baseline commit + environment manifest. `0.6` document Bob/Antigravity integration capabilities and limitations.
*Gate:* tests pass or every failure has a recorded cause; offline BLOCK/ALLOW/WARN match expectations; baseline evidence saved; no mutation introduced.

**Phase 1 — TaskForge product contract.** `1.1` problem statement. `1.2` user journey (agent proposes a dependency → PhantomDeps gates it → developer approves a fix → product builds). `1.3` acceptance criteria for every command plus the dependency-gate behavior. `1.4` package matrix (package, version, claimed symbols, expected verdict, exit code, install permitted?). `1.5` demo narrative and the evidence a judge/outsider must see.
*Gate:* contract maps every requirement to code/test/evidence; the intentional failure can't be mistaken for a product bug.

**Phase 2 — Architecture and test design.** `2.1` minimal TypeScript architecture and CLI commands. `2.2` JSON data format and validation rules. `2.3` unit/integration/e2e test cases defined *before* implementation. `2.4` the real-time dependency-claim workflow for both lanes. `2.5` evidence schema and naming convention. `2.6` cleanup/isolation so the fixture scenario can't leak into other repos.
*Gate:* architecture implementable with no hidden services; every required verdict has a reproducible test case.

**Phase 3 — Build the clean baseline.** `3.1` scaffold with pinned versions, reproducible setup. `3.2` implement create/list/complete/import/report. `3.3` tests for normal + invalid input. `3.4` build and test before any intentional claim. `3.5` commit the clean baseline.
*Gate:* documented setup succeeds; `npm run build` succeeds; unit/integration/e2e pass; baseline committed.

**Phase 4 — Real-time BLOCK during agent building.** `4.1` give both lanes the same enhancement request. `4.2` let the agent generate the intentional invalid import/claim. `4.3` capture the exact tool request/CLI command before PhantomDeps evaluates it. `4.4` run the native Bob `PreToolUse` hook if available, else the documented wrapper. `4.5` run the equivalent Antigravity path. `4.6` verify `BLOCK` (missing `isOddBatch`). `4.7` verify no install occurred and TaskForge stays controlled. `4.8` capture terminal output, exit code, decision record, command digest, finding, hash chain.
*Gate:* the block happens during a real project change, not just a standalone fixture command; both lanes stop it; evidence is independently understandable.

**Phase 5 — Human-approved repair.** `5.1` agent explains the block with cited evidence. `5.2` human decision required before any repair. `5.3` apply the smallest approved fix. `5.4` re-run PhantomDeps with explicit claim context. `5.5` build + full tests. `5.6` re-run the e2e workflow from a clean state. `5.7` confirm the invalid symbol is gone from source and output. `5.8` commit the correction.
*Gate:* correction is human-approved and traceable; PhantomDeps returns the expected verified result; build/tests pass; no invalid import or unauthorized install remains.

**Phase 6 — ALLOW/WARN/UNVERIFIED matrix.** `6.1` real verified claim → `ALLOW`. `6.2` warning fixture → `WARN` + human review. `6.3` unsupported/ambiguous spec → `UNVERIFIED`/fail-closed if supported. `6.4` multi-package request with mixed outcomes → worst-case aggregation. `6.5` JSON and terminal output for the same decision. `6.6` audit-log integrity after all decisions.
*Gate:* verdict matrix complete with actual exit codes matching the documented contract; mixed-package case tested; terminal/JSON/audit evidence consistent.

**Phase 7 — Native hook and cross-agent comparison.** `7.1` Bob's actual hook contract and exit behavior. `7.2` Antigravity's actual interception/wrapper path. `7.3` compare the same claim/package/version/symbols/expected verdict across lanes. `7.4` pass-through for non-install commands. `7.5` unsafe command shapes, shell metacharacters, multi-package commands, unsupported specs. `7.6` record any platform limitation instead of hiding it.
*Gate:* native integration proven with evidence, or explicitly marked unavailable; both lanes preserve the same security semantics.

**Phase 8 — Advanced/adversarial testing.** `8.1` re-run all PhantomDeps tests after integration work. `8.2` TaskForge tests from a clean checkout. `8.3` missing package, wrong version, missing symbol, default-vs-named export, malformed claim context. `8.4` network/registry unavailable behavior. `8.5` tampered decision-log records → confirm audit validation catches it. `8.6` dependency + secret scans. `8.7` confirm no package code is ever executed during verification. `8.8` measure runtime, record environment — don't claim a performance guarantee from one run.
*Gate:* all critical security/correctness cases pass; any known limitation has a reproducible test and a documented risk.

**Phase 9 — Outsider-agent review.** `9.1` prepare a sanitized review package (setup, source snapshot, expected behavior, no narrative that gives away the answer). `9.2` an independent Bob agent installs/runs TaskForge from a clean checkout. `9.3` an independent Antigravity agent repeats it. `9.4` both determine whether BLOCK happened before install and whether the corrected project works. `9.5` reviewers challenge false claims, missing evidence, unsafe bypasses, misleading demo steps. `9.6` classify findings, fix release-blockers. `9.7` re-run affected tests, record post-fix results.
*Gate:* an outsider reproduces the core demonstration without private context; no release-blocking issue survives.

**Phase 10 — Final demo and release package.** `10.1` freeze the TaskForge release candidate and PhantomDeps reference commit. `10.2` prepare a 3–5 minute live demo (baseline → agent request → blocked claim → evidence → approval → correction → allow → warn → successful build). `10.3` prepare a deterministic offline fallback. `10.4` screenshots/terminal captures as backup only — the primary proof is a live run. `10.5` write the final report (commands, outputs, verdict matrix, limitations, commit IDs). `10.6` a sanitized ZIP of the Markdown plans/reports plus minimal TaskForge source, if requested. `10.7` a final checklist; stop before any consequential public submission unless authorized.
*Gate:* a new person can reproduce the demonstration from the README; live path and offline fallback both work; the final report never overstates what was tested.

---

## 6. Mandatory step record

For every step, in both lanes, create one file at `.docs/02_TEST/Tested_report_[agent-name]/imple-plan/phase-NN-<slug>.md` (plan) or `.docs/02_TEST/Tested_report_[agent-name]/report/<name>.md` (result), using this structure:

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

Use the same step ID and title in both lanes.

---

## 7. Verdict matrix template

Save to `.docs/02_TEST/Tested_report_[agent-name]/report/verdict-matrix.md`:

| Case | Project context | Package/version | Claimed symbol/context | Expected verdict | Actual verdict | Exit code | Installed? | Evidence | Status |
|---|---|---|---|---:|---:|---:|---:|---|---|
| Invalid symbol | TaskForge report enhancement | `is-odd@3.0.1` | `isOddBatch` | BLOCK | | | No | | |
| Valid symbol | TaskForge corrected enhancement | pinned verified package | explicit symbol | ALLOW | | | Only after approval | | |
| Risk signal | Controlled fixture | `risky-new-pkg@0.0.1` | `doSomething` | WARN | | | No unsafe install | | |
| Unsupported spec | TaskForge install claim | URL/VCS/file form | N/A | UNVERIFIED | | | No | | |
| Mixed request | Multi-package claim | valid + invalid | explicit context | worst-case | | | Per policy | | |

---

## 8. Phase-gate procedure

At the end of every phase, in order:
1. Confirm every step has an owner and a result.
2. Run the required local tests.
3. If local tests pass, run the advanced tests.
4. Investigate every failure — never hide it.
5. Compare IBM Bob and Antigravity outputs for parity.
6. Save the phase report to `.docs/02_TEST/Tested_report_[agent-name]/report/` and the plan to `.docs/02_TEST/Tested_report_[agent-name]/imple-plan/`.
7. Update the verdict matrix, evidence index, decision log, and risk log (all under `.docs/02_TEST/Tested_report_[agent-name]/report/`).
8. Inspect the Git diff and run a secret scan.
9. Create a descriptive commit only after the gate passes.
10. Push only when explicitly authorized and only to the agreed branch.
11. Record the commit ID and exact evidence paths.
12. Don't advance while the phase is `FAILED` or `BLOCKED`.

A phase is complete only if its code, tests, evidence, report, plan, and Git checkpoint all exist.

---

## 9. Lane instructions

**IBM Bob:** start with **Plan** mode to inspect PhantomDeps and design the workspace. Use **Ask** mode to explain the current CLI, hook contract, fixtures, policy engine, and evidence format with repository citations. Use **Agent** mode to scaffold/build TaskForge, requiring every dependency claim to pass through PhantomDeps. Run the native `.bob/hooks/PreToolUse.mjs` integration when the environment supports it — capture the exact hook input shape, tool name, command, stderr, exit code, decision-log record. Use isolated/read-only subagents for outsider review where available. If Bob can't intercept a command here, wrap it and mark the result `fallback integration`, not `native integration`. Never let Bob repair a `BLOCK` finding without a human-approval record.

**Antigravity:** same TaskForge requirements, dependency matrix, and step IDs. Use Antigravity's normal agent/build workflow with a PhantomDeps CLI wrapper or supported interception path, receiving the same package spec and claim context as the Bob lane. Record whether Antigravity has native interception, wrapper interception, or only explicit preflight verification. Run the same BLOCK/ALLOW/WARN/UNVERIFIED/mixed-package/audit-log cases. Compare final source, build output, tests, and decision records against the Bob lane.

---

## 10. What counts as success

1. PhantomDeps baseline tests pass, or every failure is explained.
2. TaskForge is a real working project — source, tests, build, CLI behavior.
3. An invalid AI dependency claim is intercepted before installation during TaskForge development.
4. The invalid symbol is identified with evidence from the package artifact or fixture.
5. The block is recorded with the expected decision and hash-chain information.
6. A human-approved correction lets the project build and pass tests.
7. A verified package claim produces `ALLOW`.
8. A risky package produces `WARN` without unsafe installation.
9. An unsupported/ambiguous case fails closed as `UNVERIFIED` when policy requires it.
10. Both lanes produce equivalent security and product outcomes.
11. An outsider reproduces the core flow from a clean checkout.
12. The final report clearly separates live-registry validation, offline-fixture validation, native-hook validation, wrapper validation, and untested claims.

Success is declared only when the real TaskForge build flow exercised the gate — not because a canned demo printed the expected text.

---

## 11. Final response required from the agent

Return a concise, evidence-rich completion report at `.docs/02_TEST/Tested_report_[agent-name]/report/00-executive-summary.md`, containing:
1. PhantomDeps commit tested and environment versions.
2. TaskForge path (`.docs/02_TEST/Tested_project_[agent-name]/`) and commit.
3. Bob lane result: native hook, fallback wrapper, or unavailable.
4. Antigravity lane result: native interception, fallback wrapper, or unavailable.
5. Full verdict matrix with actual exit codes.
6. Proof the invalid claim was blocked before installation.
7. Proof the corrected TaskForge build and tests passed.
8. Audit-log verification result.
9. Outsider-review findings and remediation.
10. Known limitations and untested claims.
11. Exact paths to every file under `.docs/02_TEST/Tested_report_[agent-name]/` and `.docs/02_TEST/Tested_project_[agent-name]/`.
12. Git commits and push status.
13. A one-paragraph live-demo script and an offline fallback script.

Never claim a native integration, real-time behavior, install result, or test that wasn't actually observed.

---

## 12. Start now

Start with Phase 0. Do not modify PhantomDeps until its current commit, layout, test results, built-in scenario results, hook configuration, and limitations are recorded. Then create the workspace at `.docs/02_TEST/Tested_project_[agent-name]/` and execute the synchronized Bob/Antigravity roadmap phase by phase, writing every plan and report to `.docs/02_TEST/Tested_report_[agent-name]/` as you go.

<!-- Status: HISTORICAL BASELINE | Last-updated commit: 76ecbff -->

# Synchronized IBM Bob Roadmap — `phantomdeps`

**Status:** `HISTORICAL BASELINE — NOT CURRENT RELEASE APPROVAL`
**Last-updated commit:** `76ecbff`
**Historical phases:** 00–08 recorded as passed at the time; active remediation is in `ibm-bob-remediation-roadmap.md`.
**Repository:** https://github.com/adishxm/phantomdeps
**Release tag:** `v0.1.0` (commit `c31a950`)

This file preserves the Phase 00–08 baseline. It is not evidence that the current Bob hook is fail-closed or that live API inspection is implemented. Use the active synchronized remediation lane for Phases 09–14.


## Phase 00 — Intake, repository audit, and operating agreement


### Step 0.1 — Inventory `.docs`, `.repo`, `.brain`, source, tests, CI, and deployment files

**Objective:**

Complete **0.1 — Inventory `.docs`, `.repo`, `.brain`, source, tests, CI, and deployment files** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 00 step 0.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `0.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-00: complete step 0.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-00-report.md`

**Status:**

`NOT_STARTED`


### Step 0.2 — Identify team roster, tool ownership, skills, availability, and decision authority

**Objective:**

Complete **0.2 — Identify team roster, tool ownership, skills, availability, and decision authority** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 00 step 0.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `0.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-00: complete step 0.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-00-report.md`

**Status:**

`NOT_STARTED`


### Step 0.3 — Extract the user problem, target users, constraints, and hackathon judging opportunity

**Objective:**

Complete **0.3 — Extract the user problem, target users, constraints, and hackathon judging opportunity** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 00 step 0.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `0.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-00: complete step 0.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-00-report.md`

**Status:**

`NOT_STARTED`


### Step 0.4 — Select the MVP, define non-goals, and record assumptions/blockers

**Objective:**

Complete **0.4 — Select the MVP, define non-goals, and record assumptions/blockers** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes. Select only the fixture-replayable claim gate; do not expand to a broad AI supply-chain firewall.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 00 step 0.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `0.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-00: complete step 0.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-00-report.md`

**Status:**

`NOT_STARTED`


### Step 0.5 — Create the synchronized roadmap index and traceability matrix

**Objective:**

Complete **0.5 — Create the synchronized roadmap index and traceability matrix** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 00 step 0.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `0.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-00: complete step 0.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-00-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 01 — Product definition and acceptance contract


### Step 1.1 — Convert research into a concise problem statement and value proposition

**Objective:**

Complete **1.1 — Convert research into a concise problem statement and value proposition** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 01 step 1.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `1.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-01: complete step 1.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-01-report.md`

**Status:**

`NOT_STARTED`


### Step 1.2 — Define personas, user journeys, user stories, and measurable acceptance criteria

**Objective:**

Complete **1.2 — Define personas, user journeys, user stories, and measurable acceptance criteria** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 01 step 1.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `1.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-01: complete step 1.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-01-report.md`

**Status:**

`NOT_STARTED`


### Step 1.3 — Define the MVP boundary, success metrics, demo scenario, and deferred scope

**Objective:**

Complete **1.3 — Define the MVP boundary, success metrics, demo scenario, and deferred scope** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 01 step 1.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `1.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-01: complete step 1.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-01-report.md`

**Status:**

`NOT_STARTED`


### Step 1.4 — Map each requirement to implementation, test, evidence, and owner

**Objective:**

Complete **1.4 — Map each requirement to implementation, test, evidence, and owner** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 01 step 1.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `1.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-01: complete step 1.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-01-report.md`

**Status:**

`NOT_STARTED`


### Step 1.5 — Review the product contract with the team and resolve contradictions

**Objective:**

Complete **1.5 — Review the product contract with the team and resolve contradictions** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 01 step 1.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `1.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-01: complete step 1.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-01-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 02 — Architecture, UX, security, and delivery design


### Step 2.1 — Produce or validate system architecture and repository structure

**Objective:**

Complete **2.1 — Produce or validate system architecture and repository structure** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 02 step 2.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `2.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-02: complete step 2.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-02-report.md`

**Status:**

`NOT_STARTED`


### Step 2.2 — Define data model, API contracts, integrations, and error behavior

**Objective:**

Complete **2.2 — Define data model, API contracts, integrations, and error behavior** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 02 step 2.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `2.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-02: complete step 2.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-02-report.md`

**Status:**

`NOT_STARTED`


### Step 2.3 — Define UX flows, screens, accessibility requirements, and demo path

**Objective:**

Complete **2.3 — Define UX flows, screens, accessibility requirements, and demo path** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 02 step 2.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `2.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-02: complete step 2.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-02-report.md`

**Status:**

`NOT_STARTED`


### Step 2.4 — Create threat model, privacy boundary, authentication/authorization plan, and secrets policy

**Objective:**

Complete **2.4 — Create threat model, privacy boundary, authentication/authorization plan, and secrets policy** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 02 step 2.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `2.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-02: complete step 2.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-02-report.md`

**Status:**

`NOT_STARTED`


### Step 2.5 — Define local setup, CI, deployment, backup/recovery, observability, and rollback approach

**Objective:**

Complete **2.5 — Define local setup, CI, deployment, backup/recovery, observability, and rollback approach** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 02 step 2.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `2.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-02: complete step 2.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-02-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 03 — Build the smallest demonstrable product


### Step 3.1 — Create or repair the local development environment

**Objective:**

Complete **3.1 — Create or repair the local development environment** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 03 step 3.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `3.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-03: complete step 3.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-03-report.md`

**Status:**

`NOT_STARTED`


### Step 3.2 — Implement the highest-value vertical slice end to end

**Objective:**

Complete **3.2 — Implement the highest-value vertical slice end to end** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes. The target vertical slice is `phantomdeps demo --fixture` with networking disabled: package exists, requested symbol is absent, evidence card blocks, patch-only remediation is revalidated.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 03 step 3.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `3.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-03: complete step 3.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-03-report.md`

**Status:**

`NOT_STARTED`


### Step 3.3 — Add user-visible progress, errors, citations/evidence, and safe defaults

**Objective:**

Complete **3.3 — Add user-visible progress, errors, citations/evidence, and safe defaults** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 03 step 3.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `3.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-03: complete step 3.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-03-report.md`

**Status:**

`NOT_STARTED`


### Step 3.4 — Add unit tests and fixtures while implementing each slice

**Objective:**

Complete **3.4 — Add unit tests and fixtures while implementing each slice** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 03 step 3.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `3.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-03: complete step 3.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-03-report.md`

**Status:**

`NOT_STARTED`


### Step 3.5 — Integrate only the minimum external services required for the demo

**Objective:**

Complete **3.5 — Integrate only the minimum external services required for the demo** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 03 step 3.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `3.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-03: complete step 3.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-03-report.md`

**Status:**

`NOT_STARTED`


### Step 3.6 — Keep Antigravity and IBM Bob outputs behaviorally equivalent; document tool-specific differences

**Objective:**

Complete **3.6 — Keep Antigravity and IBM Bob outputs behaviorally equivalent; document tool-specific differences** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 03 step 3.6 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `3.6` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-03: complete step 3.6 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-03-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 04 — Team-local validation


### Step 4.1 — Run formatting, linting, type checks, static analysis, and unit tests

**Objective:**

Complete **4.1 — Run formatting, linting, type checks, static analysis, and unit tests** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 04 step 4.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `4.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-04: complete step 4.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-04-report.md`

**Status:**

`NOT_STARTED`


### Step 4.2 — Run integration, API, database, and contract tests where applicable

**Objective:**

Complete **4.2 — Run integration, API, database, and contract tests where applicable** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 04 step 4.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `4.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-04: complete step 4.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-04-report.md`

**Status:**

`NOT_STARTED`


### Step 4.3 — Run end-to-end happy-path and critical failure-path tests

**Objective:**

Complete **4.3 — Run end-to-end happy-path and critical failure-path tests** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 04 step 4.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `4.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-04: complete step 4.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-04-report.md`

**Status:**

`NOT_STARTED`


### Step 4.4 — Test each acceptance criterion against the actual product

**Objective:**

Complete **4.4 — Test each acceptance criterion against the actual product** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 04 step 4.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `4.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-04: complete step 4.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-04-report.md`

**Status:**

`NOT_STARTED`


### Step 4.5 — Record exact commands, environment, commit, duration, output, failures, and fixes

**Objective:**

Complete **4.5 — Record exact commands, environment, commit, duration, output, failures, and fixes** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 04 step 4.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `4.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-04: complete step 4.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-04-report.md`

**Status:**

`NOT_STARTED`


### Step 4.6 — Conduct a human team review using a clean checkout or clean environment

**Objective:**

Complete **4.6 — Conduct a human team review using a clean checkout or clean environment** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 04 step 4.6 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `4.6` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-04: complete step 4.6 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-04-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 05 — Advanced validation, security, and resilience


### Step 5.1 — Test edge cases, malformed inputs, timeouts, retries, empty states, and partial failures

**Objective:**

Complete **5.1 — Test edge cases, malformed inputs, timeouts, retries, empty states, and partial failures** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 05 step 5.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `5.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-05: complete step 5.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-05-report.md`

**Status:**

`NOT_STARTED`


### Step 5.2 — Run regression, mutation/property/fuzz testing where practical

**Objective:**

Complete **5.2 — Run regression, mutation/property/fuzz testing where practical** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 05 step 5.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `5.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-05: complete step 5.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-05-report.md`

**Status:**

`NOT_STARTED`


### Step 5.3 — Run dependency, secret, permission, privacy, and basic supply-chain checks

**Objective:**

Complete **5.3 — Run dependency, secret, permission, privacy, and basic supply-chain checks** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 05 step 5.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `5.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-05: complete step 5.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-05-report.md`

**Status:**

`NOT_STARTED`


### Step 5.4 — Test reproducibility from a clean checkout and verify no hidden local dependency exists

**Objective:**

Complete **5.4 — Test reproducibility from a clean checkout and verify no hidden local dependency exists** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 05 step 5.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `5.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-05: complete step 5.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-05-report.md`

**Status:**

`NOT_STARTED`


### Step 5.5 — Test performance against an explicitly stated small-hackathon target

**Objective:**

Complete **5.5 — Test performance against an explicitly stated small-hackathon target** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 05 step 5.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `5.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-05: complete step 5.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-05-report.md`

**Status:**

`NOT_STARTED`


### Step 5.6 — Validate generated outputs against repository evidence; reject hallucinated claims

**Objective:**

Complete **5.6 — Validate generated outputs against repository evidence; reject hallucinated claims** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 05 step 5.6 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `5.6` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-05: complete step 5.6 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-05-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 06 — Outsider-agent review


### Step 6.1 — Prepare a read-only review package containing the product brief, acceptance criteria, source snapshot, test instructions, and known risks

**Objective:**

Complete **6.1 — Prepare a read-only review package containing the product brief, acceptance criteria, source snapshot, test instructions, and known risks** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 06 step 6.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `6.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-06: complete step 6.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-06-report.md`

**Status:**

`NOT_STARTED`


### Step 6.2 — Ask an independent agent with no implementation context to install, run, and review the product

**Objective:**

Complete **6.2 — Ask an independent agent with no implementation context to install, run, and review the product** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 06 step 6.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `6.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-06: complete step 6.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-06-report.md`

**Status:**

`NOT_STARTED`


### Step 6.3 — Ask a second independent reviewer to challenge usability, security, correctness, and demo credibility

**Objective:**

Complete **6.3 — Ask a second independent reviewer to challenge usability, security, correctness, and demo credibility** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 06 step 6.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `6.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-06: complete step 6.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-06-report.md`

**Status:**

`NOT_STARTED`


### Step 6.4 — Compare outsider findings with team findings; classify each as valid, invalid, or needs investigation

**Objective:**

Complete **6.4 — Compare outsider findings with team findings; classify each as valid, invalid, or needs investigation** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 06 step 6.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `6.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-06: complete step 6.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-06-report.md`

**Status:**

`NOT_STARTED`


### Step 6.5 — Fix all release-blocking findings and document accepted residual risks

**Objective:**

Complete **6.5 — Fix all release-blocking findings and document accepted residual risks** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 06 step 6.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `6.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-06: complete step 6.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-06-report.md`

**Status:**

`NOT_STARTED`


### Step 6.6 — Re-run the affected tests after every fix

**Objective:**

Complete **6.6 — Re-run the affected tests after every fix** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 06 step 6.6 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `6.6` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-06: complete step 6.6 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-06-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 07 — Finalization, demo, and release candidate


### Step 7.1 — Freeze scope and create a release-candidate branch or tag

**Objective:**

Complete **7.1 — Freeze scope and create a release-candidate branch or tag** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 07 step 7.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `7.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-07: complete step 7.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-07-report.md`

**Status:**

`NOT_STARTED`


### Step 7.2 — Verify README, setup instructions, architecture explanation, screenshots, and demo data

**Objective:**

Complete **7.2 — Verify README, setup instructions, architecture explanation, screenshots, and demo data** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 07 step 7.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `7.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-07: complete step 7.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-07-report.md`

**Status:**

`NOT_STARTED`


### Step 7.3 — Create the timed demo script: problem, before state, Bob/Antigravity workflow, evidence, result, and impact

**Objective:**

Complete **7.3 — Create the timed demo script: problem, before state, Bob/Antigravity workflow, evidence, result, and impact** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 07 step 7.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `7.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-07: complete step 7.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-07-report.md`

**Status:**

`NOT_STARTED`


### Step 7.4 — Prepare judge/client questions and concise answers grounded in evidence

**Objective:**

Complete **7.4 — Prepare judge/client questions and concise answers grounded in evidence** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 07 step 7.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `7.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-07: complete step 7.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-07-report.md`

**Status:**

`NOT_STARTED`


### Step 7.5 — Run a full rehearsal from a clean environment and record the result

**Objective:**

Complete **7.5 — Run a full rehearsal from a clean environment and record the result** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 07 step 7.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `7.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-07: complete step 7.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-07-report.md`

**Status:**

`NOT_STARTED`


### Step 7.6 — Create the final release checklist and explicitly document any known limitations

**Objective:**

Complete **7.6 — Create the final release checklist and explicitly document any known limitations** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 07 step 7.6 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `7.6` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-07: complete step 7.6 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-07-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.


## Phase 08 — Submission package


### Step 8.1 — Verify the exact hackathon portal requirements from authoritative sources

**Objective:**

Complete **8.1 — Verify the exact hackathon portal requirements from authoritative sources** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 08 step 8.1 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `8.1` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-08: complete step 8.1 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-08-report.md`

**Status:**

`NOT_STARTED`


### Step 8.2 — Prepare repository URL, demo URL, video, screenshots, pitch, description, team details, and technology disclosure as required

**Objective:**

Complete **8.2 — Prepare repository URL, demo URL, video, screenshots, pitch, description, team details, and technology disclosure as required** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 08 step 8.2 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `8.2` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-08: complete step 8.2 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-08-report.md`

**Status:**

`NOT_STARTED`


### Step 8.3 — Run a final secret scan and verify that no `.repo` or private data is included

**Objective:**

Complete **8.3 — Run a final secret scan and verify that no `.repo` or private data is included** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 08 step 8.3 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `8.3` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-08: complete step 8.3 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-08-report.md`

**Status:**

`NOT_STARTED`


### Step 8.4 — Verify the submission package against the tagged commit, not an uncommitted working tree

**Objective:**

Complete **8.4 — Verify the submission package against the tagged commit, not an uncommitted working tree** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 08 step 8.4 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `8.4` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-08: complete step 8.4 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-08-report.md`

**Status:**

`NOT_STARTED`


### Step 8.5 — Produce a final submission checklist with owner and status for every field

**Objective:**

Complete **8.5 — Produce a final submission checklist with owner and status for every field** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 08 step 8.5 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `8.5` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-08: complete step 8.5 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-08-report.md`

**Status:**

`NOT_STARTED`


### Step 8.6 — Stop before actually submitting any official, public, legal, financial, or attestational form unless an authorized human explicitly confirms the final payload

**Objective:**

Complete **8.6 — Stop before actually submitting any official, public, legal, financial, or attestational form unless an authorized human explicitly confirms the final payload** for the focused npm-first `phantomdeps` MVP. The objective, quality bar, and definition of done are identical in both lanes. This is a safety stop, not a request to submit.

**IBM Bob execution:**

Use IBM Bob deliberately: Plan mode for decomposition, Ask mode for repository-grounded explanation, Agent mode for implementation, and isolated/parallel agents only with explicit boundaries and verification. Capture Bob prompts, outputs, tool calls, corrections, and session artifacts. Test `PreToolUse`; if unavailable or unsuitable, use the labelled `phantomdeps install` wrapper fallback.

**Antigravity execution:**

In the parallel lane, use the team Antigravity workflow with repository inspection, planned changes, captured prompts/outputs where permitted, and command/test/human verification; this field is included to make the contract explicit even when executing in IBM Bob.

**Inputs:**

Supplied research report; current repository artifacts; prior phase outputs; authoritative IBM Bob/hackathon sources when applicable. Missing inputs are recorded as `UNKNOWN`, not inferred.

**Outputs/artifacts:**

Phase 08 step 8.6 artifact(s) under `.brain/.imple-plan/`, `.brain/.report/`, `.docs/`, `src/`, `tests/`, or `evidence/` as applicable; a traceability row and decision/risk updates.

**Owner:**

`UNKNOWN` — repository contains no roster, ownership file, or decision-authority evidence. Assign before phase gate.

**Dependencies:**

Phase 0 audit and the immediately preceding step unless an explicit dependency exception is recorded in the decision log.

**Commands or tool actions:**

Record exact commands/tool actions before execution. Candidate commands: `find`, `git status`, `git diff --check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm phantomdeps demo --fixture --offline`, `git diff --staged`. Do not run commands that are not supported by the eventual repository.

**Acceptance criteria:**

Pass only when the artifact for `8.6` exists; objective and criteria match both lanes; owner and dependencies are recorded; no unsupported claim is presented as fact; and the relevant acceptance evidence is linked.

**Local tests:**

Run applicable static/unit/integration/E2E/acceptance tests for this step. At intake, the current result is `NOT_RUN`: no product repository exists in the active sandbox.

**Advanced tests:**

Run adversarial, reproducibility, security, or outsider checks appropriate to the step. Current result is `NOT_RUN` until implementation exists.

**Evidence to capture:**

Capture file paths, command output, commit ID, timestamp, environment, reviewer, Bob/Antigravity session evidence where applicable, and exact fixture/source citations. For unknowns, capture the discovery task and owner.

**Failure handling:**

Record failure verbatim in `.brain/.report/risk-and-blocker-log.md`; do not hide or overwrite failing evidence. Stop the phase if the cause is unknown or if lanes diverge.

**Git checkpoint:**

Planned: `phase-08: complete step 8.6 and record evidence`; commit only after the phase gate passes.

**Report file:**

`.brain/.report/phase-08-report.md`

**Status:**

`NOT_STARTED`


**Phase gate:** assign owners, run local tests, then advanced tests; generate the phase report and plan update; update traceability, decisions, risks, and evidence index; verify secrets/artifacts; commit only after the gate passes.

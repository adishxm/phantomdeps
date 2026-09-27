<!-- Status: ACTIVE | Last-updated commit: PENDING -->
# IBM Bob Remediation Roadmap — `phantomdeps`

**Status:** `ACTIVE — NOT_STARTED`
**Synchronized companion:** `agent-remediation-roadmap.md`
**Execution rule:** objectives, acceptance criteria, artifacts, tests, evidence, dependencies, and status are identical across lanes. Only tool execution differs.

## IBM Bob operating protocol

- **Plan mode:** decompose the current step and identify unknowns; do not claim implementation evidence.
- **Ask mode:** explain repository-grounded findings and challenge any claim lacking a source path or command result.
- **Agent mode:** implement only the scoped step, run the required commands, and preserve failed evidence.
- **PreToolUse:** test the documented `{event, session_id, tool, input}` payload. Exit `2` is the only tested blocking signal. Stdout is ignored, so persist evidence to `.phantomdeps/` and use stderr only as a tested diagnostic path.
- **Wrapper fallback:** if the real Bob hook cannot provide generated-code context or cannot be reproduced, use the verification-only wrapper and label the workflow `ASSUMPTION` or `TEAM DESIGN`, not `CONFIRMED`.
- **No automatic install:** do not let Bob run npm installation as part of verification.

## Synchronized step map

The following step IDs are identical to the Secondary agent lane. Use the same acceptance contract and report files.

| Step | IBM Bob execution difference | Shared status |
|---|---|---|
| 09.1 | Plan claims; Ask challenges; Agent applies contract edits; capture Bob prompts and session IDs | `NOT_STARTED` |
| 09.2 | Plan designs B0–B3; Agent writes corpus/runner; Ask reviews measurement wording | `NOT_STARTED` |
| 10.1 | Ask inspects actual hook payload; Agent implements parser/tests; execute the hook through subprocess | `NOT_STARTED` |
| 11.1 | Plan bounds artifact inspection; Agent implements safe adapter; Ask reviews “no execution” evidence | `NOT_STARTED` |
| 12.1 | Agent implements log verifier; Ask audits provenance language and tamper evidence | `NOT_STARTED` |
| 13.1 | Ask identifies available diff/context; Agent implements explicit wrapper input and patch-only repair | `NOT_STARTED` |
| 14.1 | Rehearse Bob Plan/Ask/Agent; capture real session or invoke documented wrapper fallback | `NOT_STARTED` |

## Step 09.1 — Truthful capability and team contract

Use Plan → Ask → Agent. Capture the exact prompts, answers, changed files, and review. The shared objective, acceptance criteria, tests, evidence, checkpoint, report, and failure handling are defined in the Secondary agent lane’s Step 09.1. Do not mark this step passed until the README and `.brain` summaries are corrected and the roster is truthful.

## Step 09.2 — B0/B1/B2/B3 evaluation

Use Plan to create the corpus schema, Agent to implement the runner, and Ask to verify that `TEAM MEASUREMENT` is reserved for committed reproducible results. Capture corpus hash, runner commit, raw output, false-block rate, abstention rate, latency, and repair outcomes.

## Step 10.1 — Fail-closed Bob hook

Use a synthetic documented payload first, then a real Bob session if available. Confirm unknown, unsupported, option-first, and multi-package commands cannot silently pass. If Bob cannot provide code/diff context, stop claiming agent-native import verification and activate the wrapper fallback documented in the contract.

## Step 11.1 — Live artifact/API verification

Use Bob Ask to challenge archive traversal, integrity, lifecycle-script, and dynamic-export risks. The step is passed only by a narrow safe implementation with evidence; a metadata-only result must be labelled `UNVERIFIED` and Phase 11 remains `DEFERRED`.

## Step 12.1 — Evidence and provenance

Use Agent to add `audit-log verify`; use Ask to inspect tamper tests and terminology. “Tamper-evident after verification” is the only allowed local-log claim.

## Step 13.1 — Context and repair

Use Bob’s actual payload if it contains changed-file/diff context. If it does not, require explicit symbols or use the verification-only wrapper. A fixture may demonstrate the concept but may not be presented as Bob-generated import evidence.

## Step 14.1 — Independent release

A Bob session export is preferred. If unavailable, the report must state `UNKNOWN` for full live workflow validity and show the labelled wrapper fallback. The final tag cannot be created while any research decision gate is incomplete.

**Report files:** `.brain/.report/phase-09-report.md` through `.brain/.report/phase-14-report.md`.
**Status:** `NOT_STARTED`

# Phase 1 — TaskForge Product Contract

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Define the full product contract for TaskForge: commands, data format, acceptance criteria, dependency matrix, and demo narrative.

## 1.1 Problem statement
TaskForge is a CLI task-management service used as a controlled, realistic validation target for PhantomDeps.
It must be a real TypeScript project with working commands, tests, and a build artifact — not a shell script that prints PhantomDeps output.

## 1.2 User journey
1. AI agent (IBM Bob) designs a TaskForge enhancement requiring a new npm package.
2. Bob calls `execute_command` with `npm install <package>`.
3. PhantomDeps `PreToolUse` hook intercepts the tool call before execution.
4. PhantomDeps evaluates the dependency claim (package exists? symbol exported? risk signals?).
5. **Stage B**: BLOCK — Bob's `is-odd` / `isOddBatch` claim is rejected. No install occurs. Evidence written to `.phantomdeps/decisions.ndjson`.
6. Human developer reviews the block evidence, decides the import was wrong, and approves a fix.
7. **Stage C**: Human-approved correction applied. PhantomDeps re-checks, result is ALLOW or the invalid package is removed. Build and tests pass.
8. **Stage D**: A second enhancement uses `lodash@4.17.21` / `merge` — PhantomDeps ALLOW.
9. **Stage E**: `risky-new-pkg@0.0.1` / `doSomething` — WARN, no install.

## 1.3 Acceptance criteria

| Command | AC | Test type |
|---|---|---|
| `taskforge create <title>` | Creates task with UUID, status=pending, timestamps, saves to JSON | Unit + e2e |
| `taskforge list` | Reads tasks from JSON, prints each with status mark | Unit + e2e |
| `taskforge complete <id>` | Sets status=completed, updates updatedAt | Unit |
| `taskforge import <path>` | Validates JSON with AJV schema; rejects malformed input with errors | Integration |
| `taskforge report [--json]` | Counts by status; machine-readable JSON mode | Integration + e2e |
| `taskforge --help` | Prints usage without error | e2e |

Dependency gate behavior:
- PhantomDeps intercepts `npm install is-odd` → BLOCK (`isOddBatch` not exported)
- PhantomDeps intercepts `npm install lodash` → ALLOW (`merge` exported)
- PhantomDeps intercepts `npm install risky-new-pkg` → WARN (install scripts)
- Block is recorded in `.phantomdeps/decisions.ndjson` with hash chain

## 1.4 Package matrix

| Package | Version | Claimed symbol | Expected verdict | Exit code | Install permitted? | Stage |
|---|---|---|---|---|---|---|
| is-odd | 3.0.1 | isOddBatch | BLOCK | 2 | No | B |
| lodash | 4.17.21 | merge | ALLOW | 0 | Yes (after human approval) | C/D |
| ajv | 8.17.1 | Ajv (default) | ALLOW | 0 | Yes (baseline dep) | A |
| risky-new-pkg | 0.0.1 | doSomething | WARN | 1 | No unsafe install | E |

## 1.5 Demo narrative
A judge watching the demo must see:
1. TaskForge working (create/list/report) before any intentional failure.
2. Bob proposing `import { isOddBatch } from 'is-odd'` — the PhantomDeps hook blocking it with a clear BLOCK message.
3. The `decisions.ndjson` entry confirming the block (hash chain intact).
4. A human approval step visible in the plan/report.
5. The corrected project building and tests passing.
6. ALLOW for lodash, WARN for risky-new-pkg.

## Evidence paths
- This file is the contract document.

## Next action
Phase 2: Architecture and test design

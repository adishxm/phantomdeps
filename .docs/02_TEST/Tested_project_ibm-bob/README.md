# TaskForge — IBM Bob Validation Lane

TaskForge is a CLI task-management service built as the validation target for the PhantomDeps hackathon demonstration.

## Setup

```bash
npm ci --ignore-scripts
npm run build
npm test
```

## Commands

```
taskforge create <title>       Create a new task
taskforge list                 List all tasks
taskforge complete <id>        Mark a task as completed
taskforge import <path>        Import tasks from JSON file
taskforge report [--json]      Display task statistics
taskforge --help               Show help
```

## PhantomDeps dependency gate

This project was built under the IBM Bob `PreToolUse` hook (`.bob/hooks/PreToolUse.mjs`).
During Stage B, an AI-generated import of `isOddBatch` from `is-odd` was blocked:

```
[phantomdeps] BLOCK
  is-odd@3.0.1: BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1.
```

The corrected project uses `lodash@4.17.21` (`merge`) — verified ALLOW.

## Evidence

See `.docs/02_TEST/Tested_report_ibm-bob/` for full validation reports and evidence.

## Dependencies

| Package | Version | Verified verdict |
|---|---|---|
| ajv | 8.17.1 | ALLOW (baseline) |
| lodash | 4.17.21 | ALLOW (Stage D) |

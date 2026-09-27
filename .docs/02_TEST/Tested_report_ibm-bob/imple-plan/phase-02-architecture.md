# Phase 2 — Architecture and Test Design

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Design the TaskForge TypeScript architecture, data format, test cases, and evidence schema before implementation.

## 2.1 TypeScript architecture

```
.docs/02_TEST/Tested_project_ibm-bob/
├── src/
│   ├── cli.ts           # CLI entry point (create/list/complete/import/report/--help)
│   ├── task-store.ts    # TaskStore class — CRUD + file I/O; uses lodash.merge for metadata
│   ├── validation.ts    # AJV schema validator; Task interface; validateTask/validateTasksArray
│   └── report.ts        # generateReport/formatReportText; StatusReport interface
├── tests/
│   ├── unit/
│   │   ├── task-store.test.ts   # createTask, completeTask, updateMetadata, getTasks
│   │   └── validation.test.ts   # valid task, missing fields, wrong status, not-array
│   ├── integration/
│   │   └── report.test.ts       # generateReport with mixed status; completionRate formula
│   └── e2e/
│       └── cli.test.ts          # --help, create, list, report --json, import valid, import invalid
├── fixtures/
│   ├── valid-tasks.json         # 3 tasks: 1 pending, 1 in_progress, 1 completed
│   └── invalid-tasks.json       # malformed tasks (missing title, wrong status)
├── package.json         # name=taskforge, deps: ajv@8.17.1, lodash@4.17.21
├── package-lock.json
├── tsconfig.json        # module=NodeNext, rootDir=./, outDir=./dist
└── README.md
```

## 2.2 JSON data format

```json
[
  {
    "id": "<uuid>",
    "title": "<string, minLength 1>",
    "status": "pending | in_progress | completed",
    "createdAt": "<ISO 8601>",
    "updatedAt": "<ISO 8601, optional>",
    "metadata": { "<key>": "<any>, optional" }
  }
]
```

## 2.3 Test cases (defined before implementation)

### Unit — task-store.test.ts
- `createTask('Test task')` → returns task with id, title, status=pending, createdAt
- `completeTask(id)` → status=completed, updatedAt set
- `completeTask('nonexistent')` → returns null
- `getTasks()` when file missing → returns []
- `updateTaskMetadata` merges using lodash.merge

### Unit — validation.test.ts
- Valid task object → `{ valid: true }`
- Missing required field `title` → `{ valid: false, errors: [...] }`
- Wrong status value → `{ valid: false, errors: [...] }`
- Not an array for `validateTasksArray` → `{ valid: false, errors: [...] }`

### Integration — report.test.ts
- `generateReport([])` → total=0, completionRate="0.0%"
- `generateReport([...3 mixed tasks])` → correct counts
- `formatReportText(report)` → contains "=== TaskForge Status Report ==="

### E2E — cli.test.ts
- `--help` → exit 0, output contains "taskforge"
- `create "E2E Task"` → exit 0, output contains "Created task"
- `list` → exit 0, output contains task
- `report --json` → exit 0, parseable JSON with total/pending/completed
- `import valid-tasks.json` → exit 0, "Successfully imported"
- `import invalid-tasks.json` → exit 1, error message

## 2.4 Real-time dependency-claim workflow

```
Bob [Agent mode] → proposes: npm install is-odd
    ↓ execute_command tool call
    ↓ PreToolUse hook fires
    ↓ hook reads stdin JSON: { tool: "execute_command", input: { command: "npm install is-odd" } }
    ↓ parseHookCommand → specs: ["is-odd"]
    ↓ loadFixture("is-odd-demo") → fixture hit
    ↓ resolveClaimsFromFixture → claim: { missing: ["isOddBatch"] }
    ↓ applyPolicy → action: BLOCK
    ↓ appendDecisionLog → .phantomdeps/decisions.ndjson
    ↓ hook exits 2
    ↓ Bob IDE: tool call blocked, agent sees stderr BLOCK message
```

## 2.5 Evidence schema

Each evidence record contains:
- Command text + SHA-256 digest
- Exit code
- Package spec + resolved version
- Verdict + findings
- Decision ID + previous hash + record hash
- ISO timestamp
- Lane identifier (IBM Bob)

## 2.6 Cleanup/isolation
- TaskForge uses its own `.tasks.json` in the project directory.
- e2e tests use `os.tmpdir()` for isolation.
- The PhantomDeps fixture scenario doesn't leak into the TaskForge package registry.
- All installs done via `npm ci --ignore-scripts` inside the project dir.

## Next action
Phase 3: Build the clean TaskForge baseline

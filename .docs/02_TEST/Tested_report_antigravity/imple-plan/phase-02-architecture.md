# Step 2.0 — Architecture and Test Design

Status: PASSED  
Lane: Antigravity  
Commit under test: `0b6a319`  
Owner: Antigravity Lead Validation Engineer  

## Objective
Design the minimal, deterministic TypeScript architecture for TaskForge, its data schemas, validation logic, test suites (unit, integration, E2E), dependency interception workflows, and evidence indexing rules.

## 2.1 TaskForge TypeScript Architecture

The TaskForge project lives at `.docs/02_TEST/Tested_project_antigravity/`:

```text
Tested_project_antigravity/
├── src/
│   ├── cli.ts            # CLI command router (create, list, complete, import, report)
│   ├── task-store.ts     # Local JSON file persistence layer
│   ├── validation.ts     # Schema validation using ajv
│   └── report.ts         # Report aggregation and status calculations
├── tests/
│   ├── unit/             # validation and task-store logic tests
│   ├── integration/      # import and report pipeline tests
│   └── e2e/              # child_process CLI command invocation tests
├── fixtures/
│   ├── valid-tasks.json  # Valid JSON import sample
│   └── invalid-tasks.json# Malformed JSON import sample
├── package.json
├── tsconfig.json
└── README.md
```

## 2.2 JSON Data Model & Validation Rules

Task Schema:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string", "minLength": 1 },
    "status": { "type": "string", "enum": ["pending", "in_progress", "completed"] },
    "createdAt": { "type": "string" },
    "updatedAt": { "type": "string" }
  },
  "required": ["id", "title", "status", "createdAt"]
}
```

Validation Rules:
- Non-empty titles required.
- Status must strictly be one of `pending`, `in_progress`, or `completed`.
- Tasks imported from JSON must validate against the Ajv schema.

## 2.3 Test Specifications (Pre-Implementation)
- **Unit Tests (`tests/unit/`):**
  - Verify `validateTask` accepts valid task objects and rejects missing/invalid fields.
  - Verify `TaskStore` adds, retrieves, and updates task statuses.
- **Integration Tests (`tests/integration/`):**
  - Verify `importTasks` processes multi-item files and rejects invalid payloads.
  - Verify `generateReport` aggregates task counts and percentages accurately.
- **End-to-End Tests (`tests/e2e/`):**
  - Verify CLI commands: `create`, `list`, `complete`, `report`, `import` via subprocess execution.

## 2.4 Dependency Claim Gate Workflow
- **PreToolUse Hook / Gated Install:**
  Every package addition runs through PhantomDeps verification:
  - If verdict is `BLOCK` or `UNVERIFIED`: Tool execution is terminated with exit 2.
  - If verdict is `ALLOW`: Installation is permitted.
  - If verdict is `WARN`: Warning is emitted to stderr; human approval required.

## 2.5 Evidence Schema
All outputs, decisions, and command logs are captured in:
`.docs/02_TEST/Tested_report_antigravity/evidence/`
- `commands/`: Shell execution logs with exit codes and environment specs.
- `terminal-output/`: Stderr and stdout captures from CLI and hooks.
- `decisions/`: Exported records from `.phantomdeps/decisions.ndjson`.
- `checksums/`: SHA-256 digests of generated source and test artifacts.

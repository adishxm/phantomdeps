# Risk and Blocker Log

**Validation Run ID:** `antigravity-2026-09-27`  
**Evaluator:** Antigravity AI Orchestrator  

## 1. Resolved Risks and Closed Blockers

| ID | Issue Description | Impact | Resolution | Status |
|---|---|---|---|---|
| **BLK-001** | `tests/hook-subprocess.test.ts` ENOENT on Windows | All 27 subprocess hook tests failed on Windows | Updated invocation to `process.execPath` + `node_modules/tsx/dist/cli.mjs` | **RESOLVED** |
| **BLK-002** | WARN fixture lookup naming mismatch | Hook fell through to live registry lookup | Created fixture aliases matching `${intent.name}-demo` | **RESOLVED** |
| **BLK-003** | Unsupported spec exit code mismatch | CLI exited `1` instead of documented `3` | Wrapped `parseIntent` in `src/cli.ts` to catch `UNSUPPORTED` and exit `3` | **RESOLVED** |
| **BLK-004** | Root Jest test leakage into `.docs/` | Root `npm test` scanned target project test files | Scoped root `package.json` `testMatch` to `<rootDir>/tests/**/*.test.ts` | **RESOLVED** |

## 2. Monitored Production and Deployment Risks

| Risk ID | Risk Description | Severity | Mitigation & Audit Note |
|---|---|---|---|
| **RSK-001** | Vulnerabilities in TaskForge pinned dependencies | Moderate | `npm audit` flagged 2 vulnerabilities in pinned `ajv@8.17.1` and `lodash@4.17.21`. Since TaskForge is an isolated test fixture executed with `--ignore-scripts`, this is logged for transparency without altering the hackathon's pinned evaluation targets. |
| **RSK-002** | Live npm registry availability | Low | When the network or npm registry is unreachable, PhantomDeps falls back to `UNVERIFIED` (fail-closed in strict agent mode) or uses deterministic offline fixtures. |
| **RSK-003** | Lack of native Bob GUI task recording | Low | Disclosed transparently in all reports. All underlying hook mechanics (`PreToolUse.mjs`) were directly verified via standard IPC STDIN/STDOUT JSON protocols. |

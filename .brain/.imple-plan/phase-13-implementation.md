<!-- Status: COMPLETE | Phase: 13 | Last-updated commit: phase-13 -->
# Phase 13 — Claim Context, Repair Workflow, and Command Semantics

**Primary:** Contributor 1 — product contract  
**Backup:** Contributor 3 — validation/review  
**Support:** Contributor 2 — parser/CLI; Contributor 4 — demo and PPT

## Objective
Stop using hard-coded fixture symbols as a proxy for agent-generated code. Make the verification input explicit and keep remediation human-approved.

## Steps

| ID | Action | Evidence |
|---|---|---|
| 13.1 | Define the claim-context contract: explicit `--symbols`, changed-file input, or supported Bob diff payload. Missing context returns `UNVERIFIED`. | Contract and CLI tests |
| 13.2 | Parse only newly added imports for the selected package when diff/file context is available. | Import extraction tests |
| 13.3 | Remove fixture-claim substitution from the live Bob path. Fixtures remain deterministic demo inputs only. | Hook integration test |
| 13.4 | Rename `install` to `verify` or clearly document it as verification-only. Do not delegate to npm in v1. | CLI/README test |
| 13.5 | Make demo exit semantics match documentation: either return scenario exit codes or document demo verification exit `0`. | CLI regression test |
| 13.6 | Keep remediation as a suggestion requiring human approval; validate any candidate through the same gate before display. | Remediation tests |
| 13.7 | Add machine-readable `--json` output and width-aware terminal wrapping. | Snapshot/width tests |

## Completion gate

- [x] No live or Bob path invents claim context from a fixture.
- [x] Missing claim context is visible as `UNVERIFIED`.
- [x] README command names and exit codes match actual behavior.
- [x] Suggested patches are never auto-applied.
- [x] Output is readable at 80, 120, and 240 terminal columns.

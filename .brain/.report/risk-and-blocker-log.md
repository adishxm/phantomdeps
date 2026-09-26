<!-- Status: DRAFT | Last-updated commit: 8d9ba18 -->
# Risk and Blocker Log

**Status:** `DRAFT`  
**Last-updated commit:** `PENDING`

| ID | Impact | Evidence | Owner | Next action | Status |
|---|---|---|---|---|---|
| `B-001` | Cannot build or test | No product repository/source/tests/manifests found in active sandbox | Contributor 1 | Create or attach product repository | `BLOCKED` |
| `B-002` | Cannot finalize assignments or approvals | Four placeholder contributors are allocated, but actual names, availability, and decision authority are absent | Contributor 1 | Replace placeholders and confirm team | `BLOCKED` |
| `B-003` | Cannot verify Bob integration | No Bob session export or installed project config; hook runtime assumption untested | Contributor 3 | Run harmless `PreToolUse` test; preserve wrapper | `BLOCKED` |
| `B-004` | Cannot claim submission readiness | No portal capture, URLs, video, screenshots, team details, or tagged product commit | Contributor 4 | Recheck authoritative portal at release | `BLOCKED` |
| `R-001` | Overclaiming security/novelty | Research explicitly limits scope and marks novelty/metrics uncertain | Contributor 3 | Use narrow claim language and cite evidence | `OPEN` |
| `R-002` | Unsafe install path | npm lifecycle scripts and arbitrary source forms can execute code | Contributor 2 | Fake package manager, argv parsing, no execution, adversarial tests | `OPEN` |
| `R-003` | Single-person dependency during absence | Contributor 1/2 workstreams could stall without handoff | Contributor 3 | Maintain current checkout and takeover notes | `OPEN` |
| `R-004` | PPT claims diverge from implementation evidence | Presentation owner may work ahead of measured results | Contributor 4 | Every slide claim cites artifact/test; Contributor 3 reviews | `OPEN` |

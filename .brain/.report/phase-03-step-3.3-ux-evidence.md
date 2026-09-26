<!-- Status: COMPLETE | Phase: 03 | Step: 3.3 -->
# Step 3.3 — User-Visible Progress, Errors, Citations, and Safe Defaults

**Phase:** 03  
**Step:** 3.3 — Add user-visible progress, errors, citations/evidence, and safe defaults  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session

---

## User-visible elements confirmed in implementation

| Element | Where | Status |
|---|---|---|
| Scenario header with package name and generated code | `src/demo/runner.ts` | ✅ Present |
| `[FIXTURE] Loaded: <id> — captured <date>` label | `src/demo/runner.ts` | ✅ Present — judges see fixture date, not current date |
| Colour-coded verdict header (`BLOCK`=red, `ALLOW`=green, `WARN`=yellow, `UNVERIFIED`=magenta) | `src/evidence/writer.ts` | ✅ Present |
| Finding rule ID (`l2.symbol_missing`, `l1.not_found`, etc.) | `src/evidence/writer.ts` | ✅ Present |
| Full citation chain in each finding | `src/evidence/writer.ts` | ✅ Present |
| `Record hash` + `Prev hash` (hash chain visible) | `src/evidence/writer.ts` | ✅ Present |
| `[REMEDIATION]` block on BLOCK with exact patch suggestion | `src/demo/runner.ts` | ✅ Present |
| `[ADVISORY]` block on WARN with explicit human-confirmation message | `src/demo/runner.ts` | ✅ Present |
| `Decision record appended to .phantomdeps/decisions.ndjson` confirmation | `src/demo/runner.ts` | ✅ Present |
| `✔ Demo completed. Verdict: X (expected: X)` — machine-checkable exit validation | `src/demo/runner.ts` | ✅ Present |
| `--help` output with all commands and exit codes | `src/cli.ts` | ✅ Present |
| Error message on unknown command | `src/cli.ts` | ✅ Present |
| Error on missing package spec | `src/cli.ts` | ✅ Present |
| `UNSAFE` error on shell metacharacters | `src/parser.ts` | ✅ Present + tested |
| `UNSUPPORTED` error on URL/path/VCS forms | `src/parser.ts` | ✅ Present + tested |

## Safe defaults

| Default | Value | Rationale |
|---|---|---|
| Default verdict when no symbols given | `UNVERIFIED` | Never assume ALLOW without evidence |
| UNAVAILABLE verdict | `UNVERIFIED`, exit 3 | Registry down ≠ safe to install |
| Demo default scenario | `block` | Most impactful judge-facing scenario first |
| Decision log genesis hash | `sha256:0000...` (64 zeros) | Deterministic; verifiable |
| Registry timeout | 8 000 ms | Prevents indefinite hang |
| No package execution | Fixture mode only | D-004 non-negotiable |

## Step result
`COMPLETE` — all user-visible progress messages, error paths, citation formats, and safe defaults confirmed present in implementation.

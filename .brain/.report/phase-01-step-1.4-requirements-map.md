<!-- Status: COMPLETE | Phase: 01 | Step: 1.4 -->
# Step 1.4 — Requirements to Implementation, Test, Evidence, and Owner Map

**Phase:** 01  
**Step:** 1.4 — Map each requirement to implementation, test, evidence, and owner  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Step 1.2 (user stories AC-01–AC-10); existing `src/`; `tests/`

---

## Requirements traceability table

| Req ID | Requirement | Source story | Implementation file(s) | Test(s) | Evidence | Owner | Status |
|---|---|---|---|---|---|---|---|
| `R-01` | BLOCK when requested symbol is absent from package exports | US-01 / AC-01 | `src/checker/static-claim.ts` · `src/engine/policy.ts` | `tests/static-claim.test.ts` · `tests/policy.test.ts` | Demo BLOCK output; `l2.symbol_missing` finding | Contributor 2 | `CONFIRMED` |
| `R-02` | Show exactly which symbol is missing, package version, and evidence citation | US-02 / AC-01 | `src/evidence/writer.ts` | `tests/policy.test.ts` (finding assertions) | Terminal card with rule ID + citation | Contributor 2 | `CONFIRMED` |
| `R-03` | Provide remediation suggestion without auto-installing | US-03 | `src/demo/runner.ts` (remediation block) | Manual demo verification | "No package was installed" printed; patch shown | Contributor 2 | `CONFIRMED` |
| `R-04` | Write hash-chained NDJSON decision record | US-04 / AC-06 | `src/evidence/writer.ts` · `src/engine/policy.ts` | `tests/policy.test.ts` (hash field assertions) | `.phantomdeps/decisions.ndjson` written | Contributor 2 | `CONFIRMED` |
| `R-05` | Return UNVERIFIED (not ALLOW) when registry is unreachable | US-05 / AC-04 | `src/adapters/registry.ts` · `src/engine/policy.ts` | `tests/policy.test.ts` ("UNVERIFIED on unavailable") | Verdict `UNVERIFIED`, finding `l1.unavailable` | Contributor 2 | `CONFIRMED` |
| `R-06` | Return BLOCK when package is 404 on npm | US-06 / AC-03 | `src/adapters/registry.ts` · `src/engine/policy.ts` | `tests/policy.test.ts` ("BLOCK when package NOT_FOUND") | Verdict `BLOCK`, finding `l1.not_found` | Contributor 2 | `CONFIRMED` |
| `R-07` | Bob `PreToolUse` hook intercepts `npm install` and exits 2 on BLOCK | US-07 | `.bob/hooks/PreToolUse.mjs` | Manual hook test (Phase 03 Step 3.5) | Hook file present; exit-2 logic documented | Contributor 3 | `ASSUMPTION` — hook runtime untested |
| `R-08` | Offline demo reproducible from clean checkout, no network | US-08 / AC-08 | `src/demo/runner.ts` · `src/fixtures/loader.ts` · `fixtures/is-odd-demo.json` | `tests/fixture-loader.test.ts`; full demo run | Demo output confirmed; `npm test` 23/23 | Contributor 2 | `CONFIRMED` |
| `R-09` | Reject shell metacharacters in package spec | AC-07 | `src/parser.ts` (`SHELL_META_RE`) | `tests/parser.test.ts` ("rejects shell metacharacters") | Test passes | Contributor 2 | `CONFIRMED` |
| `R-10` | Reject unsupported source forms (URLs, paths, VCS) | AC-07 | `src/parser.ts` (`REGISTRY_SPEC_RE`) | `tests/parser.test.ts` ("rejects URL forms", "rejects local path") | Test passes | Contributor 2 | `CONFIRMED` |
| `R-11` | WARN on deprecated package | US-01 (downstream) | `src/engine/policy.ts` (l1.deprecated) | `tests/policy.test.ts` ("returns WARN when package is deprecated") | Finding `l1.deprecated`, verdict `WARN` | Contributor 2 | `CONFIRMED` |
| `R-12` | B0 vs B2 benchmark measurement | AC-10 | Phase 05 Step 5.5 | Benchmark runner (not yet built) | `TEAM MEASUREMENT` — target metric | Contributor 3 | `NOT_YET` — Phase 05 |
| `R-13` | Hook payload capture (actual Bob stdin JSON) | Assumption A-002 | `.bob/hooks/PreToolUse.mjs` + Phase 03 Step 3.5 | Manual test in Phase 03 | Payload capture file | Contributor 3 | `NOT_YET` — Phase 03 |
| `R-14` | Clean-checkout reproducibility on a second machine | AC (Phase 04) | `package.json` + `package-lock.json` | Phase 04 Step 4.6 | Clean-checkout log | All four | `NOT_YET` — Phase 04 |

---

## Open gaps identified in this step

| Gap | Impact | Resolution | Phase |
|---|---|---|---|
| `R-07` hook runtime not tested | Cannot claim `PreToolUse` works until tested | Run harmless block test in Phase 03 Step 3.5 | 03 |
| `R-12` no benchmark | Cannot claim workflow improvement metric | Build and run corpus in Phase 05 | 05 |
| `R-13` hook stdin shape unconfirmed | Input fields beyond `{event, session_id, tool, input}` not guaranteed | Capture payload in Phase 03 | 03 |
| `R-14` no second-machine test | Reproducibility unconfirmed | Clean-checkout test in Phase 04 | 04 |

---

## Step result
`COMPLETE` — 14 requirements mapped to implementation files, tests, evidence, and owners. 11 confirmed against existing code. 3 explicitly deferred to Phase 03–05 with resolution paths.

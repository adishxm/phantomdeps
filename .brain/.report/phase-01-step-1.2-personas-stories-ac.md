<!-- Status: COMPLETE | Phase: 01 | Step: 1.2 -->
# Step 1.2 — Personas, User Journeys, User Stories, and Measurable Acceptance Criteria

**Phase:** 01  
**Step:** 1.2 — Define personas, user journeys, user stories, and measurable acceptance criteria  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Research §8 (user/buyer analysis); existing `src/` implementation; `fixtures/is-odd-demo.json`

---

## Personas

### P1 — Alex, Developer using IBM Bob
- **Context:** Writing a new feature; asks Bob to install an npm package the agent recommended.
- **Pain:** Agent installs a package whose exported API doesn't match the generated import — build breaks 10 minutes later with `TypeError: isOddBatch is not a function`.
- **Need:** Immediate pre-install block with cited evidence and a reviewable fix, not a silent failure.
- **Adoption barrier:** False blocks on legitimate packages; slow checks interrupting flow.

### P2 — Jordan, Platform/Build Engineer
- **Context:** Owns npm policy for a team using AI-assisted development.
- **Pain:** Agent-generated `npm install` commands bypass manual review; agents can alter `package.json` and shared caches before policy runs.
- **Need:** Machine-readable evidence (JSON/exit code) that a pre-install gate ran, with a decision ID and command digest for the audit log.
- **Adoption barrier:** Hook bypass paths; availability of the gate in CI.

### P3 — Sam, Application Security Engineer
- **Context:** Reviews AI-generated PRs for supply-chain risk.
- **Pain:** Existing SCA tools don't know the agent's intent or what symbol the changed code imports — they report on reputation, not claim correctness.
- **Need:** Rule IDs, exact artifact hash, and source citations in every finding so triage is fast.
- **Adoption barrier:** Alert fatigue from tools with too many weak signals.

---

## User journeys

### Journey A — Happy path: ALLOW (P1)
1. Bob generates code: `import { format } from 'date-fns'` + `npm install date-fns`.
2. `phantomdeps check date-fns --symbols format` runs (via hook or wrapper).
3. `format` is found in `date-fns`'s declared exports. Verdict: **ALLOW**.
4. npm install proceeds. Build passes.
5. Decision record appended to `.phantomdeps/decisions.ndjson`.

### Journey B — Core demo path: BLOCK (P1, P3)
1. Bob generates code: `import { isOddBatch } from 'is-odd'` + `npm install is-odd`.
2. `phantomdeps` intercepts. `is-odd@3.0.1` is real (L1: FOUND). `isOddBatch` is absent from exports (L2: SYMBOL_MISSING).
3. Verdict: **BLOCK**. Terminal card shows rule `l2.symbol_missing`, fixture citation, and remediation suggestion.
4. npm install does **not** run. No package code executes.
5. Bob (Ask mode) explains the mismatch using the evidence file.
6. Bob (Agent mode) applies the reviewed patch (`isOddBatch` → `isOdd`) after human approval.
7. Gate re-runs: ALLOW. Tests pass.

### Journey C — Unavailable registry: UNVERIFIED (P2)
1. CI runner has no outbound network.
2. `phantomdeps check some-pkg` — registry times out.
3. Verdict: **UNVERIFIED**. Exit code 3. Never converted to ALLOW.
4. Human explicitly permits with a logged reason, or the job fails closed.

---

## User stories

| ID | Story | Acceptance criteria | Implemented in |
|---|---|---|---|
| `US-01` | As a developer, I want `phantomdeps` to block a `npm install` whose symbol is absent from the package's exports, so I catch the mismatch before the install runs. | `demo --fixture --offline` produces BLOCK with `l2.symbol_missing` finding; exit code 2; no package installed. | `src/demo/runner.ts`, `src/engine/policy.ts` |
| `US-02` | As a developer, I want the block to show exactly which symbol is missing, which package version was checked, and where the evidence came from, so I can fix the import without guessing. | Card shows: package name, resolved version, missing symbol name, fixture/registry citation, capture date. | `src/evidence/writer.ts` |
| `US-03` | As a developer, I want a concrete remediation suggestion (not an auto-install), so I can review and apply it myself. | Card shows the correct symbol and a patch diff. No install is triggered automatically. | `src/demo/runner.ts` (remediation section) |
| `US-04` | As a build engineer, I want a machine-readable JSON decision record with a stable decision ID and command digest, so I can feed it to my audit log. | `.phantomdeps/decisions.ndjson` is written on every run; contains `decisionId`, `commandDigest`, `recordHash`, `previousHash`. | `src/evidence/writer.ts` |
| `US-05` | As a developer, I want the gate to handle registry timeouts gracefully as `UNVERIFIED` (not `ALLOW`), so a flaky network never silently allows an unchecked package. | When registry is unavailable, verdict is `UNVERIFIED`, exit code 3, finding `l1.unavailable`. | `src/engine/policy.ts`, `src/adapters/registry.ts` |
| `US-06` | As a developer, I want a package that is genuinely missing from npm to produce a BLOCK (not UNVERIFIED), so a hallucinated name is caught immediately. | `evidence = NOT_FOUND` → verdict `BLOCK`, finding `l1.not_found`, exit code 2. | `src/engine/policy.ts` |
| `US-07` | As a Bob user, I want `phantomdeps` to work as a Bob `PreToolUse` hook, so the gate runs automatically without a separate wrapper command. | `.bob/hooks/PreToolUse.mjs` intercepts `execute_command` calls matching `npm install`; exit 2 blocks; decision appended to log. | `.bob/hooks/PreToolUse.mjs` |
| `US-08` | As a developer, I want the offline fixture demo to run from a clean checkout with no network, so the demo is reproducible for judges. | `npx tsx src/cli.ts demo --fixture --offline` produces BLOCK + correct remediation with no network calls; `npm test` passes (23/23). | `src/demo/runner.ts`, `fixtures/is-odd-demo.json` |

---

## Measurable acceptance criteria (gate-level)

| Criterion | Measure | Current state |
|---|---|---|
| **AC-01** BLOCK on absent symbol | Fixture `is-odd-demo` → verdict `BLOCK`, exit 2, finding `l2.symbol_missing` | `CONFIRMED` — demo passes, test `policy.test.ts` |
| **AC-02** ALLOW on present symbol | Policy test with `SYMBOL_FOUND` claim → verdict `ALLOW`, exit 0 | `CONFIRMED` — `tests/policy.test.ts` |
| **AC-03** BLOCK on 404 | Policy test with `NOT_FOUND` → verdict `BLOCK`, finding `l1.not_found` | `CONFIRMED` — `tests/policy.test.ts` |
| **AC-04** UNVERIFIED on unavailable | Policy test with `UNAVAILABLE` → verdict `UNVERIFIED`, exit 3 | `CONFIRMED` — `tests/policy.test.ts` |
| **AC-05** No package executes | Demo produces BLOCK and prints "No package was installed" | `CONFIRMED` — demo runner enforces this |
| **AC-06** Decision log written | `.phantomdeps/decisions.ndjson` exists after demo run, contains `recordHash` and `previousHash` | `CONFIRMED` — `src/evidence/writer.ts` |
| **AC-07** Shell metachar rejection | `parseIntent("pkg; rm -rf /")` throws `UNSAFE` | `CONFIRMED` — `tests/parser.test.ts` |
| **AC-08** Offline reproducibility | `demo --fixture --offline` works with no registry call | `CONFIRMED` — fixture loader, no fetch in offline path |
| **AC-09** 23 unit tests pass | `npm test` → 4 suites, 23 tests, 0 failures | `CONFIRMED` — this session |
| **AC-10** B0 vs B2 benchmark | `TEAM MEASUREMENT` — target: measure at least one task with/without gate | `NOT_YET` — Phase 05 Step 5.5 |

---

## Step result
`COMPLETE` — three personas, three user journeys, eight user stories, and ten measurable acceptance criteria defined. AC-01 through AC-09 are `CONFIRMED` against existing implementation. AC-10 is recorded as a `TEAM MEASUREMENT` target for Phase 05.

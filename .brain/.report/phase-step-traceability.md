<!-- Status: IN_PROGRESS | Last-updated commit: PENDING (phase-03 commit) -->
# Phase/Step Traceability Matrix

**Status:** `IN_PROGRESS`
**Last-updated commit:** `PENDING` (phase-03 commit)

Both lanes use the same rows, objectives, acceptance criteria, tests, evidence requirements, and done definition. Tool-specific execution is captured in the two roadmap files.

| Phase/step | Requirement / outcome | Implementation artifact | Test/evidence | Owner | Antigravity | IBM Bob | Status |
|---|---|---|---|---|---|---|---|
| `00.0.1` | Inventory `.docs`, `.repo`, `.brain`, source, tests, CI, and deployment files | `.brain/.report/phase-00-step-0.1-inventory.md` | Directory listing + `git log/status` output; commit `bccd363` | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `00.0.2` | Identify team roster, tool ownership, skills, availability, and decision authority | `.brain/.report/phase-00-step-0.2-roster.md` | `team-allocation.md`, `team-knowledge-matrix.md`; names `UNKNOWN` (Blocker B-002) | IBM Bob Agent | Same contract | Same contract | `COMPLETE — PARTIAL` |
| `00.0.3` | Extract the user problem, target users, constraints, and hackathon judging opportunity | `.brain/.report/phase-00-step-0.3-problem-extract.md` | Research §§1,3; decision log D-001–D-005 | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `00.0.4` | Select the MVP, define non-goals, and record assumptions/blockers | `.brain/.report/phase-00-step-0.4-mvp-selection.md` | Research §§1,5,6,12; D-001–D-005; B-001–B-004; R-001–R-004 | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `00.0.5` | Create the synchronized roadmap index and traceability matrix | `.brain/.report/phase-00-step-0.5-roadmap-index.md` | Confirmed: `ibm-bob-roadmap.md`, `00-roadmap-index.md`, this file — all present and consistent | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `01.1.1` | Convert research into a concise problem statement and value proposition | `.brain/.report/phase-01-step-1.1-problem-statement.md` | Problem statement, value prop, differentiation boundary — grounded in research §§1,3,5,6 | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `01.1.2` | Define personas, user journeys, user stories, and measurable acceptance criteria | `.brain/.report/phase-01-step-1.2-personas-stories-ac.md` | 3 personas, 3 journeys, 8 user stories, 10 ACs; AC-01–AC-09 confirmed, AC-10 stretch | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `01.1.3` | Define the MVP boundary, success metrics, demo scenario, and deferred scope | `.brain/.report/phase-01-step-1.3-mvp-boundary.md` | In-scope (13 confirmed in src/), deferred (9 items), hard metrics confirmed, 90s demo scenario | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `01.1.4` | Map each requirement to implementation, test, evidence, and owner | `.brain/.report/phase-01-step-1.4-requirements-map.md` | 14 requirements; 11 confirmed; 3 deferred to Phase 03–05 | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `01.1.5` | Review the product contract with the team and resolve contradictions | `.brain/.report/phase-01-step-1.5-contract-review.md` | 6 contradictions resolved; 7/7 integrity checks pass | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `02.2.1` | Produce or validate system architecture and repository structure | `.brain/.report/phase-02-step-2.1-architecture.md` | Component map, repo structure, trust boundaries, 6 arch decisions confirmed vs `src/` | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `02.2.2` | Define data model, API contracts, integrations, and error behavior | `.brain/.report/phase-02-step-2.2-data-model-api.md` | 6 types, internal contracts, external integrations, 11-row error behavior table | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `02.2.3` | Define UX flows, screens, accessibility requirements, and demo path | `.brain/.report/phase-02-step-2.3-ux-flows.md` | 7 terminal screen designs, 3 UX flows, 4 accessibility requirements, 90s demo path | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `02.2.4` | Create threat model, privacy boundary, authentication/authorization plan, and secrets policy | `.brain/.report/phase-02-step-2.4-threat-model.md` | 7 actors, 6 attack paths, privacy boundary (no PII), v1 auth plan, secrets clean scan | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `02.2.5` | Define local setup, CI, deployment, backup/recovery, observability, and rollback approach | `.brain/.report/phase-02-step-2.5-setup-ci-deploy.md` | Local setup verified, CI designed, deployment options, observability signals, rollback plan | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `03.3.1` | Create or repair the local development environment | `.github/workflows/ci.yml`, `phase-03-step-3.1-dev-env-ci.md` | CI pipeline on Node 20+22; lint, test, demo gates confirmed | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `03.3.2` | Implement the highest-value vertical slice end to end | `src/gate.ts`, `src/engine/policy.ts`, `src/adapters/registry.ts`, `src/checker/static-claim.ts`, `phase-03-step-3.2-vertical-slice.md` | BLOCK/WARN/ALLOW all confirmed via fixture scenarios | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `03.3.3` | Add user-visible progress, errors, citations/evidence, and safe defaults | `src/evidence/writer.ts`, `src/demo/runner.ts`, `phase-03-step-3.3-ux-evidence.md` | Terminal card, remediation block, citation strings, NDJSON log confirmed | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `03.3.4` | Add unit tests and fixtures while implementing each slice | `tests/gate-integration.test.ts`, `fixtures/lodash-allow-demo.json`, `fixtures/risky-new-pkg-warn-demo.json`, `phase-03-step-3.4-tests-fixtures.md` | 5 suites, 35 tests, 0 failures | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `03.3.5` | Integrate only the minimum external services required for the demo | `.bob/hooks/PreToolUse.mjs`, `phase-03-step-3.5-hook-integration.md` | PreToolUse hook live; offline fixture mode verified; D-004 respected | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `03.3.6` | Keep Antigravity and IBM Bob outputs behaviorally equivalent; document tool-specific differences | `phase-03-step-3.6-parity.md` | IBM Bob and Antigravity share identical source, fixtures, tests; tool-specific differences documented | IBM Bob Agent | Same contract | Same contract | `COMPLETE` |
| `04.4.1` | Run formatting, linting, type checks, static analysis, and unit tests | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `04.4.2` | Run integration, API, database, and contract tests where applicable | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `04.4.3` | Run end-to-end happy-path and critical failure-path tests | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `04.4.4` | Test each acceptance criterion against the actual product | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `04.4.5` | Record exact commands, environment, commit, duration, output, failures, and fixes | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `04.4.6` | Conduct a human team review using a clean checkout or clean environment | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `05.5.1` | Test edge cases, malformed inputs, timeouts, retries, empty states, and partial failures | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `05.5.2` | Run regression, mutation/property/fuzz testing where practical | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `05.5.3` | Run dependency, secret, permission, privacy, and basic supply-chain checks | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `05.5.4` | Test reproducibility from a clean checkout and verify no hidden local dependency exists | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `05.5.5` | Test performance against an explicitly stated small-hackathon target | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `05.5.6` | Validate generated outputs against repository evidence; reject hallucinated claims | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `06.6.1` | Prepare a read-only review package containing the product brief, acceptance criteria, source snapshot, test instructions, and known risks | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `06.6.2` | Ask an independent agent with no implementation context to install, run, and review the product | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `06.6.3` | Ask a second independent reviewer to challenge usability, security, correctness, and demo credibility | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `06.6.4` | Compare outsider findings with team findings; classify each as valid, invalid, or needs investigation | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `06.6.5` | Fix all release-blocking findings and document accepted residual risks | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `06.6.6` | Re-run the affected tests after every fix | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `07.7.1` | Freeze scope and create a release-candidate branch or tag | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `07.7.2` | Verify README, setup instructions, architecture explanation, screenshots, and demo data | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `07.7.3` | Create the timed demo script: problem, before state, Bob/Antigravity workflow, evidence, result, and impact | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `07.7.4` | Prepare judge/client questions and concise answers grounded in evidence | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `07.7.5` | Run a full rehearsal from a clean environment and record the result | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `07.7.6` | Create the final release checklist and explicitly document any known limitations | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `08.8.1` | Verify the exact hackathon portal requirements from authoritative sources | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `08.8.2` | Prepare repository URL, demo URL, video, screenshots, pitch, description, team details, and technology disclosure as required | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `08.8.3` | Run a final secret scan and verify that no `.repo` or private data is included | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `08.8.4` | Verify the submission package against the tagged commit, not an uncommitted working tree | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `08.8.5` | Produce a final submission checklist with owner and status for every field | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |
| `08.8.6` | Stop before actually submitting any official, public, legal, financial, or attestational form unless an authorized human explicitly confirms the final payload | `TBD` | `TBD` | `UNKNOWN` | Same contract | Same contract | `NOT_STARTED` |

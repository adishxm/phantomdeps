<!-- Status: ACTIVE | Last-updated commit: PENDING -->
# Antigravity Remediation Roadmap — `phantomdeps`

**Status:** `ACTIVE — NOT_STARTED`
**Synchronized companion:** `ibm-bob-remediation-roadmap.md`
**Quality bar:** identical to the IBM Bob lane; only execution steps differ.

## Phase 09 — Truth reset, contract, and measurement baseline

### Step 09.1 — Freeze truthful capability and team contract

**Objective:** Label every capability `implemented`, `fixture-only`, `planned`, `unsupported`, or `unknown`; resolve three-versus-four contributors; and correct README/.brain claims.
**Antigravity execution:** Inspect source, tests, Git history, research, and audit; draft the contract; use repository-grounded edits and review.
**IBM Bob execution:** Use Bob Plan/Ask to challenge each claim, then Agent mode to apply the same edits.
**Inputs:** Research report, accuracy audit, implementation-plan audit, current source.
**Outputs/artifacts:** `docs/product-contract.md`, capability matrix, roster decision, README corrections.
**Owner:** Contributor 1; **backup:** Contributor 3.
**Dependencies:** None.
**Commands or tool actions:** `git status`, `rg 'exact artifact|drop-in|immutable|provenance|31.2|pre-tool-execution'`, `npm run build`, `npm run lint`, `npm test -- --runInBand`.
**Acceptance criteria:** No public claim exceeds code evidence; team roster is truthful; historical reports are marked baseline.
**Local tests:** Existing build, lint, and 103-test baseline.
**Advanced tests:** Claim scan and independent documentation review.
**Evidence to capture:** Evidence label, file/line, command output, commit, reviewer.
**Failure handling:** Mark `BLOCKED`; record the missing fact as `UNKNOWN`; do not invent it.
**Git checkpoint:** `phase-09: freeze truthful product contract`.
**Report file:** `.brain/.report/phase-09-report.md`.
**Status:** `NOT_STARTED`

### Step 09.2 — Define B0/B1/B2/B3 corpus and metrics

**Objective:** Turn research measurement validity into a reproducible benchmark design.
**Antigravity execution:** Create labelled JSON cases and a deterministic runner; review labels against fixtures and exact artifacts.
**IBM Bob execution:** Use Bob Plan for corpus design, Agent for runner, Ask for evidence-grounded metric explanations.
**Inputs:** Research §decision gates and attack classes.
**Outputs/artifacts:** `evaluation/corpus-v1.json`, runner, metric schema, baseline report.
**Owner:** Contributor 2; **backup:** Contributor 3.
**Dependencies:** 09.1.
**Commands or tool actions:** `node evaluation/run.mjs --baseline B0,B1,B2,B3 --corpus evaluation/corpus-v1.json`.
**Acceptance criteria:** Includes valid imports, missing symbols, package/version absence, unsupported sources, ambiguous exports, and repair cases; reports false-block and abstention metrics.
**Local tests:** Corpus schema and deterministic replay tests.
**Advanced tests:** Independent label review and repeated-run stability.
**Evidence to capture:** Corpus hash, runner commit, environment, raw JSON, summary.
**Failure handling:** Mark unmeasured values `TARGET` or `UNKNOWN`; never publish them as results.
**Git checkpoint:** `phase-09: add versioned evaluation contract`.
**Report file:** `.brain/.report/phase-09-report.md`.
**Status:** `NOT_STARTED`

## Phase 10 — Fail-closed Bob boundary

### Step 10.1 — Parse and aggregate every intercepted install

**Objective:** Reject or verify option-first, scoped, quoted, unsupported, and multi-package commands without shell execution.
**Antigravity execution:** Implement conservative argv tokenization and subprocess tests for the real hook.
**IBM Bob execution:** Same contract; use Bob Agent for code and Ask to inspect the actual payload shape.
**Inputs:** npm install syntax, research bypass classes, current hook.
**Outputs/artifacts:** parser, hook subprocess suite, structured decision records.
**Owner:** Contributor 3; **backup:** Contributor 2.
**Dependencies:** Phase 09.
**Commands or tool actions:** `npm test -- --runInBand -- tests/hook-subprocess.test.ts`; run payloads for unknown, URL, VCS, local, alias, option-first, and multi-package cases.
**Acceptance criteria:** No intercepted path exits `0` without an ALLOW/WARN decision and evidence; strict UNVERIFIED exits `2`.
**Local tests:** Subprocess hook tests.
**Advanced tests:** shell-metacharacter, timeout, malformed JSON, and no-package-manager execution tests.
**Evidence to capture:** stdin payload, stderr, exit code, NDJSON record, process tree.
**Failure handling:** Stop Phase 10 on any silent allow.
**Git checkpoint:** `phase-10: enforce fail-closed hook boundary`.
**Report file:** `.brain/.report/phase-10-report.md`.
**Status:** `NOT_STARTED`

## Phase 11 — Exact artifact and static API evidence

### Step 11.1 — Implement or explicitly de-scope narrow live inspection

**Objective:** Satisfy technical validity with one version-pinned real-package/wrong-symbol case without executing package code, or clearly mark the capability deferred.
**Antigravity execution:** Build bounded download, integrity check, safe extraction, and supported export/declaration inspection.
**IBM Bob execution:** Use Bob Agent for implementation and Ask to challenge archive safety and evidence claims.
**Inputs:** npm packument, tarball, integrity, static claim contract.
**Outputs/artifacts:** typed outcomes, artifact adapter, static inspector, tests, or a signed de-scope decision.
**Owner:** Contributor 2; **backup:** Contributor 3.
**Dependencies:** Phase 10.
**Commands or tool actions:** `npm test -- --runInBand -- tests/artifact-adapter.test.ts`; live command with recorded artifact hash.
**Acceptance criteria:** Distinguishes package/version missing; no code/scripts execute; result is FOUND/MISSING/UNVERIFIED with citations.
**Local tests:** Adapter and inspector tests.
**Advanced tests:** bad integrity, archive traversal, timeout, malformed metadata, conditional exports.
**Evidence to capture:** URL, version, integrity, artifact hash, inspection method, result, environment.
**Failure handling:** If deferred, mark Phase 11 `DEFERRED`, narrow claims, and do not claim technical validity passed.
**Git checkpoint:** `phase-11: implement or de-scope live static inspection`.
**Report file:** `.brain/.report/phase-11-report.md`.
**Status:** `NOT_STARTED`

## Phase 12 — Evidence and provenance

### Step 12.1 — Verify the decision chain and separate trust signals

**Objective:** Make records tamper-evident after verification and distinguish integrity from provenance.
**Antigravity execution:** Implement verifier, types, tamper tests, and terminology edits.
**IBM Bob execution:** Use Bob Agent for code, Ask for evidence-language review.
**Inputs:** Existing NDJSON writer and research evidence rules.
**Outputs/artifacts:** `audit-log verify`, updated types, tamper suite, provenance fields.
**Owner:** Contributor 3; **backup:** Contributor 2.
**Dependencies:** Phase 11.
**Commands or tool actions:** `npx tsx src/cli.ts audit-log verify .phantomdeps/decisions.ndjson`; tamper mutation runner.
**Acceptance criteria:** Clean log passes; modified/deleted/reordered/broken records fail; no “immutable” claim remains.
**Local tests:** `tests/audit-log.test.ts`.
**Advanced tests:** redaction and override-attribution tests.
**Evidence to capture:** clean/tampered outputs, hashes, schema version, reviewer.
**Failure handling:** Preserve failed evidence and block release.
**Git checkpoint:** `phase-12: add verifiable evidence chain`.
**Report file:** `.brain/.report/phase-12-report.md`.
**Status:** `NOT_STARTED`

## Phase 13 — Claim context, repair, and CLI

### Step 13.1 — Use explicit generated-code context and human-approved repair

**Objective:** Never substitute fixture symbols for actual agent claims; make repair patch-only and revalidated.
**Antigravity execution:** Implement explicit `--symbols`/changed-file input, import extraction, JSON output, width wrapping, and CLI contract fixes.
**IBM Bob execution:** Test documented payload and wrapper fallback; use Ask/Agent for repair explanation without auto-application.
**Inputs:** Changed files/diff or explicit symbols, gate decision, candidate patch.
**Outputs/artifacts:** import extractor, remediation validator, CLI tests, JSON/width snapshots.
**Owner:** Contributor 1; **backup:** Contributor 3.
**Dependencies:** Phases 10–12.
**Commands or tool actions:** `npm test -- --runInBand -- tests/import-extraction.test.ts`; width tests at 80/120/240 columns; B3 runner.
**Acceptance criteria:** Missing context is UNVERIFIED; no auto-install; patch is displayed only after same-gate validation; README exit codes match.
**Local tests:** import, CLI, remediation, JSON, width suites.
**Advanced tests:** prompt-injection and malicious-diff tests.
**Evidence to capture:** input diff, extracted claim, candidate patch, revalidation, human approval record.
**Failure handling:** Reject ambiguous context and preserve original code.
**Git checkpoint:** `phase-13: make claim context and repair explicit`.
**Report file:** `.brain/.report/phase-13-report.md`.
**Status:** `NOT_STARTED`

## Phase 14 — Independent release and demo validity

### Step 14.1 — Prove B0/B2/B3, Bob/wrapper workflow, and clean demo

**Objective:** Pass research technical, workflow, measurement, and demo gates from a clean reviewed commit.
**Antigravity execution:** Run clean checkout, network-disabled fixture demo, benchmark, full tests, independent review, and produce submission assets.
**IBM Bob execution:** Rehearse Plan/Ask/Agent workflow, capture Bob session export, and if hook behavior is unavailable use the labelled wrapper fallback.
**Inputs:** Completed Phase 09–13 reports and source.
**Outputs/artifacts:** Phase 14 checklist/report, benchmark raw results, Bob session or fallback proof, PPT/PDF, video, screenshots, release-state file.
**Owner:** Contributor 4 only if a unique person is confirmed; otherwise assign an existing named contributor in Phase 09.
**Dependencies:** All prior phases and independent review.
**Commands or tool actions:** `npm ci --ignore-scripts`; `npm test`; `npm audit --ignore-scripts`; offline demo with network disabled; `node evaluation/run.mjs`; `git diff --check`; secret scan; tag parity check.
**Acceptance criteria:** No silent allow; all package specs checked; README matches code; release tag equals reviewed commit; B0/B2/B3 and false-block/abstention metrics are published as TEAM MEASUREMENT; Bob proof is real or fallback is labelled.
**Local tests:** Full suite and clean-checkout suite.
**Advanced tests:** Independent reviewer and final artifact audit.
**Evidence to capture:** HEAD/tag, corpus hash, commands, results, screenshots, session export, owners, timestamps.
**Failure handling:** Release remains `NOT_READY`; no official submission.
**Git checkpoint:** `phase-14: pass independent release and submission gate`.
**Report file:** `.brain/.report/phase-14-report.md`.
**Status:** `NOT_STARTED`

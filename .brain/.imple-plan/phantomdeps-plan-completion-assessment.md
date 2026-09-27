# phantomdeps Plan-Completion Assessment

**Repository reviewed:** `https://github.com/adishxm/phantomdeps/tree/main/.brain/.imple-plan`  
**Current main commit reviewed:** `54083c9` — `chore: remove duplicate phase-XX-<name>.md files in favor of phase-XX-implementation.md`  
**Research baseline:** `IBM_Bob2_Phantomdeps_Complete_Research.md`  
**Assessment date:** 27 September 2026

## Direct answer

**Yes—if you execute Phases 09–14 exactly as written, produce all required reports and raw evidence, and pass every gate, the project can become complete for the research-defined narrow npm-first hackathon MVP.**

But there are two important qualifications:

1. **The plans are not yet executed.** The current active roadmap explicitly says Phases 09–14 are `NOT_STARTED`, and the current Phase 14 release checklist is also `NOT_STARTED`.
2. **Completing these plans will not make phantomdeps a complete universal supply-chain or slopsquatting defense.** The research deliberately defers PyPI parity, broad reputation intelligence, private registries, behavioral analysis, transitive monitoring, and enterprise controls.

The correct target after successful completion is:

> **A truthful, npm-first, verification-only, fixture-replayable and narrowly live-capable pre-install dependency-claim gate for AI-assisted development, with fail-closed Bob/wrapper enforcement, explicit uncertainty, cited evidence, measured B0–B3 results, human-approved repair suggestions, and a reproducible hackathon release.**

That is a strong and research-aligned project. It is not the same as a universal defense against all malicious packages or all slopsquatting campaigns.

---

## 1. What was reviewed

The current `.brain/.imple-plan` contains:

- `phase-00-implementation.md` through `phase-14-implementation.md`;
- `active-remediation-roadmap.md`;
- `ibm-bob-remediation-roadmap.md`;
- `antigravity-remediation-roadmap.md`;
- `roadmap-index.md`;
- historical `ibm-bob-roadmap.md` and related indexes;
- the committed implementation-plan audit.

The current active roadmap correctly distinguishes:

- **Historical baseline:** Phases 00–08;
- **Active remediation:** Phases 09–14;
- **Current state:** planning only, with no Phase 09–14 implementation reports.

The active roadmap also adds the research-required measurement ladder:

- **B0:** package-name existence/basic registry check;
- **B1:** B0 plus exact package/version/integrity and risk signals;
- **B2:** B1 plus static imported-symbol/API verification;
- **B3:** B2 delivered through the wrapper or tested Bob hook, including repair and test rerun.

That addition is important and correct.

---

## 2. Phase-by-phase assessment

| Phase | Purpose | Research alignment | If completed, what it closes | Remaining qualification |
|---|---|---|---|---|
| 00 | Intake, audit, operating agreement | Good | Establishes source inventory, scope, evidence discipline, and blockers | Historical phase; its old status must not override the active remediation state |
| 01 | Product contract and acceptance criteria | Good | Converts research into users, requirements, non-goals, and acceptance criteria | The contract must be rewritten in Phase 09 to match the current code |
| 02 | Architecture, UX, threat model, delivery design | Good | Establishes trust boundaries and safe no-execution design | The original design must be corrected where it assumed more live/Bob capability than exists |
| 03 | Smallest demonstrable MVP | Strong | Provides fixture demo, policy engine, evidence output, and initial hook | It proves the demo, not complete live enforcement |
| 04 | Team-local validation | Partial but useful | Confirms local tests, acceptance criteria, and reproducibility for the original MVP | Original tests did not cover the later-discovered hook bypasses |
| 05 | Advanced validation and resilience | Good foundation | Adds parser edge tests, audit, fuzz-style cases, and performance evidence | It did not exercise the actual hook subprocess against unknown/options/multi-package paths |
| 06 | Outsider review | Necessary | Finds implementation defects and forces independent challenge | The prior review missed the fail-open cases found in the later audit; Phase 14 must repeat independent review after remediation |
| 07 | Finalization and demo | Useful | Creates a clear demo, Q&A, and release-candidate process | Its README/release claims must be updated after Phases 09–13 |
| 08 | Submission package | Administrative foundation | Establishes submission assets, stop gate, and secret/release checks | Historical only; the newer Phase 14 checklist supersedes it |
| 09 | Truth reset and baseline | **Essential** | Makes documentation, team, capability ledger, and measurement contract truthful | Must be completed before implementing new security behavior |
| 10 | Fail-closed Bob hook | **Essential P0** | Closes unknown, unsupported, option-first, multi-package, parser, and evidence bypasses | Must include subprocess tests and strict-agent policy, not only unit tests |
| 11 | Live artifact/static API verification | **Essential P0 or explicit de-scope** | Provides exact-version/artifact evidence and one narrow live static API case | If deferred, the headline claim must be narrowed and the phase marked `DEFERRED`, not passed |
| 12 | Evidence and provenance integrity | **Essential P1** | Separates artifact integrity from provenance and verifies tamper-evident logs | Does not make local logs immutable; documentation must preserve that distinction |
| 13 | Claim context, repair, CLI semantics | **Essential P0/P1** | Stops fixture substitution, defines generated-code context, and makes remediation safe | Must prove actual changed-import context or use an explicit wrapper contract |
| 14 | Independent release and submission | **Essential** | Rechecks all decision gates, measurements, team truth, assets, and release parity | Cannot pass with any research gate `UNKNOWN`, `NOT_STARTED`, or unmeasured target |

**Assessment:** The sequence is correct. Phases 09–14 are the right remediation phases needed to turn the original prototype into the research-aligned MVP.

---

## 3. Research requirements that the plans cover

### P0 requirements covered by the plans

The plans cover all major P0 requirements from the research:

1. **Safe fixture mode and fake package-manager boundary**
   - Existing Phases 03–08 establish the offline fixture demo.
   - Phase 14 requires lifecycle scripts disabled and networking disabled for the fixture run.

2. **Exact npm identity/version/artifact handling**
   - Phase 11 adds typed registry outcomes, exact version resolution, tarball retrieval, integrity verification, safe extraction, and artifact hashes.

3. **Narrow static API verification**
   - Phase 11 explicitly requires one narrow documented subset of `exports`, declarations, and entry metadata.
   - Unsupported/dynamic forms are required to return `UNVERIFIED`.

4. **Explicit uncertainty**
   - Phases 10, 11, and 13 require `UNVERIFIED` rather than silent `ALLOW`.

5. **Rule-first policy**
   - Already implemented in the original MVP and not contradicted by the new plans.

6. **Patch-only human-approved remediation**
   - Phase 13 requires candidate revalidation and human approval.

7. **Bob hook testing and wrapper fallback**
   - Phase 10 requires subprocess testing.
   - Phase 14 requires a real Bob session export or a clearly labelled documented-payload/wrapper fallback.

8. **Capability ledger and truthful public claims**
   - Phase 09 and the active roadmap explicitly require implemented/fixture-only/planned/unsupported labels.

9. **B0 versus B2 measurement**
   - The active roadmap adds the complete B0/B1/B2/B3 ladder and raw measurement requirements.

### P1 requirements covered by the plans

The plans also cover most requirements needed for strong judge defense:

- precise provenance language;
- tamper tests;
- strict-agent override records;
- exact package/version error taxonomy;
- claim-context contract;
- import extraction from changed files where available;
- JSON output;
- terminal-width tests;
- independent release review;
- truthful team and submission evidence.

This is enough for a strong research-aligned hackathon submission if executed rigorously.

---

## 4. What must be added or made explicit before calling the project fully research-aligned

The plans are strong, but I recommend adding the following explicit items to the plans or acceptance gates.

### Gap A — Required adversarial fixture corpus is not fully enumerated

The research’s P1 recommendations call for fixtures covering:

- young legitimate packages;
- dynamic exports;
- timeouts;
- malformed metadata;
- README/prompt injection;
- alternative-package traps;
- mixed valid and invalid claims.

Phase 10 and Phase 11 cover several of these technically, but the active plans do not explicitly require the full fixture inventory.

**Add to Phase 10/11:**

```text
Required fixtures: young-legitimate, dynamic-export, timeout,
malformed-metadata, README-injection, alternative-trap,
mixed-found-and-missing-symbols, and valid-package-with-install-script.
```

### Gap B — SARIF output is not explicitly planned

The research P1 recommendations include JSON and SARIF after the core schema stabilizes. Phase 13 requires JSON, but not SARIF.

**Decision needed:**

- Add SARIF to Phase 13; or
- explicitly defer SARIF as post-hackathon scope and label it `planned`.

This is not a blocker for the narrow MVP, but it should not be silently omitted from a claim of complete research implementation.

### Gap C — Public read-only replay is not a hard Phase 14 gate

The research recommends a public hosted read-only replay that mirrors the offline fixture and does not depend on live registries. Phase 14 requires submission assets but does not explicitly require the hosted replay.

**Decision needed:**

- Add a read-only replay URL to Phase 14; or
- document that the hackathon accepts a reproducible local/offline application instead.

Do not claim a hosted application exists unless it is actually available and tested.

### Gap D — Research P1 claims about package reputation must remain de-scoped

The project’s original idea included popularity, maintainer age, typosquat distance, and provenance heuristics. The active ledger correctly marks broad reputation/slopsquatting analysis as planned/out of core scope.

Completing Phases 09–14 will not implement a complete reputation or typosquatting engine unless additional code is added.

**Required claim boundary:**

> phantomdeps detects a narrow class of dependency-claim failures and reports selected metadata risk signals. It is not a complete malicious-package, typosquat, reputation, or post-install behavioral analyzer.

### Gap E — B0/B1/B2/B3 must be real measurements, not just a plan

The active roadmap correctly requires:

- versioned corpus;
- runner commit;
- raw output;
- environment;
- false-block rate;
- abstention rate;
- latency;
- repair outcome.

The project is not research-complete until these artifacts exist. Repeating the target numbers from the research report or prior plans is not sufficient.

### Gap F — Full live Bob validity may remain unknown

Even after subprocess tests, a real Bob session may be unavailable. The plan correctly permits a documented-payload/wrapper fallback, but the final claim must then say:

> Bob hook behavior is tested against the documented payload shape; full live-session UI/workflow validity remains `UNKNOWN`, and the verification-only wrapper is the reproducible fallback.

Do not claim a fully verified Bob workflow without a real session artifact.

---

## 5. What “complete” would mean after executing the plans

### Complete for the narrow hackathon MVP

After all phases pass, the product may truthfully claim:

- npm-first support;
- registry-name package specs in v1;
- verification-only behavior;
- no automatic suspect-package installation in the verifier;
- exact package/version metadata checks;
- narrow exact-artifact static inspection, if Phase 11 is implemented;
- static missing-symbol detection for supported forms;
- explicit `BLOCK`, `WARN`, `ALLOW`, and `UNVERIFIED` outcomes;
- fail-closed strict-agent behavior;
- multi-package and option-aware command handling;
- cited evidence and verified hash-chain records;
- human-approved, patch-only remediation suggestions;
- deterministic offline fixtures;
- measured B0/B1/B2/B3 comparisons;
- tested Bob hook or clearly labelled wrapper fallback;
- reproducible clean-checkout demo;
- independent review and truthful submission package.

### Not complete as a universal supply-chain defense

Even after all plans pass, the following remain outside the narrow MVP unless separately implemented and researched:

- full PyPI API-claim parity;
- reliable PyPI popularity/download analytics;
- broad typosquat-distance intelligence;
- complete maintainer/reputation scoring;
- continuous post-approval compromise detection;
- behavioral sandboxing of packages;
- universal shell interception;
- private registry policy bundles;
- enterprise transitive monitoring;
- signed CI attestations and enterprise retention controls;
- longitudinal real-agent-trace research;
- usability studies and alert-fatigue measurement;
- broad ecosystem support.

These are consistent with the research’s P2 roadmap and should remain clearly labelled as deferred.

---

## 6. Required evidence before final completion

Executing code is not enough. The research requires evidence artifacts. Before declaring success, the repository must contain:

- `.brain/.report/phase-09-report.md`;
- `.brain/.report/phase-10-report.md`;
- `.brain/.report/phase-11-report.md` or an explicit `DEFERRED` report;
- `.brain/.report/phase-12-report.md`;
- `.brain/.report/phase-13-report.md`;
- `.brain/.report/phase-14-report.md`;
- updated capability ledger;
- B0/B1/B2/B3 corpus and raw results;
- hook subprocess evidence;
- artifact/static-inspection evidence or documented de-scope;
- audit-log verifier and tamper-test output;
- claim-context/import-extraction tests;
- independent review record;
- clean-checkout command log;
- exact reviewed commit and release tag parity;
- truthful team roster;
- verified demo/video/slides/screenshots/Bob evidence;
- human stop-gate record.

Every report should include:

- exact command;
- environment;
- commit;
- expected result;
- actual result;
- failures and fixes;
- evidence label;
- reviewer;
- timestamp;
- residual risk.

A plan without its report and raw output is not a passed phase.

---

## 7. Recommended amendments to the plans

Add a short section to the active remediation roadmap:

```text
Additional research-completion fixtures:
- young legitimate package;
- dynamic/unsupported export;
- timeout;
- malformed metadata;
- README/prompt injection;
- alternative-package trap;
- mixed valid and missing symbols.

Optional P1 outputs:
- SARIF;
- hosted read-only fixture replay.

If optional outputs are not implemented, label them planned/deferred and do not describe the MVP as covering them.
```

Add the following explicit Phase 14 gate:

```text
No final research-aligned release may be marked PASSED unless:
- B0/B1/B2/B3 raw results exist;
- at least one false-block or abstention metric exists;
- all active phases have reports;
- all capability labels match the reviewed commit;
- no unsupported slopsquatting/reputation/enterprise claim appears in README or submission materials.
```

---

## Final answer

**If you execute all Phase 00–14 plans and satisfy every completion gate, your project will be complete according to the research-defined narrow MVP and suitable for a truthful IBM Bob hackathon submission.**

It will not be a complete universal slopsquatting or software-supply-chain defense, because the research explicitly leaves broader reputation intelligence, PyPI parity, behavioral analysis, private registries, enterprise monitoring, and longitudinal validation outside the MVP.

The current plans are therefore **sufficient in structure**, with the following conditions:

1. Execute Phases 09–14; do not treat them as documentation-only.
2. Produce the six phase reports and raw evidence.
3. Pass the B0/B1/B2/B3 measurement gate.
4. Add or explicitly defer the adversarial fixture corpus, SARIF, and hosted replay.
5. Keep the product claim narrow and honest.
6. Do not mark Phase 11 passed if live artifact/API inspection is deferred.
7. Do not mark Phase 14 passed while any research decision gate is `NOT_STARTED`, `UNKNOWN`, or unmeasured.

**Recommended release wording after successful completion:**

> `phantomdeps` is an npm-first, verification-only dependency-claim gate for AI-assisted development. It checks exact package identity and supported static API claims before installation, fails closed on unsupported or unverifiable agent install paths in strict mode, provides cited evidence and human-approved repair suggestions, and has reproducible B0–B3 evaluation results. It is not a universal malicious-package or slopsquatting detector.

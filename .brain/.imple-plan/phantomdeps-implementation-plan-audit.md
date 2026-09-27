# phantomdeps `.brain` Implementation-Plan Audit

**Repository:** `https://github.com/adishxm/phantomdeps`
**Contributors:** Aditya Kumar Sharma, Narayan Kumar Jha, Utkarsh Yadav, Roshan Singh
**Current main commit reviewed:** `5bade2b` — `docs: add Phase 09-14 implementation plans and updated roadmap index`
**Review date:** 27 September 2026
**Comparison baseline:** IBM Bob 2.0 phantomdeps research report and the prior product-accuracy audit.

## Executive verdict

The current `.brain` directory has been **partially corrected and is directionally aligned with the research**, but it is **not complete** and should not be treated as an implementation-complete release plan.

The important positive change is that the repository now contains an active roadmap with Phases **09–14** that explicitly addresses the issues found in the product audit:

- fail-open Bob-hook paths;
- option-first and multi-package command parsing;
- live exact-version and static API verification;
- integrity/provenance terminology;
- audit-log verification;
- fixture symbols being substituted for actual generated-code context;
- verification-only CLI semantics;
- independent release validation and truthful submission evidence.

That active plan is good and largely matches the research recommendations. However:

1. **Phases 09–14 are only `READY` plans.** There are no Phase 09–14 implementation reports or completion evidence.
2. The executable code still reproduces the previously identified security bypasses.
3. Older `.brain` files still claim Phases 00–08 are complete and describe behavior that the current code does not actually provide.
4. The current README and executive summary still overstate live artifact/API verification and Bob-hook coverage.
5. Release/team metadata remains inconsistent: the plan recognizes a three-person roster, while the phase structure still assumes a unique fourth contributor.
6. The historical release/tag claims need to be rechecked against the current main commit before any final release.

**Status:** The `.brain` is now a useful remediation roadmap, but the product remains **not ready for a truthful final security release** until Phases 09–14 are executed and independently verified.

---

## 1. Current repository state

### Confirmed current state

- Current main commit: `5bade2b`.
- The repository contains implementation plans for Phases 09, 10, 11, 12, 13, and 14.
- No corresponding Phase 09–14 reports exist under `.brain/.report/`.
- The source tree still contains the earlier MVP implementation only:
  - `src/parser.ts`
  - `src/gate.ts`
  - `src/adapters/registry.ts`
  - `src/checker/static-claim.ts`
  - `src/checker/risk-signals.ts`
  - `src/engine/policy.ts`
  - `src/evidence/writer.ts`
  - CLI, fixtures, and the original test suites.
- Planned new test files are absent:
  - `tests/hook-subprocess.test.ts`
  - `tests/audit-log.test.ts`
  - `tests/artifact-adapter.test.ts`
  - `tests/import-extraction.test.ts`
- `package.json` still contains three unique contributors.
- The README still says the product verifies the exact package artifact and statically provable API against what AI-generated code imports.

### Current active roadmap status

The new active roadmap correctly says:

> “make the prototype’s security boundary, live capability, evidence model, team record, and public claims accurate enough for a truthful final release.”

It also correctly identifies the audit triggers: fail-open Bob paths, incomplete live API verification, inaccurate package/version errors, conflated integrity/provenance language, absent hash-chain verification, fixture symbols used as generated-code proxies, incomplete multi-package parsing, and the three-person/four-contributor mismatch.

This is strongly aligned with the research report.

---

## 2. Plan-to-research alignment

| Research requirement | New `.brain` plan | Alignment | Current implementation |
|---|---|---|---|
| Fixture-replayable safe demo | Existing Phases 03–08; Phase 14 | Strong | Implemented and tested |
| Exact npm identity/version/artifact evidence | Phase 11 | Strong | Metadata exists; exact tarball inspection absent |
| Explicit `UNVERIFIED` | Phases 10, 11, 13 | Strong | Policy has it, but hook bypasses it |
| Named hard rules, not uncalibrated weighted score | Existing Phase 03/04 | Strong | Implemented |
| Fail-closed unsupported agent installs | Phase 10 | Strong | Not implemented; hook currently allows them |
| Multi-package and option-first parsing | Phase 10 | Strong | Not implemented |
| No fixture substitution for real agent claims | Phase 13 | Strong | Not implemented |
| Narrow static API verification | Phase 11 | Strong | Fixture-only; live path passes `null` exports map |
| Patch-only, human-approved remediation | Phase 13 | Strong | Current demo text suggests remediation, but structured candidate handling is incomplete |
| Separate integrity/provenance semantics | Phase 12 | Strong | Not implemented |
| Tamper-evident log verification | Phase 12 | Strong | Hash chain writes exist; verifier absent |
| Tested Bob `PreToolUse` boundary | Phase 10 and 14 | Strong | Synthetic fixture test only; no subprocess suite or real-session proof |
| Capability ledger and truthful claims | Phase 09 | Strong | New plan exists; older README/reports remain overstated |
| B0/B2/B3 measured evaluation | Research P0 | Missing | No corpus or benchmark results |
| Independent review after changes | Phase 14 | Strong | Required, but not yet performed for Phases 09–14 |

**Conclusion:** the new plans are not random additions; they are the correct response to the research and audit. The problem is execution and synchronization, not planning quality.

---

## 3. Direct verification of the current code against the active plan

The following cases were executed against current main commit `5bade2b` after installing project dependencies with lifecycle scripts disabled.

| Case | Observed result | Research/plan requirement | Status |
|---|---|---|---|
| `npm install is-odd` | exit `2`, decision recorded | Known high-confidence mismatch must block | Pass |
| Unknown package | exit `0`, no decision record | Unknown must never silently pass | **Fail — Phase 10.4/10.5** |
| `npm install --save is-odd` | exit `0`, no decision record | Option-first commands must be parsed | **Fail — Phase 10.1/10.2** |
| `npm install is-odd lodash` | only first package evaluated | Every package must be checked | **Fail — Phase 10.3** |
| `npm install https://example.com/pkg.tgz` | exit `0`, no decision record | Unsupported source must block/unverify | **Fail — Phase 10.2/10.4** |
| Live `lodash@4.17.21 --symbols merge` | `UNVERIFIED`; exports map is `null` | Live capability must be implemented or labelled | **Incomplete — Phase 11** |
| Exact package exists, requested version absent | adapter/policy can report package 404 wording | Distinguish package from version absence | **Fail — Phase 11.1/11.2** |
| Hook with no generated-code context | uses fixture claims when fixture exists | Missing context must be visible `UNVERIFIED` | **Fail — Phase 13.1/13.3** |
| Audit log | writes hash-linked records | Verification command must validate chain | **Incomplete — Phase 12.3/12.4** |
| `install` CLI command | aliases check; does not install | Must be verification-only and documented | **Needs correction — Phase 13.4** |

The implementation therefore has not yet passed any of the new Phase 10–13 completion gates.

---

## 4. Required work by phase

## Phase 09 — Truth reset, contract freeze, and baseline

**Plan quality:** Correct and necessary.  
**Status:** `READY`; no evidence report.

### Required actions

1. Decide truthfully whether the team has three or four contributors.
   - Current `package.json` records three unique people.
   - Do not keep a fourth “Contributor 4” role unless an actual person is identified.
   - If the team is three people, rewrite ownership and submission plans accordingly.
2. Add a product contract document that explicitly says:
   - verification-only command;
   - no automatic install in v1;
   - fixture mode versus live metadata mode;
   - strict-agent behavior for `UNVERIFIED`;
   - supported package-spec forms;
   - unsupported forms;
   - exact claim-context input.
3. Correct README and `.brain` summaries for:
   - live API inspection;
   - Bob hook scope;
   - provenance wording;
   - remediation behavior;
   - demo exit codes;
   - `install` versus `verify` naming.
4. Add a capability matrix with exactly these labels:
   - `implemented`;
   - `fixture-only`;
   - `planned`;
   - `unsupported`.
5. Capture a baseline report before code changes.
6. Mark old Phase 00–08 documents as **historical baseline**, not current release proof.

### Phase 09 completion evidence required

- `.brain/.report/phase-09-report.md`;
- baseline command output;
- README claim checklist;
- product contract;
- roster decision;
- clean tests before changes.

---

## Phase 10 — Fail-closed IBM Bob hook enforcement

**Plan quality:** Exactly matches the highest-priority security findings.  
**Status:** `READY`; no implementation report.

### Required code changes

1. Replace the regular-expression command parser with a conservative argv tokenizer.
2. Handle options before and after packages:
   - `--save`;
   - `-D` / `--save-dev`;
   - `--exact`;
   - `--legacy-peer-deps`;
   - other supported npm flags.
3. Parse every package in one command.
4. Aggregate decisions fail-closed.
5. Use this policy:
   - fixture hit → evaluate fixture;
   - fixture miss → live check or `UNVERIFIED`;
   - unsupported shape → `UNVERIFIED`;
   - strict-agent `UNVERIFIED` → exit `2`.
6. Write a normal decision record for every intercepted install path, including parser errors and fixture misses.
7. Add `tests/hook-subprocess.test.ts` that launches the actual `.bob/hooks/PreToolUse.mjs` process.
8. Test URL, VCS, local path, alias, quoting, shell metacharacters, timeout, malformed input, and multi-package cases.
9. Prove the hook never executes npm, a shell, lifecycle scripts, or package code.
10. Capture a real Bob session if possible. Otherwise explicitly label the result as documented-payload tested only.

### Phase 10 stop condition

Do not mark Phase 10 passed while any hook path exits `0` without an `ALLOW`/`WARN` decision and a structured evidence record.

---

## Phase 11 — Live exact-version and static API verification

**Plan quality:** Correctly scoped; the plan appropriately permits explicit de-scoping.  
**Status:** `READY`; no implementation report.

### Required code changes

1. Add typed registry outcomes:
   - `PACKAGE_NOT_FOUND`;
   - `VERSION_NOT_FOUND`;
   - `REGISTRY_UNAVAILABLE`;
   - `MALFORMED_RESPONSE`;
   - `PRIVATE_OR_AUTH_REQUIRED`.
2. Resolve exact version and integrity.
3. Download the exact tarball into a temporary directory with:
   - size limit;
   - timeout;
   - safe extraction;
   - archive traversal protection;
   - integrity verification;
   - no lifecycle scripts.
4. Inspect only a narrow, documented static subset:
   - `package.json` exports;
   - declaration files;
   - known entry metadata.
5. Return `SYMBOL_FOUND`, `SYMBOL_MISSING`, or `UNVERIFIED` with artifact hash and method citations.
6. Test conditional exports, malformed metadata, bad integrity, unsupported module shapes, and archive traversal.
7. Add a fixture-capture command that records metadata and hashes without blindly committing package contents.

### Alternative if implementation is deferred

If exact artifact/static inspection is too large for the hackathon:

- keep live mode metadata-only;
- change README and executive summary to say live API checks return `UNVERIFIED`;
- label static API verification `fixture-only`;
- leave Phase 11 `DEFERRED`, not `PASSED`;
- do not use the live path as evidence for the headline API-verification claim.

---

## Phase 12 — Evidence integrity and provenance semantics

**Plan quality:** Correct and directly derived from the research.  
**Status:** `READY`; no implementation report.

### Required code changes

1. Split evidence fields into:
   - artifact integrity;
   - registry signature status;
   - provenance attestation;
   - publisher identity;
   - source-repository status.
2. Replace “no provenance” where only an integrity hash is missing with “artifact integrity unavailable.”
3. Add `audit-log verify <path>`.
4. Recompute and validate every record hash.
5. Validate every previous-hash link.
6. Reject malformed JSON, deleted records, reordered records, modified messages, and broken links.
7. Add strict-agent override records with actor, reason, timestamp, command digest, and resulting policy.
8. Say “tamper-evident after verification,” not “immutable.”

### Required evidence

- `tests/audit-log.test.ts`;
- clean-log verification output;
- every tamper mutation failing verification;
- updated types and fixtures;
- updated README terminology.

---

## Phase 13 — Claim context, repair workflow, and command semantics

**Plan quality:** Correct and essential for research alignment.  
**Status:** `READY`; no implementation report.

### Required code changes

1. Define claim context explicitly:
   - `--symbols`;
   - changed-file input;
   - supported Bob diff payload.
2. Return `UNVERIFIED` when claim context is missing.
3. Parse only newly added imports for the selected package when diff context exists.
4. Remove fixture-claim substitution from the live Bob path.
5. Rename `install` to `verify`, or document unequivocally that it is verification-only.
6. Make demo exit semantics match the README.
7. Keep remediation patch-only and human-approved.
8. Revalidate every suggested replacement through the same gate before displaying it.
9. Add machine-readable JSON output.
10. Add terminal-width tests at 80, 120, and 240 columns.

### Required tests

- `tests/import-extraction.test.ts`;
- CLI regression tests;
- remediation validation tests;
- JSON output tests;
- width/snapshot tests;
- Bob integration test proving no fixture symbol substitution.

---

## Phase 14 — Independent release, team, and submission gate

**Plan quality:** Correct, but it must occur after Phases 09–13, not alongside them.  
**Status:** `READY`; no implementation report.

### Required actions

1. Clean checkout with lifecycle scripts disabled.
2. Offline fixture run with networking disabled.
3. Full test set, including hook subprocess, artifact, audit-log, security, and CLI-width tests.
4. Secret scan, dependency audit, Git status, tag/HEAD parity, and README claim scan.
5. Independent review by someone who did not implement the corrected phases.
6. Real Bob session export or explicit payload-shape limitation.
7. Resolve the three-person/four-person roster.
8. Produce slides/PDF, video, cover image, screenshots, Bob report export, and final Q&A using verified claims only.
9. Create the final release tag only after every gate passes.
10. Keep the human submission stop gate.

---

## 5. Documentation and status inconsistencies to fix

### 5.1 Two roadmap indexes exist

The repository contains both:

- `.brain/.imple-plan/00-roadmap-index.md`, which says Phases 00–08 are complete; and
- `.brain/.imple-plan/Roadmap Index —_.md`, which says Phases 09–14 are active and ready.

This is explainable as historical versus active planning, but it is easy for judges or contributors to misread.

**Required fix:** rename the historical file or add prominent headers:

```text
HISTORICAL BASELINE — Phases 00–08
ACTIVE REMEDIATION ROADMAP — Phases 09–14
```

Update the root README to link to the active roadmap first.

### 5.2 Old executive summary overstates the product

`.brain/.report/00-executive-summary.md` still says the product verifies the exact artifact and static API claim, while current live code returns `UNVERIFIED` because the exports map is `null`.

**Required fix:** rewrite it as a historical baseline and state the current capability matrix.

### 5.3 Old final submission checklist says complete too early

The checklist has `Status: COMPLETE`, while its own table contains unresolved items and the active roadmap now identifies major engineering work still required.

**Required fix:** change status to:

```text
HISTORICAL BASELINE — NOT A CURRENT RELEASE APPROVAL
```

Create a new Phase 14 checklist that cannot be marked complete until Phases 09–13 have reports and independent evidence.

### 5.4 Release metadata is stale or inconsistent

The `.brain` files reference multiple historical commits and tags, including `v0.1.0`, `v0.1.0-rc.1`, `c31a950`, `8c9bc88`, `7a493ac`, and `76ecbff`, while current main is `5bade2b`.

**Required fix:** add a single release-state file containing:

- current HEAD;
- intended release tag;
- tag commit;
- source parity result;
- test commit;
- date/time;
- whether the tag is historical or current.

Do not call a historical tag the current final release if Phases 09–14 are still pending.

### 5.5 Three-person roster versus four-person plan

The active roadmap correctly calls this out. The problem remains unresolved in code and docs.

**Required fix:** either:

- add a real fourth contributor with consent and consistent identity everywhere; or
- remove Contributor 4 from all plans and assign demo/submission responsibilities to one of the existing three people.

Do not submit materials with a fictitious or duplicated contributor.

---

## 6. Minimum definition of “ready”

The project should not claim research-aligned completion until all of the following are true:

- [ ] Phase 09 report exists and README claims match code.
- [ ] Unknown package hook path cannot silently allow.
- [ ] Unsupported URL/VCS/local/alias paths cannot silently allow.
- [ ] Option-first commands are parsed correctly.
- [ ] Every package in a multi-package command is checked.
- [ ] Every intercepted path writes structured evidence.
- [ ] Live mode either implements a narrow static artifact path or is clearly labelled metadata-only/`UNVERIFIED`.
- [ ] Package-not-found and version-not-found are distinct.
- [ ] Fixture claims are never used as a proxy for real Bob-generated imports.
- [ ] Artifact integrity and provenance are separate fields.
- [ ] The audit-log verifier and tamper tests exist.
- [ ] Remediation is patch-only, revalidated, and human-approved.
- [ ] `install` naming and exit codes match the actual CLI.
- [ ] Hook subprocess tests exist.
- [ ] Independent review is performed after the new changes.
- [ ] Release tag points to the exact reviewed commit.
- [ ] Team roster and submission assets are truthful and complete.

---

## Final conclusion

**The new `.brain` Phase 09–14 plans are substantially aligned with the research and with the previous accuracy audit.** They identify the right work, use the right security principles, and contain appropriate completion gates.

**The implementation is not yet aligned because none of those phases has been executed.** The current source still fails the most important new gate requirements, especially fail-closed hook behavior and live/static claim correctness.

The next action should be to execute the phases in order:

```text
09 Truth reset → 10 Fail-closed hook → 11 Live verification
→ 12 Evidence integrity → 13 Claim context/CLI → 14 Independent release
```

Do not skip Phase 09. Correcting the README and capability ledger first prevents the next implementation cycle from producing another set of reports that claim more than the code proves.

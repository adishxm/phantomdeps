# PhantomDeps Real-Time Validation Report

**Validation date:** 2026-09-27  
**PhantomDeps repository:** `https://github.com/adishxm/phantomdeps`  
**PhantomDeps commit:** `f73a60c341ac2f780499c816871706e36bd2f70c`  
**Environment:** Node `v22.13.0`, npm `10.9.2`, Git `2.43.0`

## Executive Summary

The PhantomDeps baseline is healthy: `npm ci --ignore-scripts`, `npm run build`, and the full test suite completed successfully. The repository reports **10 test suites and 205 tests passing**.

A real isolated TaskForge TypeScript project was created outside the PhantomDeps source tree. It includes task creation, listing, completion, validated JSON import, machine-readable reporting, pinned dependencies, a build, unit tests, integration tests, and an end-to-end CLI test. The corrected TaskForge project builds and all three test layers pass.

The intentional invalid claim was exercised through a documented CLI-wrapper fallback. PhantomDeps returned **BLOCK / exit 2** for `is-odd@3.0.1` with the nonexistent symbol `isOddBatch`, and the wrapper suppressed installation. The corrected project was then installed with `npm ci --ignore-scripts` after the human-approved correction path.

The offline fixture demo independently verified **ALLOW**, **WARN**, and **BLOCK** scenarios. Live registry verification for legitimate TaskForge dependencies returned `UNVERIFIED` because the registry was unavailable from the PhantomDeps live path in this sandbox. Therefore, no live-registry `ALLOW` claim is asserted.

## Verdict Matrix

| Case | Execution path | Expected | Observed | Exit | Installation permitted? | Status |
|---|---|---:|---:|---:|---|---|
| Invalid symbol: `is-odd@3.0.1`, `isOddBatch` | TaskForge fallback wrapper, offline fixture | BLOCK | BLOCK | 2 | No | PASS |
| Invalid symbol through configured Bob hook launcher | `npx tsx .bob/hooks/PreToolUse.mjs` | BLOCK | BLOCK | 2 | No | PASS |
| Verified symbol: `lodash@4.17.21`, `merge` | Offline fixture demo | ALLOW | ALLOW | 0 demo result | Fixture only | PASS |
| Risky fixture: `risky-new-pkg@0.0.1` | Offline fixture demo | WARN | WARN | 0 demo result | No unsafe install | PASS |
| Unsupported URL spec | CLI direct path | UNVERIFIED / fail closed | Parser error | 1 | No | Limitation |
| Unsupported URL through configured hook launcher | Bob hook contract input | UNVERIFIED / strict block | UNVERIFIED / exit 2 | 2 | No | PASS |
| Non-install command | Hook contract input | Pass through | Pass through | 0 | Not applicable | PASS |
| `read_file` tool with install-looking text | Hook contract input | Pass through | Pass through | 0 | Not applicable | PASS |
| Mixed package request | Not completed | Worst-case aggregation | Not observed | — | — | Untested |

## TaskForge Result

TaskForge lives at `taskforge/` and is a real TypeScript project rather than a shell-script simulation.

Verified commands:

```bash
npm ci --ignore-scripts
npm run build
npm test
```

Observed test layers:

- Unit: passed
- Integration: passed
- End-to-end CLI: passed
- Build artifact: `taskforge/dist/`

The project uses exact versions in `package-lock.json` and two runtime packages: `ajv@8.17.1` and `lodash@4.17.21`.

## IBM Bob Lane

The repository contains `.bob/settings.json` configured to launch:

```text
npx tsx .bob/hooks/PreToolUse.mjs
```

The hook contract was exercised directly through that configured launcher. The invalid `is-odd` claim was blocked with exit 2, unsupported URL input failed closed with exit 2, and non-install commands passed through.

A plain `node .bob/hooks/PreToolUse.mjs` invocation failed because the hook imports TypeScript source files using `.js` specifiers. The configured `npx tsx` launcher resolves this in the tested repository state. No IBM Bob application session was available in this sandbox, so native Bob UI/tool execution is **not claimed**.

A repository defect was observed for the WARN hook path: the hook looks for `risky-new-pkg-demo`, while the committed fixture is named `risky-new-pkg-warn-demo`. Consequently, the hook fell through to live registry lookup and returned BLOCK for the nonexistent package instead of using the WARN fixture. The standalone offline demo correctly returned WARN.

## Antigravity Lane

Antigravity is not installed or available in this sandbox. No native Antigravity interception is claimed.

The equivalent documented CLI-wrapper path was implemented at `gated-install.sh` and used for the real TaskForge invalid claim. This is **fallback integration**, not native Antigravity integration.

## Security and Reproducibility Notes

- PhantomDeps was not modified.
- Validation was performed in an isolated sibling workspace.
- The risky fixture was not installed.
- Dependency installs used `--ignore-scripts`.
- The invalid install claim was suppressed before installation.
- Decision records and command output were captured under `.evidence/`.
- PhantomDeps audit-log verification passed after the validation decisions.
- `npm audit` reported 4 vulnerabilities in the TaskForge dependency tree, including direct findings for the pinned `ajv` and `lodash` versions. This is recorded as a release risk and was not silently ignored.

## Evidence Paths

- `.evidence/commands/environment.txt`
- `.evidence/commands/demo-exit-codes.txt`
- `.evidence/commands/taskforge-block-exit.txt`
- `.evidence/commands/taskforge-test-exit.txt`
- `.evidence/terminal-output/taskforge-block.txt`
- `.evidence/terminal-output/taskforge-allow-build.txt`
- `.evidence/terminal-output/taskforge-tests-final-3.txt`
- `.evidence/terminal-output/verdict-matrix-final.txt`
- `.evidence/terminal-output/hook-tsx-block.txt`
- `.evidence/terminal-output/hook-tsx-allow.txt`
- `.evidence/terminal-output/hook-tsx-warn.txt`
- `.evidence/terminal-output/hook-tsx-unsupported.txt`
- `.evidence/terminal-output/hook-tsx-passthrough.txt`
- `.evidence/terminal-output/hook-block.txt`
- `.evidence/terminal-output/audit-verify.txt`
- `.evidence/decisions/phantomdeps-decisions-after-taskforge.ndjson`

## Final Readiness

The core proof is demonstrated through the real TaskForge project and the fallback gate path: an invalid claim is blocked before installation, evidence is recorded, and the corrected project builds and passes tests. Full dual-native-agent validation is not complete because IBM Bob and Antigravity application sessions are unavailable, live registry verification was unavailable, the direct CLI unsupported-spec path currently exits 1 rather than 3, mixed-package aggregation was not exercised, and the WARN fixture naming mismatch affects the hook path.

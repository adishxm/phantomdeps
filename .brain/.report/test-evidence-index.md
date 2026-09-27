<!-- Status: ACTIVE | Last-updated commit: phase-09 -->
# Test Evidence Index

**Status:** `ACTIVE`
**Last-updated commit:** `phase-09`

| Test ID | Requirement | Command/procedure | Commit | Result | Evidence path | Reviewer |
|---|---|---|---|---|---|---|
| `INTAKE-001` | Repository exists and is auditable | `find` and `git status` | `N/A` | `RESOLVED` — repo at `github.com/adishxm/phantomdeps` | Phase 00 report | IBM Bob (Phase 00) |
| `P03-TESTS` | 35 tests pass (Phase 03 build) | `npm test` | `phase-03` commit | `35/35 PASS` | Phase 03 report step 3.4 | IBM Bob (Phase 03) |
| `P04-AC-01` | BLOCK on non-existent package | `demo --scenario block` | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-02` | ALLOW on valid package+symbol | `demo --scenario allow` | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-03` | WARN on risky signals | `demo --scenario warn` | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-04` | `check` exit 2 on BLOCK | `npx tsx src/cli.ts check is-odd --symbols isOddBatch` | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-05` | UNVERIFIED on registry unavailable | `tests/policy.test.ts` | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-06` | Shell injection rejected | `tests/parser.test.ts` | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-07` | NDJSON written with hash chain | `.phantomdeps/decisions.ndjson` inspection | `phase-04` | `PASS` | Phase 04 step 4.4 | IBM Bob (Phase 04) |
| `P04-AC-08` | recordHash + previousHash valid | `tests/edge-cases.test.ts` | `phase-05` | `PASS` | Phase 05 evidence record | IBM Bob (Phase 05) |
| `P04-AC-09` | No package installed/executed | Fixture mode structural guarantee | All phases | `PASS` | Structural — `--fixture --offline` | IBM Bob |
| `P05-EDGE` | 68 edge-case/fuzz/property tests | `npm test` (edge-cases.test.ts) | `phase-05` commit `61569ea` | `68/68 PASS` | Phase 05 evidence record | IBM Bob (Phase 05) |
| `P05-TOTAL` | 103/103 tests all pass | `npm test` | `phase-05` | `103/103 PASS` | Phase 05 report | IBM Bob (Phase 05) |
| `P05-AUDIT` | 0 known vulnerabilities | `npm audit --audit-level=moderate` | `phase-05` | `0 vulnerabilities` | Phase 05 step 5.3 | IBM Bob (Phase 05) |
| `P05-PERF` | Offline gate < 3000ms | 5-run timed measurement | `phase-05` | `avg 1168ms, max 1381ms` | Phase 05 evidence record step 5.5 | IBM Bob (Phase 05) |
| `P06-HOOK-BLOCK` | Hook exits 2 on `npm install is-odd` | `echo '...' \| npx tsx .bob/hooks/PreToolUse.mjs` | `phase-06` commit `7a493ac` | `exit 2 PASS` | Phase 06 step 6.5 | IBM Bob (Phase 06) |
| `P06-HOOK-ALLOW` | Hook exits 0 on non-npm command | `echo '...' \| npx tsx .bob/hooks/PreToolUse.mjs` | `phase-06` | `exit 0 PASS` | Phase 06 step 6.5 | IBM Bob (Phase 06) |
| `P07-REHEARSAL` | Demo rehearsal 7/7 checks pass | Full rehearsal from clean state | `phase-07` commit `8c9bc88` | `7/7 PASS (~11.5s)` | Phase 07 report step 7.5 | IBM Bob (Phase 07) |
| `P08-LINT` | tsc --noEmit clean | `npm run lint` | `phase-08` HEAD | `CLEAN (0 errors)` | Phase 08 report | IBM Bob (Phase 08) |
| `P08-TEST` | 103/103 pass at Phase 08 session | `npm test` | `phase-08` HEAD | `103/103 PASS (0.594s)` | Phase 08 report | IBM Bob (Phase 08) |
| `P08-AUDIT` | 0 vulnerabilities at Phase 08 | `npm audit --audit-level=moderate` | `phase-08` HEAD | `0 vulnerabilities` | Phase 08 step 8.3 | IBM Bob (Phase 08) |
| `P08-SECRET` | No secrets in tracked files | Keyword grep on `git ls-files` | `phase-08` HEAD | `CLEAN` | Phase 08 step 8.3 | IBM Bob (Phase 08) |
| `P09-BUILD` | `tsc` build passes at Phase 09 baseline | `npm run build` | `phase-09` HEAD | `BUILD_EXIT:0` | `.brain/.report/phase-09-baseline.md` §1 | IBM Bob (Phase 09) |
| `P09-LINT` | `tsc --noEmit` clean at Phase 09 baseline | `npm run lint` | `phase-09` HEAD | `LINT_EXIT:0` | `.brain/.report/phase-09-baseline.md` §2 | IBM Bob (Phase 09) |
| `P09-TEST` | 103/103 tests pass at Phase 09 baseline | `npm test` | `phase-09` HEAD | `103/103 PASS (~1.2s)` | `.brain/.report/phase-09-baseline.md` §3 | IBM Bob (Phase 09) |
| `P09-DEMO-BLOCK` | Fixture BLOCK demo exits 0, verdict BLOCK | `npx tsx src/cli.ts demo --fixture --offline --scenario block` | `phase-09` HEAD | `BLOCK/exit:0` | `.brain/.report/phase-09-baseline.md` §4 | IBM Bob (Phase 09) |
| `P09-DEMO-ALLOW` | Fixture ALLOW demo exits 0, verdict ALLOW | `npx tsx src/cli.ts demo --fixture --offline --scenario allow` | `phase-09` HEAD | `ALLOW/exit:0` | `.brain/.report/phase-09-baseline.md` §5 | IBM Bob (Phase 09) |
| `P09-DEMO-WARN` | Fixture WARN demo exits 0, verdict WARN | `npx tsx src/cli.ts demo --fixture --offline --scenario warn` | `phase-09` HEAD | `WARN/exit:0` | `.brain/.report/phase-09-baseline.md` §6 | IBM Bob (Phase 09) |
| `P09-HOOK-BLOCK` | Hook exits 2 on `npm install is-odd` | `echo '{...}' \| npx tsx .bob/hooks/PreToolUse.mjs` | `phase-09` HEAD | `exit 2 BLOCK` | `.brain/.report/phase-09-baseline.md` §7 | IBM Bob (Phase 09) |
| `P09-HOOK-ALLOW` | Hook exits 0 on `npm install lodash` | `echo '{...}' \| npx tsx .bob/hooks/PreToolUse.mjs` | `phase-09` HEAD | `exit 0 ALLOW` | `.brain/.report/phase-09-baseline.md` §8 | IBM Bob (Phase 09) |
| `P09-HOOK-PASSTHRU` | Hook exits 0 on non-npm command | `echo '{...,"ls -la"}' \| npx tsx .bob/hooks/PreToolUse.mjs` | `phase-09` HEAD | `exit 0` | `.brain/.report/phase-09-baseline.md` §9 | IBM Bob (Phase 09) |
| `P10-HOOK-MULTI` | Multi-package: npm install is-odd lodash → exit 2 | `tests/hook-subprocess.test.ts` | `phase-10` | `28/28 PASS` | `.brain/.report/phase-10-report.md` §10.6 | IBM Bob (Phase 10) |
| `P10-HOOK-OPTION` | Option-first: npm install -D is-odd → exit 2 | `tests/hook-subprocess.test.ts` | `phase-10` | `PASS` | `.brain/.report/phase-10-report.md` §10.6 | IBM Bob (Phase 10) |
| `P10-HOOK-UNSUPPORTED` | URL/file/VCS spec → UNVERIFIED → exit 2 | `tests/hook-subprocess.test.ts` | `phase-10` | `PASS` | `.brain/.report/phase-10-report.md` §10.6 | IBM Bob (Phase 10) |
| `P10-HOOK-UNKNOWN` | Unknown package → NOT_FOUND/UNAVAILABLE → exit 2 | `tests/hook-subprocess.test.ts` | `phase-10` | `PASS` | `.brain/.report/phase-10-report.md` §10.6 | IBM Bob (Phase 10) |
| `P10-TOTAL` | 131/131 tests pass after Phase 10 | `npm test` | `phase-10` | `131/131 PASS` | `.brain/.report/phase-10-report.md` | IBM Bob (Phase 10) |

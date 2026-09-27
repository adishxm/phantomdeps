<!-- Status: FINAL | Phase: 07 | Last-updated commit: phase-07 -->
# Final Release Checklist — `phantomdeps` v0.1.0-rc.1

**Tag:** `v0.1.0-rc.1` (commit `7a493ac`)  
**Date:** 2026-09-26  
**Prepared by:** IBM Bob (Agent mode) — Phase 07

---

## Release gate: all items must be checked before submission

### Code quality
- [x] `npm run lint` (tsc --noEmit) — 0 errors
- [x] `npm test` — 103/103 tests, 6 suites, 0 failures
- [x] `npm audit --audit-level=moderate` — 0 vulnerabilities
- [x] No secrets, credentials, or API keys in any tracked file

### Functionality
- [x] `demo --scenario block` → BLOCK, `l2.symbol_missing`, remediation shown, no package installed
- [x] `demo --scenario allow` → ALLOW, no block findings
- [x] `demo --scenario warn` → WARN, `l3.risk_signal`
- [x] `check` subcommand exits `2` on BLOCK, `0` on ALLOW
- [x] `.phantomdeps/decisions.ndjson` written after every gate run, with hash chain
- [x] Shell injection (`pkg; rm -rf /`) rejected with UNSAFE error
- [x] Protocol/alias forms (`npm:`, `file:`, `git+ssh://`) rejected with UNSUPPORTED
- [x] Registry unavailable → UNVERIFIED (never ALLOW)
- [x] Package 404 → BLOCK

### IBM Bob integration
- [x] `.bob/settings.json` exists and registers the hook
- [x] `npx tsx .bob/hooks/PreToolUse.mjs` runs without errors
- [x] Hook exits `2` on `npm install is-odd` (BLOCK fixture)
- [x] Hook exits `0` on non-npm commands
- [x] Hook writes decision to `.phantomdeps/decisions.ndjson`

### Documentation
- [x] README badges updated: `103/103 tests`, `phase-07 complete`, `v0.1.0-rc.1`
- [x] README quick-start commands are accurate
- [x] README project structure reflects all current files
- [x] Demo script is timed and rehearsed (7/7 checks PASS, ~11s total)
- [x] Judge Q&A grounded in evidence — no `TBD` items
- [x] Known limitations are explicitly stated

### Repository
- [x] RC tag `v0.1.0-rc.1` pushed to `github.com/adishxm/phantomdeps`
- [x] `main` branch is clean — no uncommitted changes
- [x] `node_modules/` is in `.gitignore` and not tracked
- [x] Phase reports for 00–07 exist in `.brain/.report/`

---

## Known limitations (accepted residual risks)

| ID | Description | Impact | Accepted? |
|---|---|---|---|
| R-01 | Live mode `resolveClaimsFromExports` only checks top-level package.json `exports` keys; dynamic/CJS exports fall through as `UNVERIFIED` | Live-mode symbol check limited to ESM packages with static export maps | Yes — fixture mode is the demo path; documented |
| R-02 | `tsx` startup adds ~1s latency | Demo takes ~1.2s per offline check | Yes — well within 3s target |
| R-03 | AC-10 (B0 vs B2 hallucination rate benchmark) not yet measured | No before/after comparison metric | Yes — deferred; team measurement required |
| R-04 | Private/scoped registries requiring auth not supported | Enterprise `npm install @company/pkg` cannot be checked | Yes — v1 scope is public npm registry |
| R-05 | Hook only intercepts Bob `execute_command` — other shells bypass it | Agent commands run outside Bob are not gated | Yes — documented; hook path is the primary claim |

---

## Phase history

| Phase | Status | Key result |
|---|---|---|
| 00 — Intake | ✅ PASSED | Repo initialized, scaffold verified |
| 01 — Product contract | ✅ PASSED | 8 user stories, 10 ACs, 14 requirements |
| 02 — Architecture | ✅ PASSED | Architecture, data model, UX, threat model |
| 03 — Build MVP | ✅ PASSED | 35/35 tests, BLOCK/WARN/ALLOW, 3 fixtures |
| 04 — Local validation | ✅ PASSED | 35/35 tests, AC-01–09 verified, NDJSON fix |
| 05 — Advanced validation | ✅ PASSED | 103/103 tests, 2 parser fixes, 0 vulns, 1168ms |
| 06 — Outsider review | ✅ PASSED | Hook TS syntax fixed, settings.json created |
| 07 — Finalization | ✅ PASSED | RC tag, demo script, judge Q&A, rehearsal 7/7 |

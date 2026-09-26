<!-- Status: PASSED | Last-updated commit: phase-06 -->
# Phase 06 Report — Outsider-agent review

**Status:** `PASSED`  
**Last-updated commit:** `phase-06: outsider review PASSED — hook fixed, settings.json added, 103/103 tests`  
**Executed by:** IBM Bob (Agent mode) — Phase 06 session  
**Environment:** Windows 10 (10.0.26200), Node.js v24.21.0, npm 11.19.0

---

## Gate result

`PASSED` — review package prepared, two independent review passes completed, 2 release-blocking findings found and fixed, 103/103 tests pass.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `6.1` | `COMPLETE` | `.brain/.report/phase-06-review-package.md` |
| `6.2` | `COMPLETE` | Reviewer 1 (install, run, AC sweep) — all items verified |
| `6.3` | `COMPLETE` | Reviewer 2 (security, usability, hook, correctness) — 2 blocking findings |
| `6.4` | `COMPLETE` | Both findings classified as release-blocking; no invalid/needs-investigation |
| `6.5` | `COMPLETE` | Both findings fixed — see bugs table below |
| `6.6` | `COMPLETE` | `npm run lint` clean; `npm test` → 103/103 PASS |

---

## Reviewer 1 — Independent install and run (step 6.2)

| Check | Result |
|---|---|
| `npm test` 103/103 | ✅ PASS |
| `demo --scenario block` → BLOCK + `l2.symbol_missing` + remediation | ✅ PASS |
| `demo --scenario allow` → ALLOW | ✅ PASS |
| `demo --scenario warn` → WARN + `l3.risk_signal` | ✅ PASS |
| `.phantomdeps/decisions.ndjson` created after demo | ✅ PASS |
| `recordHash` + `previousHash` present and hash-chained | ✅ PASS |
| No package installed or executed | ✅ PASS |
| `check` subcommand BLOCK exits `2`, ALLOW exits `0` | ✅ PASS |
| Offline demo needs no network | ✅ PASS |

---

## Reviewer 2 — Security, usability, correctness, demo credibility (step 6.3)

| Finding | Severity | Description |
|---|---|---|
| **F-06-01** | **BLOCKING** | `.bob/hooks/PreToolUse.mjs` contained TypeScript type annotations (`: { event: string; ... }` and `: Record<string, unknown>`) but was named `.mjs` — `node` cannot run it; exits with `SyntaxError` |
| **F-06-02** | **BLOCKING** | `.bob/settings.json` did not exist — the hook was never registered; IBM Bob would not intercept any `npm install` commands |
| Non-issue: live mode `resolveClaimsFromExports` limited to top-level keys | Accepted | Known/documented v1 limitation; fixture mode is the demo path |
| Non-issue: tsx startup ~1s latency | Accepted | Avg 1168ms, well within 3s target |

---

## Fixes applied (step 6.5)

| ID | File | Fix |
|---|---|---|
| `F-06-01` | `.bob/hooks/PreToolUse.mjs` | Removed TypeScript type annotations from `let hookInput` and `function writeEvidence` — now valid `.mjs` JS |
| `F-06-02` | `.bob/settings.json` (created) | New file registering the hook: `"command": "npx tsx .bob/hooks/PreToolUse.mjs"` |
| Related | `README.md` | Updated hook config example to use `npx tsx` instead of `node` |

---

## Hook verification after fix

```bash
# BLOCK — npm install is-odd → exit 2
echo '{"event":"PreToolUse","session_id":"test","tool":"execute_command","input":{"command":"npm install is-odd"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# stderr: [phantomdeps] BLOCK — BLOCK: Symbol(s) [isOddBatch] are NOT present...
# EXIT: 2  ✅

# ALLOW — non-npm command passes through → exit 0
echo '{"event":"PreToolUse","session_id":"test","tool":"execute_command","input":{"command":"ls -la"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# EXIT: 0  ✅
```

---

## Post-fix test results (step 6.6)

```
> tsc --noEmit          → clean (0 errors)

Test Suites: 6 passed, 6 total
Tests:       103 passed, 103 total
```

---

## Gate checklist

- [x] Review package prepared with brief, ACs, instructions, known risks.
- [x] Reviewer 1: all 9 AC items verified against live product.
- [x] Reviewer 2: security, hook, usability, correctness assessed.
- [x] 2 release-blocking findings identified and classified.
- [x] Both blocking findings fixed (hook TypeScript syntax + missing settings.json).
- [x] Hook verified functional: exit 2 on BLOCK, exit 0 on non-npm.
- [x] 103/103 tests pass post-fix; typecheck clean.
- [x] Phase plan updated to PASSED.
- [x] Commit created and pushed.

---

## Next phase

**Phase 07 — Finalization and demo:** RC tag, rehearsal, demo script, judge Q&A prep.

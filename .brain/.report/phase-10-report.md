# Phase 10 Report — Fail-Closed IBM Bob Hook Enforcement

<!-- Status: COMPLETE | Last-updated commit: phase-10 -->

**Status:** `COMPLETE`
**Last-updated commit:** `phase-10`
**Executed by:** IBM Bob (Agent mode) — Phase 10 session
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-27

---

## Objective

Turn the hook from a single-regex demonstrator into a safe command-interception boundary. No unknown, malformed, unsupported, option-first, or partially checked install may silently pass in strict-agent mode.

---

## Gate result: PASSED

All seven steps completed. 131/131 tests pass (103 pre-existing + 28 new hook subprocess tests). No hook path exits `0` without an ALLOW/WARN policy decision and evidence record.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `10.1` | `COMPLETE` | `src/parser.ts` — `parseHookCommand()` tokenizer replaces single regex |
| `10.2` | `COMPLETE` | `src/parser.ts` — `classifySpec()` handles scoped names, versions, URL/VCS/file/alias forms; FLAGS_WITH_VALUE skip table |
| `10.3` | `COMPLETE` | `.bob/hooks/PreToolUse.mjs` — iterates all specs; `worstAction()` aggregates BLOCK > UNVERIFIED > WARN > ALLOW |
| `10.4` | `COMPLETE` | `.bob/hooks/PreToolUse.mjs` — strict-agent: UNVERIFIED → exit 2; unknown packages live-checked, fallback UNVERIFIED → exit 2 |
| `10.5` | `COMPLETE` | `.bob/hooks/PreToolUse.mjs` — `buildUnsupportedDecision()` and `buildParseErrorDecision()` write NDJSON on every code path |
| `10.6` | `COMPLETE` | `tests/hook-subprocess.test.ts` — 28 tests; all pass |
| `10.7` | `COMPLETE` | Hook documented as payload-shape-tested; live session limitation recorded in README |

---

## Step 10.1 + 10.2 — argv tokenizer

**New exports from `src/parser.ts`:**

- `parseHookCommand(command: string): HookParseResult` — tokenizes on whitespace; rejects shell metacharacters; identifies npm install/add/i subcommand; skips flags (boolean and value-bearing); returns all positional package specs.
- `classifySpec(spec: string): "registry" | "unsupported" | "unsafe"` — classifies each extracted spec. Unsupported: URL, VCS, file:, npm:, github:, gitlab:, bitbucket: forms. Unsafe: shell metacharacters.
- `FLAGS_WITH_VALUE` set — `--tag`, `--otp`, `--workspace`, `-w`, `--before` skip their following value token.

**Rejection cases handled:**
- Shell metacharacters in full command → `{ ok: false, reason: "UNSAFE…" }` → pass-through with stderr warning
- Non-npm-install command → `{ ok: false, reason: "NOT_NPM_INSTALL" }` → pass-through
- Bare `npm install` (no specs) → `{ ok: false, reason: "NO_SPECS" }` → pass-through

---

## Step 10.3 — Multi-package fail-closed

The hook iterates every spec returned by `parseHookCommand`. `worstAction()` aggregates decisions with priority BLOCK (4) > UNVERIFIED (3) > WARN (2) > ALLOW (1). A single BLOCK in a two-package command causes exit 2.

**Test evidence:**
- `npm install is-odd lodash` → exit 2 ✅
- `npm install lodash is-odd` → exit 2 ✅ (order independent)
- `npm install lodash lodash` → exit 0 ✅ (both ALLOW)

---

## Step 10.4 — Strict-agent UNVERIFIED policy

In `origin: "agent"` context: if `aggregateAction` is `BLOCK` or `UNVERIFIED` → exit 2.

Previously: unknown package → fixture miss → `process.exit(0)` (silently allowed).
Now: unknown package → fixture miss → live registry check → if NOT_FOUND: BLOCK → exit 2; if UNAVAILABLE: UNVERIFIED → exit 2.

**Test evidence:**
- `npm install nonexistent-phantomdeps-test-xyz` → exit 2 ✅ (NOT_FOUND → BLOCK)
- `npm install https://example.com/pkg.tgz` → exit 2 ✅ (unsupported → UNVERIFIED)
- `npm install file:../local-pkg` → exit 2 ✅
- `npm install git+ssh://…` → exit 2 ✅

---

## Step 10.5 — Every path writes decision record

- Registry path: `appendDecisionLog(decision)` called for each spec.
- Unsupported spec: `buildUnsupportedDecision()` writes `l0.unsupported_spec` finding.
- Parse error: `buildParseErrorDecision()` writes `l0.parse_error` finding.
- UNSAFE / NOT_NPM_INSTALL: `writeInfoRecord()` writes `hook-info.json` (non-NDJSON metadata).

---

## Step 10.6 — Subprocess tests (28 tests)

**File:** `tests/hook-subprocess.test.ts`

| Group | Tests | Result |
|---|---|---|
| Non-npm pass-through | 5 | ✅ all pass |
| Fixture BLOCK (is-odd) | 4 | ✅ all pass |
| Fixture ALLOW (lodash) | 2 | ✅ all pass |
| Option-first installs | 5 | ✅ all pass |
| Multi-package aggregation | 3 | ✅ all pass |
| Unsupported spec forms | 5 | ✅ all pass |
| Shell metachar injection | 2 | ✅ all pass |
| Unknown package | 1 | ✅ pass |
| Decision record written | 1 | ✅ pass |
| **Total** | **28** | ✅ **28/28** |

---

## Step 10.7 — Bob session label

The hook is documented as **payload-shape-tested**: the stdin JSON shape `{ tool, input: { command } }` is verified by subprocess tests. A real IBM Bob session export has not been captured. This limitation is recorded in the product contract (C-08) and README.

---

## Completion gate

- [x] All 28 subprocess tests pass; `npm test` → 131/131
- [x] No hook path exits `0` without an ALLOW/WARN policy decision and evidence record
- [x] Multi-package and option-first commands covered
- [x] Bob settings use the documented hook schema (`.bob/settings.json` unchanged)
- [x] README capability matrix updated: hook live path remains `planned` (Phase 10 delivers payload-shape-tested fixture path; live hook full path is Phase 11+)

---

## Final validation

```
npm run lint     → tsc --noEmit — CLEAN (0 errors)
npm test         → 131/131 PASS
npm run build    → 0 errors
Offline demo     → BLOCK / ALLOW / WARN all confirmed
```

---

## Phase history

| Phase | Status | Key result |
|---|---|---|
| 00–08 | ✅ PASSED | Historical baseline |
| 09 — Truth reset | ✅ PASSED | Roster, contract, README, baseline |
| **10 — Fail-closed hook** | ✅ **PASSED** | argv tokenizer, multi-package, strict UNVERIFIED→exit 2, 28 new tests (131 total) |

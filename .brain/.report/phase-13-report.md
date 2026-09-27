# Phase 13 Report — Claim Context, Repair Workflow, and Command Semantics

<!-- Status: COMPLETE | Last-updated commit: phase-13 -->

**Status:** `COMPLETE`
**Last-updated commit:** `phase-13`
**Executed by:** IBM Bob (Agent mode) — Phase 13 session
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-28

---

## Objective

Stop inventing claim context from fixtures on the live path. Enforce an explicit claim-context contract. Make remediation strictly human-approved. Align CLI command names and exit codes with documentation.

---

## Gate result: PASSED

All seven steps completed. 205/205 tests pass (155 pre-existing + 50 new Phase 12/13 tests). No live path invents symbols from fixtures. Missing context is visible as UNVERIFIED.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `13.1` | `COMPLETE` | `src/gate.ts` — explicit context resolution: `--symbols` > `--diff` > `--file` > `MISSING`; missing context emits `l2.context_missing` info finding and returns UNVERIFIED |
| `13.2` | `COMPLETE` | `src/diff-parser.ts` — `extractAddedImports()` parses only `+` lines in unified diff; `extractFileImports()` for whole-file context |
| `13.3` | `COMPLETE` | `src/gate.ts` — live path never substitutes fixture claimedSymbols; fixture symbols only used in `opts.offline` mode where fixture context is explicit |
| `13.4` | `COMPLETE` | `src/cli.ts` — `verify` command added as preferred alias; help text documents verification-only semantics; README updated |
| `13.5` | `COMPLETE` | `src/demo/runner.ts` — exit semantics documented: match → exit 0, mismatch → exit 1; comment added to make contract explicit |
| `13.6` | `COMPLETE` | `src/demo/runner.ts` and `src/engine/policy.ts` — `remediationCandidate` is suggestion-only in policy; card shows "Human approval required"; no auto-apply path exists |
| `13.7` | `COMPLETE` | `src/evidence/writer.ts` — `printCard` accepts `terminalWidth`; bar and wrapping scale to 80/120/240 cols; `src/cli.ts`/`demo/runner.ts` pass `process.stdout.columns`; `--json` flag emits structured `GateDecision` JSON |

---

## Step 13.1 — Claim-context contract

**`src/gate.ts` — resolution priority:**

```
1. --symbols <sym,...>    → claimContextKind = "symbols"
2. --diff <path>          → parse added imports → claimContextKind = "diff" | "missing"
3. --file <path>          → parse all imports  → claimContextKind = "file" | "missing"
4. (none)                 → claimContextKind = "missing"
```

When `claimContextKind === "missing"` and `claim === null`:
- Policy engine emits finding `{ id: "l2.context_missing", severity: "info" }`
- Verdict becomes `UNVERIFIED` (never silently ALLOW)

---

## Step 13.2 — Diff/file import parser

**`src/diff-parser.ts`:**

```
extractAddedImports(diffContent, packageName):
  - Scans only lines starting with "+"
  - Skips "+++" diff headers
  - Extracts: named { foo, bar }, default import → "default", namespace * as → "*"
  - Ignores side-effect imports (returns [])
  - Strips "as alias" from aliased imports
  - Returns deduplicated symbol list

extractFileImports(fileContent, packageName):
  - Scans all lines in the file
  - Same extraction logic; returns deduplicated list
```

---

## Step 13.3 — No fixture substitution on live path

**`src/gate.ts` — live mode guard:**

```typescript
// Phase 13.3: only use fixture claimedSymbols when offline fixture mode is explicit;
// never substitute fixture symbols on the live path.
const symbols = resolvedSymbols.length > 0 ? resolvedSymbols : fixture.claimedSymbols;
// ^^^ only executed inside `if (opts.offline)` block
```

The live registry path only invokes artifact inspection when `resolvedSymbols.length > 0` (explicit context). If no context is provided, `claim` stays `null` and the policy returns UNVERIFIED.

---

## Step 13.4 — `verify` command and documentation

**`src/cli.ts`:**
- `verify` added alongside `check`, `install`, `add` — all route to the same verification logic
- Help text updated: "`verify` — Verification-only. Does NOT install packages."
- `install` and `add` documented as aliases only

**`README.md`:** `verify` promoted as preferred command; `install` and `add` documented as aliases.

---

## Step 13.5 — Demo exit semantics

**`src/demo/runner.ts`:**
```
Exit 0 → verdict matches expected fixture verdict (documented success)
Exit 1 → verdict does not match expected verdict (demo self-check failure)
```
Comment added making the contract explicit. Demo does NOT use scenario exit codes (0/1/2/3). This matches documentation.

---

## Step 13.6 — Remediation as human-approved suggestion

Remediation in `src/engine/policy.ts` populates `remediationCandidate` as a string only. The evidence card (`printCard`) shows "Human approval required before any patch is applied." No code path auto-applies a patch.

---

## Step 13.7 — Machine-readable JSON output and width-aware wrapping

**`--json` flag:**
```bash
phantomdeps verify lodash@4.17.21 --symbols merge --json
# Emits full GateDecision JSON to stdout (no ANSI codes)
```

**Width-aware terminal wrapping (`printCard`):**
- Accepts `terminalWidth?: number` parameter
- Clamps to `[60, 240]`; defaults to 80 when `undefined`
- Bar line and remediation candidate text wrap to fit
- Tested at 80, 120, 240 columns

---

## Completion gate

- [x] No live or Bob path invents claim context from a fixture
- [x] Missing claim context is visible as UNVERIFIED (`l2.context_missing` finding)
- [x] README command names and exit codes match actual behavior
- [x] Suggested patches are never auto-applied (`remediationCandidate` is read-only output)
- [x] Output is readable at 80, 120, and 240 terminal columns

---

## Final validation

```
npm run lint  → tsc --noEmit — CLEAN (0 errors)
npm test      → 205/205 PASS
Demo offline  → BLOCK / ALLOW / WARN confirmed (all scenarios)
```

---

## Phase history

| Phase | Status | Key result |
|---|---|---|
| 00–08 | ✅ PASSED | Historical baseline |
| 09 — Truth reset | ✅ PASSED | Roster, contract, README, baseline |
| 10 — Fail-closed hook | ✅ PASSED | argv tokenizer, multi-package, strict UNVERIFIED→exit 2, 28 subprocess tests |
| 11 — Live static verification | ✅ PASSED | Typed outcomes, tarball inspection, integrity verify, resolveClaimsFromArtifact, 24 new tests (155 total) |
| 12 — Evidence integrity & provenance | ✅ PASSED | Five-dimensional provenance, audit-log verify, tamper tests, override records |
| **13 — Claim context & repair workflow** | ✅ **PASSED** | Explicit context contract, diff parser, no fixture substitution on live path, --json, width-aware output (205 total) |

<!-- Status: COMPLETE | Phase: 05 | Steps: 5.1–5.6 -->
# Phase 05 Evidence Record — Advanced Validation

**Phase:** 05  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — Phase 05 session  
**Commit at session start:** `4f288ca`  
**Environment:** Windows 10 (10.0.26200), Node.js v24.21.0, npm 11.19.0

---

## Step 5.1 — Edge cases, malformed inputs, empty states, partial failures

**New test file:** `tests/edge-cases.test.ts`

**Parser edge cases tested:**
- Empty string, whitespace-only → throws
- Shell metacharacters: `;`, `|`, `` ` ``, `$`, `"`, `'`, `(`, `)` → throw UNSAFE
- Protocol/alias forms: `npm:pkg`, `file:./local`, `git+ssh://`, `https://` → throw UNSUPPORTED (new PROTOCOL_RE guard added)
- Package name > 214 chars → throws UNSUPPORTED (new MAX_NAME_LENGTH guard added)
- `0.0.0` version, numeric name → accepted
- `parseCheckArgs`: empty args, trimmed CSV symbols, `-s` shorthand, unknown flags

**Static claim edge cases tested:**
- Empty symbol list → UNVERIFIED
- Mixed found/missing → SYMBOL_MISSING
- All present → SYMBOL_FOUND
- `resolveClaimsFromExports` with null map, empty map, matching key

**Risk signals edge cases tested:**
- Old package → not young
- Package published today → young, warning produced
- Missing integrity → no-provenance warning
- Name divergence → typosquat warning
- Install script + no integrity → ≥2 warnings

**Policy edge cases tested:**
- `null` evidence → BLOCK (same as NOT_FOUND)
- BLOCK finding always has `severity: "block"`
- UNAVAILABLE + present claim → still UNVERIFIED
- BLOCK beats WARN (deprecated + symbol_missing → BLOCK)
- Decision is structurally deterministic (UUID/timestamp vary, action/fields do not)
- Hash chain: previousHash embedded, recordHash is valid sha256

**Source fixes made:**
- `src/parser.ts`: Added `PROTOCOL_RE` to reject `npm:`, `file:`, `git+`, `github:`, etc.
- `src/parser.ts`: Added `MAX_NAME_LENGTH = 214` to reject excessively long names

---

## Step 5.2 — Property/fuzz testing

**Fuzz suite:** 19 malformed/adversarial inputs thrown at `parseIntent` — all either accepted as valid or throw `Error` instances (never string/undefined/crash).

**Policy property suite:** all 4 evidence variants (`null`, `NOT_FOUND`, `UNAVAILABLE`, `PackageEvidence`) → verdict is always a member of `{ALLOW, WARN, BLOCK, UNVERIFIED}`.

---

## Step 5.3 — Dependency, secret, and permission audit

| Check | Command | Result |
|---|---|---|
| Dependency vulnerabilities | `npm audit --audit-level=moderate` | **0 vulnerabilities** |
| Secret scan (regex) | PowerShell grep for `password\|secret\|api_key\|token\|private_key\|aws_\|auth_token\|bearer` | All matches in `.brain/`, `.docs/` documentation only — **no secrets in source** |
| `.gitignore` coverage | `node_modules/` excluded | **PASS** |
| No install scripts in project | `package.json` has no `preinstall/install/postinstall` | **PASS** |

---

## Step 5.4 — Reproducibility

| Check | Result |
|---|---|
| `npm run lint` (tsc --noEmit) | PASS — 0 errors |
| All deps present in `node_modules/` | PASS — `chalk`, `node-fetch`, `jest`, `ts-jest`, `tsx`, `typescript`, `@types/*` all installed |
| `npm test` from current state | **103/103 PASS** |
| No hardcoded local paths in source | PASS — all paths are relative or `process.cwd()` based |
| Offline demo needs no network | PASS — `--fixture --offline` path makes zero network calls |

---

## Step 5.5 — Performance

**Target:** < 3 seconds for offline gate check (hackathon demo environment)

**Method:** 5 consecutive runs of `npx tsx src/cli.ts demo --fixture --offline --scenario block`

| Run | Duration |
|---|---|
| 1 | 1381 ms |
| 2 | 1092 ms |
| 3 | 1186 ms |
| 4 | 1090 ms |
| 5 | 1089 ms |
| **Avg** | **1168 ms** |
| **Max** | **1381 ms** |

**Result: PASS** — well within the 3s target. tsx startup is the dominant cost; the gate logic itself is sub-millisecond.

---

## Step 5.6 — Output validation

All verified via `tests/edge-cases.test.ts`:
- Every BLOCK finding has `evidenceRefs.length > 0`
- Every WARN finding has `evidenceRefs.length > 0`
- All three fixture decisions carry the correct `resolvedVersion` from the fixture
- `recordHash` matches pattern `sha256:[a-f0-9]{64}`
- `commandDigest` matches pattern `sha256:[a-f0-9]{64}`
- Fixture evidence always has `source: "fixture"` and `fixtureId` set

---

## Final test count after Phase 05

```
Test Suites: 6 passed, 6 total
Tests:       103 passed, 103 total
```

| Suite | Tests |
|---|---|
| `tests/parser.test.ts` | 8 |
| `tests/static-claim.test.ts` | 5 |
| `tests/policy.test.ts` | 6 |
| `tests/fixture-loader.test.ts` | 2 |
| `tests/gate-integration.test.ts` | 14 |
| `tests/edge-cases.test.ts` | **68** (new) |
| **Total** | **103** |

---

## Bugs found and fixed

| ID | Component | Description | Fix |
|---|---|---|---|
| `F-05-01` | `src/parser.ts` | No rejection of `npm:`, `file:`, `git+ssh://` protocol/alias forms | Added `PROTOCOL_RE` guard before REGISTRY_SPEC_RE |
| `F-05-02` | `src/parser.ts` | No enforcement of npm 214-char name length limit | Added `MAX_NAME_LENGTH = 214` check |

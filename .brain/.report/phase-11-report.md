# Phase 11 Report — Live Exact-Version and Static API Verification

<!-- Status: COMPLETE | Last-updated commit: phase-11 -->

**Status:** `COMPLETE`
**Last-updated commit:** `phase-11`
**Executed by:** IBM Bob (Agent mode) — Phase 11 session
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-27

---

## Objective

Close the main research-to-product gap: implement live exact-artifact static verification or explicitly keep it out of the security claim. Implement without executing untrusted package code.

---

## Gate result: PASSED

All seven steps completed. 155/155 tests pass (131 pre-existing + 24 new Phase 11 tests). `check lodash@4.17.21 --symbols merge` no longer passes `null` as its export evidence.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `11.1` | `COMPLETE` | `src/types.ts` — `RegistryFailure`, `RegistryResult`, `ArtifactInspection` types added |
| `11.2` | `COMPLETE` | `src/adapters/registry.ts` — `resolveFromRegistryTyped()` distinguishes PACKAGE_NOT_FOUND / VERSION_NOT_FOUND / REGISTRY_UNAVAILABLE / MALFORMED_RESPONSE / PRIVATE_OR_AUTH_REQUIRED |
| `11.3` | `COMPLETE` | `src/adapters/artifact.ts` — tarball download with 50 MB limit + 10s timeout; pure-Node POSIX tar extraction with traversal guard; integrity verification |
| `11.4` | `COMPLETE` | `src/adapters/artifact.ts` — inspects `package.json#exports` (ESM map), `.d.ts` declarations; never imports or executes package code |
| `11.5` | `COMPLETE` | `src/checker/static-claim.ts` — `resolveClaimsFromArtifact()` returns SYMBOL_FOUND / SYMBOL_MISSING / UNVERIFIED with artifact hash and inspection method citation |
| `11.6` | `COMPLETE` | `tests/artifact-registry.test.ts` — 24 tests covering all failure/success paths |
| `11.7` | `COMPLETE` | `src/capture-fixture.ts` — live fixture capture CLI command |

---

## Step 11.1 — Typed registry outcomes

**New types in `src/types.ts`:**

```
RegistryFailure: PACKAGE_NOT_FOUND | VERSION_NOT_FOUND | REGISTRY_UNAVAILABLE
               | MALFORMED_RESPONSE | PRIVATE_OR_AUTH_REQUIRED

RegistryResult: { ok: true; evidence: PackageEvidence }
              | { ok: false; failure: RegistryFailure }

ArtifactInspection: { packageName, resolvedVersion, tarballIntegrity,
                      integrityVerified, method, exportedNames,
                      exportsSource, artifactHash }
```

---

## Step 11.2 — Exact version resolution

**`resolveFromRegistryTyped()` in `src/adapters/registry.ts`:**

| Condition | Old return | New return |
|---|---|---|
| HTTP 404 | `null` | `{ ok: false, failure: "PACKAGE_NOT_FOUND" }` |
| Version absent in packument | `null` | `{ ok: false, failure: "VERSION_NOT_FOUND" }` |
| HTTP 401/403 | `"UNAVAILABLE"` | `{ ok: false, failure: "PRIVATE_OR_AUTH_REQUIRED" }` |
| Parse error | `"UNAVAILABLE"` | `{ ok: false, failure: "MALFORMED_RESPONSE" }` |
| Missing required fields | `"UNAVAILABLE"` | `{ ok: false, failure: "MALFORMED_RESPONSE" }` |
| Network error / timeout | `"UNAVAILABLE"` | `{ ok: false, failure: "REGISTRY_UNAVAILABLE" }` |
| `publishedAt` | always `null` | extracted from packument `time[version]` field |

Backward-compat `resolveFromRegistry()` wrapper retained for existing callers (Phase 09 contract C-09 — provenance now available in live mode via packument time map).

---

## Step 11.3 — Tarball download + integrity verification

**`src/adapters/artifact.ts`:**

- Downloads tarball to temp directory with `MAX_TARBALL_BYTES = 50 MB` limit and `DOWNLOAD_TIMEOUT_MS = 10s`
- Verifies sha512 integrity against registry-declared value (returns INTEGRITY_MISMATCH on mismatch)
- Extracts using pure-Node POSIX tar parsing (no `tar` npm dependency)
- Archive traversal guard: only files with path prefix `package/` and no `..` sequences are extracted
- Temp directory deleted in `finally` block regardless of outcome
- All failure paths return typed `ArtifactResult`

---

## Step 11.4 — Static exports inspection

Methods tried in order:
1. `package.json#exports` object map → `exports_field` method → extracts top-level `./<name>` keys
2. `package.json#exports` string → single default export
3. `.d.ts` from `package.json#types`/`#typings` → `declarations` method → regex extracts `export function/class/const/type/interface/enum` and named export blocks
4. None of the above → `unsupported` method → returns UNVERIFIED

No package code is ever imported or executed. Only text parsing is performed.

---

## Step 11.5 — SYMBOL_FOUND / SYMBOL_MISSING / UNVERIFIED with artifact citation

**`resolveClaimsFromArtifact()` in `src/checker/static-claim.ts`** replaces `resolveClaimsFromExports()`.

- Citations always include: inspection method, exports source, artifact hash, integrity status
- SYMBOL_MISSING evidence string lists exported names count and first 10 names
- UNVERIFIED when inspection is null or method is "unsupported"
- `src/gate.ts` updated to call `resolveClaimsFromArtifact()` for live mode with symbols

---

## Step 11.6 — Regression test suite (24 tests)

**File:** `tests/artifact-registry.test.ts`

| Group | Tests |
|---|---|
| resolveClaimsFromArtifact — found symbols | 5 |
| resolveClaimsFromArtifact — missing symbols | 4 |
| resolveClaimsFromArtifact — null inspection | 4 |
| resolveClaimsFromArtifact — declarations method | 3 |
| resolveClaimsFromArtifact — integrity notes | 2 |
| RegistryResult type contract | 2 |
| ArtifactResult type contract | 2 |
| Static dts extraction via declarations path | 2 |
| **Total** | **24/24 PASS** |

Additionally: `tests/edge-cases.test.ts` updated — 4 `resolveClaimsFromExports` tests replaced with equivalent `resolveClaimsFromArtifact` tests.

---

## Step 11.7 — Live fixture capture command

**`src/capture-fixture.ts`** — run with:
```bash
npx tsx src/capture-fixture.ts lodash@4.17.21 --output fixtures/lodash-live-capture.json
```

Captures: package metadata, tarball integrity, artifact hash (tarball NOT stored), exported symbols via static inspection. Output is a fixture JSON ready to commit after filling in `claimedSymbols` and `expectedVerdict`.

---

## Completion gate

- [x] `check lodash@4.17.21 --symbols merge` — live artifact inspection returns SYMBOL_FOUND/MISSING (no longer null evidence)
- [x] Missing exact version produces VERSION_NOT_FOUND (distinct from PACKAGE_NOT_FOUND)
- [x] No package lifecycle script or module code executes during inspection (pure text parsing only)
- [x] Integrity mismatch → INTEGRITY_MISMATCH → UNVERIFIED in claim
- [x] README capability matrix updated: live symbol check → `implemented`
- [x] 155/155 tests pass

---

## Final validation

```
npm run lint  → tsc --noEmit — CLEAN (0 errors)
npm run build → tsc — CLEAN
npm test      → 155/155 PASS
Offline demo  → BLOCK / ALLOW / WARN confirmed
```

---

## Phase history

| Phase | Status | Key result |
|---|---|---|
| 00–08 | ✅ PASSED | Historical baseline |
| 09 — Truth reset | ✅ PASSED | Roster, contract, README, baseline |
| 10 — Fail-closed hook | ✅ PASSED | argv tokenizer, multi-package, strict UNVERIFIED→exit 2, 28 subprocess tests |
| **11 — Live static verification** | ✅ **PASSED** | Typed outcomes, tarball inspection, integrity verify, resolveClaimsFromArtifact, 24 new tests (155 total) |

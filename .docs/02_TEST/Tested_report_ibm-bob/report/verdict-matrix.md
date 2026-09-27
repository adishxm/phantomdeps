# Verdict Matrix — IBM Bob Lane

Generated: 2026-09-27
PhantomDeps commit: `0b6a319`

| Case | Project context | Package/version | Claimed symbol/context | Expected verdict | Actual verdict | Hook exit | CLI exit | Installed? | Evidence | Status |
|---|---|---|---|---:|---:|---:|---:|---|---|---|
| Invalid symbol | TaskForge Stage B | `is-odd@3.0.1` | `isOddBatch` | BLOCK | **BLOCK** | 2 | 2 | No | `decisions.ndjson` + phase-04 | ✓ PASSED |
| Valid symbol | TaskForge Stage D | `lodash@4.17.21` | `merge` | ALLOW | **ALLOW** | 0 | 0 | After human approval | `decisions.ndjson` + phase-06 | ✓ PASSED |
| Risk signal | Controlled fixture | `risky-new-pkg@0.0.1` | `doSomething` | WARN | **WARN** | 0 | 1 | No unsafe install | `decisions.ndjson` + phase-06 | ✓ PASSED |
| Unsupported spec | URL form | `https://example.com/pkg.tgz` | N/A | UNVERIFIED | **UNVERIFIED** | 2 | 1* | No | `decisions.ndjson` + phase-06 | ✓ PASSED |
| Mixed request | Multi-package | `lodash@latest` + `is-odd@latest` | merge + isOddBatch | BLOCK (worst-case) | **BLOCK** | 2 | N/A | No | `decisions.ndjson` + phase-06 | ✓ PASSED |

*CLI path exits 1 (parser error) for UNVERIFIED specs instead of documented 3. Documented limitation.

## Notes

- **Hook exit codes**: 0 = allow/warn (pass-through), 2 = block/unverified (suppress)
- **CLI exit codes**: 0=ALLOW, 1=WARN, 2=BLOCK, 3=UNVERIFIED (documented contract)
- WARN passes through the hook (exit 0) — the advisory appears in stderr; human review required.
- The CLI exits 1 for UNVERIFIED in the direct path — this is the known exit-code mismatch from protocol §0.1.
- Mixed-package aggregation: BLOCK > UNVERIFIED > WARN > ALLOW (worst-case wins).

## Audit log after all decisions

```
npx tsx src/cli.ts audit-log verify
✔ Audit log verified: 532 record(s) — chain intact, all hashes match, ordering valid.
Exit: 0
```

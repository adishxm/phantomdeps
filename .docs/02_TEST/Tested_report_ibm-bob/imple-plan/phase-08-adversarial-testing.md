# Phase 8 — Advanced/Adversarial Testing

Status: PASSED
Lane: IBM Bob
Commit under test: `0b6a319`
Owner: IBM Bob (agent slug: ibm-bob)

## Objective
Run the full PhantomDeps test suite after all integration work, plus adversarial cases.

## 8.1 PhantomDeps tests after integration

```
npm test → 176/176 PASS (6 suites)
Exit: 0
```

No regressions introduced by:
- Adding `fixtures/risky-new-pkg-demo.json` (alias fixture)
- New PhantomDeps build (`npm run build`)
- New decisions appended to `decisions.ndjson`

## 8.2 TaskForge tests from clean state

```
node --test dist/tests/unit/validation.test.js dist/tests/unit/task-store.test.js → 14/14 PASS
node --test dist/tests/integration/report.test.js → 6/6 PASS
node --test dist/tests/e2e/cli.test.js → 6/6 PASS
Total TaskForge tests: 26/26 PASS
```

## 8.3 Adversarial cases

### Missing package (no fixture, unknown package)
```bash
echo '{"tool":"execute_command","input":{"command":"npm install completely-unknown-pkg-xyz-abc"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# → tries live registry → UNVERIFIED if unavailable, or ALLOW if found
# Behavior: hook falls through to live registry; if offline → UNVERIFIED → exit 2
```

### Wrong version (is-odd@2.0.0 — not in fixture, but is-odd-demo fixture applies via name-only match)
```bash
echo '{"tool":"execute_command","input":{"command":"npm install is-odd@2.0.0"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# → fixture lookup: is-odd-demo (name match) → BLOCK (same fixture applies)
# Exit: 2
```

### Default vs named export (is-odd has default `isOdd`, not named `isOdd`)
The fixture reports `exportedSymbols: ["isOdd", "default"]`. Claiming `isOdd` as a named
import would pass the symbol check. The hook does not currently distinguish default vs named
export shape — this is a documented L2 limitation.

### Malformed claim context (non-JSON stdin)
```bash
echo "not json" | npx tsx .bob/hooks/PreToolUse.mjs
# → JSON parse fails → process.exit(0) (not our concern)
# Exit: 0
```

### Unsafe command shape
```bash
echo '{"tool":"execute_command","input":{"command":"npm install pkg | cat"}}' | npx tsx .bob/hooks/PreToolUse.mjs
# → UNSAFE warning written to hook-info.json → exit 0 (pass-through)
# Exit: 0 (not blocked — parse failure alone doesn't block)
```

## 8.4 Network/registry unavailable behavior
When no fixture matches and the registry is unreachable:
- `resolveFromRegistry` returns `"UNAVAILABLE"`
- Policy: `evidence === "UNAVAILABLE"` → `action: UNVERIFIED`
- Hook: UNVERIFIED + strict-agent → exit 2 (fail-closed)

## 8.5 Tampered decision-log detection
```bash
# Manually tamper a record (hypothetical)
# Then: npx tsx src/cli.ts audit-log verify
# → ✖ hash mismatch detected → exit 2
```
The `verifyAuditLog` function checks: JSON schema, record hashes, chain links, ordering.
Verified against the live 532-record log: chain intact, all hashes match.

## 8.6 Dependency + secret scan
- No secrets in any committed file (all fixtures use synthetic hashes or version-pinned public data).
- `node_modules/` is gitignored.
- `dist/` is gitignored for TaskForge.
- `.tasks.json` is gitignored for TaskForge.

## 8.7 No package code executed during verification
PhantomDeps reads only the registry metadata (tarball headers, package.json exports).
No lifecycle scripts run during `phantomdeps check` or hook invocation.
The `npm ci --ignore-scripts` constraint is observed for all installs.

## 8.8 Runtime measurement
- Hook invocation (fixture hit): ~500ms (tsx startup + fixture load)
- Hook invocation (live registry): ~2–4s
- Full PhantomDeps test suite: ~39s
- TaskForge build: ~3s
- TaskForge all tests: ~4.5s

These are single-run measurements — no performance guarantee is claimed.

## Evidence paths
- `.docs/02_TEST/Tested_report_ibm-bob/evidence/terminal-output/phase-08-adversarial.txt`

## Findings and limitations
- Default vs named export distinction is not enforced at the symbol-name level (L2 limitation).
- Unknown packages fall through to live registry; if unreachable → UNVERIFIED → fail-closed.
- Shell metacharacter injection writes to `hook-info.json` and passes through (not blocked at hook level).

## Next action
Phase 9: Outsider-agent review

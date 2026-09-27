# Advanced Test Report — IBM Bob Lane

Generated: 2026-09-27

## PhantomDeps test suite (post-integration)

```
npm test → 176/176 PASS, 6 suites
Exit: 0
No regressions.
```

## TaskForge tests

```
node --test dist/tests/**/*.test.js → 26/26 PASS
Exit: 0
```

## Adversarial cases exercised

| Case | Input | Expected | Actual | Exit | Notes |
|---|---|---|---|---|---|
| Non-JSON stdin | `echo "not json"` | pass-through | pass-through | 0 | ✓ |
| Non-install tool | `{"tool":"read_file",...}` | pass-through | pass-through | 0 | ✓ |
| Bare npm install | `npm install` (no args) | pass-through | pass-through | 0 | ✓ |
| Shell metachar | `npm install pkg \| cat` | UNSAFE warn, pass-through | UNSAFE warn + exit 0 | 0 | ✓ |
| URL spec | `npm install https://…` | UNVERIFIED fail-closed | UNVERIFIED | 2 | ✓ |
| Multi-pkg BLOCK | `npm install lodash is-odd` | BLOCK (worst-case) | BLOCK | 2 | ✓ |
| Wrong version (fixture applies) | `npm install is-odd@2.0.0` | BLOCK | BLOCK | 2 | Fixture name-match applies |

## Tampered log detection

The `verifyAuditLog` function enforces:
- JSON schema per record
- SHA-256 record hash matches content
- previousHash chain links
- Chronological ordering

Verified: 532 records, chain intact, exit 0.

## No package code executed

PhantomDeps reads only registry metadata (tarball headers + package.json exports via fixture).
No lifecycle scripts ran during any verification or hook invocation.
`npm ci --ignore-scripts` observed for all installs.

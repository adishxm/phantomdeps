<!-- Status: READY | Phase: 10 | Last-updated commit: PENDING -->
# Phase 10 — Fail-Closed IBM Bob Hook Enforcement

**Primary:** Contributor 3 — validation/security + Bob workflow  
**Backup:** Contributor 2 — core implementation  
**Support:** Contributor 1 — policy decisions; Contributor 4 — real-session evidence

## Objective
Turn the current fixture demonstrator into a safe command-interception boundary. No unknown, malformed, unsupported, option-first, or partially checked install may silently pass in strict-agent mode.

## Steps

| ID | Action | Evidence |
|---|---|---|
| 10.1 | Replace the single regex with a conservative argv tokenizer. Reject ambiguous shell syntax rather than guessing. | Parser unit tests |
| 10.2 | Parse options before and after packages, scoped names, versions, aliases, URLs, VCS, local paths, and quoted forms. | Parser matrix |
| 10.3 | Parse every package in multi-package commands and aggregate decisions fail-closed. | Multi-package tests |
| 10.4 | Define strict policy: fixture hit → evaluate; fixture miss → live check or `UNVERIFIED`; unsupported shape → `UNVERIFIED`; strict `UNVERIFIED` → exit `2`. | Policy contract |
| 10.5 | Ensure every path writes a normal structured decision record, including parser failure and fixture miss. | NDJSON evidence tests |
| 10.6 | Add subprocess tests that invoke `.bob/hooks/PreToolUse.mjs` exactly as Bob does. | `tests/hook-subprocess.test.ts` |
| 10.7 | Capture one real Bob session or label the hook as payload-shape-tested only. | Bob session export or limitation record |

## Required test cases

- Unknown package: never silent allow.
- `npm install --save package`: package parsed.
- `npm install -D package`: package parsed.
- Two packages: both checked.
- URL, `file:`, `git+ssh:`, and `npm:` alias: block/unverified, never silent allow.
- Ambiguous quoting: reject/unverified.
- Registry timeout/malformed response: unverified and strict-blocked.
- No generated-code context: unverified; never substitute fixture claims.
- Evaluation never invokes npm, a shell, or package lifecycle scripts.

## Completion gate

- [ ] All listed subprocess tests pass.
- [ ] No hook path exits `0` without an ALLOW/WARN policy decision and evidence record.
- [ ] Multi-package and option-first commands are covered.
- [ ] Bob settings use the documented hook schema.
- [ ] README accurately describes the tested boundary.

<!-- Status: FINAL | Phase: 07 | Last-updated commit: phase-07 -->
# Judge / Client Q&A — `phantomdeps`

**Version:** v0.1.0-rc.1  
All answers are grounded in repository evidence, test records, or authoritative sources. No claim is made without a citation.

---

## Core product

**Q: Is this just a name checker?**  
No. Name-existence checking would ALLOW `import { isOddBatch } from 'is-odd'` — `is-odd` is a real package. phantomdeps's differentiator is the L2 static claim check: it verifies whether the symbol the AI-generated code imports is actually exported by the resolved package version. Demonstrated in `tests/gate-integration.test.ts` and confirmed in the offline BLOCK demo.

**Q: Does `ALLOW` mean the package is safe?**  
No. It means the required checks passed — the package exists in the registry, the claimed symbols are present in the declared exports, and no L3 risk signals triggered. Malicious packages with matching APIs, packages with no static export declarations, and private-registry packages are outside the current scope. This is documented in the known limitations.

**Q: What verdicts does the gate return?**  
Four: `ALLOW` (checks passed), `WARN` (claim verified, supply-chain risk signals present), `BLOCK` (hard failure — 404, wrong symbol, or wrong ecosystem), `UNVERIFIED` (registry unavailable — never silently converted to ALLOW). Source: `src/engine/policy.ts` and `tests/policy.test.ts`.

---

## Security and bypass

**Q: Can the agent bypass it?**  
Yes — the gate only covers `execute_command` calls that match `npm install/add/i`. Unhooked shells, unsupported spec forms (`file:`, `git+ssh://`, alias forms), and live-mode packages with no static exports map fall through as `UNVERIFIED`. These are documented residual risks, not hidden bypasses. Source: `src/parser.ts` PROTOCOL_RE guard, `src/gate.ts` fallback.

**Q: Did you run any untrusted packages?**  
No. The demo uses read-only fixture snapshots in `fixtures/`. No package code is installed or executed at any point during the demo or during `npm test`. The terminal output explicitly states "No package was installed. No code was executed." This is enforced structurally — the gate inspects the tarball metadata from the registry response, not the tarball contents.

**Q: What happens if the registry is down?**  
The verdict is `UNVERIFIED` (exit code 3), not `ALLOW`. This is a hard invariant in `src/engine/policy.ts` and is covered by `tests/policy.test.ts` ("returns UNVERIFIED when registry UNAVAILABLE").

**Q: Does it handle shell injection?**  
Yes. `src/parser.ts` rejects shell metacharacters (`;`, `|`, `` ` ``, `$`, `(`, `)`, `<`, `>`, `"`, `'`, `{`, `}`, `[`, `]`, `\`) with an `UNSAFE` error, and rejects protocol/alias forms (`npm:`, `file:`, `git+ssh://`, `https://`) with an `UNSUPPORTED` error. Covered by 13 tests in `tests/edge-cases.test.ts`.

---

## IBM Bob integration

**Q: Why IBM Bob?**  
IBM Bob's Plan/Ask/Agent mode workflow makes the full implementation reviewable and traceable. The `PreToolUse` hook (`-c user.name` hook) intercepts `execute_command` tool calls before Bob executes them. Ask mode explains a blocked decision using the `.phantomdeps/decisions.ndjson` evidence file. Agent mode applied the reviewed patch after human approval. The integration is tested (Phase 06, hook verified with `npx tsx .bob/hooks/PreToolUse.mjs`, exit 2 confirmed) — not decorative.

**Q: How does the Bob hook work?**  
The hook is registered in `.bob/settings.json` as a `PreToolUse` handler for `execute_command`. When Bob is about to run `npm install <pkg>`, it passes the tool input as JSON via stdin to `npx tsx .bob/hooks/PreToolUse.mjs`. The hook runs the full gate pipeline on the package spec. Exit code `2` blocks the Bob tool call; exit `0` allows it. Per IBM Bob docs, stdout is ignored — findings go to stderr and to `.phantomdeps/decisions.ndjson`.

---

## Evidence and auditability

**Q: What is the decision log?**  
Every gate run appends a JSON record to `.phantomdeps/decisions.ndjson`. Each record contains: `decisionId` (UUID), `commandDigest` (sha256 of argv), `recordHash` (sha256 of the record), `previousHash` (hash of the preceding entry), `action` (verdict), `findings` (with rule IDs and evidence refs), and `timestamp`. The hash chain makes the log tamper-evident. Source: `src/evidence/writer.ts`.

**Q: What are the measured results?**  
- 103/103 tests passing (6 suites) — `npm test` output, Phase 04/05 evidence records
- `npm audit`: 0 vulnerabilities — Phase 05 step 5.3
- Offline gate avg latency: **1168ms** (5-run measurement, Phase 05 step 5.5)
- Hook: exit 2 on BLOCK, exit 0 on non-npm — verified Phase 06 step 6.5
- AC-01 through AC-09: all PASS — Phase 04 step 4.4

---

## Scope and limits

**Q: What is explicitly out of scope?**  
- Malicious packages whose API matches the AI-generated import exactly
- Private/scoped registries requiring authentication
- Packages with dynamic or CommonJS-only exports (no static export map)
- Post-approval compromise detection (what happens after `ALLOW`)
- Universal shell interception (only `execute_command` in Bob is hooked)

**Q: What is the path to production readiness?**  
- Live mode symbol resolution for CJS/dynamic exports (Phase 05 known limitation R-01)
- Private registry support via `NPM_TOKEN` / `.npmrc`
- AC-10 benchmark (B0 vs B2 hallucination rate measurement)
- CI badge from GitHub Actions (`.github/workflows/ci.yml` exists; Node 20+22 matrix)

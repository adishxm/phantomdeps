<!-- Status: COMPLETE | Phase: 02 | Step: 2.4 -->
# Step 2.4 — Threat Model, Privacy Boundary, Auth/AuthZ Plan, and Secrets Policy

**Phase:** 02  
**Step:** 2.4 — Create threat model, privacy boundary, authentication/authorization plan, and secrets policy  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Research §10 (full security and safety review); `src/parser.ts`; `src/engine/policy.ts`

---

## Security objective

> Stop a narrow set of unverified **dependency claims** before package-manager execution.  
> It is **not** the objective to certify a package as benign. `ALLOW` means "required checks passed" — never "safe package."

---

## Threat model

### Actors and abuse goals

| Actor | Plausible action | Asset at risk | Control |
|---|---|---|---|
| AI coding agent (incorrect) | Generates wrong package/API; triggers install | Source integrity, build time | Parser rejects metacharacters; gate blocks on L2 mismatch |
| Package publisher / attacker | Registers a hallucinated name | Credentials, source, CI secrets | L1 NOT_FOUND → BLOCK; L3 warns on young/script packages |
| Compromised maintainer | Publishes malicious update to real package | Build integrity | **Residual risk** — out of scope for v1; use attestations/lockfile |
| Malicious package README | Injects instructions into L4 judgment | Model behaviour | L4 deferred; when added: README treated as untrusted data |
| Local user / process | Edits decision log, bypasses wrapper | Decision integrity | Hash chain reveals edits; disclosed as local-only trust |
| Registry / network adversary | Serves stale/malformed data | Verdict correctness | TLS required; timeout 8s; `UNAVAILABLE` → `UNVERIFIED` |
| CI pipeline / script | Runs unrestricted `npm install` | Unverified packages enter build | Hook + wrapper provide enforcement; bypass is disclosed |

### Attack paths and mitigations (from research §10.2)

| Boundary | Abuse path | Mitigation | Residual risk |
|---|---|---|---|
| Argv → parser | Shell injection via `; rm -rf /` | `SHELL_META_RE` in `src/parser.ts`; throws `UNSAFE` error | Untested hook paths and direct human `npm` invocations bypass the gate |
| Gate → registry | Timeout / DNS spoof | 8s `AbortSignal.timeout`; TLS; `UNAVAILABLE` on any error | Compromised registry or CA remains possible |
| Registry response → JSON | Malformed / oversized response | JSON parse in try/catch → `UNAVAILABLE`; no arbitrary eval | Parser library vulnerabilities |
| Exports map → L2 verdict | Stale `.d.ts`, generated exports, dynamic CJS | Hard BLOCK only on version-pinned static evidence; otherwise `UNVERIFIED/WARN` | Runtime API may differ from static declaration |
| Decision log → CI | Tampering, deletion | Hash chain: `previousHash` + `recordHash` per record | Local file; no external trust anchor; disclosed |
| Hook → Bob | stdout injected as evidence | `PreToolUse` stdout is ignored (per IBM Bob docs); evidence written to file | Bob version changes could alter this behaviour |

---

## Privacy boundary

| Data type | Where it appears | Privacy treatment |
|---|---|---|
| Package name + version | Terminal card, decision log, registry URL | Low sensitivity — public npm metadata |
| argv / command | `commandDigest` (SHA-256 hash only) | Raw command not stored; digest only |
| File paths from `cwd` | Not stored in v1 | No path leakage in decision record |
| Bob session ID | `bobSessionId` field in GateDecision | `null` in v1; reserved for future hook integration |
| Developer identity | Not captured anywhere | No user ID, email, or hostname stored |
| Fixture data | Shipped in `fixtures/` | All fixture data is synthetic or public npm metadata |

**No personally identifiable information (PII) is captured or stored in v1.**

---

## Authentication and authorization plan

### v1 scope (hackathon MVP)
- **No authentication required.** The tool queries the public npm registry anonymously. No API keys, tokens, or credentials.
- **No authorization model.** Any user running the CLI has equal access to all gate functionality.
- **Override policy:** a bare `--force` or `--allow` flag is not implemented in v1. Any override is deferred to Phase 05+ design.

### Future scope (post-hackathon)
- Private registry auth via `.npmrc` token (standard npm behaviour — not intercepted by v1).
- Role-based override: only a named principal may add a `--reason` override entry.
- Bob session identity linked to `bobSessionId` in the decision record.

---

## Secrets policy

| Rule | Implementation |
|---|---|
| No secrets in source code | All source files inspected in Phase 00 step 0.1 — no secrets found |
| No secrets in fixtures | `fixtures/is-odd-demo.json` contains only public npm metadata |
| No secrets in `.brain/` or `.docs/` | Audit confirms only Markdown documents and JSON |
| No `.env` files committed | `.git/info/exclude` blocks `node_modules/`, `dist/`, `.phantomdeps/`; no `.env` present |
| Registry URL hardcoded (not from env) | `NPM_REGISTRY = "https://registry.npmjs.org"` in `src/adapters/registry.ts` — appropriate for v1 |
| Decision log may contain package names | `.phantomdeps/decisions.ndjson` is excluded from git tracking; disclosed as local-only |

**Secret scan result for Phase 02:** no secrets, credentials, tokens, or private keys found in any committed file.

---

## Step result
`COMPLETE` — threat model with 7 actors, 6 attack paths and mitigations; privacy boundary (no PII); v1 auth/authz plan (none required); secrets policy with confirmed clean scan.

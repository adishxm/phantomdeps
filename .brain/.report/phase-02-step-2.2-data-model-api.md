<!-- Status: COMPLETE | Phase: 02 | Step: 2.2 -->
# Step 2.2 — Data Model, API Contracts, Integrations, and Error Behavior

**Phase:** 02  
**Step:** 2.2 — Define data model, API contracts, integrations, and error behavior  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Research §§9.6, 10.6, 10.8; `src/types.ts`; `src/engine/policy.ts`; `src/evidence/writer.ts`

---

## Data model

All types are in [`src/types.ts`](../src/types.ts). This section documents the canonical contracts.

### `InstallIntent`
```ts
{
  ecosystem: "npm"          // fixed to npm in v1
  name: string              // normalized lowercase package name
  version: string           // exact version string or "latest"
  rawArgv: string[]         // original argv tokens (for commandDigest)
}
```

### `PackageEvidence` (L1 output)
```ts
{
  name: string              // registry-resolved package name
  resolvedVersion: string   // exact version resolved from dist-tags or spec
  ecosystem: "npm"
  registryUrl: string       // full packument URL used
  integrity: string | null  // sha512-... from dist.integrity, or null
  tarballUrl: string | null // dist.tarball URL
  deprecated: boolean
  deprecationMessage: string | null
  hasInstallScript: boolean // true if preinstall/install/postinstall present
  publishedAt: string | null // ISO timestamp
  retrievedAt: string       // ISO timestamp of this fetch
  source: "live" | "fixture"
  fixtureId: string | null
  responseHash: string      // sha256 of raw registry response body
}
```

### `ClaimFinding` (L2 output)
```ts
{
  packageName: string
  resolvedVersion: string
  requestedSymbols: string[]
  symbolResults: SymbolResult[]   // per-symbol: found | missing | ambiguous
  verdict: "SYMBOL_FOUND" | "SYMBOL_MISSING" | "AMBIGUOUS_EXPORTS" | "UNVERIFIED"
  citations: string[]
  source: "fixture" | "live"
}
```

### `RiskSignals` (L3 output)
```ts
{
  crossEcosystemHit: boolean
  youngPackage: boolean
  hasInstallScript: boolean
  noProvenance: boolean
  warnings: string[]        // human-readable warning messages
}
```

### `GateDecision` (final record — written to NDJSON log)
```ts
{
  decisionId: string        // UUID v4
  previousHash: string      // sha256 of previous record (genesis = sha256:0000...)
  recordHash: string        // sha256 of this record (hash-chained)
  timestamp: string         // RFC3339
  origin: "human" | "agent" | "ci" | "fixture"
  commandDigest: string     // sha256 of raw argv string
  ecosystem: "npm"
  packageSpec: string       // "name@version"
  resolvedVersion: string
  integrity: string | null
  registrySource: string    // registry URL or "fixture://id"
  cacheStatus: "hit" | "miss" | "fixture"
  action: "ALLOW" | "WARN" | "BLOCK" | "UNVERIFIED"
  findings: Finding[]
  remediationCandidate: string | null
  bobSessionId: string | null
}
```

### `Finding`
```ts
{
  id: string          // e.g. "l2.symbol_missing", "l1.not_found"
  severity: "block" | "warn" | "info"
  message: string
  evidenceRefs: string[]
}
```

---

## Internal API contracts

### `parseIntent(spec: string): InstallIntent`
- **Input:** raw package spec string from argv
- **Output:** `InstallIntent`
- **Throws:** `Error("UNSAFE: ...")` for shell metacharacters; `Error("UNSUPPORTED: ...")` for non-registry forms
- **Contract:** never returns a spec containing shell operators; never executes anything

### `resolveFromRegistry(name, version): Promise<PackageEvidence | null | "UNAVAILABLE">`
- **null** = HTTP 404, package genuinely not found
- **"UNAVAILABLE"** = network error, timeout, non-404 HTTP error, JSON parse failure
- **PackageEvidence** = successful resolution
- **Contract:** timeout fixed at 8 000 ms via `AbortSignal.timeout`; no retries in v1

### `resolveClaimsFromFixture(fixture, requestedSymbols): ClaimFinding`
- **Input:** loaded fixture + symbol list from `--symbols` flag or `fixture.claimedSymbols`
- **Output:** `ClaimFinding` with per-symbol results
- **Empty symbols → UNVERIFIED** (no claim = no determination)

### `applyPolicy(input: PolicyInput): GateDecision`
- **Hard-block order:** L1 NOT_FOUND → L1 UNAVAILABLE → L1 deprecated (WARN) → L2 SYMBOL_MISSING (BLOCK) → L2 UNVERIFIED (UNVERIFIED) → L3 warnings (WARN)
- **Contract:** first hard-block wins; subsequent findings are appended but do not override the first BLOCK

### `appendDecisionLog(decision, cwd): void`
- Appends one JSON line to `.phantomdeps/decisions.ndjson`; creates directory if absent
- **Contract:** append-only; never overwrites; preserves hash chain integrity

---

## External integrations

| Integration | Protocol | v1 contract |
|---|---|---|
| npm registry | HTTPS GET `/registry.npmjs.org/<name>` | Read-only packument; 8s timeout; TLS required; no auth in v1 |
| Offline fixture | Local JSON file read | `fixtures/<id>.json`; no network; deterministic |
| Bob `PreToolUse` hook | stdin JSON → exit code | Input: `{event, session_id, tool, input}`; exit 0 = allow, exit 2 = block; stdout ignored |
| Decision log | Local filesystem append | `.phantomdeps/decisions.ndjson`; NDJSON; one record per line |

---

## Error behavior

| Condition | L1 result | Policy verdict | Exit code | Finding ID |
|---|---|---|---|---|
| Package 404 | `null` / `NOT_FOUND` | `BLOCK` | 2 | `l1.not_found` |
| Registry timeout / error | `"UNAVAILABLE"` | `UNVERIFIED` | 3 | `l1.unavailable` |
| JSON parse failure | `"UNAVAILABLE"` | `UNVERIFIED` | 3 | `l1.unavailable` |
| Package deprecated | `PackageEvidence` | `WARN` | 1 | `l1.deprecated` |
| Symbol absent (L2) | `SYMBOL_MISSING` | `BLOCK` | 2 | `l2.symbol_missing` |
| Symbol ambiguous (L2) | `UNVERIFIED` | `UNVERIFIED` | 3 | `l2.unverified` |
| No symbols requested | `UNVERIFIED` | `UNVERIFIED` | 3 | `l2.unverified` |
| Shell metacharacter in spec | throws `UNSAFE` | process exits 1 | 1 | (CLI error) |
| Unsupported source form | throws `UNSUPPORTED` | process exits 1 | 1 | (CLI error) |
| Install script present | `RiskSignals.warn` | `WARN` (if ALLOW otherwise) | 1 | `l3.risk_signal` |
| No fixture found (offline mode) | `"UNAVAILABLE"` | `UNVERIFIED` | 3 | `l1.unavailable` |

---

## Step result
`COMPLETE` — full data model, internal API contracts, external integration contracts, and error behavior table defined and verified against `src/types.ts`, `src/engine/policy.ts`, and `src/adapters/registry.ts`.

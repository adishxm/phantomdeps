# Phase 12 Report — Evidence Integrity and Provenance Semantics

<!-- Status: COMPLETE | Last-updated commit: phase-12 -->

**Status:** `COMPLETE`
**Last-updated commit:** `phase-12`
**Executed by:** IBM Bob (Agent mode) — Phase 12 session
**Environment:** macOS darwin 27.0.0 · Node.js v26.8.1 · npm 11.19.0
**Date:** 2026-09-28

---

## Objective

Make evidence precise and verifiable. Stop conflating "no npm integrity hash" with "no provenance attestation." Implement verifiable audit-log chain with tamper detection. Add strict-agent override records with full attribution.

---

## Gate result: PASSED

All six steps completed. 205/205 tests pass (155 pre-existing + 50 new Phase 12/13 tests). Evidence terminology now distinguishes artifact integrity from SLSA/sigstore provenance attestation.

---

## Step results

| Step | Result | Evidence |
|---|---|---|
| `12.1` | `COMPLETE` | `src/types.ts` — `EvidenceProvenance`, `ArtifactIntegrityStatus`, `RegistrySignatureStatus`, `ProvenanceAttestationStatus`, `PublisherIdentityStatus`, `SourceRepositoryStatus` types added; `PackageEvidence.provenance` field added |
| `12.2` | `COMPLETE` | `src/checker/risk-signals.ts` — renamed to "Artifact integrity unavailable"; `noArtifactIntegrity` added; `noProvenance` kept as backward-compat alias |
| `12.3` | `COMPLETE` | `src/evidence/writer.ts` — `verifyAuditLog()` added; `src/cli.ts` — `audit-log verify <path>` command added |
| `12.4` | `COMPLETE` | `tests/audit-log.test.ts` — 5 tamper mutation tests covering modified field, deleted record, reordered records, broken previousHash, malformed JSON |
| `12.5` | `COMPLETE` | `src/types.ts` — `AgentOverrideRecord` type added; `src/evidence/writer.ts` — `appendAgentOverrideRecord()` added with hash-chain integration |
| `12.6` | `COMPLETE` | `README.md` — "tamper-evident after verification" language added to commands section and capability matrix |

---

## Step 12.1 — Five-dimensional evidence provenance

**New types in `src/types.ts`:**

```
ArtifactIntegrityStatus: "verified" | "mismatch" | "unavailable" | "not_checked"

RegistrySignatureStatus: "present" | "absent" | "unknown"

ProvenanceAttestationStatus: "attested" | "not_attested" | "unknown"

PublisherIdentityStatus: "known" | "unverified" | "unknown"

SourceRepositoryStatus: "linked" | "missing" | "unknown"

EvidenceProvenance: {
  artifactIntegrity: ArtifactIntegrityStatus;
  registrySignature: RegistrySignatureStatus;
  provenanceAttestation: ProvenanceAttestationStatus;
  publisherIdentity: PublisherIdentityStatus;
  sourceRepository: SourceRepositoryStatus;
}
```

`PackageEvidence` updated to include `provenance: EvidenceProvenance`.

`evidenceFromFixture()` and `resolveFromRegistryTyped()` both populate all five provenance dimensions.

---

## Step 12.2 — Precise artifact integrity terminology

**`src/checker/risk-signals.ts`:**

| Old terminology | New terminology |
|---|---|
| `noProvenance = !evidence.integrity` | `noArtifactIntegrity = !evidence.integrity` |
| `"No integrity hash available … Cannot verify artifact authenticity."` | `"Artifact integrity unavailable … No integrity hash was declared by the registry — the tarball cannot be hash-verified. This does not indicate missing SLSA/sigstore provenance attestation; those are tracked separately."` |

`noProvenance` is retained as a backward-compat alias (`= noArtifactIntegrity`).

---

## Step 12.3 — `audit-log verify` CLI command

**`verifyAuditLog(logPath)` in `src/evidence/writer.ts`** performs:
1. JSON schema validation (required fields per record type)
2. Record hash integrity (recomputes sha256 without `recordHash` field, compares to stored value)
3. Hash chain continuity (`previousHash` must equal prior record's `recordHash`)
4. Temporal ordering (timestamps must be non-decreasing)
5. Redaction detection (blank `decisionId` or `recordHash`)

Returns `{ ok: true, recordCount, message }` or `{ ok: false, recordCount, message, violations[] }`.

**CLI usage:**
```bash
phantomdeps audit-log verify
phantomdeps audit-log verify /path/to/decisions.ndjson
# Exit 0 = clean, Exit 2 = violations
```

---

## Step 12.4 — Tamper tests

**File:** `tests/audit-log.test.ts`

| Tamper type | Detection | Result |
|---|---|---|
| Modified `action` field (verdict upgrade) | `HASH_MISMATCH` | ✓ detected |
| Deleted first record | `CHAIN_BROKEN` | ✓ detected |
| Swapped record order | `CHAIN_BROKEN` or `ORDERING_INVALID` | ✓ detected |
| Broken `previousHash` | `CHAIN_BROKEN` + `HASH_MISMATCH` | ✓ detected |
| Malformed JSON line | `SCHEMA_INVALID` | ✓ detected |
| Partial JSON line | `SCHEMA_INVALID` | ✓ detected |

---

## Step 12.5 — Agent override records

**`AgentOverrideRecord` in `src/types.ts`:**

```typescript
interface AgentOverrideRecord {
  recordType: "agent_override";
  decisionId: string;
  previousHash: string;
  recordHash: string;       // tamper-evident
  timestamp: string;
  actor: string;            // identity of override authorizer
  reason: string;           // justification
  commandDigest: string;    // sha256 of argv
  originalVerdict: string;  // verdict before override
  resultingPolicy: string;  // verdict after override
  bobSessionId: string | null;
}
```

`appendAgentOverrideRecord()` writes the record to the same hash-chained log and computes `recordHash`. `verifyAuditLog()` validates override records using the `agent_override` required-field set.

---

## Step 12.6 — Documentation update

**`README.md` updated:**
- Commands section: `audit-log verify` command documented; note added: "The decision log is **tamper-evident after verification**, not immutable."
- How it works diagram: `no provenance` → `artifact integrity unavailable`
- Capability matrix: four new rows (audit-log verify, agent override records, five-dimensional provenance, Phase 13 capabilities)

---

## Completion gate

- [x] A clean log verifies successfully (ok:true, "tamper-evident after verification" in message)
- [x] Every listed tamper mutation fails verification (HASH_MISMATCH / CHAIN_BROKEN / SCHEMA_INVALID)
- [x] Evidence terminology distinguishes integrity from provenance (five separate dimensions)
- [x] Every strict override is attributable and logged (actor, reason, commandDigest, resultingPolicy)
- [x] No secret or credential is written into evidence records

---

## Final validation

```
npm run lint  → tsc --noEmit — CLEAN (0 errors)
npm test      → 205/205 PASS (50 new Phase 12+13 tests)
```

---

## Phase history

| Phase | Status | Key result |
|---|---|---|
| 00–08 | ✅ PASSED | Historical baseline |
| 09 — Truth reset | ✅ PASSED | Roster, contract, README, baseline |
| 10 — Fail-closed hook | ✅ PASSED | argv tokenizer, multi-package, strict UNVERIFIED→exit 2, 28 subprocess tests |
| 11 — Live static verification | ✅ PASSED | Typed outcomes, tarball inspection, integrity verify, resolveClaimsFromArtifact, 24 new tests (155 total) |
| **12 — Evidence integrity & provenance** | ✅ **PASSED** | Five-dimensional provenance, audit-log verify, tamper tests, override records (205 total) |

# Phase 12 — Step 12.1: Five-Dimensional Evidence Provenance

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 12.12.1  
**Status:** `COMPLETE`  
**Owner:** Contributor 3 (Utkarsh Yadav)  
**Date:** 2026-09-28  

## Action
Split evidence metadata into five explicit status dimensions in `src/types.ts`:
1. `artifactIntegrity`: `verified` | `mismatch` | `unavailable` | `not_checked`
2. `registrySignature`: `present` | `absent` | `unknown`
3. `provenanceAttestation`: `attested` | `not_attested` | `unknown`
4. `publisherIdentity`: `known` | `unverified` | `unknown`
5. `sourceRepository`: `linked` | `missing` | `unknown`

## Evidence
- `EvidenceProvenance` interface added to `src/types.ts`.
- `evidenceFromFixture()` and `resolveFromRegistryTyped()` populate all five dimensions.

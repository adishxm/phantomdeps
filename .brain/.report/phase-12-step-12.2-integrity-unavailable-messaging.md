# Phase 12 — Step 12.2: Precise Artifact Integrity Messaging

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 12.12.2  
**Status:** `COMPLETE`  
**Owner:** Contributor 3 (Utkarsh Yadav)  
**Date:** 2026-09-28  

## Action
Updated risk signal messages in `src/checker/risk-signals.ts` to distinguish missing registry tarball sha512 hashes from missing SLSA/sigstore provenance attestations.

## Terminology Changes
- Renamed risk signal to `"Artifact integrity unavailable"`.
- Text explicitly notes that missing registry sha512 does not imply missing provenance attestation, as those are tracked separately.
- Retained `noProvenance` as a backward-compatibility alias (`= noArtifactIntegrity`).

## Evidence
- Policy and risk signal tests PASS.

# Phase 11 — Step 11.3: Tarball Download & Integrity Verification

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 11.11.3  
**Status:** `COMPLETE`  
**Owner:** Contributor 3 (Utkarsh Yadav)  
**Date:** 2026-09-27  

## Action
Implemented safe tarball downloading, sha512 integrity verification, and pure-Node POSIX tar extraction in `src/adapters/artifact.ts`.

## Security Controls
- **Size Limit:** Max 50 MB tarball payload (`MAX_TARBALL_BYTES`).
- **Timeout:** 10-second download timeout (`DOWNLOAD_TIMEOUT_MS`).
- **Integrity Check:** Verifies calculated sha512 against registry declaration. Mismatches return `INTEGRITY_MISMATCH`.
- **Extraction Safety:** Pure Node POSIX header parser without external `tar` binary. Path traversal guard rejects any entry outside `package/` or containing `..`.
- Cleanup in `finally` block guarantees zero temporary files left behind.

## Evidence
- `src/adapters/artifact.ts` implemented and tested.

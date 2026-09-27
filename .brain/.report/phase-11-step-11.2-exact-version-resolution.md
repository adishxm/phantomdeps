# Phase 11 — Step 11.2: Exact Version Resolution

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 11.11.2  
**Status:** `COMPLETE`  
**Owner:** Contributor 2 (Narayan Kumar Jha)  
**Date:** 2026-09-27  

## Action
Implemented `resolveFromRegistryTyped()` in `src/adapters/registry.ts` to distinguish between missing packages (`PACKAGE_NOT_FOUND`) and missing specific versions (`VERSION_NOT_FOUND`).

## Improvements
- HTTP 404 -> `PACKAGE_NOT_FOUND`
- Package exists but version absent in packument -> `VERSION_NOT_FOUND`
- HTTP 401/403 -> `PRIVATE_OR_AUTH_REQUIRED`
- Malformed JSON / missing fields -> `MALFORMED_RESPONSE`
- Network timeout -> `REGISTRY_UNAVAILABLE`
- Extracts exact `publishedAt` timestamp from packument `time[version]` map.

## Evidence
- `src/adapters/registry.ts` updated with `resolveFromRegistryTyped`.

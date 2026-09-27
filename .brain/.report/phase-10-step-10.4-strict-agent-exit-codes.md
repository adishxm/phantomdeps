# Phase 10 — Step 10.4: Strict-Agent Exit Code Policy

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 10.10.4  
**Status:** `COMPLETE`  
**Owner:** Contributor 3 (Utkarsh Yadav)  
**Date:** 2026-09-27  

## Action
Enforced strict-agent policy in `.bob/hooks/PreToolUse.mjs` where both `BLOCK` and `UNVERIFIED` verdicts trigger an immediate `process.exit(2)`.

## Behavior
- Prevents silent bypass of unknown packages, unsupported URL/file specs, or registry lookup failures when running under AI agent origin (`origin: "agent"`).
- Unknown package miss -> Live lookup -> If NOT_FOUND: BLOCK (exit 2); if UNAVAILABLE: UNVERIFIED (exit 2).

## Evidence
- `npm install nonexistent-phantomdeps-test-xyz` -> NOT_FOUND -> exit 2.
- `npm install https://example.com/pkg.tgz` -> unsupported spec -> UNVERIFIED -> exit 2.
- All strict-agent policy tests in `tests/hook-subprocess.test.ts` PASS.

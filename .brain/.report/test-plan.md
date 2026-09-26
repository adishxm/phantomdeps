<!-- Status: DRAFT | Last-updated commit: 540b861 -->
# Test Plan

**Status:** `DRAFT`  
**Last-updated commit:** `d63976d`

## Required layers

1. Static: format, lint, types, dependency audit, secret scan.
2. Unit: parser, normalized package specs, verdict rules, safe archive extraction, hash chain.
3. Integration: fake registry, cache states, artifact resolver, SARIF/evidence serializers, fake package manager.
4. End-to-end: clean setup to offline demo, block, patch-only remediation, revalidation.
5. Acceptance: every product criterion in the MVP contract.
6. Security/privacy: command injection, path traversal, zip/tar bombs, prompt injection, redaction, no install.
7. Resilience: timeout, retry, malformed/oversized metadata, stale cache, partial failure.
8. Reproducibility: clean checkout, networking disabled, pinned toolchain.
9. Outsider validation: independent install and critical review.

## Initial baseline

All tests are `NOT_RUN` because no executable product repository was found. Every future test record must include test ID, criterion, exact command, environment, commit, expected/actual result, status, evidence path, reviewer, and timestamp.

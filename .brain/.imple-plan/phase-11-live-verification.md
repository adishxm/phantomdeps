<!-- Status: READY | Phase: 11 | Last-updated commit: PENDING -->
# Phase 11 — Live Exact-Version and Static API Verification

**Primary:** Contributor 2 — core implementation  
**Backup:** Contributor 3 — security/testing  
**Support:** Contributor 1 — capability contract; Contributor 4 — demo scenario

## Objective
Close the main research-to-product gap without executing untrusted package code. Implement a narrow, auditable live artifact path or explicitly keep it out of the security claim.

## Steps

| ID | Action | Evidence |
|---|---|---|
| 11.1 | Introduce typed registry outcomes: `PACKAGE_NOT_FOUND`, `VERSION_NOT_FOUND`, `REGISTRY_UNAVAILABLE`, `MALFORMED_RESPONSE`, `PRIVATE_OR_AUTH_REQUIRED`. | Type and policy tests |
| 11.2 | Resolve exact version and integrity from npm metadata. Never conflate missing version with missing package. | Adapter tests |
| 11.3 | Download the exact tarball into a temporary non-executing directory with size/time limits and integrity verification. | Artifact adapter tests |
| 11.4 | Inspect only supported static forms: package `exports`, declarations, and documented entry metadata. Never import or execute package code. | Static-inspection tests |
| 11.5 | Return `SYMBOL_FOUND`, `SYMBOL_MISSING`, or `UNVERIFIED` with artifact hash and inspection method citations. | Claim evidence tests |
| 11.6 | Test network timeout, bad integrity, archive traversal, malformed package metadata, conditional exports, and unsupported module shapes. | Security regression suite |
| 11.7 | Add a live fixture capture command that records metadata and artifact hashes without committing arbitrary package contents. | Reproducible capture documentation |

## Completion gate

- [ ] `check lodash@4.17.21 --symbols merge` no longer passes `null` as its export evidence.
- [ ] Missing exact version produces `VERSION_NOT_FOUND`, not package 404.
- [ ] No package lifecycle script or module code executes during inspection.
- [ ] Integrity mismatch blocks or returns strict `UNVERIFIED`.
- [ ] README distinguishes live supported artifact forms from unsupported forms.
- [ ] If implementation is deferred, Phase 09 must narrow the public claim and this phase remains `DEFERRED`, not `PASSED`.

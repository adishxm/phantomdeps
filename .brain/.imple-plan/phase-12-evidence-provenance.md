<!-- Status: READY | Phase: 12 | Last-updated commit: PENDING -->
# Phase 12 — Evidence Integrity and Provenance Semantics

**Primary:** Contributor 3 — security/evidence  
**Backup:** Contributor 2 — implementation  
**Support:** Contributor 1 — policy language; Contributor 4 — judge-facing explanation

## Objective
Make evidence precise and verifiable. Do not call a missing npm integrity hash “no provenance,” and do not call a local hash chain immutable.

## Steps

| ID | Action | Evidence |
|---|---|---|
| 12.1 | Split evidence fields into artifact integrity, registry signature status, provenance attestation, publisher identity, and source repository status. | Updated types and fixtures |
| 12.2 | Rename messages to “artifact integrity unavailable” where appropriate. | Policy/message tests |
| 12.3 | Add `audit-log verify <path>` to validate JSON schema, record hashes, previous-hash links, ordering, and redaction. | CLI tests |
| 12.4 | Add tamper tests: modified message, deleted record, reordered record, broken previous hash, malformed JSON. | `tests/audit-log.test.ts` |
| 12.5 | Add strict-agent override records with actor, reason, timestamp, command digest, and resulting policy. | Override tests |
| 12.6 | Update README and evidence docs to say “tamper-evident after verification,” not immutable. | Documentation review |

## Completion gate

- [ ] A clean log verifies successfully.
- [ ] Every listed tamper mutation fails verification.
- [ ] Evidence terminology distinguishes integrity from provenance.
- [ ] Every strict override is attributable and logged.
- [ ] No secret or credential is written into evidence records.

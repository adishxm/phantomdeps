<!-- Status: READY | Phase: 14 | Last-updated commit: PENDING -->
# Phase 14 — Independent Release, Team, and Submission Gate

**Primary:** Contributor 4 — demo/PPT/submission  
**Backup:** Contributor 3 — release/security  
**Support:** Contributor 1 — final claims; Contributor 2 — clean-checkout verification

## Objective
Prove the corrected product from a clean checkout and prepare truthful hackathon materials. This phase cannot be marked passed by the implementer alone.

## Steps

| ID | Action | Evidence |
|---|---|---|
| 14.1 | Run clean-checkout validation with lifecycle scripts disabled, networking disabled for fixture demo, and no package installation beyond project dependencies. | Reproducible test log |
| 14.2 | Run full build, lint, unit, integration, hook subprocess, audit-log, security, and CLI-width suites. | Release evidence index |
| 14.3 | Run secret scan, dependency audit, Git status, tag/HEAD parity, and README claim scan. | Release checklist |
| 14.4 | Conduct an independent review by a contributor who did not implement the changed phase. | Signed review record |
| 14.5 | Capture a real Bob session if available; otherwise label the hook as documented-payload tested only. | Session export or limitation |
| 14.6 | Add the unique fourth contributor and PPT owner, or formally reset submission materials to a three-person team. | Roster and package metadata |
| 14.7 | Produce PPT/PDF, demo video, cover image, screenshots, Bob report export, and final judge Q&A using only verified claims. | Submission asset inventory |
| 14.8 | Create final tag only after all gates pass; do not submit any official form automatically. | Tag + human stop gate |

## Final release gate

- [ ] Unknown and unsupported install paths cannot silently pass.
- [ ] Every package in a multi-package command is checked.
- [ ] Live capability is implemented or clearly labelled `UNVERIFIED`.
- [ ] README, code, tests, and reports agree at the same commit.
- [ ] Clean checkout passes all required commands.
- [ ] Four-person roster is truthful and unique, or all materials say three-person team.
- [ ] Slides, video, screenshots, and exported Bob evidence are complete.
- [ ] Human reviews the exact submission payload before submission.

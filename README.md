<!-- Status: DRAFT | Last-updated commit: 8d9ba18 -->
# `phantomdeps` Roadmap Repository

**Status:** `DRAFT`  
**Last-updated commit:** `PENDING`

This repository is the planning and evidence scaffold for an IBM Bob 2.0 hackathon MVP. It was generated after auditing an empty active sandbox: no product code repository was available. The supplied research is preserved under `.docs/01_RESEARCH/`.

## Four-contributor setup

| Contributor | Ownership |
|---|---|
| Contributor 1 | Product, architecture, scope, and Git coordination |
| Contributor 2 | Core CLI, fixture harness, static claim checks, and tests |
| Contributor 3 | Validation, security, IBM Bob workflow/evidence, and backup for Contributors 1–2 |
| Contributor 4 | PPT/slides, demo, pitch, screenshots, submission checklist, and demo fixture/data contribution |

All four contribute to implementation/review. Replace placeholders with real names in `.brain/.report/team-allocation.md` before creating the product repository.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [team allocation](.brain/.report/team-allocation.md) for branches, handoffs, backup activation, and phase ownership.

## Clean-checkout demo reproduction (future implementation)

Once implementation exists, the intended reproducibility contract is:

```bash
git clone <public-repository-url>
cd phantomdeps
corepack enable
pnpm install --frozen-lockfile
PHANTOMDEPS_OFFLINE=1 pnpm phantomdeps demo --fixture --offline
pnpm test
```

The command must work with networking disabled, must not install the suspect or replacement package, and must print fixture IDs, hashes, verdict, citations, and decision ID. Until those files and commands exist, this section is a planned contract, not a test result.

## Navigation

- `.brain/.imple-plan/antigravity-roadmap.md` — synchronized Antigravity lane
- `.brain/.imple-plan/ibm-bob-roadmap.md` — synchronized IBM Bob lane
- `.brain/.imple-plan/phase-XX-implementation.md` — phase plans
- `.brain/.report/` — gates, evidence, decisions, risks, team matrix, and submission checklist
- `.docs/10_DEMO/` — demo script, demo data, pitch, and Q&A

## Evidence discipline

`CONFIRMED`, `TEAM DESIGN`, `ASSUMPTION`, `UNKNOWN`, and `BLOCKED` are kept distinct. No implementation, test, metric, Bob session, outsider review, or submission completion is claimed without an artifact.

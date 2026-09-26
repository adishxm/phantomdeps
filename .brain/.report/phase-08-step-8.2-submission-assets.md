<!-- Status: COMPLETE | Phase: 08 | Step: 8.2 | Last-updated commit: phase-08 -->
# Phase 08 Step 8.2 — Submission Asset Inventory

**Phase:** 08  
**Step:** 8.2  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — Phase 08 session  
**Environment:** macOS darwin 27.0.0, Node.js v26.8.1, npm 11.19.0  
**Date:** 2026-09-27

---

## Repository

| Field | Value | Status |
|---|---|---|
| Repository URL | https://github.com/adishxm/phantomdeps | ✅ PUBLIC — verified via git remote |
| Default branch | `main` | ✅ |
| RC tag | `v0.1.0-rc.1` — commit `7ccd70862516679285ea44a6dfade618ef72ccbb` | ✅ Pushed |
| Latest commit on main | `8c9bc88` — `phase-07: finalization PASSED` | ✅ |
| License | MIT — `LICENSE` file present in root | ✅ |
| `node_modules/` excluded from tracking | Confirmed via `git ls-files` — no `node_modules/` entry | ✅ |
| CI badge | GitHub Actions `.github/workflows/ci.yml` (Node 20+22 matrix) | ✅ |

---

## Demo / Application URL

| Field | Value | Status |
|---|---|---|
| Primary demo path | Offline fixture replay — `git clone https://github.com/adishxm/phantomdeps && npm install && npx tsx src/cli.ts demo --fixture --offline` | ✅ Reproducible |
| Hosted URL | **NOT yet provisioned** — team must decide: GitHub Pages, Replit, or fixture-replay service | ⚠️ NEEDS HUMAN DECISION |
| Fallback | GitHub repository itself as the "application URL" if the event permits offline-only demos | ⚠️ Verify with live form |

> **Note:** The research report (§7.2, [19]) confirmed the general guide asks for an application URL. An offline-first tool may satisfy this with a repository link or a static replay page. A human must confirm the acceptable format on the live form before submission.

---

## Video

| Field | Value | Status |
|---|---|---|
| Required length | ≤ 5 minutes (official maximum); 2–4 min is team strategy | ✅ Requirement known |
| Script source | `.docs/10_DEMO/demo-script.md` (FINAL, Phase 07) | ✅ |
| Rehearsal | 7/7 checks PASS in ~11.5s (Phase 07 step 7.5) | ✅ |
| Recorded video file | **NOT YET RECORDED** — must be produced by team | ⚠️ NEEDS HUMAN ACTION |
| Captions | Required for accessibility — must be added to recording | ⚠️ NEEDS HUMAN ACTION |
| Secrets in demo | None — all scenarios use `--fixture --offline` | ✅ |

---

## Slides / PDF

| Field | Value | Status |
|---|---|---|
| Outline source | `.docs/10_DEMO/ppt-outline.md` | ✅ DRAFT exists |
| PPT/PDF file | **NOT YET PRODUCED** — owner: Contributor 4 | ⚠️ NEEDS HUMAN ACTION |
| Claim grounding | Every slide claim must cite a repository artifact or test result | ⚠️ Required before export |
| Reviewer | Contributor 3 — independent evidence/security review required | ⚠️ Required before export |

---

## Screenshots / Cover Image

| Field | Value | Status |
|---|---|---|
| Required | Yes — lablab.ai event page [17] | ✅ Requirement known |
| Sources | Demo terminal output (BLOCK/ALLOW/WARN), hook test output, `.bob/settings.json` | ✅ Can be captured |
| Cover image file | **NOT YET PRODUCED** — must be captured from demo | ⚠️ NEEDS HUMAN ACTION |
| Secrets visible | No — fixture mode uses no credentials | ✅ |

---

## Pitch / Description / Tags

| Field | Value | Status |
|---|---|---|
| Core pitch | `phantomdeps` makes an agent prove its dependency claim before installation. | ✅ From `.docs/10_DEMO/pitch.md` |
| Technical pitch | Deterministic-first pre-install claim gate: verifies ecosystem, exact artifact, and statically provable API. Returns ALLOW/WARN/BLOCK/UNVERIFIED with cited evidence, without ever installing the suspect package. | ✅ Research §1 |
| Key metric | 103/103 tests passing; avg 1168ms offline; 0 vulnerabilities | ✅ Measured |
| Suggested tags | `ibm-bob`, `npm`, `dependency-security`, `ai-agents`, `static-analysis`, `pre-install`, `hallucination`, `supply-chain` | ✅ Draft |
| Description draft | See pitch section below | ✅ |

### Description draft (for portal field)

> **`phantomdeps` — Pre-install AI dependency claim gate for IBM Bob**
>
> AI coding agents hallucinate package names and symbols. A USENIX Security 2025 study found a 19.7% package-level hallucination rate across 2.23 million recommendations. The harder case isn't a fake package — it's a real package that simply doesn't export the symbol the agent's generated code imports.
>
> `phantomdeps` intercepts `npm install` before it runs, verifies the exact package artifact and statically provable API against what IBM Bob's generated code actually imports, and returns a `BLOCK / WARN / ALLOW / UNVERIFIED` verdict with cited evidence — without ever installing or executing the suspect package.
>
> **Built with IBM Bob:** Plan mode for architecture, Agent mode for implementation, Ask mode for explaining blocked decisions. The `PreToolUse` hook intercepts every `npm install` Bob attempts — blocking on exit code 2 before the command executes.
>
> **Measured:** 103/103 tests passing · avg 1168ms offline · 0 known vulnerabilities · hook verified (exit 2 on BLOCK)

---

## Team details

| Contributor | Role | GitHub / Contact |
|---|---|---|
| Aditya Kumar Sharma | Product + architecture lead; primary maintainer | https://github.com/adishxm |
| Narayan Kumar Jha | Implementation + test engineer | narayan.nkj@gmail.com |
| Utkarsh Yadav | Validation + IBM Bob workflow lead | https://github.com/utkarsh-2207 |

> Source: `package.json` contributors field + `git log` (commit `3fa529c` adds Utkarsh Yadav).

---

## Bob-assisted files and session screenshots

| Item | Location | Status |
|---|---|---|
| Phase implementation plans (Bob Plan mode) | `.brain/.imple-plan/phase-00-implementation.md` through `phase-08-implementation.md` | ✅ Present |
| Phase reports (Bob Agent mode) | `.brain/.report/phase-00-report.md` through `phase-08-report.md` | ✅ Present |
| Architecture / design docs | `.brain/.report/phase-02-*.md` | ✅ Present |
| Decision log | `.brain/.report/decision-log.md` | ✅ Present |
| Demo script / judge Q&A (Bob Agent mode) | `.docs/10_DEMO/demo-script.md`, `.docs/10_DEMO/judge-qa.md` | ✅ Present |
| Bob task-session screenshots | **NOT YET CAPTURED** — team must export Bob session screenshots | ⚠️ NEEDS HUMAN ACTION |
| Exported Bob report | **NOT YET EXPORTED** — team must export from Bob interface | ⚠️ NEEDS HUMAN ACTION |

---

## Technology disclosure

| Technology | Role | Version |
|---|---|---|
| IBM Bob | Plan / Agent / Ask mode — full build workflow; `PreToolUse` hook integration | v2.0 (hackathon build) |
| TypeScript | Source language | ~5.5.2 |
| Node.js | Runtime | v26.8.1 (local); v24 (CI; v20+22 matrix in CI) |
| npm | Package manager | 11.19.0 |
| Jest + ts-jest | Test framework | ^29.7.0 / ^29.1.5 |
| tsx | TypeScript executor (hook + CLI dev) | ^4.15.7 |
| chalk | Terminal output formatting | ^5.3.0 |
| node-fetch | npm registry HTTP adapter | ^3.3.2 |
| GitHub Actions | CI matrix (Node 20 + 22) | — |
| lablab.ai | Hackathon platform | IBM Bob 2.0 Hackathon |

No external AI services, APIs, or paid tools are used at runtime. The gate is deterministic. Fixture mode requires no network.

---

## Step result

`COMPLETE` — all submission asset fields inventoried. Assets that require human production are clearly marked `⚠️ NEEDS HUMAN ACTION`. No asset is fabricated or claimed before production.

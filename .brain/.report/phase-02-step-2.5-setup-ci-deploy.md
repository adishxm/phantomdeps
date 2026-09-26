<!-- Status: COMPLETE | Phase: 02 | Step: 2.5 -->
# Step 2.5 — Local Setup, CI, Deployment, Observability, and Rollback

**Phase:** 02  
**Step:** 2.5 — Define local setup, CI, deployment, backup/recovery, observability, and rollback approach  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** `package.json`; `tsconfig.json`; `package-lock.json`; verified terminal output

---

## Local setup

### Prerequisites
- **Node.js** ≥ 18 (tested on v24.11.0 / Windows 10)
- **npm** ≥ 9 (for lockfile v3 support)
- No other global tools required for the demo path

### Clean-checkout steps
```bash
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps
npm install          # installs from package-lock.json — deterministic
npm test             # 23/23 tests must pass before any further work
npx tsx src/cli.ts demo --fixture --offline   # BLOCK verdict, no network
```

### Verified on
- Windows 10 / PowerShell / Node.js v24.11.0 / npm 11.x — `CONFIRMED` this session
- Other platforms: `ASSUMPTION` — TypeScript + Node.js are cross-platform; no OS-specific code used

### Key `package.json` scripts
| Script | Command | Purpose |
|---|---|---|
| `npm test` | `node --experimental-vm-modules node_modules/jest/bin/jest.js --forceExit` | Run all 23 unit tests |
| `npm run build` | `tsc` | Compile TypeScript to `dist/` |
| `npm run lint` | `tsc --noEmit` | Type-check without emitting |
| `npm run dev` | `npx tsx src/cli.ts` | Run CLI directly via tsx (no build step) |

---

## CI plan

### Current state
No CI pipeline exists yet. Phase 02 defines the contract; Phase 03/04 will implement it.

### Planned GitHub Actions workflow (`.github/workflows/ci.yml`)
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npx tsx src/cli.ts demo --fixture --offline
```

**Contract:** CI must pass `npm test` (23/23) AND `demo --fixture --offline` (BLOCK, exit 0) on every push to `main`. Any failure blocks merge.

**Status:** `DESIGNED — not yet implemented` (Phase 03 Step 3.1 will create this file)

---

## Deployment

`phantomdeps` is a CLI tool — there is no server to deploy.

| Distribution method | Status | Notes |
|---|---|---|
| `git clone` + `npm install` + `npx tsx` | ✅ Working now | Primary demo method |
| `npm link` (local global install) | `DESIGNED` — Phase 03 | Enables `phantomdeps check ...` directly |
| `npx phantomdeps` (npm publish) | `DEFERRED` — post-hackathon | Requires npm account and publish step |
| Bob hook registration | ✅ `.bob/hooks/PreToolUse.mjs` present | Hook runtime test deferred to Phase 03 Step 3.5 |

---

## Observability

| Signal | Where | Format |
|---|---|---|
| Gate verdict | stdout terminal card | Human-readable, colour-coded |
| Exit code | process exit | `0/1/2/3` — CI-readable |
| Decision record | `.phantomdeps/decisions.ndjson` | NDJSON; hash-chained; one line per decision |
| Evidence JSON | `.phantomdeps/evidence-<uuid>.json` (on explicit call) | Machine-readable full decision |
| Test results | `npm test` stdout | Jest summary with pass/fail counts |
| Hook stderr | stderr on Bob `PreToolUse` | `[phantomdeps] BLOCK — ...` visible in Bob UI |

**No metrics, telemetry, or external logging in v1** — all signals are local.

---

## Rollback approach

| Scenario | Rollback |
|---|---|
| Bad commit breaks tests | `git revert <commit>` on `main`; re-run `npm test` to confirm |
| Fixture data corrupted | Restore `fixtures/is-odd-demo.json` from git history; re-run demo |
| Decision log corrupted | Delete `.phantomdeps/decisions.ndjson`; hash chain resets to genesis; disclosed |
| Dependency vulnerability | `npm audit fix` on `devDependencies`; re-run `npm test` |
| Hook causes Bob to crash | Remove hook entry from `.bob/settings.json`; wrapper fallback remains available |

**Recovery contract:** a rollback is complete when `npm test` passes 23/23 AND `demo --fixture --offline` produces BLOCK.

---

## Phase 03 pre-requisites (from this step)

| Item | Owner | Phase/Step |
|---|---|---|
| Create `.github/workflows/ci.yml` | Contributor 2 | Phase 03 Step 3.1 |
| Test `npm link` for global install | Contributor 2 | Phase 03 Step 3.1 |
| Run Bob hook runtime test | Contributor 3 | Phase 03 Step 3.5 |
| Confirm cross-platform (Linux/macOS) | Contributor 2 | Phase 04 Step 4.6 |

---

## Step result
`COMPLETE` — local setup verified; CI contract defined (not yet implemented); deployment options documented; observability signals enumerated (all local); rollback approach defined with recovery contract.

<!-- Status: COMPLETE | Phase: 02 | Step: 2.3 -->
# Step 2.3 — UX Flows, Terminal Screens, Accessibility, and Demo Path

**Phase:** 02  
**Step:** 2.3 — Define UX flows, screens, accessibility requirements, and demo path  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Research §8 (user journeys); `.docs/10_DEMO/demo-script.md`; `src/evidence/writer.ts`; verified terminal output

---

## UX principle

`phantomdeps` is a CLI tool. The "UI" is the terminal. Every output must be:
1. **Readable in a terminal with no colour** (for CI/redirected output)
2. **Colour-enhanced when connected to a TTY** (ANSI codes)
3. **Machine-readable in parallel** (JSON/NDJSON decision log)
4. **Scannable in under 3 seconds** by a developer reviewing the gate output

---

## Terminal screen designs

### Screen 1 — BLOCK (core demo path)

```
────────────────────────────────────────────────────────────
phantomdeps gate — BLOCK
────────────────────────────────────────────────────────────
  Package  : is-odd@3.0.1 → 3.0.1
  Ecosystem: npm
  Source   : fixture (fixture://is-odd-demo)
  Integrity: sha512-sSqAd7...
  Time     : 2026-09-26T13:34:42.640Z
  Decision : f19b0b40-fe5b-4d05-be96-5e1ad70f7a8e
  Origin   : fixture

Findings:
  ✖ [l2.symbol_missing]
    BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports
    of is-odd@3.0.1. The AI-generated import claims a symbol that this
    package does not export.
    Evidence: Source: fixture 'is-odd-demo' (2025-09-20) | Exported symbols: 2

  Record hash : sha256:f3588ad...
  Prev hash   : sha256:00000000...
────────────────────────────────────────────────────────────
```

**Colour:** header + verdict = red (`\x1b[31m`); ✖ icon = red; dim for hashes.

### Screen 2 — ALLOW

```
────────────────────────────────────────────────────────────
phantomdeps gate — ALLOW
────────────────────────────────────────────────────────────
  Package  : lodash@4.17.21 → 4.17.21
  Ecosystem: npm
  Source   : live (https://registry.npmjs.org/lodash)
  Integrity: sha512-v2kDE...
  Time     : 2026-09-26T14:00:00.000Z
  Decision : <uuid>
  Origin   : human

  Record hash : sha256:...
  Prev hash   : sha256:...
────────────────────────────────────────────────────────────
```

**Colour:** header + verdict = green (`\x1b[32m`); no findings section (none to show).

### Screen 3 — WARN

```
────────────────────────────────────────────────────────────
phantomdeps gate — WARN
────────────────────────────────────────────────────────────
  Package  : new-pkg@0.0.1 → 0.0.1
  ...

Findings:
  ⚠ [l3.risk_signal]
    WARN: Package 'new-pkg@0.0.1' was published less than 30 days ago.
  ⚠ [l3.risk_signal]
    WARN: Package 'new-pkg@0.0.1' has lifecycle install scripts.
  ...
────────────────────────────────────────────────────────────
```

**Colour:** header + verdict = yellow (`\x1b[33m`); ⚠ icon = yellow.

### Screen 4 — UNVERIFIED

```
────────────────────────────────────────────────────────────
phantomdeps gate — UNVERIFIED
────────────────────────────────────────────────────────────
  Package  : some-pkg@latest → unknown
  ...

Findings:
  ⚠ [l1.unavailable]
    UNVERIFIED: npm registry is unavailable or returned an error.
    Cannot verify 'some-pkg'. Do not proceed as ALLOW.
  ...
────────────────────────────────────────────────────────────
```

**Colour:** header + verdict = magenta (`\x1b[35m`).

### Screen 5 — Demo scenario header (offline only)

```
phantomdeps — pre-install AI dependency claim gate
Offline fixture demo — no network calls, no package installation

[SCENARIO]
  IBM Bob generated code that imports a function from an npm package.
  Bob is about to run: npm install is-odd
  The generated code uses: import { isOddBatch } from 'is-odd'
  phantomdeps intercepts the install command and checks the claim...

[FIXTURE] Loaded: is-odd-demo — captured 2025-09-20T00:00:00.000Z
```

### Screen 6 — Remediation block (after BLOCK in demo)

```
[REMEDIATION]
  The symbol 'isOddBatch' does not exist in is-odd@3.0.1.
  The correct exported function is: isOdd(n)
  Suggested patch (requires human approval before application):
    - import { isOddBatch } from 'is-odd'
    + import isOdd from 'is-odd'

  No package was installed. No code was executed.
  Decision record appended to .phantomdeps/decisions.ndjson

✔ Demo completed. Verdict: BLOCK (expected: BLOCK)
```

### Screen 7 — `--help`

```
phantomdeps v0.1.0 — pre-install AI dependency claim gate

USAGE
  phantomdeps demo [--fixture] [--offline]
  phantomdeps check <name>[@version] [--symbols <sym1,sym2>] [--offline]
  phantomdeps install <name>[@version] [options]

EXIT CODES
  0  ALLOW      1  WARN      2  BLOCK      3  UNVERIFIED
```

---

## UX flows

### Flow A — IBM Bob `PreToolUse` (automatic interception)
```
Bob runs execute_command "npm install is-odd"
  → PreToolUse.mjs reads stdin JSON
  → parseIntent("is-odd") succeeds
  → fixture loaded → verdict BLOCK
  → stderr: "[phantomdeps] BLOCK — ..."
  → exit 2 → Bob blocks the tool call
  → decision appended to .phantomdeps/decisions.ndjson
  → developer sees Bob UI: "Tool blocked by PreToolUse hook"
```

### Flow B — Manual wrapper
```
Developer runs: phantomdeps install is-odd --symbols isOddBatch
  → parser validates spec
  → gate runs (offline or live)
  → terminal card printed
  → exit code returned (2 for BLOCK)
  → developer reads card, decides next action
```

### Flow C — Demo (judges / CI)
```
npx tsx src/cli.ts demo --fixture --offline
  → scenario header printed
  → fixture loaded
  → gate runs
  → BLOCK card printed
  → remediation suggestion printed
  → exit 0 (expected BLOCK matched)
```

---

## Accessibility requirements

| Requirement | Implementation |
|---|---|
| Colour-blind safe | All verdicts also shown as text labels (`BLOCK`, `WARN`, `ALLOW`, `UNVERIFIED`) and icon characters (`✖`, `⚠`, `ℹ`); never colour-only |
| CI/piped output | ANSI codes present regardless — no TTY detection in v1 (acceptable for hackathon scope; Phase 05 can add `NO_COLOR` support) |
| Screen reader / plain text | Every field has a label (`Package :`, `Ecosystem:`, etc.); structured for line-by-line reading |
| Exit code as machine signal | Exit codes documented and consistent — CI scripts use these, not text parsing |

---

## Demo path (90 seconds)

| Segment | Duration | Action | Screen |
|---|---|---|---|
| Problem setup | 0:00–0:15 | Show Bob-generated code with `isOddBatch`; explain name-only checks miss this | Background context only |
| Gate intercept | 0:15–0:20 | Run `demo --fixture --offline`; show fixture load line | Screen 5 |
| BLOCK card | 0:20–0:45 | Read the card live: package, integrity, finding `l2.symbol_missing`, citation, hashes | Screen 1 |
| Remediation | 0:45–1:05 | Show the patch suggestion; emphasise "human approval required", "no install" | Screen 6 |
| Honest limit | 1:05–1:20 | State what it does not cover (malicious with matching API, private registries) | Verbal only |
| Wrap | 1:20–1:30 | `✔ Demo completed. Verdict: BLOCK` | Screen 6 tail |

---

## Step result
`COMPLETE` — 7 terminal screen designs defined (matching real `src/evidence/writer.ts` output); 3 UX flows documented; 4 accessibility requirements specified; 90-second demo path mapped to screens.

<!-- Status: FINAL | Phase: 07 | Last-updated commit: phase-07 -->
# `phantomdeps` — Timed Demo Script

**Version:** v0.1.0-rc.1 (commit `7a493ac`)  
**Target time:** 90 seconds  
**Environment required:** Node.js ≥18, npm, repo cloned, `npm install` done  
**All commands use offline fixtures — no network required**

---

## Pre-demo setup (before the clock starts)

```bash
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps
npm install
# Clear any previous decision log
rm -rf .phantomdeps
```

Confirm clean state:
```bash
npm test   # must show: Tests: 103 passed, 103 total
```

---

## 0:00–0:12 — The Problem

**Say:**
> "AI coding agents like IBM Bob hallucinate package names AND symbols. A 2025 USENIX study found a 19.7% hallucination rate. The harder case isn't a fake package — it's a real package whose exported API simply doesn't match what the AI-generated code imports."

**Show (terminal):**
```
# This is what IBM Bob generated:
import { isOddBatch } from 'is-odd'

# Bob is about to run:
npm install is-odd
```

**Say:**
> "`is-odd` is a real npm package. A name-only check would allow this. But `isOddBatch` doesn't exist."

---

## 0:12–0:35 — The Gate (BLOCK demo)

**Run:**
```bash
npx tsx src/cli.ts demo --fixture --offline --scenario block
```

**Point to output:**
- `[SCENARIO]` — Bob about to run `npm install is-odd`, code uses `isOddBatch`
- `phantomdeps gate — BLOCK` — verdict before any install
- `[l2.symbol_missing]` — exact rule ID, not a vague warning
- `Source: fixture 'is-odd-demo' (2025-09-20)` — cited, pinned evidence
- `No package was installed. No code was executed.`

**Say:**
> "phantomdeps blocked the install before npm ran. The package was never downloaded. No code executed."

---

## 0:35–0:52 — The Evidence Card

**Point to the terminal card and say:**
> "Every block is grounded in evidence: the exact package version, integrity hash, which symbol is missing, where the claim came from, and a decision ID for the audit log."

**Show the NDJSON log:**
```bash
cat .phantomdeps/decisions.ndjson
```

**Point to:**
- `decisionId` — stable UUID per decision
- `recordHash` / `previousHash` — hash-chained, tamper-evident log
- `commandDigest` — sha256 of the original argv

**Say:**
> "The decision log is hash-chained — each entry references the previous record hash. This is the audit trail."

---

## 0:52–1:10 — The Remediation + ALLOW path

**Say:**
> "phantomdeps doesn't just block — it tells you what to do."

**Point to the REMEDIATION section:**
```
The correct exported function is: isOdd()
Suggested patch (requires human approval before application):
  - import { isOddBatch } from 'is-odd'
  + import isOdd from 'is-odd'
```

**Run the ALLOW scenario:**
```bash
npx tsx src/cli.ts demo --fixture --offline --scenario allow
```

**Say:**
> "After the correct symbol `merge` from lodash — ALLOW. Exit code 0. The install can proceed."

---

## 1:10–1:22 — The IBM Bob Hook

**Say:**
> "This runs automatically inside IBM Bob. The `PreToolUse` hook intercepts every `execute_command` that matches `npm install` — before Bob executes it."

**Show `.bob/settings.json`:**
```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "execute_command", "command": "npx tsx .bob/hooks/PreToolUse.mjs" }]
  }
}
```

**Simulate the hook:**
```bash
echo '{"event":"PreToolUse","tool":"execute_command","input":{"command":"npm install is-odd"}}' \
  | npx tsx .bob/hooks/PreToolUse.mjs
# stderr: [phantomdeps] BLOCK — Symbol(s) [isOddBatch] are NOT present...
# exit 2 → Bob blocks the tool
```

---

## 1:22–1:30 — Impact + Limits

**Say:**
> "phantomdeps catches the gap between package existence and API compatibility — without ever installing or executing the suspect package. Measured: 103 tests, avg 1168ms offline."

**State known limits honestly:**
> "Scope: npm registry-name specs, fixture-backed offline mode, and packages with static export declarations. Out of scope: malicious packages with matching APIs, private registries, and dynamic/CJS exports."

---

## Demo safety checklist

- [x] All commands use `--fixture --offline` — no network calls
- [x] No package is installed or executed at any point
- [x] Fixture labels and capture dates are visible in output
- [x] No secrets in demo output
- [x] Exit codes verified: BLOCK=2 (`check`), ALLOW=0, WARN=0 (demo runner)
- [x] Hook verified functional (Phase 06)

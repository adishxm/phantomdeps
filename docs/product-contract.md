# phantomdeps v1 Product Contract

<!-- Status: FROZEN | Phase: 09 | Last-updated commit: phase-09 -->

**Version:** v1 (Phase 09 freeze)  
**Status:** `FROZEN` — no modifications without a recorded Phase 09+ decision  
**Owner:** Aditya Kumar Sharma (Contributor 1)  
**Approved:** Phase 09 — Truth Reset, Contract Freeze, and Baseline  

---

## Purpose

This document records what `phantomdeps` v1 does and does not do, as of Phase 09. It is the authoritative reference for README claims, acceptance criteria, capability labels, and Phase 10–14 remediation scope.

---

## V1 behavior (what the code does at HEAD)

| # | Statement | Label |
|---|---|---|
| C-01 | `phantomdeps` is a **verification-only** tool. It never installs, executes, or modifies any package. | `IMPLEMENTED` |
| C-02 | The `install` and `add` commands are **aliases for `check`**. They do not run `npm install`. | `IMPLEMENTED` |
| C-03 | **Fixture mode** (`--fixture --offline`) uses version-pinned JSON snapshots. No network calls are made. It is deterministic demo evidence, not live agent claim context. | `IMPLEMENTED` |
| C-04 | **Live metadata mode** resolves exact version and integrity from the npm registry. When the registry is unavailable or the response cannot be parsed, it returns `UNVERIFIED`. It never silently converts `UNVERIFIED` to `ALLOW`. | `IMPLEMENTED` |
| C-05 | **Static API symbol verification** is implemented only against the **committed fixture subset** (3 packages). For live-mode packages, `resolveClaimsFromExports` is called but currently returns an empty/null claim because no live tarball inspection is performed. | `FIXTURE-ONLY` |
| C-06 | `BLOCK` means a deterministic hard failure (symbol absent in fixture exports, package not found). `WARN` means a weak signal (install scripts, young package). `UNVERIFIED` preserves ambiguity and is never treated as `ALLOW`. | `IMPLEMENTED` |
| C-07 | **Remediation** is patch-suggestion only. The suggested patch is printed in the terminal card and requires human approval before any change is applied. No code is automatically modified. | `IMPLEMENTED` |
| C-08 | The IBM Bob **`PreToolUse` hook** (`/.bob/hooks/PreToolUse.mjs`) intercepts `execute_command` calls matching `npm install/add/i`, looks up the package in the fixture store, and exits `2` (BLOCK) or `0` (allow). It does **not** perform live registry lookup in the hook path. Per IBM Bob docs, stdout is ignored; evidence is written to `.phantomdeps/decisions.ndjson`; stderr carries the block reason visible in the Bob UI. | `IMPLEMENTED (fixture-path only)` |
| C-09 | **Provenance** fields (`publishedAt`, live publish date) are always `null` in live mode because the npm packument API does not return per-version publish timestamps in the standard `time` field as parsed. The provenance risk signal is therefore not raised in live mode. | `FIXTURE-ONLY` |
| C-10 | **Strict agent policy** (`origin: "agent"`) is used in the hook path. `origin: "human"` is used in the CLI check/demo path. | `IMPLEMENTED` |
| C-11 | Exit codes: `0` = ALLOW · `1` = WARN · `2` = BLOCK · `3` = UNVERIFIED. | `IMPLEMENTED` |
| C-12 | **npm-first and registry-name specs only.** Scoped packages (`@scope/name`), versioned specs (`name@version`), and bare names are supported. URL protocols, shell metacharacters, and names exceeding 214 characters are rejected. | `IMPLEMENTED` |
| C-13 | **Decision log** is an NDJSON file (`.phantomdeps/decisions.ndjson`) with SHA-256 hash-chained records. Each record includes decisionId, action, evidence hash, and previousHash. | `IMPLEMENTED` |

---

## Explicit non-goals (v1)

| # | Out of scope |
|---|---|
| N-01 | Live tarball download and inspection for static symbol verification |
| N-02 | Multi-package command parsing (e.g., `npm install a b c`) |
| N-03 | Lock-file or `package.json` dependency graph analysis |
| N-04 | Transitive dependency risk |
| N-05 | Automatic code application (patches require human approval) |
| N-06 | Non-npm ecosystems (pip, cargo, gem, etc.) |
| N-07 | License compliance analysis |
| N-08 | Continuous monitoring of installed packages |

---

## Bob hook scope (v1)

- The hook intercepts: `execute_command` where `input.command` matches `/\bnpm\s+(install|add|i)\b/`.
- It does NOT intercept: `npx`, `yarn`, `pnpm`, multi-package installs, or shell-composed commands.
- Unknown or unsupported command shapes exit `0` (allow through, write UNVERIFIED evidence).
- The hook is **fixture-path-only**. If no fixture exists for the package, it exits `0` (insufficient evidence to block).

---

## Evidence labels in use

All claims in plans and reports must be labelled:
`CONFIRMED` | `CORROBORATED` | `INFERENCE` | `TEAM DESIGN` | `TEAM MEASUREMENT` | `ASSUMPTION` | `UNKNOWN`

A test result is `TEAM MEASUREMENT` only when produced by a committed, reproducible artifact.

---

## Amendments

Amendments to this contract must:
1. Be recorded in `.brain/.report/decision-log.md` with a new decision ID.
2. Reference the phase/step that required the change.
3. Update this document's `Last-updated commit` front matter.

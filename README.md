<div align="center">

# phantomdeps

### Pre-install AI dependency claim gate for IBM Bob

[![CI](https://github.com/adishxm/phantomdeps/actions/workflows/ci.yml/badge.svg)](https://github.com/adishxm/phantomdeps/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-205%2F205%20passing-brightgreen)
![Phase](https://img.shields.io/badge/phase-14%20complete-brightgreen)
![Version](https://img.shields.io/badge/version-v0.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Node](https://img.shields.io/badge/node-%3E%3D20-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-green)

<p align="center">
  <b>phantomdeps</b> is an npm-first, <b>verification-only</b> pre-install claim gate designed to prevent AI coding agent package and symbol hallucinations. It statically verifies exported AST declarations from npm tarballs without executing target package code.
</p>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Plain-Language Workflow](#plain-language-workflow)
- [Product Workflow & Explainer](#product-workflow--explainer)
- [Technical Architecture](#technical-architecture)
- [End-to-End Sequence Flow](#end-to-end-sequence-flow)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Demo Scenarios](#demo-scenarios)
- [Verified Output Example](#verified-output-example)
- [Usage & CLI Commands](#usage--cli-commands)
- [Project Structure](#project-structure)
- [IBM Bob Integration](#ibm-bob-integration)
- [Security, Provenance & Audit Logging](#security-provenance--audit-logging)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Git History & Milestone Timeline](#git-history--milestone-timeline)
- [Product Contract & Scope Boundaries](#product-contract--scope-boundaries)
- [Team & Contribution](#team--contribution)
- [License & Acknowledgments](#license--acknowledgments)

---

## Overview

AI coding agents frequently recommend non-existent packages or hallucinate function exports from real packages. A [USENIX Security 2025 study](https://www.usenix.org/conference/usenixsecurity25) found a **19.7% package-level hallucination rate** across 2.23 million recommendations from 16 popular LLMs.

Standard name-existence checks miss the critical gap: a real package that exists on npm, but does **not** export the specific function or symbol claimed in the AI-generated import. `phantomdeps` bridges this gap before `npm install` executes.

```typescript
// AI Agent generates:
import { isOddBatch } from 'is-odd'; // Hallucinated symbol!

// phantomdeps gate intercepts:
// Verdict: BLOCK — is-odd@3.0.1 exports isOdd(n), not isOddBatch
```

> [!IMPORTANT]
> **Verification-Only Guarantee**: `phantomdeps` never calls `npm install`, never imports third-party modules, and never executes package code or lifecycle scripts (`preinstall`/`postinstall`).

---

## Plain-Language Workflow

For developers and non-technical readers, `phantomdeps` acts as an automated safety check between an AI assistant and package installation.

```mermaid
flowchart TD
    A["AI Assistant writes code & generates install command"] --> B["phantomdeps checks whether package exists on npm"]
    B --> C["phantomdeps verifies imported symbols in package tarball"]
    
    C -- "Fake package or missing symbol" --> D["BLOCK: Installation intercepted before execution"]
    C -- "Risky signal (e.g. install scripts)" --> E["WARN: Flagged for human review"]
    C -- "Package & symbols confirmed" --> F["ALLOW: Safe to install"]
    
    D --> G["Bob proposes cited repair patch"]
    E --> H["Human reviews risk signals"]
    G --> I["Human approves repair patch"]
    
    H -- "Approved" --> F
    I --> J["Bob applies patch & re-verifies"]
    J --> K["Tests pass & work continues safely"]
```

> *"The package exists, but the function the AI wrote doesn't — so we catch that before anything installs, and Bob fixes it for you."*

---

## Product Workflow & Explainer

How `phantomdeps` evaluates AI tool invocations, returns deterministic policy decisions, and integrates into agent workflows.

```mermaid
flowchart TD
    A["Developer Task"] --> B["IBM Bob generates code & npm install command"]
    B --> C["phantomdeps Pre-Install Gate"]
    
    C --> D{"Verdict Evaluation"}
    D -- "ALLOW" --> E["Installation Proceeds"]
    D -- "WARN" --> F["Flagged for Human Review"]
    D -- "BLOCK" --> G["Evidence Card & Revalidated Repair Plan"]
    D -- "UNVERIFIED" --> H["Fails Closed (Never Guesses)"]
    
    G --> I["Human Approves Patch"]
    F -- "Approved" --> E
    H -- "Manual Verification" --> I
    I --> J["Bob Agent Applies Patch"]
    J --> K["Safe Build & Tests Run"]
    K --> L["Gate Re-Checks & Decision Recorded"]
```

> *"phantomdeps is a deterministic-first claim gate — it verifies the package and the exact API an agent's code claims to use, before install, then hands IBM Bob a cited, reviewable repair."*

---

## Technical Architecture

The multi-layered verification pipeline architecture powering `phantomdeps`.

```mermaid
flowchart TD
    subgraph Client["Interception Layer"]
        HK["Bob PreToolUse hook<br/>(or CLI wrapper fallback)"]
        CA["Command Adapter<br/>argv parser, no shell"]
    end
    subgraph L1["L1 — Identity & Registry"]
        RA["Registry Adapter (npm / PyPI)"]
        AR["Non-executing Archive Inspector"]
    end
    subgraph L2["L2 — Static Claim Resolver"]
        IM["Changed-import Parser"]
        EX["Exports / Types Resolver"]
    end
    subgraph L3["L3 — Risk Signals (warn-only)"]
        SQ["Proximity / Age / Reputation"]
    end
    subgraph L4["L4 — Bounded Task Fit (optional)"]
        SUB["Bob Subagent<br/>no tools, cited, sandboxed"]
    end
    subgraph Core["Policy & Output"]
        PE["Policy Engine (rule-first)"]
        EW["Evidence Writer<br/>card / JSON / SARIF"]
        DL["Hash-chained Decision Log"]
        RP["Remediation Planner"]
    end

    HK --> CA --> RA
    RA --> AR --> IM --> EX
    RA --> SQ
    EX --> PE
    SQ --> PE
    PE -->|"ambiguous only"| SUB --> PE
    PE --> EW
    PE --> DL
    PE -->|"BLOCK"| RP --> BobA["Bob Agent applies patch"]
    BobA --> Tests["Safe build / tests"] --> PE
```

> **Stack Notes:** Pure TypeScript/Node.js CLI (native ESM), npm registry adapter (PyPI is L1-identity only in v1), zero code execution anywhere — byte-level archive inspection, traversal-guarded tarball unpacking, and static AST parsing. See complete reference in [`docs/architecture.md`](docs/architecture.md).

### Architectural Layers & Subsystems

| Layer | Component | Implementation | Responsibility & Security Boundary |
|---|---|---|---|
| **Interception (L0)** | Hook & Command Adapter | `.bob/hooks/PreToolUse.mjs`<br>`src/parser.ts` | Intercepts agent tool invocations before execution. Safe argv tokenizer (`parseHookCommand`) skips flags, handles option-first and multi-package commands, and enforces fail-closed exit code 2 on `BLOCK` / `UNVERIFIED`. Shell metacharacters are rejected without shell evaluation. |
| **L1 — Identity** | Registry & Fixture Adapters | `src/adapters/registry.ts`<br>`src/adapters/fixture.ts` | Queries authoritative npm/PyPI metadata or offline test fixtures (`fixture://`). Distinguishes 404 (Not Found) from 401/403 (Auth Required) and network failure. Validates tarball SHA-512 integrity digests against registry packuments. |
| **L2 — Claim Resolver** | Diff Parser & AST Resolver | `src/parsers/diff-parser.ts`<br>`src/adapters/artifact.ts`<br>`src/checker/static-claim.ts` | Extracts imported symbols from git diffs (`--diff`) or modified files (`--file`). Downloads and extracts tarball streams in-memory with strict `package/` path traversal protection. Resolves `package.json` export maps and TypeScript `.d.ts` symbol tables without executing any package code. |
| **L3 — Risk Signals** | Heuristic Threat Scanners | `src/gate.ts`<br>`src/checker/risk-signals.ts` | Scans for package youth (<7 days), lifecycle install scripts (`hasInstallScript: true`), and name proximity. Emits non-blocking `WARN` findings to preserve developer velocity without false-positive blocks. |
| **L4 — Task Fit** | Sandboxed Agent Review | `src/types.ts` | Optional subagent validation for high-ambiguity packages. Analyzes untrusted README documentation in a read-only sandbox with no tool access. |
| **Policy & Ledger** | Policy Engine & Audit Chain | `src/gate.ts`<br>`src/provenance.ts` | Enforces deterministic rule priority (`BLOCK > UNVERIFIED > WARN > ALLOW`). Writes tamper-evident SHA-256 hash-chained decision records to `.phantomdeps/decisions.ndjson`, cryptographically verifiable via `phantomdeps audit-log verify`. Proposes patch-only remediation. |

### Dual-Path Execution & Recovery Architecture

```mermaid
flowchart TD
    S["Start: Install Command Proposed"] --> CA["Command Adapter (argv parser)"]
    CA --> HK{"Interception Mechanism"}
    HK -->|"Native Bob Hook"| BH[".bob/hooks/PreToolUse.mjs<br/>exit code 2 on BLOCK / UNVERIFIED"]
    HK -->|"CLI Wrapper"| WR["phantomdeps install / check<br/>direct CLI invocation"]
    BH --> GP["Deterministic Claim Gate Pipeline (L1–L3)"]
    WR --> GP
    GP --> PE["Policy Engine Decision Matrix"]
    PE -->|"BLOCK"| RP["Evidence Card + Patch-Only Repair"]
    PE -->|"ALLOW"| IP["Execute npm install"]
    PE -->|"WARN"| WN["Emit Warning & Proceed"]
    PE -->|"UNVERIFIED"| FC["Fail Closed (Requires Human Override)"]
    RP --> HA["Human Review & Approval"]
    HA --> BA["Bob Agent applies patch"]
    BA --> ST["Safe Tests & Gate Re-check"]
```

---

## End-to-End Sequence Flow

Sequence diagram demonstrating real-time interception, tarball inspection, evidence card generation, and repair approval.

```mermaid
sequenceDiagram
    autonumber
    participant Dev as Developer
    participant Bob as IBM Bob Agent
    participant Gate as phantomdeps Gate
    participant Reg as npm Registry

    Dev->>Bob: Gives coding task
    Bob->>Bob: Generates code & npm install command
    Bob->>Gate: Trigger npm install (PreToolUse Hook)
    
    Gate->>Reg: Resolve package metadata & tarball URL (L1)
    Reg-->>Gate: Return packument, sha512 integrity & tarball

    Gate->>Gate: Extract tarball in memory & parse AST exports (L2)

    alt Symbol Missing or Package Hallucinated (BLOCK)
        Gate-->>Bob: Exit Code 2 (BLOCK) & write Evidence Card to stderr
        Gate->>Gate: Log decision to .phantomdeps/decisions.ndjson
        Bob->>Dev: Present Evidence Card & proposed repair patch
        Dev->>Bob: Human approves repair patch
        Bob->>Bob: Apply reviewed patch to code
        Bob->>Bob: Run safe local build & unit tests
        Bob->>Gate: Re-verify install command with gate
        Gate-->>Bob: Exit Code 0 (ALLOW)
        Gate->>Gate: Log updated decision
        Bob->>Dev: Work completed safely
    else Symbol Verified & Package Valid (ALLOW)
        Gate-->>Bob: Exit Code 0 (ALLOW)
        Gate->>Gate: Log decision to .phantomdeps/decisions.ndjson
        Bob->>Dev: Installation proceeds & task completes
    end
```

---

## Key Features

- **Static Tarball AST Inspection**: Inspects package tarball exports (`package.json#exports` ESM maps and TypeScript `.d.ts` AST declarations) without executing code.
- **Fail-Closed IBM Bob Hook Guard**: Intercepts `execute_command` requests (`npm install`, `npm add`, `npm i`) with argv whitespace tokenization, flag stripping, and multi-package severity aggregation (`BLOCK` > `UNVERIFIED` > `WARN` > `ALLOW`).
- **Tamper-Evident SHA-256 Audit Log**: Appends decisions to `.phantomdeps/decisions.ndjson` with SHA-256 hash chaining. Verified via `phantomdeps audit-log verify`.
- **Explicit Claim-Context Contract**: Accepts symbol context via `--symbols`, git diff import extraction (`--diff <file>`), or source file inspection (`--file <path>`). Missing context safely returns `UNVERIFIED`.
- **Machine-Readable Output**: Emits structured JSON via `--json` and responsive terminal cards formatted dynamically for 80, 120, or 240 column displays.
- **Human-Approved Remediation**: Suggests import fixes (e.g. replacing `isOddBatch` with `isOdd`) as terminal suggestions requiring explicit human confirmation.

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/adishxm/phantomdeps.git
cd phantomdeps

# Install dependencies & run build check
npm install
npm run build

# Execute test suite (10 test suites / 205 tests)
npm test

# Run the offline fixture demo (default BLOCK scenario)
npx tsx src/cli.ts demo --fixture --offline
```

---

## Demo Scenarios

`phantomdeps` includes three built-in offline demo scenarios running against committed fixture snapshots without network calls:

```bash
# BLOCK — hallucinated symbol (isOddBatch does not exist in is-odd)
npx tsx src/cli.ts demo --fixture --offline --scenario block

# ALLOW — real package, symbol confirmed present (lodash.merge)
npx tsx src/cli.ts demo --fixture --offline --scenario allow

# WARN  — real package, but has install scripts (supply-chain risk)
npx tsx src/cli.ts demo --fixture --offline --scenario warn
```

| Scenario | Package Target | Claimed Symbol | Verdict | Exit Code |
|---|---|---|---|---|
| `block` (default) | `is-odd@3.0.1` | `isOddBatch` | **BLOCK** | `2` |
| `allow` | `lodash@4.17.21` | `merge` | **ALLOW** | `0` |
| `warn` | `risky-new-pkg` | `initialize` (install script present) | **WARN** | `1` |

---

## Verified Output Example

```text
phantomdeps — pre-install AI dependency claim gate
Offline fixture demo — no network calls, no package installation

[SCENARIO]
  IBM Bob generated code that imports a function from an npm package.
  Bob is about to run: npm install is-odd
  The generated code uses: import { isOddBatch } from 'is-odd'
  phantomdeps intercepts the install command and checks the claim...

[FIXTURE] Loaded: is-odd-demo — captured 2025-09-20T00:00:00.000Z

────────────────────────────────────────────────────────────
phantomdeps gate — BLOCK
────────────────────────────────────────────────────────────
  Package  : is-odd@3.0.1 → 3.0.1
  Ecosystem: npm
  Source   : fixture (fixture://is-odd-demo)
  Integrity: sha512-sSqAd7...
  Decision : f19b0b40-fe5b-4d05-be96-5e1ad70f7a8e

Findings:
  ✖ [l2.symbol_missing]
    BLOCK: Symbol(s) [isOddBatch] are NOT present in the declared exports of is-odd@3.0.1.
    The AI-generated import claims a symbol that this package does not export.

  Record hash : sha256:f3588ad683808cf632acf7b82cf49f278d015c224ded58427ea7d23b3c3fa4ca
────────────────────────────────────────────────────────────

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

---

## Usage & CLI Commands

```bash
# Verify a package against the live npm registry
npx tsx src/cli.ts verify lodash@4.17.21 --symbols merge,cloneDeep

# Machine-readable JSON output
npx tsx src/cli.ts verify lodash@4.17.21 --symbols merge --json

# Verify from a unified git diff file (extracts newly added imports)
npx tsx src/cli.ts verify lodash@4.17.21 --diff changes.diff

# Verify audit log integrity against tampering
npx tsx src/cli.ts audit-log verify
npx tsx src/cli.ts audit-log verify .phantomdeps/decisions.ndjson

# Verification-only aliases (do NOT run npm install)
npx tsx src/cli.ts install is-odd --symbols isOddBatch
npx tsx src/cli.ts add lodash --symbols merge
```

### Command Exit Codes

| Command Type | Exit 0 | Exit 1 | Exit 2 | Exit 3 |
|---|---|---|---|---|
| `verify` / `check` / `install` | `ALLOW` | `WARN` | `BLOCK` | `UNVERIFIED` |
| `demo` | Verdict matched expectation | Verdict mismatched | N/A | N/A |
| `audit-log verify` | Log clean & chain valid | N/A | Tampering / violations detected | N/A |

---

## Project Structure

```text
phantomdeps/
├── src/
│   ├── cli.ts                # Entry point, CLI router & output formatter
│   ├── parser.ts             # Safe argv tokenizer, metacharacter & protocol guard
│   ├── gate.ts               # Core verification gate orchestrator
│   ├── types.ts              # System types, discriminated unions & interfaces
│   ├── capture-fixture.ts    # CLI utility to capture live npm fixtures
│   ├── adapters/
│   │   ├── registry.ts       # Typed npm registry adapter (L1)
│   │   └── artifact.ts       # Safe tarball downloader, extractor & AST inspector (L2)
│   ├── checker/
│   │   ├── static-claim.ts   # Symbol claim resolver & citation generator
│   │   └── risk-signals.ts   # Supply-chain risk detectors (L3)
│   ├── engine/
│   │   └── policy.ts         # Rule-first policy engine (L4)
│   ├── evidence/
│   │   └── writer.ts         # Terminal card renderer & SHA-256 NDJSON log writer
│   ├── fixtures/
│   │   └── loader.ts         # Offline fixture loader
│   └── demo/
│       └── runner.ts         # Offline multi-scenario demo runner
├── fixtures/                 # Version-pinned offline demo JSON fixtures
│   ├── is-odd-demo.json
│   ├── lodash-allow-demo.json
│   └── risky-new-pkg-warn-demo.json
├── tests/                    # Jest unit & integration test suites
│   ├── gate-integration.test.ts
│   ├── artifact-registry.test.ts
│   ├── parser.test.ts
│   ├── audit-log.test.ts
│   ├── static-claim.test.ts
│   ├── claim-context.test.ts
│   ├── fixture-loader.test.ts
│   ├── policy.test.ts
│   ├── edge-cases.test.ts
│   └── hook-subprocess.test.ts
├── .bob/
│   ├── hooks/PreToolUse.mjs  # IBM Bob PreToolUse hook (fail-closed exit 2)
│   └── settings.json         # Bob hook registration config
├── docs/
│   └── product-contract.md   # Frozen V1 product contract
├── .brain/                   # Project implementation plans & report audit files
│   ├── .imple-plan/
│   └── .report/
├── .docs/                    # Research, real-time validation testing (IBM Bob & Antigravity) & presentations
│   ├── 01_RESEARCH/          # Comprehensive architectural research, references & master prompts
│   │   ├── IBM_Bob2_Phantomdeps_Complete_Research.md
│   │   ├── MasterPrompt.md
│   │   └── phantomdeps_full_reference.md
│   ├── 02_TEST/              # Real-time validation protocol, test targets & evidence reports
│   │   ├── Tested_project_ibm-bob/       # Controlled TaskForge target for IBM Bob lane
│   │   ├── Tested_report_ibm-bob/        # 11-phase validation reports for IBM Bob
│   │   ├── Tested_project_antigravity/   # Controlled TaskForge target for Antigravity lane
│   │   ├── Tested_report_antigravity/    # 11-phase validation reports for Antigravity
│   │   ├── phantomdeps_validation_protocol.md
│   │   └── PhantomDeps Real-Time Validation Report.md
│   ├── 03_DEMO/              # Demo scripts, pitch presentations, judge Q&A & checklists
│   │   ├── demo-script.md
│   │   ├── pitch.md
│   │   ├── ppt-outline.md
│   │   └── release-checklist.md
│   ├── ibm-bob-screenshot/   # Live IBM Bob IDE session UI validation screenshots gallery
│   ├── ibm-bob-screenshot.zip # Full archive of IBM Bob test evidence screenshots
│   ├── phantomdeps — Prove the claim before install.pdf   # Official presentation pitch deck (PDF)
│   └── phantomdeps — Prove the claim before install.pptx  # Official presentation pitch deck (PPTX)
├── package.json              # Package metadata, bin routes & dependencies
├── tsconfig.json             # TypeScript ES2022 / NodeNext configuration
├── jest.config.js            # ESM Jest test runner setup
├── CONTRIBUTING.md           # Team roster & contribution guidelines
└── LICENSE                   # MIT License
```

---

## IBM Bob Integration

`phantomdeps` integrates directly into IBM Bob via the `PreToolUse` hook interface:

1. Intercepts `execute_command` tool requests matching `npm install`, `npm add`, or `npm i`.
2. Tokenizes the command string, strips options, and checks every target package against the gate.
3. If any package returns `BLOCK` or `UNVERIFIED` (in strict-agent mode), the hook exits with **code 2**, blocking tool execution.
4. Appends structured decision records to `.phantomdeps/decisions.ndjson` and writes block details to `stderr`.

### Hook Registration Config (`.bob/settings.json`)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "execute_command",
        "command": "npx tsx .bob/hooks/PreToolUse.mjs"
      }
    ]
  }
}
```

---

## Security, Provenance & Audit Logging

`phantomdeps` tracks supply-chain risk across **five explicit evidence dimensions**:

1. **Artifact Integrity**: `verified` | `mismatch` | `unavailable` | `not_checked`
2. **Registry Signature**: `present` | `absent` | `unknown`
3. **Provenance Attestation**: `attested` | `not_attested` | `unknown` (SLSA / Sigstore)
4. **Publisher Identity**: `known` | `unverified` | `unknown`
5. **Source Repository**: `linked` | `missing` | `unknown`

### Tamper-Evident Audit Log

Every decision is logged to `.phantomdeps/decisions.ndjson` using SHA-256 hash chaining:

$$\text{recordHash} = \text{SHA256}(\text{previousHash} + \text{decisionId} + \text{timestamp} + \text{action} + \text{evidenceHash})$$

Run verification via:
```bash
npx tsx src/cli.ts audit-log verify
```

---

## Testing & Quality Assurance

`phantomdeps` includes comprehensive test suites, deterministic offline fixtures, real-time pre-install interception gates, and cryptographic audit log verifiers.

---

### 1. Core phantomdeps Test Suite & Build

Run the TypeScript typechecker, build compiler, and Jest test runner:

```bash
# Typecheck without emitting code
npm run lint

# Compile TypeScript to dist/
npm run build

# Run full Jest test suite across unit, integration, and subprocess tests
npm test
```

| Test Suite | Focus Area | Test Count |
|---|---|---|
| `gate-integration.test.ts` | End-to-end gate orchestrator & CLI workflows | 14 |
| `artifact-registry.test.ts` | Tarball extraction, integrity, typed registry | 24 |
| `parser.test.ts` | Argv tokenizer, shell metachars & protocol guards | 8 |
| `audit-log.test.ts` | SHA-256 hash chain verification & 13 tamper tests | 13 |
| `static-claim.test.ts` | Symbol claim resolution & citations | 5 |
| `claim-context.test.ts` | Diff import parsing, JSON formatting, width wrap | 16 |
| `fixture-loader.test.ts` | Offline fixture validation | 2 |
| `policy.test.ts` | Policy rules & verdict aggregation | 6 |
| `edge-cases.test.ts` | Boundary conditions, fuzzing & invalid inputs | 89 |
| `hook-subprocess.test.ts` | Direct Node.js subprocess invocation of Bob hook | 28 |

---

### 2. Offline Deterministic Scenario Demos

Run the pre-packaged offline fixture scenarios to test all primary gate verdicts without network access:

```bash
# Scenario 1: BLOCK — is-odd@3.0.1 claiming missing symbol isOddBatch
npx tsx src/cli.ts demo --fixture --offline --scenario block

# Scenario 2: ALLOW — lodash@4.17.21 claiming present symbol merge
npx tsx src/cli.ts demo --fixture --offline --scenario allow

# Scenario 3: WARN — risky-new-pkg@0.0.1 with lifecycle install scripts
npx tsx src/cli.ts demo --fixture --offline --scenario warn
```

---

### 3. Package & Symbol Claim Verification Commands

Verify packages with explicit symbols, from AST source files, or from git diffs:

```bash
# 1. Verify specific exported symbols (ALLOW: exit 0)
npx tsx src/cli.ts check lodash@4.17.21 --symbols merge --offline

# 2. Verify with machine-readable JSON output
npx tsx src/cli.ts check lodash@4.17.21 --symbols merge --offline --json

# 3. Verify from an AST source file (automatically extracts imported symbols)
npx tsx src/cli.ts check is-odd@3.0.1 --file src/report.ts --offline

# 4. Verify from a unified git diff file
npx tsx src/cli.ts verify lodash@4.17.21 --diff changes.diff

# 5. Non-registry URL / protocol spec (fail-closed, exit 3: UNVERIFIED)
npx tsx src/cli.ts check https://example.com/malicious-pkg.tgz
```

---

### 4. Tamper-Evident Audit Log Verification

Verify the SHA-256 hash chain and schema integrity of all logged decisions:

```bash
# Verify default decision log (.phantomdeps/decisions.ndjson)
npx tsx src/cli.ts audit-log verify

# Verify custom path
npx tsx src/cli.ts audit-log verify .phantomdeps/decisions.ndjson
```

---

### 5. Real-Time Validation Target (TaskForge)

TaskForge is a controlled, real-world TypeScript project used to prove that `phantomdeps` blocks hallucinated dependencies **before** `npm install` executes. Both **IBM Bob** and **Antigravity** validation environments have been thoroughly exercised with full test suites, implementation plans, and reports:

- **IBM Bob Target:** [`.docs/02_TEST/Tested_project_ibm-bob/`](.docs/02_TEST/Tested_project_ibm-bob/) | Reports: [`.docs/02_TEST/Tested_report_ibm-bob/`](.docs/02_TEST/Tested_report_ibm-bob/)
- **IBM Bob Live UI Screenshots:** [`.docs/ibm-bob-screenshot/`](.docs/ibm-bob-screenshot/) (Archive: [`.docs/ibm-bob-screenshot.zip`](.docs/ibm-bob-screenshot.zip))
- **Antigravity Target:** [`.docs/02_TEST/Tested_project_antigravity/`](.docs/02_TEST/Tested_project_antigravity/) | Reports: [`.docs/02_TEST/Tested_report_antigravity/`](.docs/02_TEST/Tested_report_antigravity/)
- **Pitch Deck & Presentation:** [`.docs/phantomdeps — Prove the claim before install.pdf`](.docs/phantomdeps%20%E2%80%94%20Prove%20the%20claim%20before%20install.pdf) | [PowerPoint (.pptx)](.docs/phantomdeps%20%E2%80%94%20Prove%20the%20claim%20before%20install.pptx)

---

#### A. IBM Bob Lane (`Tested_project_ibm-bob`)

##### Running on Linux / macOS / Bash:

```bash
# Step 1: Run TaskForge clean baseline tests (26 tests pass)
cd .docs/02_TEST/Tested_project_ibm-bob && npm test

# Step 2: Simulate AI proposing 'npm install is-odd' claiming absent 'isOddBatch'
# Intercepted via the IBM Bob PreToolUse hook (Exits with code 2: BLOCK)
node ../../../node_modules/tsx/dist/cli.mjs ../../../.bob/hooks/PreToolUse.mjs <<EOF
{"tool":"execute_command","input":{"command":"npm install is-odd"}}
EOF

# Step 3: Rebuild and test clean TaskForge
npm run build && npm test
cd ../../..
```

##### Running on Windows (PowerShell):

```powershell
# Step 1: Run TaskForge clean baseline tests (26 tests pass)
Set-Location .docs\02_TEST\Tested_project_ibm-bob; npm test

# Step 2: Simulate AI proposing 'npm install is-odd' claiming absent 'isOddBatch'
# Intercepted via the IBM Bob PreToolUse hook (Exits with code 2: BLOCK)
'{"tool":"execute_command","input":{"command":"npm install is-odd"}}' | node ..\..\..\node_modules\tsx\dist\cli.mjs ..\..\..\.bob\hooks\PreToolUse.mjs

# Step 3: Rebuild and test clean TaskForge
npm run build; npm test
Set-Location ..\..\..
```

---

#### B. Antigravity Lane (`Tested_project_antigravity`)

##### Running on Linux / macOS / Bash:

```bash
# Step 1: Run TaskForge clean baseline tests (16 tests pass)
cd .docs/02_TEST/Tested_project_antigravity && npm test

# Step 2: Simulate AI proposing 'npm install is-odd' claiming absent 'isOddBatch'
# Intercepted via the IBM Bob PreToolUse hook (Exits with code 2: BLOCK)
node ../../../node_modules/tsx/dist/cli.mjs ../../../.bob/hooks/PreToolUse.mjs <<EOF
{"tool":"execute_command","input":{"command":"npm install is-odd"}}
EOF

# Step 3: Rebuild and test clean TaskForge
npm run build && npm test
cd ../../..
```

##### Running on Windows (PowerShell):

```powershell
# Step 1: Run TaskForge clean baseline tests (16 tests pass)
Set-Location .docs\02_TEST\Tested_project_antigravity; npm test

# Step 2: Simulate AI proposing 'npm install is-odd' claiming absent 'isOddBatch'
# Intercepted via the IBM Bob PreToolUse hook (Exits with code 2: BLOCK)
'{"tool":"execute_command","input":{"command":"npm install is-odd"}}' | node ..\..\..\node_modules\tsx\dist\cli.mjs ..\..\..\.bob\hooks\PreToolUse.mjs

# Step 3: Rebuild and test clean TaskForge
npm run build; npm test
Set-Location ..\..\..
```

---

### 6. IBM Bob PreToolUse Hook Parity & Multi-Package Aggregation

Test the hook contract directly via JSON stdin:

```bash
# Verified ALLOW case (exit 0)
echo '{"tool":"execute_command","input":{"command":"npm install lodash"}}' | npx tsx .bob/hooks/PreToolUse.mjs

# Risky package WARN case (exit 0, advisory warning printed to stderr)
echo '{"tool":"execute_command","input":{"command":"npm install risky-new-pkg"}}' | npx tsx .bob/hooks/PreToolUse.mjs

# Unsupported URL spec case (exit 2, fail-closed strict-agent)
echo '{"tool":"execute_command","input":{"command":"npm install https://example.com/pkg.tgz"}}' | npx tsx .bob/hooks/PreToolUse.mjs

# Multi-package worst-case aggregation: ALLOW (lodash) + BLOCK (is-odd) -> BLOCK (exit 2)
echo '{"tool":"execute_command","input":{"command":"npm install lodash is-odd"}}' | npx tsx .bob/hooks/PreToolUse.mjs

# Non-install tool pass-through (exit 0)
echo '{"tool":"execute_command","input":{"command":"git status"}}' | npx tsx .bob/hooks/PreToolUse.mjs
```

---

### 7. Adversarial & Tamper-Detection Testing

```bash
# Nonexistent package check (404 Not Found -> BLOCK, exit 2)
npx tsx src/cli.ts check nonexistent-package-random-12345xyz

# Secret & credential scan
node .docs/02_TEST/Tested_report_antigravity/evidence/commands/run-secret-scan.cjs
```

---

## Git History & Milestone Timeline

Chronological milestones extracted from verified repository Git commits:

| Milestone / Tag | Date | Description |
|---|---|---|
| **Phase 00 Intake** | 2026-09-20 | Initial repository setup, architecture scaffold, and intake audit (`52c3d65`) |
| **Phase 01–03 MVP** | 2026-09-22 | Product contract freeze, core engine build, and initial 35 unit tests (`c6fd683`) |
| **Phase 04–05 Validation** | 2026-09-24 | Local acceptance verification, edge-case expansion to 103 tests (`61569ea`) |
| **Tag `v0.1.0-rc.1`** | 2026-09-26 | Outsider code review, Bob hook TypeScript fix, release candidate tag (`7a493ac`) |
| **Phase 09 Baseline** | 2026-09-27 | Truth reset, roster update (Roshan Singh added), baseline measurement (`54083c9`) |
| **Phase 10 Hook Guard** | 2026-09-27 | Fail-closed argv tokenizer, multi-package aggregation, 28 subprocess tests |
| **Phase 11 Tarball AST** | 2026-09-27 | Live exact-artifact tarball inspection without code execution, exact version resolution |
| **Phase 12 Audit Chain** | 2026-09-27 | Five-dimensional provenance, SHA-256 hash chain verification (`audit-log verify`) |
| **Phase 13 Claim Context** | 2026-09-27 | Git diff import parser, `--json` machine output, responsive terminal wrapping |
| **Phase 14 Final Release** | 2026-09-27 | Clean checkout validation, final documentation alignment, 205/205 tests (`e7d3c2c`) |

---

## Product Contract & Scope Boundaries

Grounded in frozen product specification [`docs/product-contract.md`](docs/product-contract.md):

### What `phantomdeps` Does (V1)
- Verification-only pre-install gate (never runs `npm install`).
- `install` and `add` commands are verification-only aliases for `check`/`verify`.
- Live static AST tarball export verification without executing third-party code.
- SHA-256 hash-chained tamper-evident decision log.
- Patch suggestions rendered as terminal recommendations requiring human confirmation.

### Out of Scope (V1 Non-Goals)
- Live code execution or package script invocation (`preinstall`/`postinstall`).
- Automatic code patching without human approval.
- Non-npm ecosystems (Python PyPI, Rust Crates, Go Modules).
- Transitive dependency tree or lock-file graph scanning.

---

## Team & Contribution

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidelines.

### Team Roster

- **[Aditya Kumar Sharma](https://github.com/adishxm)** — Product & Architecture Lead
- **[Narayan Kumar Jha](mailto:narayan.nkj@gmail.com)** — Core Implementation & Test Engineer
- **[Utkarsh Yadav](https://github.com/utkarsh-2207)** — Validation, Security & IBM Bob Workflow Lead
- **[Roshan Singh](https://github.com/rs3260821-dotcom)** — Demo, Documentation & Presentation Lead

---

## License & Acknowledgments

- **License**: Released under the [MIT License](LICENSE).
- **Research Citation**: Grounded in LLM dependency hallucination findings from *USENIX Security 2025*.
- **Ecosystem Integration**: Developed for the IBM Developer & IBM Bob ecosystem.

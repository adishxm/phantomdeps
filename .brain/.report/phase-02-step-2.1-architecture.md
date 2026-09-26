<!-- Status: COMPLETE | Phase: 02 | Step: 2.1 -->
# Step 2.1 — System Architecture and Repository Structure

**Phase:** 02  
**Step:** 2.1 — Produce or validate system architecture and repository structure  
**Status:** `COMPLETE`  
**Executed by:** IBM Bob (Agent mode) — this session  
**Source artifacts:** Research §§9.1–9.9; existing `src/` directory; `package.json`; `tsconfig.json`

---

## Architecture validation

The system architecture described in research §9.7–9.8 is **implemented and validated** against the existing `src/` codebase. Each component maps 1-to-1 to a source file.

### Component map

```
User task (IBM Bob / developer)
    │
    ▼
CommandAdapter          src/parser.ts
  parseIntent()         — tokenizes argv, rejects shell metacharacters,
                          rejects URL/VCS/path forms, returns InstallIntent
    │
    ▼
GateOrchestrator        src/gate.ts
  runCheck()            — wires L1→L2→L3→Policy→Evidence
    │
    ├──► RegistryAdapter          src/adapters/registry.ts
    │     resolveFromRegistry()   — npm packument fetch, exact version resolution
    │     evidenceFromFixture()   — offline fixture mode
    │         returns PackageEvidence | NOT_FOUND | UNAVAILABLE
    │
    ├──► StaticClaimResolver      src/checker/static-claim.ts
    │     resolveClaimsFromFixture()  — symbol check vs fixture export map
    │     resolveClaimsFromExports()  — symbol check vs live exports map
    │         returns ClaimFinding {verdict, symbolResults, citations}
    │
    ├──► RiskSignals              src/checker/risk-signals.ts
    │     computeRiskSignals()    — warning-only L3 (install script, young, no integrity)
    │         returns RiskSignals {warnings[]}
    │
    ▼
PolicyEngine            src/engine/policy.ts
  applyPolicy()         — rule-first: L1 hard blocks → L2 hard blocks → L3 WARNs
                          returns GateDecision {action, findings, recordHash, previousHash}
    │
    ▼
EvidenceWriter          src/evidence/writer.ts
  printCard()           — terminal card with colour, rule IDs, citations
  appendDecisionLog()   — hash-chained NDJSON to .phantomdeps/decisions.ndjson
  readLastHash()        — reads previous record hash for chaining
    │
    ▼
CLI / Demo              src/cli.ts  ·  src/demo/runner.ts
  demo --fixture        — offline scenario, fixture data, verified BLOCK output
  check / install       — live or offline single-package check

Fixtures               fixtures/is-odd-demo.json
  FixtureLoader         src/fixtures/loader.ts

Bob PreToolUse Hook    .bob/hooks/PreToolUse.mjs
  — intercepts execute_command matching npm install
  — exit 2 = BLOCK (stdout ignored per official IBM Bob docs)
```

### Type system

All data contracts are defined in [`src/types.ts`](../src/types.ts):

| Type | Role |
|---|---|
| `InstallIntent` | Parsed install command: ecosystem, name, version, rawArgv |
| `PackageEvidence` | L1 registry result: integrity, tarball, scripts, deprecated, source |
| `ClaimFinding` | L2 result: per-symbol status, verdict, citations |
| `RiskSignals` | L3 result: warnings list |
| `GateDecision` | Final decision record: action, findings, hash chain, timestamps |
| `Verdict` | `"ALLOW" | "WARN" | "BLOCK" | "UNVERIFIED"` |
| `Origin` | `"human" | "agent" | "ci" | "fixture"` |

---

## Repository structure validation

```
phantomdeps/
├── src/
│   ├── types.ts                  shared TypeScript types
│   ├── cli.ts                    entry point (demo / check / install)
│   ├── parser.ts                 safe argv parser (no shell evaluation)
│   ├── gate.ts                   orchestrator: L1→L2→L3→Policy→Evidence
│   ├── adapters/
│   │   └── registry.ts           npm registry adapter (L1)
│   ├── checker/
│   │   ├── static-claim.ts       static symbol resolver (L2)
│   │   └── risk-signals.ts       warning-only risk signals (L3)
│   ├── engine/
│   │   └── policy.ts             rule-first verdict engine
│   ├── evidence/
│   │   └── writer.ts             terminal card + hash-chained NDJSON
│   ├── fixtures/
│   │   └── loader.ts             offline fixture loader
│   └── demo/
│       └── runner.ts             fixture demo runner
├── fixtures/
│   └── is-odd-demo.json          is-odd@3.0.1: real pkg, absent symbol
├── tests/
│   ├── parser.test.ts
│   ├── static-claim.test.ts
│   ├── policy.test.ts
│   └── fixture-loader.test.ts
├── .bob/
│   └── hooks/
│       └── PreToolUse.mjs        IBM Bob PreToolUse hook
├── .brain/                       planning and evidence scaffold
├── .docs/                        research and demo materials
├── .phantomdeps/                 runtime output (decisions.ndjson)  [gitignored]
├── dist/                         TypeScript build output             [gitignored]
├── node_modules/                                                     [gitignored]
├── package.json
├── package-lock.json
├── tsconfig.json
├── LICENSE
└── README.md
```

All directories and files listed above **exist in the repository** as of commit `43f190a` (verified this session).

---

## Trust-boundary summary (from research §9.8)

| Zone | Components | Trust level |
|---|---|---|
| **Trusted** | `parser.ts`, `policy.ts`, `engine/`, `evidence/` | Project-controlled logic |
| **Untrusted input** | Agent-generated argv, registry responses, package archive bytes, README content | Treated as adversarial; validated before use |
| **Boundary** | `parser.ts` (argv sanitisation), `adapters/registry.ts` (timeout, schema), `.bob/hooks/PreToolUse.mjs` (exit-code only) | Enforcement points |

---

## Architecture decisions confirmed

| Decision | Implemented | File |
|---|---|---|
| Deterministic checks before model reasoning | ✅ L1→L2→L3 run before any L4 | `src/gate.ts` |
| No shell evaluation of argv | ✅ `REGISTRY_SPEC_RE` + `SHELL_META_RE` | `src/parser.ts` |
| Rule-first (no weighted scalar) verdict | ✅ Hard-block conditions checked first | `src/engine/policy.ts` |
| `UNVERIFIED` never silently becomes `ALLOW` | ✅ `UNAVAILABLE → UNVERIFIED`, exit 3 | `src/engine/policy.ts` |
| Hash-chained decision log | ✅ `previousHash` + `recordHash` on every record | `src/evidence/writer.ts` |
| No package code executed | ✅ Fixture mode only; no tarball execution | `src/demo/runner.ts` |

---

## Step result
`COMPLETE` — system architecture produced and validated against existing `src/`; repository structure confirmed; trust boundaries documented; all six architecture decisions confirmed implemented.

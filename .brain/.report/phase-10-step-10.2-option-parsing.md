# Phase 10 — Step 10.2: Option & Spec Classification

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 10.10.2  
**Status:** `COMPLETE`  
**Owner:** Contributor 2 (Narayan Kumar Jha)  
**Date:** 2026-09-27  

## Action
Implemented `classifySpec()` in `src/parser.ts` to classify package specifications and implemented value-flag skipping using `FLAGS_WITH_VALUE`.

## Specification Classification
- **`registry`:** Standard npm package specifications (e.g. `lodash`, `is-odd@3.0.1`, `@types/node`).
- **`unsupported`:** Non-registry forms including URLs, VCS (`git+https://`), local files (`file:`), and protocol prefixes (`npm:`, `github:`).
- **`unsafe`:** Specifications containing metacharacters.

## Flag Handling
- Value flags (`--tag`, `--otp`, `--workspace`, `-w`, `--before`) skip their next token argument so flag values are not mistaken for package names.
- Boolean flags (`-D`, `--save-dev`, `--exact`, `-g`, `--global`) are stripped.

## Evidence
- 5/5 option-first test cases PASS in `tests/hook-subprocess.test.ts`.

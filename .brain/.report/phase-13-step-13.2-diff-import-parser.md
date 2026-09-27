# Phase 13 — Step 13.2: Diff & File Import Parser

<!-- Status: COMPLETE | Last-updated commit: main -->

**Step:** 13.13.2  
**Status:** `COMPLETE`  
**Owner:** Contributor 2 (Narayan Kumar Jha)  
**Date:** 2026-09-28  

## Action
Implemented `src/adapters/diff-parser.ts` (`src/diff-parser.ts`) to extract claimed imports from git diffs and source files for a targeted package.

## Features
- `extractAddedImports(diffContent, packageName)`: Scans only newly added `+` lines in unified git diffs.
- `extractFileImports(fileContent, packageName)`: Scans whole file imports.
- Handles named imports (`{ foo, bar }`), default imports, aliased imports (`foo as bar`), and namespace imports (`* as name`).
- Strips aliases and deduplicates symbol list.

## Evidence
- Diff parser unit tests in `tests/claim-context.test.ts` PASS.

<!-- Status: DRAFT | Last-updated commit: 8d9ba18 -->
# Contribution Guide

**Status:** `DRAFT`  
**Last-updated commit:** `PENDING`

## Create the product repository

The current repository is a planning scaffold. Before implementation, create or attach the actual product repository and preserve this `.brain` and `.docs` structure.

```bash
git init -b main
 git add README.md CONTRIBUTING.md .docs .brain .gitignore
 git commit -m "chore: initialize phantomdeps repository"
```

Replace the placeholder roster in `.brain/.report/team-allocation.md` and `.brain/.report/team-knowledge-matrix.md` before assigning tasks.

## Branches

- `main` — protected integration branch.
- `work/contributor-1-product`
- `work/contributor-2-core`
- `work/contributor-3-validation`
- `work/contributor-4-demo-ppt`

Use small, reviewable commits. Never commit secrets, `.repo` material, dependencies, or generated build output.

## Ownership

- Contributor 1: product and architecture decisions.
- Contributor 2: core implementation and tests.
- Contributor 3: validation/security, IBM Bob evidence, and backup takeover.
- Contributor 4: PPT/demo/submission package plus demo fixture contribution.

Every pull request should state the phase/step ID, evidence paths, exact tests, and rollback point. No phase is passed from a plan alone.

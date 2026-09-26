<!-- Status: DRAFT | Last-updated commit: 540b861 -->
# Judge / Client Q&A

**Status:** `DRAFT`  
**Last-updated commit:** `d63976d`

- **Is this just a name checker?** No: the MVP’s differentiator is the measured wrong-symbol case where name existence would allow the claim.
- **Does `ALLOW` mean safe?** No. It means the selected evidence and policy checks passed; malicious code with a matching API is out of scope.
- **Can the agent bypass it?** Only matched/tested hook or wrapper paths are claimed. Unhooked shells and unsupported source forms remain bypasses or `UNVERIFIED`.
- **Did you run untrusted packages?** The target demo must not; it uses read-only artifact inspection, fixtures, and a fake package manager.
- **Why IBM Bob?** Bob’s repository context, Plan/Ask/Agent modes, subagents, and evidence capture make the repair path reviewable; the integration is tested rather than decorative.
- **What are the results?** `TBD` until the versioned corpus and baselines run. Never substitute targets for results.

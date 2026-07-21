---
name: auditing-agentic-wiki
description: "Audits AgenticWiki structure, links, frontmatter, source integrity, technical debt, and semantic health. Use when asked to lint the wiki, check repository health, find broken links or orphans, inspect debt, resolve entries in meta/tech-debt.md, or run a periodic deep audit."
---

# Auditing Agentic Wiki

Own whole-repository health checks, explicit technical-debt resolution, and periodic deep-semantic audits. Do not turn ordinary filing into a global audit, and do not duplicate source-verification procedures here.

## Choose the operation

### Health report

Use for "lint," "check health," "find errors," or similar requests. This is read-only unless the user also asks for fixes.

### Debt resolution

Use when the user asks to fix audit findings, resolve debt, or pay down `meta/tech-debt.md`. That request authorizes edits necessary for the selected debt items, subject to project ownership and deletion rules.

### Deep audit

Use when the user asks for a semantic-health audit, an ontology compression pass, or a periodic deep audit of threads and concepts. This is read-only analysis plus safe local fixes (callouts, scope notes, summary corrections); structural decisions (merge, split, demote, retire, create) require human approval.

## Health report

Run the repository checks:

```bash
./scripts/validate-page
./scripts/check-links
./scripts/check-sources
./scripts/check-frontmatter
./scripts/orphans
```

Group results rather than repeating the same defect from multiple scripts:

- mechanical errors;
- broken or ambiguous links;
- source/frontmatter desynchronization;
- orphan or index coverage warnings;
- source-fidelity debt;
- transcript-source metadata warnings.

Report exact paths, totals, and the validator's debt status. Do not claim the wiki is healthy merely because scripts exited successfully; inspect warnings and distinguish current defects from accepted debt.

## Debt resolution

1. Read `meta/tech-debt.md` and select the requested entries. Do not silently broaden the audit to unrelated cleanup.
2. Confirm the current defect still exists. Remove stale debt rows rather than "fixing" already-correct pages.
3. Resolve by ownership:
   - mechanical page defects: edit the affected wiki page;
   - broken links: repair the target or remove an unjustified link;
   - source desynchronization: make frontmatter and `## Sources` match actual use;
   - source-fidelity concerns: invoke `verifying-wiki-changes` for the affected page and sources;
   - missing external evidence: perform one focused research question through `verifying-wiki-changes` → `researching-wiki-claims`;
   - raw transcript-body concerns: do not modify the body; correct wiki interpretation or raw frontmatter only.
4. Update `wiki/index.md` when page creation, removal approved by the user, or significant page changes require it.
5. Remove only debt rows actually resolved. Update debt summary/history metadata as required by project conventions.
6. Rerun the checks that detected the issue, then run `./scripts/validate-page` for final repository status.

## Link judgment

Do not create empty stubs merely to make a link checker green.

- Rename a link when an existing page already owns the concept.
- Remove a link when linked text does not warrant an entity page.
- Create a page only when the concept belongs in the wiki and available sources support a useful summary, `## Related`, and `## Sources` section.
- Ask before deleting or merging existing pages.

## Evidence debt

Manual counters are not evidence. Judge the page itself:

- Are material claims attributed to filed sources?
- Are unresolved claims explicit?
- Are contradictions preserved?
- Does a primary source exist for the load-bearing claim?
- Has `unaudited_marginal` accumulated on pages that need a verification pass?

Use `verifying-wiki-changes` to answer those questions. Keep unresolved issues as specific callouts or debt rows rather than resetting a counter and declaring success.

## Deep audit

A distinct invocation mode, not a section of the health report. Use for ontology compression, thread coherence, temporal drift, and theory gaps.

1. Read `wiki/index.md` to map the current ontology.
2. Read every thread page in `wiki/threads/`.
3. For each relevant thread, read linked concept pages at least through their summaries, `## Thread`, `## Related`, and `## Sources` sections.
4. Use `git log --oneline -- wiki/` and targeted `git log -p -- <file>` when temporal drift or contradiction aging matters.
5. Run the five detection passes below.
6. Fix only safe, local semantic markers: clear tension callouts, unfalsifiability flags, merge/scope notes, or small summary corrections.
7. Report structural decisions for the human: merge, split, demote, retire, rewrite, or create.

### Thread coherence

Threads are synthetic essays, not append-only bags of caveats. Audit whether each thread still makes a clear, disprovable claim.

Detect:

- cross-thread tensions where two threads make incompatible assumptions;
- thread theses weakly supported by their linked concepts or sources;
- threads that absorbed contradictions without shifting thesis;
- threads whose opening summary no longer matches their body;
- threads that should be merged, split, or reframed.

### Page quality and scope fit

Judge whether pages deliver on their titles and summaries.

Detect:

- thin pages that should be expanded, merged, or demoted to a section;
- summary blockquotes that overpromise or omit the central claim;
- content-structure misalignment: page title implies a scope the body does not cover;
- pages that have become too broad and need splitting;
- pages with stale sections contradicted or superseded by newer sources.

### Temporal drift

Use git history to understand how the wiki changed over time. The point is not logging; the point is detecting whether recent sources changed the shape of the theory.

Detect:

- pages last updated before several newer relevant sources landed;
- threads whose linked concepts changed after the thread thesis was written;
- contradiction callouts that have aged without resolution;
- concepts whose meaning evolved but whose page presents only the final state;
- recurring topics in recent commits that never received durable structure.

### Ontology compression

This is the anti-accumulation pass. Ask which distinctions have earned permanent structure.

A standalone page is earned when at least one is true:

- it appears in 2+ independent sources;
- it is central to a thread thesis;
- it names a reusable failure mode, workflow pattern, tool pattern, benchmark, or project;
- it is needed as a hub for multiple related pages;
- keeping it inside another page would make that page too long or confused.

A page should be merged, demoted, or retired when:

- it appears in only one source and does not generalize;
- it is a synonym or near-duplicate of an existing page;
- it is mostly a paragraph plus links;
- it exists because an ingest created every named term as a page;
- it is paper-local terminology better handled inside a broader concept page.

### Theory gaps

Look for claims the wiki is clearly accumulating evidence for but has not yet stated.

Detect:

- concept clusters sharing tags and sources with no unifying thread;
- missing middle-layer concepts that would reduce repeated prose across pages;
- existing thread theses that should become sharper or narrower.

## Report

```markdown
## Wiki Audit: HEALTH REPORT | DEBT RESOLUTION | DEEP AUDIT

- Mechanical errors: N
- Warnings: N
- Debt items checked: N
- Resolved: N
- Remaining: N
- Source-fidelity verification: pages and verdicts
- Repository debt status: ...
- Files changed: ...

### Thread Coherence
- `[[thread-name]]` — [healthy / stale / contradicted / unfalsifiable / needs rewrite]. Evidence: [brief basis]. Recommendation: [action].

### Page Quality and Scope
- `[[page-name]]` — [thin / over-broad / title-body mismatch / stale]. Recommendation: [expand / merge / demote / split / rewrite summary].

### Temporal Drift
- `[[page-name]]` — changed sources or git history suggest [drift]. Recommendation: [audit / update / leave alone].

### Ontology Compression
- Merge candidates: `[[a]]` + `[[b]]` → [target or rationale]
- Demote candidates: `[[page]]` → section under `[[parent]]`
- Split candidates: `[[page]]` → [proposed parts]
- Category corrections: `[[page]]` — [current] → [proposed]

### Theory Gaps
- Gap: [missing thesis/concept/thread]. Proposed shape: [draft thesis or page scope].

### Direct Fixes Made
- [file]: [callout/scope note/summary correction]

### Clean
- [areas reviewed with no issues]
```

---
name: researching-wiki-claims
description: "Researches a specific unresolved AgenticWiki claim or entity against authoritative external sources and returns evidence with a FILE, CITE, FIX, FLAG, or REMOVE recommendation. Use in an isolated read-only worker after source-fidelity review identifies an exact external question."
---

# Researching Wiki Claims

Answer one focused external evidence question. Find what credible sources support, qualify, or contradict; do not edit the wiki or create a report file.

This is a report-only skill. The orchestrator decides how to absorb the evidence.

## Worker Capabilities

Require read access to the supplied local context plus public web search and page/document retrieval. The harness should deny local writes, staging, commits, and deletion. Tool names and browser/search implementations are harness choices.

## Input Contract

Require:

- the exact claim or entity to research;
- the wiki page and approximate location;
- why filed raw sources cannot settle it;
- relevant names, dates, versions, projects, or authors;
- the requested decision, such as canonical spelling, role, release date, benchmark result, project status, or primary-document location.

Reject vague requests such as "fact-check this page." Those belong to `verifying-source-fidelity` first.

## Source Priority

Use the best source for the kind of claim:

1. **Primary records:** arXiv papers, official documentation, released datasets, conference talk recordings or transcripts, GitHub releases and tags, project changelogs.
2. **Original reporting and engineering blogs** from established authors or organizations.
3. **Credible specialist sources** with transparent sourcing (recognized practitioners, academic-adjacent blogs, maintainers).
4. **Lower-tier or self-published material** only when it is itself the subject of the claim.

An official announcement is primary evidence of what its issuer announced, not independent proof that every assertion in it is true. Several blogs repeating one original report remain one reporting chain.

Avoid AI summaries, search snippets without reading the source, anonymous forums, and unattributed aggregation.

## Method

1. Form a precise query using distinctive terms and context.
2. Search authoritative sources first.
3. Read the actual source page or document; do not rely on result snippets.
4. Try a materially different query or source route when the first search is inconclusive.
5. Record URLs, publication/document dates, source type, and the exact supporting or contradicting passage.
6. Stop when the question is answered at the strongest practical tier. Do not expand into general background research.

**Query budget:** try at most ~3 materially different query routes. If none resolve the question, return `UNVERIFIED` with the routes tried — do not burn unbounded queries on a question the focused routes did not settle. The output template's "Queries/source routes tried" field captures this.

For papers, search by arXiv ID, title, and authors. For benchmarks, search by benchmark name, model/tool name, and date. For proper nouns, prefer official biographies, contributor pages, project staff pages, and institutional records. For GitHub projects, search the repository, releases, and maintainer posts.

## Assessment

Use one evidence result:

- **CONFIRMED:** strong primary support or genuinely independent high-quality reporting.
- **PARTIALLY CONFIRMED:** the core exists but wording, scope, date, version, or attribution differs.
- **UNVERIFIED:** no credible support found after reasonable focused searches.
- **CONTRADICTED:** credible evidence directly conflicts with the wiki claim.

Search failure does not prove fabrication. Say what was searched and preserve that distinction.

Use one recommendation:

- **FILE:** durable primary/reporting material should become a raw source.
- **CITE:** a narrow authoritative reference is sufficient under project conventions.
- **FIX:** evidence supports a corrected form of the claim.
- **FLAG:** the claim remains relevant but unresolved or weakly supported.
- **REMOVE:** the claim is contradicted or has no defensible basis and should not remain.

## Output

```markdown
## External Evidence: CONFIRMED | PARTIALLY CONFIRMED | UNVERIFIED | CONTRADICTED

- Question: ...
- Wiki location: ...
- Queries/source routes tried: ...

### Evidence
- Source, type, date, URL
  - Relevant passage: "..."
  - Relationship to the claim: ...

### Assessment
- What the evidence establishes and what it does not establish

### Recommendation: FILE | CITE | FIX | FLAG | REMOVE
- Exact action and, for FIX, the smallest accurate replacement
```

Do not write to `archive/web-research/`, `raw/`, or `wiki/`. Return the evidence to the orchestrator.

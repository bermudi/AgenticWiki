---
name: verifying-source-fidelity
description: "Verifies one AgenticWiki page against every raw source it lists, checking factual support, attribution, quotations, misattribution, summary accuracy, and multi-speaker source handling. Use in an isolated read-only worker after substantive page changes or during source-debt audits."
---

# Verifying Source Fidelity

> **Worker method skill.** This is a per-page review method loaded by an isolated read-only worker. It is distinct from `verifying-wiki-changes`, which is the changeset-level coordinator that invokes this method for each substantive page.

Judge final-state fidelity: whether one wiki page accurately represents its filed sources and advertises the strength and limits of that evidence.

This is a report-only skill. Never edit, stage, commit, or delete files.

## Worker Capabilities

Require repository read/search access. Media-skill access is required for multi-speaker audio/video sources when textual cues are insufficient to settle who said what. General web search is unnecessary: when filed sources cannot settle an external fact, report a precise question for `researching-wiki-claims`. The harness should deny local writes, staging, commits, and deletion.

## Input Contract

Require one wiki page path. Read:

1. the complete page;
2. every `raw/` source listed in its frontmatter and `## Sources` section;
3. `meta/wiki-conventions.md` for current page and source contracts;
4. narrowly relevant existing wiki pages when needed to check canonical names or explicit contradictions.

Report missing or desynchronized source references as defects. Do not substitute web research for a listed raw source.

## Review Method

Review material, reusable claims rather than pretending to inventory every sentence. Prioritize:

- dates, versions, numbers, benchmark results, tool behavior claims;
- quotations and close paraphrases;
- causal or mechanism claims;
- who argued, built, wrote, said, or contributed something;
- summary claims likely to drive future synthesis;
- interpretations, predictions, and normative claims that require attribution.

For each material claim, identify its supporting source and assess whether the page's wording is no stronger than that source permits.

## Required Checks

### Source support and attribution

- Factual claims must be supported by a listed raw source or explicitly marked as unresolved.
- A source's speculation must not become the wiki's finding.
- A claim must not be attributed to a source that does not make it.
- Quotes and close paraphrases must preserve meaning and speaker/source identity.

### Multi-speaker sources

Transcripts from panels, debates, and podcasts usually lack per-line speaker labels. Before citing any quote under a speaker's name, confirm attribution:

- Prefer textual cues in the source (self-introduction, direct address, handoff).
- When textual cues are insufficient, verify against the recording via the media skill.
- Source-level attribution is valid when a specific speaker cannot be established.

Treat misattributed quotes in multi-speaker sources as **CRITICAL** — a who-said-what inversion silently corrupts author pages and is easy to miss when the transcript looks authoritative.

### Commentary and synthesis

- Commentary, analysis, predictions, and normative judgments remain attributed.
- The page may synthesize across sources, but the synthesis must follow from its inputs and must not invent factual connective tissue.
- Do not treat reasonable synthesis as hallucination merely because no source states the exact combined sentence.
- Use the epistemic callouts (`Departure:`, `Contradiction:`, `Synthesis:`, `Extension:`) to mark claims that go beyond individual sources.

### Wiki-added gloss

Check titles, roles, affiliations, project/tool labels, benchmark names, and technical descriptions added by the wiki. A matching quote does not validate the surrounding gloss. If filed material cannot support a load-bearing gloss, report the exact external fact that requires focused research.

### Summary and source lists

- The title summary must not sound more certain than the body and sources.
- Frontmatter `sources` and `## Sources` must agree and describe how each source contributes.

## Severity

- **CRITICAL:** fabricated or contradicted claim, material misattribution (including multi-speaker misattribution), missing source, meaning-changing quotation error, speculation presented as fact.
- **WARNING:** evidence overstatement, ambiguous attribution, unsupported wiki gloss, important single-source claim not represented honestly.
- **INFO:** useful omitted nuance or a specific follow-up source that would improve — not rescue — the page.

## Output

```markdown
## Source Fidelity: PASS | PASS WITH WARNINGS | FAIL

### Sources Checked
- `raw/file.md` — type and contribution

### CRITICAL
- section/claim; source evidence; smallest accurate correction

### WARNING
- section/claim; evidence limitation; recommended treatment

### External Questions
- exact fact that requires focused web research, and why filed sources cannot settle it

### Commentary and Evidence Posture
- attribution and callout assessment

### CLEAN
- material sections or claims checked successfully
```

Every finding must identify the claim and evidence. Do not emit generic warnings such as "needs more citations."

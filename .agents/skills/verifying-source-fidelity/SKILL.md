---
name: verifying-source-fidelity
description: "Verifies one AgenticWiki page against its listed raw sources: full mode (every source) for new pages and audits, targeted mode (changed hunks and their sources) for updated pages. Full topology uses an isolated read-only worker; Freebuff uses a fresh baton review pass."
---

# Verifying Source Fidelity

> **Reviewer method skill.** Full topology loads this per-page method in an isolated read-only worker. Freebuff loads it during a fresh baton review pass. It is distinct from changeset-level `verifying-wiki-changes`.

Judge final-state fidelity: whether one wiki page accurately represents its filed sources and advertises the strength and limits of that evidence.

This is report-only while making the judgment. Full-topology workers never edit, stage, commit, or delete. A Freebuff baton pass may switch to fixer only after recording all judgments; then it forfeits approval.

## Review Modes

- **`full`** — the page is new, or the invocation is an audit or debt resolution. Read and verify against **every** `raw/` source listed in the page's frontmatter and `## Sources` section.
- **`targeted`** — the page already exists and a filing updated it. Verify only the claims in the filing's changed hunks and their enclosing sections; read only the sources supporting those claims. The worker derives the changed sections from the staged diff itself, not from a coordinator summary.

Full verification of a page happens when the page is created. Updated pages are not re-read against all sources on every filing — that cost bought almost no findings and is the main reason filings ran long. Defects noticed on unchanged text are reported under scope tagging below, not silently dropped.

## Worker Capabilities

Require repository read/search access. Media-skill access is required for multi-speaker audio/video sources when textual cues are insufficient to settle who said what. General web search is unnecessary: when filed sources cannot settle an external fact, report a precise question for `researching-wiki-claims`. Full topology denies local writes, staging, commits, and deletion; baton mode enforces the same restriction behaviorally during review.

## Input Contract

Require one wiki page path and a review mode. Read:

1. the complete page (for structure and context; in `targeted` mode unchanged sections are not re-verified);
2. the raw sources the mode requires: all listed sources in `full` mode; only those supporting in-scope claims in `targeted` mode;
3. `meta/wiki-conventions.md` for current page and source contracts;
4. narrowly relevant existing wiki pages when needed to check canonical names or explicit contradictions.

Frontmatter `sources:` / `## Sources` agreement is checked in both modes. Report missing or desynchronized source references as defects. Do not substitute web research for a listed raw source.

## Review Method

Review material, reusable claims rather than pretending to inventory every sentence. Prioritize:

- dates, versions, numbers, benchmark results, tool behavior claims;
- quotations and close paraphrases;
- causal or mechanism claims;
- who argued, built, wrote, said, or contributed something;
- summary claims likely to drive future synthesis;
- interpretations, predictions, and normative claims that require attribution.

For each material claim, identify its supporting source and assess whether the page's wording is no stronger than that source permits. In `targeted` mode this applies to in-scope claims only.

## Scope Tagging and Fix Specs

Classify every finding relative to the supplied change scope:

- **IN-SCOPE** — the claim sits anywhere in the page (`full` mode) or in a changed hunk or its enclosing section (`targeted` mode).
- **OUT-OF-SCOPE** — a WARNING/INFO on pre-existing text outside the changed hunks and enclosing sections. Report it and mark it `OUT-OF-SCOPE: route to tech-debt`; it is not fix-routed in this filing. An **OUT-OF-SCOPE CRITICAL stays fix-routable in any round** — through the remediation batch in round 1, through the bounded mechanical-fix loop at close-out — because a fabricated or contradicted claim must not survive the filing as a debt row.

Every CRITICAL and WARNING that should be fixed must carry a **fix spec** the coordinator can verify mechanically:

```markdown
Fix spec: `wiki/path.md` — exact current text → exact replacement text
Basis: source locus or convention supporting the replacement
```

Quote the current text verbatim and minimally so it occurs exactly once in the page, and mirror the same disambiguating context into the replacement so it also occurs exactly once after the repair; when the same error repeats, issue one spec per occurrence with each current/replacement pair context-unique — a bare shared replacement can never close mechanically, and the replacement must not contain the current text verbatim (the closure checker rejects such specs — extend the correction instead). `ADVISORY` is available only to WARNING/INFO findings — advisory findings default to explicit-debt representation instead of a fix round. A CRITICAL always carries a fix spec: when the exact replacement is uncertain, the spec states the smallest accurate correction plus the source evidence so the writer can construct the precise wording.

## Required Checks

### Source support and attribution

- Factual claims must be supported by a listed raw source or explicitly marked as unresolved.
- A source's speculation must not become the wiki's finding.
- A claim must not be attributed to a source that does not make it.
- Quotes and close paraphrases must preserve meaning and speaker/source identity.

### Paraphrase fidelity and wiki voice

For **every material paraphrased claim**, ask whether the source supports the specific framing, not merely the topic. A sentence can be topically correct and still be source-unfaithful. Compare the source and wiki wording for:

- the actor, subject, and object — do not add or swap agency;
- the action and relationship — do not turn “backed off” into “vetoed,” or a reaction into a formal decision;
- modality, quantity, time, and scope — do not turn a hedge into certainty or join separate claims into one;
- intensity and evaluative force — do not escalate “near future” into “foreseeable future,” or “context” into “context window”; and
- source-specific concepts and vocabulary — do not replace “ideology” with “policy,” or otherwise import a wiki term that changes the speaker's frame.

Flag verb/noun drift, merged claims, sharpened causality, added jargon, and meaning-changing substitutions even when every surrounding fact is about the right subject. Preserve the source's distinctions or attribute the stronger interpretation as wiki synthesis rather than presenting it as the source's wording.

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

- Mode: full | targeted
- Scope reviewed: whole page | changed hunks + enclosing sections

### Sources Checked
- `raw/file.md` — type and contribution

### Claim coverage
For substantive pages, enumerate the material claims actually checked (group only genuinely repeated claims). In `targeted` mode, cover the in-scope claims. Include the summary/lede, every load-bearing paraphrase, and numeric slash notation where present:

| Section / claim | Raw source and location | Attribution / framing check | Result |
|---|---|---|---|
| ... | ... | actor, action, modality, source-specific vocabulary | supported / drift / unresolved |

### CRITICAL
- section/claim; source evidence; IN/OUT-OF-SCOPE; fix spec + basis

### WARNING
- section/claim; evidence limitation; IN/OUT-OF-SCOPE; fix spec + basis, or ADVISORY

### OUT-OF-SCOPE
- pre-existing defects noted but not fix-routed in this filing (CRITICALs excepted); candidates for `meta/tech-debt.md`

### External Questions
- exact fact that requires focused web research, and why filed sources cannot settle it

### Commentary and Evidence Posture
- attribution and callout assessment

### CLEAN
- material sections or claims checked successfully
```

Every finding must identify the claim and evidence. Do not emit generic warnings such as "needs more citations."

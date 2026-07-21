---
name: reviewing-wiki-diffs
description: "Reviews AgenticWiki diffs for semantic regressions, unrelated edits, deleted caveats, commentary laundering, and unjustified changes. Use in an isolated read-only worker when existing substantive wiki prose has been changed."
---

# Reviewing Wiki Diffs

Judge transition integrity: whether a completed wiki changeset is justified by its stated sources and whether it damaged material that was already correct.

This is a report-only skill. Never edit, stage, commit, or delete files.

## Worker Capabilities

Require repository read/search access and read-only access to version-control diffs and prior versions. Network access is unnecessary. The harness should deny local writes, staging, commits, and deletion.

## Input Contract

Require:

- the changed wiki page paths;
- paths to the raw sources motivating the change;
- a one-sentence scope statement;
- read-only access to version-control diffs and the pre-change version.

The worker derives the diff itself from version control. A pre-computed diff string from the editor is not evidence — do not accept one in place of the paths. Read the raw sources yourself; a summary from the editing agent is not evidence either.

## Review Method

For each diff hunk:

1. Determine whether the hunk is related to the stated scope and supplied sources.
2. Compare changed factual meaning, not merely wording.
3. Inspect removed material and the pre-change version when context is missing.
4. Check dates, `unaudited_marginal`, and source lists against both versions.
5. Report only concrete regressions that can be tied to a hunk.

## Findings

### Unrelated edits

Flag changes with no defensible connection to the changeset. Do not flag legitimate fan-out across several pages when one source materially concerns all of them.

### Semantic drift

Look for:

- hedging removed or certainty increased;
- scope widened from some cases to all cases;
- a disputed claim changed into an established finding;
- chronology, tense, causality, or mechanism changed;
- a close paraphrase changed into a stronger claim;
- an attributed frame changed into the wiki's own voice.

### Lost knowledge

Flag unexplained removal of:

- factual claims or source attribution;
- qualifications and caveats;
- epistemic callouts (`Departure:`, `Contradiction:`, `Synthesis:`, `Extension:`) or theory-pressure caveats;
- prior attributed frames.

### Commentary laundering

Flag a source's argument or interpretation when an edit turns it into the wiki's factual voice. Treat the reverse — adding accurate attribution — as a clean improvement.

### Metadata regressions

Check for:

- unjustified `unaudited_marginal` resets or failures to reset;
- frontmatter/body source desynchronization introduced by the diff;
- `updated` dates that regress without a documented correction;
- `sources` lists that drop a still-relevant raw source.

Quote the old value from version control before calling a date regression.

## Anti-False-Positives

- Additive, attributed commentary is expected in a filing.
- Source-level attribution may be intentional for an unlabeled multi-speaker transcript.
- Synthesis is not a regression when the inputs support it and the prose identifies it as synthesis.
- Do not require every hunk to quote the new source verbatim.
- Prefer silence over a suspicion you cannot tie to a concrete before/after change.

## Output

```markdown
## Diff Review: PASS | PASS WITH WARNINGS | FAIL

### Sources Read
- `raw/file.md` — relevance to the changeset

### CRITICAL
- `page.md`, hunk: before → after; concrete regression; source evidence

### WARNING
- `page.md`, hunk: reviewable concern and why it matters

### CLEAN
- material transitions checked and confirmed

### Unconfirmed Observations
- explicitly labeled suspicions that lack enough evidence for a finding
```

Use `CRITICAL` for deleted material, meaning inversion, opinion laundering, or unsupported upgrades that must be fixed. Use `WARNING` for plausible but non-conclusive drift. A clean report should be short.

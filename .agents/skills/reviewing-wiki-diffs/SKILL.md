---
name: reviewing-wiki-diffs
description: "Reviews AgenticWiki diffs for semantic regressions, unrelated edits, deleted caveats, commentary laundering, and unjustified changes. Full topology uses an isolated read-only worker; Freebuff uses a fresh baton review pass."
---

# Reviewing Wiki Diffs

Judge transition integrity: whether a completed wiki changeset is justified by its stated sources and whether it damaged material that was already correct.

This is report-only while making the judgment. Full-topology workers never edit, stage, commit, or delete. A Freebuff baton pass may switch to fixer only after recording the judgment; then it forfeits approval.

## Worker Capabilities

Require repository read/search access and read-only access to version-control diffs and prior versions. Network access is unnecessary. Full topology denies local writes, staging, commits, and deletion; baton mode enforces the same restriction behaviorally during review.

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

### Fix specs

Every CRITICAL and WARNING that should be fixed must carry a fix spec the coordinator can verify mechanically:

```markdown
Fix spec: `wiki/path.md` — exact current text → exact replacement text
Basis: pre-change version, source, or convention supporting the replacement
```

Quote the current text verbatim and minimally so it occurs exactly once in the page, and mirror the same disambiguating context into the replacement so it also occurs exactly once after the repair; when the same error repeats, issue one spec per occurrence with each current/replacement pair context-unique — a bare shared replacement can never close mechanically, and the replacement must not contain the current text verbatim (the closure checker rejects such specs — extend the correction instead). `ADVISORY` is available only to WARNING findings — a CRITICAL always carries a fix spec: when the exact replacement is uncertain, the spec states the smallest accurate correction plus the evidence so the writer can construct the precise wording. Advisory findings default to explicit-debt representation instead of a fix round.

## Close-Out Re-Review

After a remediation pass, the diff reviewer runs once more in close-out mode. Input: the remediated page paths, the pre-remediation staged versions (the coordinator supplies the recorded OIDs from round 1), and the fix ledger.

Judge only the remediation delta — did each fix land, and did the fix hunks introduce regressions? Do not reopen the original diff or issue findings on unchanged text; defects noticed elsewhere go under `OUT-OF-SCOPE` as debt candidates — **CRITICALs excepted**, which stay fix-routable through the bounded mechanical-fix loop (a fabricated or contradicted claim never becomes a debt row) and therefore carry a fix spec like any other CRITICAL. New findings use the normal severity vocabulary, but they never trigger a third review round: new CRITICALs get one bounded mechanical fix, new warnings become debt representation.

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
- `page.md`, hunk: before → after; concrete regression; source evidence; fix spec + basis

### WARNING
- `page.md`, hunk: reviewable concern and why it matters; fix spec + basis, or ADVISORY

### OUT-OF-SCOPE
- pre-existing defects outside this changeset's hunks, noted as `meta/tech-debt.md` candidates; no edit proposed in this filing

### CLEAN
- material transitions checked and confirmed

### Unconfirmed Observations
- explicitly labeled suspicions that lack enough evidence for a finding
```

Use `CRITICAL` for deleted material, meaning inversion, opinion laundering, or unsupported upgrades that must be fixed. Use `WARNING` for plausible but non-conclusive drift. A clean report should be short.

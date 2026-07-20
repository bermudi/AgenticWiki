---
name: verifying-wiki-changes
description: "Verifies bounded AgenticWiki changes for mechanical integrity, semantic regressions, source fidelity, attribution, and theory-aware prose. Use after filing sources, after substantive page edits, during focused debt resolution, or when asked to verify wiki pages against raw sources."
---

# Verifying Wiki Changes

> **Coordinator skill.** This is the changeset-level coordinator that runs the whole verification flow and returns the changeset verdict. It is distinct from `verifying-source-fidelity`, which is a worker method for reviewing one page against its sources. It is also distinct from `reviewing-wiki-theory`, which runs before verification as a separate human-gated theory pass.

Verify one completed changeset through a small interface: changed pages, changed raw sources, and the diff that connects them.

This skill is read-mostly. Reviewers report; the orchestrating agent applies any fixes and reruns affected checks.

> **Terminology note.** "The orchestrator" in this skill means the agent that dispatched verification and will apply fixes — in the filing pipeline that is `coordinating-filing`, not the writer. The writer stages and reports; the coordinator dispatches verification, routes fix requests back to the writer, and holds the commit gate. When this skill says "the orchestrator stages exactly the intended changeset paths," that staging was done by the writer and checked by the coordinator before verification was dispatched.

> **Deterministic checks are load-bearing; LLM verdicts flag where to look.** The `PASS`/`FAIL` verdicts below are LLM judgments, not ground truth. A clean `validate-page` run plus a `PASS` verdict is a contradiction for the human to resolve, not a signal to auto-trust either way. Treat mechanical validator output as the hard floor and reviewer verdicts as directed attention — when they agree, confidence rises; when they disagree, investigate before committing.

## Input Contract

Establish before verification:

- `wiki_pages`: every changed wiki page, including `wiki/index.md` when relevant;
- `raw_sources`: every source created or modified for the changeset;
- `external_lookup`: whether web research is permitted;
- `scope`: the filing, audit item, or edit the changeset is meant to accomplish.

The changeset boundary is the **staged set**, not a judgment call. Before verification, the orchestrator stages exactly the intended changeset paths (`git add -- <paths>`). Reviewers audit `git diff --cached -- <paths>` and the pre-change version through version control. Do not pre-filter what reviewers see — if unrelated changes are sitting in the worktree, leave them unstaged rather than hiding them from reviewers. Verification must not bless, repair, stage, or summarize someone else's edits as part of this changeset.

## Risk Classification

Classify each changed wiki page by its highest-risk change.

| Risk | Examples | Required review |
|---|---|---|
| Mechanical | `updated:` frontmatter, formatting, link repair, index entry, source annotation with no new claim | Mechanical validation |
| Substantive | New or changed factual prose (including dates, version numbers, benchmark results), synthesis, attributed commentary, summary rewrite | Mechanical + source verification |
| High | Quotes, numbers, named-speaker attribution, disputed empirical claims, claims about tool behavior or workflow efficacy | Mechanical + source verification; external lookup for concrete unresolved facts |

If existing substantive prose was removed or rewritten, run diff reasoning regardless of the page's final-state risk.

Run quality review for a new page, a substantial rewrite or reorganization, or material thread synthesis. Skip it for narrow additive updates that preserve the page's existing structure.

## 1. Mechanical validation

For each changed page, run:

```bash
./scripts/validate-page <page-path>
git diff --check -- <page-path>
```

Inspect the page-specific findings. The current validator may also emit repository-wide debt status even when given one page; report that global status separately and do not treat unrelated historical debt as a changeset failure.

**Mechanical classification floor.** Before classifying a page as Mechanical, check the staged body-prose diff for digits, quotation marks, or capitalized multi-word proper-noun patterns. If any are present in a changed hunk, the page cannot be classified Mechanical — body prose containing factual markers is substantive at minimum. This is a crude guard; its job is to convert the worst self-serving misclassification (substantive → mechanical, silently skipping source verification) from undetectable to impossible. Every Mechanical classification must also include one line of justification in the verdict report stating why the change is non-claim.

For new or changed raw sources, inspect frontmatter against `meta/wiki-conventions.md` and confirm:

- `type` is present and truthful (`arxiv`, `web`, `youtube`);
- for `arxiv`: `arxiv_id` and `url` are present; filename uses `<arxiv-id>.md` (version suffix allowed);
- for `web`: `url` and `title` are present; `date` or `ingested` is present;
- for `youtube`: `url`, `title`, and `channel` are present; `speakers` is present for multi-speaker sources;
- `date_saved`/`ingested` is distinct from publication/document date where applicable;
- referenced files exist;
- a transcript stub does not claim complete text;
- transcript bodies were not rewritten;
- the PDF is not staged for an arXiv paper.

Mechanical errors introduced by the changeset block completion.

## Constructing reviewers and research workers

Reviewer expertise lives in common skills, not harness-specific agent definitions. For each review, ask the current harness to construct a fresh isolated worker, grant only the capabilities below, and instruct that worker to load the named reviewer skill.

- The harness chooses its native agent/subagent mechanism and tool vocabulary.
- Give the worker paths and scope, not a prose summary in place of evidence.
- Require read-only operation and the skill's structured report.
- Do not depend on a harness-specific prompt tree (e.g., `.pi/agents/`, `.commandcode/agents/`, `.mimocode/agents/`, `.devin/agents/`). Reviewer expertise lives in the common reviewer skills under `.agents/skills/`.

**Reviewers** return a verdict that maps to the changeset state and gates the commit:

| Skill | Required capabilities | Forbidden capabilities |
|---|---|---|
| `reviewing-wiki-diffs` | Read/search files; inspect version-control diffs and prior versions | Local writes, network, staging, commit, deletion |
| `verifying-source-fidelity` | Read/search files; media-skill access for multi-speaker audio/video sources | Local writes, staging, commit, deletion |
| `reviewing-wiki-quality` | Read/search files | Local writes, network, staging, commit, deletion |

**Research tools** return information the orchestrator uses; they do not return a verdict and do not gate the commit. Invoked on demand when a reviewer surfaces an unresolved external question:

| Skill | Required capabilities | Forbidden capabilities |
|---|---|---|
| `researching-wiki-claims` | Read supplied local context (the focused claim, its wiki page, and the reason filed sources cannot settle it — see the skill's Input Contract); web search and page retrieval | Local writes, staging, commit, deletion |

Workers may run in parallel only when their inputs do not require writes. One writer per changeset: the active operation skill (filing or audit) is the writer; delegated reviewers are always read-only.

## 2. Transition integrity

When existing substantive page content changed, construct one isolated worker and have it load `reviewing-wiki-diffs`.

Give it:

- the changed wiki page paths;
- the raw source paths;
- the stated changeset scope.

The worker runs `git diff --cached -- <paths>` itself and reads the pre-change version through version control. A pre-computed diff string from the editor is not evidence — the worker must inspect the repo state directly. Do not pass an editorial narrative in place of the source files.

## 3. Final-state source fidelity

For every substantive or high-risk page, construct a fresh isolated worker and have it load `verifying-source-fidelity`. Use one page per review task and require it to read every raw source listed by that page.

The worker follows that skill's report-only contract. Independent page reviews may run in parallel because they do not write files.

## 4. Editorial quality

For a new page, substantial rewrite or reorganization, or material thread synthesis, construct one isolated worker and have it load `reviewing-wiki-quality`.

Give it the complete changed page set and identify which pages are new or substantially rewritten. The worker checks structure, clarity, context, chronology, navigation, and thread quality without repeating mechanical validation or source verification.

Narrow additive updates do not need this review. Quality review is one focused pass, not a replacement editor farm.

## 5. Focused external research

For a concrete unresolved question surfaced by source-fidelity review or raw-source preparation, construct an isolated worker and have it load `researching-wiki-claims`. This is a research tool, not a reviewer — it returns evidence and a recommendation (`FILE`/`CITE`/`FIX`/`FLAG`/`REMOVE`), not a verdict that gates the commit. The orchestrator decides how to absorb the evidence.

Appropriate questions include:

- locating a public primary document (arXiv paper, conference talk, GitHub repo release);
- confirming a version, release date, benchmark result, project name, or author attribution;
- canonicalizing a transcript proper noun;
- checking a material claim absent from all filed sources.

Do not externally "verify" attributed opinions or predictions. Do not launch broad research because a manual counter crossed an arbitrary threshold.

Source priority when multiple sources exist: arXiv papers and official documentation first, then engineering blogs and conference talks, then GitHub repos and issue threads, then general commentary.

Require URLs, relevant excerpts, source classification, confidence, and one recommendation:

- `FILE` the source when its durable content materially supports the wiki;
- `CITE` when a narrow authoritative reference is sufficient under project conventions;
- `FIX` inaccurate prose;
- `FLAG` an unresolved claim explicitly;
- `REMOVE` a fabricated or unjustifiable claim.

The worker returns evidence to the orchestrator. It does not edit wiki pages or create a parallel summary layer. The orchestrator then either cites the evidence inline on the relevant wiki page or, when the source is durable and materially supports the wiki, hands it back to the coordinator for raw preservation (raw preservation is `coordinating-filing` step 2; `filing-agentic-sources` is the writer and does not preserve raw sources). Research evidence lives in chat, then on the wiki page or in `raw/` — not in a parallel summary layer.

## 6. Remediation and rerun

The orchestrating agent reads the cited evidence before applying a reviewer recommendation.

- Fix factual errors, misattributions, evidence overstatement, and mechanical breakage.
- Preserve unresolved but valuable claims with accurate attribution and an explicit callout.
- Do not harden weak evidence merely to obtain a passing verdict.
- Do not defer new critical problems in pages touched by this changeset.
- Rerun source verification when a fix changes claim meaning or sourcing.
- Rerun diff reasoning when a fix substantially rewrites existing prose.
- Rerun quality review when remediation materially reorganizes a page or changes thread chronology.
- Rerun mechanical validation for every edited page.

> **Filing pipeline routing.** In the filing pipeline, the orchestrator is `coordinating-filing` and fixes are applied by the writer (`filing-agentic-sources`), not the coordinator directly. The coordinator routes reviewer findings back to the writer with the specific fixes needed; the writer applies them, re-stages, and re-reports; the coordinator reruns only the affected checks. This routing does not apply when `verifying-wiki-changes` is invoked outside the filing pipeline (e.g., from `auditing-agentic-wiki`), in which case the invoking orchestrator applies fixes directly.

## Verdict

### Translating reviewer verdicts

Reviewer workers use the verdict vocabulary `PASS` / `PASS WITH WARNINGS` / `FAIL`. The orchestrator collapses them into exactly three changeset states:

| Reviewer verdict | Coordinator mapping |
|---|---|
| `PASS` | No contribution to changeset failure. |
| `PASS WITH WARNINGS` | `PASS WITH EXPLICIT DEBT` if any WARNING surfaces an honest evidence gap that remains unresolved and is represented in page metadata/callouts/debt rows. Otherwise `PASS` (WARNING was addressed or was a non-blocking observation). |
| `FAIL` (diff review, source fidelity, quality) | `FAIL` unless the orchestrator fixes every CRITICAL finding and reruns the affected review, after which the rerun's verdict controls. |

A reviewer `FAIL` is never silently downgraded to `PASS`. It either becomes `PASS` after a verified fix and rerun, or it stays `FAIL`.

### Changeset verdict

Return exactly one changeset verdict:

- **PASS** — no unresolved critical findings; changed claims are source-faithful; mechanical checks pass.
- **PASS WITH EXPLICIT DEBT** — no unresolved critical findings, but clearly marked evidence gaps remain and are represented honestly in page metadata/callouts and, when appropriate, `meta/tech-debt.md`.
- **FAIL** — a critical fidelity or mechanical problem remains, a necessary source is unavailable, or verification could not be completed.

Report:

```markdown
## Verification: PASS | PASS WITH EXPLICIT DEBT | FAIL

- Scope: ...
- Pages mechanically checked: ...
- Pages source-verified: ...
- Diff reasoning: run | not required
- External research: questions researched, sources found, actions taken
- Fixed: ...
- Remaining explicit debt: ...
- Unrelated repository health: ...

### Reviewer verdict ledger

For each reviewer invocation, disclose the verbatim verdict returned, the coordinator mapping applied, and any fix→rerun pair. This is the one place a reviewer's judgment can be quietly downgraded — do not summarize it away.

| Reviewer | Page/scope | Verbatim verdict | Coordinator mapping | Fix applied | Rerun verdict |
|---|---|---|---|---|---|
| `reviewing-wiki-diffs` | ... | `PASS` / `PASS WITH WARNINGS` / `FAIL` | `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` | ... | ... |
| `verifying-source-fidelity` | ... | ... | ... | ... | ... |
| `reviewing-wiki-quality` | ... | ... | ... | ... | ... |

### External research log

For each `researching-wiki-claims` invocation, disclose the question researched, the recommendation returned, and the action taken. Research tools do not return verdicts and are not part of the verdict ledger above.

| Question | Recommendation | Action taken |
|---|---|---|
| ... | `FILE` / `CITE` / `FIX` / `FLAG` / `REMOVE` | ... |

### Mechanical classification justifications

For every page classified Mechanical, one line stating why the change is non-claim (e.g., "`updated:` frontmatter only; no body-prose hunks").
```

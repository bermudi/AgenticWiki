---
name: verifying-wiki-changes
description: "Verifies bounded AgenticWiki changes for mechanical integrity, semantic regressions, source fidelity, attribution, and theory-aware prose. Use after filing sources, after substantive page edits, during focused debt resolution, or when asked to verify wiki pages against raw sources."
---

# Verifying Wiki Changes

> **Verification orchestration skill.** Full topology loads this inline in `coordinating-filing` to classify risk and dispatch fresh isolated read-only reviewers. In Freebuff baton topology, a fresh top-level review/fix pass loads it and runs the named reviewer skills directly; only a complete zero-delta pass may approve. Do not create a nested verifier worker.

Verify one completed changeset through a small interface: changed pages, changed raw sources, and the staged diff that connects them.

This skill is read-mostly. It may inspect staged diffs only for mechanical checks, risk classification, reviewer construction, and verdict translation. It must not perform diff-integrity, source-fidelity, or quality judgment inline. Reviewers report; the orchestrator routes fixes to the owner and reruns affected checks.

> **Terminology note.** In full-topology filing, “the orchestrator” is `coordinating-filing`, which routes fixes to the writer and holds the gate. In Freebuff it is the active fresh review/fix pass, whose mutation status is enforced by `scripts/filing-baton`.

> **Deterministic checks are load-bearing; LLM verdicts flag where to look.** The `PASS`/`FAIL` verdicts below are LLM judgments, not ground truth. A failing `validate-page` run plus a reviewer `PASS` is a contradiction to resolve, not a signal to ignore the validator. Treat mechanical output as the hard floor and reviewer verdicts as directed attention — when they agree, confidence rises; when they disagree, investigate before committing.

## Input Contract

Establish before verification:

- `wiki_pages`: every changed wiki page, including `wiki/index.md` when relevant;
- `raw_sources`: every source created or modified for the changeset;
- `external_lookup`: whether web research is permitted;
- `scope`: the filing, audit item, or edit the changeset is meant to accomplish;
- `process_artifacts`: any coordinator-owned ledger paths included in the staged changeset, or `none`.

A filing label such as `marginal` or `full` does not select reviews. Classify the actual staged changes under the rules below; even a marginal ingest must receive this skill's verdict before commit.

The changeset boundary is the **staged set**, not a judgment call. Before verification, the orchestrator stages exactly the intended changeset paths (`git add -- <paths>`). Record exact staging commands when the harness exposes them; staged-state parity cannot prove that `git add -A` was never run. Immediately before reviewer dispatch and again before commit, require full-boundary cached/worktree parity with `test -z "$(git diff --name-only -- <all-changed-paths>)"`; reviewers read worktree files and must see the same bytes that are staged. Reviewers audit `git diff --cached -- <paths>` and the pre-change version through version control. Do not pre-filter what reviewers see — if unrelated changes are sitting in the worktree, leave them unstaged rather than hiding them from reviewers. Verification must not bless, repair, stage, or summarize someone else's edits as part of this changeset.

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

For each changed wiki content page, run the content validator. Run cached whitespace and parity checks on the full staged union, including coordinator-owned process artifacts; do not pass `meta/` ledgers to the content validator:

```bash
./scripts/validate-page <changed-wiki-content-paths>
git diff --cached --check -- <all-changed-paths>
test -z "$(git diff --name-only -- <all-changed-paths>)"
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
- existing raw files were not modified; corrected/new artifacts are new files with the expected provenance;
- the PDF is not staged for an arXiv paper.

Mechanical errors introduced by the changeset block completion.

## Constructing reviewers and research workers

Reviewer expertise lives in common skills, not harness-specific agent definitions. For each review, ask the current harness to construct a fresh isolated worker, grant only the capabilities below, and instruct that worker to load the named reviewer skill.

- The harness chooses its native agent/subagent mechanism and tool vocabulary.
- Give the worker paths and scope, not a prose summary in place of evidence.
- Require read-only operation and the skill's structured report.
- Do not depend on a harness-specific prompt tree (e.g., `.pi/agents/`, `.commandcode/agents/`, `.mimocode/agents/`, `.devin/agents/`). Reviewer expertise lives in the common reviewer skills under `.agents/skills/`.

### Freebuff baton adapter

Freebuff is the explicit exception to worker dispatch, not to independent review. A fresh top-level pass that did not write the current staged OIDs runs theory, diff, source-fidelity, and quality judgments against the complete boundary. In the sections below, “construct a worker” maps to “load and execute this named reviewer skill in the active fresh baton pass and record the session identifier.”

Reviewer skills remain report-only while making their judgments. Because the top-level pass has write tools, enforcement is temporal: finish and record the judgments before switching to fixer role. A fixer pass cannot approve; any final index/tree delta must finish as `changed`, and a never-before-used session reviews again. A clean pass requires all four mapped rows, a non-empty evidence note, and zero delta. Exact row values are `PASS`, `PASS WITH EXPLICIT DEBT: <where represented>`, or `SKIPPED: <risk-rule reason>`. `CARRIED` is unavailable in baton mode. A capable harness must not use this adapter merely to avoid worker dispatch.

### Mandatory reviewer dispatch

The following worker requirement applies literally in full topology and maps to the baton adapter above in Freebuff. “Construct a worker” is a hard process requirement, not a suggestion to perform the same review in the full-topology coordinator context. For every initially required diff, source-fidelity, and quality review, the inline verifier dispatches a fresh isolated read-only worker through the harness. The only reuse is an OID-identical same-run aggregation rerun caused solely by staging coordinator-owned ledger evidence, as defined in Verdict; any content edit requires the affected fresh review again. In Pi, this is the `delegate` adapter with one task object per reviewer; other harnesses use native equivalents. The verifier may classify risk, assemble inputs, route findings, and translate verdicts; it must not perform reviewer file-reading and judgment inline or by a manual substitute.

Do not dispatch a separate verifier worker and then ask it to nest reviewer workers. The active orchestrator runs this skill directly and owns reviewer dispatch. Each reviewer must have repository read/search access and return the named skill's structured report. If reviewer dispatch is unavailable, the worker cannot read the repository, or dispatch returns an empty/no-op result after the documented retry, stop and warn the user. Verification is incomplete; do **not** issue a PASS or fall back to inline/manual review. Record the unavailable review as a process failure and hold the commit gate.

**Reviewers** return a verdict that maps to the changeset state and gates the commit:

| Skill | Required capabilities | Forbidden capabilities |
|---|---|---|
| `reviewing-wiki-diffs` | Read/search files; inspect version-control diffs and prior versions | Local writes, network, staging, commit, deletion |
| `verifying-source-fidelity` | Read/search files; media-skill access for multi-speaker audio/video sources | Local writes, staging, commit, deletion |
| `reviewing-wiki-quality` | Read/search files | Local writes, network, staging, commit, deletion |

These capability-denial rows apply literally to dispatched full-topology workers. In baton mode they describe the review phase's behavioral contract; the top-level pass must not use its write tools until it has finished the judgments and forfeited approval.

**Research tools** return information the orchestrator uses; they do not return a verdict and do not gate the commit. Invoked on demand when a reviewer surfaces an unresolved external question:

| Skill | Required capabilities | Forbidden capabilities |
|---|---|---|
| `researching-wiki-claims` | Read supplied local context (the focused claim, its wiki page, and the reason filed sources cannot settle it — see the skill's Input Contract); web search and page retrieval | Local writes, staging, commit, deletion |

Workers may run in parallel only when their inputs do not require writes. There is one authoritative writer **at a time**: a multi-source filing may invoke fresh per-source writers sequentially against one cumulative staged changeset, while audit remediation uses its active operation writer. Delegated reviewers are always read-only.

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

The worker returns evidence to the orchestrator. It does not edit wiki pages or create a parallel summary layer. During full-topology filing, every citation/edit and durable-source preservation request is routed to the authoritative shared-checkout writer; the coordinator checks and stages the reported raw path. In Freebuff, the active pass may preserve/cite only after switching to fixer role, which forces another fresh review. Outside filing (for example, authorized audit remediation), the active operation writer may absorb the evidence. Research evidence lives in chat, then on the wiki page or in `raw/` — not in a parallel summary layer.

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

> **Filing pipeline routing.** Full topology routes fixes through the authoritative writer (`filing-agentic-sources`), not the coordinator. In Freebuff baton mode, the active review pass may explicitly switch to fixer role, apply and stage fixes, then must finish as `changed` and stop for another fresh review. Outside filing (for example, an authorized audit remediation), the invoking orchestrator applies fixes directly and reruns affected checks.

## Verdict

### Translating reviewer verdicts

Reviewer workers use the verdict vocabulary `PASS` / `PASS WITH WARNINGS` / `FAIL`. Before final aggregation, record the staged blob OID set for every content path supplied to each reviewer. The orchestrator collapses them into exactly three **final** changeset states:

| Reviewer verdict | Coordinator mapping |
|---|---|
| `PASS` | No contribution to changeset failure. |
| `PASS WITH WARNINGS` | `PASS WITH EXPLICIT DEBT` if a WARNING leaves an honest unresolved gap and the staged boundary contains the representation required by AGENTS.md Rule 9: reader-facing page callout, content/artifact debt row, process-recommendation row, or both as applicable. Otherwise `PASS` (the WARNING was addressed or was a non-blocking observation). |
| `FAIL` (diff review, source fidelity, quality) | `FAIL` unless the orchestrator fixes every CRITICAL finding and reruns the affected review, after which the rerun's verdict controls. |

A reviewer `FAIL` is never silently downgraded to `PASS`. It either becomes `PASS` after a verified fix and rerun, or it stays `FAIL`.

If honest unresolved debt lacks the representation required by AGENTS.md Rule 9 inside the staged boundary, return **DEBT REGISTRATION REQUIRED** as an internal hold, not a final verdict. Route a required page callout/metadata edit to the writer and rerun every affected content reviewer; ledger-only OID reuse is not valid after that content edit. Add `meta/tech-debt.md` for structural, recurring, artifact-level, or out-of-scope content debt, and use `meta/pipeline-recommendations.md` for workflow/process recommendations. If same-run process evidence must be added after review, return **PROCESS EVIDENCE STAGING REQUIRED**. The coordinator stages the exact ledger change, rebuilds parity/deterministic checks, proves every reviewed content OID unchanged, and reruns aggregation. Exact same-run reviewer reports may be reused only for this ledger-only rerun; no content edit or cross-run reuse is allowed. Only the rerun emits one of the three final verdicts.

### Changeset verdict

Return exactly one changeset verdict:

- **PASS** — no unresolved critical findings; changed claims are source-faithful; mechanical checks pass.
- **PASS WITH EXPLICIT DEBT** — no unresolved critical findings, but honest unresolved gaps remain and each has the Rule 9 representation required for its type inside the verified staged boundary: page callout, content/artifact debt row, process-recommendation row, or both as applicable.
- **FAIL** — a critical fidelity or mechanical problem remains, a necessary source is unavailable, or verification could not be completed.

Report:

```markdown
## Verification: PASS | PASS WITH EXPLICIT DEBT | FAIL

- Scope: ...
- Review topology: full = one isolated read-only worker per required review; Freebuff = one fresh zero-delta pass running all four named methods; unavailable applicable topology = incomplete
- Process telemetry: full topology records worker/task, read-only capability, dispatch result, and retries; baton records session/path/inode plus every state/OID transition; exact staging commands are included when exposed and never inferred from final state
- Pages mechanically checked: ...
- Pages source-verified: ...
- Diff reasoning: run | not required
- External research: questions researched, sources found, actions taken
- Fixed: ...
- Remaining explicit debt: ...
- Unrelated repository health: ...

### Reviewer verdict ledger

For each reviewer invocation, disclose the verbatim verdict returned, the coordinator mapping applied, and any fix→rerun pair. This is the one place a reviewer's judgment can be quietly downgraded — do not summarize it away.

| Reviewer | Page/scope + reviewed staged OIDs | Verbatim verdict | Coordinator mapping | Fix applied | Rerun verdict |
|---|---|---|---|---|---|
| `reviewing-wiki-theory` (baton, or reference the earlier full-topology gate) | ... | `PASS` / `PASS WITH WARNINGS` / `FAIL` | `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` | ... | ... |
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

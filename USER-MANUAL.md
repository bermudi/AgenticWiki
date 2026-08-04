# AgenticWiki User Manual

> Start here. This document explains how to operate AgenticWiki as its human owner. The files under `.agents/` are instructions for agents; you should not need to read them to use the wiki.

## The short version

AgenticWiki turns sources about AI-assisted development into a connected map of concepts, projects, authors, and evolving theories.

You can ask an agent to:

1. **file a source** into the wiki;
2. **answer a question** from material already filed;
3. **audit** repository or theory health;
4. **resolve named technical debt**;
5. **explain repository state** without changing anything.

Nothing runs in the background. No filing, cleanup, theory review, or audit happens merely because a plan names it. An active agent session must be asked to perform the operation.

## Copyable requests

### File a source

> File this source into AgenticWiki. Run the complete theory and verification pipeline, fix all resolvable findings, record legitimate unresolved debt, and commit only after the final gate passes. Explain the result in plain English. Source: `<URL or file>`

### File a source without committing

> File this source, run the complete pipeline, but stop before commit. Leave the verified changes staged for inspection and explain what changed. Source: `<URL or file>`

A filing request authorizes the coordinator to commit after `PASS` or properly recorded `PASS WITH EXPLICIT DEBT`. You do not need to perform a second QA pass. Say **“stop before commit”** when you want to inspect the verified staged changes first.

### Preview a source without filing it

> Give me an informal read-only assessment of whether this source looks worth filing. Do not create, move, edit, stage, or commit anything.

This is an informal preview outside the filing pipeline, not the writer’s formal full/marginal/skip decision.

### Ask the existing wiki a question

> Answer this from AgenticWiki’s filed sources. Separate source claims, attributed interpretation, wiki synthesis, contradictions, and uncertainty. Do not search the web or edit files.

Add “search the web” only when you want information beyond the filed collection.

### Verify an already staged changeset

> Verify the currently staged AgenticWiki changes. Do not fix, restage, or commit anything. Report mechanical results, required independent reviews, verdict, and blockers in plain English.

### Check repository health

> Run a read-only AgenticWiki health audit. Report mechanical problems, broken links, source-metadata mismatches, and registered source-fidelity debt in plain English. Do not edit, stage, or commit anything.

### Check theory health

> Run a read-only deep theory audit. Tell me which threads are coherent, stale, contradicted, too broad, or missing. Do not create, edit, stage, or commit any file, including callouts, scope notes, or summary corrections.

Without the explicit read-only sentence, a deep audit may apply small local callouts, scope notes, or summary corrections and commits them after the audit gate passes. Add “stop before commit” to leave those verified fixes staged instead. It still cannot merge, split, demote, delete, retire, or create major structure without your approval.

### Resolve debt

> Resolve this AgenticWiki debt item: `<row or exact issue>`. Run required verification and commit only after the final gate passes. Report the resolved issue, remaining debt, and commit hash.

Debt cleanup happens only when requested. A debt-resolution request authorizes the bounded fixes and their commit after verification. Add **“stop before commit”** when you want the verified audit changes left staged instead.

### Ask what is happening

> Give me an operator status report in plain English: what has finished, what is running, what failed, what is waiting for me, what files are staged, and whether anything was committed. Do not change anything.

Use this whenever an agent report becomes procedural or obscure.

## What happens when a source is filed

| Stage | What happens | Who does it | Can it stop? |
|---|---|---|---|
| 1. State check | The coordinator checks existing staged and uncommitted work so unrelated files are not absorbed. | Coordinator | Yes—pre-existing staged work needs a decision. |
| 2. Preserve source | The URL or local file is saved under `raw/` with source-identifying metadata. A supplied local file is moved into `raw/`, not copied. Papers may be extracted to Markdown. | Coordinator | Yes—failed extraction or missing source details block filing. |
| 3. Write pages | Relevant concepts, authors, projects, and threads are created or updated. `wiki/index.md` is updated. | Writer | Yes—marginal sources require your triage approval. |
| 4. Mechanical validation | Scripts check frontmatter, links, source lists, and page structure. | Coordinator | Yes—errors return to the writer. |
| 5. Theory review | A read-only reviewer compares the source and changes against the whole theory map. Routine local findings are handled inside the pipeline. | Theory reviewer | Only a genuine structural decision or unresolved critical conflict requires you. |
| 6. Independent verification | Read-only reviewers check diff integrity, source fidelity, and page quality when applicable. | Reviewers | Yes—a required reviewer being unavailable is a hard stop. |
| 7. Fix loop | The writer fixes specific findings; validation and affected reviews run again. | Writer | Repeats until pass or a real blocker remains. |
| 8. Commit gate | The coordinator proves the staged changeset is complete and commits after PASS or properly recorded explicit debt. | Coordinator | Yes—FAIL, incomplete review, open fix loops, or unresolved critical issues prevent commit. |
| 9. Report | You receive sources, pages, theory pressure, unresolved issues, reviews, retries, fallback use, and commit status. | Coordinator | — |

The agent should not claim completion halfway through a fix loop.

## Full, marginal, and skip

A writer classifies each source:

- **Full:** meaningfully changes or extends the wiki. The writer files it and the complete review pipeline runs.
- **Marginal:** contains a small useful addition. The writer proposes the target pages and waits for your approval before editing.
- **Skip:** adds no durable value. The raw source may remain archived, but no wiki prose is added.

“Marginal” does not mean “unverified.” If you approve the edit, it still receives appropriate verification. Each accepted marginal edit increments an `unaudited_marginal` counter in the page’s top metadata; at five, the pipeline warns that the page needs a focused source-verification audit. The warning does not launch an audit automatically.

## The theory gate

AgenticWiki is not only a set of summaries. Thread pages state the wiki’s current cross-source theories.

For a full ingest, the theory reviewer reads all threads and relevant concepts, then asks:

- Does the source reinforce an existing theory?
- Does it add a contradiction or boundary?
- Does a thread need a local update?
- Does it pressure the whole theory map to change?

Local links, caveats, and repairs within existing structure are routed back to the writer, checked again, and then proceed automatically. The coordinator does not ask you to redo routine theory evaluation.

You are interrupted only when theory review requires a real structural decision: creating, merging, splitting, retiring, or fundamentally reframing a thread, or resolving a critical conflict with no safe editorial answer.

The reviewer reports; it does not edit.

## Who is who

- **Coordinator:** owns source preservation, process, validation, reviewer dispatch, and the commit gate.
- **Writer:** reads one source, decides which pages it affects, and writes the wiki prose.
- **Theory reviewer:** compares a filing with the complete thread/concept map and reports theory pressure.
- **Diff reviewer:** checks that existing meaning, caveats, and unrelated prose were not damaged.
- **Source-fidelity reviewer:** checks claims, quotations, attribution, modality, scope, and vocabulary against every listed raw source.
- **Quality reviewer:** checks whether substantial pages are readable, well structured, and well connected.
- **Query agent:** answers from already filed material without editing unless you separately request a filing.
- **Audit agent:** checks repository health, resolves selected debt, or performs a deep semantic audit.
- **Research worker:** answers one focused external question. Its evidence is not automatically filed.

Verification orchestration is performed by the coordinator; there is no separate verifier that edits or approves its own work. The actual judgments come from isolated read-only reviewers.

If no writer can edit the same repository the coordinator will verify, the coordinator may perform the writer role inline only after disclosing the fallback. Required reviewers never have an inline fallback.

## What the verdicts mean

- **PASS:** required checks passed. The coordinator commits unless you said “stop before commit.”
- **PASS WITH EXPLICIT DEBT:** the bounded change is acceptable, but a real limitation remains. A reader-facing gap is warned about on the affected page; structural, recurring, source-artifact, or out-of-scope content debt goes in `meta/tech-debt.md`; process debt goes in `meta/pipeline-recommendations.md`. Both page and ledger are used when both apply. The coordinator then commits unless you said “stop before commit.”
- **FAIL:** something must be fixed and re-reviewed. No commit.

An **operational stop** occurs when the agent needs your decision, a required reviewer cannot run, or a critical issue cannot be resolved safely. The commit gate remains closed; verification is incomplete or failed rather than a fourth verdict.

A clean `validate-page` result is not a semantic PASS. The validator catches mechanical problems; reviewers check whether the prose is faithful and theoretically coherent. If deterministic command output and a reviewer disagree about a mechanical defect, the coordinator reruns the exact command and re-dispatches the reviewer with that evidence. It stops and shows you both only if the contradiction persists and cannot be resolved safely.

### What “ready to commit” means

Before committing, the coordinator must know—not ask you to guess—that:

- the staged files are exactly the intended filing and match the bytes reviewers saw;
- mechanical checks pass for the changed files;
- every required independent theory, diff, source-fidelity, and quality review completed or has a rule-based reason to be skipped;
- every resolvable finding was fixed and the affected checks/reviews reran;
- no fix loop, reviewer task, or external research question remains open;
- no unresolved critical issue remains;
- accepted unresolved or out-of-scope limitations have the appropriate durable record: page warning, content/artifact debt row, process-recommendation row, or both.

This does **not** mean the entire historical wiki must be perfect. It means the bounded filing is safe to add, and anything legitimate that cannot or should not be resolved in that filing remains visible rather than being hidden.

## What the directories mean

| Path | Meaning | Who normally changes it? |
|---|---|---|
| `raw/` | Preserved source material and provenance. Existing files are immutable. | Coordinator creates new artifacts. |
| `wiki/` | The readable knowledge base. | Writer. |
| `wiki/index.md` | Catalog of threads, concepts, authors, and projects. | Writer whenever pages change. |
| `wiki/threads/` | Cross-source theory essays. | Writer after theory pressure is reviewed. |
| `meta/wiki-conventions.md` | Page and source schema. | Human-approved process work. |
| `meta/tech-debt.md` | Known content, evidence, or structural problems awaiting audits. | Filing coordinator registers; audit agent resolves. |
| `meta/pipeline-recommendations.md` | Problems or improvements concerning the filing process itself. | Coordinator/auditor records evidence. |
| `.agents/skills/` | Detailed agent procedures. | Process-maintenance work, not normal wiki reading. |
| `scripts/` | Deterministic validation and maintenance tools. | Process-maintenance work. |
| `archive/` | Retired workflow artifacts retained for history. | Normally read-only. |

Start browsing at [`wiki/index.md`](wiki/index.md), then read thread pages and follow their concept links.

## Source preservation

Existing files in `raw/` are never edited or deleted by the agent.

Typical source handling:

- a supplied local file is moved into `raw/` and no longer remains at its previous location; say so before filing if you need a separate copy preserved;
- web pages and transcripts become Markdown with source-identifying metadata at the top;
- arXiv papers become extracted Markdown under `raw/`; the re-downloadable PDF is not committed;
- a non-arXiv PDF without a stable URL may be preserved directly;
- images and other companion material go under `raw/assets/`.

Wiki prose is a digest of the sources. The original source layer remains the evidence trail.

Starting a filing authorizes retrieval of the supplied URL and any focused external lookup needed to resolve a concrete verification question. A wiki-only question does not search the web unless you request it. External research findings are not automatically added to the wiki; they must pass through normal filing or verification.

## Evidence language

AgenticWiki distinguishes:

- **source claim:** what a paper, author, practitioner, or tool document actually says;
- **attributed interpretation:** an author’s opinion or proposed explanation;
- **wiki synthesis:** a connection inferred across several filed sources;
- **uncertainty:** contradictions, weak evidence, missing primary material, or claims not yet tested.

This is a map of hypotheses, not a textbook of established truth. A thread is the wiki’s current best synthesis, not a final answer.

## Git words in plain English

- **Working tree:** files currently on disk.
- **Untracked:** a new file Git does not yet include in repository history.
- **Staged:** selected for the next commit. Staging is not a commit.
- **Commit:** a durable repository snapshot with an identifier.
- **Dirty repository:** there are staged, modified, or untracked files.
- **Diff:** the exact lines changed.

Useful commands:

```bash
# What is changed, staged, or untracked?
git status --short

# What unstaged tracked content changed?
git diff --stat

# What is selected for the next commit?
git diff --cached --stat

# What did the latest commit contain?
git show --stat --oneline HEAD
```

Do not assume an agent’s prose report is correct when these commands disagree with it.

## What remains after a stop or failure

Staging happens **before** final semantic approval because staged files define the exact review boundary. Therefore:

- staged does not mean verified;
- a failed, interrupted, theory-blocked, or reviewer-blocked run may leave partial or unverified staged files;
- a successful “stop before commit” run should leave the verified files staged for inspection;
- unrelated unstaged work is normally left alone;
- pre-existing staged work blocks a new filing until you decide how to separate it;
- a marginal triage pause may leave only a newly preserved, unstaged source.

After an interruption, ask for an operator status report and inspect `git status --short` plus `git diff --cached --stat`. Do not rely on closing a terminal or chat as cancellation: explicitly interrupt the active session, check whether delegated tasks are still running, and then inspect Git state.

## Validation and audits

```bash
# Unified mechanical repository check
./scripts/validate-page

# Check an explicit page
./scripts/validate-page wiki/concepts/example.md
```

A health audit checks mechanical integrity and registered debt. A deep audit additionally examines thread coherence, stale theories, ontology sprawl, temporal drift, and missing theories.

A read-only audit reports findings. A debt-resolution request authorizes the audit agent to fix, verify, and commit the selected item after PASS or properly recorded explicit debt; “stop before commit” overrides that default. A deep audit may apply small local semantic markers unless you explicitly request read-only behavior, but structural changes still require approval.

## Debt and process recommendations

There are two queues:

- `meta/tech-debt.md` — unresolved page, source, evidence, or theory issues;
- `meta/pipeline-recommendations.md` — unresolved improvements to how agents perform filings and reviews.

Recording a row is not resolution. A row changes only when an active filing or audit produces real implementation and evidence. Nothing schedules debt cleanup automatically.

## When the agent must ask you

The agent should stop for your decision when:

- a marginal source needs triage approval;
- a new thread or major theory reframe is proposed;
- a page deletion, merge, split, demotion, or retirement is proposed;
- a schema change is needed;
- a source cannot be preserved reliably;
- a critical claim cannot be resolved safely;
- existing staged work would contaminate a new filing;
- you explicitly requested “stop before commit” and must decide what to do with the verified staged changes;
- a required reviewer cannot run.

Routine page selection, linking, attribution, validation, and reviewer dispatch should not require repeated permission.

## What never happens automatically

- No background filing.
- No periodic audit unless an active session invokes it.
- No automatic debt cleanup merely because a next action is documented.
- No automatic web research during a wiki-only question.
- No deletion, merge, split, or theory reframe without your approval.
- No modification or deletion of an existing raw source.
- No legitimate PASS when a required reviewer failed to run.

There is no repository-managed background service, but delegated tasks are harness-specific. Do not assume that closing a terminal or chat cancels them; explicitly interrupt the active session and inspect task plus Git state.

## What a good final report should tell you

A filing or audit report should answer:

1. What source or debt item was handled?
2. What files/pages changed?
3. What important ideas, claims, connections, or contradictions were added?
4. What theory pressure did the source create?
5. What remains uncertain?
6. Which independent reviews ran, and what did they conclude?
7. Did any worker fail, retry, time out, or fall back inline?
8. Is anything staged?
9. Was a commit created? If so, what is its hash?
10. What, if anything, is waiting for you?

If a report does not answer those questions, ask:

> Rewrite that as an operator report using the ten questions in `USER-MANUAL.md`. Do not perform more work.

## Small glossary

- **Frontmatter:** the metadata block between `---` lines at the top of a Markdown file.
- **Provenance:** where a source came from—URL, author, title, and dates.
- **Schema:** the required shape and allowed values for files and metadata.
- **Source fidelity:** whether wiki prose accurately represents what its listed source says.
- **Theory pressure:** whether a source reinforces, narrows, contradicts, or forces restructuring of the current thread map.
- **Structural decision:** creating or fundamentally reframing a thread, or merging, splitting, demoting, retiring, or deleting existing durable structure. Routine creation of a concept, author, or project page during filing is writer work, not a structural approval gate.
- **Temporal drift:** older synthesis no longer reflects newer filed material.
- **Ontology sprawl:** too many overlapping or weakly justified pages and categories.

## Recommended operating style

For maximum control:

1. Ask questions read-only.
2. File one source at a time.
3. Let passing filings commit by default; say “stop before commit” when you want an inspection pause.
4. Ask for an operator report after long or interrupted runs.
5. Run a read-only health audit periodically.
6. Request a named debt item when you want cleanup.
7. Run a deep theory audit when the thread map feels stale or bloated.
8. Inspect `git status --short` before switching tasks or repositories.

That is the operating model: **you choose the operation; the coordinator runs a bounded pipeline; deterministic checks and independent reviewers gate changes; Git records what actually happened.**

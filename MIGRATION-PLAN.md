# Migration Plan — 10-Skill Architecture

> Working document. Tracks the migration from the current `wiki-ops` + 4 editor subagents model to the NewsWiki-style 10-skill, 0-subagent model (adapted). Delete this file when the migration is complete.

## Why

The 4-editor × 4-harness mirror tree (16 subagent files across `.pi`/`.devin`/`.opencode`/`.mimocode`) is already rotting: `.commandcode/agents/` is documented as a mirror but doesn't exist, and the schema has lied about it for weeks. Every editor change requires syncing 4 trees with different frontmatter dialects. The NewsWiki model eliminates this entire class of problem: expertise lives once in `.agents/skills/*/SKILL.md`, harness-agnostic. The harness still constructs isolated workers with restricted tools — the skill describes *capability requirements* instead of assuming a specific agent definition.

Secondary wins:
- Discrete skills reduce context load per operation (querying doesn't load the verification pipeline)
- Risk-based verification is more honest than the fixed three-phase pipeline (formatting-only edits genuinely don't need source verification)
- `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` verdicts make verification outcomes actionable
- `meta/tech-debt.md` gives "explicit debt" a registry to live in
- **Coordinator/writer split** (adopted from NewsWiki's 0796998): commit gate is held by an agent that did NOT write the prose — structurally improves on the self-justification failure mode (see Enforcement for honest caveat)

## Target Architecture

- 10 skills under `.agents/skills/`, 0 editor subagents
- **Three-role filing pipeline**: coordinator (process + commit gate), writer (editorial judgment for one source), verifier (read-only reviewers). No corrector role — AgenticWiki's sources don't warrant the correction pipeline (see Domain Adaptations).
- One writer per source (fresh context per writer); coordinator dispatches sequentially
- Reviewers are read-only, report-only; research tools return evidence + recommendation, not verdicts
- **Theory gate before verification**: `reviewing-wiki-theory` is invoked by the coordinator after the writer stages pages and before `verifying-wiki-changes`. It produces a theory summary; the human approves or instructs edits; only then does verification run. This preserves the current Phase 2 analytical pass.
- Risk-based verification replaces the fixed three-phase pipeline
- Explicit `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` verdicts from the verifier, not the validator
- `meta/wiki-conventions.md` is the authoritative schema
- `meta/tech-debt.md` is the debt registry (structural dependency of `PASS WITH EXPLICIT DEBT`)
- `archive/` for retired workflow artifacts
- **All skills written in second-person imperative voice** ("you do X", not "the coordinator does X") — NewsWiki's aa6a59e commit proved this matters: descriptive voice doesn't bind the agent

## Skill Mapping (10 skills)

### Operation skills (5)

| New skill | Source | Notes |
|---|---|---|
| `coordinating-filing` | NewsWiki `coordinating-filing/SKILL.md` + current `ingest-flow.md` Phase 2 gate | Entry point. Pipeline supervisor, commit gate, dispatches writers and `reviewing-wiki-theory`, holds the final commit gate. Adapts: no corrector dispatch, no source-class ordering, no `audio_verified` stamping. Keeps: slugify-on-preserve, staging boundary check, no `git add -A`, index.md check, pre-check vs verification distinction, commit gate logic, theory gate before verification. |
| `filing-agentic-sources` | NewsWiki `filing-news-sources/SKILL.md` (writer) + current `ingest-flow.md` (Phase 1) + `ingest-philosophy.md` | Writer role. One source, fresh context, editorial judgment. Applies initial pages, related links, sources, and callouts. May be re-dispatched after the theory gate to apply callout/tension edits. Adapts: keeps triage gate (full/marginal/skip), keeps `unaudited_marginal` increment, keeps arXiv extraction procedure. Drops: NewsWiki's source-class retrieval, `evidence_status`/`source_class`/`source_depth`, speaker-attribution tiers, `## Filing Directives`. |
| `verifying-wiki-changes` | NewsWiki `verifying-wiki-changes/SKILL.md` + current `verification-pass.md` | Coordinator. Risk classification, mechanical classification floor, constructs reviewers, returns verdict. Does NOT include theory review. Already has LLM-as-judge caveat. |
| `auditing-agentic-wiki` | NewsWiki `auditing-news-wiki/SKILL.md` + current `theory-editor.md` deep-audit beat | Health report + debt resolution + **distinct deep-audit mode** (ontology compression, theory gaps, temporal drift). Deep audit is a separate invocation, not a section of the health report. |
| `querying-agentic-wiki` | NewsWiki `querying-news-wiki/SKILL.md` | Read-only Q&A. Adapts: drops evidence-class recitation; keeps "filed evidence / attributed interpretation / wiki synthesis / uncertainty" distinction. |

### Reviewer capability skills (4)

| New skill | Source | Notes |
|---|---|---|
| `reviewing-wiki-diffs` | NewsWiki `reviewing-wiki-diffs/SKILL.md` | Transition integrity. Report-only. Keeps: semantic drift (including hedging removed / certainty increased, which covers the "commentary laundering" concern), lost knowledge, scope creep, metadata regressions. Adapts: drops `evidence_status` upgrade checks. |
| `verifying-source-fidelity` | NewsWiki `verifying-source-fidelity/SKILL.md` + current `source-verifier.md` | Per-page fidelity. Report-only. Keeps: hallucination/omission/misattribution/summary-accuracy. **Keeps the multi-speaker misattribution-as-CRITICAL rule** with explicit media-skill access for multi-speaker audio/video sources. Adapts: drops `evidence_status`/`source_class` checks and transcript proper-noun settlement. |
| `reviewing-wiki-quality` | NewsWiki `reviewing-wiki-quality/SKILL.md` + current `structural-editor.md` + `link-editor.md` + `theory-editor.md` per-changeset beat | Structure/clarity/context/chronology/navigation + **Thread quality** (replaces NewsWiki's "Narrative quality"). Report-only. Scoped to changed pages. |
| `reviewing-wiki-theory` | current `analytical-pass.md` + `theory-editor.md` | **Whole-wiki theory coherence gate**. Re-reads all threads and related concepts, classifies theory pressure (local/thread/panorama). Invoked by the **coordinator** after the writer stages pages and **before** `verifying-wiki-changes` for full/substantive ingests; skipped for marginal/formatting-only. It is report-only, but the coordinator routes its callout/tension/thread-proposal edits to the writer before verification. `panorama`-level reframe maps to `FAIL`/escalation until the human approves a new thread or major reframe. |

### Research tools (1)

| New skill | Source | Notes |
|---|---|---|
| `researching-wiki-claims` | NewsWiki `researching-wiki-claims/SKILL.md` | **Research tool, not reviewer.** Returns evidence + FILE/CITE/FIX/FLAG/REMOVE recommendation, not a verdict. Adapts: source priority (arXiv papers, engineering blogs, conference talks, GitHub repos) instead of NewsWiki's (court documents, agency records, wire reports). |

### Naming convention
Follows NewsWiki's pattern — "agentic" appears where "news" appeared in operation skills; reviewer/research skills stay bare:
`coordinating-filing`, `filing-agentic-sources`, `verifying-wiki-changes`, `auditing-agentic-wiki`, `querying-agentic-wiki`, `reviewing-wiki-diffs`, `verifying-source-fidelity`, `reviewing-wiki-quality`, `reviewing-wiki-theory`, `researching-wiki-claims`

### Theory-editor split (key mapping decision)
- **Per-changeset page/thread coherence** (does this page/thread still work after this ingest? are new pages navigable?) → `reviewing-wiki-quality`, risk-triggered, scoped to changed pages
- **Per-changeset whole-wiki theory pressure** (contradictions, departures, emerging themes across all threads) → `reviewing-wiki-theory`, invoked by coordinator **before verification**, whole-wiki scope
- **Periodic deep audit** (ontology compression, merge/split candidates, theory gaps, temporal drift across the whole wiki) → `auditing-agentic-wiki` deep-audit mode, periodic cadence

## Filing Pipeline Flow (Coordinator Steps)

1. **Receive and triage** — inspect `git status`, order sources, preserve raw, slugify filenames, stage raw source(s)
2. **Triage gate (human)** — if source is marginal/borderline, present triage and wait for approval
3. **Dispatch writers** — for each source, spawn a fresh writer loading `filing-agentic-sources`; writer stages wiki changes and reports
4. **Mechanical pre-check** — run `validate-page` on changed paths; errors route back to writer
5. **Theory gate** — for full/substantive ingests, spawn `reviewing-wiki-theory`; coordinator presents theory summary to human
   - `PASS` → proceed to verification
   - edits requested → re-dispatch writer to apply callouts/tensions; re-run pre-check; re-run theory review if needed
   - `panorama`-level reframe → `FAIL`/escalate; do not proceed until human approves a new thread or major reframe
6. **Verify** — dispatch `verifying-wiki-changes`, which constructs `reviewing-wiki-diffs`, `verifying-source-fidelity`, `reviewing-wiki-quality`, and `researching-wiki-claims` if needed
7. **Verification gate (human)** — coordinator presents verification report; human approves or routes fixes
8. **Commit** — if PASS or PASS WITH EXPLICIT DEBT, commit staged set; record debt in `meta/tech-debt.md` if applicable

Marginal ingests skip step 5 (theory gate) and step 6 (reviewers); run only step 4 (mechanical pre-check) then step 8 (commit). `unaudited_marginal` is incremented.

## Domain Adaptations (AgenticWiki ≠ NewsWiki)

### Not adopted
- **`correcting-sources`** — NewsWiki's corrector produces non-meaning-changing fixes (proper nouns, ASR garble, speaker labels) in `raw/corrected/`. AgenticWiki's sources are mostly arXiv papers (clean extraction), engineering blogs (clean text), and some YouTube transcripts. The correction pipeline is heavy machinery for a problem that's less acute here. YouTube transcript garble can be handled inline by the writer.
- **`reviewing-correction-diffs`** — only exists because `correcting-sources` exists. No corrector, no correction-diff reviewer.
- **`raw/corrected/` directory** — not needed without corrector.
- **Speaker attribution & diarization tiers** — NewsWiki-specific escalation tiers. AgenticWiki doesn't diarize, but the **multi-speaker misattribution verification concern** is kept in `verifying-source-fidelity`.
- **`audio_verified` stamping** — NewsWiki-specific.
- **Source-class ordering** (`primary` → `reporting` → `analysis` → ...) — NewsWiki-specific taxonomy. AgenticWiki has different source types (arXiv, YouTube, blog, podcast). The coordinator can order by a simpler heuristic (e.g., primary source before commentary) or skip ordering for single-source ingests.
- **`evidence_status` / `source_class` / `source_depth`** — AgenticWiki doesn't use these fields.

### Adapted / carried forward
- `coordinating-filing`: adds theory gate before verification (preserves Phase 2 human gate); no corrector/source-class ordering.
- `filing-agentic-sources`: keeps triage gate (full/marginal/skip), keeps `unaudited_marginal` increment, keeps arXiv extraction procedure. Drops NewsWiki's speaker-attribution/diarization tiers, `evidence_status`/`source_class`/`source_depth`, `## Filing Directives`.
- `verifying-source-fidelity`: **keeps** the multi-speaker misattribution rule (transcripts lack per-line labels; verify who-said-what before citing under a name; misattributed quotes in multi-speaker sources are **CRITICAL**; use the media skill to verify against the recording when textual cues are insufficient). Drops `evidence_status`/`source_class` checks and transcript proper-noun settlement.
- `reviewing-wiki-diffs`: keeps semantic drift (covers hedging removed / commentary-laundering case); drops `evidence_status` upgrade checks.
- `reviewing-wiki-quality`: replaces NewsWiki's "Narrative quality" section with "Thread quality" (thesis support, tensions visible, cross-thread connections, synthesis adds explanatory value). Carries forward the link-editor's "Concept-to-Author links are intentionally one-way" rule in its Navigation dimension.
- `reviewing-wiki-theory`: preserves the current `analytical-pass.md` whole-wiki re-read, theory-pressure classification, and theory summary. It is a distinct coordinator-side gate before verification, not a reviewer inside `verifying-wiki-changes`.
- `auditing-agentic-wiki`: adds deep-audit mode (theory-editor's periodic beat) alongside the mechanical health report. Deep audit is a **distinct invocation mode**, not a section of the health report.
- `querying-agentic-wiki`: drops NewsWiki's evidence-class recitation; keeps "filed evidence / attributed interpretation / wiki synthesis / uncertainty" distinction.
- `researching-wiki-claims`: source priority adapted (arXiv papers, engineering blogs, conference talks, GitHub repos) instead of NewsWiki's (court documents, agency records, wire reports).

## Enforcement (wiki pushback #1 — honest framing)

The wiki's [[the-multi-agent-theory]] material is explicit: detection without enforcement barely beats no detection at all. The BICR ablation shows removing blocking drops BICR to 3.1% while *consuming the most tokens*.

The coordinator/writer split **structurally improves on self-review**: the commit gate is held by an agent that did NOT write the prose, removing the self-justification failure mode. This addresses the [[delegate-52]] concern that the same long-horizon editing session silently degrades.

**Honest caveat:** This is still a **soft gate** (an LLM instruction in the coordinator skill: "do not commit on FAIL"), not a hard mechanical block. The coordinator could hallucinate a PASS verdict, be swayed by the writer's report, or skip verification under pressure. The theory's bar for "enforcement" is mechanical blocking with rollback. AgenticWiki already has session separation (current `ingest-flow.md` line 209: "Editing and verification must never be the same session"); the new model adds **agent-role separation** on top. That's a genuine improvement, but it's not a mechanical block.

Commit gate logic (ported from NewsWiki a1e9f03):

> After `verifying-wiki-changes` returns its verdict:
> - `PASS` → commit the staged set. Do not re-stage or absorb new worktree changes.
> - `PASS WITH EXPLICIT DEBT` → commit. Confirm debt is recorded in `meta/tech-debt.md`.
> - `FAIL` → route findings to the writer for fixing. Re-run `validate-page` on fixed paths, then re-run affected verification checks. **Do not commit until rerun returns PASS or PASS WITH EXPLICIT DEBT.**
> - `FAIL on unresolvable CRITICAL` → stop and escalate. Do not commit around it.

**Critical distinction:** `validate-page` is a mechanical pre-check, not verification. A clean `validate-page` run is a *prerequisite* for verification, not a *substitute*. The PASS/FAIL verdict comes from `verifying-wiki-changes`. The coordinator does not self-fix mechanical errors — it routes them back to the writer.

## LLM-as-judge caveat (wiki pushback #2 — already solved in NewsWiki)

NewsWiki's `verifying-wiki-changes` already has this built in:

> **Deterministic checks are load-bearing; LLM verdicts flag where to look.** The `PASS`/`FAIL` verdicts below are LLM judgments, not ground truth. A clean `validate-page` run plus a `PASS` verdict is a contradiction for the human to resolve, not a signal to auto-trust either way. Treat mechanical validator output as the hard floor and reviewer verdicts as directed attention — when they agree, confidence rises; when they disagree, investigate before committing.

Port this directly. Also port the **Mechanical classification floor** — a crude guard against self-serving misclassification (substantive → mechanical to skip verification): check staged body-prose diff for digits, quotation marks, or capitalized multi-word proper-noun patterns. If any are present, the page cannot be classified Mechanical.

## Human-in-the-loop Gates (Revised)

| Gate | Current model | New model | Reasoning |
|---|---|---|---|
| Triage | Step 0 (non-optional) | Step 0 (non-routine; escalate if marginal/borderline) | Preserved as escalation gate |
| Filing summary | Phase 1 | **Folded into theory gate** | Writer's page set report is part of the theory summary |
| Theory summary | Phase 2 | **Distinct coordinator-side theory gate before verification** | Preserved as separate human gate; `reviewing-wiki-theory` reports, coordinator presents, writer applies edits |
| Verification report | Phase 3 | Final verification gate | Preserved as commit gate |

For marginal ingests: only triage (if needed) + mechanical pre-check + commit. No theory gate, no reviewers.

## Known gaps (wiki pushback #3 — skill-hell / eval)

The wiki's [[skill-md]] / [[agent-evals]] / [[skill-hell]] material prescribes with-skill-vs-baseline eval for new skills. Going from 1 operation skill to 5 operation + 4 reviewer + 1 research = 10 increases the proliferation surface 10×, and this plan contains no eval step. That's a real gap.

The honest answer: a rigorous eval is hard to construct here. These are procedural skills for a personal wiki, not model-facing prompts with measurable accuracy. There's no test corpus of known-bad changesets to score verification quality against. What I can do:

- **Acknowledge it as a known gap** rather than fake a rigorous eval step.
- **Subjective post-migration eval**: after the migration lands, run 2-3 real ingests through the new pipeline and compare verification quality to the old pipeline. If the new pipeline produces worse or equal verification outcomes for more cognitive overhead, that's a signal to consolidate skills (the [[skill-hell]] failure mode is reversible — merge skills back).
- **Reversibility is the safety net**: the multi-commit structure means each commit is independently revertible. If the new skills prove worse, revert the deletions and the old `wiki-ops` skill + editor subagents return.

This is weak as eval, but it's honest. A fake eval step would be worse.

## Deferred (not part of this migration)

- **`unaudited_marginal` deprecation** — separate policy decision, separate commit, after migration lands. The new `filing-agentic-sources` skill carries current behavior forward (increment on marginal, audit at ≥5).
- **Bulk removal of `unaudited_marginal` from 287 pages** — only if deprecation is approved later.

## What Stays

- `hybrid-parse` skill (tool skill, not an operation skill)
- `scripts/validate-page`, `check-frontmatter`, `check-links`, `check-sources`, `orphans`, `extract-sources`, `slugify` (all used by `auditing-wiki` and `verifying-wiki-changes`)
- All wiki content, all raw sources, all existing frontmatter including `unaudited_marginal` fields
- `meta/llm-wiki-manifesto.md` (design philosophy, unchanged)

## Skill Content Requirements

Each skill is *rewritten* in the NewsWiki idiom, not restructured from existing content:
- **Second-person imperative voice** ("you do X", not "the coordinator does X") — binding, not descriptive
- **Input Contract** section (what the skill requires before it runs)
- **Risk Classification** table (for `verifying-wiki-changes`)
- **Worker Capabilities** section (for reviewer skills — "require read/search access; harness should deny writes/staging/commits/deletion"; `verifying-source-fidelity` also requires media-skill access for multi-speaker sources)
- **"Construct a fresh isolated worker"** language replaces `delegate({tasks, agent})` — harness-agnostic
- **Verdict output** (`PASS` / `PASS WITH WARNINGS` / `FAIL` for reviewers; `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` for the coordinator)
- **Report-only contract** for all reviewer skills
- **"What you do not do"** section for the coordinator: do not edit wiki pages, not for editorial reasons and not for mechanical fixes; do not self-fix validate-page errors; do not treat validate-page as verification; do not commit without verifier verdict; do not fall back to editorial work when dispatch is available
- **Process checks table** in coordinator (staging boundary, no `git add -A`, index.md updated, pre-check vs verification, no commit on FAIL, theory gate before verification)
- **LLM-as-judge caveat** in `verifying-wiki-changes` (ported from NewsWiki)
- **Mechanical classification floor** in `verifying-wiki-changes` (ported from NewsWiki)
- **Multi-speaker misattribution rule** in `verifying-source-fidelity` (carried forward from current model)
- **Theory pressure classification** in `reviewing-wiki-theory` (carried forward from `analytical-pass.md`)

## Pre-execution Harness Capability Check

Before deleting `.pi/agents/`, `.devin/agents/`, `.opencode/agents/`, `.mimocode/agents/` (Commit 5), verify the harness can construct isolated workers that load skill files by path without requiring pre-existing agent-definition files.

**Concrete test for pi:** After Commit 1 writes the skills, attempt to run a read-only review by spawning an isolated worker and instructing it to load `.agents/skills/reviewing-wiki-diffs/SKILL.md` and produce a short report on a wiki page. In pi, this means using the harness's native delegation mechanism with a task that begins by loading the skill file (e.g., "Load /home/daniel/Documents/AgenticWiki/.agents/skills/reviewing-wiki-diffs/SKILL.md and apply it to the changed page wiki/concepts/some-page.md"). The worker should have only read/search tools and should be unable to write/stage/commit/delete. If the harness cannot enforce read-only isolation or cannot load a skill file as the worker's instructions, do not delete `.pi/agents/`; instead create minimal `.pi/agents/` wrappers that read the skill file and run in the appropriate mode.

For other harnesses (`.devin/`, `.opencode/`, `.mimocode/`): since these are mirrors of `.pi/` and `.commandcode/` is empty, they can be deleted once `.pi/` works. If other harnesses are actively used, create wrappers for them too. The default assumption is pi-only usage; delete the other mirrors if that assumption holds.

## `meta/tech-debt.md` Schema

```markdown
---
title: Technical Debt Registry
created: YYYY-MM-DD
updated: YYYY-MM-DD
last_audit: YYYY-MM-DD
---

# Technical Debt Registry

Machine-readable registry of deferred wiki issues. Each row is a debt item that must be resolved by an audit.

## Status values

- `WITHIN_BUDGET` (exit 0): Clean to file.
- `ERRORS_FOUND` (exit 1): Mechanical errors (broken links, source desyncs, missing sections). Fix before filing.
- `OVER_BUDGET` (exit 1): Accumulated debt too high. Run audit before filing.

`./scripts/validate-page` exits 1 for `ERRORS_FOUND` and `OVER_BUDGET`; the exit code and status line always agree.

## Current Debt

| Date | Page | Issue | Severity |
|------|------|-------|----------|
| YYYY-MM-DD | `wiki/path.md` | description | warning/critical |

## Audit History

| Date | Auditor | Scope | Resolved Rows |
|------|---------|-------|---------------|
```

Ownership: the agent may add debt rows during filing when `verifying-wiki-changes` returns `PASS WITH EXPLICIT DEBT`; the agent may remove resolved rows during `auditing-agentic-wiki` debt resolution. The human owns changes to `meta/` and `AGENTS.md`.

## Execution — Five Commits

### Commit 1: Write operation + theory skills

- [ ] `coordinating-filing/SKILL.md` — pipeline supervisor, commit gate, theory gate before verification
- [ ] `filing-agentic-sources/SKILL.md` — writer role, one source, editorial judgment
- [ ] `filing-agentic-sources/references/ingest-philosophy.md` — theory pressure, thread emergence
- [ ] `verifying-wiki-changes/SKILL.md` — verification coordinator
- [ ] `reviewing-wiki-theory/SKILL.md` — whole-wiki theory coherence gate

**Review checkpoint:** Read `coordinating-filing` and `verifying-wiki-changes` end-to-end. Verify the coordinator flow (theory gate before verification, commit gate logic) is coherent.

### Commit 2: Write remaining reviewer + research + audit/query skills

- [ ] `reviewing-wiki-diffs/SKILL.md`
- [ ] `verifying-source-fidelity/SKILL.md`
- [ ] `reviewing-wiki-quality/SKILL.md`
- [ ] `researching-wiki-claims/SKILL.md`
- [ ] `auditing-agentic-wiki/SKILL.md`
- [ ] `querying-agentic-wiki/SKILL.md`

**Review checkpoint:** Read `verifying-source-fidelity` and `reviewing-wiki-theory` to confirm multi-speaker misattribution and theory-pressure classification are preserved.

### Commit 3: Port `scripts/validate-page`

- [ ] Replace `find` with `fd` and `grep` with `rg` throughout
- [ ] Pre-build indexes once (EXISTING_SLUGS, INBOUND_LINKS, INDEX_LINKS, THREAD_LINKS, NEAR_DUPS)
- [ ] Parse frontmatter in pure bash into associative array
- [ ] Add near-duplicate slug detection and reciprocal link checks as warnings
- [ ] Add changed-scope mode: path args → exit code reflects only errors in supplied paths; repo-wide debt reported separately as informational
- [ ] Verify `fd` and `rg` are available (`/usr/bin/fd`, `/usr/bin/rg`); if not, abort this commit and use current implementation
- [ ] Run `./scripts/validate-page` — confirm 0 errors and acceptable runtime

**Review checkpoint:** `git diff scripts/validate-page` is reviewable. Validator passes clean. Runtime is acceptable.

### Commit 4: Update schema files

- [ ] `AGENTS.md` — thin to mission/architecture/ownership/three-category skill routing (5 operation + 4 reviewer + 1 research tool)/invariants. Drop three-phase pipeline, editor subagent paragraph, "Where to Find Detail" entries for deleted files. Drop `.commandcode` mention. Add `archive/` to architecture block. Add granular ownership for `meta/tech-debt.md` and an invariant for debt recording on `PASS WITH EXPLICIT DEBT`.
- [ ] `meta/wiki-conventions.md` — authoritative schema; remove refs to `editors.md`/`verification-pass.md`/`ingest-flow.md`/`analytical-pass.md`. Keep page formats, frontmatter spec, callouts, templates. Add "Concept-to-Author links are intentionally one-way" rule. Add convention for debt recording on `PASS WITH EXPLICIT DEBT`.
- [ ] `meta/tech-debt.md` — create using schema above. Seed with archived `ingest-notes` row (historical or real debt depending on verification).
- [ ] `README.md` — update skill routing references; drop mentions of deleted files.
- [ ] Run `./scripts/validate-page` — confirm 0 errors after all changes.

**Review checkpoint:** Full `git diff` of schema files. Validator clean. AGENTS.md now routes to new skills (old files still present but unreferenced — safe intermediate state).

### Commit 5: Delete the old structure

- [ ] **Harness capability check** (see Pre-execution Harness Capability Check above). Only proceed if pi can load skills by path.
- [ ] `git rm -r .agents/skills/wiki-ops/`
- [ ] `git rm -r .pi/agents/` (4 files) — only if harness capability check passes; otherwise keep minimal pi wrappers
- [ ] `git rm -r .devin/agents/` (4 subdirs)
- [ ] `git rm -r .opencode/agents/` (4 files)
- [ ] `git rm -r .mimocode/agents/` (4 files)
- [ ] `rmdir .commandcode/` (empty dir, not tracked)
- [ ] `git rm scripts/migrate-filenames`
- [ ] **Before moving:** verify MemRefine→verifiability-thesis / agent-quality-engineering connections are captured in those thread pages; record finding for tech-debt.md
- [ ] `mkdir -p archive/ingest-notes/ && git mv meta/ingest-notes/2026-06-18-memrefine-phase2.md archive/ingest-notes/ && rmdir meta/ingest-notes/`

**Review checkpoint:** `git status` shows only deletions and the relocate. No wiki content touched. AGENTS.md has no dangling refs.

## Final Verification

- [ ] `./scripts/validate-page` → 0 errors
- [ ] `grep -r "wiki-ops\|delegate({tasks\|\.pi/agents\|\.devin/agents\|\.opencode/agents\|\.mimocode/agents\|\.commandcode\|editors\.md\|verification-pass\.md\|ingest-flow\.md\|analytical-pass\.md\|ingest-notes/" AGENTS.md meta/ .agents/ README.md` → no hits (or only historical mentions in archive/)
- [ ] `ls .agents/skills/` → 11 directories (10 new + `hybrid-parse`)
- [ ] `git status` → clean
- [ ] Read `AGENTS.md` end-to-end — routes to the right skills?
- [ ] Read `coordinating-filing` end-to-end — theory gate before verification? commit gate logic?
- [ ] Read `verifying-wiki-changes` end-to-end — LLM-as-judge caveat present?
- [ ] Read `reviewing-wiki-theory` end-to-end — re-reads all threads, classifies theory pressure, routes callouts to writer?

## Cleanup

- [ ] `git rm MIGRATION-PLAN.md` (this file)
- [ ] Final commit: `schema: remove migration plan — migration complete`

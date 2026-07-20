# Migration Plan — 8-Skill Architecture

> Working document. Tracks the migration from the current `wiki-ops` + 4 editor subagents model to the NewsWiki-style 8-skill, 0-subagent model. Delete this file when the migration is complete.

## Why

The 4-editor × 4-harness mirror tree (16 subagent files across `.pi`/`.devin`/`.opencode`/`.mimocode`) is already rotting: `.commandcode/agents/` is documented as a mirror but doesn't exist, and the schema has lied about it for weeks. Every editor change requires syncing 4 trees with different frontmatter dialects. The NewsWiki model (commit `683d9a9`) eliminates this entire class of problem: expertise lives once in `.agents/skills/*/SKILL.md`, harness-agnostic. The harness still constructs isolated read-only workers with restricted tools — the skill just describes the *capability requirements* instead of assuming a specific agent definition.

Secondary wins:
- Discrete skills reduce context load per operation (querying doesn't load the verification pipeline)
- Risk-based verification is more honest than the fixed three-phase pipeline (formatting-only edits genuinely don't need source verification)
- `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` verdicts make verification outcomes actionable
- `meta/tech-debt.md` gives "explicit debt" a registry to live in

## Target Architecture

- 8 skills under `.agents/skills/`, 0 editor subagents
- One writer per changeset (the active operation skill); delegated reviewers are read-only, report-only
- Risk-based verification replaces the fixed three-phase pipeline with human gates
- Explicit `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` verdicts
- `meta/wiki-conventions.md` is the authoritative schema
- `meta/tech-debt.md` is the debt registry (structural dependency of `PASS WITH EXPLICIT DEBT`)
- `archive/` for retired workflow artifacts

## Skill Mapping

| New skill | Source content | Type |
|---|---|---|
| `filing-agentic-sources` | `wiki-ops/SKILL.md` Ingest + `ingest-flow.md` + `ingest-philosophy.md` | Operation |
| `verifying-wiki-changes` | `verification-pass.md` | Operation (coordinator) |
| `auditing-agentic-wiki` | `wiki-ops/SKILL.md` Lint + `theory-editor.md` deep-audit beat | Operation |
| `querying-agentic-wiki` | `wiki-ops/SKILL.md` Query | Operation |
| `reviewing-wiki-diffs` | `verification-pass.md` Step 1b (diff reasoning) | Reviewer capability |
| `verifying-source-fidelity` | `source-verifier.md` | Reviewer capability |
| `reviewing-wiki-quality` | `structural-editor.md` + `link-editor.md` + `theory-editor.md` per-changeset beat | Reviewer capability |
| `researching-wiki-claims` | new | Reviewer capability |

### Naming convention
Follows NewsWiki's exact pattern — "agentic" appears where "news" appeared, reviewer skills stay bare:
`filing-agentic-sources`, `verifying-wiki-changes`, `auditing-agentic-wiki`, `querying-agentic-wiki`, `reviewing-wiki-diffs`, `verifying-source-fidelity`, `reviewing-wiki-quality`, `researching-wiki-claims`

### Theory-editor split (key mapping decision)
- **Per-changeset thread coherence** (does this thread page still work after this ingest?) → `reviewing-wiki-quality` "Thread quality" section, risk-triggered
- **Periodic deep audit** (ontology compression, merge/split candidates, theory gaps, temporal drift across the whole wiki) → `auditing-agentic-wiki` deep-audit mode, periodic cadence

This separates "is this thread still coherent after this change?" (per-changeset, risk-triggered) from "has the theory drifted over time?" (periodic, deep) — better than the old single theory-editor that conflated both.

## Skill Content Notes

Each skill is *rewritten* in the NewsWiki idiom, not restructured from existing content:
- **Input Contract** section (what the skill requires before it runs)
- **Risk Classification** table (for `verifying-wiki-changes`)
- **Worker Capabilities** section (for reviewer skills — "require read/search access; harness should deny writes/staging/commits/deletion")
- **"Construct a fresh isolated worker"** language replaces `delegate({tasks, agent})` — harness-agnostic
- **Verdict output** (`PASS` / `PASS WITH WARNINGS` / `FAIL` for reviewers; `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` for the coordinator)
- **Report-only contract** for all reviewer skills

### Domain adaptations (AgenticWiki ≠ NewsWiki)
- `filing-agentic-sources`: keeps the triage gate (full/marginal/skip), keeps `unaudited_marginal` increment behavior, keeps arXiv extraction procedure, drops NewsWiki's speaker-attribution/diarization tiers (not relevant here), drops `evidence_status`/`source_class`/`source_depth` (AgenticWiki doesn't use these). **Must explicitly refuse to commit on a FAIL verdict from `verifying-wiki-changes`** — see Enforcement below.
- `verifying-wiki-changes`: **deterministic checks (validate-page, bash diff-auditor) are the load-bearing layer; the LLM verdict is heuristic.** Make this explicit in the skill — the verdict is a vibes-level signal, not a guarantee. See LLM-as-judge caveat below. Returns `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL`; the coordinator does not commit (the filing skill does, and must gate on FAIL).
- `verifying-source-fidelity`: drops transcript proper-noun settlement and multi-speaker attribution sections (not relevant); keeps hallucination/omission/misattribution/summary-accuracy checks
- `reviewing-wiki-quality`: replaces NewsWiki's "Narrative quality" section with "Thread quality" (thesis support, tensions visible, cross-thread connections, synthesis adds explanatory value)
- `auditing-agentic-wiki`: adds deep-audit mode (theory-editor's periodic beat) alongside the mechanical health report
- `querying-agentic-wiki`: drops NewsWiki's evidence-class recitation; keeps "filed evidence / attributed interpretation / wiki synthesis / uncertainty" distinction
- `researching-wiki-claims`: source priority adapted (arXiv papers, engineering blogs, conference talks, GitHub repos) instead of NewsWiki's (court documents, agency records, wire reports)

### Enforcement (wiki pushback #1)

The wiki's own [[the-multi-agent-theory]] material is explicit: detection without enforcement barely beats no detection at all. The BICR ablation shows removing blocking drops BICR to 3.1% while *consuming the most tokens* — the worst of both worlds.

The plan's reviewer skills are report-only by design (one writer per changeset). That's correct. But the enforcement point is: **the writer (`filing-agentic-sources`) must refuse to commit when `verifying-wiki-changes` returns FAIL.** This is not implicit — it must be a named step in the filing skill:

> After `verifying-wiki-changes` returns its verdict:
> - `PASS` → commit
> - `PASS WITH EXPLICIT DEBT` → commit, record debt row in `meta/tech-debt.md`
> - `FAIL` → **do not commit.** Fix CRITICAL findings, re-verify, then commit only after re-verification returns PASS or PASS WITH EXPLICIT DEBT.

Without this, the reviewer reports are detection without enforcement, and the wiki's empirical material says that's nearly worthless.

### LLM-as-judge caveat (wiki pushback #2)

The wiki's [[agent-quality-engineering]] / RUBRICEVAL / [[prompts-in-code-review]] material is skeptical of LLM-as-judge: ~55% balanced accuracy on hard rubric judgments, prompt framing swings scores 40+ points. The `PASS` / `PASS WITH EXPLICIT DEBT` / `FAIL` verdicts are LLM judgments.

The mitigation is already in the plan's architecture: deterministic scaffolding carries the load.
- `./scripts/validate-page` — mechanical errors (frontmatter, links, sources, structure, orphans, raw provenance) are deterministic
- bash diff-auditor — orphan edits, claim deletion, scope creep detected by diff inspection (still LLM-judged but narrow input)
- LLM verdict — heuristic signal on top of deterministic base

`verifying-wiki-changes` must state this explicitly: the deterministic checks are load-bearing; the LLM verdict is a heuristic that flags where to look, not a guarantee of correctness. A clean validator run + FAIL verdict is a contradiction the human should resolve, not a signal to auto-trust either way.

## Known gaps (wiki pushback #3 — skill-hell / eval)

The wiki's own [[skill-md]] / [[agent-evals]] / [[skill-hell]] material prescribes with-skill-vs-baseline eval for new skills. Going from 1 operation skill to 4 operation + 4 reviewer = 8 increases the proliferation surface 8×, and this plan contains no eval step. That's a real gap.

The honest answer: a rigorous eval is hard to construct here. These are procedural skills for a personal wiki, not model-facing prompts with measurable accuracy. There's no test corpus of known-bad changesets to score verification quality against. What I can do:

- **Acknowledge it as a known gap** rather than fake a rigorous eval step.
- **Subjective post-migration eval**: after the migration lands, run 2-3 real ingests through the new pipeline and compare verification quality to the old pipeline. If the new pipeline produces worse or equal verification outcomes for more cognitive overhead, that's a signal to consolidate skills (the [[skill-hell]] failure mode is reversible — merge skills back).
- **Reversibility is the safety net**: the three-commit structure means commit 2 (deletions) can be reverted independently if the new skills prove worse. The old `wiki-ops` skill + editor subagents are recoverable from git history.

This is weak as eval, but it's honest. A fake eval step would be worse.

## Deferred (not part of this migration)

- **`unaudited_marginal` deprecation** — separate policy decision, separate commit, after migration lands. The new `filing-agentic-sources` skill carries current behavior forward (increment on marginal, audit at ≥5).
- **Bulk removal of `unaudited_marginal` from 287 pages** — only if deprecation is approved later.

## What Stays

- `hybrid-parse` skill (tool skill, not an operation skill)
- `scripts/validate-page`, `check-frontmatter`, `check-links`, `check-sources`, `orphans`, `extract-sources`, `slugify` (all used by `auditing-wiki` and `verifying-wiki-changes`)
- All wiki content, all raw sources, all existing frontmatter including `unaudited_marginal` fields
- `meta/llm-wiki-manifesto.md` (design philosophy, unchanged)

## Execution — Three Commits

### Commit 1: Write the 8 skills

- [ ] `filing-agentic-sources/SKILL.md` — operation skill; ingest + triage + filing + invokes `verifying-wiki-changes`
- [ ] `filing-agentic-sources/references/ingest-flow.md` — Phase 1 filing procedure (restructured from current `ingest-flow.md`, drops `delegate()` calls)
- [ ] `filing-agentic-sources/references/ingest-philosophy.md` — theory pressure, thread emergence (carried forward from current `ingest-philosophy.md`)
- [ ] `verifying-wiki-changes/SKILL.md` — coordinator; Input Contract, Risk Classification, constructs reviewers, returns verdict
- [ ] `auditing-agentic-wiki/SKILL.md` — health report + debt resolution + deep-audit mode
- [ ] `querying-agentic-wiki/SKILL.md` — read-only Q&A
- [ ] `reviewing-wiki-diffs/SKILL.md` — reviewer; transition integrity, report-only
- [ ] `verifying-source-fidelity/SKILL.md` — reviewer; per-page fidelity, report-only
- [ ] `reviewing-wiki-quality/SKILL.md` — reviewer; structure/clarity/context/chronology/navigation + Thread quality, report-only
- [ ] `researching-wiki-claims/SKILL.md` — reviewer; focused external research, FILE/CITE/FIX/FLAG/REMOVE

**Review checkpoint:** Read all 8 skills, verify they're faithful to the NewsWiki idiom and adapted for AgenticWiki's domain. Show the user `verifying-wiki-changes` and `filing-agentic-sources` as samples before proceeding.

### Commit 2: Delete the old structure

- [ ] `git rm -r .agents/skills/wiki-ops/`
- [ ] `git rm -r .pi/agents/` (4 files)
- [ ] `git rm -r .devin/agents/` (4 subdirs)
- [ ] `git rm -r .opencode/agents/` (4 files)
- [ ] `git rm -r .mimocode/agents/` (4 files)
- [ ] `rmdir .commandcode/` (empty dir, not tracked)
- [ ] `git rm scripts/migrate-filenames` (dead code — one-shot migration, complete, referenced nowhere)
- [ ] `mkdir -p archive/ingest-notes/ && git mv meta/ingest-notes/2026-06-18-memrefine-phase2.md archive/ingest-notes/ && rmdir meta/ingest-notes/`
- [ ] Verify MemRefine→verifiability-thesis / agent-quality-engineering connections are already captured in those thread pages (quick read); record finding for tech-debt.md seeding

**Review checkpoint:** `git status` shows only deletions and the relocate. No wiki content touched.

### Commit 3: Update schema files

- [ ] `AGENTS.md` — thin to mission/architecture/ownership/skill routing (4 operation + 4 reviewer capability)/invariants. Drop three-phase pipeline, editor subagent paragraph, "Where to Find Detail" entries for deleted files. Drop `.commandcode` mention.
- [ ] `meta/wiki-conventions.md` — authoritative schema; remove refs to `editors.md`/`verification-pass.md`/`ingest-flow.md`. Keep page formats, frontmatter spec, callouts, templates.
- [ ] `meta/tech-debt.md` — create. Seed with archived `ingest-notes` row (historical or real debt depending on Commit 2 verification).
- [ ] `scripts/validate-page` — add changed-scope mode: with path arguments, exit code reflects only errors in supplied paths; repo-wide debt reported separately as informational. (Port from NewsWiki's `683d9a9` changes.)
- [ ] `README.md` — update skill routing references; drop mentions of deleted files.
- [ ] Run `./scripts/validate-page` — confirm 0 errors after all changes.

**Review checkpoint:** Full `git diff` of schema files. Validator clean. `git log --oneline -5` shows three coherent commits.

## Verification

After Commit 3:
- [ ] `./scripts/validate-page` → 0 errors
- [ ] `grep -r "wiki-ops\|delegate({tasks\|\.pi/agents\|\.devin/agents\|\.opencode/agents\|\.mimocode/agents\|\.commandcode\|editors\.md\|verification-pass\.md\|ingest-flow\.md\|ingest-notes/" AGENTS.md meta/ .agents/ README.md` → no hits (or only historical mentions in archive/)
- [ ] `ls .agents/skills/` → 9 directories (8 new + `hybrid-parse`)
- [ ] `git status` → clean
- [ ] Read `AGENTS.md` end-to-end — does it route to the right skills?
- [ ] Read one skill end-to-end — does it work standalone?

## Cleanup

- [ ] `git rm MIGRATION-PLAN.md` (this file)
- [ ] Final commit: `schema: remove migration plan — migration complete`

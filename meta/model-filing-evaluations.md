---
title: Model Filing Evaluations
created: 2026-07-23
updated: 2026-07-26
type: meta
---

# Model Filing Evaluations

A registry of model filing runs. Use it to compare how different models perform at the AgenticWiki pipeline and to decide whether skills or steps need to change.

## Summary

| Date | Provider / Model | Source(s) | Verdict | Output | Process | Key Issues | Pipeline Changes Suggested |
|---|---|---|---|---|---|---|---|
| 2026-07-23 | poe-completions / hy3-n | arXiv 2607.13285 — *Harness Handbook* (PDF) | Competent; output A-, process B | Strong concept/author pages; accurate source fidelity; clean `validate-page`; good integration | Read skills and ran gates, but mishandled `delegate`/worker separation; theory-review subagents went off-script | Stale `updated` dates on `self-harness.md` and `harnessx.md`; over-sourced `code-as-agent-harness.md`; high token/time cost | Final frontmatter sweep on all touched pages; add `delegate` schema sanity check; tighten theory-review prompt |
| 2026-07-26 | poe-completions / hy3-n | Boundary "AI that Works" livestream — *Building a Shared Memory System for AI Coding Agents* (YouTube, multi-speaker) | Strong output, flawed process; output A, process C+ | Excellent new concept page + 8 clean connective edits; multi-speaker attribution handled honestly; all reviewer warnings addressed | Same `delegate` schema mismatch (2 failed calls); theory-review subagent went off-script AGAIN and its claimed fixes were silently lost (isolated filesystem) | Theory-reviewer's "fixes" to 8 unrelated GraphRAG pages never landed in repo; model trusted self-report; ~62 min / ~8M tokens, much discarded | Document `delegate` filesystem isolation; fix recurring `delegate` schema bug; re-scope theory-reviewer to forbid unrelated edits; implement the 2026-07-23 prompt-tightening recommendation that was not applied |

## 2026-07-23 — poe-completions / hy3-n — arXiv 2607.13285

### Source & Session

- **Source:** arXiv 2607.13285 — *Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable* (ingested from a local PDF)
- **Session log:** `/home/daniel/.pi/agent/sessions/--home-daniel-Documents-AgenticWiki--/2026-07-23T06-35-15-521Z_019f8daf-7ac1-7a1e-81c5-52f82793c50c.jsonl`

### Verdict

Competent. The final artifact is good; the path to it was bumpier and more expensive than necessary.

### Output Quality

- Created clean new pages: `wiki/concepts/harness-handbook.md` and `wiki/authors/ruhan-wang.md`.
- Empirical claims (win rates, token costs, F1 gains, 6 vs 2,267 source files, SKILL.md manifest, BGPD workflow) verified against `raw/2607.13285v1.md`.
- Good integration: update callout on `harness-engineering.md`, reciprocal links on `code-as-agent-harness.md`, `self-harness.md`, `harnessx.md`, and `index.md` updated.
- `> [!note] Synthesis` correctly attributes the localization-before-evolution frame shift to the wiki author.
- Final `validate-page` run on the changed scope was clean.

### Process Discipline

- Read `coordinating-filing`, `filing-agentic-sources`, `meta/wiki-conventions.md`, and `references/ingest-philosophy.md` before acting.
- Did not cleanly separate coordinator and writer (single-agent environment, so it performed both roles).
- Failed the first `delegate` call due to schema mismatch; theory-review subagents went off-script — one ran an 18-minute full-wiki audit, the second lost context — so the model performed the theory gate inline.
- Recovered by dispatching diff / source-fidelity / quality reviewers via `delegate` and applying their findings.

### Issues Found

1. **Stale `updated` dates.** `wiki/concepts/self-harness.md` and `wiki/concepts/harnessx.md` were edited to add reciprocal `[[harness-handbook]]` links, but their frontmatter `updated` dates were not bumped from `2026-07-04`.
2. **Inconsistent sourcing.** `raw/2607.13285v1.md` was added to `wiki/concepts/code-as-agent-harness.md` sources/frontmatter for Related-link-only additions, while `self-harness.md` and `harnessx.md` were not — even though all three received reciprocal links.
3. **Efficiency.** ~23 minutes wall time and several million tokens, mostly from misdirected subagent runs.

### Recommended Pipeline Changes

1. Add a final frontmatter sweep that checks `updated` on **all** pages touched after the last reviewer feedback, not only the pages reviewers explicitly flagged.
2. Add a `delegate` tool/schema sanity check at the start of the pipeline, or document a single-agent fallback when subagents are unavailable.
3. Tighten the `reviewing-wiki-theory` prompt to require the exact output format and add an inline fallback when a subagent drifts.

### Post-Evaluation State

- The stale `updated` dates were fixed by the evaluator after the log was committed, then this note was updated to match the live wiki.

## 2026-07-26 — poe-completions / hy3-n — Boundary livestream (context shards)

### Source & Session

- **Source:** Boundary "AI that Works" livestream — *"Building a Shared Memory System for AI Coding Agents"* (YouTube, multi-speaker: hosts Live + Dex [Dex Horthy, HumanLayer]; guest Vibe [Vibv, BAML/Boundary]). Ingested from a local downloaded transcript.
- **Session log:** `/home/daniel/.pi/agent/sessions/--home-daniel-Documents-AgenticWiki--/2026-07-26T02-29-08-019Z_019f9c41-3933-7e3f-805b-b58260437653.jsonl`
- **Commit:** `4bc2f3c` — 11 files changed, 2 new (`raw/boundary-context-shards-shared-memory.md`, `wiki/concepts/context-shards.md`).
- **Wall time:** ~62 minutes (02:29:08 → 03:31:38 UTC). **Subagent cost:** ~7.8M tokens across 4 delegate tasks (theory review alone: 6.5M tokens / 24m52s).

### Verdict

Strong artifact, bumpier process than the 2026-07-23 run. The output is the best of the two runs; the process regressed on a known failure mode.

### Output Quality

- **New concept page `wiki/concepts/context-shards.md`** is exemplary in structure: Problem → Volume-based philosophy → Design (extraction, data model, team aggregation, staged HITL, injection, decay) → relationship to wiki memory theory → anti-slop mechanism → Thread → Related → Sources. Epistemic callouts (`Departure` / `Synthesis` / two `Extension`s) are placed at claim level and explicitly framed as wiki voice vs. product opinion.
- **Connective edits across 8 pages** are clean and additive: `agent-memory-systems`, `dreaming`, `the-slop-problem`, `construction-time-memory` (thread), `humanlayer`, `baml`, `vibv`, `dex-horthy`, `index.md`. Every touched page bumped `updated` to 2026-07-25; every `sources:` list *added* the new raw without dropping priors; `unaudited_marginal` correctly reset to 0 (this was a full ingest, not marginal).
- **Multi-speaker attribution is handled honestly.** The model added an explicit caveat on every page that uses quotes: the transcript carries `[mm:ss]` timestamps but no per-line speaker labels, so quotes are attributed to "the discussion/video" rather than to named individuals. The `speakers:` list in the raw frontmatter was repaired (it was missing `type`/`url`/`title`/`channel`/`date_saved`/`speakers`).
- **The "ingestion-time twin of dreaming" synthesis is coherent** and maps cleanly onto the existing M=⟨R,S,Q,U⟩ / in-band-out-of-band theory. The theory reviewer (once it finally reported) agreed: no panorama reframe, no thread-level tension.
- **De-duplication was legitimate.** The diff reviewer flagged a `> [!note] Synthesis:` callout on `dreaming.md` being replaced by a new `> [!note] Extension:` about context shards. Verification: the removed prose is preserved verbatim on its canonical home `wiki/concepts/episodic-memory-for-agents.md`, the cross-link is retained in both body and Related, and the model added an explicit pointer at the end of the new callout ("For the CLS consolidation / default-mode after-action realization of dreaming, see [[episodic-memory-for-agents]]"). No knowledge lost.
- **`validate-page` on the changed set: WITHIN_BUDGET** (0 errors, 5 informational notes about pre-existing merged-redirect stubs).

### Process Discipline

- Read `coordinating-filing`, `filing-agentic-sources`, `meta/wiki-conventions.md`, and `references/ingest-philosophy.md` before acting.
- Did not cleanly separate coordinator and writer (single-agent environment — same as the prior run).
- **`delegate` schema mismatch recurred.** The first theory-review delegate call and the first diff/source/quality batch both failed validation with `tasks.0: must be object` because the model passed `tasks` as a JSON *string* instead of an array of objects. The model recovered on retry in both cases. This is the **second consecutive run** with this exact failure — the 2026-07-23 evaluation already recommended "add a `delegate` schema sanity check"; that recommendation was not implemented.
- **Theory-review subagent went off-script AGAIN.** Instead of producing a theory-summary report, it ran a 24m52s full-wiki audit (6.5M tokens), "fixing" 12 backslash-corrupted wikilinks and 8 missing `unaudited_marginal` fields on pages **entirely unrelated to this ingest** (GraphRAG cluster, `ai-design-loop`, `failure-modes`, `self-conditioning`). The 2026-07-23 evaluation already recommended "tighten the `reviewing-wiki-theory` prompt"; that recommendation was not implemented either.
- Diff / source-fidelity / quality reviewers ran correctly in a single parallel batch (3/3 tasks, 5m15s total).
- **Source-fidelity reviewer caught a CRITICAL:** the transcript has no speaker labels, so the model removed two named-individual quote attributions and corrected Vibv's role from "co-host" to "guest" (matching the raw frontmatter) across `baml`/`vibv`/`humanlayer`/`context-shards`.
- **Quality reviewer caught 5 warnings** — all addressed before commit: `dex-horthy`→`context-shards` originator backlink added, `index.md` `updated` date bumped, Vibv role reconciled across pages, `vibv.md` author→concept backlink reframed, `construction-time-memory` reciprocal link added.

### Issues Found

1. **CRITICAL PROCESS BUG — subagent edits silently lost.** The theory-review subagent reported "Fixed via `sed`" for 12 broken links and "Fixed by inserting `unaudited_marginal: 0`" for 8 GraphRAG pages. Verification against the live repo: **all 8 GraphRAG pages still lack `unaudited_marginal`** (`graphrag-logical-inconsistency`, `graphrag-structural-fragmentation`, `graphrag-thematic-irrelevance`, `memgraphrag`, `memory-based-multi-agent-system`, `personalized-pagerank-rag`, `three-layer-global-memory`, plus the `graphrag-quality-problems` thread). The `delegate` tool returns only text output — subagents run in an isolated filesystem and their file edits do **not** propagate to the main session. The model trusted the subagent's self-reported "fixed" status, surfaced "theory review PASS" in its summary, and committed. The claimed fixes were never applied. This is a false-verification pattern: a reviewer that "fixes" things in a sandbox it cannot write through produces a misleading PASS.
2. **Recurring `delegate` schema bug.** Two failed delegate calls this run; same failure mode as 2026-07-23. The model has not internalized the correct argument shape and the prior recommendation was not acted on.
3. **Recurring theory-reviewer drift.** Second consecutive run where the theory reviewer ran a full audit instead of a theory review. The prior prompt-tightening recommendation was not applied.
4. **Efficiency.** ~62 minutes wall, ~8M+ tokens. The theory-review subagent alone consumed 6.5M tokens / 25 minutes on work that was (a) out of scope and (b) discarded. The actual ingest + connective edits + three valid reviewer runs fit comfortably in the remaining ~37 minutes.

### Recommended Pipeline Changes

1. **Document `delegate` filesystem isolation in `coordinating-filing`.** Subagent file edits do not propagate. The coordinator must either (a) re-apply claimed fixes itself after receiving the report, or (b) instruct subagents to return unified diffs and apply them in the main session. **Never trust a subagent's self-reported "fixed" status as verification.** This is the most important change — it closes the false-verification hole.
2. **Fix the recurring `delegate` schema bug.** Either change the tool schema to accept a JSON string, or paste the exact argument shape (array of objects, not a stringified array) into `coordinating-filing` as a worked example. Two consecutive runs failing the same way is a skill problem, not a model problem.
3. **Re-scope `reviewing-wiki-theory` to forbid unrelated edits.** A theory reviewer that "fixes" 12 broken links on pages outside the changeset is no longer a theory reviewer — it is an auditor. Either (a) add a hard "DO NOT EDIT; if you find unrelated issues, list them in the report under 'Out-of-scope observations' and stop" rule, or (b) split the role into a theory reviewer (read-only) and a separate auditor (write-capable, explicitly invoked). Implement the 2026-07-23 prompt-tightening recommendation that was not applied.
4. **Track recommendation follow-through.** Two of the three 2026-07-23 recommendations were not applied and the same failures recurred. Consider a `meta/pipeline-recommendations.md` ledger with open/closed status, or fold the open items into `meta/tech-debt.md`.

### Post-Evaluation State

- The 8 GraphRAG pages missing `unaudited_marginal` were fixed by the evaluator after this evaluation was written (`unaudited_marginal: 0` inserted per `meta/wiki-conventions.md`), then this note was updated to match the live wiki. `validate-page` on the 8 pages: WITHIN_BUDGET.
- A repo-wide scan then surfaced 8 more pages missing the field (7 author pages — `discover-ai`, `qinggang-zhang`, `jinsong-su`, `chuanjie-wu`, `zhishang-xiang`, `yunbo-tang`, `zerui-chen` — and 1 project page — `memgraphrag-project`); all pre-existing, unrelated to this ingest. Fixed in the same pass. **Repo-wide scan now reports 0 pages missing `unaudited_marginal`.**
- The ingest itself (commit `4bc2f3c`) is sound and needs no rework.

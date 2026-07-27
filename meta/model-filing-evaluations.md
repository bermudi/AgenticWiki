---
title: Model Filing Evaluations
created: 2026-07-23
updated: 2026-07-27
type: meta
---

# Model Filing Evaluations

A registry of model filing runs. Use it to compare how different models perform at the AgenticWiki pipeline and to decide whether skills or steps need to change.

## Summary

| Date | Provider / Model | Source(s) | Verdict | Output | Process | Key Issues | Pipeline Changes Suggested |
|---|---|---|---|---|---|---|---|
| 2026-07-23 | poe-completions / hy3-n | arXiv 2607.13285 — *Harness Handbook* (PDF) | Competent; output A-, process B | Strong concept/author pages; accurate source fidelity; clean `validate-page`; good integration | Read skills and ran gates, but mishandled `delegate`/worker separation; theory-review subagents went off-script | Stale `updated` dates on `self-harness.md` and `harnessx.md`; over-sourced `code-as-agent-harness.md`; high token/time cost | Final frontmatter sweep on all touched pages; add `delegate` schema sanity check; tighten theory-review prompt |
| 2026-07-26 | poe-completions / hy3-n | Boundary "AI that Works" livestream — *Building a Shared Memory System for AI Coding Agents* (YouTube, multi-speaker) | Strong output, flawed process; output A, process C+ | Excellent new concept page + 8 clean connective edits; multi-speaker attribution handled honestly; all reviewer warnings addressed | Same `delegate` schema mismatch (2 failed calls); theory-review subagent went off-script AGAIN and its claimed fixes were silently lost (isolated filesystem) | Theory-reviewer's "fixes" to 8 unrelated GraphRAG pages never landed in repo; model trusted self-report; ~62 min / ~8M tokens, much discarded | Document `delegate` filesystem isolation; fix recurring `delegate` schema bug; re-scope theory-reviewer to forbid unrelated edits; implement the 2026-07-23 prompt-tightening recommendation that was not applied |
| 2026-07-26 | command-code / mixed (MiniMax-M3 → GLM-5.2 → MiniMax-M3) | GitHub `FareedKhan-dev/all-agentic-architectures` — README + deterministic-picker tutorial + benchmarks (3 web sources, SHA-pinned) | Strong output, flawed process; output A, process C | Clean new concept + project pages; honest 8-vs-9 discrepancy handling; 33/42 benchmark arithmetic independently verified; all claims trace to raw | Role separation actually achieved (writer dispatched as subagent); no `delegate` schema bug; raw preservation clean; but verifier hallucination misdiagnosed as script bug, and 3 bogus debt entries proposed | Verifier subagent fabricated "missing YAML frontmatter on all 9 paths"; agent misdiagnosed as script bug instead of LLM hallucination; over-deferred 3 debt rows (2 based on invented conventions, 1 self-contradicted); required human takeover to commit; ~2h active / ~6h wall (4h usage-limit gap), 2.4M input tokens, $1.71 | Add "verify the verifier" step (re-run deterministic check before diagnosing cause); tighten debt-registration discipline (verify issue is real, not trivially fixable, not self-contradicted before recording); don't defer one-line mechanical fixes as debt |
| 2026-07-27 | poe-completions / hy3-n | Matt Pocock YouTube — *"Don't waste time on specs: /prototype instead"* (single-speaker) | Strong output, improved process; output A- (revised from A), process B+ | Exemplary new concept page + 6 clean connective edits; theory reviewer ran cleanly for the first time on hy3-n; commit gate held correctly | `delegate` schema bug recurred (3rd consecutive run); skipped diff + quality reviewers; `git add -A` used twice; coordinator+writer collapsed | 4 wiki-voice slips in `prototyping.md` missed by both the source-fidelity reviewer and the evaluator's first pass (behavior-under-load inflation, 2-3 candidates hedge, "negligible vs wrong spec" attribution, "dominant case/hardest" escalation); `delegate` first call failed; 2 of 4 substantive reviewers not dispatched; `git add -A`; ~39m wall, ~1.08M tokens | Implement the `delegate` schema sanity check (3 runs, 3 failures); add a reviewer-dispatch checklist to `coordinating-filing`; forbid `git add -A`; source-fidelity reviewer needs a wiki-voice-vs-paraphrase check (not just cited-quote accuracy) |

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

## 2026-07-26 — command-code / mixed (MiniMax-M3 → GLM-5.2 → MiniMax-M3) — all-agentic-architectures

### Source & Session

- **Source:** GitHub `FareedKhan-dev/all-agentic-architectures` (HEAD `cf9d620a8cc55d59589399c30f305e6dfaa428ec`, 2026-05-28). Three web sources preserved as `raw/all-agentic-architectures-{readme,deterministic-picker,benchmarks}.md`, each with a SHA-pinned `url` field per the wiki's GitHub-repo source convention.
- **Session log:** `/home/daniel/Documents/AgenticWiki/command-code-session-c98a2b9f.jsonl`
- **Commit:** `e71a4ce` — 9 files changed, +1118 / -4 (3 raw, 2 new wiki pages, 3 updated threads, 1 index update). Committed by the evaluator after taking over the gate (see Process Discipline).
- **Wall time:** ~6h14m (18:50 → 01:04 next day), but ~4h of that was a usage-limit gap (19:43 → 00:22). **Active work time: ~2h.**
- **Cost:** 2.4M input tokens, 34K output tokens, 1.6M cache-read tokens, **$1.71**. 38 assistant turns, 7 subagent dispatches.
- **Models:** Mixed — MiniMax-M3 (start) → GLM-5.2 (middle, 18:59–19:32) → MiniMax-M3 (end, 19:32 onward). The model change happened mid-pipeline, between plan presentation and writer dispatch.

### Verdict

Strong artifact, flawed process. The output is the cleanest of the three runs filed here; the process regressed on a new failure mode (verifier hallucination misdiagnosed as script bug) and introduced a new one (over-deferred debt).

### Output Quality

- **New `wiki/concepts/deterministic-picker.md`** is well-shaped: Problem (flat-band pathology) → Fix (categorical commitment + Python composition) → Coverage (13 of 35 architectures, with the 8-vs-9 discrepancy handled honestly) → Relation to constructible verifiability → Boundaries → Thread → Related → Sources. Attribution is consistent ("the repo author documents", "Per the author") and wiki synthesis is explicitly marked in three places.
- **New `wiki/projects/all-agentic-architectures.md`** carries the 35-architecture taxonomy, the 8-family structure, the 9-provider matrix, the 33/42 benchmark result, and the named pattern-fit failures. The 35-vs-36 row-count discrepancy (BrowserAgent/ComputerUse split) is flagged with a `[!note]` callout. The "0 MOCKED RUNS" hero metric is correctly framed as a freshness signal, not a validation signal.
- **Three thread updates are additive and well-attributed:** `agent-quality-engineering` (deterministic-picker as a more aggressive hybrid on the Horthy/Galarza axis), `the-multi-agent-theory` (a Departure callout for the practitioner benchmark, honestly hedged as "single-author, single-model, 17-task, not a rigorous audit"), `the-verifiability-thesis` (an Extension callout positioning the picker as constructible verifiability at the scorer step).
- **Independent verification by the evaluator** (separate from the in-session reviewers): every factual claim was cross-checked against the three raw sources. The 33/42 benchmark arithmetic was independently re-derived by summing all 36 leaderboard rows (24×1 + 3×2 + 1×3 = 33 numerator; 31×1 + 4×2 + 1×3 = 42 denominator). The 4-booleans-plus-1-bounded-integer paraphrase is correct against the code (the tutorial's own "5 independent booleans" phrasing is wrong; the wiki silently corrects it). No invented quotes, no wiki-voice violations, no misattributions found.
- **`validate-page` on the changed scope: WITHIN_BUDGET** (0 errors, 0 warnings, 5 informational notes about pre-existing pages unrelated to this ingest).

### Process Discipline

- Read `coordinating-filing`, `filing-agentic-sources`, `meta/wiki-conventions.md`, and `references/ingest-philosophy.md` before acting.
- **Role separation actually achieved** — this is the first of the three runs that dispatched the writer as an isolated subagent rather than collapsing coordinator + writer into one context. The writer was dispatched twice (initial ingest, then a fixup pass for the theory-gate findings, then a final fixup for the source-fidelity CRITICAL).
- **Raw preservation clean** — three SHA-pinned URLs, slugified filenames, provenance frontmatter (`type: web`, `url`, `title`, `author`, `date`, `ingested`). No `git add -A`; staging boundary was the union of writer-reported wiki paths and coordinator-staged raw paths, exactly per skill.
- **Theory gate ran correctly** — returned PASS WITH WARNINGS, the agent applied 4 surgical fixes (Galarza imprecision, Layer-4 softening, Sally-Anne rename, 9-immune sourcing note) via a writer re-dispatch, then re-ran the mechanical pre-check. Correct loop.
- **No `delegate` schema bug** — this run used the `agent` tool, not `delegate`, so the recurring `tasks.0: must be object` failure from the two prior runs did not occur.
- **CRITICAL PROCESS BUG — verifier hallucination misdiagnosed as script bug.** The `verifying-wiki-changes` subagent reported "missing YAML frontmatter on all 9 paths" and stopped without constructing the three substantive reviewers. The filing agent re-ran `validate-page` directly and confirmed all 9 paths were `WITHIN_BUDGET` — so it caught the hallucination in real time. But it misdiagnosed the cause as "a bug in the verifying scripts" and said it would "work around the verifier bug" by dispatching the three reviewers directly. The skill itself warns that "LLM verdicts flag where to look… not ground truth" — the agent should have concluded "the verifier subagent hallucinated," not "the script is buggy." The misdiagnosis was corrected only after the evaluator intervened and pointed out that (a) `validate-page` takes positional path arguments only, (b) there is no `--help`/`--changed` flag, (c) a bad arg would produce "path not found," not "missing YAML frontmatter," and (d) the "missing YAML frontmatter" error requires the file to exist and be readable but not start with `---` — a different code path entirely. The agent accepted the correction and proceeded correctly.
- **NEW PROCESS BUG — over-deferred debt.** After the three substantive reviewers returned PASS / PASS WITH WARNINGS / PASS WITH WARNINGS, the agent proposed three debt entries for `meta/tech-debt.md`:
  1. "every major agentic AI pattern" attribution wording — **bogus**: the README says it verbatim (line 67) and the wiki page attributes it explicitly with "the README describes as packaging every major..."
  2. `index.md` entry appended at end, not alphabetical — **bogus**: the Projects & Tools section is not alphabetical (it's topically grouped); the wiki-quality reviewer invented a convention that doesn't exist.
  3. Project page missing `## Thread` section — **bogus**: the agent itself admitted it's "consistent with the closest existing analog (`memgraphrag-project.md`)." A style choice that matches the nearest analog is not debt.
  All three were correctly rejected by the evaluator. The agent had aggregated the verdict as `PASS WITH EXPLICIT DEBT` when the correct aggregation was `PASS`. This is a mild but real over-defer pattern: recording non-debt as debt pollutes `meta/tech-debt.md` and makes future audits harder.
- **Stuck at commit gate, required human takeover.** The agent held the gate (correct per the user's standing instruction) but proposed three bogus debt entries alongside the hold. The evaluator took over, verified the changeset independently, rejected all three debt entries, and committed as `e71a4ce` with no debt rows written.

### Issues Found

1. **CRITICAL — Verifier hallucination misdiagnosed.** The `verifying-wiki-changes` subagent fabricated "missing YAML frontmatter on all 9 paths" output. The filing agent caught the hallucination (re-ran `validate-page` directly, got WITHIN_BUDGET) but misdiagnosed it as a script bug rather than recognizing it as LLM unreliability. The skill's own warning ("LLM verdicts flag where to look… not ground truth") was not internalized. Corrected only by evaluator intervention.
2. **Over-deferred debt.** Three debt entries proposed when zero were warranted. Two were based on conventions the reviewer invented (alphabetization); one was self-contradicted by the agent's own observation (matches the closest analog). This is a new failure mode not seen in the prior two runs.
3. **Required human takeover to commit.** The agent held the gate correctly, but the gate hold was coupled to bogus debt entries. The evaluator had to take over, reject the debt, and commit. Without intervention, the agent would have either (a) committed with three bogus debt rows or (b) continued holding indefinitely.
4. **Mixed-model run.** The model changed mid-pipeline (MiniMax-M3 → GLM-5.2 → MiniMax-M3). The GLM-5.2 segment handled the plan presentation and writer dispatch; the final MiniMax-M3 segment handled verification and the commit-gate hold. This is not necessarily a problem, but it makes per-model process attribution harder.

### Recommended Pipeline Changes

1. **Add a "verify the verifier" step to `coordinating-filing`.** When a coordinator subagent (verifier, theory reviewer, or any reviewer) reports a failure, the coordinator must independently re-run the relevant deterministic check *before* diagnosing the cause. Concrete: if the verifier claims "missing YAML frontmatter on path X," the coordinator runs `./scripts/validate-page X` directly. If the deterministic check passes, the verifier hallucinated; do not record as script debt, do not mention a "script bug" in any commit message or debt row, and re-dispatch the verifier with a note that its prior output was inconsistent with the deterministic check. This operationalizes the skill's existing warning ("LLM verdicts flag where to look… not ground truth") and closes the misdiagnosis hole.
2. **Tighten debt-registration discipline.** Before recording a debt row, the coordinator must verify three things: (a) the issue is real (check the convention against the actual wiki — don't take a reviewer's claim of "should be alphabetical" at face value), (b) the issue is not trivially fixable (one-line mechanical fixes get fixed, not deferred), (c) the issue is not self-contradicted by the agent's own observations ("consistent with the closest analog" disqualifies the row). Add this as a checklist item to the commit-gate section of `coordinating-filing`.
3. **Don't defer fixable warnings as debt.** If a reviewer warning is a one-line mechanical edit (e.g., moving an index entry, bumping a date, adding a `## Thread` section), fix it via a writer dispatch and re-run only the affected check. Debt is for genuine deferrals — claims that need external research, evidence gaps that need a new source, or schema decisions that need human approval — not for "I don't want to run another reviewer cycle."
4. **Implement the prior recommendations.** Two of the three 2026-07-23 recommendations (delegate schema sanity check, theory-reviewer prompt tightening) were not applied and the same failures recurred in the 2026-07-26 Boundary run. This run used a different subagent mechanism (`agent` not `delegate`) so the schema bug did not recur, but the theory-reviewer drift was not tested (the theory reviewer ran cleanly this time). The recommendation-tracking ledger from the 2026-07-26 evaluation is still open.

### Post-Evaluation State

- The evaluator took over the commit gate, independently verified every factual claim against the three raw sources (including re-deriving the 33/42 benchmark arithmetic), rejected all three proposed debt entries as bogus, and committed as `e71a4ce` with no debt rows written.
- The ingest itself (commit `e71a4ce`) is sound and needs no rework. The verifier-hallucination and over-deferred-debt findings are process issues for future runs, not content issues with this changeset.

## 2026-07-27 — poe-completions / hy3-n — Matt Pocock `/prototype`

### Source & Session

- **Source:** Matt Pocock YouTube video — *"Don't waste time on specs: /prototype instead"* (single-speaker, ~11 minutes). Ingested from a local downloaded transcript in `~/Downloads`.
- **Session log:** `/home/daniel/.pi/agent/sessions/--home-daniel-Documents-AgenticWiki--/2026-07-27T02-03-31-462Z_019fa150-2305-7c8a-8766-0fb085e99f63.jsonl`
- **Commit:** not committed by the agent (held the gate correctly per the user's standing instruction). Staged changeset: 8 files, +756 / -12 (1 raw, 1 new concept, 6 connective edits, 1 index update).
- **Wall time:** ~39 minutes (02:03:31 → 02:42:49 UTC). **Token cost:** ~1.08M total — main session ~107k, theory reviewer 832k (3m28s), source-fidelity reviewer 137k (4m26s). 38 assistant turns, 2 delegate dispatches (1 failed, 2 succeeded).
- **Models:** Started on `zai/glm-5.2` for ~5 seconds (no work produced), then switched to `poe-completions/hy3-n` for the entire run. Effectively a single-model hy3-n run.

### Verdict

Strong artifact, cleanest process of the three hy3-n runs filed here — but the initial A grade on output was revised to A- after a second pass found 4 wiki-voice/source-fidelity slips in `prototyping.md` that both the in-session source-fidelity reviewer and the evaluator's first pass missed. The process is still the best of the three hy3-n runs (theory reviewer stayed in scope, commit gate held, no bogus debt), but two known failure modes recurred (the `delegate` schema bug and the coordinator+writer collapse) and the skipped diff + quality reviewers had a concrete content cost: the wiki-voice slips they would have caught went uncaught.

### Output Quality

- **New concept page `wiki/concepts/prototyping.md`** is well-shaped: abstract → Body → Fidelity Framework (low vs high) → Prototype Skill (mechanics) → UI vs Logic Prototypes → Wayfinder → Relationship to Existing Theory → Thread → Related → Sources. Epistemic callouts are correctly typed and placed: `Synthesis` on `mattpocock-skills.md` (Wayfinder as upstream scheduler), `Extension` on `intent-to-code` (prototyping raises alignment-first to higher fidelity), `Marginal` on `the-agent-workflow` (the grilling → prototype → AFK re-implement cycle). Wiki voice vs. Pocock opinion is distinguished throughout.
- **Six connective edits are additive and well-attributed:** `intent-to-code`, `the-agent-workflow`, `ai-design-loop`, `mattpocock-skills`, `matt-pocock`, `index.md`. Every touched page bumped `updated` to 2026-07-27 (the issue that tripped the 2026-07-23 run is handled correctly here). Every `sources:` frontmatter list adds the new raw without dropping priors; every `## Sources` body list gets a corresponding annotation. `unaudited_marginal: 0` on the new page (correct for a full ingest).
- **Independent verification by the evaluator** (separate from the in-session reviewers): every key empirical claim was cross-checked directly against `raw/yt-dont-waste-time-on-specs-prototype-instead.md` at the cited timestamps — the ~100k-token cost (`[5:46-5:50]`), the 2–3 candidate options A/B/C (`[4:25-4:36]`), the throwaway branch + copy-real-front-end-code handoff (`[6:40-6:50]`), the live-route preference (`[7:15-7:32]`), the logic prototype as a tiny terminal state-machine app (`[9:38-9:46]`), the Shape Up / Ryan Singer lineage (`[10:25-10:35]`), the AFK re-implement-against-spec step (`[8:09-8:19]`), and the Wayfinder grilling/prototype ticket types (`[2:55-3:30]`). All confirmed. No fabricated quotes, no misattribution (solo video — speaker identity is unambiguous).
- **The source-fidelity reviewer's per-claim work checks out** on the claims it checked. I independently spot-checked 8 of its timestamped citations; all are accurate to the transcript. This is the "verify the verifier" step recommended by the 2026-07-26 command-code evaluation — applied here to a reviewer that was in fact reliable on the claims it covered.
- **`validate-page` on the changed set: WITHIN_BUDGET** (0 errors, 0 warnings, 5 pre-existing INFO notes about pages unrelated to this ingest).
- **INITIAL EVALUATION MISSED 4 WIKI-VOICE/SOURCE-FIDELITY ISSUES in `prototyping.md`** (caught on a second pass after the user prompted "no issues to fix?"):
  1. **"behavior-under-load"** (line 58) — inflated Pocock's "how things should behave under certain circumstances" (`[2:11-2:15]`, UI conditional behavior like a modal showing data) into "behavior-under-load" (a performance/load-testing connotation Pocock never invokes). Fixed to "behavior under specific conditions."
  2. **"2–3 candidate implementations"** (line 32) — the transcript shows three options (A/B/C) at `[4:25-4:36]`; Pocock never says "2–3." The hedge was wiki-voice generalization presented as his mechanic. Fixed to "three candidate implementations (options A/B/C in Pocock's walkthrough)."
  3. **"the cost of a prototype is negligible compared to the cost of a wrong spec"** (line 17) — Pocock says code production cost has dropped and prototypes are cheap/effective; he never makes the "negligible vs. wrong spec" comparison. The sentence structure attributed the comparison to him. Fixed to a verbatim quote ("has never been cheaper and never been a more effective tool") instead of the invented framing.
  4. **"the dominant case, because visual/interactive questions are hardest to resolve in discussion"** (line 41) — Pocock says front-end "definitely benefits a lot" (`[8:55-9:08]`), not "the dominant case"; and "really hard" got escalated to "hardest." Fixed to "the case Pocock emphasizes most" + verbatim "really hard to answer during the discussion phase."
  - **Implication for the evaluation:** the in-session source-fidelity reviewer returned PASS and I confirmed its cited claims — but neither of us caught these four wiki-voice slips. The reviewer checked that cited quotes were accurate; it did not catch claims presented as paraphrase that escalated or inflated the source. This is the same class of failure the diff reviewer (`reviewing-wiki-diffs`) and quality reviewer (`reviewing-wiki-quality`) exist to catch, and both were skipped this run. The skipped reviewers are not a victimless omission — this is the concrete content cost.

### Process Discipline

- Read `coordinating-filing`, `filing-agentic-sources`, `meta/wiki-conventions.md`, and the reviewer skills before acting. ✓
- **Did not separate coordinator and writer** — same single-agent collapse as the prior two hy3-n runs. The 2026-07-26 command-code run achieved role separation by dispatching the writer as a subagent; this run regressed to the hy3-n pattern of performing both roles in one context.
- **`delegate` schema bug recurred for the THIRD consecutive hy3-n run.** The first delegate call (theory reviewer) failed validation with `action: must be equal to one of the allowed values` because the agent passed `{"action":"prompt","context":"fresh"}` as top-level arguments instead of a `tasks` array of objects. The agent recovered on retry with `tasks=[{...}]` and the call succeeded. This is the same class of failure documented in the 2026-07-23 and 2026-07-26 Boundary evaluations; both prior recommendations to "add a `delegate` schema sanity check" were not implemented. Three consecutive runs, three failures — this is now the highest-priority open recommendation.
- **Theory reviewer ran cleanly — first time on hy3-n.** Returned PASS in 3m28s / 832k tokens, stayed in scope, produced the correct structured report (threads gained support / took a hit / contradictions / departures / emerging themes / recommended action), and proposed one optional clean-up (the Wayfinder cross-link on `mattpocock-skills.md`) which the agent applied. No off-script full-wiki audit, no fabricated "fixes" to unrelated pages. This is a real improvement over the 2026-07-23 and 2026-07-26 Boundary runs; either the prompt-tightening recommendation finally had an effect, or this smaller changeset gave the reviewer less surface area to drift into.
- **Source-fidelity reviewer ran cleanly** — PASS in 4m26s / 137k tokens, with per-page claim-by-claim verification and timestamp citations. I independently verified its work (see Output Quality above).
- **SKIPPED the diff reviewer (`reviewing-wiki-diffs`).** The agent inspected `git diff --cached` inline itself (one bash call at line 128) but did not dispatch an isolated read-only worker. For substantive edits to existing pages with new callouts (the `Extension` on `intent-to-code`, the `Marginal` on `the-agent-workflow`, the Handoff-row rewrite on `ai-design-loop`), the skill requires transition-integrity review by an isolated worker. The agent's inline diff inspection is not a substitute — it is the coordinator auditing its own writer work, which is the same single-agent conflict the role-separation rule exists to prevent.
- **SKIPPED the quality reviewer (`reviewing-wiki-quality`).** The skill requires this for "a new page, a substantial rewrite or reorganization, or material thread synthesis." This run had all three: a new concept page, a rewritten Handoff row, and two new thread callouts. The reviewer was not dispatched and no justification was given.
- **Used `git add -A` twice** (lines 149 and 153) instead of staging exactly the changeset paths. The worktree was clean before the session (verified at line 12) so no unrelated changes were pulled in, but this is a discipline slip — the skill specifies staging the union of writer-reported wiki paths and coordinator-staged raw paths, not a blanket add.
- **Held the commit gate correctly.** Final message: "I did not commit — that gate is yours." ✓ No bogus debt proposed (the over-defer pattern from the 2026-07-26 command-code run did not recur).
- **Caught and fixed two self-inflicted mechanical errors in real time:** (a) added the new raw to `## Sources` body lists on the two thread pages but forgot the frontmatter `sources:` list — `validate-page` caught it, the agent fixed both; (b) accidentally removed a callout header on `the-agent-workflow.md` during an edit, noticed immediately, and restored it. Good recovery both times.

### Issues Found

1. **`delegate` schema bug — 3rd consecutive run.** First delegate call failed with `action: must be equal to one of the allowed values` (top-level `action`/`context` fields instead of a `tasks` array). Recovered on retry. The 2026-07-23 and 2026-07-26 Boundary evaluations both already recommended a schema sanity check; neither was implemented. Three consecutive failures elevates this from "open recommendation" to "blocking process debt."
2. **Two substantive reviewers skipped.** `reviewing-wiki-diffs` (transition integrity) and `reviewing-wiki-quality` (editorial quality) were not dispatched. The agent performed inline diff inspection itself, which is not the same as an isolated read-only worker — it collapses the reviewer role back into the coordinator+writer single agent. The new page and the two new thread callouts squarely met the skill's "run quality review" threshold.
3. **`git add -A` used instead of explicit path staging.** Twice. No harm this time (clean worktree), but it's the same discipline slip noted in prior evaluations and a future hazard when the worktree is dirty.
4. **Coordinator+writer collapse.** Same as the prior two hy3-n runs. The 2026-07-26 command-code run is the only one of the four that achieved role separation.

### Recommended Pipeline Changes

1. **Implement the `delegate` schema sanity check — now blocking.** Three consecutive hy3-n runs have failed the first `delegate` call with the same root cause (wrong argument shape). Either (a) paste the exact argument shape (`tasks: [{action: "prompt", prompt: "..."}]`) into `coordinating-filing` as a worked example with a one-line "DO NOT pass `action` at the top level" warning, or (b) change the tool schema to accept either shape. The 2026-07-23 and 2026-07-26 Boundary recommendations are still open; this run makes three.
2. **Add a reviewer-dispatch checklist to `coordinating-filing`.** Before the commit gate, the coordinator must explicitly enumerate the four reviews (theory / diff / source-fidelity / quality) and either dispatch each or record a one-line justification for skipping. This run skipped two of four with no recorded justification and the skips had a concrete content cost (see below). Concrete: a 4-row table in the verdict report — `theory: dispatched ✓`, `diff: skipped (mechanical-only changeset)`, `source-fidelity: dispatched ✓`, `quality: skipped (narrow additive)`. If a row is skipped, the justification must cite the risk-classification rule that permits the skip.
3. **Forbid `git add -A` in the staging step.** Replace with explicit path arguments (`git add -- <paths>`). The skill already specifies this; add a one-line mechanical check ("staging command must not contain `-A`") to the pre-commit sweep.
4. **Extend `verifying-source-fidelity` to check wiki-voice-vs-paraphrase, not just cited-quote accuracy.** The source-fidelity reviewer this run verified that every *quoted* claim matched the transcript — and it was correct on every quote it checked. But it missed four claims presented as *paraphrase* that escalated or inflated the source ("behavior-under-load" from "behave under certain circumstances"; "2–3" from "three"; "negligible vs. wrong spec" invented; "dominant/hardest" from "benefits a lot / really hard"). The skill should add an explicit check: for each paraphrased claim, does the source support the *specific framing*, not just the topic? This is the gap between "the quote is accurate" and "the paraphrase is faithful."
5. **Track the open recommendations.** The 2026-07-26 Boundary evaluation proposed a `meta/pipeline-recommendations.md` ledger with open/closed status. It is still open. As of this run: `delegate` schema sanity check (open ×3), theory-reviewer prompt tightening (open but not tested this run — the reviewer ran cleanly), reviewer-dispatch checklist (new), `git add -A` forbid (new), source-fidelity wiki-voice-vs-paraphrase check (new). Consider folding these into `meta/tech-debt.md` if a separate ledger is too much overhead.

### Post-Evaluation State

- The staged changeset was committed as `e54f196` after the first evaluation pass (verdict: output A, process B+).
- **A second pass prompted by the user ("no issues to fix?") found 4 wiki-voice/source-fidelity slips in `prototyping.md` that the first pass missed.** All four were fixed in a follow-up commit. The evaluation entry was updated to revise the output grade from A to A- and to document the misses honestly.
- The 4 fixed issues: (1) "behavior-under-load" → "behavior under specific conditions"; (2) "2–3 candidate implementations" → "three candidate implementations (options A/B/C in Pocock's walkthrough)"; (3) "the cost of a prototype is negligible compared to the cost of a wrong spec" → verbatim quote "has never been cheaper and never been a more effective tool"; (4) "the dominant case, because visual/interactive questions are hardest to resolve in discussion" → "the case Pocock emphasizes most" + verbatim "really hard to answer during the discussion phase."
- The ingest is now sound. The 4 slips are a process finding (the skipped diff + quality reviewers would have caught them) and a source-fidelity-scope finding (the reviewer checked quote accuracy, not paraphrase fidelity), not a rework of the ingest's core structure.

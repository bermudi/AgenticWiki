---
title: Model Filing Evaluations
created: 2026-07-23
updated: 2026-07-23
type: meta
---

# Model Filing Evaluations

A registry of model filing runs. Use it to compare how different models perform at the AgenticWiki pipeline and to decide whether skills or steps need to change.

## Summary

| Date | Provider / Model | Source(s) | Verdict | Output | Process | Key Issues | Pipeline Changes Suggested |
|---|---|---|---|---|---|---|---|
| 2026-07-23 | poe-completions / hy3-n | arXiv 2607.13285 — *Harness Handbook* (PDF) | Competent; output A-, process B | Strong concept/author pages; accurate source fidelity; clean `validate-page`; good integration | Read skills and ran gates, but mishandled `delegate`/worker separation; theory-review subagents went off-script | Stale `updated` dates on `self-harness.md` and `harnessx.md`; over-sourced `code-as-agent-harness.md`; high token/time cost | Final frontmatter sweep on all touched pages; add `delegate` schema sanity check; tighten theory-review prompt |

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

---
title: LLM-Guided Compression
created: 2026-06-18
updated: 2026-07-11
sources:
  - raw/2606.13177.md
tags: [concept, llm-as-judge, compression, factual-judgment, redundancy-detection]
unaudited_marginal: 0
---

# LLM-Guided Compression

> A compression pattern in which surface-level similarity is used only to propose candidate pairs and the actual delete/merge/preserve decision is deferred to an LLM judge grounded in factual content. Operates on the principle that two lexically similar entries may carry redundant facts (DELETE), complementary facts (MERGE), or distinct facts (PRESERVE) — and only a factual judge can tell which.

## The Central Insight

The pattern rests on a single observation: **surface similarity is too weak a signal to decide compression actions.** Two textually similar entries may carry:

- **Redundant facts** — the content of one is fully covered by the other, and one can be safely removed
- **Complementary facts** — each entry contributes content the other lacks, and they should be merged into a single concise entry that preserves both
- **Distinct facts** — the two entries assert unrelated information despite superficial similarity, and both should be preserved

A fixed similarity threshold (e.g., drop entries above 0.95 cosine similarity) cannot tell these cases apart. A high-similarity pair might be a verbatim duplicate (DELETE), a paraphrase with a critical detail added in one (MERGE), or two related but independent facts (PRESERVE). The decision requires reasoning about what the entries *say*, not how they *look*.

This is the [[memrefine|MemRefine]] framework's design choice: similarity is a *proposal mechanism* that surfaces candidate pairs whose content is most likely to overlap; the LLM judge is the *decision mechanism* that examines the pair's factual content and authorizes the appropriate action.

## The Redundancy/Complementarity/Distinctness Taxonomy

For any pair `(u, v)` of memory entries, the joint content decomposes exhaustively into three cases that map directly onto the action space:

| Joint content case | Action | Rationale |
|---|---|---|
| **Redundant** — `content(u) ⊆ content(v)` or `content(v) ⊆ content(u)` | DELETE the smaller | One entry's content is fully covered by the other |
| **Complementary** — `content(u) \ content(v) ≠ ∅` and `content(v) \ content(u) ≠ ∅` | MERGE into `m = Merge(u, v, d.instruction)` | Each entry contributes unique facts the other lacks |
| **Distinct** — `content(u) ∩ content(v) = ∅` (after factual analysis) | PRESERVE both | The two entries assert unrelated information |

The taxonomy is exhaustive over pairs: every pair falls into exactly one of the three cases, and the corresponding action is admissible in `F(M₀)`, the set of memory stores reachable from the initial store through edit operations. This is what makes the per-pair surrogate a valid operationalization of the [[storage-budgeted-memory|query-agnostic max-min program]].

## Why Pairs, Not Per-Entry Scoring

A direct alternative would be to score each entry independently (by embedding norm, recency, graph centrality, or some combination) and remove low-scoring entries until the budget is met. The argument against: **the value of a memory entry is relational, not independent.**

Two failure modes are indistinguishable under any per-entry criterion:

1. An entry may appear marginal in isolation yet become indispensable when combined with another
2. An entry may look high-value yet be safely removable because the same fact is already stored elsewhere

A per-entry score cannot tell when an edit removes a fact *not redundantly covered elsewhere*. The pairwise judgment is the minimal unit that captures redundancy as a relational property — and the smallest unit at which a factual judge can make the kind of decision similarity alone cannot.

## The Judge Prompt

The judge receives the two entries' text and returns a structured decision `d` containing:

- `d.action ∈ {DELETE, MERGE, PRESERVE}`
- A `d.target` (which entry to delete, when action is DELETE)
- A `d.instruction` (which facts to retain in the merged entry, when action is MERGE)

The prompt is engineered to ground the judge in factual content rather than surface wording: lexically similar entries with distinct facts should not be collapsed, and lexically dissimilar entries that nonetheless encode the same fact should be recognized as redundant. The exact prompt is in Appendix A.1 of the paper; the principles are:
- Reason about what each entry *asserts*, not what it *says*
- Treat near-duplicate paraphrases as redundant even if wording differs
- Treat "topically related but factually independent" as distinct even if wording overlaps

A separate **merge LLM** (sometimes the same model, sometimes different) is conditioned on the judge's merge instruction and synthesizes a single entry from both inputs.

## Position in the Wiki

This pattern is an instance of the general LLM-as-judge approach (the same machinery [[backpressure]] uses for verification of subjective criteria, [[rubric-evaluation]] uses for general evaluation, and the [[memrefine]] judge specializes for memory compression) applied to a specific kind of judgment (is this pair redundant, complementary, or distinct?), with several specific properties:

- **Decisive under tight budgets.** The paper's main empirical finding: LLM-guided judgment is roughly tied with rule-based heuristics when the budget is loose (most decisions involve obvious near-duplicates), but the LLM advantage widens dramatically as the budget tightens. The hard cases under aggressive compression are exactly the cases a fixed threshold cannot handle.
- **Model-agnostic in principle.** GPT-5-mini and Qwen3-8B behave similarly under moderate compression, indicating the pattern does not depend on a single proprietary model. The gap widens under tighter budgets where finer factual distinctions matter more.
- **Offline by design.** All judge and merge calls are issued during memory maintenance rather than at query time, so the cost is paid once and amortized over many retrievals.
- **Bounded in scope.** The judge decides a structured 3-way action; it does not need to reason about anything beyond the pair's factual content. This is a narrower judgment surface than open-ended summarization or generation, which is part of why the pattern works without a frontier model.

Adjacent patterns in the wiki:
- [[backpressure]] — LLM-as-judge for verification of subjective criteria; same pattern, different domain
- [[rubric-evaluation]] — LLM-as-judge for general evaluation; same machinery, different question
- [[verifiability]] — the pattern operates at the boundary where deterministic rules give way to factual judgment

## Thread

- [[agent-quality-engineering]] — LLM-as-judge is a quality engineering primitive; this is its compression-specific instance
- [[the-verifiability-thesis]] — The pattern operates where factual judgment is required and deterministic rules fail

## Related

- [[memrefine]] — The framework that operationalizes this pattern for agent memory
- [[agent-memory-systems]] — Corroborates that abstraction is inherently lossy, validating why factual-judge compression (not surface similarity) is required
- [[storage-budgeted-memory]] — The problem formulation this pattern solves
- [[backpressure]] — LLM-as-judge for verification
- [[rubric-evaluation]] — LLM-as-judge for evaluation
- [[jagged-frontier]] — Empirical evidence: factual reasoning is a regime where simple heuristics fail and LLM judgment is necessary
- [[critical-failure]] — A sparse catastrophic decision (e.g., deleting a load-bearing fact under tight budget) is the worst case the pattern hedges against

## Sources

- `raw/2606.13177.md` — Kim, Baek, Jeong, Hwang (Korea U / KAIST / DeepAuto.ai, June 2026). *MemRefine: LLM-Guided Compression for Long-Term Agent Memory.* arXiv 2606.13177. The redundancy/complementarity/distinctness taxonomy in §3.2, the judge prompt structure, the model-family ablation in §5 (Figure 5: GPT-5-mini vs Qwen3-8B), the rule-based baseline comparison in §5 (Figure 4: RuleSim, RulePR).

---
title: MemRefine
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/memrefine-llm-guided-compression-for-long-term-agent-memory.pdf
tags: [concept, agent-memory, compression, llm-as-judge, post-construction, harness-mechanism]
unaudited_marginal: 0
---

# MemRefine

> A post-construction, LLM-guided memory compression framework that uses similarity only to propose candidate pairs and defers the delete, merge, and preserve decision to an LLM judge grounded in factual content. Iterates until the memory store meets a target storage budget. Framework-agnostic: applies to graph memory (A-MEM), ingested memory (Mem0), or any representation with embeddings.

## The Problem It Solves

As long-term LLM agents accumulate interactions, their memory stores grow without bound and fill with redundant entries. The redundancy has two costs: storage cost (acute on resource-constrained on-device deployments with hard memory budgets) and retrieval cost (near-duplicate or low-value entries crowd out useful evidence at query time). The paper formalizes this as the [[storage-budgeted-memory|storage-budgeted memory management]] problem: keeping an already constructed memory store within a fixed budget while retaining information useful for future interactions.

The gap in existing approaches: session-level summarization compresses raw conversation before it enters memory (not the resulting store), inference-time context compression reduces the prompt fed to the LLM at query time (not the store itself), and structure-based graph pruning relies on criteria like centrality that don't capture whether entries are factually redundant, complementary, or distinct. None of them jointly reduces an already constructed store to a target budget while reasoning about factual content.

## The Method

**Pairwise refinement loop.** At each iteration, MemRefine selects the most-similar pair of memory entries that has not yet been judged. The pair is passed to an LLM judge that returns a structured decision `d` with `d.action ∈ {DELETE, MERGE, PRESERVE}`, an optional deletion target, and (for MERGE) a merge instruction specifying which facts to retain. The judge is prompted to reason about the **factual content** of the pair, not surface wording — so lexically similar entries with distinct facts are not collapsed, and lexically dissimilar entries that encode the same fact are recognized as redundant.

The redundancy/complementarity/distinctness taxonomy follows from first principles. The joint content of any two entries decomposes into:
- **Redundant** — one entry's content is fully covered by the other (DELETE)
- **Complementary** — each entry contributes content the other lacks (MERGE into a single concise entry)
- **Distinct** — the two entries assert unrelated facts (PRESERVE both)

This is the action space matching the edits admitted by `F(M₀)`, the set of memory stores reachable from the initial store through edit operations.

**Why pairs, not per-entry scoring.** A direct alternative would be to assign an importance score to each entry independently and remove low-scoring entries. The paper's argument: the value of a memory entry is *relational* rather than independent. An entry may appear marginal in isolation yet become indispensable when combined with another; conversely, an entry may look high-value yet be safely removable because the same fact is already stored elsewhere. These two failure modes look identical under any per-entry criterion (embedding norm, recency, graph centrality) — so single-entry scoring cannot tell when an edit removes a fact not redundantly covered elsewhere. Pairwise judgment is the minimal unit that captures redundancy as a relational property.

**Similarity as a proposal mechanism only.** MemRefine ranks candidate pairs by cosine similarity of entry embeddings, but the similarity score is never the action. The separation matters because high cosine similarity can equally indicate redundancy, complementarity, or merely topical overlap, all of which call for different actions. The judge gets the pair's text and decides.

**Update rules.** DELETE: remove the judge-selected target from `M′`, prune dangling edges. MERGE: a separate merge LLM synthesizes a single entry from both, conditioned on the judge's merge instruction; replace `u` and `v` with `m`; inherit the union of links (no duplicates, no self-loops); recompute the embedding so future proposals reflect the merged content. PRESERVE: both entries remain, and `(u, v)` is cached so the loop doesn't revisit the same pair.

**Termination.** The loop continues until `size(M′) ≤ B` (the budget) or no unjudged candidate pair remains. Early-exit on PRESERVE-exhaustion is a design principle, not a bug: when all sufficiently similar pairs have been judged PRESERVE, further compression would necessarily remove facts not redundantly stored elsewhere, violating the inner minimization in the [[storage-budgeted-memory|query-agnostic max-min program]].

**Offline, framework-agnostic.** All judge and merge calls are issued during memory maintenance rather than at query time, so compression reduces the persistent footprint of the store without inflating per-query retrieval or generation latency. It is designed as a module inserted after memory construction and before retrieval, leaving the host construction and retrieval pipelines unchanged. For graph-structured memory (A-MEM), it prunes dangling edges on DELETE and inherits the union of links on MERGE. For non-graph stores (Mem0), it operates directly on entries and their embeddings.

## Empirical Results

**Main results (Table 1).** On LoCoMo, both A-MEM-style graph memory and Mem0 retain performance comparable to the uncompressed store under moderate compression (70%–50% budgets), with F1 holding essentially flat:

| Framework | Metric | Base | 70% | 60% | 50% | 40% | 30% |
|---|---|---|---|---|---|---|---|
| A-MEM graph | F1 | 0.4013 | 0.4014 | 0.3977 | 0.3902 | 0.3844 | 0.3628 |
| Mem0 | F1 | 0.2827 | 0.2888 | 0.2773 | 0.2761 | 0.2685 | 0.2510 |

A-MEM F1 holds to within 0.4pp at 60% budget (0.4013 → 0.3977) and within 3.9pp at 30% budget (0.4013 → 0.3628). Mem0 actually improves over base at 70% (0.2888 vs 0.2827) and holds within 0.7pp at 50% (0.2827 → 0.2761).

**Scaled LoCoMo (3x and 10x longer conversations).** Performance degrades more gracefully than naive heuristics would suggest. At 10x and 30% budget, A-MEM F1 is 0.1660 (down from 0.2053 base) — an 18.8% relative drop on much harder inputs, but the method still returns useful answers. The paper's argument: the underlying question distribution is query-agnostic, so aggressive compression on longer histories amplifies the risk of removing rare but useful facts, and MemRefine's paired-judge approach hedges against that risk.

**LongMemEvalS.** A-MEM graph memory reaches its *best* accuracy at an intermediate 50–60% budget (0.6167 / 0.6000, vs base 0.5833) — moderate compression is not just neutral, it is occasionally beneficial. Mem0 is more fragile (0.4500 at 30%).

**Category-wise effects (LoCoMo, A-MEM graph).** Localized question categories *improve* under compression: single-hop +0.034 and temporal +0.072 at 30% budget, consistent with the intuition that removing repeated facts makes retrieval less noisy when the answer depends on a small, localized piece of evidence. Open-ended and counterfactual questions benefit less and are more sensitive to tighter budgets, since their evidence is spread across a wider portion of the store. Mem0's category profile is different — its ingestion-and-update pipeline already transforms raw interactions into processed entries, so the post-construction compression interacts with already-consolidated content.

**Comparison with rule-based baselines (Figure 4).** The two baselines reuse the same candidate-pair selection loop but replace the LLM judge with fixed heuristics:

- **RuleSim** — action decided from a fixed embedding-similarity threshold
- **RulePR** — uses graph PageRank-style preservation on top of similarity

Rule-based methods remain competitive when the budget is loose (most decisions involve obvious near-duplicates), but fall off far more sharply as the budget tightens. Under aggressive compression, the difficult cases are no longer near-duplicate nodes but semantically related memories whose factual relationship must be interpreted. A fixed similarity threshold cannot separate redundant paraphrases from complementary facts; graph centrality does not indicate whether a memory holds evidence needed for future questions. The widening MemRefine advantage under tighter budgets is the paper's main empirical argument that **LLM-guided factual judgment is necessary, not just useful**.

**Effect of compression model (Figure 5).** GPT-5-mini and Qwen3-8B behave similarly under moderate compression, indicating MemRefine does not rely on a single proprietary judge. The gap widens under tighter budgets, where finer distinctions between redundant, complementary, and distinct memories matter more. Stronger judge models become more valuable as the storage constraint grows severe.

**Algorithmic summary (paper's Algorithm 1).** The procedure is:

```
M′ ← M₀
S ← ∅
while size(M′) > B:
    (u, v) ← MostSimilarPair(M′, S)        # propose
    if no candidate: break
    d ← Judge(u, v)                        # decide
    if d.action = DELETE:    Remove d.target from M′
    elif d.action = MERGE:   Replace u, v with Merge(u, v, d.instruction); recompute embedding
    else:                    S ← S ∪ {(u, v)}
return M′
```

## Position in the Wiki

**Fills the inverse problem in [[harness-mechanisms|memory mechanisms]].** The [[harness-mechanisms]] survey (§3.2) covers memory construction (working, semantic, experiential, long-term) but leaves the inverse problem of *shrinking* an already constructed store largely unaddressed. MemRefine is the first explicit compression primitive in this taxonomy.

**Concrete instance of [[evolving-context|offline memory maintenance]].** It extends the [[evolving-context]] thread (prompt evolution, memory/preference learning, skill learning, harness self-evolution, schema evolution) to a fifth axis: post-construction compression. Where [[self-harness]] and [[executable-memory]] regenerate the *harness surface* or the *user-model schema*, MemRefine regenerates the *memory store* itself, the append-only log is the storage and the compressed store is the materialized view.

**Direct complement to [[executable-memory|executable memory]].** [[executable-memory]] (Bojie Li, User as Code, 2026) operates on a *typed* user model: the representation is structured Python the interpreter can read, so the question of "how do I make memory small" is partly sidestepped (the structure is what the LLM produces; you don't redundantly store it). MemRefine operates on *free-text* memory entries: the representation is whatever the host framework produced, and compression is the explicit task. The two methods target different memory substrates; both arise from the same observation that **storage and representation should be decoupled** — for UaC by regenerating typed Python from an append-only fact log, for MemRefine by iterating a pairwise judge over free-text entries until the budget is met.

**Validation of LLM-as-judge at the memory layer.** The MemRefine judge is the same pattern [[backpressure]] uses for verification of subjective criteria (a binary pass/fail LLM call) and [[rubric-evaluation]] analyzes as a general scoring mechanism, applied to the specific question "is this pair redundant, complementary, or distinct?" The paper's empirical finding — that LLM-guided judgment is decisive under tight budgets, while rule-based heuristics fall off — is direct evidence for the [[jagged-frontier]] prediction: factual reasoning is a regime where simple heuristics fail and LLM judgment is necessary.

**Operational instance of the [[verifiability|verifiability]] thesis.** A storage budget is a verifiable constraint: `size(M′) ≤ B` is a deterministic check. The interesting verifiability question is whether the resulting store is still useful — and that requires downstream evaluation, exactly the [[verification-loop]] pattern MemRefine substitutes for at construction time. The framework is also offline: the per-query latency of the host pipeline is unchanged, so the cost of compression is paid once and amortized.

## Thread

- [[code-as-agent-harness]] — MemRefine is the missing compression module inserted between memory construction and retrieval
- [[harness-mechanisms]] — The inverse problem of shrinking an already constructed memory store, added as a new memory mechanism
- [[evolving-context]] — Offline memory maintenance as a fifth axis alongside prompt evolution, memory/preference learning, skill learning, harness self-evolution, and schema evolution
- [[agent-quality-engineering]] — LLM-as-judge for memory compression is a quality engineering primitive; the same generate-verify-review pattern applied to a different substrate
- [[the-verifiability-thesis]] — A storage budget is a verifiable constraint; downstream utility is the verification mechanism the framework substitutes for
- [[tool-design-for-agents]] — The judge prompt is a new tool surface; prompt design directly affects the action distribution

## Related

- [[storage-budgeted-memory]] — The new problem formulation MemRefine solves
- [[llm-guided-compression]] — The LLM-as-judge compression pattern as a general concept
- [[harness-mechanisms]] — Memory mechanisms taxonomy
- [[executable-memory]] — The typed-state counterpart; UaC sidesteps compression by structuring the user model
- [[evolving-context]] — The thread MemRefine extends
- [[backpressure]] — LLM-as-judge for compression uses the same pattern as LLM-as-judge for verification
- [[jagged-frontier]] — LLM judgment is necessary under tight budgets where rule-based heuristics fail
- [[critical-failure]] — Pairwise judging avoids the per-entry scoring trap where a sparse catastrophic decision (deleting a load-bearing fact) is hard to detect
- [[minjae-kim]], [[jinheon-baek]], [[soyeong-jeong]], [[sung-ju-hwang]] — Authors of the MemRefine paper

## Sources

- `raw/memrefine-llm-guided-compression-for-long-term-agent-memory.pdf` — Kim, Baek, Jeong, Hwang (Korea U / KAIST / DeepAuto.ai, June 2026). *MemRefine: LLM-Guided Compression for Long-Term Agent Memory.* arXiv 2606.13177. The full paper, 16 pages. Defines the storage-budgeted memory management problem, introduces the LLM-guided pairwise refinement procedure, and validates across two memory frameworks (A-MEM graph, Mem0) and four benchmarks (LoCoMo, 3x LoCoMo, 10x LoCoMo, LongMemEvalS) with rule-based baselines (RuleSim, RulePR) and a judge-model ablation (GPT-5-mini vs Qwen3-8B).

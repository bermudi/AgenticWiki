---
title: Storage-Budgeted Memory
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/memrefine-llm-guided-compression-for-long-term-agent-memory.pdf
tags: [concept, agent-memory, compression, problem-formulation, query-agnostic, max-min]
unaudited_marginal: 0
---

# Storage-Budgeted Memory

> A new problem formulation: given an already constructed agent memory store, produce a compressed store `M′` that fits within a fixed storage budget while remaining as useful as possible across an unknown future query distribution. The paper formalizes this as a query-agnostic max-min program, then instantiates it with [[memrefine|MemRefine]] as the proposed solution.

## The Problem

Let `M₀ = {mᵢ}ⁿᵢ₌₁` be an already constructed memory store. Each entry `mᵢ` pairs textual content with an embedding vector and (depending on the host memory framework) may carry links, timestamps, metadata, or other structured fields. A downstream pipeline answers queries via `a = LLM(q, Ret(q; M))`, and task utility is `U(q, M) ∈ [0, 1]` against a reference answer.

The store-budgeted memory management task is: produce a compressed store `M′` reachable from `M₀` through edit operations (deletions, merges, preserves) such that `size(M′) ≤ ρ · size(M₀)` for a budget ratio `ρ ∈ (0, 1]`, while `M′` is as useful as possible across a query subspace `Q` the compressor does not observe.

The formalization:

```
max    min    U(q, M′)
M′∈F(M₀)  q∈Q

s.t.   size(M′) ≤ ρ · size(M₀)
```

The inner minimization picks the worst-case query under `M′`; the outer maximization is forced to retain enough evidence for every plausible `q ∈ Q` rather than only the easy ones. Equivalent dual form: `min size(M′) subject to U(q, M′) ≥ U(q, M₀) − ε for all q ∈ Q`.

## Why This Formulation

The paper's claim: existing compression literature does not target this setting.

- **Session-level summarization** (Wang et al. 2025; Chen et al. 2025) compresses raw conversation history before it enters memory, not the resulting store.
- **Inference-time context compression** (Jiang et al. 2023, 2024; Xu et al. 2024) operates on the evidence provided to the LLM at query time, not on the persistent store.
- **Structure-based graph pruning** (Brin and Page, 1998) uses criteria like centrality that don't capture whether entries are factually redundant, complementary, or distinct.

None of them jointly reduces an already constructed store to a target budget while reasoning about the factual content of entries. Storage-budgeted memory management fills this gap.

## Why the Query-Agnostic Inner Minimization Matters

The compressor cannot tailor `M′` to any particular query, so compression is cast as query-agnostic. Directly optimizing the max-min program is intractable: `Q` is unobserved at compression time, `U` requires running the full downstream pipeline for every candidate `M′`, and `F(M₀)` is combinatorial in `n`.

But the inner minimization itself implies a useful constraint on removable content: since the compressor should hedge against every plausible query, it can only safely discard entries that are either **redundant** (already covered by some other entry in `M′`) or **non-factual** (carrying no information useful to any plausible query). This contrasts with inference-time prompt or context compressors, which use the incoming query as a selection signal to prune evidence at the token level. The storage-budgeted problem is a *preservation* problem, not a *selection* problem.

## The Per-Pair Surrogate

The paper's operational move: replace the intractable inner minimization with a tractable per-pair surrogate — a judge (powered by an LLM) that, for each pair of semantically related entries, decides whether their content is redundant, complementary, or distinct, and authorizes only those edits that preserve facts not redundantly stored elsewhere.

For any pair `(u, v)`, the joint content decomposes exhaustively into a redundant case (one is covered by the other), a complementary case (each contributes content the other lacks), and a distinct case (the two assert unrelated facts). This induces the delete–merge–preserve action space matching the edits admitted by `F(M₀)`.

## Where the Formulation Comes From

The query-agnostic framing is the right one for an offline, post-construction module: the store must serve any plausible future query, not a known one. By contrast, query-time compression can pick evidence to fit a specific query and skip the inner minimization. The offline compression problem is harder because it must hedge against the worst case.

## Where This Lives in the Wiki

This is a new problem formulation in the agent-memory literature. The [[harness-mechanisms]] survey (§3.2) covers memory mechanisms but leaves the inverse problem unaddressed. The [[evolving-context]] thread treats how the agent's memory, prompts, and skills improve over time, but the specific operational task of compressing an already constructed store to a fixed budget was not formalized before. [[memrefine|MemRefine]] is the proposed solution; this page is the formalization it solves.

Adjacent framings in the wiki:
- [[context-engineering]] — deals with per-session context size; not the persistent store
- [[smart-zone-dumb-zone]] — the regime-aware version of context size; same axis, different unit
- [[comprehension-debt]] — the social cost of opaque agent memory; storage-budgeted memory is the technical response
- [[verifiability]] — a storage budget is a verifiable constraint; downstream utility is the verification mechanism the framework substitutes for

## Thread

- [[code-as-agent-harness]] — A new memory mechanism inserted between construction and retrieval
- [[harness-mechanisms]] — The inverse problem of shrinking an already constructed store, added as a new memory mechanism
- [[evolving-context]] — Offline memory maintenance as a thread extension
- [[the-verifiability-thesis]] — A storage budget is a verifiable constraint; downstream utility is the verification mechanism

## Related

- [[memrefine]] — The proposed solution to this problem
- [[llm-guided-compression]] — The LLM-as-judge compression pattern as a general concept
- [[harness-mechanisms]] — Memory mechanisms taxonomy that this formulation extends
- [[executable-memory]] — The typed-state counterpart that sidesteps the problem by structuring the user model
- [[critical-failure]] — The compressor's worst case is a sparse catastrophic deletion of a load-bearing fact
- [[backpressure]] — Storage budget as a verifiable constraint; the framework's downstream evaluation is a quality signal

## Sources

- `raw/memrefine-llm-guided-compression-for-long-term-agent-memory.pdf` — Kim, Baek, Jeong, Hwang (Korea U / KAIST / DeepAuto.ai, June 2026). *MemRefine: LLM-Guided Compression for Long-Term Agent Memory.* arXiv 2606.13177. The full problem formulation in §3.1, the per-pair surrogate that operationalizes it in §3.2, the connection to existing compression literature in §2.

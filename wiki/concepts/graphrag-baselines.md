---
title: GraphRAG Baselines
created: 2026-07-22
updated: 2026-07-22
sources:
  - raw/2606.00610v1.md
tags: [graphrag, rag, retrieval, baselines]
unaudited_marginal: 0
---

# GraphRAG Baselines

> Three GraphRAG approaches that [[memgraphrag|MemGraphRAG]] characterizes as baselines: [[#LightRAG|LightRAG]] (two-level retrieval), [[#HippoRAG|HippoRAG]] (associative memory + PPR), and [[#Microsoft GraphRAG|Microsoft GraphRAG]] (community detection + recursive summarization). All three lack global memory during construction, which produces the three deficiencies the [[graphrag-quality-problems|GraphRAG Quality Problems]] thread identifies.

> [!note] Framing caveat
> This page describes all three systems through **MemGraphRAG's lens** — a competitor's characterization in service of its own argument. The benchmark deltas come from Tables 1–2 of the MemGraphRAG paper, and G-Medical/G-Novel are benchmarks where MemGraphRAG's construction-heavy design is expected to win. Each system's own authors frame their design choices as deliberate trade-offs, not as defects. Treat as competitor-characterized pending primary-source ingest.

## LightRAG

LightRAG uses a two-level retrieval structure (entity-level graph retrieval + chunk-level vector retrieval) for efficient multi-hop question answering. Its design prioritizes construction efficiency and incremental updates over retrieval quality.

**Key features:** Two-level retrieval, efficient construction, incremental document updates without full rebuild.

**Limitations (per MemGraphRAG):** No global memory during extraction, no conflict resolution, no structural bridging. G-Medical LLM-Acc: 46.09% vs MemGraphRAG's 57.41%. Retrieval time: 11.052s vs 0.061s.

## HippoRAG

HippoRAG is inspired by human associative memory (hippocampal indexing theory). It constructs a knowledge graph from documents and uses Personalized PageRank (PPR) over the graph to simulate multi-hop reasoning during retrieval. HippoRAG2 extends this with improved retrieval and integration.

**Key features:** Graph construction via entity/relation extraction, PPR-based retrieval simulating hippocampal pattern completion, associative memory design.

**Limitations (per MemGraphRAG):** Single-pass extraction with no global memory, no conflict resolution, no structural bridging. HippoRAG2 retrieval time: ~1.5s vs MemGraphRAG's 0.061s. MemGraphRAG adds structure-aware PPR initialization and hub suppression on top of the same PPR retrieval mechanism.

## Microsoft GraphRAG

Microsoft GraphRAG is an early GraphRAG approach that uses community detection (Leiden algorithm) and recursive summarization to organize knowledge into hierarchical communities. Queries are mapped to relevant communities and answered from community summaries.

**Key features:** Multi-level community detection, recursive LLM summarization of communities, global-context retrieval via community structure.

**Limitations (per MemGraphRAG):** Chunk-isolated extraction with no thematic filtering, error propagation in recursive summaries (inaccuracies amplify at higher levels), no conflict resolution, no structural bridging. Overall average accuracy: 41.43% vs MemGraphRAG's 59.25%.

## Comparison to MemGraphRAG

| Aspect | LightRAG | HippoRAG | MS GraphRAG | MemGraphRAG |
|--------|----------|----------|-------------|-------------|
| Global memory | None | None | None | Three-Layer Global Memory |
| Construction | Single-pass | Single-pass | Community detection + summarization | Multi-agent (extraction, detection, resolution) |
| Conflict resolution | None | None | None | Evidence-driven resolution agents |
| Structural bridging | None | None | None | Type-based + similarity-based |
| Retrieval | Two-level (entity + chunk) | PPR | Community mapping + summaries | PPR + structure-aware init + hub suppression |
| G-Medical LLM-Acc | 46.09% | — | 50.43% | **57.41%** |
| Overall Avg | — | 55.79% (HippoRAG2) | 41.43% | **59.25%** |
| Retrieval time | 11.052s | ~1.5s (HippoRAG2) | Not reported | **0.061s** |

## Thread

- [[graphrag-quality-problems]] — All three baselines exhibit the three deficiencies this thread identifies

## Related

- [[memgraphrag]] — Outperforms all three baselines on all benchmarks
- [[graphrag-quality-problems]] — Thread on the three deficiencies all baselines share
- [[three-layer-global-memory]] — MemGraphRAG's memory architecture (absent in all baselines)
- [[personalized-pagerank-rag]] — Both HippoRAG and MemGraphRAG use PPR; MemGraphRAG adds structure-aware initialization and hub suppression

## Sources

- `raw/2606.00610v1.md` — §2 (Related Work), Tables 1–2, §3.3 (Discussion)

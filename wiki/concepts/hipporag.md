---
title: HippoRAG
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
tags: [graphrag, rag, associative-memory, pagerank]
---

# HippoRAG

> HippoRAG is a GraphRAG approach inspired by human associative memory (hippocampal indexing theory). It constructs a knowledge graph from documents and uses Personalized PageRank over the graph to simulate multi-hop reasoning during retrieval. HippoRAG2 extends this with improved retrieval and integration.

> [!note] Framing caveat
> This page describes HippoRAG through **MemGraphRAG's lens** — a competitor's characterization in service of its own argument. The "no global memory / no conflict resolution" framing and the retrieval-speed comparison (~1.5s vs 0.061s) come from §2 and Table 2 of the MemGraphRAG paper, not from HippoRAG's authors. HippoRAG's own papers frame its PPR + associative-memory design as a deliberate retrieval-time choice, not a gap. Treat as competitor-characterized pending primary-source ingest.

## Core Idea

- **Graph construction**: Extract entities and relations from documents to build a knowledge graph
- **Associative memory**: Personalized PageRank (PPR) over the graph mimics hippocampal pattern completion — spreading activation from query nodes retrieves associated information
- **No multi-agent construction**: Single-pass extraction; no global memory during construction
- **No conflict resolution**: Contradictions in extracted graph are not explicitly resolved

## HippoRAG2 Improvements

- Enhanced retrieval mechanism
- Better graph construction quality
- Improved integration with LLM generation

## Comparison to MemGraphRAG

| Aspect | HippoRAG / HippoRAG2 | MemGraphRAG |
|--------|---------------------|-------------|
| **Graph construction** | Single-pass extraction | Multi-agent + Three-Layer Memory |
| **Global memory** | None | Three-Layer Global Memory |
| **Conflict resolution** | None | Detection + Resolution Agents |
| **Structural bridging** | None | Type-based + Similarity-based |
| **Retrieval** | PPR | PPR + Structure-aware init + Hub suppression |
| **Retrieval speed** | ~1.5s (HippoRAG2) | **0.061s** |
| **Benchmarks** | HotpotQA, 2Wiki, MuSiQue | HotpotQA, 2Wiki, MuSiQue, G-Medical, G-Novel |

## Related

- [[memgraphrag]] — Addresses HippoRAG's limitations with memory-based construction
- [[personalized-pagerank-rag]] — Both use PPR; MemGraphRAG adds structure-aware initialization
- [[graphrag-quality-problems]] — HippoRAG doesn't address the three deficiencies

## Thread

- [[graphrag-quality-problems]] — HippoRAG uses PPR for retrieval but lacks global memory during construction; MemGraphRAG adds memory + agents to fix the three deficiencies

## Sources

- `raw/2606.00610v1.md` — Paper: §2 (Related Work), Table 1 (baselines), Table 2 (retrieval comparison); cites HippoRAG [19] and HippoRAG2 [20]
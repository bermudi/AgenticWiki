---
title: Microsoft GraphRAG
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
tags: [graphrag, rag, community-detection, summarization]
---

# Microsoft GraphRAG

> Microsoft GraphRAG is an early GraphRAG approach that uses community detection and recursive summarization to organize knowledge into hierarchical communities. It is one of the baselines MemGraphRAG outperforms.

> [!note] Framing caveat
> This page describes Microsoft GraphRAG through **MemGraphRAG's lens** — a competitor's characterization in service of its own argument. The "error propagation" critique and the 41.43% accuracy figure come from §3.3 and Table 1 of the MemGraphRAG paper. Microsoft GraphRAG's own authors frame community detection + recursive summarization as a deliberate global-context mechanism (communities *are* a form of global structure), which the "no global memory" framing elides. Treat as competitor-characterized pending primary-source ingest.

## Approach

- **Graph construction**: Extract entities/relations → build knowledge graph
- **Community detection**: Leiden algorithm to find communities at multiple levels
- **Recursive summarization**: LLM summarizes each community → higher-level summaries of summaries
- **Retrieval**: Map query to relevant communities → use summaries for generation

## Limitations

| Issue | Impact |
|-------|--------|
| **No global memory during construction** | Extraction is chunk-isolated; no thematic filtering |
| **Error propagation** | Inaccuracies in low-level extractions amplify in higher-level summaries |
| **No conflict resolution** | Contradictions across chunks merged into communities |
| **No structural bridging** | Entity duplication across communities not resolved |
| **Slow retrieval** | Community mapping + summary retrieval adds latency |

## Comparison to MemGraphRAG

| Metric | Microsoft GraphRAG | MemGraphRAG |
|--------|-------------------|-------------|
| Overall Avg Accuracy | 41.43% | **59.25%** |
| G-Medical LLM-Acc | 50.43% | **57.41%** |
| Retrieval Time | Not reported | **0.061s** |
| Conflict Resolution | None | Detection + Resolution Agents |
| Global Memory | None | Three-Layer Global Memory |
| Structural Bridging | None | Type-based + Similarity-based |

## Related

- [[memgraphrag]] — Outperforms Microsoft GraphRAG on all benchmarks
- [[graphrag-quality-problems]] — Microsoft GraphRAG exhibits all three deficiencies
- [[hipporag]] — Another GraphRAG baseline
- [[lightrag]] — Another GraphRAG baseline

## Sources

- `raw/2606.00610v1.md` — Paper: Table 1 (MS-GraphRAG 41.43% overall avg vs MemGraphRAG 59.25%), §2 (Related Work: "Early efforts, such as RAPTOR [44] and Microsoft's GraphRAG [12], organize knowledge through recursive summarization and community-level abstractions"), §3.3 (Discussion: "unsupervised approaches remain susceptible to error propagation")
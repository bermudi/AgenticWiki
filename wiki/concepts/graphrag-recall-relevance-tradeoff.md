---
title: GraphRAG Recall-Relevance Trade-off
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
tags: [graphrag, retrieval, tradeoff, recall, relevance]
---

# GraphRAG Recall-Relevance Trade-off

> GraphRAG systems exhibit a fundamental trade-off: graph expansion improves retrieval recall (coverage) but introduces irrelevant evidence that degrades relevance and generation accuracy. MemGraphRAG breaks this trade-off by addressing root causes during construction rather than filtering at retrieval time.

## The Trade-off

| System | Recall | Relevance |
|--------|--------|-----------|
| Vanilla RAG (Top-5) | 71.8% | 62.9% |
| GFM-RAG (GraphRAG) | **84.3%** | **38.5%** |

GraphRAG expands the retrieval set by following graph edges, finding more potential evidence (higher recall). However, the expanded context contains:
- Thematically irrelevant triples (noise)
- Logically contradictory facts
- Fragmented paths that don't connect meaningfully

This "noisy, contradictory context" overwhelms the LLM generator, lowering answer accuracy despite higher recall.

## Root Causes (Three Deficiencies)

1. **Thematic irrelevance** → Low-frequency/off-topic triples pollute context
2. **Logical inconsistency** → Contradictory facts create confusing reasoning paths
3. **Structural fragmentation** → Disconnected subgraphs prevent coherent multi-hop evidence aggregation

## MemGraphRAG's Break

MemGraphRAG achieves **both** higher recall and higher relevance:
- **Construction-time solutions** (not retrieval-time filtering):
  - Ontology Layer frequency filtering → removes thematic noise at source
  - Conflict Resolution Agent → eliminates contradictions before graph merge
  - Memory-Guided Bridging → connects islands for coherent multi-hop paths
- **Result**: 59.25% avg accuracy vs HippoRAG2 55.79% (best prior GraphRAG), with 0.061s retrieval (fastest)

## Related

- [[graphrag-quality-problems]] — Thread on the three deficiencies causing this trade-off
- [[memgraphrag]] — Solution that breaks the trade-off
- [[graphrag-thematic-irrelevance]] — Deficiency 1
- [[graphrag-logical-inconsistency]] — Deficiency 2
- [[graphrag-structural-fragmentation]] — Deficiency 3

## Sources

- `raw/2606.00610v1.md` — §3.1 Figure 2(a) recall vs relevance plot; §3.3 Discussion "fundamental trade-off"; Table 1 results
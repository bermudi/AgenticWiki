---
title: GraphRAG Quality Problems
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [thread, graphrag, failure-modes, knowledge-graph]
---

# GraphRAG Quality Problems

> Existing GraphRAG systems share a root cause: **isolated local extraction** without a global memory mechanism. Processing document chunks independently — without maintaining a persistent global state — inevitably produces three critical deficiencies that degrade retrieval and generation: thematic irrelevance (noise), logical inconsistency (contradictions), and structural fragmentation (disconnected graphs).

## Thesis

The fundamental flaw in current GraphRAG pipelines is architectural: they derive knowledge from isolated local segments, lacking a global perspective on the previously processed context. This isolation leads to three systematic failure modes that compound in the merged graph.

## The Three Deficiencies

### 1. Thematic Irrelevance (Noise)
- **Cause**: No global corpus theme view → extraction LLM picks up off-topic triples from each chunk
- **Evidence**: Filtering 40% of low-frequency triples *improves* accuracy (65.28% vs 64.85%)
- **MemGraphRAG fix**: Unified Schema Filtering via Ontology Layer frequency threshold
- **Page**: [[graphrag-thematic-irrelevance]]

### 2. Logical Inconsistency (Contradictions)
- **Cause**: Independent extraction → semantically contradictory facts merged naively
- **Types**: Mutually exclusive, temporal, granularity conflicts
- **MemGraphRAG fix**: Decoupled Conflict Detection + Evidence-Driven Resolution Agents
- **Page**: [[graphrag-logical-inconsistency]]

### 3. Structural Fragmentation (Disconnected Islands)
- **Cause**: Missing global coreference resolution + schema alignment → entity duplication across disconnected subgraphs
- **Effect**: Multi-hop traversal blocked; "locked in graph islands"
- **MemGraphRAG fix**: Memory-Guided Bridging (type-based + similarity-based edges)
- **Page**: [[graphrag-structural-fragmentation]]

## Recall-Relevance Trade-off

GraphRAG methods expand recall (GFM-RAG: 84.3% vs RAG: 71.8%) but crash relevance (38.5% vs 62.9%). The three deficiencies explain why:
- **Noise** from thematic irrelevance drowns signal
- **Contradictions** from logical inconsistency confuse reasoning
- **Islands** from fragmentation prevent evidence aggregation

> "Existing GraphRAG systems exhibit a fundamental trade-off between recall and relevance. Although graph expansion improves coverage, it often retrieves irrelevant evidence that overwhelms the LLM and degrades generation accuracy." — MemGraphRAG paper

MemGraphRAG breaks this trade-off by attacking the root cause (isolation) rather than symptoms.

## Why Prior Approaches Fail

| Approach | Limitation |
|----------|------------|
| **Predefined schema filtering** [9, 45] | Limited generalization; high manual cost |
| **Community summarization** [12, 20, 50] | Unsupervised; errors propagate/amplify at higher levels |
| **Topic modeling** [44] | No conflict resolution; no coreference |
| **Post-hoc triple filtering** | Reactive; no global memory during construction |
| **HippoRAG / PPR retrieval** | Addresses retrieval, not construction quality |

## MemGraphRAG's Architectural Shift

The paper proposes a **memory-based multi-agent framework** as the correct architectural response:

1. **Global Memory** (Three-Layer) — Provides the missing global perspective during construction
2. **Multi-Agent Group** — Separates extraction, diagnosis, correction (single-responsibility agents)
3. **Co-evolution** — Memory and Graph evolve together; memory guides graph, graph is projected from memory

This is an instance of the broader principle: **engineered decomposition + message-layer governance** makes multi-agent systems reliable ([[the-multi-agent-theory]]).

## Tensions

> [!note] Departure:
> MemGraphRAG invests heavily in offline indexing (multi-agent construction + graph building) for ultra-fast online retrieval (0.061s). This is a deliberate operational trade-off: "do not forget operational if you have it... you have to invest quite a lot of here for your particular training, for your particular domain knowledge indexing."

> [!warning] Contradiction:
> The paper claims GraphRAG underperforms naive RAG in real-world QA, yet most GraphRAG papers report SOTA gains. The discrepancy stems from benchmark choice: MemGraphRAG uses G-Medical/G-Novel (complex reasoning) vs simpler HotpotQA. The "GraphRAG underperforms RAG" finding needs replication on standard benchmarks.

## Sources

- `raw/2606.00610v1.md` — §3 (Preliminary Study), §3.1–3.3 (three deficiencies + discussion), §4 (Framework), §5 (Experiments)
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video: comprehensive walkthrough of all three deficiencies with visual examples, recall-relevance trade-off chart, three-agent system, memory layers, bridging, PPR retrieval, benchmark results

## Related Pages

- [[memgraphrag]] — The proposed solution
- [[three-layer-global-memory]] — Global memory architecture
- [[memory-based-multi-agent-system]] — Agent society
- [[graphrag-thematic-irrelevance]] — Deficiency 1
- [[graphrag-logical-inconsistency]] — Deficiency 2
- [[graphrag-structural-fragmentation]] — Deficiency 3
- [[the-multi-agent-theory]] — Broader multi-agent theory thread
- [[graphrag-baselines]] — Related GraphRAG baselines (HippoRAG, LightRAG, Microsoft GraphRAG)
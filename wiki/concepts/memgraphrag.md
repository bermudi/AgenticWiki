---
title: MemGraphRAG
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [graphrag, rag, multi-agent, memory, knowledge-graph]
---

# MemGraphRAG

> MemGraphRAG is a memory-based multi-agent framework for Graph Retrieval-Augmented Generation that introduces a Three-Layer Global Memory (Ontology, Fact, Passage layers) and a collaborative society of agents (Extraction, Conflict Detection, Conflict Resolution) to ensure high-quality graph construction. It addresses three critical deficiencies in existing GraphRAG systems: thematic irrelevance, logical inconsistency, and structural fragmentation. A memory-aware hierarchical retrieval algorithm using Personalized PageRank over a heterogeneous graph enables fast, relevant query-time reasoning.

## Core Architecture

MemGraphRAG consists of two collaborative modules:

### 1. Memory-Based Graph Construction (Offline)
- **Three-Layer Global Memory** — Ontology Layer (schemas with extraction frequencies), Fact Layer (concrete entity-relation triples), Passage Layer (original text segments for evidence grounding)
- **Multi-Agent Group** — Extraction Agent, Conflict Detection Agent, Conflict Resolution Agent operating on shared memory
- **Hierarchical Indexing Graph** — Three interconnected views: Semantic Ontology Graph, Fact Graph, Source Evidence Graph
- **Memory-Guided Bridging** — Type-based and similarity-based edges connect fragmented subgraphs ([[memory-guided-bridging]])

### 2. Memory-Guided Online Retrieval (Online)
- **Multi-Layer Memory Filtering** — Parallel retrieval from all three memory layers
- **Structure-Aware Node Initialization** — Entity nodes via fact relevance, type nodes via schema relevance with hub suppression, passage nodes via information density
- **Personalized PageRank** — Propagates query-specific importance over the heterogeneous graph (damping factor α=0.5) ([[personalized-pagerank-rag]])

## Three Critical Deficiencies Addressed

Existing GraphRAG systems rely on **isolated local extraction** — processing document chunks independently without global context. MemGraphRAG identifies three resulting pathologies:

| Deficiency | Root Cause | MemGraphRAG Solution |
|------------|------------|---------------------|
| **Thematic Irrelevance** | No global corpus theme view → off-topic triples | Unified Schema Filtering: frequency-thresholded stable schemas filter noise ([[graphrag-thematic-irrelevance]]) |
| **Logical Inconsistency** | Independent extraction → contradictory facts | Global Adjudication: Conflict Detection + Resolution agents use evidence grounding to resolve conflicts ([[graphrag-logical-inconsistency]]) |
| **Structural Fragmentation** | Missing coreference/schema alignment → disconnected subgraphs | Memory-Guided Bridging: type-based + similarity-based edges unify graph ([[graphrag-structural-fragmentation]]) |

## Key Innovations

### Three-Layer Global Memory ([[three-layer-global-memory]])
```
Ontology Layer (M_onto):  Schemas (type, relation, type) + extraction frequencies
    ↓ schema-instance alignment (bidirectional)
Fact Layer (M_fact):      Concrete triples (head, relation, tail) + activation status
    ↓ fact-evidence grounding (bidirectional)
Passage Layer (M_pass):   Original text segments — source evidence for every fact
```
- New schemas start as candidates → promoted to stable when `Freq(schema) ≥ threshold`
- Only facts aligned with stable schemas activate for graph construction

### Multi-Agent Group ([[memory-based-multi-agent-system]])
- **Extraction Agent**: Jointly constructs entries for all three memory layers per chunk
- **Conflict Detection Agent**: Asynchronously scans for conflicts (semantic similarity + ontology constraints)
- **Conflict Resolution Agent**: Uses schema constraints + provenance passages to adjudicate (filter/merge/resolve)

### Hierarchical Indexing Graph
Three interconnected views derived from Global Memory:
1. **Semantic Ontology Graph (G_onto)**: Schema-level types and valid relations — logical backbone
2. **Fact Graph (G_fact)**: Entity nodes + instantiated triples — multi-hop reasoning
3. **Source Evidence Graph (G_pass)**: Facts/entities linked back to passages — traceable evidence

### Memory-Aware Retrieval
1. **Multi-Layer Filtering**: Retrieve schemas, facts, passages in parallel from M_onto, M_fact, M_pass
2. **Node Initialization**: 
   - Entities: mean similarity of query-relevant facts
   - Types: schema relevance × log-degree penalty (hub suppression)
   - Passages: query similarity × information density (IDF-weighted)
3. **Personalized PageRank**: PPR over heterogeneous graph from initialized nodes; top-k passages + entities for LLM

## Experimental Results

**Datasets**: HotpotQA, 2WikiMultiHopQA, MuSiQue, G-Medical, G-Novel
**Baselines**: Zero-shot LLMs, Vanilla RAG (Top-1/3/5), 13 GraphRAG methods (MS-GraphRAG, LightRAG, HippoRAG, HippoRAG2, GFM-RAG, LinearRAG, LogicRAG, E2GraphRAG, etc.)

| Metric | MemGraphRAG | Best Baseline | Δ |
|--------|-------------|---------------|---|
| Overall Avg Accuracy | **59.25%** | LinearRAG 57.15% | +2.10% |
| G-Medical LLM-Acc | **57.41%** | LinearRAG 52.57% | +4.84% |
| Retrieval Time (G-Medical) | **0.061s** | LinearRAG 0.123s | 2× faster |

> [!note] Synthesis:
> MemGraphRAG achieves better accuracy *and* faster retrieval because heavy indexing investment (offline graph construction + memory) pays off at query time. The paper reports this trade-off explicitly: "this is only because we invested quite a lot of time in the preparation, in the indexing of the graph."

## Efficiency

- Offline indexing is expensive (complex graph construction, multi-agent coordination)
- Online retrieval is ultra-fast (PPR on pre-built heterogeneous graph)
- Comparable or better efficiency than baselines at query time

## Implementation

- **Code**: https://github.com/XMUDeepLIT/MemGraphRAG
- **Models**: Experiments use GPT-4o-mini (demonstrates method works without frontier models)
- **Conference**: KDD 2026 (32nd ACM SIGKDD)

## Related Work

- **GraphRAG baselines**: MS-GraphRAG [12], LightRAG [17], HippoRAG [19], HippoRAG2 [20], GFM-RAG [37], LinearRAG [70], LogicRAG [6], E2GraphRAG [64]
- **Memory for agents**: HippoRAG (associative memory + PPR), MemRefine ([[memrefine]] — post-construction compression), A-MEM (graph memory)
- **Multi-agent GraphRAG**: This is the first to introduce a *memory-based multi-agent system* specifically for graph construction quality

## Thread

- [[the-multi-agent-theory]] — MemGraphRAG is an instance of engineered multi-agent decomposition (extraction/diagnosis/correction separation) applied to GraphRAG, supporting the thesis that "engineered decomposition + message-layer governance" makes MAS reliable

## Related

- [[three-layer-global-memory]] — Core memory architecture
- [[memory-based-multi-agent-system]] — Agent architecture
- [[memory-guided-bridging]] — Structural unification mechanism
- [[personalized-pagerank-rag]] — Retrieval algorithm
- [[graphrag-thematic-irrelevance]] — Problem: thematic irrelevance
- [[graphrag-logical-inconsistency]] — Problem: logical inconsistency
- [[graphrag-structural-fragmentation]] — Problem: structural fragmentation
- [[memgraphrag-project]] — GitHub project
- [[qinggang-zhang]] — Corresponding author
- [[jinsong-su]] — Corresponding author
- [[chuanjie-wu]] — First author (co-equal)
- [[zhishang-xiang]] — First author (co-equal)

## Sources

- `raw/2606.00610v1.md` — Full paper: architecture, algorithms, experiments, ablations, pseudocode, prompts (Appendix)
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video walkthrough: visual explanations of three-layer memory, three agents, bridging mechanisms, PPR retrieval, benchmark results, GitHub repo tour
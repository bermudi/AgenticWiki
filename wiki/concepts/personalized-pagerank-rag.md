---
title: Personalized PageRank for RAG
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [pagerank, rag, retrieval, graphrag, ranking]
---

# Personalized PageRank for RAG

> Personalized PageRank (PPR) is the core retrieval algorithm in MemGraphRAG's online phase. After multi-layer memory filtering and structure-aware node initialization, PPR propagates query-specific importance over the heterogeneous Hierarchical Indexing Graph to rank globally relevant passages and entities for LLM generation. The damping factor α=0.5 limits propagation to a local neighborhood, reducing semantic drift.

## Algorithm

### Input
- Heterogeneous graph G = (V, E) with three node types: entities (V_entity), types (V_type), passages (V_passage)
- Initial reset probability distribution v(0) over nodes (from structure-aware initialization)

### Iteration
```
v(t+1) = (1 - α) W v(t) + α v(0)
```
- **W**: Column-normalized transition matrix of G (heterogeneous edges)
- **α = 0.5**: Damping factor (limits propagation depth)
- **v(0)**: Initial importance distribution (seeded from retrieved evidence)

### Output
- Converged stationary distribution v(∞)
- Top-k passages and top-k entities by v(∞) score
- These form the structured context for LLM answer generation

## Structure-Aware Node Initialization (v(0))

Before PPR, each node gets an initial "reset probability" based on retrieved evidence:

### Entity Nodes
```
v(e) = (1 / |F|) * Σ_{f ∈ F} Sim(q, f)
```
- Mean similarity of query-relevant facts containing entity e
- F = subset of retrieved facts from Fact Layer containing e

### Type Nodes (Schema Nodes)
```
v(t) = (1 / |S|) * Σ_{s ∈ S} Sim(q, s) * (1 / log(deg(t) + 1))
```
- Schema relevance × log-degree penalty
- **Hub suppression**: Generic types (e.g., "Person" connected to thousands of entities) get penalized to prevent importance diffusion

### Passage Nodes
```
v(p) = Sim(q, p) * (IDF-density(p))^γ * log(|E_p| + 1)
```
- Query similarity × information density (IDF-weighted rare entities) × log passage degree
- γ = 0.05 dampens passage dominance

## Why PPR for GraphRAG?

| Property | Standard RAG / Vector Search | PPR on Heterogeneous Graph |
|----------|------------------------------|----------------------------|
| **Structural reasoning** | None (independent chunks) | Multi-hop via graph edges |
| **Global importance** | Local similarity only | Propagates through graph topology |
| **Evidence grounding** | Implicit | Explicit via Passage Layer links |
| **Schema awareness** | None | Type nodes encode ontology constraints |
| **Hub suppression** | Not applicable | Log-degree penalty on type nodes |

## Connection to HippoRAG

HippoRAG [19] also uses PPR over a knowledge graph for retrieval. Key differences:

| Aspect | HippoRAG | MemGraphRAG |
|--------|----------|-------------|
| **Graph construction** | Single-pass extraction | Multi-agent + Three-Layer Memory |
| **Conflict resolution** | None | Conflict Detection + Resolution Agents |
| **Memory layers** | None | Ontology / Fact / Passage |
| **Node initialization** | Query similarity only | Structure-aware (hub suppression, info density) |
| **Structural unification** | None | Memory-guided bridging (type + similarity) |

## Efficiency

- PPR on pre-built heterogeneous graph is fast: **0.061s retrieval time** on G-Medical (fastest among all baselines)
- Offline indexing investment pays off at query time
- α=0.5 ensures rapid convergence (local propagation)

## Related

- [[memgraphrag]] — Parent framework
- [[three-layer-global-memory]] — Provides the graph structure PPR operates on
- [[three-layer-global-memory]] — Memory-guided bridging improves PPR connectivity
- [[graphrag-baselines]] — HippoRAG: related associative-memory GraphRAG using PPR
- [[graphrag-structural-fragmentation]] — Bridging + PPR together solve this

## Sources

- `raw/2606.00610v1.md` — Section 4.3.3 "Personalized PageRank": equations, α=0.5, convergence, top-k selection; Section 4.3.2 "Structure-Aware Node Initialization": entity/type/passage initialization formulas
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video: "Good old Google PageRank... runs personalized PageRank over the heterogeneous graph"; retrieval time comparison table
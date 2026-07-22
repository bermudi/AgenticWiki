---
title: Three-Layer Global Memory
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [graphrag, memory, knowledge-graph, multi-agent]
---

# Three-Layer Global Memory

> The Three-Layer Global Memory is the core knowledge substrate of MemGraphRAG. It organizes extracted knowledge into a hierarchy: Ontology Layer (schemas with frequencies), Fact Layer (concrete triples), and Passage Layer (source text for evidence grounding). Bidirectional cross-layer links enforce schema-instance alignment and fact-evidence traceability. This shared memory provides the global perspective that enables agents to maintain thematic consistency, resolve conflicts, and unify fragmented extractions across the entire corpus.

## Layer Definitions

### 1. Ontology Layer (M_onto)
- **Content**: Schemas = (head_type, relation, tail_type), e.g., (person, born_in, country)
- **Metadata**: Extraction frequency counter per schema
- **State**: Schemas start as *candidates* → promoted to *stable* when `Freq(schema) ≥ threshold`
- **Function**: Provides the "logical backbone" — defines valid type relations and thematic boundaries for the whole corpus

### 2. Fact Layer (M_fact)
- **Content**: Concrete facts = (head_entity, relation, tail_entity), e.g., (Einstein, born_in, Germany)
- **Metadata**: Activation status (active/inactive), provenance link to Passage Layer
- **Constraint**: Every active fact must align with a stable schema in M_onto (schema-instance alignment)
- **Function**: Stores instantiated knowledge for multi-hop reasoning

### 3. Passage Layer (M_pass)
- **Content**: Original text segments (document chunks) that serve as source evidence
- **Metadata**: Document ID, chunk position, link to originating fact(s)
- **Function**: Grounds every fact in verifiable text; enables evidence-driven conflict resolution and debugging

## Cross-Layer Interactions (Bidirectional)

```
Ontology Layer (M_onto)  ←schema-instance alignment→  Fact Layer (M_fact)
       ↑                                                    ↓
       ←←←←←←←← fact-evidence grounding ←←←←←←←←←←←←←←←←←←←←←←←
                      Passage Layer (M_pass)
```

### Schema-Instance Alignment (M_onto ↔ M_fact)
- **Forward**: When Extraction Agent proposes a fact, it must also propose/align with a schema
- **Backward**: Stable schemas govern which facts can be active — `M_fact_active = {f ∈ M_fact | schema(f) ∈ M_onto_stable}`
- **Frequency gating**: New schemas enter as candidates; only promoted when empirically frequent across corpus

### Fact-Evidence Grounding (M_fact ↔ M_pass)
- **Forward**: Every fact extraction records its source passage: `source(f) = passage_id`
- **Backward**: Conflict Resolution Agent retrieves provenance passages to adjudicate contradictions
- **Traceability**: Enables "instantly point to exact source text" for any fact — critical for debugging and trust

## Operational Role in MemGraphRAG

### During Graph Construction (Offline)
1. **Extraction Agent** writes to all three layers simultaneously per chunk
2. **Schema filtering** (M_onto) denoises: low-frequency schemas → candidates only; facts under unstable schemas stay inactive
3. **Conflict Detection** (M_fact) scans for redundancy/contradiction using semantic similarity + ontology constraints
4. **Conflict Resolution** (M_fact + M_pass) uses provenance to decide correct fact
5. **Bridging** (M_onto) identifies shared stable schema types to connect fragmented entities

### During Retrieval (Online)
1. **Multi-Layer Memory Filtering**: Query retrieves from all three layers in parallel:
   - Schemas from M_onto (stable only)
   - Facts from M_fact (active only)
   - Passages from M_pass
2. **Structure-Aware Initialization**: 
   - Entity nodes weighted by retrieved fact relevance
   - Type nodes weighted by retrieved schema relevance (with hub suppression)
   - Passage nodes weighted by query similarity × information density

## Key Properties

| Property | Mechanism | Benefit |
|----------|-----------|---------|
| **Global thematic consistency** | Shared M_onto across all documents | Prevents off-topic extractions |
| **Logical unity** | M_fact conflicts resolved via M_pass evidence | Eliminates contradictory facts |
| **Structural connectivity** | M_onto schema types bridge disconnected subgraphs | Enables multi-hop traversal |
| **Evidence traceability** | Every fact → passage via M_pass | Debugging, trust, citation |
| **Incremental evolution** | Agents continuously read/write memory | Graph co-evolves with memory |

## Structural Unification via Memory-Guided Bridging

Memory-guided bridging is MemGraphRAG's mechanism for overcoming structural fragmentation in the constructed knowledge graph. It uses the Three-Layer Global Memory to identify and merge equivalent entities across disconnected subgraphs.

### Problem: Structural Fragmentation

Independent chunk-level extraction causes entity duplication (same real-world entity as different nodes, e.g., "Newton" vs "Isaac Newton"), disconnected subgraphs that block multi-hop traversal, and missing global coreference resolution.

### Two Bridging Mechanisms

1. **Type-based bridging** — Link distinct entities if they share a high-level category classification in the Ontology Layer (M_onto). Entities with the same stable schema type get connected, creating "semantic highways" for cross-document traversal.
2. **Similarity-based bridging** — Link entities with high embedding similarity, even when type information is sparse. Cosine similarity on entity embeddings; edges added between entities exceeding a similarity threshold. Captures "weak connections" that type-based bridging misses.

Bridging edges are added to the Fact Graph (G_fact) during the projection from Global Memory. Every bridging edge can be traced to its memory-layer justification (shared type or embedding similarity).

> This section was merged from the standalone `memory-guided-bridging` page (2026-07-22). The original page described this mechanism as a separate concept; it is more properly a mechanism of the Three-Layer Global Memory itself.

## Comparison to Other Memory Architectures

| System | Memory Structure | Cross-Layer Links | Conflict Resolution |
|--------|-----------------|-------------------|---------------------|
| **MemGraphRAG** | 3-layer (ontology/fact/passage) | Bidirectional: schema-instance, fact-evidence | Agent-based (detection + resolution) |
| HippoRAG | Associative memory (entities + PPR) | Implicit via PPR | None (relies on PPR) |
| MemRefine | Post-hoc compression | N/A | LLM judge on candidate pairs |
| A-MEM | Graph memory (entities + relations) | Single layer | None |
| Standard GraphRAG | None (direct chunk→graph) | None | None (merge only) |

## Thread

- [[the-multi-agent-theory]] — The three-layer memory is the "message-layer governance" that makes the multi-agent system reliable: it provides the shared substrate for coordination

## Related

- [[memgraphrag]] — Parent framework
- [[memory-based-multi-agent-system]] — Agents that operate on this memory
- [[graphrag-thematic-irrelevance]] — M_onto frequency filtering addresses this
- [[graphrag-logical-inconsistency]] — M_fact + M_pass evidence grounding resolves this
- [[graphrag-structural-fragmentation]] — M_onto schema types bridge this
- [[personalized-pagerank-rag]] — Retrieval queries all three layers

## Sources

- `raw/2606.00610v1.md` — §4.1 (architecture), §4.2 (construction), §4.3 (retrieval), Appendix D.2 (memory details), Eq. 3-4
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video: visual walkthrough of three layers, frequency filter, fact-evidence grounding, passage layer for debugging
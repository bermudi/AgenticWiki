---
title: Memory-Based Multi-Agent System
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [multi-agent, graphrag, memory, knowledge-graph]
---

# Memory-Based Multi-Agent System

> MemGraphRAG employs a collaborative society of three specialized agents supported by the Three-Layer Global Memory. This design separates extraction, diagnosis, and correction — a departure from monolithic LLM extraction pipelines.

## Agent Architecture

### Extraction Agent
- **Input**: Document chunks from corpus
- **Output**: Structured memory entries across all three layers simultaneously
- **Operation**: For each chunk, jointly generates candidate schemas, instantiated facts, and supporting passages
- **Key design**: Rather than producing triples alone, it constructs the full memory entry ensuring schema alignment and evidence grounding from the start

### Conflict Detection Agent
- **Monitors**: Fact Layer (M_fact) continuously during evolutionary extraction
- **Detects**: 
  - Redundancy (near-duplicate facts)
  - Structural anomalies (violations of ontology constraints)
  - Logical inconsistencies (semantic contradictions)
- **Conflict identification**: For a newly activated triple f, finds conflict set F_conflict = {f' ∈ M_fact | Sim(f, f') > θ ∨ Match(σ_f, σ_f')} using semantic similarity and ontology-level structural constraints
- **Asynchronous**: Scans independently, doesn't block extraction

### Conflict Resolution Agent
- **Triggered**: When Conflict Detection Agent finds non-empty conflict set
- **Evidence-driven**: Retrieves provenance passages from Passage Layer (M_passage) for each conflicting fact
- **Adjudicates**: Compares textual evidence to decide corrective actions:
  - Filter invalid facts
  - Merge redundant triples
  - Resolve temporal conflicts (e.g., Newton born 1643 vs 1645)
  - Resolve granularity conflicts (inconsistent abstraction levels)
- **Uses**: Schema constraints from Ontology Layer + historical evidence from Passage Layer

## Design Rationale: Separation of Concerns

| Concern | Traditional GraphRAG | MemGraphRAG |
|---------|---------------------|-------------|
| Extraction | Monolithic LLM call per chunk | Extraction Agent (writes to memory) |
| Quality control | Post-hoc filtering / community summarization | Conflict Detection Agent (diagnoses) |
| Correction | Implicit in merging / implicit in summarization | Conflict Resolution Agent (corrects with evidence) |
| Global view | None (chunk-isolated) | Shared Three-Layer Global Memory |

**Why separate agents?** "Keep agents simple. Don't give them two jobs, only one job because LLM is not that capable." (Video walkthrough) — Each agent has a single responsibility, reducing cognitive load and error propagation.

## Co-Evolution with Knowledge Graph

The Multi-Agent Group and Global Memory co-evolve with the Knowledge Graph G:
- Memory provides the global context agents need for coherent decisions
- Agents continuously refine memory (filtering schemas, resolving conflicts, adding bridging edges)
- The constructed graph G is projected from the stabilized memory

## Related

- [[memgraphrag]] — Overall framework
- [[three-layer-global-memory]] — The shared memory substrate
- [[three-layer-global-memory]] — Memory-guided bridging for structural unification
- [[graphrag-logical-inconsistency]] — Multi-agent system directly addresses this deficiency
- [[multi-agent-illusion]] — Contrast: MemGraphRAG is an *engineered* multi-agent system (like expert-mas), not an automated MAS

## Thread

- [[graphrag-quality-problems]] — Engineered multi-agent decomposition (extraction/diagnosis/correction) solves GraphRAG construction quality

## Sources

- `raw/2606.00610v1.md` — Section 4.1: agent definitions, roles, collaboration loop; Section 4.2: construction pipeline
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video: three agents explained with examples (extraction, conflict detection, conflict resolution), why GPT-4o-mini suffices, agent simplicity principle
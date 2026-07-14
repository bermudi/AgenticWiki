---
title: GraphRAG Logical Inconsistency
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [graphrag, failure-mode, conflict, contradiction, knowledge-graph]
---

# GraphRAG Logical Inconsistency

> **Logical inconsistency** is a core failure mode in GraphRAG systems where independent chunk-level extraction produces semantically contradictory facts within the merged knowledge graph. Without cross-chunk consistency checks, the system naively unions all extracted triples, creating mutually exclusive, temporally ungrounded, or granularity-mismatched facts that corrupt downstream reasoning.

## Root Cause

Isolated local extraction: each chunk is processed independently with no memory of what other chunks extracted. Contradictions across documents/chunks are never detected or resolved.

## Three Conflict Types (MemGraphRAG Taxonomy)

| Type | Definition | Example |
|------|------------|---------|
| **Mutually Exclusive Conflict** | Logically incompatible values for same relation | Einstein `born_in` Germany (1879) vs Einstein `born_in` USA (1879) |
| **Temporal Conflict** | Time-varying states without temporal grounding | Newton `birth_year` 1643 vs 1645; Biden `president_of` USA (2021–present) vs Trump `president_of` USA (2017–2021) |
| **Granularity Conflict** | Inconsistent abstraction levels for same entity/concept | "Person" vs "Scientist" vs "Physicist" for Einstein; "Rule" vs "Reign" for monarch |

These create **inconsistent reasoning paths** — multi-hop traversal follows contradictory edges, producing nonsense answers.

## Consequences

- **Graph pollution**: Contradictory facts coexist in the merged graph
- **Retrieval confusion**: Retriever encounters multiple conflicting paths for same query
- **Generation degradation**: LLM receives contradictory context, produces hallucinated or uncertain answers
- **Error amplification**: In community-summarization GraphRAG (Microsoft GraphRAG), inaccuracies amplify at higher summary levels

## MemGraphRAG Solution: Decoupled Diagnosis + Evidence-Driven Correction

### Conflict Detection Agent
- Monitors Fact Layer asynchronously during evolutionary extraction
- For new triple `f`, finds conflict set: `F_conflict = {f' ∈ M_fact | Sim(f, f') > θ ∨ Match(σ_f, σ_f')}`
- Uses semantic similarity + ontology-level structural constraints

### Conflict Resolution Agent
- Triggered when `F_conflict ≠ ∅`
- **Evidence-driven**: Retrieves provenance passages from Passage Layer for each conflicting fact
- Adjudicates by comparing textual evidence — not heuristic merging
- Actions: filter invalid facts, merge redundant triples, resolve temporal/granularity conflicts

### Cross-Layer Support
- **Ontology Layer**: Schema constraints define valid conflicts (e.g., `Person —born_in→ Country` is functional → at most one value)
- **Passage Layer**: Grounding passages enable evidence-based adjudication

## Why Separate Agents?

> "Keep the agents simple. Don't give them two jobs, only one job because LLM is not that capable."

- Extraction Agent: only extracts → writes to memory
- Conflict Detection Agent: only finds conflicts → flags them
- Conflict Resolution Agent: only resolves → uses evidence + schema

Prevents "extraction LLM judges its own output" failure.

## Related

- [[memgraphrag]] — Framework
- [[three-layer-global-memory]] — Fact Layer + Passage Layer enable resolution
- [[memory-based-multi-agent-system]] — Three-agent society
- [[graphrag-thematic-irrelevance]] — Sister deficiency
- [[graphrag-structural-fragmentation]] — Sister deficiency

## Thread

- [[graphrag-quality-problems]] — One of the three core GraphRAG deficiencies from isolated local extraction

## Sources

- `raw/2606.00610v1.md` — §3.2 "Logical Inconsistency", Figure 3 (conflict types), §4.2.2 "Consistency Maintenance via Global Adjudication", Table 8 (Appendix C)
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video: "lies" / logical inconsistency, Newton 1643/1645 example, three agents walkthrough
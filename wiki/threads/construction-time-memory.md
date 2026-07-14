---
title: Construction-Time Memory for Quality Assurance
type: thread
created: 2026-07-13
updated: 2026-07-13
tags: [thread, memory, construction, multi-agent, graphrag, quality]
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
---

# Construction-Time Memory for Quality Assurance

> [!note] Synthesis: The wiki's memory map has mostly treated memory as a *retrieval* or *long-horizon execution* substrate — something queried at runtime ([[agent-memory-systems]], [[episodic-memory-for-agents]], [[memrefine]], [[evomem]]). MemGraphRAG surfaces a distinct pattern: **memory as a quality-control substrate *during offline construction***, before any query is served. This thread tracks that pattern and whether it generalizes beyond GraphRAG.

## The Pattern

MemGraphRAG builds a **Three-Layer Global Memory** (Ontology / Fact / Passage) that exists *during offline graph construction*, not at query time. The three-agent society (Extraction, Conflict Detection, Conflict Resolution) reads and writes this memory to enforce quality *before* the graph is frozen for retrieval:

- **Thematic relevance** — low-frequency triples are filtered against the Ontology Layer, removing noise that would otherwise dilute retrieval.
- **Logical consistency** — the Conflict Detection + Resolution agents reconcile contradictions (entity/relation/value conflicts) against existing facts.
- **Structural cohesion** — memory-guided bridging links fragmented entities (e.g., "Newton" ↔ "Isaac Newton") across documents via the global memory.

The payoff is stated explicitly: heavy offline investment buys ultra-fast, high-quality online retrieval (0.061s, 59.25% LLM-Acc). The trade-off is a deliberate **index-heavy / query-light operational regime** — "you have to invest quite a lot... for your particular domain knowledge indexing."

## Why This Is a Distinct Pattern

Standard memory systems optimize the *query* path: how to store and fetch so retrieval is relevant and cheap. Construction-time memory optimizes the *build* path: how to make the artifact itself faithful, consistent, and cohesive. The memory is not a cache hit at runtime — it is the **governance layer that the construction agents coordinate through**. This is the same lesson as [[the-multi-agent-theory]]'s "engineered escape" layer, applied to knowledge-graph construction rather than task execution.

## Generality Question

Is this GraphRAG-specific, or a general design pattern? Two signals suggest generality:

1. The three quality failures (thematic irrelevance, logical inconsistency, structural fragmentation) are *general knowledge-artifact* failures, not GraphRAG-specific. Any offline indexing pipeline that extracts structured knowledge is vulnerable to them.
2. The broader MAS literature (Expert-MAS, MAKER — see [[the-multi-agent-theory]]) uses *shared structured state* as the coordination medium. The Three-Layer Global Memory is a domain-specific instance of that same "memory-as-coordination" idea.

Open question: does construction-time memory generalize to *non-graph* artifacts (e.g., a curated document set, a fine-tuning corpus, a tool registry)? MemGraphRAG's answer is graph-shaped; the principle may not be.

## Related

- [[memgraphrag]] — The concrete instantiation (Three-Layer Global Memory + three-agent society)
- [[three-layer-global-memory]] — The construction-time memory architecture
- [[memory-based-multi-agent-system]] — Agents coordinate *through* the memory, not by message passing alone
- [[graphrag-quality-problems]] — The three deficiencies this pattern fixes
- [[the-multi-agent-theory]] — "Memory-as-coordination" is the engineered-escape pattern at the theory level
- [[agent-memory-systems]] — The M = ⟨R,S,Q,U⟩ view treats memory as post-construction; this thread argues R can carry construction-time invariants

## Sources

- `raw/2606.00610v1.md` — §4 (Three-Layer Global Memory, Multi-Agent Group), §5 (offline/online trade-off discussion)
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Walkthrough of the three-agent construction loop and the "invest heavily offline for fast online" trade-off

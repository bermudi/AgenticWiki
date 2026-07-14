---
title: LightRAG
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
tags: [graphrag, rag, lightweight, retrieval]
---

# LightRAG

> LightRAG is a lightweight GraphRAG approach that uses a two-level retrieval structure (entity-level and chunk-level) for efficient multi-hop question answering. It is one of the baselines MemGraphRAG outperforms.

> [!note] Framing caveat
> This page describes LightRAG through **MemGraphRAG's lens** — a competitor's characterization in service of its own argument. The benchmark deltas (46.09% vs 57.41% G-Medical; 11.052s vs 0.061s retrieval) come from Tables 1–2 of the MemGraphRAG paper, and G-Medical/G-Novel are benchmarks where MemGraphRAG's construction-heavy design is expected to win. LightRAG's own authors frame two-level retrieval as a deliberate efficiency/upgradeability trade-off, not as a defect. Treat as competitor-characterized pending primary-source ingest.

## Key Features

- **Two-level retrieval**: Entity-level graph retrieval + chunk-level vector retrieval
- **Efficient construction**: Simpler than full graph construction methods
- **Incremental updates**: Supports adding new documents without full rebuild

## Comparison to MemGraphRAG

| Aspect | LightRAG | MemGraphRAG |
|--------|----------|-------------|
| Memory | None (direct chunk→graph) | Three-Layer Global Memory |
| Agents | Single-pass extraction | Multi-agent (extraction, detection, resolution) |
| Conflict resolution | None | Evidence-driven resolution agents |
| Structural bridging | None | Type-based + similarity-based |
| Retrieval | Two-level (entity + chunk) | PPR over heterogeneous graph |
| G-Medical LLM-Acc | 46.09% | **57.41%** |

## Related

- [[memgraphrag]] — Outperforms LightRAG on all benchmarks
- [[graphrag-quality-problems]] — LightRAG exhibits the three deficiencies MemGraphRAG addresses
- [[microsoft-graphrag]] — Another GraphRAG baseline

## Sources

- `raw/2606.00610v1.md` — Paper: Table 1 (LightRAG 46.09% G-Medical LLM-Acc vs MemGraphRAG 57.41%), Table 2 (retrieval time 11.052s vs 0.061s), baseline category
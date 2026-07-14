---
title: MemGraphRAG Project
created: 2026-07-13
updated: 2026-07-13
sources:
  - raw/2606.00610v1.md
  - raw/yt-memorygraphrag-outperforms-every-rag.md
tags: [project, graphrag, rag, multi-agent, open-source]
---

# MemGraphRAG Project

> MemGraphRAG is an open-source implementation of the memory-based multi-agent GraphRAG framework from the KDD 2026 paper. The repository includes the three-layer memory architecture, multi-agent construction pipeline, memory-aware hierarchical retrieval with Personalized PageRank, and reproduction scripts for all benchmark experiments.

## Repository
- **GitHub**: https://github.com/XMUDeepLIT/MemGraphRAG
- **Organization**: XMUDeepLIT (Xiamen University Deep Learning and Intelligent Technology Lab)
- **License**: MIT (assumed; check repo)

## Key Components (from `memory.py` tour in video)
- **Three-Layer Memory Classes**: Ontology, Fact, Passage layers with inter-layer connections
- **Multi-Agent Classes**: ExtractionAgent, ConflictDetectionAgent, ConflictResolutionAgent
- **Graph Construction**: Schema filtering, conflict adjudication, memory-guided bridging
- **Retrieval**: Multi-layer filtering, structure-aware initialization, Personalized PageRank
- **Benchmarks**: HotpotQA, 2WikiMultiHopQA, MuSiQue, G-Medical, G-Novel

## Architecture Files (per video tour)
```
MemGraphRAG/
├── memory.py           # Three-layer memory with schema/fact/passage + inter-layer links
├── agents/
│   ├── extraction.py   # Joint schema+fact+passage extraction
│   ├── detection.py    # Conflict detection via similarity + ontology constraints
│   └── resolution.py   # Evidence-driven conflict resolution
├── graph/
│   ├── construction.py # Offline graph building with bridging
│   └── retrieval.py    # PPR-based online retrieval
├── prompts/            # All agent prompts (extraction, detection, resolution)
└── experiments/        # Benchmark reproduction scripts
```

## Reproducibility
- **Models**: GPT-4o-mini (all experiments) — demonstrates method works without frontier LLMs
- **Datasets**: Standard splits (1,000 questions each from HotpotQA, 2Wiki, MuSiQue validation; G-Medical, G-Novel)
- **Baselines**: 13 GraphRAG methods + Vanilla RAG + Zero-shot LLMs
- **Prompts**: All agent prompts provided in appendix / repo for exact reproduction

## Video Tour
Discover AI video includes a repo walkthrough showing the `memory.py` file structure and confirming all three layers + inter-layer connections are implemented.

## Related
- [[memgraphrag]] — Paper/concept
- [[qinggang-zhang]] — Corresponding author (Jilin U)
- [[jinsong-su]] — Corresponding author (Xiamen U)
- [[chuanjie-wu]] — Co-first author
- [[zhishang-xiang]] — Co-first author
- [[yunbo-tang]] — Co-first author
- [[zerui-chen]] — Co-author

## Sources
- `raw/2606.00610v1.md` — Paper: GitHub URL, architecture, algorithms, prompts (Appendix), experimental setup
- `raw/yt-memorygraphrag-outperforms-every-rag.md` — Video: GitHub repo tour, memory.py walkthrough, "everything available for you to test"
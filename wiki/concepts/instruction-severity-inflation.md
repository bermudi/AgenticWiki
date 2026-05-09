---
title: Instruction Severity Inflation
created: 2026-05-02
updated: 2026-05-08
sources:
  - raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md
tags: ["concept", "prompts", "context-engineering", "llm-limits"]
---

# Instruction Severity Inflation

> The phenomenon where every stakeholder who adds an instruction to an LLM's system prompt uses increasingly emphatic formatting (ALL CAPS, "IMPORTANT", "YOU MUST") to claim attention, resulting in all instructions competing at maximum volume and the model's attention degrading across all of them.

## The Problem

Frontier models can follow approximately 100-200 instructions reliably. Beyond that, attention spreads too thin and the model starts ignoring constraints, forgetting rules, and hallucinating behaviors. The natural response — each new instruction being more emphatic than the last — makes the situation worse, not better.

The dynamic:
1. A team maintains a system prompt with 50+ instructions
2. Each team member adds their instruction with "IMPORTANT" or ALL CAPS to ensure compliance
3. The model's attention is pulled toward the most emphatically formatted instructions
4. Other instructions get less attention and become less reliable
5. When someone notices a missed instruction, they add an even more emphatic version
6. The entire system de-tunes — every new emphatic instruction steals attention from everything else

## Relationship to Tool Design

[[dex-horthy|Dex Horthy]] draws a direct parallel to context rot for tools: giving an LLM too many tools degrades tool selection performance in the same way too many instructions degrade instruction following. The [[smart-zone-dumb-zone|Smart Zone]] constraint applies to instructions as well as context — more is not better.

## Possible Solutions

- **RAG for instructions**: Instead of dumping all instructions into system prompt, use retrieval to supply only relevant instructions per task. Anthropic's tool search feature is a step in this direction, but nobody has applied it to rules/instructions generally.
- **Workflow-level instruction management**: Split instructions across workflow stages so each stage only sees its relevant subset.
- **Agent self-reflection**: The agent could periodically review its instruction set and identify conflicts, overlaps, or severity inflation.
- **Deterministic enforcement**: Rules that can be enforced via pre-commit hooks or linters should be, removing them from the instruction pool entirely.

## Thread

- [[the-agent-workflow]] — Instruction density management is a core context engineering skill within the agent workflow
- [[the-slop-problem]] — Instruction severity inflation produces slop when too many competing instructions cause the model to miss constraints

## Related

- [[context-engineering]] — Managing instruction density is a core context engineering skill
- [[tool-design-for-agents]] — The parallel to tool bloat and tool selection degradation
- [[smart-zone-dumb-zone]] — The underlying constraint driving instruction limits
- [[instruction-hierarchy]] — The formal framework for what severity inflation undermines: when all instructions claim maximum privilege, the hierarchy collapses to a single flat tier

## Sources

- `raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md` — Dex Horthy describing the 100-200 instruction limit and instruction severity inflation

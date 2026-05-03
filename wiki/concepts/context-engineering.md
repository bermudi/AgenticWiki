---
title: Context Engineering
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md
tags: ["concept", "context-engineering", "llm", "agents", "prompt-engineering"]
---

# Context Engineering

> The practice of getting the most out of LLMs by putting the right information in, keeping it as small and dense as possible — maximizing information-per-token density rather than token count. Emerged independently in April 2025 from both Jeff Huber (Chroma CEO) and [[dex-horthy|Dex Horthy]] around the same time — Horthy included it as one factor in his "12 Factor Agents" article, which helped popularize the term.

## Definition

Context engineering sits between prompt engineering and agent harness design. It's not about crafting better prompts — it's about engineering the entire context environment the model receives: what information is included, how it's structured, what's excluded, and how dense the signal is.

The core heuristic: **information-per-token density**. Two prompts at the same token count can have dramatically different effectiveness depending on how densely they pack relevant signal. The hard part is knowing what to exclude — every extraneous token degrades attention on the relevant ones.

## Key Principles

### Smart Orchestrator + Smart Oracle Pattern
An emerging architecture from the AMP Code team: the main orchestrator model should be fast (Sonnet-class), not the smartest. It handles tool calling, file navigation, and routing. The really heavy reasoning — reading 50 files to find a race condition — gets delegated to a slower, smarter "oracle" model (Opus, o3) as a single batched prompt, not an agentic loop.

The insight: smart models are bad at tool calling and slow. If you can have the fast orchestrator figure out *which* files are relevant, then batch all that context into a single prompt for the oracle, you avoid the oracle burning time on tool calls.

### Context Engineering Is Durable
Unlike prompt engineering, which shifts as models improve, context engineering addresses a structural constraint: quadratic transformer attention. As long as attention degrades with context size, the skill of minimizing context while maximizing signal density will remain valuable. Dex Horthy makes this point directly — the map of what an agent harness needs (filesystem, tools, code execution) is unlikely to change for a decade. ([[armin-ronacher|Armin Ronacher]] makes a parallel argument about tool design durability elsewhere.)

### Model-Specific Context Design
Different models require differently engineered context:
- Opus can follow 6-step workflows reliably
- Sonnet will forget steps 4-6 mid-workflow
- Using the same prompts across models means maintaining multiple sets
- Instruction style (all caps, "IMPORTANT") works on Opus but de-tunes other models like Codex

## Practical Patterns

### Fast Orchestrator, Slow Thinker
A concrete architecture pattern:
1. Fast model (Sonnet) navigates filesystem, searches, determines what's relevant
2. Deterministic layer collects relevant files
3. Smart model (Opus) receives a single massive context and produces the analysis
4. Fast model handles the output

This avoids the "smart model calling tools slowly" problem.

### Instruction Density Management
Frontier models can follow ~100-200 instructions before attention spreads too thin. This creates [[instruction-severity-inflation]] — everyone putting their instructions in ALL CAPS to compete for attention, which degrades everything else. Context engineering means actively managing instruction count, not just adding more.

### NoSQL Over SQL for AI
Dex argues that flexible schemas (front matter, markdown) are more AI-friendly than rigid SQL schemas. The agent doesn't care about the schema — it reads the data and extracts what it needs. Schemas constrain programs, not AI. An agent can evolve its own schema by adding front matter fields as needed.

## Thread

- [[the-agent-workflow]] — Context engineering is the infrastructure layer beneath the agent workflow; managing information-per-token density is the operational skill the workflow depends on
- [[agent-quality-engineering]] — The eval infrastructure (logging proxies, snapshots) is a context engineering concern

## Related

- [[dex-horthy]] — Co-creator of the term and practice
- [[tool-design-for-agents]] — Context engineering overlaps with tool design; how tools present context to agents
- [[smart-zone-dumb-zone]] — Context engineering operationalizes staying in the Smart Zone
- [[the-agent-workflow]] — Context engineering is the infrastructure layer beneath the workflow
- [[instruction-severity-inflation]] — Instruction density management is a core context engineering skill

## Sources

- `raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md` — Full interview defining context engineering origins, principles, and practices

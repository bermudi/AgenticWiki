---
title: Thibaud Gloaguen
created: 2026-05-10
updated: 2026-05-10
sources:
  - raw/2602.11988v1.txt
unaudited_marginal: 0
tags: [author, ai-coding-agents, empirical-se, eth-zurich]
---

# Thibaud Gloaguen

> Researcher at ETH Zurich (Department of Computer Science) and LogicStar.ai. Lead author of the first rigorous evaluation of AGENTS.md files on coding agent performance, finding that LLM-generated context files degrade agent performance while increasing costs.

## Research

Gloaguen's primary contribution in the context of this wiki is the paper "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?" (2026), co-authored with Niels Mündler, Mark Müller, Veselin Raychev, and [[martin-vechev|Martin Vechev]]. The study introduces AGENTBENCH, a benchmark of 138 instances across 12 repositories with developer-written context files, and evaluates four agent/model pairings across two benchmarks: Claude Code with Sonnet-4.5, Codex with GPT-5.2, Codex with GPT-5.1 Mini, and Qwen Code with Qwen3-30B-Coder.

Key findings: LLM-generated context files reduce task success rates by 0.5–2%; developer-written files provide marginal ~4% improvement; both increase inference costs by more than 20%. The paper recommends omitting LLM-generated context files and keeping human-written ones minimal.

## Thread

- [[tool-design-for-agents]] — Provides empirical evidence that context file design directly impacts agent behavior and effectiveness
- [[agent-quality-engineering]] — His work motivates the need for evals around context file effectiveness and shows that agent-developer recommendations should be empirically validated

## Related

- [[context-files]] — The artifact his research evaluates
- [[martin-vechev]] — Senior author and co-founder of LogicStar.ai

## Sources

- `raw/2602.11988v1.txt` — Lead author of the AGENTS.md evaluation paper

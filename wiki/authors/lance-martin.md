---
title: Lance Martin
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md
tags: [author, context-engineering, agents, langchain]
---

# Lance Martin

> Engineer at LangChain who contributed significantly to the Deep Agents open-source harness and built its skill system. A central voice in [[context-engineering]] discourse. PhD in computational biology. His work on agent harness architecture, memory management, and evolving context bridges the gap between practical agent engineering and the emerging frontier of learnable context management.

## Background

Lance Martin works at LangChain, where he spent a lot of time working on the Deep Agents open-source harness — a Claude Code-style general-purpose agent. He built its skill system (file-based SOPs that agents pull in as needed) and has been writing publicly about context engineering for over a year.

His entry into context engineering was visceral: a deep research agent he built accumulated hundreds of thousands of tokens of context, cost $3 per run, and was painfully slow. This experience — shared by many engineers building their first agents — crystallized the realization that prompt engineering alone wasn't enough. Agents generate context through tool calls, and that context must be actively managed.

## Key Contributions

### Multi-tier action space architecture
Martin identified the architectural convergence across Claude Code, Manis, AMP, and his own Deep Agents: a thin tool calling layer (~12 atomic tools) paired with a computer primitive (shell, file system, code execution). The key insight: **n actions ≠ n tools**. Instead of binding every action as an individual tool, push actions out to the computer — let the agent compose them via bash, code, and the file system. This keeps the tool layer from bloating context and confusing the model.

### Skill system
Martin built the skill system for Deep Agents, which embodies the [[context-engineering]] principle of progressive disclosure. Skills live as markdown files on the file system — standard operating procedures for using CLIs, writing code for specific tasks, or following domain-specific conventions (e.g., a writing skill based on Strunk & White's Elements of Style). Agents pull skills into context only when needed, rather than carrying them permanently.

### Claude Diary
A personal experiment in [[evolving-context|evolving context]]: after each Claude Code session, a plugin creates a diary entry summarizing preferences, decisions, and learnings. A reflection loop periodically reviews accumulated diary entries and updates the agent's CLAUDE.md (system prompt). Crude but effective — it surfaces things like PR review preferences that would otherwise be lost between sessions.

### Tools and utilities
- **lang-fetch**: A CLI utility for pulling LangSmith traces, paired with skills that instruct Deep Agents how to use it during debugging.
- **Context engineering writing**: Active in the Twitter discourse on context engineering, engaging with practitioners including Dex Horthy (the host of this episode), Drew Brunig, and Omar (DSPy).

## Philosophy

- **Evolving context is the major unsolved frontier**: Memory management, preference learning, and skill acquisition are all "super hacky" right now — custom prompts and manual reflection loops. RLM (recursive language models trained to manage their own context) is an exciting direction, but user-specific memories will always need user-supplied guardrails.
- **The classifier heuristic** (articulated in dialogue with the host): If a context management task can be formulated as a verifiable classification problem, expect it to be absorbed into the model (sub-agent delegation, offloading rules, caching). If it's inherently user-specific and nuanced (which memories to save, which preferences are durable vs. session-specific), it stays external. Martin agrees with and elaborates on this heuristic.
- **File system as primitive, not as universal store**: File systems are an excellent agent primitive for offloading and scratchpad state. But expecting all context to live in the file system is overfitting to the coding use case. For large search spaces (enterprise knowledge, large codebases, personal memories), specialized search and retrieval tools are still needed.
- **Bash is a multi-tool**: The composability of bash (pipes, head, grep) makes it a uniquely powerful agent primitive — not a single tool but a tool factory. Models are extremely good at using it.

## Thread

- [[the-agent-workflow]] — Martin's architecture patterns and context management techniques are the operational layer of the workflow
- [[context-engineering]] — Core contributor to the practice

## Related

- [[context-engineering]] — The practice Martin helps define
- [[multi-tier-action-space]] — The architecture pattern he describes
- [[evolving-context]] — Continual learning in token space
- [[dex-horthy]] — Fellow context engineering practitioner; their work on context rot and agent harnesses is complementary
- [[ralph-loop]] — Martin describes the Ralph Wiggum loop as a context isolation pattern for long-running tasks
- [[claude-code]] — Reference implementation of the thin-tool-layer architecture

## Sources

- `raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md` — Full interview covering agent harness architecture, context engineering techniques, evolving context, memory management, and the RLM frontier

---
title: Dex Horthy
created: 2026-04-25
updated: 2026-05-02
sources:
  - raw/yt-no-vibes-allowed-dex-horthy.md
  - raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md
tags: ["engineer", "agent-engineering", "context-engineering"]
---

# Dex Horthy

> Creator of "12 Factor Agents" and co-creator of [[context-engineering]] (alongside Jeff Huber, Chroma CEO). Advocate for agentic engineering over vibe coding — structured, engineered workflows for LLMs rather than superficial AI usage.

## Overview

Dex Horthy is a software engineer, founder of HumanLayer, and a leading voice in agentic engineering. He authored the widely-adopted "research/plan/implement" workflow for Claude Code, authored the "12 Factor Agents" framework, and independently coined "context engineering" around the same time as Jeff Huber.

## Philosophy

- **Context Engineering**: The practice of getting the most out of LLMs by maximizing information-per-token density — putting the right information in while keeping context as small and dense as possible.
- **Model Intuition**: Advocates for picking one model family and one tool and developing deep intuition over 1-2 months rather than constantly switching between tools.
- **Markdown as Storage**: Pioneer of using markdown with front matter as a flexible, AI-friendly storage layer for CRM, task management, and personal knowledge bases. Agents can evolve their own schema.
- **Agentic Engineering Over Vibe Coding**: Rejects superficial "vibes-based" AI usage in favor of structured workflows with explicit phases.
- **Research/Plan/Implement Workflow**: His Claude Code workflow (research the codebase, plan the approach, implement) was adopted by thousands of engineers.

## Contributions

### Context Engineering Origins
Both Horthy and Jeff Huber independently converged on the term "context engineering" in early 2025. Horthy's "12 Factor Agents" article included context engineering as one of the factors — that factor was the one that "blew up."

### 12 Factor Agents
A framework for building robust agent systems, with factors including context engineering, tool selection, and workflow design.

### Claude Code UX Innovation
His work on prompting strategies — the research/plan/implement workflow, structured sub-agent delegation, and the insight that "oral tradition" in prompting could be baked into product opinions — influenced how thousands of engineers use code agents.

### Snapshot-Based Evals
Advocates for snapshot-based evals: run the workflow end-to-end, store the output, diff against previous runs. Like snapshot testing for agents. Skeptical of [[agent-evals|LLM-as-judge]] approaches — "never send an AI to do a linter's job."

> [!note] Role Clarification
> The current sources describe Dex Horthy in the context of HumanLayer (his own company) and his independent engineering practice. Previous wiki entries may have referenced a Sourcegraph affiliation that is not supported by the primary sources in this ingest.

## Related

- [[context-engineering]] — The practice he co-created
- [[instruction-severity-inflation]] — Identified the phenomenon of competing emphatic formatting degrading instruction following
- [[sourcegraph]] — Associated with code intelligence
- [[cody]] — AI coding assistant
- [[vibes-based-engineering]] — The anti-pattern he argues against
- [[verification-loop]] — The structured process he champions
- [[the-agent-workflow]] — His workflows are a central example
- [[agent-quality-engineering]] — His eval philosophy connects here
- [[matt-pocock]] — Peer in AI-native engineering with a complementary focus
- [[lance-martin]] — Fellow context engineering practitioner; Martin catalogued the operational techniques and identified the multi-tier action space architecture
- [[multi-tier-action-space]] — The fast orchestrator + smart oracle pattern is a specific instantiation of the thin-tool-layer architecture
- [[evolving-context]] — Dex's snapshot-based eval approach and model intuition philosophy provide the measurement framework for evolving context experiments

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md` — Talk at the AI Engineer Code Summit on "No Vibes Allowed" engineering.
- `raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md` — Full interview covering context engineering origins, model switching strategy, markdown storage, evals, and agent memory.

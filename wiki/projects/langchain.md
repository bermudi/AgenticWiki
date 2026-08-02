---
title: LangChain
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/yt-agent-development-lifecycle-101.md
unaudited_marginal: 0
tags: [project, langchain, langgraph, langsmith, deep-agents, agent-tooling]
---

# LangChain

> The company and open-source ecosystem behind the LangChain framework, LangGraph runtime, Deep Agents harness, and the LangSmith platform for testing, deployment, monitoring, and governance of agents. This page reflects the product stack as described by [[harrison-chase|Harrison Chase]] (CEO, 2026); product claims are vendor-sourced.

## Overview

LangChain started as an agent framework (its name gives the abstraction-tier category its common meaning). Over time the company has repositioned: the framework itself was slimmed down after the obfuscation lesson (a chain silently making five LLM calls under the hood), and the product surface expanded into a full lifecycle platform. Chase's own mapping of the stack onto the [[agent-development-lifecycle|agent development lifecycle]]:

| Lifecycle stage | LangChain product |
|---|---|
| Build | Deep Agents (harness), LangChain (framework), LangGraph (runtime), LangSmith Fleet (no-code) |
| Test | LangSmith datasets, evals, experiments; Harbor integration |
| Deploy | LangSmith Deployments, sandboxes, Context Hub |
| Monitor | LangSmith tracing, online evals, dashboards, user feedback |
| Govern | LLM Gateway (cost controls, cost visibility, data privacy) |

## Build Products

- **Deep Agents** — the agent harness Chase recommends for getting started today. Builds on top of LangChain; contains LangChain's best-practice context engineering (token-count controls, skills, virtual file systems, managed variant). Its VFS backend interface exposes six methods (read/write/edit/glob/grep/ls).
- **LangChain** — the slimmed-down agent framework; Chase's recommendation for building your own harness from scratch.
- **LangGraph** — the runtime beneath the others; open source, including checkpointing (persistence, HITL).
- **LangSmith Fleet** — the no-code agent builder, "entirely in the UI," largely driven by speaking to the agent in natural language.

## The LangSmith Platform

LangSmith is the test/deploy/monitor/govern platform, and Chase stresses it is **framework-agnostic** — usable with LangChain, Vercel AI SDK, CrewAI, or anything else. Its pieces are modular (deployments without observability, observability without deployments).

- **Datasets, evals, experiments** — the test-stage surface: build datasets, define metrics, run experiments, compare versions
- **Deployments** — spins up an agent server with ~30–40 production-ready endpoints: streaming, A2A, MCP, human-in-the-loop, short-term memory, long-term memory
- **Sandboxes** — code sandboxes, usable with or without the open-source frameworks
- **Context Hub** — versioned store for prompts, skills, and agents.md files, mountable as a [[virtual-file-system|virtual file system]]; usable by Deep Agents or any local coding agent
- **Tracing** — the company's best-known surface; full trace capture, sub-agent tool calls, exact LLM inputs/outputs
- **Online evals** — including a purpose-trained small LM for [[online-evals|perceived-error]] detection (in private beta at the time of the talk)
- **Dashboards** — aggregating latency, time-to-first-token, feedback, and online-eval signals
- **Insights** — hierarchical clustering of how people use your agents; topic drift over time

## Smith DB

LangSmith's storage layer is Smith DB, a database purpose-built for agent traces (led by co-founder Ankush). Chase's rationale: "storing one trace is easy. Storing billions of traces is hard." Trace-centric operations at scale are the performance argument.

## LangSmith Engine

The auto-improving agent: runs in the background over a tracing project every 6 hours, clusters traces into issues (each with a name, description, and links to affected traces), then proposes fixes — code changes, prompt changes, added dataset examples, and new online evals to monitor the fix. Chase's design stance: Engine produces first drafts that a human accepts on an issue board — "you just press one button, but you've got this human in the loop accepting it."

## LLM Gateway

The first governance product (private preview at the time): cost controls, cost visibility, and data privacy "first and foremost."

## The Self-Improving Agent Architecture

Chase's best-guess self-improving agent combines three pieces:

1. **Deep Agents** running with a VFS that maps its `memories` folder to Context Hub
2. **LangSmith** tracing everything
3. **LangSmith Engine** running over the traces, updating Context Hub with things the agent should remember

The agent pulls Context Hub down continuously, so Engine's memory updates propagate into behavior. This is the productized instance of the wiki's [[evolving-context|evolving context]] theory — "one of our best guesses at what a self-improving agent... looks like."

## Thread

- [[agent-quality-engineering]] — LangSmith is the vendor's quality infrastructure: datasets/evals/experiments, online evals, Engine's auto-improvement loop
- [[tool-design-for-agents]] — Deep Agents' thin tool layer, skills, and VFS backend interface are tool-design-for-agents in production

## Related

- [[harrison-chase]] — CEO and the voice behind the product claims on this page
- [[agent-development-lifecycle]] — The framework the stack maps onto
- [[online-evals]] — Perceived-error detector and online evals in LangSmith
- [[virtual-file-system]] — Deep Agents' backend interface and Context Hub
- [[lance-martin]] — LangChain engineer who built the Deep Agents harness and skill system
- [[evolving-context]] — LangSmith Engine as the productized auto-improvement loop
- [[agent-evals]] — The eval practice LangSmith operationalizes
- [[agent-observability]] — The tracing surface LangSmith is built around
- [[claude-code]] — The dominant proprietary harness Deep Agents competes with; both sit in the harness tier of Chase's taxonomy
- [[pi]] — Another general-purpose harness in Chase's coding-harness list
- [[mastra]] — Another agent framework with observability/evals; a framework-agnostic LangSmith interop

## Sources

- `raw/yt-agent-development-lifecycle-101.md` — Primary source: the product stack mapping, Deep Agents/LangChain/LangGraph/Fleet, LangSmith datasets-evals-deployments-sandboxes-Context Hub, Smith DB rationale, Engine mechanics, LLM Gateway, and the self-improving agent architecture

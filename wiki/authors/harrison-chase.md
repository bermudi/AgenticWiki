---
title: Harrison Chase
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/yt-agent-development-lifecycle-101.md
unaudited_marginal: 0
tags: [author, langchain, agent-lifecycle, observability, evals]
---

# Harrison Chase

> Co-founder and CEO of LangChain. Introduced the [[agent-development-lifecycle|agent development lifecycle]] (build → test → deploy → monitor → govern) as the organizing frame for shipping agents at scale, with traces at the center of agent operations and auto-improving agents (LangSmith Engine) as the long-run goal.

## Background

Harrison Chase is the co-founder and CEO of LangChain, the company behind the LangChain framework, LangGraph, Deep Agents, and the LangSmith platform. This page is based on his 2026 webinar "The Agent Development Lifecycle 101," which he frames as an educational overview of "the process and the solution that we see people getting towards" rather than a product pitch — he deliberately withholds mention of LangChain's own tools until the end.

## Key Contributions

### The agent development lifecycle

Chase's central framing: organizations that have figured out how to ship agents "iterate systematically. They ship really early and then iterate quickly," and the iteration is organized around **agent behavior**. The hardest part of building agents is "getting them to behave reliably" — a one-off demo is easy, but shipping reliably to hundreds of users at scale is where difficulty concentrates. The lifecycle he proposes is **build → test → deploy → monitor**, with **govern** wrapping the whole cycle rather than being a fifth sequential stage. See [[agent-development-lifecycle]].

### The build-stage abstraction taxonomy

The build question is the level of abstraction: **frameworks** (abstractions over model inputs, outputs, tools, prompts, retrieval — value: standardization and onboarding; cost: obfuscation, illustrated by the early-LangChain story of a chain silently making five LLM calls), **runtimes** (framework-agnostic runtime concerns: state management, durable execution, human intervention), and **harnesses** (above frameworks: context management, filesystem-as-context, summarization and compaction, clean HITL interfaces, sub-agent support, skills). He maps the open-source ecosystem onto this taxonomy: frameworks = LangChain, Llama Index, CrewAI, Google ADK, OpenAI Agents SDK, AWS Swarm; runtimes = LangGraph, Temporal; harnesses = Deep Agents, Claude Agent SDK, plus coding harnesses like Codex, OpenCode, Pi. He draws "a really thin line" between general-purpose developer harnesses and coding agent harnesses.

### No-code agents as markdown

Chase argues agent definitions are becoming "less and less code-like": prompts are text (agents.md files), tools are MCP connections (mcp.json), skills are markdown. He sees a real argument that "building agents can be done with markdown files," citing Vercel's Eve as a non-LangChain example of representing agents on the file system.

### Online evals and perceived error

Under monitoring, Chase introduces [[online-evals]]: running evaluators over production traces without ground truth. His concrete instance is **perceived error** — scanning user-agent transcripts for signals that the user thinks the agent messed up ("you messed up," pasting back a code snippet with an error). LangChain trained a small language model to detect this cheaply, since running an LLM over every trace is expensive.

### Traces at the center

Chase's operational thesis: "the hard part about building agents is getting them to behave. In order to get them to behave, you basically need to observe what they're doing and then tweak them and then measure it. And traces are really that core." Most agent failures trace back to the LLM not having the right context, so seeing the context an agent had is "probably the most important thing" in debugging. LangChain built a purpose-built trace database (Smith DB) to make trace-centric operations fast at billions of traces.

### Auto-improving agents: LangSmith Engine

Chase's answer to "will agents be embedded in the lifecycle?" — LangSmith Engine runs over traces every 6 hours, clusters them into issues (name, description, linked traces), suggests code and prompt changes, adds examples to datasets, and creates online evals to monitor fixes. His design stance: agents will do a lot of the work, "but it's still presented as like a first draft that a human comes in and approves" — a one-button accept on an issue board. He calls the self-improving agent "still very much... not easy to do."

### Context engineering in the harness

In Q&A, Chase describes Deep Agents' token-count controls: large tool responses are truncated in context (show the last ~1,000 tokens, point to the file), summarization kicks in at thresholds, and long file-write inputs are removed from context over time because they're already saved in the file. The constraint on all of it: don't break prompt caching — "if you start messing around with the token context... you don't have that same amount of cache," and cache hits are cheaper and faster.

## Thread

- [[agent-quality-engineering]] — The lifecycle's test/monitor stages and the feedback flywheel (traces → issues → fixes → online evals) are the vendor articulation of this thread's quality infrastructure
- [[tool-design-for-agents]] — The abstraction taxonomy (frameworks/runtimes/harnesses) and VFS are tool-design-for-agents positions

## Related

- [[agent-development-lifecycle]] — The framework Chase introduced
- [[langchain]] — The company he co-founded and its product stack
- [[online-evals]] — His perceived-error pattern
- [[virtual-file-system]] — His VFS framing (context in a database exposed as a filesystem)
- [[lance-martin]] — LangChain engineer who built the Deep Agents harness and skill system; complementary practitioner view of the same ecosystem
- [[dex-horthy]] — Independent context-engineering practitioner; Chase's harness techniques and Horthy's catalog overlap substantially
- [[tariq-shaukat]] — Another CEO-proposed development cycle (AC/DC); verification-centric where Chase's is lifecycle-centric
- [[kevin-gregory]] — Production-testing practitioner; Chase's "no industry-standard pass rate" echoes Gregory's app-specific eval stance

## Sources

- `raw/yt-agent-development-lifecycle-101.md` — Primary source: the lifecycle framework (build/test/deploy/monitor/govern), the abstraction taxonomy, no-code agents, testing (datasets/metrics/experiments, Terminal Bench 2, Harbor, eval environments), deployment (durable execution, persistence, streaming, HITL, sandboxes, VFS), monitoring (tracing, feedback, online evals, perceived error, dashboards), governance, traces-at-the-center, LangSmith Engine, and Q&A on token control, prompt caching, drift (insights), annotation queues, and the self-improving agent architecture

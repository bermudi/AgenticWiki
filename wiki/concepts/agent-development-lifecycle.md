---
title: Agent Development Lifecycle
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/yt-agent-development-lifecycle-101.md
unaudited_marginal: 0
tags: [concept, agent-lifecycle, build, test, deploy, monitor, governance]
---

# Agent Development Lifecycle

> The build → test → deploy → monitor framework for shipping agents, with governance wrapping the whole cycle rather than being a fifth sequential stage. Introduced by [[harrison-chase|Harrison Chase]] (LangChain, 2026): organizations that ship agents successfully iterate systematically around **agent behavior** — the hardest part of building agents is getting them to behave reliably.

## The Thesis

Chase's core claim: "the hardest part of building agents and shipping agents is getting them to behave reliably." Getting something working locally or in a one-off demo is easy; shipping it reliably to hundreds of users at scale is where difficulty concentrates. Organizations that ship agents well "iterate systematically," "ship really early and then iterate quickly," and the iteration is organized around observable agent behavior rather than around framework choice or prompt craft.

The lifecycle's components all serve one question: "how can we as developers of agents get the most out of the agents that we're building?"

## Build

The build-stage question is the **level of abstraction** you want. Chase's taxonomy:

| Tier | What it provides | Examples |
|---|---|---|
| **Frameworks** | Abstractions over model inputs, outputs, tools, prompts, retrieval; standardized onboarding | LangChain, Llama Index, CrewAI, Google ADK, OpenAI Agents SDK, AWS Swarm |
| **Runtimes** | Framework-agnostic runtime concerns: state management, durable execution, human intervention | LangGraph (part runtime, part framework), Temporal |
| **Harnesses** | Above frameworks: context management (filesystem-as-context, summary/compaction), clean HITL interfaces, sub-agent support, skills | Deep Agents, Claude Agent SDK; coding harnesses Codex, OpenCode, Pi |

The framework tradeoff is explicit: abstractions onboard quickly but can obfuscate what happens under the hood — Chase's cautionary tale is an early LangChain chain that silently made five LLM calls. His response was to make LangChain lighter and less high-level. No-code is a fourth build mode Chase calls out as genuinely interesting: agents defined as markdown (prompts as agents.md, tools as MCP/mcp.json, skills as markdown), citing Vercel's Eve.

## Test

Testing is "running your agent against some inputs and scoring those... It's measuring the agent." Two distinct user journeys:

- **Regression testing** — ensure you don't perform badly on cases you must perform well on
- **Benchmark hill climbing** — improve on a benchmark you want to improve on

The pipeline: **inputs** (expected tasks, known edge cases — compiled from real traces, dogfooding traces, or generated synthetically) → **datasets** (e.g., 50 inputs) → **judging criteria** (ground truth for classification tasks; criteria-based judging for open-ended tasks, e.g., Terminal Bench 2 runs unit tests against changed files rather than inspecting them) → **metrics** (correctness vs. ground truth, criteria checks, policy compliance) → **experiments** (run the model over inputs, score, compare versions, catch regressions, decide readiness).

Two callouts:

1. **Datasets and metrics are usually application-specific.** "Thinking critically about what the inputs are, what the outputs should be, how you want to judge it, those are really hard — almost product questions."
2. **Agent testing differs from LLM-application testing.** LLM apps are easy to test (call the LLM in a loop). Agents run 15–30 minutes, produce artifacts, and interact with the environment. **Harbor** — the open-source framework Terminal Bench 2 runs on — runs each task in its own sandbox, enabling long-running stateful evals. Chase also flags **eval environments**: agents interacting with stateful systems (Linear, Jira) need synthetic environments that reset to a clean state between eval runs.

## Deploy

Deployment concentrates the runtime concerns that are easy locally and hard at scale:

- **Durable execution** — resume from the failed step rather than restarting
- **Persistence/memory** — thread-level memory plus longer-term memory across threads
- **Streaming** — tokens, thinking process, tool calls; what to render back
- **Human-in-the-loop at scale** — pause the agent and wait for resume
- **Sandboxes** — agent-written code is untrusted code; predefined code execution is just a tool call, but agent-authored code needs a safe execution boundary
- **Virtual file systems** — keep context in a database (or S3, or Box, or Notion), expose it to the agent as a filesystem it already knows how to use. See [[virtual-file-system]].

## Monitor

Monitoring shows "what your agent did," in escalating fidelity:

1. **Tracing** — the most basic layer, which Chase says you should set up "even before you go to production": steps, inputs/outputs, tool calls, sub-agent calls, exact LLM input and output. Seeing the context an agent had is "probably the most important thing," because most agent failures are the LLM lacking the right context.
2. **Feedback collection** — user thumbs up/down and any user signal, to triage thousands or millions of traces.
3. **Online evals** — running evaluators over production traces without ground truth and attaching scores as feedback. See [[online-evals]].
4. **Dashboards** — aggregating latency, time-to-first-token, feedback, and online-eval signals.

## Govern

Governance "wraps the whole life cycle. It's not just a different step." Its concerns:

- **Cost controls** — for agents you build *and* agents you use (Chase: coding-agent costs internally "are getting pretty out of hand")
- **Tool access** — which tools agents can use, and on whose behalf (me, a co-worker, a service account)
- **Audit trails** — what tools an agent called and on whose behalf, drawing on observability
- **Human approval gates** — which tools need approval before running
- **Discoverability and sharing** — of tools, agents, contexts, and skills

## The Lifecycle at Scale

For a single agent you figure this out as you go. At organizational scale, Chase's observed patterns:

- **Shared frameworks** (build side) — standardize how teams build, enable switching between teams and onboarding
- **Shared evaluation frameworks** — prevent every team from rebuilding the same tests; org-level metrics every agent must satisfy, layered on top of application-specific datasets and metrics
- **Central platform or core AI team** — "infrastructure's hard and annoying"; most teams shouldn't roll their own deployment infrastructure
- **Shared tracing, feedback, and dashboards** — "building the agent is kind of the fun part, but it's also the fastest part of this whole cycle. Everything else... operating the agent at scale, that's the hardest part"

## Traces at the Center

Chase's unifying claim: traces are "the core of all of this." To make agents behave you observe (traces), tweak (prompts/tools/context), and measure (evals) — and traces are how you observe and start to measure. LangChain built Smith DB, a database purpose-built for agent traces, because "storing one trace is easy. Storing billions of traces is hard."

> [!note] Synthesis: The lifecycle as the vendor articulation of the quality flywheel
> The lifecycle's observe→tweak→measure loop is the [[agent-quality-loop|quality loop]] (code → traces → evals → scorers → back to code) restated at the organizational layer: build and deploy feed monitoring, monitoring feeds testing, and governance constrains all of it. The wiki's synthesis, not stated by Chase: the lifecycle adds the *govern* wrapper and the *at-scale* organizational layer to the existing quality-loop theory.

## Thread

- [[agent-quality-engineering]] — The lifecycle's test/monitor stages and traces-at-the-center are the vendor articulation of the quality infrastructure; online evals and Engine extend the feedback flywheel
- [[tool-design-for-agents]] — The abstraction taxonomy and VFS are tool-design positions for the build/deploy stages

## Related

- [[harrison-chase]] — Introduced the framework
- [[online-evals]] — The monitor-stage technique (production traces, no ground truth)
- [[virtual-file-system]] — The deploy-stage pattern (context in a database exposed as a filesystem)
- [[langchain]] — The vendor's product stack mapped onto the lifecycle
- [[agent-centric-development-cycle]] — Shaukat's three-loop verification cycle; verification-centric where Chase's is lifecycle-centric
- [[agent-evals]] — The test-stage practice in detail
- [[agent-observability]] — The monitor-stage substrate
- [[agent-quality-loop]] — The flywheel the lifecycle operationalizes
- [[model-swap-evals]] — An app-specific eval practice consistent with Chase's "datasets are application-specific"
- [[kevin-gregory]] — Practitioner whose "no industry-standard pass rate" stance Chase echoes
- [[the-human-lever]] — Chase's first-draft-approval design stance, tool-approval gates, and SME annotation queues are human-lever instances

## Sources

- `raw/yt-agent-development-lifecycle-101.md` — Primary source: the five-stage framework, the abstraction taxonomy, testing pipeline (datasets/metrics/experiments, Terminal Bench 2, Harbor, eval environments), deployment concerns, monitoring levels, governance wrapper, at-scale patterns, and traces-at-the-center

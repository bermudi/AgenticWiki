---
title: Agent-Centric Development Cycle
created: 2026-07-27
updated: 2026-08-02
sources:
  - raw/yt-land-of-ai-agents-verifiers-are-king-shaukat.md
  - raw/yt-agent-development-lifecycle-101.md
unaudited_marginal: 0
tags: [concept, verification, loops, enterprise, agent-workflow]
---

# Agent-Centric Development Cycle

> A framework proposed by [[tariq-shaukat]] (Sonar, 2026) for embedding verification into AI-assisted software development through three reinforcing loops: an agentic loop (in-loop verification), a CI verification loop (pull request review), and a code maintenance loop. The core argument: verification as an afterthought produces diminishing returns; verification baked into the process compounds.

## The Three Loops

The AC/DC framework (sometimes called "AC/DC" for short) structures verification as three loops operating at different cadences:

### 1. The Agentic Loop (Inner Loop)

Verification while the agent is working. The agent receives **context** (architectural awareness, semantic navigation, codebase maps) and **constraints** (coding standards, dependency allowlists, intended architecture) before generating code. In-loop verification catches errors as they're produced rather than after the fact.

Shaukat's testing showed this context+constraint approach reduces token consumption by over 30% — the agent navigates more efficiently when it understands the territory and the boundaries.

### 2. The CI Verification Loop (Middle Loop)

Pull request review using a combination of algorithmic and agentic verification. The velocity of this loop must increase massively to keep pace with agent-generated code volume. This is where multi-layered verification runs: algorithmic checks (data flows, control flows, known patterns, secrets detection) fused with agentic checks (intent verification, business logic, unknown unknowns).

### 3. The Code Maintenance Loop (Outer Loop)

Active, disciplined code maintenance using remediation agents and verification. Clean codebases compound: agents operating on well-maintained code require materially fewer tokens and less reasoning to complete the same tasks. Neglecting this loop produces a downward spiral where technical debt degrades agent performance, which produces more debt.

## Zero-Trust Multi-Layered Verification

The verification philosophy underlying all three loops. "Zero trust" because every model has biases and a character — no single model or technique is trusted to catch everything. "Multi-layered" because software is complex and messy. The fusion:

| Layer | What it catches | Examples |
|---|---|---|
| **Algorithmic** | Deterministic, pattern-based issues | Data flows, control flows, known patterns, secrets |
| **Agentic** | Intent, logic, unknown unknowns | Business logic verification, architectural conformance |

Sonar's customers using multi-layered verification report 44% fewer AI-derived production outages. A large bank achieved 92% issue reduction using the guide-verify-solve approach — not per-loop, but compounding over minutes and hours of agent work.

## Guide as Preemptive Verification

The "guide" phase separates into two distinct concerns:

- **Context**: making the codebase legible to agents — architectural awareness, semantic navigation, maps. Agents work better on million-line codebases when they understand the structure.
- **Constraints**: telling agents what not to do — dependency allowlists, coding standards, intended architecture (not just existing architecture, but where you want to go). Shaukat argues this is under-discussed relative to context.

Together, guide is preemptive verification — less to verify, less to fix.

## Empirical Evidence

Shaukat cites several data points:

- **CMU study**: Initial 3–5× productivity boost from AI coding agents dissipates within 3 months. The cause: increases in security issues, maintainability issues, reliability issues, and complexity — technical debt accumulates as fast as code is generated.
- **Sonar benchmarking** (4,000+ problems): Models score well on functional correctness but still generate complexity, bugs, and security issues at variable rates.
- **METR data**: Latest models can complete 16–18 hour tasks, but at 50% success rate. At 80% accuracy, task horizon drops to ~3.5 hours.
- **Compounding effect**: The same agentic task on a cleaned codebase vs. a typical codebase shows material reduction in tokens, reasoning, and energy needed.

> [!note] Synthesis: Enterprise operationalization of the verifiability thesis
> The AC/DC framework is the enterprise operationalization of [[verifiability]]. Where [[andrej-karpathy|Karpathy]] argues that LLMs automate what you can verify, Shaukat argues that verification must be explicitly externalized into the SDLC because models can't perfectly self-verify. The three loops are the mechanical instantiation of this — verification at every cadence, not just at the end.

> [!note] Departure: Verification-centric vs. lifecycle-centric framing
> [[harrison-chase|Harrison Chase]]'s [[agent-development-lifecycle]] (build → test → deploy → monitor → govern) is a parallel CEO-proposed development cycle with a different center of gravity: where AC/DC is organized around *verification loops*, Chase's is organized around *agent behavior* (observe → tweak → measure) with governance wrapping the whole cycle. The two are complementary rather than contradictory — AC/DC's agentic loop is Chase's "build with iteration," its CI loop is Chase's "test," and its maintenance loop is Chase's "monitor + govern" — but they make different claims about where the binding constraint is (verification infrastructure vs. behavioral observability). See [[agent-development-lifecycle]] for the contrast.

## Thread

- [[the-verifiability-thesis]] — AC/DC operationalizes verifiability as an explicit SDLC discipline
- [[the-slop-problem]] — The CMU productivity dissipation data is empirical evidence for the slop problem's economic consequence
- [[agent-quality-engineering]] — The CI verification loop is the quality infrastructure for agent-generated code

## Related

- [[tariq-shaukat]] — Originator of the framework
- [[verification-loop]] — The broader concept; AC/DC extends it into three distinct loops
- [[code-economics]] — The productivity dissipation data and technical debt accumulation
- [[domain-expertise-as-moat]] — The CTO who said 80% accuracy isn't enterprise-grade
- [[agent-experience]] — Context and constraints as the AX layer for agents
- [[backpressure]] — Multi-layered verification as backpressure on agent output
- [[rollback-posture]] — The code maintenance loop as system-level detection cadence
- [[agent-development-lifecycle]] — Chase's parallel lifecycle framework; verification-centric where Chase's is behavior-centric
- [[harrison-chase]] — Introduced the parallel lifecycle framework
- [[online-evals]] — The monitoring-stage complement to AC/DC's verification loops: scoring production traces without ground truth

## Sources

- `raw/yt-land-of-ai-agents-verifiers-are-king-shaukat.md` — Primary source: AC/DC framework, three loops, zero-trust verification, guide as context+constraints, CMU study, Sonar benchmarking data, compounding effects
- `raw/yt-agent-development-lifecycle-101.md` — [[harrison-chase|Chase]] (LangChain, 2026): the parallel lifecycle framework; source for the Departure callout contrasting verification-centric (AC/DC) with behavior-centric (lifecycle) framing.

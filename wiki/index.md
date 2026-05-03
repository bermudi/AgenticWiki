# Index

> A repository of software engineering wisdom and AI-native development patterns.

## 🧵 Threads — The Big Picture

Synthetic essays that trace themes across multiple sources. Start here.

- [[the-slop-problem]] — AI generates code faster than humans can review. Without discipline, codebase quality degrades irreversibly.
- [[the-human-lever]] — The human's job shifts from writing code to owning design boundaries and verifying outcomes. You don't read every line, but you own the interfaces.
- [[the-agent-workflow]] — How to actually work day-to-day: plan HITL, execute AFK, manage context ruthlessly, ship tracer bullets.
- [[tool-design-for-agents]] — Tools were built for humans. Agents need different interface contracts, output formats, and design priorities. Three sources converge on the tool as the bottleneck.
- [[agent-quality-engineering]] — Making agents shippable requires a quality infrastructure: evals (probabilistic CI) + observability (decision-chain tracing) + a feedback flywheel (production failures → eval cases → improvement).

## ✍️ Authors
- [[addy-osmani]] — Engineer at Google; coined "comprehension debt" — the gap between code existence and human understanding.
- [[zanie-blue]] — Engineer at Astral, advocate for redesigning tools for agentic consumption.
- [[philippe-laban]] — Researcher at Microsoft Research; lead author of DELEGATE-52 benchmark on LLM document corruption.
- [[armin-ronacher]] — Creator of Flask and Sentry. Advocate for Go in agentic workflows, tooling minimalism, and simplicity as an agent force multiplier.
- [[damian-galarza]] — Multi-agent system operator and author of the three-part agent quality series (evals, observability, quality loop).
- [[dex-horthy]] — Creator of "12 Factor Agents," co-creator of [[context-engineering]], and advocate for agentic engineering over vibe coding.
- [[dhh]] — Creator of Rails and advocate for AI-pilled development and aesthetics.
- [[geoffrey-huntley]] — Originator of the Ralph Wiggum technique for autonomous agent loops.
- [[gergely-orosz]] — Tech industry analyst and author of The Pragmatic Engineer.
- [[kent-beck]] — Pioneer of TDD and Extreme Programming (XP).
- [[louis-knight-webb]] — Articulated the plan-vs-review tradeoff and focus maxing as the new software engineering workflow.
- [[martin-fowler]] — Pioneer of Agile and Refactoring.
- [[mario-zechner]] — Creator of Pi.
- [[lance-martin]] — Engineer at LangChain who built the Deep Agents harness and skill system; catalogued context engineering techniques and evolving context
- [[the-gray-cat]] — YouTube creator; personal essay on living inside comprehension debt and recovering via teaching mode.
- [[matt-pocock]] — Educator and advocate for strategic programming.

## 🧠 Concepts
- [[agent-friendly-tooling]] — Speed, observability, and misuse resistance as the practical craft of tooling for agents.
- [[backpressure]] — Engineering the environment so wrong agent outputs are mechanically rejected.
- [[ralph-loop]] — Minimalist autonomous agent loop: dumb bash loop, plan file as shared state, one task per iteration.
- [[plan-disposability]] — Treat plans as ephemeral coordination state, not contracts.
- [[aesthetics-is-truth]] — Using beauty and elegance as proxies for technical quality.
- [[afk-agent]] — Agents that implement features in the background without human supervision.
- [[agent-experience]] — Converging DX with AX to make codebases agent-friendly.
- [[agent-evals]] — CI for probabilistic systems: the 4-layer eval stack for AI agents.
- [[agent-observability]] — Logs, traces, and metrics for agent decision chains.
- [[agent-quality-loop]] — The flywheel: traces → evals → scorers → code.
- [[ai-design-loop]] — Iterating to reach a shared understanding before delegating implementation.
- [[code-intelligence]] — Semantic understanding of code to provide high-fidelity context.
- [[compounding-booboos]] — The risk of small agent errors accumulating into failures.
- [[comprehension-debt]] — The gap between code that exists and code any human understands. Speeds you up right until it breaks you.
- [[critical-failure]] — Sparse catastrophic errors that explain the majority of document degradation in long LLM workflows.
- [[delegate-52]] — Benchmark of 52 professional domains measuring LLM readiness for delegated document editing.
- [[deliberate-friction]] — Intentional engineering slowdowns at high-stakes decision points. Not all friction is bad DX.
- [[deep-vs-shallow-modules]] — Module design critical for managing agent navigation.
- [[document-degradation]] — Silent corruption of documents by LLMs during long delegated workflows.
- [[jagged-frontier]] — LLM capabilities are unevenly distributed; strong in some domains, severely error-prone in others.
- [[round-trip-relay]] — Reference-free evaluation method chaining reversible edits to measure long-horizon degradation.
- [[grey-box-engineering]] — Balancing human design authority with agentic implementation speed.
- [[hallucination]] — The technical causes and types of LLM fabrications.
- [[locality-and-leverage]] — The two payoff properties of deep modules: concentrated changes and interface power.
- [[malleable-agents]] — Agents that can be modified on the fly by users or themselves.
- [[multi-tier-action-space]] — The thin tool layer + computer architecture converged on by Claude Code, Manis, AMP, and Deep Agents.
- [[peak-programmer]] — The hypothesis that demand for manual implementation has peaked.
- [[plan-vs-review]] — The quantified tradeoff: 5 minutes of planning saves 30 minutes of reviewing AI-generated code.
- [[seams-and-adapters]] — Where module interfaces live and what satisfies them — the foundation of testable, AI-friendly architectures.
- [[shared-design-concept]] — The "theory" of the code that must be shared between human and agent.
- [[slop]] — Low-quality, AI-generated content that degrades system quality.
- [[smart-zone-dumb-zone]] — Managing LLM reasoning quality based on context volume.
- [[strategic-vs-tactical-programming]] — Prioritizing long-term health over immediate tactical fixes.
- [[tracer-bullets]] — Vertical slices of functionality for early end-to-end feedback.
- [[ubiquitous-language]] — Shared terminology to align human and agent mental models.
- [[context-engineering]] — Putting the right information in while keeping context as small and dense as possible. Maximizing information-per-token density.
- [[evolving-context]] — Continual learning in token space; agents improving their own prompts, skills, and memories over time without retraining weights.
- [[instruction-severity-inflation]] — The phenomenon where competing emphatic formatting degrades LLM instruction following.
- [[verification-loop]] — Automated feedback loops for validating agent implementations.
- [[vibes-based-engineering]] — Anti-pattern of accepting AI output without verification or context.
- [[wide-events]] — One context-rich log event per request: what agents should ship instead of console.log.

## Organizations
- [[sourcegraph]] — Universal code search and intelligence platform.

## 🛠️ Projects & Tools
- [[astral]] — High-performance Python tooling (Ruff, ty, uv), adapting for agentic use.
- [[axiom]] — Observability platform for high-cardinality, high-dimensionality log data at scale.
- [[claude-code]] — Agentic CLI tool for code exploration and editing.
- [[cody]] — AI coding assistant powered by repository-wide code intelligence.
- [[improve-codebase-architecture]] — Matt Pocock's skill for systematic codebase deepening scans.
- [[mastra]] — Open-source TypeScript agent framework with built-in observability, evals, and scoring.
- [[pi]] — Minimalist agent harness for building and controlling AI workflows.
- [[slop-watch]] — Self-hosted coding agent observability platform; sessions, tokens, traces, and quality metrics for agent-driven teams.
- [[omarchy]] — A new Linux distribution project aimed at simplifying the desktop experience.


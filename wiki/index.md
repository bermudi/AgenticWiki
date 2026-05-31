---
title: Index
created: 2026-04-25
updated: 2026-05-31
sources:
  - raw/2605.18747.pdf
tags: [index, wiki]
unaudited_marginal: 0
---

## Sources

- `raw/2605.18747.pdf` — Code as Agent Harness survey (Ning et al., 2026); index entry added

# Index

> A repository of software engineering wisdom and AI-native development patterns.

## 🧵 Threads — The Big Picture

Synthetic essays that trace themes across multiple sources. Start here.

- [[the-slop-problem]] — AI generates code faster than humans can review. Without discipline, codebase quality degrades irreversibly.
- [[the-human-lever]] — The human's job shifts from writing code to owning design boundaries and verifying outcomes. You don't read every line, but you own the interfaces.
- [[the-agent-workflow]] — How to actually work day-to-day: plan HITL, execute AFK, manage context ruthlessly, ship tracer bullets.
- [[tool-design-for-agents]] — Tools were built for humans. Agents need different interface contracts, output formats, and design priorities. Three sources converge on the tool as the bottleneck.
- [[agent-quality-engineering]] — Making agents shippable requires a quality infrastructure: evals (probabilistic CI) + observability (decision-chain tracing) + a feedback flywheel (production failures → eval cases → improvement).
- [[intent-to-code]] — What stands between human intent and shipped code? Four philosophies — specs-as-compiler, plan-as-contract, alignment-first, and pure vibes — disagree on the artifact's weight and where quality enforcement lives.
- [[the-verifiability-thesis]] — Karpathy's unified theory: verifiability drives RL training, which creates the jagged frontier, which makes vibe coding possible on the peaks and demands agentic engineering to manage the boundary.
- [[prompts-in-code-review]] — Prompt design for LLM code review is a bias control surface, not an accuracy booster. More detail increases overcorrection; structured reasoning templates are the most reliable fix.

## ✍️ Authors
- [[addy-osmani]] — Engineer at Google; coined "comprehension debt" — the gap between code existence and human understanding.
- [[andrej-karpathy]] — AI researcher and educator; co-founder of OpenAI, led Autopilot at Tesla; coined "vibe coding" and "agentic engineering."
- [[discover-ai]] — YouTube creator (code4AI); documented the synthetic truth phenomenon through a Gemini interaction.
- [[chris-parsons]] — Ex-CTO and AI adoption consultant; operationalized Ralph Loops as skills; introduced the worker loop pattern, sub-agent validation, and the "reversible without embarrassment" safety heuristic.
- [[zanie-blue]] — Engineer at Astral, advocate for redesigning tools for agentic consumption.
- [[philippe-laban]] — Researcher at Microsoft Research; lead author of DELEGATE-52 benchmark on LLM document corruption.
- [[armin-ronacher]] — Creator of Flask and Sentry. Advocate for Go in agentic workflows, tooling minimalism, and simplicity as an agent force multiplier.
- [[damian-galarza]] — Multi-agent system operator and author of the three-part agent quality series (evals, observability, quality loop).
- [[dex-horthy]] — Creator of "12 Factor Agents," co-creator of [[context-engineering]], and advocate for agentic engineering over vibe coding.
- [[lechen-zhang]] — Researcher at UIUC; lead author of SPRIG (ICLR 2026) on system prompt optimization via genetic algorithms.
- [[zaiyu-cheng]] — Researcher at William & Mary; lead author of the 360-configuration empirical study on system prompt effects in code generation.
- [[haolin-jin]] — Researcher at University of Sydney; lead author of the systematic overcorrection study in LLM code review.
- [[shubham-ugare]] — Researcher at Meta; lead author of the semi-formal reasoning paper on execution-free code verification.
- [[zixiao-zhao]] — Researcher at UBC; lead author of the Bias in the Loop study auditing LLM-as-Judge for software engineering.
- [[peter-werry]] — Founder of Unblocked; context engine architecture, satisfaction of search, and hard lessons building organizational context retrieval.
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
- [[thibaud-gloaguen]] — Lead author of the first rigorous evaluation of AGENTS.md files on coding agent performance; found LLM-generated context files degrade agent performance.
- [[martin-vechev]] — Professor at ETH Zurich and LogicStar.ai co-founder; senior author of the AGENTS.md evaluation study.
- [[christoph-treude]] — Professor at SMU; co-author of the first empirical study on AGENTS.md efficiency impact.
- [[thariq]] — Engineer on the Claude Code team; authored the practical playbook for using HTML instead of Markdown as agent output.
- [[xuying-ning]] — Lead author of the *Code as Agent Harness* survey (UIUC + Meta + Stanford).
- [[dax-raad]] — Engineer at Anomaly; led OpenCode's rewrite in Effect; articulated the AI boilerplate paradox
- [[thorsten-ball]] — Co-creator of AMP; argues the harness should decay like a cast as models improve. "Software as we know it is dead."

## 🧠 Concepts
- [[ai-boilerplate-paradox]] — Verbose frameworks become preferable with AI because explicitness constrains LLM output; the DX/AX divergence
- [[aesthetics-is-truth]] — Using beauty and elegance as proxies for technical quality.
- [[knowledge-triplet]] — Either you know what you want, it's in the codebase, or it's in the training data. If none of these, the model fabricates.
- [[afk-agent]] — Agents that implement features in the background without human supervision.
- [[agent-experience]] — Converging DX with AX to make codebases agent-friendly.
- [[agentic-engineering]] — The professional discipline of coordinating AI agents without sacrificing quality; 10x is the floor, not the ceiling.
- [[agent-evals]] — CI for probabilistic systems: the 4-layer eval stack for AI agents.
- [[code-as-agent-harness]] — Code as the executable, inspectable, and stateful medium through which AI agents reason, act, and coordinate.
- [[harness-interface]] — The harness interface where code connects agents to reasoning, action, and environment modeling.
- [[harness-mechanisms]] — Planning, memory, tool use, control, and optimization that sustain code-centric agents.
- [[harness-engineering]] — Self-evolving harnesses, harness-level evaluation, and the open problems of building reliable agent systems.
- [[agent-floor]] — Harvard 6-tier benchmark isolating tool-use complexity from real-world confounds; small models match frontier through tier C, all collapse at long-horizon planning.
- [[agent-friendly-tooling]] — Speed, observability, and misuse resistance as the practical craft of tooling for agents.
- [[agent-observability]] — Logs, traces, and metrics for agent decision chains.
- [[agent-quality-loop]] — The flywheel: traces → evals → scorers → code.
- [[agent-skills]] — Procedural knowledge for AI agents via skill.md files, progressive disclosure, and the open standard adopted across major platforms.
- [[ai-design-loop]] — Iterating to reach a shared understanding before delegating implementation.
- [[backpressure]] — Engineering the environment so wrong agent outputs are mechanically rejected.
- [[blind-panic]] — Failure mode where an LLM executes persistently but degenerates into looping and tool hallucination when pushed beyond its planning horizon.
- [[code-intelligence]] — Semantic understanding of code to provide high-fidelity context.
- [[compounding-booboos]] — The risk of small agent errors accumulating into failures.
- [[comprehension-debt]] — The gap between code that exists and code any human understands. Speeds you up right until it breaks you.
- [[context-files]] — Repository-level artifacts (AGENTS.md, CLAUDE.md) that provide AI coding agents with project-specific instructions; empirical evidence shows their impact is ambiguous — minimal human-written files help on simple tasks, verbose LLM-generated files hurt.
- [[context-engineering]] — Putting the right information in while keeping context as small and dense as possible. Maximizing information-per-token density.
- [[dynamic-trust]] — Trust in multi-agent systems should be dynamically computed from source + context + provability, not statically assigned to sources.
- [[critical-failure]] — Sparse catastrophic errors that explain the majority of document degradation in long LLM workflows.
- [[deep-vs-shallow-modules]] — Module design critical for managing agent navigation.
- [[delegate-52]] — Benchmark of 52 professional domains measuring LLM readiness for delegated document editing.
- [[deliberate-friction]] — Intentional engineering slowdowns at high-stakes decision points. Not all friction is bad DX.
- [[doc-rot]] — Stale documentation and completed PRDs that mislead future agent sessions into following outdated assumptions.
- [[document-degradation]] — Silent corruption of documents by LLMs during long delegated workflows.
- [[evolving-context]] — Continual learning in token space; agents improving their own prompts, skills, and memories over time without retraining weights.
- [[execution-apathy]] — Failure mode where an LLM plans a multi-step solution but resigns before executing, producing plausible-looking outputs without doing the work.
- [[fighting-slop-with-slop]] — The intentional, controlled use of AI-generated slop for internal tooling to produce higher quality where it matters.
- [[grey-box-engineering]] — Balancing human design authority with agentic implementation speed.
- [[hallucination]] — The technical causes and types of LLM fabrications.
- [[html-as-agent-output]] — Using HTML instead of Markdown for agent output: richer density, visual clarity, two-way interaction, at the cost of tokens and version control pain.
- [[inferential-rule-following]] — Applying abstract conditional rules to concrete reasoning problems; models pattern-match against training data rather than following given rules.
- [[instruction-hierarchy]] — The mechanism by which LLMs resolve conflicting instructions from heterogeneous sources; current models fail at >3 privilege tiers.
- [[instruction-severity-inflation]] — The phenomenon where competing emphatic formatting degrades LLM instruction following.
- [[iterative-self-correction]] — Feedback-driven multi-turn correction loops; even with perfect feedback, models hit a sub-91% ceiling and exhibit catastrophic overcorrection.
- [[jagged-frontier]] — LLM capabilities are unevenly distributed; strong in some domains, severely error-prone in others.
- [[locality-and-leverage]] — The two payoff properties of deep modules: concentrated changes and interface power.
- [[malleable-agents]] — Agents that can be modified on the fly by users or themselves.
- [[model-routing]] — Decomposing tasks by complexity and routing each subtask to the cheapest model capable of handling it; up to 15× cost savings.
- [[multi-agent-code-orchestration]] — Scaling the code-as-harness from single agents to multi-agent systems with specialized roles, interaction modes, and workflow topologies.
- [[multi-tier-action-space]] — The thin tool layer + computer architecture converged on by Claude Code, Manis, AMP, and Deep Agents.
- [[peak-programmer]] — The hypothesis that demand for manual implementation has peaked.
- [[plan-disposability]] — Treat plans as ephemeral coordination state, not contracts.
- [[plan-vs-review]] — The quantified tradeoff: 5 minutes of planning saves 30 minutes of reviewing AI-generated code.
- [[procedural-knowledge]] — The cognitive science framing of procedural memory mapped to agent skill files; distinct from semantic (RAG) and episodic (conversation logs) knowledge.
- [[ralph-loop]] — Minimalist autonomous agent loop: dumb bash loop, plan file as shared state, one task per iteration.
- [[rubric-evaluation]] — Evaluating LLM outputs at the rubric level; RUBRICEVAL finds even frontier models struggle with fine-grained LLM-as-judge (GPT-4o: 55.97% on hard cases).
- [[round-trip-relay]] — Reference-free evaluation method chaining reversible edits to measure long-horizon degradation.
- [[rule-following]] — Obeying developer-specified rules across conversations; alignment tuning often hurts, and performance has zero correlation with standard benchmarks.
- [[satisfaction-of-search]] — Cognitive bias where agents stop context retrieval at the first plausible answer; introduced from radiology by Peter Werry.
- [[seams-and-adapters]] — Where module interfaces live and what satisfies them — the foundation of testable, AI-friendly architectures.
- [[shared-design-concept]] — The "theory" of the code that must be shared between human and agent.
- [[software-1-2-3]] — Karpathy's three-stage model: explicit code (1.0) → trained neural networks (2.0) → prompting as programming (3.0).
- [[slop]] — Low-quality, AI-generated content that degrades system quality.
- [[smart-zone-dumb-zone]] — Managing LLM reasoning quality based on context volume.
- [[system-prompt-effects]] — System prompts have measurable, non-monotonic effects on LLM performance that interact with model scale, prompting strategy, and programming language.
- [[llm-as-code-judge]] — Using LLMs to evaluate code quality; increasingly common in agentic SE pipelines but suffers from systematic prompt-induced biases.
- [[overcorrection-bias]] — The systematic tendency of LLMs to misclassify correct code as defective, especially when prompted to explain and fix.
- [[semi-formal-reasoning]] — Structured prompting that requires explicit premises, execution traces, and formal conclusions to prevent unsupported claims.
- [[strategic-vs-tactical-programming]] — Prioritizing long-term health over immediate tactical fixes.
- [[synthetic-truth]] — Intent-aware AI fabrication where the model constructs what it infers the user wants, not what is true.
- [[temporal-smoothing]] — A failure mode where AI presents speculative or future work as completed reality.
- [[tracer-bullets]] — Vertical slices of functionality for early end-to-end feedback.
- [[ubiquitous-language]] — Shared terminology to align human and agent mental models.
- [[verification-loop]] — Automated feedback loops for validating agent implementations.
- [[verifiability]] — Karpathy's framework: LLMs automate what you can verify; the driver of jagged AI capability.
- [[vibe-coding]] — The term Karpathy coined: coding where you fully trust the LLM's output. Raises the floor for everyone.
- [[vibes-based-engineering]] — Anti-pattern of accepting AI output without verification or context.
- [[wide-events]] — One context-rich log event per request: what agents should ship instead of console.log.

## Organizations
- [[sourcegraph]] — Universal code search and intelligence platform.

## 🛠️ Projects & Tools
- [[effect]] — TypeScript framework bundling schema, services, streams, and tracing; its verbosity acts as AI guardrails
- [[opencode]] — Open-source coding agent (~8M MAU) rewritten in Effect by Anomaly
- [[astral]] — High-performance Python tooling (Ruff, ty, uv), adapting for agentic use.
- [[axiom]] — Observability platform for high-cardinality, high-dimensionality log data at scale.
- [[claude-code]] — Agentic CLI tool for code exploration and editing.
- [[contextcov]] — Framework that transforms passive AGENTS.md instructions into executable guardrails; 88.3% constraint compliance on SWE-bench Lite.
- [[cody]] — AI coding assistant powered by repository-wide code intelligence.
- [[improve-codebase-architecture]] — Matt Pocock's skill for systematic codebase deepening scans.
- [[mastra]] — Open-source TypeScript agent framework with built-in observability, evals, and scoring.
- [[pi]] — Minimalist agent harness for building and controlling AI workflows.
- [[slop-watch]] — Self-hosted coding agent observability platform; sessions, tokens, traces, and quality metrics for agent-driven teams.
- [[sandcastle]] — Matt Pocock's TypeScript library for parallelizing AFK agent loops in Docker sandboxes.
- [[omarchy]] — A new Linux distribution project aimed at simplifying the desktop experience.
- [[unblocked]] — Context engine for engineering organizations; pre-curates organizational context for AI coding agents.


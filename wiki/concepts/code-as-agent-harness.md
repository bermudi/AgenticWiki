---
title: Code as Agent Harness
created: 2026-05-21
updated: 2026-06-18
sources:
  - raw/2605.18747.pdf
  - raw/yt-llms-are-killing-agent-harness.md
  - raw/recursive-agent-harnesses.txt
  - raw/2606.16707v1.txt
tags: [concept, agent-harness, architecture, code-centric, harness-recursion, executable-memory]
unaudited_marginal: 0
---

# Code as Agent Harness

> A unified view that centers code as the executable, inspectable, and stateful medium through which AI agents reason, act, model their environments, and coordinate. Code is not just what agents generate — it's the operational substrate of the entire agent loop, from externalizing intermediate computation to maintaining persistent task state to coordinating multi-agent workflows.

## The Core Framing

The [[code-as-agent-harness]] framework, formalized by Ning, Tieu, Fu et al. (UIUC + Meta + Stanford, 2026), distinguishes three coupled elements of long-running agentic systems:

1. **Model-internal capabilities**: The model's reasoning, perception, planning, simulation, and evaluation abilities — learned during training.
2. **System-provided harness infrastructure**: Predefined tools, APIs, sandboxes, memory systems, validators, permission boundaries, telemetry, and workflows that connect model outputs to external actions and feedback.
3. **Agent-initiated code artifacts**: Interactive code objects that agents create, execute, observe, revise, persist, and share within the task execution loop. Examples include regression tests, temporary tools, DSL programs, executable workflows, reusable skills, and intermediate program states.

The core contribution: while existing surveys treat code as the *end product* of LLMs, this framework focuses on **code as an operational medium** — how model capabilities construct and evolve agent-initiated code artifacts through interaction with harness infrastructure.

Code as agent harness has three defining properties:
- **Executable**: Model outputs become operations with formally verifiable outcomes, not just text
- **Inspectable**: Intermediate computation is exposed as structured traces the harness can read, store, and act upon
- **Stateful**: Evolving programs represent task progress in persistent, modifiable form across steps

## The Three Connected Layers

The survey organizes code as agent harness into three layers:

### Harness Interface (§2)
Code forms the basic interface between a model and its task environment: code for reasoning (externalizing computation into executable programs), code for acting (translating intent into tool calls and policies), and code for environment modeling (representing world state through program states, repositories, tests, and logs). See [[harness-interface]].

### Harness Mechanisms (§3)
Planning, memory, tool use, control, and optimization that sustain code-centric agents over long-horizon execution and revision. These mechanisms turn the interface into an operational harness. See [[harness-mechanisms]].

### Scaling the Harness (§4)
Multi-agent orchestration over shared code artifacts — agent roles (manager, planner, coder, reviewer, tester), collaboration modes (programming, repair, debate, red-teaming), and workflow topologies (centralized, distributed, streaming). See [[multi-agent-code-orchestration]] for roles, interaction modes, topologies, and convergence patterns, and [[harness-engineering]] for the open problems.

## Five Application Domains

The survey traces how code-as-harness appears across five domains:

| Domain | Code is used for… |
|---|---|
| **Code assistants** | Repository state, test feedback, code editing, PR workflows, shared repos |
| **GUI/OS agents** | DOM state, action APIs, visual grounding, UI memory, executable checks |
| **Embodied agents** | Skill libraries, robot control, affordance grounding, simulator feedback |
| **Scientific discovery** | Hypotheses, experiments, simulation loops, data analysis, lab automation |
| **Personalization** | User state, preference memory, feedback loops, adaptive policy, long-term profiles |

## Relationship to Existing Wiki Concepts

The framework provides a unifying taxonomy for several existing wiki concepts:
- The [[multi-tier-action-space]] pattern is a concrete instantiation of the harness interface (code for acting) + harness mechanisms (tool use)
- [[verification-loop]] and [[backpressure]] are forms of harness control within the plan-execute-verify loop
- [[agent-skills]] correspond to grounded skill selection and lifelong code-based agents in the acting interface
- [[evolving-context]] and [[context-engineering]] connect to memory mechanisms and context compaction
- [[the-agent-workflow]]'s HITL/AFK split is operationalized by harness mechanisms (planning, control)
- The [[ralph-loop]] is a minimal harness instantiation — linear decomposition planning + verification-driven control
- The [[recursive-agent-harness]] is the code-as-action extension applied to multi-agent orchestration: the parent writes executable code that instantiates subagents in parallel. This is the framework's "code for acting" instantiated at the parent-child level — the script is the action that produces many subagent harnesses.
- [[executable-memory]] (User as Code, Bojie Li, Pine AI 2026) is the framework's "code for environment modeling" instantiated at the user-model layer: the agent's model of the user is a living software project (typed Python state + Python functions encoding rules) maintained by a two-phase pipeline. Memory operations become file-system actions; the interpreter is the verification boundary. This is the most concrete case study yet of code as the operational substrate for the agent's working environment.

## Thread

- [[the-slop-problem]] — The harness's overconfident verification (green tests ≠ complete specification) is a slop vector at the verification layer
- [[the-human-lever]] — HITL as permission governance: the survey reframes the human's safety role as multi-tier risk classification within the harness
- [[the-agent-workflow]] — The harness framework provides the architectural vocabulary for the workflow's execution phase
- [[the-verifiability-thesis]] — Executable verification is the core property that makes code work as a harness
- [[agent-quality-engineering]] — Harness-level evaluation and telemetry are prerequisites for quality measurement
- [[tool-design-for-agents]] — The harness interface is where tool design meets agent action
- [[intent-to-code]] — Code as the verifiable interface between human intent and execution

## Related

- [[harness-interface]] — Code for reasoning, acting, and environment modeling
- [[harness-mechanisms]] — Planning, memory, tool use, control, and optimization
- [[harness-engineering]] — Self-evolving harnesses, open problems, and the science of harness engineering
- [[multi-tier-action-space]] — A concrete architecture pattern within the harness framework
- [[verification-loop]] — Harness control through deterministic sensors
- [[agent-skills]] — Grounded skill selection within code-for-acting
- [[thorsten-ball]] — AMP as a live case study of the harness at the thin end: Ball argues the harness should decay like a cast as models improve
- [[backpressure]] — Mechanical rejection within harness control
- [[xuying-ning]] — Lead author of the survey
- [[recursive-agent-harness]] — The code-as-action extension applied to multi-agent orchestration: parent writes executable code that spawns subagents in parallel
- [[self-harness]] — The complementary in-place pattern: a single harness that improves itself iteratively via bounded, regression-tested edits
- [[executable-memory]] — The code-for-environment-modeling extension applied to the user model: a living software project that the agent and interpreter both read and write
- [[bojie-li]] — Author of User as Code, the implementation of executable memory

## Sources

- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). *Code as Agent Harness: Toward Executable, Verifiable, and Stateful Agent Systems.* The full survey defining the framework, taxonomy, and open problems across 102 pages.
- `raw/yt-llms-are-killing-agent-harness.md` — Thorsten Ball: AMP as a live case study of the harness at the extreme thin end; the harness falls away as models improve; AMP deleted features as models got better
- `raw/recursive-agent-harnesses.txt` — Lumer et al. (PwC, 2026). Operationalizes the code-as-harness framework for multi-agent orchestration: the parent agent writes executable code that instantiates subagent harnesses in parallel. Empirically demonstrates that code-driven spawning is a primary performance lever: 71.75% → 81.36% on Oolong-Synthetic with backbone held fixed.
- `raw/2606.16707v1.txt` — Bojie Li (Pine AI, 2026). *User as Code: Executable Memory for Personalized Agents.* Operationalizes the code-as-harness framework for the user model. The two-phase pipeline (append-only memorize + periodic structure) is a harness mechanism; the typed Python state is the harness interface (code for environment modeling); the constraint pipeline is harness control (deterministic verification). The LLM writes its own schemas, domain partitioning, and constraints. 78.8% on LOCOMO (within 1.0pp of full-context upper bound), 99% on Analytical Inference (vs 6–43% for retrieval baselines), 100% on Active Service.

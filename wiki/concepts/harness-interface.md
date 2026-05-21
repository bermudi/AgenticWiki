---
title: Harness Interface
created: 2026-05-21
updated: 2026-05-21
sources:
  - raw/2605.18747.pdf
tags: [concept, agent-harness, code-for-reasoning, code-for-acting, environment-modeling]
unaudited_marginal: 0
---

# Harness Interface

> The harness interface is where code connects agents to reasoning, action, and environment modeling. Code externalizes internal inference into verifiable computation (code for reasoning), translates high-level intent into executable operations (code for acting), and represents world state, transition dynamics, and feedback signals through program states, repositories, simulators, tests, and logs (code for environment modeling).

## Overview

A harness turns a stateless language model into a functional agent by grounding its outputs in external execution, persistent state, and verifiable feedback. The harness interface is the fundamental design question: what medium connects the model to its task environment?

The answer, from the [[code-as-agent-harness]] framework: **code**. Unlike natural language, code is:
- **Executable** — model outputs become operations with formally verifiable outcomes
- **Inspectable** — intermediate computation is exposed as structured traces
- **Stateful** — evolving programs represent task progress across steps

## Code for Reasoning (§2.1)

Code for reasoning externalizes internal logic into verifiable computation, moving beyond purely text-based reasoning (like chain-of-thought). The model generates executable programs that external runtimes, interpreters, symbolic solvers, or verification modules can execute and evaluate. This separates high-level reasoning from low-level computation: the model proposes procedures, the harness executes them.

Three paradigms:

### Program-Delegated Reasoning
Uses executable programs as the primary interface between problem decomposition and computation. Instead of relying solely on natural language, the model generates code that external interpreters execute. Pioneered by Program-of-Thoughts (PoT) prompting, extended by PAL, Chain of Code, MathCoder, CodeI/O, and CodeAdapt. Recent work (CodeI/O) transforms contextually grounded programs into code input-output prediction tasks, exposing reasoning primitives like logic-flow planning, state-space search, decision-tree traversal, and modular decomposition.

### Formal Verification and Symbolic Reasoning
Hybrid neural-symbolic methods that use code and symbolic artifacts as persistent intermediate representations. Graph-of-Thoughts generalizes chain-of-thought into graph-structured trajectories. Self-verifying reflection, MA-LoT, and Socratic self-refine introduce iterative verification loops with symbolic consistency checks. CodeSteer and Code-as-Symbolic-Planner explicitly coordinate free-form language reasoning with executable symbolic operations. VisualCoder makes program behavior visible through control-flow representations.

### Iterative Code-Grounded Reasoning
Extends program-delegated reasoning by treating execution artifacts — outputs, traces, variable states, control-flow, tests — as feedback signals for repeated refinement. Process reward models (CodePRM, FunPRM, ExecVerify) score individual reasoning steps using execution traces, bridging the gap between final outcome checks and fine-grained capability evaluation.

## Code for Acting (§2.2)

Code for acting translates high-level intent into executable operations grounded in embodied, GUI, software, or tool-use environments. The harness converts model-generated code into actions.

Three paradigms:

### Grounded Skill Selection
The agent retrieves relevant code-based skills from a skill library and executes them in the environment. Voyager (Minecraft) introduced discoverable, verifiable, and continually growing skill libraries — the first lifelong learning agent that uses code as its action interface. RoboCodeX generalizes this by retrieving generalized skill documents for robot task planning. ViReSkill and SkillVLA learn universally applicable skill representations grounded in visual observations and code actions.

### Programmatic Policy Generation
Instead of retrieving existing skills, the agent generates task-specific programs as executable action policies. Code-as-Policies (CaP, 2023) demonstrated that LLM-generated Python functions can serve as robot policies with hierarchical composition. Code-BT [34] generates executable behavior trees for long-horizon tasks. Code-as-Policies and related work treat the generated program itself as the action interface, with the harness providing execution feedback for repair.

### Lifelong Code-Based Agents
Agents that not only generate programs but evolve them over time through environment interaction. Voyager's three-component architecture — automatic curriculum, skill library, iterative prompting mechanism — demonstrates that code serves simultaneously as action, memory, and adaptation mechanism. UI-Voyager extends this to GUI domains, learning from failed experiences to build a growing skill library. LYRA encodes human corrections into reusable structured skills, enabling lifelong learning from feedback.

## Code for Environment Modeling (§2.3)

Code for environment modeling represents world state, transition dynamics, and feedback signals through program states, repositories, simulators, tests, and logs that agents can execute, edit, and query.

Four paradigms:

### Structured World Representations
Code as a representation of the environment's static and dynamic state. FactoredScenes decomposes complex visual scenes into code-like structured representations. ViStruct defines visual structures as programs with typed attributes and relations. Code2World generates executable world models from natural language descriptions.

### Execution-Trace World Modeling
The environment is represented through execution histories, logs, state snapshots, and trajectory data. Continuous World Modeling (CWM) observes environment sequences and predicts future states in programmatic form. Endless Terminals maintains long-running terminal environments where agents persist state across sessions. Runtime World Model Learning (RWML) learns environment dynamics from agent execution traces.

### Code-Grounded Evaluation Environments
Code provides the evaluation signal itself. CRUXEval evaluates code understanding through execution prediction. SWE-Bench and AgentBench use repository code, test suites, and execution feedback as the evaluation environment. These benchmarks treat code execution as the ground-truth evaluation mechanism, making the evaluation environment part of the harness.

### Verifiable Environment Construction
The harness constructs environments where state changes are verifiable through execution. SemCoder trains code LLMs with execution rewards at the code generation stage. Code-as-policies in robotics constructs environments where generated programs are verifiable against simulator state. The guiding principle: if an action can be represented as code, its effect can be verified through execution.

## Relationship to Platform Concepts

The harness interface connects to existing wiki concepts:

- [[multi-tier-action-space]] — The tool calling layer (Tier 1) handles code for acting; the computer tier (Tier 2) enables code for environment modeling via scripts and file operations
- [[agent-skills]] — Grounded skill selection is how skills get retrieved and executed within the harness
- [[verification-loop]] — Code-grounded evaluation environments provide the verification signal the loop depends on
- [[tool-design-for-agents]] — The acting interface is where tool design directly affects agent effectiveness: tools are the action interface

## Thread

- [[code-as-agent-harness]] — The harness interface is the foundational layer of the code-as-harness framework
- [[the-verifiability-thesis]] — The executable, inspectable properties of code directly instantiate verifiability
- [[tool-design-for-agents]] — Code for acting is where tool design theory meets practice
- [[the-agent-workflow]] — The reasoning–acting–environment interface defines what happens in each workflow phase

## Related

- [[harness-mechanisms]] — How the interface is sustained over long-horizon execution
- [[harness-engineering]] — Open problems in evaluation, verification, and safety
- [[agent-friendly-tooling]] — Tool design that supports code-based acting
- [[backpressure]] — Mechanical rejection of wrong actions in the acting interface
- [[agent-skills]] — Skill libraries as code-based action interfaces
- [[ralph-loop]] — A minimal harness instantiation using code for acting and verification

## Sources

- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). *Code as Agent Harness.* §2: Harness Interface — Code for Reasoning, Acting, and Environment Modeling (pages 7–16).

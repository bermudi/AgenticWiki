---
title: Harness Engineering
created: 2026-05-21
updated: 2026-06-01
sources:
  - raw/2605.18747.pdf
tags: [concept, agent-harness, evaluation, verification, safety, open-problems]
unaudited_marginal: 0
---

# Harness Engineering

> The emerging science of designing and evolving reliable agent harnesses. Code-as-harness systems shift the central challenge from isolated model generation to the reliability of the complete execution loop — and harness engineering is the discipline that addresses this shift. It covers evaluation beyond SWE-bench, semantic verification, self-evolving harnesses, multi-agent state coordination, human-in-the-loop safety, multimodal extensions, and the broader science of building executable, inspectable, stateful, and governed agent systems.

## Open Problems

The [[code-as-agent-harness]] survey identifies seven open problems for harness engineering:

### 1. Harness-Level Evaluation and Oracle Adequacy (§5.2.1)

Once an LLM is embedded in a code-agent harness, performance is determined by the base model *and* the surrounding runtime. But most existing evaluations measure only end-task success — conflating the capabilities of the model, quality of the harness, reliability of tools, informativeness of feedback, and difficulty of the environment.

The open problem: define harness-level metrics that evaluate the operational substrate itself. Proposed dimensions:
- **Trajectory efficiency**: number of tool calls, tokens, edits, executions, wall-clock time
- **Verification strength**: test coverage, oracle diversity, rate of false acceptance
- **Recovery ability**: can the agent diagnose and repair after invalid actions?
- **State consistency**: are memory, repository state, execution traces, and agent beliefs synchronized?
- **Safety compliance**: are permissions, sandboxes, and human-approval gates respected?
- **Replayability**: can the full trajectory be reconstructed and audited from logs and artifacts?

**Oracle adequacy** is the central bottleneck: does the evaluator capture the intended task rather than only a narrow executable proxy? An agent may pass visible tests while exploiting weak test suites, or succeed in a simulator while producing scientifically invalid results. The challenge is not to build harder benchmarks, but to evaluate the code-agent harness as an executable runtime system.

### 2. Semantic Verification Beyond Executable Feedback (§5.2.2)

Execution feedback creates a false sense of correctness. Unit tests may be incomplete, static analyzers may over-approximate, GUI checkers may miss unacceptable intermediate actions, scientific scripts may encode invalid assumptions. The harness can become overconfident precisely because it *has* executable feedback — the green test is not the full specification.

The missing abstraction: a **verification stack with explicit scope**. Each verification artifact should declare what it verifies, what it cannot verify, and what confidence it provides. Future systems should compose: unit tests, integration tests, property-based tests, fuzzers, static analyzers, type checkers, security scanners, runtime monitors, coverage reports, formal specifications, model-based critiques, and human review. Each accepted action should carry an **evidence bundle** containing the checks run, assumptions preserved, untested regions, and remaining risks.

Reliable feedback should be routed differently depending on type: compiler errors → local syntax repair, test failures → behavioral diagnosis, coverage gaps → test generation. The broader goal: feedback loops that are **epistemically aware** — the harness knows when a signal is strong enough to act on, when it's weak, and when additional evidence is required.

### 3. Self-Evolving Harnesses without Regression (§5.2.3)

Most current harnesses are manually designed. But as tasks become longer and more diverse, fixed harnesses are suboptimal — a harness that works for competitive programming may fail for repository repair; one tuned for GUI navigation may be inefficient for scientific workflows.

Automatic harness evolution is underway (AutoHarness, MetaHarness, Agentic Harness Engineering), but the hard problem is: **can a harness improve itself without overfitting, weakening safety, increasing cost, hiding failures, or regressing on rare tasks?**

The solution the survey proposes: treat every harness mutation like a code change to a safety-critical runtime. Each edit carries a **change contract** — which component is modified, which failure mode it targets, what improvement it predicts, which invariants it must preserve, what evaluation can falsify it, and how it can be rolled back. Practically, this requires: evidence-carrying harness evolution, held-out regression suites, safety invariants, canary deployment, rollback semantics, and causal evidence for why a harness edit helped.

> [!warning] The Self-Improvement Ceiling
> This problem connects directly to the [[the-verifiability-thesis|verifiability thesis]]: if a harness improves itself using its own verification signals, and those signals are incomplete (oracle inadequacy), the harness will optimize against the wrong metric. Self-evolution requires trustworthy verification first — a bootstrapping problem.

### 4. Transactional Shared Program State (§5.2.4)

This open problem is the direct consequence of scaling to multi-agent systems (see [[multi-agent-code-orchestration]]).

Scaling to multi-agent systems turns the codebase into a shared harness substrate. Planners, coders, testers, reviewers, and humans may all read and modify overlapping artifacts. Current systems rely on sequential handoff, shared logs, or file-only state — but synchronization alone doesn't provide **transactional semantics** or assumption-level consistency.

The missing abstraction: each action should declare its read set, write set, assumptions, version dependencies, verifier obligations, and conflict policy. Conflicts should be detected not only at the file-diff level, but at the level of plans, tests, retrieved evidence, permissions, memory entries, and latent user requirements.

Future harnesses need **semantic conflict resolution** — including semantic merge, rollback, dependency-aware locking, belief-state reconciliation, conflict explanation, and re-verification after merge. Classical version control, databases, CRDTs, and build systems provide useful analogies, but agentic systems add conflicts conventional tools don't see: incompatible plans, stale memories, duplicated subtasks, inconsistent tool authority, and divergent interpretations of the user's goal.

### 5. Human-in-the-Loop Safety as Harness State (§5.2.5)

Safety cannot be delegated to the base model or encoded only as natural-language instructions. In critical domains — deployment, cybersecurity, finance, healthcare, embodied control — the harness needs to function as a **safety governor** between model intent and real-world consequence.

The survey proposes a multi-tier permission model:
- **Lowest tier**: read files, inspect logs, run static analysis
- **Higher tiers**: edit files, execute sandboxed code, access network, call external APIs, modify shared repositories, affect production systems
- Each tier specifies allowed actions, constraints, audit logs, rollback mechanisms, and HITL gates

Safety feedback should become **durable harness state** — each approval, rejection, policy exception, or reviewer correction updates the harness's permission rules, escalation policy, verification criteria, and future memory retrieval. High-stakes approvals are auditable state transitions: what action was proposed, what evidence was shown, what risks were surfaced, who approved or rejected it, and what responsibility boundary changed afterward.

### 6. Multimodal Code-Harness Systems (§5.2.6)

Most code-agent harnesses are designed around textual state, but many agentic systems operate in multimodal environments: GUI agents (screenshots, accessibility trees), embodied agents (egocentric images, depth, force signals), scientific agents (plots, microscope images, molecular structures).

Key challenges:
- **Multimodal context compression**: visual observations are large and redundant. Future harnesses need multi-level memory design — raw images as immutable evidence, structured annotations as intermediate state, compact summaries for skill retrieval
- **Visual grounding contracts**: each action should carry a grounded reference to the evidence it depends on (bounding box, object identifier, frame index)
- **Multimodal feedback calibration**: visual and physical feedback is often implicit, delayed, or ambiguous. Harnesses need verification stacks that combine visual state checks, object tracking, OCR, simulator state, and physical sensors

### 7. Toward a Science of Harness Engineering (§5.2.7)

The survey argues that code-as-harness research is moving toward a broader science of harness engineering. The central object of study is no longer only the model or the generated program, but the **complete closed-loop system**: context, memory, tools, execution, feedback, safety, coordination, and evaluation.

Progress requires:
- Benchmarks that expose long-horizon failures
- Telemetry that makes trajectories auditable
- Metrics that isolate harness components from model capabilities
- Design principles for safe operation in persistent program worlds

## The Four Properties of Future Harness Systems

The survey concludes with four properties that define the next frontier for reliable, long-horizon agentic AI:

| Property | Meaning |
|---|---|
| **Executable** | Grounding decisions in code, tools, tests, and environments |
| **Inspectable** | Exposing plans, state, provenance, and failure causes |
| **Stateful** | Preserving task-relevant information across long trajectories and multiple agents |
| **Governed** | Constraining autonomy by permissions, verification, and accountability |

## Relationship to Platform Concepts

- [[agent-quality-engineering]] — The quality infrastructure (evals, observability, flywheel) is a subset of harness engineering; harness-level evaluation addresses the "what to measure" gap in current quality frameworks
- [[the-verifiability-thesis]] — Semantic verification beyond executable feedback is the verifiability thesis applied to the verification mechanism itself
- [[verification-loop]] — The verification loop is harness control; semantic verification (§5.2.2) extends it with scope-aware verification stacks
- [[backpressure]] — Sandboxed execution and multi-tier permissions (§5.2.5) are backpressure applied at the harness governance level
- [[evolving-context]] — Self-evolving harnesses (§5.2.3) are the next frontier of evolving context — the agent improving the harness, not just its own prompts

## Thread

- [[the-human-lever]] — HITL as permission governance: multi-tier risk classification reframes the human's safety role within the harness
- [[code-as-agent-harness]] — Harness engineering is the future direction of the code-as-harness framework
- [[agent-quality-engineering]] — Harness-level evaluation extends quality engineering beyond end-task metrics
- [[the-verifiability-thesis]] — Semantic verification and oracle adequacy qualify the verifiability thesis's assumptions
- [[the-agent-workflow]] — The four properties (executable, inspectable, stateful, governed) are the design principles for the workflow's infrastructure
- [[failure-modes]] — The playbook mapping harness-level and model-level failure modes to detection signals and countermeasures

## Related

- [[harness-interface]] — The interface layer where verification and grounding operate
- [[harness-mechanisms]] — The mechanisms that self-evolving harnesses optimize
- [[verification-loop]] — Extends verification loop with scope-aware verification stacks
- [[agent-evals]] — Connect harness-level evaluation to existing eval frameworks
- [[backpressure]] — Multi-tier permissions as governance backpressure
- [[agent-observability]] — Telemetry as the optimization substrate for harness evolution
- [[delegate-52]] — Long-horizon benchmarks that expose harness-level failures

## Sources

- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). *Code as Agent Harness.* §5: Emerging Fields and Open Problems (pages 49–66).

---
title: Local-First Agent
created: 2026-08-25
updated: 2026-08-25
sources:
  - raw/perplexity-local-first-agent.md
unaudited_marginal: 0
tags: [concept, agent-harness, local-models, privacy, sandboxing, context-engineering, skills, advisor-escalation]
---

# Local-First Agent

> A pattern where the model, harness, conversation, and trajectory all run on the user's device by default, with web search, connectors, and frontier-model escalation invoked only when necessary and always gated by the user. Perplexity's Portable Computer is the clearest published instantiation: a harness and model co-designed for on-device constraints, achieving near-zero inference cost with private data staying on device — and, with advisor escalation, recovering about three-fifths of the gap to a frontier model (73.0% vs 82.4% on Terminal Bench 2.1) at about two-thirds the cost.

## The Problem It Solves

Two costs grow together as agents scale: token spend and data movement. When every request goes to a closed model on a remote cluster, private tokens and intellectual property leave the device, and spend becomes hard to govern across individual workflows and organizations. At the same time, small open models (Nemotron 3.5 Lightning 30B, Qwen 3.6 35B, Qwen 3.8 27B) have improved faster than frontier models, and local hardware such as NVIDIA DGX Spark can now run them. The local-first thesis: handle the common case on-device and opt into the cloud only when the task demands it, giving the user explicit control over what leaves the machine.

Perplexity frames this as a hybrid local-server inference orchestrator, first introduced in June 2026, that decides what runs locally and what goes to cloud agents.

## The Co-Design Principle

General-purpose harnesses assume a frontier model that tolerates long contexts, a broad tool surface, and long planning horizons. Small local models are less reliable under those demands. Perplexity's response is to shape harness and model around each other: a harness tailored to the model's capability profile, and a model post-trained to use that harness effectively. This is the same [[harness-model-co-evolution]] intuition — the harness cannot supply reasoning the model lacks, and training the model under a fixed harness leaves new capabilities unexercised — but instantiated as a deliberate product decision rather than an automated co-evolution loop.

## Harness Design for Small Models

The Perplexity harness makes five linked choices to keep a 27B-class model inside its effective window:

### 1. Succinct core, on-demand skills

Qwen 3.8 27B advertises a 260K-token window but empirically struggles beyond ~100K. Perplexity therefore keeps the core harness minimal — a short system prompt and a small set of core tools — and modularizes everything else into skills (research, data science, visualization, document creation, software engineering) that load and unload during the trajectory. This is [[context-engineering]] applied to the instruction budget: every tool definition competes for the same finite attention, so skills are the progressive-disclosure mechanism.

### 2. Context compaction

When a trajectory grows long, the harness summarizes stale context so the model stays within its effective window. The technique is standard, but the trigger matters: without it, the small model degrades well before the nominal window limit.

### 3. Compact CLI tools instead of MCP servers

Connectors (Gmail, GitHub, Outlook, Calendar) are conventionally exposed as MCP servers whose large tool definitions consume a substantial share of context. Perplexity converts the most-used MCPs into compact CLI tools supplemented with custom skills. The argument echoes the CLI-over-MCP case in [[tool-design-for-agents]] — Kun Chen's benchmark found 3× tokens and 2× latency for MCP vs CLI — but the local-first version is stronger: on a 100K effective window, MCP overhead is not just expensive, it crowds out reasoning.

### 4. Verification by default

The agent verifies its own work, either self-triggered or via hooks that monitor trajectory health and request self-verification when something goes wrong. Verification adds steps but substantially narrows the gap to frontier models.

### 5. OS-level sandbox, always on

Tools execute in an OS-level sandbox that restricts processes, filesystem paths, and network access per policy. If the sandbox is unavailable, the harness disables itself rather than degrading to unsandboxed execution. Isolation is always on, requires no configuration, and tools cannot run without it. This contrasts with Pi and Hermes, which run with the user's permissions by default, and with [[yolo-mode-philosophy]] — Pi's deliberate choice to push security to the container boundary rather than a prompt gate. The local-first position is the opposite default: fail closed at the harness layer, not open.

## The Execution Loop

The orchestrator is deterministic harness code, not an LLM. It maintains the loop, assembles context, and enforces policy. The local model proposes the next action; the orchestrator executes approved tool calls in the sandbox and returns results. Web search, connectors, and advisor calls cross the device boundary only when enabled and approved. This separation — deterministic control, model-proposed actions — is the same boundary discipline [[agent-quality-engineering]] and [[harnessx]] advocate, but with the added invariant that the boundary is also a privacy boundary.

Two capabilities illustrate the split:

- **Web research with Search as Code.** Model inference and private-document processing stay local; local files are the authoritative source, public sources add context, and the user can disable web search entirely for fully offline work. Perplexity's own search engine is accessed via a Search as Code interface.
- **Multimodal document understanding.** Pages and images are passed directly to the model, which combines visual evidence with extracted text. On-device processing keeps sensitive documents and their extracted content private — the privacy benefit is most concrete here, where documents are often the sensitive artifact.

## Advisor Escalation: Local Control, Remote Guidance

Even with a tuned harness, the hardest tasks exceed a compact model. The harness exposes an *advisor tool*: the local model can consult a stronger frontier model for planning, ambiguity resolution, failure recovery, or final verification.

Key design choices:

- **Local model decides when to ask; orchestrator retains tool authority and controls what context is sent.** Escalation is optional and user-gated (manual or automatic approval per call).
- **PII classifier and user preview.** Before a call, the harness selects relevant context, flags sensitive information, and shows the user what would leave the device.
- **Advisor returns text guidance only** — no direct access to files, tools, or the response channel. The local model may use the guidance; the harness still executes.

This is a concrete implementation of [[intelligence-tier-routing]]: local for the common case, frontier for the hard slice, with the routing decision owned by the local model and the gating owned by the user. Perplexity positions it as the cost/privacy trade-off made explicit — the user decides when the gap to frontier is worth the API cost.

## Post-Training for the Harness (PPLX 27B)

With the harness fixed, the remaining gains come from adapting the model to it. Perplexity synthesizes a training distribution from real Computer usage: diverse use cases exercising different capabilities, tools, and connectors are turned into realistic RL environments (Docker containers where the harness operates) with verifiable tasks — each task is an instruction, an environment, and a verifier. Tasks are synthetic and contain no real user documents.

Training is two-stage:

1. **Rejection fine-tuning** — roll out the model multiple times per task, keep the best trajectories by verifier score, train with supervised learning. This initializes the model for the specific harness and task distribution.
2. **Reinforcement learning** — further fine-tuning for robustness.

A held-out subset becomes the **Local Knowledge Work Bench**: 53 tasks across seven categories (deep research 37.7%, data/finance/procurement 17%, documents/presentations/design 13.2%, engineering/IT/incidents 9.4%, contracts/evidence/compliance 9.4%, dashboards/software/visualization 7.5%, people/projects/meetings 5.7%). Perplexity plans to publish a technical report and open-source the benchmark.

The resulting model, PPLX 27B (Qwen 3.8 27B post-trained), is the empirical anchor for the co-design claim.

## Empirical Results (same model, different harnesses)

All harness-isolation comparisons use Qwen 3.8 27B with medium reasoning on NVIDIA DGX Spark, so differences are attributable to the harness before post-training.

### BrowseComp (1,266 web-research tasks)

Computer 66.7% accuracy vs Pi 50.2% vs Hermes 43.9%. Computer also fastest and most token-efficient: 402s / 852K tokens vs Hermes 1,021s / 1.01M and Pi 826s / 2.82M — 51–61% less wall time and 16–70% fewer tokens. Note: search providers differ (Perplexity Search vs Brave), so the harness and the search backend are confounded on this benchmark.

### ParseBench-100 (multimodal documents, 100 tasks)

Computer 65.1% mean score vs Hermes 34.6% vs Pi 13.9%, at 60.6s / 20.1K tokens vs 108.3s / 32.1K and 410.5s / 829.1K. Leads in all five categories; largest advantage on charts (76.5% vs 29.3% vs 2.5%); layout remains hard for all harnesses (16.2% vs 2.9% vs 0.1%).

### Terminal Bench 2.1 (89 coding tasks, advisor escalation)

- Qwen 3.8 27B fully local in Computer: 59.6% at ~$0 cost
- Qwen 3.8 27B + Claude Opus 5 advisor in Computer: 73.0% at $0.415/rollout
- Claude Opus 5 alone in Computer: 82.4% at $0.65/rollout

Escalation recovers roughly three-fifths of the gap to frontier at about two-thirds the cost. Pi and Hermes were not evaluated with an advisor because neither ships an equivalent tool — adding one would no longer be the off-the-shelf harness.

### Local Knowledge Work Bench (53 held-out tasks)

Base Qwen 3.8 27B: Computer 82.6% (520K tokens, 218s) vs Pi 77.6% (681K, 176s) vs Hermes 74.0% (634K, 292s). PPLX 27B lifts Computer to 85.4% at 678K tokens / ~250s — higher score, but more tokens. Pi remains fastest on this bench; Computer is most token-efficient with the base model.

> [!note] Benchmark scope and limits
> Results are reported by Perplexity on a mix of public and internal benchmarks. The Local Knowledge Work Bench is internal, not yet open-sourced at publication time; its 53 tasks are the held-out split from the synthetic training distribution. BrowseComp confounds harness and search provider. All evaluations run on NVIDIA DGX Spark — hardware not representative of consumer devices. Advisor escalation was not tested on Pi/Hermes, so the cost/performance trade-off is not shown to be harness-independent.

## Thread

- [[tool-design-for-agents]] — Sandbox always-on, CLI-over-MCP, skill modularization, and context compaction as tool-design responses to a 100K effective window
- [[harness-engineering]] — Co-designed harness and model as an answer to the self-evolving harness (§5.2.3) and HITL safety (§5.2.5) open problems; sandbox and PII preview as governance state
- [[the-agent-workflow]] — Local-first as the workflow's cost and privacy lever: private tokens stay local, inference is near-zero cost until the user opts into the cloud
- [[the-human-lever]] — User-gated boundary crossing and advisor-call preview as the human's design-boundary role

## Related

- [[perplexity-computer]] — The product that instantiates this pattern
- [[harness-model-co-evolution]] — The training regime PPLX 27B parallels: two-stage RFT + RL inside a fixed harness over synthetic Docker environments
- [[intelligence-tier-routing]] — Advisor escalation as implemented tier routing — local for the common case, frontier advisor for the hard slice
- [[agent-skills]] — On-demand skills as the progressive-disclosure mechanism that keeps the core harness succinct
- [[context-engineering]] — Effective-window vs nominal-window and context compaction as the motivating constraint
- [[pi]] — General-purpose harness baseline (77.6% on LKWB with Qwen 3.8 27B; no sandbox by default; YOLO-mode contrast)
- [[harnessx]] — Typed composition + AEGIS as the automated version of the co-design loop Perplexity does manually
- [[yolo-mode-philosophy]] — The security-default contrast: always-on sandbox vs YOLO-mode's push to container boundary
- [[the-verifiability-thesis]] — Verification hooks and synthetic verifiers as the quality lever that narrows the frontier gap

## Sources

- `raw/perplexity-local-first-agent.md` — All claims, architecture details, and benchmark numbers on this page. BrowseComp, ParseBench-100, Terminal Bench 2.1, and Local Knowledge Work Bench results; harness design principles (succinct core, on-demand skills, compaction, CLI-over-MCP, verification, sandbox); orchestrator/deterministic loop; advisor escalation design and cost/performance; PPLX 27B two-stage training and task/environment construction.

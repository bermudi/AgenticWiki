---
title: Instruction Hierarchy
created: 2026-05-08
updated: 2026-05-08
sources:
  - raw/many-tier-instruction-hierarchy.md
  - raw/yt-agent-trust-vector-study-2026.md
tags: [concept, agents, instruction-following, trust, safety, benchmarks]
---

# Instruction Hierarchy

> The mechanism by which LLM agents resolve conflicts among instructions from heterogeneous sources — system messages, user prompts, tool outputs, and other agents — each carrying different trust levels. The dominant paradigm supports only 2–5 fixed tiers; Many-Tier Instruction Hierarchy (ManyIH) extends this to arbitrarily many levels dynamically assigned at inference, but current frontier models achieve only ~40% accuracy on 12-tier conflicts.

## The Problem

LLM agents receive instructions from many sources: system messages, user prompts, tool outputs, skill files, memory files, and other agents in multi-agent systems. When these conflict — a tool output says use tabs, a skill file says use spaces — the agent must know which to trust. Getting this wrong means executing lower-trust instructions at the expense of higher-trust ones, with consequences ranging from incorrect code style to safety failures.

## Original Instruction Hierarchy

Wallace et al. (2024) formalized Instruction Hierarchy (IH): a priority ordering over instructions based on message roles. Higher-privilege instructions override lower ones. The IH provides a principled defense against jailbreak attacks (user overriding safety instructions) and prompt injection (tool output overriding user instructions) — both of which exploit instruction conflicts.

OpenAI's Model Spec hardcodes five authority levels: root > system > developer > user > guideline, encoded through special role tokens in chat templates. Current frontier models report >99% accuracy on two-tier IH evaluations.

## The Fixed-Tier Bottleneck

The original IH has a critical limitation: privilege is tied to message roles, of which there are only a few (<5). All instructions sharing the same message type are treated as having equal privilege. But in real agentic systems:

- A coding agent receives guidelines from system prompts, skill invocations, memory files, and tool schemas — all with different trust levels, yet all may share the same message role
- In group chats, participants hold heterogeneous privileges (admins, moderators, members) — all under the same "user" role
- Retrieved evidence comes from sources with known but varying trust levels
- A verified internal SQL database should absolutely outrank a random web scrape — but to the API, both are just "tool" outputs

This is the **fixed- and few-tier bottleneck**: the role system cannot express the actual trust structure of agentic deployments. Models are trained on a fixed, small set of privilege tiers and it is unclear whether they can generalize to arbitrarily many.

## Many-Tier Instruction Hierarchy (ManyIH)

Zhang et al. (2026) propose ManyIH, which decouples privilege from message roles via a **Privilege Prompt Interface (PPI)** — trust tags injected inline, analogous to inline CSS for text:

- **Ordinal format**: `[[Privilege 1]]Use 4-space indentation[[/Privilege]]` — lower number wins
- **Scalar format**: `[[z=95]]Use 4-space indentation[[/z]]` — higher number wins

A meta-instruction explains the resolution rule to the model. Privilege values are predetermined collaboratively by the model developer and deployer based on source trustworthiness. The PPI enables:

- **Arbitrarily many tiers**: Not limited by the count of message roles
- **Fine granularity**: Different instructions within a single message can carry different privilege levels
- **Inference-time flexibility**: Privilege values are specified at inference, not baked in during training
- **Insertable levels**: In the scalar format, a new privilege level can be inserted between any two existing ones

> [!note] Privilege is about source, not content
> The paper assumes privilege is a property of the source (where the text came from), not the content (what the text says). A Python middleware tags output strings with privilege tags based on which agent or tool produced them — the LLM never decides who gets what score.

## MANYIH-BENCH

The benchmark comprises 853 agentic tasks with up to 12 distinct privilege levels per sample:

| Subset | Samples | Design | Evaluation |
|--------|---------|--------|------------|
| Coding | 427 | MBPP problems + conflicting style instructions (indentation, quotes, naming, type hints). 12 instructions across 4 style groups, avg 9.8 conflicts | All unit tests pass + all winning style constraints satisfied |
| Instruction-Following | 426 | 46 real-world agent scenarios from AgentIF, augmented with privilege-annotated conflicting constraints. Avg 12.8 active + 6.6 suppressed constraints | All active constraints satisfied, all suppressed constraints correctly ignored |

Evaluation is strict all-or-nothing: partially adhering to non-conflicting instructions while ignoring privilege-based resolution is not rewarded.

## Results: Frontier Models Fail

| Model | Overall | Coding | Non-Coding IF |
|---|---|---|---|
| Gemini 3.1 Pro | **42.7%** | 59.0% | 26.0% |
| GPT 5.4 | 39.5% | 60.9% | 17.8% |
| Claude Opus 4.6 | — | 51.3% | 15.0% |
| Grok 4.20 Beta | — | 54.1% | — |
| Kimi K2.5 | — | 42.4% | — |
| Qwen 3.5-397B | 34.1% | 41.0% | — |
| Qwen 3.5-9B | — | 8.4% | — |
| Qwen 3.5-4B | — | 3.5% | — |

GPT 5.4 reports >99% on standard two-tier IH evaluations yet achieves only 39.5% on MANYIH-BENCH. This gap demonstrates that many-tier conflict resolution is a **qualitatively distinct capability** from the fixed-tier IH models are trained on. Since human validation confirms at least ~80% ceiling is attainable, adhering to ManyIH remains an unsolved challenge.

### Functional correctness is not the bottleneck

On the coding subset, frontier models maintain high functional correctness (>86% test pass rate). The bottleneck is **style compliance** — correctly applying the highest-privilege instruction in each conflict group. The models can write working code; they cannot reliably resolve which style rule wins.

## Why Models Fail

### Combinatorial Collapse

As the number of privilege tiers increases from 6 to 12, accuracy declines monotonically across all models. Out of 12 model–transition pairs, 11 show a strict decrease, with drops ranging from 6.8% (Qwen 3.5-9B) to 24.1% (Sonnet 4.6). Models are trained on binary system-vs-user conflicts; the benchmark throws up to 12 tiers of conflicting rules at them, and they lose track of the mathematical hierarchy. They revert to trying to please all instructions at once — creating perfect chaos.

### Semantic Arithmetic: LLMs Don't Do Math

LLMs process privilege numbers as **semantic tokens**, not mathematical values. The notation "2 < 5" is pattern-matched, not computed. Evidence:

- **Representation switch**: Switching from ordinal (lower wins) to scalar (higher wins) — logically identical — drops GPT 5.4 by 8.4% and Opus 4.6 by 8.0%. The same logical ordering, different notation, breaks the models.
- **Value perturbation**: Changing scalar z-values by ±1–3 while preserving the exact same winning order flips answers on up to 17% of tasks (GPT 5.4: 16.4% overall flip rate, 16.9% style flip rate). The model's decisions depend on the specific numerical values, not just their relative ordering — which is mathematically irrelevant.

As the paper puts it: when the benchmark throws conflicting integer values at them in the same prompt, "the semantic vectors blur."

### Reasoning Effort Paradox

For Claude models (Sonnet 4.6, Opus 4.6), **non-reasoning outperformed low reasoning**:

| Model | None | Low | Medium | High |
|---|---|---|---|---|
| GPT 5.4 | 15.5% | — | — | 60.9% |
| Opus 4.6 | 27.9% | 18.7% | — | 51.3% |
| Sonnet 4.6 | 25.3% | 14.1% | — | 39.1% |

GPT 5.4 improves monotonically with reasoning effort. Claude models dip at "low" then recover. The explanation: with thinking fully disabled, Claude compensates by writing out its conflict resolution logic explicitly in the visible output window. At "low" effort, reasoning shifts to hidden tokens without enough budget to complete the computation — a net loss. The authors describe this as a "thinking-out-loud effect."

### CoT Length Doesn't Help

GPT 5.4 produces the most concise reasoning (~1K tokens median) yet ranks #1 on coding accuracy. Qwen 3.5-397B generates ~7K tokens median — mostly self-correction loops that add thousands of tokens without changing answers — and ranks seventh. More thinking tokens does not mean better conflict resolution.

## Implications for Agent Design

1. **Multi-agent systems hit the combinatorial collapse threshold fast.** Even 4 agents with 3-step reasoning chains each approach the 12-tier problem that breaks all models. If your agent swarm generates conflicting outputs, the model will likely fail to resolve them correctly.

2. **Static source-based trust is better than nothing but has known failure modes.** The paper's approach (pre-assign privilege tags via middleware) works as well as the model's ManyIH capability allows — which is ~40% at best. It handles the common case but fails silently on nontrivial conflicts.

3. **Representation matters more than it should.** Whether you use ordinals or scalars, and what specific values you pick, can flip outcomes on a significant fraction of tasks. This is a brittle foundation for production systems.

4. **Reasoning effort configuration is model-dependent.** GPT improves monotonically; Claude has a dead zone at "low." There's no universal "more reasoning = better" rule — you need to benchmark your specific model on your specific tier count.

5. **Until models natively handle ManyIH, keep conflict tiers minimal in practice.** The paper finds models are trained on ≤5 fixed role-based tiers and performance degrades consistently beyond that. A practical defensive implication: decompose agent swarms so any single trust-resolution decision involves as few privilege tiers as feasible. The paper's tier-scaling experiment shows that going from 6 tiers (no conflicts) to 12 tiers (up to 11 conflicts) drops accuracy from ~60% to as low as ~15–25% on coding tasks depending on model.

## Thread
- [[agent-quality-engineering]] — Instruction hierarchy is an underexamined quality dimension: can the agent correctly resolve conflicts among heterogeneous trusted sources?
- [[the-agent-workflow]] — Multi-agent workflows inherently create instruction conflicts; the hierarchy determines whose output wins
- [[the-human-lever]] — ManyIH reveals that the human lever's trust delegation is bounded by model architectural limits: the human can design the perfect hierarchy, but the model fails to follow it 60% of the time beyond 2-3 tiers

## Related
- [[agent-evals]] — MANYIH-BENCH joins [[delegate-52]] and [[agent-floor]] in the long-horizon eval landscape, each revealing a distinct failure mode
- [[jagged-frontier]] — The 2-tier → 12-tier gap is a textbook case: models are strong at what they're trained on, catastrophically weak one step beyond
- [[instruction-severity-inflation]] — Competing emphatic formatting is a symptom of the same underlying failure: models pattern-match rather than resolve structured conflicts
- [[agent-floor]] — Both benchmarks reveal complexity scaling breaks current models; AgentFloor at planning horizon, ManyIH at conflict tier count
- [[dynamic-trust]] — The video author's proposed extension: trust as source + context + provability rather than static source-based assignment
- [[hallucination]] — Semantic arithmetic failure is a related phenomenon: the model doesn't understand numbers, it pattern-matches them
- [[discover-ai]] — The creator whose video brought accessible explanation and personal corroboration to the paper's findings

## Sources
- `raw/many-tier-instruction-hierarchy.md` — The ManyIH paper (Zhang et al., JHU, April 2026): paradigm definition, Privilege Prompt Interface design, MANYIH-BENCH construction, experimental results and analysis
- `raw/yt-agent-trust-vector-study-2026.md` — Discover AI's video analysis: accessible explanation of the study, personal experience with multi-agent trust failures, critique of static trust assignment, dynamic trust proposal

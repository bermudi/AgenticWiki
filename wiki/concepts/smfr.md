---
title: SMFR (Synthetic Multi-Hop Financial Reasoning)
created: 2026-06-18
updated: 2026-07-09
sources:
  - raw/2606.13003.md
tags: [concept, benchmark, multi-agent, evaluation, diagnostic, financial-reasoning]
unaudited_marginal: 0
---

# SMFR (Synthetic Multi-Hop Financial Reasoning)

> A procedurally generated diagnostic benchmark designed to isolate task suitability as a factor in Multi-Agent System (MAS) performance. SMFR presents agents with a stock-price haystack and a set of investor transactions, requiring multi-step context extraction, parallelizable sub-task execution, and deterministic cross-investor synthesis. Built specifically to test the MAS advantage hypothesis under conditions where it *should* hold — and where it does not.

## Task Structure

Each SMFR instance presents:

- A **stock price haystack**: historical open/close prices for *B* companies over a 30-day window (the distractor data)
- A **set of investor transactions** (buy/sell pairs) — the "needles" that must be retrieved
- A **target profit/loss percentage** (0.1% to 2.0%) — the global objective
- A **constraint** on which dates each investor could have hit the target
- An **aggregation criterion** (earliest qualifying date or latest) — the win condition

The agent must: (i) parse the constraint, (ii) extract the relevant transactions, (iii) derive the P&L baseline, (iv) reverse-calculate the required target price, (v) scan dates for matches, (vi) synthesize across investors to identify the winner. Steps (ii), (iii), (iv) parallelize naturally across investors; each investor's trajectory is sequentially dependent.

## Why a Diagnostic Benchmark?

Prior MAS-vs-SAS comparisons (GSM8K, MMLU, GPQA-Diamond, HLE-Math) evaluate static reasoning. The MAS advantage hypothesis depends on properties these benchmarks do not isolate:

- **Sequential interdependence** (later steps depend on earlier observations)
- **Sub-task structure** (clean decomposition opportunities)
- **Parallelization potential** (sub-tasks that can run independently)
- **Context separation** (a context that benefits from being split across agents)

SMFR is designed so *all four* properties are present. If MAS helps anywhere, it should help on SMFR.

## Procedural Generation

SMFR is programmatically generated from historical US equity prices (yfinance). The "Haystack" is 30-day price tables for B stocks; the "Needles" are investor histories that need to be retrieved; the answer is programmatically computed. This makes the benchmark:

- **Immune to data contamination** — no fixed test set to leak
- **Realistic in price distributions** — using real market data
- **Balanced** — 588 test samples (+16 validation) balanced across transaction types, aggregation logic, and target percentages
- **Tunable** — the parameter B (number of investors, i.e., degree of parallelization) lets the difficulty be controlled

## Headline Results

| Backbone | CoT-SC | Best automated MAS | Expert-MAS |
|---|---|---|---|
| GPT-4o | ~26% | no significant gain | bottlenecked (retrieval + calculation failures) |
| GPT-OSS-120B | 26.1% | +6.6pp (DyLAN, 5× cost) | **36.1%** |
| GPT-5 | 57.0% | +6.0pp (MAS-Orchestra, 1.9× cost) | **96.5%** |

The interpretation: SMFR is a genuine agentic stress test. GPT-5 reaches only 57.0% with single-agent CoT-SC, GPT-4o and GPT-OSS cluster at 22.1–26.1%. Yet the only framework that breaks through is the *hand-designed* Expert-MAS — not any of the six automated frameworks tested. The three statistically significant improvements from automated MAS (DyLAN on GPT-OSS, DyLAN on GPT-5, MAS-Orchestra on GPT-5) all occur on stronger backbones and at substantial cost overhead.

## The Expert-MAS Control

The Expert-MAS baseline on SMFR is the experimental lever. It is a deterministic, code-driven multi-agent pipeline:

- **Meta-Agent**: parses the problem topology into a structured schema
- **Python Executor**: dispatches specialized sub-agents in parallel per investor
- **ExtractorAgent**: retrieves targeted data from the haystack
- **CalculatorAgent**: reasons over isolated snippets, computes P&L and target prices
- **Aggregator**: sorts qualifying dates, identifies winning investor (deterministic)

The Expert-MAS is hand-engineered per Anthropic's [recommendation](https://www.anthropic.com/engineering/built-multi-agent-research-system) for MAS: explicit decomposition, role specialization, and deterministic orchestration. The fact that it works (and the automated variants don't) is the paper's strongest evidence that the failure is in the automated *search process*, not the multi-agent paradigm.

## Relationship to Other Benchmarks

SMFR is positioned as a complement to the benchmarks in the [[the-benchmark-crisis]] thread:

- [[swe-bench-pro]] and [[deepswe]] measure code generation on (mostly) static snapshots. SMFR measures multi-hop reasoning over procedurally generated contexts.
- The [[evoarena]] suite measures persistent environment evolution. SMFR is single-shot, but the multi-step structure and parallelizable decomposition share EvoArena's interest in agentic capabilities rather than static reasoning.
- The Expert-MAS success validates the [[backpressure]] principle (deterministic orchestration = verifiable control flow) at the multi-agent level.

## What SMFR Doesn't Measure

SMFR is a reasoning benchmark, not a real-world agent deployment. It does not measure:

- Long-horizon memory across sessions (covered by [[evoarena]]'s PersonaMem-Evo)
- Codebase navigation and modification (covered by [[swe-bench-pro|SWE-Bench Lite]] and [[deepswe]])
- Tool-use robustness over many turns
- Cost-quality tradeoffs at production scale (the paper reports cost multipliers, not dollar costs)

The paper itself notes that the Expert-MAS design is most applicable to "reasoning-heavy agentic workflows" — environments where the bottleneck is internal coordination, not external interaction.

## Thread

- [[the-benchmark-crisis]] — SMFR is built to *avoid* the standard benchmark failure modes and still exposes MAS cost-inefficiency; the benchmark crisis and the multi-agent illusion are connected
- [[the-verifiability-thesis]] — the Expert-MAS success on SMFR is verifiability applied at the multi-agent level: deterministic orchestration makes the architecture's contribution measurable

## Related

- [[multi-agent-illusion]] — SMFR is the diagnostic experiment that documents the illusion
- [[expert-mas]] — the hand-designed baseline that demonstrates the multi-agent paradigm can work
- [[architectural-bloat]] — SMFR is specifically designed to expose this
- [[functional-collapse]] — the failure mode SMFR reveals in automated frameworks
- [[evoarena]] — the only other major 2026 benchmark suite designed for agentic capabilities rather than static reasoning
- [[deepswe]] — the long-horizon coding benchmark; SMFR is the long-horizon reasoning complement
- [[harness-engineering]] — the Expert-MAS architecture is a worked example of harness engineering: typed decomposition + deterministic control + specialized sub-roles
- [[recursive-agent-harness]] — the only other hand-designed multi-agent pattern with a clean before/after cost-quality comparison

## Sources

- `raw/2606.13003.md` — Jwalapuram, Lin et al. (2026). §3.3 SMFR construction and task structure; Figure 3 generation pipeline; Table 4 head-to-head results; Figure 4 Expert-MAS architecture; Appendix C dataset statistics; Appendix D Expert-MAS configuration.

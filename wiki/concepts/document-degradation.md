---
title: Document Degradation
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/2604.15597v1.pdf
tags: [llm, reliability, delegation, failure-mode, long-horizon]
---

# Document Degradation

> The silent corruption of documents by LLMs during delegated editing workflows, where sparse but severe errors compound over repeated interactions until a significant fraction of document content is lost or altered.

## Core Finding

[[philippe-laban|Laban]] et al. (2026) found that current LLMs are **unreliable delegates**. In a large-scale simulation of 19 LLMs across 52 professional domains:

- **Frontier models** (Gemini 3.1 Pro, Claude 4.6 Opus, GPT 5.4) corrupt an average of **25% of document content** over 20 interactions
- **Average degradation across all tested models**: **50%** by the end of simulation
- **80% of model-domain combinations** show catastrophic corruption (≤80% reconstruction score, equivalent to ≥20% degradation)

The degradation is **silent**: documents still look plausible after each interaction, but their semantic content drifts or vanishes over time.

## Deletion vs. Corruption

Degradation decomposes into two distinct failure modes:

| Pattern | Cause | Model Type |
|---------|-------|------------|
| **Deletion** | Missing structured elements (e.g., ingredients, steps) | Weaker models |
| **Corruption** | Present but incorrect content | Frontier models |

Weaker models primarily delete content. Frontier models' degradation is attributable to **corruption of existing content** — they preserve the shape of the document while altering its substance.

## Critical Failures

Document degradation is not "death by a thousand cuts." Analysis of individual relay simulations shows:

- Models maintain **near-perfect reconstruction** in most rounds
- **Sparse critical failures** in a few rounds typically cause a drop of **10–30+ points** in a single round-trip
- These sparse failures explain approximately **80% of total observed degradation**
- Stronger models don't avoid small errors better; they **delay critical failures** and experience them in fewer interactions

By interaction 20, the cumulative percentage of runs experiencing at least one critical failure (≥10pt drop) ranges from ~38% (Gemini 3.1 Pro) to 97% (GPT 5 Nano), with all models except Gemini 3.1 Pro seeing a majority of runs affected.

## Factors That Worsen Degradation

### Document Size
As document size increases from 1k to 10k tokens, degradation worsens gradually. Each additional 1,000 tokens degrades GPT 5.4's preservation by roughly 0.7% after two interactions, but **3.6% after 20 interactions**. Document size and interaction length **compound multiplicatively**.

### Interaction Length
Extended relays to 100 interactions show **monotonic decline with no plateauing**. Even the strongest model (GPT 5.4) drops below 60% by the end of a 50-round-trip relay. The first half of an extended relay accounts for roughly 2–3× more loss than the second half.

### Distractor Context
Removing distractor documents improves scores, but the benefit is small early (0.4–4% at 2 interactions) and widens over time (2–8% by 20 interactions). Distractor harm **compounds with interaction length**.

### Agentic Tool Use
Counter-intuitively, providing file reading, writing, and code execution tools **does not improve performance**. Four tested models performed worse with tools, incurring an average additional degradation of **6%**. Tool use introduces overhead (2–5× more input tokens, higher latency) and models favor file writing over precise code execution.

### Domain
LLMs perform better in **programmatic or structured domains** (Python, DB Schema) and worse in natural language and niche domains (e.g., Recipe, Fiction, Transit, Textile). Performance correlates with repetitiveness, structural density, and the presence of verifiable structure.

## Image Degradation

A small-scale extension to image generation models shows degradation is **far more severe** for visual domains. The best image models achieve final reconstruction scores of 28–30%, compared to 70–80% for textual domains. No image generation model exceeds 65% even after two interactions.

## Thread
- [[the-slop-problem]] — Document degradation as the quantitative mechanism of slop accumulation
- [[the-agent-workflow]] — Silent corruption undermines the viability of AFK delegation
- [[agent-quality-engineering]] — The failure mode long-horizon evals are designed to surface
- [[the-human-lever]] — Silent corruption is why humans must own the verification contract

## Related
- [[delegate-52]] — The benchmark that measures document degradation
- [[round-trip-relay]] — The method that reveals silent degradation
- [[compounding-booboos]] — Direct empirical quantification of compounding errors
- [[hallucination]] — Document corruption as a silent, structural hallucination
- [[critical-failure]] — Sparse catastrophic drops as the primary driver of degradation
- [[jagged-frontier]] — Degradation severity varies sharply by domain
- [[verification-loop]] — The paper challenges assumptions about tool-based verification
- [[vibes-based-engineering]] — "Looks correct" fails because corruption is invisible per-interaction
- [[philippe-laban]] — Lead author of the study that quantified document degradation
- [[deliberate-friction]] — Preserving friction at delegation boundaries acts as a circuit breaker for degradation

## Sources
- `raw/2604.15597v1.pdf` — Quantitative results across 19 LLMs, domain breakdowns, critical failure analysis, deletion vs. corruption decomposition, and factor experiments

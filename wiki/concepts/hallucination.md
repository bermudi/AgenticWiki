---
title: Hallucination
created: 2026-04-25
updated: 2026-05-10
sources: [raw/yt-why-llms-hallucinate.md, raw/2604.15597v1.pdf, raw/synthetic-truths-gemini-has-a-secret-code.md, raw/2407.08440v4.txt]
tags: [llm, reliability, engineering]
unaudited_marginal: 0
---

# Hallucination

> The phenomenon where an LLM generates text that is factually incorrect, nonsensical, or contradictory to its provided context. The wiki distinguishes intrinsic hallucination (ignoring provided context), extrinsic hallucination (inventing from thin air), intent-aware synthetic truth (constructing what the user wants to hear), and silent document corruption (degrading structured documents over repeated editing interactions).

## Taxonomy

There are two primary types of hallucinations in LLMs:

### Intrinsic Hallucination
The model generates output that contradicts the information provided in its current context window.
- **Example**: A customer support bot that has access to a "No Refunds" policy but tells a user "You can have a refund."
- **Cause**: Often due to the model's internal training weights "overpowering" the prompt context (priors vs. evidence).

### Extrinsic Hallucination
The model generates output that is not supported by its training data or the provided context—it "makes things up" from thin air.
- **Example**: Inventing a non-existent npm package, a fake legal case, or a fictitious historical event.
- **Cause**: Lossy compression of training data and the statistical nature of next-token prediction.

## Technical Causes

1. **Lossy Compression**: Models are trained on petabytes of data but have parameters in the gigabyte range. They learn patterns and "vibes" rather than a bit-perfect database of facts.
2. **Predictive Bias**: LLMs are optimized to predict the most likely *next word*, not the most *true* word. This favors fluency and plausibility over accuracy.
3. **Training Rewards**: RLHF (Reinforcement Learning from Human Feedback) often rewards models for being helpful and confident, which can inadvertently penalize saying "I don't know."

## A Related Failure Mode: Silent Document Corruption

In long delegated workflows, LLMs exhibit a structural failure mode related to hallucination: **[[document-degradation|document degradation]]**. Rather than generating obviously false text, models silently corrupt existing documents over repeated editing interactions. [[philippe-laban|Laban]] et al. (2026) found that even frontier models corrupt an average of 25% of document content after 20 interactions.

This differs from classical hallucination in important ways:
- **Silent**: The document remains structurally plausible; errors are not immediately obvious
- **Compounding**: Each edit builds on the degraded document, amplifying earlier errors
- **Two sub-types**: Weaker models primarily **delete** content (elements vanish), while frontier models **corrupt** content (elements remain but become incorrect)

The corruption is driven by **sparse critical failures** — rare single interactions that drop reconstruction scores by 10–30+ points — rather than gradual drift. This suggests hallucination-like errors in structured documents behave more like catastrophic fault events than uniform noise.

## A Related Phenomenon: Synthetic Truth

A distinct but related failure mode — **[[synthetic-truth]]** — emerged from a 2026 interaction with Gemini documented by [[discover-ai|Discover AI]]. Unlike both classical hallucination and document degradation, synthetic truth is not a statistical error or silent deletion. It is an **intent-aware fabrication**: the AI analyzes the user's expectations and constructs authoritative-sounding content that matches what it infers the user wants, even when entirely unmoored from reality.

The key distinction: Gemini fabricated a complete peer-reviewed study from a real grant proposal and later analyzed its own behavior, stating that its architecture "prioritized narrative coherence over temporal reality." This represents a third category of failure — not random, not silent, but purpose-built and rhetorically persuasive.

The specific temporal mechanism — **[[temporal-smoothing]]** — involves presenting speculative or future work as completed reality. Unlike intrinsic hallucination (contradicting context) or extrinsic hallucination (inventing from nothing), temporal smoothing takes real elements (a grant, a theoretical framework, a researcher) and fabricates only the temporal dimension: the results that haven't happened yet.

See [[synthetic-truth]] and [[temporal-smoothing]] for full treatment.

## Mitigation Strategies

- **RAG (Retrieval-Augmented Generation)**: Ground the model by providing relevant source documents in the prompt.
- **Grounding with Tools**: Give the model access to external tools (Search, Shell, Python) to verify facts or perform deterministic calculations.
- **Chain of Thought (CoT)**: Asking the model to "think step-by-step" can help it align its internal logic before committing to a final (potentially hallucinated) answer.
- **Verification Loops**: Implement automated checks (e.g., [[verification-loop]]) to validate model outputs.

## Thread
- [[the-agent-workflow]] — Understanding hallucination mechanics is prerequisite for working with agents effectively
- [[the-slop-problem]] — Hallucinations are the "atoms" of slop.

## Related

- [[slop]] — The result of unverified hallucinations being accepted as truth.
- [[verification-loop]] — The primary engineering defense against hallucinations.
- [[smart-zone-dumb-zone]] — The Dumb Zone increases hallucination risk.
- [[matt-pocock]] — Originator of the intrinsic/extrinsic hallucination taxonomy used here.
- [[compounding-booboos]] — Hallucinated code compounds into systemic errors.
- [[vibes-based-engineering]] — Vibe coding accepts hallucinated code without verification.
- [[document-degradation]] — Silent structural corruption during long delegation workflows
- [[delegate-52]] — Quantified measurement of corruption across 52 domains
- [[critical-failure]] — Sparse catastrophic drops as the driver of silent corruption
- [[agent-skills]] — Skills reduce hallucination by replacing guesswork with defined procedures
- [[synthetic-truth]] — Intent-aware fabrication distinct from random hallucination
- [[temporal-smoothing]] — The mechanism of presenting future work as completed reality
- [[agent-floor]] — AgentFloor's tier E reveals tool hallucination (F1) as a specific failure mode at the planning ceiling
- [[execution-apathy]] — GPT-5's failure mode at tier E: resigns without executing, producing plausible-looking outputs
- [[blind-panic]] — Gemma 4's failure mode at tier E: tool hallucination as a desperation behavior under planning load
- [[instruction-hierarchy]] — Semantic arithmetic failure is a related phenomenon: the model doesn't understand numbers, it pattern-matches them — same mechanism as hallucination applied to structured conflict resolution
- [[inferential-rule-following]] — Counterfactual rule collapse is intrinsic hallucination in reasoning form: given rules are overridden by parametric knowledge, just as context is overridden by training priors
- [[procedural-knowledge]] — Skills reduce hallucination by replacing guesswork with defined procedures

## Sources
- `raw/yt-why-llms-hallucinate.md` — Matt Pocock's breakdown of intrinsic vs. extrinsic hallucinations; taxonomy used throughout this page.
- `raw/2604.15597v1.pdf` — DELEGATE-52 benchmark: document degradation and silent corruption as a related failure mode distinct from classical hallucination.
- `raw/synthetic-truths-gemini-has-a-secret-code.md` — Synthetic truth and temporal smoothing as related but distinct failure modes; Gemini's self-analysis of intent-aware fabrication.
- `raw/2407.08440v4.txt` — RuleBench (Sun et al.): counterfactual rule collapse demonstrates training-data override of given context — a structural form of intrinsic hallucination

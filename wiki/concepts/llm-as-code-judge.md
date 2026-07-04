---
title: LLM as Code Judge
created: 2026-05-15
updated: 2026-07-03
sources:
  - raw/bias-in-the-loop-llm-judge-code.md
  - raw/llm-overcorrection-code-review.md
  - raw/2503.13657-why-multi-agent-llm-systems-fail.md
tags: [concept, llm-as-judge, code-review, evaluation, bias]
unaudited_marginal: 0
---

# LLM as Code Judge

> Using LLMs to evaluate code quality when exhaustive human review or executable test coverage is unavailable — a practice that suffers from systematic prompt-induced biases and reliability issues documented across two rigorous studies.

Using LLMs as code judges spans pairwise comparisons (which of two solutions is better?) and pointwise grading (does this code meet the spec?). Studies of both modes reveal systematic sensitivity to prompt framing that undermines the validity and reproducibility of evaluations.

The Bias in the Loop study (pairwise setting) identifies 12 prompt-induced biases that systematically shift code judge decisions even when underlying code is unchanged. Several biases — CoT, authority, refined, and sentiment — act as positional priors pushing the judge toward the first candidate, while others like verbosity push toward the second candidate. The direction of the bias is consistent across tasks and models, but which direction depends on the specific bias type. Test-retest reliability varies dramatically: Qwen2.5-Coder-3B achieves only ~50% consistency rate on TestGen under no-bias conditions, while GPT achieves 85–92% on CodeGen/CodeRepair.

The overcorrection study (pointwise setting) shows that when judges are asked to explain and fix (rather than just verdict), they become overly conservative — rejecting correct implementations at rates up to 92% (Llama-3.1-8B on MBPP under Direct+Explain). The rationales themselves are unreliable: symptom-level diagnosis is strong (≥91%) but cause-level diagnosis is weak (38–75%) depending on model and benchmark.

## Thread

- [[prompts-in-code-review]] — LLM-as-judge is the primary application where prompt bias manifests

## Related

- [[rubric-evaluation]] — RUBRICEVAL shows frontier models struggle with fine-grained judging; related reliability concerns
- [[hallucination]] — Overcorrection rationales exhibit hallucination-like behavior (fabricating unstated constraints)
- [[verifiability]] — The Fix-guided Verification Filter uses execution evidence to ground judge decisions
- [[mast]] — The MAST LLM-as-a-Judge annotator (κ=0.77 against human experts) is a data point for LLM-as-judge reliability in structured classification tasks (vs. the open-ended rubric evaluation where RUBRICEVAL found 55.97%)

## Sources

- `raw/bias-in-the-loop-llm-judge-code.md` — Systematic audit of 12 prompt biases across 3 code tasks and 3 models
- `raw/llm-overcorrection-code-review.md` — Overcorrection bias when requiring explanations and fixes from LLM judges
- `raw/2503.13657-why-multi-agent-llm-systems-fail.md` — Cemri, Pan, Yang et al. (NeurIPS 2025). Source for the [[mast]] addition to Related. The MAST LLM-as-a-Judge annotator achieves κ=0.77 against human experts on structured failure classification — a data point for LLM-as-judge reliability in structured tasks vs. open-ended rubric evaluation.

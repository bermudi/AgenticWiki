---
title: Overcorrection Bias
created: 2026-05-15
updated: 2026-07-14
sources:
  - raw/2603.00539.md
tags: [concept, bias, code-review, overcorrection, false-negative]
unaudited_marginal: 0
---

# Overcorrection Bias

> The systematic tendency of LLMs to misclassify correct code as non-compliant or defective, especially when prompted to explain judgments and propose fixes.

Overcorrection bias is a false-negative-dominant failure mode in LLM code review. When models are asked to judge conformance, explain their reasoning, and suggest repairs, the decision boundary shifts toward conservative rejection — correct implementations are rejected at dramatically higher rates.

GPT-4o's false negative rate on HumanEval jumps from 26.2% (Direct prompt, verdict only) to 73.2% (Full prompt with explanation + fix). On MBPP, it rises from 35.9% to 87.9%. The pattern holds across all tested models, though magnitude varies.

Four rejection patterns dominate false negatives: Logic Error (48.2% — claiming algorithmic flaws without falsifiable counterexamples), Added Requirement (14.1% — hallucinating constraints not in the spec), Boundary Error (13.2% — asserting off-by-one errors in correct code), and Misread Spec (11.7% — misinterpreting stated requirements). These are semantic failures, not superficial style critiques.

Mitigation via a Fix-guided Verification Filter — treating the model's proposed fix as executable counterfactual evidence and validating both original and fixed code with benchmark + augmented tests — reduces FNR by 7–67 percentage points depending on model and benchmark, with modest FPR increases.

## Thread

- [[prompts-in-code-review]] — Overcorrection is the primary failure mode when detailed prompts are used for code review
- [[the-agent-workflow]] — Catastrophic overcorrection is a word-count calibration failure in iterative self-correction; post-process rather than relying on the model

## Related

- [[hallucination]] — Added Requirement rejections resemble extrinsic hallucination (fabricating unstated constraints)
- [[rubric-evaluation]] — Related concerns about LLM judge reliability
- [[iterative-self-correction]] — Self-Refine-style feedback loops may amplify overcorrection rather than reduce it

## Sources

- `raw/2603.00539.md` — First systematic quantification of overcorrection bias across 5 LLMs and 3 benchmarks

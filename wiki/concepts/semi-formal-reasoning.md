---
title: Semi-Formal Reasoning
created: 2026-05-15
updated: 2026-07-09
sources:
  - raw/agentic-code-reasoning.md
tags: [concept, reasoning, code-review, verification, structured-prompting]
unaudited_marginal: 0
---

# Semi-Formal Reasoning

> A structured prompting methodology that requires LLM agents to construct explicit premises, trace execution paths, and derive formal conclusions — acting as certificates that prevent skipping cases or making unsupported claims.

Semi-formal reasoning bridges the gap between unstructured chain-of-thought (where models can guess) and fully formal verification (which requires translating code into proof languages like Lean or Coq). The key insight: by structuring the reasoning *process* through templates, not just the output format, the agent is forced to gather evidence before concluding.

For patch equivalence verification, the template requires: definitions (what equivalence means), premises (what each patch modifies), per-test execution traces with evidence, counterexamples for non-equivalence, and formal conclusions referencing the definitions. This structure directly counters the failure modes of unstructured reasoning: hallucinated requirements, unsupported logic error claims, and missed execution paths.

Results across three tasks: patch equivalence accuracy improves from 78% to 88% on curated examples, reaching 93% on real-world agent-generated patches with Opus-4.5. Code QA accuracy improves by 9pp on RubberDuckBench. Fault localization Top-5 accuracy improves by 5–12pp on Defects4J. The cost is ~2.8× more agent steps.

Remaining failure modes: incomplete execution tracing (assuming function behavior without tracing), third-party library semantics (guessing from names when source is unavailable), and dismissing subtle differences as irrelevant.

## Thread

- [[prompts-in-code-review]] — Semi-formal reasoning addresses overcorrection and judge bias by mandating evidence

## Related

- [[shubham-ugare]] — Lead author of the agentic code reasoning paper introducing semi-formal reasoning
- [[verifiability]] — Semi-formal certificates enable execution-free verification, aligning with Karpathy's verifiability thesis
- [[iterative-self-correction]] — Unlike self-correction loops which can amplify errors, semi-formal templates prevent unsupported claims structurally
- [[context-engineering]] — The template is a form of context engineering that constrains reasoning toward evidence

## Sources

- `raw/agentic-code-reasoning.md` — Introduces semi-formal reasoning and evaluates across patch equivalence, code QA, and fault localization

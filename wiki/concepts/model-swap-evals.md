---
title: Model-Swap Evals
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/how-to-test-new-ai-models-before-they-break-production.md
unaudited_marginal: 0
tags: [concept, evals, model-selection, deprecation, testing]
---

# Model-Swap Evals

> An eval harness for answering "can I swap in a new model?" across three dimensions — accuracy, cost, and latency — before the model lands in production. The pattern: build a test-case set from production data, run the incumbent and candidate models in parallel, diff the outputs, and gate the swap on configurable thresholds. The hardest part is not the harness but defining what "good enough" looks like.

## The Problem: Model Deprecation as a Forcing Function

Model deprecation has become a routine operational headache. [[kevin-gregory|Kevin Gregory]] (EvolutionIQ) reports that Google announced the deprecation date for Gemini 2.5 Flash *before* the model was even released — both the release date and the deprecation date were in the future. The era of training an XGBoost model and running it indefinitely is over; every hosted model will eventually be deprecated, and teams dependent on it will be forced to change unless they self-host.

> [!note] Attribution
> The deprecation account and the three-questions framing are [[kevin-gregory|Kevin Gregory]]'s, identifiable from context (he works at EvolutionIQ and describes their Gemini migration history). The transcript lacks per-line speaker labels; attribution is based on contextual cues, not verified against audio.

## Three Questions, One Harness

The harness answers three variants of the same question — *how will a new model perform in my workflow?* — each with a different operational trigger ([[kevin-gregory|Kevin Gregory]], Boundary "AI that Works," 2026):

1. **Deprecation replacement**: My current model is being deprecated. Can the new one replace it?
2. **Upgrade evaluation**: A new model came out. Will it improve my workflow?
3. **Cost/latency downgrade**: I'm running Opus or Sonnet. Will Haiku or Flash work — is it good enough, and how much cheaper/faster is it?

Open-source / self-hosted models partially solve the deprecation problem (you control the lifecycle), but the harness still answers the upgrade and downgrade questions.

## The Three Dimensions

The harness measures candidates against three dimensions:

| Dimension | What it measures | Kevin's demo threshold |
|-----------|-------------------|------------------------|
| **Accuracy** | Does the candidate produce correct output? | Max accuracy drop: 0% |
| **Cost** | What does each call cost? | Max cost multiple: 1.2× the incumbent |
| **Latency** | How fast is it? | P95 latency ≤ 1.5× the incumbent |

These are [[kevin-gregory|Kevin Gregory]]'s specific demo values for his EvolutionIQ harness, not industry-standard recommendations. The source shows a `budget` class with `max_accuracy_drop = 0`, `max_cost_multiple = 1.2`, and `max_p95_latency_multiple = 1.5` — illustrative of how the pattern works, not prescriptive of what teams should use.

The thresholds (the "budget") should be the **easiest thing to change** in the harness. Defining what success looks like — the acceptable bar — is the hardest part of the entire process. Make it trivial to swap numbers, re-run, and see which candidates pass or fail.

## The Diff Shortcut

The key insight that makes model-swap evals cheap: **you don't need to label all your data**. Run the incumbent and candidate on the same test cases and diff the outputs. If they agree, no labeling is needed — the candidate matches the incumbent, which is already good enough for production.

This works especially well for **structured extraction** (JSON output from documents, images, or unstructured text): two JSON objects are either equal or they aren't. Running two LLMs on a thousand documents and comparing the JSON is very fast and very cheap.

The cases where the models **disagree** are the most interesting. [[dex-horthy|Dex Horthy]] frames these as the hard problems future models must solve correctly: hand the disagreement cases to a human or subject-matter expert, confirm which model got it right, and add the labeled case to the golden data set. The golden set grows over time, fed by the disagreements.

> [!note] Attribution
> The diff shortcut is [[kevin-gregory|Kevin Gregory]]'s method (he demonstrates the harness and explains the labeling economics). The observation that disagreement cases are the most interesting is [[dex-horthy|Dex Horthy]]'s, from the same conversation. Both attributions are based on contextual cues in the transcript, not verified against audio.

## Free-Text Outputs: Structured Scoring on Top

For unstructured outputs (summaries, emails), the diff shortcut doesn't work directly. Two approaches from the conversation:

1. **LLM-as-judge**: Have a judge model pick which summary is better, with a fleshed-out definition of what "better" means for the use case.
2. **Extract-then-check**: If the summary contains structured information (dates, names, amounts), run a second extraction layer that pulls the structured facts out and checks those deterministically. The summary can be free text, but the *verification* is structured.

The broader maxim from the episode: **"Everything in AI engineering is structured outputs."** Even when the product-facing output is free text, the eval layer should turn it into structured data (boolean checks, enums, counts) so it can be processed programmatically.

> [!note] Attribution
> The LLM-as-judge and extract-then-check approaches are [[kevin-gregory|Kevin Gregory]]'s. The "everything in AI engineering is structured outputs" maxim is [[dex-horthy|Dex Horthy]]'s closing statement. Attributions based on contextual cues; the transcript lacks per-line speaker labels.

## Saturated vs Unsaturated Benchmarks

The conversation draws a distinction between two kinds of benchmarks:

- **Unsaturated benchmarks** (e.g., Slop Codebench, where models score 10–20%): valuable for model builders who want to know where the frontier is and how much room remains for improvement.
- **Saturated benchmarks** (e.g., SWE-bench, where every model scores 80–99%): useless for model builders, but exactly what you want for **your own private evals** — because your goal is 99–99.9% accuracy on your workflow, and a saturated benchmark tells you whether you're there.

General benchmarks have "limited purchase" because they are out of distribution: you don't care about performance on the benchmark, you care about performance in *your* workflow. This makes evals **proprietary IP** — they are necessarily specific to your company's data and workflows.

> [!note] Attribution
> The saturated/unsaturated distinction is a joint discussion between [[kevin-gregory|Kevin Gregory]] and [[dex-horthy|Dex Horthy]]. The specific framing — unsaturated for model builders, saturated for your own evals — is identifiable as Kevin's from context, but the conversation is collaborative. Attributions based on contextual cues; not verified against audio.

## The API Migration Analogy

[[dex-horthy|Dex Horthy]] draws a direct analogy from a pre-AI API migration project at Sprout (c. 2015): migrating high-volume Django/Python endpoints to Java. The method:

1. **Pull real production traffic** from logs (endpoint + request body).
2. **Replay** the same requests against both the old (Python) and new (Java) services.
3. **Diff** the HTTP status, response body, and latency.
4. **Strip noise**: remove fields you don't care about (timestamps, etc.) before diffing.
5. **Review the table**: hundreds or thousands of pass/fail rows with expandable diffs.
6. **Pull new traffic weekly**, re-run, and when everything is green, cut over.

The AI version is structurally identical: instead of replaying HTTP requests against two services, you run the same test cases against two models and diff the outputs. The Sprout team skipped manual labeling (they used real production traffic as the test set), but the pattern — replay, diff, review, cut over — is the same.

> [!note] Attribution
> The Sprout API migration story is [[dex-horthy|Dex Horthy]]'s, identifiable from context (he says "when I was at Sprout"). Transcript lacks per-line speaker labels; attribution based on contextual cues.

## Building the Golden Set: Start From Vibes

The progression from no evals to a robust golden set:

1. **Vibes**: paste one case into five different models, read the outputs, build intuition.
2. **10 cases**: refine the prompt a little.
3. **100 cases**: refine more.
4. **1,000+ cases**: run the diff shortcut at scale; label only the disagreements.

The leverage grows as confidence grows: 50% → 80% → 90% → 95% → 99%. The cases where models have disagreed in the past become the best cases to check vibes on when a new model comes out.

## The Pareto Frontier and Prompt Optimization

When no single model wins on all three dimensions (e.g., one is cheapest, one is fastest, one is most accurate), the candidate set sits on a Pareto frontier. [[baml|BAML]]'s prompt optimizer can take the different pieces of the frontier and create an optimized prompt that is the best compromise across all three — useful when a deprecation forces a model switch and no candidate strictly dominates.

## Thread

- [[agent-quality-engineering]] — Model-swap evals are a concrete instantiation of the quality loop's "confidence for model upgrades" payoff
- [[the-benchmark-crisis]] — The saturated/unsaturated distinction extends the benchmark crisis argument to private evals

## Related

- [[agent-evals]] — The general eval framework; model-swap evals are a specialized application
- [[dex-horthy]] — Contributed the API migration analogy, the disagreement-case insight, and the "structured outputs" maxim
- [[kevin-gregory]] — Designed and demonstrated the harness
- [[baml]] — BAML's prompt optimizer handles the Pareto frontier case
- [[model-routing]] — Model-swap evals answer the question model routing depends on: which model tier handles which workload
- [[intelligence-tier-routing]] — The downgrade question (will Haiku work?) is the eval-side complement to routing
- [[agent-quality-loop]] — The golden set grows via the same flywheel: production disagreements → labeled cases → regression prevention

## Sources

- `raw/how-to-test-new-ai-models-before-they-break-production.md` — Boundary "AI that Works" episode (2026): [[kevin-gregory|Kevin Gregory]] (EvolutionIQ) demonstrates a Python eval harness for model-swap decisions across accuracy, cost, and latency. [[dex-horthy|Dex Horthy]] contributes the Sprout API migration analogy, the disagreement-case insight, and the "everything is structured outputs" maxim. **Note:** This is a multi-speaker source whose transcript lacks per-line speaker labels. Attribution of specific claims to Kevin or Dex is based on contextual cues (who works at EvolutionIQ, who mentions HumanLayer/Sprout, who addresses the other by name), not verified against audio. Where attribution is uncertain, claims are attributed to the conversation.

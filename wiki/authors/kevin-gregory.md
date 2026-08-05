---
title: Kevin Gregory
created: 2026-08-02
updated: 2026-08-05
sources:
  - raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md
  - raw/how-to-test-new-ai-models-before-they-break-production.md
  - raw/yt-can-an-ai-out-plan-a-senior-engineer.md
unaudited_marginal: 0
tags: ["engineer", "evals", "ai-engineering"]
---

# Kevin Gregory

> AI engineer at EvolutionIQ (acquired for $730M), where he builds production LLM workflows on Google Cloud / Vertex AI using Gemini models. He runs the AI automations for Boundary's "AI that Works" podcast — emails, release notes, short scripts. A recurring guest on the show, he demonstrates practical eval harnesses and data-labeling discipline. Co-articulator of [[fighting-slop-with-slop]] and designer of the [[model-swap-evals|model-swap eval harness]].

## Overview

Kevin Gregory is an AI engineer at EvolutionIQ, a company that builds claims guidance systems for disability and workers' comp insurance carriers. EvolutionIQ was acquired for $730M. The company is a Google shop — everything runs on GCP and Vertex AI, and most production workflows use Gemini Pro or Gemini Flash. The workflows involve structured extraction from medical records (medical facts including surgeries and doctor's names), which means handling PII and PHI in a secure cloud environment.

Kevin runs the AI automations for Boundary's "AI that Works" podcast, hosted by [[dex-horthy|Dex Horthy]]. This includes emails, release notes, and scripts for shorts. He has appeared on the podcast multiple times, demonstrating eval projects and practical AI engineering.

## Contributions

### Model-Swap Eval Harness

Kevin designed and demonstrated a Python eval harness for answering "can I swap in a new model?" across three dimensions — accuracy, cost, and latency. The harness runs an incumbent model and candidate models against a shared test-case set, compares outputs against configurable threshold gates (the "budget"), and produces a pass/fail matrix. The key insight: use the [[model-swap-evals|diff shortcut]] — run both models on the same cases and diff the outputs; only label the disagreements. See [[model-swap-evals]] for the full pattern.

### Fighting Slop With Slop

Kevin is a co-articulator of [[fighting-slop-with-slop]] — the practice of channeling AI-generated slop into disposable internal tooling to produce higher-quality output where it matters. The term is the title of [[vibv|Vaibhav Gupta]]'s (Vibv) talk on the AI Engineer channel; the livestream referenced a talk on the concept ([5:24]–[5:32]: "we've done a talk on this at the AIN conference… soon on YouTube") — identifying the AIN conference with the AI Engineer channel is the wiki's inference. Kevin co-articulated the concept in the livestream discussion, where he was a guest alongside "Fib" (likely the transcript's garbling of Vibv himself, who introduces himself as working on BAML at [2:36]).

### Data-Labeling Discipline

Kevin's recurring message on the podcast: look at your data, label your data, test your stuff. His eval philosophy emphasizes building a golden labeled data set over time, starting from vibes (a few hand-checked cases) and growing to thousands of cases through the diff-and-label disagreement loop. He frames evals as proprietary IP — necessarily specific to your company's workflows and out of distribution for general benchmarks.

## Related

- [[model-swap-evals]] — The eval harness pattern he designed and demonstrated
- [[fighting-slop-with-slop]] — Co-articulated the concept on a Boundary livestream
- [[dex-horthy]] — Host of "AI that Works"; Kevin runs the show's AI automations
- [[agent-evals]] — His eval approach connects to the general eval framework
- [[baml]] — BAML's prompt optimizer is part of his model-swap toolkit

## Sources

- `raw/how-to-test-new-ai-models-before-they-break-production.md` — Boundary "AI that Works" episode (2026): Kevin demonstrates the model-swap eval harness, the diff shortcut, the three-dimension budget/gate pattern, and the saturated/unsaturated benchmark distinction. **Note:** Multi-speaker transcript without per-line speaker labels; attribution based on contextual cues (Kevin works at EvolutionIQ, demonstrates the harness, addresses Dex by name), not verified against audio.
- `raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md` — the origin of the phrase as the talk's literal title; the livestream's reference to the talk at [5:24]–[5:32] ("we've done a talk on this at the AIN conference… soon on YouTube").
- `raw/yt-can-an-ai-out-plan-a-senior-engineer.md` — Boundary livestream where Kevin co-articulates [[fighting-slop-with-slop]] and discusses the BEEPs design doc workflow.

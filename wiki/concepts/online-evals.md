---
title: Online Evals
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/yt-agent-development-lifecycle-101.md
unaudited_marginal: 0
tags: [concept, evals, monitoring, observability, production, feedback]
---

# Online Evals

> Running evaluators over production traces to score agent behavior without ground truth, attaching the scores as feedback. Introduced by [[harrison-chase|Harrison Chase]] (LangChain, 2026) as the monitor-stage complement to offline evals: you have thousands or millions of production traces and need to know which ones to look at and whether quality is degrading.

## The Problem

Once an agent runs in production, you get thousands or millions of traces. The question becomes: how do you know which ones to look at, and whether behavior is degrading? Offline evals (running the agent against curated datasets with known ground truth) can't answer this — they measure the agent you *think* it is, not the agent as users actually encounter it.

## What Online Evals Are

Online evals run evaluators over production traces and score them on chosen dimensions, attaching the score as feedback on the trace. They differ from offline evals in a fundamental way: **you don't know what the ground truth should be**. The trace is a real user interaction — there is no reference answer to compare against. So the evaluator must run "in a way where you do it without ground truth."

Chase's classification of monitoring levels makes online evals the third rung after tracing (the raw record) and feedback collection (user thumbs up/down): traces tell you what happened at scale, user signals tell you which traces users were unhappy with, and online evals add automated scoring across dimensions that user signals don't cover.

## Perceived Error: A Concrete Online Eval

Chase's worked example is **perceived error**: scanning the transcript of a human-agent interaction for clues that the user believes the agent messed up. In the wiki's framing, the contrast is structural: offline evals measure the agent you think it is; online evals measure the agent as users actually encounter it. Signals include:

- The user says "You messed up"
- The user says "No, you did X, you should have done Y" or "You did this wrong"
- In coding contexts, the user pastes back a code snippet with an error — evidence they ran it and it failed

LangChain trained a small language model specifically to detect perceived error, because the straightforward implementation — running an LLM over every trace — is too expensive ("you're potentially running an LLM over all traces. That's why we trained our own small language model... because we want it to be cheap"). This is the online-eval economics problem: an eval that costs more than the failures it catches isn't viable at scale, so the evaluator model itself becomes a design decision.

> [!note] Synthesis: The small-model-for-online-evals move
> Chase's choice of a trained small LM for perceived-error detection is the wiki's [[model-routing]] / [[agent-floor|small-model]] economics applied to the eval layer: online evals run at full production volume, so the evaluator's per-call cost dominates. This is the wiki's synthesis — Chase motivates the choice by cost, not by the small-model research literature.

## Online Evals vs. Guardrails

Chase draws a sharp timing distinction:

- **Online evals run after the agent runs** — they never affect agent latency
- **Guardrails run as the agent is running** — they can make the agent slower

The two can test for the same things; the difference is where they sit in the request lifecycle. Online evals trade away real-time prevention for zero latency impact and the ability to see the full completed trajectory.

## Relationship to the Wiki's Eval Theory

Online evals are the production-side complement to the offline eval stack in [[agent-evals]]. They share the same reliability problem the wiki documents extensively — [[llm-as-code-judge|LLM-as-judge]] unreliability (RUBRICEVAL's 55.97%, Bias in the Loop's 40+ point swings) applies with extra force when there is no ground truth to anchor the judge. The perceived-error pattern sidesteps part of this by being a *classification* task (does this transcript contain an error signal?) rather than an open-ended quality judgment — closer to MAST's structured classification (κ=0.77) than to rubric-level quality scoring. Note the axis distinction: perceived error is still LLM-judged (probabilistic) — the structural similarity is to MAST's *task shape*, not to the [[deterministic-picker]], which removes the LLM from the decision entirely.

Online evals also extend the [[agent-quality-loop|quality loop]] in a direction the wiki's existing sources gesture at but don't fully develop: offline evals consume curated datasets that grow from production failures; online evals consume the production stream itself. [[damian-galarza|Galarza]]'s system-level evals (Layer 4) and [[agent-observability]]'s system monitoring are the same territory; Chase's contribution is naming the no-ground-truth scoring pattern and the perceived-error detector as a concrete instance.

> [!note] Departure: The wiki's skeptic vs. Chase's builder
> The wiki's [[agent-quality-engineering]] thread is heavily shaped by [[dex-horthy|Horthy]]'s and Samuel Colvin's skepticism of LLM-as-judge ("never send an AI to do a linter's job"; "the lunatics running the asylum"). Chase is a builder who ships LLM-judged online evals as product. The positions are not strictly contradictory — Chase's perceived-error model is a purpose-trained small classifier, structurally closer to MAST's structured classification than to open-ended rubric judgment (though still LLM-judged) — but the contrast is worth noting: the wiki's strongest practitioners doubt the judge, while LangChain ships it at scale.

## Thread

- [[agent-quality-engineering]] — Online evals are the production-side layer of the quality infrastructure; perceived error is a concrete no-ground-truth scoring pattern
- [[the-benchmark-crisis]] — Online evals are the alternative to benchmarks: app-specific, production-derived, contamination-free by construction

## Related

- [[agent-evals]] — The offline eval stack; online evals are its production complement
- [[agent-quality-loop]] — The flywheel online evals feed: production traces → scores → issues → fixes
- [[agent-observability]] — Online evals depend on trace infrastructure
- [[tracing-spectrum]] — Execution-layer tracing is the substrate online evals score
- [[agent-development-lifecycle]] — The monitor stage of the lifecycle that Chase places online evals in
- [[harrison-chase]] — Introduced the perceived-error pattern
- [[langchain]] — Ships online evals and the perceived-error detector in LangSmith
- [[kevin-gregory]] — App-specific eval practice; online evals are the app-specific eval run at production volume
- [[model-swap-evals]] — An offline eval practice; contrasts with the no-ground-truth constraint of online evals

## Sources

- `raw/yt-agent-development-lifecycle-101.md` — Primary source: definition of online evals, the no-ground-truth constraint, perceived-error signals and the trained small LM, online-evals-vs-guardrails timing distinction, feedback collection, dashboards

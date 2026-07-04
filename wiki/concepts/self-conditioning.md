---
title: Self-Conditioning
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/the-illusion-of-diminishing-returns.md
  - raw/2511.09030-maker-million-step-zero-errors.md
tags: [concept, failure-mode, long-horizon, context, llm-behavior, execution]
unaudited_marginal: 0
---

# Self-Conditioning

> A failure mode in which an LLM becomes more likely to err when its own prior errors sit in its context — distinct from ordinary long-context degradation, *not* mitigated by scaling model size, but fixed by RL-trained thinking. Identified and named by Sinha, Arun, [[shashwat-goel|Goel]] et al. (ICLR 2026). It is the mechanism that caps [[horizon-length]]: as a long task progresses, the model's error rate itself rises, accelerating collapse.

## The Effect

Naively, one expects a model's per-step accuracy to stay roughly constant across a long task (errors then compound at a fixed rate — see [[compounding-booboos]]). It does not. Per-step accuracy *degrades* as the number of steps grows. The paper isolates why with a counterfactual: it surgically rewrites the model's chat history to inject a controlled error rate, then measures accuracy at a fixed later turn.

Two factors separate cleanly:

- **Long-context degradation** — accuracy at turn 100 on a *fully healed* (0%-error) history is still below turn-1 accuracy. This is the known "more context, worse attention" effect.
- **Self-conditioning** — as the injected error rate in the history rises, turn-100 accuracy degrades *further*, on top of the long-context floor. The model conditions on its own mistakes and makes more of them.

## Three Key Asymmetries

1. **Scaling does not fix it.** Frontier non-thinking models (Kimi K2 1026B, DeepSeek-V3 670B, Qwen3-235B-Instruct-2507) largely solve the long-context floor — near-perfect on a healed history — yet still self-condition as error rate rises. Larger models self-condition *more*, not less (Fig. 1, Fig. 5 captions: "Scaling model size increases self-conditioning"). The hypothesized mechanism: self-conditioning is the dark twin of in-context learning. Larger models are better at predicting the most likely continuation of their context — and when that context contains errors, "most likely" means more errors. This echoes [[hallucination]] snowballing (Zhang et al., 2023) and multi-turn identity/personality drift (Choi et al., 2024; Becker et al., 2025), where the drift is toward an error-prone "personality." (§3.2)
2. **Thinking fixes it.** Qwen3 thinking models (RL-trained to reason before acting) show stable turn-100 accuracy regardless of the error rate in context. Two plausible reasons: RL reorients the model toward task success rather than context continuation; and thinking models reason about each turn from scratch without referring back to prior-turn answers in their traces. (§3.2)
3. **It is not fixed by self-verification.** Prompting the model to re-validate its state each turn does *not* reliably break self-conditioning — and it burns context faster, hastening collapse. Thinking models "overthink" and fail the verification step itself. Self-verification is itself an error-prone execution task. (Appendix C.1)

## Evidence in Realistic Tasks

The synthetic task lets error rate be controlled exactly — impossible on messy real benchmarks. The authors manually annotated failed trajectories from AgentErrorBench (Zhu et al., 2025) across GAIA, ALFWorld, and WebShop, searching for failures where the agent repeated its own mistakes and degenerated. Estimated share of failures resembling self-conditioning: **~20% of GAIA, ~48% of ALFWorld, ~33% of WebShop.** Error categories: *inefficient_plan* (prior errors make the plan illogical), *progress_misjudge* (evaluating progress against one's own flawed outputs), *causal_misattribution* (correctly sensing failure but blaming the wrong cause). (Appendix A)

> [!note] Caveat
> These are subjective estimates on tasks where step correctness is hard to define — the authors flag this explicitly. The controlled synthetic task exists precisely because real benchmarks can't isolate self-conditioning cleanly. Treat the percentages as "this is a real and substantial failure mode," not as precise rates.

## Mitigations

| Approach | Works? | Notes |
|---|---|---|
| Scale model size | **No** | Larger non-thinking models self-condition more |
| RL-trained thinking | **Yes** | Stable accuracy regardless of history error rate |
| Remove prior history ([[context-engineering]]) | **Partially** | Sliding window helps, but only for Markovian tasks; generalizes to "minimize error accumulation in context" |
| Prompted self-verification | **No** | Burns context; verification itself is error-prone; thinking models overthink |
| Parallel majority voting | **No** | Marginal gain, does not match sequential thinking (Appendix D) |
| [[massively-decomposed-agentic-processes\|Maximal decomposition]] | **Yes (architectural)** | Each microagent sees only the minimal context for its single step — no error-laden history to condition on; the failure mode is structurally unavailable |

The context-engineering result is the actionable one for practitioners: actively limiting the model's exposure to its own past errors — a sliding window, or more generally any policy that keeps error-laden history out of context — mitigates self-conditioning. The general principle: **active context management that minimizes accumulation of errors in context improves long-horizon reliability.** (Appendix C.2)

[[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] take this principle to its architectural limit: each microagent receives only the current state and the prior move, never the full error-laden trajectory. Self-conditioning is structurally unavailable — there is no long context to degrade, and no error-laden history to condition on. The million-step zero-error result is partly a consequence: the failure mode that caps horizon length in single-agent systems is sidestepped by construction, and per-step error rates stay stable as the task grows (the paper notes this stability explicitly as the encouraging sign that MAKER scales).

## Related Failure Modes

Self-conditioning is distinct from the wiki's existing taxonomy:

- Unlike [[execution-apathy]] (resigns before executing) and [[blind-panic]] (loops/hallucinates under load), the self-conditioning model is *trying correctly* — it simply gets dragged down by the evidence of its own past.
- It overlaps with [[document-degradation]] and [[critical-failure]] in spirit (degradation over a long chain) but the mechanism is *context-content-driven*, not pure length: the same long context is fine if the history is error-free, and toxic if it isn't.
- It is the inverse of healthy [[iterative-self-correction]]: instead of reacting to mistakes by correcting them, the model reacts to mistakes by making more.

## Thread

- [[the-benchmark-crisis]] — short-task benchmarks can't see self-conditioning because it only emerges over long horizons; horizon-length-aware evaluation is required
- [[context-engineering]] — the sliding-window mitigation is a clean instance of context engineering as a reliability lever
- [[the-verifiability-thesis]] — self-conditioning as a verifiability-gap pathology: the model conditions on its own unverifiable (incorrect) history; RL-trained thinking re-derives each step independently, bypassing the corrupted context

## Related

- [[horizon-length]] — self-conditioning is the mechanism that caps horizon length; the rising per-step error rate accelerates the p^t collapse
- [[compounding-booboos]] — self-conditioning is what makes compounding *worse than constant*: the error rate itself rises, so decay is super-multiplicative
- [[context-engineering]] — limiting exposure to error-laden history is the training-free mitigation
- [[iterative-self-correction]] — the inverse: correcting vs. compounding; self-verification's failure here reinforces self-correction's known ceiling
- [[hallucination]] — self-conditioning is related to hallucination snowballing
- [[agent-floor]] — some tier-E "planning" collapses may be self-conditioning on prior errors within the trajectory
- [[document-degradation]] — kindred long-chain degradation, but content-driven rather than length-driven
- [[jagged-frontier]] — the frontier is jagged across context content: the same model reliable on healed history degrades on error-laden history, a long-horizon jaggedness invisible at one step
- [[massively-decomposed-agentic-processes]] — the architectural mitigation: each microagent sees only minimal context, so self-conditioning is structurally unavailable
- [[error-cascades]] — the multi-agent generalization: a MAS conditions on its own error-laden shared state (consensus inertia), the system-level analog of self-conditioning

## Sources

- `raw/the-illusion-of-diminishing-returns.md` — Sinha, Arun, Goel, Staab, Geiping (ICLR 2026). Self-conditioning effect and counterfactual error-injection experiment (§3.2); scaling/thinking asymmetries (§3.2, Figs. 5–6); realistic-task estimates from AgentErrorBench (Appendix A); mitigation studies — self-verification (Appendix C.1), context engineering sliding window (Appendix C.2), parallel majority voting (Appendix D).
- `raw/2511.09030-maker-million-step-zero-errors.md` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3.1 maximal agentic decomposition (each microagent receives minimal context — no error-laden history); §4.2 the per-step error rate is stable as the disk count grows, the empirical sign that self-conditioning is sidestepped. Source for the MDAP mitigation row and paragraph.

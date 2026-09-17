---
title: Harness Tax
created: 2026-09-16
updated: 2026-09-16
sources:
  - raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md
unaudited_marginal: 0
tags: [concept, harness, cost, evaluation, pareto-frontier, agent-tooling, model-selection]
---

# Harness Tax

> The hidden cost of accepting a coding agent's default harness: paying materially more for essentially the same task success because of which harness wraps the model. The HarnessTax study (Pan, Yang, Arabzadeh, Chiang, Stoica, Zaharia — UC Berkeley + Arena, 2026) measures it directly across 21 model–harness pairs: swapping harnesses moves task success by only ±2–5%, but cost by up to 5× for the same model on the same benchmark. A minimal four-tool open-source harness ([[pi]]) sits on the cost-success Pareto frontier of both benchmarks tested, and models most often score their highest outside their own provider's harness.

## The Study

21 model–harness pairs spanning seven models and three harnesses — [[claude-code|Claude Code]], Codex CLI, and [[pi|Pi]] — on SWE-bench Lite and Terminal-Bench 2.0. Methodology (as reported):

- The same 30 randomly sampled tasks per benchmark, each pair run 3 times per task to capture attempt variation.
- Each harness at its native configuration, high effort setting, 100-agent-turn cap.
- Success via each benchmark's official evaluator; 95% confidence intervals from 10,000 bootstrap resamples.
- Token costs from a fixed direct-API price list dated September 1, 2026, applied identically across harnesses.
- For SWE-bench Lite, external network access was blocked, Claude Code's and Codex's default web tools were disabled, and hosted tool declarations were rejected at the API request level. This equalizes *web/network* access only — the harnesses' native tool surfaces still differ sharply (see Finding 2).

## Finding 1: The Harness Moves Cost, Not Correctness

The same model often achieves similar success rates at substantially different costs. The headline spread reaches 5×: GPT-5.6 Luna costs $0.030 per rollout in Pi versus $0.15 in Claude Code on SWE-bench Lite (figure-derived values; the prose states only the up-to-5× spread — see the evidence-gap note below). Averaged across models (geometric means of cost ratios), Claude Code costs about **2.0× as much as Pi and 1.6× as much as Codex** on SWE-bench Lite, and **1.5× as much as Pi** on Terminal-Bench 2.0. Meanwhile the average harness effect on success rate stays within **±2%** on SWE-bench Lite and about **±5%** on Terminal-Bench 2.0.

The canonical data point: Claude Fable 5 solves 97.8% of attempts in Claude Code versus 96.7% in Pi — Claude Code costs about twice as much ($1.33 vs $0.67) for a 1.1% success increase, at essentially identical turn counts (15.3 vs 15.4 turns per attempt). Higher spending per recorded turn, though the authors note turn definitions vary across harnesses.

The study's coinage (crediting Sambharia's April 2026 Portkey post as prior term): paying extra for essentially the same quality because of harness choice is a *harness tax* — and you may be paying it whenever you accept a coding agent's default harness without comparing alternatives.

## Finding 2: A Simple Harness Can Be Competitive

Pi reaches the Pareto frontier on both benchmarks **by providing just four tools: read, write, edit, and bash**, competing on cost and success with feature-rich harnesses (Claude Code and Codex CLI). The mechanism is visible on the first model call: across all seven models, Claude Code's mean initial context is **over 10× Pi's**, with longer instructions and larger tool schemas. A harness tax can begin with the first model call. (Total spending also depends on caching, generated tokens, and later calls, so the initial-context gap is a cost *origin*, not the whole bill.)

> [!note] Synthesis: the minimalism pairing is the wiki's framing
> The wiki reads this result as the controlled counterpart to [[mario-zechner|Mario Zechner]]'s minimalism thesis — [[pi]]'s four-tool core previously argued from design principle and practitioner experience, now measured as a cost-success outcome against feature-rich harnesses. The HarnessTax authors themselves make no such connection; the pairing is the wiki author's.

The authors draw the research implication: the effectiveness of Pi and Codex demonstrates opportunities for open-source harness research with existing models — researchers can work with SOTA coding harnesses without access to proprietary harnesses or co-training with the model. Harness complexity should be treated as an empirical trade-off.

## Finding 3: Models Can Perform Competitively Outside Their Own Harness

Providers sometimes optimize models for their own coding environments — OpenAI, for example, describes GPT-5-Codex as optimized for software engineering in Codex — yet across the six Anthropic and OpenAI models and both benchmarks, **an alternative harness achieves the highest observed success rate in nine of twelve comparisons**. Examples: Claude Sonnet 4.6 solves 68.9% in Codex vs 66.7% in Claude Code on SWE-bench Lite at similar cost; GPT-5.6 Sol on Terminal-Bench 2.0 achieves 83.3% in Pi vs 78.9% in Codex at about half the cost ($0.42 vs $0.76). The reading: a model's capabilities are compatible and generalizable across harnesses; a shared provider does not guarantee the best pairing. The practical question is which harness delivers the best cost-success balance for a given model and workload.

> [!note] Synthesis: off-the-shelf harness swap vs. engineered harness are different interventions
> The ±2–5% success bound looks contradictory with the wiki's harness-evolution results — [[self-harness]] reports +14.2 to +21.4 pp held-out gains on Terminal-Bench 2.0 and [[harnessx]] +14.5% average — but the two literatures measure different treatments. HarnessTax compares *mature, off-the-shelf* harnesses at their native configurations (the swap a user actually faces when choosing an agent); the evolution papers measure the distance to a per-model engineered one — Self-Harness from a deliberately minimal DeepAgent baseline, while HarnessX augments a competent composed harness with the benchmark-specific tool registry (§A.4), not a minimal default. The reconciled picture — the wiki author's synthesis, not stated by any single source — is: choosing among existing harnesses is approximately a **cost decision**; engineering or evolving a harness for a model remains a **capability decision**. The paired callouts on [[self-harness]] and [[harness-monoculture]] record the same reconciliation from their sides.

## What the Study Prescribes

- **Model evaluations should compare the same model's cost and task success across commonly used harnesses** — the harness-swap analog of [[model-swap-evals]].
- For day-to-day tasks, coding agents are essentially interfaces to model intelligence (manage context, access tools, execute tasks); as models improve they may need less of today's scaffolding — general-purpose harnesses should prioritize cost efficiency and reliability, since many tasks may not require fancy add-on features. (Direct corroboration of [[thorsten-ball|Thorsten Ball]]'s harness-falls-away position; the capability-boundary carve-out in the next bullet is the HarnessTax authors' own qualification, not part of Ball's filed position.)
- For harder problems at the boundary of a model's capabilities, harnesses that provide structured guidance for exploring, evaluating, and learning may still help; the authors view harness research as a way to help models push the boundaries of knowledge.
- Users should not have to make these configuration decisions themselves — the authors point toward a redesigned harness that adapts as tasks unfold while remaining general (the selection problem [[variant-isolation]] operationalizes per-task).

## Limitations

The authors state the findings can be limited to the two open-source benchmarks tested, which the models may have encountered during training ([[benchmark-contamination|contamination]] caveat), and results may differ on other benchmarks and workloads.

> [!note] Evidence gap: figure-level statistics are not recoverable from the raw extraction
> The saved page renders its Figures 1–4 as interactive widgets whose extracted text is partially garbled. This page cites prose-stated statistics (the 2.0×/1.6×/1.5× cost ratios, the ±2%/±5% success bounds, the $1.33-vs-$0.67 and $0.42-vs-$0.76 examples, the >10× initial-context claim, and the nine-of-twelve count). Per-model cost/success values that appear only inside figure widget text are marked inline as figure-derived where used (the GPT-5.6 Luna $0.030-vs-$0.15 pair in Finding 1) and are otherwise not independently verifiable from the raw artifact — notably the full 21-pair Pareto data (Figure 1/4) and the Figure 3 context statistics. The authors state profiling traces will be publicly released; a future pass should re-check against the trace release.

## Thread

- [[tool-design-for-agents]] — The measured cost dimension of the harness layer: the tool/harness layer bounds the failure surface and silently multiplies cost; Pi's four-tool minimalism confirmed on the Pareto frontier
- [[the-benchmark-crisis]] — The cost-blind-scoring axis instantiated across harnesses: correctness-ranked comparisons cannot see a 2–5× cost spread on identical success

## Related

- [[pi]] — The minimal four-tool harness measured on the Pareto frontier of both benchmarks
- [[claude-code]] — The most expensive harness tested on average: ~2.0× Pi's cost with >10× its initial context at similar success
- [[harness-monoculture]] — The off-path capability-regression claim is bounded by this study's small measured success effects; the cost asymmetry corroborates the token-maxing incentive thesis
- [[grammar-constrained-sampling]] — A decode-level edit-call failure in strict harnesses; compatible with this study's task-level success bound, but the bound limits its task-level consequence
- [[self-harness]] / [[harnessx]] — The engineered-harness counterpart: evolution moves success where off-the-shelf swaps move cost (for HarnessX's +14.5% figure, §7.7's peak-on-evolution-set selection bias still applies)
- [[variant-isolation]] — Per-task harness routing; the operational answer to "which harness for which task"
- [[model-routing]] — The model-level analog of the same cost-arbitrage move
- [[model-swap-evals]] — The eval harness pattern this study's prescription extends from models to harnesses
- [[benchmark-contamination]] — The study's own stated limitation: both benchmarks may be in training data
- [[deepswe]] — Raised the harness-effect question for standardized-harness benchmarking; this study measures it
- [[melissa-pan]] — Lead author; co-equal first author of [[mast]]

## Sources

- `raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md` — Pan, Yang, Arabzadeh, Chiang, Stoica, Zaharia (UC Berkeley + Arena, 2026). *HarnessTax: How Much Does the Harness Matter for Coding Agents?* All quantitative claims: the 21-pair setup (Experiment Setup), cost ratios and success bounds (Finding 1), Pi's Pareto-frontier result and the >10× first-call context gap (Finding 2), the nine-of-twelve alternative-harness result with the Sonnet 4.6 and GPT-5.6 Sol examples (Finding 3), the day-to-day/boundary harness split and adaptive-harness outlook (Ending Notes), and the two-benchmark contamination limitation. Term origin credited to Sambharia (Portkey, April 13, 2026, ref [10]). The off-the-shelf-vs-engineered synthesis callout is the wiki author's, reconciling this source with raw/2606.09498.md (Self-Harness) and raw/2606.14249.md (HarnessX).

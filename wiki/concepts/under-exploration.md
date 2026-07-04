---
title: Under-Exploration
created: 2026-06-17
updated: 2026-07-04
sources:
  - raw/2606.14249.md
tags: [concept, failure-mode, harness-evolution, operational-mirror, optimization, structural-edit]
unaudited_marginal: 0
---

# Under-Exploration

> An optimizer converges on local prompt-level edits and fails to propose structural changes (decomposing one agent into several, replacing the control strategy, adopting a new memory architecture). In symbolic harness evolution, the [[operational-mirror|operational mirror]] predicts this as a structural risk: trace-conditional local repair is cheap to generate and frequently passes gating, biasing subsequent hypotheses toward the same edit neighborhood. The architectural defense is the [[harnessx|AEGIS]] Planner, which constructs the *adaptation landscape* before edit generation, ensuring that structural changes are considered alongside incremental prompt edits.

## How It Manifests in Harness Evolution

The [[harnessx]] paper's §6.6 case study (ALFWorld, Sonnet 4.6, R4–R7) is the canonical example:

> Between R4 and R7, the pipeline shipped predominantly prompt-level edits, yielding <1% gain per round. Ship-prediction accuracy (the fraction of manifest-predicted task flips that materialize) dropped from 80% (R3) to 0% (R7), signaling prompt-space exhaustion. The sole structural edit in this window (a processor-level change at R6) achieved only 14% ship-prediction accuracy (1/7 predicted flips materialized), suggesting that the Planner lacked sufficient structural-edit history to calibrate hypotheses beyond the prompt neighborhood.

The pattern: the optimizer's edit *type distribution* concentrates in one dimension (prompts), the per-round gain plateaus, and the manifest-vs-actual gap widens (ship-prediction accuracy drops). The system "plateaus once local edits are exhausted" (HarnessX §4.2).

A second pattern appears in the same case study: on GAIA (GPT-5.4, R1–R9), trace analysis pointed at *tools* from R1, but the pipeline stayed local (prompt/config only) until the R10 structural tool ship (WikiTextFetch, +4.9pp on 5/7 flips). For 9 rounds, the Planner was producing prompt-level edits when the trace evidence indicated tools. The system "stayed local until R10 structural tool ship."

A third pattern (WebShop, Sonnet 4.6, R1–R7): tools bucket was "untouched" for 7 rounds (hit rate 0.31, prompt-locked), and the R8 first tool ship (ColorMatcher) regressed by 4pp (76 → 72, 2/5 flips). The "belated" tool ship suggests that when structural edits are finally forced, they are less reliable than if the Planner had surfaced them earlier.

## The Detection Signal

The signal that distinguishes under-exploration from convergence is **the gap between manifest predictions and actual outcomes**, measured over time. Specific detection patterns:

- **Ship-prediction accuracy decay** — fraction of manifest-predicted task flips that materialize drops over rounds (e.g., 80% → 0% over 4 rounds)
- **Edit-type concentration** — N consecutive edits target the same dimension (e.g., 7 consecutive prompt-only edits)
- **Per-round gain plateau** — <1% gain per round over multiple rounds
- **Belated structural edit** — when a structural edit finally ships, it has lower ship-prediction accuracy than incremental edits would

These signals are *trace-level*: they require comparing the manifest's expected task flips against the actual per-task outcomes across rounds. The scalar verification score is *insufficient*; the trace distribution over rounds is the signal.

## The Architectural Defense

The [[operational-mirror|operational mirror]] identifies the Planner as the primary defense. The Planner's job is to construct the *adaptation landscape* before edit generation:

> The Planner receives the Digester's output (task-level summaries enriched with cross-iteration history) and constructs an adaptation landscape: which tasks are failing, what edits have been attempted, which components are implicated, and which edit types (prompt, tool, processor, configuration) remain untried. This stage is the primary defense against under-exploration: by constructing the landscape before edit generation, it prevents the pipeline from converging on trace-conditional local repair, ensuring that structural changes (tool additions, processor rewrites, memory-policy redesigns) are considered alongside incremental prompt edits. (HarnessX §4.3)

The adaptation landscape is the **structural exploration operator** for the harness evolution loop. Without it, the LLM's edit proposals are conditioned only on the failing-task traces, which biases the search toward the same edit neighborhood. With it, the LLM is forced to consider *all untried edit types* before proposing.

The cost: the Planner requires structured per-task summaries with cross-iteration history. The Digester's compression step is what makes the Planner tractable — ~10M raw trace tokens compressed to ~10K structured summaries per round, with prior-round summaries linked for continuity. Without the Digester, the Planner has too much information to consider; with it, the Planner can reason about edit-type coverage.

## The Ship-Prediction Accuracy Metric

The [[harnessx|AEGIS]] pipeline introduces a new evolution metric: **ship-prediction accuracy** — the fraction of manifest-predicted task flips that materialize. From the §6.6(g) case study: ship-prediction accuracy is the empirical signal for prompt-space exhaustion. The pattern:

- High ship-prediction accuracy (e.g., 80%) = the manifest is reliable; the optimizer is correctly predicting which tasks will improve
- Low ship-prediction accuracy (e.g., 0%) = the manifest is unreliable; the optimizer is making blind edits

The metric is *trace-level*: it requires comparing the manifest's claimed task flips against the actual per-task outcomes in the next round. The scalar verification score is *insufficient* — a 0% ship-prediction accuracy with a stable verification score means the optimizer is shipping edits that don't actually improve the targeted tasks. This is the *signature* of under-exploration.

## Boundary with Related Concepts

- **[[operational-mirror]]** — Under-exploration is the mirror's third predicted pathology; the Planner is the mirror's architectural defense
- **[[reward-hacking]]** — The mirror's first pathology; the *upward* failure mode (verification score rises but task isn't solved)
- **[[catastrophic-forgetting]]** — The mirror's second pathology; the *sideways* failure mode (improvement on one cluster regresses another)
- **[[variant-isolation]]** — Reduces under-exploration on heterogeneous task sets by allowing K harnesses to evolve different edit neighborhoods in parallel
- **[[evolving-context]]** — Under-exploration is the *structural* analog: at the prompt/skill level, under-exploration is "the agent doesn't try new skills"; at the harness level, it's "the agent doesn't try new harness dimensions"
- **[[satisfaction-of-search]]** — The agent-side analog: the agent stops retrieving after the first plausible answer; under-exploration is the *optimizer-side* analog
- **[[failure-modes]]** — The Master Table entry; the playbook for detection and countermeasures

## Limits of the Defense

The Planner's adaptation landscape is *advisory* — the Evolver can still produce prompt-level edits if the landscape says so. The defense is the *availability* of structural-edit candidates, not their *enforcement*. The mirror authors note (§4.3): "structural changes (decomposing one agent into several, replacing the control strategy, or adopting a new memory architecture) require deliberate hypothesis formation and rarely emerge from trace-conditional local repair." The Planner *surfaces* structural-edit candidates; it does not *force* them.

The empirical limit: on ALFWorld (Sonnet 4.6, R4–R7), the Planner surfaced structural-edit candidates (the processor-level change at R6), but the candidate was unreliable (14% ship-prediction accuracy). The Planner *enables* structural exploration, but the meta-agent's ability to *form* good structural-edit hypotheses is bounded by its training. The mirror's defense is necessary but not sufficient.

From HarnessX §7.3: "The mirror also does not predict which pathology will dominate" — under-exploration may be the dominant pathology for some tasks (ALFWorld), catastrophic forgetting for others (τ3-Bench Telecom), reward hacking for still others (GAIA R10). The Planner is the defense for one of three; the system needs all three defenses in place.

## The Inverse-Scaling Connection

HarnessX's inverse-scaling finding (§6.2) is relevant: weaker task agents (Qwen3.5-9B) gain most from harness evolution (+44.0% on ALFWorld). The proposed explanation: "weaker models exhibit more behavioral gaps addressable by harness-level edits; once baseline is high, remaining failures require task-specific adaptations rather than global improvements." This is the *complement* of under-exploration: when the model has more behavioral gaps, there is more room for harness evolution to explore; when the model is near ceiling, the harness evolution space is exhausted faster, and under-exploration dominates.

The practical implication: under-exploration is *more likely* on strong models with near-ceiling baselines. The Planner's adaptation landscape is the defense, but the system's gain is bounded by the *headroom* in the model's behavior. A weak model with AEGIS may gain more than a strong model without AEGIS — not because the weak model is better, but because the optimization space is larger.

## Thread

- [[harness-engineering]] — The §5.2.3 self-evolution open problem; the mirror's under-exploration pathology is a named risk for any harness evolution system
- [[the-cognitive-cost]] — The inverse-scaling result suggests weaker models + AEGIS may be more cost-effective than strong models without
- [[agent-quality-engineering]] — Ship-prediction accuracy is a new evolution metric; the trace-vs-manifest comparison is the detection signal

## Related

- [[operational-mirror]] — The theoretical framework; under-exploration is one of three predicted pathologies
- [[harnessx]] — The AEGIS Planner is the architectural defense
- [[reward-hacking]] — The first mirror pathology
- [[catastrophic-forgetting]] — The second mirror pathology
- [[variant-isolation]] — Reduces under-exploration by allowing K harnesses to evolve in parallel
- [[evolving-context]] — Under-exploration at the harness level mirrors the agent's "doesn't try new skills" failure mode
- [[satisfaction-of-search]] — The agent-side analog
- [[self-harness]] — The simpler 3-stage loop implicitly defends against under-exploration via the conservative acceptance rule (rejected edits are logged, providing historical signal)
- [[failure-modes]] — The Master Table entry; the playbook for detection and countermeasures
- [[harnessx]] (9-dimension taxonomy, §3.3) — The 9 dimensions that the Planner's adaptation landscape spans; D2 (context) and D4 (tools) are the most-edited

## Sources

- `raw/2606.14249.md` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX.* §4.2 (under-exploration as a predicted pathology), §4.3 (Planner as the architectural defense; adaptation landscape), §6.2 (inverse-scaling: weaker models gain most), §6.6(g) (ALFWorld Sonnet 4.6 R4–R7 case study, ship-prediction accuracy decay), §6.6(h) (GAIA GPT-5.4 R1–R9 belated tool ship), §6.6(i) (WebShop Sonnet 4.6 R1–R7 tool bucket untouched), §7.3 (mirror as design heuristic, not predictive theory).

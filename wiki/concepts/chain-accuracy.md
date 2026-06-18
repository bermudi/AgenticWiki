---
title: Chain Accuracy
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.pdf
tags: [concept, benchmark, evaluation, chain-of-tasks, environment-evolution]
unaudited_marginal: 0
---

# Chain Accuracy

> An evaluation metric where a model is credited with solving an evolution chain only if it solves **every** version in the chain. Stricter than per-instance accuracy because it requires the agent to remain reliable across a dependent sequence of tasks. Introduced by the EvoArena benchmark as one of its two primary metrics (alongside step accuracy). The gap between step accuracy and chain accuracy is the headline finding: solving isolated steps does not translate into chain reliability.

## Definition

A **chain** is a chronologically ordered sequence of versioned task instances that share an underlying objective. Three concrete chain types from EvoArena:

- **Terminal-Bench-Evo chain**: a workflow chain. Correct only if all versions derived from the same initial task are solved under the evaluation protocol.
- **SWE-Chain-Evo chain**: a repository evolution chain. Correct if the longest prefix of consecutively solved milestones from the beginning of the chain reaches the end before the first unsolved or unexecuted milestone. Measured as (longest prefix) / (total chain length).
- **PersonaMem-Evo chain**: a preference-evolution chain. Correct only if all questions grouped into the same preference-evolution chain are answered correctly.

**Chain accuracy** = (number of correct chains) / (total number of chains). It is a strict metric: a single unsolved version collapses the chain to partial credit.

## Why It Matters

Standard benchmarks report per-instance accuracy: a model that solves 50% of tasks is "50% accurate." But deployment is sequential: an agent that solves task 1 but fails task 2 produces no useful work, because task 3 depends on what task 2 should have produced.

Chain accuracy captures this deployment reality. The gap between step accuracy and chain accuracy is a measure of **chain fragility** — how much reliability degrades when the agent must remain consistent across dependent tasks rather than solve each in isolation.

## The Step → Chain Drop

The headline finding from EvoArena: the gap between step accuracy and chain accuracy is large and consistent across all three subsets.

| Subset | Step accuracy (base) | Chain accuracy (base) | Drop |
|---|---|---|---|
| Terminal-Bench-Evo | 43.6% | 21.5% | **−22.1pp** |
| SWE-Chain-Evo | 27.9% | 10.0% | **−17.9pp** |
| PersonaMem-Evo | 47.3% | 40.0% | **−7.3pp** |

Even the strongest frontier model (GPT-5.5) drops substantially:

| Model | Terminal step → chain | SWE step → chain | Persona step → chain |
|---|---|---|---|
| GPT-5.5 | 62.8% → 31.8% (−31pp) | 49.7% → 12.2% (−37.5pp) | 40.0% → 37.5% (−2.5pp) |
| Gemini-3.1-Pro | 53.8% → 39.3% (−14.5pp) | 20.5% → 8.8% (−11.7pp) | 46.4% → 38.8% (−7.6pp) |
| Kimi-K2.6 | 40.8% → 14.9% (−25.9pp) | 30.2% → 8.5% (−21.7pp) | 51.5% → 40.2% (−11.3pp) |

A 30-percentage-point drop is the regime where the metric makes the difference between a usable model and a not-yet-usable model for deployment.

## Why the Drop Happens

Three structural factors:

1. **Compounding errors**: a failure on step t changes the environment for step t+1. In SWE-Chain-Evo this is mitigated by oracle-state progression (the reference patch is applied, not the agent's), but in deployment this is not an option.
2. **State collapse**: an agent that fails to retain prior version's knowledge is brittle on subsequent versions. The state-collapse analysis on SWE-Chain-Evo shows Pass-to-Pass regressions of 9.09% on base agents.
3. **Distribution shift**: an agent that solves a task by exploiting a property of the version it's given (e.g., a default value that no longer applies in the next version) fails on the next version even if its step accuracy was high.

## Chain Accuracy as a Validation Metric

Chain accuracy also serves as a **validation metric** for [[evomem]]: the memory paradigm's gains are larger at chain level than at step level.

| Subset | Step gain from EvoMem | Chain gain from EvoMem | Larger at chain? |
|---|---|---|---|
| Terminal-Bench-Evo | +2.4% | +6.1% | ✓ (2.5×) |
| SWE-Chain-Evo | +0.4% | +2.1% | ✓ (5.3×) |
| PersonaMem-Evo | +1.7% | +3.0% | ✓ (1.8×) |

> [!note] Source-internal note
> The paper's prose (Section 5.2, line 851) describes SWE-Chain-Evo gains as "from 0.5% step accuracy to 2.9% chain accuracy." These numbers are inconsistent with Table 3 (the canonical backbone-averaged table), which reports +0.4% step and +2.1% chain. The page uses the Table 3 numbers, which are more authoritative as averages across the 8 evaluated backbones. The prose may reflect an earlier draft or a per-model subset.

EvoMem helps most when success requires consistent behavior across dependent sequences — the regime chain accuracy measures. The metric is what makes the empirical claim falsifiable: without chain accuracy, the gain from EvoMem would look like a small step-level bump.

## Relationship to Existing Wiki Concepts

- [[evoarena]] — The benchmark that introduced chain accuracy as a primary metric
- [[evomem]] — The paradigm whose gains are largest under chain evaluation
- [[state-collapse]] — The failure mode that chain accuracy exposes: agents that solve individual steps but fail to maintain consistency
- [[deepswe]] — DeepSWE uses standard per-instance accuracy; the 70-point spread is wide enough that chain-level metrics are not yet necessary. Chain accuracy is the next axis beyond contamination/verifier/prompt.
- [[swe-bench-pro]] — Reports per-instance accuracy on static tasks; does not measure chain reliability across version sequences
- [[the-benchmark-crisis]] — Chain accuracy extends the crisis thread with a new axis: not just whether the agent solves the task, but whether it remains reliable across dependent tasks
- [[the-agent-workflow]] — The workflow is naturally sequential; chain accuracy reflects the workflow's actual execution shape
- [[jagged-frontier]] — The uneven step-to-chain drops across models (GPT-5.5 drops 31pp on Terminal, Gemini drops 14.5pp) are jagged-frontier behavior — different models have different chain-fragility profiles
- [[failure-modes]] — Chain fragility is a distinct failure mode that per-instance accuracy cannot detect
- [[compounding-booboos]] — Chain accuracy exposes compounding at the sequence level; per-instance accuracy hides it
- [[verifiability]] — Chain accuracy measures a different kind of verifiability: not "is this output correct?" but "does this sequence of outputs remain consistent?"

## Thread

- [[the-benchmark-crisis]] — Chain accuracy is one of the new metrics the crisis thread now accounts for
- [[the-agent-workflow]] — The workflow's sequential nature makes chain accuracy the deployment-relevant metric

## Related

- [[evoarena]] — The benchmark that defined chain accuracy
- [[evomem]] — The paradigm whose gains are largest under chain evaluation
- [[state-collapse]] — The failure mode chain accuracy exposes
- [[deepswe]] — Complementary benchmark along different axes
- [[swe-bench-pro]] — The static benchmark chain accuracy extends
- [[the-benchmark-crisis]] — The thread chain accuracy extends
- [[failure-modes]] — Chain fragility as a distinct failure mode
- [[compounding-booboos]] — Compounding at the sequence level
- [[verifiability]] — Sequence-level verifiability as a different kind

## Sources

- `raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.pdf` — Xu et al. (NUS + collaborators, arXiv 2606.13681, June 2026). Defines chain accuracy as one of two primary metrics across all three EvoArena subsets and shows the step-to-chain accuracy gap as the headline finding.
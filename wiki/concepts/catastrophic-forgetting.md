---
title: Catastrophic Forgetting
created: 2026-06-17
updated: 2026-07-04
sources:
  - raw/2606.14249.md
tags: [concept, failure-mode, harness-evolution, operational-mirror, optimization, sub-threshold-coupling]
unaudited_marginal: 0
---

# Catastrophic Forgetting

> An optimizer's edit that improves one region of the task distribution silently harms another region, because the edit's effects propagate non-locally through shared context, tools, memory, and control rules. In symbolic harness evolution, the [[operational-mirror|operational mirror]] predicts this as a structural risk: per-edit binary signals miss cross-edit coupling. The [[harnessx|HarnessX]] deterministic gating layer (the seesaw constraint) is the architectural defense; [[variant-isolation|variant isolation]] scopes the seesaw per-variant to prevent cross-cluster regression; the residual failure mode is [[#Sub-Threshold Coupling|sub-threshold coupling]] — interactions between edits that each pass the per-task check but degrade aggregate behavior when combined.

## How It Manifests in Harness Evolution

The [[harnessx]] paper's §6.6 case study (τ3-Bench, Sonnet 4.6, Telecom domain, R2–R9) is the canonical example:

> Evolution on Telecom shipped same-type prompt/processor edits across five consecutive rounds (R2–R6), each appending a "reminder" rule. Compliance rose from 89.5% to 100% at R4, then regressed to 94.7% by R6 as later rules conflicted with earlier ones. The R7 Critic flagged the concentration risk ("All 5 prior ships occupy the same bucket: [prompt, processor]") but still approved the edit for shipping because ship-prediction accuracy remained high (R2–R6: 23/24, 5/6, 4/5, 7/7, 2/3) and no regressions were recorded. The sixth reminder degraded compliance from 94.7% to 80.7% (−14.0%) via cross-rule conflicts that destabilized previously passing tasks.

The pattern: per-edit binary checks pass; aggregate metric (compliance) degrades. The same mechanism appears in [[the-benchmark-crisis|EvoArena's]] state-collapse finding (22.1pp drop from step to chain accuracy on Terminal-Bench-Evo) — the chain accuracy is the *aggregate* metric, and the per-step accuracy is the *per-edit* binary signal.

The most extreme case: HarnessX §6.3 shows that on GAIA (GPT-5.4, 15 rounds, Global strategy), the aggregate accuracy peaks at R4 (73.8%) then collapses to 49.5% by R15 — a peak–final gap of **−24.3%** that far exceeds the per-round binomial 95% confidence interval (±8.5% at n=103, p ≈ 0.74), ruling out evaluation noise and confirming catastrophic forgetting.

## The Detection Signal

The signal that distinguishes catastrophic forgetting from evaluation noise is **the gap between peak and final accuracy** across rounds. If aggregate accuracy rises then falls while per-edit regression tests pass, the cause is cross-edit coupling that the binary signal misses. Specific detection patterns:

- **Peak–final gap** — final < peak by more than the binomial confidence interval
- **Concentration warning** — N consecutive edits target the same dimension (e.g., 5 consecutive same-bucket edits)
- **Cross-domain regression** — improvement on one task cluster coincides with regression on another
- **Sub-threshold coupling** — per-task flip rate is low but aggregate metric drifts

The [[harnessx|AEGIS]] Critic tracks concentration as an *advisory* signal; the deterministic gate tracks per-task regression as a *decisive* signal. Neither catches sub-threshold coupling — that requires *distributional* metrics (chain accuracy, cumulative regression over rounds) layered on top of per-task checks.

## The Architectural Defenses

The [[operational-mirror|operational mirror]] identifies two structural defenses:

1. **The deterministic gating layer (seesaw constraint)** — Rejects any edit that regresses even a single previously-solved task. This catches *direct* forgetting (the same task fails after the edit), but not *coupled* forgetting (the same task's success probability degrades but doesn't cross the per-task threshold).

2. **[[variant-isolation|Variant isolation]]** — Maintains up to K harness variants, scopes the seesaw per-variant, and forks new variants on edit conflicts. This catches *cross-cluster* forgetting (improvements to one task cluster regressing another), but not *intra-cluster* sub-threshold coupling.

The empirical proof: on GAIA (GPT-5.4), the Global strategy (single harness) peaks at 73.8% and collapses to 49.5% (−24.3%); the Ensemble strategy (K variants) maintains 87.4% / 87.4% (peak = final, no forgetting). Variant isolation is the empirical proof that *scoping the seesaw per-variant* resolves cross-cluster catastrophic forgetting on heterogeneous task sets.

## Sub-Threshold Coupling

The mirror's authors explicitly note (HarnessX §6.6d, §7.2) that the seesaw *cannot* detect sub-threshold coupling — interactions between edits that each pass the per-task check but degrade aggregate behavior when combined. The τ3-Bench case (§6.6d) is the canonical example: five edits *each* passed the per-task check, but the sixth (and accumulated) effect was a −14% aggregate regression.

From HarnessX §7.2: "structured trace recording is **necessary for detecting pathologies, but not sufficient for preventing them**. When coupling accumulates below the per-task detection threshold, traces record the symptoms only after damage has occurred."

The unifying principle: *any* iterative edit of a shared substrate with binary regression signals is at risk of sub-threshold coupling. The cure is **distributional metrics** (chain accuracy, cumulative regression over rounds, cross-domain correlation) layered on top of per-task checks. This is the same mechanism that drives [[delegate-52|DELEGATE-52]]'s 25% content loss after 20 user-delegation interactions, and [[the-benchmark-crisis|EvoArena's]] state-collapse chain-accuracy drop. All three are the same failure mode: per-edit binary signals miss sub-threshold coupling in iteratively-edited shared state.

## Boundary with Related Concepts

- **[[operational-mirror]]** — Catastrophic forgetting is one of the mirror's three predicted pathologies; the deterministic gate is the mirror's architectural defense
- **[[reward-hacking]]** — The mirror's first pathology; both share the mechanism of per-edit binary signals missing aggregate effects, but reward hacking is *upward* (the score rises but the task isn't solved) while catastrophic forgetting is *sideways* (the score on related tasks drops)
- **[[under-exploration]]** — The mirror's third pathology; the inverse failure mode (the optimizer fails to find any improvement, not just the wrong improvement)
- **[[variant-isolation]]** — The architectural solution to cross-cluster catastrophic forgetting on heterogeneous task sets
- **[[state-collapse]]** — The memory-evolution analog: prior versions are silently overwritten and lost, even when they remain valid for older deployments
- **[[document-degradation]] / [[compounding-booboos]]** — The user-delegation analog: the same mechanism (per-edit binary signals miss sub-threshold coupling) appears in long-horizon document editing
- **[[verifiability]]** — The bootstrap problem: if the verifier is wrong about why a task failed, the seesaw misclassifies the regression direction

## The Seesaw as a New Quality Primitive

The seesaw constraint is the strongest empirical backpressure mechanism in the harness literature. It enforces a *strict non-regression* invariant: an edit is rejected if it fails any previously-solved task. This is *stronger* than [[self-harness|Self-Harness's]] conservative acceptance rule ("improve at least one split without degrading the other") because it is per-task rather than aggregate — *any* per-task regression = reject.

But the strength has a cost: the seesaw is brittle to sub-threshold coupling. The per-task binary signal misses the *aggregate* trajectory. The [[harness-engineering]] §5.2.1 "oracle adequacy" concern applies here: the seesaw is a *correct* verifier, but its *precision* is bounded. The wiki should distinguish *verifiability* (a yes/no signal) from *precision of verification* (how fine-grained the signal is).

## Thread

- [[harness-engineering]] — The §5.2.3 self-evolution open problem; the mirror's forgetting pathology is a named risk for any harness evolution system
- [[the-verifiability-thesis]] — The bootstrap problem: the precision of the verifier bounds what regression can be detected
- [[the-benchmark-crisis]] — State-collapse (EvoArena) and peak-final gap (HarnessX) are the same mechanism in different domains
- [[the-slop-problem]] — Sub-threshold coupling in iteratively-edited shared state is the same mechanism as document degradation

## Related

- [[operational-mirror]] — The theoretical framework; catastrophic forgetting is one of three predicted pathologies
- [[harnessx]] — The AEGIS deterministic gate is the architectural defense
- [[variant-isolation]] — Scopes the seesaw per-variant to prevent cross-cluster forgetting
- [[reward-hacking]] — The first mirror pathology; the inverse direction of failure
- [[under-exploration]] — The third mirror pathology; the inverse failure mode
- [[state-collapse]] — The memory-evolution analog
- [[document-degradation]] — The user-delegation analog; per-edit binary signals miss sub-threshold coupling
- [[compounding-booboos]] — The DELEGATE-52 evidence; 25% content loss after 20 interactions
- [[self-harness]] — The conservative acceptance rule is an alternative isolation mechanism (data-split level vs. behavior-cluster level)
- [[failure-modes]] — The Master Table entry; the playbook for detection and countermeasures

## Sources

- `raw/2606.14249.md` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX.* §4.2 (catastrophic forgetting as a predicted pathology), §6.3 (GAIA GPT-5.4 peak-final gap −24.3% under Global, +13.6% under Ensemble), §6.6(d) (τ3-Bench Sonnet 4.6 Telecom R7 case study, −14.0% from cross-rule coupling), §7.2 (sub-threshold coupling as residual risk of per-edit binary signals), §7.3 (mirror as design heuristic, not predictive theory).

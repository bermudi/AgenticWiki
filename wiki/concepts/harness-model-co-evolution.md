---
title: Harness-Model Co-Evolution
created: 2026-06-17
updated: 2026-06-17
sources:
  - raw/harnessx-composable-adaptive-evolvable-agent-harness-foundry.pdf
tags: [concept, agent-harness, reinforcement-learning, grpo, self-evolution, co-evolution, cross-harness-grouping]
unaudited_marginal: 0
---

# Harness-Model Co-Evolution

> A training regime that interleaves harness evolution (AEGIS) with model reinforcement learning (cross-harness GRPO) over a **shared replay buffer**. The two updates read the same traces but neither conditions on the other's output within the same iteration; both must complete before the next rollout. The motivation: a better harness cannot supply reasoning capacity the model lacks (the **scaffolding ceiling**), and training the model under a fixed harness leaves new capabilities unexercised (the **training-signal ceiling**). Co-evolution breaks both ceilings — on Qwen3.5-9B, cross-harness GRPO adds +4.3% on GAIA and +5.0% on WebShop beyond harness-only evolution. The marginal cost is one cached forward pass per trajectory plus the gradient steps — no additional rollouts.

## The Two Ceilings

The paper frames the problem as two complementary ceilings on single-axis optimization:

- **Scaffolding ceiling (harness-only).** For a capability-limited small model, harness evolution eventually meets a limit: once the harness exposes the right tools, context, and control flow, the binding constraint becomes whether the frozen model can actually exploit them. No harness edit can supply reasoning capacity the model itself lacks.
- **Training-signal ceiling (model-RL-only).** Training the model under a fixed harness meets a different limit: newly acquired capabilities go unexercised when the scaffold never surfaces the context, tools, or control flow that elicit them. The model is the agent's cognitive core; the harness is its executive apparatus. A sharper apparatus cannot compensate for a weak core, nor a stronger core for an apparatus that never calls on it.

Co-evolution targets the bottleneck: by training the model within the same loop that evolves its harness, the agent improves along both axes simultaneously, breaking the ceiling that either improvement alone would leave in place.

## The Co-Evolution Iteration

Co-evolution operates over the pair `(M_t, H_t)`, where M_t denotes trainable model parameters and H_t denotes the harness configuration at iteration t. The system maintains a **fixed-capacity replay buffer B with FIFO eviction**.

Each iteration proceeds as:

1. **Rollout** — run `(M_t, H_t)` on adaptation batch B_t; observability records each episode as a complete trace τ_i (every model turn, tool call, tool result)
2. **Verification** — a **fixed** verifier scores each trace into a scalar reward r_i. Holding the verifier fixed keeps rewards comparable across harness versions, which the cross-harness advantage requires
3. **Buffer insertion** — append each scored trace to B together with the harness version that produced it; successive rounds accumulate rather than overwrite; FIFO eviction
4. **Harness evolution** — `H_{t+1} ← AEGIS(H_t, B)`, non-parametric
5. **Behavior log-probabilities** — for traces just added, one forward pass under M_t caches token-level log-probs π_θold(τ_i) on disk for use in the GRPO loss; trajectories from earlier rounds reuse values cached at their own insertion
6. **GRPO update** — `M_{t+1} ← GRPO(M_t, B)`, parametric
7. **Advance** to step 1 with the evolved pair `(M_{t+1}, H_{t+1})`

Every trace serves as both AEGIS diagnostic evidence and GRPO training signal. The harness evolution and model update read the same buffer but **neither conditions on the other's output within the same iteration**; both must complete before the next rollout begins.

## Cross-Harness GRPO (§5.3)

Standard GRPO groups trajectories by task. Cross-harness GRPO does the same — **regardless of which `(M_k, H_k)` pair produced them**. Formally, for a task x:

> `G_x = {τ_i ∈ B | task(τ_i) = x} = {τ ∼ Agent(M_k, H_k, x)}_k`

The within-group variation is dominated by **strategy differences** across harness versions, not stochastic sampling noise. The group-relative advantage is:

> `Â(τ_i) = (r_i − μ(G_x)) / (σ(G_x) + ε)`

The model receives gradient signal from **inter-strategy reward contrasts**, rather than from stochastic variation within a fixed strategy alone, which enables it to internalize strategies that succeeded across harness versions.

### Task-level alignment, not action-level
Cross-harness GRPO performs **task-level alignment**: trajectories from different harness versions are grouped by task identity and compared by verifier reward alone. **No action-level alignment is required**, so harness versions with incompatible action spaces (different tool schemas, different prompt structures, different control-flow processors) coexist in the same group without conflict. When computing the policy gradient, each τ_i is replayed under the harness version H_k that produced it — the model's log-probabilities π_θ(τ_i | x) are evaluated against the prompt, tool schema, and observation context that H_k would have constructed at each turn. The GRPO gradient operates entirely on **model output tokens conditioned on harness-specific context**, rather than on harness structural actions or environment transitions. This decouples harness evolution (which may freely alter the action space across versions) from model training (which only requires token-level log-probabilities under each trajectory's own harness context).

### The evolving harness as a structured exploration operator
The evolving harness acts as a **structured exploration operator** for the model's RL: each new H version injects a distinct mode of behavior into the task's sampling distribution, and the advantage in Â commits the model toward whichever modes the verifier scores highest. The exploration breadth that single-policy sampling cannot provide is thus supplied by the evolving scaffold itself.

## The Policy Objective

> `J_GRPO(θ) = E_{x, τ_i∼B} [ min(ρ_i(θ) Â(τ_i), clip(ρ_i(θ), 1−ε_c, 1+ε_c) Â(τ_i)) − β·D_KL(π_θ ∥ π_ref) ]`

Where:
- `ρ_i(θ) = π_θ(τ_i | x) / π_θold(τ_i | x)` is the importance-sampling ratio between the current policy M_k and the checkpoint M_d that generated τ_i
- `ε_c` is the clipping threshold
- `β·D_KL(π_θ ∥ π_ref)` penalizes divergence from the fixed reference model π_ref
- The behavior policy π_θold in the ratio and the reference policy π_ref in the KL term are **distinct**: π_ref = M_0 is fixed throughout training, while π_θold varies per trajectory and must be recovered from the buffer (see §5.4)

## Off-Policy Training over a Mixed-Policy Buffer (§5.4)

The replay buffer is intrinsically off-policy: at iteration t it holds trajectories generated by M_0, M_1, ..., M_t under H_0, H_1, ..., H_t, so the buffer distribution does not match the policy π_θ under update. Recovering π_θold for each buffered trajectory is the central off-policy challenge.

### Behavior policy π_θold
The importance ratio ρ_i(θ) corrects the gap between π_θ and the checkpoint M_k that produced τ_i. Since M_k varies across the buffer, π_θold(τ_i) cannot be recovered from any single model: it is materialized at buffer insertion via **one forward pass under M_k**, cached on disk, and reused at every gradient step. This decouples the cached behavior log-probabilities from the current log-probabilities π_θ(τ_i) recomputed each step.

### Bounded off-policy bias
FIFO eviction caps the buffer at C trajectories; with s samples per round the maximum model-version lag is ⌊C/s⌋ rounds, so every cached π_θold originates within a bounded window of π_θ. The same window bounds harness staleness, so the cross-harness groups mix only recent scaffold versions, and the model is never trained predominantly against an obsolete harness.

### Replay reuse at no added rollout cost
The dominant cost of agentic RL is the rollout (executing the agent in the environment: model decoding, tool calls, verification), not the gradient update. In co-evolution a single round of exploration produces one set of trajectories that serves both updates: the same traces drive AEGIS and, through the shared buffer, cross-harness GRPO. **GRPO consumes trajectories by replay and issues no rollouts of its own.** The marginal cost of adding the model update is therefore confined to (i) one cached forward pass per trajectory to record π_θold and (ii) the gradient steps themselves — both rollout-free. **No trajectory is generated solely to train the model.** Joint optimization is therefore economical: it buys model improvement for the price of offline training compute alone.

## Empirical Results (§6.5, Figure 5)

Two benchmarks, Qwen3.5-9B task agent, comparing harness-only (AEGIS, model frozen) vs. co-evolution (AEGIS + cross-harness GRPO):

| Benchmark | Harness-only peak | Co-evolution peak | Δ (co-evo over harness-only) | End-of-run Δ |
|---|---|---|---|---|
| GAIA-103 (text-only) | 37.4% | 41.7% | **+4.3 pp** | 36.4% → 39.8% |
| WebShop-100 | 49.0% | 54.0% | **+5.0 pp** | 46.0% → 50.0% |
| **Average** | | | **+4.7 pp** | |

The two curves coincide until joint training takes effect (~R4), then diverge, with co-evolution at or above harness-only for the remainder of the run. The gap **persists to the final round** (not just the peak), so co-evolution lifts end-of-run accuracy.

**Co-evolution breaks the scaffolding ceiling.** Harness-only evolution plateaus at ~37% on GAIA and ~49% on WebShop. Co-evolution clears these plateaus: cross-harness GRPO enables the model to internalize strategies from successive harness versions, so later edits build on learned behavior rather than compensating for a fixed model's intrinsic limitations. The gap is wider on WebShop, where more room remains for model-level improvement beyond the harness-only plateau.

### Experimental setup (§6.5)
- Qwen3.5-9B task agent on GAIA text-only subset (103 tasks) and WebShop subset (100 tasks)
- Both subsets evaluated twice per round (averaged for GAIA's web-tool noise)
- Buffer sized as a 4-round sliding window: 824 traces on GAIA (103 × 2 × 4), 400 on WebShop (100 × 1 × 4)
- Learning rate 1×10⁻⁶, GRPO clip ε = 0.2, no KL penalty (β = 0), 5 training steps per round
- GAIA reward: 0.9 × correctness + 0.1 × format; WebShop: native attribute-match (binary, reward = 1.0 only on success)

## The Architectural Choice: Why a Shared Buffer, Not Separate Buffers

A naive alternative would be to run harness evolution and model RL in sequence, each with its own buffer. The paper rejects this for two reasons:

1. **Joint control over both updates is the precondition for co-evolution.** Separate buffers would require the model-RL update to be unaware of which harness version produced each trajectory, defeating the cross-harness grouping criterion (Eq. 2).
2. **Replay reuse.** Running them separately would double the rollout cost. With a shared buffer, one round of exploration serves both updates — the economic argument that makes co-evolution practical.

The shared buffer does create a coordination requirement: the model RL and harness evolution must be controlled by the same system. In practice, this means a single team or organization must own both, which the authors flag as a real-world constraint (see Limitations).

## Relationship to K2 Agent and Other Co-Evolution Systems

The paper notes (§5) that the principle of jointly evolving complementary capability components appears in other settings: **K2 Agent** co-evolves know-what (declarative knowledge) and know-how (procedural skill) for hierarchical mobile device control. The pattern generalizes: when an agent's bottleneck is split between a structural layer and a behavioral layer, evolving both within one loop can break ceilings that single-layer optimization cannot.

The specific innovation in HarnessX is that the structural layer is the **harness** (typed, substitutable, evolvable) and the behavioral layer is the **model** (parametric, RL-trainable), coupled by a shared trace store that serves as the optimization signal for both. The harness's evolution injects **diverse strategies** into the model's RL sampling distribution, addressing the exploration-breadth problem that standard single-policy RL cannot solve.

## Relationship to the Wiki

### Relationship to [[harness-engineering]] §5.2.3
The self-evolving harness open problem is extended by co-evolution to include the model itself. The paper's framing — scaffolding ceiling + training-signal ceiling — is a more complete theory of why self-evolving harnesses plateau and what to do about it.

### Relationship to [[harnessx]]
Co-evolution is Layer 3 of HarnessX; the operational mirror and AEGIS are Layer 2. The three layers compose into a unified improvement loop.

### Relationship to [[operational-mirror]]
The mirror's MDP is extended in co-evolution: states are now (H_t, M_t, T_t), actions are (typed harness edit, GRPO gradient step), and the reward is the same verifier score. The pathology taxonomy is unchanged, but the means of defense is broader — the model update can internalize strategies from failed harness versions, addressing under-exploration in a way pure harness evolution cannot.

### Relationship to [[verifiability]]
Co-evolution amplifies the bootstrapping problem: if the verifier is wrong about why a task failed, both the harness update (AEGIS) and the model update (GRPO) are misled. The trust assumption is the same as in single-axis optimization, but the cost of an untrustworthy verifier is higher because the same bad signal drives two updates.

### Relationship to [[agent-quality-engineering]]
Co-evolution is the most concrete instance of the quality flywheel applied to the harness-model system: traces → per-task summaries → harness evolution + model RL → updated harness + updated model → new traces. The two updates are the flywheel's two output channels.

## Limitations (declared by the authors)

- **Joint control assumption.** Co-evolution requires joint control over both harness evolution and model training. In practice, these concerns are often separated across teams or organizations, making a shared replay buffer impractical without cross-team coordination.
- **No held-out evaluation.** All reported gains are measured on the same task set used for evolution. Co-evolution's overfitting risk is doubled (harness + model), and held-out evaluation is untested.
- **Closed-source meta-agent.** AEGIS requires a capable meta-agent for trace analysis and edit generation. The model RL itself is more standard (GRPO), but the harness update is the rate-limiting step.
- **Two benchmarks, one model family.** The +4.7% lift is measured on Qwen3.5-9B across GAIA and WebShop. Sonnet 4.6 and GPT-5.4 are not co-evolved; the cross-family generalization is unverified.
- **Cross-harness grouping depends on verifier stability.** If the verifier is changed mid-run, cross-harness groups become incomparable, and the advantage signal degrades.

## Thread

- [[harness-engineering]] — Co-evolution is the most complete answer to date to the §5.2.3 self-evolution open problem
- [[the-verifiability-thesis]] — The shared buffer's trust assumption is the same as in single-axis optimization, but the cost of an untrustworthy verifier is higher
- [[agent-quality-engineering]] — The most concrete instance of the quality flywheel applied to the harness-model system
- [[the-agent-workflow]] — Co-evolution is the AFK-phase version of harness engineering at production scale: the harness AND the model improve themselves via trace-driven evolution

## Related

- [[harnessx]] — The foundry that introduces co-evolution as the §5 component
- [[operational-mirror]] — The theoretical framework that co-evolution extends; the MDP is generalized to include model parameters
- [[variant-isolation]] — The companion mechanism for stable evolution on heterogeneous task sets
- [[self-harness]] — The simpler propose-evaluate-accept loop; co-evolution is what HarnessX adds on top
- [[verifiability]] — The bootstrapping problem that bounds all self-evolution systems
- [[agent-observability]] — The shared trace store is the observability substrate that makes co-evolution operational

## Sources

- `raw/harnessx-composable-adaptive-evolvable-agent-harness-foundry.pdf` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX.* §5.1 (co-evolution iteration, 7-step protocol), §5.2 (optimization substrates: non-parametric harness + parametric model), §5.3 (cross-harness GRPO, group-relative advantage, task-level alignment), §5.4 (off-policy training, behavior log-probs caching, bounded off-policy bias, replay reuse at no added rollout cost), §6.5 (Qwen3.5-9B experiments on GAIA + WebShop, +4.7% average over harness-only, end-of-run lift).

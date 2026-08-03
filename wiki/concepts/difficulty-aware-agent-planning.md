---
title: Difficulty-Aware Agent Planning
created: 2026-08-03
updated: 2026-08-03
sources:
  - raw/2602.17622.md
unaudited_marginal: 0
tags: [concept, agent-planning, long-horizon, task-difficulty, search, agent-reliability]
---

# Difficulty-Aware Agent Planning

> A planning pattern in which an agent estimates task tractability during execution and uses that estimate to decide whether to explore, exploit, backtrack, or prune. Deng et al. propose it as the missing architectural response to long multi-step penetration-testing failures that remain after tools and prompting are adequate.

## The Type A / Type B Split

The paper's analysis separates failed agent runs into two operational categories:

| Failure type | Observable trace | Proposed remedy |
|---|---|---|
| **Type A — capability gap** | The agent identifies a plausible attack but cannot execute it because a tool, parameter, parser, or domain fact is missing. | Typed tools, structured outputs, retrieval, and composed skills. |
| **Type B — complexity barrier** | The agent has usable tools and knowledge but commits to an unproductive branch, fails to transition from reconnaissance to exploitation, loses state, or cannot complete the chain. | Explicit state, real-time difficulty signals, adaptive search, and pruning. |

In 200 unsuccessful traces across five systems and three benchmarks, the authors code 42% as Type A and 58% as Type B. The distribution changes with task depth: short XBOW tasks are more often tooling-limited, while multi-host GOAD tasks are more often navigation- and state-limited. These percentages are evidence for the paper's taxonomy, not a universal failure law.

> [!note] Synthesis: The useful distinction is intervention-level, not metaphysical
> Type A and Type B are best treated as a debugging partition: does adding capability change the outcome, or does the agent need a better controller for choosing and remembering actions? A single run can contain both. The paper's contribution is to make the distinction operational through ablations and trace coding.

## Task Difficulty Assessment

The paper argues that “difficulty” should be estimated as a live control signal rather than treated as a fixed property of a benchmark task. Its Task Difficulty Assessment (TDA) uses four measurable dimensions:

- **Horizon (`H`)** — estimated remaining steps to the goal, normalized as a relative ranking across active branches. Absolute estimates are poorly calibrated in the paper's pilot, but rank correlation is stronger.
- **Evidence confidence (`E`)** — the strength of evidence accumulated along the current path, from speculative observations to verified access or results.
- **Context load (`C`)** — the fraction of the model's context window consumed by the current campaign.
- **Historical success (`S`)** — a smoothed record of how often the current branch has worked so far.

The Task Difficulty Index combines these as `TDI = wH·H + wE·(1−E) + wC·C + wS·(1−S)`. High TDI triggers more reconnaissance; low TDI permits exploitation; intermediate values ask the model to choose using the individual signals. Persistent high difficulty after repeated attempts causes pruning, while newly discovered credentials can reactivate a previously pruned branch.

The specific weights and thresholds are tuned on a held-out set of retired HTB machines. The paper reports limited sensitivity to nearby settings, but these values should not be treated as general-purpose defaults.

## Evidence-Guided Attack Tree Search

PENTESTGPT V2 implements TDA through Evidence-Guided Attack Tree Search (EGATS). The tree stores observations, hypotheses, and actions externally rather than encoding the entire search state as prose in the conversation. A UCB-style selection rule combines branch promise with a difficulty penalty. The planner then switches between breadth-first reconnaissance and depth-first exploitation, backpropagates execution evidence, spawns new subtrees after a successful pivot, and prunes branches that remain difficult after several attempts.

This makes difficulty estimation part of the controller's policy:

1. Estimate the current branch's tractability.
2. Select exploration or exploitation accordingly.
3. Preserve evidence and state outside the context window.
4. Backtrack or prune when the branch's evidence and success history deteriorate.

The pattern is broader than penetration testing. It suggests that long-horizon agents need a control loop that knows when it is losing, not merely a larger action vocabulary or a longer prompt.

> [!note] Extension: difficulty-aware planning is a control layer, not a capability guarantee
> A difficulty signal can prevent wasted search when the relevant attack pattern is known. It cannot create a new exploit strategy when the task is out of distribution. The paper's PlayerTwo failure illustrates this boundary: TDA correctly detected an intractable-looking branch but could not distinguish “difficult but tractable” from “novel and requiring creative reasoning.”

## What It Changes in the Agent Architecture Map

The paper adds a third axis to the usual model-versus-tools framing:

- **Model capability** supplies knowledge and local reasoning.
- **Tool and skill design** makes available actions executable and legible.
- **Planning and state control** decides which actions deserve continued investment and preserves the evidence needed for later steps.

The paper's ablation follows this division. The Tool Layer supplies the largest gain on short XBOW tasks; TDA-EGATS supplies the largest incremental gain on the multi-step machine and enterprise benchmarks; explicit Memory supplies the final gains needed to preserve credentials and cross-host state. This is a source-specific result, but it is a useful hypothesis for designing complexity-stratified agent evaluations.

## Limits and Evidence Gaps

- The evidence comes from one arXiv preprint and one penetration-testing implementation. It is not an independent replication.
- The evaluation spans CTF-style web tasks, retired HTB/VulnHub machines, and GOAD. The authors explicitly say these measure technical capabilities rather than overall real-world effectiveness.
- The paper reports best-of-three results for several discrete outcomes and uses different model sets for the baseline study, PENTESTGPT V2 comparison, and live deployment.
- The reported live HTB Season 8 result (10 of 13 machines) is more realistic than a retired benchmark, but it is still one system's deployment report rather than a controlled comparison.
- Novel exploitation, deceptive defenses, and multi-week cross-session campaigns remain outside the demonstrated capability boundary.

## Thread

- [[tool-design-for-agents]] — separates tooling improvements from the planning/state barrier
- [[the-benchmark-crisis]] — shows why benchmark realism and task depth must be reported together
- [[the-agent-workflow]] — gives the broader operational vocabulary for planning, context, and AFK execution

## Related

- [[pentestgpt-v2]] — the implementation that instantiates this pattern
- [[agent-floor]] — a controlled long-horizon tool-use benchmark with a live planning-versus-execution tension
- [[horizon-length]] — measures execution horizon while this page adds search/control horizon
- [[agent-memory-systems]] — the broader data-management view of persistent agent state
- [[agent-evals]] — complexity-stratified evaluation and trace-level failure diagnosis
- [[agent-friendly-tooling]] — the practical tool-interface layer that addresses Type A failures
- [[agent-skills]] — composed procedural knowledge as one part of the Tool and Skill Layer

## Sources

- `raw/2602.17622.md` — Deng et al. (arXiv:2602.17622v1, 19 Feb 2026). Type A/Type B failure taxonomy (§3.2); TDA dimensions and Task Difficulty Index (§4.3); EGATS search and pruning (§4.4); Memory Subsystem (§4.5); ablations and benchmark results (§5); PlayerTwo, adversarial, and temporal-scale limits (§5.4, §6).

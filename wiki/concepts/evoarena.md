---
title: EvoArena
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.pdf
tags: [concept, benchmark, evaluation, agent-memory, environment-evolution, chain-accuracy, code-as-agent-harness]
unaudited_marginal: 0
---

# EvoArena

> A benchmark suite for evaluating LLM agents under **persistent environment evolution** — three subsets where the same workflow, codebase, or user preference is released as a sequence of versioned instances, requiring the agent to adapt to new changes while preserving still-valid prior behavior. The benchmark introduces two distinct evaluation primitives — **chain accuracy** (an agent must solve every step in an evolution chain) and the **PE / IC / CE triplet** (persistent evolution, implicit change, chain evaluation) — that no prior benchmark supports jointly.

## Origin

**EvoArena paper** — Xu, Li, Wu, Lan, Li, Zhou, Jiang, Wang, Luu, Xiong, Park, Hooi, Hu (NUS + SMU + UW + UCL + UPenn + NTU + Recursive + MIT, arXiv 2606.13681, June 2026). Project page: aiden0526.github.io/EvoArena. Code: github.com/Aiden0526/EvoArena. Dataset: huggingface.co/collections/Aiden0526/evoarena.

The motivating gap: most agent benchmarks evaluate on **static environment snapshots**. The interface, rules, task distribution, and success criteria are fixed once the benchmark is constructed. Real deployment is dynamic — APIs evolve, workflows change, codebases accumulate, user preferences shift. EvoArena's bet: persistent environment evolution is a measurable capability, and no existing benchmark isolates it.

## The PE / IC / CE Triplet

EvoArena introduces three properties and audits how prior benchmarks cover them:

| Property | Definition | Prior coverage |
|---|---|---|
| **PE** — Persistent Evolution | The same environment or user state evolves across versions | Only partial (PersonaMem, HorizonBench, GAIA2) |
| **IC** — Implicit Change | The agent must infer or handle changes from context or interaction | Partial (GAIA2, HorizonBench) |
| **CE** — Chain Evaluation | Success is measured over temporally linked task sequences | **Not supported by any prior benchmark** |

EvoArena is the only benchmark in the comparison table with all three checked. This is the structural innovation: prior dynamic benchmarks either refresh tasks (no PE), support event-driven change (no PE / CE), or evaluate each instance independently (no CE).

## The Three Subsets

EvoArena covers three representative evolution regimes — each chosen because it exposes a different **non-stationarity surface**:

### 1. Terminal-Bench-Evo (executable workflow evolution)

Built on top of Terminal-Bench (Merrill et al., ICLR 2026). Each of the 89 original tasks is converted into a chronologically ordered chain of 4-5 versions, where the same workflow objective is preserved while dependencies, interfaces, paths, validation rules, or implementation languages change.

**Construction pipeline (5 stages):** workflow-state analysis → evolution-plan design → inherited version realization → quality control + oracle validation → benchmark assembly. Each version is built by applying its update to the realized environment of the previous version, so the chain is a coherent workflow history rather than independent variants.

**Resulting dataset:** 89 chains × ~5 versions = 441 task instances (352 non-initial). Difficulty mix: 268 medium, 152 hard, 20 easy, 1 expert. Top evolution categories: I/O-output path contract (33.5%), CLI/API surface change (10.5%), format/protocol change (9.9%). Top domains: software engineering (29.5%), system administration (10.0%), security (9.1%).

**Concrete example:** "push hello.html and serve on port 8080" — same goal across 4 versions, but deployment mechanism, served path, permissions, and branch policy each change in sequence.

### 2. SWE-Chain-Evo (software evolution)

Built on real-world open-source repositories (26 repos across web frameworks, infrastructure, observability, security, developer tools, data processing, testing). Each repository's chronological commit history is grouped into coherent milestones (one coherent objective per milestone), then packaged into Docker-evaluable SWE-bench-style tasks.

**Construction pipeline (6 stages):** repository selection → update-window extraction → milestone grouping → task-description synthesis → Docker evaluation construction → chronological chain assembly. Critically, after step t is evaluated, the **reference** milestone update is applied (not the agent's predicted patch) to form the repository state for step t+1. This **oracle-state progression** isolates adaptation to evolving repository states from compounding errors caused by earlier failed agent patches.

**Resulting dataset:** 50 chains from 12 repos × 5–15 steps = 493 chain-step instances (145 unique milestones). Mean chain length 9.86, median 10. Languages: Go (81.9%), Python (18.1%). Cross-step dependency is substantial: 29.8% of non-initial milestones modify at least one file touched by an earlier milestone; 14.2% modify a file touched by the immediately preceding step.

**Concrete example:** The aiohttp chain hardens protocol-facing behavior across 4 milestones — safe legacy cookie handling, multipart header injection guard, parsing with empty values, access-log timezone correctness — preserving existing compatible behavior at each step.

### 3. PersonaMem-Evo (preference evolution)

Built on top of PersonaMem-v2 (Jiang et al., 2025). Each preference dimension is instantiated as an ordered trajectory of latent preference states for the same user — earlier preferences remain in the interaction history as historically grounded evidence while later episodes may revise their strength, scope, style, temporal validity, or applicable conditions.

**Construction pipeline (6 stages):** seed persona expansion + preference cleaning → implicit interaction history construction → temporal preference evolution → preference-inference question generation → dual-blind filtering + answer-option construction → benchmark assembly. The dual-blind filter removes questions that can be answered from the persona profile alone or without the interaction history.

**Resulting dataset:** 10 persona-level conversations, 505 preference-inference questions (avg 50.5/persona). Question types: single-pattern transfer (130), multi-pattern synthesis (129), temporal trajectory prediction (129), conflict resolution (117). Difficulty: 120 easy (L1), 186 medium (L2), 199 hard (L3). Average conversation length: 597 messages / 174.7K tokens — directly testing long-context preference tracking.

**Concrete example:** A user who first prefers to drink coffee on Monday mornings, then tea on weekday mornings, then cappuccino on weekends. The question "What drink should the assistant recommend on Monday morning?" requires distinguishing the latest state (tea on weekdays) from outdated but historically valid states.

## The Two Metrics

### Step Accuracy

The agent solves the current version's task. Standard per-instance accuracy on versioned tasks.

### Chain Accuracy

The agent solves **every** version in the evolution chain. Stricter: a Terminal-Bench-Evo chain is correct only if all versions derived from the same initial task are solved. A SWE-Chain-Evo chain measures the longest prefix of consecutively solved milestones from the beginning of the chain before the first unsolved or unexecuted milestone. A PersonaMem-Evo chain is correct only if all questions grouped into the same preference-evolution chain are answered correctly.

The gap between step accuracy and chain accuracy is itself the central finding:

| Subset | Base step | Base chain | Step → Chain drop |
|---|---|---|---|
| Terminal-Bench-Evo | 43.6% | 21.5% | **−22.1pp** |
| SWE-Chain-Evo | 27.9% | 10.0% | **−17.9pp** |
| PersonaMem-Evo | 47.3% | 40.0% | **−7.3pp** |

Solving isolated steps does **not** translate into reliability across persistent environment evolution. Chain accuracy is the binding metric for deployment.

## Baseline Performance

Across 8 backbones × 3 subsets:

| Model | Terminal-Bench-Evo step | SWE-Chain-Evo step | PersonaMem-Evo step |
|---|---|---|---|
| GPT-5.5 | 62.8% | 49.7% | 40.0% |
| Gemini-3.1-Pro | 53.8% | 20.5% | 46.4% |
| GLM-5.1 | 51.8% | 34.9% | 50.4% |
| MiniMax-M2.7 | 41.0% | 41.4% | 47.5% |
| Kimi-K2.6 | 40.8% | 30.2% | 51.5% |
| Deepseek-V4-Pro | 37.3% | 26.7% | 47.9% |
| Qwen3.6-27B | 37.6% | 11.6% | 43.5% |
| Gemma4-31B | 23.4% | 8.5% | 51.1% |

Even frontier models drop 22pp from step to chain accuracy on Terminal-Bench-Evo. The benchmark is hard in the regime that matters for deployment.

## Failure Mode: State Collapse

The paper names a specific failure mode exposed by EvoArena:

> **State collapse** — most memory-based agents maintain memory as a single latest state, such as a retrieved memory bank or episodic store. This design is effective when newer information safely supersedes older information, but becomes brittle when different environment versions require different behaviors. A workflow permission update, for instance, may overwrite an earlier rule that still applies to an older release, a different organization, or a future rollback. The agent then loses both the previous behavior and the context explaining when it was valid.

State collapse is the failure mode that [[evomem]] is designed to prevent — see [[state-collapse]] for the full wiki page.

## Relationship to Existing Wiki Concepts

- [[the-benchmark-crisis]] — EvoArena exposes a new axis of benchmark failure (environment evolution) that complements the existing three (contamination, verifier failure, prompt distortion). The PE/IC/CE triplet is the structural innovation: prior dynamic benchmarks do not isolate persistent evolution as a measurable capability.
- [[chain-accuracy]] — The metric is one of EvoArena's primary contributions. Most prior benchmarks report per-instance accuracy; EvoArena's chain accuracy exposes the gap between solving an isolated task and remaining reliable across dependent sequences.
- [[evomem]] — The companion paradigm that EvoArena was designed to evaluate. Without EvoArena there is no clear benchmark for whether patch-augmented retrieval actually helps in evolving environments.
- [[state-collapse]] — The named failure mode EvoArena exposes and EvoMem addresses.
- [[deepswe]] — EvoArena and DeepSWE are complementary benchmarks along different axes: DeepSWE isolates contamination/verifier/prompt issues on a static task set with a wide model spread (70 points); EvoArena isolates environment-evolution issues on dynamic task chains with a smaller per-instance spread but a steep step-to-chain drop (22pp).
- [[swe-bench-pro]] — EvoArena's SWE-Chain-Evo subset is explicitly the "evolving" version of SWE-bench-style tasks. The chain-level evaluation is what static benchmarks miss.
- [[benchmark-contamination]] — EvoArena's SWE-Chain-Evo construction explicitly avoids contamination by writing task descriptions from pre-milestone context and natural development signals (commit messages, PR text, tests) while reviewing for description leakage of the reference patch, exact code edits, or solution-specific implementation details.
- [[verifiability]] — EvoArena's terminal and software subsets rely on deterministic test verification (Fail-to-Pass / Pass-to-Pass tests), making them verifiable by construction. The persona subset uses balanced four-way multiple choice with dual-blind filtering to prevent profile-only solutions.
- [[jagged-frontier]] — The uneven baseline results (Gemini-3.1-Pro leads on PersonaMem-Evo but lags on SWE-Chain-Evo) are a jagged-frontier pattern across evolution domains. Different forms of non-stationarity stress different capabilities.

## Thread

- [[the-benchmark-crisis]] — EvoArena's PE/IC/CE triplet extends the crisis thread with a fourth dimension: persistent environment evolution
- [[the-agent-workflow]] — Chain-level evaluation reflects the workflow's actual execution shape: dependent sequences, not isolated tasks

## Related

- [[evomem]] — The memory paradigm EvoArena was designed to evaluate
- [[state-collapse]] — The named failure mode EvoArena exposes
- [[chain-accuracy]] — The chain-level evaluation metric
- [[deepswe]] — Complementary benchmark along the contamination/verifier/prompt axis
- [[swe-bench-pro]] — The static-software benchmark EvoArena extends
- [[benchmark-contamination]] — Construction methodology explicitly designed to avoid contamination
- [[verifiability]] — Test-based verification throughout the terminal and software subsets
- [[jagged-frontier]] — Uneven baseline performance across evolution domains
- [[jundong-xu]] — Lead author of the EvoArena paper

## Sources

- `raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.pdf` — Xu et al. (NUS + collaborators, arXiv 2606.13681, June 2026). *EvoArena: Tracking Memory Evolution for Robust LLM Agents in Dynamic Environments.* The full paper: benchmark construction pipelines (5-6 stages each), PE/IC/CE triplet, version chain assembly with oracle-state progression, main results across 8 backbones × 3 subsets × 5 benchmarks, mechanism analysis, efficiency analysis.
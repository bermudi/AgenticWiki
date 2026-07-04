---
title: Jagged Frontier
created: 2026-05-02
updated: 2026-07-03
sources:
  - raw/2604.15597v1.md
  - raw/many-tier-instruction-hierarchy.md
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md
  - raw/deepswe-benchmark.md
  - raw/2606.16707v1.md
  - raw/the-illusion-of-diminishing-returns.md
tags: [concept, llm-capabilities, domain-variance, delegation, executable-memory]
unaudited_marginal: 0
---

# Jagged Frontier

> The phenomenon where LLM capabilities are not uniformly distributed across tasks or domains; models exhibit strong (and sometimes surprising) performance in certain areas while making severe errors in others.

## Origin

The term "jagged frontier" was coined by Dell'Acqua et al. (2023) to describe the uneven capability surface of AI systems. [[philippe-laban|Laban]] et al. (2026) apply this concept to delegated document editing, demonstrating that capability frontiers are domain-specific and non-monotonic.

## Evidence from [[delegate-52|DELEGATE-52]]

In the [[delegate-52|DELEGATE-52]] benchmark, the jagged frontier is stark:

- **Python** is the only domain (of 52) where most models (17 of 19) achieve "ready" status (≥98% reconstruction after 20 interactions)
- The best model (Gemini 3.1 Pro) is ready in only **11 of 52 domains**
- Models perform well in programmatic or structured domains (Python, DB Schema, Molecule, Chess) but fail severely in natural language and niche domains (Recipe, Fiction, Transit, Textile, Music Notation)
- Two models with near-identical short-horizon performance (GPT 5 vs. Kimi K2.5) diverge sharply over long interactions

## Characteristics

- **Non-transferable**: Capability in one domain does not predict capability in adjacent domains
- **Non-monotonic with scale**: Larger or newer models do not uniformly improve across all domains
- **Task-structure dependent**: Performance is higher where documents have high repetitiveness and structural density, and lower where vocabulary is rich and unrepeated

## Evidence from Instruction Hierarchy

The ManyIH study ([[instruction-hierarchy]]) provides another stark example:

- The GPT-5 system card reports **>99% accuracy** on standard 2-tier instruction hierarchy evaluations, yet GPT 5.4 specifically achieves only **39.5% accuracy** on MANYIH-BENCH with up to 12 tiers
- The capability degrades consistently as tiers increase — near-perfect at the trained 2-tier regime, declining to ~40% at 12 tiers, far beyond training distribution
- Even the representation format matters: switching from ordinal to scalar notation drops accuracy by ≥8% for frontier models (GPT 5.4: 8.4%, Opus 4.6: 8.0%)

This demonstrates the jagged frontier in a single capability axis: models that appear solved at 2-tier conflicts are substantially unsolved at 12-tier conflicts. The frontier is jagged not just across domains, but across scale within a single domain.

## Karpathy's Explanation: RL Circuits and Lab Choices

[[andrej-karpathy|Karpathy]] provides a memorable example that crystallizes the jagged frontier:

> "State-of-the-art Opus 4.7 will simultaneously refactor a 100,000-line codebase or find zero-day vulnerabilities and yet tells me to walk to this car wash. This is insane."

The model asks: "I want to go to a car wash to wash my car and it's 50 meters away. Should I drive or should I walk?" — and the state-of-the-art model says walk. It can refactor 100k LOC but can't reason about why you'd drive 50 meters to a car wash.

Karpathy's explanation for why this happens:

1. **RL circuits**: Models are trained in giant reinforcement learning environments with verification rewards. If your application falls within the domains that received heavy RL training, the model flies. If it falls outside the RL circuits, the model struggles.
2. **Lab data distribution choices**: Capability isn't just about inherent verifiability — it's also about what the labs choose to put in the pre-training data. Chess improved from GPT-3.5 to GPT-4 not because of general progression, but because someone at OpenAI added chess data to the pre-training set.

This means jaggedness isn't a bug to be fixed — it's a structural property of how these models are built. As Karpathy puts it: "We are slightly at the mercy of whatever the labs are doing, whatever they happen to put into the mix. You have to actually explore this thing that they give you that has no manual."

### Animals vs Ghosts

Karpathy frames LLMs as "ghosts" rather than "animals" to explain the jaggedness at a deeper level:

- **Animals**: Biological intelligences shaped by evolution — they have intrinsic motivation, curiosity, empowerment, fun. These drives produce broadly capable, self-correcting intelligence.
- **Ghosts**: Statistical simulation circuits. The substrate is pre-training (statistics) with RL bolted on top — "kind of like increases the dispensages." They're not entities with drives; they're pattern completion machines shaped by data and reward functions.

This framing isn't meant to be scientifically rigorous, but to help users build a better mental model: "If you yell at them, they're not going to work better or worse. It doesn't have any impact." Being suspicious of them — rather than anthropomorphizing — is the right posture.

## Evidence from [[deepswe|DeepSWE]]

The [[deepswe|DeepSWE]] benchmark (Datacurve, 2026) reveals a jagged frontier that existing benchmarks compressed into invisibility. On [[swe-bench-pro|SWE-bench Pro]], models cluster in a narrow 30-point band (35-65%). On DeepSWE — which uses novel tasks, behavioral verification, and neutral prompts — the same models separate into a 70-point spread that matches developer experience:

- GPT-5.5: 70% vs. [[swe-bench-pro|SWE-bench Pro]] 59%
- Claude Opus 4.7: 54% vs. [[swe-bench-pro|SWE-bench Pro]] 64%
- Claude Sonnet 4.6: 32% vs. [[swe-bench-pro|SWE-bench Pro]] 54%
- Gemini 3 Flash: 5% vs. [[swe-bench-pro|SWE-bench Pro]] 35%

The jaggedness isn't just across models — it's within model families. Claude misses stated requirements on multi-part prompts more than any other family (implementing one branch, forgetting the mirror). GPT implements exactly what's asked with high precision. These are stable behavioral traits, not per-run variance.

DeepSWE also reveals that **prompt style** interacts with the jagged frontier. [[swe-bench-pro|SWE-bench Pro]]'s verbose, test-suppressing prompt compresses score differences. DeepSWE's short, behavioral prompt lets the frontier separate. The same model looks different depending on how you ask.

[[horizon-length]] sharpens the same point at a different granularity: on a task where every frontier model is near-perfect on a single step, the *horizon length* they can sustain separates them by an order of magnitude (GPT-5 ~2176 steps vs Claude-4 Sonnet ~432, Grok 4 ~384, Gemini 2.5 Pro ~120) — step-accuracy clusters hide horizon-length spread, just as [[swe-bench-pro|SWE-bench Pro]]'s 30-point band hides DeepSWE's 70-point spread.

## Evidence from Model Regression

The jagged frontier isn't just about different domains — it appears **within a single model generation on a single task**. Nate B Jones (2026) found that GPT 5.5, while dramatically better than its predecessor at catching semantically obvious traps in a data migration test (rejecting "Mickey Mouse" and "ASDF ASDF" as fake customers, flagging a planted $25,000 fake payment), **regressed on backend hygiene** that GPT 5.4 had handled better: missing service code conflicts, leaving payment statuses unnormalized (29 distinct raw values), and building a review UI where different panels disagreed on flagged item counts. The model advanced on semantic intuition while retreating on boring structural discipline — a jagged frontier within the same task, the same model family, the same release.

## Evidence from User Memory: Jaggedness Across Representation

The [[executable-memory|User as Code]] benchmark (Bojie Li, Pine AI, 2026) reveals jaggedness **across representation**, not just across domain. On the same user-history data with the same backbone, the capability frontier separates cleanly by what the representation supports:

| Capability tier | Best representation | Retrieval-based memory | Code-executable memory |
|---|---|---|---|
| Basic Recall (LOCOMO) | Full Context (79.8%) | MemMachine 72.7%, Hindsight 69.7%, A-MEM 51.8%, Mem0 29.3% | UaC 78.8% (within 1.0pp of full-context) |
| Analytical Inference (counts, sums, group-bys) | Full Context + REPL (100%) | MemMachine 43%, Mem0 6% | UaC 99% |
| Active Service (proactive alerts) | UaC + constraint pipeline (100%) | Mem0 (live) 90%, A-MEM 30% | UaC 85% (hard) |

The divide is between **representations a code tool can read** (UaC, FC+REPL, Full Context for small N) and **representations only retrievable by similarity** (Mem0, MemMachine). The former scale with N; the latter do not. MemMachine collapses from 100% at N=20 to 15–25% at N=200–500 on aggregate queries. Mem0 sits near zero throughout because NL fact stores cannot be enumerated.

The jaggedness is a **structural property of retrieval, not a model failure**: top-k retrieval can return at most the top-k records, but aggregate queries need every record. No amount of model improvement will fix this — the representation is the bottleneck. Karpathy's verifiability thesis explains why: code is verifiable, retrieval isn't, and a model is only as capable as its verifiability allows.

This is concrete empirical evidence for the [[the-verifiability-thesis|verifiability thread]]'s claim that the frontier is jagged, and the executable-memory result extends the thesis: the jaggedness isn't just across domains (code vs. aesthetics) — it's also across representations (text vs. typed code) within a domain (user memory). Switching representations is a way to navigate the frontier.

## Implications

Users of AI systems should be cautious not to generalize an LLM's capability in one domain to other domains. A model that is reliable for Python coding may be severely unreliable for spreadsheet editing, music notation, or creative writing. This has direct implications for [[vibes-based-engineering|vibe coding]] and [[afk-agent|AFK delegation]]: domain expertise cannot be assumed.

## Thread
- [[the-verifiability-thesis]] — The verifiability thesis explains why the frontier is jagged: it's not a bug, it's a structural consequence of RL training
- [[the-slop-problem]] — Jagged frontier means slop risk is domain-dependent; capability in one area cannot be assumed in others
- [[the-human-lever]] — Capability unevenness means human domain judgment is irreplaceable; models can't self-assess where their frontier is jagged
- [[agent-quality-engineering]] — Evals must be domain-specific because capability is uneven across domains
- [[the-benchmark-crisis]] — DeepSWE exposes a wider jagged frontier than SWE-bench Pro could measure: 70-point spread vs. 30-point

## Related
- [[deepswe]] — The benchmark that reveals the true width of the jagged frontier in coding agents
- [[swe-bench-pro]] — The benchmark that compressed the jagged frontier into a narrow band
- [[benchmark-contamination]] — Contamination hides the jagged frontier by compressing score ranges
- [[verifiability]] — Karpathy's economic theory of why the frontier is jagged: RL circuits + lab data distribution choices
- [[agentic-engineering]] — The engineering discipline for navigating spiky, fallible agents
- [[vibe-coding]] — Exploits the verifiable peaks of the jagged frontier
- [[the-agent-workflow]] — The workflow must navigate jagged capability: delegate to agents where models peak, keep humans where they don't
- [[andrej-karpathy]] — Originator of the RL circuits explanation and the animals vs ghosts framing
- [[delegate-52]] — Empirical demonstration of the jagged frontier across 52 domains
- [[document-degradation]] — Degradation severity follows the jagged frontier pattern
- [[vibes-based-engineering]] — Generalizing capabilities across domains is a vibes failure mode
- [[the-human-lever]] — Humans must own domain boundary decisions because models can't
- [[agent-floor]] — AgentFloor demonstrates the jagged frontier empirically: small models match GPT-5 on some tiers but all collapse at the same planning ceiling
- [[model-routing]] — Model routing is a practical application of the jagged frontier: exploit model strengths, route around weaknesses
- [[horizon-length]] — step-accuracy clusters hide horizon-length spread; execution length is an axis along which the frontier separates models by an order of magnitude
- [[self-conditioning]] — a frontier that is long-horizon-jagged: the same model is reliable on healed history but degrades on error-laden history
- [[instruction-hierarchy]] — The 2-tier → 12-tier gap is a single-axis case study of the jagged frontier: >99% at training distribution, ~40% one step beyond
- [[knowledge-triplet]] — Model capability degrades precisely where the triplet is weakest: novel domains where neither codebase nor training data provides signal
- [[domain-expertise-as-moat]] — Domain expertise is the deepest form of the jagged frontier: correctness is domain-specific and unverifiable without expertise
- [[executable-memory]] — Concrete empirical evidence that the frontier is jagged across representation, not just across domain: 99% vs 6–43% on analytical inference; 100% on proactive alerts with executable constraints vs 30% with retrieval
- [[verifiability]] — Code is verifiable, retrieval is not; the model is only as capable as its verifiability allows

## Sources
- `raw/2604.15597v1.md` — Domain-level results and implications for users of AI systems
- `raw/many-tier-instruction-hierarchy.md` — MANYIH-BENCH results demonstrating the jagged frontier within a single capability axis: near-perfect at 2 tiers, catastrophic at 12
- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: the car wash example of jaggedness, RL circuits explanation, animals vs ghosts framing, and the practical implication that you must "figure out which circuits you're in for your application."
- `raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md` — Within-model jaggedness: 5.5 advanced on semantic traps but regressed on backend hygiene vs its predecessor, demonstrating non-monotonic capability even within the same task
- `raw/deepswe-benchmark.md` — DeepSWE reveals the true width of the jagged frontier in coding agents: 70-point spread vs. [[swe-bench-pro|SWE-bench Pro]]'s 30-point spread
- `raw/2606.16707v1.md` — Bojie Li (Pine AI, 2026). *User as Code.* Concrete empirical evidence that the jagged frontier is a property of representation, not just domain. On the same user-history data with the same backbone: UaC reaches 99% on analytical inference while retrieval-based systems reach 6–43%; UaC + constraint pipeline reaches 100% on proactive alerts while retrieval-based systems reach 30–90%. The divide is between representations a code tool can read and representations only retrievable by similarity. Switching representations is a way to navigate the frontier.
- `raw/the-illusion-of-diminishing-returns.md` — Sinha, Arun, Goel et al. (ICLR 2026). Evidence that the jagged frontier hides along the horizon-length axis: frontier models near-identical at one step separate by an order of magnitude in sustained execution length (§3.3); and the frontier is jagged across context *content* — the same model reliable on healed history degrades on error-laden history ([[self-conditioning]], §3.2).

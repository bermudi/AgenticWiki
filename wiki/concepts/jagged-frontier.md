---
title: Jagged Frontier
created: 2026-05-02
updated: 2026-05-10
sources:
  - raw/2604.15597v1.pdf
  - raw/many-tier-instruction-hierarchy.md
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md
tags: [concept, llm-capabilities, domain-variance, delegation]
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

## Evidence from Model Regression

The jagged frontier isn't just about different domains — it appears **within a single model generation on a single task**. Nate B Jones (2026) found that GPT 5.5, while dramatically better than its predecessor at catching semantically obvious traps in a data migration test (rejecting "Mickey Mouse" and "ASDF ASDF" as fake customers, flagging a planted $25,000 fake payment), **regressed on backend hygiene** that GPT 5.4 had handled better: missing service code conflicts, leaving payment statuses unnormalized (29 distinct raw values), and building a review UI where different panels disagreed on flagged item counts. The model advanced on semantic intuition while retreating on boring structural discipline — a jagged frontier within the same task, the same model family, the same release.

## Implications

Users of AI systems should be cautious not to generalize an LLM's capability in one domain to other domains. A model that is reliable for Python coding may be severely unreliable for spreadsheet editing, music notation, or creative writing. This has direct implications for [[vibes-based-engineering|vibe coding]] and [[afk-agent|AFK delegation]]: domain expertise cannot be assumed.

## Thread
- [[the-verifiability-thesis]] — The verifiability thesis explains why the frontier is jagged: it's not a bug, it's a structural consequence of RL training
- [[the-slop-problem]] — Jagged frontier means slop risk is domain-dependent; capability in one area cannot be assumed in others
- [[the-human-lever]] — Capability unevenness means human domain judgment is irreplaceable; models can't self-assess where their frontier is jagged
- [[agent-quality-engineering]] — Evals must be domain-specific because capability is uneven across domains

## Related
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
- [[instruction-hierarchy]] — The 2-tier → 12-tier gap is a single-axis case study of the jagged frontier: >99% at training distribution, ~40% one step beyond

## Sources
- `raw/2604.15597v1.pdf` — Domain-level results and implications for users of AI systems
- `raw/many-tier-instruction-hierarchy.md` — MANYIH-BENCH results demonstrating the jagged frontier within a single capability axis: near-perfect at 2 tiers, catastrophic at 12
- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: the car wash example of jaggedness, RL circuits explanation, animals vs ghosts framing, and the practical implication that you must "figure out which circuits you're in for your application."
- `raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md` — Within-model jaggedness: 5.5 advanced on semantic traps but regressed on backend hygiene vs its predecessor, demonstrating non-monotonic capability even within the same task

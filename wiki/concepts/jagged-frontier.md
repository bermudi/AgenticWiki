---
title: Jagged Frontier
created: 2026-05-02
updated: 2026-05-07
sources:
  - raw/2604.15597v1.pdf
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

## Implications

Users of AI systems should be cautious not to generalize an LLM's capability in one domain to other domains. A model that is reliable for Python coding may be severely unreliable for spreadsheet editing, music notation, or creative writing. This has direct implications for [[vibes-based-engineering|vibe coding]] and [[afk-agent|AFK delegation]]: domain expertise cannot be assumed.

## Thread
- [[the-slop-problem]] — Jagged frontier means slop risk is domain-dependent; capability in one area cannot be assumed in others
- [[the-human-lever]] — Capability unevenness means human domain judgment is irreplaceable; models can't self-assess where their frontier is jagged
- [[agent-quality-engineering]] — Evals must be domain-specific because capability is uneven across domains

## Related
- [[delegate-52]] — Empirical demonstration of the jagged frontier across 52 domains
- [[document-degradation]] — Degradation severity follows the jagged frontier pattern
- [[vibes-based-engineering]] — Generalizing capabilities across domains is a vibes failure mode
- [[the-human-lever]] — Humans must own domain boundary decisions because models can't
- [[agent-floor]] — AgentFloor demonstrates the jagged frontier empirically: small models match GPT-5 on some tiers but all collapse at the same planning ceiling
- [[model-routing]] — Model routing is a practical application of the jagged frontier: exploit model strengths, route around weaknesses

## Sources
- `raw/2604.15597v1.pdf` — Domain-level results and implications for users of AI systems

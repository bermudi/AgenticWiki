---
title: Dynamic Trust
created: 2026-05-08
updated: 2026-07-03
sources:
  - raw/yt-agent-trust-vector-study-2026.md
  - raw/the-illusion-of-multi-agent-advantage.txt
  - raw/2603.04474-spark-to-fire-error-cascades.txt
tags: [concept, agents, trust, multi-agent, verification]
unaudited_marginal: 0
---

# Dynamic Trust

> The proposal that trust in multi-agent systems should not be statically assigned to sources but dynamically computed at inference time based on source + time-specific context + provability, with the highest privilege awarded to the most verifiable truth rather than the highest-status source.

## The Problem with Static Trust

The ManyIH paper (see [[instruction-hierarchy]]) assumes privilege values are predetermined by the deployer based on source trustworthiness: a senior architect agent gets privilege 2, a junior Python agent gets privilege 5. A Python middleware tags output strings with privilege tags before they reach the analyzing LLM — the trust assignment is purely a function of which agent produced the output.

[[discover-ai|Discover AI]] argues this is insufficient. Static, source-based trust is blind to real-time context:

- A junior agent that spent 20 loops compiling, testing, and verifying code should potentially outrank a senior agent that hallucinated generic advice from its latent space and did no actual work
- Static rules force the system to execute the senior agent's hallucination over the junior's proven code
- In a burning building, a robot's pre-programmed agent trust hierarchy cannot anticipate the actual situation it encounters — the "manager" agent's instructions may be lethally wrong for the specific room the robot is in

The core insight: **trust is a property of the output, not just the source.** An agent's title or role doesn't guarantee the quality of its specific response in this specific moment.

## Trust = Source + Context + Provability

The video author proposes three components of trust:

1. **Source**: Where did the information come from? (database, agent, sensor, user). This is the paper's dimension — necessary but insufficient.
2. **Time-specific context**: What is happening right now? A fire alarm changes which agent outputs are trustworthy. A breaking API change invalidates cached knowledge.
3. **Provability**: Can the claim be verified? Through sandbox tests, cross-agent validation, metadata checks, world model predictions. If the junior agent's code compiles and passes tests while the senior agent's advice is untestable assertion, provability favors the junior.

The highest privilege should be dynamically awarded at inference time to **the most verifiable truth** — not the highest-status source.

## Dynamic Trust Middleware

The vision is a trust engine running alongside the agent swarm that:

- **Continuously recalculates** trust scores for every piece of data flowing between agents
- **Runs sandbox tests** to validate claims before acting on them — code that compiles and passes tests earns higher trust than assertions
- **Cross-references outputs** from independent agents with different perspectives (visual agent, radar agent, logical agent) — agreement across modalities increases trust
- **Consults a world model** to predict what should happen next and validate agent proposals against physics and common sense
- **Adjustes privilege tags in real-time**, rewriting the `z=value` annotations on data flowing between agents as trust scores evolve

This inverts the paper's model: instead of a Python middleware applying static tags once before the LLM sees anything, a trust engine continuously reevaluates what to trust as new evidence arrives.

## World Models as Trust Anchors

A coherent world model would provide an objective reference for trust calculation — predicting physical outcomes, explaining complexity to all agents in the cluster, and enabling coordinated action at specific locations under specific constraints. The author presents this as a necessary component for real-world robotics deployments where milliseconds matter and static trust hierarchies are lethally brittle.

> [!note] Forward-Looking
> The dynamic trust concept is speculative. The video author acknowledges this and references an upcoming video specifically about world models. The concrete empirical evidence in the wiki currently supports only the paper's findings about static trust assignment failure modes, not the proposed dynamic alternative. This page captures the argument as a design direction, not a validated pattern.

> [!note] Empirical Strengthening: "Expensive Witnesses"
> The [[multi-agent-illusion]] audit (Jwalapuram, Lin et al., 2026) provides empirical support for a stronger version of the dynamic-trust thesis. The paper documents *intra-MAS* trust failures that static source-based assignment cannot detect: in MAS-Zero, the verifier selects the first worker's output 45%+ of the time despite the architecture claiming to coordinate multiple agents. In DyLAN, agents reach unanimous consensus in 70-90% of cases — the "diversity" mechanism is decorative. The paper names these agents "expensive witnesses": they incur full inference cost with near-zero causal influence. The implication for dynamic trust: the trust engine needs to measure the *causal contribution* of each agent to the final answer, not just its source role. An agent that costs 30% of the inference budget and contributes 0% to the decision is a tax. The dynamic-trust framework needs to discount such outputs before propagating them.

> [!note] Implementation: the genealogy governance layer
> [[genealogy-governance|Xie, Zhu, Zhang et al. (2026)]] implement dynamic trust as a hard boundary at the message layer. The governance layer decomposes every inter-agent message into atomic claims, tri-state labels each (Green/Red/Yellow) against a Lineage Graph of confirmed provenance, and enforces blocking with rollback for unverified or contradicted claims. The trust assignment is a property of the claim's verification status against the lineage graph — *not* the source agent's role. This is the "trust is a property of the output, not the source" thesis operationalized: a senior architect's unverified claim is Yellow (held for verification); a junior agent's claim entailed by confirmed lineage is Green (released downstream). The empirical result: ≥89% BICR across operating modes, vs. 0.32 for agent-level self-reflection — the static-trust baseline fails precisely because it trusts the source role over the claim's verifiability.

## Thread
- [[agent-quality-engineering]] — Dynamic trust middleware is a proposed quality infrastructure component for multi-agent systems: trust scoring as a continuous eval
- [[the-agent-workflow]] — Dynamic trust changes the workflow: agents don't just execute, they continuously verify and re-rank whose output to trust

## Related
- [[instruction-hierarchy]] — The static framework that dynamic trust aims to extend; the paper's findings motivate the need for something beyond static assignment
- [[verification-loop]] — Provability as a trust component is the verification loop applied at the inter-agent level: test before you trust
- [[backpressure]] — Dynamic trust scores as soft backpressure: low-trust outputs are mechanically deprioritized before they influence decisions
- [[context-engineering]] — Real-time context injection is the mechanism for the "time-specific context" component of trust
- [[model-routing]] — Parallel concept: route to the cheapest capable model; dynamic trust: route authority to the most verifiable output
- [[discover-ai]] — The creator who proposed this framework
- [[multi-agent-illusion]] — the [[functional-collapse|expensive-witness]] finding strengthens the dynamic-trust thesis: trust should be a property of the output, measured causally
- [[functional-collapse]] — the documented failure modes that dynamic trust middleware would need to address
- [[multi-agent-code-orchestration]] — the broader topology taxonomy; the trust engine operates on instances of these topologies
- [[genealogy-governance]] — the implemented dynamic-trust boundary: tri-state claim labeling against a Lineage Graph; trust is a property of the claim's verification status, not the source role
- [[error-cascades]] — the propagation model the governance layer's dynamic trust is designed to break; βρ(A) > δ is the condition under which static source-based trust fails catastrophically

## Sources

- `raw/yt-agent-trust-vector-study-2026.md` — [[discover-ai|Discover AI]]'s critique of static trust assignment and proposal for dynamic trust middleware based on source + context + provability
- `raw/the-illusion-of-multi-agent-advantage.txt` — Jwalapuram, Lin et al. (2026). The "expensive witness" finding (MAS-Zero positional bias, DyLAN consensus collapse) is the empirical support for the dynamic-trust thesis's claim that trust should be a property of the output, not the source.
- `raw/2603.04474-spark-to-fire-error-cascades.txt` — Xie, Zhu, Zhang et al. (City University of Macau + Minzu University, arXiv 2603.04474v2, 11 May 2026). §VI the genealogy governance layer (tri-state claim labeling against a Lineage Graph; ≥89% BICR vs. 0.32 for self-reflection). Source for the "Implementation" callout.

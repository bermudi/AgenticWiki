---
title: Verifiability
created: 2026-05-09
updated: 2026-05-09
sources:
  - "raw/Andrej Karpathy From Vibe Coding to Agentic Engineering - youtube.com.md"
tags: [concept, ai-capability, reinforcement-learning]
---

# Verifiability

> [[andrej-karpathy|Andrej Karpathy]]'s framework for understanding what AI automates: traditional computers automate what you can *specify* in code; LLMs automate what you can *verify*. This explains why AI capabilities are jagged — they cluster in domains where reinforcement learning rewards are available.

## The Core Argument

Frontier labs train LLMs in giant reinforcement learning environments. The models receive verification rewards — did the output pass the test? This training process creates "jagged entities" that peak in capability in verifiable domains (math, code) and stagnate where verification is hard (aesthetics, taste, common sense).

Karpathy's framework:

> "Traditional computers can easily automate what you can specify in code. This latest round of LLMs can easily automate what you can verify."

## Why Capability Is Jagged

Jaggedness isn't just about what's inherently verifiable — it's also about **what the labs choose to put in the data distribution**:

- **Verifiability** makes a domain tractable for RL training
- **Economic value** determines whether labs invest in building RL environments for it
- **Data distribution choices** within labs can boost specific capabilities far beyond what general scaling would predict

### The Chess Example

From GPT-3.5 to GPT-4, chess performance improved dramatically. Many assumed this was general capability progression, but "a huge amount of chess data made it into the pre-training set. Just because it's in the data distribution, the model improved a lot more than it would by default." Someone at OpenAI decided to add chess data, and "now you have a capability that just peaked a lot more."

### The Car Wash Example

State-of-the-art models like Opus 4.7 can simultaneously refactor a 100,000-line codebase or find zero-day vulnerabilities — yet they'll tell you to walk to a car wash 50 meters away. "How is it possible? This is insane."

This is the jagged frontier in microcosm: code is a heavily RL'd, heavily data-distributed domain. Common-sense physical reasoning about driving to a car wash is neither.

## Practical Implications

Karpathy's practical takeaway: you're at the mercy of whatever the labs put in the mix. The models have "no manual." You have to explore them:

> "If you're in the circuits that were part of the RL, you fly. And if you're in the circuits that are out of the data distribution, you're going to struggle. You have to figure out which circuits you're in for your application."

If you're not in the circuits, you need fine-tuning and your own work — it won't come out of the box.

For founders: "If you are in a verifiable setting where you could create these RL environments or examples, that actually sets you up to potentially do your own fine tuning. That is fundamentally technology that just works."

### The Verifiability Ceiling May Be Temporary

Karpathy qualifies his own thesis: he ultimately believes that "almost everything can be made verifiable to some extent" — even domains like writing could use "a council of LLM judges" to provide verification rewards. His conclusion, delivered with a laugh: "Everything is automatable."

This creates a tension: jaggedness is a structural feature of today's models, but verifiability itself is extensible. Labs could build RL environments for aesthetics, taste, or simplification — the microGPT problem (models can't simplify code) is a training gap, not a fundamental limit. The jagged frontier may smooth over time as labs expand what they train on.

Threads like [[the-human-lever]] and [[agent-quality-engineering]] each take a different stance on how much of this ceiling is permanent vs. temporary — see their respective tension callouts.

## Relationship to Verification Loops

Verifiability (the economic/capability argument) is distinct from [[verification-loop|verification loops]] (the mechanical process of testing AI output). Verifiability explains *why* AI is good at code — because code is auto-verifiable via tests and type checkers. Verification loops are the *mechanism* by which that verifiability is operationalized in a workflow.

## Thread

- [[the-verifiability-thesis]] — Verifiability is the root mechanism of this thread; this page is the concept it's built around
- [[the-human-lever]] — Verifiability explains which domains need human judgment: the unverifiable ones
- [[the-slop-problem]] — Slop flourishes in domains that are hard to verify; verifiability is the structural defense
- [[agent-quality-engineering]] — Evals are the attempt to make agent quality verifiable

## Related

- [[jagged-frontier]] — Verifiability is the proposed explanation for *why* the frontier is jagged
- [[verification-loop]] — The mechanical process that operationalizes verifiability
- [[software-1-2-3]] — Software 3.0 is only possible because verifiability drives RL-trained capability
- [[agentic-engineering]] — Agentic engineering requires navigating the verifiable/unverifiable boundary
- [[vibe-coding]] — Vibe coding exploits verifiable domains; fails catastrophically in unverifiable ones
- [[andrej-karpathy]] — Originator of the verifiability framework
- [[the-agent-workflow]] — The workflow that operationalizes the verifiable/unverifiable boundary: HITL for unverifiable design decisions, AFK for verifiable implementation
- [[model-routing]] — Routes complex tasks to the cheapest capable model; depends on knowing which domains are verifiable for which models

## Sources

- `raw/Andrej Karpathy From Vibe Coding to Agentic Engineering - youtube.com.md` — Karpathy's Sequoia interview: full articulation of verifiability as the driver of jagged capability, the chess example, the car wash example, and practical implications for founders and developers.

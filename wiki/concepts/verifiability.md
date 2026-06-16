---
title: Verifiability
created: 2026-05-09
updated: 2026-06-16
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/2311.04235v3.txt
  - raw/2407.08440v4.txt
  - raw/2504.21625v6.txt
  - raw/2603.25133v1.txt
tags: [concept, ai-capability, reinforcement-learning]
unaudited_marginal: 0
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

> [!warning] Theory pressure: The Verifier's Capability Bounds Verifiability
> The [[rubric-evaluation|RUBRICEVAL benchmark]] (Pan et al., 2026) adds a second-order constraint to the thesis: even in domains that are structurally verifiable via structured rubrics, the *verifier* (LLM judge) may be unreliable at the required granularity. GPT-4o achieves only 55.97% balanced accuracy on hard rubric-level judgments; Claude-Sonnet-4.5 gets 55.65%. Karpathy's "council of LLM judges" vision for making writing verifiable assumes the judges themselves are competent evaluators at fine granularity — an assumption this benchmark challenges with concrete numbers. The verifiability bottleneck has two dimensions: task verifiability and judge capability. Both must be addressed.

### Why Verifiability Is Not Sufficient

> [!warning] Theory pressure
> The Meeseeks benchmark ([[iterative-self-correction]]) demonstrates that even near-perfect verification (98.4% accuracy) does not guarantee convergence. After 20 rounds of precise feedback, no model exceeds ~91% utility rate. Karpathy acknowledged this boundary in his original framing: "If you're in the circuits that were part of the RL, you fly. And if you're in the circuits that are out of the data distribution, you're going to struggle." The Meeseeks result operationalizes this: you can build a near-perfect evaluator, but if the underlying capability (instruction-following with precise constraints) isn't in the model's RL-trained circuits, feedback alone cannot fully bridge the gap. Verifiability enables improvement; it does not guarantee it.

Threads like [[the-human-lever]] and [[agent-quality-engineering]] each take a different stance on how much of this ceiling is permanent vs. temporary — see their respective tension callouts.

## Relationship to Verification Loops

Verifiability (the economic/capability argument) is distinct from [[verification-loop|verification loops]] (the mechanical process of testing AI output). Verifiability explains *why* AI is good at code — because code is auto-verifiable via tests and type checkers. Verification loops are the *mechanism* by which that verifiability is operationalized in a workflow.

## Thread

- [[the-verifiability-thesis]] — Verifiability is the root mechanism of this thread; this page is the concept it's built around
- [[the-human-lever]] — Verifiability explains which domains need human judgment: the unverifiable ones
- [[the-slop-problem]] — Slop flourishes in domains that are hard to verify; verifiability is the structural defense
- [[agent-quality-engineering]] — Evals are the attempt to make agent quality verifiable
- [[the-benchmark-crisis]] — Public benchmarks are unreliable precisely because they're verifiable artifacts being gamed; verifiability applied to model selection means trusting your own evals, not leaderboards

## Related

- [[jagged-frontier]] — Verifiability is the proposed explanation for *why* the frontier is jagged
- [[verification-loop]] — The mechanical process that operationalizes verifiability
- [[software-1-2-3]] — Software 3.0 is only possible because verifiability drives RL-trained capability
- [[agentic-engineering]] — Agentic engineering requires navigating the verifiable/unverifiable boundary
- [[vibe-coding]] — Vibe coding exploits verifiable domains; fails catastrophically in unverifiable ones
- [[andrej-karpathy]] — Originator of the verifiability framework
- [[the-agent-workflow]] — The workflow that operationalizes the verifiable/unverifiable boundary: HITL for unverifiable design decisions, AFK for verifiable implementation
- [[model-routing]] — Routes complex tasks to the cheapest capable model; depends on knowing which domains are verifiable for which models
- [[domain-expertise-as-moat]] — "Can you tell whether it's right?" is verifiability applied to domain knowledge; the moat exists because domain correctness is unverifiable without expertise
- [[aaron-brethorst]] — Applies verifiability to domain knowledge: the binding constraint shifted from "can you build it?" to "can you tell whether it's right?"

- [[vibes-based-engineering]] — Verifiability explains the boundary where vibes-based engineering works vs. fails
- [[rule-following]] — RuLES's programmatic evaluation is a case study: make rule-following verifiable via deterministic checks, and performance becomes measurable and improvable
- [[inferential-rule-following]] — RuleBench's counterfactual collapse is the negative case: when rules contradict parametric knowledge, the model ignores them — verifiability of the rule text doesn't guarantee the model follows it
- [[iterative-self-correction]] — Meeseeks's code-guided evaluation makes constraint satisfaction verifiable at 98.4% accuracy; the paper shows that even near-perfect verification doesn't guarantee convergence — verifiability is necessary but not sufficient
- [[agent-evals]] — Evals are the practical attempt to make agent behavior verifiable; the quality loop operationalizes verifiability as a measurement discipline
- [[semi-formal-reasoning]] — Structured reasoning templates produce evidence certificates that enable execution-free verification; accuracy improves from 78% to 88–93%
- [[ears-notation]] — EARS is verifiability-by-design applied to the requirements artifact: structured natural language lets deterministic parsers verify requirements without the LLM in the loop
- [[property-based-testing-as-spec]] — The verification layer that translates EARS requirements into falsifiable correctness properties; operationalizes the verifiability thesis at the spec-to-code boundary
- [[system-prompt-effects]] — System prompt optimization (SPRIG) demonstrates that verifiability gains depend on how the prompt is structured, not just what it asks for
- [[semi-formal-reasoning]] — Structured evidence certificates enable execution-free verification; patch equivalence accuracy improves from 78% to 88% by mandating premises and execution traces
- [[aiming-problem]] — Verification agents are a tuning mechanism for the aiming problem: by tuning what verification checks catch, you aim the system toward the desirable subset
- [[self-harness]] — The acceptance rule relies on the verifiability principle: trustworthy pass/fail signals are the substrate for self-evolution

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: full articulation of verifiability as the driver of jagged capability, the chess example, the car wash example, and practical implications for founders and developers.
- `raw/2311.04235v3.txt` — RuLES (Mu et al.): programmatic evaluation makes rule-following verifiable, enabling measurement and improvement
- `raw/2407.08440v4.txt` — RuleBench (Sun et al.): counterfactual rules reveal that verifiability of the rule text doesn't guarantee the model follows it — parametric knowledge dominates
- `raw/2504.21625v6.txt` — Meeseeks (Wang et al.): code-guided evaluation demonstrates that near-perfect verification is achievable, but convergence remains elusive
- `raw/2603.25133v1.txt` — RUBRICEVAL (Pan et al., 2026): rubric-level meta-evaluation showing that even in structurally verifiable domains with structured rubrics, the LLM judge (verifier) may be unreliable at fine granularity (GPT-4o: 55.97% on hard cases) — adds a second-order constraint to the verifiability thesis: verifier capability bounds verifiability

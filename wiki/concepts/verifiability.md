---
title: Verifiability
created: 2026-05-09
updated: 2026-06-18
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/2311.04235v3.txt
  - raw/2407.08440v4.txt
  - raw/2504.21625v6.txt
  - raw/2603.25133v1.txt
  - raw/2606.16707v1.txt
tags: [concept, ai-capability, reinforcement-learning, executable-memory]
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

## Representation as the Verifiability Lever

> [!note] Extension: The representation determines the reach of verifiability
> The thesis argues that verifiability is a property of the *domain* (code is verifiable, aesthetics is not). The [[executable-memory|User as Code]] result (Bojie Li, Pine AI, 2026) extends this: **verifiability is also a property of the *representation***. A user model stored as free text is verifiable only by retrieval (a similarity search). A user model stored as typed Python is verifiable by the interpreter (a deterministic check). The same domain (user memory) yields 6% accuracy on aggregate queries when the representation is text and 99% accuracy when the representation is typed code. The capability gap is not in the model — it's in the representation.

The thesis also implies that verifiability is **inherited from the domain**: code is verifiable because tests and types exist, retrieval isn't verifiable because there's no oracle for "did the right documents come back?" The UaC result adds a complementary move: **the representation can be deliberately structured to enable verification** — typed `date()` objects, deterministic constraints, a manifest with pre-computed alerts. This is the EARS+PBT insight applied to user memory: deliberately engineering the artifact for verifiability rather than waiting for the labs to train on it.

The constraint runner in UaC is the verification boundary: the LLM is not in the loop at check time. Constraints are deterministic Python functions over typed state; the interpreter runs them at every state change. The 100% on Active Service scenarios is a direct result of moving verification off the LLM and onto the interpreter — the same mechanism that gives 88.3% on ContextCov's executable checks. The pattern generalizes: any time a check can be expressed as a deterministic function over a structured representation, the LLM should not be the verifier. The LLM is the *writer* of the check; the interpreter is the *runner*. This is the verifiability thesis operating at the architectural level: a clear separation between "the LLM proposes" and "the deterministic system verifies."

The 99% vs 6% gap on analytical inference is the most concrete empirical evidence for this extension: the same data, the same model, the same question — only the representation differs. The representation is the lever, not the model.

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
- [[executable-memory]] — Concrete evidence that verifiability is a property of representation, not just domain. Typed Python + interpreter = 99% on aggregate queries where text + retrieval = 6%. The interpreter is the verification boundary; the LLM is not in the loop at check time.
- [[proactive-service]] — The constraint runner is the verification mechanism for proactive alerts: deterministic Python functions over typed state, fired on every state change, surfacing 100% of standard Active Service scenarios

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: full articulation of verifiability as the driver of jagged capability, the chess example, the car wash example, and practical implications for founders and developers.
- `raw/2311.04235v3.txt` — RuLES (Mu et al.): programmatic evaluation makes rule-following verifiable, enabling measurement and improvement
- `raw/2407.08440v4.txt` — RuleBench (Sun et al.): counterfactual rules reveal that verifiability of the rule text doesn't guarantee the model follows it — parametric knowledge dominates
- `raw/2504.21625v6.txt` — Meeseeks (Wang et al.): code-guided evaluation demonstrates that near-perfect verification is achievable, but convergence remains elusive
- `raw/2603.25133v1.txt` — RUBRICEVAL (Pan et al., 2026): rubric-level meta-evaluation showing that even in structurally verifiable domains with structured rubrics, the LLM judge (verifier) may be unreliable at fine granularity (GPT-4o: 55.97% on hard cases) — adds a second-order constraint to the verifiability thesis: verifier capability bounds verifiability
- `raw/2606.16707v1.txt` — Bojie Li (Pine AI, 2026). *User as Code.* Concrete evidence that verifiability is a property of representation, not just domain. Same data, same model, same question: 99% on aggregate queries with typed Python + interpreter vs 6% with text + retrieval. 100% on Active Service with constraint pipeline. The LLM is the writer of the constraint; the interpreter is the runner. This is the verifiability thesis at the architectural level: clear separation between "the LLM proposes" and "the deterministic system verifies."

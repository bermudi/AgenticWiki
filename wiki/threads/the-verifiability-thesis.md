---
title: The Verifiability Thesis
created: 2026-05-09
updated: 2026-06-01
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/2311.04235v3.txt
  - raw/2407.08440v4.txt
  - raw/2504.21625v6.txt
  - raw/2603.25133v1.txt
  - raw/2603.00822v2.txt
  - raw/bias-in-the-loop-llm-judge-code.md
  - raw/llm-overcorrection-code-review.md
  - raw/agentic-code-reasoning.md
  - raw/2605.18747.pdf
  - raw/deepswe-benchmark.md
tags: [thread, verifiability, ai-capability, rl, jagged-frontier]
unaudited_marginal: 0
---

# The Verifiability Thesis

> [[andrej-karpathy|Andrej Karpathy]]'s interview traces a causal chain that explains why the AI-assisted development landscape has its current shape: verifiability drives reinforcement learning training, which creates capability peaks and gaps, which makes the capability frontier jagged, which makes [[vibe-coding|vibe coding]] possible on the peaks and unreliable in the gaps, which demands [[agentic-engineering|agentic engineering]] to manage the boundary. This thread traces the causal chain that explains the territory all other threads navigate.

## Thesis

Every pattern in AI-assisted development — vibe coding, agentic engineering, slop, the human lever, [[verification-loop|verification loops]], jaggedness — traces back to a single mechanism: [[verifiability|**verifiability**]]. Karpathy's argument connects them into a causal chain:

```
Verifiability → RL training distribution → capability peaks & gaps → jagged frontier
                                                                      ↓
                                            vibe coding exploits peaks
                                            agentic engineering manages the boundary
```

The other threads in this wiki describe the *symptoms* and *responses*. This thread traces the *cause*.

## The Causal Chain

> [!note] Synthesis
> The causal chain below and the "implications for other threads" sections are the wiki author's synthesis. Karpathy stated the core thesis (verifiability drives RL training, which creates the jagged frontier) in interview form; the systematic mapping to other threads, the recursive application to evaluation and harness layers, and the formalization as a causal chain are constructed here.

### 1. Verifiability Determines Capability

Karpathy's core insight: traditional computers automate what you can *specify* in code; LLMs automate what you can *verify*. Frontier labs train models in giant reinforcement learning environments with verification rewards. The model tries something, gets a score (did the test pass? did the math check out?), and improves.

This means capability clusters around verifiability. Code and math are highly verifiable — tests pass or fail, proofs check or don't — so models excel there. Aesthetics, taste, common-sense reasoning, and simplification are not verifiable in the same way — there are no automated rewards for "this code is elegant" — so models stagnate there.

### 2. Lab Choices Shape the Distribution

Verifiability alone doesn't determine capability. The labs choose what to put in the data distribution. Karpathy's chess example: chess improved dramatically from GPT-3.5 to GPT-4 not because of general scaling, but because someone at OpenAI added chess data to the pre-training set. "Just because it's in the data distribution, the model improved a lot more than it would just by default."

The practical implication: users are "at the mercy of whatever the labs are doing, whatever they happen to put into the mix. You have to actually explore this thing that they give you that has no manual."

### 3. The Jagged Frontier Follows

[[jagged-frontier|Jagged capability]] isn't a bug — it's a structural consequence of how these models are built. The frontier is jagged because:

- Some domains have rich verification rewards (code, math) → models peak
- Some domains are verifiable but the labs don't prioritize them → models don't peak
- Some domains are inherently hard to verify (taste, aesthetics, common sense) → models stagnate

Karpathy's car wash example crystallizes this: Opus 4.7 can refactor 100,000 lines of code and find zero-day vulnerabilities, but tells you to walk 50 meters to a car wash. Code is in the RL circuits; car-wash physics isn't.

### 4. Vibe Coding Exploits the Peaks

[[vibe-coding|Vibe coding]] became possible in December 2024 because models crossed a threshold in their RL-trained domains. When the model is operating in circuits it was trained on (code generation, bug fixing), outputs "just come out fine." You stop correcting. You trust the system.

But this only works on the peaks. Vibe coding the car wash problem would produce a confident, wrong answer. Vibe coding a code refactor works because code is one of the most heavily RL-trained domains in existence.

### 5. Agentic Engineering Manages the Boundary

[[agentic-engineering|Agentic engineering]] is the professional response to this structural reality. If capability is jagged and verifiability determines where the peaks are, the engineering challenge is:

- Know which circuits you're in for your application
- Use agents aggressively where verification is available
- Keep the human in the loop where verification is absent
- "You're still responsible for your software just as before, but can you go faster?"

The intern entity metaphor makes this practical: agents handle the fill-in-the-blanks in verifiable domains; humans own the spec, the design, and the judgment calls in unverifiable ones.

## Implications for Other Threads

### For [[the-slop-problem]]

Slop isn't a moral failing — it's what happens when vibe coding is applied outside the verifiable peaks. The generation-review asymmetry is real, but it's most dangerous where verification is weak. The slop problem is a special case of the verifiability gap.

### For [[the-human-lever]]

The human lever operates precisely where verifiability ends. "Outsource your thinking but not your understanding" because understanding operates in the unverifiable domain. Taste, judgment, and design authority are the human's domain not because humans are magical, but because these things currently have no verification reward in RL training — and may never get good ones.

### For [[domain-expertise-as-moat]]

[[aaron-brethorst|Brethorst]]'s argument is the verifiability thesis applied to domain knowledge. "Can you tell whether it's right?" is Karpathy's question in a new context: domain correctness is the hardest kind to verify because it requires tacit knowledge that no RL environment captures. A logistics dispatcher knows a schedule is wrong the way a type checker knows a type is wrong — but there's no automated reward signal for domain correctness. The binding constraint shifted from "can you build it?" to "can you tell whether it's right?" because building is now verifiable (agents + tests) but domain correctness is not.

### For [[the-agent-workflow]]

The HITL/AFK split maps directly to the verifiable/unverifiable boundary:
- **AFK**: Tasks with clear verification (tests pass, types check, builds succeed)
- **HITL**: Tasks where verification is ambiguous (design decisions, architecture, aesthetics)

The workflow isn't an arbitrary discipline — it's the operationalization of the verifiability thesis. The [[verification-loop]] is the mechanical instantiation of this operationalization — it's what makes the AFK phase work by providing deterministic feedback that keeps the agent in bounds.

### For [[verification-loop]]

If the verifiability thesis is the *why*, the verification loop is the *how*. Verification loops operationalize the thesis at the workflow level: they create the closed-loop feedback that the thesis argues is necessary for reliable agent output. The thesis predicts that verification loops should be most effective in domains with strong deterministic verification (code, types, tests) — which matches the empirical evidence from the ContextCov paper, where deterministic executable checks (88.3% compliance) vastly outperform LLM-based reflection (50.3%).

### For [[agent-quality-engineering]]

Evals are the attempt to make agent behavior verifiable. The quality loop (traces → evals → scorers → code) works by creating artificial verification rewards that mimic RL training. But there's a ceiling: evals can measure and improve behavior *within* the model's RL-trained circuits, but they can't create new capabilities outside them. If the model hasn't been trained on aesthetic judgment, no amount of eval infrastructure will make it develop taste.

The [[rubric-evaluation|RUBRICEVAL benchmark]] (Pan et al., 2026) adds a second dimension to this ceiling: even in verifiable domains like instruction following with structured rubrics, the LLM judge serving as the verifier may be unreliable at fine granularity. GPT-4o achieves only 55.97% accuracy on hard rubric-level judgments. This means the quality infrastructure's measurement layer has its own error rate that compounds with the model capability ceiling — the eval score itself is noisy. The thesis's causal chain (verifiability → RL → capability) implicitly assumes a reliable verifier; RUBRICEVAL shows that assumption may not hold in practice.

### For [[prompts-in-code-review]]

The prompts-in-code-review thread is the verifiability thesis applied to the *evaluation layer* itself. When LLMs act as code judges, the verification mechanism has its own error rate — and that error rate is *systematically biased* by prompt framing, not randomly distributed. [[overcorrection-bias|Overcorrection bias]] (Jin et al.) shows that detailed review prompts shift the decision boundary toward conservatism, rejecting correct code at rates up to 88%. [[llm-as-code-judge|Judge bias]] (Zhao et al.) shows that biases act as positional priors, with accuracy sign-flipping depending on candidate order.

The thesis's causal chain assumes verifiability enables improvement. These papers qualify that assumption: the verifier's own reliability is a *prompt-dependent variable*, not a fixed property. [[semi-formal-reasoning|Semi-formal reasoning]] (Ugare et al.) directly addresses this by making the verification process itself verifiable — the agent must produce an evidence certificate that can be checked independently. This is the thesis operating recursively: verifiability of the verification, not just verification of the code.

### For [[intent-to-code]]

The four positions on the intent-to-code axis are different strategies for managing the verifiability boundary:
- **Specs-as-compiler**: Make the intent maximally verifiable (the spec IS the verification)
- **Plan-as-contract**: Use the plan as a verifiable checkpoint
- **Alignment-first**: Use QA as the verification mechanism ("verify against reality")
- **Pure vibes**: Abandon verification entirely

The axis isn't about philosophical preference — it's about how much verification infrastructure each position builds between intent and code. And where verifiability is absent, no position fully works.

### For [[tool-design-for-agents]]

Agent-native infrastructure is the tooling layer of the verifiability thesis. Tools designed for agents are tools that maximize verifiability: deterministic feedback, structured output, automated checks. Karpathy's complaint — "why are docs telling me what to do instead of what to copy-paste to my agent?" — is a call for tools that don't require unverifiable human judgment to use.

### For [[contextcov|ContextCov]]: Making Instructions Verifiable

[[contextcov|ContextCov]] (Sharma, 2026) is the most direct instantiation of the verifiability thesis in the instruction-following domain. The paper's core claim — that passive text instructions must become executable specifications — is precisely the verifiability thesis applied to Agent Instructions. The results confirm the thesis's predictions:

- **Verifiable instructions outperform unverifiable ones.** Passive instructions (AGENTS.md in context) achieve 67.0% compliance. Making those same instructions verifiable through executable checks achieves 88.3% compliance — a 21.3 percentage point improvement driven entirely by adding verifiability to the enforcement mechanism.
- **LLM reflection makes things worse.** The verifiability thesis predicts that unverifiable domains stagnate. LLM-based critique of constraint compliance (50.3%) was not just ineffective but *harmful* — worse than no enforcement at all. The model's self-assessment of constraint compliance is not verifiable, and the thesis expects it to fail.
- **The "instruction quality feedback loop" extends the thesis.** Section 5.1 describes how enforcement creates pressure to refine instructions — when a check blocks an action, the developer must either confirm the instruction is correct or update it. This is the verifiability thesis operating as a quality mechanism on the documentation itself: instructions become verifiable, and when they aren't, the enforcement reveals it.

The paper also introduces a concept the thesis didn't anticipate: **Executable Interpretability** (Section 5.3). The generated checks materialize the LLM's understanding of the instruction into readable Python code — making the *verification mechanism itself* debuggable. A developer can audit whether the generated Tree-sitter query correctly captures the intent of "use arrow functions." This addresses a gap in the verifiability thesis: verifiability is necessary, but without interpretability of the verifier, you can't tell whether you're verifying the right thing.

### For Rule-Following

Three recent benchmarks provide direct evidence for the verifiability thesis in the domain of rule-following:

**RuLES ([[rule-following]])** demonstrates the positive case. Its programmatic evaluation functions (string comparison + regex) make rule-following *verifiable* — every rule violation is mechanically detectable. This is exactly the condition that enables RL training. The paper's best-of-N experiment confirms the pattern: when you can verify, you can improve without retraining. But current models are terrible at it because labs haven't trained on it — rule-following isn't in the RL distribution.

**RuleBench ([[inferential-rule-following]])** demonstrates the negative case — what happens when verifiability is absent in a domain that looks like it should be verifiable. The counterfactual rule collapse (GPT-4o drops from 99.7% to 8.2% on SALAD (content moderation) when rules contradict training) shows that models don't actually "follow" rules — they pattern-match them to parametric knowledge. The rule text is verifiable (you could check the conclusion), but the model's *process of following* it is not — and without process-level verification, parametric knowledge dominates. The IRFT training approach (synthetic rule-following data → generalization) is essentially building an RL environment for rule application — making the process verifiable.

**Meeseeks ([[iterative-self-correction]])** demonstrates the ceiling. Its code-guided evaluation achieves 98.4% verification accuracy — near-perfect verifiability. Yet even with 20 rounds of perfect feedback, models plateau below 91% utility rate. Verifiability is necessary but not sufficient: you also need the model to be *capable* in the domain. If instruction-following isn't in the RL circuits, no amount of verification feedback within a single session will fully bridge the gap. The [[overcorrection-bias|catastrophic overcorrection]] phenomenon on word counts — models that can't calibrate output magnitude despite precise feedback — is a concrete example of operating outside the RL-trained circuits.

### For [[deepswe|DeepSWE]]: Verifiability of the Verification

[[deepswe|DeepSWE]] (Datacurve, 2026) instantiates the verifiability thesis recursively. The benchmark's core contribution isn't new tasks — it's making the *verification of agent output* verifiable. [[swe-bench-pro|SWE-bench Pro]]'s verifier is inherited from merged PR test suites: these tests weren't designed as complete graders, they miss valid solutions, and they pass partial implementations. DeepSWE's verifiers are purpose-written behavioral tests that accept any correct implementation.

The audit quantifies the gap: [[swe-bench-pro|SWE-bench Pro]]'s verifier disagrees with an independent judge on 32% of trials (8% false positives, 24% false negatives). DeepSWE's verifier disagrees on 1.4%. This is the verifiability thesis operating at the meta-level: you can't trust a benchmark score if the verifier itself isn't reliable. Making verification verifiable — through behavioral tests, transparent rollouts, and independent auditing — is what makes the benchmark trustworthy.

The results confirm the thesis's predictions about capability separation. On [[swe-bench-pro|SWE-bench Pro]] (unreliable verification), models cluster in a 30-point band. On DeepSWE (reliable verification), they separate into a 70-point spread that matches developer experience. The jagged frontier was always there — the verifier just couldn't see it.

DeepSWE also reveals a prompting dimension: [[swe-bench-pro|SWE-bench Pro]]'s prompt tells agents not to write tests, suppressing the self-verification behavior that strong models naturally exhibit. On DeepSWE (neutral prompt), Opus 4.7 and GPT-5.4 write tests on >80% of runs. On [[swe-bench-pro|SWE-bench Pro]], every model drops to 3-28%. The benchmark's prompt doesn't just fail to measure — it actively distorts the capability it claims to evaluate.

### For [[code-as-agent-harness|Code as Agent Harness]]: The Thesis Applied to the Harness Itself

The [[code-as-agent-harness]] survey (Ning et al., 2026), organized into the [[harness-interface|harness interface]] (code for reasoning, acting, environment modeling), [[harness-mechanisms|harness mechanisms]] (planning, memory, tool use, control), and [[harness-engineering|scaling the harness]] (multi-agent orchestration), extends the verifiability thesis from model capabilities to the harness infrastructure. The survey's open problems — harness-level evaluation, semantic verification, self-evolving harnesses — are consequences of the verifiability thesis operating recursively:

- **Harness-level evaluation** (§5.2.1) asks: if end-task success conflates model capability and harness quality, can we make the *harness* verifiable? This is the verifiability thesis applied to the evaluation layer itself.
- **Semantic verification** (§5.2.2) asks: if execution feedback creates a false sense of correctness (weak oracles → overconfidence), how do we make the *verification itself* verifiable? The survey's proposed evidence bundles — each accepted action carries what checks were run, assumptions preserved, and remaining risks — extend the thesis's demand that verification be inspectable and scope-aware.
- **Oracle adequacy** (§5.2.1) surfaces the thesis's central qualification: verifiability is only as good as the oracle. If unit tests are incomplete or checkers are narrow, the agent optimizes against the wrong metric.
- **Self-evolving harnesses** (§5.2.3) push the thesis to its limit: if the harness improves itself using its own verification signals, and those signals are incomplete (oracle inadequacy), the harness will optimize against the wrong metric. Governed harness mutation — each change with a change contract, held-out regression suites, safety invariants — is the thesis's discipline applied to the improvement process.

The survey's four desired properties for future harness systems — **executable**, **inspectable**, **stateful**, **governed** — are the verifiability thesis expressed as design principles. Executable/inspectable are verifiability's preconditions; stateful is verifiability extended across time; governed is verifiability applied to agent autonomy.

## The Long Arc

Karpathy speculates that the verifiability thesis may have an expiration date. If labs eventually train on aesthetics, taste, and simplification — if those enter the RL distribution — the jagged frontier smooths. His uncertainty about whether taste will remain permanently human ("nothing fundamental preventing it, just the labs haven't done it yet") suggests the thesis describes the *current* landscape, not a permanent one.

But "the labs haven't done it yet" has been true for years, and the domains where verification is inherently hard (aesthetics, common sense, judgment) may resist RL training indefinitely. The thesis may describe not just the current transition but a durable structural property of how these systems work.

## Tensions

> [!warning] Can Taste Become Verifiable?
> Karpathy is uncertain whether taste and judgment will remain permanently human or whether they're simply the next RL frontier. "There's nothing fundamental that's preventing it. It's just the labs haven't done it yet, almost." If taste enters the RL training distribution, the human lever shrinks. The wiki's current position (from [[the-human-lever]]) is that taste is an enduring human domain. Karpathy keeps the door open to it being automated. This is a live tension: is the verifiability thesis a permanent map of the territory, or a snapshot of a moving frontier?

> [!warning] Instruction Failure as Feature
> [[deepswe|DeepSWE]] reveals a paradox in instruction-following: Claude partially ignores benchmark instructions (writes tests when told not to, 28% on [[swe-bench-pro]]) while GPT follows them literally. The [[rule-following]] thread frames instruction failure as a reliability bug. But DeepSWE shows that Claude's *ignoring* of harmful instructions ("don't write tests") actually makes it more reliable in practice — it self-verifies at 80%+ when the prompt doesn't suppress testing. The verifiability thesis predicts models improve where verification exists; DeepSWE adds that models which *create their own verification* despite instructions not to may outperform obedient models in the long run. This is a live tension: is instruction-following a capability to optimize, or a liability when the instructions themselves are wrong?

> [!warning] Quality Infrastructure Has a Ceiling
> The [[agent-quality-engineering]] thread argues that evals + observability + flywheel make agents shippable. The verifiability thesis adds a boundary condition: the quality loop works within RL-trained circuits but can't extend beyond them. If a capability is structurally absent from the model's training distribution, measurement alone cannot create it — only fine-tuning (or lab-level RL training) can. The quality infrastructure is necessary but not sufficient.

> [!note] Boundary Condition: Unverifiable Guidance Still Helps Simple Tasks
> The [[context-files|Lulla et al. (2026)]] finding — that AGENTS.md files reduce median runtime by 28.64% and output tokens by 16.58% on small-scope PRs — introduces a boundary condition on the verifiability thesis. The thesis predicts that unverified domains stagnate. Yet unverified context files (their quality is not systematically verifiable) still improve task efficiency. The mechanism is **guidance efficiency**: simply telling the agent where things are and what conventions to follow reduces search time, even if the guidance itself isn't verifiably correct. This operates at the information-theoretic level (reduced entropy in the agent's state space), not the RL training level. The thesis describes model capability evolution; guidance efficiency describes task execution in a single session. They measure different things and both can be true simultaneously.

[//]: # ([[rubric-evaluation]] links here from its ## Thread section)
[//]: # ([[verifiability]] links here from its ## Thread section)
[//]: # ([[agent-evals]] links here from its ## Related section)

## Sources

- `raw/deepswe-benchmark.md` — Datacurve (2026): DeepSWE instantiates the verifiability thesis recursively; behavioral verification makes agent output verifiable; audit shows SWE-bench Pro's verifier fails on 32% of trials; prompt-induced behavior distortion suppresses self-verification
- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: full articulation of verifiability as the driver of jagged capability, the RL circuits framework, the chess example, the car wash example, the vibe coding → agentic engineering arc, and the uncertainty about whether taste can enter the RL distribution.
- `raw/2311.04235v3.txt` — RuLES (Mu et al.): programmatic rule-following evaluation as a case study in making a domain verifiable; best-of-N improvement confirms the verifiability → improvement pattern
- `raw/2407.08440v4.txt` — RuleBench (Sun et al.): counterfactual collapse as evidence that without process-level verification, parametric knowledge dominates given rules
- `raw/2504.21625v6.txt` — Meeseeks (Wang et al.): near-perfect verification (98.4%) still doesn't guarantee convergence — verifiability is necessary but not sufficient
- `raw/2603.25133v1.txt` — RUBRICEVAL (Pan et al., 2026): provides evidence that the verifier's own reliability is a second-order constraint on the verifiability thesis — LLM judges achieve only 55.97% accuracy on hard rubric judgments, qualifying the thesis's assumption that verifiable domains have reliable verification
- `raw/2603.00822v2.txt` — ContextCov (Sharma, 2026): direct instantiation of the verifiability thesis applied to Agent Instructions; verifiable enforcement (88.3%) outperforms passive (67.0%) and unverifiable LLM reflection (50.3%); Executable Interpretability extends the thesis by making the verifier debuggable
- `raw/bias-in-the-loop-llm-judge-code.md` — Zhao et al. (2026): prompt-induced biases in LLM-as-judge for code; biases act as positional priors, qualifying the thesis's assumption of reliable verification
- `raw/llm-overcorrection-code-review.md` — Jin & Chen (2026): overcorrection bias in LLM code review; detailed prompts shift the decision boundary toward conservatism, undermining verifier reliability
- `raw/agentic-code-reasoning.md` — Ugare & Chandra (Meta, 2026): semi-formal reasoning as verifiable certificate structure for code verification; enables execution-free RL reward signals, directly instantiating the verifiability thesis recursively (verifiability of the verification)
- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). Code as Agent Harness survey. Extends the verifiability thesis from model capabilities to the harness infrastructure; harness-level evaluation, semantic verification, and self-evolving harnesses are the thesis operating recursively; the four desired harness properties (executable, inspectable, stateful, governed) are the thesis expressed as design principles

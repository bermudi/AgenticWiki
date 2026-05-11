---
title: The Verifiability Thesis
created: 2026-05-09
updated: 2026-05-10
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/2311.04235v3.txt
  - raw/2407.08440v4.txt
  - raw/2504.21625v6.txt
  - raw/2603.25133v1.txt
  - raw/2603.00822v2.txt
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

**Meeseeks ([[iterative-self-correction]])** demonstrates the ceiling. Its code-guided evaluation achieves 98.4% verification accuracy — near-perfect verifiability. Yet even with 20 rounds of perfect feedback, models plateau below 91% utility rate. Verifiability is necessary but not sufficient: you also need the model to be *capable* in the domain. If instruction-following isn't in the RL circuits, no amount of verification feedback within a single session will fully bridge the gap. The catastrophic overcorrection phenomenon on word counts — models that can't calibrate output magnitude despite precise feedback — is a concrete example of operating outside the RL-trained circuits.

## The Long Arc

Karpathy speculates that the verifiability thesis may have an expiration date. If labs eventually train on aesthetics, taste, and simplification — if those enter the RL distribution — the jagged frontier smooths. His uncertainty about whether taste will remain permanently human ("nothing fundamental preventing it, just the labs haven't done it yet") suggests the thesis describes the *current* landscape, not a permanent one.

But "the labs haven't done it yet" has been true for years, and the domains where verification is inherently hard (aesthetics, common sense, judgment) may resist RL training indefinitely. The thesis may describe not just the current transition but a durable structural property of how these systems work.

## Tensions

> [!warning] Can Taste Become Verifiable?
> Karpathy is uncertain whether taste and judgment will remain permanently human or whether they're simply the next RL frontier. "There's nothing fundamental that's preventing it. It's just the labs haven't done it yet, almost." If taste enters the RL training distribution, the human lever shrinks. The wiki's current position (from [[the-human-lever]]) is that taste is an enduring human domain. Karpathy keeps the door open to it being automated. This is a live tension: is the verifiability thesis a permanent map of the territory, or a snapshot of a moving frontier?

> [!warning] Quality Infrastructure Has a Ceiling
> The [[agent-quality-engineering]] thread argues that evals + observability + flywheel make agents shippable. The verifiability thesis adds a boundary condition: the quality loop works within RL-trained circuits but can't extend beyond them. If a capability is structurally absent from the model's training distribution, measurement alone cannot create it — only fine-tuning (or lab-level RL training) can. The quality infrastructure is necessary but not sufficient.

> [!note] Boundary Condition: Unverifiable Guidance Still Helps Simple Tasks
> The [[context-files|Lulla et al. (2026)]] finding — that AGENTS.md files reduce median runtime by 28.64% and output tokens by 16.58% on small-scope PRs — introduces a boundary condition on the verifiability thesis. The thesis predicts that unverified domains stagnate. Yet unverified context files (their quality is not systematically verifiable) still improve task efficiency. The mechanism is **guidance efficiency**: simply telling the agent where things are and what conventions to follow reduces search time, even if the guidance itself isn't verifiably correct. This operates at the information-theoretic level (reduced entropy in the agent's state space), not the RL training level. The thesis describes model capability evolution; guidance efficiency describes task execution in a single session. They measure different things and both can be true simultaneously.

[//]: # ([[rubric-evaluation]] links here from its ## Thread section)
[//]: # ([[verifiability]] links here from its ## Thread section)
[//]: # ([[agent-evals]] links here from its ## Related section)

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: full articulation of verifiability as the driver of jagged capability, the RL circuits framework, the chess example, the car wash example, the vibe coding → agentic engineering arc, and the uncertainty about whether taste can enter the RL distribution.
- `raw/2311.04235v3.txt` — RuLES (Mu et al.): programmatic rule-following evaluation as a case study in making a domain verifiable; best-of-N improvement confirms the verifiability → improvement pattern
- `raw/2407.08440v4.txt` — RuleBench (Sun et al.): counterfactual collapse as evidence that without process-level verification, parametric knowledge dominates given rules
- `raw/2504.21625v6.txt` — Meeseeks (Wang et al.): near-perfect verification (98.4%) still doesn't guarantee convergence — verifiability is necessary but not sufficient
- `raw/2603.25133v1.txt` — RUBRICEVAL (Pan et al., 2026): provides evidence that the verifier's own reliability is a second-order constraint on the verifiability thesis — LLM judges achieve only 55.97% accuracy on hard rubric judgments, qualifying the thesis's assumption that verifiable domains have reliable verification
- `raw/2603.00822v2.txt` — ContextCov (Sharma, 2026): direct instantiation of the verifiability thesis applied to Agent Instructions; verifiable enforcement (88.3%) outperforms passive (67.0%) and unverifiable LLM reflection (50.3%); Executable Interpretability extends the thesis by making the verifier debuggable

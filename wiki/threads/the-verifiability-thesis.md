---
title: The Verifiability Thesis
created: 2026-05-09
updated: 2026-05-09
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
tags: [thread, verifiability, ai-capability, rl, jagged-frontier]
---

# The Verifiability Thesis

> [[andrej-karpathy|Andrej Karpathy]]'s interview traces a causal chain that explains why the AI-assisted development landscape has its current shape: verifiability drives reinforcement learning training, which creates capability peaks and gaps, which makes the capability frontier jagged, which makes [[vibe-coding|vibe coding]] possible on the peaks and unreliable in the gaps, which demands [[agentic-engineering|agentic engineering]] to manage the boundary. This thread traces the causal chain that explains the territory all other threads navigate.

## Thesis

Every pattern in AI-assisted development — vibe coding, agentic engineering, slop, the human lever, verification loops, jaggedness — traces back to a single mechanism: **verifiability**. Karpathy's argument connects them into a causal chain:

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

The workflow isn't an arbitrary discipline — it's the operationalization of the verifiability thesis.

### For [[agent-quality-engineering]]

Evals are the attempt to make agent behavior verifiable. The quality loop (traces → evals → scorers → code) works by creating artificial verification rewards that mimic RL training. But there's a ceiling: evals can measure and improve behavior *within* the model's RL-trained circuits, but they can't create new capabilities outside them. If the model hasn't been trained on aesthetic judgment, no amount of eval infrastructure will make it develop taste.

### For [[intent-to-code]]

The four positions on the intent-to-code axis are different strategies for managing the verifiability boundary:
- **Specs-as-compiler**: Make the intent maximally verifiable (the spec IS the verification)
- **Plan-as-contract**: Use the plan as a verifiable checkpoint
- **Alignment-first**: Use QA as the verification mechanism ("verify against reality")
- **Pure vibes**: Abandon verification entirely

The axis isn't about philosophical preference — it's about how much verification infrastructure each position builds between intent and code. And where verifiability is absent, no position fully works.

### For [[tool-design-for-agents]]

Agent-native infrastructure is the tooling layer of the verifiability thesis. Tools designed for agents are tools that maximize verifiability: deterministic feedback, structured output, automated checks. Karpathy's complaint — "why are docs telling me what to do instead of what to copy-paste to my agent?" — is a call for tools that don't require unverifiable human judgment to use.

## The Long Arc

Karpathy speculates that the verifiability thesis may have an expiration date. If labs eventually train on aesthetics, taste, and simplification — if those enter the RL distribution — the jagged frontier smooths. His uncertainty about whether taste will remain permanently human ("nothing fundamental preventing it, just the labs haven't done it yet") suggests the thesis describes the *current* landscape, not a permanent one.

But "the labs haven't done it yet" has been true for years, and the domains where verification is inherently hard (aesthetics, common sense, judgment) may resist RL training indefinitely. The thesis may describe not just the current transition but a durable structural property of how these systems work.

## Tensions

> [!warning] Can Taste Become Verifiable?
> Karpathy is uncertain whether taste and judgment will remain permanently human or whether they're simply the next RL frontier. "There's nothing fundamental that's preventing it. It's just the labs haven't done it yet, almost." If taste enters the RL training distribution, the human lever shrinks. The wiki's current position (from [[the-human-lever]]) is that taste is an enduring human domain. Karpathy keeps the door open to it being automated. This is a live tension: is the verifiability thesis a permanent map of the territory, or a snapshot of a moving frontier?

> [!warning] Quality Infrastructure Has a Ceiling
> The [[agent-quality-engineering]] thread argues that evals + observability + flywheel make agents shippable. The verifiability thesis adds a boundary condition: the quality loop works within RL-trained circuits but can't extend beyond them. If a capability is structurally absent from the model's training distribution, measurement alone cannot create it — only fine-tuning (or lab-level RL training) can. The quality infrastructure is necessary but not sufficient.

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: full articulation of verifiability as the driver of jagged capability, the RL circuits framework, the chess example, the car wash example, the vibe coding → agentic engineering arc, and the uncertainty about whether taste can enter the RL distribution.

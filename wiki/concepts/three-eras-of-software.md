---
title: Three Eras of Software
created: 2026-07-27
updated: 2026-07-27
sources:
  - raw/software-engineering-not-writing-code-schillings.md
unaudited_marginal: 0
tags: [concept, history, paradigm, software-engineering]
---

# Three Eras of Software

> [[benoit-schillings|Benoit Schillings]]'s three-phase history of software engineering, each shaped by a different bottleneck: the machine, the human brain, and now the AI. The bottleneck determines how software is written, how teams are structured, and what skills matter.

## The Three Eras

| Era | Period | Bottleneck | Skill that mattered | Software structure |
|---|---|---|---|---|
| **Machine-limited** | Assembly era | Hardware cycles and memory | Precision, speed, every ounce of performance | Tight, hand-optimized code |
| **Human-brain-limited** | Cloud/modular era | Human context window (~7–9 tokens) | Modular design, libraries, decomposition | Functions, classes, systems |
| **AI frontier** | Now | Specification and verification | Architecture, design authority, taste | Whatever the AI generates |

### The Machine-Limited Era

When Schillings started writing code for Apple II and Commodore 64, the fundamental limit was the machine. Computing was expensive and scarce. The craft was extracting maximum performance from constrained hardware — writing assembly language where "you really needed to be incredibly accurate in the way you were writing code."

### The Human-Brain-Limited Era

As computing became cheap, the bottleneck shifted from the machine to the human. Schillings frames this precisely: "A typical human is able to get the context between seven and nine tokens. I mean we have very rich tokens but you compare that to modern ML where the context is basically going to be infinite pretty soon."

This limitation determined how software was structured. Modular design, function decomposition, library abstraction, and "write it only once" philosophy all emerged from the constraint that humans could only hold a small amount of context. The entire software engineering discipline — design patterns, architecture, code review, documentation — was shaped by this cognitive ceiling.

### The AI Frontier Era

> "Writing the code is not the challenge anymore. The bottlenecks are really how do you ensure that that code is what you really wanted because writing the code is easy but getting what is needed for a specific problem can be much harder to specify."

In this era, individual code generation has crossed the superhuman threshold. The remaining challenges are:

- **Specification**: What do you actually want the code to do?
- **Verification**: How do you ensure the mountain of generated code is correct and reliable?
- **Architecture**: How do you design systems that remain manageable at scale?
- **Inductive thinking**: How do you detect patterns and take decisions from a wider context?

Schillings argues humans will occupy the role of architect and inductive thinker for the foreseeable future — looking at systems in wide context, detecting patterns, and making design decisions that have implications from hardware optimization to security to long-term maintainability.

> [!warning] Contradiction: Is Inductive Thinking Permanently Human?
> Schillings asserts humans have a "very clear edge" in inductive thinking for the foreseeable future. Karpathy's [[verifiability|verifiability thesis]] leaves open whether taste, judgment, and pattern recognition are automatable once labs build RL environments that reward them. The "AI frontier era" bottleneck (specification, verification, architecture) may itself yield to training, just as the machine-limited bottleneck yielded to compilers. The thesis's "Can Taste Become Verifiable?" tension applies equally to inductive thinking — the two are not cleanly separable. If inductive thinking enters the RL distribution, the three-era model needs a fourth era.

## Relationship to Karpathy's Three Paradigms

> [!note] Synthesis
> Schillings' three eras and Karpathy's [[software-1-2-3|Software 1.0/2.0/3.0]] track different axes of the same historical shift. Karpathy's framing tracks the **programming substrate**: explicit code → neural network weights → prompts as programs. Schillings' framing tracks the **bottleneck**: machine → human brain → AI. The two framings are complementary, not competing — they describe different facets of the same transition. The wiki author's synthesis is that Schillings' bottleneck-axis explains *why* Karpathy's substrate-shift happened: as each bottleneck resolved (machines got fast, then AI could write code), the programming substrate shifted to match.

## Thread

- [[the-human-lever]] — The three eras explain why the human lever matters now: the AI frontier era shifts human value from writing code to owning design authority
- [[the-verifiability-thesis]] — Each era's bottleneck is shaped by what was verifiable: hardware performance (machine era), modularity (brain era), and now code correctness (AI era)
- [[the-agent-workflow]] — The workflow discipline (HITL for design, AFK for implementation) is the operational response to the AI frontier era's bottleneck

## Related

- [[software-1-2-3]] — Karpathy's parallel three-stage framing tracking the programming substrate (code → weights → prompts)
- [[benoit-schillings]] — Originator of the three eras framework
- [[verifiability]] — The mechanism that drives each era's transition: as verification becomes available in a domain, the bottleneck shifts
- [[peak-programmer]] — The economic consequence of the AI frontier era: implementation is commoditized
- [[cognitive-debt]] — The three eras context for why cognitive skills are eroding: the AI frontier era removes the friction that built those skills
- [[supervision-paradox]] — The era transition creates a paradox: the skills needed for the new bottleneck (architecture, verification) are the ones that atrophy when you delegate implementation
- [[context-engineering]] — The human-brain-limited era's 7–9 token context constraint is the origin story for context engineering as a discipline

## Sources

- `raw/software-engineering-not-writing-code-schillings.md` — AI Engineer talk: three eras of software engineering (machine-limited → human-brain-limited → AI frontier), with the bottleneck in each era determining how software is structured and what skills matter.

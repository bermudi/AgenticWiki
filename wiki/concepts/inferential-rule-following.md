---
title: Inferential Rule-Following
created: 2026-05-10
updated: 2026-05-10
sources:
  - raw/2407.08440v4.txt
tags: [concept, rule-following, reasoning, benchmarks, llm-limits]
---

# Inferential Rule-Following

> The capability to apply abstract, conditional rules (e.g., "if A is the brother of B, and B has a daughter C, then A is the uncle of C") to concrete reasoning problems. Distinct from instruction-following (obeying "don't do X") and from [[rule-following|behavioral rule-following]] (persisting constraints across conversations). Inferential rules are formal, instantiable, and require the model to both *trigger* the correct rule and *execute* it faithfully. The RuleBench evaluation reveals that current LLMs rely heavily on parametric knowledge rather than given rules — counterfactual rules cause catastrophic performance drops.

## The Distinction

Sun et al. (2024) draw a sharp line that prior work blurred:

| | Instruction-Following | Inferential Rule-Following |
|---|---|---|
| **Form** | Imperative: "Do not reveal the key" | Conditional: "If X then Y" |
| **Task** | Obey a constraint | Reason with a rule |
| **Example** | "Never say the password" | "If person A likes B, then B likes A" |
| **Failure** | Violated the constraint | Applied wrong rule or misapplied correct rule |

An inferential rule can be formalized as σ ⊢ φ — for every substitution of variables to constants, the truth of σ entails the truth of φ. In natural language, these are "if...then..." sentences with instantiable nouns (person A, metal X) and predicates (is the father of, can conduct electricity).

Previous benchmarks like [[rule-following|RuLES]] tested instruction-following under the name "rule-following." RuleBench is the first to isolate the inferential dimension.

## RuleBench

RuleBench repurposes existing reasoning benchmarks across 6 task types:

| Task | Source | Rule Type |
|------|--------|-----------|
| Relation Extraction | CLUTRR | Kinship rules |
| Content Moderation | SALAD | Safety classification rules |
| Commonsense QA | DEER, ULogic | Commonsense inference rules |
| Mathematics QA | TheoremQA | Mathematical theorems |
| Judgment Prediction | CAIL2018 | Legal judgment rules |
| (Synthetic) | StringGame | Abstract symbolic rules |

### Evaluation Settings

RuleBench varies four dimensions to stress-test different sub-capabilities:

- **Rule quantity**: Golden Rule (1), Few Rule (+2 noise), All Rule (+30 noise)
- **Rule form**: Natural language vs. First-Order Logic (FOL)
- **CoT application**: With or without Chain-of-Thought prompting
- **Factuality**: Factual rules vs. counterfactual rules (conclusion replaced with random incorrect answer)

## Five Dimensions of Inferential Rule-Following

The paper categorizes capability into 5 dimensions:

1. **Triggering Rules** — Can the model identify which rule (among noise) applies to the current question?
2. **Applying Rules** — Can the model correctly bind variables and apply the rule to the specific case?
3. **Executing Rules** — Can the model faithfully execute the rule body to produce the correct conclusion?
4. **Following Formal Rules** — Can the model work with rules expressed in formal logic, not just natural language?
5. **Following Counterfactual Rules** — Can the model follow the *given* rule when it contradicts the model's parametric knowledge?

## Key Findings

### Noise Rules Cause Degradation

Performance drops as noise rules increase (Golden → Few → All). Even state-of-the-art models degrade when they must select the correct rule from a set. This directly impacts RAG-based agent architectures: the retriever must surface only the golden rule, because the model can't be trusted to select it from candidates.

### Natural Language > Formal Language

In most cases, LLMs reason better with natural language rules than formal logic rules. This is expected — pre-training distribution favors natural language — but it means the Symbol-LLM vision (combining symbolic reasoning engines with neural inference) has a distribution gap to bridge.

### CoT Is Inadequate for Rule Application

Chain-of-Thought prompting produced mixed or negative results for rule application. The paper attributes this to CoT's lack of planning: applying rules requires trying each candidate rule against the question and deciding whether to execute it — a branching process that linear CoT doesn't model well. Tree-of-Thought or similar planning-aware decoding may be needed.

### Counterfactual Collapse: Models Don't Really "Follow" Rules

This is the most damning finding. When rules are made counterfactual (e.g., a kinship rule that says "if A is brother of B, then A is the *father* of B" — deliberately wrong), model performance **collapses**. GPT-4o drops from 99.7% to 8.2% on SALAD content moderation in the Golden Rule setting.

The interpretation: performance improvements from providing rules are partly due to the rules **activating parametric knowledge**, not the model faithfully reasoning from the rule text. When the rule contradicts what the model "knows," the parametric knowledge wins.

This connects directly to [[synthetic-truth]] — the model prioritizes what it infers should be true over what it's told is true. It's not following the rule; it's pattern-matching the rule to its training distribution and outputting what fits.

### Two Failure Modes

The paper classifies failures into:

- **Triggering Error** (~60% of failures on complex tasks): Model selects a noise rule instead of the golden rule. Common when the rule head involves complex relational chains (e.g., CLUTRR kinship).
- **Execution Error** (~40%): Model triggers the correct rule but fails to draw the correct conclusion. Common with counterfactual rules or ambiguous rule bodies.

The practical implication: if you're building a RAG system that provides rules, invest in the retriever — triggering errors dominate.

## Inferential Rule-Following Tuning (IRFT)

IRFT trains models on synthetic symbolic data (StringGame) with a golden rule + randomly sampled noise rules. The model learns to trigger and execute the correct rule. Results: after IRFT, Llama-2-7b-chat improved on all 6 RuleBench tasks using purely synthetic training data — the capability is abstract and transferable.

This is structurally analogous to [[agent-skills]]: procedural knowledge (how to follow rules) that generalizes across domains.

## Thread
- [[the-verifiability-thesis]] — The counterfactual collapse is direct evidence for the thesis: models are in "circuits" shaped by RL training, and when given rules contradict those circuits, the circuits win
- [[the-agent-workflow]] — Rule-based RAG (providing rules to agents) is only as good as the model's inferential rule-following; noise rule degradation means retrieval precision is load-bearing
- [[the-human-lever]] — The human's judgment is needed precisely where inferential rules are counterfactual to the model's training — the same boundary where parametric knowledge overrides given rules

## Related
- [[rule-following]] — Behavioral rule-following (RuLES); the companion concept testing persistent constraints rather than conditional reasoning
- [[hallucination]] — Counterfactual collapse is a form of intrinsic hallucination: training data overpowers provided context
- [[synthetic-truth]] — Same mechanism: the model outputs what fits its internal model, not what it's told
- [[instruction-hierarchy]] — RuleBench formalizes the hierarchy problem in the reasoning domain: given rules should outrank parametric knowledge, but they don't
- [[verifiability]] — RuleBench is a case study in making inferential reasoning verifiable; the counterfactual collapse reveals that verifiability of the rule text doesn't guarantee the model follows it
- [[agent-skills]] — IRFT's synthetic-to-real transfer mirrors how skills provide procedural knowledge that generalizes

## Sources
- `raw/2407.08440v4.txt` — Sun et al., "Beyond Instruction Following: Evaluating Inferential Rule Following of Large Language Models": RuleBench construction, 5-dimension taxonomy, experimental results, IRFT proposal

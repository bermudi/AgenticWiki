---
title: Prompts in Code Review
created: 2026-05-15
updated: 2026-05-16
sources:
  - raw/sprig-system-prompt-optimization.md
  - raw/empirical-system-prompts-code-generation.md
  - raw/bias-in-the-loop-llm-judge-code.md
  - raw/agentic-code-reasoning.md
  - raw/llm-overcorrection-code-review.md
tags: [thread, code-review, prompting, llm-as-judge, overcorrection, bias]
---

# Prompts in Code Review

> How you prompt an LLM to review code is not a neutral framing — it systematically reshapes what the model sees, what it misses, and how it decides. Five papers spanning [[system-prompt-effects|system prompt optimization]], code generation, [[llm-as-code-judge|LLM-as-judge bias]], [[semi-formal-reasoning|semi-formal reasoning]], and [[overcorrection-bias|overcorrection]] reveal that prompt design is a first-class control surface with measurable, sometimes counterintuitive, effects on review quality.

## Thesis

Prompt engineering for code review is not about "improving accuracy" in a monotonic sense — it's about understanding and controlling systematic biases. More detailed prompts do not uniformly help. They trade false rejections for false acceptances, inject positional preferences, amplify overcorrection, and can flip model rankings. The five sources converge on three findings:

1. **Prompt complexity is a bias control, not an accuracy booster.** Increasing prompt detail (explanations, fixes, constraints) systematically shifts the decision boundary toward conservatism — reducing false acceptance of buggy code but dramatically increasing false rejection of correct code. GPT-4o's false negative rate on HumanEval jumps from 26% (Direct prompt) to 73% (Full prompt with explanation + fix). The tradeoff is not small in absolute terms: on MBPP, GPT-4o's false rejections increase from 184 to 451 correct programs when moving from Direct to Full. ([[overcorrection-bias]])

2. **LLM judges are extremely sensitive to prompt framing, even when code is unchanged.** Twelve tested bias types (position, verbosity, authority, CoT, distraction, self-enhancement, refined-version cues, etc.) systematically shift preferences. CoT, authority, refined, and sentiment cues push judges toward the first candidate (near-ceiling accuracy when the first is correct, near-floor when the second is). Verbosity flips preference toward the second candidate. These biases are consistent across tasks (code generation, repair, test generation) and models (Qwen3-4B, Qwen2.5-Coder-3B, GPT). ([[llm-as-code-judge]])

3. **Structured reasoning templates are the most reliable improvement.** [[semi-formal-reasoning|Semi-formal reasoning]] — requiring agents to state premises, trace execution paths per test, and write formal conclusions — reduces errors by nearly half in patch equivalence (78%→88%) and reaches 93% accuracy on real-world patches. This works because the certificate structure prevents the agent from skipping cases or making unsupported claims, addressing the root cause of both [[overcorrection-bias|overcorrection]] and [[llm-as-code-judge|judge bias]].

## The System Prompt as a Control Surface

[[system-prompt-effects|System prompt effects]] are a first-class concern. SPRIG ([[lechen-zhang|Zhang et al.]], ICLR 2026) demonstrates that a single optimized system prompt performs on par with per-task prompt optimization across 47 tasks. The optimized prompts converge on CoT and behavioral components ("decompose first", "rephrase before answering") while notably de-prioritizing role components ("you are an AI assistant"). System prompt optimization searches for high-performance regions in the global activation space, while task prompt optimization performs fine-tuning in local space — they are complementary.

However, the empirical study on code generation by [[zaiyu-cheng|Cheng et al.]] (360 configurations across 4 models, 5 prompts, 3 strategies, 2 languages) reveals that system prompt specificity is **not monotonically beneficial**. More constrained prompts help Java but are neutral or harmful for Python. Few-shot examples severely destabilize larger code-specialized models (Qwen-32B collapses from 37% to 7% on Java with fixed examples under baseline prompt), requiring compensating system prompt constraints to recover. The interaction between system prompt, model scale, and example strategy is complex and configuration-dependent.

## The Overcorrection Trap

[[overcorrection-bias|Overcorrection bias]] ([[haolin-jin|Jin et al.]]) reveals the most direct threat to using LLMs as code reviewers: when asked to explain judgments and propose fixes (Full prompt), models become systematically biased toward rejection. Across five LLMs and three benchmarks:

- GPT-4o: FNR 26.2%→73.2% (HumanEval), 35.9%→87.9% (MBPP)
- Claude-4.5-sonnet: FNR 26.2%→36.0% (HumanEval), 58.5%→62.3% (MBPP)
- Llama-3.1-8B: FNR 57.3%→84.1% (HumanEval), 74.7%→88.2% (MBPP)

Four dominant rejection patterns account for 87.2% of false negatives: Logic Error (48.2%), Added Requirement (14.1%), Boundary Error (13.2%), and Misread Spec (11.7%). These are not superficial style critiques — they represent semantic failure modes where the model constructs plausible but unsupported failure narratives.

The rationales themselves are unreliable. Models produce internally inconsistent explanations (verdict contradicts rationale direction), and while symptom-level diagnosis is strong (≥96% match), cause-level diagnosis is substantially weaker (44–71% match depending on model). A reviewer can be "right for the wrong reason" — correctly rejecting buggy code but misattributing the cause.

## Judge Bias as Positional Prior

The [[llm-as-code-judge|Bias in the Loop]] study demonstrates that prompt biases act as positional priors rather than quality-neutral reasoning aids. The same bias that achieves near-ceiling accuracy when favoring the correct position collapses to near-floor when the correct answer is in the other position. This sign-flip pattern is stable across:

- Tasks: CodeGen, CodeRepair, TestGen
- Models: Qwen3-4B, Qwen2.5-Coder-3B, GPT
- Difficulty levels: amplified on hard instances

Test-retest reliability varies dramatically by model. Qwen2.5-Coder-3B's baseline consistency rate on TestGen is 50.36% — essentially random — but jumps to 80%+ under sentiment or refined cues. This creates a dangerous illusion: the model becomes highly consistent under bias, but systematically wrong. GPT shows the strongest baseline reliability (85–92% CR on CodeGen/CodeRepair) but is still susceptible to distraction and verbosity cues on TestGen.

## Structural Solutions: Semi-Formal Reasoning

[[semi-formal-reasoning|Semi-formal reasoning]] (Meta) addresses these failures at the root by requiring structured evidence certificates. Rather than asking "is this code correct?" and hoping the model reasons well, the template forces the agent to:

1. State explicit premises about what each patch modifies
2. Trace per-test execution paths with evidence
3. Write formal conclusions referencing definitions

This approach improves accuracy across three tasks:
- Patch equivalence: 78%→88% (curated), 93% (real-world with Opus-4.5)
- Code QA (RubberDuckBench): 78.3%→87.0% (Opus-4.5)
- Fault localization (Defects4J): +5–12pp over standard agentic reasoning

The certificate structure directly counters the failure modes identified by the other papers: it prevents hallucinated requirements (the premise must state what the spec says), blocks unsupported logic error claims (the execution trace must show the failure), and eliminates positional bias (the agent traces both patches against the same test suite).

## Tensions

- **More detail vs. more bias:** The [[overcorrection-bias|overcorrection]] and [[llm-as-code-judge|judge-bias]] papers show that richer prompts amplify systematic errors, while [[semi-formal-reasoning|semi-formal reasoning]] shows that *structured* detail helps. The key distinction is the *shape* of the detail — unstructured elaboration invites confabulation; structured evidence mandates verification.
- **Language-dependent sensitivity:** [[system-prompt-effects|System prompt effects]] are dramatically larger for Java than Python across all configurations. This raises the question of whether prompt engineering recommendations are language-specific in ways not yet documented.
- **Judge consistency vs. correctness:** High consistency rates under bias cues do not indicate reliable judging — they indicate the model has found a shortcut. Reporting consistency without bias sensitivity gives false confidence.
- **System prompt optimization vs. manual crafting:** SPRIG's genetically optimized prompts outperform hand-crafted CoT, but the overcorrection study shows that manually adding "think step by step" and fix requests worsens outcomes. Optimization and hand-crafting are not interchangeable.

## Sources

- `raw/sprig-system-prompt-optimization.md` — System prompt optimization via genetic algorithm; system and task prompts are complementary
- `raw/empirical-system-prompts-code-generation.md` — 360-config sweep showing non-monotonic effects of system prompt specificity on code generation
- `raw/bias-in-the-loop-llm-judge-code.md` — 12 prompt-induced biases in LLM-as-judge for code; biases act as positional priors
- `raw/agentic-code-reasoning.md` — Semi-formal reasoning templates improve code verification accuracy by preventing unsupported claims
- `raw/llm-overcorrection-code-review.md` — Overcorrection bias in LLM code review; more detailed prompts increase false rejection; Fix-guided Verification Filter as mitigation

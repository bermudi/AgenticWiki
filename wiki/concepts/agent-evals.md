---
title: Agent Evals
created: 2026-04-27
updated: 2026-05-10
sources:
  - raw/yt-ai-agent-evals-the-4-layers-most-teams-skip.md
  - raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md
  - raw/2604.15597v1.pdf
  - raw/many-tier-instruction-hierarchy.md
  - raw/playground-in-prod-samuel-colvin.md
  - raw/skill-issue-supabase-pedro-rodrigues.md
  - raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md
  - raw/2603.25133v1.txt
tags: [agents, evals, testing, quality, probabilistic-systems]
---

# Agent Evals

> CI for probabilistic systems. Evals measure agent quality on a spectrum (0–1) across dozens or hundreds of inputs, tracking whether quality is holding, improving, or degrading — rather than delivering a binary pass/fail.

Agents don't fail like deterministic software. Output can look correct, logs can look clean, but the agent made the wrong decision somewhere in the middle. Unit tests assume same input → same output. Integration tests assume predictable interfaces, but an agent's interface is natural language. End-to-end tests assume a fixed happy path, but an agent might take 3 steps or 25.

Evals are not tests. They are quality measurement over time.

## Private Bench Design Philosophy

Nate B Jones (2026) advocates for **designing tests that make models fail** — private benchmarks that stress generalization rather than measuring performance on tasks models were explicitly trained to handle. The key principles:

1. **Aim above the frontier**: Design every test so that any frontier model will fail. If models saturate your eval, the eval has become useless.

2. **Test orthogonal capabilities**: Run multiple tests that check different failure modes. A single test can give the wrong story — one test might make a model look like a runaway winner, another reveals dangerous gaps. Together they produce a more complete picture.

3. **Use messy, real-world task shapes**: Under-specified briefs, contradictory source material, messy files in multiple formats, planted traps (obvious and subtle). The eval should test whether the model can "carry" the work — hold context, preserve uncertainty, produce real artifacts, and maintain correct posture across a long task.

4. **Evolve the tests**: As models improve, the tests must get harder. Part of the value of a private bench is that it doesn't publish scores that models can train to saturate.

This philosophy complements [[delegate-52|DELEGATE-52]]'s long-horizon benchmark approach: both argue that easy, public evals systematically overestimate model readiness for real work.

## Long-Horizon Evals: DELEGATE-52

Most agent evals measure single-session or short-horizon performance. [[philippe-laban|Laban]] et al. (2026) demonstrate that this is insufficient for delegated work: **short-term performance is not predictive of long-horizon performance**. In [[delegate-52|DELEGATE-52]], models with near-identical scores after 2 interactions diverged sharply after 20 interactions (e.g., GPT 5 vs. Kimi K2.5: 91.5 vs. 91.1 at 2 interactions; 48.3 vs. 64.1 at 20).

[[delegate-52|DELEGATE-52]] extends the eval stack into **long-horizon, multi-domain delegation**:
- **52 professional domains** spanning code, science, creative media, structured records, and everyday tasks
- **Reference-free evaluation** via [[round-trip-relay|round-trip relays]], eliminating the cost of human annotation
- **Domain-specific semantic scoring** rather than generic LLM-as-judge (the authors found that even GPT 5.4 as judge captures at most 25% of the variance of their parsing-based metric)
- A "ready" threshold of **98% reconstruction after 20 interactions** — only Python passes for most models

The paper argues the community needs **more long-horizon benchmarks** that simulate extended interactions, because degradation compounds over time and short simulations systematically underestimate severity.

## The Framework

Three things make evals work:

1. **Benchmark set**: A curated collection of inputs with known-good reference outputs.
2. **Scoring functions**: Automated judges that evaluate each response against your criteria.
3. **Tracking over time**: Trends, not snapshots. Is quality holding, improving, or degrading across changes?

## The Four Layers

Measure from the **outside in** — start with outcome, dig into trajectory when needed.

### 1. Component Layer (Tools & Functions)
Deterministic. Unit-testable. A JSON parser either parses or it doesn't. Your existing testing instincts work here.

### 2. Trajectory
Did the agent take the right steps? Select the right tools? Construct the right parameters? Follow a reasonable reasoning chain? An agent that gets the right answer in 25 tool calls when 3 would do has a trajectory problem. An agent that calls the wrong tool but happens to get the right answer also has a trajectory problem — one that will likely become an outcome problem.

### 3. Outcome
Is the final answer correct, helpful, grounded, and complete? This is the hardest layer because those questions are subjective. You can't write an assertion for "helpful."

This is where **LLM-as-Judge** comes in: a second language model evaluates the agent's output against a rubric. Humans define what "good" means; the model applies that definition at scale. The division of labor: humans define the criteria, models apply them at volume.

> [!warning] Limitation
> Automated evals don't catch everything. Regularly reading production traces directly surfaces the subtle failures no rubric anticipated.

> [!warning] Contradiction: LLM-as-Judge Inadequacy (Four Sources)
> This page and the [[agent-quality-engineering]] thread treat LLM-as-Judge as a viable outcome-scoring mechanism. Four independent sources challenge this:
>
> 1. **DELEGATE-52** ([[philippe-laban|Laban]] et al., 2026): Even GPT 5.4 as judge captures **at most 25% of the variance** of domain-specific parsing metrics. Generic rubric and LLM judges failed to detect nuanced semantic corruption — only structured, domain-aware scoring caught real degradation.
>
> 2. **[[dex-horthy|Dex Horthy]]** (practitioner): Models are "optimized to tell you what you want to hear." Ask a model to review code as "is this good?" — it says yes. Ask "is this bad?" — it says yes. The framing determines the answer, not the code quality. His maxim: **"Never send an AI to do a linter's job."** Anything deterministic should be checked deterministically.
>
> 3. **Samuel Colvin** (Pydantic creator, practitioner): Calls LLM-as-judge "the lunatics running the asylum" — a model judging another model's output introduces circular unreliability. His preference: deterministic evals comparing structured output against a golden dataset. He also notes that most teams **don't run evals at all** — they write a prompt, eyeball it, and ship. Optimization and evals are the exception, not the norm.
>
> 4. **RUBRICEVAL** (Pan et al., 2026): The first rubric-level meta-evaluation benchmark finds that even GPT-4o achieves only **55.97% balanced accuracy** on hard rubric-level judgments (Claude-Sonnet-4.5: 55.65%) — quantified evidence at the granularity agent evals operate at. The paradigm choice (rubric-level + reasoning vs. checklist-level direct) changes results by 7–12 points, and judge selection alone shifts scores by up to 25 points. See [[rubric-evaluation]] for the full analysis.
>
> Together, these suggest the outcome eval layer is significantly weaker than the framework assumes. Horthy's alternative: snapshot-based evals (run, store, diff) and vibes-first exploration before defining eval criteria. The RUBRICEVAL findings add that even when LLM-as-judge is necessary, the evaluation paradigm (granularity, reasoning) must be carefully designed.

### 4. System Monitoring
Watching for quality degrading in production at scale — not individual failures, but patterns across real usage over time. This is where evals and [[agent-observability|observability]] overlap.

## The Four Quality Dimensions

| Dimension | Question | Depends On |
|-----------|----------|------------|
| **Effectiveness** | Did the agent achieve what the user wanted? | Full trace visibility |
| **Efficiency** | Did it do it well? (steps, time, tokens) | Step counting, tool call logging |
| **Robustness** | Does it hold up under pressure? (malformed input, API failures, edge cases) | Error-level observability |
| **Safety & Alignment** | Does it stay within bounds? Refuse when it should? | Non-negotiable |

You can only measure what you can see. If your agent doesn't emit structured traces, you can't evaluate trajectory. If it doesn't log tool calls with parameters, you can't measure efficiency. Quality requires visibility designed in from day one.

## Thread

- [[agent-quality-engineering]] — Evals as the measurement layer of the quality framework

## Related

- [[agent-observability]] — Evals depend on observability; you can only score what you can see
- [[verifiability]] — Karpathy's thesis explains why evals work: LLMs automate what you can verify; evals make agent quality verifiable
- [[the-verifiability-thesis]] — The causal chain from verifiability through RL training to capability peaks; evals are the attempt to make agent behavior verifiable
- [[agent-quality-loop]] — Evals feed the flywheel: production failures → eval cases → improvement
- [[mastra]] — Mastra provides eval infrastructure with LLM-as-judge scoring, groundedness checks, and prompt iteration from eval feedback
- [[verification-loop]] — Evals are the probabilistic equivalent of the verification loop
- [[vibes-based-engineering]] — Evals are the structural antidote to shipping agents on vibes
- [[shared-design-concept]] — "Design so quality is measurable" is a shared-design principle
- [[agent-skills]] — Skills introduce a simple eval pattern: run with vs without the skill, diff the results
- [[compounding-booboos]] — The eval flywheel catches booboos before they compound in production
- [[delegate-52]] — Long-horizon benchmark for delegated document editing
- [[round-trip-relay]] — Reference-free eval methodology for long workflows
- [[document-degradation]] — The failure mode long-horizon evals are designed to surface
- [[critical-failure]] — Long-horizon evals are necessary because short runs miss critical failures
- [[agent-floor]] — The Harvard 6-tier benchmark that provides the eval methodology for isolating cognitive complexity from environmental confounds
- [[model-routing]] — Model routing depends on evals to validate which model tier handles which complexity class
- [[instruction-hierarchy]] — MANYIH-BENCH adds a third axis to the long-horizon eval landscape: conflict tier scaling ([[delegate-52]] measures domain breadth, [[agent-floor]] measures planning depth, ManyIH measures privilege complexity)

## Sources

- `raw/yt-ai-agent-evals-the-4-layers-most-teams-skip.md` — The framework: four layers, four dimensions, CI for probabilistic systems
- `raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md` — LLM-as-judge in practice: groundedness scoring, prompt iteration from eval feedback
- `raw/2604.15597v1.pdf` — DELEGATE-52 benchmark: long-horizon evals, short-term performance not predictive of long-horizon
- `raw/many-tier-instruction-hierarchy.md` — MANYIH-BENCH: 853-sample benchmark for instruction conflict resolution across up to 12 privilege tiers
- `raw/playground-in-prod-samuel-colvin.md` — Practitioner confirmation: most teams don't eval at all; deterministic evals strongly preferred over LLM-as-judge
- `raw/skill-issue-supabase-pedro-rodrigues.md` — Skill-specific eval pattern: A/B test with/without the skill, deterministic assertions over LLM-as-judge
- `raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md` — Private bench design philosophy: design tests that make models fail, test orthogonal capabilities, use messy real-world task shapes, evolve the tests as models improve
- `raw/2603.25133v1.txt` — RUBRICEVAL benchmark: first rubric-level meta-evaluation for instruction following; finds LLM judges unreliable at fine granularity (GPT-4o: 55.97% HARD BAcc); paradigm comparison (rubric-level vs. checklist-level, with/without reasoning); rubric taxonomy of failure modes

---
title: Agent Quality Engineering
created: 2026-04-27
updated: 2026-06-19
sources:
  - "raw/yt-ai-agent-evals-the-4-layers-most-teams-skip.md"
  - "raw/yt-the-observability-layer-your-ai-agent-is-missing.md"
  - "raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md"
  - "raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md"
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
  - raw/many-tier-instruction-hierarchy.md
  - raw/playground-in-prod-samuel-colvin.md
  - raw/2603.25133v1.txt
  - raw/bias-in-the-loop-llm-judge-code.md
  - raw/2605.18747.pdf
  - raw/harnessx-composable-adaptive-evolvable-agent-harness-foundry.pdf
  - "raw/yt-ai-agents-need-workflows-not-bigger-prompts.md"
tags: [thread, agent-quality, evals, observability, feedback-loop]
unaudited_marginal: 1
---

# Agent Quality Engineering

> AI agents fail differently than deterministic software — outputs look correct while decisions are wrong. Making agents shippable requires a quality infrastructure built on three layers: evals (probabilistic CI that measures quality on a spectrum), observability (decision-chain tracing that tells you why), and a feedback flywheel (production failures → eval cases → continuous improvement). Quality must be designed in from day one, not bolted on after shipping.

## The Core Thesis

The wiki already covers [[the-agent-workflow|how to work with agents]], [[the-human-lever|the human's role]], and [[tool-design-for-agents|how tools must change]]. This thread covers the **fourth leg**: how you know whether your agents actually work.

The argument, drawn from Damian Galarza's three-part series, breaks into three layers that form a coherent quality infrastructure:

1. **Evals**: CI for probabilistic systems. Binary pass/fail doesn't work for agents. Evals measure quality on a 0–1 spectrum across benchmark sets, scoring trajectory and outcomes with LLM-as-judge.
2. **Observability**: Logs tell you what happened. Traces (tree-shaped spans) tell you why. Metrics aggregate across thousands of runs to surface patterns. Quality metrics (correctness, trajectory adherence) watch the agent; system metrics (latency, error rate) watch the server.
3. **The Quality Loop**: Code → traces → evals → scorers → back to code. Every production failure becomes an eval case. The eval set compounds into a living record of everything the agent has struggled with — the most accurate picture of what it needs to handle.

## Layer 1: Evals — Probabilistic CI

Traditional tests assume determinism: same input → same output. Agents reject that assumption. Unit tests can't judge "helpfulness." Integration tests can't assert against natural language. End-to-end tests can't handle variable step counts.

[[agent-evals|Evals]] replace binary assertions with spectrum scoring. The framework has four layers (measure from the outside in):
- **Component**: Deterministic tools, unit-testable
- **Trajectory**: Right steps, right tools, right parameters, reasonable reasoning
- **Outcome**: Correct, helpful, grounded, complete — evaluated by LLM-as-judge
- **System**: Quality patterns at scale in production

And four quality dimensions:
- **Effectiveness**: Did it achieve the goal?
- **Efficiency**: Steps, time, tokens
- **Robustness**: Malformed input, API failures, edge cases
- **Safety & Alignment**: Stays within bounds, refuses appropriately

> You can only measure what you can see. Quality requires visibility designed in from day one.

### Per-Step Scoring: Evals Wired Into the Workflow Graph

Galarza (2026) demonstrates attaching scorers directly to individual workflow steps rather than only evaluating final output. In the sponsor email triage walkthrough:

- The `classifyEmail` step carries a `classifiedEmailScore` scorer (ratio: 1, meaning it fires on every execution) that checks whether the classification output matches the expected category given the input
- The scorer compares the LLM's classification against expected labels for known fixtures and reports a simple 0/1 score per run
- Failed runs can be saved as dataset items for future regression testing

This is a refinement of the trajectory eval layer: instead of evaluating the full trajectory after the fact, per-step scorers evaluate each LLM call at the point of execution. The workflow graph becomes the eval scaffold — each step declares what "correct" looks like for that step, and the system tracks conformance automatically.

### Deterministic Guardrails as Output Validation

Between LLM-call steps, Galarza inserts deterministic validation steps that check the LLM's output before passing it downstream:

- **Reconcile sponsor signals**: After the LLM classifies an email, a deterministic function cross-checks against keyword-based signal detection (domain mentions, sponsorship vocabulary). Neither the LLM's classification nor the keyword check is trusted alone — only their agreement produces the routing decision.
- **Apply guardrails**: After the LLM scores a sponsor opportunity, a deterministic function validates internal consistency (e.g., if audience relevance is high but commercial clarity is scored low, flag for review).

This operationalizes [[dex-horthy|Horthy]]'s "never send an AI to do a linter's job" principle: the deterministic checks are narrow, mechanical validations that don't consume model tokens or reasoning budget. They act as output gates between LLM steps, catching misclassifications and inconsistencies before they cascade.

> [!note] Marginal: The walkthrough uses the Mastra framework for scoring and guardrails. The patterns (per-step scoring, deterministic reconciliation) are framework-agnostic, but the implementation details are Mastra-specific.

## Layer 2: Observability — The Decision Narrative

[[agent-observability|Agent observability]] uses the same primitives as distributed tracing (OpenTelemetry spans, trace IDs, parent-child relationships) but applies them to a different object: a decision chain instead of a request path. Observability is itself a [[context-engineering]] concern — the agent's decision chain, tool calls, and intermediate reasoning are contextual information that must be engineered for density and signal, not accumulated as raw dumps.

[[context-files|Context files]] (AGENTS.md, CLAUDE.md) are an observability surface too: the empirical evidence shows that well-designed context files change agent behavior in measurable ways (more testing, better instruction following), making their design a quality concern that belongs in the eval framework.

The Emma/invoice failure is the illustrative case: an agent finalized an invoice but never sent it. Every system metric was green. Every log line looked correct. Only the trace tree revealed the truth — the agent called `finalize_invoice` but never `send_invoice`, then misinterpreted the `open` status as "completed" and reported "sent successfully." The logs had the data; the trace had the story.

This is why observability must be an **architectural decision**, not an afterthought:
- No structured traces → no trajectory evaluation
- No tool call parameter logging → no efficiency measurement
- No intermediate reasoning exposure → no failure diagnosis

System metrics watch the machine. Quality metrics watch the agent. If you're only watching system metrics, you're not watching the agent — and failures get discovered manually, after the fact, when someone happens to notice.

## Layer 3: The Quality Loop — The Flywheel

[[agent-quality-loop|The quality loop]] ties evals and observability into a continuous improvement cycle:

```
code → traces → evals → scorers → back to code
```

The groundedness example demonstrates the full cycle: a vague prompt produced a hallucinated action item (score 0.83). The LLM-as-judge rubric precisely defined "grounded" — explicit commitment vs. conditional suggestion. The V2 prompt incorporated those criteria directly into tool instructions, and the score jumped to 1.0.

This flywheel makes agents shippable because it provides:
- **Confidence for model upgrades**: Run the eval set against the new model before shipping
- **Safety for tool changes**: Validate against historical failures
- **Compounding regression prevention**: Every fixed failure becomes a permanent test case
- **Aggregate quality signals**: Sampling (25% in production) catches drift without full-cost evals on every run

## A Counterpoint: Dex Horthy's Skepticism

[[dex-horthy|Dex Horthy]] offers a different perspective that complicates the Galarza framework. He's skeptical of LLM-as-judge and advocates for a simpler, more pragmatic eval approach. His views don't contradict the thread's thesis — evals still matter — but they argue for a different implementation strategy.

### LLM-as-Judge Doesn't Work Well

The Chroma podcast conversation (host Jeff Huber and guest [[dex-horthy|Dex Horthy]]) converges on a shared skepticism. The speakers argue that "these models are optimized, optimized, optimized to tell us what we want to hear" — ask a model to review code and say "is this good?" — it says yes. Ask "is this bad?" — it says yes. The framing determines the answer, not the code quality. A speaker adds that the only reliable way to get honest critique is to frame it as helping a friend ("my friend sent me this, what should I tell them?"). Both agree: LLM-as-judge is unreliable for substantive evaluation.

### Never Send an AI to Do a Linter's Job

The conversation (citing a post by "Kyle") establishes the principle: anything that can be evaluated deterministically should be — "never send an AI to do a linter's job." The speakers elaborate with Dex Horthy's practice: "I don't trust a model to read code and tell me if it's good or not." The shared principle: save LLM evaluation for the parts that genuinely need it, and use deterministic checks for everything else. This aligns with the thread's component-level eval layer, but goes further — both are skeptical of even outcome-level LLM-as-judge for most use cases.

### Snapshot-Based Evals

The conversation (attribution is unclear whether this is Dex describing his HumanLayer approach or Jeff describing Chroma's system) describes a pragmatic eval approach: run the workflow end-to-end on a set of test questions, store the output as a snapshot, then diff against it on subsequent runs. It's snapshot testing for agent behavior. When a change produces a different output, the CLI shows the diff and the human accepts or rejects it.

This is simpler than the full 4-layer eval stack. It trades granularity for practicality. The key insight: evals are primarily a **regression prevention mechanism** — "a way to prevent regressions," in the source's words. If you know your agent was working yesterday, you want to know if your changes broke it today. Snapshot-based evals serve this purpose with less infrastructure.

### Vibes-First Eval Strategy

Before you know what your agent should look like, you can't write good evals. Dex Horthy's advice: "the first layer is vibes. Vibes is very high leverage especially if you don't know what you're building yet and you don't know what you want it to look like." He describes Ben Stein's flow from AI Engineer World's Fair: build the thing first, have a product manager play with it for a few days, identify the behaviors that matter, *then* write evals against those behaviors. This inverts the BDD approach — define behaviors as you discover them, not upfront.

This creates a tension with the thread's "quality must be designed in from day one" thesis. The reconciliation is the wiki author's synthesis, not stated by Horthy: design the *infrastructure* for evals from day one (logging, structured output, snapshots), but design the *specific eval criteria* after you've built enough to know what quality looks like for your use case.

### AI-Native Eval Architecture from HumanLayer

Horthy describes building a logging proxy that intercepts every Claude Code request/response pair, creating a complete trace for reverse-engineering the closed-source tool. "Whenever anything happens we can say, 'hey, go look in the logs — here's the exact response from Anthropic'." This observability-first approach means the infrastructure for understanding failures exists before the eval criteria are defined — the observability layer comes before the measurement layer.

### Quantified Evidence: RUBRICEVAL

The skepticism about LLM-as-judge above is rooted in practitioner experience and structural reasoning. The RUBRICEVAL benchmark (Pan et al., 2026) provides the first quantified evidence specifically at rubric-level granularity — the level at which agent evals actually operate.

Key findings directly relevant to agent quality engineering:

- **GPT-4o achieves only 55.97% balanced accuracy** on the HARD subset of rubric judgments — near-chance performance for a judge widely used as the evaluator in instruction-following benchmarks. Claude-Sonnet-4.5 gets 55.65%.
- **Rubric-level evaluation outperforms checklist-level** by 7–12 points. Evaluating each rubric independently (separate call per rubric) beats evaluating all rubrics in a single pass — directly relevant to how evals should be structured.
- **Reasoning (CoT) improves accuracy** by 6–9 points across settings, but adds token cost.
- **Inter-judge variance is dramatic**: judge selection alone shifts scores by 25 points under the vanilla paradigm. Rubric-level evaluation with reasoning reduces this to 12 points, but non-trivial gaps remain from inherent capability differences.

These results strengthen the thread's existing skepticism with concrete numbers. The principle "never send an AI to do a linter's job" extends to: even when you must use an LLM judge, the paradigm choice (rubric-level + reasoning vs. checklist-level direct) and judge selection can change results by 12–25 points. Evals need to specify not just what to measure but how to measure it — and acknowledge the measurement error.

See [[rubric-evaluation]] for the full analysis.

### Prompt-Induced Bias in Eval Pipelines

The [[prompts-in-code-review]] thread documents a systematic threat to the eval measurement layer itself. The [[llm-as-code-judge|Bias in the Loop]] study (Zhao et al.) shows that LLM judges used in eval pipelines are sensitive to 12 types of prompt-induced biases, with accuracy swinging by up to 40+ percentage points depending on candidate order and prompt framing. These biases are not random noise — they are *directional*, acting as positional priors that consistently favor one candidate over another regardless of code quality.

This compounds the RUBRICEVAL finding (12–25 point variance from judge selection) with a second, independent error source: the same judge with the same code can produce drastically different scores based on how the evaluation prompt is worded and how candidates are ordered. The practical implication for agent quality engineering: eval results must be reported with **bias sensitivity analysis** — swapping candidate order and testing with neutral vs. structured prompts — not just aggregate accuracy. A high eval score may reflect a favorable prompt configuration rather than genuine quality.

## The Payoff at Scale: Quality Infrastructure Pays for Itself

Samuel Colvin (Pydantic) provides a concrete cost example from Shopify: they were classifying Shopify sites for fraud and tax categories by sending entire website contents to GPT-5. Cost: ~$5M/year. By switching to a Qwen model behind an agent, then using prompt optimization to tune it, they dropped to **$73K/year** — a ~98.5% cost reduction — while improving accuracy.

Colvin also notes a dynamic that reinforces this thread's importance: **~98% of enterprise data is private**, meaning models haven't been trained on it. For public benchmarks, state-of-the-art models often get it right without optimization. But when you have large volumes of proprietary data — invoices, internal docs, domain-specific specs — prompt optimization and evals become essential. The models don't know your domain; the quality infrastructure bridges that gap.

The corollary: evals and optimization are **model-specific**. When you upgrade models, you should re-evaluate and potentially re-optimize. This complicates the "confidence for model upgrades" claim in Layer 3 — you get confidence, but only after running the eval set against the new model, not as a free upgrade.

## Relationship to Existing Threads

### Extends
- [[tool-design-for-agents]] — Observability is a tool design concern. If tools don't emit structured spans with parameters, quality measurement is impossible. Agent experience requires observable tools.
- [[the-agent-workflow]] — The quality loop is the feedback mechanism that makes AFK agents safe. Without it, the [[afk-agent|AFK agent]] pattern is just unsupervised failure.
- [[verification-loop]] — Evals are the probabilistic equivalent. The deterministic verification loop (test → fail → fix → retest) becomes the quality loop (trace → score → iterate → rescore) for agentic systems.

### Supports
- [[the-human-lever]] — Quality engineering operationalizes the human lever: define what "good" means (eval criteria), verify the agent is meeting it (scores), and intervene when it's not (prompt/tool iteration). The human owns the quality standard.
- [[shared-design-concept]] — "Design so quality is measurable" is a shared-design principle. If the human and agent don't share the quality concept, the eval scores become meaningless.
- [[grey-box-engineering]] — The eval/observability layer is how you maintain the grey-box model at scale. You can't read every trace, but aggregate quality metrics tell you where to look.

## Harness-Level Evaluation: A Missing Framework Layer

The [[code-as-agent-harness]] survey (Ning et al., 2026) identifies a gap in the quality engineering framework: most existing evaluations measure only end-task success, conflating the capabilities of the base model, quality of the [[harness-mechanisms|harness mechanisms]] (planning, memory, tool use, control), reliability of tools, informativeness of feedback, and difficulty of the environment (§5.2.1).

The survey proposes **harness-level metrics** that evaluate the operational substrate itself — complementing the quality loop with:
- **Trajectory efficiency**: tool calls, tokens, edits, wall-clock time
- **Verification strength**: test coverage, oracle diversity, false acceptance rate
- **Recovery ability**: can the agent diagnose and repair after invalid actions?
- **State consistency**: are memory, repository state, and execution traces synchronized?
- **Safety compliance**: are permissions, sandboxes, and HITL gates respected?
- **Replayability**: can the full trajectory be reconstructed from logs?

These dimensions operate at a different layer than the four quality dimensions (effectiveness, efficiency, robustness, safety) in the Galarza framework. They evaluate the *harness* as a runtime system, not the *agent* as a task performer. See [[harness-engineering]] for the full treatment.

## A Missing Quality Dimension: Trust Resolution

The ManyIH study ([[instruction-hierarchy]]) reveals a quality dimension absent from existing agent quality frameworks: **can the agent correctly resolve conflicts among instructions from heterogeneous trusted sources?**

This is not covered by the four quality dimensions (effectiveness, efficiency, robustness, safety) or the four eval layers. An agent can produce correct code (effectiveness), do it in few steps (efficiency), handle malformed input (robustness), and stay within bounds (safety) — yet still execute a low-trust web scrape over a high-trust internal database instruction because it cannot track privilege across 12 conflicting tiers.

Key findings that quality infrastructure must account for:
- All frontier models degrade monotonically as privilege tiers increase beyond training distribution (2 → 12), with drops up to 24%
- Models are representation-sensitive: format changes alone cause ≥8% accuracy drops in GPT-5.4 and Opus 4.6, and perturbing privilege values by ±3 flips outcomes on 8–17% of tasks depending on model (GPT-5.4: 16.4% overall flip rate)
- Reasoning effort is model-dependent: GPT improves monotonically; Claude has a dead zone at "low"

This suggests trust resolution should join effectiveness, efficiency, robustness, and safety as a fifth quality dimension — or at minimum, multi-agent systems should benchmark privilege conflict handling as a first-class eval target.

### Tensions
- [[vibes-based-engineering]] — Evals are the structural antidote to shipping agents on vibes. Galarza's core complaint: "Most teams build the agent, ship it, and then ask, how do we test this?" That's vibes-based agent engineering. The quality loop replaces "looks right to me" with "score 0.83, here's what failed."
- [[malleable-agents]] — The quality loop provides the guardrails that make malleability safe. If an agent can modify its own tools, the eval set catches regressions.

> [!note] Departure: A Quality Ceiling That Infrastructure Cannot Fix
> The [[agent-floor|AgentFloor]] finding that all models collapse at tier E (long-horizon planning) introduces a quality ceiling that no amount of eval infrastructure, observability, or feedback loops can address. If the model cannot perform 8-12 sequential tool steps regardless of the quality infrastructure around it, the quality problem shifts from "how do we measure this?" to "how do we avoid needing this?" — task decomposition and [[model-routing|model routing]] become quality strategies as much as architectural ones. This doesn't contradict the thread's thesis (quality infrastructure remains essential for tiers A0-D), but it establishes an upper bound on what infrastructure alone can achieve.

> [!warning] Contradiction: The RL Distribution Ceiling
> [[andrej-karpathy|Karpathy]]'s [[verifiability|verifiability thesis]] introduces a structural ceiling on the quality loop. If a capability is outside the model's RL training distribution — not rewarded during training — no amount of eval infrastructure, observability, or feedback flywheels can create it. The quality loop can measure and improve behavior *within* the model's trained circuits, but it can't extend beyond them. Karpathy: "If you're not in the circuits, then you have to really look at fine-tuning." This doesn't invalidate the quality infrastructure — it remains necessary — but it establishes that quality engineering is bounded by the model's training distribution. See [[the-verifiability-thesis]] for the full argument.
>
> The Meeseeks benchmark ([[iterative-self-correction]]) provides direct empirical evidence for this ceiling. Its code-guided evaluation achieves 98.4% accuracy — near-perfect verification. Yet even after 20 rounds of precise feedback, no model exceeds ~91% utility rate. The [[overcorrection-bias|catastrophic overcorrection]] phenomenon (models oscillating wildly on word counts despite precise feedback) shows that even when the quality infrastructure is effectively perfect, the model's underlying capability gap cannot be fully closed within a single session. The quality loop is necessary but not sufficient. — The 4-layer eval stack: CI for probabilistic systems
- [[agent-observability]] — Logs/traces/metrics for agent decision chains
- [[agent-quality-loop]] — The flywheel: production failures → eval cases → continuous improvement
- [[delegate-52]] — Long-horizon benchmark quantifying agent reliability across 52 domains
- [[document-degradation]] — The failure mode long-horizon evals are designed to surface
- [[critical-failure]] — Sparse catastrophic errors that only long-horizon evals can catch
- [[agent-floor]] — The Harvard benchmark that demonstrates the tier E ceiling; provides an eval methodology for isolating cognitive complexity
- [[execution-apathy]] — A quality failure mode quantified by AgentFloor: the model resigns without executing
- [[blind-panic]] — A quality failure mode quantified by AgentFloor: the model loops and degenerates
- [[instruction-hierarchy]] — ManyIH reveals a missing quality dimension: trust resolution across heterogeneous instruction sources under privilege conflict
- [[agentic-engineering]] — The professional discipline whose quality bar agent quality engineering is designed to preserve
- [[property-based-testing-as-spec]] — A deterministic-verification analog to the probabilistic quality loop: EARS requirements are translated to correctness properties and verified by property-based tests rather than LLM judges. Where evals score generated text, PBT-as-spec scores generated code against machine-parseable invariants — a complementary verification mechanism, not a replacement.
- [[verifiability]] — The economic theory that explains why evals work: LLMs automate what you can verify
- [[contextcov]] — ContextCov's empirical framework (compliance metrics, feedback cost, functional correctness) is a quality engineering methodology for deterministic enforcement; its finding that LLM reflection degrades compliance is a cautionary result for eval design
- [[self-harness]] — The held-in/held-out split and conservative acceptance rule are quality infrastructure for the self-evolution loop
- [[harnessx]] — AEGIS is the most concrete instance of the feedback flywheel applied to the harness itself: traces → per-task summaries → adaptation landscape → candidate edits → critic assessment → deterministic gate. The [[operational-mirror]]'s three named pathologies (reward hacking, catastrophic forgetting, under-exploration) are what the flywheel is *for* — they make the failure modes explicit and the defenses auditable. The trace store T is the observability substrate that makes the flywheel operational.

## Sources

- `raw/yt-ai-agent-evals-the-4-layers-most-teams-skip.md` — The 4-layer eval framework and 4 quality dimensions
- `raw/yt-the-observability-layer-your-ai-agent-is-missing.md` — Logs/traces/metrics, the Emma/invoice debugging story, OpenTelemetry
- `raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md` — The flywheel in practice: groundedness eval, Mastra walkthrough
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — Snapshot-based evals, LLM-as-judge skepticism, vibes-first eval strategy, logging proxy infrastructure
- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — Harvard AgentFloor study: reproducible benchmark methodology, failure mode taxonomy, demonstrates the quality ceiling at tier E
- `raw/many-tier-instruction-hierarchy.md` — ManyIH study: combinatorial collapse of LLM trust resolution, representation sensitivity, evidence for trust resolution as a missing quality dimension
- `raw/playground-in-prod-samuel-colvin.md` — Shopify cost example ($5M→$73K via agent + optimization), private-data drives quality needs, most teams don't eval
- `raw/2603.25133v1.txt` — RUBRICEVAL (Pan et al., 2026): quantified evidence for LLM-as-judge reliability limits at rubric-level granularity; paradigm comparison (rubric-level vs. checklist-level, with/without reasoning — 7–12 point gap); inter-judge variance analysis (judge selection shifts scores by up to 25 points)
- `raw/bias-in-the-loop-llm-judge-code.md` — Zhao et al. (2026): systematic threat to eval pipelines from 12 prompt-induced biases acting as directional positional priors; same judge + same code produces drastically different scores based on prompt framing and candidate order
- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). Code as Agent Harness survey. Proposes harness-level evaluation metrics (§5.2.1) that complement the quality loop by evaluating the operational substrate rather than only end-task success
- `raw/harnessx-composable-adaptive-evolvable-agent-harness-foundry.pdf` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX.* AEGIS is the most concrete instance of the feedback flywheel applied to the harness itself: traces → per-task summaries → adaptation landscape → candidate edits → critic assessment → deterministic gate. The [[operational-mirror]]'s three named pathologies are the failure modes the flywheel is designed to defend against. +14.5% average / +44.0% peak across 5 benchmarks and 3 model families.
- `raw/yt-ai-agents-need-workflows-not-bigger-prompts.md` — Galarza (2026): per-step scoring attached to workflow steps, deterministic guardrails as output validation between LLM calls; reconcile LLM + deterministic signals before routing decisions

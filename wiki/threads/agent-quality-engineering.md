---
title: Agent Quality Engineering
created: 2026-04-27
updated: 2026-05-08
sources:
  - "raw/AI Agent Evals The 4 Layers Most Teams Skip - youtube.com.md"
  - "raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md"
  - "raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md"
  - "raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md"
  - raw/When to use Small LM for AI Agents New Insights - youtube.com.md
  - raw/many-tier-instruction-hierarchy.md
  - raw/playground-in-prod-samuel-colvin.md
tags: [thread, agent-quality, evals, observability, feedback-loop]
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

## Layer 2: Observability — The Decision Narrative

[[agent-observability|Agent observability]] uses the same primitives as distributed tracing (OpenTelemetry spans, trace IDs, parent-child relationships) but applies them to a different object: a decision chain instead of a request path.

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

Both Dex Horthy and Jeff Huber (Chroma CEO) converge on a shared skepticism. Huber states that "these models are optimized, optimized, optimized to tell us what we want to hear" — ask a model to review code and say "is this good?" — it says yes. Ask "is this bad?" — it says yes. The framing determines the answer, not the code quality. Horthy adds that the only reliable way to get honest critique is to frame it as helping a friend ("my friend sent me this, what should I tell them?"). Both agree: LLM-as-judge is unreliable for substantive evaluation.

### Never Send an AI to Do a Linter's Job

Jeff Huber explains the principle (citing a post by "Kyle"): anything that can be evaluated deterministically should be — "never send an AI to do a linter's job." Horthy strongly agrees, and elaborates with his own practice: "I don't trust a model to read code and tell me if it's good or not." The shared principle: save LLM evaluation for the parts that genuinely need it, and use deterministic checks for everything else. This aligns with the thread's component-level eval layer, but goes further — both are skeptical of even outcome-level LLM-as-judge for most use cases.

### Snapshot-Based Evals

The conversation (attribution is unclear whether this is Dex describing his HumanLayer approach or Jeff describing Chroma's system) describes a pragmatic eval approach: run the workflow end-to-end on a set of test questions, store the output as a snapshot, then diff against it on subsequent runs. It's snapshot testing for agent behavior. When a change produces a different output, the CLI shows the diff and the human accepts or rejects it.

This is simpler than the full 4-layer eval stack. It trades granularity for practicality. The key insight: evals are primarily a **regression prevention mechanism** — "a way to prevent regressions," in the source's words. If you know your agent was working yesterday, you want to know if your changes broke it today. Snapshot-based evals serve this purpose with less infrastructure.

### Vibes-First Eval Strategy

Before you know what your agent should look like, you can't write good evals. Dex Horthy's advice: "the first layer is vibes. Vibes is very high leverage especially if you don't know what you're building yet and you don't know what you want it to look like." He describes Ben Stein's flow from AI Engineer World's Fair: build the thing first, have a product manager play with it for a few days, identify the behaviors that matter, *then* write evals against those behaviors. This inverts the BDD approach — define behaviors as you discover them, not upfront.

This creates a tension with the thread's "quality must be designed in from day one" thesis. The reconciliation is the wiki author's synthesis, not stated by Horthy: design the *infrastructure* for evals from day one (logging, structured output, snapshots), but design the *specific eval criteria* after you've built enough to know what quality looks like for your use case.

### AI-Native Eval Architecture from HumanLayer

Horthy describes building a logging proxy that intercepts every request/response pair, creating a complete trace of agent behavior from day one. "Whenever anything happens we can say, 'hey, go look in the logs — here's the exact response from Anthropic'." This observability-first approach means the infrastructure for understanding failures exists before the eval criteria are defined — the observability layer comes before the measurement layer.

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

## Concepts in this thread

- [[agent-evals]] — The 4-layer eval stack: CI for probabilistic systems
- [[agent-observability]] — Logs/traces/metrics for agent decision chains
- [[agent-quality-loop]] — The flywheel: production failures → eval cases → continuous improvement
- [[delegate-52]] — Long-horizon benchmark quantifying agent reliability across 52 domains
- [[document-degradation]] — The failure mode long-horizon evals are designed to surface
- [[critical-failure]] — Sparse catastrophic errors that only long-horizon evals can catch
- [[agent-floor]] — The Harvard benchmark that demonstrates the tier E ceiling; provides an eval methodology for isolating cognitive complexity
- [[execution-apathy]] — A quality failure mode quantified by AgentFloor: the model resigns without executing
- [[blind-panic]] — A quality failure mode quantified by AgentFloor: the model loops and degenerates
- [[instruction-hierarchy]] — ManyIH reveals a missing quality dimension: trust resolution across heterogeneous instruction sources under privilege conflict

## Related

- [[verification-loop]] — The deterministic sibling; evals as the probabilistic equivalent
- [[vibes-based-engineering]] — The anti-pattern the quality framework replaces
- [[compounding-booboos]] — The quality loop catches booboos in production before they compound
- [[backpressure]] — Quality scores as soft backpressure
- [[tool-design-for-agents]] — Tool design determines what's observable
- [[damian-galarza]] — Author of the three-part series that forms this thread
- [[round-trip-relay]] — Reference-free eval methodology powering long-horizon benchmarks
- [[agent-floor]] — The 6-tier benchmark methodology for isolating tool-use quality from environmental confounds
- [[execution-apathy]] — GPT-5's quality failure at tier E: plans without executing
- [[blind-panic]] — Gemma 4's quality failure at tier E: loops and hallucinates tools
- [[jagged-frontier]] — Evals must be domain-specific because capability is uneven
- [[context-engineering]] — The eval infrastructure (logging proxies, snapshots) is a context engineering concern
- [[slop-watch]] — Concrete architectural contribution to the observability layer: sessions as DAGs, listener/sidecar pattern, per-agent adapters
- [[dynamic-trust]] — Proposed quality infrastructure for the trust dimension: dynamic trust middleware that recalculates scores at inference time
- [[discover-ai]] — Coverage of AgentFloor, ManyIH, and model routing all feed the quality engineering thesis: measure, observe, improve

## Sources

- `raw/AI Agent Evals The 4 Layers Most Teams Skip - youtube.com.md` — The 4-layer eval framework and 4 quality dimensions
- `raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md` — Logs/traces/metrics, the Emma/invoice debugging story, OpenTelemetry
- `raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md` — The flywheel in practice: groundedness eval, Mastra walkthrough
- `raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md` — Snapshot-based evals, LLM-as-judge skepticism, vibes-first eval strategy, logging proxy infrastructure
- `raw/When to use Small LM for AI Agents New Insights - youtube.com.md` — Harvard AgentFloor study: reproducible benchmark methodology, failure mode taxonomy, demonstrates the quality ceiling at tier E
- `raw/many-tier-instruction-hierarchy.md` — ManyIH study: combinatorial collapse of LLM trust resolution, representation sensitivity, evidence for trust resolution as a missing quality dimension
- `raw/playground-in-prod-samuel-colvin.md` — Shopify cost example ($5M→$73K via agent + optimization), private-data drives quality needs, most teams don't eval

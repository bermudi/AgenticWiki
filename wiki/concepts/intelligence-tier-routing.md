---
title: Intelligence-Tier Routing
created: 2026-07-12
updated: 2026-08-25
sources:
  - raw/perplexity-local-first-agent.md
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
  - raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md
unaudited_marginal: 0
tags: [concept, factory, routing, model-selection, cost, local-models, architecture]
---

# Intelligence-Tier Routing

> [[steve-yegge|Steve Yegge]]'s thesis: tag every unit of [[beads-work-ledger|factory work]] with an **intelligence tier** so it can be routed across models of different capability/cost (frontier Claude for planning, local or open-source models for implementation). The bottleneck is **intelligence arbitrage** — finding open-source models capable enough to carry the implementation load. The endgame: a [[claude-code|Claude Code]]-compatible local-model drop-in replacement, one Claude Max account for planning, and open-source models for the rest.

## The Setup

A factory's work is heterogeneous. Some tasks are deep design problems that need Opus-level reasoning; some are well-specified throwaway implementations that a DeepSeek or local model can handle; some are pure mechanical execution that any model can do. Sending all of it to the same model — the default today — is wasteful in both directions: the simple work overpays for capability it doesn't need, and the deep work crowds out capacity that should be reserved for the hard problems.

Yegge's framing:

> "You need to basically tag your work with intelligence tiers in a way so you could route it and know what you're stable. So the setup that you have on your local machine or with your team or in your org for having these agents swapped in and out for the appropriate work so that you can save tokens — that's your factory."

The factory *is* the routing layer. Without explicit tagging, the routing happens implicitly (every task goes to the same model) and the savings go to zero.

## The Intelligence Arbitrage Problem

The thesis depends on open-source models being capable enough to carry enough of the load. As of mid-2026, Yegge's read: not yet, but close.

> "I think we're what, seven months away in December? I think we should all have something there. I can't imagine I'll still be paying Anthropic for all of our tokens by next year."

The "intelligence arbitrage" problem: local models may be capable enough for most work, but the factory's work includes a hard core (deep design, ambiguous specs, novel architectures) that benefits disproportionately from frontier capability. The factory's quality is bounded by the weakest tier that touches any given work item. Routing the wrong work to the wrong tier collapses quality.

The market opportunity Yegge identifies: a hosted local-model Claude Code drop-in replacement. The user gets Claude Code's UX and tool surface, but inference runs on cheap local models. Whoever solves this with a turnkey product captures a large share of the factory market.

## The Tier Taxonomy (Yegge's Sketch)

Yegge does not commit to a specific tier count, but the sketch in his talk suggests:

| Tier | Use | Model class |
|---|---|---|
| **Planning / design** | Deep context review, novel architecture, ambiguous spec | Opus / frontier |
| **Implementation** | Well-specified features, refactors, code generation | DeepSeek / open-source frontier |
| **Mechanical execution** | Boilerplate, format conversion, deterministic transforms | Local / cheap |

The boundaries are not fixed; they shift with model releases. Tessl's observation (related, not Yegge): a verifier-style model (LLM-as-lint) does not need frontier capability — focused, well-specified checks can be powered by cheaper models. The verifier can be downgraded; the planner cannot.

## The August 2026 Field Report (Dex Horthy & Host)

The Wortmann/Horthy conversation grounds tier routing in today's pricing and habits:

**Make it run, make it right, make it fast (then cheap).** Dex's stage gate: prove the smartest model (o3 at the time of the story; Opus/GPT-5.6 today) can solve the task and that someone wants the result; only at volume do you pay to break the task into calls and move pieces down the cost ladder — e.g., run parts on a 12B OSS model at ~1/1000th Opus cost, reserving frontier for the hard steps. Engineering time is the binding constraint early; per-token cost is the late constraint ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 48:43–50:11, 23:58–24:34). The tokenizer/cost shock that made this real for most teams: Opus 4.7's 30% more tokens at the same price, then Fable at ~2× Opus, which is when "do I really get more bang for this buck?" entered day-to-day decisions ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 50:11–50:42).

**Which tier for which phase is not settled.** Enterprise guidance Dex hears now is often "Opus for planning, Sonnet for implementation," but both speakers push back: their own workflow is usually frontier-only because fixing Sonnet is slower than paying for Opus, and Dex reserves the opposite instinct — *cheap* model as planning sparring partner, *expensive* model to cover edge cases — as valid when the plan is the personal-thinking layer. The wiki's prior "planner cannot be downgraded" gloss is thus too strong; both directions appear in practice, gated by how much the implementer is expected to discover vs. execute ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 51:24–53:55). The shared principle: a plan is a prompt on a spectrum between two sentences and the full diff, and the right point is "good enough that if it's 20% wrong I can recover in-session, 50% wrong I throw it out" — which is itself a tiering judgment.

**Models need different prompting.** Calvin French-Owen's (Segment, Codex launch) characterization that the speakers adopt: GPT is more literal (does the instructions), Opus more expansive ("you said this but based on everything I've seen you probably want this"). HumanLayer had to rewrite research-phase prompts because Codex under the same prompt returned an unreadable 200-bullet file-and-line dump where Claude wrote human-readable docs ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 58:11–59:27). The host adds an affordance difference that matters for tiering: Opus/Claude still more natural for creative writing; GPT more "to the point" and — in his framing — "very German" ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 59:30–1:00:05). Tier routing therefore entails per-model prompt sets, not one prompt routed anywhere.

**Subscription vs. per-token changes the calculus.** "Are you on a subscription or paying per token?" is Dex's first disambiguation before any tier advice; the same workload feels cheap or expensive depending on the billing model ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 51:43).

## Advisor Escalation: A Shipped Tier-Routing Harness

[[perplexity-computer|Perplexity Computer]] (Aug 2026) ships the routing pattern this page previously treated as a thesis: a [[local-first-agent|local-first agent]] where the 27B local model (Qwen 3.8, later PPLX 27B) handles the common case and escalates selectively to a frontier advisor (evaluated with Claude Opus 5).

**How it routes.** The local model decides when to request advice — planning, ambiguity resolution, failure recovery, final verification — while the deterministic harness orchestrator retains tool authority and controls what context is sent. Escalation is user-gated (enable/disable, manual vs automatic per-call approval). Before a call, the harness selects relevant context, runs a PII classifier, and previews what would leave the device. The advisor returns text guidance only, with no direct access to files, tools, or the response channel; the local model may use it, but the harness still executes.

**The measured trade.** On Terminal Bench 2.1 (89 coding tasks, Computer harness): Qwen 3.8 fully local 59.6% at ~$0/rollout → with Opus 5 advisor 73.0% at $0.415/rollout → Opus 5 alone 82.4% at $0.65/rollout. Escalation recovers roughly three-fifths of the gap to frontier at about two-thirds the cost. Perplexity did not evaluate Pi/Hermes with an advisor — adding one would no longer be the off-the-shelf harness — so the trade is shown to be harness-dependent.

**What this resolves and what it doesn't.** The pattern makes Yegge's "tag your work with intelligence tiers" concrete: the tier tag is the advisor call itself, the routing policy is "local by default, frontier on request," and the preview is the inspectable gate from [[the-human-lever]] / [[harness-engineering]]'s HITL-safety layer. It also extends the August 2026 field report's stage gate (frontier to prove it runs, then down-tier at volume) into a live, per-task decision rather than a pre-planned split. Open questions from this page remain — who should tag (local model vs human vs automatic analysis), whether tag boundaries are stable across model drops — but the mechanism for answering them is now filed.

## Why Tagging Matters

A factory that routes by tag is a factory whose routing decisions are inspectable. The human can see: this work went to local, that work went to Opus, here's the routing policy. When a failure happens, the question "was the right tier chosen?" is answerable from the ledger.

A factory that routes by implicit policy (always-Opus, or best-effort) is a factory whose failures are uninspectable. The cost of the failure mode (a hard task sent to a weak model, or an easy task sent to an expensive one) is hidden in the aggregate token spend.

Yegge's framing: the setup you have for swapping agents in and out for the appropriate work "so that you can save tokens — that's your factory." The factory's value, in this read, is the routing policy (the wiki's gloss), not the agent count.

## The Factory Implication

If the factory is the routing layer, then:

- The [[beads-work-ledger|ledger]] entries would need a tier field — an extension the wiki proposes, but the source does not confirm is planned.
- The agent harness ([[claude-code|Claude Code]] for Yegge) would need a model-swap interface — the wiki's inference from Yegge's prediction of a hosted local-model drop-in replacement for Claude Code.
- The verification layer (Tessl's verifiers, the wiki's [[verifiability|verifiability]] thesis) needs to be tier-aware. A weak verifier on a high-tier task is the [[rubric-evaluation|RUBRICEVAL]] failure mode; a frontier verifier on a low-tier task is wasteful.

## Connection to Existing Wiki Concepts

- [[scaling-agent-systems]] (Kim et al., 2026) — The scaling study's [[capability-saturation]] finding is the empirical version of the tiering thesis: above ~45% single-agent baseline, more coordination (i.e., more agents, but the same frontier tier) yields negative returns. The tier routing thesis is the *complementary* move: instead of more agents, *different* agents for different work.
- [[multi-agent-illusion]] — The audit shows that automated multi-agent architectures largely fail. The tier routing thesis sidesteps this by not requiring coordination: each work item is owned by one agent, the question is which one.
- [[verifiability]] — Verifier capability is a separate axis from agent capability. Tessl's verifier-as-lint pattern shows that verifier tier can be lower than agent tier.
- [[claude-code]] — The substrate; the tier-routing product opportunity is a hosted Claude Code drop-in for local models.

## Open Questions

The wiki has not yet seen empirical evidence for:
- What the right tier count is (3? 5? 10?)
- Whether tier boundaries are stable across model releases or need to be re-tuned per drop
- Whether tagging is best done by the human, the planner agent, or automatically by task analysis
- Whether the factory's quality (not just its cost) improves with explicit tiering, or whether implicit best-effort routing is close to optimal at the cost ceiling most factories hit

These are open empirical questions; the wiki should not claim answers that the source does not.

## Thread

- [[the-agent-workflow]] — The workflow's "right model for the right work" intuition is the practitioner version of the tier routing thesis
- [[the-multi-agent-theory]] — Tier routing is the alternative to coordination-as-answer: instead of multiple agents on one work item, multiple agent classes on multiple work items
- [[tool-design-for-agents]] — The hosted-local-model drop-in is the tool-design version of the tier routing thesis
- [[agent-quality-engineering]] — Tier-aware verification is the quality-engineering version
- [[the-verifiability-thesis]] — Verifier-tier independence: the verifier can run on a lower capability tier than the agent, making down-tiering a routing question

## Related

- [[steve-yegge]] — Source of the intelligence-tier routing thesis
- [[perplexity-computer]] — Ships the advisor-escalation pattern: local by default, frontier advisor on request, orchestrator retains tool authority
- [[local-first-agent]] — The architectural pattern whose advisor tool implements tier routing with PII gating and preview
- [[beads-work-ledger]] — The work substrate; tier tagging is an extension of the ledger schema
- [[software-factory]] — The factory is the routing layer
- [[claude-code]] — The substrate; the drop-in replacement is the product opportunity
- [[scaling-agent-systems]] — The empirical study of coordination vs. single-agent returns
- [[verifiability]] — Verifier capability is a tier axis separate from agent capability
- [[tessl]] — Tessl's verifier-as-lint is the tier-down-verifier pattern
- [[tool-design-for-agents]] — The hosted-local-model drop-in is the tool-design version of the tier routing thesis
- [[agent-quality-engineering]] — Tier-aware verification is the quality-engineering version of the routing thesis

## Sources

- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — Yegge's intelligence-tier routing thesis: tagging work with intelligence tiers, swapping agents in and out, the intelligence arbitrage problem, the seven-month prediction for open-source model parity, the hosted-local-model drop-in opportunity, the tier-aware verifier implication
- `raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md` — The make-it-run/right/fast/cheap stage gate and 12B-at-1/1000th example ([23:58]–[24:34], [48:43]–[50:11]), the Opus 4.7 tokenizer and Fable 2× pricing shocks ([50:11]–[50:42]), the "Opus for planning, Sonnet for impl" enterprise guidance vs. frontier-only practice and the cheap-planner/expensive-implementer counter-case ([51:24]–[53:55]), the GPT-literal vs Opus-expansive prompting difference and the Codex-200-bullets rewrite ([58:11]–[59:27]), subscription vs per-token framing ([51:43]).
- `raw/perplexity-local-first-agent.md` — The shipped advisor-escalation pattern: local model owns the request decision, orchestrator retains tool authority and sends only PII-filtered previewed context, advisor returns text guidance only. Terminal Bench 2.1 trade (59.6% → 73.0% at $0.415 vs 82.4% at $0.65 for Opus 5 alone) that quantifies Yegge's tier-routing cost/quality dial.

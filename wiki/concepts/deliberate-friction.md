---
title: Deliberate Friction
created: 2026-04-30
updated: 2026-07-02
sources:
  - "raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md"
  - raw/2604.15597v1.md
  - "raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md"
tags: [concept, engineering-process, ai-engineering, code-review, quality]
---

# Deliberate Friction

> Intentionally engineering slowdowns in the development process — not because speed is bad, but because some decisions deserve more thought than agent velocity encourages. Distinct from [[backpressure]] (mechanical rejection) and from accidental friction (bad DX).

## The Core Argument

[[armin-ronacher|Armin Ronacher]] identifies a dangerous trend: companies racing to remove *all* friction from engineering processes so agents can operate autonomously at maximum speed. But some friction was deliberately designed — tiered code review requirements, director sign-offs for config changes, SLO definitions before promoting services. These slowdowns exist to force humans to think at decision points where the cost of being wrong is high.

He cites a company whose tagline was "ship without friction" that had a security incident related in part to agentic engineering — a configuration change that resulted in a security issue. The friction they removed wasn't accidental complexity — it was a safety gate.

## Friction as Thinking Prompt

In well-run engineering organizations, friction serves a specific cognitive function:

- **Tiered code review**: Highest-criticality services require multiple reviewers or director approval. The friction forces the author to ask: "Do I really want to push through this process, or is there a simpler approach?"
- **Checklists and confirmation gates**: Database migrations that might take table locks. Config changes to tier-1 services. These aren't bureaucracy — they're designed to make you pause.
- **SLO requirements**: Before a service can be promoted to production, it must meet reliability criteria. This is friction that prevents premature promotion.

The pattern: friction at inflection points where the cost of error justifies the cost of deliberation.

## What Agents Break

Agents don't feel pain and don't self-regulate. A human engineer who just went through a painful director sign-off will think harder next time to avoid it. An agent — or a human using an agent — feels none of that feedback. The result:

1. **More changes pushed through** because the human doesn't feel the weight of each one
2. **Automation bias** — seeing one good agent output lowers guard for subsequent ones
3. **Responsibility gap** — the machine produces at 10x speed but responsibility doesn't scale. Nobody goes back to the "shirt factory" to ask why it was bad when replacements are cheap.

## Deliberate Friction vs. Backpressure

[[backpressure]] is mechanical: tests fail, builds break, LLM-as-judge rejects. It operates *after* the change. Deliberate friction operates *before* the change — it slows the human down at the decision point, not the agent down at the verification point. Both are needed. Backpressure catches errors; deliberate friction prevents them.

## Deliberate Friction vs. Bad DX

The trap: some friction *is* accidental complexity (terrible DX, bad tooling, bureaucratic overhead). It can be hard to tell the difference. Armin notes that deliberate friction often goes undocumented — it looks the same as accidental friction until you understand the intent behind it.

## Ronacher's Prescription

Don't remove friction wholesale to enable agent autonomy. Audit which friction is deliberate, preserve it, and only remove the accidental kind. The goal isn't speed — it's appropriate speed.

## Empirical Support

[[philippe-laban|Laban]] et al. (2026) provide a quantitative reason to preserve friction at delegation boundaries. In [[delegate-52|DELEGATE-52]], degradation from LLM document editing **compounds multiplicatively** with interaction length. Short simulations (2 interactions) systematically underestimate the severity of long-horizon degradation (20+ interactions). Removing the friction that forces humans to pause, review, and reset between agent sessions doesn't just risk one bad output — it enables the silent compounding that destroys 25–50% of document content. Deliberate friction at the delegation boundary is a circuit breaker for this compounding.

## Thread

- [[the-slop-problem]] — Removing deliberate friction accelerates slop production
- [[the-human-lever]] — Deliberate friction as a tool of human design authority
- [[the-agent-workflow]] — Where deliberate friction belongs in HITL/AFK workflows

## Related

- [[backpressure]] — Mechanical rejection (after the change); deliberate friction is cognitive slowdown (before the change)
- [[slop]] — Removing friction is a slop accelerant
- [[vibes-based-engineering]] — The absence of deliberate friction enables vibes-based engineering
- [[compounding-booboos]] — Deliberate friction interrupts the compounding cycle
- [[delegate-52]] — Evidence that interaction length compounds degradation
- [[document-degradation]] — The damage that accumulates when friction is removed
- [[critical-failure]] — Rare catastrophic errors that friction might catch
- [[armin-ronacher]] — Primary source for this concept
- [[pi]] — Mario's auto-close PR workflow as concrete deliberate friction: filtering agent-generated noise from human contributors
- [[comprehension-debt]] — Teaching mode as deliberate friction: slowing down to build understanding instead of shipping faster
- [[chris-parsons]] — "Reversible without embarrassment" as an operational instantiation of deliberate friction for safety boundaries
- [[ralph-loop]] — Fresh-context-per-iteration and plan disposability as deliberate friction against compounding errors
- [[rollback-posture]] — Refusing to release at full generation speed is deliberate friction at the release layer

## Sources

- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — Armin's analysis of deliberate vs. accidental friction, the "ship without friction" incident
- `raw/2604.15597v1.md` — DELEGATE-52 paper: degradation compounds multiplicatively with interaction length; deliberate friction at delegation boundaries as a circuit breaker
- `raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md` — Teaching mode as deliberate friction; inquiry vs. delegation in the Anthropic RCT

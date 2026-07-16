---
title: Context Trajectory
created: 2026-07-16
updated: 2026-07-16
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
unaudited_marginal: 0
tags: [concept, context-engineering, agent-loops, failure-modes, autoregression]
---

# Context Trajectory

> [[dex-horthy|Dex Horthy]]'s term for the dimension of the context window most engineers ignore: not how *much* is in it, not whether the information is *correct*, but *what the agent has been doing* — the actual history of actions and reactions. Because LLMs are autoregressive, they predict the next message given the conversation history, so the trajectory conditions future outputs. A history of "mistake → human yells → mistake → human yells" makes another mistake the statistically likely next message. "You're absolutely right" is the tell that the trajectory has gone bad and it's time to start over.

## The Four-Property Model

Dex frames the context window as having four properties an engineer must manage ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 1:12:30):

1. **Size** — how many tokens are in the window.
2. **Information quality** — whether any of it is incorrect, including wrong conclusions baked into a thinking trace.
3. **Missing information** — what the model needs but doesn't have.
4. **Trajectory** — the actual history of what the agent has done so far.

The first three are widely discussed (they are the substance of [[context-engineering]] and the [[smart-zone-dumb-zone|Smart Zone]] heuristic). **Trajectory** is Dex's distinctive addition, and it is subtle because it is not about the *content* of any single turn but about the *shape* of the conversation as a conditioning signal.

## Why Trajectory Matters: Autoregression

An LLM generates the next message as a continuation of the conversation so far. The conversation is therefore not just a memory — it is a prompt. If the recent history shows a pattern (the user asks for a change, the agent makes it, the test breaks, the agent fixes the test, the agent reports back), the model will reliably *continue that pattern* on the next request. If the history instead shows (the agent makes a mistake, the human expresses frustration, the agent makes another mistake, the human expresses frustration), the highest-probability continuation is — another mistake that earns another frustrated reaction. The model is not being defiant; it is being a faithful continuation engine.

This is the mechanism behind the "you're absolutely right" failure mode. When corrected angrily, the model agrees emphatically — and then often continues doing the wrong thing, because agreement-followed-by-the-same-mistake is what its trajectory predicts. Dex's rule of thumb: the moment you see "you're absolutely right," start a fresh session.

## Relation to Self-Conditioning

[[self-conditioning]] is the related finding that models degrade on their own error-laden history — a sliding window that removes past mistakes *improves* sustained accuracy. Trajectory is the broader frame that contains it: self-conditioning is the specific case where the *agent's own errors* are the toxic trajectory; the trajectory concept also covers *human-agent interaction patterns* (the yell loop) and *stale plan paths* (a conversation that committed to a direction that's hard to steer off). The prescription overlaps — reset the context — but trajectory names a wider class of contamination.

## Practical Implications

- **Reset on contamination, not just on size.** Compacting because you've hit 300k tokens is a size decision. Resetting because the trajectory has gone adversarial or committed-down-a-wrong-path is a *trajectory* decision — and it can be the right call at 80k tokens.
- **Design the trajectory you want.** If you want the agent to make-a-change → run-the-test → fix-if-broken → report, establish that pattern early and keep it clean. A clean trajectory is itself a form of [[context-engineering]].
- **Steer early, not hard.** Once a trajectory is set (the agent has gone down a path), it's often cheaper to restart from scratch than to steer off it mid-stream — which is the same intuition behind [[plan-disposability]].

## Thread

- [[dex-horthy-agentic-engineering]] — Trajectory is the fourth property of Dex's context model; resetting it is the recovery move beneath his whole workflow
- [[the-agent-workflow]] — Trajectory management is an operational concern alongside token budget and information density

## Related

- [[context-engineering]] — Trajectory is the fourth axis of the context window context engineering must manage
- [[smart-zone-dumb-zone]] — Size/quality are the Smart-Zone axes; trajectory is the orthogonal contamination axis
- [[self-conditioning]] — The specific case of toxic trajectory from the agent's own errors
- [[plan-disposability]] — A stale committed path is a trajectory that's cheaper to reset than salvage
- [[llm-as-code-judge]] — The "you're absolutely right" sycophancy is a trajectory artifact, not just a single-turn bias
- [[compounding-booboos]] — Bad trajectories compound errors across turns
- [[dex-horthy]] — Originator of the four-property model

## Sources

- `raw/yt-context-engineering-with-dex-horthy.md` — The four-property context model (1:12:30–1:13:00), the "you're absolutely right" tell and the yell-loop autoregression example (1:11:40–1:13:49).

---
title: Jarred Sumner
created: 2026-07-02
updated: 2026-07-02
sources:
  - raw/yt-are-we-really-doing-this-again.md
unaudited_marginal: 0
tags: [author, bun, zig, rust, agent-loops, parallel-agents]
---

# Jarred Sumner

> Creator of Bun. A trusted practitioner voice in the loops discourse ([[neetcode|NeetCode]] says he trusts him "a little bit more"). His arc tracks the discourse's maturation: from manually orchestrating parallel agents, to the implied "now we write loops," to a candid walk-back — **loops work best around a bounded task queue (for-each), not an unbounded while.** Also behind the Zig→Rust port of Bun (~700k LOC) using AI.

## Parallel Agents First, Manually

Sumner's stated starting point for any large project now: "how can I structure my workflows with as many parallel Claude instances as possible?" The reply-tweet that drew him in described the older approach — manually orchestrating each parallel/serial step, "ask and pray it does the right thing," managing "lots and lots of team sessions" by hand. Sumner's one-word response: "yes, that was a good approach six months ago." The implication, consistent with [[boris-cherny|Cherny]] and [[peter-steinberger|Steinberger]], is that manual prompting is the superseded layer and loop-writing is the new one.

## The Zig → Rust Port

Sumner ported Bun from Zig to Rust — roughly 700,000 lines of code — using AI (as of the source, not yet shipped; still being worked through). The agentic-coding community has been waiting on the promised blog post documenting exactly how the migration was done, since it would be one of the largest credible AI-assisted ports on record. Weeks later it had not appeared — a recurring pattern in the discourse ([[discourse-slop]]): big claims, slow receipts.

## The For-Each, Not While, Walk-Back

Sumner's most consequential contribution is the limitation he placed on his own enthusiasm, weeks after the "now we loop" wave, in reply to [[armin-ronacher|Armin Ronacher]]'s loop experiments:

> "In my opinion, loops work best around a task queue, more like a for-each rather than a while."

A **while** loop runs continuously until a condition is met (the romantic "let the agent run loose" vision). A **for-each** iterates a *predefined* bounded sequence. Sumner is saying the unbounded while case — the one the hype sold — is not where loops are strong; the bounded task queue is. This is a direct, first-hand tempering of the [[orchestration-loop]] thesis from one of its own practitioners, and it slots into [[agent-loop]]'s hard-stops discipline: the loop should be bounded by the work, not open-ended.

This matters because it is a *temporal correction*: the same circle that implied "loop or be left behind" in early June was articulating the boundaries by late June. See [[discourse-slop]] — "there are no experts on this stuff. There are only people who pretend to be experts."

## Thread

- [[the-agent-workflow]] — Sumner's parallel-agent-first instinct and the for-each/while refinement are workflow-level data on where loops actually pay off
- [[the-slop-problem]] — The missing Bun-port blog post is an instance of claims outpacing receipts

## Related

- [[agent-loop]] — The for-each vs while distinction refines the loop's hard-stops discipline
- [[orchestration-loop]] — Sumner's walk-back tempers Stage-5 enthusiasm: bounded task queues, not unbounded while
- [[discourse-slop]] — The temporal correction (enthusiasm, then limitation, within weeks) is a symptom of discourse slop
- [[armin-ronacher]] — Sumner's for-each/while reply came directly in response to Ronacher's loop experiments
- [[boris-cherny]] / [[peter-steinberger]] — Co-protagonists of the loops wave Sumner tempers
- [[neetcode]] — Source author who surfaced and endorsed Sumner's walk-back

## Sources

- `raw/yt-are-we-really-doing-this-again.md` — Sumner's parallel-Claude-first instinct; "that was a good approach six months ago"; the Zig→Rust Bun port (~700k LOC) and the still-missing blog post; the for-each-not-while walk-back in reply to Armin Ronacher.

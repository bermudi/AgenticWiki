---
title: Boris Cherny
created: 2026-07-01
updated: 2026-07-01
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
unaudited_marginal: 0
tags: [author, claude-code, anthropic, agent-loops, orchestration]
---

# Boris Cherny

> Creator of [[claude-code|Claude Code]] (as a side project, September 2024) — now reportedly behind close to four percent of all public commits on GitHub. Co-protagonist of the "designing loops" discourse, alongside [[peter-steinberger|Steinberger]]: "I don't prompt Claude anymore. I have loops that are running." Landed 259 PRs to Claude Code in 30 days, 100% written by Claude Code, and deleted his IDE.

## The Three-Stage Evolution

Cherny places his own workflow on a three-rung ladder — the fastest way to understand what "designing loops" means in practice:

1. **A year ago**: wrote code by hand with autocomplete.
2. **Then**: ran five to ten Claude sessions in parallel and prompted each one.
3. **Now**: does not prompt at all. He writes loops that prompt Claude, and a couple hundred agents read his GitHub, Slack, and Twitter and decide what to build next.

The plain version of his definition (WorkOS Acquired Unplugged, June 2, 2026): a loop is a small program that prompts the coding agent, reads what it produced, decides whether it is done, and if not prompts it again. The human stops being the thing inside the loop typing prompts and becomes the author of the loop; the model becomes a subroutine.

## The Receipt

> "In the last 30 days, 100% of my contributions to Claude Code were written by Claude Code. I landed 259 PRs."
> — via Simon Willison, December 27, 2025

He deleted his IDE in November (the 259-PR quote is dated December 27, 2025, so late 2025) and has not opened it since.

## The Nuance the Hype Skips

Cherny is **not** saying engineers are obsolete. Someone still has to decide what to build, talk to customers, and coordinate teams — and he says great engineers matter more than ever. The job did not vanish; it moved up an altitude, from writing the code to writing the thing that writes the code. This is the [[the-human-lever|human-lever]] thesis stated from the practitioner's seat.

## Five Tips for Running Opus Autonomously

Cherny's recipe for running Opus autonomously for hours or days (June 2026):

1. **Auto mode for permissions** — so Claude doesn't ask for approval.
2. **Dynamic workflows** — have Claude orchestrate hundreds or thousands of agents to get a task done.
3. **`/goal` or `/loop`** — nudge Claude to keep going until it's done.
4. **Claude Code in the cloud** — so you can close your laptop.
5. **Self-verification** — make sure Claude has a way to check its own work end to end.

Tip five is the one the hype skips and the practitioners obsess over: a loop is only as trustworthy as its ability to check its own work. His canonical `/loop` starter: *babysit all my PRs; auto-fix build issues; when comments come in, use a worktree agent to fix them.*

## Thread

- [[the-agent-workflow]] — Cherny's three-stage evolution is the lived instance of the HITL→AFK→orchestration progression
- [[the-human-lever]] — His "the job moved up an altitude" framing is the human-lever thesis from the practitioner's seat

## Related

- [[claude-code]] — The tool he created
- [[orchestration-loop]] — The Stage-5 pattern he embodies; the `/loop` on-ramp and five tips
- [[agent-loop]] — The umbrella concept; his WorkOS definition is the canonical statement
- [[peter-steinberger]] — Co-protagonist of the loops discourse; Steinberger's tweet, Cherny's definition
- [[the-human-lever]] — The altitude-shift framing
- [[verification-loop]] — His tip five: self-verification as the trust condition for autonomous loops

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — Creator of Claude Code (side project, Sep 2024); the three-stage evolution; the 259-PR / deleted-IDE receipt (via Simon Willison, Dec 2025); the WorkOS loop definition (June 2, 2026); the five autonomous-Opus tips and the `/loop` starter; the "job moved up an altitude" nuance.

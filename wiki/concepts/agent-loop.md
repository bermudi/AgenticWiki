---
title: Agent Loop
created: 2026-07-01
updated: 2026-07-01
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
unaudited_marginal: 0
tags: [concept, agent-loops, autonomous-agents, claude-code, cron, orchestration]
---

# Agent Loop

> A small program you write that prompts a coding agent for you, reads what it produced, decides whether it is done, and if not, prompts it again. You stop being the thing inside the loop typing prompts; you become the author of the loop, and the model becomes a subroutine. The honest framing is "cron plus a decision-maker in the body" — the interesting engineering is everything wrapped around that decision so it does not run off a cliff.

## What a Loop Actually Is

[[boris-cherny|Boris Cherny]] gave the cleanest definition at WorkOS's Acquired Unplugged event (June 2, 2026):

> "Now it's actually leveled up, I think, again, to the next wave of abstraction where I don't prompt Claude anymore. I have loops that are running. They're the ones that are prompting Claude and figuring out what to do. My job is to write loops."

In plain terms: you write the *intent* and the *stopping behavior*, and the loop prompts the agent each tick. The model decides the next action from the current state — not you, and not a hardcoded branch.

### The "Cron Job With a Hat On" Rebuttal

The sharpest skeptic line in the discourse was four words: *"Cronjobs have funny re-branding rn."* It is half right. The scheduling layer *is* cron — Boris literally runs his loops on cron, and Claude Code's `/loop` command uses cron under the hood. If your entire definition of a loop is "a thing that runs on a timer," cron was invented in 1975 and you can go home.

What cron never had is the part in the middle. A cron job runs a fixed script. A loop runs a model that looks at the current state, decides what to do next, does it, checks whether it worked, and decides whether to keep going. **The decision is the agent's, not a hardcoded branch.** The honest framing is that loops are cron plus a decision-maker in the body, and the interesting engineering is everything you wrap around that decision so it does not run off a cliff.

## The Lineage (Five Stages)

The word "loop" caused a brawl because it hides at least five different things. The ladder, oldest to newest:

| Stage | Year | Origin | What changed |
|---|---|---|---|
| **1. Academic while-loop** | 2022 | ReAct paper | The model reasons, calls a tool, reads the result, repeats until done. One model, one loop, a human watching. |
| **2. Goal-driven self-prompting** | 2023 | AutoGPT | Gave the loop a goal and let it prompt itself. Became famous for spinning forever doing nothing — seeding years of agents are a toy. |
| **3. The ralph loop** | Jul 2025 | [[geoffrey-huntley\|Geoffrey Huntley]] | A bash one-liner that pipes the same prompt file into the agent over and over. Innovation was *discipline*: each iteration resets context to fixed anchor files instead of letting the conversation grow. Built a programming language with it for ~$297. |
| **4. Productized `/goal`** | Spring 2026 | Codex + Claude Code | Both shipped a `/goal` command that runs the ralph loop until a small validator model confirms the task is done. |
| **5. Orchestration loops** | 2026 | [[boris-cherny\|Boris Cherny]], [[peter-steinberger\|Peter Steinberger]] | See [[orchestration-loop]]. Loop becomes the unit of work (not the task); loops supervise loops; scheduling replaces the human kickoff; durability becomes explicit. |

Stage 3 — the single-agent ralph loop — is "old hat by now" (in one practitioner's words). Stage 5 — the multi-agent orchestration loop on top of it — is the genuinely new layer. See [[ralph-loop]] for the full mechanics of Stage 3 and [[orchestration-loop]] for Stage 5.

## Hard Stops: Making the Loop Halt

The romantic version of loops is that you write the loops and a thousand agents build your company overnight. The production version is that you write the loops, and most of your job is making sure they halt. Every serious 2026 write-up converges on the same three hard stops:

1. **A maximum iteration count** — the loop cannot run forever.
2. **No-progress detection** — if the loop isn't making headway, stop it.
3. **A token or dollar budget ceiling** — a hard cost wall.

> [!warning] The Loop That Doesn't Stop
> The failure mode everyone in production is scared of is the loop that does not stop. "Without guardrails, you get infinite loops and billing surprises orders of magnitude over budget." An open loop that writes code with no feedback is a machine for generating confident mistakes. A loop that writes, runs, reads the result, and corrects is the thing that actually works — the loop is not the magic, the *feedback inside it* is. See [[verification-loop]] and [[compounding-booboos]].

## The Cost Shift: Loop Management Is Now the Expensive Part

When the model writes code for almost nothing, the cost moves to the loop running it. The shift is real and financial:

> "The costliest thing in AI coding is no longer writing code, it's managing the agent loop."

The receipt of the month: Uber capped its engineers at **$1,500 per person per tool per month** for Claude Code and Cursor after burning its annual AI budget in four months. The deflating engineering take: "Every AI agent I shipped this year is a for-loop, an LLM call, and a try/catch around the JSON parsing. The only thing agentic about it is the Anthropic bill at the end of the month."

> [!note] Relation to the Review Bottleneck
> This is the dollar-cost twin of the review-bottleneck thesis (Ronacher's *The Final Bottleneck*): the bottleneck moved off "writing code." Ronacher locates it in *human review capacity*; this source locates it in *loop-management cost*. Both are "where did the expense go" arguments — one measures human attention, the other measures money. They reinforce rather than contradict each other.

Gartner places agentic AI at the peak of inflated expectations, with only ~17% of organizations actually deploying agents. The gap between the timeline's enthusiasm and the receipts is the real state of play.

## Skills, Not Prompts, Are the Reusable Unit

[[peter-steinberger|Steinberger]]'s more durable half of the loops thesis: **if you do something more than once, turn it into an automated [[agent-skills|skill]]**; if you do something hard, turn it into a skill afterward so next time is free. The article's author (Matt Van Horn) frames the consequence for loops:

> A loop with no reusable skills inside it is just a while-true around a stranger. A loop that calls a library of sharp, tested, named skills is a system that compounds.

A loop is plumbing. The asset is the skill it calls. Loops that call sharp named skills compound; loops that re-derive everything just burn money. This reframes the loop not as a prompt-engineering artifact but as an execution harness for a [[procedural-knowledge|procedural-knowledge]] library.

## Thread

- [[the-agent-workflow]] — The agent loop is the AFK execution substrate; the cost-shift and hard-stops discipline belong in the workflow's production layer
- [[tool-design-for-agents]] — Skills as the reusable unit the loop dispatches; the loop is the harness, the skill is the judgment
- [[the-verifiability-thesis]] — The loop's cost discipline is the verifiability thesis applied to the loop's economic feedback channel; the hard stops (max iterations, no-progress, dollar budget) are the operationalization

## Related

- [[ralph-loop]] — Stage 3: the minimalist bash loop with fresh context per iteration
- [[orchestration-loop]] — Stage 5: loops supervising loops, scheduled, durable
- [[verification-loop]] — The feedback inside the loop is what makes it trustworthy, not the loop itself
- [[afk-agent]] — The agent loop is the canonical AFK execution pattern
- [[compounding-booboos]] — Why an open loop with no feedback generates compounding mistakes
- [[agent-skills]] — The reusable unit inside the loop is a skill, not a prompt
- [[babysitter-agent]] — A different persistence mechanism: invisible single-master context management vs. the loop's tick-based prompting
- [[armin-ronacher]] — His *The Final Bottleneck* thesis (review capacity) is the human-attention twin of this source's cost-shift thesis
- [[multi-agent-illusion]] — Tempers orchestration enthusiasm: automated multi-agent search largely fails; hand-designed loops are the case that works

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — The unified loop concept, the five-stage lineage (ReAct → AutoGPT → ralph → /goal → orchestration), the cron rebuttal, hard stops, the cost-shift thesis (Uber cap), and skills as the reusable unit. Quotes Cherny's WorkOS definition and Steinberger's tweet.

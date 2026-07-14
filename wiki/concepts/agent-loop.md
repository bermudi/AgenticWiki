---
title: Agent Loop
created: 2026-07-01
updated: 2026-07-14
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
  - raw/yt-only-the-best-are-using-them.md
  - raw/yt-7-insane-loops-you-need-to-try-right-now.md
  - raw/yt-i-guess-were-writing-loops-now.md
  - raw/yt-are-we-really-doing-this-again.md
  - raw/2511.09030-maker-million-step-zero-errors.md
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
  - raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md
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

The sharpest skeptic line in the discourse was four words: *"Cronjobs have funny re-branding rn."* [[neetcode|NeetCode]] arrives at the same position from the outside — "conceptually, this is very trivial stuff... basically a long-running task, aka a loop... like a cron job" — while conceding he already runs one. The rebuttal below is the response. The skeptic line is half right. The scheduling layer *is* cron — Boris literally runs his loops on cron, and Claude Code's `/loop` command uses cron under the hood. If your entire definition of a loop is "a thing that runs on a timer," cron was invented in 1975 and you can go home.

What cron never had is the part in the middle. A cron job runs a fixed script. A loop runs a model that looks at the current state, decides what to do next, does it, checks whether it worked, and decides whether to keep going. **The decision is the agent's, not a hardcoded branch.** The honest framing is that loops are cron plus a decision-maker in the body, and the interesting engineering is everything you wrap around that decision so it does not run off a cliff.

### Automation vs. Loop: The Decision Is the Difference

[[matthew-berman|Matthew Berman]] sharpens the same point by separating loops from their nearest neighbor — automations. The two are easy to conflate because both run on a trigger, but the difference is load-bearing:

> "The difference between a loop and an automation is that a loop has some decision inside the loop. It is deciding if it reached the goal or not. It is not just executing a series of prompts... With a loop, you are specifically giving the loop the ability to determine if it reached its goal or not."

An automation executes a fixed sequence of prompts or code. A loop *decides* whether it is done. That decision — and the goal-verification behind it — is the entire substance. Strip the decision out and you have an automation, however sophisticated.

A loop needs exactly two things, and only two: a **trigger** and a **goal**. The triggers come in three and only three flavors (Berman's taxonomy): an **action** (a PR opens), a **schedule** (cron — every 30 min, daily), or a **human** (a manual kickoff, still a valid trigger). The goal is either **verifiable** (deterministic: tests pass, 100% coverage, page load under 50 ms) or **LLM-as-judge** (non-deterministic: "refactor until satisfied"). That trigger + goal grammar is the minimum viable loop.

## The Lineage (Five Stages)

The word "loop" caused a brawl because it hides at least five different things. The ladder, oldest to newest:

| Stage | Year | Origin | What changed |
|---|---|---|---|
| **1. Academic while-loop** | 2022 | ReAct paper | The model reasons, calls a tool, reads the result, repeats until done. One model, one loop, a human watching. |
| **2. Goal-driven self-prompting** | 2023 | AutoGPT | Gave the loop a goal and let it prompt itself. Became famous for spinning forever doing nothing — seeding years of agents are a toy. |
| **3. The ralph loop** | Jul 2025 | [[geoffrey-huntley|Geoffrey Huntley]] | A bash one-liner that pipes the same prompt file into the agent over and over. Innovation was *discipline*: each iteration resets context to fixed anchor files instead of letting the conversation grow. Built a programming language with it for ~$297. |
| **4. Productized `/goal`** | Spring 2026 | Codex + Claude Code | Both shipped a `/goal` command that runs the ralph loop until a small validator model confirms the task is done. |
| **5. Orchestration loops** | 2026 | [[boris-cherny|Boris Cherny]], [[peter-steinberger|Peter Steinberger]] | See [[orchestration-loop]]. Loop becomes the unit of work (not the task); loops supervise loops; scheduling replaces the human kickoff; durability becomes explicit. |

Stage 3 — the single-agent ralph loop — is "old hat by now" (in one practitioner's words). Stage 5 — the multi-agent orchestration loop on top of it — is the genuinely new layer. See [[ralph-loop]] for the full mechanics of Stage 3 and [[orchestration-loop]] for Stage 5.

> [!note] Extension: a sixth paradigm — maximal decomposition
> [[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] (Meyerson et al., 2025) add a sixth stage to the lineage: the loop body becomes a *single LLM step* executed by a focused microagent, with per-step voting as the convergence mechanism. Where Stage 3 (ralph) resets context per iteration to a fixed anchor file, Stage 6 (MDAP) reduces the iteration to one step and replaces the human-authored stopping condition with first-to-ahead-by-k voting. The million-step zero-error Towers of Hanoi result is the limit case: a loop of 1,048,575 single-step microagents, each verified by voting, with log-linear cost scaling. This is a reasonable but unvalidated extension of the lineage — the practitioner sources for Stages 1–5 do not name this paradigm; the MDAP paper supplies it from a different tradition (asymptotic analysis of LLM primitives, microservices architecture).

> [!note] Departure: `/goal` (Linear) vs. Dynamic Workflow (Generative)
> Stage 4's `/goal` and Stage 5's dynamic workflow look similar but differ in shape. [[theo-t3gg|Theo]] draws the line: `/goal` is a **linear, never-ending single thread** that keeps double-checking "did you finish the work? if no, keep going." A **dynamic workflow** takes a pre-planned goal and *generates* sub-threads and sub-loops based on the specific problem — "a dynamic workflow that was created based on the specific needs of this specific problem." Linear `/goal` plugs along on one thread; a dynamic workflow spawns the structure the work demands. Both are loops; only the latter creates loops (see [[orchestration-loop]]).

## Hard Stops: Making the Loop Halt

The romantic version of loops is that you write the loops and a thousand agents build your company overnight. The production version is that you write the loops, and most of your job is making sure they halt. Every serious 2026 write-up converges on the same three hard stops:

1. **A maximum iteration count** — the loop cannot run forever.
2. **No-progress detection** — if the loop isn't making headway, stop it.
3. **A token or dollar budget ceiling** — a hard cost wall.

> [!warning] The Loop That Doesn't Stop
> The failure mode everyone in production is scared of is the loop that does not stop. "Without guardrails, you get infinite loops and billing surprises orders of magnitude over budget." An open loop that writes code with no feedback is a machine for generating confident mistakes. A loop that writes, runs, reads the result, and corrects is the thing that actually works — the loop is not the magic, the *feedback inside it* is. See [[verification-loop]] and [[compounding-booboos]].

## For-Each, Not While: Bounded Task Queues

The hard-stops discipline has a sharper articulation from the practitioners themselves: loops are strong around a *bounded task queue* and weak as an *unbounded pursuit*. [[jarred-sumner|Jarred Sumner]], weeks after boosting the "now we loop" wave, walked it back: "loops work best around a task queue, more like a for-each rather than a while." A **while** runs continuously until a condition is met — the romantic "let the agent run loose" vision the hype sold. A **for-each** iterates a *predefined* bounded sequence. The honest reading is that the unbounded while case is not where loops pay off; the bounded for-each is. This is a first-hand tempering of the [[orchestration-loop|Stage-5]] enthusiasm from one of its own practitioners, and it is also why the exponential-decay objection bites: at 95% per-iteration accuracy, ten unbounded iterations collapse to ~60% overall (0.95¹⁰) — see [[compounding-booboos]]. Bounded iteration counts are not optional polish; they are what keeps the decay product above water.

## The Cost Shift: Loop Management Is Now the Expensive Part

When the model writes code for almost nothing, the cost moves to the loop running it. The shift is real and financial:

> "The costliest thing in AI coding is no longer writing code, it's managing the agent loop."

The receipt of the month: Uber capped its engineers at **$1,500 per person per tool per month** for Claude Code and Cursor after burning its annual AI budget in four months. The deflating engineering take: "Every AI agent I shipped this year is a for-loop, an LLM call, and a try/catch around the JSON parsing. The only thing agentic about it is the Anthropic bill at the end of the month."

The firsthand practitioner receipt cuts the other way. [[theo-t3gg|Theo]] tracked his own loop usage: roughly **$10,000 of inference in a month across his machines, for $600 of flat-rate subscriptions** (three $200 plans) — with five such loops running over that stretch, he still finished the week at only 29% of his weekly limit. His framing is that idle subscription capacity is wasted money: "the 70% I'm not going to hit... is thousands of dollars of inference that I paid for that I could have done that I didn't do." The cautionary datum in the same run: one agent spent under 10 minutes leaving review feedback, and the Opus workflow addressing it ran **eight hours and over three million tokens to address three small comments**. Flat-rate subscriptions make loops affordable; they do not make runaway loops cheap.

> [!note] Relation to the Review Bottleneck
> This is the dollar-cost twin of the review-bottleneck thesis (Ronacher's *The Final Bottleneck*): the bottleneck moved off "writing code." Ronacher locates it in *human review capacity*; this source locates it in *loop-management cost*. Both are "where did the expense go" arguments — one measures human attention, the other measures money. They reinforce rather than contradict each other.

Gartner places agentic AI at the peak of inflated expectations, with only ~17% of organizations actually deploying agents. The gap between the timeline's enthusiasm and the receipts is the real state of play.

## Skills, Not Prompts, Are the Reusable Unit

[[peter-steinberger|Steinberger]]'s more durable half of the loops thesis: **if you do something more than once, turn it into an automated [[agent-skills|skill]]**; if you do something hard, turn it into a skill afterward so next time is free. The article's author (Matt Van Horn) frames the consequence for loops:

> A loop with no reusable skills inside it is just a while-true around a stranger. A loop that calls a library of sharp, tested, named skills is a system that compounds.

A loop is plumbing. The asset is the skill it calls. Loops that call sharp named skills compound; loops that re-derive everything just burn money. This reframes the loop not as a prompt-engineering artifact but as an execution harness for a [[procedural-knowledge|procedural-knowledge]] library.

### Concrete Patterns — and Where Loops Break

The loops people actually run sort cleanly by goal type. Verifiable goals: sub-50ms page-load optimization, logging coverage to "every important path," production error sweep (trace → root-cause → fix → PR → Slack ping). LLM-as-judge goals: overnight docs sweep, architecture-satisfaction refactor ("refactor until you are happy with the architecture"), full product evaluation across N scenarios. The verifiable ones are reliable; the judged ones are "a little more brittle because we are leaving taste and judgment up to the model."

> [!warning] Contradiction: Loops Can't Build Features (Yet)
> Even the technique's popularizers concede the wall. Berman: *"I have not really found a way to build features with loops. You cannot say 'loop until we build a full permissioning system'... I don't know which direction the AI is going to go."* [[armin-ronacher|Armin Ronacher]]'s own weekend loop experiments hit the same wall from the opposite direction: "The only cases where they work so far for me are a review" — and he openly asked whether anyone had made loops work for *implementation* on a medium-sized project. Loops optimize toward an end state they can recognize; they do not *choose* the end state. Day-zero feature building — where the goal is itself discovered through exploration — is precisely where the goal-verification grammar breaks down. This is the [[aiming-problem]] at the loop level: a loop can pursue a goal but cannot aim one.

> [!warning] The Review-Until-Satisfied Loop Inflates Complexity
> The natural shape of an LLM-as-judge loop — generate from scratch, review, feed the review findings back in, repeat until "satisfied" — does not converge on minimal code. [[armin-ronacher|Armin Ronacher]] reports it converges on "the most complex and ungodly code possibly imaginable," because a reviewer can always find *something* to improve, so the loop chases an unstable equilibrium it can never settle. The reviewer never returns "done"; it returns "more." (He relays a mitigation he has heard: run the review pass at lower reasoning budget so it does not over-engage and manufacture endless nits.) This is the [[aiming-problem]] at a second remove: even when the loop *has* a goal, a reviewer with no stopping discipline turns "satisfice" into "maximize," and maximized code is rarely the goal. It is also the loop-level form of [[iterative-self-correction]]'s overcorrection ceiling — unbounded review does not improve quality, it inflates it.

## Thread

- [[the-agent-workflow]] — The agent loop is the AFK execution substrate; the cost-shift and hard-stops discipline belong in the workflow's production layer
- [[tool-design-for-agents]] — Skills as the reusable unit the loop dispatches; the loop is the harness, the skill is the judgment
- [[the-verifiability-thesis]] — The loop's cost discipline is the verifiability thesis applied to the loop's economic feedback channel; the hard stops (max iterations, no-progress, dollar budget) are the operationalization
- [[the-cognitive-cost]] — The loops wave is the maximal-delegation frontier; removing the human from the per-turn loop accelerates cognitive erosion

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
- [[compounding-loops]] — Lateral loop cooperation via shared state, a sibling to hierarchical orchestration
- [[matthew-berman]] — The automation-vs-loop distinction and trigger taxonomy
- [[theo-t3gg]] — Firsthand loop receipts and the /goal-vs-dynamic-workflow distinction
- [[jarred-sumner]] — The for-each-not-while refinement: loops work best around a bounded task queue
- [[neetcode]] — The skeptic auditor: "it's just cron," the exponential-decay objection
- [[discourse-slop]] — The meta-discourse around loops (the viral "designing loops" wave) is itself slop-prone
- [[massively-decomposed-agentic-processes]] — the sixth paradigm in the lineage: single-step microagents + per-step voting; the million-step zero-error limit case
- [[maker]] — the implementation; Towers of Hanoi as the execution-pole demonstration that per-step voting replaces the human-authored stopping condition
- [[good-night-have-fun]] — Bounded, capped agent loop for overnight verifiable objectives

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — The unified loop concept, the five-stage lineage (ReAct → AutoGPT → ralph → /goal → orchestration), the cron rebuttal, hard stops, the cost-shift thesis (Uber cap), and skills as the reusable unit. Quotes Cherny's WorkOS definition and Steinberger's tweet.
- `raw/yt-only-the-best-are-using-them.md` — The automation-vs-loop distinction (decision inside the loop), the three-trigger taxonomy (action/schedule/human), verifiable vs. LLM-as-judge goals, and the cost/expertise bifurcation.
- `raw/yt-7-insane-loops-you-need-to-try-right-now.md` — Concrete loop patterns sorted by goal type (the Loop Library), and the "loops can't build features" tension.
- `raw/yt-i-guess-were-writing-loops-now.md` — Firsthand cost receipts ($10K inference for $600 of subscriptions; the 8-hour/3M-token comment loop), the /goal-vs-dynamic-workflow distinction, and the "prompt yourself out of involvement" heuristic.
- `raw/yt-are-we-really-doing-this-again.md` — [[neetcode|NeetCode]]'s skeptic audit: the "it's just cron" position, the for-each-not-while refinement (via [[jarred-sumner|Jarred Sumner]]), the exponential-decay objection (0.95¹⁰), and [[armin-ronacher|Armin Ronacher]]'s loop-experiment finding (review-only).
- `raw/2511.09030-maker-million-step-zero-errors.md` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3.1 maximal agentic decomposition (single-step microagents); §3.2 first-to-ahead-by-k voting as the convergence mechanism; §4.4 the million-step zero-error result. Source for the "sixth paradigm" Extension callout.
- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Kun Chen: Good Night, Have Fun as a bounded agent loop with explicit token/iteration caps and stop conditions; comparison to `/goal` commands; overnight verifiable objectives.
- `raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md` — [[armin-ronacher|Ronacher]] on the review-until-satisfied loop converging on "the most complex and ungodly code" (unstable equilibrium, reviewer always finds more) and the lower-reasoning-budget mitigation he relays having heard. Source for the "Review-Until-Satisfied Loop Inflates Complexity" warning.

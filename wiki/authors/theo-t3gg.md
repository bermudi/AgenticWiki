---
title: "Theo (t3.gg)"
created: 2026-06-03
updated: 2026-07-22
sources:
  - raw/yt-we-all-fell-for-it.md
  - raw/yt-i-guess-were-writing-loops-now.md
  - raw/yt-the-next-paradigm-shift-according-to-karpathy.md
  - raw/yt-you-need-to-read-less-code.md
tags: [author, ai-engineering, cognitive-debt, tool-design, agent-loops]
unaudited_marginal: 0
---

# Theo (t3.gg)

> YouTube creator, developer, and founder of t3.gg. Creator of the T3 Stack and T3 Code (open-source coding agent). Provides extensive commentary on AI-assisted development from the perspective of someone who both loves coding and has deeply integrated AI tools into his workflow. Key contributions: the skateboarding metaphor for learning pain, the code-frequency distinction (ship vs. one-off), and the argument that vendor lock-in is a competence failure.

## Key Contributions

**The skateboarding metaphor**: Learning to code (like learning to ollie) hurts. AI removes the pain, but the pain was the learning signal. Most people will choose the slot machine over the lesson.

**Code frequency distinction**: Different code deserves different treatment. Code that ships to users must be deeply understood. One-off scripts and exploratory code can be vibed. Confusing the two is catastrophic.

**Vendor lock-in as competence failure**: "If you're experiencing vendor lock-in right now, that is your fault." Multiple providers exist (Claude, Codex, Cursor, Open Code). Reliance on a single provider is a choice, not a structural inevitability.

**Token cost correction**: Costs per intelligence unit are dropping rapidly. GPT-5.5 low is 8x cheaper per IQ point than Sonnet 4.6 from months ago. The bill looks bigger because we're using more tokens, not because each token costs more.

**The debugging story**: He can debug a codebase he hasn't touched in 4 years because he understands the *layers* (T3 stack), not the specific code. AI amplified that understanding rather than replacing it.

**Read less code**: The read:generate ratio has flipped — AI makes code cheap, so the constraint is no longer production code volume but verification capacity. If your code is important, write more slop to verify it (custom debuggers, test harnesses, runtimes), not read every line.

## Position on the Spectrum

Theo sits between the "orchestrate everything" camp and the "write everything yourself" camp. He uses AI extensively — barely looks at code in his editor anymore, mostly looks at prompt files and CSV data from agent runs. But he maintains deep system understanding and actively seeks out learning friction (building in Rust, exploring cryptography).

His key distinction: the problem isn't AI use, it's **AI use without foundation**. "AI is going to take bad devs and make them atrocious. But devs who love this, who really care about how things work... will take advantage of these tools to accelerate how quickly they learn and grow."

## The Loops Conversion

A firsthand arc from loops skeptic to practitioner. Theo had written off autonomous loops after the [[ralph-loop|Ralph loop]] — "they were really cool, but they didn't seem that productive" and "massively increased the error rate." The conversion came incrementally: first a loop that watches a PR and addresses review comments (CodeRabbit, Graphite, Macroscope) so he stopped copy-pasting comments into the agent by hand; then a full multi-stage workflow.

**Dynamic loop creation.** The breakout moment: he asked the model to build a workflow that files a PR, spins up a review thread, loops on comments until approved, then merges and triggers the next piece. It built it — and ran overnight, producing four stacked, reviewed, merged PRs. See [[orchestration-loop]]: "my loops created loops," the topology generated from the shape of the work rather than hardcoded.

**The "prompt yourself out of involvement" heuristic.** His practical method: pay attention to what you do *after* the agent completes a task — run the dev server, check it worked, commit, push, file a PR, gather review, address feedback, merge — then tell the agent to do each of those steps. "Find where you have to be involved and see what it takes to prompt yourself out of it." The corollary, delivered as a provocation: "if you are reading the code your agent put out before another agent read it and gave feedback on it, you're wasting your own time."

**Cost as a challenge, not a constraint.** Theo frames flat-rate subscriptions as a budget to *max out*, not hoard: roughly $10,000 of inference in a month across his machines for $600 of plans, finishing weeks at 29% of his weekly limit. The cautionary datum in the same run: a generated workflow ran eight hours and 3M+ tokens to address three review comments. See [[agent-loop]]'s cost-shift.

**Against predefined agent personas.** He dismisses the fashion for hardcoding agent roles in markdown ("the adversarial reviewer, the security reviewer, the grokker and finder") as fundamentally missing the point: "The agent can build the context it needs... without having everything pre-built and hard-coded ahead of time." This aligns with the [[multi-agent-illusion]] finding that elaborate auto-discovered multi-agent structure collapses to CoT-SC; the value is in dynamic, problem-shaped orchestration, not prefabricated personas.

## The Org-Level Agent (Channel-Scoped)

His next move after the loops conversion: the agent as a **persistent, channel-scoped teammate**, not a session you drive. Reacting to [[andrej-karpathy|Karpathy]]'s [[llm-ui-paradigms|"third paradigm"]] post about [[claude-tag|Claude Tag]], Theo isolates the property that makes it more than a Slack bot: **the channel as context boundary** (see [[context-engineering]]). Existing tools offer only global or project-specific scoping — too coarse for the real tangle of people, projects, teams, and tasks. A channel maps naturally to how teams already work, and — crucially — it's independent of codebase topology, so context lives at the channel, not the repo.

**The custom-isolate mirror.** He had already built the same value prop by hand: a "Hermes agent" running in Discord as one Docker isolate per channel/purpose (sponsor deals, content planning, codebase updates), each with its own skills and connectors. Discord **threads**, not a single running thread, are the key — a single-thread agent (his failed OpenClaw setup) prunes context constantly and lets scheduled tasks pollute unrelated work. Per-thread/per-channel scoping fixes it; a scheduled 11 a.m. meme-scraping job lives in its own thread and never bleeds into a sponsor-deal conversation.

**Model lock-in as the cost of productization.** His sharpest critique of Claude Tag: it binds the paradigm to one lab. His Hermes setup lets him **switch models freely** (GLM, GPT-5.5, Claude, Fable) per channel, and he routinely instructs one model to call another — Codex/GPT-5.5 calling Claude for API design and UI work, where GPT-5.5 is weak. Claude Tag offers none of that control. He frames it as a fork — full custom isolation with model freedom, versus Claude Tag where most of it works by default but you're locked to Anthropic — and explicitly wants competitors to clone the pattern so teams aren't "reliant on just one lab." (This extends his standing thesis that vendor lock-in is a competence failure.)

## Read Less Code (Hear Me Out)

Theo's argument that most engineers should read *less* code, not more — because AI makes code cheap, and the real leverage is in generating verification code rather than reading production code line-by-line.

**The code importance spectrum.** Code falls on a spectrum from "slop" (a pet store website with one viewer) to "death" (pacemaker firmware that keeps hearts beating). All software fits somewhere on this spectrum, and the conversation around AI code is "plagued by this spectrum" — people assume the person talking is at their level or better, or below them, when in reality the spectrum matters more than individual egos. The vast majority of code is somewhere in the middle: important enough that bad business things happen if it breaks, but not life-critical.

**The read:generate ratio has flipped.** In the pre-AI era, Theo would write ~200 lines and read ~1,000 lines in a day — reading outnumbered writing 5:1. Now he generates ~2,000 lines but still reads ~1,000 — generation outnumbers reading 2:1. The ratio inverted: where reading once dominated the day, generation now does. This used to make sense when writing code was expensive and every merged line was important. Now code is "goddamn cheap" — the constraint is no longer production code, it's verification.

**Fighting slop with slop for verification.** If your code is so important that every line must be verified (bankruptcies, deaths, stopped hearts), you should be writing an "unbelievable amount of slop" — not for production, but to verify the production code. Every line of production code should have 100 lines of slop verifying it, 10,000 lines of slop you can use to verify the system. Build custom debuggers, custom runtimes, custom logging systems, custom lint rules. The argument: "you cannot convince me that your code is so important that AI can't touch it, but it's not important enough to build verification systems."

**The funnel of importance.** Code should be thought of as a funnel: the vast majority at the top (slop), a tiny percentage at the bottom (death-critical). This gap is widening rapidly. Engineers should be writing code across all tiers — not just the critical tier — because the cheap code at the top is what verifies and tests the critical code at the bottom. "If you're not finding these opportunities, you're not curious enough. You're not creative enough."

> [!note] Departure: Read Less, Generate More
> This directly challenges the wiki's existing framing that the human's job is to "own design boundaries and verify outcomes" by reading code. Theo's position: the human should own the *verification strategy* (designing test harnesses, debuggers, runtimes) and let AI generate the verification code. The human doesn't read every line of production code — they design systems that verify it. This is an extension of the [[fighting-slop-with-slop|fighting slop with slop]] principle applied to the verification layer, not just the tooling layer.

## Related

- [[lars-faye]] — Author of the article Theo responds to
- [[cognitive-debt]] — Theo's commentary adds nuance to the concept
- [[skill-atrophy]] — Theo's skateboarding metaphor explains the mechanism
- [[the-cognitive-cost]] — The thread Theo's video anchors alongside Faye's article
- [[orchestration-loop]] — His dynamic loop generation ("my loops created loops") is the frontier of Stage 5
- [[agent-loop]] — His firsthand cost receipts and the /goal-vs-dynamic-workflow distinction
- [[multi-agent-illusion]] — His dismissal of predefined personas aligns with the audit
- [[peter-steinberger]] — The "Pete" whose loops thesis Theo converted to
- [[llm-ui-paradigms]] — Amplified Karpathy's third-paradigm framing with the channel-as-context-boundary insight
- [[claude-tag]] — The product whose org-level-agent pattern Theo both praises and critiques (model lock-in)
- [[context-engineering]] — Theo isolates the channel as the natural context-scoping unit
- [[proactive-service]] — Claude Tag's ambient mode, via Theo's account
- T3 Code — Theo's open-source coding agent (no wiki page yet)

## Sources

- `raw/yt-we-all-fell-for-it.md` — "We all fell for it…" (June 2026); video response to Lars Faye's article; extensive commentary on cognitive debt, skill atrophy, token costs, vendor lock-in, and the code-frequency distinction
- `raw/yt-i-guess-were-writing-loops-now.md` — "I guess we're writing loops now?" (2026); firsthand loops-conversion arc, dynamic loop generation, the "prompt yourself out of involvement" heuristic, cost-as-challenge framing (~$10K inference for $600 of plans), and the case against predefined agent personas.
- `raw/yt-the-next-paradigm-shift-according-to-karpathy.md` — "The next paradigm shift (according to Karpathy)" (2026); reaction to Karpathy's Claude Tag post. Source for the channel-as-context-boundary insight, the per-channel Docker-isolate "Hermes agent" setup (Discord threads over single-thread agents), and the model-lock-in / agent-to-agent-delegation critique (switching GLM / GPT-5.5 / Claude / Fable per channel).
- `raw/yt-you-need-to-read-less-code.md` — "You need to read less code (hear me out)" (2026); the code importance spectrum (slop → death), the flipped read:generate ratio, and the argument that if your code is important you should write more slop to verify it — extending fighting slop with slop to the verification layer.

---
title: "Theo (t3.gg)"
created: 2026-06-03
updated: 2026-07-02
sources:
  - raw/yt-we-all-fell-for-it.md
  - raw/yt-i-guess-were-writing-loops-now.md
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

## Position on the Spectrum

Theo sits between the "orchestrate everything" camp and the "write everything yourself" camp. He uses AI extensively — barely looks at code in his editor anymore, mostly looks at prompt files and CSV data from agent runs. But he maintains deep system understanding and actively seeks out learning friction (building in Rust, exploring cryptography).

His key distinction: the problem isn't AI use, it's **AI use without foundation**. "AI is going to take bad devs and make them atrocious. But devs who love this, who really care about how things work... will take advantage of these tools to accelerate how quickly they learn and grow."

## The Loops Conversion

A firsthand arc from loops skeptic to practitioner. Theo had written off autonomous loops after the [[ralph-loop|Ralph loop]] — "they were really cool, but they didn't seem that productive" and "massively increased the error rate." The conversion came incrementally: first a loop that watches a PR and addresses review comments (CodeRabbit, Graphite, Macroscope) so he stopped copy-pasting comments into the agent by hand; then a full multi-stage workflow.

**Dynamic loop creation.** The breakout moment: he asked the model to build a workflow that files a PR, spins up a review thread, loops on comments until approved, then merges and triggers the next piece. It built it — and ran overnight, producing four stacked, reviewed, merged PRs. See [[orchestration-loop]]: "my loops created loops," the topology generated from the shape of the work rather than hardcoded.

**The "prompt yourself out of involvement" heuristic.** His practical method: pay attention to what you do *after* the agent completes a task — run the dev server, check it worked, commit, push, file a PR, gather review, address feedback, merge — then tell the agent to do each of those steps. "Find where you have to be involved and see what it takes to prompt yourself out of it." The corollary, delivered as a provocation: "if you are reading the code your agent put out before another agent read it and gave feedback on it, you're wasting your own time."

**Cost as a challenge, not a constraint.** Theo frames flat-rate subscriptions as a budget to *max out*, not hoard: roughly $10,000 of inference in a month across his machines for $600 of plans, finishing weeks at 29% of his weekly limit. The cautionary datum in the same run: a generated workflow ran eight hours and 3M+ tokens to address three review comments. See [[agent-loop]]'s cost-shift.

**Against predefined agent personas.** He dismisses the fashion for hardcoding agent roles in markdown ("the adversarial reviewer, the security reviewer, the grokker and finder") as fundamentally missing the point: "The agent can build the context it needs... without having everything pre-built and hard-coded ahead of time." This aligns with the [[multi-agent-illusion]] finding that elaborate auto-discovered multi-agent structure collapses to CoT-SC; the value is in dynamic, problem-shaped orchestration, not prefabricated personas.

## Related

- [[lars-faye]] — Author of the article Theo responds to
- [[cognitive-debt]] — Theo's commentary adds nuance to the concept
- [[skill-atrophy]] — Theo's skateboarding metaphor explains the mechanism
- [[the-cognitive-cost]] — The thread Theo's video anchors alongside Faye's article
- [[orchestration-loop]] — His dynamic loop generation ("my loops created loops") is the frontier of Stage 5
- [[agent-loop]] — His firsthand cost receipts and the /goal-vs-dynamic-workflow distinction
- [[multi-agent-illusion]] — His dismissal of predefined personas aligns with the audit
- [[peter-steinberger]] — The "Pete" whose loops thesis Theo converted to
- T3 Code — Theo's open-source coding agent (no wiki page yet)

## Sources

- `raw/yt-we-all-fell-for-it.md` — "We all fell for it…" (June 2026); video response to Lars Faye's article; extensive commentary on cognitive debt, skill atrophy, token costs, vendor lock-in, and the code-frequency distinction
- `raw/yt-i-guess-were-writing-loops-now.md` — "I guess we're writing loops now?" (2026); firsthand loops-conversion arc, dynamic loop generation, the "prompt yourself out of involvement" heuristic, cost-as-challenge framing (~$10K inference for $600 of plans), and the case against predefined agent personas.

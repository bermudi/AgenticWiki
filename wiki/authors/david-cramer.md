---
title: David Cramer
created: 2026-07-18
updated: 2026-07-18
sources:
  - raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md
unaudited_marginal: 0
tags: [author, ai-engineering, sentry, open-source, mcp]
---

# David Cramer

> Co-founder and CTO of [[sentry]]. One of the few C-level engineers shipping production software with AI at scale. A grounded skeptic of the "100x developer" hype who forced himself to stop writing code by hand almost a year before the interview — not because AI is better, but to build first-person experience. His position: LLMs are genuinely useful but produce junk code, the AI industry is a bubble, and software engineering fundamentals haven't changed.

## Position

Cramer's core stance is pragmatic skepticism. He uses AI daily, spent ~$3M/year on AI tooling across Sentry's ~200 engineers ($15K/year per developer), and built Sentry's [[mcp|MCP server]] — but he's blunt about the limits:

- **"The 100x thing is BS."** The only way you get more done is when you generate junk you don't need. For any sufficiently complicated software, getting one quality piece of code out is not easier than it used to be.
- **"LLMs produce junk."** There's absolutely no way to produce good software by prompting LLMs — "no matter what, it's going to be bloated, overengineered, complex, Java everywhere, Java factory patterns non-stop."
- **"Software verification is the hardest problem."** We've not made it any better. Code review bots help a little, but "we're spending inference to fix all the other stuff that was from inference."
- **"Nobody credible says software engineering is changing."** Systems design, the knowledge you need, the way you design systems — none of it has gotten easier. LLMs don't give you architectural decisions.

He compares his position to Peter Steinberger's high-output vibe coding approach: impressive output, but it's "a damn chatbot" where they've accepted all risk. If Cramer ships something with massive vulnerabilities in Sentry, "that could cause the company to disappear." The liability asymmetry is the binding constraint.

## AI Budget Philosophy

Sentry treats AI spend as R&D, not a line item with expected ROI. The CTO proposed a $3M/year budget; Cramer approved it immediately. His decision process: "If I believe in it, that's it. I don't need any other evidence beyond that." He estimates the actual productivity boost is "low tens percent" — not 100x, but enough to justify the spend.

The per-developer budget (~$1,500/month) is blended — some engineers burn through tokens, others use it moderately. Cramer considers it too early to evaluate ROI per individual. The important thing is that engineers learn how to use LLMs, even if some of the spend is currently wasted.

## MCP and Tool Design

Cramer built Sentry's MCP server and uses it daily in his own coding agents. His practical experience:

- **MCP is high-value for UX**: A plugin that drops in with native authentication, tool controls, and permission systems creates "a really, really good experience" compared to arbitrary shell commands or CLIs.
- **The protocol has flaws**: It should have been stateless from default, should have been just HTTP. The OAuth (DCR) is "suffocated" and not fully secure. Transport mechanism issues cause persistent deauthentication.
- **Progressive discovery pattern**: Sentry shipped a search-and-execute tool that buries other tools behind it — "code mode" — and it "still works exceedingly well." Constrain tools to avoid context pollution.
- **Most of the spec doesn't survive**: Resources were never used. Prompts are dead. Tools are great. Skills are coming. The UI part is "neat, not market demand."

Cramer sees MCP as "the first time in my career that I've seen a reverse integration like this where you can build a plugin and it just works for all future partners." But he's frustrated that the spec was published too early and that big companies treat standards as committee exercises.

## Open Source Under Pressure

Cramer believes the old model of open source is dead. Three pressures from AI:

1. **Slop pull requests**: More junk PRs, accidental PRs opened on the wrong repo, AI-generated contributions that require more review effort than they're worth.
2. **IP theft**: People using LLMs to reimplement licensed code and claiming "clean room" solutions. Cramer is blunt: "We will sue the shit out of anybody that does that and we will win because that's not how the law works."
3. **DIY culture**: Everyone builds their own v0 because it's easy, then assumes that's where it's complete. Three weeks of interface design and taste work matter for long-term health — but people skip it.

He despises open core ("crippleware") and advocates for fair source (delayed open source — after 2 years it becomes permissibly licensed). Sentry's own model: protect the codebase from being stolen while keeping the product good whether people pay or not.

## AI Bubble Thesis

Cramer's financial analysis: AI is "100% a bubble." The venture funding mechanics make no sense — companies spending $10M/month on inference for $2 revenue products, arbitrary valuations grounded in spend rather than revenue, and the fact that training is part of inference cost that isn't factored in.

His key insight: **training is a constant cost that must continue for models to remain useful.** If frontier model companies stop training, their models become obsolete. This means the cost of inference is "dramatically higher than we are led to believe." When these companies go public and have to pay the bills, prices will rise.

He's stopped angel investing entirely — "the numbers don't add up" — despite having good network access and 100+ prior investments.

## On Learning and Craft

Cramer identifies a genuine problem for junior engineers: how do you learn when you can outsource your problems to LLMs? He doesn't have an answer. Academics give you theory. But you need hands-on experience with systems design, and LLMs don't provide that feedback loop.

His observation: people are impatient, amplified by AI tools. When an LLM says "this is a bad design," will the developer actually consume that feedback and guide it correctly next time? "You're probably not. You're probably going to go in and do the same thing."

He still believes humans stay in the loop because "there has to be accountability, there has to be liability." Good engineering practices — smaller changesets, code review, pre-design specs — are exactly the same as before.

## Critique of AI Hype

Cramer is outspoken about the discourse layer:

- **Dario Amodei**: "He is just frankly bad at public comms. He should not do it." Telling journalists that developers won't write code in 6 months is "bad for everybody."
- **The echo chamber**: Twitter incentivizes rage bait. People who aren't in the industry talk about things that aren't true for clicks. Cramer checks bios: "somebody says that, I click their bio. And that gives you all the information you need."
- **Moral duty**: "If you have power, you have a responsibility. Full stop." He feels a duty to not feed people BS, even if the hype machine rewards it.
- **Reputational value**: The solution to signal-vs-noise is trusting people you've interacted with, whose names you recognize, who aren't "randoms on the internet producing slop."

## Market Expansion

Sentry sees market expansion from AI: more people doing engineering work who weren't previously engineers. Their CFO built a reasonable application — he's a finance guy who thinks like an engineer but didn't know the syntax. Cramer sees this as a genuine new audience for developer tools, though these new developers "may stop at like an entry level engineering role."

## Related

- [[sentry]] — The company Cramer co-founded
- [[mcp]] — The protocol Cramer built a server for and uses daily
- [[the-slop-problem]] — Cramer's experience with AI-generated junk code strengthens this thread
- [[discourse-slop]] — Cramer's critique of AI hype discourse
- [[the-human-lever]] — Cramer on accountability and unchanged engineering practices
- [[context-engineering]] — Cramer on training data as inference cost
- [[armin-ronacher]] — Co-creator of Sentry, different perspective on tooling

## Sources

- `raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md` — The Weekly Dev's Brew interview (~75 min): AI code quality skepticism, Sentry's AI budget, MCP practical experience, open source under AI pressure, AI bubble thesis, learning concerns, hype critique, market expansion.

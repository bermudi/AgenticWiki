---
title: "Theo (t3.gg)"
created: 2026-06-03
updated: 2026-06-03
sources:
  - raw/yt-we-all-fell-for-it.md
tags: [author, ai-engineering, cognitive-debt, tool-design]
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

## Related

- [[lars-faye]] — Author of the article Theo responds to
- [[cognitive-debt]] — Theo's commentary adds nuance to the concept
- [[skill-atrophy]] — Theo's skateboarding metaphor explains the mechanism
- [[the-cognitive-cost]] — The thread Theo's video anchors alongside Faye's article
- T3 Code — Theo's open-source coding agent (no wiki page yet)

## Sources

- `raw/yt-we-all-fell-for-it.md` — "We all fell for it…" (June 2026); video response to Lars Faye's article; extensive commentary on cognitive debt, skill atrophy, token costs, vendor lock-in, and the code-frequency distinction

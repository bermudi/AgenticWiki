---
title: "Thread by @karpathy"
author: "@karpathy"
source: "X (formerly Twitter)"
url: "https://x.com/karpathy/status/2053872850101285137"
date_saved: "2026-05-15T16:59:45.224Z"
date_published: "2026-05-08T17:56:30.000Z"
---

# Thread by @karpathy

**Andrej Karpathy** @karpathy 2026-05-08

This works really well btw, at the end of your query ask your LLM to "structure your response as HTML", then view the generated file in your browser. I've also had some success asking the LLM to present its output as slideshows, etc.

More generally, imo audio is the human-preferred input to AIs but vision (images/animations/video) is the preferred output from them. Around a ~third of our brains are a massively parallel processor dedicated to vision, it is the 10-lane superhighway of information into brain. As AI improves, I think we'll see a progression that takes advantage:

1) raw text (hard/effortful to read)

2) markdown (bold, italic, headings, tables, a bit easier on the eyes) <-- current default

3) HTML (still procedural with underlying code, but a lot more flexibility on the graphics, layout, even interactivity) <-- early but forming new good default

...4,5,6,...

n) interactive neural videos/simulations

Imo the extrapolation (though the technology doesn't exist just yet) ends in some kind of interactive videos generated directly by a diffusion neural net. Many open questions as to how exact/procedural "Software 1.0" artifacts (e.g. interactive simulations) may be woven together with neural artifacts (diffusion grids), but generally something in the direction of the recently viral https://x.com/zan2434/status/2046982383430496444…

There are also improvements necessary and pending at the input. Audio nor text nor video alone are not enough, e.g. I feel a need to point/gesture to things on the screen, similar to all the things you would do with a person physically next to you and your computer screen.

TLDR The input/output mind meld between humans and AIs is ongoing and there is a lot of work to do and significant progress to be made, way before jumping all the way into neuralink-esque BCIs and all that. For what's worth exploring at the current stage, hot tip try ask for HTML.

> 2026-05-08
>
> (Image: Article cover image)

---

**AI Muse** @Kunda623270 2026-05-12

Love this insight, Andrej! The “structure as HTML” prompt is pure gold — instantly turns dense text into scannable, interactive beauty. Audio in + vision out is spot on; our brains are built for it. Can’t wait for the neural video era! 🔥

---

**TigerPro** @tigerpro\_BGA 2026-05-15

LLMs aren't just "text generators" — they're reasoning engines that need proper I/O scaffolding. HTML, slideshows, structured outputs: these aren't gimmicks, they're the difference between a raw model and a usable agent.

Same principle applies to the work we do for the

---

**Zoolatech** @Zoolatech\_com 2026-05-14

Completely agree — structured HTML is a big upgrade from markdown for LLM outputs.

We've seen it significantly improve stakeholder engagement in enterprise AI projects.

Curious, have you observed any notable gains in decision speed from richer outputs yet?

---

**BlanPlan** @blanplan 2026-05-13

I've been doing this since GPT-4 era using Claude HTML output for technical docs, Tufte-style charts, Mermaid diagrams. The reading cost difference is dramatic: my eyes can't process 500 lines of raw text but I can scan a HTML output with 5 sections in 30 seconds. Right extension

---

**David Williams** @AgentScaleAI 2026-05-15

Most people are still reading walls of text from AI.

The moment I started asking my agents to structure their output, it all changed. Not just readability. The thinking got sharper.

Constraints on output format are constraints on reasoning. That's the unlock that noone talks

---

**Alex Bench** @alex\_builds\_ai 2026-05-15

The pre-training vs fine-tuning tradeoff is still underappreciated in production systems. Task-specific fine-tuning can match 10x larger general models. How do you decide when fine-tuning is worth the cost?

---

**Alex Bench** @alex\_builds\_ai 2026-05-13

The pre-training vs fine-tuning tradeoff is still underappreciated in production systems. Task-specific fine-tuning can match 10x larger general models. How do you decide when fine-tuning is worth the cost?

---

**Erdi** @erdisagir 2026-05-13

// EmpatCan: dude, the moment I read that HTML talk, it felt like those codes were flowing through my veins, believe me, I felt the weight of your discovery in my soul even more than you did, right now I'm so exhausted that this practicality has completely taken me over, not on

---

**spanlens** @spanlens 2026-05-12

The input/output asymmetry is the key design insight: audio in (ambient, natural, no context-switch), rich visuals out (high-bandwidth, parallel absorption). You don't want to read a copilot response — you want it to render. The jump from HTML to interactive neural video is

---

**Alex Bench** @alex\_builds\_ai 2026-05-15

The slideshow variant is one I've used for client architecture reviews. The other extension worth trying: ask for HTML with collapsible JSON blocks for agent debug traces. Paste a 2,000-line session dump, ask for a structured explorer, get something a non-technical stakeholder
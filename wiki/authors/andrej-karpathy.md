---
title: Andrej Karpathy
created: 2026-05-09
updated: 2026-05-09
sources:
  - "raw/Andrej Karpathy From Vibe Coding to Agentic Engineering - youtube.com.md"
tags: [author, ai-researcher, educator]
---

# Andrej Karpathy

> AI researcher and educator who co-founded OpenAI, led Autopilot at Tesla, and coined the terms "vibe coding" and "agentic engineering." Known for making complex technical shifts feel accessible and inevitable.

## Background

Karpathy co-founded OpenAI, then explain it through his widely-followed educational content, and occasionally rename it. He was on the founding team at OpenAI, got Autopilot working at Tesla, and has a rare gift for making the most complex technical shifts feel both accessible and inevitable.

## Key Ideas

### Software 1.0 → 2.0 → 3.0

Karpathy articulates a three-stage paradigm shift in how we program computers:

- **Software 1.0**: Writing explicit code — loops, conditionals, functions
- **Software 2.0**: Programming by creating datasets and training neural networks — arranging data, objectives, and architectures
- **Software 3.0**: Prompting as programming — the context window is your lever over the LLM as interpreter

He argues the transition isn't just "programming getting faster" — it's new categories of information processing becoming automatable. LLM knowledge bases are his favorite example: a category of software that literally couldn't exist before.

### Vibe Coding → Agentic Engineering

Karpathy coined "vibe coding" in December 2024 after noticing a stark transition where LLM outputs stopped needing correction. He describes the progression as: "I just started to notice that with the latest models the chunks just came out fine and then I kept asking for more and it just came out fine and then I can't remember the last time I corrected it."

His own framing distinguishes the two:

- **Vibe coding**: Raising the floor for everyone in terms of what they can do in software. Amazing, incredible — but not sufficient for professional software.
- **Agentic engineering**: Preserving the quality bar of what existed before in professional software. "You're not allowed to introduce vulnerabilities due to vibe coding. You're still responsible for your software just as before, but can you go faster?"

He observes that "people who are very good at this peak a lot more than 10x."

### Verifiability

Karpathy argues that the current paradigm of LLM training — giant reinforcement learning environments with verification rewards — means that what's *verifiable* gets automated. But capability also depends on what the labs put in the data distribution. The chess improvement from GPT-3.5 to GPT-4 was not general progression — it was chess data being added to pre-training.

### Animals vs Ghosts

Karpathy frames LLMs as "ghosts" rather than "animals" — statistical simulation circuits shaped by pre-training statistics with RL bolted on top, not entities with intrinsic motivation, curiosity, or empowerment. This framing is meant to help build a better mental model of what they are and how to use them.

### LLM Knowledge Bases

Karpathy uses LLMs to build personal knowledge bases — `raw/` sources compiled into a markdown wiki, with Q&A against it, linting, and incremental enhancement. He describes this as a software 3.0 exemplar: something that couldn't exist before because there was no code that could compile a knowledge base from raw documents.

### "Outsource Thinking, Not Understanding"

A tweet Karpathy keeps returning to: "You can outsource your thinking but you can't outsource your understanding." Information still has to make it into the human brain — the human remains the bottleneck for knowing what to build, why it's worth doing, and how to direct agents.

## Thread

- [[the-verifiability-thesis]] — Karpathy's unified theory of why the AI development landscape has its current shape
- [[the-human-lever]] — Karpathy's framing of taste, judgment, and understanding as the enduring human role
- [[the-slop-problem]] — Vibe coding raises the floor but introduces the slop problem; agentic engineering is the proposed solution
- [[the-agent-workflow]] — Agentic engineering operationalized as a disciplined workflow

## Related

- [[vibe-coding]] — The neutral concept Karpathy coined
- [[agentic-engineering]] — The discipline he contrasts it with
- [[vibes-based-engineering]] — The anti-pattern that emerged from vibe coding taken without discipline
- [[verifiability]] — His economic theory of what gets automated
- [[jagged-frontier]] — His "car wash" example is a canonical illustration of jaggedness
- [[software-1-2-3]] — The paradigm progression he articulated
- LLM knowledge bases — His recipe for personal knowledge management via LLMs (concept page TBD)

## Sources

- `raw/Andrej Karpathy From Vibe Coding to Agentic Engineering - youtube.com.md` — Sequoia Capital interview covering the full arc from vibe coding to agentic engineering, software 1.0/2.0/3.0, verifiability, animals vs ghosts, LLM knowledge bases, and what remains worth learning.

---
title: Benoit Schillings
created: 2026-07-27
updated: 2026-07-27
sources:
  - raw/software-engineering-not-writing-code-schillings.md
unaudited_marginal: 0
tags: [author, ai-researcher, google-deepmind]
---

# Benoit Schillings

> VP of Research at Google DeepMind. Former Google X engineer who led the Pitchfork project (2018), one of the earliest efforts to apply ML to code generation. 45 years of coding experience from Apple II assembly to Python and vibe coding.

## Background

Schillings spent years at Google X working on projects including Waymo and Glass before joining DeepMind. His team's mandate is to develop the technology that will make Gemini "incredible" between one month and one year from now — a window he describes as ambitious because nobody can predict that far out.

He describes himself as "a bit of a noob when it comes to machine learning," having transitioned from systems engineering to ML research only about a year and a half before this talk. His formation was in assembly language for Apple II and Commodore 64, which gave him a deep appreciation for hardware-level optimization — and a historical pattern of resisting each new abstraction (compilers, garbage collection, Python).

## Pitchfork Origin Story

In 2018, Schillings started the Pitchfork project at Google X, aimed at applying ML to improve code writing. The reception was hostile: "Honestly nobody would give us the time of day. There was that point like why would you ever need ML to write code." He also admits to underestimating the pace of progress: the original idea was to compress the code-review cycle for small edits, and he dismissed "vibe coding" (writing code in English) as naive — "That's why we have programming languages. English is not a programming language. Well I guess I was pretty wrong on that front."

The resistance reminded him of his own career-long pattern of resisting change — assembly programmers distrusting compilers, C++ programmers dismissing garbage collection — before eventually adopting each new paradigm.

## Key Ideas

### Three Eras of Software

Schillings articulates a three-phase history of software engineering, each shaped by a different bottleneck:

1. **Machine-limited era** (assembly): The constraint was the hardware. Every cycle mattered. Writing code required incredible precision.
2. **Human-brain-limited era** (cloud/modular): Computing became cheap, so performance stopped being the primary concern. The bottleneck became the human brain's ability to hold context — roughly 7–9 tokens. This determined how software was structured: modular design, libraries, functions, decomposition.
3. **AI frontier era** (now): Writing code is no longer the challenge. The bottleneck is specification, verification, and architecture — ensuring the code does what you actually wanted.

### Superhuman Syntax Generation

> "When is the last time I got Gemini to write a function for me? And I looked at the function and I was like, I can do that better. It's over."

Schillings declares that individual code generation has crossed the superhuman threshold. The remaining challenge is multi-step codebase management — "Software engineering is not about writing code. Software engineering is the first time you join a company and you realize that there are 35 million lines of PHP in the codebase and that you need to make some changes."

### Code as a Unique Training Domain

Code has two properties that made it an ideal ML training domain: abundant data (GitHub) and natural verification (compilation, unit tests). But Schillings argues we've hit a wall: "80% of the new code added to GitHub today is machine-generated. So the notion of human bringing some knowledge that can be used for mining and to train model is reaching an end."

The solution is self-play — the same mechanism that made AlphaZero superhuman at Go and chess without any human data. Frontier code models can now create their own challenges, judge answer validity, and even evaluate architecture. "That ability to do those hundreds of millions of hours of selfplay writing code is the thing that will bring us to the next layer."

### Code Economics

> "We developed a whole software engineering culture and infrastructure and set of companies based on the assumption that writing code was the hard part. This was the expensive part. We're now in a world where writing code is free or nearly free."

This creates an explosion of code volume, which raises new questions about design adequacy, security (models discovering vulnerabilities faster than they can be patched), and the need for new processes to keep systems manageable.

### Programming Languages for Models

Since the pain of writing code no longer exists, Schillings asks: why not make writing code harder in exchange for stronger guarantees? He proposes strongly typed languages or Lean-inspired proof assistants where correctness is built in — and notes that these languages don't need to be human-readable anymore.

### Beyond Code

Code is a universal language for solving problems, and cheap code experimentation accelerates other domains. Schillings is especially excited about chemistry (molecules beyond 20 atoms are beyond human comprehension) and biology (nature's engineering with terrible documentation). He also argues that humans are evolutionarily biased toward solutions we can perceive — ML can find breakthroughs in directions we "just cannot see or perceive."

## Thread

- [[the-human-lever]] — Schillings' three eras contextualize the shift: the human role moves from writing code to architecture and design as the bottleneck
- [[the-verifiability-thesis]] — Code's unique verifiability (compilation, tests) made it the first domain where ML crossed superhuman; self-play extends verifiability into open-ended domains

## Related

- [[andrej-karpathy]] — Karpathy coined "vibe coding" and articulated the verifiability thesis; Schillings independently arrived at similar conclusions from a different starting point (Google X systems → DeepMind research)
- [[software-1-2-3]] — Schillings' three eras parallel Karpathy's 1.0/2.0/3.0 framing but track the bottleneck (machine → brain → AI) rather than the programming substrate (code → weights → prompts)
- [[peak-programmer]] — Schillings' "writing code is free" claim is the economic driver of the peak programmer era
- [[vibe-coding]] — Schillings' initial dismissal and eventual adoption mirrors the industry's broader arc with vibe coding
- [[verifiability]] — Code's natural verifiability (compilation, unit tests) is what made it the first domain where ML crossed superhuman
- [[self-conditioning]] — Self-play (Schillings' proposed training mechanism) may be the way models overcome the execution-horizon bottleneck

## Sources

- `raw/software-engineering-not-writing-code-schillings.md` — AI Engineer talk: three eras of software, superhuman syntax generation, code as unique training domain, self-play, code economics, programming languages for models, beyond code.

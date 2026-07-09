---
title: Software 1.0 / 2.0 / 3.0
created: 2026-05-09
updated: 2026-05-09
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
tags: [concept, paradigm, programming]
---

# Software 1.0 / 2.0 / 3.0

> [[andrej-karpathy|Andrej Karpathy]]'s three-stage model of how we program computers: from writing explicit code (1.0), to training neural networks with data (2.0), to prompting LLMs as programmable interpreters (3.0). The transition isn't just "programming getting faster" — it enables entirely new categories of information processing.

## The Three Paradigms

| Paradigm | What you program | The mechanism |
|---|---|---|
| **Software 1.0** | Code — loops, conditionals, functions | Explicit rules executed deterministically |
| **Software 2.0** | Data + objectives + architectures | Neural network weights learned from data |
| **Software 3.0** | Prompts and context | LLM as interpreter; context window is your lever |

### Software 3.0 in Practice

Karpathy gives two examples of the paradigm shift:

**OpenClaw installation**: Instead of writing a complex bash script to handle every platform, the "installation" is a block of text you copy-paste to your agent. The agent uses its own intelligence to look at your environment, debug in the loop, and make things work. "What's the piece of text to copy paste to your agent? That's the programming paradigm now."

**MenuGen**: Karpathy vibe-coded an app that OCRs restaurant menus and overlays images of dishes. Then he saw the software 3.0 version: take a photo, give it to Gemini with NanoBanana, say "overlay the things onto the menu" — and it returned the image with the dishes rendered in-pixel. No app in between. "All of my MenuGen is spurious. It's working in the old paradigm. That app shouldn't exist."

## Beyond Programming

Karpathy emphasizes that software 3.0 is bigger than code:

> "It's not just about programming and programming becoming faster. This is more general information processing that is automatable now."

His LLM knowledge base project is an example: taking raw documents and recompiling them into a structured wiki with cross-references. "This is not even a program. This is not something that could exist before because there was no code that would create a knowledge base based on a bunch of facts."

The most exciting opportunities, he argues, are "things that couldn't have been possible before" — not just doing existing things faster.

## The Extrapolation

Karpathy speculates about the long arc: "You could imagine completely neural computers. You feed raw videos into what's basically a neural net and it uses diffusion to render a UI that is unique for that moment." He notes that in the 1950s and 60s it wasn't obvious whether computers would look like calculators or neural nets — we went the calculator path, but "a lot of this will flip and the neural net becomes the host process and the CPUs become the co-processor."

## Thread

- [[the-verifiability-thesis]] — Software 3.0 is the paradigm shift that makes verifiability-driven capability possible
- [[the-human-lever]] — Software 3.0 shifts the human role from writing code to engineering prompts, context, and verification
- [[the-slop-problem]] — Software 3.0 without discipline produces slop; the paradigm shift demands new quality mechanisms

## Related

- [[andrej-karpathy]] — Originator of the 1.0/2.0/3.0 framing
- [[vibe-coding]] — The consumer experience of software 3.0
- [[agentic-engineering]] — The professional discipline for building with software 3.0
- [[the-agent-workflow]] — The operational practices for working within Software 3.0 day-to-day
- [[verifiability]] — The mechanism that makes software 3.0 possible: RL over verifiable domains
- [[agent-quality-engineering]] — Software 3.0 without quality infrastructure produces slop; evals and observability are the quality mechanisms for the new paradigm
- LLM knowledge bases — Karpathy's favorite example of a software 3.0-native application (concept page TBD)
- [[intent-to-code]] — Prompting-as-programming as the pure-vibes position on the intent-to-code axis
- [[llm-ui-paradigms]] — A parallel Karpathy three-stage lineage: where the model lives in the workflow (website → app → persistent org-level entity), the UI/UX twin of Software 1/2/3's programming-substrate axis

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: full articulation of the three paradigms, OpenClaw and MenuGen examples, and the extrapolation to neural-native computing.

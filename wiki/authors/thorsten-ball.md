---
title: Thorsten Ball
created: 2026-05-26
updated: 2026-05-26
sources:
  - raw/yt-llms-are-killing-agent-harness.md
tags: [author, amp, sourcegraph, zed, agents, developer-tools]
unaudited_marginal: 0
---

# Thorsten Ball

> Co-creator of [[sourcegraph|AMP]] (with [[sourcegraph|Quinn Slack]]). Author of *Writing an Interpreter in Go* and *Writing a Compiler in Go*. Formerly at [[sourcegraph|Sourcegraph]] (code intelligence, one of the first enterprise Claude customers) and Zed (Rust, tab completion, fine-tuning). His central thesis: the agent harness should fall away like a cast on a healing leg — as models improve, the scaffolding falls away. Give the model the tokens, give it the tools, and get out of the way.

## Background

Ball's career path: German startups → Sourcegraph (4.5 years, engineer → staff engineer → manager, working on code intelligence and the Cody coding assistant) → Zed (1 year, Rust programming, tab completion and fine-tuning) → back to Sourcegraph/AMP. He dropped out of a philosophy degree and entered professional programming through self-teaching — buying books, building websites, and learning Linux.

At Sourcegraph, he was on the Cody team in early 2023 — one of the first coding assistants — using Claude when "nobody knew what Claude is." At Zed, he worked on tab completion and fine-tuning with Antonio, which became a turning point: he realized his decade of Vim mastery was irrelevant when the model could predict what he needed. "Everything that I've done before now looked like a black and white movie to me."

In March 2025, before Claude Code was even released, Ball and Quinn Slack had their "holy shit" moment: Claude 3.5 with tool calling blew away all the multi-model pipeline complexity. "No second model, no restrictions. Just give the models the tokens, give it the tools, and get out of the way."

His self-described internal title at AMP is "dictator" — meaning the person who makes product decisions and is responsible for the co-created product.

## Key Ideas

### The Harness Falls Away
Ball's central metaphor: the agent harness should fall away like a cast on a healing leg. As models get better, the scaffolding falls away. Year-old complexity (specialized diff formats, semantic edit tools, multiple model chains, language server tools) becomes irrelevant when the model can just run shell commands.

He traces this progression concretely:
- **Claude 3.5**: Old string/new string replacement. Sometimes wrong on multi-match.
- **Claude 3.7**: Understands line numbers. Can navigate files sequentially.
- **GPT-5.3/Jules**: Doesn't care about your tools at all. Runs `cat`, `sed`, writes Python scripts. Just needs a shell.

The implication: language servers are now "uninteresting." The model figures out where the parentheses go. "That's over."

### The Knowledge Triplet
Either you know what you want, it's in your codebase, or it's in the training data. If it's none of these, the model will fabricate. This is a concrete instantiation of [[context-engineering]] — the user must supply the signal the model can't find elsewhere.

### Software As We Know It Is Dead
Not "software is dead" — *software as we know it*. The approach to building software that's purely about programming language skill is over. The role shifts to conceptualizing, understanding, debugging, and maintaining complex systems + understanding business/customer needs. The fashion designer metaphor: knows textiles, colors, manufacturing — but doesn't cut the cloth.

Code is now cattle, not pets. The contribution graph, PR emoji reactions, linear ticket assignment — all built on assumptions that human-produced code is precious. Those assumptions are outdated.

### Breaking Things As Strategy
AMP deliberately targets frontier-seeking users, not stability-seekers. The ground shifts every three months. Attracting customers who value stability ties you down — they pay you not to change. "Who do you want your customers to be? The ones holding you back or the ones who will go with you?"

The old playbook (find PMF → build → hire sales) doesn't work when the technical substrate is "rug pulled every three months." AMP killed autocomplete. People complained. Others said "that makes total sense."

### Vibes Over Formal Evals
For general-purpose coding agents in arbitrary codebases, formal evals are less useful than direct usage experience. "How do you even say what's correct? How do you even say what's good?" AMP built evals but found vibes-based engineering — using the agent heavily — provided more signal than structured evals.

### The SDLC Is Outdated
Linear tickets assigned to agents → PR → review is "insane." The whole workflow changes when you have infinite agents. CI becomes unnecessary when the agent can run tests itself. GitHub is built on the assumption that humans are using it and human-produced code is precious.

## Thread

- [[tool-design-for-agents]] — Ball's "harness falls away" is the lived, radical version of the thread's minimalism thesis
- [[the-human-lever]] — The shift from coding to conceptualizing/designing; "what you want" as the critical human input
- [[peak-programmer]] — "Software as we know it is dead" directly supports the peak programmer thesis

## Related

- [[sourcegraph]] — Where Ball worked and co-created AMP with Quinn Slack
- [[pi]] — Philosophical alignment with [[mario-zechner|Zechner]]'s minimalism (four-tool core)
- [[code-as-agent-harness]] — AMP as a live case study of the survey's taxonomy
- [[agent-evals]] — Ball's vibes-based evaluation approach tensions with formal eval frameworks
- [[agent-experience]] — His dismissal of language servers challenges the AX thread's emphasis on tool redesign
- [[context-engineering]] — The knowledge triplet as a concrete instantiation of context engineering principles
- [[vibe-coding]] — Vibes-based evaluation as an extension of vibe coding practice
- [[peak-programmer]] — "Software as we know it is dead" as the strongest articulation of peak programmer
- [[mario-zechner]] — Fellow minimalist; both argue for fewer tools and simpler contracts
- [[armin-ronacher]] — Language choice ally; Go as optimal agentic language

## Sources

- `raw/yt-llms-are-killing-agent-harness.md` — Full interview: harness falls away thesis, knowledge triplet, software as we know it is dead, breaking things as strategy, vibes over evals, SDLC outdated

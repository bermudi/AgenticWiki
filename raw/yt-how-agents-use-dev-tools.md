---
type: youtube
url: https://www.youtube.com/watch?v=DuCwaXTHtZo
title: How Agents Use Developer Tools
channel: Zanie Blue (Astral)
date: 2026-04-25
ingested: 2026-04-25
---

# Key points extracted during ingest

- Developer tools provide deterministic, specialized feedback that constrains agent behavior. Agents are stochastic and open-ended — they need this feedback to build reliable systems.
- Correctness feedback comes from running code (tests) and static analysis (type checkers, linters). Agents struggle with complex static analysis even with fine-tuning.
- Quality feedback captures readability, security, performance, dead code — long-term health signals that agents can't self-assess.
- Efficiency matters: agents will use ad-hoc approaches (curl + unzip instead of a package manager) that waste context and time. Specialized tools solve subsets of problems better.
- Safety through tool boundaries: fine-grained access controls, sandboxing (e.g., uv sandboxing uvx to restrict filesystem and secret access).
- Scale effects: agents make 10-person teams face 100-engineer problems. Concurrency, git worktrees, reproducible environments become everyday concerns.
- Tool output is designed for humans. Agents need machine-readable output, but raw JSON can increase verbosity. Tools should build context reduction in natively — show essentials, allow opt-in to more detail.
- Persisting output to files instead of flooding context. Agent gets a pointer, investigates as needed.
- Language servers: features like autocomplete are high-effort but irrelevant to agents. Rename/find-references are valuable. LSP protocol itself isn't designed for agents.
- Plugins: historically low priority for Astral, but now essential. Agents building custom lint rules = a form of agent memory.
- Confidence levels: agents don't get fatigued from too many diagnostics. Tools should expose more low-confidence lints and unsafe fixes for agents to assess.
- Trust models: escape hatches (noqa, suppressions) may enable bad agent behavior. Default to constraining agents more than humans.
- Closing thought: agents may eventually build their own purpose-built tools. Research shows self-tooling agents outperform pre-built harnesses.

> Full content was processed from YouTube transcript provided inline.
> This file captures extracted knowledge, not the raw transcript.

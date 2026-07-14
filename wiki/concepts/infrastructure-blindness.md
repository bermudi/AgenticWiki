---
title: Infrastructure Blindness
created: 2026-07-14
updated: 2026-07-14
sources:
  - raw/deepswe-failure-analysis.md
unaudited_marginal: 0
tags: [concept, failure-mode, coding-agents, code-reuse, agent-quality]
---

# Infrastructure Blindness

> A coding-agent failure mode where the model locates the relevant code but reimplements its machinery from scratch instead of calling it. The agent *found* the module; it did not recognize the module as the tool to use, so it rebuilt a parallel, worse version — and the rebuilt version misses edge cases the existing machinery already handled. Isolated and named in [[deepswe]] trajectory analysis.

## The Pattern

The agent's exploration succeeds — it reads the right files, identifies where the change belongs — but at implementation time it writes its own parser, matcher, walker, or format handler parallel to one that already exists in the codebase. The rewrite works for the simple cases the visible tests exercise and fails on the complex cases the hidden oracle checks, exactly where the existing, battle-tested machinery would have succeeded.

It is *not* a search failure. The infrastructure was found and read. It is a *recognition* failure: the agent treats the existing code as context to understand the domain rather than as a capability to invoke.

## Evidence from [[deepswe]]

**`csstree-shorthand-expansion-compression`** — The csstree library ships `lexer.match()`, which returns a syntax tree mapping tokens to properties. GPT-5.5 uses the lexer's own matching to expand shorthands into longhands. All three open-weight models (deepseek-v4-pro, glm-5.1, kimi-k2.6) ignore it and write custom regex / token-splitting logic. Their hand-rolled splitters handle regular shorthands (`margin`, `padding`) and fail on irregular ones (multi-layer `background`, mixed-type `font`) — precisely the cases the existing matcher was built to parse.

**`dasel-html-document-format`** — The codebase already has an XML reader/writer with the same DOM-tree round-trip semantics the new HTML format needs. GPT-5.5 copies and adapts the XML format (~1279 lines, 45 steps), inheriting its nil-check and Value-wrapping patterns. DeepSeek writes a standalone HTML parser from scratch (~2026 lines, 120 steps) and re-introduces the nil-pointer dereferences the XML format had already solved. The existing format was a working template for the new one; copying it was the move.

In both cases the failing models wrote *more* code that did *less*, because they rebuilt what was already there.

## Why It Happens

The agent models the task as "produce behavior X" and reaches for the most direct construction it can generate from the domain description, rather than "extend the codebase's existing path to behavior X." The existing machinery is harder to invoke than to regenerate — it has a specific call signature, preconditions, and conventions the agent would have to match — so the agent defaults to writing fresh code it fully controls. The cost of that control is losing every edge case the existing code already handled.

This compounds with [[over-engineering]]: the parallel implementation tends to be larger than the leveraged one would have been, and the larger surface is where the bugs concentrate.

## Distinction from Adjacent Failures

| Failure | Mechanism | Relationship to infrastructure blindness |
|---|---|---|
| Agentic search low recall ([[failure-modes]]) | Agent cannot *find* relevant code | Different — here the code *was* found |
| [[satisfaction-of-search]] | Agent stops at the first plausible hit | Different — here the agent read the right thing and still didn't use it |
| [[deep-vs-shallow-modules]] | Shallow modules force the agent to understand leaky internals | Related — deep, well-bounded machinery is easier to recognize *as* a capability |
| [[over-engineering]] | Speculative abstraction adds bug surface | Frequent co-occurrence — the reimplementation is usually over-built |

## Countermeasures

- **Before implementing, ask "what existing path produces this behavior?"** — and prefer extending it over building alongside it.
- **Treat a sibling format/module as a template.** If the codebase has an XML reader and the task wants an HTML reader, the XML reader is the starting point, not the competition.
- **Flag reimplementation explicitly.** A new parser/matcher/walker next to an existing one is a signal to stop and check whether the existing one already covers the case.
- **The smell test: if the new code is larger than the existing machinery it parallels, it is probably rebuilding it poorly.**

## Thread

- [[agent-quality-engineering]] — A coding-agent failure mode the quality infrastructure must catch; the reimplementation often passes visible tests and fails the hidden oracle
- [[the-agent-workflow]] — Recognition of existing capability as a workflow habit, not just a search step

## Related

- [[deepswe]] — The benchmark trajectory analysis that isolated and named this mode
- [[over-engineering]] — Frequent co-occurrence; the reimplementation is usually bloated
- [[deep-vs-shallow-modules]] — Deep, well-bounded machinery is easier to recognize as a capability to invoke
- [[satisfaction-of-search]] — Adjacent retrieval failure; here retrieval succeeded but leverage did not
- [[code-intelligence]] — Deep code understanding surfaces existing capability a naive search misses
- [[strategic-vs-tactical-programming]] — Recognizing where existing infrastructure fits is a strategic call the tactical agent tends to skip
- [[failure-modes]] — Registered in the master playbook

## Sources

- `raw/deepswe-failure-analysis.md` — Definition, the csstree (`lexer.match()` ignored) and dasel (XML format not copied) cases, and the distinction from search/recall failures

---
title: Thariq
created: 2026-05-15
updated: 2026-05-15
sources:
  - raw/thariq-unreasonable-effectiveness-of-html.md
unaudited_marginal: 0
tags: [author, anthropic, claude-code]
---

# Thariq

> Engineer on the Claude Code team at Anthropic. Authored "The Unreasonable Effectiveness of HTML" — a practical playbook for using HTML instead of Markdown as agent output, drawn from daily Claude Code usage.

## Background

Thariq works on the Claude Code team at Anthropic. His public writing focuses on practical agent workflow patterns — specifically how output format choice (HTML vs Markdown) affects agent-human collaboration quality.

## Key Contributions

### HTML as Agent Output

Thariq argues that Markdown has become a restricting format for agent communication. He's moved to HTML for nearly all agent output — specs, plans, code reviews, PR writeups, design prototypes, and reports. His contribution is the practical dimension: concrete prompt patterns, five use case categories, and honest tradeoff analysis.

Key practical innovations:
- **"Generate N options at once"**: Asking the agent to produce multiple approaches in a single pass (laid out in an HTML grid) produces more variety than sequential requests — the model can't drift toward a single direction when generating alternatives simultaneously.
- **Throwaway editors**: Single-purpose HTML files built for one decision — reordering tickets, tuning prompts, editing config — always ending with an export button to convert UI state back into agent-consumable input.
- **The export pattern**: Interactive HTML documents should always include a "copy as JSON" or "copy as prompt" button, creating a tight loop between human interaction and agent re-consumption.

He's candid about costs: 2–4× generation time, higher token usage, and noisy version control diffs.

## Thread

- [[tool-design-for-agents]] — HTML as output format is a tool interface design decision; Thariq's use cases are concrete instances of the broader tool redesign thesis

## Related

- [[andrej-karpathy]] — Karpathy provides the theoretical framing (vision as preferred output); Thariq provides the practical playbook
- [[html-as-agent-output]] — The concept page synthesizing both sources
- [[claude-code]] — The primary tool context for Thariq's HTML workflow

## Sources

- `raw/thariq-unreasonable-effectiveness-of-html.md` — "The Unreasonable Effectiveness of HTML": five use case categories, prompt patterns, interactive document design, throwaway editors, and honest tradeoff analysis from daily Claude Code usage.

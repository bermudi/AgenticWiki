---
title: HTML as Agent Output
created: 2026-05-15
updated: 2026-05-15
sources:
  - raw/karpathy-html-output.md
  - raw/thariq-unreasonable-effectiveness-of-html.md
unaudited_marginal: 0
tags: [concept, agent-output, html, visualization, agent-workflow]
---

# HTML as Agent Output

> Two independent sources — [[andrej-karpathy|Karpathy]] on theoretical grounds and [[thariq|Thariq]] on practical ones — argue that AI agents should output HTML instead of Markdown. HTML offers richer information density, two-way interaction, and visual clarity at the cost of 2–4× generation time and noisy version control diffs.

## The Thesis

Two independent sources converge on the same recommendation: agents should output HTML, not Markdown. [[andrej-karpathy|Karpathy]] provides the theoretical framing (vision as the brain's highest-bandwidth input channel); [[thariq|Thariq]] provides the practical playbook (concrete use cases, prompt patterns, and honest tradeoffs).

### Karpathy's I/O Asymmetry

Karpathy argues for a fundamental asymmetry in how humans prefer to interact with AI:

- **Audio is the preferred input** — ambient, natural, no context-switch cost
- **Vision is the preferred output** — ~⅓ of the brain is a massively parallel processor dedicated to vision; it's the "10-lane superhighway of information into the brain"

He proposes a progression ladder of output fidelity:

1. **Raw text** — hard, effortful to read
2. **Markdown** — bold, italic, headings, tables; easier on the eyes ← current default
3. **HTML** — procedural code but flexible graphics, layout, interactivity ← emerging default
4. **…n…** — interactive neural videos/simulations ← extrapolation

Asking the model to structure its response as HTML doesn't just change presentation — it changes what the model produces. The richer format unlocks richer output.

### Thariq's Practical Case

Thariq (Claude Code team) argues from daily practice. His core observations:

- **100-line cliff**: Markdown files beyond ~100 lines go unread. HTML's visual structure (tabs, collapsibles, diagrams) pushes that cliff further out.
- **Edit delegation**: He increasingly doesn't edit agent output himself — he prompts Claude to edit it. Markdown's editability advantage vanishes when the agent is doing the editing.
- **Joy matters**: "Making HTML documents with Claude is just more fun and makes me feel more involved and invested in the creation." If a format makes you engage more with the output, you get better results — not because the format is inherently better, but because you actually read and steer what the agent produces.

## Information Density

HTML can represent nearly any information type in a single file: tabular data (tables), design (CSS), illustrations (SVG), code (script tags), interactions (JS + CSS), workflows (SVG + HTML), spatial data (absolute positioning, canvases), and images. This eliminates the hacks agents resort to in Markdown — ASCII diagrams, Unicode color estimation, broken padding in code blocks.

## Two-Way Interaction

The strongest practical argument. HTML enables **interactive documents** — sliders, knobs, collapsibles, drag-and-drop — that let the human tune parameters directly in the output. The key pattern: always end with an export button ("copy as JSON", "copy as prompt") that converts the interactive state back into agent-consumable input. This creates a tight human↔agent feedback loop through the document itself.

### Throwaway Editors

A specific instantiation: ask the agent to build a single-purpose HTML editor for whatever you're working on — not a reusable tool, but a one-off UI for a single decision. Triaging 30 tickets, tuning a system prompt, editing a feature flag config. The throwaway editor pattern embodies a broader shift: **code is cheap enough to write for single-use decisions**.

## Use Cases

Thariq catalogs six categories (five top-level sections in the article, plus PR writeups as a distinct practice):

| Use Case | What the HTML replaces | Key prompt pattern |
|---|---|---|
| **Specs, planning, exploration** | Wall-of-text markdown plans | "Generate N distinctly different approaches and lay them out in a grid so I can compare side by side" |
| **Code review & understanding** | GitHub diff view | "Create an HTML explainer with inline annotations, color-coded by severity" |
| **Design & prototypes** | Static mockups | "Make sliders and options for me to tune this animation" |
| **Reports, research & learning** | Long-form text docs | "Read the code and produce an HTML explainer with diagrams and annotated snippets" |
| **Custom editing interfaces** | Manual text editing | "Build a form-based editor with export-as-prompt button" |
| **PR writeups** | Markdown PR descriptions | HTML explainer attached to every PR |

### The "Pretend You Don't Know" Pattern

A prompting technique from Thariq's examples: phrasing requests as if you don't understand the topic (e.g., "I don't understand how our rate limiter works") steers the model to create explainer output suitable for someone encountering the topic for the first time — useful for generating reports and artifacts meant for teammates or stakeholders.

## Honest Tradeoffs

Both sources are candid about the costs:

| Advantage | Cost |
|---|---|
| Richer information density | 2–4× longer generation time |
| Visual clarity and readability | Higher token usage (less noticeable with 1M+ context windows) |
| Portable sharing (open in any browser) | **HTML diffs are noisy and hard to review** — the biggest practical downside |
| Two-way interaction | Requires hosting for sharing (S3, etc.) |
| Engagement / joy | Mobile responsiveness is not automatic; examples often break on mobile |

## Speculative: What Comes After HTML

Karpathy's extrapolation: the progression doesn't stop at HTML. The endpoint is interactive neural videos — every pixel streamed from a diffusion model, no layout engine, no code. Open questions remain about how procedural "Software 1.0" artifacts (interactive simulations) weave together with neural artifacts (diffusion grids). This is speculative but directionally interesting.

He also flags a gap at the **input** side: audio, text, and video alone aren't enough. Humans need to point, gesture, and reference things on screen — the full range of interactions you'd have with a person sitting next to you. This remains unsolved.

## Thread

- [[tool-design-for-agents]] — HTML as agent output is a specific instance of the broader thesis that tool interfaces need redesign for agentic consumers; output format is part of the tool contract

## Related

- [[context-engineering]] — HTML output relates to information-per-token density; richer output may convey more signal per human-read cycle even at higher token cost
- [[agent-experience]] — Output format as an AX dimension; HTML extends the agent experience thesis from codebase structure and tool interfaces to the agent's communication medium
- [[the-human-lever]] — HTML's core value is keeping the human "in the loop" with agent plans and outputs, directly supporting the human's role as design authority
- [[vibe-coding]] — Karpathy's coinage; the HTML thesis is about maintaining quality and engagement as vibe coding scales to larger tasks
- [[claude-code]] — The primary tool context for the HTML workflow; Claude Code's filesystem, MCP, git, and browser access make it the richest source for generating HTML from real project data
- [[andrej-karpathy]] — Theoretical framing: vision as preferred output, output format progression ladder
- [[thariq]] — Practical playbook: use cases, prompt patterns, honest tradeoffs from daily Claude Code usage

## Sources

- `raw/karpathy-html-output.md` — Karpathy's tweet thread introducing the audio-in/vision-out asymmetry, the output fidelity progression ladder (text → markdown → HTML → neural video), and the observation that output format constraints shape reasoning quality.
- `raw/thariq-unreasonable-effectiveness-of-html.md` — Thariq's article cataloging six use cases for HTML agent output (specs, code review, design, reports, custom editors, PR writeups), the two-way interaction pattern with export buttons, the throwaway editor pattern, and honest tradeoffs including version control pain and 2–4× generation time.

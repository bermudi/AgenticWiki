---
title: Multi-Tier Action Space
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md
tags: [concept, architecture, context-engineering, agents, tool-design]
---

# Multi-Tier Action Space

> An agent architecture pattern converged on by Claude Code, Manis, AMP, and Deep Agents: a thin tool calling layer (~12 tools for Claude Code, under 20 for Manis) paired with a computer primitive (shell, file system, code execution) that handles the bulk of actions. The key insight: n actions ≠ n tools — push actions out to the computer instead of binding each one as an individual tool.

## The Architecture

The multi-tier action space has two layers:

**Tier 1 — Tool calling layer**: A small set of atomic, general-purpose tools (glob, grep, file read, file write, bash). Claude Code uses ~12, Manis uses under 20, AMP and Deep Agents similarly. These tools control the computer — they don't encode domain logic. Keeping this layer thin saves context tokens and reduces LLM confusion from tool selection overload.

**Tier 2 — Computer**: A shell, file system, and code execution environment. This is where the actual actions happen — not as bound tools, but as bash commands, scripts, and file operations. The computer is composable (bash pipes), extensible (any installed CLI), and self-documenting (man pages, --help). The agent can write code to chain actions, an old idea from a 2024 paper Lance referenced (phonetically "Kodak" or possibly "CoDa" in the transcript).

Before this architecture was understood, the natural instinct was: "I want my agent to perform n actions, so I'll encapsulate each as a Python script and bind it as a tool." This produced massive tool definitions that bloated context and confused the model. The counterintuitive resolution: **a few atomic tools that can do very general things, plus a computer to compose them into anything.**

## Why It Works

### Thin context
12 tool definitions consume far fewer tokens than 35,000 (the GitHub MCP server). Every tool loaded into the system prompt occupies attention that could go to the actual task. Tool bloat was a recognized pain point — the "bajillion tools from the Linear MCP" discourse.

### Bash as a multi-tool
Bash isn't a single tool — it's a tool factory. `head`, `pipe`, `grep`, composition. Models are extremely good at using it because there's abundant training data. The "bash is all you need" thread argues the bash tool alone covers most actions.

### Training data availability
File systems and command-line operations have massive training data coverage. Models are fluent in Unix utilities. This gives the computer tier an advantage over custom tool APIs that the model hasn't seen before.

### Code as action composition
Instead of performing classic tool calling where each action is a discrete tool invocation, the agent can write scripts that chain multiple actions together. A 2024 paper Lance referenced (phonetically "Kodak" or possibly "CoDa" in the transcript) demonstrated this: agents compose actions by writing code, not by sequencing tool calls.

## Supporting Patterns

### Progressive disclosure of tools
Rather than dumping all tools into the system prompt, use a tool search tool. Index tool descriptions and do semantic search to fetch the right tool for the task (the Big Tool paper). Anthropic now recommends this approach. It's the same principle as skills — context is pulled in on demand, not preloaded.

An alternative pattern (Cursor's approach): sync MCP server tool definitions to the file system as files, then use file search (grep, glob) to find the right tool. Same result — tools don't live in context until needed.

### Context offloading
Tool results can be token-heavy. Instead of accumulating them in the chat history (where they're re-sent on every turn), save results to the file system with a summary pointer. Give the agent a summary and let it retrieve the full result if needed. Anthropic's "context editing" SDK feature supports this pattern.

This also avoids the destructiveness of compaction — summarizing chat history loses precision. Offloading preserves the full result in a searchable form.

### Plan offloading (scratchpad)
A variant: offload the agent's plan to a file (Manis's `todo.md`). The agent can read the plan back into context at any point to reinforce objectives — what Manis calls "recitation." This is the scratchpad pattern: a persistent file that the agent owns and revisits.

### Sub-agents for context isolation
For tasks that are atomic and parallelizable, spawn sub-agents — each with its own clean context window. This prevents task A's context from polluting task B's reasoning. Claude Code uses sub-agents for code review, migrations, and lint rule checking. The Ralph Wiggum loop extends this to serial tasks: each loop iteration is a fresh context window, with the plan file as shared state between agents.

### KV caching
If the chat history is long but mostly invariant (system prompt, past turns that won't change), KV caching means each incremental turn only processes the new tour result, not the entire history. Manis treats cache hit rate as one of the most important metrics for production agents — it directly affects speed and cost.

## The MCP Lesson

MCP (Model Context Protocol) made it easy to add tools to agents, but this created a problem: agents drowning in tool definitions. The resolution wasn't to abandon MCP — it was to push MCP servers out of the tool calling layer and into the computer tier:

- **Cursor's approach**: Sync MCP tool definitions to the file system as files. Agent finds tools via file search.
- **Manis's approach**: Build a CLI for MCP. Agent invokes MCP tools via the CLI, not as bound tools.
- **General principle**: MCP servers are a source of capabilities, but their tool definitions don't belong in the system prompt.

## Limits

The multi-tier pattern shines for tasks where the search space is moderate (small-to-medium repos, consumer research tasks). When the search space grows large (enterprise knowledge bases, large codebases), native file system tools (grep, glob) degrade. The architecture is compatible with specialized search tools — they can be CLI-accessible or added as a tool at Tier 1 — but the file system alone isn't sufficient.

The file system also has collaboration limits: last-write-wins semantics don't support concurrent multi-agent editing. This is an unsolved problem for 2026.

## Thread

- [[the-agent-workflow]] — The multi-tier action space is the architecture pattern underlying the agent workflow's execution phase
- [[context-engineering]] — Every pattern here (progressive disclosure, offloading, sub-agents, caching) is a context engineering technique

## Related

- [[context-engineering]] — The practice that these patterns operationalize
- [[evolving-context]] — What happens when the agent starts modifying its own context (skills, prompts, memories) over time
- [[tool-design-for-agents]] — The tool tier is about agent-first tool design
- [[ralph-loop]] — An application of context isolation for long-running serial tasks
- [[lance-martin]] — Described and catalogued this architecture
- [[dex-horthy]] — The fast orchestrator + smart oracle pattern is a specific multi-tier instantiation

## Sources

- `raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md` — Full interview detailing the multi-tier architecture, supporting patterns, and the MCP lesson

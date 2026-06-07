---
title: Context Engineering
created: 2026-05-02
updated: 2026-06-08
sources:
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
  - raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md
  - raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md
  - raw/2602.11988v1.txt
  - raw/2601.20404v1.txt
  - raw/yt-hierarchical-memory-context-management-in-agents-sally-ann-delucia.md
  - raw/yt-effect-opencode-dax-raad.md
  - raw/yt-systems-building-systems.md
unaudited_marginal: 0
tags: ["concept", "context-engineering", "llm", "agents", "prompt-engineering"]
---

# Context Engineering

> The practice of getting the most out of LLMs by putting the right information in, keeping it as small and dense as possible — maximizing information-per-token density rather than token count. Emerged independently in April 2025 from Jeff Huber (Chroma CEO) and [[dex-horthy|Dex Horthy]], then refined by practitioners like [[lance-martin|Lance Martin]] who catalogued the techniques that operationalize it: progressive disclosure, context offloading, sub-agent isolation, caching, and evolving context.

## Definition

Context engineering sits between prompt engineering and agent harness design. It's not about crafting better prompts — it's about engineering the entire context environment the model receives: what information is included, how it's structured, what's excluded, and how dense the signal is.

The core heuristic: **information-per-token density**. Two prompts at the same token count can have dramatically different effectiveness depending on how densely they pack relevant signal. The hard part is knowing what to exclude — every extraneous token degrades attention on the relevant ones.

A clean formulation from practitioner Sally-Ann Delucia (Arise): **context decides what the model sees, memory decides what survives.** They are distinct concerns that must be built together — separating them conceptually prevents conflating session-level context management with long-term knowledge retention. She also argues context management is a product and UX problem, not just an engineering one: bad context produces bad answers, and bad answers drive users away. The engineering strategies matter, but the ultimate test is whether the user gets the right answer.

## Key Principles

### Smart Orchestrator + Smart Oracle Pattern
An emerging architecture from the AMP Code team: the main orchestrator model should be fast (Sonnet-class), not the smartest. It handles tool calling, file navigation, and routing. The really heavy reasoning — reading 50 files to find a race condition — gets delegated to a slower, smarter "oracle" model (Opus, o3) as a single batched prompt, not an agentic loop.

The insight: smart models are bad at tool calling and slow. If you can have the fast orchestrator figure out *which* files are relevant, then batch all that context into a single prompt for the oracle, you avoid the oracle burning time on tool calls.

### Context Engineering Is Durable
Unlike prompt engineering, which shifts as models improve, context engineering addresses a structural constraint: quadratic transformer attention. As long as attention degrades with context size, the skill of minimizing context while maximizing signal density will remain valuable. Dex Horthy makes this point directly — the map of what an agent harness needs (filesystem, tools, code execution) is unlikely to change for a decade. ([[armin-ronacher|Armin Ronacher]] makes a parallel argument about tool design durability elsewhere.)

### Model-Specific Context Design
Different models require differently engineered context:
- Opus can follow 6-step workflows reliably
- Sonnet will forget steps 4-6 mid-workflow
- Using the same prompts across models means maintaining multiple sets
- Instruction style (all caps, "IMPORTANT") works on Opus but de-tunes other models like Codex

## Practical Patterns

### Fast Orchestrator, Slow Thinker
A concrete architecture pattern:
1. Fast model (Sonnet) navigates filesystem, searches, determines what's relevant
2. Deterministic layer collects relevant files
3. Smart model (Opus) receives a single massive context and produces the analysis
4. Fast model handles the output

This avoids the "smart model calling tools slowly" problem.

### Instruction Density Management
Frontier models can follow ~100-200 instructions before attention spreads too thin. This creates [[instruction-severity-inflation]] — everyone putting their instructions in ALL CAPS to compete for attention, which degrades everything else. Context engineering means actively managing instruction count, not just adding more.

### NoSQL Over SQL for AI
Dex argues that flexible schemas (front matter, markdown) are more AI-friendly than rigid SQL schemas. The agent doesn't care about the schema — it reads the data and extracts what it needs. Schemas constrain programs, not AI. An agent can evolve its own schema by adding front matter fields as needed.

### Framework Verbosity as Context Engineering

[[dax-raad|Dax Raad]] provides a concrete example of context engineering at the codebase level: verbose frameworks like [[effect|Effect]] embed explicit patterns (branded types, service interfaces, schema definitions) directly in each file. When an LLM reads a file, these patterns act as dense, high-signal context — the model knows exactly what the next piece of code should look like because the existing code is unambiguous. "When I ask the LLM to do something in an effect codebase, it almost always does it correctly" because the framework's verbosity is context engineering: more explicit patterns = more signal per token = better LLM output.

This is context engineering applied not at the prompt level but at the codebase architecture level — choosing frameworks and patterns that maximize information density for the AI, not just the human.

## Operational Techniques

[[lance-martin|Lance Martin]] catalogues the concrete techniques that operationalize context engineering in agent harnesses:

### Progressive Disclosure
Don't dump all tools, skills, or instructions into the system prompt. Pull context in on demand: tool search (semantic search over indexed tool descriptions), skills as file-based SOPs that agents read only when needed, and MCP servers synced to the file system rather than bound as tools. The [[multi-tier-action-space]] architecture depends on this pattern.

### Context Offloading
Save tool results to the file system instead of accumulating them in chat history. Give the agent a pointer and summary; let it retrieve the full result if needed. This avoids both context bloat and the destructiveness of compaction (summarizing history loses precision). Anthropic's "context editing" SDK feature formalizes this. A variant: offload the agent's plan to a scratchpad file and re-read it for "recitation" — reinforcing objectives mid-task.

### Smart Truncation + Memory
A production-validated technique from the Arise team (building Alex, an AI agent for observability data analysis). The team went through a real failure progression before landing on this:

1. **Naive truncation**: Keep the first N characters, drop the rest. Simple, but broke reasoning — follow-up queries looked like new conversations because the agent couldn't remember what was discussed. Over-truncation destroys the model's ability to connect turns.
2. **Summarization**: Use an LLM to compress context into fewer tokens. Too inconsistent — no control over what the model decided was important. The summarizer would drop crucial details while preserving irrelevant ones.
3. **Smart truncation + memory** (what worked): Keep the head (first ~100 characters) and tail (last ~100 characters) of the conversation; store the middle in a retrievable memory store. The agent can query the memory store if it needs to recall something from the truncated middle. This preserves recent context while keeping the working window small, and gives the agent agency over what context it retrieves.

The team reports this strategy has been stable in production for months. The Claude Code code leak later confirmed that Anthropic independently converged on a similar truncation-and-compression approach — validating the pattern through convergent design.

### Long Session Evals
A specific eval technique for detecting context degradation in long conversations. As sessions grow, failures appear late and silently — users don't restart chats, so conversations accumulate turns until the agent starts forgetting. The Arise team's technique: **load 10 turns, test the 11th**. By systematically testing what the agent remembers at N+1 turns, context degradation becomes testable rather than waiting for user reports. This is a structured eval signal for context management quality, complementary to per-turn accuracy metrics.

### Sub-Agent Isolation
For atomic, parallelizable tasks, spawn sub-agents with clean context windows. Prevents task A's tool results from polluting task B's reasoning. Claude Code uses sub-agents for code review, migrations, and lint rules. The [[ralph-loop]] extends this to serial tasks: each iteration is a fresh context window, with a plan file as shared state between otherwise isolated executions.

### KV Caching
Cache the invariant portion of chat history (system prompt, previous turns). Each incremental turn only processes the new bit. Cache hit rate is one of the most important metrics for production agents — directly affects speed and cost.

### Context Layers
A mental model articulated by the host (Dex Horthy) and engaged with by Lance Martin for thinking about where context comes from: **session context** (what's happening in the current agent session), **agent context** (multi-session — skills, memories, past sessions), **organizational context** (Slack, email, calendars, knowledge bases), **global context** (web search, external information). The goal: materialize a just-in-time view across these layers that enables the agent's best next action.

## The Context Engine Pattern

[[peter-werry|Peter Werry]] (Unblocked) provides the most detailed public architecture for a **context engine** — a productized system that operationalizes context engineering at organizational scale. A context engine sits between data sources and agents, acting as a curated context pipeline. It goes beyond individual session management to understand:

- **Who you are**: What team you work on, what repos you own
- **Who the experts are**: A social/expert graph built from SCM and communication data
- **What decisions were made**: Distilled from PR comments, Slack conversations, and incident reports
- **What was rejected**: Past approaches that were tried and failed

The context engine addresses a core insight Werry identifies: **access doesn't equal understanding**. Just wiring up MCP servers or building a naive RAG system gives agents *access* to data but not the *understanding* of how it relates, why it's that way, or which sources to trust when they conflict.

### The Three Myths

Werry identifies three common misconceptions about context engines:

1. **Naive RAG over docs is a context engine** — Vector search alone suffers from [[satisfaction-of-search]] (agents find the first plausible answer and stop), lacks personalization, and can't resolve conflicts in the data.
2. **Connecting a bunch of MCPs is a context engine** — MCP servers provide access but not understanding. An agent wired to a set of MCP servers can find *something* related to the task, but without understanding the relationships between data sources, the historical context, or the organizational dynamics, it still gets the wrong answer.
3. **A bigger context window will solve this** — Even if 10–50M token windows become feasible, most organizations have more context than that, and models still struggle to reason across all of it. The bottleneck shifts from token capacity to understanding what's true and what to select.

### Organizational Memory & Expert Bottling

A key mechanism Werry's team developed: **distilling expert context** from historical data. The process:

1. A social/expert graph identifies who the experts are for each code area (based on PR contributions, reviews, and Slack activity)
2. Historical context for each expert is distilled — decisions they've made, PR comments they've left, Slack conversations they've had
3. When a new developer works on that code area, the distilled expert context is loaded as seed context, providing directional guidance

This creates a three-layer retrieval strategy: vector search (layer 1), pre-built organizational memories (layer 2), and bottled expert context (layer 3). Werry reports this eliminates the need for agents to rediscover organizational knowledge from scratch.

### Satisfaction of Search

See [[satisfaction-of-search]] for the full treatment. Introduced by Werry from radiology: agents find the first plausible answer in their search and stop, missing richer information in Slack conversations, incident reports, or past rejected PRs. This is a context engineering failure — the agent's search strategy lacks the organizational awareness to know where the highest-signal context lives.

### Performance Impact

Werry's benchmark data shows the concrete impact of context engineering at organizational scale: implementing Anthropic's adaptive thinking mode took 2.5 hours and 21M tokens *without* a context engine vs. 25 minutes and 10M tokens *with* one. The improvement comes from eliminating doom loops — the agent gets the right context upfront and doesn't need to iterate through multiple wrong approaches.

## Agent Persistence as Context Engineering

[[eero-alvar|Eero Alvar]] identifies agent persistence as the shared bottleneck across all [[software-factory]] designs. The problem: long-running complex tasks can't fit in a single session, and the agent has to manage its own context on top of orchestrating the build.

Three persistence mechanisms, each a context engineering problem:

1. **New session tool**: Agent ends its session and starts a new one with a crafted prompt. Works mechanically, but the agent accumulates files it never cleans up, reads the same context repeatedly, and spends most of each session reorienting. Context engineering failure: the handoff prompt doesn't compress enough signal.
2. **Compact tool**: In-session compaction. Lossy — the agent has limited control over what survives. Context engineering failure: compaction is a blunt instrument that doesn't preserve the right information.
3. **[[babysitter-agent]]**: An invisible agent that crafts perfect session-launch prompts. The babysitter is a dedicated context engineering agent — its entire job is maximizing information density in the handoff between sessions.

The deeper insight: ideally, the agent shouldn't have to think about context management at all. Context engineering should be infrastructure, not agent cognition.

## Thread

- [[the-slop-problem]] — Context pollution from verbose tool output and poorly designed context files is a primary slop vector; information-per-token density is slop prevention
- [[the-human-lever]] — The human owns the context decisions: what to include, what to exclude, how dense the signal; context engineering operationalizes the human lever at the information layer
- [[the-agent-workflow]] — Context engineering is the infrastructure layer beneath the agent workflow; managing information-per-token density is the operational skill the workflow depends on
- [[agent-quality-engineering]] — The eval infrastructure (logging proxies, snapshots) is a context engineering concern
- [[tool-design-for-agents]] — Tool output design is a context engineering concern; verbose tool output is a primary source of context bloat

## Related

- [[agent-skills]] — Progressive disclosure is the core context engineering technique that skills implement; skills are the canonical use case for tiered context loading
- [[procedural-knowledge]] — Context engineering manages how procedural knowledge (skills) is loaded via progressive disclosure
- [[dex-horthy]] — Co-creator of the term and practice
- [[smart-zone-dumb-zone]] — Context engineering operationalizes staying in the Smart Zone
- [[instruction-severity-inflation]] — Instruction density management is a core context engineering skill
- [[multi-tier-action-space]] — Context engineering techniques enable the thin-tool-layer architecture
- [[evolving-context]] — Context engineering extended into the temporal dimension
- [[lance-martin]] — Catalogued the operational techniques
- [[ralph-loop]] — The Ralph Loop applies context isolation (sub-agent spawning) to serial tasks; each iteration gets a clean context window
- [[ubiquitous-language]] — The context.md ub-lang file is the human-trusted artifact that survives context resets.
- [[slop-watch]] — Matt's research compaction workflow (parallel sub-agents → research doc → reset) is context engineering applied to greenfield ideation.
- [[satisfaction-of-search]] — A context engineering failure mode: agents stopping context retrieval too early
- [[unblocked]] — A productized context engine architecture
- [[peter-werry]] — Contributions to context engine architecture, satisfaction of search, and organizational context retrieval
- [[dynamic-trust]] — Real-time context injection is the mechanism for the "time-specific context" component of dynamic trust; context engineering enables it
- [[aiming-problem]] — Instruction tuning is context engineering applied at the system level: the instructions are the context that shapes agent behavior toward the desirable subset
- [[agentic-engineering]] — Context engineering is a core proficiency of agentic engineering; the discipline demands mastery of what to put in the context window
- [[claude-code]] — The primary agent substrate that context engineering techniques are applied to; Claude Code's sub-agents, file-based tools, and AGENTS.md are context engineering surface area
- [[context-files]] — Context files (AGENTS.md, CLAUDE.md) are the concrete artifact through which context engineering principles (minimalism, operational focus, high signal density) are applied at the repository level; recent empirical evidence validates that information-per-token density matters more than volume
- [[html-as-agent-output]] — HTML output trades higher token cost for richer information-per-human-read-cycle; a context engineering tradeoff where the density question shifts from per-token to per-human-attention-unit
- [[semi-formal-reasoning]] — Structured reasoning templates are a form of context engineering: constraining the reasoning process to maximize evidence-per-token density
- [[knowledge-triplet]] — The triplet is an information-theoretic framing of context engineering: supply the knowledge the model can't find elsewhere
- [[ai-boilerplate-paradox]] — Framework verbosity as context engineering at the codebase architecture level
- [[opencode]] — Real-world demonstration of Effect's verbosity as context engineering
- [[steering-docs]] — Kiro's branded operational context: surface operational notes (commit style, code style, hard-won CDK flags) in the system prompt at every turn, rather than re-learning them each session; the persistent-context layer of context engineering
- [[kiro]] — Amazon's agentic IDE that codifies context engineering principles (EARS-formatted requirements, steering as operational context) into the IDE interface

## Sources

- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — Full interview defining context engineering origins, principles, and practices
- `raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md` — Operational techniques catalog, context layers model, context isolation patterns
- `raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md` — Context engine architecture, the three myths, satisfaction of search, organizational memory, and expert bottling
- `raw/2602.11988v1.txt` — Gloaguen et al. (2026). Context files as context engineering surface area; the first empirical validation that information-per-token density (minimal, operational-only files) outperforms verbose, LLM-generated alternatives.
- `raw/2601.20404v1.txt` — Lulla et al. (2026). Efficiency evidence that well-designed context files reduce agent runtime and token consumption, consistent with context engineering goals.
- `raw/yt-hierarchical-memory-context-management-in-agents-sally-ann-delucia.md` — Practitioners' report from Arise: failure progression from naive truncation through summarization to smart truncation + memory, long session evals technique, context-vs-memory distinction, and context management as a product/UX problem.
- `raw/yt-effect-opencode-dax-raad.md` — [[dax-raad|Dax Raad]]: Effect's verbosity as context engineering — explicit patterns in each file constrain LLM output. The framework's strictness means the AI "almost always does it correctly" because the context is unambiguous.
- `raw/yt-systems-building-systems.md` — [[eero-alvar|Eero Alvar]]: agent persistence as a context engineering problem; babysitter agent as dedicated context management infrastructure; instruction libraries as factory-level context engineering

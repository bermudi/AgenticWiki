---
title: Tool Design for Agents
created: 2026-04-26
updated: 2026-05-10
sources:
  - raw/yt-how-agents-use-dev-tools.md
  - raw/agentic-coding-recommendations.md
  - raw/yt-building-pi-in-a-world-of-slop.md
  - "raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md"
  - raw/slowing-the-fuck-down.md
  - "raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md"
  - "raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md"
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
  - raw/2603.00822v2.txt
tags: [thread, tool-design, agent-tooling, dx, developer-tools, language-choice]
unaudited_marginal: 0
---

# Tool Design for Agents

> Developer tools were built for human consumption. As agents become the primary consumer, the tool layer needs fundamental redesign — not more features, but different interface contracts, output formats, and design priorities. Multiple independent sources converge on the same conclusion: the tool is the bottleneck, and the agent's effectiveness is bounded by the quality of the tools it calls.

> [!note] Departure: Tool Use Can Harm
> This thread argues that better tools → better agent outcomes. [[philippe-laban|Laban]] et al. (2026) complicate this assumption: in [[delegate-52|DELEGATE-52]], four LLMs given file reading, writing, and code execution tools performed **worse** than without tools, incurring an average additional degradation of 6%. The tools introduced overhead (2–5× more input tokens), and models favored regenerating entire files over targeted edits. This doesn't refute the thread's thesis — the paper tested a basic harness, not redesigned tools — but it does show that **adding tools without careful design can actively harm**. The "tools fix it" assumption is not automatically true for current models in long-horizon workflows.

> [!note] Departure: Model Capability as an Independent Bottleneck
> This thread argues that tool design is the primary bottleneck for agent effectiveness. The Harvard AgentFloor study (May 2026) adds an independent constraint: **model capability**. At AgentFloor's tier E (8-12 step planning), all models collapse — including GPT-5 at ~10% task completion. This collapse occurs even with perfectly clean, deterministic tool interfaces that eliminate every confounding variable the thread identifies. At high planning complexity, the bottleneck is the model's architectural planning horizon, not the tool layer. Tool design and model capability are two independent axes — fixing both is necessary, and at the upper bounds, model capability becomes the binding constraint regardless of tool quality. See [[agent-floor]] for the empirical data.

> [!note] Departure: Feature-Rich vs. Minimal, Both Can Work
> This thread argues that minimal tools with clean contracts outperform feature-rich ones. [[dex-horthy|Dex Horthy]] provides a counterexample: he achieves exceptional results with Claude Code — a feature-rich, opinionated tool with thousands of open issues and a complex prompting model. His success doesn't come from tool minimalism but from **deep intuition built over months of intensive use with a single tool** ("pick one model, one tool, work with it for 1-2 months"). This suggests that **deep tool familiarity** can compensate for tool complexity, and that the minimalism vs. feature-richness axis may be secondary to the **consistency of use** axis. Both approaches converge on a shared principle: the agent's effectiveness is bounded by how well the human understands the tool's failure modes, not by the tool's feature count.

> [!note] Calibration: Bounded Returns on Interface Quality
> The [[context-files]] empirical evidence adds a calibration to this thread's thesis that tool quality bounds agent outcomes. Developer-written context files (a well-designed tool interface) improve performance by only ~4% over none. LLM-generated files (a poorly-designed interface) degrade it by ~2%. The effect is real but bounded — past a minimal quality threshold, further tool interface refinement yields diminishing returns. This complements the AuthorFloor finding that task decomposition and [[model-routing|model routing]] may be higher-leverage interventions than tool design alone. The thesis is correct but its leverage is concentrated at the floor (preventing bad tools) rather than at the ceiling (perfecting good ones).

## The Core Thesis

The wiki already has the [[the-agent-workflow|workflow]] and [[the-human-lever|human role]] threads. This thread covers the **third leg**: the tools themselves. The argument breaks into three layers that reinforce each other:

1. **Tools must change because the consumer changed.** Agents don't have intuition, fatigue, or the ability to skim. They need deterministic, structured feedback.
2. **Language and infrastructure are tooling decisions.** Choosing Go over Python, a Makefile over an MCP server — these are tool design choices that directly affect agent performance.
3. **Minimalism beats feature richness.** Fewer, composable tools with clear contracts outperform feature-rich ones because they reduce the failure surface for the LLM.

## Layer 1: Redesigning the Interface Contract

[[zanie-blue|Zanie Blue]] (Astral) provides the most systematic treatment. She identifies five qualities tools provide to agents — correctness, quality, efficiency, safety, and context discovery — and argues that each one requires different design when the consumer is an agent rather than a human.

### Output Optimization
Today's tools output for humans: verbose diagnostics, interactive TUIs, color-coded terminals. Agents need none of this. What they need:

- **Context reduction built in**: The tool itself is best positioned to decide what's essential. Raw JSON isn't enough — it can be more verbose than human-readable output. The tool should return the minimal actionable signal and persist the rest to a file the agent can opt into reading.
- **Agent Experience as a design dimension**: The same design principles apply to how agents navigate codebases and tool outputs — [[agent-experience|AX]] extends from code structure to tool interfaces, and well-designed tools reduce the cognitive load on the consuming agent just as they would for a human.
- **Machine-parseable confidence levels**: Human-facing linters suppress low-confidence findings to avoid fatigue. Agents don't fatigue. They should receive more signals, including low-confidence ones, and decide for themselves whether to act.
- **Restrictive trust models**: Escape hatches designed for humans (`noqa`, `--no-verify`, `--force`) enable bad agent behavior. The default for agents should be more constrained, not less.

### The Scale Effect
Agents make it trivially easy to go from one agent to a hundred and back to zero. This means a 10-person team suddenly faces the problems of a 100-engineer organization: concurrency, git worktrees, reproducible environments, declarative dependency management. Tools designed for individual human use become insufficient at agent scale. As inference gets faster, tools — not model intelligence — become the bottleneck.

### Plugin Extensibility and Self-Tooling
Research shows agents that construct their own tools outperform those with pre-built harnesses. The [[context-files|context file]] research by [[thibaud-gloaguen|Gloaguen et al.]] and [[christoph-treude|Lulla et al.]] (2026) provides empirical evidence for this: agents given well-designed [[context-files|context files]] (AGENTS.md, CLAUDE.md) behave differently — they follow instructions faithfully, explore more, and test more — but the quality of the tool interface (the context file itself) determines whether this behavioral change improves or degrades performance. [[martin-vechev|Vechev]]'s lab at ETH Zurich produced the rigorous evaluation framework. This isn't theoretical — [[malleable-agents|agents that can modify their own tools]] are already emerging. Plugin extensibility becomes higher priority than it ever was for human-only use: an agent defining custom lint rules to prevent its own future mistakes is a form of agent memory. Language servers need re-prioritization too — autocomplete is high-effort but largely irrelevant to agents, while rename/find-references is genuinely valuable. The LSP protocol itself may not be the right abstraction for agents; new protocols may be needed.

## Layer 2: Language and Infrastructure as Tooling

[[armin-ronacher|Armin Ronacher]] argues that language choice is the single most consequential tooling decision for agent workflows, and that infrastructure design (Makefiles, process managers, logging) is as important as the code itself.

### Go as the Optimal Agentic Language
Ronacher makes a specific, well-argued case:

- **Explicit context system**: Go's copy-on-write context bag flows through the call chain explicitly. Agents always know how to pass data downstream — no implicit magic, no guessing where a value came from.
- **Test caching**: `go test` runs incrementally and caches results. The agent doesn't need to figure out *which* tests to run. Compare with Python where pytest's fixture injection confuses agents, or Rust where agents sometimes fail on `cargo test` invocation syntax.
- **Structural interfaces**: If a type has the right methods, it conforms. No declaration ceremony. LLMs find this trivially understandable.
- **Low ecosystem churn**: Go's commitment to backwards compatibility means less risk of agents generating outdated code — unlike JavaScript's fast-moving ecosystem.
- **Speed**: Fast compilation keeps the agent loop tight. Every millisecond of tool response time compounds across hundreds of loop iterations.

### Infrastructure as Agent Interface
Ronacher treats infrastructure the way Zanie treats tool output — as an interface contract:

- **Makefiles as workflow interfaces**: `make dev`, `make tail-log` — simple, deterministic targets the agent can invoke without understanding the underlying process manager. The Makefile is the API; the shell scripts are the implementation.
- **Misuse resistance**: A process manager with a pidfile that errors "services already running" on double-spawn instead of silently failing on a port conflict. There is no such thing as user error with an agent — every misuse path must produce a clear, informative error.
- **Dual-output observability**: Terminal + file logging so the agent can read logs autonomously without the human intermediating.

See [[agent-friendly-tooling]] for the full practical treatment of these patterns.

## MCP vs CLI: The Structural Analysis

Both [[mario-zechner|Mario Zechner]] and [[armin-ronacher|Armin Ronacher]] are firmly in the CLI camp, but the podcast reveals more nuance than their reputation suggests.

### Mario's Three Problems with MCP

Despite his reputation, Mario clarifies: "I don't actually hate MCP quite as much" — but identifies three structural issues:

1. **Bad servers from big corporations**: Companies mapping entire OpenAPI specs into MCP servers, exposing hundreds of tools. "That's garbage." The model can't effectively choose from hundreds of similar tools.
2. **Inherent non-composability**: Combining outputs from two different MCP servers requires the model to do data transformation through context. Compare with CLI pipes — the model sees only the end result and is free to massage data. Code mode (Anthropic's workaround) is essentially admitting MCP can't compose by itself.
3. **Auth as the valid use case**: David from Sentry is a big MCP proponent because of auth. Mario acknowledges this is genuinely useful for enterprises but hopes for an "MCP 2" based on auth specs + code execution rather than context-heavy tool calls.

### Armin's Nuanced Position

Armin sees MCP as a victim of its own success. It started as a consumer-side solution (connect email, OneDrive to chat apps), then IDEs adopted it, then developers tried to use it for complex tooling — a use case it wasn't designed for. His key observation: **the most capable personal agents (OpenClaw) are just coding agents hidden from users**. When a non-technical user asks how to do something, the model doesn't say "install this MCP server" — it says "I'll write a Python script that does it." Code execution won naturally.

Both agree: for developer-facing agent tools, CLI composability (pipes, scripts) outperforms MCP's context-transit model. But MCP has a legitimate enterprise niche (auth, consumer integrations) that won't go away.

## Layer 3: Minimalism as Performance

[[mario-zechner|Mario Zechner]] approaches from a different angle. Rather than redesigning existing tools, he argues for fewer tools with simpler contracts. [[pi]]'s core is four tools: `read`, `write`, `edit`, `bash`. No MCP server, no protocol overhead, no feature negotiation. This minimalism is echoed in the [[ralph-loop]] pattern, where a dumb bash loop and a plan file replace sophisticated orchestration — both converge on the same insight: fewer moving parts means fewer failure modes for the agent.

The argument: complex tools create complex failure modes. A harness with 50 specialized tools gives the LLM 50 chances to pick the wrong one, misuse it, or get confused by overlapping functionality. A harness with 4 composable tools gives the LLM clarity and forces creativity into *how* the tools are composed, not *which* one to pick.

This aligns with Ronacher's skepticism of MCP unless the alternative is unreliable. Plain shell scripts are faster and more predictable than protocol servers. Minimalism isn't asceticism — it's a performance strategy. Terminal-Bench 2.0 results show minimal harnesses often outperform complex ones because clearer context and fewer failure points matter more than feature coverage.

### Pi's Origin: Rejection of Context Manipulation

Pi was born from Mario's frustration with Claude Code silently injecting context — system reminders, modified tool definitions — behind his back. He reverse-engineered Claude Code's obfuscated JavaScript and tracked every system prompt change (cc-history.mario.ai). Open Code had similar sins: pruning tool results, injecting LSP diagnostics after every edit (confusing the model with errors for code it hadn't finished writing). Pi's founding principle: **the user controls the context.** This is minimalism as a safeguard, not asceticism.

### Malleability as the Escape Valve
The risk of minimalism is rigidity. Zechner's answer: [[malleable-agents]]. Both the user and the agent should be able to create new tools mid-session. The core stays small; the periphery is emergent. This resolves the tension between Zanie's "tools need richer interfaces" and Zechner's "keep the core minimal" — the core is minimal, but agents extend it on demand by composing the primitives.

## Layer 4: The Parallel Management Interface

As agents cross the 5-minute execution threshold (see [[the-agent-workflow|Focus Maxing / Parallel Agent Management]]), the tooling challenge shifts: the human isn't working with one agent at a time, but managing multiple concurrent streams of agent outputs.

[[louis-knight-webb|Louis Knight-Webb]]'s Vibe Kanban demo illustrates several features that point toward a parallel management interface: multiple workspaces with isolated working trees, diffs on demand for async review, and live preview. Synthesizing from his talk and the [[the-agent-workflow|focus maxing]] pattern, the design requirements for this new mode are:

- **Isolated agent streams**: Each agent run needs its own workspace, logs, and diffs. Mixing outputs between runs creates confusion — Knight-Webb's sidebar of separate workspaces is one approach.
- **Async review**: Completed work must be reviewable without watching the agent execute. Diffs, previews, and test results available on demand, not streamed in real-time.
- **Task queuing and dispatch**: The human queues tasks and dispatches them to available agent instances. The tool manages parallelism; the human manages priority.
- **Review continuity**: When feedback is sent back to a specific agent stream, it must be routed to the correct instance and workspace — a natural consequence of the multi-stream model.

This is a departure from the assumptions behind both CLI tools (single process, synchronous output) and MCP servers (stateless tool calls). The parallel management interface treats agent execution as an **async job queue with human gates at review points** — a fundamentally different interaction model that existing tools don't support.

## Layer 5: The Context Engine as a Meta-Tool

[[peter-werry|Peter Werry]]'s [[unblocked]] introduces a fifth layer to the tool design analysis: the **context engine** — a meta-tool that sits between all other tools and the agent, curating what context reaches the agent before it invokes any tool.

This is a concrete instantiation of [[context-engineering]] principles — maximizing information-per-token density by having a dedicated system pre-answer the context questions the agent would otherwise search for. The context engine is the productized form of context engineering at organizational scale.

This is distinct from the tool design layers above. Where Zanie focuses on individual tool output, Armin on language/infrastructure, Mario on minimalism, and Louis on parallel management, the context engine addresses a *pre-processing* concern: **what context should the agent even see before it starts calling tools?**

### Why It's a Tool Design Problem

Werry's key insight: agents spend ~90% of execution time collecting context, not writing code. The context collection phase is dominated by tool calls — searching Slack, reading docs, grepping code. A context engine is a tool that pre-emptively answers those searches so the agent doesn't need to make them:

| Without context engine | With context engine |
|---|---|
| Agent searches multiple different sources | Context engine pre-collects the relevant context |
| Agent finds plausible but wrong information | Context engine resolves conflicts before the agent sees data |
| Agent misses organizational history | Context engine distills historical decisions as memories |
| 2.5 hours, 21M tokens | 25 minutes, 10M tokens |

### Tool Design Implications

- **Context as a tool output**: The context engine's primary output is curated context — not a file, not an API response, but a distilled package of organizational knowledge. This shifts the tool design question from "how does this tool output information?" to "how does this system select and filter information?"
- **Conflict resolution as a tool concern**: Where Zanie argues tools should suppress low-confidence signals for humans, a context engine does the opposite: it surfaces unresolved conflicts to the human for guidance, surfacing the tension rather than silently picking a wrong answer. This is tool feedback designed for a post-search world.
- **Personalized retrieval as infrastructure**: Retrieval is no longer a per-tool concern. The context engine knows who you are, what you work on, and who the experts are. This level of personalization can't be achieved by individual tool design — it requires a system that understands the organization's social graph.

### Relationship to Other Layers

The context engine layer interacts with the other four layers:
- **Layer 1 (output optimization)**: The context engine *is* the optimization — it reduces what tools need to output by pre-answering their questions
- **Layer 2 (language/infrastructure)**: The context engine's expert graph and memory storage are themselves infrastructure decisions
- **Layer 3 (minimalism)**: The context engine enables minimal tool cores by pushing context retrieval complexity into a separate system
- **Layer 4 (parallel management)**: Context pre-collection matters more when managing multiple agents — each agent would otherwise independently discover the same organizational knowledge

## ContextCov: Executable Checks as Tool Feedback

[[contextcov|ContextCov]] (Sharma, 2026) provides the strongest empirical validation of this thread's core thesis: **deterministic tool feedback outperforms LLM-based judgment for agent control.**

The paper compares three approaches to enforcing AGENTS.md constraints:
- **Passive instructions** (vanilla): The agent reads AGENTS.md in context but receives no active tool feedback. Compliance: 67.0%.
- **LLM Reflection**: A critic LLM reviews patches against AGENTS.md and returns natural-language feedback in a macro-loop. Compliance: 50.3%.
- **ContextCov's executable checks**: Deterministic PATH shims, Tree-sitter queries, and dependency graph analysis provide immediate, reproducible violation traces. Compliance: **88.3%**.

The result that LLM reflection is *worse than nothing* is particularly striking for this thread. It confirms Zanie Blue's argument that tools must provide deterministic, specialized feedback — not because LLM-based feedback is useless in theory, but because in practice it "hallucination loops" (repeatedly failing to address the same issue) and introduces drift.

### Design Choices That Validate the Thread's Predictions

| ContextCov decision | Thread's prediction | Match |
|---|---|---|
| PATH shims for command interception | Zanie: "escape hatches designed for humans enable bad agent behavior" — ContextCov's shims have no escape hatch for the agent | ✓ |
| Domain-routed code synthesis (separate generators for process/source/architectural checks) | Zanie: specialized feedback qualities — process=correctness, source=quality, architectural=safety/efficiency | ✓ |
| Fail-closed interpretation of ambiguous instructions | Mario: restrictive trust models — the agent should be more constrained, not less | ✓ |
| Generated checks stored as editable JSON files for human review | Zanie: "the tool should return the minimal actionable signal" — checks are inspectable Python code | ✓ |
| Tree-sitter for static analysis vs LLM-based linting | Armin: fast, deterministic feedback keeps the agent loop tight | ✓ |

ContextCov's evaluation provides empirical weight the thread previously lacked. The tool-design thesis — that better agent-facing tools produce better outcomes — now has a controlled experiment showing 21.3 percentage point improvement from deterministic tool feedback over passive instructions, and 38 points over LLM-based feedback.

## Sources

- `raw/yt-how-agents-use-dev-tools.md` — Zanie Blue's systematic treatment: feedback qualities, scale effects, output optimization, self-tooling
- `raw/agentic-coding-recommendations.md` — Ronacher on Go, Makefiles, misuse resistance, daemon patterns, speed
- `raw/yt-building-pi-in-a-world-of-slop.md` — Zechner on minimalism, malleability, four-tool core, Terminal-Bench results
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — MCP vs CLI structural analysis, Pi origin story, OpenClaw as hidden coding agent, context transparency
- `raw/slowing-the-fuck-down.md` — Agentic search recall as a fundamental tool limitation; low recall as the root cause of slop.
- `raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md` — Parallel management interface design requirements, agent runtime thresholds as a tool design constraint.
- `raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md` — Context engine as meta-tool: pre-curating context, satisfaction of search, expert graphs, and benchmark results
- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — Harvard AgentFloor study: model capability tier as a tool design constraint; open-weight models matching GPT-5 on tool use tasks at 15× lower cost
- `raw/2603.00822v2.txt` — ContextCov (Sharma, 2026): empirical validation of deterministic tool feedback over LLM reflection; fail-closed design; domain-routed code synthesis; PATH shims as lightweight enforcement

---
title: Tool Design for Agents
created: 2026-04-26
updated: 2026-07-15
sources:
  - raw/yt-how-agents-use-dev-tools.md
  - raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md
  - raw/agentic-coding-recommendations.md
  - raw/yt-building-pi-in-a-world-of-slop.md
  - "raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md"
  - raw/slowing-the-fuck-down.md
  - "raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md"
  - "raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md"
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
  - raw/2603.00822v2.md
  - raw/karpathy-html-output.md
  - raw/thariq-unreasonable-effectiveness-of-html.md
  - raw/2605.18747.md
  - raw/yt-llms-are-killing-agent-harness.md
  - raw/2509.09677.md
  - raw/2512.08296.md
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
  - raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md
tags: [thread, tool-design, agent-tooling, dx, developer-tools, language-choice]
unaudited_marginal: 0
---

# Tool Design for Agents

> Developer tools were built for human consumption. As agents become the primary consumer, the tool layer needs fundamental redesign — not more features, but different interface contracts, output formats, and design priorities. Multiple independent sources converge on the same conclusion: the tool is the bottleneck, and the agent's effectiveness is bounded by the quality of the tools it calls. Kun Chen's [[axi]] benchmark is the most direct practitioner evidence: the GitHub MCP server costs 3× tokens and 2× latency versus a CLI for the same tasks, and a token-efficient non-JSON output format can save ~40% tokens.

> [!note] Departure: Tool Use Can Harm
> This thread argues that better tools → better agent outcomes. [[philippe-laban|Laban]] et al. (2026) complicate this assumption: in [[delegate-52|DELEGATE-52]], four LLMs given file reading, writing, and code execution tools performed **worse** than without tools, incurring an average additional degradation of 6%. The tools introduced overhead (2–5× more input tokens), and models favored regenerating entire files over targeted edits. This doesn't refute the thread's thesis — the paper tested a basic harness, not redesigned tools — but it does show that **adding tools without careful design can actively harm**. The "tools fix it" assumption is not automatically true for current models in long-horizon workflows.

> [!note] Departure: Model Capability as an Independent Bottleneck
> This thread argues that tool design is the primary bottleneck for agent effectiveness. The Harvard AgentFloor study (May 2026) adds an independent constraint: **model capability**. At AgentFloor's tier E (8-12 step planning), all models collapse — including GPT-5 at ~10% task completion. This collapse occurs even with perfectly clean, deterministic tool interfaces that eliminate every confounding variable the thread identifies. At high planning complexity, the bottleneck is the model's architectural planning horizon, not the tool layer. Tool design and model capability are two independent axes — fixing both is necessary, and at the upper bounds, model capability becomes the binding constraint regardless of tool quality. See [[agent-floor]] for the empirical data.

> [!note] Departure: The Capability Bottleneck Is Partly Execution, Not Just Planning
> Sinha, Arun, Goel et al. (ICLR 2026) sharpen the callout above: the tier-E collapse AgentFloor attributes to a *planning* horizon is partly an *execution* horizon, and execution is responsive to levers tool design does not provide. By isolating execution (carrying out a given plan) from planning, they show execution [[horizon-length|horizon]] improves non-diminishingly with model size and dramatically with RL-trained thinking. Tool design cannot deliver either of those. The implication for this thread: the "model capability" axis the callout above names is itself bifurcated — a planning component that resists scale, and an execution component that yields to it. Tool design remains necessary (clean interfaces still bound the failure surface), but at the execution ceiling the binding interventions are upstream of the tool layer: model selection, thinking-mode routing, and active context management that limits exposure to the [[self-conditioning]] failure mode. See [[intelligence-tier-routing]] for the practitioner framing of model selection as a factory-level routing decision, and [[agent-floor]]'s parallel callout for the same contestation at the concept level.

> [!note] Departure: Feature-Rich vs. Minimal, Both Can Work
> This thread argues that minimal tools with clean contracts outperform feature-rich ones. [[dex-horthy|Dex Horthy]] provides a counterexample: he achieves exceptional results with Claude Code — a feature-rich, opinionated tool with thousands of open issues and a complex prompting model. His success doesn't come from tool minimalism but from **deep intuition built over months of intensive use with a single tool** ("pick one model, one tool, work with it for 1-2 months"). This suggests that **deep tool familiarity** can compensate for tool complexity, and that the minimalism vs. feature-richness axis may be secondary to the **consistency of use** axis. Both approaches converge on a shared principle: the agent's effectiveness is bounded by how well the human understands the tool's failure modes, not by the tool's feature count.

> [!note] Calibration: Bounded Returns on Interface Quality
> The [[context-files]] empirical evidence adds a calibration to this thread's thesis that tool quality bounds agent outcomes. Developer-written context files (a well-designed tool interface) improve performance by only ~4% over none. LLM-generated files (a poorly-designed interface) degrade it by ~2%. The effect is real but bounded — past a minimal quality threshold, further tool interface refinement yields diminishing returns. This complements the AuthorFloor finding that task decomposition and [[model-routing|model routing]] may be higher-leverage interventions than tool design alone. The thesis is correct but its leverage is concentrated at the floor (preventing bad tools) rather than at the ceiling (perfecting good ones).

> [!note] Extension: Tool-Coordination Trade-off in Multi-Agent Systems
> The [[scaling-agent-systems|Kim et al. scaling study]] (260 configurations, 6 benchmarks, 3 LLM families) identifies a [[tool-coordination-trade-off|tool-coordination trade-off]] (β = -0.096, p = 0.002): tool-heavy tasks suffer disproportionately from multi-agent coordination overhead. The mechanism is token budget fragmentation — MAS splits the token budget across agents, leaving insufficient capacity for complex tool orchestration. For a 16-tool task (Workbench), the efficiency penalty ranges from 2× (Independent) to 6.3× (Hybrid) relative to single-agent systems. This reinforces the thread's thesis that tools are the bottleneck: for single agents, the bottleneck is interface design; for multi-agent systems, the bottleneck is token budget fragmentation across agents that each need to reason about the same tool surface. The trade-off also sharpens the thread's tool-design guidance: minimal, composable tools are not just a design preference — they are a necessity for multi-agent coordination to remain viable. §4.3 scaling principles (ε × T interaction); §4.2 Workbench results (16-tool task, Hybrid collapse).

> [!note] Departure: The Harness Interface Taxonomy
> The [[code-as-agent-harness]] survey (Ning et al., 2026) provides a systematic taxonomy that subsumes this thread's tool categories. The survey organizes tool use within [[harness-mechanisms|harness mechanisms]] (§3.3) and identifies three acting paradigms within the code-for-acting layer (§2.2) — grounded skill selection, programmatic policy generation, and lifelong code-based agents — that correspond to different levels of agent autonomy over tools. The environment-interaction tool use paradigm (§3.3.2) — where the agent writes scripts rather than calling bound tools — is the theoretical foundation for why CLI composability outperforms MCP for developer-facing tools. The survey's key framing: the tool interface is one component of the broader **[[harness-interface|harness interface]]**, which also includes code for reasoning and code for environment modeling.

> [!note] Departure: The Training Harness Is Now a Tool-Reliability Factor
> This thread argues that tool reliability is bounded by tool design (interface contracts, output formats, minimalism). [[mario-zechner|Mario Zechner]] identifies an independent variable the thread did not account for: **the harness the model was RL-trained on.** A perfectly-designed, strict tool — [[pi]]'s edit tool, which validates tool calls against their schema — exhibits a ~20% failure rate on newer Anthropic models, because those models were (hypothesized) trained against [[claude-code|Claude Code]]'s lenient harness and never received a negative signal for emitting malformed calls. The defect is invisible to Claude Code (lenient) and fatal to Pi (strict). See [[grammar-constrained-sampling]] for the decoding-level mechanism and [[harness-monoculture]] for the ecosystem thesis: training on one dominant lenient harness propagates as (a) tool-call corruption in stricter harnesses, (b) spec pollution (third parties must accept the dominant harness's slop), (c) capability regression off the trained path, and (d) custom-tool ([[mcp|MCP]]) invocation share loss. Tool design is still necessary — clean interfaces still bound the failure surface — but it is no longer sufficient: a tool's observed reliability now depends on whether its strictness matches the leniency the model was trained to expect.

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

[[mario-zechner|Mario Zechner]], [[armin-ronacher|Armin Ronacher]], and [[kun-chen|Kun Chen]] are all in the CLI-over-MCP camp for developer-facing tools, though each reaches that position through a different route.

### Mario's Three Problems with MCP

Despite his reputation, Mario clarifies: "I don't actually hate MCP quite as much" — but identifies three structural issues:

1. **Bad servers from big corporations**: Companies mapping entire OpenAPI specs into MCP servers, exposing hundreds of tools. "That's garbage." The model can't effectively choose from hundreds of similar tools.
2. **Inherent non-composability**: Combining outputs from two different MCP servers requires the model to do data transformation through context. Compare with CLI pipes — the model sees only the end result and is free to massage data. Code mode (Anthropic's workaround) is essentially admitting MCP can't compose by itself.
3. **Auth as the valid use case**: David from Sentry is a big MCP proponent because of auth. Mario acknowledges this is genuinely useful for enterprises but hopes for an "MCP 2" based on auth specs + code execution rather than context-heavy tool calls.

### Armin's Nuanced Position

Armin sees MCP as a victim of its own success. It started as a consumer-side solution (connect email, OneDrive to chat apps), then IDEs adopted it, then developers tried to use it for complex tooling — a use case it wasn't designed for. His key observation: **the most capable personal agents (OpenClaw) are just coding agents hidden from users**. When a non-technical user asks how to do something, the model doesn't say "install this MCP server" — it says "I'll write a Python script that does it." Code execution won naturally.

Both agree: for developer-facing agent tools, CLI composability (pipes, scripts) outperforms MCP's context-transit model. But MCP has a legitimate enterprise niche (auth, consumer integrations) that won't go away.

### Kun's Efficiency Argument

[[kun-chen|Kun Chen]] adds a quantitative angle to the CLI-over-MCP case. His [[axi]] benchmark of GitHub access for agents found the GitHub MCP server cost **3× more tokens and more than 2× the latency** than the `gh` CLI for the same tasks, with no clear benefit. He also reports that a token-efficient non-JSON output format can save ~40% tokens compared to JSON. The practical upshot: tool choice is not just an aesthetic preference; it is a first-class workflow cost variable.

> [!note] Extension: The Memory Store as an Agent-Navigable Tool Surface (Dreaming)
> [[dreaming]] ([[lamis-mukta|Mukta]], Anthropic, AI Native DevCon June 2026) extends this thread's CLI-over-MCP / minimalism thesis to the memory layer. Anthropic's perceived state of the art for agent memory is **memory as a file system** — markdown files read/written/searched with ordinary tools (bash, grep) rather than bespoke memory-tool APIs or opaque vector databases. The memory store is itself an agent- and human-navigable tool surface, and Mukta's year-long path to it (CLAUDE.md → memory tools → skills → file-system-as-memory) is the same "shed unnecessary opinion about the tool surface" arc this thread tracks for dev tools. Dreaming's versioning + transcript provenance is, correspondingly, inspectable tool feedback — the [[contextcov|ContextCov]] pattern (deterministic, reviewable checks) applied to memory mutation rather than code.

## Layer 3: Minimalism as Performance

[[mario-zechner|Mario Zechner]] approaches from a different angle. Rather than redesigning existing tools, he argues for fewer tools with simpler contracts. [[pi]]'s core is four tools: `read`, `write`, `edit`, `bash`. No MCP server, no protocol overhead, no feature negotiation. This minimalism is echoed in the [[ralph-loop]] pattern (Stage 3 of the [[agent-loop|agent-loop]] lineage), where a dumb bash loop and a plan file replace sophisticated orchestration — both converge on the same insight: fewer moving parts means fewer failure modes for the agent.

> [!note] Departure: Terminal-First Customization vs. Minimalism
> Kun Chen's terminal stack (a heavily customized Western terminal emulator, tmux, and Neovim) is not a "four tools" minimal core. It is a deep, personalized, high-maintenance environment. The thread's minimalism thesis says fewer tools with simpler contracts reduce failure modes. Kun's thesis is that terminal ubiquity, keyboard flow, and multiplexing matter more. The two positions are not mutually exclusive — a minimal tool core can be embedded in a customized terminal — but the terminal stack itself is an argument that the *interaction substrate* is the bottleneck, not the number of tools. See [[the-agent-workflow]] for the agent-agnostic vs. stick-with-one tension.

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

- **Context as a tool output**: The context engine's primary output is curated context — not a file, not an API response, but a distilled package of organizational knowledge. This shifts the tool design question from "how does this tool output information?" to "how does this system select and filter information?" The closest analog in the IDE layer is [[steering-docs|Kiro's steering]] — persistent operational notes surfaced in the system prompt at every turn — which trades tool-design complexity for context-engineering discipline.
- **Conflict resolution as a tool concern**: Where Zanie argues tools should suppress low-confidence signals for humans, a context engine does the opposite: it surfaces unresolved conflicts to the human for guidance, surfacing the tension rather than silently picking a wrong answer. This is tool feedback designed for a post-search world.
- **Personalized retrieval as infrastructure**: Retrieval is no longer a per-tool concern. The context engine knows who you are, what you work on, and who the experts are. This level of personalization can't be achieved by individual tool design — it requires a system that understands the organization's social graph.

### Relationship to Other Layers

The context engine layer interacts with the other four layers:
- **Layer 1 (output optimization)**: The context engine *is* the optimization — it reduces what tools need to output by pre-answering their questions
- **Layer 2 (language/infrastructure)**: The context engine's expert graph and memory storage are themselves infrastructure decisions
- **Layer 3 (minimalism)**: The context engine enables minimal tool cores by pushing context retrieval complexity into a separate system
- **Layer 4 (parallel management)**: Context pre-collection matters more when managing multiple agents — each agent would otherwise independently discover the same organizational knowledge

## Layer 6: The Harness Falls Away

[[thorsten-ball|Thorsten Ball]] (AMP) provides the most radical articulation of this thread's thesis: the harness should fall away like a cast on a healing leg. As models improve, the scaffolding around them becomes unnecessary. Not minimalism as a design choice — minimalism as an inevitability.

He traces this through concrete model generations:
- **Claude 3.5**: Old string/new string replacement. Sometimes wrong when the string appeared multiple times. Needed specialized "smart edit" tools with semantic matching.
- **Claude 3.7**: Understood line numbers. Could navigate files sequentially — "read lines 50-99" became viable. Line numbers no longer confused the model.
- **GPT-5.3/Jules**: Doesn't care about your tools at all. Runs `cat`, writes Python scripts to replace things in files. Just needs a shell.

The implication: language servers are now "uninteresting." The model figures out where the parentheses go. "That's over." Specialized diff formats, semantic edit tools, multiple model chains, intent detection models — all unnecessary when the model can just execute shell commands.

This is a departure from the thread's earlier framing. Where Layer 1 argues tools must be redesigned for agent consumption, Ball argues the best redesign is deletion. Where Layer 3 argues for minimal tool cores, Ball argues the core should approach a single tool: `bash`. The model itself becomes the tool router — it decides whether to use `cat`, `sed`, `grep`, or write a Python script.

The progression Ball describes maps onto the thread's layers collapsing:
- Layer 1 (output optimization) → the model handles its own output formatting
- Layer 2 (language/infrastructure) → the model writes its own infrastructure scripts
- Layer 3 (minimalism) → extreme minimalism: one tool
- Layer 5 (context engine) → the model searches and synthesizes context itself
- Layer 7 (output format) → the model decides the format

What remains after the harness falls away: the [[knowledge-triplet|knowledge triplet]]. Either you know what you want, it's in the codebase, or it's in the training data. If it's none of these, the model fabricates. The human's irreducible contribution is expressing what they know. The harness can't supply that.

> [!warning] Calibration: This Doesn't Apply Everywhere
> Ball's experience is with frontier models (Claude 3.7, GPT-5.3) in a coding context. The [[agent-floor]] study shows that at high planning complexity (tier E, 8-12 steps), all models collapse even with clean tool interfaces. The "harness falls away" thesis holds for tool use at moderate complexity but not for planning at high complexity. The model's planning horizon remains a binding constraint regardless of harness design.

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

## Layer 7: Output Format as Tool Design

[[andrej-karpathy|Karpathy]] and [[thariq|Thariq]] add a dimension the previous layers don't address: **the format in which agents communicate their output** is itself a tool design decision with quality implications.

Karpathy's argument: ~⅓ of the human brain is dedicated to vision processing. When agents output text (or even Markdown), they're using a low-bandwidth channel to a high-bandwidth processor. Asking agents to structure output as HTML doesn't just improve readability — it changes what the model produces, because the richer format unlocks richer output. His progression: raw text → Markdown → HTML → interactive neural video.

Thariq's practical evidence from daily Claude Code usage: Markdown files beyond ~100 lines go unread, and unread agent output is wasted agent output. HTML's visual structure (tabs, collapsibles, diagrams, interactive controls) extends the readable range. More importantly, HTML enables **two-way interaction** — sliders, export buttons, drag-and-drop — turning the output document into a bidirectional interface between human and agent.

This extends Layer 1 (Zanie's output optimization) in a specific direction: Zanie argues tools should optimize what they *emit* for agent consumption. Karpathy and Thariq argue agents should optimize what they *produce* for human consumption — and that HTML is the current best format for that. The two layers are complementary: tools emit structured output for agents, agents emit HTML for humans.

The [[context-engineering|information density]] lens is relevant here: richer visual output may convey more signal per human-read cycle even at higher token cost. The tradeoff is real — HTML takes 2–4× longer to generate and produces noisy version control diffs — but the hypothesis is that the engagement and comprehension gains outweigh the costs.

See [[html-as-agent-output]] for the full treatment.

### Structured Natural Language as a Tool Interface

The [[ears-notation|EARS]] (Easy Approach to Requirements Syntax) format used in [[kiro|Amazon Kiro]]'s spec pipeline is a tool-design move in disguise. By constraining requirements to a machine-parseable pattern (`When <trigger>, the <system> shall <response>`), the requirements artifact becomes a deterministic interface between the LLM and downstream verification tools. The tool design lesson generalizes: **structured natural language inputs can shift verification from probabilistic (LLM-as-judge) to deterministic (parsers, automated reasoners)** without requiring the LLM to be in the loop. This is [[spec-driven-development|Spec-driven development]]'s tool-design contribution: replace the LLM-as-judge verification step with a deterministic pipeline.

[//]: # ([[recursive-agent-harness]] links here from its ## Thread section)

## Sources

- `raw/yt-how-agents-use-dev-tools.md` — Zanie Blue's systematic treatment: feedback qualities, scale effects, output optimization, self-tooling
- `raw/agentic-coding-recommendations.md` — Ronacher on Go, Makefiles, misuse resistance, daemon patterns, speed
- `raw/yt-building-pi-in-a-world-of-slop.md` — Zechner on minimalism, malleability, four-tool core, Terminal-Bench results
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — MCP vs CLI structural analysis, Pi origin story, OpenClaw as hidden coding agent, context transparency
- `raw/slowing-the-fuck-down.md` — Agentic search recall as a fundamental tool limitation; low recall as the root cause of slop.
- `raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md` — Parallel management interface design requirements, agent runtime thresholds as a tool design constraint.
- `raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md` — Context engine as meta-tool: pre-curating context, satisfaction of search, expert graphs, and benchmark results
- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — Harvard AgentFloor study: model capability tier as a tool design constraint; open-weight models matching GPT-5 on tool use tasks at 15× lower cost
- `raw/2603.00822v2.md` — ContextCov (Sharma, 2026): empirical validation of deterministic tool feedback over LLM reflection; fail-closed design; domain-routed code synthesis; PATH shims as lightweight enforcement
- `raw/karpathy-html-output.md` — Karpathy's audio-in/vision-out thesis, output fidelity progression ladder, and the observation that output format constraints shape reasoning quality
- `raw/thariq-unreasonable-effectiveness-of-html.md` — Thariq's practical playbook for HTML agent output: use cases, interactive documents, throwaway editors, and honest tradeoffs from Claude Code usage
- `raw/2605.18747.md` — Ning, Tieu, Fu et al. (2026). Code as Agent Harness survey. Provides a systematic taxonomy of tool use paradigms (§3.3) and positions tool design within the broader harness interface; code-for-acting layer (§2.2) identifies three paradigms corresponding to different levels of agent autonomy over tools; environment-interaction tool use (§3.3.2) is the theoretical foundation for CLI composability
- `raw/yt-llms-are-killing-agent-harness.md` — Thorsten Ball: the harness falls away as models improve; language servers are dead; the model just needs shell access; AMP deleted features as models got better; the knowledge triplet as the irreducible constraint
- `raw/2509.09677.md` — Sinha, Arun, Goel et al. (ICLR 2026). Source for the "Capability Bottleneck Is Partly Execution" departure: isolating execution from planning shows execution horizon improves with model size + RL-trained thinking (§3.1, §3.2) — levers upstream of the tool layer. Bound tool design's reach at the execution ceiling.
- `raw/2512.08296.md` — Kim, Gu, Park et al. (Google Research + DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). Source for the "Tool-Coordination Trade-off in Multi-Agent Systems" extension. §4.3 scaling principles (ε × T interaction β = -0.096, p = 0.002); §4.2 Workbench results (16-tool task, efficiency penalty 2-6.3×, Hybrid collapse); Table 5 coordination metrics (efficiency per architecture).
- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Kun Chen's AXI tools and benchmark: GitHub MCP vs CLI (3× tokens, 2×+ latency), token-efficient non-JSON output (~40% savings), the ten principles for agent-ergonomic tools, and the [[lavish]] HTML artifact editor as another HTML-as-agent-output case.
- `raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md` — [[mario-zechner|Zechner]] on the training-harness-as-tool-reliability-factor: [[pi]]'s strict edit tool showing ~20% failure on newer Anthropic models while [[claude-code|Claude Code]]'s lenient harness masks it. Source for the "Training Harness Is Now a Tool-Reliability Factor" departure; cross-refs [[grammar-constrained-sampling]] and [[harness-monoculture]].
- `raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md` — Lamis Mukta (Anthropic), AI Native DevCon June 2026. Source for the "Memory Store as an Agent-Navigable Tool Surface" extension: memory-as-file-system (markdown + ordinary tools over bespoke memory APIs/vector DBs) as the CLI-over-MCP thesis applied to the memory layer; versioning+provenance as inspectable tool feedback.

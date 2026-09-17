---
title: Tool Design for Agents
created: 2026-04-26
updated: 2026-09-16
sources:
  - raw/perplexity-local-first-agent.md
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
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md
  - raw/yt-code-isnt-free-mario-zechner-hard-truths-coding-ai.md
  - raw/2602.11988v1.md
  - raw/agents-md-standard.md
  - raw/yt-agent-development-lifecycle-101.md
  - raw/2602.17622.md
  - raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
  - raw/2604.15597v1.md
  - raw/2601.20404v1.md
  - raw/yt-stop-reading-code-start-understanding-systems.md
  - raw/create-project-agentsmd-skill.md
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
> This thread argues that minimal tools with clean contracts outperform feature-rich ones. [[dex-horthy|Dex Horthy]] provides a counterexample: he achieves exceptional results with Claude Code — a feature-rich, opinionated tool with thousands of open issues and a complex prompting model. His success doesn't come from tool minimalism but from **deep intuition built over months of intensive use with a single tool** ("one model, one tool and work with it a lot for a month or two"). This suggests that **deep tool familiarity** can compensate for tool complexity, and that the minimalism vs. feature-richness axis may be secondary to the **consistency of use** axis. Both approaches converge on a shared principle: the agent's effectiveness is bounded by how well the human understands the tool's failure modes, not by the tool's feature count.

> [!note] Calibration: Bounded Returns on Interface Quality
> The [[context-files|context-files]] empirical evidence adds a calibration to this thread's thesis that tool quality bounds agent outcomes. Developer-written context files (a well-designed tool interface) improve performance by only ~4% over none. LLM-generated files (a poorly-designed interface) degrade it by ~0.5–2% depending on benchmark (3% on average across settings). The effect is real but bounded — past a minimal quality threshold, further tool interface refinement yields diminishing returns. This complements the AgentFloor finding that task decomposition and [[model-routing|model routing]] may be higher-leverage interventions than tool design alone. The thesis is correct but its leverage is concentrated at the floor (preventing bad tools) rather than at the ceiling (perfecting good ones).

> [!note] Extension: Tool-Coordination Trade-off in Multi-Agent Systems
> The [[scaling-agent-systems|Kim et al. scaling study]] (260 configurations, 6 benchmarks, 3 LLM families) identifies a [[tool-coordination-trade-off|tool-coordination trade-off]] (β = -0.096, p = 0.002): tool-heavy tasks suffer disproportionately from multi-agent coordination overhead. The mechanism is token budget fragmentation — MAS splits the token budget across agents, leaving insufficient capacity for complex tool orchestration. Averaged across the study's benchmarks, per-architecture efficiency penalties relative to single-agent systems range from 2× (Independent) to 6.3× (Hybrid) — global architecture averages (Table 5), not Workbench-specific figures. On the 16-tool Workbench task itself, Hybrid's penalty was only −1.2% (marginal); the paper's efficiency-collapse case is PlanCraft. This reinforces the thread's thesis that tools are the bottleneck: for single agents, the bottleneck is interface design; for multi-agent systems, the bottleneck is token budget fragmentation across agents that each need to reason about the same tool surface. The trade-off also sharpens the thread's tool-design guidance: minimal, composable tools are not just a design preference — they are a necessity for multi-agent coordination to remain viable. §4.3 scaling principles (ε × T interaction); §4.2 Workbench results (Hybrid −1.2%, marginal; collapse case is PlanCraft).

> [!note] Departure: The Harness Interface Taxonomy
> The [[code-as-agent-harness]] survey (Ning et al., 2026) provides a systematic taxonomy that subsumes this thread's tool categories. The survey organizes tool use within [[harness-mechanisms|harness mechanisms]] (§3.3) and identifies three acting paradigms within the code-for-acting layer (§2.2) — grounded skill selection, programmatic policy generation, and lifelong code-based agents — that correspond to different levels of agent autonomy over tools. The environment-interaction tool use paradigm (§3.3.2) — where the agent writes scripts rather than calling bound tools — is the theoretical foundation for why CLI composability outperforms MCP for developer-facing tools. The survey's key framing: the tool interface is one component of the broader **[[harness-interface|harness interface]]**, which also includes code for reasoning and code for environment modeling.

> [!note] Departure: The Training Harness Is Now a Tool-Reliability Factor
> This thread argues that tool reliability is bounded by tool design (interface contracts, output formats, minimalism). [[mario-zechner|Mario Zechner]] identifies an independent variable the thread did not account for: **the harness the model was RL-trained on.** A perfectly-designed, strict tool — [[pi]]'s edit tool, which validates tool calls against their schema — surfaces failures on up to ~20% of edits in a poisoned session state on newer Anthropic models, because those models were (hypothesized) trained against [[claude-code|Claude Code]]'s lenient harness and never received a negative signal for emitting malformed calls. The defect is invisible to Claude Code (lenient) and fatal to Pi (strict). See [[grammar-constrained-sampling]] for the decoding-level mechanism and [[harness-monoculture]] for the ecosystem thesis: training on one dominant lenient harness propagates as (a) tool-call corruption in stricter harnesses, (b) spec pollution (third parties must accept the dominant harness's slop), (c) capability regression off the trained path, and (d) custom-tool ([[mcp|MCP]]) invocation share loss. Tool design is still necessary — clean interfaces still bound the failure surface — but it is no longer sufficient: a tool's observed reliability now depends on whether its strictness matches the leniency the model was trained to expect.
>
> The cost data makes the monoculture concrete: [[peter-steinberger|Peter Steinberger]]'s OpenClaw (an application of [[pi|Pi]]) burns ~$1.3M/month in tokens on a team of three — the empirical ceiling for token-maxing monoculture in mid-2026. Meanwhile, Antirez's `ds4` inference engine (C, custom DeepSeek V4) runs on a 128GB laptop and "could probably handle 60 to 70% of the issues" Pi handles with frontier models. The open-weight direction is the anti-monoculture escape: local inference on cheap hardware sidesteps both the lenient-harness lock-in and the token-seller incentive structure. See [[yolo-mode-philosophy]] for Pi's refusal to ship incomplete security half-measures — the sharpest counter-position to monoculture-driven tool design.

> [!note] Departure: tooling fixes the floor; difficulty-aware control addresses the chain
> Deng et al. (2026) make the boundary concrete in penetration testing. Their typed Tool and Skill Layer improves short-horizon capability-limited tasks, but the larger gains on multi-step machines come from Task Difficulty Assessment, external attack-tree search, branch pruning, and explicit state. This qualifies the thread's “tool is the bottleneck” thesis: the tool layer is a necessary floor, while a controller that estimates tractability becomes the binding layer as the task's attack graph grows. See [[difficulty-aware-agent-planning]] and [[pentestgpt-v2]].

> [!note] Departure: The Harness Layer Moves Cost, Not Correctness
> The thread's strongest practitioner claims — Zechner's four-tool minimalism, the CLI-over-MCP economics — are now joined by a controlled measurement: the [[harness-tax|HarnessTax]] study (Pan et al., UC Berkeley + Arena, Sept 2026) ran 21 model–harness pairs (7 models × [[pi|Pi]] / Codex CLI / [[claude-code|Claude Code]]) on SWE-bench Lite and Terminal-Bench 2.0 and found the average harness effect on task success stays within about ±2% / about ±5%, while cost varies up to 5× for the same model (GPT-5.6 Luna: $0.030 in Pi vs $0.15 in Claude Code). Pi reached the cost-success Pareto frontier on both benchmarks with its four tools — a controlled confirmation of Layer 3's minimalism thesis — and Claude Code's mean initial context was over 10× Pi's: the [[harness-tax|harness tax]] can begin with the first model call (total spending also depends on caching, generated tokens, and later calls), the mechanism behind Kun Chen's 3×-token MCP result scaled up to whole harnesses. The reading for this thread: the tool/harness layer is the bottleneck twice over — it bounds the failure surface (the thread's thesis) and silently multiplies cost (the tax) — but among *existing* harnesses it is approximately a cost decision, not a capability one. The study also corroborates Layer 6 with the same boundary condition it already carries: agents are interfaces to model intelligence for day-to-day tasks and should prioritize cost efficiency and reliability, while structured harnesses retain value at the boundary of a model's capabilities. See [[harness-tax]] for the off-the-shelf-vs-engineered reconciliation with [[self-harness]]/[[harnessx]] gains.

## The Core Thesis

The wiki already has the [[the-agent-workflow|workflow]] and [[the-human-lever|human role]] threads. This thread covers the **third leg**: the tools themselves. The argument breaks into three layers that reinforce each other:

1. **Tools must change because the consumer changed.** Agents don't have intuition, fatigue, or the ability to skim. They need deterministic, structured feedback.
2. **Language and infrastructure are tooling decisions.** Choosing Go over Python, a Makefile over an MCP server — these are tool design choices that directly affect agent performance.
3. **Minimalism beats feature richness.** Fewer, composable tools with clear contracts outperform feature-rich ones because they reduce the failure surface for the LLM.

> [!note] Extension: Queryable Traces as Agent Tooling
> [[vibv|Vibv]] (Boundary ML) argues that observability infrastructure is itself agent tooling: traces must be **queryable by agents**, not just visualizable for humans. Type-safe trace queries (`find everything where latency > 1s and the prompt contained "generate image"`) turn traces into machine-readable data the agent can introspect — the agent is a primary consumer of its own execution history, not just a viewer. This is Layer-1 interface design applied to the observability surface, and it sharpens the thesis that "tools must change because the consumer changed." See [[tracing-spectrum]] for the full treatment.

## Layer 1: Redesigning the Interface Contract

[[zanie-blue|Zanie Blue]] (Astral) provides the most systematic treatment. She identifies four qualities tools provide to agents — correctness, quality, efficiency, and safety — and argues that each one requires different design when the consumer is an agent rather than a human.

### Output Optimization
Today's tools output for humans: verbose diagnostics, interactive TUIs, color-coded terminals. Agents need none of this. What they need:

- **Context reduction built in**: The tool itself is best positioned to decide what's essential. Raw JSON isn't enough — it can be more verbose than human-readable output. The tool should return the minimal actionable signal and persist the rest to a file the agent can opt into reading.
- **Agent Experience as a design dimension**: The same design principles apply to how agents navigate codebases and tool outputs — [[agent-experience|AX]] extends from code structure to tool interfaces, and well-designed tools reduce the cognitive load on the consuming agent just as they would for a human.
- **Machine-parseable confidence levels**: Human-facing linters suppress low-confidence findings to avoid fatigue. Agents don't fatigue. They should receive more signals, including low-confidence ones, and decide for themselves whether to act.
- **Restrictive trust models**: Escape hatches designed for humans — suppressors like `noqa`, plus `--no-verify`/`--force`-style flags (the wiki's examples) — may enable bad agent behavior. The default for agents should be more constrained, not less.

### The Scale Effect
Agents make it trivially easy to go from one agent to a hundred and back to zero. This means a 10-person team suddenly faces the problems of a 100-engineer organization: concurrency, git worktrees, reproducible environments, dependency management (the itemized list is the wiki's gloss on Zanie's scale argument). Tools designed for individual human use become insufficient at agent scale. (The closing framing — that as inference gets faster, tools rather than model intelligence become the bottleneck — is likewise the wiki's gloss; the filed stub makes the scale argument without it.)

### Plugin Extensibility and Self-Tooling
Research shows agents that construct their own tools outperform those with pre-built harnesses. The [[context-files|context file]] research by [[thibaud-gloaguen|Gloaguen et al.]] and [[christoph-treude|Lulla et al.]] (2026) provides empirical evidence for this: agents given well-designed [[context-files|context files]] (AGENTS.md, CLAUDE.md) behave differently — they follow instructions faithfully, explore more, and test more — but the quality of the tool interface (the context file itself) determines whether this behavioral change improves or degrades performance. [[martin-vechev|Vechev]]'s lab at ETH Zurich produced the rigorous evaluation framework. This isn't theoretical — [[malleable-agents|agents that can modify their own tools]] are already emerging. Plugin extensibility becomes higher priority than it ever was for human-only use: an agent defining custom lint rules to prevent its own future mistakes is a form of agent memory. Language servers need re-prioritization too — autocomplete is high-effort but largely irrelevant to agents, while rename/find-references is genuinely valuable. The LSP protocol itself may not be the right abstraction for agents; new protocols may be needed.

## Layer 2: Language and Infrastructure as Tooling

[[armin-ronacher|Armin Ronacher]] argues that, if you can choose your language, Go is his strong recommendation for agent workflows, and that infrastructure design (Makefiles, process managers, logging) is as important as the code itself.

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
2. **Inherent non-composability**: Combining outputs from two different MCP servers requires the model to do data transformation through context. Compare with CLI pipes — the model sees only the end result and is free to massage data. Code mode is essentially admitting MCP can't compose by itself.
3. **Auth as the valid use case**: David from Sentry is a big MCP proponent because of auth. Mario acknowledges this is genuinely useful for enterprises but hopes for an "MCP 2" based on auth specs + code execution rather than context-heavy tool calls.

### Armin's Nuanced Position

Armin sees MCP as a victim of its own success. It started as a consumer-side solution (connect email, OneDrive to chat apps), then IDEs adopted it, then developers tried to use it for complex tooling — a use case it wasn't designed for. His key observation: **the most capable personal agents (OpenClaw) are just coding agents hidden from users**. When a non-technical user asks how to do something, the model doesn't say "install this MCP server" — it says "I'll write a Python script that does it." Code execution won naturally.

Both agree: for developer-facing agent tools, CLI composability (pipes, scripts) outperforms MCP's context-transit model. But MCP has a legitimate enterprise niche (auth, consumer integrations) that won't go away.

### Kun's Efficiency Argument

[[kun-chen|Kun Chen]] adds a quantitative angle to the CLI-over-MCP case. His [[axi]] benchmark of GitHub access for agents found the GitHub MCP server cost **3× more tokens and more than 2× the latency** than the `gh` CLI for the same tasks, with no clear benefit. He also reports that a token-efficient non-JSON output format can save ~40% tokens compared to JSON. The practical upshot: tool choice is not just an aesthetic preference; it is a first-class workflow cost variable.

> [!note] Extension: The Memory Store as an Agent-Navigable Tool Surface (Dreaming)
> [[dreaming]] ([[lamis-mukta|Mukta]], Anthropic, AI Native DevCon June 2026) extends this thread's CLI-over-MCP / minimalism thesis to the memory layer. Anthropic's perceived state of the art for agent memory is **memory as a file system** — markdown files read/written/searched with ordinary tools (bash, grep) rather than bespoke memory-tool APIs or opaque vector databases. The memory store is itself an agent- and human-navigable tool surface, and Mukta's year-long path to it (CLAUDE.md → memory tools → skills → file-system-as-memory) is the same "shed unnecessary opinion about the tool surface" arc this thread tracks for dev tools. Dreaming's versioning + transcript provenance is, correspondingly, inspectable tool feedback — the [[contextcov|ContextCov]] pattern (deterministic, reviewable checks) applied to memory mutation rather than code.

> [!note] Extension: The Virtual File System — Keep the Interface, Swap the Store
> [[harrison-chase|Harrison Chase]] (LangChain, 2026) gives the interface-first thesis a deployment-layer form: the [[virtual-file-system|virtual file system]] keeps the file-system *interface* (read, write, edit, glob, grep, ls) while freeing the *store* — context lives in a database, S3, Box, or Notion, exposed to the agent as a filesystem it already knows how to use. Deep Agents' backend interface is six methods: `read`, `write`, `edit`, `glob`, `grep`, `ls`. The design decision is pure tool-design-for-agents: the agent's fluency with filesystem tools is the scarce capability, so the tool surface adapts to the agent rather than the agent adapting to a new API. This is the same "shed unnecessary opinion about the tool surface" arc as Mukta's file-system-as-memory, but applied to the store rather than the interface.

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

The tool-design relevance of context engineering goes deeper than density. [[dex-horthy|Dex Horthy]]'s root definition frames context engineering as **deabstracting** the abstractions layered on top of the model — RAG, memory, agentic history, structured output are "all different ways to pass tokens into a model." He splits the problem into two budgets most builders conflate: an **information budget** (which facts to include) and an **instruction budget** (how many directives the model can follow before attention spreads too thin — roughly 150–250). The instruction-budget limit is the mechanism behind [[instruction-severity-inflation]] and a direct constraint on tool design: every tool that injects instructions into the context window competes for the same finite attention budget. Minimalist tools don't just reduce failure surface — they preserve the instruction budget for the instructions that matter.

This is distinct from the tool design layers above. Where Zanie focuses on individual tool output, Armin on language/infrastructure, Mario on minimalism, and Louis on parallel management, the context engine addresses a *pre-processing* concern: **what context should the agent even see before it starts calling tools?**

### Why It's a Tool Design Problem

Unblocked's presenters' key insight: agents spend ~90% of execution time collecting context, not writing code. The context collection phase is dominated by tool calls — searching Slack, reading docs, grepping code. A context engine is a tool that pre-emptively answers those searches so the agent doesn't need to make them:

| Without context engine | With context engine |
|---|---|
| Agent searches multiple different sources | Context engine pre-collects the relevant context |
| Agent finds plausible but wrong information | Context engine surfaces unresolved conflicts instead of silently resolving them |
| Agent misses organizational history | Context engine distills historical decisions as memories |
| 2.5 hours, 21M tokens | 25 minutes, 10M tokens |

(Werry himself flags these numbers as illustrative.)

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
| PATH shims for command interception | Zanie: escape hatches designed for humans may enable bad agent behavior — ContextCov's shims have no escape hatch for the agent | ✓ |
| Domain-routed code synthesis (separate generators for process/source/architectural checks) | Zanie: specialized feedback qualities — process=correctness, source=quality, architectural=safety/efficiency | ✓ |
| Fail-closed interpretation of ambiguous instructions | Mario: restrictive trust models — the agent should be more constrained, not less | ✓ |
| Generated checks stored as editable JSON files for human review | Zanie: tools should return the minimal actionable signal — checks are inspectable Python code | ✓ |
| Tree-sitter for static analysis vs LLM-based linting | Armin: fast, deterministic feedback keeps the agent loop tight | ✓ |

ContextCov's evaluation provides empirical weight the thread previously lacked. The tool-design thesis — that better agent-facing tools produce better outcomes — now has a controlled experiment showing 21.3 percentage point improvement from deterministic tool feedback over passive instructions, and 38 points over LLM-based feedback.

### Context Files: From Passive to Executable

The [[context-files]] concept adds empirical depth to ContextCov's framing. Two concurrent studies (Gloaguen et al. and Lulla et al., 2026) evaluated context file effectiveness and found a productive tension: developer-written context files improve performance by ~4% on average (Gloaguen), while LLM-generated `/init` dumps degrade it by ~0.5–2% depending on benchmark (3% on average across settings) and increase costs by >20% (also Gloaguen). The key explanation is **redundancy**: when the codebase already has good documentation, context files add noise, not signal. When all other docs are removed, those same `/init` files *improve* performance by 2.7% — the degradation tracks with duplication, not generation as such.

The tool-design implication for this thread: context files are tool interfaces for agents, and their quality follows the same principles as any other tool. Minimalism, operational focus, and human authoring outperform verbose auto-generated alternatives. The [[agents-md]] convention's guidance — encode stable reference facts, cut volatile implementation detail, keep the file under 200 lines — is exactly this, arrived at from practice. Three independent paths (Ralph Loop practice, Gloaguen empirical testing, context-engineering theory) converge on the same conclusion.

## Layer 7: Output Format as Tool Design

[[andrej-karpathy|Karpathy]] and [[thariq|Thariq]] add a dimension the previous layers don't address: **the format in which agents communicate their output** is itself a tool design decision with quality implications.

Karpathy's argument: ~⅓ of the human brain is dedicated to vision processing. When agents output text (or even Markdown), they're using a low-bandwidth channel to a high-bandwidth processor. His progression: raw text → Markdown → HTML → interactive neural video. (The stronger claim often run together with Karpathy's — that richer output formats don't just improve readability but change what the model produces, i.e. constraints on output format are constraints on reasoning — comes from David Williams's reply on Karpathy's original thread, not from Karpathy himself.)

Thariq's practical evidence from daily Claude Code usage: Markdown files beyond ~100 lines go unread, and unread agent output is wasted agent output. HTML's visual structure (tabs, collapsibles, diagrams, interactive controls) extends the readable range. More importantly, HTML enables **two-way interaction** — sliders, export buttons, drag-and-drop — turning the output document into a bidirectional interface between human and agent.

This extends Layer 1 (Zanie's output optimization) in a specific direction: Zanie argues tools should optimize what they *emit* for agent consumption. Karpathy and Thariq argue agents should optimize what they *produce* for human consumption — and that HTML is the current best format for that. The two layers are complementary: tools emit structured output for agents, agents emit HTML for humans.

The [[context-engineering|information density]] lens is relevant here: richer visual output may convey more signal per human-read cycle even at higher token cost. The tradeoff is real — HTML takes 2–4× longer to generate and produces noisy version control diffs — but the hypothesis is that the engagement and comprehension gains outweigh the costs.

See [[html-as-agent-output]] for the full treatment.

### Structured Natural Language as a Tool Interface

For the tool-design reading of structured requirements formats — spec-driven pipelines like [[kiro|Amazon Kiro]]'s use [[ears-notation|EARS]] to shift verification from probabilistic (LLM-as-judge) to deterministic (parsers, automated reasoners) — see [[kiro]], [[ears-notation]], and [[property-based-testing-as-spec]]. This thread's listed sources do not cover those systems directly; the linked pages carry the sourced treatment.

> [!note] Departure: Spec-Driven Development Doesn't Generalize
> [[dex-horthy|Dex Horthy]] is markedly more skeptical of SDD than the EARS/Kiro position suggests. His verdict: outside maintenance and migration work, spec-driven development "didn't really work." The intractable problem is the two-sources-of-truth drift — edit the spec, edit the code, and they diverge; a Spec Kit GitHub issue complaining about exactly this has been open for a year. He has never known a team to find maintaining spec/code parity worth the effort. His alternative: treat planning docs as [[plan-disposability|disposable tactical artifacts]] and treat the code as the only durable source of truth. This tensions the Layer 7 framing of EARS as a tool design move — the structured format may be sound, but the spec-as-primary-artifact workflow it enables may not survive contact with real codebases.

[//]: # ([[recursive-agent-harness]] links here from its ## Thread section)

## Layer 8: Local-First Harness Design — Building for a 100K Effective Window

[[perplexity-computer|Perplexity Computer]] (Aug 2026) is the first local-first harness the wiki has filed that is explicitly co-designed around a small model's constraints, and it sharpens every claim in this thread into a set of concrete engineering defaults.

**The constraint.** Qwen 3.8 27B advertises 260K tokens but Perplexity finds it "begins to struggle beyond 100K." That gap between nominal and effective context is the binding constraint. The harness responds by treating the instruction budget as a scarce resource — every tool definition competes for the same 100K, so the design task is to spend it only on what is load-bearing right now.

**Four design moves that follow from the constraint.**

1. **Succinct core + on-demand [[agent-skills|skills]]** — a minimal system prompt and small core tool set, with all other capabilities (research, data science, visualization, document creation, software engineering) modularized into skills that load and unload during the trajectory. This is [[context-engineering|context engineering]]'s progressive-disclosure pattern applied to the harness itself; the skill is the tier-2 mechanism that keeps the core lean.
2. **[[context-engineering|Context compaction]]** — summarizing stale context when a trajectory grows long so the model stays within its effective window, not its nominal one.
3. **Compact CLI tools instead of MCP servers** — connectors (Gmail, GitHub, Outlook, Calendar) are conventionally exposed as MCP servers whose large tool definitions consume a substantial share of context. Perplexity converts the most-used MCPs into compact CLI tools supplemented with custom skills. The thesis is the same as this thread's CLI-over-MCP argument (Kun Chen: 3× tokens, 2× latency for MCP), but the local-first version is stronger: on a 100K budget, MCP overhead doesn't just cost money — it crowds out reasoning.
4. **Verification hooks** — the agent verifies its own work, either self-triggered or via hooks that monitor trajectory health and request self-verification when something goes wrong. Verification adds steps but "substantially narrows the gap to frontier models," making the tool-design lesson that deterministic verification is the cheap way to buy quality back from a weaker model.

**A security default that inverts [[pi|Pi]]'s.** Perplexity's harness executes every tool in an OS-level sandbox that restricts processes, filesystem paths, and network per policy. If the sandbox is unavailable, the harness disables itself rather than degrading to unsandboxed execution — fail-closed, always on, no configuration. This is the inverse of [[pi|Pi]]'s [[yolo-mode-philosophy|YOLO mode]] (no permission gates by default; push security to the container boundary). The local-first argument is that on a device that holds private documents, fail-open is not an acceptable fallback. See [[local-first-agent]] for the full pattern.

**The execution loop as a privacy boundary.** The orchestrator is deterministic harness code, not an LLM: it maintains the loop, assembles context, and enforces policy; the local model proposes the next action; the orchestrator executes approved calls in the sandbox and returns results. Web search, connectors, and advisor calls cross the device boundary only when enabled and approved — the same boundary discipline the [[harness-engineering]] and [[harnessx]] sections advocate, but with the added invariant that the boundary is a privacy boundary.

**Empirical anchor.** With the same Qwen 3.8 27B on the same DGX Spark hardware (isolating harness, not model), Perplexity Computer outscores Pi and Hermes on every reported bench: BrowseComp 66.7% vs 50.2% vs 43.9% (402s/852K vs 826s/2.82M vs 1,021s/1.01M tokens), ParseBench-100 65.1% vs 13.9% vs 34.6% (60.6s/20.1K vs 410.5s/829.1K vs 108.3s/32.1K), Local Knowledge Work Bench 82.6% vs 77.6% vs 74.0% (PPLX 27B lifts Computer to 85.4%). Among the three benches that report efficiency, Computer is fastest on two and most token-efficient on all three — the succinct-core + skill-modularization + CLI-tooling thesis has a measured cost edge, not just a cleanliness one.

> [!note] Departure: The Local-First Caveat on Search
> BrowseComp confounds harness and search backend (Perplexity Search via Search as Code vs Brave for Pi/Hermes), so the 16-point lead on that bench mixes two variables. ParseBench-100 and LKWB — where the task is document understanding and private knowledge work — isolate the harness more cleanly.

## The Economics: Tool Design as Cost Control

[[david-cramer|David Cramer]] adds an economics dimension that strengthens the thread's thesis from a different direction. His argument: training data is part of inference cost, and it's not factored into current pricing. "If a model has not been heavily trained on a thing, models will only give you the right answer if you give them the right answer first." The web crawler analogy: the wrong way is to have an LLM parse every page; the right way is to have an LLM generate a script when pages change, then run that script. Efficiency comes from deterministic reuse, not repeated inference.

This connects to tool design directly: if the knowledge isn't in the training set, you must supply it in context — and every tool that produces verbose output, every protocol that adds overhead, every harness that forces the agent to rediscover context it already found once is a direct cost multiplier. "I think training is part of the cost of inference and it's not factored in the cost of inference today. Thus, the cost of inference is dramatically higher than we are led to believe."

The [[harness-monoculture]] cost data makes this concrete: OpenClaw's ~$1.3M/month token burn (API pricing) is the empirical ceiling of the token-maxing direction. When frontier model companies go public and have to pay the bills, tool design becomes not just a quality concern but a survival concern — every token of unnecessary tool overhead is real money.

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
- `raw/2512.08296.md` — Kim, Gu, Park et al. (Google Research + DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). Source for the "Tool-Coordination Trade-off in Multi-Agent Systems" extension. §4.3 scaling principles (ε × T interaction β = -0.096, p = 0.002) and the 2–6.3× efficiency-penalty range as global per-architecture averages (Table 5); §4.2 Workbench results (Hybrid −1.2%, marginal; the paper's collapse case is PlanCraft).
- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Kun Chen's AXI tools and benchmark: GitHub MCP vs CLI (3× tokens, 2×+ latency), token-efficient non-JSON output (~40% savings), the ten principles for agent-ergonomic tools, and the [[lavish]] HTML artifact editor as another HTML-as-agent-output case.
- `raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md` — [[mario-zechner|Zechner]] on the training-harness-as-tool-reliability-factor: [[pi]]'s strict edit tool showing ~20% failure on newer Anthropic models while [[claude-code|Claude Code]]'s lenient harness masks it. Source for the "Training Harness Is Now a Tool-Reliability Factor" departure; cross-refs [[grammar-constrained-sampling]] and [[harness-monoculture]].
- `raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md` — Lamis Mukta (Anthropic), AI Native DevCon June 2026. Source for the "Memory Store as an Agent-Navigable Tool Surface" extension: memory-as-file-system (markdown + ordinary tools over bespoke memory APIs/vector DBs) as the CLI-over-MCP thesis applied to the memory layer; versioning+provenance as inspectable tool feedback.
- `raw/yt-context-engineering-with-dex-horthy.md` — Dex Horthy's Pragmatic Engineer interview. Source for the two-budget framework (information vs instruction, 150–250 instruction limit), the cost-stage model (make-it-run/make-it-right/make-it-fast), and the deabstracting root definition.
- `raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md` — Cramer on training data as inference cost, the web crawler efficiency analogy, and tool design as cost control.
- `raw/yt-code-isnt-free-mario-zechner-hard-truths-coding-ai.md` — Empirical anchors for harness monoculture: OpenClaw $1.3M/month token burn, Antirez's ds4 open-weight alternative, token-pricing trajectory suspicion.
- `raw/2602.11988v1.md` — Gloaguen et al. (2026). Context file evaluation: LLM-generated files degrade performance via redundancy, developer-written files marginal improvement (~4%), context files as tool interfaces for agents.
- `raw/agents-md-standard.md` — The agents.md/ site: the convention's rationale, minimal format, nested-file discovery, cross-agent compatibility, Linux Foundation stewardship.
- `raw/yt-agent-development-lifecycle-101.md` — [[harrison-chase|Chase]] (LangChain, 2026): the build-stage abstraction taxonomy (frameworks vs. runtimes vs. harnesses), no-code agents as markdown files, and the virtual file system pattern with its six-method backend interface. Source for the "Virtual File System" extension.
- `raw/2602.17622.md` — Deng et al. (arXiv:2602.17622v1, 19 Feb 2026). Type A capability gaps versus Type B complexity barriers (§3.2); Tool and Skill Layer, TDA-EGATS, and Memory Subsystem (§4); component ablations (§5.3). Source for the departure that tool quality fixes the capability floor while difficulty-aware control handles long attack chains.
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — [[dex-horthy|Dex Horthy]] (Chroma Context Engineering episode, 2026). Sole source for the "Feature-Rich vs. Minimal, Both Can Work" departure details: "one model, one tool and work with it a lot for a month or two" ([10:41]–[10:44]) and the ~6,000 open Claude Code issues ([40:56]) grounding the deep-familiarity-over-complexity argument.
- `raw/2604.15597v1.md` — Laban et al. (2026). *DELEGATE-52.* Source for the "Tool Use Can Harm" departure: four LLMs with file tools performed worse than without (average 6% additional degradation, 2–5× more input tokens, whole-file regeneration over targeted edits).
- `raw/2601.20404v1.md` — Lulla et al. (2026). The efficiency-side context-file study of the "two concurrent studies" pairing: developer-written AGENTS.md files reduce median runtime (~28.64%) and output tokens (~16.58%) on small-scope PRs.
- `raw/yt-stop-reading-code-start-understanding-systems.md` — [[vibv|Vibv]] (Boundary ML). Source for the "Queryable Traces as Agent Tooling" extension: traces must be queryable by agents, type-safe trace queries, the agent as a consumer of its own execution history.
- `raw/create-project-agentsmd-skill.md` — The AGENTS.md authoring skill. Source for the convention guidance gloss (stable reference facts over volatile implementation detail, length discipline) in the Context Files subsection.
- `raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md` — Pan, Yang, Arabzadeh, Chiang, Stoica, Zaharia (UC Berkeley + Arena, 2026). Source for the "Harness Layer Moves Cost, Not Correctness" departure: 21 model–harness pairs, ±2%/±5% success bounds, up-to-5× cost spread, Pi on the Pareto frontier with four tools, Claude Code's >10× initial context, and the day-to-day-vs-boundary harness split from the Ending Notes.
- `raw/perplexity-local-first-agent.md` — Perplexity (Aug 2026). Source for the new "Local-First Harness Design" section: succinct core + on-demand skills + context compaction for a 100K effective window (vs 260K nominal), compact CLI tools instead of MCP servers, verification hooks, always-on OS-level sandbox (fail-closed vs Pi's YOLO mode), deterministic orchestrator as privacy boundary, and the three-bench harness-isolation results (BrowseComp 66.7% vs 50.2/43.9%, ParseBench-100 65.1% vs 13.9/34.6%, LKWB 82.6% vs 77.6/74.0% and PPLX 27B 85.4%).

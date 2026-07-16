---
title: Dreaming
created: 2026-07-14
updated: 2026-07-15
sources:
  - raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md
unaudited_marginal: 0
tags: [concept, memory, memory-consolidation, continual-learning, out-of-band, agent-memory, context-engineering, evolving-context]
---

# Dreaming

> Anthropic's name for an **out-of-band memory consolidation** process: a batch, asynchronous job in which an orchestrator deploys subject agents to review a fleet's session transcripts against the current memory store, identify recurring failure patterns, and propose evidence-backed changes (add missing knowledge, fix stale entries, cut irrelevance) for a human to accept or reject. It is the engineering instantiation of the biological sleep/consolidation analogy — memory written *in-band* during sessions gets reviewed and reorganized *out-of-band*, outside any agent's working session. Introduced by Anthropic; its production architecture was described by [[lamis-mukta]] at AI Native DevCon (June 2026).

## The Architectural Distinction: In-Band vs Out-of-Band Memory

The talk's load-bearing insight is a *temporal* split in how agent memory is maintained. Most existing wiki memory work — [[evolving-context]], [[memrefine]], [[evomem]], the module-U maintenance of [[agent-memory-systems]] — is **in-band**: the agent reads and writes memory during its own working session, competing for the same context window, tokens, and attention budget as the task it was asked to do.

**In-band memory** is Anthropic's perceived state of the art as of mid-2026: model the memory system as a file system, fill it with markdown, and let agents read/write/search it with ordinary tools (bash, grep) rather than bespoke memory-tool APIs. It works — the *next* session gets better because the agent that just ran wrote down what it learned — but Mukta names two structural limits:

1. **Split focus and resources.** The agent must simultaneously complete its task *and* curate memory for a future version of itself. This is a hard optimization problem: how much of the token/context/latency budget goes to memory curation versus the actual deliverable? Every token spent remembering is a token not spent doing.
2. **Visibility limitation.** A single agent sees only its own session. It cannot detect patterns that repeat *across* sessions, nor failures other agents in the fleet hit. This is why an agent "keeps making the same mistake over sessions" — each session is a fresh context window with no view of the fleet's collective failures. Stale or maliciously-injected memories go uncaught because no process surveys them.

**Out-of-band memory (dreaming)** removes both limits by making memory maintenance a *separate* process with its own allocated compute:

- **Dedicated capacity** — its own token spend, not stolen from task execution.
- **Fleet-wide visibility** — it reads *many* transcripts, not just one session.
- **Asynchronous** — it runs in batch, on a cadence, off the user's critical path.

The two run in parallel. In-band writes give fast next-session improvement; out-of-band dreaming gives slower but deeper, fleet-aware consolidation that no single session could see.

## The Dreaming Architecture

Mukta describes the production design behind Anthropic's memory infrastructure for managed agents:

1. **Inputs.** A memory store (a collection of memory files) plus a batch of session transcripts over a period — the full back-and-forth *and* the metadata (tool calls, skills used, errors). Tool-call metadata is central: the highest-signal failures often live in repeated tool errors, not in the conversational text.
2. **Orchestrator + subjects.** An orchestrator deploys a fleet of subject agents that each analyze transcripts against the memory store, looking for "uplift" — places where a memory change would have prevented a failure.
3. **Steering.** The operator steers the subjects: tells them what counts as important/relevant for *this* organization and what doesn't. Memory curation is org-specific, not generic.
4. **Propose, with evidence.** The orchestrator aggregates the subjects' findings, decides which patterns are prevalent enough to warrant a change, and proposes individual edits to the memory store — each accompanied by the transcripts where the pattern occurred and statistics on its prevalence. This is the [[evomem]]-style "propose + evidence" discipline lifted to the fleet level.
5. **Human-in-the-loop accept/reject.** A human reviews proposed changes and accepts or rejects them. Dreaming proposes; the human (or a governed policy) disposes.

## The School Analogy

Mukta's motivating analogy: a school with many students (agents) submitting work, plus teachers and a head teacher who review everything. Two real-world properties make it effective, and both transfer:

- **Dedicated capacity for learning.** Some individuals have the *job* of helping others learn — not of doing the students' work for them.
- **Fleet visibility.** The head teacher sees *all* students' work and can spot patterns no single student or classroom teacher would see (e.g., every geography student answering one question wrong → an entire topic missing from the curriculum).

Concrete examples from the talk:

- **Missing knowledge** — every agent fails a class of task identically; dreaming notices the topic is absent from the memory store and proposes adding it.
- **Tool misconfiguration** — the "radians vs. degrees" failure: dreaming scrutinizes tool-call metadata, sees a tool call failing the same way across sessions, and proposes a configuration instruction. The signal is in the tool-call metadata, not the chat text.
- **Fleet/org-wide norms** — a style or behavior the org wants across all agents; dreaming proposes an org-wide context addition.

## Production Guardrails

In-band autonomous memory is dangerous at fleet scale. Mukta enumerates the guardrails Anthropic bakes in — the engineering practices that make autonomous memory safe enough to deploy across thousands of collaborating agents. These are mostly the maintenance module (U) of [[agent-memory-systems]] hardened for concurrency and abuse:

| Principle | What it enforces |
|---|---|
| **Versioning** | Store every memory version; track *which session/transcript* an update was based on and *which agent/human* made it. Enables rollback when an update turns out bad. |
| **Concurrency** | Optimistic locking via hashing: an agent hashes the memory before drafting its edit, hashes again before committing; if the hashes differ, another agent wrote in the meantime, so it re-reads and retries. This is how thousands of agents share one store without clobbering each other. |
| **Permissions** | A tiered ACL: org-wide knowledge is typically read-only to individual agents; an agent's own scratchpad is read-write. No single agent decides to rewrite the org-wide context. |
| **Portability** | A clean API so the curated memory — a high-value, effort-intensive artifact — is accessible across product surfaces and systems, not locked into one. |

Concurrency and versioning also compose with dreaming's own permission model: when a dreaming job is triggered, the operator selects *which* transcripts to attach, so the job can be scoped to the same permission set as the memory store it reviews.

> [!note] Departure: "Are we reinventing databases?" A Q&A audience member observes that versioning, concurrency, permissions, and portability are exactly the concerns database systems solved decades ago. Mukta frames the work as *threading the needle* between autonomous agent action and deterministic programmatic primitives: as signal accumulates about which primitives work, they get codified into the harness deterministically (the hashing, the versioning) rather than left to agent discretion — so memory systems are indeed "merging back into" classical software-engineering practices, but in a form autonomous agents can interact with. The wiki's read: this is the harness absorbing [[agent-memory-systems]] module-U concerns from the agent into deterministic infrastructure — the same "find the right boundary between agent autonomy and harness determinism" tension that drives [[harness-engineering]] and [[code-as-agent-harness]].

## Observed Effects

Mukta reports (from deploying large-scale memory systems in production at Anthropic — internal observations, not a benchmark):

- **Accuracy** — the second time an agent does a task it performs better, because prior failures were noted to memory.
- **Speed and cost** — second-order effect: agents spend fewer tokens and one-shot tasks more often because they already know what they are doing.
- **Freed developer capacity** — autonomous memory curation runs as a background self-learning loop, letting product developers focus on product wins.

On the cost of dreaming itself ("why throw extra resources at out-of-band review?"): the same memory improvements that let agents one-shot tasks lower running cost, so the dedicated token spend on dreaming is argued to pay for itself.

## How It Reframes the Wiki's Memory Map

> [!note] Synthesis: The missing temporal axis. [[evolving-context]] organizes continual learning by *what evolves* (prompts, skills, harness surfaces, schemas, stores, patch history). Dreaming introduces the orthogonal question of *when* and *by whom*: memory maintained in-band by the task-performing agent vs. out-of-band by a dedicated reviewing process with fleet visibility. Every evolution axis on the evolving-context page could in principle be driven in-band or out-of-band; the talk argues the out-of-band mode is structurally necessary once you scale beyond a single session.

> [!note] Synthesis: Realizes two abstract ideas already in the wiki. Dreaming is the concrete engineering instantiation of the **Complementary Learning Systems consolidation** of [[episodic-memory-for-agents]] — the offline transfer/reorganization of experience — performed in *token space* by agents rather than in weight space. And it realizes Davis & Schleisman's **default-mode after-action** framing: a structurally distinct reflective mode that "learns during downtime" using idle compute — which is exactly what a batch, asynchronous, out-of-band reviewer is. The biological sleep metaphor is not decoration; it names a real architectural separation between task-execution and memory-consolidation processes.

> [!note] Extension: Construction-time consolidation generalizes. The [[construction-time-memory]] thread asks whether offline memory-as-quality-substrate generalizes beyond GraphRAG construction. Dreaming is affirmative evidence: the same "invest offline, with dedicated reviewers and fleet visibility, to produce a better-maintained artifact" pattern applies to *agent session memories*, not just knowledge-graph triples. The reviewer fleet + evidence-backed proposals is the construction-time-memory pattern at the memory-maintenance layer.

## Thread

- [[the-agent-workflow]] — Dreaming is the "third mode" (reflective consolidation) the workflow's Evolving Context Frontier calls for: HITL design → AFK execution → out-of-band memory consolidation. It is the continual-learning substrate that makes the workflow improve across sessions and across the fleet
- [[construction-time-memory]] — Dreaming generalizes the offline memory-as-quality-substrate pattern from GraphRAG construction to agent-memory maintenance
- [[the-verifiability-thesis]] — Dreaming's production guardrails are verifiability engineering applied to the memory layer; the "reinventing databases" tension is the verifiability frontier expanding into memory mutation
- [[the-multi-agent-theory]] — Dreaming is a production-scale, hand-engineered MAS (orchestrator + subject fleet over shared memory) — corroboration that the "engineered, not searched" principle holds outside benchmarks
- [[agent-quality-engineering]] — Dreaming is the quality flywheel lifted to the memory layer and run out-of-band with fleet-wide visibility (tool-call metadata as the highest-signal failure source)
- [[the-slop-problem]] — Dreaming is the out-of-band pain signal for memory slop: the feedback loop that lets memory "feel pain" (staleness, fleet-wide recurring failures) the task agent structurally cannot
- [[the-human-lever]] — Dreaming relocates the human lever to fleet-level memory governance: accept/reject on proposed memory diffs, with tiered permissions making the memory store a governed surface
- [[tool-design-for-agents]] — Memory-as-file-system (ordinary tools over bespoke memory APIs/vector DBs) is the CLI-over-MCP thesis applied to the memory layer; versioning+provenance is inspectable tool feedback

## Related

- [[evolving-context]] — The "what evolves" taxonomy; dreaming adds the orthogonal "when/whom" (in-band vs out-of-band) temporal axis
- [[agent-memory-systems]] — Dreaming is a concrete out-of-band instance of module U (maintenance: consolidation, forgetting, capacity); the production guardrails harden module U for concurrency and abuse
- [[episodic-memory-for-agents]] — Dreaming realizes the CLS consolidation operation and the default-mode after-action framing as a token-space, agent-driven process
- [[context-engineering]] — Memory stores are the persistent-context layer; dreaming is how that layer is maintained over time without competing for the in-band context budget
- [[construction-time-memory]] — The generalization of offline memory-as-quality-substrate beyond GraphRAG
- [[evomem]] — Dreaming's "propose changes with evidence (transcripts + prevalence)" mirrors EvoMem's evidence-backed patch discipline, at fleet scale
- [[memrefine]] — Both are out-of-band memory maintenance; MemRefine compresses under a storage budget, dreaming consolidates from fleet experience. Orthogonal primitives
- [[state-collapse]] — Versioning + transcript provenance in dreaming's guardrails is the production defense against silent overwrite of valid prior memory
- [[babysitter-agent]] — Both externalize context/memory management to a dedicated process rather than the task agent; dreaming is the fleet-scale, batch analog
- [[harness-engineering]] — The "reinventing databases" tension is the harness absorbing module-U concerns into deterministic infrastructure
- [[claude-code]] — The canonical in-band memory surface (per-session CLAUDE.md + file-system memory) that dreaming operates over
- [[lamis-mukta]] — Described dreaming's production architecture (Anthropic introduced the concept)

## Sources

- `raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md` — Lamis Mukta (Anthropic), "Learning while you sleep: Beyond memory to dreaming," AI Native DevCon, June 2026. Source for the in-band vs out-of-band distinction, the dreaming architecture (orchestrator + subjects, transcript + tool-call metadata review, evidence-backed proposals, human accept/reject), the school analogy, the production guardrails (versioning, hashing/concurrency, permissions, portability), reported effects (accuracy, speed/cost, freed capacity), and the "reinventing databases" Q&A. Also the memory-primitives timeline (CLAUDE.md → memory tools → skills → file-system-as-memory) and the productization via Claude Managed Agents' memory and dreaming API.

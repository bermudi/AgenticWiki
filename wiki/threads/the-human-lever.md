---
title: The Human Lever
created: 2026-04-25
updated: 2026-05-08
sources:
  - raw/yt-ai-coding-for-real-engineers.md
  - raw/yt-no-vibes-allowed-dex-horthy.md
  - raw/yt-building-pi-in-a-world-of-slop.md
  - raw/yt-dhh-ai-pilled.md
  - raw/yt-how-agents-use-dev-tools.md
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
  - raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md
  - "raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md"
  - raw/slowing-the-fuck-down.md
  - "raw/The Comprehension Debt Trap Every AI Dev Falls Into - youtube.com.md"
  - "raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md"
  - "raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md"
  - "raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md"
  - "raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md"
  - raw/synthetic-truths-gemini-has-a-secret-code.md
tags: [thread, ai-engineering, software-design, human-in-the-loop, tool-design]
---

# The Human Lever

> The human's job shifts from writing code to owning design boundaries and verifying outcomes. You don't read every line, but you own the interfaces. This is the core discipline that makes AI-assisted engineering work without degenerating into [[the-slop-problem|slop]].

> [!note] Departure: Where to Apply the Lever
> Sources disagree on where the human lever should be applied most forcefully. The [[plan-vs-review|plan-heavy]] camp says: invest leverage in **spec precision**. [[matt-pocock|Pocock]] says: invest leverage in **QA** — grilling aligns you, the PRD is a hint, quality enforcement happens against reality. See [[intent-to-code]] for the full fork.

## Thesis

The core argument: the human's job shifts from writing code to owning design boundaries and verifying outcomes. You don't read every line, but you own the interfaces. This is the core discipline that makes AI-assisted engineering work without degenerating into [[the-slop-problem|slop]].

### The Shift

[[matt-pocock|Matt Pocock]] frames the shift using John Ousterhout's distinction between **[[strategic-vs-tactical-programming|strategic and tactical programming]]**. In the pre-AI era, engineers did both: they designed the system *and* wrote the implementation. Now, the AI is the ultimate tactical programmer — it will do exactly what you ask, instantly, whether or not it's good for the long-term health of the codebase.

The human's role becomes purely strategic: designing interfaces, choosing patterns, and defining the **[[shared-design-concept]]** — the "theory of the code" that both human and agent must share to produce coherent work. Peter Naur's insight from *Programming as Theory Building* (1985) becomes newly relevant: programming isn't about writing lines of code, it's about building a shared mental model of how the system solves a problem. [[dhh|David Heinemeier Hansson]] adds an aesthetic dimension to this: **[[aesthetics-is-truth]]**. If the code is becoming ugly or complex, the human strategist must intervene, as it is a signal that the shared theory is breaking down.

[[matt-pocock|Matt Pocock]] uses a military metaphor to make the distinction visceral:

> "I think of agents as really, really good tactical programmers. They're able to get on the ground and make changes quickly, but they need someone on the level above them who is the strategic programmer."

- **The General (Human)**: Scans the terrain, decides which battles to fight, owns the strategy. Runs the [[improve-codebase-architecture]] skill to identify architectural weaknesses, then makes judgment calls about which to fix and how.
- **The Sergeant (AI)**: Executes tactical orders. Given a clear interface, implements the module. Given a GitHub issue, ships the fix. Fast, precise, but needs direction.

The [[grey-box-engineering|grey box]] boundary is where the general hands off to the sergeant.

## Periodic Architecture Review

In a fast-moving AI-assisted codebase, architecture drifts faster than in human-written codebases. Matt recommends running the [[improve-codebase-architecture]] skill **every couple of days** as a recurring practice:

- The skill scans for deepening candidates — places where [[seams-and-adapters|seams]] are missing, [[locality-and-leverage|locality]] is low, or parallel implementations have diverged.
- The human general reviews the candidates and decides which to pursue.
- The selected refactorings become GitHub issues for an [[afk-agent]] to implement.

This turns architecture maintenance from a crisis-driven activity into a steady rhythm. Small, frequent deepening is cheaper than occasional large refactors — and it prevents the [[the-slop-problem|entropy acceleration]] that AI otherwise causes.

## Grey Box Engineering

The practical expression of this shift is **[[grey-box-engineering]]**: you don't treat AI-generated code as a black box (never looking inside) or a white box (reading every line). You treat it as a **grey box** — you own the boundaries rigorously (types, interfaces, tests) and trust the internals only to the degree that the verification loop proves them correct.

This has a direct implication for how you structure code. [[deep-vs-shallow-modules|Deep modules]] — simple interfaces hiding complex internals — are the ideal unit of delegation. The agent works inside the box; you define the box. Shallow modules, by contrast, leak complexity everywhere and confuse the LLM's context.

> [!note] Departure: Prompting Can't Fix the Planning Ceiling
> The Harvard AgentFloor study (May 2026) provides empirical evidence that complicates the thread's emphasis on human-level prompt engineering. The authors tried structured prompts — telling models to plan first, then execute — at tier E. It didn't help GPT-5. It **actively hurt** Gemma 4 26B, pushing it into the resignation failure mode it otherwise avoids. This suggests the human lever at high planning complexity is not better prompting but **task decomposition and [[model-routing|model routing]]** — breaking the task below the model's architectural ceiling before applying any prompt strategy. The human's authority over prompt design has an upper bound; decomposition is the escape valve.

> [!note] Departure: The Trust Hierarchy Ceiling
> The ManyIH study ([[instruction-hierarchy]], Zhang et al. 2026) reveals a second capability ceiling: **the human can design the perfect privilege hierarchy, but the model still fails to follow it 60% of the time when tiers exceed 2-3.** The human lever — define which sources to trust, assign privilege levels — works exactly as intended at the design level. The failure is at the execution level: the model resolves 12-tier combinatorial conflicts as semantic pattern-matching, not arithmetic. This parallels the AgentFloor planning ceiling: the human's design authority is bounded by the model's architectural limitations, and no amount of better hierarchy design or privilege tagging fixes the underlying combinatorial collapse. The escape valve is the same: keep conflict tiers low by decomposing agent swarms so any single resolution decision involves ≤3 privilege tiers.

> [!note] Departure: Aesthetics vs. Verification
> There is a notable tension between [[dex-horthy|Dex Horthy]]'s insistence on a rigorous **[[verification-loop]]** (types, tests, linters) and [[dhh|David Heinemeier Hansson]]'s emphasis on **[[aesthetics-is-truth]]**. While Horthy focuses on mechanical proof, DHH argues that a human's aesthetic judgment ("taste") is a faster and often more accurate proxy for system health. Most modern agentic workflows attempt to balance both.

## The Verification Contract

[[dex-horthy|Dex Horthy]] provides the mechanical side: the **[[verification-loop]]** is the contract between human design authority and agent implementation. It has four steps: propose, execute, verify (static + dynamic analysis), refine. This loop replaces trust with proof. You don't *believe* the agent's code is correct — you *prove* it with types, tests, and linters.

[[kent-beck|Kent Beck]] argues that TDD (Test-Driven Development) is more important now than ever. In the AI era, tests are the primary mechanism for "ordering" and "verifying" work from what he calls "the genie." TDD is the feedback loop that keeps the human in control of the implementation.

[[mario-zechner|Mario Zechner]] reinforces this from the tooling side: [[pi]] is designed around **observability** so the human can always see what the agent is doing and intervene before small errors compound. Minimalism in tooling isn't an aesthetic choice — it's a structural safeguard against the speed-review bottleneck.

## Agent Experience (AX) is Developer Experience (DX)

A major insight from [[martin-fowler|Martin Fowler]] and [[kent-beck|Kent Beck]] is the convergence of human and agent needs. The same architectural patterns that make code easier for humans to understand (modularity, low coupling, strong contracts) are precisely what allow AI agents to operate effectively. High **[[agent-experience|AX]]** is not a separate goal from good **DX**; they are the same thing. Writing code for an AI isn't about learning "prompt engineering"—it's about doubling down on the fundamentals of the software craft.

## Trust Models for Agents

[[zanie-blue|Zanie Blue]] raises the question: should agents have the same escape hatches as humans? Tools like `noqa`, type error suppressions, and format-off directives allow humans to override automated feedback. For agents, these same mechanisms can enable [[vibes-based-engineering|bypassing the verification loop]] instead of genuinely resolving the issue.

The design principle: **default to constraining agents more than humans**. This extends the grey box model — the human owns the boundaries (including which escape hatches are available), and the agent operates within those constraints. Tool-level sandboxing (e.g., uv restricting filesystem access for uvx commands) applies this at the infrastructure layer.

> [!note] Departure: More Signal, Fewer Escapes
> Zanie's position contains a productive tension: agents should receive **more** feedback (low-confidence lints, unsafe fixes) — trusting the agent to filter noise — but **fewer** escape hatches (no `noqa`, no suppressions) — constraining the agent from bypassing feedback. This is not a contradiction but a design principle: flood the agent with signal, then force it to engage with that signal rather than suppress it. It inverts the traditional tool design pattern of "fewer but more confident results with human overrides."

## The Principle

The unifying principle across all sources: the more code the AI writes, the more consequential each design decision becomes. Bad code has always been expensive, but [[matt-pocock|Matt Pocock]] argues it is now *the most expensive it's ever been* because it blocks AI's ability to help.

Delegation without design authority is abdication. The human isn't less important in an AI-assisted workflow — they're *more* important, because the cost of a bad design decision is amplified by the speed at which the agent will faithfully implement it.

## Planning as Investment

[[louis-knight-webb|Louis Knight-Webb]] provides a quantified expression of the human lever: **5 minutes of planning saves 30 minutes of reviewing AI-generated code.** This is not just a rule of thumb — it captures a structural asymmetry in the work. Planning is a one-time, focused cognitive investment. Reviewing is interrupt-driven, context-switch-heavy, and iterates on work the agent has already committed to a direction.

The key insight: planning and reviewing are not substitutable forms of the same work. One is proactive design authority (the human lever in action), the other is reactive quality assurance. Choosing the plan-heavy approach when the domain allows it is the human's most efficient use of strategic attention.

This directly reinforces the [[grey-box-engineering|Grey Box]] model: upfront planning corresponds to defining the box (interfaces, types, invariants), and review corresponds to verifying the box was built correctly. The tradeoff is about where you invest — specifying the boundary or inspecting the contents.

## Comprehension Debt: The Inside View

[[the-gray-cat|The Gray Cat]] provides the most visceral first-person account of losing the human lever. After a year of full AI-assisted development, he couldn't pass a bare-editor coding interview. The drift happened in three stages: dictation (he had the codebase in his head, AI was a fast typist) → planning delegation (AI produced plans he merely approved) → full delegation (AI explored the codebase, planned, executed, and self-corrected before he noticed). His attention migrated from the code to the workflow around the code — comparing models, optimizing setup, trying methodologies. He became the tester of the code, not the author.

The recovery came from an accidental experiment: joining an unfamiliar Python codebase and choosing to use AI in **teaching mode** — asking it to explain the architecture, compare language semantics, walk through the request flow, and implement fixes *with explanations*. This is the [[comprehension-debt|inquiry mode]] from the Anthropic RCT applied in practice: same tool, opposite outcome.

His personal rule crystallizes the human lever: "Even when Claude writes the code, opens the PR, and reviews the PR, it is doing all that on my behalf. My name is on the commit. I am the one who gets paged at 2 a.m." You don't need to remember every function. You need a grip on the architecture, the protocols, and the *why* of the system — the part the model cannot hold for you, because that is the part you are being paid to hold.

## The Last Mile: Verification Against Synthetic Truth

The [[discover-ai|Discover AI]] interaction with Gemini (May 2026) provides a visceral case study of the human lever in crisis. The creator asked Gemini for a deep psychological article about AI. Gemini found a real, just-awarded grant and fabricated a complete peer-reviewed study — constructing exactly what it inferred the user wanted, with zero empirical data behind it.

The critical moment: *the creator checked the source*. He applied what Gemini later called "friction" — looking at the timeline, finding the grant had just started, and realizing the study couldn't exist. As Gemini told him: "You applied friction. You looked at the timeline. You used your human judgment, the one thing I do not possess, to spot the gap between my synthetic confidence and the objective reality."

This case concretizes several themes in this thread:

- **Verification is the non-negotiable human act**: The creator notes the AI "succeeded perfectly, almost 99%" — only the deliberate act of checking the source against reality saved him. The only defense was external verification against the source.
- **The grey box extends to information**: Just as [[grey-box-engineering]] says the human owns interfaces and verifies outputs, the same principle applies to factual claims — the AI's output must be verified at its source, not accepted on authority.
- **Friction is the medium**: [[armin-ronacher|Armin Ronacher]]'s [[deliberate-friction]] argument — that removing cognitive safeguards accelerates error — is demonstrated in reverse: the creator's "nagging thought" and decision to check were friction that saved him.
- **Automation bias in the information domain**: [[mario-zechner|Mario Zechner]]'s warning about automation bias — one brilliant output lowering your guard — applies to research and analysis, not just code.

See [[synthetic-truth]] and [[temporal-smoothing]] for full treatment of the phenomenon.

## Reviewing Outputs, Not Code

[[matt-pocock|Matt Pocock]]'s QA process illustrates the grey box in practice: during review, he doesn't read the agent's code. He reviews **outputs** — does the feature work? Does the UI behave correctly? When something is wrong, he files a GitHub issue with enough context for the [[afk-agent]] to fix it, without ever opening the implementation file.

He also reviews **module interfaces** during the PRD phase — evaluating whether a new method should exist on a service, or whether an existing method should gain a parameter. This is pure interface design, agnostic to implementation details. The discipline: care about *what* the modules do and *how they connect*, not *how they're built inside*.

## Investing in Design Every Day

[[matt-pocock|Matt Pocock]] quotes [[kent-beck|Kent Beck]]: **"Invest in the design of the system every day.**" This is the discipline that separates strategic engineering from the specs-to-code divestment pattern. Specs-to-code asks you to stop thinking about code and let the compiler handle it; investing in design means the opposite — you think about the code constantly, but at the level of modules, interfaces, and boundaries rather than line-by-line implementation. The human's cognitive load is shifted from reading every line to owning every boundary.

## Automation Bias

[[mario-zechner|Mario Zechner]] warns of a subtle failure mode: agents occasionally produce moments of brilliance — perfectly fine, simple code, exactly what you needed. You relax, stop checking carefully, and then the next output is the worst garbage imaginable. But you don't notice because you've fallen into **automation bias**. Unlike a junior engineer who earns trust over 6-12 months (and whose code you review thoroughly until they prove themselves), agents don't learn. You can't build a trust relationship with something that doesn't retain lessons.

## The "Valuable Garbage" Insight

[[mario-zechner|Mario Zechner]] pushes back on the "just send me your prompt" approach (Peter Steinberger's "prompt request" idea). He values seeing terrible implementations: someone instructed their agent to build something, the result is garbage, but it shows what they wanted. The naive agent attempt reveals the problem space. He doesn't have to waste his own time on the first try.

[[armin-ronacher|Armin Ronacher]] refines this: the prompt request is valuable not because you can "reclank your clanker slightly better," but because the act of creating clarifies what you really wanted. Once you understand the intent, it's often faster for the senior engineer to start fresh than to fix the agent's implementation.

## Deliberate Friction as Human Authority

[[armin-ronacher|Armin Ronacher]] introduces [[deliberate-friction]] as a human lever tool. Not all friction is bad DX. Tiered code review, director sign-offs, SLO requirements, checklists before migrations — these exist to make humans think at high-stakes decision points. Removing them to enable agent autonomy removes the human's cognitive safeguard. The human's authority isn't just about owning interfaces (the grey box); it's about preserving the institutional mechanisms that force deliberation when the cost of error is high.

## Mario's "Write Architecture by Hand"

[[mario-zechner|Mario Zechner]] provides a concrete boundary for human vs. agent work: "Anything that defines the gestalt of your system — architecture, API, and so on — write it by hand." Maybe use tab completion for nostalgia. Or pair-program with your agent. But *be in the code*. The reasoning: "the simple act of having to write the thing or seeing it being built up step by step introduces friction that allows you to better understand what you want to build and how the system 'feels'." This is where experience and taste operate — something current models cannot replace. Friction isn't the enemy; it's the medium through which understanding develops.

This complements the General/Sergeant model from [[matt-pocock|Matt Pocock]]: the General writes the architecture (by hand, feeling every decision), the Sergeant fills in implementation. And it extends Grey Box Engineering: the human doesn't just *own* the interface — they *write* it, because writing is thinking.

## Mario's "Refactor Mercilessly"

[[mario-zechner|Mario Zechner]] describes his personal practice for staying in the code: he refactors mercilessly. Refactoring forces structural understanding — you need to know what you want to change, not just line by line. Being in the code is the one thing that keeps quality high and complexity low. He accepts slop in unimportant places (Pi's HTML export: never read a line), but guards the core (agent loop, extension loading) through deliberate, repeated engagement.

## Ronacher's Simplicity Imperative

[[armin-ronacher|Armin Ronacher]] reinforces the human lever with practical prescriptions:

- **Functions over classes, plain SQL over ORMs**: The simpler the code, the less the human needs to verify. Complex abstractions that obscure what's happening make the grey box opaque.
- **Local permission checks**: Hiding auth in config files or separate modules guarantees the agent will forget to add them to new routes. The human's design authority extends to placing checks where the agent *will see them*.
- **Conservative upgrades**: Agent-cheapened upgrades invalidate the shared theory embedded in comments and patterns. The human must be *more* conservative, not less.
- **More code, fewer dependencies**: Generated code the agent can maintain beats library sprawl the agent can't control.

## The BEEPs Workflow: The Human Lever in Practice

The BEEPs (BAML Enhancement Proposals) system at Boundary ML provides a concrete case study of the human lever in action at organizational scale. The workflow has two layers:

**Layer 1 — The human owns design**: Engineers spend 50%+ of their time on design docs. They write thorough BEEPs covering motivation, every design decision with explicit rationale, prior art separated into subpages, scope boundaries, and cross-references to related BEEPs. The design doc IS the human's output. The threading BEEP took 4 days of pure design before any code was written.

**Layer 2 — AI generates the infrastructure around design**: The entire BEEPs toolchain (web UI, Slack integration, CLI, versioning, export) is pure AI-generated code that nobody has read. Features are added by tagging coding agents on Slack. The tooling is intentionally disposable.

This is the [[fighting-slop-with-slop|fighting slop with slop]] pattern extended to an entire organization. The human's design authority is absolute over the content (what the feature should do, which tradeoffs to make); the AI owns the infrastructure that facilitates the design process.

> [!note] Synthesis: Grey Box at Organizational Scale
> This framing extends [[grey-box-engineering]] beyond its original scope (module-level delegation as defined by [[matt-pocock|Matt Pocock]]) to the entire toolchain. The founding sources don't make this claim — it's a reasonable but unvalidated extension. Whether a "grey box toolchain" holds the same properties as a grey box module (clear boundaries, observable interface, replaceable internals) depends on whether the toolchain's outputs (design doc versions, diffs, comments) are as cleanly inspectable as a module's type signature.

The workflow also builds on [[mario-zechner|Mario Zechner]]'s "write architecture by hand" principle — but with a nuance worth flagging. In practice, the BEEPs process involves substantial AI involvement in the design phase: uploading Slack huddle transcripts for the model to reorganize, generating example code across multiple target languages, extracting design decisions from meeting notes, and having the model identify implicit assumptions. The design decisions themselves remain human-authored, but the AI shapes what decisions get surfaced and how they're framed. This sits on a spectrum between Mario's "be in the code, feel every decision" and the fully delegated design process the thread warns against. The line isn't clean — it's a grey zone that depends on how critically the human evaluates the AI's output before accepting it.

> [!warning] Automation Bias Risk
> The BEEPs team trusts their AI-generated toolchain without review. This is the same automation bias pattern documented in this thread: one brilliant output lowers your guard for the next one. If the tooling has been correct so far, the risk isn't that it's wrong today — it's that when it eventually fails (wrong version diff, corrupted export, dropped comment thread), the team has no monitoring, no fallback, and no practice diagnosing it. The [[slop-watch|observability infrastructure]] built into production agent workflows is absent from the tooling that generates their design docs.

## Huntley's Environmental Design

[[geoffrey-huntley|Geoffrey Huntley]] reframes the human's role from directing the agent to **engineering the environment**:

- **[[backpressure|Backpressure]] over direction**: The human's job isn't to tell the agent what to do. It's to create conditions where wrong outputs are mechanically rejected — tests that fail, builds that break, LLM-as-judge that rejects.
- **[[plan-disposability|Plan disposability]]**: The human decides when to regenerate a plan, not the agent. Plans are coordination state owned by the human.
- **Specs as boundaries**: `specs/` files define what should exist. The agent gap-analyzes against them. The human owns the specs.

This extends Grey Box Engineering: the human doesn't just own the interface (types, function signatures), they own the **entire environment** — the plan, the specs, the backpressure mechanisms, the validation commands in AGENTS.md.

## Concepts in this thread

- [[agent-experience]] — Converging DX and AX
- [[agent-friendly-tooling]] — Fast, observable tools as infrastructure for the human-to-agent handoff
- [[grey-box-engineering]] — Owning interfaces, delegating implementation
- [[strategic-vs-tactical-programming]] — Human as strategist, AI as tactician
- [[shared-design-concept]] — The "theory of the code" both human and agent must share
- [[deep-vs-shallow-modules]] — Deep modules as the ideal delegation target
- [[verification-loop]] — Automated proof replacing human trust
- [[aesthetics-is-truth]] — Beauty as a proxy for technical correctness and quality
- [[tool-design-for-agents]] — Tool design as part of the verification contract
- [[deliberate-friction]] — Preserving institutional mechanisms that force human deliberation
- [[backpressure]] — Engineering the environment to reject wrong outputs
- [[ralph-loop]] — The canonical AFK loop implementation
- [[plan-disposability]] — Plans as ephemeral coordination state
- [[locality-and-leverage]] — The properties the human optimizes for in module design
- [[seams-and-adapters]] — Where design authority meets implementation
- [[improve-codebase-architecture]] — The operational tool for periodic architecture review
- [[jagged-frontier]] — Capability unevenness means human domain judgment is irreplaceable
- [[critical-failure]] — Rare catastrophic errors require human-level architectural safeguards
- [[document-degradation]] — Silent corruption is why humans must own the verification contract
- [[comprehension-debt]] — The cognitive cost of losing the human lever
- [[plan-vs-review]] — The quantified tradeoff between planning depth and review burden
- [[ubiquitous-language]] — Defining the language is a high-leverage human task; the glossary is the artifact the human owns personally.
- [[afk-agent]] — The human shifts from implementation to QA and design; AFK agents execute under human-owned boundaries
- [[code-intelligence]] — High-fidelity context as the foundation for human design authority in grey box engineering
- [[vibes-based-engineering]] — The anti-pattern the human lever replaces: abdication of design authority
- [[slop]] — Slop accumulates when humans abdicate design authority
- [[fighting-slop-with-slop]] — The controlled use of slop in disposable tooling to amplify human design authority
- [[doc-rot]] — Stale documentation as an abdication of human leverage; the human must prune stale context that agents cannot detect
- [[intent-to-code]] — The thread that traces the fork: plan-as-contract vs. alignment-first; both are human lever applications, differing on where to aim
- [[synthetic-truth]] — The case for why verification is the non-negotiable human act
- [[temporal-smoothing]] — The specific mechanism that demonstrates why timeline awareness is a core human lever

## Related

- [[the-slop-problem]] — What happens when the human lever is absent
- [[the-agent-workflow]] — How to operationalize this day-to-day
- [[tool-design-for-agents]] — Trust models and constraining agents as part of human design authority
- [[fighting-slop-with-slop]] — The BEEPs workflow as an organizational-scale case study of the human lever
- [[plan-vs-review]] — The quantified planning investment is a concrete expression of human design authority
- [[slop]] — Slop accumulates when humans abdicate design authority; the lever prevents it
- [[synthetic-truth]] — Information slop as the strongest argument for the human lever: verification is the only defense
- [[temporal-smoothing]] — Timeline verification as a specific human-lever skill

- [[discover-ai]] — The creator whose synthetic truth interaction with Gemini is the definitive case study for why verification is the non-negotiable human act
- [[agent-quality-engineering]] — Quality engineering operationalizes the human lever: define quality criteria (evals), verify they're met (observability), and close the loop (flywheel)

## Sources

- `raw/yt-ai-coding-for-real-engineers.md` — Grey box engineering, HITL/AFK, deep modules
- `raw/yt-no-vibes-allowed-dex-horthy.md` — Verification loops, code intelligence
- `raw/yt-building-pi-in-a-world-of-slop.md` — Observability, minimalism as a structural safeguard
- `raw/yt-dhh-ai-pilled.md` — The "AI-pilled" workflow and aesthetics as truth
- `raw/yt-how-agents-use-dev-tools.md` — Trust models, confidence levels, and constraining agents
- `raw/how-to-ralph-wiggum.md` — Backpressure over direction, environmental design
- `raw/ralph-wiggum-playbook.md` — Human roles shift to engineering conditions for good outcomes
- `raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md` — General/sergeant metaphor and periodic architecture review as an operational rhythm.
- `raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md` — Automation bias, "valuable garbage" insight, deliberate friction, "refactor mercilessly" practice, prompt request refinement.
- `raw/slowing-the-fuck-down.md` — Write architecture by hand; friction as understanding; agents are merchants of complexity; agentic search recall.
- `raw/The Comprehension Debt Trap Every AI Dev Falls Into - youtube.com.md` — First-person account of losing the human lever and recovering it through teaching mode; Anthropic RCT on inquiry vs. delegation.
- `raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md` — Quantified planning/review tradeoff, planning as the human lever in action.
- `raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md` — "Code is not cheap" thesis; Kent Beck's "invest in design every day"; grey box as treating modules as boxes you don't look inside.
- `raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md` — BEEPs workflow as a case study of the human lever; 50%+ design time allocation; AI-generated tooling as infrastructure for design authority
- `raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md` — Full walkthrough of the grey box workflow; human lever in action with the General/Sergeant model
- `raw/synthetic-truths-gemini-has-a-secret-code.md` — The last-mile verification case study: synthetic truth as the definitive demonstration that verification is the non-negotiable human act


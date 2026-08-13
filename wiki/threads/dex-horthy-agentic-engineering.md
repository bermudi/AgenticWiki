---
title: Dex Horthy's Agentic Engineering
created: 2026-07-16
updated: 2026-08-13
sources:
  - raw/yt-no-vibes-allowed-dex-horthy.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md
  - raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md
tags: [thread, agentic-engineering, context-engineering, harness-engineering, software-factory, loops]
unaudited_marginal: 0
---

# Dex Horthy's Agentic Engineering

> A synthesized worldview tracing how [[dex-horthy|Dex Horthy]] thinks about building with LLMs — from the token layer up. The spine: [[context-engineering]] is the discipline of deabstracting every "AI feature" (RAG, memory, agentic history, structured output) back into what it actually is — *tokens into a model* — and engineering those tokens deliberately. Everything else follows: stay in the [[smart-zone-dumb-zone|Smart Zone]] via frequent intentional compaction; structure work as [[research-plan-implement|research/design/plan/implement]] with disposable docs; run [[slow-loops|slow, incremental, human-reviewed loops]] rather than [[dark-factory|lights-off factories]]; and seek *leverage* ([[token-harder-vs-token-smarter|token smarter, not harder]]) — the points where an hour of human planning saves four hours of rework. This thread exists to make Dex's position traceable as one coherent system: he is the thesis other wiki sources argue with.

## Why a Person-Centric Thread

The wiki's threads are normally thematic, not biographical. Dex is the exception because his vocabulary has become the wiki's connective tissue: [[context-engineering]], [[12-factor-agents]], the [[research-plan-implement|RPI workflow]], the [[smart-zone-dumb-zone|Smart/Dumb Zone]], [[harness-engineering]]'s inner/outer distinction. His concepts are the routing layer other pages link *through*. A thread that traces how those concepts fit together — and where his fellow practitioners push back — is the most efficient entry point into the wiki's whole agentic-engineering cluster.

> [!note] Synthesis: Elevation Without Canonization
> This thread elevates Dex by making his worldview a first-class, navigable system. It does *not* present his positions as settled. Where other sources disagree — [[spec-driven-development|spec-driven dev]], planning-as-leverage ([[plan-vs-review]]), "[[dark-factory|stop reading code]]" — the tension is preserved in §Tensions. The honest form of "elevate a thinker" is to make their claims the thesis everyone else has to respond to, not to delete the disagreements.

## Thesis: Deabstract Down to the Token

Dex's foundational move is refusal of premature abstraction. The framing he keeps returning to:

> Context engineering is "deabstracting the abstractions that have been layered on top of RAG, memory, agentic history, structured output... at the end of the day they're all different ways to pass tokens into a model." ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 21:13)

The practical consequence: off-the-shelf agent/memory frameworks are fine for getting to an 80% demo, but the jump from 80% to 95–99% requires going *down a level* — thinking about exactly which tokens go in, in what order, for which model. The levers most builders think they have (system prompt + model + a few tools) are a small fraction of the levers that actually exist. See [[context-engineering]].

### Two Budgets, Not One

Most people think only about the **information budget** (RAG chunks vs. dumping the whole book in context). Dex adds the **instruction budget**: models follow roughly 150–250 instructions before attention spreads too thin, and *conflicting* instructions — especially mid-conversation course corrections — are expensive because the model has to compute that it should ignore the earlier path. This is the same attention limit that produces [[instruction-severity-inflation]] and defines the [[smart-zone-dumb-zone|Smart Zone]].

## The Physics: Smart Zone, Dumb Zone, and Trajectory

Dex is the wiki's primary articulator of the [[smart-zone-dumb-zone|Smart Zone / Dumb Zone]] heuristic: the first ~100k tokens (up to ~200k on the largest models) are where reasoning, instruction-following, and attention peak; beyond that, quality degrades — not because the window is too small, but because transformer attention is quadratic and the model's *intelligence* is what lets it select which tokens matter, and that selection degrades as the window fills. A longer context window is not a smarter model.

The operational rule that follows is **frequent intentional compaction** — the building block of all his workflows: read a lot of code, compress it into a small verified markdown artifact, carry *that* into a fresh context window. Research compacts the codebase; design compacts the intent; planning compacts the steps. This is context engineering applied as a lifecycle, not a one-shot trick.

> [!note] Extension: The Four-Property Context Model
> Dex frames the context window as having four properties an engineer must manage — **size** (token count), **information quality** (any incorrect fact or wrong thinking trace), **missing information**, and **trajectory** (the actual history of what the agent has done). The first three are widely discussed; **trajectory** is his distinctive addition. Because models are autoregressive, they predict the next message given the conversation history — so a history of "mistake → human yells → mistake → human yells" conditions the model to produce *another* mistake. The "you're absolutely right" non-apology is the tell that the trajectory has gone bad and it's time to start over. See [[context-trajectory]].

## The Workflow: Research / Design / Plan / Implement

Dex's [[research-plan-implement|RPI workflow]] operationalizes the compaction principle as a sequence of phases, each in a fresh context window, each producing a compressed artifact for the next:

1. **Research** — read the codebase with parallel subagents; produce a doc compressing ~100k tokens of context into ~10k. Hands-off; models are good at "explain how this fits together."
2. **Design** — current state / desired end state / open design questions. **Human-in-the-loop**, because models are mediocre at architecture and program design — they make decisions that are sometimes right and sometimes wrong.
3. **Plan** — break the path from current to desired into steps.
4. **Implement** — execute.

The critical lesson Dex reports from running this for a year: **the original plans were "terrible" and gave anti-leverage.** They enumerated every line of code in diff blocks, so reviewing the plan (20 min) plus reviewing the PR (20 min) *doubled* reading time rather than reducing it. The fix: treat all RPI docs as **tactical execution artifacts** — use once, throw out, regenerate from scratch next time. Tokens are cheap; human time is expensive; a stale research doc reused against a changed codebase is a liability. This is the mature form of [[plan-disposability]], and it is a direct tension with [[plan-vs-review|planning-as-leverage]] and with [[spec-driven-development|evergreen specs]] (see §Tensions).

A second planning failure mode he names: **models make horizontal plans** (database layer → services → API → frontend) that can't be tested until the end; humans make **vertical slices** (mock API → frontend → wire real data → migration) that are testable at each step. The human's job in the design/plan phases is to inject this taste.

## Loops: Slow, Incremental, Lights-On

On autonomous loops (the [[ralph-loop|Ralph Wiggum]] lineage and the [[orchestration-loop|orchestration loops]] discourse), Dex is notably more conservative than the discourse. His position: **build one loop at a time, keep them small and contained, and never stop reading the code.**

His preferred instantiation is the [[slow-loops|slow loop]]: a cron job runs nightly in GitHub Actions, fixes exactly one thing (one anti-pattern, one lint rule), commits, pushes, opens one PR. The team wakes up to a codebase slightly better than they left it; a human still reviews and approves. Two scaling dimensions: add more feedback conditions (wake up to more PRs), and increase scope per PR as confidence grows. This is [[factory-maintenance]] operationalized — the "sweep agent" pattern, but boring and incremental.

His summary of the whole loops space: *"everything except stop reading the code is really good advice."* Take a support ticket, turn it into a tracker ticket, turn that into a PR — great. Replace all code review with agentic review and turn the lights off — see the next section.

## The Cautionary Tale: The Lights-Off Factory

Dex is the wiki's strongest *first-person* source on the failure mode of fully-automated software factories, because he built one and shut it down.

> [[humanlayer|HumanLayer]] built a lights-off [[software-factory]] in July 2025 and shut it down by November 2025. Dex's estimate: it takes **3–6 months** of shipping with nobody reading the code before the codebase becomes easier to rewrite from scratch than to fix. ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 41:55)

The mechanism: once you stop reading code, the PR-review bottleneck forces you into agentic code review and agentic testing — but none of those have intuition for software architecture, because the models are trained on [[the-benchmark-crisis|SWE-bench-style]] tasks ("here's a commit, here's an issue, reproduce the fix"), and the cost function of bad architecture can't be caught by a unit test — it hits you 3–6 months later as an unmaintainable ball of spaghetti. When his team finally hit a wall, no amount of expert prompting could get the model to find the root cause (a primary key being routed through the system as the wrong object type); they spent three weeks re-onboarding into a codebase they'd stopped reading three months earlier.

This is why Dex frames the choice as [[token-harder-vs-token-smarter|token harder vs. token smarter]]: token *harder* (max out the cloud subs, run a [[dark-factory]], optimize utilization of one node — a misreading of Goldratt's *The Goal*, which optimizes the end-to-end system, not one node) vs. token *smarter* (find the leverage points where a little human input prevents a lot of rework). His empirical claim for token-smarter teams: **2–3× faster while holding ~99% of hand-written quality.** Reading every line caps you at ~30–50% lift; turning the lights off risks the rewrite.

## The Harness Layer

Dex's contribution to [[harness-engineering]] vocabulary is the adoption of **Martin Fowler's** inner/outer harness distinction (which Dex considers the best definition available):

- **Inner harness** — the tool definitions and integration points a coding agent *exposes* (what Claude Code, Codex, AMP ship).
- **Outer harness** — what the human builds *around* it to customize for a specific codebase, language, and workflow (commands, MCPs, [[agent-skills|skills]], codebase organization).

[[harness-engineering|Harness engineering]] is the discipline of engineering against both. Dex credits [[vibv|Vib (Boundary/LangChain)]] for the underlying intuition that every step is just tokens-in-tokens-out and your job is to maximize the chance the tokens-out are good.

He also warns, via Fowler again, about **semantic diffusion**: when a useful word ("agents," "software factory") gets overloaded until it means everything and therefore nothing, the vocabulary stops helping builders and starts generating hype. Protecting precise vocabulary is part of the engineering.

## Cost and the Make-It-Run Heuristic

Dex's cost model is a stage gate, not an optimization:

> "Make it run, make it right, make it fast." First see if the smartest available model (e.g. o3) can even solve the problem and whether people want the result. Only once you have volume does it pay to do context engineering to move the task down the cost ladder — break it into calls, get pieces running on a 12B model at 1/1000th the cost of Opus, reserving frontier intelligence for the steps that actually need it. ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 24:07)

Engineering time is the binding constraint early on; per-request cost only matters at scale. This is the Goldratt constraint-theory instinct applied to model spend.

The August 2026 update makes the stage gate concrete: most teams don't feel the cost until the tokenizer/pricing shocks arrive — Opus 4.7 consuming 30% more tokens at the same price, then Fable at ~2× Opus ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 50:11–50:42). The billing model reshapes tier advice: "are you on a subscription or paying per token?" is his first disambiguation, because the same workload feels cheap or expensive depending on the contract ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 51:43). For most everyday work he reports frontier-only (Opus / GPT-5.6) as the current equilibrium — "I don't have time to fix Sonnet's work" — while noting enterprise guidance is often "Opus for planning, Sonnet for implementation" and the *inverse* (cheap planner as sparring partner, expensive implementer to cover edge cases) is also live when planning is the personal-thinking layer ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 51:24–53:55). Model-specific prompting is part of the cost calculus: GPT is literal, Opus expansive, and HumanLayer had to maintain per-model prompt sets after Codex returned a 200-bullet line-by-line dump under the same prompt where Claude wrote readable docs ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 58:11–59:27).

## August 2026: The 2–3× Calibration as a System Test

The Wortmann interview (August 2026) is the most explicit calibration Dex has given of the whole system above — and a test of whether its pieces cohere.

> "You can get 99% of human-quality code, like very good code as if you had written every character by hand, but two to three times faster. You can't get 10×. It can't be done. Not today." ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 0:21)

The claim is not that 10× is impossible in principle but that it is *scoped* to very verifiable domains (Bun's Zig→Rust rewrite with tens/hundreds of thousands of unit tests; compilers and Ralph-style loops with checklist oracles) while everyday production work — where you are discovering what to build as you build it — tops out at 2–3× if you hold the quality bar ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 45:15, 17:28, 36:36). The talk sharpens each layer:

- **Spec layer:** "I don't give two damns how your spec is shaped. It should give you leverage" — a 200-line markdown you can re-steer beats 2,000 lines of code you have to re-read; architecture docs alone still produce leaky abstractions and tramp data, so the missing layer is *program* design (interfaces, test seams, DI), with front-end React as the current failure case ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 0:00–0:15, 14:33–16:08). Tactical specs belong in a symlinked side-repo (Git as S3, every write pushes) and are archived when shipped — not checked into the working repo — so they never acquire the "final, approved" cost that makes rewinding expensive ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 33:21–35:02).
- **Context layer:** The dumb-zone heuristic tightens to warnings at ~100k for 200k-window models and ~200k for 1M-window models, but the human-visible tell is behavioral — the model starts "struggling to get tests to pass" and trying weird fixes ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 1:01:17–1:03:56). Compaction now preserves every user message verbatim and remains greppable, which improves it but does not replace an editable markdown handoff. Subagents are recast as map-reduce and as an RLM mode (subagents calling subagents, e.g., CI watch loops isolated per context). See [[fresh-context-subagents]].
- **Factory/bottleneck layer:** Token-maxing and "15 parallel goal Codex loops doing jack shit" is reframed as the *exploration* phase ("AI psychosis") — useful to go into deliberately, then pull back from. The Goldratt gloss is that maxing utilization of one station is the 1960s/70s MBA mistake; the bottleneck is the end-to-end factory (spec → code → review → test → prod → user feedback), not one node's throughput ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 11:23–12:17, 44:26). The bitter-lesson slide — new model blows half your context-engineering work away, then you do more — is why "waiting for GPT-7" is not a strategy ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 5:27–7:13).
- **Quality gate:** The permission-to-ship-slop warning is starker: "I think abandoning code quality and system quality, giving engineers permission to ship slop ... is going to collapse your codebase into ash much faster than you think" ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 0:52–1:01, 48:03) and "if you don't care about it you will be throwing it out in six months" ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 1:42). The mechanism is the same dark-factory story: verifiable domains forgive lights-off; production software with users does not.

> [!note] Synthesis: The 2–3× Number Is the System's Readout, Not a Bet on Models
> The 2–3×/99% figure only makes sense as the joint product of *all* of the above — disposable tacticals, program-design leverage, Smart Zone compaction, map-reduce subagents, and a routing layer that knows when not to down-tier. The synthesis the wiki draws is that the number is a *system* calibration: the same model set yields slop at token-harder utilization and 2–3× at token-smarter leverage, so the delta is not model intelligence but harness and process design. This is the thread-level claim the newer sources support; no single source states it in this compact form.

## Tensions

Dex's worldview is load-bearing for this wiki, but it is not the consensus. The disagreements are themselves evidence and must stay visible.

> [!warning] Attribution correction: who coined "context engineering"
> Earlier wiki pages credited "Jeff Huber (Chroma CEO)" as context engineering's co-creator. **No `raw/` source clearly identifies Jeff Huber** (the only 'Jeff' token in the corpus is an ambiguous aside in the Chroma transcript at [0:46]). Dex himself names the three people associated with the term as **himself, Toby Lütke (Shopify), and Andrej Karpathy** — Lütke and Karpathy popularized it in the weeks after Dex's *12 Factor Agents* factor on owning your context window ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 19:43). The "Jeff Huber" attribution has been removed as unsourced.

> [!note] Departure: Spec-driven development
> Dex is markedly more skeptical of [[spec-driven-development|SDD]] than the wiki's SDD pages (some of which are bullish). His verdict: outside maintenance/migration work, SDD "didn't really work"; the intractable problem is that specs and code become two sources of truth and drift, and nobody has found maintaining parity worth the effort — better to treat the code as the only source of truth and regenerate specs live each time. This tensions [[intent-to-code]]'s plan-as-contract position and the [[spec-code-triangle]]'s bidirectional-sync hope.

> [!note] Departure: Planning as leverage
> The [[the-agent-workflow|agent-workflow]] and [[plan-vs-review]] threads treat upfront planning as the highest-leverage stage ("5 minutes of planning saves 30 minutes of reviewing"). Dex's RPI retrospective complicates this: his own detailed plans gave *anti-leverage* by doubling review surface. The reconciliation is nuance — planning is leverage when it produces a *steerable, disposable* artifact (current state / desired end state / design questions), and anti-leverage when it tries to specify every line of code in advance. [[plan-disposability]] is the resulting synthesis.

> [!note] Departure: "Stop reading code"
> A wiki source literally titled *Stop Reading Code, Start Understanding Systems* argues for shifting from line-reading to systems-level understanding. Dex is the counter-voice with primary evidence: he tried the lights-off version and it collapsed in ~4 months. The two aren't fully contradictory — "stop reading every line" ≠ "stop reading code entirely" — but Dex's failure account is the empirical floor that any "stop reading code" claim has to clear.

> [!note] Departure: No-Code-Review vs. the Lights-Off Failure
> [[vibv|Vaibhav Gupta]] (Boundary) reports shipping a programming language for 3+ years under a **no-code-review regime** ([`raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md`](../raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md)) — the surface-level twin of the [[dark-factory]] Dex built and shut down. The wiki's resolution: the human lever is a **reading policy, not a reading volume** — Vaibhav's team reads design docs (shipped design docs must actually be read), inspects agent transcripts with human triage (real vs. hallucinated vs. no-taste issues), and enforces dependency-graph invariants via CI, so reading occurs at the design and architecture layers even though no code-review pass exists. The dark factory failed where *no reading occurred at any layer*. The counterexample is bounded: a single founding team in a compiler domain whose invariants are unusually machine-checkable. See [[the-human-lever]] → Review-Less Design Authority.

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md` — The "No Vibes Allowed" talk (AI Engineer Code): vibes-vs-engineering, the context gap for complex codebases, correctness-over-completion verification, Cody's high-fidelity context approach, and the Research → Propose → Verify → Refine loop. (Filed as a key-points stub, not a full transcript.)
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — The originating context-engineering interview: information-per-token density, model intuition, markdown-as-storage, evals.
- `raw/yt-context-engineering-with-dex-horthy.md` — The Pragmatic Engineer interview: the deabstracting definition, two budgets, Smart/Dumb Zone physics, RPI retrospective, slow loops, the lights-off factory failure, token-harder/smarter, Martin Fowler's inner/outer harness, the HumanLayer product, the NATO-1968 software-factory history.
- `raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md` — [[vibv|Vaibhav Gupta]] (Boundary): the no-code-review regime as the surface-level twin of the dark factory; the wiki's reading-policy-not-reading-volume resolution and its single-team/compiler-domain bounds. Solo talk; attribution direct.
- `raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md` — The 2–3× at 99% ceiling and the 10× impossibility ([0:21]), spec-as-leverage ([0:00]) and program-vs-system design with React weakness ([14:33]–[16:08]), tactical side-repo storage ([33:21]–[35:02]), token-maxing as Goldratt bottleneck error ([11:23]), the bitter-lesson slides ([5:27]–[7:13]), AI psychosis and token-maxing as exploration ([12:03]), model-specific prompting ([58:11]), context-window warnings and compaction ([1:01:17]–[1:03:56]), subagents as map-reduce / RLM ([1:04:40]), the slop-collapse warning ([0:52], [48:03]). Multi-speaker transcript with `[mm:ss]` timestamps but no per-line labels.

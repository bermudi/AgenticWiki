---
title: Fighting Slop With Slop
created: 2026-05-04
updated: 2026-08-05
sources:
  - "raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md"
  - "raw/yt-can-an-ai-out-plan-a-senior-engineer.md"
  - "raw/yt-you-need-to-read-less-code.md"
unaudited_marginal: 0
tags: [concept, tool-design, workflow, ai-engineering]
---

# Fighting Slop With Slop

> The intentional, controlled use of AI-generated code (slop) for internal tooling and non-customer-facing infrastructure — accepting disposability in the toolchain to produce higher quality where it matters. Slop is a spectrum, not a binary: the question isn't "is there slop?" but "where is the slop, and what does it buy you?"

## The Idea

The term "fighting slop with slop" originates from [[vibv|Vaibhav Gupta]]'s (Boundary / [[baml]]) conference talk titled literally *fighting slop with slop* (AI Engineer channel), preserved at `raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md`. The Boundary AI livestream about BAML's design doc process (hosted by Fib with guest [[kevin-gregory|Kevin Gregory]]) is a secondary discussion of the same system and concept. The core insight: if AI-generated code is inevitably sloppy, instead of fighting that across the entire codebase, **channel the slop into places where it doesn't matter** — internal tooling, throwaway scripts, glue code — and use that leverage to produce clean, rigorous output where it *does* matter (design docs, product code, customer-facing interfaces).

> [!note] Departure: Origin Attribution Corrected
> This page previously attributed "fighting slop with slop" to the Boundary livestream (Fib's framing, per Kevin Gregory). The primary origin is now preserved in raw form: Vaibhav Gupta's talk carries the phrase as its literal title and describes the same design-doc system and engineering practices as the livestream. The livestream itself referenced the talk ("we've done a talk on this at the AIN conference… soon on YouTube", [5:24]–[5:32]) — most plausibly this talk, though identifying "AIN" with the AI Engineer channel is the wiki's inference, not stated in either source.

Kevin Gregory frames it explicitly ([13:29]–[13:41] in `raw/yt-can-an-ai-out-plan-a-senior-engineer.md`; the same line opens the video unlabeled at [0:00]–[0:05]):

> "The key thing here is when you say fighting — this is how you fight AI slop with slop, right? You're using slop to build these internal tools that make it really easy to get a really high quality document."

The slop isn't the enemy; it's the raw material. The question is where you aim it.

## The Origin Talk: Engineering Practices at Boundary

Vaibhav Gupta describes how Boundary ships a stable programming language — "something that has absolutely no room for slop... that has to work every single time exactly the same way" — with three deliberate anti-practices:

- **No code reviews.**
- **Every engineer works in parallel.**
- **No standardization on how people use AI** — some use Claude, some Codex, some "the latest thing that they just found on Hacker News" ([1:51]–[2:04]).

"You can build incredibly complex systems without traditional systems like code reviews," provided you are "incredibly thoughtful about how your engineering team actually uses the systems under the hood" ([19:22]–[19:45]). The talk is the primary articulation of the concept; the livestream documented below is a secondary discussion of the same system.

### The Slop Definition

Vaibhav's definition is reading-relative, not quality-relative: **"Slop is just any code you don't read"** ([1:30]). Whether the code is AI-generated or hand-written is irrelevant to the definition — the question is whether anyone reads it. Two corollaries follow:

- **Slop is monotonic**: "this is the least amount of slop that your code base will ever have. Cherish it" ([1:35]–[1:39]). Code only accumulates; it never un-accumulates.
- **Containment is a reading policy**: the team decides explicitly which regions get read and which are permanently unread — "Nope, that's too much slop. Let's let that be slop" ([10:21]–[10:25]) — instead of pretending all code is read.

### The Invariant Toolchain

The anti-practices are backed by four concrete mechanisms, each substituting for a piece of the review machinery:

1. **`architecture.md` instead of `CLAUDE.md`** — deliberately model-agnostic ("pick something that every model can just understand"), "incredibly small," and restricted to facts that "will not change for months or for years" (in Boundary's case, the layers of the compiler). Agents are also instructed to "talk to at least one other person" before acting — a cheap social check that slows the agent down ([2:04]–[2:33]).
2. **Design docs as the human output** — "Code can be slop, writing cannot" ([2:46]). The design-doc tool (versioning, commenting, Slack notifications, markdown-backed with simple CLI scripts so agents can participate) initially failed: the founder hit "a little bit of AI psychosis" and shipped 10 design docs a day until "the team was fighting my slop" ([3:39]–[3:46]). The fix was not more tooling but the **last rule**: "if you're going to ship a design doc, you require people to actually go read it" ([3:48]–[3:58]). The reading requirement is what restored high quality.
3. **Dependency-graph invariants** — a tool visualizing the dependency graph with semantic boundaries, plus CLI tools that "guarantee that certain invariants can't be broken"; CI/CD and git commit history show exactly where a leaky dependency breaks ([4:00]–[4:36]). Boundary reports the architecture unchanged for the last 3–4 months.
4. **Agent-transcript inspection as review** — agents constantly generate BAML programs from scratch; humans and agents inspect full Claude transcripts for what was good and bad — not just incorrectness but trajectory inefficiency ("what took three tool calls when it should have only taken one"). Humans triage issues into real / hallucination / "don't have taste," agents create and apply fixes, and language features are **AB-tested** by tool-call count, error rate, and outcome correctness — "you can start building data-driven systems without ever writing a single line of code" ([5:05]–[6:20]).

### Trust, Not Review

"Code is a matter of trust" ([17:15]). The team ships without reading code because the systems underneath are rigid enough to be trusted — the same way "many of us probably don't know how compilers work under the hood, and we trust them." The corollary: we don't yet trust ML code because "the systems underneath them don't have enough rigidity" ([17:15]–[17:26]). Rigidity is the substitute for reading.

### The Failing Foundation

The talk closes with a pessimism that bounds the concept: even if Boundary wins the battle, "we're still going to lose the war" ([7:07]–[7:13]), because the foundations themselves carry slop. TypeScript's stated design goal — striking a balance between correctness and productivity — is really *human* productivity; `sort` casts to strings — "this is just slop baked into the language, whether you like it or not" ([8:15]–[8:17]) — and the slide's second example ([8:19]–[8:30]), which the wiki reads as the `any` escape hatch, is slop in the same sense. JavaScript's layering (CoffeeScript → TypeScript → …) patches a substrate that is "already broken" ([8:44]–[9:01]). The ask: **a new Git, a new database, and a new programming language**, designed from first principles for a world where agents write the code ([20:55]–[21:11]). See [[the-slop-problem#Foundation-Layer Slop: The Language Itself]] for the thread-level treatment.

## The BEEPs Case Study

The Boundary ML team built a complete design doc system called **BEEPs** (BAML Enhancement Proposals) — a markdown-based system with a custom web UI for browsing, commenting, and versioning design docs, integrated with Slack for notifications, and a CLI for syncing local markdown with the web system. The toolchain is AI-generated, and — per the maintainer's own account ([14:11]–[14:33] in `raw/yt-can-an-ai-out-plan-a-senior-engineer.md`) — he says he has never read a line of it ("I don't think I've ever looked at the code in the beeps folder"):

> "I have never even opened Claude myself to add features into beeps because it's not worth it."

Features are added by tagging coding agents on Slack. "Fib" (likely the transcript's garbling of [[vibv|Vibv]] himself, who introduces himself as working on BAML at [2:36]) says he doesn't think he has ever read the code and describes it as "a pure AI slop mess." The code is effectively disposable — the maintainer has never needed to read or maintain it. The entire system is treated as means-to-an-end infrastructure.

And yet the output of this disposable toolchain is remarkably thorough design docs with: explicit design decisions called out one-by-one, subpages for prior art, version snapshots instead of in-place edits, cross-references to other BEEPs, code examples across multiple languages, and explicit scope boundaries ("what we're NOT doing").

The tradeoff: extreme slop in the tooling → high quality in the design doc that ultimately gets implemented.

## Contrast: Existing Slop Narratives

The existing wiki consensus ([[the-slop-problem|The Slop Problem thread]]) treats slop as uniformly harmful — code that rots the codebase, compounds into technical debt, and accelerates software entropy. "Fighting slop with slop" introduces a productive tension:

| Frame | Slop is... | Response |
|-------|-----------|----------|
| The Slop Problem | A threat | Backpressure, verification loops, deliberate friction |
| Fighting Slop With Slop | A resource | Channel it where damage is contained, reap quality where it matters |

These aren't contradictory. They're the same principle applied at different scopes: **containment**. The existing thread argues for containing slop's damage through engineering discipline. The fighting-slop-with-slop approach argues for containing slop to a bounded, disposable context so it doesn't infect the valuable output.

The same containment principle appears in [[mario-zechner|Mario Zechner]]'s practice: he accepts slop in [[pi|Pi]]'s HTML export (which he has never read) but guards the agent loop through deliberate, repeated engagement. The BEEPs workflow extends this principle to organizational scale — an entire team's design doc toolchain is the "HTML export," and the design docs themselves are the "agent loop."

## Risks

The approach is not without failure modes:

- **Creep**: Slop tooling that was supposed to be disposable becomes institutionalized. Features get requested, hacks pile on hacks, and suddenly the tooling needs maintenance that nobody wants to do. The origin talk documents this failure mode first-hand — the founder's "AI psychosis" (10 design docs/day) — and its named countermeasure: the requirement that shipped design docs actually get read ([3:39]–[3:58]). The reading rule, not more tooling, is what re-contained the creep.
- **Verification contagion**: If the AI-generated tooling produces incorrect output (wrong diffs, corrupted versions), the design docs themselves degrade. The disposable tooling must still be *observationally correct* even if its internals are garbage.
- **Team friction**: If a human eventually *does* need to understand or fix the tooling (unexpected scaling, security issue), the lack of any intentional design makes the fix expensive. The bet is that this never happens — a bet that may not hold at scale.
- **Sunk cost**: The easier it is to add features via agent tags, the more features accumulate. The tooling grows in scope while staying sloppy, until replacing it becomes as painful as maintaining it.

## Slop as Verification Infrastructure

[[theo-t3gg|Theo (t3.gg)]] extends the fighting-slop-with-slop principle beyond disposable tooling to the **verification layer** of critical code. His argument: if your code is so important that every line must be verified (bankruptcies, deaths, stopped hearts), you should be writing an "unbelievable amount of slop" — not for production, but to verify the production code.

This is fighting slop with slop applied to the most important tier of code, not the least. Where the BEEPs workflow channels slop into disposable tooling that generates high-quality design docs, Theo's approach channels slop into verification infrastructure (custom debuggers, test harnesses, runtimes, logging systems, lint rules) that guards the critical production code. The principle is the same: accept disposability where it doesn't matter (the verification code) to produce reliability where it does (the production code).

> [!note] Synthesis: Source-bridging framing
> Theo does not reference "fighting slop with slop" or the BEEPs workflow. The connection between his verification-slop argument and the fighting-slop-with-slop principle is the wiki's analytical synthesis — both argue for channeling slop into non-production contexts to improve critical output, but neither source states the bridge. The tier C / tier D mapping, by contrast, is Theo's own vocabulary ([21:25-21:38] in the transcript).

> "Every line of code that goes in should have 100 lines of slop verifying it. Every line that goes in should have 10,000 lines of code of slop that you can use to verify the system."

The containment is now at the **tier boundary**: slop lives in the verification layer (tier C), production code lives in the critical layer (tier D). The verification slop is disposable — it doesn't ship, it doesn't merge, it exists only to test and probe the production code. But it must be *observationally correct* — if the verification code is wrong, the production code's safety is illusory.

> [!note] Departure: Slop as the Verification Budget
> This reframes the slop problem's speed-review asymmetry. The wiki's existing framing says: "AI generates faster than humans verify." Theo's position, compressed: verify by generating more code rather than by reading every line — while still hand-verifying what you did before. The human's job shifts from reading every line to designing verification systems that AI populates with slop. This is the [[fighting-slop-with-slop]] principle inverted: instead of channeling slop *away* from important code, you channel it *toward* important code as a verification shield. See [[the-human-lever]] for the broader implications on where the human lever applies.

## Thread

- [[the-slop-problem]] — Fighting slop with slop introduces a productive tension into the thread's claim that slop is uniformly harmful
- [[the-human-lever]] — The BEEPs workflow is a concrete case study of the human owning design boundaries while AI generates the infrastructure around the design process

## Related

- [[vibv]] — The originator of the concept; Vaibhav Gupta's AI Engineer talk carries the phrase as its title
- [[baml]] — The programming language whose design process motivated the concept; the invariant toolchain is BAML's own engineering practice
- [[slop]] — The general concept, now with an internal-vs-external dimension
- [[slop-watch]] — The observability approach to measuring slop; fighting slop with slop is a complementary production-side strategy
- [[the-slop-problem]] — The thread that documents the threat; this concept documents the controlled-use case
- [[verification-loop]] — The BEEPs workflow complements the verification loop: the design doc is the verification target, the tooling is the throwaway means. Theo's verification-as-slop argument extends the loop with a generation step.
- [[plan-vs-review]] — The 50%+ design time allocation in the BEEPs workflow empirically validates the plan-heavy approach
- [[ai-design-loop]] — The BEEPs workflow is a structured ai-design-loop applied at organizational scale
- [[the-human-lever]] — Theo's verification-as-slop argument reframes where the human lever applies: design verification systems, not read every line
- [[theo-t3gg]] — Author of the verification-as-slop extension
- [[kevin-gregory]] — Co-articulator of the concept (Boundary livestream); AI engineer at EvolutionIQ

## Sources

- `raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md` — Vaibhav Gupta's AI Engineer talk, the origin of the phrase: the engineering triad (no code reviews / parallel work / no AI standardization), the "slop is any code you don't read" definition, the architecture.md invariant file, the design-doc reading rule, dependency-graph invariant tooling, agent-transcript inspection and AB-testing of language features, the trust-not-review argument, and the "lose the war" foundation-layer critique
- `raw/yt-can-an-ai-out-plan-a-senior-engineer.md` — Full discussion of the "fighting slop with slop" concept, the BEEPs design doc workflow, and the threading design process
- `raw/yt-you-need-to-read-less-code.md` — Theo's extension of the principle to the verification layer: if your code is important, write more slop to verify it (custom debuggers, test harnesses, runtimes); the flipped read:generate ratio as the motivation

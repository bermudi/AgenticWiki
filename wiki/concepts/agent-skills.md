---
title: Agent Skills
created: 2026-05-04
updated: 2026-07-19
sources:
  - raw/yt-what-ai-agent-skills-are-and-how-they-work.md
  - raw/skill-issue-supabase-pedro-rodrigues.md
  - raw/skills-at-scale-workos-nisi-proser.md
  - raw/2407.08440v4.md
  - raw/2605.18747.md
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
  - raw/yt-building-great-agent-skills-the-missing-manual.md
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
  - raw/yt-mattpocockskills-learn-the-whole-flow-end-to-end.md
  - raw/agentskills-specification.md
  - raw/skill-creator-skill.md
tags: [concept, agents, skills, procedural-knowledge, progressive-disclosure]
unaudited_marginal: 0
---

# Agent Skills

> A skill is a `skill.md` file in a folder that teaches an AI agent procedural knowledge — how to execute specific workflows, tasks, or jobs. Skills use progressive disclosure (metadata → instructions → resources) to stay context-efficient, and the format is an open standard adopted across [[claude-code|Claude Code]], OpenAI Codex, and other major platforms.

## The Problem Skills Solve

LLMs are strong reasoners with extensive semantic knowledge (they know facts like Kubernetes architecture or SQL history), but they **lack procedural knowledge** — the step-by-step "how" of executing work. Without skills, an agent facing a task like generating a compliant financial report has two options:

1. Be prompted with every step (all 47 of them), every single time
2. Guess at the procedure, which introduces errors

Skills fill this gap by providing the procedural knowledge as a reusable, version-controlled file.

## Format

A skill is deceptively simple: a `skill.md` file inside a folder.

### Minimum structure

```yaml
---
name: Skill Name
description: When to use this skill, what it does, and the trigger condition
---
```

- **name** — Identifies the skill (mandatory)
- **description** — Tells the agent what the skill does and **when to apply it** — this is the trigger condition (mandatory)
- Optional frontmatter: the open spec defines `license`, `compatibility`, `metadata`, and experimental `allowed-tools`; clients and individual skills add others (e.g. `author`, `version`) — none are mandatory.

Below the frontmatter, the body contains the step-by-step instructions, rules, examples, and output format — all in plain markdown. Whatever the agent needs to know to do the job.

### Optional directories

| Directory | Contents |
|---|---|
| `scripts/` | Executable JavaScript, Python, or bash scripts the agent can run |
| `references/` | Additional documentation loaded on demand |
| `assets/` | Static resources like templates and data files |

## Progressive Disclosure

Skills use **three-tier progressive disclosure** to keep context windows lean even with hundreds of installed skills:

- **Tier 1 (metadata only)**: At startup, the agent loads only the `name` and `description` from each skill — a handful of tokens per skill. This is the table of contents.
- **Tier 2 (full instructions)**: When the agent encounters a task matching the skill's description, it reads the complete `skill.md` body into context. The matching happens through the LLM's own reasoning, which is why a good description is critical.
- **Tier 3 (resources)**: The optional directories (`scripts/`, `references/`, `assets/`) are loaded only when a specific task needs them.

This keeps overhead minimal: a lightweight index at startup, detailed instructions only when relevant, and resources at the point of need.

## Knowledge Type Comparison

Skills serve a distinct role in the knowledge ecosystem for agents:

| Method | Provides | Limitation |
|---|---|---|
| **MCP** (Model Context Protocol) | Tool access — ability to call external APIs and services | Doesn't tell the agent when or how to use the tool |
| **RAG** (Retrieval Augmented Generation) | Factual knowledge — retrieves relevant chunks from a knowledge base | Reference material, doesn't teach how to do something |
| **Fine-tuning** | Knowledge baked into model weights | Permanent but expensive; must be redone when the model changes |
| **Skills** | **[[procedural-knowledge|Procedural knowledge]]** — how to do things, in what order, with what judgment | Designed for repeatable workflows, not open-ended fact retrieval |

In practice, skills compose with other forms. MCP provides the reach (call an API), and the skill provides the judgment (when to call it and what to do with the response).

## Cognitive Science Analogy

Human memory has three distinct types:

| Human Memory | Agent Architecture |
|---|---|
| **Semantic** (facts — "Rome is the capital of Italy") | RAG, knowledge bases |
| **Episodic** (experiences — "I went to Rome last summer") | Conversation logs, interaction history |
| **[[procedural-knowledge|Procedural]]** (skills — "how to ride a scooter") | **Skill files** |

Agent architectures are starting to mirror this cognitive taxonomy. Skills are procedural memory for agents.

## Open Standard

The `skill.md` format is an open standard, originally developed by Anthropic and now stewarded by a cross-vendor ecosystem (canonical spec repo: `agentskills/agentskills`; see [[agentskills]]). It was adopted across major AI platforms including [[claude-code|Claude Code]] and OpenAI Codex, and a skill built for one platform works on any spec-compatible client. The concrete file format — frontmatter field constraints, the three-tier progressive-disclosure budget, `skills-ref` validation — is covered on [[skill-md]].

> [!note] Departure: standard home and mandatory fields
> This page previously cited `agent-skills.io` as the standard's home and Apache 2.0 as its license. The current canonical source is the `agentskills/agentskills` repository. The open spec mandates only two frontmatter fields — `name` and `description`; `allowed-tools` is experimental, and `disable-model-invocation` (used by user-invoked skills such as Pocock's set) is a client-specific extension not in the open spec.

## Skill Design Craft

Nick Nisi and Zack Proser (WorkOS) articulate the craft of writing effective skills — the difference between a skill that helps and one that gets in the way.

### Constraints Over Prescription

The most powerful skill-design insight: **provide constraints, not step-by-step instructions**. Tell the agent what *not* to do, what conventions to follow, what boundaries to respect — and let the LLM determine the right approach at runtime. Overly prescriptive skills produce worse results because they constrain the model's native competence.

> Closing off the solution space is more effective than prescribing the path through it.

Example: instead of "run `git log --format=...` then pipe through `awk` then..." write "never present a finding without git evidence backing it; we follow conventional commits." The model figures out the mechanics.

### Script Interpolation

Claude Code supports a `!` backtick pattern that executes a command and interpolates the deterministic result directly into the prompt. Instead of "go find the latest commits and analyze them," write:

```
Here are the latest 10 commits:
!`git log --oneline -10`

Analyze them for...
```

This saves tokens (no spinning on git docs), eliminates guesswork, and ensures the agent starts from a deterministic base every time. Ideal for injecting real data — git status, file listings, API responses — before the LLM reasoning begins.

### Confidence Scoring in Skills

Skills can include a confidence rubric that forces the agent to verify it understands the task before executing. Nisi's ideation skill defines five dimensions (problem clarity, goal definition, success criteria, scope boundaries, consistency) scored 0–100, and refuses to proceed until confidence exceeds 95%. This triggers a clarifying dialogue: the agent asks targeted questions instead of guessing.

> The math isn't airtight. The value is in the iterative loop of clarifying your own thinking by responding.

The same pattern applies to skill execution: "after analyzing the repo, score your confidence that you identified all stale TODOs — if below 80%, re-scan."

### The Anti-Pattern: Over-Prescription

Nisi discovered through evals that his Next.js installer skill was making Claude **30% less accurate**. The model was already competent with Next.js; his dogmatic instructions were overriding its native knowledge. The skill made things worse.

> [!warning] A skill can make the agent worse
> Not every workflow needs a skill. If the model already handles a task well, a skill can degrade performance by being too prescriptive. Always eval with vs. without.

## Skill Efficacy vs. Popularity

The same progressive-disclosure pattern that makes skills efficient also makes them dangerous: because the description is always loaded, a bad skill pollutes every session. [[kun-chen|Kun Chen]] makes the stronger claim that popularity is not a proxy for efficacy. The "Android Skills" repository has 177,000 GitHub stars, but a Program Bench evaluation of one skill found it made the agent use **5% more tokens and produce worse results**. The stars measure viral spread, not measured benefit. Kun's rule: do not install a skill that claims to "magically make your agent perform better" unless it has published rigorous eval evidence. See [[skill-efficacy]] for the full treatment.

This is why the "constraints over prescription" principle matters: skills should fill gaps in the model's knowledge, not replace its competence.

## Pocock's Skill Design Checklist

[[matt-pocock|Matt Pocock]] ("Building Great Agent Skills: The Missing Manual", AI Engineer World's Fair 2026) proposes a four-part rubric for distinguishing good skills from bad — the proposed exit from [[skill-hell]]. The checklist is sequential: trigger → structure → steering → pruning. Each part names a design decision and a failure mode.

### 1. Trigger — User-Invoked vs Model-Invoked

Every skill can be invoked two ways:

- **User-invoked**: The user explicitly tells the agent to load the skill (e.g. `/skill-name`). The skill's description is visible only to the user, not the agent. Marked in Pocock's skills with `disable_model_invocation: true`.
- **Model-invoked**: The skill's `description` ends up in the agent's context window as a *context pointer*. The agent reads the description and decides whether to load the full `skill.md` body. This is the progressive-disclosure tier-2 transition.

The tradeoff is a load-shift between two finite resources:

| Invocation mode | Cost imposed |
|---|---|
| Model-invoked | **Context load on the agent** — every model-invoked skill's description occupies tokens on every request; 100 model-invoked skills = 100 descriptions in context. Also introduces *unpredictability*: the model may choose not to invoke a skill even when it's perfect for the task, which forces evals to verify skills fire at the right time. |
| User-invoked | **Cognitive load on the user** — the user must know the skill exists, know when to invoke it, and remember to do so. The agent's context stays lean, but the pilot must hold more in their head. |

Pocock prefers user-invoked skills (his `matt-pocock-skills` repo) because removing the unpredictability class — "the model may just choose not to follow the context pointer" — eliminates a whole category of eval burden. He contrasts this with `superpowers`, a primarily model-invoked skill set that gives the agent more autonomy at the cost of context load and invocation unreliability.

> [!note] Synthesis: the load-shift is the design decision
> The trigger choice is not "which is better" but *which load you are willing to bear*. Model-invoked shifts load to the agent's context and to eval infrastructure; user-invoked shifts load to the user's memory and discipline. The right answer depends on which failure mode is cheaper to detect and correct in your environment.

### 2. Structure — Steps, Reference, and Branches

A skill's internal layout has two main units:

- **Steps** — the step-by-step procedure the skill walks through.
- **Reference** — supporting information that helps the agent execute the steps (templates, definitions, examples).

Skills can be all-steps, all-reference, or both. Pocock's `2prd` skill: three steps (find relevant context → confirm test seams with the user → write the PRD) plus two reference items (what is a test seam; the PRD template).

The structural constraint is **make `skill.md` as small as possible**. Smaller skills are easier to maintain, easier to audit, and cheaper in tokens — every word shaved is a token shaved on every invocation. The technique for achieving this is **branch-aware reference placement**:

- Identify the *branches* of the skill — the distinct ways it can be used.
- Reference material needed on *every* branch belongs in `skill.md`.
- Reference material needed on only *some* branches is moved behind a **context pointer** to a separate markdown file inside the skill folder (an *external reference*). The agent pulls it only when that branch fires.

Pocock's `domain-modeling` skill has two-or-three branches (update `context.md`, create an ADR, or do neither). The ADR template and the `context.md` template are external references — pulled only when the corresponding branch fires. The `2prd` skill has one branch, so all its reference material stays in `skill.md`.

This is progressive disclosure applied *within* the skill: the skill.md is tier 2, external references are tier 3.

### 3. Steering — Leading Words and Leg Work

Once the skill fires and is loaded, the problem is getting the agent to *do what the skill says*. Pocock identifies two steering levers:

**Leading words** (see [[leading-words]] for the full treatment): pack the desired behavior into a short, dense phrase and repeat it throughout the skill. The agent echoes the phrase in its reasoning traces, and the repetition shapes behavior. "Vertical slice" is the canonical example — the phrase triggers the model's prior on vertical-slice development without the skill having to spell out the full doctrine. The verification signal is built in: if the reasoning traces say "we're going to do this as a thin vertical slice", the leading word took; if they show layer-by-layer planning, it didn't.

**Leg work via hidden future goals**: when an agent can see the ultimate goal of a multi-step skill, it tends to under-invest in the current step — it does the minimum on step 1 to get to step 2. Pocock's `plan-mode` example: an "ask clarifying questions → create a plan" two-step skill produces shallow clarifying questions because the agent can see the plan is the real goal and rushes toward it.

The fix is to **split the skill so the agent only sees one step at a time**. Pocock split plan-mode into two separate skills: `grill-with-docs` (the clarifying-questions phase) and `2prd` (the planning phase). When `grill-with-docs` runs, the agent's only visible goal is asking good questions — it cannot rush to a plan because the plan step is in a different skill it cannot yet see. Hiding the future goal increases leg work on the current step.

> [!note] Departure: split skills vs. single-skill multi-step
> This is a departure from the default progressive-disclosure pattern where one skill contains a full multi-step procedure. Pocock's split-skill technique trades skill-count for step-focus: more skills to manage, but each step gets the agent's full attention. The technique is not always necessary — it is reserved for steps where extra leg work is critical.

### 4. Pruning — No-Ops, Sediment, Single Source of Truth

The final pass removes what does not work. Three failure modes:

- **No-ops**: Skill content that appears to do something but does not actually influence agent behavior. Pocock's deletion test: if you removed this paragraph, would the agent behave differently? A paragraph instructing the agent to "write a long detailed commit message" is likely a no-op — the agent would write a decent commit message anyway. Most no-ops accumulate when agents write skills (the agent-author pads the skill with plausible-sounding instructions that have no behavioral effect).
- **Sediment**: Material that accumulates in a shared markdown file as multiple people contribute, nobody feels brave enough to delete anyone else's additions, and the skill grows irrelevant or stale content. The cure is structural: check each addition against the skill's branches, move branch-specific material behind context pointers, and kill dead material outright.
- **Duplication / no single source of truth**: The same reference material (a template, a definition) repeated across multiple places in the skill. Each part of the skill should have a single source of truth; cross-reference rather than copy.

Massive skills are usually a *symptom* of one of these failure modes, not a primary problem. Pocock attributes the smallness of his own skills to relentless application of deletion tests, compaction into leading words, and sediment removal — not to writing less in the first place.

### The Full Sweep

The checklist applied to a skill in order:

1. **Trigger** — is it firing at the right times? Are we imposing context load (model-invoked) or cognitive load (user-invoked)?
2. **Structure** — branches identified? Steps and reference separated? Branch-only reference moved behind context pointers? `skill.md` small?
3. **Steering** — leading words chosen and repeated? Visible in reasoning traces? Leg work adequate, or should the skill be split to hide future goals?
4. **Pruning** — no-ops deleted via deletion test? Sediment removed? Single source of truth enforced?

## Skills as a Flow: The `mattpocock/skills` Set

The checklist above treats a skill in isolation. The [[mattpocock-skills]] repo (`mattpocock/skills`) is the empirical demonstration that the user-invoked tradeoff scales to a *full workflow* — 38 skills chained across an idea-to-ship pipeline, with a combined context footprint of ~660 tokens. The mechanics that make this work are flow-level, not skill-level:

### User-Invoked as a Flow Property

The whole set is `disable_model_invocation: true`. The user calls each skill with `/skill-name`; the agent never decides which skill fires next. This is not just a per-skill choice — it is the property that keeps the aggregate footprint bounded. If even a handful of skills were model-invoked, the description of every matching skill would compete for context on every request, and the bounded footprint would collapse.

The deeper claim this demonstrates: **progressive disclosure scales when the disclosure is gated by the user, not the model.** The 38-skill footprint is achievable because the agent never holds all 38 descriptions in its working context. The user holds the next-skill decision in their head, and the agent sees only the current skill's body.

### Subagent Code Review as a Skill Boundary

The `implement` skill does not run code review itself. It dispatches the `code-review` skill into a subagent and waits for the result. The boundary is deliberate: "if you do it in the main agent, it means that the main agent already has written the code and agents are often really bad at editing code or improving code they've just written." The subagent's fresh context is the audit mechanism. See [[fresh-context-subagents]] for the general principle and [[spec-code-triangle]] for the broader separation-of-concerns argument.

### Skill Decomposition as a Cognitive Lever, Not Just a Context Lever

`plan-mode` was one skill with two steps (grill then plan); the agent under-invested in grilling because it could see the plan as the real goal. The fix was not to improve the skill's instructions — it was to **split the skill into two** (`grill-with-docs` and `2prd`). Splitting the skill is a cognitive lever: each skill now owns a single visible goal, and the agent cannot rush to the next step. The full treatment is in [[leading-words]] and the [[ai-design-loop]] → Split-Skill Technique section.

> [!note] Synthesis: Skills as Orchestrator
> The set is not a library the agent browses; it is an **orchestrator the user conducts**. The user picks the next skill, decides whether to fork to `to-spec` after grilling, decides how many tickets to run before clearing context. The agent never decides which skill fires next — that decision lives outside the agent's context. This is a different design point from the [[multi-tier-action-space]] tool layer (which the agent *does* navigate), and it is the architectural reason 38 skills cost only 660 tokens. The cognitive load on the user is the price; the context load on the agent is the budget.

## Skills in Production

Pedro Rodrigues (Supabase AI tooling engineer) provides operational lessons from two months of writing skills for a production product.

### Skills as Documentation

Treat skills the same as any other documentation artifact: version them, keep them updated, and include them in your agents.md / claude.md workflow so that changes to the product trigger skill updates. If a feature changes, the skill describing it must change too — same discipline as keeping docs current.

> A skill is a prompt template that changes agent behavior on demand. Treat it as documentation that happens to be executable.

### Skill Discoverability

Progressive disclosure relies on the agent deciding *when* to load a skill based on its description. Rodrigues found that starting the description with the verb **"use"** significantly increases the probability of the skill being loaded (at least with Claude). Example: `description: Use when creating or modifying database views in Supabase to apply security best practices...`

When a skill must fire, there are two explicit mechanisms: (1) the `/skill-name` slash command in Claude Code, or (2) including "use skill-name" in your prompt. These guarantee loading. For less critical skills, iterate on the description through testing to find what triggers reliably.

### Eval-Driven Development for Skills

Skills need testing. Rodrigues adapts OpenAI's "systematically evaluate agent skills" framework into a simple EDD (eval-driven development) cycle:

1. **Define metrics** — what does "good" mean for this skill?
2. **Write the skill** — skill.md + optional scripts/references
3. **Test (manually first, then automated)** — run the same task with and without the skill
4. **Grade** — compare outputs; did the skill change behavior as intended?
5. **Iterate** — refine the skill based on results

The simplest eval pipeline for a skill: run the agent with the skill loaded, run it without, diff the results. This doesn't require LLM-as-judge — it's a controlled A/B test. For deterministic assertions (was a specific flag included? was a tool called?), use scripts, not LLMs.

The [Agent Skills open standard](https://agent-skills.io) proposes an `eval.json` format that packages test cases (prompt + expected output + assertions) alongside the skill.

### Skill Rot

Skills that are no longer relevant still consume space in the progressive disclosure index (their descriptions). Rodrigues recommends periodically checking whether skills are still being loaded by users. If a skill hasn't matched in a long time, retire it. In CI, treat skills like any other artifact: keep only the ones needed for the specific project.

## Skills at Team Scale

Skills start as personal tools, but at team scale they need distribution, versioning, and curation. Nisi and Proser (WorkOS) describe the patterns that emerge.

### Sharing Tiers

Effective skill sharing stratifies into three tiers:

| Tier | Audience | Examples |
|---|---|---|
| **Public** | Anyone | WorkOS public skills repo; installed via `npx skills add` |
| **Internal** | Company engineers | WorkOS-specific skills (OAuth, SDK, internal tools) |
| **Personal** | Individual | Nisi's ideation plugin, Proser's Slack→Linear bridge |

Public skills need the most polish (they represent the brand). Personal skills can be experimental. Internal skills sit in between — shared via private repos or plugin marketplaces, reviewed but less formal.

### Plugin Marketplaces

Plugin systems (Claude Code plugins, Cursor plugins, Vercel's `skills` CLI) provide the packaging layer: versioning, installation, updates. A skill shipped as a plugin can be installed with a single command and updated like any dependency. This solves the "whose version of the frontend skill?" problem — the marketplace is the source of truth.

Non-technical distribution is even simpler: zip the skill folder, rename `.zip` → `.skill`, and anyone can drag it into Claude Desktop.

### Non-Technical Users

Skills are not just for developers. Proser's recruiting team uses Claude Desktop skills to format candidate information, build reports, and pull data from Slack/Notion — without writing code. The skill format is markdown; the interface is natural language. Blog posts, sales outreach, internal reports — any repeatable knowledge-work task is fair game.

> The power is defining the discrete work block once, then sharing it with anyone who needs it — engineering, sales, recruiting, docs.

### Skills Driving CLIs

WorkOS's own CLI is a thin wrapper around skills. The `workos install` command uses the Claude Agent SDK behind the scenes; all the intelligence — what frameworks to detect, what migration guides to load, what OAuth providers to configure — lives in skills. The CLI is just a distribution channel.

> Build the skill, make it good, then prove it's good by having the CLI run it.

### Context as Gold

In the pre-LLM era, failed conversations were disposable. In the agentic era, they're the richest input for skill refinement. Nisi and Proser recommend mining JSONL conversation transcripts: what did the agent get wrong? What questions did it keep asking? What was frustrating? Feed those patterns back into the skill — or ask Claude's built-in skill-creator skill to do it for you.

The full development loop: **build → use for a week → mine transcripts → refine → repeat**. Skills get better over time if you treat every failure as training data.

## Skills as the Loop's Reusable Unit

[[peter-steinberger|Steinberger]]'s general skills rule — **if you do something more than once, turn it into an automated skill**; if you do something hard, turn it into a skill afterward so next time is free — is the more durable half of the loops thesis. The article's author (Matt Van Horn) frames the consequence for loops:

> A loop with no reusable skills inside it is just a while-true around a stranger. A loop that calls a library of sharp, tested, named skills is a system that compounds.

The implication is economic as well as architectural. Loops that re-derive everything from scratch just burn money (see [[agent-loop#The Cost Shift: Loop Management Is Now the Expensive Part]]). Loops that call a library of sharp, named, tested skills compound — each captured SOP makes the next loop cheaper. This is the procedural-knowledge flywheel inside the execution harness: the [[ralph-loop|ralph loop]] or [[orchestration-loop|orchestration loop]] provides the tick, the skill provides the judgment.

## Security

Skills can include executable scripts with access to file systems, environment variables, and API keys — this is what makes them powerful but also introduces trust concerns. Audits of publicly available skills have found:

- Prompt injection
- Tool poisoning
- Hidden malware

> [!warning] Security
> Treat skill installation with the same rigor as any software dependency. Review what the skill does before running it on your local machine.

## Grounded Skill Selection and the [[harness-interface|Harness Interface]]

The [[code-as-agent-harness]] framework positions skills within the code-for-acting layer (§2.2). The survey's taxonomy of acting paradigms maps directly to how skills work:

- **Grounded Skill Selection** (§2.2.1): The agent retrieves relevant code-based skills from a skill library and executes them. Voyager (Minecraft, 2023) pioneered discoverable, verifiable, and continually growing skill libraries — the first lifelong learning agent using code as its action interface. The skill selection mechanism — pick the right skill, execute it, verify the outcome — is the same pattern whether the domain is Minecraft, robot control, or software engineering.
- **Programmatic Policy Generation** (§2.2.2): Skills can be generated on-the-fly as task-specific programs. Code-as-Policies (CaP) demonstrated LLM-generated Python functions as policies with hierarchical composition; Code-BT compiles generated programs into behavior-tree controllers that impose rule constraints via code-to-behavior-tree planning; RoboCodeX introduces multimodal, tree-structured code generation for complex manipulation and navigation. This maps to *skill creation* — the agent doesn't just retrieve existing skills, it generates new ones as needed.
- **Lifelong Code-Based Agents** (§2.2.3): Voyager's three-component architecture — automatic curriculum, skill library, iterative prompting — shows that code serves simultaneously as action, memory, and adaptation. LYRA closes the loop by converting human corrections into reusable executable skills and retrieval-augmented memory, so skills evolve from execution feedback rather than authoring alone. [[evolving-context|Evolving context]] is the same concept applied to the agent's own prompts and memories.

The survey's key insight for skill design: code-based skills are not just instruction files. Because they are executable, inspectable, and stateful, they can be verified through execution, inspected for correctness, and evolved across sessions. The skill.md format's emphasis on constraints over prescription aligns with the survey's finding that program-delegated reasoning — letting the harness execute rather than prescribing every step — is more reliable.

## Thread

- [[tool-design-for-agents]] — Skills are the procedural complement to tool access; MCP provides reach, skills provide judgment
- [[the-agent-workflow]] — Skills operationalize the "how" of agent execution within the workflow
- [[the-slop-problem]] — Skills reduce slop by replacing guesswork with defined procedures
- [[the-verifiability-thesis]] — Three of the four-part checklist's techniques are verifiability moves: leading words' trace-verification, the no-op deletion test, and user-invoked preference as unverifiability-removal
- [[the-cognitive-cost]] — The four-part checklist systematically shifts load onto the human (trigger choice, branch identification, leading-word selection, pruning); the cognitive-cost thesis flags this as demanding more judgment at the moment capacity is eroding

## Related

- [[agent-evals]] — Eval-driven development for skills: run with/without the skill, diff results, iterate
- [[skill-md]] — The concrete file format/spec this concept is built on: frontmatter constraints, progressive-disclosure budget, `skills-ref` validation
- [[agentskills]] — The open standard entity: repo, client showcase, stewardship, `skills-ref` tooling
- [[ai-design-loop]] — Skills are the tools that execute the implementation phase of the design loop
- [[context-engineering]] — Progressive disclosure is a core context engineering technique, and skills are its canonical implementation
- [[context-files]] — Skills (procedural knowledge for agents) and context files (repository context for agents) are complementary: skills say how to do things, context files say what to know about this project
- [[evolving-context]] — Skill learning (agents capturing SOPs as skills from their own trajectories) is a category of evolving context
- [[lance-martin]] — Built the skill system for Deep Agents; his work on evolving context includes skill learning
- [[pi]] — This wiki's own skill system follows the skill.md pattern
- [[malleable-agents]] — Skills being just files means agents can create and modify them, making agents self-extending
- [[multi-tier-action-space]] — Skills live on the file system tier, loaded on demand into the tool tier
- [[hallucination]] — Skills reduce hallucination by replacing guesswork with defined procedures
- [[ralph-loop]] — [[chris-parsons|Chris Parsons]] packages Ralph loops as skills: the skill provides the procedural knowledge, the loop provides the execution infrastructure
- [[chris-parsons]] — Operationalized Ralph loops as skills with recovery states, git checking, and verification rules
- [[sandcastle]] — Matt Pocock's Docker-based Ralph loop variant that uses the skill.md pattern
- [[procedural-knowledge]] — Skills are the canonical format for packaging procedural knowledge for agents
- [[inferential-rule-following]] — IRFT (Inferential Rule-Following Tuning) is structurally analogous to skills: synthetic procedural training data that generalizes across domains
- [[open-knowledge-format]] — Parallel precedent: both are minimal open format specs with reference implementations, betting that speaker count beats ownership
- [[agent-loop]] — Skills are the reusable unit a loop dispatches; the loop is plumbing, the skill is the asset
- [[peter-steinberger]] — Originator of the "skills, not loops, are the durable half" thesis
- [[leading-words]] — Pocock's steering technique: dense phrases the agent echoes in reasoning traces, shaping behavior
- [[skill-hell]] — The diagnosis Pocock's four-part checklist responds to: skills proliferate faster than evaluative capacity
- [[mattpocock-skills]] — The 38-skill repo that demonstrates the user-invoked tradeoff scales to a full workflow at 660 tokens of context
- [[agents-md]] — Complementary: context files provide *what to know about this project*; skills provide *how to do things*. AGENTS.md is the canonical context-file convention.

## Sources

- `raw/yt-what-ai-agent-skills-are-and-how-they-work.md` — IBM Technology video explaining skill format, progressive disclosure, knowledge type comparison, cognitive science analogy, and the open standard
- `raw/skill-issue-supabase-pedro-rodrigues.md` — Production operations: skills as documentation, skill discoverability ("use" verb trick), eval-driven development for skills, skill rot detection, skills+MCP complementarity
- `raw/skills-at-scale-workos-nisi-proser.md` — Skill design craft: constraints over prescription, confidence scoring, script interpolation, anti-patterns; skills at team scale: sharing tiers, plugin marketplaces, non-technical users, CLI-driven skills, context mining
- `raw/2407.08440v4.md` — RuleBench (Sun et al.): IRFT demonstrates the same pattern as skills — abstract procedural capability (rule-following) learned from synthetic data and generalized to real tasks
- `raw/2605.18747.md` — Ning, Tieu, Fu et al. (2026). Code as Agent Harness survey. Positions skills within the code-for-acting layer (§2.2); code-based skills as executable, inspectable, and stateful artifacts that can be verified through execution
- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — Steinberger's general skills rule (turn repeated work into a skill) and Van Horn's framing of the consequence: a loop calling sharp named skills compounds; a loop with no skills is a "while-true around a stranger"
- `raw/yt-building-great-agent-skills-the-missing-manual.md` — Pocock's four-part skill design checklist (trigger, structure, steering, pruning); user-invoked vs model-invoked load tradeoff; steps + reference + branches; leading words; leg work via hidden future goals; no-ops, sediment, single source of truth
- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Kun Chen: skills as progressive disclosure for conditionally-used project memory, the Android Skills popularity vs efficacy example, and the warning against installing unbenchmarked skills.
- `raw/yt-mattpocockskills-learn-the-whole-flow-end-to-end.md` — Pocock's end-to-end walkthrough of the `mattpocock/skills` repo. Establishes the empirical 660-token context footprint across 38 user-invoked skills; the subagent code review rule ("agents are bad at editing code they've just written"); the spec = destination / tickets = path framing; the per-ticket context budget enforcement. Demonstrates that the user-invoked tradeoff scales to a full workflow.
- `raw/agentskills-specification.md` — The `agentskills/agentskills` docs: directory structure, frontmatter field constraints (name/description mandatory, allowed-tools experimental), three-tier progressive-disclosure budget, `skills-ref` validation; Anthropic-origin open-standard overview.
- `raw/skill-creator-skill.md` — Local `skill-creator` skill: the build/eval loop (with-skill vs baseline), description optimization, test-case design, `.skill` packaging, and the client-specific `disable-model-invocation` field.

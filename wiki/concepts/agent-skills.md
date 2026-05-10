---
title: Agent Skills
created: 2026-05-04
updated: 2026-05-08
sources:
  - raw/yt-what-ai-agent-skills-are-and-how-they-work.md
  - raw/skill-issue-supabase-pedro-rodrigues.md
  - raw/skills-at-scale-workos-nisi-proser.md
tags: [concept, agents, skills, procedural-knowledge, progressive-disclosure]
---

# Agent Skills

> A skill is a `skill.md` file in a folder that teaches an AI agent procedural knowledge — how to execute specific workflows, tasks, or jobs. Skills use progressive disclosure (metadata → instructions → resources) to stay context-efficient, and the format is an open standard (Apache 2.0) adopted across [[claude-code|Claude Code]], OpenAI Codex, and other major platforms.

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
- Optional frontmatter: `author`, `version`

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

The `skill.md` format is an open standard published at [agent-skills.io](https://agent-skills.io), licensed under Apache 2.0. It was adopted across major AI platforms including:

- [[claude-code|Claude Code]]
- OpenAI Codex
- Many other agent tools

A skill built for one platform works on any platform that supports the spec.

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

This is why the "constraints over prescription" principle matters: skills should fill gaps in the model's knowledge, not replace its competence.

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

## Security

Skills can include executable scripts with access to file systems, environment variables, and API keys — this is what makes them powerful but also introduces trust concerns. Audits of publicly available skills have found:

- Prompt injection
- Tool poisoning
- Hidden malware

> [!warning] Security
> Treat skill installation with the same rigor as any software dependency. Review what the skill does before running it on your local machine.

## Thread

- [[tool-design-for-agents]] — Skills are the procedural complement to tool access; MCP provides reach, skills provide judgment
- [[the-agent-workflow]] — Skills operationalize the "how" of agent execution within the workflow
- [[the-slop-problem]] — Skills reduce slop by replacing guesswork with defined procedures

## Related

- [[agent-evals]] — Eval-driven development for skills: run with/without the skill, diff results, iterate
- [[ai-design-loop]] — Skills are the tools that execute the implementation phase of the design loop
- [[context-engineering]] — Progressive disclosure is a core context engineering technique, and skills are its canonical implementation
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

## Sources

- `raw/yt-what-ai-agent-skills-are-and-how-they-work.md` — IBM Technology video explaining skill format, progressive disclosure, knowledge type comparison, cognitive science analogy, and the open standard
- `raw/skill-issue-supabase-pedro-rodrigues.md` — Production operations: skills as documentation, skill discoverability ("use" verb trick), eval-driven development for skills, skill rot detection, skills+MCP complementarity
- `raw/skills-at-scale-workos-nisi-proser.md` — Skill design craft: constraints over prescription, confidence scoring, script interpolation, anti-patterns; skills at team scale: sharing tiers, plugin marketplaces, non-technical users, CLI-driven skills, context mining

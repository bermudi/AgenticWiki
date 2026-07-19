---
title: SKILL.md (Agent Skills format)
created: 2026-07-19
updated: 2026-07-19
sources:
  - raw/agentskills-specification.md
  - raw/skill-creator-skill.md
unaudited_marginal: 0
tags: [concept, skill-md, agent-skills, procedural-knowledge, progressive-disclosure, open-format]
---

# SKILL.md (Agent Skills format)

> SKILL.md is the concrete file format for [[agent-skills]]: a skill is a directory whose required `SKILL.md` carries YAML frontmatter (`name` + `description` mandatory) and Markdown instructions, with optional `scripts/`, `references/`, and `assets/` bundled resources, loaded via three-tier progressive disclosure. It is an open standard ([[agentskills]]); the `skill-creator` skill is the practitioner workflow for building and eval-ing one.

## Format

A skill is a folder containing, at minimum, a `SKILL.md` file:

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation loaded on demand
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

### Frontmatter (from the open spec)

| Field | Required | Constraints |
|-------|----------|-------------|
| `name` | **Yes** | 1–64 chars; lowercase `a–z`, `0–9`, hyphens only; must not start/end with `-`, no consecutive `--`; **must match the parent directory name**. |
| `description` | **Yes** | 1–1024 chars; describes what the skill does **and when to use it**; include keywords that help agents identify relevant tasks. |
| `license` | No | License name or bundled license file reference. |
| `compatibility` | No | 1–500 chars; intended product, system packages, network access. Most skills omit it. |
| `metadata` | No | Free-form string→string map for client-specific properties. |
| `allowed-tools` | No | Space-separated pre-approved tools (e.g. `Bash(git:*) Read`). **Experimental** — support varies by client. |

The body is unrestricted Markdown: step-by-step instructions, input/output examples, edge cases. Whatever helps the agent do the job.

### Progressive disclosure (three tiers)

1. **Metadata (~100 tokens):** `name` + `description` load at startup for *every* skill — the table of contents.
2. **Instructions (<5000 tokens recommended; keep `SKILL.md` under 500 lines):** the full body loads only when the task matches the description.
3. **Resources (on demand):** `scripts/`, `references/`, `assets/` load only when a specific step needs them. Keep reference files small and one level deep from `SKILL.md`.

This is why a good `description` is the whole triggering burden — the agent decides activation from the description alone.

### Validation

```bash
skills-ref validate ./my-skill   # checks frontmatter + naming conventions
```

Install: `uv tool install git+https://github.com/agentskills/agentskills.git#subdirectory=skills-ref`. The `skills` CLI silently skips skills with invalid YAML, so validate after every frontmatter edit.

## Authoring Workflow (from the skill-creator skill)

The `skill-creator` skill operationalizes skill-building as a loop:

1. **Capture intent** — what it should do, when it triggers, expected output, whether to set up test cases.
2. **Write a draft** `SKILL.md` following the anatomy above.
3. **Create test prompts** (≥3 realistic cases saved to `evals/evals.json`) and confirm them with the user before running.
4. **Eval qualitatively + quantitatively** — spawn *with-skill* and *baseline* runs in the same turn, capture `timing.json`, grade assertions to `grading.json`, aggregate to `benchmark.json`, and review via the eval viewer.
5. **Rewrite based on feedback**, generalizing from patterns (not overfitting one case), and repeat until satisfied, then expand the test set.

Craft rules the skill emphasizes: **constraints over prescription** ("Do X because Y" beats "MUST do X"); bundle repeated helper work into `scripts/`; **optimize the `description`** (imperative phrasing, user intent not implementation, reuse the skill's *leading words*, 20 eval queries split 60/40 train/val, avoid overfitting via held-out validation). Packaging: `python -m scripts.package_skill <folder>` → a `.skill` zip installable by any compatible client.

> [!note] Departure: fields beyond the open spec
> The `skill-creator` and `create-project-agentsmd` skills both use `disable-model-invocation: true` — a field that enables **user-invoked** skills (the agent never auto-loads them; the user calls `/skill-name`). This field is **not in the open `SKILL.md` spec's frontmatter table**; it is a client-specific (Claude Code / Pocock-style) extension. Likewise `allowed-tools` is explicitly *experimental* in the spec. The only fields the open standard mandates are `name` and `description`.

## Relationship to the Agent Skills Concept

This page is the **format**. [[agent-skills]] is the **mechanism and why** — skills as procedural memory for agents, the knowledge-type comparison (vs MCP/RAG/fine-tuning), and the design craft (Pocock's four-part checklist, Rodrigues's eval-driven development). [[agentskills]] is the **standard/governance** entity (repo, clients, stewardship). The open format's smallness discipline ("keep `SKILL.md` under 500 lines") is the same principle [[agent-skills]] describes as branch-aware reference placement and the no-op/sediment pruning pass.

## Thread

- [[tool-design-for-agents]] — Skills are the procedural complement to tool access; the `description` is a trigger interface contract.
- [[the-agent-workflow]] — Skills operationalize the "how" of agent execution within the workflow.
- [[the-slop-problem]] — Skills reduce slop by replacing guesswork with defined procedures — but only if evaled; unbenchmarked skills add slop.
- [[agent-quality-engineering]] — `skill-creator`'s with-skill-vs-baseline eval loop is the skill-level instantiation of agent quality infrastructure.

## Related

- [[agent-skills]] — The concept/mechanism: skills as procedural memory; knowledge-type comparison; Pocock and Rodrigues craft.
- [[agentskills]] — The open standard entity: repo, client showcase, stewardship, `skills-ref` tooling.
- [[procedural-knowledge]] — Skills are the canonical format for packaging procedural knowledge for agents.
- [[context-engineering]] — Progressive disclosure is a core context-engineering technique; skills are its canonical implementation.
- [[leading-words]] — The `description` steering lever: dense phrases the agent echoes in reasoning traces.
- [[skill-hell]] — Why skill-creator's eval loop exists: skills proliferate faster than evaluative capacity.
- [[agent-evals]] — Eval-driven development for skills: run with/without, diff results, iterate.
- [[open-knowledge-format]] — Parallel precedent: minimal open-format specs with reference implementations.

## Sources

- `raw/agentskills-specification.md` — The `agentskills/agentskills` docs: directory structure, frontmatter field constraints, progressive-disclosure token budget, file-reference rules, `skills-ref` validation, and the Anthropic-origin open-standard overview.
- `raw/skill-creator-skill.md` — Local `skill-creator` skill: the build/eval loop, description optimization, test-case design, packaging, and the `disable-model-invocation` client-specific field.

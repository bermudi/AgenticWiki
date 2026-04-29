# Ingest Flow

## Pipeline

```
Phase 1: Filing     →  Phase 2: Analysis  →  Phase 3: Verification  →  Commit
     (editing)           (critical re-read)      (separate audit)
```

## Phase 1 — Filing (main agent + 3 editors)

**Who:** Main agent (deepseek-v4-pro) orchestrates, subagent editors auto-fix.

1. Read source, identify entities/concepts/claims
2. Determine thread fit (strengthen/contradict/new thread?)
3. Create/update pages (concepts, threads, authors, index)
4. Run editors sequentially:
   - `structural-editor` → frontmatter, broken links, index accuracy
   - `link-editor` → bidirectional cross-refs, thread↔concept coverage
   - `content-editor` → summaries, thin pages, contradictions
5. Filing summary → human. Do NOT commit.

## Phase 2 — Analysis (main agent only)

**Who:** Main agent, switching to critical mode.

- Re-read every thread page
- Check: contradictions, departures, gaps
- Present theory summary: what gained support, what took a hit, tensions

## Phase 3 — Verification (separate agents, separate sessions)

**Why:** LLMs silently corrupt documents during delegated editing (DELEGATE-52). Verification as a separate judgment pass is ~95% reliable even when editing chains degrade.

**Who:** Main agent orchestrates; `source-verifier` + editors run in fresh sessions.

1. **Diff auditor** (bash, no LLM) — catch deletions >20%, summary drift, source section changes
2. **Source-verifier subagents** (parallel, one per changed page) — check against `raw/` sources:
   - Hallucinations (claims absent from source)
   - Omissions (key source insights missing)
   - Misattributions (wrong person/source credited)
   - Summary accuracy (blockquote matches page + sources)
3. **Mechanical re-check** — structural-editor + link-editor on changed files
4. Aggregate → report to human with severity (🚨 CRITICAL / ⚠️ WARNING / ℹ️ INFO)
5. Fix CRITICAL → re-verify → commit

## Agents

| Agent | Model | Role | Tools |
|---|---|---|---|
| main agent | deepseek-v4-pro | Orchestrate filing, analysis, verification | all |
| structural-editor | deepseek-v4-pro | Frontmatter, links, index, orphans | read, edit, write, bash |
| link-editor | deepseek-v4-pro | Bidirectional refs, thread↔concept | read, edit, write, bash |
| content-editor | deepseek-v4-pro | Summaries, thin pages, contradictions | read, edit, write, bash |
| source-verifier | deepseek-v4-pro | Source fidelity (read-only) | read, bash |

## Key architectural rule

**Editing and verification must never be the same session.**

The source-verifier never inherits the editing agent's context. It gets: the wiki page (final state) + `raw/` sources (immutable) + one instruction. This is the pattern DELEGATE-52 shows is reliable — single-turn judgment at RS@2 scores ~95% even for weaker models.

## Commit criteria

- [ ] All 3 phases complete
- [ ] No 🚨 CRITICAL findings unresolved
- [ ] Human approved theory summary (Phase 2) AND verification report (Phase 3)
- [ ] All CRITICAL fixes re-verified

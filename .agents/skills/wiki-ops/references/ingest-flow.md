# Ingest Flow

## Pipeline

```
Phase 1: Filing     →  Phase 2: Analysis  →  Phase 3: Verification  →  Commit
     (editing)           (critical re-read)      (separate audit)
```

## Phase 1 — Filing (main agent + 3 editors)

**Who:** Main agent orchestrates, subagent editors auto-fix.

1. Read source, identify entities/concepts/claims
2. Determine thread fit (strengthen/contradict/new thread?)
3. Create/update pages. For **each** page created or updated:
   - Populate YAML frontmatter: `title`, `created` (new pages only), `updated` (always), `sources` (list of `raw/` filenames), `tags`
   - Write the blockquote summary (1-3 sentences immediately after the `# Title` heading)
   - For concept pages: add `## Thread` section linking to relevant threads
   - For thread pages: add `## Concepts in this thread` section listing all linked concepts
   - Add `## Related` section with links to 2-3 existing pages
   - Add `## Sources` section with annotated entries (must match frontmatter `sources` list)
   - Update `wiki/index.md` with any new pages
4. Run editors sequentially:
   - `structural-editor` → frontmatter, broken links, index accuracy
   - `link-editor` → bidirectional cross-refs, thread↔concept coverage
   - `content-editor` → summaries, thin pages, contradictions
5. Filing summary → human. Do NOT commit.

## Phase 2 — Analysis (main agent only)

**Who:** Main agent, switching to critical mode.

- Re-read every thread page
- Check: contradictions, departures, tensions
- Present theory summary: what gained support, what took a hit

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

| Agent | Role | Tools |
|---|---|---|
| main agent | Orchestrate filing, analysis, verification | all |
| structural-editor | Frontmatter, links, index, orphans | read, edit, write, bash |
| link-editor | Bidirectional refs, thread↔concept | read, edit, write, bash |
| content-editor | Summaries, thin pages, contradictions | read, edit, write, bash |
| source-verifier | Source fidelity (read-only) | read, bash |

## Key architectural rule

**Editing and verification must never be the same session.**

The source-verifier never inherits the editing agent's context. It gets: the wiki page (final state) + `raw/` sources (immutable) + one instruction. This is the pattern DELEGATE-52 shows is reliable — single-turn judgment at RS@2 scores ~95% even for weaker models.

## Commit criteria

- [ ] All 3 phases complete
- [ ] No 🚨 CRITICAL findings unresolved
- [ ] Human approved theory summary (Phase 2) AND verification report (Phase 3)
- [ ] All CRITICAL fixes re-verified

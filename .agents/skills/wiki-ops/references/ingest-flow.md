# Ingest Flow

> Procedural reference for the ingest pipeline. For the design principles behind these steps — how to think about sources, theory pressure, and thread emergence — see [`ingest-philosophy.md`](ingest-philosophy.md).

## Pipeline

```
Pre-step: Acquisition → Step 0: Triage (GATE) → Phase 1: Filing → Phase 2: Analysis → Phase 3: Verification → Commit
```

Progress checklist:

- [ ] Source acquired in `raw/` (pre-step)
- [ ] Triage approved by human (step 0)
- [ ] Filing summary presented to human (phase 1)
- [ ] Theory summary presented to human (phase 2)
- [ ] Verification passed — no CRITICAL findings (phase 3)
- [ ] Committed

## Pre-step: Source Acquisition

**Who:** Main agent. **When:** Before triage. A source not in `raw/` is invisible to future sessions.

Three cases, in order of frequency:

### 1. User provides a local file path

(e.g., `~/Downloads/karpathy-talk.pdf`)

- **Slugify the title** to produce the `raw/` filename. Strip the extension, pass the basename through `./scripts/slugify`, then re-attach the original extension (`.pdf`, `.md`, `.html`, etc.). For YouTube content, prepend `yt-` to the slug.
- `mv` the file to its new slugified name in `raw/`. Don't preserve `~/Downloads/` defaults like `Untitled.pdf`, `karpathy-talk (1).pdf`, or browser hash names — the wiki's naming convention wins over the download manager's.
- If the basename is genuinely unrecoverable (a hash, all numbers, etc.), peek at the file's first page or metadata to extract a real title before slugifying. Don't slugify garbage.
- For companion media (images, audio, video clips, screenshots), `mv` them into `raw/assets/` with slugified names so they live next to the source.
- **Note:** `mv` is not destruction — the file ends up in `raw/`. The `trash > rm` rule applies to files you're throwing away, not files you're relocating. Don't over-rotate and use `trash` here.

### 2. User provides a URL and no file exists in `raw/` yet

- Use the web-content skill to fetch the content
- Slugify the title to produce a filename: `./scripts/slugify "Article Title Here"` — prepend `yt-` for YouTube sources
- Save to `raw/` following the appropriate template (see `meta/wiki-conventions.md` for web/YouTube source formats)

### 3. File is already in `raw/`

User points you at `raw/some-file.md`, or you can see it there. Skip this step entirely. Just read it.

### Verify acquisition

After acquisition, before triage: confirm the file actually arrived in `raw/` (`ls raw/`). Downloads can silently fail, partial PDFs can corrupt, and `mv` across filesystems (e.g., `/tmp` → repo) is slower than it looks. Cheap to check, expensive to discover mid-edit.

## Step 0: Relevance Triage (GATE)

**Who:** Main agent. **When:** After reading the source, before any wiki editing.

This step exists because not every source the human hands you is worth a full three-phase ingest. Some are product demos, some are surface-level rehashes, some are parallel interests that don't intersect with the wiki's theory. The default should be to protect the wiki from dilution — the human can always override upward.

### Procedure

1. Read the source fully.
2. Map it against the existing wiki: which threads does it touch? What pages exist already that cover this ground?
3. Classify into one of three outcomes:

| Outcome | Signal |
|---|---|
| **Full ingest** | Introduces a genuinely new idea, framework, or empirical result. Would create at least one new page that stands on its own (>10 lines of substantive content). Connects to existing threads. |
| **Marginal** | Adds useful color or anecdotes to existing pages but doesn't warrant new pages. A few sentences of source-backed context on 1-2 existing pages. |
| **Skip** | Product demo, surface-level summary, rehash of known territory, or entirely outside the wiki's domain. |

4. Present the triage to the human:
   - What the source is (1 sentence)
   - Where it fits (which existing threads/pages)
   - Your recommendation and why
   - What you'd do for each outcome (concrete scope)
5. Wait for approval. Do not proceed until the human says go.

### Marginal outcome procedure

If the human approves marginal:

1. Add `raw/<filename>` to the `sources` frontmatter of the target page(s)
2. Add an entry in the `## Sources` section annotating what the source contributed
3. Add a sentence or short paragraph to the body citing the source where it fits
4. Update the `updated` date
5. **Increment the `unaudited_marginal` counter** in frontmatter (add it if not present, starting at 1)
6. If `unaudited_marginal >= 5`, warn the human that this page has accumulated enough marginal ingests to warrant a verification audit
7. Commit with message: `ingest (marginal): <source title> — folded into <page-names>`

No new pages. No editors. No Phase 2 or 3. This is a lightweight operation.

### Marginal audit

Pages that accumulate 5+ marginal ingests without a verification pass carry unaudited claims. When `unaudited_marginal >= 5`:

1. Run `source-verifier` on the page (re-reads all `raw/` sources, checks all claims)
2. Fix any issues surfaced
3. Reset `unaudited_marginal` to 0 in frontmatter
4. Commit with message: `audit: <page-name> — source verification after N marginal ingests`

A full ingest that touches the page also resets the counter to 0 (Phase 3 verification already ran).

**Why this matters:** Marginal ingests add claims without the full three-phase verification cycle. The counter is a circuit breaker — it prevents the slow accumulation of unaudited assertions that compound silently. This parallels the [[document-degradation]] finding: degradation is invisible per-interaction but catastrophic cumulatively.

### Skip outcome

File stays in `raw/` as archive. No wiki changes. Done.

## Phase 1 — Filing (main agent + 3 editors)

**Who:** Main agent orchestrates, subagent editors auto-fix.

1. Read source, identify entities/concepts/claims
2. Determine thread fit (strengthen/contradict/new thread?)
3. Create or update pages. For **each** page, complete this checklist:

   - [ ] Frontmatter: `title`, `created` (new pages only), `updated` (always), `sources` (list of `raw/` filenames), `tags`, `unaudited_marginal` (0 for new pages)
   - [ ] Blockquote summary: 1-3 sentences immediately after the `# Title` heading
   - [ ] Thread section: `## Thread` linking to relevant threads (concept pages); body cross-refs (thread pages)
   - [ ] Related section: `## Related` with links to 2-3 existing pages
   - [ ] Sources section: `## Sources` with annotated entries matching frontmatter `sources` list
   - [ ] Index updated: new pages added to `wiki/index.md`

   **Batch your edits.** Use the `edit` tool's `edits[]` array to make multiple changes to the same file in one call. Files that don't share changes can be done in parallel calls, but never make sequential single-change calls to the same file.

   **Batch index updates.** When processing multiple sources, update `wiki/index.md` once at the end — not after each page.

   **Don't re-read what you just wrote.** After editing pages, move directly to editors — they re-read independently. Re-reading before invoking editors adds latency with zero signal.

4. Run editors in **parallel** via `delegate`. Scope each editor to recently changed/created pages only:

   ```
   delegate({
     tasks: [
       {
         prompt: "Check and fix structural integrity of recently changed wiki pages. Focus on: frontmatter completeness (title, created, updated, sources, tags), broken wiki-links, index accuracy, orphan detection. Only process pages changed in this ingest."
         agent: "structural-editor"
       },
       {
         prompt: "Check and fix cross-reference integrity of recently changed wiki pages. Focus on: bidirectional links, thread↔concept coverage, Related section completeness, dangling references. Only process pages changed in this ingest."
         agent: "link-editor"
       },
       {
         prompt: "Review substantive quality of recently changed wiki pages. Focus on: summary blockquote exists and is 1-3 sentences, section completeness (Thread, Related, Sources), thin page detection, content-structure alignment. Only process pages changed in this ingest."
         agent: "content-editor"
       }
     ]
   })
   ```

   Read all editor reports. Fix any issues surfaced before proceeding.

5. Present filing summary to human. **Do NOT commit.**

## Phase 2 — Analysis (main agent only)

**Who:** Main agent, switching to critical mode. **When:** After filing is approved.

This is a separate cognitive pass — you are no longer filing, you are stress-testing the wiki's theory. Load [analytical-pass.md](references/analytical-pass.md) for the full procedure.

The pass produces a **theory summary** for the human:
- Which threads gained support, which took a hit
- Contradictions and departures found (with affected pages and severity)
- Emerging themes and recommended theory action

Check *every* thread, not just the ones you updated. Classify theory pressure by scope (local callout, thread tension, or panorama reframe). Don't just list what was added — tell the human how the theory changed.

**Do not skip Phase 2.** It is not optional. After the human reviews the theory summary, proceed to Phase 3. Do **not** commit.

## Phase 3 — Verification (separate agents, separate sessions)

**Why:** LLMs silently corrupt documents during delegated editing. The empirical basis: [[delegate-52|DELEGATE-52]] found that frontier models corrupt ~25% of document content over 20 interactions, with sparse [[critical-failure|critical failures]] explaining ~80% of degradation. Agentic tool use does not help — models with file read/write/code execution tools performed **6% worse** than those without. Single-turn judgment is reliable (models maintain near-perfect fidelity on individual interactions); the problem is rare catastrophic events in long chains. Separate sessions break the chain.

**Who:** Main agent orchestrates; `source-verifier` + editors run in fresh sessions.

The phase runs four checks, in order:

1. **Mechanical diff audit** (bash) — deletions >20%, summary drift, source section changes. Fix any CRITICALs before proceeding.
2. **Semantic diff reasoning** (delegate, fresh session) — orphan edits, semantic drift, claim deletion, scope creep. Skipped if no substantive changes or marginal ingest.
3. **Source verification** (parallel delegates, one per page) — hallucinations, omissions, misattributions, summary accuracy. Filter findings: fix factual errors, skip synthesis and epistemic callout territory.
4. **Mechanical re-check** — structural-editor then link-editor on changed files.

Aggregate findings with severity (CRITICAL / WARNING / INFO). Present to human. Fix CRITICALs, re-verify, then commit.

Load [verification-pass.md](references/verification-pass.md) for the full procedure: bash scripts, delegate prompt templates, scope decision criteria, re-verification steps, and commit rules.

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

The source-verifier never inherits the editing agent's context. It gets: the wiki page (final state) + `raw/` sources (immutable) + one instruction. This is the pattern [[delegate-52|DELEGATE-52]] validates: single-turn judgment is reliable (models maintain near-perfect fidelity on individual interactions), while long-horizon chains degrade silently via sparse [[critical-failure|critical failures]] that explain ~80% of total degradation. Separate sessions break the degradation chain.

## Commit criteria

- [ ] All 3 phases complete
- [ ] No 🚨 CRITICAL findings unresolved
- [ ] Human approved theory summary (Phase 2) AND verification report (Phase 3)
- [ ] All CRITICAL fixes re-verified

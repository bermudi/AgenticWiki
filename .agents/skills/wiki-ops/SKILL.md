---
name: wiki-ops
description: |
  Operate on the personal LLM wiki — ingest new sources, query existing knowledge,
  and run lint/health checks. Use when the user wants to process a new source (article,
  paper, YouTube video, podcast notes), asks a question about accumulated knowledge,
  wants to explore connections between topics, asks to check wiki health, or mentions
  "ingest", "add source", "process this", "lint the wiki", "wiki health", or "update the wiki".
---

# Wiki Operations

Detailed operational procedures for wiki operations: ingest, query, and lint.

For wiki structure and invariants, see `AGENTS.md` in the project root.
For page formats, naming, and source templates, see `meta/wiki-conventions.md`.
For ingest philosophy and theory principles, see `references/ingest-philosophy.md`.
For editor descriptions and invocation patterns, see `references/editors.md`.

## Mission Context

This wiki is a collection of unproven suggestions about disciplined AI-assisted development. When you ingest a source, you're adding hypotheses to a living theory — not canonizing truth. Flag contradictions loudly. Surface uncertainty. Track what people are saying and how ideas connect. Don't declare winners.

For the full design principles, see `references/ingest-philosophy.md`.

## Ingest

Processing a new source into the wiki. Starts with a relevance gate — not every source warrants full ingestion.

### Step 0: Relevance Triage (GATE)

**Before any wiki editing begins**, read the source and evaluate whether it's worth ingesting. See the detailed procedure in [ingest-flow.md](references/ingest-flow.md), "Step 0: Relevance Triage."

Present the triage to the human. Three outcomes:

| Outcome | What happens |
|---|---|
| **Full ingest** | Proceed to Phase 1. Create/update pages, run editors, verify, commit. |
| **Marginal** | Add the raw file as a source reference on 1-2 existing pages. Annotate what the source contributed. No new pages, no editors, no verification pass. Update `updated` date on touched pages. Commit with message `ingest (marginal): <source> — folded into <pages>`. |
| **Skip** | File stays in `raw/` as archive. No wiki changes. Done. |

**Triage criteria:**
- Does the source introduce a genuinely new idea, framework, or empirical result? Or is it a product demo, surface-level summary, or rehash of known territory?
- Would it create at least one new wiki page that can stand on its own (>10 lines of substantive content)? Or would it only add color to existing pages?
- Does it connect to existing threads, or is it parallel interests that don't intersect with the wiki's theory?

**Be opinionated.** A source that's a live product demo thinly disguised as a talk is probably marginal. A source that's entirely outside the wiki's domain (e.g., a biology paper in a software engineering wiki) is probably a skip. The human can always override, but the default should be to protect the wiki from dilution.

**After triage is approved**, proceed accordingly.

### Phase 1: Filing

The mechanical work of extracting knowledge from the source and filing it into the wiki. Follow the detailed procedure in [ingest-flow.md](references/ingest-flow.md).

#### Step 0: Source Acquisition (if needed)

**Three cases, in order of frequency. Don't skip this step — a source not in `raw/` is invisible to future sessions.**

1. **User provides a local file path** (e.g., `~/Downloads/karpathy-talk.pdf`):
   - **Slugify the title** to produce the `raw/` filename — same convention as the URL case. Strip the extension, pass the basename through `./scripts/slugify`, then re-attach the original extension (`.pdf`, `.md`, `.html`, etc.). For YouTube content, prepend `yt-` to the slug.
   - `mv` the file to its new slugified name in `raw/`. Don't preserve `~/Downloads/` defaults like `Untitled.pdf`, `karpathy-talk (1).pdf`, or browser hash names — the wiki's naming convention wins over the download manager's.
   - If the basename is genuinely unrecoverable (a hash, all numbers, etc.), peek at the file's first page or metadata to extract a real title before slugifying. Don't slugify garbage.
   - For companion media (images, audio, video clips, screenshots), `mv` them into `raw/assets/` with slugified names so they live next to the source.
   - Proceed with the file now in `raw/`.
   - **Note:** `mv` is not destruction — the file ends up in `raw/`. The `trash > rm` rule applies to files you're throwing away, not files you're relocating. Don't over-rotate and use `trash` here.

2. **User provides a URL and no file exists in `raw/` yet**:
   - Use the web-content skill to fetch the content
   - Slugify the title to produce a filename: `./scripts/slugify "Article Title Here"` — prepend `yt-` for YouTube sources. The result is your `raw/` filename.
   - Save to `raw/` following the appropriate template (see AGENTS.md "Web Sources" or "YouTube Videos" sections)
   - Proceed with the filed source

3. **File is already in `raw/`** (user points you at `raw/some-file.md`, or you can see it there): skip this step entirely. Just read it.

**After acquisition, before triage:** confirm the file actually arrived in `raw/` (`ls raw/`). Downloads can silently fail, partial PDFs can corrupt, and `mv` across filesystems (e.g., `/tmp` → repo) is slower than it looks. Cheap to check, expensive to discover mid-edit.

#### Steps 1–5: Follow [ingest-flow.md](references/ingest-flow.md)

The detailed filing procedure covers: reading and understanding the source, thread identification, creating/updating pages (with proper frontmatter, blockquote summaries, and all required sections), running structural/link/content editors, and presenting the filing summary to the human. **Do NOT commit.**

After the filing summary is presented and approved, proceed to Phase 2 by reading [the analytical pass instructions](references/analytical-pass.md).

### Phase 2: Analysis

After filing is complete, load [analytical-pass.md](references/analytical-pass.md) and follow those instructions. This is a separate cognitive pass — you re-read existing wiki pages critically to find contradictions, departures, and gaps.

**Do not skip Phase 2.** It is not optional.

### Phase 3: Verification

After analysis is complete and the theory summary has been presented to the human, load [verification-pass.md](references/verification-pass.md) and follow those instructions. Verification runs BEFORE committing.

This phase uses separate subagent sessions (source-verifier + mechanical re-checks) to audit the ingest for hallucinations, omissions, deletions, and cross-reference drift. It exists because LLMs silently corrupt documents during delegated editing — verification as a separate judgment pass is architecturally more reliable than self-review.

**Do not skip Phase 3.** It is not optional.

### Batch ingest

If processing multiple sources, complete all three phases per source. Batch index updates — update `index.md` once at the end.

## Query

Answering questions using wiki knowledge.

### Step 1: Search the wiki

1. Read `wiki/index.md` to find relevant threads and pages
2. Read the relevant **thread pages** first — they provide the narrative context and show how concepts connect
3. Drill into individual concept and source pages as needed
4. If pages link to other pages that seem relevant, follow the links
5. Check recent git history for activity that might be relevant

### Step 2: Synthesize an answer

- Cite wiki pages using `[[page-name]]` links
- If the answer requires information not in the wiki, say so explicitly: "The wiki doesn't cover X yet"
- Suggest sources that could fill the gap if you can

### Step 3: File valuable outputs

If the answer is substantial (a comparison, an analysis, a connection discovered), offer to create a wiki page for it:

- [ ] Create the page following standard format
- [ ] Add to `wiki/index.md` under the correct category (threads, concepts, etc.)
- [ ] Add `## Related` links from existing pages
- [ ] If it traces a theme across sources, create it as a thread page under `wiki/threads/`

The user may decline — that's fine. But always offer.

## Lint

Health-checking the wiki. Run when asked, or when you notice issues during other operations.

### Checklist

Work through each item and report findings:

- [ ] **Broken links**: Check all `[[wiki-links]]` resolve to existing pages
- [ ] **Orphan pages**: Pages with no inbound links from other wiki pages (check index — every page should be linked from at least one other page besides index)
- [ ] **Missing pages**: Concepts or entities mentioned across multiple pages but without their own page
- [ ] **Thread coverage**: Every concept page that discusses a thread must have a `## Thread` section linking back to it.
- [ ] **Contradictions**: Claims on different pages that disagree
- [ ] **Stale claims**: Information that has been superseded by newer sources (check the `updated` dates and source timelines)
- [ ] **Thin pages**: Pages with only a few sentences that could be merged or expanded
- [ ] **Missing frontmatter**: Pages without proper frontmatter (title, created, updated, sources, tags)
- [ ] **Index accuracy**: Every page in the wiki directory is listed in `index.md`, and every entry in `index.md` points to an existing page
- [ ] **Unaudited marginal accumulation**: Pages where `unaudited_marginal >= 5` in frontmatter need a source verification audit. Run `source-verifier`, fix issues, reset counter to 0.

### How to check

Run the unified validator first — it catches all mechanical issues in one pass:

```bash
./scripts/validate-page      # Unified validator: frontmatter, links, sources, structure, orphans
```

If you need to check a single page: `./scripts/validate-page wiki/concepts/some-page.md`

Then do judgment checks yourself:

```bash
# Individual scripts (if validate-page flags something specific)
./scripts/check-links        # Broken wiki-links, dangling raw/ refs, unreferenced raw files
./scripts/check-frontmatter  # Missing YAML fields, missing summary blockquotes, missing ## Related
./scripts/orphans            # Pages with no inbound links, pages missing from index.md

# Judgment checks (read and reason)
# Thread coverage, contradictions, stale claims, thin pages — these need human judgment
```

For the judgment checks, read the relevant pages and reason about them.
Thread<->concept bidirectional coverage can be partially checked mechanically:

```bash
# Check thread<->concept bidirectional links
echo '=== Concepts missing Thread section ==='
for f in wiki/concepts/*.md; do
  name=$(basename "$f" .md)
  if ! grep -q "## Thread" "$f"; then
    if grep -rq "\[\[${name}\]\]" wiki/threads/; then
      echo "  MISSING: ${name} is linked from a thread but has no ## Thread section"
    fi
  fi
done

# Check for pages needing marginal audit
echo '=== Pages needing marginal audit (unaudited_marginal >= 5) ==='
for f in $(find wiki/ -name '*.md' ! -name 'index.md'); do
  count=$(grep -oP '^unaudited_marginal: \K\d+' "$f" 2>/dev/null || echo 0)
  [ "$count" -ge 5 ] && echo "  AUDIT NEEDED: $f (unaudited_marginal: $count)"
done
```

### Report and fix

1. Report findings as a structured list
2. Fix what you can (broken links, missing frontmatter, index drift)
3. For judgment calls (merges, reorganizations, contradiction resolutions), propose changes and ask the user
4. Suggest new pages to create and new sources to look for
5. Commit fixes with a descriptive message

## Gotchas

- **Source-anchored claims only**: Every factual claim on a wiki page must be supported by at least one source listed in the page's frontmatter. If you know something from outside the listed sources (e.g., term etymology, historical context, a book you remember), either cite the additional source or leave the claim out. The verification pass will flag unsourced claims as hallucinations. Synthesis and cross-page connections are fine — but specific factual assertions need a source.
- **One source can touch many pages**: A single YouTube video about distributed systems might update pages on consistency models, a specific engineer, a specific paper, and the overview. That's expected. The value is in the cross-referencing.
- **Don't over-split**: A page should cover one coherent topic. If it's getting long (>200 lines), consider splitting. If it's under 10 lines, consider merging into a related page.
- **Dates in frontmatter are ISO 8601**: `YYYY-MM-DD`. No exceptions.
- **YouTube videos that arrive inline need a source stub**: When video content arrives via an extension with no file on disk, create a `raw/yt-<slug>.md` stub with key points extracted during ingest. YouTube stubs and web source files are the only cases where you write to `raw/`. If a transcript file already exists in `raw/`, it is the source — do not create a stub. Without the stub, future sessions can't re-read the source.
- **No src/ layer**: Knowledge flows directly from `raw/` into concepts, threads, authors, and projects. Each page's `## Sources` section references the `raw/` files it draws from.

## Reference files

**When to read each reference:**

| Read when you need... | File |
|---|---|
| The full ingest pipeline: triage, filing, analysis, verification, commit | `references/ingest-flow.md` |
| How to think about sources, theory pressure, thread emergence | `references/ingest-philosophy.md` |
| Phase 2 critical analysis: contradictions, departures, tensions | `references/analytical-pass.md` |
| Phase 3 verification: diff auditor, source-verifier, mechanical re-check | `references/verification-pass.md` |
| Subagent editor descriptions and invocation patterns | `references/editors.md` |
| Page formats, frontmatter spec, web/YouTube source templates | `meta/wiki-conventions.md` |


# Analytical Pass

> Loaded after filing is complete. Re-read the wiki critically before committing.

You have filed a new source into the wiki. Now switch to a critical analytical mode. You are no longer filing — you are stress-testing the wiki's theory.

## Step 1: Re-read every thread

Read every thread page in `wiki/threads/`. For **each** thread, answer these questions about the source you just ingested:

1. **Does this source support this thread's thesis?** If yes, the thread page should already reflect that from your filing pass. Verify it does.
2. **Does this source contradict this thread's thesis?** If a source makes a claim that undermines or disagrees with what the thread argues, that is a contradiction.
3. **Does this source depart from this thread without contradicting it?** A departure is a different frame, emphasis, or dissenting view. Not wrong, just different.

**Check every thread.** Not just the ones you updated during filing. A source about "taste-driven development" may seem unrelated to "the slop problem" — but it is, because slop is what happens when taste is absent. Follow the logic.

## Step 2: Re-read related existing concepts

Read the existing concept pages that are most related to the new source's claims. For each:

1. Does the new source's claims agree with what this concept says?
2. Does it add nuance or a different angle?
3. Does it contradict?

If you find theory pressure — contradiction, departure, boundary shift, reframing, or evidence that an existing framework may be transitional — classify its scope before editing:

| Scope | Action |
|---|---|
| **Local caveat** | Add a callout on the affected page (see Epistemic Callouts below). |
| **Thread-level tension** | Add/update the thread's `## Tensions` section and link the affected concepts. |
| **Panorama-level reframe** | Propose a new thread or major section in an existing thread. Do not bury it as only a callout. |

Do not silently reconcile. Preserve the disagreement or departure as part of the theory map.

### Epistemic Callouts

Use the standard callout formats defined in `meta/wiki-conventions.md`:

| Callout | Use when |
|---|---|
| `> [!note] Departure:` | Sources disagree on a point; the wiki is choosing one path or noting the fork |
| `> [!warning] Contradiction:` | A new source directly contradicts an existing wiki claim |
| `> [!note] Synthesis:` | The wiki's own inference — not stated by any single source, but inferred from multiple |
| `> [!note] Extension:` | A reasonable extrapolation beyond what sources claim, but unvalidated |

Keep callouts at **claim level**, not page level. A single page may contain sourced facts, synthesized arguments, and speculative extensions simultaneously. Prefer specificity: `Extension: grey-box toolchain` is better than `Extension: this whole section`.

## Step 3: Theory summary

Present this to the human:

- **Threads gained support**: Which threads did this source reinforce? List specific thread pages and what the source adds.
- **Threads took a hit**: Did any thread lose ground? What claim was weakened?
- **Contradictions found**: List them with the conflicting claims, affected pages, and severity.
- **Departures found**: List novel positions that don't fit the existing theory — not wrong, just different frames.
- **Emerging themes**: Is a new thread brewing? Are there tensions that need resolution?
- **Recommended theory action**: Should this remain a local callout, become a thread tension, expand an existing thread, or become a provisional new thread?

Don't just list what was added. Tell the human how the theory changed.

After the human reviews the theory summary, proceed to Phase 3 (verification). Do **not** commit — verification runs before any commit.

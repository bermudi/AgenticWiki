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

If you find a contradiction or departure:

- Add a `> [!warning] Contradiction` callout on **both** the concept page and the thread page where it's relevant
- Add a `> [!note] Departure` callout for novel-but-not-contradictory positions
- Do not silently reconcile. Flag it explicitly so the human can decide.

## Step 3: Theory summary

Present this to the human:

- **Threads gained support**: Which threads did this source reinforce?
- **Threads took a hit**: Did any thread lose ground?
- **Contradictions found**: List them with the conflicting claims and pages
- **Departures found**: List novel positions that don't fit the existing theory
- **Emerging themes**: Is a new thread brewing? Are there tensions that need resolution?

Don't just list what was added. Tell the human how the theory changed.

After the human reviews the theory summary, proceed to Phase 3 (verification). Do **not** commit — verification runs before any commit.

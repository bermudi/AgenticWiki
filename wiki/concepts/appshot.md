---
title: Appshot
created: 2026-08-06
updated: 2026-08-07
sources:
  - raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md
unaudited_marginal: 0
tags: [concept, openai-codex, tool-design, computer-use, context-acquisition, accessibility]
---

# Appshot

> The fastest way to bring context into OpenAI Codex: a screen capture that ships the image *plus* the entire **accessibility tree**, so the model already knows channel IDs, user IDs, and form fields and can act in one function call instead of a multi-hop OCR-and-lookup chain.

## Summary

[[jason-liu|Jason Liu]] (OpenAI, 2026) calls appshot "my favorite feature of all time." It is Codex's answer to the screenshot bottleneck. A screenshot gives the model pixels; an appshot gives pixels **and structured metadata** — the accessibility tree that the OS already maintains for screen readers — which collapses a multi-hop OCR-and-lookup sequence into a single, ID-accurate tool call.

## How It Works

When you trigger appshot (Liu's demo instruction: "just press the command button side by side" — gated behind an "install computer use" modal if needed), Codex captures:

1. **The bitmap** — what the display shows.
2. **The accessibility tree** — the OS-level semantic view: every button, input, tab, and text node with its semantic role, value, and (critically) **internal IDs**.

For a Slack channel this means:

- the **channel ID** (e.g., `U12725` in Liu's example, though the `U-` prefix is actually a user ID — the talk's point is the ID is present verbatim);
- the **user IDs** of everyone in the channel;
- the **message IDs** of the thread being viewed;
- for a form, the **field names, labels, and control types**.

The model therefore does not need to OCR the image and then call `list_slack_channels` → "oh there's a guy named Charlie" → `list_persons` → guess the ID. It can emit `send_message(channel_id=U12725, mention=U425)` immediately. Liu quantifies the difference as **one function call vs many hops**.

### Screenshot vs Appshot

| Input | What the model gets | Next action |
|---|---|---|
| **Screenshot** | Pixels only. Model must OCR, then chain lookups to resolve names → IDs. | Multiple tool calls, higher token cost, brittle name matching |
| **Appshot** | Pixels + accessibility tree (IDs, fields, roles). | One ID-accurate tool call; subsequent calls already grounded |

## What Liu Does With It

Because "everything I do is an appshot," the feature becomes the default context-acquisition primitive:

- **Triage:** appshot a Slack thread → "use the DX triage skill, figure this out" — the skill reads the tree, routes to `browser-feedback` and DMs James, all without a second hop.
- **Forms:** "fill out this form" while an appshot is focused on Chrome → Codex uses the **Chrome extension**; on Safari it falls back to **computer use**. Liu reports not manually filling a form in two weeks.
- **Video:** watch a video with an appshot summary alongside, or "summarize this" without pausing playback.
- **Sign & fax:** "use DocuSign, sign this and save to my desktop" → DocuSign → find a faxing service → fax medical records — all from one appshot.
- **Slides & artifacts:** the workshop deck itself is served from `localhost` inside Codex's in-app browser; Liu annotates a slide region, hits transcribe + Enter, and keeps talking while Codex fixes the layout.
- **Chrome awareness off-screen:** Codex will open three Chrome tabs to check DMs and close them while Liu is answering email — possible because the Chrome extension channels the appshot through the browser without a screen takeover.

## The Trigger

Liu's capture was almost musical:

> Hold a foot pedal with two buttons — **transcribe** and **enter** — walk up to the desk with hands behind the back, say "fix this, make this change, message this guy on Slack," tap enter, walk away.

The pedal (voice) and the appshot (eyes) together mean the "bring context in" act is no longer typing or clicking — it is **showing and telling**.

## Design Lesson

Appshot is a tool-design lesson in [[tool-design-for-agents|designing tools for agentic consumption]]: don't make the model infer what the environment already knows exactly. Expose the ID, not just the rendering. The accessibility tree is the ambient structured side-channel for every graphical app on the OS — by sending it alongside the bitmap, Codex converts a vision-and-OCR problem into a **tool-call binding** problem.

The corollary Liu draws: once form fields carry their true names, the choice of actuator (Chrome extension vs computer use vs future in-app browser) becomes a routing detail, not a capability difference — the model simply picks the controller for the focused app.

## Why It Matters for the Wiki

- For [[tool-design-for-agents]], appshot is the concrete example of "outputs that agents can consume" applied to graphical apps — the counterpart to the CLI tools' machine-readable-output theme.
- For [[context-engineering]], it is a **context-acquisition** primitive: the fastest way to turn the user's current visual attention into model-usable context, cheaper than prose description and more faithful than OCR.
- For [[openai-codex]], it is the feature Liu demos more than any other, and the reason he pushes users to install computer use first.

## Thread

- [[tool-design-for-agents]] — appshot as the graphical-app instantiation of "design tools for agentic consumption"
- [[context-engineering]] — appshot as a context-acquisition primitive (show the screen, don't describe it)

## Related

- [[openai-codex]] — the product that ships appshot, the Chrome extension, and computer use
- [[jason-liu]] — the practitioner who defines and evangelizes it
- computer use — the actuator appshot routes to when the target is a native app (appshot is the capture side, computer use the control side; no dedicated page yet)
- [[tool-design-for-agents]] — the thread where appshot sits as a case study
- [[context-engineering]] — appshot as Bring-Context-In
- [[agent-skills]] — appshot plus "do research and reply" is typically dispatched through a skill (e.g., DX triage)

## Sources

- `raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md` — Liu's definition ("favorite feature of all time"), the command-button-side-by-side animation, the accessibility-tree vs OCR hop-count argument, the channel/user ID example, the form-filling / DocuSign / video summarization / Chrome-tabs-in-background demos, and the workflow dictum "if you're on the Codex desktop, just press appshot and ask."

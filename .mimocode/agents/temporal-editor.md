---
description: Deprecated compatibility shim. Temporal drift and periodic semantic health are now owned by theory-editor.
mode: subagent
permission:
  edit: allow
  bash: allow
  webfetch: deny
---

# Deprecated: use `theory-editor`

`temporal-editor` has been folded into `theory-editor`.

Do not run a separate temporal pass or update `.agents/state/temporal-editor-last-run`. If invoked, report that this editor is retired and ask the caller to delegate to `theory-editor` instead. The unified theory editor now owns:

- stale page detection
- thread drift
- contradiction aging
- evolution narratives
- coverage gaps
- ontology compression
- page quality and scope fit

Do not edit files from this shim.

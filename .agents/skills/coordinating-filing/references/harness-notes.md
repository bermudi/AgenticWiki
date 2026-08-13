# Harness capability notes — AgenticWiki

This file is an **observational inventory**, not a workflow authority. Normative procedures live in:

- [Full worker topology adapter](full-topology.md)
- [Freebuff baton adapter](freebuff-baton.md)
- [Common coordinating skill](../SKILL.md)

Reviewer expertise remains in common `.agents/skills/` reviewer skills, never harness-specific agent definitions. Evidence for observations below is recorded in `meta/model-filing-evaluations.md`; dates are included so stale behavior can be retested. Behaviors were first observed in NewsWiki and apply unchanged to AgenticWiki; only the filing skill name differs (`filing-agentic-sources` vs `filing-news-sources`).

## Observed harness inventories

### Pi

Observed working topology (2026-07-24 Ezra Klein; 2026-07-26 USMCA/CNN): Pi `delegate` supports ad-hoc shared-checkout write workers with `agent: ""`, `cwd: "."`, `context: "fresh"`, `tools: ["*"]`, and isolated read-only workers with `tools: ["ro"]`. Pi call shapes and the mandatory probe are normative in the [full-topology adapter](full-topology.md#1-native-dispatch-and-tool-call-shapes).

### Devin CLI

Observed inventory: `coder`/`subagent_general` for write-capable work, `subagent_explore` and `reviewer` profiles for review. Reviewer isolation can be enforced. A known wrinkle (2026-07-31 and 2026-08-02): `subagent_explore` may read files but lack version-control access. Diff review is unavailable unless the selected read-only profile can independently inspect staged diffs and prior versions; coordinator-supplied diff prose is not evidence.

### mimocode

Observed once (2026-07-24 Fayyad): subagents appeared as messages with another `agent_id` inside one session. Read-only reviewer isolation was not demonstrated, and the coordinator performed corrector work inline. Treat this as unproven capability and run the full adapter's native probe/dispatch rather than assuming support.

### Freebuff / commandcode

Across v0.0.128–v0.0.130, no generic shared-checkout corrector/writer or isolated wiki reviewer was observed. Fixed agents included:

| Agent family | Observed purpose | Filing significance |
|---|---|---|
| `basher` | shell | top-level shell aid, not a role worker |
| `code-searcher`, `file-picker`, `file-lister` | search/read | input gathering, not independent review |
| `researcher-web` | web research | possible focused research host if repository access is proven |
| `thinker-with-files-gemini`, `thinker-gpt` | planning | not a reviewer |
| `code-reviewer-luna`, `-mimo-pro`, `-deepseek`, `-minimax-m3` | generic code review | useful extra preflight; never a named wiki-review row |

Observed quirks:

- `agent: ""` is not an ad-hoc worker request in Freebuff.
- Invented named agents returned `Agent is not available to spawn` (2026-07-26 Bulwark *Focus Group*).
- Generic code reviewers have sometimes lacked repository access (2026-08-04), yet have also caught real provenance/mechanical defects (2026-07-26 and 2026-08-09). They remain extra only.
- Freebuff's system prompt directed `code-reviewer-luna` after changes. On 2026-08-09 Capital One, the model followed write → generic review → fix → summary but omitted `finish-write`/`handoff`, leaving baton state `writing` with an empty recorded boundary. This motivates the mandatory late write-pass gate in the [Freebuff adapter](freebuff-baton.md#2-write-pass).
- A 2026-08-08 Citizens United run fabricated `.freebuff/session-*` marker files in one chat. This demonstrated that agent-supplied identity is not trustworthy. The baton binds OIDs/state but does not identify sessions; operator-provided fresh top-level sessions supply separation.

## Dated failure signatures

These signatures help classify a dispatch; normative retry behavior is in [full topology § 3](full-topology.md#3-dispatch-failure-handling).

| Signature | Observed classification |
|---|---|
| `Agent is not available to spawn` | deterministic capability: named agent absent |
| Worker reports no repository read/search tools | deterministic capability: reviewer cannot inspect evidence |
| Worker answers an unpredictable file-line probe from context or incorrectly | deterministic capability: context echo, not repository review (2026-08-04) |
| Worker can read files but not version-control state | capability gap for transition/diff review (Devin, 2026-07-31/08-02) |
| Tool-schema validation error | call-shape error, not a worker result |
| `429`, rate limit, transport timeout | transient transport failure |
| Empty/no-op worker return | ambiguous failed dispatch; one corrected redispatch may distinguish scope error from outage |

Record the class and exact error in process telemetry. When a new stable harness quirk is observed, add a dated observation here; do not copy adapter procedures back into this file.

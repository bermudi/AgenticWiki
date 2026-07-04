---
title: Code Intelligence
created: 2026-04-25
updated: 2026-06-18
sources:
  - "raw/yt-no-vibes-allowed-dex-horthy.md"
  - raw/2606.16707v1.md
tags: ["static-analysis", "ai-context", "symbol-graph", "executable-memory"]
unaudited_marginal: 0
---

# Code Intelligence

> The ability of a system to understand code semantically, including symbol definitions, references, and dependency relationships.

## Role in AI Engineering

In the context of AI coding assistants like [[cody]], code intelligence is used to provide **deep context** to the LLM. Instead of just sending raw text (standard RAG), the system sends:
- **Symbol Definitions**: What a specific class or function does.
- **References**: Where else this symbol is used.
- **Dependency Graphs**: How different modules interact.

This prevents [[vibes-based-engineering]] by grounding the AI's suggestions in the actual structure of the codebase.

## The User as Code Extension

The [[executable-memory|User as Code]] paradigm (Bojie Li, Pine AI, 2026) is a generalization of code intelligence applied to the user model. Instead of understanding *code* semantically, the system understands the *user* semantically — by representing the user as a directory of typed Python that an interpreter can read. The agent's intelligence over the user is the same kind of intelligence code intelligence provides over a codebase:

- **Typed Definitions**: `passport = PassportInfo(number="AB1234567", expiry_date=date(2025, 2, 18))` is more useful to an agent than "the user's passport expires Feb 18, 2025" because the typed object supports date arithmetic, equality checks, and grouping without re-parsing.
- **References**: When the user says "I'll be in Tokyo Jan 15", the system can match `trips[0].departure_date == date(2025, 1, 15)` to a typed Trip object and surface it for follow-up reasoning.
- **Dependency Graphs**: Domain packages (`travel/`, `health/`, `finance/`) form a module graph; constraints in `constraints/` depend on multiple domain states; the manifest stitches them together.

The decisive difference: code intelligence is built by humans (the symbol graph is hand-constructed or learned from the codebase). The UaC user model is **built by the LLM at runtime** from the full conversation history. The agent is the architect of its own code intelligence over the user. This is [[evolving-context]] at the schema layer — the data model itself is LLM-generated.

The capability that follows: the agent can reason over the user with the same primitives it uses to reason over code. Aggregate questions ("how many international trips in 2025?") become list comprehensions over typed state. Constraint checks (drug-allergy interactions) become deterministic boolean functions. The agent's reasoning is no longer limited to "search the conversation history" — it can execute the same code-shaped reasoning it would use on a codebase.

## Thread
- [[the-human-lever]] — Code intelligence as the foundation for high-fidelity context in grey box engineering
- [[executable-memory]] — User as Code extends code intelligence from the codebase to the user: the user model is a directory of typed Python the agent can reason about like code

## Related

- [[sourcegraph]] — A platform built around code intelligence.
- [[grey-box-engineering]] — Relies on code intelligence for "Human Design Authority."
- [[vibes-based-engineering]] — Code intelligence is the antidote to vibes-based context.
- [[cody]] — The product that embodies code intelligence for AI coding.
- [[dex-horthy]] — Primary advocate for code intelligence in AI workflows.
- [[the-human-lever]] — Code intelligence as the foundation for human design authority.
- [[agent-experience]] — Code intelligence improves AX by providing high-fidelity context.
- [[satisfaction-of-search]] — Code intelligence mitigates satisfaction of search by providing semantically grounded context instead of surface-level matches
- [[unblocked]] — Productized code intelligence with a context engine architecture
- [[sourcegraph]] — Code intelligence pioneer; Unblocked's Cody integration
- [[executable-memory]] — User as Code is code intelligence generalized to the user model: typed Python, dependency graphs, module structure
- [[evolving-context]] — The user model is LLM-generated and regenerated from the full fact corpus; the data model itself evolves
- [[bojie-li]] — Author of User as Code

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md` — Dex Horthy's articulation of code intelligence for AI workflows
- `raw/2606.16707v1.md` — Bojie Li (Pine AI, 2026). *User as Code.* Generalizes code intelligence from the codebase to the user: the user model is a directory of typed Python the agent reasons about like code. The schema is LLM-generated, regenerated from the full conversation history.

---
title: Neuro-Symbolic AI
created: 2026-07-27
updated: 2026-07-27
sources:
  - raw/why-agentic-systems-need-ontologies-frank-coyle-uc-berkeley-youtube.md
tags: [concept, neuro-symbolic, ontologies, guardrails, knowledge-representation, agent-reliability]
unaudited_marginal: 0
---

# Neuro-Symbolic AI

> The convergence of probabilistic neural networks (LLMs) with formal symbolic representations (ontologies, knowledge graphs, rule-based systems) to create guardrails around agent behavior. [[frank-coyle|Frank Coyle]] frames this as the practical answer to the hallucination problem: not eliminating probabilistic generation, but surrounding it with formal constraints that catch logically impossible outputs.

## The Convergence

Coyle identifies two lineages that are now merging:

- **Agents** trace back to the early days of AI — McCarthy, Minsky, the 1956 Dartmouth conference — culminating in the perceive-decide-act loop that defines modern agentic systems.
- **Ontologies** trace back to Aristotle's categories of being, formalized by Gruber (1993) as "a formal specification of a shared conceptualization."

The convergence is that LLMs (probabilistic, capable, but unbounded) meet ontologies (formal, constrained, verifiable). The term for this hybrid is neuro-symbolic AI: neural networks tied into symbolic AI, which includes rule-based systems and knowledge graphs.

> [!note] Departure: Hallucination as Feature
> Coyle reframes hallucination — the standard term for LLMs generating false content — as a *feature* rather than a bug: "People worry about hallucinations, but that's the feature. That's actually a feature of large language models. It's who we are. We hallucinate in a way. We imagine things that may not exist, and then we turn them into reality." This is a departure from the wiki's [[hallucination]] page, which treats hallucination as a failure mode to be mitigated. Coyle's point is that probabilistic generation is what makes LLMs creative and useful; the goal is not to eliminate it but to constrain its output with formal guardrails.

## Ontologies as Guardrails

An ontology is a graph data structure: entities with properties, connected by relationships. What makes it more than a database schema is the layer of formal constraints that sit alongside the graph:

### RDFS: Domain and Range

RDFS (RDF Schema) provides inference rules that derive new facts from existing ones. Coyle's example:

- If `teaches` has a **domain** of `teacher`, then `Bob teaches Scooter` implies `Bob is a teacher`.
- If all `teachers` are `persons`, then `Bob is a person`.
- If `teaches` has a **range** of `student`, then `Scooter is a student`.

This is inference that the LLM cannot do reliably on its own — it requires formal structure.

### OWL: Transitive and Functional Properties

OWL (Web Ontology Language) adds richer constraints:

- **Transitive properties**: If `ancestor` is transitive, and `Sue is an ancestor of Mary` and `Mary is an ancestor of Ann`, then `Sue is an ancestor of Ann`. This fact was not in the original graph but can be derived.
- **Functional properties**: `has father` is functional — you can only have one. If `Bob is Jim's father` and `BB is Jim's father`, then `Bob and BB are the same individual`. This is a constraint that catches impossible states.

### What Ontologies Catch That Text Cannot

Coyle gives concrete examples of domain errors that ontological constraints catch but natural language processing misses:

| Error | OWL mechanism | Why text fails |
|---|---|---|
| Second refund on the same order | Functional property on `has_refund` | "Tricky to do that in English" |
| Payout sent to support desk instead of buyer | Disjoint properties (`customer` and `support rep` are separate entities) | LLM doesn't enforce entity separation |
| Fabricated status value ("probably shipped") | Enumerated value constraint (`status ∈ {paid, shipped, refunded}`) | Probabilistic models return "crazy stuff" |

## The Agent Loop Application

Coyle maps this onto the standard LLM agent loop (prompt → LLM → tool call → execute → check result → repeat):

1. **Pydantic at the door**: Use Python's Pydantic library for input type validation — ensuring the LLM's structured output matches expected parameter types.
2. **Ontology at the ledger**: After the tool executes, use ontological constraints to validate the *semantic correctness* of the result — not just "is this the right type?" but "does this make sense in our domain?"

> Pydantic at the door, ontology at the ledger.

This is a two-layer backpressure architecture: syntactic validation catches type errors; semantic validation catches domain-logic errors. The agent should have no side effects until it passes both layers.

## Existing Ontologies to Reuse

Coyle emphasizes that many ontologies already exist and should be leveraged rather than reinvented:

- **Schema.org** — standardized terms and relationships for web data
- **FOAF** (Friend of a Friend) — modeling social networks
- **Dublin Core** — describing research papers and books
- **DBpedia** — the ontology underlying Wikipedia's search

## Thread

- [[the-agent-workflow]] — Neuro-symbolic guardrails as a quality layer in the agent workflow
- [[the-human-lever]] — The human designs the ontology; the agent operates within it
- [[tool-design-for-agents]] — Ontologies as tool-output validation contracts

## Related

- [[agent-loop]] — The loop that neuro-symbolic guardrails wrap
- [[backpressure]] — Ontology-based validation as semantic backpressure
- [[hallucination]] — The failure mode ontologies are designed to catch
- [[knowledge-triplet]] — Ontologies formalize "what you know and express" into machine-checkable constraints
- [[ai-boilerplate-paradox]] — Pydantic as the syntactic complement to ontological semantic constraints
- [[contextcov]] — Executable guardrails as a parallel approach (process/shim-level backpressure)
- [[inferential-rule-following]] — Models pattern-match rather than follow formal rules; ontologies externalize the rule-following
- [[frank-coyle]] — The speaker who made this argument

## Sources

- `raw/why-agentic-systems-need-ontologies-frank-coyle-uc-berkeley-youtube.md` — Coyle's talk at AI Engineer: the convergence of neural and symbolic AI, Gruber's definition, RDFS/OWL mechanisms, the Bohm-Jacopini connection, the Pydantic+ontology two-layer pattern, and practical examples of what ontologies catch

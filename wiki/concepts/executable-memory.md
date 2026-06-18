---
title: Executable Memory
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/2606.16707v1.txt
  - raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.pdf
tags: [concept, agent-memory, code-as-representation, harness, personalization, executable-verification]
unaudited_marginal: 0
---

# Executable Memory

> The paradigm in which an agent's model of a user is a living software project — typed Python objects hold the user's state, ordinary Python functions encode the rules that govern it, and an interpreter runs the whole thing. Memory is no longer a passive fact store consulted by retrieval; it is code that the agent and the interpreter can both execute, version, and verify.

## Origin

**User as Code (UaC)** — Bojie Li, Pine AI, June 2026 (arXiv 2606.16707). Open-source: github.com/19PINE-AI/user-as-code.

The framing: "Today this memory is almost always stored as unstructured text, a knowledge graph, or a flat store of extracted facts, and consulted by retrieval... Such 'bag-of-facts' memory recalls individual facts well, but because storing a fact and acting on it are separate steps, it struggles to resolve contradictions, aggregate over many records, or enforce logical rules. We argue that user memory should instead be executable."

The bet: the representation sitting between record and recall is the real lever. A record-side structure expressive enough that the recall side can read back what it needs with both high recall and high precision. Typed, executable code is the bet on what that structure should be.

## The Three Capability Tiers

UaC organizes user-memory tasks into three tiers that map onto distinct representations:

| Tier | Task | Representation that solves it | UaC result |
|---|---|---|---|
| 1. Basic Recall | "What is my passport number?" | Attribute access (every memory system gives you this) | 78.8% on LOCOMO (within 1.0pp of full-context upper bound 79.8%) |
| 2. Multi-session Retrieval | "Which doctor did I see for my allergies?" (months apart) | Similarity over facts + raw archive | Covered by retrieval channels |
| 3. Active Service | "Your amoxicillin conflicts with your penicillin allergy" — system raises it without being asked | Boolean check the interpreter runs deterministically at every state change | 100% on 40 standard Active Service scenarios |

The new capability beyond plain multi-session retrieval is **analytical inference** — aggregate questions over a user's history ("how many international trips did I take in 2025?", "average dining spend by cuisine last year?"). UaC isolates this with its own benchmark: 99% across 100 cases versus 6% (Mem0) and 43% (MemMachine) for retrieval-based systems. The reason: the answer is a one-line computation over typed state, not a search over text.

## The Two-Phase Architecture

The pipeline that converts raw conversation into executable code is two phases, and the ablation isolates that they must be separate concerns:

### Phase 1: Memorize (per session, append-only)

An LLM extracts every individual fact as a flat string from each session. Facts are appended to a running list — never overwritten, never deleted. Relative dates are resolved to absolute dates against the session timestamp. Yields ~50–75 facts/session. The cost of overwriting facts is severe: the ablation shows append-only extraction alone is +19.0pp on LOCOMO over a code-only baseline. Once a fact is dropped, downstream consumers cannot recover it.

The append-only log is a database-systems pattern applied to LLM memory. The novel move is pairing it with a typed-Python checkpoint as the second phase.

### Phase 2: Structure (periodic, from all facts)

An LLM regenerates the entire structured Python from the accumulated fact list, organizing facts into typed dataclasses: `date()` for dates, typed lists for collections, `notes: list[str]` for hard-to-type facts. Because the code is regenerated fresh from the complete corpus — not edited incrementally — information loss in the fact-to-structure transition is minimal (0.18% of facts on the audited conversations). This adds +12.3pp over incremental code rewrites, which lose 10pp on LOCOMO because each session's code rewrite drops earlier facts.

The pattern: **separate the append-only log from the structured checkpoint**, and regenerate the structured view from the full log rather than editing it incrementally. This is the database write-ahead log + materialized view pattern, applied to LLM memory with typed Python as the materialized view.

## The Generate-Verify-Review Loop

The same code is the substrate for proactive service. The loop:

1. **Generate**: The coding agent writes Python constraints against the code-represented state.
2. **Verify**: Execute in a sandbox — results are deterministic.
3. **Review**: The agent reviews results, decides to refine, persist, or incorporate.

When an ad-hoc check proves useful, the agent promotes it to a persistent constraint. Alerts surface in the manifest's `ACTIVE_ALERTS`, visible at the start of every future conversation. Constraints emerge autonomously from the LLM's reasoning — the agent does not need to be told which checks to write.

This is the same [[agent-quality-loop|generate-verify-review]] pattern as the broader agent quality literature, but applied to a typed substrate the interpreter can run. A constraint that fires once is testable code; a constraint that fires on every state change is a continuous, deterministic check.

## The Manifest Pattern

The user's project is structured as a self-evolving software project:

```
domains/
  travel/
    state.py          # typed user state (passport, trips)
  health/
    state.py          # allergies, medications
  finance/
    state.py
constraints/
  travel_readiness.py # boolean checks over state
  drug_allergy.py
manifest.py           # always-loaded compact summary (~300 tokens)
                      # + ACTIVE_ALERTS overwritten by constraint runner
```

The manifest is **always** in the agent's context (~200–300 tokens): domain names, one-line summaries, and pre-computed `ACTIVE_ALERTS`. When a query comes in, the agent routes to the relevant domain and loads only the typed state for that domain. The Modularity/Progressive Disclosure ablation quantifies the win: 14.9× lower cost than the monolithic "always-dump-full-state" baseline, with **no accuracy loss** at 500 records (98.0% vs 97.0%). The 24× prompt-token drop is the structural reason — the agent reads the right ~50 records, not all 500.

## Design Principles

The paper formalizes five design principles. Three are isolated empirically; two are forward-looking:

1. **Separation of Structure and Data** — schema (dataclasses) separated from state (instances). Validated by the ablation.
2. **Unified Representation and Verification** — code serves as both storage and verification medium. Validated by Active Service and Analytical Inference.
3. **Modularity by Life Domain** — memory partitioned into independent domain packages. Limits cross-domain leakage; supports selective loading at scale.
4. **Progressive Disclosure** — compact manifest with on-demand domain loading. Keeps the prompt budget bounded as the user state grows.
5. **Agent-Native File System** — user project is a directory in the agent's workspace — no custom memory API needed. Memory operations are file-system actions, directly compatible with RL-based memory training.

## Multi-Strategy Retrieval

Query-time retrieval composes three channels rather than picking one. Each addresses a different failure mode of the others:

1. **Structured code state** — full `state.py` of the manifest-routed domain (or all domains, non-modular), truncated at 6,000 characters. The agent reads typed dataclass instances with no parse step.
2. **Fact-vector retrieval** — ChromaDB over the append-only fact list (top-20 by cosine similarity). Recovers facts the structuring step compressed away.
3. **Archive retrieval** — second ChromaDB collection of raw conversation chunks (top-10). Last-resort fallback for direct-quote queries.

The three channels are concatenated under fixed headers (`[STATE]`, `[FACTS]`, `[ARCHIVE]`) and passed to the answer LLM with no reranking; the prompt instructs it to prefer the structured channel on conflicts. The leave-one-out channel ablation on LOCOMO is honest: the structured state is **roughly neutral for pure recall** (−1.3pp, p=0.67). The fact-vector and raw-archive channels are the load-bearing recall mechanisms (+9.3pp and +7.3pp when each is removed). The structured state is decisive for the two capability tiers retrieval cannot serve — analytical inference and constraint alerts.

## Empirical Results

**LOCOMO (10 conversations, 600 QAs):** UaC reaches 78.8%, within 1.0pp of the Full Context upper bound (79.8%; McNemar p=0.65). All same-backbone SOTA reimplementations (MemMachine 72.7%, Hindsight 69.7%, EverMemOS 55.5%, A-MEM 51.8%, Mem0 29.3%) trail significantly (all p < 0.005). Cross-LLM portability verified by swapping in GPT-5.4 throughout the pipeline — 80.8% on a 2-conversation LOCOMO subset (p=0.82 vs. Gemini on the same subset).

**LongMemEval (500 questions):** UaC reaches 83.0%, statistically tied with MemMachine (84.8%, p=0.33) and Full Context (85.4%, p=0.19). Typed `date()` fields help most on knowledge-update (97% vs. 91/96%) and single-session-preference (83% vs. 70/63%); the residual gap to Full Context is concentrated in temporal-reasoning (65% vs. 74%).

**Analytical Inference (100 cases, N∈{20,50,100,200,500}):** UaC reaches 99%, matching Full Context + Python REPL (100%) and far above retrieval-based systems (MemMachine 43%, Mem0 6%). The divide is between representations a code tool can read (UaC, FC+REPL) and representations only retrievable by similarity (Mem0, MemMachine). Full Context without a REPL degrades past N=100 (90% at N≥200) as the LLM miscounts. UaC's specific contribution is felt one step earlier: converting unstructured conversation into the code-readable representation, which is the prerequisite for analytical inference in real deployments.

**Active Service (40 standard + 20 hard scenarios):** UaC reaches 100% on standard (CI [91.2, 100.0]) and 85% on hard (CI [64.0, 94.8]) — every category (travel document validity, drug interactions, financial authorization conflicts, scheduling conflicts, warranty/deadline expirations). The decisive factor on Active Service is the **pipeline, not the representation**: UaC without pre-computed alerts drops to 52.5%. The constraint runner doing the work is what separates UaC from four of five baselines at p<0.01. The 1.0pp residual gap to Full Context on the LOCOMO benchmark is dominated by single-hop minor details (specific book titles, exact early-session dates) that extraction occasionally compresses away — at most ~0.2pp is explained by Phase 2 dropping facts the question needed; the remainder is in the retrieval layer.

**Cost amortization:** Structuring is paid once per user state. At N=500, UaC's structuring cost is 102 m$, each subsequent query is ~1.4 m$, while FC+REPL re-loads the records every query at ~38 m$. Breakeven: 3 queries at N=500, 11 at N=20. Amortized over 100 queries, UaC is 15.5× cheaper than FC+REPL.

**Cross-LLM and cross-judge robustness:** GPT-5.4 substituted throughout yields a statistical tie (p=0.82) with Gemini on a 120-QA LOCOMO subset. Rejudging all 7,700 predictions under Claude Opus 4.7 preserves the ranking with Cohen's κ ≥ 0.74 on every system.

## The Bitter-Lesson Bet

The most architecturally distinctive choice: **no human-designed schema**. The data model itself is not hand-authored. Schemas, domain partitioning, and constraints are all produced by the LLM at structuring time and regenerated from the full fact corpus as the user's life changes.

The framing draws on Sutton's bitter lesson: hand-engineered structure tends, in the long run, to be overtaken by general methods that scale with data and compute. Instead of encoding a fixed ontology, UaC leans on the single capability current LLMs are strongest at — code generation — and lets the model design the data structures that fit each user. The absence of a human-designed schema is a feature, not a pitfall: the only human contribution is the scaffolding, not the structure of the memory itself.

The trade-off is honest: the engineering scaffolding — the two-phase pipeline, the generate-verify-review loop, the sandbox boundary — is human-designed and fixed. The interpreter is a tool the LLM uses to verify its own outputs, not a rule layer it must obey, which keeps the system open-ended as user state grows.

## Relationship to Existing Wiki Concepts

- [[code-as-agent-harness]] — UaC is the most concrete case study of code as harness applied to user memory. The user model becomes a directory of typed Python that an interpreter computes over directly. Extends the survey's "code for environment modeling" to the user.
- [[memrefine]] — The complementary memory-compression framework. Where UaC sidesteps the storage-budget problem by structuring the user model (so redundancy is controlled at write time), MemRefine targets the inverse problem on free-text memory stores: given an already constructed store that has outgrown a budget, [[llm-guided-compression|an LLM judge]] decides which entries are redundant, complementary, or distinct, iterating until the store meets the target size. Both are offline, post-construction maintenance primitives for long-term agent memory; the difference is substrate.
- [[evomem]] — A complementary memory-evolution primitive. Where UaC structures the *current* user model as typed Python, EvoMem structures the *evolution history* of any memory as append-only patches. UaC makes the present representation executable; EvoMem makes the change history auditable. They are orthogonal primitives: an executable-memory agent could use EvoMem to track how its typed Python state evolved across structuring regenerations.
- [[harness-mechanisms]] — Memory becomes a first-class harness mechanism via the two-phase pipeline. The scaffolding (Phase 1, Phase 2, constraint runner) is human-designed harness infrastructure; the schemas and constraints are LLM-generated harness surface.
- [[evolving-context]] — UaC is the most aggressive instantiation of evolving context: the LLM writes its own schema, its own domain partitioning, and its own constraints at runtime, from the full fact corpus. Closer to "the system improves its own data structures" than to "the system improves its own prompt."
- [[multi-tier-action-space]] — The user project is a directory in the agent's workspace; memory operations are file-system actions. The thin-tool-plus-computer tier hosts executable memory: the agent uses bash/python tools to read state and run constraints.
- [[verifiability]] — The Python interpreter is the verification boundary. Constraints are deterministic boolean checks; the LLM is not in the verification loop at check time. This is the verifiability thesis applied to memory: a domain becomes verifiable not by being trained on, but by being represented in a medium the interpreter can run.
- [[jagged-frontier]] — Concrete empirical evidence for the jaggedness prediction: retrieval is fine for recall (LOCOMO), code-exec is required for aggregation (analytical inference), retrieval cannot serve constraint checking at all. The capability frontier is jagged across representation, not just across domain.
- [[verifiability]] — UaC instantiates Karpathy's claim that "traditional computers can easily automate what you can specify in code." The user model is specified in code, and the computer automates everything that follows. The reach of automation is whatever the interpreter can run.
- [[agent-quality-loop]] — The generate-verify-review loop is a concrete quality loop. Ad-hoc checks get promoted to persistent constraints when they prove useful — a self-extending verification infrastructure.
- [[context-engineering]] — The manifest is always-loaded compact context (~300 tokens); the structured state is loaded on demand. Progressive disclosure at the memory layer.
- [[backpressure]] — Constraints act as backpressure on agent action: a constraint that fires blocks or routes the agent. The interpreter is the mechanical rejector.
- [[procedural-knowledge]] — Persistent constraints are procedural knowledge in executable form. The agent accumulates checks as it discovers them.
- [[recursive-agent-harness]] — Both instantiate a "code for spawning/structuring" pattern, but at different layers. Recursive-agent-harness spawns subagent harnesses; UaC structures a user's state into typed Python.
- [[self-harness]] — Both involve the LLM improving its own operating substrate. Self-harness edits the harness; UaC regenerates the user model. Self-harness has held-out regression tests; UaC has cross-fact consistency checks (every fact must appear somewhere in the structure, 0.18% drop rate).
- [[knowledge-triplet]] — UaC is a response to the fabrication problem: facts the user actually said, typed in code, versioned in the append-only log, regenerateable from the corpus. There's no "is it in the training data?" — it's in the user's own conversation.
- [[comprehension-debt]] — The append-only fact list is human-readable; the structured Python is a transparent representation of the user. The user can read the manifest and audit what's stored. A counter-move against the opacity of opaque agent memory.
- [[code-clarifies-spec]] — The bitter-lesson bet inverts this slightly: the agent designs the data structures as it goes, rather than implementing against a pre-written spec. The act of writing code clarifies the data model; the act of regenerating the data model updates the code.

## Thread

- [[the-verifiability-thesis]] — UaC instantiates the thesis at the memory layer: the Python interpreter is the verification boundary, the constraint runner is the verification mechanism, and the model is not in the loop at check time.
- [[code-as-agent-harness]] — UaC extends the code-as-harness framework to the user model. The user is represented by typed Python the agent can read and write.
- [[the-agent-workflow]] — The two-phase pipeline is the workflow's memory layer: memorize per session, structure periodically, serve on demand.
- [[agent-quality-engineering]] — The generate-verify-review loop is a concrete quality loop for memory; constraints accumulate as the agent discovers them.

## Related

- [[proactive-service]] — The Active Service tier that executable memory makes possible; the constraint pipeline is the proactive engine
- [[harness-mechanisms]] — Memory as a first-class harness mechanism; the two-phase pipeline as a harness pattern
- [[evolving-context]] — Evolving context at the schema layer: the LLM writes its own data structures
- [[code-as-agent-harness]] — The framework UaC is the most concrete application of
- [[multi-tier-action-space]] — The user project as a directory in the agent's workspace; memory operations as file-system actions
- [[verifiability]] — The interpreter as the verification boundary; constraints as deterministic boolean checks
- [[jagged-frontier]] — Concrete empirical evidence that capability is jagged across representation
- [[agent-quality-loop]] — The generate-verify-review pattern applied to memory
- [[context-engineering]] — Manifest as always-loaded compact context; structured state on demand
- [[backpressure]] — Constraints as mechanical rejection
- [[procedural-knowledge]] — Persistent constraints as procedural knowledge in executable form
- [[recursive-agent-harness]] — Code-driven spawning of subagents; UaC is code-driven structuring of a user
- [[self-harness]] — The LLM improving its own operating substrate; UaC is the LLM regenerating the user model
- [[comprehension-debt]] — The append-only log and structured Python as a counter-move against opaque agent memory
- [[code-intelligence]] — The user model IS the model — typed Python the agent reasons about
- [[bojie-li]] — Author of UaC, Pine AI
- [[evomem]] — A complementary memory-evolution primitive: where UaC structures the *current* user model as typed Python, EvoMem structures the *evolution history* of any memory as append-only patches. They compose: an executable-memory agent could use EvoMem to track how its typed state has been regenerated across structuring cycles
- [[state-collapse]] — The failure mode EvoMem is designed to prevent; UaC sidesteps it via the recoverable append-only fact log
- [[evoarena]] — The benchmark designed to evaluate EvoMem and the chain-accuracy metric; could host UaC or EvoMem as the memory backbone
- [[jundong-xu]] — Lead author of the EvoArena paper

## Sources

- `raw/2606.16707v1.txt` — Bojie Li, Pine AI (June 2026). *User as Code: Executable Memory for Personalized Agents.* The full paper: two-phase architecture (append-only memorize + periodic structure), three capability tiers (recall, analytical inference, active service), generate-verify-review loop, manifest pattern, Active Service benchmark, Analytical Inference benchmark, Modularity/Progressive Disclosure ablation, retrieval-channel ablation, scaling discussion. Open-source implementation: github.com/19PINE-AI/user-as-code.
- `raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.pdf` — Xu et al. (NUS + collaborators, June 2026). *EvoArena.* EvoMem paradigm: append-only patch history preserving every non-additive memory update. The wiki's [[evomem]] page is filed separately; this page cross-references EvoMem and [[evoarena]] as complementary primitives — UaC structures the present user model as typed Python, EvoMem preserves the evolution history of any memory as append-only patches, and the two compose. Chain accuracy metric (where EvoMem helps most) and state-collapse failure mode (which UaC sidesteps via the recoverable append-only fact log).

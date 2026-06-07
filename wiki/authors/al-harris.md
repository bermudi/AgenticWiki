---
title: Al Harris
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
unaudited_marginal: 0
tags: [author, practitioner, amazon, kiro, spec-driven-development, ears]
---

# Al Harris

> Principal engineer at Amazon; on the Kiro team. Primary technical source on EARS (Easy Approach to Requirements Syntax) for structured natural language requirements, property-based testing as a downstream check on EARS, and the spec-as-three-things model (artifacts + workflow + reproducibility tools). Articulates the "neurosymbolic hybrid" claim: the agent is not just an LLM with a workflow, it is an amalgam of LLM and automated-reasoning tools chosen per task.

## Background

Harris has been on the Kiro team since its earliest days. The team is "a very small team. We were basically three or four people sitting in a closet." Kiro launched public preview July 14, 2025 and went generally available November 17, 2025. Harris is the public technical voice of the team, presenting the "agentic coding at FAANG scale and quality" framing.

## Key Contributions

### Spec as three things

A spec is not just a document. It is:

1. **A set of artifacts** representing the state of the system at a point in time — requirements with acceptance criteria, design documents, task lists, tests.
2. **A structured workflow** that pushes you through requirements → design → execution phases to reliably deliver high-quality software.
3. **A set of tools and systems on top of the artifacts and workflow** that help deliver reproducible results — the canonical example being property-based testing, with the less-obvious example being requirements verification (scanning for ambiguity, conflicting constraints).

Harris: "ultimately the way I look at spec is that it is one a set of artifacts that represent sort of the state of your system at a point in time t. It is two a structured workflow that we push you through to reliably deliver high-quality software and that is the requirements design um and execution phases. And then three it is a set of tools and and um systems on top of that that help us deliver reproducible results."

### EARS (Easy Approach to Requirements Syntax)

EARS is a structured natural language format with the syntax `When <trigger>, the <system> shall <response>`. The structure lets the system parse requirements *without* the LLM in the loop, which is the key to reproducibility: "this is the first step of many we're taking to actually take these structured natural language requirements and then tie this with a throughine all the way to the finished code."

EARS is also the substrate for the "requirements verification" feature: scanning requirements for ambiguity, invalid constraints, and conflicting requirements using "classic automated reasoning techniques."

### Property-based testing as the verification layer

The shipping feature in Kiro's GA: EARS requirements are translated into correctness properties of the system. These are then used as the basis for property-based tests (similar to Hypothesis in Python, fast-check in Node, closures spec library). The agent generates code; the property-based tests verify that the code meets the invariants.

Harris: "if the properties of the code meet the initial requirements, we have a high degree of confidence that you have re uh reliably shipped the the software you expected to ship." He is explicit about the "high degree" being soft: "where the word high there is doing a little bit of heavy lifting because it depends on how well you write your tests."

### The neurosymbolic hybrid claim

Kiro is "not just an LLM with a workflow on top of it. The backend may or may not be an LLM, or it may or may not be other neurosymbolic reasoning tools under the hood." Different tasks are routed to different tools — the LLM for chatting, automated reasoning for requirement verification, the LLM again for code generation, property-based testing frameworks for verification. "You're talking to sort of an amalgam of systems based on what type of task you're executing at any point in time. Um, although when you're chatting, you are talking to just an LLM."

This is a stronger position than "we use the LLM with structure" — it is a claim that the structure is *itself* the product, with the LLM being one component among many.

### The 200/400/800-grit sharpening model

Harris's metaphor for progressively adding capability to the SDD workflow:

- **200 grit** (basic polish): MCP integration. Use fetch MCP, Brave/Tavily search, AWS docs MCP, etc. to ground the spec generation. "Useful, but it's not going to be a gamecher for us."
- **400 grit** (better polish): custom artifacts. Add wireframe diagrams to the design doc, explicit test cases to the task list. Because the artifacts are natural language, you can ask for whatever you want and the agent translates it.
- **800 grit** (final polish): iterate on the process, not just the artifacts. "Anything you put in the prompt is effectively rounding the agent. Um, for better or for worse." Harris's example: he asked for S3 persistence, the agent went deep on S3; he then asked "is this the idiomatic way to achieve session persistence?" and the agent (using MCP-grounded research) found the AWS-native AgentCore Memory feature that was a better fit.

### Steering docs

Kiro's branded equivalent of context files (AGENTS.md, CLAUDE.md, .cursorrules). Three use cases Harris demonstrates:

- **Commit style preferences** — "very specifically my requirement for Curo is just use the UI attributed to the co-author of Kuro agent um which is trivial but also I want it to happen every time."
- **Code style / coverage minimums** — "whenever you add a spec or you're adding a new module, make sure that you annotate it with coverage minimums that are 90% because that's the thing I care about."
- **Operational learnings** — write what the agent learns into steering. "I went through this kind of painful process of figuring out oh you know you have to use this parameter on the CDK the CDK command you have to use this lag otherwise it doesn't work correctly and so once I go through that pain of learning I just say kira write what you learned into a steering doc and it will usually do a very good job of summarizing."

Steering is *accumulated learnings*, not a static configuration file. The system prompt gives the agent access to steering at every turn.

### Brownfield: separation of concerns is the constraint

Harris is explicit that the quality of brownfield work tracks the separation of concerns in the existing codebase. "If your system already had good separation of concerns, your components in your system are highly cohesive and they're sort of highly coherent and highly cohesive, it's going to have a great job... if you took a lot of tech debt along the way that you need to unwind... your agent might actually have a much harder time traversing the codebase in the same way that a dev would."

This is an instance of the [[deep-vs-shallow-modules]] principle: deep modules with clear seams are agent-friendly. The Kiro team did exactly this with their own VS Code fork: "we're going to be talking in a couple weeks at reinvent about how some of the temple features in Curo were built via spec in a codebase we did not understand particularly well because we're just not VS code devs. Um, and Curo did a fine job of it. But again, that's a testament to the fact that codebase is reasonably well um structured."

### Bidirectional spec sync (long-term vision)

Harris is explicit that bidirectional sync is the goal, not the current state: "as I continue to work with Kira you're not just acrewing these sort of task lists uh and so I'm just going to say go for it to go to the tasks um but we're not just acrewing task list but actually if I come back and, let's say, change the requirements down the road, we will mutate a previous spec. So I'm looking at really just a diff of requirements."

Kiro currently tracks this in some cases (the demo showed the agent finding an existing telemetry spec and amending it rather than creating a new one) but the cross-functional case (a single change updating multiple specs) is not solved.

### Session length management

Kiro has no incremental pruning or incremental summary today. "We have no incremental pruning today or incremental summary. Um you basically just accrete context until you hit your limit." The summarization feature that triggers at the cap is "not great" — a 30-45 second blocking operation, with an improved real-time version planned for "the next couple of weeks."

The reason this hasn't been solved is prompt caching: "I can achieve something like 90 95% cash token usage here on per turn, which means that my interactions are very fast. And that's or they're much faster than the alternative, which is I'm sending 160k tokens to to bedrock cold." Summarization breaks the cache.

## Implementation Notes

Kiro is built on a code-OSS fork, the same base as Cursor and Windsurf. Harris's "big code base" for testing is the code-OSS codebase itself, which has "perceived slowdown" when working with it but is the team's primary development environment.

MCP integration is the primary tool-surface expansion mechanism. Harris is bearish on bundling AWS-specific tools: "I don't want to ship this to customers who don't need it." AWS customers add the AWS documentation MCP server, GCP customers would add GCP equivalents. The same product is sold to all.

## Related

- [[kiro]] — The product Harris is a principal engineer on
- [[spec-driven-development]] — The methodology Harris's product codifies
- [[ears-notation]] — The structured natural language format Harris designed
- [[property-based-testing-as-spec]] — The verification layer that translates EARS into invariants
- [[steering-docs]] — Kiro's branded context files; Harris's preferred term
- [[context-files]] — The general category; steering docs are Kiro's specific instance
- [[intent-to-code]] — The Kiro stack is the most explicit machine-parseable realization of the plan-as-contract position
- [[deep-vs-shallow-modules]] — Harris's brownfield finding is an instance of this principle
- [[mcp]] — The tool-surface mechanism Kiro uses; "use your MCPs when building specs"
- [[cian-clarke]] — Practitioner source who recommends Kiro as a foundation tool; complementary framing (Clarke = team workflow, Harris = technical depth)

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. EARS structured natural language; spec as three things (artifacts + workflow + reproducibility tools); property-based testing as verification layer; neurosymbolic hybrid claim; 200/400/800-grit sharpening model; steering docs as accumulated learnings; brownfield separation-of-concerns finding; bidirectional spec sync vision; session length management tradeoff (prompt cache vs summarization); MCP integration strategy.

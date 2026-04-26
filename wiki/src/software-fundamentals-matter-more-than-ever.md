---
title: Software Fundamentals Matter More Than Ever
created: 2026-04-25
updated: 2026-04-25
sources: []
tags: ["ai-engineering", "software-design", "typescript"]
---

# Software Fundamentals Matter More Than Ever

- **Author**: [[matt-pocock|Matt Pocock]]
- **Type**: Talk / Presentation
- **Key Themes**: #ai-engineering #software-design #typescript

## Summary
Matt argues that while AI can generate code at an unprecedented rate, it cannot (yet) design systems. The ease of code generation leads to a "Specs -> Code" failure loop where system design is skipped, leading to unmanageable complexity. To counter this, engineers must double down on fundamentals like modularity, ubiquitous language, and test-driven development.

## Key Takeaways

### 1. The AI Design Loop (Failure Mode)
The tendency to go straight from a vague specification to code using an LLM. Without an intervening design phase, the resulting code lacks a "shared design concept," making it fragile and hard to iterate on.

### 2. Strategic vs. Tactical Programming
- **Tactical**: Focused on making it work right now. (LLMs excel here).
- **Strategic**: Focused on the long-term health and modularity of the system. (Humans must lead here).

### 3. Deep vs. Shallow Modules
- **Deep Modules**: Simple interfaces that hide significant complexity. These are "AI-friendly" because the AI can work inside the "box" without breaking the rest of the system.
- **Shallow Modules**: Complex interfaces with little logic. These are "AI-hostile" because they leak complexity everywhere, confusing the LLM's context.

### 4. Grey Box Engineering
Treating AI-generated components as "grey boxes"—you don't necessarily need to read every line of the implementation, but you must rigorously verify the boundaries (interfaces) and outcomes (tests).

## Concepts Introduced
- [[ai-design-loop]]
- [[grey-box-engineering]]
- [[deep-vs-shallow-modules]]
- [[shared-design-concept]]
- [[strategic-vs-tactical-programming]]

## Thread
- [[the-human-lever]] — The foundational source for the "human as strategist" thesis.
- [[the-agent-workflow]] — Deep modules and design loops as the structural foundation for agentic workflows.

## Related

- [[ai-coding-for-real-engineers]] — Follow-up talk expanding on the same themes with workflow specifics.
- [[matt-pocock]] — Author and presenter.
- [[the-human-lever]] — The thread where these concepts are synthesized into a theory of human-AI collaboration.
- [[the-slop-problem]] — Without these fundamentals, AI-generated code degrades into slop.

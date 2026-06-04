---
type: web
title: "Agentic Coding is a Trap"
author: "Lars Faye"
url: "https://larsfaye.com/articles/agentic-coding-is-a-trap"
date: 2026-04-26
ingested: 2026-06-03
---

## Agentic Coding is a Trap

### Remaining vigilant about cognitive debt and atrophy.

> *"AI does the coding, and the human in the loop is the orchestrator"*

This is the sentiment being hyped up around the industry currently: traditional coding is all but dead, and Spec Driven Development (SDD) is the future. You generate a plan, and disconnect from writing any code. The agents know better, and handle all the implementation. You are there as *the expert*, to provide "good taste", review the outputs, and constantly steer the agent(s) to execute the plan that you meticulously put together.

The workflow takes many shapes at this point, but in general, it is a process where someone defines the project's requirements (simultaneously at a micro *and* macro level), generates a plan, and then pulls the slot machine lever over and over, iterating and reiterating with often *multiple* agent instances until it's done. All the while, putting a growing distance between the "orchestrator" and the code that is being generated and committed.

Coding Agents are helpful, and powerful, but there's already some quantifiable trade-offs that need to be discussed:

-   An increase in the complexity of the surrounding systems to mitigate the increased ambiguity of AI's non-determinism.
-   Atrophying skills for a wide swath of the population.
-   Vendor lock-in for individuals and entire teams (Claude Code outages have already had entire teams at a stand-still).
-   Fluctuating and increasing costs to access the tools. An employee's cost is fixed; tokens are a constantly moving target.

Being successful with this approach to coding agents hinges on a rather crucial element: only a skilled developer who's thinking critically, and comfortable operating at the architectural level, can spot issues in the thousands of lines of generated code, *before* they become a problem.

Yet, in an ironic twist of fate, it's the individual's critical thinking skills and cognitive clarity that AI tooling has now been proven to impact negatively.

## Not Just Another "Abstraction"

A common refrain we hear in the community is that programmers are just "moving up the stack" and into a different type of abstraction. Whether or not these tools are really an abstraction layer in the first place is not a settled matter; a higher level of ambiguity is not a higher level of abstraction.

If we put that to the side though, it is true that programmers tend to be wary of new languages and new ways of programming. When FORTRAN was released, programmers were skeptical of it, too. They had similar claims: it was likely to introduce more bugs and instability, and writing assembly directly was more efficient. Later, there would be discourse around the integration of compilers introducing too much "magic" into the process. These were normative arguments around a fear of what *might* be lost if these new technologies were embraced.

The difference with what is happening today is that those previous fears were speculative and theoretical. In just the short few years that AI tooling has existed, we are already seeing significant impacts. These aren't *just junior developers*, but even those with a decade (or more) of experience:

(Image: Coding Agents Paradox)
*Coding Agents Paradox*
(Image: Coding Agents Paradox)

Coding Agents Paradox

(Image: Coding Agents Paradox)
*Coding Agents Paradox*
(Image: Coding Agents Paradox)

Coding Agents Paradox

(Image: Coding Agents Paradox)
*Coding Agents Paradox*
(Image: Coding Agents Paradox)

Coding Agents Paradox

(Image: Coding Agents Paradox)
*Coding Agents Paradox*
(Image: Coding Agents Paradox)

Coding Agents Paradox

Junior developers are faced with an even steeper climb, as we truncate their ability to work with code and replace it with reviewing generated code. Reviewing code is important, but it's only 50% of the learning process, at best. Without the friction and challenges that come with working with code directly, their ability to learn is seriously diminished.

(Image: Coding Agents Paradox)
*Coding Agents Paradox*
(Image: Coding Agents Paradox)

Coding Agents Paradox

(Image: Coding Agents Paradox)
*Coding Agents Paradox*
(Image: Coding Agents Paradox)

Coding Agents Paradox

Studying this phenomenon takes time, so anecdotal evidence is important to gather to get a real-time view of the situation. But it has also been studied, and there are numerous reports reinforcing that this is a real phenomenon.

### It actually is different this time.

When a C++ developer moved to Java or Python, they didn't complain of brain fog. When a sysadmin moved to AWS, they didn't feel like they were losing their ability to understand networking.

A Senior Engineer losing their coding edge and becoming "rusty" over time as they move into managerial roles and practice coding less is not a new phenomenon. This was the natural progression of expertise: an engineer who had **decades** of coding, friction, and experience logged would have the time and experience to solidify those skills and wisdom. And they could apply that wisdom when their job became less about syntax, and more about higher-level architectural decisions. Those individuals are not only exceedingly rare, but you won't get the next wave of seniors if we're all abdicating the friction of writing, problem-solving, and debugging.

What is happening right now is a trend where developers, who've never had that longevity or the 30+ years of friction that led to that deep understanding, are being moved into higher-level workflows requiring the same skills to manage the AI agents that the senior engineer took decades to obtain.

However, Senior Engineers aren't immune, either. Simon Willison, a developer with nearly 30 years experience, has reported not having a *"firm mental model of what the applications can do and how they work, which means each additional feature becomes harder to reason about"*

## The "Skilled" Orchestrator Problem

Buried in a recent study by Anthropic was a surprisingly honest moment when speaking about the risks of engaging with coding agents on a regular basis:

> One reason that the atrophy of coding skills is concerning is the “paradox of supervision”... effectively using Claude requires supervision, and supervising Claude requires the very coding skills that may atrophy from AI overuse.

Sandor Nyako, Director of Software Engineering at LinkedIn who oversees 50 engineers, has noticed it proliferating throughout the organization and requested his team not to use them for *"tasks that require critical thinking or problem-solving."*

> "To grow skills, people need to go through hardship. They need to develop the muscle to think through problems," he said. "How would someone question if AI is accurate if they don't have critical thinking?"

There is also the question of what constitutes "overuse". We already have evidence, both data-driven and anecdotal, that these skills can atrophy and dissipate rather quickly (within months in some cases).

This is the contradiction that has many AI boosters talking out of both sides of their mouths: The use of coding agents is actively diminishing the very skills needed to effectively manage the coding agents.

## LLMs accelerate the wrong parts.

Contrary to the current narrative that is being espoused, we didn’t necessarily *need* to write code faster. Especially code we didn’t fully understand, and particularly in huge swaths that we couldn't review in reasonable time frames.

### Before AI, a (good) developer's priority list might look like:

-   Understanding of the code and its relation to the codebase
-   If the code is aligned with the documented and efficient standards
-   As few lines of code as needed to accomplish the goal (while maintaining readability)
-   Turnaround time

### Agentic coding, and LLMs in general, completely invert this list.

Their capabilities and usage tend to focus on speed by increasing the amount of code that can be generated in a specified time frame. Speed is a natural byproduct of high aptitude. When it's forced, it always leads to lower accuracy. The integration of these tools doesn't tend to focus much on deeper understanding or conciseness.

Can they be used that way? Yes, with determination, they certainly can be.

Are they? No, not really; forced mandates and hype around token usage across organizations is demonstrating as such.

## Coding === Planning

There is a divide between developers that isn’t highlighted as much: *Some of us plan, and think, better with code*. Thinking and working in code isn't just meaningless drudgery; it forces you to think about things on a technical level that involves everything from security to performance to user experience to maintainability.

In a recent interview discussing "Spec Driven Development", Dax, the creator of OpenCode *(an open-source coding agent, no less)* was quoted saying:

> “When working on something new or something challenging, me typing out code is the process by which I figure out what we should even be doing.
>
> I have a really tough time just sitting there, writing out a giant spec on exactly how the feature should work.
>
> I like writing out types. I like writing out how some of the functions might play together. I like playing with folder structure to see what the different concepts should be. And this is all stuff that I think most people—most programmers—have always done. I don't really see a good reason why I would stop that personally, because it's how I figure out what to do.”

What you *say* is often not what you *mean*, and LLMs fill in ambiguity with assumptions (or hallucinations), which leads to: **more** review, **more** agent revisions, **more** tokens burned, and **more** disconnection from what is being created. Inversely, You can marvel at the most beautiful, unambiguous, perfectly structured prompt you've ever written, and the LLM can still output a hallucinated method because it is fundamentally a next-token-prediction engine, not a compiler. You cannot replace a deterministic system with a probabilistic one and expect zero ambiguity.

Even the most AI-enthusiastic senior developers are starting to see this disconnection as a looming and growing issue.

## "Vendor Lock-In"

When I was browsing LinkedIn during the Claude outage that occurred a bit ago, I noticed numerous posts highlighting that certain developers and engineering teams were at a standstill. Their workflows, their own coding abilities, had *already* reached a point where they were largely dependent on these vendors. What used to be a skill that they could execute with just a keyboard and text editor suddenly required a subscription to an AI model provider.

It's not unreasonable to play this pattern forward, where we could be creating an industry where you *need* to pay for token consumption to accomplish something that used to be the product of your own critical thinking and problem-solving abilities. This would resemble a type of "vendor lock-in", but for an entire industry skillset (and I'm sure the model providers are gleefully rubbing their hands in anticipation for that). The financial, and intellectual, rug-pull could come at any moment, and local LLMs are nowhere near ready to scale to absorb that level of usage. So, while *I am not referring to specific vendors of the model providers* in particular, the term is still tangentially related to the phenomenon we're seeing with over-reliance on these systems.

This isn't theoretical conjecture; it's being reported on right now. Even the model providers themselves are bringing it to light. Yet another Anthropic study showed a precipitous **47% drop-off** in debugging skills:

> “Incorporating AI aggressively into the workplace—especially in software engineering—inevitably comes with trade-offs...developers may lean on AI to deliver quick results at the expense of building critical skills—most notably, the ability to debug when things go wrong.”

### You can't predict your token cost.

Model providers are heavily subsidized, and the models themselves are built on shifting sands. Every new model release follows the same pattern of high benchmarks, followed by hype, followed by the reality of usage and everyone complaining of them being "nerfed" and burning through 2x-3x as many tokens to get the same job done.

You *know* how much your employees cost; you have *no idea* how much your token costs will be day to day, month to month, year to year. If your entire team is using agentic coding as the default, your expense account will need to remain highly nimble. As Primeagen said recently: *"when you use these fully agentic workflows, the model providers essentially own you".*

There's a way to avoid all of this, of course. LLMs are a powerhouse technological advancement, and when used responsibly, they can be a stellar tool for learning and upskilling. They enable me to dive deeper and wider into concepts and techniques, expanding understanding and enabling exploration of new ideas that used to be more arduous and time consuming to experiment with. This is where I think they will offer the industry the most long-term value.

## My Approach: Demote AI's role

I'm certainly not advocating for typing code out manually. Programmers have always been looking for ways to *create* code without having to *write* code. This is why we even have Emmet, autocomplete, and snippets in the first place. Even COBOL was designed to encapsulate more instructions with less writing by using "English-like" words such as `MOVE` and `WRITE`. jQuery's motto was "write less, do more". LLMs are another addition to this array of code generation tools.

What I am advocating for, though, is leveraging LLMs and coding agents as secondary processes. A way that doesn't sacrifice the individual's skills at the altar of productivity. You can flip the script and lean on them to brainstorm the planning parts of the process while staying actively engaged throughout implementation, delegating to them on an as-needed basis. You can leverage the productivity gains, and mitigate the comprehension debt.

### My daily workflow:

-   I use LLMs to help generate specs and plans, while *I facilitate the implementation*. This is an inversion of the "orchestration" workflow; I am still manually coding anywhere from 20% to 100%, depending on the task.
-   I very often am writing pseudo-code when I do engage with the models, closing the distance between the request and the generated code.
-   I use the models as delegation utilities for ad-hoc code generation and interactive documentation, as well as research tools so that I can constantly ask questions, iterate, refactor, and gain clarity around my approaches.
-   *I never generate more than I can review in a sitting*. If it's too much to review, I slow down and split the task up, manually refactoring where needed to ensure a comprehensive understanding of the end result.
-   I never ask an LLM or agent to implement something that I've never done before or couldn't do on my own, except perhaps purely for educational or tutorial purposes (and often discarded afterwards).

If I had to TL;DR this list, it would be: Use them like the Ship's Computer, not Data.
*(any Star Trek fans should get the reference)*

### I'm not going faster, but I'm doing better quality work.

The productivity gains from these models are real, *and so is the friction and understanding that come from engaging with the work on a tangible and frequent basis*.

Despite the countless failed attempts at trying to democratize coding while not understanding coding, we're faced with the reality that you **cannot** understand code without engaging with it. And it's become clear that if you don't keep engaging and writing it, you *can* lose touch with that understanding, which will in turn make you a less capable orchestrator in the first place, rendering this phase of AI coding a strange and needlessly stressful interlude.

### Perhaps I am worrying too much, but history contains lessons.

This all feels similar, though, like another large experiment we're running on ourselves. We've been through a similar period with the introduction of social media without understanding the long-term implications, and we're now faced with attention deficit (amongst many other issues) on a wide scale.

This time, we're gambling with something much riskier.

> “People who go all in on AI agents now are guaranteeing their obsolescence. If you outsource all your thinking to computers, you stop upskilling, learning, and becoming more competent.”
>
> – Jeremy Howard, creator of fast.ai
---
title: "Spec-Driven Development: Hype or the Future of AI Coding?"
author: "Devsplainers"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=iHjlRB93okg"
date_saved: "2026-06-07T02:07:25.770Z"
---

# Spec-Driven Development: Hype or the Future of AI Coding?

[0:00] GitHub built a toolkit for it. Amazon

[0:03] built an entire IDE around it. Half the

[0:06] developer community thinks it's complete

[0:09] nonsense. Spec-driven development went

[0:12] from zero to the most polarizing idea in

[0:15] AI coding in under a year. And whether

[0:18] you love it or hate it, you're going to

[0:20] need an opinion on it.

[0:22] It's 2025. AI coding agents can write

[0:26] software faster than any human. The

[0:28] speed comes with a problem. An MITRE

[0:32] study found that experienced developers

[0:34] using AI tools were 19% slower while

[0:38] believing they'd sped up by 20%.

[0:41] Faros AI data from 10,000 developers

[0:44] showed AI increased individual task

[0:47] completion by 21%

[0:49] but time spent reviewing pull requests

[0:52] shot up 91%

[0:54] and bugs per developer increased 9%. The

[0:58] code was getting written in faster. It

[1:00] was also getting written wrong faster.

[1:04] Andrej Karpathy named the pattern in

[1:06] early 2025 vibe coding. You prompt an

[1:09] AI, accept whatever it spits out, never

[1:12] read the diffs, and pray. Works fine for

[1:15] throwaway prototypes. For anything you

[1:17] have to maintain, it's technical debt at

[1:19] machine speed. The fix is spec-driven

[1:23] development. The concept is simple. You

[1:25] write down what you want clearly in

[1:28] structured markdown before you let an AI

[1:31] write a single line of code. That spec

[1:33] becomes the source of truth. The AI

[1:36] reads it, generates code to match, and

[1:38] you verify the output against the spec.

[1:41] It's like handing a contractor

[1:43] blueprints instead of describing your

[1:45] dream kitchen over text messages at 2:00

[1:48] a.m. Senior devs reading this have

[1:51] already typed the comment, requirements

[1:53] engineering. Open API specs since 2016.

[1:57] Nothing new under the sun. Fair point.

[2:00] Difference is who consumes this back.

[2:02] Specs used to be for humans. Now,

[2:05] they're for AI agents, which are

[2:07] literal-minded pair programmers that

[2:09] hallucinate when confused. Writing for a

[2:12] human reviewer is one job. Writing for a

[2:15] machine that will execute autonomously

[2:17] is a different job. The day-to-day loop

[2:20] goes like this. You start with an idea.

[2:23] You write a high-level spec describing

[2:25] what the feature does, its constraints,

[2:28] its edge cases. The AI asks clarifying

[2:31] questions. Where do you store this data?

[2:34] What happens on timeout? What error does

[2:36] the user see? You answer until the

[2:39] ambiguity is gone. The AI generates a

[2:42] technical plan and breaks it into small

[2:44] tasks. You approve the plan. The AI

[2:47] implements each task. You review each

[2:50] diff against the spec. Tests get

[2:53] generated from acceptance criteria you

[2:56] already wrote. Done.

[2:58] Three tools dominate the space right

[3:00] now. GitHub Spec Kit is open source, has

[3:04] 92,000 stars, and works with basically

[3:07] any AI coding agent. Amazon Q is a full

[3:12] IDE with specs baked into the interface,

[3:15] running on Claude under the hood. Tessal

[3:18] pushes the idea furthest. You literally

[3:21] cannot edit generated code. You update

[3:24] the spec and regenerate everything. Each

[3:27] tool takes a different position on how

[3:28] tightly the spec should control the

[3:30] code. The loudest criticism of SDD is

[3:34] that it's just waterfall with a markdown

[3:36] skin. I understand the comparison.

[3:39] Writing detailed requirements before

[3:40] coding does have the waterfall shape.

[3:43] The thing that breaks the comparison is

[3:45] iteration cost. In waterfall, changing

[3:48] course meant months of rework. In SDD,

[3:51] you edit a markdown file and the AI

[3:54] regenerates code in minutes. Roger Wong

[3:57] said it well, that's not waterfall,

[3:59] that's Agile wearing a trench coat. The

[4:01] sharper criticism comes from people

[4:03] who've used SDD in anger. Colin

[4:06] Eberhardt, CTO of Scott Logic, ran a

[4:09] head-to-head test. Speck kit took 33

[4:13] minutes of agent time and produced 2,500

[4:16] lines of markdown for 689

[4:20] lines of code, needing 3 and 1/2 hours

[4:23] of review. His iterative approach took 8

[4:26] minutes, produced 1,000 lines of code,

[4:28] and needed 24 minutes of review with no

[4:31] bugs, 10 times faster without SDD. That

[4:35] number is hard to wave away.

[4:38] There's also the spec drift problem.

[4:40] Birgitta Buckler, who writes about SDD

[4:43] for ThoughtWorks, pointed out that most

[4:46] SDD workflows today are spec first, but

[4:49] vague about spec maintenance. You write

[4:52] a clean spec, ship the feature, then 6

[4:54] months later the code has evolved, and

[4:57] the spec is fiction. Nobody has solved

[4:59] this. Tessel tries by forbidding code

[5:02] edits. Others treat specs as disposable

[5:05] history. Neither answer feels right.

[5:09] Then there's the determinism problem.

[5:11] You're writing natural language

[5:13] instructions for a probabilistic system.

[5:16] Feed the same spec to the same model

[5:18] twice, and you can get different code. A

[5:21] Hacker News commenter put it bluntly,

[5:23] you've introduced an unreliable compiler

[5:26] that produces different results every

[5:28] time it's run. Better models won't fix

[5:31] it. The issue is architectural.

[5:34] SDD pays off on greenfield projects. It

[5:37] pays off on cross-service migrations

[5:40] where you need to capture intent before

[5:42] regenerating code. It pays off on

[5:45] compliance-heavy work that demands an

[5:47] auditable paper trail. It pays off on

[5:50] complex features where ambiguity will

[5:53] cost you days of debugging. And it pays

[5:56] off on any AI session long enough that

[5:58] the agent might forget what it's

[6:00] building.

[6:01] It doesn't pay off everywhere. Bad fits,

[6:04] small bug fixes where Buckler called

[6:07] using Kiro a sledgehammer to crack a

[6:09] nut. Exploratory prototyping where you

[6:12] can't write a spec for code you don't

[6:14] yet understand. Solo weekend projects

[6:17] where the overhead exceeds the work.

[6:19] Large legacy code bases where writing a

[6:22] spec for existing behavior is harder

[6:24] than fixing the code itself. If you want

[6:27] to try it, the lowest friction path is

[6:29] GitHub Spec Kit plus whatever coding

[6:32] agent you already use, whether that's

[6:34] Claude Code, Co-pilot, or Cursor. Run

[6:37] the init command, write a spec for your

[6:39] next feature, see if the output

[6:41] improves. That's the experiment. My

[6:44] take, STD solves a problem that exists.

[6:48] It also has obvious limits. The

[6:50] developers who get the most from the

[6:52] next few years will be the ones who

[6:54] learn when to write a spec and when to

[6:57] vibe code the thing. The skill that pays

[6:59] now is knowing what code should exist

[7:02] and being precise enough about it that a

[7:04] machine can build the thing for you.

[7:07] Most developers underestimate how hard

[7:09] that second part is.
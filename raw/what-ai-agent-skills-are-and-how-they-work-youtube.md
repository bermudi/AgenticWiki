---
title: "What AI Agent Skills Are and How They Work"
author: "IBM Technology"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=Lg-meK5IU8Q"
date_saved: "2026-05-05T02:43:19.852Z"
---

# What AI Agent Skills Are and How They Work

[0:00] What are AI agent skills and  why have they become an open

[0:04] standard adopted by practically  every major AI coding platform?

[0:09] Well, because skills address a  specific problem with agents.

[0:14] Now AI agents, they're pretty good reasoners and

[0:19] LLMs or large language models  already know a lot of facts.

[0:24] They can tell you about Kubernetes  architecture or the the history of SQL

[0:30] or the airspeed velocity of an unladen swallow,  that part is covered but they lack something.

[0:36] They lack procedural knowledge.

[0:41] The stuff that's specific to  how work actually gets done,

[0:47] like let's say a 47-step workflow for  generating a compliant financial report.

[0:57] Yeah, that would be fun.

[0:59] An AI agent that is running a  large language model when it

[1:06] encounters a task like generating this  report, it basically has two options.

[1:12] Either somebody needs to prompt it with every  single step, all 47 of them, and they need

[1:20] to do that every time, or worse still, the  agent is just going to take a guess at it.

[1:26] Now a skill is how you actually  add in that procedural knowledge

[1:34] into the agent and the format of a  skill is almost comically simple.

[1:41] It's simply a skill.md file.

[1:46] That's a markdown file in a folder.

[1:50] So let me draw out what a  skill actually looks like.

[1:55] So at the top.

[1:58] Skill.md file is some YAML front letter.

[2:04] So let's have a look at what  is defined in the front letter?

[2:09] Well, at a minimum, there are two things.

[2:13] So there is a name and there is description.

[2:21] These are the two mandatory fields.

[2:24] Now the name identifies the skill,

[2:28] the description that tells the agent what  this skill does and when it should be used.

[2:35] Now this description is pretty important  because it's the trigger condition that

[2:42] tells agent exactly when this skill applies,  so maybe the skill name is PDF Builder.

[2:50] And the description here that says something like,  use this when the user asks to extract a PDF.

[2:57] Now there are some other fields you can put  into the front matter like author and version,

[3:02] but it's name and description that are mandatory.

[3:05] Now below the front mater, we also have a field.

[3:12] Now these are the actual instructions.

[3:16] These are the step-by-step workflows, the  rules, the examples of input and output,

[3:20] whatever the agent needs to know to do the job.

[3:23] And it's just written in plain markdown.

[3:27] And then the skill folder can contain  some optional folders as well.

[3:32] So you don't have to have  these, but you can add them.

[3:36] One of those optional folders is the scripts.

[3:42] And this has executable JavaScript or Python  or bash that the agent can actually run.

[3:51] There's also a references directory that  contains additional documentation that

[3:58] gets loaded if the agent determines it needs it.

[4:02] And finally, the other optional  directory is the assets directory

[4:07] that contains static resources  like templates and data files.

[4:12] That's what an agent skill looks like, but  agents can have lots of skills defined for them.

[4:20] So what happens when there are  like hundreds of these skills?

[4:25] Loading all of them into the LLM  context window at startup would

[4:29] blow through the token budget before  anyone even gets to ask a question.

[4:34] So skills use something  called progressive disclosure.

[4:41] And progressive disclosure works in three tiers.

[4:46] So tier one is metadata only, and that applies.

[4:53] So at startup, the agent loads just the  name and description from each skill.

[4:58] So that's just a handful of tokens per skill.

[5:01] So even if there are a hundred skills installed,  the overhead isn't gonna fill the context window.

[5:07] And this is kind of essentially  akin to a skills table of contents.

[5:12] Now tier two, this relates  to the full instructions.

[5:17] When the agent sees a request that  matches this skill's description,

[5:21] it reads the complete skill.md body into context.

[5:26] And this tells the agent what to  do, the skill we are teaching it.

[5:31] And that identification, the matching  of a given requirement for a task to

[5:36] the skill available is something that  happens through the LLM's own reasoning.

[5:41] The model decides when it  can make use of the skill,

[5:45] which is why a good skill  description is so important.

[5:50] Then tier three, that's  these optional folders here.

[5:54] So these are the resources that maps to the  scripts and references and the assets folders.

[6:00] And they only get loaded when a  specific task actually needs them.

[6:04] So the agent starts with a lightweight  index of everything it can do.

[6:09] That's the name and description.

[6:11] It pulls in the detailed instructions  when they're relevant, the body,

[6:15] based on matching the trigger condition.

[6:18] And it grabs resources only at the point of need.

[6:21] Now skills bring a type of knowledge to agents.

[6:26] There are several ways to  incorporate knowledge into an agent.

[6:28] So let's just briefly compare them  because they handle different things.

[6:34] And the first one I just want to mention is MCP.

[6:39] That's Model Context Protocol.

[6:42] What sort of knowledge does MCP give you?

[6:45] Gives you tool access.

[6:47] It gives agents the ability to call out to  external APIs and to interact with services.

[6:53] MCP is about what the agent can reach,

[6:57] but it doesn't tell the agent when to  reach for it or what to do once it has.

[7:03] So that's MCP.

[7:04] Another one is RAG, Retrieval  Augmented Generation,

[7:10] and RAG that handles factual  knowledge, so it pulls in...

[7:15] Relevant chunks from our  knowledge database at run time,

[7:18] which is pretty handy when the  agent needs to look something up.

[7:22] But RAG doesn't teach an  agent how to do something.

[7:24] It's reference material.

[7:27] What about another one?

[7:28] How about fine tuning?

[7:32] What can that do for us?

[7:33] Well, fine tuning bakes knowledge  directly into the model's weights.

[7:40] Now that's something that's  permanent, but it's expensive.

[7:43] And if the model changes the  fine-tuning has to be redone.

[7:46] Now skills don't really do any of this so  what knowledge do skills bring to agents?

[7:58] Well skills handle as I mentioned  right up front procedural knowledge.

[8:05] It's how to do things in what  order and with what judgment,

[8:10] and because they just files Well,  they can be version control,

[8:14] they could be easily updated and you  can easily move them between platforms.

[8:19] Now, in practice, skills will  often use some of these other

[8:24] forms of knowledge like, well, MCP for example.

[8:27] So MCP provides the capability to invoke something

[8:31] externally and the skill provides the  judgment for when and how to do that.

[8:37] Now, one more thing to say about skills.

[8:41] Is that the skill.md format is an open standard,

[8:45] and it's published at agent skills.io  and that's an Apache 2.0 license project,

[8:56] and it was adopted across a bunch of AI platforms

[9:00] like Claude Code and OpenAI  Codex and many other tools.

[9:05] So a skill built for one platform works  on any platform that supports this spec.

[9:11] Now there's a useful way to think about  skills and it comes from cognitive science.

[9:16] Now humans have distinct types of memory.

[9:19] There's semantic memory, which are facts.

[9:22] So Rome is the capital of Italy.

[9:25] There's episodic memory, which are experiences.

[9:29] So, uh, I went to Rome last summer.

[9:33] Actually I did, and it was lovely.

[9:35] Uh, and then there's procedural memory, which  are skills like how to ride a scooter on the

[9:41] streets of Rome and live to tell  the tale, which I also did barely.

[9:47] Now agent architectures are  starting to mirror this.

[9:52] So semantic memory, that maps  pretty closely to retrieval,

[9:59] augmented generation and knowledge bases.

[10:02] Episodic memory.

[10:03] Well, that really maps to conversational.

[10:08] Logs and interaction history  and procedural memory.

[10:12] Well, yep, that maps quite nicely to skill files.

[10:20] Now, one thing that does need mentioning  is that skills can include executable

[10:29] scripts with access to file systems  and environment variables and API keys.

[10:37] That's what makes them powerful, but  it's also what makes trust so important.

[10:45] Because when an agent runs one of these scripts,

[10:50] it's typically executing  commands locally on your machine

[10:53] and audits have found publicly  available skills frequently

[10:58] contain bad stuff like prompt injection, bad stuff

[11:04] like tool poisoning, bad  stuff like hidden malware.

[11:10] Basically the usual suspects  for any open ecosystem.

[11:13] So, so treat skill installation  the way that any responsible

[11:18] team treats installing any software dependency,

[11:21] which is to say, review it and understand what  it does before using it on your local machine.

[11:28] So, So where does this leave us?

[11:30] Well, skills are procedural memory for AI agents.

[11:34] They're defined in a markdown  file that lives in a folder

[11:38] that teaches an agent how to do a specific job.

[11:42] Skills are conditionally triggered  and they load efficiently through

[11:48] progressive disclosure and the  format is an open standard.

[11:52] So an agent that already  knows the airspeed velocity

[11:56] of an unlaid and swallow, African and European,

[11:59] can now also learn how to perform any  repeatable task you define for it.

[12:05] So that's AI agent skills.

[12:07] If you're using them, let me know in the comments.
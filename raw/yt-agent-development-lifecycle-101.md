---
type: youtube
url: https://www.youtube.com/watch?v=ZUjijNrg5sQ
title: "The Agent Development Lifecycle 101 by Harrison Chase"
channel: LangChain
date_saved: "2026-08-02T03:20:28.519Z"
---

# The Agent Development Lifecycle 101 by Harrison Chase

[0:00] [music]

[0:16] [music]

[0:23] >> Hello. Hello everyone. Uh thank you for

[0:27] coming to this webinar. Um that was a

[0:28] cool intro video. Um I didn't know we

[0:30] were doing that. That's fun. Um

[0:33] uh my name's Harrison, co-founder CEO of

[0:35] LangChain,

[0:36] uh and excited to be talking about the

[0:38] agent development life cycle uh with

[0:40] everyone today. Um before we get

[0:42] started, few logistical things. Um there

[0:46] is a place uh for chat and there's a

[0:48] place for Q&A.

[0:49] Um and so if you have questions that you

[0:53] uh want me to answer as as we're going

[0:55] through the slides, I will uh answer a

[0:57] bunch of them at the end. So drop

[0:59] everything in there.

[1:00] Uh I will do uh the the I'll I'll walk

[1:03] through a presentation for the first 30

[1:05] or so minutes and then answer questions

[1:07] for the rest of the 15.

[1:08] >> [gasps]

[1:09] >> Um

[1:10] this is and and this has been recorded

[1:12] and we will put it up on YouTube

[1:13] afterwards as well.

[1:16] Um cool. So uh

[1:18] let me jump into it and figure out how

[1:22] to share my screen.

[1:24] There we go. Um so yeah, want want to

[1:26] talk today about the agent development

[1:28] life cycle and and kind of like a

[1:30] high-level overview and introduction to

[1:33] it.

[1:34] Um we've uh we we we've basically seen

[1:38] that over the past year, organizations

[1:41] have figured out how to ship agents. And

[1:45] the ones that have figured out how to do

[1:46] that the best, um they uh they they

[1:49] iterate systematically. They they they

[1:51] ship really early and then iterate

[1:53] quickly. And this iteration is is done

[1:54] in kind of like a systematic way.

[1:56] Um

[1:57] and and the reason uh that it's

[1:59] important or the the the the the system

[2:01] that they use is is all around kind of

[2:04] like agent

[2:05] agent behavior. So, the the hardest part

[2:07] of building agents and shipping agents

[2:10] is getting them to behave reliably. And

[2:13] so, getting something that works, you

[2:15] know, initially locally or

[2:18] in a one-off on a Twitter demo is easy,

[2:20] but like shipping it reliably to 100 of

[2:22] users at scale, the difficulty becomes

[2:24] down down to like the performance and

[2:25] the behavior of the agent. And so, when

[2:27] people are iterating and when people are

[2:30] building these agents, that's that's a

[2:31] key thing that we see people focus on.

[2:34] And And that's what the agent

[2:35] development life cycle is really built

[2:37] around.

[2:39] There's these components, but all of

[2:41] these components come together into like

[2:42] how can we as developers of agents get

[2:46] the most out of the agents that we're

[2:48] building. And so, the different stages

[2:50] of the life cycle that we see, and then

[2:51] I'll I'll walk through all of these,

[2:53] are build, test, deploy, monitor. And

[2:57] then you And then when you do this for a

[2:59] bunch of agents, you want to you want to

[3:00] govern all of them as well.

[3:02] I will

[3:04] We obviously build a bunch of tools

[3:08] to help with all stages of this.

[3:11] I will try to refrain from mentioning

[3:14] them in in till the end. We'll We'll

[3:16] show where they'll fit in, but I really

[3:17] want this to be kind of like education

[3:18] and and informative. More less on kind

[3:21] of like our technology and more on the

[3:23] process and the solution that we see

[3:25] people getting towards.

[3:28] So, first, want to start with build.

[3:30] This is where people get started. You've

[3:31] got an idea for an agent, you want to

[3:33] build it.

[3:35] There's There's There's different ways

[3:36] to build agents.

[3:38] And And I think this is the

[3:41] I think this is a big question that you

[3:42] should be asking as you think about

[3:45] as you think about how to build the

[3:48] agents that you want.

[3:51] The the level of abstraction, the level

[3:53] of complexity that you want. So, there

[3:55] are a bunch of agent frameworks out

[3:56] there. This is how LangChain got

[3:57] started, obviously, um with the

[3:59] LangChain framework. The The main value

[4:01] prop of a lot of these is uh

[4:04] abstractions. Abstractions around model

[4:06] inputs, model outputs, tools, prompts,

[4:08] retrieval. Um And And this provides a

[4:11] standardized way for people to begin

[4:14] building with uh

[4:17] with with with agents. It makes it

[4:18] really easy. It has all these

[4:19] abstractions. Um if you're going from

[4:21] one project to another and it uses the

[4:23] same abstractions, it's easier to get on

[4:24] boarded. Um But But you don't always you

[4:27] don't always have to use a framework. Um

[4:29] there are downsides to using a

[4:30] framework. Um the downsides uh might be

[4:33] that they they obfuscate some of what

[4:35] happens under the hood. Um This is a

[4:38] lesson we learned early on with

[4:39] LangChain. Um and and uh we we we

[4:43] addressed this by making the framework

[4:44] kind of like less heavy and less

[4:46] high-level. Um but I I remember early on

[4:49] uh we we had this chain and this chain

[4:52] made five LLM calls under the hood. And

[4:56] uh someone uh

[4:58] someone asked, "Hey, like why is this

[5:00] chain taking five times as long as when

[5:02] I call OpenAI directly?" And the reason

[5:03] it was doing those five The reason was

[5:05] it was doing those five calls under the

[5:06] hood, but it just wasn't obvious. It

[5:08] would the people who the person who was

[5:09] using it wasn't aware of that. And And

[5:11] that's um you know

[5:13] part That's partially better docs.

[5:15] That's also partially the framework's

[5:16] fault. It doesn't It doesn't kind of

[5:17] like sometimes make that clear. We spent

[5:19] a lot of time to make LangChain more

[5:21] lightweight and and and less um

[5:23] obfuscating of those things, but there

[5:25] are pros and cons to to to using

[5:27] frameworks.

[5:28] Um runtimes are another version of this.

[5:30] So, So, runtimes are a little bit more

[5:32] aimed at some of the uh runtime

[5:34] considerations. So,

[5:36] uh how do you do state management? How

[5:38] do you uh do uh durable execution? How

[5:41] do you have human intervention?

[5:43] These are framework uh agnostic

[5:46] concerns, um but they have to do with

[5:48] the runtime of of the agents and how

[5:50] they run.

[5:52] Um, and then harnesses are a little bit

[5:54] higher level than frameworks in my mind.

[5:56] Harnesses, uh, have been, uh, a really

[5:59] hot topic recently, largely because a

[6:01] lot of the coding agents that are out

[6:03] there are basically harnesses. Um, they,

[6:06] uh, they they are coding specific

[6:08] harnesses, uh, but there are a lot of

[6:11] learnings from those coding specific

[6:12] harnesses that you can port back into

[6:14] general purpose harnesses,

[6:15] um, such as, uh, state management, um,

[6:19] access to a file system as a way to kind

[6:21] of like manage context. So, context

[6:22] management as well, summary and

[6:24] compaction,

[6:26] um, uh,

[6:28] a a really clean human in the loop

[6:30] interface, sub agent support, skills,

[6:32] all of these are things that are a

[6:35] little bit higher level than a framework

[6:36] in my opinion,

[6:38] um, and and and part of the harness. Um,

[6:41] just mapping these really quickly onto

[6:42] the LangChain ecosystem. Actually, I'll

[6:44] map map it onto the whole open source

[6:45] ecosystem. So, frameworks, you've got

[6:47] things like LangChain, Llama Index, Crew

[6:49] AI, Google ADK, OpenAI Agents SDK, AWS

[6:54] Swarm, things like that. Runtimes, uh,

[6:57] we consider so so LangGraph, we consider

[6:59] that part a runtime and part a

[7:01] framework, um, but LangGraph is a

[7:03] runtime, Temporal is a runtime,

[7:06] um, and then harnesses, this is where

[7:07] you have Deep Agents, you have Claude

[7:09] Agents SDK, uh,

[7:12] those are really like the main, um,

[7:14] harnesses that are out there. There are

[7:15] coding agent harnesses, so you could

[7:17] also consider CodeX or Open Code, um, or

[7:20] Pi. Uh, Pi Pi is maybe a good example of

[7:23] a developer harness as well. Um, but

[7:25] there there's a really thin line in my

[7:26] mind between kind of like a general

[7:28] purpose developer harness and then like

[7:29] a coding agent harness, um, and they

[7:31] look very similar a bunch.

[7:33] Um,

[7:34] and and we have stuff on all our

[7:35] documentations about the the differences

[7:37] between these and the differences

[7:39] between the the LangChain offerings and

[7:40] other ones out there.

[7:42] No code I want to explicitly call out.

[7:44] This is really interesting to us.

[7:48] How how far can you go in in building

[7:50] agents if if you don't write code? And I

[7:52] think like one of the things that we've

[7:54] seen is that a lot of the agent

[7:55] definitions are starting to be

[8:00] more less and less code like. So so what

[8:04] I mean by that is a key part of the

[8:07] agent is a prompt. A prompt is not code,

[8:09] it's just text. You can represent this

[8:10] as a markdown file as an agents.md file

[8:12] or something like that. Tools. Tools you

[8:16] can you can represent with MCP servers.

[8:18] Sure the MCP servers themselves are are

[8:20] code, but connecting to those is is is

[8:22] just a JSON file or an mcp.json file.

[8:25] Skills. Skills likewise lot of kind of

[8:28] like markdown files. They may contain

[8:30] some code in terms of like the skill

[8:32] scripts that that you want them to

[8:33] execute. But I I think there's a real

[8:36] argument that you can make that building

[8:39] agents can be done with markdown files

[8:41] and other files like that. And so so we

[8:44] I'll I'll talk about what we have in

[8:46] that space later on, but I think you see

[8:47] some efforts

[8:49] like Eve from Vercel to to maybe call

[8:52] out something that's not LangChain

[8:53] related as a really interesting example

[8:55] of representing agents on a file system

[8:57] and is a similar approach that we take

[8:59] with kind of like deep agents deploy and

[9:01] and fleet.

[9:04] So moving on to test.

[9:06] Test has a lot has a lot of parallels to

[9:09] kind of like traditional software

[9:11] engineering,

[9:13] but but it looks slightly different for

[9:14] agents. So so

[9:17] what what exactly is testing? Testing's

[9:19] basically running your agent against

[9:21] some some inputs and scoring those

[9:25] and then using the results to

[9:28] to decide how well the agent's doing.

[9:30] It's measuring the agent. You typically

[9:33] want to do this to make sure you're

[9:35] you're not performing badly on cases

[9:37] that you need to perform well on Um or

[9:41] that you're you're improving on on a

[9:43] benchmark that you want to improve on.

[9:44] And so these are two different two

[9:46] slightly different kind of like user

[9:48] journeys. One's more like regression

[9:50] testing and the other's more like

[9:52] benchmark hill climbing or things like

[9:54] that. What exactly goes into this?

[9:58] First, there's the inputs. What are you

[10:00] running the agent over? These are like

[10:01] expected tasks, how you expect the agent

[10:04] to be used. Known edge cases. You can

[10:06] get these from

[10:09] compiling them from from real traces,

[10:11] from dog fooding traces, from generating

[10:13] them synthetically, but these are the

[10:14] inputs.

[10:15] Then you you you take these inputs and

[10:18] you build up data sets. So so one data

[10:20] set may have 50 different inputs in it.

[10:24] These in addition to the inputs, you

[10:26] also have

[10:28] um

[10:29] outputs or some criteria for how to

[10:32] judge it. So so maybe going to this

[10:34] distinction a little bit. For some

[10:36] tasks, you can have a really clear

[10:39] output that you can imagine.

[10:41] So if you're doing a classification

[10:43] task, the ground truth output you can

[10:45] say, "Hey, this should this should be

[10:46] true or this should be false." And then

[10:48] you can compare against that.

[10:50] For for more open-ended things,

[10:53] you you don't have a ground truth, but

[10:56] you have a set of criteria that you want

[10:58] to run against. So maybe taking coding

[11:01] as an example, Terminal Bench 2, which

[11:03] is

[11:04] probably the leading benchmark for for

[11:06] coding agents.

[11:08] The way that it works is you get this

[11:09] input task, you run the coding agent,

[11:11] and then to score it, you don't look at

[11:13] the files that are changed, you actually

[11:15] run unit tests against them. And so this

[11:18] is an example of criteria-based judging.

[11:21] And this starts to get into metrics. And

[11:23] so metrics you can you can have

[11:24] correctness, and these can compare

[11:26] against the ground truth. You can you

[11:29] can do criteria checks, and these can

[11:30] run the criteria checks that are part of

[11:32] the of of the

[11:34] uh uh uh uh uh

[11:35] data data point.

[11:37] You can

[11:39] you can you can you can define different

[11:40] policies you want to be compliant with,

[11:42] and then and then putting all of this

[11:44] together, you run the model over the

[11:46] inputs, you score it on these metrics,

[11:47] and then and then this makes up an

[11:49] experiment. And then with a bunch of

[11:50] experiments, you can compare versions,

[11:52] catch regressions, decide readiness,

[11:54] things like that.

[11:55] Um

[11:56] maybe two things that I want to call

[11:58] out. First,

[12:00] uh testing both both the data set and

[12:02] the metrics often times needs to be

[12:04] application specific.

[12:05] Um so so thinking critically about what

[12:08] the inputs are, what the outputs should

[12:09] be, how you want to judge it, those are

[12:11] really hard like product questions

[12:13] almost.

[12:15] Um

[12:15] and so and and so there's some tooling

[12:18] that we can give off the shelf in

[12:19] LangSmith to help make this uh easier,

[12:22] but but you still have to

[12:23] you'll still have to build your own data

[12:25] sets, and and maybe there's some metrics

[12:26] you can get started with, but you'll

[12:27] probably have to think about defining

[12:29] your own.

[12:31] Um and then the second thing that I want

[12:33] to call out is is just an example of

[12:35] where I think the space is going here.

[12:37] Um so I mentioned Terminal Bench 2.

[12:40] Terminal Bench 2 runs on an open-source

[12:42] framework called Harbor. Um what Harbor

[12:45] does is when it runs all of these

[12:47] different tasks, it actually runs them

[12:49] all in their own sandbox.

[12:52] Um and so this is really useful for uh

[12:55] long-running stateful agents. And this

[12:57] is this is a different paradigm than

[12:59] testing kind of like LLM applications.

[13:01] So testing LLM applications is easier.

[13:03] You basically just call the LLM in a

[13:05] loop. Like it's it's pretty easy. Um you

[13:07] maybe need to worry about rate limiting,

[13:08] but it but it's not that difficult.

[13:10] Testing agents, like each agent can run

[13:12] for I don't know, 15, 30 minutes. It it

[13:15] doesn't just respond, it produces

[13:16] artifacts as well. It interacts with the

[13:18] environment. And so thinking about

[13:20] building these environments is really

[13:21] important, and Harbor is a great way to

[13:23] run these more long-running stateful

[13:25] evals. We have a bunch of integrations

[13:27] with Harbor that are coming out soon.

[13:31] Maybe going on to the next one, uh

[13:33] deployment. What does it look like to

[13:35] deploy the agent? Um so so uh deploying

[13:39] agents is uh obviously has some

[13:41] similarities to deploying software, um

[13:43] but there's uh

[13:44] differences or specific focuses that are

[13:47] that are really important. Um so talking

[13:49] a little bit about the runtime, I talked

[13:50] about this earlier, but things like

[13:51] durable execution are really important.

[13:53] If the agent fails halfway through a

[13:55] run, um can you can you just resume from

[13:57] that step or do you need to go back to

[13:59] the beginning? Um persistence, memory,

[14:01] like what how do you both like thread

[14:03] level memory as well as longer term

[14:05] memory that that that persists across

[14:07] thread. How do you how do you manage

[14:09] that? Um streaming, how do you stream

[14:12] things back from the agents? This is uh

[14:14] streaming obviously existed before

[14:15] agents, but agents have made this much

[14:17] more prevalent. And what do you send

[14:18] back? Is it is it just the tokens or is

[14:20] it also the thinking uh process or or um

[14:24] the tool calls and how do you render

[14:25] that? Um and then human in the loop.

[14:28] Human in the loop uh easy to do locally,

[14:30] hard to do when you're running in

[14:31] production at scale. How do you

[14:32] basically like pause the agent and then

[14:33] just wait for it to resume?

[14:36] Um other considerations, sandboxes.

[14:38] Sandboxes are are really top of mind

[14:40] right now. A lot of agents, not just

[14:42] coding agents, need to write and execute

[14:44] code.

[14:45] Um and how do you do that in a safe and

[14:48] trusted way? If it's if it's running

[14:50] code that you've predefined ahead of

[14:51] time, that's basically just calling a

[14:52] tool and that's that's that that's easy

[14:54] and pretty simple. But what if the agent

[14:56] is writing its own code? That's that's

[14:57] untrusted code. You need a safe way to

[14:59] do that. And so and so sandboxes are are

[15:01] how you will want to do this.

[15:03] Um virtual file systems are something

[15:07] that that that we think are also really

[15:08] interesting um for agents or just file

[15:11] systems in general. So agents are really

[15:13] good at interacting with the file

[15:15] systems. They know [clears throat] how

[15:16] to read and write contacts. They've been

[15:18] trained on it. They've been post trained

[15:19] on it. They're really really good at it.

[15:21] Um but sometimes spinning up a whole

[15:24] file system for an [clears throat] agent

[15:26] is a lot of overhead. And so virtual

[15:28] file systems are basically a fancy way

[15:31] of saying keep your context in a

[15:33] database, which is more scalable, um,

[15:35] and you can manage more efficiently, but

[15:38] expose it to the agent as a file system.

[15:41] Um, and and it doesn't have to be a

[15:42] database, it could also be S3 or

[15:44] anything like that. It's basically

[15:45] saying store the data wherever you want.

[15:47] Um,

[15:48] uh, and and then give it to the agent as

[15:50] a file system and let it use the the

[15:52] read and write and glob and grep and LS

[15:55] and these other tools that it already

[15:56] knows how to use really really well.

[15:58] Some interesting things here that we've

[15:59] done are are using like Box and Notion

[16:02] as virtual file systems, so you can

[16:03] actually use,

[16:05] uh, human, um,

[16:07] uh, you know, like common human, uh,

[16:10] scratchpads as as virtual file systems

[16:12] for agents. Um, we also built, uh, our

[16:15] own. This is this is prompt and context

[16:17] hub. So prompt a little bit unrelated to

[16:19] this, but this exists before agents, but

[16:20] basically storing version prompts.

[16:22] Context hub is basically a way to store

[16:24] context. Context is just files. You can

[16:26] then pretty easily mount this context

[16:28] hub,

[16:29] um,

[16:30] as, uh, uh,

[16:31] uh, as a virtual file system for for

[16:33] agents. Um, and so you can store version

[16:36] prompts and skills and instructions

[16:38] there.

[16:41] Going on to to to monitoring, um, as as

[16:44] the fourth thing here, um,

[16:47] monitoring is really about showing you

[16:49] what, uh, what what your agent did. Um,

[16:52] and there's different there's different

[16:53] levels of this. So first up is just

[16:55] tracing and you can see it you can see

[16:57] an example of this on the right. And

[16:58] this is the most

[17:00] absolutely basic thing that like

[17:02] honestly you should probably have set up

[17:03] even before you go to production.

[17:05] Um,

[17:06] it is is just tracing of your agents.

[17:07] What are what are all the steps that it

[17:09] took? What are the inputs to each of

[17:11] those steps? What are the outputs of

[17:12] those steps? Um, seeing seeing the

[17:15] different tool calls that are made, the

[17:17] sub-agent tool calls, be able to

[17:18] understand exactly what the input to an

[17:21] LLM is, and then exactly what the output

[17:23] is, super important and necessary for

[17:25] debugging uh these LLMs and and these

[17:27] agents. And again, like most of the time

[17:29] when these agents mess up, they mess up

[17:31] because um the LLM messes up and then

[17:34] messes up because it doesn't have the

[17:35] right context. And so being able to see

[17:37] the context it has probably the most

[17:39] important thing that that that that you

[17:42] can do in this. And that's and and and

[17:43] so that's tracing.

[17:45] Um but you also uh want to start

[17:48] collecting feedback on these traces.

[17:50] Because as you're running this agent in

[17:51] production, you might get thousands or

[17:53] millions of traces. How do you know

[17:54] which ones to look at?

[17:56] Um and so this is where uh signals like

[17:58] uh tracking uh user thumbs up um or or

[18:03] or uh any feedback that the user gives

[18:05] is really important. This is also where

[18:07] online evals comes in handy.

[18:09] So what online evals means is basically

[18:11] you've got these production traces, can

[18:13] you run some evaluators over

[18:16] uh those traces and uh a and um and

[18:20] score them on some dimensions and then

[18:22] attach that as feedback. Um and so you

[18:25] know, this is a little bit different

[18:27] from evals previously because you don't

[18:28] know what the ground truth should be. So

[18:30] you have to run it in a in a in a in a

[18:33] in a way where you do it without ground

[18:35] truth. Um one example of this uh to make

[18:38] this concrete um that we are really

[18:40] interested in for uh for online evals is

[18:43] what we call like perceived error.

[18:46] So uh I I I would argue that when you

[18:49] see a transcript of a human talking to

[18:52] an agent, there are clues you can look

[18:54] for to see if the agent messed up. If if

[18:57] the user says, for example, "You messed

[18:59] up," that's a good signal that that that

[19:00] the agent messed up. But also if they

[19:02] say like, "No, you did X, you should

[19:03] have done Y." Or like, "You did this

[19:05] wrong." Or they they or you're doing

[19:08] coding and you see them posted put put

[19:10] paste back in the code snippet with an

[19:11] error. that that probably means that the

[19:13] user ran that code snippet and there was

[19:15] some error. And so, those are all

[19:18] signals of what we call like perceived

[19:19] error. We actually trained a small

[19:21] language model to detect this. And this

[19:23] is an example of an online eval that you

[19:25] can run. And then dashboards are

[19:27] basically aggregating all of those

[19:28] signals,

[19:30] whether it be latency, whether it be

[19:33] time to first token, whether it be these

[19:35] these these feedback or online evals and

[19:38] and showing you these in aggregate.

[19:39] >> So, those are those are obviously

[19:40] important part of monitoring agents as

[19:42] well.

[19:45] >> Lastly, I want to talk about govern.

[19:47] What what does it mean to govern agents?

[19:49] I think there's a few different aspects

[19:52] of this.

[19:53] One that's been top of mind for us

[19:55] recently is cost controls.

[19:57] Not just for agents that we build, but

[19:58] agents that we use as well. We're using

[19:59] a ton of coding agents internally, the

[20:01] cost of them is getting pretty out of

[20:02] hand and so we want to think about how

[20:04] we can

[20:05] view costs and and and also manage

[20:07] costs.

[20:09] Tool access this is another one that we

[20:11] think a bunch about. When agents use

[20:13] tools, what tools do they have access

[20:15] to? Who who who are they using the tool

[20:18] on behalf of? If an agent uses notion,

[20:20] is it using it on behalf of me, on

[20:22] behalf of a co-worker, on behalf of a

[20:24] service account? What does that look

[20:25] like? And so, having proper controls

[20:26] around that is really important. And

[20:28] likewise around audit trails.

[20:30] So, what tools did did an agent call

[20:33] and who were they calling it on behalf

[20:35] of? This is where some of the

[20:36] observability from the previous section

[20:38] starts to come into play as well.

[20:42] And so, and so and you can see that like

[20:43] governance, yeah, it wraps the whole

[20:45] life cycle. It's not just a different

[20:46] step. Like tracing and evals can can can

[20:49] easily be involved and are big part of

[20:50] governance. Human in the loop, we talked

[20:52] about this. This is really important.

[20:54] Like which tools need human approval

[20:55] before before they're

[20:58] run. Discoverability of tools and of

[21:01] agents and then sharing of all these

[21:04] contexts and skills.

[21:07] And so, we think all of this

[21:09] goes in governance which wraps the whole

[21:11] the whole life cycle.

[21:15] Um

[21:16] One of the things that's also worth

[21:17] talking about is is is doing this at

[21:19] scale. So you know, if you're building a

[21:21] single agent there you you probably are

[21:23] figuring this out as you go along. There

[21:25] you you you just have to think about

[21:27] your single agent. You don't have to

[21:28] kind of like think about doing this at

[21:29] scale. Um

[21:32] When you are part of a larger

[21:33] organization and and want every team to

[21:36] be doing like these are still like

[21:39] emerging best practices.

[21:41] Um and when you want every team to be

[21:43] following these emerging best practices,

[21:45] um

[21:46] it's often helpful to think about how to

[21:48] do this best at scale. Um and so some

[21:50] things that we've seen be helpful here.

[21:51] I talked about this earlier but like um

[21:53] frameworks whether they're on the build

[21:55] side or on the evaluation side, um

[21:58] prevent reuse and help people onboard

[22:00] quickly on to new problems. So uh yeah,

[22:02] using frameworks in the building space

[22:04] is a way of standardizing how different

[22:06] teams build and so then you can you can

[22:07] you can switch between teams or onboard

[22:09] people. And then shared evaluation

[22:11] frameworks, they prevent uh every team

[22:13] from rebuilding basically the same

[22:15] tests. Again, you'll probably want some

[22:17] uh depending on what you're building,

[22:18] you you'll want some data set uh

[22:21] specificity um

[22:23] and and maybe even some some metric

[22:25] specificity as well. But there we do see

[22:27] that there are organizational level

[22:29] metrics that that people always want to

[22:31] test for on on on on every agent that

[22:34] goes out. And so shared evaluation

[22:35] frameworks [clears throat] help with

[22:36] that. Um you probably don't want every

[22:38] team thinking about how to roll their

[22:40] own deployment infrastructure.

[22:41] Infrastructure's hard and annoying. Uh

[22:43] and so you probably want some some

[22:44] central A lot of this we see end up

[22:47] being managed by a central platform or

[22:48] central core AI team.

[22:51] Um

[22:52] Tracing and feedback and dashboards. Um

[22:55] this is really important as well. Like

[22:56] building the agent is kind of the fun

[22:57] point part, but it's it's also Uh, it's

[23:01] also the fastest part of this whole

[23:02] cycle. Um, every everything else uh in

[23:05] this cycle like like operating the agent

[23:08] at scale, that's that's the hardest part

[23:10] and that's that's what takes the most as

[23:11] well. And so and and a key part of that

[23:13] is just like observing what the agent's

[23:15] doing and so giving teams an easy way to

[23:17] have that really really important and

[23:19] then obviously governance becomes really

[23:21] important at at scale as well.

[23:24] I do want to talk a little bit before

[23:26] for maybe the next five minutes before

[23:28] going into questions about how what

[23:30] we're building that LangChain fits into

[23:31] this. And so

[23:33] I already see a bunch of questions

[23:35] rolling into the Q&A section, but keep

[23:36] on keep on dropping stuff there. So how

[23:40] do how does everything that we work on

[23:42] fit into the agent development life

[23:43] cycle? You could you can see them all

[23:44] mapped out here. So in build the the

[23:47] three things in dark deep agents,

[23:49] LangChain, LangGraph, these are our open

[23:51] source libraries. Deep agents is an

[23:52] agent harness. If you're getting started

[23:54] building agents today, this this is what

[23:55] I would get started with. Deep agents

[23:57] builds on top of LangChain. LangChain,

[23:59] as I mentioned, we slimmed down the

[24:01] abstractions. It's a much more minimal

[24:03] agent

[24:04] agent framework.

[24:06] If you want to build an agent from

[24:08] scratch, so not an agent harness, but

[24:10] but but start if you want to build your

[24:12] own harness, LangChain is is probably

[24:14] the best way to build your own harness.

[24:15] Deep agents is using our agent harness

[24:17] and then LangGraph is a runtime that

[24:19] sits beneath all of them. We've also got

[24:21] LangSmith Fleet, which is a no-code way

[24:22] to build agents. So this is this is

[24:24] aimed at

[24:26] you know, non-developers who who who

[24:28] want to build agents. It's entirely in

[24:30] the UI. A lot of it is

[24:32] a lot of it is is is by speaking and

[24:35] talking to the agent in in natural

[24:37] language.

[24:38] Um, LangSmith,

[24:40] so so LangSmith is our platform that

[24:42] that does the rest of the test, deploy,

[24:45] monitor, govern stuff. So we have data

[24:48] sets and evals and experiments in

[24:49] LangSmith. We have an integration with

[24:51] Harbor, which is the framework I

[24:52] mentioned earlier in LangSmith. On the

[24:54] deploy side, we have uh LangSmith

[24:57] Deployments, which uh is it it it takes

[25:00] your agent, uh spins up an agent server,

[25:03] gives it about 30 to 40 different

[25:04] production-ready endpoints. That

[25:06] includes uh

[25:07] streaming, uh A2A, MCP, human in the

[25:11] loop, short-term memory, long-term

[25:12] memory. It spins all that up. Um

[25:15] separately, we also have sandboxes. So,

[25:17] sandboxes, these are code sandboxes. You

[25:19] can use them with or without uh

[25:21] uh any of our open-source frameworks.

[25:22] That's maybe one thing I should mention

[25:24] as well. Um all of LangSmith is

[25:27] framework-agnostic. So, you can use it

[25:28] with us, with Vercel AI SDK, with

[25:31] CrewAI, with any of that. So, sandboxes

[25:33] are a great example of that. They're

[25:34] they're completely framework-agnostic.

[25:36] And then context hub is is basically

[25:38] where you can store

[25:39] um skills and agent.md files and use

[25:42] them in deep agents or just use them in

[25:44] your local coding agent. So, it's also

[25:45] it's also framework-agnostic.

[25:47] Monitoring, this is probably what we're

[25:49] best known for in LangSmith. We trace

[25:50] everything really well. You can um you

[25:53] can run online evals. We trained our own

[25:55] uh we trained our own uh model to detect

[25:58] perceived error. That's still in private

[26:00] beta um but we'll be rolling out uh over

[26:02] the next few weeks. Um we've got

[26:04] dashboards. You can collect user

[26:05] feedback. And then on the governance

[26:07] side, the first thing that we launched

[26:09] here, still in private preview, is is

[26:11] LLM Gateway um as a way with with cost

[26:14] controls and cost visibility and data

[26:16] privacy first and foremost in mind.

[26:19] Um as as we think about this whole life

[26:22] cycle, we we really think traces are at

[26:25] the center of all of this. Um so, we

[26:27] think again that like the hard part

[26:29] about building agents is getting them to

[26:31] behave. Um in order to get them to

[26:33] behave, you basically need to observe

[26:35] what they're doing and then tweak them

[26:37] and then and then measure it. And traces

[26:39] are really that core of of how you

[26:42] observe it, how you how you start to

[26:43] even measure it. And so, we think traces

[26:45] are are really the core of of all of

[26:48] this.

[26:49] Um in order to do that, uh we actually

[26:52] built our own database. And so it's

[26:54] called Smith DB.

[26:56] It it it is purpose-built for agent

[26:58] traces. My co-founder Ankush, who's much

[26:59] smarter than I am,

[27:01] leads that. And the the the reason you

[27:04] should care is it makes everything in

[27:05] LangSmith really really fast.

[27:07] And so storing one trace is easy.

[27:09] Storing billions of traces is hard.

[27:12] The other really cool thing that we

[27:15] launched recently, and I think I saw

[27:16] some questions in the Q&A, which I will

[27:19] which I'll go to after this, about like

[27:21] auto-improving the agent. We we want to

[27:23] help with that.

[27:25] Like you know, if you think about how

[27:27] humans would auto-improve an agent, they

[27:30] would run the agent, they would look at

[27:32] how it did, they would think, "Oh, it

[27:34] messed up on this. Let me tweak the

[27:35] prompt here."

[27:37] And then let me, you know, rerun it

[27:39] again and let me let me create an eval

[27:41] so that it so that I can measure it

[27:43] going forward. And then let me like

[27:45] redeploy it.

[27:47] And so we built an agent to do that. So

[27:48] that's LangSmith Engine. It's been out

[27:50] for for a month now.

[27:53] We think it completely changes how you

[27:54] think about operating these agents

[27:56] because it makes it so much easier.

[27:58] What it does is it basically runs in the

[28:00] background over traces. So so it sits on

[28:04] top of a tracing project, runs every

[28:06] every 6 hours,

[28:08] and and then basically tries to cluster

[28:11] traces into issues that are happening.

[28:14] It will it will it will create issues on

[28:16] this issue board. Each issue has a name,

[28:18] a description, and and a link to all the

[28:20] traces that are afflicted by this issue.

[28:22] But then it will also try to fix that

[28:24] issue. So we'll suggest code changes. It

[28:27] may suggest prompt changes. And then

[28:30] it will also do the things that you

[28:31] would hopefully do as as you as you fix

[28:34] these issues naturally yourself. It will

[28:36] it will try to add examples to data

[28:37] sets. It will create online evals to

[28:39] monitor this. And so this is something

[28:41] we're really excited about because we

[28:42] think it it it we think it drastically

[28:44] lowers the burden of operating these

[28:46] agents at at scale. And it's it's fun to

[28:50] build agents. It's it's a little bit

[28:51] less fun to constantly be monitoring

[28:53] them and playing whack-a-mole with

[28:54] issues. And so we hope that LangSmith

[28:56] engine can help with that.

[28:59] So with that, I'm going to go over to

[29:01] the QA section. There are a lot.

[29:05] So

[29:07] let's see. I'm going to I'm going to I'm

[29:10] going to

[29:12] um

[29:15] All right, I'm going to start all the

[29:16] way from the bottom. I'm going to try to

[29:18] do that Oh my god, there's a ton.

[29:20] um

[29:22] All right, I'm going to try to do this

[29:24] rapid fire.

[29:26] um

[29:27] Okay.

[29:28] um

[29:30] What do I think about Vercel's eve.dev?

[29:32] Yeah, this is this is a great example of

[29:35] representing agents as files in a file

[29:38] system basically.

[29:40] um Deep agents is already kind of

[29:43] similar to that. So you can point deep

[29:44] agents at agents.md files and scales and

[29:47] basically just instrument it from that.

[29:49] We we also have managed deep agents

[29:51] which takes that even a step further. um

[29:54] and

[29:56] um

[29:57] uh

[29:58] Thank you Angeline I think for putting

[29:59] this on screen. I didn't know how to do

[30:01] that. That's That's amazing.

[30:04] Yeah, I think I think there's still a

[30:05] little bit of code involved in Vercel's

[30:06] eve.dev.

[30:08] I but I think I think it's a

[30:09] directionally super super interesting.

[30:11] um

[30:14] to the benchmark for coding agents

[30:17] terminal bench two um and so

[30:22] yeah, that's the benchmark for coding

[30:23] agents that we

[30:25] that that most people use and it builds

[30:27] on top of Harbor. So Harbor's the

[30:28] framework that will probably be most

[30:30] useful for for building your own

[30:33] benchmarks.

[30:35] um

[30:37] What what is being done to keep the

[30:38] token count low inside of framework?

[30:40] Great question. We think about this

[30:42] more. So when we think of LangChain, uh

[30:45] we think about giving people tools to

[30:48] to control the token count themselves,

[30:49] but we don't want to have too many

[30:51] off-the-shelf things. We put all of

[30:53] those in deep agent. So deep agent is

[30:54] where you can see a lot of our best

[30:56] practices for keeping token count low.

[30:59] Specifically, some of the things that we

[31:00] do,

[31:01] if a tool returns a really large

[31:04] response, we

[31:06] we basically like let's say it returns

[31:08] 60,000 tokens. We'll we'll put that in a

[31:10] file. We won't show that all to the

[31:11] agent. And then we'll show the agent

[31:13] like the last thousand tokens and be

[31:14] like, here's the last thousand tokens.

[31:16] If you need more, go read from a file.

[31:19] And so we do that.

[31:21] We do summarization when it reaches some

[31:23] threshold.

[31:25] We also one one other one last clever

[31:28] thing we do

[31:29] is there's some files that have really

[31:32] long inputs. So if you think about

[31:33] writing to a file, the agent might might

[31:36] generate an input that is really really

[31:38] long.

[31:39] Over time that starts to add up. You can

[31:41] actually remove those inputs because

[31:43] it's already saved in the file.

[31:46] And so what you can do is after some

[31:48] period of time, you can basically remove

[31:49] those inputs. And if the agent really

[31:50] wants to remember what it wrote, it can

[31:52] just go read it in the file. The the

[31:54] thing that I'd say about all three of

[31:55] these is you want to do them cleverly so

[31:57] that you don't necessarily break prompt

[32:00] caching if you don't have to or you

[32:01] don't want to. So prompt caching is

[32:03] basically when if you if you send the

[32:05] same prompt prefix, so the like the

[32:07] first same number of tokens to the LLM

[32:10] over and over again, it will it

[32:12] basically like uses a cache for those.

[32:14] And so if you start if you start messing

[32:16] around with the token context that then

[32:18] you don't then you don't have that same

[32:20] amount of cache. And and and if you if

[32:22] you hit that cache, it's basically

[32:24] cheaper and faster. So you want to try

[32:26] to hit that cache

[32:27] all things else equal.

[32:29] So we do all these context engineering

[32:31] things in a way where we try to keep

[32:32] that cache

[32:35] uh, uh,

[32:36] relevant. What is an industry industry

[32:39] industry standard pass rate for LLM

[32:40] evaluation in percentage? This is a

[32:43] great question because there there there

[32:45] is no good answer for this. It's

[32:46] completely application specific. Um,

[32:48] it's really really hard to to give a

[32:50] off-the-shelf answer for this.

[32:52] Um,

[32:53] do I foresee a time where, uh, other

[32:56] agents will be embedded in this life

[32:57] cycle? For example, agents testing or

[32:59] monitoring other agents or will human

[33:01] input always be needed? Yeah, great

[33:02] question. LangSmith Engine is our is our

[33:05] answer for this. So, we very strongly

[33:07] believe that other agents will be

[33:08] involved in this life cycle.

[33:10] Um, we'll add more and more capabilities

[33:12] to Engine. At the same time,

[33:15] I do think human input will always will

[33:18] will always be needed. I think the key

[33:19] is figuring out scenarios where you can

[33:22] have an agent doing a lot of the work,

[33:25] but it's still presented as like a first

[33:27] draft that a human comes in and

[33:29] approves. So, this is what we do with

[33:31] Issue Board. Um, LangSmith Engine

[33:33] creates issues, but these are just

[33:34] issues on an issue board. If you want to

[33:35] apply a code change, you have to go in

[33:37] and press accept. It's still pretty

[33:38] easy, you just press one button, but

[33:40] you've got this human in the loop

[33:41] accepting it. So, so both.

[33:43] Um,

[33:44] uh, is there a way to test an agent for

[33:47] new {slash} novel experiences or

[33:50] scenarios?

[33:51] This is a fantastic question and one

[33:53] that we're thinking a lot about. Um, so,

[33:57] uh,

[33:58] um, I I I have maybe two answers here.

[34:02] Um, one which probably most directly

[34:05] involves this. Uh,

[34:07] you you can use uh, you can use an

[34:10] another agent or an LLM to generate a

[34:12] bunch of scenarios or inputs. The

[34:14] question then becomes like, how do you

[34:16] how do you know if the agent's responses

[34:18] are right or wrong there? So, one clever

[34:20] thing that we've done in the open

[34:22] source, it's called LangFuzz. It's from

[34:23] like two years ago. So, so we should

[34:25] probably update it. But, basically what

[34:27] you can do is you can generate two

[34:28] inputs to the to to to the agent that

[34:31] are semantically the same. They're

[34:32] asking the same question in just

[34:34] slightly different ways. And then you

[34:35] can run the agent over both of them.

[34:38] And if it gets drastically different

[34:39] results,

[34:40] you know one of them is wrong. You don't

[34:43] know necessarily which one, but you know

[34:44] one of them is wrong. And so you can

[34:46] then use this to

[34:48] identify places

[34:50] where it's where where it's messing up.

[34:53] The other thing that I want to call out

[34:55] here

[34:55] that is I just think is new around evals

[35:00] this concept of like environments. So as

[35:02] you start working with

[35:05] agents that are doing more and more

[35:06] complex things, there's a chance that

[35:07] they start interacting with stateful

[35:11] environments. So what I mean by a

[35:12] stateful environment is something like

[35:14] linear. Like if you're using linear or

[35:16] Jira and you're interacting with the

[35:18] tickets there, you may not just be

[35:20] reading tickets, you might be writing

[35:21] tickets or updating tickets.

[35:23] How do you do evals against this

[35:25] stateful environment where if you test

[35:27] against your linear system that changes

[35:29] over time and then also like you make

[35:31] changes on one eval run, you know, you

[35:33] want to reset basically to the

[35:36] to the to to this like clean state for

[35:38] the start of another eval run. So we're

[35:39] spending a lot of time talking and

[35:41] working with people on eval environments

[35:43] and creating these these synthetic

[35:45] environments to more easily test to test

[35:48] agents.

[35:55] Do you have a module to monitor the

[35:57] deployed agents for drift adjustment

[35:59] slash changes required in prompt skills

[36:01] references? Yeah, so so

[36:03] I think so two things here. Engine will

[36:06] do some of this. So so engine will look

[36:07] for issues

[36:09] and then and then suggest changes to

[36:11] prompt skills references. If you want to

[36:13] look more at

[36:15] kind of like just like trends over time,

[36:17] we also have a feature called insights.

[36:20] So insights basically does hierarchical

[36:23] clustering to categorize how people are

[36:26] using your agents. And this is where you

[36:27] can see drift in in topics over time.

[36:30] Um

[36:32] All right, let's go on to some more.

[36:34] Um

[36:40] Just like LangGraph Dev, is there

[36:41] anything for prod servers without using

[36:43] LangSmith

[36:44] uh as I have my own infrastructure and

[36:46] open telemetry set up? Um so, you can

[36:48] use uh you can use all the pieces of So,

[36:51] two things two answers here. One, you

[36:53] can use all the pieces of LangSmith um

[36:55] modularly. So, if you want to use just

[36:57] deployments and then not use

[36:58] observability, you totally can. If you

[37:00] want to use just observability and not

[37:02] use deployments, you also totally can.

[37:04] Um but then also uh we do have uh we do

[37:08] have some guides, although I don't think

[37:10] an off-the-shelf solution for for

[37:13] deploying LangGraph um totally open

[37:15] source. But, like LangGraph itself,

[37:17] totally open source. All the

[37:18] checkpointing that does the human in the

[37:19] loop and persistence, totally open

[37:21] source. And so, if you want to roll your

[37:23] own, you you can. We have some guides.

[37:25] We don't have kind of like a first-party

[37:27] offering that is also open source,

[37:29] though.

[37:31] Um

[37:32] Oh, I like this question. What do you uh

[37:34] when you think about agents, are you

[37:35] imagining AI that is performing actual

[37:36] work or glorified chatbot? More often

[37:38] not, I see businesses talking about AI

[37:40] agents and it's simply a chatbot with

[37:41] rag. Um how do we help AI agents grow

[37:44] beyond their definitions, do real work

[37:46] that removes load from humans? This is a

[37:48] fantastic question. Uh I totally agree

[37:50] that a lot of AI right now is chatbots.

[37:52] I absolutely think though that the

[37:54] future is doing work. Um I think uh I

[37:58] think some things that are needed. One

[37:59] is just like the right UI UX. If you ask

[38:02] AI to do work completely autonomously,

[38:04] the bar for doing it is going to be much

[38:06] higher. If you ask it to do a first

[38:08] draft of something, and then the human

[38:10] approves it, then I think that that bar

[38:13] uh then then I think you'll see more of

[38:14] these agents doing things. So, I think

[38:16] there's some stuff around UX to figure

[38:18] out. Um I also think that in terms of

[38:21] actually doing things

[38:23] I think one thing I I think like ambient

[38:25] style agents are really interesting

[38:27] here. Basically, can you run agents in

[38:28] the background triggered by events?

[38:30] They're They're seemingly always on.

[38:32] Um

[38:33] and I think this will will let humans

[38:36] leverage themselves more than just going

[38:38] to a chatbot and asking a question.

[38:40] Um so I so I I keep an eye out for

[38:42] ambient style agents here.

[38:46] Um um um um

[38:49] How do you run / set up a virtual file

[38:51] system? Any particular way to set it up

[38:52] like a rag system or other types? Like

[38:54] like literally a regular file system? It

[38:56] can be anything. Yeah, that's kind of

[38:58] the fun of it. It could be a regular um

[39:00] file system. It could be a database. Um

[39:04] the You can store it anywhere. The key

[39:05] part is just how you expose it. So we

[39:07] have uh in deep agents, we have uh what

[39:09] we call a backend interface. And so this

[39:12] backend interface exposes, I think, six

[39:14] different methods that are exposed to

[39:16] agents. You just implement those for

[39:18] whatever storage you're using and then

[39:20] you can use it as a virtual file system.

[39:22] And those six different methods are

[39:24] read, write, um edit, glob, grep, and ls

[39:29] list.

[39:31] What tools do you use for monitoring

[39:32] your agent? LangSmith all the way.

[39:35] Um

[39:37] What's the difference between testing

[39:38] and evals? For evals, what do you do

[39:40] with that user feedback? Add it to

[39:43] context directly. So I think So testing

[39:45] evals, I think generally mean the same

[39:47] thing. There are some distinctions like

[39:49] there

[39:49] There's There's some maybe like

[39:51] different terminology within this. So

[39:53] like I think like you could argue that

[39:54] like regression testing and and like

[39:57] benchmarking are different ways of doing

[39:59] testing or evals. So regression testing

[40:01] is more like I expect 100% kind of like

[40:04] pass rate.

[40:06] Um and and probably maybe it's testing

[40:09] like simpler single LLM call things.

[40:11] Benchmarking is like I'm at 40% right

[40:14] now, but I want want to hill climb to to

[40:17] um I don't know 90% Um how do I do that?

[40:22] And then there's online and offline

[40:23] evals.

[40:24] And so maybe some people mean testing to

[40:26] be offline evals and

[40:29] evals to be online evals, but yeah,

[40:31] testing evals I'd say same thing, but

[40:33] there there are different there are

[40:34] different kind of like

[40:36] terms with with within them.

[40:38] Um

[40:42] Yeah, this is another good one. How how

[40:44] do you evaluate agents that don't have

[40:45] simple success criteria? The success

[40:48] needs to be evaluated by an SME for

[40:50] example.

[40:52] Yeah,

[40:54] really good question. This this is where

[40:56] I think human input will always be

[40:59] valuable. Um

[41:02] We have a concept in Langsmith called

[41:03] annotation queues.

[41:05] Um that is where we see people labeling

[41:10] and

[41:11] we see humans labeling and evaluating

[41:13] these agent outputs. Oftentimes what

[41:15] they're doing is defining a criteria so

[41:18] that it's more scalable. So these

[41:20] criteria oftentimes come from SMEs, but

[41:24] hopefully they they are scalable and can

[41:26] be run without always having to have a

[41:28] human look at it. If you do have that

[41:30] always have a human look at it, we have

[41:31] a concept of annotation queues and and

[41:33] it can help with that. Um can you show

[41:35] us an end-to-end demo?

[41:36] Probably ran out of time.

[41:40] Although

[41:42] maybe

[41:43] okay, I'm I'm not logged into Langsmith.

[41:45] So

[41:47] no, but if you reach out we can we can

[41:50] have someone on our team absolutely help

[41:52] with that.

[41:53] Um

[41:54] Let me also stop sharing my screen.

[41:57] Um

[42:09] What are your thoughts on agent user

[42:11] analytics? I e analyzing what goes on

[42:13] between users and agents to extract

[42:15] business behavior insights. Do you plan

[42:16] to add a similar on top of LangSmith?

[42:18] Um, yeah, absolutely. I think uh I think

[42:21] this layer is really really interesting.

[42:23] I think online evals get at this.

[42:26] Um I think insights in our product get

[42:28] at this. I think uh a lot of times we we

[42:32] uh want people we want LangSmith to be

[42:35] used to analyze not just errors and

[42:38] latency, but these kind of like fuzzy uh

[42:40] fuzzy things.

[42:44] Um will online eval make agent too slow

[42:46] and how far can you choose your career

[42:47] be used to help in online eval? Yeah,

[42:49] this is a good question. So um so online

[42:52] eval runs after the agent runs. Um so it

[42:55] doesn't affect the agent run at all.

[42:57] Guardrails are very similar to online

[42:59] evals in that they could be testing for

[43:01] the same thing, but they run as the

[43:03] agent is running. So guardrails may make

[43:05] the agent slower, online evals will not

[43:07] make the agent slower. Online evals may

[43:09] cost a lot though because you're you're

[43:11] potentially running an LLM over all

[43:12] traces. That's why we trained our own

[43:14] small language model um because we want

[43:16] it to be to be cheap.

[43:19] Um how do you how do you think we should

[43:22] plan to build a self-improving agent on

[43:24] this framework? This is a great

[43:25] question. This is probably also where I

[43:27] will uh end off.

[43:29] Um I think largely because I think it

[43:32] this question

[43:34] perfectly encapsulates kind of like

[43:36] everything that we work on from the

[43:37] build to the monitor um to LangSmith

[43:40] engine.

[43:42] Um first of all like this is this is

[43:44] still very much like uh you know um not

[43:47] easy to do. Um but we are very

[43:49] interested in this. We put out a video

[43:51] today. Um it it uses LangSmith engine um

[43:55] as memory for agents. So specifically

[43:57] what we do is we take deep agents. We're

[44:00] running deep agents. We use a virtual

[44:02] file system to say, "Hey, everything in

[44:04] this memories folder for deep agents,

[44:06] this is actually stored in LangSmith

[44:07] context hub. We then trace everything to

[44:09] LangSmith and then we run engine in the

[44:11] background. And so engine will look at

[44:13] all these traces and when it sees things

[44:15] that the agent should remember, it will

[44:18] it will update the context hub. And then

[44:20] the deep agents, because it's connected

[44:21] to that context hub, it pulls it down

[44:23] all the time. So deep agents plus

[44:25] context hub plus LangSmith engine, those

[44:26] are three pieces of like what are

[44:29] what what one of our best guesses at

[44:31] this like self-improving agent

[44:34] on on this whole framework and platform

[44:37] looks like. We just released YouTube

[44:39] video for it. I think if you go to our

[44:41] YouTube page, it should be the the first

[44:42] video there, as well as a blog on

[44:44] Twitter as well. I'm going to go retweet

[44:46] it right after this. And so I yeah, this

[44:49] is a great way to end it. I think that

[44:50] encapsulates everything we do.

[44:52] Um with that being said, I know there

[44:54] are a bunch of questions here that that

[44:56] weren't answered. If you still have

[44:57] questions, feel free to reach out to me

[44:59] on on on on Twitter. I'll try to respond

[45:02] as much as possible there

[45:04] or or shoot us LangChain the company an

[45:06] email and and would be more than happy

[45:08] to help.

[45:10] Um

[45:10] thanks for attending. Always love the

[45:12] feedback, so keep it coming.

[45:14] Thank you guys.
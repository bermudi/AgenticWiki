---
title: "Cian Clarke - From Vibe Coding to Spec-Driven Development | DevCon Fall 2025"
author: "AI Native Dev"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=13EDVjfWKJM"
date_saved: "2026-06-07T02:08:47.150Z"
---

# Cian Clarke - From Vibe Coding to Spec-Driven Development | DevCon Fall 2025

[0:09] Um, hi folks. My name is Kian Clark and

[0:12] I work for a company called Near Form.

[0:14] Uh, we're a company headquartered in the

[0:16] southeast of Ireland, which is where I'm

[0:17] from. Um, but we have a kind of a global

[0:19] presence of folk all around the world in

[0:22] the US, Canada, um, Italy, Ireland, the

[0:26] UK, Eastern Europe. Um, and we've we

[0:30] sort of came of age in the era of no.js

[0:32] as like the backend language of choice

[0:34] for folk and event driven programming

[0:36] and so on. Um, and that's sort of been

[0:39] our bread and butter for the first kind

[0:40] of decade of the existence of the

[0:42] company. But of late, we've been kind of

[0:43] looking at one another and thinking like

[0:45] what's the next 10 years going to look

[0:47] like for us and where can we really put

[0:48] our mark? Um, and something that's

[0:51] really interested us has been this world

[0:53] of AI native engineering and you know

[0:56] what could we do to lean into a really

[0:58] progressive methodology of build um

[1:00] using things like specs to move much

[1:02] quicker. So I wanted to give a little

[1:04] bit of a background um as to you know

[1:07] what our experience has been in the last

[1:09] 6 to9 months in this world. Um, starting

[1:11] out with the how we got here slide. Um,

[1:13] then talking a little bit about how it's

[1:15] compared to our world of vibe coding.

[1:17] Um, and how, you know, why we like specs

[1:19] so much. Um, we're going to talk a

[1:21] little bit about unicorns, but we're not

[1:23] going to talk about technology company

[1:24] unicorns of billion dollar valuations.

[1:26] We are literally talking about

[1:28] four-legged horselike creatures from the

[1:30] fantasy world. We're going to have a

[1:31] good time. Uh, then we're going to talk

[1:33] about how we do spec driven at nearform,

[1:35] little bit of lessons learned, and some

[1:37] resources I found really useful as well.

[1:39] Um, I'm on LinkedIn. I'd love to say I'm

[1:41] on all the things, but I'm really just

[1:42] on LinkedIn these days posting about all

[1:45] this stuff. Feel free to give me a

[1:46] follow. Um, and so as we think about

[1:49] this kind of journey, right, coming

[1:51] from, um, AI assisted all the way up to

[1:54] this kind of agentic delivery at scale,

[1:56] I like to think of, you know, companies

[1:58] enabling the likes of Copilot, um, box

[2:00] ticked, right? We're doing AI native

[2:02] engineering. Like, doesn't really work

[2:03] out that way, right? So the line by line

[2:05] level assist is not bringing these mass

[2:08] productivity gains. Um people take it a

[2:11] step further and they start doing things

[2:12] with agents and spanning multiple files,

[2:14] right? And that does bring some

[2:16] measurable gains, but I think it has a

[2:18] real ceiling to what you can accomplish

[2:20] with this sort of um AI AI augmented

[2:22] workflow using agent mode. And unless

[2:25] you can bring in some new techniques and

[2:26] and frameworks, you know, you're going

[2:29] to run into issues eventually and and

[2:30] hit a ceiling of what the what the

[2:32] models can achieve. Then we come to

[2:34] specdriven development. Um, in my eyes,

[2:36] that's kind of the state-of-the-art

[2:38] right now. That's where I'm spending a

[2:39] lot of time. Um, and I do think the

[2:42] gains here are quite measurable. I think

[2:44] it tends to remove that ceiling of what

[2:46] you can accomplish with with AI models.

[2:49] Um, [clears throat] and then if we look

[2:51] across the the horizon to what's, you

[2:53] know, what's soon to come. So, how do we

[2:55] scale this up across multiple teams? Um,

[2:58] and Guy in his keynote talked about this

[3:00] transition from single player to

[3:01] multiplayer. I I love that. That's a

[3:03] great way to look at this. Um, how do we

[3:05] all collaborate across multiple teams

[3:08] delivering things using specs and

[3:09] agents? Um, rather than just running

[3:11] through a bunch of tasks as a lone

[3:13] contributor. Um, that's sort of, you

[3:16] know, where I see what's next, where I

[3:17] see a lot of the challenges. And from a

[3:19] lot of the presentations this morning,

[3:20] it sounds like, you know, most folks are

[3:22] in violent agreement. This is, you know,

[3:23] a thing we would love to see more

[3:25] progress on.

[3:27] Um, if we look back across the last 3

[3:30] years, it's hard to believe that

[3:32] Copilot's been around since June 2022.

[3:34] That's pretty wild to me. Um, but

[3:37] another couple of kind of key things

[3:38] that have happened along the way. Um,

[3:41] you know, February of this year, we saw

[3:43] the term vibe coding get coined. So,

[3:45] we're really, really recent. Like,

[3:46] what's that? 10 months ago at most. Um,

[3:50] another couple of kind of things that

[3:52] felt momentous. Um, you know, cursor

[3:54] releasing their 1.0 release in June. And

[3:57] then again like only two weeks ago or so

[3:59] their 2.0 release coming out. Uh and in

[4:02] the meantime as well AWS releasing Kirao

[4:04] some great sessions here today on Kirro.

[4:06] Probably the first ID in my eyes to

[4:08] really codify a lot of the techniques of

[4:11] spec driven driven development into an

[4:13] interface. Um something I've really

[4:14] loved to to see. Um but this really like

[4:18] condensed timeline in the last nine

[4:20] months like what's going on? There's

[4:22] something in the water, right? So it's

[4:24] been great. I wanted to talk about what

[4:26] a traditional vibe coding flow looks

[4:28] like while acknowledging the irony of

[4:30] using the term traditional in a term

[4:32] that's been around since February. But

[4:34] such are the rules of you know the world

[4:36] we live in these days. And before

[4:38] talking about this I actually wanted to

[4:39] jump to a live demo and I'm going to use

[4:41] Kira in vibe coding mode for today's

[4:44] demo. Can everybody see that? Okay.

[4:47] And what I'm going to ask for is I want

[4:48] to build a 3D rendering engine to render

[4:51] unicorns. I did promise you unicorns uh

[4:54] in varying configurations in browser and

[4:56] we're just going to send it on its merry

[4:58] way because there is nothing like

[5:00] combining the demo god's anger for a

[5:02] live demo in the first place with the

[5:04] non-deterministic output of models.

[5:06] Right? So we're going to have a good

[5:07] time or a really bad time. I'm not

[5:09] really sure. Let's see how this goes. So

[5:12] we'll let the model go about its merry

[5:14] way. And what what typically happens

[5:16] here, right, is we try to oneshot prompt

[5:18] what it is we want to build. Um, and

[5:21] eventually that technique yields, you

[5:23] know, a technique that doesn't really

[5:25] scale over time. So I want to build a

[5:27] unicorn rendering engine. The model goes

[5:30] and does some work. Then I realize,

[5:31] actually, I forgot a requirement. I'd

[5:33] like to make the color of the unicorn's

[5:36] main customizable.

[5:38] Then I realized that it's building it in

[5:40] Vue.js, and I don't know Vue.js. I know

[5:42] React. So I'd like to retool. Could you

[5:44] please build this in React instead?

[5:47] Then I realized the model actually

[5:48] didn't complete one of those

[5:50] requirements I asked for earlier. So it

[5:52] put in a stub for changing the color of

[5:54] the unicorn's mane, but it didn't

[5:56] actually complete that feature. Then the

[5:58] model gets stuck, starts iterating. And

[6:01] what does a model do in vibe coding mode

[6:03] when it gets stuck? Every single time, I

[6:05] swear to God, time to retool the test

[6:08] runner. So it uses justest for running

[6:10] its tests. It's going to retool to like

[6:11] the node native test runner or

[6:13] something. doesn't fix the problem at

[6:15] hand, but it loves making busy work for

[6:17] itself, right? Then along the way, you

[6:20] know, the model added a feature I didn't

[6:21] ask for, asking it to back out that

[6:24] change because I didn't really want that

[6:25] feature right now. And then all of a

[6:28] sudden, I'm out of tokens.

[6:31] So, let's see what Kira's been up to in

[6:34] VI mode. Okay, it looks like it's built

[6:37] something. Let's see how it looks.

[6:40] SDT.

[6:41] Okay.

[6:43] Okay. I mean, not terrible, but like not

[6:47] really a unicorn. Kind of looks like one

[6:49] of those sausage dogs, right? It's okay.

[6:52] Um, I did have one I prepared earlier as

[6:54] well. This is like the best part of this

[6:56] demo, right? Like nondeterministic

[6:57] outputs. I don't actually know what the

[6:59] model is going to give me. Sometimes it

[7:01] comes out upside down. Sometimes it's

[7:03] lost a leg through a tragic accident.

[7:05] Um, it's a lot of fun. Here's another

[7:08] example of what it produced previously.

[7:09] That to me is a rhinoceros. That's not a

[7:11] unicorn, but it is fun to to see what

[7:14] comes up. So, if we were to approach

[7:16] that problem with specs, right, how

[7:17] would it look a little bit differently?

[7:19] And I think with specs, right, much like

[7:21] with engineers, we tend to do a lot

[7:23] better when we kind of force ourselves

[7:25] to decompose the problem, articulate the

[7:28] why behind what we're trying to

[7:30] accomplish, uh, and then use that

[7:32] context when we go to build something,

[7:34] right? And it turns out models

[7:36] appreciate that same kind of

[7:37] methodology.

[7:38] And so we might say, "Hey, can you help

[7:41] me draft a PRD for a unicorn building

[7:44] rendering engine? Stranger things have

[7:46] happened." Um, it outputs a PRD. We

[7:50] review the requirements that the model

[7:51] has generated. We might then decide to

[7:55] add some very specific descriptions on

[7:57] how it is you would go about drawing a

[7:59] unicorn, and I'll show this in a second.

[8:01] Then we would ask the model to generate

[8:03] a text spec, an architecture design

[8:06] document. It's going to codify in that

[8:09] architecture document. I actually want

[8:11] to build this in React and not in Vue.

[8:13] Please use React. That saved me that you

[8:15] know that that earlier problem by virtue

[8:17] of having a PRD. We've been forced to

[8:19] think about the requirements where it's

[8:21] hallucinated a bunch of requirements

[8:23] that we don't really need. We can nuke

[8:24] those out of the PRD and now they're no

[8:26] longer going to be built. We just have

[8:28] so much more control over how we steer

[8:30] the outputs of the model. It does take a

[8:33] lot longer, like a lot lot longer, but

[8:35] the results are unquestionably orders of

[8:38] magnitude better. And so we've got a

[8:41] product requirements document, we've got

[8:42] a text spec, we've got the what and the

[8:45] why, and we've got the how in our text

[8:47] spec. Now we're going to ask the the

[8:50] model to generate a backlog. So

[8:52] decompose our list of requirements plus

[8:54] our text spec into a series of tasks

[8:57] that we're going to go after one by one

[8:59] in separate context windows. And we'll

[9:00] talk about this more in a second. Um, in

[9:02] order to yield better better results,

[9:04] then a developer begins working on task

[9:07] one, then task two, then task three with

[9:10] a very tightly honed context window

[9:12] relevant to that very task. Um, allowing

[9:15] the model to have much better results.

[9:17] I'm going to show you what this looks

[9:19] like in Kira. Uh, let's jump to better

[9:21] unicorns.

[9:23] And so,

[9:26] not sponsored by Kira, by the way, just

[9:28] like the two. And in here we've got a

[9:31] requirements doc. And in here I put in a

[9:34] very specific piece of context about

[9:37] looks like a unicorn. And here's that

[9:40] kind of key differentiator. Right? So

[9:42] defining what a unicorn is to the model

[9:44] and then forcing it to think like

[9:46] Minecraft like visuals and primitives

[9:48] available within 3JS. And don't get too

[9:50] ambitious. Right? The reality is with a

[9:53] a vibe coded model building something in

[9:54] 3.js we're not going to be able to make

[9:56] a really really detailed unicorn. it's

[9:58] not going to look amazing. So, let's

[9:59] embrace it and build something a little

[10:01] more lowfi.

[10:03] There's a bunch more in the specs here

[10:04] about requirements for configuring and

[10:06] so on. That requirements document

[10:09] resulted in an architecture document

[10:11] which I actually didn't make any real

[10:12] changes to sort of agreed with the base

[10:15] foundations of it. Quite detailed for,

[10:17] you know, a fairly basic unicorn

[10:19] rendering engine.

[10:21] And then it's decomposed that into a

[10:23] task backlog. And each of those tasks

[10:25] has just enough context for the model to

[10:27] be able to complete the task at hand uh

[10:29] and be successful. So a much better

[10:31] bounded use of context. And we'll talk

[10:32] about that again in a second as well.

[10:35] I'm going to show what it built

[10:37] here is a specdriven unicorn. Not

[10:40] perfect, but I would say that is a much

[10:41] more plausible unicorn, right? It's got

[10:43] a main. I can change the color of the

[10:45] main. Kind of comes in rainbows, which

[10:47] is nice as a default. Change the color

[10:49] of the body and so on.

[10:52] So much better than whatever this poor

[10:55] miscreant is.

[10:58] Okay.

[11:00] So what is it that's happening along the

[11:02] way um that's caused the you know this

[11:05] methodology to perform so much better.

[11:07] Right? So we have this sort of

[11:08] predictability of outputs in what we're

[11:10] doing and by virtue of being grounded in

[11:12] the specs the model is producing a much

[11:15] more deterministic output on our behalf.

[11:17] there's fewer wasted cycles along the

[11:19] way trying to retool trying to add

[11:21] features remove features and so on and

[11:23] it's also solved for both the

[11:25] overeagerness problem that problem of

[11:27] doing things that I didn't even ask for

[11:29] and also the undercompleteness problem

[11:32] of not actually completing requirements

[11:34] I asked for two different ends of the

[11:36] spectrum right overeagerness versus

[11:38] undercompleteness but both equally as

[11:40] much a problem with that sort of

[11:42] traditional traditional vibe coding

[11:44] methodology

[11:46] so by virtue of having our PR define our

[11:49] requirements and our architecture design

[11:53] grounding the model and how to build

[11:54] things and then decomposing those tasks

[11:57] into a backlog. You know, I think that's

[11:59] really the crux of solving for that

[12:01] overcompleteness or indeed

[12:02] undercompleteness um by giving the mo

[12:05] the the the model a much better unit of

[12:08] work in in you know in the form of those

[12:10] individual tasks that it's completing.

[12:12] The other thing we've done a much better

[12:14] job at doing is a much better bounded

[12:16] context window along the way. So by

[12:18] combining the PRD, that what and a

[12:21] little bit of the why with the

[12:22] architecture document, the how we're

[12:24] going to build it, that makes for a

[12:27] decomposed backlog of things to do for

[12:29] the model that have just the right

[12:32] amount of information in order to

[12:33] complete their task. Last but not least,

[12:36] by grounding the model in that

[12:37] architecture document, we're no longer

[12:39] seeing quite as many arbitrary retooling

[12:41] cycles. So trying to retool from the

[12:44] just test runner to something else,

[12:46] right? It's it's just, you know, busy

[12:48] work for the model.

[12:50] If we're specifying in our architecture

[12:52] document, this is the version of a tool

[12:54] we want to use, you know, we're less

[12:55] likely to get that type of behavior.

[12:59] I wanted to talk now about some of the

[13:01] building blocks of spec driven

[13:02] development and how we've been doing

[13:04] specri and ear form. Um first starting

[13:07] with the framework that we use. So we'll

[13:09] often use kirao for building. The other

[13:11] thing that we use a lot is a tool set

[13:13] called the bad method. Um and we're

[13:15] working on incorporating into the bad

[13:17] method some of our own roles as near

[13:20] form. So people who we have in near form

[13:22] being represented by a very hypers

[13:24] specialized role definition with a

[13:26] series of commands in each role. Um I

[13:30] saw in in one of the earlier talks you

[13:32] know people talking about this idea of

[13:34] specialized roles rather than g

[13:36] generalist full stack engineering roles

[13:38] as a direction of travel for a lot of

[13:40] agentic development tools. And I think

[13:41] that's something that holds a lot of

[13:42] promise. So we've codified what it means

[13:45] to be a technical director or a QA

[13:48] tester or a backend engineer and so on.

[13:51] We've also built a series of templates

[13:53] for what we think a good PRD looks like,

[13:55] what we think a good architecture

[13:56] document looks like and so on. So that

[13:59] forms this sort of framework that we

[14:01] ship with each of our projects that

[14:03] we're delivering in a spectrriven

[14:04] manner. Then if we look at the project

[14:06] level specs, the things that live within

[14:08] the project itself, we have the PRD we

[14:10] talked about earlier, the requirements

[14:11] dock. So the what or the why. We have

[14:14] the architecture doc or the design.mmd

[14:17] as it's called in kirao which is talking

[14:18] about how we're going to build this. We

[14:21] have the project constitution as it's

[14:23] called in spec kit or I suppose you

[14:24] could view this as synonymous with um

[14:27] the claw MD file or a cursor rules file.

[14:29] But essentially like here's a series of

[14:31] golden rules for how we build software

[14:33] in this project that I do not want you

[14:35] as a model to break. Annoyingly it's

[14:37] called a different thing in every single

[14:38] IDE. And it'd be great if we could all

[14:40] centralize on what we're going to call

[14:41] this, but we'll get there. Uh, last but

[14:44] not least, then we have that backlog,

[14:46] the decomposed list of tasks that we're

[14:48] going to go after. Um, and within that

[14:50] backlog, we end up with a series of

[14:52] specs per story. So, each task gets its

[14:54] own little bit of context. Um, we like

[14:57] to write a work log, have the agent

[14:58] write a work log to that story spec

[15:00] describing what they've done in the

[15:02] present task. And that means the N plus1

[15:05] or the next task is able to look at what

[15:07] was done previously and use that as

[15:09] context in how to now go about

[15:10] implementing its feature because very

[15:12] very very very often that previous story

[15:15] is going to dictate what the model's

[15:17] going to do next. Um, last but not

[15:20] least, we like to rely on a lot of

[15:22] models in the open source ecosystem, a

[15:24] lot of modules rather, sorry. And you

[15:26] know very often as we discover we're

[15:29] relying on let's say the very latest

[15:31] cutting edge version of a module that

[15:32] the foundation model has no knowledge of

[15:34] and so usage specs with of course our

[15:36] good friends in Tessle massively helping

[15:38] out and teaching the model how to use

[15:40] something like the latest version of

[15:41] fastify uh or how to use even a very old

[15:44] module that might not have critical mass

[15:46] within the foundation model itself. So

[15:48] to present prevent those hallucinations

[15:50] from happening along the way.

[15:54] [clears throat]

[15:54] Now, this is all well and good within,

[15:57] you know, a lone contributor or actually

[15:59] I really like the term from guy's

[16:00] keynote, single player versus

[16:02] multiplayer. Maybe I'm going to steal

[16:03] that term. But the idea of, you know,

[16:06] most of the tools for doing spectrum

[16:08] development right now being centered

[16:09] around that single player mode of

[16:11] operation is probably the biggest

[16:13] challenge that we're having right now.

[16:15] And so that's something we're having to

[16:17] work to overcome. Here's kind of the

[16:19] rough plan on how that's going to go.

[16:20] And it's showing great promise, but I

[16:22] don't have all the answers just quite

[16:23] yet. Um so first and foremost you know

[16:26] the tools are built with the assumption

[16:27] that you have a lone contributor an

[16:29] individual contributor driving all of

[16:31] the stories that have decomposed

[16:33] in series one by one right that's not

[16:37] great where we're building out you know

[16:38] a team of engineers um that might be

[16:42] much smaller than a traditional team you

[16:44] know we're no longer having teams of 12

[16:45] or 15 people building on an agentic

[16:47] project it might be three or four so

[16:49] tiny teams but nonetheless it does kind

[16:52] of need to be more than one

[16:54] And so the the sort of way to solve for

[16:57] this in my head is stories scaled out

[17:00] across multiple contributors working in

[17:01] parallel. Um but those stories are then

[17:06] you know decomposed into tasks

[17:07] associated with that individual

[17:09] contributor's specialization. So if we

[17:11] have a team of let's say a front-end

[17:13] engineer, a backend engineer and a

[17:14] DevOps engineer um in the in the process

[17:18] of decomposing that backlog each of the

[17:21] stories is going to target one unique

[17:23] area of the architecture be it front

[17:25] end, back end or DevOps rather than

[17:27] trying to span the whole code basis of

[17:28] builds. Um most of the tools right now

[17:31] tend to assume the role of a full stack

[17:33] developer that can just do everything.

[17:35] And I think as we transition more into

[17:37] these specialized roles, we're going to

[17:39] somewhat naturally solve for that

[17:40] problem of being able to to to

[17:42] collaborate on work. And so what that

[17:44] will give us is a backlog of tasks that

[17:47] very nicely map to areas of a codebase

[17:50] that are less likely to cause merge

[17:52] conflicts and things to, you know, work

[17:55] to butt up against one another. And

[17:57] it'll allow us to scale to multiple

[17:59] contributors working in parallel. So

[18:01] rather than having to to work in series

[18:03] that's that's kind of the the big change

[18:05] that we see you know needed in our own

[18:07] framework of how we build things spec

[18:09] driven is that ability to go parallel

[18:12] with that comes some challenges. So if

[18:14] we have multiple individual contributors

[18:15] working in parallel on tasks all of a

[18:19] sudden if one of them forgets to commit

[18:22] you know during the course of their work

[18:23] the consequences of that are now much

[18:25] greater because the codebase in the

[18:27] background is moving along not at the

[18:29] pace of regular work but at the pace of

[18:31] an agentic team. So the pace of change

[18:34] in the codebase if somebody forgets to

[18:36] commit rebase pull the latest um is far

[18:40] far greater. So we actually need this

[18:43] staging gate within our development life

[18:45] cycle that actually prevents anybody

[18:46] from moving on without committing

[18:48] pushing and making sure that everything

[18:50] is rebased with with master.

[18:53] Last but not least that backlog being

[18:55] able to synchronize it with a sort of an

[18:56] agile management tool like a Jira or a

[18:59] GitHub issues or linear to give you know

[19:01] greater transparency into the work of

[19:03] those agents via MCP connectivity. Um

[19:06] makes the whole thing just you know

[19:08] scale up across a broader team much much

[19:10] better.

[19:12] couple of lessons along the way that

[19:14] we've had on some real projects. So

[19:16] definitely found spec driven as a

[19:19] methodology fantastic for MVP uh and I

[19:22] mean true minimum viable product not

[19:24] prototypes but true MVPs that you're

[19:26] going to put in the hands of a

[19:27] stakeholder that you're actually going

[19:29] to ship as product and get in customers

[19:31] hands. Um I I think it's a fantastic

[19:34] build methodology for that and to that

[19:36] end really really good on green field

[19:38] projects.

[19:39] I've struggled to date with large

[19:42] brownfield projects. Um, some of the

[19:44] tooling we use has a workflow for

[19:46] ingesting and building specs that would

[19:48] allow models to, you know, do great

[19:50] things on brownfield projects. Um, but

[19:52] to date, like early early experiments,

[19:55] not not the best. Um, I have no doubt

[19:57] that that's something that we'll see

[19:58] substantial progress in over the next

[20:01] couple of months. Um, pretty good as

[20:04] well in modernization. So like being

[20:06] able to, you know, upgrade, let's say

[20:09] we're stuck on, I don't know, node 10

[20:11] and we want to upgrade to node 22.

[20:13] That's the type of work that's, you

[20:14] know, sort of toil for a developer. Um,

[20:17] great great example of having a bunch of

[20:19] agents go after that task. We've also

[20:22] found it really useful, and this is an

[20:23] unusual one, but uh projects that have a

[20:26] challenging business case. So where it's

[20:28] kind of tough to stack up the uh the

[20:30] case for investment and let's say it

[20:32] takes a team of you know five six months

[20:34] to build something uh that's not

[20:37] something a business is willing to

[20:38] commit to. If we're able to accelerate

[20:40] those timelines and cut them in half or

[20:42] even you know a quarter that makes for a

[20:44] much more viable um business case

[20:48] provided that they're willing to accept

[20:49] that this is a very progressive way of

[20:51] building software and it does not come

[20:53] without its you know without its risks.

[20:55] Um but with that caveat, you know,

[20:57] plenty of businesses are willing to take

[20:58] on a more otherwise like challenging

[21:01] thing to go after um using spec driven.

[21:03] So it's just been like a nice way of

[21:05] reframing how we think about building

[21:07] software as well. Um I mentioned, you

[21:10] know, today we've struggled in

[21:11] brownfield, struggled in like

[21:13] proprietary or legacy languages, um

[21:16] things that the model isn't very good

[21:17] at, although we have some plans to work

[21:19] with the folks in Tesla to try and help

[21:21] with exactly that. um and also actually

[21:23] not great for simple prototypes. So if

[21:25] you just want a front-end prototype, the

[21:27] specd driven workflow is actually quite

[21:30] a heavyweight thing um for building that

[21:33] really simple prototype.

[21:35] So probably better off to use, you know,

[21:37] some sort of vibe coding tool, be it KO

[21:40] in vibe mode or bolt new or or whatever.

[21:45] Um, just out of curiosity, by show of

[21:47] hands, how many folks here have used a

[21:49] spec driven ID in the last month? Okay,

[21:53] more than half. Okay, so I'm I'm not

[21:55] completely preaching to the converted

[21:56] here, but many of you already have

[21:58] experience. If you haven't yet used some

[22:00] sort of um some sort of specd driven

[22:03] enabled IDE, there's two tools in

[22:05] particular that I've really liked of

[22:06] late. The first is probably Kira is a

[22:09] great place to start. Um, if you've got

[22:11] a couple of hours to spare in building

[22:13] something, you know, with a spec driven

[22:14] methodology and you want to move

[22:16] relatively quickly, its user interface

[22:18] makes it a really, really easy on-ramp

[22:20] and it's a great place to get started.

[22:23] If you feel like you've got a couple of

[22:24] days to devote and you really want to go

[22:26] deep on this stuff and see what maybe a

[22:28] little preview of the future might look

[22:29] like, the BMAD method, which is is an

[22:32] open source project on GitHub that

[22:34] installs quite nicely into the likes of

[22:35] Cloud Code or Cursor, um, is a fantastic

[22:38] place to start. It does a lot of that

[22:40] specialized role definition um and

[22:43] allows you to follow a really detailed

[22:44] workflow for your your spec driven

[22:46] methodology

[22:49] and then a little bit on what the future

[22:50] might hold here. So I sort of reckon the

[22:53] hyperparameter race might not be the

[22:54] path to success here now and what we're

[22:56] going to see over the next 6 to 12

[22:58] months. It's probably going to be more

[23:00] of a refinement of the techniques and

[23:03] ways that we interact with foundation

[23:05] models. Um that's what I'm hopeful for.

[23:08] I've certainly been wrong in the past,

[23:09] but you know that feels like the

[23:11] direction of travel right now. I have

[23:14] great faith in the fact that the best

[23:17] approximation of what specri development

[23:18] is going to look like in the future

[23:20] right now is living in the open source.

[23:21] I think that's freaking awesome um in

[23:24] the form of BMAD. And I'm really excited

[23:26] as well to see this get codified into

[23:29] Kira back in was it June July um as the

[23:33] first thing to codify some of these

[23:34] specriven primitives and even this week

[23:36] like two days ago Google launching

[23:37] anti-gravity again a couple of

[23:39] specdriven things showing up in

[23:41] anti-gravity as well. So I'm really

[23:43] excited to see what some of the other

[23:44] tool vendors do like what's going to

[23:45] come next as we try to codify some of

[23:47] these techniques into how we build. Uh

[23:50] if you're looking to take some of this

[23:51] further, a couple of resources. Brigetta

[23:54] Buckler has some fantastic writing on

[23:56] Martin Fowler's blog on evaluating um

[23:59] both the kind of methodology of spec

[24:00] driven and then also some of the tools.

[24:02] Um well worth checking out some of her

[24:03] writing. Uh and then we mentioned, you

[24:05] know, Kira is a great place to get

[24:07] started if you got a couple of hours to

[24:08] spare. And if you want to go really

[24:10] really deep, I would recommend the BMAD

[24:12] method. Um it's out there on GitHub. You

[24:15] can install it into your IDE and have a

[24:17] play around. Um, I don't know how we're

[24:19] doing on time for questions. Nope, I

[24:21] think we're done. All right, I will be

[24:23] around if people want to chat. And thank

[24:24] you so much for having me. [applause]

[24:27] [music]

[24:33] [music]

[24:50] >> [music]
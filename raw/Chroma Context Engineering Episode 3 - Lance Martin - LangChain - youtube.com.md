---
title: "Chroma  | Context Engineering Episode 3 - Lance Martin - LangChain"
author: "Chroma"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=MJScoDgIcXg"
date_saved: "2026-05-03T02:05:09.533Z"
---

# Chroma  | Context Engineering Episode 3 - Lance Martin - LangChain

[0:00] All right, Lance, welcome.

[0:02] >> Great to be here. I've always enjoyed

[0:03] this uh this pod. I've listened to a

[0:05] bunch of them, so it's a pleasure to be

[0:06] here.

[0:07] >> Awesome to have you. Um, okay, the topic

[0:10] to Jour is all things context

[0:12] engineering, compound AI systems,

[0:16] uh, let's see, agent harnesses,

[0:18] etc. Um, you've been writing about this

[0:20] for at least the last six months, maybe

[0:23] longer. Yeah. um maybe like give us

[0:27] quickly

[0:28] an introduction to the motivations of

[0:30] like what why context engineering and

[0:32] then like what's changing and like

[0:34] >> yeah we'll go there.

[0:35] >> Yeah, it's it's great to talk about this

[0:37] and we've been circling around each

[0:39] other on Twitter for months and maybe

[0:40] years actually. So um

[0:43] >> you know I I think many of us had an

[0:45] experience building our first agent and

[0:47] what we found is not only do you have to

[0:49] do prompt engineering you have to

[0:51] instruct the agent properly but the

[0:52] agent goes off and performs actions tool

[0:55] calls and it receives context from those

[0:56] actions

[0:58] >> and those things accumulate in the

[0:59] context window. I remember I took a deep

[1:01] research agent I it was a deep research

[1:03] workflow initially I turned it into an

[1:05] agent. I just let it run. I let it

[1:07] perform web searches autonomously in a

[1:08] loop until some termination. And it, you

[1:11] know, the overall cost was something

[1:12] like $3 and it was hundreds of thousands

[1:14] of tokens of context.

[1:16] >> And I think what people realize in

[1:17] building agents is, oo, this is tricky

[1:19] because not only do I now have to do

[1:20] prompt engineering, I need to engineer

[1:22] instructions. That's still important, of

[1:24] course, but they go ahead and, you know,

[1:26] perform actions that receive context.

[1:28] So, you have to manage that in some way.

[1:30] >> And I think there's a couple reasons for

[1:32] that. Um one is your nice work on

[1:35] context rot for example uh as context

[1:38] grows performance degrades and this has

[1:40] been observed by many people including

[1:41] you.

[1:42] >> Yep.

[1:43] >> The other point is actually more

[1:45] practical even uh which is just cost and

[1:47] latency. So for example my little deep

[1:49] research agent the first time I kind of

[1:51] turned it into an agent it was like yeah

[1:53] $3 per run right

[1:54] >> it was cost prohibitive and it was it

[1:55] was quite slow. Um, and I think a lot of

[1:58] people had that experience over the last

[2:00] year when they kind of migrate over to

[2:02] agents and Karpathy kind of coined

[2:05] sometime in the spring this notion of

[2:07] context engineering like hey it's

[2:08] actually important to curate the

[2:09] information or context at every turn of

[2:11] an agent and I think that really

[2:13] resonated. I started talking about that

[2:15] quite a bit. I did a a meet up with Drew

[2:17] Brunig. He did some really nice writing

[2:18] on this topic. Um, and I think it it

[2:22] kind of took hold because people

[2:23] viscerally were having that experience

[2:24] collectively of like, oh yeah, it's

[2:26] actually tricky to build agents because

[2:28] not only did it to manage prompts, you

[2:29] have to manage the context flowing in

[2:31] from these actions.

[2:32] >> Yep.

[2:32] >> I think it's really the motivation and

[2:33] actually I think your work on on context

[2:35] rot was was very was very nice along

[2:37] these lines.

[2:38] >> Yeah. Yeah. I mean it was something that

[2:39] we saw was a real our whole focus is

[2:43] helping builders build useful AI systems

[2:46] and like

[2:47] >> um you know something we saw routinely

[2:49] in the people I worked with was like a

[2:51] struggle to get the mods performance

[2:53] perform at like larger token context

[2:55] windows and uh

[2:57] >> and so like oh if we can like actually

[2:58] study that and like measure that and um

[3:00] you know even to this day may I guess

[3:03] like I actually don't know obviously the

[3:04] internals but like you know I don't

[3:06] think though now all the large labs have

[3:08] acknowledged that this is the case to my

[3:10] understanding. Um you know when we

[3:12] released that there was no

[3:13] acknowledgement from large labs that

[3:14] that was the case.

[3:15] >> Um and like now they acknowledge it.

[3:17] I've not seen any independent work from

[3:19] them and maybe they have their own

[3:20] internal benchmarks. Um but

[3:22] >> you know I think that like now we're

[3:24] kind of exiting a bit of the era of like

[3:28] AGI maximalism. Um I think sort of like

[3:30] self-evident. You don't see as much of

[3:32] the narrative online about like even

[3:34] like safety stuff. Maybe it's like

[3:35] actually underrated now. you know,

[3:37] safety was actually overrated for a

[3:38] while. You know, opening eye is afraid

[3:40] to release GP3,

[3:42] you know, and like now maybe safety is

[3:44] actually underrated in a way. But like I

[3:46] think we kind of moved out of like AGI

[3:48] maximalism and into just like okay great

[3:51] like you know we have x trillions of

[3:53] dollars invested now into like the AI

[3:56] stack across the board. Like we better

[3:59] see some value out of this in the near

[4:00] term or it's all going to come crashing

[4:01] down. So he's motivated by that.

[4:04] Yeah, you know, it's interesting and I

[4:05] think if you reflect back on 2025, I was

[4:07] doing this at the end of the year. I

[4:08] wrote kind of a new post on this on my

[4:11] Twitter.

[4:12] >> Um, I think we saw some interesting

[4:13] trends with agents, you know, along

[4:15] these lines of content engineering. And

[4:16] I think maybe the most interesting trend

[4:19] um was basically giving an agent a

[4:22] computer, but not in the way people

[4:24] necessarily thought at the beginning of

[4:25] the year. Like we can maybe reflect on

[4:27] this a little bit. Computer use has

[4:28] been, you know, discussed for years now.

[4:30] And I think the mental model originally

[4:32] was okay, I'm going to give uh an LLM

[4:34] access to kind of my my desktop and it

[4:37] can perform actions. It can click

[4:38] around. But actually what occurred more

[4:41] is no using a computer as a primitive

[4:44] for an agent specifically giving it

[4:45] access to like a shell in a file system.

[4:48] And this helps significantly with

[4:51] context management problem.

[4:53] >> Um

[4:54] >> and you know what's what's funny is in

[4:57] the past year model context protocol

[4:59] drops. So suddenly, oh, I can like

[5:00] access all these tools. That's great.

[5:02] >> Y

[5:03] >> um but I think the interesting insight

[5:06] is some of those popular agents like I

[5:09] did a thing with Manis this year. Um

[5:11] obviously they just got bought by by

[5:13] Meta

[5:13] >> Cloud Code obviously tremendously

[5:15] successful and others there's many kind

[5:17] of variants of of kind of cloud code now

[5:19] open source that are really good. I've

[5:21] done some work on deep agents there's

[5:22] open code amp there's many.

[5:24] >> Yep. The insight is actually um all of

[5:28] them use very few tools like what's

[5:30] pretty interesting is um cloud code used

[5:33] like a dozen tools manis uses less than

[5:35] 20 tools amp similarly there was a nice

[5:38] talk from there the kind of lead

[5:40] engineer there he was talking about how

[5:41] they curated you know the action space

[5:43] and

[5:44] >> that works because you can use computer

[5:47] to offload actions

[5:49] >> right

[5:50] >> um and one of the things that we kind of

[5:52] saw is that tools load up context.

[5:56] >> Yes.

[5:56] >> You know, for example, like the GitHub

[5:57] MCP server is like 35,000 tokens and 35

[6:00] tools.

[6:00] >> Y

[6:01] >> So if you load that in now, it's easier

[6:02] and easier to add tools to your agents.

[6:05] >> Y

[6:05] >> um but what happens is you blow the

[6:07] context and they can be confusing. And

[6:09] so an interesting trend that occurred

[6:11] over the course of the year, which

[6:12] informs a lot of the context engineering

[6:14] stuff that we might talk about is this

[6:15] idea of giving agents computer.

[6:17] >> Yep.

[6:18] >> And when you do that, a lot of

[6:19] interesting things fall out, which we

[6:21] could talk about a little bit.

[6:22] >> Yeah. Yeah. Yeah, I think like there was

[6:23] this period of a few months at least

[6:25] where the discourse was very much about,

[6:29] oh no, we're giving this agent access to

[6:32] the linear MCP and it has a bajillion

[6:35] tools and it's really hard to get the

[6:37] agent to pick the right tool and also

[6:38] context rot

[6:39] >> and um of course you know I'm I'm a bit

[6:42] bit of a hammer guy so everything does

[6:43] look like a nail admittedly but like uh

[6:46] you know I was like why don't we just

[6:47] search for the right tool guys you know

[6:49] like you know that's actually what like

[6:51] now seems to be like the evolving

[6:53] emerging pattern is just that right

[6:55] either literally MCV tool search or like

[6:58] file system offloading which is really

[7:02] just again I mean you know GP maybe

[7:04] centric obviously right but it's still

[7:05] some version of like search at the end

[7:07] of the day

[7:08] >> this is a super interesting to talk

[7:09] about so I think this is another trend I

[7:11] noticed so in addition to you know you

[7:13] give an agent a computer that's great

[7:16] then what you can do is build what I

[7:17] kind of call and I kind of got this from

[7:19] manis I did a webinar with with peak

[7:21] from Manis their their chief science

[7:23] officer

[7:24] >> um

[7:25] >> a multi-ter action space and so the

[7:27] interesting point is

[7:28] >> there's a tool calling layer and then

[7:30] there is basically the computer and the

[7:32] computer can have different can perform

[7:33] different actions in a few ways we'll

[7:35] talk about but

[7:36] >> at the tool calling layer you're exactly

[7:37] right um and we can we talk about kind

[7:41] of there you can do progressive

[7:43] disclosure of tools rather than dumping

[7:45] all those tools into context using a

[7:48] tool search tool so like anthropic talks

[7:50] about this now and And I'd done some

[7:52] work on this previously. There's think

[7:53] there's a paper called big tool. Do you

[7:55] remember that? Where basically they just

[7:57] and this actually is up your alley. So

[7:59] they index tool descriptions and just do

[8:01] semantic search over tool descriptions

[8:02] to fetch the right tool for the task.

[8:03] Makes sense.

[8:04] >> Yeah.

[8:05] >> Um so the kind of the idea is um

[8:10] building out a like multi-ter action

[8:12] space with tool calling at the bottom

[8:14] layer where you can do things for

[8:16] progressive disclosure rather than

[8:18] dumping tool definitions like tool

[8:20] search. That's one thing you can do.

[8:22] >> But not only that, you actually can push

[8:26] those actions from the tool Kong layer

[8:27] out to the computer. And I think that's

[8:29] the big trend. That's actually why

[8:32] >> Manis uh Claude Code use only like a

[8:36] dozen tools, but they can do tons of

[8:37] things. That's kind of a paradox. I

[8:39] think this and this was actually

[8:40] legitimate confusion I had

[8:43] >> or or kind of view I had years ago or

[8:45] you know the first few years of agents.

[8:47] Okay, I want my agent to perform n

[8:49] actions, right? Each action I'm going to

[8:51] encapsulate as like a Python script and

[8:52] bind that as an individual tool. So n

[8:54] actions equals n tools. Yeah. And that's

[8:57] not what played out. What played out is

[8:59] no a few atomic tools

[9:01] >> that can do very general things. Yep.

[9:03] >> And push all those actions out to the

[9:04] computer. So yeah,

[9:06] >> a good example here is even for MCP

[9:08] there's a trend of no push that out to

[9:10] the computer. So don't take that MCP

[9:12] server and bind it as tools to the LM.

[9:16] Instead like cursor does this is they

[9:17] had a blog post. It was interesting.

[9:19] >> They take their MCP servers whatever

[9:21] ones you bind to the model and they

[9:22] actually sync them to the file system.

[9:24] >> So they sync all those all the

[9:26] individual tools

[9:27] >> as f it's clever right. So then what you

[9:30] do is you basically just do like file

[9:32] search like you said.

[9:33] >> Yep.

[9:33] >> Could be GP could be otherwise it could

[9:35] be indexed. Who cares?

[9:36] >> But that's the point. So you're pushing

[9:38] it out to the computer. Doesn't live in

[9:40] context.

[9:42] >> Push them out to the computer in that

[9:43] case as files.

[9:45] manage does something similar, but

[9:46] actually they use something different.

[9:47] They do like a they built a CLI for MCP.

[9:50] >> Yep.

[9:50] >> So it's like a CLI utility and like I'm

[9:53] not sure how it works, but the point is

[9:55] >> they made the same point like do not

[9:57] take all these MCP servers and bind them

[9:59] to the model.

[9:59] >> Yeah.

[10:00] >> Push that out to the computer.

[10:01] >> Yep.

[10:02] >> Then you get into um you know the

[10:06] computer all says bash utilities that

[10:08] Elm can use. That's great. It has

[10:10] whatever installed CLIs are available.

[10:12] That's great. Mhm.

[10:13] >> And then there is being ability to write

[10:15] code.

[10:16] >> So it can chain actions. And this is an

[10:17] old idea. The Kodak paper 2024 talked

[10:19] about this. Basically

[10:21] >> instead of performing classic tool

[10:23] calling, just allow agents to compose

[10:26] actions by writing scripts. Yep.

[10:27] >> Simple idea. Great idea. Manis talks

[10:30] about that quite that's what they did.

[10:31] So overall, if you if you roll it all

[10:33] back, it's like, okay,

[10:35] >> we have agents. We give them a computer.

[10:37] Give them a few simple atomic tools to

[10:39] drive that computer. Yep. and then just

[10:40] push all our actions out to the

[10:42] computer. Y

[10:43] >> like you said, you you could do a tool

[10:45] search tool at the tool layer and people

[10:47] can do that.

[10:48] >> But I think also people are saying, "No,

[10:49] I'm just going to push my actions out to

[10:51] the computer,

[10:52] >> sync MCP search to the file system."

[10:54] >> Y

[10:55] >> let the let the let the agent write code

[10:57] as an example.

[10:58] >> Yep.

[10:58] >> Um use kind of built-in CLIs. And that's

[11:02] like the trend we saw.

[11:03] >> Yeah.

[11:03] >> And it's kind of a nice architecture

[11:05] because it keeps that tool calling layer

[11:06] really thin. a few atomic tools doesn't

[11:09] bloat the context

[11:11] >> um and for your actions they can live

[11:14] out in this you know separate in in in

[11:16] the computer basically

[11:18] >> what is um I I would reciprocate uh I

[11:21] guess like

[11:22] >> thinking about like the state of things

[11:23] right now there's both like you know the

[11:26] best practices we don't know how many of

[11:28] these are like stable long-term best

[11:29] practices uh and there's also like stuff

[11:31] that's on like the edge and on the

[11:33] margin interesting crazy ideas for how

[11:35] like this will evolve like let's first

[11:37] like the base case which is um you know

[11:40] >> like if I want to build an agent today

[11:43] that does uh well something top of mind

[11:45] which I'll share a little bit about if

[11:46] you're interested what I'm building is

[11:47] like the sort of like GTM engineering

[11:50] agent system um right

[11:52] >> and uh

[11:53] >> GTM like go to market

[11:54] >> yeah go to market yeah so sort of you

[11:56] know sales account research uh contact

[11:59] research like content enrichment like

[12:02] you know things right like I guess

[12:04] >> we don't have to use that exact example

[12:05] if you don't want to but like give give

[12:07] me like your mental picture. It could be

[12:08] something that you've built recently

[12:09] either for you know personal or work

[12:12] like you know what is like kind of that

[12:14] harness look like today I guess like and

[12:17] how would you set it up? Yeah, let's

[12:18] walk through that. I mean that that's a

[12:19] great one. So I actually spent a lot of

[12:20] time working on the deep agents harness

[12:22] at Lang Chain. So that's an open source

[12:24] kind of it's kind of a cloud code

[12:25] implementation style agent but it's a

[12:27] general purpose and I did a lot with

[12:29] that. I built I built the skill system

[12:31] for it and so forth. So let's kind of

[12:32] talk through how you know harnesses are

[12:34] structured.

[12:34] >> Yeah. Um, and this is just like one

[12:37] particular take on it, but it kind of

[12:39] captures a lot of the insights I think

[12:41] we've seen. So, basically,

[12:43] >> first, what's how's the the action

[12:44] space? So, the action space is a

[12:47] multi-ter action space,

[12:48] >> a small number of atomic tools for the

[12:50] reasons we mentioned that saves tokens.

[12:52] It

[12:53] >> results in less confusion from the LLM.

[12:55] >> Yep.

[12:56] >> A few tools that are pretty simple that

[12:58] allow the agent to control a computer.

[13:00] So, it could be like running locally,

[13:02] could be a virtual computer either way.

[13:04] So deep age is what I worked on supports

[13:05] both.

[13:06] >> So that's point one. At the tool calling

[13:09] layer a few simple tools similar to

[13:10] cloud code. I think that's a pretty good

[13:11] pattern. Manis uses it. Amp code many

[13:14] many kind of converged on like a few

[13:16] pretty simple atomic tools. Glob GP file

[13:20] read write things like that right that's

[13:22] kind of obvious.

[13:23] >> Um

[13:25] the second concept I think is

[13:27] progressively disclose things to the

[13:29] agent. So this a progressive disclosure

[13:30] idea. I think the new skills standard

[13:33] from is a great example of this. So

[13:36] basically

[13:37] >> uh it's a nice way to give an agent

[13:39] different standard operating procedures

[13:42] >> uh instructed how to use built-in CLIs

[13:44] or tools or maybe the tool layer is is

[13:48] is kind of more like stable but

[13:51] >> but um skills I think typically in in

[13:55] what I've seen will give the agent like

[13:58] SOPs for doing different things in the

[14:00] computer. Yep. like using different

[14:02] installed CLIs um or like writing code

[14:05] for particular tasks um so like I built

[14:07] skills for example for a bunch of things

[14:10] I have a skill for uh writing which I

[14:12] use with claude code while she was with

[14:14] deep agents and it basically takes

[14:15] shrunken whites elements of style

[14:17] classic book on writing

[14:18] >> it encapsulates that I did this with my

[14:20] friend Noah Breer who's really like a

[14:22] great writer he kind of g me gave me the

[14:24] idea we iterate on it together but

[14:26] basically it's literally just a markdown

[14:28] file a skilled MD file right that's like

[14:30] That's kind of the skill standard that

[14:32] lives on the file system. Yep.

[14:34] >> Um and that uh kind of has clear

[14:37] instructions from some of my own writing

[14:39] and like kind of trial and error as well

[14:41] as uh from you know the book about how

[14:44] to write. So that's an example. I have a

[14:46] deep research skill that I build for

[14:47] deep agents and so forth. And so

[14:49] >> so you know again point one

[14:52] >> uh a very kind of thin um you know tool

[14:56] calling layer

[14:57] >> access to computer

[14:58] >> progressive disclosure of context that

[15:01] can live on the computer for example for

[15:03] skills

[15:04] >> they live in files the agent can pull

[15:06] them in as needed

[15:07] >> um for like any command line utility so

[15:10] actually this is another funny one I

[15:12] recently built this little utility

[15:13] called lang fetch it's just like a

[15:15] simple command line utility allows you

[15:17] to get traces from langmmith

[15:18] And I built a number of skills that

[15:20] basically instruct deep agents to when

[15:23] they're writing langraph code as an

[15:25] example which always logs to lang. It

[15:28] basically instructs hey if I'm debugging

[15:30] something um and I want to grab the lang

[15:33] trace like here's how to use this this

[15:34] CLI.

[15:35] >> Yep.

[15:35] >> So anyway that's another good example of

[15:37] skills and how it can instruct an agent

[15:38] to use particular CLIs.

[15:40] >> Yeah.

[15:41] >> So thin tool calling layer progressive

[15:43] disclosure. Now let's talk through some

[15:45] of the kind of the tricks and

[15:46] techniques. So I think this idea of

[15:48] context offloading is a good one and

[15:51] we've seen this quite a bit. So Manis

[15:53] does this. So basically tool results can

[15:55] be tokenheavy. They get dumped into the

[15:58] chat history. They accumulate over time

[16:00] >> and they're sent through each turn which

[16:02] you don't want.

[16:03] >> Uh and so a kind of a trend is to

[16:05] offload them to save them to the file

[16:06] system.

[16:07] >> Yep.

[16:07] >> And like you know give the agent a

[16:09] pointer. Here is the tool result. This

[16:11] is maybe a summary. Here's the full

[16:13] result if you want to retrieve it. Mhm.

[16:16] >> Um I think that's a good technique.

[16:17] >> Yep.

[16:18] >> Um so offload old stuff and and actually

[16:20] Anthropic just added this their SDK.

[16:22] It's called context editing. Um we had

[16:25] the notion of this as well but this

[16:27] context of context offload is a good

[16:28] idea. So basically offload old tool

[16:31] results. A related idea is offloading

[16:34] plans. Um so not only can you offload

[16:36] kind of old context tools but you can

[16:38] offload a plan. And I think this is

[16:39] actually

[16:40] >> scratch pad thing

[16:41] >> as an example the scratch pad concept.

[16:43] And this this is a good idea. So

[16:44] basically, Manis talks about like they

[16:48] initially saved like a Manisto-do.md

[16:50] file to the to the Manis file system.

[16:52] >> Y

[16:53] >> and they talk about in a blog post this

[16:54] idea of recitation. So like while an

[16:57] agent is performing a task, you can pull

[16:59] the plan back into context to like

[17:01] reinforce objectives. Kind of an

[17:02] intuitive idea. I think that's a good

[17:04] that's kind of a good trick. We've seen

[17:05] a lot of variants of this. Um we've saw

[17:08] like the Ralph Wigum loop which we could

[17:09] talk about later but that kind of went

[17:11] viral on Twitter over the break and um

[17:14] >> you know one of the key components of

[17:15] that is just like a plan file that that

[17:17] like basically lives you know in in the

[17:20] file system that each loop of the agent

[17:22] reads picks a task from and like

[17:24] continues right so

[17:26] >> anyway the point is um offloading

[17:28] context is another useful technique um

[17:31] and you can offload tool results you can

[17:33] offload plans read them both back into

[17:35] context as needed and saves the context

[17:36] window a bunch. So that's another

[17:38] principle.

[17:39] >> You know, one that's a little bit under

[17:40] appreciative I think is very useful is

[17:41] caching context.

[17:43] >> Uh so there are some interesting

[17:44] dialogue on this recently. Manis talks

[17:46] about cache hit rate as like one of the

[17:47] most important metrics for production

[17:49] agents

[17:50] >> and it makes sense. It's basically like

[17:51] you know you have this chat history can

[17:53] be it can be long and just cache it

[17:56] >> and you know every incremental turn of

[17:58] your agent you're only in the KV cache.

[18:00] >> Correct.

[18:00] >> Yeah.

[18:01] >> So you're only adding um you know one

[18:03] tour result at every turn. see this big

[18:05] history that's invariant or it should be

[18:07] and that's like kind of the

[18:09] >> we can talk about that more but

[18:10] >> the invariency is not for reliability

[18:12] reasons so much it's for speed and cost

[18:15] >> speed and cost yeah

[18:16] >> is speed and cost take so so that that's

[18:17] another trick that you can add I think

[18:19] is very good so so I would say

[18:21] offloading caching

[18:23] >> these are some of like the agent tricks

[18:24] I think another is is context isolation

[18:27] so sub aents this is talked about a lot

[18:29] y

[18:30] >> if you have an atomic task that you can

[18:32] kind of

[18:33] >> uh assign to a particular sub aent and

[18:36] isolate all the context associated with

[18:37] that. Like research is a classic,

[18:38] >> right?

[18:39] >> Highly paralyzable.

[18:40] >> Highly parallelizable. And and what

[18:42] we've seen is there's there's been some

[18:43] good interviews with Boris from from

[18:45] cloud code and he talks about how they

[18:46] use sub agents frequently within the

[18:48] cloud code team to do like code review

[18:50] just like kick off end sub aents for

[18:52] like each of these end tasks they want

[18:54] to like you know check for given PR

[18:57] >> uh migrations

[18:59] um lint rules things that are easily

[19:01] paralyzable. sub agents are kind of like

[19:03] a a really good thing to do.

[19:05] >> Yep.

[19:06] >> Uh I also think another interesting one

[19:08] is for long run agents like the Ralph

[19:10] Wiggum loop. So like the

[19:11] >> So tell us what what is the Ralph Wigum?

[19:14] >> This is fun. So like Ralph Wigum is a

[19:16] character from the Simpsons that like

[19:18] I'm like I'm in danger thing.

[19:20] >> Um so basically it's a way to perform

[19:23] longunning tasks with agents and it's

[19:25] like a pretty simple idea and actually

[19:27] he put it out like last July but it just

[19:29] kind of caught fire. You never know how

[19:31] things catch fire online. Online's a

[19:33] funny place.

[19:33] >> It is.

[19:34] >> But um the idea is simply this like you

[19:37] basically have a particular file. This

[19:40] is like one implementation of it, but

[19:41] the idea is more general. It's a way to

[19:43] to chain agents for longunning tasks.

[19:46] >> Um a good way to set it up is Anthropic

[19:48] put a little piece out on this. Um, you

[19:51] have a plan file which is just basically

[19:54] like a list of tasks that you want done.

[19:55] And this can be performed up front maybe

[19:57] by the human or maybe an independent

[19:59] agent could generate the plan.

[20:00] >> Yep.

[20:01] >> And you have a file system like we said

[20:03] a big a major primitive now is giving

[20:04] agents access to the file system. That's

[20:06] fine. And you have like a a progress.txt

[20:09] file which is like under scratchpad. And

[20:11] you kick off a loop. So one agent picks

[20:13] a task from the list, does that task,

[20:16] commits it all to the file system.

[20:18] That's fine. and updates like updates

[20:20] the task list saying I did this and like

[20:22] writes some notes to progress.txt txt.

[20:24] >> Mhm.

[20:25] >> That's all done in my one agent one

[20:26] context window. Agent two picks up on

[20:30] the next loop.

[20:31] >> Yep.

[20:32] >> Reads get history reads like progress

[20:35] then reflects on like the task list does

[20:37] the next task and this just proceeds

[20:39] until you're done.

[20:40] >> Pretty simple idea but like people have

[20:42] there's a plugin for it for cloud code.

[20:44] It seems to be pretty effective. I think

[20:45] Vivc from lang changes did it for deep

[20:47] agents. Um it's a simple idea that uh

[20:52] basically the insight is for longunning

[20:55] tasks you can't fit the whole task in a

[20:57] single context window right

[20:58] >> so it's related this idea of context

[20:59] isolation so isolate individual tasks

[21:02] from like a you know from like a spec to

[21:04] different sub agents let that sub agent

[21:05] cook

[21:07] >> and let the agents communicate via git

[21:08] the file system in this like

[21:10] progress.txt txt file.

[21:11] >> Pretty clever, simple idea, seems to be

[21:13] effective.

[21:14] >> Yeah.

[21:14] >> So that's another good example of

[21:15] isolation.

[21:16] >> Yeah.

[21:16] >> Um

[21:18] so we basically have, you know, a few

[21:21] interesting tricks. Um we have give your

[21:24] agent a computer. We have keep the tool

[21:27] calling layer thin.

[21:28] >> Y

[21:28] >> use progressive disclosure to sync

[21:31] things or to kind of discover context

[21:33] from the file system. This could be

[21:35] tools. This could be SOPs as skills. Y

[21:38] >> um

[21:39] >> use um use sub agents for context

[21:42] isolation. You can use them different

[21:43] ways for parallelization for kind of

[21:45] these long running tasks.

[21:46] >> Caching clever way to save cost and

[21:49] time. Yep.

[21:50] >> Offloading nice way to clean to kind of

[21:52] keep your context window clean. And this

[21:53] is another thing you mentioned.

[21:55] Offloading is also nice because it it

[21:57] require it limits your need to perform

[21:59] compaction. Compaction is destructive.

[22:01] >> Yeah.

[22:02] >> If you summarize your chat history, you

[22:03] lose stuff. So just offload it instead.

[22:05] >> Yep. Yep.

[22:06] >> Make it searchable. Y

[22:08] >> um

[22:10] and um I think those are some of the key

[22:13] principles that are pretty interesting.

[22:15] >> What I mean

[22:17] >> do we have AGI at home today or

[22:20] >> right

[22:20] >> what are the limits like this pattern

[22:22] that you just laid out?

[22:23] >> Yeah. Yeah.

[22:24] >> Let's take a state-of-the-art model of

[22:25] your choice.

[22:26] >> Yes.

[22:26] >> What can it not do or what have you

[22:28] found that it can't do yet? So this is

[22:30] this is a really good this is a really

[22:32] good segue into the last big category I

[22:35] think is very much an emerging frontier

[22:37] and is indeed not at all solved is what

[22:41] I might call evolving context. So Dark

[22:44] has written a lot about this continual

[22:45] learning. It's obviously a major theme.

[22:47] >> Um you know let AI they've done a lot of

[22:52] nice work on on agents and memory. They

[22:53] put out a nice blog post talking about

[22:54] continual learning in token space. So

[22:56] often we talk about continue learning,

[22:57] we're talking about actually updating

[22:59] model weights.

[23:00] >> Uh you can also do continue learning in

[23:02] token space and that is something like

[23:04] you have context stored externally for

[23:08] example in the file system to the agent

[23:10] >> that is evolved over time based upon

[23:12] things. This could be based upon the

[23:15] needs of a task. This could be based

[23:16] upon memories and preferences. It could

[23:18] be based upon skills. And so I think

[23:21] this is an area that's super

[23:22] interesting.

[23:24] And there's a few kind of cool emerging

[23:26] threads. So like Omar uh the DSPI folks

[23:30] have done a ton of interesting work

[23:31] here. So I think you can break this

[23:33] evolving context continue learning thing

[23:35] down into a few categories. There can be

[23:38] >> evolving like taskspecific context or

[23:42] prompts. So I think um the Jeepa paper

[23:45] from Omar is really interesting on this

[23:46] point where basically it's like

[23:49] >> let agents do things reflect over the

[23:51] trajectories

[23:53] and trajectories plus scores use some

[23:56] evaluation criteria for a given task.

[23:58] Reflect over trajectories

[24:00] >> then propose task specific prompt

[24:01] updates and you have kind of a a

[24:03] population of prompts and you continue

[24:04] testing and and they have some

[24:05] interesting tricks there. But the key

[24:07] insight is evolving task specific

[24:10] context specifically task specific

[24:11] prompts over time

[24:12] >> right

[24:12] >> by reflection right

[24:14] >> so that's like kind of one thread of

[24:15] this evolving context thing

[24:18] >> another thread is I've done some early

[24:20] experiments I called this claude diary I

[24:21] put it out on Twitter but basically

[24:24] >> um

[24:26] so all your uh cloud code sessions are

[24:29] stored locally actually yeah you can

[24:30] access them there's these JSON files

[24:32] saved into like the cloud folder

[24:34] >> you can access them and um I built a

[24:38] little simple thing where I actually

[24:40] just kind of uh either within my cloud

[24:43] session or I can pull in the histories I

[24:45] basically write like a summarized diary

[24:46] entry for each one and I then later

[24:50] >> asly perform a reflection over my diary

[24:52] entries and then update cloud MD it's a

[24:55] simple reflection loop where basically

[24:56] you're saying okay

[24:57] >> y

[24:58] >> look at what I did reflect on it and

[25:01] update my my my prompt my system prompt

[25:03] which is captured in cloud MD and so and

[25:05] And specifically, I'm trying to capture

[25:06] things like memories preferences, git

[25:08] preferences, like and I wrote a little

[25:10] blog post on this and I it's been really

[25:12] useful. So like it's captured things

[25:13] like um PR review is a good one.

[25:16] >> So like you get a bunch of comments in

[25:17] PR review and like those you kind of

[25:19] >> you address those with Claude in your

[25:21] given you know in your in a given

[25:23] session but then I have a little I have

[25:25] a little plugin for this. Basically at

[25:26] the end of the session you can say

[25:28] >> create a diary entry from this session.

[25:29] It captures all those preferences and

[25:31] all those learnings right

[25:32] >> reflect on it and then update cloud MD

[25:34] over time at a later point in time.

[25:36] >> Yep.

[25:36] >> Um so that's another kind of notion of

[25:39] this condex evolution continual

[25:41] learning.

[25:42] >> Y

[25:42] >> which is super crude you know this is

[25:44] just like me creating some custom man

[25:46] it's really crude but it's like an

[25:48] interesting idea.

[25:48] >> Yeah

[25:49] >> and there's a bunch of papers on this by

[25:50] the way of course you know right

[25:52] >> and then the third is skill learning. So

[25:53] let is a good paper on this but it's

[25:55] it's very similar. Yeah. Reflect over

[25:57] agent trajectories. If you see like an

[25:58] SOP, like a standard operating

[26:00] procedure, something that could be

[26:01] captured as a skill.

[26:02] >> Yep.

[26:02] >> Save it as a skill right to the file

[26:04] system.

[26:04] >> Yep.

[26:05] >> Same idea.

[26:05] >> Y.

[26:06] >> So, I think those are three specific

[26:07] ways you can think about like evolving

[26:09] context.

[26:09] >> Y

[26:10] >> uh that are pretty interesting.

[26:12] >> Um

[26:14] >> and this seems to be a very much an

[26:16] emerging area. Like these are like at

[26:18] least what I did is like super hacky

[26:20] >> and I've also done I did some skill

[26:22] learning stuff. If I test that with deep

[26:23] agents and again it was just kind of

[26:25] like me writing some like custom prompts

[26:27] to hey reflect over these reflect over

[26:30] this particular like trace and if

[26:33] there's something that seems like a

[26:35] common pattern captures a skill and save

[26:36] to the file system.

[26:37] >> Yep. So I think this is a big area and

[26:40] obviously there's a lot of talk about

[26:40] continual learning and um do you think

[26:43] that I guess like where do you think

[26:45] that there's continual learning quote in

[26:48] token space we just call it continual

[26:50] learning in skill MD files. Yeah,

[26:53] exactly.

[26:53] >> And uh sounds less fancy but there

[26:58] >> and then there's also like continual

[27:00] learning in like the model weights

[27:02] obviously but I guess like

[27:04] >> you know continual learning in skilled

[27:06] MD feels like easier to I mean people

[27:08] talking about like memory for a long

[27:09] time right stuff and like you know

[27:11] >> I guess like where do we expect that to

[27:13] stop working and where will we need to

[27:15] start layering on that plus the model

[27:18] weights some sort of continual learning

[27:20] story the model weights as well. Yeah, I

[27:22] mean some of these discussions are a

[27:23] little bit outside my area of of kind of

[27:25] what I've worked on like tangibly. Yeah,

[27:28] >> I think the the take often for

[27:31] performing iteration in quote unquote

[27:32] token space and that is like basically

[27:34] trying to evolve prompts. Yep.

[27:36] >> Try and evolve things like skills, try

[27:38] and evolve things like memories all

[27:39] external to the model just living in

[27:41] context is like it's pretty easy to do.

[27:43] You don't need to retrain. Uh but it's

[27:47] crude right now. So it's like I'm

[27:49] writing custom like skill or I'm writing

[27:52] like custom commands for cloud code that

[27:55] perform reflection over like my session

[27:57] histories.

[27:58] >> Um

[27:59] but the nice thing is it's easily

[28:01] hackable.

[28:02] >> Um whereas updates in weights require

[28:07] some kind of retraining and then there's

[28:09] there's a bunch of ideas here like like

[28:11] Laura was like big for a while. I think

[28:13] it's still obviously you still big. Um,

[28:17] but these are much harder for

[28:18] individuals to like test out, right?

[28:20] Like the ability to do things in token

[28:21] in token space is like super easy to

[28:23] test and hack.

[28:23] >> It's legible to the human, right? It's

[28:25] interpretable.

[28:26] You can edit it if you want to.

[28:29] >> This is actually this is actually a very

[28:30] good point. It it indeed is uh it's it's

[28:33] it's human. It's human interpretable. Um

[28:37] and and and actually, you know, it's

[28:39] funny. I I will occasionally go into my

[28:41] cloud MD and like edit it manually and

[28:43] like drop the update if I don't like the

[28:44] rules that like the agent saved from

[28:46] this reflection loop I'll just edit it

[28:47] modify it whereas if it's in weight it's

[28:49] not editable it's not visible

[28:51] >> so I think those are a lot of reasons

[28:53] why it's actually pretty interesting

[28:55] think about context evolution but

[28:57] external to the model and le's living in

[29:00] >> um you know these living in for example

[29:02] the file system

[29:03] >> y

[29:04] >> um an interesting point though that this

[29:07] all leads to is and I know you've

[29:10] comment on this a little bit this RLM

[29:13] idea recursive language models and I was

[29:15] hoping you talk about that.

[29:15] >> Yeah. Yeah. Yeah. We we should get into

[29:17] this a little bit. So,

[29:19] >> so currently a lot of these context

[29:21] management manipulation techniques

[29:23] >> and we can go all the way back. We could

[29:25] talk about go back to offloading.

[29:27] offloading like some heristic I'm

[29:28] prompting to the agent to say okay

[29:30] offload tool results after like

[29:32] according to this criteria like after

[29:34] they're like this many turns old just

[29:36] save them the file system uh apply

[29:39] compaction following some particular

[29:41] rules and that's like prompted into the

[29:43] agent but only do it at this particular

[29:45] point in time

[29:47] >> um uh sub agents often are like quite

[29:50] brittle like okay spawn sub agents for

[29:52] these types of tasks like um

[29:56] Um and then all this context of

[29:59] evolution is also very like at least for

[30:02] me yes I'm like creating some custom

[30:04] commands for example for cloud code to

[30:07] instruct it how to reflect over my prior

[30:09] sessions and like what to save in these

[30:11] dire entries and when I do a reflection

[30:13] to update my cloud MD I'm prompting very

[30:16] specifically

[30:17] what like how to determine what to save.

[30:20] Yeah. Okay. So anyway, if you look

[30:22] across all these prompt management

[30:23] techniques, it's a lot of hand-tuned

[30:26] right

[30:27] >> prompting right by the user or by like

[30:29] the agent designer

[30:30] >> right

[30:31] >> um to like to govern this context

[30:34] management context process right the RLM

[30:36] thing which is pretty cool from Omar

[30:38] Alex and a few other folks um now at MIT

[30:42] >> is well and actually prime intellect has

[30:44] done a lot of this as well will brown

[30:46] and others and so this is pretty neat

[30:48] >> um you can indeed train models to manage

[30:51] their own context and this and I know

[30:52] this is something you're really

[30:53] interested in.

[30:54] >> Y

[30:54] >> that is a really interesting thread. I

[30:56] actually think

[30:58] >> memory management is a great area for

[31:00] that

[31:01] >> because if you believe in this idea of

[31:03] memory management in token space and

[31:05] like which which I think is not a bad

[31:07] idea. So like

[31:08] >> you're working interacting with the

[31:10] agent over time you're accumulating very

[31:12] large numbers of sessions. Yep. you want

[31:14] some process to remember things from

[31:17] those sessions for the agent to learn

[31:18] for the agent to like retain preferences

[31:21] like all the stuff we're talking about

[31:23] >> um managing that is like quite unwieldy

[31:26] and seems to be something that would be

[31:28] quite good for a model to learn to do

[31:33] >> um and and I so I think

[31:35] >> I think for all the techniques we talked

[31:37] about for like offloading sub and and

[31:40] actually the RLM stuff talked about sub

[31:42] agent spawning as one of the things that

[31:43] they are training the RLMs to do.

[31:45] >> Yes.

[31:45] >> So that's a that's a great area for like

[31:48] this idea of like of learn context

[31:50] management.

[31:51] >> Yep.

[31:52] >> Rules for sub aent spawning. That's a

[31:53] great one.

[31:54] >> Uh rules for context offloading is a

[31:56] great one. But I think a really really

[31:58] good one maybe even more interesting is

[32:00] this context evolution or kind of memory

[32:04] uh management because it's going to be

[32:06] really meaty.

[32:07] >> Y

[32:07] >> there's lots of memories. There is you

[32:10] know many potentially many different

[32:11] prompts or different tasks. there's lots

[32:13] of skills managing all this and and

[32:15] refining them over time based on my

[32:16] experience is going to be a huge thing.

[32:18] >> Yeah. Yeah, I mean it's interesting

[32:19] right like both everybody has this

[32:21] intuition that like I think we want to

[32:23] be able to uh iteratively instruct

[32:26] models or let aentic systems you want to

[32:28] use agents like and also have them

[32:30] iteratively learn from their environment

[32:31] both because like humanist in some sense

[32:33] is a part of their environment right

[32:34] >> um

[32:35] >> and uh you know yet today like the most

[32:40] widely used memory system probably is

[32:42] like chat GPT memory

[32:44] >> that's right

[32:45] >> um and

[32:47] most people don't love it like

[32:50] >> and so like I guess like

[32:52] >> it it's interesting to try to ask the

[32:54] question like

[32:56] >> how hard is this problem?

[32:57] >> Yeah.

[32:58] >> Um is it it certainly can't be easy

[33:01] presumably. So there is but like it

[33:04] intuitively feels like it could or

[33:06] should be

[33:07] >> Yeah.

[33:08] >> Oh yeah. Like okay whenever you're

[33:09] interacting with the world of the

[33:10] environment with the user

[33:12] >> pay attention to the trail logs you know

[33:15] break off stuff that you think should be

[33:16] important. store it somewhere, get it

[33:18] later. Okay. Just like should work. It's

[33:20] like kind of some like intelligence on

[33:22] the log

[33:23] >> processing it plus some search. Great.

[33:25] >> Yeah.

[33:26] >> Um but it doesn't seem to be that easy,

[33:27] I guess. Like do you have an intuition

[33:28] for like why it's not that easy?

[33:30] >> Yeah, this is this so this is actually a

[33:31] really good one. So um you know there's

[33:34] like two sides of it. There is the um

[33:37] there is the like saving of context. So

[33:41] like saving or updating of context. And

[33:43] so that's like kind of the writing side

[33:44] of it.

[33:45] >> Yep.

[33:46] uh what to like you know a classic one

[33:49] in my little explorations here like I'm

[33:52] reflecting over end sessions what

[33:54] actually constitutes something that's

[33:55] worth saving

[33:56] >> kind of tricky very user specific like

[33:59] what what preferences are actually like

[34:02] general

[34:03] >> that I want to say to my global cloud MD

[34:05] and what's like specific to this given

[34:06] session pretty tricky kind of nuance

[34:08] very user specific so that's like

[34:10] problem one

[34:10] >> right you can imagine I'm allergic to

[34:12] shellfish uh well I'm not but like

[34:14] hypothetically I was that should be a

[34:15] long running memory

[34:16] >> that is a long running memory relevant

[34:17] across all sessions.

[34:19] >> I'm going through a uh Greek food phase,

[34:23] you know, like that's maybe I'll get

[34:25] tired of it, you know, like how do you

[34:27] know what is the time window on these

[34:28] things?

[34:29] >> Exactly. Like and this obviously applies

[34:30] to actual real kind of like knowledge

[34:32] work workflows as well, right?

[34:33] >> That's exactly. So you're exactly right.

[34:35] And that's like the the writing side of

[34:37] memories is tricky in that sense. And

[34:38] and when I say memories, you know, it

[34:40] could be skills. It could be literally

[34:42] like preferences and memories. It could

[34:44] be like prompt, you know, new prompts I

[34:46] want to say for something. So like it's

[34:47] all English though.

[34:48] >> It's all English. It's all natural

[34:49] language. So it's like the right phase.

[34:50] And then there's and then there's the

[34:51] read phase or the retrieval phase,

[34:53] >> right?

[34:54] >> So I'll tell you something funny.

[34:56] >> So Simon Willis uh had a good talk at

[34:59] this year's AI engineer. You might have

[35:00] seen it. It was like one of the

[35:01] keynotes. And basically he talked about

[35:03] he gave the example of cloud code or

[35:05] sorry of um of chatbt memories.

[35:08] and he was asking Chachi to create an

[35:11] image of like a penguin for something,

[35:13] you know, he he does a lot of stuff with

[35:15] penguins, right? He loves he loves

[35:17] penguins.

[35:18] >> Um, but this was interesting. So, Chad G

[35:21] injected a sign in the image that said

[35:23] Half Moon Bay.

[35:24] >> He said, "Whoa, wait. Where'd that come

[35:25] from?" He happens to live in Halfoon

[35:27] Bay. It was the case apparently that

[35:30] Chach retrieved a memory related to

[35:31] location, inserted into the image,

[35:33] >> right?

[35:34] >> Just like for whatever reason, right?

[35:35] >> Doesn't know why. It's a case of

[35:37] erroneous memory retrieval that was not

[35:39] relevant to that given task and it was

[35:40] like something he didn't want

[35:41] specifically and it's a good example.

[35:44] Retrieval is also hard. So when to fetch

[35:46] certain memories and why and what

[35:47] context like writing's hard and

[35:48] retrieval is hard. I think those those

[35:50] two things

[35:52] >> make it tricky um to do this and I think

[35:56] that's why it hasn't quite been cracked.

[35:58] Uh that's one of the many reasons why it

[36:00] hasn't been cracked. But but even I

[36:02] think um

[36:04] in the RLM paradigm if you can imagine

[36:07] training models be really really

[36:08] effective at this uh preferences

[36:12] evolving context is always very user

[36:14] specific um it's like my personal like

[36:17] workflow preferences typically for

[36:19] example in the case of memories and

[36:21] that's something that um like there

[36:24] always will need to be some kind of user

[36:26] user supplied instructions which is

[36:27] actually kind of fine you could still

[36:29] have you could still have an LM be

[36:31] extremely effective at memory management

[36:33] but still like fetching from for example

[36:35] a user preferences file that's provided

[36:37] that like gives some additional rules

[36:39] that's totally fine. Yep. So it's not

[36:40] incompatible but I think it's just a

[36:41] note that whereas like sub agent

[36:44] delegation that part of context

[36:46] engineering feels like that could be

[36:48] pretty just kind of like baked into the

[36:49] model and like without much user

[36:51] >> right

[36:52] >> you can have you could you could

[36:53] certainly have user supplied sub agents

[36:55] and that's totally fine but kind of the

[36:58] >> the taste for when to spawn sub agents

[36:59] when not to you can imagine that living

[37:01] in the model but for something like yeah

[37:02] context evolution feels trickier because

[37:04] it's so personal oftentimes

[37:07] >> the the memory management kind of like

[37:10] mechanisms could be very could be

[37:12] learned and very effective, but like

[37:13] there's always going to need to be some

[37:15] very acute user provided instructions is

[37:17] my sense.

[37:18] >> Yeah.

[37:18] >> Which is totally fine.

[37:20] >> Yeah. Maybe the intuition is like

[37:21] >> could you build a classifier for a given

[37:25] thing,

[37:26] >> right?

[37:26] >> Like

[37:27] >> and if you can build a classifier, then

[37:29] you should expect that that will be

[37:31] folded back into the model itself.

[37:33] >> Yeah. Um and then if you can't build a

[37:35] classifier that really ends up being

[37:37] more like

[37:38] >> you know some level of like business

[37:39] logic you need to bring to the model. So

[37:42] like for example

[37:44] >> like you know maybe something like

[37:45] remember allergies. Yes. Like

[37:48] >> that is broad enough you know Sacramento

[37:51] is is the capital of California right

[37:53] the model just learn that.

[37:54] >> Just learn that. Exactly. But for your

[37:56] app about u food ordering right like

[38:00] remembering other more nuanced things

[38:03] like that kind of classifier won't be I

[38:06] think trained directly into the models

[38:07] but like when a task is a good candidate

[38:11] to call a sub agent

[38:12] >> right

[38:13] >> okay this is kind of a research task

[38:14] this is kind of paralyzable

[38:16] >> exactly

[38:16] >> this task has a chance of like using a

[38:17] lot of tools or generating a lot of sort

[38:19] of data exhaust that I would want to

[38:21] keep from my main context sub agent that

[38:24] feels

[38:25] That could you could imagine developing

[38:27] a classifier which is cross domain.

[38:28] >> That's right.

[38:29] >> And therefore like you maybe should

[38:30] assume that well then if you can train a

[38:32] classifier by definition it is RLable

[38:35] and by definition the labs will RL it

[38:37] which means that it will you know show

[38:39] up in like the next generation of models

[38:40] basically.

[38:41] >> Yeah that's a good heristic right like

[38:43] can can you know is this something

[38:44] that's like verifiable such that you

[38:46] could like define a classification task

[38:48] for it and like train a classifier on it

[38:49] then it's well set up for to be absorbed

[38:51] in the model. You're right. uh for

[38:53] something that like um yeah and for

[38:56] things that don't fall into that that

[38:58] bucket indeed are are probably not going

[39:00] to get absorbed into

[39:03] um like this kind of what you might

[39:04] imagine to be what we call the RLM layer

[39:07] this new kind of RLM idea it's like any

[39:08] learned context management so like um

[39:11] >> but look a lot of tech we're talking

[39:12] about I think like offloading this could

[39:14] be this this seems like something that

[39:16] will be absorbed into models um like

[39:17] kind of clear rules for offloading

[39:19] context instead of some like handtune

[39:22] heristic like okay offload tool results

[39:24] after like end turns this is something

[39:26] that like a model can clearly learn to

[39:28] do

[39:28] >> yes all parameters will be learned

[39:30] >> correct u sub aent delegation is a good

[39:33] one um caching is a good one um uh you

[39:37] and and that's kind of already something

[39:38] that you can just like kind of turn on

[39:40] um uh and I think this codex evolution

[39:44] bucket or continual learning bucket will

[39:46] be like will be a really interesting

[39:48] area to think about and a little bit

[39:49] trickier because the rules are often

[39:52] trickier and very human um very user

[39:55] specific I would say.

[39:56] >> Right. Right.

[39:57] >> Um

[39:58] >> right. Yeah.

[39:59] >> But but for example like I know you've

[40:00] been on this quite a bit like um

[40:04] how to best index and store make memory

[40:07] searchable. That's something that like

[40:09] that like an an agent could be could be

[40:11] increasingly very very good at like a

[40:13] memory retrieval. Um and so so some of

[40:16] the mechanics I think can get absorbed

[40:17] into the models. Um, but there's always

[40:19] going to need to be my sense is a lot of

[40:21] kind of user user preferences overlaid

[40:24] on like usage of some general man memory

[40:26] management tools. Maybe that's the way

[40:28] to think about it.

[40:28] >> Yeah.

[40:30] >> Going back to file systems,

[40:32] >> it's been in it's been in the news. I

[40:33] think you've I've not been keeping

[40:34] track, but yeah,

[40:35] >> if I was keeping a tally here, probably

[40:38] approaching 30 times uh in this

[40:39] conversation like

[40:41] >> I guess

[40:42] >> what is the intuition for there's a lot

[40:44] of different ways to store and retrieve

[40:45] data.

[40:46] >> Yes.

[40:47] um a file system is one very specific

[40:50] kind of way doing that. So I guess like

[40:53] >> what is your intuition around like why

[40:54] has that taken off? What is your

[40:56] intuition around like how lindy or

[40:58] durable that that will be?

[41:00] >> Yeah.

[41:00] >> Uh what do you see as some of the

[41:02] downsides or some of the current

[41:03] shortcomings of file systems I guess as

[41:05] well.

[41:05] >> Um yeah

[41:06] >> this is a good one. Okay. So so you know

[41:09] >> you so claude code manis are two of the

[41:12] more popular agents of the past year.

[41:14] Both of the both of them use a file

[41:16] system. Mhm.

[41:16] >> Um if you think about the tasks, so

[41:18] Manis is kind of a general purpose agent

[41:20] for like consumer tasks like do research

[41:22] on a thing, a lot of those types of

[41:25] tasks are doable without a huge amount

[41:27] of context. i.e.

[41:29] >> a file system is an easy and sufficient

[41:31] way to save like results from from like

[41:34] using web search tool just offload them.

[41:36] Y

[41:36] >> so like it's a very nice useful

[41:37] primitive for like a consumer focused

[41:39] agent that's handling like discrete

[41:41] >> like consumer centric tasks like

[41:44] research or slides something like that.

[41:46] Okay, cloud code of course was a coding

[41:48] agent. Coding agents typically work in

[41:50] repos. If there's if you plot

[41:52] distribution of repo sizes, a lot of

[41:54] them are kind of smaller. I and actually

[41:55] I'm just made that up. I have no idea.

[41:57] >> That's probably

[41:58] >> probably kind of roughly true. So, a lot

[41:59] of repos are relatively small and

[42:00] relatively small repos like you can get

[42:02] away with just like globbing graping

[42:04] around and this we could we could

[42:06] debate.

[42:06] >> Um but but but I'm actually going to I'm

[42:09] going to kind of segue into why I think

[42:11] a lot your world is very interesting

[42:13] here. But I think for that reason file

[42:15] system is really nice as a really nice

[42:16] primitive for like kind of for code

[42:19] agents and for like general purpose

[42:20] agents like manis um in the case of code

[42:22] agents because repos can often be

[42:25] smaller and like it very very cloud code

[42:27] is very very effective just with its

[42:28] simple Unix utils um in small repos. Now

[42:32] I saw recently

[42:34] I think Boris actually commented on this

[42:36] literally the last two or three days um

[42:38] larger repos starts to fall apart.

[42:40] >> This is kind of this is kind of the

[42:42] classic. though larger code bases you

[42:45] can't quite just get away as easily with

[42:48] simple like log graph

[42:49] >> search base is larger

[42:50] >> search space is larger

[42:52] >> so um cursor came out with a nice piece

[42:55] talking hey they use semantic search um

[42:57] and they had some nice results on that

[43:00] >> Boris recently mentioned that someone

[43:02] had been experimenting with larger repos

[43:04] and like okay it they did like SQLite

[43:07] indexing of the codebase and like rolled

[43:09] that into a like custom command

[43:11] >> Mhm. for cloud code.

[43:14] >> So look, it's completely compatible with

[43:15] this idea of of of like indexing and and

[43:18] search is of course relevant when the

[43:20] search base grows and like that's

[43:21] relevant for larger repos.

[43:22] >> Y

[43:23] >> and that's still completely compatible

[43:24] with an code agent like cloud code. It

[43:26] just it's just like a search tool. It's

[43:27] totally fine. So one gap that you're

[43:30] elucidating here is that um

[43:34] >> file systems

[43:36] so I think file systems are become the

[43:40] data store dour for a few reasons number

[43:42] one

[43:42] >> right

[43:43] >> because there's a lot of training data

[43:46] about how to do things on file systems

[43:48] correct

[43:48] >> it's also trivially easy to generate a

[43:50] lot more training data

[43:52] >> right um

[43:53] >> yes

[43:54] >> coding agents are able to use the

[43:57] you know use use use command line to fix

[44:00] few commands.

[44:00] >> That's right.

[44:01] >> That also enables a lot of like

[44:02] creativity and like combining of tools

[44:05] together.

[44:06] >> Bash is highly composable,

[44:08] >> you know, head this, pipe this, you

[44:09] know, kind of brings it all together. It

[44:12] is in some ways a multi tool, right?

[44:13] It's not a single tool is a multi-tool

[44:16] there. And there's a whole thread on

[44:17] this bash is all you need. The bash tool

[44:19] is kind of the one tool you need. And

[44:21] yeah, it's it's highly composable, very

[44:22] easy way to do lots of stuff, right?

[44:24] >> And the models are extremely good at

[44:25] using it. You're exactly right.

[44:26] >> Yeah. And then there's okay so what are

[44:28] the limitations at least as we think

[44:30] they may exist today this is all I

[44:31] understand hypothetical so one is that

[44:33] like

[44:33] >> maybe if like expressive and powerful

[44:36] search is important for

[44:38] >> either pass rate andor speed and cost

[44:40] were all the above then like you know

[44:42] you can imagine accessory systems of

[44:45] some kind that make that better

[44:46] >> definitely

[44:49] a thing that I think about um uh what

[44:51] what are other not to put on the map

[44:53] like what are other sort of like cons

[44:56] here's here's one I'll bring up as like

[44:57] not a concern but an open question.

[44:59] Yeah.

[44:59] >> Is like

[45:00] >> multiplayer mode.

[45:02] >> Uhhuh.

[45:03] >> How are many agents and or many humans

[45:06] as many agents going to collaborate on

[45:08] like the same pool of data

[45:09] >> presumably getting you know pushing and

[45:11] pulling from GitHub

[45:14] >> branches I don't know maybe gonna work

[45:16] but like it's not truly collaborative in

[45:18] that in that sense not real time.

[45:20] >> File systems have this like last right

[45:22] wins you know uh sort of uh semantics

[45:25] right. So if you sort of you and I are

[45:28] editing the same file, we both have it

[45:29] open. I save then you save, you would

[45:32] never know that I did anything, right?

[45:34] Cuz like you did it. Um you stop you

[45:36] stopped me. So I guess like that's one

[45:37] thing I've been thinking about is like a

[45:38] limitation of file systems. Obviously if

[45:40] you're like

[45:41] >> single agent mode, you don't care, but

[45:43] like you know as we move towards this

[45:44] like theoretical future of like

[45:46] thousands of agents collaborating

[45:47] together to solve a problem at the same

[45:48] time like Yeah.

[45:49] >> So this is a really good one. You know,

[45:51] it's funny. I was thinking about like

[45:53] big topics for the following year. I

[45:55] think like continue learning in like

[45:56] token space or generally continue

[45:58] learning you know in in weights is is

[46:00] one big bucket. Another big bucket I

[46:02] think is multi- aent collaboration.

[46:05] >> It's exactly what you said. So like the

[46:06] the patterns for multi we've seen to

[46:08] date have been a little bit more like

[46:10] map produce bunch of parallel agents

[46:11] just doing independent things and you

[46:13] pull it all together at the end there.

[46:14] That's one pattern. Or this like Ralph

[46:16] Williams serial agent thing

[46:18] >> like one agent takes a task, does the

[46:20] loop, y

[46:21] >> saves it all, commits it all, second

[46:23] agent looks at the git history and does

[46:24] the next thing. Okay, so you have

[46:26] serial, you have paralyze, but like what

[46:27] about concurrency?

[46:29] >> So like Steve Yaggi has this like gas

[46:30] town thing. Have you seen it? It's kind

[46:32] of cool.

[46:32] >> I was only able to make it through about

[46:33] half of it before. My eyes are rolling

[46:36] back in my head. No offense,

[46:36] >> Steve. It's a long It's a long piece and

[46:39] and I actually haven't

[46:40] >> It's a whole It's a whole world view.

[46:41] >> It's a whole world view. It's all but

[46:43] you know it centrally it's about

[46:44] managing like you know n cloud codes as

[46:47] an example agent like doing stuff

[46:49] concurrently and so

[46:51] >> um I think this is a really big area uh

[46:54] I think it's multi- aent communication

[46:57] for concurrent task is like indeed not

[46:59] stalled I think cognition had a good

[47:01] piece on this where they talked about

[47:02] like you know individual sub agents are

[47:05] making implicit decisions they can

[47:07] easily conflict how do you resolve

[47:08] conflicts then you get into like well

[47:10] okay git is one way to do that's what we

[47:11] use as humans. It can get very messy

[47:13] though if you have 30 cloud codes

[47:15] working simultaneously on the same set

[47:16] of files

[47:17] >> like there's a lot of opportunities for

[47:19] conflicting decisions.

[47:21] >> There is then maybe I mean I'm sure it

[47:23] is indeed doable. Um there could of

[47:25] course be mechanisms where you use git

[47:27] and you do like merge conflict

[47:29] resolution to adjudicate all these

[47:31] things but it's complicated and so I

[47:33] think that's a really big area.

[47:36] My guess could be file systems plus like

[47:38] git is is used by humans agents may

[47:41] indeed use that same mechanism. Uh that

[47:43] that that is one way it could be done.

[47:45] Um so so file system could still play

[47:48] reasonably well in this world and like

[47:49] look if you're working with a common set

[47:51] of files that that's totally fine. They

[47:53] can live within this file system and

[47:54] then agents can kind of be

[47:56] simultaneously operating on them in some

[47:58] way. I think how that's all done is like

[48:00] a really big area for 2026.

[48:02] >> Yeah. Um

[48:04] but I I think that um going back a

[48:07] little bit I I think what we're seeing

[48:09] is though in domains where you have

[48:11] large search spaces

[48:14] >> know you know like enterprise knowledge

[48:16] databases or like large code bases like

[48:19] look like we are not just using a bunch

[48:22] of files in the file system necessarily

[48:23] that's where like specialized search

[48:24] tools are still very important and

[48:25] relevant.

[48:26] >> Yep. Um, and it's interesting I I

[48:28] thought that that point about yeah just

[48:29] like you can always load them as as like

[48:31] a command which would like you know or

[48:33] you can you can you can add it many

[48:35] different ways. You can add it as a

[48:36] tool. You could add to the tool calling

[48:37] layer we talked about. You could add it

[48:38] as like a CLI that can be hit. It's

[48:40] fine. It's totally fine. totally

[48:42] compatible with existing code agents

[48:43] that that um yeah like like a cloud code

[48:47] or any of those that that use a file

[48:48] system as a primitive. They can still

[48:50] use more advanced kind of search tools

[48:52] that have use indexes that like live for

[48:54] example on the file system somewhere but

[48:56] are not just using the file system

[48:57] natively

[48:59] >> as a mechanism for uh for storage.

[49:01] >> Yep. Yep.

[49:02] >> Yeah.

[49:02] >> I think like I've continually attempting

[49:04] to apply like the idea of a memory

[49:07] hierarchy and you know kind of like a

[49:09] normal classic computer. um like to the

[49:13] language model regime and my most like

[49:16] recent articulation of this is that

[49:19] there's just sort of these like layers

[49:20] of context.

[49:21] >> Yeah.

[49:21] >> And the goal is to materialize a view

[49:23] across those layers of context in a just

[49:25] in time fashion

[49:26] >> that enables the agent to do you know

[49:28] the very best next action.

[49:29] >> Yeah. Right.

[49:30] >> And so there's like session context what

[49:32] is going on during that active agent

[49:34] session.

[49:35] >> That's right.

[49:35] >> There's like agent context which is

[49:37] multi session. So I think like you know

[49:39] skills for example is a good example of

[49:41] this.

[49:41] >> That's like the the agents historical

[49:43] sessions skills memories you're saying.

[49:46] >> Yeah. Maybe it's it's it's agent friends

[49:48] also you know what can I learn from my

[49:49] agent friend. Yeah.

[49:52] >> Um you know sort of slightly types.

[49:54] There's then like organizational context

[49:56] >> which is like okay maybe for the agents

[49:57] to do the best job they do need to know

[49:59] like what's going on inside of uh Slack

[50:02] or you know other data stores right.

[50:05] Yes. um email calendars,

[50:07] >> right?

[50:08] >> Um there's

[50:09] >> way too many context graph x.com diet

[50:14] now.

[50:14] >> I saw you commented on that. Like

[50:16] >> I I am going to continue to

[50:17] >> a moratorium on them.

[50:18] >> Beat the drum. That's correct.

[50:20] >> There's too many.

[50:20] >> I just it's it's just a bit um

[50:22] >> Well, I saw that one early I think from

[50:25] J

[50:26] >> Jag Gupta. Yeah.

[50:27] >> Yes. And that Okay, that was like

[50:29] >> that was Listen, like it's good to see

[50:30] the idea. Good to see the idea.

[50:31] >> But now like the remix clearly the AI

[50:34] slop remixes are hitting the remixes are

[50:36] hitting.

[50:37] >> Please stop. Um

[50:38] >> anyways um so that's the third layer

[50:40] organizational context session agent

[50:43] organization. And then lastly like

[50:45] global context like web search would be

[50:47] a good example of this like what is

[50:48] other information outside of the walls

[50:49] of my organization that might be

[50:51] relevant to accomplishing what I'm

[50:52] trying to do right now.

[50:53] >> Right.

[50:54] >> Um so that so that okay that's

[50:56] interesting. So you can kind of you you

[50:58] can there's two different ways to look

[50:59] at there's kind of um there is the

[51:02] action space of the agent. So the agent

[51:03] can use it can use tools it can use you

[51:07] know util bash utilities on its computer

[51:09] it can use um it can use code to do

[51:11] stuff and then there is

[51:13] >> the types of context it needs to access.

[51:15] So that is like its own session history.

[51:19] >> Uh it is like you were saying like its

[51:21] past sessions uh which indeed maybe live

[51:23] on the file system. Session history

[51:25] might also live in the file system. Uh

[51:27] it is other agents doing things at this

[51:29] time. Maybe that lives I don't know

[51:30] where that exactly that lives.

[51:31] >> Yeah.

[51:32] >> Um skills live in the file system. Then

[51:34] you're saying there's organizational

[51:36] context and that lives like kind of more

[51:38] in like knowledge bases and other things

[51:41] which are probably accessed via the it

[51:43] could be accessed as a tool calling

[51:45] layer could be accessed as like CLIs if

[51:47] you have like a CLI for like whatever

[51:48] database. Yep.

[51:49] >> Okay. So that's fine. And then there's

[51:52] global context and that's typically is

[51:53] accessed that could be easily accessed

[51:55] like um through CLIs as like for

[51:57] different search tools for example.

[51:58] >> Yeah. Web search

[51:59] >> web search or whatnot. So okay that

[52:01] makes sense as like the the context

[52:03] categories and then the mechanisms for

[52:05] retrieving it. Again just fall back to

[52:06] our old action space of like there's

[52:08] tools and there's like you know the

[52:09] computer which has CLIs that are

[52:11] available and like you know any other

[52:13] utils you give it that it can just write

[52:15] scripts for. Yeah.

[52:16] >> Does that make sense?

[52:16] >> Yeah.

[52:17] >> Okay.

[52:18] >> Yeah. I mean I will log my bias here

[52:20] which is I think that like

[52:21] >> everybody's asking for file systems but

[52:22] I think everybody wants a database

[52:25] >> uh you want many writers he's like how

[52:27] how do we you know the earliest

[52:29] computing in the 70s ' 60s7s what do

[52:32] they have they had file systems like

[52:33] databases were invented for a reason

[52:35] >> for a reason

[52:36] >> they were invented to solve problems

[52:37] like multiple writers and multiple

[52:39] readers and you know resource contention

[52:42] and scaling and like some level of

[52:44] schemas and like there's a reason these

[52:46] things exist and so like

[52:47] >> I That's like my like my hot take is

[52:50] that the file system is a bit of a fad.

[52:52] >> Um it is a way to give what are the

[52:55] benefits of file systems? Like number

[52:56] one, it's easy to put into the training

[52:57] data and so that means that like agents

[52:59] become good at it.

[53:00] >> Um I I think that like databases will be

[53:03] um

[53:04] >> yes

[53:04] >> exposed as file systems and sort of

[53:06] obate the need for that. Plus I think

[53:07] also agents just over time will just get

[53:09] better at using tools that they're given

[53:10] and like they won't be as reliant on

[53:12] like kind of what was represented in the

[53:13] training data sort of directly or

[53:14] specifically. They'll get more like

[53:15] metacognition skills basically. Um, and

[53:18] then number two,

[53:21] uh, yeah, the file system stuff.

[53:23] >> Yeah.

[53:23] >> No, I'm liking the f number two now. Uh,

[53:25] yeah, I just think it's like a bit of a

[53:27] It's a good meme. I like it. Um, I just

[53:29] think it's like, is it durable? Is it

[53:31] linky? Are we going to be using literal

[53:33] file systems 10 years from now?

[53:35] >> Yeah. Yeah. Yeah.

[53:35] >> Like I I kind of doubt it.

[53:37] >> Uh, yeah. So, there's there's maybe a

[53:39] bit of a nuance here that that's

[53:40] interesting.

[53:42] So there is file system as a primitive

[53:45] that the agent uses to get stuff done.

[53:48] >> Yeah.

[53:49] >> Which means a file system is just like a

[53:50] place where agent storing its skills.

[53:52] It's storing like um it's where it can

[53:55] offload stuff that it's doing over the

[53:56] course of the session,

[53:57] >> right?

[53:58] um versus file system as the place where

[54:01] the context that like um that much of

[54:07] the novel context that the agents will

[54:09] need like that category you laid out

[54:12] will live and my sense is files are nice

[54:14] as an agent primitive like for

[54:16] offloading just take that example

[54:18] >> sure

[54:18] >> like an agent is doing stuff and it just

[54:20] give it a file system so it can just

[54:22] like save stuff there that's totally

[54:23] fine

[54:23] >> y

[54:24] >> versus um versus do I need a file system

[54:28] to like dump literally

[54:31] all the context the agent will need to

[54:33] perform tasks into the file system so it

[54:34] can just read those files that might not

[54:37] be lindy because that is like maybe

[54:39] overfitting to the coding use case

[54:41] >> where agents are operating in repos that

[54:43] happen to have all the context agent

[54:44] needs to do stuff in the file system i.e

[54:48] So it's like mixing up two ideas. One

[54:50] idea is like the file system as

[54:51] primitive which is kind of a nice thing

[54:53] for agent to have

[54:54] >> file system can offload stuff. It can

[54:56] like save its skills. That's totally

[54:57] fine. That's cool.

[54:58] >> Right. Right.

[54:59] >> Versus like

[55:01] like the stuff you want the agent to use

[55:03] to get stuff done. That's like that can

[55:05] live in like um you know that that can

[55:08] live like behind APIs. It could be

[55:10] knowledge. It could be like you know

[55:12] enterprise knowledge bases. It could be

[55:13] like you know um it could be using like

[55:15] search tools that stuff does not need to

[55:17] live in the file system.

[55:18] >> Y

[55:18] >> and the and the one interesting

[55:20] crossover here is I think memories which

[55:24] is you know something that the agent

[55:26] it's like specific to the agent it's

[55:27] like part of the agent's kind of like

[55:29] you know internals so to speak. Mhm.

[55:31] >> That's something that like I think there

[55:33] is maybe a bias like just save it all

[55:34] the file system and I think that's a

[55:36] place where like oh actually like just

[55:38] using retrieval

[55:39] >> for that in particular might be indeed

[55:41] quite useful because it's going to be a

[55:42] large search space.

[55:43] >> Sure.

[55:44] >> Um so that if that makes sense. I'm I'm

[55:46] literally just thinking about on the

[55:48] fly, but it's like separating out the

[55:49] file system as just like another

[55:51] primitive for the agent that like helps

[55:52] it get tasks done versus literally like

[55:55] I need to save all my context of the

[55:56] file system the act so the agent can use

[55:58] this GP tool or glob tool to read it.

[56:00] Like that's like kind of a wrong

[56:02] overfitting to the coding use case. You

[56:04] know what I mean?

[56:04] >> Yeah, it could be. Yeah, I think we

[56:05] should register this bet. There's no

[56:07] clear sides here. That doesn't matter.

[56:09] We should register this claim or thesis

[56:10] and revisit it in maybe two years. I

[56:13] we're like clearly not at like peak file

[56:15] system. So like you know I think it will

[56:18] become much larger and smaller.

[56:19] >> Well yeah and and just to just to wrap

[56:21] that up I do think there's kind of this

[56:23] point like listen these agents are using

[56:24] dual use tools. They're using the tools

[56:26] that we use and like we use file systems

[56:28] so why shouldn't agents and so like to

[56:30] the extent that we use file systems

[56:31] agents may use file systems but like you

[56:33] know listen I use web search and that

[56:34] does not live in my personal file

[56:36] system. Yeah.

[56:36] >> So maybe there's just some like you know

[56:38] listen agents kind of converge on using

[56:40] tools in the same way we do.

[56:41] >> Yeah that is interesting. And like where

[56:43] do we use file systems and where where

[56:45] do we not agents will probably reflect

[56:47] that you would think

[56:48] >> right?

[56:49] >> Yeah. There was I guess a move where

[56:50] like all document authoring was on local

[56:52] file systems. Yeah.

[56:53] >> Sort of ifacto you're saving these like

[56:55] you know Microsoft Word files like to

[56:56] your local file system

[56:57] >> and then like okay well we actually want

[56:59] collaboration. it really nice to have

[57:00] real time collaboration. So like move to

[57:02] the cloud, you know, and so like

[57:04] >> um I still keep my like to-do list as

[57:06] like a sublime window on my desktop

[57:08] >> because that's not a collaborative

[57:10] document necessarily. Almost everything

[57:12] else I do in a team context ends up

[57:13] finding its way into like some sort of

[57:15] >> you know you know Google or notion

[57:17] system. So that's interesting. You know

[57:19] another interesting thing along these

[57:20] lines it's tangentially related is is

[57:22] you know listen if we are going to say a

[57:24] sandbox is an important agent primitive

[57:26] and we could debate that but like it's

[57:27] it's both you know like a runtime it's

[57:29] like a shell as well as like a file

[57:31] system like sandboxing becomes a very

[57:34] important like dependency for agents and

[57:35] we're already seeing that right like um

[57:37] you know obviously there's a lot of

[57:39] companies that are doing this but like

[57:40] that becomes kind of a thing and like oh

[57:42] if I'm an enterprise I want to like you

[57:44] know deploy agents I need to think about

[57:45] sandboxing now

[57:46] >> I think sandbox is like a full fat VM um

[57:48] in my mind is still a question.

[57:50] >> Um that's the current method today that

[57:52] everybody sort of taking or you know

[57:54] >> either it's firecracker maybe you're

[57:55] using V isolates but like you know it's

[57:57] still like its own thing.

[57:58] >> Um I I I don't know how I think that's

[58:02] more of a shortterm than like a

[58:04] long-term stable thing

[58:05] >> just cuz like again at certain levels of

[58:07] speedy scale and cost like you kind of

[58:09] don't want to have like um owned

[58:11] resources. You want to have shared

[58:12] resources. Um we moved from you know

[58:14] punch card computing to time sharing

[58:16] right like for computing because like it

[58:18] was useful to uh be able to share

[58:20] resources but um

[58:21] >> yeah um okay what are you let's say like

[58:23] kind of wrap things up here like or

[58:25] attempt to like lots of open fun

[58:27] conversations like

[58:28] >> what thing are you most excited about

[58:30] right now and kind of you know let's say

[58:32] over the horizon of like the next like

[58:33] you know couple months on like kind of

[58:34] this like harness conversation file

[58:36] system conversation

[58:41] >> I think what I'm most interested

[58:42] interested in is

[58:45] and not to rehash it too much but I

[58:47] think the topic of memory is obviously

[58:50] extremely important um and natural

[58:53] learning and assimilation of preferences

[58:55] and personal knowledge that seems to be

[58:57] a major frontier it's usually important

[58:59] I play with it quite a bit

[59:01] >> and without it agents are just really

[59:03] brittle across tasks and I see this all

[59:05] the time so I think that's like one

[59:06] category

[59:08] >> another category is um is uh we talk

[59:12] about mult stage collaboration. That's a

[59:13] good one, but I don't want to belabor

[59:14] that because it's obvious, you know,

[59:16] it's we need to get better at that. And

[59:17] I also don't have that many like views

[59:18] on it, like how to do it like so.

[59:20] Anyway, I'm going to table that one.

[59:22] I'll come back. We talk more about that

[59:23] later.

[59:23] >> Great.

[59:24] >> Um I'll say something kind of like uh

[59:27] you know, a little bit

[59:30] Yeah. Another one that's like kind of

[59:31] well trott in, but like listen using um

[59:35] using general purpose agents for mundane

[59:38] life management. Uh, and like there's a

[59:42] lot of talk about this, like I spent a

[59:43] lot of time trying to build different

[59:44] like personal assistant agents and um,

[59:49] you know, look, we talked about this

[59:51] previously. You have three kids. I have

[59:53] two kids. Life is busy. Like I actually

[59:55] want to run my life and I always have

[59:56] conflicts with my wife about like, you

[59:58] know, tasks and like, you know, life

[1:00:00] life management. I want to run more of

[1:00:02] that personal stuff out of AI systems

[1:00:04] and have AI systems help me to like do

[1:00:07] things. And like that means specifically

[1:00:08] they need to be able to access like

[1:00:10] Amazon and other systems and like track

[1:00:12] things over time. So it brings in

[1:00:13] memory, it brings in learning. Yeah.

[1:00:15] >> But like you know agents for more than

[1:00:17] just like coding. So like I've obviously

[1:00:18] been using coding agents very

[1:00:19] extensively the last year using agents

[1:00:21] quite a bit for research. I use them lot

[1:00:23] for writing. So I do a lot of writing

[1:00:25] with agents. But like more personal

[1:00:27] management. So that's like not super

[1:00:29] novel an observation, but it's actually

[1:00:30] something that like

[1:00:32] >> like I think uh Peter Steinberger has

[1:00:34] this new like Claude CL L A WD that's

[1:00:36] like kind of a like a you know a

[1:00:38] personal management thing and and

[1:00:40] Anthropic just launched Claude co-work.

[1:00:42] >> Yep.

[1:00:42] >> Like listen there's a lot of interest on

[1:00:44] agents for like just general purpose

[1:00:46] life and knowledge management not just

[1:00:48] like coding and that that's going to be

[1:00:49] a big thing. And I'm actually personally

[1:00:51] interested to use that more to like

[1:00:53] manage my manage my life.

[1:00:55] >> Yeah. Um,

[1:00:57] >> yep.

[1:00:57] >> Which is, you know, practical for

[1:00:59] someone like you or I with with kids and

[1:01:01] family and just a lot going on.

[1:01:02] >> Totally. Yeah. Yeah. The age of like

[1:01:04] personal software is like so exciting.

[1:01:07] Like obviously there's both like, you

[1:01:08] know, some level of packaging that can

[1:01:09] be delivered, but also just like

[1:01:11] >> I mean it is so easy now to just build

[1:01:13] cool stuff. Like I built a personal

[1:01:15] raycast replacement. I built like a

[1:01:17] basically personal like

[1:01:19] >> uh coding harness. I built a personal

[1:01:21] like local like agent kind of ID type

[1:01:24] thing. Absolutely.

[1:01:25] >> Like it's just like I mean is a new era

[1:01:28] >> you know I'll throw another out there

[1:01:29] and actually this was a bit inspired

[1:01:31] over break Toby from from Shopify had

[1:01:34] talked about using cloud code to do some

[1:01:36] stuff with like medical data I think

[1:01:37] like MRI or something like that and I

[1:01:39] think I think medical is a great domain.

[1:01:40] So actually I in my past life I did a

[1:01:42] PhD in comp bio computational bio. So I

[1:01:45] have a bit of a background there. I

[1:01:46] think it's really interesting. Yeah. Um

[1:01:49] I do some like personal health stuff

[1:01:50] just like you know like biohacking only

[1:01:52] a little bit but like I think this is a

[1:01:54] great area uh for you know AI systems to

[1:01:58] help and it's something I'm tracking

[1:01:59] very closely.

[1:02:00] >> Totally.

[1:02:00] >> Um so bioscience is another really

[1:02:02] really good one that I'm I'm very

[1:02:03] interested in.

[1:02:04] >> I think that's a excellent place to wrap

[1:02:07] for AI to be really really durable. It

[1:02:09] has to find its way into actually being

[1:02:10] very helpful to the mass populace on.

[1:02:12] And so um I think I think the pieces are

[1:02:15] in place now. We're going to see that

[1:02:16] happen in the next 12 months.

[1:02:17] >> Yeah. Hey, it was a lot of fun,

[1:02:19] >> dude.

[1:02:19] >> Absolutely.

[1:02:20] >> So, great.

[1:02:20] >> Yeah, it was great.

[1:02:22] >> Good to meet you in person, finally.

[1:02:23] >> Likewise.

[1:02:24] >> All right.
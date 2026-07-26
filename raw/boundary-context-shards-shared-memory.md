---
type: youtube
url: "https://www.youtube.com/watch?v=rTn8Vhdt-Jo&t=1155s"
title: "Building a Shared Memory System for AI Coding Agents"
channel: "Boundary"
date_saved: "2026-07-25T20:29:24.727Z"
speakers:
  - Live (host, Boundary)
  - Dex (host, Boundary)
  - Vibe (guest, BAML/Boundary)
---

# Building a Shared Memory System for AI Coding Agents

[0:00] Claude aggressively adds memories. Yes.

[0:02] >> And once it adds memories, it tries to

[0:05] follow that pattern in new code bases.

[0:07] Yes. And that is often not what I want.

[0:09] What I really want is like one version

[0:11] of truth for my whole team.

[0:12] >> This is less about a like we want to

[0:15] store all your memories and manage them

[0:16] for you. And it's a lot more about like

[0:18] we want to give you a pipeline to create

[0:20] the right.

[0:21] >> The hard thing is like how do you source

[0:23] that from all the smart people on your

[0:24] team? How do you distill that knowledge

[0:25] in so that they can all benefit from

[0:27] each other's like things that they know.

[0:29] So today we did a uh deep dive uh live

[0:32] stream coding and working on specs for a

[0:34] feature called context shards which is

[0:36] uh a new thing we're working on in human

[0:37] layer that basically will let us like

[0:39] pull memories out of your agent sessions

[0:41] and then expand expose them to your

[0:43] team. We talked all about the internal

[0:45] supervisor agent that powers the human

[0:46] layer workflows. how we're expanding

[0:48] that to build a supervisor across

[0:50] multiple agent sessions using structured

[0:52] outputs to generate uh potential memory

[0:55] candidates and then building human in

[0:56] the loop workflows to expose those to

[0:58] users. Um all in all it was a really fun

[1:01] time. What else did we get? We started

[1:02] doing the technical design here and

[1:04] walking through the the basics of like

[1:06] how you how do you slice off the first

[1:08] part of this feature and start actually

[1:09] iterating on it. So super fun time. Uh

[1:11] VBOV had a lot of feedback. We actually

[1:12] ended up changing the feature a lot from

[1:14] what I had speced out based on his

[1:16] feedback. So hopefully you learn a lot

[1:17] about how you can use AI to uh prototype

[1:19] products and sit sit in front of your

[1:21] users and get a lot of good feedback.

[1:22] >> All right, this is going to be fun.

[1:24] Let's go do it.

[1:24] >> Let's go. All right, we'll just do this.

[1:26] We're going to see how far we can go. Uh

[1:27] we are live in person in San Francisco

[1:29] at Human Layer HQ coming at you live.

[1:32] This is the AI that works podcast and uh

[1:34] where we teach you how to do cool [ __ ]

[1:36] with AI that actually works. Uh I don't

[1:39] know. You want to intro?

[1:41] >> Yeah, my name is Live. We build a

[1:42] programming language that's agent first

[1:44] and human second. and my name's Dex. Um,

[1:48] and uh, what do we do? Uh, we're

[1:50] building uh, GitHub for design docs.

[1:53] We're building the future of how

[1:54] software engineers collaborate on the

[1:55] production of software.

[1:57] >> It's going to be really sick.

[1:58] >> It's going to be a fun time. Uh, and

[1:59] today we're going to talk about that.

[2:01] Um, we do this series sometimes called

[2:02] No Vibes Allowed where we just hang out

[2:04] and stream and like build [ __ ] uh, code

[2:06] on the stream. Uh, and so we're going to

[2:09] do that and we're I guess we're starting

[2:10] early.

[2:11] >> That's Yeah,

[2:12] >> this is the new solution. This is how we

[2:13] start on time, guys, is we we fly Vibe

[2:16] off to SF every Tuesday to do the

[2:18] podcast.

[2:19] >> Oh, man. Dude, that'd be a long commute.

[2:21] >> Yeah. Um, okay. So, the thing I want to

[2:23] work on today actually is uh I'm working

[2:25] on a feature. Uh, I have it kind of

[2:26] speced out, but I want to kind of just

[2:28] like walk through it and like get your

[2:29] feedback along the way because basically

[2:31] like the challenge we had and I actually

[2:33] like specked this out with uh some some

[2:37] uh with with permission, some uh

[2:39] boundary data, which is basically like

[2:41] what are the things that people on your

[2:43] team are telling the agent over and over

[2:44] again.

[2:45] >> Okay?

[2:45] >> Like explaining that your main branch,

[2:48] you don't have a main branch, Mary is

[2:50] main. And people have to tell that to

[2:52] the agent all the time. Um, and

[2:53] eventually you'll probably in your cod

[2:55] or something, but like the sorts of

[2:56] things that like get said the most and

[2:59] then basically making that accessible to

[3:01] the agent either always on or like

[3:04] >> kind of like a memory system.

[3:05] >> That's kind of like a memory system, but

[3:07] I don't like calling it memory because

[3:09] >> we've only memory.

[3:10] >> We're calling it context shards, but it

[3:12] is it is memory.

[3:13] >> It's the non-memory memory.

[3:15] >> Yes.

[3:15] >> Okay. Um, I I think the So, I'll be

[3:18] honest when I think about memory systems

[3:19] and why they don't work well for me.

[3:21] >> Yeah. is claude aggressively adds

[3:24] memories.

[3:25] >> Yes.

[3:26] >> And once it adds memories, it tries to

[3:28] follow that pattern in new code bases.

[3:30] Yes.

[3:30] >> And that is often not what I want. I'm

[3:33] in a work tree. I'm doing some stuff.

[3:35] Yeah.

[3:36] >> And the presence of a memory is exactly

[3:37] what you're talking about. It's about

[3:38] distribution of how often it's said

[3:41] certifies like whether or not it needs

[3:42] to be ingrained in the system.

[3:44] >> When Yeah. When does that get activated?

[3:46] And is it in a skill or is it in the

[3:48] cloud MD or is it in a like prompt that

[3:51] you paste like slash command that is not

[3:53] model invocable?

[3:55] >> Well, even more so than that, the thing

[3:56] that I find most fascinating is uh is

[3:59] actually like I said the volume based

[4:01] memory system. It's like the thing that

[4:03] adds something to memory is not a single

[4:04] decision my claw that says update my

[4:06] memory file.

[4:07] >> Yeah.

[4:07] >> It's actually analytics over time. Yeah.

[4:10] >> And slowly populate my memory file. So

[4:12] what I get is lag.

[4:13] >> Yeah. I get a lagging indicator for what

[4:15] my memory is, but what I get in return

[4:17] is my memory is never useless. And you

[4:20] know that is a very fast

[4:22] >> Daniel. It's 20% useful memory. Like 20%

[4:25] of the possible memories, but all really

[4:27] useful and applied at the right time is

[4:29] way better than everything you might

[4:32] want to remember applied all the time

[4:33] and even even if it's you know Yeah.

[4:35] Exactly. is

[4:36] >> exact. I'd rather have correct me.

[4:38] >> I like the idea.

[4:38] >> Yeah,

[4:39] >> let's talk about it.

[4:39] >> So, let me pull this up. Um, I'm going

[4:41] to make sure before I share my screen,

[4:43] I'm going to make sure I had the right

[4:44] one. Okay, so

[4:45] >> we got a few people in the chat, by the

[4:47] way. U, so hopefully you guys are going

[4:48] to have fun watching us actually code

[4:50] today as opposed to what we normally do,

[4:52] which is talk about stuff.

[4:55] >> Are you ready to go?

[4:56] >> Uh, I'm about to share. I'm trying to

[4:58] find the

[5:00] >> um when I when I really think about it's

[5:03] fascinating. I you know what's

[5:04] happening? When Claude first added

[5:06] memories, I loved Claude memories, but

[5:10] now I actually hate it more often than

[5:11] not. I actually often tell it in my

[5:13] prompt, stop adding stuff to memories

[5:14] cuz it keeps on adding things to

[5:16] memories that don't matter. So like for

[5:17] example

[5:18] >> Oh, we just full disable it. We

[5:19] literally like when you run cloud and

[5:21] human layer, the memory is just off.

[5:23] >> Yeah. Well,

[5:23] >> cuz it's annoying.

[5:24] >> Here's the thing I run into. It is a

[5:26] real thing that happened which is I was

[5:28] running um I was building this new

[5:30] system for us where we wanted to add a

[5:32] new environment variable that's like

[5:34] does something about like a disc caching

[5:36] system to make the BAML compiler very

[5:37] fast. So I added an environment variable

[5:39] like demo disable c disc or something

[5:44] and it added that but it saved it to

[5:46] memory and now every single feature I

[5:48] add it tries to add freaking environment

[5:50] variables to it to make that like a

[5:52] feature flag for whether a thing is on

[5:54] or off. Everything should be on by

[5:56] default except for this one feature. And

[5:58] for some reason, Claude is now like

[5:59] obsessed with adding environment

[6:01] variables. You have to desop everything

[6:03] and remove all these end bars.

[6:04] >> Yeah. Because because one time he wanted

[6:06] to add an end bar like the user loves

[6:08] ends.

[6:09] >> Exactly. And like what are you doing?

[6:11] >> Um so this is an example like uh that we

[6:14] were looking at like VML sessions

[6:15] basically. It's like okay cool. when

[6:17] you're doing serialization, start from

[6:18] the Rust data and work backwards to

[6:19] build the pack CLI, run it this way

[6:21] before implementing a CL like and so

[6:23] there's instructional things of like how

[6:24] I want you to behave and then there's

[6:27] informationational things that are more

[6:28] like it's it's not steering. I I don't

[6:31] know if this like do you think this

[6:33] distinction is useful or is it all just

[6:35] memory?

[6:36] >> It's all the same thing. Okay.

[6:38] >> Like I don't I don't what's the

[6:39] difference in instruction and

[6:40] information? Help me understand that.

[6:41] information is like context that the

[6:44] model might not have like oh there's a

[6:45] team over there working on this thing.

[6:47] It's not like so you should behave in a

[6:50] certain way. It's just that's versus

[6:52] instruction is like never do this or

[6:54] always do this or make sure you do this

[6:56] or like here's how to do X. You know

[6:57] what I mean?

[6:58] >> Don't see the difference.

[6:59] >> Yeah. Okay.

[6:59] >> As a user, I don't see the difference at

[7:01] all and I don't want to think about the

[7:02] difference.

[7:02] >> Okay, that's great.

[7:03] >> The the other thing that I will say is

[7:06] um

[7:07] >> firstly everything you showed there is

[7:08] correct.

[7:09] >> So that's awesome.

[7:10] >> Yeah. Um the other thing that I will say

[7:13] is

[7:15] so code rabbit has a very similar

[7:16] feature.

[7:17] >> Yeah.

[7:18] >> And the thing that I always struggle

[7:19] with with these features is they keep on

[7:21] add it's a purely additive set. So the

[7:24] first 10 look good but after about two

[7:26] months of using it. What I've run into

[7:30] is at the end of two months I'm like all

[7:33] you have is you've just added

[7:34] everything.

[7:36] It's just it's just an ever growing. I

[7:38] have like 300 things I have to look

[7:40] through to be like are they all correct

[7:41] or not? Eventually I start looking and

[7:42] they've all they've all effectively

[7:44] converged into being the same as claw

[7:47] memories.

[7:47] >> Yeah.

[7:48] >> So how do we fight that problem? Do you

[7:49] guys have a solution for that?

[7:50] >> Yeah. So I mean the the idea, right? So

[7:53] um the the thing that we're looking at

[7:55] here is um sorry that's

[7:59] >> your your mock UIs are really nice by

[8:01] the way.

[8:01] >> Yeah, I told it to read our styles. Um,

[8:05] so the the idea is like these mocks

[8:07] basically have like you can opt in, you

[8:09] can like always on, you can opt in at

[8:11] the task.

[8:12] >> Oh, that doesn't work.

[8:13] >> Uh, so so so

[8:16] for the first slice of this, it'll be

[8:18] like you can either have them always on,

[8:19] but you have to triage them. You have to

[8:21] decide if they're good or not.

[8:22] Otherwise, it's like useless. And then

[8:24] eventually you can create a PR and then

[8:26] it's always available in your repo.

[8:27] Basically, it's like so you we basically

[8:29] look at your sessions and pull out

[8:31] things that you say all the time. You

[8:33] can share them with your team at which

[8:35] point then other people can turn them on

[8:36] and off or turn them always on. And then

[8:38] when you really want to bake it, then

[8:40] you create a PR. But it's like this like

[8:41] staged adoption where you can like pilot

[8:43] and play test this stuff as you're I

[8:46] mean there's a lot of work and it's a

[8:47] lot of decision making and it's like

[8:49] really I think it only appeals to people

[8:50] who like really know what the hell

[8:52] they're like are super AI power users

[8:53] and know exactly what they want in their

[8:55] context window. But this is like kind of

[8:56] how we're thinking about it.

[8:58] >> Okay. So, I like this concept and like

[9:00] for everyone watching like when I think

[9:02] about um I think probably the most

[9:04] useful thing here that people should be

[9:05] thinking about is

[9:06] >> when you're designing a feature like

[9:08] this, you'll notice that Dexter has

[9:10] actually done a very very very big

[9:13] design on top of every single user

[9:16] interaction on this.

[9:17] >> Yeah.

[9:17] >> And that's what makes it so easy to have

[9:19] this conversation like this. I brought

[9:21] up a point. He's already pre-thought

[9:23] that point. He has a he has a solution

[9:24] now. So we can talk about if it's good

[9:25] or not.

[9:26] >> Yeah. And you can just dismiss this. And

[9:27] my thought is like when you dismiss it,

[9:29] it goes away for about 30 days and then

[9:31] basic like it won't show up again for 30

[9:33] days. And so we have like a thing that

[9:35] extracts them. This is here's things the

[9:36] user has dismissed. But if you're still

[9:38] saying this to the model all the time,

[9:40] it's worth checking in 30 days later of

[9:42] like, hey, you're still telling Claude

[9:44] this thing all the time. Are you sure

[9:45] you don't want this in your like memory

[9:47] set?

[9:48] >> It's it's it's more like a Yeah, it's

[9:49] like a fire and forget. Like remind me

[9:51] later if this is still true.

[9:53] >> Yeah, exactly. It's just like snooze

[9:54] this basically. Um okay. So we removed

[9:57] the instruction versus uh versus um

[10:00] >> you know what would help me.

[10:02] >> Yeah.

[10:02] >> Uh if you told me why you added

[10:04] something.

[10:05] >> Yeah. So here so here's what we have it

[10:07] detected from inference found repeated

[10:08] steering create a PR and fresh branch

[10:10] from remote master.

[10:12] >> And so we actually have like a highlight

[10:13] of like here's the thing you keep saying

[10:16] recurring internal research workflow

[10:18] across 12 sessions. Repeated request to

[10:21] strip unnecessary comments. H

[10:23] >> you know what I mean?

[10:24] >> Okay.

[10:25] >> Um and so like always on just get

[10:28] injected in your system prompt and then

[10:30] like I I think there's a world I kind of

[10:32] this is another thing is like I kind of

[10:33] want to touch the problem before we plan

[10:35] too much here because I don't know what

[10:36] I'm going to want until we actually like

[10:38] play with it.

[10:39] >> Um

[10:40] >> you know what I would love here when I

[10:42] think about it from an end user

[10:43] perspective? Yeah.

[10:44] >> I kind of want this just to be running

[10:45] in the background. I just want it to

[10:47] ping me on Slack whenever it adds stuff

[10:48] and removes stuff and I just want to

[10:50] interact with it in Slack.

[10:51] >> Interesting. Okay.

[10:52] >> Because like I don't want to have

[10:53] another messaging layer because this is

[10:55] basically like notifying me.

[10:56] >> It's a new inbox. It's an inbox of stuff

[10:58] that you

[10:58] >> and I have new [ __ ] inbox of stuff

[11:00] and I don't want a new inbox.

[11:02] >> Give me the inbox I already use which is

[11:03] Slack.

[11:04] >> You don't want to wake up in the morning

[11:05] and be like here's all the things that

[11:06] we found that might make your life

[11:07] better today.

[11:08] >> No, just tell me that in Slack cuz I go

[11:11] I wake up and I check Slack every

[11:12] morning. I check Discord every morning.

[11:14] >> And then you want like basically this UI

[11:16] in Slack of like, "Yep, turn this on."

[11:18] Or like, "No, I hate this." Or

[11:20] >> Yeah. And then like by time I prompt

[11:21] stuff on my phone or cuz I prompt on

[11:23] from the codeex now on my phone.

[11:25] >> Yeah.

[11:25] >> Like I just can just like

[11:27] >> just have it in there. Yeah. Oh, create

[11:28] a PR for this one. I want this

[11:29] available.

[11:31] Yeah.

[11:31] >> Like I'm okay with just like yes, no,

[11:33] yes, no, yes, no. Make it really simple

[11:35] for me.

[11:35] >> Yeah. I mean the PR thing, part of why I

[11:37] liked it is like I don't like when I use

[11:39] SAS platforms, I don't like it ever when

[11:41] anything is um

[11:44] >> owned by this. Like if I can control it

[11:46] in my code, it should be a freaking JSON

[11:48] file in my codebase or a markdown file

[11:50] in my codebase.

[11:51] >> Yeah. But like I'm looking at this, it's

[11:53] like you have my shard and shared

[11:54] shards. I would prune this personally

[11:56] even more and simplify and I would say

[11:58] there's only shared shards on my team.

[12:01] >> Yeah.

[12:01] >> And like hold me to So one of the things

[12:03] that we do on our team Yeah.

[12:04] >> is I don't allow people to have like

[12:06] >> people can do whatever they want, but

[12:08] things in the repo must be extremely

[12:09] high standard.

[12:10] >> Yeah. And I think if you're trying to

[12:11] build contact shards, it's so easy for

[12:14] it to turn to slop.

[12:15] >> Yeah.

[12:16] >> So if you want it to be a high standard,

[12:17] just be like, there's only one contact

[12:20] shard for your whole team. Only put

[12:22] things in here that are truly forever

[12:23] and on the whole team.

[12:24] >> But then it's just your then then it's

[12:26] just your cloud MD. I mean, so the idea

[12:27] >> Exactly. So what you're doing is you're

[12:29] helping me make sure that my cloud MD

[12:30] stays up to date much much faster.

[12:32] >> The thing is is that there's parts of

[12:34] this that are only sometimes relevant.

[12:37] Like there's parts of this that are

[12:38] sometimes going to be like, "Oh, I only

[12:40] care about this is super useful advice

[12:42] if we're working on the H, but if we're

[12:44] not touching HR, then I don't want it."

[12:46] >> Sure. But but that's still true for my

[12:48] whole team. It has nothing to do with uh

[12:52] me versus my team.

[12:55] >> I see. So just everything should be

[12:57] automatically shared.

[12:58] >> Yeah. Like the bar for doing this that

[13:01] would be like again I think the the best

[13:03] products are ones that are opinionated.

[13:06] I'm just worried about like so like

[13:07] that's for you. I I I do know there's

[13:10] teams who are a little bit less open

[13:11] about their workflows where someone

[13:13] might want to like review the the things

[13:15] that are based on what they have said to

[13:16] Claude maybe like somewhat like

[13:19] >> well I would love it to be based off

[13:20] what my whole team is saying to Claude.

[13:22] It's aggate over everything.

[13:23] >> Yeah.

[13:24] >> So it's like yes if five people on my

[13:26] team are doing the same thing probably

[13:27] the six person should also do that.

[13:30] >> Yeah.

[13:30] >> Right.

[13:32] Does that make sense? Like to me the

[13:34] when you when I got really excited about

[13:36] this the thing that got me really

[13:37] excited is you made this concept where

[13:40] you're going to say our claude MD is

[13:41] going to be based off of volume of what

[13:44] things are uh happening over large

[13:46] volumes of system prompts and

[13:48] interaction with the model.

[13:49] >> Yeah.

[13:50] >> And I merely am one person.

[13:52] >> Yeah.

[13:53] >> My team is eight more people.

[13:55] >> And so it's like okay

[13:56] >> I can get that data way faster and that

[13:58] means I can optimize my workflow way

[14:00] faster.

[14:01] >> Yeah. Okay. And Yeah. And then you have

[14:02] the problem like three people get the

[14:04] same thing and they all try to share it

[14:05] and there's three slightly different

[14:07] versions.

[14:07] >> Yeah. So like what I really want is like

[14:09] one version of truth

[14:13] for my whole team and that is like I

[14:15] talked about this in my AI engineer talk

[14:17] like our cloud MD is things that are

[14:19] always true.

[14:20] >> Yeah.

[14:21] >> And that's that's what I want. Like when

[14:23] I this feature that's why I got too

[14:25] excited. I was like okay cool. I I want

[14:27] something for my whole team.

[14:28] >> Okay sense. Um I yeah I still So there's

[14:31] like two dimensions of this. There's

[14:32] like mine versus shared versus committed

[14:34] to the repo and then there's also like

[14:36] always on versus like conditionally

[14:38] activated basically.

[14:39] >> Always on versus Yeah. Yeah. Yeah. Yeah.

[14:41] Conditionally activated versus always

[14:43] on. I agree with

[14:44] >> Okay, cool.

[14:44] >> It's like given what task I'm working

[14:46] on, maybe it's a subset of tasks. That's

[14:48] a simple classifier prompt

[14:50] >> that you can run really really quickly.

[14:53] >> But now you're delaying the lag time of

[14:56] boot up time.

[14:57] >> I don't think so. you are because before

[15:00] you inject something into a into a

[15:02] session something has to decide yeah

[15:04] >> whether what subsets get included where

[15:06] >> yeah so the thought is we just basically

[15:08] do inference over your if you're doing

[15:10] research like we do inference over your

[15:11] research dog we do inference over your

[15:12] >> yeah but now one more slower

[15:15] >> no we do in the background parallel

[15:18] >> um sorry [clears throat] let's say I

[15:19] have like a 100 context charts of my

[15:21] team

[15:22] >> yep

[15:22] >> 20 uh three uh 60% of them are task

[15:26] specific

[15:27] >> and 40% % of them are global.

[15:30] Before I can start my main task, I need

[15:32] to process all 60% and see which of them

[15:35] are going to be relevant to that task.

[15:37] >> Yeah. And you actually probably don't

[15:39] know that when you create the task. Like

[15:40] I don't want you to decide. I want to

[15:42] model this.

[15:42] >> Exact. Yeah, that's what I mean.

[15:43] >> But I mean, it's basically like as

[15:44] you're working, you get like memories

[15:47] activated based on the contents of the

[15:49] conversation.

[15:50] >> Ah,

[15:51] >> either the contents of the conversation

[15:52] or the artifacts you generate or things

[15:54] like that. Yeah.

[15:56] >> Yeah. So it's more it's not like a it's

[15:58] not like you're modifying the system

[15:59] prompt. You're just injecting more

[16:01] context in for me automatically.

[16:02] >> I mean this is what how everything a

[16:03] human layer works, right? There's like

[16:04] the main chat and then there's a

[16:05] supervisor model that understands the

[16:07] workflow and understands best practices

[16:08] and like coaching you through it and so

[16:10] it can select these things out for you

[16:12] as well.

[16:12] >> That's cool.

[16:12] >> I wish we had recorded that.

[16:15] >> What do you mean recorded that?

[16:16] >> Uh so like that's that's basically for

[16:17] me that's like milestone two. Like

[16:19] milestone one is just get this wired

[16:20] ending.

[16:22] >> Yeah, I know.

[16:22] >> Okay. You said yeah. I wish you

[16:24] >> No, but I mean recorded it to type into

[16:25] Claude. But

[16:27] [laughter]

[16:28] >> yeah, that's fine.

[16:29] >> What we really need is a mic everywhere.

[16:31] So everything in the world records

[16:32] everything. Yep.

[16:33] >> But okay, now now that we're talking

[16:34] about the specific feature, let's take a

[16:36] step back and zoom out.

[16:37] >> Yeah,

[16:38] >> let's take a step back and zoom out and

[16:40] like for everyone else that's working on

[16:41] features like this. Yeah,

[16:43] >> this is a this is both a UI problem.

[16:45] This is a system design problem at the

[16:47] same time.

[16:48] >> It's an AI engineering problem.

[16:49] >> Yeah, it's an AI concept engineering

[16:52] rabbit.

[16:52] >> Yeah. And I'm sure many of you have the

[16:54] same problems with your team

[16:57] and I know there's different approaches

[16:58] to this, but I'll tell you the formula

[17:00] that I why I think this is going to work

[17:02] and while we'll make some progress on

[17:03] this and this is very similar to what we

[17:05] do on our team as well, which is the the

[17:09] first person to kind of take on a

[17:11] problem takes on a heavy heavy

[17:12] responsibility to really deep think on

[17:15] this problem. And that's what Dexter did

[17:17] already. He came in with all these

[17:18] mock-ups. He came in with thought design

[17:20] principles. He came with user scenarios.

[17:22] He contextualized it to me specifically

[17:26] and says this is for the BML team and

[17:28] not every example is tuned for the BML

[17:30] team, but some of that I'm like I

[17:32] immediately the first image he showed me

[17:34] like anchored me like with our canary

[17:36] branch for example instead of main

[17:38] >> and and our reason for being canary

[17:40] versus main is because like Amazon 1.0.

[17:42] >> I mean this is the other thing. Yeah. is

[17:43] like if you can show if you can show a c

[17:45] this is like product engineering 101 is

[17:47] like your first goal is like figure out

[17:50] if something is worth building before

[17:51] you go put a lot of time into it and

[17:54] like Marty Kagan talks about this in

[17:55] this like thing called product discovery

[17:57] where there's like four levels of

[17:58] prototype where it's like you have like

[18:01] a wireframe like a whiteboard drawing or

[18:03] like a napkin sketch and then you have

[18:05] like something that is like Figma shaped

[18:07] or HTML mockups which is just like hey

[18:10] here's a thing that here's kind of what

[18:11] it looks like you've heard lots the

[18:12] stories of people who like raised the

[18:14] seed round on Figma mockups or sold a

[18:17] million dollar deal on Figma mockups.

[18:19] >> Now with AI, I don't want to see a damn

[18:21] wireframe. I want to see the HTML

[18:22] >> mockup. Yeah, exactly.

[18:24] >> But historically, the the historical

[18:26] context of like where this comes from is

[18:28] like, hey, if you can sell the product

[18:29] on Figma mockups without building it and

[18:31] then go build it because someone already

[18:33] signed a deal to pay you a million

[18:34] dollars for it, that is way better than

[18:36] spending six months of your time

[18:37] building something end to end really

[18:39] good. That's like the first. There's

[18:40] another one which is like a highfidelity

[18:42] prototype which is like it's fake data

[18:44] but it's interactive. You can like click

[18:46] around and play with it and understand

[18:47] it. And it's like all of these things

[18:49] are things that you should be like

[18:50] riffing out and putting in front of

[18:51] customers. This is how you figure out

[18:53] what people want and what people are

[18:54] willing to pay for quickly. This is lean

[18:57] startup. This is like inspired design.

[19:00] This is all like this is good product

[19:01] engineering.

[19:02] >> Yep. Exactly. So like when we

[19:06] uh one the next step you want to do is

[19:08] once one person has deep thought it then

[19:11] you involve like one to two more people

[19:12] on the team that you uh collaborate with

[19:14] and you actively like engage in a

[19:16] conversation with them but they have to

[19:18] first read the doc. The only thing we're

[19:19] not doing here is I didn't go read all

[19:20] the context that Dex already generated

[19:22] or like at least he didn't produce a

[19:24] document for me to read and that's cuz

[19:25] we're on a live stream. But on our team

[19:28] and I I know on Dex's team, they read

[19:30] the doc first before they have a

[19:31] conversation. And then now you can have

[19:34] a conversation about it. And then that

[19:36] same person goes back and does another

[19:39] update of everything. And once you've

[19:41] aligned on the final user outcomes and

[19:44] the real like framing of the problem,

[19:46] the in basically the probing points in

[19:50] which users are going to poke at the

[19:51] system and like experience it. It's

[19:55] really easy to then trust someone on

[19:57] your team to go and implement

[19:58] everything.

[19:59] >> Yeah.

[19:59] >> But you need a framework to have this

[20:01] conversation with and like once

[20:02] >> and it's like this is going to be 50,000

[20:04] lines of code or 20,000 lines of code.

[20:07] It's worth us but like it's worth us

[20:08] spending 20 minutes to get aligned on

[20:10] like what it is and how it's going to

[20:11] work. It is so much cheap like we just

[20:13] made so many decisions that are going to

[20:16] change the shape of the solution by 20

[20:18] or 30%. And how much harder would it be

[20:21] to change that after I had gone and

[20:23] actually built it. So I'm going to do

[20:24] this thing also that I like to do is

[20:26] like with really big features.

[20:27] Everyone's like, "Oh my god, I'm

[20:28] exhausted. I'm making all the decisions.

[20:29] I don't even know the tech. Like I don't

[20:31] know what challenges I'm going to hit."

[20:32] And this is this idea of like you want

[20:33] to like still speedrun to like touching

[20:36] the frontier. Yeah. Touching the

[20:38] frontier of the problem. And so it's

[20:40] like once you have like the basic shape,

[20:42] I actually just want to get really clear

[20:43] on the high level shape. And then I'm

[20:45] like cool. We're going to take this big

[20:46] PRD that covers everything and then

[20:49] we're going to cut off like what's the

[20:51] first milestone and I'm only going to

[20:52] drill deeper and do technical stuff on

[20:54] that first. You actually have a very

[20:56] different workflow over here than me.

[20:58] >> Yeah. Well, I'm not building [ __ ]

[20:59] garbage collectors, dude.

[21:01] >> No. No, not not in that sense. Just like

[21:03] the like but you basically so what you

[21:05] do is you do super broad and then you

[21:07] start like verticalizing.

[21:08] >> It depends how big it is, right? Like

[21:09] for most features I will do the PRD and

[21:12] then I will do the technical design and

[21:13] then I will go do the slices then. But

[21:15] for something that is this big where I'm

[21:17] just like I know that I would get value

[21:19] out of a smaller version of it. If you

[21:22] if you can sometimes it's hard to

[21:24] identify that in the product design

[21:25] phase and sometimes you need to actually

[21:27] get into the tech details to realize

[21:28] like okay we can plum this endpoint end

[21:30] to end and test it with curl before we

[21:32] do anything else

[21:33] >> and so like the the yeah exactly oh my

[21:35] god high effort is really cooking right

[21:37] now [laughter]

[21:40] but yeah so

[21:40] >> if you're not are you're a soul guy now

[21:42] >> uh I like soul for a lot of stuff I mean

[21:44] I we have we have fable as well I I

[21:46] haven't like fable's really good for

[21:48] certain things my my biggest take on

[21:50] fable is

[21:51] Soul solved a lot of the problems that I

[21:54] think a lot of people had with GPT

[21:56] models, which is like they're very

[21:57] robotic and very like I mean it's still

[21:59] very wordy and it's still kind of like

[22:01] info dumps on you way more information

[22:02] than you want to hear.

[22:04] >> Uh have you seen Dylan Mroyy's bro

[22:06] skill?

[22:06] >> Oh yeah.

[22:07] >> Bro just like talk to me like a [ __ ]

[22:09] human being. [laughter]

[22:11] >> Um

[22:12] >> no targets.

[22:13] >> Yeah. Um so uh yeah the uh but yeah

[22:17] basically like it's much better than all

[22:18] the other models were. It knows how to

[22:20] actually talk kind of like a person. Um,

[22:24] services.

[22:24] >> There we go.

[22:25] >> This is a little tighter. Okay. So, we

[22:26] have here's the user view, which is like

[22:28] you just turn them on. All you could do

[22:30] is turn them on. All you can do is see

[22:31] the shards for your team and turn them

[22:33] on.

[22:34] >> And then let's see,

[22:37] generated contact shards. Um,

[22:41] yeah, basically this is our admin view.

[22:43] Basically, we want to test this feature.

[22:44] So, I'm going to build a view in the

[22:45] admin where we can kind of review them

[22:46] and make sure they're good before we

[22:47] actually like send them and make them

[22:49] visible to your

[22:49] >> Can you just make it Slack?

[22:51] >> What? Well, so this is for me.

[22:53] >> This is for me as the human layer

[22:54] builder. This is like what I think you

[22:56] should how I think you should build

[22:57] experimental AI features is don't like

[22:59] spend months building evals and getting

[23:00] it perfect. Like,

[23:01] >> yeah, you really

[23:02] >> view all the generations and then be

[23:04] like, "Okay, that one's good. That one's

[23:05] good. That one's good. I'm going to go

[23:06] change the prompt cuz this one sucks."

[23:08] and like basically build up your eval

[23:09] set before you just put all the fire

[23:11] hose in front of customers and like hope

[23:13] it doesn't suck.

[23:14] >> Vibe based evals are 100% the way to go,

[23:16] man.

[23:19] >> Great.

[23:20] Uh yeah, skipping dismiss is fine. Um

[23:24] yeah, and then you get your eval cage.

[23:26] You're like, "Okay, this was bad. Let me

[23:27] make a test case." And then you can give

[23:28] it to them all and just be like, "Cool,

[23:30] go change the prompt until this one

[23:31] passes and all the other ones still

[23:32] pass."

[23:33] >> That's cool. I would I I would also be

[23:35] really happy if you just ran this as a

[23:37] batch like once a day, twice a day,

[23:40] whenever you wanted like

[23:43] >> uh Yeah, exactly. No, I like we started

[23:45] just doing it like nightly.

[23:48] >> Oh, sorry. I should really tell it.

[23:51] Use only milestone one.

[24:00] >> Thank you for adding queuing, by the

[24:01] way.

[24:02] >> Oh, the queueing is fantastic. Yeah,

[24:04] >> status over.

[24:11] >> How big is mouse on one? Do you even

[24:12] know?

[24:13] >> Uh, we just looked at it. It's the thing

[24:14] lead.

[24:15] >> Oh, that thing. Okay. Is that It's not

[24:17] is it the UI and the back end?

[24:21] >> Uh, yes, the UI is threading the whole

[24:23] thing through end to end. So random

[24:25] design of basically uh running something

[24:27] nightly to detect them, showing them in

[24:29] my internal admin panel, allowing me to

[24:32] make them visible to your org and

[24:33] allowing anybody in your org to turn it

[24:35] on for all contexts and that's like

[24:37] that's like the very first bit of

[24:38] function and then everything grows out

[24:39] from there.

[24:40] >> Cool.

[24:41] >> Um okay, while this thing is running,

[24:42] yeah, um

[24:44] >> I'm curious about people that are on the

[24:46] stream. Do you guys feel like you

[24:49] uh that you do similar kind of workflows

[24:51] in your team? Does this work or do you

[24:54] guys find that you often just let it rip

[24:57] and it's very solo uh like one player

[24:59] mode?

[25:01] I'll let that happen. What should we be

[25:04] reading while we wait?

[25:05] >> Uh we can read this PRD that it made for

[25:07] slice. So nightly run generates

[25:10] candidates. Hum admin can find and

[25:11] release candidates. Release shard

[25:12] appears for organizations at the top

[25:14] level with contact shards page. User can

[25:16] turn always on on or off themselves.

[25:19] Demon includes the shard when that user

[25:20] launches or continues the session. The

[25:22] running agent receives a shard as part

[25:23] of this context.

[25:24] >> That's pretty good. Um, one canonical

[25:27] team library with personal enablement.

[25:29] Yeah, so you have one library for your

[25:30] team and then users can turn them on and

[25:32] off for themselves.

[25:33] >> Uh, Emman's comment, we'll be happy to

[25:35] see a graph of that workflow.

[25:37] >> U, yes, that is so we're doing the

[25:38] technical design doc now. Um, and so

[25:42] yeah.

[25:44] Oh. Uh,

[25:47] schedule lambda with in process fan out.

[25:49] Um,

[25:51] actually Kyle's going to tell me to use

[25:53] uh ingest.

[25:53] >> Okay. Can you

[25:54] >> use ingest?

[25:56] Uh, let's just make a uh a new uh web

[26:01] service that runs as part of the turbo

[26:03] stack and we'll deploy it in Docker. But

[26:05] don't worry about deployment right now.

[26:06] We're just going to get it running

[26:07] locally.

[26:08] Leave deployment out of scope.

[26:12] >> Yeah. Uh, by the way,

[26:13] >> I can just run on a crown.

[26:16] >> If you're not using uh voice um to dry

[26:19] your agents, please start. Please,

[26:21] please start.

[26:25] You get way more detail in there than

[26:27] you can while you type. Uh, and you'll

[26:30] just dump more. Most people are not as

[26:32] good typers as they are speakers.

[26:35] Okay, while this is running, uh, I'll

[26:37] show you guys something kind of

[26:38] interesting.

[26:50] Okay. Um, yes, Whisper Flow is great.

[26:53] Uh, there's a lot of options out there.

[26:54] Just use any of them. Whisper flows. Uh,

[26:56] fantastic.

[26:57] >> Super Whisperer. Kyla voice.

[26:59] >> Super. We got a Super Whisper fan right

[27:01] over here.

[27:01] >> I'm using Whisper Flow right now, dude.

[27:02] >> Oh, you are?

[27:03] >> I mean, I pay for both of them, so

[27:05] >> Okay. Uh, how do you define what's good

[27:07] and what's not for the workflow? um uh

[27:11] for the workflow for the team. Okay. So,

[27:13] I have an idea while we do this. Why

[27:15] don't we whiteboard?

[27:16] >> You're whiteboard agent side. Yeah. Send

[27:18] me the thing.

[27:19] >> Uh

[27:20] >> I think it's going to be interesting for

[27:21] everyone now listening. Uh uh for like

[27:23] how we actually go to do this. Send me a

[27:24] link. Let's whiteboard or I can

[27:26] whiteboard on your computer, I guess.

[27:27] >> I mean, we can have Claude whiteboard

[27:28] for us is part of what I was going to

[27:30] show.

[27:30] >> Oh, yeah. Have Claude whiteboard it.

[27:33] >> Let's start with actually a whiteboard.

[27:34] So, let's let's start with like mermaid

[27:36] diagrams of

[27:37] >> I want this background on a on a fork. I

[27:39] don't want to do this. I want the main

[27:40] thread to be running.

[27:42] >> Well, it's going to ask questions one at

[27:43] a time. So,

[27:44] >> okay. While we work out those questions

[27:46] while the main while the background

[27:47] thread I'll whiteboard I'll whiteboard

[27:49] while you answer questions.

[27:50] >> Send me the link.

[27:51] >> Okay. While you answer some questions,

[27:52] I'm going to screen share this stuff and

[27:54] see what people think.

[27:55] >> Cool.

[27:56] >> Okay. Uh you have the chat on one of the

[27:58] windows.

[27:59] >> I'm trying to find it. There we are.

[28:00] There we go. Why did this

[28:02] >> um uh the /b bros skill I'll we'll pull

[28:04] that up in a second. Dylan has it. It's

[28:06] very easy. Um okay. So what we have over

[28:10] here is a pretty simple system uh where

[28:12] our goal is the following. Uh

[28:16] let me get the lines right. Nope. Nope.

[28:18] Nope. Nope. Nope.

[28:20] >> And why are your colors always weird,

[28:22] dude?

[28:22] >> Dude, I don't know. Uh I I'm always

[28:24] doing some bad scholar draw. Okay, so

[28:27] when we have a system, what do we have?

[28:28] Our main system is going to be we have a

[28:30] agent move and this is like it's not the

[28:33] human layer main agent. We also have

[28:36] like a supervisor agent over here.

[28:42] Um and the way the supervisor agent

[28:44] works in human let me know if this is

[28:45] correct is the user actually interacts

[28:47] with the main agent or the supervisor

[28:49] agent.

[28:50] >> So you're interacting with the main

[28:51] agent. The supervisor agent is doing is

[28:53] just doing inference on parts of the

[28:55] conversation. So, it's either getting

[28:57] the final assistant message for certain

[28:59] types of tasks. It's getting all user

[29:01] and assistant messages for other types

[29:03] of tasks. Um, but it's basically it's

[29:05] not really an agent. It's just a bunch

[29:07] of little inference calls that we do

[29:09] structured output on.

[29:10] >> Yeah. So, we basically have a supervisor

[29:12] that's running all the time that's

[29:13] basically like micro analyzing your

[29:15] prompt.

[29:15] >> It's classifying the conversation. It

[29:17] knows what part of the workflow you're

[29:19] in. It knows what's next. So, like when

[29:20] the agent is saying like, "Hey, we're

[29:22] going to here's the next step." it can

[29:23] actually like cause buttons to show up

[29:25] in the UI and like cause suggestions to

[29:28] show up in the UI to help you understand

[29:29] like how to use the workflow.

[29:31] >> Yeah. So, what we really want to do now

[29:34] is we want to say that hey, ideally I

[29:37] want I want to call this an agent.md or

[29:39] a cloud. MD, it doesn't really matter.

[29:42] But what I really want is a file or a

[29:45] database layer or something that is

[29:47] going to be injected into my that is

[29:50] going to be injected into my agent loop

[29:53] automatically at some cadence. But as

[29:56] many of you know the problem with this

[29:58] whole system is my agent side MD file is

[30:00] always going to become outdated over

[30:01] time. There's not a choice. It it will

[30:04] definitively become out of date.

[30:05] >> Yep. And the whole proposal of Dash's

[30:07] idea here is what if we had a supervisor

[30:10] agent not just looking at your agent

[30:13] but actually looking at

[30:16] I'm going to I'm going to I'm going to

[30:18] do something kind of

[30:19] >> Oh, I see. Yeah. You're So you're

[30:21] drawing out like how do we generate the

[30:22] things?

[30:23] >> Yeah, exactly. That's what a few people

[30:24] were asking about. So I was like let me

[30:25] just like

[30:26] >> kind of copy and past this so then

[30:28] people get the idea. So now you have

[30:30] user A, user B, user C and user D.

[30:35] And you can easily imagine that I take

[30:36] the same subsystem that we built over

[30:38] here and I built another supervisor

[30:41] agent

[30:44] who's actually kind of like looking at

[30:47] all of these.

[30:51] And there's many different ways to build

[30:52] this out. So like please bear with me,

[30:53] but I'm just throwing like some concept

[30:55] here.

[30:56] >> Yep. Let's pull all those sessions in.

[30:58] And basically we don't actually have to

[30:59] look at the whole trace. We actually

[31:01] mostly just looking at the user like the

[31:03] user and usually the user and assistant

[31:04] messages is like pretty token efficient

[31:07] and gives you enough like we don't need

[31:09] all the tool calls and all the files and

[31:10] stuff because all we're looking at is

[31:12] like okay cool what does the user keep

[31:14] freaking saying and like maybe what's a

[31:15] little bit of context around

[31:16] >> exactly so this is basically a thing

[31:19] that produces

[31:20] >> you sharing your screen by the way

[31:21] >> I am I think I'm sharing my screen I

[31:22] hope I'm seeing my screen otherwise what

[31:24] >> yes you are yeah that's great

[31:26] >> uh and then this thing is a thing that

[31:27] basically if you think about it all its

[31:29] only job is It's going to produce a list

[31:32] of

[31:35] session like let's call this like

[31:38] session statements

[31:41] and it's going to produce an array of

[31:43] that. And when you when you think about

[31:44] what is a class of session statements

[31:46] write these down

[31:49] or you cannot write code like this. This

[31:51] code has to be left aligned because that

[31:52] is illegal.

[31:53] >> Yep. Oh, centered code. Oh, we should

[31:55] make an IDE that all the code is

[31:56] centered. [laughter]

[31:58] should be like the first programming

[32:00] language that looks good when you center

[32:02] the code

[32:02] >> and [snorts] the and the rule is you're

[32:04] not supposed to read the code. So we

[32:05] make it really uncomfortably

[32:07] >> it's all right aligned actually. It's

[32:09] like yeah [laughter]

[32:12] >> okay uh so what is a session statement

[32:15] going to have? It's likely going to have

[32:16] like uh like a like a fact. Let's call

[32:20] this a fact. Uh, and it'll also have

[32:23] likely a like um like a history or like

[32:27] a let's say like citation.

[32:30] And a citation will have a couple of

[32:32] things. Let's call this like a citation

[32:35] type.

[32:38] And a citation type will have a couple

[32:40] of things. It's going to have a

[32:43] what what would you say a citation set?

[32:44] It's going to have a who

[32:47] uh is like it's going to be like a

[32:48] person ID or like person name or ideally

[32:51] uh but we'll just call it a person ID

[32:53] because it's going to be the identifier

[32:54] of who said it and they'll likely have

[32:56] like the message uh like the quote

[32:59] directly which is like a string and then

[33:02] on top of that I will also want like the

[33:04] conversation

[33:06] uh context

[33:08] which is going to be a string which is

[33:10] more like a summary

[33:12] of what I want conversation

[33:15] context. And this is more like a summary

[33:18] for why the quote was included because I

[33:21] want the quote of exactly what the

[33:22] person said. I want the fact I want to

[33:25] know who said it and I want to have the

[33:26] conversation summary like what was the

[33:27] context going on at the time that made

[33:29] the person say the thing.

[33:30] >> Yep.

[33:31] >> And I want this to be an array because I

[33:32] want to know how many pe how many

[33:34] citations did that I have of that same

[33:35] sentence.

[33:36] >> Oh, this is great. Dude, you could go

[33:37] paste this into my chat.

[33:38] >> I'm going to.

[33:39] >> Amazing.

[33:39] >> Yeah. Uh, and then

[33:40] >> we don't have the dangerously allow gang

[33:42] prompting yet, but soon we're going to

[33:44] be a you're going to be able to just

[33:45] pull up my session and paste messages

[33:46] like agent. Yeah.

[33:48] >> And then we're doing the most important

[33:50] part because if I just vibe added this

[33:52] in because this is a vibe added feature

[33:54] today.

[33:54] >> Yeah.

[33:55] >> If this is a vibe added feature today,

[33:57] we we would we we can't just like

[33:59] directly inject this to our agents on MD

[34:01] for every single user.

[34:02] >> Yeah. We need to do like a roll out.

[34:04] >> We need to do a roll out. And the roll

[34:05] out is basically ask a d to whitelist.

[34:11] >> Yep.

[34:11] >> Uh uh allow list.

[34:13] >> Thank you.

[34:14] >> Uh deny list.

[34:16] >> Yep.

[34:16] >> Uh session statements.

[34:22] >> And this is I'm going to make this blue

[34:23] because this is a human in loop process.

[34:25] >> Yep.

[34:25] >> And once it goes into a human in the

[34:27] loop, the most amazing part is we don't

[34:30] actually have to update the agents. MD

[34:31] file because we are human layer and we

[34:35] actually own this eco this ecosystem

[34:38] over here.

[34:39] >> We can just inject things into your

[34:41] system prompt programmatically.

[34:42] >> Exactly.

[34:43] >> This is how we do lots of magic already.

[34:44] >> So then we just inject this into your

[34:46] system prompt once it's approved and now

[34:48] we are all happy campers and this is

[34:51] going to work.

[34:52] >> Yeah. Um, does this system diagram kind

[34:54] of explain to everyone what we're doing

[34:56] and how I'm going to make the coding

[34:58] experience of every single person on my

[35:00] team better without having to maintain

[35:02] stuff and how I can do easy rollouts

[35:04] with the agents. MD without having to

[35:06] check stuff in because I have to check

[35:08] in agents.md. I'm going to run you can

[35:11] do a very similar process where you just

[35:12] check this in. But what this does is at

[35:15] any given time any user using my system

[35:18] will always have the best and latest

[35:20] agents on empty.

[35:22] Sorry, I know I rambled for a while.

[35:24] >> That was good.

[35:24] >> Um,

[35:25] >> so we're starting to get our design doc

[35:27] coming together with diagrams and stuff.

[35:29] So this is uh

[35:30] >> what the wait there's a question here.

[35:32] What the human need to decide? Could you

[35:35] give an example please? Oh yes. So like

[35:38] what does a human need to decide? So

[35:39] once it gets a session statement,

[35:41] >> yeah, let's let's write an example of

[35:42] this which is like always force push,

[35:45] right? Like one of the state which could

[35:46] be like yeah

[35:49] >> never so never use d- no getit commit

[35:56] d-n no-verify

[35:58] >> right

[35:59] >> so that's

[36:00] >> the model the model might see that in a

[36:02] session because you someone said it to

[36:04] the model and now the question is like

[36:05] do I want this on for all my sessions do

[36:08] does every person on my team want this

[36:11] on for all my sessions all of their

[36:13] sessions

[36:14] >> yes

[36:14] >> um and otherwise is like what you said

[36:16] is like always use envir and it's like

[36:18] okay the model pulled that out but it's

[36:21] actually not a good memory to have so

[36:23] you might just dismiss that and just

[36:24] said like nope never suggest this again

[36:28] >> uh it is a baml

[36:32] envar

[36:34] needs to be an extremely

[36:38] high bar

[36:41] >> well so this is interesting because the

[36:42] story you told was actually you told it

[36:44] to add a baml our envir.

[36:46] >> Yes.

[36:46] >> And that became another thing and that

[36:48] was the thing that we like deniialisted

[36:50] basically. You were like, "Oh, I need to

[36:51] strike that from memory."

[36:53] >> Yes. But that's a one-off thing. But I

[36:55] can't imagine this being a more like

[36:57] persistent memory.

[36:58] >> Yes.

[36:58] >> Uh that has user benefit and

[37:03] and we can only ever have

[37:09] uh uh 10 total and bars.

[37:12] >> No, you have more than that.

[37:14] >> Exactly. the bar is really high.

[37:15] >> Okay.

[37:16] >> Uh so adding one means

[37:21] we can't add others.

[37:24] And you can see kind of what I'm doing

[37:26] here. So one immediate thing I'm

[37:28] realizing here Dexter is I actually

[37:29] don't want a human to allow list or deny

[37:31] list. I kind of want a human to be able

[37:33] to iterate in this loop.

[37:35] >> And you want to get feedback to

[37:37] >> I want to get feedback like hey you

[37:38] could imagine a memory about an NB bar

[37:40] coming up and I want to say actually

[37:41] this is the real NB bar. this the real

[37:43] end bar rule.

[37:44] >> Yeah, you want to basically be able to

[37:46] create meta memory that defines how

[37:48] memories are created.

[37:49] >> I don't even care about that. I just

[37:51] want to like prompt it and say, "Hey,

[37:53] this is what I actually want this rule

[37:54] to be. Can you update it?"

[37:55] >> Yeah.

[37:56] >> And like, can you scan through all our

[37:57] agent logs and see if there's a memory

[37:58] that may is relevant in that direction?

[38:00] >> Yeah.

[38:01] >> So, instead of this being like a

[38:02] automatic system, I

[38:04] >> want a pipeline where I can put in a

[38:05] prompt and it goes, "Okay, what are all

[38:07] the memories we have? Here's the one the

[38:08] user's talking about. Here's what they

[38:10] said about it. here's the suggested next

[38:12] action which is either like okay merge

[38:13] this into this existing one or just

[38:15] dismiss it like you kind of have like a

[38:17] suggested action

[38:18] >> or maybe a different way to think about

[38:20] this is the things that trigger this are

[38:21] cron

[38:22] >> yep

[38:22] >> but another thing that can trigger this

[38:24] is like a slack message

[38:27] >> like I can message this thing and be

[38:29] like hey can you make a memory about

[38:30] this and it will literally find all the

[38:32] conversations that are relevant to it

[38:33] >> and add it in and obviously the last

[38:35] thing I can do is like human like memory

[38:40] feedback

[38:42] can also trigger the system to rerun and

[38:45] your memory feedback is kind of coming

[38:46] from here.

[38:47] >> Yeah. I mean the way I picture this also

[38:49] is like all of this can be built as

[38:52] code, right? Like it can be a config

[38:54] file in your repository which means that

[38:56] it can be like all of those things can

[39:00] be like if I have a coding agent in

[39:01] Slack, I can just tell the coding agent

[39:02] to modify the configuration. Like this

[39:04] is less about a like we want to store

[39:07] all your memories and manage them for

[39:09] you and it's a lot more about like we

[39:10] want to give you a pipeline to create

[39:12] the right exact that's the hard anyone

[39:15] can write [ __ ] into cloud MD or write a

[39:17] skill that dynamically loads different

[39:19] sets of context the hard thing is like

[39:21] how do you source that from everything

[39:23] every all the smart people on your team

[39:25] how do you distill that knowledge in so

[39:26] that they can all benefit from each

[39:28] other's like things that they know

[39:29] >> and you'll notice over here the key part

[39:30] that we're really talking about is

[39:31] having many triggers to the same system.

[39:34] One is a cron trigger. Another one. Get

[39:37] your

[39:37] >> I wish we had chairs, dude.

[39:39] >> Take good.

[39:39] >> I want chairs. [laughter]

[39:42] >> Um,

[39:43] >> okay. I'm back.

[39:44] >> Um, guys, please buy human layer so he

[39:46] can buy chairs.

[39:46] >> Buy human layer so we can get chair.

[39:48] Actually, the chairs are coming. I just

[39:50] talked to a guy. They were supposed to

[39:52] be here on Friday.

[39:53] >> Um, but no, in all seriousness, what you

[39:55] want to think about when you build these

[39:56] agentic loops is always like what is the

[39:58] thing that triggers them? And the first

[40:00] thing that you had was cron.

[40:02] >> Yep. But as we start talking, it's

[40:04] almost intuitive that I can trigger this

[40:05] as a Slack message. I can trigger this

[40:07] via a memory feedback layer. Whenever I

[40:10] say this memory is good or bad, maybe I

[40:12] want to say I want to steer the memory

[40:13] more

[40:14] >> and that triggers the supervisor agent

[40:15] in a better way.

[40:17] >> Um, Dignesh has got a good question. Is

[40:20] the inner supervisor the same as the

[40:21] outer supervisor with session statements

[40:23] or did I miss something? So, when you

[40:26] think about these supervisors, it's not

[40:27] so much that they're different or the

[40:29] same. The goal of this supervisor is to

[40:33] like, think of it this way, help the

[40:35] user make progress.

[40:39] That's what this supervisor's primary

[40:40] goal is in life. It's only trying to do

[40:43] one thing. It's trying to help the user

[40:44] make some progress. Uh, as it does this

[40:47] bring the front,

[40:49] it's just trying to help the user. Oh,

[40:51] wait. What the heck?

[40:53] Bring the front.

[40:55] It's just trying to help the user be a

[40:57] little happier uh and like make progress

[41:00] with this main agency. This supervisor's

[41:03] role is identify

[41:06] uh identify shared

[41:09] uh shared technical

[41:13] facts.

[41:13] >> Yep.

[41:15] >> Uh as and that's a bad way to say this.

[41:17] If we think about this more, I'm sure we

[41:18] can find this. Y

[41:19] >> is doing this. So like even if it's the

[41:21] same agent, even it's the same model,

[41:22] they just have different missions in

[41:24] life.

[41:25] >> Yeah. And that's what it is. It's like I

[41:26] mean people talk about like multi- aent

[41:28] and agent swarms and front end agent

[41:30] versus backend agent and like it's all

[41:32] it's all that same like context

[41:33] engineering like if you give the agent

[41:35] exactly one job it will do the job

[41:37] better versus like hey here's a bunch of

[41:39] like the very I mean

[41:42] >> don't get me wrong cloud and codex are

[41:43] incredible pieces of software is like

[41:44] the general purpose agent that can kind

[41:46] of do everything. Yeah. Um, but if you

[41:48] want to do this like quickly, cheaply,

[41:50] efficiently, effectively, and like push

[41:52] the boundary of like not I care less

[41:54] about price and times going to run as

[41:56] async overnight, but if you want to push

[41:57] the boundary of like make it as good as

[41:59] freaking possible, then like all of the

[42:02] noise you get in a generic agent harness

[42:04] is overkill and you can just do one

[42:07] prompt and one structured output.

[42:08] >> And the real way to think about this for

[42:10] everyone is like think of it this way. I

[42:12] am willing to spend let's say I'm

[42:14] willing to spend like uh for this agent.

[42:17] Let's do cost in red because cost should

[42:19] be red

[42:21] for this agent. Let's say I'm willing to

[42:23] spend like $100 for my main agent loop

[42:26] for any given thing. I'm probably

[42:28] willing to spend around $10 for this

[42:31] system to run to make my main agent do

[42:34] better. Maybe I'm willing to double it.

[42:35] Who knows? But I'm probably not willing

[42:37] to pay the same price of this system.

[42:38] It's worth more to me than the primary

[42:40] agent work. But the subsidiary agent is

[42:42] still worth a lot of value and I'm still

[42:44] willing to pay for it. I definitely am

[42:47] not willing to pay $100 for this agent

[42:50] because it's goal is just different

[42:51] keeping my agents at NB up to date and

[42:53] that's valuable. Yeah.

[42:55] >> But not in the same way that it's um

[42:59] >> different. So you want to make sure that

[43:00] you're thinking about your you might

[43:02] still use the same model

[43:03] >> but maybe what I'm doing is I'm running

[43:04] this in batch mode

[43:06] >> and therefore like this runs like batch

[43:07] mode and it's like yes it's it's laggier

[43:10] >> but like whenever I run with the chrome

[43:12] >> as long as this as long as this thing is

[43:13] learning one new thing every day it's

[43:16] going to be it's going to be twice as

[43:18] good within a couple weeks.

[43:19] >> Exactly.

[43:19] >> Yeah. And I'm I might cron might be

[43:21] like, "Oh, in cron mode I want to run

[43:23] batch mode,

[43:24] >> but in Slack mode because the user

[43:26] messaged me, I want to be faster and I

[43:28] want to run instantly."

[43:29] >> Yep.

[43:29] >> So like it's all these cost and latency

[43:32] and these engineering trade-offs that

[43:34] you're really making that you need to

[43:35] think about when you're building a

[43:37] system.

[43:37] >> Yep. And thing we haven't even talked

[43:39] about is like decaying out like context

[43:41] shards of like hey look we have another

[43:43] supervisor that reads all the active

[43:45] shards for a session and figures out

[43:46] which ones are like haven't actually

[43:48] been used in a while.

[43:50] >> Yeah. So there's there's uh wait let's

[43:52] go big is another question but now

[43:54] wondering is the inner supervisor like

[43:56] controlling the agent with the user

[43:58] conversation delegating to the agents.

[44:00] So uh what the supervisor agent does in

[44:02] in human layers here I can actually if

[44:04] you pull I'll draw it here just uh will

[44:06] you zoom it to somewhere where I can

[44:08] where I can draw

[44:09] >> I'll click on you.

[44:10] >> Yeah. Yeah. Okay. So uh basically what

[44:13] happens is like you have your agent

[44:15] running uh and like one example of one

[44:18] thing that it does is like so you have

[44:20] your you know user message you have some

[44:23] tools uh so let's say the user message

[44:25] was like make make a design doc

[44:29] and so it does some tools and it writes

[44:30] a file um and then it says like cool I

[44:34] made the doc are six open questions

[44:38] right that's an assistant message

[44:39] >> I'll type that out and go for it Yeah.

[44:42] Um,

[44:44] and so what happens is one of these

[44:46] tools is a write,

[44:49] right? And so it writes this file

[44:53] design doc. Uh, and what happens when it

[44:56] does a write is we have a post tool use

[44:58] hook that goes to our API

[45:03] hook calls API and our API says, "Oh,

[45:07] did you write did your doc look like

[45:09] this? Did it have type design

[45:12] discussion? We parse the front matter

[45:15] and we say is it a design discussion in

[45:17] in the actual document? If yes, it goes

[45:19] into this pipeline where we basically

[45:20] send it to a tiny model. Uh are there

[45:24] any open questions? Little tiny model

[45:27] that just reads the you know two

[45:28] underline markdown doc and then if if

[45:31] yes then it does nothing. We do nothing.

[45:34] This just this response just returns. If

[45:37] uh well we also we also sync the

[45:38] artifact to the cloud but that's not an

[45:40] agent thing. If no then in the response

[45:43] to the right call we inject additional

[45:46] context and says uh you know additional

[45:50] context all design decisions are

[45:55] resolved.

[45:56] Remember to prompt the user to go to the

[46:01] outline base.

[46:02] >> Yeah. And and so we we stick this into

[46:05] the supervisor agent is actually just

[46:06] this tiny little query to haik coup

[46:08] based on this pipeline off a document.

[46:10] But what it means is that the agent gets

[46:12] back context that is like oh that's

[46:14] right. So even if this is a super long

[46:16] conversation where we're going multiple

[46:17] compactions and everything the the

[46:19] supervisor agent as it were keeps the

[46:22] main agent that the user is chatting

[46:23] with on track without the user having to

[46:25] be an expert in the workflow or the

[46:27] skills or how they work. And the real

[46:29] benefit that you can think about as an

[46:30] end user here is that it's basically

[46:33] like at some point the model will come

[46:35] back and say I finished all this stuff.

[46:37] Here's what I would recommend doing

[46:38] next. And then you have to type in yes

[46:40] go do that.

[46:40] >> Yeah.

[46:41] >> What this lets you go do as a supervisor

[46:43] agent is it lets you

[46:44] >> you can inject little nudges in

[46:46] >> basically it's basically doing that work

[46:49] for you. So you can learn workflows for

[46:50] longer and longer and longer with more

[46:52] automation.

[46:53] >> It's like you remember the research used

[46:54] to come back to research talk with open

[46:56] questions.

[46:56] >> Yeah. And we added another nudge like if

[46:58] the research doc has open questions be

[47:00] like cool go find the answers to the

[47:01] open questions and that just happens

[47:02] automatically without you having to type

[47:04] anything.

[47:04] >> Exactly. So it's basically removing some

[47:06] work from the human so I can let a

[47:08] workflow run for a longer time period

[47:11] and come back less frequently which as

[47:13] models get better is getting more and

[47:16] more feasible every single week.

[47:18] >> Right. The thing the thing that goes

[47:19] away eventually is like when models get

[47:20] better at longer context and they get

[47:22] better using sub aents then something

[47:23] like the RLM model like the recursive

[47:25] agent where you just have a model that

[47:27] calls sub aents that call sub aents

[47:29] >> uh is like probably where this is all

[47:31] going. But again, like what we're all

[47:33] what we're all hear about is like, hey,

[47:35] look, there's a lot of hype and like

[47:36] what's the discipline about what works

[47:37] today and how can you build systems that

[47:39] are 10x better than what everyone else

[47:40] does.

[47:40] >> Exactly.

[47:41] >> So hopefully at this point you guys

[47:43] understand what this main supervisor

[47:44] does and like Dexter's model for coming

[47:47] up with and again supervisor is such a

[47:49] bad word for it because like it makes it

[47:51] sound so much more complicated. Yeah.

[47:52] >> It's literally just this.

[47:53] >> It's like a bunch. There's like 15

[47:56] little pipelines that run at certain

[47:57] based on certain tool calls that the

[47:59] agent made to like help it sphere and

[48:01] stay on track.

[48:01] >> Exactly. It's literally all anyone that

[48:04] tells you have a supervisor agent,

[48:05] that's all they have. They just have a

[48:06] couple of prompts that they send out to

[48:07] a model and that does stuff that injects

[48:09] more prompts to the main loop.

[48:11] >> Yep.

[48:11] >> Uh

[48:11] >> this is the same we were talking about

[48:12] this with voice agents.

[48:13] >> Yeah. It's the same thing. You just

[48:15] nudge the system in the direction you

[48:16] want to go with like other other offline

[48:18] systems.

[48:19] >> Yeah. And what's really interesting

[48:21] about this is right now the way you guys

[48:23] have this working is this is a

[48:24] synchronous loop.

[48:25] >> Yeah.

[48:26] >> You actually could make this an

[48:27] asynchronous loop,

[48:28] >> right? Where it just gets injected at

[48:29] some point.

[48:30] >> Exactly. And like those different

[48:32] trade-offs and different wins with that,

[48:34] but it's something that you can easily

[48:35] do.

[48:36] >> Yep.

[48:37] >> Okay. Uh and now when you guys hopefully

[48:39] see this, this is basically the same

[48:41] concept as this, but instead of the goal

[48:43] being help the user make prog make

[48:46] progress for longer.

[48:47] >> Yeah. This goal is identify shared

[48:49] technical attacks and we can write a

[48:50] simple a very very simple Lon function.

[48:53] >> Yeah. What prompt would you write for

[48:54] this?

[48:55] >> I literally would just have I wouldn't I

[48:56] would just literally

[48:57] >> You would just be like here's a

[48:58] structure structure. Get this out.

[49:00] >> Yeah. And figure it out.

[49:02] >> Yeah. And this should be really easy to

[49:04] do. And the reason that I wouldn't write

[49:06] a prompt here is the core thing that I

[49:07] would actually build is this memory

[49:09] feedback system that could say given a

[49:12] human's message go back and go run this.

[49:14] >> Yep. Uh, probably the only difference I

[49:16] would do is I'd probably add a small

[49:18] little like embedding system to make

[49:20] sure that I'm not pulling in every

[49:21] single message.

[49:22] >> Yeah. Yeah. You could do a little bit of

[49:24] or even like reject X base slicing like

[49:26] if if someone's saying like use the X

[49:28] skill, we consider moving it or like we

[49:30] we cut we trim them for context.

[49:31] >> No, I would just use I would just slice

[49:33] everything into like shards and just

[49:35] like pull that up.

[49:36] >> Yeah. And just just give them like a top

[49:38] K like top 50 or whatever it is.

[49:39] >> Yeah. Or like top 100, top a thousand.

[49:42] It doesn't matter. But

[49:43] >> yeah, this thing you've highlighted here

[49:44] of like the iteration loop of like how

[49:46] does a user give feedback without

[49:48] breaking their workflow is actually

[49:49] really interesting and like Kyle talks

[49:51] about this for our like iterated loops

[49:53] that we do in our GitHub actions of like

[49:54] hey yeah you have a slashiterate which

[49:56] like one fixes the mistake the model

[49:58] made and also adds it to memory and like

[50:00] cloud has this too. You put hashed in

[50:02] front of a thing it like takes the

[50:04] advice and it adds it to CL.

[50:06] >> Oh

[50:07] >> they used to do that. They might have

[50:08] turned out offer. They're like super.

[50:09] But like a year ago, that was how like

[50:11] the easiest way to add stuff.

[50:12] >> And like I said, what I really want here

[50:14] is like the way that the user feedback

[50:15] comes is I just want this to come to me

[50:16] in a Slack message or an email or

[50:18] something every day.

[50:19] >> Something that you can

[50:19] >> check that something that's already in

[50:21] your other inboxes that you

[50:22] >> Yeah. It takes me 15 minutes or like 10

[50:24] five minutes every day to be like sent

[50:26] to go through like yes, yes, no, no, no.

[50:28] >> And obviously these have higher

[50:30] citations. I can build another AI system

[50:32] on top of this to like verify this and

[50:34] like make sure like is this actually

[50:36] fact? Is this true? Is the recent thing?

[50:39] Is this the thing that's been true for

[50:40] three months?

[50:41] >> Yeah.

[50:41] >> Like I can just go like I can just put a

[50:43] claw code session on figuring out all

[50:45] this and then just present to me

[50:46] information.

[50:47] >> Yep.

[50:47] >> And I'm not using my claw code credits

[50:50] maximally all the time every single day.

[50:52] >> Yep.

[50:52] >> So like if you can like run that through

[50:54] my credit system, even better.

[50:56] >> Yeah.

[50:57] >> All right. I could burn tokens to make

[50:58] that work. Like I think I say this all

[51:00] the time on my team. Just burn the

[51:01] freaking tokens. for all the tokens in

[51:03] the world

[51:04] >> until we're spending way too like and

[51:05] then one day you wake up you're like oh

[51:06] we're spending too many tokens on that

[51:08] that's great you found your bottleneck

[51:09] like cool if it's still val if it's not

[51:11] valuable turn it off and if it's still

[51:12] valuable then you invest time to

[51:14] engineer it and make it like performant.

[51:16] >> Yeah. Uh uh how do you handle queuing

[51:19] things like multiple sub agents waiting

[51:21] for the supervisors or agent response?

[51:23] We talked about queuing in a different

[51:24] one. We will probably talk about queuing

[51:26] later.

[51:26] >> Yeah. Also the supervisor agent is

[51:28] incredibly fast. It runs in like under a

[51:30] second. So it's not it's not uh it's

[51:33] it's not the bottleneck. Let's put it

[51:34] that way.

[51:35] >> Yeah.

[51:35] >> Like the agent sub agents themselves

[51:38] send inference prompts to Sonnet and

[51:40] Opus on every turn, which is like by

[51:42] definition slower than sending something

[51:44] to Haiku.

[51:45] >> Yeah, exactly. Um when you build really

[51:48] focused prompts, you just get way better

[51:49] systems and you can make latency not a

[51:51] problem.

[51:52] >> Yep. Sick.

[51:54] >> Uh do you want to skim through this

[51:55] design doc real quick and then we can

[51:57] >> Did you my Excalad draw? Uh, I did not,

[51:59] but you added a bunch of features that I

[52:01] don't want to put.

[52:01] >> Oh, man. Give me those features. Give me

[52:03] those features.

[52:04] >> We're doing the first vertical slice.

[52:06] This is when your product when your PM

[52:07] demands more features. You got to be

[52:09] like, cool. You want to you want to

[52:10] touch it first to make sure it's for

[52:12] >> No, no. I have a different philosophy

[52:13] now. I just give I just give Claw Soul

[52:15] or Fable the entire feature list on day

[52:17] one. Just have it. Just go.

[52:18] >> Just go do it. Yeah, it's so easy.

[52:20] >> Um, anyway,

[52:21] >> I don't let it make the design choice

[52:22] of, hey, um, I don't let it make the

[52:25] design choice of do you want this or

[52:27] not? like this will take 3 days. I'm

[52:28] like, nah, it's going to take 3,000 more

[52:30] tokens. Just burn them.

[52:31] >> Did you see our new artifact viewers

[52:33] keyboard first, by the way?

[52:34] >> Oh, that's cool.

[52:35] >> And I can hit A to like approve this,

[52:36] >> you know. I don't know how to do I don't

[52:38] know how to do uh he arrow keys, too.

[52:41] >> Yeah, but I'm I'm a pleb. Uh I barely

[52:43] know how to use DS code. Uh Vim is like

[52:46] above my pay grade.

[52:47] >> That's fine.

[52:48] >> Um

[52:49] >> but yeah, so we were basically like

[52:50] working through I was answering a couple

[52:52] questions and like we haven't gotten

[52:53] into the program design stuff, but like

[52:54] this is system architecture. stuff is

[52:56] easy of like what database tables are we

[52:58] going to use like how do the

[52:58] transactions work that kind of stuff

[53:00] before we actually get into like what

[53:01] are the method signatures and the types

[53:03] and things like that

[53:04] >> that's cool

[53:04] >> but anyways uh this is how we build

[53:07] things these days uh hope this was

[53:08] helpful uh and

[53:10] >> when I ship this feature I

[53:12] >> uh depends uh on when we ship the other

[53:16] cool feature that I don't know if I've

[53:17] shown you that oh you saw this last

[53:18] night the d feature

[53:19] >> Oh yeah was kind of cool

[53:21] >> yeah yeah I think I

[53:22] >> the d feature is very very cool

[53:23] >> yeah I'll show you guys we do a little

[53:25] chilling as a treat sometimes. Um, but

[53:29] basically we have uh

[53:33] if you have a if you have a session that

[53:35] is actually making code changes, you can

[53:37] see the diff right here in human layer

[53:38] and if someone else runs a session in

[53:41] this task, they can also like contribute

[53:43] to the diff. They can see the diff. So

[53:45] this is streamed up to the cloud. The

[53:46] basic idea here is like why have poll

[53:49] requests that are like this one moment

[53:50] in time when like anybody on the team

[53:53] can come to your can man board and just

[53:54] see what is everybody working on? What's

[53:56] the diff on that thing yet? And like

[53:57] what is the what are the files changed?

[53:59] And just be able to kind of like go

[54:01] >> finally bringing in files into here.

[54:02] Nice.

[54:03] >> We got files. We don't have all the

[54:04] files. We only have the diffs and the

[54:05] way we built it is really interesting

[54:06] but uh yeah coming soon. Uh you can

[54:09] actually opt into this today but it's a

[54:10] little janky so uh do so at your own

[54:12] risk but it's coming together pretty

[54:13] nicely.

[54:14] >> That's awesome. Um, is there plan to

[54:16] make human layer available on Windows?

[54:18] >> Uh, so what you can do is you can run if

[54:22] you go to our docs.humanlayer.com there

[54:24] are docs on the remote demon and so if

[54:26] you have any Linux box anywhere like you

[54:29] can get an EC2 box or like a server

[54:31] under your desk and you can run the

[54:33] demon there and it will orchestrate your

[54:35] cloud sessions and codec sessions there

[54:37] and then you can control it from a

[54:38] browser basically.

[54:39] >> The answer is no. Yes,

[54:40] >> there's no desktop app on Windows, but

[54:43] um we are the remote demon story is

[54:45] getting better and better every week.

[54:46] We're now able to in a couple days we'll

[54:48] be able to do work trees on your remote

[54:50] server. So you can like spin up a bunch

[54:51] in parallel on a remote server, which is

[54:53] really exciting.

[54:54] >> Cool.

[54:56] Uh WL

[54:57] >> people have tried WSL and had mixed

[54:59] results. Um if you pop into our Discord,

[55:02] there is a there is a thread of people

[55:04] who are trying to get it working on WSL.

[55:08] >> Cool. Um,

[55:11] I think uh that's what we got. If you

[55:13] have any questions, let us know. But

[55:15] hopefully you all had a bunch of fun and

[55:17] you learned something a little bit new

[55:19] about how we do system design, how we

[55:21] have conversations about
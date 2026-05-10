---
title: "Can an AI Out-Plan a Senior Engineer?"
author: "Boundary"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=KCqsoXveqiI&t=2525s"
date_saved: "2026-05-04T23:04:57.721Z"
---

# Can an AI Out-Plan a Senior Engineer?

[0:00] I think the the key thing here is when

[0:01] you say fighting like this is how you

[0:03] fight AI slop with slop, right? You're

[0:05] using slop to build these internal tools

[0:08] that make it really easy to get a really

[0:10] high quality document.

[0:12] >> And I think the inspiration that we had

[0:14] is very similar to async.io, but the

[0:18] main difference is instead of a function

[0:20] forcing yourself to be async.io,

[0:23] We want to go ahead and say that the

[0:25] call site determines if it's happening

[0:28] right if it's happening concurrently or

[0:30] in uh or in congruence. So the example

[0:34] code is like this. You'll ask the

[0:36] fastest model. You'll go ahead and spawn

[0:39] and you can name spawned context with

[0:42] various things. And each one of these

[0:44] will actually just run this code

[0:46] directly on here.

[0:47] >> Oh, interesting. So the return type of

[0:50] this is a future type. Someone asked

[0:53] like how do you how do you keep track of

[0:54] everything in your head uh while you go

[0:56] do this? The answer is like one get good

[0:59] but two real answer is not get good. The

[1:01] real answer is build tooling so that you

[1:03] don't have to keep track of everything

[1:04] in your head.

[1:10] >> All right everyone. Today's episode is

[1:11] going to be tons of fun. We're going to

[1:13] go ahead and talk about how we do design

[1:14] docs for extremely complicated concepts.

[1:16] We're going to show you some internal

[1:18] tools that we built of how we share

[1:19] markdown files with comments integrated

[1:21] with Slack and also talk about how what

[1:23] level of detail we go into with our

[1:25] actual design docs for a really

[1:27] complicated feature threading in the

[1:28] BAML language. Um, let's get started.

[1:32] Welcome everyone. Today we're going to

[1:34] be having a really fun episode of AI

[1:35] that works. This is a show where we try

[1:37] and show real-time effort of how to use

[1:39] AI models in really practical ways. This

[1:42] is our monthly episode where we do No

[1:44] Vibes Allowed. The whole point of no

[1:45] vibes allowed is you get to watch us

[1:46] code in real time. We chat about it. We

[1:48] share our processes and talk about

[1:49] something very practical that talks

[1:51] about both how we engineer things on our

[1:53] teams and how we use models uh for

[1:55] agentic engineering. I'm joined by

[1:58] Kevin. You want to give a brief thing?

[2:00] >> Sure. Uh so Kevin Gregory, I've been on

[2:02] a couple of episodes before, but I'm a

[2:05] ML AI engineer at Evolution IQ where we

[2:08] build disability in disability insurance

[2:10] claims guidance systems.

[2:11] >> Yeah. Uh Kevin's underelling it. He's

[2:14] built a large portion of their agentic

[2:15] engineering systems while he's been

[2:16] doing this. And he's been really

[2:18] improving their uh stuff behind the

[2:20] scenes. He's been there for a while. And

[2:21] Evolution IQ, I think, was recently

[2:23] acquired for how much?

[2:24] >> Uh we were acquired for 730 million

[2:27] about a year and a half ago.

[2:29] >> Yeah. So, you know, not a not a tiny

[2:31] company out there. So,

[2:32] >> yeah,

[2:34] >> pretty big acquisition.

[2:36] >> And then, uh my name's Fib. I work on a

[2:38] programming language called BAML. And

[2:40] today's episode, I think, is going to be

[2:42] one that I think isn't really done much

[2:44] with AI stuff, which is how do you

[2:46] actually build design docs using AI? How

[2:48] do you use agentic engineering to build

[2:49] various kinds of design docs? Um, I

[2:52] think this is something that we do a lot

[2:54] on the BAML team because a large part of

[2:56] building programming languages is

[2:58] actually having really good thesis and

[2:59] like background research on how you go

[3:01] do something about this. Um, and while

[3:04] you guys are in the chat, if you have

[3:05] questions, if you have thoughts that

[3:06] perhaps make your design process really

[3:08] good, um, just drop them in. But when we

[3:11] think about it, design docs are, and

[3:13] Kevin, I want your thoughts, but like I

[3:15] kind of find that implementation can

[3:17] often be oneshot if the design is

[3:18] phenomenally correct,

[3:20] >> but

[3:22] >> phenomenally correct design is very hard

[3:23] to do.

[3:24] >> Yeah. No, I completely agree. I mean,

[3:26] we've all heard the story of the um the

[3:29] the guy who founded or the guy who built

[3:31] Cloud Code. Um from what I've heard,

[3:33] what he does is he basically just goes

[3:36] back and forth with the plan and then

[3:38] whenever the plan's done, he just kicks

[3:40] it off and then starts another one. So,

[3:42] >> yeah. And I found the same thing. If my

[3:44] design doc or my plan is really, really

[3:45] good, a lot of times club code cursor

[3:48] can get it in one shot.

[3:50] >> Yeah. And I think a lot of people have

[3:51] spent a lot of time in the planning

[3:53] phases of their system. But today I

[3:55] think I want to talk about a what if

[3:58] you're doing an incredibly hard problem.

[4:00] I'll tell you an example of a problem

[4:01] that I'm working on right now that I

[4:03] have been working on for almost 4 days

[4:04] now. Um and I haven't even started

[4:06] coding yet. It's pure designing for 4

[4:08] days. Uh the problem is threading. We're

[4:11] designing our threading system for BAML.

[4:14] Um if any of you know how async.io

[4:17] works. If any of you know how threading

[4:18] models work and like core language

[4:19] runtimes, they're not what I would say

[4:21] the easiest thing to implement. There's

[4:23] a lot of design trade-offs in terms of

[4:24] what feels good, what feels bad. Um, and

[4:27] I want to show the process of how we're

[4:28] doing this and like how I'm actively

[4:30] doing this today. So, I'll show you

[4:31] stuff some stuff that's more polished.

[4:33] I'll show you some stuff that's I'm

[4:35] actively working. I'll literally show

[4:36] you how I move forward with it. Um,

[4:40] and the idea of this task is I don't

[4:41] predict that this task is oneshot

[4:43] implementable, no matter how much good

[4:46] work we do in design. But I do believe

[4:48] that we could, if we design it well, we

[4:50] could break into like four or five

[4:51] different chunks that are each

[4:52] individually oneshot implementable and

[4:54] each of those could provide meaningful

[4:56] upgrades to the system.

[4:58] Um, but before I go into that, Bart, you

[5:00] said, I'd love to know how you work

[5:02] through trade-offs and decisions where

[5:03] you are out of your depth. I think

[5:04] threading is probably one of those. I

[5:06] don't know how Go's threading model

[5:08] works. I don't know how um I have some

[5:10] idea how async.io works in most

[5:12] languages, but I don't know like

[5:13] definitively how it works in V8 and I

[5:16] don't know definitively how it works in

[5:17] CPython. The first process I find

[5:19] actively useful is actually just the

[5:20] ability to go ahead and have a good way

[5:24] to read design docs. So we actually

[5:26] built uh we've done a talk on this at

[5:28] the AIN conference. You guys will see it

[5:29] soon on YouTube. Um but it's this idea

[5:32] of fighting slop with slop. We all know

[5:35] we're going to generate slop. How do you

[5:36] do this? Well, we built tools internally

[5:38] to make slop really easy to understand.

[5:39] So, like one of our engineers, Kai,

[5:41] wrote a whole thing about why we want

[5:43] daytime. Uh we want daytime in Bamma

[5:45] because daytime is nice. We want if

[5:47] you're building agentic systems, you

[5:48] want a date way a way to deal with

[5:49] dates. Um we wrote a whole map around

[5:52] it. And part of it, it wasn't actually

[5:53] just doing this. It was like doing a lot

[5:54] of background research and understanding

[5:56] how it's used in not our just our

[5:58] system, but also other languages. And

[6:00] you go do this. So, you build tooling

[6:02] that allows other users in the team to

[6:04] comment um like review design docs. And

[6:07] obviously like GitHub doesn't really

[6:08] work well for this cuz GitHub's not

[6:10] built for like sharing a massive amount

[6:12] of markdown files really easily. So, we

[6:14] added this little bit of tooling. Then

[6:15] we went ahead and added a little bit

[6:17] more tooling to actually like connect

[6:19] all this to Slack. So every single time

[6:22] stuff gets created, a Slack thread gets

[6:25] created for every single thing that

[6:27] comment that uh reflects it on here

[6:29] because again we don't have notification

[6:30] systems on our website. We don't want to

[6:32] build that. So we latch on to Slack as a

[6:34] notification system to make sure that

[6:35] design docs can actively be shared once

[6:38] they're in like a more ready state. Um

[6:40] so one way to kind of deal with

[6:41] decisions out of your depth is how do

[6:43] you involve more people in your team

[6:44] into it? And you have a couple different

[6:46] options here. And the easiest option in

[6:47] my mind is just make sure that people in

[6:49] the team can read it. And some of these

[6:52] threads, let's see if I can find a good

[6:53] one.

[6:55] Um, and like we don't always use this.

[6:57] Sometimes we just use Slack directly.

[7:00] But often times people just read these

[7:02] and like we'll just start leaving

[7:04] comments and we did extra work to like

[7:06] tag the person connect the person in

[7:08] Slack to the person in our system over

[7:11] here

[7:12] as you go do this. And like we actually

[7:14] built the and again most of this stuff

[7:16] is hard like we can actually see all the

[7:18] users here and like some people are like

[7:20] have different privileges like me and

[7:21] Aaron have slightly different

[7:22] privileges. Um since um and everyone on

[7:26] our team gets automatically connected

[7:27] because if their GitHub account has

[7:28] their boundary ML email they

[7:30] automatically become a member of the

[7:32] team and members of the team have

[7:34] different privileges than like random

[7:35] wild users that want to go do this. So

[7:37] like for example if you guys go to

[7:38] bs.boundaryml.com boundaryl.com. You

[7:40] should be able to log in when you're

[7:41] GitHub and just see random work that

[7:43] we're doing. Uh but yes, this tool is

[7:45] completely in house. We haven't really

[7:47] um if you're curious, it's actually

[7:50] fully open source as well. If you go to

[7:52] our repo um

[7:55] uh where is this TypeScript 2? Somewhere

[7:57] in here. If you just ask Claude to find

[7:59] it, it's somewhere in here. I don't know

[8:01] where. Yeah, this is this is really I

[8:04] really like this idea because some of

[8:05] the one of the big things that I think

[8:07] that that we struggle with and I imagine

[8:09] a lot of other companies too or a lot of

[8:11] other companies do as well is you end up

[8:13] in like design doc help right? So, we

[8:15] use we use Google Google Drive a lot.

[8:17] So, we have Google Docs kind of all over

[8:19] the place, and we don't have a good way

[8:22] of

[8:23] of tracking what design docs are being

[8:26] discussed, what's been approved, what

[8:28] comments are are where. You most of the

[8:31] time people kind of just send it out.

[8:32] There might be one round of comments and

[8:33] people reply, but there's no like sense

[8:36] of when you have a PR, it's merged and

[8:38] it's done. There's no sense of that. And

[8:40] so, something like this, I think, could

[8:41] be really, really helpful. Really

[8:43] helpful. I actually might might steal

[8:45] this.

[8:45] >> The one I'm working on right now is

[8:46] spawn cuz I'm building concurrency and

[8:48] like they have different states on here.

[8:50] You can mark special things as like good

[8:52] for the LM.

[8:53] >> So then other L other things working at

[8:55] new design docs automatically pull them

[8:57] into context as like reference. And I'll

[8:59] show you how we do that in a second. And

[9:00] then the other thing we have is like

[9:02] this export ability where you can just

[9:03] like export things. Um but yeah, it is

[9:05] effectively a tool to uh to just um kind

[9:10] of like be able to leave comments and

[9:12] share information about them. Now

[9:14] there's a big assumption in this tool

[9:16] which is the person that's producing the

[9:18] design doc once they move it from draft

[9:20] over to proposed

[9:22] actually goes ahead and has done the leg

[9:24] work to say that it is good and it is it

[9:28] is good to read. I trust you uh to go do

[9:32] this. Um we haven't built a notification

[9:34] system where you can like ask specific

[9:36] people to review. That's kind of a pain

[9:37] in the ass.

[9:38] >> Uh but like we just tag people on Slack

[9:40] and say hey go read this. But um now

[9:43] we're taking this a few steps further

[9:45] because again the problem with any

[9:46] website back system is if you're doing a

[9:49] website back system, Claude can't edit

[9:50] it. So we have a thing that allows you

[9:53] to export all these beeps that gives you

[9:54] a nice little zip file. And when you

[9:56] have the zip file, what you get is you

[9:58] get a nice little folder structure that

[10:00] downloads every single beep and every

[10:02] single version and uh gives you all the

[10:04] data about it and all the pages on here.

[10:07] Now, the other thing I've been building

[10:09] on top of this next step is actually

[10:12] some cloud skills. I haven't checked

[10:13] this in yet, but this is a cloud skill

[10:16] that has like another CLI tool that I've

[10:18] been working on. That's a Python script.

[10:20] And the whole idea of this tool is this.

[10:23] Watch this.

[10:26] Clear. Uh oh, I just spent some tokens.

[10:29] Oh no, that cost me money.

[10:33] It's really interesting just typing

[10:35] things into your seal internal now. just

[10:37] randomly bills you. Um,

[10:40] but

[10:42] it's not really an empty U. So, let's

[10:45] let's do the next thing. So, what I'll

[10:46] do is like pull pull the data. So, when

[10:51] it pulls the data, there's this CLI

[10:53] actually runs. There's like a cloud

[10:55] skill called BEP. Uh, let's see if it

[10:57] auto uses it. Nope, it didn't use it.

[10:59] Beep pull. I can say beep pull. And what

[11:03] this will do is it'll actually just run

[11:05] the script and this will pull the data

[11:07] and it'll tell you something is out of

[11:08] sync. Uh so let's change this really

[11:10] fast. I'm going to go ahead and like

[11:12] change the script to like add some new

[11:15] data.

[11:17] And now let's run bp pull. And now

[11:19] you'll notice it's going to pull the

[11:21] data and actually tells me that this

[11:23] thing has two lines removed from readme

[11:24] md. Like there I guess the diff is

[11:26] wrong. So I should update the script.

[11:28] Oh, if I pull I'll remove two lines from

[11:30] readme.md. I can even ask which two

[11:32] lines.

[11:34] And because this is all backed by Claude

[11:36] and Claude is using this, I'll show you

[11:39] in a second what the B app pull actually

[11:40] shows you.

[11:41] >> So this is making sure that your local

[11:45] folders, your local bets are in sync

[11:47] with the what you were showing us

[11:48] earlier in the UI.

[11:50] >> Exactly. Because we don't want the

[11:51] problem with using Git for this is then

[11:52] you can't build all the tooling that you

[11:54] want around this because Git doesn't

[11:55] have a good way to really guarantee

[11:57] certain kinds of tooling. So it

[11:59] actually, as you can see, I'm I'm just

[12:00] working with claude to ask it which two

[12:02] lines. It just did the thing. It pulled

[12:04] the thing. Now I say, uh, yep, just just

[12:09] use the cloud thing.

[12:13] >> Cloud thing.

[12:13] >> And this will just kind of do the do the

[12:15] thing for me without me having to do any

[12:17] more work. And like boom, my apps are

[12:18] now up to date.

[12:20] >> U, and it does all sorts of things like

[12:22] renaming. It's kind of robust for this.

[12:24] And this is kind of where I think the

[12:25] blend of software versus hardware of

[12:27] software versus AI really comes in. I

[12:30] worked with Claude to write this script.

[12:31] I haven't I don't even know what this

[12:32] code is. I don't care because this this

[12:35] code is a means to an end. And this is

[12:37] what we mean by fighting slop at slop.

[12:39] You generate slop code. Don't really

[12:41] care what it does. As long as this

[12:44] workflow is good and this is nice, I'm

[12:47] very very happy with my life. And this

[12:50] workflow is I can just say like I want a

[12:52] concurrency beep. Let's go work on this.

[12:54] And then what I can do as a developer is

[12:56] I can spend all my time working with

[12:59] Claude on a concurrency system. And

[13:02] we'll talk about the concurrency system

[13:03] in a second.

[13:06] Claude can be editing this for me. I

[13:08] have to spend zero time thinking about

[13:09] this. I can do all the background

[13:11] effort. I can do all the effort around

[13:12] understanding how current currency

[13:14] models work. Uh, and then I can write a

[13:17] bet for my colleagues to go review and

[13:19] read and they can read on a nice little

[13:22] UI on a dashboard while I can edit with

[13:24] a markdown file with Claude. Does that

[13:27] workflow overall kind of make sense,

[13:28] Kevin?

[13:29] >> Yeah. Yeah, it does. And I think that

[13:31] the key thing here is when you say

[13:32] fighting like this is how you fight AI

[13:34] slop with slop, right? You're using slop

[13:37] to build these internal tools that make

[13:39] it really easy to get a really high

[13:41] quality document.

[13:43] >> Exactly. Yeah.

[13:45] >> And that's okay because it's not it's

[13:46] not customerf facing. It's a pretty

[13:47] simple workflow and it doesn't matter if

[13:49] it's sloppy or or doesn't follow solid

[13:52] principles or whatever. If it just gets

[13:53] the job done and it helps you get to

[13:55] this state faster and easier. So then

[13:58] what you actually end up shipping is a

[14:00] lot better and more reliable then that's

[14:02] that's a worthwhile trade-off every

[14:04] time.

[14:05] >> Exactly. The for those curious if you

[14:07] look into the BAML repo you'll find the

[14:09] beeps folder. That's kind of where this

[14:11] is. Um, yeah, I would I don't think I've

[14:15] ever looked at the code in the beeps

[14:16] folder. It is a pure AI slot mess and

[14:20] like I have we the only way I add

[14:23] features to beeps is via slack and

[14:26] tagging coding agents to go add

[14:28] features. I have never even opened

[14:30] claude myself to add features into beeps

[14:33] because it's not worth it. If folks have

[14:35] more questions about this workflow, let

[14:37] me know. Uh but otherwise I want to

[14:38] share like how we go really deep into a

[14:41] really hard problem. Uh any question on

[14:43] your end Kevin?

[14:45] >> No nothing for me. Seems like the the

[14:47] chat people are ready to get into the

[14:49] threading.

[14:50] >> Okay let's talk about threading. Uh

[14:54] this is a super super preview. So if you

[14:56] guys have opinions share them as you do.

[14:59] So let's start off with the problems of

[15:01] threading really fast. And this is how

[15:03] we start. The first thing that we do

[15:05] when we often write BAPS and at this

[15:07] point we've gone through like many

[15:08] versions of BAPS. This over this

[15:10] actually overrides like this previous

[15:12] version that some Antonio on our team

[15:13] wrote. Oops. Um we're like at least for

[15:19] me the worst why do we want threading?

[15:21] Well, if you're writing aic workflows,

[15:22] you're writing any sorts of systems um

[15:24] oh what does BEP stand for? BEP stands

[15:26] for BAML enhancement proposals. It's a

[15:29] way to add new language features into

[15:30] the BAML language.

[15:33] Um, so when we think about threading, I

[15:35] think the worst worst worst part about

[15:38] threading is actually the fact that you

[15:41] have colored functions everywhere. Most

[15:44] people don't do threading. We've decided

[15:46] as a society that asyncio is more

[15:48] convenient than threading and easier to

[15:51] model for most people than threading. So

[15:52] we do async.io. And async.io That was a

[15:55] really nice system that allows us to get

[15:57] par I wouldn't say parallelism but

[16:00] rather concurrency because it doesn't

[16:02] run things at the same time. It actually

[16:04] runs things just once. And let me see if

[16:07] I can find a doc over here. It's on

[16:10] here. Uh the problem with async.io

[16:12] However, is that if you've ever used

[16:15] TypeScript, you will often see a

[16:17] function like read file sync read file

[16:20] async because once you are in a async

[16:23] context, it is really hard for you to

[16:25] leave and go into a sync or once you're

[16:28] in a sync context function create user.

[16:31] If you if create user was a database

[16:34] call, you can no longer write a weight

[16:36] here unless you mark this function as

[16:38] async. And I think that painoint exists

[16:41] almost as a legacy painpoint. Um what is

[16:44] it? TypeScript. And I think the reason

[16:46] that this painoint exists as a legacy

[16:48] painpoint is because concurrency was not

[16:51] something that most languages had on day

[16:53] one. So if you don't have that, you now

[16:56] have two code bases. And many times I

[16:58] have run into this problem where

[17:00] somewhere deep in some nested stack I

[17:02] need to use some async function. And now

[17:05] I have to freaking wait and I have to

[17:07] change the whole stack upstream to make

[17:09] it completely sync. Have you done that?

[17:10] >> Everything's got to be Yeah.

[17:12] >> I I've I've done it a couple of times.

[17:13] Yeah. Everything has to be Yeah. You

[17:15] have to change it all the way up and

[17:17] down.

[17:18] >> Exactly. And I think when you do agentic

[17:20] engineering and we want code to happen,

[17:22] >> you want to have the minimum amount of

[17:24] diff to make sure that the right thing

[17:26] happens in the right way. So that's one

[17:29] of the problems that we are dealing with

[17:30] is we don't want function coloring. We

[17:32] don't want to have an async version of

[17:34] the function and a sync version of the

[17:35] function just to support how our callers

[17:38] might want to use it. But we do want

[17:40] parallelism because if you're calling an

[17:41] LM, if you're calling five LM functions,

[17:43] you kind of want them to run in parallel

[17:46] when when they can work in parallel.

[17:50] So that kind of inspired us to think a

[17:52] little bit more. And I think the

[17:55] inspiration that we had is very similar

[17:58] to async.io,

[18:00] But the main difference is instead of a

[18:02] function forcing yourself to be

[18:03] async.io,

[18:05] we want to go ahead and say that the

[18:07] call site determines if it's happening,

[18:10] right? If it's happening concurrently or

[18:12] in uh or in congruence. So the example

[18:16] code is like this. You'll ask the

[18:18] fastest model. You'll go ahead and spawn

[18:20] and you can name spawned context with

[18:24] various things. And each one of these

[18:25] will actually just run this code

[18:28] directly on here.

[18:29] >> Oh, interesting.

[18:30] >> So the return type of this is a future

[18:33] type R2-D2. Why is superseded in the new

[18:36] miss missable row? Uh it's just a slop

[18:40] artifact and we don't really care about

[18:42] reading um reading superseded. So it's

[18:45] not a thing that has really bothered us.

[18:49] Um, and you can see over here each of

[18:50] these is a feature and then you can

[18:52] await any of the features and then you

[18:53] get the first response back. The other

[18:55] thing that we want to be able to make

[18:56] really easy and I I should help that

[19:00] what helps us design these systems is

[19:01] actually starting off with one of the

[19:04] premises of BAML is to be a great

[19:05] language for application development. So

[19:07] when we do design work on here, we

[19:08] always think really hard about there's a

[19:11] cloud MD that has some rules, but

[19:13] effectively effectively the rules that

[19:15] we have are like think really hard about

[19:17] what is a frequent behavior

[19:20] and the things that are the most

[19:22] frequent should be the syntactically the

[19:23] most convenient

[19:26] while not compromising correctness to

[19:28] some degree. And if uh correctness does

[19:31] have to win to some degree, but

[19:33] frequency is really important. We don't

[19:35] want to make it harder to do the right

[19:36] thing.

[19:38] That's important to us. So, one of the

[19:40] things that we realize that a lot of

[19:41] people want to do is thread pools. If

[19:44] you want to run an array in parallel,

[19:45] you want to kind of say that, hey, this

[19:47] thing is running on like I oh, it's a

[19:50] it's not supposed to be this. I have a

[19:51] different version of this, but his idea

[19:53] is you should be able to say that I want

[19:55] to spawn things and run at most three

[19:56] things at the same time. So, we have

[19:58] this concept of a Q.

[20:01] But the basic way that we did this work

[20:03] and you'll see kind of how I do the

[20:05] inspiration for this is especially now

[20:06] that this beep is getting more and more

[20:08] complete is we kind of have to come up

[20:11] with some analogy to some existing

[20:13] system. So, we've done previous leg work

[20:15] to recognize that where what languages

[20:18] do async await, what languages do

[20:19] virtual threads, what languages do OS

[20:21] threads. We know we don't want to do OS

[20:24] threads because they're extremely

[20:25] heavyweight and really complicated to

[20:27] get right. Um, and most application

[20:30] developers don't want to think about OS

[20:31] thread levels. You don't want to be

[20:32] thrashing your threads.

[20:34] We do likely want to copy Go or Cotlin

[20:37] who have co- routines and many languages

[20:38] Python has co- routines etc. and go make

[20:40] that work. And again we don't want async

[20:43] aait because async aait leads to the

[20:45] problem of coloring where we have to

[20:47] label every function as either async or

[20:48] non async. And if you want to use fetch

[20:50] now everything upstream must be async.

[20:53] So we want to avoid that problem when

[20:54] possible.

[20:56] So once we started with that we

[20:58] basically just forced the model to go

[21:00] ahead and and I'll go through this in a

[21:02] second. Every single part of this beep

[21:05] has to kind of be written in a way that

[21:06] is somewhat readable. We invented

[21:09] something called middleware that allows

[21:10] you to do things like wrap a spawn with

[21:12] a retry over here.

[21:15] >> And that's kind of convenient because

[21:17] >> many times you want to be able to just

[21:19] retry arbitrary blocks of code.

[21:22] >> Uh you want to be you might want to say

[21:23] that a spawn has like I'll talk about a

[21:25] few more examples

[21:27] >> a fallback where if it fails just give

[21:29] me a value and that guarantees that this

[21:31] fun this future can never error anymore.

[21:34] the error type is never as opposed to

[21:36] whatever it was given to be

[21:38] and a few other options that we came up

[21:40] with.

[21:42] We'll go into this in a second, but as

[21:44] we go through this, one of the things

[21:46] that you'll notice about this beep is

[21:47] that it's extremely thorough and

[21:49] complete with the examples. Normally,

[21:51] I'd be really lazy, but I don't have to

[21:53] be. I can literally say like, "Give me

[21:54] an example of retry. Give me an example

[21:56] of timeout. Give me an example of

[21:57] timing." And what does timing do? It

[22:00] takes the spawn and every time you run

[22:01] it, it just logs how long it took to run

[22:05] the task name, the name of the task or

[22:07] uh that's given to it. So in this case,

[22:10] it would just log how long the extract

[22:11] took and it tells you like it'll run the

[22:13] retry and with the retries it will log

[22:15] the timing of the total system, not each

[22:17] individual retry.

[22:19] >> Oh, cool.

[22:22] >> And obviously like with retry and with

[22:24] timing is different than with timing

[22:25] with retry. This measures the full

[22:27] system. This measures timing of every

[22:29] single retry individually.

[22:33] And one of the things that you'll notice

[22:35] when I go through this is there's

[22:36] examples like fire forget. There'sam and

[22:39] I I'll read through the beep a little

[22:40] bit more slowly in a bit, but I want to

[22:42] show the process first. And I want to

[22:44] show the level of thoroughess that we go

[22:45] into in here. We talk about unhandled

[22:47] spawns. We talk about how how futures

[22:50] that spawn futures work, especially for

[22:52] example, if we do cancellation.

[22:54] Uh we talk about rate limiting. We talk

[22:56] about the cancel token and then we go

[22:59] ahead and like talk about how you do

[23:01] conditional spawning how select works

[23:03] for example like if you want to pick one

[23:04] thread or the other see which one got

[23:06] completed but the point is this docet's

[23:09] very very thorough now

[23:12] once someone reads this it's we found a

[23:15] what we do is we actually record the

[23:16] slack meeting using transcriptions and

[23:18] I'll show you the meeting that we had

[23:19] about this talk recently

[23:22] it's like a giant transcription um

[23:26] language.

[23:28] Where'd it go? So, we literally just

[23:29] recorded. We had a Slack huddle. We got

[23:31] the notes from the Slack thread and then

[23:33] we actually just have the huddle

[23:34] transcript. I The notes don't really

[23:36] matter, but I literally would take the

[23:37] full huddle transcript and we were in

[23:39] person, so it's just that's why it says

[23:41] just me talking.

[23:41] >> It's just you talking.

[23:43] >> Uh and it's a pretty long meeting as you

[23:45] can tell. Like we were talking for like

[23:46] an hour and a half here. Yeah. Um at

[23:49] least maybe two.

[23:50] >> Uh two and a half. I don't think we

[23:52] recorded the whole thing sadly cuz

[23:53] granola broke on us. So I literally just

[23:55] went through I copied this whole

[23:56] transcript and after I copied this whole

[23:58] transcript I literally say something

[24:00] like this beep 34 is very complex. We

[24:03] make a and I literally just reorganized

[24:05] this because I realized that this beep

[24:07] which is spawn is implicitly done very

[24:10] it has so many design decisions that we

[24:12] have to make

[24:14] uh like cancellation like cancelling

[24:16] threads and cancelling workloads is a

[24:18] whole complicated workstream. we have so

[24:20] many design decisions that we have to

[24:21] make that even someone reading the BEP

[24:23] doesn't have the full context and I

[24:25] think I paste it in the trans at some

[24:27] point I do paste in the conversation and

[24:30] I basically just force the model

[24:32] to go ahead and just sprint out an

[24:35] outline of how it should rewrite the

[24:36] beep and this be I want to say the

[24:38] summary the motivation the simplest form

[24:41] the design decisions and this time it

[24:42] outlines all actual syntax decisions

[24:45] that we make like our future sharable

[24:48] can you like send futures across threads

[24:51] themselves. What happens when you await

[24:52] on a future multiple times? What happens

[24:54] when you What happens when you throw?

[24:56] How are cancellations taken? The fact

[24:59] that a parent being canceled means that

[25:01] all children get canceled by default and

[25:03] you need to do work to detach

[25:04] themselves.

[25:06] Um can you have a thought then on a

[25:08] future where you actually choose what it

[25:11] does what it does in different

[25:13] situations?

[25:15] So these these are these are decisions

[25:17] that you discussed in your meeting or

[25:19] that is implicitly decided in the

[25:21] document

[25:22] >> both. So some decisions got changed and

[25:25] got introduced because of the meeting

[25:26] and some are just locked into the

[25:28] document.

[25:30] >> Gotcha. And then what we did is I

[25:31] basically asked the model to look at

[25:32] these design decisions, look at and then

[25:35] uh pull out the more complicated ones

[25:37] and then pull out a whole bunch of

[25:39] examples over here for each of these and

[25:42] then just call out what we're explicitly

[25:44] not doing because that's important for

[25:45] people to read at the uh at the map of

[25:47] like here's just like I'm not talking

[25:48] about test local storage like thread

[25:50] local storage is not in scope of this

[25:52] thing. We're not we actually remove

[25:54] select after talking about this design

[25:56] decision. Uh, conditional spawning is

[25:59] just like we don't it's just a little

[26:01] complicated. It's not relevant of

[26:02] putting in here. And deadlock detection

[26:04] is something that we can do, but it's

[26:05] not something that we're going to talk

[26:06] about in this map. It's just out of

[26:07] scope.

[26:10] >> So like having a really good philosophy

[26:12] of what we do ends up being very useful.

[26:15] And what we end up doing is I'll show

[26:17] you the final optimization for this was

[26:19] actually like I want to reduce the scope

[26:21] of this beep to be much smaller and much

[26:23] more direct. And the final thing went

[26:25] from like 104 kilobytes is how big this

[26:27] total beep was down to 62 kilobytes. So

[26:30] I reduced the amount of like verbosity

[26:32] by half and I kind of have to go read

[26:34] the whole thing to make it actually

[26:36] good. And I'll show you what the final

[26:37] thing looks like over here.

[26:40] And now you can see that the beep 34 V2

[26:43] and I made it right in V2 because if I

[26:44] delete V1 what you'll notice is it will

[26:48] if you replace in place for design docs

[26:51] models will often just mess up

[26:53] >> really.

[26:54] >> Yeah because like

[26:55] >> that's really interesting to know

[26:57] >> for complicated design docs I've seen

[26:59] this 100% of the time and if you think

[27:00] about intuitively it makes sense too

[27:02] like why would a model think about a

[27:04] human humans get lazy and they're

[27:06] inconsistent when they edit things. Edit

[27:08] editing is a more hard exercise to be

[27:11] coherent in than rewriting from scratch.

[27:14] >> Yeah, that's a good point.

[27:16] >> That's a good point.

[27:16] >> Like imag take any software architecture

[27:18] like take any agentic system you built.

[27:20] Think about how much cleaner you would

[27:22] write it the second time around than the

[27:23] first time around.

[27:24] >> Yeah, I think it's it's something

[27:25] similar where when you see um a system

[27:28] that has a lot of tech debt, the there's

[27:30] that part of you that just wants to

[27:31] rewrite the whole thing from scratch

[27:33] rather than kind of just editing it.

[27:34] Right. It's just it's the same thing.

[27:36] >> Exactly. Um, and I think there's like

[27:39] the sunk cost fallacy that a lot of

[27:40] people have, which is like, oh, I'll

[27:41] just edit it. I'll keep editing. But

[27:43] often times when you're doing like in

[27:44] this case, I'm effectively doing a major

[27:46] rewrite where I want to like re I want

[27:49] to be like, hey, spawning is way

[27:51] different than every other BEP that

[27:53] we've done before. It has so many more

[27:54] implicit design decisions that are being

[27:56] made that are not obvious. I want to

[27:58] just label them one by one by one and

[28:01] then in a separate document talk about

[28:03] prior art and like how other people do

[28:05] it.

[28:06] So the first document was the first

[28:07] document combining both of those two.

[28:09] >> It was literally just interweaving all

[28:11] the design decision all over the doc.

[28:13] And

[28:14] >> so that's that's how you were able to

[28:15] get it from the larger to the smaller

[28:18] even though you're saying

[28:19] >> here are like discuss all these

[28:21] decisions in more depth.

[28:23] >> Exactly.

[28:23] >> Because you're splitting it out into two

[28:25] different ones.

[28:27] >> Exactly. And like now if you read the

[28:28] spawn doc I'll show you what it starts

[28:30] off with. It still has a motivation

[28:32] section cuz every time you propose a

[28:33] language feature, there should be a a

[28:35] user value here.

[28:37] >> It very much highlights function

[28:39] coloring as like a very top level

[28:40] priority that we have, which is we don't

[28:42] want function coloring.

[28:44] >> Um, and then it just starts off with the

[28:46] very simplest forms and the na um you're

[28:50] not keeping all the versions. So, I'll

[28:52] talk about versions and how we deal with

[28:53] versions in a second. We talk about the

[28:55] simplest spawns and all the name spawns.

[28:58] >> Mhm. And then we literally just start

[28:59] off with every single design decision

[29:01] and we talk about why. Uh like when do

[29:04] spawns start? Do spawns start when you

[29:06] hit a wait or do spawn start immediately

[29:08] as soon as you spawn? That's a choice

[29:10] >> or do spawn start explicitly when you

[29:12] hit dot start right like threads don't

[29:16] start often until you hit start

[29:19] >> uh in a lot of libraries. But in our

[29:20] case we've decided that spawns actually

[29:22] start completely immediately as soon as

[29:24] you hit spawn because why wait? Um a

[29:27] future is sharable. So once you have

[29:28] futures, you can actually like await

[29:29] something twice. It's item potent. It

[29:31] gives you the same exact response.

[29:33] Futures actually outlive their spawners.

[29:35] So you can have a future that gets

[29:36] returned by a function. Why? Well,

[29:39] that's just useful for marinating

[29:40] paradigms like map functions will do

[29:42] this. If you want to take an array of

[29:44] URLs and like run them all in parallel,

[29:46] well, you make a future.

[29:49] >> Um, we had a choice. Do we want a weight

[29:51] to be in front of the thing or do we

[29:52] want a weight to be a postfix like f.8

[29:54] Oh wait, like Rust style

[29:56] and like our target audience is Python

[29:59] and Typescript devs. So we prefer

[30:01] looking like TypeScript. But if a lot of

[30:03] people end up doing a do have like

[30:05] chained awaits which often like if

[30:07] you're writing like

[30:09] you'll run into this if you write a web

[30:11] system which is like await fetch

[30:15] dot uh JSON await. you have to like

[30:20] double catch your awaits over here if

[30:21] you do this because the first one gets

[30:22] like the metadata and the second one

[30:24] actually gets a payload.

[30:27] >> But like that's like one edge case. So

[30:29] we're okay with that pain since it's

[30:30] already familiar to Python and

[30:32] TypeScript apps. Um await rethrows

[30:35] errors from futures. So if a future has

[30:37] an error, a wait just throws the error

[30:38] of the future and it's completely type

[30:40] safe.

[30:42] Um cancellation is a panic. So one of

[30:45] the things in the BAML language that we

[30:46] have is errors are completely type- safe

[30:48] and we infer whatever error message

[30:50] error type a function can throw

[30:52] regardless of you doing that. The

[30:55] problem with inferring error messages

[30:57] and having like exhaustedness on errors

[30:59] is it's very easy to have a wild card

[31:03] accidentally uh like hide a

[31:05] cancellation.

[31:07] >> So we have two kinds of error messages.

[31:09] One is like an error that you deal with.

[31:11] one is an error that you

[31:14] um that you kind of have to like

[31:16] explicitly catch. If you want to avoid

[31:18] cancellations, you have to explicitly

[31:20] say no, if I get a cancel signal, ignore

[31:23] it and give me this value instead. But

[31:25] by default, it'll just get rethrown.

[31:29] Um cancellations when cancellations

[31:31] happen, when a points happen. But I

[31:33] think the big difference you can see,

[31:34] let's see if I can pull this doc side by

[31:35] side. One big thing that you should be

[31:37] able to hopefully see almost immediately

[31:40] is like just like how this doc starts

[31:43] versus this one.

[31:44] >> Um, and like almost immediately there's

[31:47] way less pros. I think I'm zoomed in

[31:49] more in one of them, but I'll zoom out

[31:50] so it's the same size. Almost

[31:52] immediately there's way less crows.

[31:56] Um,

[31:57] >> there's the uh mental model is kind of

[32:00] like garbage, so I got rid of that. The

[32:02] motivation is way thinner and way easier

[32:04] to read.

[32:05] uh in my opinion, it's just less text

[32:07] like size-wise.

[32:10] >> And then it starts off directly with

[32:12] like just like the very very basic

[32:14] example

[32:15] talks about the most common use cases,

[32:17] the fact that you can name stuff for

[32:19] debugging use cases. Um um and then it

[32:23] goes straight towards like like the

[32:25] previous example just started talking

[32:27] about middleware. Well, why are we going

[32:29] to middleware right away? we should talk

[32:30] about the design decisions that we

[32:31] actually made and it's way easier for

[32:33] someone that's just skimming to digest

[32:34] it.

[32:35] >> Yeah, I think it's it's important to

[32:37] remember that the models tend to read

[32:38] this a lot like a human would, right?

[32:40] And so if you just jump into the kind of

[32:42] an immediate rest, you start with

[32:44] something very specific and you don't

[32:45] have this like layered top- down

[32:47] approach, it's going to be a lot harder

[32:49] for the models to understand

[32:51] >> exactly implement. So we spend a we

[32:52] spend a lot of time this thinking about

[32:54] how we're going to go have a model think

[32:56] through this. And once it helped,

[32:58] >> this is probably one of the most complex

[32:59] design docs we've done to date,

[33:01] >> which is why it's very different. But we

[33:03] did have a set cancellation if anyone's

[33:05] ever tried is a really really hard

[33:07] concept to go model. But for us, we know

[33:10] our target audience. It's people like

[33:12] Evolution IQ who are building massive

[33:13] agentic workflows. Well, we know the

[33:16] default here, which is if you're

[33:18] actually going to go ahead and cancel

[33:22] like I'm an app developer. I spawn an

[33:24] API that I I spawn some library code

[33:27] that does deep research and spawns like

[33:29] 500,000 agents to go do stuff and

[33:32] something comes back to me and gives me

[33:34] a result faster. I kind of want to

[33:36] cancel all the work that that that

[33:38] research started and just kill it and

[33:41] who cares what that thing said. And so

[33:42] cuz before API calls didn't really cost

[33:47] money.

[33:48] >> Yeah.

[33:50] >> And now like every API call

[33:52] >> it's a tool use. Yeah,

[33:53] >> it's a tool. Uh, exactly. It's money.

[33:56] So, you kind of want the right to be in

[33:58] the app developer hand to decide when

[34:00] they cancel work. And I think at the

[34:02] bottom we talk about like prior art and

[34:06] what happens here.

[34:08] >> Mhm.

[34:09] >> Um, oh, it's not enough detail. Okay.

[34:12] So, this is like one quick readout here.

[34:14] I immediately see that this prior art

[34:16] section is very weak. So, what I would

[34:18] do is I'd say I want a subpage on prior

[34:20] art about design decisions that we made

[34:22] on a board controller, for example. Like

[34:25] a board controller is probably the best

[34:26] example. So, let's I'll show you exactly

[34:27] what I'm going to do. This is pretty

[34:29] good, but the biggest miss here is a

[34:32] lack of understanding for the end user

[34:34] on why we didn't go with explicit

[34:37] cancellation tokens. For example, like

[34:39] go or controller in Typescript.

[34:42] Obviously, there's a syntactical error

[34:44] and both languages have made different

[34:46] trade-offs. In the case of Go, every

[34:48] function has this thing called ctx. So,

[34:51] if you're layering things through like

[34:52] 17 different layers of functions, every

[34:54] single one of them well now has to carry

[34:56] ctx and pass it down. While this is

[34:59] technically more explicit, it is a

[35:02] burden for app developers that are first

[35:04] being welcomed into the language to just

[35:06] have to know this magic parameter and

[35:09] they later learn that it's about

[35:10] cancellation. and we want to avoid that

[35:12] burden. On the second hand, TypeScript

[35:15] has a different philosophy. There is no

[35:16] philosophy around passing in a cancel

[35:19] token. So 99.99% of the time, no one

[35:22] uses an abort controller and no APIs in

[35:25] Typescript are ever cancelable by

[35:27] default. And no library has cancellation

[35:29] semantics really built in. And we don't

[35:32] really want to be in either of those

[35:33] worlds. So we prefer the the implicit

[35:35] cancellation of Python, for example.

[35:38] You'll notice that I'm not actually

[35:40] trying really hard to teach the model

[35:42] anything here. I'm very explicit in

[35:44] these in this learning. Uh make this a

[35:48] subpage. I'm very explicit in the

[35:50] learning here. Uh because what I don't

[35:52] want to do by accident is I don't want

[35:56] the model to really make its own

[35:57] inference. I will ask it about its own

[35:59] inference once it's done. But I wanted

[36:02] to really capture the thing from the

[36:04] design discussion that we had more true

[36:06] to myself,

[36:07] >> but I'm not going to put it in the main

[36:09] read me. I'm going to make a separate

[36:10] subpage about this because I know for

[36:12] someone that's new to

[36:15] uh reading the this beep. They will

[36:17] probably prefer like why we didn't pick

[36:19] existing semantics in a whole different

[36:21] page because it is somewhat nuanced and

[36:23] detailed. And we likely want code

[36:24] samples about this. We've got a couple

[36:28] questions come through in the chat. So,

[36:31] one is about versions of all these

[36:33] different documents. Do you keep the

[36:34] different versions? Models go nuts when

[36:36] they see multiple versions of something.

[36:38] >> Yes. So, we actually have two different

[36:40] ways of working with beeps. Um,

[36:43] one is this what I showed you where you

[36:45] download all the beeps and you work off

[36:46] of them. Um, because you kind of often

[36:48] need context of other beeps to design

[36:51] other beeps.

[36:52] >> Mhm. Um the beeps are not usually

[36:54] designed in independence but the other

[36:57] approach we have is actually this

[36:58] approach. Let's say I'm uh we're working

[37:00] on reflection for example actually this

[37:01] is approved

[37:04] uh we're working on reflection. You'll

[37:06] notice that we do have versions built

[37:07] in. Actually let me pick one that

[37:09] actually had a lot of versions

[37:11] patterns. We're working on pattern

[37:12] syntax. There's seven versions on this

[37:14] beep. Every single version of this beep

[37:16] has its own comment chain. Has other

[37:18] things driven by it. There's a quick

[37:20] little thing to remind you, you're on an

[37:21] older version. Uh, you can't edit

[37:23] comments on old versions. They're read

[37:26] only. You can't see them ever again.

[37:29] Uh, but if you export this beep, I'll

[37:32] show you what we do. We actually, when

[37:33] you export just a single B, you actually

[37:35] get all the versions baked in place.

[37:38] >> Uh, you also get all the discussions and

[37:40] all the questions that people have and

[37:41] you get all the comments and everything

[37:43] baked into agent context.md.

[37:46] >> That is very cool. So,

[37:47] >> so sometimes if you're working on a map

[37:49] and you want to refer to other versions,

[37:50] then you have to go through this

[37:51] workflow. Ideally, we can merge the

[37:53] workflows, but this is the problem with

[37:55] slot based design like you kind of have

[37:57] you kind of just do what you need to do

[37:59] at any given time to make it work.

[38:01] >> Um, but this is kind of the approach uh

[38:04] for like versioning. You do want

[38:05] versions. It's useful for humans. It's

[38:07] useful for agents. But the reason that

[38:09] we don't use git is because you often

[38:13] like one comment tracking is really hard

[38:15] on git uh for like various diffs once

[38:17] you start doing diffs and also we want a

[38:19] very linear history for our beeps. It

[38:22] needs to be like purely linear. You push

[38:24] to it and that's it. Um so the

[38:27] versioning story is slightly simpler and

[38:30] that's what works for us at least. We

[38:32] might switch to a git based approach

[38:34] eventually

[38:35] um but at least for now this works well.

[38:37] Yeah, I I'm curious how much because

[38:40] we're spending a a lot of time and this

[38:42] is kind of what we talked about up front

[38:43] with how important it is really really

[38:45] getting a good design doc now because

[38:47] you can almost oneshot it. Maybe not

[38:48] with threading but how how much more

[38:52] time would you say you've spent now

[38:55] doing this kind of work than you know 2

[38:57] 3 years ago?

[38:59] >> I think I'll show you an example of a

[39:01] beep that I would not have written in

[39:03] nearly as much detail without without

[39:05] this. Um, one of the things our our

[39:07] middleware BEP for example,

[39:10] >> I want to show how many examples we have

[39:12] in the middleware. Our middleware BEP,

[39:15] which is like a way to add middleware

[39:16] into the system. Like you want to say

[39:18] that this scope of code has a cost limit

[39:20] of $5. That'd be nice to have

[39:23] >> like don't spend more or like hey use a

[39:24] cloud use like the cloud SDK with the

[39:27] string passed in

[39:29] >> or run like a retry with a timeout on

[39:31] this fetch. Um, it's kind of like our

[39:34] middleware

[39:35] >> BE

[39:36] >> and I want to show like how complicated

[39:38] and we talk about all sorts of things

[39:39] like why don't you do wrapper functions

[39:40] and everything here too.

[39:42] >> Um, but when we write this

[39:46] one of the expectations we have is like

[39:48] this prior art I want to see code

[39:50] snippets of like real systems and I just

[39:53] I would have been lazy. I would have

[39:54] said express has this. I would have said

[39:56] Python decorators have this and Python

[39:58] decorators I know off top of my head as

[39:59] well write the code. Uh I but I no way

[40:02] would have found like the poly.net

[40:04] mechanism of writing middleware. I don't

[40:06] know. Net so it's just not something I

[40:08] think about. Um so I think there's small

[40:11] things like this that would have made a

[40:12] big difference. And then and when you

[40:14] actually go down

[40:17] like I wrote all sorts of middleware

[40:18] here to prove that it works. I wrote

[40:20] like a with retry retry and I actually

[40:22] wrote out all the code. Then I went

[40:24] ahead and implement the timeout and

[40:26] timeout uses spawn and because I have

[40:28] all the beeps in context it can actually

[40:30] go do that and write how timeout would

[40:32] be written. Then I wrote timing. Then I

[40:35] wrote fallback. Then I did composition.

[40:38] But then I started doing more advanced

[40:40] things. What if I want a retry that has

[40:43] a backoff of a certain type or you have

[40:45] exponential backoff or like jitter or

[40:48] constants?

[40:49] Um I'll if you want to read the beeps

[40:52] you should go to beeps.boundaryml.com.

[40:53] boundaryml.com.

[40:54] If you want to find uh if you want to re

[40:57] see the beep repo that's in the baml

[40:59] repo we have a monor repo pattern but

[41:02] then I did selective error handling.

[41:03] What if I want to retry on only on

[41:05] certain errors?

[41:06] Well like now you can pass this in and

[41:08] your code looks like this. You do a you

[41:10] you're running this code called fetch

[41:12] with this API named this section of code

[41:14] named fetch with API calls. It has a

[41:18] retry of three and it'll only retry

[41:20] timeout error rate limit error.

[41:21] everything else will not retry on and

[41:22] just throw the exception. So like

[41:23] authentication errors will not run the

[41:26] retry loop.

[41:28] Um and then you we built a circuit

[41:30] breaker which is like it's kind of like

[41:32] a rate limiter but slightly different.

[41:33] You can look into the pattern later if

[41:35] you're curious. Then we built a rate

[41:37] limiter. Um then we went further and

[41:40] said how do you compose different

[41:41] compositions here? And just this level

[41:44] of example building is just not

[41:46] something I would have ever done before.

[41:48] There's like zero time I would have

[41:50] spent on like

[41:51] >> doing this. I was like, I built a

[41:52] caching system. I want to say like, hey,

[41:54] run this block of code with a cache with

[41:56] this key.

[41:58] And again, I would kind of know it

[42:00] works, but the point of discovery for

[42:03] whether or not there's a bug here would

[42:04] be much later rather than earlier. I'd

[42:07] discover it during implementation, be

[42:09] like, "Holy cow, we have to redesign

[42:10] this thing."

[42:11] And I like the basically the best

[42:15] engineers would make less skill issue

[42:18] problem would have less skill issue

[42:20] problems. So their implementations would

[42:21] be better because their intuition is

[42:23] better.

[42:24] >> Mhm.

[42:25] >> But now like everyone everyone's median

[42:28] kind of rises in my opinion and your

[42:30] median is so much better than it used to

[42:31] be.

[42:32] >> Right. For sure.

[42:34] >> That's fascinating.

[42:36] >> How much time do you spend on writing

[42:37] beeps? I spend like or not beeps but

[42:39] like writing design docs. I spend a lot

[42:41] of time like writing design docs and

[42:42] plans for almost all of my work now.

[42:44] It's like

[42:45] >> 50%

[42:46] >> I think. Yeah, I would say I would say

[42:48] it's more than 50%.

[42:50] Most of my time I spend writing docs,

[42:53] coming up with plans. I like to keep it

[42:55] I heer on the side of more detail. Um

[42:57] and I think it's similar to kind of you

[42:59] know what we've seen. I'm not going into

[43:00] more detail than you're threading one,

[43:02] but

[43:05] I I spend most of my time reading design

[43:08] documents and plans and iterating on

[43:11] them and um because the code you kind of

[43:14] just again if it's good enough, you can

[43:17] kind of just oneshot it. So you just

[43:18] send the design doc and the code kind of

[43:19] writes itself and then you review the

[43:21] code and or and then and then you merge

[43:24] and then you're done.

[43:26] >> Yeah. So now that the the job of hands

[43:30] on keyboard typing code is kind of just

[43:32] been

[43:33] >> solved,

[43:36] >> we I have a lot more time to do to write

[43:38] these design docs and it's so much more

[43:41] important to do that since you're not

[43:43] writing the code. You have to, you know,

[43:45] if you're giving instructions to someone

[43:46] how to do it, all the stuff that's kind

[43:48] of in your head that you or assumptions

[43:51] that you've made, you have to make sure

[43:52] is really explicit in the doc. And it

[43:54] also helps question

[43:56] >> And it also helps um question your

[43:58] assumptions, right? Like it comes up

[44:00] with

[44:02] >> it finds that you're assuming different

[44:04] design patterns and things like that

[44:05] that you didn't realize you you didn't

[44:07] even realize that you were assuming and

[44:09] that that might not be best.

[44:10] >> Yeah, exactly. Like the cost limit one

[44:12] is kind of interesting. When I was doing

[44:13] the middleware, I was like, "Oh, I want

[44:15] to build a cost limit here where I just

[44:16] say like this thing runs and I want to

[44:18] spend at most $5 here." Well, in order

[44:21] to implement this, you have to implement

[44:22] a thread local variable. Like you just

[44:25] need thread local storage. There's no

[44:26] way around that.

[44:27] >> Mhm.

[44:28] >> Well, if you're going to do that, well

[44:29] then like there's really not much around

[44:32] this except doing that. And in order to

[44:36] go make that happen, well then it's kind

[44:37] of your responsibility to discover this

[44:40] problem. And it might have been

[44:41] impossible for me to have thought about

[44:43] that really hard and said like oh oh

[44:45] holy holy cow we actually have thread

[44:47] local storage

[44:49] >> and like

[44:50] >> but LMS like LMS will write every piece

[44:53] of code that you ask them to. You will

[44:54] you can say I ch I want you to challenge

[44:57] me with what should not be possible in

[44:59] this design but is going to actually be

[45:01] done here. I think this is also

[45:03] something that you brought up in a

[45:04] previous episode where you and Dex were

[45:06] talking about. Um, it was if if you

[45:10] don't if you just tell the LLM

[45:12] something, it's going to assume you're

[45:13] correct because they've been trained to

[45:15] to to basically to trust you and that

[45:17] you have context that they don't. And so

[45:19] something that's really helpful is is

[45:20] almost like a here's what I'm thinking

[45:23] for something, but I'm not sure what

[45:25] other ideas do you have for this design

[45:27] pattern or this part of the system. I

[45:29] found that to be very very helpful

[45:31] because it will just assume what you're

[45:32] saying is correct and then it'll

[45:34] implement it when it may not be.

[45:36] >> Yeah, exactly. I think someone asked

[45:38] like how do you how do you keep track of

[45:40] everything in your head uh while you go

[45:42] do this? The answer is like one get

[45:43] good. But two real answer is not get

[45:46] good. The real answer is build tooling

[45:48] so that you don't have to keep track of

[45:49] everything in your head.

[45:50] >> Like

[45:51] >> the fact that we built this tooling let

[45:53] you download every beep and go do this.

[45:55] I don't keep track of everything. I

[45:57] write the BEP and I literally say, can

[45:58] you go check every other implemented BEP

[46:00] and see if we are if we're consistent

[46:03] with it and if the syntax is correct and

[46:05] if there's any like weird interactions.

[46:07] I do try and like have my own model of

[46:10] it, but these things are nuanced and

[46:11] they make a lot of mistakes very easily.

[46:14] Sam on our team just make it a really

[46:15] good suggestion. We used to name our BEP

[46:18] folders with just the numbers

[46:21] and now we don't. Now we name them with

[46:23] numbers plus the name because if you do

[46:25] ls and the model does ls, it sees

[46:28] >> exactly what dep is without having to

[46:30] read anything.

[46:31] >> Um, and just constantly reinforces where

[46:33] it has to go do the work. So I think

[46:35] there's small kinds of tooling that you

[46:36] can build along the way to make this

[46:38] really really helpful.

[46:40] But I mean that's it for today's

[46:42] content. If you guys have more

[46:44] questions, happy to stay on and help

[46:45] answer them after the fact. But I think

[46:47] that's it. Kevin, thank you for joining.

[46:49] >> Yeah, thank you so much. Hopefully you

[46:52] guys got some interesting insight on the

[46:53] tooling. If you're interested in

[46:54] checking out, go to beps.boundml.com. Or

[46:56] if you want to go read how the code

[46:58] works or don't read how the code works,

[47:00] ask Claude to read how the code works.

[47:01] Uh check out a GitHub repo and ask it to

[47:04] the uh check out uh GitHub and ask it to

[47:07] like ask Cloud to say where where's the

[47:08] beeps folder and how do I run it? It'll

[47:10] get you set up and it should do

[47:12] everything for you.
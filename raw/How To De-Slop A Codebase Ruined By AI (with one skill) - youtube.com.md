---
title: "How To De-Slop A Codebase Ruined By AI (with one skill)"
author: "Matt Pocock"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=3MP8D-mdheA"
date_saved: "2026-04-30T02:41:47.635Z"
---

# How To De-Slop A Codebase Ruined By AI (with one skill)

[0:00] You've probably seen the thousands of

[0:01] LinkedIn CEO posts saying that code is

[0:04] cheap and they can move faster than ever

[0:06] before. But what's happening is that AI

[0:09] has simply accelerated software entropy.

[0:11] In other words, code bases are falling

[0:13] apart faster than they ever have before.

[0:16] Because every time that you make a

[0:17] change that doesn't take into account

[0:18] the entire codebase, you are likely to

[0:21] introduce little things, weird things

[0:23] that make the codebase harder to change.

[0:25] And over time, that just snowballs and

[0:27] snowballs until you end up with a huge

[0:29] ball of mud. Sloppy, sloppy mud that is

[0:32] incredibly hard to reverse if you don't

[0:35] know how to do it. I've made a video

[0:36] about this before, introducing folks to

[0:38] the idea of deep modules. And that video

[0:40] focuses more on prevention, how you can

[0:43] prevent your setup from getting to that

[0:45] point. Let's now focus on the cure. How

[0:47] you can take a codebase that feels like

[0:49] it's beyond repair and rescue it. And

[0:51] you can do that with some good old

[0:53] software fundamentals as well as my

[0:55] improve codebase architecture skill.

[0:57] We're going to be walking through what

[0:58] this skill does, revisiting some of the

[1:00] terms we looked at in the other video,

[1:02] and then we're going to take that and

[1:03] apply it to a real codebase. And this,

[1:05] by the way, is part of my GitHub skills

[1:07] repo, which is currently sitting at

[1:09] 41.5K stars. Bonkers. Now, one of the

[1:12] things that I added to this improve

[1:13] codebase architecture skill recently was

[1:16] a glossery of terminology. Having a

[1:18] shared vocabulary with the AI is super

[1:20] important because it means that you can

[1:22] talk using the same language. You can

[1:24] understand what each other's language is

[1:27] and you can be a lot more precise with

[1:29] what you're asking for. This terminology

[1:31] here is super duper useful and I'm going

[1:34] to spend a portion of this video going

[1:35] through what each of these terms

[1:37] actually mean. Honestly, just

[1:38] understanding this stuff at a deep level

[1:39] will make you a better software

[1:41] developer. So, let's get started by

[1:43] talking about modules. A module is a

[1:45] unit of something in your application.

[1:48] It could be a bunch of React components

[1:50] that all fit together to form a page. It

[1:52] could be a bunch of functions inside

[1:54] your application that are entirely

[1:55] responsible for authentication. Or it

[1:57] could simply be the logger that you've

[1:59] chosen, like a log to the console, log

[2:01] into a file, or log into a third party

[2:03] service. In a good codebase, these

[2:04] modules talk to each other, and they

[2:06] talk to each other via their interfaces.

[2:08] An interface is everything a caller must

[2:10] know to use the module correctly. For

[2:12] instance, if it's an authentication

[2:13] module, then it might have a sign in

[2:15] method. It might have a sign out method.

[2:17] And these methods are the interface to

[2:19] that module. The methods are not the

[2:21] only thing that's important. The

[2:22] interface also includes kind of nebulous

[2:24] information about how to call the

[2:26] module. So perhaps it's documentation

[2:28] too. The implementation is then what's

[2:30] inside the module, what it actually does

[2:32] when you call sign in or sign out. And

[2:34] so this is the core primitive that we're

[2:36] talking about, the modules that have

[2:37] interfaces and implementations scattered

[2:39] throughout your application. These

[2:40] modules can either be deep modules or

[2:43] they can be shallow modules. A deep

[2:45] module hides lots of implementation

[2:48] behind a relatively simple interface. A

[2:50] shallow module has a complex interface

[2:53] and kind of not much implementation

[2:55] actually behind it. These ideas are from

[2:57] John Asterout's book, A Philosophy of

[2:59] Software Design, which I recommend you

[3:00] pick up a copy of. Deep modules are

[3:02] considered better than shallow modules

[3:03] because it hides more information away

[3:05] from the caller. In other words, the

[3:06] person who's calling this or the

[3:08] function that's calling this only needs

[3:09] to know about this tiny little interface

[3:11] and they'll get access to all of this

[3:13] implementation. Lovely. And so that's

[3:14] what we describe as depth. The amount of

[3:16] behavior a caller can exercise per unit

[3:19] of interface that they have to learn.

[3:21] Really good open source libraries like

[3:22] uh Tanstack query or something have

[3:25] really good deep modules. In other

[3:27] words, they're hiding a lot of

[3:28] complexity behind a super simple

[3:30] interface. These modules then interact

[3:32] with each other and they have

[3:33] dependencies on each other. For

[3:34] instance, this module might interact

[3:36] with this module here, which then

[3:38] interacts with this module up here and

[3:40] this module up here. And they have these

[3:42] dependency graphs between them. These

[3:43] gaps between these modules are called

[3:45] the seams. It's the location at which

[3:48] the module's interface lives inside the

[3:50] application. These seams are usually

[3:52] where you're going to do your unit

[3:53] testing or your integration testing. For

[3:55] instance, if we wanted to test this

[3:57] module in isolation down here, then we

[3:59] would add a mock or something just at

[4:02] this seam. So figuring out where your

[4:04] seams are going to live in your

[4:05] application is crucial to getting a good

[4:07] architecture. When you find out where a

[4:08] seam is in your application, you need

[4:10] some concrete thing, a module that

[4:12] satisfies that interface. This is what

[4:14] I'm going to call an adapter, which I'm

[4:16] taking from hexagonal architecture. For

[4:18] instance, if you have some kind of

[4:19] application that depends on a clock

[4:21] running, then you may want to have a

[4:24] clock, a normal clock inside here using

[4:26] the actual living clock. And then inside

[4:28] some tests, you may want to have an

[4:30] adapter that is a fake clock. These both

[4:32] satisfy the interface at that seam. And

[4:34] it means that you can use the fake clock

[4:36] in tests. So you don't have to literally

[4:38] wait 2 weeks for your test to finish. So

[4:40] that's how seams and adapters play

[4:42] together. The benefit of all this is

[4:44] that these deep modules have two main

[4:47] properties or two main benefits that you

[4:48] get from them. But the maintainers, the

[4:50] people maintaining this module, they get

[4:52] locality changes to that module and bugs

[4:54] and all the fixes to do with them. They

[4:56] concentrate in one place in that deep

[4:59] module. If it's scattered around over

[5:01] multiple different modules, then you

[5:02] have low locality. You want high

[5:04] locality, grouping and colloccating the

[5:07] things that matter and that often change

[5:09] together. The people using this module

[5:11] will get more leverage the deeper the

[5:13] module is. In other words, more

[5:14] capability per unit of interface they

[5:16] have to learn. And so when we're talking

[5:18] about improving our code bases, these

[5:20] are the two attributes that we're aiming

[5:21] at. Right? That's enough knowledge. We

[5:23] know the basic terms of engagement. Now,

[5:25] let's go and improve a codebase. The

[5:27] codebase we're going to look at is my

[5:28] course video manager codebase, which is

[5:31] the repo of software that I'm actually

[5:33] using to record this video. This

[5:35] codebase has had around 1,500 commits

[5:38] here. And I wouldn't say it's a ball of

[5:40] mud, but I also wouldn't say it's

[5:42] perfect either. It's a React router

[5:43] application. It uses effect.ts under the

[5:45] hood. Uh, let's get into it. I'm going

[5:47] to open up a new clawed session inside

[5:49] here, and I'm going to run my improve

[5:51] codebase architecture skill. I'm going

[5:53] to turn off auto mode. Auto mode does

[5:55] some funny things with these human in

[5:56] the loop style flows and so I don't want

[5:58] it on here. We can see it's going and

[6:00] exploring and looking through the code.

[6:02] That's what it's instructed to do first.

[6:04] Here we go. Explore architecture for

[6:06] deepening opportunities. Usually a bad

[6:08] codebase is one that has a ton of

[6:10] shallow modules in it or one that has

[6:12] very poor leverage for those modules or

[6:14] poor locality where lots of stuff is

[6:16] spread in lots of different places.

[6:18] Okay, it's come back with some

[6:19] candidates here. Let's bump up the

[6:21] screen size and hopefully Claude code

[6:23] won't just destroy itself. Okay, I guess

[6:25] maybe we're not bumping up the screen

[6:27] size. Thank you for that, Claude Code.

[6:28] We can see it's identified six deepening

[6:31] opportunities here. These candidates

[6:32] here are pretty hard to explain because

[6:34] they sort of require domain knowledge

[6:35] about my repo. But we can see here that

[6:37] it's saying that there's a concept that

[6:39] doesn't have a single seam. In other

[6:41] words, there are two implementations of

[6:43] this insertion point and they live in

[6:45] parallel. And the seam where they must

[6:46] agree is untested. This essentially

[6:49] means that the front end could make some

[6:50] changes um but the back end because it

[6:53] has a separate parallel implementation

[6:55] could be out of sync with it. So this I

[6:57] think is actually a really good

[6:58] candidate for refactoring into a single

[7:00] module. We gain locality and it says

[7:02] that here we would gain locality. The

[7:03] interleaf clip clip section ordering

[7:05] rule lives in one place. So let's go and

[7:08] take a look at that. Let's actually say

[7:10] yeah I'd like to pick one here. That

[7:12] seems like a good candidate. So let's

[7:14] fire that off and see what it says.

[7:15] Okay, Claude is trolling me here. It

[7:17] says I'd like to pick one. I meant I

[7:19] meant one. Great. Okay. So, it now has

[7:23] come back with it's got concrete code on

[7:24] both sides to to ground this. And it

[7:26] enters a grilling session. And in this

[7:28] grilling session, we can take the ideas

[7:31] inside here and we can start kind of

[7:33] talking about what a better solution

[7:34] would be. This is a nice sentence here.

[7:36] The back end has no end. Let's not think

[7:39] about that too literally. What you end

[7:40] up doing with this skill is you end up

[7:42] talking about the potential proposed

[7:44] solution and it will then propose a

[7:46] shape. And once that's all done, you can

[7:48] take that and you can put that in as a

[7:50] GitHub issue into your issue tracker

[7:52] which can then be picked up by an AFK

[7:54] agent. You should check out my video on

[7:55] San Castle if you're interested in that.

[7:57] Now, in the course of normal

[7:58] development, what I would do is go

[7:59] through and thoughtfully answer each of

[8:02] these questions in turn. But since I'm

[8:03] doing a video and this is slightly

[8:05] artificial, I'm going to say, could you

[8:07] just choose your recommended answers for

[8:09] each of these questions? And that should

[8:11] speed us through to actually making the

[8:12] change or potentially creating an issue

[8:14] out of this. So, it's now coming back

[8:16] with a proposed module shape. And it's

[8:17] also asking to verify a particular part

[8:20] of the implementation where end is

[8:22] collapsed and to sketch the actual

[8:24] TypeScript interface. Yeah, go ahead and

[8:26] do both. That sounds great. Let's ping

[8:27] that off and see what it says. Okay, it

[8:29] has figured out uh the implementation

[8:31] detail it needed and it's come back and

[8:33] proposed a design here. So each of these

[8:35] functions are going to be essentially

[8:37] the uh the interface for this module.

[8:39] And so we can talk about this with the

[8:41] AI and figure it out. It's again come

[8:43] back with two design decisions that it

[8:45] wants my feedback on. And here I think

[8:47] you've got the flavor of how this skill

[8:49] works and the kind of conversations that

[8:51] you end up having with the AI based on

[8:53] this. If I want to turn this into an

[8:54] issue that my AFK agent picks up, I can

[8:56] use two PRD or two issues here. And by

[9:00] the way, if you're interested in these

[9:01] skills that I'm talking about, then you

[9:03] should check out this site here, which

[9:05] is linked below. I'm going to be

[9:06] creating a real documentation site for

[9:08] these skills. And for now, I have a

[9:10] newsletter that you can sign up to for

[9:11] the latest updates, as well as tips and

[9:13] tricks and resources for getting the

[9:15] most out of agents. The thing that's

[9:17] important to notice here is just how

[9:19] much this skill demands of you, the

[9:21] user. This is not an AFK skill that you

[9:23] can just sort of run and kind of like uh

[9:25] just rely on to continually improve your

[9:28] codebase. This requires a judgment call

[9:30] from you, the programmer, sitting above

[9:32] the LLM. I think of agents as really,

[9:34] really good tactical programmers.

[9:37] They're able to get on the ground and

[9:39] make changes quickly, but they need

[9:40] someone on the level above them who is

[9:42] the strategic programmer. And that's

[9:44] what this skill does. It allows the

[9:46] sergeant to go and run around the

[9:48] codebase and look for potential

[9:49] improvement um opportunities, but then

[9:52] you the general have to go and actually

[9:54] make the change and decide what's good

[9:56] for the long-term health of the

[9:57] codebase. I recommend that you run this

[9:58] skill, you know, every couple of days

[10:01] really, especially in a codebase that's

[10:02] fastmoving, you're going to come up with

[10:04] tons of opportunities for deepening the

[10:06] codebase. And the deeper you get those

[10:08] modules, the higher leverage you're

[10:10] going to get out of them. And leverage

[10:11] as well means testing. If you have a set

[10:13] of really nice clear seams in your

[10:16] codebase, then you're going to be able

[10:17] to write really nice tests around those

[10:20] nice deep modules. And the better your

[10:21] tests are, the better the output from

[10:23] the agent is going to be. One final

[10:25] thought here is that lots of folks ask

[10:26] me how you would get started by using AI

[10:30] in a legacy codebase. And a legacy

[10:31] codebase is probably going to have a lot

[10:33] of shallow modules. Is I mean, we talk

[10:35] about legacy code bases. What we really

[10:37] mean are bad code bases. Code bases that

[10:39] are hard to make changes in. And what

[10:42] you really need before you start making

[10:43] changes in a legacy codebase is a

[10:45] harness around the codebase to make sure

[10:48] that your changes don't mess anything

[10:49] up. So for that you need tests testing

[10:52] really nice deep modules that have a lot

[10:55] of leverage and locality. So running

[10:56] improved codebase architecture is a

[10:58] great place to start. Thanks for

[11:00] watching folks and I hope that answers

[11:01] some of your questions about how to

[11:03] solve this neverending problem of AI

[11:06] just running away and creating terrible

[11:08] code bases. I hope you enjoy the skills.

[11:10] Do follow the link below if you want to

[11:11] find more of them. So, thanks for

[11:12] watching and I will see you in the next

[11:14] one.
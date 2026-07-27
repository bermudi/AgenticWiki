---
type: youtube
url: https://www.youtube.com/watch?v=n0VhIVtviC0
title: "Don't waste time on specs: /prototype instead"
channel: "Matt Pocock"
date_saved: "2026-07-27T02:03:06.879Z"
---

# Don't waste time on specs: /prototype instead

[0:00] There's something that a lot of people

[0:01] do when they're working with AI to

[0:02] create code that totally drives me

[0:05] crazy. And it's sort of something that

[0:08] I've been railing against for a while

[0:10] now. The thing that I've noticed is

[0:12] people tend to think I need to create a

[0:14] spec for AI. I need to create a plan,

[0:17] right? Plan mode, spec-driven

[0:19] development. I need to put all of my

[0:21] efforts into making this extremely

[0:23] detailed spec so that when I get some

[0:25] outputs from the AI, those outputs are

[0:27] going to look like the spec. I'm going

[0:29] to have specified everything up front so

[0:31] that I can just perfectly nail it. And

[0:33] in this impulse, what they forget to do

[0:35] is they forget they can actually write

[0:37] code. You can write code while you're

[0:40] working towards a spec. Prototyping and

[0:43] spikes are things that we've had around

[0:45] since the days of Agile, right? I mean,

[0:47] I suppose these are still the days of

[0:49] Agile. Agile is still extremely popular,

[0:51] still extremely influential. But people

[0:53] just aren't prototyping anymore. And so,

[0:55] as part of my skills repo, I'm trying to

[0:57] turn this around. I have a prototype

[0:59] skill. A prototype is throwaway code

[1:02] that answers a question. Everyone is

[1:04] saying that code is cheap, and it's

[1:05] partially true and partially I hate that

[1:07] phrase. But the thing that is cheap is

[1:10] the cost of producing code has gone way,

[1:12] way down. So, producing prototypes,

[1:14] producing quick kind of throwaway spikes

[1:17] has never been cheaper and never been a

[1:19] more effective tool. In this video, I'm

[1:21] going to introduce this prototype skill.

[1:23] I'm going to talk about when you should

[1:24] use it, what it can be used for, and

[1:26] also how it fits into my new wayfinder

[1:29] skill. But first, to explain the concept

[1:31] of fidelity, high fidelity and low

[1:34] fidelity. Whenever you're talking about

[1:35] designing something, you're going to

[1:37] have questions in your mind that need to

[1:39] be resolved somehow. Some of the

[1:41] questions are going to be really basic,

[1:43] like the basic frame of the thing you're

[1:45] building. When the modal opens up, it

[1:47] should have a cancel button and a

[1:49] confirm button, simple stuff. With

[1:51] simple stuff like that, you don't need a

[1:52] lot of high fidelity stuff to answer the

[1:55] question. That can just be resolved in

[1:56] discussion, really. But let's say that

[1:58] the modal, when it opens up, under some

[2:00] circumstances it needs to show some

[2:02] data, you might need to go a little bit

[2:04] of higher fidelity on that. How would

[2:06] you display the data? It's often hard

[2:08] when you're planning out a spec to

[2:09] figure out exactly how things should

[2:11] look, and how things should look, how

[2:13] they should behave under certain

[2:15] circumstances, making sure that you've

[2:17] road tested all of this idea in kind of

[2:20] semi working code, that means you need a

[2:22] higher fidelity. Some questions really

[2:25] can only be answered by prototyping. And

[2:28] because producing these prototypes is

[2:30] now cheaper than it ever has been

[2:32] before, I tend to want more of my

[2:35] discussions at a higher fidelity.

[2:37] Obviously, the basic stuff I'm going to

[2:38] just resolve through discussion. So, the

[2:40] agent is going to ask me some questions,

[2:42] probably through a grilling session, and

[2:44] then I'm going to say, "Okay, yeah, this

[2:45] sounds good." But then, as soon as we

[2:47] get anything that I think, "Oh, I really

[2:49] need to see this in action. I need to

[2:51] feel it in action, look at it working."

[2:53] I'm going to ask for a prototype.

[2:55] Prototyping is a part of my new

[2:57] Wayfinder skill, which is a skill that

[2:59] allows you to plan a huge chunk of work.

[3:01] There's a future video coming on

[3:02] Wayfinder. Now, Wayfinder, what it does

[3:05] is it tackles a huge chunk of work, and

[3:07] it splits it up into different planning

[3:10] sessions. And all of these planning

[3:11] sessions get their own ticket, and there

[3:13] should be somewhere in here ticket

[3:15] types, just here, that tells it exactly

[3:19] what different ticket types there are.

[3:20] The two that we're looking at here are

[3:22] the grilling type, so it's using the

[3:25] grilling skills, and the prototype

[3:28] ticket type. The default case here is

[3:30] the grilling type, so where you're

[3:31] chatting with the agent, figuring out

[3:33] the basic scope of the thing you're

[3:34] building. But when you need to raise the

[3:37] fidelity of the discussion, making a

[3:38] cheap, rough, concrete artifact to react

[3:40] to, an outline, a rough take a stab at

[3:42] UI logic code via the prototype skill,

[3:44] links the prototype as an asset, use

[3:46] when how should it look or how should it

[3:48] behave is is key question. Whether

[3:51] you're using Wayfinder not, this gives

[3:53] you a really clear criteria for when you

[3:55] should reach for a prototype. So, I'm

[3:57] sure you're dying to see it in action,

[3:59] and here it is. This is what it's done.

[4:01] I've been using Wayfinder to extend my

[4:03] diagramming app here, which is built on

[4:05] TLDraw. And I wanted a way to search

[4:07] through old diagrams, and the data model

[4:10] here is quite complicated. There's like

[4:12] diagrams and then snapshots of the

[4:14] diagram through time. And so, I wanted

[4:16] to build a search bar, but I wasn't sure

[4:18] how it should look or behave. So, I ran

[4:20] prototype here, and what it did is it

[4:22] created this little uh

[4:25] picker at the bottom here. And this

[4:26] picker, if I go between it, it has three

[4:29] different options. So, that's option B,

[4:31] and that's option C. And each one

[4:34] encodes a few design decisions that I

[4:36] can then react to and iterate on. So,

[4:38] let's start by looking at A. I've just

[4:40] generated this. I've not actually looked

[4:41] at it yet. So, I get to search the

[4:43] diagrams and see what comes up. And this

[4:46] one, okay, it's reflow in place grouped

[4:49] rows. So, it's grouping the snapshots by

[4:51] the name of the diagram. I really like

[4:54] the placing of the search box up here,

[4:56] but this grouping doesn't feel right to

[4:59] me. So, let's see what B is. Let's

[5:01] search again inside model here, and

[5:04] okay, now on the left, we have grouping

[5:07] for where it can filter down. Okay,

[5:09] that's quite nice. What happens if I

[5:12] search for something else and it's

[5:14] already Okay, so the filter resets at

[5:16] that point. Now, that's okay, but I

[5:18] wonder what C looks like. I really don't

[5:20] like this search diagrams thing at the

[5:22] top. That doesn't look nice, but let's

[5:24] see what this looks like. So, let's

[5:25] search for model, and ooh, okay, so now

[5:27] it's everything in line, no filters. So,

[5:30] I do actually really like this, but

[5:31] there are a few things that I don't

[5:33] like. I don't like these current things.

[5:35] It looks like this is really technical

[5:37] weird thing, but the the current one is

[5:41] showing with the diagram snapshot. So,

[5:42] I've got some kind of feedback that I I

[5:45] to give to the prototype. This

[5:46] prototyping session took about 100,000

[5:50] tokens. So, I'm actually going to

[5:51] compact and say, "We're going to do some

[5:53] more QA on this." Compacting at this

[5:55] point makes sense to me because we kind

[5:57] of need to retain all of the information

[6:00] about the prototype, need to retain all

[6:01] of the design decisions that went into

[6:03] it, but we just need to give it some

[6:04] feedback. So, we just need to continue

[6:06] the conversation in the same place in

[6:08] the codebase. I should definitely do a

[6:09] video about the design tree that I use

[6:11] for when I've got compact versus clear

[6:13] versus handoff, but, you know, that's

[6:15] one for another time. Okay, now I'm

[6:16] going to give some feedback. I really

[6:18] like the search box of A and I like the

[6:21] layout of C. Okay, so I've just dictated

[6:23] in some more feedback and I'm going to

[6:25] send it off. So, the idea of this

[6:27] session is that I'm iterating on this

[6:29] prototype. I'm not just saying, "Okay,

[6:31] this is the best one." I'm going to

[6:32] actually create some design decisions

[6:34] here, create a super rich asset. All of

[6:36] these design decisions are then going to

[6:38] be encoded into the prototype and I'm

[6:40] going to save the prototype probably on

[6:42] a throwaway branch. That means that when

[6:45] the thing actually goes to implement it,

[6:47] it's not only got a spec, it's actually

[6:48] got real front-end code that it can

[6:50] usually copy and paste out of it. Now,

[6:52] creating these prototypes does take some

[6:54] time, right? The higher fidelity you go,

[6:57] the more token cost there is. If we were

[6:59] to try to resolve this in a discussion,

[7:01] we'd be at a lower fidelity, so the

[7:03] answers would be less useful, but we'd

[7:05] also be spending fewer tokens. And we

[7:07] can see it's now starting to give me a D

[7:09] version here, which is kind of what I've

[7:11] been iterating towards. One note here is

[7:13] that this is actually

[7:15] integrated with the live page. So, it's

[7:18] not doing this on a throwaway route. You

[7:21] can do that if you want to, but I really

[7:23] like seeing it actually plugged into the

[7:26] live route because then it just gives

[7:28] you so much more flexibility. It it like

[7:30] it's a more honest representation of how

[7:32] the code is actually going to work. All

[7:33] right, looks like it is now created D,

[7:36] so let's see what that looks like. Yes,

[7:38] we have the box from A and if we search

[7:41] in here with model, then we can see that

[7:43] everything I asked for actually got

[7:46] done. Before we had a duplicate of this

[7:48] one, but now there's only one. And in

[7:51] theory, if I click this, I'm not sure if

[7:52] this will actually work. I don't know

[7:53] whether this is part of the prototype.

[7:55] Yes, it works. Oh, beautiful. So, there

[7:57] we go. Loads of this functionality looks

[7:59] like it is now just done. And so, you

[8:01] might ask, what is the next step after

[8:03] this? Well, now I consider the prototype

[8:06] to be complete. That was a pretty quick

[8:07] one. Usually, I'm kind of in here doing

[8:09] a lot more. Um I would pass this off to

[8:12] an AFK agent to plug in everything,

[8:14] delete the old prototype code, and just

[8:16] make sure that it was uh compliant with

[8:19] the original spec. And as you can

[8:20] imagine, the results here are incredible

[8:23] because we've had such high fidelity

[8:25] discussion, because we've been able to

[8:28] look at a live running version of it,

[8:30] give our feedback based on that. That

[8:33] feedback is so invaluable, and it's

[8:35] already baked into a throwaway branch

[8:37] that our implementer can actually just

[8:39] go and reference. So many times I see

[8:42] people saying, well, the thing didn't

[8:43] build what I wanted. I created this big,

[8:45] beautiful spec, and it just did

[8:47] something totally weird. You probably

[8:49] just weren't having discussions at a

[8:51] high enough fidelity, and you probably

[8:53] should have been prototyping. Finally, I

[8:54] don't want you to walk away thinking

[8:55] this is only for UI or front-end stuff.

[8:58] Front-end definitely benefits a lot from

[9:00] prototypes because how should it look,

[9:02] what should it look like is a really key

[9:05] question that's really hard to answer

[9:08] during the discussion phase. However,

[9:10] when you're doing more complicated

[9:11] stuff, especially back-end work, then a

[9:13] question like, does this logic, does

[9:15] this state model feel right? If you're

[9:17] building anything reasonably complex or

[9:19] that needs to work in the real world,

[9:21] then you're going to run into these

[9:23] questions all the time. And often, the

[9:25] best way to get around these kind of

[9:26] questions to build something that kind

[9:29] of serves the needs of your users,

[9:31] especially on something complex, is to

[9:33] build a prototype. Now, it doesn't need

[9:36] to be a UI prototype. And what I've got

[9:38] here is build a tiny interactive

[9:40] terminal app that pushes the state

[9:42] machine through cases that are hard to

[9:44] reason about on paper. In other words, a

[9:46] pure logic prototype. And I've had tons

[9:50] of feedback from folks saying that this

[9:51] is such a nice little feature. Both of

[9:53] these branches have their own reference

[9:55] docs here, which tell it exactly how to

[9:58] do each one. So, if it's building a

[9:59] logic prototype, it looks here. If it's

[10:01] building a UI prototype, it looks like

[10:03] this. So, I beg of you, have your

[10:05] discussions at a higher fidelity. As

[10:08] agents get better at working with

[10:09] canvases, working with design tools, I'm

[10:11] sure that wireframes will definitely

[10:12] make a comeback as well. And the key

[10:14] point is this, the leap from discussion

[10:16] and spec to production-ready code is

[10:19] really big. Whereas, if you have a

[10:21] working prototype, turning that into

[10:22] production is pretty simple. I want to

[10:25] give a quick shout-out to Shape Up by

[10:27] Ryan Singer, which is an extremely good

[10:29] book and very, very influential on me. I

[10:32] read this, I think, in 2019 or

[10:35] something, and it totally changed the

[10:36] way that I built applications for

[10:38] people. It is totally free online, and I

[10:40] will drop a link in the description. If

[10:41] you want to keep up-to-date with my

[10:42] skills, then my skills newsletter is the

[10:45] place to be. I'm shipping, shipping,

[10:47] shipping, constantly thinking about

[10:48] these skills, how I can make them

[10:49] better, and you can benefit from that

[10:51] the day that I make the changes. But

[10:53] folks, thank you so much for watching.

[10:54] It's been a pleasure, as always,

[10:55] bringing you one of my skills, and I

[10:57] will see you very soon.
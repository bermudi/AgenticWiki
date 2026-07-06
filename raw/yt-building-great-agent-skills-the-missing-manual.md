---
title: "Building Great Agent Skills: The Missing Manual"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=UNzCG3lw6O0"
date_saved: "2026-07-06T04:09:03.967Z"
---

# Building Great Agent Skills: The Missing Manual

[0:00] Hello friends. I was dearly hoping to be

[0:01] able to come to the AI engineer World's

[0:03] Fair, but family matters have intruded

[0:06] and I'm not able to make it. However, I

[0:08] will not be leaving you empty-handed.

[0:09] I'm going to give you the talk that I

[0:11] would have given in San Francisco. This

[0:13] talk is called the missing manual. How

[0:15] to write great skills. And I think that

[0:18] the ability to distinguish good skills

[0:20] from bad skills is only getting more

[0:22] important. As developers, we seem to be

[0:24] pretty talented at finding different

[0:26] forms of hell for us to go to. In like a

[0:29] few years ago, we had tutorial hell,

[0:31] which is where you would go into a bunch

[0:32] of tutorials trying to learn something,

[0:34] not be able to piece it together and

[0:36] sort of just get into this cycle you

[0:39] couldn't get out of. We had framework

[0:41] hell where every other 10 minutes there

[0:43] was a JavaScript framework being

[0:44] announced and you know, you had to learn

[0:46] the hot new thing all the time. And now

[0:48] I think we have another version of hell

[0:50] which is skill hell. Skill hell is where

[0:52] you have all of these skills available

[0:54] freely available that you can download,

[0:56] contribute to, you can figure out on

[0:58] your own, but you don't really know how

[1:00] the pieces all work together. You can't

[1:02] tell a good skill from a bad skill. And

[1:04] this means that people are trying to

[1:05] piece together these frameworks trying

[1:07] to try everything that's out there all

[1:09] at once. And they sort of can't, or

[1:12] rather, they don't get the results that

[1:13] the skills themselves promise. This is

[1:15] true at an individual level, but it's

[1:17] also true at an organization level, too.

[1:19] Organizations have no way or no

[1:21] understanding on how to build good

[1:23] skills. How to take their operating

[1:25] procedures and turn them into things

[1:27] that an agent can do. And if you don't

[1:29] do that, then it's hard to get the

[1:31] bounty that skills can offer. Just one

[1:34] more skill, bro. That's kind of seems

[1:36] like what we're saying. And I feel a bit

[1:37] of guilt here, too, because we have Matt

[1:40] PCO skills, which is my skills repo,

[1:42] which is one of the most popular

[1:43] engineering skill sets out there. And so

[1:46] I feel like I want to help the people

[1:48] who use my skills get out of skill hell.

[1:50] So how do we do it? How do we get out of

[1:51] this? Well, what is actually missing

[1:54] here? Well, in my opinion, the thing

[1:55] that we're missing is we don't know what

[1:57] makes a skill great. We can't yet look

[1:59] at a skill and go, okay, this skill is

[2:01] doing these good things and these bad

[2:03] things. There's no shared rubric, no

[2:06] framework for looking at a skill and

[2:07] making it better. And so that's what I'm

[2:09] going to give you in this talk. I'm

[2:10] going to give you a skill checklist. A

[2:13] checklist of things you can look at

[2:14] inside the skill to make sure that it's

[2:16] doing what it says it's doing and ways

[2:18] you can improve it, way you can write

[2:20] skills. This checklist looks like this.

[2:22] We start with the trigger of the skill.

[2:24] How the skill is invoked and the

[2:26] decisions that you need to design there.

[2:29] Then the internal structure of the

[2:31] skill, how the skill is actually

[2:32] composed and laid out internally. Then

[2:35] number three is how do you actually

[2:37] steer using the skill? How do you get

[2:39] the skill to tell the agent what to do?

[2:42] And then four, how do you make the skill

[2:44] as small as possible? Because once we've

[2:46] got a working skill, we then need to

[2:49] basically maximize it. Prune out all of

[2:51] the irrelevant stuff, prune out all of

[2:52] the noops. There's one handy advantage

[2:54] of me not being in the room with you,

[2:56] which is you can immediately go and try

[2:57] this out because I've encoded all of

[2:59] this into a new skill in my repo called

[3:01] writing great skills. So, if you've got

[3:03] an immediate use case for this, then

[3:05] just go to this my skills repo. you

[3:07] know, just close this browser, get out

[3:08] of here, and go and use this skill to

[3:11] either improve your skills or write

[3:13] great new ones. But let's start going

[3:14] through the checklist. Then we have

[3:16] number one, the trigger, the way the

[3:18] skill is invoked. And in order to talk

[3:19] about this, I'm actually going to do a

[3:21] bit of comparison here, which is that my

[3:23] skills are often compared to another set

[3:25] of extremely popular engineering skills

[3:27] called superpowers. And I'm really often

[3:29] asked the question, how do your skills

[3:31] compare to superpowers? What's the

[3:33] difference between them? To understand

[3:34] that we need to understand the

[3:36] difference between user invoked and

[3:37] model invoked skills. Anytime you have a

[3:40] skill you can always invoke it manually.

[3:43] So the skill sits on your file system.

[3:45] The agent will just be able to pull up

[3:47] the skill and understand what's in

[3:48] there. And you can always do that by

[3:50] communicating that to the agent. Doesn't

[3:52] always look like this forward slash

[3:54] depending on the harness but that you

[3:56] can always user invoke your skills.

[3:58] Another way that skills can be invoked

[3:59] is by the agent itself. off. These are

[4:01] called model invocable skills or model

[4:03] invoked skills. You can take a

[4:06] description. So the description of the

[4:08] skill always ends up in the agent's

[4:11] context and the agent can look in that

[4:13] and go okay based on that description

[4:15] I'm going to invoke the skill and I end

[4:17] up reading the skill.md file which is

[4:20] where the meat of the skill is into my

[4:22] context window. That's how you invoke a

[4:24] skill. That's what happens when a skill

[4:25] is invoked. So this description serves

[4:27] as a kind of context pointer. It sits in

[4:30] the agents context pointing to another

[4:33] file where the agent can go if it wants

[4:35] more context for that context pointer.

[4:37] You don't need to put it into the

[4:39] agent's context. It can just be

[4:41] invisible from the agent. And that is

[4:43] what we call a user invocable skill. So

[4:45] some skills can only be invoked by the

[4:47] user because they don't have this

[4:50] context pointer. It's optional. For

[4:51] instance, we can see in my codebased

[4:53] design here, this is a model invocable

[4:55] skill. It has a description that ends up

[4:57] in the agents context window. But if we

[4:59] look at my grill me skill instead, we

[5:01] can see it has disable model invocation

[5:03] true. This means that this little

[5:05] description here will only show to the

[5:07] user. It won't be visible to the agent.

[5:09] So this then is tip number one. Decide

[5:11] if your skill is user invoked or model

[5:14] invoked. Now you might think that model

[5:15] invoked skills are better, right?

[5:17] Because either the model can invoke it

[5:19] itself or the user can invoke it. It's

[5:21] more flexible. But every time you add a

[5:23] model invoked skill into your agent's

[5:26] environment, it increases what I'm going

[5:28] to call the context load on that agent,

[5:31] it adds a new description, which is

[5:33] costing you tokens on every request, but

[5:36] also adding a different thing for the

[5:38] agent to think about. So if you have a

[5:40] 100 model invoked skills, that's going

[5:42] to be 100 descriptions inside the

[5:44] context for your agent. So it seems to

[5:46] make sense then to either tamp down the

[5:48] number of model invoked skills or to

[5:50] just use all user invoked skills. But

[5:53] user invoked skills have a different

[5:54] load which is the more user invoked

[5:57] skills you have the higher cognitive

[5:59] load on the user. In other words, the

[6:01] more things the user needs to keep in

[6:03] their head, the more um skill you

[6:05] require from the pilot. And so if we

[6:07] compare Matt Pot skills to superpowers,

[6:10] superpowers is primarily model invoked

[6:12] skills. gives the agent superpowers.

[6:16] Whereas my skills, I much prefer to be

[6:18] in full control. That means I get to

[6:21] keep the context load on the agent as

[6:23] small as possible, but it does impose

[6:25] more of a cognitive load on me. So I

[6:27] need to understand the skills really

[6:29] deeply in order to get the most use out

[6:31] of. So why have I done this? Why did I

[6:33] prefer user invoked skills? Well, every

[6:36] time you have a model invoked skill, it

[6:38] basically you get a cost in

[6:40] unpredictability because every time you

[6:42] have a context pointer pointing from one

[6:44] resource to another, the model may just

[6:46] choose not to follow it. You know, even

[6:49] if it's absolutely perfect for the task,

[6:52] it may just choose not to invoke the

[6:54] skill. I much prefer removing that level

[6:57] of unpredictability, imposing a bit more

[6:59] cognitive load on the user. And what you

[7:01] get is just you you're removing a class

[7:04] of problem from even being a problem

[7:06] because this unpredictability leaves

[7:08] people to need to eval their skills to

[7:10] make sure they're being called at the

[7:11] right time which is uh really nasty and

[7:14] it's a problem that I prefer to avoid.

[7:16] But what I'm hoping to show you here is

[7:17] that model invoke skills and user invoke

[7:19] skills both have their same costs. So

[7:22] it's not an easy decision which one you

[7:24] choose. So that then is the trigger how

[7:26] the skill gets invoked. Now let's talk

[7:29] about the structure. the internal layout

[7:31] of the skill. I think of there as being

[7:32] two main units that you need to put into

[7:35] most skills. These two units are the

[7:38] steps and the reference. The steps are

[7:41] the step-by-step procedure that the

[7:43] skill is going to walk through. And the

[7:45] reference is any supporting information

[7:47] that helps it walk through those steps.

[7:49] You can have skills that have no steps

[7:52] and are only reference. And you can have

[7:54] skills that are no reference and only a

[7:56] set of simple steps to walk through. But

[7:58] if you start thinking of skills as

[8:00] composed of these two units, it really

[8:01] helps just break them down a lot more.

[8:03] If we look at an example, one of my

[8:05] skills called two PRD creates a product

[8:08] requirements document out of the current

[8:09] context window. It's got three steps in

[8:12] it. So it finds the relevant context. It

[8:15] confirms the test seams with the user.

[8:17] So there's like a little human in the

[8:19] loop checkpoint there just to make sure

[8:21] we're not doing anything weird with the

[8:22] testing, which I find really important.

[8:24] And then we write the product

[8:25] requirements document to handle those

[8:27] three steps. We've got two bits of

[8:30] reference material. We've got a little

[8:32] bit of reference on what is a test seam.

[8:34] And then we've got a product

[8:36] requirements document template. So just

[8:38] a literal markdown template which is

[8:41] used to write the PRD. So this is a

[8:42] great way to write a skill from scratch.

[8:45] You work out if you need some steps.

[8:47] Then you write those steps and you work

[8:49] out what reference material those steps

[8:51] need and you put it in a separate little

[8:52] spot in the skill which is for reference

[8:54] material. However, there's a really

[8:56] important constraint that we need to

[8:58] think about which is tip number three.

[9:00] We want to make the main skill.md file

[9:03] as small as possible. Every skill is

[9:05] composed of its description and then a

[9:07] skill.md file and then any reference

[9:09] material that branches off that. And

[9:11] this skill.md file, if we make it small,

[9:14] then we're saving in a bunch of

[9:15] different ways. Smaller skills are just

[9:17] easier to maintain, easier to audit,

[9:20] fewer words to think about. And every

[9:22] time you shave off a word, that is a

[9:24] token shaved. That multiple token shave

[9:27] from your skills cost. So I do believe

[9:29] that small skills are really important

[9:31] both for maintainers and for users. One

[9:34] really useful way you can make your

[9:35] skill smaller is by thinking about the

[9:38] different branches of the skill, the

[9:39] different ways the skill can be used.

[9:42] Because if you have reference material

[9:43] that's only used in one branch, then

[9:45] that's a candidate for being removed

[9:47] from the main skill.md. For instance, if

[9:49] we look at my two PRD here, we have two

[9:52] pieces of reference material. What is a

[9:54] test seam and the PRD template? Well, we

[9:56] need the PRD template every single time

[9:59] because we are always creating a PRD.

[10:01] And we probably also need the what is a

[10:03] test seam information every time because

[10:05] we're always asking about the test

[10:06] seams. So 2P there's only one branch and

[10:10] all the reference material belongs on

[10:11] that branch. So it probably also belongs

[10:14] in the skill.md file. However, if we

[10:16] look at a different skill of mine which

[10:17] is domain modeling, domain modeling does

[10:20] two things. It updates a local glossery

[10:22] called context.md and then it also

[10:25] creates architectural decision records.

[10:27] In other words, it's doing two different

[10:29] things. Or it might actually choose to

[10:31] do neither of these in which case it

[10:33] doesn't need the template and it doesn't

[10:34] need the ADR template either. So in

[10:37] other words, domain modeling has two or

[10:39] maybe three branches. And this means

[10:41] that we don't need to include the ADR

[10:44] template or the context.md template into

[10:46] the main skill. They can be moved into

[10:49] separate zones. The way you do that is

[10:51] you have the skill.md file. Then you put

[10:54] it behind a context pointer and you

[10:56] point the context template to a separate

[10:59] markdown file inside the skills folder.

[11:01] That context pointer literally just says

[11:03] if you need the template or if you need

[11:05] to update the context.md file, go to

[11:07] this file. And I call that an external

[11:10] reference. It's a reference that's

[11:12] external to the skill.md that you can

[11:14] just easily reference. The agent can

[11:16] pull in very easily because it's bundled

[11:18] along with the skill. So this is a

[11:20] technique you can use for making the

[11:22] skill.md as small as possible, which is

[11:24] has so many benefits. Hide branching

[11:27] reference material behind context

[11:29] pointers. In other words, if you feel

[11:30] like your skill is going to be used in

[11:32] lots of different ways, then take the

[11:34] reference material that's relevant for

[11:35] those branches and hide them behind

[11:37] context pointers. So that is structure.

[11:39] We need to think about making the

[11:41] skill.md super duper small. We need to

[11:43] think about the branches in our skill

[11:45] moving material out behind context

[11:48] pointers. And we need to think about

[11:49] steps and reference, which are the two

[11:51] main units inside a skill. Let's go next

[11:54] to steering, the actual ways we get the

[11:57] agent to do what we want it to do. And

[11:58] for me, steering comes down to one

[12:01] really cool technique, which is the kind

[12:03] of main thing I want you to get from

[12:05] this talk. This technique fixes this

[12:07] issue, which is the agent doesn't do

[12:10] what I want. In other words, I specify

[12:12] something in the skill. I think that

[12:14] I've been clear and then it just doesn't

[12:16] do the thing. Now, I think the main

[12:17] reason this happens is because you're

[12:19] not using a technique called leading

[12:22] words. The idea of leading words or

[12:24] lightvert if you like literary theory I

[12:27] suppose is that there are certain words

[12:29] that pack in a bunch of meaning into a

[12:32] very small space. These leading words

[12:34] are really powerful with agents because

[12:37] you put the leading word in the skill

[12:39] itself in the text and then the agent

[12:41] will repeat the leading word back to

[12:43] itself as part of its operations as part

[12:46] of its thinking tokens and as part of

[12:48] its output to you. And then because it's

[12:50] re-emphasizing that word and that word

[12:52] hopefully describes what you want from

[12:54] the agent that then goes and changes its

[12:57] behavior. Let's make this more concrete

[12:58] with an example. So let's imagine that

[13:01] we have a problem which is a classic

[13:02] problem with agents which is that they

[13:04] code layer by layer. In other words, if

[13:06] you give them a big tranch of work to

[13:08] do, they will generally code up all of

[13:10] the database layer, then all of the

[13:12] schemas, then all of the API endpoints,

[13:14] then all of the front end. they don't do

[13:16] the sort of typical um human thing which

[13:19] is to seek feedback early on, get

[13:21] something small working and then expand

[13:24] out from there. Now, we can try to

[13:25] encourage the agent to do that by just

[13:27] saying, you know, don't code layer by

[13:29] layer. Um make sure that you create a

[13:31] small slice first and then go from

[13:32] there. But what if instead we used a

[13:34] leading word? We said vertical slice is

[13:38] our leading word. We want to slice up

[13:39] the work instead of horizontal slices

[13:42] into vertical slices. A vertical slice

[13:44] is a pretty well-known terminology in

[13:46] development. And so this will hopefully

[13:48] trigger the agent's prior, and it will

[13:51] understand what we mean. We don't just

[13:53] have to like have a two-word skill where

[13:54] it just says vertical slice. What we're

[13:56] doing is we're packing lots of meaning

[13:58] into a relatively short phrase that we

[14:00] then repeat throughout the skill. The

[14:03] cool thing about this technique is you

[14:04] can know if it's worked because you say

[14:06] vertical slice in your skill and then

[14:08] you'll notice in the reasoning traces

[14:10] that it's saying, "Okay, we're going to

[14:11] do this as a thin vertical slice." then

[14:13] you should get better implementation

[14:15] plans. Everyone I've explained this

[14:16] technique to sort of feels like, "Oh

[14:18] yeah, I've been doing that for a while.

[14:20] I've been using these little phrases to

[14:22] try to encourage the agent to do what I

[14:25] want." All I'm asking you now is to use

[14:27] those consistently within your skills

[14:30] and watch in the thinking traces as the

[14:32] agent adopts your way of doing it. So

[14:34] often if the agent isn't doing what you

[14:36] want, you need to make your leading

[14:38] words more consistent, more powerful,

[14:41] and look for others because you know,

[14:43] English is a pretty wide API in terms of

[14:46] different functions you can call,

[14:48] different things you can experiment

[14:49] with, and there are many leading word

[14:51] candidates out there, and agents are

[14:53] actually pretty good at helping you

[14:54] think of them. Another little lever you

[14:56] can use with agents is sometimes the

[14:59] agent just doesn't do enough leg work.

[15:02] What I mean by this is that okay, we're

[15:04] on a step, let's say, and maybe the step

[15:06] is to ask clarifying questions or to

[15:08] explore the codebase and the agent just

[15:11] doesn't do enough of it. It doesn't put

[15:13] enough effort into that particular step.

[15:15] A real classic case of this and

[15:18] something that I have found almost

[15:19] everywhere it exists is plan mode.

[15:22] Because in plan mode, we have two steps.

[15:24] We have ask clarifying questions and

[15:26] then create a plan. And what I have

[15:28] found in every single implementation of

[15:30] plan mode I've tried is that ask

[15:32] clarifying questions just, you know,

[15:34] doesn't ever do enough leg work. It sees

[15:37] that its ultimate goal is to create a

[15:39] plan. And so it just does a small amount

[15:41] of leg work with ask clarifying

[15:42] questions, ask you a couple of things,

[15:44] and then eagerly creates the plan. So

[15:46] what was my solution here? Instead of

[15:48] doing plan mode, I instead have a skill

[15:51] called grill with docs, which is kind of

[15:53] my ask clarifying questions phase. And

[15:56] then I split that up into a separate

[15:58] skill. So I split the planning into its

[16:01] own skill. So grill with docs now is its

[16:04] own skill where the agent only sees that

[16:06] part of the process. And then after

[16:09] grill with docs completes, we then go

[16:11] and do two PRD. In other words, we have

[16:13] step one and step two, but the agent

[16:15] only sees one step at a time. So, this

[16:18] is a really cool technique for

[16:20] increasing leg work on the step that

[16:22] you're on by hiding the future goal,

[16:24] hiding the future steps. It's not always

[16:26] necessary to split skills into

[16:29] individual steps, but in particular

[16:32] cases where you really want an extra

[16:34] chunk of leg work. It really there's no

[16:36] technique like it. It works very, very

[16:38] well. So, that is steering. using

[16:40] leading words to capture what you want

[16:41] in small reusable tokens and then making

[16:45] sure that it's doing the right amount of

[16:46] leg work per step. So let's head now

[16:48] into pruning. Now pruning really is just

[16:51] a quickfire set of failure modes,

[16:53] different things that you can get wrong.

[16:55] And the first is fairly obvious is we do

[16:58] not want massive skills. Massive skills

[17:00] are usually a kind of symptom of

[17:03] something else going wrong. So a symptom

[17:05] of one of these other failure modes. And

[17:07] the first one is pretty simple. Don't

[17:09] repeat yourself. You need to make sure

[17:11] you're watching out for duplication. And

[17:13] in general, I like to have every part of

[17:16] the skill to have a single source of

[17:18] truth. In other words, if you have a

[17:20] piece of reference material like the PRD

[17:22] template, let's say, or something even

[17:24] smaller like what is a test seam, you

[17:26] make sure that you don't repeat that in

[17:28] several places or like cover multiple

[17:31] steps in multiple places. Just make sure

[17:33] each part has a single source of truth

[17:35] and you're not repeating yourself even

[17:37] across reference material too. The next

[17:39] way that skills get big is via sediment.

[17:41] And sediment is just a classic thing

[17:44] when people are working on the same set

[17:47] of docs really which is that everyone

[17:50] starts contributing to a shared markdown

[17:52] file. People add their own stuff. They

[17:54] don't feel brave enough to delete and

[17:55] modify anyone else's. And so you just

[17:57] end up with this huge amount of sediment

[17:59] with often irrelevant material for the

[18:02] skill, especially stuff that hasn't been

[18:04] laid out properly. With a skill with a

[18:06] lot of sediment, you really need to look

[18:07] at structure. That's the first thing you

[18:09] need to do. You need to make sure that

[18:10] the stuff that's been added is relevant

[18:12] for all branches. If it's not, then move

[18:15] it into the correct branches. Or if it's

[18:17] just totally irrelevant, maybe just

[18:18] remove it or kill it. Or maybe there's

[18:21] stuff in there that's totally stale, in

[18:22] which case you just need to kill it

[18:24] dead. The next failure mode is really

[18:26] common when an agent writes your skills,

[18:28] which are no ops. So things inside the

[18:32] skill that appear to do something, but

[18:34] don't actually influence the agent's

[18:36] behavior inside the context of the

[18:37] skill. Let's imagine we have an

[18:39] implement skill and we have an entire

[18:40] paragraph of the skill that tells the

[18:43] agent to write a long detailed commit

[18:44] message. What would happen if you just

[18:47] deleted that paragraph? Well, the agent

[18:49] would probably still write a decent like

[18:51] long commit message. People ask me a lot

[18:53] how I get my skills so small and it's

[18:56] just using these techniques, using

[18:58] deletion tests, using um making sure

[19:01] that I compact things into leading

[19:02] words, I don't have anything irrelevant

[19:04] in there, and I don't have any sediment.

[19:06] And that finally brings us to the full

[19:08] sweep of things. Number one, we check

[19:10] the trigger. We make sure that it's

[19:12] firing at the right times. We check

[19:14] whether we're imposing context load or

[19:16] cognitive load. With structure, we think

[19:18] about branches. We think about um

[19:21] structuring things into steps and

[19:23] reference and we make sure that um

[19:25] material that's only relevant for one

[19:26] branch is outside of the main skill.mmd.

[19:29] For steering, we're thinking about

[19:31] condensing text down into leading words

[19:33] and watching those leading words appear

[19:35] in the reasoning traces. And we're also

[19:37] thinking about leg work. Should we break

[19:39] this skill down further to increase its

[19:42] focus on the current phase by hiding the

[19:44] future phrase phase from it? And with

[19:46] pruning, we're doing a final pruning

[19:48] pass over the entire skill, watching out

[19:50] for sediments, watching out for crud,

[19:52] and watching out especially for no ops.

[19:55] Now, all of this stuff, the best way to

[19:57] get started with this framework is

[19:59] inside this skill, inside the writing

[20:00] great skills skill. You can check it out

[20:03] from map. Got skills, download it, uh,

[20:05] use it to improve your own skills and

[20:07] maybe even use it to run over some

[20:09] community uh, authored skills so that

[20:12] you can check that the skills that

[20:13] you're actually pulling in are any good.

[20:15] If you want to follow along with my

[20:16] stuff, then I have a newsletter up on

[20:18] aihero.dev. And my plans for the next

[20:21] few months are to release an AI coding

[20:23] crash course, which is an intro to a lot

[20:25] of the stuff I've been talking about and

[20:27] how you get off the ground working with

[20:29] engineering and AI. I hope that what

[20:31] I've given you is enough to help you

[20:33] escape from skill hell or at least try

[20:36] to make the bitter journey out of there.

[20:38] I'm so sorry not to be able to attend in

[20:39] person, but thanks for watching. I'll

[20:41] see you very
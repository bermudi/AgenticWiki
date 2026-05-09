---
title: "Skills at Scale — Nick Nisi and Zack Proser, WorkOS"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=pFsfax19yOM"
date_saved: "2026-05-09T04:39:56.888Z"
---

# Skills at Scale — Nick Nisi and Zack Proser, WorkOS

[0:14] This workshop is going to be skills at

[0:16] scale. We're super excited to be here

[0:17] with you today. There's going to be an

[0:18] interactive component and we also want

[0:20] you to feel free to interrupt us and ask

[0:22] questions as we go.

[0:23] >> Yep. We'll show that slide again with

[0:24] the with the um uh QR code and the the

[0:28] instructions to clone the repo. That

[0:30] repo has the skills uh the skills that

[0:32] we're working on plus uh the slides that

[0:34] we're presenting. So you'll have all of

[0:35] that as reference material. Um I am Nick

[0:38] Nissi. I am a developer experience

[0:40] engineer at work OS.

[0:42] >> I'm Zach Proer. I'm also a developer

[0:44] experience engineer at work OS and we're

[0:45] on the applied AI team.

[0:47] >> And this is like working with agents.

[0:50] That's just like what we do now. Uh,

[0:52] Zach, when is the last time you wrote a

[0:53] line of code by yourself?

[0:54] >> Uh, I think I did a CD uh in a directory

[0:58] recently. Otherwise, it's been like

[1:00] probably six or eight months now.

[1:02] >> Yeah,

[1:02] >> maybe longer. Yeah,

[1:03] >> same. Same. We've been early on from the

[1:06] the Opus 35 days

[1:08] >> from copying and pasting back and forth

[1:09] through GUI to now.

[1:11] >> Yeah. Uh, it's gotten a lot better and I

[1:14] don't know, there's a a mythos out there

[1:16] that it's going to get even better.

[1:19] Uh we are at work OS and uh if you are

[1:23] uh interested in like securing MCP for

[1:25] example or just setting up off uh for

[1:28] this new agentic startup that you're

[1:29] you're working on uh reach out to us.

[1:31] There's a number of us here with these

[1:32] shirts on and uh we'd be happy to talk.

[1:34] We're also hiring. So

[1:35] >> thanks to the AI installer that Nick

[1:37] built as well. You no longer even have

[1:38] to configure install kit yourself. It

[1:40] can just do it for you. So pretty easy

[1:42] to get started

[1:43] >> for sure.

[1:45] All right. So, as you know, when you're

[1:47] working with these uh with these

[1:49] systems, every single conversation that

[1:51] you have starts completely from zero. Uh

[1:54] you're always just like passing in new

[1:56] information to it. You've got to

[1:58] reiterate how you do things. Uh and

[2:01] Claude never Claude, for example, never

[2:03] remembers that it ever talked to you. It

[2:05] just continues on a conversation. And

[2:07] so, we have to provide that information

[2:09] fresh each time.

[2:11] >> Yep. Um, so for example, let's say you

[2:14] have a skill or let's say that you're

[2:15] talking to uh just in disperate terminal

[2:18] tabs. You're looking at different code

[2:20] bases over the course of a week. Every

[2:22] single time you start talking to it, you

[2:24] need to reload all of that context first

[2:25] and say, "This is what I care about.

[2:27] This is how we do things here. This is

[2:28] what we're particularly concerned with."

[2:30] Right. And it ends up eating a ton of

[2:31] time and slowing you down.

[2:32] >> Yep. And of course there's things like

[2:33] agents.mmd or cloud.mmd uh that you can

[2:36] put in information about the repo or

[2:38] about how you like to work like in a a

[2:40] global directory uh so that it can

[2:42] remember that and understand it each

[2:44] time you're giving that instruction each

[2:45] time kind of like appending it uh so

[2:48] that it will remember oh in this project

[2:50] we actually use vest and we use pnpm so

[2:53] you should use those each time uh so it

[2:55] can that that's like the way to give it

[2:57] some memory for it to understand how to

[2:59] go but it can still get it it can still

[3:03] uh decide not to follow things that you

[3:05] have. I've definitely had cases where

[3:07] I'm like, "Do this, this, and then this,

[3:09] and it skip the step in the middle, and

[3:10] I say, why'd you skip that?" And it's

[3:11] like, "Oh, yeah, you told me to do it. I

[3:12] I didn't feel like it." And uh that's

[3:14] that's how you know it's a real

[3:16] engineer.

[3:19] Uh yeah. So, one of the nice things

[3:21] about skills is that you can think of it

[3:22] as like a discrete unit of work where

[3:24] you can encode everything that's super

[3:25] important to you, everything you don't

[3:27] want it to miss, everything you don't

[3:28] want to repeat yourself. It's almost

[3:29] like carrying, if you will, the dry

[3:31] pattern into the agentic era in a way.

[3:33] Um, and not repeating yourself. So, and

[3:35] as we'll see, that becomes incredibly

[3:37] powerful regardless of if you're a solo

[3:39] developer working on your own startup

[3:40] with 12 agents or if you're on a

[3:42] traditional dev team with 12 team

[3:44] members.

[3:45] >> Yeah, it doesn't know what you know. So,

[3:46] you have to be very specific and be

[3:49] thorough with what you want it to know

[3:50] because it's not always going to figure

[3:52] it out. Sometimes it feels like magic

[3:53] because it just does, but a lot of times

[3:56] you have to put in the work to do that.

[3:57] And that's what what like those memory

[3:59] files are like claw.md uh and other

[4:01] memory files. It even has like claw for

[4:02] example has its own built-in memory

[4:04] where it kind of keeps track of things

[4:05] that it thinks are pertinent to the the

[4:08] way you work or the project that you're

[4:10] working on and it will save that off.

[4:12] >> Yep. And you know, of course, this works

[4:14] too in just a single project context

[4:15] with some of those files that Nick

[4:17] mentioned. But then again, the problem

[4:18] is that you're still tied to that repo.

[4:20] Uh you need your team members to

[4:21] remember to pull updates to that

[4:22] specific project skill if if they want

[4:24] the context. um there's no necessarily

[4:27] built-in script execution. So, how do

[4:29] you get how do you interle a

[4:30] deterministic result when you're having

[4:32] a non-deterministic conversation with an

[4:34] LLM? And eventually that starts to get

[4:36] pretty gross.

[4:38] >> So,

[4:39] >> and the there's downsides to this uh

[4:41] specifically these memory files where if

[4:44] they're tied to the repos that you're

[4:45] working on or you have to put them

[4:46] globally so it affects everything uh and

[4:49] you can't do things like uh give it like

[4:51] more smarts like execute this script.

[4:53] you can, but it's kind of not built in,

[4:56] so to say. Um, but that's kind of like

[4:59] where the things that you put in there

[5:01] are not always like transferable or

[5:03] portable to other projects that you

[5:05] might be working on. Uh, and so we need

[5:07] a better way to do that.

[5:10] And skills are that next step.

[5:11] >> Yeah, indeed.

[5:13] >> Uh, it's a way to make things more

[5:14] portable. Uh, and you can use scripts to

[5:16] inject real data. Uh, and you can make

[5:18] them composable. uh so that they can be

[5:21] very small and very focused on exactly

[5:23] what you want them to do. Uh and that

[5:25] way they're they're very small like a

[5:27] very small footprint in your your

[5:28] context window, but also uh you can

[5:31] build them in such a way that they are

[5:32] only going to be applicable when you

[5:33] actually want to do whatever that skill

[5:36] is set up to do. So you're not just

[5:37] bloating the context with everything

[5:39] from the start every time like you are

[5:41] with a claw.md.

[5:42] >> Yep.

[5:43] And so if you haven't seen or heard of a

[5:45] skill before, just to level set really

[5:46] quick, it could be as simple as a a

[5:49] single static markdown file uh without

[5:51] any scripts at all. Um but let's look at

[5:53] the difference at what might happen.

[5:54] Let's imagine that we're roasting a

[5:55] repo. We're onboarding a new team

[5:57] member. We want to make sure that you

[5:58] know they're kind of up to snuff on how

[5:59] things work here. Without a skill, if

[6:01] you're just talking to any generic agent

[6:03] with no specific context injected,

[6:05] you're going to get, okay, looks pretty

[6:06] good. It's going to be generic advice.

[6:07] It might find some lowhanging fruit. If

[6:09] you say instead as little as 30 lines of

[6:12] markdown specific to your use case and

[6:14] your conventions, your constraints, uh

[6:16] you can start to get back very very like

[6:18] hyperspecific feedback about this is how

[6:20] we handle you know uh routing in this

[6:22] project. These are um you know we we

[6:25] follow semantic commits or whatever and

[6:28] we've got readme drift here and that's

[6:29] unacceptable, right? So it it can take

[6:31] as little as 30 lines of markdown or

[6:33] less. And so that's the one of the first

[6:36] things that makes skills incredibly

[6:37] powerful is that it's a very minimal

[6:39] investment on your part and it could be

[6:41] as simple as a small markdown file and

[6:43] it becomes a composable unit of work

[6:45] that you can share across codebases and

[6:47] your team.

[6:48] >> Yep. And you're you're codifying exactly

[6:50] what you want it to do and you have

[6:51] freedom to express yourself in the exact

[6:54] way that you want it to do that. And

[6:56] there's a number of different ways and

[6:57] techniques that we'll talk about

[6:58] throughout this workshop. Uh, but it's

[7:00] much better having those skills and

[7:02] knowing that they exist and and knowing

[7:04] not just like that you can use them, but

[7:06] also setting them up in a way that the

[7:08] LLM can decide to use them when it makes

[7:10] sense. Uh, and it's going to give you a

[7:13] single repeatable way of doing that

[7:15] thing in the way that you expect it. If

[7:17] I just tell it some generic thing like

[7:18] look at this and tell me how how good of

[7:20] a repo it is, depending on the re the

[7:22] model that you're running, uh maybe the

[7:24] the

[7:26] amount of thinking that you have turned

[7:27] on, uh, etc., It might give you more or

[7:29] less information, but it's never going

[7:30] to be the same thing each time. If you

[7:32] want it in a very specific format, you

[7:34] want this report in this exact way.

[7:36] That's what a skill is. You're teaching

[7:37] the the LLM how to do something in the

[7:39] way that you expect it to be done and

[7:41] then it will follow that much more

[7:43] closely.

[7:46] All right, let's take a look at uh how a

[7:48] typical skill might break down. So

[7:49] again, it could be skill.md. So as

[7:51] simple as a markdown file. At the top,

[7:53] you'll notice a front matter. So, think

[7:55] about um anywhere else that you've used

[7:57] like a YAML based system almost like

[7:59] headers, right? In in other languages or

[8:01] formats, but you've got a name, a

[8:03] description, and this description is is

[8:05] incredibly powerful and loaded. This is

[8:07] what the LLM is going to use at runtime

[8:09] to essentially do routing and determine

[8:11] if this skill is relevant to the task

[8:13] that you've assigned it. Um, so that's

[8:16] kind of how the AI finds and routes to

[8:17] your skill. And then additionally you

[8:19] can provide uh additional context and

[8:21] and then even scripts so that again

[8:23] think of it as your option or your

[8:26] on-ramp for interle determinism with the

[8:28] nondeterministic LLM conversation.

[8:32] >> Yep. Uh so the the most important things

[8:34] here are exactly what Zach said, the the

[8:36] name and the description. Uh it's a

[8:38] misnomer that skills are only a single

[8:40] markdown file. They of course can be,

[8:42] but they're more like a folder with a

[8:44] skill.mmd file in them. And then they

[8:47] can have anything else in there as well.

[8:49] And we'll kind of talk about that, but

[8:50] they can have references to other other

[8:52] uh things that that they might want to

[8:54] know. They can have scripts that it

[8:56] should run uh and they can have images.

[8:58] They can have all sorts of different

[8:59] things uh and then use that in different

[9:02] ways. But the most important piece of it

[9:04] uh from the start is the description

[9:07] which we'll talk about. Let's also just

[9:09] uh talking about constraints. One of the

[9:11] things that's kind of um not intuitive

[9:13] is that it can be more powerful just to

[9:14] to provide a few constraints as opposed

[9:17] to overly uh being overly prescriptive

[9:19] in exactly how you want the task done.

[9:22] So if you pro provide just three

[9:23] constraints and say never be vague or um

[9:26] when you site code it always has to have

[9:27] a specific line and a git commit

[9:29] reference with it. Um then you'll get

[9:31] better performance than if you end up

[9:33] you know bloiating in the middle of a

[9:35] markdown file. So it's like a novel. Um,

[9:37] this is actually common failure mode

[9:38] when designing skills.

[9:39] >> Yeah.

[9:40] >> Yeah.

[9:42] >> So, today we're going to uh put all of

[9:45] this together into a skill that we're

[9:48] going to build here in the the workshop

[9:49] and it's just called repo roast. We

[9:51] tried to think of like a a fun generic

[9:53] skill that would be applicable to anyone

[9:55] who is working in, you know, JavaScript

[9:57] or uh different languages. Uh but also

[10:01] is like like if you if you're not really

[10:03] like if you have an idea of what a git

[10:05] repo is, this is applicable to you. So

[10:07] it's kind of transcends all of that uh

[10:09] and is gener generally uh something

[10:12] that's useful for for everyone, but also

[10:14] kind of fun. We can kind of be more or

[10:16] less serious with it uh as we're we're

[10:18] putting that in. So it's going to allow

[10:20] for a lot of creativity as we go. And

[10:21] feel free to also uh kind of use this as

[10:23] a as a place to inject the actual

[10:25] constraints or the requirements that you

[10:27] have at work that you're kind of uh

[10:28] struggling with or testing. Um so we'll

[10:31] kind of get the baseline together and

[10:32] then you can start customizing from

[10:33] there and we'll have some time to share

[10:35] and discuss them later too.

[10:36] >> Yep. So uh this is that slide from the

[10:39] beginning. Uh if you haven't yet uh

[10:41] please download this uh clone this repo

[10:43] uh and work in there. We've got kind of

[10:44] the basics of the skill. Um and what

[10:48] we're going to do is just kind of get it

[10:49] set up and you can make it your own.

[10:50] We've got some general guidelines and

[10:52] some tips to do. Uh but the fun is going

[10:54] to be that we have a room full of people

[10:56] and we can have a room full of different

[10:58] ways of uh analyzing this. And we'll

[11:00] also share that uh in that repo. There

[11:02] is a share.sh uh that you can run and it

[11:05] will just ask you for your name and then

[11:07] it will uh put that into a KV store and

[11:10] then I can pull it down uh quickly on my

[11:12] machine and then run it against some

[11:13] repos like on the screen so we can share

[11:15] these uh at the end of the day. Yeah, it

[11:17] would be kind of a fun way to experiment

[11:18] with different uh approaches to the same

[11:20] skill.

[11:20] >> Yeah.

[11:24] >> So, speaking of loading skills, we

[11:25] should talk about how skills load. Um,

[11:28] we we are generally kind of talking like

[11:30] you'll hear Zach and I kind of always

[11:32] just like when we're talking, we're

[11:33] saying Claude because we tend to use

[11:35] Claude. How many here use Claude as kind

[11:37] of their daily

[11:37] >> daily driver? Whoa. Okay.

[11:38] >> That's a pretty much it's like 91% uh

[11:42] market and then everyone else like

[11:43] there's cursor and I have been dabbling

[11:45] with pi. Pi is amazing. Uh but also

[11:48] Anthropic won't let me use my I it's

[11:51] unclear. Can I use my subscription with

[11:52] it? I don't know. Uh maybe I'll find out

[11:54] today or this week.

[11:56] >> You can pay more for it. You can Yeah.

[11:58] >> pay more in credits for it. That's fine.

[11:59] >> For sure.

[12:00] >> Um but when you're using these, so like

[12:03] the the main thing and the reason that

[12:04] we're so excited about skills too is

[12:06] that they're generally applicable to all

[12:08] of the major models. So codec supports

[12:10] them, cloud supports them, cursor

[12:11] supports them, uh the uh desktop apps

[12:14] like like cloud desktop supports it. So

[12:17] even like if you're non-technical, you

[12:19] can be working on skills and sharing

[12:21] skills and and using skills.

[12:22] >> What was the skill that you did last

[12:24] week with the recruiting team in

[12:25] desktop?

[12:26] >> Yeah. Uh I was working with our

[12:27] recruiting team kind of uh they're at an

[12:29] on-site and I was zoomed in with them

[12:31] helping them build a skill that could

[12:32] like take like candidate information and

[12:35] format it in specific ways and

[12:36] understand um you know what they're

[12:39] looking for in different things and kind

[12:40] of build reports automatically. Uh so

[12:42] it's things that they could do pretty

[12:44] simply but they um because of like the

[12:46] the beauty of cloud desktop and all of

[12:49] the connectors that it has like it could

[12:51] just reach into Slack and pull in

[12:52] information from there. could reach into

[12:53] notion and grab that information and

[12:55] then mix that in with like the

[12:56] recruiting software that they use and

[12:58] put it all together into a single report

[13:01] that then they can share to build from

[13:04] there. So it wasn't like this is the

[13:05] final report that we use for everything.

[13:07] This is a building block that then they

[13:09] can use to do different things in

[13:10] different places.

[13:11] >> And so it was really powerful for that.

[13:13] >> And as soon as you gave them that skill

[13:14] then everyone on the team is running it

[13:15] in a uniform way. Yes. The power of it

[13:17] too.

[13:18] >> For sure. And so where do those skills

[13:20] go? Uh well the the most basic place is

[13:23] if you have a repo there's you can just

[13:24] put a claude directory and then uh have

[13:27] a skills directory and then a folder

[13:29] which is the skill name and then a

[13:31] skill.md all caps uh in there just like

[13:34] this and that will be a skill that lives

[13:37] with that repo and so anyone who is

[13:39] using that repo it'll just automatically

[13:40] load that and understand how to use it.

[13:42] You can also have that same.claude

[13:44] directory in your home directory and put

[13:46] those skills there. And then they're

[13:47] generally applicable to everywhere uh

[13:49] that you would be using claude. Same

[13:51] thing uh there there's kind of more

[13:53] standardization for everyone else on

[13:55] agents. I wish uh there was like

[13:58] agents.mmd and instead of cloud.mmd and

[14:01] uh aagents instead of quad uh but maybe

[14:04] we'll get there one day. So, uh, you can

[14:06] put them in there and, uh, if you've

[14:07] ever used like the MPX skills, uh, tool

[14:09] from Verscell, that is just kind of sim

[14:11] linking them all into all of these

[14:12] different directories. And so, the

[14:14] skills are generally applicable

[14:15] everywhere. That's just a an easy way to

[14:18] load and install them, which is why it's

[14:20] so popular.

[14:20] >> Yep.

[14:22] >> But the the main dev loop with it is

[14:25] like you edit the skill, save it, invoke

[14:27] it, see what output it is, and then do

[14:29] that process all over again. Uh, and

[14:31] test it. If you're using Claude as well,

[14:32] Claude ships with a fantastic uh skill

[14:35] builder skill or skill creator skill.

[14:38] >> And uh that is really good for

[14:39] critiquing your skill, setting it up in

[14:41] a way that Claude would expect it to be

[14:43] uh and even evaluating it, which we'll

[14:45] talk about.

[14:45] >> Yep.

[14:46] >> All right. So, we're going to start by

[14:48] uh letting you go ahead and work and

[14:50] build the foundation. So, you should

[14:51] have that repo and uh we just want to

[14:53] get started with it. So um the main

[14:56] things that you want to do is you want

[14:58] to set up uh a proper description for

[15:01] it. Now remember this description is not

[15:03] for humans. The description is really

[15:05] more for the LLM so that it knows when

[15:08] it should use the skill automatically.

[15:10] And so you want to set that up in in

[15:12] some way uh we recommend in in some way

[15:14] where like it it describes like oh we're

[15:17] going to roast this repo in like like

[15:19] the the user wants to roast this repo

[15:21] and get an analysis a fun analysis of

[15:23] it. uh or or something. Be creative and

[15:25] fun with it. But then you should just be

[15:27] able to like open up cloud and say roast

[15:28] this repo. Roast my repo and it goes and

[15:31] does it.

[15:31] >> Yep. And then remember that in general

[15:33] it's recommended that instead of being

[15:34] overly prescriptive in how to do

[15:36] something, provide your constraints

[15:38] instead. So say we're using this format

[15:40] in this repo or we follow these coding

[15:42] conventions or we never do X or Y and

[15:45] then allow the LLM to make the right

[15:47] determination at runtime.

[15:48] >> Yep. Yeah, definitely like closing it

[15:50] off like that. Don't uh prescribe what

[15:52] it should do. kind of give it advice on

[15:54] what it shouldn't do and let it be more

[15:56] creative on things. But you can also

[15:58] like change that as well and be more

[16:00] assertive on things that you know you

[16:01] want in a specific way.

[16:04] So let's work on that. Um a couple of

[16:06] things that uh like tips that we want to

[16:08] talk about in this first section is uh

[16:10] and this I think might be pretty

[16:12] applicable only applicable to Claude

[16:14] right now. I did ask Pi if it could do

[16:15] it and Pi just like made an extension

[16:17] that made it work. So uh that's that's

[16:20] awesome. Uh but if you use the bang and

[16:23] then back tick uh back ticks for like a

[16:25] script call uh Claude will do like an

[16:28] interpolation of that just like how

[16:30] JavaScript has like the dollar sign open

[16:31] curly brace and close curly brace. It'll

[16:33] just like instead of having whatever was

[16:34] in there uh like this um where it's

[16:37] saying stale to-dos and then it gives

[16:39] you a command to run, it will just

[16:40] replace this with a list of the stale

[16:42] to-dos because it will actually execute

[16:43] this GP command uh and then do all of

[16:46] these pipes to all sorts of different

[16:47] things that's totally not slurping up

[16:49] keys or anything.

[16:50] >> Yeah. Um,

[16:52] >> you can imagine how this is really

[16:53] powerful if you're like say you're doing

[16:54] your morning report, your your kind of

[16:56] like your get status report, any of the

[16:58] pieces that you want to be output in a

[17:00] deterministic way. That's an ideal u use

[17:03] case for this kind of script

[17:05] interpolation.

[17:05] >> Yeah, this is really great because

[17:07] you're not you're not saying go grab the

[17:09] latest commits or the latest 10 commits

[17:10] and give me some information on it.

[17:12] You're saying here are the latest 10

[17:14] commits in the exact format that I

[17:16] expect you to understand them in. Go and

[17:19] do something with that information. So

[17:20] it's not guessing. It's not going to be

[17:22] non-deterministic each time. It's going

[17:23] to start from this deterministic base

[17:25] and then go from there.

[17:26] >> It's also very token saving. If you've

[17:28] ever said go and figure out the 10

[17:30] commits and you've run that more than

[17:31] once or on three different terminal

[17:33] tabs, you know, the first two might get

[17:34] it perfectly right and the third is like

[17:36] spinning and reading git docs and you

[17:38] know before it finally gets there. So

[17:39] this is a way to say once you've

[17:41] formalized a piece of your workflow, you

[17:43] can just codify it and say run this

[17:45] exact script.

[17:46] >> Yeah.

[17:49] Yeah. Like we said, without scripts, the

[17:50] AI is just speculating on what you mean

[17:52] when you say go get the latest commits.

[17:55] >> Um, yeah, and just remember that

[17:56] descriptions are routing rules, right?

[17:57] They're they're less for us and they're

[17:58] more for the AI to determine when to use

[18:00] it. So, a good example is you might have

[18:02] a couple different image generation

[18:03] skills and they're all kind of littered

[18:05] in the projects and maybe in your global

[18:07] skills. Maybe one is more applicable to

[18:09] your personal blog and you say, "On my

[18:11] personal blog, I always ship pixel art."

[18:12] So, if we're writing on this domain,

[18:14] this is the skill to use. Right? If

[18:16] we're going to work, it has to be

[18:18] formalized and we use a completely

[18:19] separate image generation system or we

[18:21] only fetch images from S3. That's where

[18:24] you can kind of codify that in your

[18:25] description.

[18:28] And if you're not sure, by the way, you

[18:30] can always ask cloud. That's the other

[18:31] like kind of secret hack of this era

[18:33] that everyone forgets is that a lot of

[18:35] times the models are capable enough that

[18:36] you can ask them, have I done this right

[18:38] or when would this apply? Uh so you can

[18:40] say as a test run, when would you load

[18:42] this currently? If I only want it to run

[18:44] in these conditions, is this the best

[18:46] description for me or not?

[18:47] >> Yep. And a great example of this is when

[18:49] we were building this, I asked Claude, I

[18:51] was like, "Hey, I know I can do this,

[18:52] but do you actually support like skills

[18:54] calling skills?" And it was like, "Oh,

[18:55] let me go check." And it loaded like a

[18:57] claude code analyzer skill to get that

[19:00] information and then do that research

[19:02] and come back and say maybe.

[19:04] >> Yeah. It was like kind of, but you

[19:06] probably don't want to do that. So,

[19:08] >> uh, so your turn. We we're gonna take

[19:10] some time to go do that. Uh to to let

[19:12] you go do that. Um and when we do these

[19:15] breaks, too, this is a great time if you

[19:17] have any questions uh or have uh

[19:19] discussion topics that you'd like us to

[19:21] talk about,

[19:22] >> uh we can do that. We're trying to like

[19:23] fill the dead air of like you working on

[19:25] these with um general topics. So if

[19:27] there's something that you want us

[19:28] >> to say that part out loud.

[19:29] >> Oh, that's okay. Uh if if there's

[19:31] something that you want us to talk

[19:32] about, uh we can definitely do that.

[19:33] Otherwise, uh we've got some discussion

[19:35] topics that we thought we could talk

[19:37] about. Uh but if you also if you have

[19:39] any questions or um any of that we can

[19:42] definitely

[19:42] >> I'll run over to the bring you the mic

[19:44] and feel free to shout out any

[19:46] questions.

[19:47] >> Um but yeah if otherwise then feel free

[19:49] to uh just start on this

[19:53] and if there's any questions let us

[19:55] know.

[20:01] >> Yeah question. You want to run them?

[20:03] >> Sorry. Where's the question?

[20:09] There you go. Um, you talked a bit about

[20:12] this in the beginning. Um, but I always

[20:15] wonder where to draw the line between

[20:17] um, encoding instructions um, in like

[20:20] rules, cloud.mdg and so on and creating

[20:22] a skill for something. Um, so I'm

[20:24] curious if you have like h what's your

[20:26] mental model to making that decision?

[20:28] Like have you landed anywhere? Like do

[20:30] you always start with the rule and then

[20:32] you make a skill if you can make it

[20:33] specific enough or do you always start

[20:35] with a skill like how do you go about

[20:37] it?

[20:37] >> Yeah, great question.

[20:38] >> Great question.

[20:38] >> Uh I usually like like the the one the

[20:41] number one rule that you have to

[20:42] remember is that the skills sorry the

[20:45] claw.mmd or the agents.mmd that is going

[20:47] to be loaded every time when you kick

[20:50] off claude that's going to fill your

[20:51] context window. And if it's filling it

[20:53] with a bunch of nonsense that isn't

[20:54] actually applicable to what you're

[20:56] specifically doing then you probably

[20:57] don't want it in there. Um, I can show

[20:59] an example of like my uh what is

[21:03] it?claude.

[21:07] Uh, and then I think cloud.md if I can

[21:10] spell.

[21:12] This is my cla.md. It's extremely small.

[21:15] Uh, it just tells it that I want things

[21:17] to be a little bit more tur. Don't

[21:19] bloate. I just want to know exactly what

[21:21] you're saying. Uh, be extremely concise.

[21:24] And then I also like I have this plugin

[21:25] that I'm working on. It's a a skill

[21:27] actually called ideation. And I in here

[21:30] I put like some configuration for that.

[21:33] So that all of the projects I I

[21:35] basically want them all to put like the

[21:37] ideation, the artifacts that it's

[21:38] generating into uh my Obsidian vault. So

[21:41] it puts it all in there so I can more

[21:42] easily like find the connections between

[21:44] things. Um but otherwise it's like

[21:46] extremely tiny. And so that that's one

[21:50] thing that goes into it. if it's only

[21:52] relevant to the repo, like like

[21:53] specifically, you know, I'm tired of it

[21:55] using npm when I wanted to use PNPM, for

[21:58] example, I'll put that in there, like a

[21:59] single line that just says we use PNPM

[22:01] here. Um, and then anything else like if

[22:04] it's, you know, more specific about

[22:05] testing or anything like that, I kind of

[22:07] leave that to skills so that it's only

[22:09] going to be loaded when I'm actually

[22:11] like writing tests. to to the second

[22:13] part of your question as well. The and

[22:15] we'll talk about this a little bit

[22:16] later, but the other thing that's really

[22:17] fun to do is basically wait a week while

[22:20] working on it and then go back and ask

[22:22] Claude analyze my week's worth of work

[22:25] and then what are the skills I should

[22:27] split out of that based on this.

[22:29] >> Yeah.

[22:29] >> Um so again, ask the system to kind of

[22:31] help you do that. Another question back

[22:33] here. Yes, sir.

[22:34] >> Okay, you can hear me right? Yeah.

[22:35] >> Y

[22:36] >> um so stop me if you're going to talk if

[22:38] you're planning to talking about this

[22:39] later. I was wondering about uh global

[22:42] skills uh which we will share amongst

[22:45] colleagues. So we're all at the moment

[22:48] with we've got I think 60 engineers.

[22:50] People are writing their own skills.

[22:52] We're chatting on Slack. Oh, I've got

[22:53] this great skill. It's really good. So

[22:54] then obviously uh engineering managers

[22:57] are like well we should be sharing

[22:58] these. Where is where do we keep these?

[22:59] Where do we keep them in a repo? Um

[23:02] what's our artifacts library? And then

[23:04] others have said, "No, we don't want

[23:05] that because if I put my skill up and

[23:07] then someone's like, "Oh, I'm gonna

[23:09] change that." Then we're gonna have MR

[23:10] requests and then we're gonna have to

[23:12] review changes to skills.

[23:13] >> So then we'll get someone else saying,

[23:15] "Well, I kind of like a skill, but I'm

[23:16] now going to push my version of that

[23:18] skill with a very similar description to

[23:20] the shared repo, which everyone's going

[23:22] to get." And then suddenly we've got 10

[23:24] front end skills.

[23:26] >> Yeah.

[23:27] >> And they're all the agents then, which

[23:29] of these do I actually use? Yeah. Yeah.

[23:30] >> And we're wondering if you guys have got

[23:32] to that stage of how to maintain and

[23:35] then the next one is 3 months later a

[23:38] new model comes out and these skills are

[23:39] actually a little bit too verbose.

[23:41] >> So who's evaluating the skills and

[23:44] checking them and saying okay let's cut

[23:46] these from the global because now you

[23:48] get what I'm saying this is where we're

[23:50] at with

[23:51] >> y

[23:52] >> how and so a lot of engineers are just

[23:54] like

[23:55] >> no no no skills everyone does it on

[23:57] their own we are not sharing anything.

[23:59] So, sorry that was a bit of a rant. You

[24:01] get where I'm coming from.

[24:02] >> Yeah.

[24:02] >> Fantastic question. I'll take the first

[24:04] stab. Interested to hear what Nick says.

[24:06] We have um published uh maybe you want

[24:08] to pull it up like GitHub work OS

[24:10] skills. That was one of the first places

[24:11] that we started publishing generic

[24:12] skills and that's been incredibly useful

[24:14] because for example I was building

[24:15] generic rag pipelines and then we found

[24:17] that aentic tool calling is higher

[24:19] performance. So I can sideloadad those

[24:21] skills that Nick put in there that are

[24:23] specific to certain documents to the

[24:25] problem of individual engineers like

[24:27] saying I want a slightly modified

[24:29] version of this. I I I would almost say

[24:31] like in that case cool you've got a

[24:33] forked skill you keep locally.

[24:35] >> Um and then to your question about you

[24:37] know evaluating the skill I think asking

[24:39] claude like with your current model look

[24:42] at the skill using the skill builder is

[24:44] it right for truncation or is there like

[24:46] you know additional extensions that we

[24:48] need now? Um, but I'll also share that

[24:50] we are feeling that same pain as I'm

[24:52] sure everyone else is. And I think the

[24:54] management layer is just shifting to

[24:55] that kind of

[24:56] >> but even if you ask

[24:59] >> sorry

[24:59] >> no you're good.

[25:00] >> Even if you then ask cloth let's say a

[25:01] week later a month later hey review our

[25:04] skills there's 30 skills to review and

[25:05] it comes up with lots of suggestions.

[25:07] You then got to open a merge request for

[25:09] possibly one human or two humans or

[25:12] maybe you we can automatically say that

[25:14] the person who wrote this skill

[25:16] originally has to be one of the

[25:17] reviewers. they have. Have you got down

[25:19] to that yet where

[25:21] >> we we I don't think we've gotten to that

[25:23] level with ours because ours started

[25:25] kind of formalizing documentation into

[25:27] buckets that were then easily

[25:28] sideloadadable in different systems. Um

[25:31] that does sound painful. I'm curious to

[25:32] think what what do you think about that?

[25:34] >> We haven't even got there. We're just

[25:35] people have just like foreseen that this

[25:37] is going to happen. So they're actually

[25:39] blocking us using shared skills at work,

[25:42] >> right?

[25:42] >> Because they think this is going to be

[25:44] the problem. So

[25:45] >> like literally we're overthinking it

[25:47] massively. We should just do it and try.

[25:49] But still interested to hear what you

[25:51] guys

[25:52] >> Definitely. And I I also think it's

[25:53] going to evolve rapidly too, right? As

[25:54] we're seeing like there's still we

[25:56] haven't quite hit the LLM training wall,

[25:58] right? So there's going to be kind of

[25:59] additional capabilities coming online

[26:01] and and yeah, what does it look like in

[26:03] six months? Could we pair the skills

[26:04] down even further and get the same or

[26:06] better performance?

[26:07] >> Right. But yeah, I'll say that that's um

[26:10] >> yeah, that sounds like a typical human

[26:11] problem of uh my skill, your skill,

[26:13] right? Yep, we have a number of like to

[26:15] to build on that. Uh we have a number of

[26:18] ways that we solve that. Like Zach said,

[26:19] this um the skills repo, this is like

[26:22] our public skills uh that you can just

[26:24] install with like npx uh skills ad uh

[26:28] and and those are all available. But

[26:30] then we also have uh some like internal

[26:32] skills that are more uh generally

[26:34] applicable to like engineers at work OS.

[26:36] And so it's like there's an O

[26:37] specialist, there's a DX specialist,

[26:39] there's a ghostriter, different ones

[26:41] like that. Um, and then I have my own

[26:43] plug-in marketplace as well where I put

[26:45] a number of skills that are applicable

[26:47] to me. Uh, and so I just load from all

[26:50] of these uh in different ways. We also

[26:52] have like a big monor repo that like

[26:54] most of the engineers work in. And you

[26:56] can a lot of skills just end up in there

[26:57] if they're monor repo specific.

[27:00] >> Uh, that's a much easier place. But

[27:01] yeah, it's the same problem like you got

[27:03] to get a review on it or it's got to be

[27:05] it feels kind of dirty because you're

[27:06] just like appending that to the work

[27:08] that you're also doing. So, it's like an

[27:09] an add-on, which doesn't feel super

[27:11] great on the PR.

[27:12] >> If I reverse engineer to some degree the

[27:14] plug-in system, I think that's what

[27:15] they're trying to address kind of

[27:16] because you can also install like a

[27:18] version of a plugin the same way you can

[27:20] an npm package, right? So, maybe that's

[27:22] kind of like the interface on top of the

[27:24] repo. And then the tooling that I'm

[27:26] seeing everyone keep building repeatedly

[27:28] is like the tool that reads from a repo

[27:30] and installs skills into various places

[27:33] like 2 and stuff that make that kind of

[27:35] like nicer. But that might be a solution

[27:37] to some degree where it's like cool,

[27:39] there is this m, you know, master skill

[27:40] of this, but I'm running this version

[27:42] because I need this fork. Um, and then

[27:44] but it's not as gross as it sounds

[27:46] because there's an actual standardized

[27:48] API with the plug-in interface, right?

[27:50] >> And it's all versioned.

[27:51] >> Yeah.

[27:51] >> When you guys

[27:53] >> No, no, that's these are great. When you

[27:55] do you then have flags

[27:57] if you were to go into the public or

[28:00] your internal work

[28:03] I don't want skills even if the agent

[28:06] knows

[28:09] you then flag like I'm MPX public flag

[28:12] just front end or just UX or just

[28:14] product this just come to my mind I've

[28:16] never thought have you done it is it is

[28:18] it

[28:18] >> I haven't no um I haven't used NX for

[28:21] that I just used like the like I said

[28:23] we're mostly Claude I I use the the

[28:25] Claude marketplace like the SLP plug-in

[28:27] marketplace ad and as long as your

[28:29] Claude instance can uh access like an

[28:31] internal git repo, it can just pull from

[28:33] there. Uh and so that's what it does.

[28:35] >> It will pull all the skills even the

[28:38] ones that you don't need because you're

[28:39] a front end. You don't want the backend

[28:40] skills.

[28:41] >> Oh yeah.

[28:42] >> Yeah. Then that that almost sounds like

[28:44] a packaging thing to me. But I I I think

[28:46] that you're kind of like in good company

[28:48] in a sense that it seems like, you know,

[28:50] we're kind of got three marketplaces

[28:52] that are super relevant

[28:53] >> separate from or in addition to the

[28:55] project specific like skills, right? And

[28:57] then it just kind of becomes a matter of

[28:59] taste of each individual engineer saying

[29:00] like, "Oh, I'm going to run this version

[29:01] of that skill." But then something like

[29:04] the plug-in like interface is the way

[29:06] that you have a uniform way to approach

[29:07] it which you could actually write docs

[29:09] against for onboarding and say plugin

[29:11] add these three marketplaces when you

[29:14] come on board and then if you're on a

[29:16] front-end team like plugin install from

[29:17] the front end marketplace or whatever

[29:19] the case may be but that's like still at

[29:21] the end of the day on the back end

[29:22] that's like repo management and it's

[29:24] right it's similar to how it works with

[29:26] code.

[29:26] >> Yeah.

[29:27] >> Yeah. Great questions. Um yes sir.

[29:31] I was gonna ask.

[29:32] >> Yeah. Uh so actually two questions. The

[29:34] first one is do you do any like formal

[29:36] skill evaluations like a skilled

[29:37] benchmark so that as new model drops

[29:39] which skills are relevant?

[29:41] >> Yes. Um in the the public skills

[29:44] specifically on the the ones that I use

[29:46] internally I am a little less formal

[29:47] about it. Uh but the ones that we

[29:49] actually ship uh we do ship uh in the

[29:54] where is it? We have like a whole eval

[29:58] framework uh that we wrote to make sure

[30:01] that it it lives up to the standards

[30:03] that we have and we're gonna we're going

[30:04] to talk about this a little bit but like

[30:05] it's mostly uh like doing several runs

[30:09] where it will load claude without the

[30:12] skill and ask it to do a task and then

[30:13] load it with a skill and then it kind of

[30:15] has like a rubric on confidence or or

[30:17] like a grade that it gives it and it's

[30:20] it it'll fail if that grade is less with

[30:23] the skill than it was without. uh it'll

[30:25] also fail like it you know it it tries

[30:27] to be I think 80% above or higher so

[30:29] like 80% of the time uh or maybe it's

[30:31] 90% uh it's going to get this right with

[30:34] the skill and sometimes it gets it right

[30:36] without the skill so the skill is maybe

[30:37] only adding one or two% to it but that's

[30:39] something that we track and keep on top

[30:41] of as new models drop.

[30:43] >> Yeah.

[30:43] >> Okay. Yeah.

[30:43] >> It's it's sort of fuzzy math but it's

[30:45] almost like by having this this

[30:46] established baseline you can at least

[30:48] test that way.

[30:49] >> Yeah, it makes sense. And then the

[30:51] second question was u about um

[30:56] sorry one second

[31:02] right u skill pickup uh so if you get

[31:05] lots of skills the models might ignore a

[31:07] skill or decide I don't need a skill

[31:08] I'll just I'll just do it what's your

[31:10] kind of experience with this to a like

[31:12] test it find it and then maybe improve

[31:13] it

[31:14] >> yeah um great question we that that is a

[31:18] problem and the more skills that you get

[31:19] like you can have conflicting skills Uh,

[31:21] and so like which one is it going to

[31:22] pick? Um, the solution to that like like

[31:26] for the work OS one specifically like we

[31:28] try and keep it like for these public

[31:30] ones we try and keep it like very

[31:31] generic like mention all of the you know

[31:33] the the acronyms and things that we

[31:34] would want we would expect to cover uh

[31:36] from that. So that'll trigger it to load

[31:39] uh and it usually does a pretty good

[31:40] job. You can also like if you're in a

[31:42] skill uh or sorry in claude uh you can

[31:45] just do like work OS for example like

[31:48] the slash command uh if you know that

[31:50] you want to do it and so like a lot of

[31:52] times we'll just like suggest you know

[31:54] if if that's what you want I'll say like

[31:56] just run slots and it'll it'll load it.

[31:58] I

[31:58] >> I'll call a skill by name if I want a

[32:00] specific like image gen or something

[32:01] I'll say or I'll say like use the

[32:03] superpowers brainstorm skill in order to

[32:05] determine a better plan.

[32:06] >> Yeah.

[32:07] >> Yeah.

[32:08] >> Yep. But also if you got if it really

[32:10] wasn't behaving that's why you use the

[32:12] bang and then put a command.

[32:14] >> Right.

[32:15] >> Yeah.

[32:18] >> Um I had a question on um how do you

[32:22] decide when to create a sub agent versus

[32:26] a scale? And can you reuse a scale into

[32:29] a sub aent? And there's just sometimes

[32:32] that um I'm going to create a skill and

[32:34] then I'm going to like uh maybe I should

[32:37] have written um a CLI cuz uh why did I

[32:41] even made a skill in the first place and

[32:43] I I struggled between these three

[32:46] things?

[32:47] >> That's a great question. Uh on the can

[32:50] skills can sub agents use skills? I

[32:52] actually I'm like blanking on that. So

[32:54] I'm asking Claude uh and you can see

[32:56] that it loaded the claude code guide pl

[32:58] skill to go check that. Uh so this is a

[33:01] great example of doing that and we'll

[33:03] get the answer here in a moment. Uh but

[33:05] that's a great question. Uh sub agents

[33:07] is something that we don't cover a ton

[33:08] in this workshop. Uh, but it is

[33:10] something that's super valuable. And the

[33:11] the number one thing that I think is uh

[33:15] think of like when I think of when to

[33:16] run a sub agent versus a skill is do I

[33:19] want it to have its own standalone

[33:20] context? Uh so that it can go do like a

[33:23] bunch of work on on something and then

[33:25] that's not eating the context window of

[33:28] like the main task job that that we're

[33:30] doing. Uh and then that way it can just

[33:32] like do a check-in on that. And so um

[33:35] for example I have this ideation plugin.

[33:37] It's kind of like a a planner or a uh a

[33:40] superpowers uh type thing that I like

[33:42] doing. And as part of that, like I'm

[33:45] really like focused in on feedback loops

[33:48] to itself so that it doesn't have to

[33:50] bother me all the time about, hey, does

[33:52] you know, does this look correct? Or

[33:53] like tell me, oh, it's done and it's

[33:54] totally not done. Like I want it to

[33:56] prove to me without me having to go look

[33:58] at the code that it's it did the work

[34:00] that I expected it to do. And oftentimes

[34:02] that's feeding the information that I

[34:03] would look for back into it and making

[34:05] it just go in a loop over and over. I

[34:07] hear there's a a Ralph Loop's uh

[34:10] workshop after this, so you should check

[34:11] that out. Um, but it uh

[34:16] like in that case like when it's doing

[34:17] those reviews, those can like muddy it

[34:19] up and so like I kick off a sub agent to

[34:21] go do those reviews and then it just

[34:22] reports back like ah there I found these

[34:24] problems and then it just has a list of

[34:26] those problems and then it can feed back

[34:27] to itself to do it again. So I'm not

[34:29] eating that full context window every

[34:30] time.

[34:31] >> Yeah. Now also further confused by agent

[34:33] teams which are different than some

[34:35] agents too, right?

[34:37] Yeah, another question. Thank you.

[34:40] >> And

[34:42] another one another question here.

[34:44] >> Yes. Um, I have a question about the the

[34:47] overrides in a skill. So, for instance,

[34:49] you you put a default and you say or

[34:51] whatever the user decides, but I find

[34:53] it's very random or at least I cannot

[34:56] really reproduce that and sometimes the

[34:58] overrides doesn't work.

[34:59] >> Yes.

[35:00] >> Do you have any idea or like I I just

[35:03] want to find out what's going on?

[35:06] Uh my my best suggestion for that is

[35:08] just ask Claude like why did you pick

[35:11] that over the other thing? Uh and how

[35:13] can I improve that in some other way?

[35:15] Like like you consistently or like you

[35:18] consistently enough pick the wrong

[35:20] choice or you don't respect my override?

[35:22] Why is that? What can I do to improve

[35:24] it? Um I wish I had a a more clever

[35:27] answer, but usually it's just like I ask

[35:30] the machine.

[35:30] >> Just just ask Lord. It's good enough.

[35:32] Thank you.

[35:34] >> Great question.

[35:42] question.

[35:42] >> You called out superpowers was a

[35:46] >> skills library that you referred to. Is

[35:48] there other uh skills libraries beyond

[35:51] you guys that you commonly use?

[35:54] >> Yes. Uh definitely. So superpowers is

[35:57] one that I actually didn't use until

[35:58] yesterday when Zach showed me it. Uh and

[36:01] I I installed it. It has a number of

[36:03] different skills in it that are are

[36:04] pretty helpful. Um, these slides are

[36:06] actually written in slide dev. Uh, and

[36:10] you might notice well you won't uh I

[36:13] don't know if I committed it. Um, let me

[36:15] go to the full repo here, but in here

[36:17] there's an agents directory and a skills

[36:19] and a slide dev skill. And Claude might

[36:22] have had a hand in writing these slides.

[36:24] Uh, which is really cool. We'll kind of

[36:26] talk about that. But like some of the

[36:27] real superpowers I think are like when

[36:29] you assign it to do non-coding things uh

[36:32] because you really feel this magic. Uh

[36:34] and we'll we'll kind of show a demo of

[36:36] the reotion skill. That one blew my

[36:39] mind. Uh it's it created a video based

[36:41] off of a prompt and

[36:43] >> I I now use that as my so every Friday

[36:45] when we have the all hands and it's like

[36:47] what quick demo of what you got done

[36:48] this week, right? It just reads my git

[36:50] history for the week and then builds a

[36:53] movie

[36:54] about it. which everyone is was tired of

[36:57] on week three and they're not going to

[37:00] they're not going to stop. They're just

[37:02] going to get more like I'm going to

[37:03] introduce characters and it's going to

[37:04] get awful. But uh yeah, the Remotion is

[37:07] incredible. It'll even pop up a like

[37:09] Chromebased web editor where you can go

[37:11] and be like h trim and cut and like let

[37:12] me add some fades, right? Um so that's

[37:15] insane. And then my favorite one that I

[37:17] probably got the most leverage of uh

[37:18] since installing it was just a I I built

[37:20] it with Claude just a simple Python

[37:22] wrapper around Nano Banana. um the image

[37:25] gen model from Google which continues to

[37:27] improve. So I just say hey now it's on

[37:29] v3 go update it and we'll show a little

[37:32] something later but um essentially with

[37:34] that so most images now I generate with

[37:36] that it takes like sub seven seconds in

[37:39] a single prompt but using that same

[37:41] model is able to say uh take a single

[37:43] string from the user that's a prompt say

[37:45] like a child running through a field

[37:46] first it makes that image then it uses

[37:48] their video API vo hands that static

[37:52] image to it and says animate this static

[37:54] image in the most obvious way possible.

[37:56] So, one user prompt of child running

[37:58] through field, nothing exists, and then

[38:00] 30 seconds later, you have a video of it

[38:02] running through. And I was able to use

[38:04] that same method to do all of the

[38:06] interstitial scenes that I needed in a

[38:08] 32-minute film. And I am not a video

[38:11] person. Like, I mean, I like using like

[38:12] Da Vinci Resolve and editing stuff, but

[38:14] I'm not an animator. And I was able to

[38:17] get all of that done in like maybe an

[38:19] hour. Um, so those are those are pretty

[38:21] trippy, too. um you want to get really

[38:24] really down there. Like I've got I have

[38:25] like Claude reading my biometrics and

[38:27] stuff and like pushing back on me and

[38:28] telling me to like take it easy this

[38:30] afternoon because he didn't get any

[38:31] sleep. So um but there's there's not

[38:33] like necessarily skill for that yet. I I

[38:35] think the the ones that are really

[38:36] powerful are when Claude uh the other

[38:38] day blew my mind by saying it was also

[38:40] in superpowers. This is easier for me to

[38:42] show you the variants if I just mock

[38:44] them up in a web browser. Would you

[38:46] prefer that? And I said yes please. And

[38:48] then it showed me all those and I was

[38:49] like a go. And then we just built from

[38:51] there like saving countless tokens on

[38:54] just text iteration.

[38:57] >> And I'm using that nano banana skill

[38:59] right now. But uh I just ran SL plugin

[39:01] and I'm looking at the marketplaces I

[39:03] have installed. And some of the most

[39:04] important ones to me I think are the the

[39:06] claude cload plugins official one. Uh I

[39:09] think that's where it has a nice um

[39:11] skill reviewer skill or skill creator

[39:13] skill. Uh which is really good. Uh

[39:16] Obsidian is something that I use all the

[39:18] time. Uh, and so having the obsidian

[39:19] skills and it knowing just how to use

[39:21] that. Uh, so it's based on what I want.

[39:23] But then also one that, uh, is actually

[39:26] very good. Oh, where did it go? Plug in.

[39:29] Uh, is the, um, codeex skills

[39:34] marketplaces.

[39:36] I don't know why it's not showing it

[39:39] there. The OpenAI codeex ones. Um,

[39:44] it's not scrolling down, but anyway,

[39:46] that is like uh Claude does all this

[39:48] work. Codex is pretty good at reviewing

[39:50] it. So, this is a skill from OpenAI that

[39:52] just like pipes that to Codex and says

[39:54] review this and it goes and reviews it

[39:56] and then delivers that back to Claude

[39:58] and I have cut myself out of the copy

[40:00] and paste game of Claude said this and

[40:02] Codex said that and like going back and

[40:04] forth in in T-Ux splits. So, I'm I'm

[40:06] super happy about that.

[40:07] >> Yeah, I would say Verscell is pretty

[40:08] skills forward. They've got a bunch of

[40:10] CLIs and stuff that are are pretty

[40:11] interesting. So they and they were like

[40:13] kind of the first on using some of the

[40:15] marketplace stuff. So check out their

[40:17] like open source skills stuff too as

[40:18] well.

[40:21] Great question. Thank you.

[40:24] Okay.

[40:27] >> That's what Nana Banana just made.

[40:30] >> Close. Close.

[40:33] >> Yeah.

[40:33] >> Awesome.

[40:34] >> But the fun thing about that is that you

[40:35] can ask it for any style. So you can say

[40:37] like I I mostly do pixel art. Um so I'll

[40:40] say like you know old school pixel art

[40:41] and uh it's a lot of fun.

[40:43] >> Yeah. All right. We are at time for this

[40:47] uh piece of it. Did anyone uh build a um

[40:51] a gen a first like pass on the repo row

[40:54] skill that they want to share?

[40:55] >> Yeah.

[40:57] >> Cool.

[40:57] >> Awesome. If you want to run umshare.sh

[41:03] >> Oh, cool. Sweet.

[41:04] >> This guy. All right. wins the workshop.

[41:06] >> All right. Uh

[41:07] >> are you Sharif?

[41:10] >> You're Sharief. Okay. Are you uh

[41:14] Okay, I'll run uh Well, I'll just run

[41:17] all three of them real quick. Uh so I'll

[41:18] run them on the uh skill. Oh, sorry.

[41:21] This workshop.

[41:24] Oh, what did they do?

[41:26] >> It's pretty safe. Don't you want to run

[41:27] it against like work OS or something or

[41:29] the CLI?

[41:30] >> Uh yeah. I just realized that it loaded

[41:31] it locally into this one, not in a

[41:34] global way.

[41:35] >> Oh,

[41:36] >> uh, I can do that.

[41:40] >> Okay,

[41:44] >> sorry.

[41:46] I'm going to give it the work OS CLI and

[41:49] then I'll say uh repo roast zackb on the

[41:55] uh CLI repo. We'll see what it does.

[42:01] It's a new verb for defending the herb

[42:03] bird.

[42:04] >> Oh yeah, you can c you can uh customize

[42:06] those. So I a lot of my uh spinner verbs

[42:10] are Lord of the Rings or the office

[42:12] themed. Uh so you'll see like defending

[42:14] us and things like that.

[42:26] I didn't I didn't think that would work,

[42:28] but that's okay. It's running against

[42:30] this the uh workshop repo.

[42:32] >> Okay.

[42:38] So, it's running all of the commands uh

[42:40] that you gave. And while you're while

[42:42] we're doing that, I will bring that up.

[42:50] So this is Zach's skill. Nice good

[42:53] description.

[42:55] Analyze repository health by running git

[42:57] and file system scripts to find stale

[42:59] to-dos. Churn hotspots. Yeah, that's

[43:01] good.

[43:04] And then it tells it specifically how to

[43:05] find stale to-dos. Awesome. Hotspot

[43:08] files, largest files. Nice. Constraints.

[43:12] Never be vague for evidence. Never

[43:15] present a finding without a script

[43:16] output or get data backing it. That's

[43:18] probably why it's running still. Oh,

[43:20] nice.

[43:22] Um, yeah. Scope.

[43:28] Okay, Zach B. Okay.

[43:30] >> Nice.

[43:31] >> Nice skill.

[43:32] >> You uh didn't tell it to to just like be

[43:35] mean to you, so that's

[43:36] >> be super mean to Nick and Zach over on

[43:38] stage.

[43:39] >> Awesome.

[43:42] >> Hi, Amy. She's pretty mean sometimes.

[43:47] >> All right. Awesome. We will we'll run

[43:49] more of these. We've got more uh more

[43:52] things to get through. Uh and we'll

[43:53] we'll do this again and we'll we'll test

[43:55] another one. Y uh so moving on to the

[43:58] next section. Uh we're going to make

[44:00] that skill smarter.

[44:02] So the first thing uh that you can do to

[44:05] make your skills smart uh is by

[44:07] providing more information to it. But

[44:09] this gets into the problem of the

[44:11] claw.md where you can be extremely

[44:13] verbose in there and give it so much

[44:14] information about your repo and you're

[44:16] just bloating the context window because

[44:17] it doesn't really matter. Well, you can

[44:19] do the same thing in skills uh but you

[44:21] can do it in a better way. And that is

[44:24] specifically with progressive

[44:25] disclosure. And I guess you could do

[44:26] this in a cloud. MD as well. Uh but all

[44:29] it is is just saying like hey if you're

[44:31] thinking about doing testing for excuse

[44:34] me for example uh load this file that I

[44:36] have on testing and read through it. Uh,

[44:38] and you just give it like a path, like a

[44:39] local path to testing.m MD or whatever.

[44:43] And that way it's only going to load

[44:45] that if it's actually doing like a

[44:46] testing skill or testing task as part of

[44:48] the skill run. If it's not, it'll skip

[44:50] that. And so you can uh specifically

[44:52] tell it like, oh, in in this example,

[44:55] uh, if you're doing like a scoring, like

[44:57] if you're if this is a run where it's

[44:59] doing scoring, run the scoring uh load

[45:03] the scoring rubric uh, and read through

[45:06] that. So we explain to you how to score

[45:08] things properly. If we're not doing

[45:09] scoring, you don't have to load that and

[45:10] we don't have to fill up the context

[45:12] window with all of that bloat.

[45:13] >> Yeah, this also gets back to that

[45:14] gentleman's question in the back too of

[45:16] like you can imagine this pattern really

[45:17] scaling out. So the way that it actually

[45:19] did scale out even in our public work OS

[45:21] skills repo you can go and check out. We

[45:23] have multiple migration guides that we

[45:24] publish for various folks. So like if

[45:26] you're coming from Ozero, we'll happily

[45:28] help you move off Ozero to get to work

[45:29] OS. And then there's n number of you

[45:32] know competitors essentially that we've

[45:34] got migration scripts for. And so in

[45:36] this case you could say here's the

[45:38] migration skill and the migration skill

[45:40] is a pointer to the specific reference.

[45:42] So you're not bloating your context

[45:43] window. It's just loading the two

[45:45] markdown files it needs.

[45:46] >> Yep. And if you look at the work OS

[45:48] skill like it we literally call it skill

[45:50] router uh in there and it just has like

[45:52] a reference map. So if you're going to

[45:54] install offkit into next.js you should

[45:56] probably load the work offkit

[45:58] next.js.mmd js.mmd file uh from the

[46:00] references and so if you're not working

[46:02] with nextjs we don't want we don't want

[46:04] to load that and bloat that we only load

[46:06] it when you need it for all of those and

[46:07] so this file is just filled with uh

[46:10] routing to the actual pertinent

[46:12] information that you need

[46:19] okay um another way this is again to

[46:22] some degree it's fuzzy math under the

[46:23] hood right if you really get down to

[46:24] like matrix multiplication but uh

[46:27] nevertheless Another way to boost

[46:28] performance here is to kind of enforce

[46:30] confidence scoring. And one of the

[46:32] reasons that Nick's uh ideation plug-in,

[46:34] which is open source, that you can go

[46:35] check out, works so well is that it has

[46:37] like an internal counter of confidence

[46:39] of how close am I to fully fleshing out

[46:41] all of the variables that this task

[46:43] requires before I can go and execute.

[46:45] And it then forces like a iterative loop

[46:48] with the user of continuously asking

[46:49] additional questions until it gets to

[46:51] the point where it's like, I'm 95% or

[46:53] above confident. I've mapped most of

[46:55] this problem space in my head and now we

[46:58] can start work and the result as um you

[47:00] know as a result the the output is

[47:02] likely better. Um and so you that same

[47:05] concept applies here when you're you

[47:06] know building skills you can you can

[47:08] kind of add in that that same

[47:09] functionality and say uh for this

[47:12] particular aspect of the codebase you

[47:13] must always find this evidence and then

[47:14] get to a point until you know the tests

[47:17] are either this level of coverage or you

[47:18] have this level of confidence on on A B

[47:21] or C. Um, and that's another way to

[47:22] essentially boost performance in the

[47:24] skills.

[47:24] >> Yeah. Uh, it's it's really important

[47:27] like like like Zach was saying, it's

[47:29] just like kind of pulling that number

[47:31] out of nowhere. If if you say, "How

[47:32] confident are you?" And it's like, "I'm

[47:34] sure confident." Uh, well, why? And as

[47:36] you give it like ask it to like show

[47:39] more of its work as to why it's

[47:40] confident, it might be like, "Oh, wait.

[47:42] I'm not actually as confident as I

[47:43] thought." Uh, and so that's the whole

[47:44] thing is like trying to get it to think

[47:46] more. uh in the terms of of like the the

[47:48] ideation skill uh what it's doing is

[47:50] it's using that to assess that it has

[47:53] like a full understanding of what I'm

[47:55] trying to say because like I have a

[47:57] problem where I don't give it enough

[47:59] information. I have the information I

[48:01] know what I want. It's hard for me to

[48:02] express it to the the machine in a way

[48:05] that it expects. Uh, and so it's using

[48:08] that confidence score to say, "Ah, I

[48:10] don't have like a full rounded

[48:12] understanding." And it loads like a

[48:13] whole rubric on what it means to be

[48:15] confident on something. Uh, but then if

[48:17] it's not confident, it uses uh Claude's

[48:20] built-in ask user question tool to ask

[48:22] me a number of questions to pull that

[48:24] information out of me rather than me

[48:26] being like, "Ah, you're not confident.

[48:27] Let me try and give you more insight."

[48:29] It's like, "No, I'm not confident

[48:31] because of these things." And then

[48:32] here's how you can make me more

[48:34] confident by answering these questions.

[48:35] And a lot of times it'll just give me

[48:37] multiple choice on like, you know, do

[48:38] you want this? Is this what you mean?

[48:40] This is the recommended approach I would

[48:41] take, but if you want to go this other

[48:42] way, we could do it that way. Uh, and so

[48:44] like we have that dialogue going back

[48:46] and forth with it, but it's all based

[48:48] around how confident is it that it

[48:50] understands what I want and understands

[48:51] how to do what I want.

[48:58] >> Uh, yeah. And so then this gets back to

[49:00] uh just kind of in practice the way this

[49:02] works or at least how it has for me and

[49:03] what we kind of recommend is you know

[49:05] build an initial skill. Maybe you're

[49:06] doing that yourself in Markdown. Maybe

[49:07] you're using the skill builder in Claude

[49:09] and saying I need a skill to do X.

[49:11] You're doing it you're using that skill

[49:12] for a couple of iterations maybe a

[49:14] couple days maybe a week. Um you look at

[49:16] what it produces and then you know keep

[49:18] in mind that as you're having multiple

[49:20] conversations with say Claude over the

[49:21] course of a week all of those

[49:22] conversations are even getting saved

[49:24] locally to some degree in JSONL files.

[49:26] And so you can um be honest with the

[49:29] evaluation phase about is this actually

[49:31] improving things? Is it not? Where does

[49:33] the skill fall short? What are the edge

[49:34] cases it's not currently capturing?

[49:36] What's the annoying thing that I've now

[49:38] discovered that I've been running at 7

[49:39] days that it's missing? And then you

[49:41] kind of iterate and but again you're

[49:43] still going faster because you come back

[49:45] to a state that's already working and

[49:46] you say these three edge cases are

[49:48] driving me nuts and you also need to be

[49:50] able to like review your own PRs in the

[49:52] future, right? And so then once that

[49:53] loop is is done, you have a skill that's

[49:56] significantly more powerful and then you

[49:57] can keep keep on running from there. But

[49:59] it's kind of like they're sort of

[50:00] evolving over time. Um so they're again

[50:03] like I think of them as like

[50:04] organizational units of where to put

[50:06] kind of you know work intelligence and

[50:09] then over time if you're if you're doing

[50:10] it right they're getting better.

[50:12] >> Yeah. when when skills first came out,

[50:15] uh Zach and I were actually at an

[50:16] on-site together in San Francisco and uh

[50:20] like we woke up one morning and they're

[50:21] like us introducing skills and we're

[50:22] like this looks like every other

[50:24] markdown file that they provided. What

[50:26] what's the difference? And um at like

[50:29] later that day, we presented on on

[50:31] skills like I don't know four hours

[50:33] later. And the the one that I built to

[50:35] present that was a claude skill claude

[50:37] skill uh that would analyze the like it

[50:41] wouldn't analyze your skill running

[50:42] because nobody had skills like four

[50:43] hours into them existing. But it would

[50:45] analyze, oh, you just did this task with

[50:48] Claude. Let's go through and pick out

[50:50] what could have been what what we could

[50:52] like encapsulate into a skill so that it

[50:53] can do that in an easier way. And like

[50:56] since then there's like meta-kills and

[50:57] things like that that have come out

[50:58] where it will analyze the performance of

[51:00] actually how you're using claude or how

[51:02] you're using the skills in cloud and

[51:04] then it can use that to feed back in

[51:06] just like Zach was saying just by

[51:07] looking at those JSNL files there are

[51:08] these logs of like the conversations

[51:10] that you're having with claude and uh

[51:12] that can inform it on how to pro improve

[51:14] things. So, for example, like in the

[51:16] repo roast, uh if it's kind of being

[51:20] wonky about how it's pulling in get

[51:22] information, adding in like the the bang

[51:25] with uh like the specific git command

[51:27] that you want it to run to get log

[51:28] information, that's a way to improve it

[51:30] so that it doesn't have to iterate over

[51:32] that and say and you come back to it and

[51:34] say, "No, that's not what I wanted. I

[51:35] wanted it like this." like you you can

[51:37] be more explicit with it and that can be

[51:39] fleshed out by reviewing the performance

[51:42] that you had the first time or the first

[51:43] couple of times.

[51:44] >> The the other intuition I'll share is

[51:46] that um it's kind of like in my

[51:48] experience recently it's the types of

[51:49] nagging things that I find the most

[51:51] cognitive like resistance to doing every

[51:54] week that I actually need to turn into

[51:56] skills. And so like a breakthrough

[51:58] moment for me was realizing that like

[52:00] context switching between Slack and

[52:01] focusing on code and then going and

[52:03] ticketing like new asks in linear was so

[52:05] disruptive to me that I just needed

[52:07] Claude to do that. So now it just

[52:09] monitors and when someone asks me for

[52:11] something new in Slack, it goes and

[52:12] looks in my linear and then if there's

[52:14] not a ticket for it already, it does do

[52:16] dduplication, adds a new ticket and then

[52:18] I'm haven't left my flow, right? I'm

[52:21] still able to focus. And so like that's

[52:24] kind of the intuition I have now is that

[52:26] um you can sort I think it's really

[52:28] powerful and I think we're only at the

[52:29] very beginning of it like analyzing your

[52:31] own workflow over time feeding it more

[52:33] information about how you actually work

[52:35] >> and then letting LLMs you know do what

[52:37] they're really good at and compress down

[52:39] that that actual time.

[52:42] >> Is there a skill out there that you

[52:44] recommend for that? Was there

[52:47] >> is is there a skill that you mentioned

[52:49] that there is skills out there that met

[52:50] as skills to review your kind of past

[52:53] conversations and propose skills or

[52:55] improvements? Is there one that you use

[52:57] or

[52:58] >> that one? There's not one for that. But

[53:00] um and I didn't do this myself the last

[53:02] time. This was like last week. But what

[53:03] I should have done is say, "Hey Claude,

[53:05] use skill builder yourself." Because

[53:07] Claude's got that baked in skill hyphen

[53:09] builder, I think it is. Use skilluer to

[53:12] um look back at my workflow and tell me

[53:14] where it's the least efficient. Right.

[53:16] And then um that's also pulling in

[53:18] connectors because there's a Slack

[53:19] connector and there's a linear

[53:20] connector. So that's where like the

[53:22] markdown might be referencing you must

[53:24] always use the Slack connector to pull

[53:26] in this and I only care about these

[53:28] channels and direct mentions of my name,

[53:30] right? Um but yeah, I think it might

[53:32] even be faster in some cases to just say

[53:34] here's where I work. This is the tool

[53:36] that we use to communicate. Make me a

[53:38] skill that does that.

[53:40] >> Which is also like kind of crazy. I

[53:42] think this is the one that I was

[53:43] thinking of uh specifically is cloud

[53:45] meta skill uh that helps you configure

[53:47] claude uh including like setting up

[53:49] those skills. Uh I think this is the one

[53:51] I've used but like Zach said I've also

[53:52] just asked it to review its own

[53:54] performance and kind of go from there.

[53:56] Uh one really great thing is like I

[53:58] built this pretty cool tool and I wanted

[54:00] to write a blog post about it and uh it

[54:03] it was all built with Claude. So I was

[54:04] able to just go ask Claude, "Hey

[54:06] remember that time we did this fun thing

[54:08] together? Let's reminisce about and we

[54:10] just like talked about it and it like

[54:11] led to these anecdotes that I added to

[54:13] the blog post that I I completely forgot

[54:15] about but there Claude was very fond of

[54:17] that moment between us.

[54:19] >> That's not what's happening. You don't

[54:20] understand that. Okay.

[54:21] >> No, I don't.

[54:22] >> Under the hood, that's not what's

[54:23] happening.

[54:23] >> Don't lie to me.

[54:24] >> Do you use any skills for memory for

[54:27] maintaining a a like memory state within

[54:30] Claude?

[54:30] >> Great question. Uh Claude has its own

[54:32] memory built in. Uh and I there's that

[54:35] autodream thing. I don't know if that's

[54:36] real yet or if it's like a a thing

[54:38] that's coming, but it will actually like

[54:40] prune the memory. And so I've been like

[54:42] focused on building around that. Uh but

[54:44] I've been building it on in Pi

[54:46] specifically. Uh and so like I built

[54:49] this um I I built like what it would

[54:51] take to be a a DX engineer at work OS as

[54:54] like a full agent using PI and it's

[54:56] called case and uh it uses memory

[55:00] internally like memory.mmd files and it

[55:02] works across all of our open source

[55:03] repos. Uh, so it knows like React and

[55:06] React router and next and tan stack

[55:08] start and all of those. And so then it

[55:10] has like general memory files and then

[55:12] like framework specific memory files and

[55:14] it goes in and prunes those and updates

[55:16] by doing like as part of its flow doing

[55:18] a retrospective at the end and analyzing

[55:20] its own performance and then saying,

[55:22] "Oh, I spun I spun in a circle a bit for

[55:25] this. I could have like once I got to

[55:26] there like I can just save that to

[55:28] memory so I know like this is the

[55:30] command I run next time to get the

[55:32] information I need." and it just keeps

[55:33] track of that. I haven't built in like

[55:35] the full dreaming thing where it prunes

[55:36] that yet, but um I I'm experimenting

[55:39] with it.

[55:40] >> Yeah. And also I I want to play with the

[55:41] Obsidian connector more because I think

[55:43] that would be super powerful. I I had a

[55:45] habit in the past of using Obsidian and

[55:46] just making a daily to-do with just the

[55:49] date as the title. And then so I think

[55:51] writing to and reading from those vaults

[55:53] so that you could imagine saying look

[55:54] back over the last week, last week it's

[55:56] translated into what are those actual

[55:58] dates. It fetches those files directly,

[56:00] right? And then it can also write

[56:01] consolidated memories. It's also

[56:03] worthwhile playing with things like open

[56:05] claw which I' I've done because that

[56:07] memory system that it ships with was

[56:09] surprisingly good, better than a lot of

[56:11] like stock claw or openis stuff. And so

[56:14] seeing how it does that with like daily

[56:16] journal MDs and then the consolidated

[56:18] memory which I think the dream stuff is

[56:20] kind of pointing towards like

[56:21] consolidating memory over time.

[56:23] >> Yep. Um, but a lot of times the crazy

[56:25] thing about this is like the answer is

[56:27] one turn request with skill builder is

[56:29] the fastest way

[56:30] >> pointing it to Yeah,

[56:32] >> this is a good

[56:33] >> Yeah, 100%.

[56:34] >> Y

[56:35] >> um so we're going to jump into the next

[56:37] uh piece of of work on your side and

[56:39] that's adding phases uh and confidence

[56:42] scoring to it. So adding progressive

[56:43] disclosure, uh adding a confidence

[56:45] score, telling it like how confident are

[56:47] you in in this or like like uh we we've

[56:50] got some examples uh of that potentially

[56:52] like uh you know what's a good example?

[56:57] >> Um

[57:00] how confident are you in this? You know,

[57:01] you've installed offkit correctly.

[57:03] >> Yeah, but I mean like for repo rows.

[57:05] >> Oh, for repo.

[57:06] >> Uh you you know, you gave me a bad score

[57:10] on I don't know, git commits. Why is

[57:12] that? Like,

[57:13] >> okay,

[57:13] >> have it dive down deeper than just

[57:16] >> this is our pattern of how we use git

[57:17] commits. We always have our messages

[57:18] like this. We're following these

[57:20] conventions. So then based on that,

[57:21] what's your confidence that this is

[57:23] >> correct to our repo?

[57:24] >> So, for example, you might use uh

[57:26] conventional commits at your work and if

[57:28] you find commits that aren't like that

[57:29] or you find a bunch of merge uh commits

[57:31] in there,

[57:32] >> for shame. Uh but yeah, like different

[57:36] things like like that you can you can

[57:37] add uh specifics to and have that as be

[57:40] as a u a progressively disclosed rubric

[57:44] that it can follow for those things.

[57:46] >> A quick housekeeping thing in case uh

[57:48] for any reason you you're behind or feel

[57:49] behind, uh you can run setup.sh and then

[57:51] checkpoint two to get to the same spot

[57:53] that we're at now. Y

[57:56] >> and then yeah, any other questions feel

[57:58] free to shout out and I'll run you a

[58:00] mic.

[58:03] We'll spend about five minutes here uh

[58:05] and then we'll move into the next

[58:06] section just to make sure we have enough

[58:08] time.

[58:14] Do you want to talk about um any of

[58:17] these topics? Zach,

[58:20] I can talk about when confidence when um

[58:23] yeah, confidence scoring saved us.

[58:25] >> Yeah. What's that? that uh was when we

[58:28] were working on the um when confidence

[58:31] scoring saved us

[58:34] the uh well that was kind of built into

[58:37] the eval uh that we wrote like claude

[58:39] ships with a whole eval framework now

[58:41] that you can use uh and it'll like spin

[58:43] up a guey for you like a it'll create an

[58:45] HTML report and you can see like before

[58:48] and after and all of this insight into

[58:50] how your uh skills are running uh and

[58:53] whether they're actually like improving

[58:54] cloud or making Claude worse at the

[58:56] task. Um, but before that existed uh I

[59:00] was writing my own to do that and uh it

[59:03] was all based on on that. And so like

[59:06] let me let me bring up the um

[59:09] ideation skill and I'll just say let's

[59:12] see we'll go to the CLI

[59:16] and I'll say

[59:21] >> so for context this is our work OS CLI

[59:23] that we're building in the yeah

[59:25] >> I'm on the main branch of that I use

[59:26] work trees for that um what's a feature

[59:29] that we want to add I want to add a fun

[59:33] slashbuddy command similar to how Claude

[59:36] Code shipped that for April Fool's Day.

[59:40] I used a tool called Whisper Flow uh to

[59:43] go full Wall-E and not even type

[59:45] anymore. Uh and I just press a button.

[59:49] This is how I code now.

[59:50] >> Um

[59:52] >> do you prepare that over the closed

[59:54] voice mode?

[59:54] >> Uh yeah, I do. I've been on Whisper Flow

[59:56] for maybe a year now. And the thing I

[59:58] like about it is that it can uh input

[1:00:00] anywhere on on uh Mac. So, you know, if

[1:00:03] you're in uh some funky old like website

[1:00:06] in Chrome, it works there. It works in

[1:00:08] Safari, works on any app that you've got

[1:00:10] as long as you can focus a cursor there.

[1:00:11] You can insert text there. And it's also

[1:00:14] fine-tuned towards like technical terms.

[1:00:16] So, you can say at user

[1:00:18] authentication.ts and it'll come out

[1:00:20] correctly. Um you can reference files,

[1:00:23] etc. So, it's great. I I imagine that

[1:00:25] more and more of the tools are going to

[1:00:26] get their own native voice uh over and

[1:00:28] over time that's going to become like a

[1:00:29] dominant like interface. But right now,

[1:00:32] Whisper Flow is like a pretty sweet

[1:00:33] experience. Yeah.

[1:00:38] >> Turn on fast mode so it'll go faster.

[1:00:41] Um, yeah, it also does cool things like

[1:00:44] uh you can say like when you're

[1:00:46] dictating into Slack, uh, be more

[1:00:48] casual. When you're dictating into an

[1:00:49] email, be more formal and it will kind

[1:00:51] of

[1:00:52] >> it's sort of context aware in the

[1:00:53] formatting that it'll put out. like you

[1:00:55] can say it knows you're in Gmail or it

[1:00:56] knows that you're like writing code, you

[1:00:58] know, or requesting code.

[1:01:01] >> So, this is an example of the ideation

[1:01:03] skill. I gave it that that simple

[1:01:04] command and now it's saying like, oh,

[1:01:06] what do you like I don't fully

[1:01:08] understand what you mean. Uh, what kind

[1:01:09] of fun are you looking for? I'll say uh

[1:01:11] a visual gag.

[1:01:19] Uh, asky art gallery. Sure.

[1:01:25] hidden Easter egg. Yeah, we'll go listed

[1:01:27] but subtle.

[1:01:29] >> So, like I I gave it one sentence and

[1:01:31] it's like, well, what do you mean by

[1:01:32] that? And it's like pulling all of that

[1:01:34] out out of me.

[1:01:35] >> But there's the value in thinking. It's

[1:01:36] like, you know, the same way that a good

[1:01:37] engineer in a whiteboarding session

[1:01:39] would kind of draw the same stuff out of

[1:01:40] you.

[1:01:40] >> Yep. And so, right there, it did this

[1:01:43] confidence score. It's based on the

[1:01:44] problem clarity. It has a 20. Goal

[1:01:46] definition, 18. Success criteria. It

[1:01:49] doesn't really know what I'm asking for.

[1:01:50] So, that's the lowest one. uh scope

[1:01:52] boundaries and then consistency. So

[1:01:53] those all add up to 100 and I got a

[1:01:56] score of a 90 out of 100. So it doesn't

[1:01:58] it's not going to just be like okay I

[1:01:59] know what you want. It's going to ask me

[1:02:01] uh some more things like oh we'll do

[1:02:04] that and we'll just have minimal

[1:02:06] I'll say zero config. I just want it to

[1:02:08] go fast.

[1:02:10] And so now I'm at 96 out of 100. So it

[1:02:13] understands what I want and now it's

[1:02:15] going to write a um a contract for me to

[1:02:18] read. I read and review the contract and

[1:02:21] then it's going to build from there

[1:02:23] these phases that I can execute or these

[1:02:26] specs that I can execute in phases uh

[1:02:28] and then go from there uh so that I can

[1:02:30] clear the context for each one and have

[1:02:31] like a fresh context going.

[1:02:33] >> Yeah. The way I would say that is like

[1:02:34] is the math airtight? No. Uh does it

[1:02:37] matter? No. Because the value is in the

[1:02:39] iterative loop of like clarifying and

[1:02:41] clarifying your own thinking by by

[1:02:43] responding.

[1:02:44] >> Yeah. Oops.

[1:02:47] And so there's the contract that it's

[1:02:49] it's loading.

[1:02:51] Uh and it tells like what success

[1:02:53] criteria means, scope boundaries, what's

[1:02:55] in scope, what's specifically out of

[1:02:56] scope, any future considerations, how we

[1:02:59] plan to execute it. This is an easy one,

[1:03:01] just a single phase. Uh and so it's

[1:03:03] going to just create that spec for me,

[1:03:05] which it did here. And then I could run

[1:03:07] this uh and go. And so it was all gated

[1:03:10] on that that confidence score.

[1:03:13] Cool.

[1:03:14] >> All right. Um,

[1:03:16] you want to jump into

[1:03:17] >> Yeah, let's do it.

[1:03:18] >> All right. Uh, we'll we're going to skip

[1:03:20] ahead into um the next section and we'll

[1:03:24] have one more one more thing and we'll

[1:03:25] do some sharing uh after that one. So,

[1:03:28] kind of moving beyond the editor. We

[1:03:30] consider we we thought about this and

[1:03:31] we're like, does that title make sense?

[1:03:33] Uh, skills beyond the editor because

[1:03:35] we're not really in an editor, but like

[1:03:37] for us, we kind of are like we don't

[1:03:39] open I don't open any of them nearly as

[1:03:41] much as I used to. Uh, so I've lost my

[1:03:43] identity a little bit, but um, yeah,

[1:03:47] these skills, they really do work in a

[1:03:50] lot of different places. Um, another

[1:03:52] thing that you can do is like you can

[1:03:53] level up your skills in a number of

[1:03:55] different ways. Uh, so like for this uh,

[1:03:58] repo roast for example, you could have

[1:03:59] like, oh, I want to know who the bus

[1:04:01] factor people are. So use like uh, get

[1:04:03] short log to understand who's committing

[1:04:05] the most, who's committing the most in

[1:04:06] specific sections of the the codebase.

[1:04:08] Uh, and you know, list out what the bus

[1:04:11] factor is. uh and how vulnerable we are

[1:04:13] to that. Commit crimes. Uh this would be

[1:04:16] people who just have bad commit

[1:04:18] messages. It's so easy. You just tell

[1:04:20] Claude, "Commit it and go." Uh zombie

[1:04:23] branches. You could have, you know, list

[1:04:25] out all of the branches that never went

[1:04:27] anywhere uh or that are still hanging

[1:04:29] around. Uh who is committing at 3:00

[1:04:31] a.m.? Who's who's up the latest uh

[1:04:34] working and making us all look bad? And

[1:04:37] then this one is definitely something

[1:04:39] that you should you should add and

[1:04:40] that's is my read me yeah is my readme

[1:04:42] real does it explain or describe real

[1:04:45] things?

[1:04:50] Uh yeah and so again the reason that

[1:04:51] this is so powerful is that it's no

[1:04:53] longer specific to any foundational

[1:04:55] model provider right uh you can define

[1:04:58] these skills and then you can use them

[1:04:59] locally in cloud code but you can share

[1:05:00] them with your team as we talked about

[1:05:01] with you know a git based you know

[1:05:03] plug-in architecture but now you can

[1:05:05] also put them in cloud desktop and web

[1:05:07] as we talked about with the recruiting

[1:05:08] team folks that identify as completely

[1:05:10] non-technical are loading uh specific

[1:05:13] skills and running them in their own

[1:05:14] sessions

[1:05:15] >> and sharing them

[1:05:15] >> and sharing them right and then now as

[1:05:17] we're finding like agent harnessing uh

[1:05:19] harnesses becoming more and more

[1:05:21] relevant and so things like uh pi um

[1:05:24] which is what openclaw runs under the

[1:05:26] hood uh you can load them there as well.

[1:05:28] So it's it's the value is really in like

[1:05:31] defining the discrete work block and

[1:05:33] then figuring out exactly which tweaks

[1:05:35] make it the most effective description

[1:05:37] of getting that work done and then you

[1:05:39] know sharing it with your friends and

[1:05:40] putting it on different boxes um without

[1:05:43] having to do much more than authoring

[1:05:45] some markdown and possibly some scripts.

[1:05:47] >> Yep. and skills. If you took a skill

[1:05:49] file, like you took repo roast with that

[1:05:52] skill.mmd and any scripts or references

[1:05:55] and all that, but you took that folder

[1:05:57] repo roast and you zipped it, you'll get

[1:05:59] a dozip file back, right? Rename that

[1:06:01] from zip tosskill and now a nontechnical

[1:06:04] teammate can drag that into cloud

[1:06:06] desktop and use that skill. And that's

[1:06:09] just how they're shipped. That's a

[1:06:11] really easy way to to share them. Not a

[1:06:13] really easy way to version them. there's

[1:06:14] still there's still pain to around like

[1:06:16] how do you handle sensitive uh you know

[1:06:18] credentials in that case like you don't

[1:06:20] do it that way please don't put it in

[1:06:21] the zip file but you know it's evolving

[1:06:24] so

[1:06:24] >> but you can also use those marketplaces

[1:06:26] like the cloud marketplace works in uh

[1:06:28] cloud desktop as well so that's an easy

[1:06:30] way to to share skills um if they are

[1:06:33] applicable to like non-coding workflows

[1:06:37] >> for sure

[1:06:39] >> and uh so some of the like we've talked

[1:06:41] about this but like one of the things

[1:06:43] that I really wanted drive home is like

[1:06:45] with the work OS CLI. This is a it's

[1:06:48] like a generic CLI that you can use uh

[1:06:51] to do like work OS commands in it, but

[1:06:52] like its flagship feature is this

[1:06:55] ability to just run install. So if you

[1:06:57] have a project that doesn't have O in it

[1:06:59] or you have uh like other off in there

[1:07:01] that's not work OS, uh you can just run

[1:07:04] work OS install in there and it's going

[1:07:06] to politely remove the other off that

[1:07:08] you might have in there uh and then add

[1:07:11] in based on what you are using. like if

[1:07:13] you're using Nex.js or Tanac start or

[1:07:15] whatever, it's going to figure that out

[1:07:17] and load that in there for you. And the

[1:07:19] CLI is using the claude agent SDK, which

[1:07:22] is like a program programmatic cloud

[1:07:24] code that you can ship that I can ship

[1:07:26] in the CLI. Uh, and the smarts of that,

[1:07:29] all of the brains are actually skills

[1:07:31] that are in the work OS skills

[1:07:32] directory. So, it knows all about that.

[1:07:34] And the reason we did that is so that we

[1:07:36] just had like the, you know, two birds

[1:07:38] with one stone. We have we build the

[1:07:40] skill and we make it good and then we

[1:07:42] prove that it's good by having the the

[1:07:43] CLI run it. And the beauty of the CLI is

[1:07:46] like it's an easy command. You just do

[1:07:48] npx work OS install. Uh and we're like

[1:07:51] um proxying all of the commands to

[1:07:53] Claude so that it hits our API token. Uh

[1:07:57] and and so it's an easy way to just like

[1:07:59] say here's a zero friction way to get

[1:08:01] set up with it. It'll even create like a

[1:08:03] work OS account for you and you can go

[1:08:04] back later and claim it. So it's like 5

[1:08:07] minutes and you're you're set up. And

[1:08:09] all of that is entirely skills driven.

[1:08:12] >> Yeah. Another place we're seeing like

[1:08:13] high leverage with this is imagine blog

[1:08:15] writing. Uh like lots of folks on the

[1:08:17] team as it's growing like want to write

[1:08:18] blog posts in a uniform way but they

[1:08:20] don't know exactly how our CMS works

[1:08:22] exactly the tone or format and like the

[1:08:24] conventions that we use. And that's the

[1:08:26] type of thing that you used to put in a

[1:08:27] notion doc and then hope that you could

[1:08:29] inject it in someone's slack and like

[1:08:31] force them to read it before they write

[1:08:32] something. it's just easier to define

[1:08:34] that as a skill so that they can

[1:08:36] interact with it and then get to 80% of

[1:08:38] that artifact without having to consult

[1:08:40] somebody else essentially.

[1:08:41] >> Um code review image generation with

[1:08:44] image generation 2 you can also put

[1:08:45] additional parameters there to get like

[1:08:47] specific styles as well. um CI pipelines

[1:08:50] and as I mentioned earlier in the talk

[1:08:52] like once uh Nick had published up the

[1:08:54] you know public repo of of work OS

[1:08:56] skills uh the rag pipeline was able to

[1:08:58] just start loading them all as agentic

[1:09:01] tool calls and performance on all those

[1:09:02] queries just jumped over just you know

[1:09:05] flatly chunking all documents and

[1:09:07] putting them in a vector database for

[1:09:08] example

[1:09:09] >> and you saw the giant lobster outside

[1:09:11] when you came in right like that's all

[1:09:13] can be skills based as well so it's

[1:09:15] skills are just this uniform way that

[1:09:17] transcends the the cloud mod code or the

[1:09:19] codeex uh and it's something that you

[1:09:21] can load anywhere at any technical skill

[1:09:23] level.

[1:09:24] >> Y

[1:09:24] >> so it's really easy uh we talked about

[1:09:27] uh eval like measuring this stuff

[1:09:29] matters uh with the the skills like

[1:09:32] specifically with the next.js installer

[1:09:34] skill I actually found out through my

[1:09:36] evals that I was making things worse

[1:09:37] because I was overly prescribing what to

[1:09:39] do with Nex.js and cloud code was just

[1:09:42] inherently good at working with Nex.js

[1:09:44] JS and I was making it worse by being

[1:09:46] too dogmatic about what I wanted it to

[1:09:48] do and it led to like a 30% drop I think

[1:09:51] in like overall accuracy based on these

[1:09:55] numbers I made up. Uh but I was able to

[1:09:58] use the that and I I kind of think of

[1:10:00] eval in a lot of ways like my Apple

[1:10:02] Watch uh it tells me like my heart rate

[1:10:04] and you know how how many calories I'm

[1:10:07] burning throughout the day. Is it

[1:10:08] accurate? No, of course not. But it

[1:10:11] gives me a general like baseline of like

[1:10:13] ah I am more active today than I was

[1:10:14] yesterday. Uh and I can kind of use that

[1:10:16] to gauge where I go forward. Is it

[1:10:18] accurate in what I like base my my life

[1:10:20] on it? No. But it's a general like

[1:10:23] vector that I can I can look at and see

[1:10:25] whether I'm improving or uh making

[1:10:28] things worse.

[1:10:29] >> Yep.

[1:10:31] >> So some skills in the wild. Um Zach,

[1:10:34] you've you've made a couple of skills uh

[1:10:35] that are these are specifically like not

[1:10:37] uh code related, right? Uh but they

[1:10:40] they're pretty impressive.

[1:10:41] >> Yeah. So this is one I was talking about

[1:10:42] earlier just to show um what I am the

[1:10:44] most excited about is like taking what

[1:10:46] seems like an incredibly complex

[1:10:48] workflow and then just making it

[1:10:50] available as skill. So this is uh as

[1:10:53] this is an example where I have a Slack

[1:10:54] avatar that I built I had generated for

[1:10:57] me like months ago and I just handed it

[1:10:59] to this animation skill and I said

[1:11:01] animate this in the most obvious way

[1:11:02] possible. We'll see if that's actually

[1:11:04] obvious.

[1:11:07] So, taking a giant ball of energy and

[1:11:11] grimacing at it as one does. Um, but the

[1:11:14] point is that was a single text prompt

[1:11:17] uh of like make this person look like

[1:11:18] they're in Fallout holding a ball of

[1:11:20] energy and then animating it. This one

[1:11:23] uh same exact skill. So, same Markdown

[1:11:26] file and py two Python scripts saying,

[1:11:28] you know, uh the prompt was child

[1:11:30] running through a field.

[1:11:34] And there's also sound with this because

[1:11:35] it's um hitting the VA API. So again,

[1:11:37] the at first uh you know, Claude reads

[1:11:40] the markdown skill, says, "Okay, I

[1:11:42] understand what this is. It's a a

[1:11:43] sequence of two API calls I'm going to

[1:11:45] make." The first API call is the user's

[1:11:47] prompt to make the static image. The

[1:11:49] second API call is the output of that,

[1:11:51] the static image, and then a new prompt

[1:11:54] that I write saying animate this in the

[1:11:56] most obvious way possible, hitting VO

[1:11:58] with the VO API with that, and then

[1:12:00] getting back an animation. But, you

[1:12:02] know, again, that's like 30 30 seconds

[1:12:04] of generation time. And so, I use this

[1:12:07] exact same workflow to to do like all of

[1:12:10] the interstitial scenes in a in a film

[1:12:11] recently.

[1:12:14] Uh, and another example, uh, I mentioned

[1:12:15] this earlier, but the remotion skill.

[1:12:17] Uh, I have I'm terrible at video

[1:12:19] editing. I don't know anything about it.

[1:12:21] Uh, but when I was working on the work

[1:12:22] OS CLI, I thought, oh, it'd be kind of

[1:12:24] cool to make like a fun video that I

[1:12:26] could use on Twitter to like demonstrate

[1:12:28] it or or talk about it. And so, uh,

[1:12:30] somebody was mentioning Remotion and I

[1:12:32] just asked it to make this and it put it

[1:12:35] together pretty much like this. Like I

[1:12:36] asked it to use our our actual logo

[1:12:38] rather than some madeup one. Uh, but it

[1:12:41] even like understood like the output of

[1:12:42] of the CLI and put all of this together

[1:12:45] into a demoable video uh that showcases

[1:12:50] what it can do. And I didn't have to do

[1:12:52] that uh at all. And I I looked super

[1:12:55] impressive without knowing anything

[1:12:56] about video. It also like the skill when

[1:12:58] I said do this, it loaded up a like

[1:13:01] localhost 3000 in my browser that was a

[1:13:03] full reotion video editor. And so I

[1:13:06] could see it playing on a loop in there

[1:13:08] and it was like doing things and I'm

[1:13:09] like, "Oh, you didn't use our actual

[1:13:10] logo. Go use that." And I just like told

[1:13:12] Claude to do that and it just updated

[1:13:14] like in real time. It was it was so

[1:13:16] cool.

[1:13:16] >> Yeah. So imagine like hooking this into

[1:13:18] your GitHub CI/CD flow and then at the

[1:13:20] end of a big project or every time a

[1:13:21] milestone gets merged, you auto update,

[1:13:24] you know, whatever document and then

[1:13:26] even include a demo. Um it it can start

[1:13:28] to get pretty powerful if you

[1:13:29] orchestrate skills that are well

[1:13:31] defined.

[1:13:37] >> Is this the skill?

[1:13:38] >> This is this is exactly how the that one

[1:13:39] works under the hood. So you can imagine

[1:13:41] like the one that I showed you that had

[1:13:42] the two YouTube videos. So if it's

[1:13:44] called animated image, the first one's

[1:13:45] going to be gen generate a minimalist

[1:13:47] static image and then um take that image

[1:13:50] and animate it via VO and you there's

[1:13:52] just two scripts. There's one to

[1:13:53] generate an image here and then there's

[1:13:55] one to generate the video. Um but the

[1:13:57] skill file itself is like 30 lines of

[1:13:59] markdown.

[1:14:00] >> Yep. And that uh that nano banana one

[1:14:02] that I ran earlier that was just like

[1:14:04] coming up with a a creative enough

[1:14:05] prompt like taking the idea that I had

[1:14:07] like flushing out the prompt and then it

[1:14:09] passed it to a TypeScript file that

[1:14:12] called the nano banana API and got the

[1:14:14] image back. So uh that skill is just

[1:14:17] basically like a a simple LLM wrapper

[1:14:20] around this uh around a TypeScript

[1:14:23] script that uses their API to to go do

[1:14:25] that.

[1:14:26] >> So it's also like just broadly

[1:14:27] applicable to workflows. It's not just a

[1:14:29] dev thing, right? You can imagine if

[1:14:30] sales has a very specific way they have

[1:14:31] to reach out to people or there's always

[1:14:33] like a type of report that you're

[1:14:34] generating for customers or prospects or

[1:14:36] whatever. Um all all of this is like

[1:14:38] excellent uh for use with skills.

[1:14:41] >> So did anyone uh have a um a skill a

[1:14:44] repro skill that they want to share?

[1:14:47] >> Yeah.

[1:14:49] Okay.

[1:14:52] >> Yeah. The Amy and Wolf from Raven Wolf

[1:14:55] skill. Try that. You have to see the

[1:14:57] results.

[1:14:59] Which one is it?

[1:15:00] >> Number two or I uploaded another one.

[1:15:03] Number six is a newest one. Used

[1:15:05] >> newest.

[1:15:06] >> I'll do number six.

[1:15:17] All right. So, while that's running Oh,

[1:15:18] no. We ran the wrong one.

[1:15:21] There we go.

[1:15:23] While that's running, uh, let's go look

[1:15:25] at it.

[1:15:29] Oh, nice.

[1:15:30] >> Okay.

[1:15:30] >> Ruthless honesty. I love it.

[1:15:33] >> Brutally honest

[1:15:36] with a heart of gold.

[1:15:39] >> Awesome. I love the context. Lots of uh

[1:15:42] >> thick files. Very nice. Yeah. Excellent.

[1:15:44] >> Constraints.

[1:15:47] And here uh the audience detection. You

[1:15:50] told it to load audience.mmd. Here's

[1:15:52] that progressive disclosure about that.

[1:15:56] This also just helps to keep your

[1:15:58] markdown files manageable.

[1:15:59] >> This is a 10 out of 10 skill.

[1:16:00] >> Yeah,

[1:16:01] >> very nice.

[1:16:06] >> This is awesome.

[1:16:08] >> All right, let's see if it gave us

[1:16:09] anything.

[1:16:12] >> So, it's it's grading the the workshop

[1:16:15] itself. Um,

[1:16:18] >> six out of 10.

[1:16:19] >> Brutal.

[1:16:20] >> I feel that.

[1:16:22] >> I thought we had I thought we had

[1:16:23] something going, but Okay. Hopefully

[1:16:29] you give us a little bit more of a of a

[1:16:31] grade than that.

[1:16:34] That's awesome.

[1:16:35] >> Uh some critical

[1:16:36] >> suite isn't on fire because it doesn't

[1:16:38] exist. That's great.

[1:16:42] >> 1,200 lines of monolith. Yeah. Yeah.

[1:16:46] >> Get identity crisis. Zach is two people.

[1:16:48] That's how it feels too.

[1:16:51] >> Hardcoded secret. That's okay. It's not

[1:16:53] really a secret.

[1:16:55] That's awesome.

[1:16:56] >> Love it.

[1:16:58] >> Super cool. All right, we got uh three

[1:17:00] minutes left. There's any questions or

[1:17:03] um anyone else want to share a skill?

[1:17:10] So, this is a skill that you can use,

[1:17:11] but more importantly, it's techniques

[1:17:13] that you can take and use to build your

[1:17:16] skills uh and build them up in different

[1:17:18] ways. There's a lot more advanced topics

[1:17:19] that we can go to go into as well. Uh we

[1:17:22] mentioned um like sub agents for

[1:17:24] example. Sub agents is a great way to

[1:17:25] extend those skills without bloating the

[1:17:27] context and having it kind of do one-off

[1:17:29] things and then uh and then exiting. Um

[1:17:34] and the like to take this to the next

[1:17:36] level, I really recommend like having

[1:17:38] Claude's own skill creator skill

[1:17:40] installed uh because you can just say,

[1:17:42] "Hey, I have this skill. Is it any

[1:17:43] good?" And it'll give you pointers. Or

[1:17:45] you can say, "Run some evals on it." And

[1:17:47] it'll run like a full eval test suite on

[1:17:49] it. uh and tell you, yeah, it's good or

[1:17:51] no, it's bad. Yeah. And uh and can go

[1:17:54] from there.

[1:17:55] >> Uh and then like Zach was saying, like

[1:17:57] reflect on the transcripts, reflect on

[1:17:59] how you're actually using the skills,

[1:18:00] and you can use that as insight to see

[1:18:03] how to improve the skills and the

[1:18:04] execution of those skills. Uh like for

[1:18:06] example, if somebody kicks off a skill

[1:18:08] and it's always asking questions about

[1:18:10] uh you know, a specific thing, maybe

[1:18:11] that's something that you can provide

[1:18:12] ahead of time. Or if you see it like,

[1:18:14] oh, it's going and doing like 10 tool

[1:18:15] calls, maybe you could like condense it

[1:18:18] down to one or two tool calls and

[1:18:20] pre-provide that information so it

[1:18:22] doesn't have to do that each time.

[1:18:23] >> Yep. The plus one recommendation on the

[1:18:25] internal skill creator. And the other

[1:18:27] thing it kind of um suggest I mean

[1:18:29] suggests to you to do over time is to

[1:18:31] think about the way you manage your

[1:18:33] context even stuff that you used to

[1:18:34] think of as disposable, right? Mhm.

[1:18:36] >> So like in the pre-LM era, we might have

[1:18:38] dev real hard at the keyboard all week

[1:18:40] as I used to do and then finally on

[1:18:42] Saturday like wipe it all away so I can

[1:18:44] get for myself. Like now all of that

[1:18:46] context is gold. Like the conversation,

[1:18:48] especially what failed, especially what

[1:18:50] didn't go well, especially what was

[1:18:52] frustrating because now all of that is

[1:18:54] very rich context for a skilled creator

[1:18:56] or refiner to mine and then build you a

[1:18:59] bespoke tool that's going to solve that

[1:19:00] problem smoothly next week.

[1:19:02] >> Yeah. So,

[1:19:05] >> and you can also like think of skills

[1:19:07] like you could use that progressive

[1:19:08] disclosure to like disclose things to

[1:19:10] different audiences. So, for example,

[1:19:11] you could depending on who's running the

[1:19:13] skill, you could say like um get config

[1:19:16] user email and and figure out who this

[1:19:18] the user is. Uh or you could do things

[1:19:20] like, oh, how many commits does this

[1:19:22] user have in there? They have 10,000

[1:19:23] commits in here. Okay, we can really

[1:19:25] roast with them. But this other person

[1:19:27] who has four commits, they're probably a

[1:19:28] new hire. Maybe go a little gentler on

[1:19:30] them. Don't scare them away from this

[1:19:31] project that they just sent.

[1:19:33] >> Me too.

[1:19:34] >> Question. Yes.

[1:19:34] >> Very quick. Zach, could you take me

[1:19:36] through again uh you saying about the

[1:19:38] context switching? You'd somehow hooked

[1:19:39] up clawed with Slack and Linear. So it

[1:19:42] sounded almost like

[1:19:43] >> it's constantly being able to read what

[1:19:46] Slack's doing.

[1:19:47] >> Absolutely. I have it

[1:19:48] >> called co-work or we use cursor. So I

[1:19:50] don't know if we have the same.

[1:19:51] >> Gotcha. Yeah, I'm using cloud code now.

[1:19:52] It's possible to do it in cloud code and

[1:19:54] and cloud uh desktop but essentially I

[1:19:56] just have the connector in Slack. So I

[1:19:58] say uh I had to do GitHub or just to do

[1:20:00] OOTH with Slack and then it can read my

[1:20:02] Slack messages. You can now run the loop

[1:20:04] command at least in cloud code to have

[1:20:06] it like do that every 15 minutes if you

[1:20:08] want. And then you say in the prompt if

[1:20:11] there is not already a correlative

[1:20:12] linear ticket make a new one for me if

[1:20:15] there is one and there's additional asks

[1:20:17] on this you know request update linear

[1:20:20] and then by the way you have a second

[1:20:21] terminal tab that's looping against your

[1:20:23] linear state. Kathleen works at work.

[1:20:26] Earm muffs, Kathleen. I'm really working

[1:20:28] really hard. Uh they have a second one

[1:20:30] that's looping and looking at your

[1:20:31] linear task and then like doing work for

[1:20:33] you essentially. But the the main point

[1:20:35] was just that um yeah, sorry time. The

[1:20:37] main point was just like automate those

[1:20:39] loops. So that's our time. Thanks so

[1:20:41] much guys. Uh thanks for being an

[1:20:42] awesome audience. Thanks for all the

[1:20:43] great questions. Really appreciate it.

[1:20:45] >> Thank you.
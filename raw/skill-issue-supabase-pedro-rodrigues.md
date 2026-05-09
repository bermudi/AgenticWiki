---
title: "Skill Issue: How We Used AI to Make Agents Actually Good at Supabase — Pedro Rodrigues, Supabase"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=GmAQKINjv1E&t=535s"
date_saved: "2026-05-09T03:23:41.715Z"
---

# Skill Issue: How We Used AI to Make Agents Actually Good at Supabase — Pedro Rodrigues, Supabase

[0:14] Hello everyone. Uh is everyone excited

[0:16] for the the conference?

[0:19] >> Awesome. We got a full house here. Uh

[0:21] it's very I'm very glad to be here. Very

[0:23] honored uh to be giving uh the opening

[0:26] or one of the opening workshops uh

[0:28] today. If you've noticed already uh the

[0:31] title is slightly different uh from what

[0:33] we have in the schedule. I've basically

[0:35] done a rebrand but the theme for the

[0:37] workshop will remain the same. Uh we

[0:39] went from skill issue to level up your

[0:41] skills. I've decided to move the skill

[0:43] issue title to to the keynote that I'm

[0:45] giving uh tomorrow. If you'll have time

[0:48] to to know more about what's the keynote

[0:50] is going to be about. Uh but mainly uh

[0:54] it's um this workshop. Basically, this

[0:57] workshop is what I've been doing in the

[0:59] last two months at Superbase, writing

[1:02] our own skills. And tomorrow, I'm going

[1:04] to present how we put this actually into

[1:06] production and the lessons we've

[1:08] learned. Um, so for everyone who's been

[1:12] paying um closer attention, you probably

[1:15] noticed that I'm I'm running this slide

[1:16] deck on local host. Some of you have

[1:18] already noticed. Uh this is no

[1:22] coincidence at all. I bas uh I

[1:24] essentially vip coded the presentation.

[1:26] So if you see something off uh it was

[1:28] not my fault was clo uh but for for you

[1:32] to if you don't believe me you can see

[1:35] that uh or you cannot do or you you'll

[1:37] have to be a very uh Google slides guru

[1:39] to have dark mode enabled. So honestly I

[1:42] like this layout better. So I think

[1:44] we're going with dark mode here. Um if

[1:47] there's any uh light mode fans out there

[1:50] or the majority of the room it's light

[1:52] mode. I'm happy to switch back. uh but

[1:55] for now let's go with with this one. So

[1:58] to to do a little presentation of myself

[2:01] before starting the workshop uh my name

[2:03] is Pedro. I'm uh uh I'm from Portugal uh

[2:06] Lisbon and I work at Superbase as an AI

[2:09] tooling engineer. Essentially my day

[2:11] today is to uh think of how we can make

[2:15] the the Superbase the most agentic

[2:18] friendly as possible uh and um improve

[2:22] the agent experience. So we you've

[2:24] probably heard about develop uh

[2:26] development experience the DX. Uh we're

[2:28] more focused on DAX which is the same

[2:31] thing but for agents. Uh in this

[2:33] workshop we're going to um talk a bit

[2:37] about skills. Uh because essentially um

[2:41] that's how we've been improving the the

[2:43] performance of agents around uh a

[2:46] product like Superbase uh or a company

[2:49] like Superbase who has multiple

[2:50] products. Um the secret sauce is has

[2:53] been basically skills. So we're going to

[2:55] dive into how to write one um how to uh

[2:59] test it man first manually and then how

[3:02] to automate the testing with

[3:04] evaluations. Uh so to start with how

[3:07] many of you have heard about skills?

[3:11] All right so almost anyone everyone. Uh

[3:14] so what I'm going to say it's probably

[3:16] no news to you. Uh skills are basically

[3:19] folders uh with uh instructions

[3:23] um and uh files for you to to run

[3:26] workflows uh repeated workflows or give

[3:29] custom um essentially custom information

[3:32] to your agents uh or provides a new set

[3:36] of uh of tools let's say in form of

[3:39] scripts. So there's a a bit of a

[3:41] misconception about skills. usually the

[3:43] skill.md the main file takes the the the

[3:47] spotlight. Uh but skills can actually be

[3:49] more than just the the main file, right?

[3:52] Uh so the the main file is basically a

[3:55] markdown file uh named skill.md where

[3:59] the essentially the the main information

[4:02] about the skill lives. Uh it it is

[4:05] composed by this front matter at the

[4:08] top. Uh which essentially has can have

[4:11] multiple fields but the two um required

[4:14] ones are the name which basically

[4:16] identifies the skill uh and then the

[4:18] description which tells the agent what

[4:21] the skill does. the main um

[4:25] what exactly the the the the skills

[4:27] basically bring that uh tools like uh

[4:30] MCP didn't uh was this concept of uh

[4:33] progressive disclosure. Uh progressive

[4:36] disclosure is basically when the agent

[4:39] uh or the all the information about a

[4:41] subject is not loaded uh straight to

[4:44] context. uh instead you just load the

[4:46] exact amounts of information that allows

[4:49] the agent to to choose to load the rest

[4:51] of the information once it actually

[4:53] needs it. So in this case um the the

[4:57] skilld file is designed like this. So

[4:58] the front matter uh will be loaded at

[5:02] first to the to the context of the agent

[5:05] not the content of the the file. Uh this

[5:07] works as an envelope. So the agent has

[5:10] knows from the description what the

[5:12] skill does uh and when it should loads

[5:15] the the rest of so when should we look

[5:18] for the information inside of the file

[5:20] uh inside this file you can also

[5:21] reference another files. Usually these

[5:23] other files are either markdown files or

[5:27] script bash python whatever you would

[5:30] like uh to to reference. Um, starting on

[5:33] the reference files, you usually put

[5:35] them inside a reference folder. Um, and

[5:38] they provide more information. You can

[5:40] think about a skill in this format as a

[5:42] book. The skill.md you can think of it

[5:45] as the index on steroids because besides

[5:48] of having these links to the other

[5:50] files, you can think of them as uh the

[5:52] pages of the book or the other chapters.

[5:55] uh you you'll have um custom you can

[5:58] have custom informations and then also

[5:59] reference it uh to to the other files.

[6:02] The reference files they have nothing

[6:04] special about them. They're basically

[6:05] like the a normal regular markdown file.

[6:08] Uh you can think of similar to skill.md

[6:11] file but uh instead of being the main

[6:13] one it's the one that uh that got

[6:15] referenced. Uh you can also fun um funny

[6:18] enough you can also reference files

[6:20] inside of reference files. So you can

[6:21] make basically a graph out of a out of a

[6:24] skill. And for uh for scripts, I've

[6:27] actually talked about uh how the how MCP

[6:30] and skills differ uh from each other.

[6:33] And we're basically comparing apples to

[6:36] uh apples to oranges when it comes to

[6:38] MCP and skills. Uh one of the

[6:41] misconceptions

[6:42] currently probably was already debunked.

[6:45] The debate now is more about MCP versus

[6:47] CLI. But when the the skills were

[6:50] released uh back in I think it was

[6:53] November or October last year um they

[6:56] basically started this debate about um

[6:59] well it's uh should we use them instead

[7:01] of MCP because if if I can run if I can

[7:04] provide more information more context to

[7:06] the to the agent without actually

[7:08] loading every tool to uh to the context

[7:11] like the like the MCP u and I can also

[7:14] have uh scripts so I can have actions

[7:16] just like uh I have on MCP tools. Should

[7:19] we use them? And the answer is uh you

[7:22] should use both to be honest. Uh if

[7:24] you're building anything that it's uh uh

[7:27] an integration, you should use uh MCP,

[7:30] right? Um anything that if your agent

[7:32] doesn't have access to bash, you should

[7:34] you should use MCP to integrate to your

[7:36] service. Uh skills actually just provide

[7:39] more context to your agent, right? And

[7:41] you can define workflows everything that

[7:43] you would not that that you don't have

[7:45] space to define on on the MCP tools uh

[7:48] descriptions you can define them on on

[7:50] skills. Um also regarding the comparison

[7:54] the the debate between skills scripts

[7:56] and the skill the MCP tools the main

[7:58] difference is that tools don't need um

[8:01] an environment to to run. uh the agent

[8:05] can just call a tool knows how to call a

[8:07] tool especially if the uh the MCP server

[8:10] is remote and the tool will run on on

[8:12] server side while the scripts uh well

[8:15] they basically are loaded into your

[8:17] machine they run on your local

[8:18] environment uh and they're tied to the

[8:21] whatever environment that you have so if

[8:23] you're running on Linux they have to be

[8:24] Linux compatible if you're running on

[8:26] Mac OS the same Windows I'm not going

[8:28] I'm going to even studed about it uh but

[8:32] essentially that those are the main

[8:33] differences between the MCP tools and

[8:36] the the scripts. Uh hope is everything

[8:39] clear. If you have any doubts, feel free

[8:42] to I'm going to have a a little

[8:43] demonstration. This workshop is going to

[8:45] be more more of a walk through than

[8:47] actually code along, but feel free to to

[8:50] tag in. Um I have a a GitHub repo uh

[8:54] prepared, so you'll be able to visit it

[8:56] and to explore it. Um but if you have

[8:59] any doubts in in any moment of the of

[9:02] the workshop uh feel free to to

[9:04] interrupt me or to raise your your

[9:06] hands. So moving to see this exactly

[9:10] this is so I tested this on a smaller

[9:12] screen was working you can see it was

[9:14] voded. So uh how do you test your skills

[9:18] right? So if this is just a markdown how

[9:21] you test your markdown files basically

[9:24] um so to test a an applica u a piece of

[9:28] code it's uh it's already

[9:30] straightforward right we already know

[9:32] you have all sort of uh um tests types

[9:36] you have unit tests integration test or

[9:38] you can test the whole flow or that we

[9:40] call end to end testing um well

[9:45] essentially when you're testing a

[9:47] markdown file you can basically do

[9:49] exactly the same. You can be as granular

[9:51] if you uh as if you want. Um but usually

[9:57] since we have an LLM in in the loop,

[9:59] you'll have something called

[10:01] evaluations. So, uh, for those of you

[10:03] who haven't heard about evaluations or

[10:05] evolves for short, um, they essentially,

[10:09] um, are a more, um, a nondeterministic

[10:13] way of testing the output or the

[10:16] behavior of an agent or a model. You can

[10:19] test both an LLM or an agent, uh, with

[10:22] with Evals. Uh, essentially, you being

[10:24] the the most common structure. I'm going

[10:26] to be to to to present to you at the end

[10:30] um a framework for you to test your your

[10:32] evals like a very simple one where you

[10:34] can start and I'm going to uh dive

[10:37] deeper on evaluations there but

[10:40] essentially um they usually are made of

[10:45] an input an expected output just like a

[10:48] regular test and in between you can um

[10:50] evaluate the steps that the agent took

[10:53] the reasoning the tools that it that it

[10:55] fault uh which is uh normally more

[10:58] interesting and easy to to evaluate the

[11:01] than just like a reax on the exact

[11:04] output since this is nondeterministic.

[11:07] So there's essentially a framework uh to

[11:10] that you can follow to test your skills.

[11:13] Uh this one was proposed by OpenAI on

[11:16] their system on their blog post called

[11:18] systematically evaluate uh agent skills.

[11:21] I think they released this back in

[11:23] January or February. So not that long

[11:25] ago, but all this is fairly new. So this

[11:28] is basically prehistory. Um so you start

[11:32] uh by defining your metrics. So what you

[11:34] want to evaluate uh on your skills. Uh

[11:37] if you're building a skill for your

[11:39] product, for example, what exactly do

[11:40] you want the skill to um to highlight to

[11:44] your to your agent? It's going to be to

[11:47] uh forward it to the documentation. Are

[11:49] you putting some specific instruction,

[11:52] specific workflow? So depending on what

[11:54] you want to to evaluate you start this

[11:58] uh evalriven development uh so this

[12:00] testdriven development you start by

[12:02] defining the metrics what you what

[12:04] exactly good uh means uh when it comes

[12:08] to the skill then you create the skill

[12:10] itself right so you write the skill.mmd

[12:12] file

[12:15] so you write the the skill.md file uh

[12:17] any scripts uh alongside it uh the

[12:20] reference files uh if you want to

[12:22] they're all optionals. The one the only

[12:24] only required is the skill.mmd file. Uh

[12:27] and then you you went um you move to the

[12:30] testing part. So you run the evaluations

[12:32] or or you run it um manually. Um I've

[12:37] recently heard the the the CEO of of

[12:40] Brain Trust uh during the podcast a

[12:43] podcast. I don't know how many of you

[12:45] know Brain Trust.

[12:47] Okay. not not as much the not as many as

[12:50] the um uh not as popular as skills. Uh

[12:54] but uh so brain for those of you who

[12:57] don't know brain trust is a platform

[12:58] that allows you to systematically run

[13:01] evals and provide you like u the full

[13:04] picture uh of um of the of the agent

[13:10] behavior during the the evaluation uh

[13:13] scenario, right? Um

[13:16] trying to think about another platform

[13:18] to compare it with but this is fairly

[13:20] new to be honest. Um so you can think of

[13:23] it as like an observability tool uh to

[13:26] to check your the behavior of your um of

[13:29] your agents during a specific control

[13:32] scenario uh which are the evaluations.

[13:34] Um so you move to to the testing part.

[13:37] Basically you run a set of evaluations

[13:39] uh scenarios uh how you um these are

[13:43] defined by the input and expected output

[13:46] tools that should be called. So

[13:48] basically how the you expect your agent

[13:50] to behave um and then uh you move to the

[13:54] grading part. So how did the the agent

[13:57] do? Well, essentially it's this is very

[13:59] similar to a testing cycle, right? Uh

[14:02] but now we instead of having a

[14:03] deterministic output, you can have um

[14:07] it's nondeterministic. It's an LLM in

[14:09] between. Uh but you can still have

[14:10] deterministic parts to evaluate on and

[14:14] then you iterate basically and repeat.

[14:17] This is the that's why this it's a it's

[14:19] a cycle pretty similar to uh any of the

[14:24] the the test development cycles that we

[14:26] that we have at the moment. All right.

[14:29] So, uh jumping straight to what we're

[14:32] going to do uh during this workshop. So,

[14:34] we're going to write a a skill. I've

[14:37] prepared um a little demonstration app,

[14:40] a demo app. Um it's going to be um a

[14:43] performance review application uh with

[14:47] uh four I believe uh four employees uh

[14:50] one employee, two managers and one HR um

[14:55] representative.

[14:56] Uh and essentially we're going to that

[15:00] there's some errors uh on the database

[15:03] site that we're going to find and fix.

[15:07] uh we're going to build a skill to help

[15:09] to guide the agents to to to fix them.

[15:12] All right. And then at the end uh I have

[15:14] as I said a framework to test um

[15:17] automatically the the same scenario that

[15:20] we're going to test manually um using

[15:23] using evol. Um before moving to the

[15:26] demonstration uh how many of you have

[15:29] have heard about or used superbase?

[15:33] All right. So almost almost anyone knows

[15:35] or used superbase. Uh I've I've seen

[15:38] some some hands down. So uh still I'm

[15:41] going to give you a little brief. So uh

[15:43] Superbase it's essentially a back end as

[15:45] a service. Uh you you can think of it as

[15:48] the open source version of uh of um

[15:53] I just can

[15:54] >> thank you Firebase. I only fire was

[15:58] coming to to my mind. Sorry. uh to

[16:00] Firebase. Uh and if you don't know

[16:02] Firebase, you're probably living under a

[16:04] rock. Uh no, but essentially it's the

[16:06] it's a it's a back end as a service. You

[16:07] can use it to build any back end as you

[16:10] as you would like. Uh coming straight

[16:11] out of the of the box. Uh we provide a

[16:14] database um for for you to just plug

[16:18] into your application and run on

[16:20] Postgres, one of the most if not the the

[16:23] most popular open source solution out

[16:25] there for databases. uh you can easily

[16:27] integrate including authentication on

[16:29] your application uh running storage to

[16:32] save files um

[16:36] and many other things uh edge functions

[16:39] which are a lambda functions uh for

[16:41] those of you who come from the AWS

[16:43] environment and so forth. So the demo

[16:46] application that I've built was built on

[16:47] top of superbase of course. Uh and so

[16:50] you can follow along. Uh here is the QR

[16:53] codes. Uh here at the back can anyone

[16:56] everyone uh scare uh scan the the QR

[16:59] code or should I make this bigger?

[17:02] Bigger. Right.

[17:05] This

[17:15] Okay, just so everyone can see, I'm

[17:19] basically editing the the presentation

[17:22] at the moment as we speak. Let's see

[17:23] what Clots

[17:27] has to to offer us.

[17:34] Bigger

[17:41] This is the cool thing of of web coding

[17:43] your presentations. I really recommend

[17:45] uh I probably spend the same or or more

[17:48] time than than if I just uh use

[17:51] something like Google slides, but at

[17:53] least it's more fun. Uh and anthropic

[17:55] should be thrilled about it for sure.

[17:58] All right. Uh let me know once everyone

[18:01] is uh in the is that the can see the

[18:05] repo. If you cannot see or scan the QR

[18:09] codes,

[18:10] uh

[18:12] I should probably make the the link

[18:15] bigger as well.

[18:35] So you asked for a demo. Here's the demo

[18:38] on my slides.

[18:40] Uh so mainly everyone you here at this

[18:46] room used skills. So I probably won't

[18:48] have to to sell you uh the the the power

[18:51] of skills. Uh but if you if you're still

[18:56] a bit skeptical about skills, this whole

[18:58] presentation was without skills, this

[19:00] whole presentation will be a lot um not

[19:04] pleasant, let's say. Uh be much uglier

[19:08] in a sense. Okay, you should probably

[19:11] see it now.

[19:13] So basically navigate to uh to GitHub

[19:17] Hudripppn which is my um nickname and

[19:21] improve skills workshop AIE Europe. It's

[19:27] a very long name. All right.

[19:33] So is everyone at the at the at the

[19:35] GitHub repo at the moment? Okay.

[19:37] Everyone was had no trouble. All right.

[19:41] So,

[19:44] not this one,

[19:47] right? So, this is the repo that you

[19:49] should be looking at. Uh, essentially,

[19:52] it's I know it's it's a big repo, but

[19:54] we'll go we're going to break it down.

[19:56] Um,

[19:58] actually going to

[20:01] move.

[20:10] Okay, going to

[20:15] to move to VS Code.

[20:19] All right,

[20:20] so

[20:22] here we have uh we have an two Nex.js

[20:26] apps. Actually the the slides are also

[20:29] embedded here. Uh the the NexJS app that

[20:33] um that matters it's inside demo, right?

[20:37] And to give you an insight of what that

[20:40] looks like, it's basically this.

[20:45] So it's a very simple application. Uh

[20:48] you can see that it's a VIP coded

[20:49] application to be honest. The the layout

[20:52] it has nothing special on it. Uh you

[20:54] have as I've described earlier several

[20:58] um employees of this uh fictional

[21:00] company. Um and you can think of it like

[21:03] an internet or a performance review

[21:05] application where uh you have all the

[21:07] information as an HR um employee you

[21:11] have all the information all the

[21:13] information about the um about the the

[21:16] other uh employees of the the company uh

[21:19] and you can change for the sake of the

[21:21] presentation you can change between

[21:24] uh users right so what we're going to do

[21:28] uh is first without a skill we're going

[21:31] to try to implement a new um a new a new

[21:35] view. Uh here we're going to implement

[21:37] the reports view. Essentially this uh

[21:40] reports uh part of the um of the

[21:44] application is going to be uh is going

[21:47] to show uh both the salary uh and the

[21:50] the average rating for the performance

[21:52] review of each department. So uh so HR

[21:56] can be um can know what's uh uh can have

[22:00] like an overview o of the of the whole

[22:03] company. Um so before we start to vip

[22:07] codes because um during these pres these

[22:10] workshops no one actually writes code

[22:12] anymore. Uh so of course I'm going to

[22:15] vype code it. We're going to just break

[22:18] this um

[22:21] um this application down. So if we

[22:25] navigate to the dashboard,

[22:28] nothing special to to see. You have it's

[22:31] basically the the page, the first page,

[22:34] the main page that you that you've seen.

[22:36] And then you have here the the reports

[22:40] where we should have

[22:45] Yeah. We should have this

[22:49] set view exists. that is going to uh so

[22:54] I prepared the back end. We're just

[22:56] going to to to create on the back end

[22:58] the view as a SQL view on the the back

[23:01] end on the on the database and then we

[23:03] should be able to to see to see it on on

[23:06] the application. So I've prepared

[23:12] where is it? Yeah. So,

[23:15] I've prepared the prompt

[23:18] and

[23:21] we're going to

[23:24] live test it.

[23:27] Fingers crossed that this work. Right.

[23:30] Uh first let me navigate to

[23:37] it's app.

[23:43] Okay.

[23:45] Here we have more control. All right. So

[23:48] essentially for the ones in the back

[23:52] uh I'm just ask I'm going to ask Claud

[23:55] to create a department stats view uh

[23:58] that shows the ad count and the average

[24:00] salary broken down by department. All

[24:02] right. So for uh HR to have a full

[24:05] overview of what's going on in the the

[24:07] company. So we're going to hit the

[24:09] prompt and wait it wait to see what it

[24:13] it should come up with. Uh

[24:17] right. Um forgot about this part. I have

[24:21] um this MCP server configured.

[24:25] If you have

[24:27] uh you actually have

[24:31] I totally jumped the

[24:34] the read me. Uh if you follow along,

[24:37] sorry about this. If you follow along,

[24:39] if you're following along, you can

[24:40] follow the setup guides uh to to get to

[24:43] get your application started locally. Uh

[24:45] this essentially is going to install the

[24:47] dependency, clone the repo, install the

[24:49] dependencies, start locally your your

[24:51] superbase project. You don't have to

[24:53] have the CLA installed that we were

[24:54] using npx to start to run it as a um as

[24:58] a binary. Um just resets the the

[25:01] database state. So you start from from

[25:03] scratch with the seeded data uh and then

[25:05] just run uh the the app uh as

[25:10] as the running npm rundev uh should be

[25:13] available on localhost 3,000/

[25:17] dashboard. Um

[25:19] you also have you'll have this MCP.json

[25:25] um file prepared. This essentially is

[25:27] pointing to the MCP server that we we

[25:30] Superbase enable uh for local projects.

[25:33] No authentication required. So your

[25:35] agent should be able to just load it uh

[25:37] on demand. This um uh this MCP server

[25:41] expose um a set of tools. is um I don't

[25:45] know many of you have used the the

[25:47] superbase MCP server but I think we

[25:50] currently have something along 20 20

[25:53] something 29 tools I believe for the

[25:56] production one uh this one is a smaller

[26:00] version uh has 20 tools but you can

[26:03] basically perform essentially almost any

[26:06] anything that the the the one uh to

[26:08] connect to your remote project does uh

[26:10] basically list the the tables that you

[26:13] have executes SQL the straight on your

[26:15] database apply migration uh and run the

[26:18] database uh advisor and so forth. So

[26:22] essentially what he what he started to

[26:24] do was to list my tables. So I've asked

[26:27] for a view it's going to review the the

[26:29] schema that I already have implemented.

[26:31] So I'll let you

[26:35] and now it's going to run the apply

[26:37] migration

[26:38] uh tool to create the view. So it's

[26:41] basically doing a schema change on my

[26:43] database and it's going to create uh the

[26:46] the view. If we inspect the view, we're

[26:48] basically creating

[26:50] um create a replace a view a department

[26:53] stat the name that we gave uh and we're

[26:57] uh by um fetching all the information uh

[27:00] from

[27:02] I think department exact uh

[27:06] no from profiles exactly and group by

[27:08] department. Okay,

[27:12] made a mistake. It's going to try again.

[27:17] Okay, it's going to test it. It's

[27:20] actually something that I really like

[27:21] about. All right, then here's the here's

[27:24] our uh view on the database. So, uh we

[27:28] currently have it on the database. Let's

[27:30] see if that's also enabled on the app.

[27:38] Okay, it's not then. Let's quickly uh

[27:43] I've

[27:45] created SQL.

[27:49] What's the name I gave?

[27:52] This is the this essentially the the

[27:55] problem with live views

[27:58] is it usually doesn't go well at first

[28:01] try. Uh,

[28:06] I want to repeat the

[28:28] and let's see if it if it implements. If

[28:29] not, we can just run the the SQL query

[28:31] for you to to see as different users uh

[28:35] to for you to see if everything is

[28:37] working um accordingly. So for now

[28:41] he's going to need to implement on the

[28:43] nextJS application so we can have a nice

[28:45] interface to to check the results. Um

[28:50] I need to enable everything. Wait, let

[28:52] me just put on auto mode so I can

[28:54] continue to talk. So essentially the the

[28:57] agent created the the view

[29:00] tested said everything is working

[29:03] accordingly. Uh we should not the the

[29:08] the app was um the the feature was

[29:10] implemented all good. Um but we're

[29:13] actually going to see if he's actually

[29:15] if everything it's it's good or not. Um

[29:18] so let's give it a

[29:20] let's give him some space. uh not to

[29:23] pressure not to pressure it to create

[29:25] the

[29:27] the the feature.

[29:29] Let's uh just wait a bit more time.

[29:35] In the meantime, if you're following

[29:36] along, you can also play with it. Uh

[29:40] change the the layout

[29:46] actually using the using cloud code. I

[29:48] don't know. just doing the a brief um

[29:51] survey here in the during the workshop.

[29:53] How many of you are using cloud code as

[29:55] well?

[29:57] Oh, fairly almost anyone. Okay.

[30:01] Um

[30:03] how many of you are using cursor

[30:06] with cloud codes or with the plug-in or

[30:09] Okay. Yeah, at least one person.

[30:12] Uh we're going to have uh some um cursor

[30:15] folks here. I think from a tropic as

[30:17] well. uh OpenAI uh is going to be here

[30:20] as um Gemini of course Google Deep Mind

[30:24] is sponsoring event. So um we're

[30:27] basically going to have the whole gang

[30:29] here. Uh okay. So we should be

[30:35] I'm trusting his word. All right. So it

[30:37] says that we should now be uh have

[30:40] correctly displays the the department

[30:42] stats view. So let's see if that's

[30:44] actually true.

[30:46] It looks like it. Yeah. So we now have

[30:49] this uh cards uh with the whole view of

[30:53] the company. So I'm logging in as Julia

[30:55] from HR. Uh we can see that we have five

[30:58] people on the engineering team with an

[31:00] average salary of uh uh 107K.

[31:04] Uh HR as well will only one person will

[31:08] would be Julia and product has four

[31:10] people and that average salary. So so

[31:13] far so good. Looks looks okay. Let's

[31:17] see. Uh so this is like this is sensible

[31:20] information. Uh the the reports, right?

[31:22] So uh we're expecting that the other um

[31:28] the other um employees will not have

[31:30] access to it and even the managers only

[31:32] have for their departments. Let's see if

[31:34] that's the case. So let's navigate to

[31:36] Bob. Bob uh is the head of engineering.

[31:40] Oh,

[31:41] okay. So, so Bob also can see the the

[31:44] performance reviews of both u the

[31:47] information of both HR and product.

[31:50] Well, it's not it's not that bad, right?

[31:52] Um it's not ideal, but uh at least he's

[31:55] a manager, right? So, uh it should be

[31:58] access to privileged information anyway.

[32:00] And who doesn't like a transparent

[32:02] company? Let's see if our hus is okay.

[32:05] Um okay, this is this is problematic. So

[32:09] we basically created a view. Uh Claude

[32:12] uh said everything is working because as

[32:15] you can see the information is here. It

[32:16] was created but um he missed something

[32:21] uh that is training data basically

[32:23] missed something which was for pro

[32:26] postgress specifically um when you

[32:28] create a a new view the

[32:33] and your um table has role level

[32:35] security enabled. So for those of you

[32:37] that don't know a role level security

[32:39] allows to for you to define who can see

[32:42] the information on a spec uh on a

[32:44] specific row on a database level. So

[32:47] without trusting the the application you

[32:49] can filter it directly on the on the

[32:52] database. So in this case we should be

[32:55] limiting the the the view of of the rows

[32:59] uh by user ID right and the user role.

[33:03] So if a user has an employee um and has

[33:06] an employee role, he should not be

[33:08] should not have access to the rows of

[33:11] the uh that don't belong to to them,

[33:13] right? Uh we have role level security

[33:16] enabled. If you navigate to our

[33:19] superbase

[33:20] um migrations,

[33:24] you can see

[33:27] uh

[33:29] level that we have role level security

[33:32] enabled

[33:35] both uh on profiles and on performance

[33:38] reviews, right?

[33:41] And on a performance review

[33:45] should be should be about right. Uh

[33:47] right. So we have

[33:50] reviewer ID equal current setting. So it

[33:54] should work. Why is not working? Well,

[33:56] when you create a view on Postgress, um

[33:59] by default the the permission um it

[34:03] creates with the permissions or or the

[34:05] the credentials of the the user that

[34:08] created the view and not uh with the the

[34:12] the credentials of uh of the of the

[34:15] table let's say with the the role level

[34:17] security. So basically by default it

[34:20] bypasses the role level security uh that

[34:22] you have in place on your that you might

[34:24] have in place already on your um

[34:28] uh on your uh on your table. So for for

[34:32] this scenario to happen, we have to have

[34:35] a security invoker

[34:38] uh we have to use a security invoker

[34:40] flag to

[34:43] transfer the role level security

[34:45] policies or to enable the the the RLS

[34:48] policies on the view itself. So this is

[34:52] the why currently everyone can see

[34:54] everyone's because the the role level

[34:56] security policies were basically

[34:58] bypassed on the on the view. So

[35:02] uh for the sake of the of the

[35:04] demonstration of this uh workshop, I've

[35:06] already created

[35:08] um a skill

[35:12] uh uh I prepared a skill uh for for the

[35:15] presentation.

[35:18] Uh and essentially the skill is three

[35:22] main po main security points about

[35:23] Postgress uh for that the agent should

[35:26] be aware of during the the presentation.

[35:30] For this one specifically, I actually

[35:32] overfeed it to the exact view that we're

[35:35] creating. But models right now are smart

[35:36] enough to generalize this. And if I

[35:39] wanted to to create a new view, you will

[35:42] be able to uh essentially it has to

[35:45] create with this flag. uh since

[35:48] Postgress uh version 15 this flag was

[35:51] enabled and every time it's enabled the

[35:53] the role level the RLS policies

[35:57] are also enabled on the on the view um

[36:01] as you can see it's um it's actually

[36:04] quite human readable documents um mo

[36:08] most of you have already written skills

[36:10] so I'm not going to uh dive deep into

[36:14] into this Um

[36:17] but as you can see we have both the

[36:20] title let me just move this we have the

[36:23] title I called it superbase security uh

[36:26] and the description uh uses the the verb

[36:29] use uh this is an insight that I that I

[36:32] got from uh some experiments that I've

[36:34] did using verbs mainly the the ver um

[36:39] the verb use uh increases the chances of

[36:42] the skill being loaded um at least on

[36:46] clots. I don't know if this is default

[36:49] behavior for for cloth if it was trained

[36:51] to recognize to more easily recognize

[36:55] verbs essentially use. Uh but I found it

[36:57] more efficient to if you write use and

[37:00] then the whole purpose of the the skill

[37:03] uh in front of it and then a regular

[37:05] markdown uh list. we have the the view

[37:10] case there but also another uh checklist

[37:13] to the points uh for security um on RLS.

[37:18] So public schemas should should have RLS

[37:20] enabled by default. Uh public schemas or

[37:24] exposed schemas are the the the database

[37:27] schemas that are going to provide

[37:29] information for the the application that

[37:31] the user can see. So for example the the

[37:34] users table the profiles the performance

[37:36] reviews all this information is going to

[37:38] be fetched by the front end. Uh it's

[37:41] completely secured because uh superbase

[37:44] makes it secure uh by by allowing you to

[37:47] to fetch information on from the front

[37:49] end. Uh but the the key part here is

[37:53] that if you don't enable role level

[37:55] security, you will not have this filter

[37:57] on the on the table and you will have to

[38:00] rely on the application logic to to make

[38:02] the the filter. So enabling role level

[38:04] security at least makes it safer uh for

[38:08] for you as the backend engineer uh that

[38:11] the you only expose the information that

[38:13] you actually want from the start.

[38:17] And then a couple more things that I'm

[38:20] not going into.

[38:22] So

[38:24] if we uh we can install this skill on

[38:27] this project um by running

[38:31] where where do I have the command

[38:34] npdx? Yeah.

[38:38] So, I'll be

[38:43] I'll be using Where's the skill? Okay,

[38:50] I'll be using Versel's uh npm package

[38:53] called skills. Um curious to know how

[38:57] you guys have been packaging your

[38:58] skills. Have been Have you ever used

[39:00] this uh this package? Are you using

[39:02] plugins? Just

[39:05] >> this one.

[39:05] >> This one?

[39:06] >> Yeah, this one mainly. Yeah, it became

[39:08] very popular uh few months ago.

[39:12] >> I think the only problem is it doesn't

[39:13] really

[39:15] adhere to your project. So you get like

[39:18] global

[39:20] only for your local project.

[39:22] >> Yeah, you can install it both uh

[39:23] globally and and on your project and

[39:26] also for multiple as support for

[39:27] multiple agents. Uh while plugins for

[39:30] now are still tied to the agent that is

[39:33] going to load them. So, Cursor has

[39:34] plugins, Cloud Code has plugins. Um, I

[39:38] think other vendors have as well, but

[39:40] they're specifically distributed and

[39:42] made for those specific models. Uh, so

[39:45] we're using this one to install. You can

[39:47] install any skill uh from a repo online

[39:51] that has a skill.md file or or um you

[39:55] can use it to install the one locally.

[39:57] It will auto detect the

[40:00] uh the location that you're trying to

[40:02] fetch from. uh based on the format. So

[40:05] in this case we don't have any GitHub,

[40:07] we don't have any HTTP protocol there.

[40:09] So we have a dot uh slash so it will

[40:12] recognize that it's um

[40:15] uh that it's a local one. And for this

[40:17] I'm going to uh

[40:21] move to the main. Yeah. Okay.

[40:26] And on a good oldfashioned way going to

[40:29] run on the bash.

[40:31] So, it's going to pop pop this up. Um,

[40:35] ask me which agent do I want to install

[40:37] on? I'm using cloud code, so I'm going

[40:39] to install it on cloud code. If you're

[40:41] using any other uh any other um agent

[40:45] arness, you can also install it as long

[40:47] as it's um uh it supports it. Uh I'm

[40:51] going to install it on on a project

[40:53] level. So it's going to in this case

[40:55] going to create a agent folder with the

[40:58] skill and uh link it to mycloud

[41:02] uh slash skills uh folder as well. So

[41:05] this so claude knows how where to find

[41:07] them. I'm going to sim link and we're

[41:10] ready to install. So we if we let's not

[41:14] expose my key. Uh I'll delete this is

[41:17] just for the workshop so I'll delete it

[41:19] afterwards. feel free to use my my free

[41:21] credits uh for the time being, but

[41:24] essentially created the the

[41:28] agent

[41:29] uh where is it? Yeah. So, I also have

[41:33] some more things that we're going to see

[41:35] afterwards. Uh but the essential part

[41:37] has the skill that I've showed

[41:40] previously. Yeah, there it is. It's the

[41:42] the skill and then also created a s a

[41:45] sim link a symbolic link to the cloud.

[41:49] Uh this is how the package works. Uh and

[41:52] this this way allows to to cloud to

[41:55] either search on agents which is

[41:56] becoming the standard or on the cloud uh

[42:00] folder that it has.

[42:04] So let's see let's run the same prompt

[42:06] again on a new session. Um, let me go

[42:12] back to the apps demo. Yeah. And start a

[42:16] new session. We should have this one

[42:20] enabled. Yeah, there it is. So, Claude

[42:22] is aware of uh the superbase security

[42:26] skill. Now for you to run skills, uh you

[42:29] can either um just run your prompt and

[42:34] uh pray that uh cloth imports your skill

[42:38] uh based on the description that you

[42:39] gave. Uh you can uh include the keywords

[42:44] use and then the name of the the skill

[42:46] that you have on the prompt and this

[42:48] will uh almost 100% of the times load

[42:52] your skill. or if you're using cloud

[42:54] code, you can just slash and write the

[42:58] name of of your skill. And this 100%

[43:02] guarantees that cloud we're going to

[43:04] import the skill. So for for our use

[43:08] case or for the presentation, I'm going

[43:10] to because I cannot afford that it

[43:12] doesn't load the

[43:19] the the skill. Let's

[43:22] wait. I need to

[43:26] uh I need to reset the the database to

[43:28] create the

[43:30] the view again. Um

[43:36] workshop uh and it's npxb

[43:42] reset.

[43:45] Yes,

[43:50] I'm just resetting the the database

[43:53] applying the migrations from the from

[43:55] the start. Uh I didn't it didn't create

[43:59] any um any migration file. He he applied

[44:04] direct the the migration directly to to

[44:06] the database. Uh so we now should should

[44:10] be good to to go. So it's going to u

[44:14] bring down the the database uh and

[44:17] create a new one uh based on the schema

[44:19] that we defined on the migration files

[44:21] and the seated data.

[44:23] >> Yes.

[44:43] Have you found ways to build

[44:58] skills?

[45:14] Yeah, that's a that's a fair point. So

[45:16] the the your whole question or

[45:20] observation it's that the initial

[45:22] promise of skills they were presented by

[45:24] anthropic were

[45:29] >> yeah uh

[45:31] so since this is uh this is like on the

[45:35] the agent side right the agent decides

[45:37] when to load this uh the best thing that

[45:39] you can do without explicitly

[45:42] either with the slash command or the use

[45:44] and then the name of the skill feel on

[45:45] your prompt. Uh is for you to play and

[45:50] uh play around with the description uh

[45:52] and run a bunch of tests either manually

[45:55] or um or automatically uh to to check

[46:01] what actually works and not for the the

[46:03] ones that that you're expecting the the

[46:06] agent to behave, right? So you define a

[46:09] bunch of scenarios where you think that

[46:12] the uh skill should be loaded and when

[46:15] the skill shouldn't be loaded. Um you

[46:18] test it out. You can test it on your

[46:21] machine like on this scenario I don't

[46:23] want the skill to to be loaded. Prompt

[46:25] the the prompt uh on on cloud code let's

[46:28] say and check if the skill was loaded or

[46:30] not through the CLI. Um,

[46:34] and then play around with the

[46:35] description to see what actually works

[46:37] or not. Like this without actually

[46:39] explicitly call the skill. This is the

[46:41] best thing that you can do to to to

[46:46] test if the the skill is being loaded

[46:48] correctly or not.

[46:51] Yeah, we're still at the at the very

[46:54] beginning of uh like a a very early

[46:57] stage uh of of skills even for MCP like

[47:00] all all this um agent stuff it's fairly

[47:04] new. So we're still we're still

[47:07] standardizing things. Uh we're still

[47:09] figuring out what works and what

[47:10] doesn't. Progressive disclosure was

[47:12] something that no one was talking about

[47:14] uh six months ago and now it's fairly

[47:17] it's fair to say that's one of the north

[47:19] stars of uh uh agent development. Uh so

[47:24] in six months from now probably it could

[47:26] be another thing. So or skills could be

[47:29] the standard or maybe anthropic or openi

[47:32] or someone else found a more efficient

[47:34] way to manage the context or provide

[47:37] more context to the to the agent. Uh so

[47:40] we'll see basically.

[47:42] All right. So the database was was

[47:45] reset.

[47:47] Okay. So at least now we have the view

[47:50] but we don't have the information on

[47:52] your database. So now we should be able

[47:55] to run the same prompt again but we but

[47:59] with the

[48:01] with the skill. So if if we hit the

[48:04] prompt

[48:08] you saying it was quite fast I don't

[48:11] think

[48:13] uh

[48:15] yeah but it didn't create one.

[48:20] Okay, let me try another thing. Instead

[48:22] of

[48:26] instead of this, let's

[48:30] use

[48:31] to create.

[48:36] Let's see if it works now. Yeah. Okay.

[48:38] So, it loaded the skill. So now at least

[48:41] should have the context uh to

[48:45] create uh that the the RLS or the

[48:48] security invoker flag should be included

[48:50] uh when creating the view uh and the

[48:54] steps should the the rest of the

[48:56] workflow should remain the same. So we

[48:58] it will list my tables. Right.

[49:01] Exactly. Identify the tables. And now if

[49:04] we look if we look closely we can see

[49:08] that we we now have

[49:11] this the the flag here uh is going to be

[49:14] on the on the migration. So let's see if

[49:17] with the flag uh this is the expected

[49:20] result.

[49:23] This is what what happens when you v

[49:24] code a CLI. You now have the the UI

[49:29] duplicated. Right? So, it created the

[49:32] view.

[49:33] We should be able to see it,

[49:37] but Alice shouldn't.

[49:40] So, what's happening?

[49:43] Wait. Okay. So,

[49:45] uh do I have to reset now?

[49:51] H

[49:54] interesting.

[49:56] should have another

[49:59] uh probably. Let me just see if I have

[50:02] it uh here.

[50:06] Uh where did I put it?

[50:14] So count

[50:19] I'm going to cheat here. going to say

[50:22] the both

[50:27] and the employee should

[50:32] be able to see information.

[50:54] Okay, basically live troubleshooting.

[50:58] What is not happening? Probably from a

[51:00] different uh a different um policy that

[51:03] I've defined here. Uh

[51:06] but now it's going to troubleshoot.

[51:07] Let's see if the the skill actually

[51:09] improves the the efforts here. If not, I

[51:12] have something on my sleeve. Uh because

[51:16] uh if you're not aware of Superbase

[51:18] basically has um

[51:22] database advisors that you can use uh to

[51:25] try to identify early early on identify

[51:28] um some potential vulnerabilities or uh

[51:31] schemas that are exposed, information

[51:32] that might be exposed um before you're

[51:35] running it into production. Um

[51:39] so if if it can figure out by itself I'm

[51:44] going to include on the skill to also

[51:45] run the advisor uh to to check. So this

[51:48] is the the main part of skills is that

[51:51] you can oh that's you can uh uh see well

[51:55] it's the it's a very poorly written

[51:58] application let me say uh it's

[52:01] essentially the the main part of skills.

[52:04] uh it's not if if this specific um demo

[52:07] works or not, it's that you the the

[52:10] behavior changed uh once it loaded the

[52:13] skill, right? It created with the

[52:14] security invoker part. Uh and with with

[52:17] that that just shows how powerful it is

[52:21] that that you can create um you can

[52:23] change the the behavior or or guide the

[52:26] the agent on demand bas uh based on the

[52:30] on information that you that you put.

[52:31] can think of the skill.mds as a prompt

[52:34] template that you can give to to your

[52:36] agent. So, let's just quickly

[52:39] troubleshoot. Oh, is even offering to

[52:42] apply a migration.

[52:45] Let's see if it doesn't break my my app.

[52:50] All right. So it seems too complic

[53:18] >> I have a fairly amount of skills. if you

[53:20] as you can see I've been playing around

[53:22] with them. I also have the some of the

[53:25] pre-installed MCP servers for that um

[53:28] that Superbase enables. Uh but

[53:31] essentially

[53:33] SK uh it would be more interesting if

[53:35] you if I've just um if I've compared the

[53:38] the context uh from before and after

[53:40] loading the skill. So right now skills

[53:43] take 1.3

[53:45] uh,000 tokens on my context, right? uh

[53:49] as you as you saw I have more than than

[53:52] just this one uh skill but the skill was

[53:56] loaded so the whole information inside

[53:58] skills.mmd was loaded to to context if

[54:01] we clear and run the context again

[54:07] the

[54:09] the skill amount so this skill is not

[54:13] it's not enough to for you to see but as

[54:15] you can see the the skill stick quite

[54:19] um less space uh that that the MCP uh

[54:24] would uh from

[54:30] all right okay I have a newer um version

[54:33] of the cloud code so for those of you

[54:35] who are not aware of this uh entropic

[54:37] recently released the tool the the tool

[54:40] search tool uh which is a mechanism for

[54:43] for cloud code to load tools on demand

[54:45] so it doesn't loads basically

[54:47] progressive disclosure but for MCP

[54:49] tools, right? Um the the main difference

[54:52] between M this progressive disclosure or

[54:54] the the tool search tool um on uh on

[54:58] cloud codes and skills is that the

[55:00] progressive disclosure is built by

[55:03] design uh for skills. So it's like

[55:06] already baked into the structure the

[55:08] instance of the skill while on MCP is

[55:11] still not a standard for all tools. So

[55:14] it works for cloud code but for many

[55:16] other clients it won't. It will just

[55:18] load all tools straight to your context.

[55:21] So um this is a for now a thing uh for

[55:27] just um for for just cloud code. If

[55:30] you're interested about it uh we are

[55:32] going to have the the founder or one of

[55:34] the co-founders of the MC of MCP

[55:36] speaking on the 10th. So on Friday, um

[55:39] he's going to to give a brief overview

[55:42] of the the MCP road map. Um which if

[55:46] it's something if anything if nothing

[55:48] changed since last week uh when he

[55:51] presented this in New York uh on the MCP

[55:53] dev summit, you should bring this uh

[55:55] this progressive disclosure part uh to

[55:58] tools to to bring it to the protocol

[56:00] itself.

[56:02] So

[56:04] >> yes,

[56:05] >> let's say that we have very large

[56:08] database and we have to to load in the

[56:13] context the schema of this database

[56:16] because we we have to query database

[56:20] using agents

[56:22] >> in your opinion is it better to use a

[56:25] skill or an MCP

[56:29] for examp

[56:31] to to load this schema but progressively

[56:36] Okay. Uh

[56:37] >> possible to use the schema to

[56:38] progressively disclo um uh load the

[56:42] schema of this big database

[56:45] >> in your experience.

[56:47] >> Yeah. Oh yes. Okay. So is your question

[56:49] more about uh how should we access it or

[56:52] the whole architecture of this uh

[56:54] pipeline to import the the data? I I

[56:58] just want to to ask to a an agent uh to

[57:01] to query the database and uh obviously

[57:05] uh uh the agent uh uh must know the the

[57:09] schema of the database

[57:12] before

[57:13] or not.

[57:18] How can you teach the the agent to to

[57:21] query the database

[57:23] >> using the skills using the uh an MCP

[57:28] server or something like that? And if

[57:30] you use the skills,

[57:33] if you decide to use the skills to uh to

[57:36] load the context of the agents with the

[57:39] schema of the database, is it possible

[57:41] to progressively load the schema within

[57:45] the context?

[57:47] >> Okay, gotcha. Um so let me break let me

[57:50] break the the situation. Uh let me break

[57:53] down the situation for you here. you

[57:56] you'll have um essentially two parts.

[57:59] One is uh what's going to be on the the

[58:03] context. So what's going to be loaded

[58:04] and the the specific information uh that

[58:07] you want to to have um on your on your

[58:11] scenario. Uh and the second part is the

[58:13] actual mechanism the the extraction

[58:15] mechanism that you're going to use to

[58:16] load the information from the database.

[58:18] So for the second part to to load the

[58:20] the information from the the database

[58:23] you can either use uh a script so a

[58:27] skill that invokes a script or an MCP

[58:30] tool. Um I would advise to use an MCP

[58:33] tool because you can uh use it if if

[58:36] you're using on production or on remote

[58:38] project. You don't rely on your local

[58:40] environment. You don't have to manage

[58:42] the keys. Um and the tool it's already

[58:45] standardized and uh you already have the

[58:48] the authentication baked into the

[58:49] protocol. So the agent never manage the

[58:52] the authentication uh token. It's on the

[58:55] it just runs the tool um and and it

[58:58] works for the for it to progressive

[59:01] disclosure the the information on the

[59:03] database. It will you'll have to um you

[59:07] can include it on on a skill. Yeah. Uh

[59:09] you'll be using the MCP tool. on the

[59:12] skill you'll probably state that use

[59:14] this tool to load and in the tool

[59:17] implementation you have to enable it to

[59:19] not load to progressively loaded right

[59:21] so to load into chunks um it might be

[59:26] just enough from the the the tool

[59:29] parameters um the agent should figure it

[59:32] out by itself that if you put a

[59:33] parameter called buffer for example

[59:35] should be able to load it in chunks

[59:38] right uh instead of the whole table. But

[59:42] if you want to have 100% sure that it's

[59:45] going to load into chunks and use it

[59:47] properly, I would also package with with

[59:50] a skill and describe it how I intend to

[59:53] to use this uh this tool. So this is

[59:56] actually how both skills and MCP play

[59:59] along together. It's the the tool to

[1:00:01] enable this connection, this integration

[1:00:03] and the skill to describe how to use it.

[1:00:06] Yeah, this is how I I would implement

[1:00:08] this this type of system. Uh thank you

[1:00:10] for for the for the question. Uh and it

[1:00:13] got me the opportunity to to basically

[1:00:16] talk about the how how to use both

[1:00:18] skills and MCP and not put it uh uh one

[1:00:22] against each other. Um so now as I

[1:00:25] promised we should be moving on. Um I'll

[1:00:29] have to give it more time uh to to

[1:00:32] figure out because I've I basically

[1:00:34] during the the workshop when I was

[1:00:36] preparing the workshop I've I've gave it

[1:00:38] a bunch of vulnerabilities. So if I just

[1:00:40] kept it simple and that one the demo

[1:00:42] should would probably work. Um since I

[1:00:46] have more vulnerabilities exposed that I

[1:00:48] if I had time I would um try to solve

[1:00:51] it. Uh it didn't for for the moment but

[1:00:55] uh but you you saw on both uh scenarios

[1:00:59] that the first one didn't have the

[1:01:00] security uh flag security invoker flag

[1:01:03] and the second one had. So at least we

[1:01:06] can um

[1:01:09] we we can imply that the the the skill

[1:01:12] was doing something. The the the agent

[1:01:15] saw the information on the skill. It it

[1:01:18] merged it with the system prompt or

[1:01:20] stored it near near the system prompt

[1:01:23] and um change the behavior accordingly.

[1:01:26] uh to test this. So if you want to move

[1:01:28] this um this part the the skill into

[1:01:32] production, right? So it works on your

[1:01:34] machine. It's a it's a tail older than

[1:01:37] time that it's working on my machine,

[1:01:39] but I don't know if it's going to work

[1:01:40] on your agent, on your machine, uh on

[1:01:43] your um environment.

[1:01:46] So to have this uh to to test this or to

[1:01:49] automate this testing and with this we

[1:01:52] can unlock having a pipeline for example

[1:01:54] if you change one thing on your skill uh

[1:01:57] how can you reliably tell that it's uh

[1:02:00] it keeps doing what you're expecting

[1:02:01] didn't break the previous flow so if I

[1:02:04] uh change one of the checklists how can

[1:02:07] I ensure that the the other ones were

[1:02:09] still working right so for the this is

[1:02:12] where evals um could step in. So, uh,

[1:02:18] evaluations, it's a very broad term. You

[1:02:20] can basically evaluate anything since

[1:02:23] this is a markdown file. It's a free

[1:02:25] text file. You can evaluate basically

[1:02:27] anything. Uh, so it's um fairly

[1:02:30] difficult for you to the most difficult

[1:02:32] part to create evolves, I would say, is

[1:02:34] actually coming up with the scenarios

[1:02:36] because you would first have to to know

[1:02:38] what's the expected behavior uh of your

[1:02:41] of your agents. Um

[1:02:44] so coming up with representative

[1:02:46] actually good scenarios that represent a

[1:02:49] fairly amount that cover a fairly amount

[1:02:51] of uh use cases that you want to to

[1:02:53] build are the most difficult. Um and

[1:02:57] there's still not a standardized

[1:02:59] structure to create evaluations. you can

[1:03:02] use um you can test it um or by

[1:03:06] importing a bunch of prompts and

[1:03:08] expected outputs uh from a CSV file from

[1:03:11] a JSON file. You can use tools uh like

[1:03:15] Brain Trust or Lenfuse to test it um and

[1:03:19] to to have an analytics and an obser

[1:03:22] observability layer on top of it. Uh for

[1:03:24] this presentation I followed

[1:03:28] the

[1:03:30] um I followed the what agent skills uh

[1:03:33] open standard defines as to to design

[1:03:37] the test cases. So if you're not aware

[1:03:39] of this website, this is the landing

[1:03:41] page of the agent skills open standards

[1:03:44] uh to try to standardize what a a skill

[1:03:47] is and how should behave and they

[1:03:50] basically propose a very simple

[1:03:52] structure local way to test the the

[1:03:55] skills organized by you'll have an

[1:03:58] eval.json that essentially has

[1:04:02] a set of evolves. an array of of evolve

[1:04:06] scenarios. Um, you'll put the prompt

[1:04:10] that you're going to give the agent, the

[1:04:12] expected output from the agent. Uh, this

[1:04:14] is only if you have an LLM as a judge.

[1:04:17] Uh, this is a technique used for

[1:04:19] nondeterministic evaluation. You you

[1:04:22] would have instead of a human, you can

[1:04:24] give the outputs of a of a an evaluation

[1:04:28] run uh to another LLM. say it define a a

[1:04:32] success criteria and let the the LLM

[1:04:37] who's who's doing the uh whose role is

[1:04:39] is to judge in this case that's why it's

[1:04:42] called LLM as a judge uh to give it a

[1:04:45] grade basically. So this is one part

[1:04:48] that you can automate on your

[1:04:49] evaluations for nondeterministic

[1:04:51] workflows. you can either assert if a

[1:04:53] tool was called or you can give the the

[1:04:56] results to an LLM and

[1:04:58] nondeterministically try to uh get the

[1:05:01] the agent to to grade the the

[1:05:04] performance of the other agents. We

[1:05:05] basically have agents evaluating agents.

[1:05:08] Um so I followed this this structure. I

[1:05:13] gave the same um the same input here,

[1:05:18] right? Uh so the the agent that is going

[1:05:21] to run this evaluation is going to get

[1:05:22] the same input that we that we had. The

[1:05:25] expected output it's that the security

[1:05:27] invoker uh it's true. So it's it's

[1:05:29] present on the um on the app uh sorry on

[1:05:32] the view and I have and then I have a

[1:05:34] bunch of uh assertions that in this case

[1:05:38] um

[1:05:40] I'm going to check it uh um

[1:05:42] deterministically right I prepared a

[1:05:45] Python script that essentially just

[1:05:50] resets the the state of the database so

[1:05:52] we we ensure that uh since we're running

[1:05:55] this locally and not on isolated

[1:05:58] container like a docker container for

[1:06:00] example uh we have to make sure that the

[1:06:03] systems always starts uh from the same

[1:06:06] ground so I'm going to reset the the app

[1:06:09] uh if you want to to run the the

[1:06:11] evaluations as well you have to pick

[1:06:14] your own entropic key uh create copy

[1:06:17] this you can follow the the read me

[1:06:19] inside the the superbase security uh

[1:06:21] here you'll have how to set this up um

[1:06:25] but then I I will run the uh the cloud

[1:06:28] code on it. Uh I think it's on print

[1:06:32] mode or can remember what what they

[1:06:34] called but essentially like I will run

[1:06:36] it as a binary headless. Um so the agent

[1:06:41] will receive the um the the prompt that

[1:06:46] that's on the evaluation uh as the task

[1:06:48] to perform. And I'm also going to to

[1:06:52] give the condition uh we're going to

[1:06:54] test two conditions. one with the skill

[1:06:56] and another without it.

[1:07:00] And essentially,

[1:07:01] so for you to see run the condition

[1:07:05] run, this is where the cloud code will

[1:07:07] run. And if the condition is with skill,

[1:07:10] we're going to load the skill.md into

[1:07:13] the the system prompt, right? Um if you

[1:07:18] if you would actually uh would like to

[1:07:20] mimic the behavior, you would run this

[1:07:23] on the Docker container. you will put

[1:07:25] the agent skills uh on the cloud/skills

[1:07:30] um directory inside of a docker

[1:07:32] container and let organically let the uh

[1:07:34] cloud codes find them and use them. Uh

[1:07:37] for for this presentations this is a

[1:07:39] very simple setup. I've just basically

[1:07:42] appended to to the system prompt. So,

[1:07:52] so we're going to run the evaluations.

[1:07:56] Uh, do I have the other? Yes, I do.

[1:08:01] Okay. I think we run it on the

[1:08:06] base.

[1:08:24] How is it not finding the the skill

[1:08:27] supervisor?

[1:08:29] No.

[1:08:31] Okay.

[1:08:36] Oh, I have Wait, I know what's going on.

[1:08:39] I have the

[1:08:41] the wrong name.

[1:08:44] I change it.

[1:08:51] All right. So, we started by running

[1:08:54] with the skill. So, the first result

[1:08:56] that we should get is the the with the

[1:09:00] skill. It stopped. Now, it's running

[1:09:02] without it. And then we're going to

[1:09:04] compare it. This will output a workspace

[1:09:08] iteration one um folder and we can

[1:09:12] compare it both the output of uh with

[1:09:16] the skill and without it uh while the

[1:09:18] without skill is loading. Let's just

[1:09:21] quickly inspect what what the uh with

[1:09:24] skill output gave. Um and essentially

[1:09:27] you can see that it created this the

[1:09:30] view with the security invoker and then

[1:09:33] we have this grading.json JSON file with

[1:09:36] a bunch of information like the the

[1:09:37] assertions that we we've put on the

[1:09:39] eval.json.

[1:09:42] Uh we have them here and we can see

[1:09:46] that for this one created as the as

[1:09:51] failing even though that created where

[1:09:53] is it not found

[1:09:58] the view as security

[1:10:03] okay I'm actually evaluating something

[1:10:05] wrong so the problem here now it's with

[1:10:08] the

[1:10:09] is it the scale uh view.

[1:10:13] So since I I was expecting this to to

[1:10:16] create an PG class

[1:10:18] uh RL options instead of just inspecting

[1:10:21] the the view, it's giving me that uh it

[1:10:24] failed. But the key part has it

[1:10:28] finished.

[1:10:30] It's not finished.

[1:10:34] Still running. Take a long time.

[1:10:38] Could be. Okay.

[1:10:44] And now we can inspect.

[1:10:50] Okay. So, uh this is actually good good

[1:10:52] insight. So, um with these results, this

[1:10:56] is the the tricky part of of writing

[1:10:58] evolves. Um

[1:11:01] so, as the uh as like normal tests, uh

[1:11:05] the results will depend on how you

[1:11:07] implement them, right? it's it's just

[1:11:08] code. Uh so if you're evaluating

[1:11:11] something wrong or some or not the the

[1:11:14] expected behavior, you're going to have

[1:11:16] wrong results. It might not be because

[1:11:18] the the system is is not working. So uh

[1:11:21] we've tested manually and see that with

[1:11:24] the skill it created with the security

[1:11:27] um that the security flag we can

[1:11:29] actually just inspect it here with the

[1:11:31] skill created. Let's see if if on this

[1:11:33] one surprisingly this time it did. It's

[1:11:36] a nondeterministic

[1:11:38] um the nondeterministic behavior of of

[1:11:41] clots. Um

[1:11:44] but since I was evaluating something

[1:11:46] wrong, right? Uh I was expecting it to

[1:11:49] create the or or inspecting uh the um a

[1:11:53] meta schema to check if the the the view

[1:11:56] the the security invoker was there or

[1:11:59] not instead of just inspecting the view

[1:12:01] directly.

[1:12:02] um the results came a bit off. So it

[1:12:07] said that with the skill it failed and

[1:12:10] with

[1:12:12] the um without the skill it passed. So

[1:12:16] and if if we inspect the both outputs

[1:12:19] they're basically the same. So with this

[1:12:24] ju just to show you how tricky it is to

[1:12:26] to write evolves because it's although

[1:12:28] this can happen on uh with the with the

[1:12:31] regular uh tests um it's easier to catch

[1:12:35] because the the output is deterministic

[1:12:37] right it's just code um here if you're

[1:12:40] handing to to an LLM to evaluate it can

[1:12:44] sometimes elucinate

[1:12:46] so to finish uh because we're also

[1:12:49] almost running out of time

[1:12:53] to sum up the the structure. This is the

[1:12:55] one that they recommend. Uh I find it

[1:12:58] very easy to implement to to getting

[1:13:00] start with. Uh later on you can move on

[1:13:03] to more um complex uh evaluation

[1:13:08] scenarios like running on a docker or in

[1:13:10] the sandbox uh to guarantee that uh you

[1:13:14] get a fresh environment with just one

[1:13:16] skill that you're testing on your set.

[1:13:19] Um but essentially you would just put

[1:13:22] two conditions with and without the

[1:13:24] skill compare the results and see uh run

[1:13:27] them on the harness the agent harness

[1:13:29] that you would like and compare the

[1:13:31] results uh out there. This is basically

[1:13:34] your very first uh evaluation pipeline

[1:13:37] to to test the skill automatically.

[1:13:40] From my end that's all. I hope you find

[1:13:44] you found this workshop useful to to get

[1:13:47] your skills leveled up and ready to

[1:13:50] productions. I'm going as I said in the

[1:13:52] beginning I'm going to give uh a keynote

[1:13:54] tomorrow a keynote no a talk tomorrow

[1:13:57] about how we've implemented uh and

[1:14:00] created the the superbase skill for the

[1:14:03] product itself. How we're keeping it m

[1:14:05] maintainable while ensuring that

[1:14:07] provides value and now we're uh testing

[1:14:10] it uh into production. Thank you. ANYONE

[1:14:18] has uh any doubts, questions?

[1:14:21] I'll I'll also be Yeah.

[1:14:23] Uh so I have a question about uh like

[1:14:27] the number of skills that you typically

[1:14:29] install on your environment because with

[1:14:31] this progressive disclosure it seems

[1:14:34] like we can basically keep adding

[1:14:36] different skills and the agent will

[1:14:38] automatically

[1:14:40] um basically the agent will

[1:14:43] automatically

[1:14:44] find them. Uh do you have any

[1:14:47] recommendation on how many skills to

[1:14:49] have

[1:14:50] >> or is there any limit or we should just

[1:14:52] basically keep adding uh and it will

[1:14:56] magically work?

[1:14:58] >> Yeah. Uh I'm probably not the best

[1:15:01] person to talk about this cuz uh it's

[1:15:03] easy for you to um get into this rabbit

[1:15:05] hole or of just like especially when

[1:15:08] you're experimenting getting a bunch of

[1:15:09] skills as as you saw. I had a plenty of

[1:15:11] them um installed globally and um I

[1:15:15] think it's fair to say that and use them

[1:15:17] all uh on a daily basis. Um but it

[1:15:21] depends if if you're using them on your

[1:15:23] local machine. I think it's pretty

[1:15:26] um be pretty easy for you to um get this

[1:15:31] messy environment where you'll have all

[1:15:35] of them installed or most of them

[1:15:37] installed. um for local for your local

[1:15:40] environment I wouldn't for now since

[1:15:42] it's very experiment or my personal

[1:15:45] opinion I would not uh constrain myself

[1:15:48] on like

[1:15:50] space management or context management

[1:15:52] about this the progressive disclosure

[1:15:54] it's a very powerful thing that you can

[1:15:56] explore in this case you sure if you

[1:15:58] have skills that you don't use uh you're

[1:16:01] going to have them uh fill your context

[1:16:04] window but the descriptions are so small

[1:16:05] that you can afford to not delete them

[1:16:08] if you don't want to. Uh into

[1:16:09] production, treat them as um any

[1:16:13] artifact that you would have on your CI.

[1:16:15] Uh so keep it clean. Uh into production

[1:16:18] into your CI um I would keep them only

[1:16:22] the the exact skills that you that

[1:16:24] you're using in that specific case.

[1:16:27] Yeah. Uh, another piece of information

[1:16:30] that that I could give you on the

[1:16:31] production part is that it's now more

[1:16:34] and more common for you to uh, also

[1:16:36] export skills or make skills available

[1:16:39] on your repos um, as like another piece

[1:16:42] of documentation. So treat it treat

[1:16:44] skills that you put into production as

[1:16:46] actual document as you would read

[1:16:48] documentation. So it's important for you

[1:16:50] to keep them updated uh include it on

[1:16:52] your include the the updates workflow on

[1:16:56] your cloud.mmd or on your agents.mmd. So

[1:16:59] you make sure that if anything changes

[1:17:02] um you will change this the the skill as

[1:17:04] well like you would do on on the

[1:17:06] documentation if a feature or workflow

[1:17:08] changes. Um

[1:17:11] he from time to time you can also create

[1:17:13] a um a job to to check if the skill uh

[1:17:18] is still uh running a fair workflow. I

[1:17:21] somehow you could check if the the skill

[1:17:23] have been loaded by your users um

[1:17:27] in a if it haven't been loaded by your

[1:17:30] users for a long time does it still make

[1:17:33] sense to have it there? Um, so yeah,

[1:17:37] this is basically the the piece of

[1:17:39] advice that I could give you for skills

[1:17:41] into productions based on my experience.

[1:17:43] Uh, for the rest of it, you'll have to

[1:17:45] come to the to the talk tomorrow to

[1:17:47] learn. Uh, we're putting it into

[1:17:49] production on Superbase.

[1:17:52] Any more questions? I'm going to be

[1:17:55] around throughout the whole event. So,

[1:17:57] if you catch me um if you if you cross

[1:18:00] paths, feel free to to ask me anything.

[1:18:03] Tell me about what you're building.

[1:18:05] Would love to see if it's with

[1:18:06] Superbase. Even more thrilled to hear

[1:18:08] about it. Um, and from my hand once

[1:18:11] again, thank you very much. You've been

[1:18:12] lovely today for uh 9:00 a.m. Pretty

[1:18:15] cool. Good energy. Uh, so just from my

[1:18:19] end, enjoy the the rest of the the

[1:18:20] conference and we'll see you around.

[1:18:22] Thank you.

[1:18:29] Heat. Heat.
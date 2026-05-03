---
title: "Chroma | Context Engineering Episode 1 - Dex Horthy (@dexhorthy)"
author: "Chroma"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=BNhRnx_O95c"
date_saved: "2026-05-03T02:04:56.840Z"
---

# Chroma | Context Engineering Episode 1 - Dex Horthy (@dexhorthy)

[0:00] Hey man, how's it going?

[0:01] >> What's up, dude? It's good to see you,

[0:02] man.

[0:02] >> It's good to see you. All right, so this

[0:04] is an experimental format, which is to

[0:06] say we just talk. Um, whenever we hang

[0:09] out, we seem to have great conversations

[0:11] about all things context engineering.

[0:13] And, uh, so here we are. We're in

[0:16] December of 25. Um,

[0:20] how are you thinking about context

[0:22] engineering? What are your latest

[0:23] thoughts? So my favorite thing about

[0:24] context engineering actually I think I

[0:26] figured this out like a month or two ago

[0:28] but like I had posted that thing in like

[0:31] April 3rd or something right

[0:33] >> the 12 factor agents

[0:34] >> 12 factor agent thing right which is

[0:35] like had a article on like one of the

[0:38] one of the 12 factors was like about

[0:40] context engineering which apparently

[0:41] that was the one that blew up

[0:43] >> but like two weeks afterwards you just

[0:44] posted the words context engineering

[0:46] with no context and I'm like oh Jeff was

[0:49] thinking about the exact same thing at

[0:51] the exact same time as me and uh so that

[0:55] was exciting. I it's uh it's fun to have

[0:57] a a a secret co-creator of context

[0:59] engineering out there.

[1:01] >> I I don't remember if it was uh you know

[1:03] spontaneous evolution or uh if I just

[1:05] totally unintentionally loped and carpet

[1:07] copied you, but uh I could do worse than

[1:09] copy you. So yeah.

[1:10] >> Yeah.

[1:10] >> One of the new words I'm seeing a lot is

[1:12] harness engineering. Have you seen this?

[1:13] >> I I tweeted about that unfortunately as

[1:15] well.

[1:15] >> I just tweeted about a guy. I was like,

[1:17] "Oh, yeah. This guy said it first." And

[1:19] then I was like, "Oh, no. That guy was

[1:20] actually reposting a post from another

[1:22] guy who I have literally talked to in

[1:25] the last two weeks." And I've read I've

[1:27] like seen the article. I didn't actually

[1:29] read it, but uh yeah, attribution is

[1:32] hard and I don't think anyone can really

[1:34] own a word for that long anyways.

[1:36] >> And who cares, right? It's kind of

[1:37] cringe to be like the person who coined

[1:38] X as like your name, your claim to fame

[1:40] anyways. So, I think we're aligned on

[1:41] that. Um, what do you I mean new models

[1:44] are coming out every day in the past

[1:45] like three days, three weeks. So many

[1:47] new powerful models have come out. Like

[1:49] how have you updated your priors on like

[1:52] what it means to do context engineering

[1:53] with these like latest and greatest

[1:54] models?

[1:56] >> Yeah. I mean I think

[1:59] I mean context engineering for me is

[2:00] like how do you get the most out of

[2:02] today's models? Yeah. If I was going to

[2:03] put it like at the top. A lot of people

[2:04] say, "Oh, it's all about putting the

[2:05] right information into the model." But

[2:06] it's like it's like it's it's getting

[2:09] the right information in, but also like

[2:10] keeping it as small as possible. And the

[2:12] keeping it as small as possible and as

[2:13] dense as possible is like the the thing

[2:15] that actually I think like not token

[2:17] dense, but like information per token

[2:19] density.

[2:20] >> Uh so it's every time a new model comes

[2:24] out, we're obviously we're playing with

[2:25] it, we're testing it, we're working in

[2:26] different workflows. I think um a lot of

[2:29] what we are building on is built on kind

[2:31] of a paradigm that we're exploring a way

[2:34] past because I think there's a there's a

[2:35] new vision for it that is

[2:39] a little bit more flexible and makes it

[2:41] easier to take advantage of new models

[2:42] while they come out because today a lot

[2:44] of what we're doing and what we're

[2:45] building it's something that works

[2:46] really really well is like use a really

[2:50] smart model as your like top level

[2:52] steering orchestrator something like

[2:54] opus 45 or opus it was opus 41 forever.

[2:57] Opus 41 was the first thing that really

[2:59] like

[2:59] >> oh we can actually do really incredible

[3:01] things with this model. Um and then you

[3:04] would delegate out like with your

[3:05] harness has sub aents which is one of

[3:07] the reasons we really like cloud code

[3:09] delegate out to a bunch of sub aents

[3:11] that use faster del models right we've

[3:14] seen this with cognition and sweetgraph

[3:16] we've seen this with warp just and like

[3:18] release their gp agent was it warp no

[3:21] morph sorry

[3:22] >> morph but it's called warp gp

[3:24] >> okay that's why okay [laughter]

[3:27] >> uh

[3:27] >> it's a lot of

[3:29] >> but one thing we've been exploring and

[3:30] it's actually um how the amp code team

[3:32] designed like AMP's been this

[3:34] architecture for a while where your like

[3:35] main orchestrator is actually a smart

[3:39] but not the smartest

[3:41] >> fast model. So they've been using sonnet

[3:44] >> as the default for a really long time um

[3:47] as kind of the core one and then they

[3:49] had this thing oh you can delegate out

[3:50] to a smart model. They had like this

[3:52] oracle concept, right? And so they you

[3:54] put the reasoning and the really like

[3:56] beefy slow thinking intelligence. Hey, I

[3:59] have 50 files I need you to read and

[4:01] like try to help me figure out where

[4:02] this race condition is or something like

[4:04] that.

[4:04] >> Yes.

[4:05] uh and that becomes something you

[4:06] delegate and doing that really well is

[4:08] tricky because those big slow models are

[4:11] slow and if you're just like hey read

[4:12] these 50 files like

[4:14] >> I

[4:16] don't like sitting we've experimented

[4:18] with this using like sonnet as the

[4:19] driver and opus as the like thinker and

[4:22] the problem is is like opus is going to

[4:24] sit there and call tools and read every

[4:26] single file [laughter]

[4:27] and it's just slow because it's a big

[4:29] slow model they have the same thing with

[4:30] when when they had 03 as the Oracle um

[4:33] I'm sure it's GPT5 high now or whatever

[4:34] it is. I have I haven't checked in a

[4:36] while.

[4:36] >> Yeah.

[4:36] >> But it's like Yeah. 03 is not great at

[4:38] tool calling and it's slow and so like

[4:40] if you actually wanted to read so

[4:41] there's like the context engineering

[4:43] nugget there is like okay well if you

[4:44] can have the the fast orchestrator model

[4:48] like figure out which files are relevant

[4:50] without having to like really understand

[4:51] every line of code

[4:53] >> you can put some deterministic layer in

[4:55] between that is just going to like stuff

[4:58] all those files into a big prompt and

[5:01] you kind of like step away or like

[5:05] >> you're you're deemphasizing the agentic

[5:07] loop loop and you're just like here's a

[5:09] crap ton of context tell me how it works

[5:11] or answer whatever the question is

[5:12] whether it's like explaining

[5:13] architecture things like that so

[5:16] >> the answer is like I think if we can the

[5:18] more people can move to that

[5:19] architecture and there's like a lot

[5:20] there and there's a lot to eval there's

[5:22] a lot to like figure out what the right

[5:24] just the right way of doing it beyond

[5:25] just like the vibes of us and our

[5:27] customers using it internally and trying

[5:29] it for us. Yep.

[5:30] >> Um,

[5:31] >> this makes me think of another question

[5:33] which is like there's one school of

[5:35] thought which is like one model is all

[5:37] you need and maybe you're not even using

[5:38] sub agents, right? You're kind of just

[5:40] using like one model, one agent loop

[5:42] like you know multi-agent maybe like too

[5:45] brittle. This was the opinion at least

[5:47] you know a few months back for certain

[5:48] group of people. Um or like multimodel

[5:51] was also like either just like too hard

[5:53] to reason about or too brittle. Um and

[5:55] then obviously now you also I think

[5:56] increasingly seeing kind of this view or

[5:59] idea that like no actually like sub

[6:01] agents are really important for a lot of

[6:02] reasons and like breaking breaking out

[6:05] kind of agents into different roles and

[6:06] responsibilities which also begs the

[6:08] question like do you use like

[6:09] purpose-built models you know so take

[6:11] for like search for example uh you

[6:13] mentioned these like fast you know

[6:14] search agents these like you know models

[6:16] which are very good at using uh search

[6:18] tools and using them hopefully well um

[6:21] yeah what are what are your thoughts

[6:23] like you know is do we not you

[6:25] is the bitter lesson coming for all of

[6:26] us in the in the end of time like you

[6:28] know how durable is this is just a best

[6:30] practice for now and like we should just

[6:31] all embrace it because it is the best

[6:32] practice for now to use like multi-gage

[6:34] multimodel like what is how do you think

[6:36] about this in your head

[6:37] >> well and yeah and you have orthogonal to

[6:39] the like I want to answer your question

[6:40] but not to get to you have orthogonal to

[6:41] like new models every week but then you

[6:43] also have like Ilia like scaling is not

[6:46] going to keep happening like we actually

[6:48] like we're we're getting near the

[6:50] plateau for the current set of

[6:51] technology and we need to go back to

[6:52] research for a while I don't I know if I

[6:54] buy that either. Uh

[6:56] >> and the real better lesson is that S

[6:57] curves are, you know, come for us all in

[6:59] the end. So

[7:00] >> Yeah. Yeah.

[7:01] >> Yeah. Well, but that's it's almost like

[7:03] the inverse, right? It's like, okay, if

[7:05] things are topping out, then now is the

[7:06] time to be investing in how do we get

[7:09] the most out of today's models? Because

[7:10] two years ago, you could be like, look

[7:12] at all this code we wrote so that GPT3.5

[7:14] can actually like solve these problems.

[7:16] And it's like GPT4 comes out and you're

[7:18] like, oh yeah, we can throw all that out

[7:19] now. It does feel now if you think about

[7:21] like the landscape of boxes that like an

[7:23] agent harness needs to do a good job.

[7:24] It's like okay maybe there's like a file

[7:26] system there's some level of like tools

[7:28] and tool use tool search

[7:31] um has the ability to inclusive

[7:33] inclusive of that like write and run

[7:34] code. Um it feels like the map of the

[7:38] boxes now is like it's going to be the

[7:40] same in 10 years. I can't imagine a

[7:41] world in which like those boxes change

[7:43] dramatically or go away,

[7:45] >> right?

[7:46] >> Like as long as we're dealing with

[7:47] quadratic like transformer attention,

[7:50] you're always going to benefit from

[7:52] doing the deterministic engineering that

[7:55] allows you to keep the context window as

[7:57] small as possible

[7:58] >> for a given task.

[7:59] >> Yeah.

[8:01] >> Um there was more to your question.

[8:02] >> Let me ask a different way. Um, I've had

[8:05] this thought or thesis that like

[8:09] there's more than

[8:11] one class of inference workload. And

[8:14] what I mean by that is like people

[8:16] clearly understand like the beefy model,

[8:18] the beefy reasoner model. Yeah.

[8:20] >> Slow, hopefully methodical, very high

[8:23] reasoning power. Um, I think oftentimes

[8:26] if I'm just using, you know, TouchBT or

[8:28] Claude or Gemini or any of the models, I

[8:31] will often reach first for the high

[8:33] thinking model just because

[8:35] >> you want to see if I AI can do it.

[8:36] >> Yeah. It's kind of like see if I can do

[8:38] it. And it's almost like a script, you

[8:39] know? I don't not trying to optimize it.

[8:40] I'm running it one time. And so like,

[8:42] well, if I have to wait an extra 20%

[8:44] longer or even like, you know, 400%

[8:46] longer, I don't really care because it's

[8:47] kind of just like a one-off task. um

[8:49] versus if I'm doing something in a loop

[8:51] and as a core part of my job like

[8:53] programming for example then like I

[8:54] obviously care much more about like it's

[8:56] like speed

[8:58] a thousand times in a day. Exactly. And

[9:01] so like I guess like you know are do you

[9:04] think of different like agents and sub

[9:05] agents as like demanding or deserving in

[9:08] some sense their own inference workload

[9:09] or to ask us another question another

[9:11] way like you know do you think that like

[9:13] there will be like dedicated models for

[9:14] search that will be uh that will you

[9:17] know be a will have staying power um do

[9:20] you think there be you do you think that

[9:22] context compaction is like an

[9:23] interesting candidate for like dedicated

[9:25] model inference as well like yeah how do

[9:27] you kind of think about the map of like

[9:28] agents and sub agents and like where it

[9:30] makes sense for like there to be like

[9:31] other models that are different than the

[9:32] high reasoning models.

[9:33] >> I see. And this is in the context of the

[9:35] like what about the people who just say

[9:36] use one model for everything. It's good

[9:38] enough. And like yeah, you spend you

[9:39] waste more time minmaxing across all of

[9:43] them and developing intuition for all of

[9:45] them than if you like I tell this to a

[9:46] lot of people. was like, "Well, I use

[9:48] cloud code for this and I use codeex for

[9:49] this and sometimes I use cursor and then

[9:51] sometimes I'll shell out to deep

[9:52] research and it's like,

[9:53] >> yeah,

[9:54] >> you're only going to get to like 80% of

[9:57] the possible like the level of intuition

[10:00] that you could have with if you're

[10:01] constantly switching." Whereas like if

[10:03] you sit and talk to one model all day

[10:05] for like 2 months,

[10:06] >> you will develop a level of intuition

[10:08] that's actually that like that's where I

[10:10] think the people who are the best

[10:12] especially in the programming like using

[10:14] like what do we call it agentic

[10:15] engineering because I'm not saying vibe

[10:16] coding anymore. [laughter]

[10:18] Uh but like yeah the agenda engineering

[10:21] world the people who are really good at

[10:22] this like have a really good intuition

[10:24] of the models and their context windows

[10:26] and like whe when to yell at them versus

[10:28] when to be supportive and all these like

[10:30] things that like are kind of feel a

[10:32] little bit like superstitious.

[10:33] >> Yeah.

[10:34] >> Uh but these people get results that I

[10:37] haven't seen anyone else be able to get.

[10:38] And so my advice is always like

[10:40] >> you will get better results if you pick

[10:41] one model, one tool and work with it a

[10:44] lot uh for a month or two

[10:46] >> and versus the like incremental gains

[10:50] you might get by like I mean unless you

[10:52] have like a huge eval set that's really

[10:54] really baked which most almost none of

[10:56] us do.

[10:57] >> Yeah.

[10:57] >> The incremental gains of like oh let me

[10:59] try the new DeepS okay let me try the

[11:00] new Opus and using a different model for

[11:02] three weeks every time.

[11:03] >> Yeah.

[11:06] I I think there's more upside in just

[11:09] getting to know one model or one family

[11:11] of models really really well.

[11:12] >> That's interesting. Like I guess that

[11:13] implies that like the models are not at

[11:14] least at this point like highly

[11:17] swappable. Um you know you as a as a

[11:20] carpenter, if you will a master

[11:22] carpenter, right? Like anybody can pick

[11:24] up a saw and go saw some wood. Like you

[11:26] as a master carpenter really learn the

[11:30] characteristics of this saw for like

[11:32] this grain of wood.

[11:35] like your 10,000 hours and like you know

[11:37] maybe swapping saws out or swapping

[11:39] grains of wood or types of wood you do

[11:41] lose something

[11:43] when CLI came out and uh especially the

[11:45] codeex model I think I think I saw Swick

[11:47] posting about this one too is like oh if

[11:49] you yell at codecs the way you're used

[11:51] to yelling at claude you completely

[11:53] de-une the model and you actually like

[11:54] screw up the performance a lot like all

[11:56] the all caps and like important and you

[11:59] must always is like

[12:00] >> is helpful and gets like good results

[12:02] from opus and things like this but um

[12:05] and opus actually getting much better at

[12:07] instruction following uh as well but

[12:09] yeah uh you go use the same prompts with

[12:12] a different model like we we've taken

[12:13] our prompts that are optimized for

[12:14] claude and opus and I've always said

[12:16] like oh our prompts are optimized for

[12:17] opus and like we basically only use

[12:19] sonnet for like searching and finding

[12:20] things versus like actually

[12:22] understanding how stuff works and like

[12:23] generating like summaries and documents

[12:27] and uh I think when I say that it's

[12:30] really like okay cool like I know that

[12:32] if I I have a sixstep workflow. I can

[12:35] rely on Opus to actually go through all

[12:37] those steps. And if I give that to

[12:38] Sonnet, it's going to get halfway

[12:39] through step three and it's going to

[12:40] forget that there was a step four, five,

[12:42] and six. I have to like remind it and

[12:44] you can change your workflow around

[12:45] that. But again, it's like cool. I know

[12:47] this works for this world and if I'm

[12:48] constantly trying to switch like I think

[12:49] Opus can do this, I think Sonic can do

[12:51] this. Now I need two sets of prompts and

[12:52] every time the models change, I need to

[12:54] update both of them. And it's like a

[12:55] whole thing. H

[12:57] uh we were texting last week about the

[13:01] idea of like using AI more deeply and

[13:03] kind of just our like day-to-day work

[13:05] and productivity and specifically you're

[13:07] talking about like managing to-do lists.

[13:09] Uh like what is your current like

[13:11] personal to-do list setup and like do

[13:13] you use cloud code or like yeah if it's

[13:16] if it's just a piece of paper and and

[13:17] not AI related that's also okay but I

[13:19] was curious to sort of hear how you're

[13:20] thinking about how you're using AI and

[13:22] kind of your to-do list management. I

[13:24] mean, everything's super chaotic right

[13:25] now, of course. Um, I think since

[13:30] bringing on a co-founder a couple months

[13:31] ago, it has definitely changed because

[13:33] we need to be like when it's just you

[13:36] kind of steering the ship and every

[13:38] like, you know, people on the team, you

[13:39] need to keep on the same page, but it's

[13:40] like it was enough for me just have a

[13:42] pile of markdown files that I

[13:43] occasionally like sync to GitHub and

[13:45] think that was my system. And I used uh

[13:48] I had I think I do you know the getting

[13:50] things done the like Robert Allen GTD?

[13:52] >> Yeah, GTD. So I was like, "Okay, cool."

[13:54] Like deep research. Go make me a long

[13:55] summary of the GTD method and then drop

[13:58] that in a markdown file for Claude and

[14:00] just like go implement this system and

[14:01] then it like kind of built the whole set

[14:03] of stuff. And I know lots of people have

[14:05] done this.

[14:05] >> No, it was interesting. Yeah.

[14:06] >> Uh it actually ended up being really

[14:08] heavyweight and like when we needed to

[14:09] collaborate more, we consolidated on

[14:10] like more of the like YC inspired like

[14:13] okay, what's the goal for the month?

[14:15] What's the goal for the week? What's the

[14:16] goal for today? Check in at the

[14:18] beginning of every day and at the end of

[14:19] every day like who did their thing?

[14:21] What's behind? what do we need to do?

[14:22] And like constantly reorienting around

[14:25] like what's the most important thing

[14:28] >> and that just happens to work better in

[14:30] a Google doc than in a markdown file.

[14:32] >> But there's no AI in that Google doc.

[14:33] It's just you guys as humans typing.

[14:35] >> It's just us as humans typing.

[14:36] >> Do you think it should be like AIS like

[14:38] with you typing or would

[14:39] >> I love that? Well, so this is also like

[14:40] a thing that we're um hoping to this is

[14:43] like not not not out yet and probably

[14:46] not before the end of the year, but like

[14:49] collaborative markdown editing like

[14:52] >> isn't like there's just like I haven't

[14:54] seen a good tool like VS Code Live Share

[14:56] is pretty good.

[14:59] uh but it's missing all the AI stuff and

[15:01] like a collaborative workspace where two

[15:03] people can have multiple cursors on a

[15:05] document and also have multiple cursors

[15:07] like in a prompt box and like back and

[15:09] forth with AI in a way that both people

[15:11] can see it and collaborate on this

[15:12] stuff. I think that's

[15:14] >> a really interesting like y people talk

[15:16] about like oh chat is a is is a bad UX

[15:19] for AI. we barely scratched the surface

[15:20] and also the web is like the preAI UX

[15:23] what's the new UX and I think it's like

[15:25] the way that humans interact with AI and

[15:28] each other and can maintain visibility

[15:30] about what's going on is going to be a

[15:32] really important and like very techn

[15:35] like the [clears throat] linear's entire

[15:37] company based on like hey we built Jira

[15:39] but with a sync engine and obviously

[15:40] they're way more than that right they've

[15:41] done a lot in terms of design and things

[15:43] like but at the core of it it's like

[15:44] >> it's a snappier better UI it's better

[15:46] for collaboration it feels real time

[15:48] yeah and that's the That's the biggest

[15:50] unlock for me.

[15:50] >> Yeah. Yeah. Yeah. I think earlier this

[15:52] year I like we'll just we'll be okay

[15:54] referencing your own tweets. Sure.

[15:56] >> Or zits in this room. It's a safe place

[15:58] to do that. Um I tweeted something which

[16:00] is like you know most operating systems

[16:01] are built for single mode not for

[16:02] multiplayer. And like for AI they need

[16:04] to be like multiplayer. Um and what I

[16:05] meant by that is like people quickly on

[16:06] Twitter were like no you're wrong. There

[16:08] are demons. What are you talking about?

[16:09] And like okay fine but [laughter] like

[16:10] you know you're not using my computer at

[16:11] the same time I'm using my computer. And

[16:14] this question of like file uh like diffs

[16:17] and merging comes into play again like

[16:19] if we both have the same markdown file

[16:21] we both change the same line you know do

[16:23] all markdown files need to be now like

[16:25] cdt native in a way that like the agents

[16:27] and the humans can all be editing at the

[16:28] same time like

[16:30] >> yeah like you have thoughts you have to

[16:32] give away anything you have secret

[16:33] thoughts about this okay okay figure

[16:36] that

[16:36] >> I mean they won't have to be but I think

[16:38] you unlock a lot if you can solve that

[16:40] >> what okay that makes me think a lot

[16:42] about like AIUX it feels Like in some

[16:43] ways AIUX is incredibly primitive still

[16:46] and it goes like kind of both in some

[16:48] ways. Well, there's two sides of this.

[16:49] One is like AIUX is like actually really

[16:52] great and like chat is way better than

[16:54] people thought it was and you know it's

[16:55] sort of wrong to like dunk on chat and

[16:57] like make fun of chat because actually

[16:58] like chat andor kind of like the you

[17:01] know uh cloud code style chat is

[17:04] actually very powerful and you can do so

[17:05] much with it and so like maybe it's

[17:06] wrong to dunk on that. In the same way

[17:08] it feels like we are in the caveman days

[17:10] of like again collaborating with agents

[17:11] and other humans all in a shared

[17:13] workspace. And so like do you have

[17:14] thoughts around like I mean one

[17:16] potential pattern which has emerged is

[17:18] this like inbox pattern where like the

[17:20] agent is like kind of teeing up

[17:21] decisions for you a human to make and

[17:22] presumably it needs to give you all the

[17:23] context at the same time context

[17:25] engineering for humans if you will so

[17:26] that you a human can make a good

[17:27] decision. But I guess like tell me more

[17:28] about like AIUX like what are you using?

[17:30] What do you want to exist? Like what do

[17:32] you think is going to exist to run AIUX

[17:33] that doesn't exist yet? Well, so the

[17:34] chat thing and the inbox thing is really

[17:36] interesting because I spent nine plus

[17:38] months obsessing with this problem and

[17:40] like like I really when we were working

[17:41] on the kind of core human layer, which

[17:43] we're kind of like sunsetting now, is

[17:44] like that was a really powerful like I

[17:50] thought that that was the most important

[17:51] thing that was going to happen in AI. It

[17:52] was like people people dunk on chat and

[17:54] I actually like didn't like chat either

[17:55] because it was like who wants to have

[17:57] seven browser tabs open for every single

[17:59] different agent that they have purchased

[18:01] and they have access to, right? It's

[18:03] like I want to talk. The whole point of

[18:04] chat is like, oh, you interact with this

[18:06] the same way you interact with other

[18:07] people. Like you text your friends, you

[18:10] type to the agent. Same experience. It

[18:12] works. The issue was that like you

[18:15] couldn't actually, they weren't in

[18:17] Slack, they weren't in your email inbox.

[18:18] Like the workflow that I came that like

[18:21] I thought was my favorite was like I had

[18:23] a bunch of emails and I've built

[18:24] something where it's like you can just

[18:26] forward this email to an agent

[18:27] >> and it will like has a bunch of tools,

[18:29] but the tools are wired with like an

[18:31] email-based human in the loop. So you

[18:32] get you delegate a bunch of stuff out.

[18:34] Next time you come to your inbox, you

[18:35] have some inbound. It's like cool.

[18:36] Here's the like tool call I'm going to

[18:38] make like your permission. It was a lot

[18:40] of like we were using linear as our CRM

[18:41] at the time. Okay.

[18:42] >> Uh so I was like every time every

[18:44] inbound email I just forward and like

[18:45] add this to the CRM and it would either

[18:47] make a new contact or add a comment to

[18:48] existing contact and all this. And so it

[18:51] like come back like here's the comment

[18:52] I'm going to add and then I could reply

[18:53] it be like no do it this way or whatever

[18:54] it is. And and eventually when it was

[18:56] good it would go actually update the

[18:57] CRM. And that's what I do. I don't use

[19:02] that agent much anymore because we've

[19:03] moved our CRM into Markdown and Air

[19:06] Table and it's like managed by Claude

[19:08] and it's a whole it's it's not it's not

[19:10] ready yet. It's not done yet. [laughter]

[19:12] >> I have so many questions about that. But

[19:14] maybe Yeah, keep going. Keep going.

[19:15] >> Yeah, we can go. Uh but that was the uh

[19:20] that was my favorite AI UX ever is like

[19:23] talk to AI the way you talk to your

[19:25] human co-workers. And I think the same

[19:28] thing is like some of the best

[19:29] collaboration experiences I've had are

[19:32] like collaborative whiteboarding like

[19:34] everybody writing in a Google doc. Um

[19:38] physical whiteboarding is going to hard

[19:39] be hard for AI but maybe eventually.

[19:41] Yeah. Like I worked I worked for like

[19:42] seven years at a company called

[19:44] replicated.com. They did like like

[19:46] Kubernetes infrastructure for like

[19:47] deploying your SAS into like enterprise

[19:49] environments

[19:51] and hired a bunch of like ex GitLab

[19:54] people which I don't know if you know

[19:55] GitLab has like one of the most intense

[19:57] remote cultures like

[19:58] >> there's a whole like GitLab unleashed

[19:59] YouTube channel where you can just like

[20:00] watch all their meetings and it's like

[20:02] what who are all these people? This is

[20:03] absolutely insane.

[20:04] >> Yeah, like the the the being like fully

[20:07] open and transparent was like one

[20:08] dimension of it but it was like there's

[20:10] things it was like

[20:11] >> okay every meeting needs to have an

[20:13] agenda. If it doesn't have an agenda, it

[20:14] gets automatically deleted. Uh and like

[20:17] every meeting needs to be recorded and

[20:19] if you are in a meeting and you're not

[20:20] participating, like you will be incur

[20:23] actively encouraged to leave.

[20:24] [clears throat]

[20:25] >> Um because your goal is like if you just

[20:27] want to be in a meeting to feel

[20:28] included, just watch the recording. And

[20:30] meetings are only for decision-making.

[20:31] They're not for getting on in sync. And

[20:33] there's all this stuff like never answer

[20:34] someone's question. Someone asks a

[20:36] question, never answer it. You have to

[20:37] respond with an answer like a link to

[20:39] the handbook page. And if the handbook

[20:41] page doesn't exist, you have to write it

[20:42] and then send the link. And if the

[20:43] handbook page exists and then it but

[20:45] it's wrong. Like this forces people to

[20:47] constantly go and review the

[20:48] documentation. Yeah. Is like if it's the

[20:50] only source of truth if like Slack is

[20:52] not a knowledge. Anyway, there's all

[20:53] these like very strong rules and like

[20:55] everything's in a Google doc and

[20:57] everyone's like collaboratively taking

[20:58] notes in every single meeting. I'm like

[20:59] this works really well. How is this

[21:01] going to work with AI? Well, I think

[21:03] it's a lot better with AI, number one,

[21:05] because you don't have to have humans be

[21:07] quite so much like robots. And that's

[21:10] kind of my critique of,

[21:11] >> you know, the proof is in the pudding,

[21:12] right? Like obviously, yes, GitLab

[21:14] continues to be successful as a company

[21:15] as far as companies go, but like there's

[21:17] a lot of stuff they've like missed and

[21:18] missed pretty significantly. And like

[21:20] you have to wonder like you know is the

[21:22] over is the is is making

[21:26] product engineering a lot like a factory

[21:29] and it's like specification process

[21:31] actually like removing some of the more

[21:33] like when are the water cooler

[21:35] conversations happening about like what

[21:36] if we did this you know like where is a

[21:38] safe place to like bring up like a crazy

[21:39] idea and like let it be a crazy idea for

[21:41] a while if every meeting has to have a

[21:44] agenda and a decision and you know like

[21:46] only people who are supposed to be there

[21:48] are supposed to be there right? Like are

[21:49] you actually like clamping down on a lot

[21:51] of the potential like creativity and

[21:52] upside um of like what could be

[21:55] >> Yeah. And this was the thing I Yeah.

[21:56] This is also part of why like we did

[21:58] human layer like super all in on in

[22:00] person. It's just like

[22:03] >> I don't want it to be a chore to hang

[22:06] out with my teammates and getting on a

[22:08] Zoom meeting is a chore. Yeah.

[22:09] >> I don't care if you're sitting around

[22:11] having a beer. Like it's it's it's it's

[22:14] a thing I don't look forward to doing. I

[22:16] mean occasionally like during co like

[22:18] Yes. cuz you're locked inside and you

[22:19] don't see anybody [laughter] ever. But

[22:21] it's like there's so much more that

[22:23] happens in between the lines that you

[22:24] have to like counteract with all this

[22:26] overhead and rules versus like okay if

[22:28] we can all just be in the same room then

[22:31] >> I don't know. Vib put this really really

[22:33] well which was like uh I think he put

[22:36] this in the yeah in their like job

[22:37] posting was like you're going to be in

[22:39] person because work should be fun and in

[22:42] person is just more fun. Like it's not

[22:44] fun to get on a Zoom with somebody most

[22:46] of the time.

[22:47] >> Yep. I mean none of these things are

[22:48] like black and white true but it's just

[22:49] like

[22:50] >> the the the spectrum is shifted

[22:53] significantly.

[22:54] >> Yeah. Are there other I mean going back

[22:56] to AIUX kind of patterns right there

[22:57] sort of chat there's like this inbox

[23:00] pattern potentially. Are there other

[23:01] patterns that you think are like useful

[23:03] or important or will be important?

[23:05] >> I mean I think tab complete is really

[23:07] dope. I think tab complete is like the

[23:08] thing the thing the cursor figured out

[23:10] how to do really well is is super

[23:12] impressive.

[23:13] >> Where do you want tab complete to work

[23:14] that it doesn't work right now?

[23:16] uh for like non-ext things.

[23:19] >> Non-ext things. Say more.

[23:20] >> I mean, this was kind of like one of the

[23:22] I think I was talking to Benny at

[23:24] Anthropic and I was explaining like what

[23:26] human layer was back in like last like a

[23:28] year ago and it was like, "Okay, cool.

[23:29] Yeah, you have this agent out in the

[23:30] world." And then, you know, when things

[23:33] are happening that need AI action, you

[23:35] get a Slack message or an email that's

[23:36] like, "Hey, we're going to do this

[23:37] thing." And you're like, "Yep, looks

[23:39] good. Yep, looks good. And it was like

[23:40] it was like tab autocomplete for generic

[23:43] tool calls based on you have something

[23:44] running in the background and it's like

[23:46] regularly like querying the state of the

[23:48] world and deciding if there's some

[23:49] action that needs to be taken

[23:51] >> and then autocompleting that action

[23:53] where it's like hey I'm going to send

[23:55] this email to this person or hey I'm

[23:57] going to update this record with this

[23:58] data or whatever it is and you just be

[24:00] like yep yep yep no do it this way and

[24:02] then like kind of going through there.

[24:04] It makes me think of this term which I

[24:05] think is kind of curse because there's

[24:08] already too many terms we should not

[24:09] invent more terms but I will briefly say

[24:10] it is because

[24:11] >> oh let's do it. you've already heard the

[24:13] term which is like organizations kind of

[24:14] having this like shared context layer

[24:17] >> um which is like exactly what it sounds

[24:19] like you know the way same way a human

[24:21] has a mental map of like okay we do this

[24:23] in notion we do this in GitHub we do

[24:25] this over here this is how all these

[24:26] tools like intersect and interact like

[24:28] presumably if you want an agent to be

[24:30] another colleague sitting alongside you

[24:32] and doing useful labor and work it has

[24:33] to have a similar mental map of like how

[24:35] to get work done and where to go look

[24:37] for certain information and how to

[24:38] connect it all together

[24:39] >> is that a prompt and tools is that uh

[24:42] specialized like automatic query system.

[24:44] >> Yeah, it's probably it's probably prompt

[24:46] and tools some agentic search thrown in

[24:48] for for fun. Um, so I'm not saying it's

[24:49] like a new set of of of components per

[24:52] se, but I guess my question is like

[24:55] do you have talking to a few friends

[24:57] with this idea of almost like an AI

[24:58] native organization and like it should

[25:00] run differently than like organizations

[25:02] have for the last like hundred years um

[25:04] because the level of access to

[25:06] information is like so much faster and

[25:08] like I guess yeah what do you what do

[25:10] you think about that?

[25:11] >> Yeah, I mean it it gives a little bit

[25:14] like 15 competing standards, right? or

[25:16] 14. What was it? Is like there's 14 and

[25:18] then someone's like there's too many we

[25:19] need to consolidate into one thing and

[25:21] now you got another tool. [laughter]

[25:23] Uh if you win it it's if you win it it's

[25:25] great. Um yeah, I mean as far as AI

[25:28] native or like uh

[25:31] trying to build the systems like kind of

[25:34] on the side in passive like hacking on

[25:36] stuff that allow us to basically just

[25:38] use a pile of like we're doing markdown

[25:40] with front matter for a while because

[25:41] front matter is nice because you can do

[25:43] a lot of like slicing and filtering

[25:44] deterministically without the model

[25:46] having to actually go read the whole

[25:47] file.

[25:47] >> Interesting.

[25:48] >> Um or use like the search tools. There's

[25:50] like a little tiny layer on top of the

[25:52] file system.

[25:53] >> Yeah, that's cool. Um and then we have

[25:55] some stuff in air tableable as well

[25:56] which we're experimenting with and like

[25:58] syncing between the two because what's

[26:00] the air tableable use case you mentioned

[26:01] this like CRM thing right like markdown

[26:03] is the source of truth like what is air

[26:04] table like an ephemeral view for humans

[26:06] or

[26:06] >> so we have uh I have a markdown system

[26:10] and then like we needed to like scale it

[26:12] to beyond me and like basically adding a

[26:14] cloud command to sync it basically was

[26:16] like okay like commit pull the latest

[26:18] resolve the conflicts push it back up

[26:20] and just like kind of have a post

[26:22] session hooked to just always like

[26:24] prompt it to do that basically.

[26:27] >> Um that kind of worked but also

[26:29] >> air table a view to the data or was it

[26:31] also a

[26:32] >> it's a view to the data but it's and

[26:34] then so yeah so we had the git sync and

[26:36] then we also have the air table sync and

[26:37] it's like a birectional sync that is

[26:39] basically taking mostly stuff from the

[26:41] front matter like the actual like

[26:42] structured data about a record and then

[26:44] taking the body of it and just putting

[26:46] it in like a notes field basically.

[26:48] >> Um but it had like task management and

[26:50] stuff. It's very early. Like I don't

[26:51] know exactly how we're going to use it.

[26:53] We're not using it all day. Um but it

[26:55] allows me to work uh by mostly just

[26:57] talking to Claude. And I can just be

[26:58] like,

[26:59] >> "Hey, uh here's my here's my like I just

[27:02] had a call with this person. Here's

[27:03] their email. Like go use the CRM writer

[27:06] agent, which is like a sub agent that is

[27:07] like prompted to like, hey, if you're

[27:09] going to create a a person or a company

[27:11] and like link them together, whether

[27:12] you're creating a person or you're

[27:13] creating a company, always go search the

[27:15] web." And it's like basically like a a

[27:17] poor man's uh like data enrichment

[27:19] system. is like you can find most of

[27:21] this on the web and like Claude can just

[27:22] do it. I was like yeah I could go do

[27:24] like clay and zoom info and like learn

[27:26] all this stuff but again I was just like

[27:28] >> if we can just do it with cloud and

[27:29] markdown then that works great and like

[27:31] that makes everything a lot simpler and

[27:33] I'd rather have the like 80% or 90% and

[27:37] just all one tool versus like

[27:39] specialized tools for every single part

[27:41] of the GTM stack.

[27:42] >> It makes me So I've been hacking on a

[27:45] couple things on my own. One of them is

[27:47] like kind of to-do list management. Um,

[27:50] and something about like it just being

[27:53] text as like kind of the actual storage

[27:55] layer markdown maybe markdown with

[27:57] matter as you said like it's incredibly

[27:58] satisfying and I think that you do need

[28:00] like probably the CRDT story getting

[28:02] like multiple people to like write the

[28:04] file at the same time.

[28:05] >> Um, but it's so flexible like there's no

[28:07] database migrations like you're not like

[28:09] migrating your Postgress database to add

[28:10] a new field. You just like add a thing

[28:12] to your front matter and it works. It's

[28:14] a little NoSQL, but like and you can

[28:16] also do you can do linting and stuff

[28:17] like you can enforce schema in the front

[28:19] matter. You can just you know pre-commit

[28:20] hook

[28:20] >> to reference another tweet I said like

[28:22] last week that no SQL is more AI

[28:23] friendly than SQL is. Um actually

[28:26] strongly believe that.

[28:27] >> Yeah because AI data doesn't care about

[28:29] the schema. It's going to read the thing

[28:30] and see all the stuff and

[28:31] >> schemes are for humans not for AI.

[28:33] >> Yeah.

[28:33] >> Or or or or rigid schemas are at least.

[28:36] Yeah.

[28:36] >> So this is interesting. So I saw a tweet

[28:38] recently that was like someone was

[28:39] talking about uh do you remember the

[28:40] tune thing?

[28:42] >> Oh yeah.

[28:42] >> Yeah. I was like actually fundamentally

[28:44] I agree with the direction of this in

[28:46] practice but the tweet about it was so

[28:48] over it was so clearly like part of the

[28:51] AI hype slop machine that I was just

[28:54] like okay cool like saying a saying a

[28:56] correct or like somewhat correct thing

[28:58] in like a overhyped way like turns it

[29:01] into slob.

[29:02] >> Uh but one of the things is like JSON

[29:04] was for humans and tune is for language

[29:07] models. I'm like okay JSON first of all

[29:09] JSON is not for humans. JSON is for

[29:12] programs and I think front matter is for

[29:14] like schemas are for programs. It makes

[29:16] your code safer or whatever it is. Yeah.

[29:18] >> I don't think human I mean

[29:19] >> I don't know it all comes from

[29:21] spreadsheets right.

[29:22] >> Yeah. But okay going back to so you have

[29:24] like the front matter which could be

[29:25] like your sorry the markdown which is

[29:27] like your source of truth of your your

[29:28] CRM.

[29:28] >> Yeah.

[29:29] >> And this is like a schema the agent

[29:30] itself can evolve right like the agent

[29:31] itself decide oh I need a new field

[29:33] great I add it. Maybe I'll back fill

[29:34] maybe I won't backfill. It can just sort

[29:36] of decide how to evolve that schema.

[29:37] It's very flexible. Um, and then you

[29:40] need the tools to be able to interact

[29:41] with that schema. Um, and the rules,

[29:44] right? And so there's sort of

[29:45] conceptually some level of like rules

[29:47] engine that like the AI kind of can

[29:48] develop its own rules about how to

[29:50] process, you know, certain CRM

[29:51] information. Then you also as a human

[29:52] might give the a agent uh sort of teach

[29:55] it over time, right? Like you know if X

[29:57] and Y if you know A then B, you kind of

[29:59] give it more and more and more rules

[30:00] that it should

[30:01] >> and it can refine. It's very easily to

[30:03] just be like, "Hey, we got too many

[30:04] tags. Like, go refine the tags to less

[30:06] than 20 tag categories." Yes. And then

[30:07] go and then it's like, "Cool. Here's

[30:09] what we're going to do. We're gonna do

[30:10] these the work back and forth." And it's

[30:11] like, "All right, cool. Let me go launch

[30:12] 10 sub agents to go update all those."

[30:14] >> But then you need the views as well. So

[30:17] right now it sounds like you're using

[30:18] air table as this like complicated

[30:19] syncing view thing, but like why

[30:20] shouldn't there just like why doesn't

[30:22] the agent itself just write

[30:23] >> some basic React app to like load that

[30:26] markdown into that local React app

[30:29] >> and then flush it whenever you save it

[30:31] or you know even in real time be like

[30:32] flushing it basically like why do you

[30:33] need a separate tool? I guess

[30:34] >> I just use an editor like I'll be I have

[30:37] uh I have a hook set up that basically

[30:40] uh every week it goes and looks at

[30:42] everything on my calendar. I just like

[30:43] run it as part of my like Friday review

[30:44] process. is like go look at all my

[30:46] meetings.

[30:47] >> Uh check who's not already in the CRM.

[30:50] If it's external and they're not in the

[30:51] CRM and it looks like, you know, think

[30:52] about does it look like a sales meeting

[30:54] or whatever it is.

[30:55] >> Pull them in. Um and we have the same

[30:57] thing like same thing for investors, for

[30:59] customers, for like random users. We

[31:01] have like a folder of like just like

[31:02] they don't get an account, but they just

[31:03] have like a CRM contact and it's just

[31:05] like

[31:06] >> cool, go create a record for them. And

[31:07] then when I'm on a call with somebody, I

[31:09] open up my editor and I can pretty

[31:10] consistently just be like okay cool

[31:11] here's who this person is. And it's so

[31:13] much faster than clicking around a web

[31:14] UI. Like it's just the the data is

[31:17] already there. It's

[31:18] >> So you're using an IDE for this as your

[31:19] main interface.

[31:20] >> Yes.

[31:20] >> But why does why does Air Table exist as

[31:22] a separate interface with the same data

[31:23] >> for other people on the We have like a

[31:25] head of operations that does a lot of

[31:27] like automations and like non technical

[31:29] people

[31:29] >> sends ex less technical people like he's

[31:31] semi. Yeah, exactly. He's he's dangerous

[31:33] enough to run cloud code and ask

[31:34] questions and like he wrote a skill the

[31:36] other day like this is not like non

[31:38] tech. It's just like people who prefer

[31:39] to work in something like Air Table,

[31:40] >> but presumably you could like build the

[31:42] agent could build an Air Table clone.

[31:45] >> Yeah.

[31:45] >> And then you avoid the syncing problem

[31:47] because like it's just some sort of like

[31:50] local sync story happening versus like

[31:51] another there's not another like durable

[31:53] store of the same data,

[31:55] >> right?

[31:55] >> It's just like this like HTML page

[31:57] almost that like knows how to load in a

[31:58] certain dur on your desktop.

[32:00] >> But you still have to get pull like we

[32:01] store we store it all. It's like

[32:02] everyone's just pushing and pulling

[32:03] straight to master for that repo because

[32:05] it's like plain text documents. So it's

[32:07] like even even without an air table like

[32:10] separate sync system there's still like

[32:13] the repo or

[32:14] >> do you like get for this or do you feel

[32:15] like it's overly burdensome for this use

[32:17] case?

[32:17] >> I basically just use it as like S3 or

[32:19] like a like generic document store right

[32:22] like I mean being able to merge

[32:23] conflicts is great but again the CRDT

[32:25] thing is the actual answer. You don't

[32:26] want to

[32:27] >> you would have no merge conflicts if you

[32:28] had CRDTs in theory or the CRTs would

[32:30] handle the merge conflicts but git would

[32:32] not do the merge conflicts

[32:33] >> it and it would happen in an atomic

[32:34] level and you would see it as it was

[32:35] happening like it would only happen as

[32:36] you were editing and you would see it as

[32:38] it was happening

[32:38] >> I guess in you have like the logs some

[32:40] of like replay-ability for this repo but

[32:43] like have you ever used that is actually

[32:44] like an important feature of that tool

[32:46] >> um no it's literally just like cool

[32:49] before you start work poll like it's

[32:51] just we just built it in the prompts and

[32:52] like

[32:53] >> it's annoying because it's a little slow

[32:55] right you're doing it on every call

[32:57] you're doing the same poll you're doing.

[32:58] But like the thing the reason why we use

[32:59] cloud to do it instead of just writing a

[33:00] script is like because when there's

[33:02] merge conflicts we have instructions in

[33:03] the prompts of like here's how to here's

[33:05] how to resolve merge conflicts and like

[33:06] if it's really simple just do it for

[33:08] these sorts of files just keep both

[33:10] always because it's like a journal. It's

[33:11] like a log of all the activity. It's

[33:12] like if it's going to get lots of

[33:13] conflicts but it's just like just make

[33:15] sure that you keep the format correct.

[33:16] >> Yeah.

[33:17] >> Versus like some things is like okay

[33:19] this person put this update and this

[33:20] person put this. It's almost always just

[33:22] like additive merge. There's very rarely

[33:24] like

[33:25] >> for markdown files this have to like

[33:28] actually merge logic like you get with

[33:29] code.

[33:30] >> Yes. Exactly. Exactly.

[33:32] >> Yeah. I think a lot of people are

[33:33] reaching for git and I kind of like a

[33:36] suspicion that like that's not going to

[33:38] be a durable component. Clearly a shared

[33:41] data store is incredibly important.

[33:42] >> Yeah. Maybe some version of some level

[33:44] of versioning is also very important but

[33:45] like all the heaviness of git for

[33:47] something that's not code.

[33:48] >> Okay. So what do you need then? So you

[33:50] need you need like local local local

[33:53] first speed, right?

[33:54] >> Yep.

[33:55] >> You need like a UI that's accessible to

[33:58] less technical people at least for

[34:00] reading probably for writing.

[34:02] >> Yeah.

[34:03] >> Yeah. And then you need like a very very

[34:07] like

[34:08] I don't know high efficiency but well

[34:11] you know context respectful interface

[34:15] for an agent to use and ideally like if

[34:17] you use the file system then cloud code

[34:19] can just go um

[34:22] yeah I mean you if you take uh

[34:27] if you take uh your uh MBC architecture

[34:31] classic you Ruby on Rails, Django,

[34:35] right? Model view controllers, like what

[34:37] is that?

[34:38] >> Uh the model is the schema of the data.

[34:41] It's the data itself.

[34:42] >> But I don't want to have to think about

[34:43] the schema.

[34:44] >> I'm not saying you should think about

[34:45] the schema. I'm just like teing up like

[34:46] another analogy I think like relates

[34:48] here. So like one is like there's the

[34:49] data. The second one is there's the

[34:51] views. How do you view that data? And

[34:53] then the third one is the the logic,

[34:56] right? Like the controllers are

[34:57] ultimately like your business logic. um

[35:00] or you know take any application what is

[35:03] it and you sort of again it's like you

[35:04] know data compute and then some level of

[35:07] like pixels to kind of render back to

[35:09] like the user you know the different

[35:11] things that they should be able to do.

[35:13] Um so I kind of wonder I'm imagining

[35:15] this like

[35:15] >> what is the

[35:17] analog in the AI world? I mean, I think

[35:20] >> could it be like markdown plus some sort

[35:22] of like rules, you know, AI rules

[35:23] engine. Where's the AI native version of

[35:25] this? I guess

[35:25] >> I think the business logic goes in your

[35:27] prompts, right? We have a lot of slash

[35:28] commands and sub agents that is just

[35:30] like like this thing that does the

[35:31] calendar. That's slash command. It just

[35:33] runs like once a week in GitHub actions

[35:34] and it just like goes and pulls the

[35:36] things and then like pushes updates to

[35:38] the markdown, commits and pushes it.

[35:39] Yep.

[35:39] >> Right.

[35:40] >> Y

[35:40] >> um so markdown is is is part of it. Um,

[35:43] I think you need some kind of like

[35:45] orchestration scheduling because you

[35:47] don't want to open this up and like tell

[35:49] it every time you want to do this.

[35:50] That's kind of outside the AI. I think

[35:52] you need like tooling. You need ways to

[35:55] like the the the tricky part of this is

[35:57] like, okay, how do I like figure out the

[35:59] Google Oath stuff, get the scopes right,

[36:01] actually off in, and it's like I'm not

[36:02] going to build a web app that has full

[36:04] like OOTH like cycle because it's just

[36:06] me using it and I'm just using CLI

[36:08] scripts. And so I was like, okay, like

[36:10] you need like a barebones like like O

[36:14] management layer and you need a way like

[36:16] you need scripts and you need a way to

[36:17] write scripts and you need a way to

[36:20] >> like control. I mean, I was talking with

[36:23] um Ian from Keycard about like MCP and

[36:26] like O and and like basically everyone

[36:28] just has like API keys littered anywhere

[36:30] everywhere and that's terrifying because

[36:32] even the most fine grained off like

[36:34] something you get from Google or

[36:35] something is really

[36:36] >> not I mean you have calendar readad and

[36:37] you have calendarmanage and those are

[36:39] your options and like I want to be able

[36:41] to do like you can create events as long

[36:43] as they only have these people on the

[36:45] invite and they're you're only allowed

[36:46] to delete events on my calendar if I'm

[36:48] the only like those kind of rules just

[36:50] can't

[36:50] >> exist. very unsolved for like kind of

[36:53] this AI world.

[36:54] >> So, and then I think you need a way to

[36:56] like write and execute code which is

[36:57] like is part of because then you can do

[36:59] new things and you can generate new

[37:00] integrations and

[37:02] >> so it's like secrets management

[37:04] >> code execution and like storing the

[37:06] executed code so you can like use it

[37:08] over and over again and then you need

[37:09] like a data layer like markdown and then

[37:11] you obviously need some kind of agent

[37:13] harness.

[37:13] >> Yep.

[37:14] >> What else?

[37:16] >> Uh views for humans.

[37:19] >> Okay. like actual pixel pixel views. Um,

[37:23] >> which again feels like they could be

[37:25] this

[37:25] >> that's been lowest priority for me

[37:27] because I just look at everything in the

[37:28] editor.

[37:29] >> Well, true. You for your semi-

[37:31] techchnical users, you're talking about

[37:33] like doing things that feel complicated

[37:34] to me which is like an air table like

[37:35] syncing engine for example when like you

[37:37] could just have like a view for those

[37:39] users to the same data.

[37:41] >> Yeah, that's probably a better approach.

[37:43] Um,

[37:46] by the way, the OTH thing can not be

[37:47] that hard. Like,

[37:49] >> over the weekend, I was building a

[37:51] desktop app and I told OBS 4.5 to add

[37:53] OOTH for Google.

[37:55] >> And did it did it do like the local like

[37:57] flow credential server.

[37:59] >> Mhm.

[37:59] >> Yeah.

[38:00] >> Just one shot it.

[38:01] >> Yeah. It's been a year ago that did not

[38:03] work. You could not

[38:04] >> It was like go easy. I was like I

[38:05] thought that I was like insane in my

[38:07] like to-do list. I was like this seems

[38:08] kind of complicated and really hard. I

[38:10] don't know if this is gonna work. And I

[38:11] was like, "Yeah, let's just try."

[38:13] >> Yeah.

[38:13] >> Um, and I was actually incredibly

[38:15] >> It walked you through going and like

[38:16] creating the service account and

[38:17] downloading it. Like, had you ever done

[38:19] that before with like Google Ooth?

[38:21] >> I had done it for Web Apps before, never

[38:22] for a desktop app, but it just did it

[38:24] just did it. One shoted it, which is

[38:25] crazy. And did walk me through like,

[38:26] okay, go to the Google dashboard

[38:28] console, get these, you know, things.

[38:29] So,

[38:29] >> so like that's another thing like models

[38:31] like that's I don't know if that's a

[38:32] good benchmark. Uh, maybe that's one of

[38:34] my new benchmarks is like I was doing

[38:35] this uh a year ago with an agent. Do you

[38:38] know codebuff?

[38:40] It was one of these coding CLI that came

[38:42] out way before cloud code. It was super

[38:44] fast and it was only supported YOLO

[38:46] mode. There was no way to add

[38:47] permissions.

[38:48] >> They had no complex inter like go just

[38:50] make it happen. It was very cool.

[38:51] [laughter]

[38:52] >> Uh but I was back and forth with like I

[38:54] think it was on like a combination of

[38:56] like Gemini Pro 2.0 and like Claude 3.6

[39:00] whatever. And

[39:02] >> it was like 10 or 15 rounds to get it

[39:04] working. And when it finally got the

[39:06] oath and it could like list out my

[39:07] emails from Gmail, I was like literally

[39:09] typed in all cap. I don't ever done this

[39:11] to model like holy, you did it.

[39:13] [laughter]

[39:14] >> Never have, but maybe I should, you

[39:16] know. Yeah.

[39:16] >> Yeah.

[39:17] >> Um you you mentioned a lot about using

[39:19] cloud code for a bunch of stuff.

[39:20] >> Yeah.

[39:21] >> Um are there other agent harnesses that

[39:23] you're using? And if not, why not? Is

[39:25] like cloud code just the best or how do

[39:27] you think about this?

[39:27] >> Every time a new one comes out, I'll try

[39:29] it for like an hour. Um, like when the

[39:31] new cursor agent view, I'm like I'm

[39:33] interested more in like the UX and like

[39:34] the like how do you help humans keep all

[39:37] their work straight when their agents

[39:38] can kind of go off and do things

[39:40] headless and you got to like maintain

[39:41] context and context switch a lot. So

[39:42] like I played with the cursor agent view

[39:45] >> uh didn't get what I but again I was

[39:47] like now when I open any model I like

[39:50] >> talk to it like I would talk to claude

[39:51] code and I was like cool I bet I could

[39:53] spend two weeks talking to this and not

[39:54] 10,000 hours but get my hundred hours

[39:56] and then be able to like

[39:58] >> actually know what it's good at and not

[39:59] but I'd rather just keep focused on

[40:00] getting better and better at cloud code

[40:02] and like refining that. So we play with

[40:03] codecs I've played with anti-gravity

[40:05] like we mess with all these things.

[40:06] Yeah, you clearly have a lot of thoughts

[40:08] and feel for the limitations of either

[40:12] the models or the agent harness that

[40:14] they are given. Um, cloud code is not

[40:18] open source so you can't change it. So

[40:21] even if you find a way that is weak, you

[40:23] have no ability presumably maybe you can

[40:25] yell at [snorts] anthropic devril on

[40:27] Twitter and you know make some progress

[40:29] there. But

[40:29] >> people do that. I try not to do that.

[40:31] [laughter] I I I I

[40:33] >> I have a lot of sympathy for Tariq and

[40:35] the team after I [laughter] ended up I

[40:37] ended up going through like I I I opened

[40:39] an issue on the Antropic repo because I

[40:41] was there was a cloud code like breaking

[40:42] change that came out with 2.0

[40:44] >> and I like filed an issue and then I

[40:46] like pinged the one guy I knew at

[40:47] Antropic at the time. I was like, "Hey,

[40:49] can you help me get this like uh like

[40:50] escalated or whatever it is?"

[40:52] >> Yeah.

[40:53] >> And while I was waiting, I was like

[40:54] reading through the other like there's

[40:56] like 6,000 open issues on the cloud code

[40:58] repo. Thousand opens issues.

[40:59] >> Might be 4,000. I don't remember. It was

[41:00] like very it was in the thousands.

[41:02] >> It's intimidating.

[41:02] >> And I read like five or six of them and

[41:05] I think five out of the six that I read

[41:06] were people just being like this thing

[41:08] did a bad job on a coding test. I gave

[41:10] it this thing sucks. And I'm like man

[41:12] you guys I just think about like how

[41:15] messy the signal is for a company that

[41:18] big with that much adoption and like I

[41:20] don't know how they make sense of it.

[41:21] And I'd like

[41:22] >> hopefully AI but [laughter]

[41:25] >> yeah I would I would hope so.

[41:28] >> But why not? I guess like going back to

[41:29] this like agent harness piece, you know,

[41:32] like

[41:33] >> do you think there will be an open

[41:34] source equivalent to cloud code which is

[41:36] just as good or like open code exist?

[41:38] >> I asked this again on Twitter maybe a

[41:40] week or two ago and resoundingly the

[41:42] comments were open code open code open

[41:43] code open open code.

[41:45] >> Well because yeah because open code is

[41:46] basically built by like you can reverse

[41:48] engineer the cloud code harness. Have

[41:50] you ever hooked up a proxy to cloud code

[41:51] and read all the traffic?

[41:52] >> I know that you have. So yeah,

[41:54] >> you can do this. Uh it's actually like I

[41:55] did it yesterday cuz I'm building like

[41:57] I'm rebuilding a lot of our like

[41:59] >> plan generation workflows to try to be

[42:01] we realize there's a lot of like

[42:04] >> don't let me go on this tangent for too

[42:05] long but like we realize there's a lot

[42:07] of uh in using the like research plan

[42:11] implement workflow which we shared and

[42:12] thousands of people have adopted on

[42:13] GitHub and like have grabbed the prompts

[42:15] and put them in their own projects and

[42:17] are constantly being like these are the

[42:18] best this is state-of-the-art for like

[42:19] using cloud code to like solve hard

[42:21] problems and complex code bases.

[42:23] I realized as we work actually in the

[42:25] trenches with customers where we have

[42:26] like a couple champions and they're

[42:27] trying to roll it out to a team of 10 50

[42:30] 100 engineers um just like as an initial

[42:32] like test of like hey can we consolidate

[42:35] around one workflow for using AI in this

[42:38] company and

[42:42] what we found is like when I use the

[42:45] prompts they're very different from how

[42:46] most people use the prompts and most

[42:48] people haven't used them enough to know

[42:49] what a good session versus a not so good

[42:51] session looks like

[42:53] >> um and part of it is like there's just

[42:54] like oh there's six instructions and if

[42:56] you don't reinforce the instructions

[42:57] like okay now we're on phase three like

[42:59] please also do five four five and six

[43:01] sometimes it'll just skip to the end or

[43:02] things like that

[43:04] >> and uh

[43:06] >> I realized there's a lot of what I call

[43:07] like oral tradition this is the same

[43:09] thing of like people who used to be

[43:10] really good prompters they're just like

[43:12] okay cool there's this thing where like

[43:13] okay you use this command and then you

[43:14] tell it what you want and at the end you

[43:16] have to say like remember stay objective

[43:18] we don't want you to tell me how to

[43:19] solve it just tell me how the codebase

[43:20] works today

[43:21] >> step by step Yeah,

[43:22] >> exactly. Think step by step, all these

[43:24] kinds of things. And so what we're

[43:25] trying to do now is like how do we

[43:27] >> how do we make the product um and the

[43:31] tooling

[43:33] less require that oral tradition? How do

[43:35] we bake that into the opinions? And so

[43:37] it's funny is like I was a 12actor

[43:39] agents guy, right? I was like full fat

[43:40] agents don't work. Just do context

[43:42] engineering. Treat LLM calls as just

[43:44] like an atomic step in your software

[43:46] just like any other function. Yeah. And

[43:48] then two months later, cloud code like

[43:50] starts blowing up. And I'm like,

[43:51] actually, full fat agents are good to

[43:53] go. I'm the cloud code guy now. Like,

[43:55] let's go. And now we're realizing like,

[43:57] oh, the thing that we want to do is

[43:58] actually break up this workflow into a

[44:00] bunch of like smaller. There's like a

[44:01] chat loop. And then you progress the

[44:03] conversation to another part of the chat

[44:04] loop. And so, it's like, oh, we're back

[44:06] to

[44:07] >> context engineering and micro agents. If

[44:09] you know what the steps are, don't rely

[44:11] on the prompt for control flow. If you

[44:14] know what the workflow is, split the

[44:16] prompt up into smaller workflow steps.

[44:18] You can still iterate with the human in

[44:19] those steps and then explicitly proceed

[44:22] to the next one either by a model doing

[44:23] a specific structured output or by the

[44:26] user opting in like yes, I'm done with

[44:27] the questions phase. Now I want to go to

[44:29] the plan outline phase.

[44:30] >> Any working on this and it's really fun

[44:32] to like build an AI product from scratch

[44:34] with like really good evals from day one

[44:36] because we know exactly what we're

[44:37] doing. And so like

[44:38] >> uh but one of the things I built was

[44:39] like to be able to really diagnose this

[44:42] and understand things is from day one

[44:44] the whole system has uh a logging proxy

[44:47] everything gets proxied through and we

[44:49] log every single request response pair.

[44:50] So whenever anything happens we can say

[44:52] like hey go look in the logs here's the

[44:53] exact response from anthropic like

[44:55] reverse engineer cloud code from the

[44:57] outside because it is closed source.

[44:58] >> Yep.

[44:59] >> Um

[44:59] >> so why not switch to open code?

[45:03] >> Uh no comment. Okay,

[45:06] >> may be coming.

[45:07] >> Okay, cool. Uh, but yeah, open code's

[45:09] great because it was basically you

[45:11] proxied it and it's just like a token

[45:13] for token replica of cloud code because

[45:15] you can pass the same tools, you can

[45:16] pass the same tool definitions, you can

[45:18] use the same models, right?

[45:20] >> You can make the tools behave in the

[45:21] exact same way, right?

[45:22] >> And that's why open code is tied with

[45:25] cloud code on most of the benchmarks

[45:27] because it's the same thing. It's just

[45:28] open source.

[45:29] >> Right. Right.

[45:31] Um,

[45:33] speaking about evals,

[45:34] >> yeah,

[45:35] >> popular topic in the press. Um,

[45:38] >> big I got cooked by big eval, man.

[45:40] >> Let's get into that. [laughter] Uh,

[45:42] yeah, big eval. It exists. Uh, I wrote

[45:45] my notes here. There's a million AI

[45:46] observability companies. Um, many of

[45:48] them very wellunded. Um, and then

[45:51] there's also everybody saying actually

[45:53] LM's judge doesn't really work very

[45:54] well. Like actually, actually, actually

[45:57] actually,

[45:59] how do you do emails? Oh man, LLM is

[46:01] judge. I was working with a customer a

[46:03] long time ago um and they were like,

[46:07] "Hey, we're gonna do I was like, I don't

[46:08] think LM is judge works very well." Like

[46:11] I don't think models are good at

[46:13] evaluating things. Like when we do when

[46:15] we work, we try to keep the model

[46:16] objective as long as possible. And Kyle

[46:19] actually just put a post on like a good

[46:20] clot MD. Uh and part of it is like never

[46:23] send an AI to do a llinter's job. Like

[46:25] anything that can be done

[46:26] deterministically,

[46:28] >> like I don't trust a model to read code

[46:30] and tell me if it's good or not

[46:32] >> because these models are like optimize,

[46:34] optimize, optimize to tell us what we

[46:36] want to hear. And you could say, hey,

[46:38] like review this code and tell me if

[46:39] it's good or not. It's like, yep, it's

[46:40] great. Like, hey, review this code and

[46:42] tell me if it's bad or not. It's like,

[46:43] yeah, it's trash. And it's like, it all

[46:45] depends on how you phrase the question.

[46:46] >> Yeah, I've heard I've heard the I asked

[46:48] the question again online like, you

[46:49] know, how do you get like valuable

[46:51] critique from one of the models? And it

[46:53] was like you have to tell it.

[46:55] >> My friend sent me this uh and I want to

[46:57] give them some valuable advice, you

[46:58] know, like what should I tell them

[47:00] basically otherwise the model will like

[47:02] think that you know

[47:03] >> it doesn't want to hurt your feelings.

[47:04] >> Exactly. Exactly. [laughter] Yeah. Yeah.

[47:06] Yeah.

[47:07] >> So yeah, the element judge thing is

[47:08] interesting. I mean there's a lot to be

[47:09] said for like evaluating the like

[47:12] objective characteristics of it. is like

[47:14] you know we do in AI tinkerers we have

[47:16] an algorithm on the back end that is

[47:17] like hey cool like we want to make sure

[47:19] that this event is mostly like by

[47:20] builders for builders and so we don't

[47:22] ask like hey AI rank this person on a

[47:24] scale of 0 to thousand on how technical

[47:26] they are it's like no extract like 50

[47:28] data points and then we have like an

[47:30] algorithm that turns that into a 1 to a

[47:31] thousand score it's like have they had a

[47:33] software engineering job in the last two

[47:35] years do they have they pushed anything

[47:36] to GitHub does their GitHub stuff have

[47:38] AI stuff in it you know it's all these

[47:40] like you know there's 50 questions I

[47:42] actually don't know how ex it works

[47:44] Exactly. But I know I've reverse

[47:46] engineered it by uh the number of bugs

[47:48] I've reported in it, but it's it's

[47:50] getting [laughter] really good now.

[47:52] Um so as far as observability goes, I

[47:55] don't I don't know. Uh

[47:56] >> you just said we have very good evals.

[47:58] What are your evals?

[47:59] >> Uh they are snapshot based.

[48:02] >> What does that mean?

[48:03] >> Uh so um we did an episode uh about

[48:06] evals with um with Viob and there's a

[48:08] bunch of different categories and like

[48:09] we don't have most of these.

[48:10] >> We'll link to it in the show notes. I

[48:11] guess the show.

[48:12] >> It's really fun. It's from like it's

[48:13] from like 4 months ago and like I

[48:14] haven't seen anything like Vib led the

[48:16] episode so I'm happy to talk about how

[48:18] great it is. I haven't seen anything of

[48:20] like higher signal and like value

[48:22] density as far as like how to do good

[48:24] evals since then.

[48:25] >> Okay.

[48:26] >> Um and to be fair like I don't get that

[48:27] excited about evals. Um so if I'm sure

[48:30] if I looked harder I would find some

[48:31] really good stuff.

[48:32] >> Yeah.

[48:33] >> Uh but essentially you know we have this

[48:34] prompt workflow and it's split into

[48:36] stages. And so we have a test that like

[48:38] runs it end to end for a question. It

[48:39] takes kind of like a long like cloud

[48:41] code running sub sub aents searching

[48:42] files doing all this stuff.

[48:44] >> And then we output the snapshot

[48:45] basically here's what the final output

[48:47] was. And then we can also break down and

[48:48] do eval stage kind of like unit test

[48:50] versus integration test kind of thing.

[48:53] >> Um but even the unit test is around kind

[48:55] of a large part of the workflow.

[48:57] >> Yeah. Uh and then we just store the

[48:58] output and then when you run it, you

[49:01] create a set of new snapshots and then

[49:03] you can diff the snapshots uh in the

[49:05] CLI. We'll probably build a web. It's

[49:07] very easy to vibe code a web UI for

[49:08] these things.

[49:09] >> Totally.

[49:09] >> And then um

[49:12] >> and then you can accept the new

[49:13] snapshots. It's like okay that change is

[49:15] better and I like that like oh I made a

[49:17] change and it has changed significantly

[49:20] >> then but it's basically the the ability

[49:21] to like because eval for me are

[49:24] >> I think of them the way like software

[49:26] engineers like think about unit tests or

[49:27] integration tests or end to end tests.

[49:29] It's like a way to prevent regressions.

[49:31] >> Yeah.

[49:31] >> Right. Yeah.

[49:32] >> And so you can have the very low-level

[49:34] unit testy eval which is like okay this

[49:36] comes out and I make a bunch of

[49:37] deterministic assertions about the

[49:39] output. really nice for like structured

[49:40] output problems and like like like

[49:42] parsing unstructured data into like

[49:44] structured objects. You can make a lot

[49:45] of assumptions. You can make a lot of

[49:46] assertions there.

[49:47] >> Yep.

[49:48] >> Uh but we're not we're not there yet. So

[49:50] it's like I don't know. The advice that

[49:51] I like the most is like like anything

[49:54] like the first layer is vibes. Vibes is

[49:56] very high leverage especially if you

[49:59] don't know what you're building yet and

[50:00] you don't know what you want it to look

[50:01] like.

[50:02] >> Um I think there was a guy who talked to

[50:04] AI engineer worlds fair um Ben Stein. He

[50:07] talked about like how does product

[50:09] management change in a world where like

[50:12] the capabilities of what you're building

[50:13] are emergent. Like you don't actually

[50:15] even know what it's capable of until you

[50:16] build it and like try it on a bunch of

[50:18] stuff.

[50:18] >> Yeah.

[50:18] >> And so his flow is like the BDD thing

[50:21] never really worked anyways. They're

[50:22] like okay like let me define the

[50:24] behaviors that I want and then work

[50:26] backwards from that and then that's what

[50:27] we evaluate, right? and like building

[50:30] the evals first for an AI tool

[50:34] >> feels

[50:36] his take is like that's you're going to

[50:38] constrain what you're actually building

[50:40] versus like build the thing have a

[50:42] product manager play with it for a

[50:43] couple days and then have them like

[50:45] point out okay these are the behaviors

[50:47] we really like

[50:48] >> here's the bugs but like then you back

[50:50] into okay here's what we're going to

[50:52] email against going forward. Yep. Yep.

[50:55] Um, continuing that thought, but also

[50:57] changing a little bit. Um,

[51:00] >> the the topic of like continual learning

[51:02] has been in the news extensively also

[51:04] recently through like 18 of Dwarf Cesh's

[51:07] podcast now basically, but also most

[51:08] notably um the most recent one with

[51:10] Ilia. Um,

[51:11] >> summarize it for me because I've I I've

[51:13] been like kind of following, but like

[51:14] what's your understanding? You've

[51:15] clearly consumed more of this than I

[51:17] have. It just seems like there's an

[51:18] increasing awareness that like what we

[51:21] really want is the ability for these AI

[51:24] systems to be able to get better through

[51:25] experience.

[51:28] >> Okay.

[51:28] >> So the AI system goes out, we tell it to

[51:30] do a job, it does the job, it observes

[51:33] what it does well, what it does not do

[51:35] well. It also gets feedback from humans

[51:37] about what it's doing well, what it's

[51:38] not doing well, and then it's able to

[51:40] sort of update its intuition about how

[51:41] to do that thing and then get better

[51:42] over time. This is how we this is how

[51:44] humans operate, right? like you could

[51:46] not write a manual that was detailed

[51:47] enough to onboard an engineer onto your

[51:49] team and oneshot it. Um, in practice,

[51:51] you're going to be like sitting next to

[51:53] that person and like giving them micro

[51:55] feedback for months to like get them to

[51:57] be like 100%, you know, autonomous

[51:59] basically,

[51:59] >> but you're also not writing down all

[52:01] that feedback. You expect them to write

[52:02] down the feedback either internally or

[52:04] on paper.

[52:05] >> No. Exactly. Exactly. And so, you know,

[52:06] yeah, the tacet knowledge transfer is is

[52:08] is a big problem broadly, right? Even in

[52:10] human systems. Um,

[52:11] >> but I guess that we it feels that that

[52:13] is like what we all want these AI

[52:15] systems able to do because like again

[52:17] you use the thing and you notice where

[52:19] it makes mistakes and then you need to

[52:21] now try to up either work around those

[52:23] mistakes and or like try to teach it

[52:25] itself to avoid those mistakes and then

[52:27] ideally again there's like some aspect

[52:29] where like it can just do that in the

[52:30] weights because that's presumably more

[52:32] expressive than like adjusting the

[52:34] prompt or adjusting like the rag system

[52:36] it has access to or whatever

[52:37] >> or like adding adding directives to the

[52:39] end of your cloud MD. right? Like CL has

[52:41] this memory. You do like a hash thing

[52:43] and then it's like cool, I'm going to

[52:44] memorize that instruction,

[52:46] >> right?

[52:46] >> Um, but you want it to update its own

[52:48] stuff, right? So there's like some level

[52:50] of like maybe like offline like

[52:52] compaction where like the model so the

[52:53] the current version I think I've seen

[52:55] people now increasingly trying to do I'm

[52:56] not sure how successful it is is like

[52:58] you know every night the model itself

[53:00] goes back through everything it did that

[53:02] day and then it like reflects on like oh

[53:04] like across these like hundred traces

[53:07] like what could I do better and then

[53:08] like tries to like bake that into its

[53:10] knowledge for the next day or some level

[53:12] of back testing to see if that works for

[53:13] the previous week or you can kind of

[53:15] imagine the sort of offline compaction

[53:16] system that obviously can also a

[53:19] training loop as well. So there could be

[53:20] like continuous RL or whatever on top of

[53:22] the model. But like I guess thoughts

[53:24] about continual learning broadly.

[53:26] >> I mean it sounds like the the naive

[53:28] solution is like build a good memory and

[53:29] not naive in the sense like it's

[53:31] building a good memory system is really

[53:32] freaking hard.

[53:33] >> Yeah. Why is it so hard?

[53:34] >> Um

[53:37] I think it's hard to do. I think it's

[53:39] almost impossible to do generically

[53:41] right now. I think like you can build

[53:43] really low-level building blocks. Um I

[53:46] think building a like thick horizontal

[53:48] memory layer is this like models are

[53:51] changing too much, the use cases are

[53:52] changing too much, the engineering

[53:53] techniques are changing too much. Um I

[53:55] know people who are building for a very

[53:58] specific use case like my buddy Brian is

[54:00] at an applied AI lab. They built like a

[54:01] tutor and so this AI has uh they

[54:04] implemented from scratch because this is

[54:06] the only thing that gave them enough

[54:07] control was like a they call it like

[54:09] decaying resolution memory. And so every

[54:11] time the agent turns on it's like cool

[54:13] here's what's happened today. Yeah,

[54:15] >> here's like daily summaries for the last

[54:16] 14 days. Here's weekly summaries for the

[54:19] like three weeks before that. And then

[54:20] here's monthly summaries for the last

[54:22] two. Like it's not like conceptually

[54:24] hard.

[54:25] >> It's like an educational use case like

[54:26] teaching somebody how to Yeah.

[54:27] >> It's does like tutoring for like grade

[54:29] school and high school students

[54:30] basically. And so it like receives

[54:32] emails from parents. It receive emails

[54:34] from students. It receives like a daily

[54:36] wake up to just see like, hey, is there

[54:37] anything to do today? Here's your rules

[54:39] and here's your memory and stuff like

[54:40] this.

[54:41] >> Yep. and uh like but that's a very

[54:44] specific implication for a very specific

[54:46] use case and I think if they had tried

[54:47] to generalize it they would not have

[54:49] solved their own problem and they would

[54:50] not have also not have solved anybody

[54:52] else's problem

[54:55] >> I guess not that I mean the general case

[54:56] is obviously very interesting because

[54:58] you can then in theoretically point this

[54:59] agent at anything and it sort of just

[55:01] will get better uh naturally so that's

[55:03] interesting from that perspective but

[55:04] like I think for now

[55:05] >> for people who are builders the ability

[55:07] to build agent memory successfully for

[55:09] my use case Yeah.

[55:11] >> Sort of a proxy to continual learning.

[55:13] It sounds like you're seeing some people

[55:14] like be successful at that, but it

[55:15] sounds like it's like not easy still.

[55:16] >> And it's not it's less about behavior,

[55:18] right? It's more about like factual

[55:19] recall of like what are the things I

[55:21] need to know to do my job? And like the

[55:23] actual continual learning is like

[55:25] because they need really good

[55:26] performance. They're they're not willing

[55:28] to let the agent update its own

[55:30] memories. They're not willing to let the

[55:31] agent like update its own instructions.

[55:34] Like

[55:35] >> the memory layer is the single like

[55:37] system of continuity through the whole

[55:39] thing. I think I haven't I haven't

[55:41] talked I talked to him for about it for

[55:42] an hour, you know.

[55:43] >> Yeah. Yeah. Yeah.

[55:46] >> But I

[55:46] >> the factual stuff feels doable today,

[55:48] right? Like remember this user likes

[55:49] potatoes like that. They don't like

[55:53] >> lettuce. Like I the factual stuff feels

[55:54] like fairly doable. Like the thematic

[55:56] stuff like it feels like much harder. Um

[55:59] >> like the the instructions and the rules

[56:01] like the the how to be not the like what

[56:04] is true,

[56:05] >> right?

[56:06] >> Yes. Yes. Yes. Yes. Have you seen

[56:07] anybody attempt that?

[56:10] [snorts]

[56:12] >> I mean, I see a lot of people like try

[56:13] to attempt it in their cloud MD files

[56:15] and it doesn't it doesn't go very well.

[56:17] >> But why is that? Is it like the model,

[56:18] the harness or all the

[56:19] >> I mean, there's some there's some

[56:20] finding and like the I think the stud is

[56:22] like six months old at this point. So,

[56:23] there's no Gemini 3 or anything in

[56:24] there, but it's like

[56:26] >> models can follow Frontier models can

[56:27] follow about 100 to 200 instructions or

[56:30] 150 to 200 instructions. And if you give

[56:32] more than that, you basically like

[56:34] really start to lose out on you spread

[56:37] the attention across all the

[56:38] instructions. The model's got to try to

[56:40] decide which ones are relevant and

[56:41] sometimes it won't.

[56:43] >> Um,

[56:43] >> this is like context rot for tools

[56:45] basically.

[56:46] >> Four instructions. Yeah, exactly. It's

[56:48] like you tell it too many ways to do

[56:49] things, it just like won't work. And so

[56:51] people just like spam with like always

[56:52] do this, never do this, always do this.

[56:54] And like you put the all caps thing,

[56:56] that's going to put more attention

[56:57] there. That's going to take away

[56:58] attention from everything else. And so

[56:59] you have this like almost like

[57:02] instruction severity inflation where

[57:04] everybody who wants to add a new

[57:06] instruction wants it to be followed. So

[57:07] they put theirs in all caps and then the

[57:09] the other ones get followed last and

[57:10] then everyone is coming in and suddenly

[57:12] your entire like memory like instruction

[57:14] system your whole system prompt is just

[57:16] like everything's in all caps and you're

[57:18] actually like d-tuning it from

[57:19] everything else in the conversation.

[57:21] >> Why is like I guess aentic search not a

[57:24] solution to that problem? Like anthropic

[57:25] just launched their like tool search

[57:27] thing for example like seems like rules

[57:29] search in this context would also be

[57:31] like potentially very effective.

[57:32] >> Oh I haven't yeah I haven't I haven't

[57:34] seen anybody implement that.

[57:36] >> Oh okay

[57:37] >> of like hey I'm doing this like how

[57:39] should I perform it and then you like

[57:40] rag against it or something.

[57:42] >> All right. Well I know we're hacking

[57:44] now.

[57:44] >> Yeah. Rules bench.

[57:45] >> All right. Great.

[57:46] >> I'm sure there's a lot of instruction

[57:47] following benchmarks. I don't know if

[57:48] anyone's evaluated anything like that.

[57:50] If you're on the YouTube, ping us on

[57:51] Twitter and tell us cuz uh I would be

[57:54] interested in hearing more about that.

[57:55] >> Yep.

[57:56] >> All right, we just hit an hour.

[57:57] >> Damn. Really?

[57:58] >> That was an hour.

[57:59] >> Okay,

[57:59] >> we could talk all day. It

[58:00] >> was fun.

[58:01] >> Uh but why don't we call it there and

[58:02] save the good stuff next time?

[58:04] >> Sounds great. Can't wait.

[58:05] >> Good stuff, dude. Peace. Cheers. See

[58:07] you.
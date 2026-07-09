---
title: "The next paradigm shift (according to Karpathy)"
author: "Theo - t3․gg"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=tOC2N0B9lio&t=3s"
date_saved: "2026-07-09T18:37:33.372Z"
---

# The next paradigm shift (according to Karpathy)

[0:00] This is a new paradigm for interacting

[0:02] with Claude that is significantly more

[0:03] in line with all the other human

[0:05] activity org wide. Once you do all of

[0:08] the under the hood engineering work to

[0:09] make this just work, Claude basically

[0:12] joins the team in a seamless way. You

[0:14] can talk to it as you would talk to

[0:16] another person and it can help with a

[0:17] very large variety of workloads. In my

[0:20] opinion, this is the third major

[0:22] redesign of LLM UI and UX. The first

[0:25] paradigm was that the LLM is a website

[0:27] you go to. The second was that it's an

[0:29] app you download to your computer. The

[0:31] third one is that it is a self-contained

[0:33] persistent asynchronous entity with

[0:35] org-wide tools and context working

[0:37] alongside teams of humans. It really

[0:40] takes a while to wrap your head around

[0:41] it, but it works and it is awesome.

[0:44] Sounds like Karpathy's cooking something

[0:46] important here, right? If I told you

[0:49] that the guy who helped pioneer LLMs as

[0:51] we know them today, one of the greatest

[0:53] researchers of our lifetime, one of the

[0:54] most important people in the entire AI

[0:57] world, is talking about a Slack bot

[0:59] here? You'd probably think I'm insane.

[1:01] Or you'd think he's insane. Or you might

[1:03] think that he's drank the Kool-Aid at

[1:05] Anthropic far too quickly as a recent

[1:07] hire and is just glazing a random

[1:10] @Claude feature inside of Slack. And if

[1:13] you thought those things, I would

[1:14] understand entirely. But I have to do

[1:17] two of my least favorite things here.

[1:18] Actually, I have to do three of my least

[1:19] favorite things here. I have to defend

[1:21] Anthropic.

[1:23] I have to make a video about it. But

[1:25] most importantly, I have to talk about

[1:27] Slack. And I don't want to talk about

[1:29] Slack, believe me.

[1:32] As cringey as this post may be, and it

[1:35] is,

[1:36] there are important things here that we

[1:38] can all learn from as an industry.

[1:40] And I think it's actually pretty cool.

[1:43] All that said, Claude tag is only

[1:45] available on team and enterprise plans.

[1:48] So if I'm ever going to be able to

[1:49] afford this paying full token rates

[1:51] instead of my subsidized subscription

[1:52] pricing, we're going to need to have a

[1:54] lot more money. And I'm going to cover a

[1:56] little bit of that real quick with

[1:58] today's sponsor. There's a bunch of

[1:59] things our tools do that we've just

[2:00] gotten used to because it's how it

[2:02] always worked. One of those things has

[2:04] always pissed me off. It's code review.

[2:06] Not the concept of code review. Believe

[2:08] it or not, I think we should be reading

[2:09] more of our code in general, even if

[2:10] agents are writing it, but the actual

[2:12] way that we do code review, it's

[2:13] terrible. Can someone please explain to

[2:15] me who thought it was a good idea to

[2:17] sort a giant code review like this with

[2:18] 11,000 lines changed in alphabetical

[2:21] order? It's nonsense. Wouldn't it be

[2:24] much nicer if your PRs are broken up

[2:26] into logical layers that actually

[2:27] explained what each did and the files

[2:30] were actually sorted in a way that made

[2:31] sense based on the changes themselves?

[2:33] Oh, it's on the screen, isn't it? Yeah,

[2:35] Code Rabbit did it. They already know

[2:37] how to review your code really well.

[2:38] Believe me, I've had Code Rabbit review

[2:40] a lot of my code. This is probably the

[2:42] single company that's prevented the most

[2:43] production outages on my services of any

[2:46] single company in existence. Their stuff

[2:48] got so good that I found myself

[2:49] reviewing code less because actually

[2:51] reading in GitHub was so painful. And

[2:53] now they've solved that, too, by taking

[2:54] all of the knowledge they get from

[2:56] reviewing your code and using it to

[2:57] structure that same diff in a way that's

[2:59] actually readable. You can hover over

[3:01] any of these sections and see what they

[3:02] actually are. This isn't different

[3:04] commits. I want to be clear about that.

[3:06] This is the whole pull request broken

[3:08] down into layers so you can actually

[3:10] read them and understand what's going

[3:11] on. There's even little indicators

[3:13] saying which ones they left comments on.

[3:15] There's a great mini map on the side

[3:16] here so you can see which sections have

[3:18] comments and other things of note in it.

[3:20] It's sorted in a way that actually makes

[3:22] sense. Each section has a summary

[3:24] describing what it did, which makes it

[3:25] so much easier to understand what's

[3:27] going on. And yeah, this is just really

[3:30] good. It's time to start reading code

[3:31] again. Get started at

[3:32] swyd.link/coderabbit.

[3:34] So, what is this new Slack bot that

[3:36] Infracoptic has put out and why is

[3:37] Carpathi so hyped on it?

[3:40] It's called Claude Tag, and the things

[3:42] that make it special are pretty damn

[3:44] cool if I'm being real.

[3:46] Claude Tag is a new way for teams to

[3:48] work with Claude. We're starting with

[3:50] Slack, which Claude can join as a team

[3:52] member. Grant Claude access to selected

[3:55] channels and connected to whichever

[3:56] tools, data, and even code bases you

[3:58] choose. Then anyone in the channel can

[4:00] tag Claude in and delegate tasks to it

[4:02] while they focus on other work. Claude

[4:04] builds context by remembering relevant

[4:06] information from the channels it's in

[4:08] and can plan out tasks to complete in

[4:10] the future. There's a couple pieces here

[4:13] that are really important. And though

[4:14] it's not just that they're starting on

[4:16] Slack, as a Slack hater, I'm excited for

[4:18] this to come to other things. The

[4:19] interesting pieces here are the way for

[4:22] teams to work piece and the channels

[4:26] it's in piece. These two parts are what

[4:28] make Claude tag so much more interesting

[4:30] than people seem to think. This isn't

[4:32] just another way to tag an agent inside

[4:34] of your Slack. This is a different way

[4:36] of thinking about context management and

[4:39] tool access

[4:40] for real teams. And I'm speaking a

[4:43] little bit from experience here because

[4:44] my team has been playing with a lot of

[4:46] stuff like this for our Discord

[4:48] management of all of the different

[4:49] things we do, whether it's the content

[4:51] on my channel, the sponsor deals that

[4:53] we're working with, the podcast and

[4:55] building topics and planning things out

[4:57] for that, or the other creators that

[4:58] we're starting to help with their brand

[4:59] management stuff, too. We have been

[5:01] trying to build bespoke Hermes agents

[5:03] and open Claude-style agents that can

[5:05] answer the right questions with the

[5:06] right context in the right places.

[5:08] And it's actually kind of annoying to

[5:10] get right. We're at the point now where

[5:12] we end up creating different isolates,

[5:14] like actual containers that have all the

[5:16] things a given Hermes agent needs, and

[5:19] then connect it to just one Slack

[5:21] channel. But each of those agents is its

[5:23] own deployment that has its own

[5:25] everything that we built for it. Claude

[5:28] tag is stumbling upon the same value

[5:31] prop here without all of that additional

[5:33] customization in a way that I actually

[5:34] think is really cool. What's even

[5:36] crazier is how much adoption there has

[5:38] been at Anthropic for this. According to

[5:40] them, tagging Claude is now one of the

[5:42] main ways we get things done at

[5:44] Anthropic. Today, 65% of our product

[5:47] team's code is created by our internal

[5:50] version of Claude Tag. Very interesting.

[5:53] So, how is this better than just using

[5:55] Claude Code? I'll let them explain and

[5:58] then I'll give my thoughts on top after.

[6:00] At Claude is multiplayer. Within a given

[6:03] Slack channel, there's one Claude that

[6:04] interacts with everyone. This means that

[6:07] anyone can see what it's working on and

[6:09] can pick up the conversation from where

[6:10] the last person left off. This makes

[6:12] tagging Claude very different from

[6:14] working with a single chat or for a

[6:16] single task. It's much more like

[6:18] interacting collaboratively with a

[6:19] teammate. This actually is quite fun and

[6:22] it's amazing to be there are so few

[6:24] experiences like this already. We have

[6:26] kind of simulated this with things like

[6:28] PR review bots that can make changes

[6:30] where one person can @bugbot or

[6:33] @greptile @codex @claudecode @coderabbit

[6:37] or whatever and say, "Hey, can you make

[6:39] this change?" And they can propose

[6:41] changes and actually merge things into a

[6:42] PR. There are not that many experiences

[6:45] that allow that type of multiplayer that

[6:47] actually makes sense for a fast-moving

[6:49] team in an environment that isn't

[6:50] [ __ ] GitHub. If your multiplayer

[6:52] story is GitHub, then you don't have a

[6:54] multiplayer story. You have a bunch of

[6:55] really slow load times and a website

[6:57] that crashes all the time. The idea of

[6:59] being able to talk with my team and

[7:01] Claude at the same time is actually

[7:03] really nice and I've started to feel

[7:05] this myself again with the cool agents

[7:07] that we've been spinning up for my team

[7:09] for the stuff that we're doing. This is

[7:11] something I actually really like about

[7:13] it. I'm excited to see how other systems

[7:14] and services start to develop these

[7:16] patterns in their own unique ways. The

[7:18] more important pieces are below though.

[7:20] Specifically, that Claude learns over

[7:22] time. Not for the whole company, but for

[7:25] the specific channel. As Claude follows

[7:27] along with its channel, it builds more

[7:30] context around the work. This means that

[7:32] users don't need to explain things to it

[7:35] from scratch over and over. And Claude

[7:37] can eventually automatically learn from

[7:38] other Slack channels and data sources if

[7:40] it's given the right permissions. It

[7:42] does not report from private channels,

[7:43] though. This gives it the tacit

[7:45] knowledge necessary for it to provide

[7:47] the best possible work. This part's

[7:49] really undersold, in my opinion.

[7:52] Different teams in different channels

[7:54] need different context. This is a

[7:56] problem I've experienced myself, and

[7:58] it's one of the things that's been nice

[7:59] about spinning up different agents on

[8:01] different computers that I'm running for

[8:03] different tasks. You can give different

[8:05] agents different context. But, once you

[8:07] have Claude code on your machine, your

[8:09] options are global or project-specific.

[8:13] That's a tough split, even just for my

[8:15] code work. Sometimes I want to bring in

[8:18] these four skills and these two

[8:19] connectors. Sometimes I want to bring in

[8:21] none of that. Sometimes I want to bring

[8:23] in everything I have. Sometimes I want

[8:25] to add another 2,000 to 5,000 tokens of

[8:28] context to my agent.md for specific

[8:30] types of work. There is no good

[8:32] abstraction here. There is no clean-cut

[8:34] way to split between people, projects,

[8:37] teams, orgs, codebases, and tasks, where

[8:41] you can manage the tools and the context

[8:43] properly for a given agent for a given

[8:45] run. We have yet to even come close to

[8:48] figuring out what the right place is to

[8:50] split and draw these boundaries are.

[8:52] But, channels are a hell of a lot closer

[8:54] than any of the things I have seen so

[8:55] far. At the very least, they map more

[8:58] naturally to the way we think and the

[9:00] way we structure our teams. If Claude's

[9:03] memory is for a given channel, it

[9:05] doesn't matter what codebases the

[9:07] company works on or how the monorepo is

[9:09] split up or how the various different

[9:10] sub mini repos or whatever structure

[9:12] they have, microservices, whatever, it

[9:14] doesn't matter, because the channel is

[9:16] where the context lives. So, if one team

[9:18] works one way and a different team works

[9:20] a different way, and they have different

[9:21] channels in Slack, they can work with

[9:24] Claude in those channels, and it can

[9:25] feel entirely different. It'll be

[9:27] possible for any two teams to have an

[9:29] entirely different experience here,

[9:31] because the knowledge Claude has is

[9:33] various and very different in those two

[9:35] channels. There are other parts here

[9:37] that I'm a little less excited about,

[9:39] but I could see being useful like the

[9:40] initiative piece here. If ambient

[9:43] behavior is enabled, I love that it's so

[9:45] stupid they even put it in quotes

[9:46] themselves. But if it's on, Claude will

[9:48] proactively keep you updated about

[9:50] whatever it thinks you might need to

[9:51] know. It'll flag relevant information

[9:54] from across the channels it's in and the

[9:55] tools it's connected to and follow up on

[9:58] threads or tasks that have gone quiet

[10:00] without being resolved. This could

[10:01] actually be useful considering how

[10:02] chaotic Slack is just like in general.

[10:06] Claude is the member that'll keep you up

[10:08] to date on what's going on.

[10:10] Yeah, I could actually see. It also can

[10:11] work asynchronously. You can send Claude

[10:13] a task and focus on other priorities

[10:15] while it's working. It can also schedule

[10:17] tasks for itself pursuing a project

[10:19] autonomously over hours or even days. We

[10:22] found this particularly helpful at

[10:23] Anthropic. We now spend much more of our

[10:24] time delegating tasks to many Clauds in

[10:26] parallel. You also can send it direct

[10:28] messages, too, which is pretty cool, but

[10:30] not my favorite workflow. I'm going to

[10:32] talk about this in a weird way. I'm

[10:34] going to do a much more in-depth video

[10:35] on this in the future. Let me know what

[10:37] questions you have about my setup so I

[10:39] can get it right. This is my Hermes

[10:41] agent. My Hermes agent runs in a Discord

[10:44] server dedicated just to it. I'm also

[10:46] trying to port it to Rust for fun. We'll

[10:48] talk about that another time as well. My

[10:49] Hermes agent is in Discord for a handful

[10:51] of reasons and not cuz Discord is my

[10:53] favorite app. Actually, I would like to

[10:55] do less in Discord as you see with my

[10:56] history here. It is untenable at this

[10:58] point. But I'm using Discord because I

[11:01] like Discord threads so much. So so

[11:04] much. I came around cuz I was not a big

[11:06] Discord thread fan initially, but I've

[11:08] grown to love them, especially the

[11:10] ability to reply to one message in

[11:12] Discord, but also have a thread and the

[11:14] it's good. It's good for this in

[11:16] particular because when I set up Open

[11:18] Claude, I didn't actually like it that

[11:20] much. I tried really hard and it was

[11:23] useful for a handful of things, but what

[11:25] I ended up doing with my Open Claude was

[11:27] just set it up as a bot that could

[11:28] archive YouTube links and SoundCloud

[11:30] links when I sent it to them and put

[11:32] them on my NAS for me. And that's all I

[11:34] really did with it because whenever I

[11:35] try to do something else, the context

[11:37] would get weird and broken because it

[11:39] was just one thread. And that was my

[11:41] biggest issue by far with things like

[11:43] OpenClaw is the default setup would have

[11:46] you get one thread, whether it's

[11:49] iMessage, WhatsApp, Telegram, whatever.

[11:52] You only had one running thread and that

[11:54] was the context being managed, which

[11:56] meant that it would prune that context

[11:58] all the time. It would just not get

[12:01] things right. And if I wanted to be

[12:03] doing multiple different things at the

[12:04] same time, I would kind of have to

[12:06] massage the context myself. Like I have

[12:08] to start with, "Remember how we did this

[12:10] 2 days ago? I want to do something

[12:12] similar for this instead." Because the

[12:15] context is everything I was doing in

[12:16] that thread, I had to help it pick and

[12:19] choose the right parts and what things

[12:21] to do and use. And when I added a

[12:23] capability to it, that capability was

[12:25] available for any task I asked about,

[12:27] even if the tasks or the things I wanted

[12:29] to do were unrelated. And I had a

[12:31] problem pretty often where it'd have

[12:33] like a scheduled task and I was in the

[12:35] middle of something else. So I'd ask it

[12:38] like, "Hey, can you check my email for

[12:39] this thing?" It would check. I'm like,

[12:40] "Okay, does this email mention anything

[12:43] about that?" And it would just so happen

[12:45] to be 11:00 a.m. when I had a scheduled

[12:46] task run. The scheduled task would show

[12:48] up in the same thread and just break the

[12:50] context entirely. I personally found

[12:53] this like entirely unusable and I ended

[12:55] up relegating my OpenClaw to like one

[12:57] task. Apparently, OpenClaw now also

[13:00] supports Discord threads, which is huge

[13:02] cuz I don't think any other methodology

[13:03] makes sense here for this. I love having

[13:07] threads for my tasks instead. Here's an

[13:10] example of one I set up that I'm going

[13:11] to start taking more advantage of soon.

[13:13] This is a job that every day at 11:00

[13:15] a.m. goes through the ProgrammerHumor

[13:17] subreddit, finds the five top posts that

[13:20] it thinks would be at all relevant to me

[13:22] and my audience, and then generates a

[13:24] page I I go to to see these top posts.

[13:28] And it's also the actual images, so I

[13:29] can quickly right-click, copy image, and

[13:31] then go post them on Twitter if I want

[13:33] to. But this is a page that gets

[13:35] generated at 11:00 a.m. every day that

[13:38] gives me free memes to go post on

[13:40] Twitter if I decide to, that lives in

[13:43] its own thread entirely separately from

[13:45] everything else I'm doing with it. And

[13:47] that's so nice. Where I want to go and

[13:50] where my team's already been going is

[13:52] the idea of breaking up different

[13:54] channels with different agents that have

[13:56] different capabilities. And that

[13:58] requires me to spin up a whole new

[14:00] Hermes agent with a whole new backing

[14:01] with all of those different pieces. But

[14:03] this is what it seems like Claude is

[14:05] getting right with Claude tag. The idea

[14:08] that it can create this itself. And

[14:10] that's also kind of what's happening

[14:12] with Hermes agent here. I didn't go into

[14:15] a terminal and set up a cron. I just

[14:18] told it I want it to do this thing. With

[14:21] that 11:00 a.m. cron, I literally

[14:22] started by just saying, let's scroll to

[14:24] the top of it. Every day at 11:00 a.m.,

[14:25] I want you to go through the programmer

[14:27] humor subreddit and find the top posts

[14:29] that would be worth me stealing and

[14:30] putting on Twitter. I tell it to do a

[14:32] test run, and it did. Eventually, I got

[14:34] annoyed about all of the spam in the

[14:37] context of the thread, and I just wanted

[14:38] a nice page I could open on my phone and

[14:41] save images from. So I asked it, "Can

[14:43] you update this job to make the content

[14:45] an HTML page using my HTML plan skill?

[14:47] The images should be embedded as image

[14:48] tags so I can easily save them on my

[14:49] phone." And then it made the change. And

[14:52] now I have these HTML pages I can click

[14:54] that have the images that I can easily

[14:55] right-click, copy, and go paste wherever

[14:57] I want to. And this all exists without

[15:00] polluting any of the other stuff I am

[15:02] doing. And it's so nice. And the harsh

[15:05] reality is that I don't think most

[15:07] people will understand how to create a

[15:10] system like this and set it up

[15:12] themselves, and especially not going as

[15:14] far as realizing they need different

[15:16] Hermes configurations or different Open

[15:18] Claude configurations for different

[15:20] channels they have for different

[15:21] purposes. Like the one I have set up to

[15:24] manage my sponsor deals is very

[15:25] different from the one I have set up to

[15:26] help me plan what content I want to put

[15:28] out or to update my code bases for me or

[15:31] to go change what's going on in my codex

[15:33] on the same machine. That's actually one

[15:35] of the things that's been really nice

[15:36] with this is that my Hermes agent is on

[15:38] a computer that I also code on so I can

[15:40] tell it to go make changes to my T3 code

[15:43] setup or to my codex setup. And it's

[15:45] actually been really nice having a

[15:46] Hermes as my like general do random [ __ ]

[15:49] solution and isolating codex and T3 code

[15:52] to just be for code. But all of those

[15:55] boundaries and all of that config and

[15:56] separation has been my problem. And once

[15:59] you do it, you kind of get to see into

[16:01] the future. And that's why I'm excited

[16:04] by what Anthropic did here with Claude

[16:06] tag. They are making it much easier to

[16:09] get most of the things that are cool

[16:11] that I did there without having to set

[16:13] it up and configure it and think in that

[16:15] separation yourself. The right

[16:17] primitives shouldn't require you to

[16:19] think about what available tools exist,

[16:21] what the context is, how the boundaries

[16:23] are set up. It should work the same way

[16:25] we work ideally. And in building this as

[16:28] a channel level primitive is actually

[16:31] really clever and I think will be the

[16:34] new norm going forward as these patterns

[16:36] become more popular. There is a problem

[16:38] though.

[16:39] And it's not the tag part of Claude tag.

[16:42] It's the Claude part. I don't want this

[16:45] to be just one model. One of the really

[16:48] cool things with Hermes agent is that I

[16:50] can switch the model whenever I want. I

[16:52] played around with GLM 52 with it and it

[16:54] did a pretty dang good job. I switched

[16:56] over to GPT 55 and it did a really good

[16:58] job with that. I switched over to Claude

[17:00] models and had to pay cash for it

[17:02] because they won't let me do it through

[17:04] something like, I don't know, my $200 a

[17:06] month sub that was sitting doing

[17:07] nothing. So I moved over to doing that

[17:09] with direct paid usage inference. I even

[17:11] use it with Fable for a bit and it was

[17:12] really cool. But when I saw the bill and

[17:14] I wanted to go back to using my

[17:15] subsidized inference, I switched back

[17:16] over to the open AI models. It's really

[17:19] nice to have setups like this that I can

[17:21] make suddenly feel more powerful by just

[17:24] switching the model. It was pretty crazy

[17:26] going from 54 to 55 and the model

[17:29] suddenly was able to do more and the

[17:31] same exact agent I had set up prior was

[17:33] way more capable than it was before. It

[17:35] was way faster and more accurate and got

[17:37] better task completion and it was just

[17:40] better and you could feel the

[17:41] difference. I don't think you should

[17:42] have to rely on one lab for that. And I

[17:44] don't like the fact that right now it

[17:46] feels like your options are all in

[17:48] customization where you're setting up

[17:50] the Hermes agent in the Python

[17:51] environment yourself. Every channel

[17:53] needs its own [ __ ] Docker image in

[17:55] order to have it be isolated properly

[17:57] and you're building up all of the skills

[17:58] and context and everything yourself and

[18:01] you can switch models or Claude tag

[18:04] where a lot of that works properly by

[18:06] default, but you have no control beyond

[18:09] what you can ask it to do. And you can't

[18:11] really ask Claude tag to go use a

[18:14] different model. Something I've been

[18:16] doing a ton recently is telling my

[18:17] agents to go use other agents. When I'm

[18:20] using Codex with GPT 55, I know its API

[18:23] definitions aren't great and I know its

[18:25] UI stuff isn't either. So I have taught

[18:28] my Codex, "Hey, when you're doing API

[18:30] like design and you're making an SDK

[18:33] that other things will consume or if

[18:35] you're building UI, call Claude-P prompt

[18:39] and let Claude do that work or ask

[18:41] Claude to come in and give second

[18:42] opinions. You're not doing that with

[18:44] Claude tag.

[18:46] So while I am hyped that they are taking

[18:47] the cool UX that I've been experiencing

[18:49] with other things and making it much

[18:52] easier to access for real teams, I don't

[18:55] love this being an Anthropic specific

[18:57] thing and I'm very excited for other

[18:59] companies to build clones of this so

[19:01] that you don't get reliant on just one

[19:03] lab and the way they want to do things

[19:05] and the models they produce because you

[19:07] can get way better answers way more

[19:09] efficiently at much faster speeds if you

[19:12] take advantage of other labs and other

[19:14] models. I'll end on this framing from

[19:16] Karpathy, which was a reply to somebody

[19:18] defending him saying that he shouldn't

[19:20] be getting clowned on for this. I think

[19:22] a number of people on the timeline

[19:23] didn't read past the title and made

[19:25] inferences and comparisons that are just

[19:27] wrong and then he used it as an

[19:28] opportunity to take cheap shots. This

[19:30] isn't a feature like some crappy Slack

[19:32] bot and it's certainly not a claw,

[19:33] though it has some aspects of it. It's

[19:35] an org level harness. The difference

[19:38] will become clearer over time. I am

[19:40] really excited to talk more about this

[19:42] idea, especially as we refine the org

[19:44] level agentic work that we are doing as

[19:46] a team, not just on like T3 chat and T3

[19:49] code, but also for all of the

[19:50] management, for all the other crazy

[19:52] stuff that my companies work on. I run

[19:54] three companies at this point, so I'm

[19:56] seeing how this plays out in various

[19:57] different environments and Anthropic is

[20:00] going in the right direction here. I can

[20:01] say that with 100% confidence. So,

[20:03] Karpathy, I'm sorry you got clowned on

[20:05] so hard. Kind of expected with the move

[20:08] to Anthropic, right in the swing of them

[20:11] being as [ __ ] as ever, but this

[20:13] feature is actually cool. Shout out to

[20:15] the team building it. Shout out to Lydia

[20:17] for the awesome launch video as well. I

[20:20] see where it's going. You are right, the

[20:22] future is roughly in this general

[20:24] direction and to people who don't want

[20:26] to go pay exorbitant prices for a Claude

[20:28] enterprise plan so they can test it out

[20:30] themselves. Go put some time setting up

[20:32] open claw or Hermes agent in your own

[20:34] Discord or Slack and you'll see a lot of

[20:36] the value that we're seeing here. Can't

[20:37] believe I just made a video defending

[20:39] both Anthropic and Slack, but here we

[20:41] are. Let me know if you think this is

[20:42] cool and how you're talking to agents

[20:43] with your teams and until next time,

[20:45] peace, nerds.
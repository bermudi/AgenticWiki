---
type: youtube
url: https://www.youtube.com/watch?v=Usufn8IQJgw&t=3357s
title: Context engineering with Dex Horthy
channel: The Pragmatic Engineer
date_saved: 2026-07-16T16:41:33.762Z
speakers:
  - Dex Horthy
  - Gergely Orosz
---

> [!note] Transcript attribution
> The transcript carries `[mm:ss]` timestamps but no per-line speaker labels. Per the media-pipeline convention, unmarked lines are the host (Gergely Orosz, The Pragmatic Engineer) and `>>` lines are the guest (Dex Horthy). Quotes are attributed by turn position, not verified against the audio.

# Context engineering with Dex Horthy

[0:00] So what is context engineering?

[0:01] >> It's kind of like deabstracting the

[0:03] abstractions that have been layered on

[0:04] top of rag memory, agentic history. At

[0:08] the end of the day, they're all

[0:08] different ways to pass tokens into a

[0:10] model.

[0:11] >> What is a smart zone and what is a dumb

[0:13] zone?

[0:13] >> The less context window you use, the

[0:15] better outcomes you'll get always.

[0:17] >> A new paradm that is spreading up is

[0:19] loop engineering. What do you think is

[0:21] bad about it?

[0:22] >> Problem with loops is like at a certain

[0:23] point, you're going to generate so much

[0:25] code that you can't read it anymore. We

[0:26] built a lights off software factory in

[0:29] July of 2025 and by November we had shut

[0:32] it down.

[0:32] >> Can we talk about what you mean by token

[0:34] harder and token smarter?

[0:36] >> I'm in a group chat called

[0:37] hyperengineering and it's all like

[0:39] people trying to max out their cloud

[0:40] subs. That's my idea of token harder and

[0:42] the goal is

[0:47] what happens when you let AI agent ship

[0:48] code for [music] months and no developer

[0:50] reads a single line. Today's guest tried

[0:52] exactly that. He built a lights off

[0:54] software factory and four months later

[0:56] he had no choice but to shut it down as

[0:58] things just [music] stopped working.

[1:00] Dexory is the founder of human layer and

[1:02] the person who coined the term context

[1:03] engineering days before Andre Carpathy

[1:05] and Tubiluska made it famous. He spent

[1:07] the last two years talking to hundreds

[1:09] of AI engineers about what actually

[1:10] works [music] when you build with LMS

[1:11] and is testing the most extreme ideas

[1:13] with his own team. In today's

[1:15] conversation we discuss [music] context

[1:16] engineering, what it is and the physics

[1:18] of context windows, including what the

[1:20] dump zone is. loop [music] engineering

[1:22] from the Ralph Wim technique to the slow

[1:24] loops that Dex's team runs every night

[1:26] to wake up to code cleanup PRs [music]

[1:28] the rise of software factories from a

[1:30] NATO conference in 1968 through DevOps

[1:32] [music] to today's agentic factories

[1:34] specdriven development and why specs

[1:36] always drift from the code itself and

[1:38] many more. If you want to understand

[1:40] increasingly important concepts like

[1:41] concept engineering and harness

[1:43] engineering or want to know how far you

[1:45] can push the let agents build everything

[1:46] idea from someone who pushed it further

[1:48] than almost anyone then this episode is

[1:51] for you. This episode is presented by

[1:52] antithesis. If you work with agents your

[1:54] job is no longer just writing [music]

[1:56] code. It's specifying and testing it and

[1:58] antithesis is the most effective method

[2:00] of verifying agenda code today. Today's

[2:03] episode is brought to you by Buildkite,

[2:04] the CIOS platform trusted by OpenAI,

[2:07] Entropic, Cursor, Nvidia, Uber, Canva,

[2:09] and more. Today, we're talking about

[2:10] pushing the right context into models so

[2:12] that they write better code. Right after

[2:14] that starts working, your agents will

[2:16] write more code, a lot more. Trusting

[2:18] that code avalanche is where many teams

[2:20] face a challenge today. Every change

[2:22] that an agent makes still has to be

[2:23] built, tested, and proven safe before it

[2:25] ships. Worked on my machine is not

[2:28] enough. So, you obviously need CI. But

[2:31] when agents are pushing five, 10, or 50

[2:32] times the commit volume into your

[2:34] pipelines, faster CI runners won't save

[2:36] you. Shaving 30 seconds off a single

[2:38] build is meaningless when the queue is

[2:40] 100 plus jobs deep. What you really want

[2:42] is a CI system that gets faster as the

[2:44] volume grows and CI that offers instant

[2:47] parallelization to give you unlimited

[2:48] concurrency and to intelligently route

[2:50] changes at runtime. This is what Bill

[2:52] Kite does and why global software

[2:54] leaders continue to rely on it. The same

[2:56] architecture that observed the scale of

[2:58] Shopify and Uber a decade ago now runs

[3:00] about 1.4 billion job minutes a week

[3:02] across cursor meta and snowflake. While

[3:05] the rest of the CI world are cracking

[3:06] under the weight of rearchitecting your

[3:08] platform, build kite continues to

[3:09] reliably grow. Agents running on your

[3:11] infrastructure or build kites. Any

[3:12] cloud, any chip, your secrets, your

[3:14] scale, every artifact and log is

[3:16] captured. So when something fails,

[3:18] either you or your agents have immediate

[3:19] insight for why. As you're ensuring the

[3:21] context you'll give to your agents,

[3:22] think about how you'll verify what they

[3:24] hand back. If your system is buckling

[3:25] under the increased volume, head to

[3:27] buildkite.com/pragmatic.

[3:29] 30-day all access trial, no credit card,

[3:31] and an actual human engineer on standby.

[3:33] His name's Ola, and he's very helpful.

[3:36] So, Dex, welcome to the podcast.

[3:38] >> Super stoked to be here, dude. Before we

[3:39] get into some of the context engineering

[3:42] and some of some of the the more spicy

[3:44] stuff as well, how did you get into

[3:45] tech? How did you fall in love with

[3:47] computers?

[3:48] >> Oh, man. So, I uh I was doing undergrad

[3:51] as a as a physics major. Um, and I

[3:54] realized that uh I didn't like academia.

[3:57] And there's like basically like two or

[3:59] three paths out of physics is basically

[4:02] you go get a PhD or you go into finance

[4:06] or you go do programming. At that time,

[4:08] this was, you know, 2012, 2011 when it

[4:10] was like in the middle of undergrad and

[4:12] deciding what to do. And I had done an

[4:14] internship when I was in high school. I

[4:16] was working with NASA researchers to a

[4:18] jet propulsion lab in California. They

[4:20] had just gotten this really highfidelity

[4:23] like the most uh you know fine grain

[4:25] data set of altitudes like the heights

[4:28] of very at very like top topographical

[4:31] map of the south pole of the moon.

[4:33] >> And the south pole of the moon is really

[4:34] interesting because some of the craters

[4:35] there are so deep because of the angle

[4:37] it has. It got hit by meteor storms like

[4:39] no other part of the moon. So there's

[4:41] very deep craters that have never seen

[4:43] sunlight.

[4:44] >> And so there's frozen liquid water in

[4:46] there from the formation of the moon.

[4:48] And so scientists were really interested

[4:50] in getting down there and exploring. And

[4:52] uh so we had this really fine grain map

[4:53] and it's like okay cool. Let's build

[4:55] software so that I I have point A to

[4:57] point B. I know the limitations of my

[4:59] rover can you know max incline up is

[5:01] this, max incline down is that find a

[5:03] path from point A to point B that

[5:04] doesn't like break those rules of the

[5:07] incline. So I was you know 17. I had

[5:09] never cracked a CS textbook. So I wrote

[5:11] I basically like wrote a really naive

[5:13] bad version of Dystra's algorithm for

[5:15] pathf finding. Uh so I was in college. I

[5:18] was like, I don't know if I want to do

[5:18] the academics thing, but I really

[5:20] enjoyed programming back in the day. And

[5:22] so, uh, so I decided to go I got like

[5:24] half of a CS minor and then started

[5:26] working on a API platform team at a

[5:29] software company in Chicago and

[5:31] >> Sprout Social, right?

[5:32] >> Yes. And uh, basically never went back.

[5:35] >> Yeah. And then then where did you go

[5:38] from there? Where did you pick up like

[5:39] the parts of the trade? Because very

[5:41] early on, your first job that's not

[5:43] really common. you were doing platform

[5:44] engineering back in you know more than a

[5:46] decade ago. From that point, it took me

[5:48] about two or three months to notice that

[5:50] like the most valuable work that was

[5:53] being done in the company was being done

[5:55] by like of course it's obvious like the

[5:56] first couple engineers who know

[5:58] everything and understand where

[5:59] everything was and like you spend a day

[6:01] on a support ticket from a customer and

[6:02] they solve it in 5 minutes but like you

[6:04] have to solve it so you learn and

[6:06] whatever. And I realized like the most

[6:08] valuable people in the company were the

[6:10] people that were building the developer

[6:12] platform CI/CD sandbox environments

[6:15] preview stuff. And so I kind of like

[6:17] that was my first step into the journey

[6:19] and I've basically been obsessed with

[6:21] software factories since that like three

[6:24] or six months into my first job.

[6:25] >> We talk about software factories now but

[6:27] you're you're talking about software

[6:28] factories back then. So like you were

[6:30] you're you were starting to already

[6:31] think that this is how we can produce

[6:33] better software inside this is pre AI

[6:35] world right?

[6:36] >> Well and I'm always surprised like

[6:37] there's a huge class of developers that

[6:39] say I don't want to work on CI/CD. I

[6:40] hate CI/CD. I'm like really because

[6:43] building the thing that builds the thing

[6:44] and building the thing that builds the

[6:45] thing that builds the thing is like as

[6:47] software engineers we're lazy. We want

[6:48] to do the most high lever thing that

[6:50] makes our job easier. So how do we if we

[6:52] can build a thing that helps us build a

[6:53] thing that helps us move faster then

[6:55] that's the best use of my time as a as a

[6:57] lazy engineer. And then you went to

[7:00] another startup uh as aspiration.

[7:03] >> Aspiration. Yeah.

[7:04] >> Aspiration also platform engineering.

[7:06] >> Yeah. I was brought in and then like

[7:07] three 3 months into the job, the VP of

[7:09] engineering who hired me quit or got

[7:11] fired. I don't know. There was some

[7:12] drama about it. I probably shouldn't

[7:13] talk about it. And then I was there for

[7:15] about a year uh and was kind of like

[7:17] acting CTO for a while like hired a

[7:19] couple people, helped hire the new VP of

[7:21] engineering, but I was out of there. I

[7:23] don't think I'll ever do consumer again.

[7:24] I think I'm actually a B2B guy.

[7:26] >> Good to know. And then you went to

[7:28] replicator where you spent like a good

[7:29] like like solid like four years and went

[7:31] from engineer for deployed engineer to

[7:34] product manager. Yeah, I did core

[7:35] engineering for like two years. We were

[7:37] building a container orchestrator like

[7:38] before Kubernetes, before Docker Swarm

[7:40] was really a thing. We built our own

[7:42] orchestrator. The founders had this

[7:44] vision that like, oh, Docker is going to

[7:46] make it much easier to ship on-prem

[7:47] software. And when I say onrem, I don't

[7:49] mean literally like a a rack in a colo.

[7:52] It's more like, hey, look, bring the app

[7:53] to where the data is rather than sending

[7:55] the data up to some cloud vendor.

[7:57] >> And Docker makes it much more much

[7:59] easier to package up apps and and and

[8:00] and move them around. And so they had

[8:02] this thesis that like basically you

[8:04] could build a platform that the

[8:05] experience that you get when you use

[8:06] GitHub enterprise which is like you

[8:08] install it and it has this admin panel

[8:09] but then you just get GitHub running in

[8:11] your data center and your code never has

[8:13] to leave your your data center. Suddenly

[8:15] you could build a generic SAS where

[8:17] everybody could have that. So I did two

[8:19] years as an engineer there and then our

[8:22] head of sales. We parted ways with our

[8:23] head of sales and uh honestly I was

[8:26] having a lot of arguments about the

[8:27] software factory with our CTO and it's

[8:29] kind of like almost like a too many

[8:30] cooks in the kitchen kind of thing. I'm

[8:32] sure many listeners listen listeners

[8:33] have had this experience of like well

[8:35] yeah I know I have these tickets to

[8:36] build but like CI sucks. I got to fix CI

[8:38] because it's too slow or it's like

[8:40] there's too many different builds and

[8:41] it's always breaking. like I'm going to

[8:42] fix that and then I'm going to do the

[8:43] end is just like Dex, I need you to stop

[8:45] fixing the build pipeline and like do

[8:48] the tickets I gave you. I'm sure you've

[8:49] had this experience perhaps.

[8:51] >> Yeah. And then and was this what led you

[8:53] to either forward deploy engineering?

[8:56] >> Yeah. So I like I really loved our

[8:58] customers. Our customer our customers

[8:59] are Hashi Corp, Data Stacks, Puppet, all

[9:01] these really cool engineering brands.

[9:03] TravisCI, CircleCI. I was like yeah I

[9:05] actually love working with our

[9:06] customers. Our customers are awesome.

[9:08] And uh it was a great way to like get in

[9:10] the trenches. a lot of really good

[9:11] engineers who were solving the hardest

[9:12] problem at the company which is like how

[9:14] do we take this 3 to 5year-old SAS

[9:16] platform and package it all up so that

[9:19] someone who knows nothing about our

[9:20] architecture can run it reliably in

[9:22] their own AWS VPC in their own on-prem

[9:25] data center whatever it was and so I

[9:27] spent I was our first kind of customerf

[9:29] facing engineer and it was in about

[9:32] three months I we closed I met with like

[9:35] every company customer that was like

[9:37] kind of in the pipeline but wasn't

[9:38] moving saleswise is and we closed like

[9:41] 12 deals in 3 months and the CEO was

[9:43] like, "Holy crap, Dex. Like the the

[9:45] investors are taking my calls again.

[9:47] Like I don't I know you want to get back

[9:48] to coding, but like I need you to go

[9:50] hire three people and like build this

[9:51] team out cuz I think you might have been

[9:53] like born for this."

[9:54] >> Wow.

[9:55] >> Yeah. So I did that for about four

[9:56] years, built that or to like 25 people

[9:58] and then Zer happened and uh it got a

[10:00] lot smaller and we kind of realized

[10:01] like, hey, we have a product that's like

[10:03] pretty good uh and we've been solving

[10:05] what lots of early startups do is like,

[10:07] okay, there's some usability issues. is

[10:08] we'll throw we'll get a bunch of smart

[10:10] people, throw them in the trenches with

[10:11] our customers, great for sales, great

[10:12] for retention, all this stuff. And it

[10:14] was like, oh, we actually like the

[10:15] margins on that aren't aren't good

[10:17] enough. And so we basically were like,

[10:18] cool, we actually just need to make the

[10:20] product way more usable, do a more

[10:21] PLG-shaped thing, make it productled

[10:24] growth,

[10:24] >> product led growth. Make it a little

[10:26] more self-service so you don't need an

[10:27] expert to teach you how to use it. And I

[10:29] was like, cool. If that's the most

[10:30] important thing, then I want to go be a

[10:31] product manager because I have tons of

[10:32] opinions. I've now spent four years in

[10:34] the trenches with our customers. I have

[10:35] a laundry list of roadmap things that I

[10:37] think would make the product way easier

[10:39] to use and adopt and implement and

[10:41] deploy

[10:41] >> and and now you went the full ar you

[10:43] went towards a dark side.

[10:44] >> Exactly. Yeah, I did. I was like this is

[10:46] going to kill my street cred isn't it?

[10:47] But uh I was really glad you know I

[10:49] think a lot of engineers are afraid that

[10:51] if they go do a customerf facing thing

[10:52] they lose all their credibility and like

[10:54] yes I wasn't coding for 10 hours a day.

[10:56] I was coding for like three or four

[10:57] hours on a Saturday for fun. Not uh but

[11:00] I mean we were helping people build YAML

[11:02] we were building CLIs. We owned a lot of

[11:03] the tooling that customers use, but it

[11:05] was like the last mile delivery side of

[11:06] it, not the core platform. And like on a

[11:09] more personal note, I had spent the last

[11:11] like most of my 20s feeling like okay, a

[11:14] little bit introverted, a little bit

[11:15] like socially awkward. What I what a lot

[11:18] of engineers I'm sure experience and uh

[11:20] I had talked to my uncle's a music

[11:23] producer. So he used to work with like

[11:25] Randy Newman and a bunch of like really

[11:26] famous musicians.

[11:27] >> Oh wow.

[11:28] >> Yeah. This guy Mitchell F. And he he I

[11:30] was sitting with dinner with him at some

[11:32] point and when I was I think it was when

[11:33] I was still in undergrad, but he gave me

[11:34] this lecture. He was basically like if

[11:36] you want to be really good at something,

[11:37] you have to make it the only thing you

[11:39] do. The guy playing guitar nights and

[11:41] weekends trying to get his band off off

[11:43] the ground will probably never achieve

[11:45] greatness. The people who become great

[11:48] are the people who basically make it

[11:49] like if I don't play guitar, I don't

[11:52] eat. And you go and you sit on the

[11:53] street all day and you play for 14 hours

[11:55] a day or whatever it is. That's the only

[11:57] way to become great. So, I said, "Okay,

[12:00] instead of trying to like read self-help

[12:01] books about how to be less introverted

[12:03] and less socially awkward, like what if

[12:05] I just made it my freaking job to just

[12:06] talk to people and make friends and like

[12:08] help people and solve their problems and

[12:11] uh I think it worked out. I recommend

[12:12] it. I think everyone should spend a year

[12:14] or two at least doing something really

[12:15] like customerf facing."

[12:16] >> Did you do this because you felt that it

[12:19] was holding you back be being

[12:21] introverted or or like what what what

[12:23] and I I know you got the motivation from

[12:25] the whole musician motivation. I I get

[12:26] it on one part, but what was it that you

[12:28] said like is a customerf facing thing

[12:30] that I'm I'm going to be doing it

[12:31] because clearly you were pretty great at

[12:32] like writing code by that point. You

[12:34] could argue you were doing it night and

[12:36] day. So where where did you find that

[12:37] like I actually I think like customerf

[12:39] facing or like getting this introvert

[12:41] off of me? Did you feel that I was

[12:43] holding you back or you just wanted to

[12:44] be good at it?

[12:45] >> It was just kind of a thing that was

[12:46] like interfering with my like general

[12:48] life satisfaction.

[12:50] >> And it was also like I'm not a very type

[12:52] A person. I'm very disorganized. is I

[12:53] don't know if people call it like okay

[12:55] I'm like ADHD now that's why I can run

[12:56] 30 quads in parallel or whatever it is

[12:58] but it was like I was really bad at

[12:59] email and calendars and spreadsheets I

[13:01] just like didn't care about these didn't

[13:02] understand them and so like another side

[13:04] effect of this was like it just forced

[13:06] me to be organized and keep a lot of

[13:07] things going and so like I don't know

[13:09] there's like weird benefits you get from

[13:10] like stepping outside your comfort zone

[13:12] and learning like industrial disciplines

[13:14] that are separate from what you've been

[13:16] doing and so the opportunity presented

[13:17] itself and I was like oh I like working

[13:19] I'll try this for a little bit started

[13:20] going really well I'm like cool let's

[13:22] keep let's see let's see how far this

[13:23] thread goes

[13:24] >> and then afterwards you're now in your

[13:26] second startup. You you became a founder

[13:28] and you also got involved in in AI

[13:31] pretty early as I as it was even before

[13:34] it was so obvious that it would change

[13:36] how it would change how we develop

[13:37] software, right?

[13:38] >> Well, I would say I was I was later than

[13:40] I could have been because we started the

[13:42] company uh me and a buddy in Chicago

[13:44] started a company in the data

[13:46] engineering space in about 2020 November

[13:48] 20. We decided in like August of 2015,

[13:50] >> this is Metalytics.

[13:51] >> Metalytics. Um, technically still the

[13:53] same company as human layer, we just

[13:54] like pivoted the the the mission. But,

[13:56] uh, yeah, the the the advice I got from

[13:58] every angel investor that, you know,

[14:00] people who just knew CTOs I'd worked for

[14:02] before and stuff, they were just like,

[14:03] look, hitting a lot of heads, wins. I

[14:05] don't know if you know like the whole

[14:06] DBT data engineering fiverr that whole

[14:09] arc where it was like this huge party

[14:10] and tons of investor money going into

[14:12] all these different companies and then

[14:14] within by like 2021 2022 there was kind

[14:17] of the zer thing and just this general

[14:19] realization that the TAM for those sorts

[14:21] of tools is not as big as everyone

[14:23] market

[14:24] >> yes the total addressable market for

[14:25] those sort of tools was was not as quite

[14:27] as big as uh as we all thought it was.

[14:30] Um so it was it was a hard place to

[14:32] raise money. It was a hard place to get

[14:33] customers.

[14:34] >> Yeah. And then I I met you at while you

[14:36] were at Human Layer NSF at an event. We

[14:39] you actually talked and we chatted

[14:40] afterwards. But by by that, this was

[14:43] about a year ago, you were already you

[14:44] you started to have some really strong

[14:46] opinions on using AI. And one of them

[14:50] was this now famous 12 factor agents

[14:53] manifesto.

[14:54] >> Is are we calling it a manifesto now?

[14:56] >> I'm I'm calling it a manifesto. It's a

[14:57] manifesto. I'm calling it. Let's talk

[14:59] about this. This was 12 engineuring

[15:01] principles to build reliable production

[15:03] ready apps. uh how did you come up with

[15:05] this and maybe we can also talk about

[15:06] some of them.

[15:07] >> Yeah. So um I'll I'll kind of like go to

[15:10] like around August the co-founder I was

[15:12] working with kind of burned out and left

[15:14] and it was very we were on good terms.

[15:16] It was very mutual. Um and I decided to

[15:18] start messing with AI stuff and I was

[15:20] building a AI agents and what was really

[15:21] in fog right then was like the lang

[15:23] chain the crew AI these like agent

[15:25] frameworks. Um and it seemed like there

[15:27] was a ton of you go you go in the crew

[15:28] AI discord there's 10,000 people. It's

[15:30] like, okay, this feels like the right

[15:32] shape and this there's clearly this eco.

[15:34] You go in every single one of those

[15:35] projects, they have a Chroma DB plugin.

[15:37] They have like a Composeio plugin.

[15:39] There's like clearly like this is the

[15:41] this is the shared interface that

[15:42] everybody is building for. I say, okay,

[15:44] what's missing from all of this? The

[15:45] agents can call tools, but it's really

[15:49] hard to like control which tools they

[15:51] call. And if it's a chatbot, obviously,

[15:53] you can show approved deny in the UI of

[15:55] your application. But I kind of was

[15:58] obsessed with what I would call like

[15:59] outer loop agents or proactive agent.

[16:01] Agents that would run in the background,

[16:02] get triggered by events. I mean,

[16:03] OpenClaw is basically like the biggest

[16:05] manifestation of this of like you have a

[16:07] heartbeat, it wakes up, it sees if

[16:08] there's any work to do, it tries to do

[16:09] stuff. And my thought was like, I'm not

[16:11] going to trust that agent to do anything

[16:14] meaningful.

[16:16] if I can't get like a Slack message or

[16:18] an iMessage or something when it wants

[16:20] to do something and kind of guarantee

[16:22] deterministically that I can approve or

[16:24] deny that or deny it with feedback and

[16:26] say actually no do it like this. So we

[16:27] played in that space for a while and

[16:30] talked to a lot of founders and founding

[16:32] engineers and builders. We came into YC

[16:34] in the fall of 2024 with this idea.

[16:36] We're building out this API platform and

[16:38] it was sort of like pedag duty but like

[16:40] it wasn't who's on call to fix the

[16:42] servers. It was like who's on call to

[16:44] this like routing mechanism for like who

[16:46] needs to approve this agent and can they

[16:47] like escalate it or delegate it or defer

[16:50] it all this stuff and we built it for

[16:51] this ecosystem crew AI link chain fi

[16:54] there's so many grip tape there was so

[16:56] many in that in that time and then I

[16:58] talked to tons of AI engineers who were

[17:00] actually building really interesting

[17:01] things and like actually making money

[17:04] doing six figure contracts shipping AI

[17:06] to the enterprise and all of them had

[17:08] tried that stuff for like a month or two

[17:10] and then they had thrown it out and they

[17:11] were just writing all a API calls by

[17:13] hand and they were building more things

[17:15] that look more like pipelines and

[17:16] workflows than these sort of like

[17:18] hands-off call tools in a loop kind of

[17:20] thing. And so I talked to a hundred

[17:23] people and I spent a lot of time a lot a

[17:24] lot of time hanging out with one of my

[17:26] best friends uh Vib from uh Boundary. So

[17:28] they build a programming they built like

[17:30] this like protobuffs for AI thing and

[17:32] they're I think they're about to launch

[17:33] their like full fat like programming

[17:34] language touring complete thing. But he

[17:37] had this way of thinking about agents

[17:38] and building with models and building

[17:39] with inference where it was a lot more

[17:41] about understanding what structured

[17:44] output really is under the hood. And

[17:46] every single step in your AI workflow is

[17:49] just tokens in tokens out. And your job

[17:51] as an engineer is figure out, okay, what

[17:53] tokens do I need to put in to maximize

[17:55] the chance that the tokens out are going

[17:56] to be good. and kind of distilled all

[17:58] these ideas into about 12 principles and

[18:00] wrote about it on GitHub, posted just

[18:02] like this like 12-page GitHub repo,

[18:04] threw it on HackerNews, got like five,

[18:06] it was on the front page for like two

[18:07] days and it I think it really resonated

[18:09] with a lot of people.

[18:10] >> Yeah. So, I I'll just quickly read the

[18:12] 12 principles and and then let's talk

[18:14] about like one or two that resonate. Sub

[18:16] 12 are natural language of tool calls,

[18:19] own your prompts, own your context

[18:21] window. Tools are just structured

[18:23] outputs. Unify execution state and

[18:25] business state. Launch pause resume with

[18:27] simple APIs. Contact humans with tool

[18:30] calls. Own your control flow. Compact

[18:32] errors into context window. Small

[18:34] focused agents. Trigger from anywhere.

[18:36] Meet users where they are. Make your

[18:38] agent a stateless reducer.

[18:40] >> The stateless. Yeah, the stateless

[18:42] reducer one was a little actually

[18:43] someone hit me up on Twitter and uh

[18:45] corrected me. It's actually it's

[18:47] actually a transducer because there's

[18:48] technically multiple steps in the

[18:49] workflow, but there we go. But but but

[18:53] of this one, this this was a year ago,

[18:54] so like which is like forever in uh in

[18:57] in how the tooling is is evolving. Which

[19:00] ones still stick with you where you're

[19:02] like, "All right, these were good that

[19:04] that still seem to hold off." Yeah, I

[19:06] think I'm going spent most of March

[19:07] writing it, published this in April. Uh,

[19:10] and then Swix hit me up from AI.engineer

[19:12] and he said, "Hey, can you come? You

[19:13] want to come talk about this." So, I

[19:15] gave this talk 12 factor agents in like

[19:17] June 6th, I think. And, uh, small room

[19:20] maybe like it was packed, but it was

[19:22] like maybe a hundred people. That was

[19:23] the year at AI engineer where like the

[19:25] lower physically like on on the on the

[19:27] second basement floor was all the super

[19:29] corporate stuff and you go up a level is

[19:30] a little bit more and then like on the

[19:32] top floor is all the like weird cutting

[19:34] edge like startup stuff that like you

[19:36] probably shouldn't care about yet kind

[19:37] of thing. So we were up there on the top

[19:39] of this like weird way of thinking about

[19:41] agents. Uh and then about a week later

[19:43] or two weeks later uh Toby Licki from

[19:45] Shopify says I really like this idea of

[19:47] like context engineering. And I'm like I

[19:49] I wrote about this two months ago. This

[19:52] is great. Toby gets it and then a week

[19:54] later Andre Carpathi is like well I

[19:56] really like I think what we should think

[19:57] about is not prompt engineering but

[19:58] context engineering. And I was like,

[19:59] "Yes, that's my." Anyways, I don't know.

[20:01] If you ask Gemini, depends what day it

[20:03] is, they will tell you either me or Toby

[20:05] or Andre came up with context

[20:07] engineering. You can't really own a

[20:09] word. Like I don't no one remembers who

[20:10] invented the word prompt engineering.

[20:12] But of all the factors, factor three of

[20:14] own your context window. And basically

[20:15] the only way you can whether it's

[20:17] agentic or a single step at a pipeline,

[20:19] the only way you can impact the quality

[20:21] of your output from AI is by caring a

[20:23] lot about what the inputs and crafting

[20:25] them. Let's talk about context

[20:27] engineering, which I am going to credit

[20:29] you that you coined it. I I did some

[20:31] research and like I think you were

[20:32] earlier by a few days. So there we go.

[20:34] You you coined it. We're adding we're

[20:36] adding to the we're adding to SEO juice.

[20:37] We'll have it in a transcript. Dex

[20:39] coined context engineering.

[20:40] >> Well, and and like a asterisk on that is

[20:43] basically like I learned about context

[20:44] engineering from talking to these

[20:46] hundred engineers and founders. I just

[20:47] kind of like what was the same about

[20:50] what they were all doing and I put a

[20:51] name on it. So like I didn't invent

[20:52] doing it. I was just like I think we I

[20:54] think there's this thing and like

[20:56] vocabulary and names are really

[20:57] important and having like clean ways to

[20:59] talk about the problem especially when

[21:01] like a lot of the content about AI right

[21:03] now is so much hype and jargon that is

[21:04] like meaningless. I was like okay I

[21:06] think there's a word here that is useful

[21:08] to builders that explains how they

[21:10] should be thinking about building their

[21:11] software. So what is context

[21:13] engineering?

[21:14] >> It's kind of like deabstracting a lot of

[21:16] the abstractions that have been layered

[21:17] on top. So you have rag, you have

[21:20] memory, you have agentic history, you

[21:22] have structured output, you have all

[21:24] these things that are like different

[21:26] ideas in the frame of agentic

[21:28] programming. And at the end of the day,

[21:29] they're all like different ways to pass

[21:31] tokens into a model and ask it to

[21:33] produce usually some structured output.

[21:36] And understanding that is a lot more

[21:39] powerful than trying to learn memory and

[21:42] trying to pick some agent framework off

[21:44] the shelf and some memory framework off

[21:45] the shelf. I mean, those are these

[21:47] things are all really good. If you want

[21:48] to get to like 80%, you want to get a

[21:50] really good demo. But when you have to

[21:52] go from 80% to 95% or 99%. You need to

[21:56] go down a level and think about what's

[21:58] everything we're putting into the

[21:59] context window. What order is it going

[22:01] in depending on which model we're doing?

[22:03] And all of this stuff matters. You have

[22:04] all of these levers that you can pull.

[22:07] And it just felt like the right

[22:08] abstraction for thinking about how do I

[22:10] get AI to do the thing I want as

[22:13] accurately as possible. Why is context

[22:15] engineering started to become more more

[22:17] talked about? It it was about a year

[22:19] ago. Was it did it have to do with the

[22:20] the context the the context window that

[22:23] we could pass on to LLMs pretty much.

[22:25] Did it start to expand or did did we

[22:27] just start to realize that we can do a

[22:29] lot more by passing on from you know the

[22:32] easiest one is of course system prompts

[22:34] but of course whenever you build an LLM

[22:36] behind the scenes you will pass

[22:38] additional context as well not just to

[22:40] prompt the user you will add a bunch of

[22:42] stuff that's I guess a dirty secret of

[22:43] any any LM but why do you think the

[22:45] focus is moving on to like all right

[22:47] context is important

[22:48] >> I think it always was important I think

[22:51] what had to happen is a ton of smart

[22:53] people again like all these builders I

[22:55] talked to a ton of smart people had to

[22:57] like focus really hard on producing like

[22:59] I want to make software that I can sell.

[23:00] I want to make something that is

[23:01] accurate enough that I'm proud of and I

[23:03] can sell to an enterprise and they're

[23:04] going to be happy with it. And there's

[23:07] just like the the the the easiest way to

[23:11] get to really high quality AI

[23:12] applications is by thinking at that

[23:14] token level. Thinking about a string of

[23:16] different LLM calls like rather than

[23:19] just tools in the loop and it's kind of

[23:20] open-ended and very flexible but not

[23:22] that reliable. thinking of agents as as

[23:25] workflows, as pipelines, as some mix

[23:28] between maybe a couple tools in a loop

[23:30] versus just, hey, I have my tools and I

[23:32] have my model and I have my system

[23:34] prompt and these are the only levers I

[23:36] have. And it's actually no, you have way

[23:37] more levers. It's going to take more

[23:38] work and you're going to have to like

[23:39] understand the LLM with a deeper

[23:41] intuition. But it was a thing that we

[23:44] always needed and it just took time for

[23:46] people to build with this technology to

[23:48] figure out that like this is the layer

[23:50] of abstraction that allows you to break

[23:52] through the quality ceiling.

[23:53] >> And how are cost and context engineering

[23:57] connected?

[23:58] >> Yeah. Um I don't know. I was I was

[23:59] talking about this with uh someone this

[24:01] morning um about like when you're

[24:03] working with LM, one of the things I I

[24:05] like to say is kind of like make it run,

[24:07] make it right, make it fast. see if the

[24:09] world's best LLM at the time I think we

[24:11] did a podcast episode that at the time

[24:13] it was like 03 see if 03 can solve your

[24:15] problem and then give it to people and

[24:18] see if they want that and then if people

[24:20] want it and you use it a lot then go do

[24:22] a bunch of context engineering because

[24:24] your engineering time is always the

[24:25] bottleneck like humans trying to figure

[24:27] out and solve problems and build evals

[24:29] and improve and try different dimensions

[24:31] or set up jeep or whatever it is is

[24:33] always going to be more expensive than

[24:35] just using a smarter model until you

[24:37] have millions of requests a A and then

[24:39] it's like, okay, we're going to do a

[24:40] bunch of context engineering, break this

[24:41] up into three calls, and get it to work

[24:42] on GPT40. And then we're going to take

[24:44] two of those and make those two work on

[24:46] GPT40 and using old model names. But the

[24:48] point is like for a certain task in your

[24:50] workflow, can you get GPT OSS 12B, which

[24:53] is like 1/ 1,000th of the cost of Opus,

[24:56] can you get it to solve parts of the

[24:58] problem so that the tokens and the

[25:00] things you're using the smartest

[25:01] frontier models for are just the things

[25:03] that you really need, that level of

[25:05] intelligence? But you shouldn't go build

[25:06] all of that and overengineer it until

[25:08] you've proved that you need it that it's

[25:09] valuable that it's like okay this is now

[25:11] I mean we get to Eli Goldrat and like

[25:13] what is the the he had this book the

[25:15] goal right it was about how to model

[25:17] your factory and I'm sure we'll get to

[25:18] that when we talk about software

[25:19] factories it was like what is the

[25:20] bottleneck in your system and one day it

[25:22] will be latency and cost but it's

[25:24] probably not that when you first start

[25:25] out and context engineering is how you

[25:27] move from the you you add human effort

[25:30] to the equation to improve the

[25:32] efficiency the speed the price the cost

[25:34] efficiency of your system.

[25:36] >> Interesting. And then one thing that

[25:38] came up more recently and a lot later uh

[25:42] recently is harness engineering. What is

[25:44] harness engineering? So I made a post in

[25:47] like October I think about or maybe

[25:48] November of of like hey there's this new

[25:50] thing that I see is like I'm calling it

[25:52] harness engineering. My definition that

[25:54] I had at the time is not what actually

[25:56] this guy Viv who's at lang chain now

[25:58] does a lot of really good writing on

[26:00] agents and how to think about harness.

[26:01] He had written something called harness

[26:02] engineering like a couple weeks before

[26:04] me but I hadn't read it at that point.

[26:06] And my take was basically like okay when

[26:08] you build an agent you use use context

[26:11] engineering. When you use an agent

[26:13] because we gave this talk in August of

[26:15] 2025 about like how to apply context

[26:17] engineering to how you use coding

[26:18] agents. And that kind of evolved into

[26:20] this idea of like how do you take a

[26:23] harness like cloud code like codeex how

[26:27] do you engineer against the integration

[26:28] points of that harness. So commands,

[26:31] MCPs, skills, how you organize your

[26:34] codebase. How do you kind of optimize

[26:36] the environment that the coding agent

[26:37] runs in to like get the best results?

[26:40] The same way with context engineer, how

[26:42] do you optimize the inputs to every

[26:43] single prompt? Well, harness engineering

[26:44] just is like how do I raise the floor so

[26:46] that every single turn of this thing,

[26:49] the results are as good as possible. And

[26:51] the term got super blurry and some

[26:53] people think harness engineering means

[26:54] building a harness. And some people

[26:56] think hard harness engineering means

[26:57] building around a harness. I actually

[26:58] like what Martin Fowler came up with uh

[27:00] as usual he's very good at naming things

[27:02] and he kind of defined the you have the

[27:05] LLM and then you have the inner harness

[27:07] which is like the thing the the tool

[27:08] definitions and the integration points

[27:10] that like say like a cloud code or a

[27:12] codeex or a amp actually exposes that's

[27:15] your inner harness and then you have the

[27:16] outer harness which is the stuff that

[27:18] you the human do to customize that for

[27:20] your specific needs your codebase your

[27:22] languages etc that's the best definition

[27:25] I think we have for harness engineering

[27:26] >> it's interesting how naming is still so

[27:29] so important, isn't it?

[27:31] >> Well, it's like as soon as you name

[27:32] anything, people are most people are I'm

[27:34] actually surprised that context

[27:35] engineering still means the same thing

[27:36] to most people that it did a year ago

[27:38] and that it's even still relevant. Like

[27:40] that's honestly the the craziest thing

[27:42] to me is like you wrote how many things

[27:44] that were written about AI 15 months ago

[27:47] still matter or still interesting um or

[27:50] are still like have good advice baked

[27:52] into them. Stuff changes a I think

[27:54] context engineering has been so long

[27:56] lived because it's it's grounded in the

[27:59] fundamentals of how transformer

[28:01] attention works and until we have post

[28:04] transformer models or linear attention

[28:06] or whatever it is which who knows when

[28:07] that's going to happen context

[28:09] engineering will be interesting and

[28:10] important to anyone building on AI and

[28:12] can we talk about the physics of of

[28:15] context uh you you you had a you had a

[28:18] tweet uh this this one the the context

[28:21] reality check this is a graph of uh as

[28:24] you get to 1 million context just the

[28:26] the quality just drops it. It goes down.

[28:30] What do we need to know about like the

[28:31] context? Again, we we now have models

[28:33] that do have a 1 million context window.

[28:35] Maybe we'll have even longer ones, but

[28:37] when you start to just put in more stuff

[28:39] into the context, it starts to become

[28:41] less efficient. Like what what do we

[28:42] know so far in terms of from a practical

[28:44] perspective of like someone who is using

[28:46] the context window to add on a bunch of

[28:48] stuff? May that be MCP, may that be

[28:50] tools, may that be scales, may that be

[28:52] all of these things. Yeah. I mean, so

[28:54] the longer context windows are good. You

[28:56] can talk to it for longer. Like they're

[28:58] doing a good job. But at the end of the

[28:59] day, like especially when you had like

[29:01] Opus, it was like Opus 4.5 and then Opus

[29:05] 4.51 mil or 4.6 and 4.61 mil. You're not

[29:09] actually getting a like smarter model.

[29:12] like the intelligence of the model is is

[29:14] what drives its ability to attend to all

[29:17] of the tokens in the context window to

[29:18] figure out on the next turn which parts

[29:21] of this 100k or 200k context window are

[29:24] the most relevant to making the decision

[29:26] of like what is the next tool we call

[29:28] and doing that over and over again in a

[29:29] loop. So I don't know there was some

[29:31] study that came out in 2025 which found

[29:33] that and again these are old models so

[29:34] like inflate your numbers but it was

[29:36] like frontier LLMs can follow about

[29:39] 150 to 250

[29:42] instructions before it starts to drop

[29:44] off. Their ability to follow all the

[29:45] instructions just like drops off pretty

[29:47] quickly. And I think Lori Vos I haven't

[29:50] actually looked at the data but they did

[29:51] a study with like the next generation

[29:53] models a year later and it looks like

[29:54] it's like much better the number of

[29:56] instructions you can get in. In any

[29:58] case, you have like I split context

[30:00] engineering into like two categories.

[30:02] You have like the the most people think

[30:04] about like the information budget of

[30:06] like okay I can do rag and I can pull

[30:08] out chunks of this document rather than

[30:11] putting the entire book into my context

[30:14] window. I can just go grab the pages

[30:15] that matter. But it's also your

[30:16] instruction budget is like if you give

[30:18] the model too many instructions and

[30:20] especially too many conflicting

[30:21] instructions and that's in your initial

[30:22] prompt and also like if you have a

[30:24] conversation you start going down a path

[30:26] and then you change your mind and you

[30:28] start going down a different you

[30:28] actually I don't want to do any of that

[30:29] I want to do this. It's like a it's a

[30:31] lot of computation the model has to do

[30:34] to notice that it has to ignore that

[30:36] whole thing. And when both of those

[30:37] things are kind of far back enough in

[30:39] the context window that they're only

[30:40] half getting attended to, your

[30:42] likelihood that it's like actually going

[30:44] to like remember the exact instructions

[30:46] you gave it 100,000 tokens ago is like

[30:48] it goes down quite significantly. This

[30:50] is all very interesting because as

[30:52] engineers there we are expected when you

[30:54] know when we're AI engineers which now a

[30:57] lot of software engineer meaning you

[30:58] just like use LMS to to build software

[31:01] like underneath there's an LLM layer

[31:02] somewhere you're an AI engineer

[31:03] congratulations but it sounds like the

[31:06] expectation is to be you know to be a

[31:08] good to be a good software engineer preI

[31:10] you need to understand you know how to

[31:12] write good code and it helps when you

[31:14] understand a little bit of the

[31:15] underlying we didn't need to do that

[31:17] that much over time but it it it never

[31:19] hurts but sounds Like right now we're in

[31:21] this phase that to be an engineer who

[31:25] can write an efficient AI system that

[31:27] use LMS. You need to understand the

[31:30] dynamics of the context you need to

[31:33] understand why stuffing your context one

[31:35] way or the other can be compute can

[31:38] introduce latency and all of these. It

[31:40] sounds like it's kind of more of an

[31:42] intuition and of course there's some

[31:44] understanding but from talking to you

[31:46] you're like well it it it does this

[31:47] computation like I know you know cuz you

[31:49] tried it out right?

[31:50] >> Yeah like I'm not I'm not a PhD in

[31:51] machine learning like I couldn't

[31:53] actually go like draw a mathematical

[31:54] proof of how this works but we know

[31:56] attention is quadratic and the more

[31:58] stuff you put in the more it has to

[31:59] spread this attention out over

[32:01] everything.

[32:03] This just feels like an absolute new

[32:04] area and like a little bit very

[32:06] different to like what we're used to

[32:07] like software engineering which is like

[32:09] pretty kind of like black and white,

[32:10] right? That compiles or doesn't compile.

[32:12] >> That's true. I mean there's a different

[32:14] kind of intuition. I was talking about

[32:15] this earlier as well is like there's a

[32:16] different kind of intuition that you

[32:17] that you develop over years as a

[32:19] software engineer and uh there's many

[32:22] categories of it but the one I'll I'll

[32:23] call attention to that is like a thing

[32:25] that you cannot teach you cannot do you

[32:27] cannot learn in a textbook. The only way

[32:29] to learn it is like I know bad patterns

[32:31] in software because I have debugged them

[32:33] at three in the morning. This is my

[32:35] buddy Jake from Netflix said this in his

[32:36] talk at AI engineer code. It's just like

[32:38] there's no better way to learn what is

[32:40] good and what is bad and what works and

[32:42] what doesn't than suffering through the

[32:44] thing that doesn't work.

[32:45] >> Well, speaking of suffering through the

[32:47] things that that doesn't work, uh a new

[32:49] paradigm uh that is spreading up is

[32:52] loops. Loop engineering. The idea that

[32:55] instead of writing prompts, just write

[32:56] loops. Set up your loops. And this all

[32:58] started with the Ralph Wiggum technique

[32:59] where it it will just well it I I guess

[33:03] that's an early version of loops that

[33:04] were just loops around and now we're

[33:06] we're hearing with some of the big

[33:07] biggest labs talking about that they're

[33:09] actually just doing looping. What is

[33:11] your take on have have you done some

[33:14] looping yourself? Have you set up some

[33:16] loops? And what do you think is good

[33:19] about it and what do you think is bad

[33:21] about it?

[33:22] >> Yeah. So I think of loops as I mean this

[33:24] could I could ramble on this for 10

[33:26] minutes. This is an entire talk, but

[33:27] I'll I'll try to I'll try to lay out

[33:29] some highle stuff and then we can dig in

[33:31] wherever you think is most interesting.

[33:32] We had Ralph Wickham. It was actually a

[33:34] year and four days ago was the first

[33:36] time I saw the Ralph Wickham demo and

[33:38] like Jeff Hunley was just like visiting

[33:40] SF and he just like came through and

[33:42] like dropped everybody's jaws with his

[33:44] like, "Yeah, I just ran Sonnet around

[33:45] the clock and spent six grand in six

[33:47] weeks and like I built an entire Gen Z

[33:50] programming lang." Look at it compiles

[33:52] and it has a stage two compiler where

[33:53] the compiler for the language is written

[33:55] in the language itself and all the

[33:57] insane. And the core lesson from all of

[34:00] that I think was the idea of back

[34:03] pressure which is basically and I think

[34:05] a lot of people were doing this for a

[34:07] very have been doing this for a long

[34:09] time which is how do I let the model

[34:11] check its own work? How do I automate

[34:14] the process of getting feedback into the

[34:16] model? And there's lots and lots of

[34:18] different flavors of this. You can have

[34:20] deterministic llinters. You can have

[34:22] unit tests. Like part of what made the

[34:24] programming language easy to build with

[34:25] Ralph is a programming language can be

[34:26] infinitely verified. You write you write

[34:28] the code in the language, you compile

[34:30] it. If the compiler fails, you go fix

[34:32] the compiler. You run the program. If

[34:34] the program fails, you go fix the

[34:35] compiler. Like it's like it's very very

[34:38] verifiable. And I think the lesson in

[34:41] loops engineering is like if you can

[34:43] make a problem very verifiable, you can

[34:47] kind of like treat it like a black box

[34:50] >> and then have it loop because it will

[34:51] keep improving itself because of the

[34:53] verification loop is already there.

[34:55] >> Exactly. And so like you can do this

[34:57] with CI/CD is like I I do this every

[34:58] time I'm doing a release. I'm like I'm

[34:59] tired. The CI/CD is slow. Cool. Go

[35:01] research the codebase, make a change,

[35:03] make a pull request, run the test, see

[35:05] if it's faster, try again. Run the p run

[35:08] the test. push push to the branch check

[35:10] again see if it's faster and so it's

[35:11] like if it can verify its own work in a

[35:13] loop instead of design instead of saying

[35:15] let's try this approach or let's try

[35:17] that approach or suggest and being

[35:19] really back and forth you just say like

[35:20] my goal is to make CI faster and you

[35:23] tell the model here's the steps here's

[35:24] the five here's the five steps you're

[35:26] going to write some code you're going to

[35:27] commit it you're going to push it you're

[35:28] going to launch a sub agent to watch the

[35:30] job until it's finished it's going to

[35:32] tell you what happened then you're going

[35:33] to decide what to do next and so that's

[35:35] that's like the very simplest example I

[35:37] have of like designing loops

[35:38] >> and you just set the goal which is cloud

[35:41] code and and I think codecs have both

[35:43] chip/go goal which is you just set the

[35:45] goal and it iterates until it reaches it

[35:48] or or as long as it makes progress

[35:49] towards it.

[35:50] >> Exactly. And so it's like if it's

[35:52] verifiable if you can measure this is

[35:54] auto research too. Auto research is like

[35:55] hey go make this model twice as fast and

[35:58] like it's just a prompt that tells the

[35:59] model to like go to it over and over

[36:01] again and try things until it actually

[36:02] has good results. So that's what I think

[36:04] of loops engineering. I don't know. We

[36:05] we do a very interesting kind of loops

[36:07] engineering where like the the challenge

[36:09] is like I think it's very easy to get

[36:12] very excited about building the thing

[36:14] that builds the thing or building the

[36:15] thing that builds the thing that builds

[36:16] the thing we talked about. Uh and so

[36:18] people say, "Oh, we need to like redo

[36:20] everything as this big like aentic first

[36:24] factory, maybe even a dark factory." And

[36:26] they're like redesigning their entire

[36:27] thing to be their infrastructure for the

[36:29] next 5 years. And I'm sure one thing we

[36:31] know of in engineering uh and especially

[36:33] uh pragmatic engineering is uh how can

[36:36] you make this more incremental? How can

[36:37] you make it more continuous? Uh and a

[36:39] lot of people don't have the option to

[36:41] just hey I ran a Ralph loop for 3 days

[36:43] and it fixed every line error in our

[36:45] codebase. Here's a 60,000line PR. Who

[36:48] wants to review it and who wants to sign

[36:50] off on merging and deploying it and uh

[36:52] that there's not going to be any bugs?

[36:54] Nobody. So I think the the thing I'm

[36:56] most excited is actually like what we

[36:57] call like iterated loops or like slow

[36:59] loops where we basically have a cron

[37:01] job. We have the loop the the the

[37:03] structure of the loop is really easy.

[37:04] It's like run this llinter fix one thing

[37:06] commit and push and then we run that

[37:08] every night in our GitHub actions and we

[37:11] wake up every morning to one PR that

[37:12] makes the codebase a little bit better.

[37:15] >> I I like the slow loops.

[37:16] >> Yeah. And it has two dimensions. So you

[37:18] can add now we have a blueprint for it

[37:20] and actually Kyle just shipped a skill

[37:21] so that you can build these yourself.

[37:23] you can add more like feedback

[37:25] mechanisms. So, we have React Doctor for

[37:27] the front end. We have another

[37:28] anti-attern that has no deterministic

[37:30] tooling, but Kyle's just like, "Here's

[37:32] what good looks like. Here's what bad

[37:33] looks like. Go fix one thing and bring

[37:34] it back." It's like prop narrowing

[37:35] basically. We have a bunch of optional

[37:37] props and most of them don't need to be

[37:38] optional. It's like here's how to make

[37:39] the prop not optional so that you know

[37:41] that the code just is like cleaner and

[37:43] easier to reason about. And so, you can

[37:44] add more conditions, more things of like

[37:47] fix one thing. I want to wake up to a

[37:48] PR. So, now we wake up to like four PRs

[37:50] because there's four separate things.

[37:52] And then the other dimension you can do

[37:53] here is as you gain confidence, you can

[37:56] increase the scope. Instead of fixing

[37:57] one thing, fix four things. And so these

[37:59] are like other ways to think about loops

[38:01] where it's like something that's not a

[38:03] human triggers it to start. Whether

[38:05] it's, you know, an alert from Sentry,

[38:08] whether it's a user feedback like

[38:10] support ticket, whether it's PM writes a

[38:13] ticket, whether it's a test is failing,

[38:16] any of or it's a cron, it runs on a

[38:17] schedule, but it's like the trigger

[38:19] should be something that you don't have

[38:20] to like press a button on and there's a

[38:22] defined workflow and it makes everything

[38:24] a little bit better. Dex just described

[38:26] letting agents fix things without a

[38:28] human pressing a button. But what if a

[38:30] bug is too difficult not just for an

[38:31] agent but also for human to reproduce

[38:34] let alone fix? This is where presenting

[38:36] sponsor anticysis comes in. I was

[38:38] recently pairing with the antithesis

[38:39] team where we did a walkthrough of how

[38:40] they helped fix a nasty bug inc the open

[38:43] source key value store used by

[38:44] Kubernetes. This is a bug that actually

[38:47] happened incd. The team noticed that the

[38:49] linearization validation assertion

[38:51] failed during the regular anticis runs.

[38:53] This is not good because the

[38:54] linearization guarantees strong

[38:56] consistency. So this needs to be fixed.

[38:58] So what the ETCD team did was run a

[39:00] casualty analysis inside anticysis. This

[39:03] generates this graph which is a bug

[39:05] probability graph. Here the x-axis is

[39:08] virtual time and the y-axis is

[39:11] probability. Now we see that something

[39:13] happened just before virtual time 24

[39:15] that caused a huge jump in the

[39:17] probability that the bug would occur.

[39:19] Going deeper, we can look at the entire

[39:21] set of timelines. Vertical lines going

[39:23] down represent events branching off from

[39:25] the same state and the purple dots are

[39:27] where the buck happens. If we look

[39:29] closely enough, we see that all of the

[39:31] failures come from one parent branch.

[39:33] Gotcha. This is such a useful debugging

[39:36] tool. In the end, the team was able to

[39:37] figure out that process pauses were

[39:38] causing the bug using all these anticis

[39:40] debugging tools. This non-deterministic

[39:43] bug was diagnosed in a deterministic

[39:45] way. How cool is that? Oh, and this is

[39:48] an actual bug that then got fixed incd.

[39:50] You can see the bug and the fix in

[39:51] ATCD's GitHub repo. Honestly, the tools

[39:54] that Antys is built for debugging feel

[39:56] pretty darn futuristic, but they are

[39:57] also really powerful. Head over to

[39:59] antithesis.com/pragmatic

[40:01] to learn more. I'd also like to talk

[40:02] about our season sponsor, Sentry. Sentry

[40:05] is a tool I use for application

[40:06] monitoring on all of my projects,

[40:08] including their pragmatic engine back

[40:09] end. I've used it for 10 years now,

[40:11] starting with when I worked at Uber. A

[40:13] neat Sentry feature I'm liking is their

[40:14] SE AI agent, which helps investigate

[40:16] production errors. For example, here's

[40:18] an actual error I had in my application.

[40:20] I can just ask Seir what might be the

[40:22] root cause and it brings context. And it

[40:24] can also make a plan to fix it right

[40:26] from the web interface. And a nice thing

[40:28] is how Seir also works great from Slack

[40:29] as well, not just from the web. One

[40:31] place I find even more handy to use

[40:33] Sentry is from codeex or clock code

[40:34] using Sentry MCP. Also, you can set up

[40:36] neat automations like when a resolve

[40:38] sentry issue resurfaces. You can kick

[40:40] off a cursor agent or GitHub copilot

[40:42] agent to investigate the regression,

[40:44] read the relevant code, and open a PR

[40:46] with a suggested fix. I'm not a fan for

[40:48] using AI tools just for the sake of it,

[40:50] but I really like the practical

[40:51] integrations where I can fix errors

[40:53] faster and with more context. Check out

[40:55] Sentry at centry.io/pragmatic

[40:57] and start monitoring and fixing

[40:59] regressions today. And with this, let's

[41:01] get back to Dex and to Agentic loops

[41:03] that trigger themselves. Now, you said

[41:05] we can get more ambitious and we can add

[41:08] more things to it, but I'm I'm going to

[41:09] quote you with uh with one of your

[41:11] tweets which says, "This may surprise

[41:14] you that this is coming from me, but I

[41:16] think we're in for a 1 to three year

[41:18] period where stuff might break at 3:00

[41:20] a.m. and you're relying on loops to fix

[41:21] it and nobody understands what's under

[41:23] the hood, and you're looking at an ex

[41:25] existential threat to your company."

[41:27] >> Yes. Uh yeah, that one was great. That

[41:29] one did a lot of numbers. Uh [laughter]

[41:32] >> it resonated. Here's the other side of

[41:33] it is like I think that the today with

[41:36] today's models, today's programming

[41:38] languages, today's infrastructure, you

[41:40] might get away with not reading the

[41:43] code. Problem with loops is like at a

[41:44] certain point you're going to generate

[41:46] so much code that you can't read it

[41:47] anymore. This is the strong VM dark

[41:49] factory. This is like Ryan Leopo's like

[41:52] harness engineering. Just spend as many

[41:53] tokens as possible. We tried this. We

[41:55] built a lights off software factory in

[41:58] July of 2025 and by November we had shut

[42:01] it down. I think it takes about three to

[42:02] six months of you shipping all the time

[42:04] with nobody reading the code before you

[42:06] realize like, wow, this is getting way

[42:08] worse and it's easier to start over than

[42:09] it is to fix it. Like the models have

[42:11] made the codebase so bad that it is

[42:13] actually going to be easier to just like

[42:14] rethink this from scratch. And maybe

[42:16] that's okay because we have AI and it's

[42:17] easier to rebuild things from nothing.

[42:18] And like usually when engineers say

[42:20] like, "Oh, we can't fix this. We have to

[42:22] rebuild it." The feedback is like, "No,

[42:23] just refactor in place. Just constantly

[42:25] keep the codebase getting better." You

[42:27] mentioned what I said. You'll notice

[42:28] what I said was not use loops to ship

[42:30] the features that users want. We use

[42:32] loops to actually improve the codebase

[42:33] quality and we read all the code because

[42:35] we care about how it's architected and

[42:37] we care not just about the system

[42:38] architecture but what I would call the

[42:40] program design which I think is

[42:42] something people are going to where are

[42:43] the interfaces where are the seams how

[42:45] are we doing dependency injection all of

[42:46] these things that like make your

[42:48] codebase more maintainable over time and

[42:50] keep you from falling into this trap of

[42:54] like okay well now if I change something

[42:55] over here I broke something over here.

[42:57] This is the classic problem of software

[42:58] engineering that like software

[42:59] engineering was invented in the 1970s

[43:02] because we realized we needed techniques

[43:04] for avoiding that problem of like this

[43:07] giant ball of spaghetti. And I don't

[43:09] think the models are smart enough and I

[43:11] don't think we actually have the

[43:13] training and the benchmarking and the

[43:14] eval techniques to get models to write

[43:18] code that is more maintainable over time

[43:20] versus they're all trained on SWE and

[43:22] SWEBench looking things, right? All of

[43:24] the benchmarks are basically like here's

[43:26] a commit in Django. Here's an issue that

[43:29] was filed around that time. see if you

[43:32] can create the fix that the human

[43:33] created. And it's Django and it's Apache

[43:35] and it's there's a hundred repos in Go

[43:37] and C++ and Typescript and Java and all

[43:39] these different languages, but they're

[43:40] all it's like the problem with training

[43:42] models on maintainability is like the

[43:45] cost function of bad architecture and

[43:47] bad program design can't be evaluated by

[43:49] running the unit test because it hits

[43:51] you 3 to 6 months later when you're

[43:53] like, "Holy crap, like no one can make

[43:54] it's this software has become so hard to

[43:56] change." Is this not similar to how

[43:59] senior software engineers why it took

[44:02] years for someone to become a senior?

[44:04] Because typically and in some

[44:06] environments you became a you can become

[44:07] a senior faster typically fast moving

[44:09] where there's a bunch of issues and you

[44:11] have to keep fixing it. Sometimes you

[44:12] know some people are working in the same

[44:13] place for 10 years and they're still not

[44:15] that level. The point was it it just

[44:17] takes time for you to understand the m

[44:19] the small mistake that you make right

[44:21] now that snowballs into like something

[44:22] disastrous later and you get hit by it

[44:26] and you realize like okay things like

[44:28] you know like testing matters

[44:29] architecture matters tech depth can

[44:31] actually be a killer you know we don't

[44:32] talk about it anymore but we used to

[44:33] talk about how techdub kills or slows

[44:36] down companies so badly preai that their

[44:39] competitors can overtake them or they're

[44:41] just like stuck with a 2-year refactor

[44:43] not shipping any new features and the

[44:44] competition you shifts a bunch bunch of

[44:46] other stuff and now they're ahead.

[44:48] >> And I I will say like it is possible

[44:50] that GPT7 will fix this, but if you are

[44:53] turning the lights off in your software

[44:55] factory and you're saying like, "Hey,

[44:58] you know what? Like we're not going to

[44:59] read the code. It's fine. The models are

[45:00] smart enough. If we give it the right

[45:01] feedback and just throw enough tokens at

[45:03] the problem, it will keep getting

[45:05] better." This is what led to this tweet.

[45:07] that might work, but if nobody read the

[45:09] code in three months and you replace all

[45:11] of your all of your like code review

[45:13] with loops of like, hey, if a user

[45:14] complains, we give it to an agent. If

[45:16] something crashes, we give it to an

[45:17] agent. If a if a PM writes a ticket, we

[45:19] give it to an agent. If a CEO writes an

[45:21] obnoxious essay about what we should be

[45:22] building in Slack, we give it to an

[45:24] agent.

[45:24] >> Yeah. [laughter]

[45:25] >> And then you stop reading the code

[45:26] because that's going to produce way too

[45:28] much. Like, no one can read it. And like

[45:29] the the the PR reviews become the

[45:31] bottleneck. So, you replace that with

[45:32] aentic testing and agentic uh agentic

[45:34] code review. Uh, but none of these

[45:36] things have intuition for software

[45:38] architecture because we haven't trained

[45:40] it in yet. And so you're going to wake

[45:41] up one day and you're going to have an

[45:42] issue with this happened to us and like

[45:44] we got through it and at the time like

[45:45] it was still worth it. It was like spent

[45:47] 3 weeks onboarding back into the

[45:49] codebase that we had stopped reading 3

[45:51] months ago because no matter how much

[45:53] sophisticating expert prompting we could

[45:55] not get Opus, I think it was Opus 4.1 at

[45:57] the time. We could not get Opus 4.1 to

[46:00] actually find the root cause. We had to

[46:01] go spend several days digging through

[46:03] the code and figuring out like, oh,

[46:05] there's just actually a primary key

[46:06] that's being routed through this whole

[46:07] thing that needs to be changed to a

[46:09] different type of object and it needs

[46:10] it.

[46:11] >> This actually happened to you.

[46:11] >> This happened to us. Yeah.

[46:13] >> And when it happened, I was like, you

[46:14] know what? That sucked. That was

[46:15] terrible. But we did it. We solved it.

[46:17] And uh it's still worth it's still worth

[46:19] not reading the code for most of the

[46:21] time at the cost of every once in a

[46:23] while I'm going to have to spend two

[46:24] weeks fixing an issue by hand. And I

[46:26] don't believe that anymore because I

[46:27] think the amount of code we're able to

[46:29] write now is actually like 10xed or

[46:30] 100xed and I think the problem's just

[46:33] getting worse.

[46:34] >> So let's talk about software factories.

[46:36] Yeah.

[46:36] >> In your mind, cuz I feel it's an

[46:38] overloaded word, but what do you think

[46:40] of a software factory before AI and now

[46:43] post AI?

[46:44] >> Do you know the first definition of

[46:45] software factory the first time it was

[46:47] used?

[46:47] >> No. It was a NATO conference in 1968.

[46:50] >> Oh, Grady Buch would know about this.

[46:52] >> Yeah, exactly. Yeah, great. You should

[46:53] ask Grady about it. They talked about

[46:54] the idea of like, okay, you actually

[46:56] need to build a system of steps and like

[46:58] just like a factory floor. You have like

[47:00] the coding part and the testing part and

[47:03] the validation part and the integration

[47:05] part. We had no CI/CD. we barely had

[47:07] version control like but you needed a

[47:09] factory and then it was adopted by like

[47:11] um Toshiba and a bunch of companies and

[47:14] then the the next moment was like DevOps

[47:16] and you have like this idea of like okay

[47:18] we're going to do CI/CD we're going to

[47:19] automate we're chef and anible puppet

[47:21] whatever all these technologies is like

[47:23] instead of having dudes running around

[47:24] data centers like resizing discs and

[47:26] stuff or clicking around the AWS console

[47:29] yeah exactly it was like cool we build

[47:31] loops the server hits 90% disc space

[47:34] that sends an alert to Nagios Nagios

[47:35] triggers a chef front chefs makes the

[47:37] disc the disc bigger feedback loops,

[47:39] right? This has been around for a while.

[47:41] And in 2018, I want to say this guy Nick

[47:44] Chalane who was uh he was like the CTO

[47:46] or chie ch ch ch ch ch ch ch ch ch ch ch

[47:46] ch ch ch ch ch ch ch ch ch ch ch ch ch

[47:47] ch ch ch ch ch ch ch ch ch ch ch ch ch

[47:47] ch ch chief software officer of the air

[47:48] force, he wrote this 100page essay of

[47:52] hey the DoD needs a software factory,

[47:54] >> the department of defense.

[47:55] >> Yeah, the the department of defense and

[47:57] the air force. And he called it the dev

[47:59] sec ops factory. And he said we need all

[48:01] the things that all of the good

[48:03] enterprises are using. We need Jenkins.

[48:05] We need like code quality scanning. We

[48:07] need security scanning. We need CI/CD.

[48:09] We need to be able to ship. We're

[48:11] shipping once every three months or once

[48:13] a year. We need to be able to ship every

[48:14] day like all these other companies. And

[48:16] the way we do that is we actually

[48:18] embrace all these automations and

[48:20] technologies so that engineers are are

[48:22] 90% of the issues are caught by

[48:24] automations instead of people actually

[48:26] like manually checking it or manually

[48:28] reading the code or manually integrating

[48:29] modules together.

[48:30] >> Wow. Talk about forward thinking in in

[48:33] the government.

[48:34] >> I know. Oh no, as I was surprised like

[48:36] oh nice like this is I mean and that was

[48:38] part of it is like hey look we're

[48:39] falling behind in like you know I don't

[48:41] know exactly all the reason but I I

[48:42] imagine also about like attracting

[48:44] really good talent is like hey look if

[48:45] we have like the modern software stack

[48:47] and we're building things fast and we

[48:49] care about efficiency and we care about

[48:50] people's using people's time well we

[48:52] care about them spending time on the

[48:53] hard parts of the job not manually

[48:55] looking for SQL injections like you

[48:57] could automate that. So this was

[48:58] software factories pre AAI.

[49:00] >> Pre AI.

[49:01] >> Now I've heard the term a lot more

[49:03] because of AI.

[49:04] >> Yeah.

[49:04] >> Is it the same? Is it different?

[49:06] >> So this is really hard to say without a

[49:08] drawing, but I'll try to draw it out. At

[49:10] the core of a software factory, you have

[49:12] like a source of work. Most you you can

[49:14] imagine a linear a Jira a the st source

[49:17] of truth your object whether it's a

[49:18] spreadsheet or whatever is you have like

[49:20] what stages is the work in.

[49:21] >> Yep. And prei you would take, you know,

[49:24] you would maybe do some architecture

[49:25] review planning. You would maybe do some

[49:26] sprint planning and then people would

[49:28] take tickets off the queue and they

[49:29] would go build them. And then you would

[49:31] make a pull request and people would

[49:32] review it and you would run CI checks

[49:34] and then you would send it to prod and

[49:36] then it would make contact with your

[49:37] users and your users would complain

[49:38] about stuff and that would go to your

[49:40] support team and back into your work

[49:41] tracker and it would crash and you would

[49:43] have issues and that would go into your

[49:44] monitoring stack and that would go into

[49:46] your tracker and that was your loop. And

[49:48] then people would take stuff off the

[49:49] tracker based on priorities. product

[49:51] managers, engineering managers,

[49:52] engineers prioritizing work and then we

[49:54] go and do that and the first change is

[49:57] is like this long wind lot lots of

[49:59] phases and this is also why when like a

[50:01] developer shifts a bug but by the time

[50:02] it comes back to you it might be two or

[50:04] 3 months or even longer and by the time

[50:06] it get fixed it might be a year or two

[50:08] and you know this is why when you're

[50:10] using a piece of software it's like that

[50:11] annoying bug and you talk with customer

[50:13] support but it's just a very like long

[50:16] latencies at each each part of the the

[50:19] factory if you will. Yeah. And the the

[50:21] step where someone pulls a work item off

[50:23] a queue and starts working on it is, you

[50:25] know, couple hours to a couple days

[50:27] before it actually gets integrated into

[50:29] everything else and touches user. And

[50:30] that's in a in a in a great world,

[50:32] right? Sometimes you go build it and

[50:33] then you merge it and then it actually

[50:34] gets released 3 months later. But we're

[50:36] going to assume we're in a fairly modern

[50:37] like we're somewhere like the a Netflix

[50:39] or a meta where engineers are capable of

[50:41] shipping 100 times a day or a thousand

[50:43] times a day, but it still takes 2 three

[50:45] hours to do the work. And now with an

[50:47] identic factory, what you do is you take

[50:48] out that person building the thing and

[50:50] you replace it with an agent building

[50:52] the thing. And so you have orchestration

[50:53] to trigger things. You have a sandbox,

[50:55] you have an LLM, you have an inner

[50:57] harness, you have an outer harness,

[50:58] which is like the dev environment you

[51:00] build for the agent. And maybe you give

[51:01] it a browser, you give it a video

[51:03] recorder if you use like things like

[51:04] cursor background agents. They've kind

[51:06] of built this outer harness around the

[51:07] inner harness that is the coding agent.

[51:09] And then you make PRs with that. problem

[51:11] there is that like okay now now it takes

[51:13] 10 minutes to do a build instead of two

[51:15] hours or two days and so now the

[51:17] bottleneck is code review so okay let's

[51:19] throw a bunch of AI agents at code

[51:20] review and let's do agentic testing so

[51:22] that like we can basically catch a lot

[51:24] of the easy stuff and humans are only

[51:26] focused on the most like important

[51:28] critical core parts of the codebase and

[51:31] then the next level up of your agentic

[51:32] factory is you do the top it's like okay

[51:34] then it gets deployed it goes to prod

[51:36] and a user complains you just hook your

[51:38] support queue right up to the agent

[51:40] someone complains about something agent

[51:41] tries to fix it and instead of looking

[51:42] at a ticket and then saying okay go send

[51:45] you just close that loop and instead

[51:46] every time something goes wrong you just

[51:48] get a PR and then every time something

[51:50] crashes in Sentry or Data Dog or

[51:52] whatever it goes into the tracker it

[51:54] gets picked up by an agent and you get a

[51:55] PR this is the ramp inspect thing this

[51:57] is the the only difference is like then

[51:59] you have so much code to review and

[52:01] people say well let's try turning the

[52:02] lights off let's just take all the human

[52:04] testing and review steps out and we'll

[52:06] say okay cool if users complain then

[52:08] it's broken and if users don't complain

[52:10] and it's working and we're not going to

[52:11] read the code. We're going to use we're

[52:13] going to treat the whole system as a

[52:14] black box.

[52:14] >> So, you said you tried this out uh when

[52:16] it was like Opus Formula and you you

[52:18] built the software factory was running

[52:19] beautifully until it just blew up on

[52:21] your faces. How do you think of this

[52:23] model? cuz I I can see an ideal world

[52:25] where it works, but clearly we're not in

[52:27] an ideal world. Like where do you think

[52:29] we are like and could some of this

[52:32] actually work at some point or you know

[52:34] like like what what progress are you

[52:36] seeing right now and and what is the the

[52:38] today the situation like how much of

[52:40] this do you believe we can automate or

[52:42] should we automate?

[52:43] >> Yep. So if you know me, you follow my

[52:45] stuff, you know I stand for three

[52:47] things. Number one is like cutting

[52:48] through the hype and the jargon and

[52:50] going trying things and talking to

[52:51] people who are using things and figuring

[52:53] out which parts of this actually work

[52:54] and are valuable. Number two, we talked

[52:56] about words. I try to find and protect

[52:59] useful bits of language because I think

[53:01] it helps us all move forward. And when

[53:03] you take a useful word like agents or

[53:05] you take a useful word like software

[53:06] factory and then you semantically

[53:09] diffuse it, this is another Martin

[53:10] Fowler word. You make it mean everybody

[53:12] likes the word and it all becomes hype

[53:13] and everyone starts agents means nothing

[53:16] anymore. agents could be a chatbot, it

[53:18] could be a Slackbot, it could be a

[53:19] coding agent, it could be tools in a

[53:21] loop, whatever it is. So, I like to

[53:23] protect important useful words and like

[53:25] help help us all like elevate the

[53:27] conversation out of that hype and

[53:29] jargon. And then I care a lot about

[53:31] going one level down beneath where I'm

[53:34] generally working. I think there's

[53:36] always this is the same thing with

[53:37] context engineering is like I was rarely

[53:38] actually going and like building LLMs or

[53:41] understanding or training LLMs but

[53:42] knowing how they're trained how

[53:43] transformers works informs how you build

[53:46] at one layer up and for the software

[53:48] factory my version of that is I spent

[53:50] the last couple weeks going really deep

[53:52] on uh reinforcement learning with uh

[53:55] verifiable rewards RLVR which is like

[53:57] this very productionized like it's not

[54:00] like RH RHF is still like fairly

[54:03] academic and pure RLVR are is this like

[54:06] it's a machine in these labs of how we

[54:08] train these models and I'm studying like

[54:10] the benchmarks for coding agents and the

[54:12] techniques for training them and how we

[54:14] like give it a small problem have it

[54:16] solve it delete the test changes it made

[54:18] revert them apply a test patch see if it

[54:20] passed and then even the frontier this

[54:22] year we have like we can get into this

[54:23] later but like frontier code and

[54:25] marathon these new benchmarks that are

[54:27] supposed to be like better at evaluating

[54:29] models's ability to maintain a codebase

[54:31] over time and write maintainable code um

[54:34] and they are better But I don't think

[54:35] they're sufficient. But it's basically

[54:36] this idea that like the only thing that

[54:39] made claude code good was reinforcement

[54:41] learning. And the dimension along which

[54:44] it got good was like we made a model. We

[54:46] trained the model and the harness

[54:47] together. And so the model got really

[54:49] good at calling the specific tools in

[54:52] that harness. Really good at reading

[54:53] files, writing files, searching for

[54:55] files, all this stuff through doing

[54:56] these problems. And that was what made

[54:58] it feel so much better than all the

[55:00] other CLI coding agents that came before

[55:02] it. And so people like, "Okay, that was

[55:04] so much better." And they're just going

[55:05] to keep getting better. But it's like it

[55:06] got really good in one dimension. And

[55:09] the dimension that they're not getting

[55:10] better in because it's hard, expensive.

[55:13] Maybe we need to like get a lot more

[55:15] creative with how we design these these

[55:17] verifiers and benchmarks is in how do I

[55:20] make code that in three months is going

[55:22] to like improve the productivity of

[55:25] humans and agents, mostly agents, but

[55:26] humans and agents in the codebase

[55:27] instead of making it worse over time.

[55:29] >> And so you think that part is just

[55:31] missing? We haven't seen too much

[55:34] improvement.

[55:34] >> I haven't seen obviously no one knows

[55:36] what the labs are doing internally cuz

[55:37] it's all very secret. But I think if we

[55:39] looking at where the bench the

[55:41] benchmarks tend to reflect where the

[55:44] labs are, right? If there is no

[55:46] benchmark that can convey to me did this

[55:49] model write code that is going to make

[55:51] my codebase better or worse. The best we

[55:52] have is I I think frontier code from the

[55:54] cognition team is really interesting.

[55:56] They have like did the test pass and

[55:58] then they have like two layers of model

[56:01] review. So they have a judge model that

[56:02] checks okay is the patch the model made

[56:05] similar to the patch that is like the

[56:06] golden answer set. So even if the model

[56:09] didn't write the exact code that the

[56:10] benchmark was expecting did was it

[56:13] functionally equivalent and the next one

[56:15] is like a like code quality review from

[56:17] another judge model and like that's

[56:20] better but it's not it's not sufficient.

[56:23] And this is why I also think agentic

[56:24] code review is like yes it will catch

[56:26] things and it will raise your floor but

[56:28] I don't believe like the model writing

[56:29] the code is the same model reading the

[56:31] code and if you ask a model hey is this

[56:32] code good it's going to be like oh yeah

[56:34] it's great comprehensive it's got unit

[56:36] tests you've tried this I'm sure and you

[56:38] say okay review this PR that my coworker

[56:40] wrote and tell me everything that's

[56:41] wrong with it I was like oh it has this

[56:43] problem and this problem and this is

[56:44] this is sickopantic and they want to

[56:45] tell you what you want to hear and so

[56:47] like it's really hard for me to trust a

[56:48] model to evaluate the quality of of of

[56:52] code that's written And so I I I have

[56:54] some ideas on like, okay, can you build

[56:55] a benchmark where the model builds 20

[56:57] features in a row and maintains the

[56:59] codebase the whole time and it doesn't

[57:00] know what features are coming. You treat

[57:02] it like a real product team where you

[57:04] don't know what you're going to build

[57:04] next week until you get there and you

[57:06] find out what's most important and then

[57:08] can we try to evaluate like can we build

[57:11] a problem like that that's hard enough

[57:13] that most frontier models fail by issue

[57:15] six or seven. Is it fair to say that you

[57:18] know like we've had the software factory

[57:20] like before AI it was just like lots of

[57:22] loop it was like the the PM giving the

[57:25] ticket to the dev the dev building it

[57:27] deploying to production user customers

[57:30] using it customer support getting

[57:31] tickets and then you creating PM

[57:34] triaging and it kind of goes around like

[57:36] in this loop is it fair to say that the

[57:39] software factory of how a company a team

[57:42] builds and maintains software that is

[57:44] changing because now everyone's

[57:45] replacing some parts of it, you know,

[57:47] maybe the the least advanced teams will

[57:49] just be devs are starting to use cloud

[57:51] code or codecs to write faster. They're

[57:54] not spending as much time on there. Some

[57:56] others are also having the deployment

[57:57] the feedback. Some some actually have

[57:59] the agents already oneshotting bucks. So

[58:03] like is it fair to say that that the

[58:04] software factory is just is just

[58:05] changing everywhere maybe at different

[58:07] speeds but everyone I think every team

[58:09] who is building production software

[58:11] they're like they're frantically

[58:13] experimenting trying and everyone's at a

[58:15] different pace. You'll have the AI

[58:16] native starters where most of this will

[58:18] have agents in them and you'll have the

[58:21] the laggers who are or more more

[58:23] cautious ones. They have agents in a few

[58:24] places but not in the others. Well, and

[58:26] I think that's the key is like if you

[58:28] want to do loops engineering, you should

[58:29] build one loop at a time and you should

[58:31] keep them small and contained.

[58:33] Basically, I think everything except

[58:35] stop reading the code is really good

[58:37] advice. Take support tickets and turn

[58:39] them into tickets in your system and

[58:41] then maybe turn those into PRs. Great.

[58:43] The advice that I have and like what we

[58:45] kind of like are chasing at human layer

[58:46] is like how can I add another checkpoint

[58:49] in that factory? So instead of having

[58:51] one human re view point where you're

[58:53] reviewing PRs and sometimes they're 100

[58:55] lines and sometimes they're a thousand

[58:57] lines but it's quite a lot of effort for

[59:00] especially if it's bad especially if it

[59:01] needs rework. It's quite a lot of effort

[59:03] for a human to be like okay this is

[59:05] wrong go change it in this way and then

[59:06] you loop back to the agent and then you

[59:08] come with another one and like doing a

[59:09] lot of loops on there once once the

[59:11] direction has been committed to it's

[59:12] really hard to steer off like you're

[59:14] better off just kind of restarting from

[59:15] scratch. How do you build like controls

[59:18] and mechanisms around that? And then my

[59:20] take is like if you do a little bit of

[59:22] human agent planning and like discussion

[59:25] before you hand it to the impletor

[59:28] whether it's I mean planning and specs

[59:29] whatever you want to call it again this

[59:30] is spec driven development is another

[59:32] word that has become kind of very like

[59:34] muddled as far as what it means but

[59:36] basically how can we spend an hour

[59:39] before we start building so that the PR

[59:42] when we read it only takes 20 minutes

[59:44] because the code is perfect instead of

[59:46] not touching it just literally saying

[59:48] every user reported issue becomes a PR

[59:50] through the loop and then we read that

[59:52] PR and it takes six hours because

[59:54] there's back and forth and we have to

[59:55] make changes and things. It's all I'm

[59:56] all about like let's find leverage. And

[59:58] so you basically you have three options

[1:00:00] in the software factory world. If you're

[1:00:02] going to go all in on aentic software

[1:00:03] factories, you can turn the lights off

[1:00:06] and just let everything flow and pray

[1:00:08] that you don't create too much slop and

[1:00:10] pray that the next generation of models

[1:00:12] comes fast enough before you create a

[1:00:14] giant pile of ash. you can slow way down

[1:00:17] and read every PR and read every line of

[1:00:19] code. Uh, and then you're only going to

[1:00:21] really get modest benefits from AI

[1:00:23] because that becomes I I think you

[1:00:24] should expect maybe 30 to 50% lift in

[1:00:27] productivity is kind of what I see when

[1:00:28] we go into teams

[1:00:30] or you can find the right leverage

[1:00:33] points where humans can actually an hour

[1:00:36] spent over here in planning can save you

[1:00:39] four hours in in implementation in terms

[1:00:41] of fixing and going back and and getting

[1:00:43] the design right. And that's what I call

[1:00:45] like seeking leverage. If you can find

[1:00:47] the right leverage points for the agents

[1:00:48] to guide the work, then you can actually

[1:00:51] move like two to three times faster

[1:00:53] while maintaining a like 99% like

[1:00:56] accuracy to like if the humans were

[1:00:58] carefully writing this code by hand, how

[1:01:00] would it come out?

[1:01:01] >> Now jumping a little bit back to ideas.

[1:01:03] I will come back to this. This was

[1:01:05] earlier maybe it was last year but you

[1:01:07] had the research plan implement. Can we

[1:01:09] talk about the original research plan

[1:01:11] implement framework and then also what

[1:01:12] you've learned about this approach? what

[1:01:14] what you got wrong about it.

[1:01:16] >> Yeah, sure. Yeah. So, um I mean the

[1:01:18] first time we talked about RPI was in

[1:01:19] August of 2025. Um and it was basically

[1:01:22] like the research was this thing of

[1:01:24] like, hey, before you go build anything,

[1:01:26] go read lots and lots of code. Use a

[1:01:28] bunch of sub aent sub aents in parallel,

[1:01:30] understand all the code. It was this

[1:01:32] technique that like worked really well

[1:01:33] for hard problems in complex code bases.

[1:01:35] You just ask Claude uh to do a thing

[1:01:37] that that's it would read three files

[1:01:39] and make a change. It would have no

[1:01:40] context. So, you start the research. You

[1:01:42] don't even tell it what you're working

[1:01:43] on. You just tell it, "Hey, can you tell

[1:01:46] me how this system works and this system

[1:01:48] and how they connect together and then

[1:01:49] you get a markdown dock out and this is

[1:01:51] the context engineering part is like

[1:01:52] that would take a 100,000 tokens of

[1:01:54] context, but you would get a 10k token

[1:01:56] dock out of it that summarized it. Then

[1:01:58] you would start a new context window and

[1:02:00] you would do planning and the planning

[1:02:01] would be and actually realize like the

[1:02:03] plans that we were building last summer

[1:02:05] were actually terrible. But it would

[1:02:06] basically be this long. You would say,

[1:02:08] "Okay, now here's what we're building.

[1:02:09] Here's the research doc. build a plan to

[1:02:11] implement it. And uh in retrospect, now

[1:02:14] that we see like everyone is obsessed

[1:02:16] with how do I get agents to work for

[1:02:17] longer, I think the reason why in like

[1:02:20] May, June, July, August of 2025 that a

[1:02:22] lot of people became really interested

[1:02:24] in planning was it was a very powerful

[1:02:28] lever to get agents to work for longer.

[1:02:31] If you said, "Build me a B2B SAS for uh

[1:02:34] burrito delivery," you'd get like a

[1:02:36] homepage and that's it. But if you said,

[1:02:37] "Build me a plan," it would build out

[1:02:39] this big plan. And then in the next

[1:02:40] context window, you'd say, "Hey, here's

[1:02:42] the plan. Here's all the changes we're

[1:02:43] going to make. Go imple it would

[1:02:45] actually keep going until the plan was

[1:02:46] done." So the plan was a really good way

[1:02:47] to anchor an agent and remind it that

[1:02:50] like, hey, you're not done until this is

[1:02:52] all finished. So that was the original

[1:02:53] RPI. And the plan doc, what was bad

[1:02:55] about it is it didn't give you leverage.

[1:02:56] The plan was every single line of code

[1:02:58] that was going to change like in diff

[1:03:00] blocks and like all the new stuff to

[1:03:02] write. And so like people would review

[1:03:04] these plans. We recommended this. We

[1:03:06] told people to read the plans. We read

[1:03:07] all our plans. And then eventually I

[1:03:09] found myself like I just kind of skimmed

[1:03:11] the plans. And so you're not really

[1:03:12] using it as a way to resteer the agent.

[1:03:14] It's just kind of there. And then you go

[1:03:16] write the code and there's a crap. Some

[1:03:18] people would review the plans and the

[1:03:20] code and it's like okay well the plan

[1:03:21] was took you 20 minutes to read and then

[1:03:24] the pull request takes you 20 minutes to

[1:03:25] read and they're different. And so you

[1:03:26] actually doubled the amount of time

[1:03:27] you're spending reading code instead of

[1:03:29] like doing less of it. You've anti-

[1:03:31] leverage. And hang on was spec different

[1:03:33] development not related to this the one

[1:03:36] that Amazon Kira for example and and

[1:03:38] GitHub workflows again a year ago did

[1:03:40] which was it also it first generated a

[1:03:43] plan and it had the human review it and

[1:03:45] then it started to and you could edit it

[1:03:47] as well and then it went off and

[1:03:48] implement this part and it it looked

[1:03:50] beautifully on the surface. It it should

[1:03:51] have worked great but it's tossed into

[1:03:54] the garbage outside of some m some

[1:03:55] maintenance projects. I I think it just

[1:03:57] didn't work. like all all the feedback I

[1:03:59] got, people just stopped using it

[1:04:00] because it just didn't really work that

[1:04:02] well. It just rhymes to the RPI

[1:04:04] framework a little bit, the original

[1:04:05] one, right?

[1:04:06] >> Well, so our thing too, like the biggest

[1:04:08] difference between RPI and specri

[1:04:09] development and some people refer to RPI

[1:04:12] as specriven dev because for some people

[1:04:14] SD all it means is I use a bunch of

[1:04:17] markdown files while I'm coding and

[1:04:19] forget what's in them. I just specri

[1:04:21] those are my specs and I'm using them to

[1:04:22] drive development. There was this OpenAI

[1:04:24] researcher who talked about specri dev

[1:04:26] and like hey stop reading the code just

[1:04:28] write the specs and treat like the

[1:04:30] coding part as compiling specs into

[1:04:33] code. that part never really

[1:04:35] materialized. Maybe with GPT7, you know.

[1:04:38] Um, but the challen I'm on a GitHub

[1:04:40] issue in specit uh that has been open

[1:04:43] for a year and every couple weeks I get

[1:04:45] there's a new email on the thread of

[1:04:46] people complaining about this problem of

[1:04:47] like, okay, I edit my specs and then I

[1:04:49] edit the code and then the code drifts

[1:04:51] and the specs how do I keep the specs up

[1:04:53] to date as the code is changing and it's

[1:04:54] basically like you now have two sources

[1:04:56] of truth and it's it stops being useful.

[1:04:59] And so like that's why when RPI the idea

[1:05:01] of the docs is they were all for a while

[1:05:02] we kept them around but after two or

[1:05:04] three months we're like oh these are

[1:05:05] actually like tactical execution docs. I

[1:05:08] do the research I do the plan I do the

[1:05:09] implementation I throw the docs out and

[1:05:12] the next time I need research I just do

[1:05:14] it from scratch because tokens are cheap

[1:05:15] and my time is expensive and the amount

[1:05:18] of time I might waste if I reuse a

[1:05:20] research that is no longer in sync with

[1:05:22] the real state of the codebase. So we

[1:05:24] just create it live every time. This is

[1:05:26] why it's like context engineering still

[1:05:27] matters. Creating artifacts that

[1:05:29] compress the state of the codebase and

[1:05:31] compress the intent of the builder into

[1:05:33] small things that can be reused in the

[1:05:35] future for the scope of a task is like a

[1:05:38] very powerful like tactical approach,

[1:05:41] but it's not a thing like I I have very

[1:05:43] few opinions on like what sorts of docs

[1:05:46] that you should leave lying around your

[1:05:47] codebase that are like evergreen. I've

[1:05:49] seen people try to maintain parody

[1:05:51] between documentation or specs and the

[1:05:53] code itself and I don't think anyone

[1:05:56] actually like found it very useful. Like

[1:05:58] you can do it and it works but it's like

[1:05:59] the ratio of the effort it takes to keep

[1:06:01] them up to date and the and trivially

[1:06:04] you could do this with AI probably but

[1:06:05] I've never known anyone who was like

[1:06:06] yeah this is great and we're glad we

[1:06:08] have it. Like you could do it and it

[1:06:09] might help but I I don't think anyone

[1:06:11] found it useful enough to like maintain

[1:06:12] a system to keep the specs and the code

[1:06:14] in sync versus just using the code as

[1:06:16] the source of truth always. Now you

[1:06:18] mentioned something interesting which is

[1:06:19] with context engineering you need to

[1:06:21] sometimes compact and you've previously

[1:06:24] co talked about intentional compaction

[1:06:26] that when context is noisy deliberately

[1:06:28] compress the useful part into a clear

[1:06:30] like markdown artifact verify it and

[1:06:32] then start a fresh conversation. Can we

[1:06:34] talk about this kind of compaction and

[1:06:36] why it's important and and it sounds

[1:06:39] like it's going to be a building block

[1:06:41] where it already is for context

[1:06:42] engineering, right?

[1:06:43] >> Yeah. No, frequent intentional

[1:06:44] compaction is the building block. It is

[1:06:47] it is completely comes from context

[1:06:49] engineering is context engineering is

[1:06:51] like how do we get the most out of

[1:06:52] today's models? How do we change what

[1:06:54] we're putting into the model into the

[1:06:55] context window into the agentic chat?

[1:06:57] How do we control that in such a way

[1:06:59] that we get the best results possible

[1:07:00] which means doing as much work as

[1:07:02] possible in the smart zone the you know

[1:07:04] first 100,000 tokens of the context

[1:07:06] window. And uh this intentional frequent

[1:07:09] intentional compaction is basically like

[1:07:11] okay the research step we're going to go

[1:07:12] read a bunch of code and turn it into a

[1:07:14] doc. That's our compaction. We take that

[1:07:15] forward in the next session. We're going

[1:07:17] to read we're going to read the ticket

[1:07:19] and the intent and turn that into a

[1:07:21] design document that we call is like

[1:07:22] okay here's the highle spec of what we

[1:07:24] want to do. Here's a high level like

[1:07:25] current state desired end state and then

[1:07:27] a bunch of design questions the model

[1:07:29] has kind of like a very thorough maybe

[1:07:31] even overengineered like plan mode. And

[1:07:34] then you take the research and the

[1:07:36] design and you do a new session, new

[1:07:38] context one. You're like, cool. You

[1:07:39] you've compressed the intent and you've

[1:07:41] compressed the state of the codebase so

[1:07:42] that you can then do your planning of

[1:07:44] like, okay, we know what the end state

[1:07:45] looks like. We know where we're going.

[1:07:48] Now, let's break down how we're going to

[1:07:50] get there. All of these different steps

[1:07:51] of the process exist because models have

[1:07:54] shortcomings in each of these phases.

[1:07:56] So, the research is pretty hands-off. I

[1:07:58] don't read the research docs. It's just

[1:07:59] like go read a bunch of code and then

[1:08:00] like make a doc out of it. Models are

[1:08:02] pretty damn good at that. If you ask it

[1:08:04] to find a bug and have opinions about

[1:08:06] the codebase, that's different. But if

[1:08:07] you just ask it what is the intent and

[1:08:08] how do this stuff fit together, uh

[1:08:10] that's usually pretty straightforward.

[1:08:11] But designing the end state of the of

[1:08:14] the software, the architecture and the

[1:08:16] program design, models are not great at.

[1:08:18] They make a lot of like they make

[1:08:19] decisions and sometimes they're right

[1:08:20] and sometimes they're wrong. So we have

[1:08:21] want to have a human in the loop there.

[1:08:23] And then the steps to get there, I we

[1:08:25] talked about this before, but models

[1:08:26] love making what I call like horizontal

[1:08:29] plans. If you ask a model like build a

[1:08:31] plan of steps to go build this app, it's

[1:08:32] like cool. We're going to do the

[1:08:33] database and then we're going to do the

[1:08:34] services layer, then we're going to do

[1:08:35] the API and then we're going to do the

[1:08:36] front end. It's like, well, that

[1:08:37] actually kind of sucks because we're

[1:08:39] going to be on the other side of 2,000

[1:08:40] lines of code and let's imagine this is

[1:08:42] an existing codebase, right? We're going

[1:08:43] to make changes to all these different

[1:08:44] parts of the system. I can't test it

[1:08:46] till the end. And so what I would do is

[1:08:47] like, okay, how would I have built this

[1:08:49] if I were building by hand? Well, okay,

[1:08:50] I would probably create a mock API

[1:08:52] endpoint with fake data. And then I

[1:08:54] would go kind of get the front end kind

[1:08:55] of how I want it to look. And then I

[1:08:57] would actually go like build a services

[1:08:59] layer and actually wire the data

[1:09:01] through. And then I would make a

[1:09:02] database migration and make my new

[1:09:03] table. And then I would actually add a

[1:09:05] lot of business logic. And then I would

[1:09:08] add a bunch of error handling. And it's

[1:09:09] completely orthogonal to how model like

[1:09:11] models would write the database layer

[1:09:12] and all the error handling without ever

[1:09:14] like anyone's ever touched or seen the

[1:09:15] code or whatever it is. And so this is

[1:09:17] another place where we like we like to

[1:09:18] have humans involved because humans have

[1:09:20] really good taste and judgment. Like I

[1:09:22] would rather read five separate little

[1:09:25] mini diffs of like things that I can

[1:09:27] manually verify and explore than read

[1:09:30] 2,000 lines of code and be like well

[1:09:31] it's not working. I don't know where.

[1:09:33] You don't know where cuz you wrote the

[1:09:34] code. You were supposed to get it right.

[1:09:36] We talk about compaction context

[1:09:37] engineer. It's like how can you stay in

[1:09:39] the smart zone of the context window

[1:09:40] which is again the dumb zone. I will say

[1:09:42] disclaimer it's really good training

[1:09:44] wheels if you don't have intuition about

[1:09:46] this.

[1:09:46] >> So let's just define these things. What

[1:09:49] is a smart zone and what is a dumb zone?

[1:09:51] >> So, it's it's it's a little bit

[1:09:53] blurriier than like I would like I would

[1:09:55] like it to be. I think in November we we

[1:09:57] talked about the first 40% of the

[1:09:59] context window, but then we had million

[1:10:01] smart zone.

[1:10:02] >> Yeah. Then we had million token context

[1:10:03] window. So then I changed it to like the

[1:10:04] first 100,000 tokens if it's a really

[1:10:06] like 4.8 I usually will go up to like

[1:10:08] 200k. But basically the the thing Jeff

[1:10:10] Huntley had and Ralph Wickham was like

[1:10:12] the less context window you use the

[1:10:14] better outcomes you'll get. And

[1:10:15] basically the smart smart zone mean

[1:10:17] meaning if you have context in that

[1:10:19] first part it should work a lot better

[1:10:22] and then like the dumb zone is like once

[1:10:24] you have stuff there it's kind of forget

[1:10:26] about it like it'll be confused it's not

[1:10:28] going to do much like it'll degrade.

[1:10:30] Yeah. And there are times and this is an

[1:10:31] intuition thing like I will often go up

[1:10:33] to 3 400k tokens. Four is rare but I

[1:10:36] will go up to 250 300k tokens for

[1:10:39] certain types of work where my intuition

[1:10:40] tells me that I can keep working without

[1:10:42] without degrading the performance. But

[1:10:44] if you don't have good LLM intuition,

[1:10:46] like 100K for smaller models, 200K for

[1:10:49] these like really beefy like Codeex and

[1:10:51] Opus 4.8 models is usually a good like

[1:10:54] training wheel guideline of like if you

[1:10:57] pass there, your quality of results may

[1:11:00] be degrading. The biggest tell I see for

[1:11:02] this is often the uh model's trying to

[1:11:05] get the test to pass and your 200k

[1:11:07] token. Well, let me try this. Okay, let

[1:11:08] me try that. and it's like trying a

[1:11:09] bunch of stuff and it's getting more and

[1:11:11] more extreme and it's like thing oh let

[1:11:13] me delete your end file and try again

[1:11:15] like this is where things get really

[1:11:17] really weird and so it's like if you

[1:11:19] start to see certain types of if I'm

[1:11:20] like oh we're at 300k tokens and I need

[1:11:22] to like fix the unit test I'm like cool

[1:11:25] write everything we did to a file or

[1:11:26] even I'll just do like a a built-in

[1:11:28] compaction depending on the model and

[1:11:29] then I'm starting a new session at 30k

[1:11:31] or 50k tokens and I'm like cool we're

[1:11:33] going to do a hard thing which is you're

[1:11:34] going to get this freaking test to pass

[1:11:36] and you're not going to be stupid about

[1:11:37] it by the One thing that you said like

[1:11:40] about the the the model being dumb is

[1:11:42] you said that if the model ever tells

[1:11:44] you you are absolutely right you should

[1:11:47] start over and we've all had that when

[1:11:48] it tells me like oh you know you didn't

[1:11:50] you're absolutely right and I'm like we

[1:11:52] just get annoyed but why should we start

[1:11:54] over what's happening there in your um

[1:11:57] observations

[1:11:58] >> yeah that's great yeah and the new the

[1:11:59] new you're absolutely right I think is

[1:12:01] uh you're right to push back on that

[1:12:02] right yes [laughter]

[1:12:04] that's opus right

[1:12:05] >> yeah opus is like you didn't run the

[1:12:06] test did you right could push back on

[1:12:08] that. I totally did it. But no, for me,

[1:12:10] you're absolutely right was always what

[1:12:11] the model would respond. If you were

[1:12:13] like, "That's totally wrong. You did

[1:12:14] it." Like you if you if you said

[1:12:16] something where you were angry or

[1:12:18] frustrated or just wanted to point out

[1:12:19] that it's done something wrong, it would

[1:12:21] respond with, "You're absolutely right."

[1:12:23] And most of us have had the experience

[1:12:24] of it says that and then it continues to

[1:12:26] do the wrong thing. So, it's like once

[1:12:28] it starts doing dumb things because

[1:12:31] there's there's four things in your

[1:12:32] context window that matter. There's like

[1:12:34] the size of it, how many tokens? There's

[1:12:36] like the quality of the information is

[1:12:38] like is there any incorrect information?

[1:12:39] Like if the model had some thinking

[1:12:40] trace where it decided the wrong thing

[1:12:42] was true. Is there missing information?

[1:12:44] Does this like have context missing that

[1:12:46] it should have? And then there's the

[1:12:47] trajectory. And the trajectory is very

[1:12:49] subtle, but you may have had sessions.

[1:12:52] >> The trajectory meaning you're prompting

[1:12:54] >> the actual history of everything. I call

[1:12:56] it trajectory is like the actual history

[1:12:58] of like what the agent has done in the

[1:12:59] past.

[1:13:00] >> And so if I say, "Hey, make this

[1:13:01] change." and the agent makes the change

[1:13:02] and then it runs the test and then

[1:13:03] they're broken and then it fixes the

[1:13:05] test. I have very high confidence the

[1:13:07] next change I asked it to make, it's

[1:13:09] going to follow that path again because

[1:13:10] it's like, okay, here's a conversation

[1:13:11] and the last time the user asked me to

[1:13:13] do a thing, I made the change, I ran the

[1:13:14] test, test broken, fixed the test, and

[1:13:16] then I told the user. But if I say make

[1:13:18] a change and it makes a change, it

[1:13:19] doesn't run the tests, then I'm on a

[1:13:21] different trajectory. And if I say,

[1:13:22] okay, make another change, it's like

[1:13:24] basically the they're auto reggressive.

[1:13:26] So they're they're predicting the ne

[1:13:27] what's the next message in this

[1:13:28] conversation. And so the example we we

[1:13:30] talked about in uh No Vibes Allowed was

[1:13:32] of course the like hey the model makes a

[1:13:33] mistake and then you yelled at it and

[1:13:35] then it made another mistake and then

[1:13:36] you yelled at it and then it's like cool

[1:13:38] what's the next message in this

[1:13:39] conversation. Well look if I read the

[1:13:41] history I should probably make another

[1:13:43] mistake so the human can yell at me. So

[1:13:46] I was like okay that's a great that's a

[1:13:48] great example of like uh time to start

[1:13:49] over.

[1:13:50] >> Let's talk about some observations on

[1:13:51] how software engineuring is changing.

[1:13:53] One thing you talked about recently on

[1:13:55] the evolution of the coding meta is

[1:13:57] going from token harder to token

[1:13:59] smarter. Can we talk about what you mean

[1:14:02] by token harder and token smarter?

[1:14:05] >> Yeah. So token harder is I mean I'm in a

[1:14:07] I'm in a group chat called

[1:14:08] hyperengineering and it's all like

[1:14:10] people trying to max out their cloud

[1:14:11] subs.

[1:14:12] >> Oh wow. Okay.

[1:14:13] >> It's just like [laughter]

[1:14:15] that sounds like a fun is it fun place?

[1:14:16] >> It's a fun place but it's like all token

[1:14:18] harder. It's like look at all the side

[1:14:20] projects I built. It's look at

[1:14:22] everything that uh I I I've gotten my

[1:14:24] Claude token. I've got six six cloud

[1:14:26] code accounts. I've gotten all of them

[1:14:28] maxed out every 5 hour period. I've

[1:14:30] timed it out so I always use all the

[1:14:31] tokens and it starts up immediately when

[1:14:33] the limit resets. And so it's like I

[1:14:36] mean getting into Eli Goldrat and the

[1:14:38] goal is like optimizing for utilization

[1:14:40] and efficiency of one node in your

[1:14:42] factory rather than the end to end goal

[1:14:43] of like how do we ship value and things

[1:14:45] that people like that are stable and

[1:14:46] like will last a long time. But that's

[1:14:48] my idea of token harder and it's the

[1:14:50] same thing with the dark factory thing

[1:14:51] is like hey if you if you if you remove

[1:14:53] humans from code review you can push

[1:14:55] more tokens through the system.

[1:14:56] >> So we talk about software factories but

[1:14:58] what is the dark factory?

[1:14:59] >> Ah so the dark factory is this comes

[1:15:01] from this idea of like there are

[1:15:03] factories where uh everything is

[1:15:05] automated by robotics. So you can

[1:15:07] imagine like a car factory where it's

[1:15:08] all robots building the cars and they

[1:15:11] don't have lights because there's no

[1:15:12] humans.

[1:15:13] >> Oh, so that's where it comes from.

[1:15:15] >> The dark factory. Yeah. You walk in

[1:15:16] there's no lights. There's not even

[1:15:17] light switches.

[1:15:18] >> So, it will be the fully automated

[1:15:20] software factory where it it it will be

[1:15:22] like no human input basically.

[1:15:23] >> No human input. Raw materials go in,

[1:15:26] cars come out.

[1:15:27] >> Yep.

[1:15:27] >> And I think in in a micro like you can

[1:15:29] have many loops that are dark in your in

[1:15:31] your thing of like, hey, if uh if the

[1:15:33] code review agent comes back with a

[1:15:34] problem, you loop that back to the

[1:15:36] builder agent, it fixes it and comes

[1:15:37] back and that's dark. You don't need a

[1:15:38] human loop for that. But the full dark

[1:15:41] factory where you don't read any code,

[1:15:42] yeah, it's a good way to maximize your

[1:15:44] token utilization. And it's like if if

[1:15:45] your belief is like my job is to extract

[1:15:48] as much intelligence out of the machine

[1:15:50] god as I can because that's how I get

[1:15:52] the most value and the most leverage on

[1:15:54] my time then token harder. Um and my

[1:15:58] take is basically what we talked about

[1:15:59] before token smarter is like okay how do

[1:16:01] I move faster? How do I get as much

[1:16:04] value out of as AI as I can without

[1:16:06] having to turn the lights off while

[1:16:08] still maintaining control and taste and

[1:16:10] judgment and understanding the system

[1:16:12] architecture and having a lot of like

[1:16:14] applying my hard one opinions through 10

[1:16:16] years of software engineering to the

[1:16:18] design of the program so that I can feel

[1:16:21] confident that the code's going to get

[1:16:22] better and more maintainable over time.

[1:16:24] It's the same thing of like you look at

[1:16:25] like the S sur team inside Google. They

[1:16:27] brought out this book SR site

[1:16:29] reliability engineering and the whole

[1:16:31] take was like hey we're going to go from

[1:16:32] one data center to five data centers and

[1:16:35] we need the same sixperson team to be

[1:16:37] able to manage five data centers and we

[1:16:39] need the same sixperson team to be able

[1:16:40] to manage 50 data centers next year and

[1:16:42] it's basically how do we apply software

[1:16:45] to this problem so that instead of

[1:16:46] scaling linearly of like okay every data

[1:16:48] center needs five devops people so we

[1:16:50] need to scale the people with the things

[1:16:52] how do we continually automate the parts

[1:16:54] that we don't need so a little bit

[1:16:55] orthogonal and maybe even like contra

[1:16:57] contradictory to what I just said, but

[1:16:58] this idea of like how do you find

[1:17:00] leverage and the way the way well I I

[1:17:03] think what you were saying there is like

[1:17:04] when Google did that never seek to

[1:17:06] remove those SRE from the process at

[1:17:09] all. They just said like look can we

[1:17:12] think ahead and scale yourselves and

[1:17:13] they actually grew the team. It wasn't

[1:17:15] actually six people. It was more like I

[1:17:17] think Google specifically said, "Okay,

[1:17:18] we have five data centers. Next year

[1:17:20] we'll have 50. There's six of you. We do

[1:17:22] not want to have 60 people. We don't

[1:17:24] want and and then management layer and

[1:17:25] all that. It's like how can we do it

[1:17:27] with like 12 or like or like 10 and then

[1:17:30] when we'll have 500 and now actually

[1:17:32] their SRE has grown but but

[1:17:33] >> of course yeah

[1:17:34] >> but but they never you know I I think as

[1:17:36] engineers like we feel pretty threatened

[1:17:37] when someone says like all right we just

[1:17:39] want to have zero engineers like I mean

[1:17:41] that's not a fun place to work at but

[1:17:44] what it sounds like

[1:17:45] >> it's not a possible place to work at if

[1:17:46] they have zero engineers neither of us

[1:17:48] can work there right

[1:17:49] >> but do understand the token smarter is

[1:17:50] like let's keep humans in the loop let's

[1:17:52] keep adding value and figure out what

[1:17:55] are the parts which are not as relevant,

[1:17:58] boring, where we don't need it. And so

[1:18:00] like one developer can probably do more

[1:18:02] than before, but you are built to like

[1:18:05] be part of this whole thing and the

[1:18:06] lights are on in a factory.

[1:18:07] >> Yeah. And it's like basically I think I

[1:18:09] think what I'm trying to get to is like

[1:18:10] the connection here is like S builts a

[1:18:13] thing where like headcount scales at

[1:18:14] like a square root function or a

[1:18:16] logarithmic function whereas their

[1:18:18] output scales like linearly and you want

[1:18:20] the same that the way you do that is

[1:18:22] with good architecture and good program

[1:18:23] design. And so in order to like avoid

[1:18:26] this problem where you have to throw

[1:18:27] more people or more tokens at at the

[1:18:29] problem, if you design good software in

[1:18:32] such a way that it gets more

[1:18:33] maintainable and more scalable over time

[1:18:35] and like just today it doesn't feel like

[1:18:38] like basically you need humans in the

[1:18:39] loop to be able to do that. Let's talk

[1:18:41] about uh AI slop. At one point you

[1:18:45] wrote, "Yeah, AI can write your code,

[1:18:46] but it can also write your specs and

[1:18:48] PRDs." But the same the same rule is

[1:18:50] always slop in, slop out. If you

[1:18:52] outsource your thinking, you're gonna

[1:18:53] get garbage.

[1:18:54] >> Yep. Um, so yeah, that's basically the

[1:18:57] idea is like the way we think about like

[1:19:00] getting high quality outputs is like

[1:19:02] yeah, you could write the code by hand

[1:19:04] or you could sit with a model and work

[1:19:06] back and forth and go maybe a little bit

[1:19:08] faster and you have control and every

[1:19:10] time it makes a change, you go read the

[1:19:11] change and if it's bad, you tell it,

[1:19:12] nope, we want it like this and you kind

[1:19:14] of incrementally slowly. This is like

[1:19:16] kind of the stage two or stage three

[1:19:18] version of working with agents where

[1:19:19] like the agents writing all your code,

[1:19:21] but you're kind of very much in the

[1:19:23] loop. And this will make you go faster,

[1:19:24] but it won't make you go that much

[1:19:26] faster. It won't make you go anywhere

[1:19:27] near there's like there's like that

[1:19:28] level and then there's like the maximum

[1:19:30] speed you can go while still caring

[1:19:31] about the code. And then there's like

[1:19:32] the maximum speed you can go if you turn

[1:19:34] the lights off. And so we always think

[1:19:35] about it as like in terms of leverage is

[1:19:38] like, okay, let me take everything

[1:19:39] starts with like a sentence or a voice

[1:19:41] note ramble like I want to build this

[1:19:42] thing. is going to work like this or

[1:19:43] whatever it is to let's say like on

[1:19:45] average like two sentences I got to fix

[1:19:47] this thing or there's a support ticket I

[1:19:48] got to fix this thing if you can turn

[1:19:50] that with AI into a one pager and then

[1:19:52] turn that one page and make sure that's

[1:19:54] correct and then turn that one pager

[1:19:55] into a three-pager and make sure that's

[1:19:57] correct and then turn that three-pager

[1:19:58] into a 10-page like detailed outline

[1:20:01] then you can write a 100 pages worth of

[1:20:03] code and it's maybe not perfect you

[1:20:05] shouldn't like sweat over these

[1:20:06] documents and make sure they're perfect

[1:20:08] but you're increasing the chance that

[1:20:11] like you're decreasing the uncertainty

[1:20:13] of the outputs. It's like you can think

[1:20:14] of like you have like a line of like

[1:20:16] where it's going and then you have like

[1:20:17] the probabilities of where like it might

[1:20:19] go in that range if you are kind of

[1:20:22] reviewing along the way as you get more

[1:20:24] and more detailed into how what you're

[1:20:26] building and how you want it to be

[1:20:27] built. You kind of collapse the

[1:20:28] uncertainty and the set of end states

[1:20:31] that you could land in. That's me doing

[1:20:34] the physics thing of like you got to

[1:20:35] superimpose all these probabilities and

[1:20:37] like I don't know I have this thing that

[1:20:38] like I think people who really like

[1:20:40] playing real-time strategy games uh are

[1:20:42] probably going to be really good with AI

[1:20:43] because you kind of have to like I don't

[1:20:46] know. Matt Matt PCO was just talking

[1:20:47] about fog of war and like things that

[1:20:49] are at the frontier of like there's

[1:20:51] stuff we don't know about this problem

[1:20:52] yet. How can we find that out and how

[1:20:54] can I make the best decision now knowing

[1:20:57] what I have seen? there's a I've seen a

[1:20:59] couple pieces of information and so

[1:21:00] there's a 30% chance it's this and

[1:21:02] there's a 40% chance it's this. How

[1:21:04] could I get more information? So in my

[1:21:05] head I can like recalculate those

[1:21:07] probabilities and decide what's the most

[1:21:09] likely path that's going to lead us to

[1:21:11] success. Speaking of the most likely

[1:21:12] path that leads you to success, let's

[1:21:14] talk about your company that's you've

[1:21:16] you've just come out of stealth human

[1:21:18] layer. What is human layer and what is

[1:21:22] the probability that you're setting up

[1:21:23] for success?

[1:21:24] >> That's a good question. 100% 100%

[1:21:27] probability uh maybe 110 but uh no uh so

[1:21:30] human layer is it's an AI IDE it's a

[1:21:34] collaboration platform and it is

[1:21:36] building blocks for your software

[1:21:37] factory and the basic pitch is like

[1:21:39] engineers solving hard problems and

[1:21:40] complex code bases basically there's two

[1:21:42] categories of builders there's like vibe

[1:21:44] coders building side projects and then

[1:21:46] there's people building production

[1:21:47] software where the stakes are high and

[1:21:49] if something breaks we're going to get

[1:21:50] fined millions of dollars or you know

[1:21:52] we're going to lose millions of dollars

[1:21:53] of money for the company and there's a

[1:21:54] whole spectrum in between there. But

[1:21:56] it's like if you're kind of in the left

[1:21:58] half of that spectrum, you're building

[1:22:00] software that matters and it has to last

[1:22:02] and be around for a while, then you're

[1:22:04] helping people like that solve problems

[1:22:06] two to three times faster without

[1:22:08] descending into slop is like how do you

[1:22:10] maintain that near human level of

[1:22:11] quality and move two to three times

[1:22:13] faster?

[1:22:14] >> And what were the ideas that you you

[1:22:17] built and that you came with? one idea

[1:22:19] that we're really excited about right

[1:22:20] now. I mean, it all comes from this RPI

[1:22:22] and this like using specs to like I mean

[1:22:24] I've kind of been hinting at it this

[1:22:26] whole time, right, of like okay cool

[1:22:28] like start really high level and zoom in

[1:22:30] layer by layer and resteer and like find

[1:22:32] find that leverage that helps you move

[1:22:34] faster and increase the chance that your

[1:22:36] agent's going to build exactly what you

[1:22:37] want or something that's really high

[1:22:38] quality. The other thing I think that's

[1:22:41] really interesting that where I just

[1:22:42] posted yesterday I said, "Hey chat,

[1:22:44] should we uh kill the poll request?" And

[1:22:45] that's uh something I can't talk too

[1:22:47] much about, but basically the idea is

[1:22:48] like the IDE of the future needs to be

[1:22:51] rethought from the ground up for agents.

[1:22:54] And it might not even be a like I don't

[1:22:57] know a lot of editors kind of started

[1:22:58] with the text field and bolted on an

[1:23:00] agents tab. And then eventually you've

[1:23:02] seen like cursor 3. I can't even find

[1:23:03] the text editor. I know it exists.

[1:23:05] People have told me you can get to a

[1:23:06] text view of files, but it's also very

[1:23:08] agent first. And so we started from the

[1:23:10] ground up of like what is an IDE

[1:23:12] designed for helping a developer

[1:23:14] interact with and manage the work of

[1:23:16] agents. And then we zoomed out and said

[1:23:18] how do we make this collaborative and

[1:23:19] build in a sync engine and durable

[1:23:21] streams and all of these like pieces of

[1:23:23] tech that enable

[1:23:25] me to get human input and feedback on

[1:23:28] what I'm doing with agents in real time

[1:23:31] rather than waiting for the pull request

[1:23:32] time. And great engineering teams have

[1:23:34] been doing this for decades of like,

[1:23:35] hey, we're gonna have a design review

[1:23:36] where we're going to talk about how

[1:23:37] we're going to build the thing as like a

[1:23:38] two-page Google doc or whatever 10page

[1:23:41] what, however,

[1:23:42] >> BRD er

[1:23:44] architecture requirements document and

[1:23:46] then you go to sprint planning and you

[1:23:48] break it down into little tickets and

[1:23:49] you decide who's going to do what. It's

[1:23:50] like AI can help with all of this. You

[1:23:52] should, if you're just using AI to write

[1:23:54] the code, you're missing out on a lot of

[1:23:55] the benefits that AI can bring to your

[1:23:57] SDLC. And a lot of people say like,

[1:23:59] "Well, we don't need any of those

[1:23:59] meetings anymore because we have the

[1:24:01] loop. We have the dark factory. Things

[1:24:02] just fly around the loop." But it's

[1:24:03] like, "Okay, but if you want to actually

[1:24:04] move faster and maintain quality, then

[1:24:06] like you should have these checkpoints

[1:24:07] before you go to actually write the code

[1:24:09] and you should use AI to help with

[1:24:11] that." So, we built this like cloud

[1:24:12] platform that's kind of has like a

[1:24:13] Google Doc style component where you can

[1:24:15] comment and the agent can surface like

[1:24:18] mockups and mermaid diagrams and HTML

[1:24:20] and all these things. So, basically, how

[1:24:21] do we make agents like Big Figma style?

[1:24:24] Everything's in the cloud. Everything's

[1:24:25] collaborative. I see all my co-workers

[1:24:27] sessions. they see all of mine. It's

[1:24:28] almost like the benefit that Slack had

[1:24:31] over email was that you didn't have to

[1:24:34] be in every conversation to know what

[1:24:36] was happening. You could maintain you

[1:24:38] could see all these channels light up.

[1:24:39] You could check on them. Okay, I don't

[1:24:40] care about any of that. But if you saw a

[1:24:42] conversation that you cared about, you

[1:24:43] could jump in on that. And it's like how

[1:24:45] do we do that for engineering work

[1:24:46] versus like we really had these like

[1:24:48] very strict even when we called it agile

[1:24:51] it's very waterfall like PRD ard tickets

[1:24:56] everyone goes and builds for a day and

[1:24:58] then you get the PR back and then one

[1:25:00] person reviews it. How do you create

[1:25:02] this more just like soup and like what

[1:25:05] is the data model for that world where

[1:25:06] you have like agentic traces, you have

[1:25:09] documents, you have tasks and projects

[1:25:11] that group these things, you have actual

[1:25:13] git diffs being streamed everywhere

[1:25:14] where it's like why would I review all

[1:25:16] the code at once when I can just always

[1:25:18] every everybody's work lives in a shared

[1:25:21] environment that anyone can go interact

[1:25:22] with. I mean what it reminds me is like

[1:25:25] what you know GitHub that did the

[1:25:27] software teams before GitHub and its

[1:25:29] competitors you might have a tracker

[1:25:32] somewhere but most teams were just kind

[1:25:35] of like in inside the company you didn't

[1:25:37] know what one one team was I I remember

[1:25:39] pre- GitHub like you know you had

[1:25:40] individual teams they some of them had

[1:25:42] like a board with stickers but no one

[1:25:44] else in the company knew what they were

[1:25:45] doing they were all working isolation

[1:25:47] and now when you have GitHub or even the

[1:25:49] internal version of of GitHub inside a

[1:25:52] company you can always see when when you

[1:25:53] go to a team you you see the pull

[1:25:55] request flying you you can join in you

[1:25:57] have history it's all it is all kind of

[1:25:59] connected and it it came together and

[1:26:00] now it's like you know for a very long

[1:26:02] time I was like you duh you're going to

[1:26:03] use GitHub or or people will copy it so

[1:26:06] do I sense that you're trying to build

[1:26:08] something like this this workflow for

[1:26:10] like when you have the the software

[1:26:12] factories which are like dark factories

[1:26:14] and loops at a bunch of places how can

[1:26:16] we have this this new way of working

[1:26:19] which which will feel natural but like

[1:26:21] coming up with it like is is hard work

[1:26:23] and it's it's counterintuitive.

[1:26:25] >> How can we do something that

[1:26:26] accomplishes what GitHub did but like

[1:26:27] 10x better like more specifically like

[1:26:30] more continuous and more real time and

[1:26:32] more collaborative than like these

[1:26:34] discrete units of work that is like the

[1:26:36] poll request.

[1:26:37] >> Well, I now I'm starting to understand

[1:26:38] why you're saying maybe we should kill

[1:26:39] the poll request because pull request

[1:26:41] was invented by GitHub, right? like it's

[1:26:43] it is not part of Git, but they did it

[1:26:45] as a way for you to do a code review

[1:26:48] merge before it goes in and be able to

[1:26:50] modify it or or like just reject it,

[1:26:52] etc.

[1:26:53] >> And it's probably a lot better than

[1:26:54] whatever we had before, which I guess

[1:26:56] was like emailing your git patch to

[1:26:57] Lionus and ask him to merge it into the

[1:26:59] kernel or whatever.

[1:27:00] >> They still do that. It work it works for

[1:27:02] them. That's the point. But it only

[1:27:03] works for them.

[1:27:03] >> Yeah. I don't know anybody else who does

[1:27:05] that. I mean, I'm sure even before Get

[1:27:06] Up for you, you guys had what, like CVS

[1:27:08] or

[1:27:08] >> CVS?

[1:27:10] So, if you had a lot of money for

[1:27:11] Microsoft,

[1:27:12] >> they made us use subversion at in

[1:27:14] undergrad because the guy who invented

[1:27:16] subversion uh was a you Chicago guy. The

[1:27:19] year after I graduated, they switched

[1:27:21] everybody to Git. And I was like, damn,

[1:27:22] I learned a useless thing just for

[1:27:24] somebody's ego. specifically for AI

[1:27:27] startups or startups building on top of

[1:27:29] AI or building AI products. How

[1:27:31] important do you think location and

[1:27:32] network is especially you are based in

[1:27:34] in the the valley we see research that

[1:27:38] AI startups are more frequently funded

[1:27:40] from here than normal startups as well.

[1:27:43] Do do you see this advantage and also do

[1:27:45] you see some disadvantages of being a

[1:27:47] specific may that be Silicon Valley or

[1:27:48] elsewhere? I don't have really strong

[1:27:50] opinions on this. Actually, like Paul

[1:27:52] Graham gave a talk in Sweden about why

[1:27:54] SF is cool. Rather than just regurgitate

[1:27:56] that, I will I will forward people onto

[1:27:58] that one. Um, we can put it in the show

[1:28:00] notes or whatever, but he talks about

[1:28:01] all of the dynamics of Silicon Valley

[1:28:03] and the pay it forward culture and the

[1:28:05] like people take you way more seriously

[1:28:07] just because you're based here. I lived

[1:28:08] in Chicago for a long time. I have a lot

[1:28:10] of really good friends from high school,

[1:28:12] from college, from growing up in LA. And

[1:28:14] never before have I felt like so locked

[1:28:16] in with like my people more. Never have

[1:28:19] I felt more seen, more connected. Like

[1:28:22] there's just so many people here. Again,

[1:28:23] talking about the founder thing, people

[1:28:25] who care deeply, who are incredibly

[1:28:26] competent, who like we have all the same

[1:28:29] types of problems. We love all the same

[1:28:31] types of things. Like I don't do land

[1:28:32] parties where we play video games, but

[1:28:34] all my buddies will come over and we'll

[1:28:35] sit in the office till 11. We'll just do

[1:28:36] co-working and like hack on cool fun

[1:28:39] projects and stuff. And like you can't

[1:28:40] do that anywhere else. There's not

[1:28:42] enough like uh critical mass for that to

[1:28:45] just happen organically everywhere you

[1:28:47] go. and and I absolutely love it. I

[1:28:49] wouldn't trade it for anything.

[1:28:50] >> Yeah, I think a critical mass nails it

[1:28:51] on on the head. When it comes to hiring,

[1:28:54] what types of folks are you hiring for

[1:28:56] specifically? Cuz I'm interested in how

[1:28:58] hiring changes and and what what a

[1:29:00] standout engineer means for you and how

[1:29:02] you are trying to, you know, confirm

[1:29:05] that those traits exist.

[1:29:06] >> In general, we we are looking um for

[1:29:09] people who are have really strong

[1:29:11] software fundamentals. So, understand

[1:29:13] distributed systems, understand like the

[1:29:15] core fundamentals of CS and operating

[1:29:18] systems and these kind of things. I

[1:29:19] mean, you don't have to be a PhD in

[1:29:21] freaking kernel design or whatever, but

[1:29:23] it's a lot easier. We can we can teach

[1:29:25] we can teach somebody, I think, to be a

[1:29:26] really good AI developer in a few

[1:29:28] months. You can build enough intuition

[1:29:29] where you are, you know, accelerated off

[1:29:31] the ground and you can go like keep

[1:29:33] growing there. It's really hard to teach

[1:29:35] someone a CS undergrad program in in 3

[1:29:37] months. And what's a problem space that

[1:29:40] you're excited about in in software

[1:29:42] engineering or even product engineering

[1:29:44] or building products that you think in

[1:29:45] the next few years is going to be one of

[1:29:47] the interesting things that you're going

[1:29:48] to be attacking?

[1:29:49] >> My co-founder could talk more about

[1:29:50] this, but like there's a lot of

[1:29:52] interesting things happening in in real

[1:29:54] time in cloud and sandboxes in sync and

[1:29:57] kind of like using these new building

[1:30:00] blocks that have gotten really solid in

[1:30:02] the last couple years. We're big fans of

[1:30:03] the electric SQL team. where users have

[1:30:05] durable streams. It's like how can you

[1:30:07] build systems that kind of are a lot

[1:30:09] more spread out and distributed and

[1:30:12] almost like decentralized. This is

[1:30:14] really interesting for coding because

[1:30:15] you want to be able to run coding agents

[1:30:16] anywhere. You want to be able to run

[1:30:17] them for a short time, for a long time,

[1:30:20] on demand, on a schedule, all these

[1:30:22] things and have them all be part of this

[1:30:23] kind of like brain. So I don't know,

[1:30:26] parts of what we're doing are really

[1:30:26] boring like all our data is in Postgress

[1:30:28] and then parts of what we're doing is

[1:30:29] really interesting. Um, but there's a

[1:30:30] lot of distributed systems problems.

[1:30:32] There's a lot of infrastructure

[1:30:33] problems. Like we are building tools for

[1:30:35] AI, but there's a lot of problems in

[1:30:38] building collaboration platforms that

[1:30:40] are really really hard and there's a lot

[1:30:41] of new tech that makes it easier and

[1:30:42] more interesting, but it's still uh by

[1:30:45] far from an easy problem. It sounds like

[1:30:47] what you're saying is like the infr

[1:30:49] layers to some extent a new infrar being

[1:30:51] built and it'll take some time and but

[1:30:54] it'll be like just new new blocks and it

[1:30:56] will eventually become the primitives

[1:30:57] like for cloud we have primitives

[1:30:59] already but it took freaking decade to

[1:31:01] get those together or more.

[1:31:02] >> Yeah. You had AWS in what like 2008

[1:31:05] 2006. Yeah. Uh and then you got

[1:31:08] Kubernetes a decade later.

[1:31:09] >> Yep. And as closing, what's a book or or

[1:31:12] reading that you would recommend?

[1:31:14] Something that you personally enjoyed.

[1:31:15] >> Nowadays, we talk a lot about

[1:31:17] refactoring by Martin Fowler classic. I

[1:31:20] think it's because we spent a lot of

[1:31:21] time uh improving the design of existing

[1:31:23] code and trying to figure out how to get

[1:31:25] models to build code that is easy to

[1:31:26] maintain and like easy to read and easy

[1:31:29] to understand and easy to to build on. I

[1:31:31] feel like I probably have a better

[1:31:32] answer than that, but that's that's

[1:31:34] what's top of mind these days. Uh we're

[1:31:35] reading a lot of like classics of

[1:31:37] software engineering. Refactoring clean

[1:31:38] code, the pragmatic programmer, like all

[1:31:40] that stuff is I think is more relevant

[1:31:42] now than it has ever been. Love it.

[1:31:44] Well, Dex, thanks so much. This was fun.

[1:31:46] >> This was a blast, dude. Thanks for

[1:31:47] thanks for having me on. This was great.

[1:31:49] Uh I had a lot of fun. I don't know

[1:31:51] about you, but I really enjoyed this

[1:31:52] conversation. Dex is such a big believer

[1:31:54] in gender coding. Yet, he's the one

[1:31:56] warning us that if you stop reading the

[1:31:58] code, you have about 3 to 6 months

[1:32:00] before your codebase becomes easier to

[1:32:02] rewrite than to [music] fix. And this

[1:32:04] comes from first hasn't experience. His

[1:32:06] team built a light software factory, ran

[1:32:08] it, and then had to shut it down. I also

[1:32:11] like the idea of the slow [music] loop.

[1:32:13] Loop engineering feels like a somewhat

[1:32:15] meaningless term to me. What Dex's team

[1:32:17] does is actually pretty boring. A cron

[1:32:20] job runs every night, fixes one issue or

[1:32:22] one anti-attern, and opens one small

[1:32:24] pull request. The team wakes up to a

[1:32:26] codebase that's a little bit better

[1:32:27] every morning, [music] and dev still

[1:32:29] needs to review and prove it. This is a

[1:32:31] practice that honestly any engineering

[1:32:32] team could just adopt today. Finally, I

[1:32:35] really enjoy the history lesson. The

[1:32:36] term software factory comes from a NATO

[1:32:38] conference in [music] 1968. The idea of

[1:32:41] software used to build software with

[1:32:43] analogies to a factory is more than 60

[1:32:45] years old and every generation of our

[1:32:47] industry has tried to automate more of

[1:32:49] the loop of building software. AI agents

[1:32:52] are just yet one more attempt, although

[1:32:53] probably the most successful one. Do

[1:32:55] check out show notes below for the

[1:32:56] related the pragmatic engineer deep

[1:32:58] dives that go even deeper into AI

[1:32:59] engineering and other related topics. If

[1:33:01] you enjoy this podcast, please do

[1:33:03] subscribe on your favorite podcast

[1:33:04] platform and [music] on YouTube. A

[1:33:06] special thank you if you also leave a

[1:33:07] rating on the show. Thanks and see you

[1:33:09] in the next
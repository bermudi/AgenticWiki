---
title: "Building Pi, and what makes self-modifying software so fascinating"
author: "The Pragmatic Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=n5f51gtuGHE&t=5192s"
date_saved: "2026-04-30T02:42:05.993Z"
---

# Building Pi, and what makes self-modifying software so fascinating

[0:00] Can we start with the backstory of why

[0:01] you decided to build Pi? I personally

[0:04] like simple tools that are stable that I

[0:07] can rely on even if they have

[0:08] non-deterministic parts. So you can ask

[0:11] Pi to modify itself. Pi doesn't have

[0:13] MCP. People just ask Pi to build MCP

[0:15] support into PI.

[0:16] >> Non-engineers participating in

[0:17] engineering process is a thing now.

[0:19] >> You might have a PM who wants to try out

[0:21] a feature without wasting time of an

[0:23] engineer. Now you can do that. The

[0:24] problem is that people are now so

[0:26] focused on everybody can do everything

[0:28] now that they forget that you still need

[0:29] a process to guard rail all of that.

[0:31] >> But you just recently wrote we all need

[0:33] to slow the f down.

[0:35] >> All the companies claiming that all of

[0:36] their code is now written by agents.

[0:38] Yes, we know the quality is garbage. We

[0:40] feel it in our bones when we use your

[0:42] product. It's garbage. Basically, I

[0:44] think people need to

[0:49] What if I told you that one of the most

[0:50] influential AI coding agents of 2026 was

[0:53] built by a single developer in Austria

[0:55] who got frustrated with existing AI

[0:56] coding agents. This is Pi, a minimalist

[0:59] self-modifiable coding agent which has

[1:01] quietly become the engine behind the

[1:03] wildly popular personal AI assistant

[1:05] OpenClaw. Mario Zner is the creator of

[1:07] Pi and joining him today is Armen Roner,

[1:10] the creator of Flask and now an early

[1:12] adopter and contributor to Pi. In

[1:14] today's episode, we cover the backstory

[1:16] of Pi and why self-modifying software is

[1:18] much easier to do with AI agents. What

[1:20] Armen learned interviewing 30 plus

[1:22] engineering teams about how AI agents

[1:24] are changing how they work and why

[1:26] software quality feels like it's

[1:27] trending down, the case against MCP and

[1:30] why CLI are becoming so popular and many

[1:32] more. If you want to hear from two very

[1:34] grounded voices in the industry honestly

[1:36] talk about what's working and what isn't

[1:37] and why we need to slow down as an

[1:39] industry, this episode is for you. This

[1:41] episode is presented by Statsig, the

[1:43] unified platform for flags, analytics,

[1:45] experiments, and more. This episode is

[1:47] brought to you by Work OS. Engineers

[1:50] love to build. Today's episode will be a

[1:52] great example of this. We'll get into

[1:54] why and how PI was built from the ground

[1:56] up. But when you're shipping a product,

[1:58] some problems are better solved with

[1:59] trusted infrastructure built for scale.

[2:02] Enterprise features like SAML, directory

[2:04] sync, and audit logs are some of those.

[2:06] Work gives you APIs to add them in days,

[2:08] not in months. Ship faster without

[2:11] reinventing the wheel. And now, let's

[2:13] get into the episode.

[2:15] >> Mario and Armen, it's so good to have

[2:16] you here on the podcast.

[2:18] >> Thanks for having us.

[2:18] >> Thank you.

[2:20] >> So, as a kickoff, Mario, how did you get

[2:22] into tech and eventually into building

[2:25] AI stuff?

[2:26] >> Oh, well, that's a long story. How much

[2:27] time do we have?

[2:29] >> So, I'm a kid of the '9s, actually.

[2:32] and uh got my first PC at 909 96. And

[2:36] the trigger for that was that I loved

[2:38] computer games. We were kind of working

[2:39] poor, so we couldn't afford any of the

[2:41] Game Boy and NES, Super NES stuff. But I

[2:44] had an uncle who had an Amigga 500 and I

[2:47] would go to his place every second day

[2:49] and just play games there. And

[2:50] eventually my my parents told me if you

[2:53] work uh you can save up and buy yourself

[2:56] a computer. And in reality, my dad would

[2:58] do um what's he called? Schwartz of it.

[3:02] >> Well, you're not necessarily paying the

[3:03] taxes on your

[3:04] >> Yeah. So, he would do his normal he

[3:05] would do his normal job and after his

[3:06] normal job, they would go fix cars and

[3:09] work at construction sites and

[3:10] >> Yeah. It's very common in Europe. Like I

[3:12] know everyone did that.

[3:13] >> And after two or three years or so, they

[3:15] they just said, "It's time." And took me

[3:16] to a computer shop in the nearby big

[3:19] city and bought me a 486. And that's how

[3:22] it started basically.

[3:23] >> Pentium 486.

[3:24] >> Yeah. an Intel 486DX40

[3:28] MHz with turbo button and that's where I

[3:31] started and I've always been into games

[3:34] a lot um which also led to graphics

[3:36] programming and through sheer luck I got

[3:40] a job while I was studying at university

[3:42] at um applied science organization who

[3:45] was doing NLP stuff um machine learning

[3:48] applied machine learning basically

[3:50] taking research results and trying to

[3:52] stuff them into industry applications

[3:54] And that's where I learned the ropes of

[3:57] machine learning. That was all before

[3:59] deep learning became a thing. And I

[4:02] actually quit that kind of domain in

[4:06] 2010 111ish because I joined a startup

[4:09] in San Francisco.

[4:11] And then later came back and joined

[4:13] another startup with two friends in in

[4:14] in Sweden where we did uh an ahead of

[4:17] time compiler for jaw bite code to iOS

[4:20] that got sold.

[4:22] And since then I have a little bit more

[4:24] time and I've always kept up with

[4:25] machine learning stuff because obviously

[4:27] super interesting. Uh and yeah and then

[4:30] GPT happened and that's the story.

[4:32] >> Yeah. And here we are. And then Armen

[4:34] where were your roots?

[4:36] >> So my roots are definitely not working

[4:38] poor but I because my parents ran an

[4:42] architectural office where they kind of

[4:44] adopted computers for cat drawing. My

[4:48] first computer was like old computers

[4:50] that they recycled. So, my first

[4:52] computer, even though I'm younger, was

[4:54] in three. I'm

[4:56] >> so sorry for you.

[4:57] >> And and so, basically, none of the

[4:58] computers that I ever had were capable

[5:00] of playing computer games properly. Um,

[5:03] because one, they used Windows NT, which

[5:05] at the time didn't do anything. So, you

[5:07] had to sort of like build your way

[5:09] through it. And like the only way you

[5:10] could actually get them to run was

[5:12] because before it didn't know yet how to

[5:13] get the Windows 95 or like Windows 311.

[5:16] Um that was like before it booted into

[5:18] either one of those you could boot it

[5:20] into DOSs like really old DOSS games at

[5:23] a time when you could already get better

[5:25] stuff but but because it was sort of

[5:27] this kind of thing I started toying

[5:28] around with quick basic a lot um with to

[5:32] Pascal I bought a bunch of books on that

[5:34] um and I that that was my roots of of of

[5:38] learning how these things work and it

[5:40] just I wasn't ever really good at this

[5:42] but I found it really interesting like

[5:44] this this idea of like No, for sure.

[5:47] Like I like I

[5:48] >> We call it a tabler in Germans.

[5:49] >> No, I I swear to you like I was when I

[5:52] when I started dabbling with this, I

[5:54] just really sucked. But like over time,

[5:57] you like if you keep doing this, you get

[5:58] better. Um and then in um 2002

[6:04] or three, I I used I used to use Deli a

[6:09] lot, which was like a visual version of

[6:12] of Turbo Pascal.

[6:13] >> Yeah. And in 2002 or 2003 someone uh

[6:16] also showed me because I I I' I've got

[6:18] this idea like I want to use Linux and

[6:20] then um I del I didn't work on Linux and

[6:22] then I found Python and through that I

[6:24] started doing some Pyth programming and

[6:25] there was a YUbuntu just came out in 204

[6:29] and that was a venturebacked vehicle but

[6:32] it they created all this like local

[6:34] community. So there was this like Ubuntu

[6:35] association. I together with a bunch of

[6:37] friends we started the German Ubuntu

[6:40] foundation uh not that foundation

[6:41] association um and we ran this online

[6:44] community called YUbuntu users for four

[6:47] or five years and we and because Yubuntu

[6:49] was popular the community grew and then

[6:51] scaling problems came so like that's how

[6:53] I got into web development um and then

[6:56] for building this I just I wanted to

[6:58] build a templating engine a web library

[7:02] all of this and then eventually I

[7:04] bundled that together and made this

[7:05] flask frame work which got very popular

[7:07] and even nowadays still is a thing that

[7:09] clankers like to spit out.

[7:11] >> That's hilarious.

[7:12] >> Um h but I I left it and then in uh in

[7:17] 2013 14 or so I worked on computer games

[7:19] for a couple of years in London but then

[7:21] afterwards I went back to open source

[7:23] and I I worked on Century for 10 years

[7:26] and then left in April last year to try

[7:28] something new.

[7:29] >> So both of you are originally from

[7:31] Austria. In fact you right now live in

[7:33] Austria as well right? you were doing

[7:36] games, you were working at Sentry, you

[7:39] also did games before. Then the third

[7:40] person who's not in the room but was on

[7:42] this podcast just before is Peter

[7:44] Stainberger also from Austria. Great

[7:45] that the two of you meet where the three

[7:47] of you meet cuz uh I I've I've recently

[7:50] seen a bunch of photos especially before

[7:53] Open Claw and Pi started you hanging out

[7:56] uh the three of you experimenting

[7:58] playing with AI.

[8:00] >> I think the two of us met on on the

[8:02] internet right on Reddit.

[8:04] It depends because I definitely met you

[8:06] once when I was at university.

[8:07] >> All right.

[8:08] >> So, but you didn't recognize me that

[8:09] time and I was useless.

[8:10] >> I was already famous.

[8:12] >> Um, but yeah, we sort of abstractly met

[8:14] on the internet,

[8:15] >> but eventually we met up in Vienna. Um,

[8:18] we were screaming a lot at each other,

[8:20] but uh on the internet, but uh in a in a

[8:23] very cute kind of way, in a very

[8:25] non-confrontational kind of way. And

[8:26] even though we might not think alike in

[8:28] all areas of of of our lives, uh it was

[8:31] a cultured exchange, I would say. So

[8:34] that was nice. Uh and Peter I like 60°

[8:38] of Peter Steinberger basically. Um I was

[8:41] working at an office in my town and the

[8:44] company that gave me free office space

[8:47] in exchange for being like a mentor to

[8:49] the CEO had some kind of business

[8:51] dealings with Peter's company, PSPDF

[8:52] Kid.

[8:52] >> PSPDF Kid. Yeah. um and eventually came

[8:55] to the office in Gratz and I think

[8:58] that's where we met the first time and

[9:00] then also the same year we met at the

[9:02] conference in Istanbul and just hung out

[9:04] for an entire night and that's basically

[9:06] where it all started. Nice. And then how

[9:09] did the both of you go from being

[9:11] skeptical about AI when these tools came

[9:13] out and again both of you have to at

[9:16] that point and by 2022 you've been doing

[9:18] a decade plus of building complex

[9:21] software in different domains. what was

[9:22] your first reaction to it and then

[9:24] eventually how did you kind kind of come

[9:26] across to the side of like well this

[9:27] thing is actually really interesting

[9:29] >> so for me it was I think in 2022 I think

[9:33] co-pilot um GitHub copilot came out

[9:35] before TPT

[9:36] >> yes in 2021

[9:37] >> yeah and through my previous startup

[9:40] stuff I was working with Ned Friedman

[9:42] and Miguel Daza from Samarine because

[9:44] they acquired the company

[9:45] >> with Samarine yeah they acquired the

[9:48] company I talked about earlier the Java

[9:49] compiler thing I I knew Ned Freriedman

[9:52] from our early startup stuff and

[9:54] eventually moved to GitHub and then was

[9:57] in my DMs in 2022 I think and asked if I

[10:00] wanted to have access to GitHub copilot

[10:02] the tap tap tap autocomplete thingy and

[10:04] I was like I I don't really care I don't

[10:07] think this is going anywhere and he's

[10:08] like no man it's the future got to try

[10:10] it it's the future so I tried it and it

[10:12] was absolutely horrible

[10:14] but yeah after after when GPT came out

[10:17] and especially when when they started

[10:18] providing API access I did a lot of

[10:22] projects just figuring out what works

[10:24] and what doesn't work not necessarily in

[10:25] the coding space but eventually once

[10:27] they had tool calling that's when they

[10:29] became very interesting or function

[10:31] calling as openi called it back then um

[10:33] but it took until 200 I would say 24 end

[10:37] of 24 October or so for that to actually

[10:39] be useful and that's where the coding

[10:41] agents also became kind of interesting

[10:44] and then 2025 um the cloud code team

[10:47] came out with with cloud code and that

[10:49] introduced the chanting search. So

[10:51] basically just give the agent a way to

[10:53] plow through your file system and read

[10:55] all your files and it made the whole

[10:57] difference actually

[10:58] >> like all the things that came before

[10:59] like cursor with indexing and and any

[11:03] based stuff and and all of that that

[11:05] just went away and I know that the CEO

[11:08] of uh Chroma is probably mad at me for

[11:11] saying this but that that was the

[11:14] difference that it didn't it it wasn't

[11:16] like a dense and sparse search thing

[11:18] that the agent could could go through it

[11:20] was just give it access to your files.

[11:22] That that was it for me. That's where it

[11:24] clicked for me.

[11:25] >> I think my path was kind of similar. Um

[11:27] because I think Copilot came out quite a

[11:30] bit earlier, but I know that um there

[11:33] was a program at GitHub that gave you

[11:34] early access to Copilot at the time. Um

[11:37] I think it was like this maintainers

[11:38] group or something where I still was in

[11:40] I got the feeling for Copilot that this

[11:42] will actually be really interesting.

[11:45] um but not in any way in which it is now

[11:48] because I felt like oh I am in open

[11:49] source for such a long time and now

[11:51] they're doing like training in open

[11:52] source data. It's like there is

[11:54] something

[11:56] at the very least this will be

[11:58] controversial. I I didn't think about

[12:00] like it being productive. I felt like oh

[12:01] this is going to be um is going to be

[12:03] like a controversial thing with like

[12:05] training open source data and and and I

[12:07] was I remember for like a time was like

[12:09] I was trying to probe it like really um

[12:11] >> whether there's flask in there. Then I I

[12:14] was trying to probe it like really

[12:15] adversarial. So one of the things that I

[12:17] I probed on is like I probed on like

[12:19] will it retail GPL code and I remember

[12:22] at one point I got it to um spit out the

[12:25] uh

[12:25] >> carax inverse

[12:26] >> carax inverse square root function which

[12:27] is was very easy because also it was had

[12:29] a very specific name. So like was very

[12:30] easy to get the recall but I also found

[12:32] like you can you can sort of tab in a

[12:34] certain way then it would then continue

[12:36] putting like license text on top of it.

[12:38] It was completely wrong. it like came

[12:39] from an open source GPL drop of of of

[12:42] Doom originally I think. Um and so it

[12:44] was like it would have been GBL code if

[12:46] it would have done that but it actually

[12:48] attributed like MIT license from a

[12:49] random dude and I was like oh like Mr.

[12:52] Cop that's the wrong thing and that

[12:54] tweeted at the time got really really

[12:56] popular and then sort of people started

[12:58] like sharing with me like because I was

[13:01] at a time not really exposed to how much

[13:04] actual AI progress was being made in

[13:07] those labs. Yeah,

[13:08] >> like I I didn't come from this AI space

[13:10] or ML space. So like I was I learned

[13:13] about a university and like oh there's

[13:14] AI winter and then nothing happens. But

[13:16] through this tweet and some other things

[13:17] I like other than I like I re recognized

[13:21] that there was something there like

[13:22] there's there's actually CEOs in certain

[13:24] companies are convinced this will get

[13:27] off and that's how I started like paying

[13:29] attention to it and I was essentially I

[13:30] was trying all kinds of stuff with the

[13:32] API like can you do like bug fixing

[13:34] things I got really interested in it but

[13:37] it didn't at all feel like the world is

[13:40] going to change until um cloud code

[13:42] >> and you also changed your stance on the

[13:44] whole oh my god this spitting out open

[13:46] source code. It it memorized.

[13:49] >> So, because like my like my shtick for

[13:51] many years now has been that I really

[13:54] I'm like a I want people to share stuff

[13:58] like I I think like human progress comes

[14:00] from like building on top of each other

[14:02] and I I'm a huge supporter of the fact

[14:04] that in the US you basically take

[14:06] knowledge from one company to another

[14:08] company that then no competes like I I

[14:10] like this pirate kind of approach to

[14:14] sharing.

[14:14] >> Yeah. spread of knowledge.

[14:16] >> Yeah. And so like I I was like my

[14:17] optimal version is like copyrights don't

[14:19] exist in a way or like very very like

[14:21] limited kind of version of this. I was

[14:22] like I really didn't care that it spits

[14:24] out GPL code and doesn't attribute like

[14:26] I was like oh maybe this will just

[14:27] completely destroy copyrights and like

[14:30] for me that was like oh this is I like

[14:32] if if that's the outcome of like I'm I'm

[14:34] fine with it. So it was but it was it

[14:36] was an interesting kind of thing in the

[14:38] beginning that it sort of like it sort

[14:40] of creates this license violation like I

[14:42] want to see like what what chaos will

[14:43] emerge from it and so far I think mostly

[14:45] what has emerged from it is like a

[14:47] strong belief now that like the the

[14:50] system in place for copyrights

[14:52] has some presumptions assumptions in the

[14:55] US about how it's supposed to work and

[14:57] we're all kind of like ignoring that

[15:00] right now because we want to create the

[15:02] mess first and then reeregulate probably

[15:05] because like at least in theory a lot of

[15:06] the things that we're producing right

[15:08] now are probably by historic readings of

[15:10] the copyright interpretation actually

[15:13] not copyrightable.

[15:14] >> Yeah, that that's an interesting one.

[15:15] But speaking of jumping jumping to today

[15:17] so an interesting thing that you did

[15:19] recently, we talked about it just before

[15:22] is as part of your new startup is

[15:24] building things on top of agents and you

[15:26] talked to about 30 different engineering

[15:28] teams saying hey how are you using

[15:30] agents inside of your company inside of

[15:32] your team? What did you learn from large

[15:34] companies to startups?

[15:36] >> I think the the a bunch of learnings

[15:38] entirely unsurprising is that whenever

[15:41] people had vacation, there was more time

[15:44] spent on um trying these tools

[15:48] >> and and just to be clear like you talk

[15:49] with like folks at the likes of like

[15:51] Meta Startups.

[15:53] >> Yeah.

[15:53] >> Like like a bunch bunch of different

[15:55] people, right? So a bunch of different

[15:56] people from like different like European

[15:59] dinosaurs like

[16:00] >> are you pointing at me?

[16:03] >> Well I mean like the European dinosaur

[16:04] would be someone like cementss.

[16:06] >> Yeah.

[16:06] >> Or I also talked to to companies which

[16:09] are sort of in a critical space. And

[16:11] what I mean like when

[16:13] adoption happens when people have

[16:14] vacation is that like when when your CEO

[16:17] or your tech lead comes and says like

[16:18] you got to use cursor now you got to use

[16:20] cloud code now is actually you don't get

[16:23] it in a way because you you need to

[16:26] actually spend some time on like there's

[16:28] a there's a it's like a two to three

[16:30] week kind of thing until it really

[16:32] clicks on you and so I I always felt

[16:35] like with the people that I knew like I

[16:37] had a lot of free time like I I left the

[16:39] company in April until October. I was

[16:41] like, I can dive into this and I I like

[16:43] this is like how does nobody get this

[16:46] and

[16:46] >> a catnip for all of

[16:47] >> it was it was crazy catnip. I didn't

[16:49] sleep much all of this. But but what

[16:51] happened within the company seemingly is

[16:52] that when there was like Thanksgiving,

[16:54] there was um for the Europeans a lot of

[16:56] it was over summer and then at Christmas

[17:00] a lot of people sort of and they also

[17:02] get free credits during those times and

[17:04] so like more and more people get

[17:05] >> Oh, you mean the the companies often

[17:06] give you generous

[17:07] >> so and so more and more people went into

[17:09] this and and especially after Christmas

[17:12] I would guess like in more than half the

[17:14] companies I talked to after Christmas it

[17:16] really exploded um and and it it

[17:19] exploded in And so in all the ways we

[17:20] would expect it where like all of the

[17:22] sudden the quality drops and and and and

[17:25] it doesn't necessarily drop because like

[17:27] people want to make worse code but

[17:29] because it actually takes some effort to

[17:33] to stay within this and we we have seen

[17:36] this in the startup ecosystem already in

[17:40] the summer last year like if you if you

[17:43] pay attention to like the the YC

[17:44] startups a lot of them some of them have

[17:47] their stuff on GitHub or for some period

[17:49] of time on gith when you can look at it

[17:50] and like at the time because of like

[17:52] plan MD files checked in and like

[17:54] everything attributed to CLA. So like

[17:56] that vibe coding kind of thing was was

[17:59] for like prototypes and whatever like

[18:01] that built that out. that was already

[18:02] out there to see. But then gradually a

[18:05] small version of this has like been code

[18:08] bases with a little bit of vibe slop on

[18:10] top. And an interesting sort of part of

[18:13] this was like

[18:15] how engineering teams and companies are

[18:18] now responding to that um with all kinds

[18:20] of like different findings. But but a

[18:21] lot of it has been challenge to review

[18:23] PRs. They're getting larger and larger

[18:25] and they're becoming like more

[18:27] psychological

[18:28] >> and engineers specifically are having a

[18:30] hard time keeping up with the the longer

[18:32] PRs that they're more frequent.

[18:35] >> Yeah. And there also there a lot of the

[18:37] code in those PRs is how an engineer

[18:40] wouldn't do it because as an engineer

[18:42] you sort of get a really bad feeling

[18:44] committing certain code because you

[18:47] think of your future self and the agent

[18:50] really does not care. This is I I will

[18:52] retell this story over and over, but

[18:53] like I I worked uh for an Xbox One game

[18:56] at the time um right around the Xbox One

[18:59] launch. So that was like a fixed date.

[19:00] It has to release on that day. So I

[19:02] worked on um uh the Halo Master Chief

[19:04] Collection and there was a game where

[19:07] you had like a matchmaking component and

[19:09] you had to like start this thing and

[19:11] whatever. And it was like it was an all

[19:13] hands-on deck kind of situation where

[19:15] people had to go in and unslop the

[19:18] humanmade slop that was the matchmaker.

[19:20] And it was like it was it was a system

[19:22] with like way too many states. We call

[19:23] it an emergence state machine because it

[19:25] was like 16 bulls on one massive thing

[19:27] and like in theory there were only six

[19:28] valid states but in reality it was a

[19:31] geometric explosion of possible states.

[19:33] And that's how a centi code feels like

[19:36] where it really should only be like a

[19:38] very clearly defined system but in all

[19:40] reality they're like oh we can config

[19:42] doesn't load let's catch it down and

[19:44] load the default config. So instead of

[19:46] actually failing, it now recovers. But

[19:49] now your code is way more complex than

[19:51] it should be because instead of failing

[19:53] properly, it is now recovering and

[19:56] entering these many more failure states.

[19:58] And that makes it much harder to work

[20:01] with this code because you can also not

[20:02] really ask the agent to refactor

[20:03] applications like oh yeah, this could be

[20:05] possible. So we need to maintain this

[20:07] variant. I think it's kind of even worse

[20:09] than what you described about your

[20:11] humanmade complex system because there

[20:15] are moments of brilliance in agents

[20:16] where they spit out perfectly fine

[20:18] simple code exactly the amount and type

[20:21] of code you didn't need for that

[20:22] specific thing and you as the steering

[20:25] engineer looking at that like wow this

[20:27] is amazing I can just sit back and not

[20:29] care because it's obviously doing the

[20:31] thing like two minutes later you have

[20:32] another agent running in this window and

[20:34] it spits out the worst horrible garbage

[20:36] suppose but you might not notice because

[20:38] now you have fallen into automation bias

[20:40] and think your your your agent is doing

[20:42] the job well. Do you think this might be

[20:45] our bit of a human bias because because

[20:48] you know like typically like onboarding

[20:50] a new engineer uh you have when you join

[20:53] a new grad you review their code and if

[20:56] it's terrible code you will review the

[20:58] next one thoroughly until they get to

[21:00] the point that oh it writes the code

[21:02] that I do and then it typically takes

[21:04] you know 6 months or a year or something

[21:06] like that but then you know I can trust

[21:08] this person. Yes, but you don't have

[21:09] anything like that with agents. Like

[21:11] agents don't learn. You can put as much

[21:13] stuff in the agents and do you build a

[21:14] memory system, but that's not the same

[21:16] type of learning than u a human does.

[21:20] Obviously, humans are failable as well.

[21:23] No, no, no matter. But they have some

[21:24] capability of learning

[21:26] >> and retaining that learning, right?

[21:27] >> Yes. And they also feel pain. And I

[21:29] think that's one of the defining things

[21:31] about humans. It's kind of ties back to

[21:34] what you said. Eventually, if the pain

[21:36] gets too big, you as a human are incent

[21:38] incentivized to fix the cause of your

[21:40] pain. And in a codebase, the cause is

[21:42] usually terrible interfaces, terrible

[21:45] complexity that you want to get rid of

[21:47] because you can no longer maintain that

[21:49] system. Isn't this why just holding on

[21:52] to that, you know, like senior engineers

[21:53] are always in demand because from the

[21:56] CEO sees a senior engineer as like they

[21:58] just get it done, but in reality, a

[22:00] senior engineer, most senior engineers

[22:02] who are effective, they've had battle

[22:04] scars. They've been burned. They felt

[22:05] the pain. You they saw what happened

[22:07] when they left tech def spiral. So they

[22:09] now make all these decisions that they

[22:11] know they they will help avoid. And of

[22:13] course through this uh progress goes

[22:15] faster. I personally think and your

[22:17] mileage may vary. But a a good engineer

[22:20] is an engineer that says no a lot and I

[22:22] don't need this a lot.

[22:24] >> Mhm.

[22:24] >> Because that keeps complexity down. If

[22:26] you're using agents, the exact opposite

[22:28] happens. You say yes, I want this and

[22:30] that. I want this and I want this and I

[22:31] want this because I don't have to type

[22:32] it myself. I don't have to think about

[22:33] it. I just give the little machine a

[22:35] prompt and it will spit out something

[22:36] that kind of looks like the thing I

[22:38] wanted. Good enough. And that's where

[22:40] all the problems start.

[22:41] >> And one thing that I also think is like

[22:43] good engineering is all about knowing

[22:44] the trade-offs that you have to make.

[22:46] And there's sometimes the right solution

[22:50] is actually

[22:52] if you were to sort of like sit at

[22:54] university and learn about it, you kind

[22:56] of learn that you shouldn't be doing

[22:57] this in a way. I think Kell Henderson

[23:00] had this once where he said like you you

[23:02] do the dumbest solution first until it

[23:04] doesn't work anymore because the the

[23:07] actual problem is there's so much stuff

[23:10] that you need to do that if you actually

[23:11] do the right solution the correct

[23:12] solutions all of this it is it you're

[23:14] creating the kind of complexity that

[23:16] kills you at scale and the engineer

[23:19] learns that but also like if you if if

[23:21] you don't have that battle scar it's

[23:23] actually very hard for you to argue

[23:25] correctly because it is it is this

[23:27] learning process that gives you the

[23:29] authority to then convince other

[23:31] engineers in the engineering org that

[23:33] you should be doing it this way. That is

[23:35] part of it. You learn that. But the

[23:37] other thing is also that the agents give

[23:40] you now world knowledge access. And one

[23:42] of the other things that I learned

[23:43] through interviewing engineering teams

[23:45] now is that the senior person says no

[23:49] knowing something and then 48 hours

[23:52] later the junior comes by and said like

[23:54] I talked to the agent and I already had

[23:57] this inkling but now I have all the

[23:59] evidence of why we shouldn't be doing it

[24:00] this way because like previously you

[24:03] really didn't have that readymade access

[24:06] to

[24:07] >> someone who can tell you a senior off.

[24:08] >> Yeah. Ex and and this this is creates

[24:12] other stresses now that were previously

[24:14] like not every team has that because

[24:16] it's like people going to the doctor

[24:18] with a jetp print out and saying this is

[24:20] what the machine said you better do

[24:22] that. Is it fair to say that we are

[24:25] based on what you're seeing and talking

[24:28] we might face a thing where it's very

[24:31] hard for experienced engineers to it's

[24:34] harder just for them to say no uh in

[24:36] spite of the product manager or a junior

[24:39] engineer saying

[24:40] >> it's much worse because the product

[24:41] management comes in sends pull requests

[24:42] and autom should them

[24:44] >> yeah that's another thing like

[24:45] non-engineers participating in

[24:47] engineering processes is is a thing now

[24:50] >> ask how that works

[24:53] Ask him how does it work?

[24:54] >> How how does it work Armen?

[24:56] >> Well, it's hard because if because on

[24:58] the one hand like it's well intended,

[24:59] right? If someone who's like

[25:01] >> what what is your experience? Is this

[25:03] your your company talking with other

[25:05] other people?

[25:06] >> So, first of all, like like we have a

[25:07] little bit of this air like we're small

[25:09] and so um like like my co-ounder for

[25:12] instance sometimes has like a pork on

[25:14] the website. I talked to people that

[25:15] have that at scale where like the

[25:17] marketing team all of a sudden does

[25:18] stuff on a website and and the sales

[25:22] team like creates ever more elaborate

[25:25] like sales demos that sort of land up on

[25:27] a GitHub or partially at this one one of

[25:31] the most funniest one was like where the

[25:33] sales demo built a feature that didn't

[25:35] exist but nobody noticed right so this

[25:39] this is all like this is new right

[25:41] because like previously none of that

[25:43] happened.

[25:44] >> But I think it's empowering like if your

[25:46] entire

[25:47] >> empowering it's like there's a good

[25:48] thing to it in too

[25:49] >> if your entire or if everybody in your

[25:50] or can participate in in in in the

[25:52] creation of software in some form right

[25:56] previously people couldn't do that like

[25:58] you had a designer who could figure

[25:59] something out in Figma but they might

[26:02] not be able to kind of put it into a

[26:04] clickable dummy demo whatever or you

[26:06] might have a PM who who wants to try out

[26:08] a feature without kind of wasting time

[26:11] of an engineer. Now you can do that. The

[26:13] problem is that people are now so

[26:15] focused on everybody can do everything

[26:17] now that they forget that you still need

[26:19] a process to kind of guard rail off all

[26:21] of that.

[26:22] >> And the integration part is the hard

[26:24] thing. It's like that Peter

[26:26] gave this idea of like the prompt

[26:28] request, but I'm actually really warming

[26:29] up to this idea like once you've

[26:31] demonstrated it,

[26:32] >> I no longer need your code. And and just

[26:34] just to recap, the prompt request was

[26:36] him saying that he doesn't like to get

[26:37] pull requests. and said he would rather

[26:39] see the prompt because he will run the

[26:41] prompt or he will tweak it and it will

[26:43] generate it in the style that

[26:44] >> for me it's less about like I want to

[26:46] see the prompt as it like what is it

[26:49] supposed to be doing and now that we

[26:51] understand because like actually in many

[26:53] ways I think like the interesting part

[26:54] is like often you don't really fully

[26:56] know what you wanted to do in the first

[26:57] place and so like the act of creating

[26:59] clarifies what you really want to do and

[27:02] so like that part is highly valuable

[27:04] often the approach and the code that

[27:06] comes out of it is not what an engineer

[27:07] there with sufficient seniority would

[27:10] have done. So it's not like I want your

[27:11] prompt so that I can reclank my clanker

[27:14] so that it does it slightly better, but

[27:16] more like now that we know what we

[27:17] wanted to build, it's probably faster

[27:19] for me to start.

[27:20] >> Yeah. And I also kind of disagree with

[27:21] Peter on I just need your prompt. I

[27:23] actually value seeing a terrible

[27:26] implementation of something. Um like if

[27:29] I get a pull request and most of the

[27:30] pull requests we get on the Pi

[27:32] repository are made by agents without a

[27:34] lot of human touch. let's say then I

[27:37] immediately know okay this is going to

[27:38] be garbage but it's valuable garbage um

[27:42] because someone has put in at least a

[27:45] minimum amount of thought instructing

[27:46] their agent to create this pull request

[27:50] and I get to see how a shitty

[27:51] implementation of what they wanted to

[27:53] build looks like and I get to I I don't

[27:55] need to waste my own time on trying that

[27:57] out. So somebody else tried it out

[27:58] already that the naive dumb agent do the

[28:01] thing do no mistakes uh version and that

[28:04] saves me time. I'm not saying I like

[28:05] pull requests by agents because they

[28:08] they're terrible and they autoc close

[28:09] them now,

[28:10] >> but they have value. It's it's not just

[28:11] a prompt. It's uh on an exponential rate

[28:16] sigmoid eventually always because ser

[28:18] dynamics, but uh I think we're going to

[28:20] find out way earlier than in previous

[28:22] cycles that this is a bad idea.

[28:23] >> That's good news. What I think is going

[28:25] to be interesting and I don't know the

[28:27] answer to this but uh I read this

[28:28] fascinating retelling of the British

[28:31] industrial revolution and how it it

[28:33] changed the textile industry.

[28:34] >> The industrial reind industrial. Yeah.

[28:36] >> Yeah. And so the the the the the general

[28:38] thesis on that article was like every

[28:41] time something at the head of the

[28:42] pipeline got optimized. It created an

[28:44] incentive downstream of the whole thing

[28:46] to create something right. is like in

[28:48] the beginning like if you can weave the

[28:50] thing faster then eventually you need to

[28:53] have Garn that can be weaved at faster

[28:55] speeds then eventually you need to

[28:57] everything sort of turned a bottleneck

[28:58] all the way down and like ultimately the

[29:00] biggest bottleneck in the entire thing

[29:02] turned out to be what I think like is

[29:04] actually the the next bottleneck we're

[29:05] hitting in engineering which is like at

[29:07] one point you made a shirt and if you

[29:09] didn't like the shirt you went back to

[29:10] the person that made it and they fix it

[29:12] up for you and so the actual thing was

[29:14] like if if the shirt is bad nobody cares

[29:16] about anywhere who destroyed fur in the

[29:18] process. Is it just going to get a new

[29:19] one? Right? Like the the responsibility

[29:21] actually went from anyone in this chain

[29:23] to the entire factory as a whole doesn't

[29:27] have to care responsibility anymore

[29:28] because we have we've commoditized the

[29:30] whole thing so much that that you don't

[29:32] you don't have to do this. And if you

[29:34] take the engineering approach of it,

[29:35] it's like a pretty significant part of

[29:39] running a company and running a service

[29:40] is like running it reliably. And so you

[29:43] have these postmortems on incidents to

[29:44] figure out like what went wrong in the

[29:46] process

[29:46] >> and you go back and fix the the shirt.

[29:48] >> Yeah. And and and the thing is like we

[29:49] we we we are running all on this idea

[29:52] that every engineer that sort of is in

[29:54] this creation process that ultimately

[29:56] let up carries some responsibility and

[29:59] that we're going to that person and not

[30:01] saying like to blame that person but

[30:02] like to figure out like why why did you

[30:05] do wrong here? And so like if you do if

[30:07] like the machine now produces stuff at

[30:09] like 10 times the speed the

[30:10] responsibility thing does not scale in

[30:12] the same way because a machine cannot

[30:14] yet be responsible. And I don't actually

[30:16] know if there is a future where you can

[30:19] abstract away human failure so much in

[30:21] in how we run engineering that now the

[30:24] entire company now no longer cares about

[30:28] who signed off on a poll request or

[30:30] something like that. We that we automate

[30:31] it in the same way I think as we are

[30:33] sort of automating t-shirt creation. I I

[30:35] just don't yet see that. But

[30:37] >> so here's the thing. I think one thing

[30:39] we software engineers or or IT people

[30:42] underestimate is just how freaking

[30:44] complex the world is and how much human

[30:47] squishiness is in each little nook and

[30:49] and granny and and corner, right? So we

[30:52] we thinking, oh, we could we were now

[30:54] able to automate that thing. Uh now we

[30:56] can automate everything like every bit

[30:58] of knowledge work. But but we as

[30:59] software engineers are so bad at

[31:01] becoming domain experts that we don't

[31:03] see all the non-machine parts that go

[31:06] into a workflow and we running through

[31:08] the same fallacy here again. We we

[31:10] seeing models doing incredible things.

[31:12] I'm not disputing that. Like this is for

[31:14] me this is like w basically all my

[31:17] research in the 2000s is now null and

[31:20] void because transformers can do all the

[31:22] things. But we are overextending that to

[31:24] to everything like we always do in

[31:26] software like like we did in edtech.

[31:28] Yeah. We have tablets in classrooms now.

[31:30] Sure. Now it's solved. Education is

[31:31] solved because we have now computers. Um

[31:33] >> well, in fact, I've heard I don't know

[31:35] which country it was, but they're now

[31:37] rolling back in Sweden. They're they're

[31:40] taking the tablets out from the

[31:41] classroom.

[31:42] >> It turns out if you do some scientific

[31:43] investigations into the tactics and

[31:46] effects on pupils, if you do just throw

[31:48] a bunch of tablets into a classroom,

[31:50] close it and hope for the best. Turns

[31:52] out the best is terrible.

[31:54] Um, so yeah, I'm that for me I think the

[31:58] biggest takeaway from the past two to

[31:59] three years is the hype is terrible

[32:03] because it's dehumanizes everything and

[32:06] I want to not be part of that circus.

[32:09] >> Well, speaking of not wanting to be part

[32:11] of the circus, let's talk about Pi,

[32:13] which is a which is a very popular

[32:15] >> Let me get my clown nose

[32:17] >> and also minimalist coding agent. C can

[32:19] we start with the the backstory of why

[32:21] you decided to build PI at a time where

[32:24] there were already uh agent harnesses

[32:27] around right because they were

[32:29] suboptimal.

[32:33] >> Tell me more.

[32:33] >> Yeah, sure. I so I I was a a believer in

[32:36] cloud code just because they kind of

[32:39] created that whole genre through the

[32:41] invention of a gentic search. I mean

[32:43] inventions. There were precursors to

[32:46] that and shows of giants and so on, but

[32:48] they were the first that packaged it up

[32:49] in a really compelling package. And at

[32:52] the time that fit my workflow really

[32:54] well. It was simply it was predictive.

[32:56] So the LLM um uristic nature or stoastic

[33:01] nature of of being kind of

[33:03] unpredictable, but everything around the

[33:04] LLM was kind of nice and tidy and easy

[33:06] to understand.

[33:07] >> So were you were a happy user of claw

[33:08] code, right?

[33:09] >> I was super happy. I was proitizing it.

[33:11] But eventually the team started dog

[33:14] fooding and getting more and more tokens

[33:17] I guess and kind of increased velocity

[33:20] and team size. And with that came more

[33:22] features and much much much more bucks.

[33:25] And I personally like simple tools that

[33:28] are stable um that I can rely on even if

[33:30] they have non-deterministic parts. But

[33:32] all the deterministic parts should be as

[33:34] stable as possible. And that was just

[33:35] not the experience with cloud code

[33:37] around summer 2025.

[33:39] >> Mhm. So I kind of soured on that real

[33:41] hard.

[33:42] >> Was it was it bugs? Was it unexpected

[33:44] behavior?

[33:44] >> Like so they take away your control of

[33:47] the context. They would inject stuff

[33:48] behind your back which is bad. And then

[33:51] your workflows that used to work stop

[33:52] working because there's now a system

[33:54] reminder that you don't even see in the

[33:55] UI. Um that will modify the behavior of

[33:58] the model. They would also do this to

[34:00] the system prompt. I I I reverse

[34:02] engineered. I mean, I wouldn't call

[34:04] opening an offiscated JavaScript file

[34:07] and unoffiscating it reverse engineering

[34:09] coming from a more low-level background,

[34:11] but I reverse engineered cloud code

[34:12] during the summer of 2025 and build a

[34:15] little service where I can track the

[34:17] progression or evolution of the system

[34:18] prop and tool definitions in cloud code

[34:20] and it's like every release it was like

[34:23] messing with stuff. CC history. Mario.at

[34:26] if you want to see that. And uh yeah,

[34:28] that that just messed with my workflows

[34:30] and I don't appreciate that. If I commit

[34:32] to a development tool, I want it to be a

[34:34] stable, reliable thing like a hammer. I

[34:36] don't want my hammer to break at a

[34:38] different spot every day.

[34:39] >> Yeah,

[34:40] >> that's terrible. So, that's what

[34:41] happened with Claude. But again, I'm

[34:43] this is not like I'm not roasting the

[34:45] team. I think they're some of them are

[34:46] really nice people I got to know on the

[34:48] internet. They're just dog fooding and

[34:49] that's perfectly fine. We need somebody

[34:51] who like goes the the full velocity kind

[34:54] of way. I But I don't want to work with

[34:56] a tool like that.

[34:57] >> Yep.

[34:57] >> Because I can't get work done.

[34:58] >> It sounds like the move fast and break

[35:00] things. to break things was not for you.

[35:02] >> No.

[35:03] >> And uh then I looked into alternatives

[35:05] and AMP and Droid came out around that

[35:08] time. I think

[35:09] >> pretty early in 2025.

[35:11] >> I don't remember.

[35:13] >> Was early was very early. I think they

[35:15] they sort of spun off from the same

[35:17] experience of taking because I think AMP

[35:21] was around when Clo came out. I'm pretty

[35:22] sure around that time. Yeah.

[35:24] >> Yeah. In any case, I looked into those

[35:26] harnesses and they were super good. um

[35:28] they were just super expensive as well

[35:30] because none of them could basically use

[35:33] what made cloud code enticing on top of

[35:35] it being a cool tool um the subscription

[35:39] and that works in an enterprise setting

[35:40] where you're paying by token anyways um

[35:44] but it doesn't work for the small

[35:45] tinkerer in the garage while I'm not a

[35:47] small tinkerer in the garage in the

[35:48] financial sense anymore I kind of still

[35:51] relate to that community and I would

[35:53] like to use my subscription with

[35:54] something so I looked into open source

[35:56] alternatives and found open code. But

[35:59] while that kind of wipes me with my OSS

[36:01] roots, um it too did stuff to the

[36:03] context I didn't appreciate behind my

[36:05] back. Um pruning tool results after a

[36:09] certain amount of uh uh tool result

[36:11] token output or asking an LSB server

[36:15] after every single edit the model makes

[36:18] uh if there is an error. Yes, there will

[36:20] be an error because the model isn't done

[36:22] yet with its work. So the code doesn't

[36:24] compile. So the LSP server will

[36:25] >> so like reaching out to LSP. The

[36:27] language um

[36:28] >> language server protocol server. Yes. So

[36:31] um when you go into VS code and you type

[36:33] some TypeScript you have like in the

[36:35] bottom some error diagnostics and that

[36:37] comes from an LSP server for TypeScript

[36:39] >> and Open Code runs an LSP server on your

[36:42] behalf in the background and feeds the

[36:44] model with uh diagnostics from that

[36:46] server on every edit. We as programmers

[36:49] how do we work right? We go into one or

[36:51] more more files. We added line after

[36:53] line after line and only then look at

[36:55] the errors that resulted from that. In

[36:57] open code's case or in other harnesses

[36:59] cases that also support LSP, the model

[37:02] calls an edit tool to change lines and

[37:05] they would inject the diagnostics after

[37:07] every edit call and that's just not

[37:09] smart because now you're confusing the

[37:11] model with you have an error, you have

[37:12] an error, you have an error on the model

[37:13] like yeah I know I know I'm not done

[37:14] yet. Oh, it's not Yeah, it's not great.

[37:17] Anyways, TLDDR uh open code wasn't for

[37:19] me um either. It was also I had to fork

[37:22] it to modify it which I don't think

[37:24] should be necessary. So then I just

[37:27] thought how hard can it be? I built my

[37:28] own little thing.

[37:29] >> And then your own little thing is pretty

[37:31] minimalistic. What does it use? What's

[37:34] the basics of of PI?

[37:35] >> The basics of PI are um my own

[37:38] abstraction over all the LM provider

[37:40] APIs because I didn't like the VCEL SDK,

[37:43] the VCELI SDK for various reasons. Armen

[37:46] kind of wrote a blog post eventually

[37:47] about that as well. It's obviously good

[37:50] to use. Lots of people use it. It just

[37:52] didn't fit my old man um sense of

[37:55] abstraction.

[37:57] >> But this is the beauty of software and

[37:59] open especially open source. You can

[38:01] build your own always.

[38:02] >> Yeah. And now with agents you can even

[38:04] do it faster and produce terrible

[38:05] complex software. No. So I built an

[38:08] abstraction over that. Then I built a

[38:09] little abstraction for generalized agent

[38:12] loop with tool calling and streaming all

[38:13] of that. I built a bespoke little tool

[38:16] that doesn't flicker or not a lot. And

[38:17] then I tied that all together into a

[38:19] coding agent that looks like clot code

[38:20] or codeex or whatever you have. Um

[38:22] that's it. And the extent ability comes

[38:24] from the fact that this minimal core has

[38:27] so many hook points uh that you can

[38:30] basically hook into with a simple

[38:32] TypeScript module um that gets loaded

[38:34] into the same node process and that

[38:36] allows you to do things like provide the

[38:38] LLM with custom tools uh do your own

[38:41] compaction implementation uh fully

[38:43] revamp the TUI itself. You can modify

[38:46] everything in the TUI. So if you have a

[38:48] special

[38:48] >> the terminal UI exactly

[38:50] >> if you want the TUI to behave

[38:52] differently for a specific workflow you

[38:54] have like say you're non techy uh you

[38:57] can change the toy to become whatever

[38:59] you need as a non techy and I have a

[39:01] couple of nonty friends that did that

[39:03] because they don't need to know how to

[39:05] build this they can just ask pi to build

[39:07] it and pi will modify itself oh so this

[39:10] is a thing right so you can ask pi to

[39:13] modify itself because of the extension

[39:15] points and it can write code that

[39:17] extends itself and it's trivial, but

[39:20] it's a big unlock.

[39:21] >> Is this what you meant when you said

[39:23] that? For open code, you needed to fork

[39:25] it to to modify it. It doesn't have

[39:26] this.

[39:27] >> It does have a plug-in system, but

[39:29] there's not a lot of extension points

[39:30] and was very rigid. I think they changed

[39:33] it recently. I think it's much more open

[39:34] now. Um I I haven't kept up with it, but

[39:37] might be better now.

[39:38] >> So, I guess Pi Star has this very

[39:40] minimalistic thing. As I understand the

[39:42] the tools it has is read, write,

[39:44] >> read, write, edit, bash. It's all you

[39:45] need. That's it. And and then you can

[39:47] actually like start to make it your own

[39:49] like okay like at at what are examples

[39:51] that people would add. Pi doesn't have

[39:53] MCP. People just ask Pi to build MCP

[39:55] support into PI. Pi doesn't have a plan

[39:57] mode. Armening goes and my plan mode

[40:00] must be fantastic bespoke and super.

[40:01] >> I don't have a plan mode.

[40:02] >> Yeah. But he has like five

[40:04] implementations of a plan mode until he

[40:06] realized plan mode is entirely useless.

[40:10] Other people just like messing with the

[40:11] UI and making it their own, like a

[40:14] different visual style of the editor box

[40:16] where you enter your prompts, stuff like

[40:17] trivial stuff, more cosmetic stuff. Um,

[40:19] other people have re-triggered it for

[40:22] fullblown RL environment for open

[40:25] weights models where they use pi as the

[40:27] agent that does that part of the RL

[40:30] execution environment. So it's you can

[40:33] do anything really. What drew me to it

[40:35] beyond like actually using the library

[40:37] abstraction was was in fact the the

[40:39] custom tools part because um one moment

[40:43] for me was um over Christmas again like

[40:45] many people had some time and I tried to

[40:47] build other things and I and Peter was

[40:49] talking to me in in November that he's

[40:51] like vibing without looking at code more

[40:53] or less. I don't know exactly how he

[40:54] said like but like he's like he can do

[40:56] this now like okay I I want to build a

[40:58] thing where I don't look at the code. I

[41:00] wanted it to not look like slop. I

[41:02] wanted I wanted a version of it where

[41:04] like afterwards like even though I don't

[41:05] really look at the code it should look

[41:07] like what I would have written and so

[41:10] and I wanted to make a game and so then

[41:12] I I basically

[41:14] started the whole experience with like a

[41:16] just basic pie like we want to build a

[41:18] game but actually before we build a game

[41:20] I want you to set up the codebase in a

[41:22] way that you can validate the changes

[41:24] that you're making but also I can see

[41:25] them like like a like a twoprong kind of

[41:29] approach like I wanted to be in the loop

[41:32] but also O have the agent be able to

[41:34] validate itself and and what what sort

[41:36] of emerged out of that was well first of

[41:38] all like it built itself some debugging

[41:40] tools into the game so it can make

[41:41] screenshots and like run a simulation

[41:43] and sort of dump out state and read it

[41:45] again but also pi can can show images in

[41:48] a TUI and and and I added so a bunch of

[41:51] like I talked with the twanker to figure

[41:53] out like what would be interesting

[41:54] things to do but we we ended up having

[41:56] like a all the screenshots I can tap

[41:59] through quickly in the UI or I can pull

[42:01] Alo this great feature it can reverse to

[42:03] an earlier state in the conversation and

[42:05] then it can branch within the

[42:06] conversation to build a bunch of stuff

[42:08] around that because like these the

[42:10] sessions especially with screenshots and

[42:11] it become very token inefficient very

[42:13] quickly. It was actually one of the

[42:14] other things that pi was rather quickly

[42:16] rather good at was having a lot of

[42:17] screenshots in it

[42:18] >> because open claw people had a lot of

[42:21] screenshots in their chats and open claw

[42:23] is using pi. Yeah. So yeah,

[42:25] >> but but having this like it it felt

[42:28] really magical for me to actually treat

[42:32] the problem as I don't know what the

[42:34] right way of engineering here is but

[42:36] very clearly part of it is like I should

[42:38] be in the loop so we can figure out like

[42:39] how to specifically for the problem at

[42:41] hand do that and and it turned out like

[42:43] for web project and computer games and

[42:46] some of the other things I tried they're

[42:47] kind of different but very many of them

[42:50] are sort of come down to a similar thing

[42:53] where

[42:54] The agent interacts now with my program

[42:56] and it should do the most optimal way

[42:58] and I want to interact with it in

[43:01] conjunction with it interacting with the

[43:03] program and the entire experience should

[43:05] be as little confusing as possible to

[43:07] both me as a human and to the agent. And

[43:09] I found it very very fascinating just to

[43:13] see how that emerges where like your

[43:15] tool all of a sudden when you launch it

[43:17] in this program looks and feels

[43:18] different than if you launch it in the

[43:20] other program.

[43:21] >> I really like this point. Arma made just

[43:23] a few seconds ago that AI works best

[43:25] when the engineer stays in the loop and

[43:27] the system can actually validate what

[43:29] changed. And this is a great time to

[43:31] mention our season sponsor Sonar. AI can

[43:34] now generate code faster than you can

[43:36] verify it. Sonar, the makers of Sonar

[43:38] Cube, sees this leading to serious gap

[43:40] in verification. With the rise of coding

[43:43] agents autonomously writing code,

[43:45] verification is no longer a nice to

[43:47] have. While the latest coding models are

[43:48] extremely intelligent, they also are

[43:50] errorprone and they don't fully

[43:52] understand your code base and your

[43:54] context or your objectives. This is why

[43:57] verification must be mandatory in

[43:58] agentic workflows. Sonarq provides a

[44:00] zerorust multi-layered approach to code

[44:02] verification that is consistent and

[44:05] repeatable. It analyzes semantic syntax,

[44:07] data flows, and architectural boundaries

[44:09] at agent speed acting as a critical

[44:11] trust and verification layer before any

[44:14] code reaches production. Covering 40

[44:16] plus languages and 7500 issue types,

[44:19] Sonar Cube is the most comprehensive

[44:21] code verification platform available.

[44:23] And with easy integration via MCP, CLI,

[44:26] and hooks, it fits right into your

[44:27] existing AI tool chain. Let agents move

[44:29] fast and have Sonar Cube as the

[44:31] independent multi-layered verification

[44:33] for safe, reliable, and auditable

[44:35] agentic development. Head to

[44:37] sonarsource.com/pragmatic

[44:39] to start verifying your agentic workflow

[44:41] today. I'd also like to talk about our

[44:43] presenting sponsor, Statsig. Static

[44:45] build a unified platform that enables

[44:47] both experimentation and continuous

[44:49] shipping. Built-in experimentation means

[44:52] that every roll out automatically

[44:53] becomes a learning opportunity with

[44:55] proper statistical analysis showing you

[44:57] exactly how features impact your

[44:59] metrics. Feature flags let you ship

[45:01] continuously with confidence. And

[45:03] because it's all in one platform with

[45:04] the same product data, teams across your

[45:06] organization can collaborate and make

[45:08] datadriven decisions. To learn more,

[45:10] head to stats.com/pragmatic.

[45:13] With this, let's get back to the episode

[45:15] and to the topic of general versus

[45:17] purpose-made tools.

[45:18] >> Yeah, I mean, I spend a lot of my youth

[45:21] on construction sites to earn money. And

[45:23] you don't use a hammer for all your

[45:25] problems at a construction site. You

[45:27] have a screwdriver, you have your

[45:28] hammer, you have your drill, you have

[45:30] whatever. And I think in engineering,

[45:32] it's kind of the same. Um, I'm not using

[45:34] the same tool for every task I do as an

[45:36] engineer. So now, if I use an agent, I

[45:39] don't want a general agent for every

[45:41] task, per se. I want a specialized thing

[45:44] where I know the performance will be

[45:45] topnotch for that specific task because

[45:47] we built the harness in the way that the

[45:49] agent can be most effective at this this

[45:51] task just because of the construction of

[45:53] the way the the harness is constructed

[45:54] and that's what I wanted to enable with

[45:56] PI. That said, I'm probably the person

[45:59] that has the least amount of

[46:00] modifications in Pi. I have like two

[46:02] extensions that I use and they're

[46:03] trivial. They're basically just if you

[46:05] see a URL that looks like a GitHub issue

[46:07] or pull request thing, pull down the

[46:09] details via the GitHub API and display

[46:12] me a small little widget on top of the

[46:14] editor that gives me the issue title,

[46:16] the author account, uh, and a link to

[46:19] the issue. That's basically all I do.

[46:21] >> Well, but it might work for you as a

[46:24] minimalist.

[46:24] >> Yeah, I mean, that's how I work on the

[46:26] on the Pyon repository because I might

[46:27] have two or three of of sessions open in

[46:30] which I process an issue or pull

[46:31] request. That way I I remember what s

[46:34] what the session was about.

[46:36] >> But sounds like you also made your Pi

[46:38] for that for working on the Pi monor

[46:40] repo a specific one. And if you if you

[46:42] were working on a if you went back to

[46:44] building games, you'd probably have a I

[46:47] never thought of the fact that you might

[46:49] want a different harness for a different

[46:50] task. I guess we just kind of assume

[46:52] that most developers you work on your

[46:54] main thing at work. You might have a

[46:56] side project and just experime

[46:58] experiment with whatever. But this this

[47:01] I wonder if this is a new new thing that

[47:03] we we could never have. We could never

[47:05] have custom tools for a project. That

[47:07] that just sounds crazy, you know. Here's

[47:08] here's the like my intuition is this. I

[47:10] think where we are going is software

[47:12] that modifies itself on behalf of the

[47:15] users's wishes and needs and the agents

[47:18] can do that now if you give them enough

[47:19] rope to modify themselves. And I think

[47:22] with Pi that is my first foray into this

[47:25] kind of selfmodifiable malleable thing.

[47:28] um just for the coding agent sector but

[47:30] I think this this this actually can be

[47:32] extended to all kind of knowledge work

[47:35] to a degree for specific tests within

[47:37] the broader set of knowledge work

[47:39] obviously the humanization and so on you

[47:40] know but yeah um the next plan here is

[47:42] actually to have an alternative user

[47:45] interface to the TUI because the TUI is

[47:47] obviously limited and the best

[47:50] alternative stack is obviously the web

[47:52] because it works everywhere and can do

[47:53] anything so once I have that built out

[47:56] that then it really becomes was

[47:58] interesting because then you're not

[47:59] limited anymore to the line based

[48:00] rendering of a terminal. Now you can do

[48:02] really really interesting stuff. And so

[48:04] yeah, we'll see how that works out.

[48:06] >> And one reason that I learned about Pi

[48:10] before I I knew that it was this

[48:12] minimalist interface is how OpenClaw is

[48:15] using Pi. How did that come? And we were

[48:19] hanging out and and reviewing each

[48:21] other's blog posts and and just throwing

[48:23] ideas at each other. And in October, I

[48:25] started building out Pi and Peter

[48:26] started be building out V relay, his

[48:28] little WhatsApp assistant, so to speak.

[48:31] >> Oh, that's how it started.

[48:32] >> Yeah. And he was in search of a a gent

[48:37] or copy. I think it started out by him

[48:39] taking Pi and cloning it and calling it

[48:42] towel and then modifying it. But

[48:44] eventually he got tired of having to

[48:46] maintain that. So he just said, I'm

[48:48] going to use your stuff. And that's how

[48:50] it ended up being. Pi wouldn't have

[48:51] compaction if it weren't for open call.

[48:54] >> No,

[48:54] >> I specifically built that because Peter

[48:56] was crying in the in chat and I need

[48:58] compaction. Okay, you get compaction,

[49:01] but I'm going to tell all my users,

[49:02] don't use compaction. It's bad for you.

[49:05] Yeah, but that's I guess the beauty of

[49:06] of building on top of open software one

[49:08] another, right?

[49:09] >> I mean, it has pros and cons. Yes, I'm

[49:12] now get to enjoy all the openclaw

[49:14] instances that think bugs in open claw

[49:16] are actually pi bugs. So they

[49:18] autonomously send me a gazillion issues

[49:20] and pull requests without the users

[49:22] probably even knowing and I get to deal

[49:24] with that in my open source. So that's

[49:25] not that's a negative side effect.

[49:27] >> Well, so you're you're really on the

[49:28] receiving end of this I guess.

[49:30] >> I mean just just like open call itself

[49:32] is which is much more exposed to this

[49:34] problem. I mean they have tens of

[49:35] thousands of issues now and there's no

[49:37] way they can get a good uh grip on that.

[49:39] But but how are you dealing with the

[49:41] fact that you now have open claw just AI

[49:43] autonomously opening uh things on your

[49:46] repo as a maintainer? Do you build tools

[49:48] to battle this and try to close them out

[49:51] or

[49:51] >> build a tool for open claw ones which

[49:53] embeds issue and pull requests into a 3D

[49:55] space so I can see the clusters of

[49:56] similar things that agents would have

[49:58] sent to the repository and then I can

[50:00] bulk select things and close them out in

[50:02] in

[50:03] >> Oh really? So you actually have a 3D

[50:05] like visualization.

[50:06] >> Yeah. open for context at I think it's

[50:10] less crazy now but end of December to I

[50:14] think midFebruary

[50:16] I mean it was exploding obviously but

[50:18] like this explosion almost like directly

[50:20] translated to I I I was on this repo

[50:23] refreshing pull request and the number

[50:25] went up

[50:28] >> we we actually tried to contri

[50:30] contribute and help out Peter a little

[50:32] bit but I immediately gave up

[50:33] >> I didn't know how to do anything useful

[50:35] there was looking at this I was

[50:37] This is a type of software engineing I'm

[50:39] just not used to.

[50:40] >> Yeah, I I I would fix two things and

[50:41] spend an hour on them and then five

[50:43] minutes after I committed and pushed it,

[50:46] some clanker comes along and just

[50:47] reverts my fixes and this is not how I

[50:50] >> Okay. Can we talk about the name of the

[50:52] name Clanker?

[50:53] >> Oh, sure. Um, so Clone Wars, Star Wars,

[50:56] I I actually never watched it. Um, but

[50:58] uh kids of friends of mine watched it a

[51:01] lot while we were visiting them. So I

[51:02] kind of through osmosis got the lore and

[51:06] there is an army of robot robots and the

[51:09] Jedi would call them clankers or people

[51:12] who call them clankers because when they

[51:13] move they clank clank clank. Yeah,

[51:15] that's the origin of that. Yeah. So an

[51:18] AI a droid. Yeah. Exactly. Yeah. But

[51:21] coming back to the how do you deal with

[51:23] the influx of agentic pull requests and

[51:25] issues? I just auto close every pull

[51:28] request. A human agent doesn't matter.

[51:30] Um, what I do is if I haven't had

[51:33] contact with you previously, my GitHub

[51:36] workflow knows about this because if you

[51:38] had, you're in a file in my Git

[51:40] repository, your account name. So if

[51:42] you're not in there and you send me a

[51:43] pull request, your pull request gets

[51:45] autoc closed.

[51:46] >> Mhm.

[51:47] >> And then my little workflow posts a

[51:49] comment under your pull request that

[51:50] says, "Hey, thanks so much for

[51:52] contributing. Really appreciate it.

[51:53] Could you please open an issue in a

[51:55] human voice? uh no longer than a

[51:57] screen's worth of text and uh if I like

[52:00] it I type looks good to me and then that

[52:03] account name gets put into the file and

[52:05] the next time they send a pull request

[52:07] they pass and it turns out agents don't

[52:11] see the comment my GitHub workflow posts

[52:13] underneath the pull requests. So this is

[52:16] a great filter for filtering out agents

[52:18] and keeping the humans safe more or less

[52:21] from

[52:22] >> this this is interesting. I wonder if

[52:24] this might be the like an unavoidable

[52:26] future where like we just need we need a

[52:29] way to separate is this coming from a a

[52:31] human with an intent or an AI.

[52:34] >> I don't necessarily care if if if it

[52:37] were actually a good PR then if it came

[52:39] from a machine it's it's it's actually

[52:43] fineish. I think what's interesting in

[52:45] PI is like and and open CL even more so

[52:46] is like it it accumulates pull requests

[52:49] well actually there was no

[52:50] intentionality behind it at all and so

[52:52] the the person that dispatched the

[52:56] machine didn't actually care that much

[52:58] about it

[52:58] >> but didn't even know about it

[52:59] >> or didn't even know about it and I've

[53:02] done open source for many years and

[53:03] there was also there was a there was a

[53:06] big difference between someone send a

[53:07] pull request up or like an issue and

[53:09] like hey please fix this but actually

[53:12] didn't care enough

[53:14] to even reply to questions anymore. Like

[53:16] this not uncommon. And then you don't

[53:19] actually have to fix that, but you have

[53:21] to close it out because like maybe it's

[53:22] it's still useful input, but like it

[53:24] clearly that person wasn't caring

[53:26] enough. And with the pull request, it's

[53:27] even worse now because they come in so

[53:28] quickly that many of them cannot be

[53:30] merged anyways without manual resolution

[53:33] of the conflict. And there's a there's a

[53:36] lack of back pressure mechanism because

[53:39] even I as a human if I see there's like

[53:42] 500 pull requests open like I probably

[53:44] will not contribute to this thing now

[53:46] because at the worst I will make it

[53:48] worse. Yeah.

[53:49] >> And and I think previously in open

[53:51] source you had the people who would just

[53:53] send issues and be very entitled and say

[53:55] you're the worst person on the planet if

[53:56] you don't fix my little issue. But

[53:58] that's fine that can be handled. And

[54:00] pull requests were kind of special

[54:01] because it needed a human to invest

[54:03] quite a bit of time to produce them and

[54:06] you don't have that anymore. You just

[54:08] have people, oh this this should be

[54:10] easy. Uh agent, please do this thing.

[54:11] Make no mistake, send it to this

[54:13] repository and that's just not going to

[54:14] happen. So basically what we need are

[54:16] bottlenecks. I'm not necessarily I don't

[54:18] necessarily need human verification or a

[54:20] verification that you're human. I just

[54:22] need a bottleneck that allows me to

[54:24] process the amount of incoming things as

[54:27] a human because in order for Pi to not

[54:30] dtoriate into a pile of garbage, I still

[54:33] believe that it needs me and other

[54:35] capable people reviewing at least the

[54:37] important code and for that I need

[54:40] bottlenecks because otherwise I can't

[54:41] deal with.

[54:42] >> It's it's a second law of

[54:44] thermodynamics, right? It's like

[54:45] everything degrades towards chaos and

[54:47] you have to put extra energy in to to

[54:49] keep it away from this uh from this

[54:52] outcome and we don't see and feel like

[54:56] the pain of the codebase anymore if we

[54:58] stop looking at it and people don't feel

[55:00] the pain or like they feel no restraint

[55:03] anymore and and it's the issues are also

[55:07] interesting because on the one hand it

[55:09] is something great about someone doing

[55:11] an investigation and sending you a

[55:14] description of that that can be good and

[55:16] can be bad, but they look very similar.

[55:19] Like it takes quite a bit of energy to

[55:22] tell apart a good and a bad AI generated

[55:25] issue request. And unfortunately, like

[55:27] most of them are not great, but some of

[55:30] them are actually good and that's also

[55:33] kind of it's weird like all of it is

[55:35] weird. I I really don't know what the

[55:37] future of open source is in many ways

[55:38] because like the a lot of open source

[55:41] really worked because people piled out

[55:42] on hard problems and so they congregated

[55:44] around it and said like now we need to

[55:46] have a good database so we're going to

[55:47] put all this energy on building a good

[55:49] database and the the value of open

[55:51] source came from there's some hard

[55:53] problems and we're going to our energy

[55:55] together and we're trying to figure out

[55:56] how to solve it and and now it feels

[55:59] like open source is all about like

[56:01] growing stuff up. What what really

[56:03] grinded me so mad was people

[56:08] particularly like a lot of Atlantic

[56:09] engineering right now is like building

[56:10] more stuff for Atic engineering. So it's

[56:12] like it's yuborous or yuborous or what I

[56:15] call it and and I I see this tweet and

[56:17] it's like oh I solved problem XYC and

[56:20] here is my solution for it and you click

[56:21] on this thing it's like it's 48 hours

[56:23] old that person probably never used the

[56:26] thing that they built. I would like to

[56:27] suggest to the viewership to look at

[56:30] Arvin's GitHub account over the last

[56:31] year and what happened there.

[56:33] >> Yeah, I built a lot of the stuff, but I

[56:35] don't then go on Twitter say like, "Hey,

[56:37] I solved the problem, right?" is like I

[56:39] I have a [ __ ] ton of VIP slop on my

[56:41] GitHub account and I wish I could mark

[56:44] it differently because like maybe

[56:45] there's some utility in it, but unless

[56:47] you're going to actually have that

[56:49] codebase still be there a year, a year

[56:52] and a half from now and someone is still

[56:53] using it, the utility of that is

[56:56] actually not validated in a way. And

[56:58] there's so many markers and and metrics

[57:01] you can look at now for GitHub that

[57:03] really demonstrate this this explosive

[57:05] growth of it.

[57:07] But if you were to then maybe find some

[57:09] other number to see like how many of the

[57:11] things that are being created are

[57:13] actually turning into like really

[57:14] fundamental pieces that can sustain open

[57:17] source communities that can that can

[57:18] actually deliver this value that scales

[57:22] amazingly. We haven't actually created

[57:24] many VIP engineered projects that have

[57:29] become that. But I I like how you

[57:31] mentioned energy and how open- source

[57:34] always worked. If we just think preai

[57:37] again, let's say Linux, the most

[57:38] successful or or widely used open source

[57:40] project, it has both an energy and a

[57:42] structure. You know, people come in with

[57:44] intent that they want to add something.

[57:46] They have a process where it goes

[57:47] through. There's human trust at every

[57:49] level. There's a little pyramid and in

[57:50] the end it all goes back. Each change

[57:52] request goes up one level and in the end

[57:54] Lionus uh does the cut. But there's a

[57:57] lot of energy. There's a lot of intent.

[57:59] uh there

[58:00] >> there's a lot of humans

[58:01] >> there there's a lot of humans and it was

[58:04] always about human energy and now we

[58:06] suddenly have this AI which it's just

[58:09] tokens right now they're who knows how

[58:11] much they're subsidized or or not or

[58:12] it's just machines doing and then

[58:14] suddenly you know they create plausible

[58:15] things that that look like human energy

[58:17] and it's hard to differentiate and

[58:19] suddenly just like there was this wrench

[58:21] >> actually disagree I don't think a lot

[58:23] has changed to open source

[58:25] >> okay

[58:25] >> um

[58:26] >> the volume has changed

[58:27] >> no yes uh But that's just a number. Uh

[58:30] the the amount of as you said the amount

[58:32] of actually useful and maintained

[58:33] projects has probably not changed a lot.

[58:36] >> So you're saying that the ones that were

[58:37] there, they're still useful and

[58:38] maintained.

[58:39] >> Not even the ones that were there, there

[58:40] might I mean there's a specific rate of

[58:42] new open source project that survive

[58:44] longer than two weeks.

[58:45] >> Mhm.

[58:46] >> That's always been the case, right?

[58:47] >> Mhm.

[58:48] >> So now we just have more projects that

[58:50] die after two days than before. But we

[58:53] still have the same amount of projects

[58:55] that will have a long-term viability

[58:57] just because there are humans that

[58:59] actually care to maintain the thing over

[59:01] a long time. Build a community of humans

[59:04] that support the entire thing. Build an

[59:06] ecosystem around the entire open source

[59:08] project. That makes

[59:09] >> you say not you're not believer into

[59:10] mold book.

[59:12] >> No, I mean good job meta putting that

[59:15] up. Super useful. Um, no. I I I think at

[59:19] the end of the day we we're kind of

[59:20] freaking out when we don't actually need

[59:22] to because apart from the fact that I

[59:25] personally can now generate code faster

[59:27] speed of light for me building an open

[59:29] source project and that entails not just

[59:30] the code but the community around it the

[59:32] spirit around it the ecosystem around it

[59:34] nothing changed um what changed is

[59:37] mechanical parts I I need the

[59:39] bottlenecks to deal with the influx of

[59:41] exponentially growing uh agents pull

[59:44] requests whatever um GitHub itself is

[59:46] under immense pressure Because now it's

[59:48] not just humans hammering their infra,

[59:50] it's now billions or millions of Open

[59:53] Claw instances hammering their infra.

[59:55] >> Yeah,

[59:56] >> everybody complains about GitHub going

[59:57] down. I actually think they're doing a

[59:59] pretty good job. Like that's a lot of

[1:00:01] traffic that's coming their way since

[1:00:04] basically Christmas. It's basically open

[1:00:06] call. So yeah, I I I would be a little

[1:00:08] bit more optimistic. We're just indeed

[1:00:11] messing around and finding outstage at

[1:00:13] the moment and everybody wants tokens to

[1:00:15] be a KPI just like lines of code used to

[1:00:18] be a KPI. We've seen this speaking

[1:00:21] around of of things that don't change

[1:00:22] and messing around and finding out. You

[1:00:24] you wrote a a tweet or or you wrote

[1:00:27] somewhere that your biggest enemy is

[1:00:29] complexity. It's also your agent's

[1:00:31] biggest enemy. Can we talk about that?

[1:00:33] >> Very simple. If I have a 600 lines of

[1:00:36] code code bis and my agent can at best

[1:00:39] be affecting effective up to a context

[1:00:41] window size of around 200,000 tokens,

[1:00:44] how much of the code can the agency see?

[1:00:46] A third, right? Great. Um, if you manage

[1:00:50] to get all the relevant code for a task

[1:00:53] into that context window, you're

[1:00:56] probably okay. Although that is a

[1:00:59] separate project an information

[1:01:00] retrieval pro uh problem which is not

[1:01:03] solved and which agentic search also

[1:01:05] doesn't solve that is does are you sure

[1:01:07] that the agent finds all the relevant

[1:01:09] code it needs to find to to fulfill a

[1:01:11] thing that's also where all the garbage

[1:01:13] code comes from because it doesn't see

[1:01:14] all the thing it needs to see in this

[1:01:16] case let's assume the best case

[1:01:18] information retrieval is solved

[1:01:19] everything fits into a context agent

[1:01:21] does a good job okay that's not the

[1:01:24] reality we're living in because now the

[1:01:25] agent spit out so much code they

[1:01:27] themselves cannot possibly read into

[1:01:30] their context on a new task anymore. You

[1:01:32] know what what I mean?

[1:01:34] >> Yep. They develop their own context

[1:01:35] window.

[1:01:35] >> Yeah. Exactly. The complexity they add

[1:01:37] is their own worst enemy because

[1:01:39] eventually the code base will be so big

[1:01:41] and so complicated and so interconnected

[1:01:44] um that the agent has absolutely no way

[1:01:47] on a technical level to ingest all the

[1:01:49] context it needs to do the new task. And

[1:01:52] I would like to point out that the agent

[1:01:54] has learned all of this garbage from the

[1:01:56] internet and from us because on the

[1:01:58] internet there's all our old code. While

[1:02:00] there are some pearls, uh there's also a

[1:02:03] lot of swine.

[1:02:05] um because we have a gazillion GitHub

[1:02:07] projects from the olden days where we

[1:02:09] just tried out things and because

[1:02:11] instances like Linux or any other really

[1:02:13] well-maintained and well-ritten open

[1:02:15] source project are minuscule in compared

[1:02:18] to all the rest of the garbage and a

[1:02:20] machine learning model will kind of

[1:02:23] converge towards not the well simplified

[1:02:25] to the mean right and what is the mean

[1:02:27] then it's it's not the handful

[1:02:29] comparatively of excellently engineered

[1:02:31] projects it's all the garbage on the

[1:02:34] internet all the cargo culting all the

[1:02:37] trend type of the day kind of stuff and

[1:02:40] that's what we get when we let the

[1:02:41] agents do all the things for us.

[1:02:43] >> Yeah. So we have this problem of things

[1:02:45] are getting more complex which slows

[1:02:47] agents down which will in fact impact

[1:02:49] quality which we were just talking about

[1:02:51] but Armen now that you're you're

[1:02:52] building your own startup

[1:02:55] you two of you're building your startup

[1:02:56] now how are are you and you're working

[1:03:00] with agents right and they they will

[1:03:02] have these things how are you dealing

[1:03:04] with generating code building products

[1:03:08] balancing quality tech complexity

[1:03:11] >> I'm dealing with that

[1:03:12] >> badly look I think that

[1:03:13] >> we're coping. We're not dealing.

[1:03:15] >> I don't know if I wrote this in the

[1:03:16] blog. I definitely have it on my slides

[1:03:18] for for the for a conference here. It

[1:03:20] was um I enjoyed the time from from

[1:03:24] April to about October immensely because

[1:03:28] it felt like I can do so much but also

[1:03:32] like there was no heightened expectation

[1:03:35] like the world has not yet gotten used

[1:03:38] to this idea that everything has to now

[1:03:40] also move at 10 times the speed. And

[1:03:42] there was a there was a moment of time

[1:03:44] where I felt like like we we worked in

[1:03:46] this vibe tunnel thing in the beginning

[1:03:48] and it was like it felt so much fun

[1:03:49] because like I I have time now to play

[1:03:52] with the kids and I just prompted a

[1:03:53] little bit on my phone and like it felt

[1:03:56] >> VIP tunnel was where you could set up

[1:03:57] with your phone talking with your

[1:04:00] machine where it wasn't that easy

[1:04:01] >> terminal basically.

[1:04:02] >> Yeah. And it's not that we did much with

[1:04:04] it, but like I it it it had this like

[1:04:06] happy vibe and like I know that I spent

[1:04:08] too much time on the computer, but like

[1:04:10] it didn't I didn't feel any pressure.

[1:04:13] But now it's like this like we're

[1:04:15] collectively feeling like everything has

[1:04:17] to ship faster. It has to like iterate

[1:04:19] faster like the the the baseline that we

[1:04:23] want to achieve in terms of fidelity and

[1:04:24] everything has to be higher. And so now

[1:04:27] it feels very stressful

[1:04:29] >> even in your own startup.

[1:04:30] >> Yeah. Because like to some degree you

[1:04:31] cannot like

[1:04:33] >> you can be the most stoic person in the

[1:04:35] world and it's still going to get at you

[1:04:37] in a way that I'm slowly learning to

[1:04:41] work with my own emotions in a way on on

[1:04:43] like on dealing with this. is I I find

[1:04:45] it very very hard in a way to because

[1:04:47] like I was I was used to things working

[1:04:50] a certain way and and I I I knew how I

[1:04:52] do some stuff and and then I fell a

[1:04:54] little bit too much in the trap of like

[1:04:56] giving into the machine and actually

[1:04:58] doing things in a way that I normally

[1:05:01] wouldn't have done things

[1:05:02] >> that you regret.

[1:05:03] >> It's definitely a gentic regret.

[1:05:05] >> Gentic regret. Yeah. And so like the

[1:05:07] quite frankly the answer is like I I I

[1:05:08] feel like now with a little bit of power

[1:05:11] of hindsight um learned some things that

[1:05:14] I wish I would have learned probably in

[1:05:16] November.

[1:05:16] >> Tell us.

[1:05:18] >> Well I mean like a lot of it is like

[1:05:19] really the recognition that if you

[1:05:22] there's no back channel to the to me or

[1:05:24] to any other engineer when under normal

[1:05:26] circumstances there was a back channel.

[1:05:27] was this this this feeling of like

[1:05:29] things are not quite right in the

[1:05:32] codebase like there was this now the

[1:05:34] change is harder and like the complexity

[1:05:36] like do you sort of see then the

[1:05:37] complexity of the pull request getting

[1:05:39] higher but like if you rubber stamp it

[1:05:40] then like what's what's the back channel

[1:05:42] there and so like this this mechanism

[1:05:44] this back pressure this friction in the

[1:05:46] codebase you don't feel when you work

[1:05:48] with the agent

[1:05:50] >> I think there's a way to kind of measure

[1:05:51] it and um like if I scan through my

[1:05:54] sessions on a project from start to

[1:05:57] current date. I think the frequency of

[1:06:00] curse words increases because the agent

[1:06:02] starts messing up more because it itself

[1:06:04] cannot deal with the complexity of the

[1:06:06] add to the project. And I would be

[1:06:07] actually really interested in whether

[1:06:09] this measurable because I feel it uh in

[1:06:11] most of my projects now it occurs a lot

[1:06:13] more.

[1:06:14] >> But you you mentioned friction in the

[1:06:17] software. You didn't say tech depth. You

[1:06:20] didn't say complexity. What what what is

[1:06:22] this friction? cuz I I don't remember us

[1:06:24] talking about this pre- AI at all.

[1:06:27] >> So, I found this ironically kind of

[1:06:30] funny and it it's kind of sad, but so I

[1:06:32] will not name any names, but uh there

[1:06:34] was a what I what I assumed was an

[1:06:36] incident related at least in part to

[1:06:37] achieve engineering on on a company uh

[1:06:40] where they they shipped out a

[1:06:41] configuration change that ultimately

[1:06:42] result in a security issue and look

[1:06:45] things happen. But the link that I saw

[1:06:47] on this had the social preview of that

[1:06:50] company's tagline and the tagline was

[1:06:52] ship without friction. And that g that

[1:06:54] get me really gave me pause because like

[1:06:56] you I I know as an engineer like we used

[1:06:58] to talk about like you got to get rid of

[1:06:59] like all the things in the way so that

[1:07:01] you feel happy shipping stuff. But there

[1:07:03] there always were changes where you

[1:07:05] really wanted to think like do you want

[1:07:06] to drop the database like do you want to

[1:07:09] merge this migration which might take a

[1:07:11] table lock that could potentially take

[1:07:13] you down. Right? is like there's there's

[1:07:14] this this moments every once in a while

[1:07:16] where you really you were really

[1:07:18] supposed to think and and you and people

[1:07:20] created checklists or people created um

[1:07:23] like like mechanical gates that would

[1:07:26] where you would have to confirm

[1:07:27] something like there's there's certain

[1:07:28] things that we used to put particularly

[1:07:30] if you run a SAS company did you put

[1:07:32] stuff in so to slow things down or and

[1:07:37] in in some of the best engineering teams

[1:07:39] in order to mature a service you have to

[1:07:41] define an SLO you have to define um like

[1:07:44] yeah expectations and like if if your

[1:07:45] service is supposed to be critical but

[1:07:47] like there's some other stuff that

[1:07:48] unlocks on this sort of tree of of

[1:07:51] requirements that you and and and like a

[1:07:54] lot of engineers be like a this is also

[1:07:56] this bureaucracy but like the reality is

[1:07:58] like if you do this correctly then it

[1:07:59] saves you time and it like it makes you

[1:08:02] happier. You're not waking up at 3:00 in

[1:08:04] the morning like all of this is useful.

[1:08:05] >> It's like friction injected to

[1:08:08] deliberately slow things down. I guess

[1:08:10] the easiest example in any decentsized

[1:08:12] company you have services based on tier

[1:08:14] based on criticality. the highest tier

[1:08:17] uh software now needs to have let's say

[1:08:20] two or three code reviews or an approval

[1:08:22] from a director to do a configuration

[1:08:25] change which again all slows down but

[1:08:27] it's kind of like we know this is on

[1:08:29] purpose like by adding this friction we

[1:08:31] want you to think do I want to push

[1:08:34] through this friction in terms of time

[1:08:35] invested or effort or having to justify

[1:08:39] things etc. It makes you think about do

[1:08:42] I really want to add this to the

[1:08:43] codebase if I know that the end effect

[1:08:44] will be that it has to go through this

[1:08:46] entire chain of arteries. Um, so it can

[1:08:49] be coming back to saying no to yourself

[1:08:52] to avoid pain going through that process

[1:08:54] >> and then taking on the pain when you

[1:08:56] know that you have the comm you have the

[1:09:00] >> the backing you have the confidence as

[1:09:01] well, right? Like so typically when it's

[1:09:03] a higher friction thing, let's say a

[1:09:04] tier one service or highest tier service

[1:09:06] where a director have to sign off. When

[1:09:07] you're a new joiner on the first day and

[1:09:10] you don't know the context, you probably

[1:09:11] know that that's a pretty large ask and

[1:09:13] you'll probably socialize, get get by in

[1:09:16] from a from an experience and to say

[1:09:18] like, oh, this is the right thing,

[1:09:19] you'll go with them, right? Back to

[1:09:20] human dynamics a little bit.

[1:09:22] >> I think the the the thing is like

[1:09:24] there's a there's a there's a very

[1:09:26] delicate balance in the whole thing

[1:09:27] because like you don't want the friction

[1:09:29] to be just an accident of having created

[1:09:31] bad developer experience, right? But

[1:09:34] some things look the same

[1:09:37] and and but they but they were

[1:09:38] deliberate but they maybe were not

[1:09:39] sufficiently documented but but there's

[1:09:41] this feeling now like get rid of all the

[1:09:44] friction so that the agent can be very

[1:09:47] autonomous so that he can run many of

[1:09:49] them simultaneously. A lot of it comes

[1:09:51] from that. Like I like it the these

[1:09:54] things are actually rather slow and the

[1:09:59] only real time saving that you get from

[1:10:01] it is parallelism and so somewhere there

[1:10:05] is is this trap. I feel like a little

[1:10:08] bit more experienced now in managing the

[1:10:11] trap but I I don't have the solution for

[1:10:13] that either. And I I will not like say

[1:10:17] that here's an example codebase where I

[1:10:20] felt like really really great about the

[1:10:22] stuff that I built except for

[1:10:24] pre-existing libraries from before

[1:10:26] aentic days where where I still feel

[1:10:29] like strong emotional attachment to them

[1:10:31] and much more careful about doing them

[1:10:33] than than any of the code that we other

[1:10:35] than pi to which I don't have access.

[1:10:38] >> Oh no, there's there's

[1:10:40] still no right access. Um, there there's

[1:10:43] a lot of sloppin pie, but I try to avoid

[1:10:45] it in the in the bits and pieces where I

[1:10:47] know that's important code like we have

[1:10:49] an HTML export functionality where it

[1:10:52] takes the current session and just spits

[1:10:54] out an HTML file that you can then host

[1:10:56] on GitHub and whatever. I have not

[1:10:58] looked at a single line of code for that

[1:11:00] function. I don't care if it's broken,

[1:11:02] if it looks right when it comes out. But

[1:11:04] then then there's the the agent loop

[1:11:06] itself or the the extension loading

[1:11:08] mechanism and all of that stuff and

[1:11:10] that's important and the way I deal with

[1:11:13] ensuring that that has or at least

[1:11:16] trying to ensure that it has high

[1:11:17] quality is I refactor mercilessly

[1:11:20] because that pulls me into the codebase.

[1:11:23] I need to understand what I want to

[1:11:25] change structurally not just line per

[1:11:27] line and syntactically or whatever. I

[1:11:29] need to understand what's going on to do

[1:11:31] a good refactor. and and doing that

[1:11:33] every now and then like I'm doing now at

[1:11:34] the moment prompted by wanting to add a

[1:11:37] new feature that's currently not

[1:11:38] possible with the current architecture

[1:11:40] being in the code is the one thing that

[1:11:42] keeps the codebase quality high and the

[1:11:44] complexity low but that's against the

[1:11:46] industry wisdom of burning as many token

[1:11:48] maxing basically yeah that's that's

[1:11:50] that's an interesting one happening but

[1:11:52] you just recently wrote on on the same

[1:11:54] theme a blog post called we all need to

[1:11:57] slow the f down can we rehash some of

[1:12:00] the thinking and what triggered you So

[1:12:02] just put it out there. Okay. So the

[1:12:04] basic gist is okay, your agent can now

[1:12:06] spit out 10 times more code a day than

[1:12:08] you can, but it also means it spits out

[1:12:11] 10 times more boooos errors. Even if it

[1:12:14] has half your error rate, then okay,

[1:12:16] it's not 10 times more. It's five times

[1:12:18] more. It is still more than you would

[1:12:20] spit out. So the rate of deterioration

[1:12:22] in your codebase has now increased. And

[1:12:25] now go dark factory. Now take a 100

[1:12:28] agents that do this to your codebase.

[1:12:29] What's the end result of that? So that's

[1:12:31] the first problem, right? And you need

[1:12:33] some way to review all of that code that

[1:12:35] now gets generated to fix all the

[1:12:37] boooos. But you can't as a human because

[1:12:40] as a human you're used to spitting out

[1:12:42] 1.5k lock a day and that's about the

[1:12:45] limit that you can actually review well

[1:12:48] right agent spits out 10 times that no

[1:12:51] chance you can review that. And not not

[1:12:53] all of the code by the agent might be

[1:12:54] important like the HTML export thing,

[1:12:55] right? But even if the agent spits out

[1:12:57] three to 5k a day, you have no way of

[1:13:01] reviewing that in any meaningful sense.

[1:13:03] And then if you do the the armies, yeah,

[1:13:06] I mean, and then the armies, this is

[1:13:08] interesting. So you call it the dark

[1:13:10] factory. The idea being that tens or

[1:13:12] hundreds or thousands of agents, you

[1:13:14] give them a spec, they go and they break

[1:13:16] it up, they they organize themselves,

[1:13:18] they like the mayor and all all that

[1:13:20] jazz. They have the qual the QA agent.

[1:13:23] They have the you know you give them

[1:13:25] roles. You give them context and then

[1:13:27] you give them enormous amounts of tokens

[1:13:29] and spend. And the idea is or the hope

[1:13:32] is that your software will be done in

[1:13:34] >> Oh, there will be something will be

[1:13:36] done. I definitely something's going to

[1:13:39] be done. First your purse and then uh

[1:13:41] No. Yeah, sure. More power to the people

[1:13:43] that make that work. I can't make it

[1:13:44] work. And the reason I think I can't

[1:13:46] make it work is because I still care

[1:13:48] about the quality of of my product. And

[1:13:50] I don't care if it's built by by hand or

[1:13:52] by agent. I just want the quality to be

[1:13:54] good. Both in terms of how easy it is to

[1:13:57] maintain it and add new stuff to it on

[1:13:59] an developer side and on the user side.

[1:14:02] All the companies claiming that all of

[1:14:04] their code is not written by by agents.

[1:14:06] Yes, we know quality is garbage. We feel

[1:14:09] it in our bones when we use your

[1:14:10] products. It's garbage.

[1:14:12] >> U so I don't want that. And yeah,

[1:14:14] basically I think people need to turn

[1:14:16] around and say, "Hey, what what are we

[1:14:18] even doing here?" Um, we have these

[1:14:20] wonderful machines now that can take

[1:14:22] away so much pain from us by doing the

[1:14:24] stuff we hate doing and doing that

[1:14:26] really well. Why don't we start by

[1:14:29] giving us some more free time to work on

[1:14:31] the interesting bits and delegating the

[1:14:33] stuff we know they can do to them large

[1:14:37] on large like like uh across the entire

[1:14:40] organization. find all the things that

[1:14:43] annoy the out of you and have the Asians

[1:14:46] automate that for you. And then you

[1:14:49] suddenly have time to think about what

[1:14:51] do we actually want to build? What do

[1:14:53] our users need? And if we decide to

[1:14:55] build the thing, then we can pull in the

[1:14:57] agents again and say, and we're going to

[1:14:59] polish the out of that because now we

[1:15:01] have the time and the means and the

[1:15:02] tools to do an excellent job. But that's

[1:15:05] not how we're working. We we we build an

[1:15:07] army of agents and install beats and uh

[1:15:10] make a big spec that hopefully will

[1:15:13] result in something crazy. But here's

[1:15:15] the thing. We we talked about where did

[1:15:17] the agents learn the knowledge from,

[1:15:19] right? The internet. So garbage to

[1:15:20] mediocre. Now if you write a spec,

[1:15:23] >> what what's the best possible spec you

[1:15:25] can have? The best possible spec is well

[1:15:28] you define exactly how it should work.

[1:15:30] You give it test cases.

[1:15:31] >> Best possible spec spec is the software

[1:15:33] itself. Oh, I see what you mean. So,

[1:15:36] yes.

[1:15:36] >> Okay. You write a spec that's not the

[1:15:38] software itself. So, that means there's

[1:15:39] a lot of blanks that need filling in.

[1:15:41] >> Yes. What do you think is the agent

[1:15:44] going to fill those planks in?

[1:15:46] >> Well, most likely from, you know, stuff

[1:15:47] it from his training data.

[1:15:49] >> Yeah. And we already identified what the

[1:15:51] quality of that training data is, right?

[1:15:53] Garbage to mere. Well, and even even

[1:15:55] before AI, don't forget like Stack

[1:15:57] Overflow had a really big criticism

[1:15:59] because there was this thing of like

[1:16:00] well you control C controlV from Stack

[1:16:02] Overflow and oftent times there will be

[1:16:04] some answers where the first answer was

[1:16:06] either not correct or not correct in

[1:16:08] many cases. Reax for email was a good

[1:16:10] one. You emailed Reax for email. First

[1:16:12] page was Stack Overflow. Everyone just

[1:16:14] copied the first solution and I think

[1:16:16] underneath number three it was said it

[1:16:18] missed a bunch of cases.

[1:16:19] >> Yeah. But but here's the thing though. I

[1:16:21] I'm I'm not saying agents or humans are

[1:16:23] better. They're clearly not. But agents

[1:16:25] also don't solve that problem. And if

[1:16:27] you then don't let just one agent that's

[1:16:29] already 10 times more productive as you

[1:16:31] do the thing that it's bad at and that

[1:16:33] you as a human are bad at, but a hundred

[1:16:35] of those, what do you think is the

[1:16:36] outcome?

[1:16:37] >> Yeah, it's just very simple math. Let's

[1:16:39] talk about another controversial topic.

[1:16:42] MCP versus CLI.

[1:16:44] >> Oh,

[1:16:47] it's it's it's it's coming up. And you

[1:16:49] know, right now I'm hearing a lot of

[1:16:50] people really going for CLI is the

[1:16:53] future. And I think I'm sitting with two

[1:16:54] of them. But also MC MCPS are also

[1:16:56] really popular inside of large

[1:16:58] companies, especially when you talk with

[1:16:59] a bunch of people working at at large

[1:17:01] companies. It seems MCPs have found a

[1:17:03] real product market fit inside of larger

[1:17:05] enterprises.

[1:17:06] >> Despite what people might think, I don't

[1:17:09] actually hate MCP quite as much.

[1:17:11] >> Seems Oh. Oh, wait. We have it on

[1:17:13] recording.

[1:17:14] >> Yeah. No, we don't deal in absolutes.

[1:17:16] We're in CIF. So I my fundamental

[1:17:19] challenge with MCP is that I think first

[1:17:21] of all the spec is very complex I think

[1:17:23] for for it but it's like this is this is

[1:17:25] just generally how specs happen to be.

[1:17:27] So it's a bit the the the core of its

[1:17:30] time. So there's an inherent complexity

[1:17:32] in it. But if you if you were to say

[1:17:33] like okay so what is it really doing at

[1:17:35] the end of the day it's it's

[1:17:37] authentication and it's sort of invoking

[1:17:39] some stuff and MCP even theoretically

[1:17:43] there's structured responses but MCP for

[1:17:45] the most part is run some stuff put

[1:17:48] stuff back in the context and then work

[1:17:49] with it. So it fills your concept very

[1:17:51] quickly. And there's uh Cloudflare has

[1:17:53] this code mod MCP which is like in

[1:17:55] principle I really like. I have an MCP

[1:17:57] um for testing which uh is a JavaScript

[1:18:00] interpreter that gives me access to the

[1:18:01] Google API. And between an MCP like this

[1:18:04] and a skill, there's not a huge

[1:18:05] difference because the skill also needs

[1:18:07] to be in a system prompt. So that

[1:18:09] defines it. But the the agents are just

[1:18:11] very very very very good at running code

[1:18:15] and MCP

[1:18:17] is not quite running code. It's

[1:18:19] basically rag

[1:18:21] is like input in and do some stuff and

[1:18:23] maybe some state transition at the model

[1:18:24] also doesn't see but it is in that sense

[1:18:27] just in it's a hard problem to solve but

[1:18:29] it does solve off it solves a whole

[1:18:31] bunch of things. Um I want it to work. I

[1:18:35] just still don't get it to work like I

[1:18:38] wish it could work and I my my suspicion

[1:18:42] is still the glue is is has to be code

[1:18:44] execution but because MCP servers are

[1:18:47] largely not defined in a way that the

[1:18:49] model actually understands them. I

[1:18:50] haven't found ways to compose MCP tools

[1:18:55] reliably. I I found ways to make the MCP

[1:18:57] itself be composable

[1:18:59] by having the MCP be one tool run code,

[1:19:02] but I haven't found ways to then

[1:19:04] orchestrate larger ones. I want it to

[1:19:07] work and I think it has found its niche

[1:19:10] and I don't think it's going to go away.

[1:19:12] >> I I think it's just a victim of its own

[1:19:14] success really. when when the whole

[1:19:16] thing started, I think it was in October

[1:19:17] 2024,

[1:19:19] it was more or less a solution to get

[1:19:21] external services into uh consumerf

[1:19:24] facing chat apps.

[1:19:26] >> Yeah.

[1:19:26] >> Connect your emails, connect your one

[1:19:28] drive, connect your whatever

[1:19:29] >> pretty much. And then IDs also took it

[1:19:31] over because it was convenient, the

[1:19:33] cursors, the wind surfs.

[1:19:34] >> Yeah. But I think the origin was

[1:19:37] basically the consumer side, not not the

[1:19:39] developer side. And I think that's a

[1:19:40] totally great use case. I don't want my

[1:19:43] mom to having mess around with code

[1:19:46] generation or whatever to invoke some

[1:19:48] API or call some API and so on.

[1:19:50] perfectly fine use case and then

[1:19:53] developer side also picked it up and

[1:19:55] thought oh this is a great way to

[1:19:56] provide tools to my LLM tools as in in

[1:19:59] the system prompt somewhere there is if

[1:20:01] you want to call this tool provide this

[1:20:03] JSON payload and you get this thing back

[1:20:06] right and that kind of felt right at the

[1:20:08] time because if you read a tropics uh

[1:20:12] documentation um they would say our

[1:20:14] models can deal with about 30 to 40

[1:20:16] tools in the context and even that

[1:20:18] wasn't the case like at 12 20 they would

[1:20:21] just break down but doesn't matter. Um

[1:20:24] but but there was still like a yeah this

[1:20:26] can work if you kind of keep it small

[1:20:27] and contained and very specific to your

[1:20:29] use case. And then people started

[1:20:31] building MCP servers that would just

[1:20:33] basically map an entire open API spec

[1:20:35] into a gazillion tools.

[1:20:37] >> Yeah.

[1:20:38] >> And that's where it all fell apart. So

[1:20:39] that's the first problem. Very bad MCP

[1:20:42] servers from big corporations that

[1:20:44] thought we need this now. What's the the

[1:20:47] fastest thing we can build? I just push

[1:20:48] the open API spec of our APIs through

[1:20:50] this thing and make it an MCP server.

[1:20:52] That's garbage. The second problem is

[1:20:54] that it's inherently non-composable. Um

[1:20:56] if you want to combine a tool out the

[1:20:59] MCP tool outputs of two different

[1:21:01] servers, they need to go through the

[1:21:02] context the the model itself needs to do

[1:21:05] the data transformation the the the the

[1:21:08] yeah the composition of of multiple

[1:21:10] pieces of data fetched through

[1:21:12] >> and compared to this with a CLI. It's a

[1:21:13] pipe, right?

[1:21:14] >> Exactly. the the model only sees the end

[1:21:16] result and it is it is super free in how

[1:21:19] it massages that data and that's also

[1:21:22] the idea behind code mode basically it's

[1:21:24] a hack it's basically okay we now have

[1:21:26] MCP we know it doesn't work for this

[1:21:27] specific use case where you have

[1:21:28] multiple sources of true data and you

[1:21:30] want to combine them but don't kind of

[1:21:33] pull that through the context so let's

[1:21:35] build code mode and code mode is

[1:21:36] basically we take all the MCP servers

[1:21:38] you expose that as functions in

[1:21:39] Typescript and then the the model can

[1:21:40] actually just write some code that calls

[1:21:42] the MCP service and then does the

[1:21:44] composition in the code. It's it's like

[1:21:46] how many interactions do we want here?

[1:21:49] We can just let the mod write the code.

[1:21:51] We we don't need the MCP server. And

[1:21:53] then the third part is David from Sentry

[1:21:56] is a big proponent of MCP because it's

[1:21:58] off the off thing. And honestly, that's

[1:22:01] again for me super valid. But the model

[1:22:03] itself kind of doesn't make sense

[1:22:05] anymore. I think that there's a there's

[1:22:07] a world for MCP2

[1:22:10] which is ironically maybe based more on

[1:22:14] there's a company called stainless which

[1:22:15] basically generates SDKs out of uh open

[1:22:18] specs and I I'm I'm really warming up to

[1:22:20] the idea of like maybe it is an MCP is

[1:22:23] entirely based on off plus

[1:22:26] uh like uh

[1:22:28] >> libraries

[1:22:29] >> libraries or or or like directly like

[1:22:31] HTTP request against offsp specs because

[1:22:34] if you compose it together there. And I

[1:22:36] think like one of the things that's also

[1:22:38] like kind of underappreciated and and

[1:22:39] you sort of as you see I think if you

[1:22:41] see pi do its stuff because it's kind of

[1:22:43] transparent of the tool calls that it

[1:22:45] does. It's kind of magical at times like

[1:22:47] how creative agents get at large

[1:22:50] outputs. Like for instance pi when it

[1:22:52] when it runs a program in bash and it

[1:22:54] produces too many lines of code actually

[1:22:56] only reads I don't know what the the cut

[1:22:58] off is but it reads the first couple and

[1:23:00] like oh if you want the rest of the file

[1:23:01] it's 20 megabytes large and it's in this

[1:23:04] file. And then the agent is like, "Oh,

[1:23:05] 20 m, that's too much. I'm going to grab

[1:23:07] on the file, right?" And it they they

[1:23:10] get really ingenious in in how they're

[1:23:13] interacting with it. And like, and MCP

[1:23:15] takes that away. The question is like,

[1:23:17] how would how would you define MCP in a

[1:23:19] way where it wouldn't take that away,

[1:23:20] right? where it still has all of that

[1:23:22] magic and and and capability and and and

[1:23:25] I don't really know the answer because I

[1:23:26] think it's hard but off need solving and

[1:23:28] and composibility needs solving and and

[1:23:31] I think there's a there's a bright

[1:23:32] future of of that kind of stuff and and

[1:23:35] also like what Mario said if coding

[1:23:37] agent wouldn't have become so popular

[1:23:41] then the idea of code generation code

[1:23:44] running for like non-code related

[1:23:47] problems probably wouldn't have taken

[1:23:48] off quite as much too. Um, but like the

[1:23:51] most capable personal agents, Open CL

[1:23:53] being a good example of it, they're just

[1:23:55] coding agents hidden from you. And then

[1:23:58] that just naturally some random person

[1:24:00] who is not a programmer is going to say,

[1:24:02] how am I going to do this? And the model

[1:24:04] doesn't say like install this MCP. The

[1:24:06] model says like, okay, I can write a

[1:24:07] Python script that does it. And so you

[1:24:10] naturally have this in the sort of the

[1:24:12] crazy space, you have the adoption of of

[1:24:14] more code execution. in the compliant

[1:24:17] enterprise space you you don't have that

[1:24:20] there's a different path that

[1:24:21] >> and I personally don't think that models

[1:24:23] are going going anywhere else other than

[1:24:25] code generation going forward for any

[1:24:26] kind of a aentic task I think that's

[1:24:29] that's mostly a function of there being

[1:24:31] a lot of training data for code

[1:24:33] generation and code generation being a

[1:24:36] very easy means to control computers uh

[1:24:39] so I don't see a different paradigm

[1:24:41] there coming out of the model labs

[1:24:43] anytime soon so I I think taking that as

[1:24:46] the assumption where the future is

[1:24:48] going, we just need to figure out how to

[1:24:50] make code generation kind of work within

[1:24:52] an enterprise setting with off and all

[1:24:54] of the other enterprisy things that

[1:24:56] entails. So, so let's do a fun

[1:25:00] trying to predict a year out which is

[1:25:01] hard but in in 2027 knowing some of

[1:25:04] these basics just again from first

[1:25:06] principles where do you think these

[1:25:08] coding agents might be and the software

[1:25:11] engineering workflow might be you know

[1:25:13] basically this is just like again

[1:25:14] speculation we know we cannot predict

[1:25:16] the future but where do you think that

[1:25:18] there'll be a lot of focus in the coming

[1:25:19] year and we might in an optimistic case

[1:25:21] see some results in in tools and how we

[1:25:24] work and what's working what's not

[1:25:26] working.

[1:25:26] >> I have no idea. I honestly have no idea.

[1:25:29] I I could make up something that's

[1:25:31] probably not going to happen. I I think

[1:25:33] the self-mability

[1:25:34] thing is obviously something I believe

[1:25:36] in. I I think we will see more of that

[1:25:38] and and see

[1:25:40] >> so like self mutable software.

[1:25:42] >> Yeah.

[1:25:42] >> Yeah. including the tools themselves

[1:25:44] with with which we built the software

[1:25:46] and I think that will expand I not only

[1:25:49] to the tech sector but also to non- tech

[1:25:52] applications of agentic u tools my is it

[1:25:57] dog years with your time seven is that

[1:25:59] how it works so that that's that's

[1:26:01] basically the model I have right now of

[1:26:02] like how this stuff works it's like when

[1:26:05] you ask me like what's going to be in in

[1:26:06] a year it's like seven years right and

[1:26:10] to me that makes it incredibly hard to

[1:26:12] have any sort of predictions about the

[1:26:13] future because like it's still not one

[1:26:15] year maybe now it's a one year from like

[1:26:17] people starting to using cloud code but

[1:26:20] it feels like it is much much longer

[1:26:22] much more more time behind and more time

[1:26:26] has passed and and I think like right

[1:26:27] now the the closest that I can imagine

[1:26:29] is going to be like we we we know that

[1:26:31] code execution and code generation and

[1:26:33] like this harnessing around it this is

[1:26:36] this is going to be it because

[1:26:38] reinforcement learning gets more of that

[1:26:39] data and my my my strong hypothesis is

[1:26:42] that as more and more people are

[1:26:44] starting to wake up to this you can do

[1:26:46] interesting things with agents there

[1:26:48] will be a societal recognition also of

[1:26:50] how much more dependent you are on

[1:26:52] basically two companies and I think

[1:26:55] we'll have a conversation about that

[1:26:56] part uh we should have a conversation

[1:26:58] about that particular as Europeans um

[1:27:01] because we don't really have these labs

[1:27:02] over here and so I hope we have that

[1:27:04] conversation but like my my best guess

[1:27:06] is that we'll wake up to the fact that

[1:27:10] we are now I

[1:27:11] engineering teams already now telling me

[1:27:13] that they have code bases that they

[1:27:14] think they couldn't maintain anymore

[1:27:15] without the machine. My my guess is that

[1:27:18] one of those companies will be public

[1:27:20] and

[1:27:21] >> and all of a sudden

[1:27:22] >> and it will be expensive and I think

[1:27:24] that might actually dominate

[1:27:26] or at least become a conversation that's

[1:27:30] much bigger than the question of are you

[1:27:32] using pi or using cloud code or or

[1:27:35] something like this. I I also see a we

[1:27:37] we've seen this with was it myths the

[1:27:40] new cloud model oh no spot uh the new uh

[1:27:43] GPD model they will only give this to

[1:27:45] select partners so now we are seeing uh

[1:27:49] a split in who can get the best

[1:27:51] intelligence

[1:27:52] >> yep

[1:27:53] >> or the perceived best intelligence

[1:27:56] >> it'll be interesting dynamics so both of

[1:27:58] you are working on AI on popular AI

[1:28:01] tools you're building a startup that of

[1:28:03] course you're using AI and it it's also

[1:28:05] around agents. How do you both keep up

[1:28:08] to date? I've just seen things and it's

[1:28:11] not as easy to get me on a hype train as

[1:28:13] it used to be, but that comes with age.

[1:28:16] It's definitely easier not being in San

[1:28:17] Francisco because I I think that just

[1:28:19] drives me crazy. Like I I hear so many

[1:28:22] things from my peers over there and

[1:28:23] that's just like, yeah, I'm not going to

[1:28:25] go to San Francisco. Thank you.

[1:28:26] >> So having a peaceful environment around

[1:28:27] you where it's not all about tech might

[1:28:29] be helpful.

[1:28:30] >> It helps having a kid. It helps just

[1:28:33] going outside, climbing trees, going ice

[1:28:35] skating, and then looking back at what

[1:28:37] you did just half an hour ago and be

[1:28:39] like, why would I do that? That's just

[1:28:42] stupid. I'm into the detriment of maybe

[1:28:45] people that are trying to stay in

[1:28:46] contact with me. I I got very good at

[1:28:50] not muting notifications, not reading

[1:28:52] emails, and and that has in part become

[1:28:55] necessary, I think, over over the last

[1:28:57] year or so. But this like it actually

[1:29:00] turns out

[1:29:02] that passage of time sometimes clarifies

[1:29:05] stuff a lot because like if it's really

[1:29:06] necessary it's going to going to reach

[1:29:08] you again. Like I have an unhealthy

[1:29:10] Twitter addiction which I'm not

[1:29:11] particularly proud of. Um but in in

[1:29:14] terms of source of like interesting

[1:29:16] things that is still a thing but I I try

[1:29:20] to now sort of consume it in a form of

[1:29:22] if it's really really important it will

[1:29:24] stay in the discourse for quite a while

[1:29:26] and I just wait it out. Um and if it's

[1:29:29] if it's there until like 3 weeks after

[1:29:32] it originally happened then probably

[1:29:34] something to it and and and I don't need

[1:29:37] this three week head start necessarily

[1:29:38] but it is honestly it's really hard. It

[1:29:41] is really hard to to deal with this

[1:29:44] because there's a there's a genuine

[1:29:46] excitement in it and I feel like my my

[1:29:48] my 20 more than 20 years of experience

[1:29:50] in that space of software engineering

[1:29:52] doesn't it tells me a lot of stuff but

[1:29:55] at the same time it hits you in certain

[1:29:57] ways where you felt like there will be

[1:30:00] grounding and there will be something to

[1:30:01] build on and a strong foundation and now

[1:30:03] it feels like

[1:30:05] well seemingly everybody else doesn't

[1:30:07] care about that foundation anymore so

[1:30:09] maybe you don't need the foundation and

[1:30:10] for quite a a while it sort of it works

[1:30:13] and and that is sort of weird and and

[1:30:16] >> I kind of feel like since we've been

[1:30:18] funemployed in 2025 when all this

[1:30:21] started that we had like a head start

[1:30:23] like I see all the excitement the two of

[1:30:25] us and Peter had in April last year

[1:30:28] >> has

[1:30:29] >> nobody else no no but nobody else at the

[1:30:31] time has kind of shared that excitement

[1:30:34] uh that much and then the Christmas

[1:30:36] break came and now everybody else has

[1:30:38] that excitement that we had in April

[1:30:40] right so Now they are learning groups.

[1:30:41] Now they are catnipping themselves to

[1:30:45] immeasurable amounts of lost sleep uh

[1:30:49] and at terrible code bases. Um and I

[1:30:51] think it will self-correct because it's

[1:30:53] not sustainable.

[1:30:54] >> Yeah, we we we did see this as as well.

[1:30:56] I did a deep dive in the parametric

[1:30:57] engineer at early March when a lot of

[1:31:01] people who were very excited in January

[1:31:03] about all and they started to use the

[1:31:05] new models what it can do. They went all

[1:31:07] in at work or on side projects. In about

[1:31:10] 2 months time, a lot of them were like,

[1:31:12] "Hang on, it introduced all this

[1:31:14] complexity. It has these things. I'm not

[1:31:16] going as fast as I thought I would be,

[1:31:18] etc." So, I guess there's just a natural

[1:31:20] thing where you you have a time,

[1:31:22] anything new, right? A job, anything.

[1:31:25] You have a honeymoon period where you've

[1:31:26] got the blinders on, which you should,

[1:31:28] by the way. And then you start to

[1:31:30] realize and maybe overcorrect, but but

[1:31:33] there's a natural thing where it in

[1:31:35] general like it just takes time to see

[1:31:36] the outcome of your decisions.

[1:31:39] >> Yeah. So, so I'm not worried about all

[1:31:40] the dark factory and all the software is

[1:31:43] dead and sus is dead and all that. I

[1:31:45] generally believe this is just part of

[1:31:46] the hype machine and that will

[1:31:47] selfcorrect.

[1:31:49] >> Yeah. As closing, what's a book that you

[1:31:51] would recommend and why?

[1:31:54] >> Code by Pet Salt.

[1:31:55] >> Classic. I just love it. It's just such

[1:31:58] a great read. It's also for non techies

[1:32:00] and it's the first thing I recommend if

[1:32:02] anybody asks me what's your job and

[1:32:05] pointing at that it's like it has much

[1:32:07] less to do with computers than you

[1:32:08] think.

[1:32:09] >> And I read recently breakneck

[1:32:12] uh which I unfortunately forgot the

[1:32:14] author of um it sort of goes a little

[1:32:17] bit into an exploration of like how

[1:32:19] China works and how maybe Europe and and

[1:32:23] the US are different. and I found it at

[1:32:25] least um thoughtprovoking.

[1:32:27] >> Well, Mario and Armen, thanks a lot for

[1:32:29] for this conversation. It was great to

[1:32:30] have it in person. Thanks for having us.

[1:32:32] >> Thank you.

[1:32:33] >> This was a really fun conversation.

[1:32:35] Thanks to Mario and Armen. The idea of

[1:32:37] self-motifiable software really grew on

[1:32:39] me. Mario said how Pi doesn't have MCP

[1:32:41] support, plan mode, and many other

[1:32:43] features that devs would want from it,

[1:32:45] but you can build it into his own code.

[1:32:47] So far, it's working. Pi is popular

[1:32:49] because it modifies itself. I wonder if

[1:32:52] and when this concept of self-modifying

[1:32:54] software thanks to AI will spread

[1:32:56] outside of just the dev tool. I also

[1:32:58] liked how we talked about the

[1:32:59] observation that agents don't feel pain

[1:33:02] but humans do. When a codebase gets too

[1:33:05] complex the human engineer feels the

[1:33:07] issues this creates and this tech depth

[1:33:10] is what pushes refactors and rewrites.

[1:33:12] But agents simply do not do this. They

[1:33:14] just keep adding to the complexity. And

[1:33:16] in a codebase where devs regularly feel

[1:33:18] the pain of the codebase and do

[1:33:20] something about it, the quality will

[1:33:22] probably be also better. And finally,

[1:33:23] the MCP versus the CLI discussion, this

[1:33:26] was a good one. MCP is more about

[1:33:27] offering tools for AI through context

[1:33:29] and CLIs allow piping one tool after the

[1:33:32] other. Both Mario and Armen are more of

[1:33:34] the fans of the CLI, but in all

[1:33:36] fairness, MCP has its use cases, for

[1:33:38] example, inside larger companies. The

[1:33:40] right tool for the right job. Do check

[1:33:41] out the show notes below for related

[1:33:42] theatic engine deep dives that go even

[1:33:45] deeper into related topics. If you've

[1:33:47] enjoyed the podcast, please do subscribe

[1:33:48] on your favorite podcast platform and on

[1:33:50] YouTube. A special thank you if you also

[1:33:52] leave a rating for the show. Thanks and

[1:33:54] see you in the next
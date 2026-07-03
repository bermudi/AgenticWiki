---
title: "Are we really doing this again"
author: "NeetCode"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=vM6DNlsdpsg"
date_saved: "2026-07-02T20:43:23.880Z"
---

# Are we really doing this again

[0:00] I guess I'm losing it again, guys,

[0:01] because I really just don't get it. I'm

[0:04] trying my absolute best to keep up with

[0:08] what's going on, and I just don't get

[0:10] it. You might remember that not too long

[0:12] ago, the creator of Claude Code, Boris,

[0:15] said that coding is largely solved. He's

[0:19] not writing code anymore. He's just

[0:21] prompting Claude to do that. And more

[0:24] recently, he's taken things a step

[0:27] further. Now, I would play this clip for

[0:29] you, but I've heard that I might get

[0:31] DMCAD if I do that. But basically, he

[0:33] says that instead of prompting Claude,

[0:35] now he's actually not even doing that

[0:37] anymore. Prompts are actually dead as

[0:40] well. Like, not only was coding dead,

[0:42] but the new way of coding, which was

[0:44] prompting, that's dead, too. So, even

[0:46] though it was already dead, we just

[0:47] killed it one more time. And so, I want

[0:49] to talk about this new like this

[0:52] completely new way of doing things. He's

[0:55] not writing prompts. He's writing loops.

[0:59] Okay. And that's very different. I

[1:02] suppose that's the implication. At the

[1:04] beginning, he actually says

[1:07] that

[1:09] he says back in November, he wasn't

[1:12] really using his IDE anymore, so he just

[1:16] uninstalled it. Okay. I guess um you

[1:21] know it hasn't rained in a few days so

[1:24] when I'm driving my car I was just

[1:27] thinking it hasn't rained so I I'll just

[1:30] uninstall my windshield wipers right now

[1:32] to me this feels very performative I'm

[1:35] just a neutral observer over here just

[1:37] trying to understand okay well we all

[1:39] know like AI is progressing coding is

[1:42] changing so I just I just want to

[1:43] understand Boris okay you're not

[1:44] prompting anymore you you said coding is

[1:46] largely solved now we're not even

[1:48] prompting anymore more. We're using

[1:49] loops. Like, why can't we get some like

[1:51] honest, clear communication? I don't

[1:54] have anything against Boris. And he's

[1:56] not even the only one. You can see the

[1:58] creator of Open Claw, who's now at

[2:00] OpenAI, says the same thing. Here's your

[2:03] monthly reminder that you shouldn't be

[2:05] prompting coding agents anymore. You

[2:07] should be designing loops that prompt

[2:09] your agents. Okay. And just a honest

[2:14] question of, okay, well, what's your

[2:15] workflow? Nope. Not going to answer.

[2:18] Okay. Well, why would you even say that

[2:21] in the first place? It's like, okay, I

[2:22] thought you were trying to educate us.

[2:25] No follow-up tweet. Come on. Well, okay.

[2:28] We actually did get a follow-up tweet, I

[2:30] think like 4 days later. Here's a simple

[2:32] loop. Tell Codeex to maintain your

[2:35] repos, wake up every 5 minutes, and

[2:37] direct work to threads. That makes it

[2:40] easy to parallelize plus steer work as

[2:42] needed. I use a orchestrator skill

[2:44] combined with my triage plus auto review

[2:47] plus computer use skills so some work

[2:49] can land autonomously.

[2:52] Again, I mean, the only thing I don't

[2:54] know about you guys, but the only thing

[2:56] I feel like I learned from this and and

[2:58] he doesn't even make it very explicit is

[3:00] basically that in codeex how you have

[3:02] like these threads which are kind of

[3:04] like sessions just like in chat GPT, you

[3:07] can have one thread um invoke and create

[3:10] other threads which are independent and

[3:12] have their own context and all that

[3:14] stuff. That that's pretty cool. Like it

[3:16] probably could have just made a tweet

[3:17] saying that. I feel like that would have

[3:19] been more helpful than this tweet, but

[3:21] okay. Again, I'm just I'm just a neutral

[3:23] observer. We also had something

[3:25] interesting from Jared, creator of Bun,

[3:28] who I personally respect and trust a

[3:32] little bit more. But if you go through

[3:34] this starts with Jared when he works on

[3:37] a large project now, the first thing he

[3:39] thinks is how can he structure his

[3:42] workflows with as many parallel clouds

[3:44] as possible. reply tweet. I think

[3:47] similarly except how do I structure this

[3:49] into workflows with as many parallel

[3:52] chat GPT 5.5s as possible? How do you

[3:56] orchestrate into specific parallel or

[3:58] serial steps? Ask and pray it does the

[4:00] right thing. Lots and lots of team

[4:02] sessions. Okay, so that basically

[4:04] implies that he's manually managing each

[4:06] of these parallel agents. And Jared

[4:10] replies, uh, yes, that was a good

[4:13] approach six months ago. basically

[4:16] alluding to the same thing that Peter

[4:19] and Boris were talking about that

[4:21] manually prompting is the old thing. Now

[4:26] we just write loops that will write the

[4:29] prompts for you. And if you don't know,

[4:31] Jared recently ported bun using AI,

[4:36] which I think was almost a million line

[4:38] code, basically like 700,000 lines of

[4:40] code in uh the language Zigg. and he

[4:43] ported that from Zigg to Rust and I

[4:46] don't think it's been shipped yet. I

[4:48] think they probably still going through

[4:50] some stuff, but he was supposed to write

[4:51] a blog post on how exactly he was able

[4:54] to do that migration. Perhaps there is

[4:57] some secret sauce we can learn from

[4:59] that, but it's been a few weeks and we

[5:01] still haven't gotten it. You know, the

[5:03] common theme I'm personally noticing, I

[5:05] don't know about you, is that we're just

[5:06] really not getting a lot of clear uh

[5:08] communication from these people who are

[5:10] the authorities and are the pioneers and

[5:12] telling us the direction that coding is

[5:14] going now. And if you're not able to

[5:16] keep up, well, sorry, you're going to be

[5:18] left behind. And so that's that's what

[5:19] it feels like to me. But don't worry,

[5:21] I'm going to make a genuine effort to

[5:23] try to understand this stuff. I did, and

[5:25] I'm going to tell you everything I know.

[5:27] Unsurprisingly, the reality does not

[5:30] match the hype or the marketing material

[5:33] that we're seeing. But quickly before we

[5:35] get into that, do you feel like you want

[5:36] to have a better understanding of the

[5:38] code that you're shipping, but that it's

[5:40] only getting harder to do that? Well,

[5:42] that's where today's sponsor, Code

[5:43] Rabbit, comes in. Code Rabbit is the

[5:45] first AI code reviewer I used, and you

[5:47] can see here I'm using it for a pretty

[5:49] big poll request that honestly should be

[5:51] broken up. And if I want to now review

[5:53] this, I'm going to go top to bottom

[5:55] through these 40 files that are changed

[5:57] in random order. Not only does Code

[6:00] Rabbit add comments that you can choose

[6:01] to address or not, but recently they

[6:03] added something called a change stack.

[6:05] It basically organizes all the changes

[6:07] into these little layers on the left

[6:09] side. So rather than just going through

[6:11] files randomly, you're reviewing like

[6:13] ideas that are grouped together. So

[6:14] files grouped together. For example, you

[6:17] can see here the shared contracts and

[6:19] type interfaces. So if I want to review

[6:21] those quickly, I can do so just by

[6:22] looking at these first few files. And

[6:24] once I'm done looking at that entire

[6:26] layer, I can kind of move on to the next

[6:27] idea, which is more on like the backend

[6:29] side. This is probably where I would

[6:31] want to spend more of my time. So now

[6:32] what I'm going to go ahead and do is

[6:34] take a look at this part, which is focus

[6:36] mode. Probably that doesn't need to be

[6:38] directly in the first PR. It could be

[6:40] its own feature PR. So I'm going to

[6:42] comment, let's move focus mode into its

[6:43] own PR. And by doing that, I can leave a

[6:46] native GitHub or GitLab comment. So if

[6:48] your teammates prefer staying on GitHub,

[6:50] they can do that. You can try it out for

[6:52] free at necode.fyi/code

[6:55] rabbit. So I'm just a random guy. I

[6:57] don't know how to think for myself. So I

[6:59] go on Twitter to see what the thought

[7:01] leaders are saying. And so I'm not

[7:03] picking again. I'm not a hater. I'm not

[7:05] picking on anybody. But I see this this

[7:07] post loop engineering that came out not

[7:10] too long after uh some of those uh posts

[7:13] that we were seeing about loops June

[7:14] 8th. And this is from a former director

[7:17] at Google Cloud. So clearly more

[7:20] qualified than I am. And frankly, I did

[7:23] not find most of this very useful. And

[7:26] there's probably a reason for that.

[7:28] Let's go to this section. What one loop

[7:31] looks like. Okay, finally. Somebody's

[7:33] being concrete. Stick it together and a

[7:36] single thread turns into a little

[7:38] control plane. Here is one shape I keep

[7:40] using. An automation runs every morning

[7:43] on the repo. It prompt calls a triage

[7:46] skill that reads yesterday's CI

[7:49] failures, the open issues, the recent

[7:52] commits, and writes the findings into a

[7:54] markdown file or linear board. The

[7:56] thread opens an isolated work tree and

[7:59] sends a sub agent to draft the fix. And

[8:02] a second sub agent reviews that draft

[8:04] against the project skills and the

[8:06] existing tests. Connectors let the loop

[8:09] open the PR and update the ticket.

[8:12] Anything the loop cannot handle lands in

[8:15] the triage inbox for me. The state file

[8:18] is the spine of the whole thing. It

[8:20] remembers what got tried, what passed,

[8:22] what is still open. So tomorrow morning,

[8:24] the run picks up where today stopped.

[8:26] And look at what you actually did there.

[8:27] You designed it one time. You did not

[8:30] prompt any of those steps. That's the

[8:32] point that Steinberger and others are

[8:34] making. And it's the same loop in codeex

[8:36] or claw code because the pieces are the

[8:39] same pieces. Okay, I'm going to take a

[8:42] deep breath. First of all, I don't know

[8:44] about you guys, but I read this whole

[8:47] damn thing. It has 2 million views. I

[8:51] mean, it's just AI slop, right? Like,

[8:55] you guys can tell, right? I mean, at the

[8:57] very least, at the very least, the

[9:01] person who wrote this used GPT or some

[9:04] LLM to rewrite it for them. Maybe it's

[9:07] their ideas, but the writing is clearly

[9:10] LLM. Look, build the loop. Stay the

[9:13] engineer. Automations. This is the

[9:15] heartbeat. I could be wrong, but I'm

[9:18] pretty sure nobody talks like that. Why

[9:20] does that even matter? Well, I guess

[9:22] because I don't know. I I just feel like

[9:23] I'm living in a freaking Looney Tunes

[9:25] episode or something because Are we just

[9:28] going to pretend like this is like I

[9:30] don't know. like I put it into an AI

[9:32] detector and uh it got pretty high

[9:36] scores. And now, who knows, maybe this

[9:37] isn't accurate, but I don't know, man. I

[9:40] don't know if if we're all just like the

[9:42] reason that matters is because if this

[9:46] is just slop, then we're just like in

[9:48] this circular cycle of slop. We're just

[9:51] consuming our own slop. And

[9:55] oh my, that aside, what actually matters

[9:58] here here? Well, if you paid attention

[10:01] to that part, I I I don't know like

[10:03] we're we're making it seem like this is

[10:06] some completely new paradigm. And so the

[10:08] the the main at the core what I'm like

[10:11] sensing I'm understanding here is that

[10:14] this is a pretty simple concept. It's

[10:16] basically about setting up a prompt. I

[10:19] guess they're calling it a loop.

[10:21] Basically about having a long running

[10:24] task, aka a loop in this case. And that

[10:28] loop can run for a long period of time,

[10:32] I suppose, like until some kind of end

[10:35] state is met, or it could just run

[10:37] continuously, like a cron job, right?

[10:39] So, I don't know about you guys, but it

[10:42] seems pretty trivial to me. I'm being

[10:46] told I'm going to be left behind because

[10:47] I can't keep up. But conceptually, this

[10:50] is very trivial stuff in my opinion.

[10:53] Like, let me give you an example that

[10:54] that would apply to like my site. Let's

[10:56] say I get a bug report. Now, wherever

[11:00] that is, maybe it's a GitHub issue,

[11:02] maybe it's like directly through my

[11:03] application, and this is stored

[11:05] somewhere. That's uh in my case, it's

[11:07] it's a database. Let's say it's for my

[11:09] actual application. So, I'm getting bug

[11:11] reports that are here. Now, typically,

[11:14] it's going to be me, right? I'm going to

[11:15] be the developer looking at the bug

[11:18] report, validating it, and then possibly

[11:21] fixing it, and then shipping it. But

[11:23] now, I'm a super genius, guys. I'm on

[11:26] the level of Boris. I don't write

[11:28] prompts anymore. I write loops. So, what

[11:31] I'm going to do now is I'm going to say

[11:33] I'm not going to look at bug reports

[11:35] anymore. I'm going to go straight to

[11:37] Codeex or Claude or whatever and I'm

[11:39] going to tell my agent that how about

[11:44] every 24 hours I'm specifying this every

[11:48] 24 hours I want you to be the one that

[11:52] reads all of the bug reports. And then

[11:55] for each of those bug reports, I want

[11:58] you to spawn another sub aent. So let's

[12:02] just say these circles are like our

[12:05] bugs. And so I'm going to spawn a sub

[12:07] aent for every single one of those bugs.

[12:10] And then each of those sub aents is

[12:12] going to have its own contacts. And it's

[12:13] going to validate and attempt to fix

[12:16] that bug. Maybe it's going to open a

[12:17] pull request. And then uh uh I don't

[12:20] know how to finish that drawing but let

[12:22] let's say uh for that bug we have a PR

[12:25] and then me the developer I am the human

[12:29] in the loop and I will be the one to

[12:32] decide whether that's merged or not. At

[12:34] least that's one way to do it. Okay. So

[12:37] I don't know about you guys but like

[12:41] is this what everybody's talking about?

[12:42] I guess this is one possible thing. And

[12:45] there are details that go into this and

[12:47] those details I guess everybody's just

[12:50] glossing over are pretty important. For

[12:53] example, how exactly like are the

[12:56] details like like what would I tell the

[12:58] agent to set up a system such as this?

[13:00] Well, I would tell let's say I'm doing

[13:02] this in codeex just knowing what we now

[13:05] know about threads. I would tell I would

[13:06] give this to one codeex thread like I'm

[13:09] I'm using one thread but then that

[13:11] thread would spawn these sub threads

[13:13] every 24 hours depending on like the

[13:15] bugs. So I would probably specify that

[13:17] because I want the thread to be uh

[13:20] independent. I want each of these

[13:21] threads to be independent. And so now if

[13:23] they're independent and if they're

[13:24] working on the same code base I don't

[13:26] want those changes to conflict. So okay

[13:28] so I'll put those changes in a separate

[13:30] uh work tree. That's a GitHub or a git

[13:34] concept which is basically like a at a

[13:37] high level just like a fresh copy of a

[13:39] repo kind of like a branch but you can

[13:41] have multiple work trees instantiated at

[13:44] the same time. Um with branches you can

[13:46] really only check out one branch at a

[13:48] time. So we're seeing some of these

[13:50] fundamentals are still important. And

[13:52] now in terms of how uh is the agent

[13:55] going to read these bug reports like in

[13:57] my case right it's in a database. So

[14:00] there are multiple ways it could do

[14:02] that. I could have my agent like

[14:04] directly read the database like some

[14:07] kind of query and then once an issue is

[14:09] fixed. So let's say I fixed this issue.

[14:11] Well then we can mark it resolved and we

[14:14] could manually just do that in the

[14:15] database. That's a potential way to do

[14:17] it. But I guess an alternative way to do

[14:19] that would be maybe give the agent a

[14:22] better API because potentially this

[14:25] could be errorprone the same way it

[14:27] would be for a human. If I'm a human and

[14:29] manually writing a query and then

[14:31] manually running like an insert

[14:32] statement on my database to update that

[14:35] uh bug as resolved kind of errorprone

[14:38] right so maybe rather than doing that I

[14:40] know agents actually are pretty powerful

[14:42] nowadays I can give each of these agents

[14:45] access to its own browser as a human

[14:48] when I'm looking at bug reports I'll

[14:50] probably be using some kind of UI

[14:51] interface I could give it access to the

[14:53] browser give it the credentials so then

[14:55] it can have a better API I it can be

[14:58] less errorprone. Okay, so those are two

[15:00] ways to do it. Which way is better? I

[15:02] might have an opinion. I might look at

[15:03] some of the trade-offs, but maybe I'll

[15:05] just test both to see which one is

[15:07] better cuz a browser uh is going to be a

[15:09] little bit slower for an agent to

[15:11] interact with versus just raw dogging

[15:14] like the SQL. I I mean, I'd be happy to

[15:16] sacrifice speed and performance just to

[15:19] like not have some random uh my get my

[15:22] database dropped or whatever, right? So,

[15:24] okay, I guess this is one thing. I mean,

[15:26] another thing would be this is obviously

[15:29] an example of something that's going to

[15:30] run potentially forever. Not literally,

[15:32] but if it's going to run periodically

[15:34] every single day ongoing, and it might

[15:36] be super useful. This is a system I've

[15:38] actually already set up. So, I guess I'm

[15:41] I guess I'm a super genius. Like, I'm

[15:43] looping. Are you guys looping? Because

[15:45] if you're not doing this, you know,

[15:47] you're left behind, I guess. Another

[15:49] potential thing would be like a bounded

[15:52] thing. Uh, for example, some kind of

[15:54] migration, right? Like what a Jared did.

[15:58] I guess that's also considered a loop.

[16:00] Not I'm not the subject matter expert

[16:02] here though, so take that with a grain

[16:05] of salt. The number 100% is very hard to

[16:09] reach. Let's say like the agent was

[16:11] correct 95% of the time on each

[16:14] iteration. If we have 10 iterations,

[16:17] it's not multiplied by 10. This is basic

[16:21] math here. Now, I'll need a calculator

[16:23] to actually give you the result. But

[16:25] conceptually, the the concept here is

[16:28] one that I'm pretty familiar with. It's

[16:30] just a basic concept called exponential

[16:32] decay. I'm sure some of you might know

[16:34] it. Like you have 95%. That's the number

[16:37] n5. 10 iterations would be raising it to

[16:40] the power of 10. And I think like I'll

[16:42] need a calculator again to do this, but

[16:44] conceptually it took me the human to

[16:47] figure to to spec to do this to set this

[16:50] this loop up. I guess you could say, but

[16:52] it's 0.5. So, it's like the point I'm

[16:55] making here is just that unless the

[16:56] agent is going to do it perfectly with

[16:58] perfect accuracy, the crap is just going

[17:01] to compound and get worse and worse the

[17:05] longer you let it go. And this is, and

[17:07] this part is my favorite. Um, the

[17:09] creator of Flask, I guess, agrees with

[17:11] me a bit. I decided to do some

[17:14] experiments with looping over the

[17:15] weekend. The only cases where they work

[17:17] so far for me are a review. I think what

[17:20] he means is have setting up like a loop

[17:23] that reviews the work and if there's

[17:25] issues with it will fix those issues.

[17:28] That's definitely one that I I use as

[17:30] well. Like anytime I create like a big

[17:32] change, I'll basically tell it like run

[17:34] code rabbit or some other review tool

[17:36] and keep continuously running that tool

[17:39] and addressing the issues until there

[17:41] are no more addressable issues left.

[17:43] Reasonable approach. AI can be pretty

[17:45] decent at identifying issues. If someone

[17:47] uses them for actual implementation on a

[17:50] medium-sized project, would love to have

[17:53] something to look at. I completely

[17:56] agree. And Jared replies and he says,

[17:59] "In my opinion, loops work best around a

[18:03] task Q, more like a for each rather than

[18:07] a while." So, this is the part that just

[18:11] I won't say pisses me off, but bothers

[18:14] me a little bit because weren't you just

[18:16] saying that that like implying that we

[18:22] should be looping now? But now, now only

[18:26] two or 3 weeks later, now we're

[18:28] discovering the limitations. That's how

[18:30] you know that this is just a like

[18:32] everybody's just waiting to see how this

[18:34] plays out. There are no experts on this

[18:36] stuff. There are only people who pretend

[18:39] to be experts. And by the way, he used

[18:42] an analogy here in case some of you guys

[18:44] are vibe coders and you don't know what

[18:46] a for each and what a while loop is.

[18:49] Well, a while loop is just something

[18:51] that runs continuously until like a

[18:53] condition is met. Kind of like an

[18:54] agentic loop if you're a vibe coder. A

[18:57] for each is a loop that goes through

[19:00] predefined sequence. And he's saying

[19:03] that actually loops

[19:06] are like implying at least that they're

[19:08] not suited for the latter. Like the

[19:09] while case that if you just like let it

[19:11] run loose, that's actually not like the

[19:13] best way to use it. Okay. I mean, fair

[19:16] enough. I wish he would have said that 3

[19:18] weeks ago, but maybe he didn't know that

[19:20] 3 weeks ago. Okay, fair enough. I spent

[19:22] a lot of time talking about some of the

[19:23] takes that I didn't like, so I'd want to

[19:26] close with a couple takes that I think

[19:28] are a lot more fair and balanced. I

[19:31] think this one from Mitchell Hashimoto

[19:34] who I think is very like balanced on

[19:36] this stuff. He's not like for or against

[19:37] AI, but he'll call out a lot of the BS

[19:40] and he basically says that he got an

[19:42] agent loop where he was trying to

[19:43] optimize a renderer and he got it down

[19:45] from 88 milliseconds to 2 milliseconds.

[19:47] And he says it sounds good, right? No,

[19:49] it's not. And then he goes on to explain

[19:52] why in the rest of the post. I'll link

[19:53] this in case you want to read it.

[19:55] There's one other thing which is this

[19:57] talk from Google. I'll also link it. I

[20:00] won't go through all of it, don't worry.

[20:02] But I would recommend you guys consider

[20:04] doing so because I thought it was

[20:06] actually very fair and balanced. I'm not

[20:09] just saying that because it's Google

[20:10] making it. I'm not trying to say there

[20:12] are good guys or bad guys. I'm not

[20:14] trying to say Anthropic is the bad guy.

[20:15] I think it's more about looking at the

[20:17] incentives of who's talking. When you

[20:19] see Boris talking or anybody from

[20:21] Anthropic, unfortunately, they have some

[20:24] pretty strong incentives to build the

[20:26] hype. And Google does not have the same

[20:29] incentives to build hype for agentic

[20:31] coding. Only really when you think about

[20:33] it, OpenAI and uh Anthropic do mainly. I

[20:36] guess cursor as well, but they've been I

[20:38] I think pretty fair about things. And

[20:40] so, you know, if you're wondering why

[20:42] you're not saying like any of the other

[20:44] companies hyping this stuff up as much,

[20:47] well, that's why. It's not like

[20:48] everybody else is dumb living under a

[20:50] rock and knows nothing about coding or

[20:52] agentic coding. It's just that they're

[20:54] being a bit more honest, I guess. But

[20:56] there was one uh segment about this on

[20:59] going on how fast you should go when

[21:01] building software. And speaking of

[21:03] rollbacks, do you guys know why

[21:04] rollbacks work today? Basically, it's

[21:06] because you release software slightly

[21:08] slower than it takes you to defect or to

[21:10] detect a problem in production. If you

[21:12] can release software really, really

[21:14] fast, faster than you can detect

[21:16] anything is wrong. What does that mean

[21:17] for your roll back posture? Every roll

[21:19] back will now have to contend with

[21:21] multiple conflicting changes landing on

[21:22] top of it. So, it's not just enough to

[21:24] release faster. We have to consider the

[21:25] whole system, the roll back as well.

[21:27] That's a really important safety valve.

[21:28] >> It took him like 30 seconds just to make

[21:31] a very good take and a take that you

[21:34] kind of wonder if you're just you're

[21:36] terminally online scrolling through

[21:37] Twitter pretending like you're learning

[21:39] something new every day about coding,

[21:42] but you're missing some of the most

[21:43] basic stuff that nobody on Twitter is

[21:45] talking about because everybody's too

[21:47] busy creating their sloop posts or just

[21:50] vague posting and not telling you

[21:51] anything. And I just I'm just tired of

[21:54] it. I'm sorry not being a hater, but I'm

[21:57] really just tired of
---
type: youtube
url: https://www.youtube.com/watch?v=_WLVv1C6-VM
title: "Stop Reading Code. Start Understanding Systems."
channel: "AI that Works"
speakers:
  - Vibv (CEO, Boundary ML / BAML)
  - Dex Horthy (CEO, Human Layer)
date_saved: 2026-07-13T18:13:14.349Z
ingested: 2026-07-15
---

# Stop Reading Code. Start Understanding Systems.

[0:00] We live in a world where we don't read

[0:01] the code anymore. The only way to really

[0:03] combat that is to have some

[0:05] understanding of what the code does post

[0:06] execution. [music] Everyone is giving

[0:08] you different levels of observability.

[0:10] Your job as an engineer is to go figure

[0:12] out what works for you. So your agents

[0:13] can understand what actually happened.

[0:15] Does all of this eventually loop back

[0:17] and now Claude can actually close the

[0:19] loop and you can build a better and

[0:21] better system so you can have alignment

[0:23] in what you expected versus what

[0:25] happened. Hey everyone, today's episode

[0:26] is going to be about observability. And

[0:28] the thing I find most fascinating about

[0:31] observability is how we actually went

[0:33] through and we're able to go and build

[0:35] these black boxes now with code that we

[0:37] either don't read or are

[0:38] non-deterministic because they use LMS

[0:41] and therefore have some level of

[0:44] expected failure and hit rates. And the

[0:46] most close analogy that we really relate

[0:47] to is distributed systems and how we

[0:49] actually built distributed systems. we

[0:51] go a little bit into the history of how

[0:52] we did metrics, wide logs, um, and user

[0:55] expectations to eventually build a fully

[0:58] probing system. One of the cool things

[0:59] that we'll talk about is how to actually

[1:01] build full tracing execution and what an

[1:03] example of that looks like so that you

[1:05] can get full call stacks and really

[1:06] deeply have both you and Claude

[1:08] introspect your code traces. But the

[1:10] most important part is the value of

[1:12] tracing, which is how you can go from

[1:13] design to code to post execution and

[1:16] build a closed loop system that helps

[1:18] you better align with your agents. Let's

[1:20] get started.

[1:21] >> Let's do it, baby. Welcome to the AI

[1:23] that works show. Uh, where Vibob

[1:26] definitely always shows up on time. Uh,

[1:28] my name is Dex. I am the CEO and

[1:30] co-founder of Human Layer. We help you

[1:33] solve hard problems and complex code

[1:34] bases with AI. And I am joined by Vibv,

[1:37] the CEO. I guess he's just co-founder of

[1:40] of Boundary ML where they make a

[1:42] programming language for AI and the AI

[1:46] era and for AI agents and uh yeah, what

[1:49] was your biggest takeaway from AI

[1:51] engineer last week?

[1:52] >> I think a lot of people are extremely

[1:54] stressed about the quality of their code

[1:56] bases over time. It seems to be a source

[1:58] of anxiety for almost every human I've

[2:00] met from the best engineers to the worst

[2:02] engineers.

[2:03] >> I agree. Yeah, that was kind of the

[2:05] whole software factory theme was like

[2:07] everyone had their own solution to how

[2:10] do we fight slob? How do we how do we

[2:11] let how do we use AI to help us ship

[2:14] code without like screwing it up? And

[2:17] it's like you had the people who said

[2:20] just do more code review agents. They

[2:22] say just do more linting. You had you

[2:24] and Eric who were both like we need new

[2:26] programming languages. Eric's languages

[2:29] were more like alien space languages

[2:31] that Jeff Huntley predicted. Uh I think

[2:33] yours is a little more sane and uh you

[2:35] know continuous innovation rather than

[2:37] discontinuous. But um yeah I uh I think

[2:41] software 2026 is going to be the year of

[2:43] no more slop by hell or high water. We

[2:46] are going to figure out how to make it

[2:47] happen as a as as an industry.

[2:49] >> I think we're going to have something

[2:50] happen. I don't know if it's going to be

[2:52] no slop, but I think we're going to get

[2:53] further away. And I do think a lot of

[2:56] people are feeling

[2:57] >> Yeah.

[2:58] U I think a lot of people are feeling a

[3:00] lot of the anxiety of what like

[3:03] their code base are devolving into. I

[3:05] have another question for you. When you

[3:07] had the opportunity to go talk about

[3:09] human layer at the conference, what do

[3:11] you think resonated the most? I think

[3:15] there's this weird like the there's this

[3:17] like spectrum of people's maturity with

[3:20] AI and their LM intuition and like their

[3:23] their proclivity to the hype machine and

[3:26] things like this of like where are you

[3:28] along your journey of like oh this

[3:30] really works or no it doesn't and like

[3:31] it's kind of like you know the midw

[3:33] curve of like no I need six t- buck

[3:35] sessions and I need this and I need that

[3:37] and like the end of the curve is like

[3:38] nope just read the code and make good

[3:40] software there's a lot ofcept acceptance

[3:42] that you know I think someone came up to

[3:44] me and said 70% of the people at this at

[3:46] this conference are actually like early

[3:48] in the journey and they're like really

[3:50] excited about whatever is being hyped

[3:52] right now and there's about 30% of

[3:54] people who have like yep seen that tried

[3:56] that been doing that for a year doesn't

[3:58] work like I am I am past that and like

[4:01] so I don't know the biggest takeway for

[4:02] me is like there's such a broad spectrum

[4:04] of of AI and AI maturity and it's I know

[4:08] on this show we work really hard to kind

[4:10] of like cut through the hype and give

[4:11] you stuff that actually works. And I

[4:13] think that's like more important now

[4:15] than ever. And I don't know, it's it's

[4:18] hard to both like it's the broader the

[4:21] audience and the broader like the

[4:22] things. This is like a teaching in

[4:24] general. It's like you have to you have

[4:25] to know who you're talking to and who

[4:28] you're trying to serve and uh it's

[4:30] getting complicated. I think I uh I just

[4:33] want to shout out a few folks like um I

[4:35] know a few folks came up to both me and

[4:37] Dex at the conference of like you guys

[4:39] have been longtime fans and like have

[4:40] been tuning in. Um I was as a founder

[4:43] that was so cool. That was so cool to

[4:45] just experience and have you guys come

[4:46] out here um and just say hi and like

[4:49] it's awesome to know that it's this is a

[4:51] fun conversation you guys are tuning in

[4:52] to.

[4:53] >> I think I got Vibb hooked. He's never

[4:55] been to an AI engineer conference before

[4:57] and I think we're going to get him to

[4:58] come to the rest of them. So, if you

[5:00] want to uh hang out with us, uh go to

[5:04] the AI engineer event near we're not

[5:06] going to go to every single like I'm not

[5:07] going to Singapore. It's too far.

[5:09] >> But if you're an AI engineer in New

[5:11] York, if you're an AI engineer Miami,

[5:12] we're going to try to make it to I'm I'm

[5:14] going to try to make it to all of those

[5:15] because I I I love the crowd and

[5:16] attracts really really smart people and

[5:18] I always learn a ton. So, uh if you want

[5:20] to hang out with us, AI engineer,

[5:22] >> I think for me, uh I had a really

[5:24] interesting takeway. It's actually

[5:25] related to today's topic. So, uh, when I

[5:29] was talking a lot about BAML, a topic

[5:31] came up pretty often, which is like

[5:33] observability. And I know everyone talks

[5:35] about observability, but today I kind of

[5:37] want to both whiteboard a few things and

[5:39] also talk about stuff from like more

[5:42] like first principles around

[5:43] observability.

[5:45] And really the reason that observability

[5:47] came up really high is because when I

[5:50] think about observability in today's day

[5:52] and age, I actually think of it as the

[5:55] only way to understand our codebase. And

[5:57] Dexter, I'd love your thoughts on this

[5:58] as we chat more. But when I think about

[6:01] it, it's like look, I don't read every

[6:03] line of code anymore. I' I've been

[6:04] saying this for a bit. I I basically

[6:06] stop reading the code. I read a lot. I

[6:08] read some of it. I read invariants. I

[6:10] read the very low layers. I read the API

[6:12] surface area, but I don't read every

[6:13] line of code. It's too much pain in the

[6:15] ass.

[6:15] >> Do you want to see what I read?

[6:17] >> You read your specs?

[6:18] >> No, I read We actually We added this

[6:20] thing to Human Layer recently that is

[6:22] like a PR walkthrough. Have you seen

[6:24] this?

[6:26] Let me find uh let me find a big one.

[6:29] Keep keep going. I'll I'll find you a

[6:31] good one. Keep keep talking about what

[6:32] you read and what you don't.

[6:34] >> I think when we live in a world where we

[6:35] don't read the code anymore, the only

[6:37] way to really combat that in my opinion

[6:39] is basically to have some understanding

[6:41] of what the code does post execution.

[6:44] Uh it's kind of like how if you ever

[6:46] have a website, the way that you

[6:46] understand how your website is working

[6:48] or not is not by like reading the code

[6:49] of the website. You literally just look

[6:50] at the funnel. You look at engagement

[6:52] rates and that tells you all the data.

[6:54] But now I think we kind of have to do

[6:56] that for all systems, not just u uh not

[7:01] just uh AI systems.

[7:04] >> Let me let me let me let me get you this

[7:05] example real quick.

[7:08] Um wait, where did it go? Did it just

[7:10] did it literally just close the tab? God

[7:12] damn it. All right. all systems, not

[7:13] just AI systems.

[7:14] >> So like let's say we have a block of

[7:16] code here and effectively it operates as

[7:18] like a black box and as long as a black

[7:21] box keeps on like giving you like

[7:23] correct I guess blue box as long as a

[7:25] blue box keeps giving you like correct

[7:27] outcomes as far as you're concerned

[7:29] that's kind of all you measure. You're

[7:30] basically like how many of the how many

[7:32] of the outcomes that we do for like user

[7:34] A user B encountering this scenario how

[7:38] many of them work? And at some point you

[7:40] go down this road. You're like, "Okay,

[7:42] well we have 10 that are working." And

[7:45] at some point some user comes along and

[7:46] says, "Hey, this stuff doesn't work."

[7:49] And they report some bug. And what you

[7:51] really measure as an end user. Uh at

[7:54] least the way I think about this is you

[7:56] measure like how often is someone

[7:57] getting an undesired outcome out of

[8:00] this. And and

[8:02] >> right this was we started with like

[8:04] uptime. This was like what appex was,

[8:07] right? Aptex was this proprietary metric

[8:09] that now everyone has which is like just

[8:12] a number from zero to 100 uh or actually

[8:15] it's like 99.9 it's like two decimal

[8:17] places of like how how how often are

[8:20] user getting disappointing results and

[8:22] it was like a com combination of

[8:26] response time and error rates and all

[8:28] this stuff that gave you kind of this

[8:30] onelevel picture of like is it is it

[8:33] good and what percent of people are not

[8:34] having

[8:35] >> said he stole my thunder that's why I

[8:36] drew through it this way cuz my next

[8:38] boss is to exactly do this. It's like

[8:40] [laughter] this is exactly how we do

[8:42] distributed systems. If you guys think

[8:44] about this um we basically have this

[8:46] metric uh because it's impossible to

[8:47] know the status of a distributed system,

[8:49] you can only measure it as it exists at

[8:52] any given time.

[8:53] >> And what you really do as you become a

[8:55] bigger and bigger company is instead of

[8:57] measuring one system, you actually start

[8:59] measuring subsystems as well.

[9:02] uh and you basically start building all

[9:04] these metrics and all these things that

[9:05] say like how well is your system

[9:07] performing over time rather than just

[9:09] like a single part of your system uh and

[9:11] now all of a sudden you've built GitHub

[9:13] and now you have you eventually

[9:14] hopefully end up with uh five nights of

[9:17] uptime though that's very hard um and

[9:20] obviously as your system gets well the

[9:23] problem is what ends up happening is as

[9:24] your system evolves and the thing about

[9:26] regular software

[9:27] >> is this doesn't happen very much your

[9:29] system doesn't typically evolve the way

[9:31] your users use distributed system is

[9:33] very generally stable and predictable

[9:35] over time and we've seen exactly what

[9:37] happens when it becomes unpredictable.

[9:39] For example, in the case of GitHub, more

[9:41] code is being pushed to GitHub than they

[9:43] ever predicted at a rate that they could

[9:46] not have modeled. Like you could it is

[9:48] impossible to go back to 2021 and say we

[9:50] are going to push this much code into

[9:52] GitHub. it like it would be an insane

[9:55] bet to go make that bet just like it

[9:57] would be an insane bet to go back to

[9:59] 2021 and say we're gonna need this much

[10:01] RAM in the environment. So, we need to

[10:03] start building these factories in like

[10:04] 2017 or 2020 so that we have RAM today.

[10:08] >> It's just not going to happen. [snorts]

[10:10] >> If I if I came to you in in 20 2021 and

[10:13] said I'm going to thousandx the number

[10:14] of software developers by 2025, you

[10:17] would have been like

[10:18] >> it's just not going to happen. uh

[10:19] there's like a curve and you fit the

[10:21] curve and you there's some like ratio

[10:22] that you go do this. So effectively what

[10:24] happens is when your distributed system

[10:26] no longer models your system, what ends

[10:28] up happening is you basically just

[10:29] suddenly start getting way worse uptime.

[10:32] And if you go back um yeah I mean any

[10:36] company at a trillion dollar valuation

[10:37] 2020 2019 was crazy. It's just not what

[10:40] you expected. Um but if you go back

[10:44] >> to this kind of system and started doing

[10:46] this,

[10:48] >> think about how this works for agentic

[10:49] systems. We kind of have the same thing.

[10:52] Except the big difference here is except

[10:56] your end user.

[11:00] This this funny little person over here.

[11:03] Um, can I draw?

[11:06] How can I draw on here? Sorry.

[11:09] >> You can do whatever you want, man.

[11:12] >> This end user.

[11:13] >> I loved the stick figures in your

[11:15] presentation. This is what Excaladraw

[11:17] was meant to be used for. I use JS Paint

[11:19] just to be very clear. Um, this end user

[11:22] over here, the only problem is, uh, this

[11:25] end user is a lot more dynamic than

[11:29] distributed systems are. And that makes

[11:31] a huge difference because as this end

[11:34] user, they're suddenly going to push in

[11:36] a whole bunch of dynamic inputs into

[11:38] your actual agentic system or your non

[11:40] your basically your vibecoded slop that

[11:42] you built over here. Um, and like I

[11:46] don't say that in a bad I generally mean

[11:47] this with love. I think everyone's going

[11:49] to have more vibecoded slot than ever

[11:51] before. And every single time this user

[11:53] does this, you're going to have a lot

[11:54] more reds. And the better and the better

[11:58] and more capable you make your system,

[11:59] ironically enough, the more reds you'll

[12:02] have. And the more reds, go ahead.

[12:05] >> Well,

[12:07] >> well, the reason I say this is not

[12:10] because your system is bad. It's because

[12:11] a user is going to start building

[12:14] effectively insane expectations about

[12:16] what your system will do and it'll just

[12:18] have more and more unmet expectations

[12:20] because what you're really doing is

[12:22] you're building like oh my god nope

[12:24] wrong thing. You're basically building

[12:26] this chart of like what the you what

[12:28] your system can do and it's going like

[12:30] this. But as your system gets better the

[12:33] user's expectation of what your system

[12:34] can do is going like this. So what's

[12:37] really happening and the reason that

[12:38] you're getting more reds is not because

[12:40] your system is not getting better or

[12:41] because the models aren't getting

[12:42] better. The reason that you're happening

[12:44] is this discrepancy is really what

[12:46] you're really trying to like fight. It's

[12:48] like what is the amount of delta that

[12:50] the user is perceiving between what your

[12:52] system it thinks your system can do

[12:54] versus what it can actually do. And this

[12:57] it's I think in the world that we're

[12:58] headed towards today the user system is

[13:00] going to go up.

[13:02] And in this world and like my opinion is

[13:06] that the only way to actually understand

[13:08] the system is basically to have more and

[13:10] more probing points through arbitrary

[13:12] points in your software. So instead of

[13:14] having a single uptime number, you

[13:16] actually have many uptime numbers. You

[13:18] have many implicit understandings of

[13:22] exactly where your codebase is failing.

[13:24] So then you can say something like oops.

[13:32] So then you can say something like this.

[13:34] It's like, hey, this is our uptime for

[13:35] this section of the graph,

[13:38] but that doesn't mean it's the same

[13:39] exact uptime for this section of the

[13:42] graph. And being able to introspect your

[13:44] codebase at this level of granularity, I

[13:46] think is the only way to truly go and go

[13:49] do this. And I'll talk about a whole

[13:50] bunch of like ways that we can talk

[13:52] about this in a second. But I just I

[13:54] first wanted to talk about like the phil

[13:55] uh philosophy behind this. What are your

[13:57] thoughts on this guys?

[13:59] >> Yeah, this is this this is Andy Grove,

[14:01] right? This Andy Grove's whole thing was

[14:02] like I mean this was Intel a while ago.

[14:04] This was not really about measuring

[14:05] software. It was about measuring like

[14:07] teams and people and processes, but it

[14:09] was like treat it like a black box and

[14:11] then when the black box no longer serves

[14:13] you and you have to open the box like

[14:14] maybe you put windows on the box, you

[14:16] put little slits on where like the old

[14:17] school observability is like you would

[14:19] just like emit a couple metrics, right?

[14:21] You would have like four numbers that

[14:22] would just tell you like what's the

[14:24] average time to do this? What's the

[14:25] average rate of X? And so you're like

[14:27] kind of poking slits in the box and then

[14:29] eventually you're just like what you're

[14:31] saying is like it's so complicated and

[14:33] so random and so so like just the the

[14:36] amount of different cases going in that

[14:39] it's it's not enough to just poke slits

[14:40] in. You kind of have to be able to

[14:42] really look at every single thing that's

[14:43] happening inside.

[14:44] >> And the reason for this is like the

[14:45] problem is once someone reports a bug,

[14:47] as sad as it is, this metric is only

[14:50] useful in hindsight. You can't have

[14:52] foresight about what the problems is.

[14:54] And if you did know what the foresight

[14:55] is, then like great, just fix the

[14:57] problem because just ask an agent, it'll

[14:58] fix the solution for you. But if you

[15:02] >> and this this was actually like if you

[15:04] want you want to do a little more

[15:05] history here

[15:07] >> like so like the thing you used to have

[15:09] was like here I'm gonna go off to the

[15:10] right here was like you had basically

[15:12] like the number the the the key the the

[15:15] first thing we had was like when data

[15:16] was expensive and memory was expensive

[15:18] we had metrics

[15:19] >> and so you literally had like one number

[15:21] and you could say you know for for a

[15:24] given server you know the what's the

[15:26] error rate right and it would be good

[15:28] and then it would pop up and then it

[15:30] Come down, right? Oh my god. I can't do

[15:32] the drawing thing. We're going to do

[15:34] this one.

[15:34] >> No, you got to have art, man. Artisal

[15:37] art. Anyway, go on. Okay.

[15:39] >> No. So then you could say, okay, for

[15:42] server one, it looks like this. And for

[15:43] server two, it looks like this. And like

[15:45] you would just look at like, yeah, the

[15:46] error rate for different things. Uh, and

[15:50] and and you would just draw like, you

[15:52] know, what is one one number per thing

[15:54] you cared about and you would have like

[15:55] a couple hundreds of these and you would

[15:57] make dashboards with this stuff. Uh and

[16:00] so your your data would basically look

[16:01] like you know time stamp it was time

[16:03] series right so you would have like a

[16:04] time stamp and then you had you know

[16:06] like 1s 2s 3s like into something I

[16:10] don't know these are these are all dates

[16:12] right

[16:13] >> yeah exactly

[16:16] >> and then you would just have like values

[16:18] right and so you would say you know like

[16:19] server one yeah thank you

[16:23] >> yeah you'd basically just collect a

[16:24] bunch of data for various servers or

[16:26] various processes or various devices and

[16:28] just basically try and slice and dice

[16:30] them in some meaningful way.

[16:34] >> Yep. Uh and so these would be like value

[16:36] one.

[16:37] >> Uh and then what we got to in like the

[16:39] mid like basically like what Facebook

[16:41] did with scuba and then charity majors

[16:43] came and took and turned into like what

[16:46] like they basically she coined the term

[16:48] observability, right? Uh and so

[16:51] observability was basically like instead

[16:52] of just having metrics have what we call

[16:55] like wider data like the the journey of

[16:58] observability is like hardware and

[17:00] storage and like software gets better

[17:02] and more performant and we can store

[17:04] more stuff without knowing what we want

[17:06] and so you have like you can store like

[17:08] user ID and you can store you know error

[17:11] message and you're basically like

[17:13] storing this why is this like this hold

[17:14] on let me left justify this you you

[17:17] start storing this like event data

[17:19] basically basically where you have like

[17:20] tons and tons of fields of like

[17:23] team ID,

[17:26] region and so like basically instead of

[17:29] manually having to like decide what your

[17:31] dimensions are like in this case you

[17:32] store the timestamps for servers and

[17:34] then you also store the time timestamps

[17:36] for like you know service

[17:40] service one service 2 like basically

[17:43] spread ac if you have if you have uh

[17:45] let's say you have like you know this

[17:48] was like old old old pre-cluster days,

[17:50] but you have like server one

[17:53] and server two. And so the only

[17:55] dimensions you have were like what

[17:56] service was it? What server was it on?

[17:58] And then you have like service one

[18:00] running here and you have service two

[18:03] running here.

[18:03] >> I got something

[18:04] >> and let's say you only have service one

[18:06] over here. Does that make sense?

[18:08] >> Talks about this and this basically just

[18:10] is a great tear down of why you want

[18:11] observer wide events. But like it

[18:14] basically just talks about this and

[18:15] talks about how you want to go get wide

[18:16] events for all the unknown unknowns. And

[18:19] the graphics he does here are like

[18:21] >> yeah it's way easier to debug if you can

[18:23] store all of the data and then go figure

[18:25] out what you want later and query it

[18:27] performantly and store it like without

[18:30] taking up like billions of gigs of data.

[18:32] >> Exactly. So this thing basically just

[18:33] talks about this and says why you want

[18:34] all this data. Um I'll link our linked

[18:37] article. Boris is awesome. Um writes a

[18:40] really good blog post about this stuff.

[18:43] Why can't I send it? There you go.

[18:44] >> Oh, yeah. This is better than mine.

[18:46] >> Yeah, because this lets you correlate

[18:48] across any dimension that you might want

[18:51] to care about and you don't know what

[18:53] the dimension is later. If it's like it

[18:55] it makes it so much easier to find bugs

[18:56] if it's like, oh, all the users that

[18:59] have this thing is true, uh, that's

[19:01] that's the thing that actually

[19:03] correlates with the spike.

[19:04] >> And and the most important thing for

[19:06] everyone to really understand here is

[19:08] not anything specific about this. It's

[19:10] the most important thing to really

[19:12] understand here is that when you do

[19:15] observability of any kind,

[19:18] observability is not useful at all for

[19:21] things you already know. Observability

[19:23] is useful in hindsight. When you like

[19:26] why do we have these uptime metrics? Why

[19:27] don't we just start with a standard

[19:28] number and why do we break them down

[19:30] more? It's because when something goes

[19:32] down, you want to quickly be like, hey,

[19:33] the main system is down because the

[19:35] database is down. And boom. You want you

[19:37] want to have that answer. You don't want

[19:38] to be debugging it at that time. You

[19:40] don't want your users or Dexter this

[19:42] beautiful agent diagram like our users

[19:44] are now not obviously just humans. So

[19:48] let's write this down. We also have

[19:49] agents using it. You want agents to be

[19:51] able to understand the spec as well. So

[19:53] the only thing you can find useful is

[19:55] effectively hindsight observability.

[19:58] And that's like the big that's kind of

[20:00] the big argument that I want to push the

[20:01] world towards more personally, which is

[20:04] you want to be able to make your entire

[20:06] black box observable because if you

[20:08] don't make it observable, then you can't

[20:09] have handset observability. And in order

[20:12] to do that, you have a couple of

[20:13] different options. And one of those

[20:15] options just like

[20:17] how do I zoom in?

[20:20] one of those options like you're going

[20:21] to write a bunch of code like service

[20:24] API server service API

[20:30] that does something who I don't know

[20:31] what this router does but like uh like

[20:35] hello route

[20:37] uh you're going to build a bunch of

[20:38] these routes as you go down this road

[20:40] and as you build this route one of the

[20:42] things that I recommend that you do for

[20:43] all your top level API just like add

[20:45] some sort of tracing on top of it it's

[20:47] super lowhanging it's super trivial, but

[20:50] it'll just make it so that when

[20:51] something goes wrong, even if you don't

[20:53] understand it, you can go do this and

[20:55] just like ask an LM to go do this. Add

[20:57] some llinter to guarantee this.

[20:59] >> That's funny.

[21:01] >> My one of my first projects that I built

[21:03] uh at Sprout back in like 2015 was this

[21:06] thing called instrumented where you

[21:07] would like it would like take the

[21:09] function name and it would emit like 15

[21:10] metrics basically.

[21:13] >> Uh this was based on like Kota Hail's

[21:14] metrics, right? You would have like uh

[21:16] you would have a meter for like you

[21:18] would have like a counter for how often

[21:20] it is getting called

[21:23] throughput. You would have a timer for

[21:25] like the histogram of like histogram of

[21:28] latency.

[21:30] [snorts]

[21:30] >> You would have a counter for errors. Uh

[21:34] and so you could do thing you could

[21:35] compute things off of this like error

[21:37] rate equals you know throughput over

[21:40] errors or errors over throughput, right?

[21:43] >> Yeah. Uh and you can look at like the

[21:45] P99 and etc. And so like basically and

[21:48] and and the histogram here like the the

[21:50] the histogram every single thing is a

[21:52] different metrics P50, P90,

[21:55] P98, P99, etc.

[21:58] Um and tracing is like you should talk

[22:00] about what tracing really is like you

[22:02] should draw a trace or do you have a do

[22:04] you have a trace floating around

[22:05] somewhere of like

[22:06] >> I do I have a I have one that's

[22:08] available right now. Yeah, because I

[22:09] would say like distributed tracing was

[22:11] the next hot thing after we got into

[22:12] wide data sets. Like that was the thing

[22:14] that people built on top of wide data

[22:16] sets was like hotel traces, open

[22:18] telemetry traces.

[22:20] >> So I'm just going to show something

[22:21] because that's probably easier.

[22:24] >> You got waterfall. You got a waterfall

[22:26] for me?

[22:27] >> Yeah. Yeah. I'll just run this for

[22:29] example. It doesn't really matter what

[22:30] this pipeline does. I'm just going to

[22:31] run this really fast.

[22:32] >> This is like some image gen thing,

[22:34] right?

[22:35] >> Yeah. I mean it's called generate

[22:36] images. So I really hope it generates

[22:38] images. [laughter] Um otherwise it's

[22:41] named poorly. But you're seeing a bunch

[22:42] of functions here. This function uh

[22:46] uh this function for example you can see

[22:48] what it does. It basically is like it

[22:50] generates an image then evaluates an

[22:52] image and then while the score is low it

[22:53] does that in a loop and eventually

[22:54] returns the image that it finds uh if

[22:57] it's less than three attempts. Do you

[22:58] kind of get the gist of what the code is

[23:00] doing? But uh I'm going to show you what

[23:02] what we really want with tracing because

[23:04] once you have tracing there's a lot of

[23:05] things in here. Obviously, this is using

[23:07] a lot of functions that we don't know.

[23:08] We haven't read the code for any of

[23:10] these. We don't know what HTTP calls

[23:12] we're making. We have no almost no

[23:13] introspection on any of this data.

[23:15] >> Yeah. In the old days, if I wanted to in

[23:17] the old days, if I wanted to debug this,

[23:18] I'd be like jumping to definition and

[23:20] clicking around and like, okay, let me

[23:21] go read this function body to understand

[23:23] what happens. Okay, let me go click into

[23:24] another function to understand what

[23:26] happens. And like building this all into

[23:27] my head of like, okay, how do these

[23:28] things fit together? Where are the slow

[23:30] parts? Where are the errorprone parts,

[23:32] etc.?

[23:33] >> Yeah, exactly. And when I really Why is

[23:35] it running so many? I have three

[23:36] attempts.

[23:38] Did I have a Oh, I'm dumb. I don't

[23:41] increase attempts by one firstly. Like,

[23:44] so I just want to show again like how do

[23:46] you find bugs with tracing? Well,

[23:47] >> well, this is at the very least logs.

[23:51] >> This is this is tracing actually. I'm

[23:53] dumping out the tracing values here. But

[23:56] first things first, let's let's uh

[23:58] cancel this function. Um

[24:02] Oh, I'm sorry. All right, we don't have

[24:04] plus+ because++ is silly. We should

[24:07] probably add plus+.

[24:10] Um,

[24:11] as I go do this, I'm going to cancel

[24:13] this.

[24:13] >> Yeah, your agent tries BAML didn't find

[24:15] that.

[24:17] >> I didn't run this anyway. Um, so as I

[24:21] run this, the first thing to notice is

[24:23] like one really nice thing that you get

[24:25] with really nice tracing is you can

[24:27] build really nice tools like this. You

[24:29] can clearly be like and watch.

[24:31] >> Can we start with the trace before we go

[24:32] to the UI you built on top of the trace?

[24:35] >> Yeah, here we go.

[24:38] >> We'll just do full screen. Let's open

[24:40] the flame graph and just look at this

[24:41] thing.

[24:44] Uh let's go here.

[24:47] >> If you scroll down, you have this

[24:48] waterfall thing, right?

[24:50] >> Yeah. And the waterfall thing basically

[24:52] tells you exactly how much you're

[24:53] spending and what things. And if you've

[24:55] ever seen like a flame graph or

[24:56] something like that, you can think of as

[24:58] a uh sorry, I'm going to rerun this

[25:00] because uh I lost the

[25:02] >> Yeah, that's a big old

[25:05] >> Yeah, I lost the source maps.

[25:08] >> Oh, because you edited the file.

[25:09] >> Uh yeah. Yeah. So, we have we'll work on

[25:12] doing this. But um when this runs

[25:16] this time, it's bounded to three, so it

[25:18] should be faster. But like the first

[25:20] value of tracing that you really get is

[25:21] like the minute you start tracing,

[25:23] finding bugs is so much easier because

[25:26] the minute you can find bugs is how do

[25:27] you find bugs? Well, even as the program

[25:29] is executing without waiting for

[25:30] completion, I realize that something is

[25:32] off here because it should take three

[25:33] attempts and boom, I can trace it very

[25:35] fast. So if you think about your

[25:37] production applications and users

[25:38] getting un unexpected behavior, if you

[25:41] can expose tracing to your users or

[25:44] something like that, your users can

[25:45] actually help diagnose and build the

[25:46] right system automatically.

[25:49] Let's go here. Uh, what is going on?

[25:51] Sorry.

[25:55] >> All right, we're going to run it one

[25:56] more time.

[25:57] >> One more time. Beta software. Um, but

[25:59] and I'll talk about hotel and stuff in a

[26:01] second, too. And I'll talk about LM

[26:02] tracing as general because LM tracing I

[26:04] think is slightly different than regular

[26:05] tracing, but I think it's people are

[26:07] treating as too different than regular

[26:08] tracing.

[26:10] >> Uh, it's different in some senses, but

[26:11] most

[26:12] >> how many hotel how many startups are

[26:14] just hotel rappers billing themselves?

[26:16] It's like, well, this is special. You

[26:17] need you need to do it differently for

[26:19] LLMs.

[26:20] >> Yeah, it's like and I'll talk about

[26:22] hotel in a second. I have a whole huge

[26:24] bunch of gripes at the hotel, but it I

[26:26] think the key part that you really want

[26:27] to have is when you go look at this

[26:29] flame graph and you go start

[26:30] understanding what the code is actually

[26:32] doing. You want to be able to really

[26:34] quickly understand exactly where time is

[26:36] being spent, where error rates are

[26:38] happening, what's not happening as you

[26:40] expect. Uh and like you could imagine

[26:42] this is just a dimension. We Dextra

[26:44] talks about wide events. If you want to

[26:45] understand cost, you want to understand

[26:47] how many times you call something out.

[26:50] >> Well, technically technically cost and

[26:51] time are metrics and the dimension is

[26:53] like function name or or module or

[26:57] whatever it is.

[26:57] >> Yeah, sure. You want to be able to index

[26:59] by function name or something else, but

[27:01] like

[27:01] >> obviously you're going to use packages

[27:03] that you don't own. You want to be able

[27:04] to understand what packages you don't

[27:05] own that are being called by the system

[27:07] and be able to really quickly like grab

[27:08] through them

[27:10] >> without having to go debug anything but

[27:12] not have to look at them every single

[27:13] time. But what you really want is the

[27:16] minute think about how an LM works and

[27:18] think about how all of you are going to

[27:19] think about this code. None of you

[27:20] actually know what happens under the

[27:22] hood in these functions. You just know

[27:23] at some point we call generate image.

[27:26] But now you can actually really quickly

[27:27] see what you call with generate image.

[27:29] It calls it calls a thing called prompt.

[27:32] It calls a thing called dot call

[27:34] function. And eventually it goes to all

[27:36] of this. It gets some environment

[27:38] variables over here. Um, and eventually

[27:42] eventually it calls HTTP.

[27:45] And it makes an HTTP request. And you

[27:48] can even see very fast that the bulk of

[27:50] the time is actually being spent um on

[27:53] like this. Oh, where'd it go? Um, on

[27:56] this actual send request over here.

[27:58] There's another one. Oh, waiting for

[28:00] Okay, because there's an await here or

[28:02] something. But the bulk of his time is

[28:04] actually being spent Oh. Oh, sorry.

[28:06] Sorry, the bulk of this time is actually

[28:07] being sent on this like underscore send

[28:09] which send calls under the hood and

[28:12] without you sorry this is latency on the

[28:13] right side. This is when it started.

[28:15] This is like the time step when it

[28:16] started and you can quickly see exactly

[28:18] where it was being called without

[28:20] understanding. So without any guessing

[28:22] without digging through the codebase

[28:23] without understanding the code ahead of

[28:25] time with tracing and really in-depth

[28:27] tracing you can actually go through and

[28:28] figure out exactly what's happening and

[28:30] where your bug might be. And I think

[28:33] this is really the magic of what we want

[28:35] with these sort of systems. Like when we

[28:37] go back to like these total black boxes

[28:38] that we don't understand, you really

[28:41] want to go back in hindsight and say,

[28:43] "How the heck do I understand what

[28:44] happened when things went wrong?" Well,

[28:46] what do you do? You pull up, you need to

[28:48] pull up some sort of tracing system. And

[28:51] the usefulness of this is merely a

[28:53] function of how much tracing you were

[28:55] able to tag on when you ship the code.

[28:57] >> Yeah.

[28:58] >> Does that make sense, Dexter?

[28:59] >> Yeah. I I think of like the difference

[29:01] between tra like what I would have done

[29:02] before and like we'd spent a lot of time

[29:04] in 2014 like sshing into servers and

[29:07] like tailing and gpping logs for stuff

[29:09] is like logs was the earliest version of

[29:11] this. you had logs and then you had

[29:13] metrics and then like now the like the

[29:15] the story is like okay logs metrics

[29:17] traces that's the full observability

[29:19] story and they all have kind of

[29:21] different purposes and different levels

[29:22] of granularity but yeah no I remember

[29:25] when we turned on New Relic in 2014 and

[29:27] it was like oh now I don't have to read

[29:29] the logs and put in special logging to

[29:31] figure out what's slow because the trace

[29:33] is just going to capture everything and

[29:35] be like yep this is the bad SQL query

[29:37] this request made 40 different SQL

[29:39] queries and this is the one that's slow

[29:40] and then you're like cool let me go fix

[29:42] that.

[29:44] >> Yeah, exactly. And I think that's the

[29:45] general list and like every now and then

[29:47] for certain types of functions you want

[29:49] to capture both the inputs and the

[29:50] outputs. Sometimes you only want to

[29:52] capture the inputs, sometimes you only

[29:54] want the outputs, sometimes you want the

[29:55] error rates and everything else. And I

[29:58] think this granularity of being able to

[29:59] choose what you want is basically

[30:01] effectively what you want to happen.

[30:04] It seems like the tracing like the idea

[30:06] behind tracing is like you actually want

[30:08] to keep everything because the the idea

[30:11] of trace is like when we run traces in

[30:13] production in human layer we we do a

[30:14] pretty high sample rate like the the

[30:16] traces are not about like hey I need to

[30:19] debug every single individual request.

[30:21] It's like I need to understand the shape

[30:23] of this thing and I need like a very

[30:25] quick again it's all about like how do

[30:27] you how do you create things that are

[30:28] easy for humans to consume and

[30:30] visualization is a huge part of that.

[30:32] How do I make it obvious without me

[30:33] having to read logs or think or read

[30:35] charts and graphs and just be able to

[30:37] see immediately like oh that's the thing

[30:39] that's low

[30:40] >> actually Kota has another really good

[30:42] talk about this of like

[30:44] >> how do you build tools for humans how do

[30:45] you build tools where it's like I can

[30:47] use my what is it like system one

[30:48] thinking the thing that like looks at a

[30:50] wall that is white and like knows it's

[30:52] white without even having to like

[30:53] process it versus like the part of my

[30:55] brain if you ask me to multiply two

[30:57] three-digit numbers I like turn on and

[30:59] like focus and so how do you make as

[31:02] possible just like obvious

[31:06] analytical part of your brain until you

[31:07] you want to save that energy for the

[31:09] most important stuff. And if you can if

[31:10] you can make it easy to tell just by

[31:12] looking at something then like that's

[31:14] that's a great tool for humans.

[31:17] >> Yeah. And you can kind of see exactly

[31:18] what's happening here. Like the inputs

[31:20] the images are basically evolving over

[31:21] time and it's very easy to go grasp that

[31:24] without reading a single line of

[31:25] tracing. But effectively all of it needs

[31:27] to be powered by something that is

[31:28] extremely rich. So any question an agent

[31:31] asks, like you want the agent to ask

[31:33] like did I call send? Did I did I make

[31:35] an HTTP request? And you as a human

[31:37] don't want to think about this. You

[31:38] literally want the agent to be like,

[31:40] hey, search through all the function

[31:42] calls that I made in this call stack.

[31:43] Was any of them HTTP.end

[31:46] and how many times was http.send called?

[31:49] >> You're talking about feeding traces to

[31:51] an agent, not to a human. Basically like

[31:53] less the visual part, but more the like,

[31:55] okay, how do I give my agent the ability

[31:57] to like, cool, here's a thing someone

[31:58] complained about. go look through the

[32:00] traces and figure out what the problem

[32:01] is.

[32:02] >> Exactly. So, like if I'm a human and I'm

[32:05] looking at this, it's like this is

[32:06] useless. Let's be real here. Like this

[32:08] is like useless is such a strong word.

[32:12] Um

[32:15] I often find myself when I interact with

[32:17] Claude and I have a giant document in

[32:19] front of me, I'm like, "Claude, can you

[32:20] please give me the last three the three

[32:22] most important things I should read in

[32:23] this document?" I just let Claude do a

[32:25] lot of digestion for me. I think uh and

[32:27] really should I read the whole document?

[32:29] Yes. And for really important documents,

[32:30] I do read the whole document. But same

[32:33] with traces. It's impossible for me to

[32:35] expect that I'm gonna I'm as a human,

[32:36] I'm going to go debug this unless it's

[32:38] like critical to some major thing that's

[32:40] happening. Almost definitely what's

[32:42] actually going to happen is I'm going to

[32:43] ask Claude, "Hey Claude, can you tell me

[32:45] what's going on so I can go read this I

[32:48] can go read this and inspect this on my

[32:49] own."

[32:51] Uh, and like I want claw to like tell me

[32:53] what line I should jump to, for example,

[32:55] instead of reading it on my own. So when

[32:58] I think about I think this is like the

[33:00] big highlight that I wanted to go show

[33:01] everyone is like when you think about

[33:02] how to build tracing for your system,

[33:04] trace every little thing, you can store

[33:07] every little thing that you can get

[33:08] access to. And like obviously I'm very

[33:11] opinioned on this like we built the

[33:12] whole thing around tracing, but even in

[33:15] your own code like just do it. spend the

[33:17] cost, spend the thing because like your

[33:18] system is almost definitely going to

[33:20] have unexpected redness on here. And if

[33:22] you don't have these introspection

[33:24] points, you have zero chance of being

[33:26] able to debug the issue later. And we

[33:29] had this really clever idea. For

[33:30] example, storing values is very

[33:33] expensive. It slows down the program. It

[33:36] uh it does a whole bunch of stuff. If

[33:37] you wanted to copy these values and copy

[33:39] them somewhere, it's like

[33:41] >> you may be making a you may be making a

[33:44] network request to send the traces

[33:46] somewhere and if you have very high

[33:48] performance application then you're now

[33:51] using you know some of your network IO

[33:53] some of your CPU cycles just to record

[33:57] the other things that that might be

[33:59] slow.

[34:00] >> Yeah. Or saving to disk or anything like

[34:03] that. Yep. So like what you really want

[34:04] to do is by default you don't want to

[34:06] capture values at all and then unless

[34:08] something is like extremely dynamic. So

[34:10] in our case the compiler knows whenever

[34:12] you're interacting with a function it

[34:13] calls an LLM. Boom. As soon as you

[34:16] interact with an LM we store the input

[34:18] outputs.

[34:18] >> And of course we do a bunch of dduping.

[34:20] So if you pass the same image around we

[34:21] don't like copy and paste the image like

[34:23] 60 times.

[34:24] >> But this is kind of how you can get

[34:26] extremely fast performance without

[34:27] having to worry about performance

[34:29] effectively.

[34:30] And that makes a huge difference. in

[34:33] terms of like being able to like

[34:34] introspect a program without any extra

[34:36] work. We know fetch calls are like

[34:40] interacting with external systems. So

[34:42] fetch calls get recorded.

[34:44] >> We also know headers are really risky.

[34:46] So by default we don't save headers,

[34:48] >> right? Because they may be authentic

[34:50] stuff in there. Yeah,

[34:51] >> exactly. So we just like store them. We

[34:53] know environment variables are risky. So

[34:55] any environment variable value gets

[34:56] automatically omitted. And there's a lot

[34:58] of things like that that we just do by

[35:00] default to make it safe. And like if

[35:02] you're using Sentry or something else,

[35:03] they do the similar kinds of stuff. But

[35:05] most tracing systems, I think, are built

[35:07] for error handling. And most proactive

[35:09] telemetry systems are built very much

[35:11] like users have to opt into it. And I

[35:14] think that's really the fundamental flaw

[35:16] in most tracing systems, which is users

[35:18] have to go write something like

[35:20] for every single function, you got to

[35:22] like write this thing. And if you're

[35:23] writing LM's writing all your code, then

[35:25] like maybe an LM will write at trace

[35:27] here. But is it really also going to

[35:29] write trace there? probably not. And now

[35:32] you just have a missing tracing system.

[35:35] >> Yep. And you could even do the the the

[35:37] even the dumber if you just do at log,

[35:38] right? If you just want to log like time

[35:40] stamp and when the function was called

[35:41] and its arguments, right? Like you could

[35:43] write all of this stuff and you could

[35:45] build it. But doing this in a performant

[35:47] way, in a way that is like the same

[35:51] across every service you run is like

[35:53] there's entire platform teams. I

[35:55] remember when we got we kind of like

[35:56] went from pets to cattle at at at

[35:58] Sprout. It was kind of like okay instead

[36:00] of having a server and it runs these

[36:01] four things and this server over there

[36:02] runs those four things we need like a

[36:04] generic servicebased thing which always

[36:07] has the same metrics endpoints and

[36:09] health check endpoints and emits the

[36:11] same like standard set of things. I mean

[36:12] this was what the Google S book was all

[36:14] about was like hey look we're going to

[36:16] have a team and they're going to be on

[36:18] call to help you with your services and

[36:20] if things go down they'll fix them for

[36:22] you. It's was trying to solve the the

[36:24] the you know engineers ship something

[36:26] and then DevOps DevOps has to cis admins

[36:29] have to maintain it. It was like cool if

[36:32] you build a service you're on call for

[36:33] it. The engineers have to like own the

[36:35] reliability of their stuff but the S sur

[36:38] team has tools and if you meet a certain

[36:40] bar if you like inject all of the shared

[36:43] logging patterns and tracing patterns

[36:45] and you do all the things then S can

[36:47] take that service over and run it for

[36:49] you. Um, and doing this at scale in a

[36:52] way is like there's entire there's

[36:54] entire giant teams inside any large tech

[36:57] company that's all their job is to like

[36:59] how do we equip people with tooling to

[37:01] help them make their stuff more

[37:02] observable and how do we make it so that

[37:04] we can actually help even if we don't

[37:06] really know if we haven't read all the

[37:08] code inside the service.

[37:11] >> Yeah. And you kind of want to be able to

[37:13] write stuff like this.

[37:20] User images.generate image where

[37:26] uh orgs thing.length

[37:30] is greater than 50 and latency metrics

[37:38] >> one. Yeah. uh you kind of when you

[37:41] really think about what you want out of

[37:42] tracing, I think this is the feature of

[37:44] what we really want. We want to be able

[37:45] to write questions like find me

[37:47] everything where it took more than one

[37:48] second where the length or like what I

[37:50] really

[37:51] >> thing here is the prompt, right? It's

[37:53] like the thing you asked to generate,

[37:54] right?

[37:55] >> Yeah. Well, thing is like yeah, I guess

[37:57] this is the input argument to this

[37:58] function specifically.

[37:59] >> Yeah, it's a it's a really good variable

[38:02] name, dude. I really like it.

[38:04] >> I am uh I am known for my high quality

[38:06] code. [laughter]

[38:07] Uh but args is just like this is just

[38:10] the name of the parameter in this

[38:11] function. But what you really want over

[38:13] here is you want to be able to write

[38:14] this kind of query and you want all of

[38:15] this to be type safe. You want to be

[38:17] able to say like output is always going

[38:18] to be an image. So it has B 64 and you

[38:20] want the SQL query to tell you that. You

[38:22] want to know args has a thing called

[38:23] thing has a parameter called thing and

[38:25] thing is a string type because if you

[38:28] can do this

[38:28] >> you want type safety on your on your

[38:30] queries as well. You want to be able to

[38:32] kind of like have a schema to query

[38:34] against where any anybody can kind of

[38:35] quickly riff this out or an agent can

[38:37] quickly riff this out and basically like

[38:39] very instead of doing like GP or reading

[38:41] whole files, you want to be able to

[38:42] really just pull out the things you care

[38:43] about.

[38:45] >> Yeah. And you want this to look

[38:46] effectively as similar to your um

[38:51] as similar to your code as possible. So

[38:54] like I have generate image. You want

[38:56] this to basically mimic exactly what

[38:58] this code is. and you want it to look

[39:00] very close to your code because then if

[39:01] an agent can query the codebase out of

[39:03] it, then what you end up with is a way

[39:05] where like telemetry actually like means

[39:07] something very reasonable and then this

[39:10] tight loop of when you're probing this

[39:12] actually means that hey this we can find

[39:14] all the red instances in the first thing

[39:16] because generate image failed here so

[39:19] now we know obviously everything

[39:20] downstream is obviously going to fail as

[39:22] well and I think that's the kind of

[39:24] tight loop that you need with

[39:25] observability and when I talk about

[39:26] observability that's what I think people

[39:28] should be building for their systems.

[39:29] They should trace everything. They

[39:31] should go ahead and make sure their

[39:32] tracing is tied very closely to lines of

[39:34] code. And now you can start measuring

[39:37] everything, starting to collect stuff.

[39:39] Now, I'm going to show one last thing.

[39:41] You know about hotel. Everyone knows

[39:42] about hotel.

[39:44] >> I'm going to show you hotel.

[39:46] >> Um, and I and like if you've ever seen

[39:49] hotel, are we getting the hotel rant?

[39:51] I've gotten a piece of this. I'm ready

[39:52] for the the formalized version of it.

[39:54] >> I'll show that. Yeah, I'll show it to

[39:55] you. So when you do hotel firstly hotel

[39:58] does something amazing which is it has

[39:59] wide events thank god that's amazing

[40:03] the problem with hotel however is that

[40:05] when you do wide events and you start

[40:08] doing tracing you start collecting all

[40:09] this data hotel is not very

[40:14] how do I put this rich is a nice way to

[40:17] put this

[40:18] >> like the the density of information is

[40:21] low right you're using a lot of JSON

[40:23] using a lot of keys and and like okay

[40:25] yeah you have the start And you're

[40:26] hoping that the person And you're hoping

[40:28] that the person that wrote something

[40:29] wrote it in a very standardized way.

[40:31] >> Yeah. It feels like hotel is is just

[40:33] like a bunch of opinions on top of wide

[40:35] events, right? It's like, okay, cool.

[40:37] Like yes, you're going to have arbitrary

[40:39] things that you can attach to this like

[40:40] attributes or properties, but also like

[40:42] >> if you include these exact fields like

[40:45] span and parent span and trace ID and

[40:47] stuff, then you can get these like

[40:48] specific specific visualizations.

[40:51] >> Yeah, exactly. I know has really good

[40:53] support for spans. But the real thing is

[40:55] when you think about what types accepts,

[40:58] this is what OTEL accepts.

[41:00] String, boolean, int, float, sequence of

[41:03] stir, sequence of bool, sequence of int,

[41:06] sequence of float. And the fact of the

[41:08] matter is because this is the type of

[41:10] things that accepts, what people end up

[41:12] doing most of the time is they do

[41:15] >> put like B 64 JSON in there.

[41:18] Literally what they do JSON I don't know

[41:21] is it loads or like parse or two string

[41:25] >> two string

[41:25] >> don't pretend like you haven't written

[41:27] Python in a while I know you know the

[41:28] python it it's dumps

[41:30] >> you don't know what it is

[41:32] >> oh there you go dumps uh JSONd dumps for

[41:35] value and now you get you basically just

[41:37] store the JSON value as a string and

[41:38] then you decode it on the receiving end

[41:40] and hope that it's correct JSON

[41:41] >> which means you can't query it

[41:42] >> and what does

[41:44] >> exactly which means no querying which

[41:46] means that also So, um, think about how

[41:49] much data you're sending across the

[41:50] wire. So, we talked about performance

[41:52] and like normally I hate talking about

[41:54] performance

[41:56] because, uh, performance is one of the

[42:00] performance is not a thing that most

[42:02] people should ever care about. But when

[42:04] you're doing a massive amount of

[42:05] observability and you want to literally

[42:07] observe every single thing that you're

[42:08] passing through the wire, if you're

[42:11] sending like let's say you're sending

[42:13] like a like a 100 bytes of actual data,

[42:17] but then you JSON you turn it to a JSON

[42:19] string and this blows up to about like

[42:22] uh times 8 like 800 bytes.

[42:26] This is strictly going to affect your

[42:28] uptime. It's strictly going to affect

[42:30] your performance rate of every single

[42:31] piece of software. So when you blow

[42:34] something up by 8x in terms of the

[42:35] amount of data you're sending across the

[42:37] wire, you suddenly stop being able to

[42:38] trace everything and now you're making

[42:39] trade-offs of [ __ ] do Iel this one or

[42:42] do Iel something else and it's always a

[42:44] zero sum game and what you choose to

[42:46] tell and what you choose to go around

[42:48] this. So when you actually think about

[42:49] how you want to do high performance

[42:51] telemetry there, like you said, there

[42:52] are entire companies that do this. And

[42:54] if you look, there's like uh if you guys

[42:56] haven't seen this, EVPF is like one way

[42:58] to do this

[43:00] or like uh I don't know if it's on here

[43:02] where basically like tracks the system

[43:04] traces to know exactly what call stacks

[43:05] you're using and where you're spending

[43:07] time without your process being

[43:08] hammered. This lets you monitor

[43:10] basically without without doing SIS

[43:12] calls like it lets you it lets you

[43:14] understand what's happening in the

[43:15] kernel stack without actually like

[43:17] leaving user land.

[43:19] >> Exactly. So it makes your code faster

[43:21] because you do and the reason people are

[43:23] trying to solve these problems from many

[43:24] different angles is because in a world

[43:26] of LMS where a agents write all the code

[43:29] and everything is non-deterministic

[43:30] tracing is the only way to understand

[43:32] all the data. The problem is you also

[43:34] want tracing to have a really good

[43:36] understanding of your shape of data.

[43:38] like you want to understand and be able

[43:40] to write this kind of query. And you

[43:41] can't do that unless you actually like

[43:42] embed tracing into your app. So like my

[43:45] whole pitch today is like go write a

[43:46] [ __ ] ton of traces like in your codebase

[43:49] and just vibe code the head out of it

[43:50] and make it really easy for agents to go

[43:52] query everything here. So if agents

[43:55] can't query everything here every time

[43:56] you get a re user bug, you can build a

[43:58] really nice feedback loop to like ship

[44:00] your updates much faster. That was the

[44:02] whole point of today's conversation on

[44:03] tracing observability. Uh please go do

[44:06] it. Uh, and likely I suspect you should

[44:09] probably not do it yourself. It's a

[44:10] waste of time. Buy some vendor that

[44:12] gives you tracing and just like plug it

[44:13] in and make sure they're performant and

[44:15] make sure they capture extremely rich

[44:16] data and make sure they give you agent

[44:18] uh integration on it.

[44:21] >> I like it.

[44:22] >> Um, I'll do one more thing. Uh, if uh

[44:27] we're doing we're doing like small

[44:28] onboarding sessions. I know Dexter came

[44:30] to one of them. Uh, if you guys sign up

[44:32] here, we can get you hooked up and uh

[44:35] try it out. if you actually want to try

[44:36] like the new tracing stuff that we do.

[44:38] Uh we do it like roughly every Thursday.

[44:42] But um we we're exploring the space a

[44:45] lot. Tracing is like one of the things

[44:46] I'm deeply deeply passionate about right

[44:48] now. Uh because I want to make it fast

[44:49] and I want to make it low memory and I

[44:51] want to make it rich

[44:52] >> and I want to have no tradeoffs.

[44:53] >> And this comes back to that whole idea

[44:56] of like what a lot of people are hacking

[44:58] together. I think I saw something

[45:00] probably last week of like here's how I

[45:03] review code. And what I do is I let the

[45:05] agent just vibe it out and riff it out.

[45:08] And then I have it create an HTML file

[45:10] per folder that explains the changes in

[45:12] that folder at a high level in a way

[45:14] that I can kind of it's like zooming out

[45:16] of the code and g give me a way to

[45:18] digest 2,000 lines of code in a minute.

[45:21] And then if I want to drill in, I can,

[45:23] but I want to get like the shape of

[45:24] everything. And then they give feedback

[45:26] on each report for each module or each

[45:28] file and they proceed that way. And then

[45:30] eventually they might dig into the code

[45:32] and stuff. Um, and it seems like you're

[45:34] kind of just trying to productize this

[45:36] of like, hey, look, before you like you

[45:39] will probably still end up reading code

[45:40] sometimes in important places, but

[45:42] before you go dig into the lines, how

[45:45] can you be 10x or 100x more efficient

[45:48] with your time and your mental energy to

[45:51] get understanding of what is happening?

[45:54] And I think that's where like

[45:56] dynamically visualizing the code at the

[45:58] programming language level is a really

[46:00] like powerful idea for like okay how do

[46:03] we understand what's happening uh as

[46:05] quickly as possible and maintain the

[46:07] ability to go drill down into the code

[46:09] but also have this option to um just

[46:12] kind of like cool I don't need to read

[46:13] that I trust that that that's as as as

[46:15] designed as expected and it's provable

[46:17] it's not an LLM read something and then

[46:20] decided and might have hallucinated or

[46:21] might have misunderstood it's

[46:23] deterministic based on the syntax that

[46:25] was written.

[46:26] >> Yeah. And like Dylan actually had this

[46:27] great tweet.

[46:28] >> I love this. This is in my presentation.

[46:30] >> Yeah. Exactly. Yeah. Yeah. Exactly. Uh

[46:31] Dylan had this great tweet where he's

[46:33] like the way he codes now he's just he

[46:34] does basically like show me the call

[46:36] stack.

[46:37] >> And this is basically just hoping that

[46:38] cloud code gives you this. And he's

[46:40] basically building a tracing system in

[46:42] some ways.

[46:43] >> Well, this is part of planning, right?

[46:45] This is before the code is written. He's

[46:46] like, cool. like okay whatever we're

[46:48] going to go build I don't need to see

[46:49] every line of code but I need to

[46:51] understand the type signatures and the

[46:54] the objects that we're making and how

[46:56] all these things fits together because

[46:57] there's still I mean a lot of people are

[46:59] happy to look at a mermaid diagram and

[47:01] say like cool this looks good and look

[47:03] at sequence diagrams say this looks good

[47:04] but what we're finding and I think a lot

[47:07] of people are finding is that LMS are

[47:08] actually like even with system

[47:10] architecture defined and aligned and you

[47:13] and the you and the model have made a

[47:14] plan for this you can still end up with

[47:17] really bad code, sloppy code, bad

[47:19] interfaces, like objects that overlap

[47:22] each other, all these things that make

[47:23] your software harder to maintain in the

[47:24] long term and make it get you to the

[47:26] point where it's like, oh, if I change

[47:27] something over here, it breaks something

[47:28] over there and you just get like slowed

[47:30] down and kneecapped by the like

[47:33] deterioration in code quality. So like

[47:35] this is a layer that we're working a

[47:36] lot. Also in human layer, we have this a

[47:38] concept called like a technical design

[47:39] doc. I think we did an episode about

[47:41] this a couple weeks ago of like, no, you

[47:43] should get into that level of basically

[47:45] anything that you can't trust the LLM to

[47:47] get right 99% of the time. It is worth

[47:49] your time to align at this level of

[47:51] abstraction because 5 minutes or 10

[47:54] minutes doing this can save you hours.

[47:57] when you get to code review and you're

[47:58] like, "Oh, yes, it's it's correct and it

[48:00] works and I went to the website and it's

[48:02] good." But I know as someone who's like

[48:04] worked in large code bases for 10 years,

[48:06] okay, this is actually like not going to

[48:08] set us up for success in even the medium

[48:10] term, not even long term, like in in

[48:12] four weeks, you're probably going to

[48:13] start to regret that you merged that.

[48:15] And so it's like, cool, where can we

[48:17] find leverage? Where can we kind of like

[48:20] make it so that instead of reading code

[48:21] for an hour, I can read a doc for five

[48:23] minutes

[48:25] >> or see a visualization?

[48:27] What's really interesting about this is

[48:29] it's basically just like a spectrum,

[48:30] right? Like you start from

[48:33] you effectively start from like a

[48:35] different place depending on what you're

[48:36] trying to build

[48:39] and like at some point what you do is

[48:42] you you have tracing during planning

[48:45] then you have tracing what the heck

[48:47] happened then you have tracing like

[48:48] during ad during like code effectively

[48:50] like while the code is while the code is

[48:52] like written.

[48:53] >> Yep. Um so you have tracing during

[48:56] planning or design phase. Then you have

[48:59] tracing during the code and then you

[49:01] kind of have the last layer which is

[49:02] like you kind of want tracing uh where'd

[49:05] he go

[49:08] pipeline.

[49:11] You kind of want tracing like during

[49:12] execution is the way I draw this out.

[49:15] >> Yep.

[49:17] >> And it's kind of like we're all

[49:18] basically talking about the same thing.

[49:21] You basically have this like spectrum of

[49:23] tracing that we're trying to build.

[49:24] >> Oh, sorry. I only see your Slack.

[49:27] >> Oh, you don't see my Slack. Sorry.

[49:30] Pull this up. Window. Entire screen.

[49:33] There we go.

[49:39] >> Yep. Okay.

[49:42] >> It's like

[49:43] >> this is kind of like the spectrum of

[49:44] what we're doing. And the reason that

[49:46] we're all doing this is really simply

[49:48] because these systems are

[49:50] non-deterministic. And the only way to

[49:54] build like extremely rich systems is

[49:56] literally to go ahead and build

[49:58] different levels of introspection as you

[50:00] go do this. Y

[50:01] >> you need tracing design.

[50:02] >> Yeah. You can't yolo it. You can't you

[50:04] can't just write it without being able

[50:06] to see it because like we are I mean

[50:08] it's almost like a learning thing like

[50:09] we're all learning what the frontier

[50:11] here looks like and part of that it's

[50:13] the same thing we do vibe valves, right?

[50:14] It's just like just go run the thing and

[50:16] see what it's like cuz you need to

[50:17] develop intuition.

[50:19] >> Yeah. And this is still vibe. Like

[50:21] there's no way Dylan knows every line of

[50:23] code that's happening in these boxes.

[50:24] >> Yeah.

[50:25] >> There's probably more functions than

[50:26] these boxes. He's just at a high level

[50:29] making sure the key parts are correct.

[50:31] >> We should have Dylan on and do a do an

[50:33] episode and he can talk about this and

[50:35] >> Oh, I'd actually be really curious about

[50:36] this. Yeah.

[50:37] >> Yeah.

[50:38] >> I mean, he has his own podcast about how

[50:40] to do good engineering now. So, uh, you

[50:42] know, I will I I will work on him.

[50:45] [laughter]

[50:46] >> Yeah. We did one podcast with Reese

[50:47] Sullivan and suddenly he goes and is

[50:49] like, "Oh, we're going to do one too

[50:51] now." It's great. It's a good show. You

[50:52] should go watch it. The first two

[50:53] episodes are out there. They're a lot of

[50:54] fun.

[50:55] >> I actually really enjoy watching their

[50:56] show. It's It's also a different thing.

[50:58] Uh, it's Dylan. You can look him up on

[51:00] Twitter. Here you go.

[51:01] >> Yeah, he's a cl he's like a principal

[51:03] engineer at Cloudflare. Super smart

[51:04] dude.

[51:04] >> Yeah, he's Yeah, I really like their

[51:07] content. Uh but like effectively like

[51:10] this whole episode is about

[51:11] observability. Everyone is giving you

[51:13] different levels of observability. Your

[51:15] job as an engineer is to go figure out

[51:17] what works for you and figure out how

[51:19] you can add different layers. So you can

[51:21] go from tracing during design, tracing

[51:23] during visualizing the code and

[51:25] understand your code so you don't have

[51:26] to read every line of code and tracing

[51:27] post execution. So your agents can

[51:30] understand what actually happened and

[51:32] does does all of this eventually loop

[51:34] back? I don't know how to do the arrows,

[51:35] Dexter.

[51:36] >> Five five Click back

[51:39] >> five.

[51:40] >> Click.

[51:40] >> Click.

[51:41] >> Click.

[51:42] >> Oh my god. I'll do it.

[51:44] >> Can you do it for me? Thank you.

[51:46] [laughter] So So like cuz then what you

[51:47] can do is you can feed back an agent

[51:49] into this loop. Uh you can't do it

[51:51] either. Got them.

[51:52] >> No excuse.

[51:53] >> What you can do if you build this

[51:54] tracing system.

[51:56] >> There we go. What you can do if you

[51:58] build a really nice tracing system is

[51:59] you can go back and feed these logs in

[52:01] and say, "Hey Claude, what's missing in

[52:03] the design that made the actual trace

[52:05] not be the call site you tried to draw

[52:07] me?" And now Claude can actually close

[52:10] the loop and you can build a better and

[52:12] better system that and again it's all

[52:14] about alignment. So you can have

[52:16] alignment and what you expected versus

[52:18] what happened.

[52:20] >> It's good. I like it. That's a good

[52:22] episode.
---
type: youtube
title: "You need to read less code (hear me out)"
channel: "Theo - t3.gg"
url: "https://www.youtube.com/watch?v=434cG4g5KLE"
date_saved: "2026-07-22T23:55:36.567Z"
---

# You need to read less code (hear me out)

[0:00] Every once in a while when I decide I

[0:01] want to film a video, I realize that

[0:03] there's almost no benefit to me because

[0:05] the video is going to frustrate both

[0:07] sides of the argument. This is

[0:09] definitely one of those cases because I

[0:11] want to talk about how much of your code

[0:12] you should be reading. I'm so scared to

[0:15] say this next part that I'm just going

[0:16] to put it on the screen instead. I think

[0:18] this is the case for the vast vast

[0:20] majority of engineers. Whether you're

[0:22] building slop side projects or you're

[0:24] building really important infrastructure

[0:26] that powers the world or medical devices

[0:28] that keep people alive, I think that the

[0:30] percentage of code you're reading is

[0:32] probably too high. It could also be too

[0:35] low, but for the most part, I think a

[0:37] lot of people, especially those who

[0:38] think their code is so so important, are

[0:41] reading way too much. But there's

[0:43] another side here that I think's even

[0:45] more important. You're not generating

[0:46] enough code yet. In many ways, that's

[0:49] actually the more important piece and I

[0:51] think you'll understand after we talk

[0:53] about this for a bit. This video concept

[0:55] came from a tweet I made a few days ago.

[0:57] How much better do the models have to

[0:59] get before you'll stop reading the code?

[1:01] And the answer to this should not be as

[1:02] direct as many people seem to think.

[1:05] This is going to be quite a video and if

[1:06] I do it right, you should be able to

[1:07] come out of it with a better idea of how

[1:09] to get as much value as possible out of

[1:11] AI-generated code. But first, a quick

[1:13] break for today's sponsor. Setting up

[1:15] off for your users is pretty easy as

[1:17] long as your users aren't agents or

[1:18] enterprises. Then it gets hairy fast.

[1:20] Thankfully, we have WorkOS to smooth out

[1:22] those rough edges. They really

[1:23] understand what enterprises need for

[1:25] off, but that doesn't mean they're

[1:26] compromising on the developer

[1:27] experience. They still have all of the

[1:28] things you would expect from a modern

[1:30] off service through off kit, their

[1:31] package system for getting the UI and

[1:33] connections necessary to set up off

[1:35] across every different framework you

[1:37] would possibly want to use. Your agents

[1:38] will be able to figure it out just fine.

[1:39] Their enterprise offerings are where

[1:40] they've historically shined because they

[1:42] have everything a business needs up for

[1:44] your service and businesses have a lot

[1:45] of very specific needs, including the

[1:47] admin portal which makes it trivial for

[1:49] you to send a link to the IT team at the

[1:50] company you're trying to get to sign up

[1:52] for your service so they can onboard

[1:53] themselves. If you want a company's

[1:55] agents to be able to register for your

[1:56] service, The new standard Auth MD, which

[1:58] has been pioneered by WorkOS, is

[2:00] probably your best bet. It's the first

[2:01] standard I've seen that actually makes

[2:03] sense for agents and will make it

[2:04] possible for your users to sign up

[2:06] without actually having to do it

[2:07] themselves. This is why companies like

[2:08] Cloudflare, Firecall, Resend, Monday,

[2:10] and more have already adopted this new

[2:12] standard. Get your app ready for users,

[2:14] agents, and businesses at

[2:15] swade.link/workos.

[2:17] Now that my first statement has

[2:18] absolutely destroyed the comment

[2:19] section, let's start talking about

[2:21] what's actually up here. Going to start

[2:22] with my favorite aspect This is meant to

[2:25] be the importance of code spectrum.

[2:29] And on one side here we have like slop

[2:32] website with one viewer. And on the

[2:35] other side we have, I don't know, I'll

[2:38] say firmware for pacemaker. How about

[2:39] that? No one can argue that the firmware

[2:41] on your pacemaker, the thing that keeps

[2:42] your heart beating, isn't really

[2:44] important and that a mistake on that

[2:46] would be really bad because it would

[2:47] literally kill people. All software kind

[2:50] of fits somewhere on this spectrum and I

[2:52] don't want to pretend otherwise. I feel

[2:55] like the narrative around AI code and

[2:57] whether or not you should read it and

[2:58] verify and all of this is kind of

[3:00] plagued by this spectrum and people

[3:02] thinking it matters more than it does

[3:04] because everybody is somewhere on here

[3:06] and if you want to be real, the code I

[3:07] write is not particularly far down it.

[3:09] Like I likely am in this range depending

[3:12] on how you want to define it, if it's

[3:13] exponential or not, whatever. I don't

[3:14] care. I will gladly say Theo's code is

[3:17] nowhere near as important as the

[3:19] firmware on a pacemaker. What I've

[3:21] noticed is that a lot of people seem to

[3:22] think they're further along the line

[3:24] than they are but more importantly, they

[3:26] think really, really negatively about

[3:29] everything below them on this line. So

[3:31] whenever somebody makes a statement

[3:33] about AI generated code, the developer

[3:36] who hears it will think about where they

[3:38] are on the spectrum and if they like the

[3:39] statement, they'll assume that the

[3:41] person who's talking is where they are

[3:42] or better. And if they don't like the

[3:44] statement, they'll assume the person is

[3:45] where they are or below, probably below.

[3:47] This makes the conversation here nearly

[3:50] impossible because everybody is thinking

[3:53] too highly of themselves and more

[3:54] importantly thinks that the code they

[3:56] write matters way more than it does. I

[3:59] could sit here and argue all day with

[4:00] the people who are arguing against me

[4:02] because they think their code is so

[4:03] important. And what would I know? I

[4:04] generate wrappers for LLMs. Doesn't

[4:06] matter that I built video infrastructure

[4:08] for years before that. But that aside, I

[4:10] don't want to have these arguments. I'm

[4:12] going to do a thing that I don't need to

[4:13] do. I'm going to presume the important

[4:17] code people are correct. I don't have to

[4:21] do this. I think these people are

[4:22] [ __ ] full of themselves and most of

[4:23] them are stupid, but I don't want to

[4:26] argue that because that's not the point

[4:28] I want to make. We are presuming the

[4:30] people who are saying every line of code

[4:32] is important are being real. So let's

[4:35] dig into that statement. Every line of

[4:37] code is important in my work. We'll

[4:40] assume this is true. Every line of code

[4:42] that is being written, being put into a

[4:44] PR, being committed, being compiled,

[4:46] being shipped is so important that

[4:48] people could literally die if you get it

[4:50] wrong. I'll even go that far.

[4:52] If one line is wrong, people could die.

[4:55] In this case, I agree. If this is the

[4:58] case for the projects you're working on,

[5:00] you absolutely should be reading every

[5:02] line of code that gets shipped. But

[5:04] here's the other harsh reality I want

[5:06] you to consider. Code is useful for

[5:08] things other than shipping. If your code

[5:11] is so important that you need to be sure

[5:14] every single line is correct, maybe you

[5:17] could use more code that is less

[5:19] important to verify the important code.

[5:21] There is no person alive where 100% of

[5:24] the code they write is mission critical

[5:26] because if it is, they're not good at

[5:28] their job because you need to work on

[5:30] other things to

[5:32] hone your skills, to keep learning, to

[5:35] keep growing. But also, you can write

[5:37] code that is a little less important to

[5:39] verify the code that is so important.

[5:42] Let's talk about how things used to be.

[5:45] I'm just going to make up numbers for

[5:46] this, but the percentages are going to

[5:48] line up with what my experience was like

[5:50] in the past. Let's say in a given day

[5:52] back when I worked at Twitch, I would

[5:54] read, I don't know, let's say a thousand

[5:56] lines of code a day. This is a thousand

[5:58] lines of code I would read. Let's say I

[6:00] would write, I don't know, let's say I

[6:02] would write 200 or so. So I would write

[6:05] 200 lines of code and then through

[6:06] reading that, referencing other code,

[6:08] doing code reviews and everything else,

[6:11] I would read a thousand lines and I

[6:13] would write 200. This made a lot of

[6:15] sense in the world, but writing code was

[6:16] expensive and all the code we merged was

[6:18] important. So we had to take the time to

[6:22] read a ton of code others were writing

[6:24] cuz every time somebody wrote a line of

[6:25] code in hopes of getting it into prod,

[6:27] at least two people should read it

[6:28] before we give it a thumbs up and merge

[6:30] it or everything's going to slowly fall

[6:31] apart. This has changed. Whether or not

[6:34] we want to admit it, this has changed.

[6:37] If it hasn't changed for you yet, you

[6:39] are not very good at your job right now.

[6:42] Period. Hear me out. Let's add one more

[6:45] metric here. We'll say that I read a

[6:46] thousand lines, I wrote 200, and let's

[6:50] say out of that 200, only 100 of them

[6:53] were good enough to merge. This ratio of

[6:56] two to one for my written code is not

[6:58] too bad. 200 lines written for every 100

[7:01] worth merging, acceptable-ish.

[7:04] Let's presume you are similar to me and

[7:06] you're working on projects that are

[7:08] somewhat important, but like if they

[7:09] break, you can just revert and it's

[7:11] fine. This has changed a lot in that

[7:13] case. Nowadays, I find myself reading

[7:17] maybe roughly the same amount of code,

[7:19] but I have to move this to the side now

[7:22] because it's more complex. I might read

[7:24] a thousand lines of code a day, but

[7:27] I'm generating 2000 plus. So I might be

[7:31] reading a good bit, but I'm generating

[7:33] way more. And what I merge has

[7:35] increased. It's increased a meaningful

[7:37] amount. We'll say it's 500 lines of code

[7:40] being merged a day. We're kind of in

[7:42] danger because there's a lot of code

[7:43] here that is being generated

[7:47] that is not being read, and that's

[7:49] scary.

[7:50] Except for the fact that most of this

[7:51] code that is being generated is not

[7:54] being put up for code review. It's not

[7:56] being merged. It's not being used for

[7:58] much of anything other than testing

[7:59] ideas. This did not used to make sense

[8:02] because back in my day when I learned

[8:04] how to code by hand, every line of code

[8:06] took time. So, writing a shitload of

[8:08] code to do one quick thing never made

[8:10] sense. If you wanted to get an answer to

[8:13] a question about your users,

[8:15] you might have to write 100 lines of

[8:17] code that you would stuff into the

[8:18] product to do new analytics. And then

[8:20] you have to write another 20 or 30 lines

[8:22] of SQL in order to get the answer later

[8:24] on.

[8:25] That was

[8:26] obnoxious, but if the question was

[8:28] important enough, you could do it. The

[8:30] reality is that code is way cheaper now.

[8:32] You should be generating more code than

[8:34] you were before because code is so

[8:37] goddamn cheap. And now we get into the

[8:40] stupid pushback that a lot of people

[8:42] have. If you're able to slop this amount

[8:44] of code, your product isn't that

[8:45] important, and that's okay. I'm sorry,

[8:48] layer. You are incredibly wrong here.

[8:50] Nev asked, "I write code for a financial

[8:52] ERP system. Mistakes in this code could

[8:54] be converted to huge losses for my

[8:56] companies who use this ERP system. Is my

[8:59] code important?" Probably, but you

[9:01] should be writing way more code.

[9:04] Hear me out. If your code is so goddamn

[9:07] important that every single line needs

[9:10] to be verified because it could bankrupt

[9:12] businesses, it could get people killed,

[9:14] it could stop people's hearts, it could

[9:16] drive cars into walls, if your code is

[9:19] that important, you should be writing an

[9:21] unbelievable amount of slop. Not to put

[9:24] in your product, but to verify your

[9:26] product. Every line of code that goes in

[9:29] should have 100 lines of slop verifying

[9:31] it. Every line that goes in should have

[9:34] 10,000 lines of code of slop that you

[9:36] can use to verify the system. You should

[9:38] be building custom debuggers. You should

[9:40] be building custom runtimes that you can

[9:42] run your stuff in to verify them. You

[9:44] should be building the tools to

[9:46] guarantee the thing you care so much

[9:47] about keeps working. You cannot convince

[9:51] me that your code is so important that

[9:54] AI can't touch it, but it's not

[9:56] important enough to build verification

[9:58] systems. Oh, but our verification

[10:00] systems are so important. Those need to

[10:01] have every line of code checked, too.

[10:03] Okay, abstract one layer higher then. If

[10:06] the core of your code is too important

[10:07] for AI to touch and the layer around it

[10:10] is too important for AI to touch, then

[10:12] build one more on top of that. Build

[10:14] tools that introspect all of the runs

[10:17] that all of your testing tools are

[10:18] using. If you don't have a custom

[10:20] debugger for your software yet, you're

[10:22] not slopping hard enough. If you don't

[10:24] have custom logging systems tracking all

[10:26] the things that matter on top of the

[10:27] vetted ones you already wrote by hand,

[10:29] you're not slopping hard enough. If your

[10:32] code is so goddamn important that you

[10:34] talk [ __ ] on people for only reading 10

[10:36] to 20% of the code they generate in a

[10:38] given day, you're not doing your job

[10:40] well.

[10:41] Period.

[10:42] And I know this because I know a lot of

[10:44] the people working on these types of

[10:45] systems. Imagine how many lives will be

[10:47] ruined by doing this. Please elaborate,

[10:49] Kotek. I'm listening.

[10:51] How does building sloppy debugging tools

[10:54] to use on top of the existing processes

[10:56] you already have

[10:58] hurt anyone? Please explain. Shoutout

[11:00] says 80% of the code he generates goes

[11:02] into test harnesses and guardrails and

[11:04] the LM has access to the results of the

[11:05] harnesses, which results in way less

[11:07] mistakes. That's a great way to do it.

[11:09] And if you write your code by hand or

[11:10] you review that code by hand, even if

[11:12] you review the test by hand, awesome.

[11:14] I'm cool with all of that. My argument

[11:15] isn't that you shouldn't read all the

[11:17] code you write. Let's Let's flip this a

[11:19] bit to be a little clearer about what I

[11:20] mean here. Let's say you're one of the

[11:21] people who writes this really important

[11:23] code and we'll say that you write,

[11:25] review, and verify 100 LLC a day. This

[11:27] code is super, super important and this

[11:30] is all you wrote. You wrote the 100

[11:31] lines, you verified the 100 lines, these

[11:33] 100 lines can get people killed, they're

[11:34] really, really important. So, you didn't

[11:36] write any additional code, you didn't

[11:37] read or review any additional code. This

[11:39] was your whole day. I am not saying that

[11:41] you should reduce the number of lines of

[11:43] code you read. If you write 100 lines of

[11:45] code and you also read, let's say you

[11:47] read a bit more. Let's say previously

[11:49] you would write 100 lines and you would

[11:50] read 200 lines. 100 lines of code

[11:53] written and verified and 200 lines of

[11:56] code were read. If this is the case for

[11:59] you, this should not change. What I

[12:01] would say is today you should still

[12:05] write and hand verify 100 lines of code.

[12:07] Like, don't change that. This is code is

[12:09] really important. Keep doing that. Maybe

[12:11] it even goes down a little bit. Maybe

[12:13] you only have time in the day to do 80

[12:15] lines of code written and verified now.

[12:17] It's unfortunate, but I know that's the

[12:18] case for a lot of people. Let's say

[12:19] you're Sadly, you can only write 80% of

[12:21] the code you wrote before, but now

[12:24] you review 400 lines of code instead,

[12:27] but you generate and this is the

[12:28] difference. This is the thing I really

[12:30] need you guys to understand.

[12:31] You now generate

[12:33] 800 lines of code. And this 800 lines of

[12:36] code is absolute [ __ ] slop and you

[12:39] don't touch this in your actual product.

[12:42] This 800 lines of code sits in another

[12:44] repo or at the very least some other

[12:46] [ __ ] up directory in your important

[12:48] repos. And all it does is explores. It

[12:51] verifies assumptions. It tests those 80

[12:55] lines before in all of the crazy ways

[12:57] that were never worth it before because

[12:59] writing a thousand lines of code to make

[13:01] sure one line of code works how it's

[13:02] expected to never made sense before. I

[13:05] am not telling people that they need to

[13:07] change how they verify the code that

[13:09] goes into prod. I'm not saying you need

[13:12] to merge slop into your projects. I am

[13:14] saying that if you are of the belief

[13:16] that your code is so god damn important

[13:19] that every line needs to be read or

[13:20] people will die, then you're not writing

[13:22] enough code yet. You're just not

[13:23] generating enough. That's all I am

[13:26] saying. If you put a little time into

[13:28] realizing that code is useful for things

[13:30] other than merging, it's useful for

[13:32] things other than updating your product,

[13:34] code can do so much [ __ ] I have like

[13:36] 10,000 lines of JavaScript I wrote on my

[13:39] Windows computer just for organizing

[13:41] files. That never made sense before.

[13:44] Writing 10,000 lines of code for a

[13:46] couple bespoke asset movements. Like I

[13:48] think I maybe moved like 100 assets with

[13:50] it. 10,000 lines of code to organize 100

[13:52] files is mental illness until the code

[13:55] is free to generate. Then all of a

[13:56] sudden it's totally reasonable. And this

[13:58] is the thing people haven't internalized

[14:00] yet. They are correct that AI code is

[14:02] cheap. They are correct that AI code is

[14:05] bad. They are correct that AI code could

[14:07] get people killed if it's not verified

[14:08] properly. They are incorrect that code

[14:11] is expensive still. And if you can't

[14:14] find ways to use this cheap infinite

[14:16] code generating system to verify your

[14:19] existing systems, you are not a very

[14:22] creative engineer. The fact that code

[14:24] can be generated on a whim for any

[14:26] theory, for any question, for any

[14:29] problem you want to verify, for any step

[14:31] you want to debug, for anything, is a

[14:33] magical thing. And it absolutely sucks

[14:36] that we don't get to experience this as

[14:39] end users because most people are

[14:41] letting AI code just generate slop and

[14:44] they're too lazy to check it. And I

[14:45] agree that's a problem. And I am with

[14:47] you that should be stopped. Important

[14:49] systems need more care and craft with

[14:53] the code going into them. But now we

[14:55] have a tool we can use to verify it

[14:57] harder, to check it more. I never used

[15:00] to write custom lint rules. I wrote

[15:01] maybe one or two in my life. Now I

[15:03] generate custom lint rules all the time.

[15:06] I didn't used to make custom debug

[15:08] tools. I would rely on the ones that

[15:09] existed in the browser. Now I will build

[15:11] my own one-off debuggers and systems and

[15:13] compiler hooks that add a bunch of stuff

[15:15] into my react code to try and see how it

[15:17] performs better. When I was testing how

[15:20] much load my systems could handle, I

[15:21] would have to hit up friends and like

[15:23] put together these complex tests. Now I

[15:25] just tell Codex, "Hey, you have access

[15:27] to AWS. Go spin up a bunch of [ __ ] and

[15:29] stress test the system so I can get a

[15:31] better idea of how much traffic I can

[15:32] handle." The power of unlimited code is

[15:35] hard [snorts] to fathom. And if you're

[15:37] still thinking of code in that small box

[15:40] that is so important, I get why you're

[15:43] struggling to make this jump. But you

[15:45] need to realize important code is only

[15:48] part of your day-to-day. And if 90% of

[15:51] the code that you're touching in a given

[15:52] day is that important, you're just not

[15:54] touching enough code yet. And when your

[15:56] life had to be that way because every

[15:58] line of code was so important people

[16:00] could die, that got so ingrained in your

[16:02] head, as it should, because if it

[16:04] doesn't people die. That era is over

[16:06] now.

[16:07] I'm not saying move faster. I'm not

[16:09] saying merge slop. All I am saying is

[16:12] that everybody can benefit some amount

[16:15] from the infinite code generator that we

[16:17] now all have access to on bedrock, on

[16:19] it, Codex, on Claude code, on whatever.

[16:22] I'm not telling you to make your code

[16:24] cheaper.

[16:25] I'm telling you to make more cheap code.

[16:27] And that's a huge difference. And there

[16:28] are a ton of creative ways you can do

[16:30] this. If you're still reading all of the

[16:32] code, you're not generating enough of

[16:34] it. I'm not saying you should verify

[16:35] less code than you used to. I'm saying

[16:37] you should write more code than you used

[16:38] to. And you should be writing so much

[16:40] code that a lot of it isn't worth human

[16:43] attention. Reading code takes energy and

[16:45] effort and time, and it should. We

[16:47] shouldn't try to find ways to read code

[16:49] faster. We shouldn't try to find ways to

[16:51] merge unsafe things quicker. We should

[16:53] be finding ways to make the code we care

[16:55] the most about better, faster. Let's

[16:58] think about code in a funnel, top to

[17:01] bottom, where the majority of code is at

[17:03] the top and a very small percentage is

[17:04] at the bottom. This is meant to be a

[17:06] funnel of importance. There will always

[17:07] be more code that is garbage than code

[17:09] that is super important, and this gap is

[17:11] going to widen rapidly over time. The

[17:14] top here I will clearly label as such, I

[17:17] would rather die than have anyone read

[17:18] this code. It's code that doesn't

[17:20] matter. It's code like the 10,000 lines

[17:22] I wrote to organize assets on my

[17:23] computer. I accidentally read 10 lines

[17:26] of it once. It's such slop that I'm

[17:27] offended that I did. No one should have

[17:29] to read the slop. Nobody should have to

[17:30] read the [ __ ] people are generating

[17:32] on lovable for their like pet stores.

[17:34] And I agree there. And if you don't

[17:36] perceive a difference between that and

[17:37] the code inside of a pacemaker, you are

[17:39] making my job harder here because I'm

[17:41] trying to be realistic here. But there's

[17:42] stops between and these stops are

[17:45] valuable. It's I'll frame these as I'd

[17:47] like for this to work in the middle tier

[17:49] and I might and I'll get fired if it

[17:53] doesn't work for the tier below. I think

[17:55] this roughly represents the tiers I

[17:57] think of code in. At the very top,

[18:00] there's slop. At the very bottom,

[18:03] there's death. And in between is where

[18:05] most of us actually live. The vast

[18:07] majority of people watching, their code

[18:08] falls between this range. Where the

[18:12] code's important enough that like you'd

[18:14] be upset if it didn't work or the code's

[18:16] important enough that bad business

[18:18] things will happen, you'll get fired,

[18:19] etc. We need to think about these types

[18:22] of code differently. And I would also

[18:24] argue, and this is probably the most

[18:25] important part, nobody spends all of

[18:27] their time in just one of these

[18:29] sections. Okay. Slop coders that just

[18:32] use stuff like lovable spend most of

[18:34] their time here and probably don't go

[18:35] very far down. But people who write a

[18:38] lot of code at the very least hop

[18:41] between one through three. Some touch on

[18:43] this fourth layer, the really scary

[18:45] stuff. But all of us should be writing

[18:48] code in all of these ranges. The thing

[18:50] that changed, if we were to label these

[18:51] as tiers A, B, C, and D, the thing that

[18:55] changed is that tier D code was so

[18:59] expensive that spending any time in the

[19:02] other tiers just didn't seem valuable

[19:04] because it's just as much work to write

[19:06] bad code as it is to write good code if

[19:08] you're writing it by hand and you you

[19:10] how to write good code because it's hard

[19:11] to turn off your brain and all the

[19:13] demons that are like, you have to make

[19:15] sure every line is safe. But,

[19:17] realistically, we should all be doing

[19:20] more in these other ranges. Let's say

[19:22] you're one of these engineers working on

[19:23] pacemakers, and in the average day, the

[19:26] vast majority of the code you wrote was

[19:27] that D tier. It was the death tier.

[19:30] People could die otherwise. I'm not

[19:32] saying write less.

[19:33] I am simply saying you should draw a

[19:36] line between that code and everything

[19:39] else. And you should be writing a whole

[19:41] lot more of the everything else. But,

[19:43] let's take a look at stuff that I do.

[19:46] Let's take a look at how I think of T3

[19:48] code changes, or how I think of Lakebed

[19:50] changes. Some of that code is more

[19:52] important than other parts. Dax touches

[19:55] on this a little bit in his post here.

[19:57] Lately, after a big diff change, instead

[19:59] of reading the diff, I asked the agent

[20:00] for a summary of what it did in every

[20:02] file. Anything weird will stick out

[20:03] immediately, and one to two prompts

[20:04] later, it's completely how he wants it.

[20:06] Files and function signatures he needs

[20:08] to know, but he cares less about the

[20:10] function body. Very much agree here. The

[20:12] way I would think of this is the

[20:14] engineers who wrote mostly tier C and B

[20:16] code should find the right ways to get

[20:19] the pieces that matter out of the parts

[20:22] that are in this tier, so they can

[20:24] ignore more of the parts here. And

[20:26] figuring out

[20:28] where to cut these layers is important.

[20:31] I read all of the function signatures

[20:33] and all of the API definitions in

[20:35] Lakebed, every single one. It is very

[20:37] important to me that the API and SDK are

[20:40] super solid. Because if they're not, it

[20:43] makes maintaining the project over time

[20:45] way harder, it makes future updates way

[20:47] harder, it massively increases the risk

[20:49] of future releases. So, I want to make

[20:51] sure those layers are as solid as

[20:55] possible. And part of how I do that is

[20:57] writing a shitload of slop to test it.

[20:59] One of my favorite things to do when I

[21:01] define a new API or SDK is to put it in

[21:04] a package that works on my machine, and

[21:06] then go spin up 10 agents with much

[21:08] dumber models to build things on top of

[21:10] it. I absolutely love using Grok models,

[21:12] not for actually writing code that

[21:14] matters, but for writing absolute slop,

[21:16] and to see if they, despite being dumb,

[21:18] are still capable of using these APIs.

[21:21] If they are, awesome. I ship it. If they

[21:24] aren't, interesting. I fix it. So, to go

[21:28] back to the pacemaker people, let's say

[21:31] you are mostly writing code here in tier

[21:33] D, but you also have a bunch of tests

[21:36] and harnesses and wrappers and things

[21:38] verifying your work in tier C. I would

[21:40] agree, those things are really

[21:41] important. If you have a test suite that

[21:43] you've slaved over to make sure your

[21:45] super important code continues to work

[21:47] as expected, awesome. I salute you. You

[21:50] should still be reading a lot of that,

[21:51] and you should also be building systems

[21:53] to verify it, too. But maybe, just

[21:55] maybe, you could write more code up

[21:57] here. If you've built all these systems

[21:59] and you have all these tests, and then

[22:00] somebody puts up a PR that you're really

[22:03] not sure about, maybe have an agent do

[22:05] some slop to try out three different

[22:07] theories and test all of them. Maybe

[22:09] have the agent write a new set of tests

[22:11] that don't exist yet for your one-off

[22:13] theory. Maybe you're curious if the code

[22:15] will be faster in Rust than it is in Go,

[22:18] so you have an agent slop port the whole

[22:20] thing over and then run the test suite

[22:21] against it. You know it's not all going

[22:23] to pass. You know it's not all going to

[22:24] merge, but it's going to answer

[22:25] important questions you might have. If

[22:27] you're not finding these opportunities,

[22:29] then you're not curious enough. You're

[22:30] not creative enough. You're not taking

[22:31] advantage of this once-in-a-lifetime

[22:33] opportunity we have here, the ability to

[22:35] generate infinite code. It's crazy how

[22:38] cool it can be. And I understand why you

[22:42] might feel differently. It's cuz the

[22:44] people in this top A tier are the most

[22:46] obnoxious people on Earth. The people

[22:49] who are shipping endless [ __ ] code

[22:52] for services nobody [ __ ] uses. They

[22:54] are the ones who are the loudest on

[22:56] social media, and they are the ones that

[22:58] represent this new slop AI vibe coding

[23:01] movement. I hate them, too.

[23:03] I need you to understand that we are on

[23:05] the same side even if I rage bait on

[23:06] Twitter a little bit. That doesn't mean

[23:08] there isn't value here. There's also the

[23:10] fact that you should probably have AI

[23:11] reading your code too. That's a whole

[23:13] separate rant I don't want to bog this

[23:14] down with but in generally speaking I

[23:17] don't bother my team with code until

[23:18] multiple agents have verified it deeply.

[23:21] Use AI to review your code. It's

[23:22] actually really cool for that. I think

[23:24] this is the diagram that best summarizes

[23:26] my thoughts here on this type of

[23:28] important code. I will be clear, there

[23:31] are lots of other types of code where

[23:32] this level of hand review is not that

[23:34] important and you're probably merging a

[23:36] lot more too. But if your code is so

[23:38] important that you need this pipeline,

[23:40] please be realistic. Most importantly, I

[23:43] want you to be more creative. Find more

[23:44] ways to use code to verify the things

[23:47] that matter. If your code's important,

[23:49] you should write code that isn't to

[23:50] verify the code that is. You'd be amazed

[23:52] what you can come up with when you start

[23:54] treating code as more disposable, as

[23:56] throwaway for one idea, one theory, one

[23:58] question, one thing. Be creative. And

[24:02] you'll make awesome things happen. I've

[24:03] said all I have to on this one and it

[24:04] seems like I pissed everyone off which

[24:05] means mission accomplished. Go be more

[24:07] creative, write more slop, and until

[24:09] next time,

[24:10] peace nerds.
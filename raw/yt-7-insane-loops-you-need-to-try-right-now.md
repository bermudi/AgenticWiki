---
type: youtube
url: https://www.youtube.com/watch?v=F4a8aMLb678
title: "7 INSANE loops you need to try right now"
channel: Matthew Berman
date: 2026-07-02
ingested: 2026-07-02
---

# 7 INSANE loops you need to try right now

[0:00] Loops are emerging as the single biggest

[0:02] unlock for people building software with

[0:04] artificial intelligence right now. But

[0:07] most people don't even know what loops

[0:09] are. And so today, I'm going to tell you

[0:11] what loops are. I'm going to show you

[0:13] why they're valuable. And then I'm

[0:15] actually going to give you many specific

[0:18] use cases that you can use loops for

[0:20] today. So what is a loop? A loop is a

[0:24] way to allow your AI coding agent to

[0:27] work autonomously towards a specified

[0:30] goal. The most important thing about

[0:33] loops is that it removes humans that

[0:36] allows the agent to work much more

[0:38] quickly towards this defined goal. And

[0:41] if it sounds very theoretical, I am

[0:44] going to break it down. So what is a

[0:45] loop more specifically? Well, you need

[0:48] two things. You need a trigger and you

[0:51] need a goal. With those two things, you

[0:54] can complete the loop. A trigger is what

[0:57] kicks off the loop. And there are three

[0:59] ways to kick off a loop. One, you can do

[1:02] so manually. You literally tell the

[1:04] agent, go do this loop. Two is schedule.

[1:08] You can schedule a loop to happen at a

[1:10] certain time of day or on a repeating

[1:13] schedule. And then three, you have

[1:15] actions. You can have the loop kick off

[1:18] based on some kind of action like

[1:19] opening a PR. Now to fully remove the

[1:22] human, we wouldn't want to kick

[1:24] everything off manually, but sometimes

[1:26] it is required. All right? And for the

[1:28] goal, the goal can be basically one of

[1:31] two things. It can be verifiable or we

[1:34] can use LLM as a judge. So if it's

[1:37] verifiable, it is something concrete,

[1:39] some specific number or some way to test

[1:41] it deterministically. If it is LLM as a

[1:45] judge, that means we're giving the model

[1:47] the ability to determine when it has

[1:50] reached the goal. Let me give you two

[1:52] examples. So for verifiable 100% test

[1:55] coverage in our codebase as an example,

[1:58] that is something that we know for sure

[2:00] and we have a nice way to test against

[2:03] when it is true. And for LLM as a judge,

[2:06] one example would be refactor until

[2:09] satisfied. And the satisfaction just

[2:13] means you as the LLM get to determine

[2:16] when we are satisfactorily

[2:19] refactored enough. All right, enough of

[2:21] the theoretical. Let me actually show

[2:23] you some examples. So, a lot of people

[2:25] talk about loops, but they don't

[2:26] actually give concrete use cases. And I

[2:29] wanted to fix this. That is why I am

[2:31] launching the loop library. It is a free

[2:34] library. I'm basically taking all the

[2:36] loops that I use and the ones that I see

[2:38] other people use and putting them in a

[2:41] single place so you can see them. You

[2:43] can be inspired by them to create your

[2:45] own loops or you can simply copy them

[2:47] straight from here. It's free. I'm going

[2:49] to drop the link down below. So, let's

[2:51] go over it. This is definitely my

[2:54] favorite loop and it's going to show you

[2:56] exactly how loops work. This is the

[2:58] sub50ms page load loop. Let me click

[3:01] into it. And here we are. So the

[3:04] objective of this loop is to get every

[3:08] single page load in my app under 50

[3:11] milliseconds. And so that is the goal.

[3:13] It is a very concrete well-defined goal

[3:16] which really makes building a loop

[3:19] easier. So what I tell it is continue

[3:22] optimizing the code for speed. After

[3:25] each significant change, measure page

[3:27] load performance across every page under

[3:30] the same repeatable test conditions.

[3:33] continue until that's the loop continue

[3:36] until every page loads in under 50

[3:39] milliseconds. So it is literally going

[3:41] to go through my entire application,

[3:43] every window, every page, every modal,

[3:46] load it. If it's above 50 milliseconds,

[3:49] it's going to continuously optimize it

[3:52] until it gets it under 50 milliseconds.

[3:54] Once it's done with one, it moves on to

[3:56] the next. That's the loop. That's the

[3:59] goal. But how do I actually do that? How

[4:01] do I actually kick it off? Well, the

[4:03] trigger in this case is me. I am the

[4:06] human and I'm going to manually kick off

[4:09] this loop. You can certainly set it on a

[4:11] schedule and you can even trigger it on,

[4:14] let's say, a PR open. So, every time you

[4:18] open a new PR, you also want to make

[4:20] sure that that new PR doesn't make the

[4:23] page load over 50 milliseconds. So,

[4:25] let's kick it off. So, we're going to

[4:26] click copy right here. All you have to

[4:28] do is paste it in. So I have the prompt

[4:31] right there. And then at the end or at

[4:32] the beginning, it doesn't matter. Type

[4:34] slashgoal.

[4:36] And this is a feature in codeex. Claude

[4:38] code also has a /goal feature. But as

[4:41] soon as you have this slashgoal, it's

[4:43] telling codeex to continue working until

[4:46] the condition is met. The condition of

[4:48] every page loads under 50 milliseconds.

[4:51] That's it. You just hit go. And it might

[4:53] run for 10 minutes. It might run for 10

[4:56] hours. it will just continue to run

[4:58] until it meets the goal. And so you do

[5:00] have to keep a close eye on it if you're

[5:02] under a token budget constraint. So here

[5:05] it is in action. I sent this as a goal.

[5:07] Look for more optimizations to make sure

[5:09] every page loads in under 50

[5:11] milliseconds on production. It worked

[5:13] for nearly 50 minutes. So I'm treating

[5:15] this as a production performance goal.

[5:17] I'll first measure the real team's page

[5:20] request path. And it basically, as you

[5:22] can see here, went through every single

[5:25] page and optimized it to load under 50

[5:28] milliseconds. Loops are the frontier of

[5:30] AI workloads. And if you want to power

[5:32] them reliably and at production scale,

[5:36] use the sponsor of today's video,

[5:38] Digital Ocean. If you're running

[5:40] production inference, you're probably

[5:41] running into some of these problems.

[5:42] Your inference stack is too complex to

[5:45] operate. costs are unpredictable and I'm

[5:47] spending more time managing the

[5:49] infrastructure than actually building

[5:50] the things to be on the infrastructure.

[5:52] And most teams find out the hard way

[5:54] that the hard part of building AI

[5:56] applications is not using the model.

[5:59] It's actually everything around the

[6:01] model. The operational overhead, the

[6:04] fine-tuning inference complexity, the

[6:06] costs that become harder to predict as

[6:08] you scale. And that's why I want to tell

[6:10] you about Digital Ocean, the partner of

[6:12] this video. Digital Ocean is designed to

[6:14] minimize the total cost of ownership by

[6:17] giving teams a simpler path to

[6:19] production AI. They provide

[6:20] infrastructure that is optimized for

[6:23] inference and a vertically integrated

[6:25] core cloud that provides efficiency at

[6:28] scale. Vertically integrated is the key

[6:30] word. And with transparent usage based

[6:33] pricing that makes costs easy to

[6:36] predict. So, if you want to spend less

[6:38] time managing your infrastructure and

[6:39] actually building the thing you're

[6:40] excited about, Digital Ocean is the way

[6:42] to go. So, go check it out. They've been

[6:44] a fantastic partner. I've actually been

[6:46] using Digital Ocean for well over a

[6:48] decade at previous companies, so I can

[6:50] vouch for them. Go check them out. Link

[6:53] down below. Now, back to the video.

[6:55] Here's another loop that I really like.

[6:57] This is called the overnight docs sweep.

[6:59] Each night, review the codebase in full

[7:01] and make sure all documentation reflects

[7:02] the latest changes from the previous

[7:04] day. update the documentation as needed,

[7:07] then open a poll request with those

[7:08] changes. So, what I am doing is I'm

[7:11] making sure we have complete

[7:13] documentation based on any changes we

[7:15] may have made. This is an example of LLM

[7:19] as a judge. There's no verifiable way to

[7:22] know if we have complete documentation

[7:24] coverage. There may be some ways that we

[7:26] can say, okay, as long as a piece of

[7:28] documentation covers this section of the

[7:30] code, but ultimately what we're doing is

[7:32] saying, okay, LLM, you decide. So, how

[7:35] do we actually use this? Well, once

[7:37] again, just hit the copy button. We're

[7:39] going to come into codeex. We're going

[7:41] to click this automations tab. We're

[7:42] going to create via chat. We're going to

[7:45] delete this portion. I don't know why

[7:46] they put that in there, but I want to

[7:48] set up an automation. Then, we paste in

[7:50] what we just copied, and then each night

[7:52] review the codebase in full. hit go and

[7:54] let it run and hopefully it will set up

[7:56] an automation just like this. So there

[7:58] we go. I'll set this up as a recurring

[8:00] automation. So first I'm loading the

[8:01] automation tool rather than writing a

[8:03] one-off note. Perfect. So this is a way

[8:05] to keep your documentation always up to

[8:08] date. It is awesome. And by the way, I

[8:11] created this website with here.now. So

[8:14] shout out to here.now the partner on the

[8:16] loop library. I created it and I simply

[8:19] said deploy to here. Now and it was

[8:22] done. It's so easy. Next is the

[8:24] architecture satisfaction loop. This is

[8:27] one that Peter Steinberger himself says

[8:30] he uses often. Here we go. Refactor

[8:33] until you are happy with the

[8:35] architecture. Here is the trigger and

[8:37] the goal all in one sentence. Refactor,

[8:40] which is what the loop is going to do,

[8:42] until you are happy with the

[8:44] architecture. Happy with the

[8:45] architecture is the goal. This is

[8:47] another example of LLM as a judge. We

[8:50] can even give it more guidance on what

[8:52] happy with the architecture means. We

[8:55] can say be very strict about simplicity

[8:58] or make sure every single line of code

[9:00] is dry. Then after each significant

[9:02] step, live test the system, run auto

[9:06] review and commit. Track progress in and

[9:08] then we give it a markdown file to track

[9:10] the progress. This is fantastic. So it's

[9:13] tracking its loop as it's actually

[9:15] looping. Now you can kick this off

[9:17] manually or you can run it every night.

[9:19] So let's say during the day you're

[9:21] deploying a bunch of code and then every

[9:23] night you're just making sure that it's

[9:24] refactored, it's dry, and it looks

[9:27] really solid. So very good way to keep

[9:30] your codebase very clean. Next, another

[9:33] one of my favorites, the logging

[9:35] coverage loop. So let's click into it.

[9:37] Basically, what this loop is going to do

[9:39] is make sure that we have thorough

[9:40] logging throughout our app. And there's

[9:43] another loop that builds off of this

[9:45] that I'm going to show you in a minute,

[9:47] which these two loops together, you can

[9:49] start to see how loops can become so

[9:51] powerful. So, this says, "Review the

[9:53] systems logging and add missing coverage

[9:55] until every important path produces

[9:58] useful tested logs." And again, this

[10:01] just makes sure that we have logging for

[10:04] everything. And this is going to be

[10:06] manually kicked off. And this is going

[10:08] to be LLM as a judge because it says

[10:10] every important path and important is

[10:14] non-deterministic. It just means the LLM

[10:16] gets to decide what's important and what

[10:18] isn't. And by the way, if you want

[10:20] hands-on help with loops and other AI

[10:22] topics at your company, my team is

[10:24] offering free consulting sessions. I'm

[10:27] going to drop a link down below. We're

[10:29] only doing a few of these, so go apply

[10:31] if you're interested. Would love to talk

[10:33] to you. All right, so now imagine this.

[10:35] You have full logging coverage, but what

[10:37] do you actually do with those logs?

[10:39] Well, I have another loop for you. This

[10:41] is called the production error sweep.

[10:43] Every single night, we're going to

[10:45] review our production logs for errors.

[10:48] If you find an actionable issue, trace

[10:50] it to its root cause, fix it, verify the

[10:53] fix, and open a pull request. Then, ping

[10:56] me in Slack with the findings and PR

[10:58] link. If no actionable errors are

[11:00] present, ping me with that result

[11:02] instead. So we are kicking off a loop

[11:05] every night and the loop is looking for

[11:07] every error in the logs and we'll fix

[11:10] them one by one with the end goal being

[11:13] no more unressed errors in the logs. So

[11:16] that is a very concrete goal for this

[11:19] loop. All right, here's another loop.

[11:21] Something incredibly important to any

[11:24] website owner, any app owner is SEO. And

[11:27] not only SEO, now GEO. So, here's the

[11:30] SEO GEO visibility loop. Run an SEO GEO

[11:35] audit across crawlability, indexation,

[11:38] page intent, titles, internal links,

[11:40] structured data, source citations, and

[11:43] answer first content. Rank the gaps. I'm

[11:46] not going to read the whole thing. Fix

[11:47] the highest leverage issues. Rerun the

[11:49] same crawl. And here's the loop. Repeat

[11:52] until no critical technical issues

[11:55] remain. Again, you might have one issue.

[11:58] you might have 50 issues. The point is

[12:01] we've now kicked off a loop that fixes

[12:04] all of them until no more issues are

[12:07] present. So, this is a really cool one

[12:09] to run, let's say, once a week. All

[12:11] right, here's one of my favorite and one

[12:13] of the most handwavy loops that I have,

[12:15] but listen to this. This is called the

[12:17] full product evaluation loop. Create n

[12:20] realistic scenarios covering every major

[12:22] capability. Before testing, define clear

[12:24] success criteria and choose a consistent

[12:27] evaluation method such as past fail

[12:29] checks or a scoring rubric. Run every

[12:31] scenario under the same conditions and

[12:33] record evidence for each outcome. Fix

[12:35] the underlying cause of anything that

[12:37] that does not meet the criteria. Rerun

[12:40] the affected scenarios and then rerun

[12:43] the complete test. Continue until every

[12:45] scenario meets the original quality bar.

[12:47] Now, a lot of you might be thinking,

[12:49] "Wow, that just sounds like tests,

[12:51] right? It's just like a test suite.

[12:53] Well, kind of. But this is actually

[12:55] non-deterministic. This is allowing the

[12:58] model to go through every single use

[13:00] case in your application, in your

[13:03] product, figure out if it's good enough,

[13:06] determined by the LLM, and update it if

[13:09] necessary. This one really does work. It

[13:12] takes like 12 hours at times or more,

[13:15] but it really does come up with very

[13:17] good optimizations. Now, you can also

[13:19] customize this for your specific app.

[13:22] So, for example, I'm building something

[13:24] right now that requires me asking a

[13:26] question of an LLM and it providing a

[13:28] really accurate response with sources.

[13:31] So, I tell it, come up with 100

[13:34] different use cases, wide ranging use

[13:36] cases for asking the LLM questions and

[13:40] judge whether the response is good

[13:41] enough. If it's not, iterate and improve

[13:43] it. So, I could keep going, but if you

[13:45] want to find all of the loops and any

[13:47] new ones that I discover, go check out

[13:49] the loop library. I'm going to drop a

[13:51] link down below. And once again, shout

[13:52] out to here. Now for hosting the loop

[13:55] library. Okay, so there are two major

[13:58] caveats with loops that I have to tell

[14:00] you about. Number one is it's not for

[14:03] every problem yet. Designing a loop

[14:06] isn't always easy. Specifically, coming

[14:09] up with the goal for the loop is not

[14:12] easy. If something can be verified like

[14:15] every page loads under 50 seconds, that

[14:18] is perfect for a loop. When we have to

[14:20] have the AI judge, LLM is a judge

[14:23] whether a goal is met or not. That's

[14:26] when it becomes a little more brittle

[14:28] because we are leaving taste and

[14:31] judgment up to the model. This becomes

[14:35] even more difficult when we're talking

[14:37] about building features. I have not

[14:39] really found a way to build features

[14:41] with loops. You cannot say loop until we

[14:44] build a full permissioning system. I

[14:47] mean, you technically can, but I'm not

[14:50] doing it because I don't know which

[14:52] direction the AI is going to go. I don't

[14:54] know what features it's going to build.

[14:56] I don't know when or how it's going to

[14:58] decide which features are worthwhile

[15:00] versus which are not. So, that makes it

[15:03] not great from day zero feature

[15:06] building. Now, one example of building a

[15:08] product from scratch using a loop is

[15:11] something I did where I told the model

[15:14] as a goal to clone Excel feature parody

[15:19] and it was running for days and days and

[15:22] days until I finally stopped it. It

[15:24] actually opened up Excel on my computer,

[15:27] used computer use, and literally clicked

[15:30] through and made sure that it had

[15:31] feature par. And yes, it was running for

[15:33] days before I finally stopped it. So, I

[15:35] do not recommend doing that. And that

[15:37] brings me to the second big caveat.

[15:40] Loops are very expensive. They are

[15:43] churning through tokens autonomously

[15:46] until they hit the goal. Some of these

[15:48] agents might run for 10 minutes. Some of

[15:51] them can run for days. So, for you token

[15:54] maxers out there, loops are fantastic.

[15:56] But for those of you who don't have an

[15:59] unlimited token budget, this might not

[16:02] work for you today. And by the way, if

[16:04] you like coding with loops, you might

[16:06] also like these four open- source

[16:08] projects that I reviewed that you can

[16:10] use right
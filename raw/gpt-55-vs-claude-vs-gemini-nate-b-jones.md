---
title: "GPT-5.5 vs Claude vs Gemini: The Real Difference Nobody's Talking About"
author: "AI News & Strategy Daily | Nate B Jones"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=9aIYhjeYxzM"
date_saved: "2026-05-10T19:29:49.906Z"
---

# GPT-5.5 vs Claude vs Gemini: The Real Difference Nobody's Talking About

[0:00] GPT2 5.5 reset the bar, and I think it's

[0:02] the strongest model in the world today.

[0:04] I want to explain why I think that, why

[0:06] it matters if you're actually using AI

[0:08] for work, and what I would change in

[0:09] your workflow because of this model.

[0:11] Because the most important thing about

[0:12] this release, it's not that 5.5 is

[0:14] better than 5.4. That's true, but it's

[0:16] like the least interesting thing. The

[0:18] most important thing is that it changes

[0:19] what you can reasonably ask a model to

[0:22] do. So, let me start with why I think

[0:24] the bar moved. Then, I want to show you

[0:26] the evidence because I put these models

[0:28] through the paces. I don't think easy

[0:29] prompts tell you that much, so I pushed

[0:31] it through a really detailed executive

[0:33] knowledge work package, a messy data

[0:35] migration, and an interactive 3D

[0:37] research build. And then, I want to make

[0:38] it practical for you. Where would I use

[0:40] 5.5 today? Where would I still reach for

[0:43] Claude? And where do you need

[0:44] validation, review, or a different

[0:46] workflow because the model is just not

[0:48] safe to trust on its own yet. But, the

[0:50] first thing to realize is that the floor

[0:52] moved. That phrase matters because not

[0:54] every model release moves the floor. A

[0:57] lot of recent progress has come from

[0:59] inference time compute. More time, more

[1:00] thinking, more search, more tool calls.

[1:02] It's useful, it makes models better.

[1:04] It's not the same thing as the default

[1:06] model being bigger and smarter. 5.5

[1:08] feels like a bigger pre-train showing up

[1:10] in everyday use. The fast modes are

[1:12] sharper, the thinking modes are

[1:13] stronger, the model figures out the

[1:15] shape of the task sooner. It needs less

[1:17] hand-holding. It can take a messy task

[1:19] and get closer to a finished result

[1:21] faster. And the public numbers point the

[1:23] same way, right? OpenAI reports an 82%

[1:26] on Terminal Bench, which is around

[1:27] software engineering, an 84% on GDP Val,

[1:30] which is around knowledge work tasks.

[1:32] And there are other high-value numbers.

[1:34] Artificial Analysis put 5.5 at extra

[1:37] high reasoning effort at the top of the

[1:38] intelligence index by three points. But,

[1:40] that's not the point, right? It wins,

[1:42] but also they note that the model uses

[1:44] way less tokens than 5.4 over the index

[1:47] run. In other words, it's smarter and

[1:49] more efficient. But, the benchmarks

[1:50] don't tell the whole story here. We

[1:52] spend so much time comparing tiny deltas

[1:54] that it's really easy to miss the basic

[1:56] fact that we are still on a curve that

[1:59] is moving up very fast. Dario Amodei has

[2:01] used the image of being on a rainbow

[2:03] with no visible end to describe this

[2:05] moment in 2026. OpenAI's framing around

[2:07] 5.5 is basically the same idea. Scaling

[2:10] is still working, the gains are still

[2:12] compounding, and the lab is not acting

[2:14] like the curve is over. No lab is acting

[2:16] like the curve is over. Whether you like

[2:17] the rainbow metaphor, 5.5 is a reminder

[2:20] that the frontier moving is still the

[2:22] most important variable in the whole

[2:24] industry because when the frontier

[2:25] moves, our ambitions move with it. So,

[2:28] that's the reason the floor moved. 5.5

[2:30] is not just a little bit better at

[2:33] benchmark tasks. This model feels

[2:35] different. Not just more competent, it

[2:38] feels like it gets what you want and

[2:40] gets after your intent more effectively

[2:43] over a longer period of time. It feels

[2:45] like a big lift intuitively when you are

[2:47] actually using it day-to-day. And that's

[2:49] what I found, and that's what I'm going

[2:50] to walk you through next. And before I

[2:52] get there, I just want to call out there

[2:53] is a take floating around AI right now

[2:55] that sounds really smart, but I think

[2:57] it's wrong. The take is that the best

[2:59] model is mattering less now than it used

[3:01] to because all the frontier models are

[3:02] already good enough. And there's a

[3:04] version of this that feels true. If your

[3:06] task is small and clean and

[3:08] well-defined, a lot of the models now

[3:09] feel interchangeable. Summarize this

[3:11] document, draft this email, make a basic

[3:14] landing page, explain this error, write

[3:16] a normal SQL query. Any good frontier

[3:18] model can do those things. The frontier

[3:20] has really moved past easy tasks. So, if

[3:23] you evaluate models on easy tasks, you

[3:25] will conclude that the differences are

[3:27] small or non-existent. You just will.

[3:29] And you will be right, but only about

[3:30] the wrong category of work. The best

[3:33] model matters in the places where the

[3:34] work is real and ugly. It matters when

[3:36] the brief is under-specified, the files

[3:38] are messy, the source material can be

[3:40] contradictory, and the model has to

[3:42] decide what matters and use tools and

[3:44] preserve uncertainty and produce real

[3:46] artifacts and check the result and keep

[3:48] going long enough to finish. That feels

[3:50] like real work, right? And that is the

[3:52] work where ChatGPT 5.5 feels

[3:54] meaningfully different. The old question

[3:56] was, can the model answer this? The new

[3:59] question is, can the model carry this?

[4:02] Can it carry a long context without

[4:04] losing the thread? Can it carry a

[4:05] deliverable across multiple formats? Can

[4:07] it carry legal and ethical risk without

[4:10] smoothing over the uncomfortable or

[4:11] dangerous parts? Can it carry a data

[4:13] migration far enough that the human only

[4:15] has to check the tough cases instead of

[4:18] rebuilding the whole database? That's

[4:19] the part of the market where the best

[4:21] model still matters. And it matters even

[4:23] more once you stop thinking of the model

[4:25] as just a chatbot. Because in 2026, you

[4:28] are not only judging the weights of the

[4:30] model. That's not really relevant.

[4:31] You're judging the system around the

[4:33] weights as much as the model itself. The

[4:35] tools, the file access, the browser

[4:37] control, the memory, the computer use,

[4:39] the image generation, the interface, the

[4:40] available compute, and the way all of

[4:42] those pieces combine into something that

[4:44] can get work done. The timing also

[4:46] matters because 5.5 did not land in a

[4:48] vacuum. Anthropic announced Opus 4.7 on

[4:51] April 16th. OpenAI announced 5.5 on

[4:54] April 23rd. 4.7 is a real model that's

[4:57] an advancement. I still use it. It's

[4:59] strong especially on planning, critique,

[5:01] and front-end taste. But, Opus 4.7 also

[5:04] landed under the shadow of Mythos, the

[5:06] more advanced Anthropic model that has

[5:08] been teased and restricted because of

[5:10] cybersecurity concerns. So, 4.7 felt to

[5:13] me like a bridge release. Useful,

[5:15] important, better than what came before,

[5:17] but not the release that redefined

[5:19] Anthropic's place on the frontier. 5.5

[5:22] feels different. It arrived as a model

[5:23] release, but also part of a larger

[5:25] OpenAI workflow launch. You have 5.5 in

[5:28] ChatGPT and Codex. You have Codex at the

[5:30] same time getting stronger as a place

[5:32] where the model can actually act on

[5:34] files, code, browsers, documents, and

[5:36] interfaces. You have ChatGPT Images 2.0

[5:39] arriving in the same window, which

[5:40] matters because the visual direction has

[5:42] been one of the places where OpenAI

[5:44] models have lagged Claude. Those pieces

[5:46] all fit together. Images 2.0 can produce

[5:48] the visual reference, Codex can operate

[5:50] in the working environment, 5.5 can

[5:53] reason through the task and build the

[5:54] artifact and test it and keep iterating.

[5:56] That combination is much stronger than

[5:58] asking a model to do everything from a

[6:00] blank prompt. That's the argument for

[6:02] why the best model still matters. The

[6:04] hardest work isn't clean, and the best

[6:06] system matters because the model needs

[6:08] somewhere to act. Now, the real question

[6:10] is, does that show up in the real test,

[6:12] or am I just saying something that feels

[6:13] good cuz the launch was impressive?

[6:15] Let's make this concrete. I ran 5.5

[6:18] through three hard tests because most

[6:20] public model evaluations strike me as

[6:22] too easy to tell you something useful.

[6:24] If you ask a frontier model to build a

[6:26] to-do app, or to summarize a transcript,

[6:28] or to make a chart, or to write a memo,

[6:30] you're not really testing the frontier

[6:31] anymore. You are testing whether the

[6:33] model can do something that good models

[6:35] have been able to do for a long time.

[6:37] The differences show up when you really

[6:39] try and reset the bar and raise your

[6:40] ambitions. So, the three tests I

[6:42] designed were designed to get the model

[6:43] to fail in different ways. And yes, all

[6:46] of them were designed to be so hard that

[6:48] any frontier model, including 5.5, would

[6:51] fail. And I expect that as models get

[6:54] better, I'm going to have to keep

[6:55] evolving these tests, and I'm very

[6:57] comfortable with that. Part of what I

[6:59] love about having a private bench is

[7:00] that I don't have to publish percentage

[7:03] marks that show up with publicly

[7:05] available tests that you can see models

[7:07] literally get into the 80s and the 90s

[7:09] and essentially saturate the benchmark.

[7:11] I can make these as hard as I want, and

[7:12] that helps test the models because the

[7:15] models are being tested in ways that

[7:16] they weren't explicitly trained to test

[7:19] on. And I love that. I love that because

[7:21] it helps us to measure one of the key

[7:24] values of intelligence in a model, the

[7:26] ability to generalize across new problem

[7:28] sets. And so, that's why I have a

[7:29] private bench, and this one is wicked. I

[7:32] wrote three tests, all designed to fail

[7:34] in different ways. The first was Dingo

[7:36] and Company, a full executive knowledge

[7:38] work package about a dingo company in

[7:40] Alaska. The second was Splash Brothers,

[7:43] a dirty small business data migration

[7:45] about a car wash company. And the third

[7:47] was Artemis 2, an interactive 3D

[7:49] visualization and research build. Each

[7:51] one checks a different capability. Dingo

[7:53] tests judgment plus production

[7:54] discipline. Splash Brothers tests boring

[7:57] back-end correctness. And Artemis tests

[7:59] research, interactivity, and visual

[8:01] taste. And the important thing is that

[8:02] any one of these tests by itself might

[8:05] give you the wrong story. For example,

[8:07] Dingo makes 5.5 look like a runaway

[8:09] winner. Splash Brothers, it's going to

[8:12] make you feel more cautious. And Artemis

[8:14] makes the routing picture much more

[8:15] complex because Opus still has a real

[8:17] edge in visual composition. If you look

[8:19] across all of them, they give you a more

[8:21] complete picture. Start with Dingo.

[8:23] Dingo is a fictional Anchorage pet tech

[8:25] startup selling an automated litter box

[8:27] for dingos and dingo hybrid pets. The

[8:30] product is called Dingo Box Pro, and the

[8:31] company has a related subsidiary called

[8:33] Northern Canine Imports that helps

[8:35] create the market by importing the

[8:37] dingos. The premise is intentionally

[8:39] absurd, and the absurdity is the point

[8:42] because a weaker model treats this like

[8:44] a normal product launch with a funny

[8:45] animal attached. A stronger model

[8:47] realizes that this is commercially

[8:49] interesting, it's legally sensitive,

[8:51] it's ethically fraught, and it's

[8:52] operationally very complex. It has to

[8:55] separate the product company from the

[8:57] import funnel. It has to size the market

[8:59] around qualified owners, not fantasy

[9:01] demand. It has to avoid implying that

[9:03] the product makes exotic ownership

[9:05] legal, or simple, or suitable. And it

[9:07] has to do all of that while producing

[9:09] real files a human can open and edit and

[9:11] send. The assignment required 23

[9:13] deliverables in a single prompt. Docs, a

[9:15] deck, spreadsheets with formulas and

[9:17] charts, a PDF one-pager, an interactive

[9:19] dashboard, launch communications, FAQs,

[9:22] personas, an email sequence, a risk

[9:24] assessment, a go-to-market plan, and

[9:25] more. This is the kind of task where a

[9:27] model can write something impressive and

[9:29] still fail because the deliverable is

[9:31] not have good thoughts about the launch.

[9:33] The deliverable is assemble the launch

[9:35] packet. GPT2 5.5 won this test by a wide

[9:38] margin. And yes, I am going to talk

[9:40] about the scores because it shows how

[9:41] big the victory was. The scores were

[9:43] 87.3 for 5.5, 67.0 for Opus 4.7, 65.0

[9:49] for 4.7 Sonnet, and 49.8 for Gemini 3.1

[9:53] Pro. And more importantly, 5.5 produced

[9:55] real usable artifacts. All 23 required

[9:58] deliverables were real artifact types.

[10:00] They weren't HTML or markdown wearing

[10:02] the wrong file extension. The deck had

[10:04] 17 real slides and 26 media files. The

[10:07] spreadsheets had real formulas and real

[10:09] charts. The dashboard worked and used

[10:11] the supplied logo and product hero

[10:12] image. The research file had 34 URLs

[10:15] with strong official source coverage on

[10:17] the legal and regulatory claims. And

[10:19] that legal posture is at the heart of

[10:20] this test. The other models failed at in

[10:23] different ways. Opus 4.7

[10:27] was shakier and it drifted on important

[10:29] numbers. Sonic 4.7 had useful strategy

[10:32] but under produced on the artifact

[10:34] layer. Gemini 3.1 Pro understood parts

[10:36] of the premise but several files that

[10:38] were supposed to be real documents or

[10:40] decks or workbooks or PDFs, they were

[10:42] just HTML or text files with the right

[10:44] extensions. That is not a small issue.

[10:46] You cannot send a fake PowerPoint to a

[10:48] board. The most impressive thing about

[10:50] 5.5 in Dingo was not that it finished.

[10:53] It was that it understood the posture of

[10:54] the work. It framed the launch as a very

[10:56] narrow qualified household release, not

[10:59] a broad novelty campaign. It treated

[11:01] northern candid imports as a central

[11:03] source of risk. It separated curiosity

[11:05] traffic from real buyers. And it

[11:07] repeatedly stated in the right places

[11:09] that the product doesn't make exotic

[11:11] ownership legal, simple or suitable.

[11:13] That's the kind of judgment I want from

[11:15] a model doing real executive work. Now,

[11:17] there were still defects. The PowerPoint

[11:19] had invalid XML metadata because the

[11:21] ampersand in Dingo and Co was not

[11:23] escaped correctly. One slide rounded an

[11:25] NPS number incorrectly. Some pricing

[11:27] claims were stale or imprecise. I would

[11:30] fix those before sending anything

[11:31] externally. But they are final mile

[11:33] production defects. They are not

[11:34] failures to understand the assignment.

[11:36] And that distinction matters because in

[11:38] real work, the expensive part is often

[11:40] getting from nothing to a coherent first

[11:42] version with the right structure, the

[11:44] right evidence, the right files and the

[11:46] right risk posture. 5.5 compressed that

[11:49] bit better than any model I've tested.

[11:51] And that's the first hard test. 5.5

[11:53] looks great here when job is a messy

[11:55] executive handoff. The second hard test

[11:58] is where the review gets a little bit

[12:00] more complicated. So, Splash Brothers is

[12:02] a fictional mobile detailing and car

[12:04] wash business with 465 files. And the

[12:07] folder is intentionally gross. There are

[12:09] CSV exports, Excel sheets in three

[12:11] different schemas, JSON backups, a

[12:13] corrupted JSON file, VCF contact cards,

[12:16] scan PDFs of handwritten receipts, text

[12:18] notes, conflicting service list,

[12:20] inconsistent payment records and a pile

[12:22] of junk that looks like the kind of junk

[12:24] a real small business accumulates over

[12:25] years of duct tape operations. The

[12:27] assignment is to migrate the entire

[12:29] thing into a clean database. That means

[12:31] the model has to inventory the files,

[12:33] decide what matters, parse multiple

[12:34] formats, design a schema, extract the

[12:36] records, merge duplicate customers,

[12:38] reject fake records, normalize services,

[12:40] reconcile prices, detect conflicts,

[12:42] preserve source provenance, write a

[12:44] migration report and build a review UI.

[12:47] This is not glamorous work, but a huge

[12:48] amount of real business work does look

[12:50] like this. The planted traps are a mix

[12:52] of obvious and subtle. There are fake

[12:54] customers named Mickey Mouse, test

[12:55] customer, ASDF ASDF. There's a fake

[12:58] $25,000 payment. There are duplicate

[13:00] customers, name typos, service name

[13:02] variants, inconsistent date formats,

[13:03] messy payment statuses and payment

[13:05] methods scattered across many different

[13:07] capitalizations and labels. And then

[13:09] there are the less obvious traps. An

[13:10] orphaned order tied to a customer named

[13:12] Terence Blackwood, a service code

[13:14] conflict, a handwritten receipt image

[13:16] that could easily produce false

[13:17] canonical customers if the OCR step is

[13:19] handled sloppily. Now, in previous

[13:21] checks of this evaluation, both Opus 4.7

[13:25] and 5.4 fell down in some important

[13:27] ways. For example, both thought Mickey

[13:29] Mouse was a real customer. Test customer

[13:31] became a real customer. ASDF ASDF became

[13:33] a real customer. The fake $25,000

[13:36] payment got normalized and counted as

[13:37] revenue. Those are the mistakes that

[13:39] make you sit up straight because a real

[13:41] human catches those really quick. If the

[13:43] model misses them, you can't treat the

[13:44] migration as production safe. 5.5 is the

[13:47] first model to catch the mistakes I

[13:48] planted in the data on purpose. It

[13:50] rejected Mickey Mouse. It rejected test

[13:52] customer. It rejected ASDF correctly. It

[13:55] rejected the fake orders and the fake

[13:56] $25,000 payment. It correctly merged all

[13:59] seven planted duplicate customer pairs.

[14:02] It caught all 13 name typo orders. It

[14:04] discovered all 465 source files. It

[14:06] produced a deterministic rebuild of the

[14:08] database. It generated a 7,287 line

[14:11] migration report with a profile audit

[14:13] trail. And it landed in 186 customers

[14:15] against a target of 192, which is pretty

[14:17] close. My previous conclusion running

[14:19] this eval has been that no frontier

[14:21] model should be safe to trust with a

[14:23] one-shot business data migration. 5.5

[14:26] narrows that claim down, but it doesn't

[14:28] eliminate it because 5.5 still missed

[14:30] service code conflicts. Its schema did

[14:33] not include a service code column, which

[14:35] meant one of the planted conflicts could

[14:36] not even be represented in the final

[14:38] output. It did create Terence Blackwood

[14:40] as a canonical customer instead of

[14:42] sending that record to human review. It

[14:44] left payment status with 29 distinct raw

[14:46] values and left payment methods

[14:47] unnormalized and overproduced services

[14:50] and jobs and built a review UI where two

[14:52] parts of the interface disagreed on the

[14:53] number of flagged items. And that

[14:55] failure pattern is very instructive. 5.5

[14:57] got much better at the areas that are

[14:59] semantically obvious to a human. Fake

[15:01] records, duplicate people, typoed names,

[15:03] absurd payments. It still struggled with

[15:05] the boring back-end hygiene that makes a

[15:07] migration durable. Enum normalization,

[15:09] service code preservation, orphan

[15:11] handling, canonical job grouping and

[15:12] reconciliation between dashboard counts

[15:15] and database counts. So, this is my

[15:17] practical read. I would absolutely use

[15:19] 5.5 as the first serious pass on a

[15:21] migration like this. I would ask it to

[15:23] inventory the files, design the schema,

[15:25] build the extraction pipeline, preserve

[15:27] source provenance, generate the audit

[15:28] report and produce the review UI. But I

[15:30] would not let it declare the database

[15:32] canonical. I would add validators. I

[15:34] would check row counts. I would inspect

[15:35] enum maps. I would require service code

[15:37] in the schema. And I would have a human

[15:39] approve canonical merges before anything

[15:41] last staging. That's not a criticism of

[15:43] 5.5. That's just the correct way to use

[15:45] it. The model can compress a fair bit of

[15:47] the middle of the work, but production

[15:49] trust still comes from the system you

[15:51] build around it. One important caveat on

[15:53] the 5.5 Splash Brothers results. I

[15:56] compared it directly to 5.4. And what I

[15:59] saw is that the back-end work that I'm

[16:02] calling out as an issue with 5.5 was

[16:05] actually a little better with 5.4. And

[16:07] so we're in this interesting position

[16:08] where you can see some regression in 5.5

[16:12] around some of the back-end database

[16:14] hygiene discipline that 5.4 got right.

[16:16] But you see a lot of progress when it

[16:18] comes to the intuitive stuff that a

[16:20] human would catch very quickly, like the

[16:22] Mickey Mouse example. So, what I want to

[16:24] leave you with is one, no model is

[16:26] perfect. Two, if I had to pick right

[16:29] now, what I would do is I would use 5.5

[16:32] prompted carefully for clear, complex

[16:35] work on the back-end. And I would trust

[16:37] it more with that front-end intuitive

[16:39] work that adds a layer of polish to the

[16:42] finished database migration effort. All

[16:44] of that to say, understand that when

[16:46] you're testing models at the frontier,

[16:49] you're going to get interesting results

[16:51] like that. Places where the model

[16:52] regresses unexpectedly. This is exactly

[16:55] what we would expect from a model tested

[16:57] on a private benchmark because you see

[17:00] places where the generalization just

[17:02] doesn't work as well. This is something

[17:03] that's easily fixable with a harness and

[17:05] a good prompt. My prompt here was

[17:07] intentionally messy and badly formed and

[17:09] that's part of the challenge. So, not

[17:12] something you need to worry about a

[17:13] whole lot if you're using 5.5, not a

[17:15] reason to go back to 5.4, but a callout

[17:18] for those who like to dive deep. When

[17:19] you put Dingo and Splash Brothers next

[17:21] to each other, the picture of the

[17:22] release gets more complete. Dingo says

[17:24] 5.5 can get remarkably close to a real

[17:27] executive handoff. Splash Brothers says

[17:29] it can do a serious first pass on messy

[17:31] production data, but it cannot be the

[17:33] final authority. The third test is

[17:35] different yet again because it shows the

[17:36] part of the Open AI stack that still

[17:38] needs help. The Artemis 2 test asks the

[17:41] model to build an interactive 3D

[17:43] visualization of NASA's Artemis 2

[17:45] mission. No facts are provided, no tech

[17:47] stack is specified. The model has to

[17:50] research the mission, build the SLS

[17:52] vehicle, animate the launch all the way

[17:54] through lunar flyby and return and

[17:55] create the environment, add the

[17:57] controls, support timeline scrubbing,

[17:59] make components clickable and make the

[18:00] artifact ultimately educational. This

[18:02] test is very different from Dingo and

[18:05] Splash Brothers. A model can get the

[18:06] research right and still build a very

[18:08] ugly visualization. It can build

[18:10] something beautiful while hallucinating

[18:11] the mission. It can animate the rocket

[18:13] but fail at the controls. It can produce

[18:15] something technically interesting that

[18:17] no one wants to look at. Both 5.5 and

[18:19] Opus 4.7 got the core mission shape

[18:22] right here. They understood that Artemis

[18:24] 2 is a lunar flyby, not a landing and

[18:26] not a lunar orbit. The trajectories were

[18:28] not perfect in either case, but they

[18:29] were reasonable for a browser

[18:31] visualization. Neither model collapsed

[18:33] Artemis 2 into Apollo or Artemis 1 or

[18:35] Artemis 3. Now, the key difference that

[18:38] showed up was in presentation. 5.5

[18:40] leaned into information density.

[18:42] Clickable bubbles and panels and dense

[18:43] labels and multiple ways to surface

[18:45] facts. If the goal was to learn, the 5.5

[18:48] build did a lot right. But visually, it

[18:51] looked more cartoonish than it should

[18:53] have. The scale felt off. The

[18:54] proportions were not as grounded. The

[18:56] scene lacked the visual authority that a

[18:58] NASA mission deserves. Opus 4.7 made the

[19:01] opposite trade-off. The visuals were

[19:03] substantially stronger, better lighting,

[19:05] better composition and a more grounded

[19:06] scene. It felt more like something you

[19:08] would actually want to show someone, but

[19:10] the information was less immediately

[19:12] discoverable. Neither model nailed the

[19:14] controls. Both needed another pass. Opus

[19:16] had a sort of strange semi-transparent

[19:18] Earth issue. 5.5 had scale and style

[19:21] problems. If I were turning either one

[19:23] into a final public artifact, I would

[19:25] probably start from the Opus version and

[19:27] add 5.5's information density over the

[19:29] top. And this is where routing starts to

[19:31] matter, right? I I don't yet trust 5.5

[19:34] to invent by itself a beautiful

[19:36] front-end or visual style from a blank

[19:38] page the way I trust Opus. Claude still

[19:40] has an edge in visual composition, in

[19:42] taste, in blank canvas front-end craft.

[19:44] But I do trust 5.5 to implement a strong

[19:47] visual reference faithfully. And that's

[19:49] why Images 2.0 changes the workflow.

[19:51] Instead of asking 5.5 to invent taste

[19:54] from nothing, you can generate a strong

[19:55] mock-up, hand that image to 5.5 inside

[19:58] Codex, and ask it to build the working

[19:59] version against the reference. Inventing

[20:01] taste is hard. Implementing to a target

[20:03] is much easier. That's the practical

[20:05] difference between just picking a model

[20:07] no matter what and like figuring out

[20:09] what actually works. I'm not here for

[20:11] blind model loyalty. I'm here for

[20:12] finding the real ways we can use models

[20:15] in harnesses to get work done. If I need

[20:17] back-end volume, audit depth, tool use,

[20:19] and completion, I'm going to reach for

[20:21] 5.5. If I need a blank canvas visual

[20:23] taste, I still want Opus. If I need a

[20:26] strong user interface that actually

[20:27] works, I increasingly want a reference

[20:29] image plus 5.5 in Codex. Now, I hope the

[20:32] larger pattern is coming into focus

[20:34] here. 5.5 isn't perfect. It's not magic.

[20:37] It's not the best model at every task,

[20:39] but it is the strongest default for

[20:40] complex work that I've used because it

[20:42] carries more of the task before it drops

[20:44] the thread, which brings us to the

[20:46] fourth part of this video. Why Codex

[20:48] matters so much for 5.5. I've been using

[20:50] Codex more than ChatGPT for serious work

[20:52] recently, and 5.5 makes that distinction

[20:55] much sharper. ChatGPT is still a broad

[20:57] consumer surface. It's good for quick

[20:59] questions and search and image work and

[21:01] voice and general assistance and fast

[21:03] thinking, but Codex is increasingly

[21:05] where work actually happens. That

[21:07] matters because a model this strong

[21:09] trapped inside a chat window is very

[21:11] underused. Inside a chat window, 5.5 can

[21:13] tell you what to do. Inside Codex, it

[21:15] can inspect files. It can edit code. It

[21:17] can run commands. It can drive a

[21:18] browser. It can test interfaces. It can

[21:20] read docs. It can generate artifacts and

[21:22] iterate on its own output. That's a

[21:24] different product. The model's not just

[21:26] responding. It's working in the

[21:27] environment where the task lives. This

[21:29] is why the model plus system argument is

[21:31] not an abstract one in 2026. Most useful

[21:34] work still doesn't happen in clean

[21:36] surfaces. It happens in messy folders

[21:39] with web apps, with PDFs, with

[21:41] spreadsheets, with desktop interfaces,

[21:43] with internal tools, with

[21:44] half-maintained systems, and documents

[21:46] that were never designed for automation.

[21:48] A model that can operate across those

[21:50] surfaces can reach much more of the

[21:52] world than a model limited to a text

[21:54] prompt. And 5.5 inside Codex feels like

[21:57] a step in that direction. It can hold a

[21:58] task across many, many steps. It can

[22:00] inspect the code base. It can run a

[22:02] test. It can hit an error. It can revise

[22:04] the plan. It can patch the file and test

[22:06] again and then tell you what changed.

[22:08] It's a monster. It can generate a

[22:09] document and render it and notice the

[22:11] layout is broken and fix it and

[22:13] re-render. That's the kind of work where

[22:15] intelligence and agency multiply each

[22:17] other. A smarter model matters more when

[22:19] it has tools. Better tools matter more

[22:21] when the model is smart enough to use

[22:23] them without constant supervision.

[22:24] That's the loop 5.5 improves inside

[22:27] Codex. And this is also why availability

[22:29] is a part of product quality. The best

[22:31] model in the world is not useful if you

[22:33] can't use it when you need it. Compute

[22:35] constraints show up as caps, as degraded

[22:37] experiences, as slowdowns, as weird

[22:38] routing decisions, as limited sessions,

[22:40] and moments where the model you want is

[22:42] just not available. The public status

[22:44] pages from Anthropic and OpenAI tell a

[22:46] real story here. Anthropic's 90-day

[22:48] status page has recently shown

[22:50] materially lower uptime across Claude,

[22:53] the Claude console, the Claude API, and

[22:55] Claude code versus OpenAI's status page.

[22:57] And to give you a sense of that, we

[22:59] measure reliability in nines, and many

[23:02] of Anthropic's services are at one nine

[23:05] of availability right now. That means

[23:07] 90-some percent, right? Not 99, 97,

[23:10] maybe 98. It's not the same thing. By

[23:12] contrast, OpenAI's services, as of this

[23:15] recording, are showing three nines in

[23:18] places, sometimes two nines, but every

[23:21] nine of availability indicates another

[23:24] step change in value for a model that

[23:27] has to be up all the time for real-world

[23:29] work. And so, if you're doing serious

[23:31] work, you have to ask yourself, am I

[23:33] willing to tolerate gaps in compute? And

[23:36] I share this not because I'm reasoning

[23:37] only from the numbers. I think the

[23:39] numbers tell a story that we're also

[23:41] hearing in anecdotes from serious Claude

[23:43] users. There have been widespread

[23:45] reports coming in to me personally and

[23:48] also across the internet of frustration

[23:50] with Claude's availability over the last

[23:52] month. It is not an accident that

[23:54] Anthropic has cut deals for more than 10

[23:56] gigawatts of compute in the last 30

[23:59] days. It needs it because right now

[24:01] demand for Claude is outstripping

[24:04] availability across the board. And when

[24:05] demand outstrips availability, you do

[24:08] have issues. And that's why I want to

[24:10] call out the reliability you get with

[24:12] 5.5 does matter these days. And that may

[24:14] flip, right? This is always an ongoing

[24:17] journey. As Dario says, the rainbow

[24:19] continues. We'll see what the next

[24:20] chapter has. Without further ado, here's

[24:23] how I'm routing work now based on all of

[24:25] this testing. For complex multi-step

[24:27] execution, 5.5 is now my first call. If

[24:30] the task involves files or code or tools

[24:33] or documents or browser use or data or

[24:35] spreadsheets or artifacts or anything

[24:37] that has to be carried through multiple

[24:38] steps, I start in 5.5. The longer and

[24:41] messier the job is, the wider that gap

[24:43] feels. For blank canvas front-end taste,

[24:45] I still often start with Opus 4.7.

[24:47] Claude continues to make stronger visual

[24:50] designs when there's no reference image

[24:51] and no design system, and that does

[24:53] carry through into beautiful

[24:54] PowerPoints, maybe beautifully designed

[24:56] spreadsheets, that kind of thing. If the

[24:58] question is make this beautiful from

[25:00] scratch, Opus is still very much in the

[25:02] conversation. For UI work where I want

[25:04] both taste and production strength, I

[25:06] want a reference first. I could generate

[25:08] the mock-up with Images 2.0. I might

[25:10] also start with Claude design and let

[25:11] them bake off.

[25:13] I could use a screenshot. I could give

[25:14] the model a clear visual target. But

[25:16] regardless, I'm going to hand it over to

[25:18] 5.5 Codex and ask it to implement that

[25:21] work faithfully and see where I get

[25:23] first. And then, if I want to, if I'm

[25:25] starting with Claude design, I feel like

[25:27] Claude design came out with a stronger

[25:28] model, then maybe I'll give it to a

[25:30] bake-off between Claude code and 5.5.

[25:33] But either way, I think 5.5 ought to be

[25:35] in the mix because of the strength of

[25:37] the model at long-running code execution

[25:39] with high correctness. For engineering

[25:41] work, I like it to model workflow as

[25:43] well. Opus 4.7 is strong at planning, at

[25:46] thinking through the shape of the work

[25:47] overall, and the customer value. 5.5 in

[25:50] Codex is excellent at execution, at

[25:52] testing, and carrying the work through.

[25:53] Combining them together is often better

[25:56] than pretending one model should own the

[25:58] whole pipeline. For writing, 5.5 has

[26:00] taken a real step forward, and the

[26:02] improvement is not just sentence

[26:03] quality. It's structure. Most AI writing

[26:05] failures are shape failures. The model

[26:08] writes an introduction, a bunch of body

[26:09] sections, and a conclusion, but the

[26:11] argument doesn't build. The sections sit

[26:13] next to each other instead of moving the

[26:15] viewer forward. The transitions are

[26:16] generic. The nuance gets kind of

[26:18] averaged out. The piece answers a prompt

[26:20] instead of actually writing well toward

[26:22] a case. 5.5 is actually much better at

[26:25] holding the shape of a long argument. It

[26:27] still needs taste. I would not publish

[26:29] raw output without editing, but I'm

[26:30] willing to trust it with more of the

[26:32] structure and more of the first serious

[26:34] draft than I was with any previous

[26:35] OpenAI model. For data work, I use 5.5

[26:38] aggressively but with validation built

[26:40] in. Don't ask the model to finish the

[26:42] migration and trust the results. Ask for

[26:44] source provenance. Ask for rejected

[26:46] records. Ask for duplicate logic. Do

[26:48] that detailed prompting. Splash Brothers

[26:50] is our reminder here, right? 5.5 found

[26:52] Mickey Mouse. It still missed the

[26:54] careful back-end hygiene, and there was

[26:55] a bit of regression there. For

[26:57] research-heavy work, I want the model to

[26:59] dig into sources and uncertainty, and I

[27:01] need to expect to do that myself before

[27:03] I approve it. Artificial Analysis

[27:04] actually flagged this by calling out

[27:07] that the model felt overconfident even

[27:10] as it did excellent work. And that's an

[27:12] interesting nuance with 5.5 that you

[27:15] should be aware of. So, use 5.5 as the

[27:17] default for serious execution. Use Opus

[27:20] where taste and critique are better. Use

[27:22] Images 2.0 or a reference image when

[27:25] visual direction matters. Use validation

[27:27] whenever the output touches anything

[27:30] serious, right? Money, law, operations,

[27:32] production data, or anything where being

[27:34] confidently wrong gets very expensive.

[27:36] The future of AI use is not one model,

[27:39] people. It's routing. The people who get

[27:41] the most out of the frontier are going

[27:42] to be the people who know which system

[27:44] to use for which task. But today, if you

[27:47] force me to use a model that tends to

[27:49] become a default for a lot of different

[27:51] work day-to-day, my answer is going to

[27:53] be 5.5 in Codex today because that's

[27:55] where I see the most value right now.

[27:57] So, the bottom line is this. 5.5 is the

[27:59] strongest model in the world today, and

[28:01] the ways in which it is the strongest

[28:03] matter more than the ways in which it

[28:05] isn't. It's especially good at complex,

[28:07] messy, multi-step, tool-heavy work. It's

[28:09] meaningfully better at long writing

[28:11] structure than previous OpenAI models.

[28:13] It's great inside Codex. It benefits

[28:16] from the surrounding OpenAI release

[28:17] cadence in a way that few model releases

[28:19] do. Images 2.0 helps with visual

[28:21] direction. Codex gives the model a place

[28:24] to act. 5.5 supplies the reasoning and

[28:26] persistence to do real work. The three

[28:28] tests tell the story in a way that no

[28:31] single publicly available benchmark will

[28:33] do. I think Dingo shows the promise of

[28:35] complex executive-level knowledge work.

[28:38] 5.5 can take a strange business

[28:40] situation, a pile of evidence, and

[28:42] produce something that's sort of usable

[28:44] as a first draft for an executive

[28:45] handoff. The Splash Brothers company

[28:47] example shows the issues around

[28:49] duplicates, around fake records, but

[28:51] also shows the promise in catching some

[28:53] of those things that only humans have

[28:54] caught previously and no previous model

[28:56] caught, like the fake customers. Artemis

[28:58] shows where you have to really think

[28:59] through visual presentation because 5.5

[29:02] was strong on information density but

[29:03] just couldn't produce a final artifact

[29:05] that was as stunning, as beautiful, as

[29:07] Opus did. None of this is to suggest

[29:09] that 5.5 is a replacement for human

[29:11] judgment. It is not the best taste model

[29:13] on the frontier. It is not safe to trust

[29:15] blindly with final production data. I

[29:17] would trust no model blindly with final

[29:19] production data. It still needs review

[29:21] and validation and direction from

[29:23] someone who knows what good looks like.

[29:24] But it is the new high-water mark for

[29:26] what a single model can carry in real

[29:28] work. And high-water marks matter. They

[29:30] change what users are willing to try,

[29:31] how ambitious the prompt gets, how much

[29:33] work we will delegate, and what products

[29:35] become possible to build around the

[29:37] model. I'll give you a couple of

[29:38] examples that are really fun here. There

[29:40] are new million-dollar businesses

[29:42] waiting to be built around the

[29:44] capabilities that 5.5 unlocks. And I've

[29:46] illustrated some of the challenges that

[29:48] the model can tackle in the tests I've

[29:50] done. Two business ideas, if you're

[29:52] interested in the combination of 5.5 and

[29:55] images and Codex. Like what can you do

[29:57] with all of those together? Number one,

[29:59] there is probably a million-dollar small

[30:01] business waiting to be built in the

[30:03] Apple App Store or somewhere like that

[30:05] for palm reading. Because Images 2.0 can

[30:08] provide a reasonable palm read and Codex

[30:11] can help you build a app for that task

[30:15] with a front-end designed by Images 2.0

[30:18] itself. That's an example of how you can

[30:20] tie all of those three release products

[30:22] together into something that is not

[30:23] enterprise scale at all, but it's

[30:25] definitely side gig solopreneur scale.

[30:28] Another example, you can get a custom

[30:31] Lego business going because Images 2 is

[30:34] now good enough that it can design for

[30:36] you a small Lego set from a prompt with

[30:39] accurate part numbers from Lego. And so

[30:42] you can imagine you can use Codex to

[30:44] start to put together an app for that.

[30:46] You can use Images 2 to design the UI

[30:48] and Images 2 to power some of the custom

[30:50] Lego presentation. And then you have to

[30:52] figure out the supply chain on the Lego

[30:53] side, but it could be a fun little

[30:55] business for someone. And I'm not saying

[30:56] this because 5.5 is only going to be

[30:58] useful for small business, but I am

[31:00] calling it out because I think often

[31:01] times people hear me talking about

[31:03] enterprise use cases and they think

[31:04] these models are only good if you have

[31:06] 500 or 5,000 or 50,000 or 500,000 people

[31:09] in your company. That's not true. These

[31:11] models offer individuals really cool

[31:14] opportunities to build new stuff. And

[31:16] the two examples I gave are not

[31:18] businesses that were really possible

[31:19] even a week ago. And so look for those

[31:22] as ways to see how models improve. Look

[31:25] for those kinds of examples. And I'm

[31:27] going to close with this reminder. If

[31:29] you are testing models from here out on

[31:31] easy tasks, you are missing the point.

[31:33] The previous models are already good

[31:35] enough for easy tasks. To see what

[31:37] changed, you are going to have to give

[31:39] it the kind of work that used to break

[31:41] models just a few months ago. The

[31:42] multi-artifact briefs, the data piles,

[31:44] the gigantic loops, and more. And you

[31:47] can't really do it in a chat window

[31:49] anymore. The chat window use case is

[31:51] saturated. When you test that way, this

[31:54] release starts to make sense. The model

[31:56] is smarter in quick mode because the

[31:58] underlying pre-trained is better, I

[31:59] think. It is stronger in thinking mode

[32:02] for the same reason, I think. It is Open

[32:04] AI won't release these things and tell

[32:06] you this is what we're guessing. It is

[32:07] better wrapped inside Codex than any

[32:09] previous Open AI model has been. It

[32:11] pairs naturally with Images 2.0 on

[32:13] visual work. And it appears available

[32:15] enough to become a daily default rather

[32:18] than a special occasion tool. So the old

[32:20] question feels too small. The

[32:22] interesting question is not can 5.5

[32:24] answer better than 5.4. The interesting

[32:26] question is what can I now ask it to do?

[32:29] And for the first time in a while, that

[32:31] question has a much bigger answer than

[32:32] it did a week ago.
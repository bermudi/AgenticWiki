---
title: "Learnings from a No-Code Library: Keeping the Spec Driven Development Triangle in Sync"
author: "Drew Breunig"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=8TXAlOFkmk0"
date_saved: "2026-06-07T04:09:24.413Z"
type: youtube
date: 2026-06-07
ingested: 2026-06-07
---

# Learnings from a No-Code Library: Keeping the Spec Driven Development Triangle in Sync

[0:00] So welcome. Uh I was invited here today

[0:04] to talk about um a project I launched uh

[0:08] which was a software library with no

[0:09] code. Um which got a lot of really

[0:14] interesting feedback. Um we can tell you

[0:16] the whole story about it real quick. Um

[0:18] but I'm actually going to tell you how I

[0:19] got it wrong. Um and I'm going to set

[0:24] kind of a a path forward and if time

[0:25] we'll have some a little bit of a

[0:27] workbenchy type flow. Um, but before we

[0:30] get started, so my name is Drew Brunig.

[0:33] I write about technology, data, AI,

[0:36] geospatial, um, with a focus on the

[0:38] language around them and how to

[0:39] effectively communicate them to a wider

[0:41] audience. Um, as AI and AI coding, AI

[0:45] software engineering has grown, the

[0:48] questions around this have gotten more

[0:49] interesting um, and more applied on my

[0:51] blog. So, it it is whatever I'm

[0:53] interested in. Um I recently co-founded

[0:56] a startup focused on compound AI

[0:58] research and agentic systems called

[1:00] compound. Um we are focused on DSPI and

[1:04] associated software and research. Um and

[1:07] I'm currently editing the context

[1:09] engineering handbook for O'Reilly. Um

[1:11] which hopefully will come out later this

[1:13] year um probably earlier in beta, but

[1:16] I'm very excited about that.

[1:19] So, a while back, um, like I'm sure a

[1:22] lot of you in this room, uh, when Opus

[1:24] 45 launched, everybody's kind of like

[1:27] put back in their seats with the quality

[1:29] of the code that Opus45 is writing, how

[1:32] long it can run, um, how what problems

[1:34] it can solve. And suddenly you start

[1:36] asking questions like, hey, this is good

[1:38] enough. And then I started thinking

[1:40] about open source. Um, I work in open

[1:42] source. I think about open source a lot.

[1:44] And I started wondering if the agents

[1:47] are good enough why do we need to share

[1:49] code? Um

[1:52] so it's kind of a thought experiment

[1:54] question we start from and you know

[1:56] there's lots of reasons you can come up

[1:57] with with reasons uh and I would as I do

[2:00] anytime I have a big question that I

[2:02] can't really answer. I went for a long

[2:04] bike ride and while I was bike riding I

[2:06] came up with words which was a the idea

[2:10] to ship a software library with no code

[2:13] open source freely licensed um it's a

[2:17] GitHub repository that has um a markdown

[2:20] file that details what the software

[2:22] library is supposed to do. It's um I'm

[2:25] sure you've run into this before. It's a

[2:28] uh software library that takes a Unix

[2:31] date or date stamp or similar and

[2:33] converts it into something human

[2:35] readable. So about 12:00, 5 hours ago,

[2:39] you know, things like that. Um and then

[2:43] I also generated about 750 tests uh a

[2:47] conformance tests. So basically if given

[2:50] this input, I expect this output um in

[2:54] YAML. And then one more file called

[2:57] install.md which was a single paragraph

[3:00] that you would paste into the agent of

[3:02] your choice which had all the

[3:04] instructions necessary for building the

[3:06] code. You would drop in what language

[3:07] you wanted it in and where you wanted to

[3:10] save it. Um and this blew up. It kind of

[3:13] became this really popular thing has

[3:15] over a thousand stars on GitHub. It kind

[3:18] of kicked off this idea of of specri

[3:21] development which I did not coin. I'm

[3:23] not the inventor of I don't like to try

[3:25] to stake out a word. Um but it's

[3:27] something that more and more people land

[3:29] at my site searching for. Um and it's

[3:32] this idea that if you bring specs which

[3:35] defines the what, why, and sometimes how

[3:38] and the tests which measure and validate

[3:40] behavior, the code will just flow from

[3:42] that. You you kind of give it an agent

[3:44] and then you get the code out. And so

[3:46] this is kind of what we did with

[3:48] onewords. We called it spec development.

[3:50] We launched it. Like I said, it has a

[3:52] thousand stars. People started building

[3:55] um examples. Um what was even crazier is

[3:59] um I started to get normal kind of

[4:02] GitHub interactions. I got lots of

[4:05] stars. Um people submitted issues. They

[4:08] submitted poll requests. My and the poll

[4:10] requests were good. They're like in this

[4:12] test you are expecting this result, but

[4:15] this violates the rounding rule that you

[4:18] detail in the spec. you need to chew

[4:20] these two things up. And I'm like,

[4:21] that's fantastic. And I'm like, write

[4:24] that up. I want to have more

[4:25] contributors. So, I got more

[4:26] contributors on this. They're actually

[4:27] submitting poll requests. So, this was

[4:30] kind of the first volley and it blew up.

[4:32] But shortly after that, I wasn't the

[4:35] only one to have this idea. Um, either

[4:36] people had these ideas shortly after or

[4:38] they were already incubating it. And you

[4:40] started to see larger teams ship larger

[4:43] projects. Winwords was kind of a toy. It

[4:45] was pretty small. It was constrained.

[4:47] 750 tests. Great. But we started to see

[4:50] larger projects. So Verscell released

[4:53] just Bash, a library that I love, which

[4:55] is a simulated bash environment with an

[4:58] in-memory virtual file system written in

[5:00] Typescript. They basically are

[5:01] re-implementing Bash in Typescript. And

[5:04] why? There's lots of reasons you want to

[5:06] do that. I'm not going to get into that,

[5:07] but it's great for sandboxes or when you

[5:09] don't want a sandbox, but you want an

[5:11] emulation instead. And how are they

[5:13] doing it? They're writing a bunch of

[5:14] shell scripts and then just making it

[5:16] work. run it in bash, then run it in

[5:18] this and make sure it does exactly what

[5:20] you should do. Um, Pyantic released

[5:22] Monty, which in the classic era of our

[5:26] time, it's implemented in Rust. Um,

[5:28] which is a Python interpreter written in

[5:30] Rust. So now I have a incredibly fast

[5:32] Python interpreter I can call from

[5:33] Python to do the same thing. It's now

[5:35] kind of an agent ripple um that is safe,

[5:38] isn't going to do anything wrong, isn't

[5:40] going to run away, and it's fast. Um,

[5:42] and they're doing the same thing. Hey,

[5:44] they got a bunch of Python tests. We're

[5:46] going to throw it at that. And then

[5:47] Enthropic famously for 4.6 threw 16

[5:52] claws and $20,000 at a spec test spec

[5:55] suite to build a rustbased C compiler.

[5:57] It didn't really work, but it was pretty

[6:00] cool. And so you started to see these

[6:02] things and I started to think to myself,

[6:05] this is really interesting. We've got

[6:06] something going here. This specri

[6:08] development is something really

[6:09] interesting. But we have some learnings

[6:12] here. The first learning is that tests

[6:15] and specs are not free or easy. All of

[6:18] the projects we surveyed used large

[6:21] existing testing libraries from existing

[6:24] projects. The Bash library, the Python

[6:26] library, the C library. Those are the

[6:28] lowhanging fruits. I joked online and I

[6:31] I'm not the first one to make this joke

[6:32] that pretty soon anyone who wants to

[6:34] kind of protect themselves is going to

[6:36] be like SQLite where the code is free

[6:39] but you got to pay for the tests. And

[6:42] we're going to start to see that TL draw

[6:44] just re withdrew all its tests because

[6:46] it was tired of the slop. And so tests

[6:48] are hard.

[6:50] The second is that implementation is

[6:53] fast but not instant. You go really fast

[6:56] at first. 16 claws, $20,000. You can

[6:59] make yourself a fake C compiler. But

[7:01] none of these projects are complete.

[7:03] None of them. The B just bash still

[7:06] isn't complete. They're still working on

[7:07] it. It's good. It's not complete. Python

[7:09] still not complete. Monty and like and

[7:12] again the C1 just kind of stalled out.

[7:14] They when it it gets hard like it's not

[7:17] perfect and it's not free.

[7:21] The third thing is is as complexity

[7:22] grows structural choices become more

[7:24] important. This was especially clear in

[7:26] the anthropic project where they got

[7:28] really really really far had 1% of test

[7:30] remaining but every time they fixed a

[7:32] new bug it would break something else.

[7:33] So it became systemic changes that they

[7:35] had to think about. They couldn't just

[7:37] let the thing figure it out. And guess

[7:39] what? they're probably gonna train

[7:40] Claude on systemic thinking and looking

[7:43] at large code spaces and so maybe you'll

[7:45] get closer but still and then also

[7:48] architectures that allow parallel

[7:50] development are incredibly valuable

[7:52] incredibly because what it allows you to

[7:54] do is it allows you to move fast with

[7:56] multiple agents but also importantly and

[7:58] this is the thing I haven't seen yet it

[8:00] allows for open source contribution so

[8:03] rather than me spending 20,000 of my

[8:05] dollars to build a C compiler what if I

[8:08] structured it perfectly so so that

[8:09] everyone knows what they can work on and

[8:11] they can check out a little chunk and

[8:12] build it. For people who are as old as

[8:14] me, it's like SEI at home. Uh where it's

[8:17] like an open source project with a bunch

[8:18] of bugs. You go check out some stuff

[8:20] then push them in. I'm not using your

[8:23] engineering expertise. I'm lo using your

[8:25] clawed code subscription. Um which I

[8:28] think is wild.

[8:30] But I think the biggest learning and

[8:32] what we're going to talk about today is

[8:34] that sometimes specs and tests aren't

[8:36] sufficient.

[8:39] is a really big one. One of my favorite

[8:40] things to do is look at the PRs and

[8:43] issues for all of these libraries

[8:46] because you would think with great spec.

[8:49] Hey, just make it run Python perfectly

[8:51] in Rust. Here's all the tests. Just make

[8:53] the test pass. They still have

[8:55] discussions about what's the right way

[8:58] to implement it. Please refer to our

[9:00] code to figure out what's the right way

[9:01] to implement. And these discussions,

[9:03] this is a 20 comment thread going back

[9:05] and forth. And the reason this is is

[9:08] because no spec is perfect.

[9:12] And and this is probably my biggest

[9:14] takeaway today, guys. Implementing the

[9:17] code helps us improve our spec.

[9:22] So let's think about that for a bit

[9:24] because we're going to take a little

[9:25] digression here. So speaking of code,

[9:30] let's talk about code. We're at the

[9:33] Computer History Museum right now. And

[9:35] so let's dive back into history. One of

[9:39] the things I joke about AI development

[9:41] is a joke that I stole from Matt Lavine.

[9:43] How many of you guys read Money Stuff by

[9:45] Matt Lavine? Love it. It's my favorite

[9:47] newsletter. But he writes about how the

[9:49] crypto people were trying to build

[9:51] systems and build like a new financial

[9:53] infrastructure. And he jokes that the

[9:55] crypto people are speedrunning financial

[9:59] history and rediscovering all the

[10:01] problems from first principles. We are

[10:04] doing that with software engineering

[10:06] with AI coding.

[10:10] But inventing from first principles

[10:12] often means rediscovering from first

[10:15] principles. So

[10:18] I am lucky enough that I work with one

[10:22] of my co-founders. Heather Miller is a C

[10:24] professor at CMU and she is an expert in

[10:27] programming languages. So, I can call

[10:28] her up and I can share my theories with

[10:30] her and say, "Heather, tell me that this

[10:33] has already been dealt with and solved

[10:34] and who should I be talking to is

[10:36] already familiar with these problems."

[10:37] And she's like, "Of course it has Drew.

[10:39] There's an entire academic history. I'm

[10:42] going to introduce you to my uh office

[10:45] neighbor who is another professor,

[10:46] Claire. Um, I forget Duess. Her

[10:50] pronunciation guides at the end. um and

[10:53] she walked me through software history

[10:54] and I'm going to reframe it for you here

[10:56] because it is incredibly informative to

[10:58] our current situation.

[11:02] So we're going to talk about the two

[11:04] terms the software engineering the birth

[11:06] of that term and we're going to talk

[11:08] about the software crisis which is

[11:10] another term that came up at around the

[11:12] same time

[11:14] in 1963. Margaret Hamilton, she was led

[11:18] the uh software effort for NASA for the

[11:20] Apollo missions. Um she coined the term

[11:23] software engineering because as she's

[11:25] running this giant large complicated

[11:27] project that can't have errors in it,

[11:30] she realizes that this is engineering.

[11:33] All the hardware guys are like, "It's

[11:35] not engineering." She's like, "No, it

[11:36] is. It's systems design. We have to

[11:38] worry about errors. We have to worry

[11:40] about unexpected things like astronauts

[11:42] pushing the wrong button. This is

[11:44] engineering. And we have a field of

[11:46] software engineering, but also we're now

[11:49] we now have enough code that it's

[11:51] complicated enough that no one person

[11:53] can hold it in their head. And that's a

[11:55] problem because then they can't reason

[11:57] about it effectively. And it gets even

[11:58] worse when a team is working on it. And

[12:01] she was right.

[12:03] By the way, um

[12:06] this is her code. This is what she was

[12:09] managing.

[12:11] This is her VS code.

[12:14] And this is her git,

[12:17] by the way. Um, I'm a dad, which means

[12:20] dad jokes come naturally to me. So, I'm

[12:22] going to retroactively coin Hamilton's

[12:25] law,

[12:27] which is when you can't see over your

[12:29] code, you can't oversee your code.

[12:32] I'm sorry,

[12:35] but anyway, I digress.

[12:39] So after Hamilton dealt with this

[12:42] problem, everyone else kind of realized

[12:43] it was a problem too. So uh NATO had a

[12:47] um a conference in Berlin uh and they

[12:52] realized that they were facing down a

[12:54] crisis, the software crisis, which is

[12:56] that computer hardware allowed programs

[12:59] so complex that they couldn't be managed

[13:02] adequately. A single engineer couldn't

[13:04] hold all the code in their head. And if

[13:06] they were going to make progress, they

[13:08] were going to continue to have the rates

[13:10] of return and fulfill what software

[13:11] could promise, they needed process to

[13:14] help them manage it. And uh Dystra

[13:17] popularized this in 72, a bit later in

[13:20] his Turing Award speech. In fact, he

[13:22] said this quote, "As long as there were

[13:25] no machines, programming was no problem

[13:27] at all. When we had a few weak

[13:29] computers, programming became a mild

[13:31] problem. And now we have gigantic

[13:33] computers and programming has become an

[13:36] equally gigantic problem. And he said

[13:38] this in 1972.

[13:42] So we should walk around this museum and

[13:44] look at what he was working with at 1972

[13:46] and consider what we are working with

[13:47] today. So after the software crisis

[13:50] emerged, what do we do? We wandered

[13:53] through the desert of processes

[13:55] searching for one to borrow. We looked

[13:58] at manufacturing engineering for

[14:00] inspiration. In 75, Brooks publishes the

[14:03] mythical man month, which is, you know,

[14:05] basically sets the table for it. And

[14:08] finally, we arrive at waterfall, which

[14:10] is exactly like the manufacturing

[14:13] genius. Uh, and it gets accepted as a

[14:15] DoD standards. We found progress. We now

[14:19] could engineer complex software. And

[14:22] this was great for a while, but these

[14:25] things move in cycles. And eventually,

[14:27] we go back and we blew it all up. In

[14:30] 2001, we published the manifesto for

[14:32] agile software development. Zuckerberg

[14:35] said, "It's time to move fast and break

[14:36] things. We embraced agile and agile was

[14:40] finally finally realized by the cloud

[14:42] and GitHub, which allowed us to

[14:44] continually run CI/CD and deliver and

[14:48] offload all of that process and error

[14:51] checking so we didn't break things that

[14:53] much even when we move fast."

[14:57] Which brings us to today.

[15:01] And um this was I added a slide right

[15:03] before this because I logged into

[15:04] Twitter to check something. And what's

[15:06] today's trending news? AI coding boosts

[15:10] output but overwhelms human reviews.

[15:13] By the way, I love the last one. Open AI

[15:15] codeex leaks hint at GPT 54 amid speedy

[15:19] updates. So not only is it overwhelming

[15:20] us, it's moving faster.

[15:25] So what do we learn from this history

[15:26] rabbit hole?

[15:28] The first thing we learned is that being

[15:30] overwhelmed by the volume of code isn't

[15:32] a new problem. It is what birthed

[15:35] software engineering.

[15:38] The initial software crisis was our

[15:41] inability to manage complex code bases

[15:44] that new computers allowed. Our current

[15:47] software crisis is our inability to

[15:50] manage complex code bases that new

[15:52] models allow.

[15:55] Our problem used to be that we couldn't

[15:57] hold an entire codebase in our head.

[16:01] >> Now we can't even read our entire

[16:03] codebase.

[16:06] Agentic engineering enables waterfall

[16:09] volume at the cadence of agile. And even

[16:13] this is not extreme enough. It's

[16:15] waterfall x 2 at the cadence of agile

[16:18] time 7.

[16:21] We keep oscillating historically between

[16:24] unhindered velocity and managed process.

[16:28] We could use some process right about

[16:31] now.

[16:33] Perhaps AI can help. And I'm not the

[16:35] only one asking this question. I think

[16:37] for the last couple quarters, people

[16:39] have been trying to figure out how to

[16:40] deal with this onslaught of code.

[16:48] I tried to pick the most dramatic

[16:50] screenshot, but Gas Town, as you're all

[16:52] familiar with, is an infrastructure for

[16:55] managing a coding process that grew

[16:57] beyond one man's ability to manage. Not

[16:59] even a team, one man.

[17:02] But it just moves the problem. It

[17:05] doesn't solve the problem. And even

[17:07] Steve even admits them himself from the

[17:09] Gas Town blog post. Gas Town is

[17:13] complicated. Not because I wanted it to

[17:15] be, but because I had to keep adding

[17:17] components until it was a

[17:18] self-sustaining machine. And the parts

[17:20] that it has now, well, they look a lot

[17:22] like Kubernetes made it with temporal

[17:24] and they had a very ugly baby together.

[17:28] If the process is complex, we're just

[17:30] moving the problem.

[17:33] So that's our historical digression.

[17:38] So let's go back to what we defined

[17:41] spectriven development to be. this idea

[17:44] that it's an equation that you bring

[17:45] specs, if you're lucky, you add some

[17:48] tests, you probably found some, add an

[17:50] agent, you get out code.

[17:54] I got this wrong.

[17:57] This is the wrong way to do this because

[17:59] this isn't a one-way equation. This is a

[18:02] feedback loop. The act of writing code

[18:06] improves the spec and it improves the

[18:09] tests.

[18:12] Just like software doesn't really work

[18:15] until it meets the real world, a spec

[18:18] isn't doesn't really work until it's

[18:22] implemented.

[18:24] And so I propose and introduce a new

[18:27] idea where instead of it being an

[18:28] equation,

[18:30] it's a triangle. The spec defines what

[18:33] tests need to be written. It also

[18:35] defines what code needs to be written.

[18:36] Okay, there we've reimplemented. Oh, and

[18:38] then the tests validate the code. This

[18:41] is essentially recreating what we did on

[18:43] the last slide just in a different

[18:45] shape.

[18:47] But the act of implementing code

[18:50] generates new decisions

[18:54] and that informs the spec

[18:56] and that also informs the test because

[18:58] now we have to add new tests because the

[19:00] spec got updated.

[19:02] And sometimes it's not new decisions,

[19:04] it's just dependencies or or or subtle

[19:07] choices. And so new new code surfaces,

[19:12] new behaviors that we need to test.

[19:15] So I don't like to coin words, but I'm

[19:17] going to coin one. And that's the

[19:19] specdriven development triangle.

[19:23] As each node moves forward,

[19:27] it's our job and our job of our tooling

[19:31] to keep these nodes in sync. That is the

[19:36] job. Okay, if we improve the code, we

[19:40] must improve the spec.

[19:43] But keeping the nodes in sync is hard.

[19:47] First off, writing tests is hard, which

[19:49] is why everybody steals their tests.

[19:51] Even before agents, we couldn't write

[19:53] tests. We don't like to write tests, and

[19:56] we would prefer not to.

[19:58] Writing specs is hard. They can never be

[20:02] exhaustive. They leave room for

[20:04] interpretation and are written before

[20:05] the software meets the real world. The

[20:08] spec usually is written, then it's

[20:10] implemented, then it gets released. Is

[20:12] the spec updated?

[20:15] No.

[20:17] Specs are written at a different cadence

[20:20] than code and in a different medium,

[20:23] which is problematic. If only we had

[20:25] something that could read natural

[20:27] language.

[20:29] Updating the specs and tests feels like

[20:31] overhead, especially when you're moving

[20:33] fast. And the entire point of using

[20:36] these agents is that we move fast. So

[20:38] any system we design has to move fast.

[20:44] Implementation is messy and often humans

[20:47] and LLM take shortcuts. This happens all

[20:50] the time. Humans will just be like, I'm

[20:52] not going to implement that or going to

[20:53] make this choice now, but I want to come

[20:55] back and and fix it later. And the LLM

[20:58] certainly do this.

[21:01] And so as a result, regular

[21:02] reconciliation of our tests, our spec,

[21:05] and our code is not part of the process.

[21:08] But thankfully, there's some stuff we

[21:11] can work with here. There's we're not at

[21:13] this alone. There are signals that can

[21:16] indicate when things are out of gap

[21:19] or when there's a gap between as they

[21:21] move forward.

[21:22] Code changes are tracked by git and we

[21:25] can compare it against the spec to

[21:26] determine gaps. Very easy. Test

[21:29] coverage. We all know test coverage. We

[21:31] can see how what lines of code are being

[21:33] tested and we can determine whether the

[21:35] tests reflect the spec. It's not just

[21:37] the tests covering the code. The tests

[21:40] have to cover the spec. Updates to the

[21:42] spec based on a user need or software.

[21:45] If a product manager logs in and changes

[21:47] something, is the rest of the system

[21:49] changing? bug reports and hot fixes that

[21:52] go straight into code or tests need to

[21:55] be captured and roll into the spec

[21:58] implement and most importantly

[22:00] implementing the code with an agent is

[22:02] going to generate decisions

[22:04] and these are from both the humans and

[22:07] the agent and they exist in the traces.

[22:10] We can look at the the traces from our

[22:13] coding agents and look at where the

[22:14] decisions are made and so we can use

[22:17] that to keep it in spa sync. So there

[22:20] are tangible things that we can analyze

[22:23] to get the signals we need to keep all

[22:26] of this

[22:28] in sync.

[22:34] So the fun thing about good coding

[22:36] agents is that if you have a thought

[22:39] experiment,

[22:41] you can just do it because as you do it

[22:44] again, as you implement the code, you're

[22:46] going to improve it. So this is my tool.

[22:48] I call it plum after a plumb bob. I like

[22:51] this because it keeps things true. A

[22:53] plum is a you hang the line and it helps

[22:55] a carpenter find, hey, if it's even. And

[22:58] even better, they used to use tripods to

[23:00] hold them up, which echoes the triangle.

[23:04] You can install this right now. You can

[23:06] go pip install plum-dev or uvad plum

[23:10] dev. And this is how it works. This is

[23:12] the workflow. Plum is a command line

[23:15] tool. It's not a Python library you use.

[23:16] It's just a command line tool.

[23:19] Every time you're working an agent,

[23:21] let's just use cloud code because that's

[23:22] the only thing I've tested it on.

[23:25] When I run commit after building

[23:27] something,

[23:29] it identifies decisions made by

[23:31] evaluating the code diffs from the last

[23:33] commit and by looking at the agent

[23:36] traces all the conversations I've had

[23:38] since that last commit. It extracts the

[23:41] decisions. It then ddupes those

[23:44] decisions and presents those decision to

[23:46] the user to approve. Here's all the

[23:49] decisions you made. Do you agree?

[23:52] It then upstates the spec to reflect the

[23:56] approved decisions.

[23:59] It then runs sync to report on, hey,

[24:01] here's our coverage gaps between the

[24:03] specs and the test and reports on

[24:06] spectoode coverage. So, is the code

[24:09] reflecting what the spec defines?

[24:12] As it does this, it generates signals

[24:15] and files that are artifacts that we can

[24:18] track.

[24:20] My favorite is just a big JSONL file of

[24:25] decisions. So, here's one decision. You

[24:28] can see the question here. It was

[24:30] approved. Should spec updates be batched

[24:32] across all decisions or run individually

[24:35] for each decision? So, I've got four

[24:37] decisions in a new uh git push. Should I

[24:40] update the spec on each single one at a

[24:42] time or run it all at once? My decision,

[24:45] and I don't remember because it was

[24:46] yesterday, batch spec updates across all

[24:49] decisions instead of running spec

[24:51] updates for each individual decision

[24:53] that now exists in the record. And it

[24:55] says it was made by the user, not the

[24:56] LLM, which is nice. I can I have blame

[24:59] here. Um, and you can start to see how

[25:02] we can start to enrichment this. We can

[25:04] we can tie it to code. We can tie it to

[25:06] what branch it is working on. Um, we can

[25:08] say whether it was informed by the

[25:09] conversation or not. We can say when it

[25:11] was approved, when it was recreated, and

[25:13] when it was synced at. And this now

[25:14] becomes an artifact that exists in our

[25:16] codebase. Not just the code changes, but

[25:19] the intent.

[25:22] If you want to set up Plum in your

[25:23] project after you've installed it, go to

[25:26] your project. I'm first going to tell

[25:27] you right now, there's a couple

[25:28] limitations. We'll go over it. You have

[25:30] to be using Piest.

[25:33] And this works best when the spec is

[25:35] ahead of the code.

[25:37] I haven't figured it out to uh analyze

[25:40] the code and then rebackfill the spec.

[25:42] We'll do that shortly. Like I said, one

[25:46] day. So, when you install Plum, go to

[25:49] your project, run plum in it. It's going

[25:51] to do a little setup. It's going to say,

[25:52] "Hey, show me your um spec markdown file

[25:55] or show me your folder with the specs."

[25:57] You point it to that. Hey, show me where

[26:00] your tests are. We're just using pi test

[26:02] for now. Sorry.

[26:04] Then it creates a plum ignore file to

[26:06] figure out, hey, if you change the

[26:07] readme, we don't need to generate

[26:09] decisions. That's one example. Um, and

[26:13] it also creates a plum folder to store

[26:15] state and config. So it's very similar

[26:16] to GitHub. And plum performs an initial

[26:19] analysis. And the other thing that

[26:21] happens when it sets up a nit, and this

[26:22] is the most important thing, is it adds

[26:24] hooks to get.

[26:26] So if you run commit, it will then

[26:29] extract the decisions and if there are

[26:32] decisions to review, get commit will

[26:34] fail and it will exit and it will tell

[26:37] you to review your decisions and

[26:39] approve, reject or edit them. And why

[26:41] that's great is because you can use plum

[26:44] in the command line, in a CI pipeline,

[26:47] or in your coding environment wherever

[26:49] you're working. It just works. And that

[26:52] I think that's a requirement.

[26:55] The other artifact that Plum creates

[26:57] that I think is awesome is it analyzes

[27:00] your spec and it builds requirements. It

[27:04] breaks it down into all of the

[27:06] requirements, the individual statements

[27:08] that make up your spec. And these are

[27:10] great and you can say, hey, is this

[27:12] ambiguous? Is it not? Um where's the

[27:14] source file? Because you might have

[27:16] multiple spec files um that it things.

[27:19] Um and eventually I want to link these

[27:21] directly to the code. Right now when I

[27:23] do generate tests um I have a commenting

[27:25] format so I can link the tests back to

[27:28] the requirement that's being tested and

[27:30] when I do coverage mapping which is

[27:32] another function of this um it'll link

[27:35] those tests so I can see what

[27:36] requirements actually have tests and how

[27:37] many tests each of them have.

[27:40] So the goal of plum is really two things

[27:44] which is link the spec to requirements

[27:47] link the requirements to code link the

[27:50] requirements to tests and decisions to

[27:52] requirements. We're creating a new

[27:54] object graph and extending it off of the

[27:57] code diffs.

[27:59] It's also to allow editing the spec, the

[28:02] test or the code. Pick your poison and

[28:04] everything else gets brought along.

[28:06] That's the goal. again early days.

[28:10] Now the nice thing about this is again

[28:13] as you design this as you implement this

[28:16] you have to you start to think about the

[28:17] design choices

[28:19] and I think that's the other interesting

[28:21] thing here and so I learned some design

[28:23] choices first off big question I think

[28:26] people are already thinking about in the

[28:27] room can't this just be a skill

[28:31] can't it like there's already code

[28:33] review skills there's already you know

[28:35] superpowers and other things like this

[28:37] why wouldn't you just use those I think

[28:39] it can't be a skill. Whatever tool we

[28:41] end up using for this function of

[28:44] tracking decisions and intent, it cannot

[28:47] be a skill because a skill lives in the

[28:49] agent. The tool needs to run outside. It

[28:52] needs to be able to handle small

[28:54] commits, triggers, anything even if you

[28:55] don't touch the agent. The second, a

[28:58] skill is a suggestion. A tool needs a

[29:01] checkpoint. That commit fail mode is

[29:04] essential. Otherwise, it'll just get

[29:07] ignored. We've all had this happen to us

[29:09] with clawed code. And the point of this

[29:11] system is that it is canonical. It can't

[29:15] be a suggestion.

[29:17] Agents wander wild widely. Validation

[29:21] needs to be more deterministic. When we

[29:23] can use code, we will because again this

[29:26] is a validation step and a verification

[29:28] step. It should not be using fuzzy LLMs

[29:32] when it can't. And when we have to, like

[29:35] when we're parsing the spec and doing

[29:37] other things, we're going to use tools

[29:39] that help us be a little bit more airing

[29:41] towards deterministic. This is why I'm

[29:43] using DSPly in this um development is

[29:46] because it lets us structure our LLM

[29:48] calls, inputs, and outputs tightly. It

[29:50] allows us to optimize, it allows us to

[29:52] test um and it even allows us to choose

[29:55] which models we route to because again,

[29:56] speed matters. Um, for example, like

[29:58] decision duping I'm sending to GPTOSS

[30:02] um because it's way faster than anything

[30:05] that Anthropic's going to offer and I

[30:07] want to figure out what's the right

[30:08] threshold for that because again speed

[30:10] speed is huge

[30:12] and the tool needs to be simple enough

[30:14] for devs to hold in their head. So if

[30:17] you go use plum there's some limitations

[30:19] and I think anyone who wants to build

[30:20] this tool or use my tool we have to

[30:22] solve it. Right now it only supports

[30:24] piest. I want it to support any test or

[30:27] a conformance test or a non-specific

[30:30] language test which is kind of what

[30:31] Wenwords had.

[30:33] Decisions might interrupt your flow for

[30:35] longunning tasks. If I go in for a quick

[30:37] fix and generate five decisions like I

[30:39] have to go through that kind of sucks. I

[30:42] want to be able to tune that. So it's

[30:43] like hey don't bother me for lightweight

[30:45] decisions just ex like go only bother me

[30:48] for decisions that might be a little

[30:49] vague or counterman previous decisions.

[30:52] Like you have to think about these

[30:54] things. Ddup isn't perfect. Decision

[30:57] identification is fuzzy and likely to be

[31:00] repo specific. If I'm working on f

[31:03] banking software, I'm going to approve

[31:05] every decision. If I'm working on

[31:07] banking software with a team, I

[31:09] certainly am. Like there's different

[31:11] tolerances and you have to be able to

[31:13] control these. Um code reversals on

[31:16] decision rejection isn't working. I'd

[31:18] like it if you reject a decision that

[31:20] like maybe an LLM made, it goes back and

[31:22] undoes that decision and takes something

[31:24] else. I the reason it's not implemented

[31:26] is because the flow needs to be right.

[31:28] Um, which is if I reject it in the

[31:30] command line, nothing should happen. But

[31:32] if I reject it in the code uh in the

[31:35] agent, things should happen. Um, it

[31:38] needs more tools for managing the spec.

[31:39] For example, my spec has grown very

[31:41] long. It probably should be sharded into

[31:43] sections. Um, that's something an LLM

[31:46] can do and should do.

[31:47] Um uh it as I said it should be tunable

[31:51] for just enough structure like can I run

[31:54] with dangerously proof all decisions? I

[31:57] know I want to in some cases um it's

[31:59] untested on large projects. Use at your

[32:02] own risk but it works pretty well. Um

[32:03] there's two things right now that shove

[32:05] the entire code bit. No, I fixed that.

[32:07] So never mind. Um it works best when

[32:10] plum innit is run when the spec is ahead

[32:12] or align with the code like I said. But

[32:15] here's the fun part.

[32:17] I've been able to test this as I build

[32:19] it because I'm using it to manage the

[32:21] project that I'm running which is

[32:23] awesome and it's actually been because

[32:26] you like if it's not awesome you have to

[32:28] fix that and so it gives you tons of

[32:30] things. So first off claude can refer to

[32:33] the implementation to understand stuff

[32:35] without entire codebase search. So like

[32:37] this is something I want to improve the

[32:38] skill is which is like if you wonder why

[32:40] something is the way it is you can

[32:42] search the decision tree to find the

[32:44] intent and that helps you make decisions

[32:46] about what to preserve it. How many of

[32:48] you have worked on long projects with

[32:50] agents and they start doing things that

[32:52] you told them a while ago not to do?

[32:55] Happens all the time because you've just

[32:56] gotten out of the context working

[32:58] somewhere else. Um the decision log has

[33:02] proven valuable. It helps you answer,

[33:04] hey why does this code exist? I want to

[33:05] be able to point and I think like

[33:07] already I've asked the uh agent I've

[33:10] been like hey this code is done this way

[33:13] is there something a decision we made

[33:15] that is why we did this and it can find

[33:18] it it's very cool um it's kind of code

[33:22] review but it's code review where we

[33:23] capture intent which is kind of the

[33:25] crazy bit about it so like when I hit

[33:27] commit in clawed code it's like here's

[33:28] the decisions and you step through it

[33:30] and sometimes you hit one you don't like

[33:32] and you have to say No, I reject that

[33:36] and I'm going to stop right here and I'm

[33:37] going to go redo it. Um, and so I I like

[33:40] that better than just pure code review.

[33:43] Um, it actually controls and spots weird

[33:45] silent LLM behavior. We've all hit go

[33:48] and let it run and we go answer some

[33:50] email and then we come back and now I

[33:52] get a decision and I'm like, that's

[33:54] insane. Don't do that. Um, let's roll

[33:59] that back. And similarly, hacks get

[34:03] documented. So I've taken some shortcuts

[34:05] in this app and now I know there's

[34:07] shortcuts. Um and I can even just

[34:10] capture that in the decision and then I

[34:12] can go search back and say find all the

[34:14] shortcuts I've taken and then let's go

[34:16] fix them. Um so it becomes an artifact

[34:18] for this. So

[34:21] one of the things that I think is

[34:23] interesting is taking this question

[34:26] further. So let's say plum exists and

[34:29] does exactly what I want. I've kind of

[34:30] walked you through how it works, what

[34:32] the function of it is. It's basically

[34:34] something that runs parallel to Git and

[34:36] is a thing that keeps your spec tests

[34:39] and code in sync while forcing you to

[34:42] acknowledge what decisions are made and

[34:45] approve them.

[34:47] How could GitHub be better if you had

[34:52] such information? The main way we

[34:54] interact with code is with markdown and

[34:57] text

[34:59] and GitHub has not changed anything

[35:02] about how we interact with markdown and

[35:04] text. Um, this is what my markdown diffs

[35:07] look like. Like could I not have the

[35:12] decisions linking it to the code so I

[35:14] could actually see how it manifests? I

[35:17] think any modern GitHub

[35:19] which and I'm using GitHub as the source

[35:21] of truth for software engineering

[35:24] projects. That's kind of the way I say

[35:26] it which is you might have you know your

[35:30] product manager meant tools like linear

[35:33] and all these other things that exist.

[35:34] You might have your uh Confluence and

[35:36] all those other things but GitHub is the

[35:39] source of truth. And so what should the

[35:42] source of truth look like in um a spec

[35:46] driven development era? And I I think

[35:47] there's four things that came to my mind

[35:50] right off the top. First is spec tests

[35:52] and code have to be first class

[35:54] citizens.

[35:56] Code's a first class citizen at GitHub.

[35:58] Tests are pretty close like the CI/CD

[36:00] GitHub actions. That's great. The funny

[36:02] thing is Microsoft probably could be

[36:04] selling us so much more in uh inference

[36:06] if they started to deal with markdown

[36:08] better. um but they haven't and so the

[36:12] thing that has to change is two markdown

[36:14] has to be treated like a first first

[36:16] class citizen.

[36:18] The third thing is that we need to see

[36:20] the linkages between those three things

[36:22] spec tests and code users can follow

[36:25] connections between decisions

[36:26] requirements codes tests and spec

[36:30] because everybody is thinking about spec

[36:32] driven development as a hit go run and

[36:35] you're done. It's a process and so you

[36:38] got to be able to follow all of it and

[36:40] track it over time. And finally, users

[36:43] should be able to ask questions of the

[36:46] system to getting closer to

[36:48] understanding intent because that's how

[36:50] we're actually going to understand it.

[36:51] And I think this starts to get back to

[36:53] where we want to be. So with all of

[36:56] that, here's my takeaways from my own

[36:59] personal journey from when words to

[37:02] plum.

[37:04] Code implementation clarifies and

[37:06] communicates intent.

[37:08] Could stop there and walk out of the

[37:10] room. That's the takeaway here. But the

[37:13] job is to keep the specs, code, and

[37:15] tests in sync as they move forward.

[37:20] We need to keep the system for managing

[37:23] the specdriven development triangle

[37:25] simple. If it creates developermental

[37:29] overhead, it just moves the problem

[37:32] somewhere else.

[37:35] The act of writing code improves the

[37:37] spec and the tests. Just like software

[37:40] doesn't truly work until it meets the

[37:42] real world, a spec doesn't truly work

[37:45] until it's implemented. No code

[37:48] libraries are toys because they are

[37:50] unproven.

[37:53] Even if you aren't the one making

[37:55] decisions during implementation,

[37:58] decisions are being made.

[38:01] We should leverage LLMs to extract and

[38:04] structure these decisions.

[38:07] And finally,

[38:09] we've been here before.

[38:12] The answer then was process. The answer

[38:16] now is also process

[38:19] made lightweight enough via AI

[38:22] that moving fast doesn't require

[38:26] abandoning process.

[38:29] So, like I said, thank you very much to

[38:33] uh Claire Leguess, who's the professor

[38:35] at CMU, who helpfully walked me through

[38:39] uh the history of computer science. She

[38:40] has a book coming out, which is for a

[38:42] wider audience, kind of like I think

[38:45] it's called like try turning it on and

[38:46] off again. I love it. Um it's uh coming

[38:49] out I think later this year. There's a

[38:51] QR code to her book and to her website,

[38:53] but she has been thinking about AI and

[38:55] software engineering since 2009.

[38:58] uh when she first published using you

[39:00] know basically AI for for auto writing

[39:03] bugs for uh or finding test coverage

[39:06] gaps. Um uh so I think I I am in debt to

[39:10] her for the history section.

[39:12] And then also I have a book coming out

[39:14] and this is a link to my website

[39:16] dbrunig.com.

[39:18] Um, as I said, I'm also active within

[39:21] the DSPI space, which includes, uh,

[39:24] prompt optimization tools like Jeepa,

[39:26] um, uh, test time inference strategies

[39:29] like RLMs, um, and the whole of Compound

[39:32] AI. I'm working on that right now. And

[39:34] in fact, I'm actually hiring, if you

[39:36] know any great back-end engineers who,

[39:38] uh, have experience with platform as a

[39:40] service systems. Um, but again, thank

[39:43] you so much and I hope this inspires you

[39:46] to take on building some of the tools to

[39:50] manage the specdriven development

[39:53] triangle.
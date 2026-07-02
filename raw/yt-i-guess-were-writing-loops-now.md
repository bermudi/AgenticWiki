---
type: youtube
url: https://www.youtube.com/watch?v=iJVJwmCKW9o
title: "I guess we're writing loops now?"
channel: Theo - t3.gg
date: 2026-07-02
ingested: 2026-07-02
---

# I guess we're writing loops now?

[0:00] Here's your monthly reminder that you

[0:01] shouldn't be prompting coding agents

[0:03] anymore. You should be designing loops

[0:05] that prompt your agents. I don't know

[0:06] about y'all, but this memo didn't make

[0:08] it to me. Of course, I've seen loops

[0:10] before. Things like the Ralph loop

[0:11] really helped me think about how agents

[0:13] can do more over time, but it also

[0:15] massively increased the error rate of

[0:17] the changes that I was having my agents

[0:19] make. They were really cool, but they

[0:20] didn't seem that productive, and I found

[0:22] myself going back to the usual, which

[0:24] was asking the model to make a plan,

[0:25] reading the plan, saying, "Yeah, that

[0:27] looks good. Go do this part." And then

[0:28] the next part, then the next part,

[0:30] another agent review it, then bringing

[0:31] the feedback back to the first agent,

[0:33] and just the usual looping of work, but

[0:36] I was the one running the loop. I was

[0:38] the one doing the hand-holding and

[0:39] bringing things from part one to part

[0:41] two, and making sure all of my agents

[0:43] had the context they needed to build

[0:44] well. And Pete, as always, is a bit

[0:46] ahead of the curve. I have been a huge

[0:48] fan of him since way before the open

[0:50] claw chaos, because he knew how to think

[0:52] about building with agents in a

[0:54] fundamentally different way that made

[0:56] him way more productive. I think of Pete

[0:58] as an experimental figure in many ways,

[1:00] where rather than being the role model

[1:02] we should all be copying, he's the

[1:04] person figuring out what the future

[1:05] looks like in a weird jank duct tape

[1:07] version now, and we can all learn from

[1:09] that and see where things are going. At

[1:12] least, that's how I used to think about

[1:13] him, and honestly, I'll admit I still do

[1:15] in a lot of ways,

[1:16] but then I started building more with

[1:18] loops. I started getting my agents to

[1:20] prompt themselves. I started setting up

[1:22] systems where agents would review code,

[1:24] give feedback, adjust it, and then

[1:25] trigger re-reviews. I started building

[1:27] systems that would watch pull requests

[1:29] and watch existing issues on other repos

[1:31] to tell me when updates happen. I

[1:33] started using Hermes agent to bring

[1:35] context to me instead of to go out and

[1:37] find it for me. And I've accepted now

[1:40] that Pete's right. We should still be

[1:42] writing prompts, though. More

[1:44] importantly, I would argue now that the

[1:46] majority of your agent runs should

[1:48] probably not be running with prompts

[1:50] that you wrote. That is a crazy thing

[1:52] for me to say, because it was one of

[1:53] those like I never thought I I see the

[1:55] day things, but now that I've explored

[1:57] it myself and I've shipped a lot of code

[1:59] using these types of loops,

[2:01] I have a lot of thoughts I want to

[2:02] share.

[2:03] But I have one other thing I want to

[2:04] share quickly first, which is today's

[2:06] sponsor. AI should be good at design. It

[2:08] knows all the things it needs to about

[2:09] code, designs, visuals, and more. But

[2:11] every time I try to have it redesign

[2:13] things that I'm working on, it just

[2:14] doesn't do it right. At least that was

[2:16] my experience before I started using

[2:17] today's sponsor, Magic Patterns. These

[2:20] guys really cracked good design flows

[2:22] with AI. They're not trying to replace

[2:24] your whole stack or be a full site

[2:26] generator. They're trying to work within

[2:27] the real constraints of your real code

[2:29] base on just the front end in order to

[2:30] get great designs out. The first thing

[2:32] that makes them different is the design

[2:34] system selector. Unlike other tools that

[2:36] will just generate a bunch of slop code,

[2:38] you can pick between existing real base

[2:40] systems like the one that they provide,

[2:42] a wireframe system, or even classics

[2:44] like Shadcn, Chakra, Mantine, and MUI.

[2:46] Or you can create your own, and you can

[2:48] also import things from Figma, too,

[2:49] which is super helpful. You can then

[2:51] switch between different models.

[2:52] Obviously, the ones that we all love and

[2:54] know are these in design, like the Opus

[2:56] line, Gemini 31, but also their auto

[2:58] router has really impressed me. It was

[3:00] able to grab the real SVGs for the logos

[3:02] for the things that I wanted to put on

[3:03] there once I showed them where they

[3:04] were. I can open up the preview and send

[3:06] this to other people on my team, which

[3:07] has already been super helpful. I can

[3:09] also leave comments on any point on the

[3:11] screen to tell the agent what else I

[3:13] wanted to fix, which has been a

[3:14] lifesaver when you're working on these

[3:16] types of things. They even have a visual

[3:18] editor for when you want to edit fonts,

[3:19] content, and things yourself. So, when

[3:21] you notice the agent's just not getting

[3:23] something right, don't fight it, change

[3:25] it yourself. This is a small thing, but

[3:26] it's one of my favorites. The ability to

[3:28] choose different frames to test your

[3:30] site in to see how it looks on like a

[3:32] mobile display or an iPad display is so

[3:35] helpful as you're trying to get these

[3:37] fine-tuned pieces right. I can't tell

[3:39] you how many times I had a design that

[3:40] seemed good, but as soon as I shipped it

[3:42] and opened it on my phone, it was awful.

[3:43] No more. Just do it here. Starting to

[3:45] see why companies like DoorDash, Vappy,

[3:47] Granola, and more are leaning so hard on

[3:49] what Magic Patterns has built. These

[3:51] guys get it. Design better with AI at

[3:53] swidev.link/magicpatterns.

[3:55] So, this post by Pete is the one that

[3:57] started this new era of looping

[3:59] discourse. But, this is not the tweet

[4:02] that got me to go try loops. It was this

[4:04] one.

[4:05] Here's a simple loop. Tell Codex to

[4:07] maintain your repos. Wake up every 5

[4:10] minutes and direct work to threads. That

[4:12] makes it easy to parallelize and steer

[4:14] work as needed. He uses an orchestrator

[4:16] skill combined with his triaging and

[4:17] auto review and computer use skills, so

[4:19] some work can land autonomously. This

[4:22] helped a lot click for me. In

[4:25] particular, of your agent directing work

[4:29] to threads. I didn't realize Codex had a

[4:32] feature where a thread in Codex could

[4:34] spin up another thread in Codex. And now

[4:37] that I know it has that, I've been

[4:39] pushing it much harder. I want to

[4:40] contextualize this in a bit of a weird

[4:42] way. I'm going to reference the article

[4:44] Anthropic did about recursive

[4:46] self-improvement because they did a

[4:47] great job describing how our work has

[4:50] changed over time. Previously, a person

[4:52] would use a computer, and they

[4:54] eventually would use that to build a

[4:55] chatbot or an AI model. Once we had the

[4:58] AI model, the person could use the

[4:59] computer to ask the chatbot questions

[5:02] and get outputs that they could then use

[5:04] in their code to make better software

[5:07] and eventually maybe make a better

[5:08] model, too. But, the loop was the person

[5:10] uses the computer, asks the chatbot a

[5:12] question, it gives a result to the

[5:14] person who then copy-pasted it into

[5:15] their code, and then asks another

[5:17] question. I know a lot of people use

[5:19] stuff like my chat service T3 chat as a

[5:21] way to just do code, but they would

[5:24] bring it code questions and then

[5:25] copy-paste the answers. It really kind

[5:27] of emphasized the whole like coding is

[5:28] just copy-paste meme. Chatbots pushed it

[5:31] way further, but now we've gone far

[5:32] beyond that because copy-pasting is not

[5:34] the best use of our time. So, instead of

[5:36] copy-pasting the result from the chatbot

[5:38] into our codebase, we started to just

[5:40] use our IDEs or terminals and other

[5:41] tools to talk to the model and get it to

[5:43] edit the code directly. And that's where

[5:45] things have been for a while now. But

[5:47] then we had another big change with

[5:49] workflows and sub-agents. I know a lot

[5:51] of people haven't even made this move

[5:53] yet, and I was hesitant to do it myself.

[5:56] Obviously, tools like Claude Code and

[5:57] Cursor will do some amount of this to go

[5:59] explore and find things in your code

[6:01] base, but the idea of telling my agent

[6:04] to spin up five agents to go break up

[6:06] work was something I just wasn't that

[6:08] interested in. Especially when I saw all

[6:10] the crazy [ __ ] people were doing trying

[6:12] to create different personas and roles

[6:14] for all of those workers, where they had

[6:16] a skill that wrote down in markdown

[6:18] files, "This is the adversarial

[6:20] reviewer. This is the security reviewer.

[6:22] This is the grocker and finder. This is

[6:24] the exploration agent." That made no

[6:26] [ __ ] sense, and I would argue that

[6:28] still makes no [ __ ] sense. The idea

[6:30] of predefining personas to go do things

[6:33] in your code base fundamentally misses

[6:36] the cool part of agents and AI as a

[6:38] whole. It's dynamic. The agent can build

[6:41] the context it needs and do the things

[6:43] it needs to without having everything

[6:45] pre-built and hard-coded ahead of time.

[6:48] Imagine a coding template for a project

[6:50] where every file's already created, and

[6:52] you have to edit things in the existing

[6:54] files. It's stupid, and that's how I

[6:56] felt about most of the sub-agent stuff

[6:58] that people were doing. Workflows pushed

[7:01] me hard here, and the video I just

[7:03] recently published about the things I

[7:04] like about Claude Code goes a little

[7:06] more in depth there on the things I like

[7:07] about workflows. The idea of your agents

[7:10] constructing the method that they're

[7:12] going to use to tackle a problem was

[7:14] really enticing to me. But now I'm going

[7:16] a bit further. Closing the loop, where

[7:19] the model doesn't just pick and spin up

[7:21] what sub-agents it needs, it audits the

[7:24] work it does, and then sends the result

[7:26] back to run again

[7:28] and again, and again, and again.

[7:31] I am not at the fully autonomous loop

[7:34] point yet. I am not claiming the same

[7:37] things people like Boris are claiming,

[7:38] where they're writing the loop and now

[7:40] the code is just happening by itself

[7:42] with no oversight. That is stupid. But I

[7:45] wanted a taste. I wanted to get an idea

[7:48] of how this could work. So I could play

[7:51] with it myself and see what benefits

[7:53] exist. So I started to play a bit. I

[7:56] started to do stuff like this. I had

[7:59] Claude code spin up a PR for a pretty

[8:01] big refactor. I used sub agents a bunch

[8:04] to go address specific concerns and take

[8:05] over specific parts of the code base. I

[8:07] didn't even say how to break it up. I

[8:08] let Opus figure that out itself. Man, I

[8:11] miss Mythos right now. But one specific

[8:13] thing I did do was tell the agent to

[8:16] monitor the PR for comments. Because I

[8:19] have a lot of awesome code review tools

[8:22] that are watching my PRs when they're

[8:23] filed and leaving feedback. And I moved

[8:26] away from copy-pasting code out of

[8:28] chatbots into my code base. And instead,

[8:31] I found myself copy-pasting the comments

[8:34] that things like Code Rabbit, Graphtile,

[8:36] and Macroscope would leave and pasting

[8:38] those into the agent so that it would go

[8:39] address them. It wasn't great. So what I

[8:42] started doing instead, and this was the

[8:44] first step into heavier looping for me.

[8:46] And I would highly recommend you guys

[8:48] try the same cuz it's actually really

[8:49] cool. Once you have your setup in such a

[8:51] way where you have different work trees

[8:53] that are monitoring and working around

[8:55] specific pieces of work. Where this code

[8:57] is in a directory that is specific to

[8:59] this PR. That means I don't care about

[9:02] this directory. It's not blocking other

[9:04] work. Once you have this broken out, in

[9:06] this case I'm SSHing to another machine

[9:08] on my network that is running this code

[9:10] base that has this fork of this code

[9:12] base, this work tree for it. And then I

[9:14] told it monitor the comments. Watch the

[9:17] PR. Wait for comments to come in. And

[9:20] when they come in address them.

[9:22] And it did it. And it's been doing it

[9:25] now for like six plus hours. It has made

[9:28] a ton of improvements through this. And

[9:31] then I had a taste. And then I got

[9:33] really excited to play more. I wanted to

[9:36] push the limits

[9:38] of how much I could land without having

[9:41] to do the follow-up prompting myself.

[9:43] And I'll be honest, I still found myself

[9:46] hopping over the Codex and saying, "Hey,

[9:47] can you review this code?" and then

[9:49] copy-pasting the results of that review

[9:50] over. I played a little bit more there

[9:52] where I told Claude, "Hey, when you're

[9:54] done, run Codex with this command to get

[9:57] it to give feedback and then address

[9:59] what it gives as feedback." And that

[10:01] worked pretty well, too. But this is

[10:03] still for traditional work where I have

[10:05] one PR that does one thing that is being

[10:08] watched by my agent to address the

[10:11] comments that come in.

[10:12] There's a lot of work that can't be

[10:14] broken down into just one PR. I recently

[10:17] ran into one of those pieces of work. I

[10:19] have been rebuilding the isolate layer

[10:22] inside of Lakebed to make it a little

[10:24] more financially reasonable to deploy

[10:26] the way I want to deploy it. I did a

[10:28] deep dive on performance and alternative

[10:31] runtime options for how we could

[10:33] architect this with i5. And it had

[10:35] really good suggestions. But one of the

[10:38] things it pointed out was that my data

[10:39] architecture had a lot of room to

[10:42] improve that could help performance even

[10:44] more than runtime changes. Here's where

[10:46] it gave that feedback. The isolate

[10:48] architecture may not be the first

[10:49] scaling bottleneck. Current subscription

[10:51] invalidations rerun every query

[10:52] subscription for an app after each

[10:54] mutation. For hot apps, we should

[10:56] implement dependency aware invalidation,

[10:57] mutation coalescing, per app

[10:59] invalidating batches, shared results for

[11:01] identical subscription arguments, and

[11:03] back-pressuring maximum refresh

[11:05] frequency. This is when I realized there

[11:07] was a lot of work that needed to be

[11:08] done. So, I asked up front, "From these

[11:11] features you think we should implement,

[11:13] which should be done separately and

[11:14] which should be done in tandem? Would it

[11:16] be realistic to do all of this in one

[11:18] PR?" It very quickly said, "No, I would

[11:20] not implement all of this. It's one

[11:21] project, but at least three PRs."

[11:24] Current implementation synchronously

[11:25] yada yada. And then it broke up what the

[11:27] different PRs could look like. I asked,

[11:29] "Should they be worked on separately or

[11:30] should they be stacked?" It said they

[11:32] should be mostly stacked, but there's

[11:33] some opportunity for parallelizing.

[11:36] I then told it to write an HTML plan, my

[11:38] beloved. Thank you again to our friend

[11:41] Thoric for introducing me to this

[11:43] wonderful pattern where it is so much

[11:45] easier to see what my agents want to do

[11:47] and read it in a way that I can even

[11:48] open on my phone. It's so nice. And it

[11:50] wrote these plans for each of the

[11:53] portions that it needed to complete. I

[11:55] also told it here after the plan, like

[11:58] please make the plans piece, to create a

[11:59] new thread with the first plan as a

[12:01] starting point. And it did. It created a

[12:04] PR by itself in a new thread to go

[12:08] implement that first plan. And then it

[12:10] landed. And I did my usual thing where I

[12:13] had a bunch of back and forth review. I

[12:15] spun up another thread to review it. I

[12:17] copy pasted back and forth. It got into

[12:18] a good state, so I merged it. I then

[12:21] asked it to make a fresh thread for part

[12:22] two, which it did. It only took a few

[12:25] seconds. But I realized I should be

[12:26] looping harder. This is the single

[12:29] message I have sent to an agent that has

[12:31] impacted my psychosis the most. Would it

[12:33] be possible to make a workflow of some

[12:35] form that first will spin up a separate

[12:37] thread to make the PR, second spin up

[12:39] another thread to review that PR when

[12:41] it's filed, three puts the thread from

[12:44] one in a loop reviewing comments until

[12:46] it gets all approvals, and then fourth

[12:48] the thread would merge the PR and

[12:50] trigger another one for the next piece.

[12:53] I didn't think it'd be able to do this,

[12:54] but I was curious how it would try. And

[12:57] it made a kind of broken diagram showing

[13:00] the workflow it had in mind. It said it

[13:02] would use a heartbeat attached to this

[13:03] thread pulling every 5 to 10 minutes. On

[13:05] each wake up it would read the

[13:06] implementation thread status, detect

[13:08] filed PRs, create a fresh review thread

[13:11] when a new PR has a new sha head, send

[13:14] actionable findings back, re-review

[13:16] after the fixes are pushed, yada yada,

[13:18] and then pull latest main before

[13:20] creating the next work tree. So I said,

[13:22] "Make the workflow and use it to file

[13:24] the remaining PRs." And it did it. This

[13:26] was Sunday at 2:29 a.m. And it

[13:29] eventually finished and broke everything

[13:31] in my editor pretty aggressively at 6:50

[13:34] a.m.

[13:35] I set this off before going to bed and I

[13:37] woke up the next day with four stacked

[13:39] PRs

[13:41] reviewed to hell and back

[13:43] all merged. It was [ __ ] awesome. Do I

[13:47] think you should do this on real

[13:48] production code bases that have millions

[13:50] of users? Probably not. At least not

[13:53] yet. But god damn is it cool to spin up

[13:56] work in this way where complex

[13:59] multi-stage problems that need their own

[14:02] breakdowns, that need their own pull

[14:04] requests, that need their own reviews

[14:06] and cycles and loops. Because that's the

[14:08] craziest thing here. I asked the model

[14:10] if I could make this loop and it made a

[14:13] loop that makes sub loops dynamically.

[14:16] This isn't a hard-coded every time I

[14:18] make a change, I spin up one reviewer

[14:20] that reviews it and then they go back

[14:22] and forth. This is a dynamic workflow

[14:25] that was created based on the specific

[14:27] needs of this specific problem I was

[14:29] solving. My loops created loops and they

[14:33] did a great job at it. This was real

[14:35] code that landed and sadly I couldn't

[14:37] have Fable come in and review it because

[14:39] this was after the ban. But the idea of

[14:42] your agents being able to orchestrate

[14:44] dynamic work in a way that is

[14:46] specifically tailored to the problem is

[14:49] so cool. Throughout most of my career

[14:51] when I worked at real companies, we

[14:53] would follow some form of the

[14:55] traditional Agile sprint loop. Where we

[14:59] would put tickets inside of our backlog

[15:02] and then once every week or two weeks,

[15:04] the start of the week, we would pull up

[15:06] the backlog and decide what was worth

[15:08] working on and how long we thought it

[15:10] would take and then try to make sure

[15:12] work that's blocking other work was

[15:13] prioritized accordingly, that everybody

[15:15] had unblocked work to do. But the actual

[15:18] flow of all of this was pretty static.

[15:20] It was the classic agile waterfall-y

[15:24] structure. And we kind of had to force

[15:26] our work to fit that shape. The most

[15:28] productive teams were the ones that

[15:29] would build their own alternative shape

[15:32] around the problems they were trying to

[15:34] solve. That is what makes this so cool.

[15:37] The shape of the loop, the shape of the

[15:39] structure, the shape of how work happens

[15:43] can be dynamically generated based on

[15:46] the shape of the work that you're doing.

[15:49] And you can use this for all sorts of

[15:51] crazy stuff. You can use this to monitor

[15:54] pull requests that need to be merged.

[15:56] You can use this on a schedule to every

[15:58] morning start your day with feedback on

[16:01] what PR's are worth merging and what

[16:02] ones are worth forgetting about. I use

[16:04] this type of thinking to find the best

[16:05] solution for a 5G hotspot. And since I

[16:08] had a loop checking what the best deals

[16:09] were, I got early information about the

[16:11] new Verizon plan they just put out

[16:13] because my loop pointed it out to me

[16:15] randomly on Discord. It's so cool. And

[16:18] again, to my earlier point, I wrote a

[16:20] handful of prompts in this thread. I

[16:22] wrote most of the prompts. Actually, no

[16:24] I didn't cuz it got in that schedule

[16:26] after. But up until the schedule

[16:28] started, I wrote all the prompts and I

[16:31] read the responses. I said, "Yeah, that

[16:33] sounds good. Let's see what happens."

[16:35] And then I did see what happened. And

[16:37] what happened was kind of [ __ ]

[16:38] awesome. So, what I would highly

[16:40] recommend you do here, the info you take

[16:43] from here, is to think about the work

[16:45] you do before, during, and after you

[16:48] prompt your agent. When your agent

[16:50] completes its task, pay attention to

[16:52] what you do next. For me, what would

[16:55] happen is I would tell the agent to

[16:56] build the thing. And then once it built

[16:58] it, I would run the thing and go see if

[17:01] it worked. And if it did, I would commit

[17:03] the thing and then push the thing and

[17:05] then make a pull request on GitHub for

[17:07] the thing. I would then wait for my code

[17:09] review agents to get feedback. I would

[17:10] address that feedback. I would then ask

[17:12] my team for feedback. I would address

[17:14] that feedback. And then I would merge

[17:16] it. Start from where you started there.

[17:19] The first thing I did after the changes

[17:21] were completed was run a dev server.

[17:24] Tell the agent to do that. I then

[17:25] checked if the work worked. Tell the

[17:28] agent to do that, too. Computer use has

[17:30] gotten really good. After I verified the

[17:32] work, I would then commit. Tell the

[17:34] agent to do that once it's verified

[17:35] things are correct. Tell it to push up

[17:37] the code and file a PR once it's ready.

[17:40] Then I would go get those code review

[17:41] comments and copy-paste them into the

[17:43] agent to fix. Tell the agent to do that

[17:45] itself, too. Maybe tell the agent to

[17:47] spin up other threads to do its own

[17:49] reviews. The other spicier way of

[17:51] putting this is that we are looking at

[17:54] the code too early. If you are reading

[17:56] the code your agent put out before

[17:58] another agent read it and gave feedback

[18:00] on it, you're wasting your own time.

[18:03] That's time that the agent could have

[18:04] spent instead that you could have used

[18:06] to find other work worth doing or to

[18:08] relax a little or go spin up a side

[18:10] project. I don't know what you're going

[18:11] to do with your free time, but I have

[18:13] had far too many instances where I read

[18:15] an agent code or like, "That's obviously

[18:16] wrong." and then told it to go fix it.

[18:18] They can figure that [ __ ] out

[18:19] themselves, too. And now, when the human

[18:22] comes in, all the [ __ ] is gone and

[18:24] you can focus on the hard stuff. It's so

[18:25] much more fun. Try to find where you

[18:28] have to be involved and see what it

[18:30] takes to prompt yourself out of it. I'm

[18:32] not saying you need a bunch of custom

[18:34] skills. I have almost none here. I'm not

[18:36] saying that you need to build fancy

[18:37] plugins or install a bunch of [ __ ] I'm

[18:39] just using stock Codex. I'm not even

[18:41] using T3 code for this. I do hope to get

[18:43] these features added to T3 code soon cuz

[18:44] they're really cool, but I'm just using

[18:46] stock Codex with a normal account here.

[18:48] There is one catch, though.

[18:50] Cost.

[18:51] You will burn many more tokens when you

[18:55] run things in loops like this. And if

[18:57] it's going down the wrong path, it might

[18:59] go down that wrong path for longer to

[19:01] burn more tokens and potentially cost

[19:03] you more money. If you're paying API

[19:05] prices, you probably shouldn't be doing

[19:07] loops yet. That said, you might be

[19:09] surprised how far you can go with them.

[19:12] Remember that loop I mentioned earlier

[19:14] that I was using Opus and Claude code

[19:16] for where it's watching the PR and

[19:18] updating it constantly? Not only is it

[19:20] doing that, I've noticed that every time

[19:23] it gets feedback, it spins up a workflow

[19:26] with eight steps or more to address all

[19:29] of it. I had one agent spend under 10

[19:31] minutes leaving feedback, and based on

[19:33] that feedback, the Opus workflow ran for

[19:36] eight hours and did over 3 million

[19:39] tokens down to address like three small

[19:41] comments. It was brutal. It was absurd.

[19:44] If I was a blocked during that time, it

[19:46] would have been very rough. And

[19:47] honestly, I was kind of blocked at that

[19:48] point cuz this is a big overhaul and I

[19:50] want this in before doing other changes

[19:52] cuz I'm unfucking the the TypeScript

[19:54] that looks like Python that GPT 5.5

[19:58] wrote. Cuz as great as the model is at

[20:00] writing code that functions, it does not

[20:01] write code I like looking at. And

[20:03] product models write better looking

[20:04] code. I wanted to do this with Fable.

[20:06] Fable was taken. So instead, I burned a

[20:08] shitload of Opus tokens.

[20:10] This thread that's like breaking my SSH

[20:13] and Claude code. I can't even scroll up

[20:15] far enough to get to my first prompt cuz

[20:17] this thread is just so much [ __ ] going

[20:19] on, very little of which has involved me

[20:21] at all.

[20:23] So how was my usage? I do have two

[20:25] Claude code accounts right now, so I'm

[20:27] sure this burned through it really

[20:28] aggressively, right?

[20:29] Well, this combined with everything else

[20:32] I've been working on for the last few

[20:33] days using Opus

[20:35] still has me at only 29% of my weekly

[20:39] limit which expires in eight hours. I

[20:42] was maxing out my limits with Fable. And

[20:44] with Opus in a loop like this, I'm not

[20:47] even close

[20:49] to getting my limits. And I've had like

[20:51] five of these types of loops running in

[20:53] that time. Really big piles of changes

[20:56] happening.

[20:57] And it doesn't [ __ ] matter. It's not

[20:59] getting close to my limits. I am on the

[21:00] $200 plan. I will also say that I ran a

[21:04] workflow using the new Claude code with

[21:06] Opus 4.1 when it came out on the $100

[21:08] plan and I hit the 5-hour limit

[21:10] instantaneously. I have never come close

[21:13] to the 5-hour limit with Opus and loops.

[21:16] And I'm also not coming close to the

[21:17] weekly limit with it either on that $200

[21:19] plan. So, if you're already on a $200

[21:21] plan or you're willing to be on one and

[21:23] you find that your usage is not getting

[21:27] like lethal, like you're not getting

[21:28] close to maxing out, start looping more.

[21:31] And since you can't use these plans at

[21:33] normal companies usually because of the

[21:35] differences and restrictions in how

[21:36] you're supposed to use an enterprise

[21:37] plan at API prices, go use this for

[21:39] crazy [ __ ] that you don't think should

[21:41] be possible. I would also recommend

[21:42] experimenting with the tools that are

[21:44] included with our harnesses. Now, a lot

[21:46] of them are pretty powerful. Codex's

[21:48] ability to spin up new threads is

[21:50] really, really cool. Both Codex and

[21:53] Claude code have a {slash} goal

[21:54] primitive, which allows you to get one

[21:56] thread going forever on a task where it

[21:59] keeps double-checking at the end of a

[22:01] turn, "Did you finish the work? If no,

[22:03] okay, keep going." That type of like

[22:05] linear, never-ending loop is different

[22:08] from a dynamic workflow like I showed

[22:10] earlier where it creates dynamic work

[22:12] based on a pre-planned goal versus a

[22:16] traditional {slash} goal where it just

[22:18] keeps plugging along on that one thread

[22:20] until it completes. I have a goal

[22:22] running right now that's over 12 hours

[22:24] in that's trying to rewrite Hermes agent

[22:26] in Rust so that I can run it in isolates

[22:28] that are much smaller and use less

[22:29] resources cuz my Hermes agent uses over

[22:31] a gig of RAM. It is getting close. It'll

[22:34] probably work. It probably won't be

[22:35] production-ready. It probably won't be

[22:36] something I want to put out there and

[22:38] sell or anything, but it's a fun use of

[22:40] my spare tokens and it's really

[22:41] interesting to see what types of

[22:43] problems can be solved when you throw

[22:45] these crazy rate limits at them. The

[22:47] point I'm trying to make here is that

[22:49] you should be treating these limits like

[22:50] challenges. If you're on the expensive

[22:52] plan, you should be trying to get close

[22:55] to maxing it out because that's just

[22:56] money you're losing if you're not. The

[22:59] 70% I'm not going to hit in my weekly

[23:01] limit here at 8 hours is thousands of

[23:04] dollars of inference that I paid for

[23:06] that I could have done that I didn't do.

[23:09] But again, I need to be realistic with

[23:11] you guys.

[23:12] In all of May on this computer, I did

[23:15] about $1,900

[23:17] of inference. I didn't pay that

[23:19] obviously cuz I'm using the

[23:20] subscriptions with Claude Code and

[23:21] Codex. But this month, June, which we're

[23:24] only 17 days into, I'm at nearly $6,000

[23:28] of usage.

[23:29] But that's just this computer.

[23:32] As I mentioned earlier, I'm using

[23:34] multiple computers.

[23:36] My Mac mini has another $2,600

[23:40] of inference on it. I'm at 10 grand for

[23:42] the month across all of my machines. And

[23:45] that's on it three of those $200 plans,

[23:48] two Claude Code, one Codex, and I

[23:50] haven't used the second Claude Code

[23:51] account since Fable was taken from us.

[23:53] That's a shitload of value that I'm

[23:55] getting given for relatively cheaply. To

[23:58] spend $600 and get back 10 grand of

[24:01] inference, that means you can do a lot.

[24:04] And if you're not pushing loops to their

[24:05] limits, you're not using that as much as

[24:07] you could be. I've been having way more

[24:09] fun with loops than I expected to, and

[24:11] I'm curious if you guys will as well.

[24:13] Take a look at what you do when you're

[24:14] done prompting, see what additional

[24:16] steps you take, and ask the model, "Can

[24:19] you do this?" You might be surprised at

[24:21] what it's capable of. I know for a fact

[24:23] that I was very surprised myself. What

[24:24] I'm trying to say here is that loops are

[24:26] cool not because the technology or the

[24:28] mindset's really cool, but the idea of

[24:30] letting agents do more is unbelievably

[24:32] powerful. If you take anything from this

[24:34] video, it really should be that. Ask

[24:36] your agent to do the next step and see

[24:38] if it impresses you. I know it impressed

[24:40] me.

[24:40] Let me know how it goes, and until next

[24:42] time,

[24:43] peace, nerds.
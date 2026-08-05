---
type: youtube
url: https://www.youtube.com/watch?v=AMiyLItEtLA
title: "fighting slop with slop — Vaibhav Gupta, Boundary"
channel: AI Engineer
date_saved: "2026-08-05T02:53:03.643Z"
---

# fighting slop with slop — Vaibhav Gupta, Boundary

[0:01] [music]

[0:13] >> Fighting slop with slop.

[0:16] My name is Vaibhav and I'm going to talk

[0:18] about something that is a little I would

[0:20] say maybe a little silly at first.

[0:23] I'm going to show you our team's

[0:24] engineering practices really quickly.

[0:26] We do no code reviews.

[0:28] We require every engineer to work on

[0:30] things in parallel.

[0:31] And we have no standardization on how

[0:33] people do AI.

[0:35] And I know immediately what almost all

[0:37] of you are thinking.

[0:38] We're probably a Zoomer YC startup.

[0:41] And I can guarantee you I'm clearly a

[0:43] millennial.

[0:44] So what do we actually do at our company

[0:46] without code reviews?

[0:47] Well, we built about 3 years ago we

[0:50] decided to build a programming language.

[0:52] That's something that has absolutely no

[0:54] room for slop. It's something that has

[0:56] to work every single time exactly the

[0:58] same way.

[1:00] It's something that you can't just

[1:01] change a year later or a month later

[1:03] because you made a bad design decision.

[1:05] You have to be correct. And for last 3

[1:07] years we've been in an onslaught of war

[1:09] against slop.

[1:11] And when I first met this enemy, I went

[1:14] to my great mentor.

[1:16] Slop Sue.

[1:17] And he taught me something.

[1:19] To to defeat the slop, we must become

[1:21] the slop.

[1:23] So we began and we prepared and then we

[1:26] started winning.

[1:27] So when we think about it, what is slop?

[1:30] Slop is just any code you don't read.

[1:32] And whether any of you admit it or not,

[1:35] this is the least amount of slop that

[1:37] your code base will ever have. Cherish

[1:39] it.

[1:41] So we started fighting back against the

[1:42] slop and we started fighting back with

[1:44] slop.

[1:46] So how do we go ship a stable

[1:47] programming language with these

[1:49] engineering practices?

[1:51] Well, the first skirmish we ever had was

[1:53] a skirmish of standards.

[1:55] The hard part about hiring great

[1:56] engineers is you sadly can't tell them

[1:57] what to do. Some of them want to use

[1:59] Claude, some of them want to use Codex,

[2:01] some of them want want to use the latest

[2:02] thing that they just found on Hacker

[2:03] News.

[2:04] So, instead of trying to hold standards

[2:06] in our codebase, we did something that

[2:08] is an invariant.

[2:10] We built an architecture.md file.

[2:12] Instead of using Claude.md, just pick

[2:14] something that every model can just

[2:16] understand. This file has to be

[2:18] incredibly small, and it can only have

[2:20] things that will not change for months

[2:22] or for years. In our case, it's the

[2:25] layers of the compiler. You go deeper

[2:27] into the compiler,

[2:28] tell the agent to just talk to at least

[2:30] one other person. That slows it down a

[2:31] little bit.

[2:33] So, now we have standards, so anyone can

[2:35] use whatever they want. But, the real

[2:36] foe we faced was actually the battle of

[2:38] design.

[2:40] Everyone here knows that you have to

[2:41] write perfect design docs. And we have a

[2:43] very simple rule in our team.

[2:46] Code can be slop, writing cannot. And of

[2:48] course, if I tell every engineer this,

[2:50] they write beautiful writing, and they

[2:51] handwrite everything, they don't use AI.

[2:52] Well, sadly not.

[2:54] So, we built a design tool design doc

[2:55] tool. What this design doc tool does,

[2:57] it's a replacement for both Notion and

[2:59] GitHub effectively for design docs. It

[3:01] will have versioning, commenting, all

[3:03] the stuff you want. And obviously, we do

[3:04] this, people use this. Well, sadly not.

[3:06] We built another tool on top of that.

[3:09] And this tool was a Slack integration

[3:10] for that tool. Every time a design doc

[3:12] got updated, this channel got

[3:13] notifications.

[3:15] And what ended up happening is this

[3:16] channel became the most popular channel

[3:17] in our company really fast. At 2:00

[3:18] a.m., someone shipped a new design doc,

[3:20] three people started reading it right

[3:21] away cuz it's just interesting. Then,

[3:23] most interesting stuff is design docs

[3:25] that are not going to change.

[3:27] But, this wasn't enough.

[3:28] All of this is actually backed by

[3:30] Markdown files and simple CLI scripts

[3:32] that make it treat like GitHub without

[3:33] being GitHub itself. So, now agents can

[3:35] go do this.

[3:37] But, the real problem with all this is I

[3:39] built this, and I hit a little bit of AI

[3:41] psychosis, and I started shipping 10

[3:43] design docs a day, and soon the team was

[3:46] fighting my slop.

[3:48] So, we had to go and back at the last

[3:49] rule. This last rule was, if you're

[3:51] going to ship a design doc, you require

[3:52] people to actually go read it. And with

[3:54] this last standard, we suddenly had

[3:56] design docs that were incredibly high

[3:58] quality.

[4:00] But what about the battle of

[4:01] architecture?

[4:02] You how do you have your code base

[4:03] converge? We built another tool. This

[4:05] tool basically visualizes our dependency

[4:07] graph internally with some external

[4:08] dependencies as well, and allows us to

[4:10] watch the code base change. It has

[4:12] semantic boundaries, individual

[4:13] packages, but what's more interesting is

[4:15] we can go build CLI tools that guarantee

[4:18] that certain invariants can't be broken.

[4:20] And what this does is when Claude builds

[4:22] a new package or adds a dependency

[4:23] that's leaky,

[4:24] we now have CI/CD changing or a simple

[4:28] Git commit history that tells us exactly

[4:30] where things break. And by this, we're

[4:32] actually able to make our architecture

[4:33] change. We haven't changed our

[4:34] architecture in the last three or four

[4:35] months.

[4:38] But as much as we might do design docs,

[4:41] and as much as we might have stable

[4:42] code, would you genuinely ship code

[4:44] without reading it? Would you trust your

[4:45] team to go do that?

[4:47] And think about a programming language.

[4:49] A programming language just so many

[4:51] invariants. You have generics, you have

[4:52] closures, you have memory allocation,

[4:55] you have FFI boundaries.

[4:57] Could you trust that system?

[4:58] Python has bugs 25 years later.

[5:01] Well, here's where we did something

[5:03] slightly different.

[5:05] What we did was we built a system

[5:08] that actually has agents constantly

[5:09] running and creating BAML programs.

[5:12] We take these BAML programs.

[5:15] 1 second.

[5:17] And we have agents try and spin

[5:18] something up from scratch. We then look

[5:20] at the entire Claude transcript, see

[5:21] what tools it used, see what happened,

[5:23] and obviously we as humans can inspect

[5:25] them.

[5:25] But more importantly, we can have agents

[5:28] go inspect them. And agents find what

[5:29] was good, what was bad.

[5:31] And not just what was bad in terms of

[5:33] what was incorrect in the language, but

[5:35] what took three tool calls when it

[5:36] should have only taken one.

[5:39] And then we can go ahead and find

[5:40] issues, and we can have humans

[5:41] collaborate with these issues to figure

[5:42] out which ones are real, which ones are

[5:44] hallucinations, which ones aren't don't

[5:45] have taste, as much as I hate to use

[5:47] that word.

[5:48] And then we can have agents go ahead and

[5:50] create fixes to these problems and go to

[5:53] address them.

[5:54] And most importantly, instead of trying

[5:56] to just detect these issues, we can go

[5:58] one step further.

[6:00] What if you could find language features

[6:02] and instead of guessing what was good,

[6:03] guessing what skill was good, you could

[6:05] go and AB test it. You could figure out

[6:07] which ones took less tool calls, which

[6:09] one took uh which one made less errors,

[6:12] which one produced the correct outcome

[6:13] and deterministically know

[6:15] what's going on.

[6:17] The point is you can start building

[6:18] data-driven systems without ever writing

[6:20] a single line of code.

[6:22] And the thing that really I care about

[6:24] the most over here

[6:26] is not that any one of these tools is

[6:28] specifically what you should go build.

[6:30] But the fact of the matter is in order

[6:32] to build a programming language, it

[6:33] wouldn't have taken eight people. It

[6:35] wouldn't have taken less than two years.

[6:37] It would have taken hundreds and

[6:39] thousands and tens of thousands of

[6:41] man-hours and then you would still have

[6:42] a broken system. And today we can just

[6:44] spend millions of tokens and make it

[6:46] work. And we can make it stable.

[6:48] And you could you two can go home and

[6:49] build these internal tools and these

[6:51] sloppy tools to make sure that your code

[6:54] bases can ship without really having to

[6:56] read necessarily every single line of

[6:57] code. Cuz your engineers aren't going

[6:59] to.

[7:01] And I think we can start winning this

[7:02] battle against slop. And as we win this

[7:05] battle, slop can be defeated.

[7:07] But sadly, I have a sad thing to say.

[7:10] I think we're still going to lose the

[7:11] war.

[7:13] I think the reason that we're going to

[7:14] lose this war

[7:16] is because

[7:17] some of the foundational stuff that we

[7:19] try and go use itself is broken.

[7:22] How many of you have used TypeScript?

[7:25] Probably most of you hopefully at this

[7:27] point or at least your agents have, so

[7:28] something around there.

[7:30] Um

[7:31] did you know that TypeScript's main

[7:33] design goal is to strike a balance

[7:35] between correctness and productivity?

[7:36] And there's an asterisk here because

[7:38] what they really mean is human

[7:39] productivity.

[7:41] And if you think about it, there are

[7:42] things you would never do in a

[7:44] programming language at the very core

[7:46] layer if you were designing for in a

[7:48] world where humans never wrote a single

[7:49] line of code. Let me show you what that

[7:51] really means.

[7:56] I'm going to write something and try and

[7:57] guess what this code does.

[8:01] Pretty safe.

[8:05] What about this one?

[8:08] Or even more so,

[8:10] this one. Why do we turn things to

[8:12] strings when we sort them?

[8:14] This is just

[8:15] slop baked into the language, whether

[8:17] you like it or not.

[8:19] What about this? I love this part of

[8:22] TypeScript.

[8:24] And you know what my agent loves?

[8:26] This part of TypeScript.

[8:30] This is slop baked into the language.

[8:33] And whether you like it or not, the

[8:35] systems will have slop

[8:38] if you build using these tools. Oh, I'm

[8:40] sorry, wrong talk.

[8:42] But,

[8:44] if you think about what JavaScript does,

[8:47] JavaScript exists, and then after

[8:50] JavaScript existed, we started building

[8:52] systems to layer it on. We built

[8:55] CoffeeScript, then TypeScript, and now

[8:56] we're trying to build a fact.

[8:58] But thing is, the thing underneath is

[9:00] already broken.

[9:01] And more so,

[9:03] the way we write code is also different

[9:05] now.

[9:06] So, why are we trying to patch something

[9:07] like this? Why don't we just try and do

[9:09] something a little different?

[9:10] And I think what we might need if we try

[9:12] and go do that is basically going to be

[9:14] a made-up language.

[9:16] So, let me show you what BAML really can

[9:18] do. And when you start thinking from

[9:20] first principles, how you can try and

[9:22] combat slop from the very foundational

[9:25] layer itself.

[9:26] I keep talking about not reading code.

[9:29] Does it even matter?

[9:31] Well, let me show you a new way to think

[9:32] about code. And this isn't to say we all

[9:35] have to go do this right away.

[9:37] But,

[9:38] what if every single time I look at

[9:39] code, whoops.

[9:47] What if every single time I look at

[9:48] code, what I really saw was not the code

[9:51] itself,

[9:52] but a quick little thing

[9:54] that could actually visualize all the

[9:56] code for me.

[9:58] As I clicked around, it took me to exact

[10:00] lines of code that was linked to. If I

[10:02] wanted to have a slightly broader view,

[10:04] I could zoom in and click around and

[10:06] have it expand. I could navigate my code

[10:08] bases more interestingly.

[10:10] I'm going to let this run really

[10:10] quickly, but while it runs, I'll show

[10:13] you a different pipeline.

[10:14] Without any of you ever reading the

[10:15] code, you know I'm setting up stuff and

[10:17] I have an agent loop because the

[10:18] semantic boundaries in there. I can

[10:19] expand this.

[10:21] I can keep expanding this and I can say,

[10:22] "Nope, that's too much slop. Let's let

[10:24] that be slop." And walk away.

[10:26] So, instead of having to understand all

[10:27] the code, I can opt into what parts of

[10:29] the code I want to read and understand

[10:31] and go to the exact lines when I really

[10:33] care about them.

[10:34] But, if we go back to the previous

[10:35] pipeline that was running,

[10:37] what if while it's running, I can

[10:39] actually get a full execution trace? In

[10:41] a world where we don't read all the

[10:42] code, the only way to understand the

[10:44] code is actually by the execution trace.

[10:46] And actually by seeing exactly how much

[10:48] time was spent on what parts of my

[10:50] program at any given time.

[10:52] If you want to go and actually track

[10:54] your program through, think about how

[10:55] slow your program would be if you have

[10:57] to go trace everything in Python or

[10:59] TypeScript. It's untenable.

[11:01] And the best part here is if you start

[11:03] from first principles, you can make this

[11:05] effectively zero performance cost.

[11:07] Not only can we make it great for

[11:09] humans, but because it's all

[11:11] built for agents anyway, you can go

[11:13] ahead and make it so that every single

[11:14] file has a tracing system that Claude

[11:16] can navigate through. So, Claude can

[11:18] find what were bugs, what were errors,

[11:19] and what were inefficiencies and start

[11:21] optimizing your code without you having

[11:23] to do it yourself.

[11:25] And I think if we go start thinking

[11:26] about it from this way,

[11:28] it's not so much about reading all all

[11:30] code, but it's more so about us human

[11:32] understanding the system that you're

[11:33] working with. And the tools that you can

[11:35] build can give you information about the

[11:37] system that you're working with.

[11:39] But,

[11:41] I think there's another layer to it.

[11:43] We've spent decades building IDE

[11:45] tooling. And that Think about how long

[11:47] it took before someone like me who does

[11:49] not know how to escape Vim to this day

[11:52] can finally start using VS Code. It was

[11:54] a beautiful day when that happened. I

[11:56] became a real programmer.

[11:58] Well, according to some people, I'm

[11:59] still not cuz I can't write Vim code.

[12:02] But, what does agent-first tooling look

[12:04] like?

[12:07] I think we're all familiar with grep, so

[12:09] I'm not going to go and talk about it.

[12:12] But, I will talk about Ripgrep cuz grep

[12:14] should not be used anywhere.

[12:16] If I want to grep through my code base

[12:18] and understand what it was, I would

[12:19] Ripgrep say something like calculate,

[12:21] and it'd give me a bunch of code where

[12:24] everything was being used.

[12:25] And maybe it'd be somewhat useful.

[12:28] But, what if you could instead start

[12:30] describing code and say, "Can you

[12:32] describe calculate for me?"

[12:35] What if it came with all the docstrings?

[12:37] What if it came with the actual source

[12:38] code? And what if it also told you

[12:40] everywhere it was actually used under

[12:41] the hood?

[12:43] We can make something that used to be

[12:44] multiple tool calls a single tool call

[12:46] all of a sudden.

[12:49] What if the way you want to learn about

[12:51] libraries that you're using, instead of

[12:52] having to go to a web search, you just

[12:54] said

[12:56] you did you could just ask for any

[12:58] external library as well.

[13:00] And it would just give it to you.

[13:01] Because when I first started learning

[13:02] how to code, one valuable lesson I had

[13:04] was the code is always the source of

[13:06] truth.

[13:07] Don't read anything but the code itself.

[13:09] The docs may lie,

[13:10] the um

[13:12] the actual description or architecture

[13:14] file or readme file will definitely lie,

[13:15] but the code cannot lie.

[13:18] Except if you're working on some weird

[13:19] architectures.

[13:21] And then when you go down this road, you

[13:23] go from not reading the code to

[13:24] understand the architecture. You go from

[13:26] not searching the code to understanding

[13:27] exactly what you're getting in every one

[13:29] tool call. But, what's the next thing

[13:31] you do? Well, the last thing I do to

[13:33] truly understand code is I run the code.

[13:36] So, what if every single thing you ran,

[13:38] every single function you ever wrote

[13:41] was immediately available

[13:43] And I'll pull this code over here.

[13:47] Was immediately available

[13:49] as a simple CLI command. So, if I run

[13:52] add,

[13:53] add becomes a CLI command that has A and

[13:55] B parameters attached to it. And I can

[13:57] just run it really quickly and see what

[13:58] happens.

[13:59] What if every single CLI tool I had

[14:02] could be packed

[14:04] into a live into CLI that's completely

[14:07] standalone.

[14:09] Multiply.

[14:12] That I can just run without ever having

[14:13] to actually execute any of the code.

[14:18] And it's now a total CLI binary that has

[14:20] functions just bundled in. Suddenly, we

[14:22] can build really quick tooling where

[14:24] agents don't have to go

[14:25] grep through what's happening.

[14:26] Everything is type safe, everything is

[14:28] deterministic, and everything is

[14:30] actually guessable.

[14:31] And the best part is imagine you could

[14:33] build on any system,

[14:35] and your agents don't have to worry

[14:36] about deployments across Windows, Mac,

[14:38] and Linux. And you can just

[14:40] target any layer you want, and it builds

[14:42] for any architecture, including WASM

[14:43] systems.

[14:45] All of a sudden, as an engineer, you're

[14:46] super charged. You're no longer

[14:48] bottlenecked by what you can do in the

[14:49] systems underneath you are preventing.

[14:51] You can just move very fast. You can

[14:53] move at agent speed.

[14:56] But, a lot of the stuff that I've been

[14:58] talking about to this date has been

[14:59] about tooling.

[15:01] What if we try to fix some of the real

[15:02] sins of JavaScript? Some of the stuff

[15:05] that is deep in the language. Not the

[15:08] sort stuff, but I mean more important

[15:10] stuff, like errors.

[15:12] Have you seen error handling be

[15:14] beautiful ever, other than Rust?

[15:17] Um

[15:18] what I see agents do over here is you do

[15:20] try catch, and then they keep nesting

[15:21] try catch after try catch after try

[15:23] catch. And eventually they give up and

[15:24] say console.log some error happened and

[15:26] deal with it.

[15:28] What if we could do error handling from

[15:29] very first principles? What happens in

[15:31] that world?

[15:34] Well, I showed you add, multiply,

[15:36] subtract. I didn't show you divide.

[15:38] Divide is dangerous. It's spooky.

[15:42] So, let's go look at divide.

[15:44] You can see over here, divide throws a

[15:46] division by zero error.

[15:49] But, what else happens? The function

[15:51] actually knows that it throws division

[15:52] by zero error.

[15:55] Without you having to write any any

[15:56] code.

[15:57] If I go up to the calculate function,

[15:59] which at some point calls divide,

[16:02] this function also knows

[16:04] it throws division by zero error.

[16:06] So, error types now get inferred without

[16:08] you ever having to do any guesswork.

[16:10] That means if you catch or handle

[16:12] errors, we can do exhaustive guarantees,

[16:14] and the compiler can prove that you have

[16:16] handled the error or not handled the

[16:18] error. It's no more guessing. There's no

[16:20] unknowns. It's guaranteed to be proven.

[16:23] So, if you wanted to ship an API

[16:27] where it guarantees that it never

[16:28] throws, well,

[16:29] this system is broken because it doesn't

[16:31] meet the constraints. It has two errors

[16:34] that you're not throwing.

[16:35] If you wanted to go catch that,

[16:37] well,

[16:38] I can write the code for that in a

[16:39] second.

[16:41] But, you can start catching certain

[16:42] errors.

[16:49] Uh I mean, I'm just going to return a

[16:51] sentinel value for now.

[16:53] And now this parse thing, which

[16:54] previously threw division by zero error,

[16:57] is now guaranteed

[16:58] to no longer throw the division by zero

[17:00] error because if I catch any exceptions

[17:02] in here, I return a zero value every

[17:04] single time.

[17:06] The compiler and the tooling can do a

[17:07] lot of work for us. And we're already

[17:09] used to this in our codebases. We many

[17:11] of us probably don't know how compilers

[17:12] work under the hood, and we trust them.

[17:15] Code is a matter of trust. The reason

[17:18] that we don't use ML code blindly is

[17:20] because we don't trust it yet, cuz the

[17:21] systems underneath them don't have

[17:24] enough rigidity.

[17:27] One more thing.

[17:28] But before I tell you all to go write a

[17:31] bunch of ML code, cuz

[17:33] I've been there and I can tell you what

[17:35] someone tell me if I said, "Hey, use

[17:37] this new programming language. It's

[17:38] going to solve all your problems." It's

[17:39] just going to become come with

[17:41] a whole slew of new problems.

[17:44] So, we said, "I think we'll lose the war

[17:46] on slop

[17:47] if we try to ask everyone to rewrite all

[17:49] their code in the world into this new

[17:50] system."

[17:51] So, what does a solution like that look

[17:53] like where you don't have to rewrite all

[17:55] your code?

[17:56] Well, we What we started to do was we

[17:58] started to think about that about 2

[18:00] years ago.

[18:02] And we said,

[18:04] "What if you could use ML not just

[18:05] stand-alone like I showed today, but

[18:07] from within any existing language of

[18:09] your choice? From Python to TypeScript

[18:11] to Rust to Go to Ruby to Java to

[18:14] anything new that comes up even after

[18:16] it."

[18:17] What if every function in ML is

[18:19] immediately accessible

[18:21] in the language of your choice? So, in

[18:22] this case, I'm calling the ML calculate

[18:24] function directly from Python, and it's

[18:26] completely type safe.

[18:28] Not only do we get calculate, we get

[18:30] calculate async in case some of us want

[18:31] to write async code. So, ML while it has

[18:33] no function coloring, it does give you

[18:35] the benefit of having to do whatever you

[18:37] want across your code.

[18:39] But what if you went a little bit

[18:42] sillier?

[18:44] What if you started passing around

[18:45] lambdas

[18:47] across language boundaries?

[18:49] I have a function here called with

[18:50] timeout. This function times out after a

[18:53] certain number of milliseconds, and if

[18:55] this work doesn't complete. And it's

[18:57] guaranteed to no matter how long it

[18:58] takes.

[19:00] Well, in that world, you can even pass

[19:02] Python lambdas across the bridge. You

[19:04] can pass generics across the bridge. You

[19:05] can pass closures. It should just work,

[19:08] so engineers don't have to go fuss with

[19:09] it. And more importantly, so when the

[19:11] agent does something, the type system

[19:13] never lies. The type system becomes the

[19:15] absolute center of truth that prevents

[19:18] invariants from entering your codebase.

[19:22] And what I really wanted to talk about

[19:23] today

[19:24] was not any one specific thing.

[19:27] But it's this general concept. You can

[19:29] build incredibly complex systems without

[19:31] traditional systems like code reviews.

[19:33] You don't You can work in things in

[19:35] parallel, and you can use AI however you

[19:37] want without requiring any sort of

[19:38] standardization.

[19:40] But the most important part is you have

[19:41] to be incredibly thoughtful about how

[19:43] your engineering team actually uses the

[19:45] systems under the hood.

[19:47] When we started building BAML, I didn't

[19:49] think it would be possible to build some

[19:50] of the software we did.

[19:52] And just yesterday

[19:53] one of our engineers built a partial C

[19:55] compiler purely in BAML.

[19:58] So, when I start pushing the boundaries

[20:00] of these systems and you stop reading

[20:01] the code, in some ways in my mind, it

[20:04] releases the floodgates for your

[20:05] engineering team to actually cover the

[20:07] gaps of what existed in your old

[20:09] process. Have you ever worked at a

[20:11] company that had no CI/CD? They said

[20:13] adding CI/CD would slow us down.

[20:15] They They do slow down for 3 months

[20:17] while they add it, but after that, they

[20:19] move a lot faster. Our processes have to

[20:22] evolve if we're going to ship at agent

[20:24] speed. And remember, this is the least

[20:26] amount of slop your codebase will ever

[20:28] have to this day. So, just embrace it

[20:32] and start fighting it back.

[20:34] I fell in love with software about 15

[20:36] years ago, and it was the first thing

[20:37] that truly changed the way I perceive

[20:39] the world.

[20:41] And I really genuinely don't want slop

[20:42] to win. And I think we can all build a

[20:44] world of beautiful software.

[20:47] And I think what it takes is I want each

[20:48] of you to go home today and build these

[20:50] sloppy tools. Make your systems more

[20:52] robust. Make your processes more robust.

[20:55] And then for the bravest of you,

[20:57] I want you to go back and think about

[20:59] these core foundation layer systems.

[21:01] Think about how they're broken and see

[21:02] if you can imagine a way to fix them. I

[21:04] think we do need a new Git. I think we

[21:06] do need a new database, and yes, I think

[21:09] we need a new programming language. I'm

[21:11] Vaibhav, and I work on Bemo. Thank you.
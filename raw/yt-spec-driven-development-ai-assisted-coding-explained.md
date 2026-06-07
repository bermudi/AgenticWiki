---
title: "Spec-Driven Development: AI Assisted Coding Explained"
author: "IBM Technology"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=mViFYTwWvcM"
date_saved: "2026-06-07T02:09:23.125Z"
---

# Spec-Driven Development: AI Assisted Coding Explained

[0:00] Right now, the way apps are getting built is completely changing because before, writing and

[0:04] reviewing code was the hardest part. But now it's knowing how to effectively convey what you want

[0:10] to build with an LLM. And then, my friends, is what's known as spec-driven development.

[0:16] Thank you very much. Nah, I'm just kidding. Because the thing is, spectrum and

[0:23] development has become one of the most important skills to learn if you're looking to be an AI

[0:27] engineer or to use AI to help build your applications. But let me explain why it's

[0:33] different from a common technique that you might also know, which is vibe coding, right? And this

[0:39] is typically what people think of when they think of AI-assisted coding or coding agents. So I want

[0:45] to give you a quick example of what vibe coding typically looks like, and we'll kind of compare

[0:50] how this is different than spec coding here in a second. But as a user, as a developer, as a builder,

[0:57] what you're going to start from is typically your AI coding agent, whether it's in a browser or it's

[1:01] on your machine itself. You're going to start from that initial prompt. So you're going to write that

[1:08] initial prompt to the LLM and say, hey, I want a specific application that does this functionality

[1:14] in this specific language like Java or Python. And that prompt is then sent to the model, and that

[1:20] model is then going to start generating code based on what it thinks that you want from that

[1:26] project and that it's been trained on as well. So at this point, we've got some boilerplate code, and

[1:32] this is great for testing. That's why I love vibe coding for, and we're going to go from here. But

[1:36] the thing is we might not have the exact desired implementation that we want. So we're going to go

[1:41] ahead and edit that prompt. So we're going to say actually I wanted um, something different

[1:48] or to use a different type of library or something like that. So we'll go from the prompt

[1:53] editing over to the AI uh, still continuing to code, and we'll go back and forth until we

[1:59] reach that desired implementation after a few tries. Right? So we are at the desired state

[2:06] of implementation. So that's typically what we see when we're doing vibe coding. But the thing is

[2:11] like how did, for example, the AI model decide to make that specific decision

[2:18] that it did based on the prompt that we gave? Because we could do a hundred different tries of

[2:23] this implementation of the app we want to create. We might get a different result every time. And

[2:27] that frustrates a lot of people. And the thing is,uh, vibe coding kind of skips the traditional

[2:34] software delivery lifecycle, also known as the SDLC that we're used to in software

[2:41] engineering. So the software development lifecycle takes a little bit of a different approach,

[2:46] because we start our project by planning and designing using specific project requirements, or

[2:52] the PRD as it's typically called. And then we take what we need and require for our project and

[2:58] begin to implement those features. Once we have those features, we test to see if they work. We do

[3:04] a little bit of quality assurance, and then it goes into the deployment phase—from dev to

[3:09] staging to production and finally the maintenance of that project. And so while vibe coding is

[3:16] fantastic, and I know it feels like magic, spec coding takes a little bit of a different approach

[3:21] and adds in some of these software development lifecycle components to AI-generated software

[3:27] development. So let's take a look at what spec coding looks like in a hypothetical scenario. So

[3:32] spec coding or spec-driven development n-again is going to take into consideration some of those

[3:38] software development lifecycle aspects, right, but also use the LLM just like vibe coding in order to

[3:44] as a AI agent write code or run these tests. But it all starts, um, with the prompt, of course, at

[3:51] first. But the thing is, we're not prompting a specific implementation. We're prompting what we

[3:56] want our system to do, so the behavior, the constraints that we want. And that specific uh,

[4:02] specification is then used like a contract to create a requirements. And this requirements

[4:09] is going to be kind of the main hierarchy of how this project is going to work. So how we want the

[4:14] model and the agent to write code, to do tests, documentation, verification and much, much more is

[4:21] all going to be focused from around the requirements itself. And the thing is, if we're

[4:26] happy with those requirements, so if we're happy we can approve and we can say yes, I want to turn

[4:32] this requirements specification into a design document that will then have to-dos for each

[4:38] specific implementation. Or I can say, hey, I want to edit how I want this project to be implemented,

[4:44] because at this point nothing has been implemented and AI models are all about proper

[4:49] instructions. So having a spec like this is much better than having the LLM guess what solution is

[4:54] going to hopefully best fit the user's request. So we go from the design here, and if we're happy

[5:01] with that design and how we actually want it to be implemented in code, well, then we can have the

[5:07] model, if we're happy, go off and implement this. So we can go and use that AI agent, or we can

[5:13] continue to do more requests on the specific implementation features that we want to get back

[5:18] to. And that's how spec coding works. But really quickly, I want to explain how it's different than

[5:23] other development cycles. So in traditional development, so the way that,uh, you know, most folks

[5:30] kind of started by writing code, it was uh, first code, right? And then afterwards it

[5:37] was documentation, right? So we would kind of start with our intuition um, and we would kind of go from

[5:43] there. The thing is, we also started to work with test-driven development. So test-driven

[5:48] development, as you can probably assume in the name, is where we start from the test and what the

[5:54] functionality we want for this, you know, application's behavior to be, and then go into

[6:00] writing the code afterwards. So that was also another popular way to approach

[6:06] development. And the thing with uh, spec coding, so spec-driven development is it kind of turns it

[6:13] on its head. So we kind of go from specifications, these specs that we have here, to the design

[6:20] document requirements and actually implementing that. And then we go to code. And so it's kind of

[6:26] test-driven development and behavior devel ... driven development on steroids, which is really

[6:31] cool. So let me give you a quick example of how this works in practice. So, we'll start off with

[6:36] vibe coding. So with vibe coding, again, we're just talking to the model. We're doing quick edits on

[6:41] the fly. I think that's that's what it's best for, right? We're going to say hey we need um, let's see,

[6:46] what do we need. Uh, maybe, um, a slash login page for our users, um, to

[6:52] authenticate. So,okay, that's a great request to the model. But how does it, how do we know what

[6:57] it's going to do? It might have 30 different ways to implement this, and we might have to go back

[7:02] and forth with the model. And that can take sometimes longer than just writing the code

[7:06] ourselves. So, vibe coding is one way to approach that problem. The spec-driven development uh, approach

[7:13] is a little bit different, but of course still using the LLM to create this requirement that we

[7:19] have for this feature, right? So, in this case, with spec-driven development, we're going to have a

[7:24] new feature. And this feature is going to be user authentication, right? So, this is a

[7:31] new feature that we want to the LLM to build out. Of course, we haven't started implementing yet.

[7:35] This is just the kind of planning phase.Uh, and we're going to say hey, this is going to be an endpoint

[7:40] at slash login to do post requests to. Okay, awesome. And then what

[7:47] variables are we going to take for the username and password. Well, we can say hey we're going to

[7:52] accept two different variables, so they're going to be user and then pass. Awesome.

[7:59] So that is in there, and we know when the implementation starts why it got to this

[8:03] conclusion. Um, let's say for some reason if it doesn't work, we're going to have a fallback, a

[8:09] failure code. Um, if missing, I don't know, it's a username. Right? And then we can also generate

[8:15] test cases from here. So, let's go on to test. And we're going to say hey um, valid

[8:22] credentials. Um, we'll give a 200 code. And this is really cool because

[8:29] when we're doing AI-assisted coding, we now have less ambiguity for our coding agents. And we can

[8:35] use spectrum encoding to kind of flip the traditional development model, right, so that we

[8:39] have this spec and that becomes the primary artifact that drives all this downstream work

[8:44] like implementation and test and much more. If you learned something today, I'd love if you could hit

[8:49] the like button and hack the algorithm. And make sure you subscribe for more content around AI and

[8:54] application development. Have a good one!
---
title: "Systems Building Systems"
author: "Eero Alvar"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=RxdvzenLcl4&t=569s"
date_saved: "2026-06-06T01:46:58.353Z"
---

# Systems Building Systems

[0:00] Software factories. I think that's the

[0:02] next logical step in agentic

[0:04] engineering. So, shifting away from

[0:06] building the software to designing the

[0:08] systems that build the software. What

[0:11] people, including me, are currently

[0:13] doing is sitting in the terminal

[0:16] building with the agents, moving one

[0:18] feature at a time, and constantly

[0:20] steering the agents. So, the question

[0:23] is, could this be automated? Then, you'd

[0:26] have a software factory that turns an

[0:28] input into a finished build repeatedly.

[0:32] Now, the specific input format would

[0:34] depend on the system, but I'm imagining

[0:37] something very close to a spec. Uh next,

[0:39] I'll make a mathematically very

[0:42] unrigorous analogy, but it helps to

[0:45] illustrate a few points that I want to

[0:47] bring up. And this is sort of the

[0:49] picture that I've been I've been

[0:51] thinking about this with. So, the

[0:54] software factory is a mapping from

[0:57] spec-like inputs to finished,

[1:00] ready-to-ship software. Now, a very

[1:03] crucial detail I'm overlooking here in

[1:06] this diagram. The input and output

[1:08] spaces don't actually look like this.

[1:12] Instead, they look something more like

[1:13] this. The space of possible inputs is

[1:17] tiny compared to the space of possible

[1:20] outputs. And only a very small subsets

[1:23] of these are desirable outputs, meaning

[1:27] software that is production ready and

[1:30] aligned with the input. So, fully

[1:32] functional, no vulnerabilities, no bugs,

[1:35] perfectly aligned with the vision, fully

[1:37] secure, ready-to-ship software. Now,

[1:40] stuff outside this very tiny subset is

[1:44] what we'll call slop. And this is the

[1:47] core of the problem. The hard part isn't

[1:50] building the machinery, the agent

[1:52] workflows, the harnesses, whatever, that

[1:55] take in a spec and produce something

[1:57] resembling a finished software product.

[2:00] It's very trivial to build an agent

[2:03] system that takes in a spec and produces

[2:06] something that lands somewhere in the

[2:09] stuff resembling finished software

[2:12] output space. The hard part is aiming

[2:15] the system to land in the desirable

[2:17] subset. Now, a system like this

[2:19] obviously isn't a mapping. That's just

[2:22] an analogy. Yeah, it's it's not even

[2:25] deterministic, but I think it's a useful

[2:27] analogy cuz it opens up the question, is

[2:30] a system like this chaotic? And I would

[2:33] assume yes cuz you could imagine

[2:36] tweaking the initial condition, the

[2:38] input spec, even just a tiny bit, and

[2:42] even when taking to be entirely

[2:43] deterministic, seeing a completely

[2:46] different output. So, what if instead we

[2:49] looked at a mapping from inputs to sets

[2:53] of in some sense equivalent software

[2:56] where all the different implementations

[2:58] in a set share only the meaningful

[3:02] aspects, and we're discarding all the

[3:04] trivial stuff such as UI, UX,

[3:08] functionally equivalent code, and all

[3:11] all that. Then, would this mapping also

[3:14] be chaotic? Cuz if it is, then the

[3:18] tuning of the system would become

[3:21] tremendously more difficult. So, we've

[3:23] established that the hard part of

[3:25] building a system like this is tuning it

[3:28] in a way that the outputs would land in

[3:31] the desirable subsets. But, let's think

[3:33] about what a system like this could look

[3:36] like in practice.

[3:37] So, I'll share some design ideas that

[3:39] I've been thinking about recently. All

[3:42] right.

[3:43] This is the obvious first thing to try.

[3:46] I mean, we already have a proven system.

[3:48] It's you prompting coding agents.

[3:51] So, what if we just swap you for a

[3:54] master orchestrator agent that then does

[3:58] the exact same cloud code prompting that

[4:01] you've been doing? The system is proven

[4:03] to work, so just swap out you for a AI

[4:07] agent. That's the idea. Now, problems

[4:10] and objections. We would need to extend

[4:12] the master agent's life, the session

[4:16] length, in a way for it to be able to

[4:19] persist indefinitely past its context

[4:22] limits. Uh also this is a very

[4:24] human-like workflow, and even though it

[4:27] works for humans, it may not be optimal

[4:29] for agents. Now, a variation of this, we

[4:33] just add more coding agents with their

[4:35] own specific tasks, [snorts] sort of

[4:37] like a company-shaped hierarchy. Again,

[4:40] with a master agent at the top, giving

[4:43] out commands to team leads of different

[4:47] departments, and then these leads would

[4:49] task uh worker sub agents to actually

[4:53] build things. This has the same problem

[4:56] having to do with agent's persistence,

[4:58] and again, company-shaped hierarchies

[5:01] are very human, so it may not be optimal

[5:05] for coding agents. Third option, uh task

[5:08] decomposition.

[5:10] Uh we divide the task of building a

[5:13] production-ready software into phases,

[5:16] and each phase has its own

[5:18] phase-specific context and instructions.

[5:21] And again, uh we could add a master

[5:23] agent to oversee everything. This would

[5:26] divide the aiming problem into multiple

[5:30] smaller aiming problems, which could

[5:33] either be good and make it easier, or it

[5:37] could make it harder as tuning errors in

[5:40] previous phases would propagate into

[5:44] subsequent phases. So, the problem

[5:47] doesn't disappear, it just kind of

[5:49] changes form. Now, what you might have

[5:51] noticed is that the shared problem in

[5:54] all of these designs is agent

[5:56] persistence. For long-running complex

[5:59] tasks, a single session obviously isn't

[6:03] enough. I mean, we could try to solve

[6:05] this just by adding more and more master

[6:08] agents, extending the hierarchy upwards.

[6:11] So, the idea would be that the top-level

[6:14] master oversees everything at such a

[6:17] high abstraction level that the whole

[6:19] build from start to finish can fit in

[6:22] its session context. But, this may not

[6:26] be ideal for two reasons. One, the chain

[6:30] of command gets longer and it becomes a

[6:34] sort of a game of telephone. The risk of

[6:37] hallucinations and information not

[6:40] propagating efficiently

[6:42] increases with each layer. Two, a system

[6:45] like this would likely exhibit more

[6:48] chaotic behavior. The longer we make the

[6:51] command chains, the less control we have

[6:54] over what's actually being produced, the

[6:56] code that's being written by the

[6:58] bottom-level workers. So, I imagine that

[7:02] it would become more chaotic and thus

[7:05] more difficult to tune, which is the

[7:07] whole problem. So, adding more layers of

[7:10] orchestrators likely isn't the solution.

[7:13] And I feel like extending the agent's

[7:16] life is a problem we're going to have to

[7:19] tackle head-on. How do we make an agent

[7:21] persist, remove the context limits, and

[7:25] make it immortal? What different options

[7:27] are there to agent's autonomy? Here are,

[7:31] very briefly, my first instincts or

[7:34] initial ideas. First, a new session

[7:37] tool. So, basically, just a new tool for

[7:40] the agents that allows it to end its

[7:43] current session and start a new one. The

[7:45] tool would take in a prompt as an input,

[7:49] which would be the first user message to

[7:51] launch the new session. So, I've

[7:53] actually built a very basic version of

[7:55] this

[7:56] just to try it out and see how the

[7:58] agents would behave with a tool like

[8:00] this. And here's the problem that I've

[8:02] run into with this approach. The new

[8:05] session starting mechanism actually

[8:07] works okay, but the amount of markdown

[8:11] files grows very large. The agent

[8:14] doesn't know or care enough to clean up

[8:18] at any point. So, it reads a ton of

[8:20] context, the same markdown files over

[8:23] and over again, and isn't able to do all

[8:25] that much per session. So, a ton of time

[8:28] and tokens just spent on reorienting

[8:32] itself to the new session, and can't

[8:34] really get much done. So, another

[8:36] option, which could keep everything in

[8:39] one single session, is a compact tool.

[8:43] Basically, allows the agent to run a

[8:47] session compaction. This would allow us

[8:49] to stay in one session and just extend

[8:52] it forever. But, compaction is pretty

[8:54] ass. It's not It's not great. The agent

[8:58] has less control over what its context

[9:00] will look like after the persistence

[9:03] mechanism. But, what I feel like is the

[9:05] bigger problem in both of these

[9:07] approaches is that the agent has to

[9:10] think about context management. And

[9:13] ideally, this shouldn't be something the

[9:15] agent has to think about. I mean, it's

[9:18] got enough stuff to juggle at once when

[9:20] it has to orchestrate building full

[9:22] software end-to-end. So, making it also

[9:25] juggle its own context or session

[9:27] management may not really be ideal. So,

[9:31] third idea,

[9:32] run a babysitter agent alongside the

[9:36] master orchestrator, specifically in a

[9:39] way that the master agents isn't aware

[9:41] of its existence but the babysitter

[9:44] silently manages the masters context or

[9:48] starts new sessions in a smart way. For

[9:51] example, it could write the perfect

[9:53] launch prompts for new sessions so that

[9:56] the agents work would flow seamlessly

[9:59] from session to session. The babysitter

[10:02] would effectively act as the agents

[10:05] subconscious mind. Also, before I end

[10:07] the video, as tuning is the main

[10:10] problem, I'm going to present a few

[10:12] initial thoughts or ideas on how a

[10:15] system like this could be tuned. First,

[10:18] this is how you build software

[10:20] end-to-end scale. Of course, it wouldn't

[10:22] be a scale, it would be a library of

[10:25] instruction documents detailing every

[10:28] part of what goes into building

[10:30] software. And by tweaking these

[10:33] instructions, we could aim the system to

[10:36] not produce slop. Second approach I see,

[10:39] verification or validation agents. If we

[10:43] go with a phase decomposition based

[10:46] architecture for the system, then this

[10:49] would naturally happen between the

[10:50] phases. Or if we have a persistent

[10:54] master agents based approach, then we

[10:57] could include tools for the master

[11:00] agents to periodically spawn a

[11:02] verification agents and check its work.

[11:05] And then by tuning the verification

[11:07] agents, we could aim the system. But

[11:10] either way, the aiming will be the

[11:13] slow, expensive, and difficult part.

[11:18] But yeah, just some ideas that I've been

[11:20] thinking thinking about, especially

[11:23] after Indie Dev Dance video on exactly

[11:26] this. The jump in leverage And from

[11:31] building systems to having systems that

[11:36] build systems

[11:38] uh

[11:38] >> [snorts]

[11:39] >> is is huge. And specifically now when

[11:43] that kind of stuff doesn't really exist

[11:46] yet. Or at least isn't accessible to

[11:49] everyone. So,

[11:52] the way I see it is that

[11:54] agentic engineering is a

[11:57] is a major opportunity. Uh specifically

[12:00] for technical people. And the time to

[12:03] compound advantage

[12:06] is now.
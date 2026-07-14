---
title: "MemoryGraphRAG (Outperforms Every RAG)"
author: "Discover AI"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=RfAbsdq_b-A"
date_saved: "2026-07-13T23:24:25.412Z"
---

# MemoryGraphRAG (Outperforms Every RAG)

[0:00] Hello communities. So great that you are

[0:03] back. Yes, today we talk of 40

[0:05] development on rag. You know, we had

[0:07] graph rag and now we have a memory graph

[0:10] rag. And yeah, absolutely we built a new

[0:13] memory graph layer with an ontological

[0:16] layer with three different memory layers

[0:19] and it will improve the performance of

[0:21] our system.

[0:22] And here we have it. This is here from

[0:24] Xi'an Jiaotong University and Jilin

[0:26] University. MemGraph rag memory-based

[0:30] multi-agent system for the graph

[0:32] retrieval augmented generation and you

[0:34] sing back to the good old times and you

[0:36] said, "Where is my vanilla rag?" But

[0:39] forget about it. We have now this new

[0:41] and novel framework that introduces now

[0:43] a memory-based multi-agent system to

[0:46] ensure high-quality graph construction.

[0:50] And if you're new to this, you say, "But

[0:51] why? We had graph rag. It was perfect."

[0:54] And no, graph rag had three main

[0:57] problems. And they now cope with each of

[1:00] the problem, they found a solution to

[1:01] this problem. So, let's start. Graph rag

[1:04] had a problem of a thematic irrelevance.

[1:06] Let's call it the noise. Because the LLM

[1:08] reads your chunks out of the context, it

[1:11] extracts sometimes irrelevant sites and

[1:15] side notes. So, for example, in a

[1:16] medical text about cancer, it might

[1:18] extract you the triplet the patient

[1:20] prefers tea over coffee. This is nice,

[1:24] but maybe this is not here really

[1:26] relevant for the analysis.

[1:28] Second, logical inconsistency or called

[1:31] the lies. Different chunks of text often

[1:33] contradict each other, especially have

[1:36] multi-sources, no? One says, "Hey, Isaac

[1:39] Newton was born in 1643." And the other

[1:41] says, "No, Newton was born in 1645."

[1:44] And a naive graph rag simply merges now

[1:46] both facts creating a split timeline

[1:48] that confuses now here the downstream

[1:51] retrieval. And third problem was the

[1:54] cracks, the structural fragmentation.

[1:57] Without a global taxonomy, the growth

[1:58] becomes fragmented. And we'll show you

[2:01] how we can cope with this. So, the same

[2:04] entity might be written here as Newton

[2:06] in one place and Isaac Newton in another

[2:09] place, resulting here in disconnected

[2:11] islands. Think about this as a

[2:12] three-dimensional graph structure that

[2:14] prevent now a multi-hop retrieval from

[2:17] traversing here the complete database.

[2:20] We are locked in here maybe to some

[2:23] graph islands.

[2:24] We want to solve this.

[2:27] So, beautiful. And in general, you can

[2:30] say if you have here on the x-axis the

[2:31] recall in percentage and on the y-axis

[2:34] the relevance in percentage, vanilla RAG

[2:36] did great, but look where it is

[2:38] positioned, huh?

[2:40] So, graph RAG achieves a higher recall

[2:42] percentage, absolutely. So, this means

[2:44] it finds more potential clues, but it

[2:47] has a catastrophically low relevance

[2:50] because more or less it drowns the LLM

[2:52] in noisy, contradictory context. Yes, of

[2:56] course, we have hypo RAG and some GFM

[2:58] RAG and everything. And if you are new

[3:01] to my channel, I have a complete a

[3:03] playlist on YouTube here about RAG 3.0

[3:07] agency. So, there's nothing about the

[3:09] vanilla RAG. This is already RAG 3.0.

[3:12] So, if you want to see here S-PaRAG or

[3:14] whatever you like, we have a lot, a lot

[3:17] of RAG systems.

[3:20] But what is the latest memory graph RAG?

[3:22] This is here a three-layer global memory

[3:26] that more or less we add here to the

[3:28] graph RAG system.

[3:30] So, here you have it compared to the

[3:32] graph RAG here on the bottom, you see

[3:34] MemGraph RAG. So, we have the chunking,

[3:36] we inject it, but we have now three

[3:38] different layers of memory. We build now

[3:41] a hierarchical graph, and we will have a

[3:43] good old friend from Google in the

[3:45] retrieval page ranking mechanisms here

[3:48] to extract the facts from all the text

[3:51] passages.

[3:53] So, let's start.

[3:54] At first, we have to have here the

[3:56] memory-based indexing of the graph

[3:58] construct itself.

[4:00] So, what we have we have unstructured

[4:02] document where we store thousands and

[4:03] millions of documents, beautiful.

[4:06] And I will show you later on we have

[4:07] three agents. And the first agent here

[4:09] is the extraction agent, guess what?

[4:12] And takes care that it is positioned now

[4:14] in three different memory layers.

[4:18] We have global memory here. And the

[4:20] first one is the ontology layer.

[4:22] You know, we have here a schema, no?

[4:25] Where we have our graphs. Either this

[4:27] person rule country or person native

[4:29] location or company create product,

[4:31] whatever. Now, for your particular

[4:33] documents, this builds now a frequency

[4:36] filter for this stable schema for the

[4:38] top K schemas. Like, I don't know,

[4:41] country capital city or person job

[4:43] profession.

[4:45] So, the ontology layer stores schemas

[4:47] with the extraction frequency of your

[4:51] training documents.

[4:52] And then we have the factual layer.

[4:55] And this is where, guess what, maintains

[4:57] here the concrete facts, beautiful. As I

[5:00] showed you, we have now from two

[5:02] different documents here a Newton birth

[5:03] year birth year 1643 and Newton birth

[5:06] year 1645.

[5:08] So, what's this happening? From this

[5:10] fact layer, we have now the second

[5:12] agent, our conflict detector agent.

[5:15] And understands, okay, there is a

[5:17] conflict and

[5:20] you know, we have to keep the agents

[5:21] simple. Don't give them two jobs, only

[5:23] one job because, yeah, LLM is not that

[5:25] capable. And then we hands it over to

[5:28] the next third agent, and the third

[5:30] agent is now our conflict handler. Guess

[5:33] what?

[5:34] This conflict handler looks now at the

[5:35] triplet here at the conflicting triplet,

[5:38] looks at the original document and says,

[5:40] "Okay, it can only be one true, no?" So,

[5:43] given here what is the documentation

[5:45] here, it now decides one of them is the

[5:48] correct one and beautiful. And this is

[5:50] here in the passage layer because here

[5:53] in the passage layer it preserves the

[5:55] original text passages for the evidence

[5:59] grounding.

[6:00] This is here absolutely important.

[6:02] So you see this is here where we say if

[6:05] we have a debugging neurological

[6:06] debugging what we do, we go here to the

[6:09] passage layer and we see exactly here

[6:11] what was the incoming information and

[6:13] why did here the conflict detect on the

[6:15] conflict handler agent choose here a

[6:17] particular document.

[6:20] And then if we have all of this memory

[6:22] full of data, we build a graph. So we

[6:25] start here in

[6:27] at the bottom here with a passage graph.

[6:29] Now here we have the entity, the

[6:31] documents, everything is there.

[6:32] Beautiful. Then we build our fact graph

[6:35] here from the fact memory layer. We have

[6:38] here the entities for example coach, the

[6:40] relation is job and the entity is I

[6:43] don't know Simpson or

[6:45] John or whatever. And the weight is one.

[6:48] And then we have the ontology graph in a

[6:50] hierarchical structure here where we

[6:52] have the schema. So the schema is type

[6:55] is person, relation is job, the second

[6:57] type is profession and the weight is now

[6:59] five in your unstructured document

[7:02] training data.

[7:04] So as you see we have now three

[7:06] interconnected graph views.

[7:09] So

[7:10] at first we have the semantic ontology

[7:12] graph derived here from M ontology which

[7:15] encodes here the schema level type

[7:17] relations and the structural constraint

[7:20] of those two, eh?

[7:21] Then we have here second the fact graph

[7:23] constructed here from the memory fact

[7:25] factual which represents here the

[7:27] no, the instantiated entity relation

[7:30] triple for multi-hop reasoning and then

[7:33] we have the source evidence graph that

[7:34] grounds here everything in the supported

[7:37] text passages.

[7:38] Now as I already showed you we have

[7:40] three agent, they call it a multi-agent

[7:42] group and for a particular reason I'm

[7:44] going to explain at the end of this

[7:45] video, they go with a GPT-4 Omni Mini. I

[7:49] don't know if it's available officially

[7:51] from OpenAI, maybe

[7:52] Omni, I think, is now here.

[7:55] Yeah, whatever.

[7:57] And they say, "Okay, we need three

[7:58] agent." And I showed you already what

[8:00] the agent do. So, check mark, beautiful.

[8:04] Just to make sure, the memory itself is

[8:06] not a passive data store.

[8:08] It is here, if you want, or it enforces

[8:11] here a two-way relationship. So, what we

[8:13] have is a schema instance alignment. So,

[8:16] every fact in the fact layer must be

[8:18] governed by a valid rule in the ontology

[8:21] layer.

[8:22] And we have a fact and evidence

[8:25] grounding. This means every fact in the

[8:27] fact layer is mathematically tied up

[8:29] here to the exact text passage in the

[8:31] passage layer where it was found.

[8:35] And if a fact is questioned, the system

[8:37] can instantly point to this exact source

[8:40] text, beautiful.

[8:43] Now, I told you about some disconnected

[8:45] some island in the graphs, now. And to

[8:48] to prevent now this fragmentation here,

[8:50] the authors of this paper today of

[8:52] memory graph wreck bridges now here with

[8:55] two

[8:56] particular bridging mechanism here.

[8:58] They bridge the disconnected parts of

[9:00] the graph using here two methods. At

[9:02] first, we have a type-based bridging,

[9:05] simple, linking here distinct entities

[9:07] if they share a high-level category

[9:09] classification in the ontology layer.

[9:13] Beautiful. And a similarity-based

[9:15] bridging, this is drawn on some

[9:17] invisible

[9:18] or rather weak connection between

[9:20] entities whose Now, hold on to your

[9:23] socks, we are back here to the semantic

[9:25] vector embedding, are highly similar,

[9:28] ensuring that structural traversal can

[9:30] navigate here across the document

[9:32] boundaries. So, we still have here a

[9:34] good old cosine similarity.

[9:37] This is all done offline. Now we come

[9:39] here to the real case real world case

[9:42] online retrieval. So now we come we have

[9:44] an incoming query for me for example,

[9:46] yeah?

[9:47] So, my question is here now. Great. So,

[9:50] what is happening? As you see, we have

[9:52] more or less three steps, one, two, and

[9:54] three.

[9:55] So, at first we have

[9:57] memory guided retrieval and reasoning

[9:59] now in three states. They just

[10:01] first multi-layer memory retrieval,

[10:04] yeah? Which retrieves now candidate

[10:06] schemas, facts, and passages from the

[10:09] memory.

[10:11] Because my question is here, let's say,

[10:13] about physics and I have a lot of

[10:16] physical knowledge here in my memory and

[10:18] in the three different layers.

[10:20] Beautiful. Then, second is here the

[10:23] structure-aware node initialization.

[10:26] What does it mean? It simply maps the

[10:28] retrieved evidence to some initial node

[10:31] weights based on the semantic relevance

[10:33] and on the structural signals that we

[10:36] have in the network. This is classical.

[10:39] And finally, and this is now the beauty,

[10:41] if you want, we have a personalized

[10:44] PageRank. Good old Google. Google

[10:47] started out with PageRank algorithm when

[10:49] I started here to study how does Google

[10:51] do its job here. PageRank 100 of years

[10:54] in the past. Never mind, we still use

[10:56] this algorithm now here in the online

[10:59] retrieval in the third step. So, graph

[11:01] propagation, which run here personalized

[11:04] PageRank over the heterogeneous graph to

[11:06] rank now globally important nodes and

[11:09] passages here for the LLM generation.

[11:12] And then, all the information is coming

[11:14] here to an agent and then here this

[11:15] agent now provides the answer here to my

[11:17] question.

[11:19] Great.

[11:21] So, if you just want to have it a little

[11:23] bit more in an abstract notation, when a

[11:25] user submits a query, we have at first a

[11:27] parallel extraction. Now, the system

[11:28] retrieves the relevant schemas, the

[11:30] relevant facts, and the passages from

[11:33] the three global memory layers

[11:34] simultaneously.

[11:36] So, if I have a question about physics,

[11:37] it knows exactly, okay, somewhere in the

[11:40] memory there's the physics department

[11:41] and just grab all the physics.

[11:43] Then we have the smart reset weights.

[11:46] Now, this calculates here the starting

[11:48] weights for the graph nodes. So, what it

[11:50] does, it first it has to suppress the

[11:52] generic hub categories, no? Like these

[11:55] general terms like person or particle or

[11:57] light or photon, no?

[11:59] Because

[12:01] they don't want to drown out here in the

[12:03] specific notes during this research. And

[12:05] then they have to prioritize passages

[12:08] with a high information density.

[12:10] So, documents containing rare, highly

[12:12] specific experimental data from my

[12:15] latest experiments, so I know exactly

[12:18] here where my data source is.

[12:20] And then, yes, as [clears throat] you

[12:22] know, the PageRank mechanism. It simply

[12:25] runs a propagation walk across the

[12:27] entire graph to let the semantic energy

[12:29] flow outward from the query relevant

[12:31] seed nodes, and this means we really

[12:34] identify the most critical paths and

[12:36] passages in this complex graph, which

[12:38] are then passed on to the generator LLM

[12:41] to provide an answer to the user.

[12:43] Great. So, one would say, "Hey, this

[12:45] sounds simple. This is straightforward.

[12:47] There's nothing that we say we have to

[12:49] calculate something mathematically that

[12:51] is crazy." No, benchmarks.

[12:53] So, let's have a look. We have here

[12:56] different benchmark Hotpot,

[12:59] WikiMulti, Hot Music, and on and on, and

[13:02] then overall. So, let's have a look.

[13:04] The authors structured this here in a

[13:07] three blocks. The first is a direct

[13:08] zero-shot LLM inference. So, how good is

[13:11] a Llama 3 8 billion here on a Hotpot

[13:14] Q&A?

[13:16] We got a result. Or a GPT-4 Omni Mini,

[13:19] this is it.

[13:21] And now compare this to the added

[13:24] improvement here because here at the end

[13:26] here this delta is now here. If you

[13:29] would do this with a GPT-4 Omni mini

[13:31] with this new methodology on this

[13:33] particular benchmark, we would jump here

[13:35] from 38.10 to plus 28.26

[13:39] in addition. So, this would be a

[13:42] significant jump in the performance. If

[13:45] we have just a rag system, a vanilla rag

[13:48] system, you go with the top five, you

[13:51] see we go from 38.10 to 58.5.

[13:55] But, if you would do it here, yes. See

[13:57] exactly. And then in this is beautiful.

[14:00] Here you have all the rags, the famous

[14:02] rag system, yeah?

[14:04] The Microsoft graph rag, the laser graph

[14:06] rag, the light rag, the hyper rag, the

[14:08] hyper rag two, the E-squared graph rag,

[14:11] the GFM rag, the logic rag, the linear

[14:13] rag, and my goodness, I don't know how

[14:15] many other rag systems we have already.

[14:17] And then in the last line, our new

[14:20] memory graph rag system. And you see it

[14:22] almost outperforms here every other

[14:25] graph-based rag retrieval augmented

[14:28] generation methodology. Beautiful. And

[14:32] you see here also the added performance

[14:35] jump here in the green boxes. So, if we

[14:39] go for a hyper rag, so let's stay here,

[14:42] we have plus 8.27.

[14:46] Is this percentage or percentage points?

[14:48] I don't know. Please check in the

[14:49] literature, but you see it is quite a a

[14:53] nice and impressive jump.

[14:56] What else?

[14:58] I told you there's hardly any new

[15:01] mathematics. So, here you have not a

[15:03] pseudo code for coding here the

[15:05] algorithm. And at first, here's the

[15:06] memory based indexing, the graph

[15:08] construction.

[15:10] So, whatever we went through, here you

[15:12] have it again in a simple pseudo code

[15:14] structure. But, I'll give you also the

[15:16] GitHub repo, so you don't have to code

[15:18] anything. And of course, the memory

[15:20] guided and the online retrieval.

[15:23] And yeah, there's a little bit of

[15:25] filtering going on, but otherwise it's

[15:27] exactly like we went through, but you

[15:30] can have this now here. Yeah, we fall

[15:32] back solution to standard rag. Of

[15:34] course, you can implement this, but this

[15:36] is exactly what we went through

[15:37] together.

[15:39] They are really beautifully detailed.

[15:41] You see here in the annex then also the

[15:44] prompt used here for let's say the

[15:46] conflict resolution agent. So, you have

[15:48] a really the prompt that they used for

[15:51] the experiments. If you want to run

[15:53] them, if you want to modify here their

[15:55] prompt further and you want to see how

[15:57] much you can improve now on their memory

[16:00] graph rag methodology. They provide here

[16:03] all the prompts and everything. And yes,

[16:05] of course, here's the GitHub repo.

[16:08] As you see three-layer memory structure.

[16:11] And yeah, this is it. This is the

[16:13] address. And then if you have a look at

[16:15] the memory Python file,

[16:17] they exactly build that three-layer

[16:18] memory structure with inter-layer

[16:20] connection, schema layer, fact layer,

[16:21] passage layer, and yep, everything is

[16:24] available for you if you want to test it

[16:26] out.

[16:27] Now, what I did not mention yesterday,

[16:29] it outperforms, but you know, there's

[16:31] another benefit that it did not just

[16:34] outperform, but we used so much effort

[16:37] and computer time for the indexation of

[16:40] this complex graph

[16:42] that then when we have the incoming

[16:44] query, this system is now fast. And

[16:47] remember, Google PageRank, this is a

[16:50] real fast system. So, here we have the

[16:52] data.

[16:53] Compare this now.

[16:55] And here you have Raptor, HyperRAG, and

[16:57] whatever. And

[16:59] at the end here, the last column is the

[17:02] retrieval time, the classical retrieval

[17:04] time. And you see, you are with this new

[17:07] methodology faster than any other method

[17:09] that we had up until now, but of course,

[17:12] this is only because we invested quite a

[17:14] lot of time in the preparation, in the

[17:17] indexing of the graph, in building up

[17:19] this complex graph with the complex

[17:21] memory layers, no? So, do not forget

[17:23] operational if you have it.

[17:26] Absolutely ultra-fast, but you have to

[17:29] invest quite a lot of here for your

[17:32] particular training, for your particular

[17:34] domain knowledge indexing. Let's say you

[17:37] go with mathematics or theoretical

[17:38] physics or chemistry, biology or

[17:41] medicine or finance, whatever you have.

[17:43] Yeah, and then I told you again, I

[17:45] thought about this. Why GPT-4 Omni Mini?

[17:49] And I thought, why is there not the

[17:51] latest Claude 4.8 or I don't know

[17:54] whatever we have, no?

[17:56] And it is simple.

[17:58] And I noticed just a half sentence, but

[18:00] I think the intention was that the

[18:02] authors wanted to show us you don't need

[18:05] the best and the most expensive language

[18:08] model on this planet, because even with

[18:11] an old non-top-notch

[18:13] LLM, these new methods work. And all the

[18:17] data you have seen that I showed you

[18:19] here, all the agents were running here

[18:22] at GPT-4 Omni Mini LLM.

[18:26] So, you cannot say that this has a high

[18:28] technological complexity or this is here

[18:31] that you have to have to run it in a

[18:33] cloud, no.

[18:34] So, if you see it now from this

[18:36] perspective, I have to smile and I say,

[18:38] "Hey, this is great that the authors

[18:40] choose such an old non-all-powerful

[18:43] model, no? That we can run maybe

[18:46] locally.

[18:47] It doesn't have to be a GPT system.

[18:50] And the methodology is working and it is

[18:53] stable and it's providing you really

[18:55] benefits compared to the other graph

[18:57] rack system. And this is here something

[18:59] I just wanted to stress out because I

[19:01] get some response, "Hey, why is there

[19:03] not the latest? Why is this just a 4.7

[19:06] and not a 4.8 LLM?" Well, sometimes it's

[19:09] good to know this new stuff also runs

[19:12] here on the good old fashion LLM's that

[19:15] are non-complicated at all and they are

[19:17] non-cloud based.

[19:19] I hope you had a little bit of fun, some

[19:21] new insights, maybe you want to try out

[19:23] this new methodology for your particular

[19:25] domain, for your

[19:27] particular complexity level of your

[19:29] query, of your task. Would be great to

[19:32] have some feedback if you have here some

[19:35] improvement that you really notice that

[19:37] those memory layers provide here an

[19:39] additional benefit for your professional

[19:41] work. Would be great to see you in my

[19:43] next video.
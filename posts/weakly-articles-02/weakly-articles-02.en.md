---
title: "Weekly Internet Article Reading 2: Own the Slice"
published: 2026-09-27
created: 2026-09-27
updated: 2026-09-27
lastEdited: 2026-09-27
updateCount: 0
description: "Own the Slice: What methodology should we master for coding in the AI era?"
image: ""
tags:
  - Reading Notes
  - Article Sharing
category: Internet & Community
draft: false
alias: ""
lang: en
translationKey: posts/weakly-articles-02/weakly-articles-02
---

[Original Link](https://www.kentlangley.com/blog/own-the-slice/)

# Interpretation
Artificial intelligence has lowered the cost of writing code faster than the cost of completing product work. This article outlines how a single person can take full charge of a working unit from customer requirements all the way to delivery.

The article starts by outlining a scenario where multitasking seems to pose no real problem. However, according to this study [https://contextcost.com/the-research](https://contextcost.com/the-research), every time you multitask, you actually waste more time in between due to switching costs. The author cites Weinberg's classic empirical estimates to illustrate the context-switching cost of parallel projects: as the number of concurrent projects increases, the time spent reloading context can rise rapidly.

Two projects will take up about 1/5 of your total time, and if you run 5 projects simultaneously, it will consume nearly 3/4. These are just the switching costs. Once you subtract switching costs from 100% and divide by the number of projects, your development efficiency plummets. Note that these percentages themselves are empirical estimates rather than rigorous experimental results, leading into the core concept of this article: `slice`.

From the author's perspective, `slice` is a **vertical slice / deliverable result**: it isn't divided by technical structure, but starts from a real requirement, spans all the necessary layers to fulfill it, and finally delivers a result that the user can actually perceive. Along the way, it also briefly introduces the `INVEST checklist`, which is one of the paradigms of agile programming.

The author then points out the true role of AI at present: it drastically reduces time during the implementation phase, but the time saved during the decision-making phase is quite limited. The ultimate result might even be an increase in overall development time, an outcome reflected in an interesting experiment cited in the article [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).

The author lines up several years of DORA reports to form a narrative arc titled "AI from disrupting production systems to gradually being absorbed by them." However, these annual results are not strictly longitudinal tracking of the same cohort of objects, so I prefer to view them as a trending clue rather than a proven causal process.

# My Understanding
Today, the article's explanation of AI can already be considered a fairly common understanding within the tech circle: AI is much more like an extremely powerful efficiency-boosting tool rather than a truly omnipotent "wish-granting machine."

It can dramatically compress the time required for the implementation phase, but project development involves much more than just implementation. Requirement evaluation, solution design, testing, review, integration, and acceptance are not compressed at the same rate.

That is where the problem arises.

In the past, when developing a feature, the most expensive part was probably "writing it out." Now, with AI, "writing it out" itself is getting cheaper and cheaper, while what is truly expensive gradually shifts to: deciding what should be done, judging whether the generated output is correct, and truly finishing a task.

In other words, AI hasn't eliminated bottlenecks in development; it has merely caused them to migrate.

This is also why I find the concept of `slice` genuinely interesting.

If the implementation cost gets lower and lower, humans easily fall into a new trap: because "starting a thing" is so cheap, they spin up more and more tasks at the same time. Making AI write a feature takes just a prompt, and launching another agent for another task carries almost no extra psychological cost. It looks like everything is progressing simultaneously.

Yet these outputs still ultimately need someone to understand, test, modify, and decide whether to accept them, and that person is usually yourself.

Consequently, the productivity boost brought by AI might instead create more unaccepted code, unfinished features, and contexts that need to be reloaded. Code is generated faster and faster, but truly completed things do not necessarily increase at the same rate.

From this perspective, `slice` feels more like a constraint against this trend.

Instead of breaking work down into technical tasks like "implement the database," "write a UI," or "add an API," it is better to define the goal as a complete, verifiable result—for example, "the user can now accomplish something they couldn't do before."

AI can still help implement the database, UI, API, and tests within it, but these pieces are no longer viewed as separate completed tasks, but merely different components of the same result.

This reminds me of some of my own experiences using coding agents recently.

In the past, I had to write code myself, so the things I could push forward simultaneously were naturally limited. But now I can have multiple agents modify different projects at the same time: games, websites, automation scripts, or even several features within the same project.

On the surface, my "development speed" has indeed become very fast.

However, after the agents finish, if I want to participate in the modification process, I still need to read through what they did one by one, verify whether the changes broke existing logic, run tests, and reload all of this back into my mental model of the project.

The real bottleneck may have shifted from "writing code is too slow" to "I don't have enough attention to understand and accept everything AI generates."

Therefore, I think an important capability in the AI era may not be how many agents you can drive at once, but controlling how many "things not yet truly finished" you have in flight simultaneously.

This is what I saw and took away from this article.

Whether `slice` is truly the best solution, I am not yet sure. Some underlying refactoring, technical debt, or performance optimization are hard to map directly to a user-perceptible result; and having a single person take responsibility all the way from requirements to delivery can also introduce another kind of cognitive burden.

Still, it at least provides a very interesting perspective:

**As code gets cheaper and cheaper, should we start making "completion" rather than "implementation" the basic unit of measuring development progress?**

In the past, we easily understood "finishing a piece of code" or "completing a functional module" as progress, but after AI drastically lowers the cost of implementation, this way of measurement may gradually lose its validity.

What truly matters may no longer be how much code we produce, but how many things actually pass through design, implementation, verification, and integration, ultimately becoming a result that can be used, experienced, and delivered.

If that is the case, then the truly scarce resource in the AI era may not just be implementation capability, but the ability to control scope, attention, and "completion" itself.

# Outro
Phew... reading articles is exhausting... especially professional articles like this... and they are long, too.

Also, how should I put it? My genuine reading experience is that it either feels completely unnecessary to talk about, or it's a bunch of stuff I can't understand at all.

That's probably just the curse of knowledge. Once you understand a piece of knowledge, it's hard to imagine yourself before you understood it.

And if you want to do this kind of sharing—sharing your realizations and so on—you have to express these things well with language. Otherwise, if an article can only be understood by you alone, it remains questionable whether this can even be called an article...

Sharing has never been a simple thing... Overcoming the psychological barrier of being afraid to share is just the entry-level hurdle. How to better express your views, showcase your understanding with evidence, and make the article captivating at the same time...

Sort of like what the article says:

"Writing it out" does not equal "completion."

---
title: "Watchkeeper Devlog #1: Hold On to the Present, Look to the Future"
published: 2026-11-27
created: 2026-11-27
updated: 2026-11-27
lastEdited: 2026-11-27
updateCount: 0
description: "The first Watchkeeper devlog: from a 3D prototype to a 2D pixel game, and what it means to hold on to a moment."
image: ""
tags:
  - Game development
  - Game design
category: Personal notes
draft: false
alias: ""
lang: en
translationKey: posts/osgj-log-1/osgj-log-1
---
I'm doing another game jam!

This time it's the 2026 Open Source Game Development Contest.

The theme is “守·望”: to keep watch, or, if you pull the two characters apart, to hold on and look ahead. I went with the very literal choice of naming my game 《守望》, or *Watchkeeper* in English.

The name came quickly. Figuring out what the game should actually be, though, has kept me going in circles for days…

# How it started

When I saw the theme, my first thought was time. Yes, I've made plenty of games about time already. What can I say? I really like the stuff, haha.

What if “hold” meant holding on to something in the present, and “look” meant looking ahead to a future that hasn't happened yet?

I've played with time before in [DelayTrace](https://amiya-desi.itch.io/delaytrace), [Last Minute Echo](https://amiya-desi.itch.io/last-minute-echo), and, going further back, [TimeRewindLinker](https://amiya-desi.itch.io/time-rewind-linker).

In *DelayTrace*, I'd already designed three forms: past, present, and future.

Maybe I just like things that come in threes.

One gives rise to two, two to three, and three to all things!

This time, though, I wanted to try something a little different.

What if the future wasn't fixed?

You could visit the future to see what becomes of the world if things carry on as they are. Then you could return to the present, change something, and go forward again to see what difference you made.

But the future can affect the present, too.

The simplest example is coming across information in the future that lets you do something in the present you couldn't do before.

You might change the present so that the future you saw can no longer happen. But you still remember it.

As far as the world is concerned, it hasn't happened and may never happen. As far as you're concerned, it's part of your past. You lived through it.

I really like that little mismatch in time.

And that gave me the first three ideas at the heart of the game:

**Hold, Look, Remember**

Of course, I had no idea how many times I'd end up rebuilding this neat-sounding idea…

# From 3D to 2D

*Watchkeeper* actually started as an isometric-style 3D game with pixel art.

I pictured a world of floating islands, with spinning gears, islands drifting around, and routes you could only take by moving back and forth between two points in time.

You could even switch time in midair and land on a platform that only existed in the other era.

Sounds pretty good, right?

Then I played it myself.

It wasn't fun. Alas.

All the moves worked, technically. They just weren't much fun to play, and they didn't really capture either “hold” or “look.”

Most of the time, you pinned something in place, jumped to the other world, and walked across.

Why pin that thing? Why switch worlds? Neither question seemed to matter very much.

I went on to try indoor settings, different camera angles, different art styles. At one point, I even sketched out a story about a daughter saving her father.

One by one, I scrapped them.

Then it finally occurred to me: why does this have to be a 3D game at all?

That's how I ended up with the current 2D side-scrolling pixel-art version.

I love the way Metroidvania maps are laid out anyway. Give me a world to run around in and I'll happily look for whatever I missed.

If a game gives me two paths and one of them is obviously the way forward, odds are I'll take the other one first. Heh.

Whenever I get a new ability, I often remember somewhere I passed earlier and rush back to see what else I can do there.

That's the kind of exploring I want *Watchkeeper* to offer.

# What does it mean to “hold”?

Lyra and I kept coming back to this question over the last few days.

At first, “hold” did something simple: it froze an object in its current state so it would still be that way in the future.

Then Lyra asked a question I really liked:

**Why should holding on to a moment mean making things stand still in the present?**

Say there's a platform that keeps moving up and down.

You use “hold” when it reaches a certain height, recording where it is at that instant.

The platform keeps moving in the present.

In the future, the broken platform would normally be stuck at the bottom. But because you held on to that moment, you find it at the height you recorded.

You've saved a moment and handed it to the future.

Meanwhile, the present keeps moving.

I liked that idea immediately!

And if you can hold only one thing at a time, choosing a new thing to hold means giving up the one you were holding before.

That opens up some interesting combinations.

# What does time change?

I didn't want the game to turn into a collection of unrelated contraptions. So in the current version, I'm trying to give time a handful of consistent rules for different materials and objects:

- **Wood**: Wooden bridges, ladders, and crates gradually rot.
- **Stone**: Walls that are already cracked collapse in the future, sometimes opening new routes.
- **Water**: Let water flow in the present and it builds up in the future, lifting objects or flooding parts of the map.
- **Plants**: Give plants light and water and they keep growing. That might give you something to climb, or it might block a path.
- **Machinery**: Machines that keep running in the present come to a stop in the future. You can choose a moment and carry the machine's state forward.

Take an ordinary wooden crate.

You can push it around in the present, and where you leave it affects where it ends up in the future.

If you hold on to the crate, it won't rot. It can even float on the higher water in the future, giving you a platform to stand on.

But the same rise in water might flood a route you could walk through before.

Plant growth is fun to play with, too. Vines might help you reach a high spot, while an overgrown plant might wedge a door shut.

So sometimes you want to hold the plant in its earlier state, and sometimes you want to leave it alone and let it grow.

I want players to get familiar with these rules and then try putting them together.

Maybe they'll even stop and think, wait, can I use this thing *that* way?

That's one of my favorite moments in a puzzle game.

Of course, all of this is still mostly about how I'm thinking through *Watchkeeper*'s design. As for what these ideas look like in the game, and what exactly I've been doing to it over the last few days…

I'll save that for the next devlog. Hehe.

That's all for this one!

See you next time ❤

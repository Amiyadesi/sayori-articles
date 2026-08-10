---
title: Reflections After GMTK Jam
published: 2026-07-27
created: 2026-07-27
updated: 2026-08-10
lastEdited: 2026-08-10
updateCount: 1
description: In the last six hours of GMTK Jam, I cut down the unfinished puzzles and submitted a small game that was actually playable.
image: ""
tags:
  - Game Development
  - Growth Log
  - game-jam
category: Game Development
draft: false
alias: ""
lang: en
translationKey: posts/after-gmtk/after-gmtk
---

# It's done, but I can't be happy about it.
GMTK is done, here's the link: [Last Minute Echo by Amiya_desi](https://amiya-desi.itch.io/last-minute-echo). In the end, it turned out to be just a small game. Even though it's at least a complete little game with win and loss conditions, I can't feel happy about it at all.

# My Journey

## At the Beginning
When I first saw the GMTK theme was 'countdown', I thought it was pretty simple and comfortable. Plus, I already had a previous work that fit the theme quite well: [TimeRewindLinker by Amiya_desi](https://amiya-desi.itch.io/time-rewind-linker). I planned to build on its time-rewind mechanic by adding countdown-limited puzzles. Oh my god, what a brilliant idea! The kind that could get into [Thanks for the Encouragement](/essays/thanks-encourage/) (fog). Thinking I'd come up with such a great idea, victory was simply a given (joy).

## Development and Fury in Between
Because I thought of how well it would fit with my previous work, I was super excited. So I just discussed an initial version with AI and started... and then hell broke loose... The AI's changes always felt off to me, and it seems I've been relying on AI 'wheelchairs' too much. I was too lazy to even create a graybox level myself, only knowing how to make the AI 'draw cards' directly, generating everything from skeleton to flesh in one go. Just like Regulus, I've become stupid from using the 'wheelchair' too much QAQ.
![[Pasted image 20260727222142.png|width=640|align=center]]
Who would've thought that when I finally mustered the courage to look at the scene the AI had built for me in the last six hours, I'd have a brain hemorrhage? I still remember one specific point:
`Who would've thought this human-machine would make a trap block not by creating a separate scene for a trap prefab and then instantiating it in the main scene, but by mysteriously putting a trap texture on a trap tile, and then under a trap Node2d, placing a bunch of Area2Ds around these spikes? How am I supposed to modify this? If I had just cohesive scenes from the start, I'd only need to place them. But this is all scattered and broken apart! I have to move them one by one. What the hell am I supposed to move?!`

## The Final Decision and Sprint
So, when sanity finally returned, I decisively chose the former between submitting a complete but very small work and another that looked grand but wasn't even playable. I cut all the puzzles, returned to a single goal: dodging the pursuer. Once the goal was clear, I only needed the AI to write the pursuer's algorithm and some win/loss conditions and scenes, while I focused on salvaging the map. Finally, in the last 10 minutes, I finished and submitted it. At least it was done... Although the pursuer's AI was still quite dumb, to make it not too easy, I added a bit of teleportation, which, of course, led to other problems, but there was no time left.

# Post-Jam Reflection
Played with 'wheelchairs' too much, and Uncle GMTK totally wrecked me. At least in the end, I finally grasped the 'Reverse Sorcerer' technique and barely managed to survive and finish...
Damn it, shouldn't I be the strongest?! To become the strongest, it seems I still have a long way to go... GMTK, I probably won't ever forget you in this lifetime...

Actually, my diary from that day also summarized a lot. If you're interested, you can check out [[2026-07-26]]. That's basically the mental journey I wrote down during my moment of transformation, when inspiration struck.

Finally, kids, don't rely on 'wheelchairs' too much in the future! Maintain independent thought. Don't answer, don't answer, don't answer!
{{But comments are very welcome (*^_^*)}}

---
title: "Turn off Oblivion head bobbing"
date: "2022-04-15"
categories:
  - "notebook"
  - "problems-solutions"
tags:
  - "oblivion"
  - "mods"
  - "camera"
  - "head-bobbing"
---

Every now and then I like to play my beloved Oblivion. To keep things interesting I have installed quite some mods over the years.
At one point, however, my head started bobbing while walking and it seemed like I was in crouching mode when standing still. The problem persisted even until after I installed all my mods. Eventually I found the culprit, but to help other possible victims, I will list possible solutions to the problem of not being able to turn off head bobbing:

## 1. Remove `_1stPerson` (the solution for my situation)

Thanks to the [gamesas.com forum](http://www.gamesas.com/oblivion-first-person-camera-not-working-all-t378029.html)

Apparently, the Growlf's 3rd-person skeleton adds some meshes to your Oblivion data folder which might not be removed after disabling the mod. Simply remove `Oblivion\Data\Meshes\Characters\_1stPerson` and you should be fine.

## 2. Disable / remove OBSE Enhanced Camera

This was not the solution for me, but you might want to remove

- `Oblivion\Data\OBSE\Plugins\OBSE_EnhancedCamera.dll` and
- `Oblivion\Data\OBSE\Plugins\OBSE_EnhancedCamera.ini`

## 3. Disable `Deadly Reflexes` mods

Simply disable the mod(s).

Hope this helped anyone. The post might be expaned upon if needed.

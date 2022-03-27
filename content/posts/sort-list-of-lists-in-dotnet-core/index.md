---
title: "Sort list of lists in dotnet core"
date: "2022-01-19"
categories: 
  - "notebook"
tags: 
  - "dotnet"
---

```cs
using System;
using System.Text.Json;

var array = JsonSerializer.Deserialize<List<List<int>>>("[[3, 2], [1, 1], [0,3],[0,2],[0,1], [1,3], [1,2], [2, 3]]");

Console.WriteLine(JsonSerializer.Serialize(array));
// [[3,2],[1,1],[0,3],[0,2],[0,1],[1,3],[1,2],[2,3]]

var sorted = array.OrderBy(y => y[0]).ThenBy(y => y[1]);

Console.WriteLine(JsonSerializer.Serialize(sorted));
// [[0,1],[0,2],[0,3],[1,1],[1,2],[1,3],[2,3],[3,2]]
```

[Source](https://gist.github.com/drikusroor/b9df95e19f02a1278ef29bf04f5e8629)

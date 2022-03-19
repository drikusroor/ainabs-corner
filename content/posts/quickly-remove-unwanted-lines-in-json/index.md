---
title: "Quickly remove unwanted IDs in JSON"
date: "2021-08-03"
categories: 
  - "tips-tricks"
tags: 
  - "json"
  - "regex"
featured_image: "images/image.png"
---

I am currently duplicating entities through an API and there is no duplicate feature yet. Therefore, I am copying the JSON output of an entity and using the POST method of the API to re-create it with a different ID. In order to avoid errors, I have to delete all IDs from the JSON. To do that, I have found a regex that helps me find all the `"id": "{guid}"` combinations that I can then replace with an empty string using VS Code or Notepad++.

```generic
"id": "\[0-9A-F\]{8}-\[0-9A-F\]{4}-\[0-9A-F\]{4}-\[0-9A-F\]{4}-\[0-9A-F\]{12}",

// To be replaced by ... nothing
```

Inspired by the following Stackoverflow answer: \[[link](https://stackoverflow.com/a/13933673/4496102)\]

### Update:

It might be even easier to use the following regex as it just selects the whole line:

```generic
"id": ".\*
```

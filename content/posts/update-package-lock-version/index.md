---
title: "npm WARN old lockfile The package-lock.json file was created with an old version of npm"
date: "2022-11-17"
categories: 
  - "notebook"
tags: 
  - "npm"
---

Recently, I've experienced this warning multiple times since I've installed a new version of `Node.js` and `npm`. Apparently we can update the version of the lockfile `package-lock.json`. It's apparently quite easy to do. Just run:

```sh
npm install --package-lock-only
```

Credits to this [mothertrucker](https://stackoverflow.com/a/68479189/4496102)
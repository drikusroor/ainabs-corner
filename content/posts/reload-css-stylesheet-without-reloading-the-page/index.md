---
title: "Reload css stylesheet without reloading the page"
date: "2021-11-25"
categories: 
  - "tips-tricks"
tags: 
  - "css"
---

Sometimes, a local development environment can be really slow at reloading pages. If you are working on styling a page or component and you want to check your changes, every page refresh generates frustration.

You can then also opt for only reloading the stylesheets of a page. This will likely be significantly faster. You can do this by using the following command in the console of your browser's development tools:

```js
for (var link of document.querySelectorAll("link\[rel=stylesheet\]")) link.href = link.href.replace(/\\?.\*|$/, "?" + Date.now());
```

Source: [https://stackoverflow.com/a/44010918/4496102](https://stackoverflow.com/a/44010918/4496102)

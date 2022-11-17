---
title: "Format code on save using ESLint and VS Code"
date: "2022-08-31"
categories: 
  - "notebook"
tags: 
  - "eslint"
  - "vscode"
---

I have always had problems when combining [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) the same project in VS Code. Prettier would not respect my ESLint rules or vice versa. Sometimes I could mitigate the problems by using the `eslint-config-prettier` package in my ESLint configuration.

But now, thanks to [James Quick](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code) I've found a way to get rid of Prettier while still having the format on save feature in VS Code.

It's very simple:
- Make sure ESLint is configured in your project
- Install the [ESLint extension for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Then add the following configuration to your VS Code Workspace Settings in `.vscode/settings.json`[^1]:

```json
{
  // .vscode/settings.json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
}
```


[^1]: Create the file if it doesn't already exist

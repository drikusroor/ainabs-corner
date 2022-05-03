---
title: "Use aliases in Vue.js imports"
date: "2022-05-03"
categories: 
  - "tips-tricks"
tags: 
  - "vue-js"
  - "eslint"
  - "rollup"
  - "webpack"
---

I don't like to do relative imports like this:

```js
import CrazyComponent from "../../components/CrazyComponent";
```

Instead, I like to import my components (stores, helpers, models, etc.) like this:

```js
import CrazyComponent from "@/components/CrazyComponent";
```

You might want to configure some stuff to make this possible. I will outline these configurations below:

## ESLint

---

First, install `eslint-import-resolver-custom-alias`:

```sh
npm install eslint-import-resolver-custom-alias --save-dev
```

In your `eslintrc.js` or the `eslintConfig` section in your `package.json`, add the following resolver under `"import/resolver"`. Of course, first check for which specific folder(s) you want aliases. In my cases, I want to create the alias `@` for the `./src` folder.

```js
"settings": {
  "import/resolver": {
    "eslint-import-resolver-custom-alias": {
      "alias": {
        "@": "./src"
      },
      "extensions": [
        ".js",
        ".vue"
      ],
      "packages": [
        "packages/*"
      ]
    },
    // other settings
  }
},
```

## Webpack (Mix)

---

In your `webpack.mix.js` configuration file, import path and then configure the alias using the alias method:

```js
const path = require("path");

const mix = require("laravel-mix");

mix
  // other configurations
  .alias({
    "@": path.join(__dirname, "src/resources/js"),
  });
// more configurations
```

## Rollup

---

For Rollup I did not have to configure anything to use aliases it seems. Perhaps it works out of the box(?). I did found the `jsconfig.json` file, which contained the following entry:

```js
"paths": {
  "@/*": [
    "src/*"
  ]
},
```

But when I removed it, the build still succeeded, so I'm not sure what to do with that information. More research is needed.

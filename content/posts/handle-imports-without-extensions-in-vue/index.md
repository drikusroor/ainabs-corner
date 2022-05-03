---
title: "Handle imports without extensions in Vue.js 2"
date: "2022-05-03"
categories:
  - "notebook"
tags:
  - "eslint"
  - "vue-js"
  - "rollup"
---

If you want to import your Vue components in the following way, so without a .vue or .js extension:

```js
import CrazyComponent from '@/components/CrazyComponent';

// instead of
import CrazyComponent from '@/components/CrazyComponent.vue';
```

There are some things you have to

## Rollup

---

Add the following to your rollup.config.js:

```js
nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    extensions: ['.js', '.vue']
}),
```

## ESLint

---

Add the following to your `eslintrc.js` (or the `eslintConfig` section of your `package.json`):

```js
// rules
"rules": {
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "vue": "never"
    }
  ]
},

// settings
"settings": {
  "import/resolver": {
    "node": {
      "extensions": [".js", ".vue"]
    },
  },
},
```

## Webpack

---

In the project in which I use Webpack (Mix), I didn't have to configure anything. Webpack Mix - I suspect the `require('laravel-mix').vue();` statement - seems to take care of it already.

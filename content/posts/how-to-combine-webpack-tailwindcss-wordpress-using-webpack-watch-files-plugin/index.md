---
title: "How to combine Webpack, Tailwindcss & Wordpress using webpack-watch-files-plugin"
date: "2021-05-29"
categories: 
  - "tips-tricks"
tags: 
  - "tailwindcss"
  - "webpack"
  - "wordpress"
---

For my client I am currently building a website that makes use of [tailwindcss](https://tailwindcss.com), a [utility-first](https://frontstuff.io/no-utility-classes-arent-the-same-as-inline-styles) CSS framework. With utility classes you can directly style elements using classes such as `text-center` (center the text) or `bg-red-600` (red background, shade 600). Tailwindcss contains a lot of those classes and also allows combining breakpoints with these classes, such as `md:font-bold` (make font bold on medium sized devices or larger). As a result, a bundled tailwindcss with all its features included can be several mb big, which is way too big for a regular website.

Normally, a website won't use all of tailwindcss's features. Can you imagine using 10 different text colors and background colors in all its shades? That would already add up to 20 \* 7 = 140 different colors. And those are only background and text colors.

We thus do not need all features and luckily, tailwindcss has a [feature included](https://tailwindcss.com/docs/optimizing-for-production) that extracts and bundles only the utility classes you are using in your website. It does this by scanning your templates and css files for classes that tailwindcss recognizes.

In this project I use Webpack with a PostCSS loader to bundle my css. [PostCSS supports tailwindcss](https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin). The only thing you have to do is to include tailwindcss into your PostCSS configuration file:

```
// postcss.config.js
module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};
```

Now, when I did this, Webpack would still generate a 4mb css bundle. When tailwindcss has no templates and css files to check, it automatically includes everything. So I set up my tailwindcss configuration to check for my Wordpress templates and css files:

```
module.exports = {
  purge: {
    enabled: true,
    mode: "all",
    preserveHtmlElements: false,
    content: [
      "./src/index.js",
      "../../www/wp-content/themes/mytheme/**/*.php",
      "../../www/wp-content/themes/mytheme/**/*.js",
    ],
  },
  // ...
};
```

Now it works as planned. My css bundle is only 1.44kb big.

However, I like to work with a development server and I like to use Webpack's watch feature to reload my bundle whenever I change anything in my templates or css. Unfortunately, Webpack's watch feature only checks the files that are directly imported to rebuild the bundle. And my Wordpress php templates are not not included in my imports and loaders. What to do?

I do not want to manually import all my Wordpress templates and keep track of every new template that is added. Luckily, there is a Webpack plugin that allows for external files to be included in Webpack's watch process: [webpack-watch-files-plugin](https://www.npmjs.com/package/webpack-watch-files-plugin). To use it, just install the plugin and add the following lines to your Webpack configuration:

```
const WatchExternalFilesPlugin = require("webpack-watch-files-plugin");

module.exports = {
  // ...
  plugins: [
    new WatchExternalFilesPlugin.default({
      files: [
        // Relative location of your Wordpress templates
        "../../www/wp-content/themes/mytheme/**/*.php",
        // Relative location of your tailwind configuration
        "./tailwind.config.js",
      ],
    }),
  ],
  // ...
}
```

Now, Webpack starts re-bundling whenever you change a Wordpress template or when you change your tailwind configuration.

The only downside to using this plugin is that (at the time of writing) it has not been updated for 9 months and could become vulnerable over time.

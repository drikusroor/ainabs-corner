---
title: "Relative path font import issues in Webpack 5"
date: "2021-05-25"
categories: 
  - "problems-solutions"
tags: 
  - "webpack"
featured_image: "images/Screenshot-2021-05-25-223648.jpg"
---

_This is mainly a note to myself that I can use as a reference when a future me is making the same mistake again._

As I am creating the Wordpress theme for this website, I ran into some issues when trying to import the font that is currently used in the website's title heading.

My folder structure is as follows:

```
src
- css
- fonts
dist
- css
- fonts
```

And I import my font like this:

```
@font-face {
  font-family: "MagicCards";
  src: url("../fonts/MagicCardsNormal.ttf");
}
```

I then use Webpack to bundle my assets and I was using the following configuration for that:

```
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // Other configuration
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // css-loader and postcss-loader
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },
};
```

After bundling, the font import url in the outputted css was resolved as `fonts/MagicCardsNormal.ttf`. This resulted in a 404 on the website as the font was being imported relatively from the css file, e.g. `example.com/wp-content/theme/css/fonts/MagicCardsNormal.ttf`.

So I thought I'd be clever and change `generator.filename` of the font from `fonts/[name][ext][query]` to `../fonts/[name][ext][query]`, but this caused the font to be bundled to its parent folder (`dist` instead of `dist/font`).

The solution turned out to be adding the `publicPath` option to the `MiniCssExtractPlugin` loader:

```
{
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: "../",
  },
},
```

This causes all font imports from within the css file to be relative to the parent folder (`dist` in this case) instead of being relative to the css folder itself.

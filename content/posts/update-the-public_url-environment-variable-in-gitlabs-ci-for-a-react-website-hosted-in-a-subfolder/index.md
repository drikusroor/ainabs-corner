---
title: "Update the PUBLIC_URL environment variable in Gitlab's CI for a React website hosted in a subfolder"
date: "2021-11-16"
categories: 
  - "notebook"
tags: 
  - "gitlab"
  - "react"
featured_image: "images/image-6.png"
---

When hosting a React website in a subfolder, you want the paths to the images and fonts to be updated as well. When the path of an image in your development environment is `/images/background.jpg` and your website is hosted at `https://example.com/app`, you want the path to be updated to `/app/images/background.jpg` in the production build.

You can do this using the [PUBLIC\_URL environment variable](https://create-react-app.dev/docs/advanced-configuration/).

First, make sure your paths are preceded by `./` in your code:

```html
<img src="./images/background.jpg"/>
```

Then, in the `.yml` Gitlab CI file, before the build starts, set `PUBLIC_URL` to the path of the subfolder in which your React website will be hosted:

```yaml
build:
    stage: post-build
    image: node:lts
    script:
        - export PUBLIC\_URL="/app/"
        - yarn
        - yarn build
    artifacts:
        expire\_in: 3 days
        paths:
            - build
```

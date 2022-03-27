---
title: "How to set the homepage cover image in the Ananke theme for Hugo"
date: "2022-03-18"
categories: 
  - "tips-tricks"
tags: 
  - "hugo"
---

It is quite straightforward to set the cover image in Hugo's Ananke theme. We store an image in the `images` folder of a post and set the `featured_image` variable to the `images/cover.jpg` path. The folder structure for a post then looks like this:

```generic
content
- posts
  - first-post
    - images
      - cover.jpg
    - index.md
```

And the post's [front matter](https://gohugo.io/content-management/front-matter/) in `first-post/index.md` would look like this:

```md
\---
featured\_image: images/cover.jpg
---

# First post

Lorem ipsum...

<!--- file: first-post/index.md --->
```

But how do you do this for the homepage? It typically has no markdown file. However, you can add content to the homepage by creating an `_index.md` in the `content` folder. And you can use that `_index.md` file to set the aforementioned front matter variables. We can then replicate the process of adding a featured image for a post.

Thus, inside the `content` folder, create the `_index.md` folder and an images folder with your cover image:

```generic
content
- \_index.md
- images
  - cover.jpg
- posts
  - first-post
    - images
      - cover.jpg
    - index.md
```

Then, in your `_index.md` file's front matter, add the `featured_image` variable and set it to `images/cover.jpg`.

```md
\---
featured\_image: images/cover.jpg
---

<!--- Optionally add some extra content to your homepage. I am using \_index.md only to set the featured image through the front matter. --->

<!--- file: content/\_index.md --->
```

Your homepage should now have a function featured image.

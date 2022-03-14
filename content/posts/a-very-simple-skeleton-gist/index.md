---
title: "A very simple animated skeleton gist"
date: "2021-10-18"
categories: 
  - "tips-tricks"
tags: 
  - "css"
  - "gist"
  - "skeleton"
---

Just for my own reference, I will publish the [skeleton css gist](https://gist.github.com/drikusroor/d68ad4059c5a13d2c8df83cf012c98d9) I use in many of my projects here. It is very easy to use and very easy to extend with new shapes. You can check the `--card` and `--rounded` [modifiers](https://css-tricks.com/bem-101/) for inspiration.

**In Sass:**

```scss
.skeleton {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 5s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  &--card {
    width: 100%;
    height: 300px;
  }

  &--rounded {
    border-radius: 5px;
  }
}
```

**And in regular CSS:**

```css
.skeleton {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;
}

.skeleton::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 5s infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton--card {
  width: 100%;
  height: 300px;
}

.skeleton--rounded {
  border-radius: 5px;
}
```

Of course, it would not make sense to write a post about nice looking skeletons and not show them in the same page. So here goes:

.skeleton-wrapper { margin: auto; } <div></div> .skeleton { display: inline-block; height: 1em; position: relative; overflow: hidden; background-color: #dddbdd; } <div></div> .skeleton::after { position: absolute; top: 0; right: 0; bottom: 0; left: 0; transform: translateX(-100%); background-image: linear-gradient( 90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) ); animation: shimmer 5s infinite; content: ""; } <div></div> @keyframes shimmer { 100% { transform: translateX(100%); } } <div></div> .skeleton--card { width: 100%; height: 300px; } <div></div> .skeleton--rounded { border-radius: 5px; }

**Skeleton**  

  
  
**Skeleton, rounded**  

  
  
**Skeleton, card**

---
title: "Masonry using TailwindCSS"
date: "2023-11-18"
categories: 
  - "notebook"
tags: 
  - "tailwindcss"
---

This code snippet demonstrates a simple yet effective way to create a masonry layout using TailwindCSS. Utilizing the columns-3 class, it organizes content into three neat columns, ideal for various types of content. The gap-3 class adds horizontal spacing between these columns, while mb-3 on each block ensures vertical spacing, maintaining a clean and organized look.

```html
<div class="h-screen w-full bg-slate-300 p-5">
  <div class="p-5 columns-3 gap-3 bg-white rounded-lg drop-shadow-lg">
    <div class="mb-3 bg-amber-600 text-white text-center p-3 rounded">
      Lorem ipsum
    </div>
    <div class="mb-3 bg-amber-600 text-white text-center p-3 rounded">
      Lorem ipsum, hello world!
    </div>
    <div class="mb-3 bg-amber-600 text-white text-center p-3 rounded">
      Mary had a little lamb. Its fleece was white as snow.
    </div>
    <div class="mb-3 bg-amber-600 text-white text-center p-3 rounded">
      Hey
    </div>
    <div class="mb-3 bg-amber-600 text-white text-center p-3 rounded">
      Porcupine tree
    </div>
    <div class="mb-3 bg-amber-600 text-white text-center p-3 rounded">
      Hey
    </div>
  </div>
</div>
```

See also:
- https://gist.github.com/drikusroor/652098c2da0f8f7f2adda19b0567dcc4
- https://jsfiddle.net/es5pm4rn/14/
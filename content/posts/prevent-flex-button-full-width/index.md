---
title: "Prevent a flex button to take up full width"
date: "2022-10-02"
categories: 
  - "notebook"
tags: 
  - "html"
  - "css"
  - "tailwindcss"
  - "flexbox"
---

## Regular html & css
```html
<style>
.container {
  display: flex;
  flex-direction: column;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
}
</style>

<body>
  <div class="container">
    <button class="item">
      <span>Click me!</span>
      <i>Icon</i>
    </button>
  </div>
</body>
```

## Or with TailwindCSS

```html
<body>
  <div class="flex flex-col">
    <button class="flex flex-row items-center self-center">
      <span>Click me!</span>
      <i>Icon</i>
    </button>
  </div>
</body>
```

See also https://stackoverflow.com/a/67819933/4496102

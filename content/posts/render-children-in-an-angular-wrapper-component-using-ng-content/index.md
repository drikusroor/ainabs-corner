---
title: "Render children in an Angular wrapper component using ng-content"
date: "2021-10-27"
categories: 
  - "tips-tricks"
tags: 
  - "angular"
  - "ng-content"
---

In my past experience with React, I have always used `props.children` to render children inside a wrapper or style component. It would look something like this:

```js
// Wrapper component:
function WrapperComponent(props) {
  return <div class="wrapper">{{ props.children }}</div>
}

// Usage:
function AppComponent() {
  return <WrapperComponent><div id="child">I'm a child</div></Wrapper>
}
```

Now, as I'm working with Angular, I needed to do the same thing. However, I could never find the correct way to do it. Google and DuckDuckGo kept referring me to `<ng-template>` or `<ng-container>`, which are not the directives I was looking for.

Thankfully, I have finally found the directive I was looking for ([thanks Khaled Osman](https://itnext.io/angular-for-react-developers-63239f278158#3479)). It is called `<ng-content>` and it is used almost exactly like in React:

```html
// Wrapper template:
<div class="wrapper">
  <ng-content></ng-content>
</div>

// Usage:
<app-wrapper>
  <div id="child">I'm a child</div>
</app-wrapper>
```

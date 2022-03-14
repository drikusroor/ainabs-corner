---
title: "Add JavaScript to a custom block in Wordpress"
date: "2022-01-23"
categories: 
  - "problems-solutions"
tags: 
  - "custom-blocks"
  - "gutenberg"
  - "wordpress"
---

Using Wordpress custom blocks, I'm currently trying to create a popover component that contains a button and a hidden content. The hidden content should appear when the user clicks on or hovers over the button (on the _frontend_ of the website, _not_ in the _block editor_).

## Problem

However, when I add an `onClick` or `onHover` to the button, the event handler is not executed.

Additionally, trying to use the `useState` hook to store the display state of the popover crashes my block editor.

This is what my `save` method code looked like:

### **save.js:**

```js
export default function save() {

    const \[shouldDisplay, setShouldDisplay\] = useState(false);

    const handleClick = () => {
        console.log('Click confirmed.');
        setShouldDisplay(!shouldDisplay);
    }

    return (
        <div {...useBlockProps.save()}>
            {/\* Button with onClick handler \*/}
            <button onClick={() => handleClick()}>Show hidden content!</button>

            {/\* Hidden content \*/}
            { shouldDisplay && <div class="popover-content">...</div> }
        </div>
    )
}

```

Wordpress custom blocks' `save` method [apparently](https://stackoverflow.com/questions/53072701/wordpress-add-onclick-event-inside-gutenberg-block) converts the return value to static html and gets rid of all the javascript.

## Solution

Until I find a better solution, for now it might be better just to enqueue a separate script to the custom block's plugin:

### **index.php** (the main plugin file):

function my\_blocks\_popover\_enqueue\_script()
{   
    wp\_enqueue\_script( 'my\_blocks\_popover\_script', plugin\_dir\_url( \_\_FILE\_\_ ) . 'popover/scripts/index.js' );
}
add\_action('wp\_enqueue\_scripts', 'my\_blocks\_popover\_enqueue\_script');

### **index.js** (the enqueued script):

document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll(".my-blocks-popover\_\_trigger")
        .forEach(function (el) {
            const dropdown = el.querySelector(".my-blocks-popover\_\_dropdown");

            el.addEventListener("mouseover", (\_e) => {
                dropdown.classList.add("my-blocks-popover\_\_dropdown--show");
            });

            el.addEventListener("mouseout", (\_e) => {
                dropdown.classList.remove("my-blocks-popover\_\_dropdown--show");
            });
        });
});

### **save.js** (the custom block's save function):

export default function save() {

    return (
        <div class="my-blocks-popover\_\_trigger" {...useBlockProps.save()}>
            <button class="my-blocks-popover\_\_button">Show hidden content!</button>
            <div class="my-blocks-popover\_\_dropdown">...</div>
        </div>
    )
}

---
title: "Square loading favicon in Typescript"
date: "2022-06-30"
categories:
  - "notebook"
tags:
  - "typescript"
  - "canvas"
  - "animations"
---

Based on rpsthecoder's [square loading favicon](https://github.com/rpsthecoder/square-loading-favicon) in JavaScript, but now in proper Typescript.

![](images/screenshot.png)

```ts
/**
 * Square loading favicon in Typescript
 * Author: Drikus Roor
 * Original author: https://github.com/rpsthecoder/square-loading-favicon
 */

interface IFavicon extends Element {
  href: string;
}

export function animateFavicon() {
  const canvas = document.querySelector("canvas");

  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (context) {
    const favicon = document.querySelector<IFavicon>('link[rel*="icon"]');

    if (!favicon) {
      return;
    }

    /* Style of the lines of the square that'll be drawn */
    const gradient = context.createLinearGradient(0, 0, 32, 32);
    gradient.addColorStop(0, "#c7f0fe");
    gradient.addColorStop(1, "#56d3c9");
    context.strokeStyle = gradient;
    context.lineWidth = 8;

    /* A variable to track the drawing increments */
    const interval = 50;
    let n = 0;
    const max = 100;
    /* Interval speed for the animation */
    setInterval(() => {
      drawLoader(canvas, context, favicon, n);
      n = n >= max ? 0 : n + 1;
    }, interval);
    /* Style of the button when the loader is being drawn */
  }
}
/* This function, incrementally, draws a square in canvas and transforms it to a favicon */
function drawLoader(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  favicon: IFavicon,
  n: number
) {
  context.clearRect(0, 0, 32, 32);
  context.beginPath();
  /* Upto 25% of the time assigned to draw */
  if (n <= 25) {
    /*
        (0,0)-----(32,0)
    */
    moveTo(0, 0);
    context.lineTo((32 / 25) * n, 0);
  } else if (n > 25 && n <= 50) {
    /* Between 25 to 50 percent */
    /*
        (0,0)-----(32,0)
                  |
                  |
                  (32,32)
    */
    moveTo(0, 0);
    context.lineTo(32, 0);
    moveTo(32, 0);
    context.lineTo(32, (32 / 25) * (n - 25));
  } else if (n > 50 && n <= 75) {
    /* Between 50 to 75 percent */
    /*
        (0,0)-----(32,0)
                  |
                  |
        (0,32)----(32,32)
    */
    moveTo(0, 0);
    context.lineTo(32, 0);
    moveTo(32, 0);
    context.lineTo(32, 32);
    moveTo(32, 32);
    context.lineTo(-((32 / 25) * (n - 75)), 32);
  } else if (n > 75 && n <= 100) {
    /* Between 75 to 100 percent */
    /*
         (0,0)-----(32,0)
            |      |
            |      |
        (0,32)----(32,32)
     */
    moveTo(0, 0);
    context.lineTo(32, 0);
    moveTo(32, 0);
    context.lineTo(32, 32);
    moveTo(32, 32);
    context.lineTo(0, 32);
    moveTo(0, 32);
    context.lineTo(0, -((32 / 25) * (n - 100)));
  }
  context.stroke();
  // Convert the Canvas drawing to PNG and assign it to the favicon
  favicon.href = canvas.toDataURL("image/png");
  // Increment the variable used to keep track of drawing intervals
  n++;
}

export default animateFavicon;
```

## See also:

- [Gist](https://gist.github.com/drikusroor/e4058b14085be3ce8b537463fd9c387c)
- [Original source](https://github.com/rpsthecoder/square-loading-favicon)

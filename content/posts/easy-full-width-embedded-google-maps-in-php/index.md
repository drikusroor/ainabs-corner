---
title: "Easy full-width embedded Google Maps in php"
date: "2021-10-29"
categories: 
  - "tips-tricks"
tags: 
  - "google-maps"
  - "php"
coverImage: "Screenshot-2021-10-29-at-21.06.10-e1635534472580.png"
---

Just an [easy full-width embedded Google Maps snippet](https://gist.github.com/drikusroor/a973906c25e6b4dfa35523af259993a1) for my own reference:

```html
<!-- In PHP -->
<iframe
  src="
<?php
$search\_terms = rawurlencode("3 Abbey Road, London, GB NW8 9AY");
$src =
    "https://www.google.com/maps?q=2880%20" .
    $search\_terms .
    "&t=&z=15&ie=UTF8&iwloc=&output=embed";
echo $src;
?>"
  width="600"
  height="500"
  style="border:0; width: 100% !important;"
  frameborder="0"
  scrolling="no"
  marginheight="0"
  marginwidth="0"
  allowfullscreen=""
  loading="lazy">
</iframe>

<!-- Or, in raw HTML -->
<iframe
  src="https://www.google.com/maps?q=2880%203%20Abbey%20Road%2C%20London%2C%20GB%20NW8%209AY&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" 
  style="border: 0px none; width: 100% !important; max-width: 100%;" 
  scrolling="no" 
  marginheight="0" 
  marginwidth="0" 
  allowfullscreen="" 
  loading="lazy" 
  width="600" 
  height="500" 
  frameborder="0"
>
</iframe>
```

Should result into:

<iframe src="https://www.google.com/maps?q=2880%203%20Abbey%20Road%2C%20London%2C%20GB%20NW8%209AY&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" style="border: 0px none; width: 100% !important; max-width: 100%;" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen loading="lazy" width="600" height="500" frameborder="0"></iframe>

---
title: "Organize your Wordpress theme's functions.php by using namespaces and classes"
date: "2021-11-15"
categories: 
  - "tips-tricks"
tags: 
  - "child-theme"
  - "php"
  - "wordpress"
featured_image: "images/image-7.png"
---

As you can extend your Wordpress theme by adding actions to the theme's `functions.php`, it is safe to say that it is very easy to bloat this file with hundreds of lines of code.

The nasty thing is that the usual advice is to write a function and then add that function as an action by passing the function's name as a string. That would look something like this:

```php
<?php

// file: functions.php

function my\_theme\_apply\_favicon() {
  // Do stuff like applying a favicon
}

add\_action('wp\_head', 'my\_theme\_apply\_favicon');

?>
```

Using this method, it is not possible to move logic to other files and all code accumulates into your theme's `functions.php`.

Today, however, I have found out there is another way. Apparently, [you can also pass a class method](https://developer.wordpress.org/reference/functions/add_action/#comment-355) method to the `add_action` hook instead of passing the function's name as a string:

```php
<?php

add\_action( 'wp-head', array($this, 'my\_theme\_apply\_favicon' ));

?>
```

This class, then, can be moved to a different file to decrease the size of your `functions.php`. You then call `add_action` in the constructor of the class. `functions.php` only has to instantiate the class.

The end result looks like this:

```generic
<?php namespace actions;

// file: actions/apply-favicon.php

class ApplyFavicon {

  public function \_\_construct() {
    add\_action( 'wp-head', array($this, 'my\_theme\_apply\_favicon' ));
  }

  public my\_theme\_apply\_favicon() {
    // Do stuff like applying a favicon
  }

}

?>

<?php

// file: functions.php

// include the ApplyFavicon class file
include 'actions/apply-favicon.php';

// instantiate the class object
new \\actions\\ApplyFavicon();
```

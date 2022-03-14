---
title: "Check if a Wordpress constant has been defined"
date: "2021-12-26"
categories: 
  - "notebook"
  - "tips-tricks"
tags: 
  - "configuration"
  - "constants"
  - "php"
  - "wordpress"
---

Suppose I have configured a constant in the `wp-config.php` of my website:

```php
<?php
/\* Super important configuration constant \*/
define('SUPER\_IMPORTANT\_VALUE', '123e4567-e89b-12d3-a456-426614174000');
?>
```

Whenever you want to use this value in your website, it would be nice to know if the constant has been defined already. You'd expect to be able to do this using something like:

```php
<?php
/\* !empty does not work for a constant \*/
if (!empty(SUPER\_IMPORTANT\_VALUE)) {
  // Do stuff
}
?>
```

But apparently this always resolves to `true`.

What _does_ work, is to use php's `defined` function:

```generic
<?php
/\* Note the use of quotes, this is important.  This example is checking
 \* if the string 'TEST' is the name of a constant named TEST \*/
if (defined('SUPER\_IMPORTANT\_VALUE')) {
  // Do stuff
}
?>
```

For more information, check the docs [here](https://www.php.net/manual/en/function.defined.php).

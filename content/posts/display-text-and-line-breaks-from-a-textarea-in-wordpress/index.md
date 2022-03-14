---
title: "Preserve line breaks from a textarea in Wordpress"
date: "2021-10-17"
categories: 
  - "tips-tricks"
tags: 
  - "line-breaks"
  - "php"
  - "wordpress"
---

Today, I have added some customization settings to a Wordpress website. One of these settings consisted of a textarea input that would be used to enter and display an address. When I wanted to display the address, however, the address was displayed as one single line where it should have been displayed on three lines (Street + number, postal code, city).

```php
// Incorrect code:

<?php
$address = get\_theme\_mod('address', '');
if ($address) {
    echo $address;
}
?>
```

In Wordpress, there are two ways to preserve the line breaks from a textarea input.

### Solution 1: wpautop

Wordpress itself has a `wpautop()` ([link](https://developer.wordpress.org/reference/functions/wpautop/)) function that will insert `<br>` line break elements into the HTML. A double line break in the textarea will result in a `<p>` paragraph element. Lastly, the entire content will be wrapped inside a `<p>` paragraph element.

```php
// The "wpautop" solution:

<?php
$address = get\_theme\_mod('address', '');
if ($address) {
    echo wpautop($address);
}
?>

// A textarea input of:
Street no.
Postal code
City

// Will result into:
<p>
  Street no.
  <br>
  Postal code
  <br>
  City
</p>

// But a textarea input of (do note the double line break):
Street no.
Postal code

City

// Will result into:
<p>
  Street no.
  <br>
  Postal code
</p>
<p>
  City
</p>

```

### Solution 2: nl2br

The function `nl2br` ([link](https://www.php.net/manual/en/function.nl2br.php)) is actually a function from PHP and not from Wordpress. It converts line breaks to `<br>` elements, but does not create `<p>` paragraph elements for double line breaks. Instead, it outputs two `<br>` line break elements for double line breaks. Lastly, it does _not_ wrap the entire content inside of a `<p>` paragraph element, but directly outputs the content.

```php
// The "nl2br" solution:

<?php
$address = get\_theme\_mod('address', '');
if ($address) {
    echo nl2br($address);
}
?>

// A textarea input of:
Street no.
Postal code
City

// Will result into:
Street no.
<br>
Postal code
<br>
City

// But a textarea input of (do note the double line break):
Street no.
Postal code

City

// Will result into:
Street no.
<br>
Postal code
<br>
<br>
City

```

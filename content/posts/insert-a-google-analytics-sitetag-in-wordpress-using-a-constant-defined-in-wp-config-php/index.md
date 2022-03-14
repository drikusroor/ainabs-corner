---
title: "Insert a Google Analytics sitetag in Wordpress using a constant defined in wp-config.php"
date: "2021-12-26"
categories: 
  - "notebook"
tags: 
  - "gist"
  - "google-analytics"
  - "wordpress"
---

First, define your Google Analytics constant in `wp-config.php`:

```php
// wp-config.php

/\* Google Analytics Key \*/
define('GOOGLE\_ANALYTICS\_KEY', 'G-XXXXXXXXXX');
```

Then, insert the following gist inside the `<head>` of your website (`header.php` in my case):

```php
// header.php (for example)

<?php
if (defined('GOOGLE\_ANALYTICS\_KEY')) {
?>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo GOOGLE\_ANALYTICS\_KEY; ?>"></script>
	<script>
		window.dataLayer = window.dataLayer || \[\];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', '<?php echo GOOGLE\_ANALYTICS\_KEY; ?>');
	</script>
<?php
} // if (defined('GOOGLE\_ANALYTICS\_KEY'))
```

Source: [link](https://gist.github.com/drikusroor/37584fc94f9677123a64bbe2460c7d76)

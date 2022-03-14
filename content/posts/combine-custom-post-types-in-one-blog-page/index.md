---
title: "Combine custom post types in one blog page"
date: "2021-09-06"
categories: 
  - "tips-tricks"
tags: 
  - "child-theme"
  - "pods"
  - "wordpress"
---

If you, like me, are using [Pods](https://pods.io) to create custom post types, you might have noticed that the post types created using Pods do not appear on your blog page by default. This is because Wordpress only queries posts with the post type `post` by default.

Now, you may not even want to display your pods on the blog page, but if you do, there are several ways to do this (and the choice is yours).

## 1\. Modify the default query in functions.php

Add the following code to your `functions.php` file:

```php
// functions.php

function custom\_get\_posts($query)
{
  if (is\_home() && $query->is\_main\_query()) {
    $query->set('post\_type', array('post', 'pod-a', 'pod-b'));
  }

  return $query;
}

add\_filter('pre\_get\_posts', 'custom\_get\_posts');
```

The above is a filter that will modify the `get_posts()` result whenever you are on the home page and Wordpress is running the main query.

**Note:** Do not forget to replace `pod-a` and `pod-b` by your own pod names.

## 2\. Use a custom query in your template

If you want to combine the posts with your pods on a custom template, it might be handier to use a custom query from within the template. In my case, I only wanted to combine posts and pods on a specific page and maintain control over the layout of the page. In your custom template, use the following code:

```php
// custom template

<?php
// query to get all published posts & pods
$fx\_get\_posts = new WP\_Query(array(
  'post\_type' => array('post', 'pod-a', 'pod-b'),
  'post\_status' => 'publish',
  'posts\_per\_page' => -1 
));
		
// check if the query retrieved any post
if ($fx\_get\_posts->have\_posts()) : ?>

  <!-- the php while loop -->
  <?php while ($fx\_get\_posts->have\_posts()) : $fx\_get\_posts->the\_post(); ?>
    <article id="post-<?php the\_ID(); ?>">
      <!-- style your post layout -->
    </article>

  <?php endwhile; ?>
  <!-- end of the loop -->

<!-- restore the posts to global settings -->
<?php 
  wp\_reset\_postdata();
  else : 
?>

  <!-- no posts -->
  <p>
    <?php \_e('There are no posts to display at the moment'); ?>
  </p>

<?php endif; ?>
```

**Note:** Do not forget to replace `pod-a` and `pod-b` by your own pod names.

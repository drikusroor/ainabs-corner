---
title: "How to Display Custom Field Values in Wordpress Admin for Custom Post Types"
date: "2023-12-03"
categories: 
  - "tips-tricks"
tags: 
  - "wordpress"
---

## Problem: Custom fields not visible in admin overview

Have you ever struggled with the lack of visibility of custom fields in your WordPress admin dashboard, especially when working with custom post types? It can be challenging to quickly view the specific metadata associated with these posts. This is a common issue for WordPress developers and content managers who need a streamlined way to manage and display custom data. The good news is that with a bit of code, you can easily add custom columns to your admin dashboard to display these values.

## Solution: Show custom fields by adding some actions

Let's dive into how you can solve this problem. The solution involves adding a bit of code to your theme's functions.php file. This code will create a new column in the admin dashboard for your custom post type and populate it with values from a custom field. In this case, we're focusing on a custom post type named `question` and a custom field named `question_code`.

```php
<?php

// ... Rest of functions.php

/**
 * Add the question code column to the question custom post type.
 */
function add_question_code_column_to_question_cpt($columns) {
    $columns['question_code'] = 'Question Code';
    return $columns;
}
add_filter('manage_question_posts_columns', 'add_question_code_column_to_question_cpt');

function question_code_column_content($column, $post_id) {
    if ($column == 'question_code') {
        $question_code = get_post_meta($post_id, 'question_code', true);
        echo $question_code;
    }
}
add_action('manage_question_posts_custom_column', 'question_code_column_content', 10, 2);
```

## How does this work?

The magic lies in WordPress's dynamic hooks. Specifically, the `manage_[post_type]_posts_columns` filter and the `manage_[post_type]_posts_custom_column action`. In our case, `[post_type]` dynamically becomes `question`, turning the hooks into `manage_question_posts_columns` and `manage_question_posts_custom_column`. This dynamic approach allows WordPress to apply our customizations specifically to the 'question' post type. The first hook, `manage_question_posts_columns`, lets us inject a new column named 'Question Code' into the admin dashboard for 'question' posts. The second hook, `manage_question_posts_custom_column`, is where the actual data populates. It checks if the current column matches 'question_code', and if so, retrieves and displays the value from the 'question_code' custom field using get_post_meta. This streamlined process elegantly enhances the admin dashboard, providing quick access to critical data without disrupting the core functionality of WordPress.

See also https://gist.github.com/drikusroor/b6bcea10330189a72c077c700b6787d7
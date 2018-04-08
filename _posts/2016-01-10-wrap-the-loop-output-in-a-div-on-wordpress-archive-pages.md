---
layout: post
status: publish
published: true
title: Wrap the loop output in a div on WordPress archives
description: Learn how to wrap the WordPress loop output in divs with a column layout
wordpress_url: http://www.read-stuff.com/?p=4
date: '2016-01-10 21:30:45 +0000'
date_gmt: '2016-01-10 21:30:45 +0000'
categories:
- PHP
- Tutorials
tags:
- Modulus
comments: []
comments: true
---

*Note: This posts assume you understand the loop, can access your template.php files and have a basic understanding of PHP*

Arranging your archive posts as tiles in columns can look great - [check out Chris Lema's site for example](https://chrislema.com/blog/).

To achieve this effect you need to wrap the loop output in a div. But how do you do that?

Answer: create a counter!

## The counter

A counter is a variable number that will increase by one on each loop. Essentially, we are assigning a number to each output of the loop.

We want our first output to be counted as 1, second as 2, third as 3 etc. etc. So to do this, we set counter at 0 before we start the loop.

code:


```php
/* Start the Loop */
<?php while ( have_posts() ) : the_post(); $counter++ ?> // increment counter by one on each loop

<?php get_template_part( 'template-parts/content', get_post_format() ); ?>

<?php endwhile; ?>/* Start the Loop */
<?php while ( have_posts() ) : the_post(); $counter++ ?> // increment counter by one on each loop

<?php get_template_part( 'template-parts/content', get_post_format() ); ?>

<?php endwhile; ?>
```

Each post will now be outputted with a number. Great. But how do we use this to output an opening div tag and closing div tag where we want?

Answer: the modulus operator!

## The Modulus Operator ( % )

The modulus operator ( % ) divides the first value by the second and returns the remainder. So 4 % 4 returns 0, since 4 divided by 4 leaves no remainder. 8 % 4  also returns 0, same as 12 % 4.

We use it to calculate how many iterations of the loop have already occurred.  If $counter % 4 == 0, then we know we are on the fourth iteration of the loop, and if $counter %  == 1 we will be on the first iteration after every fourth iteration.

## Wrap the Loop Output in a Div

```php
<?php $counter = 0; // Reset Counter to Avoid Problems

/* Start the Loop */ 
 while ( have_posts() ) : the_post(); $counter++ ?> // increment counter by one on each loop

 if( $counter % 2 == 1 ) { // Add div before every odd loop post
 echo '<div class="row">';
 }; 
 

 get_template_part( 'template-parts/content', get_post_format() );
 

 if( $counter % 2 == 0 ) { // Close div after every even loop post
 echo '</div><!-- .row -->';
 }; 
endwhile; ?>
```
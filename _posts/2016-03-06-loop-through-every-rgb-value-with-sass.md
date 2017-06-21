---
layout: post
status: publish
published: true
title: Loop Through Every RGB Value with Sass
description: Learn how to loop through every RGB value with Sass. This snippet shows you how to use for loops to print every RGB value as a CSS property.
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 122
wordpress_url: http://www.eddyerburgh.com/?p=122
date: '2016-03-06 12:40:00 +0000'
date_gmt: '2016-03-06 12:40:00 +0000'
categories:
- CSS
- Sass
tags: []
comments: []
---
I wanted to figure out how to loop through every RGB value with Sass and assign them to divs with the nth-child selector. It was easy to write, but I haven't got a computer powerful enough to compile 16 million CSS classes. Do you?

## The code

```scss
$i: 1;
$red: 0;
$green: 0;
$blue: 0;
@for $red from 0 through 255 {
  @for $green from 0 through 255 {
    @for $blue from 0 through 255 {
      .color-block:nth-child(#{$i}) {
        background: rgb($red, $green, $blue)
      }
      $i: $i + 1;
    }
  }
}
```

Stick that in your file and ~~smoke it~~ compile it!

## What's Going On?\

We're using nested loops to run through each value of red, green and blue. The possible values of each ranges from 0 - 255 (but you probably already know that), and we need to print every possible combination.

What the loops do in plain English - start with red value of 0, loop through every green value from 0-255 then increment the red value to 1. Before the green value increments,  loop through every blue value from 0-255 and output current $red, $green and $blue value as an rgb value for a background property.

Each iteration of the loops will finish with the @for $blue loop. So we need to create our CSS here. We use the values $red, $green and $blue values that were assigned in our loop to create a valid RGB. $red = 0, $green = 0 and $ blue = 0 will produce rgb(0,0,0).

We then need to assign the created value using a CSS selector. In this example we are adding the rgb as a background property to every nth-child of .color-block. This is done by adding 1 to the variable $i after each loop and using $i as the value for :nth-child.

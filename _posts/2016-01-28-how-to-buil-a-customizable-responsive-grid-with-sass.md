---
layout: post
status: publish
published: true
title: How to Build a Customizable Responsive Grid with SASS
description: Create a customizable responsive grid with SASS. Learn the formula for a twelve column grid and how to use calculations to create a customizable grid
wordpress_id: 40
wordpress_url: http://www.eddyerburgh.com/?p=40
date: '2016-01-28 22:45:30 +0000'
date_gmt: '2016-01-28 22:45:30 +0000'
categories:
- CSS
- Sass
- Tutorials
tags:
- Responsive
- SASS
comments: []
---

Variables and calculations make it easy to create a customizable responsive grid with SASS. Let's build one now in SCSS

##The Grid

This SASS will compile to a twelve-column grid

```
$grid-margin: 6%; // edit to change grid margin
$column-width: ( 100 - ( $grid-margin * 11 ) ) / 12 ;
@media (min-width: 700px) {
	.one    { width: $column-width; }
	.two 	{ width: $column-width + ( ($column-width + $grid-margin)  * 1  ); }
	.three	{ width: $column-width + ( ($column-width + $grid-margin)  * 2  ); }
	.four 	{ width: $column-width + ( ($column-width + $grid-margin)  * 3  ); }
	.five   { width: $column-width + ( ($column-width + $grid-margin)  * 4  ); }
	.six 	{ width: $column-width + ( ($column-width + $grid-margin)  * 5  ); }
	.seven  { width: $column-width + ( ($column-width + $grid-margin)  * 6  ); }
	.eight 	{ width: $column-width + ( ($column-width + $grid-margin)  * 7  ); }
	.nine 	{ width: $column-width + ( ($column-width + $grid-margin)  * 8  ); }
	.ten    { width: $column-width + ( ($column-width + $grid-margin)  * 9  ); }
	.eleven { width: $column-width + ( ($column-width + $grid-margin)  * 10 ); }
	.twelve { width: 100%; }
}
```

Much cleaner than pure CSS.

It's based off <a href="https://github.com/dhg/Skeleton/blob/master/css/skeleton.css">the skeleton grid</a>. The difference is we can control this one by changing the value of $grid-margin and saving the .scss file.

##What's Going on?

###The Basics

Each column is 100% width until it hits the breakpoint (800px in this grid). When the media query kicks in each column is given a width depending on the number and floated to arrange them side-by-side. Have a look at the code or check out this great introduction to understand it.

###The Math

**To calculate column width from the margin**: `( 100 - ( $grid-margin * 11 ) ) / 12 ;`

**To calculate each number width**: `$column-width + ( ($column-width + $grid-margin) * 6`

##Add a SASS loop!

That's great and all, but SASS has loops built into it. There's a lot of repeating going on there, so let's condense it down a bit.

First we need to abstract the calculation. Those numbers need to become i's. Luckily it's pretty easy:

```scss
width: $column-width + ( ($column-width + $grid-margin) * ( $i - 1 ) )
```

The numbers used in the equations are just i - 1. Now we need to add the class name. To do this we make a variable with multiple values:

```scss
$column-numbers: (one), (two), (three), (four), (five), (six), (seven), (eight), (nine), (ten), (eleven), (twleve); 
```
 
We can loop through these with an @each loop. But we still need the index values. This can be done with the SCSS `'$i: index($column-numbers, $column-number);'`

Check out the full loop:

```scss
$grid-margin: 6%; // edit to change grid margin
$column-width: ( 100 - ( $grid-margin * 11 ) ) / 12 ;
$column-numbers: (one), (two), (three), (four), (five), (six), (seven), (eight), (nine), (ten), (eleven), (twelve);
@each $column-number in $column-numbers {
  $i: index($column-numbers, $column-number);
  .#{ $column-number} {
    width: $column-width + ( ($column-width + $grid-margin)  * ( $i - 1 ) )
  }
} 
```

So we loop through each column number value. Then we define $i as the index of our current value. The class name uses the $column-number variable, which is escaped with  #{}. We then add the same calculation that we used in the first example, except instead of hard coding a number we add $i - 1.

Woop! Way more concise!

Now I like to have offset-(column number) classes to center my grids or what have you. Using the same premise as above we can add them to the loop to output them at the same time :

```scss
margin-left: $column-width * $i + $grid-margin * $i !important;
```

Now to add all the extra CSS to make a grid and include the offset SCSS in the loop:

##The Code

```scss
// Grid
//
$container-width: 1200px;
$grid-breakpoint: 800px;
$grid-margin: 1%;
$grid-number: 12;
.row:before,
.row:after,
.clearfix:after {
    content: " ";
    display: table;
}
.row,
.container {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
}
.container {
    max-width: $container-width;
    margin: 0 auto;
}
.column,
.column-mobile {
    width: 100%;
    float: left;
    box-sizing: border-box;
}
@media (min-width: 560px) {
    .container {
        width: 95%;
    }
}
@media (min-width: $grid-breakpoint) {
  .container {
    width: 100%;
  }
  .column {
    margin-left: $grid-margin;
  }
  .column:first-of-type {
    margin-left: 0;
  } 
  $column-width: ( 100 - ( $grid-margin * $grid-number - 1 ) ) / $grid-number ;
  $column-numbers: (one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve);
  @each $column-number in $column-numbers {
    $i: index($column-numbers, $column-number);
    .#{$column-number} {
      width: $column-width + ( ($column-width + $grid-margin)  * ( $i - 1 ) )
    }
    .offset-#{$column-number} {
      margin-left: $column-width  * $i  + $grid-margin * $i  !important;
    }
  }
}
```
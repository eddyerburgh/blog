---
layout: post
status: publish
published: true
title: Make a Responsive Tic Tac Toe Board with CSS
description: Learn how to make a responsive tic tac toe board with CSS and HTML. This tutorial walks you through the process of making responsive squares for your board.
wordpress_id: 294
wordpress_url: http://www.coding123.org/?p=294
date: '2016-04-29 20:16:52 +0000'
date_gmt: '2016-04-29 20:16:52 +0000'
categories:
- CSS
- Tutorials
tags: []
comments: true
---

In this tutorial we are going to make a responsive tic tac toe board with an HTML table. The final product will look like this:

<img class="wp-image-295 size-medium aligncenter" src="/assets/2016/04/tic-tac-toe-board-300x300.png" alt="Responsive Tic Tac Toe Board Being Played" width="300" height="300" />

Let's go.

## The problem

There's two parts to make a tic tac toe board -
1. Create a 3x3 grid with square cells
2. Add the borders

First we'll make the grid.

## The grid

We're going to use an HTML table structure for our grid. It's more semantic and is better for accesability - <a rel="noopener" href="https://www.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/">screen readers treat tables differently from other elements</a>. Most screen readers include shortcuts to navigate the tables with the arrow pad, and the size of the grid will be read out to tell the user the dimensions of the grid.

Our HTML looks like this :

```html
<table id="board">
<tr>
<td></td>
<td></td>
<td></td>
  </tr>
<tr>
<td></td>
<td></td>
<td></td>
  </tr>
<tr>
<td></td>
<td></td>
<td></td>
  </tr>
</table>
```

That HTML will produce a table, but it won't have any content. Without styling, there's nothing to see. So let's add some CSS.
```css
table {
  width: 100%;
}
td {
  width: 33.333%;
}
td:after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

So what's going on? First, we set the table to be 100% the width of it's container. This is our benchmark that we set the width of our other elements to, so using percentages to declare the width will keep the whole thing responsive.

The table cells (td stands for table datum, but everyone calls them cells) are given a width of 33.333%. This means each cell will take up a third of the table width.

So far so good, but we need some height! This is where the magic happens. We create a <i>pseudo element</i> using <a rel="noopener" href="https://developer.mozilla.org/en/docs/Web/CSS/::after">after</a>. We're basically adding a child to our td element with CSS here. With the child we display it as a block element and give it 100% margin-top. Since margin-top is based on its parent's width, the :after element will be the same size as it's parent.

So because all our widths are set as percentages, we have responsive tic tac toe board. We can see how it resizes with the borders added:

<img class="wp-image-296 size-medium aligncenter" src="/assets/2016/04/responsive-tic-tac-toe-300x283.gif" alt="Responsive Tic Tac Toe Board Being Resized" width="300" height="283" />

## Adding the borders

Adding borders to tables is like adding borders to a normal div, there's just one extra property we need to add. Let's have a look :

```css
table {
  border-collapse: collapse;
}
td {
  border: 6px solid #222;
}
td:first-of-type {
  border-left-color: transparent;
  border-top-color: transparent;
}
td:nth-of-type(2) {
  border-top-color: transparent;
}
td:nth-of-type(3) {
  border-right-color: transparent;
  border-top-color: transparent;
}
tr:nth-of-type(3) td {
  border-bottom-color: transparent;
}</code>
</pre>
Can you see it? It's <code>border-collapse: collapse</code>. Normally table borders have a sort of gutter in them, so we need this property to get rid of that.
Apart from that, we're just setting the relevant border colors to transparent using the <a rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child">nth-child pseudo class</a>. This pseudo class only targets the nth child, so we can target the 2nd td in each column by adding 2 to the nth child pseudo class. We also use the first-of-type pseudo class which targets the first element in a group of elements.
And that's it, we got ourselves a responsive tic tac toe board.
Put all the CSS together and we're good to go :
<pre><code class="css">table {
  width: 100%;
  border-collapse: collapse;
}
td {
  width: 33.333%;
  border: 6px solid #222;
}
td::after {
  content: '';
  display: block;
  margin-top: 100%;
}
td {
  border: 6px solid #222;
}
td:first-of-type {
  border-left-color: transparent;
  border-top-color: transparent;
}
td:nth-of-type(2) {
  border-top-color: transparent;
}
td:nth-of-type(3) {
  border-right-color: transparent;
  border-top-color: transparent;
}
tr:nth-of-type(3) td {
  border-bottom-color: transparent;
}
```

Thanks for reading, any questions leave a comment.

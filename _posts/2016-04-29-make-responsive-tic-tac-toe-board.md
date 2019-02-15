---
layout: post
status: publish
published: true
title: Make a responsive tic tac toe board with CSS
description: Learn how to make a responsive tic tac toe board with CSS and HTML. This tutorial walks you through the process of making responsive squares for your board.
wordpress_id: 294
wordpress_url: http://www.coding123.org/?p=294
date: "2016-04-29 20:16:52 +0000"
date_gmt: "2016-04-29 20:16:52 +0000"
categories:
  - CSS
  - Tutorials
tags: []
comments: true
---

In this tutorial you'll learn how to make a responsive tic tac toe board using a `<table>` element.

The final board looks like this:

<style>
table {
  width: 100%;
  border-collapse: collapse;
  max-width: 300px;
}

td {
  width: 33.333%;
  border: 6px solid #222;
}

td::after {
  content: "";
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
</style>

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

## The grid

The grid is created with a `<table>` element:

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

The next step is style the table so that each `<td>` element is a square that takes up 1/3 the total table width.

You can do this by setting the `<table>` element `width` to `100%`, and each `<td>` element `width` to `33.3%`.

Then create a pseudo element with <a rel="noopener" href="https://developer.mozilla.org/en/docs/Web/CSS/::after">`::after`</a> that has `margin-top` of `100%` to force the parent `<td>` to have the same height as it has width.

```css
table {
  width: 100%;
}

td {
  width: 33.3%;
}

td:after {
  content: "";
  display: block;
  margin-top: 100%;
}
```

Because all the widths are set as percentages, the tic tac toe board is responsive.

## Adding the borders

 You need to set the relevant border colors to transparent using the <a rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child">nth-child pseudo class</a>:

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
}
```

The final CSS looks like this:

```css
table {
  width: 100%;
  border-collapse: collapse;
}

td {
  width: 33.333%;
  border: 6px solid #222;
}

td::after {
  content: "";
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

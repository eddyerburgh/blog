---
layout: post
status: publish
published: true
title: How to Use Bootstrap 4 Media Query Mixins
description: If you are working on an SCSS Bootstrap 4 project, you'll need media queries. This snippet shows you how to correctly use Bootstrap 4 media query mixins.
wordpress_id: 336
wordpress_url: http://www.coding123.org/?p=336
date: '2016-05-27 16:47:53 +0000'
date_gmt: '2016-05-27 16:47:53 +0000'
categories:
- Sass
- Snippet
tags: []
comments: true
---

If you're using Bootstrap 4 SCSS you'll want to use the Bootstrap 4 Media Query Mixins.

## Include

To use the Bootstrap 4 mixins you must include <a rel="noopener" href="https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss" target="newwindow">_variables.scss</a>,  <a rel="noopener" href="https://github.com/twbs/bootstrap/blob/v4-dev/scss/_functions.scss" target="newwindow">_functions.scss</a>, and <a rel="noopener" href="https://github.com/twbs/bootstrap/blob/v4-dev/scss/mixins/_breakpoints.scss" target="newwindow">mixins/_breakpoints.scss</a>.

## The mixin

The mixins are pretty self explanatory :

### Min width

```scss
@include media-breakpoint-up(sm) {
  // Styles
}
/* Compiled:
 * @media (min-width: 544px) {}
 */
 ```

### Max width

```scss
@include media-breakpoint-down(sm) {
  // Styles
}
/* Compiled:
 * @media (min-width: 544px) and (max-width: 768px) {}
 */
 ```

### Min and max width

```
@include media-breakpoint-between(sm, md) {
    // your code
}
/*
 * @media (min-width: 576px) and (max-width: 991px) {}
 */
```

They use the Bootstrap breakpoint values as parameters. By default these are :

<table>
<tbody>
<tr>
<td>xs</td>
<td>0</td>
</tr>
<tr>
<td>sm</td>
<td>544px</td>
</tr>
<tr>
<td>md</td>
<td>768px</td>
</tr>
<tr>
<td>lg</td>
<td>992px</td>
</tr>
<tr>
<td>xl</td>
<td>1200px</td>
</tr>
</tbody>
</table>

You can change these values by editing the $grid-breakpoints map in variables.scss. This will also change the values for the grid and responsive utilities.

And that's how to correctly use Bootstrap 4 media query mixins.

Any questions, leave a comment.

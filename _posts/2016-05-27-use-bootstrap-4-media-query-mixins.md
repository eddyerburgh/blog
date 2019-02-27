---
layout: post
status: publish
published: true
title: How to use Bootstrap 4 media query mixins
description: This snippet shows you how to correctly use Bootstrap 4 media query mixins.
date: "2016-05-27 16:47:53 +0000"
comments: true
---

This snippet shows you how to use Bootstrap 4 SCSS Media Query Mixins.

## Dependencies

To use the Bootstrap 4 mixins you must import <a rel="noopener" href="https://github.com/twbs/bootstrap/blob/v4.3.1/scss/_variables.scss" target="newwindow">\_variables.scss</a>, <a rel="noopener" href="https://github.com/twbs/bootstrap/blob/v4.3.1/scss/_functions.scss" target="newwindow">\_functions.scss</a>, and <a rel="noopener" href="https://github.com/twbs/bootstrap/blob/v4.3.1/scss/mixins/_breakpoints.scss" target="newwindow">mixins/\_breakpoints.scss</a>:

```scss
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/_breakpoints";
```

## Min width

```scss
@include media-breakpoint-up(sm) {
  // Styles
}

// Compiled:
//   @media (min-width: 544px) {}
```

## Max width

```scss
@include media-breakpoint-down(sm) {
  // Styles
}
// Compiled:
//  @media (min-width: 576px) and (max-width: 768px) {}
```

### Min and max width

```scss
@include media-breakpoint-between(sm, md) {
  // your code
}
//  Compiled:
//    @media (min-width: 576px) and (max-width: 992px) {}
```

The mixins take Bootstrap breakpoint values as parameters. By default these are:

| name | minimum width (px) |
| ---- | ------------------ |
| xs   | 0                  |
| sm   | 576                |
| md   | 768                |
| lg   | 992                |
| xl   | 1200               |

You can change these values by editing the `$grid-breakpoints` map in variables.scss. This will also change the values for the grid and responsive utilities.

And that's how to correctly use Bootstrap 4 media query mixins.

Any questions, leave a comment.

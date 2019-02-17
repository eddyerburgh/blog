---
layout: post
status: publish
published: true
title: How to create a triangular responsive background image
description: Learn how to create a split responsive triangular images with the CSS clip-path property.
date: "2016-01-22 21:16:15 +0000"
date_gmt: "2016-01-22 21:16:15 +0000"
comments: true
---

In this article you'll learn how to create a triangular responsive background image using the `clip-path` CSS property.

You can see an example below:

<style>
  #parent {
    max-width: 400px;
    height: 200px;
    display: block;
    position: relative;
    margin-bottom: 1rem;
  }

  #parent div {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .div-one {
    background: url('https://i.imgur.com/8LgIL7B.jpg') center / cover no-repeat;
  }

  .div-two {
    -webkit-clip-path: polygon(100vw 0, 0% 100%, 100% 100%);
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    background: url('https://i.imgur.com/fBL4WC1.jpg') center / cover no-repeat;
  }

  body {
    margin: 0;
  }
</style>

<div id="parent">
  <div class="div-one"></div>
  <div class="div-two"></div>
</div>

This style is achieved by positioning a `<div>` element over another `<div>`, and using the `clip-path` property to clip the top half of the overlapping `<div>`.

First you need to create two `<div>` elements:

```html
<div class="div-one"></div>
<div class="div-two"></div>
```

Then position them absolutely, and give them `width` `100vw` and `height` `100vh` to fill the viewport:

```css
div {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
```

Add a background image to each:

```css
.div-one {
  background: url("http://i.imgur.com/8LgIL7B.jpg") center / cover no-repeat;
}

.div-two {
  background: url("http://i.imgur.com/fBL4WC1.jpg") center / cover no-repeat;
}
```

Finally use the `clip-path` property to clip the top half of the overlapping `<div>`:

```css
.div-two {
  clip-path: polygon(100vw 0, 0% 100vh, 100vw 100vh);
}
```

The final code looks like this:

```html
<div class="div-one"></div>
<div class="div-two"></div>

<style>
  div {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .div-one {
    background: url("http://i.imgur.com/8LgIL7B.jpg") center / cover no-repeat;
  }

  .div-two {
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    background: url("http://i.imgur.com/fBL4WC1.jpg") center / cover no-repeat;
  }
</style>
```

_Note: As of 2019 support for clip-path is poor, so you probably shouldn't use this in production. You can [see the support for `clip-path` on CanIUse](https://caniuse.com/#feat=css-clip-path)._

If you have any questions, please leave a comment.

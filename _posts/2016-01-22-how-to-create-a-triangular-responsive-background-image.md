---
layout: post
status: publish
published: true
title: How To Create a Triangular Responsive Background Image
description: Learn how to create two fullscreen responsive triangular images with the CSS clip-path property! Easy to copy triangular responsive background image
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 11
wordpress_url: http://www.read-stuff.com/?p=6
date: '2016-01-22 21:16:15 +0000'
date_gmt: '2016-01-22 21:16:15 +0000'
categories:
- CSS
- Tutorials
tags:
- clip-path
comments: true
---
In this article we'll see how to create a fullscreen responsive triangular images with CSS.

tl;dr: [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)

## Result

[https://jsfiddle.net/11kn8mjn/4/](https://jsfiddle.net/11kn8mjn/4/)

## Browser Support

[Support for clip-path is poor](https://caniuse.com/#feat=css-clip-path) – IE and Edge don’t support it at all!

## How It’s Done

Two fullscreen divs with responsive background images are positioned on top of each other.

Clip mask is used to show a responsive triangle of the overlaying div.

## Creating the Fullscreen Triangular Responsive Background Image

Two divs are positioned on top of each other absolutely:

```css
div {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
```

With a responsive background image:


```css
.div-one { background: url('http://i.imgur.com/8LgIL7B.jpg') center / cover no-repeat; }

.div-two { background: url('http://i.imgur.com/fBL4WC1.jpg') center / cover no-repeat; }
```

Clip path shows a triangle of the overlaying div. The triangle is made responsive using vh and vw values:

```css
.div-two {
  clip-path: polygon(100vw 0, 0% 100vh, 100vw 100vh);
}
```

## Problems

The way view-port units are implemented on windows means that [the width of both elements might exceed the width of the viewport](https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/), resulting in a scrollbar.

To workaround this, we need to create a parent div and set the `overflow` property to `hidden`.

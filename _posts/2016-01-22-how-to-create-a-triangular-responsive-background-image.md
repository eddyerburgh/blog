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
I saw [this question](http://stackoverflow.com/questions/34008650/how-do-i-create-a-triangular-responsive-background-image) on Stack Overflow one afternoon, and bookmarked it for later. I really wanted to know how to create a fullscreen triangular responsive background image in CSS! When I checked back later no one had answered, so I took it on myself to figure out how.

A few hours later I had the answer – clip-path!

## Result

[]https://jsfiddle.net/11kn8mjn/4/](https://jsfiddle.net/11kn8mjn/4/)

## Browser Support
   
[]Support for clip-path isn’t great](http://caniuse.com/#feat=css-clip-path) – ie and Edge don’t support it at all! I’m still looking for a CSS only fall-back.

## How It’s Done
   
Two fullscreen divs with responsive background images are positioned on top of each other.

Clip mask is used to show a responsive triangle of each div.

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

Clip path shows a triangle of each div. The triangle is made responsive using vh and vw values:

```css
.div-one { 
  clip-path: polygon(0 0, 100vh 0, 100vw 0); 
} 

.div-two { 
  clip-path: polygon(100vw 0, 0% 100vh, 100vw 100vh); 
}
```

And there we have it – a fullscreen triangular responsive background image.

## Problems
   
The way view-port units are implemented on windows means that []the width of both elements might exceed the width of the viewport](https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/), resulting in a scrollbar.

To workaround this, we need to create a parent div and set the `overflow` property to `hidden`.
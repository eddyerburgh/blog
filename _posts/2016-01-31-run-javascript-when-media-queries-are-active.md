---
layout: post
status: publish
published: true
title: Run JavaScript When Media Queries are Active
description: Surefire way to run JavaScript only when CSS media queries are active. Don't let your JavaScript lag behind your CSS - bulletproof your JavaScript
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 37
wordpress_url: http://www.eddyerburgh.com/?p=37
date: '2016-01-31 07:00:35 +0000'
date_gmt: '2016-01-31 07:00:35 +0000'
categories:
- CSS
- JavaScript
- jQuery
tags:
- media queries
comments: true
---

Before I tried it, I assumed it would be easy to check the screen width with JavaScript. It's not. There are lots of methods and libraries, like <a rel="noopener" href="http://wicky.nillia.ms/enquire.js/">Enquire.js</a>, to solve this problem. I've stumbled upon a simpler solution - a surefire way to run JavaScript when media queries are active. Use CSS properties that are affected by media queries to schedule your JavaScript.

## Problems Detecting Screen Width with Javascript

There are a few different ways to check screen width with Javascript: window.innerWidth, window.outerWidth, document.body.clientWidth, screen.width etc. But <a rel="noopener" href="http://tripleodeon.com/wp-content/uploads/2011/12/table.html">the width these methods return is inconsistent</a>. What's more, the way <a rel="noopener" href="http://stackoverflow.com/questions/19291873/window-width-not-the-same-as-media-query">browsers execute media queries varies from OS to OS and device to device</a>. We need a bulletproof way of running javascript when the media query is active.

So how can we do that? Easy. We tie our JavaScript to a CSS property that is only active when a media query is active.

## Run JavaScript When Media Queries are Active Using CSS Properties

When my (min-width:700px) media query is not active, .menu-toggle will be set to display: block. Once the (min-width:700px) media rule is activated .menu-toggle will be set to display: none. So to run the code for my menu toggle, I simply check if .menu-toggle has the property display: block.

```javascript
if (jQuery('.menu-toggle').css('display') === 'block') {
    // Code to be executed
}
```

This ensures the JavaScript will only be executed when the media query is active, regardless of the actual screen width.

Easy, peazy, lemon squeezy.

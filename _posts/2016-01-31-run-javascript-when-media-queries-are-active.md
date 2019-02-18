---
layout: post
status: publish
published: true
title: Run JavaScript when media queries are active
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

Before I tried it, I assumed it would be easy to if a media query was active with JavaScript. It's not.

Although there are many DOM objects for determining screen-width, they are applied inconsistently between browsers.

But fear not, I've found a solution. A surefire way to run JavaScript when media queries are active. __Use CSS properties that are affected by media queries to schedule your JavaScript__.

## Using CSS media queries

The basic idea is to add a hidden element to the page that has different styles applied with media queries. In your JavaScript, you can check whether the style is active or not.

For example, you could add a `<div>` element:

```html
<div id="hidden-element" />
```

Hide it with CSS, and add a rule for `opacity` `0.7` inside a media query:

```css
#hidden-element {
  display: none;
}

@media only screen and (min-width: 600px)  {
  #hidden-element {
    display: none;
    opacity: 0.7;
  }
}

```

When the media query is active, `opacity` will be set to `0.7`. In your code you can use the DOM API to check whether the media query is active:

```JavaScript
const el = document.querySelector('#hidden-element')

if (window.getComputedStyle(el).opacity === '0.7') {
    // Code to be executed
}
```

This ensures the JavaScript will only be executed when the media query is active, regardless of the actual screen width.

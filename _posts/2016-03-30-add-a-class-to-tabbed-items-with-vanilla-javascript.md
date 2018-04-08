---
layout: post
status: publish
published: true
title: Add a class to tabbed items with vanilla JavaScript
description: Want to style elements when they are in focus but don't want it styled when elements are active? Copy this vanilla JS snippet to add a class to tabbed items
wordpress_id: 242
wordpress_url: http://www.eddyerburgh.com/?p=242
date: '2016-03-30 19:08:03 +0000'
date_gmt: '2016-03-30 19:08:03 +0000'
categories:
- CSS
- JavaScript
- Snippet
tags: []
comments: true
---
This snippet will add a class to elements that are selected with the tab button.

## The problem

If you set an outline to anchor tags with :focus, the style is also applied when you click the link . I only want it styled when users are tabbing through content with the keypad. To overcome this, I wrote some JavaScript that will add a class to tabbed items, and remove it with the next tab.

I couldn't find any snippet that did what I wanted, so I wrote this.

To see my solution in action, press tab.

## The code

```js
// Function to a Add Class to Tabbed Items
(function () {
  document.addEventListener('keyup', function (e) {
        // Run function to remove class of previous element
    removeClass()
        // Focussed element
    var el = document.activeElement
        // Add tabbed class to focussed element
    el.className += ' tabbed'
        // Run remove class, assing this element as previousEl
    removeClass(el)
  }, true)
  var previousEl
// Changes prevEl and removes the tabbed class
  function removeClass (e) {
    if (arguments.length === 0 && previousEl !== undefined) {
      previousEl.className = previousEl.className.replace(' tabbed', '')
    } else {
            // Assign current element as prevEl
      previousEl = e
    }
  }
})()
```

Add this code to your JS file, and then add the code below to your stylesheet.

```css
a.tabbed,
a.tabbed  {
  outline: 2px dashed #222;
}
```

This will give all links a dashed border when they are focussed. Hit tab to see it in action.

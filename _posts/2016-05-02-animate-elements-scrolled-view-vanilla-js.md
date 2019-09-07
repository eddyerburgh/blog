---
layout: post
status: publish
published: true
title: Animate elements when scrolled into view with native JavaScript
description: Learn how to animate elements when they are scrolled into view using native JavaScript.
wordpress_id: 303
wordpress_url: http://www.coding123.org/?p=303
date: '2016-05-02 22:28:27 +0000'
date_gmt: '2016-05-02 22:28:27 +0000'
categories:
- CSS
- Tutorials
tags: []
comments: true
---

In this tutorial, you'll learn how to animate elements as they are scrolled into view using native JavaScript and CSS.

*Note: this approach assumes the user has JavaScript enabled.*

There are two steps to animating on scroll:

1. Creating the CSS animation
2. Applying the animation when an element is scrolled into view

## Creating the animation

For the animation you can use the `animation` CSS property. `animation` applies an animation between CSS styles. For example, animating an element from opacity 0 to opacity 1.

The following `fade-in` animation fades an element in and makes it appear to grow:

```css
@keyframes fade-in {
    from {opacity: 0; transform: scale(.7,.7)}
    to {opacity: 1;}
}
.fade-in-element {
  animation: fade-in 1.4s;
}
```

<figure>
    <img src="/assets/2016/05/animate-on-scroll.gif" alt="" />
    <figcaption><h4>The fade-in animation applied to an element</h4></figcaption>
</figure>

All elements with the class `fade-in-element` will fade in once the page is loaded. This is great for elements that are in the viewport initially, but it means users won't see the animation for elements that aren't.

The solution is to add the class `fade-in-element` to elements as they appear in the viewport during a scroll. You can do this with JavaScript.

Before elements have the `fade-in-element` class, they will have full opacity. This will look glitchy as the element jumps from 1 to 0 opacity without a transition, so you need to set the opacity of these elements to 0:

```css
.hidden {
  opacity: 0;
}
```

You should add the `hidden` class to each element you want to animate.

The next step is to remove the `hidden` class and add a `fade-in-element` class when an element scrolls into view.

## Applying the animation

You need to apply the animation when an element is scrolled into view.

The following JavaScript calls `init` to build a NodeList (`elements`) of elements with the `hidden` class.

It then calls `checkPosition` to loop through the `elements` and calculate whether they are visible. If an element is visible, `checkPosition` removes the `hidden` class and adds the `fade-in-element` class.

The code adds `checkPosition` as a `scroll` event listener, and `init` as a `resize` event listener.

```js
(function() {
  var elements;
  var windowHeight;

  function init() {
    elements = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add('fade-in-element');
        element.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();
```

And that's how you animate elements when scrolled into view with native JS.

You can edit the animate classes to create all kinds of cool effects, give it a go!

If you have any questions, leave a comment.

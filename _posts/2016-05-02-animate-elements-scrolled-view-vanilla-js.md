---
layout: post
status: publish
published: true
title: Animate Elements When Scrolled into View with Native JS
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 303
wordpress_url: http://www.coding123.org/?p=303
date: '2016-05-02 22:28:27 +0000'
date_gmt: '2016-05-02 22:28:27 +0000'
categories:
- CSS
- Tutorials
tags: []
comments: []
---
It seems like every landing page has elements bouncing into view as you scroll down. Most people use <a href="https://daneden.github.io/animate.css/" target="newwindow">Animate.CSS</a> and <a href="http://mynameismatthieu.com/WOW/" target="newwindow">Wow.JS</a> to achieve the effect. In this tutorial we'll learn how to animate elements when scrolled into view with native JS and a bit of CSS.

<img class="aligncenter wp-image-305 size-full" src="http://ec2-52-42-182-165.us-west-2.compute.amazonaws.com/blog/wp-content/uploads/2016/05/ezgif.com-video-to-gif.gif" alt="Animate on scroll with vanilla JS" width="960" height="347" />

## The Problem

There are two steps to animating on scroll:

1. Create the animation with CSS
2. Apply the animation when the element is scrolled into view

## The CSS

For the CSS we use the <a href="https://developer.mozilla.org/en/docs/Web/CSS/animation" target="newwindow">animation property</a>. This property allows us to animate properties of an element. For example, animating a div from opacity 0 to opacity 1. With the animation property this will transition smoothly from opacity 0 to 1, giving the appearance of fading in.

<a href="http://ec2-52-42-182-165.us-west-2.compute.amazonaws.com/blog/wp-content/uploads/2016/05/ezgif.com-crop.gif"><img class="aligncenter size-full wp-image-310" src="http://ec2-52-42-182-165.us-west-2.compute.amazonaws.com/blog/wp-content/uploads/2016/05/ezgif.com-crop.gif" alt="Fade in with CSS animation" width="638" height="268" /></a>

For our example, let's look at fading the element in and making it appear to grow.

```css
@keyframes fade-in {
    from {opacity: 0; transform: scale(.7,.7)}
    to {opacity: 1;}
}
.fade-in-element {
  animation: fade-in 1.4s;
}
```

First, we declare an animation called *fade-in*. This will animate the element it is applied to from opacity 0 and a scale of 0.7 to opacity 1 and a scale of 1.

We then assign this animation to the element *fade-in-element*. Now the element will fade in once the document's opened. This is great for anything <a href="http://www.webvanta.com/post/2014-07-06/responsive-design-above-the-fold" target="newwindow">above the fold</a>, but everything that isn't on screen when the page loads will also animate instantly.

What we need to do is add the class *fade-in-element* to the elements as they scroll into view. The problem with this is that before they are given the class they will have full opacity. This will look glitchy as the element jumps from 1 to 0 opacity without a transition, so we're going to add an extra class to these elements.

```css
.hidden {
  opacity: 0;
}
```

Now we can add the class *hidden* to each element we wish to animate. This means the element's opacity starts off at 0.

Now we'll need to replace the *hidden* class with the *fade-in* class as the element appears on screen.

## The JavaScript

```js
var animateHTML = function() {
  var elems,
      windowHeight
  var init = function() {
    elems = document.getElementsByClassName( "hidden" );
    windowHeight = window.innerHeight;
    _addEventHandlers();
  }
  var _addEventHandlers = function() {
      window.addEventListener( "scroll", _checkPosition );
      window.addEventListener( "resize", init )
  }
  var _checkPosition = function() {
    for ( var i = 0; i < elems.length; i++ ) {
      var posFromTop = elems[i].getBoundingClientRect().top;
      if ( posFromTop - windowHeight <= 0 ) {
        elems[i].className = elems[i].className.replace( "hidden", "fade-in-element" );
      }
    }
  }
  return {
    init: init
  }
}
animateHTML().init();
```

What this code is doing :

1. Getting every element that has the class `hidden`
2. Running a function when the window is scrolled</li>
3. Inside the function, calculating the height relative to the viewport
4. If the element is inside the viewport, add the class `fading-in`

Each time the page is scrolled, _checkPosition runs for every element with the class name `hidden`. It checks whether it's position from the viewport minus the window height is less than or equal to zero. If it is, the element will be in view and the classname is replaced by *fade-in-element*, which will animate the element.

And that's how you animate elements when scrolled into view with native JS.

You can edit the animate classes to create all kinds of cool effects, give it a go!

Any questions, leave a comment.

---
layout: post
status: publish
published: true
title: Jazz Up Your Code Blocks with Copy on Click!
description: Add copy on click functionality to your code blocks to easily copy code. This tutorial provides the code and walks you through what is happening.
wordpress_id: 169
wordpress_url: http://www.eddyerburgh.com/?p=169
date: '2016-03-21 13:40:36 +0000'
date_gmt: '2016-03-21 13:40:36 +0000'
categories:
- CSS
- JavaScript
- Tutorials
tags: []
comments: []
---

In this tutorial, we'll add copy on click functionality to all code blocks on a page.

[caption id="attachment_184" align="aligncenter" width="300"]<a href="/assets/2016/03/clicktocopy.png" rel="attachment wp-att-184"><img class="wp-image-184 size-medium" src="http://www.eddyerburgh.com/wp-content/uploads/2016/03/clicktocopy-300x92.png" alt="copy on click tooltip" width="300" height="92" /></a> What we're making[/caption]

Click the code block below to see it in action.

### The Code

Copy and paste this code to add copy on click functionality to your site.

### Javascript

Include this on any page you want to add the copy on click functionality

```js
( function(){
 // Cache Dom
 var code = document.getElementsByTagName( 'code' );
 var success = document.getElementById( 'success' );
 var failure = document.getElementById( 'failure' );
 // Declare variable for function to be assigned to
 var copyOnClick;
 // Run function if
<pre> exists
 if ( code.length ) {
 // Assign function to variable to ensure function only called on pages with
<pre> tags
 copyOnClick = function() {
 for ( var i = 0; i < code.length; i++ ) {
 code[i].onclick = copyToClipboard;
 }
 function copyToClipboard() {
 // Create Range to select text that is normally unselectable
 var range = document.createRange();
 range.selectNode(this);
 window.getSelection().addRange(range);
 try {
 // Now that we've selected the anchor text, execute the copy command
 var successful = document.execCommand('copy');
 successful ? worked() : failure();
 } catch(err) {
 failure();
 }
 function worked () {
 window.getSelection().removeAllRanges();
 success.className += ' show';
 setTimeout( function(){ success.className = success.className.replace( ' show', '' ); }, 500);
 }
 function failure() {
 window.getSelection().removeAllRanges();
 failure.className += ' show';
 setTimeout( function(){ failure.className =failure.className.replace( ' show', '' ); }, 500);
 }
 }
 };
 copyOnClick();
 }
} )();
```
### HTML

Paste this somewhere in your HTML. Mine is in header.php

```html
<div id="success" class="overlay">
<h2 class="overlay-message">Copied to Clipboard!</div>
<div id="failure" class="overlay">
<h2 class="overlay-message">Failed to Copy :(, update your browser or stop using Safari!</div>
```

### CSS

Paste this into your stylesheet.

It styles the "click to copy" box the same as this site, and the success message with a white background and black text.Customize the CSS to suit the look of your site.

**Note**: You need to add prefixes for browser support. I suggest using <a href="https://github.com/nDmitry/grunt-postcss">postcss</a> with grunt.

```css
code {
  position: relative;
}
code:hover:before {
  content: 'Click to Copy!';
  background: #fff000;
  color: #000;
  position: absolute;
  padding: 1em;
  font-family: sans-serif;
  font-weight: 700;
  transform: translate(-50%, -100%);
  top: -10px;
  left: 50%;
}
code:hover:after {
  content: '';
  position: absolute;
  border: 15px solid transparent;
  border-top-color: $tertiary-color;
  transform: translatex(-50%);
  top: -10px;
  left: 50%;
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  display: none;
}
.overlay.show {
  display: block;
  z-index: 9999;
}
.overlay-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background: #fff;
  color: #000;
  padding: 2em;
  text-align: center;
}
```

## What's Happening


That was  a lot of code. If you pasted it into the correct places your site will have copy on click functionality on every *<code>* block. You might want to customize this code to suit your needs, so let's have a look at what's actually happening.

### Javascript

The copy on click code is explained <a href="/javascript/use-javascript-to-copy-to-clipboard/">in this previous article</a>. So we'll just look at the code that isn't explained there :

```js
( function(){
	// Cache Dom
	var code = document.getElementsByTagName( 'code' );
	// Declare variable for function to be assigned to
	var copyOnClick;
	// Run function if code exists
	if ( code.length ) {
		// Assign function to variable to ensure function only called on pages with code tags
		copyOnClick = function() {
		};
		copyOnClick();
	}
} )();
```

The code is wrapped in <a href="http://markdalgleish.com/2011/03/self-executing-anonymous-functions/">a self executing anonymous function</a>. This is used to avoid polluting the global namespace.

We don't want to run this code on pages where it isn't needed. This means we need to check if any *<code>* tags exist on the page. First we create an array, called *code*, that contains every *<code>* block on the page.

You might have noticed we declare a variable without assigning any value to it. This is to avoid the problem of <a href="http://www.w3schools.com/js/js_hoisting.asp">hoisting</a>. If we stuck the function inside the if statement the function would be hoisted to the top of the anonymous function and run whether *<code>* tags exists or not. To avoid this we declare a variable and then assign a function inside the if statement. Since assignments are not hoisted, we can then run the function without a problem.

So, first we declare the variable copyOnClick, which will be assigned a function if code.length is more than 0.

Then we check code.length. Since code.length will return true if the array exists there is no need to include *> 0*.

If there are no code blocks code.length returns false, nothing will happen.

If there are code blocks, copyOnClick will be assigned a function. This is the meat and bones function that does the copy on click, read <a href="/javascript/use-javascript-to-copy-to-clipboard/">this previous article</a> for an explanation.

And that's the Javascript, any questions leave a comment or contact me <a class="DashboardProfileCard-screennameLink u-linkComplex u-linkClean" href="https://twitter.com/EddYerburgh">@<span class="u-linkComplex-target">EddYerburgh</span></a>.

### HTML

Phew, that was a lot of JavaScript code. Luckily this HTML is a lot simpler!

```html
<div id="success" class="overlay">
## Copied to Clipboard!</div>
<div id="failure" class="overlay">
## Failed to Copy :(, update your browser or stop using Safari!</div>
```

All we're doing here is creating the elements to be shown on either success or failure of the copy to clipboard. Edit the message to your liking.

It doesn't matter where in your document you place this, as long as it is between the <body> tags. Mine is in my header.php to avoid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context">stacking issues</a>, but sticking it in your footer.php is probably more semantic.

### CSS

There are two elements we're styling here:

1. A tooltip that appears on hover to let users know they can copy the code on click
2. The success/ failure messages

####The Tooltip

```css
code {
  position: relative;
}
code:hover:before {
  content: 'Click to Copy!';
  background: #fff000;
  color: #000;
  position: absolute;
  padding: 1em;
  font-family: sans-serif;
  font-weight: 700;
  transform: translate(-50%, -100%);
  top: -10px;
  left: 50%;
}
code:hover:after {
  content: '';
  position: absolute;
  border: 15px solid transparent;
  border-top-color: $tertiary-color;
  transform: translatex(-50%);
  top: -10px;
  left: 50%;
}
```

We use the pseudo element *:before* to add the actual content. This is then styled with colors, padding and a font-family, since pseudo elements inherit their styles from their parent element and monospace doesn't look aprticuarly nice outside *<code>* blocks.

The `:before` element is positioned absolutely. This is why we need *<code>* to be positioned relative, so that the :before element is positioned relative to the *<code>* block. We center it horizontally using *left: 50%* and *transform : translatex(-50%)*, be warned: **<a href="http://caniuse.com/#feat=transforms2d">you need to include browser prefixes for translate to work on android devices</a>**. We then move it 10px above the *<code>* block, which will allow us to add the triangle shape below.

The `:after` element is just a <a href="https://css-tricks.com/snippets/css/css-triangle/">CSS triangle</a>, and is purely for style.

####The Success/ Failure Messages

Here we create a base overlay with overlay-message positioned in the center.

We also add the properties that display the overlay when the *show* class is added via JavaScript.

You'll probably just want to change the background and color of .overlay-message.

```css
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  display: none;
}
.overlay.show {
  display: block;
  z-index: 9999;
}
.overlay-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background: #fff;
  color: #000;
  padding: 2em;
  text-align: center;
}
```

The overlay is stretched across the entire window by giving it fixed position and 100% width and height.

To show the overlay, we add the class *show* using JS. I've given it z-index: 9999 so it should appear in front any other content.

overlay-message is centered vertically and horizontally with the <a href="https://css-tricks.com/centering-percentage-widthheight-elements/">transform translate trick</a>.

## Browser Support

With an autoprefixer, the CSS is supported by all major browsers.

execCommand( 'copy' ) is supported by ie9+, modern versions of Chrome, Firefox and Opera. It's not supported in Safari.

## Notes

You need to add browser prefixes to the CSS for full support.

This won't work on mobiles/ tablets. It would be a good idea to wrap the CSS in a media query and use that CSS to <a href="/css/run-javascript-when-media-queries-are-active/">only run the Javascript when the media query is active</a>.

## That's All Folks!

If you've got any suggestions/ need help with the code please comment or tweet me <a class="DashboardProfileCard-screennameLink u-linkComplex u-linkClean" href="https://twitter.com/EddYerburgh">@<span class="u-linkComplex-target">EddYerburgh</span></a>

Happy coding!


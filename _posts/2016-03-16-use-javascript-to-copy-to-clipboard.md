---
layout: post
status: publish
published: true
title: Use Javascript to Copy to Clipboard
description: Learn how to copy to clipboard using vanilla JavaScript. This quick snippet shows you how to copy any text from the DOM to your clipboard
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 142
wordpress_url: http://www.eddyerburgh.com/?p=142
date: '2016-03-16 16:37:09 +0000'
date_gmt: '2016-03-16 16:37:09 +0000'
categories:
- JavaScript
tags:
- copy to clipboard
- vanilla javascript
comments: []
---
In the not too distant past you'd need to use Flash (yuck) to allow the user to copy to clipboard in one click. Thankfully we don't live in the past. Today, with the exception of Safari, all modern browsers let you use JavaScript to copy to clipboard with one easy method.

## The Code

```js
var elemToCopy = document.getElementById( 'elem-to-copy' );
// Bind Event
elemToCopy.onclick = copyText;
function copyText() {
  this.select()
  try {
    // Now that we've selected the text, execute the copy command
    var successful = document.execCommand('copy');
    successful ? console.log("success") : console.log("didn't work")
  } catch(err) {
    alert('Unable to copy, update your browser');
  }
}
```

Use this code to copy from an input or textarea. Replace 'elem-to-copy' with the id of the element you wish to copy. If you want to dynamically copy all instances of a textfield, use the code below. If you want to copy from a non text-field element, click <a rel="noopener" href="#copy-from-non-textfield">here</a>.

```js
var elemsToCopy = document.getElementsByClassName( 'elem-to-copy' );
for ( var i = 0; i < elemsToCopy.length; i++ ) {
  elemsToCopy[i].onclick = copyText;
}
// Bind Event
function copyText() {
  this.select()
  try {
    // Now that we've selected the text, execute the copy command
    var successful = document.execCommand('copy');
    successful ? console.log("success") : console.log("didn't work")
  } catch(err) {
    alert('Unable to copy, update your browser');
  }
}
```

## What's Happening

There are four steps to this function: bind the element, select the text, copy the text and record the success/failure of the copy.

### Bind the Element

First we assign the copyText function to fire when your element is clicked.

### Select the Text

When the element is clicked, we select, or highlight the elements text with the <a rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select">select() method</a>. The text content needs to be highlighted in order to be copied in the next step.

### Copy the Text

This is easy with the<a rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand"> execCommand() function</a>. We simply pass 'copy' as a parameter and the browser will copy any highlighted text.

### Record the Success/ Failure of the Copy

We want to know if it was successful or not! IE9- and Safari don't support execCommand. It's also nice to fire a function on successful copy to indicate to the user that the copy was successful, as seen on <a rel="noopener" href="https://flatuicolors.com/">flatuicolors.com</a>.

## <a rel="noopener" name="copy-from-non-textfield"></a>Copy From a Non text-field Element

The select() method only works on textfields, so we have to go about it a bit differently if we want to copy text container in a paragraph, for example.

```js
var elemsToCopy = document.getElementsByTagName( 'p' );
for ( var i = 0; i < elemsToCopy.length; i++ ) {
  elemsToCopy[i].onclick = copyText;
}
// Bind Event
function copyText() {
  	// Create Range to select text that is normally unselectable
	var range = document.createRange();
	range.selectNode(this);
	window.getSelection().addRange(range);
  try {
    // Now that we've selected the text, execute the copy command
    var successful = document.execCommand('copy');
    successful ? console.log("success") : console.log("didn't work")
  } catch(err) {
    alert('Unable to copy, update your browser');
  }
}
```

This code copies text from any element. Instead of using select() we create a <a rel="noopener" href="https://developer.mozilla.org/en/docs/Web/API/Range">range</a> that includes our target element. We then use the selectNode() method to select the content of the paragraph tag. Easy.

---
layout: post
status: publish
published: true
title: Use JavaScript to copy to clipboard
description: Learn how to copy to clipboard using vanilla JavaScript. This quick snippet shows you how to copy any text to the clipboard
date: '2016-03-16 16:37:09 +0000'
comments: true
---

In this post you'll learn how to copy to the clipboard with `document.execCommand`.

`document.execCommand` runs commands, like `cut` and `copy`, that manipulate the current editable region, such as `<input>` elements.

You can copy _currently selected_ text with the `copy` command:

```js
document.execCommand('copy')
```

I'll show you how to copy text from an input element, then I'll show you how to copy arbitrary values.

## Copying text from `<input>` elements

The easiest way to copy text is from a visible `<input>` element.

You can select text in an `<input>` element with the `select` method. For example, with the following HTML:

```html
<input type="text" />
```

You could set the value of the element, select the text, and copy it with `execCommand`:

```js
const input = document.querySelector('input')
input.value = 'Text to copy'
input.select()
document.execCommand('copy')
```

## Copying a value

Rather than using an existing `<input>` element, you can use DOM APIs to select and copy an arbitrary value.

The steps to copy a value are:

1. Add an element to the document
2. Set the element `textContent`
3. Select the element
4. Call `document.execCommand` to copy the value.

You can select text in an element with the [`Range`](https://developer.mozilla.org/en-US/docs/Web/API/Range) API and [`getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection) method.

The following code copies a value to the clipboard:

```js
const el = document.createElement('span')

el.textContent = 'Text to copy'

// styles to prevent scrolling to the end of the page
el.style.position = 'fixed'
el.style.top = 0
el.style.clip = 'rect(0, 0, 0, 0)'

document.body.appendChild(el)

// select the element by creating a range
const range = document.createRange()
range.selectNode(el)
const selection = document.getSelection()
selection.addRange(range)

document.execCommand('copy')
```

_Note: There are a few more styles you should set to make sure your code is bullet-proof. Take a look at [the copy-to-clipboard source code](https://github.com/sudodoki/copy-to-clipboard/blob/v3.0.8/index.js#L23), which I based the example code on._

Thanks for reading. If you have any questions, please leave a comment.

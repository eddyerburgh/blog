---
layout: post
status: publish
published: true
title: Create a pure CSS flip toggle switch
description: Learn how to create a pure CSS flip toggle switch.
date: "2016-02-26 13:33:58 +0000"
comments: true
---

In this tutorial you'll learn how to style a CSS only flip toggle switch, like the one below:

<style>
#toggle {
  /* can still be read by screen readers */
  opacity: 0;
  position: absolute;
}

#label {
  display: inline-block;
  background: #2c3e50;
  width: 10em;
  height: 5em;
  border-radius: 5em;
  position: relative;
  cursor: pointer;
  background: #2c3e50;
  margin-bottom: 1em;
}

#switch {
  position: absolute;
  width: 4.8em;
  height: 4.8em;
  margin-top: 0.1em;
  margin-left: 0.1em;
  border-radius: 100%;
  background: #c0392b;
  box-shadow: 5px 0px 28px -9px rgba(0, 0, 0, 0.75);
  transition: transform 0.2s ease-in;
}

#toggle:checked ~ #label #switch {
  background: #2ecc71;
  transform: translatex(5em);
  transition: transform 0.2s ease-in;
}
</style>

<div>
  <input id="toggle" type="checkbox" />
  <label id="label" for="toggle">
    <span id="switch"></span>
  </label>
</div>

_Note: This pure CSS approach is just for fun and not suitable for production_

## How to style checkboxes

It's normally best to rely on native browser styling for checkboxes. But for fun, I'll show you how to create a toggle button effect with pure CSS.

The basic idea is you hide an `<input>` with `type` `checkbox` and style a `<label>` element instead. You can associate a `<label>` element with an `<input>`, so that clicking the `<label>` updates the checkedness state of the associated `<input>`.

You can then use the `:checked` pseudo-class selector to style the `<label>` depending on the `<input>` checkedness state.

First, create the HTML:

```html
<input id="toggle" type="checkbox" />
<label id="label" for="toggle">
  <span id="switch"></span>
</label>
```

Then add the CSS to style the checkbox:

```css
#toggle {
  /* opacity 0 so that it can be read by screen readers */
  opacity: 0;
}

#label {
  display: inline-block;
  background: #2c3e50;
  width: 2em;
  height: 1em;
  border-radius: 0.5em;
  position: relative;
  cursor: pointer;
  background: #2c3e50;
}

#switch {
  position: absolute;
  width: 0.9em;
  height: 0.9em;
  margin-top: 0.05em;
  margin-left: 0.05em;
  border-radius: 1em;
  background: #c0392b;
  box-shadow: 5px 0px 28px -9px rgba(0, 0, 0, 0.75);
  transition: transform 0.2s ease-in;
}

#toggle:checked ~ #label #switch {
  background: #2ecc71;
  transform: translatex(1em);
  transition: transform 0.2s ease-in;
}
```

The problem with this approach is that you can't hide the `<input>` with `display` `none` or `hidden`, because the element will become invisible to screen readers. This causes an issue where toggling the button sometimes selects the area around the `<input>`.

Because of this problem, most CSS frameworks now rely on native styling for tricky `<input>` elements. They decided that accessibility comes before design—and so should you.

I hope you learned something from this article.

If you have any questions, please leave a comment.

---
layout: post
status: publish
published: true
title: Create Dynamic IDs in a Loop with Pug/ Jade
description: Create Dynamic IDs in a loop using Pug. This tutorial shows you how to use Pug to create dynamic ids for DOM elements
wordpress_id: 236
wordpress_url: http://www.eddyerburgh.com/?p=236
date: '2016-03-30 15:36:29 +0000'
date_gmt: '2016-03-30 15:36:29 +0000'
categories:
- Jade
- Tutorials
tags: []
comments: []
---

<a rel="noopener" href="http://jade-lang.com/tutorial/">Pug</a> (previously known as Jade)  is a template engine built for node. In this tutorial I am going to show you how to create dynamic IDs in a loop with Pug.

## Create Dynamic IDs with a Loop

```pug
- for ( i=1; i <= 4 ; i++ )
  div( id="div" + i )
```

This will compile to:
```html
<div id="div1"></div>
<div id="div2"></div>
<div id="div3"></div>
<div id="div4"></div>
```

Easy, huh?

What we're doing here is adding inline JavaScript to loop from 1 through 4 and output each iteration with an id. We tell Jade we are using inline JavaScript by using the hyphen (-) sign. This stops Jade from *buffering* the JavaScript. Buffering is the process of sending text to the Buffer to be parsed by Pug, but don't worry too much about that. All you need to know is that

```pug
- var abc = ["a,b,c"]
- var cde = ["c,d,e"]
- abc
= cde
```

Will output

```c,d,e```

Because `=` tells pug to buffer the JavaScript, whereas `-` tells it NOT to buffer.

Although the JavaScript is not buffered, it is still evaluated, allowing us to declare variables, loop over arrays and pretty much anything we can think of with JavaScript( except interact with the DOM!). This is the strength of Jade over a logic less templating engine like HandleBars or Mustache. Anyway.

## Create Dynamic IDs with an Array

Say we wanted more descriptive IDs. We could write this :

```pug
div( id="about" )
div( id="portfolio" )
div( id="contact" )
```

And that's fine for a small amount of divs. But if we need 50 or 100 divs with their own unique IDs. We'd be writing a lot of div( id="") and that's not DRY. Let's use an array and a loop to write cleaner and more manageable code :
```pug
- var arr = ["about", "portfolio", "contact"]
- each val in arr
  div( id=val )
```

Now if we want to add an extra div with the id *experience* all we do is add an extra element to the array. What we're doing is looping through each element in the array and using the current element as a value for the id.

Maybe we need a unique numerical attribute for some reason. We can easily modify the above code to do this.

```pug
- var arr = ["about", "portfolio", "contact"]
- each val, i in arr
  div( id=val attr=i )
```

And that's how to create dynamic IDs in a loop with Pug.

Any questions, leave a comment.

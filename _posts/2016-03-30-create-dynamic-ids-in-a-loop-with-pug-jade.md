---
layout: post
status: publish
published: true
title: Create dynamic ids in a loop with Pug/ Jade
description: Create dynamic ids in a loop using Pug. This tutorial shows you how to use Pug to create dynamic ids for DOM elements
date: '2016-03-30 15:36:29 +0000'
comments: true
---

Pug is a template engine built for Node. In this article I'll show you how to create dynamic ids in a loop with Pug.

You can create dynamic ids using a JavaScript `for` loop in your template (with unbuffered JavaScript denoted by `-`):

```pug
- for ( i=1; i <= 4 ; i++ )
  div( id="div" + i )
```

Which compiles to:

```html
<div id="div1"></div>
<div id="div2"></div>
<div id="div3"></div>
<div id="div4"></div>
```

You can also loop through an array:

```pug
- const arr = ["about", "portfolio", "contact"]
  each val in arr
    div( id=val )
```

And use the item index:

```pug
- var arr = ["about", "portfolio", "contact"]
  each val, i in arr
    div( id=val attr=i )
```

That's all there is to creating dynamic ids in a loop. Any questions, leave a comment.

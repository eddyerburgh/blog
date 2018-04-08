---
layout: post
status: publish
published: true
title: Templating with Vanilla JS
description: It's easy to do templating with Vanilla JS. In this tutorial I will show you how, no need to load Handlbars.js every time you need to template JavaScript.
wordpress_id: 269
wordpress_url: http://www.coding123.org/?p=269
date: '2016-04-20 12:31:36 +0000'
date_gmt: '2016-04-20 12:31:36 +0000'
categories:
- JavaScript
- Tutorials
tags: []
comments: true
---

There's a great article by <a rel="noopener" href="http://codoki.com/2015/09/01/native-JavaScript-templating/">CD Media</a> that explains how to do templating with vanilla JS. In this tutorial we will expand on CD Media's example to include some basic features, including conditionals and changing the src of an image.

Note: this tutorial assumes you have a basic understanding of what a templating language is.

## The problem

Common templating languages like <a rel="noopener" href="http://handlebarsjs.com/">Handlebars.js</a> are great, but it's another HTTP request. At 70KB (v 4.0.5) it'd be good to template without loading a library. That's why we're going to look at templating with vanilla js!

## The theory

Like most templating languages, this trick makes use of <code><script type="text/template"></code>. Content inside the tag is initially ignored by the browser, but can be accessed after rendering with the ID. This means we can put a template of our HTML to be used by JavaScript to render HTML on the page using content supplied in the JS file.

So inside this script tag we add the basic HTML structure of the element we are templating. This will be used by the JavaScript as a template to fill with the content.

In our JavaScript, we have an array of objects containing the data to use. We create an anchor that holds all of our HTML and is appended to the DOM after the loop has finished. This avoids unnecessary <a rel="noopener" href="https://developers.google.com/speed/articles/reflow">browser reflow</a> by only interacting with the document once.

So we have an element that will hold all our HTML, now let's generate the HTML. To do this we loop through each object, and on each loop create an element that includes the html contained inside the script tag. If our script tag includes `<p class="data"></p>`, the element created in the loop will be `<p class="data"></p>`. Let's call this our object-element.

We use this object-element to add the data. So if our first loop gives us the object <code>{"data":"example"}</code>, we can add text to the object element by selecting the element by class name and appending our data as a child node. Now our object-element will contain the correct text and can be appended to our anchor.

We then go onto the next object in the array and repeat the process. When the loop is finished, we append the anchor, which contains all of our manipulated object-elements, to the DOM.

Let's look at the code.

## The code

### JavaScript

```js
// Array of objects to pass to template
var people = [
    { 'name': 'Ted', 'age': '34', 'image': 'http://example1.jpg', 'favorite': 'yes' },
    { 'name': 'Marshall', 'age': '35', 'image': 'http://example2.jpg' },
    { 'name': 'Barney', 'age': '34', 'image': 'http://example3.jpg' }
]
// The template script HTML content
var template = document.getElementById('my-template').innerHTML
var anchor = document.createElement('span')
// Loop through each object in the people array and create an
// element based on #my-template HTML
people.forEach(function (person) {
    // Create element containing the HTML included in #my-template
  var el = document.createElement('div')
  el.innerHTML = template
  console.log(el)
    // Add content to elements idefntified by class name
  el.getElementsByClassName('name')[0].appendChild(document.createTextNode(person.name))
  el.getElementsByClassName('age')[0].appendChild(document.createTextNode(person.name))
    // Add src to image
  el.getElementsByClassName('image')[0].setAttribute('src', person.image)
    // Adds value if a property exists and removes the parent p tag that
    // if the property does not exist.
  if (person.favorite) {
    el.getElementsByClassName('yes')[0].appendChild(document.createTextNode(person.favorite))
  } else {
    el.getElementsByClassName('favorite')[0].remove()
  }
    // Add element to anchor, to be rendered when loop has finished
    // This is used to avoid unnecesary document reflow
  anchor.appendChild(el)
})
// Add anchor to DOM
document.getElementById('list').appendChild(anchor)
```

### HTML
<pre class=""><code class="html"><!-- the element we append to -->
<div id="list"></div>
  <!-- The template -->
  <script id="my-template" type="x-template">
<div>
      <img class="image ">
<h2 class="name">
Age: <span class="age"></span>
<p class="favorite">Favorite: <span class="yes"></span>
    </div>
  </script>
  <!-- End of template -->
```

This code does basic templating with vanilla js. Once you've got your head around the basic theory, there's no limit to what you can do in native JavaScript.

## Problems

This works great for small projects, even if the element you're templating is quite big. But there are a few disadvantages to using this over a traditional templating language.

A major problem is CPU usage. <a rel="noopener" href="http://code.google.com/speed/articles/reflow.html">Manipulating the DOM is expensive</a> and this code doesn't reuse DOM structure, so running the template multiple times results in a lot of rerendering.

If you had a really large element to template, this vanilla alternative will become very complex. It requires you to hardcode a lot more than you do with Handlebars.js.

Another advantage of Handlebars.js is that it's universal. For the user, this means it'll probably be cached on their computer. For the developer, this means they will quickly be able to understand what's happening in your code.

It's up to you to decide if it's appropriate to use this method or not.

Happy coding everybody, as usual leave a comment if you have any questions!

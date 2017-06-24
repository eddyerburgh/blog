---
layout: post
status: publish
published: true
title: Validate an RGB or RGBA Value in JavaScript
description: Validate an RGB or RGBA value in JavaScript using regex! Grab this simple function and pass it your value to check whether it is a valid rgb/a value.
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 117
wordpress_url: http://www.eddyerburgh.com/?p=117
date: '2016-03-04 14:22:46 +0000'
date_gmt: '2016-03-04 14:22:46 +0000'
categories:
- JavaScript
- Tutorials
tags: []
comments: true
---

I couldn't find any copy pasta for this problem so I had a look myself. Turns out it's easy to validate an RGB or RGBA Value in JavaScript using <a rel="noopener" href="http://www.regular-expressions.info/tutorial.html" target="_blank">regEx</a>.

## The code

```javascript
function checkRgb(rgb) {
    var rxValidRgb = /([R][G][B][A]?[(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9]{1})|(1\.0)|(1)))?[)])/i;
    if (rxValidRgb.test(rgb)) {
      return true;
    }
}
```

Add this function to your code and call it with the color you are testing as a parameter.  If the value is a valid rgb the function will return true.

## What's Happening

We're testing the value passed to the function using a regular expression (regEx). This is done with the <a rel="noopener" href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" target="_blank">test() </a>method.

## regEx

RegEx is an expression that defines a search pattern. In other words, it is a string of characters that sets out what it is looking for. For example :* /[regex]/i* will match with regex. Explaining all the ins and outs of regex is beyond the scope of this post (learn about it <a rel="noopener" href="http://www.zytrax.com/tech/web/regex.htm" target="_blank">here</a>), but I will explain what is going on in this particular regEx.
Let's look at that example again - */[regex]/i* . The / / defines the start and end of the expression. The *i* at the end of the expression is a *pattern modifier, *this changes the search parameters and is applied to the entire expression. In this case, it makes our expression case INsensitive (i.e. it doesn't matter whether it's upper or lowercase).
Back to our expression, first we need to match rgb/a.
`[R][G][B][A]?[(]`

This will match both *RGB(* and *RGBA(* .Can you guess what the question mark does? It requires either 0 or 1 of the assigned character set be matched. In this case it is the A.

What if someone searches *rgb(* ? Remember the pattern modifier from earlier that made the expression case insensitive ? It's applied to this expression too.

So far our expression will return true for* rgb(*, *RGBA(*,* rgba(* , and any combination of those characters in upper and lower case. Great. Now for the numbers!

Numbers aren't as easy as you'd think in regEx. This is our expression for any number between 0 and 255:

```([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])```

So what's going on here? We actually have three separate expressions, separated by the *OR *(*|*) operator.

`[01]?[0-9]?[0-9]`

This checks for any number between 0 and 199.
`2[0-4][0-9]`

This checks for any number from 200-249
`25[0-5]`
And finally we check from 250-255

Great! We have our expression for* rgb(* and for numbers from 0 to 255. The only thing left is to add some commas, repeat our number expression, add a closing bracket and add the i pattern modifier.

Since any amount of whitespace within an rgb expression is valid, we need to specify our expression accordingly. This is easy using the * quantifier. The * quantifier is similar to the ? quantifier, except that it accepts 0 or more of the specified character. In our expression, this is the /s character class, whcih represents any form of whitespace :

<pre>\s*,\s*</pre>

In regEx speak, this means 'any amount of whitespace, followed by a comma, followed by any amount of whitespace'.

So now we can combine our first expression with our number and comma expressions :

`[R][G][B][A]?[(]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])`

Nearly there! We just need to add the closing bracket, with [)] and definne the start and end of the expression with //

`/[R][G][B][A]?[(]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])[)]/`

Finally, add the pattern modifier to let rgb be uppercase or lowercase:

`/[R][G][B][A]?[(]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])[)]/i`

Woop! We've done it. We've created a regex expression to validate an RGB or RGBA value in JavaScript. Give yourself a pat on the back :)

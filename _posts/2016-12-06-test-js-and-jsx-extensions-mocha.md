---
layout: post
status: publish
published: true
title: Test .js and .jsx Extensions with Mocha
description: Out the box .jsx extensions are ignored by mocha. In this short snippet I'll show you how to test .js and .jsx extensions with mocha.
wordpress_id: 388
wordpress_url: http://www.coding123.org/?p=388
date: '2016-12-06 17:17:09 +0000'
date_gmt: '2016-12-06 17:17:09 +0000'
categories:
- JavaScript
- Snippet
tags: []
comments: true
---
Out the box, mocha only reads test files with a .js extension. What if you need to test `.js` AND `.jsx` extensions with mocha?

## The solution

You need to compile jsx. If you're using babel, install `babel-register`:
`npm i -D babel-register`

Tell mocha to compile js and jsx files with babel-register:

```shell
mocha test/**/*.js* --compilers js:babel-register,jsx:babel-register
```

Your full command will look something like this:

```shell
mocha test/unit --recursive --compilers js:babel-register,jsx:babel-register
```

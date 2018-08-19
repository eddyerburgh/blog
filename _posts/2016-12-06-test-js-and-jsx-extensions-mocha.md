---
layout: post
status: publish
published: true
title: Test .js and .jsx extensions with mocha
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
Out the box, mocha only runs files with a `.js` extension.

If you want to run files with a `.jsx` extension, you can use regex:

```shell
mocha 'test/**/*.{js,jsx}'
```

You probably need to compile JSX. If you're using babel, install `babel-register`:

`npm i -D babel-register`

Tell mocha to compile `.js` and `.jsx` files with `babel-register` and the mocha `require` option:

```shell
mocha 'test/**/*.{js,jsx}' --require js:babel-register,jsx:babel-register
```

Your full command will look something like this:

```shell
mocha 'test/**/*.{js,jsx}' --recursive --require js:babel-register,jsx:babel-register
```

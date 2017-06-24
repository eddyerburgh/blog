---
layout: post
status: publish
published: true
title: 'Fix docker-compose ImportError: cannot import name _thread'
description: 'Learn how to Fix docker-compose ImportError: cannot import name _thread. This error is frustrating - but it has an easy fix.'
wordpress_id: 378
wordpress_url: http://www.coding123.org/?p=378
date: '2016-11-05 09:54:59 +0000'
date_gmt: '2016-11-05 09:54:59 +0000'
categories:
- Python
- Snippet
tags: []
comments: true
---

In this snippet I'll show you how to Fix `docker-compose ImportError: cannot import name _thread`.

I had this error recently after I installed docker-compose with <a rel="noopener" href="https://en.wikipedia.org/wiki/Pip_(package_manager)" target="_blank">pip</a>.

## The problem

<a rel="noopener" href="https://pypi.python.org/pypi/six" target="_blank">Six</a> has been installed incorrectly, or is outdated.

## The Solution

```shell
brew reinstall python

pip install -I six
pip install -I docker-compose</code>
```

The `-I` is shorthand for `--ignore-installed`. It tells pip to ignore the packages and install them again in the same folder. This has the result of reinstalling the packages.

And that's how you fix `docker-compose ImportError: cannot import name _thread`

---
layout: post
status: publish
title: Stub $route in Vue unit tests
description: Learn how to stub the $route in Vue unit tests. This tutorial walks through 4 ways of stubbing the vue-router $route object.
disqus_id: 498
categories:
- Tutorials
- Vue
tags: []
comments: true
---

In this article I'll show you four ways to stub `$route` in Vue unit tests. One naive approach, one enlightened, and one using <a href="https://github.com/vuejs/vue-test-utils" target="_blank" rel="noopener">Vue Test Utils</a>.

*Note: We won't explore basic unit testing concepts. If you aren't familiar with unit testing Vue components, check out <a rel="noopener" href="{% post_url 2017-02-02-unit-test-vue-components %}" target="_blank">How to unit test Vue components</a>*

### Stubbing Vue Router properties

Vue Router properties can be tricky to test. When you install Vue Router on a Vue constructor, they are added as read-only properties to the Vue constructor prototype. This can be very confusing if you aren't aware of the fact!

So when you want to stub Vue Router properties, you need to avoid installing Vue Router on the base Vue constructor. You can do that by using Vue Test Utils.

### Stub $route with vue-test-utils

Vue Test Utils is the official Vue test library. It contains helper functions for testing Vue components.

Imagine you have a Vue Single File Component that renders the `$route.name`:

```html
<template>
  <div>{{this.$route.name}}</div>
</template>

<script>
export default {
  name: 'test-component'
}
</script>
```

You could test this using the Vue Test Utils `mocks` mounting option. `mock` adds properties to the Vue prototype for the current component you're testing, and it won't affect future tests.

Here's an example:

```js
import { expect } from 'chai'
import { shallowMount } from 'vue-test-utils'
import Component from './component.vue'

it('renders $router.name', () => {
  const $route = {
    name: 'test name - avoriaz'
  }
  const wrapper = shallow(Component, {
    mocks: {
      $route
    }
  })
  expect(wrapper.text()).to.equal($route.name)
})
```

If you have any questions, leave a comment.

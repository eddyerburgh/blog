---
layout: post
status: publish
title: stub $route in unit tests
description: Learn how to stub dependencies in Vue unit tests. This tutorial walks through 2 different ways of passing stubs to dependencies in unit tests.
disqus_id: 498
categories:
- Tutorials
- Vue
tags: []
comments: true
---

In this article we'll look at four ways to stub `$route` in Vue unit tests. One naive approach, one enlightened, one using <a href="https://github.com/eddyerburgh/avoriaz" target="_blank" rel="noopener">avoriaz</a> and one using the unreleased <a href="https://github.com/vuejs/vue-test-utils" target="_blank" rel="noopener">vue-test-utils library</a>.

*Note: We won't explore basic unit testing concepts. If you aren't familiar with unit testing Vue components, check out <a rel="noopener" href="{% post_url 2017-02-02-unit-test-vue-components %}" target="_blank">How to unit test Vue components</a>*

## The component

```vue
<template>
  <div>{{this.$route.name}}</div>
</template>

<script>
export default {
  name: 'test-component'
}
</script>
```

We need to test that `this.$route.name` is rendered inside the div.

To do that we have to stub `$route`.

## Stub $route - the naive approach

To stub `$route` we'll pass a mock `$route` object to Vue that is accessible from our component instance.

We can do this by adding the mock object to the `Vue` prototype.

In Vue, all instances are created from the Vue base constructor. If we add a property to the Vue prototype each child Vue instance (`vm`) will have the `$route` property when it is created.

```js
Vue.prototype.$route = { name: 'route-name' }
```

A unit test will look like this:

```js
import Vue from 'vue'
import { expect } from 'chai'
import Component from './component.vue'

const $route = {
  name: 'test name - naive'
}
Vue.prototype.$route = $route

const Constructor = Vue.extend(Component)
const vm = new Constructor().$mount()
expect(vm.$el.textContent).to.equal($route.name)
```

This will pass. But every Vue component mounted in tests after this will have `$route` defined.

Let's see how to add `$route` without affecting other tests.

## Stub $route - the enlightened approach

In our previous test we used `Vue.extend()` to create a constructor for the component we are testing. 

[`Vue.extend()`](https://vuejs.org/v2/api/#Vue-extend) returns a subclass of the instance it was called on. This means we can call it on the base Vue constructor to create a subclass of Vue, add `$route` to the subclass prototype and then extend the subclass to create our component instance.

That explanation was a bit wordy, so let's see it in action:

```js
import Vue from 'vue'
import { expect } from 'chai'
import Component from './component.vue'

it('renders $router.name', () => {
  const scopedVue = Vue.extend()
  const $route = {
    name: 'test name - enlightened'
  }
  scopedVue.prototype.$route = $route

  const Constructor = scopedVue.extend(Component)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.equal($route.name)
})
```

We create a `scopedVue` subclass then add `$route` to the prototype of the subclass before creating a component instance from the subclass. `$route` will exists on the component instance, but not the base Vue constructor.

Great! Now we're containing the effects of our test. No other Vue instances created with the base Vue constructor will be affected.

It's kind of cryptic though. Let's see what it looks like using libraries.

## Stub $route with avoriaz

<a rel="noopenr" target="_blank" href="https://github.com/eddyerburgh/avoriaz">avoriaz</a> is a test util library for Vue. It's aim is to make testing Vue copmponents easier.

This is our test rewritten with avoriaz:

```js
import Vue from 'vue'
import { expect } from 'chai'
import { shallow } from 'avoriaz'
import Component from './component.vue'

it('renders $router.name', () => {
  const instance = Vue.extend()  
  const $route = {
    name: 'test name - avoriaz'
  }
  const wrapper = shallow(Component, {
      globals: { $route },
      instance
  })
  expect(wrapper.text()).to.equal($route.name)
})
```

The `shallow` method takes a component, stubs all of it's child components and returns a wrapper around a mounted vue instance.

`shallow` takes options that affect the mounted component. Here we're passing `globals` and `instance`. `globals` adds properties to the Vue class, and `instance` is the base instance avoriaz will use to mount on.

Our tests are easier to understand and more robust with avoriaz. What about an official solution?

### Stub $route with vue-test-utils

vue-test-utils is the official Vue test library. As of writing (June 2017) it hasn't been released, but it's in development. 

The library is based on avoriaz, so the API is very similar.

Let's look at the same test using vue-test-utils:

```js
import { expect } from 'chai'
import { 
    scopedVue, 
    shallow 
} from 'vue-test-utils'
import Component from './component.vue'

it('renders $router.name', () => {
  const instance = scopedVue()
  const $route = {
    name: 'test name - avoriaz'
  }
  const wrapper = shallow(Component, { 
    instance, 
    intercept: { $route }
  })
  expect(wrapper.text()).to.equal($route.name)
})
```

There are two differences between this test and the one written with avoriaz. The `scopedVue` function, and `intercept` option.

`intercept` behaves the same way as `globals`. It's just a more descriptive name. 

`scopeVue` returns a Vue instance. Why are we using `scopedVue` instead of `Vue.extend()`? `Vue.extend` doesn't duplicate every property from the base Vue constructor. It's missing properties like `config`, `versionNumber` and `utils`.

You can see the function [here](https://github.com/vuejs/vue-test-utils/blob/master/src/ScopedVue.js).

## Gotchas

When you install vue-router, it adds a `$route` to the root Vue class. It's added as a read only property, meaning it can't be overwritten.

If you install vue-router by using `Vue.use(VueRouter)` anywhere in your test suite, you will not be able to rewrite the `$route` object.

## Conclusion

We saw 4 ways of stubbing `this.$route` in Vue tests.

A repo with the tests is <a href="https://github.com/eddyerburgh/stub-route-in-vue-unit-tests/" rel="noopener" target="_blank">available here</a>

If you have any questions, leave a comment.
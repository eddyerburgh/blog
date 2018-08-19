---
layout: post
status: publish
published: true
title: How to unit test Vue components
description: Learn how to unit test Vue components. This tutorial walks you through how to set up a Vue test environment and how to write tests for Vue components.
wordpress_id: 404
wordpress_url: http://www.coding123.org/?p=404
date: '2017-02-02 12:27:33 +0000'
date_gmt: '2017-02-02 12:27:33 +0000'
categories:
- Tutorials
- Vue
comments: true
---
This tutorial will teach you how to write unit tests for Vue components.

*Note: This tutorial assumes you're familiar with unit testing, webpack, ES6, mocha, chai and karma. If you're not, check out <a rel="noopener" href="http://www.coding123.org/tutorials/unit-test-vue-components-beginners/" target="_blank">How to unit test Vue components for beginners</a>.*

## Testing Vue components

Testing Vue components is different to testing a plain old JavaScript function. To test Vue components you need to mount the component, interact with it, and then check it behaves correctly.

One way to write Vue components is using Single File Component (SFC) format. SFCs use .vue extensions, and they're great to use. There's a downside though—SFCs aren't valid JavaScript. To test Vue SFCs, you need to compile the files before running your tests. You can do this with webpack and vue-loader.

If you're using karma to run your tests, you can use the preProcessors option in the <a rel="noopener" href="http://karma-runner.github.io/1.0/config/configuration-file.html">Karma configuration</a> file. Have a look at <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz-karma-mocha-example" target="_blank">this project</a> to see a working example.

Alternatively, you can use <a rel="noopener" href="https://www.npmjs.com/package/mocha-webpack" target="_blank">mocha-webpack</a> to compile your tests with webpack before running them with mocha. All you need to do is pass a webpack config to webpack-config in an npm script. For mount to work you need some browser methods, in Karma you have these methods available (since you're running tests in the browser), but running tests in mocha you don't. To solve this, you can use <a rel="noopener" href="https://www.npmjs.com/package/jsdom" target="_blank">JSDOM</a> to add browser globals before running your test suite. <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz-mocha-example" target="_blank">Here's a working example</a>.

Now that's taken care of, it's time to test!

The basic idea is to mount a Vue instance with the component:

```js
const vm = new Vue(MyComponent).$mount()
```

The Vue instance has as `$el` property which is a DOM node. You use this to make assertions by calling DOM node methods or accessing it's properties.

```js
expect(vm.$el.querySelector('.foo')).to.equal(true)
expect(vm.$el.querySelector('.foo').style.color).to.equal('red')
```

This works, but some common testing utilities (like dispatching a click) are verbose:

```js
const foo = vm.$el.querySelector('.foo')
const eventObject = new window.Event(type)
foo.dispatchEvent(eventObject)
vm._watcher.run()
```

To make your life easier, you can use a <a rel="noopener" href="https://vue-test-utils.vuejs.org/" target="_blank">test utility library</a>.

## Testing vue components using Vue Test Utils

<a rel="noopener" href="https://vue-test-utils.vuejs.org/" target="_blank">Vue Test Utils</a> is the official Vue test utility library. It's includes functions to mount components, and interact with them.

To get started, install Vue Test Utils and chai in your project from npm.

```shell
npm install --save-dev @vue/test-utils chai
```

Now, in your test file import `mount` from Vue Test Utils and expect from chai:

```js
import { mount } from '@vue/test-utils'
import { expect } from 'chai'
```

If you've set up your test environment using mocha-webpack or Karma then you're ready to go. If you're having trouble, git clone the <a rel="noopener" href="https://github.com/eddyerburgh/vue-test-utils-mocha-example" target="_blank">Vue Test Utils mocha example project</a>, and run npm install to get the project up and running.

```shell
git clone git@github.com:eddyerburgh/vue-test-utils-mocha-example.git && cd vue-test-utils-mocha-example && npm install
```

Working? Run npm test to make sure everything is fine.

Now, time to test.

```js
describe('Bar.vue', () => {
  it('renders a div with class bar', () => {
    const wrapper = mount(Bar)
    expect(wrapper.is('div')).to.equal(true)
    expect(wrapper.classes()).to.contain('bar')
  })

  it('renders 4 list elements inside .parent-ul', () => {
    const wrapper = mount(Bar)
    const listElements = wrapper.find('.parent-ul li')
    expect(listElements.length).to.equal(4)
  })
})
```

The <a rel="noopener" href="https://vue-test-utils.vuejs.org/api/wrapper/find.html" target="_blank">`find`</a> method returns an array of element wrappers. To see the full list of methods available to a wrapper, <a rel="noopener" href="https://vue-test-utils.vuejs.org/api/#mount" target="_blank">check out the docs</a>.

The `find` method takes any <a rel="noopener" href="https://vue-test-utils.vuejs.org/api/#selectors" target="_blank">CSS selector</a>, or a Vue component as a parameter. So you can assert whether a Vue component was rendered or not.

Another useful method is <a rel="noopener" href="https://vue-test-utils.vuejs.org/api/wrapper/trigger.html" target="_blank">`trigger`</a>. This dispatches a DOM event on the wrapper element.

```js
describe('Bar.vue', () => {
  it('renders h1 which changes text when button is clicked', () => {
    const expectedMessage = 'new message'
    const wrapper = mount(Foo)
    const button = wrapper.find('#change-message')[0]
    button.trigger('click')
    expect(wrapper.find('h1').text()).to.equal(expectedMessage)
  })
})
```

For full examples, check out the <a rel="noopener" href="https://github.com/eddyerburgh/vue-test-utils-mocha-example" target="_blank">mocha-webpack example project</a>.

If you have any questions, leave a comment and I'll get back to you.

Want more? I've written a book on Testing Vue applications. You can [buy it now](https://www.manning.com/books/testing-vuejs-applications?a_aid=eddyerburgh) as part of the eartly release program. The book covers every aspect of testing Vue applications.

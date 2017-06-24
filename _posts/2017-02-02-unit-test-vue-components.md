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
tags: []
---
It seems everybody's using Vue.js nowadays, and it's easy to see why. It's <a rel="noopener" href="https://vuejs.org/v2/guide/comparison.html#Performance-Profiles" target="_blank">fast</a>, <a rel="noopener" href="https://medium.com/js-dojo/vue-js-is-easier-to-learn-than-jquery-abbbb9c12cf8" target="_blank">easy to learn</a> and has <a rel="noopener" href="https://vuejs.org/v2/api/" target="_blank">amazing documentation</a>. But how do we unit test Vue components?

*Note: This tutorial assumes you're familiar with unit testing, webpack, ES6, mocha, chai and karma. If you're not, check out <a rel="noopener" href="http://www.coding123.org/tutorials/unit-test-vue-components-beginners/" target="_blank">How to unit test Vue components for beginners</a>.*

## Testing Vue Components

There's a useful <a rel="noopener" href="https://vuejs.org/v2/guide/unit-testing.html" target="_blank">section on unit testing</a> in the Vue docs. It goes over the basics of unit testing Vue components, and it's worth checking out before we go further.

To test .vue components, you need to compile the files before running your tests. We can do this is with webpack and vue-loader.

If you're using karma to run your tests, you can use the preProcessors option in the <a rel="noopener" href="http://karma-runner.github.io/1.0/config/configuration-file.html">Karma configuration</a> file. Have a look at <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz-karma-mocha-example" target="_blank">this project</a> to see a working example.

Alternatively, you can use <a rel="noopener" href="https://www.npmjs.com/package/mocha-webpack" target="_blank">mocha-webpack</a> to compile your tests with webpack before running them with mocha. All you need to do is pass a webpack config to webpack-config in an npm script. For mount to work you need some browser methods, in Karma we have these methods available(since we're running tests in the browser), but running tests in mocha we don't. To solve this, you can use <a rel="noopener" href="https://www.npmjs.com/package/jsdom" target="_blank">jsdom</a> to add browser globals before running your test suite. <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz-mocha-example" target="_blank">Here's a working example</a>.

Now that's taken care of, it's time to test!

The basic idea is to create a Vue instance with the component and call the $mount method to render the instance in memory.

```js
const vm = new Vue(MyComponent).$mount()
```

The Vue instance has as $el property which is a DOM node. You use this to make assertions by calling DOM node methods or accessing it's properties.

```js
expect(vm.$el.querySelector('.foo')).to.equal(true)
expect(vm.$el.querySelector('.foo').style.color).to.equal('red')
```

This works, but some common testing utilities (like dispatching a click) are quite verbose:

```js
const foo = vm.$el.querySelector('.foo')
const eventObject = new window.Event(type);
foo.dispatchEvent(eventObject);
vm._watcher.run();
```

To make our lives easier, we can use a <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz" target="_blank">test utility library</a>.

## Testing Vue components using avoriaz

<a rel="noopener" href="https://github.com/eddyerburgh/avoriaz" target="_blank">avoriaz</a> is similar to enzyme (a react testing utils library). It shares methods like find, dispatch and contains.

To get started, install avoriaz and chai in your project from npm.

```shell
npm install --save-dev avoriaz chai
```

Now, in your test file import mount from avoriaz and expect from chai:

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
```

If you've set up your test environment using mocha-webpack or Karma then you're ready to go. If you're having trouble, git clone the <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz-mocha-example" target="_blank">avoriaz mocha example project</a>, and run npm install to get the project up and running.

```shell
git clone git@github.com:eddyerburgh/avoriaz-mocha-example.git && cd avoriaz-mocha-example && npm install
```

Working? Run npm test to make sure everything is fine.

Now, time to test.

```js
describe('Bar.vue', () => {
  it('renders a div with class bar', () => {
    const wrapper = mount(Bar);
    expect(wrapper.is('div')).to.equal(true);
    expect(wrapper.hasClass('bar')).to.equal(true);
  });
  it('renders 4 list elements inside .parent-ul', () => {
    const wrapper = mount(Bar);
    const listElements = wrapper.find('.parent-ul li');
    expect(listElements.length).to.equal(4);
  });
});
```

The <a rel="noopener" href="https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/find.html" target="_blank">find</a> method returns an array of element wrappers. To see the full list of methods available to a wrapper, <a rel="noopener" href="https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/" target="_blank">check out the docs</a>.

The find method takes any <a rel="noopener" href="https://eddyerburgh.gitbooks.io/avoriaz/content/api/selectors.html" target="_blank">CSS selector</a>, or a Vue component as a parameter. So you can assert whether a Vue component was rendered or not.

Another useful method is <a rel="noopener" href="https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/dispatch.html" target="_blank">dispatch</a>. This calls a DOM event on the wrapper element.

```js
describe('Bar.vue', () => {
  it('renders h1 which changes text when button is clicked', () => {
    const expectedMessage = 'new message';
    const wrapper = mount(Foo);
    const button = wrapper.find('#change-message')[0];
    button.dispatch('click');
    expect(wrapper.find('h1')[0].text()).to.equal(expectedMessage);
  });
});
```

For full examples, check out the <a rel="noopener" href="https://github.com/eddyerburgh/avoriaz-mocha-example" target="_blank">mocha-webpack example project</a>.

For a complete list of avoriaz methods, <a rel="noopener" href="https://eddyerburgh.gitbooks.io/avoriaz/content/" target="_blank">check out the docs</a>.

If you have any questions, leave a comment and I'll get back to you.

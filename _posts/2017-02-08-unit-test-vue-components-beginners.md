---
layout: post
status: publish
published: true
title: How to unit test Vue components for beginners
description: Learn how to unit test Vue components. Tutorial on how to test Vue components for beginners - this bare bones tutorials will get your tests up and running.
wordpress_id: 414
wordpress_url: http://www.coding123.org/?p=414
date: '2017-02-08 17:46:34 +0000'
date_gmt: '2017-02-08 17:46:34 +0000'
categories:
- Tutorials
- Vue
tags: []
comments: true
---

In this tutorial I'll teach you what unit tests are, why you should write them, and how to write unit tests for Vue components.

*Note: for this tutorial you need to have node > 6 installed, if it's not <a rel="noopener" href="https://nodejs.org/en/download/" target="_blank">download it here</a>. We also use ES6 syntax, so you should brush up on that if you're not familiar with it*

## What are unit tests?

Unit tests are a way to automatically check that code does what it's intended to do. You run your source code in a controlled environment and assert that it produce the expected output.

For example, here is a `sum` function:

```js
function sum (a, b) {
  return a + b
}
```

You could write a `testSum` function that throws an error if `sum` does not return the sum of a and b:

```js
function `testSum` () {
  if (add(1, 2) !== 3) {
    throw new Error('add should return sum of both parameters')
  }
}
```

Now you can run `testSum` to check that `sum` works correctly. If `sum(1, 2)` does not return `3`, `testSum` will throw an error to alert you that the `sum` function is broken.

At their simplest, this is what unit tests are. Functions that check the result of the function you are testing.

## Why write unit tests?

Now you know what unit tests are, you're probably wondering why you should use them.

The benefits of unit tests are:

* They tell you that your code is behaving correctly
* They provide living documentation for code

In large projects there can be thousands of unit tests. With thousands of unit tests you can refactor the codebase, run your test command and be confident that nothing is broken.

Now you know what unit tests are, and why you should write them. Now it's time to learn how.

## How to unit test vue components

Unit tests for Vue components are different to normal unit tests. Instead of calling a function and checking it returns the correct result, you *mount* a component, interact with it, and assert that it responds correctly. You'll see what that looks like later on, first you need to do some set up.


### Getting started

Create a new directory with the following structure:

```
 .
 ├── app
 | └── components
 ├── build
 ├── test
 │   └──test.js
 ├──
 └── package.json
```

The components directory will hold your components. The test directory will hold the test files, and the build directory will hold the webpack config file.

Open the command line and change your current directory to the root of the project. (Note: If you don't know how to change your working directory, check out <a rel="noopener" href="http://askubuntu.com/a/520794" target="_blank">this stackoverflow answer</a> for linux/mac and <a rel="noopener" href="http://www.digitalcitizen.life/command-prompt-how-use-basic-commands" target="_blank">this guide</a> for windows).

When you're in the directory, bootstrap an npm project with the following command:

```
npm init -y
```

Before you add any tests, you need to learn about Mocha.

### Mocha

Mocha is a *test framework*. You define tests in a file and run them from the command line with mocha. Mocha detects tests that throw errors and reports them to you.

You define a test for mocha by using the `it` function:

```js
it('returns sum of parameters a and b', () => {
  if (sum(1, 2) !== 3) {
    throw new Error('add should return sum of both parameters')
  }
})
```

You can group related tests in a `describe` block to improve test organization:

```js
describe('sum', () => {
  it('returns sum of parameters a and b', () => {
    // ..
  })
})
```

This is great so far, but those if statements aren't very expressive. That's where Chai comes in.

### Chai

Chai is an assertion library. It asserts that a condition is true and throws an error if it does not.

Using Chai, the `sum`` test function becomes:

```js
describe('sum', () => {
  it('returns sum of parameters a and b', () => {
    expect(add(1, 2)).to.equal(3)
  })
})
```

Much more readable.

Now you're ready use Chai and Mocha write your first test *sanity test*. A sanity test is a passing test that you write to make sure the test system is set up correctly.

In the command line, run:

```
npm install --save-dev mocha chai
```

When that's installed, add a new file test/Foo.spec.js and paste the following code:

```js
import { expect } from 'chai'

describe('first test', () => {
  it('is true', () => {
    expect(true).to.equal(true)
  })
})
```

Now you're going to create an <a rel="noopener" href="https://medium.com/@mxstbr/npm-scripts-explained-f125e85eb378#.8k1r9ok7a" target="_blank">npm script</a> to run the tests. Open up package.json. There will be an existing test script:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Edit the test script to look like this:
```json
"scripts": {
  "test": "mocha test/**/*.spec.js --recursive"
},
```

This command runs mocha and tells it to look in the test directory recursively for any file with a .spec.js extension.

Now, from the command line type:

```
npm run test
```

You should now see your first passing unit test!

Now that you've got a sanity test written, it's time to write tests for a Vue component.


### Unit testing Vue components

As I said, Vue components are different to test than normal functions. To test a Vue component you'll mount a component in memory, interact with it, and make sure it responds correctly.

In the components directory, create a file named Foo.vue. Add the code below to Foo.vue:

```html
<template>
  <div class="foo">
    <h1>{{ msg }}</h1>
    <button id="change-message" @click="changeMessage">Change message</button>
	  <p>{{ passedProp }}</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  props: ['passedProp'],
  methods: {
    changeMessage() {
      this.msg = 'new message'
    }
  }
}
</script>
```

Something to note about Single File Components (SFCs) is that you can't run them natively. You need to compile them into JavaScript first. To do that, you can use webpack and Vue Loader.

As well as webpack and Vue Loader, there are a few other dependencies to add. In the command line, enter:

```shell
npm install --save vue &&
npm install --save-dev @vue/test-utils babel-core babel-loader babel-preset-env chai css-loader mocha mocha-webpack vue-loader vue-template-compiler webpack
```

Woo boy. That's a lot of dependencies! If you want to know what they do, read the wall of text below!

*@vue/test-utils is a vue test utilities library. babel-loader is a webpack loader to transpile JS with babel. babel-core is used by babel-loader to transpile. babel-preset-env lets babel compile es2015. css-loader is a dependency of vue-loader, mocha-webpack compiles files with webpack before running them in mocha. vue-loader is a plugin for webpack that compiles Vue files. vue-template-compiler is a dependency of vue-loader that compiles vue templates into JavaScript. webpack is a build tool that bundles code.*

Don't worry if you didn't read or understand that. Most of these libraries are used to compile the code.

In this tutorial, webpack is doing the heavy lifting. Webpack is a module bundler that takes multiple JavaScript files (modules) and compiles them into a JavaScript file. It can also process files, and you'll use it to process Vue SFCs into JavaScript.

In the build directory create a file named webpack.test.config.js, and paste in the code below:

```js
const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: [
          path.resolve(__dirname, '../')
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  }
}
```

*If this config file feels like a black box, don't worry. You don't need to know exactly what each option does, just that it compiles Vue SFCs into browser-friendly code.*

Now in package.json, we need to edit the test script to use mocha-webpack:

```json
"scripts": {
  "test": "mocha-webpack --webpack-config build/webpack.test.config.js test --recursive"
},
```

mocha-webpack compiles code with webpack before calling mocha to run tests this means.

Run `npm run test` to make sure everything is working.

Now after that setup, it's finally time to write the test. Open Foo.spec.js and paste this over the previous code:

```js
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Foo from '../app/components/Foo.vue'

describe('Foo.vue', () => {
  it('has a root element with class foo', () => {
    const wrapper = mount(Foo)
    expect(wrapper.is('.foo')).to.equal(true)
  })
})
```

This test asserts that the root element of Foo has the className `foo`.

Now run `npm run test`. You will see an error - '@vue/test-utils must be run in a browser environment'.

Vue Test Utils is the library that gives you the `mount` method, and it must be run in a browser environment. You could run the tests in a real browser like Chrome, but opening and closing a browser adds a lot of overhead to tests. Instead, you can use JSDOM to create and run a JavaScript DOM environment in Node.

In the command line, run:

```shel
npm install --save-dev jsdom jsdom-global
```

Now add a file named .setup.js in the test directory, and paste in the following code:

```js
require('jsdom-global')()
```

This function creates a `window` object and adds it to the Node global object. You need to run it before we run your tests. To do that you need to edit your test script again (last time I promise!):

```json
"scripts": {
  "test": "mocha-webpack --webpack-config build/webpack.test.config.js test --recursive --require test/.setup"
},
```

Now mocha will run the .setup file before running the tests.

If you run `npm run test`, you should have a passing test. Hooray!

Time for some more tests.

Currently you have a test that checks that the wrapper is rendering a div with the class `foo`:

```js
const wrapper = mount(Foo)
expect(wrapper.is('.foo')).to.equal(true)
```

You're using the `mount` method imported from Vue Test Utils, and then calling `isz on the wrapper.

Under the hood, `mount` mounts the Vue component and creates a wrapper class with methods to test the Vue component. Above you use the <a rel="noopener" href="https://vue-test-utils.vuejs.org/api/#mount" target="_blank">`is` method</a>, but there are loads more to choose from. Have a look through <a rel="noopener" href="https://www.google.co.uk/search?q=vue+test+utls&oq=vue+test+utls&aqs=chrome..69i57.2190j0j1&sourceid=chrome&ie=UTF-8" target="_blank">the docs</a> for the full list.

A useful method is `find`. `find` searches the wrapper for elements matching a selector and returns a new wrapper of the first matching node:

```js
const wrapper = mount(Foo)
const p = wrapper.find('p')
```

Here, p will be the first &lt;p&gt; tag found in Foo.

You can also pass props to mounted components when you call `mount`. This is done with the `propsData` option:

```js
const wrapper = mount(Foo, { propsData: { propertyA: 'property' }})
```

Using `find` and `propsData`, you can test whether Foo correctly renders passedProp in the &lt;p&gt; tag:

```js
it('sets the prop value', () => {
  const passedProp = 'some text'
  const wrapper = mount(Foo, { propsData: { passedProp }})
  const p = wrapper.find('p')
  expect(p.text()).to.equal(passedProp)
})
```

Cool! Let's look at one last method - `trigger`.

`trigger` dispatches a DOM event to the wrapper root element. In the Foo component, you have a button with id `change-message` that should change the text of the &lt;h1&gt; tag when clicked. Write a test to check that it does:

```js
it('changes h1 text when #change-text is clicked', () => {
  const wrapper = mount(Foo)
  const changeMessage = wrapper.find('#change-message')
  changeMessage.trigger('click')
  const h1 = wrapper.find('h1')
  expect(h1.text()).to.equal('new message')
})
```

This test finds the `changeMessage` button, dispatches a click event and then asserts that the &lt;h1&gt; text has changed.
Success!

All together now:

```js
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Foo from '../app/components/Foo.vue'

describe('Foo.vue', () => {
  it('has a root element with class foo', () => {
    const wrapper = mount(Foo)
    expect(wrapper.is('.foo')).to.equal(true)
  })

  it('has a root element with class foo', () => {
    const passedProp = 'some text'
    const wrapper = mount(Foo, { propsData: { passedProp }})
    const p = wrapper.find('p')
    expect(p.text()).to.equal(passedProp)
  })

  it('changes h1 text when #change-text is clicked', () => {
    const wrapper = mount(Foo)
    const changeMessage = wrapper.find('#change-message')
    changeMessage.trigger('click')
    const h1 = wrapper.find('h1')
    expect(h1.text()).to.equal('new message')
  })
})
```

That's all the tests we're going to write in this tutorial. To learn more about unit testing Vue components, see <a rel="noopener" href="{% post_url 2017-02-02-unit-test-vue-components %}" target="_blank">How to unit test Vue components</a>.

A repo for this tutorial is <a rel="noopener" href="https://github.com/eddyerburgh/how-to-unit-test-vue-components-for-beginners" target="_blank">available here</a>.

> Want more? I've written a book on Testing Vue applications. You can [buy it now](https://www.manning.com/books/testing-vuejs-applications?a_aid=eddyerburgh) as part of the eartly release program. The book covers every aspect of testing Vue applications.

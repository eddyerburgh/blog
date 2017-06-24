---
layout: post
status: publish
published: true
title: Stub dependencies in Vue unit tests
description: Learn how to stub dependencies in Vue unit tests. This tutorial walks through 2 different ways of passing stubs to dependencies in unit tests.
wordpress_id: 472
wordpress_url: https://www.coding123.org/?p=472
date: '2017-05-07 17:47:43 +0000'
date_gmt: '2017-05-07 17:47:43 +0000'
categories:
- Tutorials
- Vue
tags: []
comments: []
---
In this tutorial we will see how to stub dependencies in vue unit tests.

*note: this is an advanced tutorial on testing. If you're not familiar with unit testing Vue components, using babel and webpack check out How to unit test Vue components*

## What does stubbing dependencies mean?

To answer the question we need to define dependencies and stubs.

A dependency is a file or function our code relies on. In .js or .vue files import and require statements are dependencies.
 
For example:

```js
import { sendEmail } from './module'
function success() {
  console.log('success!')
  sendEmail()
}
```
The `success` function logs success! to the console when it's called. It also calls `sendEmail` - which is imported from another file. Here, sendEmail is a dependency of success.

A stub is a mock that simulates the behavior of a module or function.

Stubbing dependencies simply means passing a stub to your code, instead of the dependency.

## Why use stubs?

Stubs give us total control over what our function returns.

For example, say we need to test this function:

```js
// functionToTest.js
import dependency from './dependency'
function functionToTest() {
  if (dependency()) {
    return 1;
  } else {
    return 3;
  }
}
```
To test both branches, dependency needs to return true in one test and false in another.

This is easy to do with a stub - because we control what it returns!

## How?

This tutorial will go over 2 different methods. One using <a href="https://github.com/speedskater/babel-plugin-rewire">babel-plugin-rewire</a> and another using <a href="https://github.com/plasticine/inject-loader" target="_blank">inject-loader</a>.

### babel-plugin-rewire

We're going to use a pre made project to learn how to use babel-plugin-rewire.

Open up a terminal and run:

```shell
git clone git@github.com:eddyerburgh/stub-vue-components-starter.git &&
cd stub-vue-components-starter &&
npm install
```

This command downloads the starter repo, changes into the directory and installs node_modules.

Once the node_modules are installed, run npm test to run the unit tests

Oh no! One of the tests is failing. Let's see what's going on.

Open the project in a text editor and open the file /src/components/Component.vue:

`````vue
<template>
  <div v-bind:class="{ active: isActive }" />
</template>

<script>
  import dependency from '../lib/dependency'
  export default {
    name: 'Component',
    data () {
      return {
        isActive: dependency()
      }
    }
  }
</script>
`````
This component should render a div with class active if dependency returns true, and no class if it returns false.

*Note: In these tests, dependency is just a function that returns true. In the real world, dependency might query a database and return true if the user is found, false if not. Or it could check if a query parameter. The point is - for a unit test, it doesn't matter what the dependency does. All that matters is what it returns.*

Now open the test file - /test/unit/specs/Component.spec.js:

```js
import { mount } from 'avoriaz'
import Component from '@/components/Component'
describe('Component.vue', () => {
  it('renders a div with class active when dependency returns true', () => {
    const wrapper = mount(Component)
    expect(wrapper.hasClass('active')).to.equal(true)
  })
  it('renders a div without class active when dependency returns false', () => {
    const wrapper = mount(Component)
    expect(wrapper.hasClass('active')).to.equal(false)
  })
})
```
We're testing both cases, but because dependency is returning true, the second test is failing.
Let's make it pass.
First, we need babel-plugin-rewire installed.
Run:

```shell
npm install --save-dev babel-rewire-plugin
```
This plugin adds methods to imported modules that let us control what their dependencies return. 
Let's look at a simple example:

```js
// someFile.js
import someFilesDependency from './someFilesDependency'
export default () => someFilesDependency() ? 1 : 3
// someFile.spec.js
import someFile from '../someFile'
someFile.__Rewire__('someFilesDependency', () => true)
console.log(someFile()) // logs 1
```

The __Rewire__ method is added by babel-plugin-rewire. It lets us pass a stub (in this case a function that returns true) from the import statement inside someFile.js.
To add these methods in our project, we need to tell babel to use it.
Open .babelrc and add it in the env.test.plugins array:

```json
{
  "presets": [
    ["env", { "modules": false }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "comments": false,
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": [ "istanbul", "rewire"]
    }
  }
}
```

Why in the test plugins array? If we add it to the top level plugins array it would add the methods to all compiled code. We don't want our production code to have these methods, so we tell babel to only run it when the <a href="http://stackoverflow.com/a/16979503/4939630" target="_blank">NODE_ENV environment variable</a> is set to test.
Now babel will add the methods when we run our tests. Time to get our tests passing.
Open /test/unit/specs/Component.spec.js

All we need to do to get the test passing is use the __Rewire__ method we just saw. 

In our test, it will look like this:

```js
Component.__Rewire__('dependency', () => false)
```

This method replaces dependency in Component with a function that returns false. 
The first argument is the dependency inside the module that you want to stub, and the second argument is the stub to use.
It's always good to clean up after editing a function. For that, there is the __ResetDependency__ method:

```js
Component.__ResetDependency__('dependency')
```

This resets dependency to it's original version.

After adding these two methods to the second test, our file should look like this:

```js
import { mount } from 'avoriaz'
import Component from '@/components/Component'
describe('Component.vue', () => {
  it('renders a div with class active when dependency returns true', () => {
    const wrapper = mount(Component)
    expect(wrapper.hasClass('active')).to.equal(true)
  })
  it('renders a div without class active when dependency returns false', () => {
    Component.__Rewire__('dependency', () => false)
    const wrapper = mount(Component)
    expect(wrapper.hasClass('active')).to.equal(false)
    Component.__ResetDependency__('dependency')
  })
})
```
Now run the tests:

```shell
npm run test
```

2 passing, yay! (hopefully)

*If it's not passing, a working repo is available <a href="https://github.com/eddyerburgh/stub-vue-components-babel-rewire" target="_blank">here</a>.*

So that's one way to stub dependencies. In the next section we'll see how to achieve the same effect using inject-loader.

### inject-loader

<a href="https://github.com/plasticine/inject-loader" target="_blank">inject-loader</a> is recommended in the <a href="https://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html">testing with mocks</a> tutorial in the vue-loader docs.

We can use the same project from earlier. First, some clean up.

We need to remove the rewire plugin from babel (it causes issues with inject-loader). Open up .babelrc and remove it from the plugins list:

```json
{
  "presets": [
    ["env", { "modules": false }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "comments": false,
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": [ "istanbul"]
    }
  }
}
```

Now we can add inject-loader:

```shelll
npm install --save-dev inject-loader@2.0.1```
```
It has to be version 2, as version 3 is buggy.
Now we can edit /test/unit/specs/Component.spec.js.
We need to tell webpack to use inject-loader when we import the component:

```shell
import componentFactory from '!!vue-loader?inject!@/components/Component'
```

!! tells webpack to disable all loaders from the global config. vue?inject! tells webpack to use the vue loader, and pass in the ?inject query.
This returns a factory function that returns Component with stubbed dependencies.
In our test, it looks like this:

```js
it('renders a div without class active when dependency returns false', () => {
  const Component = componentFactory({
    '../lib/dependency': () => false
  })
  const wrapper = mount(Component)
  expect(wrapper.hasClass('active')).to.equal(false)
})
```

This is great, but even when we don't want to stub a dependency, we have to call the factory function:

```js
it('renders a div with class active when dependency returns true', () => {
  const Component = componentFactory({})
  const wrapper = mount(Component)
  expect(wrapper.hasClass('active')).to.equal(true)
})
```

So the final test file looks like this:

```js
import { mount } from 'avoriaz'
import componentFactory from '!!vue-loader?inject!@/components/Component'
describe('Component.vue', () => {
it('renders a div with class active when dependency returns true', () => {
  const Component = componentFactory({})
  const wrapper = mount(Component)
  expect(wrapper.hasClass('active')).to.equal(true)
})
  it('renders a div without class active when dependency returns false', () => {
    const Component = componentFactory({
      '../lib/dependency': () => false
    })
    const wrapper = mount(Component)
    expect(wrapper.hasClass('active')).to.equal(false)
  })
})
```

Now let's see those tests pass!

```js
npm test
```
2 passing, yay! (hopefully)

*If it's not passing, a work repo is available <a href="https://github.com/eddyerburgh/stub-vue-components-inject-loader">here</a>.*

## Conclusion

We've seen 2 ways to stub dependencies in Vue components.

Using babel-plugin-rewire, and using inject-loader.

The full working repos are on github - <a href="https://github.com/eddyerburgh/stub-vue-components-babel-rewire" target="_blank">using babel-plugin-rewire</a> and <a href="https://github.com/plasticine/inject-loader" target="_blank">using inject-loader</a>.

If you have any questions, leave a comment

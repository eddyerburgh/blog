---
layout: post
status: publish
published: true
title: How to unit test a Vuex store
description: Learn how to unit test a Vuex store. Tutorial on how two different approaches to unit testing a Vuex store.
date: '2018-09-25 17:46:34 +0000'
date_gmt: '2017-09-17 17:46:34 +0000'
categories:
- Tutorials
- Vue
-
tags: []
comments: true
---

This article will teach you two different approaches for unit testing a Vuex store. You'll learn how to test each of the store parts separately, and how to test a running store instance.

*Note:I'm assuming that you have some experience writing unit tests with <a href="https://jestjs.io/docs/en/getting-started.html" target="_blank" rel="noopener noreferrer">Jest</a> and storing state with <a href="https://vuex.vuejs.org/" target="_blank" rel="noopener noreferrer">Vuex</a>.*

I'll teach you the two approaches by writing tests for a store in an example app. The app fetches posts from the reddit API and renders a list of the items. You can see a screenshot below.

<img class="aligncenter" src="/assets/2018/reddit-example-app.png" alt="Screenshot of reddit example app" />

In the reddit app, you have a `fetchItems` action that fetches data from the reddit API and commits a `setItems` mutation. The `setItems` mutation updates the `state.items` value. The app then uses a `displayItems` getter to calculate which items should be rendered.

The first technique I'll teach you is how to test each of these store parts separately.

## Testing store parts separately

Store logic exists in actions, mutations, and getters. These are all just JavaScript functions, so they are relatively easy to write unit tests for.

### Testing mutations

Mutations take a state object and an optional payload object. The purpose of mutations is to *mutate* the state object (hence the name!). So a unit test would call a mutation with a fake state object and assert that the object is updated.

In the example app, there is a `setItems` getter that sets the `state.items` value.

```js
// mutations.js

export default {
  setItems (state, { items }) {
    state.items = items
  }
}
```

You can test it by creating a fake state object, then calling the mutation with the object:

```js
import mutations from './mutations'

test('setItems updates state with items in payload', () => {
  const state = {
    items: []
  }
  const items = [{}, {}]
  mutations.setItems(state, { items })
  expect(state.items).toBe(items)
})
```

Often mutations are so simple that they don't need to be tested explicitly. But if you have logic in a mutation, like filtering items in an array, you should write a unit test.

The next store part you need to learn to test are getters.

### Testing getters

Getters are like computed properties for a Vuex store. They receive the state object, and an object of other computed getters that they can use to calculate a return value.

In the example store, there is a `displayItems` getter that uses the `state.page` and `state.items` value to calculate which items should be displayed:

```js
// getters.js

export default {
  displayItems({ page, items }) {
    const perPage = 20
    const index = perPage * page
    return items.slice(index - perPage, index)
  }
}
```

The output of a getter is its return value, so unit testing one is simple. Call the getter with a mock object of data, and assert that it returns the expected value.

For example, the `displayItems` getter should return first 20 items if `state.page` value is 1.

To test that the function returns the first 20 items, you need to create an items array with more than 20 items. You can do this with a helper function:

```js
const items = Array(22)
  .fill()
  .map((v, i) => i)
```

In the test, you would create the items array and add the array to a `state` object. Then you would call the `displayItems` getter with the fake state object and assert that the getter returns the correct value:

```js
// getters.spec.js

test('returns first 20 items if state.page value is 1', () => {
  const items = Array(22)
    .fill()
    .map((v, i) => i)

  const state = {
    items,
    page: 1
  }

  const result = getters.displayItems(state)

  expect(result).toHaveLength(20)
  expect(result).toEqual(items.slice(0, 20))
})
```

Again, relatively simple. The final part of a store to test seperately are actions.

## Testing actions

Actions are functions that can commit mutations, dispatch other actions,and interact with the store. They are often more complicated to test than mutations or getters because they might make HTTP requests, or interact with a database.

In the reddit app, there's a `fetchItems` action that fetches items by calling a `fetchData` method, and commits the result:

```js
// actions.js

import { fetchData } from '../api'

export default {
  fetchItems ({ commit }) {
    return fetchData()
      .then(items => commit('setItems', { items }))
  }
}
```

To test that `fetchItems` commits `setItems` with the return value of the `fetchData` method, you need to control the return value of `fetchData`. To do this, you need to mock the api module. I won't go into the details here (you can read how to do that in the <a href="https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options" target="_blank" rel="noopener noreferrer">Jest docs</a>). The solution is to use the `jest.mock` function to mock the api module when it's required in tests:

```js
// Mocks ../api module with Jest mock functions
jest.mock('../api')

// Import intercepted by Jest to return mock fetchData function
import { fetchData } from '../api'

// Control mock to resolve with an array
fetchData.mockResolvedValue([1, 2, 3])
```

The second issue is asynchronous code. Again, I won't go into details, but the key is to use an async test function, and then `await` the `fetchItems` action.

So in the test, you mock the api module and set the return value of the function to resolve with an items array. Then call the action with a mock `commit` function, `await` the action, and assert that `commit` was called with the correct arguments.

*Note: If you aren't familiar with mock functions, you can read about them in the <a href="https://jestjs.io/docs/en/mock-functions" target="_blank" rel="noopener noreferrer">Jest docs</a>*

```js
// actions.spec.js

import actions from './actions'
import { fetchData } from '../api'

jest.mock('../api')

test('fetchItems commits items returned by api method', async () => {
  const items = [1, 2, 3]
  fetchData.mockResolvedValue(items)
  const commit = jest.fn()
  await actions.fetchItems({ commit })
  expect(commit).toHaveBeenCalledWith('setItems', { items })
})
```

Now you've seen how to test each store part separately. This approach is fine, but you write quite a lot of test code for source code that *probably* won't change very often. The alternative approach to testing a store is to combine the parts together into a store instance, and test against that.

## Testing a store instance

There are three steps to testing a store instance:

1) Install Vuex on a Vue constructor
2) Create a store instance
3) Test the store instance

The first step is to install Vuex on a Vue constructor. The reason you need to do this is because internally <a href="https://github.com/vuejs/vuex/blob/v3.0.1/src/store.js#L251" target="_blank" rel="noopener noreferrer">Vuex creates a Vue instance to handle reactivity</a>, and it needs to use a Vue constructor to create that instance.

You could install Vue on the Vue base constructor (the constructor that's exported from Vue):

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

The problem with this is that installing on the Vue base constructor will affect the constructor for every future test that's running in this context. This can lead to leaky tests, which are more annoying than a leaky faucet. Instead, you can use a localVue constructor to install Vuex safely:

```js
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
```

A localVue is a Vue constructor that's created by extending the base Vue constructor. You're free to make changes to a localVue constructor without affecting future tests.

Once Vuex is installed, you can use Vuex to create a store instance.

To create a store instance you instantiate a `Store` instance with a configuration object. Normally you combine the store parts into a configuration object inline:

```js
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
```

This works fine for production, but if you want to create multiple instances in tests you to extract the logic to create the configuration object.

You could write a function to create the configuration object. The function should return a new object each time it's called, to avoid any leaky tests that share state between store instances.

```js
// create-store-config.js

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default function createStoreConfig () {
  const state = {
    page: 1,
    items: []
  }

  return {
    state,
    actions,
    mutations,
    getters
  }
}
```

Now you can import the file in a test, and create as many new store instances as you like!

```js
const storeConfig = createStoreConfig()
const store = new Vuex.Store(storeConfig)
```

Now you can create a store using the `createStoreConfig` function.

The final step is to actually test the store. You can do this by dispatching an action, and asserting that the store state or getters values have updated correctly.

Putting it all together, you'll get a test like this:

```js
// create-store-config.spec.js

import createStoreConfig from './create-store-config'
import Vuex from 'vuex'
import { fetchData } from '../api'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api')

test('returns first 20 items', async () => {
  const items = Array(22)
    .fill()
    .map((v, i) => i)

  fetchData.mockResolvedValue(items)

  const storeConfig = createStoreConfig()
  const store = new Vuex.Store(storeConfig)

  await store.dispatch('fetchItems')

  expect(store.getters.displayItems).toEqual(items.slice(0, 20))
})
```

The great thing about testing a store instance is that your tests are less tied to your code, which makes them easier to refactor. The downside is that the tests are more complex.

## Conclusion

There are benefits to both approaches. Testing each part seperately gives you granular unit tests. Testing a store instance makes the tests less brittle, and gives you more coverage for less test code. The drawback of testing a store instance is that tests are more difficult to debug—because there are more lines of code under test!

In general, I would test a store instance if my store was quite small and unlikely to test. This lets me move fast while maintaining good test coverage. As soon as my project grows to include multiple contributors, I would start to test store parts seperately, because they are easier to test long term.

## Resources

* The repository for this article—https://github.com/eddyerburgh/testing-a-vuex-store-example-app


Want more? I've written a book on Testing Vue applications. You can [buy it now](https://www.manning.com/books/testing-vuejs-applications?a_aid=eddyerburgh) as part of the eartly release program. The book covers every aspect of testing Vue applications.

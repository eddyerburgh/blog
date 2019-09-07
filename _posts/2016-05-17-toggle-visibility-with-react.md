---
layout: post
status: publish
published: true
title: How to toggle visibility with React
description: It's easy to toggle visibility using React. This tutorial shows you how to toggle the visibility of a DOM element using React
wordpress_id: 319
date: '2016-05-17 14:44:03 +0000'
date_gmt: '2016-05-17 14:44:03 +0000'
categories:
- JavaScript
- Tutorials
tags: []
comments: true
---

 If you're new to the framework you might be wondering what the best way to toggle visibility with React is. In this tutorial we'll see how to achieve this using conditional rendering.

## The theory

There are three steps to this:

1. Add an `isHidden` property to the component state
2. Trigger a function that toggles the `isHidden` value between `true` and `false`
3. Render the component when `isHidden` is `false`

React re renders a component each time the state changes, so you can add a conditional statement in the render function to display the component if `isHidden` is set to `false`.

This is done by adding this expression to your JSX:

```js
{!this.state.isHidden && <Child />}
```

This will output the Child component if `this.state.isHidden` is `false`. The expression makes use of the `&&` operator, which won't evaluate the second expression if the first expression returns `false` when evaluated.

After that, all you need is a function to toggle the value of `this.state.isHidden` between `true` and `false`, and an event handler that calls the function.

Here's a working example in code:

## The Code

### ES2015

```jsx
class Parent extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  render () {
    return (
      <div>
        <button onClick={this.toggleHidden.bind(this)} >
          Click to show modal
        </button>
        {!this.state.isHidden && <Child />}
      </div>
    )
  }
}

const Child = () => (
<div className='modal'>
      Hello, World!
  </div>
)

const app = document.getElementById('app')
ReactDOM.render(Parent, app)
```

**Note:** this code is using ES2015 features. You'll need to run it through a transpiler like <a rel="noopener" href="https://babeljs.io/" target="newwindow">Babel</a>.

## What's going on?

You have two components - a Parent component and a Child component. The Child component is the component you are going to toggle the visibility of.

You set the initial state of the Parent component to include the property `isHidden`, and set the value to `true`. The conditional statement in the render function returns `false`, and the Child component isn't rendered.

Then you have a `toggleHidden` function. It toggles `isHidden` between `true` and `false`. In this example, thi function will fire when a button is clicked, but you can attach it to whatever you want. Often you'll need to pass it to a child component as a prop.

Once the `toggleHidden` function is fired, the state will update and the component will re render. If `isHidden` is `false`, the Child component will be output in the JSX and rendered in the DOM.

Pretty simple really.

Any questions, leave a comment.

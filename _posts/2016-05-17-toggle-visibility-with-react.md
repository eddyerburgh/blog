---
layout: post
status: publish
published: true
title: Toggle Visibility with React - the Right way
description: It's easy to toggle visibility using React. This tutorial shows you the right way to toggle the visibility of a DOM element using React
wordpress_id: 319
wordpress_url: http://www.coding123.org/?p=319
date: '2016-05-17 14:44:03 +0000'
date_gmt: '2016-05-17 14:44:03 +0000'
categories:
- JavaScript
- Tutorials
tags: []
comments: true
---

It's easy to toggle an element with <a rel="noopener" href="http://api.jquery.com/toggle/" target="newwindow">jQuery</a>, or <a rel="noopener" href="http://codepen.io/eddyerburgh/pen/PNxyrp" target="newwindow">native JavaScript</a>. If you're new to the framework you might be wondering what the best way to toggle visibility with React is. In this tutorial we'll see how to achieve this using conditional rendering.

## The theory

There are three steps to this:


1. Add a property to state called isHidden
2. Trigger a function that toggles the isHidden value between true and false
3. Render the component when isHidden is false

Since React runs through a component each time state has been changed, we can add a conditional that will display the component if isHidden is set to false.

This is done by adding this lovely expression to our JSX:

`{!this.state.isHidden && <Child />}`

This will output the Child component if this.state.isHidden is set to false. The expression makes use of the && property, which won't output the second expresion if the first expression returns false when evaluated. In our case, we're saying if this.state.isHidden is **false**, output . Hey presto - we've outputted the Child component if this.state.isHidden is false.

After that, all we need is a function that toggles the value of this.state.isHidden between true and false, and an event handler that calls on the function.

Let's look at the code:

## The Code

### ES6/7

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

**Note:** this code is using ES6 and ES7 features. You'll need to run it through a transpiler like <a rel="noopener" href="https://babeljs.io/" target="newwindow">Babel</a>.

## What's going on?

We have two components - a Parent component and a Child component. The Child component is the component we are going to toggle the visibility of.

We set the initial state of the Parent component to include the property isHidden, and set the value to true. This means the conditional statement in the render function ill return as false, and the child Component won't be rendered.

Then we have a toggleHidden function. It toggles isHidden between true and false. In this example, this function will fire when the button is pressed, but you can attach it to whatever you want. Often you'll need to pass it to a child component as a prop.

So once our toggleHidden function is fired, the state will update and render will be rerun. If isHidden is false, the Child component will be output in the JSX and rendered in the DOM.

Pretty simple really.

Any questions, leave a comment.

---
layout: post
status: publish
published: true
title: How to unit test Vue components for beginners
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 414
wordpress_url: http://www.coding123.org/?p=414
date: '2017-02-08 17:46:34 +0000'
date_gmt: '2017-02-08 17:46:34 +0000'
categories:
- Tutorials
- Vue
tags: []
comments:
- id: 126
  author: Chad
  author_email: nu.everest@gmail.com
  author_url: ''
  date: '2017-03-18 20:09:21 +0000'
  date_gmt: '2017-03-18 20:09:21 +0000'
  content: "Where do I put the add and subtract functions to be tested?\r\n\r\nThe
    html is being escaped which is a little confusing."
- id: 140
  author: eddyerburgh
  author_email: edward.yerburgh@gmail.com
  author_url: ''
  date: '2017-03-19 09:01:55 +0000'
  date_gmt: '2017-03-19 09:01:55 +0000'
  content: |-
    Hi Chad, sorry for the escaped HTML and JavaScript. I've fixed that.

    The add function is meant for demonstration purposes, no need to put them anywhere.

    If the tutorial wasn't clear, check out the repo to see a working example - https://github.com/eddyerburgh/how-to-unit-test-vue-components-for-beginners
- id: 624
  author: Frank
  author_email: frankxin93@gmail.com
  author_url: ''
  date: '2017-05-16 10:17:18 +0000'
  date_gmt: '2017-05-16 10:17:18 +0000'
  content: Hi ~ Can you get css properties from a dom using Vue component and jsdom
    ?  I get some problems with it.
- id: 722
  author: eddyerburgh
  author_email: edward.yerburgh@gmail.com
  author_url: ''
  date: '2017-05-24 08:13:25 +0000'
  date_gmt: '2017-05-24 08:13:25 +0000'
  content: Hi - short answer is no. If you want to check for complex selectors, you'll
    need to run the tests in the browser - https://github.com/eddyerburgh/avoriaz-karma-mocha-example
- id: 912
  author: Anwar
  author_email: mohammadanwarshah@gmail.com
  author_url: ''
  date: '2017-06-05 12:09:14 +0000'
  date_gmt: '2017-06-05 12:09:14 +0000'
  content: You should have noted that you were using jsdom ^9.10.0. Latest one was
    showing error and I needed to check your repo.
- id: 927
  author: eddyerburgh
  author_email: edward.yerburgh@gmail.com
  author_url: ''
  date: '2017-06-06 06:49:05 +0000'
  date_gmt: '2017-06-06 06:49:05 +0000'
  content: Sorry about this Anwar, I'll update the tutorial
---
You've heard about unit testing, but you're not really sure what it is. No problem!
In this tutorial we'll see what unit tests are, why we write them and how to unit test Vue components. The testing libraries we use will be Mocha, Chai and avoriaz. Let's get started!
*Note: for this tutorial you need to have node installed, if it's not <a href="https://nodejs.org/en/download/" target="_blank">download it here</a>. We also use ES6 syntax, so you should brush up on that if you're not familiar with it*
## What Are Unit Tests?
Unit tests are a way to automatically check that our code does what it's meant to do. We run the code in a controlled environment and assert that functions produce the expected output.
For example, here is an add function:
<pre><code class="javascript">function add(a, b) {
  return a + b;
}</code>
</pre>
We want to test that it does what we expect (return a sum of both parameters). We can write a function that throws an error if add() does not return the sum of a and b.
<pre class=""><code class="javascript">function test() {
  if(add(1,2) !== 3) {
    throw new Error('add should return sum of both parameters')
  }
}</code>
</pre>
Now we can run test() to check our add function works correctly. If add(1,2) does not return 3, an error will be thrown - alerting us that the add function is broken.
At their simplest, this is what unit tests are. Functions checking the result of the function you are testing.
## Why Write Unit Tests?
Now we know what unit tests are, why should we use them?
To explain the benefits of unit tests, let's go back to our example.
We'll add a subtract function, and add a test in our test function:
<pre class=""><code class="javascript">function subtract(a, b) {
  return a - b;
}
function test() {
  if(add(1,2) !== 3) {
    throw new Error('add should return sum of both parameters')
  }
  if(subtract(2, 1) !== 1) {
    throw new Error('subtract should return the difference of both parameters')
  }
}</code>
</pre>
Now we're testing two functions by running our one test function. Much easier than running both functions manually.
Say another programmer edits the subtract function to add a to b. What will happen when they run the test function? They will see the error - 'subtract should return the difference of both parameters'. Straight away they know what function they broke, and how it is supposed to behave.
In large projects there can be thousands of unit tests. This means you can refactor the codebase, run one command and be confident that nothing is broken.
## How to Unit Test Vue Components
Create a new directory with the following structure:
<pre class="" crayon="false"> .
 ├── app
 | └── components
 ├── build
 ├── test
 └── package.json</pre>
The components directory will hold our components. The test directory will hold our test files, and the build directory will hold our webpack config file.
First, we're going to write a passing test.
### Getting Started
Open up the command line and change your current directory to the root of the    project. (Note: If you don't know how to change your working directory, check out <a href="http://askubuntu.com/a/520794" target="_blank">this stackoverflow answer</a> for linux/mac and <a href="http://www.digitalcitizen.life/command-prompt-how-use-basic-commands" target="_blank">this guide</a> for windows).
When you're in the directory, run:
<pre class=""><code class="shell">npm init</code>
</pre>
And follow the prompt (you can just press enter to each question). This generates a package.json. Make sure it exists in the root of your project before we move on.
### Mocha and Chai
Before we add anything to our project, let's take a look at Mocha and Chai.
Mocha is a *test framework*. You define tests in a file and run them from the command line with mocha. Mocha detects tests that throw errors and reports them to you.
Earlier we were testing two functions in our one test function:
<pre class=""><code class="javascript">function test() {
  if(add(1,2) !== 3) {
    throw new Error('add should return sum of both parameters')
  }
  if(subtract(2, 1) !== 1) {
    throw new Error('subtract should return the difference of both parameters')
  }
}</code>
</pre>
Using mocha, we split these out into their own functions.
<pre class=""><code class="javascript">describe('add', () => {
  it('returns sum of parameters a and b', () => {
    if(add(1,2) !== 3) {
      throw new Error('add should return sum of both parameters')
    }
  });
});
describe('subtract', () => {
  it('returns the difference of parameters a and b', () => {
    if(subtract(2, 1) !== 1) {
      throw new Error('subtract should return the difference of both parameters')
    }
  });
});</code>
</pre>
We can then use the mocha command to run both of these tests and report back any tests that failed.
describe groups our test cases. Here we have grouped them by function. it is a test case that Mocha will check.
This is great, but those if statements aren't very expressive. That's where Chai comes in.
Chai is an assertion library. It asserts that a value meets another value and throws an error if it does not.
Using Chai, our example test function becomes:
<pre class=""><code class="javascript">describe('add', () => {
  if(add(1,2) !== 3) {
    expect(add(1, 2)).to.equal(3);
  }
});
describe('subtract', () => {
  if(subtract(2, 1) !== 1) {
    expect(subtract(2, 1)).to.equal(1);
  }
});</code>
</pre>
Much more readable.
Now let's use Chai and Mocha to get a test passing.
In the command line, run:
<pre class=""><code class="shell">npm install --save-dev mocha chai</code>
</pre>
When that's installed, add a new file Foo.spec.js to the test directory and paste the following code.
<pre class=""><code class="javascript">const chai =  require('chai');
const expect = chai.expect;
describe('first test', () => {
  it('is true', () => {
    expect(true).to.equal(true);
  });
});</code>
</pre>
Now we are going to add an <a href="https://medium.com/@mxstbr/npm-scripts-explained-f125e85eb378#.8k1r9ok7a" target="_blank">npm script</a>. Open up package.json. If you used npm init, there will be a scripts.test property, like this:
<pre class=""><code class="json">"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},</code>
</pre>
Edit the test property to look like this:
<pre class=""><code class="json">"scripts": {
  "test": "mocha test/**/*.spec.js --recursive"
},</code>
</pre>
This command runs mocha and tells it to look in the test directory recursively for any file with a .spec.js extension.
Now, from the command line type:
<pre><code class="shell">npm run test</code>
</pre>
You should now see your first passing test!
### Vue component
Let's add our vue component. In the components directory, create a file named Foo.vue.
Copy the code below into Foo.vue:
<pre url="https://raw.githubusercontent.com/eddyerburgh/how-to-unit-test-vue-components-for-beginners/master/app/components/Foo.vue">
</pre>
Great. Now we've got our Vue component to test.
We can't run .vue files natively. We need to compile them into JavaScript first.
In the command line, enter:
<pre class=""><code class="shell">npm install --save vue &&
npm install --save-dev avoriaz babel-core babel-loader babel-preset-es2015 chai css-loader mocha mocha-webpack vue-loader vue-template-compiler webpack</code>
</pre>
Woo boy. That's a lot of dependencies! If you want to know what they do, read the wall of text below!
avoriaz is a vue test utilities library. babel-loader is a webpack loader to transpile our JS with babel. babel-core is used by babel-loader to transpile. babel-preset-2015 lets babel compile es2015. css-loader is a dependency of vue-loader, mocha-webpack compiles files with webpack before running them in mocha. vue-loader is a plugin for webpack that compiles Vue files. vue-template-compiler is a dependency of vue-loader that compiles vue templates into JavaScript. webpack is a build tool that compiles our code.
Don't worry if you didn't read or understand that. Most of these libraries are used to compile our code.
The tool we use for this is webpack. Webpack is a module bundler that takes multiple JavaScript files (modules) and compiles them into a JavaScript file.
In the build directory create a file named webpack.config.js, and paste in the code below:
<pre class=""><code class="javascript">const path = require('path');
module.exports = {
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: [
          path.resolve(__dirname, '../'),
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
};</code>
</pre>
Out the box, webpack does not compile .vue files or es2015, so we have to tell it do that. We also need to tell webpack where out project route is.
If this config file feels like a black box, don't worry. There are hundreds of tutorials on how to set up webpack and what's going on under the hood. For now, we don't need to know exactly what each option does, just that it compiles our .vue modules into browser-friendly code.
Now in package.json, we need to edit the test script to use mocha-webpack:
<pre class=""><code class="javascript">"scripts": {
  "test": "mocha-webpack --webpack-config build/webpack.test.config.js test --recursive"
},</code>
</pre>
mocha-webpack compiles our code with webpack before calling mocha to run our tests.
Run <code>npm run test</code> to make sure everything is working.
Now we have webpack compiling our code before running mocha, we can use ES2015 imports and exports in our test file.
Now let's write a real test. We don't need our passing test anymore so we can delete that.
Open Foo.spec.js and paste this over the previous content:
<pre class=""><code class="javascript">import { expect } from 'chai';
import { mount } from 'avoriaz';
import Foo from '../app/components/Foo.vue';
describe('Foo.vue', () => {
   it('has a root element with class foo', () => {
     const wrapper = mount(Foo);
     expect(wrapper.is('.foo')).to.equal(true)
   })
});</code>
</pre>
This test is asserting that the root element of Foo has the className foo.
Now run <code>npm run test</code>. You will see an error - 'avoriaz must be run in a browser environment'.
avoriaz is the library that gives us the mount method, and it must be run in a browser environment. We're not going to run the tests in chrome - we're going to mock the browser environment in node. We do this with jsdom.
In the command line, run:
<pre class=""><code class="shell">npm install --save-dev jsdom jsdom-global</code>
</pre>
Now add a file named .setup.js in the test directory, and paste in the following code:
<pre><code class="shell">require('jsdom-global')()</code>
</pre>
This function creates a mock document and window object available globally. We need to run it before we run our tests, so that the document object exists in the tests global scope. To do that we need to edit our test script again (last time I promise!):
<pre class=""><code class="json">"scripts": {
  "test": "mocha-webpack --webpack-config build/webpack.test.config.js test --recursive --require test/.setup"
},</code>
</pre>
Now mocha will run the .setup file before running the tests.
Now if you run <code>npm run test</code>, you should have a passing test. Hooray!
Time for some more tests.
Let's look at our current test again.
<pre class=""><code class="javascript">const wrapper = mount(Foo);
expect(wrapper.is('.foo')).to.equal(true)</code>
</pre>
We're using the mount method imported from avoriaz, and then calling <code>is</code> on the wrapper.
Under the hood, mount mounts the Vue component and creates a wrapper class with methods to test the Vue component. Above we use the <a href="https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/is.html" target="_blank">is method</a>, but there are loads more to choose from. Have a look through <a href="https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/" target="_blank">the docs</a> for the full list.
A useful method is find. This searches the wrapper for elements matching a selector and returns an array of wrappers made from the elements found.
<pre><code class="javascript">const wrapper = mount(Foo);
const p = wrapper.find('p')[0];</code>
</pre>
Here, p will be the first
tag found in Foo.
We can also pass props with mount. This is done with the propsData option:
<pre class=""><code class="javascript">const wrapper = mount(Foo, {propsData: {propertyA: 'property'}});</code>
</pre>
Using find and propsData, we can test whether foo correctly renders passedProp in the p tag:
<pre class=""><code class="javascript">it('has a root element with class foo', () => {
  const passedProp = 'some text';
  const wrapper = mount(Foo, {propsData: {passedProp}});
  const p = wrapper.find('p')[0];
  expect(p.text()).to.equal(passedProp)
});</code>
</pre>
Cool! Let's look at one last method - dispatch.
Dispatch dispatches a DOM event to the wrapper root element. In our Foo.vue file, we have a button with id change-message that should change the text of our h1 tag when clicked. Let's write a test to check that it does:
<pre><code class="javascript">it('changes h1 text when #change-text is clicked', () => {
  const wrapper = mount(Foo);
  const changeMessage = wrapper.find('#change-message')[0];
  changeMessage.dispatch('click');
  const h1 = wrapper.find('h1')[0];
  expect(h1.text()).to.equal('new message')
});</code>
</pre>
This test finds the changeMessage button, dispatches a click event and then asserts that the h1 text has changed.
Success!
All together now:
<pre class=""><code class="javascript">import { expect } from 'chai';
import { mount } from 'avoriaz';
import Foo from '../app/components/Foo.vue';
describe('Foo.vue', () => {
   it('has a root element with class foo', () => {
     const wrapper = mount(Foo);
     expect(wrapper.is('.foo')).to.equal(true);
   });
  it('has a root element with class foo', () => {
    const passedProp = 'some text';
    const wrapper = mount(Foo, {propsData: {passedProp}});
    const p = wrapper.find('p')[0];
    expect(p.text()).to.equal(passedProp);
  });
  it('changes h1 text when #change-text is clicked', () => {
    const wrapper = mount(Foo);
    const changeMessage = wrapper.find('#change-message')[0];
    changeMessage.dispatch('click');
    const h1 = wrapper.find('h1')[0];
    expect(h1.text()).to.equal('new message');
  });
});</code>
</pre>
That's all the tests we're going to write in this tutorial. To learn more about unit testing Vue components, see <a href="http://www.coding123.org/tutorials/unit-test-vue-components/" target="_blank">How to unit test Vue components</a>.
A repo for this tutorial is <a href="https://github.com/eddyerburgh/how-to-unit-test-vue-components-for-beginners" target="_blank">available here</a>.

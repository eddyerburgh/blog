---
layout: post
status: publish
published: true
title: Create a responsive bar chart with D3.js
description: This tutorial shows you how to create a responsive bar chart using D3.js.
date: '2016-04-12 22:00:55 +0000'
comments: true
---

In this tutorial you'll learn how to create a responsive bar chart using D3.

_Note: The example uses D3 v3.5.15, but you can use the SVG code for any D3 version_

The final graph looks like this:

<br />

<div id="chart-container"></div>

<script src="https://unpkg.com/d3@3.5.15/d3.min.js"></script>
<script src="/assets/2016/04/d3.js" ></script>

<link rel="stylesheet" type="text/css" href="/assets/2016/04/d3.css" />

## Creating a responsive D3 graph

D3 creates graphs as SVGs.

You create a root `<svg>` element and append it to a container `<div>`:

```js
const svg = d3
  .select('div#chart-container')
  .append('svg')
```

The `<svg>` is the element you need to make responsive. As long as the `<svg>` is responsive, the content you add with D3 will scale automatically.

You can make the `<svg>` responsive by adding a `preserveAspectRatio` attribute of `xMinYMin meet`, and a `viewbox` attribute of `0 0 WIDTH HEIGHT`. Where `WIDTH` and `HEIGHT` are the width and height of your graph.

The HTML would look like this:

```html
<div id="chart-container">
  <svg
    id="chart"
    preserveAspectRatio="xMinYMin meet"
    viewBox="0 0 800 440"
  >
    <!-- -->
  </svg>
</div>
```

You can set the `<svg>` attributes dynamically with D3:

```js
svg
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr(
    'viewBox',
    '0 0 ' +
      (width + margin.left + margin.right) +
      ' ' +
      (height + margin.top + margin.bottom)
  )
```

That's the basic responsive SVG done. The only thing left is to create the graph itself.

You can see the full code for the graph below:

```js
const letters = ['A', 'B', 'C', 'D']
const numbers = [20, 60, 30, 20]
const height = 400
const width = 700
const barWidth = width / numbers.length
const margin = { left: 50, top: 10, right: 50, bottom: 30 }

const getRatio = side => (margin[side] / width) * 100 + '%'

const marginRatio = {
  left: getRatio('left'),
  top: getRatio('top'),
  right: getRatio('right'),
  bottom: getRatio('bottom')
}

const svg = d3
  .select('div#chart-container')
  .append('svg')
  .style(
    'padding',
    marginRatio.top +
      ' ' +
      marginRatio.right +
      ' ' +
      marginRatio.bottom +
      ' ' +
      marginRatio.left +
      ' '
  )
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr(
    'viewBox',
    '0 0 ' +
      (width + margin.left + margin.right) +
      ' ' +
      (height + margin.top + margin.bottom)
  )

const x = d3.scale
  .ordinal()
  .domain(letters)
  .rangeRoundBands([0, width], 0.1, 0.1)

const xAxis = d3.svg
  .axis()
  .scale(x)
  .orient('bottom')

const y = d3.scale
  .linear()
  .domain([d3.max(numbers), 0])
  .range([0, height])

const yAxis = d3.svg
  .axis()
  .scale(y)
  .orient('left')

const bar = svg
  .selectAll('g')
  .data(numbers)
  .enter()
  .append('g')
  .attr('transform', (_, i) => 'translate(' + i * barWidth + ', 0)')

svg
  .append('g')
  .attr('class', 'x axis')
  .call(xAxis)
  .attr('transform', 'translate(0,' + height + ')')
svg
  .append('g')
  .attr('class', 'y axis')
  .call(yAxis)
bar
  .append('rect')
  .attr('class', 'bar')
  .attr('width', barWidth - 1)
  .attr('y', d => y(d))
  .attr('height', d => height - y(d))
```

And there you have it—a responsive bar chart with D3.

If you have any questions, leave a comment. Or get in touch <a rel="noopener" href="https://twitter.com/EddYerburgh">@EddYerbugh</a>

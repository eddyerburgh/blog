"use strict";

var letters = ['A', 'B', 'C', 'D'];
var numbers = [20, 60, 30, 20];
var height = 400;
var width = 700;
var barWidth = width / numbers.length;
var margin = {
  left: 50,
  top: 10,
  right: 50,
  bottom: 30
};

var getRatio = function getRatio(side) {
  return margin[side] / width * 100 + '%';
};

var marginRatio = {
  left: getRatio('left'),
  top: getRatio('top'),
  right: getRatio('right'),
  bottom: getRatio('bottom')
};
var svg = d3.select('div#chart-container').append('svg').style('padding', marginRatio.top + ' ' + marginRatio.right + ' ' + marginRatio.bottom + ' ' + marginRatio.left + ' ').attr('preserveAspectRatio', 'xMinYMin meet').attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom)).attr('id', 'chart');
var x = d3.scale.ordinal().domain(letters).rangeRoundBands([0, width], 0.1, 0.1);
var xAxis = d3.svg.axis().scale(x).orient('bottom');
var y = d3.scale.linear().domain([d3.max(numbers), 0]).range([0, height]);
var yAxis = d3.svg.axis().scale(y).orient('left');
var bar = svg.selectAll('g').data(numbers).enter().append('g').attr('transform', function (_, i) {
  return 'translate(' + i * barWidth + ', 0)';
});
svg.append('g').attr('class', 'x axis').call(xAxis).attr('transform', 'translate(0,' + height + ')');
svg.append('g').attr('class', 'y axis').call(yAxis);
bar.append('rect').attr('class', 'bar').attr('width', barWidth - 1).attr('y', function (d) {
  return y(d);
}).attr('height', function (d) {
  return height - y(d);
});

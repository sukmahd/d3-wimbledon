/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.GoalsScored })])
    .range([0, height])

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d,i) => {
      return xScale(i)
    })
    .attr('y', (d) => {
      return height - yScale(d.GoalsScored)
    })
    .attr('width', 15)
    .attr('height', (d) => {
      return yScale(d.GoalsScored)
    })
}

reload()

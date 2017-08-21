/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40


// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + marginLeft)
  .attr('height', height + margin )

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
  const dataScore = data.map(function(dat){
    return dat.GoalsScored
  })

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataScore)])
  .range(['red', 'yellow'])


  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataScore)])
    .range([0, height + margin])

  const xScale = d3.scaleLinear()
    .domain([0, dataScore.length])
    .range([0, width])

  const yAxis = d3.scaleLinear()
    .domain([0, d3.max(dataScore)])
    .range([height, 0])

  const xAxis = d3.scaleLinear()
    .domain([0, dataScore.length])
    .range([0, width])

  svg.selectAll('rect')
    .data(dataScore)
    .enter()
    .append('rect')
    .attr('fill', colorScale)
    .attr('class', 'bar')
    .attr('x', (d,i) => {
      return xScale(i) + marginLeft - 10
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', function(d,i){
      return xScale(1) - 1
    })
    .attr('height', (d) => {
      return yScale(d)
    })

    svg.append('g')
      .attr('class', 'axisStyle')
      .attr('transform', `translate(${marginLeft - 20})`)
      .call(d3.axisLeft(yAxis).ticks(d3.max(dataScore)))

    svg.append('g')
      .attr('transform', `translate(${marginLeft - 10}, ${height})`)
      .call(d3.axisBottom(xAxis).ticks(dataScore.length))


    //Word cloud

}

reload()

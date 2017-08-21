/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...
  console.log(words)
  d3.select('#top-score')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')')
    .selectAll('text')
      .data(words)
    .enter()
    .append('text')
    .style('font-size', (d) => {
      return d.size + 8 + 'px'
    })
    .style('font-family', 'Impact')
    .style('fill', (d,i) => {
      return fill(i)
    })
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => {
      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
    })
    .text((d) => {
      return d.text
})

}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', (rows) => {
    let list = rows.filter(function(row){
      return row.G > 0
    })
    .map(function(row){
      return { text: row.Name, size: row.G}
    })
    .sort(function(a,b) {
      return d3.descending(a.size, b.size)
    })
    .slice(0, 50)


    d3.layout.cloud().size([width, height])
      .words(list)
      .padding(5)
      .rotate(function() {
        return ~~(Math.random() * 2) * 90
      })
      .font('Impact')
      .fontSize(function(d) {
        return d.size
      })
      .on('end', draw)
      .start()
  })
}

load()

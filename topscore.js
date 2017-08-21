/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...
  cloud().size([960, 500])
    .canvas(function() {return new Canvas(1,1); })
    .words(words)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font('Impact')
    .fontSize(function(d) {return d.score})
}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', (rows) => {
    const list = rows.filter(function(row){
      if(row.G > 0) return {score: row.G, name: row.Name}
    })
    draw(list)
  })
}

load()

import * as d3 from "d3";


const data = [
  {date: new Date("2015-01-01"), fruit: "apples", sales: 3840},
  {date: new Date("2015-01-01"), fruit: "bananas", sales: 1920},
  {date: new Date("2015-01-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-01-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-02-01"), fruit: "apples", sales: 1600},
  {date: new Date("2015-02-01"), fruit: "bananas", sales: 1440},
  {date: new Date("2015-02-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-02-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-03-01"), fruit: "apples", sales: 640},
  {date: new Date("2015-03-01"), fruit: "bananas", sales: 960},
  {date: new Date("2015-03-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-03-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-04-01"), fruit: "apples", sales: 320},
  {date: new Date("2015-04-01"), fruit: "bananas", sales: 480},
  {date: new Date("2015-04-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-04-01"), fruit: "durians", sales: 400}
];

const series = d3.stack()
    .keys(d3.union(data.map(d => d.fruit))) // apples, bananas, cherries, …
    .value(([, group], key) => group.get(key).sales)
  (d3.index(data, d => d.date, d => d.fruit));

console.log('d3.index(data, d => d.date, d => d.fruit)', d3.index(data, d => d.date, d => d.fruit));
console.log('series: ', series);
console.log('series[0].data: ', series[0][0].data);
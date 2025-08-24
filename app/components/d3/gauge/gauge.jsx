import { Component, createRef } from 'react';
import * as d3 from "d3";
// import from './clock.module.css';
import { ds_digital, digital7 } from '@app/styles/fonts';

const gaugeRadius = 200,
    margin = 5,
    w = (gaugeRadius + margin) * 2,
    h = (gaugeRadius + margin) * 2,
    outerRadius = gaugeRadius, 
    innerRadius = outerRadius - 30,
    tickStart = -innerRadius,
    tickLength = 10,
    radians = Math.PI / 180,
    labelRadius = innerRadius - tickLength - 13,
    labelYOffset = 7,
    valueOffset = labelRadius - 30;
     
const pointerWidth = 12.5,
      pointerHead = labelRadius - 20,
      pointerTail = 5;

const pointerPath = d3.line()([
  [pointerWidth / 2, 0],
  [0, -pointerHead],
  [-(pointerWidth / 2), 0],
  [0, pointerTail],
  [pointerWidth / 2, 0]
]);

const color = d3.scaleOrdinal(d3.schemeCategory10); 

const seg2deg = d3.scaleLinear().domain([0, 8]).range([-130, 130]);
const tick2deg = d3.scaleLinear().domain([-4, 4]).range([-130, 130]);

const segments = [
  {range: [0, 2], color: "rgb(40,236,175)"},
  {range: [2, 6], color: "rgb(56,197,245)"},
  {range: [6, 8], color: "rgb(249,71,138)"}
]

const arcSegments = segments.map(seg => ({
  startAngle: seg2deg(seg.range[0]) * radians,
  endAngle: seg2deg(seg.range[1]) * radians
}));

class Gauge extends Component {
  svgRef = createRef();
  constructor(props) {
    super(props);
    this.width = props.width || '100%';
    this.height = 500;
    this.value = props.value || 0;
    this.uom = props.uom || 'Units';
    this.valueRange = props.valueRange || [0, 100];
    this.tick2value = d3.scaleLinear().domain([-4, 4]).range(this.valueRange);
    this.value2deg = d3.scaleLinear().domain(this.valueRange).range([-130, 130]);
  }
  componentDidMount() {
    this.svg = d3.select(this.svgRef.current);
    this.drawGauge();
  }
  componentWillUnmount() {
    this.svg.selectAll("*").remove();
  }
  render() {
    return <svg ref={this.svgRef}
      id="clock"
      className="gauge"
      width={this.width}
      height={this.height}
      viewBox={`0 0 ${w} ${h}`}
      stroke="currentColor"
      fill="currentColor"
      style={{
        maxWidth: "100%",
      }}
    >
    </svg>;
  }

  drawGauge(){
    const svg = this.svg;
    const face = svg
      .append("g")
      .attr("id", "gauge-face")
      .attr("transform", `translate(${[w / 2, h / 2]})`);
  
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    const rim = face
        .append("g")
        .attr("class", "gauge-rim");
  
    rim.selectAll(".gauge-rim-segment")
      .data(arcSegments)
      .join("path")
      .attr("class", "gauge-rim-segment")
      .attr("fill", (d, i) => segments[i].color)
      .attr("stroke", (d, i) => segments[i].color)
      .attr("d", arc)
      .each(function(d) { this._current = d; });
    
    face.selectAll(".gauge-tick")
      .data(d3.range(-4, 5))
      .enter()
      .append("line")
      .attr("class", "gauge-tick")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", tickStart)
      .attr("y2", tickStart + tickLength)
      .attr("stroke-width", 4)
      .attr("stroke", (d, i) => {
        const seg = segments.find(seg => seg.range[0] <= i && seg.range[1] > i);
        return seg ? seg.color : segments[segments.length-1].color;
      })
      .attr("transform", d => `rotate(${tick2deg(d)})`);
  
    face
      .selectAll(".gauge-label")
      .data(d3.range(-4, 5))
      .enter()
      .append("text")
      .attr("class", `gauge-label ${digital7.className}`)
      .attr("text-anchor", "middle")
      .attr("x", d => labelRadius * Math.sin(tick2deg(d) * radians))
      .attr(
        "y",
        d => -labelRadius * Math.cos(tick2deg(d) * radians) + labelYOffset
      )
      .text(d => this.tick2value(d))
      .attr("style", "font-size: 16px; letter-spacing: 3px;");
  
      face.append("path")
        .attr("class", "gauge-pointer")
        .attr("d", pointerPath)
        .attr("fill", "rgb(176, 216, 242")
        .attr("stroke", "rgb(176, 216, 242)")
        .attr("transform", `rotate(${this.value2deg(this.value)})`);
      
      face.append("text")
        .attr("class", `gauge-uom`)
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 70)
        .text(this.uom)
        .attr("style", "font-size: 23px;");
      
      face.append("text")
        .attr("class", `gauge-value ${digital7.className}`)
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", valueOffset)
        .text(this.value)
        .attr("style", "font-size: 30px;");
  
  }
}
 
export default Gauge;

  

 


import { Component, createRef, useRef, useEffect } from 'react';
import * as d3 from "d3";
// import from './clock.module.css';
import { ds_digital, digital7 } from '@app/styles/fonts';

const radians = Math.PI / 180;
const startAngle = -130 , endAngle = 130;
const color = d3.scaleOrdinal(d3.schemeCategory10); 


const segments = [
  {range: [0, 2], color: "rgb(40,236,175)"},
  {range: [2, 6], color: "rgb(56,197,245)"},
  {range: [6, 8], color: "rgb(249,71,138)"}
]

const seg2deg = d3.scaleLinear().domain([0, 8]).range([startAngle, endAngle]);
const tick2deg = d3.scaleLinear().domain([-4, 4]).range([startAngle, endAngle]);

const arcSegments = segments.map(seg => ({
  startAngle: seg2deg(seg.range[0]) * radians,
  endAngle: seg2deg(seg.range[1]) * radians
}));


export default function Gauge({
  width,
  // ringWidth = 10,
  value = 0,
  uom = 'Units',
  valueRange = [0, 100],
  title,
  labelFontSize = 14,
  uomFontSize = 12,
  valueFontSize = 30,
  margin = 10
}) {
  const svgRef = useRef();

  const gaugeRadius = width > 0 ? width / 2 - margin : 0,
    ringWidth = gaugeRadius / 7.866,
    outerRadius = gaugeRadius, 
    innerRadius = outerRadius - ringWidth,
    tickStart = -innerRadius,
    tickLength = 5,
    labelRadius = innerRadius - tickLength - 13,
    labelYOffset = 7,
    // valueOffset = outerRadius - valueFontSize / 2,
    valueOffset = innerRadius,
    // uomOffset = labelRadius - uomFontSize - 5,
    uomOffset = labelRadius/1.6,
    pointerHead = labelRadius - labelFontSize,
    pointerTail = pointerHead / 8.13,
    pointerWidth = pointerHead / 6.75;
    
    // console.log("innerRadius/valueOffset", innerRadius/valueOffset);  
    // console.log("labelRadius/uomOffset", labelRadius/uomOffset);  

  const pointerPath = d3.line()([
    [pointerWidth / 2, 0],
    [0, -pointerHead],
    [-(pointerWidth / 2), 0],
    [0, pointerTail],
    [pointerWidth / 2, 0]
  ]);

  const tick2value = d3.scaleLinear().domain([-4, 4]).range(valueRange);
  const value2deg = d3.scaleLinear().domain(valueRange).range([startAngle, endAngle]);
  useEffect(() => {
    console.log("gauge useEffect", value, width);
    if(!svgRef.current) return;
    if(width <= 0 ) return;
    draw();
    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    }
  }, [value, width]);

  function draw(){
    const svg = d3.select(svgRef.current);
    const face = svg
      .append("g")
      .attr("id", "gauge-face")
      .attr("transform", `translate(${[gaugeRadius, gaugeRadius]})`);
  
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    // face.append("circle")
    //   .attr("cx", 0)         // 设置圆心的 x 坐标
    //   .attr("cy", 0)         // 设置圆心的 y 坐标
    //   .attr("r", innerRadius)           // 设置圆的半径
    //   .attr("stroke", "hsl(var(--card-body))")
    //   .attr("fill", "hsl(var(--card-body))");
  
    const ring = face
        .append("g")
        .attr("class", "gauge-ring");
  
    ring.selectAll(".gauge-ring-segment")
      .data(arcSegments)
      .join("path")
      .attr("class", "gauge-ring-segment")
      .attr("fill", (d, i) => segments[i].color)
      .attr("stroke", (d, i) => segments[i].color)
      .attr("d", arc);
      // .each(function(d) {this._current = d; });
    
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
      .attr("font-size", labelFontSize)
      .text(d =>tick2value(d))
      .attr("style", `letter-spacing: 2px;`);
  
    face.append("path")
      .attr("class", "gauge-pointer")
      .attr("d", pointerPath)
      .attr("fill", "rgb(176, 216, 242")
      .attr("stroke", "rgb(176, 216, 242)")
      .attr("transform", `rotate(${value2deg(value)})`);
    
    face.append("text")
      .attr("class", `gauge-uom`)
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", uomOffset)
      .attr("font-size", uomFontSize)
      .text(uom)
      
      // .attr("style", `font-size: ${uomFontSize};`);
    
    face.append("text")
      .attr("class", `gauge-value ${digital7.className}`)
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", valueOffset)
      .attr("font-size", valueFontSize)
      .text(value)
      // .attr("style", `font-size: ${uomFontSize};`);
  
  }
  return (
  <div className={`bg-card`} style={{padding: `${margin}px`}}>
    {title && <h2 className="font-bold" style={{
      // paddingLeft: `15px`,
      paddingBottom: `${margin/2}px`,
    }}>{title}</h2>}
    <svg ref={svgRef}
      className="gauge"
      width={gaugeRadius*2}
      height={gaugeRadius*2}
      viewBox={`0 0 ${gaugeRadius*2} ${gaugeRadius*2}`}
      stroke="currentColor"
      fill="currentColor"
      style={{
        maxWidth: "100%",
      }}
    >
    </svg>
  </div>
  );
}
 

  
 
 

  

 


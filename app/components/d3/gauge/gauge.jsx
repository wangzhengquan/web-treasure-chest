import { Component, createRef, useRef, useEffect } from 'react';
// import * as d3 from "d3";
import {line, scaleLinear, arc, range, scaleOrdinal, schemeCategory10} from "d3";
// import from './clock.module.css';
import { ds_digital, digital7 } from '@app/styles/fonts';

const radians = Math.PI / 180;
const startAngle = -130 , endAngle = 130;
const color = scaleOrdinal(schemeCategory10); 


const segments = [
  {range: [0, 2], color: "rgb(40,236,175)"},
  {range: [2, 6], color: "rgb(56,197,245)"},
  {range: [6, 8], color: "rgb(249,71,138)"}
]

const seg2deg = scaleLinear().domain([0, 8]).range([startAngle, endAngle]);
const tick2deg = scaleLinear().domain([-4, 4]).range([startAngle, endAngle]);

const arcSegments = segments.map(seg => ({
  startAngle: seg2deg(seg.range[0]) * radians,
  endAngle: seg2deg(seg.range[1]) * radians,
  color: seg.color
}));


export default function Gauge({
  value = 0,
  uom = 'Units',
  valueRange = [0, 100],
  title,
  labelFontSize = 14,
  uomFontSize = 12,
  valueFontSize = 30,
  width,
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
    valueOffset = labelRadius,
    // uomOffset = labelRadius - uomFontSize - 5,
    uomOffset = labelRadius/1.6,
    pointerHead = labelRadius - labelFontSize,
    pointerTail = pointerHead / 8.13,
    pointerWidth = pointerHead / 6.75;
    
    // console.log("innerRadius/valueOffset", innerRadius/valueOffset);  
    // console.log("labelRadius/uomOffset", labelRadius/uomOffset);  

  const pointerPath = line()([
    [pointerWidth / 2, 0],
    [0, -pointerHead],
    [-(pointerWidth / 2), 0],
    [0, pointerTail],
    [pointerWidth / 2, 0]
  ]);

  const tick2value = scaleLinear().domain([-4, 4]).range(valueRange);
  const value2deg = scaleLinear().domain(valueRange).range([startAngle, endAngle]);

  const genArc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  
  return (
  <div className={`bg-card`}>
    {
      title && 
      <h2 className="font-bold" 
        style={{
        padding: `${margin}px ${margin}px 0px`,
        }}>
        {title}
      </h2>
    }
    <svg ref={svgRef}
      className="gauge"
      width={width}
      height={width}
      viewBox={`${-width/2} ${-width/2} ${width} ${width}`}
      stroke="currentColor"
      fill="currentColor"
      style={{
        maxWidth: "100%",
      }}
    >
      
      {
        // arc segments
        arcSegments.map((d, i) => 
          <path key={d.startAngle} fill={d.color} stroke={d.color} d={genArc(d)}/>
        )
      }
      
      {
        range(-4, 5).map((d, i) => 
        <g key={d}>
          {/* ticks */}
          <line x1="0" x2="0" 
            y1={tickStart} y2={tickStart + tickLength} 
            strokeWidth="4" 
            stroke={segments.find(seg => seg.range[0] <= i && seg.range[1] > i)?.color || segments[segments.length-1].color}
            transform={`rotate(${tick2deg(d)})`}
            /> 
          {/* labels */}
          <text className={`${digital7.className}`} 
            textAnchor="middle" 
            x={labelRadius * Math.sin(tick2deg(d) * radians)}
            y={-labelRadius * Math.cos(tick2deg(d) * radians) + labelYOffset}
            fontSize={labelFontSize}
            letterSpacing="2"
            >
            {tick2value(d)}
          </text>
        </g>
        )
      }
      {/* pointer */}
      <path fill="rgb(176, 216, 242)" stroke='rgb(176, 216, 242)' d={pointerPath} transform={`rotate(${value2deg(value)})`}/>
      {/* uom */}
      <text textAnchor="middle" x="0" y={uomOffset} fontSize={uomFontSize}> {uom} </text>
      {/* value */}
      <text className={`${digital7.className}`} 
        textAnchor="middle" 
        alignmentBaseline="middle" 
        x="0" y={valueOffset} 
        fontSize={valueFontSize}> 
        {value} 
      </text>
    </svg>
  </div>
  );
}
 

  
 
 

  

 


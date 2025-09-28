import { Component, createRef, useRef, useEffect } from 'react';
// import * as d3 from "d3";
import {line, scaleLinear, arc, range, scaleOrdinal, format, schemeCategory10} from "d3";
// import from './clock.module.css';
import { ds_digital, digital7 } from '@app/styles/fonts';

const radians = deg => deg * Math.PI / 180;
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
  startAngle: radians(seg2deg(seg.range[0])) ,
  endAngle: radians(seg2deg(seg.range[1])),
  color: seg.color
}));


export function PointerGauge({
  value = 0,
  uom = 'Units',
  valueRange = [0, 100],
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
    // uomOffset = labelRadius - uomFontSize - 5,
    valueOffset = labelRadius/1.6,
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
            x={labelRadius * Math.sin(radians(tick2deg(d)))}
            y={-labelRadius * Math.cos(radians(tick2deg(d))) + labelYOffset}
            fontSize={labelFontSize}
            letterSpacing="2"
            >
            {Math.round(tick2value(d))}
          </text>
        </g>
        )
      }
      {/* pointer */}
      <path fill="rgb(176, 216, 242)" stroke='rgb(176, 216, 242)' d={pointerPath} transform={`rotate(${value2deg(value)})`}/>
       
      <text transform={`translate(0, ${valueOffset})`} 
        textAnchor="middle" 
        alignmentBaseline="middle" 
        fill="currentColor" 
      >
        <tspan y="-0.4em" fontSize={uomFontSize}>{uom}</tspan>
        <tspan x="0" y="0.7em" 
          fontSize={valueFontSize} 
          className={`${digital7.className}`}
        > 
          {value} 
        </tspan>
      </text>
    </svg>
  );
}



export function Gauge({
  value = 0,
  uom = 'Units',
  valueFormat = d => d,
  valueRange = [0, 100],
  angleRange = [-120, 120],
  ticksCount =  50,
  longTickInterval = 5,
  width = 500,
  height = width,
  margin = 10,
  ringWidth = 5,
  trackColor = "rgb(26 121 135)",
  color = "rgb(44 252 251)",
  strokeLinejoin="round", // round, miter, bevel, 
  uomFontSize = 16,
  valueFontSize = 30,
}) {
  const svgRef = useRef(null);
  const ticks = range(ticksCount+1);
  const longTicks = range(0, ticksCount+1, longTickInterval);
  const value2angle = scaleLinear().domain(valueRange).range(angleRange);
  const tick2value = scaleLinear().domain([0, ticksCount]).range(valueRange);
  const tick2angle = scaleLinear().domain([0, ticksCount]).range(angleRange);

  const outerRadius = Math.min(width, height) / 2 - margin,
        innerRadius = outerRadius - ringWidth,
        radius = (innerRadius + outerRadius) / 2;

  const tickStart = innerRadius,
        tickLength = 10,
        longTickStart = innerRadius,
        longTickLength = 15,
        labelRadius = longTickStart - longTickLength - 7,
        labelYOffset = 7,
        valueOffset = labelRadius/1.5;
  // An arc function with all values bound except the endAngle. So, to compute an
  // SVG path string for a given angle, we pass an object with an endAngle
  // property to the arc function, and it will return the corresponding string.
  const genArc = arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(radians(angleRange[0]));

  valueFormat = typeof valueFormat === 'function' ? valueFormat : format(valueFormat);
  
  return (
      <svg ref={svgRef}
        className="bg-card"
        width={width}
        height={height}
        viewBox={`${-width/2} ${-height/2} ${width} ${height}`}
        stroke="currentColor"
        fill="currentColor"
        style={{
          maxWidth: "100%",
        }}
      >
        <g stroke={trackColor}>
          {/* track arc */}
          <path d={genArc({endAngle: radians(angleRange[1])})}
            fill="none"
            strokeWidth={ringWidth}
            strokeLinejoin={strokeLinejoin}
            // strokeLinecap="round"
          /> 
          {/* value arc */}
          <path d={genArc({endAngle: radians(value2angle(value))})}
            fill="none"
            stroke={color}
            strokeWidth={ringWidth}
            strokeLinejoin={strokeLinejoin}
          /> 
          {
            // ticks
            ticks.map(d => (
              <line key={d} 
                x1="0" 
                x2="0" 
                y1={-tickStart}
                y2={-tickStart + tickLength}
                transform={`rotate(${tick2angle(d)})`}
                suppressHydrationWarning/> 
            ))
          }
          {
            // long ticks
            longTicks.map(d => (
              <line key={d}   
                x1="0" 
                x2="0" 
                y1={-longTickStart}
                y2={-longTickStart + longTickLength}
                transform={`rotate(${tick2angle(d)})`}
                suppressHydrationWarning/>
            ))
          }
          { //  labels
          longTicks.map(d => (
            <text key={d}
              textAnchor="middle"
              x={labelRadius * Math.sin(radians(tick2angle(d)))}
              y={-labelRadius * Math.cos(radians(tick2angle(d))) + labelYOffset}
              suppressHydrationWarning
            >
              {tick2value(d)}
            </text>
          ))
        }
        </g>   
        <circle 
          // cx={radius*Math.sin(radians(angleRange[0]))} 
          // cy={-radius*Math.cos(radians(angleRange[0]))} 
          cx={0}
          cy={-radius}
          r={ringWidth} 
          stroke="none" 
          fill={color}
          transform={`rotate(${value2angle(value)})`}
          />
        {/* <text textAnchor="middle" dy="0.35em" fontSize={fontSize} fontWeight="bold">
          {valueFormat(value)}
        </text> */}
        <text transform={`translate(0, ${valueOffset})`} 
          textAnchor="middle" 
          // alignmentBaseline="middle" 
          fill={color}
          stroke={color}
        >
          <tspan x="0" y="-0.4em" fontSize={valueFontSize} > 
            {valueFormat(value)}
          </tspan>
          <tspan x="0" y="0.7em"  fontSize={uomFontSize}>{uom}</tspan>
        </text>
    </svg>
  );
}

 

  
 
 

  

 


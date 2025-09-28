// https://observablehq.com/@d3/arc-tween
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { 
  arc, pie, select, range,  
  map, InternSet,
  format, 
  quantize, interpolateRainbow, interpolateSpectral,
  schemeSpectral,
  scaleOrdinal,
} from "d3";

export function ProgressRingChart({
  value,
  width = 500,
  height = width,
  margin = 10,
  ringWidth = 20,
  // trackColor = "rgb(231 236 239)",
  trackColor="currentColor",
  trackOpacity = 0.1,
  color="url(#myRadialGradient)",
  strokeLinejoin="round", // round, miter, bevel, 
  fontSize="25px",
  counterClockwise = false,

}) {
  const svgRef = useRef(null);
  // https://tauday.com/tau-manifesto
  const tau = 2 * Math.PI; 
  const outerRadius = Math.min(width, height) / 2 - margin,
        innerRadius = outerRadius - ringWidth;
  // An arc function with all values bound except the endAngle. So, to compute an
  // SVG path string for a given angle, we pass an object with an endAngle
  // property to the arc function, and it will return the corresponding string.
  const arcTrack = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);
        
  const arcProgress = arc()
    .innerRadius((innerRadius+outerRadius)/2)
    .outerRadius((innerRadius+outerRadius)/2)
    .startAngle(0);
        
  
  return (
      <svg ref={svgRef}
        className="pie-chart"
        width={width}
        height={height}
        viewBox={`${-width/2} ${-height/2} ${width} ${height}`}
        stroke="currentColor"
        fill="currentColor"
        style={{
          maxWidth: "100%",
        }}
      >
        <defs>
          <linearGradient id="myLinearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(164 212 53)" />    
            <stop offset="100%" stopColor="rgb(109 209 88)" />  
          </linearGradient>

          <radialGradient id="myRadialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgb(164 212 53)" />    
            <stop offset="60%" stopColor="rgb(139 211 66)" />    
            <stop offset="100%" stopColor="rgb(109 209 88)" />   
          </radialGradient>
        </defs>
        <path
          d={arcTrack({endAngle: tau})}
          fill={trackColor}
          // fill="currentColor"
          fillOpacity={trackOpacity}
          stroke="none"
          
        /> 
        <path className=""
          d={arcProgress({endAngle: tau * value})}
          fill="none"
          stroke={color}
          strokeWidth={ringWidth}
          strokeLinejoin={strokeLinejoin}
          // strokeLinecap="round"
          transform={counterClockwise ? "scale(-1,1)" : undefined}
        /> 
        <text textAnchor="middle" dy="0.35em" fontSize={fontSize} fontWeight="bold">
          {format(".0%")(value)}
        </text>
    </svg>
  );
}


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
  outerRadius = Math.min(width, height) / 2 - margin,
  innerRadius = outerRadius * 0.75,
  trackColor = "currentColor",
  color = "rgb(27 175 178)",

}) {
  const svgRef = useRef(null);
  // https://tauday.com/tau-manifesto
  const tau = 2 * Math.PI; 
  // An arc function with all values bound except the endAngle. So, to compute an
  // SVG path string for a given angle, we pass an object with an endAngle
  // property to the arc function, and it will return the corresponding string.
  const arcGen = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
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
        <path
          d={arcGen({endAngle: tau})}
          fill={trackColor}
          stroke="none"
          // fillOpacity={0.1}
        /> 
        <path
          d={arcGen({endAngle: tau * value})}
          fill={color}
          stroke="none"
        /> 
        <text textAnchor="middle" dy="0.35em" fontSize="16px" fontWeight="bold">
          {format(".0%")(value)}
        </text>
    </svg>
  );
}


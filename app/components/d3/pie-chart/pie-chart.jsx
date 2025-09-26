// https://observablehq.com/@d3/pie-chart-component
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import * as d3 from "d3";
import { 
  arc, pie, select, range,  
  map, InternSet,
  format, 
  quantize, interpolateRainbow, interpolateSpectral,
  schemeSpectral,
  scaleOrdinal
} from "d3";

export default function PieChart({
  data,
  name = ([x]) => x,  
  value = ([, y]) => y,  
  valueFormat = ",", // a format specifier for values (in the label)
  width = 400,
  height = width,
  margin = 10,
  outerRadius = Math.max(Math.min(width, height) / 2 - margin, 0), // outer radius of pie, in pixels
  innerRadius = 0, // inner radius of pie, in pixels (non-zero for donut)
  labelRadius = (innerRadius * 0.5 + outerRadius * 0.5), // center radius of labels
  names, // array of names (the domain of the color scale)
  colors, // array of colors for names
  stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
  strokeWidth = 1, // width of stroke separating wedges
  strokeLinejoin = "round", // line join of stroke separating wedges
  padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges, in radians
}) {
  const svgRef = useRef(null);
  // Compute values.
  const N = map(data, name);
  const V = map(data, value);
  const I = range(N.length).filter(i => !isNaN(V[i]));

  // Unique the names.
  if (names === undefined) names = N;
  names = new InternSet(names);
  // if (colors === undefined) colors = schemeSpectral[names.size];
  // if (colors === undefined) colors = quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
  if (colors === undefined) colors = range(names.size).map(i => interpolateRainbow(i / (names.size)));
  // Construct scales.
  const color = scaleOrdinal(names, colors);

  const formatValue = typeof valueFormat === 'function' ? valueFormat : format(valueFormat);

   // Construct arcs.
   const arcs = pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
   const arcPie = arc().innerRadius(innerRadius).outerRadius(outerRadius);
   const arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);
 
  function handleMouseEnter(event){
    // setTooltipData([name(d.data), value(d.data)]);
    console.log('event.target', event.target);
    select(event.target)
      .transition()
      .duration(200)
      .attr("transform", "scale(1.05)");
  }

  function handleMouseLeave(event){
    // setTooltipData([name(d.data), value(d.data)]);
    select(event.target)
      .transition()
      .duration(200)
      .attr("transform", "scale(1)");
  }
  
  return (
    <svg ref={svgRef}
      className="pie-chart"
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
      arcs.map((d) => (
        <g key={N[d.data]}>
          <path d={arcPie(d)} 
            fill={color(N[d.data])} 
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin={strokeLinejoin}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <title>{`${N[d.data]}\n${formatValue(V[d.data])}`}</title>
          </path>
          <text transform={`translate(${arcLabel.centroid(d)})`} 
            textAnchor="middle" alignmentBaseline="middle" 
            fontSize={12} fill="currentColor" >
            <tspan y="-0.4em" fontWeight="bold">{N[d.data]}</tspan>
            {
              (d.endAngle - d.startAngle) > 0.25 && 
              <tspan x="0" y="0.7em" fillOpacity="0.7">{formatValue(V[d.data])}</tspan>
            }
          </text>
        </g>
      ))
    }
       
    </svg>
  );
}
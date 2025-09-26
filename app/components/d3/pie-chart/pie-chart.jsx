// https://observablehq.com/@d3/pie-chart-component
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import * as d3 from "d3";
import { 
  arc, pie, select, interpolateRainbow, map, range, InternSet,
  quantize, interpolateSpectral, format, scaleOrdinal
} from "d3";
export default function PieChart({
  data,
  title,
  name = ([x]) => x,  
  value = ([, y]) => y,  
  valueFormat = ",", // a format specifier for values (in the label)
  // color,
  width = 400,
  height = width,
  margin = 10,
  innerRadius = 0, // inner radius of pie, in pixels (non-zero for donut)
  outerRadius = Math.max(Math.min(width, height) / 2 - margin, 0), // outer radius of pie, in pixels
  labelRadius = (innerRadius * 0.4 + outerRadius * 0.6), // center radius of labels
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
  //interpolateRainbow
  if (colors === undefined) colors = quantize(t => interpolateRainbow(t * 0.8 + 0.1), names.size);
  // Construct scales.
  const color = scaleOrdinal(names, colors);

  const formatValue = typeof valueFormat === 'function' ? valueFormat : format(valueFormat);

   // Construct arcs.
   const arcs = pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
   const arcPie = arc().innerRadius(innerRadius).outerRadius(outerRadius);
   const arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);
 
  function handleMouseEnter(event){
    // setTooltipData([name(d.data), value(d.data)]);
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
    <div className={`bg-card`} >
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
      <g stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin={strokeLinejoin}
        
      >
      {
        arcs.map((d) => (
          <path key={d.data} d={arcPie(d)} 
            // fill={color ? color(name(d.data)) : interpolateRainbow(i / data.length)} 
            fill={color(N[d.data])}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <title>{`${N[d.data]}\n${formatValue(V[d.data])}`}</title>
          </path>
        ))
      }
      </g>

      <g fontSize="12"
        textAnchor="middle" 
        // alignmentBaseline="middle"
        fill="white" 
        stroke="white"
      >
      {
        arcs.map((d) => (
          <text key={d.data} 
            transform={`translate(${arcLabel.centroid(d)})`}  
          >
            <tspan fontWeight="bold">{N[d.data]}</tspan>
            {
              (d.endAngle - d.startAngle) > 0.25 && 
              <tspan x="0" y="1.1em" >{formatValue(V[d.data])}</tspan>
            }
            
          </text>
        ))
      }
      </g>
    </svg>
  </div>
  );
}
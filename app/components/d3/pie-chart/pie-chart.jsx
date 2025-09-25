// https://observablehq.com/@d3/pie-chart-component
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import * as d3 from "d3";
import { arc, pie, select, interpolateRainbow } from "d3";
export default function PieChart({
  title,
  data,
  name = ([x]) => x,  
  value = ([, y]) => y,  
  color,
  width = 400,
  margin = 10,
  
}) {
  const svgRef = useRef(null);
  // const tooltipRef = useRef(null);
  // const [tooltipData, setTooltipData] = useState([]);
  let outerRadius =  width / 2 - margin;
  outerRadius = outerRadius < 0 ? 0 : outerRadius;
  const genPie = pie()
      .sort(null)
      .value(value);

  const genArc = arc()
    .innerRadius(0)
    .outerRadius(outerRadius);

  const arcs = genPie(data);

  const labelRadius = genArc.outerRadius()() * 0.6;
  // A separate arc generator for labels.
  const labelArc = arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);
 
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
      {
        arcs.map((d, i) => {
          return (
            <g key={name(d.data)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <path d={genArc(d)} fill={color ? color(name(d.data)) : interpolateRainbow(i / data.length)} stroke="#fff" strokeWidth={1}>
                <title>{`${name(d.data)}: ${value(d.data)}`}</title>
              </path>
              <text transform={`translate(${labelArc.centroid(d)})`} textAnchor="middle" alignmentBaseline="middle" fontSize={12} fill="white" stroke="white">
                <tspan y="-0.4em" fontWeight="bold">{name(d.data)}</tspan>
                {
                  (d.endAngle - d.startAngle) > 0.25 && <tspan x="0" y="0.7em" fillOpacity="0.7">{value(d.data)}</tspan>
                }
                
              </text>
            </g>
          );
        })
      }
    </svg>
  </div>
  );
}
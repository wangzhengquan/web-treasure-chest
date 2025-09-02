import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
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
  const pie = d3.pie()
      .sort(null)
      .value(value);
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(outerRadius);

  const arcs = pie(data);

  const labelRadius = arc.outerRadius()() * 0.6;
  // A separate arc generator for labels.
  const labelArc = d3.arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

  // useEffect(() => {
  //   if(!svgRef.current) return;
  //   if(outerRadius <= 0) return;

  //   draw();
  //   return () => {
  //     // 移除所有由 D3 创建的子元素，防止重复渲染
  //     d3.select(svgRef.current).selectAll("*").remove();
  //   };
    
  // }, [data, width]);
 
  function handleMouseEnter(event){
    // setTooltipData([name(d.data), value(d.data)]);
    console.log("mouseover", event, this);
    d3.select(event.target)
      .transition()
      .duration(200)
      .attr("transform", "scale(1.05)");
  }

  function handleMouseLeave(event){
    // setTooltipData([name(d.data), value(d.data)]);
    d3.select(event.target)
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
              <path d={arc(d)} fill={color ? color(name(d.data)) : d3.interpolateRainbow(i / data.length)} stroke="#fff" strokeWidth={1}>
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
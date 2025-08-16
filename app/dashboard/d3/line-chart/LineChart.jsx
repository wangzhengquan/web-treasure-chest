'use client';

import { useEffect, useRef } from "react";
import * as d3 from "d3";
 

export default function LineChart({data, width = 928, height = 500}) {
  // console.log("data=====", data);
  const svgRef = useRef(null);
  useEffect(() => {
    if(!svgRef.current) return;
     // Declare the chart dimensions and margins.
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.close)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));
    const svg = d3.select(svgRef.current);
   
    // Add the x-axis.
    svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Daily close ($)"));
    // Append a path for the line.
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    return () => {
      // 移除所有由 D3 创建的子元素，防止重复渲染
      svg.selectAll("*").remove();
    };
    
  }, []);

  return (
     
    <svg ref={svgRef}
      width={"100%"}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        maxWidth: "100%",
        height: "auto",
        fontFamily: "sans-serif",
        fontSize: "10px",
      }}
    >
    </svg>
  );
}

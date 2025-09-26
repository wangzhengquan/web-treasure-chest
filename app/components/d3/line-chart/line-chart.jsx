'use client';

import { useEffect, useLayoutEffect, useRef, useState, forwardRef} from "react";
import {
  curveLinear, curveNatural, curveMonotoneX, curveStep, 
  scaleUtc, scaleLinear, scalePoint, scaleQuantize, scaleOrdinal,
  map, InternSet, InternMap, range,
  extent, max, line,  
  sort,
  group, pointer, least, interpolateRound, easeBounce
} from "d3";
import {RectLegend as Legend} from '../legend';
import {  AxisBottom, AxisLeft } from "../axis";
import { cn } from "@app/lib/utils";

// 1. Create a mapping from string identifiers to D3 curve functions
const curveMap = {
  linear: curveLinear,
  natural: curveNatural,
  monotoneX: curveMonotoneX,
  step: curveStep,
  // Add any other curves you want to support
};


 

export function LineChart({
  data,
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  // title, // title of the chart
  defined, // for gaps in data
  curve = "linear", // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 800, // outer width, in pixels
  height = 600, // outer height, in pixels
  xType = scaleUtc, // type of x-scale
  xDomain, // [xmin, xmax]
  xFormat = d => d, // a format function for the x-axis
  yType = scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yFormat = d => d, // a format function for the y-axis
  yLabel, // a label for the y-axis
  zDomain, // array of z-values
  colors , // stroke color of line, as a constant or a function of *z*
  strokeLinecap, // stroke line cap of line
  strokeLinejoin, // stroke line join of line
  strokeWidth = 1.5, // stroke width of line
  strokeOpacity, // stroke opacity of line
  mixBlendMode = "normal", // blend mode of lines
  // 定义色块和间距的尺寸
  legend=true, // 是否显示图例
  showVertices = true, // show showV(points) on the line?
  showTooltip = true, // show tooltip on hover?
  className,
  style,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const dashlineRef = useRef(null);
  const [tooltipProps, setTooltipProps] = useState({
    title: "",
    data: [],
    open: false,
    x: 0,
    y: 0,
  });
  
  let visHeight = height - marginTop - marginBottom,
      visWidth = width - marginLeft - marginRight; //width is basically max-width
  visHeight = visHeight < 0 ? 0 : visHeight;
  visWidth = visWidth < 0 ? 0 : visWidth;

  const xRange = [0, visWidth]; // [left, right]
  const yRange = [visHeight, 0]; // [bottom, top]
  const X = map(data, x);
  const Y = map(data, y);
  const Z = map(data, z);
  const O = map(data, d => d);
  if (defined === undefined) defined = (d, i) => X[i] && Y[i];
  const D = map(data, defined);

  // Compute default domains, and unique the z-domain.
  if (xDomain === undefined) {
    if (xType === scalePoint){
      xDomain = X.filter((d, i, a) => a.indexOf(d) === i);
      xDomain.sort();
      // console.log("xDomain", xDomain)
    } else {
      xDomain = extent(X);
    }
  }
  if (yDomain === undefined) yDomain = [0, max(Y, d => typeof d === "string" ? +d : d)];
  if (zDomain === undefined) zDomain = Z;
  zDomain = new InternSet(zDomain);
  
  // Omit any data not present in the z-domain.
  const I = range(X.length).filter(i => zDomain.has(Z[i]));
// console.log("I", I)
  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  if(!xScale.invert) {
    xScale.invert = scaleQuantize(xRange, xDomain);
    // const invert = scaleLinear().domain([0, visWidth]).range([0, xDomain.length-1]).interpolate(interpolateRound).clamp(true);
    // xScale.invert = xm => xDomain[invert(xm)]; 
  }

  if (!colors) colors = schemeSpectral[zDomain.size];
  const color = scaleOrdinal(zDomain, colors);

  // Compute names.
  const T = Z;
  // Construct a line generator.
  const genLine = line()
      .defined(i => D[i])
      .curve(curveMap[curve])
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

  const goupI= Array.from(group(I, i => Z[i]));
  
  function moveTooltip(event) {
    const dashline = dashlineRef.current;
    const tooltip = tooltipRef.current;
    const container = containerRef.current;
    const [xm, ym] = pointer(event);
    const [offsetX, offsetY] = pointer(event, container);
    const xValue = xScale.invert(xm);
    const containrRect = container.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    const xI = sort(I.filter((i) => X[i] === xValue), i => Z[i]);
    // dashline
    // .transition()           
    // .duration(200) 
    // .ease(easeBounce)
    // .attr("x1", xScale(xValue))
    // .attr("x2", xScale(xValue));
    dashline.setAttribute("transform",  `translate(${xScale(xValue)}, 0)`);
    
    const offset = 20;
    let tooltipX = offsetX + offset, tooltipY = offsetY + offset;
    if (tooltipX + tooltipRect.width > containrRect.width) {
      tooltipX = offsetX - tooltipRect.width - offset; 
    }
    if (tooltipY + tooltipRect.height > containrRect.height) {
      tooltipY = offsetY - tooltipRect.height - offset;
    }
    setTooltipProps({
      open: true,
      title: xFormat(xValue),
      data: xI.map(i => ({
        name: T[i],
        value: Y[i],
        color: typeof color === "function" ? color(Z[i]) : color,
      })),
      x: tooltipX,
      y: tooltipY,
    });
    // tooltip.style.setProperty("transform",  `translate(${tooltipX}px, ${tooltipY}px)`);
  }

  function pointermoved(event) {
    if (showTooltip) {
      moveTooltip(event); 
    }
  }

  function pointerentered(event) {
    if (showTooltip) {
      moveTooltip(event);
      dashlineRef.current.setAttribute("display", null);
    }
  }

  function pointerleft() {
    dashlineRef.current.setAttribute("display", "none");
    setTooltipProps({open: false, title: "", data: [], x: 0, y: 0});
  }

  function pointerEnterLegend(event, z) {
    const paths = svgRef.current.querySelectorAll(".path");
    for (const path of paths) {
      const pathZ = path.getAttribute("data-z");
      path.style.opacity = pathZ === z ? "1" : "0.3";
    }
    const vertices = svgRef.current.querySelectorAll(".vertex");
    for (const vertex of vertices) {
      const i = vertex.getAttribute("data-i");
      vertex.style.opacity = Z[i] === z ? "1" : "0.3";
    }
    // console.log('pointerEnterLegend', select(svgRef.current).selectAll(".path").datum(function() { return this.dataset; }).data());
    // select(svgRef.current).selectAll(".path").style("opacity", ({key}) => {
    //   console.log("key, z", key, z);
    //   return key === z ?  "1": "0.3"
    // });
    // select(svgRef.current).selectAll(".path").style("opacity", ({key}) => key === z ?  "1": "0.3");
    // if(showVertices) select(".vertex").style("opacity", i => Z[i] === z ? "1" : "0.3");
  }

  function pointerLeaveLegend() {
    const paths = svgRef.current.querySelectorAll(".path");
    for (const path of paths) {
      path.style.opacity = "1";
    }
    const vertices = svgRef.current.querySelectorAll(".vertex");
    for (const vertex of vertices) {
      vertex.style.opacity = "1";
    }
  }

  return (
  (width <= 0 ) ? "" :
  <figure ref={containerRef} className={cn("relative bg-card pb-[10px]", className)} style={style}>
    <svg ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      stroke= "currentColor"
      style={{
        maxWidth: "100%",
        WebkitTapHighlightColor: "transparent",
      }}
    >
       
      <g transform={`translate(${marginLeft}, ${marginTop})`}
        onPointerEnter={pointerentered}
        onPointerLeave={pointerleft}
        onPointerMove={pointermoved}
      >
        <rect width={visWidth} height={visHeight} stroke="none" fill="var(--card-body-color)"/>
        
        <AxisBottom scale={xScale} ticks={[visWidth / 80]} tickFormat={xFormat} tickSizeOuter={0} transform={`translate(0, ${visHeight})`} backgroundLine={-visHeight}/>
        <AxisLeft scale={yScale} ticks={[visHeight / 30]} tickFormat={yFormat} tickSizeOuter={0} backgroundLine={visWidth}>
          <text fill="currentColor" textAnchor="start">{yLabel}</text>
        </AxisLeft>
        {/* pathGroup */}
        <g fill="none" 
          stroke={typeof color === "string" ? color : null}>
          strokeLinecap={strokeLinecap} 
          strokeLinejoin={strokeLinejoin} 
          strokeWidth={strokeWidth}
          strokeOpacity={strokeOpacity}
          {
            // paths
            goupI.map(([z, d]) => 
              <path key={z} 
                data-z={z}
                data-d={d}
                className="path"
                stroke={typeof color === "function" ? color(z) : color}
                style={{mixBlendMode: mixBlendMode}}
                d={genLine(sort(d, i => X[i]))}
                />
            )
          }
          {
            showVertices && I.map(i => 
              <circle key={i}
                data-i={i}
                className="vertex"
                cx={xScale(X[i])}
                cy={yScale(Y[i])}
                r={3}
                fill="white"
                stroke={typeof color === "function" ? color(Z[i]) : color}
              />
            )
          }
        </g>
        {/* dashline */}
        <line ref={dashlineRef} y2={visHeight} strokeWidth="1" strokeDasharray="5, 5" display="none"
          style={{
            transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
          }}/> 
      </g>
    </svg>
    { (legend && zDomain.size > 1) && 
      <Legend 
        data={Array.from(zDomain)}
        color={color}
        onPointerEnter={pointerEnterLegend}
        onPointerLeave={pointerLeaveLegend}
      />
    }

    <Tooltip ref={tooltipRef} {...tooltipProps}/>
  </figure>
  );
}


export const Tooltip= forwardRef(function ({ 
  title,
  data,
  open,
  x, y,
}, ref) {
  return (
    <div ref={ref} className="p-[10px] bg-card-body border border-border rounded shadow shadow-shadow"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 999,
        left: 0,
        top: 0,
        transform:  `translate(${x}px, ${y}px)`,
        transition: "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        opacity: open ? 1 : 0,
        display: open ? "block" : "none",
      }}>
       
      <h3 className="font-semibold">{title}</h3>
      {
        data.map( (d, i) => (
          <div key={d.name} className="mt-[10px] block" style={{lineHeight: 1}}>
            <span className="w-[10px] h-[10px] rounded-full inline-block" style={{backgroundColor: d.color, lineHeight: 1}}/>
            <span className="inline-block ml-[6px]" style={{lineHeight: 1}}>{d.name}</span>
            <span className="font-semibold  text-right inline-block ml-[20px] float-right" style={{lineHeight: 1}}>{d.value}</span>
          </div>
        ) )
      }
       {/* //flex items-center justify-between gap-4 */}
    </div>
  );  
});


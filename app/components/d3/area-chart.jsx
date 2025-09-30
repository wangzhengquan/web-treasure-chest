// https://observablehq.com/@d3/area-chart
// https://observablehq.com/@d3/stacked-area-chart

import { useEffect, useLayoutEffect, useRef, useState, forwardRef} from "react";
import {
  format, area, pointer, easeBounce,
  scaleUtc, scaleLinear, scalePoint, scaleQuantize, scaleBand, scaleOrdinal,
  map, InternSet, InternMap, range,
  extent, max, line,  
  sort,
  group, rollup,
  stack, stackOffsetDiverging, stackOrderNone,
  schemeTableau10, schemeSpectral, interpolateRainbow
} from "d3";
import {RectLegend as Legend} from "./legend";
import {  AxisBottom, AxisLeft } from "./axis";
import Tooltip from './tooltip';
import { cn } from "@app/lib/utils";

export function StackedAreaChart({
  data,
  x = ([x]) => x, // given d in data, returns the (ordinal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xType = scalePoint, // type of x-scale
  xDomain, // array of x-values
  xFormat = d => d, // a format specifier string for the x-axis
  yType = scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yFormat = d => d, // a format specifier string for the y-axis
  zDomain, // array of z-values
  zFormat = d => d,
  offset = stackOffsetDiverging, // stack offset method
  order = stackOrderNone, // stack order method
  yLabel, // a label for the y-axis
  colors, // array of colors
  areaOpacity = 0.5, // fill opacity of area
  showVertices = true, // whether to show vertices
  showTooltip = true, // whether to show a tooltip
  // 定义色块和间距的尺寸
  legend=true, // 是否显示图例
  className,
  style,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const verticalDashlineRef = useRef(null);
  const horizontalDashlineRef = useRef(null);
  const tooltipRef = useRef(null);
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
  // Compute default x- and z-domains, and unique them.
  if (xDomain === undefined) {
    if (xType === scalePoint){
      xDomain = X;
      xDomain = new InternSet(xDomain);
      // xDomain.sort((a, b) => ascending(a, b));
      // xDomain = sort(xDomain, d => d);
      // console.log("xDomain", xDomain)
    } else {
      xDomain = extent(X);
    }
  }
  if (zDomain === undefined) zDomain = Z;
  zDomain = new InternSet(zDomain);

  // Omit any data not present in the x- and z-domains.
  const I = range(X.length).filter(i => zDomain.has(Z[i]));
  // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
  // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
  // each tuple has an i (index) property so that we can refer back to the
  // original data point (data[i]). This code assumes that there is only one
  // data point for a given unique x- and z-value.
  const series = stack()
      .keys(zDomain)
      .value(([x, g], z) => Y[g.get(z)])
      .order(order)
      .offset(offset)
    (rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => {
      let s2 = s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})); 
      s2.key = s.key; 
      return s2;
    });
    
  // const a =  rollup(data, ([d]) => d, d => x(d), d => z(d))
  // console.log('a======', a);
  // for (const d of a) {
  //   console.log('d======', d);
  // }
  // const series2 = stack()
  //     .keys(zDomain)
  //     .value(([x, g], z) => y(g.get(z)))
  //     .order(order)
  //     .offset(offset)(a)
  
  // console.log('series======', series);
  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  if(!xScale.invert) {
    xScale.invert = scaleQuantize(xRange, xDomain);
    // const invert = scaleLinear().domain([0, visWidth]).range([0, xDomain.length-1]).interpolate(interpolateRound).clamp(true);
    // xScale.invert = xm => xDomain[invert(xm)]; 
  }
  // if (!colors) colors = schemeSpectral[zDomain.size];
  if (!colors) colors = range(zDomain.size).map(i => interpolateRainbow(i / (zDomain.size)));
  if (!Array.isArray(colors)) colors = [colors];
  const color = scaleOrdinal(zDomain, colors);

  const genArea = area()
      .x(({i}) => xScale(X[i]))
      .y0(([y0]) => yScale(y0))
      .y1(([, y1]) => yScale(y1));

  const genLine = line()
    .x(({i}) => xScale(X[i]))
    .y(([, y]) => yScale(y));

  xFormat = typeof xFormat === 'string' ? format(xFormat) : xFormat;
  yFormat = typeof yFormat === 'string' ? format(yFormat) : yFormat;
  zFormat = typeof zFormat === 'string' ? format(zFormat) : zFormat;
  // Compute tooltipFormat.
  function moveTooltip(event) {
    if(event.touches){
      Object.assign(event, {clientX: event.touches[0].clientX, clientY: event.touches[0].clientY});
    }
    const verticalDashline = verticalDashlineRef.current;
    const horizontalDashline = horizontalDashlineRef.current;
    const tooltip = tooltipRef.current;
    const container = containerRef.current;
    const [xm, ym] = pointer(event);
    const [offsetX, offsetY] = pointer(event, container);
    const xValue = xScale.invert(xm);
    const containrRect = container.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const xI = I.filter((i) => X[i] === xValue);
    // dashline
    // .transition()           
    // .duration(200) 
    // .ease(easeBounce)
    // .attr("x1", xScale(xValue))
    // .attr("x2", xScale(xValue));
    verticalDashline.setAttribute("transform",  `translate(${xScale(xValue)}, 0)`);
    horizontalDashline.setAttribute("transform",  `translate(0, ${ym})`);
    
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
        name: zFormat(Z[i]),
        value: yFormat(Y[i]),
        color: color(Z[i]),
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
      verticalDashlineRef.current.setAttribute("display", null);
      horizontalDashlineRef.current.setAttribute("display", null);
    }
  }

  function pointerleft() {
    verticalDashlineRef.current.setAttribute("display", "none");
    horizontalDashlineRef.current.setAttribute("display", "none");
    setTooltipProps({open: false, title: "", data: [], x: 0, y: 0});
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
        onMouseLeave={pointerleft}
        onMouseMove={pointermoved}
        onTouchMove={pointermoved}
        onTouchEnd={pointerleft}
      >
        <rect width={visWidth} height={visHeight} stroke="none" fill="var(--card-body-color)"/>
        
        <AxisBottom showDomainLine={false} scale={xScale} tickFormat={xFormat}  transform={`translate(0, ${visHeight})`} />
        <AxisLeft showDomainLine={false} scale={yScale} ticks={visHeight / 30} tickFormat={yFormat} backgroundLine={visWidth} >
          <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">{yLabel}</text>
        </AxisLeft>
        {
          series.map((s) => (
            // s[0].i === s.key
            <path key={s[0].i} 
              // stroke={color(Z[s[0].i])} 
              stroke="none"
              fill={color(Z[s[0].i])} 
              fillOpacity={areaOpacity} 
              d={genArea(s)}>
              <title>{zFormat(Z[s[0].i])}</title>
            </path>
          ))
        }
        {
          series.map((s) => (
            // s[0].i === s.key
            <path key={s[0].i + "-line"} 
              stroke={color(Z[s[0].i])} 
              strokeWidth="1"
              fill="none" 
              d={genLine(s)}/>
             
          ))
        }
        {
          showVertices && series.flatMap(s => 
            s.map((arr)=>{
              const [y0, y1] = arr;
              const {i} = arr;
              return (
                <circle key={i}
                  data-i={i}
                  cx={xScale(X[i])}
                  cy={yScale(y1)}
                  r={3}
                  fill="white"
                  stroke={color(Z[i])}
                  strokeWidth="2"
                />
              )
            }
          ))
        }
        <line ref={verticalDashlineRef} y2={visHeight} strokeWidth="1" strokeDasharray="5, 5" display="none"
          style={{
            transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
          }}
        />  
        <line ref={horizontalDashlineRef} x2={visWidth} strokeWidth="1" strokeDasharray="5, 5" display="none" /> 
        
      </g>
    </svg>
    { (legend && zDomain.size > 1) && 
      <Legend data={Array.from(zDomain)} color={color}/>
    }
     <Tooltip ref={tooltipRef} {...tooltipProps}/>
  </figure>
  );
}
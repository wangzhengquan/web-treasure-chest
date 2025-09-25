// https://observablehq.com/@d3/stacked-bar-chart
// https://observablehq.com/@d3/grouped-bar-chart
'use client';

import { useEffect, useLayoutEffect, useRef, useState, forwardRef} from "react";
import {
  curveLinear, curveNatural, curveMonotoneX, curveStep, 
  select,
  scaleUtc, scaleLinear, scalePoint, scaleQuantize, scaleBand, scaleOrdinal,
  map, InternSet, InternMap, range,
  extent, max, line,  
  sort,
  group, rollup,
  pointer, least, interpolateRound, easeBounce,
  stack, stackOffsetDiverging, stackOrderNone,
  schemeTableau10, schemeSpectral
} from "d3";

import {RectLegend as Legend} from "../legend";
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


export function BarChart({
  data,
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  title, // chart title
  tooltip, // given d in data, returns the tooltip text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values
  xPadding = 0.3, // amount of x-range to reserve to separate bars
  yType = scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  xFormat = d => d, // a format specifier string for the x-axis
  yFormat = d => d, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors=["currentColor"], // array of colors
  // 定义色块和间距的尺寸
  legend=true, // 是否显示图例
  className,
  style,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  
  let visHeight = height - marginTop - marginBottom,
      visWidth = width - marginLeft - marginRight; //width is basically max-width
  visHeight = visHeight < 0 ? 0 : visHeight;
  visWidth = visWidth < 0 ? 0 : visWidth;

  const xRange = [0, visWidth]; // [left, right]
  const yRange = [visHeight, 0]; // [bottom, top]
  const X = map(data, x);
  const Y = map(data, y);
  // Compute default x- and z-domains, and unique them.
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = [0, Math.ceil(max(Y))];
  xDomain = new InternSet(xDomain);

  // Omit any data not present in the x-domain.
  const I = range(X.length).filter(i => xDomain.has(X[i]));

  // Construct scales, axes, and formats.
  const xScale = scaleBand(xDomain, xRange).paddingInner(xPadding);
  const yScale = yType(yDomain, yRange);
  if (!colors) colors = schemeSpectral[xDomain.size];
  const color = scaleOrdinal(xDomain, colors);

  // Compute tooltip.
  if (tooltip === undefined) {
    const format = typeof yFormat === 'string' ? yScale.tickFormat(100, yFormat) : yFormat;
    tooltip = i => `${X[i]}: ${format(Y[i])}`;
  } else {
    const O = map(data, d => d);
    const T = title;
    tooltip = i => T(O[i], i, data);
  }
 

  return (
  (width <= 0 ) ? "" :
  <figure ref={containerRef} className={cn("relative bg-card pb-[10px]", className)} style={style}>
    { title && 
      <h2 className="font-bold" 
        style={{
          paddingTop: `${marginTop}px`,
          paddingLeft: `15px`,
          paddingRight: `${marginRight}px`,
        }}
      >
        {title}
      </h2>
    }
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
       
      <g transform={`translate(${marginLeft}, ${marginTop})`} >
        <rect width={visWidth} height={visHeight} stroke="none" fill="var(--card-body-color)"/>
        
        <AxisBottom scale={xScale} tickFormat={typeof xFormat === 'function' ? xFormat : null}  transform={`translate(0, ${visHeight})`} />
        <AxisLeft scale={yScale} ticks={[visHeight / 30, typeof yFormat === 'string' ? yFormat : null]} tickFormat={typeof yFormat === 'function' ? yFormat : null} backgroundLine={visWidth} >
          <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">{yLabel}</text>
        </AxisLeft>
        {
          I.map(i => (
            <rect key={i}
              x={xScale(X[i])}
              y={yScale(Y[i])}
              height={yScale(0) - yScale(Y[i])}
              width={xScale.bandwidth()}
              fill={color(X[i])}  
              stroke={color(X[i])}
            >
              { tooltip && <title>{tooltip(i)}</title> }
            </rect>
          ))
        }  
      </g>
    </svg>
    { (legend && xDomain.size > 1) && 
      <Legend data={Array.from(xDomain)} color={color}/>
    }
  </figure>
  );
};



export function StackedBarChart({
  data,
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // chart title
  tooltip, // given d in data, returns the tooltip text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values
  xPadding = 0.3, // amount of x-range to reserve to separate bars
  yType = scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  zDomain, // array of z-values
  offset = stackOffsetDiverging, // stack offset method
  order = stackOrderNone, // stack order method
  xFormat = d => d, // a format specifier string for the x-axis
  yFormat = d => d, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors, // array of colors
  // 定义色块和间距的尺寸
  legend=true, // 是否显示图例
  className,
  style,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  
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
  if (xDomain === undefined) xDomain = X;
  if (zDomain === undefined) zDomain = Z;
  xDomain = new InternSet(xDomain);
  zDomain = new InternSet(zDomain);

  // Omit any data not present in the x- and z-domains.
  const I = range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  const series = stack()
      .keys(zDomain)
      .value(([x, g], z) => Y[g.get(z)])
      .order(order)
      .offset(offset)
    (rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => {
      let s2 = s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})); 
      s2.key=s.key; 
      return s2
    });
  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = scaleBand(xDomain, xRange).paddingInner(xPadding);
  const yScale = yType(yDomain, yRange);
  if (!colors) colors = schemeSpectral[zDomain.size];
  const color = scaleOrdinal(zDomain, colors);

  // Compute tooltip.
  if (tooltip === undefined) {
    const format = typeof yFormat === 'string' ? yScale.tickFormat(100, yFormat) : yFormat;
    tooltip = i => `${X[i]}\n${Z[i]}: ${format(Y[i])}`;
  } else {
    const O = map(data, d => d);
    const T = tooltip;
    tooltip = i => T(O[i], i, data);
  }
 

  return (
  (width <= 0 ) ? "" :
  <figure ref={containerRef} className={cn("relative bg-card pb-[10px]", className)} style={style}>
    { title && 
      <h2 className="font-bold" 
        style={{
          paddingTop: `${marginTop}px`,
          paddingLeft: `15px`,
          paddingRight: `${marginRight}px`,
        }}
      >
        {title}
      </h2>
    }
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
       
      <g transform={`translate(${marginLeft}, ${marginTop})`} >
        <rect width={visWidth} height={visHeight} stroke="none" fill="var(--card-body-color)"/>
        
        <AxisBottom scale={xScale} tickFormat={typeof xFormat === 'function' ? xFormat : null}  transform={`translate(0, ${visHeight})`} />
        <AxisLeft scale={yScale} ticks={[visHeight / 30, typeof yFormat === 'string' ? yFormat : null]} tickFormat={typeof yFormat === 'function' ? yFormat : null} backgroundLine={visWidth} >
          <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">{yLabel}</text>
        </AxisLeft>
        {
          series.map((s) => (
            <g key={s.key} fill={color(Z[s[0].i])} stroke={color(Z[s[0].i])}>
              {
                s.map(arr => {
                  const [y1, y2] = arr;
                  const {data, i} = arr;
                  return (
                  <rect key={i}
                    x={xScale(X[i])}
                    y={Math.min(yScale(y1), yScale(y2))}
                    height={Math.abs(yScale(y1) - yScale(y2))}
                    width={xScale.bandwidth()}
                     
                  >
                    { tooltip && <title>{tooltip(i)}</title> }
                  </rect>
                  )
                })
              }
            </g>
          ))
        }
         
      </g>
    </svg>
    { (legend && zDomain.size > 1) && 
      <Legend data={Array.from(zDomain)} color={color}/>
    }
  </figure>
  );
}
 


export function GroupedBarChart({
  data,
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // chart title
  tooltip, // given d in data, returns the tooltip text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values
  xPadding = 0.3, // amount of x-range to reserve to separate bars
  xFormat = d => d, // a format specifier string for the x-axis
  yType = scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yFormat = d => d, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  zDomain, // array of z-values
  zPadding = 0.05, // amount of x-range to reserve to separate bars
  offset = stackOffsetDiverging, // stack offset method
  order = stackOrderNone, // stack order method
  colors, // array of colors
  // 定义色块和间距的尺寸
  legend=true, // 是否显示图例
  className,
  style,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  
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
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = [0, Math.ceil(max(Y))];
  if (zDomain === undefined) zDomain = Z;
  xDomain = new InternSet(xDomain);
  zDomain = new InternSet(zDomain);

  // Omit any data not present in the x- and z-domains.
  const I = range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));
 
  // Construct scales, axes, and formats.
  const xScale = scaleBand(xDomain, xRange).paddingInner(xPadding);
  const zScale = scaleBand(zDomain, [0, xScale.bandwidth()]).padding(zPadding);
  const yScale = yType(yDomain, yRange);
 
  if (!colors) colors = schemeSpectral[zDomain.size];
  const color = scaleOrdinal(zDomain, colors);

  // Compute tooltip.
  if (tooltip === undefined) {
    const format = typeof yFormat === 'string' ? yScale.tickFormat(100, yFormat) : yFormat;
    tooltip = i => `${X[i]}\n${Z[i]}: ${format(Y[i])}`;
  } else {
    const O = map(data, d => d);
    const T = tooltip;
    tooltip = i => T(O[i], i, data);
  }
 

  return (
  (width <= 0 ) ? "" :
  <figure ref={containerRef} className={cn("relative bg-card pb-[10px]", className)} style={style}>
    { title && 
      <h2 className="font-bold" 
        style={{
          paddingTop: `${marginTop}px`,
          paddingLeft: `15px`,
          paddingRight: `${marginRight}px`,
        }}
      >
        {title}
      </h2>
    }
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
       
      <g transform={`translate(${marginLeft}, ${marginTop})`} >
        <rect width={visWidth} height={visHeight} stroke="none" fill="var(--card-body-color)"/>
        
        <AxisBottom scale={xScale} tickFormat={typeof xFormat === 'function' ? xFormat : null}  transform={`translate(0, ${visHeight})`} />
        <AxisLeft scale={yScale} ticks={[visHeight / 30, typeof yFormat === 'string' ? yFormat : null]} tickFormat={typeof yFormat === 'function' ? yFormat : null} backgroundLine={visWidth} >
          <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">{yLabel}</text>
        </AxisLeft>
        {
          I.map(i => (
            <rect key={i}
              x={xScale(X[i]) + zScale(Z[i])}
              y={yScale(Y[i])}
              height={yScale(0) - yScale(Y[i])}
              width={zScale.bandwidth()}
              fill={color(Z[i])}
              stroke={color(Z[i])}
            >
              { tooltip && <title>{tooltip(i)}</title> }
            </rect>
          ))
        }
      </g>
    </svg>
    { (legend && zDomain.size > 1) && 
      <Legend data={Array.from(zDomain)} color={color}/>
    }
  </figure>
  );
}
 
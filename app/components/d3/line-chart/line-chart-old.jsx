'use client';

import { useEffect, useLayoutEffect, useRef, useState, forwardRef} from "react";
import {
  select, 
  curveLinear, curveNatural, curveMonotoneX, curveStep, 
  scaleUtc, scaleLinear, scalePoint, scaleQuantize,
  map, InternSet, InternMap, range,
  extent, max, line, axisBottom, axisLeft, 
  sort,
  Delaunay, group, pointer, least, interpolateRound, easeBounce


} from "d3";
 

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
  name, // given d in data, returns the name text
  title, // title of the chart
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
  xFormat,
  yType = scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  zDomain, // array of z-values
  color = "currentColor", // stroke color of line, as a constant or a function of *z*
  strokeLinecap, // stroke line cap of line
  strokeLinejoin, // stroke line join of line
  strokeWidth = 1.5, // stroke width of line
  strokeOpacity, // stroke opacity of line
  mixBlendMode = "normal", // blend mode of lines
  // 定义色块和间距的尺寸
  legend=true, // 是否显示图例
  legendRectWidth = 20,
  legendRectHeight = 20,
  legendRectCornerRadius = 6, // 圆角半径
  legendTextSpacing = 5,     // 色块与文字的间距
  legendItemSpacing = 10,     // 每个项目之间的间距
  showVertices = true, // show showV(points) on the line?
  showTooltip = true, // show tooltip on hover?
  voronoi // show a Voronoi overlay? (for debugging)
}) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipData, setTooltipData] = useState([]);
  const [tooltipTitle, setTooltipTitle] = useState("");
  useEffect(() => {
    if(!svgRef.current) return;
    if(width == 0 || height == 0) return;

    draw();
    return () => {
      // 移除所有由 D3 创建的子元素，防止重复渲染
      select(svgRef.current).selectAll("*").remove();
    };
    
  }, [data, width, height]);

  function draw() {
    const svg = select(svgRef.current);
    const tooltip = select(tooltipRef.current);
    const svgRect = svg.node().getBoundingClientRect();
    const visHeight = height - marginTop - marginBottom;
    const visWidth = width - marginLeft - marginRight; //width is basically max-width
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
    const xAxis = axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = axisLeft(yScale).ticks(height / 60, yFormat);
  
    // Compute names.
    const T = name === undefined ? Z : name === null ? null : map(data, name);
    const nameByZ = sort(new InternMap(map(I, (i) => [Z[i], T[i]])), ([key])=> key);
    // Construct a line generator.
    const genLine = line()
        .defined(i => D[i])
        .curve(curveMap[curve])
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));
  
    const vis = svg.append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`);
  
   
    const interactionArea = vis.append("rect")
      .attr('class', 'bg-card-body')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", visWidth)
      .attr("height", visHeight)
      .attr("fill", "hsl(var(--card-body))");
      // .style("cursor", "pointer");
  
    vis.on("pointerenter", pointerentered)
      .on("pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", event => event.preventDefault());
  
    // An optional Voronoi display (for fun).
    if (voronoi) vis.append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("d", Delaunay
          .from(I, i => xScale(X[i]), i => yScale(Y[i]))
          .voronoi([0, 0, visWidth, visHeight])
          .render());
  
    vis.append("g")
        .attr("transform", `translate(0, ${visHeight})`)
        .call(xAxis)
        .call(voronoi ? () => {} : g => g.selectAll(".tick line").clone()
          .attr("y2", -visHeight )
          .attr("stroke-opacity", 0.1));
  
    vis.append("g")
        // .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        // .call(g => g.select(".domain").remove())
        .call(voronoi ? () => {} : g => g.selectAll(".tick line").clone()
            .attr("x2", visWidth)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
   
  
    const pathGroup = vis.append("g")
        .attr("fill", "none")
        .attr("stroke", typeof color === "string" ? color : null)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        // .datum(group(I, i => Z[i]));
   
  
    const path = pathGroup.selectAll("path")
      .data(group(I, i => Z[i]))
      // .data(d => d)
      .join("path")
        .style("mix-blend-mode", mixBlendMode)
        .attr("stroke", typeof color === "function" ? ([z]) => color(z) : null)
        .attr("d", ([, d]) => genLine(sort(d, i => X[i])));
    
    var verticesCircle;    
    if(showVertices){
      verticesCircle = pathGroup.selectAll('circle')
        .data(I)
        .join("circle")
        .attr("cx", i => xScale(X[i]))
        .attr("cy", i => yScale(Y[i]))
        .attr("r", 4)
        .attr("fill", "white")
        .attr("stroke", typeof color === "function" ? i => color(Z[i])  : null);
    }
    
  
    //==================== legend start =======
    if (legend && zDomain.size > 1) {
      // 创建一个总的 <g> 容器来包裹所有色块项，方便整体移动
      const legendGroup = svg.append("g")
        .attr("class", "legend-group");
  
      // 使用 D3 的数据绑定来创建每个色块项 (色块 + 文字)
      const legendItems = legendGroup.selectAll(".legend-item")
        .data(nameByZ)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .style("cursor", "pointer")
        .on("pointerenter", pointerEnteredLegend)
        .on("pointerleave", pointerLeaveLegend)
        .on("touchstart", event => event.preventDefault());
  
      // 在每个项中添加圆角矩形
      legendItems.append("rect")
        .attr("width", legendRectWidth)
        .attr("height", legendRectHeight)
        .attr("rx", legendRectCornerRadius) // 设置 x 方向的圆角
        .attr("ry", legendRectCornerRadius) // 设置 y 方向的圆角
        .attr("fill", ([z]) => color(z));
  
      // 在每个项中添加文字
      legendItems.append("text")
        .attr("x", legendRectWidth + legendTextSpacing)
        .attr("y", legendRectHeight / 2) // 垂直居中于色块
        .attr("dy", "0.35em") // 微调垂直对齐
        // .style("font-size", "16px")
        .attr("fill", "currentColor")
        .text(([_, t]) => t);
  
      legendItems.each(function() {
        const item = select(this);
        const bbox = this.getBBox(); // 获取 <g> 元素的边界框 (包含 rect 和 text)
        // console.log("========", this.getBoundingClientRect(), bbox);
        
        // 使用 .insert() 将背景矩形作为第一个子元素插入
        // 这样它就不会覆盖掉可见的 rect 和 text
        item.insert("rect", ":first-child")
            .attr("class", "hitbox") // 通常称之为"点击区域"
            .attr("x", bbox.x)
            .attr("y", bbox.y)
            .attr("width", bbox.width)
            .attr("height", bbox.height)
            .attr("fill", "transparent"); // 设置为透明
    });
      // 4. 定位与居中
      let currentX = 0;
      legendItems.attr("transform", function(d) {
        // 'this' 指向当前的 <g> 元素 (legend-item)
        const transform = `translate(${currentX}, 0)`;
        // 计算当前元素的宽度 (getBBox() 可以获取元素的边界框)
        const itemWidth = this.getBBox().width;
        // 更新下一个元素开始的 x 坐标
        currentX += itemWidth + legendItemSpacing;
        return transform;
      });
  
      // 9. 将整个图例容器居中和底部对齐
      const legendBBox = legendGroup.node().getBBox();
      const legendX = (width - legendBBox.width) / 2;
      const legendY = height - legendBBox.height - 10; // 距离底部20px
  
      legendGroup.attr("transform", `translate(${legendX}, ${legendY})`);
  
      
      function pointerEnteredLegend(event, [z, t]) {
        path.style("opacity", ([key]) => key === z ?  "1": "0.3");
        if(showVertices) verticesCircle.style("opacity", i => Z[i] === z ? "1" : "0.3");
      }
    
      function pointerLeaveLegend() {
        path.style("mix-blend-mode", mixBlendMode).style("opacity", null);
        if(showVertices) verticesCircle.style("mix-blend-mode", mixBlendMode).style("opacity", null);
      }
    }
    // =========================== legend end ==========================
  
    const dot = vis.append("g")
        .attr("stroke", "currentColor")
        .attr("fill", "currentColor")
        .attr("display", "none");
  
    dot.append("circle")
        .attr("r", 2.5);
  
    dot.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8);
  // 4. 在 SVG 中添加 <line> 元素
    const dashline = vis.append("line")
      .attr("x1", 0)  // 起始点 x
      .attr("y1", 0)         // 起始点 y
      .attr("x2", 0)  // 结束点 x (与 x1 相同，确保是垂直线)
      .attr("y2", visHeight)         // 结束点 y
      .attr("stroke", "currentColor") // 线条颜色
      .attr("stroke-width", 1)   // 线条宽度
      .attr("stroke-dasharray", "5, 5") // 设置虚线样式：5px实线，5px空白 
      .attr("display", "none")
      .style("transition", "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)");
  
    if(!xScale.invert) {
      xScale.invert = scaleQuantize(xRange, xDomain);
      // const invert = scaleLinear().domain([0, visWidth]).range([0, xDomain.length-1]).interpolate(interpolateRound).clamp(true);
      // xScale.invert = xm => xDomain[invert(xm)]; 
    }
     
    function moveTooltip(event) {
      const [xm, ym] = pointer(event);
      const xValue = xScale.invert(xm);
      console.log('xValue', xValue)
      const xI = sort(I.filter((i) => X[i] === xValue), i => Z[i]);
      // dashline
      // .transition()           
      // .duration(200) 
      // .ease(easeBounce)
      // .attr("x1", xScale(xValue))
      // .attr("x2", xScale(xValue));
      dashline.attr("transform",  `translate(${xScale(xValue)}, 0)`);

      setTooltipData(xI.map(i => ({
        name: T[i],
        value: Y[i],
        color: typeof color === "function" ? color(Z[i]) : color,
      })));
      setTooltipTitle(xValue);

      const tooltipRect = tooltip.node().getBoundingClientRect();
      // console.log("tooltipRect", tooltipRect);
      const offset = 20;
      let tooltipX = event.offsetX + offset, tooltipY = event.offsetY + offset;
      if (tooltipX + tooltipRect.width > svgRect.width) {
        tooltipX = event.offsetX - tooltipRect.width - offset; 
      }
      if (tooltipY + tooltipRect.height > svgRect.height) {
        tooltipY = event.offsetY - tooltipRect.height - offset;
      }
      tooltip.style("transform",  `translate(${tooltipX}px, ${tooltipY}px)`);
    }

    function pointermoved(event) {
      if (showTooltip) {
        moveTooltip(event); 
      }
      
      // console.log(xm, ym, event);
      // const c = least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
      // path.style("stroke", ([z]) => Z[c] === z ? (typeof color === "function" ? color(z) : null) : "#ddd").filter(([z]) => Z[c] === z).raise();
      // if(showVertices) verticesCircle.style("stroke", i => Z[i] === Z[c] ? (typeof color === "function" ? color(Z[i]) : null) : "#ddd").filter(i => Z[i] === Z[c]).raise();
      // dot.attr("transform", `translate(${xScale(X[c])},${yScale(Y[c])})`);
      // if (T) dot.select("text").text(T[c]);
      // svg.property("value", O[c]).dispatch("input", {bubbles: true});
    }
  
    function pointerentered(event) {
      if (showTooltip) {
        moveTooltip(event);
        dashline.attr("display", null);
      }

      // path.style("mix-blend-mode", null).style("stroke", "#ddd");
      // if(showVertices) verticesCircle.style("mix-blend-mode", null).style("stroke", "#ddd");
      // dot.attr("display", null);
    }
  
    function pointerleft() {
      dashline.attr("display", "none");
      setTooltipData([]);
      setTooltipTitle("");
      // path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
      // if(showVertices) verticesCircle.style("mix-blend-mode", mixBlendMode).style("stroke", null);
      // dot.attr("display", "none");
      // svg.node().value = null;
      // svg.dispatch("input", {bubbles: true});
    }
  
  }

  return (
  <div className="relative bg-card">
    {title && <h2 className="font-bold" style={{
      paddingTop: `${marginTop}px`,
      paddingLeft: `15px`,
      paddingRight: `${marginRight}px`,
    }}>{title}</h2>}
    <svg ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        maxWidth: "100%",
        // height: "auto",
        WebkitTapHighlightColor: "transparent",
      }}
    >
    </svg>

    <Tooltip ref={tooltipRef} title={tooltipTitle} data={tooltipData} open={tooltipData && tooltipData.length > 0}/>
  </div>
  );
}

export const Tooltip= forwardRef(function ({ 
  title,
  data,
  open,
}, ref) {
  return (
    <div ref={ref} className="p-[10px] bg-card-body border border-border rounded shadow shadow-shadow"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 999,
        left: 0,
        top: 0,
        transition: "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1),  transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
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


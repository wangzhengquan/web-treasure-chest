'use client';

import { useEffect, useRef } from "react";
import * as d3 from "d3";
      
class LineChart2 {
  svgRef = createRef();
  constructor( props ) {
    // this.data = props.data;
    // this.width = props.width || "100%";
    // this.height = props.height || "auto";
  }
  componentDidMount() {
    this.svg = d3.select(this.svgRef.current);
    this.draw();
  }
  componentWillUnmount() {
    this.svg.selectAll("*").remove();
  }

  render() {
    return (
      <svg ref={this.svgRef}
        width={this.width}
        height={this.height}
        viewBox={`0 0 ${w} ${h}`}
        style={{
          maxWidth: "100%",
          fontFamily: "sans-serif",
          fontSize: "10px",
        }}
      >
      </svg>
    );
  }

  draw() {
     
  }
}

// export {LineChart}

// 1. Create a mapping from string identifiers to D3 curve functions
const curveMap = {
  linear: d3.curveLinear,
  natural: d3.curveNatural,
  monotoneX: d3.curveMonotoneX,
  step: d3.curveStep,
  // Add any other curves you want to support
};

function drawLineChart(svg, {
  data,
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // given d in data, returns the title text
  defined, // for gaps in data
  curve = "linear", // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 800, // outer width, in pixels
  height = 600, // outer height, in pixels
  xType = d3.scaleUtc, // type of x-scale
  xDomain, // [xmin, xmax]
  yType = d3.scaleLinear, // type of y-scale
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
  vertex = true, // show showV(points) on the line?
  voronoi // show a Voronoi overlay? (for debugging)
}) {
  const xRange = [0, width - marginRight-marginLeft]; // [left, right]
  const yRange = [height - marginBottom-marginTop, 0]; // [bottom, top]
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);
  const O = d3.map(data, d => d);
  if (defined === undefined) defined = (d, i) => X[i] && Y[i];
  const D = d3.map(data, defined);

  // Compute default domains, and unique the z-domain.
  if (xDomain === undefined) {
    if ( xType == d3.scalePoint){
      xDomain = X.filter((d, i, a) => a.indexOf(d) === i);
      xDomain.sort();
      // console.log("xDomain", xDomain)
    } else {
      xDomain = d3.extent(X);
    }
    
  }
  if (yDomain === undefined) yDomain = [0, d3.max(Y, d => typeof d === "string" ? +d : d)];
  if (zDomain === undefined) zDomain = Z;
  zDomain = new d3.InternSet(zDomain);
  
  // Omit any data not present in the z-domain.
  const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));
// console.log("I", I)
  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles.
  const T = title === undefined ? Z : title === null ? null : d3.map(data, title);
  const titleByZ = new d3.InternMap(d3.map(I, (i) => [Z[i], T[i]]));
  // Construct a line generator.
  const line = d3.line()
      .defined(i => D[i])
      .curve(curveMap[curve])
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

  const visHeight = height - marginTop - marginBottom;
  const visWidth = width - marginLeft - marginRight; //width is basically max-width
  
  

  const vis = svg.append('g')
    .attr('transform', `translate(${marginLeft}, ${marginTop})`);

 
  const interactionArea = vis.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", visWidth)
    .attr("height", visHeight)
    .attr("fill", "transparent");
    // .style("cursor", "pointer");

  vis.on("pointerenter", pointerentered)
    .on("pointermove", pointermoved)
    .on("pointerleave", pointerleft)
    .on("touchstart", event => event.preventDefault());

  // An optional Voronoi display (for fun).
  if (voronoi) vis.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", d3.Delaunay
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
      // .datum(d3.group(I, i => Z[i]));
 

  const path = pathGroup.selectAll("path")
    .data(d3.group(I, i => Z[i]))
    // .data(d => d)
    .join("path")
      .style("mix-blend-mode", mixBlendMode)
      .attr("stroke", typeof color === "function" ? ([z]) => color(z) : null)
      .attr("d", ([, d]) => line(d));
  
  var verticesCircle;    
  if(vertex){
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
      .data(titleByZ)
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
      .style("fill", ([z]) => color(z));

    // 在每个项中添加文字
    legendItems.append("text")
      .attr("x", legendRectWidth + legendTextSpacing)
      .attr("y", legendRectHeight / 2) // 垂直居中于色块
      .attr("dy", "0.35em") // 微调垂直对齐
      // .style("font-size", "16px")
      .style("fill", "currentColor")
      .text(([_, t]) => t);

    legendItems.each(function() {
      const item = d3.select(this);
      const bbox = this.getBBox(); // 获取 <g> 元素的边界框 (包含 rect 和 text)
      
      // 使用 .insert() 将背景矩形作为第一个子元素插入
      // 这样它就不会覆盖掉可见的 rect 和 text
      item.insert("rect", ":first-child")
          .attr("class", "hitbox") // 通常称之为"点击区域"
          .attr("x", bbox.x)
          .attr("y", bbox.y)
          .attr("width", bbox.width)
          .attr("height", bbox.height)
          .style("fill", "transparent"); // 设置为透明
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
      if(vertex) verticesCircle.style("opacity", i => Z[i] === z ? "1" : "0.3");
    }
  
    function pointerLeaveLegend() {
      path.style("mix-blend-mode", mixBlendMode).style("opacity", null);
      if(vertex) verticesCircle.style("mix-blend-mode", mixBlendMode).style("opacity", null);
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

  function pointermoved(event) {
    const [xm, ym] = d3.pointer(event);
    console.log(xm, ym, event);
    const c = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
    path.style("stroke", ([z]) => Z[c] === z ? (typeof color === "function" ? color(z) : null) : "#ddd").filter(([z]) => Z[c] === z).raise();
    if(vertex) verticesCircle.style("stroke", i => Z[i] === Z[c] ? (typeof color === "function" ? color(Z[i]) : null) : "#ddd").filter(i => Z[i] === Z[c]).raise();
    dot.attr("transform", `translate(${xScale(X[c])},${yScale(Y[c])})`);
    if (T) dot.select("text").text(T[c]);
    svg.property("value", O[c]).dispatch("input", {bubbles: true});
  }

  function pointerentered() {
    path.style("mix-blend-mode", null).style("stroke", "#ddd");
    if(vertex) verticesCircle.style("mix-blend-mode", null).style("stroke", "#ddd");
    dot.attr("display", null);
  }

  function pointerleft() {
    path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
    if(vertex) verticesCircle.style("mix-blend-mode", mixBlendMode).style("stroke", null);
    dot.attr("display", "none");
    svg.node().value = null;
    svg.dispatch("input", {bubbles: true});
  }

}
 

export function LineChart(props) {
  const svgRef = useRef(null);
  useEffect(() => {
    if(!svgRef.current) return;
    if(props.width == 0 || props.height == 0) return;
     // Compute values.
     const svg = d3.select(svgRef.current);
     drawLineChart(svg, props);

    return () => {
      // 移除所有由 D3 创建的子元素，防止重复渲染
      svg.selectAll("*").remove();
    };
    
  }, [props.width, props.height]);

  return (
    <svg ref={svgRef}
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
      style={{
        maxWidth: "100%",
        // height: "auto",
        WebkitTapHighlightColor: "transparent",
      }}
    >
    </svg>
  );
}

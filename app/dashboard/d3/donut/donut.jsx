'use client';

import { useEffect, useRef, forwardRef } from "react";
import {composeRefs} from '@radix-ui/react-compose-refs';
import {Button} from '@app/components/button';
import * as d3 from "d3";
// 原始数据
const data = [
  {"apples":53245, "oranges":200},
  {"apples":28479, "oranges":200},
  {"apples":19697, "oranges":200},
  {"apples":24037, "oranges":200},
  {"apples":40245, "oranges":200}
];

const Donut =  forwardRef(function({data, width = 600, height = 600}, ref) {
  // console.log("data=====", data);
  const svgRef = useRef(null);
  useEffect(() => {
    if(!svgRef.current) return;

    const outerRadius = height / 2 - 10;
    const innerRadius = outerRadius * 0.75;
    const tau = 2 * Math.PI;
    const color = d3.scaleOrdinal(d3.schemeCategory10); 
    const svg = d3.select(svgRef.current);
    // 创建 arc（弧形）生成器
    const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    // 创建 pie（饼图）布局生成器，初始值基于 "apples"
    const pie = d3.pie().sort(null).value((d) => d["apples"]);

    const path = svg.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc)
        .each(function(d) { this._current = d; });

    // 绘制路径（即圆环的各个部分）
    // const path = svg.datum(data).selectAll("path")
    //     .data(pie)
    //     .join("path")
    //     .attr("fill", (d, i) => color(i))
    //     .attr("d", arc)
    //     .each(function(d) { this._current = d; }); // 存储初始角度用于动画

    // 定义更新函数
    function change(value) {
        pie.value((d) => d[value]); // 更改 pie 布局的值函数
        path.data(pie(data)); // 重新计算角度
        path.transition().duration(750).attrTween("d", arcTween); // 应用过渡动画重绘 arc
    }

    // 定义动画的 "tween" 函数
    // 这个函数用于在旧角度和新角度之间进行平滑插值
    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(0);
        // console.log('this._current', this._current);
        return (t) => arc(i(t));
    }

    // 将 SVG 节点和 change 方法组合成一个对象
    // 这样我们就可以在 HTML 的 onclick 事件中调用 chart.change()
    const chart = Object.assign(svg.node(), {change});

    return () => {
      // 移除所有由 D3 创建的子元素，防止重复渲染
      svg.selectAll("*").remove();
    };
    
  }, []);

  return (
     
    <svg ref={composeRefs(svgRef, ref)}
      width={"100%"}
      height={height}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    >
    </svg>
  );
});

export default function DonutControls() {
  const chartRef = useRef(null);
  return (
    <div style={{width:"500px"}}>
      <div className="controls flex gap-4">
        <Button intent="blue" onClick={() => {chartRef.current?.change('apples')}}>切换到 Apples 数据</Button>
        <Button intent="blue" onClick={() => {chartRef.current?.change('oranges')}}>切换到 Oranges 数据</Button>
      </div>
      <Donut data={data} ref={chartRef}/>
    </div>
  )
}

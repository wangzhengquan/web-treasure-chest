'use client';
import * as d3 from 'd3';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import {LineChart} from '@app/components/d3/line-chart';
import aapl from "../aapl.json"
aapl.forEach(d => {
  d.date = new Date(d.date);
});

const moldTrendData = [
  {name: 'series1', month: "1月", value: 80},{name: 'series1', month: "2月", value: 60},{name: 'series1', month: "3月", value: 90},{name: 'series1', month: "4月", value: 40},{name: 'series1', month: "5月", value: 50},{name: 'series1', month: "6月", value: 65},
  {name: 'series2', month: "1月", value: 45},{name: 'series2', month: "2月", value: 75},{name: 'series2', month: "3月", value: 50},{name: 'series2', month: "4月", value: 25},{name: 'series2', month: "5月", value: 45},{name: 'series2', month: "6月", value: 80},
  {name: 'series3', month: "1月", value: 60},{name: 'series3', month: "2月", value: 30},{name: 'series3', month: "3月", value: 35},{name: 'series3', month: "4月", value: 55},{name: 'series3', month: "5月", value: 30},{name: 'series3', month: "6月", value: 25},
];

export default function Charts(){
  const containerRef = useRef(null);
  const [unemployment, setUnemployment] = useState(null);
  const [width, setWidth] = useState(0);
 // 使用 useEffect 来执行数据加载的“副作用”
  // 这个 effect 只在组件第一次挂载时运行一次（因为依赖项数组为空 []）
  useLayoutEffect(() => {
    const container = containerRef.current;
    const {width} = container.getBoundingClientRect();
    setWidth(width);
    // d3.csv 会返回一个 promise
    // 第一个参数是文件的路径（相对于 public 文件夹）
    // 第二个参数是 d3.autoType，这是实现 {typed: true} 功能的关键
    // 它会自动推断并转换数据类型（例如，字符串 "12.3" 会被转换为数字 12.3）
    d3.csv('/data/unemployment.csv', d3.autoType).then(data => {
      // 数据成功加载后，更新 state
      setUnemployment(data);
      // 更新加载状态
      // setLoading(false);
    }).catch(error => {
      // 如果发生错误，可以在控制台打印错误信息
      console.error("Error loading the data: ", error);
      // 更新加载状态
      // setLoading(false);
    });
  }, []); // 空数组确保 effect 只运行一次

  return (
  <div className="bg-card-body" ref={containerRef}>
    {
      unemployment ? <LineChart data={unemployment} 
          x={d => d.date}
          y={d => d.unemployment} 
          z={d => d.division}
          yLabel= "↑ Unemployment (%)"
          width={width}
          height={width * 2 / 3}
          strokeWidth = {2}
          marginBottom = {80}
          color= "steelblue"
          legend={false}
          vertex={false}
          voronoi={false} // if true, show Voronoi overlay
      /> : "loading..."
    }

     
  </div>
  );
}
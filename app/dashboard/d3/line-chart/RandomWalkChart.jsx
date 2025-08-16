'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// 我们可以把生成器函数放在组件外部，因为它不依赖于组件的 props 或 state
function* walkGenerator() {
  const data = [];
  for (let i = 0, v = 2; i < 50; ++i) {
    v += Math.random() - 0.5;
    v = Math.max(Math.min(v, 4), 0); // 保持值在 0 到 4 之间
    data.push({step: i, value: v});
    yield data; // 每次循环都产出整个累积数组的副本
  }
}

const RandomWalkChart = ({ width = 800, height = 200 }) => {
  // 1. 使用 useState 管理图表数据
  const [data, setData] = useState([]);
  // 用于触发重播动画的状态
  const [iteration, setIteration] = useState(0);

  // 2. 使用 useEffect 执行动画副作用
  useEffect(() => {
    // 创建一个新的生成器实例
    const generator = walkGenerator();
    
    // 使用 setInterval 逐步从生成器中获取数据
    const intervalId = setInterval(() => {
      const next = generator.next();
      
      if (next.done) {
        // 如果生成器完成，清除 interval
        clearInterval(intervalId);
      } else {
        // 更新 state，触发 React 重渲染
        // 注意：我们传递一个新数组的副本，以确保 React 检测到变化
        setData([...next.value]);
      }
    }, 50); // 每 50ms 更新一次

    // 关键：返回一个清理函数
    // 当组件卸载或 useEffect 因依赖变化而重新运行时，此函数将被调用
    return () => {
      clearInterval(intervalId);
    };
  }, [iteration]); // 依赖数组，当 iteration 改变时，重新运行 effect

  // 3. 定义 D3 的 scales 和 line generator
  // 这些是纯计算函数，可以在每次渲染时安全地重新创建
  
  // X 轴的比例尺
  const walkX = d3.scaleLinear()
    .domain([0, 49]) // 数据域: 步数从 0 到 49
    .range([10, width - 10]); // 屏幕范围: SVG 的宽度，带有一些边距

  // Y 轴的比例尺
  const walkY = d3.scaleLinear()
    .domain([0, 4]) // 数据域: 值的范围从 0 到 4
    .range([height - 10, 10]); // 屏幕范围: SVG 的高度，颠倒以使 0 在底部

  // D3 的 line generator
  const line = d3.line()
    .x(d => walkX(d.step))
    .y(d => walkY(d.value));

  const handleReplay = () => {
    // 清空当前数据
    setData([]);
    // 增加 iteration 的值来触发 useEffect 重新运行
    setIteration(iter => iter + 1);
  };

  return (
    <div>
      <svg width={width} height={height} style={{ border: '1px solid #ccc', marginTop: '10px' }}>
        {/* React 负责渲染 path 元素 */}
        {/* D3 (line(data)) 负责计算 'd' 属性 */}
        <path 
          d={data.length > 0 ? line(data) : ''}
          // d = {line(walkGenerator())}
          fill="none"
          stroke="steelblue"
          strokeWidth="2"
        />
      </svg>
      <div>
        <button onClick={handleReplay} style={{ marginTop: '10px' }}>
          Replay Animation
        </button>
      </div>
    </div>
  );
};

export default RandomWalkChart;
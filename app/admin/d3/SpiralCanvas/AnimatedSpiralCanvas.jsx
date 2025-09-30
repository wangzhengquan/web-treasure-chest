'use client';

import React, { useRef, useEffect } from 'react';
import { lineRadial } from 'd3';

const AnimatedSpiralCanvas = ({ width = 300 }) => {
  // 1. 使用 useRef 创建一个对 canvas 元素的引用
  // 这样我们就可以在 React 的生命周期之外直接操作 DOM
  const canvasRef = useRef(null);

  // 2. 使用 useEffect 来处理副作用，比如 DOM 操作和动画
  // 这个 effect 将在组件挂载后运行
  useEffect(() => {
    // 获取当前的 canvas DOM 节点和它的 2D 渲染上下文
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // 创建 d3 的径向线生成器，并将其与我们的 canvas 上下文绑定
    const radialLineGenerator = lineRadial().context(context);

    let animationFrameId;

    // 3. 动画循环函数
    const renderFrame = () => {
      // 获取当前时间戳，模拟原始代码中的 `now`
      // Date.now() 返回自 1970-01-01 以来的毫秒数
      const now = Date.now();

      // 清除上一帧的画布内容，否则会留下拖影
      context.clearRect(0, 0, width, width);

      // --- 以下是与原始代码几乎完全相同的绘图逻辑 ---

      // a. 计算 `step`，它会随时间变化，驱动螺旋的旋转和收缩
      const step = (Math.PI * (-10 + ((now / 2000) % 20))) / 20;

      // b. 生成螺旋线的坐标点 [角度, 半径]
      const spiral = Array.from({ length: 76 }, (_, i) => [step * i, 2 * i]);

      // c. 开始在画布上绘图
      context.save(); // 保存当前状态（例如，变换矩阵）
      context.translate(width / 2, width / 2); // 将原点移动到画布中心

      context.beginPath(); // 开始一条新路径
      const hue = (now / 30) % 360; // 根据时间计算一个 0-360 度的色相值 (Hue)
      context.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      radialLineGenerator(spiral); // 使用 d3 生成器根据数据点绘制路径
      context.stroke(); // 描边路径，使其可见

      context.restore(); // 恢复之前保存的状态（撤销 translate）

      // 4. 请求下一帧动画，形成循环
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    // 启动动画
    renderFrame();

    // 5. 清理函数
    // 这个函数将在组件卸载时运行，以停止动画，防止内存泄漏
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };

  }, [width]); // 依赖数组，如果 width 改变，effect 会重新运行

  // 6. 渲染 canvas 元素，并将 ref 附加到它上面
  return <canvas ref={canvasRef} width={width} height={width} />;
};

export default AnimatedSpiralCanvas;
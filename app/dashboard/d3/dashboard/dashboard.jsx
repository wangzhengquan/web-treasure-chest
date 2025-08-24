'use client';
import { useRef, useLayoutEffect, useState } from 'react';
import {LineChart} from '@app/components/d3/line-chart';
import * as d3 from 'd3';
import { useTheme } from 'next-themes'
// import DonutControls from './donut';
const DARK_COLORS = {
  blue: '#00eaff',
  green: '#2dff71',
  yellow: '#ffdd00',
  red: '#ff4d4d',
  purple: '#9b59b6',
  orange: '#e67e22',
};

const LIGHT_COLORS = {
  blue: 'rgb(98, 182, 238)',
  green: 'rgb(115, 205, 205)',
  yellow: 'rgb(244,185,43)',
  red: 'rgb(252, 131, 157)',
  purple: 'rgb(174, 136, 252)',
  orange: 'rgb(254, 216, 126)',
};
// const colors = d3.scaleOrdinal(d3.schemeCategory10); 
// const colors =  d3.scaleOrdinal(["rgb(18, 102, 194)", "rgb(28, 173, 179)", "rgb(244,185,43)", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
const moldTrendData = [
  {name: '设变', month: "1月", value: 80},{name: '设变', month: "2月", value: 60},{name: '设变', month: "3月", value: 90},{name: '设变', month: "4月", value: 40},{name: '设变', month: "5月", value: 50},{name: '设变', month: "6月", value: 65},
  {name: '修模', month: "1月", value: 45},{name: '修模', month: "2月", value: 75},{name: '修模', month: "3月", value: 50},{name: '修模', month: "4月", value: 25},{name: '修模', month: "5月", value: 45},{name: '修模', month: "6月", value: 80},
  {name: '新模', month: "1月", value: 60},{name: '新模', month: "2月", value: 30},{name: '新模', month: "3月", value: 35},{name: '新模', month: "4月", value: 55},{name: '新模', month: "5月", value: 30},{name: '新模', month: "6月", value: 25},
];

export default function Dashboard() {
  const columnRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { theme, setTheme } = useTheme();
  const moldTrendColorMap = theme == 'light' ? {
    '设变':  LIGHT_COLORS.red,
    '修模': LIGHT_COLORS.yellow,
    '新模': LIGHT_COLORS.blue,
  } : {
    '设变':  DARK_COLORS.red,
    '修模': DARK_COLORS.yellow,
    '新模': DARK_COLORS.blue,
  };
  // ref.current.getBoundingClientRect()
  useLayoutEffect(() => {
    const column = columnRef.current;
    const {width} = column.getBoundingClientRect();
    setWidth(width);
    const observer = new ResizeObserver((observedItems) => {
      const { borderBoxSize } = observedItems[0];
      setWidth(borderBoxSize[0].inlineSize);
      // widthLabel.innerText = `${Math.round(borderBoxSize[0].inlineSize)}px`;
      // heightLabel.innerText = `${Math.round(borderBoxSize[0].blockSize)}px`;
    });
    
    observer.observe(column);
    return () => {
      observer.disconnect();
    }
    // console.log();
    // console.log(columnRef.current.offsetWidth);
    // console.log(columnRef.current.offsetHeight);
  }, []);
  return (
    <div className="bg-card-body grid grid-cols-3 gap-4">
        <div ref={columnRef}>
          <LineChart data={moldTrendData} 
            x={d => d.month}
            y={d => d.value} 
            z={d => d.name}
            marginLeft={40}
            marginBottom={60}
            // xDomain= {[1,2,3,4,5,6]}
            yDomain= {[0, 100]}
            // yLabel= "↑ Unemployment (%)"
            xType={d3.scalePoint}
            width={width}
            height={width * 2 / 3}
            strokeWidth = {2}
            color= { (z) => moldTrendColorMap[z]}
            legendRectWidth = {15}
            legendRectHeight = {15}
            legendRectCornerRadius = {2} // 圆角半径
            legendTextSpacing = {3}     // 色块与文字的间距
            legendItemSpacing = {5}     // 每个项目之间的间距
            voronoi={false} // if true, show Voronoi overlay
        />
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
        {/* <DonutControls/> */}
      </div>
  );
}

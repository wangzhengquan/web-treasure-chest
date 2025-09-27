'use client';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import {LineChart} from '@app/components/d3/line-chart';
import {PieChart} from '@app/components/d3/pie-chart';
import {StackedBarChart, BarChart, GroupedBarChart} from '@app/components/d3/bar-chart';
// import * as d3 from 'd3';
import {scalePoint} from "d3";
import { useTheme } from 'next-themes';
import Loading from "@/app/components/loading";
import { Gauge} from '@app/components/d3/gauge';
import { GeoMap} from '@app/components/d3/geo-map';
import MoldStatusTable from './table';
import {ProgressRingChart} from '@app/components/d3/progress-chart';
// import DonutControls from './donut';
const DARK_COLORS = {
  red: '#ff4d4d',
  yellow: '#ffdd00',
  blue: '#00eaff',
  purple: '#9b59b6',
  orange: '#e67e22',
  green: '#2dff71',
  
};

const LIGHT_COLORS = {
  red: 'rgb(252, 131, 157)',
  yellow: 'rgb(244,185,43)',
  blue: 'rgb(98, 182, 238)',
  purple: 'rgb(174, 136, 252)',
  orange: 'rgb(254, 216, 126)',
  green: 'rgb(115, 205, 205)',
  
};
// const colors = d3.scaleOrdinal(d3.schemeCategory10); 
// const colors =  d3.scaleOrdinal(["rgb(18, 102, 194)", "rgb(28, 173, 179)", "rgb(244,185,43)", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
const moldTrendData = [
  {name: '设变', month: 1, value: 80},{name: '设变', month: 4, value: 40},{name: '设变', month: 5, value: 50},{name: '设变', month: 6, value: 65},
  {name: '修模', month: 1, value: 45},{name: '修模', month: 2, value: 75},{name: '修模', month: 3, value: 50},{name: '修模', month: 4, value: 25},{name: '修模', month: 5, value: 45},{name: '修模', month: 6, value: 80},
  {name: '新模', month: 1, value: 60},{name: '新模', month: 2, value: 30},{name: '新模', month: 3, value: 35},{name: '新模', month: 4, value: 55},{name: '新模', month: 5, value: 30},{name: '新模', month: 6, value: 25},
  {name: '设变', month: 2, value: 60},{name: '设变', month: 3, value: 90},
];

const moldStatusData = [
  { label: '延期', value: 29 },
  { label: '正常交付', value: 29 },
  { label: '加工中', value: 41 }
];

const partTrendData = [ // Just duplicating for example
    {name: '电极', month: '1月', value: 30},{name: '电极', month: '2月', value: 80},{name: '电极', month: '3月', value: 30},{name: '电极', month: '4月', value: 90},{name: '电极', month: '5月', value: 25},{name: '电极', month: '6月', value: 85},
    {name: '铜件', month: '1月', value: 70},{name: '铜件', month: '2月', value: 60},{name: '铜件', month: '3月', value: 20},{name: '铜件', month: '4月', value: 40},{name: '铜件', month: '5月', value: 60},{name: '铜件', month: '6月', value: 50},
    {name: '其他', month: '1月', value: 50},{name: '其他', month: '2月', value: 40},{name: '其他', month: '3月', value: 55},{name: '其他', month: '4月', value: 10},{name: '其他', month: '5月', value: 45},{name: '其他', month: '6月', value: 70},
];

const dailyProcessAchievementData_ = [
  {day: 1, 模仁: 10, 电极: 30, 铜件: 20},
  {day: 2, 模仁: 10, 电极: 5, 铜件: 3},
  {day: 3, 模仁: 30, 电极: 40, 铜件: 20},
  {day: 4, 模仁: 20, 电极: 30, 铜件: 10},
  {day: 5, 模仁: 40, 电极: 20, 铜件: 10},
  {day: 6, 模仁: 33, 电极: 10, 铜件: 10},
  {day: 7, 模仁: 30, 电极: 5, 铜件: 5},
  {day: 8, 模仁: 20, 电极: 10, 铜件: 20},
  {day: 9, 模仁: 20, 电极: 10, 铜件: 20},
  {day: 10, 模仁: 20, 电极: 20, 铜件: 20},
  {day: 11, 模仁: 30, 电极: 15, 铜件: 20},
  {day: 12, 模仁: 20, 电极: 40, 铜件: 20},
  {day: 13, 模仁: 10, 电极: 30, 铜件: 20},
  {day: 14, 模仁: 20, 电极: 40, 铜件: 20},
  {day: 15, 模仁: 30, 电极: 50, 铜件: 20},
  {day: 16, 模仁: 10, 电极: 10, 铜件: 20},
  {day: 17, 模仁: 30, 电极: 40, 铜件: 20},
  {day: 18, 模仁: 22, 电极: 10, 铜件: 20},
  {day: 19, 模仁: 40, 电极: 10, 铜件: 20},
  {day: 20, 模仁: 30, 电极: 5, 铜件: 15},
];
const dailyProcessAchievementData2_ = dailyProcessAchievementData_.slice(0, 7);
const processes = ['模仁', '电极', '铜件'];
const dailyProcessAchievementData = processes.flatMap(processe => dailyProcessAchievementData_.map(d => ({day: d.day, processe, achievement: d[processe]})));
const dailyProcessAchievementData2 = processes.flatMap(processe => dailyProcessAchievementData2_.map(d => ({day: d.day, processe, achievement: d[processe]})));


const teamPassRateData = [
  { label: 'CNC', value: .30 }, { label: 'EDM', value: 1.0 }, { label: '线割', value: .41 }, 
  { label: '磨床', value: .74 }, { label: '铣床', value: .30 }, { label: '外协', value: .55 }
];

const qualityPropData = [
  {name : '尺寸', value: 0.3},
  {name: '硬度', value: 0.2},
  {name: '外观', value: 0.3},
  {name: '性能', value: 0.1},
]


export default function Dashboard() {
  const columnRef = useRef(null), blockRef = useRef(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const { theme, setTheme } = useTheme();
  const [visibility, setVisibility] = useState(false);
  const colors = theme == 'light' ? LIGHT_COLORS :DARK_COLORS;
  const colorsArray = Object.values(colors);
   
  // ref.current.getBoundingClientRect()
  useEffect(() => {
    if(!columnRef.current || !blockRef.current) return;

    const column = columnRef.current;
    const {width} = column.getBoundingClientRect();
    setColumnWidth(width);
    setBlockWidth(blockRef.current.getBoundingClientRect().width);
    setVisibility(true);
    const observer = new ResizeObserver((observedItems) => {
      const { borderBoxSize } = observedItems[0];
      setColumnWidth(borderBoxSize[0].inlineSize);
      // widthLabel.innerText = `${Math.round(borderBoxSize[0].inlineSize)}px`;
      // heightLabel.innerText = `${Math.round(borderBoxSize[0].blockSize)}px`;
    });
    
    observer.observe(column);

    const blockSizeObserver = new ResizeObserver((observedItems) => {
      const { borderBoxSize } = observedItems[0];
      setBlockWidth(borderBoxSize[0].inlineSize);
    });
    
    blockSizeObserver.observe(blockRef.current);
    return () => {
      observer.disconnect();
      blockSizeObserver.disconnect();
    }
  }, []);
  return (
    <>
    {visibility == false && <Loading style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}/>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-[12px]" style={{visibility: visibility ? 'visible': 'hidden'}}>
      <div ref={columnRef} className="space-y-2 md:space-y-4">
        <div className="bg-card">
          <h2 className="text-sm font-bold p-[10px_10px_0]" >每月模具产量趋势图</h2>
          <LineChart data={moldTrendData} 
            x={d => d.month}
            y={d => d.value} 
            z={d => d.name}
            marginLeft={40}
            marginRight={10}
            marginTop={10}
            marginBottom={30}
            xType={scalePoint}
            xFormat={d => d + "月"}
            // xDomain= {[1,2,3,4,5,6]}
            yDomain= {[0, 100]}
            // yLabel= "↑ Unemployment (%)"
            
            width={columnWidth}
            height={columnWidth * 1 / 2}
            strokeWidth = {2}
            colors= {colorsArray}
           
          />
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2 md:gap-4">
          <div className={`bg-card`} ref={blockRef}>
            <h2 className="text-sm font-bold p-[10px_10px_0px]"> 模具状态统计 </h2>
            <PieChart 
              width={blockWidth} 
              data={moldStatusData} 
              name={d => d.label}
              value={d => d.value}
              margin = "10"
              />
          </div>
          <div className={`bg-card`}>
            <h2 className="text-sm font-bold p-[10px_10px_0px]"> 加工中模具数量 </h2>
            <Gauge width={blockWidth} uom="模具数" value={45} valueRange={[0, 120]} />
          </div>
        </div>
        <div className="bg-card p-[10px]">
          <h3 className='text-sm font-bold pb-[10px]'>模具进度表</h3>
          <MoldStatusTable />
        </div>
        <div className="bg-card">
          <h2 className="text-sm font-bold p-[10px_10px_0]" >每月零件产量趋势图</h2>
          <LineChart data={partTrendData} 
              x={d => d.month}
              y={d => d.value} 
              z={d => d.name}
              marginLeft={40}
              marginRight={10}
              marginTop={10}
              marginBottom={30}
              // xDomain= {[1,2,3,4,5,6]}
              yDomain= {[0, 100]}
              // yLabel= "↑ Unemployment (%)"
              xType={scalePoint}
              width={columnWidth}
              height={columnWidth * 1 / 2}
              strokeWidth = {2}
              colors= { colorsArray}
              legendRectWidth = {15}
              legendRectHeight = {15}
              legendRectCornerRadius = {2} // 圆角半径
              legendTextSpacing = {3}     // 色块与文字的间距
              legendItemSpacing = {5}     // 每个项目之间的间距
              voronoi={false} // if true, show Voronoi overlay
          />
        </div>
        
      </div>
     
      <div className='space-y-2 md:space-y-4'>
        <div className="bg-card">
          <h2 className="text-sm font-bold p-[10px_10px_0]" >模具客户分布图</h2>
          <GeoMap width={columnWidth} height={columnWidth * 2 / 3} margin={10}/>
        </div>
        <div className="bg-card">
          <h2 className="text-sm font-bold p-[10px_10px_0]" >每日工序达成数</h2>
          <StackedBarChart data={dailyProcessAchievementData} 
              x={d => d.day}
              y={d => d.achievement} 
              z={d => d.processe}
              marginLeft={40}
              marginRight={10}
              marginTop={10}
              marginBottom={30}
              xPadding = {0.3}
              colors = {["rgb(27,175,178)", "rgb(252, 191, 45)", "rgb(43, 159, 219)"]}
              width={columnWidth}
              height={columnWidth * 1 / 2}
              />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-2 md:gap-4">
            <div className='bg-card'>
              <h2 className="text-sm font-bold p-[10px_10px_0px]"> 模具达成率 </h2>
              <ProgressRingChart width={blockWidth} value='0.68' />
            </div>
            <div className={`bg-card`}>
              <h2 className="text-sm font-bold p-[10px_10px_0px]"> 零件数 </h2>
              <Gauge title="零件数" width={blockWidth} uom="零件数" value={80} valueRange={[0, 100]} />
            </div>
          </div>
          <div className="bg-card">
            <h2 className="text-sm font-bold p-[10px_10px_0]" >7日工序达成数</h2>
            <GroupedBarChart data={dailyProcessAchievementData2} 
              x={d => d.day}
              y={d => d.achievement} 
              z={d => d.processe}
              marginLeft={40}
              marginRight={10}
              marginTop={10}
              marginBottom={30}
              xPadding = {0.3}
              colors = {["rgb(27,175,178)", "rgb(252, 191, 45)", "rgb(43, 159, 219)"]}
              width={columnWidth}
              height={columnWidth * 1 / 2}
              />
            </div>
      </div>
      <div className='space-y-2 md:space-y-4'>
        <div className="bg-card">
          <h2 className="text-sm font-bold p-[10px_10px_0]" >班组合格率</h2>
          <BarChart data={teamPassRateData} 
              x={d => d.label}
              y={d => d.value} 
              yDomain={[0, 1.18]}
              yFormat={".0%"}
              marginLeft={40}
              marginRight={10}
              marginTop={10}
              marginBottom={30}
              xPadding = {0.3}
              colors = {colorsArray}
              width={columnWidth}
              height={columnWidth * 1 / 2}
              />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-2 md:gap-4">
            <div className={`bg-card`}>
              <h2 className="text-sm font-bold p-[10px_10px_0px]"> 品质占比 </h2>
              <PieChart 
                width={blockWidth} 
                margin = "10"
                innerRadius={(blockWidth/2 - 10) * 0.6}
                data={qualityPropData} 
                name={d => d.name}
                value={d => d.value}
                valueFormat=".0%"
                />
            </div>
            <div className={`bg-card`}>
            </div>
          </div>
      </div>
      
    </div> 
    </> 
  );
}




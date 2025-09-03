'use client';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import {LineChart} from '@app/components/d3/line-chart';
import {PieChart} from '@app/components/d3/pie-chart';
// import * as d3 from 'd3';
import {scalePoint} from "d3";
import { useTheme } from 'next-themes';
import Loading from "@/app/components/loading";
import { Gauge} from '@app/components/d3/gauge';
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
  {name: '设变', month: "1月", value: 80},{name: '设变', month: "4月", value: 40},{name: '设变', month: "5月", value: 50},{name: '设变', month: "6月", value: 65},
  {name: '修模', month: "1月", value: 45},{name: '修模', month: "2月", value: 75},{name: '修模', month: "3月", value: 50},{name: '修模', month: "4月", value: 25},{name: '修模', month: "5月", value: 45},{name: '修模', month: "6月", value: 80},
  {name: '新模', month: "1月", value: 60},{name: '新模', month: "2月", value: 30},{name: '新模', month: "3月", value: 35},{name: '新模', month: "4月", value: 55},{name: '新模', month: "5月", value: 30},{name: '新模', month: "6月", value: 25},
  {name: '设变', month: "2月", value: 60},{name: '设变', month: "3月", value: 90},
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



export default function Dashboard() {
  const columnRef = useRef(null), blockRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const { theme, setTheme } = useTheme();
  const [visibility, setVisibility] = useState(false);
  const moldTrendColorMap = theme == 'light' ? {
    '设变':  LIGHT_COLORS.red,
    '修模': LIGHT_COLORS.yellow,
    '新模': LIGHT_COLORS.blue,
  } : {
    '设变':  DARK_COLORS.red,
    '修模': DARK_COLORS.yellow,
    '新模': DARK_COLORS.blue,
  };

  const partTrendColorMap = theme == 'light' ? {
    '电极':  LIGHT_COLORS.red,
    '铜件': LIGHT_COLORS.yellow,
    '其他': LIGHT_COLORS.blue,
  } : {
    '电极':  DARK_COLORS.red,
    '铜件': DARK_COLORS.yellow,
    '其他': DARK_COLORS.blue,
  };
  // ref.current.getBoundingClientRect()
  useEffect(() => {
    if(!columnRef.current || !blockRef.current) return;

    const column = columnRef.current;
    const {width} = column.getBoundingClientRect();
    setWidth(width);
    setBlockWidth(blockRef.current.getBoundingClientRect().width);
    setVisibility(true);
    const observer = new ResizeObserver((observedItems) => {
      const { borderBoxSize } = observedItems[0];
      setWidth(borderBoxSize[0].inlineSize);
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
          {/* <h2 style={{ paddingTop: `10px`, paddingLeft: `15px`, }}>每月模具产量趋势图</h2> */}
          <LineChart data={moldTrendData} 
            x={d => d.month}
            y={d => d.value} 
            z={d => d.name}
            title="每月模具产量趋势图"
            marginLeft={40}
            marginRight={16}
            marginTop={10}
            marginBottom={50}
            // xDomain= {[1,2,3,4,5,6]}
            yDomain= {[0, 100]}
            // yLabel= "↑ Unemployment (%)"
            xType={scalePoint}
            width={width}
            height={width * 1 / 2}
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
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2 md:gap-4">
          <div ref={blockRef}>
          <PieChart 
            title="模具状态统计" 
            width={blockWidth} 
            data={moldStatusData} 
            name={d => d.label}
            value={d => d.value}
            />
          </div>
          <div >
            <Gauge title="加工中模具数量" width={blockWidth} uom="模具数" value={45} valueRange={[0, 120]} />
          </div>
           
        </div>
        <div className="bg-card px-4 pb-4">
          <h2 className='py-[10px] font-bold'>模具进度</h2>
          <table className="component-table" style={{height: "300px"}}>
            <thead>
              <tr style={{color: "rgb(30,138,136)"}}>
                <th>序号</th>
                <th>模具编号</th>
                <th>版本号</th>
                <th>类型</th>
                <th style={{textAlign: 'center'}}>进度</th>
              </tr>
            </thead>
            <tbody className='bg-card-body'>
              {
                Array.from({ length: 9 }, (_, i) => i ).map(i => 
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>FK{i+1}</td>
                    <td>V{i+1}</td>
                    <td>修模</td>
                    <td>
                      
                      <div style={{ float: "right", paddingLeft: 2, width: "50px" }}>
                        
                        <div style={{ width: "100%", float: "left" }}>
                          <div
                            className=""
                            style={{ width: `${100 - i*10}%`, backgroundColor: "rgb(66, 133, 244)" }}
                          >
                            <br />
                          </div>
                        </div>
                      </div>
                      <span className="float-right">{100 - i*10}%</span>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <div className="bg-card">
          {/* <h2 style={{ paddingTop: `10px`, paddingLeft: `15px`, }}>每月零件产量趋势图</h2> */}
          <LineChart data={partTrendData} 
              x={d => d.month}
              y={d => d.value} 
              z={d => d.name}
              title="每月零件产量趋势图"
              marginLeft={40}
              marginRight={16}
              marginTop={10}
              marginBottom={50}
              // xDomain= {[1,2,3,4,5,6]}
              yDomain= {[0, 100]}
              // yLabel= "↑ Unemployment (%)"
              xType={scalePoint}
              width={width}
              height={width * 1 / 2}
              strokeWidth = {2}
              color= { (z) => partTrendColorMap[z]}
              legendRectWidth = {15}
              legendRectHeight = {15}
              legendRectCornerRadius = {2} // 圆角半径
              legendTextSpacing = {3}     // 色块与文字的间距
              legendItemSpacing = {5}     // 每个项目之间的间距
              voronoi={false} // if true, show Voronoi overlay
          />
        </div>
        
      </div>
      <div>
        2
      </div>
      <div>
        3
      </div>
      {/* <DonutControls/> */}
    </div> 
    </> 
  );
}




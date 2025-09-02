import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
export default function PieChart({
  data,
  width = 400,
  title,
}) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipData, setTooltipData] = useState([]);
  useEffect(() => {
    if(!svgRef.current) return;
    if(width == 0 || height == 0) return;
     draw();
    return () => {
      // 移除所有由 D3 创建的子元素，防止重复渲染
      d3.select(svgRef.current).selectAll("*").remove();
    };
    
  }, [data, width]);
  
  return (
    <div className={`bg-card`} style={{padding: `${margin}px`}}>
    {title && <h2 className="font-bold" style={{
      // paddingLeft: `15px`,
      paddingBottom: `${margin/2}px`,
    }}>{title}</h2>}
    <svg ref={svgRef}
      className="gauge"
      width={gaugeRadius*2}
      height={gaugeRadius*2}
      viewBox={`0 0 ${gaugeRadius*2} ${gaugeRadius*2}`}
      stroke="currentColor"
      fill="currentColor"
      style={{
        maxWidth: "100%",
      }}
    >
    </svg>
  </div>
    );
}
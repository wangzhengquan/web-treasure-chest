import React, { PureComponent } from "react";
import { scaleLinear, lineRadial, symbol, symbolTriangle, line, arc } from "d3";


  /** Red gradient props for arcSegments */
  // const redFade = useGradient(
  //   "rgba(255,0,0,0)",
  //   "rgba(255,0,0,1)",
  //   "redFade-randomkey"
  // );

  /** Renders coloured arcs to demarcate target ranges. */
  // const arcSegments = [
  //   // {min: 0, max:1, color: "#148382"}
  //   { min: 0, max: 0.5, color: "rgb(181,230,29)" },
  //   { min: 0.5, max: 1, color: "orange" },
  //   {
  //     min: 0.75,
  //     max: 1,
  //     ...redFade
  //   }
  // ];

const arcSegments = [
  // {min: 0, max:1, color: "#148382"}
  { start: -136, end: -45, color: "rgb(40,236,175)" },
  { start: -45, end: 45, color: "rgb(56,197,245)" },
  { start: 45, end: 136, color: "rgb(249,71,138)" }
];

export default function GaugeArc({center = { x: 125, y: 135 }, ...props}) {
    // 3. 定义圆弧参数
    const outerRadius = 280 / 2;
    const innerRadius = outerRadius - 20; // 让圆环有20px的厚度
 
    return (
      <g>
        {
          arcSegments.map((segment, index) => {
            const startAngleRad = segment.start * (Math.PI / 180);
            const endAngleRad = segment.end * (Math.PI / 180);
            const arcSegmentGenerator = arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius)
              .startAngle(startAngleRad)
              .endAngle(endAngleRad)
              .padAngle(0)
              .padRadius(0);

            return (
              <path
                key={index}
                className="gauge-arc-segment"
                d={arcSegmentGenerator()}
                transform={`translate(${center.x},${center.y})`}
                fill={segment.color}
                stroke="segment.color"
                strokeWidth="0"
                {...props}
              />
            );
          })
        }
         
      </g>
    );
  
}

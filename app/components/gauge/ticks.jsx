import React, { PureComponent } from "react";
import { scaleLinear, lineRadial, symbol, symbolTriangle, line  } from "d3";


const getTickRef = (tickCount, minVal, maxVal, minAngle, maxAngle) => {
  if (tickCount % 2 === 0)
    console.warn(
      "Ticks should be odd numbered to ensure a tick in in the middle of the gauge."
    );

  const idxToVal = scaleLinear()
    .domain([0, tickCount - 1])
    .range([minVal, maxVal]);

  const idxToDeg = scaleLinear()
    .domain([0, tickCount - 1])
    .range([minAngle, maxAngle]);

  return [...Array(tickCount)].map((v, i) => ({
    index: i,
    val: idxToVal(i),
    deg: idxToDeg(i)
  }));
};

const tickLineShort = line()
  .x(0)
  .y((d, i) => i)({ length: 10 });

export default class Ticks extends PureComponent {
  render() {
    // console.log("Label props: ", this.props);
    const {
      disabled,
      center,
      tickCount,
      min,
      max,
      maxAngle,
      minAngle,
      offsetText,
      length = 280/2 - 20
    } = this.props;

    const ticks = getTickRef(tickCount, min, max, minAngle, maxAngle);

    return ticks.map(({ val, deg, index }) => {
      return (
        <g
          className="gauge-label"
          style={{ userSelect: "none", textAlign: "center" }}
          key={val}
          transform={`translate(${center.x},${center.y}) rotate(${deg})`}
        >
          <path
            d={tickLineShort}
            stroke="#344c69"
            strokeWidth="1"
            transform={`translate(0,${ 20 - 140})`}
            opacity={disabled ? 0.4 : undefined}
          />
          <text
            transform={`translate(${offsetText},${70 - length})`}
            style={{  fontSize: "85%" }}
            opacity={disabled ? 0.4 : undefined}
          >
            {Number(val)}
          </text>
        </g>
      );
    });
  }
}

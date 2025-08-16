import React, { PureComponent, useCallback, useMemo } from "react";
import { scaleLinear, lineRadial, symbol, symbolTriangle, line  } from "d3";

import GaugeArc from "./GaugeArc";
import Ticks from "./ticks";
 
export class Gradient extends PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    const { start, end, id, disabled } = this.props;
    return (
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={disabled ? "rgba(0,0,0,0)" : start} />
          <stop offset="100%" stopColor={disabled ? "rgba(0,0,0,0.4)" : end} />
        </linearGradient>
      </defs>
    );
  }
}


const useGradient = (startColour, stopColour, id) => {
  return {
    color: `url(#${id})`,
    node: disabled => (
      <Gradient
        start={startColour}
        end={stopColour}
        id={id}
        disabled={disabled}
      />
    )
  };
};

export {useGradient};


class InvertedTriangle extends PureComponent {
  render() {
    const { center, disabled } = this.props;
    return (
      <path
        className="gauge-target"
        d={symbol().type(symbolTriangle)()}
        transform={`translate(${center.x},${center.y - 110}) rotate(180)`}
        fill={disabled ? "#adb2ba" : "#ffa500"}
        stroke={disabled ? "#adb2ba" : "#000"}
        strokeWidth={1}
        style={{
          transition: "all 0.25s 0.25s"
        }}
      />
    );
  }
}

class Pointer extends PureComponent {
  render() {
    const {
      width = 12.5,
      head = (0.8 * 250) / 2 - 5,
      tail = 5,
      value = -5,
      tooltip = "",
      center = { x: 125, y: 135 },
      minAngle,
      maxAngle,
      disabled
    } = this.props;

    const pointerLine = line()([
      [width / 2, 0],
      [0, -head],
      [-(width / 2), 0],
      [0, tail],
      [width / 2, 0]
    ]);
    const valueScale = scaleLinear()
      .domain([0, 1])
      .range([minAngle, maxAngle]);
    const pointerValue = valueScale(value);

    return (
      <path
        className="gauge-pointer"
        d={pointerLine}
        transform={`translate(${center.x}, ${
          center.y
        }) rotate(${pointerValue})`}
        fill={"#333"}
        opacity={disabled ? 0.3 : undefined}
        style={{
          transition: "all 0.25s 0.25s"
        }}
      />
    );
  }
}


class UnitOfMeasurement extends PureComponent {
  render() {
    const { value, disabled, center, offsetText, ...rest } = this.props;

    return (
      <text
        transform={`translate(${center.x + offsetText},${center.y + 50})`}
        opacity={disabled ? 0.4 : undefined}
        {...rest}
      >
        {value}
      </text>
    );
  }
}



const defaultSize = 280;

const Gauge = ({
  height,
  width,
  disabled,
  value = -1,
  min = 0,
  max = 100,
  maxAngle = 135,
  minAngle = -135,
  tickCount = 5,
  arcSegments = [{ min: 0, max: 1, color: "skyblue" }],
  labelProps = {
    offsetText: -7.5
  },
  uom = "",
  uomProps = {
    offsetText: -7.5
  },
  pointerLabel = "",
  ...props
}) => {
  const gaugeOrigin = {
    x: 140,
    y: 140
  };

  const valueScale = useCallback(
    scaleLinear().domain([min, max]).range([0, 1]),
    [min, max]
  );

  /** Value scaled to [0,1] */
  const valueRef = useMemo(() => valueScale(value), [value, valueScale]);

  return (
      <svg
        className="gauge"
        width={width ? width : height ? height : defaultSize}
        height={height ? height : width ? width : defaultSize}
        viewBox={"0 0 280 280"}
        // style={{
        //   transition: "all 0.25s 0.25s"
        // }}
        {...props}
      >
         
        <Ticks
          disabled={disabled}
          center={gaugeOrigin}
          tickCount={tickCount}
          min={min}
          max={max}
          maxAngle={maxAngle}
          minAngle={minAngle}
          {...labelProps}
        />
        <GaugeArc
          inset={12}
          // min={min}
          // max={max}
          // stroke={
          //   disabled && !node
          //     ? `rgba(${idx * 15},${idx * 15},${idx * 15}, ${idx * 0.1 +
          //         0.1})`
          //     : color
          // }
          // strokeWidth={20}
          center={gaugeOrigin}
          // maxAngle={maxAngle}
          // minAngle={minAngle}
        />
        <InvertedTriangle center={gaugeOrigin} disabled={disabled} />
        <Pointer
          value={disabled ? -0.025 : valueRef}
          center={gaugeOrigin}
          disabled={disabled}
          maxAngle={maxAngle}
          minAngle={minAngle}
          tooltip={pointerLabel ? pointerLabel : value}
        />
        <UnitOfMeasurement
          value={uom}
          disabled={disabled}
          center={gaugeOrigin}
          {...uomProps}
        />
      </svg>
    
  );
};

export default Gauge;
 


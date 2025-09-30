// import React from "react";

const top = 1,
  right = 2,
  bottom = 3,
  left = 4,
  epsilon = 1e-6;

function identity(x) {
  return x;
}
function translateX(x) {
  return "translate(" + x + ",0)";
}

function translateY(y) {
  return "translate(0," + y + ")";
}

function number(scale) {
  return d => +scale(d);
}

function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return d => +scale(d) + offset;
}

function Axis({ 
  orient = bottom,
  scale,
  ticks=[],
  tickValues = null,
  tickFormat = null,
  tickSizeInner = 6,
  tickSizeOuter = 0,
  tickPadding = 3,
  offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
  showDomainLine = true,
  showTicks = true,
  backgroundLine = 0,
  children,
  ...attrs
 }) {
  const tickArguments = Array.isArray(ticks) ? ticks : [ticks];
  const k = orient === top || orient === left ? -1 : 1,
    x = orient === left || orient === right ? "x" : "y",
    transform = orient === top || orient === bottom ? translateX : translateY;

  var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
      format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
      spacing = Math.max(tickSizeInner, 0) + tickPadding,
      range = scale.range(),
      range0 = +range[0] + offset,
      range1 = +range[range.length - 1] + offset,
      position = (scale.bandwidth ? center : number)(scale.copy(), offset);
  
  // console.log("range1", range)
  return (
    <g {...Object.assign({
      stroke: "currentColor",
      fill: "currentColor",
      fontSize: 10,
      
    }, attrs)}>
      {
        showDomainLine &&
        <path className="domain" 
          d={orient === left || orient === right
              ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
              : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1)
            }
        />
      }
      {values.map((d, i) => (
        <g key={i} className="tick" 
          opacity="1"
          transform={transform(position(d) + offset)} >
          { showTicks && <line {...{[x + "2"]: k * tickSizeInner}} />}
          {
            backgroundLine && <line strokeOpacity="0.1" {...{[x + "2"]: +backgroundLine}} />
          }
          <text {...{[x]: k * spacing}} 
            textAnchor={orient === right ? "start" : orient === left ? "end" : "middle"}
            dy={orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"} 
            // alignmentBaseline={orient === top ? "baseline" : orient === bottom ? "hanging" : "middle"}
          >
            {format(d, i, values)}
          </text>
          {children}
        </g>
      ))}
    </g>
  );
}
 

function AxisTop(props) {
  return <Axis orient={top} {...props} />;
}

function AxisRight(props) {
  return <Axis orient={right} {...props} />;
}

function AxisBottom(props) {
  return <Axis orient={bottom} {...props} />;
}

function AxisLeft(props) {
  return <Axis orient={left} {...props} />;
}

export {
  AxisTop,
  AxisRight,
  AxisBottom,
  AxisLeft
};
'use client';
import { Gauge, useGradient} from '@app/components/gauge';
import { useState, useEffect } from 'react';

export default function MyGauge() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [value, setValue] = useState(35);
  const [minAngle, setMinAngle] = useState(-135);
  const [maxAngle, setMaxAngle] = useState(135);
  const [disabled, setDisabled] = useState(false);
  const [tickCount, setTickCount] = useState(11);
  const [uom, setUom] = useState("Units");
  const [uomOffset, setUomOffset] = useState(-15);
  const [labelOffset, setLabelOffset] = useState(-7);

  // For stress test.
  const [gauges, setGauges] = useState(15);

  // Just to ensure the values are within min max.
  useEffect(() => {
    if (value < min || value > max) {
      setValue(min);
    }
  }, [min, max, value]);


  return(
    <Gauge
      min={min}
      max={max}
      value={value}
      maxAngle={maxAngle}
      minAngle={minAngle}
      disabled={disabled}
      pointerLabel={disabled ? "Disabled" : value}
      tickCount={Number(tickCount)}
      uom={uom}
      uomProps={{
        offsetText: uomOffset
      }}
      labelProps={{
        offsetText: labelOffset
      }}
    />
  );
}

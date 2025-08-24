'use client';
import { Gauge, useGradient} from '@app/components/d3/gauge';
import { useState, useEffect } from 'react';

export default function MyGauge() {
   
  const [value, setValue] = useState(35);
     


  return(
    <Gauge value={value} valueRange={[0, 120]} />
  );
}

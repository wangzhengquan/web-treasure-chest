import { useRef, useState, useLayoutEffect } from 'react';
import {geoMercator, geoPath} from 'd3';
import styles from './geo-map.module.css';

import chinaJson from '@/app/data/map/china.json';
const hotspots = [
  { name: "北京", coordinates: [116.4074, 39.9042] },
  { name: "上海", coordinates: [121.4737, 31.2304] },
  { name: "成都", coordinates: [104.0668, 30.5728] },
  { name: "武汉", coordinates: [114.3055, 30.5928] },
  { name: "厦门", coordinates: [118.1102, 24.4905] }
];
const projection = geoMercator();
const path = geoPath().projection(projection);

export default function GeoMap({
  width = 600,
  height = 400,
}) {
  
  projection.fitSize([width, height], chinaJson);
  path.projection(projection);
  
  return (
    <svg 
      width={width}
      height={height}
      stroke="currentColor"
      fill="currentColor"
    >
    {
      chinaJson.features.map((d, i) => <path key={d.properties.id} className={styles.country} d={path(d)}/>)
    }
    {
      hotspots.map((d, i) => {
        const [x, y] = projection(d.coordinates);
        return (
          <g key={d.name}>
            <circle className={styles.hotspot} cx={x} cy={y}/>
            <text x={x + 5} y={y - 5} fontSize='0.8em' >{d.name}</text>
          </g>
        )
      })
    }

    </svg>
  )
}
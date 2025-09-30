'use client';

import { useEffect, useRef } from "react";
import {scaleLinear, easeElastic, range, select} from "d3";
import styles from './clock.module.css';
import { useState } from "react";
import {  clsx } from 'clsx';
 
const radians = Math.PI / 180;


const twelve = scaleLinear()
  .range([0, 360])
  .domain([0, 12]);

const sixty = scaleLinear()
  .range([0, 360])
  .domain([0, 60]);

export default function Clock({
  width = 500,
  height = width,
  margin = 50,
  radius = Math.min(width, height) / 2 - margin,
  hourHandLength = (2 * radius) / 3,
  minuteHandLength = radius - 30 ,
  secondHandLength = radius ,
  secondHandBalance = 30,
  secondTickStart = radius,
  secondTickLength = -15,
  hourTickStart = radius,
  hourTickLength = -23,
  secondLabelRadius = radius + 16,
  secondLabelYOffset = 5,
  hourLabelRadius = radius - 40,
  hourLabelYOffset = 7,
  
}) {
  // console.log("data=====", data);
  const svgRef = useRef(null);
  const t = new Date();
  const handData = [
    {
      type: "hour",
      value: (t.getHours() % 12) + t.getMinutes() / 60,
      length: -hourHandLength,
      scale: twelve
    },
    {
      type: "minute",
      value: t.getMinutes() + t.getSeconds() / 60,
      length: -minuteHandLength,
      scale: sixty
    },
    {
      type: "second",
      value: t.getSeconds(),
      length: -secondHandLength,
      scale: sixty,
      balance: secondHandBalance
    }
  ];


  function updateData() {
    const t = new Date();
    handData[0].value = (t.getHours() % 12) + t.getMinutes() / 60;
    handData[1].value = t.getMinutes() + t.getSeconds() / 60;
    handData[2].value = t.getSeconds();
  }

  function moveHands(svg) {
    svg.selectAll(".clock-hand")
      .data(handData)
      .transition()
      .ease(easeElastic.period(0.5))
      .attr("transform", d => `rotate(${d.scale(d.value)})`);
  }
  useEffect(() => {
    if(!svgRef.current) return;
      
    const svg = select(svgRef.current);
    updateData(); //draw them in the correct starting position
    // drawClock(svg);
    // Animation
    const interval = setInterval(() => {
      updateData();
      moveHands(svg);
    }, 1000);


    return () => {
      clearInterval(interval);
      // svg.selectAll("*").remove();
    };
    
  }, []);

  return (
     
    <svg ref={svgRef}
      id="clock"
      className={styles.clock}
      width={width}
      height={height}
      viewBox={`${-width/2} ${-height/2} ${width} ${height}`}
      stroke="currentColor"
      fill="currentColor"
      style={{
        maxWidth: "100%",
      }}
      
    >
      {
        // second ticks
        range(0, 60).map(d => (
           <line key={d} className={styles["second-tick"]}
            x1="0" 
            x2="0" 
            y1={secondTickStart}
            y2={secondTickStart + secondTickLength}
            transform={`rotate(${sixty(d)})`}
            suppressHydrationWarning/> 
        ))
      }
      {
        // hour ticks
        range(0, 12).map(d => (
          <line key={d} className={styles["hour-tick"]} 
            x1="0" 
            x2="0" 
            y1={hourTickStart}
            y2={hourTickStart + hourTickLength}
            transform={`rotate(${twelve(d)})`}
            suppressHydrationWarning/>
        ))
      }

      { // hour labels
        range(1, 13).map(d => (
          <text key={d} className={styles["hour-label"]}
            textAnchor="middle"
            x={hourLabelRadius * Math.sin(twelve(d) * radians)}
            y={-hourLabelRadius * Math.cos(twelve(d) * radians) + hourLabelYOffset}
            suppressHydrationWarning
          >
            {d}
          </text>
        ))
      }

      {
        handData.map(d => (
          <g key={d.type} 
            className={clsx("clock-hand", styles[d.type + "-hand"])} 
            transform={`rotate(${d.scale(d.value)})`}
            suppressHydrationWarning>
            <line 
              x1={0} 
              y1={d.balance || 0} 
              x2={0} 
              y2={d.length} 
            />
            <circle 
              x={0} 
              y={0} 
              r={4} 
              className={styles["hands-cover"]}
            />
          </g>
        ))
      }

    </svg>
  );
}
 
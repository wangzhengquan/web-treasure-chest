'use client';

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from './clock.module.css';
 
 
const clockRadius = 200,
  margin = 50,
  w = (clockRadius + margin) * 2,
  h = (clockRadius + margin) * 2,
  hourHandLength = (2 * clockRadius) / 3,
  minuteHandLength = clockRadius - 30 ,
  secondHandLength = clockRadius ,
  secondHandBalance = 30,
  secondTickStart = clockRadius,
  secondTickLength = -15,
  hourTickStart = clockRadius,
  hourTickLength = -23,
  secondLabelRadius = clockRadius + 16,
  secondLabelYOffset = 5,
  hourLabelRadius = clockRadius - 40,
  hourLabelYOffset = 7,
  radians = Math.PI / 180;

const twelve = d3
  .scaleLinear()
  .range([0, 360])
  .domain([0, 12]);

const sixty = d3
  .scaleLinear()
  .range([0, 360])
  .domain([0, 60]);

const handData = [
  {
    type: "hour",
    value: 0,
    length: -hourHandLength,
    scale: twelve
  },
  {
    type: "minute",
    value: 0,
    length: -minuteHandLength,
    scale: sixty
  },
  {
    type: "second",
    value: 0,
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
  svg.select("#clock-hands")
    .selectAll("g")
    .data(handData)
    .transition()
    .ease(d3.easeElastic.period(0.5))
    .attr("transform", d => `rotate(${d.scale(d.value)})`);
}

function drawClock(svg) {
  // create all the clock elements
  updateData(); //draw them in the correct starting position
  const face = svg
    .append("g")
    .attr("id", "clock-face")
    .attr("transform", `translate(${[w / 2, h / 2]})`);

  // add marks for seconds
  face
    .selectAll(`.${styles["second-tick"]}`)
    .data(d3.range(0, 60))
    .enter()
    .append("line")
    .attr("class", styles["second-tick"])
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", secondTickStart)
    .attr("y2", secondTickStart + secondTickLength)
    .attr("transform", d => `rotate(${sixty(d)})`);

  // ... and hours
  face
    .selectAll(`.${styles["hour-tick"]}`)
    .data(d3.range(0, 12))
    .enter()
    .append("line")
    .attr("class", styles["hour-tick"])
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", hourTickStart)
    .attr("y2", hourTickStart + hourTickLength)
    .attr("transform", d => `rotate(${twelve(d)})`);

  face
    .selectAll(`.${styles["hour-label"]}`)
    .data(d3.range(1, 13))
    .enter()
    .append("text")
    .attr("class", styles["hour-label"])
    .attr("text-anchor", "middle")
    .attr("x", d => hourLabelRadius * Math.sin(twelve(d) * radians))
    .attr(
      "y",
      d => -hourLabelRadius * Math.cos(twelve(d) * radians) + hourLabelYOffset
    )
    .text(d => d);

  const hands = face.append("g").attr("id", "clock-hands");

  
  const hand = hands
    .selectAll("g")
    .data(handData)
    .enter()
    .append("g")
    .attr("class", d =>  styles[d.type + "-hand"])
    .attr("transform", d => `rotate(${d.scale(d.value)})`);

  hand.append("line")
    .attr("x1", 0)
    .attr("y1", d => d.balance || 0)
    .attr("x2", 0)
    .attr("y2", d => d.length);

  hand.append("circle")
    .attr("x", 0)
    .attr("y", 0)
    .attr("r", 4)
    .attr("class", styles["hands-cover"]);
   
   
}

export default function Clock({width = '100%', height = 500}) {
  // console.log("data=====", data);
  const svgRef = useRef(null);
  useEffect(() => {
    if(!svgRef.current) return;
      
    const svg = d3.select(svgRef.current);
    drawClock(svg);
    // Animation
    const interval = setInterval(() => {
      updateData();
      moveHands(svg);
    }, 1000);


    return () => {
      clearInterval(interval);
      svg.selectAll("*").remove();
    };
    
  }, []);

  return (
     
    <svg ref={svgRef}
      id="clock"
      className={styles.clock}
      width={width}
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      stroke="currentColor"
      fill="currentColor"
      style={{
        maxWidth: "100%",
      }}
    >
    </svg>
  );
}

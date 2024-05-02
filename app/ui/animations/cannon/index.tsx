'use client';
import {makeDragalbe} from '@/app/components/simple_drag';
import {Button} from "@/components/ui/button";
import { useCallback, useEffect, useRef } from 'react';
import {CannonIcon, BearIcon} from './cannon-icons';
type Point = {
  x: number;
  y: number;
}

const startPoint = { x: 208, y: 158 };
const endPoint = { x: 839, y: 193 };
const controlPoint = { x: 480, y: 12 };

// get number part of the style left
function getNumberOfPx(str: string) {
  return parseInt(str.replace('px', ''));
}

function getCurvePath(start: HTMLElement, end: HTMLElement, control: HTMLElement) {
  console.log(` start:${start.style.left}, ${start.style.top}
  end:${end.style.left}, ${end.style.top}
  control:${control.style.left}, ${control.style.top}`);

  const path = "M" + getNumberOfPx(start.style.left) + " " + getNumberOfPx(start.style.top)
          + " Q " + getNumberOfPx(control.style.left) + " " + getNumberOfPx(control.style.top)
          + " " + getNumberOfPx(end.style.left) + " " + getNumberOfPx(end.style.top);
  return path;
}
export default function SimpleDrag() {
  const start = useRef<HTMLAnchorElement>(null);
  const end = useRef<HTMLAnchorElement>(null);
  const control = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const quadraticCurve = useRef<SVGPathElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const svgcontext = useRef<SVGSVGElement>(null);
  const updatePaths = useCallback(() => {
    if (!start.current || !end.current || !control.current || !quadraticCurve.current) return;
    quadraticCurve.current.setAttribute('d', getCurvePath(start.current, end.current, control.current));
  }, []);

  const fire = useCallback(() => {
    if (!ballRef.current || !start.current || !end.current || !control.current || !quadraticCurve.current) return;
    console.log("fire");
    const ball = ballRef.current;
    ball.style.display = 'block';
    ball.style.offset= `path("${getCurvePath(start.current, end.current, control.current)}") auto`;
    ball.classList.remove('animate-followpath');
    ball.classList.add('animate-followpath');
    ball.addEventListener('animationend', () => {
      ball.style.display = 'none';
      ball.classList.remove('animate-followpath');
    }, {once: true});
    // ball.style.animation = 'followpath 2s linear';
  },[]);

  useEffect(() => {
    if (!svgcontext.current) return;
    let rect = svgcontext.current.getBoundingClientRect();
    updatePaths();
    if (dragRef.current) {
      makeDragalbe(dragRef.current);
    }
    if (start.current) {
      makeDragalbe(start.current, function (el, pageX, startX, pageY, startY) {
        pageX -= rect.left;
        pageY -= rect.top;
        el.style.left = String(pageX);
        el.style.top = String(pageY);
        updatePaths();
        // updatePaths(pageX, pageY);
      });
    }

    if (end.current) {
      makeDragalbe(end.current, function (el, pageX, startX, pageY, startY) {
        pageX -= rect.left;
        pageY -= rect.top;
        el.style.left = String(pageX);
        el.style.top = String(pageY);
        updatePaths();
        // updatePaths(pageX, pageY);
      });
    }

    if (control.current) {
      makeDragalbe(control.current, function (el, pageX, startX, pageY, startY) {
        pageX -= rect.left;
        pageY -= rect.top;
        el.style.left = String(pageX);
        el.style.top = String(pageY);
        updatePaths();
        // updatePaths(pageX, pageY);
      });
    }
     
  }, []);
  return (
    <div className='h-full w-full relative'>
      
      <svg className='h-full w-full' width="100%" height="100%" ref={svgcontext}>
        <path ref={quadraticCurve} d="" fill="none" stroke="green" strokeWidth="2"></path>
        {/* <circle ref={control} cx="150" cy="50" r="5" fill="red" stroke="red" strokeWidth="2" > </circle> */}
        {/* <circle ref={start} cx="100" cy="100" r="5" fill="red" stroke="red" strokeWidth="2" ></circle> */}
        {/* <circle ref={end} cx="200" cy="100" r="5" fill="red" stroke="red" strokeWidth="2" ></circle> */}
      </svg>
      <Button className="absolute left-0 top-0" onClick={fire}>fire</Button>
      <div ref={ballRef} className="absolute hidden left-0 top-0 w-10 h-10 rounded-full bg-red-500 animate-followpath" ></div>
      <a ref={start} style={{left: startPoint.x, top: startPoint.y}} className="absolute block">
        <CannonIcon className="w-[120px] h-[120px] stroke-orange-600 fill-foreground -ml-[120px]"/>
      </a> 
      <a ref={end} style={{left: endPoint.x, top: endPoint.y}} className="absolute block">
        <BearIcon className="w-[120px] h-[120px] stroke-orange-600 fill-foreground "/>
      </a> 
      <div ref={control} className="absolute w-4 h-4 rounded-full bg-red-500 " 
        style={{left: controlPoint.x, top: controlPoint.y}}></div>
      
      {/* <div style={{ left: 0, top: 0, width: "100px", height: "100px", border: "1px solid red" }}></div> */}
    </div>
  );

  // start:204, 158.5
  // end:839, 193.5
  // control:480, 12.5
}
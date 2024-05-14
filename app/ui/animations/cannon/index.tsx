'use client';
import {makeDragalbe} from '@/app/components/simple_drag';
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {CannonIcon, BearIcon, CalibrationIcon} from './cannon-icons';
import CubicCircleButton from '@/app/components/cubic-circle-button';
import Main from '@/app/ui/main';
type Point = {
  x: number;
  y: number;
}

const startPoint = { x: 172, y: 253 };
const endPoint = { x: 842, y: 236 };
const controlPoint = { x: 476, y: 109 };

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
export default function Cannon() {
  const start = useRef<HTMLAnchorElement>(null);
  const end = useRef<HTMLAnchorElement>(null);
  const control = useRef<HTMLAnchorElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const quadraticCurve = useRef<SVGPathElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const svgcontext = useRef<SVGSVGElement>(null);

  const updatePaths = useCallback(() => {
    if (!start.current || !end.current || !control.current || !quadraticCurve.current) return;
    const tan = (control.current.offsetTop - start.current.offsetTop) / (control.current.offsetLeft - start.current.offsetLeft);
    // console.log('tan', control.current.offsetTop , start.current.offsetTop, control.current.offsetLeft , start.current.offsetLeft, tan);
    let radian =  Math.atan(tan);
    if ((radian > 0 && control.current.offsetLeft < start.current.offsetLeft) 
      || (radian < 0 && control.current.offsetLeft < start.current.offsetLeft)
    ) {
      radian += Math.PI;
    }  
    start.current.style.transform = `translate(-50%, -50%) rotate(${Math.PI/4 + radian}rad)`;
    // start.current.style.transform = `translate(-50%, -50%) rotate(${Math.atan(tan) * 180 / Math.PI}deg)`;
    quadraticCurve.current.setAttribute('d', getCurvePath(start.current, end.current, control.current));
  }, []);

  const fire = useCallback(() => {
    if (!ballRef.current || !start.current || !end.current || !control.current || !quadraticCurve.current) return;
    // console.log("fire");
    const ball = ballRef.current;
    ball.style.display = 'block';
    ball.style.offset= `path("${getCurvePath(start.current, end.current, control.current)}") auto`;
    ball.classList.remove('animate-followpath');
    ball.classList.add('animate-followpath');
    ball.addEventListener('animationend', () => {
      ball.style.display = 'none';
      ball.classList.remove('animate-followpath');
    }, {once: true});
  },[]);

  useLayoutEffect(() => {
    if (!parentRef.current || !ballRef.current || !start.current || !end.current || !control.current || !quadraticCurve.current) return;
    const rect = parentRef.current.getBoundingClientRect();
    console.log('rect', rect);
    start.current.style.left = start.current.getBoundingClientRect().width/2  + 'px';
    start.current.style.top = '236px';
    end.current.style.left = rect.width - end.current.getBoundingClientRect().width  + 'px';
    end.current.style.top = '236px';
    control.current.style.left = (rect.width - control.current.getBoundingClientRect().width) / 2 + 'px';
    control.current.style.top = '80px';
    updatePaths();
  }, []);

  useEffect(() => {
    if (!svgcontext.current) return;
    let rect = svgcontext.current.getBoundingClientRect();
    
    if (dragRef.current) {
      makeDragalbe(dragRef.current);
    }
    if (start.current) {
      makeDragalbe(start.current, function (el, pageX, startX, pageY, startY) {
        updatePaths();
      });
    }

    if (end.current) {
      makeDragalbe(end.current, function (el, pageX, startX, pageY, startY) {
        updatePaths();
      });
    }

    if (control.current) {
      makeDragalbe(control.current, function (el, pageX, startX, pageY, startY) {
        updatePaths();
      });
    }
     
  }, []);
  return (
    <Main className='h-full w-full'>
      <UpdateBreadcrumbs breadcrumbs={[{label: 'Cannon', href: ''}]}/>
      <div ref={parentRef} className={`cannon-game hidden h-full w-full relative`}>
        <svg className='h-full w-full' width="100%" height="100%" ref={svgcontext}>
          <path ref={quadraticCurve} d="" fill="none" stroke="green" strokeWidth="2"></path>
        </svg>
        <CubicCircleButton className="absolute left-8 top-8 w-[80px] h-[80px] block text-white" onPointerDown={fire}>Fire</CubicCircleButton>
        {/* <Button className="absolute left-8 top-8" onClick={fire}>fire</Button> */}
        <div ref={ballRef} className="absolute hidden left-0 top-0 w-10 h-10 rounded-full bg-red-500 animate-followpath" ></div>
        <a ref={start} style={{
            transform: 'translate(-50%, -50%) rotate(0deg)'
          }} 
          className="absolute block origin-center cursor-move">
          <CannonIcon className="w-[120px] h-[120px] stroke-orange-600 fill-foreground "/>
        </a> 
        <a ref={end}  className="absolute block cursor-move">
          <BearIcon className="w-[120px] h-[120px] stroke-orange-600 fill-foreground "/>
        </a> 
        <a ref={control} className="absolute block cursor-move">
          <CalibrationIcon className="w-[60px] h-[60px] "/>
        </a>
         
      </div> 
      <div className='not-support-tip p-10 hidden'>
        Your browser does not support the path offset feature, please use a modern browser.
      </div>
      <style jsx>{`
        @supports not (offset: path('M 20 60 L 120 60')) {
          .not-support-tip {
            display: block;
          }
        }

        @supports (offset: path('M 20 60 L 120 60')) {
          .cannon-game {
            display: block;
          }
        }
      `}</style>
    </Main>
  );

}
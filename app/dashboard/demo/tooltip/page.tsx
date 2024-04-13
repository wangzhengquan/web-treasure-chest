'use client';
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface TargetRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function Tooltip({ children, targetRect }: { children: React.ReactNode, targetRect: TargetRect | null }) {
  const ref = useRef<HTMLElement | null>(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
      console.log('Measured tooltip height: ' + height);
    }
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}

function TooltipContainer({ children, x, y, contentRef }: { children: React.ReactNode, x: number, y: number, contentRef: React.RefObject<any> }) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <div ref={contentRef} className="tooltip  bg-gray-800 text-white p-2 rounded-lg ">
        {children}
      </div>
    </div>
  );
}


function ButtonWithTooltip({ tooltipContent, ...rest }: { tooltipContent: React.ReactNode } & React.ComponentProps<'button'>) {
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          if (buttonRef.current){
            const rect = buttonRef.current.getBoundingClientRect();
            setTargetRect({
              left: rect.left,
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
            });
          }
          
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>
          {tooltipContent}
        </Tooltip>
      )
    }
    </>
  );
}


export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-xl`}>Tooltip</h1>
      </div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
    </div>
  );
  
}


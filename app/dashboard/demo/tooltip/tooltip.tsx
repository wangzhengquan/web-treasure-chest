'use client';
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Tooltip({
  children,
  targetRect,
}: {
  children: React.ReactNode;
  targetRect: DOMRect | null;
}) {
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
    document.body,
  );
}

function TooltipContainer({
  children,
  x,
  y,
  contentRef,
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  contentRef: React.RefObject<any>;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div
        ref={contentRef}
        className="tooltip  rounded-lg bg-gray-800 p-2 text-white "
      >
        {children}
      </div>
    </div>
  );
}

export function ButtonWithTooltip({
  tooltipContent,
  ...rest
}: { tooltipContent: React.ReactNode } & React.ComponentProps<'button'>) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setTargetRect(rect);
          }
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
      )}
    </>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';

export default function Page() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: PointerEvent) => {
      console.log('event', event);
      /**
       * event.clientX provides the horizontal coordinate of the mouse pointer relative to the entire viewport (the visible area of the web page).
       * event.offsetX provides the horizontal coordinate of the mouse pointer relative to the target element that the event was triggered on.
       */
      setPosition({ x: event.offsetX, y: event.offsetY });
    };
    tableRef.current?.addEventListener('pointermove', listener);
    return () => {
      tableRef.current?.removeEventListener('pointermove', listener);
    };
  }, []);

  return (
    <div ref={tableRef} className="relative h-full w-full">
      <h1>Move your mouse around</h1>

      <div
        style={{
          position: 'absolute',
          backgroundColor: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      />
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState, forwardRef} from "react";
const Tooltip= forwardRef(function ({ 
  title,
  data,
  open,
  x, y,
}, ref) {
  return (
    <div ref={ref} className="p-[10px] bg-card-body border border-border rounded shadow shadow-shadow"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 999,
        left: 0,
        top: 0,
        transform:  `translate(${x}px, ${y}px)`,
        transition: "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        opacity: open ? 1 : 0,
        display: open ? "block" : "none",
      }}>
       
      <h3 className="font-semibold">{title}</h3>
      {
        data.map( (d, i) => (
          <div key={d.name} className="mt-[10px] block" style={{lineHeight: 1}}>
            <span className="w-[10px] h-[10px] rounded-full inline-block" style={{backgroundColor: d.color, lineHeight: 1}}/>
            <span className="inline-block ml-[6px]" style={{lineHeight: 1}}>{d.name}</span>
            <span className="font-semibold  text-right inline-block ml-[20px] float-right" style={{lineHeight: 1}}>{d.value}</span>
          </div>
        ) )
      }
       {/* //flex items-center justify-between gap-4 */}
    </div>
  );  
});
Tooltip.displayName = "Tooltip";
export default Tooltip;
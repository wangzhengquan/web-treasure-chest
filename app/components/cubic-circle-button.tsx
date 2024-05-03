import {useState} from 'react';
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
}
export default function CubicCircleButton({className, onPointerDown, onPointerUp, children, ...rest}: ButtonProps) {
  const [scale, setScale] = useState(1);
  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    console.log('handlePointerDown', event);
    setScale(0.9);
    onPointerDown?.(event);
  }
  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    console.log('handlePointerUp', event);
    setScale(1);
    onPointerUp?.(event);
  }
  return (
  <button className={`block cursor-pointer ${className}`} 
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
    {...rest}>
    <svg
      width="200"
      viewBox="0 0 200 200"
      className="w-full h-full" >
      <defs>
        {/* <!-- Filter declaration --> */}
        <filter
          id="cubic-button-filter"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="200">
          {/* <!-- offsetBlur --> */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />

          {/* <!-- litPaint --> */}
          <feSpecularLighting
            in="blur"
            surfaceScale="5"
            specularConstant=".75"
            specularExponent="20"
            lightingColor="#bbbbbb"
            result="specOut">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite
            in="specOut"
            in2="SourceAlpha"
            operator="in"
            result="specOut" />
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint" />

          {/* <!-- merge offsetBlur + litPaint --> */}
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="litPaint" />
          </feMerge>
        </filter>
      </defs>

      {/* <!-- Graphic elements --> */}
      <g filter="url(#cubic-button-filter)" transform={`scale(${scale})`}>
        <circle cx="100" cy="100" r="80" fill="#D90000" />
        <g fill="#FFFFFF" stroke="black" fontSize="60">
          <text x="50" y="120">{children}</text>
        </g>
      </g>
    </svg>
  </button>
  );
}
export default function SvgFilter() {
  return (
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        {/* <!-- Filter declaration --> */}
        <filter
          id="cubic-filter"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="120"
        >
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
            result="specOut"
          >
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite
            in="specOut"
            in2="SourceAlpha"
            operator="in"
            result="specOut"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />

          {/* <!-- merge offsetBlur + litPaint --> */}
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="litPaint" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

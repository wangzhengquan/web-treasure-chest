
// import "/svg-effects/svg-filter.svg"
export default function FilterDemo () {
  return (
    <>
    <svg
      width="250"
      viewBox="0 0 200 85"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1">
       

      {/* <!-- Graphic elements --> */}
      <g filter="url(#cubic-filter)">
        <path
          fill="none"
          stroke="#D90000"
          strokeWidth="10"
          d="M50,66 c-50,0 -50,-60 0,-60 h100 c50,0 50,60 0,60z" />
        <path
          fill="#D90000"
          d="M60,56 c-30,0 -30,-40 0,-40 h80 c30,0 30,40 0,40z" />
       
        <g fill="#FFFFFF" stroke="black" fontSize="45" fontFamily="Verdana">
          <text x="52" y="52">SVG</text>
        </g>
      </g>
    </svg>
    <button className="cubic-filter bg-[#D90000] w-20 h-20 rounded-full">SVG</button>
    </>
  );
}
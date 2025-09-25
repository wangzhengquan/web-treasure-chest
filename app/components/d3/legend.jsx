function emptyFunc(e) {}

export function RectLegend({
  data,
  color,
  onPointerEnter = emptyFunc,
  onPointerLeave = emptyFunc

}) {
  // console.log('Legend', data);
  return (
    <div className="flex justify-center items-center gap-[5px]">
    { 
      data.map((name, i) => (
      <div key={name} className="flex justify-center items-center"
        onPointerEnter={(e) => onPointerEnter(e, name)}
        onPointerLeave={(e) => onPointerLeave(e, name)}
      >
        <div style={{
          width: '12px',
          height: '12px',
          backgroundColor: color(name),
        }}></div>
        <div style={{marginLeft: "3px"}}>
          <span>{name}</span>
        </div>
      </div>
      ))
    }
    </div> 
  )
}
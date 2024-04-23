// merge properties of object a to object b
// const merge = (a, b) => ({ ...a, ...b });


function Ball({className, style}: {className?: string, style?: any}) {
  return <div className={`animate-loading ${className}`} style={{
    ...style,
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  }}/>
}

export default function Loading() {
  return (
    <div className="flex flex-row gap-2 w-fit">
      <Ball style={{animationDelay: '0ms',   backgroundColor: 'rgb(97, 102, 197)'}}/>
      <Ball style={{animationDelay: '100ms', backgroundColor: 'rgb(83, 135, 185)'}}/>
      <Ball style={{animationDelay: '200ms', backgroundColor: 'rgb(69, 161, 175)'}}/>
      <Ball style={{animationDelay: '300ms', backgroundColor: 'rgb(50, 130, 132)'}}/>
      <Ball style={{animationDelay: '400ms', backgroundColor: 'rgb(53, 198, 156)'}}/>
    </div>
  );
}
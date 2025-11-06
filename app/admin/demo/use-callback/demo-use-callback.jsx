'use client';
import React, { useState, useCallback, use, useEffect } from 'react';
import { Button } from '@app/components/button';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 1. 依赖项为空数组，意味着函数永远不会改变
  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 依赖项为空数组

  // 2. 依赖项包含 count，当 count 变化时，这个函数会重新创建
  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]); // 依赖项是 count

  
  return (
    <div className=' space-y-4 '>
      <p className='text-7xl flex justify-center items-center'>Count: {count}</p>
      <div className='flex gap-4'>
        <Button onClick={() => setCount(count + 1)}>Update Count</Button>
      </div>
      <Comp onIncrement={handleClick} />
      <Comp2 title="Child Component 2 (Memoized)" onIncrement={handleClick} />
    </div>
  );
}
ParentComponent.displayName = "ParentComponent";

// let count = 0;

const ChildComponent = ({title="Child Component ", onIncrement, children }) => {
  // count++;
  // console.log(title);
  return (
    <div className='bg-card p-4' >
      <h3>{title}</h3>
      {/* <div suppressHydrationWarning>Render Count: {count}</div> */}
      <Button onClick={() => onIncrement()}>Increment</Button>
      {children}
    </div>
  );
};
ChildComponent.displayName = "ChildComponent"


// const ChildComponent2 = React.memo(ChildComponent);
 
const withRenderCount = (Component) => {
  let count = 0;
  return (props) => {
    count++;
    console.log('withRenderCount HOC Render Count: ', count);
    return (
      <Component {...props} >
        <div suppressHydrationWarning>Render Count: {count}</div>
      </Component>
    )
  };
};

const Comp = withRenderCount(ChildComponent);
Comp.displayName = 'Comp';
const Comp2 = React.memo(Comp);
Comp2.displayName = 'Comp2';


export default ParentComponent;
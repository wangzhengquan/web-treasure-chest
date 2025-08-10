'use client';
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Button } from '@app/components/button';
interface IProps {
  name: string;
  counter: number;
  children?: React.ReactNode;
}

interface IState {
  counter: number;
}

export function LifeCycleCmp(props: IProps) {
  const [counter, setCounter] = useState(1);
  const handleCountChange = () => {
    setCounter(counter + 1);
  };

  // useEffect(() => {
  //   console.log(`${props.name} componentDidMount`);
  //   return () => {
  //     console.log(`${props.name} componentWillUnmount`);
  //   }
  // }, []);

  useLayoutEffect(() => {
    console.log(`${props.name} componentDidMount`);
    return () => {
      console.log(`${props.name} componentWillUnmount`);
    };
  }, [props.name]);

  useEffect(() => {
    console.log(`${props.name} componentDidUpdate`);
  });

  return (
    <div className="rounded-md bg-card p-5">
      <h2 className="text-xl font-bold">{props.name}</h2>
      <Button onClick={handleCountChange}>Increment</Button>
      <p>State: {counter}.</p>
      <p>Props: {props.counter}.</p>
      <ChildCmp name="ChildCmp" counter={counter} />
    </div>
  );
}

export function ChildCmp(props: IProps) {
  // const [counter, setCounter] = useState(props.counter);
  const propsRef = useRef<HTMLParagraphElement>(null);
  const [counter2, setCounter2] = useState(0);
  const [counter, setCounter] = useControllableState({
    prop: props.counter,
    defaultProp: 0,
    onChange: (c) => {
      console.log('counter changed', c);
      // props.counter = c;
    },
  });

  const ref = (node: HTMLDivElement) => {
    console.log('ref', node);
  };
  let counter3 = 0;

  const handleCountChange = () => {
    setCounter((counter as number) + 1);
    setCounter2(counter2 + 1);
    counter3 = counter3 + 1;
    if (propsRef.current) {
      propsRef.current.textContent = 'Props: ' + 0;
      // console.log('propsRef', propsRef.current);
    }
  };

  useLayoutEffect(() => {
    console.log(`${props.name} useLayoutEffect componentDidMount`);
    return () => {
      console.log(`${props.name} useLayoutEffect componentWillUnmount`);
    };
  }, [props.name]);

  useEffect(() => {
    console.log(`${props.name} useEffect componentDidMount`);
    return () => {
      console.log(`${props.name}useEffect componentWillUnmount`);
    };
  }, [props.name]);

  useEffect(() => {
    console.log(`${props.name} componentDidUpdate`);
  });
  return (
    <div className="rounded-md bg-card p-5" ref={ref}>
      <h2 className="text-xl font-bold">{props.name}</h2>
      <Button onClick={handleCountChange}>Increment</Button>
      <p>
        <span>State: counter: {counter}</span>
        <span>; counter2: {counter2}</span>
        <span>; counter3: {counter3}</span>
      </p>
      <p ref={propsRef}>Props: {props.counter}.</p>
    </div>
  );
}

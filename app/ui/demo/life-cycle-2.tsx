'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {Button} from '@/components/ui/button';
interface IProps {
  name: string;
  counter: number;
  children?: React.ReactNode;
};

interface IState {
  counter: number;
};

export function LifeCycleCmp(props: IProps) {
  const [counter, setCounter] = useState(1);
  const handleCountChange = () => {
    setCounter(counter + 1);
  }

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
    }
  }, []);

  useEffect(() => {
    console.log(`${props.name} componentDidUpdate`);
  });

  return (
    <div className='rounded-md bg-card p-5'>
      <h2 className='text-xl font-bold'>{props.name}</h2>
      <Button onClick={handleCountChange}>
        Increment 
      </Button>
      <p>State: {counter}.</p>
      <p>Props: {props.counter}.</p>
      <ChildCmp name="ChildCmp" counter={counter} />
    </div>
  );

}

export function ChildCmp(props: IProps) {
  // const [counter, setCounter] = useState(props.counter);
  const [counter, setCounter] = useControllableState({
    prop: props.counter, 
    defaultProp: 0, 
    onChange: (c) => {
      console.log('counter changed', c);
      // props.counter = c;
    }
  });

  const handleCountChange = () => {
    setCounter(counter as number + 1);
  }

  useLayoutEffect(() => {
    console.log(`${props.name} componentDidMount`);
    return () => {
      console.log(`${props.name} componentWillUnmount`);
    }
  }, []);

  useEffect(() => {
    console.log(`${props.name} componentDidUpdate`);
  });
  return (
    <div className='rounded-md bg-card p-5'>
      <h2 className='text-xl font-bold'>{props.name}</h2>
      <Button onClick={handleCountChange}>
        Increment 
      </Button>
      <p>State: {counter}.</p>
      <p>Props: {props.counter}.</p>
    </div>
  );
}
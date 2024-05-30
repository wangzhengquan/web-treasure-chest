'use client';
import React, { Component } from 'react';
import { Button } from '@/components/ui/button';
interface IProps {
  name: string;
  counter: number;
  children?: React.ReactNode;
}

interface IState {
  counter: number;
}

export class LifeCycleCmp extends Component<IProps, IState> {
  state: IState = { counter: 1 };
  // props: IProps = { name: 'LifeCycleCmp', counter: 0 };
  constructor(props: IProps) {
    super(props);
    console.log(`${props.name} constructor`);
  }

  /**
   * If you define the componentDidMount method, React will call it after the component has been rendered to the DOM.
   * This is a good place to set up a timer or send an AJAX request.
   *
   */
  componentDidMount() {
    console.log(`${this.props.name} componentDidMount`);
  }

  /**
   * If you define the componentDidUpdate method, React will call it immediately after your component has been re-rendered with updated props or state.
   * This method is not called for the initial render.
   *
   */
  componentDidUpdate(prevProps: IProps, prevState: IState) {
    console.log(`${this.props.name} componentDidUpdate`);
  }

  /**
   * If you define the componentWillUnmount method, React will call it when the component is removed from the DOM.
   */
  componentWillUnmount() {
    console.log(`${this.props.name} componentWillUnmount`);
  }

  render() {
    return (
      <div className="rounded-md bg-card p-5">
        <h2 className="text-xl font-bold">{this.props.name}</h2>
        <Button onClick={this.handleCountChange}>Increment</Button>
        <p>State: {this.state.counter}.</p>
        <p>Props: {this.props.counter}.</p>
        <ChildCmp name="ChildCmp" counter={this.state.counter} />
      </div>
    );
  }

  handleCountChange = () => {
    this.setState(
      {
        counter: this.state.counter + 1,
      },
      () => {
        console.log(this.props.name, 'Counter updated', this.state.counter);
      },
    );
  };
}

class ChildCmp extends Component<IProps, IState> {
  // state: IState = { counter: 0 };
  // props: IProps = { name: 'LifeCycleCmp', counter: 0 };
  constructor(props: IProps) {
    super(props);
    this.state = { counter: props.counter };
    console.log(`${props.name} constructor`);
  }

  /**
   * If you define the componentDidMount method, React will call it after the component has been rendered to the DOM.
   * This is a good place to set up a timer or send an AJAX request.
   *
   */
  componentDidMount() {
    console.log(`${this.props.name} componentDidMount`);
  }

  /**
   * If you define the componentDidUpdate method, React will call it immediately after your component has been re-rendered with updated props or state.
   * This method is not called for the initial render.
   *
   */
  componentDidUpdate(prevProps: IProps, prevState: IState) {
    console.log(`${this.props.name} componentDidUpdate`);
  }

  /**
   * If you define the componentWillUnmount method, React will call it when the component is removed from the DOM.
   */
  componentWillUnmount() {
    console.log(`${this.props.name} componentWillUnmount`);
  }

  render() {
    return (
      <div className="rounded-md bg-card p-5">
        <h2 className="text-xl font-bold">{this.props.name}</h2>
        <Button onClick={this.handleCountChange}>Increment</Button>
        <p>State: {this.state.counter}.</p>
        <p>Props: {this.props.counter}.</p>
      </div>
    );
  }

  handleCountChange = () => {
    this.setState(
      {
        counter: this.state.counter + 1,
      },
      () => {
        console.log(this.props.name, 'Counter updated', this.state.counter);
      },
    );
  };
}

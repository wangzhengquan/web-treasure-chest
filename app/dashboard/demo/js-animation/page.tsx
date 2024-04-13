'use client';
import { useState, useEffect, useRef } from 'react';
class FadeInAnimation {
  private node: HTMLElement | null;
  private duration: number;
  private startTime: number | null;
  private frameId: number | null;

  constructor(node: HTMLElement | null) {
    this.node = node;
    this.duration = 1000;
    this.startTime = null;
    this.frameId = null;
  }

  start(duration: number) {
    this.duration = duration;
    if (this.duration === 0) {
      // Jump to end immediately
      this.onProgress(1);
    } else {
      this.onProgress(0);
      // Start animating
      // `performance.now()` measures the time in milliseconds since the page was loaded, or since the browser was started, with high-resolution timing.
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  onFrame() {
    const timePassed = performance.now() - this.startTime!;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  } 

  onProgress(progress: number) {
    if (this.node) {
      this.node.style.opacity = progress.toString();
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId!);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}     


function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(1000);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>

      <button onClick={() => setShow(!show)} className="
        bg-sky-500 text-white font-bold py-2 px-4 rounded
        hover:bg-sky-700 transition-colors duration-300 ease-in-out
      ">
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}

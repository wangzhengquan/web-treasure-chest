'use client';
type TOnProgress = (progress: number) => void;
type TOnStop = (() => void) | undefined;

class Animation {
  private duration: number;
  private startTime: number | null;
  private frameId: number | null;
  private onProgress: TOnProgress;
  private onStop: TOnStop;

  constructor() {
    this.duration = 0;
    this.startTime = null;
    this.frameId = null;
    this.onProgress = () => {};
  }

  start(duration: number, onProgress: TOnProgress, onStop: TOnStop) {
    this.duration = duration;
    this.onProgress = onProgress;
    this.onStop = onStop;
    if (this.duration === 0) {
      // Jump to end immediately
      this.onProgress(1);
      this.stop();
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
    } else {
      this.onStop && this.onStop();
    }
  }

  // onProgress(progress: number) {
  //   if (this.node) {
  //     this.node.style.opacity = progress.toString();
  //   }
  // }

  stop() {
    cancelAnimationFrame(this.frameId!);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
    this.onStop && this.onStop();
  }
}

export default Animation;

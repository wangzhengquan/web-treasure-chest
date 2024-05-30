'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

function FullScreenIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function ExitFullScreenIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default function FullScreenToggle() {
  const [isFullScreen, setFullScreen] = useState(false);
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullScreen(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => toggleFullScreen()}
      // onKeyDown={(e) => {console.log(e.key)}}
    >
      <FullScreenIcon
        className={`h-[1.6rem] w-[1.6rem] transition-all ${isFullScreen ? 'scale-0' : 'scale-100'}`}
      />
      <ExitFullScreenIcon
        className={`absolute h-[1.6rem] w-[1.6rem] transition-all ${isFullScreen ? 'scale-100' : 'scale-0'}`}
      />
      <span className="sr-only">Toggle FullScreen</span>
    </Button>
  );
}

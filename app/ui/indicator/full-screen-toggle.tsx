'use client';
import { useState } from 'react';
import { Button } from '@app/components/button';
import {FullScreenIcon, ExitFullScreenIcon} from '@app/styles/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@app/components/tooltip"
import { cn } from '@app/lib/utils';

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
      <Tooltip>
        <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => toggleFullScreen()}
          // onKeyDown={(e) => {console.log(e.key)}}
        >
          <FullScreenIcon
            className={`h-[22px] w-[22px] transition-all ${isFullScreen ? 'scale-0' : 'scale-100'}`}
          />
          <ExitFullScreenIcon
            className={`absolute h-[22px] w-[22px] transition-all ${isFullScreen ? 'scale-100' : 'scale-0'}`}
          />
          <span className="sr-only">Toggle FullScreen</span>
        </Button>
        </TooltipTrigger>
				<TooltipContent>
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}  
				</TooltipContent>
			</Tooltip>
  );
}

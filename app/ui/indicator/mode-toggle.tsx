'use client';
// import * as React from "react"
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@app/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@app/components/tooltip";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <SunIcon className="h-[22px] w-[22px] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <MoonIcon className="absolute h-[22px] w-[22px] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      {theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}  
		</TooltipContent>
  </Tooltip>
  );
}

'use client';
// import * as React from "react"
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <SunIcon className="h-[1.4rem] w-[1.4rem] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <MoonIcon className="absolute h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

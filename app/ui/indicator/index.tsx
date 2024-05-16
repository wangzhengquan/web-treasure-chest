import { clsx } from 'clsx';

import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Avatar from "./avatar";
import Breadcrumbs from "./breadcrumbs";
import { BellIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import FullScreenToggle from '@/app/components/full-screen-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"




function Tip() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
         hello world
      </PopoverContent>
    </Popover>
  );
}


function RightContent() {
  return (
    <div className="flex items-center gap-1 justify-end">
      <FullScreenToggle />
      <ModeToggle />
      <Tip />
      <Avatar />
    </div>
  
  );
}

export default function Indicator({className}: {className?: string}) {
  return (
  <nav className={`${lusitana.className} indicator  bg-nav/[.85] hidden md:flex md:flex-auto items-center justify-between px-2 md:px-6 py-3 border-b border-background ${className}`}>
    <div >
      <Breadcrumbs/>
    </div>
    <RightContent/>
    
  </nav>
  );
}

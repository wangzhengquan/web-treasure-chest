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
import {List} from "@/app/components/list";
import {NavButton} from "../nav"




function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen md:w-[680px]">
         <List />
      </PopoverContent>
    </Popover>
  );
}

function LeftContent() {
  return (
    <div className="flex items-center gap-1 justify-start">
      <NavButton className="md:hidden"/>
      <Breadcrumbs/>
    </div>
  );
}

function RightContent() {
  return (
    <div className="flex items-center gap-1 justify-end">
      <FullScreenToggle />
      <ModeToggle />
      <Notifications />
      <Avatar />
    </div>
  
  );
}

export default function Indicator({className}: {className?: string}) {
  return (
  <nav className={`${lusitana.className} indicator h-[48px]  bg-nav/[.85] flex flex-auto items-center justify-between px-2 md:px-4 border-b border-background ${className}`}>
    <LeftContent/>
    <RightContent/>
  </nav>
  );
}

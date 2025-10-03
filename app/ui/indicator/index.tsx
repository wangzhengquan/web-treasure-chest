import { clsx } from 'clsx';

import { Button } from '@app/components/button';
import ModeToggle from './mode-toggle';
import Avatar from './avatar';
import Breadcrumbs from './breadcrumbs';
import { BellIcon } from '@heroicons/react/24/outline';
import FullScreenToggle from './full-screen-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@app/components/popover';
import { List } from '@app/components/list';
import { MobileNavButton } from '../side-nav/side-nav';

function NotificationsButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-[22px] w-[22px]" />
          <label className="absolute top-0.5 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            2
          </label>
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
    <div className="flex items-center justify-start gap-1">
      <MobileNavButton className="md:hidden" />
      <Breadcrumbs />
    </div>
  );
}

function RightContent() {
  return (
    <div className="flex items-center justify-end gap-1">
      <FullScreenToggle />
      <ModeToggle />
      <NotificationsButton />
      <Avatar />
    </div>
  );
}
//bg-nav/[.85]
export default function Indicator({ className }: { className?: string }) {
  return (
    <nav
      className={`indicator flex  h-[48px] flex-auto items-center justify-between border-b border-alpha/[.15] from-nav to-nav/[.85] bg-gradient-to-b text-nav-foreground px-2 md:px-4 ${className}`}
    >
      <LeftContent />
      <RightContent />
    </nav>
  );
}

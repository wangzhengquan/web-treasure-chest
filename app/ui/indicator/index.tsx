import { clsx } from 'clsx';

import { Button } from '@appcomponents/button';
import ModeToggle from './mode-toggle';
import Avatar from './avatar';
import Breadcrumbs from './breadcrumbs';
import { BellIcon } from '@heroicons/react/24/outline';
import FullScreenToggle from '@appcomponents/full-screen-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@appcomponents/popover';
import { List } from '@appcomponents/list';
import { NavButton } from '../nav';

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
    <div className="flex items-center justify-start gap-1">
      <NavButton className="md:hidden" />
      <Breadcrumbs />
    </div>
  );
}

function RightContent() {
  return (
    <div className="flex items-center justify-end gap-1">
      <FullScreenToggle />
      <ModeToggle />
      <Notifications />
      <Avatar />
    </div>
  );
}

export default function Indicator({ className }: { className?: string }) {
  return (
    <nav
      className={` indicator flex  h-[48px] flex-auto items-center justify-between border-b border-background bg-nav/[.85] px-2 md:px-4 ${className}`}
    >
      <LeftContent />
      <RightContent />
    </nav>
  );
}


import { Button } from '@app/components/button';
import ThemeToggle from './theme-toggle';
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
import {cn} from '@app/lib/utils';

function NotificationsButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-[22px] w-[22px]" />
          <label className="absolute top-0 right-0 h-[14px] w-[14px] p-[1px]
            flex  items-center justify-center box-content 
            rounded-full bg-red-500 text-[10px] text-white">
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
      <MobileNavButton className="lg:hidden" />
      <Breadcrumbs />
    </div>
  );
}

function RightContent() {
  return (
    <div className="flex items-center justify-end gap-1">
      <FullScreenToggle />
      <ThemeToggle />
      <NotificationsButton />
      <Avatar />
    </div>
  );
}
//bg-nav/[.85]
export default function Indicator({ className }: { className?: string }) {
  
  return (
    <nav
      className={cn(
        "indicator flex  h-[48px] flex-auto items-center justify-between border-b border-alpha/[.15] ",
        // "from-nav to-nav/[.85] bg-gradient-to-b ",
        "bg-nav ",
        "text-nav-foreground px-2 md:px-4",
        className)}
    >
      <LeftContent />
      <RightContent />
    </nav>
  );
}


import { clsx } from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import ModeToggle from "@/app/ui/mode-toggle";
import { logout } from '@/app/actions';
import { BellIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import FullScreenToggle from '@/app/components/full-screen-toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export  function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
  <ol className={clsx('flex')}>
  {breadcrumbs.map((breadcrumb, index) => (
    <li
      key={breadcrumb.href}
      aria-current={breadcrumb.active}
      className={clsx(
        // breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
        {
        }
      )}
    >
      {breadcrumb.active ? breadcrumb.label : <Link href={breadcrumb.href} className= "hover:text-accent-foreground">{breadcrumb.label}</Link>  } 
      {index < breadcrumbs.length - 1 ? ( <span className="mx-2 inline-block">/</span> ) : null}
    </li>
  ))}
  </ol>
  );
}

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

function Avatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2">
        <Image
          src="/customers/john-doe.jpg"
          className="rounded-full"
          width={28}
          height={28}
          alt={`john-doe's profile picture`}
        />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuItem>
          <form action={logout}>
            <button> Sign Out </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

export default function Indicator({className, children}: {className?: string, children: React.ReactNode}) {
  return (
  <nav className={`${lusitana.className} indicator absolute top-0 left-0 right-0 z-10 bg-nav/[.85] hidden md:flex md:flex-auto items-center justify-between px-2 md:px-6 py-3 border-b border-background`}>
    <h1 className={`text-xl`}>{children}</h1>
    <RightContent/>
    
  </nav>
  );
}

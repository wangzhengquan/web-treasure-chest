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
} from '@app/components/dropdown-menu';
import { Button } from '@app/components/button';
import Image from 'next/image';
import { logout } from '@/app/actions/users';
import { signOut } from '@/auth';

export default function Avatar() {
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
          <form 
          // action={logout}
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
          >
            <button> Sign Out </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

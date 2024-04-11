'use client';
import Link from 'next/link';
import SideNavLinks, {SideNavLink} from './sidenav-links';
import { signOut } from '@/auth';
import { logout } from '@/app/lib/actions';
import clsx from 'clsx';
import Capacity from './capacity';
import ExpandButton from './collapse-button';
import {
  Cog6ToothIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  CubeIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

const links1 = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon, },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

const links2 = [
  { name: 'Store Visibility', href: '/dashboard', icon: EyeIcon },
  { name: 'App Downloads', href: '/dashboard/invoices', icon: ArrowDownTrayIcon},
  { name: 'Download Trends', href: '/dashboard/customers', icon: ArrowTrendingUpIcon },
];
export default function SideNav({className, onClickLink} : {className: string, onClickLink?: (event: React.MouseEvent<HTMLElement>) => void}) {
  return (
    <nav className={clsx(
      'bg-white flex flex-col gap-5 custom-scrollbar w-full', 
      className,
      {
      })}>
     
      <SideNavLinks title="OVERVIEW" links={links1} onClickLink={onClickLink}/>
      <SideNavLinks title="ANALYZE MARKET" links={links2} onClickLink={onClickLink}/>
      
      <div className="grow"/> 
      {/* <Capacity collapsed={collapsed}/> */}
     
      <form action={logout}>
        <button className="flex h-[48px] w-full grow items-center gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none justify-start p-2 px-3">
          <PowerIcon className="w-6 h-6 shrink-0" />
          <span className="shrink truncate group-[.collapsed]:invisible">Sign Out</span>
        </button>
      </form>
      {/* <SideNavLink item={{name: "Setting", href: "", icon: Cog6ToothIcon}} collapsed={collapsed}/> */}
    </nav>
  );
}
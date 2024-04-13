'use client';
import Link from 'next/link';
import SideNavLinks, {SideNavLink} from './sidenav-links';
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

const demoLinks = [
  { name: 'Tooltip', href: '/dashboard/demo/tooltip', icon: EyeIcon },
  { name: 'Scroll into view', href: '/dashboard/demo/scroll-into-view', icon: ArrowDownTrayIcon},
  { name: 'Pointer move', href: '/dashboard/demo/pointer-move', icon: ArrowTrendingUpIcon },
  { name: 'Intersection Observer', href: '/dashboard/demo/intersection-observer', icon: ArrowTrendingUpIcon },
  { name: 'JS Animation', href: '/dashboard/demo/js-animation', icon: ArrowTrendingUpIcon },
  { name: 'Form data', href: '/dashboard/demo/form-data', icon: ArrowTrendingUpIcon },
];
 
export default function Nav({className, onClickLink} : {className: string, onClickLink?: (event: React.MouseEvent<HTMLElement>) => void}) {
  return (
    <nav className={clsx(
      'bg-white flex flex-col gap-5 custom-scrollbar  w-full', 
      className,
      {
      })}>
     
      <SideNavLinks title="OVERVIEW" links={links1} onClickLink={onClickLink}/>
      <SideNavLinks title="DEMO" links={demoLinks} onClickLink={onClickLink}/>
    </nav>
  );
}
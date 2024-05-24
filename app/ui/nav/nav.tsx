'use client';
import {NavLinksGroup} from './nav-links';
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

const workflowLinks = [
  { name: 'Audio Flow', href: '/dashboard/workflow/audio-flow', icon: DocumentDuplicateIcon },
  { name: 'Turbo Flow', href: '/dashboard/workflow/turbo-flow', icon: DocumentDuplicateIcon },
  { name: 'Tail Flow', href: '/dashboard/workflow/tail-flow', icon: DocumentDuplicateIcon },
];

const animationsLinks = [
  { name: 'Cannon', href: '/dashboard/animations/cannon', icon: DocumentDuplicateIcon },
  { name: 'Magic Curtain', href: '/dashboard/animations/magic-curtain', icon: DocumentDuplicateIcon },
];

const treed = [
  { name: 'Transform Function', href: '/dashboard/3d/transform-function', icon: DocumentDuplicateIcon },
];




const widgetsLinks = [
  { name: 'Widgets', href: '/dashboard/widgets', icon: DocumentDuplicateIcon },
];

const svgLinks = [
  { name: 'SVG', href: '/dashboard/svg', icon: DocumentDuplicateIcon },
];

const demoLinks = [
  { name: 'Tooltip', href: '/dashboard/demo/tooltip', icon: EyeIcon },
  { name: 'Scroll into view', href: '/dashboard/demo/scroll-into-view', icon: ArrowDownTrayIcon},
  { name: 'Pointer move', href: '/dashboard/demo/pointer-move', icon: ArrowTrendingUpIcon },
  { name: 'Intersection Observer', href: '/dashboard/demo/intersection-observer', icon: ArrowTrendingUpIcon },
  { name: 'JS Animation', href: '/dashboard/demo/js-animation', icon: ArrowTrendingUpIcon },
  { name: 'Form data', href: '/dashboard/demo/form-data', icon: ArrowTrendingUpIcon },
  { name: 'Life cycle', href: '/dashboard/demo/life-cycle', icon: ArrowTrendingUpIcon },
];

 
export default function Nav({className, onClickLink} : {className: string, onClickLink?: (event: React.MouseEvent<HTMLElement>) => void}) {
  return (
    <nav className={clsx(
      'flex flex-col gap-[10px] w-full', 
      className,
      {
      })}>
     
      <NavLinksGroup title="OVERVIEW" links={links1} onClickLink={onClickLink}/>
      <NavLinksGroup title="Animations" links={animationsLinks} onClickLink={onClickLink}/>
      <NavLinksGroup title="Workflow" links={workflowLinks} onClickLink={onClickLink}/>
      <NavLinksGroup title="3D" links={treed} onClickLink={onClickLink}/>
      <NavLinksGroup title="Widgets" links={widgetsLinks} onClickLink={onClickLink}/>
      <NavLinksGroup title="SVG" links={svgLinks} onClickLink={onClickLink}/>
      <NavLinksGroup title="DEMO" defaultCollapsed={false} links={demoLinks} onClickLink={onClickLink}/>
    </nav>
  );
}
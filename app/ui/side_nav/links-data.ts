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

import { WorkFlowIcon, SwiperIcon, MagicCurtainIcon } from './nav-icons';
// import { CannonIcon } from '@/app/ui/animations/cannon/cannon-icons';
import { Children } from 'react';

export const adminLinks = [
  { label: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    label: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { label: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export const workflowLinks = [
  {
    label: 'Audio Flow',
    href: '/dashboard/workflow/audio-flow',
    icon: WorkFlowIcon,
  },
  {
    label: 'Turbo Flow',
    href: '/dashboard/workflow/turbo-flow',
    icon: WorkFlowIcon,
  },
  {
    label: 'Tail Flow',
    href: '/dashboard/workflow/tail-flow',
    icon: WorkFlowIcon,
  },
];

export const swiperLinks = [
  {
    label: 'Effect Coverflow',
    href: '/dashboard/swiper/effect-coverflow',
    icon: SwiperIcon,
  },
  {
    label: 'Effect Cube',
    href: '/dashboard/swiper/effect-cube',
    icon: SwiperIcon,
  },
  {
    label: 'Effect Flip',
    href: '/dashboard/swiper/effect-flip',
    icon: SwiperIcon,
  },
  {
    label: 'Thumbs Gallery',
    href: '/dashboard/swiper/thumbs-gallery',
    icon: SwiperIcon,
  },
];

export const animationsLinks = [
  {
    label: 'Waterfall',
    href: '/dashboard/animations/waterfall',
    icon: MagicCurtainIcon,
  },
  { label: 'Cannon', href: '/dashboard/animations/cannon', icon: CubeIcon },
  {
    label: 'Magic Curtain',
    href: '/dashboard/animations/magic-curtain',
    icon: MagicCurtainIcon,
  },
];

export const treedLinks = [
  {
    label: 'Transform Function',
    href: '/dashboard/3d/transform-function',
    icon: CubeIcon,
  },
];

export const tradingviewLinks = [
  { label: 'Tradingview 1', href: '/dashboard/tradingview/example1', icon: ArrowTrendingUpIcon },
];

export const widgetsLinks = [
  { label: 'Widgets', href: '/dashboard/widgets', icon: DocumentDuplicateIcon },
];

export const svgLinks = [
  { label: 'SVG', href: '/dashboard/svg', icon: DocumentDuplicateIcon },
];

export const demoLinks = [
  { label: 'Tooltip', href: '/dashboard/demo/tooltip', icon: EyeIcon },
  {
    label: 'Scroll into view',
    href: '/dashboard/demo/scroll-into-view',
    icon: ArrowDownTrayIcon,
  },
  {
    label: 'Pointer move',
    href: '/dashboard/demo/pointer-move',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Intersection Observer',
    href: '/dashboard/demo/intersection-observer',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'JS Animation',
    href: '/dashboard/demo/js-animation',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Form data',
    href: '/dashboard/demo/form-data',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Life cycle',
    href: '/dashboard/demo/life-cycle',
    icon: ArrowTrendingUpIcon,
  },
];

 const navLinksTree = [
  {
    label: 'OVERVIEW',
    children: adminLinks,
  },
  {
    label: 'Animations',
    children: animationsLinks,
  },
  {
    label: 'Workflow',
    children: workflowLinks,
  },
  {
    label: 'Trading View',
    children: tradingviewLinks,
  },
  {
    label: 'Swiper',
    children: swiperLinks,
  },
  {
    label: '3D',
    children: treedLinks,
  },
  // {
  //   label: 'Widgets',
  //   children: widgetsLinks,
  // },
  // {
  //   label: 'DEMO',
  //   children: demoLinks,
  // },
  // {
  //   label: 'SVG',
  //   children: svgLinks,
  // },
]

export default navLinksTree;

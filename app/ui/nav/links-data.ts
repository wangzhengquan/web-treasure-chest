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
import { CannonIcon } from '@/app/ui/animations/cannon/cannon-icons';

export const adminLinks = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export const workflowLinks = [
  {
    name: 'Audio Flow',
    href: '/dashboard/workflow/audio-flow',
    icon: WorkFlowIcon,
  },
  {
    name: 'Turbo Flow',
    href: '/dashboard/workflow/turbo-flow',
    icon: WorkFlowIcon,
  },
  {
    name: 'Tail Flow',
    href: '/dashboard/workflow/tail-flow',
    icon: WorkFlowIcon,
  },
];

export const swiperLinks = [
  {
    name: 'Effect Coverflow',
    href: '/dashboard/swiper/effect-coverflow',
    icon: SwiperIcon,
  },
  {
    name: 'Effect Cube',
    href: '/dashboard/swiper/effect-cube',
    icon: SwiperIcon,
  },
  {
    name: 'Effect Flip',
    href: '/dashboard/swiper/effect-flip',
    icon: SwiperIcon,
  },
  {
    name: 'Thumbs Gallery',
    href: '/dashboard/swiper/thumbs-gallery',
    icon: SwiperIcon,
  },
];

export const animationsLinks = [
  { name: 'Cannon', href: '/dashboard/animations/cannon', icon: CannonIcon },
  {
    name: 'Magic Curtain',
    href: '/dashboard/animations/magic-curtain',
    icon: MagicCurtainIcon,
  },
];

export const treedLinks = [
  {
    name: 'Transform Function',
    href: '/dashboard/3d/transform-function',
    icon: CubeIcon,
  },
];

export const tradingviewLinks = [
  { name: 'Tradingview 1', href: '/dashboard/tradingview/example1', icon: ArrowTrendingUpIcon },
];

export const widgetsLinks = [
  { name: 'Widgets', href: '/dashboard/widgets', icon: DocumentDuplicateIcon },
];

export const svgLinks = [
  { name: 'SVG', href: '/dashboard/svg', icon: DocumentDuplicateIcon },
];

export const demoLinks = [
  { name: 'Tooltip', href: '/dashboard/demo/tooltip', icon: EyeIcon },
  {
    name: 'Scroll into view',
    href: '/dashboard/demo/scroll-into-view',
    icon: ArrowDownTrayIcon,
  },
  {
    name: 'Pointer move',
    href: '/dashboard/demo/pointer-move',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'Intersection Observer',
    href: '/dashboard/demo/intersection-observer',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'JS Animation',
    href: '/dashboard/demo/js-animation',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'Form data',
    href: '/dashboard/demo/form-data',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'Life cycle',
    href: '/dashboard/demo/life-cycle',
    icon: ArrowTrendingUpIcon,
  },
];

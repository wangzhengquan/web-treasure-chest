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
import { CannonIcon } from '@/app/dashboard/animations/cannon/ui/cannon-icons';
import {D3Icon} from '@/app/icons';

const adminLinks = [
  { label: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    label: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { label: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

const workflowLinks = [
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

const swiperLinks = [
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

const animationsLinks = [
  {
    label: 'Waterfall',
    href: '/dashboard/waterfall',
    icon: MagicCurtainIcon,
  },
  { label: 'Cannon', href: '/dashboard/animations/cannon', icon: CannonIcon },
  {
    label: 'Magic Curtain',
    href: '/dashboard/animations/magic-curtain',
    icon: MagicCurtainIcon,
  },
];

const treedLinks = [
  {
    label: 'Transform Function',
    href: '/dashboard/3d/transform-function',
    icon: CubeIcon,
  },
];

const tradingviewLinks = [
  { label: 'Tradingview 1', href: '/dashboard/tradingview/example1', icon: ArrowTrendingUpIcon },
];

const widgetsLinks = [
  { label: 'Widgets', href: '/dashboard/widgets', icon: DocumentDuplicateIcon },
];

const svgLinks = [
  { label: 'SVG', href: '/dashboard/svg', icon: DocumentDuplicateIcon },
];

const demoLinks = [
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

const D3Links = [
  { label: 'Gauge', href: '/dashboard/d3/gauge', icon: D3Icon },
  { label: 'Clock', href: '/dashboard/d3/clock', icon: D3Icon },
]


 const navLinksTree = [
  {
    label: 'OVERVIEW',
    children: adminLinks,
  },
  {
    label: 'D3',
    children: D3Links,
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

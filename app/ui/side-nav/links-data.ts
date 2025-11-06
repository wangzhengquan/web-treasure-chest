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
  Squares2X2Icon,
  PhotoIcon
} from '@heroicons/react/24/outline';

import { WorkFlowIcon, SwiperIcon, MagicCurtainIcon } from './nav-icons';
import { CannonIcon } from '@/app/admin/animations/cannon/ui/cannon-icons';
import {D3Icon} from '@/app/styles/icons';

const adminLinks = [
  { label: 'Dashboard', href: '/admin', icon: Squares2X2Icon },
  { label: 'Home', href: '/admin/home', icon: HomeIcon },
  {
    label: 'Invoices',
    href: '/admin/invoices',
    icon: DocumentDuplicateIcon,
  },
  { label: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
];

const workflowLinks = [
  {
    label: 'Audio Flow',
    href: '/admin/workflow/audio-flow',
    icon: WorkFlowIcon,
  },
  {
    label: 'Turbo Flow',
    href: '/admin/workflow/turbo-flow',
    icon: WorkFlowIcon,
  },
  {
    label: 'Tail Flow',
    href: '/admin/workflow/tail-flow',
    icon: WorkFlowIcon,
  },
];

const swiperLinks = [
  {
    label: 'Effect Coverflow',
    href: '/admin/swiper/effect-coverflow',
    icon: SwiperIcon,
  },
  {
    label: 'Effect Cube',
    href: '/admin/swiper/effect-cube',
    icon: SwiperIcon,
  },
  {
    label: 'Effect Flip',
    href: '/admin/swiper/effect-flip',
    icon: SwiperIcon,
  },
  {
    label: 'Thumbs Gallery',
    href: '/admin/swiper/thumbs-gallery',
    icon: SwiperIcon,
  },
];

const animationsLinks = [
  {
    label: 'Waterfall',
    href: '/admin/waterfall',
    icon: PhotoIcon,
  },
  { label: 'Cannon', href: '/admin/animations/cannon', icon: CannonIcon },
  {
    label: 'Magic Curtain',
    href: '/admin/animations/magic-curtain',
    icon: MagicCurtainIcon,
  },
];

const treedLinks = [
  {
    label: 'Transform Function',
    href: '/admin/3d/transform-function',
    icon: CubeIcon,
  },
];

const tradingviewLinks = [
  { label: 'Tradingview 1', href: '/admin/tradingview/example1', icon: ArrowTrendingUpIcon },
];

const widgetsLinks = [
  { label: 'Widgets', href: '/admin/widgets', icon: DocumentDuplicateIcon },
];

const svgLinks = [
  { label: 'SVG', href: '/admin/svg', icon: DocumentDuplicateIcon },
];

const demoLinks = [
  { label: 'Tooltip', href: '/admin/demo/tooltip', icon: EyeIcon },
  {
    label: 'Scroll into view',
    href: '/admin/demo/scroll-into-view',
    icon: ArrowDownTrayIcon,
  },
  {
    label: 'Pointer move',
    href: '/admin/demo/pointer-move',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Intersection Observer',
    href: '/admin/demo/intersection-observer',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'JS Animation',
    href: '/admin/demo/js-animation',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Form data',
    href: '/admin/demo/form-data',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Life cycle',
    href: '/admin/demo/life-cycle',
    icon: ArrowTrendingUpIcon,
  },
];

const D3Links = [
  { label: 'Gauge', href: '/admin/d3/gauge', icon: D3Icon },
  { label: 'Clock', href: '/admin/d3/clock', icon: D3Icon },
]


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
  //   label: 'D3',
  //   children: D3Links,
  // },
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

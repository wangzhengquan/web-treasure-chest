'use client';
import clsx from 'clsx';
import Link from 'next/link';
 
import { usePathname } from 'next/navigation';
import { useRef, useState, useLayoutEffect } from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import Animation from '@/app/components/animation';
import {Separator} from "@/components/ui/separator";
import {adminLinks, workflowLinks, animationsLinks, treedLinks, widgetsLinks, svgLinks, demoLinks, swiperLinks} from './links-data';
import LogoIcon from '../logo-icon';
import { Bars3Icon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createContext } from '@radix-ui/react-context';
import {FloatLeftPanel, BackdropPanel} from '@/app/components/panels';
import {Button} from '@/components/ui/button';

export type NavLinkType = {
  name: string,
  href: string,
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>>
}

type NavContextValue = {
  open: boolean;
  toggleOpen?(): void;
  onOpen?(): void;
  onClose?(): void;
  onLinkClick?(link: NavLinkType): void;
  onAnimationEnd?(): void;
  onAnimationStart?(): void;
};

const [LeftPanelProvider, useLeftPanelContext] = createContext<NavContextValue>("LeftPanel");

function NavLink({item}: {item: NavLinkType}) {
  const context = useLeftPanelContext('NavLink');
  const pathname = usePathname();
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    context.onLinkClick?.(item);
  }
  
  return (
    <Link href={item.href} 
      title={item.name} 
      onClick={handleLinkClick}
      className={clsx("nav-link flex w-full justify-start items-center font-medium rounded-[4px] ",
      "h-[36px]",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
      "hover:text-accent-foreground",
      {
        "bg-accent text-accent-foreground": pathname === item.href
      })}>
      <div className="flex justify-center items-center min-w-[40px]">
        <item.icon className="w-[24px] h-[24px] shrink-0"/>
      </div>
      <span className="shrink truncate group-[.collapsed]:invisible">{item.name}</span> 
    </Link>
  );
}

function NavLinksGroup({title, links, onClickLink, defaultCollapsed} : {title: string, links: NavLinkType[], onClickLink?: (event: React.MouseEvent<HTMLElement>) => void, defaultCollapsed?: boolean}) {
  const listRef = useRef<any>(null);
  const collapsedIconRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const handleCollapseList = (event: React.MouseEvent<HTMLElement>) => {
    if (listRef.current && collapsedIconRef.current) {
      const animation = new Animation();
      const { height } = listRef.current.firstChild.getBoundingClientRect();
      listRef.current.style.display = 'block';
      animation.start(200, (process) => {
        // console.log('process', process);
        listRef.current.style.height = collapsed ? `${process * height}px` : `${(1 - process) * height}px`;
        collapsedIconRef.current.style.transform = `rotate(${collapsed ? -90 + 90 * process : -90 * process  }deg)`;
      }, () => {
        if (collapsed) {
          listRef.current.style.removeProperty('height');
        }
        setCollapsed(!collapsed);
        
      });
    }
  };
  return (
    <section className=""> 
      <a className={clsx("flex justify-between items-center cursor-pointer truncate ", 
        "h-[36px] text-[12px] text-foreground/60",
        )} 
       
        onClick={handleCollapseList}>
        <h2 className="group-[.collapsed]:hidden">{title}</h2>
        <ChevronDownIcon ref={collapsedIconRef} className="w-[14px] h-[14px] group-[.collapsed]:hidden" style={{
          "transform": defaultCollapsed ? 'rotate(-90deg)': 'rotate(0deg)'
          }} />

        <Separator orientation="horizontal" className="hidden group-[.collapsed]:block w-[36px] bg-border dark:bg-border/[.12]"/>
      </a>
     
      <div ref={listRef} className="overflow-hidden" style={{
         "height": defaultCollapsed ? '0px': 'auto'
        }} id={title}>
        <ul className="flex flex-col">
          {links.map((item)=> {
            return ( 
              <li key={item.name}> 
                <NavLink item={item} />
              </li>
              );
          })}
        </ul>
      </div>
    </section>
  );
}
 
export function Nav({className=""} : {className?: string}) {
  // console.log('adminLinks=', adminLinks)
  return (
    <nav className={clsx(
      'flex flex-col gap-[10px] w-full', 
      className,
      {
      })}>
     
      <NavLinksGroup title="OVERVIEW" links={adminLinks} />
      <NavLinksGroup title="Workflow" links={workflowLinks} />
      <NavLinksGroup title="Swiper" links={swiperLinks} />
      <NavLinksGroup title="Animations" links={animationsLinks} />
      <NavLinksGroup title="3D" links={treedLinks} />
      <NavLinksGroup title="Widgets" links={widgetsLinks} />
      <NavLinksGroup title="SVG" links={svgLinks} />
      <NavLinksGroup title="DEMO" defaultCollapsed={false} links={demoLinks} />
    </nav>
  );
}


 

export function LeftPanel() {
  const [open, setOpen] = useState(true);
  return (
    <LeftPanelProvider
      toggleOpen={() => setOpen(!open)}
      onLinkClick={(link) => setOpen(true)}
      open={open}
      >
      <aside className={clsx(
        "flex flex-col group bg-nav text-nav-foreground",
        "border-r border-background",
        "h-full overflow-y-auto ",
        "transition-width duration-200",
        "px-[16px] w-[264px] [&.collapsed]:w-[76px]",
        {
          // "ufo-scrollbar": !collapsed,
          "collapsed" : !open,
        })}>
        <header className={clsx("flex items-center justify-between w-full" , 
          "group-[.collapsed]:justify-center",
          "flex-none h-[52px]",
          {
          })}> 
          <span className="flex items-center">
            <LogoIcon className="h-10 w-10 group-[.collapsed]:hidden" />
            <span className={clsx("text-xl ml-3 group-[.collapsed]:hidden", {})}>Storeity</span>
          </span>
          
          <a onClick={() => setOpen(!open)} className="relative cursor-pointer">
            <Bars3Icon className="h-6 w-6"/>
          </a>
        </header>
        <Nav className={clsx("pt-5", {})} />
        {/* <div className="grow"/>  */}
        
      </aside>
    </LeftPanelProvider>
  );
}

export function NavButton({className=""}: {className?: string}) {
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLElement | null>(null);
  const handleBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log("handleBtnClick clicked", opened, backdropRef.current);
    setOpen(!open);
    backdropRef.current?.addEventListener('click', (event) => {
      // console.log('backdrop clicked');
      setOpen(false);
    }, {once: true});
  };
  
  return (
    <LeftPanelProvider
      open={true}
      onLinkClick={(link) => setOpen(false)}
      >
      <Button variant="ghost" size="icon" className={`${className}`} onClick={handleBtnClick}>
        <Bars3Icon className="h-6 w-6"/>
      </Button>
      {/* =========FloatLeftPanel============== */}
      <FloatLeftPanel className="pr-6 md:hidden bg-nav"  opened={open}>
        <header className="flex justify-between items-center w-full px-4 py-5"> 
          <a id="close-float-left-panel-btn" className="h-6 w-6" onClick={() => setOpen(false) }> 
            <ArrowLeftIcon /> 
          </a>
          <span className="text-xl">Storeity</span> 
          <LogoIcon className="w-10 h-10"/>
        </header>
        <Nav className=""  />
      </FloatLeftPanel>
      <BackdropPanel opened={open} ref={backdropRef} className="md:hidden"/>
    </LeftPanelProvider>

  );
}
'use client';
import clsx from 'clsx';
import { useRef, useState, useEffect, useLayoutEffect, ReactElement } from 'react';
import navLinksTree from './links-data';
import LogoIcon from './logo-icon';
import { Bars3Icon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { FloatLeftPanel, BackdropPanel } from '@app/components/panels';
import { Button } from '@app/components/button';
import {useScrollRestoration} from '@app/hooks/use-scroll-restoration';
import { useSessionStorage } from '@app/hooks/use-session-storage';
import { cn } from '@app/lib/utils';

import {LeftPanelProvider, NavLinksGroup} from './nav-links';


function Nav({ className = '' }: { className?: string }) {
  // console.log('adminLinks=', adminLinks)
  return (
    <nav className={clsx('flex w-full flex-col gap-[10px]', className, {})}>
      {
        navLinksTree.map((node) => (<NavLinksGroup key={node.label} title={node.label} links={node.children} />))
      }
      
    </nav>
  );
}
// const SCROLL_POSITION_KEY = 'scrollPosition';
export function SideNav({className = '', ...props}: React.HTMLAttributes<HTMLElement>) {
  // const [open, setOpen] = useSessionStorage<boolean>('SideNavOpen', true);
  const [open, setOpen] = useState(true);
  const elementRef = useRef<HTMLElement | null>(null);
  useScrollRestoration(elementRef);
   
  return (
    <LeftPanelProvider
      toggleOpen={() => setOpen(!open)}
      onLinkClick={(link) => setOpen(true)}
      open={open}
    >
      <aside
        id ="side-nav"
        ref = {elementRef}
        suppressHydrationWarning
        className={cn(
          'group flex flex-col bg-nav text-nav-foreground',
          'border-r border-background',
          'overflow-y-auto',
          'transition-width duration-200',
          'w-[264px] [&.collapsed]:w-[60px]',
          'h-full',
          // "ufo-scrollbar",
          {
            "scrollbar-hidden": !open,
            "collapsed": !open,
          },
          className
        )}
        {...props}
      >
        <header
          className={clsx(
            'flex w-full items-center justify-between sticky top-0 z-10',
            'group-[.collapsed]:justify-center',
            'h-[48px] flex-none',
            'px-[10px]',
            'border-b border-alpha/[.15] from-nav to-nav/[.85] bg-gradient-to-b',
            {},
          )}
        >
          <span className="flex items-center">
            <LogoIcon className="h-8 w-8 group-[.collapsed]:hidden" />
            <span
              className={clsx('ml-3 text-base font-medium group-[.collapsed]:hidden', {})}
            >
              Storeity
            </span>
          </span>

          <a onClick={() => setOpen(!open)} className="relative cursor-pointer">
            <Bars3Icon className="h-[21px] w-[21px]" />
          </a>
        </header>
        <Nav className={clsx('pt-5 px-[10px]', {})} />
        {/* <div className="grow"/>  */}
      </aside>
    </LeftPanelProvider>
  );
}

export function MobileNavButton({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLElement | null>(null);
  const handleBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log("handleBtnClick clicked", opened, backdropRef.current);
    setOpen(!open);
    backdropRef.current?.addEventListener(
      'click',
      (event) => {
        // console.log('backdrop clicked');
        setOpen(false);
      },
      { once: true },
    );
  };

  return (
    <LeftPanelProvider open={true} onLinkClick={(link) => setOpen(false)}>
      <Button
        variant="ghost"
        size="icon"
        className={`${className}`}
        onClick={handleBtnClick}
        {...props}
      >
        <Bars3Icon className="h-6 w-6" />
      </Button>
      {/* =========FloatLeftPanel============== */}
      <FloatLeftPanel className="bg-nav px-4 lg:hidden" opened={open}>
        <header className="flex w-full items-center justify-between py-5">
          <a
            id="close-float-left-panel-btn"
            className="h-6 w-6"
            onClick={() => setOpen(false)}
          >
            <ArrowLeftIcon />
          </a>
          <span className="text-xl">Storeity</span>
          <LogoIcon className="h-10 w-10" />
        </header>
        <Nav className="" />
      </FloatLeftPanel>
      <BackdropPanel opened={open} ref={backdropRef} className="md:hidden" />
    </LeftPanelProvider>
  );
}

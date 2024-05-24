'use client';
import Nav from '@/app/ui/nav/nav';
import clsx from 'clsx';
import { useState } from 'react';
import LogoIcon from '../logo-icon';
import { Bars3Icon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function Header({className, onClickCollapseBtn}: {className: string, onClickCollapseBtn: (event: React.MouseEvent<HTMLElement>) => void}) {
  return (
    <header className={clsx("flex items-center justify-between w-full" , 
      "group-[.collapsed]:justify-center",
      "flex-none h-[52px]",
      className,
      {
      })}> 
      <span className="flex items-center">
        <LogoIcon className="h-10 w-10 group-[.collapsed]:hidden" />
        <span className={clsx("text-xl ml-3 group-[.collapsed]:hidden", {})}>Storeity</span>
      </span>
       
      <a onClick={onClickCollapseBtn} className="relative cursor-pointer">
        <Bars3Icon className="h-6 w-6"/>
      </a>
    </header>
  );
}

export default function LeftPanel() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={clsx(
      "flex flex-col group bg-nav text-nav-foreground",
      "border-r border-background",
      "h-full overflow-y-auto ",
      "transition-width duration-200",
      "px-[16px] w-[264px] [&.collapsed]:w-[76px]",
      {
        // "ufo-scrollbar": !collapsed,
        "collapsed" : collapsed,
      })}>
      <Header className="" onClickCollapseBtn={() => setCollapsed(!collapsed)} />
      <Nav className={clsx("pt-5", {})} onClickLink={() => collapsed && setCollapsed(false)}/>
      {/* <div className="grow"/>  */}
      
    </aside>
  );
}
'use client';
import Nav from '@/app/ui/nav/nav';
import {SideHeader} from '@/app/ui/nav/header';
import clsx from 'clsx';
import { useState } from 'react';

export default function LeftPanel() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={clsx("flex flex-col group bg-nav text-nav-foreground shadow",
      "h-full overflow-y-auto ",
      "transition-width duration-200",
      "px-[16px] w-[264px] [&.collapsed]:w-[76px]",
      {
        // "ufo-scrollbar": !collapsed,
        "collapsed" : collapsed,
      })}>
      <SideHeader className="" onClickCollapseBtn={() => setCollapsed(!collapsed)} />
      <Nav className={clsx("pt-5", { })} onClickLink={() => collapsed && setCollapsed(false)}/>
      {/* <div className="grow"/>  */}
      
    </aside>
  );
}
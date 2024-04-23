'use client';
import Nav from '@/app/ui/nav/nav';
import {SideHeader} from '@/app/ui/nav/header';
import clsx from 'clsx';
import { useState } from 'react';
import { logout } from '@/app/lib/actions';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function LeftPanel() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={clsx("flex flex-col group bg-primary text-primary-foreground shadow",
      "h-full overflow-y-auto",
      "transition-width duration-200",
      "px-[16px] w-[264px] [&.collapsed]:w-[76px]",
      {
        // "ufo-scrollbar": !collapsed,
        "collapsed" : collapsed,
      })}>
      <SideHeader className="" onClickCollapseBtn={() => setCollapsed(!collapsed)} />
      <Nav className={clsx("pt-5", { })} onClickLink={() => collapsed && setCollapsed(false)}/>
      <div className="grow"/> 
      <form action={logout}>
        <button className={clsx("nav-link flex h-[48px] w-full items-center font-medium rounded-r-full  justify-start",
          "hover:bg-ufo-gray hover:text-ufo-primary",
          "[&.active]:bg-ufo-primary/10 [&.active]:text-ufo-primary",
          "hover:[&.active]:bg-ufo-primary/25",
          {
          })}>
          <PowerIcon className="w-6 h-6 shrink-0" />
          <span className="ml-5 shrink truncate group-[.collapsed]:invisible">Sign Out</span>
        </button>
      </form>
    </aside>
  );
}
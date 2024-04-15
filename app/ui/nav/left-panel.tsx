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
    <div className={clsx("flex flex-col group bg-white shadow",
      "h-full overflow-y-auto",
      "transition-width duration-200",
      "pr-5 pt-4 w-64 [&.collapsed]:w-16",
      {
        // "ufo-scrollbar": !collapsed,
        "collapsed" : collapsed,
      })}>
      <SideHeader className="" onClickCollapseBtn={() => setCollapsed(!collapsed)} />
      <Nav className={clsx("pt-5", { })} onClickLink={() => collapsed && setCollapsed(false)}/>
      <div className="grow"/> 
      <form action={logout}>
        <button className={clsx("nav-link flex h-[48px] w-full items-center font-medium rounded-r-full  justify-start py-3 px-5",
          "hover:bg-ufo-gray hover:text-ufo-primary",
          "[&.active]:bg-ufo-primary/10 [&.active]:text-ufo-primary",
          "hover:[&.active]:bg-ufo-primary/25",
          {
          })}>
          <PowerIcon className="w-6 h-6 shrink-0" />
          <span className="ml-5 shrink truncate group-[.collapsed]:invisible">Sign Out</span>
        </button>
      </form>
    </div>
  );
}
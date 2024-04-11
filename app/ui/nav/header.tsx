'use client';
import clsx from 'clsx';
import LogoIcon from '../logo-icon';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CollapseButton from './collapse-button';
import { Bars3Icon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import {FloatLeftPanel, BackdropPanel} from '@/app/components/panels';
import SideNav from './sidenav';
import {TOnCollapse} from "@/app/lib/definitions";

export  function SideHeader({className}: {className: string}) {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <header className={clsx("flex items-center justify-between w-full pl-5" , 
    "group-[.collapsed]:justify-center",
    // "min-h-headerh h-headerh max-h-headerh",
    className,
    {
      
    })}> 
      <LogoIcon  />
      <span className={clsx("text-xl group-[.collapsed]:hidden", {})}>Storeity2</span> 
      <CollapseButton/>
    </header>
  );
}

 

export function MHeader({className}: {className: string}) {
  const [opened, setOpened] = useState(false);
  const backdropRef = useRef<HTMLElement | null>(null);
  const handleBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("handleBtnClick clicked", opened, backdropRef.current);
    setOpened(!opened);

    backdropRef.current?.addEventListener('click', (event) => {
      console.log('backdrop clicked');
      setOpened(false);
    }, {once: true});
    
  };
  
  // console.log('opened', opened)
  return (
    <>
    <header className={clsx("flex items-center  min-h-headerh h-headerh max-h-headerh w-full px-4 " ,
    "justify-between group-[.collapsed]:justify-center",
    className,
    {
    })}> 
      <LogoIcon  />
      <span className="">Storeity</span> 
      <a className="relative cursor-pointer p-4" onClick={handleBtnClick}>
        <Bars3Icon className="h-6 w-6"/>
      </a>
    </header>

    <FloatLeftPanel id="float-left-panel" className="pr-6 md:hidden"  opened={opened}>
      <header className="flex justify-between items-center min-h-headerh h-headerh max-h-headerh w-full px-4"> 
        <a id="close-float-left-panel-btn" className="h-6 w-6" onClick={() => setOpened(false) }> 
          <ArrowLeftIcon /> 
        </a>
        <span className="">Storeity</span> 
        <LogoIcon />
      </header>
      <SideNav className=""  onClickLink={(event) => setOpened(false) }/>
    </FloatLeftPanel>
    <BackdropPanel opened={opened} ref={backdropRef} className="md:hidden"/>
    </>

  );
}


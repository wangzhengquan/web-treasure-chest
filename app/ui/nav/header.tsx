'use client';
import clsx from 'clsx';
import LogoIcon from '../logo-icon';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bars3Icon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import {FloatLeftPanel, BackdropPanel} from '@/app/components/panels';
import Nav from './nav';

export  function SideHeader({className, onClickCollapseBtn}: {className: string, onClickCollapseBtn: (event: React.MouseEvent<HTMLElement>) => void}) {
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

 

export function MobileHeader({className}: {className: string}) {
  const [opened, setOpened] = useState(false);
  const backdropRef = useRef<HTMLElement | null>(null);
  const handleBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log("handleBtnClick clicked", opened, backdropRef.current);
    setOpened(!opened);

    backdropRef.current?.addEventListener('click', (event) => {
      // console.log('backdrop clicked');
      setOpened(false);
    }, {once: true});
    
  };
  
  // console.log('opened', opened)
  return (
    <>
    <header className={clsx("bg-nav flex items-center w-full px-5 " ,
    "justify-between group-[.collapsed]:justify-center",
    className,
    {
    })}> 
      <LogoIcon className="h-10 w-10"/>
      <span className="text-xl">Storeity</span> 
      <a className="relative cursor-pointer p-4" onClick={handleBtnClick}>
        <Bars3Icon className="h-6 w-6"/>
      </a>
    </header>
    {/* =========FloatLeftPanel============== */}
    <FloatLeftPanel className="pr-6 md:hidden bg-nav"  opened={opened}>
      <header className="flex justify-between items-center w-full px-4 py-5"> 
        <a id="close-float-left-panel-btn" className="h-6 w-6" onClick={() => setOpened(false) }> 
          <ArrowLeftIcon /> 
        </a>
        <span className="text-xl">Storeity</span> 
        <LogoIcon className="w-10 h-10"/>
      </header>
      <Nav className=""  onClickLink={(event) => setOpened(false) }/>
    </FloatLeftPanel>
    <BackdropPanel opened={opened} ref={backdropRef} className="md:hidden"/>
    </>

  );
}


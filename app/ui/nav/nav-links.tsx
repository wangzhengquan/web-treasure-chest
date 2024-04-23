"use client";
import Link from 'next/link';
import clsx from 'clsx';
import {
  TNavLink,
} from '@/app/lib/definitions';
import { usePathname } from 'next/navigation';
import { useRef, useState, useLayoutEffect } from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import Animation from '@/app/components/animation';

export function NavLink({item, onClick}: {item: TNavLink, onClick?: (event: React.MouseEvent<HTMLElement>) => void}) {
  const pathname = usePathname();
  
  return (
    <Link href={item.href} 
      title={item.name} 
      onClick={onClick}
      className={clsx("nav-link flex w-full justify-start items-center font-medium rounded-[4px] ",
      "h-[36px]",
      "hover:text-accent-foreground",
      "[&.active]:bg-accent [&.active]:text-accent-foreground",
      {
      "active": pathname === item.href
      })}>
      <div className="flex justify-center items-center min-w-[40px]">
        <item.icon className="w-[24px] h-[24px] shrink-0"/>
      </div>
      <span className="shrink truncate group-[.collapsed]:invisible">{item.name}</span> 
    </Link>
  );
}

export default function NavLinks({title, links, onClickLink, defaultCollapsed} : {title: string, links: TNavLink[], onClickLink?: (event: React.MouseEvent<HTMLElement>) => void, defaultCollapsed?: boolean}) {
  const listRef = useRef<any>(null);
  const collapsedIconRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const handleCollapseList = (event: React.MouseEvent<HTMLElement>) => {
    if (listRef.current && collapsedIconRef.current) {
      const animation = new Animation();
      const { height } = listRef.current.firstChild.getBoundingClientRect();
      listRef.current.style.display = 'block';
      animation.start(300, (process) => {
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
        "h-[36px] text-[12px] text-foreground/40",
        )} 
       
        onClick={handleCollapseList}>
        <h2 className="group-[.collapsed]:hidden">{title}</h2>
        <ChevronDownIcon ref={collapsedIconRef} className="w-[14px] h-[14px] group-[.collapsed]:hidden" style={{
          "transform": defaultCollapsed ? 'rotate(-90deg)': 'rotate(0deg)'
          }} />

        <hr className="hidden group-[.collapsed]:block" style={{
          borderColor: "rgba(255, 255, 255, 0.12)",
          width: '36px',
        }}/>
      </a>
     
      <div ref={listRef} className="overflow-hidden" style={{
         "height": defaultCollapsed ? '0px': 'auto'
        }} id={title}>
        <ul className="flex flex-col gap-[4px]">
          {links.map((item)=> {
            return ( 
              <li key={item.name}> 
                <NavLink item={item}  onClick={onClickLink}/>
              </li>
              );
          })}
        </ul>
      </div>
    </section>
  );
}

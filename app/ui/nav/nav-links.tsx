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
      className={clsx("nav-link flex h-[48px] w-full items-center font-medium rounded-r-full  justify-start py-3 px-5",
      "hover:bg-ufo-gray hover:text-ufo-primary",
      "[&.active]:bg-ufo-primary/10 [&.active]:text-ufo-primary",
      "hover:[&.active]:bg-ufo-primary/25",
      {
      "active": pathname === item.href
      })}>
      <item.icon className="w-6 h-6 shrink-0"/>
      <span className="ml-5 shrink truncate group-[.collapsed]:invisible">{item.name}</span> 
    </Link>
  );
}

export default function NavLinks({title, links, onClickLink, defaultCollapsed} : {title: string, links: TNavLink[], onClickLink?: (event: React.MouseEvent<HTMLElement>) => void, defaultCollapsed?: boolean}) {
  const listRef = useRef<any>(null);
  const collapsedIconRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const handleCollapseList = (event: React.MouseEvent<HTMLElement>) => {
    if (listRef.current && collapsedIconRef.current) {
      const animation = new Animation(listRef.current);
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

  // useLayoutEffect(() => {
  //   if (listRef.current) {
  //     const { height } = listRef.current.firstChild.getBoundingClientRect();
  //     listRef.current.addEventListener("transitionend", () => {
  //       console.log('transitionend', listRef.current.style.height);
  //     });
       
  //     // listRef.current.style.height = collapsed ? '0px': `${height}px` ;
  //   }
  // }, []);

  return (
    <section className=""> 
      <a className={clsx("flex justify-between cursor-pointer pl-5 text-slate-400 truncate ", 
        "group-[.collapsed]:invisible",
        )} onClick={handleCollapseList}>
        <h2 >{title}</h2>
        <ChevronDownIcon ref={collapsedIconRef} className="w-5 h-5" style={{
          "transform": defaultCollapsed ? 'rotate(-90deg)': 'rotate(0deg)'
          }} />
      </a>
     
      <div ref={listRef} className="overflow-hidden" style={{
         "height": defaultCollapsed ? '0px': 'auto'
        }} id={title}>
        <ul>
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

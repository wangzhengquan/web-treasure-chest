"use client";
import Link from 'next/link';
import clsx from 'clsx';
import {
  TNavLink,
} from '@/app/lib/definitions';
import { usePathname } from 'next/navigation';

export function SideNavLink({item, onClick}: {item: TNavLink, onClick?: (event: React.MouseEvent<HTMLElement>) => void}) {
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

export default function SideNavLinks({title, links, onClickLink} : {title: string, links: TNavLink[], onClickLink?: (event: React.MouseEvent<HTMLElement>) => void}) {
  return (
    <section className=""> 
      <h2 className={clsx("pl-5 text-slate-400 truncate group-[.collapsed]:invisible", {
        // "invisible": collapsed
      })}>{title}</h2>
      <ul className="">
        {links.map((item)=> {
          return ( 
            <li key={item.name}> 
              <SideNavLink item={item}  onClick={onClickLink}/>
            </li>
            );
        })}
      </ul>
    </section>
  );
}

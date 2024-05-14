'use client';
import { useReducer, useLayoutEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
export interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export interface BreadcrumbAction {
  // type: 'update';
  payload: Breadcrumb[];
}

export function breadcrumbsReducer(preState: Breadcrumb[], action: BreadcrumbAction){
  return action.payload;
}

function createInitialState(initState: Breadcrumb[]) {
  return [...initState];
}

let mdispatch: (action: BreadcrumbAction) => void;

export default function Breadcrumbs( ) {
  const [breadcrumbs, dispatch] = useReducer<typeof breadcrumbsReducer, Breadcrumb[]>(
    breadcrumbsReducer,
    [], 
    createInitialState
  );
  mdispatch = dispatch;
  return (
  <ol className='flex'>
  {breadcrumbs.map((breadcrumb, index) => (
    <li
      key={breadcrumb.href}
      aria-current={breadcrumb.active}
      className={clsx(
        // breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
      )}
    >
      {breadcrumb.active ? breadcrumb.label : <Link href={breadcrumb.href as string} className= "hover:text-accent-foreground">{breadcrumb.label}</Link>  } 
      {index < breadcrumbs.length - 1 ? ( <span className="mx-2 inline-block">/</span> ) : null}
    </li>
  ))}
  </ol>
  );
}


export function UpdateBreadcrumbs({breadcrumbs}: {breadcrumbs: string | Breadcrumb | Breadcrumb[]}) {
  useLayoutEffect(() => {
    if (typeof breadcrumbs === 'string') {
      breadcrumbs = [{label: breadcrumbs, href: ''}];
    } else if (!Array.isArray(breadcrumbs)) {
      breadcrumbs = [breadcrumbs];
    }
    mdispatch({payload: breadcrumbs});
  }, []);
  return <></>
}
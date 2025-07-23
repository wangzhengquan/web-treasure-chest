'use client';
import { useReducer, useLayoutEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import {useStore} from '@/app/store';
import {Breadcrumb} from '@app/types/definitions';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';
// export interface Breadcrumb {
//   label: string;
//   href: string;
//   active?: boolean;
// }


// export interface BreadcrumbAction {
//   // type: 'update';
//   payload: Breadcrumb[];
// }

// export function breadcrumbsReducer(
//   preState: Breadcrumb[],
//   action: BreadcrumbAction,
// ) {
//   return action.payload;
// }

// let dispatchBreadcrumbs: (action: BreadcrumbAction) => void;
// export { dispatchBreadcrumbs };

export default function Breadcrumbs() {
  // const [breadcrumbs, dispatch] = useReducer(breadcrumbsReducer, []);
  // dispatchBreadcrumbs = dispatch;
  const breadcrumbs = useStore((state) => state.breadcrumbs)
  return (
    <ol className="flex">
      {breadcrumbs.map((item, index) => (
        <li
          key={item.label}
          aria-current={item.active}
          className={clsx()
          // item.active ? 'text-gray-900' : 'text-gray-500',
          }
        >
          {item.active ? (
            item.label
          ) : (
            <Link
              href={item.href as string}
              className="hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          )}
          {index < breadcrumbs.length - 1 ? (
            <span className="mx-2 inline-block">/</span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function UpdateBreadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: string | Breadcrumb | Breadcrumb[];
}) {
  useBreadcrumbs(breadcrumbs)
  
  return <></>;
}

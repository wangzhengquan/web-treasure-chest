import { useRef, useState, useEffect, useLayoutEffect, ReactElement } from 'react';
import Animation from '@app/lib/animation';
import { Separator } from '@app/components/separator';
import {NavLeaf} from "@app/types/definitions";
import { createContext } from '@radix-ui/react-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@app/lib/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import styles from './nav-links.module.css';

type NavContextValue = {
  open: boolean;
  toggleOpen?(): void;
  onOpen?(): void;
  onClose?(): void;
  onLinkClick?(link: NavLeaf): void;
  onAnimationEnd?(): void;
  onAnimationStart?(): void;
};

const [LeftPanelProvider, useLeftPanelContext] = createContext<NavContextValue>('LeftPanel');


function NavLink({ item }: { item: NavLeaf }) {
  const context = useLeftPanelContext('NavLink');
  const pathname = usePathname();
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    context.onLinkClick?.(item);
  };

  return (
    <Link
      href={item.href}
      title={item.label}
      onClick={handleLinkClick}
      className={cn(
        'nav-link flex w-full items-center justify-start rounded-[4px] font-medium ',
        'h-[36px] px-[10px]',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring',
        {
          'bg-accent text-accent-foreground': pathname === item.href,
        }
      )}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      <span className="ml-[6px] shrink truncate group-[.collapsed]:hidden">
        {item.label}
      </span>
    </Link>
  );
}

function NavLinksGroup({
  title,
  links,
  onClickLink,
  defaultCollapsed,
}: {
  title: string;
  links: NavLeaf[];
  onClickLink?: (event: React.MouseEvent<HTMLElement>) => void;
  defaultCollapsed?: boolean;
}) {
  const listRef = useRef<any>(null);
  const collapsedIconRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const handleCollapseList = (event: React.MouseEvent<HTMLElement>) => {
    if (listRef.current && collapsedIconRef.current) {
      const animation = new Animation();
      const { height } = listRef.current.firstChild.getBoundingClientRect();
      listRef.current.style.display = 'block';
      animation.start(
        200,
        (process) => {
          // console.log('process', process);
          listRef.current.style.height = collapsed
            ? `${process * height}px`
            : `${(1 - process) * height}px`;
          collapsedIconRef.current.style.transform = `rotate(${collapsed ? -90 + 90 * process : -90 * process}deg)`;
        },
        () => {
          if (collapsed) {
            listRef.current.style.removeProperty('height');
          }
          setCollapsed(!collapsed);
        },
      );
    }
  };
  return (
    <section className="">
      <a
        className={cn(
          'flex cursor-pointer items-center justify-between truncate ',
          'h-[36px] text-[12px] text-foreground/60',
        )}
        onClick={handleCollapseList}
      >
        <h2 className="group-[.collapsed]:hidden">{title}</h2>
        <ChevronDownIcon
          ref={collapsedIconRef}
          className="h-[14px] w-[14px] group-[.collapsed]:hidden"
          style={{
            transform: defaultCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
          }}
        />

        <Separator
          orientation="horizontal"
          className="hidden w-[36px] bg-border group-[.collapsed]:block dark:bg-border/[.12]"
        />
      </a>

      <div
        ref={listRef}
        className="overflow-hidden"
        style={{
          height: defaultCollapsed ? '0px' : 'auto',
        }}
        id={title}
      >
        <ul className="flex flex-col">
          {links.map((item) => {
            return (
              <li className={`${styles['nav-link-item']}`}  key={item.label}>
                <NavLink item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export {LeftPanelProvider, NavLinksGroup};
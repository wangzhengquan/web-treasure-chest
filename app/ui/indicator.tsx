import ModeToggle from "@/app/ui/mode-toggle";
import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export  function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
  <ol className={clsx('flex')}>
    {breadcrumbs.map((breadcrumb, index) => (
      <li
        key={breadcrumb.href}
        aria-current={breadcrumb.active}
        className={clsx(
          // breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
        )}
      >
        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
        {index < breadcrumbs.length - 1 ? (
          <span className="mx-2 inline-block">/</span>
        ) : null}
      </li>
    ))}
  </ol>
  );
}

export default function Indicator({className, children}: {className?: string, children: React.ReactNode}) {
  return (
  <div className="ml-[2px] bg-nav shadow hidden md:flex md:flex-auto items-center justify-between px-4 py-3">
    <h1 className={`text-xl`}>{children}</h1>
    <ModeToggle />
  </div>
  );
}

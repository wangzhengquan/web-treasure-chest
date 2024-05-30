import { LeftPanel } from '@/app/ui/nav';
import clsx from 'clsx';
import Script from 'next/script';
import Indicator from '@/app/ui/indicator';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row ">
      <section className="hidden flex-none md:block">
        <LeftPanel />
      </section>
      <section className="relative h-full flex-grow overflow-scroll ">
        {/* absolute top-0 left-0 right-0 z-10 */}
        <Indicator className="sticky top-0 z-10" />
        <div className="h-[calc(100%_-_53px)] w-full">{children}</div>

        {/* h-[calc(100%_-_56px)] md:h-full overflow-y-auto*/}
        {/* <div className="h-full overflow-auto">{children}</div> */}
      </section>
    </div>
  );
}

import LeftPanel from '@/app/ui/nav/left-panel';
import {SideHeader, MobileHeader} from '@/app/ui/nav/header';
import clsx from 'clsx';
import Script from 'next/script';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row ">
      <section className="flex-none hidden md:block">
        <LeftPanel/>
      </section>
      <section className="relative flex-grow h-full overflow-hidden">
        {/* <HeaderBar/> */}
        <MobileHeader className="md:hidden"  />
        <div className="h-[calc(100%_-_56px)] md:h-full overflow-y-auto">{children}</div>
      </section>
    </div>
  );
}
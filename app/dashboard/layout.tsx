import LeftPanel from '@/app/ui/nav/left-panel';
import {SideHeader, MHeader} from '@/app/ui/nav/header';
import clsx from 'clsx';
import Script from 'next/script';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    
    <div className="flex h-screen overflow-hidden flex-col md:flex-row ">
      <section className="flex-none hidden md:block">
        <LeftPanel/>
      </section>
      <section className="relative flex-grow px-5 h-full overflow-hidden">
        {/* <HeaderBar/> */}
        <MHeader className="md:hidden"  />
        <div className="md:pt-5 h-[calc(100%_-_56px)] md:h-full overflow-y-auto">{children}</div>
      </section>
    </div>

    
    {/* <ArrayUtil /> */}
    {/*panel-overlay--> */}
    {/* <Script id="dom-util-script" src="/js/dom.min.js"/> */}
    {/* <EventsAdd /> */}
    {/* <Script id="array-script" src="/app/js/array.js"/> */}
    {/* <Script id="string-script" src="/js/string.js"/>
     */}
    {/* <Script id="test-js" src="/test.js" /> */}
    </>
  );
}
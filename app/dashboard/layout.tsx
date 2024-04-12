import SideNav from '@/app/ui/nav/nav';
import LeftPanel from '@/app/ui/nav/left-panel';
import {SideHeader, MHeader} from '@/app/ui/nav/header';
// import SideNav from '@/app/ui/nav/sidenav';
import {FloatLeftPanel, BackdropPanel} from '@/app/components/panels';
import clsx from 'clsx';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import LogoIcon from '@/app/ui/logo-icon';
// import EventsAdd from '@/app/components/events-add';
import Script from 'next/script';
import ArrayUtil from '../components/array';
// import testjs from ''
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    
    <div className="flex h-screen overflow-hidden flex-col md:flex-row ">
      <section className="flex-none hidden md:block">
        <LeftPanel/>
      </section>
      <section className="flex-grow px-5 h-full overflow-y-auto">
        {/* <HeaderBar/> */}
        <MHeader className="md:hidden"  />
        <div className="md:pt-5">{children}</div>
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
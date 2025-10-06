import { SideNav } from '@app/ui/side-nav/side-nav';
import Indicator from '@app/ui/indicator';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-full max-h-full w-full overflow-hidden ">
      <section className="hidden lg:block flex-none ">
        <SideNav />
        {/* <div className="text-[10px] p-[10px] pl-[20px] opacity-80">By Zhengquan.Wang</div> */}
      </section>
      <section id='main-scroll-view' className="relative flex flex-col h-full max-h-full flex-grow ">
        {/* absolute top-0 left-0 right-0 z-10 */}
        {/* <Indicator className="sticky top-0 z-10" /> */}
        {/* <div className="h-[calc(100%_-_53px)] w-full">{children}</div> */}

        {/* h-[calc(100%_-_56px)] md:h-full overflow-y-auto*/}
        <Indicator className="flex-[0_0_48px] h-[48px]" />
        <div className="flex-auto overflow-y-auto">{children}</div>
      </section>
    </div>
  );
}

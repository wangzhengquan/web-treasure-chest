import clsx from 'clsx';
export default function NotificationItem({}) {
  return (
    <div className="relative bg-[rgb(76_84_111)] rounded-lg flex gap-1 items-center w-fit p-[15px]">
      <span className="bg-[rgb(0_196_211)] rounded-full py-1 px-4 font-bold text-[12px] leading-relaxed tracking-[0.02em] text-[rgb(19_24_45)]" >enhancement</span>
      <span className=" inline-block text-white truncate align-middle max-w-[330px] font-bold py-[4px] leading-none">Enhanced Asset Inventory in Panoptica</span>
      <svg className="align-middle w-[20px] h-[20px] my-[1px] ml-[4px] fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
      <div className={clsx(
        "absolute right-0 top-[50%] translate-y-[50%]",
        "before:block before:w-0 before:h-0 before:border-solid before:border-y-[8px] before:border-l-[10px] before:border-[transparent_transparent_transparent_rgb(76_84_111)] before:absolute before:-right-[9px] before:top-[calc(50%_-_8px)]",
        )} x-arrow=""/>
    </div>
  );

}
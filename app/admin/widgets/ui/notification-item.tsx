import clsx from 'clsx';
export default function NotificationItem({}) {
  return (
    <div className="relative flex w-fit items-center gap-1 rounded-lg bg-[rgb(76_84_111)] p-[15px]">
      <span className="rounded-full bg-[rgb(0_196_211)] px-4 py-1 text-[12px] font-bold leading-relaxed tracking-[0.02em] text-[rgb(19_24_45)]">
        enhancement
      </span>
      <span className=" inline-block max-w-[330px] truncate py-[4px] align-middle font-bold leading-none text-white">
        Enhanced Asset Inventory in Panoptica
      </span>
      <svg
        className="my-[1px] ml-[4px] h-[20px] w-[20px] fill-white align-middle"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
      </svg>
      <div
        className={clsx(
          'absolute right-0 top-[50%] translate-y-[50%]',
          'before:absolute before:-right-[9px] before:top-[calc(50%_-_8px)] before:block before:h-0 before:w-0 before:border-y-[8px] before:border-l-[10px] before:border-solid before:border-[transparent_transparent_transparent_rgb(76_84_111)]',
        )}
        x-arrow=""
      />
    </div>
  );
}

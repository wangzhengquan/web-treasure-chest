'use client';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useMounted } from '@/app/hooks/use-mounted';

export function FloatLeftPanel({id, className, children, opened}: {id?: string, className?: string, children: React.ReactNode, opened?:boolean}) {
  // console.log('FloatLeftPanel opened', opened);
  const mounted = useMounted();
  return mounted && createPortal(
    <div id={id}  className={clsx("bg-white fixed z-50 overflow-y-auto w-64 top-0 -left-64 h-full duration-300 transition-transform translate-x-0 [&.opened]:translate-x-64 " ,
       className,
      {"translate-x-64": opened} 
      )}>
      {children}
    </div>,
    document.body
  )
}

const BackdropPanel  = forwardRef(function BackdropPanel(
  { className, opened}: {className?: string, opened?: boolean}, 
  ref?: React.ForwardedRef<any>) {
  const mounted = useMounted();
  return mounted && createPortal(
    <div ref={ref} className={clsx("backdrop-panel fixed left-0 top-0 w-full h-full bg-black/[0.3] z-10 inset-0 ",
      className,
      {
        "hidden": !opened,
        "block": opened
      }
      )}></div>,
    document.body
  );
});

export {BackdropPanel};
 

export default function FloatLeftPanels(props: {id?: string, children: React.ReactNode, opened?:boolean}) {
  return (
    <>
    <FloatLeftPanel {...props}/>
    <BackdropPanel opened={props.opened} />
    </>
  );
}
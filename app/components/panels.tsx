'use client';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useMounted } from '@app/hooks/use-mounted';

export function FloatLeftPanel({
  id,
  className,
  children,
  opened,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  opened?: boolean;
}) {
  // console.log('FloatLeftPanel opened', opened);
  const mounted = useMounted();
  return (
    mounted &&
    createPortal(
      <div
        id={id}
        className={clsx(
          'fixed -left-64 top-0 z-50 h-full w-64 overflow-y-auto ',
          'translate-x-0 transition-transform duration-300 [&.opened]:translate-x-64 ',
          className,
          { 'translate-x-64': opened },
        )}
      >
        {children}
      </div>,
      document.body,
    )
  );
}

const BackdropPanel = forwardRef(function BackdropPanel(
  { className, opened }: { className?: string; opened?: boolean },
  ref?: React.ForwardedRef<any>,
) {
  const mounted = useMounted();
  return (
    mounted &&
    createPortal(
      <div
        ref={ref}
        className={clsx(
          'backdrop-panel fixed inset-0 left-0 top-0 z-10 h-full w-full bg-black/[0.3] ',
          className,
          {
            hidden: !opened,
            block: opened,
          },
        )}
      ></div>,
      document.body,
    )
  );
});

export { BackdropPanel };

export default function FloatLeftPanels(props: {
  id?: string;
  children: React.ReactNode;
  opened?: boolean;
}) {
  return (
    <>
      <FloatLeftPanel {...props} />
      <BackdropPanel opened={props.opened} />
    </>
  );
}

import { cn } from '@app/lib/utils';
import React, { ReactElement } from 'react'
export default function Main({
  className = '',
  children,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main className={cn('min-h-full p-2 md:p-4', className)} {...props}>
      {children}
    </main>
  );
}
 

// export const Waterfall: React.FC<React.AllHTMLAttributes<ReactElement>>  = ( ) => {
//    return <div></div>
// };

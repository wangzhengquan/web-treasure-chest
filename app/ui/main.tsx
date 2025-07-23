import { cn } from '@app/lib/utils';
import React, { ReactElement } from 'react'
export default function Main({
  className = '',
  children,
  ...props
}: React.AllHTMLAttributes<HTMLDivElement>) {
  return (
    <main className={cn('relative min-h-full p-2 md:p-4', className)} {...props}>
      {children}
    </main>
  );
}
 

// export const Waterfall: React.FC<React.AllHTMLAttributes<ReactElement>>  = ( ) => {
//    return <div></div>
// };

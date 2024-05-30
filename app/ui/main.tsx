import { cn } from '@/lib/utils';
export default function Main({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    // h-[calc(100%_-_53px)]
    <main className={cn('relative min-h-full p-2 md:p-4', className)}>
      {children}
    </main>
  );
}

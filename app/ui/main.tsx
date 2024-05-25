import {cn} from "@/lib/utils";
export default function Main({className="", children}: {className?: string, children?: React.ReactNode}) {
  return (
    // h-[calc(100%_-_53px)]
    <main className={cn('p-2 md:p-4 relative h-full', className)}>
      {children}
    </main>
  );
}
import {cn} from "@/lib/utils";
export default function Main({className="", children}: {className?: string, children?: React.ReactNode}) {
  return (
    // h-[calc(100%_-_53px)]
    <main className={cn('mt-[53px] p-4 md:p-8 relative', className)}>
      {children}
    </main>
  );
}
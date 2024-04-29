export default function Main({className="", children}: {className?: string, children?: React.ReactNode}) {
  return (
    <main className={`w-full h-[calc(100%_-_53px)] overflow-y-scroll p-4 md:p-8  bg-transparent  ${className}`}>
      {children}
    </main>
  );
}
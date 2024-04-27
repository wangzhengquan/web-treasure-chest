export default function Main({className="", children}: {className?: string, children?: React.ReactNode}) {
  return (
    <main className={`w-full bg-transparent p-4 md:p-8 ${className}`}>
      {children}
    </main>
  );
}
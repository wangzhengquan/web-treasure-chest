'use client';
import clsx from "clsx";

const links1 = [
  { name: 'Osc', type:'osc', icon: "" },
  { name: 'Amp', type:'amp', icon: "", },
  { name: 'Out', type:'out', icon: "" },
];

export default function SelectionBar() {
   
  const onDragStart = (event: React.DragEvent<HTMLElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-full h-full shadow-lg px-4  border-foreground " style={{
    }}>
      <h2 className="py-3 font-bold text-lg">Audio Nodes</h2>
      <ul className="grid grid-cols-2 auto-rows-auto gap-2">
        {
        links1.map((link) => (
          <li key={link.name}>
            <a className={clsx("cursor-grab rounded-md flex items-center justify-center w-full aspect-square ",
              "bg-card-body border border-foreground shadow-md dark:shadow-foreground",
            )}
              onDragStart={(event) => onDragStart(event, link.type)} draggable>
              {link.name}
            </a>
          </li>
        ))
        }
         
      </ul>
    </aside>
  );
}

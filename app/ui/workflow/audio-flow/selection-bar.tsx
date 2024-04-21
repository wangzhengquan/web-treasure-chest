'use client';
import Osc from "./nodes/osc";


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
    <aside className="w-full h-full bg-gray-100 shadow-lg px-4" style={{
    }}>
      <h2 className="text-gray-800 py-3">Audio Nodes</h2>
      <ul className="grid grid-cols-2 auto-rows-auto gap-2">
        {
        links1.map((link) => (
          <li key={link.name}>
            <a className="[&.move]:cursor-grab flex items-center justify-center w-full aspect-square border border-gray-200 bg-white rounded-md shadow-sm"
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

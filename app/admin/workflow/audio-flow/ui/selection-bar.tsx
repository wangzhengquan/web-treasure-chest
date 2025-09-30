'use client';
import clsx from 'clsx';

const links1 = [
  { name: 'Osc', type: 'osc', icon: '' },
  { name: 'Amp', type: 'amp', icon: '' },
  { name: 'Out', type: 'out', icon: '' },
];

export default function SelectionBar() {
  const onDragStart = (
    event: React.DragEvent<HTMLElement>,
    nodeType: string,
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside
      className="h-full w-full border-foreground px-4  shadow-lg "
      style={{}}
    >
      <h2 className="py-3 text-lg font-bold">Audio Nodes</h2>
      <ul className="grid auto-rows-auto grid-cols-2 gap-2">
        {links1.map((link) => (
          <li key={link.name}>
            <a
              className={clsx(
                'flex aspect-square w-full cursor-grab items-center justify-center rounded-md ',
                'border border-foreground bg-card-body shadow-md dark:shadow-foreground',
              )}
              onDragStart={(event) => onDragStart(event, link.type)}
              draggable
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

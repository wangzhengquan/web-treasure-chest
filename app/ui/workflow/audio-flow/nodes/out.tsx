import React from 'react';
import { Node, NodeTypes, Handle, Position, NodeProps, NodeResizer } from 'reactflow';

import { useStore, Store } from '../store';

 

const selector = (store: Store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function Out({ id, data }: NodeProps) {
  const { isRunning, toggleAudio } = useStore(selector);

  return (
    <div className={('rounded-md bg-card-body shadow-xl ')} key={id}>
      <Handle className='w-2 h-2 !bg-foreground rounded-full' type="target" position={Position.Top} />

      <button onClick={toggleAudio} className='px-4 py-2'>
        {isRunning ? (
          <span role="img" aria-label="mute">
            🔈
          </span>
        ) : (
          <span role="img" aria-label="unmute">
            🔇
          </span>
        )}
      </button>
    </div>
  );
}

import React, { ChangeEvent } from 'react';
import { Node, NodeTypes, Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore, Store } from '../store';


const selector = (id: string) => (store: Store) => ({
  setGain: (e: ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { gain: +e.target.value }),
});

export default function Amp({ id, data }: NodeProps) {
  const { setGain } = useStore(selector(id));

  return (
    <div className="rounded-md bg-white shadow-xl">
      <p className="rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm">Amp</p>
      <label className="flex flex-col px-2 pt-1 pb-4">
        <p className="text-xs font-bold mb-2">Gain</p>
        <input
          className="nodrag nopan"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.gain}
          onChange={setGain}
        />
        <p className="text-right text-xs">{data.gain.toFixed(2)}</p>
      </label>
      <Handle className="w-2 h-2" type="target" position={Position.Left} />
      <Handle className="w-2 h-2" type="target" position={Position.Top} />
      <Handle className="w-2 h-2" type="source" position={Position.Right} />
      <Handle className="w-2 h-2" type="source" position={Position.Bottom} />
    </div>
  );
}

import React, { ChangeEvent } from 'react';
import { Node, NodeTypes, Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore, Store } from '../store';

const selector = (id: string) => (store: Store) => ({
  setFrequency: (e: ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { frequency: +e.target.value }),
  setType: (e: ChangeEvent<HTMLSelectElement>) =>
    store.updateNode(id, { type: e.target.value }),
});

export default function Osc({ id, data }: NodeProps) {
  const { setFrequency, setType } = useStore(selector(id));

  return (
    <div className="rounded-md bg-card-body shadow-xl" key={id}>
      <p className="rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm">Osc</p>

      <label className="flex flex-col px-2 py-1">
        <p className="text-xs font-bold mb-2">Frequency</p>
        <input
          className="nodrag nopan"
          type="range"
          min="10"
          max="1000"
          value={data.frequency}
          onChange={setFrequency}
        />
        <p className="text-right text-xs">{data.frequency} Hz</p>
      </label>

      <hr className="border-gray-200 mx-2" />

      <label className="flex flex-col px-2 pt-1 pb-4">
        <p className="text-xs font-bold mb-2">Waveform</p>
        <select className="nodrag nopan text-xs" value={data.type} onChange={setType}>
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
          <option value="sawtooth">sawtooth</option>
          <option value="square">square</option>
        </select>
      </label>
      <Handle className="w-2 h-2 !bg-foreground rounded-full" type="source" position={Position.Right} />
      <Handle className="w-2 h-2 !bg-foreground rounded-full" type="source" position={Position.Bottom} />
    </div>
  );
}

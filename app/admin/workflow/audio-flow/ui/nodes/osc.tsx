import React, { ChangeEvent } from 'react';
import {
  Node,
  NodeTypes,
  Handle,
  Position,
  NodeProps,
  NodeResizer,
} from 'reactflow';
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
      <p className="rounded-t-md bg-pink-500 px-2 py-1 text-sm text-white">
        Osc
      </p>

      <label className="flex flex-col px-2 py-1">
        <p className="mb-2 text-xs font-bold">Frequency</p>
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

      <hr className="mx-2 border-gray-200" />

      <label className="flex flex-col px-2 pb-4 pt-1">
        <p className="mb-2 text-xs font-bold">Waveform</p>
        <select
          className="nodrag nopan text-xs"
          value={data.type}
          onChange={setType}
        >
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
          <option value="sawtooth">sawtooth</option>
          <option value="square">square</option>
        </select>
      </label>
      <Handle
        className="h-2 w-2 rounded-full !bg-foreground"
        type="source"
        position={Position.Right}
      />
      <Handle
        className="h-2 w-2 rounded-full !bg-foreground"
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

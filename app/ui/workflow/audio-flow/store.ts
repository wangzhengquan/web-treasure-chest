import { applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge, Connection, XYPosition } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional'
import {

  isRunning,
  toggleAudio,
  createAudioNode,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
} from './audio';


export interface Store {
  nodes: Node[];
  edges: Edge[];
  isRunning: boolean;
  toggleAudio: () => void;
  onNodesChange: (changes: NodeChange[]) => void;
  createNode: (type: string, position: XYPosition) => void;
  updateNode: (id: string, data: any) => void;
  onNodesDelete: (deleted: Node[]) => void;
  onEdgesChange: (changes: any) => void;
  addEdge: (data: Edge) => void;
  deleteEdge: (id: string) => void;
  onEdgesDelete: (deleted: Edge[]) => void;
}

export const useStore = createWithEqualityFn<Store>((set, get) => ({
  nodes: [],
  edges: [],
  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },

  onNodesChange(changes: NodeChange[]) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  createNode(type: string, position: XYPosition) {
    const id = nanoid();

    switch (type) {
      case 'osc': {
        const data = { frequency: 440, type: 'sine' };
        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
      case 'amp': {
        const data = { gain: 0.5 };
        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'out': {
        const data = {};
        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
    }
  },

  updateNode(id: string, data: any) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  onNodesDelete(deleted: Node[]) {
    for (const { id } of deleted) {
      removeAudioNode(id);
    }
  },

  onEdgesChange(changes: EdgeChange[]) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(edge: Edge ) {
    // const id = nanoid(6);
    // const edge: Edge = { id, ...data };
    connect(edge.source , edge.target );
    set({ edges: [edge, ...get().edges] });
  },

  deleteEdge(id: string) {
    // disconnect(edge.source, edge.target);
    set({ edges: get().edges.filter((e) => {
      if (e.id === id) {
        disconnect(e.source, e.target);
        return false;
      }
      return true;
    })});
  },

  onEdgesDelete(edges: Edge[]) {
    for (const { source, target } of edges) {
      disconnect(source, target);
    }
  },
}), shallow);

import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
  Connection,
  XYPosition,
} from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import {
  isRunning,
  toggleAudio,
  createAudioNode,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
} from './audio';
import { CommonEdgeProps } from './edges';

export interface Store {
  nodes: Node[];
  edges: Edge[];
  isRunning: boolean;
  toggleAudio: () => void;
  // setNodes: (nodes: Node[]) => void;
  // setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  createNode: (
    type: string,
    position: XYPosition,
    data?: any,
    id?: string,
  ) => void;
  updateNode: (id: string, data: any) => void;
  onNodesDelete: (deleted: Node[]) => void;
  onEdgesChange: (changes: any) => void;
  addEdge: (data: Connection) => void;
  deleteEdge: (id: string) => void;
  onEdgesDelete: (deleted: Edge[]) => void;
}

export const useStore = createWithEqualityFn<Store>(
  (set, get) => ({
    nodes: [],
    edges: [],
    isRunning: isRunning(),

    toggleAudio() {
      toggleAudio()?.then(() => {
        set({ isRunning: isRunning() });
      });
    },

    // setEdges: (edges: Edge[]) => set({ edges: edges }),
    onNodesChange(changes: NodeChange[]) {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },

    createNode(type: string, position: XYPosition, data?: any, id?: string) {
      id = id || nanoid();

      switch (type) {
        case 'osc': {
          data = data || ({ frequency: 440, type: 'sine' } as any);
          createAudioNode(id, type, data);
          set({ nodes: [...get().nodes, { id, type, data, position }] });

          break;
        }
        case 'amp': {
          data = data || { gain: 0.5 };
          createAudioNode(id, type, data);
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'out': {
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
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
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

    addEdge(connection: Connection) {
      const id = nanoid(6);
      const edge: Edge = { id, ...connection, ...CommonEdgeProps } as Edge;
      connect(edge.source, edge.target);
      set({ edges: [edge, ...get().edges] });
    },

    deleteEdge(id: string) {
      // disconnect(edge.source, edge.target);
      set({
        edges: get().edges.filter((e) => {
          if (e.id === id) {
            disconnect(e.source, e.target);
            return false;
          }
          return true;
        }),
      });
    },

    onEdgesDelete(edges: Edge[]) {
      for (const { source, target } of edges) {
        disconnect(source, target);
      }
    },
  }),
  shallow,
);

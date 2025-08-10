'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Panel,
  useReactFlow,
  BackgroundVariant,
  Controls,
  ReactFlowInstance,
  OnConnect,
  FitViewOptions,
  Node,
  Edge,
  Connection,
} from 'reactflow';
import { edgeTypes } from './edges';
import { nodeTypes } from './nodes';
import { useStore, Store } from './store';
import DevTools from '../dev-tools';
import 'reactflow/dist/base.css';

const initional_notes: Node[] = [
  {
    id: 'jCy9MW6ACUJ04EP8NxPWH',
    type: 'amp',
    data: { gain: 0.5 },
    position: { x: 362, y: 77 },
    width: 143,
    height: 93,
    selected: true,
    positionAbsolute: { x: 362, y: 77 },
    dragging: false,
  },
  {
    id: 'Wn0QKOWChoeQFN-d_pBbc',
    type: 'osc',
    data: { frequency: 440, type: 'sine' },
    position: { x: 68, y: 62 },
    width: 143,
    height: 137,
    selected: false,
    positionAbsolute: { x: 68, y: 62 },
    dragging: false,
  },
  {
    id: 'cqM0DZMgQ5awiWrWi9Ak6',
    type: 'out',
    data: {},
    position: { x: 692, y: 127 },
    width: 42,
    height: 35,
    selected: false,
    dragging: false,
    positionAbsolute: { x: 692, y: 127 },
  },
];
const initional_edges: Edge[] = [
  {
    id: '',
    source: 'jCy9MW6ACUJ04EP8NxPWH',
    sourceHandle: null,
    target: 'cqM0DZMgQ5awiWrWi9Ak6',
    targetHandle: null,
    type: 'buttonCloseEdge',
    animated: true,
  },
  {
    id: '',
    source: 'Wn0QKOWChoeQFN-d_pBbc',
    sourceHandle: null,
    target: 'jCy9MW6ACUJ04EP8NxPWH',
    targetHandle: null,
    type: 'buttonCloseEdge',
    animated: true,
  },
];

const selector = (state: Store) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onNodesDelete: state.onNodesDelete,
  onEdgesChange: state.onEdgesChange,
  addEdge: state.addEdge,
  createNode: state.createNode,
  // setNodes: state.setNodes,
  // setEdges: state.setEdges,
});

export default function CanvasPanel() {
  const store = useStore(selector);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  // const { setViewport, zoomIn, zoomOut, screenToFlowPosition } = useReactFlow();
  // useEffect(() => {
  //   setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 0 });
  // }, [setViewport]);

  const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    // instance.setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 0 });
  }, []);

  const onConnect: OnConnect = function (connection) {
    // const edge = {id: nanoid(6), ...connection, ...CommonEdgeProps } as Edge;
    store.addEdge(connection);
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      if (!reactFlowInstance) return;
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      store.createNode(type, position);
    },
    [reactFlowInstance, store],
  );

  useEffect(() => {
    const element = document.querySelector(
      '[aria-label="React Flow attribution"]',
    );
    if (element) {
      element.remove();
    }

    for (const node of initional_notes) {
      store.createNode(node.type as string, node.position, node.data, node.id);
    }

    for (const edge of initional_edges) {
      const connection: Connection = {
        source: edge.source,
        target: edge.target,
        sourceHandle: null,
        targetHandle: null,
      };
      store.addEdge(connection);
    }
  }, [store]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onNodesDelete={store.onNodesDelete}
        onEdgesChange={store.onEdgesChange}
        onConnect={onConnect}
        // colorMode={theme}
        // fitView
        // fitViewOptions={{ duration: 0, padding: 0.2 }}
      >
        <Background variant={BackgroundVariant.Dots} />
        {/* <MiniMap /> */}
        <Controls />
        <DevTools />
        <Background />
      </ReactFlow>
    </div>
  );
}

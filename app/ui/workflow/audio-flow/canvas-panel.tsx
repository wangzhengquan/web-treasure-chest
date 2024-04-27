"use client";
import React, {useEffect, useRef, useState, useCallback} from 'react';
import ReactFlow, { ReactFlowProvider, Background, Panel, useReactFlow, BackgroundVariant, 
  Controls, ReactFlowInstance, OnConnect,Edge, FitViewOptions } from 'reactflow';
import { nanoid } from 'nanoid';
import { shallow } from 'zustand/shallow';
import { useStore, Store } from './store';
import { nodeTypes } from './nodes';
import {CommonEdgeProps, edgeTypes} from './edges';
import 'reactflow/dist/base.css';

const selector = (store: Store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  createNode: store.createNode,
});

export default function CanvasPanel() {
  const store = useStore(selector);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  // const { setViewport, zoomIn, zoomOut, screenToFlowPosition } = useReactFlow();
  // useEffect(() => {
  //   setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 0 });
  // }, [setViewport]);

  const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    // instance.setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 0 });
  }, []);

  const onConnect:OnConnect = function (connection) {
    const edge = {id: nanoid(6), ...connection, ...CommonEdgeProps } as Edge;
    store.addEdge(edge);
  }
 
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
    [reactFlowInstance],
  );
  
  return (
      <div className="w-full h-full relative">
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
          // fitView
          // fitViewOptions={{ duration: 0, padding: 0.2 }}
        >
          <Background variant={BackgroundVariant.Lines}/>
          {/* <MiniMap /> */}
          <Controls />
          <Background />
        </ReactFlow>
      </div>
  );
}

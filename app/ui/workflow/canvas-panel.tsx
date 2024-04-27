"use client";
import type { OnConnect } from "reactflow";

import { useCallback, useLayoutEffect, useEffect } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Edge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";


import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes, CommonEdgeProps } from "./edges";

export default function App() {
  // const { setViewport, zoomIn, zoomOut } = useReactFlow();
  // useEffect(() => {
  //   setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 0 });
  // }, [setViewport]);
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect:OnConnect = function (connection) {
    console.log('onConnect', connection);
    const edge = { ...connection, ...CommonEdgeProps };
    setEdges((edges) => addEdge(edge, edges));
  }

  const onEdgesDelete = useCallback((edgesToDelete:  Edge[]) => {
    console.log('onEdgesDelete', edgesToDelete);
    // setEdges((edges) =>
    //   edges.filter((edge) => !edgesToDelete.find((e) => e.source === edge.source && e.target === edge.target))
    // );
  }, []);

  useLayoutEffect(() => { 
    const element = document.querySelector('[aria-label="React Flow attribution"]');
    if (element) {
      element.remove;
    }
  });

  return (
  <ReactFlowProvider>
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onEdgesDelete={onEdgesDelete}
      onConnect={onConnect}
      fitView
    >
      <Background variant={BackgroundVariant.Lines}/>
      {/* <MiniMap /> */}
      <Controls />
    </ReactFlow>
  </ReactFlowProvider>
  );
}

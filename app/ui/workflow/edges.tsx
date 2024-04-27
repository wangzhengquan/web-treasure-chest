import type { Edge, EdgeTypes } from "reactflow";

import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from 'reactflow';



export function ButtonCloseEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button style={{
            width: '20px',
            height: '20px',
            background: '#eee',
            color: 'rgba(0,0,0,0.5)',
            border: '1px solid #fff',
            cursor: 'pointer',
            borderRadius: '50%',
            fontSize: '12px',
            lineHeight: 1,

          }} className="hover:shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const CommonEdgeProps = {
  type: 'buttonCloseEdge',
  animated: true,
};

export const initialEdges = [
  { id: "a->c", source: "a", target: "c", ...CommonEdgeProps},
  { id: "b->d", source: "b", target: "d" , ...CommonEdgeProps },
  { id: "c->d", source: "c", target: "d", ...CommonEdgeProps },
] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
  buttonCloseEdge: ButtonCloseEdge,
} satisfies EdgeTypes;

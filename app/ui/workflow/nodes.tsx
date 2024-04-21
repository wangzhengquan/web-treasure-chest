import { memo, FC, CSSProperties } from 'react';
import { Node, NodeTypes, Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import styles from './Flow.module.css';
const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};
// console.log('styles.customNode', styles.customNode);
const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <NodeResizer />
      <Handle type="target" position={Position.Top} />
      <div>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position:{' '}
          <strong>
            {xPos.toFixed(2)},{yPos.toFixed(2)}
          </strong>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={sourceHandleStyleB}
      />
    </>
  );
};

export {CustomNode}


export type PositionLoggerNodeData = {
  label?: string;
};

export function PositionLoggerNode({
  xPos,
  yPos,
  data,
}: NodeProps<PositionLoggerNodeData>) {
  const x = `${Math.round(xPos)}px`;
  const y = `${Math.round(yPos)}px`;

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <div>
        {x} {y}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export const initialNodes = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
  {
    id: 'e',
    data: { label: 'Node e' },
    position: { x: 400, y: 200 },
    type: 'custom',
    className: styles.customNode,
  },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "custom": CustomNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

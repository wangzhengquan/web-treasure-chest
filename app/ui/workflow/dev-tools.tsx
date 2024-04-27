import React, { memo, useCallback, Dispatch, FC } from 'react';
import { useReactFlow, Edge, Node, ReactFlowJsonObject } from 'reactflow';
import {Button} from "@/components/ui/button"

type ControlsProps = {
  // setNodes: Dispatch<React.SetStateAction<Node<any>[]>>;
  // setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>;
};

const DevTools: FC<ControlsProps> = ({ }) => {
  const { setViewport, toObject } = useReactFlow();

  const onSave = useCallback(() => {
    const flow = toObject();
    console.log('flow', JSON.stringify(flow) )
  }, [toObject]);

   

  return (
    <div className="flex absolute right-[10px] top-[10px] z-[1000]">
      <Button className="" onClick={onSave}>
        Print
      </Button>
      
    </div>
  );
};

export default memo(DevTools);

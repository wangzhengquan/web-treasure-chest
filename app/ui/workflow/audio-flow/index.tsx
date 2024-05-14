'use client';
import SelectionBar from "./selection-bar";
import CanvasPanel from "./canvas-panel";
import {ReactFlowProvider} from "reactflow";
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
export default function AudioFlow() {
  return (
  <ReactFlowProvider>
    <div className="flex h-full w-full gap-4">
      <div className="flex-[0_0_200px]">
        <SelectionBar />
      </div>
      <div className="flex-auto relative">
        <CanvasPanel />
      </div>
    </div>
  <UpdateBreadcrumbs breadcrumbs={'Audio flow'}/>
  </ReactFlowProvider>
  );
}
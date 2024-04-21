import CanvasPanel from '@/app/ui/workflow/canvas-panel'
export default function Page() {
  return (
    <div className="relative w-full h-full">
      <h1>Workflow</h1>
      <div className="h-[calc(100%_-_56px)]">
        <CanvasPanel />
      </div>
    </div>
  );
}
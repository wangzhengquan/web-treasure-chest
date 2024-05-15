import AudioFlow from '@/app/ui/workflow/audio-flow'
import Main from '@/app/ui/main';
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
export default function Page() {
  return (
    <Main className="relative w-full h-full p-0">
      <UpdateBreadcrumbs breadcrumbs={'Audio flow'}/>
      <AudioFlow />
    </Main>
  );
}
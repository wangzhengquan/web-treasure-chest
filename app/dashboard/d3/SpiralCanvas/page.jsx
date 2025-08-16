import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import SpiralCanvas from './AnimatedSpiralCanvas';
 
export default function Page() {
  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Animated Spiral Canvas'} />
      <div className="bg-card-body">
        <SpiralCanvas/>
      </div>
    </Main>
  );
}

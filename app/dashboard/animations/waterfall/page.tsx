import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import WaterfallGridDemo from '@/app/ui/waterfall/grid-demo';

export default function Page() {
  return (
    <Main className="h-full w-full"  >
      <UpdateBreadcrumbs breadcrumbs={'Waterfall'} />
      <WaterfallGridDemo />
    </Main>
  );
}

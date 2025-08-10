import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import MyGauge from './MyGauge';

export default function Page() {
  

  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Gauge'} />
      <MyGauge />
    </Main>
  );
}

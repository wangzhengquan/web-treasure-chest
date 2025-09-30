import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import MyGauge from './MyGauge';

export default function Page() {
  

  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Gauge'} />
      <div className="bg-card-body flex items-center justify-center">
        <MyGauge />
      </div>
       
    </Main>
  );
}

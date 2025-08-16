import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import DonutControls from './donut';
 
export default function Page() {
  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Line Chart'} />
      <div className="bg-card-body flex items-center justify-center">
        {/* <LineChart data={data}/> */}
        <DonutControls/>
      </div>
    </Main>
  );
}

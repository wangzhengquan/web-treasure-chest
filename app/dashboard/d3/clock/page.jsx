import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Clock from './ui/clock';
 
export default function Page() {
  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Clock'} />
      <div className="bg-card-body flex justify-center items-center">
        <Clock/>
      </div>
    </Main>
  );
}

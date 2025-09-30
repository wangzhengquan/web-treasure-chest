import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import {LineChart} from '@app/components/d3/line-chart';
import * as d3 from 'd3';
import Dashboard from './dashboard';
// import DonutControls from './donut';

export default function Page() {
  return (
    <Main className="w-full">
      <UpdateBreadcrumbs breadcrumbs={'Dashboard'} />
      <Dashboard/>
    </Main>
  );
}

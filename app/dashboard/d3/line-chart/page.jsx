import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import LineChart from './RandomWalkChart';
import data from "../aapl.json"
data.forEach(d => {
  d.date = new Date(d.date);
});
export default function Page() {
  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Line Chart'} />
      <div className="bg-card-body">
        {/* <LineChart data={data}/> */}
        <LineChart/>
      </div>
    </Main>
  );
}

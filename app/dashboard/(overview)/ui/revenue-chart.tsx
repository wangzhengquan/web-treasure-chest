import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { fetchRevenue } from '@/app/actions/revenue';
import {shimmer} from '@app/components/loading';
// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue(); // Fetch data inside the component
  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4">No data available.</p>;
  }

  return (
    <div className="bg-card p-4 rounded-md w-full md:col-span-4">
      <h2 className={`mb-4`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl ">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-[repeat(13,minmax(0,1fr))] items-end gap-2  bg-card-body p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6 text-foreground/60">
          <CalendarIcon className="h-5 w-5" />
          <h3 className="ml-2 text-sm ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}



export function RevenueChartSkeleton() {
  return (
    <div className={`relative w-full overflow-hidden md:col-span-4 bg-card rounded-xl p-4`}>
      <div className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-card-200`} />
      <div className={`${shimmer}`}>
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-card-body p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-card-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-card-200" />
        </div>
      </div>
    </div>
  );
}

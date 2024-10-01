
import CardWrapper, {CardsSkeleton} from '@/app/ui/dashboard/cards';
import RevenueChart, {RevenueChartSkeleton} from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices, {LatestInvoicesSkeleton} from '@/app/ui/dashboard/latest-invoices';

import { Suspense } from 'react';
import Main from '@/app/ui/main';
// import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';
export default async function Page() {

  return (
    <Main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </Main>
  );
}

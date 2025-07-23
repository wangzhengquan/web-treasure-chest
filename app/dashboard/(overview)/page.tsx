
import CardWrapper, {CardsSkeleton} from './ui/cards';
import RevenueChart, {RevenueChartSkeleton} from './ui/revenue-chart';
import LatestInvoices, {LatestInvoicesSkeleton} from './ui/latest-invoices';

import { Suspense } from 'react';
import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
// import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';
export default async function Page() {
  
  return (
    <>
    
    <UpdateBreadcrumbs breadcrumbs={'Dashboard'} />
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
    </>
  );
}

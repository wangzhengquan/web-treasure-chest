import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/components/search';
import Table, {InvoicesTableSkeleton} from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
// import Indicator from '@/app/ui/indicator';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

export default async function Page() {
  
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={[{ label: 'Invoices', href: '' }]} />
      <Main>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-6 ">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>

        <div className="mt-4 md:mt-12">
          <InvoicesTableSkeleton />
        </div>
        <div className="mt-4 flex w-full justify-center">
          <Pagination totalPages={10} />
        </div>
      </Main>
    </>
  );
}

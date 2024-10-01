import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/common/search';
import Table, {InvoicesTableSkeleton} from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Main from '@/app/ui/main';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/actions/invoices';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

export default async function Page({
  searchParams, // url search params
}: {
  searchParams?: {
    query: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  // const totalPages = 10;
  return (
      <Main>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-6 ">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>

        <div className="mt-4 md:mt-12">
          <Suspense
            key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
          >
            <Table query={query} currentPage={currentPage} />
          </Suspense>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </Main>
  );
}

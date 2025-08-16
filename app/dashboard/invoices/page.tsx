import Pagination from '@app/components/pagination';
import Search from '@app/components/search';
import Table, {InvoicesTableSkeleton} from './ui/table';
import { CreateInvoice } from './ui/buttons';
import Main from '@/app/ui/main';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/actions/invoices';
import { Metadata } from 'next';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
})  {
  const searchParams = props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Invoices'} />
      <Main>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-6 ">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>

        <div className="mt-4 md:mt-12">
          <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />} >
            <Table query={query} currentPage={currentPage} />
          </Suspense>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </Main>
    </>
  );
}

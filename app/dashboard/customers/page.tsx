import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/components/search';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';
import { Suspense } from 'react';

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
  // return (
  //   <CustomersTable query={query} currentPage={currentPage}/>
  // );

  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Customers'} />
      <Main>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-6 ">
          <Search placeholder="Search Customers..." />
          {/* <CreateInvoice /> */}
        </div>

        <div className="mt-4 md:mt-12">
          <CustomersTable query={query} currentPage={currentPage} />
        </div>
      </Main>
    </>
  );
}

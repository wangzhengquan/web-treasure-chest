import CustomersTable from '@/app/ui/customers/table';
import Loading from "@/app/components/loading";
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/components/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Indicator from '@/app/ui/indicator';
import Main from '@/app/ui/main';
import { Suspense } from 'react';

export default async function Page({
  searchParams,   // url search params
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
      <Indicator> Customers </Indicator>
      <Main>
        <div className="mt-4 md:mt-6 flex items-center justify-between gap-2 ">
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
 